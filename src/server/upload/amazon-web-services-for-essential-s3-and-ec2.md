Chào các bạn, như bài lần trước mình có giới thiệu về 2 thành phần ban đầu trong AWS đó là IAM và VPC. Và trong bài viết này mình xin giới thiệu thêm cho các bạn về các thành phần sâu bên trong 1 VPC và là một trong những thành phần quan trọng nhất trong AWS đó là S3 và EC2. 
## Nhắc lại 1 chút về bài viết trước
Như bài hôm trước chúng ta có học về IAM và VPC, mình xin phép tóm gọn lại một chút để các bạn có thể nhớ lại được và chúng ta sẽ tiếp tục học tiếp trong bài học ngày hộm nay. 
1. IAM: Identify and Access Management - là nơi để giúp cho bạn quản lý toàn bộ việc truy cập hệ thống của mình, từ việc tạp user, cấp quyền truy cập cho user trong AWS đến việc cấp quyền truy cập giữa các phần của AWS. 
2. VPC: Virtual Private Cloud - bạn có thể hiểu nôm na thì đây như là một cái vỏ case máy tính, hay trang cá nhân của bạn trên Facebook, nơi giúp bạn có thể chứa các thành phần AWS để phục vụ cho nhu cầu của bạn, và chắc chắn là private với những VPC khác
Như vậy là chúng ta có 1 cách nhìn khá nhanh gọn về IAM và VPC, nếu các bạn còn cảm thấy khó hiểu, hay muốn tìm hiểu kĩ hơn thì có thể đọc lại bài viết trước của mình. Và không để các bạn chờ đợi lâu, chúng ta sẽ cùng đến với thành phần đầu tiên trong bài viết này đó là S3 (Simple Storage Service)
## S3 - Simple Storage Service
Nhắc đến AWS chúng ta không thể nhắc đến S3, và với S3 thì nó có rất nhiều định nghĩa, nhưng với mình thì mình xin rút ngắn lại nó đơn giản như sau: S3 đơn giản là một nơi để chứa, lưu trữ mọi loại dữ liệu mà bạn gửi lên và muốn lưu trữ nó, ở khắp mọi nơi, và mọi lúc với giới hạn gần như là không có.

### Buckets and Object
Chúng ta cùng nhau xem cấu trúc của nó qua hình sau:
![](https://images.viblo.asia/bcff449f-c76b-428a-b583-99779ec2e48b.PNG)

Bucket được hiểu đơn giản như là một ọbject để chứa toàn bộ dữ liệu của bạn, trong đó có nhiêu thứ khác như các folder, object, file v..v.. 

### Storage Classes
- Storage class dùng để biểu thị cho các "loại" Object trong S3. Chúng ta có 4 loại tất cả: 
1. Standard
2. Reduced Redundancy Storage (RRS)
3. Infrequent Access (S3-IA)
4. Glacier

- Với mỗi storage class chúng ta để có các attributes sau:
1. Storage cost: Giá tiền
2. Object availibility: là % trong 1 năm file của bạn lưu trữ trên S3 có thể access vào được. Với object 99,99% thì nghĩa là bạn có tỉ lệ 0.01% không thể access được file đó trong 1 năm hoặc là cứ 10.000 giờ bạn có thể bị 1 giờ không access vào được file
3. Object durability: là % trong khoảng 1 năm mà dữ liệu có thể bị mất với object durability ví dụ bạn có 10,000 file với durability là 99,99999999% thì bạn có thể hy vọng mất file đó sau 10 triệu năm 
4. Frequency of access: tần suất sử dụng của dữ liệu

Vậy thì Storage Class nào sẽ hợp với chúng ta: 
![](https://images.viblo.asia/48dd6358-b052-4a4d-ae16-fea071b47ab9.PNG)

* Với mỗi file được tạo ra thì chúng mặc định được set class là Standard. 
*  Nếu bạn muốn sử dụng loại file thường dùng để backup thì bạn có thể sử dụng Reduced Redundancy Storage RRS, vì không phải lúc nào bạn cũng sử dụng nó nên mức độ durability và availability của nó cũng không cần quá cao, do đó bạn có thể giảm bớt giá dành cho nó
*  Nếu bạn nó cũng file hay sử dụng luôn luôn access vào thì bạn nên sử dụng loại Standard vì nó có tỉ lên availibility cao.
*  Nếu bạn có những file hệ thống, ít khi bạn access vào nó nhưng nó phải luôn luôn có mặt trên hệ thống và không được mất thì bạn nên sử dụng loại S3-IA
* Và với loại cuối cùng Glacier, loại này khá đặc biệt và bạn không thể chọn nó trong settings mặc định được. Đó là những dạng dữ liệu dùng để lưu chữ và gần như không vào sử dụng. Ví dụ, các loại hồ sơ, bệnh án của bệnh nhân, gần như bạn sẽ không bao giờ vào nhưng nó vẫn luôn cần được lưu trữ, thì Glacier được dùng vào mục đích nó và giá của nó rẻ nhất
*  Nếu muốn sử dụng Glacier bạn cần phải sử dụng Life cycle (mình sẽ nhắc ở phần tới), và nó cần 1 đến 2 ngày để có thể hoạt động

### Life cycle
Objecty Life cycle là "set of rules that automate the migration of object's storage class", có thể hiểu là việc tự động thay đổ storage class dựa theo 1 rule có sẵn hoặc được bạn tạo ra.

Ví dụ: 
1. Bạn có một file làm việc và bạn cần access vào nó hằng ngày trong vòng 30 ngày tiếp theo
2. Sau 30 ngày, bạn chỉ cần access vào file đó 1 tuần 1 lần trong 60 ngày
3. Sau 90 ngày (tổng cộng) thì bạn gần như không access vào file đó nhưng bạn vẫn cần lưu trữ nó

Vậy solution như thế nào thì phù hợp? 

![](https://images.viblo.asia/f48a2a98-1f33-44a0-b0aa-1b15b55a3427.PNG)

### Permission
Cái này thì chắc các bạn khá quen thuộc rồi, tương tự như các trình lưu trữ khác như Google Drive, hay One Drive thì S3 sẽ cho phép bạn tạo các quyền cho người dùng như là view, access, cho từng buckets hay object nào đó

1. Permission có thể sử dụng ở bucket và object level
2. Ở Bucket level bạn có thể control
* List: Ai có thể nhìn thất bucket name
* Upload/Delete: Object Upload hoặc Delete
* View Permission
* Edit Permission
3. Ở Object level bạn có thể control
* Open hoặc Download
* View Permissions
* Edit Permissions

### Versioning
Cũng giống như Github hay các trình quản lý file thì bạn có thể thế việc lưu trữ Version, keep tracks và store toàn bộ old/new version của một object, do đó bạn có thể access và sử dụng version cũ theo ý bạn. Vừa nhằm mục đích lưu trữ và vừa có thể giúp bạn sử dụng đc chúng.

Đó là những phần quan trọng nhất trong S3 và những khái niệm cơ bản về chúng, khi đăng nhập vào AWS Console bạn vào S3, thì bạn sẽ thấy toàn bộ những phần mình nói ở trên rất trực quan và dễ sử dụng.

## EC2 - Elastic Compute Cloud

Có thể hiểu đơn giản là EC2 giống như một cái máy tính bình thường của bạn, nhưng khác 1 chút là nó trên cloud, bạn muốn sử dụng nó thì cần remote vào để sử dụng nó
Nếu như với một máy tính đơn giản chúng ta có những thành phần như sau:
![](https://images.viblo.asia/eabd7bf0-39e6-4985-992d-6ab5d580bdd8.png)

Còn trên AWS chắc hẳn các bạn đã nghe những định nghĩa này ít nhất vài lần trong dự án như AMI, EBS, Security Group
![](https://images.viblo.asia/5b3314f0-573d-4fb6-b282-db6e6e068479.png)

### AMIs - Amazon Machine Image

AMI là một "preconfigured package" bắt buộc phải có để chạy EC2 Instance, bao gồm hệ điều hành (OS), Software package và rất nhiều các settings quan trọng khác. 

Dưới đây là một hình miêu tả rõ hơn về AMI Component và tầm quan trọng của nó đối với EC2
![](https://images.viblo.asia/293c0458-71cc-4cd6-8c61-76285a046f55.PNG)

Nhìn thấy rõ là với Root Volume Template chúng ta có gì, OS, Application Software cần có để khởi tạo 1 EC2 Instance. Tiếp theo đó ta cần thêm Launch Permission, BDM v..v.. 
Từ AMI chúng ta có thể dựng đc các EC2 Instance, và không những tạo ra 1 mà còn có thể auto scale cho nó trở nên nhiều hơn để đáp ứng nhu cầu của người dùng tại từng thời điểm

![](https://images.viblo.asia/d03f0fff-d5fc-49b5-a633-bcf61e6d8fec.PNG)

Về AMI, chúng ta có 3 loại AMI có thể lựa chọn
1. Community AMIs: 
* Free to use
* Nó như là github khi mà mọi người sharing AMI của họ, và bạn có thể lựa chọn phù hợp với OS mà bạn muốn

2. AWS Marketplace AMIs
* Pay to use
* Package được tối ưu và sử dụng rất nhiều, ngoài ra sử dụng các phần mềm đều có bản quyền

3. AMI của riêng bạn
* Bạn có thể create AMI của riêng mình. 

### Instance Types

Hiểu nôm là Instance Types là CPU của instance. Và với tùy từng như cầu của bản thân thì bạn sẽ chọn cấu hình tương ứng với nhu cầu của bạn, đôi khi bạn cần CPU mạnh để chạy các hoạt động cần xử lý nhanh, hay những cấu hình thấp hơn nhưng đạt hiệu quả trong việc chạy lâu dài v..v.

Instance Types Component:
Nhìn vào hình dưới đây các bạn có thể thấy được 7 loại instance type và tùy theo nhu cầu chúng ta có thể lựa chọn
![](https://images.viblo.asia/ccebbe84-5f9d-4c7d-8cfd-a455f7c6e179.PNG)


### EBS Volume - Elastic Block Store
EBS là storage volume cho EC2 Instance - hiểu nôm na đó là ổ cứng của EC2

### Security Groups

Giống như NACLs trong bài viết trước thì Security Groups dùng để allow/deny traffic. Tuy nhiên, security groups được sử dụng ở instance level khác với Subnet level của NACL. 

### IP Addressing

Cung cấp cho EC2 Instance Public IP Address để bạn có thể truy cập vào và sử dụng chúng. Có 2 loại IP
1. Private IP Address: Bạn chỉ có thể sử dụng với các instance nằm trong cùng 1 VPC
2. Public IP Address: Bạn có thể kết nối ra Internet bên ngoài

### Tổng kết

![](https://images.viblo.asia/5a895d87-1d62-448c-86e8-10dc517acee7.PNG)

Với hình ảnh trên ta có thể thấy được các lớp của EC2 từ đầu vào là Internet cho đến lớp EC2.

Vậy là trong bài viết này mình đã giới thiệu cho các bạn về EC2 và S3, những định nghĩa tổng quát nhất của nó, và trong bài viết tới mình sẽ đưa cho bạn thêm 1 số thành phần còn lại của AWS như Database, SNS, CloudWatch, ELB, Auto Scaling v..v.. Hẹn gặp lại các bạn trong bài viết sắp tới của mình nhé. Mọi ý kiến phản hồi các bạn hãy để lại ở phần comment nhé. Xin cám ơn