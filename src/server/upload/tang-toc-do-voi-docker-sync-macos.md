Chào các bạn,

Hôm nay mình xin được viết bài hướng dẫn về docker-sync. 
Trong dự án thực tế, khi làm việc với Docker for Mac thì mình gặp khá nhiều rắc rối về perfomance.
Mình đã thử chạy Docker-compose để tạo một project với PHP nhưng khi thao tác với website nhưng load page, chuyển trang, v.v... thì xảy trường hợp  response rất là chậm chạp. Mặc dù mình đã tăng cấu hình cho docker lên một cách rõ rệt:

![](https://images.viblo.asia/ce18cb59-a82d-43b9-9064-08fa841692b2.png)


Nhưng nó vẫn cực kỳ chậm chập, phải nói chậm còn hơn con rùa :turtle::turtle::turtle:

Mình đã cố gắng tìm hiểu nhiều cách khắc phục thì trong đó sử dụng Docker-sync là hiệu quả nhất.

Trước hết thì chúng ta sẽ hạ cấu hình của Docker for Mac trước, vì nó đã làm tốn rất nhiều tài nguyên của máy. 
![](https://images.viblo.asia/9b93cf75-ba67-4b3a-90e6-a798851e1053.png)


Thật ra nếu bạn có tăng max cấu hình cho Docker thì nó vẫn không ăn thua gì !!! Vả lại chúng ta còn sử dụng cho mục đích khác nữa nên thôi hạ cấu hình xuống đi và cài docker-sync thôi nào!!! :thumbsup:

Để cài đặt docker-sync:
```
$ sudo gem install docker-sync
$ brew install fswatch
$ brew install unison
```

Tạo file docker-compose.yml

```
version: '2'
services:
    # mysql
    mysql:
        image: mysql:5.7
        ports:
            - "3306:3306"
        environment:
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
            - web-sync:/var/www/html:cached
            - /etc/localtime:/etc/localtime:ro
        links:
            - mysql:mysql
        environment:
            - VIRTUAL_HOST=localhost
            - APACHE_DOCUMENT_ROOT=/var/www/html
 # volumes
volumes:
    web-sync:
      external: true
```

Tạo file docker-sync.yml:

```
version: '2'
syncs:
    web-sync:
        notify_terminal: true
        src: './www'
```

Chạy docker-sync:
```
$ docker-sync-stack start
```

Lưu ý: không chạy lên docker-compose vì docker-sync đã chuẩn bị hết tất cả, từ khâu setup volumes cho đến tạo container,... 

Để tắt docker thì chúng ta chỉ việc nhấn Ctrl + C (Window) hoặc Command + C (MacOS), hoặc bạn nào giỏi bash thì có thể viết các lệnh để tắt từng container.

Bài viết đến đây là kết thúc. Hy vọng các bạn có thể tận dụng được docker-sync để tăng tốc cho Docker và đạt được hiệu quả tối ưu nhất.