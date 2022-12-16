### Redis là gì?
**Redis ( REmote DIctionary Server)** là một mã nguồn mở được dùng để lưu trữ dễ liệu có cấu trúc, có thể sử dụng như một database, bộ nhớ cache hay một message borker.

Là hệ thống lưu trữ dữ liệu với dạng Key-Value rất mạnh mẽ và phổ biến hiện nay. **Redis** nổi bật bởi việc hỗ trợ nhiều cấu trúc dữ liệu cơ bản như: hash, list, set, sorted set, string... Tất cả dữ liệu được ghi và lưu trên ram, do đó tốc độ đọc ghi dữ liệu rất là nhanh.

### Ứng dụng của Resdis
Sau khái niệm redis là gì thì chúng ta hãy đi đến ứng dụng của Redis, ngoài tính năng lưu trữ Key-Value trên RAM thì redis còn hỗ trợ sắp xếp, query, backup dữ liệu trên đĩa cứng giúp bạn có thể phục hồi dữ liệu khi hệ thống gặp sự cố... và có thể nhân bản (Chạy nhiều Server Redis cùng lúc).

**Caching:** Sử dụng làm bộ nhớ đệm. Tóc độ đọc ghi nhanh mà Redis có thể làm bộ nhớ đệm, nơi chia sẻ dữ liệu giữa các ứng dụng hoặc làm database tạm thời. Ngoài ra Redis có thể sử dụng làm Full Page Cache cho website. Cũng vì tính nhất quán của Redis, cho dù restart Redis thì người dùng cũng không có cảm nhận châm khi tải trang.
**Counter:** Sử dụng làm bộ đếm. Với thuộc tính tăng giảm thông số rất nhanh trong khi dữ liệu được ghi trên RAM, sets và sorted sets được sử dụng thực hiện đếm lượt view của một website, các bảng xếp hạng trong game chẳng hạng. Redis hỗ trợ thread safe do đó nó có thể đồng bộ dữ liệu giữa các request.
**Publish/Subscribe(Pub/Sub):** Tạo kênh chia sẻ dữ liệu. Redis hỗ trợ tạo các chanenl để trao đổi dữ liệu giữa publisher và subscriber giống như channel trong Socket Cluster hay topic trong Apche Kafka. Ví dụ: Pub/Sub được sử dụng theo dõi các kết nói trong mạng xã hội hoặc các hệ thống chat.
**Queues:** Tạo hàng đợi để xử lý lần lượt các request. Redis cho phép lưu trữ theo list và cung cấp rất nhiều thao tác với các phần tử trong list, vì vậy nó còn được sử dụng như một messag queue.
### Cài đặt Redis
Các bạn có thể tham khảo trên trang chủ https://redis.io/docs/getting-started/installation/ nhé. Ở đây mình sẽ cài Redis trên Ubuntu của mình.
```
sudo apt-get update
sudo apt-get install redis
```
Sau khi cài xong thì các bạn hãy gõ dòng lệnh này để kiểm tra xem Redis server đã hoạt động hay chưa:
```
redis-cli ping
```
Nếu kết quả trả về là *Could not connect to Redis at 127.0.0.1:6379: Connection refused* thì có thể bạn chưa ping được đến server của Redis. Gõ dòng lệnh sau đây để start redis server nhé.
```
redis-server
```
và chạy lại *redis-cli ping* lần nữa nhé nếu PONG thì là bạn đã thành công rồi :D
### Golang & Redis
Tiếp theo chúng ta sẽ connect với Redis thông qua Golang nhóe. Đầu tiền là chúng ta import thư viện của go-redis vào:
```
go get github.com/go-redis/redis
```
Sau đó chúng ta define một client sau đó sử dụng client.Ping().Result() để kiểm ra xem chúng ta đã ping được đến Redis server hay không. Code:
![image.png](https://images.viblo.asia/392daf92-4c3e-4640-b1a7-cb1221d4edb9.png)

Đây là kết quả của mình sau khi chạy go run main.go

![image.png](https://images.viblo.asia/76571b54-b2ec-4621-850d-29fb662b5c07.png)

**Get Set Values**
Ở phần trước chúng ta đã kết nối với redis vậy nên giớ chúng ta sẽ xem việc Get và Set của Redis như thế nào nhé:
Ở đây mình set một Key "name" có chứa Value là "Quang"
```
err = client.Set("name", "Quang", 0).Err()
// handle the error
if err != nil {
    fmt.Println(err)
}
```
Sau đó ta sử dụng Get để lấy giá trị về
```
val, err := client.Get("name").Result()
if err != nil {
    fmt.Println(err)
}
fmt.Println(val)
```
Chúng ta sẽ có kết quả
```
NXQ GO Redis
PONG <nil>
Quang
```
Full code(ở đây mình thêm code để track thời gian set get của Redis)
![image.png](https://images.viblo.asia/e5f56067-fa90-4388-af51-38e680757f15.png)
Kết quả mình nhận được cho 99999 dữ liệu Get, Set
![image.png](https://images.viblo.asia/92d2b692-e60b-4bea-854c-dae461bdcd58.png)
**Work with Json**
Tiếp theo chúng ta sẽ kết hợp Json vào nhé xD
![image.png](https://images.viblo.asia/c6d936cd-6d46-464d-83c9-b7ffecaf8072.png)
Kết quả:
![image.png](https://images.viblo.asia/9c7ebf99-94d1-46bb-833a-fcd66fe04615.png)
### Kết
Bài viết trên có hơi lủng củng nhưng cũng tóm tắt lại về Redis là gì và GET SET cơ bản với Redis cùng Golang. Hy vọng sẽ giúp ích được bạn, have a nice day <3
Bài viết tham khảo:
Getting Started with Redis and Go - Tutorial: https://tutorialedge.net/golang/go-redis-tutorial/
Redis là gì? Ưu điểm của nó và ứng dụng: https://topdev.vn/blog/redis-la-gi/