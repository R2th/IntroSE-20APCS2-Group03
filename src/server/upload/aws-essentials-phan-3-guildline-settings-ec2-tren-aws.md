Tiếp tục với chuỗi chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, mình xin được giới thiệu tiếp về Settings EC2 (Elastic Compute Cloud) trên AWS

Và trước khi đi vào những phần cụ thể, mình sẽ khái quát lại một số khái niệm, định nghĩa về EC2

# 1. Tổng quan EC2
### 1.1 EC2 là gì
Định nghĩa đơn giản:
Có thể coi EC2 như là một máy tính thông thường chúng ta có thể gặp được ở bất kì đâu

Định nghĩa của AWS:
Amazon Elastic Compute Cloud (Amazon EC2) cung cấp máy tính ảo tuỳ biến trên Amazon Web Services (AWS). Amazon EC2 sẽ loại bỏ việc phải đầu tư phần cứng trước, thay vào đó user có thể bắt tay vào dev và deploy applications nhanh hơn.
Chúng ta có thể sử dụng Amazon EC2 để chạy số lượng server ảo dựa theo nhu cầu của hệ thống, thực hiện config security và networkin cũng như quản lý lưu lượng bộ nhớ. Amazon EC2 cho phép người dùng scale up và down để tuỳ biến dựa trên mức độ phổ biến của ứng dụng cũng như giảm lượng service cần dùng dựa trên traffic hệ thống.

### 1.2 Các thành phần của EC2
Các thành phần cơ bản của máy tính thông thường

![](https://images.viblo.asia/da0cd1b2-dbaf-41e4-899a-c85d19a35c35.png)

Các thành phần cơ bản của EC2

![](https://images.viblo.asia/bd0f37cd-346a-4657-b221-0e38b8f1ee8c.png)

* AMIs (Linux hoặc Windows)
* Instance Type (Processing Power)
* EBS (Local Storage)
* IP Addressing (Internet Access)
* Security Groups (Security)
* RAM (Memory)


### 1.3 Những Purchaseing Options phổ biến nhất cho EC2 Instance
**- On-Demand: Cho phép user lựa chọn bất kì instance type nào và có thể cấp mới/loại bỏ các instance này bất kỳ lúc nào**
1.  Đây là purchasing option đắt nhất
1. Nhưng đây cũng là purchasing option flexible nhất
1. User sẽ chỉ bị charge khi instance đang chạy (và giá được tính theo giờ)
1. User có thể thực hiện cấp mới/ loại bỏ instance bất kì lúc nào

**- Reserved: Đây là option cho phép user thanh toán instance trong một khoảng thời gian cố định như một(1) hoặc ba(3) năm**
1. Purchasing option này sẽ tiết kiệm một khoản tiền lớn cho  user
1. User có thể chọn trả trước, trả trước một phần hoặc không trả trước
1. Khi user đã mua reserved instance, họ sẽ sở hữu nó trong một khoảng thời gian và chịu phí toàn bộ dù có dùng instance đó hay không

**- Spot: Spot pricing là cách user trả giá cho instance type, và chỉ thanh toán cho instance khi spot price bằng hoặc thấp hơn số tiền user đã trả giá **
1. Option cho phép Amazon bán instance không sử dụng, trong một khoảng thời gian ngắn
1. Spot price dựa trên nguồn và yêu cầu của spot marketplace
1. User phải thanh toán theo phút
1. Khi user có active số tiền trả giá(bid) , instance sẽ cấp mới cho user dựa trên spot price bằng hoặc thấp hơn số tiền đã trả giá
1. Instance cấp mới sẽ tự động bị loại bỏ nếu spot price lớn hơn số tiền user đã trả giá.

# 2. Amazon Machine Image (AMIs)
### 2.1 AMI là gì?
AMI là preconfig package cần thiết để chạy EC2 instance bao gồm hệ điều hành, software package và các setting required khác.
Có thể sử dụng chỉ một AMIs chung cho nhiều EC2 Instance

Có thể coi AMI là một template sử dụng để deploy EC2 Instance bao gồm các thành phần:

**1. Root volume template:**
- Hệ điều hành (Linax, Windows)
- Application Software (Apache,...)

**2. Launch Permissions**

**3. Block Device Mapping: EBS (Hard drive mapping)**

Chúng ta có thể thực hiện dựng một API template chung (configure và setting) để deploy cho nhiều EC2 Instance:

![](https://images.viblo.asia/d84606f4-ed28-4bc2-ab76-04f93ca362e3.png)

### 2.2 Lựa chọn AMI
AMI có 3 Category chính như sau:

**1. Community AMIs:**
- Sử dụng free
- Các AMI cơ bản, user chỉ  lựa chọn OS 
- Trên Community AMIs thì các OS thường không có software đi kèm mà user phải tự cài đặt khi deploy lên EC2

**2. AWS Marketplace AMIs:**
- Phải trả phí để sử dụng
- Có các packaged bổ sung đi kèm, và có license của các software

**3. My AMIs:**
- AMIs mà user tự khởi tạo

![](https://images.viblo.asia/38ed5b6f-d9eb-4892-89b7-a2e3b3bd35bc.png)

# 3. Instance Type
### 3.1 Instance Type là gì?
Hiểu một cách đơn giản: Instance Type là CPU của EC2 Instance
Khi khởi tạo một instance, thì Instace type user chỉ định sẽ là hardware của host computer sử dụng cho Instance của user. 
Mỗi instance type sẽ offer compute, memory, và storage khác nhau.
Việc lựa chọn Instance type dựa trên yêu cầu của application hoặc software dự kiến sẽ chạy trên Instance

### 3.2 Các thành phần của Instance Type
**1. Family:**
- Đây là phương thức để category hoá Instance type dựa trên sự tối ưu của Instace type

**2. Type:**
- Subcategory của mỗi Family type

**3. vCPUs:**
- Số lượng CPUs ảo mà Instance type sử dụng

**4. Memory (GiB)**
- RAM mà Instance type sử dụng

**5. Instance Storage (GB):**
- Local storage của instance (hard drive)

**6. EBS-Optimized Available:**
- Cho biết liệu EBS có phải option được tối ưu hoá cho Instance Type hay không

**7. Network Performance:**
- Network performance rate dự trên data transfer rate


![](https://images.viblo.asia/a4b0c84d-61c2-4172-a353-af16ad4ab4d0.png)


# 4. Elastic Block Storage (EBS)
### 4.1 Elastic Block Store là gì?
EBS là một storage volume của EC2 Instance (Có thể coi EBS như là một hard drive)
Amazone Elastic Block Store cung cấp block level storage volume để EC2 sử dụng. Các EBS volume này có tính tương thích cao và dựa vào các storage volumn có thể attach cho bất kì Instance đang chạy nào trong cùng một Availability Zone.

Trước khi tìm hiểu sâu hơn, chúng ta sẽ cần biết về IOPS
### 4.2 Vậy thì IOPS là gì?
IOPS = Input/Output Operations Per Second.
Hiểu một cách đơn giản, IOPS là khối lượng data có thể được ghi vào hoặc nhận từ EBS mỗi giây.
Càng nhiều IOPS đồng nghĩa với EBS volume có performance tốt hơn (tốc độ đọc và ghi nhanh hơn)

Điều gì quyết định của khối lượng IOPS?
Dựa vào EBS volume size. Storage size càng lớn (tính bằng GiB), thì volume sẽ có càng nhiều IOPS

### 4.3 So sánh giữa Root và Additional EBS Volume:
1. Tất cả các EC2 Instance đều PHẢI có một root volume, volume này có thể hoặc không phải là EBS.
2. Default: EBS root volume được set để bị xoá bỏ khi instance bị xoá. Tuy nhiên, user có thể chọn EBS volume 

![](https://images.viblo.asia/262a5ffb-ad30-4497-9f57-02da1f389e00.png)

3. Trong khoảng thời gian khởi tạo EC2 Instance (hoặc bất kì lúc nào sau đó), user có thể thực hiện add thêm EBS volume vào instance.
4. Bằng cách add thêm EBS volume, các volume này có thể được attach và detach khỏi Instance bất kì lúc nào. Và các volume này KHÔNG bị xoá (by default) khi Instance bị xoá

![](https://images.viblo.asia/365b1966-ca0c-49ad-af65-c9bb22dbdba2.png)

### 4.4 Config Instance Details và Add Storage

Ở phần setting này, tạm thời mình sẽ để setting default theo như AWS suggest và chuyển sang step Add Storage

![](https://images.viblo.asia/9ca12fcb-79b1-472b-ab19-e316d5a510bf.png)

Add Storage:
- Lưu ý rằng khi đến step Add Storage này thì default đã có một Root volume được attach vào EC2. 
- Coi Root volume này như một thành phần bên trong EC2. Và nếu user bỏ EC2 Instance này đi, thì kéo theo Root Volume này cũng bị xoá trừ khi chúng ta uncheck checkbox "**Delete on Termination**"
Bằng action này, thì kể cả khi EC2 Instance bị xoá bỏ thì chúng ta vẫn giữ lại được Root volume này. Và Root Volume này sẽ ở trạng thái không attach với bất kì EC2 Instance nào.

![](https://images.viblo.asia/c4aa5456-f40f-40dd-a2a6-8e8bd5e95883.png)

### 4.5 Create Volume

Thay vì tạo volume trong step Add Storage, user có thể chủ động tạo một Volume riêng như sau:

![](https://images.viblo.asia/eb87ff67-518d-42ca-ae00-d93e557a29f6.png)


Trong quá trình Create Volume, chúng ta có thể setting:
- Volume Type, Size của Volumn
- IOPS
- Availability Zone: Lưu ý nếu tạo Volumn ở Availability Zone nào thì chỉ có EC2 Instance nằm trong Availability Zone đó mới có thể thực hiện attach Volume với EC2 Instance.
- Ngoài ra user cũng có thể thực hiện tạo các Volume dựa trên Snapshot. Mình sẽ giới thiệu về Snapshop ở phía dưới.
- Khác với Volume Root thì Volume user tạo ra có thể được swap để attach và detach giữa các EC2 Instance trong cùng một Avalability Zone

![](https://images.viblo.asia/30cc618b-2e19-482c-9d83-eb80dd0b59f8.png)

### 4.6 Snapshot
Khái niệm Snapshot:
- Một snapshot được coi là một image của EBS volume mà có thể lưu lại như là **backup** của volume hoặc sử dụng để tạo ra một volume duplicate
- Một snapshot **KHÔNG** phải một **active EBS volume**, user không thể thực hiện **attach hoặc detach** một snapshot tới EC2 Instance
- Để **restore** một snapshot, chúng ta cần **tạo mới một EBS Volume sử dụng snapshot như là một template**

# 5. Security Groups
### 5.1 Khái niệm Security Groups
Security Groups rất tương đồng với NACLs, cả 2 đều allow hoặc deny traffic. 
Tuy nhiên, security groups được sử dụng trên **instance level** (Ở phía đối nghịch so với subnet Level). 
Thêm vào đó, **rule allow/deny cũng hoạt động khác so với NACLs**

Cụ thể:
- NACLs (Network  Access Control List) có đánh rule được đánh số. 
- Security Groups không assign number cho các rule.
- NACLs có thể tạo re deny rule, tuy nhiên chúng ta không thể tạo DENY rule trên Security Groups
Tức là nếu không setting bất kì rule nào trên Security Groups thì default Security sẽ deny mọi traffic kết nối.

![](https://images.viblo.asia/cc527cb8-8c3d-4c2e-a224-8680656f9b98.png)

- Trong mô hình phía trên, chúng ta được tiếp cận thêm một module chưa thấy trước đây, đó là ELB (Elastic Load Balancer). Nhiệm vụ của ELB là phân bổ traffic từ Internet Gateway tới nhiều EC2 Instance.
- ELB chính là module quyển định sẽ chuyển traffic vào subnet 1 hay vào EC2 Instance subnet 2. 
Ở trong ví dụ mô hình này, điều quan trọng chúng ta phải hiểu rằng cả 2 Instance EC2 subnet 1 và 2 đều phải có chung một ALLOW Rule. Nếu không, thì EC2 Instance Subnet 1 allow traffic kết nối tới nhưng Subnet 2 tương đương lại block kết nối tương tự.


### 5.2 Inbound/Outbound rules

![](https://images.viblo.asia/8362982e-04e7-4fed-bc35-fc16650d620b.png)

Khi tạo mới một Security Group, thì default toàn bộ Inbound traffic sẽ là deny, còn toàn bộ Outbound traffic sẽ là Allow

![](https://images.viblo.asia/f19854d0-8b2b-4315-8074-d8d751f7d060.png)

Một điều cần lưu ý:

*Bất kì traffic nào được allow truy cập vào security group thì cũng sẽ tự động được allow return trở lại source của nó ngay cả khi không có matching Outbound rule*

# 6. IP Addressing
### 6.1 Định nghĩa IP Addressing
IP Addressing cung cấp cho EC2 Instance một public IP Address.

Một ví dụ đơn giản:
- Coi network traffic như là một thư bưu điện.
- IP address là địa chỉ nhà của chúng ta
- Nếu có bất kì ai muốn gửi thư tới nhà chúng ta, họ cần biết địa chỉ để xác định location và gửi thư.
- Nếu không có địa chỉ thì không ai có thể tìm được nhà chúng ta và gửi thư.

Public và Private IP Address:

**1. Private IP Address:**
- Default thì toàn bộ EC2 Instance đầu có 1 private IP Address
- Private IP Address cho phép các Instance communicate với nhau, miễn là các Instance này đều nằm trong cùng VPC

**2. Public IP Address:**
- EC2 Instance có thể chạy dù có hay không có public IP Address, phụ thuộc vào VPC/subnet settings.
- Public IP Address sẽ required cho các Instance cần kết nối tới Internet.

Cụ thể trong Step3 khi Launch Instance:

![](https://images.viblo.asia/6acc1204-fa49-4917-a899-ae19f92af401.png)



**Note: Default VPC và subnets được config vậy nên bất kì instance mới nào được cấp cũng sẽ có một địa chỉ public IP Address**

**3. Setting Instance Details**
Khi lựa chọn VPC default, thì setting default của Subnet và Auto-assign Public IP tương ứng sẽ là:
- Subnet: No preference
- Auto-assign Public: Use subnet setting (Enable)

![](https://images.viblo.asia/19760229-3302-43d5-add3-7ba5dc2fa4cf.png)


Tuy nhiên, nếu lựa chọn VPC khác với Subnet tích hợp tương ứng cho VPC này, thì setting default của Subnet và Auto-assign Public IP tương ứng sẽ là:
- Subnet: lấy theo subnet tích hợp tương ứng cho VPC
- Auto-assign Public IP: Use subnet setting (Disable)

![](https://images.viblo.asia/b6f5aba7-7db7-4b73-b402-f0094a794223.png)

**4. Cách setting EC2 để EC2 Instance có thể communicate với internet**

![](https://images.viblo.asia/46b8459b-ddab-425d-9c2b-b75d60955bf6.png)

Các step setting:
- EC2 phải có Public IP Address.
- Security Group phải có setting allow rule chỉ định type traffic có thể pass qua NACLs (Network Access Control List)
- NACLs phải có setting rule allow traffic pass tư NACLs tới được Route Table.
- Route Table có một Route connect tới Internet Gateway.
- Internet Gateway cần được attach tới VPC.
- Traffic đi qua Internet Gateway và sẽ connect được Internet.
- Và ngược lại, khi có tín hiệu traffic từ Internet sẽ đi theo flow ngược lại để tới được EC2 với các setting tương ứng

Việc setting EC2 Instance có thể kết nối được internet thông qua rất nhiều step phía trên, điều này cho thấy các lớp bảo mật của AWS rất chặt chẽ.

User buộc phải có kiến thức về toàn bộ các phần này để có thể tiến hành setting cũng như maintain được Cloud Service.

# 7. Launch và sử dụng EC2 Instance
Các step cơ bản để Launch EC2 Instace và connect tới một EC2 Instance (Linux/SSH)

![](https://images.viblo.asia/2784d77d-c880-46d9-b61b-50a6b162c1de.png)

**Step 3: Configure Instance Detail**

![](https://images.viblo.asia/885fd492-261b-458e-87ab-d4437248ad00.png)

**Step 5: Add Tag**

![](https://images.viblo.asia/be3c3994-5f6c-4a42-b8e7-802949e5a898.png)

**Step 6: Configure Security Group**

![](https://images.viblo.asia/3b2e8383-114a-4829-8d82-fcc44d943400.png)

**Step 7: Review Instance Launch**
Step này chúng ta cần tạo mới new key pair với setting Name tuỳ ý, sau đó AWS sẽ yêu cầu chúng ta donwload file Key Pair về để tracking key sau này.

Sau các bước phía trên chúng ta đã hoàn thành việc setting EC2 Instance thành công. Hẹn gặp lại mọi người ở các bài viết sau về setting S3.