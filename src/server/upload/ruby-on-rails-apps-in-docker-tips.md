Docker là một khái niệm càng ngày càng không quá xa lạ với các lập trình viên như chúng ta nữa. Chắc hẳn ở đây thì ai cũng đã từng làm các dự án liên quan đến Docker, DockerCompose. Và cũng chắc chắn là lần đầu tiếp xúc thì ai cũng có rất nhiều câu hỏi, thắc mắc với nó:
Làm sao để debug, sao để exec 1 container....
Cho nên hôm nay mình sẽ viết 1 bài đề cập đến những vấn đề mình đã từng thắc mắt, tất cả đều đúc kết từ kinh nghiệm bản thân cho nên nếu có gì sai sót thì mong mọi người góp ý nhiệt tình.
## Cài đặt ứng dụng
```
#docker.compose.yml

version: '2'
services:
  db:
    image: postgres
    volumes:
      - postgres-volume:/var/lib/postgresql/data
  web:
    build: .
    command: rails s -b 0.0.0.0 -p 3000
    volumes:
      - .:/app
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
volumes:
  postgres-volume:
```

Ở đây chúng ta sẽ mount data của postges db ra volume  postgres-volume để lưu lại data của db, vì nếu không thì lúc down container db xuống thì dữ liệu sẽ bị xóa sạch
Các biến environment nên đc lưu trong file .env
Chắc chắc đã thêm file .dockerignore exclude /tmp, /.git, /log

## Chạy migrations
```
docker-compose run web rails db:migrate
```
Thường thì mình sẽ thêm luôn vào file docker-compose.yml
```
#docker.compose.yml

version: '2'
services:
  db:
    image: postgres
    volumes:
      - postgres-volume:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rails db:create db:migrate && rails s -b 0.0.0.0"
    volumes:
      - .:/app
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
volumes:
  postgres-volume:
```

## Debugger

```
#docker.compose.yml

version: '2'
services:
  db:
    image: postgres
    volumes:
      - postgres-volume:/var/lib/postgresql/data
  web:
    tty: true
    stdin_open: true
    build: .
    command: bash -c "rails db:create db:migrate && rails s -b 0.0.0.0"
    volumes:
      - .:/app
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
volumes:
  postgres-volume:
```

Như mọi người cũng đã thấy ở đây ta thêm 
```
tty: true
stdin_open: true
```
vào service web trên docker-compose.yml

Thường thì chúng ta sẽ debug trên container web thôi cho nên chúng ta sẽ run docker-compose up trên deamon
```
docker-compose up -d
```
Sau đó attach container web
```
docker attach WEB_CONTAINER_ID
```
Đặt debugger và debug bình thường :D

```
docker-compose exec web bash
root@216d180c59fa:/app# rubocop
```
Để exec vào 1 container để xem log, chạy rails c, xem biến môi trường....

Trên đây là 1 số kinh nghiệm của mình, hy vọng sẽ giúp ích được mọi người khi cần đến.
Cảm ơn vì đã đọc bài viết.