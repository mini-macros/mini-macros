FROM node:24.12-alpine3.22 AS build

WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run dev
