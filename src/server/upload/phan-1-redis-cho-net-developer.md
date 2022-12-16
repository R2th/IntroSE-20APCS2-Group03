Chào mọi người, 

Hôm này mình sẽ giới thiệu tới mọi người cách sử dụng Redis trong .NET 6. 
Ở phần 1 mình sẽ giới thiệu về redis, cách cài đặt môi trường và một số lệnh command cơ bản.
Hy vọng qua bài viết này mọi người sẽ hiểu cơ bản về redis và cách ứng dụng vào các projects.

Không để mọi người chờ lâu, bắt đầu luôn nào!

### I. Cài đặt môi trường và source code(github)

Bài viết này mình sẽ sử dụng:
- NET 6
- Visual Studio 2022 Community
- Docker
- Redis
- SQL Server
- BenchmarkDotNet

Source code demo trên Github: https://github.com/TechMarDay/Redis_Saga

### II. Giới thiệu về Redis

- Redis là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ mã nguồn mở (open-source).
- Được sử dụng làm cơ sở dữ liệu, bộ nhớ cache và message broker.
- Redis giữ toàn bộ cơ sở dữ liệu của nó trong bộ nhớ.
- Disk được sử dụng để lưu trữ dữ liệu liên tục. (persistent data storage)
- Redis là một cơ sở dữ liệu NoSQL và tuân theo các khái niệm lưu trữ khóa-giá trị. (key-value_

![image.png](https://images.viblo.asia/8b013503-0c20-4e4a-9c03-84c9104215fc.png)

- Nó hỗ trợ cấu trúc dữ liệu mạnh mẽ như  strings, hashes, lists, sets, stored set, bitmap, hyperloglogs.
- Redis có thể được kết nối với nhiều client khác nhau.
![image.png](https://images.viblo.asia/1548ab29-fab5-4d05-a8a9-8562d42732c1.png)

**Redis Persistence**

- RDB (Redis DataBase file): thực hiện tạo Snapshot DB và sao lưu vào ổ cứng mỗi khoảng thời gian nhất định.
- AOF (Append Only File): AOF ghi lại tất cả các thao tác liên quan đến việc cập nhật dữ liệu từ server mỗi khi có thay đổi.

### III. Cài đặt redis bằng docker

- Chạy lệnh docker command: **docker run --name MyRedis -d -p 6379:6379 redis:6.2.6-alpine**
![image.png](https://images.viblo.asia/a16ba873-2b68-4ce1-a30a-8d5a84fcc820.png)

![image.png](https://images.viblo.asia/7b5445f1-7c02-43a8-8271-6b61db4c2d3a.png)


- Kiểm tra kết nối với docker CLI
![image.png](https://images.viblo.asia/be3b1ab7-8c3e-4a2e-b3c6-dd6a1cf67341.png)

### IV. Các lệnh redis command cơ bản

- PING, CONFIG GET, CONFIG SET, KEYS, GET, SET, FLUSHALL...
![image.png](https://images.viblo.asia/fb6eb5d4-4804-4ac6-9491-6a423cc71c43.png)

- File config example: https://raw.githubusercontent.com/redis/redis/unstable/redis.conf
- Commands reference: https://redis.io/commands/?group=list

Vậy là đã xong phần 1 về redis. Hy vọng các bạn đã hiểu tổng quan về redis, cách cài đặt và sử dụng một số lệnh cơ bản. Ở phần sau cũng là phần chính, mình sẽ nói về việc sử dụng redis trong .NET 6. 



**Tham khảo:**
* http://taswar.zeytinsoft.com/redis-password/
* http://taswar.zeytinsoft.com/redis-geospatial/
* https://stackoverflow.com/questions/10558465/memcached-vs-redis
* https://www.codeproject.com/Articles/1222027/Creating-a-Very-Simple-Console-Chat-App-using-Csha
* https://www.learmoreseekmore.com/2020/11/stackexchange-redis-extension-library.html
* https://redis.io/commands/geoadd/
* http://taswar.zeytinsoft.com/redis-transactions/
* https://medium.com/@kayamuhammet/asp-net-core-web-application-session-state-management-redis-implementation-dec75e0598c2