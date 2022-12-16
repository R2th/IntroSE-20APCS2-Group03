Docker hiện tại đang rất hot, và lý do thì bạn cũng đã biết rồi nên chúng ta sẽ không đề cập đến nó để tốn thời gian nữa.
Nếu bạn đang muốn deploy 1 rails app với docker thì bài viết này có lẽ sẽ có ích cho bạn :)
## Setup
Tạo 1 folder có tên là docker trong project của bạn để chứa toàn bộ những thứ liên quan đến nó, cũng không nhất thiết như dưới, nhưng tôi thấy như vậy là rõ ràng nhất.
```
-app_name
  -app
  -db
  -config
    -database.yml
  ...
  -docker
    -app
      -DockerFile
    -web
      -DockerFile
      -nginx.conf
  -docker-compose.yml
```

## Dockerize your Rails app
Thêm vào DockerFile trong thư mục app
```
FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs 
# Set an environment variable where the Rails app is installed to inside of Docker image
ENV RAILS_ROOT /var/www/app_name
RUN mkdir -p $RAILS_ROOT 
# Set working directory
WORKDIR $RAILS_ROOT
# Setting env up
ENV RAILS_ENV='production'
ENV RAKE_ENV='production' 
# Adding gems
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs 20 --retry 5 --without development test 
# Adding project files
COPY . .
RUN bundle exec rake assets:precompile
EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
```
## Proxy your web requests
Chúng ta cần 1 reverse proxy và ở đây chúng ta dùng Nginx
### DockerFile for nginx
Thêm vào DockerFile của nginx trong thư mục web
```
# Base image
FROM nginx
# Install dependencies
RUN apt-get update -qq && apt-get -y install apache2-utils
# establish where Nginx should look for files
ENV RAILS_ROOT /var/www/app_name
# Set our working directory inside the image
WORKDIR $RAILS_ROOT
# create log directory
RUN mkdir log
# copy over static assets
COPY public public/
# Copy Nginx config template
COPY docker/web/nginx.conf /tmp/docker.nginx
# substitute variable references in the Nginx config template for real values from the environment 
# put the final config in its place
RUN envsubst '$RAILS_ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf
EXPOSE 80
# Use the "exec" form of CMD so Nginx shuts down gracefully on SIGTERM (i.e. `docker stop`)
CMD [ "nginx", "-g", "daemon off;" ]
```
### Nginx configuration file
```
upstream rails_app {  
   server app:3000;
} 
server {  
   # define your domain  
   server_name www.example.com;   
# define the public application root  
   root   $RAILS_ROOT/public;  
   index  index.html;
# define where Nginx should write its logs  
   access_log $RAILS_ROOT/log/nginx.access.log;  
   error_log $RAILS_ROOT/log/nginx.error.log;   
  
   # deny requests for files that should never be accessed  
   location ~ /\. {    
      deny all;  
   }
   location ~* ^.+\.(rb|log)$ {    
      deny all;  
   }  
 
   # serve static (compiled) assets directly if they exist (for rails production)  
   location ~ ^/(assets|images|javascripts|stylesheets|swfs|system)/   {    
      try_files $uri @rails;     
      access_log off;    
      gzip_static on; 
      # to serve pre-gzipped version     
      expires max;    
      add_header Cache-Control public;     
      
      add_header Last-Modified "";    
      add_header ETag "";    
      break;  
   } 
  
   # send non-static file requests to the app server  
   location / {    
      try_files $uri @rails;  
   }   
   location @rails {    
      proxy_set_header  X-Real-IP  $remote_addr;    
      proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;         
      proxy_set_header Host $http_host;    
      proxy_redirect off;    
      proxy_pass http://rails_app;  
   }
}
```

## Docker Compose
Cuối cùng để quản lý cũng như kết nối các container ta dùng docker compose.
Thêm vào project của bạn file docker-compose.yml
```
version: '3'
volumes:  
  postgres_data: {} 
services:  
  app:    
    build:      
      context: .      
      dockerfile: ./docker/app/DockerFile    
    depends_on:      
      - db  
  db:    
    image: postgres    
    volumes:      
      - postgres_data:/var/lib/postgresql/data  
  web:    
    build:      
      context: .      
      dockerfile: ./docker/web/DockerFile    
    depends_on:      
      - app    
    ports:      
      - 80:80
```
Hy vọng nó sẽ có ích, cảm ơn mọi người đã theo dõi bài viết.