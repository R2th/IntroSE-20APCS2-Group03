Chào mọi người, 
 
 Trong bài này,  chúng mình sẽ tìm hiểu về cookie HTTP và cách sử dụng JavaScript để quản lý cookie một cách hiệu quả.
 
###  1. Cookie là gì?
Cookie HTTP là một phần dữ liệu mà máy chủ gửi đến trình duyệt web. Sau đó, trình duyệt web lưu trữ cookie HTTP trên máy tính của người dùng và gửi nó trở lại cùng một máy chủ trong các yêu cầu sau này. 

Cookie HTTP còn được gọi là web cookie hoặc browser cookie. Và nó thường được gọi là cookie.
![](https://images.viblo.asia/4ab66345-c121-4414-9f33-6e6b76c20e75.png)

Ví dụ, tiêu đề của một response HTTP có thể sẽ trông giống như thế này:
```javascript
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie:username=admin
...
```
Xem xét ví dụ trên,  phương thức HTTP sẽ trả về cho ta với biến là username và giá trị là admin. Server sẽ mã hóa cả tên và giá trị khi gửi cookie đến trình duyệt web.

Trình duyệt web lưu trữ thông tin này và gửi nó trở lại máy chủ thông qua tiêu đề Cookie HTTP cho yêu cầu tiếp theo như sau:
```javascript
GET /index.html HTTP/1.1
Cookie: username=admin
...
```

### 2. Tại sao là Cookie?
 Như ta biết **HTTP request chỉ là stateless**, vì khi ta gửi hai yêu cầu HTTP tuần tự đến máy chủ, không có liên kết nào giữa chúng. Nói cách khác, máy chủ không thể biết liệu hai yêu cầu có phải từ cùng một trình duyệt web hay không.

Do đó, **Cookie** được sử dụng để cho biết **liệu hai yêu cầu có đến từ cùng một trình duyệt web hay không**.

Trên thực tế, cookie phục vụ các mục đích sau:

* **Quản lý Session** - cookie cho phép bạn quản lý bất kỳ thông tin nào mà máy chủ cần ghi nhớ.  chẳng hạn như thông tin đăng nhập, giỏ hàng, v.v.

* **Cá nhân hóa** - cookie cho phép bạn lưu trữ thông tin người dùng, chủ đề và cài đặt cụ thể cho người dùng.

* **Theo dõi** - cookie giúp ghi lại và phân tích các hành vi của người dùng trong quảng cáo.

### 3. Chi tiết về Cookie
Cookie bao gồm các thông tin sau được lưu trữ trong trình duyệt web dưới dạng key-value (ngoại trừ cờ secure) 


|Thông tin | Giải thích  |
| -------- | -------- | -------- |
| Name  | Tên duy nhất xác định cookie. Tên cookie không phân biệt chữ hoa chữ thường. Nó có nghĩa là Usernamevà usernamelà các cookie giống nhau    |
| Value     | Giá trị chuỗi của cookie. Nó phải được mã hóa URL.  |
| Domain     |  Domain để xác nhận cookie hợp lệ    |
| Path     |  đường dẫn không có tên miền mà cookie sẽ được gửi đến máy chủ. Ví dụ: bạn có thể chỉ định rằng cookie chỉ có thể truy cập được từ trang https://www.yourwebsite.com/dom. Như vậy tại https://www.yourwebsite.com sẽ không gửi thông tin  của cookie. |
| Expiration     |   Khoảng thời gian cho biết khi nào trình duyệt web sẽ xóa cookie. Ngày hết hạn được đặt thành một ngày ở định dạng GMT: "Wdy, DD-Mon-YYYY HH: MM: SS GMT". Ngày hết hạn cho phép cookie được lưu trữ trong trình duyệt web của người dùng ngay cả sau khi người dùng đóng trình duyệt web.    |
|Secure flag|Nếu được chỉ định, trình duyệt web chỉ gửi cookie đến máy chủ thông qua kết nối SSL (https, không phải http)|

Tên, giá trị, miền, đường dẫn, thời hạn và cờ bảo mật được phân tách bằng dấu chấm phẩy và dấu cách. Chẳng hạn:
```javascript
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie:user=john
; expire=Tue, 12-December-2030 12:10:00 GMT; domain=www.yourwebsite.com; path=/dom; secure
...
```
Lưu ý rằng cờ secure là phần duy nhất không phải là một cặp key-value.

Vậy là cơ bản trong bài này mình đã tìm hiểu về Cookie là gì và tại sao mình sử dụng Cookie, mình sẽ tóm tắt các ý chính như sau:
* Cookie là một phần dữ liệu mà máy chủ gửi đến trình duyệt web. Sau đó, trình duyệt web sẽ lưu trữ cookie trong máy tính của người dùng và gửi cookie trở lại cùng một máy chủ trong các yêu cầu tiếp theo.
* Server sử dụng cookie để xác định nếu hai yêu cầu liên tiếp đến từ cùng một trình duyệt web.

OK 😀 , mời các bạn đón đọc các series trong Blog  kỹ thuật của [mình](https://viblo.asia/u/Ducmy) nhé.