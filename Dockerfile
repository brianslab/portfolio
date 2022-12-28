FROM node:18-alpine
ENV NODE_ENV='production'
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn build
CMD ["yarn", "start"]