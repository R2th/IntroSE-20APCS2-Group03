### I, Lời mở đầu
Ở bài trước mình cũng đã viết một bài hướng dẫn [Sử dụng Portainer để quản lý Docker apps](https://viblo.asia/p/su-dung-portainer-de-quan-ly-docker-apps-Eb85oGa852G) như việc cài đặt docker swarm, join node hay deploy docker stack,... Trong bài viết này mình sẽ hướng dẫn chi tiết hơn về các thành phần docker được quản lý bởi Portainer cũng như sử dụng portainer hiệu quả cho dự án.
### II, Nội dung chính
### 1. Stack trong portainer là gì?

Chắc rằng khi học về docker thì các bạn cũng đã biết đến khái niệm ```docker-compose``` và đã từng dùng qua nó. Tất nhiên rồi, khi dùng docker stack bạn cũng sẽ đặt câu hỏi về docker compose vì chúng tương đồng nhưng cũng có nhiều điểm khác nhau cụ thể là:
Docker Compose và Docker stack đều có thể được điều khiển bởi một file ```docker-compose.yml```

- Docker Compose: là một công cụ (official tool) giúp bạn quản lý docker containers bởi những gì được viết trong một file ```docker-compose.yml```
```yml
services:
  data:
      container_name: blog_data
      image: debian
      volumes:
          - .docker/mysql:/var/lib/mysql
          - .docker/data:/data
    mysql:
        container_name: blog_mysql
        restart: always
        image: mysql:5.7
        volumes_from:
            - data
            - logs
        expose:
            - "3306"
        environment:
            MYSQL_DATABASE: blog
            MYSQL_USER: blog
            MYSQL_PASSWORD: secret
            MYSQL_ROOT_PASSWORD: root
    redis:
        container_name: blog_redis
        restart: always
        image: redis
        expose:
            - "6379"
        volumes_from:
            - data
```
- Docker stack: là một command được nhúng vào Docker CLI. Nó sẽ giúp bạn quản lý một vùng chứa (cluster) của docker containter thông qua docker swarm.

Tuy nhiên trong một số trường hợp một số tính năng sẽ chỉ hoạt động với docker stack, còn ```docker-compose``` sẽ bỏ qua. Và tương tự, các tính năng không được hỗ trợ của ```docker-compose``` cũng được bỏ qua bởi docker stack command.

Ví dụ: thuộc tính ```deploy``` bị docker compose loại bỏ và thuộc tính ```depends_on``` bị loại bỏ bởi ```docker stack```. Nếu cần thêm các thông tin bạn có thể tham khảo [Compose file reference.](https://docs.docker.com/compose/compose-file). Và có thể nói ```docker stack``` là một cải thiện tuyệt vời nếu bạn sử dụng ```docker-compose``` trong phát triển và dùng Docker swarm ở production.

Và trong một dự án, docker stack có thể hiểu là một nhóm các services có sự liên quan đến nhau và quản lý trên cùng một Docker CLI.
### 2. Làm sao để tạo một stack?

Để tạo được một stack, bạn cần chuẩn bị sẵn một docker compose file. Như mình đã so sánh ở trên một số thuộc tính của ```docker-compose``` sẽ không được hỗ trợ bởi ```docker-stack``` vì vậy khi viết hay refactor ```docker-compose.yml``` cần chú ý nha.
Một docker-composer file của stack sẽ bao gồm tất cả các services mà bạn muốn đưa vào stack, có thể là services:
- php-fpm, 
- mysql, 
- redis, ...
```yml
version: '2'

x-deployment-constraints:
  data-storage: &data-storage-only
    constraints:
      - node.labels.data-storage == true

services:
    mysql:
        image: mysql:8
        command: --default-authentication-plugin=mysql_native_password
        volumes:
          - mysql:/var/lib/mysql
        environment:
          MYSQL_DATABASE: ${DB_DATABASE:-blog}
          MYSQL_USER: ${DB_USERNAME:-blog}
          MYSQL_PASSWORD: ${DB_PASSWORD:-secret}
          MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD:-root}
        deploy:
          placement: *data-storage-only

  redis:
      image: redis:alpine
      volumes:
        - redis:/data
      deploy:
        placement: *data-storage-only
        resources:
          limits:
            memory: ${MEMORY_LIMIT_REDIS:-200m}
```

Sau khi đã thêm content docker-compose file vào ô xong bạn create stack là đã có thể tạo một stack rồi. Tương tự khi dùng command ```docker stack deploy docker-compose.yml``` đó =))

![](https://images.viblo.asia/89274907-ca9b-41f6-85c3-f91d8569ea6e.png)

### 3. Services trong portainer là gì?
![](https://images.viblo.asia/8d6ea2c2-2de2-4420-891b-608faaeb7d7f.png)

Services là một khái niệm bên trong docker, như ở trên các bạn có define các service trong file docker-compose đó. Để deploy một image app khi sử dụng docker swarm thì bạn cần phải tạo một service đơn giản vậy thôi :v. Thông thường thì một service sẽ là image cho một microservice trong một ứng dụng lớn. Ví dụ như viblo là một ứng dụng lớn, bên trong sẽ gồm các service như HTTP server, database, frontend web, ...

Với docker swarm nó có hỗ trợ một hoặc nhiều replica tasks, nên mỗi service sẽ chứa một hoặc nhiều replica container tùy theo sự monitor của ta.

Trong services ta có thể thêm các environment, network connect, config,... cho tất cả các replica containers, có thể tùy ý thay đổi con số của replica nữa. Bên cạnh đó khi update lại config thì tất cả các containers trong đó cùng sẽ được update theo.
### 4. Containers trong portainer là gì? 
![](https://images.viblo.asia/727e32c8-83a9-41ee-9f0f-86bfad156f7f.png)
Đây là nơi quản lý các container, đầy đủ các action như kiểm tra healthcheck, start, stop, kill, restart... như docker CLI command.

### 5. Networks trong portainer là gì?
![](https://images.viblo.asia/72aff8f5-3f0e-457b-a9df-f9155bcfd766.png)

Đây là nơi quản lý các docker networks, ta có thể tạo ra các networks cho các services và add các containers vào đó. Khi chung network thì các container có thể ping lẫn nhau. Các stack trong node có thể join vào chung một network.
### 6. Volumes trong portainer là gì?
![](https://images.viblo.asia/4ffa5eed-e6b7-46d2-b2c9-b3912dc03de8.png)

Đây là nơi quản lý volumes, show ra toàn bộ các vùng chứa mà các stack có thể sử dụng. Cũng như tạo các volume được mounts vào vùng chứa chung cho các container.
### 7. Configs trong portainer là gì?
![](https://images.viblo.asia/74788d1a-1a59-4fcc-a77e-80992ed58842.png)

Đây là nơi chứa các file config của các services, container,... Ví dụ như dự án của bạn sẽ có nhiều services mỗi service sẽ có file .env riêng bạn sẽ tạo file tương ứng của các service ở đây. Việc quản lý file config tập trung có ưu ddieerm:
+ Có thể sửa đổi mà không cần build lại stacks, services hay containers ...
+ Có thể clone, copy ra file mới dễ dàng.
+ Tránh việc viết docker-compose file quá dài ...
### 8. Secret trong portainer là gì?
Nghe từ secret thì cũng có gì đó "bí mật" mới để trong này rồi =)). Những file bảo mật như ssl-cert, private.key, ... thì ta sẽ tạo ở đây và gọi ra trong các service.
### III Tạm kết
Chắc hẳn sau bài viết này các bạn đã có được các kiến thức về quản lý dự án với docker swarm rồi đúng không. Rất mong được sự góp ý từ các bạn
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)