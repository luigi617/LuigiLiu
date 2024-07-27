upstream luigiliu {
    server django:8000;
}


server {
    listen 80;
    server_name luigiliu.com;
    location /.well-known/acme-challenge/ {
        root /code/data/certbot/www/;
    }
    location / {
        return 301 https://luigiliu.com$request_uri;
    }
}
server {
    listen 80;
    server_name www.luigiliu.com;
    location /.well-known/acme-challenge/ {
        root /code/data/certbot/www/;
    }
    location / {
        return 301 https://luigiliu.com$request_uri;
    }
}
server {
    listen 443 ssl;
    server_name www.luigiliu.com;
    
    ssl_certificate /etc/letsencrypt/live/luigiliu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/luigiliu.com/privkey.pem;

    include /code/data/certbot/conf/options-ssl-nginx.conf;
    ssl_dhparam /code/data/certbot/conf/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        return 301 https://luigiliu.com$request_uri;
    }
}


server {

    listen 443 ssl;
    server_name luigiliu.com;

    ssl_certificate /etc/letsencrypt/live/luigiliu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/luigiliu.com/privkey.pem;

    include /code/data/certbot/conf/options-ssl-nginx.conf;
    ssl_dhparam /code/data/certbot/conf/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://luigiliu;
        proxy_redirect off;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$http_host;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /front-end/static/ {
        alias /code/front-end/static/;
    }
    location /front-end/media/ {
        alias /code/front-end/media/;
    }

}