Bài viết liên quan:

[Hướng dẫn cài đặt Python trên Windows](https://viblo.asia/p/huong-dan-cai-dat-python-va-sublime-text-3-cho-windows-2020-Ljy5V78kKra)

[Hướng dẫn cài đặt Python trên MacOS](https://viblo.asia/p/huong-dan-cai-dat-python-va-sublime-text-3-cho-macos-2020-07LKXm8rZV4)

Linux là hệ điều hành thiết kế cho lập trình, vì vậy Python điều đã được cài đặt trên hầu hết các máy tính Linux.

Những người viết và bảo trì Linux mong đợi bạn có thể tạo ra chương trình riêng của bạn với thời gian và công sức bỏ ra ít nhất. Vì thế, bạn sẽ cài đặt Python chỉ với một vài bước đơn giản.

### Kiểm tra phiên bản của Python

Mở của sổ terminal bằng cách chạy ứng dụng Terminal trên hệ thống của bạn (trên Ubuntu, bạn có thể bấm tổ hợp phím CTR-ALT-T).

Để kiểm tra phiên bản cài đặt của Python, nhập `python3`.  Khi Python đã được cài đặt, thì phiên bản của Python sẽ được hiện ra và trình phiên dịch của Python sẽ bắt đầu bằng dấu `>>>`.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/zm31jlq7pm_Screenshot%20from%202020-02-06%2021-12-23.png)

Kết quả chỉ định rằng Python phiên bản mặc định đang cài đặt trên máy tính là 3.6.9. Khi bạn thấy thông báo này, bấm tổ hợp phím CTR-D hoặc gõ `exit()` để thoát khỏi trình phiên dịch Python.

Nếu phiên bản Python của bạn nhỏ hơn 3.7. Bạn nên cài đặt phiên bản mới nhất như hướng dẫn dưới đây.

Đầu tiên cài đặt `deadsnakes` để thiết lập phiên bản của Python một cách dễ dàng.

Sau đó tiến hành cài đặt Python, và thiết lập Python 3.8 là phiên bản mặc định 

-----

$ sudo add-apt-repository ppa:deadsnakes/ppa

$ sudo apt-get update

$ sudo apt install python3.8

$ sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1

-----

Kiểm tra lại phiên bản Python bằng lệnh `python`

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/58x2scgw7n_image.png)

Xuất `Hello Python interpreter!` ra màn hình bằng cách nhập lệnh sau: `print("Hello Python interpreter!")`

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kofh1aiysl_image.png)

### Cài đặt Sublime Text

Mở Ubuntu Software nhập `sublime text` và sau đó chọn sublime text để tải về

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/w5bx53bmi6_image.png)

### Tổng kết

Như vậy là bạn đã cài đặt xong Python cho hệ điều hành MacOS và IDE hỗ trợ cho Python là Sublime Text 3.

Nếu có vấn đề khi cài đặt, bạn hãy comment bên dưới, mình sẽ hỗ trợ trong thời gian sớm nhất!

Cảm ơn các bạn đã quan tâm bài viết này.

### Tham khảo

PYTHON CRASH COURSE - A Hands On Project Based Introduction To Programming (Eric Matthes).