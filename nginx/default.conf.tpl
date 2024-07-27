upstream luigiliu {
    server django:8000;
}


server {

    listen 80;
    server_name luigiliu.com;
    
    location / {
        return 301 http://www.luigiliu.com;
    }

}
server {

    listen 80;
    server_name www.luigiliu.com;
    
    location /.well-known/acme-challenge/ {
        root /code/data/certbot/www/;
    }
    location /front-end/static/ {
        alias /code/front-end/static/;
    }
    location /front-end/media/ {
        alias /code/front-end/media/;
    }
    location / {
        proxy_pass http://www.luigiliu.com$request_uri;
        proxy_redirect off;
    }

}
