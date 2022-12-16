Đầu tiên bạn phải cài đặt Python và Sublime Text tại đường dẫn sau:

[Hướng dẫn cài đặt Python trên hệ điều hành Windows MacOS và Linux](https://viblo.asia/s/huong-dan-cai-dat-python-tren-he-dieu-hanh-windows-macos-linux-2020-b85og8R452G)

Với phiên bản mới nhất của Python và Sublime Text đã được cài đặt, bạn gần như đã sẵn sàng để chạy chương trình Python đầu tiên được viết bằng trình soạn thảo văn bản.

Nhưng trước khi làm điều đó, bạn cần chắc rằng Sublime Text đã được cài đặt đúng phiên bản Python trên hệ thống của bạn.  Sau đó bạn viết chương trình Hello World! và chạy nó.

### Cấu hình Sublime Text để sử dụng đúng phiên bản Python

Nếu lệnh `python` trên hệ thống của bạn chạy Python 3, bạn sẽ không cần cấu hình bất cứ thứ gì và có thể bỏ qua phần này.

Nếu hệ thống của bạn sử dụng lệnh `python3`, bạn sẽ cần cấu hình Sublime Text để sử dụng đúng phiên bản của Python.

Mở ứng dụng Sublime Text. **Chọn Tool** -> **Build System** -> **New Build System**, để mở 1 file cấu hình mới cho bạn. Xoá những gì bạn nhìn thấy, và nhập như sau:

```
{
	"cmd": ["/Library/Frameworks/Python.framework/Versions/3.8/bin/python3", "-u", "$file"],
}
```

Đoạn code này cho phép Sublime Text sử dụng `python3` khi chạy chương trình Python. Lưu file với tên Python3.sublime-build trong thư mục mặc định khi Sublime Text chọn file Save.

### Chạy file helloworld.py

Trước khi bạn viết chương trình đầu tiên, tạo một thư mục tên là `python_work` ở một nơi nào đó trên hệ thống của bạn. Khi đặt tên file, tốt nhất là sử dụng chữ thường và dấu gạch dưới, bởi vì đây là qui ước về cách đặt tên của Python. Tuân theo chuẩn này thì các Python coder khác sẽ dễ hiểu code của bạn hơn.

Mở Sublime Text, chọn Open, sau đó chọn đường dẫn tới thư mục bạn vừa tạo `python_work`

![Open Menu](https://images.viblo.asia/18d7069c-de73-4cc3-8ded-e7c0c691d1cc.png)

Tạo một file tên là `hello_world.py` trong thư mục `python_work`

![New file](https://images.viblo.asia/e9d37ea8-076d-461e-a63b-d4c5a93d78e1.png)

Phần đuôi file `.py` thông báo với Sublime Text rằng code được viết bằng Python, để giúp Sublime Text biết cách xử lý và `highlight syntax`

Sau khi bạn tạo file xong, nhập đoạn code sau:

```
print("Hello Python world!")
```
 
 Nếu lệnh `python` hoạt động trên hệ thống của bạn. Bạn có thể chạy chương trình bằng cách chọn **Tools -> Build** trên menu hoặc bấm tổ hợp phím **CTRL-B**.
 
 Nếu bạn cấu hình Sublime Text như phần trước: chọn **Tool -> Build System** và sau đó chọn **Python3**. Kể từ bây giờ bạn có thể chạy chương trình bằng cách chọn **Tools -> Build** trên menu hoặc bấm tổ hợp phím **CTRL-B**.
 
 Màn hình terminal sẽ xuất ra tại phần dưới cửa sổ Sublime Text như sau:
 
 ![Hello output](https://images.viblo.asia/46c0dc68-5567-4acb-8bad-1453d8e55608.png)

### Tổng kết
Bạn đã cấu hình xong Python3 cho Sublime Text 3.

Nếu có vấn đề khi cài đặt, bạn hãy comment bên dưới, mình sẽ hỗ trợ trong thời gian sớm nhất!

Cảm ơn các bạn đã quan tâm bài viết này.

### Tham khảo
PYTHON CRASH COURSE - A Hands On Project Based Introduction To Programming (Eric Matthes).