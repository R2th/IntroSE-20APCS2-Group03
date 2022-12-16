### **I. Giới thiệu**

Một trong những cách dễ nhất để tăng khả năng phản hồi của máy chủ của bạn và bảo vệ chống lại lỗi hết bộ nhớ trong các ứng dụng là thêm một bộ nhớ thay thế hay còn gọi là `Swap`. Trong hướng dẫn này, chúng tôi sẽ đề cập đến cách thêm `Swap` vào máy chủ Ubuntu 16.04.

### **II. Swap là gì?**

Swap là một khu vực trên ổ cứng đã được chỉ định là nơi hệ điều hành có thể lưu trữ tạm thời dữ liệu không thể giữ trong RAM. Về cơ bản, swap cung cấp cho bạn khả năng tăng lượng thông tin mà máy chủ của bạn có thể lưu giữ trong bộ nhớ làm việc của nó. Bộ nhớ Swap trên ổ cứng sẽ được sử dụng chủ yếu khi không còn đủ dung lượng trong RAM để chứa dữ liệu ứng dụng đang sử dụng.

Thông tin ghi vào disk sẽ chậm hơn đáng kể so với thông tin được lưu trong RAM, tuy nhiên hệ điều hành sẽ giữ dữ liệu ứng dụng đang chạy trong RAM và sử dụng swap cho dữ liệu cũ hơn. Nhìn chung, việc có swap space là dự phòng khi hệ thống của bạn bị cạn kiệt RAM có thể là một mạng lưới an toàn tốt chống lại các trường hợp tràn bộ nhớ trên các hệ thống có bộ nhớ không có SSD.

### **III. Cách thêm Swap**

#### 1. Kiểm tra bộ nhớ Swap hiện tại của hệ thống
Trước khi bắt đầu, chúng ta có thể kiểm tra xem hệ thống đã có sẵn swap space chưa. Có thể có nhiều swap file hoặc phân vùng swap, nhưng nói chung một file là đủ.
Chúng ta có thể xem hệ thống có bất kỳ swap được cấu hình nào không bằng cách gõ:
```
$ sudo swapon --show
```
Nếu bạn không nhận được bất kỳ output nào, điều này có nghĩa là hệ thống của bạn hiện không có swap space.
Bạn có thể xác minh lại bằng lệnh `free`:
```
$ free -m
```
![](https://images.viblo.asia/3bfcdf81-829c-4495-80dc-b5c5e65388f5.png)
Như bạn có thể thấy trong hàng output của Swap, không có swap nào được kích hoạt trên hệ thống.

#### 2. Kiểm tra dung lượng trống trên phân vùng ổ cứng
Cách phân bổ bộ nhớ cho swap phổ biến nhất là sử dụng một phân vùng riêng. Tuy nhiên, việc thay đổi lược đồ phân vùng không phải lúc nào cũng có thể. Chúng ta có thể dễ dàng tạo một swap file nằm trên một phân vùng hiện có.

Trước khi thực hiện việc này, chúng ta nên kiểm tra mức sử dụng bộ nhớ hiện tại bằng cách gõ:
```
$ df -h
```
![](https://images.viblo.asia/aecfbcf5-b510-4448-a493-c77d20aceecc.png)

Thiết bị dưới `/dev` là bộ nhớ của chúng ta trong trường hợp này. Chúng ta có nhiều không gian có sẵn,  trong ví dụ này chỉ sử dụng 1.1G. Cách sử dụng của bạn có thể sẽ khác nhau.

Mặc dù có nhiều ý kiến về kích thước phù hợp của swap space, nhưng nó thực sự phụ thuộc vào sở thích cá nhân và yêu cầu ứng dụng của bạn. Nói chung, một lượng bằng hoặc gấp đôi dung lượng RAM trên hệ thống của bạn là điểm khởi đầu tốt. Một nguyên tắc tốt khác là mọi thứ trên 4G có thể không cần thiết nếu bạn chỉ sử dụng nó làm RAM dự phòng.

#### 3. Tạo swap file
Bây giờ chúng ta đã biết dung lượng ổ cứng có sẵn, chúng ta có thể tạo một swapfile trong filesystem. Chúng ta sẽ tạo một swapfile trong thư mục gốc (/).

Cách tốt nhất để tạo một swapfile là dùng `fallocate` program. Lệnh này tạo một file preallocated ngay lập tức.

Vì máy chủ trong ví dụ của chúng ta có 512MB RAM, chúng ta sẽ tạo swapfile 1G trong hướng dẫn này. Điều chỉnh điều này để đáp ứng nhu cầu của máy chủ:
```
$ sudo fallocate -l 1G / swapfile
```
Chúng ta có thể xác minh lại dung lượng chính xác đã được tạo bằng cách nhập:
```
$ ls -lh /swapfile
```
```Output
$ -rw-r--r-- 1 root root 1.0G Apr 25 11:14 /swapfile
```
Swapfile của chúng ta đã được tạo với size chính xác.

#### 4. Kích hoạt swapfile

Bây giờ chúng ta có một tệp có kích thước chính xác có sẵn, chúng ta cần thực sự biến nó thành swap space.

Trước tiên, chúng ta cần khóa các quyền của tệp để chỉ những người dùng có quyền root mới có thể đọc nội dung. Điều này ngăn người dùng bình thường có thể truy cập file, điều này có ý nghĩa bảo mật quan trọng.

Làm cho swapfile chỉ có thể truy cập vào root bằng cách gõ:
```
$ sudo chmod 600 /swapfile
```
Xác minh thay đổi quyền bằng lệnh:
```
$ ls -lh /swapfile
```
```Output
$ -rw------- 1 root root 1.0G Apr 25 11:14 /swapfile
```
Như bạn có thể thấy, chỉ người dùng root mới có thể đọc và ghi.

Bây giờ chúng ta có thể chuyển swapfile thành swap space bằng lệnh:
```
$ sudo mkswap /swapfile
```
```Output
Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
no label, UUID=6e965805-2ab9-450f-aed6-577e74089dbf
```

Sau khi chuyển file, chúng ta có thể kích hoạt swapfile, cho phép hệ thống của chúng ta bắt đầu sử dụng file:
```
$ sudo swapon /swapfile
```

Chúng ta có thể xác minh rằng swap có sẵn bằng cách gõ:
```
$ sudo swapon --show
```
```Output
NAME      TYPE  SIZE USED PRIO
/swapfile file 1024M   0B   -1
```
Chúng ta có thể kiểm tra đầu ra của free một lần nữa:
```
$ free -m
```
![](https://images.viblo.asia/0810cb45-78a1-467a-b93c-7bd387c91869.png)

Swap của chúng ta đã được thiết lập thành công và hệ điều hành của chúng ta sẽ bắt đầu sử dụng nó khi cần thiết.

#### 5. Cách thiết lập Swap khởi động cùng hệ điều hành
Những thay đổi trên đã kích hoạt swap file cho phiên làm việc hiện tại. Tuy nhiên, nếu chúng ta khởi động lại, server sẽ không tự động giữ lại các cài đặt swap đó. Chúng ta có thể thay đổi điều này bằng cách thêm swap file vào file `/etc/fstab`.

Sao lưu file `/etc/fstab` phòng trường hợp có lỗi xảy ra:
```
$ sudo cp /etc/fstab /etc/fstab.bak
```
Bạn có thể thêm thông tin swap file vào cuối file `/etc/fstab` bằng cách nhập:
```
$ echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
Vậy là swap đã sẵn sàng để sử dụng kể cả khi khởi động lại server.

### **V. Kết luận**

Thực hiện theo các bước trong hướng dẫn này sẽ cung cấp cho bạn một giải pháp khi xảy ra tràn bộ nhớ RAM. Swap space có thể cực kỳ hữu ích trong việc tránh một số vấn đề phổ biến.

Nếu bạn đang gặp phải lỗi OOM (hết bộ nhớ) hoặc nếu bạn thấy rằng hệ thống của bạn không thể sử dụng các ứng dụng bạn cần, giải pháp tốt nhất là tối ưu hóa cấu hình ứng dụng hoặc nâng cấp máy chủ của bạn.

Trong bài sau tôi sẽ nói rõ hơn về cách tùy chỉnh hệ thống sử dụng Swap hiệu quả và một số tham số của swap. Hi vọng bài viết sẽ giúp ích cho bạn.
Tài liệu tham khảo: https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04