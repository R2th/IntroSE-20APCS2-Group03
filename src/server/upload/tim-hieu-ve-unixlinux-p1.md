Hồi mới học lập trình, ngay từ đâu đã có định hướng theo Backend nên được ông anh bảo: "Mày cài Ubuntu đi, tập làm quen dần". Thế là cũng le te cài Ubuntu vào dùng. Ban đầu thì cũng hơi lạ, mà tầm 1 tuần thì cũng quen. Nhưng tới tận bây giờ, để nói về tầm hiểu biết về Ubuntu thì nó cũng ngang ngửa khả năng hiểu tâm lý phụ nữ của mình vậy. Do đó, đợt này quyết định bỏ chút thời gian đi tìm hiểu thêm.

![](https://images.viblo.asia/27c65156-bd7c-43d5-be5a-5ad4e7a20a68.png)

# Lịch sử hình thành
Trước khi đi vào những kiến thức chuyên môn, chúng ta tìm hiểu qua lịch sử chút nhỉ, ông cha ta đã dạy: "Uống nước phải nhớ lấy nguồn mà".

Năm 1965, viện công nghệ MIT (Massachusetts Institute of Technology) và Phòng thí nghiệm Bell của hãng AT&T  xây dựng một hệ điều hành có tên gọi là Multics (MULTiplexed Information and Computing Service)

Năm 1969, Ken Thompson, một chuyên viên tại phòng thí nghiệm Bell, cùng Dennis Ritchie viết lại hệ điều hành đa-bài toán trên máy PDP-7 với tên là UNICS (UNiplexed Information and Computing Service) 

Năm 1973, Ritchie và Thompson viết lại nhân của hệ điều hành UNIX trên ngôn ngữ C, và hệ điều hành đã trở nên dễ dàng cài đặt tới các loại máy tính khác nhau; tính chất như thế được gọi là tính khả chuyển (portable) của UNIX.

Linus Torvalds đưa ra nhân (Kernel) cho hệ điều hành Linux vào tháng 8 năm 1991 trên cơ sở cải tiến một phiên bản UNIX có tên Minix. Kết hợp với các thành phần trong hệ thống GNU, hệ điều hành Linux đã được hình thành. 

Thuật ngữ ***Linux*** được sử dụng để chỉ nhân Linux, nhưng mặt khác, tên này cũng được sử dụng một cách rộng rãi để miêu tả một hệ điều hành giống Unix (còn được biết tới là GNU/Linux) được tạo ra bởi việc đóng gói nhân Linux cùng cới các thư viện và công cụ GNU (Ubuntu, Debian, Linux mint, CentOs,...) Bạn cũng có thể tạo ra một hệ điều hành của chính mình từ nhân Linux đều bạn đủ kiến thức và khả năng. Đây là trang giúp bạn có thể tải nhân Linux về https://www.kernel.org/

# Cài đặt Ubuntu

Do mình mới chỉ dùng Ubuntu nên ở đây mình sẽ chỉ nói tới Ubuntu. Đây là hệ điều hành mã nguồn mở và miễn phí, rất phù hợp dùng cho doanh nghiệp để tránh những kiện cáo về bản quyền không cần thiết. Bạn có thể truy cập đường link này để download file cài đặt: https://ubuntu.com/download/desktop. Hoặc bạn có thể cài thông quá USB (đợt trước mình làm cách này, vác con lap qua chỗ ông anh cài ngay ngoài đường, mất 5p là xong). Hiện tại thì mình đang dùng Ubuntu 18.04. Mình khuyên các bạn không cần thiết cài bản mới nhất đâu, cứ dùng những bản đã release được một thời gian rồi cũng được. Vì như vậy nếu có gặp lỗi thì cũng sẽ dễ tìm hơn.

![](https://images.viblo.asia/e590653e-0b7f-4531-a303-347e08ae8feb.png)


# Hệ thống tệp tin
Hệ thống tệp tin của Linux được tổ chức theo một hệ thống phân bậc tương tự cấu trúc của một cây phân cấp. Bậc cao nhất là thư mục root - ký hiệu là '/'. Nhìn chung, đa phần hệ điều hành nằm ở hai thư mục là root và user (/usr).

![](https://images.viblo.asia/9f5f39a4-cb16-4852-814a-1f603742f12f.png)

### / - root
Nghe tới root chắc hẳn chúng ta cũng mường tượng ra được rồi. Đây chính là nơi bắt đầu của tất cả các file và thư mục. Chỉ có root user mới có quyền ghi trong thư mục này. Chú ý rằng /root là thư mục home của root user chứ không phải là /

### /bin - Chương trình của người dùng
Thực mục này chứa các chương trình thực thi. Các chương trình chung của Linux được sử dụng bởi tất cả người dùng được lưu ở đây (ls, cd, ping, ...)

### /sbin - Chương trình hệ thống
Giống như /bin, /sbin cũng chứa chương trình thực thi, nhưng chúng là những chương trình của admin, dành cho việc bảo trì hệ thống (reboot, fdisk, ...)

### /etc - Files cấu hình
Thư mục này chứa các files cấu hình, đồng thới còn có các shell script để khởi động hoặc tắt các chương trình khác.

### /dev - Files thiết bị
Các phân vùng ổ cứng, thiết bị ngoại vi hay bất cứ thiết bị gắn kèm vào hệ thống đều được lưu ở đây

### /tmp - Files tạm
Thư mục này chứa các files tạm thời được tạo bởi hệ thống và người dùng. Các files lưu ở trong đây sẽ bị xóa khi hệ thống khởi động lại

### / proc - Thông tin về các tiến trình
Thông tin về các tiến trình đang chạy sẽ được lưu ở đây dưới dạng một hệ thống files thư mục mô phỏng

### /var - Files về biến của chương trình
Thông tin về các biến của hệ thống được lưu trong thư mục này (ví dụ thông tin log /var/log)

### /usr - Chương trình của người dùng
Đây là nơi chứa các thư viện, files thực thi, tài liệu hướng dẫn và mã nguồn cho chương trình chạy ở level2 của hệ thống

### /home - Thư mục của người dùng
Thư mục này chứa tất các files cá nhân của người dùng. Ví dụ có 2 user là hoang và manh thì sẽ là /home/hoang và /home/manh

### boot - Các file khởi động
Tất cả các file yêu cầu khi khởi động sẽ được lưu ở đây

### /lib - Thư viện hệ thống
Chứa các thư viện hỗ trợ cho các files thực thi

### /opt - Các ứng dụng phụ tùy chọn
Viết tắt của optional, nó chứa các ứng dụng thêm vào từ các nhà cung cấp khác

### /mnt - Thư mục để mount
Đây là thư mục tạm để mount các files hệ thống

### /media - Các thiết bị gắn có thể gỡ bỏ
Thư mục tạm này chứa các thiết bị như cdrom,  floppy

### /srv - Dữ liệu các dịch vụ khác
Chứa các service của máy chủ cụ thể liên quan đến dữ liệu

# Quản lý files
Trong Unix/Linux có 3 kiểu file cơ bản

1. ***Ordinary File***: Là một file trên hệ thống mà lưu trữ dữ liệu, văn bản hoặc chỉ dẫn chương trình.
2. ***Special File***: Một số file sẽ đặc biệt hơn, nó sẽ được cung cấp quyền truy cập vào phần cứng như ổ cứng, CD-ROM,... 
3.  ***Directory***: Thư mục, nơi lưu trữ các  ***Ordinary File*** và ***Special File***

Để liệu kê các files các bạn có thể dụng lệnh
```
ls
```

Ở đây mình sẽ chi chuyển vào trong thư mục `Desktop/test`bằng lệnh `cd` và đây sẽ là kết quả

![](https://images.viblo.asia/9124152e-744e-4e9e-b2b0-729e3c6f978b.png)

Bạn cũng có thể xem những options khác của lệnh ls bằng cách chạy
```
ls --help
```

![](https://images.viblo.asia/a00aa4ce-7f3b-4c99-bc0a-88c18593526a.png)

Ví dụ mình sẽ chạy
```
ls -l
```

![](https://images.viblo.asia/5717f866-1cb9-43df-b3eb-63c78ffa9fcf.png)

Các bạn có thể thấy cột đầu tiên ở dòng đầu sẽ là chữ `d` còn 2 dòng tiếp theo sẽ là dấu gạch `-`, điều đó nghĩa là ở dòng đầu tiên đang là thư mục, còn 2 dòng tiếp theo sẽ là 2 file. Tiếp tới là quyền của thư mục hoặc file đó (cái này có lẽ mình sẽ giải thích ở phần sau). Cột thứ 2 biểu diễn lượng bộ nhớ của file hoặc thư mục. Cột 3 là user sở hữu. Cột 4 là nhóm sở hữu. Cột 5 là dung lượng bằng byte. Cột 6 là thời gian file được tạo hoặc update lần cuối. Và cuối cùng là tên

Ngoài ra mình sẽ liệt kê thêm vài lệnh thao tác với file và thư mục sau:

1. ***mkdir***: tạo thư mục mới. Ví dụ: mkdir test. Bạn có thể tạo nhiều thư mục bằng cách sau: mkdir test test1 test2 test3
2. ***touch***: Tạo file trống. Ví dụ: touch test.html. Bạn cũng có thể tạo nhiều file tương tự với cách mkdir
3. ***cd***: Di chuyển tới một thư mục. Ví dụ: cd /var/www/html
4. ***head***: Đọc 10 dòng đầu tiên của file
5. ***tail***: Đọc 10 dòng cuối cùng của file
6. ***cat***: Đọc từ đầu tới cuối file
7. ***tac***: Đọc file từ cuối lên đầu
8. ***cp***: Copy nội dung của file sang một file mới. Ví dụ: `cp index.html index1.html`. Bạn cũng có thể dùng cp để sao chép thư mục
9. ***mv***: Di chuyển một file tới một thư mục khác. Ví dụ: `mv /home/hoang/index.html /home/manh/backup`. Nếu bạn sử dụng kiểu `mv file1 file2` thì file1 sẽ được đổi tên thành file2

# Phân quyền

Phân quyền trong Linux được chia thành 3 nhóm:
 - ***User***: Quy định xem người sở hữu file có thể thao tác những gì trên đó
 - ***Group***: Quy định xem người sở hữu, thành viên của nhóm người sở hữu có thể thao tác gì với file đó
 - ***Other***: Quy định hành động mà tất cả các người dùng có thể thao tác với file

Phân quyền trong Linux chia thành 3 chế độ

   - ***Đọc***(r): Cho phép đọc nội dung của file. Đối với thư mục thì có thể truy cập vào xem thông tin và xem tên các files
   - ***Ghi***(w): Cho phép chỉnh sửa hoặc gỡ bỏ nội dung file. Đối với thư mục thì sẽ cho phép thêm hoặc xoá file
   - ***Thực thi***(x): Cho phép người dùng chạy file.

Lại quay lại chiếc ảnh này:

![](https://images.viblo.asia/5717f866-1cb9-43df-b3eb-63c78ffa9fcf.png)

Từ dấu gạch số 2 tới số 4 sẽ quy định quyền của user sở hữu file, thứ tự sẽ là đọc - ghi - thực thi (nếu là dấu gạch thì sẽ là không có quyền đó). Dấu gạch số 5 tới số 7 sẽ là quyền của nhóm user sở hữu. Còn lại là quyền của người dùng khác

### Thay đổi quyền
Để thay đổi quyền cho file hoặc thư mục, chúng ta dùng lệnh `chmod`. Có 2 cách để sử dụng `chmod`:

#### Chế độ tượng trưng

| Toán tử | Mô tả |
| -------- | -------- |
|   +   | Thêm quyền truy cập   |
|   -   | Gỡ bỏ quyền truy cập   |
|   =   | Thiết lập các quyền truy cập   |

Khi chạy `ls -l` mình có thông tin về 1 file như sau:
```
-rw-r--r-- 1 root                          root                      5513 Thg 1 21 14:33  test.txt
```

Giờ sẽ chạy:
```
sudo chmod o+w test.txt
```

Điều này nghĩa là mình sẽ thêm cho nhóm `Other` quyền đọc
```
-rw-r--rw- 1 root                          root                      5513 Thg 1 21 14:33  test.txt
```

Với nhóm user thì sẽ là `u` còn group sẽ là `g`
```
 sudo chmod g=wx test.txt 
```

```
-rw--wxrw- 1 root                          root                      5513 Thg 1 21 14:33  test.txt
```

Bạn cũng có thể kết hợp các lệnh lại
```
sudo chmod o-r,u+x,g-x test.txt
```

```
-rwx-w--w- 1 root                          root                      5513 Thg 1 21 14:33  test.txt
```

#### Phân quyền tuyệt đối
| Giá trị | Mô tả | Tham chiếu |
| -------- | -------- | -------- |
|0     | Không cấp bất kì quyền nào     | ---     |
|1    | Chỉ thực thi     | --x     |
|2     |Chỉ ghi     | -x-     |
|3     | Thực thi và ghi     | -wx     |
|4     | Chỉ đọc     | r--     |
|5    | Đọc và thực thi     | r-x     |
|6     | Đọc và ghi   | rw-     |
|7     | Đọc, ghi và thực thi    | rwx     |


Ví dụ:
```
sudo chmod 764 test.txt
```
```
-rwxrw-r-- 1 root                          root                      5513 Thg 1 21 14:33  test.txt
```

#### Thay đổi người sở hữu và nhóm

- ***chown***: Thay đổi người sở hữu
- ***chgrp***: Thay đổi nhóm sở hữu

Về cơ bản thì 2 lệnh đó sẽ dùng như sau
```
chmod user test.txt
```

```
chmod group test.txt
```