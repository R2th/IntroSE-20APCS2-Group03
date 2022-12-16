## 0. Mở đầu

XXE (XML external entity) injection là một lỗ hổng đã có từ lâu và hiện tại độ phủ sóng của XML trên các Web Application cũng đã giảm đi đôi chút. Dù vậy, đây là một lỗ hổng một khi đã xuất hiện thì đều được đánh giá ở mức độ nghiêm trọng. Và có một sự thiếu sót nhẹ khi mình search trên Viblo về XXE thì không thấy bài viết nào về nó cả, không phải ngẫu nhiên mà năm 2017, XXE đứng top 4/10 trong top Top 10 Web Application Security Risks của [OWASP](https://owasp.org/www-project-top-ten/) !

![](https://images.viblo.asia/23d971a9-578f-43ec-a84b-bf2d442c44a8.png)


## 1. Về XML

Mình định trích dẫn định nghĩa về XML trên [wikipedia](https://vi.wikipedia.org/wiki/XML) về, nhưng có vẻ hơi phức tạp. Nên mình trích dẫn về XML từ W3School tại đường dẫn [này](https://www.w3schools.com/xml/).

```
XML stands for eXtensible Markup Language.

XML was designed to store and transport data.

XML was designed to be both human- and machine-readable.
```

Vậy XML được dịch nôm ra là ngôn ngữ đánh dấu mở rộng, được thiết kế với mục đích lưu trữ, truyền dữ liệu và cả người và "máy" đều có thể đọc được.

Cụ thể hơn, chúng là những file có đuôi (extension)  **.xml** , nó giúp đơn giản hóa việc chia sẻ dữ liệu giữa các hệ thống khác nhau, vì thế nên có rất nhiều ngôn ngữ đánh dấu hay các ứng dụng khác dựa trên XML với những mục đích khác nhau (Ví dụ: RDF, RSS, MathML, XHTML, SVG,...); và đương nhiên phần extension của file cũng sẽ khác đi. Nhưng về bản chất đều thông qua việc sử dụng các thẻ xác định cấu trúc tài liệu cũng như cách tài liệu được lưu trữ, đọc và vận chuyển.

Ví dụ:


![](https://images.viblo.asia/c84b923c-ce62-4fee-9b1e-5f0b3e9e7b01.png)


Dòng đầu tiên là Khai báo XML (XML declaration), nó nên có chứ không bắt buộc phải có. Ở phần thân, cứ một cặp thẻ mở-đóng trong XML tạo thành một phần tử, và các phần tử này lồng nhau tạo nên cấu trúc dạng cây. Đương nhiên sẽ có những quy định về cú pháp, cách khai báo, cách lồng các phần tử, thêm thuộc tính cho các thẻ..., nhưng đó không phải là chủ đề chính của bài viết này.



## 2. Về External Entity trong XML

Khai báo external entity chính là điểm mấu chốt trong kỹ thuật tấn công XXE. Vậy nó là gì ?

### 2.1 DTD

Trước tiên hãy tìm hiểu về DTD (document type definitions) - dịch nôm ra DTD dùng để "định nghĩa loại tài liệu" thông qua việc xác định cấu trúc cũng như chỉ ra format hợp lệ của các elements và attributes trong file xml. 

Nếu DTD được định nghĩa luôn bên trong file **xml**, nó được gọi là **Internal DTD**. Còn ví dụ dưới đây là ví dụ về một **External DTD**. Tức là bản thân DTD là một file, nằm ngoài file xml. Ví dụ từ [w3schools](https://www.w3schools.com/xml/xml_dtd.asp):

![](https://images.viblo.asia/7352cd09-713d-4501-b235-60d2acebd237.png)

Vậy là trong file XML này, ngoài phần **XML declaration** như ví dụ ở phần 1, còn có thêm phần **DOCTYPE declaration**. Phần này chứa một reference tới một DTD file có tên **Note.dtd**. Nội dung của nó:

![](https://images.viblo.asia/9b226c03-97b2-43be-9f17-be00852b82f7.png)


Nội dung file Note.dtd chỉ ra một số ràng buộc nhất định với file **.xml**. Ví dụ như mỗi *note* element phải bao gồm những elements khác bên trong nó: to,from,heading,body hay xác định các elements nào phải thuộc loại nào (ở đây là #PCDATA - parsed character data - hiểu đơn giản là data ở dạng text). 

Vậy DTD giúp các file **xml** thống nhất một standard/format xác định, từ đó dễ dàng hơn trong việc xác định cấu trúc của dữ liệu, đặc biệt khi chuyển file từ nơi này sang nơi khác, người sử dụng có thể sử dụng DTD để verify lại file xml có giống như standard/format mong muốn hay không.

Ngoài DTD ra, thì file xml còn có thể được "definition" bởi một kiểu khác là XML Schema Definition (XSD) - định nghĩa theo lược đồ. Nhưng chỉ có DTD gây ra lỗi XXE Injection.

### 2.2 DTD Entity

Chúng ta có thể hiểu đơn giản DTD Entity giống như những biến trong lập trình vậy.

DTD Entity cũng có internal và external !

Hãy xem ví dụ về Internal DTD Entity:


![](https://images.viblo.asia/c846bbfd-5231-4f94-93c8-0001a4a66226.png)



Ví dụ về External DTD Entity:


![](https://images.viblo.asia/a3ce7d1b-204c-42cb-8c74-668447264d09.png)



### 2.3 External Entity

Để xử lý được file xml, mọi ứng dụng đều cần phải có một XML parser (còn được gọi là XML processor) để xử lý file xml và đưa ra output. 
Khi chúng ta khai báo một entity, parser sẽ tự động thay thế giá trị của entity vào nơi entity được khi báo.

Request:

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY bar SYSTEM "file:///c:/boot.ini" >]>
<foo>&xxe;</foo>
```



Response:

```
[boot loader]
timeout=5
default=multi(0)disk(0)rdisk(1)partition(1)\WINDOWS
[operating systems]
```


Chúng ta có thể thấy trong phần **DOCTYPE declaration**, ngoài khai báo những elements , nó khai báo thêm một URI (trong XML thì URI được hiểu là một *system identifier*) trỏ đến file **c:/boot.ini**. External entity được đặt tên **bar** và được chỉ định trả về thông qua **<foo>&xxe;</foo>**

Đến đây thì khái niệm về External Entity đã tương đối rõ ràng. Câu hỏi là nó có thể làm được gì ?

#### 2.3.1 Denial of service

Đây là một kiểu tấn công mang tên [Billion laughs attack](https://en.wikipedia.org/wiki/Billion_laughs_attack). Thực tế đây mới chỉ là Internal entity. Ví dụ từ wikipedia:

![](https://images.viblo.asia/f453e2d0-a540-4907-88a3-368cb71fc6ad.png)


Gọi entity **lol9** với cú pháp **&lol9**, trông có vẻ vô hại, nhưng từ **lol9** đến **lol** đã là 10^10 lần từ "lol" được gọi đến lần lượt thông qua các entity, tương đương 1.000.000.000 chữ "lol" cần được parser xml xử lý. Điều này khiến over load parser và dẫn đến DoS.

#### 2.3.2 File Disclosure

Bạn có còn nhớ syntax của External DTD Entity ở phía trên?

```xml
Syntax:
<!ENTITY name SYSTEM "URI/URL">
```

Tại đây, nếu hacker khai báo một URI (hay với XML thì được gọi là system identifier) và parser được cấu hình để xử lý các external entities thì có thể dẫn tới những vấn đề rất lớn.

Request:

![](https://images.viblo.asia/0357bbd9-5cbd-4e86-92b2-637023bacd6f.png)


Response:

![](https://images.viblo.asia/349536a4-048c-4637-b36b-6013303f210c.png)


#### 2.3.3 SSRF

Thay payload phía trên bằng:

Request:

![](https://images.viblo.asia/2d795dbf-57ec-4c3b-93c8-4c41a21657f2.png)

Response:

![](https://images.viblo.asia/34115991-952c-43bd-a834-1f385171f507.png)


#### 2.3.4 Access Control Bypass (Loading Restricted Resources — ví dụ với PHP)

![](https://images.viblo.asia/e30ab310-3419-4c4d-92b7-b4d2abae452d.png)

...

Tham khảo thêm tại [đây](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection).
## 3. Ví dụ và kết luận

Mình lấy ví dụ từ một số bài lab của [portswigger.net](https://portswigger.net/) - một công ty nổi tiếng với rất nhiều research, article, software và đặc biệt là các bài labs được tạo ra rất chuyên nghiệp. 

Ví dụ về File Disclosure:

Request dùng để kiểm tra số lượng sản phẩm hiện có:

![](https://images.viblo.asia/b204eca5-995b-4bd5-9b85-f67f7aa2ca11.png)

Response:

![](https://images.viblo.asia/9db7305b-2bfd-4a77-9c22-d126562c2c0e.png)

Chỉnh sửa request:

![](https://images.viblo.asia/60f57e7e-0921-4eef-bed8-15adb3ece5fb.png)

Và response nhận về là nội dung file ở URI chúng ta định nghĩa ở trên:

![](https://images.viblo.asia/35e35483-4dcc-4de1-8cb9-0dcf423e1fc5.png)

Đời không như mơ và cuộc sống cũng không dễ thở. Thực tế để khai thác thành công XXE cần nhiều kỹ thuật hơn là copy - paste những payload như trên. Những kỹ thuật có thể kể đến như Out-of-band XML External Entity (OOB-XXE), Blind XXE... và đặc biệt nếu ứng dụng được config như thế này thì chịu:

![](https://images.viblo.asia/349ca00e-fafd-4259-a7e4-1d02bb3a7406.png)

Lỗi nằm ở Server-side và ảnh hưởng là rất rõ ràng. Vì vậy nếu ứng dụng của bạn có sử dụng XML hay những Markup Language, ứng dụng khác dựa trên XML để process, gửi nhận dữ liệu... thì hãy chắc chắn rằng chúng không mắc phải lỗ hổng nghiêm trọng này !

## 4. Tài liệu tham khảo

https://www.w3schools.com/xml/

https://vi.wikipedia.org/wiki/XML

https://www.w3schools.com/xml/xml_dtd.asp

https://portswigger.net/web-security/xxe

https://www.tutorialspoint.com/dtd/dtd_entities.htm

https://www.youtube.com/watch?v=DREgLWZqMWg

https://www.acunetix.com/blog/articles/xml-external-entity-xxe-vulnerabilities/

https://en.wikipedia.org/wiki/Billion_laughs_attack

https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection