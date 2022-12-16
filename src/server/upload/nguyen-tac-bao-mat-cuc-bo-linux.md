# 1 Tài khoản người dùng
![](https://images.viblo.asia/936635a2-b361-4553-96a1-cdc02dee22a8.png)
## 1.1 Các loại tài khoản
Mặc định, Linux phân biệt giữa một số loại tài khoản để cô lập các tiến trình và khối lượng công việc. Linux có 4 lại tài khoản khác nhau: 
1. root
2. System
3. Normal
4. Network
Số UID cụ thể và phạm vi số được sử dụng cho các mục đích cụ thể của Red Hat Enterprise Linux.
* UID 0 luôn được gắn cho tài khoản superuser, root.
* UID 1-200 là khoảng cho được gắn cho system user cho các tiến trình của hệ thống.
* UID 201-999 là khoảng người dùng hệ thống được sử dụng bởi các quy trình hệ thống không sở hữu file trên hệ thống file system. Chúng thường được gắn động trên nhóm có sẵn khi phần mêm cần chúng để cài đặt. Các chương trình chạy như những người dùng hệ thống không có đặc quyền để giời hạn quyền truy cập của họ vào nguồn tài nguyên họ cần để hoạt động.
* UID 1000+ là khoảng khả dụng cho người dùng thông thường.

## 1.2 Hiểu về tài khoản root
Root là tài khoản có đặc quyền cao nhất trong hệ thống Linux/UNIX.  Tài khoản này có khả năng thực hiện tất cả các khía cạnh trong quản trị hệ thống bao gồm thêm tài khoản, thay đổi user passwords, kiểm tra log files cài đặt phần mềm ... Phải hết sức cẩn thận khi sử dụng tài khoản này nó không giới hạn các biện pháp bảo mật áp đặt lên nó. 

### 1.2.1 Hoạt động yêu cầu đặc quyền root 

![](https://images.viblo.asia/a5535166-8363-4c34-bb6c-dcc9dcd9150a.png)

### 1.2.2 Hoạt động không yêu cầu đặc quyền root
![](https://images.viblo.asia/de1ded9e-1a12-4f04-b308-2a723f63c04b.png)

### 1.2.3 So sánh sudo and su
![](https://images.viblo.asia/276f24fc-6720-4043-b2a4-5d21c08c5f0e.png)

## 1.3 Quy trình cách ly
![](https://images.viblo.asia/6510e7a6-3ee0-4c05-8f81-6aa2352adb7d.png)

Linux đựơc xem xét an toàn hơn so với các hệ điều hành khác bởi vì quy trình được cách ly tự nhiên lẫn nhau. Một tiến trình thông thường không được truy cập vào tài nguyên của tiến trình khác, thậm chí khi tiến trình đang chạy có đặc quyền người dùng giống nhau. Linux vì vậy gây khó khăn cho viruses và khai thác bảo mật để tấn công các tài khoản ngẫu nhiên trong hệ thống.
Các cơ chế bảo mật được giới thiệu gần đây để tạo ra độ rủi ro thấp hơn đó là: 
* Control Groups (cgroups): Cho phép quản trị viên nhóm từng quy trình và liên kết các nguồn tài nguyên hữu hạn vào từng nhóm.
* Linux Containers (LXC): Làm cho nó có khả năng chạy nhiều hệ thống linux cô lấp (container) trên cùng một hệ thống dựa trên cgroups.
* Ảo hóa: Phần cứng được mô phỏng theo cách không chỉ có thể tách rời các quy trình mà toàn bộ hệ thống được chạy đồng thời dưới dạng khách cách ly và cách điện (máy ảo) trên một máy chủ vật lý.

## 1.4 Cách passwords được lưu trữ.
![](https://images.viblo.asia/3710c393-27c8-4d75-94fd-e0c20492296b.png)

Hệ thống xác minh tính xác thực và danh tính người dùng bằng thông tin đăng nhập. Ban đầu password được lưu trữ trong file /etx/passws có thể đọc được mọi người. Điều này dẫn đến passwords dễ dàng bị bẻ khoá, Trong hệ thống hiện đại, password thực sự được lưu trữ và mã hoá tại file thứ 2 đó là /etc/shadow. Chỉ quyền root mới có thể truy cập đọc và sửa file này.

###  1.4.1 Password Algorithm
Hầu hết bản phân phối linux đều dựa trên thuật toán mã hoá hiện đại được gọi là  SHA-512 (Secure Hashing Algorithm 512 bits), được phát triển bởi  National Security Agency NSA để mã hoá mật khẩu . Thuật toán SHA-512 được sử dụng rông rãi cho các ứng dụng và giao thức bảo mật. Các ứng dụng và các giao thức bào gồm TLS, SSL, PHP, SSH, S/MIME and IPSec. SHA-512 là một trong các thuật toán băm được thử nghiệm nhiều nhất.
Lab: 
1: add user --  useradd 
2: del user --  sudo userdel newuser