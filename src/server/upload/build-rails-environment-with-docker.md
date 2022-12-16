# Introduction
Many companies are using Docker like CAMPFIRE or Money Forward, so I also wanted to use Docker.

First of all, I want to make Rails work with Docker, please refer to the official reference for genuine grammar.

# Sample
Since this implementation result is put up on GitHub, please take a look it if it is good.

https://github.com/HiroyukiYagihashi/rails-on-docker

# Implementation
## Install Docker
Register to [DockerHub](https://hub.docker.com/) and install [Docker](https://docs.docker.com/docker-for-mac/install/).

The Docker link above is for MacOS, but if you are using another OS, please install the appropriate Docker.

## Create Project

First, create a folder appropriately.

I think that the project name will be `myapp` and I will create a project in this.

### Create `myapp` folder

```
$ mkdir myapp
$ cd myapp
```
### Create Dockerfile and implement the contents.

```
$ touch Dockerfile
```

```
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
```

Next we will create `Gemfile`, `Gemfile.lock`.

`Gemfile` is created here to install Rails.

It will be overwritten when you execute rails new later.

No problem if `Gemfile.lock` is empty

### Create Gemfile, Gemfile.lock
```
$ touch Gemfile && touch Gemfile.lock
```
### Put in Gemfile's content
```
source 'https://rubygems.org'
gem 'rails', '~>5'
```
Here, we will create `entrypoint.sh`.

Currently, when a specific `server.pid` file exists, it seems that an error has occurred and prevents the server from restarting.

Adding this shell script will eliminate the above error.

### Create entrypoint.sh
```
$ touch entrypoint.sh
```
### Put in Gemfile's content `entrypoint.sh`

* entrypoint.sh
```
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Finally, create & put in `docker-compose.yml`'s content

### Create docker-compose.yml

```
$ touch docker-compose.yml
```
```
version: '3'
services:
  db:
    image: postgres
    ports:
      - '5432:5432'
    volumes:
      - postgresql-data:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
volumes:
  postgresql-data:
    driver: local
```
    
The necessary files have been created, finally those becomes such a file configuration.

myapp/
　┣ Dockerfile
　┣ docker-compose.yml
　┣ entrypoint.sh
　┣ Gemfile
　┗ Gemfile.lock
 
 ## Build Project
 Now that you're ready to build, let's go ahead.
 
 ### Docker execute rails new by Docker
 ```
 $ docker-compose run web rails new . --force --no-deps --database=postgresql
```
```
$ docker-compose build
```

## Database connection
Rails is configured to connect to the localhost database by default.

But this time, I change the setting to be connected to DB container (like PostgreSQL).

### Change settings of database.yml


* config/database.yml

```
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
  username: myapp
  password: <%= ENV['MYAPP_DATABASE_PASSWORD'] %>
```
### Container creation & activation 
```
$ docker-comnpose up
```

### DB creation & migration
```
$ docker-compose run web rake db:create
$ docker-compose run web rails db:migrate
```

# Displaying `RailsWelcome` page
Let's access http://localhost:3000/ with a browser.
![](https://images.viblo.asia/89a44d12-1744-47df-8c7c-069572a4bd76.png)

Hooora, 

If you want to terminate, don't forget the following command:
```
$ docker-compose down
```