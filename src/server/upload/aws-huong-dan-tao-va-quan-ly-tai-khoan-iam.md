![](https://images.viblo.asia/a05a345a-0e30-41b2-8403-9e67dc42d69b.png)
### Tài khoản IAM là gì?
IAM (Identity and Access Management) là dịch vụ web giúp bạn kiểm soát truy cập tới tài nguyên AWS. Khi đó, chỉ có những tài khoản IAM mà bạn cho phép mới có thể truy cập hoặc có quyền sử dụng tài nguyên mà bạn chỉ định.

Mặc định khi đăng ký AWS, tài khoản của bạn là tài khoản root, tài khoản có quyền cao nhất với tất cả tài nguyên trong hệ thống AWS. Vì vậy, nếu bạn không có nhu cầu sử dụng tất cả các dịch vụ của AWS thì các bạn nên đăng ký tài khoản IAM để giới hạn quyền truy cập tới tài nguyên cần thiết.

### Các lợi ích của IAM
* Chia sẻ quyền truy cập tới tài khoản của bạn cho ứng dụng và user khác
* Chỉ định quyền truy cập của tài khoản IAM trên từng tài nguyên nhất định.
* Multi-factor authentication (MFA): Hỗ trợ xác thực 2 bước.
* Bạn có thể sử dụng dịch vụ IAM mà không phải trả bất kỳ chi phí nào để duy trì tài khoản IAM.
### Quản lý truy cập
* Login vào tài khoản root mà bạn đăng ký AWS.
* Tìm đến service IAM
![](https://images.viblo.asia/bbabad9d-6844-401d-b91b-6479d4ca5ab9.png)

1. **Multi-factor authentication (MFA): Xác thực 2 bước:**
* Chọn "Activate MFA on your root account" và click "Manage MFA"
![](https://images.viblo.asia/e0387975-470d-447c-97da-1cf1ab74ab28.png)
* Bạn có thẻ chọn thiết bị active xác thực, như hình mình chọn thiết bị ảo:
![](https://images.viblo.asia/1c388ebf-e5e4-4140-86ae-9a4e13ec006e.png)
* Tiếp theo lên appstore để tải `Google Authenticator` quét mã code của AWS theo đường link cho IOS: https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8
* ![](https://images.viblo.asia/4a73793a-7a72-4f5b-92df-95a50646f513.png)
Sau khi scan xong sẽ được 2 mã code, bạn nhập vào rồi ấn "Active virtual MFA" để xác nhận.
2. **Create individual IAM users: Tạo người dùng IAM cá nhân**
* Chọn Add User, của mình đang có một user đã được tạo là HienNV:
![](https://images.viblo.asia/10215583-3c44-42f3-b134-70717e03cc9d.png)
* Ở Step1 yêu cầu nhập:
 - Username: DemoUser
  Bạn có thể add đồng thời nhiều user
 - Chọn Access type, ở đây có 2 type: 
  Programmatic access: Sẽ generate ra Access key ID và secret key cho phép User truy cập đến AWS thông qua các development tools.
  AWS management console access: Cho phép truy cập giao diện AWS console để quản lý (tương tự root account).
  Bạn có thể chọn cả 2 type để tăng power cho user :D
  => Click next để sang Step 2.
* Ở Step 2:
Mỗi user phải có ít nhất 1 policy truy cập, nghĩa là nó phải thuộc 1 group. Bạn có thể tạo group và add các quyền truy cập cho group đó như hình. 
![](https://images.viblo.asia/2383f1ec-ff00-44fc-b7b1-c7c028cdc1a4.png)
Do mình đã có group tên IAMSecureAdmins rồi nên chỉ add user vào group này là xong.
![](https://images.viblo.asia/c8fa7756-74e3-49a5-a2bd-e6bb16aac82e.png)
Xong ấn next để sang màn confirm:
* step 3, confirm:
![](https://images.viblo.asia/a6c127b5-d7fd-4af5-8dd9-ade8c8505b29.png)
Ở đây bạn có thể review lại các thông tin đã nhập các bước trước như: username, access type...
* step 4: bạn có thể xem **Secret access key** và **Access key ID** của user. Cặp key-ID này cần thiết để bạn sử dụng qua các development tool sau này.
=> Vậy là tạo user xong với 2 user đều trong group IAMSecureAdmins
![](https://images.viblo.asia/ae3a0189-fc21-4957-83d8-3a58207cd97e.png)

3. **Use groups to assign permissions**
 Bước này tạo group và add quyền cho group đó, tất cả các user được add vào group sẽ có quyền mà group có(mình đã nói qua ở bước 2)
*  Tạo group:
   ![](https://images.viblo.asia/1d6640d8-7d45-4824-9a76-fe919f59031f.png)
* Nhập tên group và click Next Step:
![](https://images.viblo.asia/0cd201ce-8ea3-433f-affd-ebad122cccdb.png)
* Chọn quyền cho group:
 Có rất nhiều quyền,
 VD: EC2FullAccess: Full quyền trên các instance, EC2ReadOnly, S3FullAccess, S3ReadOnly....
 ![](https://images.viblo.asia/afeb9011-910e-4410-8e91-120e398362c7.png)
 Mình chọn full quyền EC2Access cho group mới tạo.
* Click next để đến màn review:
 ![](https://images.viblo.asia/f52fdea7-5135-4129-aaee-2f1c2ec53261.png)
 
4. **Apply an IAM password policy: tạo quy ước mật khẩu của user**
![](https://images.viblo.asia/ea5b5e3d-9d80-4e9a-971a-cc53a5b19a97.png)
Có nhiều policy cho mật khẩu, bạn có thể tùy chọn, VD:
- Minimum password length: số lượng ký tự ít nhất của password.
- Require at least one uppercase letter: Có ít nhất 1 ký tự viết hoa.
- Require at least one lowercase letter: Có ít nhất 1 ký tự viết thường.
- Require at least one number: Có ít nhất 1 chữ số.
- Allow users to change their own password: Cho phép user đổi password.
......
![](https://images.viblo.asia/7f8c1e5d-6ccd-4adb-97f6-f4c81cc175c7.png)

Bài tiếp theo mình sẽ giới thiệu về EC2, các bạn theo dõi nhé.
Nguồn: [https://linuxacademy.com/cp/modules/view/id/180](https://linuxacademy.com/cp/modules/view/id/180)