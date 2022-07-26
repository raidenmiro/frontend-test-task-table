# syntax=docker/dockerfile:1.4

# ---- Development ----
FROM node:16.10.0-alpine3.11 AS development

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lock-file

COPY . .

CMD [ "yarn", "dev" ]


# ---- Build ----
FROM development AS build

RUN  yarn build


# ---- Nginx setup ----
FROM nginx:alpine

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
