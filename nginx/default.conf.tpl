upstream luigiliu {
    server django:8000;
}



server {

    listen 80;
    listen [::]80;
    server_name luigiliu.com www.luigiliu.com;
    server_tokens off;

    
    location /.well-known/acme-challenge/ {
        allow all;
        root /code/data/certbot/www/;
    }
    location / {
        return 301 https://$host:$request_uri;
    }

}
