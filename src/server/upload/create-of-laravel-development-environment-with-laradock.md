## Overall
Create Larevel development with Laradock.
If use laradock we can prepare laravel environment easily. 

### Check if we have following items
$ docker --version

$ docker-compose --version

$ docker-machine --version

※ If you don't have them, please install first 

docker : https://docs.docker.com/install/

docker-compose : https://docs.docker.com/compose/install/

docker-machine --version: https://docs.docker.com/machine/install-machine/


### Create directory for laradock
$ mkdir docker-laravel

$ cd docker-laravel

### Clone laradock 
$ git clone https://github.com/LaraDock/laradock.git

$ cd laradock

### Change MySql version 
$ vi laradock/mysql/Dockerfile

```ARG MYSQL_VERSION=latest => ARG MYSQL_VERSION=5.7```

※ We can select any version not only mysql but also php, nginx and so on

### Up container for laradock
$ docker-compose up -d workspace

### If there is error 
$ cp env-example .env

### Check if laradock is Up,  If there is laradock_workspace_1

$ docker-compose ps


### Login to container
$ docker exec -it laradock_workspace_1 /bin/bash

### Move to work directory 
$ cd /var/www　

### Add user 
$ adduser user_name 
※  Can't run composer if root 

### Install Laravel PJ
$ composer create-project laravel/laravel ProjectName "5.7.*”

### Exit container
$ exit

### Stop contanier 
$ docker-compose stop

### Modify docker-compose.yml and Nginx DocumentRoot
$ vim docker-compose.yml
```
     ### Nginx Server Container ##################################
     nginx:
       build:
         context: ./nginx
         args:
           - PHP_UPSTREAM=php-fpm
       volumes_from:
         - applications
       volumes:
         - ${NGINX_HOST_LOG_PATH}:/var/log/nginx
         - ${NGINX_SITES_PATH}:/etc/nginx/sites-available
       ports:
         ## Before
         #- "${NGINX_HOST_HTTP_PORT}:80"
         ## After 
         - "8080:80"
         ## Before
         #- "${NGINX_HOST_HTTPS_PORT}:443"
         ## After
         - "443:443"
```
### Update Nginx DocumentRoot
$ vim nginx/sites/default.conf
```
     ## Before
     # root /var/www/public;
     ## After
     root /var/www/ProjectName/public;
```

### Up container again 
$ docker-compose up -d php-fpm nginx mysql

### Access your localhost 
localhost:8080/