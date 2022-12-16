Chào các bạn, hôm nay mình muốn chia sẻ về Service Cloud Computting không còn quá xa lạ trong cộng đồng IT, đó là Amazon Web Service (AWS). 
Hay cụ thể hơn, trong topic lần này mình sẽ đề cập cụ thể tới AWS Essentials.

# Các dịch vụ core phía AWS cung cấp
Dành cho những bạn đọc chưa có nhiều kiến thức cũng như kinh nghiệm về Amazon Web Service và những dịch vụ mà phía AWS cung cấp. 
Topic sẽ là guildline để các bạn có thể sử dụng được những dịch vụ core mà phía AWS cung cấp. 
Các dịch vụ có thể kể đến như: 
- Identity and Access Management (IAM)
- Virtual Private Cloud (VPC)
- Elastic Cloud Compute (EC2)
- Storage Services (S3)
- Database Services (RDS)
- Simple Notification Service (SNS)
- Elastic Load Balancer (ELB)
- Auto Scaling
- Route 53
- Lambda

Topic sẽ cover một lượng kiến thức khá lớn. Vậy nên, với mỗi service nói trên mình sẽ có một bài viết riêng để đi từ khái quát đến chi tiết từng dịch vụ cũng như guildline sử dụng những dịch vụ này
Ở bài viết này, mình xin chia sẻ về dịch vụ đầu tiên của AWS, đó là Identity and Access Management (IAM).

## Identity and Access Management (IAM)
Khái niệm: IAM là nơi chúng ta quản lý AWS User và quyền truy cập của các user này tới các account AWS và các service của AWS.
Một số các task liên trong IAM có thể kể tới như: Creating accounts, Groups, Roles, và IAM Access Policies. 

Vậy chính xác hơn, IAM là gì?
Ví dụ: Root user có thể tạo các account cho team member và assign quyền access AWS service and feature. 
Và AWS đã quản lý cũng như phần quyền các account thế nào để đảm bảo được về Security khi lượng user nội bộ trong team sử dụng dịch vụ lớn dần theo thời gian. Bài viết sẽ trả lời cho chúng ta câu hỏi này

IAM Setting trên AWS:
![](https://images.viblo.asia/8950ace4-0d2c-4160-a2ad-6bf141c5d28c.png)


### Sơ lược về Root Account
Khi tạo AWS Account, thì Root account sẽ được khởi tạo một cách tự động
1. Khi user thao tác các bước cung cấp thông tin cá nhân, bao gồm là email address và thông tin billing của user thì phía AWS sẽ sử dụng những thông tin này để tạo ra Root Account ban đầu.
2. Root Account chính là account admin có quyền truy cập toàn bộ AWS Resource bao gồm Billings và các dịch vụ liên quan khác. Tức là, Root Account có quyền thao tác trên toàn bộ các dịch vụ AWS cung cấp nội bộ trong AWS Account
- Root User sẽ phải phân quyền các account tạo mới để các account này để họ có quyền truy cập một số tài nguyên nhất định trên AWS
- Khi login với user là Root Account, chúng ta có thể khởi tạo, cung cấp, chỉnh sửa cũng như xoá bất kì service nào hay config trong AWS Account. 

Sẽ có 5 task phía AWS recommend người dùng phải hoàn thành khi set up IAM. 5 task này nằm  trong một định nghĩa mang tên **AWS Best Practice**.
AWS Best Practice là gì?
Đây là guildline về các recommend settings, config hệ thống, kiến trúc maintance level security ở cấp độ cao, các quyền truy cập cũng như ảnh hưởng của settings này tới hệ thống.
Xuyên suốt các nội dung về AWS Settings Guildline thì khải niệm AWS Best Practice sẽ được nhắc đền nhiều lần để khuyến khích mọi người chú ý vào những phần settings mà phía AWS recommend cho chúng ta.

### AWS Best Practice cho IAM
![](https://images.viblo.asia/132ac133-47da-403d-9289-92c64e6666f5.png)

Trên Dashboard của IAM, 5 task chính của IAM nằm phía dưới Security Status
- Delete your root access key (Xoá key truy cập của root)
- Active MFA - Multiple Factor Authentication on your root account (Active xác thực bảo mật nhiều lớp cho Account Root  )
- Create individual IAM users (Tạo các user IAM cá nhân)
- Use groups to assign permissions (Dùng các group để assign phân quyền)
- Apply an IAM password policy (Apply chính sách cho IAM password)!!

### 1. Delete your root access key (Xoá key truy cập của root)

AWS suggest user xoá access keys của AWS Root account, bởi key này cung cấp quyền truy cập không hạn chế tới AWS Resource của bạn. 
Thay vào đó, nên sử dụng IAM user access keys hoặc những thông tin bảo mật tạm thời.
Khi AWS account được thiết lập, thì root user account cũng được tự động tạo ra. Và Root Account này không được tạo cùng với bất kỳ access key nào. 
Vậy nên, kết quả là chúng ta thực sự không cần xoá bất kỳ access key nào tại thời điểm này.

### 2. Active MFA - Multiple Factor Authentication on your root account (Active xác thực bảo mật nhiều lớp cho Account Root)

MFA - Multiple Factor Authentication là gì?	

- Dành cho những ai chưa hiểu rõ về MFA, MFA sẽ cung cấp thêm nhiều lớp bảo mật cho root account. Và lớp bảo mật này được cung cấp bởi bên thứ 3.
- MFA cung cấp lớp bảo mật thay đổi liên tục và ngẫu nhiên tổ hợp 6 digit code mà user cần input cùng với mật khẩu của account khi muốn login vào AWS.
Vậy user sẽ nhận được Authentication code bằng cách nào?

Cụ thể sẽ có 2 cách:
![](https://images.viblo.asia/44918159-4ccd-4a18-9396-89682a2851eb.png)

① Device MFA ảo:
- Sử dụng smartphone hoặc tablet
- Các app chung cả phía iOS và Android: Google Authenticator

② Hardware key fob (key phần cứng)
- Device vật lý cỡ nhỏ hiển thị keychain để đăng nhập vào AWS account.
- Order trực tiếp từ AWS.

MFA hoạt đông thế nào?
![](https://images.viblo.asia/aad9ed9c-7ca0-4677-86c5-2f5e9f9cfe77.png)

- Login bằng cách input Email và Password.
- MFA sẽ add thêm một step input code bảo mật
- Sau khi user input mã xác thực 2 lớp sẽ login thành công vào AWS

App xác thực bảo mật 2 lớp thường được sử dụng: Google Authenticator 
Lưu ý khi sử dụng Google Authenticator:
- User sẽ phải input code xác thực 2 lần
- Input lần lượt 2 mã được auto generate 2 lần liên tiếp từ App Google Authenticator
![](https://images.viblo.asia/218fd28e-5f1e-4f30-ad41-9346a4eb77c1.png)

### 3. Create individual IAM users (Tạo các user IAM cá nhân)
Các user này sẽ chỉ có các quyền nhất định được thiết lập bởi Root Account.
Lưu ý: Chỉ phân quyền IAM user ở mức tối thiếu cho các nghiệp vụ cần thiết.

Các step tạo IAM User:

**①　Trên Dashboard tạo IAM User, click Add user**
![](https://images.viblo.asia/6e2c6a56-cc95-4e17-ac3d-cef529521708.png)

**②　Khi tạo mới một user, sẽ có 2 AWS access type tương ứng:**

![](https://images.viblo.asia/da418826-bdb2-4f59-b549-b09db2bf9b3e.png)

**Programing access**: Dành cho các bất kì ai (chủ yếu là các developer) cần quyền truy cập tới AWS Resource sử dụng các câu lệnh hay các app mà họ phát triển

- Họ sẽ được cung cấp một access key và một secret access key. Cả hai đều được mã hoá cho mục đích bảo mật. Và key này sẽ cho phép user access AWS Resource mà không cần dùng password một cách thủ công.
- Đây là một hình thức bảo mật cao cho admin hay developer dành được quyền access mà không cần login vào AWS Management Console. 
- Trong trường hợp này chúng ta sẽ sử dụng Terminal trên Mac hay đối với Windows sẽ sử dụng app Putty để access tới AWS Resource theo hướng lập trình. 
- Programing access sẽ là type nâng cao hơn và chúng ta sẽ đề cập tới type này ở những phần sau của chủ đề AWS Essentials.

**AWS Management Console Access**: Cho phép user login vào AWS Management Console Access để truy cập tới AWS Resource 

**③　Set permission**

![](https://images.viblo.asia/9422eb32-ba61-4eb8-973b-891a32897416.png)

**④　Review thông tin**

![](https://images.viblo.asia/4b17ee20-794c-450f-b948-4b94c6fb8d4c.png)

**⑤　Create success**

Sau khi tạo IAM User thành công, IAM user này sẽ login bằng cách sử dụng link dưới đây:

![](https://images.viblo.asia/3128afdb-5543-4bd5-992d-784173cd6ed2.png)

Lưu ý: IAM user sẽ không sử dụng link login của Root user mà sử dụng link được cung cấp sau khi khởi tạo IAM user thành công. Đây là 2 link hoàn toàn tách biệt。

### 4. Use groups to assign permissions (Dùng các group để assign phân quyền)
- Sau khi đã tạo các IAM user thành công, chúng ta sẽ tiếp tục tạo ra các group tương ứng và phân quyền cho từng group này.
- IAM Group sẽ tập hợp các IAM user với phân quyền tương ứng.
- Group cho phép quản lý phân quyền cho nhiều user tương ứng tại cùng một thời điểm.

Groups là chức năng quản lý phân quyền hiệu quả và linh hoạt hơn.

VD: User A thay đổi vị trí làm việc trong công ty. Chúng ta có thể dễ dàng remove A ra khỏi Group hiện tại và add A vào một Group mới tương ứng. 

Các bước tạo group:

**①　Tạo Group Name**

![](https://images.viblo.asia/4217c782-6d45-4702-989a-d92e96a6ed36.png)

**②　Set policy cho Group**

![](https://images.viblo.asia/f4474f3c-66c5-4231-8de1-6785add52e5f.png)

**③　Review**

![](https://images.viblo.asia/f5d9d939-0bc2-4ea8-a0a3-34e0fdc33f56.png)

**④　Create done**

![](https://images.viblo.asia/a666ef96-b8f4-427a-b4e0-9c2ffa75ac19.png)

### 5. Apply an IAM password policy (Apply chính sách cho IAM password)
Bước cuối cùng: Setting password policy cho IAM User khi setting lại Password
![](https://images.viblo.asia/33f6066e-db96-4e4f-bdd3-1079af4c00ed.png)

Password Policy có thể bao gồm các mục như:
![](https://images.viblo.asia/281b5fa2-81ad-413f-a059-67c73ad63e5e.png)

- Số kí tự tối thiểu.
- Kí tự hoa, thường, kí tự đặc biệt.
- Setting update password trong khoảng thời gian nhất định.
- Không cho phép user tái sử dụng password cũ.
Các rule này sẽ được áp dụng khi tạo ra các IAM user mới. 
Và khi hoàn thành bước setting Password policy này, chúng ta đã hoàn thành tất cả các step cần thiết để setting IAM cho AWS Account.

Vậy là chúng ta đã hoàn thành xong các bước setting cho Identity and Access Management (IAM) trên AWS. Mình sẽ đề cập tới Virtual Private Cloud (VPC) ở bài viết kế tiếp. Rất mong được đồng hành cùng mọi người.