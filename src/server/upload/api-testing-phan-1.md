## API testing là gì?
![](https://images.viblo.asia/9f39669f-8e55-48c6-8ffe-3169c5cd75ab.png)

API là từ viết tắt của Application Programming Interface: là một giao diện máy tính cho phép giao tiếp và trao đổi dữ liệu giữa hai hệ thống phần mềm riêng biệt. Hệ thống phần mềm thực thi một API bao gồm một số chức năng / chương trình con mà một hệ thống phần mềm khác có thể thực hiện. API xác định các yêu cầu có thể được thực hiện, cách thực hiện các yêu cầu, các định dạng dữ liệu có thể được sử dụng, v.v. giữa hai hệ thống phần mềm.

Trong mô hình nổi tiếng nhất trong mạng máy tính : client - server, API là cầu nối giữa client và server, là phương thức để server và client có thể "giao tiếp" và phản hồi qua lại.

Kiểm thử API là việc kiểm tra trực tiếp các API - từ chức năng, độ tin cậy, hiệu suất đến bảo mật của chúng. Là một phần của chu trình kiểm thử tích hợp, mục đích chính của kiểm thử API là kiểm tra logic hoạt động trong một khoảng thời gian ngắn. Trong kiểm thử API, thay vì sử dụng đầu vào (nhập từ bàn phím) và đầu ra tiêu chuẩn của người dùng, người kiểm thử sẽ sử dụng các công cụ hỗ trợ để gửi lệnh gọi đến API, nhận đầu ra và ghi lại phản hồi của hệ thống. Kiểm tra API rất khác với Kiểm tra GUI và sẽ không tập trung vào giao diện của một ứng dụng. Nó chủ yếu tập trung vào lớp logic nghiệp vụ của kiến trúc phần mềm.

## Lợi ích của API testing

**Không phụ thuộc vào ngôn ngữ sử dụng**

Dữ liệu được chuyển đổi thành các định dạng XML và JSON, do đó bất kì ngôn ngữ nào cũng có thể được sử dụng. Bên cạnh đó cũng có những thư viện được tích hợp sẵn hỗ trợ việc so sánh dữ liệu sử dụng các định dạng này.

**Không phụ thuộc GUI**

Kiểm thử API có thể được thực hiện trên ứng dụng trước khi có giao diện ứng dụng. Các chức năng chính của hệ thống được kiểm tra để phát hiện lỗi và đánh giá độ ổn định của hệ thống. Điều này giúp việc kiểm thử được thực hiện sớm, giúp cho các phản hồi nhận được sớm hơn, nhằm tăng hiệu quả của sản phẩm.

**Tăng độ bao phủ test**

Hầu hết các API/ dịch vụ web đều có đặc tả, cho phép người kiểm thử có thể tạo được các kịch bản kiểm thử có độ bao phủ cao, bao gồm cả kiểm thử chức năng và kiểm thử phi chức năng.

## Các loại API testing

1.  Kiểm tra validate
2.  Kiểm thử chức năng
3.  Kiểm thử giao diện
4.  Kiểm thử bảo mật
5.  Kiểm thử mức độ chịu tải
6.  Kiểm thử thời gian chạy và phát hiện lỗi
7.  Kiểm thử thâm nhập (Penetration testing)
8.  Fuzz testing (một phương thức kiểm thử nhập một lượng lớn dữ liệu ngẫu nhiên vào hệ thống để phát hiện các trường hợp có thể bị crash hoặc các hành vi bất thường của hệ thống)

# Cách hoạt động của API testing
Để hiểu rõ hơn cách API testing hoạt động như thế nào, trước tiên hãy tìm hiểu các thành phần của API

## Protocol

Là tập hợp tất cả các quy ước, quy tắc để đảm bảo các máy tính trong mạng có thể giao tiếp với nhau gọi là giao thức. Một số giao thức phổ biến như TCP/IP, SPX/IPX, v.v...

Trong các ứng dụng web, giao thức được sử dụng là HTTP (Hyper Text Transfer Protocol), và nó là giao thức được dùng cho các API

## Hoạt động của http

Http (Hyper text transfer protocol) - Giao thức truyền tin siêu văn bản, là nền tảng của world wide web (www) cho phép tìm nạp tài nguyên trên web hay sự truyền tải giữa client và server. Giao thức http còn là một giao thức yêu cầu - phản hồi (request - response) dựa trên cấu trúc client - server

![](https://images.viblo.asia/b559d3a2-30dc-4663-9c1b-db3dad3eac5e.png)

Một API được xây dựng chính trên 2 thành phần: request - response
**1. HTTP request**

Mỗi HTTP request được thực hiện trên Internet đều mang theo một chuỗi dữ liệu mã hóa mang các loại thông tin khác nhau.

Một HTTP request điển hình bao gồm:

**URL**: đường dẫn đến địa chỉ trang web cần thực hiện test

**HTTP method**: phương thức HTTP (đôi khi còn được gọi là HTTP verbs), để chỉ ra các action mà các request mong muốn thực hiện từ server

Các HTTP method thường dùng nhất là:
* GET: Yêu cầu server trả về một resource
* POST: Yêu cầu server tạo ra một resource mới
* PUT: Yêu cầu server sửa các resource đã có trên hệ thống
* DELETE: Yêu cầu server xóa một resource nào đó trong hệ thống

**Headers**: Các HTTP headers bao gồm các thông tin được lưu trữ dưới dạng cặp key - value, và được bao gồm trong mọi HTTP request. Các header này truyền đạt những thông tin cốt lõi, chẳng hạn như thông tin về trình duyệt client đang sử dụng...

Ví dụ một HTTP request header của một yêu cầu trên Google Chrome:

![](https://www.cloudflare.com/img/learning/ddos/glossary/hypertext-transfer-protocol-http/http-request-headers.png)

**Body**: Phần body của một request bao gồm các nội dung thông tin của request đang được truyền đi, chẳng hạn như username và password, hay bất kỳ data nào được nhập vào form.

**2. HTTP response**

Một HTTP response là những gì web client (thường là trình duyệt) nhận được từ một server Internet, như một phản hồi cho request mà client đã gửi đến server trước đó.\

Cấu trúc của một HTTP response khá giống với HTTP request, bao gồm

* Status code (Có thể tham khảo bài viết riêng về status code để hiểu rõ hơn)
* Headers
* Body