### RabbitMQ là gì?
RabbitMQ là một phần mềm trung gian giúp các hệ thống, server, ứng dụng có thể giao tiếp, trao đổi dữ liệu với nhau. Nhiệm vụ của RabbitMQ được hiểu đơn giản là: **nhận message từ nhiều nguồn => lưu trữ, sắp xếp sao cho hợp lý => đẩy tới đích đến**

Là một message broker mã nguồn mở, có dung lượng nhẹ, dễ dàng triển khai trên rất nhiều hệ điều hành lẫn Cloud, vì thế RabbitMQ vô cùng được ưa chuộng và trở nên phổ biến trong thời gian qua. Vậy chúng ta có câu hỏi, **message broker là gì?**

Message broker là được thiết kế để validating, transforming và routing messages. Chúng phục vụ các nhu cầu giao tiếp giữa các ứng dụng với nhau.

Với Message broker, ứng dụng nguồn (producer) gửi một message đến một server process mà nó có thể cung cấp việc sắp xếp dữ liệu, routing, message translation, persistence và delivery tất cả điểm đến thích hợp(consumer).

Có 2 hình thức giao tiếp cơ bản với một Message Broker:

1. Publish và Subscribe (Topcs)
2. Point-to-Point (Queues)
### Ví dụ về RabbitMQ
Ta lấy ví dụ tạo một file và tải về của một trang web mà hàng trăm hàng nghìn user sẽ click vào nút đó, lúc này server sẽ nhận rất nhiều request cùng lúc gây ra chậm, quá tải hoặc nghẽn quá trình tạo file và tải về... Lúc này ta cần đến RabbitMQ để đẩy các request này vào hàng chờ với cơ chế:
Một consumer lấy message từ hàng đợi và bắt đầu xử lý file trong lúc một producer đang đẩy thêm những message mới vào hàng đợi. Một request có thể được tạo bằng ngôn ngữ này và xử lý bằng một ngôn ngữ khác. Do đó hai client gửi và nhận sẽ có độ ràng buộc thấp.
### Cơ bản về RabbitMQ với Golang và Docker
Cài đặt: Các bạn có thể lên trang rabbitmq.com để thêm thông tin cài đặt nhé, ở đây mình sẽ sử dụng qua [docker](https://viblo.asia/p/lam-viec-voi-docker-RnB5pJNbZPG) với ubuntu cho tiện hehe:
```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management
```
![image.png](https://images.viblo.asia/083ac3d2-4836-4e9c-b232-34d24a790c49.png)
Thế này là RabbitMQ đã chạy thành công rồi nha, tiếp theo chúng ta sẽ demo cách thức hoạt động nhé:
Chúng ta sẽ có 3 thứ cần lưu ý ở đây:
![image.png](https://images.viblo.asia/bd3408ac-3292-42af-a678-c8319724da07.png)
Ta có P nghĩa là Producer có trách nhiệm gửi message. C là một consumer sử dụng để đợi nhận message. Chúng ta có gửi và nhận message thì cuối cùng ta có ![image.png](https://images.viblo.asia/0b3b4f8c-b319-43c7-a7b1-8fa8a3f1c724.png)
Queue sẽ là nơi lưu trữ các mesage bên trong, nhiều Producer có thể gửi messages vào 1 queue và cũng nhiều consumers có thể nhận messages từ 1 queue đó. Chúng ta sẽ bắt đầu với basic của RabbitMQ nhé.
```
go get github.com/streadway/amqp
```
Ta cài thư việt amqp sau đó tạo một cấu trúc file như sau:
![image.png](https://images.viblo.asia/55adbbc0-b188-4582-8252-a64b7d527b5a.png)
Sau đó chúng ta sẽ tạo ra một helper func để kiểm tra giá trị mà amql gọi về trong send.go
```
func failOnError(err error, msg string) {
  if err != nil {
    log.Fatalf("%s: %s", msg, err)
  }
}
```
Tiếp đến ta connect đến RabbitMQ qua port 5672 và tạo 1 channel để chứa API khi hoàn thành:
![image.png](https://images.viblo.asia/6056dc41-0021-41cc-bc9e-2974364eedee.png)
Ta khởi tạo một Queue và Publish để send message đi nhe:
![image.png](https://images.viblo.asia/1c74a25f-ba38-4ce6-95bf-4f54920f4d39.png)
Đến với receive/receive.go ta vẫn có failOnError để kiểm trả value trả về, connect và tạo ra channel để chứa API hoàn thành:
![image.png](https://images.viblo.asia/de40a3a3-4aac-4a07-ae86-fc6a307030f4.png)
Phần dưới:
![image.png](https://images.viblo.asia/789a2e7d-8b70-4a68-9b2f-f5dc0e0d4139.png)
Ta yêu cầu server gửi một tin nhắn từ Queue. Vì nó push những message asynchronously( bất đồng bộ) cho nên ta sẽ đọc tin nhắn từ channel ( return amqp::Consume) trong goroutine.

Cuối cùng sau khi hoàn thành 2 file ta chạy lệnh ở 2 file cùng kết quả ta nhận được:
![image.png](https://images.viblo.asia/d8d1e78e-8571-46b5-ab30-dac8eab082f4.png)
Các thông tin kết nối từ RabbitMQ server:
![image.png](https://images.viblo.asia/2f637dfa-8425-408f-a2c7-49f6891ea4bb.png)

### Tóm lại
Mình đã tóm tắt lại các thông tin cũng như cách thức hoạt động cơ bản về RabbitMQ. Tuy nhiên vẫn sẽ còn những điều khó hiểu ở đây, mình sẽ đi sâu hơn để các bạn có thể thấy rõ ứng dụng của RabbitMQ trong blog sau nhé. Hy vọng bài viết sẽ giúp ích các bạn, have a nice day <3.

Bài viết đã tham khảo:

[Tìm hiểu và sử dụng RabbitMQ](https://medium.com/@duynam_63755/rabbitmq-l%C3%A0-g%C3%AC-t%C3%ACm-hi%E1%BB%83u-v%C3%A0-s%E1%BB%AD-d%E1%BB%A5ng-rabbitmq-a261193b0c29)

[RabbitMQ and Go](https://www.rabbitmq.com/tutorials/tutorial-one-go.html)

[RabbitMQ là gì? Tìm hiểu và sử dụng RabbitMQ](https://topdev.vn/blog/rabbitmq-la-gi/#:~:text=RabbitMQ%20l%C3%A0%20m%E1%BB%99t%20AMQP%20message,c%C3%A1c%20b%E1%BB%A9c%20th%C6%B0%20c%E1%BB%A7a%20m%C3%ACnh.)