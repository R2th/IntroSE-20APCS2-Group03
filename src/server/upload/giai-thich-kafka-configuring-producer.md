* **acks**
    * ack = 0:  là producer sẽ không đợi nhận response từ broker, trước khi xem việc gửi là thành công hay thất bại. Điều này có nghĩa là nếu khi xảy ra lỗi, broker không nhận được message thì producer sẽ không biết về tình trạng của message, message có thể bị mất. Tuy nhiên bởi vì không đợi nhận kết quả từ server nên khả năng xử lý message của nó là cực kì nhanh.
    * ack = 1:  producer sẽ nhận kết quả thành công từ broker, tại thời điểm đó leader sẽ nhận được message. Nếu message không được ghi xuống leader thì producer sẽ nhận kết quả là error và chúng có thể thử gửi lại message, tránh trường hợp bị mất data. Trong trường hợp này thông lượng xử lý phụ thuộc vào việc chúng ta send message theo cơ chế là synchronously hay asynchronously. Nếu chúng ta xử lý đợi message response từ server làm tăng độ trễ đáng kể. Còn nếu bạn xử lý callbacks, độ trễ sẽ được giảm đi nhưng số lượng message được gửi sẽ bị giới hạn trong một lần ( ví dụ có bao nhiêu message được gửi trong producer trước khi nhận được replies từ server)
    * ack = all:  là producer sẽ nhận kết quả thành công từ broker, tất cả các bản sao sẽ đồng thời nhận message, cơ chế này là một mô hình an toàn, bạn có thể chắc chắn rằng có ít nhất một broker sẽ nhận được message từ producer và sẽ đồng bộ khi crash xảy ra. Tuy nhiên độ trễ cao, từ đó chúng ta sẽ chờ cho nhiều hơn một broker nhận message.
   
*  **buffer-memory**
    *  là tổng số lượng byte memory được sử dụng cho việc lưu trữ, trong quá trình đợi gửi message đến server. Nếu message gửi đến ứng dụng nhanh hơn quá trình xử lý gửi message đến server thì producer sẽ block trong một khoảng thời gian *max.block.ms sau* đó sẽ quăng ra exception.
    *  cài đặt này phải tương ứng với tổng lượng memory của producer được dùng, nhưng không fix cứng mà có thể buffering thêm. Một số bộ nhớ bổ sung sẽ dùng cho việc nén dữ liệu và một phần sẽ dùng cho việc hoạt động.

* **retries**
    * khi producer nhận error message từ server, có thể error chỉ là tạm thời ( thiếu leader của partittion ). Giá trị của parameter retries là quản lý có bao nhiêu lần mà producer sẽ cố gắng gửi message lại đến server trước khi trả về error cho client.
    * Mặc định producer sau khi gửi message lần đầu error nó sẽ đợ 100ms để gửi lại, nhưng chúng ta có thể quản lý và thay đổi nó được. 

* **batch-size**
    * khi nhiều records được gửi đến chung 1 partition, producer sẽ batch chúng cùng nhau. Parameter này để quản lý số lượng memory được sử dụng cho mỗi batch. Khi batch đầy thì tất cả các message sẽ gửi đi.
    * tuy nhiên điều này không có nghĩa là phải đợi đủ size mới gửi đi, producer sẽ gửi một nữa hoặc là chỉ có 1 message cũng gửi đi. Vì vậy, config *batch.zise* không phải là nguyên nhân dẫn đến nó bị trễ. 

* **linger-ms**
    *  là quản lý thời gian cho việc đợi add message đến batch hiện. Producer sẽ gửi batch khi *linger-ms* đạt hoặc full. Mặc định, producer sẽ gửi message càng sớm càng tốt khi nó kiểm tra có một sender available, thậm chỉ lúc đó chỉ có 1 message. Cần config *linger-ms* lớn hơn 0, vì producer sẽ cần vài milliseconds để add message vào batch trước khi gửi đến broker, thuộc tính này làm tăng độ trễ nhưng cũng tăng thông lượng của kafka.