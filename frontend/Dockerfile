FROM node:24-alpine

WORKDIR /openlensdb

COPY openlensdb/package.json /openlensdb/package.json

RUN npm install

COPY openlensdb/ /openlensdb/
RUN npm run export

FROM nginx:alpine

WORKDIR /root/
COPY --from=0 /frontend/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
