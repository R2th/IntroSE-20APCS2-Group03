# Python Introduction
## What is Python?
Python là ngôn ngữ lập trình phổ biến. Nó được tạo ra bởi Guido van Rossum, và được phát hành vào năm 1991.

Python được sử dụng cho:
* Phát triển web (phía máy chủ).
* Phát triển phần mềm.
* Toán học.
* Kịch bản hệ thống.

## What can Python do?
* Python có thể được sử dụng trên một máy chủ để tạo các ứng dụng web.
* Python có thể được sử dụng cùng với phần mềm để tạo quy trình công việc.
* Pyon có thể kết nối với các hệ thống cơ sở dữ liệu. Nó cũng có thể đọc và sửa đổi các tập tin.
* Python có thể được sử dụng để xử lý dữ liệu lớn và thực hiện toán học phức tạp.
* Python có thể được sử dụng để tạo mẫu nhanh hoặc phát triển phần mềm sẵn sàng sản xuất.
## Why Python?
* Python làm việc trên các nền tảng khác nhau (Windows, Mac, Linux, Raspberry Pi, v.v.).
* Python có một cú pháp đơn giản tương tự như ngôn ngữ tiếng Anh.
* Python có cú pháp cho phép các nhà phát triển viết chương trình với ít dòng hơn một số ngôn ngữ lập trình khác.
* Python chạy trên một hệ thống thông dịch, nghĩa là mã có thể được thực thi ngay khi được viết. Điều này có nghĩa là có thể code rất nhanh.
* Python có thể được xử lý theo procedural, object-orientated hoặc functional.
## Good to know
Phiên bản chính gần đây nhất của Python là Python 3. Có thể viết Python trong Môi trường phát triển tích hợp, chẳng hạn như Thonny, Pycharm, Netbeans hoặc Eclipse, đặc biệt hữu ích khi quản lý các bộ sưu tập tệp Python lớn hơn.
## Python Syntax compared to other programming languages
* Python được thiết kế để dễ đọc và có một số điểm tương đồng với ngôn ngữ tiếng Anh với ảnh hưởng từ toán học.
* Python sử dụng các dòng mới để hoàn thành một lệnh, trái ngược với các ngôn ngữ lập trình khác thường sử dụng dấu chấm phẩy hoặc dấu ngoặc đơn.
* Python dựa vào thụt lề, sử dụng khoảng trắng, để xác định phạm vi; chẳng hạn như phạm vi của các vòng lặp, chức năng và các lớp. Các ngôn ngữ lập trình khác thường sử dụng dấu ngoặc nhọn cho mục đích này.

# Python Getting Started
## Python Install
Nhiều PC và Mac sẽ được cài đặt python. Để kiểm tra xem bạn đã cài đặt python trên PC Windows chưa, hãy tìm kiếm trong thanh start với ừ khóa "Python" hoặc chạy phần sau trên Command Line (cmd.exe):
```
C:\Users\Your Name>python --version
```
Để kiểm tra xem bạn đã cài đặt python trên Linux hay Mac chưa, trên linux hãy mở Command Linee hoặc trên Mac mở Terminal và gõ:
```
python --version
```
Nếu bạn thấy rằng bạn chưa cài đặt python trên máy tính của mình, thì bạn có thể tải xuống miễn phí từ trang web sau: https://www.python.org/
## Python Quickstart
Python là ngôn ngữ lập trình được thông dịch, điều này có nghĩa là với tư cách là nhà phát triển, bạn viết các tệp Python (.py) trong trình soạn thảo văn bản và sau đó đặt các tệp đó vào trình thông dịch python để được thực thi.

Cách để chạy tệp python là như thế này trên Command Line:
```
C:\Users\Your Name>python helloworld.py
```

Trong đó "helloworld.py" là tên của tệp python của bạn.

Chúng ta hãy viết tệp Python đầu tiên của chúng ta, được gọi là helloworld.py, có thể được thực hiện trong bất kỳ trình soạn thảo văn bản nào.
```
# helloworld.py
print("Hello, World!")
```

Đơn giản như vậy. Lưu tập tin của bạn. Mở Command Line của bạn, điều hướng đến thư mục nơi bạn đã lưu tệp của mình và chạy:
```
C:\Users\Your Name>python helloworld.py
```
Kết quả: 
```
Hello, World!
```
## The Python Command Line
để thực thi 1 đoạn mã ngắn một cách nhanh hơn và dể dàng hơn tạo file .py chúng ta có thể chạy chương trình  Command Line của Python.
```
C:\Users\Your Name>python
```

Từ đó bạn có thể viết bất kỳ mã python nào, bao gồm ví dụ hello world của chúng ta từ trước đó:
```
C:\Users\Your Name>python
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("Hello, World!")
```
Kết quả:
```
C:\Users\Your Name>python
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:04:45) [MSC v.1900 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("Hello, World!")
Hello, World!
```
Thoát:
```
exit()
```
# Ref
https://www.w3schools.com/python/default.asp