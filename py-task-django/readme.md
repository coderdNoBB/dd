Since Django 3.0 you can create a superuser without TTY in two ways

# .admin.env
DJANGO_SUPERUSER_PASSWORD=psw

# bash
source '.admin.env' && pipenv run python manage.py createsuperuser --username=admin --email=admin@admin.com --noinput