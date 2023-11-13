FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d


# COPY * /etc/nginx/
# COPY run.sh /run.sh

# RUN apk add --no-cache openssl bash
# RUN chmod +x /run.sh

ENTRYPOINT ["/entrypoint.sh"]