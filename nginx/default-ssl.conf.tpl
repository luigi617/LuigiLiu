upstream luigiliu {
    server django:8000;
}


server {

    listen 80;
    server_name luigiliu.com www.luigiliu.com;

    
    location /.well-known/acme-challenge/ {
        root /code/data/certbot/www/;
    }
    location / {
        return 301 https://$host:$request_uri;
    }

}
server {

    listen 443 ssl;
    server_name 18.153.140.205 luigiliu.com www.luigiliu.com;

    ssl_certificate /etc/letsencrypt/live/luigiliu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/luigiliu.com/privkey.pem;

    include /code/data/certbot/conf/options-ssl-nginx.conf;
    ssl_dhparam /code/data/certbot/conf/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass https://luigiliu.com;
        proxy_redirect off;
        client_max_body_size 10M;
    }

    location /front-end/static/ {
        alias /code/front-end/static/;
    }
    location /front-end/media/ {
        alias /code/front-end/media/;
    }

}