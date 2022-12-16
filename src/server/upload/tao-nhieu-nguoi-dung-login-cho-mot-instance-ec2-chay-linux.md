# Cách tạo nhiều người dùng login cho một Instance EC2 chạy Linux

## Lời nói đầu
Hiện nay mình làm việc với nhiều công cty, mình để ý là mỗi khi ai đó cần access vào VPS, bất kể đó là server test hay server production. Mọi người đều không ngần ngại giao luôn file key (.pem hoặc .ppk) cho người đó. Cách làm này dĩ nhiên có lợi điểm là nhanh gọn, và chỉ có như vậy thôi. Nhưng về mặt security thì phương pháp này rất không được recommend. Khi tất cả mọi user đều sử dụng chung một tài khoản với quyền root, lỡ có chuyện gì đó xảy ra (mà mình dự khả năng cao là sẽ xảy ra), việc truy tìm thủ phạm để blame là gần như không thể, hơn nữa chỉ cần một trong những người dùng của bạn táy máy hay lỡ tay là server production của công ty có thể ra đi.  

Vậy nên hôm nay mình sẽ hướng dẫn các bạn cách tạo nhiều user login cho 1 instance ec2. Đây là phương pháp share quyền sử dụng Linux Instance cho nhiều người dùng bảo mật hơn nhiều so với việc chia sẻ file key cho nhau.

Mỗi Linux Instance có một hệ thống user account mặc định. Với Amazon Linux, user name là `ec2-user`. Đối với RHEL (Red Hat Enterprise Linux based) và SUSE user name là `ec2-user` hoặc là `root`. Với Centos, user name là `centos`, với Fedora là `ec2-user`

## Prerequisites.
-  Một ec2 instance đã tạo chạy Linux.
-  Key để login vào instace đã tạo ở trên
-  Một chương trình Terminal.

## Thêm mới một user
1. Sử dụng lệnh `addusser` như dưới đây để thêm mới một user account vào instance. Câu lệnh này đồng thời cũng tạo luôn group cùng tên và thư mục home cho user đó.
`sudo adduser newuser`

[Ubuntu] Khi thêm mới user cho một hệ thống chạy Ubuntu, thêm tùy chọn `--disabled-password`  để tránh việc thêm password cho tài khoản được tạo.
`sudo adduser newuser --disabled-password`

2. Switch sang account vừa tạo.
`sudo su - newuser`

Và chắc chắn là bạn đã ở thư mục home của `newuser` đó bằng lệnh `pwd`.
3. Tạo thư mục `.ssh`  trong thư mục home  của `newuser` . Và set permission cho thư mục đó là 700. Nghĩa là chỉ owner của thư mục mới có quyền đọc, sửa và mở thư mục này.
`mkdir .ssh`
`chmod 700 .ssh`
4. Tạo file authorized_keys ở trong thư mục .ssh và sửa permission của file này thành 600.
5. Mở và copy nội dung file public key trên máy tính của bạn (chứ không phải ec2 instance) và paste vào file authorized_keys vừa tạo ở trên. Thường thì file này tên là `id_rsa.pub`

## Truy cập vào instance bằng account đã tạo.
Từ bây giờ bạn đã có thể truy cập vào ec2 instance của bạn bằng ssh mà không cần dùng đến file key rồi. Và nhớ rằng user name bạn dùng để login không phải là ec2-user hay root nữa mà là username bạn vừa tạo.
`ssh newuser@xxx.xxx.xxx`

## Xóa user khỏi hệ thống
Để xóa user đã tạo khỏi hệ thống bạn dùng lệnh `userdel`
`sudo userdel -r olduser`
Sau khi xóa thì người dùng này sẽ không login được vào hệ thống nữa.
## Cảm ơn
Cảm ơn các bạn đã theo dõi bài viết. Hy vọng bài viết này đã giúp bạn được phần nhỏ nào đó trong việc cải thiện bảo mật hệ thống Server của mình.