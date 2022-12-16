##### Mỗi một ngôn ngữ lập trình đều có công cụ hỗ trợ lập trình riêng biệt và PHP cũng vậy. Bài viết này sẽ chia sẻ một vài hiểu biết của tôi về ngày đầu học PHP với những công cụ hỗ trợ chạy trên hệ điều hành Windows 10.
### 1. Cài đặt Xampp
[Tải về Xampp](https://www.apachefriends.org/download.html)

**Xampp** hoạt động dựa trên sự tích hợp của 5 phần mềm chính là **Cross-Platform (X)**, **Apache (A)**, **MariaDB (M)**, **PHP (P)** và **Perl (P)**, nên tên gọi XAMPP cũng là viết tắt từ chữ cái đầu của 5 phần mềm này.

> **XAMPP** là chương trình tạo web server được ứng dụng trên các hệ điều hành Linux, MacOS, Windows, Cross-platform, Solaris.

![](https://images.viblo.asia/20982a02-560e-4c4a-b487-0b555905e46f.jpg)

>  **Run** phần mềm Xampp mà bạn vừa tải về. (Chương trình nhẹ nên máy cùi mấy cũng Running với tốc độ bàn thờ nhé :grin:)

> Các phần tiếp theo cứ ***next*** thôi ạ.

***Lưu ý:***   Tốt nhất ***nên*** lưu em nó trên ổ **C** để tránh các lỗi phát sinh không mong muốn.



-----

![](https://images.viblo.asia/63ff5f5a-ebb2-4b4c-a51d-e63f5b60cb84.jpg)

![](https://images.viblo.asia/bb59255e-d5ac-4a60-a954-ec5fe65075f5.jpg)



-----


* **Khởi động Localhost**: 


Xampp sẽ không tự động tạo **icon** ra màn hình nên sau này khi cần dùng đến xampp bạn chỉ cần vào thành tìm kiếm hoặc ***Pin to taskbar*** (click chuột phải vào biểu tượng của xampp đang chạy trên thanh taskbar) để tùy thời khởi động.


![](https://images.viblo.asia/0c7e3d01-9525-4afb-9022-c0fa6f9c8822.jpg)

> Có 2 Module cần dùng nhiều là **Apache** và **MySQL**, lúc này chỉ cần click ***Start***.

* **Sửa lỗi cổng** (Một số máy gặp ERROR cổng 80 / 81)

Sau khi ấn **Start** rất nhiều trường hợp xuất hiện chữ đỏ và trên mỗi Module hiển thị lỗi cổng 81 (hình như thế :stuck_out_tongue_closed_eyes:). Tuy mình không bị lỗi này nhưng đã sửa cho một số bạn nên đừng hoang mang, cách Fix khá đơn giản. 
> Trên Apache ấn vào **Config**, chọn **Apache (httpd.conf)**

![](https://images.viblo.asia/edb0b657-4f3a-42e9-88ae-b56486039831.jpg)

> Tìm dòng này: **Listen 80** (hoặc 81)

> Sửa thành thế này: **Listen 8080**

Vậy là xong, thoát ra và khởi động lại Xampp nhé!

Video cho ai ngại đọc: 
[Hướng dẫn cài đặt phần mềm Xampp không bị lỗi - New(2018_2019)](https://www.youtube.com/watch?v=ojxOQhzSE6I&t=552s)

### 2. Công cụ lập trình

Dưới đây là 2 công cụ tôi đã và đang sử dụng để lập trình PHP, về hai phần mềm này có lẽ tôi sẽ không giới thiệu nhiều vì ai lập trình Web cũng đều phải dùng :sunglasses:. Tải về nếu bạn chưa có:


[Visual Code](https://code.visualstudio.com/download)

[Sublime text](https://www.sublimetext.com/3)

### 3. Viết file php và chạy
Đôi khi giáo viên mặc định cái này sinh viên tự biết nhưng với nhưng loài tâm hồn treo ngược cành cây như tôi thì... hơi mệt :triumph:.

:interrobang: ***Cài xong Xampp với Apps rồi làm gì?*** 

:interrobang: **Rồi viết xong Save ở đâu?**

:interrobang: ***How to Run?***

Và sau khi khổ công tìm tòi thì nó là như thế này:

**1. Viết file php:**

Thử tí cho đỡ chán nhé :wink: Copy đoạn mã này vào Visual code/Sublime text.
```
<!DOCTYPE html>
<html>

<body>

    <?php
    echo "Hello Everyone,Tôi là Dương Nhật lam!";
    ?>

</body>

</html>
```

**2. Save file:**

> Vào ổ C có thư mục là **xampp** tìm đến thư mục **htdocs** tạo một thư mục riêng cho việc demo nhỏ như những đoạn code trên.

> **htdocs** là thư mục chuyên lưu các file chạy trên nền tảng web .html, .css, .js, .php,.. (nói chung là em ý cân tất :satisfied:)

> **Save** file như thế này: **ten_file.php**

Ví dụ tạo thư mục như đường dẫn sau: ***C:\xampp\htdocs\DEMO\index.php***


:pray: :pray: *Hãy phân loại thư mục ngay từ đầu và đặt tên gợi nhớ để tiện phân biệt, tôi thấy rất nhiều người lưu file rất tùy tiện và không có tổ chức cây thư mục. Sau một thời gian nhìn lại trong thư mục toàn các thứ loạn thất bát tao, muốn tìm file rất khó khăn và mất thời gian.*

**3. Chạy file:**

- Khởi động trình duyệt: **Chrome (khuyên dùng)** / Cốc cốc / **Firefox (khuyên dùng**) / Opera / ...v..v..

> Trên thanh tìm kiếm URL gọi localhost với cú pháp: 
> 
> **localhost:80/ten_thu_muc/ten_file.php**

Ví dụ: localhost:80/DEMO/index.php

Như vậy là tôi review buổi học đầu tiên và nhưng hiểu biết sơ cua của tôi về lập trình PHP, nếu bạn vẫn còn thắc mắc hay có góp ý gì hãy comments để tôi được biết nhé :point_down::point_down::point_down:

Hẹn gặp lại ở những bài viết sau!

Link tham khảo:

https://thachpham.com/thu-thuat/cai-dat-localhost-xampp.html

https://www.youtube.com/watch?v=ojxOQhzSE6I&t=552s

:maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: