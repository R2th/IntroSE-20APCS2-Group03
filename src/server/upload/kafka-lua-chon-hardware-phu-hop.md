**Tại sao chúng ta lại quan tâm đến việc chọn hardware**
* Lựa chọn cấu hình của Kafka Broker thực chất nó không khó nhưng cũng cần có nghệ thuật, thậm chí nó là cả một công trình nghiên cứu khoa học. 
    * Vì không có bất cứ một yêu cầu nghiêm ngặt nào về việc lựa chọn cấu hình hardware cho Kafka.
    * Nó thể hoạt động tốt trên tất cả các system khác nhau
    * Vấn đề chính được quan tâm chính là hiệu năng của nó.
* Tuy nhiên, sẽ có một vài nhân tố sẽ đóng góp đến tổng thể hiệu năng của nó như: 
    * Disk Throughput
    * Capacity
    * Memory
    ...
* Một khi bạn xác định được loại hiệu năng nào quan trọng nhất cho hệ thống của chính bạn, thì có khả năng chọn tối ưu được hardware.

## Disk Throughput
* Hiệu năng của producer-client sẽ ảnh hưởng trực tiếp bởi throughput của broker *disk*, được sử dụng cho việc lưu trữ *log-segments*. Kafka phải được commited đến *local-strorage* khi nó được produced, tất cả các client phải đợi cho đến khi broker cuối cùng xác nhận đã committed xong sau đó gửi một tín hiệu thông báo là gửi message thành công. Điều này có nghĩa là khi đĩa ghi thực hiện nhanh sẽ tạo ra độ trễ cực thấp cho hệ thống của chính bạn.
* Quyết định rõ ràng khi nói đến việc lựa chọn thông lượng của *disk* là việc sử dụng truyền thống spinning-drive-hards(HDD) hoặc solid-state-disks(SSD). 
    * SSDs có khả năng tìm kiếm và truy cập cực kì nhanh -> cung cấp hiệu năng tốt. 
    * HDDs: một lựa chọn khác, thì tiết kiệm hơn cũng như cung cấp khả năng tốt hơn cho mỗi đơn vị. Để Có thể cải thiện hiệu năng của HDDs, bằng việc sử dụng nhiều HDDs trong 1 broker. Bằng cách cấu hình thư mục dữ liệu một cách độc lập.
    
## Disk Capacity
* Một phần khác cũng cần được quan tâm đó là **Dung Lương**. Số lượng disk lưu trữ cũng cần được xác định bởi sẽ có bao nhiêu message cần được lưu trữ còn lại tại mỗi thời gian. 
* Nếu broker mong muốn nhận khoảng 1TB traffic mỗi ngày, cũng như lưu lại trong 7 ngày -> đẫn đến broker cần ít nhất là 7TB được sử dụng cho việc lưu trữ *log*. 
* Bạn nên có ít nhất 10% của những file khác, hoặc cũng nên dự phòng cho việc dao động traffic cho một vài thời gian hệ thống sử dụng nhiều hơn.
* Khả năng lưu trữ cũng nên được xem xét khi sizing của Kafka Cluster, có thể mở rộng sau đó.
=> Tổng số lượng traffic của cluster phải được cân bằng khi có nhiều partitions cho mỗi topic, khi khả năng lưu trữ xảy ra là không đủ thì có thể bổ sung thêm được.

## Memory
* Một phần trong hoạt động bình thường consumer trong Kafka là đọc message từ cuối của các partitions, nơi các consumer bị tụt hậu (còn quá nhiều message cần xử lý). Nếu vậy trong trường hợp này thì consumer cần đọc message từ vùng nhớ đệm(page cache), kết quả này làm việc đọc message nhanh hơn so với việc đọc từ disk. Vì vậy có nhiều memory cache sẽ làm tăng hiệu năng của consumer client.
* Thực chất Kafka không cần quá nhiều *heap memory* cho việc cấu hình Java Virtual Machine(JVM). Thậm chí nó có thể xử lý “X messages per second and a data rate of X megabits per second can run with a 5 GB heap”. 
* Phần còn lại của memory thực chất là được xử dụng cho việc *page cache*. Lợi ích cho việc hệ thống có thể cache “log segment” được sử dụng. Đây là lý do chính nên khuyến khích nên setup Kafka chạy riêng biệt không dùng chung với bất cứ ứng dụng khác -> góp phần làm tăng hiệu năng của nó.

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang