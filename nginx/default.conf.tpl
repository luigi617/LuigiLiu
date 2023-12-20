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
