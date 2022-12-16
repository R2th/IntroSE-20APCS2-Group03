## Tại sao phải dùng consumer
* Giả sử bây giờ bạn có một ứng dụng và cần đọc message từ Kafka Topic, chạy thêm một nhiều bước validations, cuối cùng lưu nó lại trên cơ sở dữ liệu. Trong trường hợp này ứng dụng của bạn cần tạo một consumer object, subscribe topic phù hợp và bắt đầu nhận message, validate sau đó ghi kết quả xuống hệ thống.
* Nếu không sử dụng consumer thì nó vẫn hoạt động tốt một thời gian ngắn nào, nhưng nếu tỉ lệ producer nhận message vào topic ngày một tăng lên, thì lúc này ứng dụng của bạn có còn đủ sức để xử lý nữa không.
* Nếu bạn giới hạn số lượng xử lý message, đọc dữ liệu lên rồi xử lí, lúc này bạn sẽ bị thụt lùi về phía sau khi hệ thống nhận message quá nhiều mà không xử lý đầu ra kịp dẫn đến độ trễ của hệ thống. Đặt vấn đề là hệ thống cần scale tiêu thụ message, có nhiều producer write thì lúc này cần có nhiều consumer để đọc dữ liệu.

## Consumer là gì
* Kafka consumer là phần quan trọng của consumer group, khi có nhiều consumer subscribe từ một topic và cùng chung một consumer group, mỗi consumer trong group sẽ nhận message từ các partition khác nhau trong topic.
* Bây giờ ta có 1 topic T1 có 4 partition. Giả sử chúng ta tạo consumer C1 và chỉ có duy nhất consumer C1 group G1, và use sử dụng C1 để subscribe đến topic T1, lúc này C1 sẽ nhận tất cả message từ 4 partition.
![](https://images.viblo.asia/6edf4695-38a7-47a3-b69e-6d5131fd265f.png)
* Nếu chúng ta tạo consumer C2 trong group G1, mỗi consumer C1,C2 sẽ chỉ nhận message từ 2 partition ngẫu nhiên.
![](https://images.viblo.asia/67ad2223-b688-4fc9-8200-1472a5679824.png)
* Nếu tạo 4 consumer trong G1 thì mỗi consumer sẽ read message từ 1 partition.
![](https://images.viblo.asia/bb439323-aa23-4374-ac7e-d95980587fa1.png)
* Nếu tạo consumer có số lượng nhiều hơn số partition thì một vài consumer sẽ là idle và không nhận message.
![](https://images.viblo.asia/6a9f1d6b-747d-4204-83e9-917b9f72b3cd.png)
* Cách làm này để chúng ta có thể scale khả năng read message từ topic bằng cách add nhiều consumer trong group, góp phần giúp các hoạt động có độ trễ cao xuống thấp hoặc các tính toán phức tạp của data.
![](https://images.viblo.asia/24e8a0cd-d514-4555-a308-d84c52ce5490.png)