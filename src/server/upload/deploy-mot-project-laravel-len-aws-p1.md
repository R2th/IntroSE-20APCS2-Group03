Hiện nay việc đưa một project lên server đã trở lên dễ dàng hơn rất nhiều nhờ sự phát triển của các công nghệ đám mây. Một trong số đó phải kể đến Amazon Web Service(AWS). Hôm nay chúng ta sẽ cùng tìm hiểu cách để deploy một dự án (cụ thể dự án Laravel )  lên Amazon Web Service (AWS) nhé.

### Thiết Lập Công Cụ Cần Thiết
Đầu tiên để có thể deploy một project lên AWS, chúng ta cần chuẩn bị kiến thức cơ bản và công cụ cần thiết.
### AWS Elastic Beanstalk
là một service của AWS, bạn có thể dễ dàng triển khai và quản lý các ứng dụng trên AWS mà không cần quan tâm quá nhiều đến các cơ sở hạ tầng của server. Elastic Beanstalk làm giảm sự phức tạp trong quản lý mà không hạn chế lựa chọn hoặc kiểm soát. Bạn chỉ cần tải lên ứng dụng của mình và Elastic Beanstalk tự động xử lý các chi tiết về cung cấp dung lượng, cân bằng tải, mở rộng và theo dõi sức khỏe của ứng dụng. Bên cạnh đó, Elastic Beanstalk hỗ trợ các ứng dụng được phát triển bởi Go, Java, .NET, Node.js, PHP, Python và Ruby. Khi bạn triển khai ứng dụng của mình, Elastic Beanstalk xây dựng phiên bản nền tảng được hỗ trợ đã chọn và cung cấp một hoặc nhiều tài nguyên AWS, chẳng hạn như các phiên bản Amazon EC2 để chạy ứng dụng. 
Khi bạn khởi tạo 1 Elastic Beanstalk thì AWS sẽ tự động tạo thêm những dịch vụ :

- **EC2 instance**:  được định cấu hình để chạy các ứng dụng web trên nền tảng mà bạn chọn. Mỗi nền tảng chạy một bộ phần mềm, tệp cấu hình và tập lệnh cụ thể để hỗ trợ một phiên bản ngôn ngữ, khung, bộ chứa web hoặc kết hợp các ngôn ngữ cụ thể. Hầu hết các nền tảng sử dụng Apache hoặc nginx làm proxy ngược nằm trước ứng dụng web của bạn, chuyển tiếp yêu cầu tới nó, phục vụ tài sản tĩnh và tạo nhật ký truy cập và lỗi.
- **Instance security group**:  được định cấu hình để cho phép lưu lượng truy cập vào cổng 80. Tài nguyên này cho phép lưu lượng HTTP từ bộ cân bằng tải đạt đến phiên bản EC2 chạy ứng dụng web của bạn. Theo mặc định, lưu lượng không được phép trên các cổng khác.
- **Load balancer**:  được cấu hình để phân phối các yêu cầu đến các phiên bản đang chạy ứng dụng của bạn. 
- **Load balancer security group**:  được định cấu hình để cho phép lưu lượng truy cập vào cổng 80. Tài nguyên này cho phép lưu lượng HTTP từ internet đạt đến bộ cân bằng tải. Theo mặc định, lưu lượng không được phép trên các cổng khác.
- **Auto Scaling group**:  được cấu hình để thay thế một ec2 nếu nó bị chấm dứt hoặc không khả dụng.
- **Amazon S3 bucket** :Vị trí lưu trữ cho mã nguồn, logs và các dữ liệu khác được tạo khi bạn sử dụng Elastic Beanstalk.
- **Amazon CloudWatch alarms**:  theo dõi tải trên các phiên bản trong môi trường của bạn và được kích hoạt nếu tải quá cao hoặc quá thấp. Khi báo thức được kích hoạt, Auto Scaling group nhân rộng của bạn sẽ tăng hoặc giảm tỷ lệ phản hồi.
- **AWS CloudFormation stack**: Elastic Beanstalk sử dụng AWS CloudFormation để khởi chạy các tài nguyên trong môi trường của bạn và truyền bá các thay đổi cấu hình.
- **Domain name**: Một tên miền định tuyến đến ứng dụng web của bạn ở dạng subomain.region.elasticbeanstalk.com.

Tất nhiên khi bạn xóa Elastic Beanstalk thì AWS cũng sẽ tự động xóa những service này đi. Để bắt đầu sử dụng Elastic Beanstalk bạn có thể tham khảo [tại đây](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html) .

### AWS Elastic Beanstalk Command Line Interface (EB CLI)
Để đưa project lên AWS Elastic Beanstalk có 2 cách: sử dụng bảng điều khiển trực tiếp của Elastic Beanstalk và sử dụng mã lệnh **EB CLI**.
**The AWS Elastic Beanstalk Command Line Interface (EB CLI)** là dòng lệnh mà bạn có thể sử dụng để tạo, định cấu hình và quản lý môi trường Elastic Beanstalk.

Để cài đặt **eb cli**, bạn cần cài đặt **Pip** và **Python**: 
```
sudo apt-get install python3.7
```

Để kiểm tra **Python** đã được cài đặt thành công :
```
python3 --version
```

Để cài đặt **Pip** :

Download lệnh cài đặt pip từ [pypa.io](https://www.pypa.io/en/latest/)
```
curl -O https://bootstrap.pypa.io/get-pip.py
```

Chạy lệnh với Python:
```
python3 get-pip.py --user
```
Kiểm tra **pip** đã được cài đặt thành công :
```
pip --version
```

Cài đặt **EB CLI** :
```
pip install awsebcli --upgrade --user
```

Kiểm tra **EB CLI** đã được cài đặt thành công :
```
eb --version
```

Bạn có thể tham khảo thêm chi tiết cách cài đặt **EB CLI**  [tại đây](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-linux.html) .

Và tất nhiên cuối cùng chúng ta không thể thiếu 1 **project Laravel **:D
```
composer create-project --prefer-dist laravel/laravel 'tên project'
```

Ok vậy là chúng ta đã hoàn thành bước chuẩn bị những công cụ và kiến thức cần thiết để có thể triển khai một dự án Laravel lên AWS.
Ở bài tiếp theo, mình sẽ cùng với các bạn bắt đầu thực hiện đưa project lên Elastic Beanstalk nhé.

Bài viết được tham khảo từ : 

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-laravel-tutorial.html

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-advanced.html