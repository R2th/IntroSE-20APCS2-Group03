# Lời mở đầu
Hồi trước, khi tôi mới tập tành code thì được phân ngay vào làm trong 1 dự án thực tế, chân ướt chân ráo chả biết cái gì nên lúc đầu chỉ có ngồi vọc Docker, Django, ...Nhưng vướng cái phần tiếng Anh lẹt đẹt nên chả hiểu dùng thế nào, sau thì vừa cày vừa hỏi các đàn anh mới thông được tí. Vì vậy hôm nay tôi xin phép viết một bài hướng dẫn cách tạo app django qua docker-compose bằng tiếng Việt :D.

# Định nghĩa các thành phần trong dự án
Việc hoàn thành một dự án mất rất nhiều thời gian và công sức, mà làm xong đưa cho khách hàng vẫn FAIL :'( . Lý do đa phần là do môi trường code khác với môi trường của khách hàng. Cho nên Docker ra đời như một công cụ deploy.

Vì tôi dùng hệ điều hành Linux, cụ thể là Ubuntu 16.04, nên các bạn dùng Window, Mac thông cảm (bow).

## Cài đặt Docker và Docker Compose
Việc đầu tiên các bạn cần làm là install Docker và Compose. 
1. Thêm GPG key từ trang chủ Docker về máy bạn
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
2. Thêm Docker repo vào apt của thằng ubuntu
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
3. Cập nhật lại apt
```
sudo apt-get update
```
4. Kiểm tra phiên bản mà bạn muốn install phải từ Docker repo chứ không phải bản có sẵn của Ubuntu
```
apt-cache policy docker-ce
```
```
docker-ce:
  Installed: (none)
  Candidate: 18.06.1~ce~3-0~ubuntu
  Version table:
     18.06.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu xenial/stable amd64 Packages
```
Docker-ce chưa được install nhưng có bản dự phòng của ubuntu.

5. Nếu OK, install Docker nào
```
sudo apt-get install -y docker-ce
```
6. Sau khi install thì kiểm tra trạng thái của docker
```
sudo systemctl status docker
```
```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-10-18 20:28:23 UTC; 35s ago
     Docs: https://docs.docker.com
 Main PID: 13412 (dockerd)
   CGroup: /system.slice/docker.service
           ├─13412 /usr/bin/dockerd -H fd://
           └─13421 docker-containerd --config /var/run/docker/containerd/containerd.toml
```
Nếu bạn thấy active (running) thì là chạy rồi đấy, còn lại thì đừng để ý do mình copy code từ trang hướng dẫn. Chung quy do lười :/.

7. Docker chạy rồi, giờ install docker-compose thôi. Download phiên bản ổn định của docker-compose trên github.
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
8. Cấp quyền
```
sudo chmod +x /usr/local/bin/docker-compose
```
9. Kiểm tra phiên bản
```
docker-compose --version
```
```
docker-compose version 1.25.3, build 1110ad01
```

## Dockerfile
Bạn tạo một empty folder, truy cập vào đấy
```
mkdir test_django_app
cd test_django_app
```
Tạo một file tên là Dockerfile để tạo image trong docker. Nói chung là môi trường của dự án, có format như sau
```
FROM ubuntu:16.04

RUN apt-get update \
    && apt-get install -y python3-pip python3-dev\
    && cd /usr/local/bin \
    && ln -s /usr/bin/python3 python \
    && pip3 install --upgrade pip

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
```
Dockerfile bắt đầu bằng một image đã xây dựng môi trường có sẵn là "ubuntu:16.04". 
```
FROM ubuntu:16.04
```
Sau đó, cài đặt python3
```
RUN apt-get update \
    && apt-get install -y python3-pip python3-dev\
    && cd /usr/local/bin \
    && ln -s /usr/bin/python3 python \
    && pip3 install --upgrade pip
```
Tạo folder trong image container
```
RUN mkdir /code
WORKDIR /code
```
Nếu bạn có 1 file requirements (nơi chứa các thư viện cần của dự án) thì copy vào folder code trong container
```
COPY requirements.txt /code/
RUN pip install -r requirements.txt
```
Khi tạo image sẽ install các thư viện trong file requirement này luôn nên nếu dự án của bạn cần cái gì thì nhét vào file requirement này nhé. Ví dụ:
```
cat test_django_app/requirement.txt
```
```
Django>=2.0,<3.0
psycopg2>=2.7,<3.0
```

## Docker-compose.yml
Bạn tạo thêm 1 file docker-compose.yml song song với Dockerfile. File này có vai trò mô tả các dịch vụ sẽ sử dụng trong dự án, cụ thể ở đây là web và database.
```
version: '3'

services:
  db:
    image: postgres
    
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - "8000:8000"
    depends_on:
      - db
```
Phiên bản sử dụng ở đây là 3
```
version: '3'
```
Service 1 là db aka database. Ở đây tôi sử dụng postgres nên sẽ pull image postgres về (bản mới nhất), đặt tên cho container là  "test_django_app_db"
```
db:
    image: postgres:latest
    container_name: test_django_app_db
    restart: always
```
Service 2 là web. Đặt tên container, build context, ánh xạ folder trong container ra bên ngoài local ( ở đây là test_django_app) để khi bạn code ở local nó sẽ lưu vào container ngay lập tức, command chạy ngay khi build docker-compose ( python ./test_django_app/manage.py runserver 0.0.0.0:8000 ), expose port ( mặc định là 8000), depends_on db ( liên kết với dịch vụ db).
```
web:
    container_name: test_django_app_web
    build: .
    volumes:
      - .:/code
    command: bash -c "python ./test_django_app/manage.py runserver 0.0.0.0:8000"
    ports:
      - "8000:8000"
    tty: true
    depends_on:
      - db
    restart: always
```
## Django app
Trong folder test_django_app, tạo một django project
```
sudo docker-compose run web django-admin startproject test_django_app
```
Kiểm tra, nếu các bạn thấy tên project tức là các bạn thành công rồi (thực ra tôi chỉ copy hướng dẫn thôi :D)
```
$ ls -l
drwxr-xr-x 2 root   root   test_django_app
-rw-rw-r-- 1 user   user   docker-compose.yml
-rw-rw-r-- 1 user   user   Dockerfile
-rwxr-xr-x 1 root   root   manage.py
-rw-rw-r-- 1 user   user   requirements.txt
```
## Connect App to Database
Trong file test_django_app/settings.py, config lại biến DATABASE
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}
```
Cuối cùng bạn chạy lệnh "docker-compose up" trong folder test_django_app để tạo dự án.
```
docker-compose up
```
Kiểm tra xem container đã được tạo ra hay chưa
```
$sudo docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
def85eff5f51        testdjangoapp_web          "python3 manage.py..."   10 minutes ago      Up 9 minutes        0.0.0.0:8000->8000/tcp   test_django_app_web
678ce61c79cc        postgres:latest            "docker-entrypoint..."   20 minutes ago      Up 9 minutes        5432/tcp                 test_django_app_db
```

# Lời nói cuối
Viết mỏi cả tay :/, trên đây là hướng dẫn đơn giản của tôi để tạo 1 app django bằng docker. Bài không đi sâu chi tiết vào lý thuyết, uhm nếu khi nào tâm huyết dâng trào có lẽ tôi sẽ viết một bài giải thích các thuật ngữ trong docker :D.

Link tham khảo từ:

https://docs.docker.com/compose/django/

https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04