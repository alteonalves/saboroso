FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY . ./usr/src/app

RUN cd ./usr/src/app && npm install