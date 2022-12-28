# configure the aws provider
provider "aws" {
  region = "us-west-2"
}

# configure acm certificate
resource "aws_acm_certificate" "app_certificate" {
  domain_name       = "briandkuhn.com"
  validation_method = "DNS"

  tags = {
    Name = "Portfolio Landing Page Cert"
  }
}

# create a task definition for the next app
resource "aws_ecs_task_definition" "app_task_defition" {
  family                   = "portfolio"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = <<EOF
  [
    {
      "name": "portfolio",
      "image": "brianslab/portfolio",
      "essential": true,
      "memoryReservation": 512,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ]
    }
  ]
  EOF
}

# Create an IAM role for the task execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecs_task_execution_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# Create an IAM role for the task
resource "aws_iam_role" "ecs_task_role" {
  name               = "ecs_task_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# Create a security group for the task
resource "aws_security_group" "ecs_task_sg" {
  name   = "ecs_task_sg"
  vpc_id = aws_vpc.default.id
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create a Fargate cluster
resource "aws_ecs_cluster" "app_cluster" {
  name = "portfolio_cluster"
}

# Create a Fargate service
resource "aws_ecs_service" "app_service" {
  name             = "portfolio service"
  cluster          = aws_ecs_cluster.app_cluster.id
  task_definition  = aws_ecs_task_definition.app_task_definition.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "LATEST"
  security_groups  = [aws_security_group.ecs_task_sg.id]
  subnets          = aws_vpc.default.public_subnets
  assign_public_ip = true
}

# Create an application load balancer
resource "aws_lb" "app_lb" {
  name               = "app_lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ecs_task_sg.id]
  subnets            = aws_vpc.default.public_subnets
}

# Create a target group for the load balancer
resource "aws_lb_target_group" "app_target_group" {
  name     = "portfolio_target_group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.default.id
  health_check {
    path                = "/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

# Create a listener for the load balancer
resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.app_certificate.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_target_group.arn
  }
}
