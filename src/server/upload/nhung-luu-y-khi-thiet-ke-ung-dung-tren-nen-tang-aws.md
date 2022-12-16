## Mở đầu 
Khi xây dựng một hệ thống mới hoặc chuyển đổi hệ thống sẵn có sang nền tảng AWS, chúng ta cần lựa chọn mô hình phù hợp, đáp ứng được yêu cầu của khách hàng, dễ dàng mở rộng trong tương lai, bên cạnh đó hệ thống cần có tính sẵn sàng cao, khả năng chịu lỗi (lỗi có thể đến từ 1 end user, một thành phần nào đó trong hệ thống).
## Các vấn đề cần lưu ý
### 1. Khả năng chịu lỗi
Hãy cùng xem một ứng dụng web đơn giản dưới đây, ứng dụng chỉ bao gồm 1 web instance được kết nối với database RDS
![](https://images.viblo.asia/36adf77d-b649-47c0-aad0-19e95de65f83.png)

Có thể dễ dàng nhận ra system fail nếu web server hoặc RDS hoặc Availability zone fail, điều này cũng giống như chúng ta đang đặt tất cả các quả trứng vào cùng 1 giỏ vậy. 
Để khắc phục nhược điểm của kiến trúc này, chúng ta sẽ thêm vào đó thành phần dự phòng (redundancy). Có 2 loại redundancy: 
* **Standby redundancy** : Thường được sử dụng cho các thành phần cơ sở dữ liệu quan hệ. Khi một tài nguyên bị lỗi, tiến trình sẽ được phục hồi trên tài nguyên thứ cấp thông qua cơ chế failover. 
* **Active redundancy**: Yêu cầu thực thi sẽ được phân phối thực hiện trên nhiều tài nguyên khác nhau (ví dụ chạy cùng một ứng dụng trên nhiều web instance) khi có một instance bị lỗi, các request sẽ được phân bổ sang các instance còn lại để thực thi. 

Mô hình ban đầu sẽ được chuyển đổi như sau:

![](https://images.viblo.asia/b912d826-9863-4340-9731-e2fa2588483b.png)
### 2. Tính mềm dẻo
Bên cạnh đáp ứng khả năng chịu lỗi, tính mềm dẻo cũng là một yếu tố cần lưu ý khi thiết kế hệ thống. Tính mềm dẻo được thể hiện qua việc hệ thống có thể đáp ứng được số lượng người dùng, lưu lượng truy cập, kích thước dữ liệu tăng lên theo thời gian, hoặc tăng đột ngột do nhu cầu kinh doanh mà không làm giảm hiệu suất. Nói cách khác kiến trúc phải dễ dàng mở rộng. Có hai kiểu mở rộng

*  **Scale vertically** : Tăng các thông số kỹ thuật như tăng dung lượng ổ cứng, tăng RAM. Ưu điểm của phương pháp này là dễ sử dụng, áp dụng linh hoạt trong nhiều trường hợp. Tuy nhiên việc tăng cấu hình sẽ phải dừng lại ở một giới hạn nào đó, đồng thời chi phí cũng đội lên tương đối cao
*  **Scale horizontally** : Thể hiện bằng việc tăng số lượng tài nguyên (thêm ổ cứng lưu trữ, thêm instance). Đây cũng là hướng tiếp cận đúng đắn cho những hệ thống sử dụng nền tảng cloud computing.

Mô hình web application sử dụng horizonetally scaling:

![](https://images.viblo.asia/b1d665a1-41f0-4453-bdce-1571481b2a93.png)

### 3.  Chọn lựa giải pháp lưu trữ 
AWS cung cấp nhiều dịch vụ lưu trữ nhằm thoả mãn nhu cầu lưu trữ dữ liệu đa dạng như EBS, S3, RDS, CloudFront. Tuỳ vào nhu cầu, chức năng, hiệu suất và chi phí mà chúng ta lựa chọn sản phẩm cho phù hợp. Ví dụ như
* **AWS S3**: Dùng lưu trữ, sao lưu dữ liệu hoặc dung lượng lưu trữ lớn 
* **AWS Glacier**: Lưu trữ + sao lưu dài hạn có thể xem xét dùng 
* **CloudFront**: Khi cần mạng phân phối nội dung động/tĩnh hoặc streaming toàn cầu đáp ưng khả năng truy cập nhanh chóng 
* **DynamoDB**: Khi cần cơ sở dữ liệu NoSQL với mô hình dữ liệu linh hoạt, hiệu suất cao
* **AWS RDS**: Cung cấp cho bạn cơ sở dữ liệu mysql có tính sẵn sàng cao, dễ dàng mở rộng và bảo mật tốt
* **ElasticCache**: Cung cấp Redis cluster cho ứng dụng 
* **Elastic File System (EFS)** File system được chia sẻ cho một hoặc nhiều EC2 instance
Thử tối ưu lại mô hình ban đầu, sử dụng các dịch vụ lưu trữ của AWS. Lưu trữ các file ảnh, videos, CSS và Javascript lên S3 sau đó phân phối dữ liệu bằng CloudFront. Bằng cách này chúng ta sẽ giảm tải cho web instance cũng như tăng tốc độ load nội dung thông qua CDN.
![](https://images.viblo.asia/7c480f3c-cd18-4bb3-9042-3f65850470a4.png)

Hoặc mô hình kết hợp sử dụng ElasticCache và DynamoDB
![](https://images.viblo.asia/d56adbb7-7f83-44d9-acfa-d4fe765c2f46.png)

Khi phân tích thiết kế hệ thống, chúng ta cần xác định rõ nhu cầu lưu trữ dữ liệu để từ đó lựa chọn dịch vụ cũng như mô hình cho phù hợp. 
### 4. Bảo mật nhiều lớp
AWS cung cấp nhiều tính năng cho phép thiết kế hệ thống bảo mật có chiều sâu. Bắt đầu từ cấp độ network, xử dụng Amazone Vitual Private Cloud (VPC) giúp khởi chạy các tài nguyên trong một mạng ảo, chúng ta có toàn quyền kiểm soát các mạng này bao gồm dải IP, tạo mạng con, cấu hình bộ định tuyến, cổng kết nối. Đến cấp độ ứng dụng, AWS cung cấp hệ thống tường lửa WAF với các thiết lập ngăn chặn các mẫu tấn công thường gặp, bad bot, SQL injection. Đến quyền truy cập, chúng ta có thể sử dụng IAM để nhận dạng, quản lý, phân quyền cho một hoặc một nhóm người dùng hoạc tài nguyên trên AWS.
## Kết luận
Bất kỳ một ứng dụng nào khi chạy thực tế sau một thời gian sử dụng sẽ tiềm ẩn những rủi ro nhất định. Một hệ thống có tính sẵn sàng cao khi nó vẫn hoạt đồng bình thường khi một hoặc một số thành phần của hệ thống gặp sự cố. 

Với cách lưu trữ truyền thống, cần dự đoán trước lượng tài nguyên mà ứng dụng cần sử dụng trong khoảng thời gian vài năm. Nếu ban đầu đánh giá thấp dẫn tới hệ thống không đáp ứng đủ lưu lượng người dùng thực tế, dẫn đến sự không hài lòng của khách hàng. Nếu ước lượng quá cao dẫn đến gây lãng phí tài nguyên hệ thống cũng như tăng chi phí. 

Với các dịch vụ cloud computing cho phép chúng ta mềm dẻo hơn trong việc đáp ứng nhu cầu thực tế, scale linh hoạt, tối ưu tài nguyên sử dụng. Cung cấp khả năng bảo mật nhiều lớp, cho phép quản trị, theo dõi các thay đổi cấu hình đối với các tài nguyên hệ thống

Tài liệu tham khảo: 
* AWS Certified Solutions Architect Official Study Guide (Book)
* https://docs.aws.amazon.com/index.html?nc2=h_ql_doc_do