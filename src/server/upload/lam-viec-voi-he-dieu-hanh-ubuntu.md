![](https://images.viblo.asia/ecf1022c-091c-43b5-bda1-4ca0dbc984d8.png)
# 1: Basic command

* “-r": recusive, xóa toàn bộ cac thư mục kể cả bên trong
* “-I”: xuất hiện thêm question hỏi trước khi xóa
* Bash script khởi động cùng hệ thống .
  
     ~/.bash_profile, ~/.bash_login, ~/.profile . 
  
     Tham số trong bash là $: nếu $0 tức là lấy cả tên luôn 
* Cài đặt package từ debian: sudo dpkg - I package_name.dpkg

**Quản lý package**
* Cài đặt package: sudo apt-get install package
* Remove package: sudo apt-get remove —purge package_name
* dpkg -l: hiển thị tất cả các package đã được cài đặt
* dpkg -l: grep <regex>: search cac thanh phần còn lại của package

# 2: User và group

Đây là 2 thành phần rất quan trọng để làm việc với dữ liệu cũng như các thông tin bảo mật trên hệ thống của bạn.

1. Cơ bản về User và Group

      **User**
      
* Là người truy cập tới hệ thống. User có 2 loại là super user và regular user
* Mỗi User trong ubuntu sẽ có một ID duy nhất gọi là UID. Thông thường UID được đặt như sau:
* 0: Superuser, là User có quyền cao nhất
* 1 - 99: Dành cho các User hệ thống (Các Linux distribution khác nhau có thể khác nhau)
* 100: Các user khác (Trong Ubuntu thì thường tính từ 1000)
   
   **Note**: định danh user bình thường bắt đầu từ 500
   
   **Group**
   
* Là tập hợp nhiều user lại.
* Mỗi user luôn là thành viên của một group.
* Khi tạo một user thì mặc định một group được tạo ra.
* Mỗi group còn có một định danh riêng gọi là GID.
* Định danh của group thường sử dụng giá trị bắt đầu từ 500.

  **Xem thông tin cơ bản của User và Group**
  
  
*  cat /etc/passwd: xem các user trên máy tính.
* /etc/passwd: Chứa thông tin Users (mỗi user sẽ nằm trong 1 group quyền)
* /etc/shadow: Chứa mật khẩu Users (nếu dùng chế độ shadow password)
* /etc/group: Chứa thông tin Groups (group quyền)
* whoami: kiểm tra user đang sử dụng
* su <name_user>: kiểm tra tài khoản đang đăng nhập
* sudo su hoặc sudo -i: chuyển đổi sang tài khoản root


2. Phân quyền User và Group

   **Phân quyền với User**

*  useradd <user_name>: Thêm 1 user
*  usermod -a -G <group_name> <user_name>: -a <=> append: thêm 1 user đồng thời add nó luôn vào group. 

  vd: useradd -g developers Tony, tạo user Tony add vào group developervd: useradd -g developers Tony, tạo user Tony add vào group developer
*  userdel -r <user_name>: xóa user và thư mục của user

   **Phần quyền với Group**
   
*  sudo groupadd <name_group>: tạo group
* sudo usermod -a -G [tên group] [tên user]  sudo usermod -a -G [tên group] [tên user]: Thêm User vào Group (cần logout và login lại thì mới có tác dụng)
* $ id [tên user]$ id [tên user]: Xem danh sách Group mà một User đã tham gia
* sudo deluser <user _name> group: xóa user
* deluser user group: vd: deluser test root <=> delete user test nằm trong group root
3. Phân quyền với thư mục, file

   Trong Linux, sẽ có 3 quyền cơ bản của một user/group  trên một file/folder bao gồm:
* r (read) – quyền đọc file/folder
* w (write) – quyền ghi/sửa nội dung file/folder
* x (execute) – quyền thực thi (truy cập) thư mục. Đối với thư mục thì bạn cần phải có quyền execute thì mới dùng lệnh cd để truy cập vào được 

   Ở đây để trực quan nhất bạn hay gõ đoạn lệnh này: cd ~ && ll . Đoạn lệnh này có ý nghĩa ra ngoài thư mục user của bạn và ll <=> xem thông tin các quyền được cấp phát cho file và thư mục mà bạn đang sở hữu. Giải thích 1 số tham số:
*  Phần chữ cái đầu tiên _ hoặc d: tương ứng với file hoặc directory
* Phần nối tiếp theo: 3 chữ cái tạo thành 3 cặp từ trái qua phải tương ứng với: owner - group - other (viết tắt: u - g - o ngoài ra có thêm a là all)
* 3 chữ cái cân quan tâm: r w e. <=> read, write, execute

## 3: Một số thành phần khác


Ở phần này mình chỉ giới thiệu qua một số giao thức cũng và tiến trình trên linux.

*    ssh: là giao thức truy cập máy tính từ xa. Bác nào làm server thì thôi đừng hỏi nhé 😄
- **scp- secure copy:** là 1 ứng dụng để copy file trên các máy chủ linux dự trên giao thức ssh khá là hữu ích. Thường thì bạn sẽ phải cài thêm gói này hoặc có sẵn trên 1 số hệ thống server. Dưới đây là cách để sử dụng scp download các tài nguyên từ máy chủ tới client và upload từ client tới máy chủ sử dụng scp

* **scp -I key.pem user@host:<path_file_server> <path_file_client>**: Download tập tin từ server về máy thật và authen qua key (Nếu authen qua password thì bạn ko cần nhập cờ -I và giá trị của nó)
* **scp -i key.pem <path_file_client> user@host:<path_folder_server>**: (Thay source /home/ubuntu bằng đường dẫn tương ứng của bạn)

=> để tránh file trùng bạn có thể thay đổi tư đường dẫn thành tên file chỉ định thay thế mới để scp download và đặt tên cho nó luôn.

Tài liệu tham khảo: 
https://askubuntu.com/questions/66718/how-to-manage-users-and-groups

http://www.linuxandubuntu.com/home/10-basic-linux-commands-that-every-linux-newbies-should-remember

https://linuxacademy.com/blog/linux/ssh-and-scp-howto-tips-tricks/