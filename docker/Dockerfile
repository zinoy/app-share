FROM nginx:alpine

ARG BUILD_DIR

LABEL maintainer="zino.yue@hylink.com"

COPY ${BUILD_DIR}/dist/* /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/
