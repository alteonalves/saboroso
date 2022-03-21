FROM node:10.19.0

# Create app directory
WORKDIR /usr/src/app

COPY . ./usr/src/app

RUN npm install