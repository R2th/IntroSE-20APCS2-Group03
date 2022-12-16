### 1. AWS Region và Availability Zone
**AWS Region** là những vùng địa lý riêng biệt trải dài trên khắp thế giới với ý tưởng là khi có 1 thảm họa tự nhiên hoặc do con người gây nên tại 1 vùng nhất định, thì vẫn còn những khu vực khác đảm bảo hoạt động không bị gián đoạn.

Việc có nhiều khu vực cũng đem lại lợi ích về tốc độ trong việc truy xuất dữ liệu hoặc sử dụng dịch vụ gần với khách hàng.

**Availability Zone** (AZ) là một bộ tài nguyên độc lập trong từng Region.

Mỗi Region cần có ít nhất 2 AZ để đảm bảo an toàn, ví dụ như trong trường hợp hỏa hoạn cháy nổ tại 1 AZ thì không nên ảnh hưởng đến các AZ còn lại. 

Các AZ được liên kết với nhau thông qua một đường truyền tốc độ cao. Điều này giúp ích cho bạn trong việc thiết kế một hệ thống chạy như là chỉ có 1 trung tâm dữ liệu tập trung mà vẫn đảm bảo được độ an toàn khi có 1 AZ gặp sự cố.

Tham khảo thông tin chi tiết về AWS Region và Availability Zone tại:

https://aws.amazon.com/about-aws/global-infrastructure/

Ở đó sẽ có một số thông tin về:
- Những Region, AZ hiện có và sắp ra mắt
- Số AZ cụ thể tại từng Region
- Thời gian từng AZ cụ thể chính thức được đưa vào hoạt động

Khi lựa chọn Region cho hệ thống của mình cần lưu ý một số điểm:

- Trong hầu hết trường hợp thì nên chọn region gần với mình nhất
- Không phải tất cả các Region đều có đầy đủ AWS service, một số service mới ra mắt thường sẽ chỉ thí điểm trước tại một số ít vùng nhất định và sẽ được phát triển rộng rãi trong tương lai (Amazon Comprehend, Amazon Connect, ...)
-  Chi phí của cùng một service có thể sẽ có khác biệt nếu ở các region khác nhau

**Trách nhiệm của 2 bên khi cung cấp và sử dụng dịch vụ AWS**
![](https://images.viblo.asia/dfa72756-c697-4653-8620-720824657270.png)

Nhìn chung thì các yếu tố như: Trung tâm dữ liệu, phần cứng, phần mềm, kết nối sẽ được đảm bảo bởi AWS. Người dùng sẽ chịu trách nhiệm về dữ liệu khách hàng, cấu hình, triển khai ứng dụng.

Lấy ví dụ như một nhà sản xuất xe ô tô, họ sẽ đảm bảo sao cho khi bạn nhấn ga thì xe sẽ đi nhanh hơn, nhấn phanh thì sẽ chạy chậm lại. Còn việc sử dụng chúng ra sao là tùy vào bạn.

### 2. Một số mô hình triển khai 
**2.1 Một Cloud Server**

![](https://images.viblo.asia/e5b039eb-2493-4afc-a1d6-ddd2fbedd088.png) 
Đây là mô hình đơn giản nhất, thường dùng trong việc phát triển hoặc tối thiểu chi phí khi mới bắt đầu một dự án.

Dễ thấy là nhược điểm của mô hình này là chỉ có khả năng chịu một lỗi duy nhất (Single Point of Failure).

Các ứng dụng nguyên khối (monolithic) cũng có thể sử dụng mô hình này, để đảm bảo độ tin cậy khi triển khai trên cloud thay vì sử dụng server vật lý của chính mình.

**2.2 Nhiều cloud server**

![](https://images.viblo.asia/3c114edd-e5bb-41dd-9d30-efe0cbba1bd0.png)

Mô hình này đảm bảo hơn về tính an toàn do có 2 cloud server tại 2 AZ khác nhau. Nhưng vẫn không đảm bảo trong trường hợp cả 1 Region gặp sự cố.

Ngoài ra mô hình này cũng tăng thêm độ linh hoạt của hệ thống, cho phép bạn thực hiện live updates bằng cách tách 1 server ra để thực hiện cập nhật, nâng cấp mà vẫn đảm bảo dịch vụ không bị gián đoạn do vẫn còn một cloud server khác hoạt động


**2.3 Mô hình nhiều Region**


![](https://images.viblo.asia/c433f3a0-9a09-4c62-b7e2-9b0b65e7ce4a.png)

Đây là mô hình phức tạp nhất và đương nhiên cũng đòi hỏi chi phí cao nhất. Amazon Route 53 sẽ hoạt động như một dịch vụ DNS.

Ngoài việc đảm bảo an toàn cho hệ thống so với 2 mô hình trên, thì mô hình này còn có lợi ích về performance trong trường hợp khách hàng phân bố ở nhiều khu vực trên thế giới, ta có thể lựa chọn Region phù hợp cho từng đối tượng khách hàng để tối ưu về tốc độ đường truyền.


Nguồn tham khảo:

https://app.pluralsight.com/library/courses/aws-network-design-getting-started