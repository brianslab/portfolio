export interface ButtonProps {
  children?: React.ReactNode;
  bordered?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  [x: string]: any;
}
