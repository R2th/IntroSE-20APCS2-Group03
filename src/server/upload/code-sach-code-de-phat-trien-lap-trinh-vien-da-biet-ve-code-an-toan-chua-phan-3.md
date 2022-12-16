![](https://images.viblo.asia/40c92226-a80f-4f9b-90f4-492e8a8a1ffc.png)

Chắc hẳn sau [phần 1](https://viblo.asia/p/code-sach-code-de-phat-trien-lap-trinh-vien-da-biet-ve-code-an-toan-chua-phan-1-Qbq5Qawm5D8) và [phần 2](https://viblo.asia/p/code-sach-code-de-phat-trien-lap-trinh-vien-da-biet-ve-code-an-toan-chua-phan-2-924lJ2rWlPM) thì mọi người đã hiểu được mức độ quan trọng của việc đảm bảo an toàn cho sản phẩm ngay từ khi thiết kế và lập trình rồi. Ở phần 3 này, chúng ta sẽ tìm hiểu về 1 lỗ hổng nguy hiểm hơn, lỗ hổng này cũng xuất hiện khá nhiều trong các challenge của secure coding ctf.

Đó là lỗ hổng **OS Command Injection**.

# 7. OS Command Injection
OS Command Injection là lỗ hổng nằm ở các chức năng, các dòng code mà sẽ thực thi lệnh hệ thống. Khi các chức năng này nhận input từ ngoài (do người dùng nhập, do nhận từ dịch vụ khác,...) mà không kiểm tra kỹ, thì có thể trong input có chứa thêm các lệnh hệ thống nối với nhau. Khi chức năng được thực thi thì server sẽ vô tình thực thi thêm các câu lệnh được **"inject"** vào.

Giả sử sản phẩm của bạn có chức năng liệt kê các ảnh như sau:
![](https://images.viblo.asia/f2c432be-819c-4683-bcd1-51e843eda26f.png)

- B1: Khi bấm nút thì sẽ gửi lên server dữ liệu là: ```ls```.
- B2: Server sau khi nhận dữ liệu từ client thì sẽ chuyển input vào chức năng thực thi lệnh hệ thống để lấy ra danh sách các tệp tin.
- B3: Server trả dữ liệu về cho Client.
- B4: Client hiển thị danh sách các ảnh lên cho người dùng xem.

Ở bước 1, kẻ tấn công có thể chèn thêm các lệnh hệ thống vào để server thực thi. Nếu như lệnh chèn vào là 1 lệnh khá quen thuộc **rm -rf** thì sao nhỉ =))

Thường thì khi khai thác thành công lỗ hổng OS Command Injection, kẻ tấn công sẽ sử dụng 1 số kỹ thuật để duy trì kết nối với server, từ đó có thể liên tục yêu cầu server thực thi các lệnh hắn muốn. Rồi khi hắn leo thang đặc quyền thành công thì....như cái sticker này đây =))
![](https://images.viblo.asia/0593a705-3098-449e-b37c-8b73b4bf79ad.jpg)

Mình nghĩ ngắn gọn như vậy là đủ thấy nguyên nhân dẫn đến lỗ hổng OS Command Injection và mức độ nguy hiểm của nó rồi. Với lỗ hổng này thì secure coding ctf cũng cho ra tận 3 challlenges với mức độ khó tăng dần.

## 7.1. Ví dụ 1: Ping me 
Thông tin:
- Tuần: 3
- Bài: Ping me
- Ngôn ngữ lập trình: PHP
- Mã nguồn: 
  - index.php: https://ideone.com/JwzHDu
  - code.php: https://ideone.com/Dse9dC

Trong file index.php chúng ta thấy rằng khi nhập vào 1 địa chỉ IP hợp lệ thì server sẽ thực hiện lệnh ping tới địa chỉ đó và trả về cho chúng ta kết quả. Ở đây để kiểm tra thử xem có lỗ hổng OS Command Injection không thì chúng ta chỉ cần thêm vào 1 ký tự nối lệnh hệ thống như ```|```, ```||```, ```&```, ```&&```,... theo sau là 1 lệnh hệ thống.

Nói thế chứ đọc code là biết thừa nó có lỗ hổng rồi, có xử lý input người dùng đâu.
```php
<?php

if (isset($_GET['address'])) {
    $address = $_GET['address'];
    require "code.php";
    $command = "ping -c 1 ";
    $command = $command.$address." 2>&1";

    $answer = shell_exec($command);
    echo "<h3>" . preg_replace("/\r|\n/", "<br/>", $answer) . "</h3>";
}
?>
```
- **$address** là giá trị do chúng ta nhập vào.
- **$command** là lệnh mà hệ thống sẽ thực thi. Biến $command này sau đó được nối trực tiếp với input chúng ta đã nhập vào.
- **" 2>&1"** chỉ đơn giản là đưa cả các thông báo lỗi (stderr) vào output (stdout) sẽ trả lại cho chúng ta thôi (link đọc tham khảo: [2>&1 là gì?](https://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean)).
- **shell_exec($command)** sẽ thực thi câu lệnh hệ thống lưu trong biến $command, và kết quả được ghi vào biến **$answer**.

Với input là ```8.8.8.8 | ls``` thì server sẽ thực thi lệnh **```ping -c 1 8.8.8.8 | ls```** và trả về kết quả, trong đó có file **flag1_+.txt** (server tắt rồi nên mình không chụp được lại ảnh nữa).  Giờ thì phải đọc file này để lấy flag. 

Tuy không kiểm tra kỹ đầu vào, nhưng trong file code.php có lọc chuỗi ```cat```. Vì không thể dùng lệnh cat để đọc nội dung file được nên lúc này sẽ cần kiến thức về Linux trên mức "biết sử dụng" một chút. Ngoài lệnh ```cat``` ra thì có 1 số lệnh khác cũng giúp chúng ta đọc được nội dung file, VD như:
- ```nl```: đọc file giống lệnh cat, nhưng có thêm số dòng.
- ```head```: đọc 1 số dòng ở đầu file
- ```tail```: đọc 1 số dòng ở cuối file

Ở đây mình đã sử dụng lệnh ```nl``` để đọc nội dung flag.
![](https://images.viblo.asia/55b6bfcd-04b4-4b81-9531-5fe87f95a044.png)

## 7.2. Ví dụ 2: Pong
Thông tin:
- Tuần: 3
- Bài: Pong
- Ngôn ngữ lập trình: PHP
- Mã nguồn: https://ideone.com/9gO7R3

Lần này code đã kiểm tra cẩn thận hơn để tránh bị khai thác OS Command Injection.
```php
<?php
require "dir_listing.php";

if (isset($_GET['address'])) {
    $address = $_GET['address'];
    $address = preg_replace("/\||&|;|`|\n/", " ", $address);

    $command = "ping -c 1 ";
    $command = $command.$address." 2>&1";

    // echo $command;
    $answer = shell_exec($command);
    echo "<h3>" . preg_replace("/\r|\n/", "<br/>", $answer) . "</h3>";
}
?>
```

Code tương tự ví dụ trên, nhưng lần này các ký tự thường được sử dụng để khai thác lỗ hổng OS Command Injection đã được lọc và thay thế toàn bộ bằng ký tự khoảng trắng.

Tuy nhiên vẫn chưa lọc hết được toàn bộ, ở đây vẫn có 1 số ký tự có thể sử dụng để lồng thêm câu lệnh vào, đó là 3 ký tự ```$ ( )```. Với 3 ký tự này có thể giúp thực thi câu lệnh: **```$(command)```** sẽ khiến server phải thực thi các command.

Vì không biết flag nằm ở đâu nên mình cứ tìm trên toàn bộ server các file có tên chứa "flag"
![](https://images.viblo.asia/6d24dae7-0fa6-4cbc-96c7-fdec43512cd9.png)
Vậy là ngay trong thư mục hiện tại của mình có 1 file flag2.txt

Lần này không thấy bị chặn gì nên mình cat nội dung file ra luôn.
![](https://images.viblo.asia/d72cd9e5-ad69-4f36-8a49-60753a477f70.png)

## 7.3. Ví dụ 3: Overwatch
Thông tin:
- Tuần: 3
- Bài: Overwatch
- Ngôn ngữ lập trình: Python
- Mã nguồn: https://ideone.com/tDy2XI

Dấu hiệu nhận biết trang web tồn tại lỗ hổng command injection nằm ở đoạn code từ dòng 40 - 42:
```python
cmd = 'echo {} > ./languages/{}.txt'.format(language, username)
 
subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
```

Ở ví dụ này cũng nối thẳng input với command để thực thi, không có lọc input gì hết. Tuy nhiên, kết quả lại không được hiển thị lên giao diện, vì thế sẽ khó xác định được kết quả thực thi lệnh.

Với dạng khai thác **blind OS Command Injection** này thì cần có những kỹ thuật riêng để kiểm tra. Challenge này cũng cung cấp sẵn 1 cách đơn giản cho chúng ta rồi. Tại dòng 45, chúng ta biết được có 1 file **/LICENSE.md** mà chúng ta có thể xem được nội dung. Và tại dòng 52 chúng ta biết thêm rằng có quyền ghi vào file này luôn: ```license_file = open('LICENSE.md', 'w')```

Vậy hướng khai thác như sau: chúng ta có thể thực thi 1 lệnh và ghi lại kết quả vào file ```LICENSE.md```, sau đó sẽ đọc file này từ client side. Sau đây mình đã thử với lệnh ```ls```, ghi kết quả thực thi của lệnh này vào ```LICENSE.md```
![](https://images.viblo.asia/cfbe28a5-8e60-46b4-ad1f-8f2a29a53771.png)

Vậy là đã thành công trong việc khai thác Blind OS Command Injection. Tương tự, chỉ cần thay lệnh ```ls``` bằng lệnh ```cat flag20.txt``` để ghi nội dung file ```flag20.txt``` vào file ```LICENSE.md```
![](https://images.viblo.asia/bd984ca8-a1c6-4f9b-802c-8e62be320973.png)

**Vậy thì chúng ta nên làm gì để phòng tránh lỗ hổng OS Command Injection?**
- **Cách 1: hạn chế tối đa việc dữ liệu nhập từ người dùng được sử dụng trong các command sẽ thực thi.**
- **Cách 2: lọc dữ liệu đầu vào cẩn thận, loại bỏ các ký tự có thể "chain" command như ```|```, ```||```, ```&```, ```&&```, ```;```, ```$```,...**