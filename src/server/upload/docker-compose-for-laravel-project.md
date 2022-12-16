In this article, I’ll introduce to you about: “_Why we need to use Docker Compose?_” and “_How to use Docker Compose for your Laravel projects?_“. We will try to use Docker Compose to see how it makes our life easier.

Original post: [Docker Compose for Laravel project](https://sang.asia/tips/docker-compose-for-laravel-project/)

I also assume that you had Docker and Docker Compose installed on your computer/laptop. If you don’t know how to install Docker and Docker Compose, you can visit their websites to follow their documents to install.

Document links:

*   Get started with Docker: [https://www.docker.com/get-started](https://www.docker.com/get-started);
*   Install Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/);

## Why do we need to use Docker Compose?

I faced many problems when my team working with a Laravel project that runs an old version of Laravel. It requires PHP version 5.4 and some specific extensions. We started to wonder: “How to keep the whole team run the same environment for this project?”.

Finally, I found that Docker Compose can help our life easier! That’s amazing! I only need to define a Docker Compose file and our team can get started with the project.

By using Docker Compose, we can:

*   Define the environment one time, use many times, anytime;
*   Keep environment consistent between computers/stages;
*   Isolate the running environment with the host computer for security reasons;
*   Give your team members peace of mind because of environment setup;

## What is Docker Compose?

On the official website, they defined as below:

> Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.
> 
> _Overview of Docker Compose_

That’s the truth! When you become familiar with Docker Compose, you will have more free time for your projects.

## Let’s rock now

Firstly, open your terminal and clone the project [docker-for-laravel](https://github.com/sang-asia/docker-for-laravel) that I already made. After clone project, go into this folder, you will have a folder with the structure as below:

```
    .
    ├── conf
    │   ├── nginx
    │   │   └── app.conf
    │   └── php
    │       ├── docker-php-ext-bcmath.ini
    │       ├── docker-php-ext-gd.ini
    │       ├── docker-php-ext-intl.ini
    │       ├── docker-php-ext-mysqli.ini
    │       ├── docker-php-ext-opcache.ini
    │       ├── docker-php-ext-pdo_mysql.ini
    │       └── php.ini
    ├── docker-compose.yml
    ├── .env
    ├── php.dockerfile
    ├── README.md
    └── src
        └── public
            └── index.php
```

Let’s go through each item:

*   Folder `conf`: contains configuration files for **nginx** and **PHP**;
*   Folder `src`: contains your source code – your project will put inside `src` folder;
*   File `php.dockerfile`: used to build **PHP** image – install extensions, install composer…;
*   File `docker-compose.yml`: all magics come from this file – defines services of your project;
*   File `.env`: set your project name and ports for **nginx** and **phpMyAdmin**;

Now, you can open `.env` file to change the project name and ports. After changed the project name, open `conf/nginx/app.conf` to change `fastcgi_pass` URL with a new PHP container name. Example, default project name in `.env` file is **docker-laravel**, so PHP container name will be **docker-laravel-php** (_with “-php” suffix_). The default content of `app.conf` will look like:

```
    server {
        location ~ \.php$ {
            fastcgi_pass docker-laravel-php:9000;
        }
    }
```

For example, I changed my project name in `.env` file to **my-project**, so my PHP container will be **my-**project**-php**. We need to change `fastcgi_pass` URL in `app.conf` to new PHP container name:

```
    server {
        location ~ \.php$ {
            fastcgi_pass my-project-php:9000;
        }
    }
```

That’s it! We can enjoy it right now. Several commands for you to rock:

*   Create containers: `docker-compose up -d`;
*   Remove containers: `docker-compose down --remove-orphans`;
*   Stop containers: `docker-compose stop`;
*   Start containers: `docker-compose start`;

**Note:** you can only run commands above in the folder contain `docker-compose.yml`.