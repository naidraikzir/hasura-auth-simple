FROM node:10-slim

RUN apt update && apt upgrade && apt install -y sqlite
WORKDIR /home
COPY index.js .
COPY package.json .
RUN npm install
EXPOSE 5001
CMD node .
