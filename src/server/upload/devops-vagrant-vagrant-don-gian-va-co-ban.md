# Xin chào các mọi người. Trong bài viết này mình sẽ hướng dẫn sử dụng cơ bản với Vagrant.
## I. Vagrant là gì?
Vagrant là một công cụ để xây dựng và quản lý môi trường máy ảo trong một quy trình làm việc duy nhất. Với quy trình làm việc dễ sử dụng và tập trung vào tự động hóa, Vagrant giảm thời gian thiết lập môi trường phát triển, tăng sản lượng tương đương và biến "công việc trên máy của tôi" trở thành di tích của quá khứ.

Bạn có thể hiểu Vagrant tạo ra một file cấu hình và triển khai máy ảo chỉ bằng vài dòng lệnh đơn giản thay vì việc bạn sẽ mở các ứng dụng như VMWare, Virtualbox, HyperV, ... thực hiện hàng loạt các thao tác tạo một máy ảo. Vagrant cũng giúp việc thay đổi tham số của máy ảo cũng thực hiện đơn giản hơn rất nhiều so với việc cấu hình thủ công.

Vagrant đóng vai trò hỗ trợ cho các ứng dụng: VMWare, Virtualbox, HyperV,... nên để sử dụng thì sẽ cần cài đặt các ứng dụng đó trước.
## II. Cài đặt Vagrant
### 2.1. Cài đặt trên Windows
Trên môi trường Windows tôi sẽ dùng Virtualbox và Git để chạy cùng Vagrant. Khi chạy máy ảo bằng Vagrant các máy ảo sẽ chạy nền cho nên bạn không cần mở Virtualbox mà máy ảo vẫn có thể hoạt động bình thường.

Bước 1: Truy cập trang chủ Vagrant là vagrantup.com/downloads và chọn phiên bản dành cho Windows để cài đặt.\
Bước 2: Tạo thư mục cho máy ảo\
Bước 3: Truy cập app.vagrantup.com/boxes/search chọn image muốn cài đặt.\
![image.png](https://images.viblo.asia/5ad0eab9-282d-4e75-acda-44ace36bda73.png)\
![image.png](https://images.viblo.asia/602e4918-f6fe-46a7-916a-cd64d20e1165.png)\
Bước 4: Vào thư mục đã tạo và chạy lệnh vagrant init generic/ubuntu2004 để tạo ra file Vargantfile\
![image.png](https://images.viblo.asia/65ba9159-0235-42ea-9706-d42c46ef92d4.png)\
![image.png](https://images.viblo.asia/008f30aa-74bc-4bb0-ab00-56a58eccaecf.png)\
Bước 5: Thay đổi cấu hình trong file Vargantfile\
![image.png](https://images.viblo.asia/b105c8b9-afd4-4522-8f65-f2b0bd94c898.png)\
Bước 6: Chạy máy ảo\
`vagrant up`

Các option network, provider, provision có thể để theo mặc định không cần cấu hình.

### 2.2. Cài đặt trên Ubuntu
Trên môi trường Ubuntu thực hiện cài đặt bằng lệnh\
`sudo apt-get install vagrant`\
`vagrant version`

## II. Lệnh cơ bản hay dùng
`vagrant [options] <command> [<args>]`
### Chạy máy ảo
`vagrant up`
### Shutdown máy ảo
`vagrant halt`
### Bay màu máy ảo
`vagrant destroy`
### Khởi động lại máy ảo và cập nhật cấu hình theo file Vagrantfile mới
`vagrant reload`
### Tạm ngưng máy ảo
`vagrant suspend `
### Tiếp tục máy ảo đưng ngưng
`vagrant resume`
### Kiểm tra trạng thái máy ảo trong folder hiện tại
`vagrant status`
### SSH vào máy ảo
`vagrant ssh`
### Kiểm tra tất cả các máy ảo đang chạy
`vagrant global-status`
### Quản lý snapshot
Tạo một bản snapshot\
`vagrant snapshot save level1`

Kiểm tra các bản snapshot\
`vagrant snapshot list`

Xóa bản snapshot\
`vagrant snapshot delete level1`

Nạp snapshot\
`vagrant snapshot restore level1`

### Kiểm tra phiên bản vagrant
`vagrant version`
### Hiển thị toàn bộ các lệnh hỗ trợ
`vagrant --help`

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***