FROM --platform=$BUILDPLATFORM node:24.12-alpine3.23 AS build

WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.29.8-alpine3.23

COPY --from=build /src/dist /usr/share/nginx/html/dist

ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
COPY ./docker-entrypoint.d /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/00-entrypoint.envsh

COPY ./prod.nginx.conf.template /etc/nginx/templates/nginx.conf.template

LABEL org.opencontainers.image.source=https://github.com/mini-macros/mini-macros
LABEL org.opencontainers.image.description=https://minimacros.tech
LABEL org.opencontainers.image.licenses=GPLv3

CMD ["nginx", "-g", "daemon off;"]
