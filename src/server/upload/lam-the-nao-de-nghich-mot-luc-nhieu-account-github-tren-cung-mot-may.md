Bạn là một dev thích vọc vạch, ngồi nghịch các open source và build ra các source tự chế linh tinh nhưng trong 8h hành chính bạn lại là một người cực kỳ nghiêm túc và tài khoản github sạch bách chỉ tồn tại các dự án của công ty. việc đơn giản để giải quyết vấn đề này là dùng nhiều account github thôi! Nhưng làm thế nào để quản lý nhiều account trong cùng một máy tính được nhỉ (pull/push) code từng account khác nhau? bài này sẽ giúp bạn!
### Bước 1: Tạo một SSH key mới
Bạn có bao nhiêu tài khoản github thì bạn cần tạo ra bấy nhiêu SSH key để check permission cho từng account (hiển nhiên là vậy rồi). dưới đây là lệnh tạo một SSH key với `<YOUR@EMAIL.com>` là email của từng account github:
>`ssh-keygen -t rsa -C <YOUR@EMAIL.com>`

*Lưu ý khi tạo cần tạo ra các file khác nhau, tránh ghi đè các file của tài khoản tạo trước mà lại mất công tạo lại nhé! khi có màn hình tạo file key thì bạn nhớ lưu với tên khác nhau, gợi nhớ thì càng tốt, ví dụ như mình thì sẽ đặt là **id_rsa_COMPANY** || **id_rsa_PERSONAL***

### Bước 2: Thêm key mới vào các account github
Sau khi thực hiện xong bước trên có các account github bạn cần add key đó cho từng account github cho khớp. Để thực hiện việc add key này bạn xem ngay dưới đây:
- Lấy nội dung file public key: 
>     `cat ~/.ssh/id_rsa.pub`
Copy toàn bộ nội dung được xuất ra, sau đó truy cập đường dẫn [setting keys](https://github.com/settings/keys) của account github tương ứng với public key trên, chọn **New SSH key**. Bạn điền tên key mà bạn muấn lưu theo mẫu sau chú ý đặt tên gợi nhớ vào nhé! sau đó paste cái key bạn vừa copy vào trưởng key, rồi chọn **Add SSH key**

![](https://images.viblo.asia/30bfcabd-7650-4be9-acad-e2aaaee3b74a.png)

Bước add key đã xong, hãy làm tương tự cho các tài khoản còn lại nhé!
### Bước 3: Tạo config file
Cơ bản đã xong, giờ chúng ta cần setup cho việc nhận biết account nào push/pull với github. Chúng ta tạo thêm một file config trong ~/.ssh
> ```
> touch ~/.ssh/config
> subl config
> ```
bạn có thể mở bằng bất kỳ editor nào cũng được, sau đó paste đoạn này vào nhé
```
#Default GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```
Đây là setting mặc định cho việc push từ accout github cá nhân của bạn. Bạn nào dùng ssh key nhiều thì chắc chắn dùng cái này nhiều rồi! chú ý có **IdentityFile** để đường dẫn đến file ssh key đó nhé! tuỳ vào account mà bạn đã render ra file **id_rsa** riêng ở các bước trên đó. Giờ tiếp đến là thêm cho các account còn lại dựa vào mẫu trên:
```
Host github-COMPANY
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_COMPANY
```
với các tài khoản khác nhau, hãy dùng với tên Host khác nhau để phân biệt nhé như mình dùng ở trên là **github-COMPANY** và hãy chắc chắn rằng **IdentityFile** phải đúng đường dẫn tương ứng với các account nhé!
### Bước 4: Test
Ok giờ đã xong rồi! bạn hay thử kiểm tra xem chúng hoạt động không nào. Việc check đơn giản bạn chỉ cần mở terminal rồi check như check ssh bình thường thôi với Host tương ứng với tên Host trong file config đã đặt ở trên.
```
ssh -T git@<Host>
```
nếu kết quả ra tương ứng với account của bạn đã thiết lập với tên Host thì chúc mừng bạn! đã xong rồi nhé! còn không hay xem lại bước 2 và bước 3 xem đã đúng chưa nhé!
### Bước 5: Push/Pull code theo từng account
sau khi thiết lập thành công thì bạn cần làm bước sau để có thể push/pull đúng account.
với link github remote ban đầu:
```
git@github.com:<user>/<repo>.git
```
bạn thay phần Host bằng host tương ứng với tất cả các remote của repo tương ứng với các account github chỉ định sử dụng. Kết quả là ta sẽ được như sau
```
git@github-COMPANY:<user>/<repo>.git
```
hoặc
```
git@github-PERSONAL:<user>/<repo>.git
```

Tóm lại việc sử dụng nhiều account với các mục đích học tập và làm việc là điều cần thiết, tránh sai sót hoặc để lộ hàng. bạn nên thiết lập riêng nhé!