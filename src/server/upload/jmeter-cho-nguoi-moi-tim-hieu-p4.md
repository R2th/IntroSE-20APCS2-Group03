Ở bài trước mình đã trình bày một cách sử dụng JMeter khá cơ bản, hãy để tìm hiểu một cách hoàn thiện hơn. [Tải xuống Ví dụ JMX](https://octoperf.com/img/blog/jmeter-tutorial/jpetstore.zip) và mở nó trong JMeter của bạn.

Tại sao chúng ta quan tâm đến ví dụ này? Bởi vì nó bao gồm chủ đề quan trọng nhất liên quan đến test tải: [Các tham số động](https://octoperf.com/tutorials/designing-your-first-dynamic-vu/).

# Kịch bản nâng cao
Những gì sẽ có và tìm hiểu tại đây:
* Trích xuất dữ liệu từ phản hồi của server sử dụng [Regular Expression Extractor](https://octoperf.com/blog/2017/09/07/jmeter-regular-expression-extractor/)
* Từ chối các biến được trích xuất thành các yêu cầu tiếp theo
* Thiết kế một người dùng ảo với các tham số/hành động là động(dynamic)

Đối với điều này, chúng tôi sẽ sử dụng [ứng dụng JPetstore Demo](https://petstore.octoperf.com/actions/Catalog.action) của chúng tôi.
## JPetstore JMX
Bạn có thể  [tải về ví dụ JMX](https://octoperf.com/img/blog/jmeter-tutorial/jpetstore.zip)  và mở nó với Jmeter của bạn.
![](https://images.viblo.asia/9c48d8b4-45bd-46c8-aff5-2b818fd5aba2.png)

*JPetstore Buyer*

Vậy, người mua JPetStore làm gì? Điển hình là:
Đăng nhập vào tài khoản của anh ấy,
* Xem danh mục,
* Chọn một danh mục ngẫu nhiên,
* Chọn một sản phẩm ngẫu nhiên từ danh mục đã chọn trước đó,
* Thêm sản phẩm vào giỏ hàng,
* Đặt hàng sản phẩm trong giỏ hàng,
* Đăng xuất.

Đó là một mô phỏng khá phổ biến cho một cửa hàng trực tuyến Thương mại điện tử. Và hãy cùng xem những gì có trong ThreadGroup:
* DNS Cache Manager: cấu hình cài đặt DNS của người dùng,
* HTTP Cookie Manager: cho phép quản lý cookie(bắt buộc để xử lý session người dùng),
* HTTP Cache Manager: mô phỏng hành vi của trình duyệt lưu trữ các yêu cầu để tăng tốc độ tải trang,
* Accounts CSV Data Set Config: trỏ đến tệp csv tài khoản.csv chứa tất cả thông tin đăng nhập và mật khẩu của người dùng mô phỏng,
* 01, 02, … etc: Các giao dịch kinh doanh có chứa các Yêu cầu HTTP đến Petstore.

HTTP Request được nhóm trong các bộ điều khiển giao dịch để cung cấp các số liệu có ý nghĩa trong quá trình test tải. Chúng tôi thường quan tâm để xem mất bao lâu để tạo ra một đơn hàng chẳng hạn.

## Accounts CSV
Trên một cửa hàng thương mại điện tử, mỗi khách hàng có tài khoản riêng. Vì vậy, chúng ta cần phải mô phỏng điều đó.
![](https://images.viblo.asia/3da49be2-2bfd-41dd-aa9f-81fd026c87d6.png)

*JPetStore Accounts CSV*

Để thực hiện việc này với JMeter, chúng tôi thêm [Cấu hình bộ dữ liệu CSV](https://octoperf.com/blog/2017/12/14/multiple-user-login-jmeter/). Nó trỏ đến tệp csv chứa các dòng sau:
```
user1,pass1
user2,pass2
user3,user3
user4,pas4
j2ee,j2ee
```

Như bạn có thể thấy, nó đã được cấu hình để đặt các biến `account` và `password`. Các biến này sẽ chứa dữ liệu và sẽ thay đổi trên mỗi lần lặp của người dùng.

![](https://images.viblo.asia/fdd15e20-db36-4ad9-aafc-1476ca548f7b.png)

*HTTP Post để đăng nhập vào PetStore*

Ở đây bạn có thể thấy rằng chúng tôi đã thay thế các giá trị trường đăng nhập và mật khẩu bằng các biến tương ứng của chúng. Bây giờ bạn có mỗi người dùng lấy một tài khoản khác nhau để đăng nhập.

Bạn cũng có thể nhận thấy giá trị tham số `_sourcePage` đã được thay thế bằng `$ {_ sourcePage}`. Đây là một tham số động mình đã xử lý.

## Dynamic Parameters
Điều này có lẽ là điều quan trọng nhất để hiểu khi test tải:
> Tham số động là tham số trong các yêu cầu có thể thay đổi trên mỗi lần chạy. Các tham số này được gửi trong các phản hồi của máy chủ trước đó.

Bạn cần phải tương quan chúng. Điều đó có nghĩa là, áp dụng quy trình 4 bước này:
* Trước tiên, hãy xác định một tham số động: thông thường, nó có một giá trị kỳ lạ và khó hiểu, Ở đây trang nguồn bằng với RbLmXwd9bLS0l ....,
* Cố gắng tìm giá trị mật mã này trong phản hồi của máy chủ trước đó: thực thi script để lấy chúng,
* Sử dụng [Regular Expression Extractor](https://octoperf.com/blog/2017/09/07/jmeter-regular-expression-extractor/) hoặc  [Json Extractor](https://octoperf.com/blog/2017/03/09/how-to-extract-data-from-json-response-using-jmeter/) để trích xuất giá trị thành một biến để sử dụng sau này,
* Thay thế giá trị trong request bằng biến.

Nếu bạn thành thạo quy trình này, bạn đã có được 95% kiến thức cần thiết cho Trình kiểm tra hiệu suất([Performance Tester](https://en.wikipedia.org/wiki/Software_performance_testing)).
![](https://images.viblo.asia/978a7a96-8d78-4013-9514-436feb5da67d.png)

*Trích xuất sourcePage bằng biểu thức chính quy*

Ở đây, mình đã định nghĩa một trình trích xuất regexp theo yêu cầu có phản hồi chứa tham số động được sử dụng sau đó `_sourcePage`:
* Name: `_sourcePage`,
* Regular Expression: `name="_sourcePage" value="(.+?)"` />,
* Template: `$1$`,
* Match Nr: `1`.

Tại sao trình trích xuất được cấu hình như vậy? Hãy cùng xem các phản hồi của máy chủ:
```
<input size="14" name="keyword" type="text" />
<input name="searchProducts" type="submit" value="Search" />
<input type="hidden" name="_sourcePage" value="RbLmXwd9bLS0lXS4vxD5i9ALa0GScuGthmpmYNfIaBJFM3w8lW9rYA==" />
<input type="hidden" name="__fp" value="qk2Y7WYMqKs=" />
```

Tôi đã cắt ngắn phản hồi cho mục đích dễ đọc. Như bạn có thể thấy, các tham số động đó là [hidden form parameters](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden). Loại tham số này thường được đặt để bảo vệ trang web khỏi SpamBots hoặc Cross-Site Request Forgery.

[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) là một phần của các công cụ mà bạn biết rõ. Chúng được sử dụng nhiều để trích xuất nội dung từ phản hồi của máy chủ.