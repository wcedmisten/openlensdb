FROM node:24-alpine

WORKDIR /openlensdb

COPY openlensdb/package.json /openlensdb/package.json

RUN npm install

COPY openlensdb/ /openlensdb/
RUN npm run build

FROM nginx:alpine

WORKDIR /root/
COPY --from=0 /openlensdb/dist /openlensdb/dist
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
