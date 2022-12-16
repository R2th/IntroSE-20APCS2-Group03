**Câu hỏi:**

Trong khi phát triển microservices system thỉnh thoảng chúng ta hay phải dùng mesaage queue, anh em hay dùng queue nào và tại sao? (Rabbitmq, kafka, ...)

Context của mình là sẽ gửi 10M msg lên queue hàng ngày (nhiều nguồn), message lại phải đảm bảo được lưu trữ dài lâu, được phân tích để hiển thị Dashboard hoặc gửi notification near real time, msg sẽ được lưu persistance để phục vụ phân tích....hệ thống cảnh báo

**Gợi ý:**

- Mình hay dùng RabbitMQ vì tính phổ biến của nó, đôi khi mình xài Redis luôn cho các tác vụ đơn giản và nhanh. Mình cũng đang xem business case cho việc dùng Kafka.

- Tuỳ cloud provider, nếu như azure thì có sẵn event hub, service bus xài luôn cho tiện. Aws thì SQS, tự setup thì tuỳ nhu cầu nhưng kafka thì khá reliable. 

Điểm mình thích nhất của Kafka là có consumer offset nên rất dễ control được msg. Điểm thích nhất của RabbitMQ là routing topology của nó cực kì good nhưng mà cái storage của nó hơi tởm . 

Nếu CTY lớn có platform team thì tự host không sao chứ bạn tự host tự maintain mất thời gian lắm vì chắc chắn runtime sẽ có issue.

**Tuy nhiên ở đây có 1 số điểm cần lưu ý:**

- "Nhiều nguồn": Tôi đoán bạn đang thu thập data từ các thiết bị IoT? Nếu là case này thì đầu nhận nên hỗ trợ MQTT.

- AWS: hệ thống của bạn deploy lên AWS thì dễ nhất là dùng cái có sẵn của AWS luôn đi. Đầu nhận MQTT có, MsgQueue có, Storage có, v.v...

- Đầu nhận mgs tách riêng với queue thì sẽ flexible hơn. Ít nhất là rộng đường để suy nghĩ lựa chọn. 

Và nên suy nghĩ tách luôn các phần đầu nhận, queue, storage, business logic, v.v...ra, đừng nhập nhằng 

(phần "message lại phải đảm bảo được lưu trữ dài lâu, được phân tích để hiển thị Dashboard hoặc gửi notification near real time, msg sẽ được lưu persistance để phục vụ phân tích" trong comment của bạn, nếu đặt trong context đang hỏi về "queue" thì nó ko có liên quan gì cả).

- Và quan trọng hơn hết, nguyên cái context của bạn tới giờ này không có liên quan gì lắm tới "microservices". 1 lời khuyên: đừng chạy theo các từ ngữ/trend "hào nhoáng", chỉ đơn giản: problem đang là gì, phải cần gì/làm gì để xử lý problem đó.

- Kafka nói riêng hay mấy cái queue nói chung thường có kiểu prefetch một số message, nếu không ack messages vì bất cứ lý do gì thì consumer app sẽ không nhận thêm được msgs, thường bị hoài. Cho nên process xong phải nhớ ack, có issue thì một là deadletter hoặc ack hay requeue gì đó chứ không message lock msgs khác. 

- Mình thấy thế giới dùng RabbitMQ nhiều hơn, tuổi đời lớn, cộng đồng rộng, có nhiều cách tiếp cận, riêng mình thấy kafka phù hợp cho logging, còn RabbitMQ có thể áp dụng cho hầu hết trường hợp để communicate giữa các services

Nguồn bài viết:
https://tech.homestudy.edu.vn/thread/cac-loai-mesaage-queue-thuong-dung-trong-microservices/