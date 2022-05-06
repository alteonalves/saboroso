FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install