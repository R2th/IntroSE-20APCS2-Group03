***Xem thêm*** : [***Cài đặt và cấu hình môi trường lập trình PHP trên Ubuntu***](https://tailieu-bkhn.blogspot.com/2021/03/install-and-config-php.html)
# Gỡ cài đặt package bằng trung tâm phần mềm
Không phải ứng dụng nào cũng có thể gỡ cài đặt bằng trung tâm phần mềm. Thường thì các ứng dụng UI hoặc là các ứng dụng được cài từ trung tâm phần mềm mới có thể gỡ cài đặt từ trung tâm phần mềm. Để gỡ cài đặt các ứng dụng này các bạn mở trung tâm phần mềm Ubuntu ( ubuntu Software) lên, vào phân Installed, tìm tới ứng dụng muốn xóa và chọn Remove.

![](https://images.viblo.asia/1e11930b-82dc-4e5b-86fe-04ee486dd72f.png)

Nếu những ứng dụng nào bạn muốn xóa mà không tìm thấy ở đây thì hãy sử dụng dòng lệnh để gỡ cài đặt nó theo hướng dẫn dưới đây nha.

# Gỡ cài đặt package bằng terminal
Mọi thứ bạn có thể làm với các công cụ UI, bạn đều có thể làm bằng cửa sổ dòng lệnh và thậm chí dùng những cửa sổ dòng lệnh lúc nào cũng mạnh mẽ và được cung cấp nhiều chức năng hơn các công cụ UI.

Để mở cửa sô dòng lệnh có thể nhấn tổ hợp phím `Ctrl+Alt+T` hoặc ân vào biểu tượng thiết bị đầu cuối trong menu.

Để kiểm tra các package đã được cài đặt thông qua trinh quản lý gói apt thì sử dụng lệnh sau :
```
sudo apt list --installed
```
hoặc 
```
apt list
```
( nói chung thường thì nó sinh ra một đống cũng chả biết cái nào với cái nào đâu, nên nếu bạn muốn xóa phần mềm nào thì có thể kiểm tra giống mình bên dưới nha)

Ví dụ bạn muốn xóa cài đặt openjdk-11-jdk thì sử dụng lệnh sau :
```
sudo apt-get remove openj
```

sau đó ấn phím `Tab` liên tiếp mấy lần thì nó sẽ sinh ra gợi ý như sau :

![](https://images.viblo.asia/b24b960d-5d42-4391-beae-62caf98d8abe.png)

tất cả những phần mềm có tên bắt đầu là openj đều đã hiện ra và giờ bạn muốn gỡ cài đặt cái nào thì chỉ cần nhập đúng tên nó và enter ( Phím `Tab` khá là hữu dụng để gợi ý hoặc điền nốt phần còn thiếu nha).

Tuy nhiên, nếu xóa như vậy thì chúng ta sẽ không xóa hết được những gì đã cài đăt vào, thường thì những tập tin cấu hình hay một số file rác, package cài thêm sẽ vẫn còn. Để xóa hoàn toàn package vừa cài thì các bạn sử dụng lệnh sau : 
```
sudo apt-get --purge remove <ten_package>
```
Sau đó thì sử dụng lệnh sau để gỡ các package kèm theo mà không sử dụng : 
```
sudo apt-get autoremove
```
Nếu muốn gỡ cài đặt nhiều package cùng lúc thì chỉ cần nhập tên các package liên tiếp và cách nhau ở dấu cách : 
```
sudo apt-get remove <ten_package_1> <ten_package_2>
```

Tham khảo : [https://hocdevops.com/](https://hocdevops.com/)