#!/bin/sh

set -e


until nc -z nginx 80; do
    echo "Waiting for nginx..."
    sleep 5s & wait ${!}
done

echo "Getting certificate..."

certbot certonly --webroot --webroot-path /code/data/certbot/www/ --email luigiliu617@gmail.com --rsa-key-size 4096 --agree-tos --no-eff-email -d luigiliu.com