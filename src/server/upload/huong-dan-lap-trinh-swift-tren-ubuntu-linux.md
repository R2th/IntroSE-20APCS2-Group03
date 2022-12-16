> Với việc mã nguồn mở Swift, Apple đang từng bước đưa Swift trở thành một ngôn ngữ mạnh mẽ, phổ biến hơn bao giờ hết. Bài viết dưới đây sẽ hướng dẫn bạn cài đặt để lập trình Swift trên hệ điều hành Ubuntu Linux


# Tổng quan
# 
Như với bất kỳ công nghệ mới mới nổi hoặc ngôn ngữ nào, việc cập nhật thông tin và những update mới nhất luôn là điều quan trọng. Swift cũng vậy. Apple đã phát hành rất nhiều bản update và nâng cấp trong một thời gian ngắn kể từ khi Swift ra đời. Do vậy việc đầu tiên bạn cần chú ý đến đó là sự thay đổi của ngôn ngữ lập trình.

Việc Apple mã nguồn mở Swift không đồng nghĩa với việc bạn có thể viết ứng dụng bằng Swift ở bất kỳ nơi nào bạn muốn. Có một số hướng dẫn mà Apple đã đề xuất như nền tảng hỗ trợ, phiên bản của ngôn ngữ và công cụ bạn đang sử dụng. Tất cả những thông tin này có thể tìm thấy tại Swift.org. Bạn nên bookmark lại trang này và ghé thăm thường xuyên để cập nhật những thông tin mới nhất của Swift.

Như tôi đã nói thì chúng ta cần một nơi để bắt đầu, tại thời điểm viết bài hướng dẫn này, chúng ta đang sử dụng Swift 2.2 chạy trên nền tảng truyền thống của Apple cũng như Ubuntu Linux 15.10 và 14.04.


## Cài đặt
## 
Để kiểm nghiệm một cách chính xác nhất tính "mở" của Swift, bạn cần cài đặt một môi trường lập trình tương ứng với phiên bản Swift hiện tại. Nếu bạn đã có một thiết bị chạy đúng phiên bản Ubuntu Linux, thì bạn đã đi được một nửa đường rồi đó. Còn nếu không, hãy làm theo những bước sau:

Nếu bạn chưa có một hệ thống Linux, đừng lo. Chúng ta sẽ cùng nhau thiết lập một môi trường ảo đáp ứng được những yêu cầu của phiên bản  Swift hiện tại. Bạn có thể dùng bất kỳ hệ thống máy ảo nào bạn thích hoặc tương thích. Ở đây tôi sử dụng kết hợp VirtualBox và Vagrant. 

VirtualBox là phần mềm giả lập máy ảo cho phép bạn chạy những hệ điều hành khác(client) ở trên chính hệ điều hành bạn đang dùng hiện tại (host). Vagrant là phần mềm đi kèm theo cho phép bạn dễ dàng tùy chỉnh cấu hình hệ điều hành. Bạn có thể bỏ qua Vagrant nếu không muốn. Nhưng nếu dùng thì công đoạn sẽ tối ưu hơn nhiều.


### Bước 1: Cài đặt VirtualBox
Bước đầu tiên là download và cài đặt VirtualBox. Bạn có thể tải tại trang chủ của phần mềm, chọn phiên bản tương ứng với hệ điều hành của bạn như Windows hay OS X. Công đoạn cài đặt thì khá là đơn giản, bạn chỉ cần làm theo hướng dẫn dưới đây:

![](https://images.viblo.asia/d129df18-90d4-46d6-b5e2-65692a04418a.jpg)


### Bước 2: Cài đặt Vagrant

Bạn có thể bỏ qua bươớc này, nhưng như tôi đã nói thì cài đặt thêm Vagrant sẽ làm quá trình trở nên đơn giản hơn nhiều.

![](https://images.viblo.asia/03cb4b11-100f-4ef3-a75d-ff87920142d0.jpg)


Như vậy là chúng ta đã chuẩn bị đầy đủ công cụ rồi, đứng dậy vươn vai, uống một hớp nước rồi tiếp tục bước vào phần chính thôi

Cài đặt máy ảo

Bây giờ là lúc khởi tạo máy ảo Ubuntu Linux bằng Virtual Box và Vagrant. Ở đây bạn sẽ tháy được lợi ích của việc sử dụng Vagrant

Bước 1: Cấu hình Vagrant

Đầu tiên chúng ta tạo một folder tại máy host, tôi thường đặt nó tại desktop để tiện việc copy các file cần thiết. Bên trong folder, chúng ta tạo một file trống lấy tên là Vagrantfile. Việc đặt tên là rất quan trọng, Vagrant sẽ sử dụng file này để cấu hình.

Sau đó chúng ta thiết lập Vagrant theo các bước sau:

* Download và cài đặt Ubuntu Linux trên VirtualBox
* Cài đặt trình biên dịch Clang
* Download và cài đặt Swift
* Thêm Swift vào biến  PATH để sử dụng tại bất kỳ chỗ nào.

Đây là những gì mà bản hướng dẫn trong Swift.org bảo chúng ta làm. Nhưng thay vì làm những việc đó một cách thủ công, bạn có thể làm qua một đoạn mã Ruby đơn giản. Vậy đoạn mã Ruby này ở đâu?. Đó chính là file Vagrantfile, mặc dù Vagrantfile chứa Ruby, nhưng bạn không cần biết gì về nó cả. Mở Vagrantfile bằng text editor và thêm đoạn mã sau:

```
Vagrant.configure(2) do |config|
    config.vm.box = "http://cloud-images.ubuntu.com/vagrant/trusty/20151218/trusty-server-cloudimg-amd64-vagrant-disk1.box"
 
    config.vm.provision "shell", inline: <<-SHELL
        sudo apt-get —assume-yes install clang
 
        curl -O https://swift.org/builds/ubuntu1404/swift-2.2-SNAPSHOT-2015-12-22-a/swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04.tar.gz
 
        tar zxf swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04.tar.gz
 
        echo "export PATH=/home/vagrant/swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04/usr/bin:\"${PATH}\"" >> .profile
        echo "Ready to rock and roll"
    SHELL
end
```

Phương thức configure chuyền giá trị của 2 sẽ thông báo Vagrant rằng đoạn script trên sẽ sử dụng v2 configuration. Đây là phiên bản chính cuả Vagrant.

```
config.vm.box = "http://cloud-images.ubuntu.com/vagrant/trusty/20151218/trusty-server-cloudimg-amd64-vagrant-disk1.box"
```

Đoạn mã trên sẽ thiết lập nơi mà file disk image của Ubuntu Linux sẽ được tải về một cách tự động.


```
config.vm.provision "shell", inline: <<-SHELL
```

```
sudo apt-get —assume-yes install clang
```

Sử dụng trình cài đặt apt-get để tải và cài đặt trình biên dịch Clang

```
curl -O https://swift.org/builds/ubuntu1404/swift-2.2-SNAPSHOT-2015-12-22-a/swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04.tar.gz
```

Sau đó sử dụng curl để tải Swift về máy của bạn.

```
tar zxf swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04.tar.gz
```

Giải nén Swift.

```
echo "export PATH=/home/vagrant/swift-2.2-SNAPSHOT-2015-12-22-a-ubuntu14.04/usr/bin:\"${PATH}\"" >> .profile
```

Đặt điểm đến của bản Swift bạn vừa giải nén vào đường dẫn PATH để bạn có thể tham chiếu Swift từ mọi nơi.

```
vagrant up
```

Cuối cùng là chạy dòng lệnh trên, nhâm nhi thêm một ngụm nước nữa và theo dõi toàn bộ quá trình cài đặt đang được tiến hành tự động theo trình tự.

Bước 2: Kiểm tra

Bước cuối cùng của quá trình cài đặt là kiểm tra mọi thứ đã được cài đặt hoàn chỉnh, đầu tiên bạn cần kết nối tới máy ảo mới bằng cách chạy dòng lệnh sau:

```
vagrant ssh
```

Command promt sẽ chuyển đổi từ command promt của máy host thành một ssh session để hiển thị command prompt của máy ảo. Từ đây, bạn có thể kiểm tra phiên bản Swift bằng dòng lệnh: 

```
swift --version
```

Nếu mọi thứ hoạt động ổn, bạn sẽ nhìn thấy output sau:

```
Swift version 2.2-dev (LLVM *, CLANG *, Swift *)
```

## Vọc Swift thôi
## 
Giờ thì bạn đã thiết lập được một môi trường mà có thể chạy được đoạn mã Swift, hãy thử xem. Có rất nhiều thứ để vọc vạch như, chạy mã Swift bằng REPL, tận dụng ưu thế của build system và học cách chèn thêm trình debugger.

Nếu bạn đang theo dõi bài hướng dẫn này, tôi mặc định thừa nhận rằng bạn đã có kiến thức cơ bản về Swift và biết REPL là gì, do đó tôi sẽ không tốn thêm nhiều thời gian giải thích nữa, về phần build system và thêm trình debugger, tôi sẽ để nó như bài tập về nhà để bạn tìm hiểu thêm, dựa trên việc nghiên của bạn tại Swift.org. Do đó sau đây chúng ta sẽ thử viết một đoạn mã đơn giản bằng Swift trên Linux.

### Bước 1: Viết code
### 

Tạo một folder mới, sau đó tạo một file mới lấy tên là HelloLinux.swift. Sử dụng trình biên dịch để mở file và viết những dòng mã sau:

```
print("Running Swift on Linux is as easy as ...")
 
for num in 1...3 {
   print("\(num)")
}
 
print("Hello Linux, from Swift with love!")
```

### Bước 2: Biên dịch và chạy
### 
Quay trở lại với command prompt, bạn cần gửi file vừa tạo qua trình biên dịch Swift. Nơi chứa trình biên dịch Swift đã được add sẵn vào thư mục PATH và có tên file là swiftc. Để biên dịch, tất cả những gì bạn cần làm là chạy đoạn mã sau tại folder chứa file của bạn:

```
swiftc sample.swift
```

Sau đó bạn sẽ tìm thấy một file mới có tên là sample, để chạy chương trình, chỉ cần gõ ./sample tại command prompt và bạn sẽ nhìn thấy thành quả của mình:

```
Running Swift on Linux is as easy as ...
1
2
3
Hello Linux, from Swift with love!
```

Chúc mừng, cuối cùng thì bạn cũng đã có thể viết Swift trên Linux rồi đấy !


Nguồn bài viết: http://code.tutsplus.com/tutorials/how-to-use-swift-on-linux--cms-25934