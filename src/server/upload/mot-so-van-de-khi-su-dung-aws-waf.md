"Em ơi, chị thực hiện tìm kiếm bị trả về lỗi 403", "Anh ơi, em không submit được form đăng ký có ảnh upload đính kèm", .... là một trong những câu hỏi gần đây mình gặp phải sau khi deploy ứng dụng web trên nền tảng Amazone Web Service (AWS). Tại sao ư ? Do tính năng còn bug hay vấn đề nằm ở server, khi mà mọi thứ hoạt động đúng dưới local machine và không hề có error log trên server ? Cuối cùng, mình đã "ngã ngửa" ra khi biết nguyên nhân nằm ở chính dịch vụ WAF (Web Application Firewall) được thiết lập trên server.

Giới thiệu qua thì WAF là một dịch vụ tường lửa dành riêng cho các ứng dụng web của AWS. Thông qua các bộ quy tắc (ruleset), WAF giúp phòng tránh các rủi ro về bảo mật và một số kiểu tấn công mạng phổ biến như XSS, SQL Injection,,...

Vậy một dịch vụ tốt như vậy tại sao lại làm lỗi tính năng của ứng dụng ? Khi kiểm tra request log của WAF, mình phát hiện ra rằng một số request đã bị chặn do vi phạm rule của AWF. Và đường nhiên, tính năng của ứng dụng chỉ bị lỗi trong một số trường hợp nhất định. Từ đó có thể kết luận rằng WAF đã phát hiện một số request là độc hại hoặc "hiểu lầm" một request thông thường là độc hại (false positive). Hệ quả là một response với status code 403 được trả về client.

Cách đơn giản nhất trong các tình huống trên là vô hiệu hóa rule tương ứng của WAF. Tuy nhiên, vấn đề bảo mật sẽ cần được cân nhắc trước khi vô hiệu.

Bài viết này sẽ điểm qua một số WAF rule phổ biến và các phương án bảo mật thay thế khi vô hiệu hóa những rule này.

### SizeRestrictions_BODY
> Verifies that the request body size is at most 10,240 bytes.


Chặn các request có nội dung hơn 10KB.

Đối với các ứng dụng có liên quan đến upload ảnh với kích thước lớn, chúng ta có thể cân nhắc vô hiệu rule này và thực hiện validate ở tầng ứng dụng. Ngoài ra, có thể kết hợp validate ở phía client để giảm tải cho phía server.

### GenericLFI_QUERYARGUMENTS, GenericLFI_BODY
> GenericLFI_QUERYARGUMENTS
> 
> Inspects for the presence of Local File Inclusion (LFI) exploits in the query arguments. Examples include path traversal attempts using techniques like ../../.

> GenericLFI_BODY
> 
> Inspects for the presence of Local File Inclusion (LFI) exploits in the request body. Examples include path traversal attempts using techniques like ../../.


Chặn các request có chứa nội dung với nguy cơ tấn công LFI.

LFI là một dạng tấn công mà hacker có thể lợi dụng ứng dụng web để truy cập hoặc thực thi các file nhạy cảm trên server thông qua việc truyền các đoạn mã duyệt thư mục. Ví dụ như `../..`

Đối với các ứng dụng PHP, có thể phòng tránh kiểu tấn công này bằng cách vô hiệu tùy chọn `allow_url_include` trong config của `php`

```ini
allow_url_include = Off
```

### GenericRFI_QUERYARGUMENTS, GenericRFI_BODY

> GenericRFI_QUERYARGUMENTS
> 
> Inspects the values of all query parameters and blocks requests attempting to exploit RFI (Remote File Inclusion) in web applications. Examples include patterns like `://`.

> GenericRFI_BODY
> 
> Inspects the values of the request body and blocks requests attempting to exploit RFI (Remote File Inclusion) in web applications. Examples include patterns like `://`.

Chặn các request có chứa nội dung với nguy cơ tấn công RFI.

Tương tự với tấn công LFI (Local File Inclusion), đây cũng là một dạng tấn công theo phương thức truyền mã độc để thực hiện những tác vụ không được phép.
+ Một ví dụ về script độc hại theo dạng RFI: trong nội dung của request có chứa ký tự `://`
+ Điểm khác so với LFI: thay vì chèn mã độc để truy cập vào các file hệ thống, RFI sẽ truyền vào đường dẫn của những file ở hệ thống khác:

  `https://malicious.domain/bad-scripts.php`
  
Đối với các ứng dụng PHP, có thể phòng tránh kiểu tấn công này bằng cách vô hiệu tùy chọn `allow_url_include` trong config của `php`

```ini
allow_url_fopen = Off
```

> Chú ý: Khi vô hiệu tùy chọn này, tính năng mở remote URLs trên PHP sẽ không hoạt động. Do đó, cần kiểm tra thư viện hay hàm hiện tại có sử dụng hàm `fopen` hay không (ví dụ, thư viện `AWS SDK for PHP`). Giải pháp thay thế là sử dụng php-extension `curl` và dùng `curl` để thực hiện lấy dữ liệu từ remote URLs.

### CrossSiteScripting_QUERYARGUMENTS, CrossSiteScripting_BODY

> Inspects the value of query arguments and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in AWS WAF. Example patterns include scripts like <script>alert("hello")</script>.

Chặn các request có chứa nội dung với nguy cơ tấn công XSS.

Đây là kiểu tấn công mà hacker truyền các script để thực hiện các ý đồ xấu trên ứng dụng bị tấn công, như ăn cắp thông tin tài khoản, chuyển hướng người dùng đến trang web độc hại,...

Đối với framework Laravel, có thể phòng tránh dạng tấn công này nhờ sự hỗ trợ của cú pháp escape string `{{ }}`. Tuy nhiên, để giải quyết tận gốc, dữ liệu được lưu vào database cần được escape trước đó. Ngoài ra, khi hiển thị các nội dung từ phía người dùng nhập vào, cần kiểm tra và xử lý kỹ càng và đầy đủ các trường hợp có thể xảy ra.

Nếu không chắc chắn trong việc đảm bảo phòng tránh XSS ở tầng ứng dụng thì không nên vô hiệu rule này.

### EC2MetaDataSSRF_BODY

> Inspects for attempts to exfiltrate Amazon EC2 metadata from the request body.

Chặn các request có nguy cơ tấn công SSRF thông qua metadata.

Rule này có thể "hiểu nhầm" một file thông thường chứa nội dung độc hại, khi phân tích dữ liệu bất thường bên trong metadata của file.

Nếu không có phương án phòng tránh thay thế, chúng ta không nên vô hiệu hóa rule này.

Thay vào đó, có thể can thiệp bằng cách loại bỏ metadata của file thông qua các công cụ về `exif`

### SQLi_BODY

> Uses the built-in AWS WAF SQL injection match statement to inspect the request body for patterns that match malicious SQL code.

Chặn các request có nguy cơ tấn công SQL Injection.

Đối với các framework mới hiện nay, kiểu tấn công này có thể phòng tránh, nhưng không đảm bảo hoàn toàn. Do đó, chúng ta vẫn nên thiết lập rule này trong WAF.

Một trường hợp hy hữu mà rule này có thể hiểu nhầm (false positive) request là độc hại khi thực hiện upload file ở dạng binary. Giải pháp có thể thực hiện là mã hóa file về dạng base64 hoặc nén file trước khi upload.

> Chú ý: Cần đảm bảo file trước khi mã hóa hoặc nén không phải là file độc hại. Nếu không, cần thực hiện các biện pháp bảo mật sau khi giải mã hoặc giải nén file.

## Kết luận
Trên đây chỉ là một vài trường hợp mà việc sử dụng WAF gây xung đột hoặc làm ứng dụng hoạt động không như mong muốn. Do đó, trước khi thiết lập một rule tường lửa nào đó, cần cân nhắc các kịch bản dữ liệu có thể xảy ra để tránh những sự cố không đáng có.

## Tham khảo

AWS, [AWS Managed Rules rule groups list](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html)

Srinivas, [PHP Lab: File Inclusion attacks](https://resources.infosecinstitute.com/topic/php-lab-file-inclusion-attacks/)

PHP, [Runtime Configuration](https://www.php.net/manual/en/filesystem.configuration.php)

AWS, [How do I upload files that are blocked by AWS WAF?](https://aws.amazon.com/premiumsupport/knowledge-center/waf-upload-blocked-files/)