![](https://images.viblo.asia/f4995dcd-b725-4b15-b17d-c6639dddc538.png)

[XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) là lỗi vẫn rất phổ biến trên ứng dụng Web. Vì vậy, trong này này ta sẽ tìm hiểu cách tìm lỗi XSS sử dụng công cụ Burp suite kết hợp cùng PhantomJS.

# Kiến thức bổ trợ

Trước khi đi vào chi tiết các sử dụng các công cụ để tìm lỗi XSS ta cần làm rõ 2 điều sau:
+ Lỗi XSS là gì?
+ PhantomJS là gì

**PhantomJS là gì?**

> PhantomJS đã không còn được phát triển nữa.
>

Bài này sẽ không nói chi tiết về PhantomJS, để cho dễ hiểu thì PhantomJS như trình duyệt của ta. Điểm đặc biệt quan trọng là PhantomJS sử dụng thông qua dòng lệnh và ta lập trình cho nó để có thể tương tác với các request và response của [HTTP/S](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

Để có thêm cái nhìn về PhantomJS hay vào bài [PhantomJS là gì?](https://viblo.asia/p/phantomjs-la-gi-QpmleAW7lrd). Hoặc đọc bằng tài liệu tiếng anh trên wiki [PhantomJS](https://en.wikipedia.org/wiki/PhantomJS).

**Lỗi XSS là gì**

Trong bài [Lỗ hổng Cross-Site Scripting (XSS)](https://viblo.asia/p/lo-hong-cross-site-scripting-xss-GrLZDOY3Kk0) đã viết đầy đủ về lỗi XSS này. Nếu chưa biết về XSS là gì, hãy qua đó đọc trước để có cái nhìn tổng quan về chúng.

# Cài đặt công cụ
## 1. Cài đặt extension XSS Validator
Nếu trên máy chưa có Burp suite hãy làm theo hướng dẫn tại trang chủ: [https://portswigger.net/support/getting-started-with-burp-suite](https://portswigger.net/support/getting-started-with-burp-suite)

Sau khi đã cài Burp, tiếp tục đến phần cài đặt extension **XSS validator**. Mở **BApp Sotre**: Extender -> BApp Store

![](https://images.viblo.asia/5d831eca-ad62-4c60-9b02-cbeca68f84fc.png)

Kết quả được hiển thị như trên hình, để cài đặt **XSS validator** ta chọn **Install**. Vậy là hoàn thành bước đầu tiên!

## 2. Cài đặt PhantomJS
Để tải và cài đặt PhantomJS vào địa chỉ sau [https://phantomjs.org/download.html](https://phantomjs.org/download.html)

PhantomJS hỗ trợ các nên tảng sau:  Windows, macOS, Linux, vàFreeBSD.

Nếu máy tính đang sử dụng là Linux thì ta có thể cài nhanh bằng câu lệnh
```bash
sudo apt install -y phantomjs
```

## 3. Tải file server chạy cho PhantomJS
Sử dụng lệnh sau để clone repo xssvalidator về
```bash
git clone https://github.com/nVisium/xssValidator.git
```

# Demo
> Trong phần này giả sử ta đã biết sử dụng cơ bản Burp suite.
> 

Đầu tiên ta phải chạy xss server.
```bash
cd xssValidator/
cd xss-detector/
phantomjs xss.js
```

Bước tiếp theo, ta chạy Burp suite và chuyển intercept sang chế độ off.

![](https://images.viblo.asia/0e25f175-97b4-4d6a-a536-6504b50f6b24.png)

Tiếp đó ta vào trang có chứa đường link nghi vấn XSS. Như trong ví dụ ở đây, ta sử dụng lab XSS của portswigger.

![](https://images.viblo.asia/5963d8d1-fde1-4cc5-a093-e0b94c5a6718.png)

Ta tiến hành điền dữ liệu và gửi, sau đó vào trong HTTP history của burp và xem thông tin request.
![](https://images.viblo.asia/26ebdeec-d78a-4537-ba6b-9c4353d0067b.png)

Gửi request chứa đường link nghi vấn XSS trang Intruder của Burp bằng cách nhấn tổ hợp phím **ctrl + R**. Chỉnh sửa lại chỉ nhận 1 payload là phần **search** trên url.

![](https://images.viblo.asia/ae0ca7ee-8f07-4838-a9cb-1f95a9da94f9.png)

Tiếp đó, ta tiến hành cấu hình [payload](https://en.wikipedia.org/wiki/Payload_(computing)) XSS. Trong tab **Payloads**, ta sửa Payload type thành **Extension-generated**

![](https://images.viblo.asia/87899e1b-28fa-4331-bc47-534e04ab95a5.png)

Sửa Payload Options, chọn **Select generator ...** và chọn XSS validator Payloads.

![](https://images.viblo.asia/5272ceaf-0227-4228-a681-309d8a7e0a19.png)

Chỉnh sửa phần **Payload Processing**, Chọn Add -> Invoke Burp extension -> XSS Validator.

![](https://images.viblo.asia/3c938ff2-8752-4b9d-9405-2427e284d75b.png)

Trong phần Options ta sử phần Grep-Math để Burp tích những payload hoạt động từ đó ta sẽ biết được link đó có bị XSS hay không. Đầu tiên clear hết nội dung, và thêm vào giá trị sau: **fy7sdufsuidfhuisdf**

![](https://images.viblo.asia/5f843484-1122-4232-b4d0-d11398342e78.png)

Cuối cùng nhấn Start để bắt đầu tấn công và kiểm tra kết quả. Nếu có xuất hiện phần tích như trong hình dưới là link đó bị lỗi XSS.

![](https://images.viblo.asia/5cf5e6b1-5c27-4cf4-9348-cb13b5e80f9a.png)

Vậy là phần tìm hiểu của ta kết đây là kết thúc!