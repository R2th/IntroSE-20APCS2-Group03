Trong bài viết này mình sẽ hướng dẫn anh em cách cài đặt PostgresSQL trên Windows, MacOS và Docker nhé

### 1. Cài đặt PostgresSQL trên Docker
Để cài đặt PostgresSQL trên Docker rất đơn giản, anh em làm theo các bước dưới đây nhé:
* Ở terminal lên vào kéo image của nó về thôi nào:
```
docker pull postgres
```
Mặc định mình sẽ dùng bản lastest nhé.
Anh em có thể xem các phiên bản của nó ở đây nhé https://hub.docker.com/_/postgres.

* Để dùng một phiên bản cụ thể anh em có thể thêm vào đuôi câu lệnh trên phiên bản muốn sử dụng:
```
docker pull postgres:12.12
```
* Sau đó anh em có thểm kiểm tra image đã được pull về hay chưa như sau:
```
docker images
```
* Bước cuối cùng là chạy lệnh sau là anh em đã có một con PostgresSQL để sử dụng rồi:
```
docker run --name postgres-db -e POSTGRES_USER=huytx -e POSTGRES_PASSWORD=huy123 -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```
Mình giải thích đoạn lệnh sau một chút nhé:
* **--name** ở tham số này sẽ truyền lên tên của container anh em muốn đặt nhé, ở đây mình đặt là **postgres-db**.
* **-e POSTGRES_USER** đây là tham số truyền lên đặt tên cho user sử dụng PostgresSQL, nếu không truyền lên thì mặc định là **postgres** nha anh em, ở đây thì mình truyền lên là **huytx**.
* **-e POSTGRES_PASSWORD** đây là tham số truyền lên đặt mật khẩu cho user vừa tạo ở trên, đây là biến bắt buộc nên không có giá trị mặc định, giá trị mình để ở câu lệnh trên là **huy123**.
* **-p 5432:5432** đây là tham số thiết lập port sẽ được mapping giữa docker container và máy host anh em nhé, mình để ở đây là port 5432.
* **-v** đây là tham số sẽ giúp container mount folder dữ liệu ra bên ngoài máy host, đảm được dữ liệu sẽ không bị mất khi container đột ngột bị mất anh em nhé.
* **-d** thêm tham số này container sẽ chạy ở chế độ detached mode nghĩa là chạy ở chế độ background.
* **postgres** tham số này chỉ ra image chúng ta vừa pull về ở trên nhé.

### Sử dụng docker-compose:
Đầu tiên anh em tạo ra file *docker-compose.yml* sau đó copy nội dung bên dưới vào file và chạy câu lệnh:
```
docker-compose up -d
```

```
version: '3.5'

services:
  postgres:
    container_name: postgres_db
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      PGDATA: /data/postgres
    volumes:
       - ./data:/data/postgres
    ports:
      - "5432:5432"
    networks:
      - postgres
    restart: always

networks:
  postgres:
    driver: bridge

volumes:
    postgres:

```
Xong thế là anh em đã có đồ để chơi rồi, kiểm tra thành quả anh em vừa setup ở trên nhé:
```
docker ps
```
![image.png](https://images.viblo.asia/566e8593-968e-4030-a151-a322c841d2ca.png)

### 2. Cài đặt PostgresSQL trên MacOS và Windows
Để cài đặt PostgresSQL lên MacOS hoặc Windows anh em lên trang này và tải về theo hệ điều hành của mình nhé
https://www.postgresql.org/download/
![image.png](https://images.viblo.asia/8cb90ef2-9f5d-45f5-8557-e5f5ba437bf4.png)

Ở bước cuối nó sẽ hỏi anh em có muốn cài thêm tool gì không, tích vào không nếu không có nhu cầu và hoàn thành anh em nhé. 
![image.png](https://images.viblo.asia/070890b4-f57d-4068-9358-45c5f07fc444.png)

Sau khi cài đặt xong thì PostgresSQL sẽ đi kèm thêm PgAdmin anh em mở lên và tận hưởng nhé
![image.png](https://images.viblo.asia/6253a2cd-9ee4-499f-aa55-f92890c5c57f.png)


Cảm ơn anh em đã đọc tới đây, nếu thấy hữu ích, cho mình 1 upvote để có động lực ra thêm các bài tiếp theo nhé.

Ở bài tiếp theo mình sẽ giới thiệu đẩy đủ các kiểu dữ liệu trong postgresSQL anh em tiếp tục theo dõi ở đây nhé.

Kiểu dữ liệu trong postgresSQL: https://viblo.asia/p/kieu-du-lieu-trong-postgressql-data-types-5pPLkGOZLRZ