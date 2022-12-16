# Inspiration
I usually use Amazon ECS as the remote environment and built the local environment with Docker, but at this time I was worried about the operation of Dockerfile. This is because what you want to containerize is different between the local environment and the remote environment.

* Local environment

1. I mainly want to containerize the runtime
2. I want to code in my IDE, so the code can be mutable

* Remote environment
1. I want to make a container including the application
2. The code does not have to be rewritten

Due to the above reasons, I separated the Dockerfiles, but I wanted to combine them into one because the management became complicated.


# TL;DR
* Separate remote and local environments with multi-stage build
1. How to write multiple FROM clauses
2. It is good to describe the common part and the part divided by the local environment / remote environment separately.

# Using [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)

## Overview
To solve the above problem, I used Docker's [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/).

Multi-stage build is a way to put multiple FROM clauses in one Dockerfile.

I will use this to write a PHP Dockerfile.

```
# Common to local and remote environments
FROM php:8.0-fpm AS base
RUN apt-get update && apt-get install -y zlib1g-dev git zip && \
    docker-php-ext-install opcache && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer

# For local environment. xdebug is also here.
FROM base AS local
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug

# For remote environment. I also copy/paste the code.
FROM base AS remote
WORKDIR /var/www/html/
COPY . .
RUN composer install -n --prefer-dist
```

## Description of each FROM clause
### base
`base` describes the processing that does not change between the local environment and the remote environment.

MySQL and Redis libraries, Composer, etc. should be here.

### local
local is for the local environment and describes what is required in the local environment other than the base processing.

I just want to use `Xdebug` in my local environment, so I'll list it here.

### remote
remote is for remote environments, such as copying applications and resolving dependencies.

If you need anything else in your remote environment, list it here.

## Cooperation with peripheral tools

By using the multi-stage build, I was able to combine the Dockerfiles into one, but I need to use local and remote properly in the peripheral tools.

Here is an example of Docker-Compose and AWS Copilot that I use.

## Docker-Compose

Add target in the build field of the `yaml` file.

I just want to use it in a local environment, so set local here.

This will build base + local for you.
```
services:
    app:
        build:
          context: .
          dockerfile: Dockerfile
          target: local
```

# AWS Copilot
The AWS Copilot manifest can specify the target as well.

Since ECS is a remote environment and if you want to containerize the application, just have to specify remote.

This will build base + remote for you.

```
image:
  build: Dockerfile
  target: remote
```

# Summary
By using the multi-stage build, we were able to share the Dockerfile in the local environment and the remote environment, and we were able to solve the problem.

Thank you for reading to the end.