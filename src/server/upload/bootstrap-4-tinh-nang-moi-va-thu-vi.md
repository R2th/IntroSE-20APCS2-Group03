**Giới thiệu:**

Bootstrap, một trong những framework cho front-end phổ biến nhất trong giới thiết kế web. Nó cho phép các nhà phát triển xây dựng các trang web đáp ứng di động đầu tiên và nhanh chóng. Bootstrap cho phép sử dụng thông minh bộ ba tiêu chuẩn HTML5, CSS3 và Javascript tiêu chuẩn. Nó hiện đang được sử dụng bởi hơn 6 triệu sites trên web. Phiên bản Bootstrap 4 có thêm nhiều tính năng mới và tiện lợi hơn so với trước đây.

### 1. Sass thay vì LESS

Trước đây Bootstrap sử dụng LESS làm công cụ chuẩn bị CSS chính của nó, nhưng đối với phiên bản Bootstrap 4, các quy tắc kiểu sẽ được tái cấu trúc cho Sass, phổ biến hơn nhiều trong số các nhà phát triển Frontend, có cơ sở đóng góp rất lớn, thường dễ sử dụng hơn và cung cấp nhiều hơn khả năng. Nhờ vào Libsass Sass Comp trước mạnh mẽ được viết bằng C / C ++ Bootstrap 4 sẽ biên dịch nhanh hơn nhiều so với trước đây.

![](https://images.viblo.asia/ac185248-098a-456a-8a43-e6e1382c5408.jpg)

### 2. Grid Tier mới cho màn hình nhỏ hơn

Bootstrap có một hệ thống lưới đáp ứng tinh vi cho phép các nhà phát triển nhắm mục tiêu các thiết bị có chế độ xem khác nhau. Bootstrap 3 hiện có 4 lớp lưới cho cột, .col-xs-XX cho điện thoại di động, .col-sm-XX cho máy tính bảng, .col-md-XX cho máy tính để bàn và .col-lg-XX cho máy tính để bàn lớn hơn. Bootstrap 4 sẽ tăng cường hệ thống lưới với hệ thống thứ năm sẽ tạo điều kiện cho các nhà phát triển nhắm mục tiêu các thiết bị nhỏ hơn dưới chiều rộng khung nhìn 480px.

Lớp lưới mới đã lấy tên của lớp nhỏ nhất trước đó và đẩy các tên hiện tại của các bậc lưới lên một bậc. Trong Bootstrap 4, các máy tính để bàn lớn sẽ sử dụng bộ chọn lớp .col-xl-XX. Điều quan trọng là phải biết rằng mặc dù tên mới, nhưng họ đã không thêm một lớp mới cho các màn hình lớn hơn mà thêm cho các màn hình nhỏ hơn.

![](https://images.viblo.asia/a10aa0eb-6758-48c8-8a11-448af928a6b5.jpg)

### 3. Giới thiệu các đơn vị CSS tương đối

Bootstrap 4 cuối cùng đã bỏ hỗ trợ cho IE 8. Đó thực sự là một bước thông minh vì nó cho phép họ thoát khỏi các polyfill phiền phức và chuyển đổi sang các đơn vị CSS tương đối. Thay vì pixel, bản phát hành chính mới sẽ sử dụng REM và EM cho phép thực hiện kiểu chữ đáp ứng trên các trang web Bootstrap. Điều này cũng sẽ tăng khả năng đọc và làm cho các trang web dễ truy cập hơn đối với người dùng bị vô hiệu hóa.

![](https://images.viblo.asia/8a123073-baa3-4276-97a8-66e2e8222c9b.jpg)

### 4. Thẻ Bootstrap hoàn toàn mới

Nhóm phát triển đã quyết định hợp nhất một số yếu tố trước đây của giao diện người dùng Bootstrap, vì vậy họ quyết định giới thiệu một thành phần UI mới có tên là Cards. Cards sẽ thay thế các wells, thumbnails, panels trước đây và sẽ cung cấp cho người dùng quy trình làm việc hợp lý hơn. Đừng lo lắng, cards sẽ giữ các yếu tố quen thuộc, chẳng hạn như titles, headers và footers của wells, thumbnails và panels.

Vì cards sẽ linh hoạt hơn các thành phần UI hiện tại, chúng sẽ cho phép một không gian lớn hơn để triển khai sáng tạo.

![](https://images.viblo.asia/d2bcbd4b-c60b-48fc-a594-324082e1ca06.jpg)

### 5. Module Reboot mới

Module Reboot mới thay thế tệp đặt lại normalize.css trước đó. Nó không bỏ rơi nó mà ngược lại, nó xây dựng nhiều quy tắc hơn trên nó. Mục tiêu của việc di chuyển là bao gồm tất cả các bộ chọn CSS chung và các kiểu đặt lại trong một tệp SCSS đơn giản, dễ sử dụng.

Thật tốt khi biết rằng các kiểu thiết lập lại mới đặt thông minh thuộc tính CSS box-sizing thành border-box trên phần tử <html>, do đó được thừa hưởng bởi mỗi phần tử con trên trang. Quy tắc phong cách mới làm cho bố cục đáp ứng dễ quản lý hơn.

![](https://images.viblo.asia/77e1cce6-b12d-4bba-93ad-79dfdb9cf5f8.jpg)
    
### 6. Opt-in Flexbox Support
 
Bootstrap 4 có thể tận dụng Bố cục Flexbox CSS3, tuy nhiên - vì IE 9 không hỗ trợ module flexbox - phiên bản mặc định của Bootstrap 4 thay vì sử dụng các thuộc tính float và hiển thị CSS để thực hiện fluid layout.

Flexbox có bố cục dễ sử dụng, có thể được sử dụng xuất sắc trong responsive design, vì nó cung cấp một flexible container linh hoạt có thể mở rộng hoặc thu nhỏ lại để lấp đầy không gian có sẵn một cách tốt nhất. Chỉ sử dụng tính năng opt-in flexbox nếu bạn không cần phải cung cấp hỗ trợ cho IE9.
    
![](https://images.viblo.asia/6bd55046-c1a1-4bce-b688-7b361a57684a.jpg)
    
### 7. Tùy chỉnh biến hợp lý
    
Tất cả các biến Sass được sử dụng trong bản phát hành Bootstrap 4 được bao gồm trong một tệp có tên _variables.scss, điều này sẽ hợp lý hóa đáng kể quá trình phát triển. Bạn không phải làm bất cứ điều gì khác ngoài việc sao chép các cài đặt từ tệp này sang một tệp khác có tên là _custom.scss để thay đổi các giá trị mặc định.

Bạn có thể tùy chỉnh nhiều thứ như color, spacing, link styles, typography, tables, grid breakpoints và containers, column number và gutter width,  và nhiều thứ khác nữa.
    
![](https://images.viblo.asia/fae38f5e-d5fb-414f-bfb7-239845bbad80.jpg)
    
### 8. Các Classes tiện ích mới cho Spacing
    
Bootstrap 3 đã có nhiều lớp tiện ích thực tế như classes thay đổi floating hoặc clearfix, nhưng Bootstrap 4 còn bổ sung thêm. Spacing classes mới cho phép các nhà phát triển nhanh chóng thay đổi padding và margin trên trang web của họ.

Cú pháp cho các classes mới khá đơn giản, ví dụ: thêm class .m-a-0 liên kết một quy tắc kiểu đặt margin thành 0 trên tất cả các mặt của phần tử đã cho (margin-all-0). Trong khi margin sử dụng tiền tố m-prefix, padding được tạo kiểu với tiền tố p-prefix.
    
![](https://images.viblo.asia/999a8191-a2ca-4143-a558-4b221c241e38.jpg)
    
###  9. Tooltips và Popovers được cung cấp bởi Tether
    
Trong Bootstrap 4 tooltips và popovers sử dụng thư viện Tether siêu tốc, một công cụ định vị cho phép giữ một phần tử được định vị tuyệt đối ngay bên cạnh một phần tử khác trên cùng một trang. Điều này có nghĩa là Tooltips và Popovers sẽ được tự động đặt đúng cách trên các trang web Bootstrap 4.

Đừng quên rằng Tether là thư viện JavaScript của bên thứ ba, bạn cần đưa riêng nó vào HTML trước tệp bootstrap.js của bạn.
    
![](https://images.viblo.asia/33ec9d05-7578-4af4-86a5-0d2caae1f5c6.jpg)
    
### 10. Các plugin JavaScript được cấu trúc lại
    
Nhóm phát triển đã cấu trúc lại từng plugin JavaScript cho bản Bootstrap 4 bằng ES6.

Bootstrap 4 mới cũng đã trải qua các cải tiến JavaScript khác, chẳng hạn như kiểm tra loại tùy chọn, phương pháp phân tích chung và hỗ trợ UMD, tất cả sẽ phối hợp với nhau để làm cho khung giao diện phổ biến nhất chạy trơn tru hơn bao giờ hết.
    
**Kết luận:**
    
 Qua bài viết này, mình muốn giới thiệu với mọi người 1 số tính năng mới và nổi bật khá thú vị của Bootstrap 4. Hy vọng bài viết này sẽ giúp ích cho mọi người.
    
**Tham khảo:**

https://www.hongkiat.com/blog/boostrap-4-best-features/