FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/conf.d/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d


COPY * /etc/nginx/conf.d/
COPY run.sh /run.sh

RUN apk add --no-cache openssl bash
RUN chmod +x /run.sh

VOLUME /code/front-end/static/
VOLUME /code/front-end/media/

VOLUME /code/data/certbot/www/

CMD ["/run.sh"]
