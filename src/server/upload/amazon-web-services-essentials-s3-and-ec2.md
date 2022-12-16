## Introduction
Ở phần [một](https://viblo.asia/p/amazon-web-services-concepts-introduction-to-aws-core-services-yMnKMJxmZ7P), mình đã giới thiệu về khái niệm cơ bản của các core services của Amazon là `VPC`, `EC2`, `S3`, `RDS`. Bài viết này mình sẽ trình bày chi tiết hơn về  hai thành phần trong VPC là `S3 (Simple Storage Service)` và `EC2 (Elastic Compute Cloud)`.
## S3 (Simple Storage Service)
`S3` là dịch vụ lưu trữ trực tuyến được cung cấp bởi Amazon, cho phép chúng ta lưu trữ và lấy ra data ở bất cứ đâu và ở bất kể thời gian nào.
### Components and Structure
Cấu trúc của `S3` gồm 3 thành phần chính:
* **Bucket**: là `Root level` của các folders chúng ta tạo ra trong S3 
* **Folders**: là các thư mục con nằm trong 1 bucket
* **Objects**: là các files được upload và lưu trữ dưới dạng các `Object`

![](https://images.viblo.asia/8cbdf704-c1f4-4d3e-bcc3-8de305196e3d.png)

Ngoài ra còn có khái niệm `Regions`: khi chúng ta tạo ra một `bucket A` bất kì, ta phải lựa chọn một `AWS region` (AWS resources được đặt ở các khu vực địa lý khác nhau trên thế giới, để thuận tiên cho việc truy cập server ở nơi gần nhất) cụ thể cho `bucket A` đó. Điều này có nghĩa là tất cả các data được upload lên `bucket A` sẽ được lưu ở các `data center` (trung tâm máy chủ vật lý dùng để vận hành AWS) được đặt tại `region` mà chúng ta đã lựa chọn ở bước đầu. Việc lựa chọn `region` nên chú trọng đến khoảng cách vật lý để giảm thiểu độ trễ.
### Storage Classes
`Storage Classes` là các khái niệm dùng để  phân loại các `Object` trong `S3`, bao gồm bốn loại:
* Standard
* Reduced Redundancy Storage (RRS)
* Infrequent Access (S3-IA)
* Glacier

Mỗi `Storage Class` đều có các tính chất:
* Chi phí lưu trữ (`Storage Cost`)
* Độ bền của Object (`Object durability`)
* Tính sẵn sàng của Object (`Object Availabitity`)
* Tần suất sử dụng Object (`Frequency of access to Object`)
 
Trong đó:
* Khái niệm `Object durability` (độ bền của object): là số phần trăm (%) khả năng trong 1 năm mà file được lưu trữ sẽ bị mất.
* Khái niệm `Object Availabitity` (tính sẵn sàng của object): là số phần trăm (%) khả năng trong 1 năm mà file được lưu trữ sẽ không thể truy cập được.

Tùy vào mục đích sử dụng mà chúng ta có thể lựa chọn các `storage Class` khác nhau sao cho phù hợp nhất.
Cụ thể :

1. **Standard**
* Thiết kế cho tất cả các mục đích lưu trữ
* Là storage option mặc định ban đầu
* Độ bền của object là 99.999999999999%
* Khả năng sẵn sàng truy cập của Object là 99.99%
* Là loại có giá thành cao nhất

2. **RRS**
* Thiết kế  cho các object không quá quan trọng
* Độ bền 99.99%
* Tính sẵn sàng 99.99%
* Giá thành rẻ hơn loại `Standard`

3. **Infrequent Access (S3-IA)**
* Thiết kế cho các object mà chúng ta không thường xuyên dùng đến, nhưng luôn luôn có sẵn khi cần.
* Độ bền 99.99999999999%
* Tính sẵn sàng 99.90%
* Rẻ hơn 2 loại `Standard` và `RRS`

4. **Glacier**
* Thiết kế phù hợp với các objects có mục đích lưu trữ trong khoảng thời gian rất lâu và gần như không bao giờ dùng đến
* Cần khoảng vài giờ để lấy ra các object được lưu trữ
* Độ bền 99.999999999999%
* Có giá thành rẻ nhất trong 4 loại

Tuy nhiên trong thực tế  các object không thể áp dụng mãi một `storage class` duy nhất, chẳng hạn như có 1 file lúc đầu dùng đến rất nhiều nhưng một thời gian sau lại không cần dùng nhiều nữa, thì chúng ta phải thay đổi `storage class` của object sao cho hợp lí nhất, để thuận tiện cho việc thay đổi này, ta có thể dùng đến `Lifecycle`.
### Object Lifecycle
`Object Lifecycle` là tập hợp các quy tắc (rules) được thiết lập để tự động thay đổi `storage class` của object trong một khoảng thời gian.

Cùng xem ví dụ:
* Chúng ta có 1 file cần truy cập liên tục hàng ngày trong khoảng 1 tháng.
* Sau 1 tháng, chỉ cần truy cập đến file đó tuần 1 lần trong vòng 2 tháng tiếp theo
* Sau 2 tháng, chúng ta gần như không cần đến file đó nữa nhưng vẫn phải lưu lại trong trường hợp khẩn cấp

Vậy giải pháp lựa chọn `storage class` nào hợp lí và tiết kiệm chi phí nhất cho từng mốc thời gian?

1. **0-29 ngày (tháng thứ nhất)**
* Cần truy cập thường xuyên
* Lựa chọn `Standard`
* Chi phí cao

2. **30-89 (tháng tiếp theo)**
* Lượng truy cập giảm đi rất nhiều
* Lựa chọn `Infrequent Access`
* Chi phí trung bình

3. **90+ (sau 2 tháng trở đi)**
* Gần như không có truy cập
* Lựa chọn `Glacier`
* Chi phí thấp

Và ta có thể thiết lập `Lifecycle` cho object đó theo schedule như trên. Sau đó object sẽ tự động thay đổi `storage class` theo rules mà chúng ta đã thiết lập.

Lưu ý `Lifecycle` có thể áp dụng cho:
* toàn bộ `bucket` (bao gồm tất cả các objects bên trong)
* một hay nhiều `folder` trong bucket
* một hay nhiều `object` trong bucket
### Permissions
`S3 Permissions` cho phép ta có thể set những ai có quyền xem, truy cập và sử dụng bucket hay objects. Cụ thể :
1. Đối với `Bucket`:
* List: quyền xem tên của bucket
* Upload/Delete: quyền tải lên hoặc xóa object
* View/edit permission
 
2. Đối với `Object`
* Open/download
* View/edit permission
## EC2 (Elastic Compute Cloud)
`EC2 (Elastic Compute Cloud)` là một máy tính ảo, chúng ta có thể sử dụng `EC2` để khởi tạo và chạy các servers theo ý muốn mà không cần lo lắng về chi phí nâng cấp và bảo trì cho cấu hình phần cứng. 

Cấu trúc và các thành phần của `EC2` như sau:

![](https://images.viblo.asia/daea430f-e851-4739-8f55-577f941ab35a.png)
### AMI (Amazon Machine Image)
`AMI` là một "package" cần phải có để  chạy một `EC2 instance`, bao gồm OS, hard drives, các ứng dụng và các gói phần mềm cần thiết khác. Chúng ta phải chỉ định một `AMI` cụ thể khi khởi tạo một `instance`, và ta có thể khởi tạo bao nhiêu `instances` từ `AMI` đó hoặc từ các `AMIs` khác theo ý muốn.

Có ba loại `AMI` chính để cho chúng ta lựa chọn:
* **Community AMIs**: miễn phí, trong đó bao gồm nhiều loại OS được share public để ta chọn lựa
* **AWS Marketplace AMIs**: phải trả phí, bao gồm các gói bổ sung và các phần mềm bản quyền
* **My AMIs**: ta cũng có thể tự tạo ra `AMI` của riêng mình

Để hình dung cụ thể  về vai trò của `AMI`, hãy cùng xem 2 sơ đồ sau:

![](https://images.viblo.asia/e5079be9-c60f-4fef-8260-0063f09ff411.png)

Ở đây, sau khi chúng ta vừa lựa chọn một `Linux AMI` để khởi tạo một `Linux EC2 instance #1`, ngay lập tức có sẵn một `AMI Linux template` để ta có thể  dùng nó để khởi tạo ra các `Linux instance #2, #3, #4..` mới với cấu hình và các components tương đương với `Linux EC2 instance #1`. Hay nói cách khác là các `instances` này đều có chung một `AMI`:

![](https://images.viblo.asia/0204a0f4-33b3-43ba-bd13-491a4d627a34.png)

### Instance Types
`Instance Type` là CPU của `instance`. Mỗi `instance type` đều có tốc độ xử lý, bộ nhớ và khả năng lưu trữ khác nhau, chúng ta cần lựa chọn `instance type` phù hợp với mục đích và nhu cầu sử dụng.

Các thành phần của `Instance Type`:
* Family
* Type
* vCPUs
* Memory (GiB)
* Instance Storage (GB)
* EBS-Optomized Available
* Network Performance
### EBS (Elastic Block Store)
`EBS volume` đóng vai trò như ổ cứng (hard drive) của một `EC2 instance`.

* Tất cả các `EC2 instance` đều phải có "root" volume
* Mặc định `EBS` root volume sẽ bị xóa đi khi một `instance` bị hủy
* Có thể add thêm hoặc loại bỏ `EBS volumes` cho một hoặc nhiều `instance` vào bất cứ thời điểm nào

![](https://images.viblo.asia/8276dc7b-e794-4aa5-be6a-13f9d711bf6e.png)

### Security Groups

![](https://images.viblo.asia/7cb50ff6-6742-4d20-b9e0-bb3dd19f7002.png)

Cũng gần giống như [NACLs](https://viblo.asia/p/amazon-web-services-essentials-iam-and-vpc-components-ORNZqgLr50n#_nacl-network-access-control-lists-9), `Security Group (SG)` cũng đóng vai trò cho phép (allow) hoặc chặn (deny) lưu lượng truy cập, tuy nhiên `SG` bảo mật ở cấp độ `instance` (instance level) trong khi `NaCL` bảo mật ở cấp độ `subnet` (subnet level). 

Hơn nữa các "rules" allow/deny của `SG` cũng khác so với "rules" của `NaCLs`:
* Khi khởi tạo `SG`, mặc định tất cả inbound traffic đều bị denied và tất cả outbound traffic đều được allowed
* Tất cả các traffic đều bị denied cho trừ khi có "allow" rule trong nó
* Không có deny rule, chỉ có allow rule
### IP Addressing
Là dải IP public của `EC2 instance`.

Có 2 loại IP:
* **Private IP Address**: cho phép các `instances` ở trong cùng một `VPC` tương tác với nhau, mặc định tất cả `EC2 instance` đều có private IP address
* **Public IP Address**: cho phép `instance` có thể kết nối với internet

Tổng quát quá trình và tất cả thành phần `EC2` cần để kết nối tới internet:

![](https://images.viblo.asia/993afd76-afe8-4592-a912-6ba8cc02d028.png)

## Summary
Qua bài viết này mình đã trình bày chi tiết hơn về các core services của Amazon là `S3`, `EC2`. Bài viết còn nhiều thiếu sót, cảm ơn các bạn đã dành thời gian đọc bài viết.

Nguồn và tài liệu tham khảo:
* https://www.lucidchart.com/documents/view/703f6119-4838-4bbb-bc7e-be2fb75e89e5/4
* https://www.lucidchart.com/documents/view/703f6119-4838-4bbb-bc7e-be2fb75e89e5/5
* https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
* https://docs.aws.amazon.com/AmazonS3/latest/gsg/AmazonS3Basics.html