"""
WSGI config for LuigiLiu project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
certfile = "/etc/letsencrypt/live/luigiliu.com/fullchain.pem"
keyfile = "/etc/letsencrypt/live/luigiliu.com/privkey.pem"
application = get_wsgi_application()
