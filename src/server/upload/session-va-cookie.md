## 1. Mở đầu
Đối với các bạn mới bắt đầu lập trình web, đã từng bao giờ bạn thắc mắc tại sao web site lại chỉ cần login lần đầu tiên, những lần sau thì tự động login, làm thế nào để thực hiện được điều đó ?

Đó chính là nhờ session và cookie, việc hiểu rõ và phân biệt hai khái niệm này là một việc khá quan trọng, nó còn giúp chúng ta giải quyết khá nhiều bài toán khác. Trong bài này chúng ta sẽ tìm hiểu dần nhé:

## 2. So sánh 

### 2.1 Điểm giống nhau
Session hay cookie đơn giản là những cách để chúng ta (các lập trình viên) lưu lại dữ liệu của người dùng sử dụng website.

Oh, nghe có vẻ easy, tiếp tục nào:

### 2.2 Điểm khác nhau
#### 2.2.1 Lưu trữ 

>Cookie

```
Cookie là một đoạn dữ liệu được truyền từ server tới browser, được browser lưu trữ và gửi ngược lại server mỗi khi nó gửi request.
```

=> Thế có nghĩa là cookie được lưu trong máy của bạn, thử dùng javascript để kiểm tra nó xem:
    
![](https://images.viblo.asia/e1ae9068-d8c3-4b0d-9ce6-0fd144b92386.png)

Vâng, một đám loằng ngoằng, có vẻ như lưu trữ ở dạng json.

```
Server gửi nội dung của cookie tới browser thông qua header của respone, browser sẽ nhận dữ liệu và tổ chức lưu trữ coookie. Mỗi một trình duyệt sẽ có cách lưu trữ cookie khác nhau.
```

Có đúng là lưu trữ theo dạng json không ? Mình test thử với trình duyệt chrome xem nhé !

![](https://images.viblo.asia/218a57d2-cb74-45be-b600-8d07769d9be3.png)

Xem xem một hồi thì ra không phải các bạn ạ.


![](https://images.viblo.asia/6ff49c53-8153-4c74-967a-00eeebbd08fa.png)


##### Như vậy, cookie được sinh ra bời trình duyệt và được lưu trữ dưới dạng SQLite3 trong máy tính nhé, còn khi mình kiểm tra trên trình duyệt thì nó đã được redisplay rồi.


Mỗi website có thể lưu trữ những thông tin khác nhau trong cookie

Ví dụ thông tin trong giỏ hàng, đánh dấu đã login hay chưa, thời gian gần đây nhất bạn đăng nhập, vân vân và mây mây tùy bài toán cụ thể.

> Session

 Bài toán bây giờ là cùng một thời điểm, server có thể nhận hàng nghìn request, vậy làm sao để phân được giữa các trình duyệt khác nhau.

Nói cách khác máy chủ cần phân biệt được trong những lượt truy cập gửi tới thì đâu là từ máy tính bạn và đâu là của người khác. 

Ví dụ cụ thể là khi trình duyệt này đã login thì cho phép truy cập trang chủ website, trình duyệt khác chưa login thì bắn sang trang đăng nhập. 

```Và thế là khái niệm session được ra đời.```


##### Như vậy session là phiên làm việc, được sinh ra bởi server, là cách đơn giản để lưu trữ 1 biến và biến này có thể tồn tại từ trang này sang trang khác, còn việc tổ chức lưu trữ như thế nào thì .... tùy vào từng server cụ thể :D




Ví dụ khi bạn đăng nhập vào trang viblo.asia sử dụng địa chỉ email và mật khẩu người dùng mà bạn đã đăng ký trước đó. Máy chủ sau khi xác thực được thông tin bạn cung cấp là đúng thì nó sẽ sinh ra một tập tin (hay chính là session của trình duyệt của bạn) chứa dữ liệu cần lưu trữ của người dùng.

#### 2.2.2 Bài toán login

Mỗi session sẽ có một định danh (ID), 2 session khác nhau sẽ có 2 ID khác nhau. ID sẽ được tạo ra trên server khi session bắt đầu và được truyền cho browser. Tức là với mỗi session tạo ra chúng ta cần tạo thêm một cookie trên trình duyệt của người dùng chứa ID tương ứng với nó. 

Như ta đã biết, cookie là một mẩu tin nhỏ có thể được trình duyệt tạo ra khi người dùng duyệt web và dùng để lưu trữ thông tin của người dùng ở phía trình duyệt (phía máy khách). Browser sẽ truyền lại ID này lên server mỗi khi truy cập vào website, nhờ đó mà có thể phân biệt được session của các trình duyệt.

Cookie có thể được tạo ra mà không yêu cầu cần phải tạo ra 1 session trên server tương ứng với nó. Tuy nhiên mỗi session được tạo ra thì cần phải có một cookie tương ứng với nó để xác định xem session này được sử dụng cho trình duyệt nào. Nhờ sử dụng cookie mà chúng ta có thể phân biệt được giữa các session khác nhau của các trình duyệt khác nhau.

Chỗ này hơi nhiều lý thuyết chút, các bạn chịu khó đọc vậy, mình cũng ko biết giải thích như nào cho bớt chữ nữa :D

#### 2.2.3 Thời gian sống

Khi bạn đóng trình duyệt, session sẽ bị xóa, đơn giản thế thôi.

Cookie thì không như vậy, nó có thời gian sống do lập trình viên cài đặt, có thể là 1 ngày, 1 tháng hoặc 1 năm,...

Nếu như không có cài đặt thời gian thì mặc định thời gian sống giống như session.

### 3. Cách sử dụng

Tùy từng bài toán mà chúng ta sử dụng session hoặc cookie, hoặc kết hợp cả hai.

Với bài toán login chẳng hạn, thì chắc chắn cần kết hợp cả hai để có sự liên kết giữa client và server rồi.

Tuy nhiên, nếu có thể, session thường được ưa chuộng hơn cookie vì một số lý do sau:

1. Brower không hoạt động với cookie:
   
   Trong vài trường hợp: phiên bản brower đã cũ, hoặc lỗi ... brower sẽ không sử dụng được cookie.

   Nhưng khi đó, session vẫn sử dụng được bằng cách truyền session ID giữa các trang web qua URL, ví dụ: script.php?session=abc123.

2. Bảo mật:

   Càng ít thông tin được truyền tải qua lại giữa browser và client càng tốt, và càng ít thông tin được lưu trữ tại client càng tốt.