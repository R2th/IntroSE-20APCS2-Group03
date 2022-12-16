Nhận dịp có người anh hỏi về làm thế nào để tạo mã SRI để trình duyệt hiểu thì mình cũng thử tìm kiếm một tí và thấy nó khá là hay và là kiến thức mà mình chưa từng nghĩ đến. Hôm nay mình sẽ đi tìm hiểu về Subresource Integrity (SRI). Hơi là cà một tí nhưng mà tìm cái này rồi nó lại ra Web Security cho nên mình cũng lân la viết một tí định nghĩa và giới thiệu về nó nữa :smile: .
# Giới thiệu qua về Web Security
Web security còn được biết đến như là "Cyber security" (cái này mình nghe rồi vì trong bộ phận mình có một team gọi là Cyber security =))) liên quan đến việc bảo vệ trang web hoặc ứng dụng web bằng cách phát hiện, ngăn chặn và phản ứng với các cuộc tấn công vào sản phẩm hay ứng dụng web.

Các tội phạm mạng vẫn hàng ngày tìm kiếm các lỗ hổng bảo mật web để tấn công cũng như chuộc lợi từ những lỗ hổng bảo mật. Các loại trang web thường bị đưa vào mức cảnh báo cao về khả năng bị tấn công mạng như là mạng xã hội, thương mại điện từ, trang web chính phủ ... Để tránh xảy ra những trường hợp có thể gây hậu quả nghiêm trọng cho các trang web thì cần có một hệ thống bảo mật cho các trang web. Web security tập hợp nhiều các biện pháp cũng như giao thức bảo vệ nhằm mục đích bảo vệ trang web hoặc ứng dụng web của bạn khỏi các tác nhân gây hại. 

Một số giải pháp để thực hiện bảo mật trang web như là:
* Black box testing tools
* Fuzzing tools
* White box testing tools
* Web application firewalls (WAF)
* Security or vulnerability scanners
* Password cracking tools
# Subresource Integrity (SRI) là gì?
> Subresource Integrity (SRI) là tính năng bảo mật hướng dẫn các trình duyệt xác minh các tài nguyên được cung cấp bởi bên thứ ba như CDN đã được tải xuống mà không bị tác nhân hay hành động nào ảnh hưởng đến nó. SRI có thể thực hiện được điều này là do việc so sánh các giá trị băm mà tài nguyên lưu trữ với các giá trị trong các thẻ HTML của website.
> 
![](https://images.viblo.asia/53e26490-e983-4f59-8f5a-3dd0cfd8d991.png)

Các developer thường sử dụng CDN mục đích cải thiện tốc độ, hiệu suất của ứng dụng và tiết kiệm băng thông. Đồng thời họ cũng muốn chắc chắnrằng tài nguyên nhận được chỉ phục vụ nội dung mong đợi chứ không bao gồm các mã độc hay tác nhân gây hại đến ứng dụng mà họ đang phát triển. Tuy vậy, việc sử dụng tài nguyên của bên thứ ba chưa bao giờ là an toàn và có khả năng cao bị thao túng. Hacker có quyền truy cập vào CDN có thể thao túng, chỉnh sửa tập tin. 

Các công nghệ như SSL/TLS và HSTS đảm bảo rằng các tài nguyên được tải xuống an toàn từ bên thứ ba. Tuy vậy các công nghệ này cũng không thể xác minh liệu rằng tài nguyên đã tải xuống có bị bị xâm phạm hay không. TLS và HSTS không thể ngăn chặn các cuộc tấn công ở cấp độ máy chủ mà họ chỉ có thể ngăn chặn các cuộc tấn công trong quá trình vận chuyển. Các developer sử dụng SRI để hướng dẫn cho trình duyệt rằng chỉ chạy các tập tin chưa được thay đổi và phải có đoạn mã giống như đã định nghĩa trong các thẻ HTML.

Chúng ta sử dụng tính năng SRI bằng cách chỉ định hàm băm mã hóa base64 của tài nguyên mà học dự kiến sẽ tải theo yêu cầu. Thuộc tính integrity chứa hàm băm và được thêm vào các thẻ HTML như `<link>` hay `<script>`. Chuỗi integrity này bao gồm một hàm băm được mã hóa base64 và theo sau là một tiền tố phụ thuộc vào thuật toán băm. Tiền tố này có thể là sha265, sha384 hoặc sha512.

ĐỊnh dạng của thuộc tính integrity như sau:
```html
integrity="[hash algorithm]-[base64 encoded cryptographic hash value]
```
Ví dụ với thẻ `<script>` khi sử dụng CDN là jquery như sau:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js" integrity="sha384-mXQoED/lFIuocc//nss8aJOIrz7X7XruhR6bO+sGceiSyMELoVdZkN7F0oYwcFH+" crossorigin="anonymous"></script>
```
Một khi trình duyệt bắt gặp một thẻ HTML như là `<link>` hay `<script>` với thuộc tính `integrity`, thì trước tiên nó sẽ so sánh tập tin với hàm băm dự kiến được đưa ra trong giá trị integrity. Nếu giá trị đưa ra là trùng khớp thì trình duyệt sẽ thực hiện tải tài nguyên. Nhưng nếu giá trị trong thẻ HTML không khớp với giá trị integrity của tài nguyên bên thứ ba thì trình duyệt sẽ từ chối tải tài nguyên. Và nó trả về lỗi cho biết không thể tải tài nguyên như hình dưới.

![](https://images.viblo.asia/cd5e24fe-0c3d-4e85-bcb7-f442804b5bb6.png)

Nguồn: https://www.troyhunt.com/protecting-your-embedded-content-with-subresource-integrity-sri/

Tuy vậy hãy chú ý một chút thì ngoài các thuộc tính `src` và `integrity` thì ta còn định nghĩa thêm thuộc tính `crossorigin`. Nó cho phép bạn định cấu hình các yêu cầu CORS cho dữ liệu được tìm nạp của các thẻ HTML. Các giá trị có thể là như sau:

| Giá trị | Mô tả |
| -------- | -------- |
|`anonymous`| Các yêu cầu CORS cho phần tử này sẽ có cờ xác thực đặt là  'same-origin'|
| `use-credentials`| Các yêu cầu CORS cho phần tử này sẽ có cờ xác thực đặt là  'include'|
| `""`| Không có giá trị và tương đương với `anonymous` |

Khi bạn thử xóa thuộc tính `crossorigin` đi thì trình duyệt sẽ báo như hình sau:

![](https://images.viblo.asia/5c4027ca-d258-41c3-b0c6-9753e85fb24f.png)

Nguồn: https://www.troyhunt.com/protecting-your-embedded-content-with-subresource-integrity-sri/

Thuộc tính cài đặt CORS được yêu cầu cho SRI khi yêu cầu không được gửi từ cùng một chỗ. Đặt thuộc tính này với giá trị là `anonymous` để đảm bảo không có thông tin xác thực hoặc thông tin nhận dạng nào được gửi cùng với yêu cầu (basic auth, hoặc cookie auth). 
# Tạo hàm băm
Bạn có thể dễ dàng tạo mã bằng việc sử dụng câu lệnh trên terminal. Ở [đây](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) có hướng dẫn câu lệnh bạn có thể sử dụng.

Bạn có thể tạo mã SRI từ câu lệnh với openssl:
```sh
cat FILENAME.js | openssl dgst -sha384 -binary | openssl base64 -A  
```
Hoặc sử dụng shasum:
```sh
shasum -b -a 384 FILENAME.js | awk '{ print $1 }' | xxd -r -p | base64
```
Hay sử dụng luôn công cụ online [SRI Hash Generator](https://www.srihash.org/)

![](https://images.viblo.asia/5e220ec4-cf88-4086-bc1e-04c0f2a7b336.png)

# Kết luận
SRI mang lại các lợi ích về bảo mật cho khách hàng, nhà phát triển, người truy cập, nhà cung cập CDN và các máy chủ của bên thứ ba. Nó giúp các trang web giảm thiểu nhiều rủi ro do các cuộc tấn công có thể phát sinh do tài nguyên của bên thứ ba bị xâm phậm, sửa đổi. SRI làm cho các trang web an toàn hơn trong trường hợp các developer lấy tài nguyên từ bên thứ ba để sử dụng cho ứng dụng của họ. Đấy là nơi mà họ không có quyền kiểm soát máy chủ cũng như không thể quản lý nội dung của tài nguyên. Việc sử dụng SRI sẽ mang một số lợi ích rõ ràng như sau:
* Nhiều người dùng tin tưởng vào trang web hơn.
* Nhiều developer tin tưởng vào máy chủ của bên thứ ba hơn.
* Thông báo cho các developer


Nói chung là mình cũng không biết gì về Web security cho nên là bài viết chỉ mang tính chất tìm hiểu rồi lân la ra mấy thứ có vẻ cao siêu :smiley: . Vẫn là mong ai có đọc bài thấy sai sót để mình nâng cao hơn :bowing_woman: .

**Tham khảo**

https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity