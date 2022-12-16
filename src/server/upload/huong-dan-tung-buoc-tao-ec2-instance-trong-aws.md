Tiếp nối ở bài [tìm hiểu về AWS](https://viblo.asia/p/tim-hieu-amazon-web-services-aws-3Q75wGg25Wb), chúng ta đã tìm hiểu được sơ qua AWS là gì rồi. Ở phần này sẽ hướng dẫn cách tạo một Instance cụ thể. Hướng dẫn khá là chi tiết, dễ hiểu. Mong rằng sẽ góp chút kiến thức cho các bạn.

*Nhắc tới EC2 Instance, vậy cũng nên hiểu EC2 Instance là gì, trước khi đi sâu vào thực hiện nó*

**EC2 Instance là gì?**

Một EC2 Instance chính là một máy chủ ảo trong thuật ngữ dịch vụ Web của Amazon. EC2 là viết tắt của Elastic Compute Cloud. Đây là một dịch vụ web nơi người đăng ký AWS có thể yêu cầu và cung cấp máy chủ tính toán trong đám mây AWS.

Một phiên bản EC2 theo yêu cầu là một ưu đãi từ AWS, nơi người đăng ký / người dùng có thể thuê máy chủ ảo mỗi giờ và sử dụng nó để triển khai các ứng dụng của riêng mình.

Instance sẽ được tính phí mỗi giờ với các mức giá khác nhau dựa trên loại Instance được chọn. AWS cung cấp nhiều loại Instance cho nhu cầu kinh doanh tương ứng của người dùng.

Do đó, bạn có thể thuê một Instance dựa trên các yêu cầu về CPU và bộ nhớ của riêng bạn và sử dụng nó miễn là bạn muốn. Bạn có thể chấm dứt Instance khi nó không sử dụng nữa để tiết kiệm chi phí. Đây là lợi thế nổi bật nhất của một Instance theo yêu cầu - bạn có thể tiết kiệm đáng kể trên chi phí đầu tư của mình.

Với nội dung bên dưới, sẽ hướng dẫn chi tiết cách khởi chạy phiên bản EC2 theo yêu cầu trong AWS Cloud

### 1. ĐĂNG NHẬP VÀ TRUY CẬP VÀO DỊCH VỤ AWS

**Bước 1.** 

Trong bước này, thực hiện:

- Đăng nhập vào tài khoản AWS của bạn và chuyển đến tab AWS Services ở góc trên cùng bên trái.
- Tại đây, bạn sẽ thấy tất cả các Dịch vụ AWS được phân loại theo khu vực của chúng. Tính toán, lưu trữ, cơ sở dữ liệu, v.v ... Để tạo một EC2 Instance, chúng ta phải chọn Computer EC2 như trong bước tiếp theo.

![](https://images.viblo.asia/d5f1082b-4ea0-4ff0-9ff6-e8600d6a6a66.png)

- Mở tất cả các dịch vụ và nhấp vào EC2 trong Dịch vụ Compute. Sẽ khởi chạy bảng điều khiển của EC2.

Đây là bảng điều khiển EC2. Tại đây bạn sẽ nhận được tất cả thông tin chính về tài nguyên AWS EC2 đang chạy.

![](https://images.viblo.asia/d08951c2-7b1f-48c5-b8f0-c26601ad5e34.png)

**Bước 2.**

Ở góc trên bên phải của bảng điều khiển EC2, chọn Vùng AWS mà bạn muốn cung cấp máy chủ EC2.

Ở đây chúng tôi đang chọn N. Virginia. AWS cung cấp 10 khu vực trên toàn cầu.

![](https://images.viblo.asia/0322eee4-ae53-4b09-9e49-9ae51b74138a.png)

**Bước 3.**

Ở bước này, thực hiện:

- Khi Vùng mong muốn của bạn được chọn, hãy quay lại Bảng điều khiển EC2.
- Nhấp vào nút 'Launch Instance' trong phần Create Instance (như hiển thị bên dưới).
 
![](https://images.viblo.asia/2216fb83-ca56-4bf1-a499-9cde6856d439.png)

- Trang hướng dẫn tạo Instance sẽ mở ngay khi bạn nhấp vào 'Launch Instance'.

### 2. CHỌN AMI

Trong bước này sẽ thực hiện các công việc:

1. Bạn sẽ được yêu cầu chọn một AMI theo lựa chọn của bạn. (AMI là một hình ảnh -Amazon Machine Image. Nó là một mẫu cơ bản của nền tảng Hệ điều hành mà bạn có thể sử dụng làm cơ sở để tạo Instance của mình). Khi bạn khởi chạy một EC2 Instance từ AMI ưa thích của mình, Instance đó sẽ tự động được khởi động với HĐH mong muốn. (Chúng ta sẽ thấy nhiều hơn về AMI trong phần tiếp theo của hướng dẫn).

2. Ở đây chúng tôi đang chọn Amazon Linux (64 bit) AMI mặc định.

![](https://images.viblo.asia/cd81c392-f612-42a1-905a-d391cc3bde81.png)

### 3. CHỌN LOẠI EC2 INSTANCE

 Ở bước này, chúng ta cần chọn loại Instance dựa trên nhu cầu của mình

1. Chúng tôi sẽ chọn loại instance là: t2.micro, đó là máy chủ 1vCPU và 1GB bộ nhớ do AWS cung cấp.
2. Nhấp vào "Configure Instance Details" để biết thêm cấu hình

![](https://images.viblo.asia/8117b436-ef1d-43c5-9987-3a2c2eda7bf4.png)

### 4. CẤU HÌNH INSTANCE

**Bước 1.**

Số thứ tự Instance - bạn có thể cung cấp tối đa 20 trường hợp một lần. Ở đây đang ví dụ khởi chạy một instrance

![](https://images.viblo.asia/e1e66499-c51a-4c63-9c5a-c2bd5a0529fd.png)

**Bước 2.**

Trong Purchasing Options, hãy bỏ chọn tùy chọn 'Request Spot Instances' ngay bây giờ. (Điều này được thực hiện khi muốn khởi chạy các phiên bản Spot thay vì theo yêu cầu. Hướng  dẫn các phiên bản Spot ở trong phần sau).

![](https://images.viblo.asia/605b0815-f199-49c8-81fd-c7b834270122.png)

**Bước 3.**

Ở bước này phải cấu hình một số chi tiết mạng cơ bản cho máy chủ EC2

- Bạn phải quyết định ở đây, trong đó VPC (Đám mây riêng ảo) mà bạn muốn khởi chạy phiên bản của mình và ở dưới các mạng con bên trong VPC của bạn. Tốt hơn là xác định và lập kế hoạch này trước khi khởi động Instance. Kiến trúc AWS của bạn nên bao gồm các dải IP cho mạng con của bạn, v.v. được lên kế hoạch trước để quản lý tốt hơn. (Chúng ta sẽ xem cách tạo VPC mới trong phần Mạng của hướng dẫn.

- Mạng con cũng cần được lên kế hoạch trước. Ví dụ: Nếu đó là máy chủ web, bạn nên đặt nó trong mạng con public và nếu đó là máy chủ DB, bạn nên đặt nó trong mạng con private bên trong VPC của mình.

1.Phần mạng sẽ đưa ra danh sách các VPC có sẵn trong nền tảng của chúng tôi.

2.Chọn một VPC đã tồn tại

3.Bạn cũng có thể tạo VPC mới

Ở đây tôi đã chọn một VPC đã tồn tại nơi tôi muốn khởi chạy Instance của mình.

![](https://images.viblo.asia/d7869213-619c-4a7e-a332-b839bdc3c45c.png)

**Bước 4.**

Trong bước này, thực hiện

- Một VPC bao gồm các mạng con, là các dải IP được phân tách để hạn chế quyền truy cập.
- Thực hiện các bước dưới đây:

1.Trong Mạng con, bạn có thể chọn mạng con nơi bạn muốn đặt Instance của mình.

2.Ở ví dụ này chọn một mạng con đã tồn tại  và được public

3.Bạn cũng có thể tạo một mạng con mới trong bước này.

![](https://images.viblo.asia/be37b119-d871-4402-be75-fd9087285354.png)

- Khi Instance của bạn được khởi chạy trong một mạng con publish, AWS sẽ chỉ định một IP động, công khai cho nó từ nhóm IP của chúng.

**Bước 5.**

Thực hiện:

- Bạn có thể chọn nếu bạn muốn AWS tự động gán IP hoặc bạn muốn thực hiện thủ công sau này. Bạn cũng có thể bật / tắt tính năng 'Auto assign Public IP' tại đây.
- Ở ví dụ này sẽ gán cho Instance này một IP tĩnh được gọi là EIP (Elastic IP). Vì vậy, giữ cho tính năng này bị vô hiệu hóa như hiện tại.

![](https://images.viblo.asia/57fd5902-72da-479d-a240-d0f68fc1ad3b.png)

**Bước 6.**

Thực hiện:

Trong bước tiếp theo, giữ nguyên tùy chọn vai trò IAM 'None'. Chúng ta sẽ đề cập tới chủ đề về vai trò của IAM một cách chi tiết trong các dịch vụ của IAM.

![](https://images.viblo.asia/a06f9a66-34fd-4907-b0e8-d1e0db0849d7.png)

**Bước 7.**

Trong bước này, bạn phải làm những việc sau:

- Shutdown Behavior: Khi bạn vô tình tắt Instance của mình, bạn chắc chắn không muốn nó bị xóa mà bị dừng.
- Ở ví dụ này đây đang xác định hành vi tắt máy của tôi là Stop.

![](https://images.viblo.asia/a546c626-d204-4f71-83de-14a927b87da7.png)

**Bước 8.**

Trong bước này, thực hiện như sau:

- Trong trường hợp, bạn đã vô tình chấm dứt Instance của mình, AWS có một lớp cơ chế bảo mật. Nó sẽ không xóa Instance của bạn nếu bạn đã kích hoạt bảo vệ chấm dứt tình cờ.
- Ở ví dụ này đang kiểm tra tùy chọn để tiếp tục bảo vệ Instance của chúng tôi khỏi sự chấm dứt tình cờ.

![](https://images.viblo.asia/8ac2b2e8-5374-4a6c-a9a6-4d565cdfa881.png)

**Bước 9.**

Trong bước này, thực hiện như sau:

- Trong Monitoring - bạn có thể bật Giám sát chi tiết nếu phiên bản của bạn là phiên bản quan trọng trong kinh doanh. Ở ví dụ này đang chọn không được kiểm tra. AWS sẽ luôn cung cấp miễn phí giám sát cơ bản trên Instance của bạn. 

- Trong Tenancy - Tích chọn nếu thuê chung. Nếu ứng dụng của bạn là một ứng dụng có độ an toàn cao, thì bạn nên sử dụng năng lực chuyên dụng. AWS cung cấp cả hai tùy chọn.

![](https://images.viblo.asia/733f8df3-bdaf-4f35-8038-c15f4389558e.png)

**Bước 10.**

Trong bước này, thực hiện:

- Nhấp vào 'Add Storage' để thêm khối lượng dữ liệu vào Insstance của bạn trong bước tiếp theo.

![](https://images.viblo.asia/57ff9b7d-89d6-42c0-93a2-f070ff6b80e4.png)

### 5. ADD STORAGE

Trong bước này, thực hiện như sau:

- Trong bước Add Storage, sẽ thấy rằng Instance đã được tự động cung cấp một ổ đĩa gốc SSD dung  lượng là 8GB. (Kích thước dung lượng tối đa có thể cung cấp cho mục đích chung là 16 GB)

- Bạn có thể thay đổi kích thước dung lượng của mình, thêm dung lượng mới, thay đổi loại dung lượng, v.v.

- AWS cung cấp 3 loại dung lượng EBS: Magnetic, General Purpose SSD, Provisioned IOPs. Bạn có thể chọn loại dung lượng dựa trên nhu cầu IOP của ứng dụng.

![](https://images.viblo.asia/5d12da56-1491-46d9-a055-55711530f561.png)

###  6. TAG INSTANCE

Trong bước này, thực hiện các công việc sau:

- Bạn có thể gắn thẻ Instance của mình bằng cặp key-value. Điều này mang lại khả năng hiển thị cho quản trị viên tài khoản AWS khi có rất nhiều Instance.

- Các Instance nên được gắn thẻ dựa trên bộ phận, môi trường của họ như Dev / SIT / Prod .... Điều này mang đến một cái nhìn rõ ràng về chi phí cho các Instance dưới một thẻ chung.

1.Ở ví dụ này, Instancei đã gắn thẻ là Dev_Web server 01

2.Bấm vào để đi đến Configure Security Groups ở bước sau

![](https://images.viblo.asia/d384b441-2987-457c-8833-3889a74cfd33.png)

### 7. CẤU HÌNH NHÓM BẢO MẬT

Trong bước tiếp theo của việc cấu hình Security Groups, bạn có thể hạn chế lưu lượng truy cập trên các cổng của Instance. Đây là một cơ chế tường lửa được thêm vào do AWS cung cấp ngoài tường lửa của hệ điều hành đang dùng

Xác định mở các cổng vào IP như sau:
(Hướng dẫn cho máy chủ web)

1.Tạo mới một Security Group

2.Đặt tên cho Security Group 

3.Xác định các giao thức muốn kích hoạt trên Instancei

4.Chỉ định IP được phép truy cập vào Instance 

5.Kiểm tra lại, sau đó nhấn nút Review and launch

![](https://images.viblo.asia/44b9addc-bcdd-4246-8ef5-f5087a35b8d1.png)

### 8. REVIEW INSTANCE

**Bước 1.**

Trong bước này sẽ xem xét tất cả các lựa chọn và tham số đã chọn và tiếp tục khởi chạy Instance

![](https://images.viblo.asia/33552d21-ef25-433d-9f36-778b9dc95cd8.png)

**Bước 2.**

Trong bước tiếp theo, bạn sẽ được yêu cầu tạo một cặp khóa để đăng nhập cho bạn một Instance. Một cặp khóa là một bộ các khóa public-private

AWS lưu trữ private key trong Instance, và bạn được yêu cầu tải về khóa public key. Hãy chắc chắn rằng bạn tải xuống khóa và giữ nó an toàn và bảo mật; Nếu nó bị mất, bạn không thể tải lại.

1.Tạo một cặp khóa mới

2.Đặt tên khóa

3.Tải xuống và lưu nó trong thư mục bảo mật

![](https://images.viblo.asia/8c4e722d-1549-49ab-a0ef-81f2333a3068.png)

Khi đã tải khóa về, bạn có thể mở và xem khóa riêng RSA private đã tải.

![](https://images.viblo.asia/86dc9bac-eb96-40ac-9f05-3d81a4c392ee.png)

**Bước 3.**

Khi đã hoàn tất tải xuống và lưu khóa, hãy khởi chạy Instance của bạn.

![](https://images.viblo.asia/eb7e357c-9cf3-400e-a6c9-e00543accb05.png)

Bạn có thể thấy trạng thái khi đang khởi chạy.

![](https://images.viblo.asia/36f449ae-58d9-43a4-b47e-12e988ffdd3a.png)

Bạn cũng có thể xem nhật ký khởi chạy.

![](https://images.viblo.asia/f3091465-c1ba-4f87-97f7-91a5d9b1495d.png)

Nhấp vào tùy chọn 'Instances' ở khung bên trái nơi bạn có thể thấy trạng thái của Instance là 'Pending' trong một thời gian ngắn.

![](https://images.viblo.asia/3c924b93-e751-4bf2-8dc9-c51d99a02675.png)

- Khi Instance đẩy lên và chạy, bạn có thể thấy trạng thái của nó là 'Running'.
- Lưu ý rằng Instance đã nhận được Private IP từ nhóm AWS.

![](https://images.viblo.asia/a2513c35-b64a-482c-9a4a-7d4d38c119c4.png)

### 9. TẠO EIP VÀ KẾT NỐI TỚI INSTANCE

EIP là một IP tĩnh công khai, được cung cấp bởi AWS. Nó là viết tắt của Elastic IP. Thông thường khi bạn tạo một Instance, nó sẽ tự động nhận IP public từ nhóm của AWS. Nếu bạn dừng / khởi động lại Instance của mình, IP công khai này sẽ thay đổi - đó là tự động. Để ứng dụng của bạn có IP tĩnh từ nơi bạn có thể kết nối qua mạng công cộng, bạn có thể sử dụng EIP.

**Bước 1.**

Trên khung bên trái của Bảng điều khiển EC2, bạn có thể truy cập 'Elastic IPs' như hiển thị bên dưới.

![](https://images.viblo.asia/64474a3f-21e3-48bf-bb2e-87b117d84408.png)

**Bước 2.**

Phân bổ một địa chỉ Elastic IP mới.

![](https://images.viblo.asia/f8634397-acb2-4fb7-a6d1-a519b033c736.png)

**Bước 3.**

Phân bổ IP này sẽ được sử dụng trong phạm vi VPC.

![](https://images.viblo.asia/cedbe34d-68bb-4674-80ce-4106fea5dba1.png)

Yêu cầu sẽ thành công nếu bạn chưa có 5 hoặc nhiều hơn 5 EIP trong tài khoản của mình.

![](https://images.viblo.asia/c5c2a825-8072-4e6a-b90d-86ad66773d85.png)

**Bước 4.**

Bây giờ gán IP này cho Instance.

1.Chọn IP đã nói

2.Nhấp vào Actions -> Associate Address

![](https://images.viblo.asia/1c2df192-dc31-4465-b380-183fb9a2167e.png)

**Bước 5.**

Trong trang tiếp theo,

1.Tìm kiếm Instance của bạn và

2.Liên kết IP với nó.

![](https://images.viblo.asia/0eb0cacb-b87d-4069-80fb-724c0c763c97.png)

**Bước 6.**

Quay trở lại màn hình Instance, bạn sẽ thấy rằng Instance đã nhận được EIP 

![](https://images.viblo.asia/8cbce76d-b584-4be3-906e-9779dfca9ce5.png)

**Bước 7.**

Bây giờ hãy mở PuTTY từ danh sách chương trình  và thêm EIP tương tự của bạn vào đó như bên dưới.

![](https://images.viblo.asia/ca823973-8399-4f0c-9b67-260fa4e7bf69.png)

**Bước 8.**

Trong bước này,

Thêm khóa riêng trong PuTTY để kết nối an toàn

1.Đi tới  Auth

2.Thêm khóa riêng ở định dạng .ppk (putty private key). Bạn sẽ cần phải chuyển đổi tệp pem từ AWS sang ppk bằng cách sử dụng puttygen

3.Sau khi hoàn tất, nhấp vào nút "Open"

![](https://images.viblo.asia/2c57d741-89ae-4e4d-9efb-dd2263965eca.png)

- Khi bạn kết nối, bạn sẽ thấy lời nhắc thành công.
- Xin lưu ý rằng máy bạn đang kết nối phải được bật trong Nhóm bảo mật cho SSH (như trong các bước ở trên).

![](https://images.viblo.asia/fb46aef1-c3f8-4458-b505-82db1c40db4d.png)

Bây giờ bạn có thể sử dụng máy chủ EC2 theo yêu cầu cho các ứng dụng của mình.


***Tóm tắt:***
Những nội dung trong bài viết này là mình dịch lại để tìm hiểu, thấy rất chi tiết nên post lên chia sẻ cho những ai cần tìm hiểu về AWS có thêm chút thông tin. Nếu các bước có sai sót, các bạn comment để cho những bạn đọc sau được chú ý nhé, hoặc ko thực hiện được các bạn có thể tìm thêm thông tin trên internet nha. :)

Tài liệu tham khảo: 
https://www.guru99.com/creating-amazon-ec2-instance.html