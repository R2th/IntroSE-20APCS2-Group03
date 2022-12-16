Chắc hẳn chúng ta không còn xa lạ gì với cụm từ Amazon Web Service (AWS). Một nền tảng đám mây toàn diện và được sử dụng rộng rãi nhất, cung cấp trên 200 dịch vụ đầy đủ tính năng từ các trung tâm dữ liệu trên toàn thế giới, với những dịch vụ cực kì hữu ích và tuyệt với. Một trong số đó phải kể đến **Amazon Elastic Compute Cloud (Amazon EC2)**. Hôm nay chúng ta sẽ cùng tìm hiểu những điều cần chú ý trước khi sử dụng EC2 nhé.

### Amazon Elastic Compute Cloud (EC2)  Là Gì?
EC2 thực chất là một máy ảo mô phỏng hóa và trừu tượng hóa một server vật lý. Nó cung cấp khả năng tính toán có thể mở rộng trong Đám mây Amazon Web Services (AWS). Sử dụng Amazon EC2 giúp bạn không cần phải đầu tư trước vào phần cứng, vì vậy bạn có thể phát triển và triển khai các ứng dụng nhanh hơn. Bạn có thể sử dụng Amazon EC2 để khởi chạy nhiều hoặc ít máy chủ ảo tùy ý, định cấu hình bảo mật và mạng cũng như quản lý bộ nhớ. Amazon EC2 cho phép bạn tăng hoặc giảm quy mô để xử lý các thay đổi về yêu cầu hoặc mức tăng đột biến về mức độ phổ biến, giảm nhu cầu dự báo lưu lượng truy cập của bạn.

### Các đặc tính của Amazon Elastic Compute Cloud

- Môi trường máy ảo được gọi là **instance**
- Các mẫu được định cấu hình sẵn cho instance , được gọi là Amazon Machine Images (AMI), gói các bit bạn cần cho máy chủ của mình (bao gồm cả hệ điều hành và phần mềm bổ sung)
- Hệ thống phong phú các cấu hình khác nhau CPU, bộ nhớ, mạng ..
- Bảo mật an toàn  
- Các dữ liệu tạm thời được lưu trong bộ nhớ sẽ xóa đi khi tạm dừng, ngủ đông hoặc tắt Ec2
- Sử dụng Elastic Block Store (EBS) để lưu các dữ liệu lâu dài
- Phù hợp trên nhiều khu vực (Regions and Availability Zones)
- Hệ thống tường lửa (firewall) cho phép giới hạn protocols và IPs có thể kết nối đến instance
-  Sử dụng Static IPv4 addresses
-  Hệ thống VPCs (virtual private clouds) 

### Các điều cần biết khi cài đặt EC2

**I. Instance Type**
AWS phân bổ các tài nguyên phân cứng như CPU, memory.. cho instance của bạn dựa theo **instance type**. Dựa theo mục đích sử dụng và khối lượng công việc, chi phí mà bạn cần một type phù hợp cho EC2. Cơ bản instance type được chia theo 5 loại chung sau:

- **General Purpose**: bao gồm các loại T3, T2, M5 và M4, tất cả
nhằm cung cấp sự cân bằng về tài nguyên máy tính, bộ nhớ và mạng. Ví dụ: loại T2
từ t2.nano với một CPU ảo (vCPU0) và một nửa gigabyte bộ nhớ tất cả
cách lên đến t2.2xlarge với tám vCPU và bộ nhớ 32 GB. Vì nó miễn phí
Đủ điều kiện cấp, t2.micro thường là một lựa chọn tốt để thử nghiệm. Nhưng không có gì cả
 ngăn bạn sử dụng nó cho các trang web sử dụng ánh sáng và các dịch vụ liên quan đến phát triển khác nhau.Phiên bản M5 và M4 được khuyến nghị cho nhiều hoạt động tập trung vào dữ liệu cỡ vừa và nhỏ.
Không giống như T2, yêu cầu ổ đĩa ảo EBS để lưu trữ, một số phiên bản M * đi kèm với
ổ đĩa lưu trữ cá thể của riêng chúng thực sự được gắn vào máy chủ lưu trữ. M5
nhiều loại từ m5.large (2 vCPU và 6 GB bộ nhớ) đến m5d.24xlarge khổng lồ
(96 vCPU và 382 GB bộ nhớ).
- **Compute Optimized**: Với các server cần cấu hình cao hoặc phục vụ mục đích AI (Machine Learning) mà bạn sẽ chọn từ nhóm Tối ưu hóa tính toán bao gồm C5 và C4
các loại. Máy C5 — hiện có sẵn từ c5.large đến c5d.18xlarge — cung cấp cho bạn như
tốc độ bộ xử lý 3,5 GHz và băng thông mạng mạnh.
- **Memory Optimized**:  hoạt động tốt cho cơ sở dữ liệu chuyên sâu,
phân tích dữ liệu và hoạt động bộ nhớ đệm. Các loại X1e, X1 và R4 có sẵn với
tối đa 3 terabyte bộ nhớ dựa trên DRAM và khối lượng lưu trữ SSD có độ trễ thấp
đính kèm.
- **Accelerated Computing**: Bạn có thể đạt được hiệu suất đơn vị chuyên nghiệp đồ họa đa năng (GPGPU) hiệu suất cao hơn từ các loại P3, P2, G3 và F1 trong Accelerated
Computing. Những phiên bản này sử dụng nhiều thế hệ NVIDIA cao cấp khác nhau
GPU hoặc, trong trường hợp của các phiên bản F1, một cổng lập trình trường Xilinx Virtex UltraScale +
mảng (FPGA — nếu bạn không biết đó là gì, thì có thể bạn không cần nó). Tăng tốc
Các phiên bản máy tính được khuyến nghị cho các khối lượng công việc đòi hỏi như hình ảnh 3D
và kết xuất, phân tích tài chính và động lực học chất lỏng tính toán
- **Storage Optimized**: Các loại H1, I3 và D2  có dung lượng lưu trữ phiên bản lớn, độ trễ thấp — lớn tới 16 TB (hoặc, trong
trường hợp D2, tối đa 48 TB ổ cứng lưu trữ chậm hơn). Những trường hợp này hoạt động tốt với
hệ thống tệp và các ứng dụng xử lý dữ liệu nặng

Chi tiết thông số kỹ thuật và tên loại phiên bản sẽ thường xuyên thay đổi khi AWS cố gắng tận dụng các công nghệ mới để hỗ trợ nhu cầu máy tính ngày càng tăng của khách hàng.
Nhưng điều quan trọng là ít nhất phải quen thuộc với các họ loại cá thể và cách đặt tên
quy ước AWS sử dụng để xác định chúng. Tuy nhiên bạn cũng không cần quá lo lắng nếu lỡ chọn sai instance type khi cài đặt EC2 vì bạn có thể dễ dàng thay đổi instance type khi nhu cầu sử dụng của bạn thay đổi. 
![](https://images.viblo.asia/b46b2a0b-4684-4928-98ea-49c7ca45d507.png)

**II. Instance Pricing**

Việc sử dụng các phiên bản EC2 có thể được mua bằng một trong ba kiểu: 
Đối với các triển khai liên tục mà bạn dự kiến ​​sẽ chạy trong vòng dưới 12 tháng, bạn sẽ
thường thanh toán cho mỗi giờ phiên bản của bạn đang chạy thông qua mô hình theo yêu cầu.
Theo yêu cầu là cách linh hoạt nhất để sử dụng tài nguyên EC2 vì bạn có thể
kiểm soát số tiền bạn phải trả bằng cách dừng và bắt đầu các phiên bản của bạn theo nhu cầu của bạn.
Tuy nhiên, mỗi giờ, nó cũng đắt nhất.
Nếu bạn định giữ cho đèn cháy 24/7 trong hơn một năm, thì bạn sẽ thích
giảm giá đáng kể bằng cách mua một phiên bản dự trữ — thường trong thời hạn cam kết từ một đến ba năm. Bạn có thể trả trước cho toàn bộ thời hạn của khoản dự trữ
ví dụ hoặc, đối với tỷ lệ tăng dần, hoặc trả trước một phần và phần còn lại hàng tháng
phí hoặc hoàn toàn thông qua các khoản phí hàng tháng. Ảnh dưới đây cho bạn biết chi phí có thể
thay đổi giữa các mô hình. Những ước tính này giả định một nền tảng Linux, tất cả các khoản thanh toán trả trước,
và thuê nhà mặc định. Chi phí thực tế có thể thay đổi theo thời gian và giữa các khu vực.
![](https://images.viblo.asia/559575f1-d141-41b1-b034-27315319385e.png)


**III. AWS Regions**

Các máy chủ AWS được đặt trong các trung tâm dữ liệu trên khắp thế giới và được phân loại theo khu vực địa lý. Nói chung, bạn sẽ cần khởi chạy phiên bản EC2 trong khu vực
thực tế gần nhất với phần lớn khách hàng của bạn hoặc nếu bạn đang làm việc với dữ liệu
tuân theo các hạn chế pháp lý, trong phạm vi quyền hạn đáp ứng nhu cầu tuân thủ của bạn.
Tài nguyên EC2 chỉ có thể được quản lý khi bạn “ở trong” khu vực của họ. Bạn cài
vùng hoạt động trong bảng điều khiển thông qua menu thả xuống ở đầu trang và
thông qua các giá trị cấu hình mặc định trong AWS CLI hoặc SDK của bạn. Bạn có thể cập nhật
Cấu hình CLI bằng cách chạy cấu hình aws.
Hãy nhớ rằng chi phí và thậm chí chức năng của các dịch vụ và tính năng có thể
khác nhau giữa các vùng. Ngoài ra việc chọn đúng khu vực địa lý ảnh hướng rất lớn đến trải nghiệm người dùng, tốc độ truyền tải và độ trễ của hệ thống.
![](https://images.viblo.asia/80e6a8bf-a8b7-47df-a981-668420a5c145.png)


**IV. VPCs**

VPCs 
là các công cụ tuyệt vời và dễ sử dụng
để tổ chức cơ sở hạ tầng của bạn. Bởi vì rất dễ dàng tách biệt các phiên bản trong một VPC
từ bất kỳ thứ gì khác mà bạn đang chạy, bạn có thể muốn tạo một VPC mới cho từng
các dự án của bạn hoặc các giai đoạn dự án. Ví dụ: bạn có thể có một VPC để đăng ký sớm
phát triển, một thử nghiệm beta khác và một thứ ba cho sản xuất
![](https://images.viblo.asia/fa54db43-8434-4516-bbb3-364880142ebb.png)

**V. Tenancy**

Khi khởi chạy phiên bản EC2, bạn sẽ có cơ hội chọn **Tenancy Model**.
Cài đặt mặc định là **Shared tenancy**, trong đó phiên bản của bạn sẽ chạy như một máy ảo trên
máy chủ vật lý đồng thời lưu trữ các phiên bản khác. Những trường hợp khác cũng có thể
được sở hữu và điều hành bởi các khách hàng AWS khác, mặc dù khả năng xảy ra bất kỳ loại
tương tác không an toàn giữa các phiên bản là từ xa.
Để đáp ứng các yêu cầu quy định đặc biệt, các trường hợp của tổ chức bạn có thể cần
mức độ cô lập thêm. **Dedicated Instance** dụng đảm bảo rằng phiên bản của bạn sẽ chạy
trên máy chủ vật lý chuyên dụng của riêng nó. Điều này có nghĩa là nó sẽ không chia sẻ máy chủ với
tài nguyên thuộc sở hữu của một tài khoản khách hàng khác. **Dedicated Host** cho phép bạn
thực sự xác định và kiểm soát máy chủ vật lý mà bạn đã được chỉ định để đáp ứng các yêu cầu cấp phép hoặc quy định hạn chế hơn

Trên là một số chú ý bạn cần biết trước khi sử dụng và cài đặt Amazon Elastic Compute Cloud (EC2). Hy vọng những chia sẻ trên sẽ có ích với các bạn.

Bài viết được tham khảo từ : https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html