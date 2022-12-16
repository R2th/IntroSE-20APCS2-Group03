## 1. Scaling

* **Scaling** được định nghĩa là khả năng của một tài nguyên CNTT có thể xử lý các nhu cầu (demands) khi tăng hoặc giảm. Đây là một trong những tính năng phổ biến và có lợi nhất của điện toán đám mây, vì các doanh nghiệp có thể tăng hoặc giảm để đáp ứng nhu cầu dựa trên từng khoảng thời gian, theo các giai đoạn của dự án và hơn thế nữa. Bằng cách triển khai khả năng mở rộng đám mây (cloud scalability), bạn cho phép tài nguyên của mình phát triển khi lưu lượng truy cập tăng lên hoặc quy mô tổ chức của bạn được mở rộng và ngược lại. 

![](https://images.viblo.asia/466ab4c5-15e4-4726-baf8-af91739c9d02.png)


* **Scalability** đưa ra ý tưởng về một hệ thống trong đó mọi ứng dụng hoặc phần cơ sở hạ tầng có thể được mở rộng để xử lý tải tăng (increased load).  Các hệ thống thường áp dụng tính scalability lên 4 thành phần sau:  
    * Disk I/O
    * Memory
    * Network I/O
    * CPU
* Có một vài cách chính để mở rộng quy mô trong cloud:
    * Vertical Scaling
    * Horizontal Scaling
    * Diagonal Scaling

    
 ## 2. Vertical scaling

* **Vertical scaling** là thứ mà phần lớn mọi người sẽ nghĩ tới khi nhắc đến scaling. Đây là loại scaling truyền thống không thực sự yêu cầu bất kỳ sửa đổi ứng dụng nào.
* Hãy tưởng tượng một ứng dụng chạy trên một máy chủ ảo và giả sử, nó có thể xử lý 1.000 khách truy cập mỗi giờ. Nếu blog của bạn trở nên phổ biến và bắt đầu nhận được 1500 khách truy cập mỗi giờ thì trải nghiệm của họ tại trang web sẽ giảm. Máy chủ ảo sẽ không có đủ tài nguyên để xử lý một cách hoàn hảo. Khi ấy, vấn đề đặt ra là bạn cần mở rộng quy mô máy chủ: tăng kích thước của máy chủ bằng cách thêm CPU, bộ nhớ bổ sung, dung lượng ổ đĩa,... 
* **Vertical scaling** đạt được bằng cách thêm tài nguyên bổ sung dưới dạng CPU hoặc bộ nhớ vào máy hiện có. Bằng cách đó, máy có thể phục vụ thêm khách hàng hoặc thực hiện các tác vụ tính toán nhanh hơn để bạn có thể đi từ máy chủ trung bình (medium server) đến máy chủ lớn (large server) hay thậm chí đến máy chủ cực lớn (extra large server) và khi làm như vậy, bạn có thể đối phó với sự gia tăng không ngừng số lượng người dùng.

![](https://images.viblo.asia/6d815dd4-9f85-4bc3-a124-5b72943354ce.png)

* Máy chủ ảo càng lớn hoặc instance càng lớn thì càng có nhiều người dùng nhưng nhìn chung nó có một số hạn chế thực sự quan trọng. 
    + Khi chỉ có một instance hoặc một máy chủ ảo duy nhất lưu trữ ứng dụng, điều đó cũng có nghĩa là rủi ro tăng lên đáng kể. 
    + Một vấn đề khác là có những giới hạn đối với việc một instance có thể lớn đến mức nào. Bạn có thể tiếp tục thêm CPU, bộ nhớ bổ sung, nhưng đến một lúc nào đó chúng sẽ đạt đến giới hạn. Quy mô càng lớn, bạn càng tốn nhiều phí cho mỗi đơn vị năng lực bổ sung. Trong trường hợp máy chủ vật lý, bạn cần tắt nguồn máy chủ và thực hiện thay đổi phần cứng máy chủ đó. Nếu đó là một máy chủ ảo, bạn thường có thể thay đổi tài nguyên nhưng nó vẫn yêu cầu khởi động lại. Điều này gây gián đoạn cho trải nghiệm của người dùng.

## 3. Horizontal scaling

* **Horizontal scaling** là một kiến trúc hoàn toàn khác. Với horizontal scaling, chúng ta không tăng kích thước của instance, thay vào đó là thêm các instance bổ sung.
* Một platform, thay vì là một instance lớn, có thể sử dụng 1, 3, 6 hoặc thậm chí hàng trăm instance nhỏ hơn. Horizont scaling đạt được bằng cách thêm các máy bổ sung vào nhóm tài nguyên mà mỗi máy cung cấp cùng một dịch vụ. Horizont scaling không bị giới hạn kích thước của quy mô ảo và nó thực sự có thể mở rộng đến mức gần vô hạn nhưng nó yêu cầu hỗ trợ từ ứng dụng để mở rộng hiệu quả.

![](https://images.viblo.asia/a9d75909-56d1-4ccc-a564-9c2f8afba120.png)

* Các nhược điểm của Vertical scaling gần như đều được khắc phục khi sử dụng Horizont scaling:
    - Phân tán rủi ro lên nhiều thành phần nhỏ thay vì lên một khối duy nhất
    - Có thể thực hiện Scaling thường xuyên mà không bị ngừng hoạt động vì bạn chỉ thêm tài nguyên bổ sung chứ không thay đổi tài nguyên hiện có nên bản chất là không phá vỡ việc cung cấp dịch vụ hiện tại của mình.
    - Chi phí rẻ hơn: Sử dụng 10 máy chủ có kích thước bằng 1/10 kích thước của máy chủ lớn duy nhất thì 10 máy chủ đó có giá rẻ hơn so với 1 máy chủ lớn nhất 
* Horizont scaling yêu cầu cấu hình phức tạp hơn so với Vertical scaling , nhưng sẽ hiệu quả hơn nhiều nếu bạn có thể sử dụng nó.

## 4. Diagonal Scaling
*  Đây là phương pháp kết hợp hai cách scaling trên. Diagonal scaling cung cấp sự linh hoạt cho khối lượng công việc đòi hỏi nguồn lực bổ sung trong một thời gian cụ thể. 
*  Khi kết hợp cả vertical và horizontal, bạn chỉ cần mở rộng trong máy chủ hiện tại của mình cho đến khi bạn đạt được dung lượng như ý. Sau đó, bạn có thể sao chép (clone) máy chủ đó khi nhu cầu tăng, cho phép bạn xử lý đồng thời rất nhiều yêu cầu và lưu lượng truy cập.

![](https://images.viblo.asia/eb8134c4-dfaa-4444-8764-f28c7857a3a3.png)