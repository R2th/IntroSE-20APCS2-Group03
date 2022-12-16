# 1. Bắt đầu từ những dự án nhỏ
Bắt đầu từ những dự án nhỏ sẽ giúp bạn có thể học sâu và nắm rõ kiến thức cơ bản của Docker và không bị choáng khi bước vào các khối kiến thức rắc rỗi và xoắn não. 

Vì vậy,  mới bắt đầu với Docker thì hãy triển khai Docker đến một máy chủ duy nhất và dần dần học hỏi từ những sai lầm khi build cho mỗi dự án từ nhỏ đến phức tạp. Và cần nhớ rằng Docker không phải là tất cả về việc triển khai một multi-datacenter load-balanced cluster of services. 

Hãy xây dựng theo cách của bản thân để dần dần hiểu thêm về các ứng dụng của Docker ở các quy mô và cấp độ kỹ năng khác nhau.
# 2. Sử dụng volumes trong docker-compose
Docker cho phép bạn sử dụng hai loại volumes là **Host mounted volumes** and **Named volumes**.

**Named volumes**
```
    volumes:
      - .docker/data/db:/var/lib/mysql/
```

Cú pháp: **named_volume_name:/container/path**
Có thể sử dụng Named volumes khi đang chạy infrastructure trong **single machine** hoặc trong một **cluster of machines** (sử dụng Docker, Docker-compose hoặc Docker swarm).

**Host mounted volumes**
```
    volumes:
      - ./:/var/www/html
      - .docker/nginx.conf:/etc/nginx/conf.d/default.conf
```

Cú pháp: **/ host / path: / container / path**
Nên sử dụng loại Volumes này khi đang chạy infrastructure trong **single machine** duy nhất (sử dụng Docker hoặc Docker-compose).

Volumes có thể là **internal** hoặc **external**. Internal Volumes  có phạm vi của một file single docker-compose trong khi **External 
Volumes** có thể được xác định / sử dụng trên cơ sở hạ tầng và phải khai báo chúng trước khi bắt đầu dịch vụ của mình:

# 3. Chạy Docker Alpine container
Docker Alpine là một image Docker nhẹ phổ biến có chứa một danh sách các tiện ích Linux cơ bản. 

Với mỗi image nếu có thể hãy tận dụng Alpine để có thể build đc size image nhỏ nhất và có nhiều chức năng cần thiết nhất.

Ví dụ build image của node:lates sẽ nặng hơn rất nhiều nếu build node:13-apline

```
FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
```

# 4. Cách nhanh nhất để xây dựng REST API
Nếu không có thời gian để tạo API REST, chỉ cần chạy Docker-Json-server, dựa trên gói json-server trên NPM

```
#!/usr/bin/env bash

echo '{"cities": [{"name": "Barcelona"}, {"name": "Copenhagen"}, {"name": "Edinburgh"}, {"name": "Hanoi"}]}' > /tmp/cities.json
docker run -d -p 80:80 -v /tmp/cities.json:/data/db.json clue/json-server

# Listing my favourite cities

curl http://localhost/cities
[
  {"name": "Barcelona"},
  {"name": "Copenhagen"},
  {"name": "Edinburgh"},
  {"name": "Hanoi"}
]

# Listing my favourite cities containing *bar*
curl 'http://localhost/cities?name_like=bar'
[
  {"name": "Barcelona"}
]
```

# 5. Copy và paste files
Mặc dù sử dụng Volumes là cách tốt hơn để cung cấp nội dung cho container nhưng đôi khi cần thực hiện thủ công. 

Docker cho phép làm điều đó theo cả hai cách, từ Host đến container và ngược lại:

**Từ Host đến một container Docker**

Tại thời điểm **compile** 

```
# Within a Dockerfile
COPY script.sh /tmp
ADD script.sh /tmp
```
Add và copy cùng thực hiện 1 nhiệm vụ nhưng có thêm 2 khả năng:
```
# Dockerfile
# 1 - Be able to automatically untar files
ADD scripts.tar.gz /tmp
# 2 - Fetching files from remote URLs
ADD http://www.example.com/script.sh /tmp
```

Tại thời điểm **run**
```
# Copies script.sh from our current host folder to /tmp inside of the container.
$ docker cp script.sh container_name:/tmp/
$ docker exec -it container_name bash -c 'tree -a /tmp'
>
/tmp
└── script.sh
```

**Từ Docker container đén Host**
```
# Copies script.sh from the inside of the container /tmp/script.sh to your current host folder.
$ docker cp container_name:/tmp/. .
$ tree -a
>
└── /tmp/script.sh
```

# 6. Cách sao lưu và khôi phục cơ sở dữ liệu PostgreSQL
Mỗi lệnh có thể chạy bằng databse client cũng có thể thực hiện bằng Docker. 

Trong ví dụ này, sẽ làm rõ cách sao lưu / khôi phục cơ sở dữ liệu PostgreSQL

Docker Postgres backup command:
```
$ docker run -i -e PGPASSWORD=[POSTGRESQL_PASSWORD] postgres /usr/bin/pg_dump \
 -h [POSTGRESQL_HOST] \
 -U [POSTGRESQL_USER] [POSTGRESQL_DATABASE] | gzip -9 > backup.sql.gz
```

Docker Postgres restore command:

```
$ gunzip < backup.sql.gz | docker exec -i [POSTGRESQL_CONTAINER] /bin/bash -c "export PGPASSWORD=[POSTGRESQL_PASSWORD] && /usr/bin/psql -U [POSTGRESQL_USER] [POSTGRESQL_DATABASE]"
```

# 7. Ghi Logs
Khi biết cách truy cập nhanh vào nhật ký Docker của có thể thực hiện nhiều điều hữu ích:
```
$ sudo docker logs -t --tail 1000 my_postgres 2>&1 | grep -i error
```
Ví dụ tìm kiếm lỗi (không phân biệt chữ hoa chữ thường) trong 1000 dòng logs cuối cùng của container chứa my_postgres thêm timestamp ở đầu mỗi dòng.

# 8. Sử dụng file .dockerignore 
Nhiều người quen thuộc với tập tin .gitignore. Khái niệm về .dockerignore tương tự nhưng lần này được sử dụng để build image Docker tốt hơn. 

Sử dụng tệp này có thể tránh tải lên các tệp không cần thiết làm giảm thời gian build và size của image

Đầu tiên hãy tạo một tệp .dockerignore thêm một dòng với chính .dockerignore bao gồm tất cả các thư mục mà bạn muốn tránh trong image cuối.  (không cần phải thêm tệp này vào image)
Ví dụ: 
```
$ cat .dockerignore
/modules
/modules/
/modules/*
```


**Cảm ơn các bạn đã theo dõi đến đây ^^! Xin chào và hẹn gặp lại !**

**Link tham khảo:** https://medium.com/worldsensing-techblog/10-docker-tips-and-tricks-8ebc6202e44c

https://www.whizlabs.com/blog/docker-tips-and-tricks/