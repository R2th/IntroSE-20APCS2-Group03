Nếu bạn là tester chuyên test về kĩ thuật (technical tester)  hoặc bạn tham gia vào các dự án kiểm thử API  thì bạn cần phải làm quen với các khái niệm và thuật ngữ cơ bản về HTTP . Nếu không biết những điều cơ bản của HTTP, bạn không thể phát triển khi kiểm thử API. Trong bài viết này, chúng tôi sẽ xem xét một số thuật ngữ HTTP phổ biến nhất và ý nghĩa của chúng đối với việc kiểm thử API.

# HTTP là gì? 

![](https://images.viblo.asia/4b14f7b4-3520-427f-91c9-111ac81f194c.jpeg)

HTTP là viết tắt của Hypertext Transfer Protocol.

Nó là một giao thức truyền thông và được sử dụng để gửi và nhận các trang web và files qua internet.

HTTP hoạt động bằng cách sử dụng tác nhân người dùng (ví dụ: trình duyệt) để kết nối với máy chủ. Máy chủ phải được định vị bằng URL hoặc URI. Nó luôn luôn chứa http: // khi bắt đầu. Nó thường kết nối với cổng 80 (port 80) trên máy tính.


# HTTPS là gì? 
![](https://images.viblo.asia/9c1bb0e4-0ebc-407c-8390-bc230b4e10cf.png)https://images.viblo.asia/9c1bb0e4-0ebc-407c-8390-bc230b4e10cf.png


HTTPS là viết tắt của Hypertext Transfer Protocol Secure. Đây là phiên bản HTTP an toàn hơn và bắt đầu bằng https: // ở đầu URL. Nó mã hóa tất cả các thông tin được gửi và nhận. Điều này có thể ngăn chặn người dùng độc hại như tin tặc lấy cắp thông tin và thường được sử dụng trên các trang web thanh toán. HTTPS sử dụng cổng 443 để giao tiếp thay vì cổng 80.

![](https://images.viblo.asia/e4175887-121d-4fc3-99bd-bfb0315a1b0f.jpg)

# HTTP Request là gì? 

HTTP là viết tắt của Hypertext Transfer Protocol và là một cách gửi tin nhắn từ một máy tính đến một máy tính khác trên internet.

 HTTP Request được gửi đến một URL cụ thể và bao gồm động từ (VERB), một tập HTTP header và Nội dung hoặc Tải trọng (body or payload) 

Ví dụ về HTTP request là:


```
GET https://www.testingexcellence.com/ HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/plain
Host: testingexcellence.com
User-Agent: Apache-HttpClient/4.5.4 (Java/1.8.0_144)
Accept: text/html,application/xhtml+xml
```


# URL
URL là một Trình định vị tài nguyên đồng nhất và là địa chỉ sử dụng để truy cập các trang web và ứng dụng web. Các URL thường xảy ra nhất để tham khảo các trang web (http), nhưng cũng được sử dụng để chuyển tệp (ftp), email (mailto) và các ứng dụng khác.

Hầu hết các trình duyệt web hiển thị URL của trang web phía trên trang trong thanh địa chỉ. Một URL điển hình có thể có dạng https://www.testingexcellence.com/index.html, biểu thị http giao thức, tên máy chủ www.testingexcellence.com và tên file index.html.


# Động từ yêu cầu ( Request verbs)
Động từ yêu cầu ( Request verbs) chỉ định loại yêu cầu, ví dụ: GET, POST, PUT, DELETE.

Trình duyệt web thường sẽ thực hiện các yêu cầu GET và các yêu cầu POST, trong khi khi làm việc với các API HTTP, các động từ HTTP thông thường được sử dụng là: GET, POST, PUT, DELETE.

Yêu cầu GET, như tên cho thấy, yêu cầu tài nguyên hoặc đọc thông tin từ máy chủ, ví dụ: nhấp vào liên kết. Yêu cầu GET hiển thị trong thanh địa chỉ của trình duyệt.

Mặt khác, yêu cầu POST cung cấp thông tin cho máy chủ, ví dụ: gửi biểu mẫu đăng nhập hoặc đăng ký. Để tạo một thực thể, chúng tôi sẽ sử dụng các yêu cầu POST. Ngoài ra, các yêu cầu POST không hiển thị trong thanh địa chỉ của trình duyệt.

Yêu cầu PUT được sử dụng để cập nhật thông tin trên máy chủ. Ví dụ, một người dùng hiện tại muốn cập nhật mật khẩu của mình, sau đó một yêu cầu PUT được sử dụng.

Yêu cầu DELETE xóa thông tin trên máy chủ.

Cả hai yêu cầu POST và PUT thường có phần thân yêu cầu. GET và DELETE sẽ không.

![](https://images.viblo.asia/5ef98a14-0d28-4ea4-bc8a-4c736c55fc20.png)https://images.viblo.asia/5ef98a14-0d28-4ea4-bc8a-4c736c55fc20.png

## Sự khác nhau giữa PUT và PATCH Request 
PUT và PATCH  đều liên quan đến việc cập nhật tài nguyên.

Sự khác biệt chính giữa các yêu cầu PUT và PATCH là cách máy chủ xử lý thực thể kín để sửa đổi tài nguyên được xác định bởi Request-URI.

Trong một yêu cầu PUT, thực thể đính kèm được coi là phiên bản đã sửa đổi của tài nguyên được lưu trữ trên máy chủ gốc và máy khách đang yêu cầu thay thế phiên bản đã lưu trữ.

Tuy nhiên, với PATCH, thực thể kèm theo chứa một tập hợp các hướng dẫn mô tả cách một tài nguyên hiện đang cư trú trên máy chủ gốc nên được sửa đổi để tạo ra một phiên bản mới.

Ngoài ra, một sự khác biệt là khi bạn muốn cập nhật một tài nguyên với yêu cầu PUT, bạn phải gửi toàn bộ tải trọng theo yêu cầu trong khi với PATCH, bạn chỉ gửi các tham số mà bạn muốn cập nhật.

Giả sử chúng ta có một tài nguyên chứa tên và họ của một người.

Nếu chúng tôi muốn thay đổi tên đầu tiên thì chúng tôi sẽ gửi yêu cầu PUT để cập nhật

Ví dụ: 

`{ "first": "Michael", "last": "Angelo" }`

Ở đây, mặc dù chúng ta chỉ thay đổi first name, với yêu cầu PUT, chúng ta phải gửi cả hai tham số đầu tiên và cuối cùng.
Nói cách khác, nó là bắt buộc để gửi tất cả các giá trị một lần nữa, trọng tải đầy đủ.

Tuy nhiên, khi  gửi yêu cầu PATCH, chỉ gửi dữ liệu mà ta muốn cập nhật. Nói cách khác, chỉ gửi firstname để cập nhật, không cần phải gửi lastname.

Vì lý do này, yêu cầu PATCH yêu cầu băng thông ít hơn.

# Request header 
Yêu cầu tiêu đề xác định thông tin như loại Trình duyệt, loại nội dung trong message và loại phản hồi (reponse) nào được chấp nhận.

Ví dụ

```
Content-Type: text/plain
User-Agent: Apache-HttpClient/4.5.4 (Java/1.8.0_144)
```

# Request Body / Payload

Tải trọng (payload) là phần thân (body) của yêu cầu (request) hoặc phản hồi (response) HTTP.

Một request body có thể là văn bản thuần túy, HTML, XML, JSON, Javascript hoặc một tập hợp các cặp khóa-giá trị dưới dạng dữ liệu biểu mẫu.

Khi duyệt Web, Trình duyệt thường nhận được tải trọng HTML. Đây là trang web mà bạn thấy được hiển thị trong Trình duyệt.

Thông thường khi làm việc với một API HTTP, chúng tôi sẽ gửi và nhận các tải trọng JSON hoặc XML.

Không phải tất cả các message HTTP đều có thể có tải trọng: POST và PUT có thể có tải trọng, GET và DELETE không có.

# HTTP response là gì? 

Khi một yêu cầu được gửi đến một máy chủ, máy chủ trả về một phản hồi. Phản hồi từ máy chủ cho bạn biết liệu yêu cầu của bạn có thành công hay không hoặc nếu có sự cố.

Phương thức phản hồi HTTP được tạo thành từ ba thành phần: Mã trạng thái phản hồi, tiêu đề phản hồi, nội dung phản hồi.

Ví dụ 

```
HTTP/1.1 200 OK
Content-Length: 859
Content-Type: text/html; charset=utf-8
Date: Fri, 23 Feb 2018 14:38:21 GMT
Server: Werkzeug/0.14.1 Python/3.6.3
```

Dòng 1 là mã trạng thái và thông báo phản hồi, dòng 2-5 là các tiêu đề phản hồi và XML là phần trả lời.

![](https://images.viblo.asia/ec0176c1-fe5f-45cd-8437-24758926c441.png)https://images.viblo.asia/ec0176c1-fe5f-45cd-8437-24758926c441.png


Mã trạng thái phản hồi (Respóne status codes)
2xx : thành công, phổ biến nhất là 200 có nghĩa là "OK".
3xx :Chuyển hướng (redirection) , phổ biến nhất là 301 và 303 có nghĩa là "Chuyển hướng vĩnh viễn" và "Chuyển hướng vì lý do không xác định”.
4xx : Lỗi ứng dụng, các lỗi phổ biến nhất là 403 và 404 có nghĩa là "Bị cấm" và "Không tìm thấy".
5xx : Lỗi Máy chủ, lỗi phổ biến nhất là 500 có nghĩa là "Lỗi Máy chủ".



# API là gì 

API là giao diện lập trình ứng dụng (Application Programming Interface). Đây là một giao diện cho một ứng dụng được thiết kế cho các hệ thống máy tính khác để sử dụng. Trái với giao diện người dùng đồ họa (GUI) được thiết kế cho con người sử dụng.

Hầu hết các API hiện đại đều dựa trên HTTP và được sử dụng để truy cập các ứng dụng web được triển khai cho các máy chủ có thể truy cập qua Internet.

# Web service là gì? 

Các ứng dụng được truy cập thông qua API HTTP thường được gọi là Dịch vụ web (web service) . Nói cách khác, một dịch vụ web là một chức năng có thể được truy cập bởi các chương trình khác trên web (HTTP).

# JSON là gì? 

JSON là viết tắt của JavaScript Object Notation và g là mã JavaScript hợp lệ.

Ví dụ 

```
{
   "employers":{
      "employee":[
         {
            "id":1,
            "name":"Dan Brown",
            "position":"Director",
            "status":"active",
         }
      ]
   }
}
```   



JSON có thể được coi là một tập hợp các cặp khóa / giá trị phân cấp, trong đó giá trị có thể là:

Đối tượng (Object ) - được giới hạn bởi {và}
Mảng (Array)  - được giới hạn bởi [và]
Chuỗi (String)- được phân cách bởi "và"
Số nguyên (Integer)
Một mảng là một danh sách các đối tượng hoặc các cặp khóa / giá trị. Các khóa là các giá trị Chuỗi, ví dụ: “Nhân viên”, “id”, “tên”, v.v.


Bài viết được dịch lại từ nguồn:  

https://www.testingexcellence.com/http-basics/
HTT
https://www.testingexcellence.com/difference-put-patch-requests/