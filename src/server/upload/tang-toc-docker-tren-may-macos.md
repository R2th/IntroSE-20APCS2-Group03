Chào các bạn,

Hôm nay mình xin chia sẽ cách làm tăng perfomance khi chạy Docker trên hệ điều hành OS.

Hardware:
- MacOS (bất cứ hệ điều hành nào)

Software:
- Docker for MAC
- Internet
- IDE Visutal Code


```
version: '3'
# service
services:
    # mysql: Định nghĩa cơ sở dữ liệu MySQL
    mysql:
        image: mysql:5.7
        ports:
            - "3306:3306"
        environment:
            MYSQL_ROOT_PASSWORD: root
        volumes:
            - ./db/mysql_data:/var/lib/mysql
     # phpadmin: sử dụng phần mềm PHPADMIN để giao tiếp với database thông qua http://localhost:8080/ trên local PC.
    phpadmin:
        depends_on:
            - mysql
        image: phpmyadmin/phpmyadmin
        restart: always
        ports:
            - '8080:80'
        environment:
            PMA_HOST: mysql
            MYSQL_ROOT_PASSWORD: root
    # proxy
    proxy:
        image: jwilder/nginx-proxy:latest
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
        ports:
            - "80:80"
    # www
    www:
        image: atsu666/ioncube:7.2
        privileged: true
        volumes:
            - ./www:/var/www/html
            - ~/etc/timezone:/etc/localtime:ro
        links:
            - mysql:mysql
        environment:
            - VIRTUAL_HOST=localhost # cấu hình máy chủ mysql
        
            
```
 Bắt đầu khởi tạo và start container container:
 
     $ docker-compose up -d
     
Khi copy thử source code ( wordpress chẳng hạn) vào thư mục www và kiểm tra thử xem thế nào?
Một số thao tác trở nên rất chậm chạp! Đó là do việc giao tiếp giữa máy host (MacOS) và máy ảo diễn ra một cách trực tiếp và không thông qua bộ nhớ cache.
![](https://images.viblo.asia/b364228d-7297-4be7-8b8f-2703d155fe47.jpg)

Để khắc phục việc này, chúng ta thếm một hằng số cached vào volumes của phần định nghĩa của www:

```
  www:
        image: atsu666/ioncube:7.2 
        privileged: true
        volumes:
            - ./www:/var/www/html:cached #Thêm vào định nghĩa cache để làm docker chạy nhanh hơn tren MacOS
            - ~/etc/timezone:/etc/localtime:ro
        links:
            - mysql:mysql
        environment:
            - VIRTUAL_HOST=localhost # cấu hình máy chủ mysql
            
 ```
 Restart lại docker-compose:
 
 `$docker-compose down`
 
 `$docker-compose up -d`
 
 Cheer!
 
 Docker đã trở nên hoạt động một cách nhanh chóng như máy ảo Linux.