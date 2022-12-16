Hello mọi người, **Hoàng** đây :heart_eyes::heart_eyes::heart_eyes:. Hôm nay chúng ta quay trở lại với 1 chủ đề mà không bao giờ hết hot. **AWS - amazon web services**.

Chúng ta sẽ cùng tìm hiểu service đầu tiên và cũng rất quan trọng mà bất kì ai dùng aws cần phải biết. Đó là **IAM**:sunglasses::sunglasses:

### **1. IAM là gì** :triumph::triumph:

- IAM (Identity and Access Management) là Service dùng để kiểm soát quyền truy cập, sử dụng tài nguyên trên AWS của các User/Group.

- Tất cả mọi User đều có thể sử dụng IAM mà không mất phí.



### **2. IAM có thể giải quyết được những vấn đề gì**:scream::scream:

- Bạn có 1 account AWS, bạn muốn tạo và chia sẻ quyền vào Console cho các thành viên khác trong nhóm. => IAM làm được.
- Bạn có 1 account AWS, bạn muốn phân chia user và các group (dev,sale), và cho phép mỗi group có quyền riêng => IAM làm được.
- Bạn có 1 account AWS, bạn muốn cho team có quyền sử dụng 1 vài service nhưng không cho vào Console. => IAM làm được.
- Sau khi cho team quyền sử dụng service, anh em nghịch lịch tinh quá, bạn muốn hạn chế 1 số khu vực, 1 số quyền đặc biệt (OnlyRead) => IAM làm được.
- Bạn đang dùng 1 instance (Ec2), bạn muốn tạo 1 bucket(S3) và chỉ cho phép 1 instance được access vào bucket đó => IAM làm được.

### **3. Những thuật ngữ chính trong IAM**:hushed::hushed:

![](https://images.viblo.asia/19f95608-e108-4c61-beff-c53f4cc1bfe0.jpg)


Đi kèm với việc giải quyết các vấn đề trên, chúng ta sẽ làm quen với các thuật ngữ sau.

> Bạn có 1 account AWS, bạn muốn tạo và chia sẻ quyền vào Console cho các thành viên khác trong nhóm
> Bạn có 1 account AWS, bạn muốn cho team có quyền sử dụng 1 vài service nhưng không cho vào Console.

- Users - Là tài khoản với sự uỷ nhiệm, được tạo và cấp quyền bời tài khoản Root. 
- Mỗi tài khoản User bao gồm username/password (dùng để login vào console) và 1 hoặc nhiều cặp access/secret key (dùng để sử dụng CLI,SDK...)
- Tuỳ theo đối tượng sử dụng, hãy cung cấp resource tương ứng, nếu không muốn cho vào console, thì chỉ đưa 1 cặp keypair là được.

> Bạn có 1 account AWS, bạn muốn phân chia user và các group (dev,sale), và cho phép mỗi group có quyền riêng

- Groups - Nhóm các users, ngoài ra, 1 user cũng có thể thuộc về nhiều groups. 
- Các user sẽ kế thừa quyền chung của nhóm.
- Nếu nhóm của bạn có cả sale và dev, mỗi người lại cần các quyền truy cập riêng thì hãy tạo 2 group Sale và Dev và sau đó bạn có thể cấp quyền cho từng nhóm
- Khi có dev mới(hoặc sale mới) vào nhóm, bạn chỉ cần cho user đó vào group tương ứng, 

> Sau khi cho team quyền sử dụng service, anh em nghịch lịch tinh quá, bạn muốn hạn chế 1 số khu vực, 1 số quyền đặc biệt (OnlyRead)

- Polocies - được đính kèm theo User/Group/Role trong IAM, chúng quy định những hành động nào được phép hoặc không được phép truy cập.
- Policies có cấu trúc JSON, nhìn qua thì phức tạp nhưng bạn chỉ cần đọc hiểu, cũng ko cần nhớ hết làm gì. Bởi vì IAM đã cung cấp giao diện người dùng để tạo policy.
- Vào phần tạo Policies, click click, chọn serivce mình muốn, rồi lại chọn quyền và phạm vi mình muốn. Sau vài lần tạo thất bại, bạn sẽ quen và có thể tạo 1 policy chuẩn.
- Sau khi tạo quyền, bạn có thể cấp cho User,Group hoặc Role (thậm chí cả 1 số service)

> Bạn đang dùng 1 instance (Ec2), bạn muốn tạo 1 bucket(S3) và chỉ cho phép 1 instance được access vào bucket đó

- Roles là 1 tập các quyền mà bạn có thể sử dụng để truy cập các tài nguyên AWS mà bạn cần. 
- Như có hướng dẫn ở trên, bạn tạo policy mình cần. Sau đó tạo Role và gắn policy tương ứng.
- Sau khi có role, bạn vào Ec2 Console, chọn instance tương ứng rồi click vào Attach/Replace IAM Role và chọn role tương ứng.
- Ngoài ra có 1 loại role khác, bạn có thể tạo role cho các user switch khi cần. Role này không có password hay access keys mà bạn có thể switch sang role sau khi đăng nhập bằng user của bạn. 
- Ta có thể hiểu role này  là một tài khoản tạm thời để giải quyết những công việc khác nhau với vai trò khác nhau.


> Bảo mật 2 lớp 

- MFA(Multi-factor Authentication) là 1 lớp bảo mật đặt trên username và password. Khi enable MFA, ngoài username và password, user khi đăng nhập sẽ phải điền authentication code nhận được từ MFA.
=> Sử dụng MFA để bảo vệ ngay cả khi bạn bị lộ username và password.


### **4. Examination tips (Học vẹt thi chứng chỉ)** :scream::scream::heart_eyes::heart_eyes:

- IAM là service global.
- Account đầu tiên được tạo sẽ mặc định là root account.
- User mới sẽ không có persmission gì.
- User mới sẽ được cung cấp Access key ID và Secret Access key để có thể access thông qua  API,CLI hoặc SDK.
- Bạn chỉ có thể thấy Secret Access key này duy nhất 1 lần, vậy nên hãy lưu lại.


_________

Hãy để lại comment nhé. Hãy cũng thảo luận nào.:metal::metal::metal::metal:

Qua đây ủng hộ mình nhé (bài gốc): 

:point_down::point_down::point_down::point_down::point_down::point_down:

https://hoangpn.com/p/aws-tip-doi-net-ve-iam