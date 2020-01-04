FROM nginx:1.17

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx-dev.conf /etc/nginx/nginx.conf