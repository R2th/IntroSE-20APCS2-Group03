# 1. Cơ bản về EC2
### 1.1 Định nghĩa
Một cách đơn giản, chúng ta có thể coi EC2 tương ứng với một chiếc PC cơ bản.
<br>

EC2 cung cấp khả năng tính toán (**có thể scale được**) trong AWS Cloud. Sử dụng Amazon EC2 giúp bạn không cần phải đầu tư trước vào phần cứng, vì vậy bạn có thể phát triển và triển khai các ứng dụng nhanh hơn. Bạn có thể sử dụng Amazon EC2 để **khởi chạy nhiều hoặc ít máy chủ ảo tùy ý**, thiết lập cấu hình bảo mật và mạng cũng như quản lý bộ nhớ. Amazon EC2 cho phép bạn tăng hoặc giảm quy mô để xử lý các thay đổi về yêu cầu hoặc mức tăng đột biến về truy cập, giảm việc phải dự báo lưu lượng truy cập của bạn.
<br>

Như đã nói ở trên, EC2 tương ứng như một chiếc PC nên chúng cũng sẽ có các thành phần tương tự như một chiếc PC:
- PC:

![](https://images.viblo.asia/36f6005d-3706-4027-a058-ecfe7146cb7a.png)

- EC2:

![](https://images.viblo.asia/1e0ce8e7-7f54-4de3-a931-fa781c2021e5.png)

### 1.2 Chi phí
Một điểm quan trọng bạn cần cân nhắc khi sử dụng EC2 đó chính là chi phí, cũng như cách tính phí. Dưới đây là ba lựa chọn "mua" EC2 thông dụng nhất:

#### Theo yêu cầu (On-Demand):
Lựa chọn mua này cho phép bạn chọn bất cứ **loại instance** nào bạn muốn và khởi chạy/tắt nó bắt cứ khi nào bạn muốn. Một số điểm lưu ý:
1. là lựa chọn có đơn giá **đắt nhất**.
2.  là lựa chọn **linh hoạt nhất**.
3.  bạn chỉ bị tính phí khi instance **đang chạy** (phí tính theo giờ).
4.  bạn có thể bật/tắt instance bất cứ lúc nào.

#### Bao trọn (Reserved):
Lựa chọn mua này cho phép bạn mua trọn một instance **trong một khoảng thời gian nhất định** (1 hoặc 3 năm).
1. lựa chọn này sẽ giúp bạn **giảm một lượng lớn chi phí** so với lựa chọn mua theo yêu cầu.
2. bạn có thể chọn trả trước, trả trước một phần hoặc trả sau.
3. một khi bạn đã mua trọn một instance, bạn sẽ sở hữu nó cho riêng mình trong một khoảng thời gian đã chọn và **chịu trách nhiệm thanh toán toàn bộ mức giá** bất kể bạn sử dụng nó nhiều hay ít như thế nào.

#### Spot:
Lựa chọn mua này là việc "đấu giá" một kiểu instance nào đó bạn muốn, sau đó bạn sẽ chỉ chi trả và sử dụng instance đó khi giá spot của instance **nhỏ hơn hoặc bằng** với mức giá mà bạn đưa ra.
1. lựa chọn này giúp Amazon có thể bán việc sử dụng các **instance đang không được sử dụng** nhưng chỉ trong một khoảng thời gian ngắn và với **mức giá được giảm đáng kể**.
2. **giá spot dao động** dựa theo cung và cầu trên thị trường spot.
3. **phí tính theo phút**.
4. khi bạn đưa ra giá đấu giá, một instance sẽ được **cấp cho bạn khi giá spot nhỏ hơn hoặc bằng với giá bạn đưa ra**.
5. instance được cấp sẽ bị **tự động tắt khi giá spot lớn hơn so với giá bạn đưa ra** (bất kì dữ liệu nào lưu trên nó và các service đi kèm với nó cũng sẽ mất).

Bạn có thể check danh sách toàn bộ các option mua tại đây: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html
<br>

Ngoài ra các yếu tố sau cũng ảnh hưởng chi phí sử dụng EC2:
1. Loại instance
2. Tối ưu EBS (là lựa chọn để có được hieeuh năng IOPS cao hơn)
3. Loại AMI
4. Lưu lượng truyền dữ liệu
5. Region mà instance được khởi chạy

> Tất nhiên các option trên có thể có sự thay đổi so với thời điểm viết bài, thế nên trước khi bạn quyết định sử dụng EC2 thì hãy check lại các option cùng bảng giá để có thế nắm được mình sẽ cần bỏ ra chi phí là bao nhiêu để vận hành phần mềm của mình.

# 2. Amazon Machine Images (AMIs)
### 2.1 Định nghĩa
Một AMI là một package được cấu hình sẵn, bạn cần có AMi để khởi tạo một instance EC2. AMI sẽ bao gồm một **hệ điều hành**. các package phần mềm và các cài đặt cần thiết khác.
<br>

Ban có thể khởi tạo nhiều instance từ một AMI cũng như khởi tạo các instance theo các AMI khác nhau tùy ý.
<br>

Giải thích một cách trực quan hơn thì bạn có thế hiểu khi bạn tạo một AMI từ một instance EC2 thì về bản chất là bạn tạo ra một template dùng để dựng lên các instance EC2 khác có các thành phần giống hệt như instance EC2 gốc.
![](https://images.viblo.asia/813a3a10-0d18-407e-8378-c19b59af34d6.png)

Điều này sẽ giúp bạn tiết kiệm rất nhiều thời gian vì bạn sẽ không cần phải thao tác tay cài lại hệ điều hành và các ứng dụng mỗi khi dựng một instance, cũng chính vì thế mà chúng ta có thể tránh được các lỗi con người như cài đặt sai, hoặc deploy sao mỗi khi khởi chạy một instance mới.
<br>

### 2.2 Category

Bạn có thể lựa chọn AMI khi thiết lập khởi tạo instance EC2 và AMI được chia thành ba category chính:

#### 1. Community AMIs:
![](https://images.viblo.asia/e5509b0d-ef2a-4fd7-ac6c-191d28ec7b5e.png)
- Miễn phí
- Thông thường với loại AMI này thì bạn chỉ chọn hệ điều hành cần dùng.

#### 2. AWS Marketplace AMIs:
![](https://images.viblo.asia/01e26d3f-fb9f-4dad-af8a-4a2552c9f6e5.png)

- Trả phí
- Thường có thêm các phần mềm được cấp giấy phép.

#### 3. My AMIs:
- Các AMI do bạn tự tạo ra. 

# 3. Instance Types
Đối với AWS EC2, **Instance type** là từ dùng để chỉ CPU của instance.
<br>

Khi bạn khởi chạy một instance, thì **Instance type** mà bạn đã chọn trước đó sẽ quyết định phần cứng máy chủ được dùng cho instance của bạn. Mỗi Instance type lại có các khả năng tính toán, bộ nhớ và khả năng lưu trữ khác nhau và chúng được nhóm thành các instance family dựa theo những khả năng này.

![](https://images.viblo.asia/d5c01500-ab97-46f9-a564-7960f15eadba.png)

- **Family:** thể hiện sự phân loại của instance type dựa trên việc chúng được tối ưu cho việc gì.
- **Type:** category phụ cho mỗi category chính.
- **vCPUs:** số lượng CPU ảo mà instance type sử dụng.
- **Memory (GiB):** lượng RAM mà instance type sử dụng.
- **Instance Storage (GB):** khối lượng lưu trữ cục bộ của instance.
- **EBS-Optimized Available:** thể hiện rằng bạn có thể lựa chọn EBS-optimized với instance type này.
- **Network Performance:** đánh giá hiệu suất mạng dựa trên tốc độ truyền dữ liệu (khả năng băng thông).

# 4. Elastic Block Store (EBS)
### 4.1 Định nghĩa
EBS là một khối lưu trữ cho một instance EC2 (có thể coi nó đơn giản như là ổ cứng).
<br>

Amazon EBS cung cấp khối lượng lưu trữ cấp block để sử dụng với các instance EC2. Ổ EBS hoạt động giống như các thiết bị block thô, chưa được định dạng. Bạn có thể gắn các block này làm thiết bị trên các instance của mình. Các ổ EBS được đính kèm với một instance dưới dạng ổ lưu trữ và tồn tại độc lập với vòng đời của instance. Bạn có thể tạo một file hệ thống trên các ổ này hoặc sử dụng chúng theo bất kỳ cách nào bạn sử dụng thiết bị block (chẳng hạn như ổ cứng). Bạn có thể tự động thay đổi cấu hình của một ổ EBS được đính kèm với một instance.
<br>

Trước khi tìm hiểu tiếp về EBS. Các bạn cần nắm được khái quát về IOPS (nếu như bạn chưa biết nó là gì) cũng như IOPS trong EBS:
- IOPS là viết tắt của **I**nput – **O**utput **O**peration **P**er **S**econd. Có thể hiểu đơn giản là lượng dữ liệu có thể viết lên hoặc lấy từ EBS trong một giây.
- IOPS càng cao thì hiệu năng của ổ sẽ càng tốt (tốc độ write/read càng cao)
- Ổ EBS có trữ lượng càng lớn thì có IOPS càng cao

### 4.2 Ổ root và ổ EBS thêm
![](https://images.viblo.asia/c50f57d9-e49d-4bbb-a53a-2d190d6c2aa0.png)

- Mỗi instance EC2 đều **phải** có một ổ root, ổ root có thể là EBS hoặc không.
- Mặc định, khi instance bị tắt thì ổ root EBS sẽ bị xóa đi, bạn có thể tùy chọn giữ lại ổ EBS sao khi tắt instance.
- Trong quá trình tạo một instance EC2 (hoặc bất cứ lúc nào sau khi tạo) ban có thể add thêm ổ EBS cho instance:
![](https://images.viblo.asia/1fd46a51-2333-43d9-b061-da62077d612e.png)

- Bạn có thể đổi ổ EBS giữa các instance cho nhau bằng cách tháo chúng ra khỏi instance này rồi gắn vào instance kia
- Bất cứ ổ được gắn thêm hoặc tháo ra khỏi instance vào bất cứ lúc nào mặc định sẽ không bị xóa khi instance tắt.

# 5. Security Groups
Security Group khá là giống với [NACLs](https://viblo.asia/p/aws-ket-noi-va-dich-vu-mang-XL6lA0ggZek#_5-network-access-control-list-nacls-4): chúng **cho phép hoặc chặn truy cập**. Tuy nhiên security group sẽ được thiết lập ở **tầng instance** (NACLs là ở tầng subnet). Thêm nữa là cách hoạt động của rule trong security group cũng khác với của NACLs.
<br>

Khi bạn tạo một secrutiy group mới, mặc định tất cả các giao tiếp từ bên ngoài vào sẽ bị chặn và tất cả các giao tiếp từ trong ra sẽ được cho phép.
![](https://images.viblo.asia/d0b8f6e8-0f33-43cd-89f9-fe5e7776250e.png)

Hãy chú ý là khác với NACLs, rule của Security Group không có số và chúng ta không thể chọn DENY hoặc ALLOW cho rule, rule của security group luôn là rule ALLOW. Để chặn một địa chỉ nào đó chúng ta cần phải set cho rule với một range không có chứa địa chỉ đó.

# 6. Gán IP cho EC2
Việc cấp cho instance EC2 địa chỉ IP **public** là một việc cần thiết để chúng có thể giao tiếp với Internet.

![](https://images.viblo.asia/7c7d64e7-269c-41c5-a32e-78154cbe79bf.png)

> Địa chỉ IP của instance là "địa chỉ" của nó ở trên mạng. Nếu coi mạng lưới Internet như một mạng lưới bưu điện thì địa chỉ IP chính là địa chỉ nhà. Một ai đó muốn gửi thư tới nhà của bạn thì họ sẽ phải cần biết được địa chỉ nhà của bạn để có thể gửi thư.

- Địa chỉ IP private: Mặc định thì mọi instance EC2 đều sẽ có một địa chỉ IP private. Địa chỉ này sẽ giúp cho các instance có thể giao tiếp với nhau miễn là chúng nằm trong cùng một VPC.
- Địa chỉ IP public: Một instance EC2 có thể được khởi chạy dù có hay không địa chỉ IP public tùy theo tùy chỉnh của VPC/subnet (mặc định sẽ cần phải có địa chỉ IP public). Địa chỉ IP public là bắt buộc để instance có thể giao tiếp với Internet.

![](https://images.viblo.asia/68f75960-5b32-4c7e-a1ae-03ceb7d8fd05.png)

# 7. Khởi chạy và sử dụng một instance EC2

### 7.1 Khởi chạy một instance EC2
Ở mục này mình sẽ khởi chạy thử một instance EC2 cho các bạn xem. Đầu tiên hãy đăng nhập vào console của AWS, search EC2 để vào được dashboard của EC2 và ấn vào nút "Launch instance" rồi thực hiện theo các bước sau:
<br>

#### 1. Choose AMI
Hãy chọn một AMI có dòng "Free tier eligible". Mình sẽ chọn một AMI Linux.
![](https://images.viblo.asia/ba2b9b2b-60e9-4bc3-9add-c41500082150.png)

#### 2. Choose Instance Type
Ở đây mình chọn Type t2.micro vì nó là lựa chọn free duy nhất.

#### 3. Configure instance
Bước này thì với ví dụ chúng ta chỉ cần chú ý đến một vài điểm:
- **Network**: hãy chọn VPC mặc định
- **Subnet**: hãy chọn một public subnet
- **Auto-assign Public IP**: dùng setting của subnet hoặc set lại, miễn sao là enable
- **Advanced Details > User data**: chúng ta sẽ thêm một bash script vào đây. Script này sẽ cập nhật phần mềm và cài đặt HTTP (Apache Web service) và khởi động nó.

```
#! /bin/bash
yum update -y
yum install -y httpd
service httpd start
```

#### 4. Add Storage
Ở bước này thì ổ root đã được tự động đính vào instance, chúng ta không cần làm gì điều chỉnh gì cả nên hãy sang bước tiếp theo.

#### 5. Add tags
Bước này có thể bỏ qua.

#### 6. Configure Security Group
- Hãy chọn tạo security group mới
- Chúng ta đã có sẵn rule cho SSH open hoàn toàn với Internet, ở thực tế thì chung ta cần điều chỉnh để có thể giới hạn việc truy cập bằng SSH, nhưng ở ví dụ này thì chúng ta có thể để như vậy cũng được.
- Hãy add thêm rule cho phép HTTP từ mọi nguồn.

![](https://images.viblo.asia/4a23c6ff-732f-4ddf-b6ea-3082635a7a1f.png)

#### 7. Review
Hãy review lại một lượt rồi ấn Launch. Hộp thoại sau sẽ hiện ra:

![](https://images.viblo.asia/ecb0ae61-d385-4c0e-8b33-b72626b21490.png)

Hãy chọn tạo key pair mới và download key pair đó rồi ấn Launch Instance. Nếu thành công thì màn hình thông báo sẽ hiện ra cùng với nút tới dashboard của instance:

![](https://images.viblo.asia/8bcb6983-6df5-429e-a498-9deec16104d5.png)

### 7.2 Kết nối tới một instance EC2 (thông qua Linux/SSH)
Tại màn hình list instance, hãy chọn instance bạn vừa khởi chạy và ấn Connect, chọn tab SSH client bạn sẽ thấy một hướng dẫn để kết nối tới instance qua SSH.

![](https://images.viblo.asia/821247b1-c0b0-4576-a9d2-e8ad2b2d2d15.png)

Khi state của instance đã chuyển thành running, bạn hãy thử truy cập vào server qua browser với địa chỉ IP public của instance (ở trong màn hình detail về instance). Nếu kết quả như hình dưới đây là bạn đã thành công:

![](https://images.viblo.asia/19a16828-f9c4-4d95-92a4-1e8b21343e30.png)

Nếu không thành công, các bạn hãy check lại xem subnet, security group, NACLs v.v... của mình đã public hay chưa. Nếu settings trên console AWS đã ok hết rồi mà vẫn chưa truy cập được thì bạn có thể truy cập vào server thông qua ssh và chạy tay lại các lệnh ở script khi thiết lập instance:

```
#! /bin/bash
yum update -y
yum install -y httpd
service httpd start
```

-----
*Bài viết về AWS EC2 của mình tới đây là hết, cảm ơn các bạn đã theo dõi và hãy đón đọc các bài viết tiếp theo của mình.*
<br>
*Source: https://www.udemy.com/course/draft/2231112/learn/lecture/13742404#overview*