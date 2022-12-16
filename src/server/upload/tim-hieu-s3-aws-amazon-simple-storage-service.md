Bài viết này sẽ cung cấp cho bạn hiểu rõ về dịch vụ của S3 AWS đồng thời đưa ra ví dụ để bạn dễ hình dung. Nhu cầu lưu trữ dữ liệu đang gia tăng mỗi ngày vì vậy việc xây dựng và duy trì nơi lưu trữ trở thành một công việc mệt mỏi vì số lượng dung lượng bạn có thể cần trong tương lai là khó dự đoán. Bạn có thể sử dụng quá mức đến lỗi ứng dụng vì không có đủ dung lượng hoặc có thể sẽ phải mua các kho lưu trữ mà sau đó không được sử dụng. Vì vậy Amazon đã đưa ra 1 dịch vụ lưu trữ được gọi là AWS S3. 
## AWS S3 là gì

> Amazon Simple Storage Service (S3) is a storage for the internet. It is designed for large-capacity, low-cost storage provision across multiple geographical regions. Amazon S3 provides developers and IT teams with Secure, Durable and Highly Scalable object storage.

S3 an toàn vì AWS cung cấp:
- Mã hóa dữ liệu mà bạn lưu trữ. Nó có thể xảy ra theo 2 cách:

   ++  Mã hóa ở client side
   
   ++ Mã hóa ở server side
- Nhiều bản copy được duy trì để cho phespo phục hồi dữ liệu trong trường hợp dữ liệu bị hỏng
- Versioning, trong đó mỗi bản chỉnh sửa đều được lưu trữ để sử dụng khi cần thiết.

S3 bền vì:
 - Nó thường xuyên xác minh tính toàn vẹn của dữ liệu bằng cách sử dụng checksum: nesu s3 phát hiện có bất kì trục trặc dữ liệu nó sẽ sửa chữa ngay lập tức với sự trợ giúp của các dữ liệu được sao chép
 - Ngay cả trong khi dữ liệu lưu trữ hoặc truy xuất dữ liệu, nó sẽ kiểm tra lưu lượng mạng đến cho bất kì gói dữ liệu bị hỏng nào
 
 S3 có khả năng mở rộng cao vì nó tự động tăng dung lượng lưu trữ của bạn theo yêu cầu và bạn chỉ trả tiền cho bộ nhớ bạn sử dụng
 
Vậy **Loại dữ liệu như thế nào có thể lưu trữ trên S3:**

Bạn có thể lưu trữ bất kì loại data với bất kì loại format nào. Trên S3 khi chúng ta nói về dung lượng, số lượng của đối tượng mà chúng ta có thể lưu trữ trên S3 là không giới hạn.
Một đối tượng là thực thể cơ bản trong S3. Nó bao gồm dữ liệu, khóa và siêu dữ liệu (metadata)

KHi ta nói về dữ liệu, có 2 loại:
- Dữ liệu truy cập thường xuyên
- Dữ liệu truy cập không thường xuyên

Vì vậy AMAZON đưa ra 3 lớp lưu trữ cung cấp cho khách hàng trải nghiệm tốt nhất với chi phí hợp lí
### 1. Amazon S3 Standard để truy cập dữ liệu thường xuyên
Phù hợp với các trường hợp sử dụng nhạy cảm với hiệu suất, nơi độ trễ phải được giữ ở mức thấp. Ví dụ như trong bệnh viện, dữ liệu thường xuyên truy cập sẽ là dữ liệu của bệnh nhân được nhập viện, dữ liệu này cần được truy xuất nhanh chóng.
### 2. Amazon S3 Standard để truy cập dữ liệu không thường xuyên
Phù hợp với trường hợp sử dụng nơi dữ liệu được lưu trữ lâu dài và ít được truy cập thường xuyên, tức là vẫn lưu trữ dữ liệu nhưng vẫn mong đợi hiệu suất cao. Ví dụ trong bệnh viện, những người đã được xuất viện, hồ sơ của họ sẽ không cần truy cập hàng ngày nhưng nếu họ quay trở lại với bất kì biến chứng nào, thì hồ sợ của họ cần được truy xuất lấy ra một cách nhanh chóng.
### 3. Amazon Glacier
Phù hợp với các trường hợp sử dụng nơi dữ liệu được lưu trữ hiệu suất cao là điều không cần thiết, nó có chi phí thấp hơn so với 2 dịch vụ trên. Ví dụ: Trong bệnh viên các báo cáo test, Scan docs, các đơn thuốc vv...vv hơn 1 năm sẽ không cần thiết sử dụng hàng ngày, ngay cả khi được yêu cầu độ trễ thấp là điều không cần thiết
![](https://images.viblo.asia/b5aefc01-169d-45b5-b439-8c67c59500c6.png)
## Dữ liệu được tổ chức trên S3 như thế nào
Dữ liệu trên S3 được tổ chức dưới dạng bucket.

![](https://images.viblo.asia/a5d08cd3-deab-46a2-ac59-a2e9ca032dfd.png)
- 1 Bucket là một đơn vị lưu trữ logic trong S3
- Chứa các đối tượng bao gồm dữ liệu và siêu dữ liệu

Trước khi thêm bất kì dữ liệu nào lên S3 chúng ta phải tạo 1 bucket nơi sẽ được sử dụng để lưu trữ dữ liệu
## Dữ liệu được lưu trữ ở đâu về mặt địa lý
Bạn có thể tự chọn nơi dữ liệu nên được lưu trữ. Đưa ra quyết định khu vực (region) là rất quan trọng do đó chúng phải được lên kế hoạch tốt
Có 4 chỉ số để chọn 1 vùng lưu trữ tối ưu đó là:
- Pricing (Giá)
- User/Customer Location (Nơi khách hàng sử dụng dịch vụ)
- Latency (Độ trễ)
- Service Availability (Tính khả dụng dịch vụ)
Cùng tìm hiểu qua ví dụ cụ thể sau đây:
Giả sử có một công ty phải khởi chạy dịch vụ lưu trữ cho 1 trang web khách hàng ở Hoa kỳ và Ân độ. Để cung cấp trải nghiệm tốt nhất, công ty phải chọn khu vực phù hợp với yêu cầu

![](https://images.viblo.asia/851eb2bc-da82-4106-99a5-56b7fc59bc71.png)

Nhìn vào các thông số trên, ta có thể xác định N Virginia là region tốt nhất cho công ty này bởi nó có độ trễ thấp và chi phí thấp. Không phân biệt vị trí của bạn, bạn có chọn bất kì khu vực nào phù hợp với yêu cầu của bạn vì có thể truy cập vào S3 bucket từ mọi nơi.

Nói về region, hãy xem khả năng backup trong một số region khả dụng khác hoặc bạn có thể muốn chuyển dữ liệu của mình sang 1 số region khác. 
## Cross-region Replication
Sao chép vùng chéo cho phép người dùng sao chép hoặc truyền dữ liệu tới 1 vị trí khác mà không gặp bất cứ trở ngại nào
![](https://images.viblo.asia/56aeb0b9-79fc-4c41-aa67-9c7b0e93fccd.png)
## How is the data transferred?
Bên cạnh các phương thức truyền thống qua internet. AWS có 2 cách cung cấp truyền dữ liệu một cách an toàn với tốc độ cao:
- Transfer Acceleration
- Snowball

![](https://images.viblo.asia/a98da39a-2d94-4c13-a50f-573a7fdb64f1.png)
Transfer Acceleration cho phép truyền nhanh chóng, dễ dàng và an toàn qua các khoảng cách dài bằng cách khai thác công nghệ sử dụng CloudFront của Amazon. CloudFront là một dịch vụ lưu trữ bởi AWS, trong đó dữ liệu từ trang web của khách hàng sẽ được chuyển đến vị trí gần nhất và từ đó dữ liệu được chuyển đến AWS S3 của bạn thông qua một đường dẫn mạng được tối ưu hóa


Snowball là 1 cách chuyển dữ liệu của bạn bằng cách vật lý. Amazon sẽ gửi 1 thiết bị đến bơ sở của bạn, bạn có thể tải dữ liệu qua đó. Khi dữ liệu được hoàn tất trên Snowball thì phải thay đổi địa chỉ giao hàng về trụ sở AWS.
## Pricing
Không có gì miễn phí trên AWS. Bạn có thể sử dụng AWS Free Usage Tier để thử sử dụng miễn phí. Sau khi đăng kí, khách hàng AWS mới sẽ nhận được 5GB dung lượng với 20000 get request và 2000 pull request và 15GB chuyển dữ liệu mỗi tháng trong 1 năm
## How is S3 billed?
Mặc dù có rất nhiều tính năng nhưng AWS S3 có giá cả phải chăng và linh hoạt trong chi phí. Nó hoạt động dựa trên `Pay Per Use` có nghĩa bạn chỉ phải trả cho những gì bạn sử dụng. Dưới đây và 1 ví dụ về giá của S3 cho 1 khu vực cụ thể

![](https://images.viblo.asia/48b10c82-ebdc-47fc-81b1-b90a21c4c761.png)

**Cross Region Replication** được tính tiền theo cách:
Nếu nhân bản 1000GB (1000 1GB object) giữa các region bạn sẽ phải chịu 1 khoảng phí yêu cầu là $0.005 (1000 request X $0.005 per 1,000 requests) để nhân bản 1,000 objects vả phải trả $20 ($0.020 per GB transferred x 1,000 GB) để chuyển đổi dữ liệu liên vùng. Sau khi nhân bản, 1000GB sẽ phải chịu phí lưu trữ dựa trên vùng đích

**Snowball** chi phí như sau:
- Snowball 50 TB : 200$
- Snowball 80 TB:  250$
Đây là phí dịch vụ cố định mà họ phải trả
Chi phí không bao gồm ngày ship, ngày ship sẽ free

**Transfer Acceleration** giá sẽ được tính theo bảng:

![](https://images.viblo.asia/d9932438-188a-4b48-a5bc-f283c9af8148.png)
## Tạo 1 static Website trên S3
Static website là 1 web chỉ bao gồm HTML, CSS và javascript (nếu có)
**Bước 1**: Tạo 1 bucket
Để tạo Bucket ta vào S3 trong AWS Management Console và chọn Create Bucket. Điền tên và region. Nếu bạn sử dụng doamin/ sub-domain thì hãy sử dụng nó làm bucket name. 

![](https://images.viblo.asia/21768ab6-2a5b-404d-b4e6-8da9077c77a2.png)

**Bước 2** Xác minh Bucket đã được tạo

![](https://images.viblo.asia/8b2d3f9a-1c72-415a-a1c1-6bb99acccaad.png)

**Bước 3** Enable Website Hosting

![](https://images.viblo.asia/c9bf2a1f-2d00-42ab-9c97-80f4702f3845.png)

**Bước 4** Create a Html File -Tạo 1 file HTML
Hãy bắt đầu với 1 file html đơn giản bạn muốn hiển thị trên web của mình. Đặt tên là index.html với content:
```
<!doctype html>
<html>
<head>
<title>
Hello, S3!
</title>
<meta name="description" content="My first S3 website">
<meta charset="utf-8">
</head>
<body>
<h2>My first S3 website</h2>
<p>I can't believe it was that easy!</p>
</body>
</html>
```
**Bước 5**: Upload file lên Bucket bạn vừa tạo

![](https://images.viblo.asia/e4ce6bfe-bc5c-4520-9153-f6b21aef42b9.png)

**Bước 6** Make the Html File Public

![](https://images.viblo.asia/0c1bc7e0-48af-4ded-8869-60b838c65d93.png)

select index.html trên console và xem Properties  tab:

![](https://images.viblo.asia/b621dc7c-bd40-4013-b174-6fc11032756e.png)

**Bước 7** Xác minh kết quả

Click vào link trong Properties ta sẽ nhìn thấy những gì trong file index.html 

![](https://images.viblo.asia/7d75b51f-5203-478e-b95d-6ba29f5be9f7.png)
Vậy là ta đã xây dựng 1 html website trên AWS sử dụng S3

Hi vọng bài viết sẽ giúp bạn hiểu hơn về S3. Thank you


**Nguồn tham khảo** 

https://www.edureka.co/blog/s3-aws-amazon-simple-storage-service/**