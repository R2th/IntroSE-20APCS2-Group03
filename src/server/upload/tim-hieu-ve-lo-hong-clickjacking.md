# 1. Giới thiệu
 Clickjacking là một lỗ hổng đã có từ rất lâu. Tuy không được đánh giá là 1 lỗ hổng có mức độ nguy hiểm cao, nhưng <strong>Clickjacking</strong> vẫn luôn luôn là 1 lỗ hổng tiềm ẩn nhiều rủi ro, đặc biệt là với những người dùng không có nhiều kiến thức về mạng. Hôm nay mình sẽ tìm hiểu tổng quan về lỗ hổng <strong>Clickjacking</strong> để mọi người có thể hiểu và tránh bị hacker lợi dụng và khai thác.
# 2. Lỗ hổng Clickjacking
## a. Khái niệm
   Clickjacking là một cuộc tấn công dựa trên giao diện trong đó người dùng bị lừa nhấp vào nội dung có thể hành động trên một trang web ẩn bằng cách nhấp vào một số nội dung khác trong trang web giả mạo. 
   
   Một cuộc tấn công bằng clickjacking sử dụng các tính năng dường như vô hại của HTML và JavaScript để buộc nạn nhân thực hiện các hành động không mong muốn, chẳng hạn như nhấp vào một nút ẩn thực hiện một thao tác ngoài ý muốn. Đây là một vấn đề bảo mật phía máy khách ảnh hưởng đến nhiều trình duyệt và nền tảng khác nhau. 
   
   Ta sẽ làm rõ khái niệm trên qua ví dụ dưới đây:
   
   ![](https://images.viblo.asia/fc4ffc5f-cd04-44be-8b59-0b627630ed14.png)
   
   Đầu tiên hacker sẽ tạo ra 1 trang web để khai thác. Trang web này sẽ gồm 2 lớp, 1 lớp giả mạo bên trên sẽ được sử dụng để đánh lừa người dùng (ví dụ như nhấp vào để nhận thưởng vv...), lớp bên dưới được làm ẩn đi sẽ chứa trang web mà hacker muốn khai thác (ví dụ như 1 ngân hàng). Sau đó hacker sẽ gửi liên kết trang web cho nạn nhân. Người dùng web truy cập vào trang web chứa mã độ và nhấp vào một nút để giành giải thưởng. Vô tình, họ đã bị kẻ tấn công lừa nhấn vào một nút ẩn thay thế và điều này dẫn đến việc thanh toán tài khoản trên trang web ngân hàng mà hacker nhắm tới.
## b. Nhận biết

Như đã đề cập ở trên, kiểu tấn công này thường được thiết kế để cho phép kẻ tấn công gây ra hành động của người dùng trên 1 trang web cụ thể, ngay cả khi mã thông báo chống CSRF đang được sử dụng.  Trước khi hacker có thể tấn công Clickjacking, hacker sẽ thực hiện kiểm tra để xác định xem trang web mà hacker nhắm tới có dễ bị tấn công clickjacking hay không. Hacker sẽ chạy thử 1 đoạn mã html có frame chứa url của trang web hacker nhắm tới. Ví dụ về mã HTML để tạo trang web thử nghiệm này được hiển thị trong đoạn mã sau:

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title>I Frame</title>
</head>
<body>
    <h3>clickjacking vulnerability</h3>
    <iframe src="http://www.target.site" height="500px" width="500px"></iframe>
</body>
</html>
```

`Src` sẽ chứa url của trang web mà hacker muốn khai thác. Nếu nội dung của trang web đó được tải thành công vào khung, thì trang đó dễ bị tấn công và không có kiểu bảo vệ chống lại các cuộc tấn công bằng <strong>Clickjacking</strong>. Ví dụ về 1 trang web bị lỗ hổng <strong>Clickjacking</strong>:

![](https://images.viblo.asia/5b3ada98-2f1a-42d0-be0c-7343579eb6fb.png)

## c. Hậu quả

Theo 1 vài trang chuyên để đánh giá mức độ nguy hiểm của các lỗ hổng hậu quả Clickjacking được chia thành 3 loại sau:
+ <strong>Clickjacking -> Sensitive Click-Based Action (Clickjacking dẫn tới hành động nhấp chuột gây nguy hiểm):</strong> Đây là mức độ nguy hiểm cao nhất của Clickjacking. Trang web mà hacker khai thác có chứ những nút click mang tính nguy hiểm cao mà không thực hiện xác thực.

    Những nút Click nguy hiểm có thể bao gồm: Xóa tài khoản người dùng, xác thực 1 giao dịch thông qua 1 hoặc rất ít lần nhấp chuột. Hình ảnh trên mô phỏng 1 cuộc tấn công <strong>Sensitive Click-Based</strong> của `Portswigger`. Mình sẽ làm 1 ví dụ trên `Portswigger` về lỗi trên tại phần khai thác bên dưới:
    
   ![](https://images.viblo.asia/f85e63e7-403d-44bd-b5a2-06c2a6040bf6.png)
    
   Bên cạnh mức độ nguy hiểm, thì hậu quả của lỗi trên thường được đánh mức nguy hiểm là `P4` trong trong các chương trình bugbounty và hoàn toàn được chấp nhận là 1 lỗ hổng được trả tiền thưởng.
+ <strong>Clickjacking -> Form Input (Clickjacking lợi dụng chức năng nhập vào form):</strong> Bên cạnh việc sử dụng các nút click để khai thác. Hacker có thể lợi dụng các form input của trang web khai thác . 

    Ta sẽ xem xét 1 ví dụ sau: 
    Trang web khai thác có chứa chức năng đổi mật khẩu nhưng không xác thực lại mật khẩu cũ. Hacker sẽ lợi dụng <strong>Clickjacking</strong> để lừa người dùng nhập vào 1 chuỗi ký tự vào form input của trang web mà hacker kiểm soát, nhưng thực chất là đang nhập 1 mật khẩu mới và hacker hoàn toàn biết được giá trị của mật khẩu mới đó. Như vậy hacker có thể chiếm được tài khoản của nạn nhân.
    
   ![](https://images.viblo.asia/78628512-ece9-4a37-9a70-18da7d378886.png)
      
   Form input ngoài chức năng đổi mật khẩu thì hacker có thể khai thác chức năng đổi email người dùng nếu như không được xác thực đúng cách. Bên cạnh đó chức năng đăng nhập cũng có thể được lợi dụng để khai thác tuy nhiên thì cách tấn công này mang lại hiệu quả không quá cao.
+ <strong>Clickjacking -> Non-Sensitive Action (Clickjacking chứa các hành động không nguy hiểm):</strong> Tại mức độ này thì sự nguy hiểm của <strong>Clickjacking</strong> mang lại là không cao khi trang web đã sử dụng các phương thức xác thực tốt hoặc không chứa những những nút click dẫn tới tác động cụ thể.
 
    Hiện tại thì lỗi trên thường được đánh mức nguy hiểm là `P5` (mức độ infomation) trong trong các chương trình bugbounty. Tuy nhiên không thể chắc chắn trong tương lai trang web đó có thêm các tính năng dẫn tới nguy hiểm hay không nên vẫn tiềm ẩn rủi ro.
## d. Khai thác
Tại phần khai thác này mình sẽ demo cách 1 hacker khai thác <strong>Clickjacking</strong> như nào. Mình sẽ sử dụng 1 lab trên portswigger tại [Đây]([https://portswigger.net/web-security/clickjacking/lab-basic-csrf-protected). Nhiệm vụ là mình sẽ tạo 1 bộ khung HTML để đánh lừa người dùng xóa tài khoản của họ.

Đầu tiên đăng nhập vào trang web với `username=wiener&password=peter`. Trang web sẽ điều hướng tới trang web của người dùng. Ta thực hiện kiểm tra tương tự bước `b` bằng cách nhúng trang web vào 1 frame:

![](https://images.viblo.asia/82dcb1ff-4438-4e5a-9dfc-fbcb5972ca20.png)

Xác nhận trang web đã có thể tấn công <strong>Clickjacking</strong>. Thực hiện nhúng trang web vào khung của máy chủ khai thác. Đi tới máy chủ khai thác được tạo sẵn trong `portswigger` và điền payload sau vào phần body:

```html
<style>
   iframe {
       position:relative;
       width:500px;
       height: 700px;
       opacity: 0.1;
       z-index: 2;
   }
   div {
       position:absolute;
       top: 50px;
       left: 50px;
       z-index: 1;
   }
</style>
<div>Click</div>
<iframe src="https://ac4f1fa21e06e66e804d00a6003f00f0.web-security-academy.net/my-account"></iframe>
```

`src` sẽ là `url` của trang web chúng ta muốn khai thác. Thực hiện kiểm tra xem vị trí của nút Click nó nằm đúng trên nút Delete Account hay chưa và thực hiện căn chỉnh:

![](https://images.viblo.asia/f2f06472-5cdc-4541-9cc7-f428fc9ae220.png)

Như trong trường hợp này t sẽ chỉnh sửa thông số như sau:
```html
       width:500px;
       height: 700px;
       
       top: 495px;
       left: 60px;
```
Thực hiện kiểm tra lại và xác thực vị trí `Click me` đã nằm đúng vị trí `Delete Account`:

![](https://images.viblo.asia/417204d1-3522-4b33-9d63-c288ac0b4e71.png)

Chỉnh sửa `opacity: 0.0001;` để làm ẩn trang web cần khai thác và chọn `Deliver exploit to victim` để gửi cho nạn nhân. Khi nạn nhân truy cập vào trang web và bấm vào `Click me` thì sẽ bị xóa tài khoản và hoàn thành bài lab. 

## e. Cách phòng tránh
Ngày nay để ngăn chặn tấn công <strong>Clickjacking</strong> khá dễ dàng. Có 2 phương diện để phòng tránh <strong>Clickjacking</strong> bao gồm từ phía client và server.
+ Về phía Client, cách phòng tránh tốt nhất là người dùng nên cảnh giác đối với những đường link lạ với các nội dung hướng người dùng đến việc click chuột như: Click để nhận phần thưởng, Click để quay số vv...
+ Về phía Server sẽ có nhiều cách để phòng tránh <strong>Clickjacking</strong>:
    - Sử dụng tùy chọn X-Frame: Giải pháp này của Microsoft là một trong những giải pháp hiệu quả nhất chống lại các cuộc tấn công clickjacking trên máy tính của bạn. Bạn có thể bao gồm tiêu đề HTTP X-Frame-Options trong tất cả các trang web của bạn. Điều này sẽ ngăn không cho trang web của bạn bị nhúng vào trong 1 khung thông qua các thẻ như: `<frame>, <iframe>, <object>`. X-Frame được hỗ trợ bởi các phiên bản mới nhất của hầu hết các trình duyệt bao gồm Safari, Chrome, IE.

    - Di chuyển các phần tử trên trang của bạn: Hacker chỉ có thể tấn công <strong>Clickjacking</strong> khi biết nó cấu trúc của trang web và từ đó đặt được những điểm Click ẩn. Bằng cách di chuyển phần tử đó liên tục đến các vị trí khác nhau, Hacker sẽ rất khó để có thể lợi dụng lỗ hổng trên để khai thác. Vấn đề duy nhất với giải pháp này là sẽ khiến người dùng cảm thấy khó tiếp cận và sử dụng trang web.

    - Sử dụng URL một lần: Đây là một phương pháp khá tiên tiến để bảo vệ chống lại những kẻ lừa đảo. Bạn có thể làm cho cuộc tấn công trở nên khó khăn hơn nhiều nếu bạn sử dụng URL 1 lần vào các trang quan trọng. Việc sử dụng url 1 lần khiến hacker không thể nhúng url vào trong trang web để thực hiện khai thác. Điều này tương tự như `nonces` được sử dụng để ngăn chặn CSRF nhưng độc đáo theo cách nó bao gồm `nonces` trong các URL để nhắm mục tiêu các trang, không phải trong các hình thức trong các trang đó (khá giống với cách `Wordpress` sử dụng `wp-nonce` trên URL).

# 3. Kết
Trên đây là những gì mình biết về lỗ hổng <strong>Clickjacking</strong>. Hi vọng mọi người sau khi đọc bài viết sẽ hiểu được về lỗ hổng Clickjacking và cách phòng chống nó.