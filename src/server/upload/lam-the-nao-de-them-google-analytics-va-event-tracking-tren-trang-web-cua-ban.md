# Giới thiệu
Google Analytics (GA) là công cụ phân tích website đáng tin cậy thuộc quyền sở hữu và phát triển của Google. Với công cụ này, các nhà phân tích, đánh giá website và các người làm SEO sẽ có thể định hướng và đánh giá tổng thể hiện trạng website của mình. 

Google Analytics được cung cấp miễn phí và rất dễ đăng kí.
Bạn có thể đăng kí ở link này và làm theo các bước họ đưa ra: https://analytics.google.com/analytics/web/provision/?authuser=0#/provision

Sau khi hoàn thành đăng kí, giao diện của trang Google Analytics của bạn sẽ trông như thế này:
![](https://images.viblo.asia/f3cc1bfd-2180-4940-8ae7-f10e15470a3a.png)

Nó cung cấp cho bạn rất nhiều thông tin từ tổng quát đến chi tiết như lượt view trang web, thời gian ở lại trên trang, tỉ lệ thoát trang, tỉ lệ phản hồi… trên từng trang nhỏ trong website. Ngoài ra, GA còn có thể lọc được các lượt view ảo, đánh giá website của bạn trên lượt truy cập thực sự của người dùng.

Qua những lợi ích kể trên, mình sẽ hướng dẫn các bạn cách thêm GA vào trang web và demo việc theo dõi người dùng click và những link nào bên trong trang web của bạn.
# Demo
## I, Thêm analytics.js vào trang web
Thư viện `analytics.js` là thư viện JavaScript để đo lường cách người dùng tương tác với trang web của bạn. 

Thêm đoạn mã dưới đây vào code của bạn để bắt đầu sử dụng analytics.js (Đoạn code phải được đặt gần đầu thẻ <head> , trước tất cả các thẻ script và css khác)
```script
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```
Chú thích:
    
   1.  Tạo phần tử <script> để bắt đầu tải đồng bộ thư viện Javascript analytics.js từ https://www.google-analytics.com/analytics.js
    
   2. Khởi tạo hàm global `ga` cho phép bạn lên lịch các lệnh sẽ được chạy sau khi thư viện analytics.js được tải và sẵn sàng hoạt động.
    
   3. Thêm lệnh `ga('create', 'UA-XXXXX-Y', 'auto');` để tạo 1 object tracking, `UA-XXXXX-Y` phải là mã tracking ID của bạn. Nếu không biết tìm nó ở đâu thì bạn có thể vào link này: https://analytics.google.com/analytics/web/?authuser=0#/a138990004w199715730p194098795/admin/tracking/tracking-code/. Sau đó vào Admin > Tracking info, bạn sẽ thấy Tracking ID.
   4. Lệnh `ga('send', 'pageview');` để gửi 1 pageview lên Google Analytics cho trang web hiện tại.
    
Mặc dù đoạn mã theo dõi JavaScript được mô tả ở trên đảm bảo tập lệnh sẽ được tải và thực thi không đồng bộ trên tất cả các trình duyệt, nhưng nó có nhược điểm là không cho phép các trình duyệt hiện đại tải trước tập lệnh.

Đoạn mã theo dõi async thay thế bên dưới bổ sung hỗ trợ tải trước, nhưng có thể làm giảm tải và thực thi đồng bộ trên IE 9 và các trình duyệt di động cũ không nhận ra thuộc tính tập lệnh async. Chỉ sử dụng đoạn mã theo dõi này nếu khách truy cập của bạn chủ yếu sử dụng các trình duyệt hiện đại để truy cập trang web của bạn.
    
```script
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```
Google Analytics sẽ dựa vào những data gửi lên để cho chúng ta biết về:

* Tổng thời gian người dùng dành cho trang web của bạn.
* Thời gian người dùng dành cho mỗi trang và theo thứ tự các trang đó được truy cập.
* Những link nội bộ nào đã được click (dựa trên URL của lần xem trang tiếp theo).
    
 Thêm vào đó, từ địa chỉ IP của người dùng, GA cũng phân tích được 1 số thông tin sau:
    
* Vị trí địa lý của người dùng.
* Những gì trình duyệt và hệ điều hành đang được sử dụng.
* Kích thước màn hình.
* Các trang web giới thiệu.

## Event Tracking
 ### Event Tracking là gì?
 Nó là 1 sự kiện tương tác giữa người dùng với 1 phần tử trong trang web và được theo dõi trong Google Analytics. Những phần tử trong trang web có thể là video, hình ảnh, button, scroll, link, nội dung Ajax...
 ### Các loại Event trong Google Analytics
  Có 4 loại Event sau:
    
 * Mouse Event: người dùng tương tác với chuột
 * Form Event: người dùng tương tác với form trên trang web
 * Keyboard Event: người dùng tương tác với bàn phím
 * Frame Event: người dùng tương tác với frame hoặc iframe
  
  Event có thể tạo hoặc không tạo ra số lượt xem trang (pageview)
  Khi nhấp vào 1 liên kết nội bộ trên trang web thì sẽ tạo ra pageview, còn nếu nhấp vào liên kết ngoài, tải nội dung Ajax hoặc tải file, video, scroll, nhấn vào button... thì sẽ không thể tạo ra pageview.
  ### Tạo Event Tracking
  
 Giả sự bạn muốn theo dõi người dùng khi click vào thẻ <a> trong trang web thì bạn chỉ cần thêm sự kiện sau vào trong thẻ <a> đó:
```
ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject])
```
Ví dụ như: `ga('send', 'event', 'Menu', 'click', 'Login');`
Trong đó:
1. eventCategory: gán với tên nhóm tương tự mà bạn muốn theo dõi. Chẳng hạn bạn có 1 Menu bao gồm rất nhiều thẻ <a>, bạn sẽ cần xem người dùng click bao lần vào menu đó
2. eventAction: gán cho loại sự kiện mà bạn muốn theo dõi, chẳng hạn như click, play, pause...
3. eventLabel: gán cho các phần tử của trang web, có thể là các phần tử trong Menu như Login, Register, Profile...
4. eventValue: giá trị số được gán cho sự kiện mà bạn muốn theo dõi, có thể là thời gian tải xuống, thời lượng người dùng xem video...

Dưới đây là cách mình thêm event tracking vào thẻ <a>:
```html
<a href="{{ route('login', ['redirectTo' => url()->full()]) }}"
   onclick="ga('send', 'event', 'Menu', 'click', 'Login');">
    Login
</a>
```
Ví dụ thêm event tracking vào button:
```html
<button onclick="ga('send', 'event', 'Download', 'download-ebook', 'tailieu.doc', 10);">Download tài liệu</button>
```
Ví dụ theo dõi số người sử dụng form submit:
```html
<form name="completeRegister" action="complete_register.php" onsubmit="ga('send', 'event', 'Forms', 'Complete Register');">
```
Sau khi thêm Event Tracking thì bạn có thể truy cập vào màn hình Google Analytics > Behavior > Events > Overview sẽ thấy được kết quả như dưới đây:
![](https://images.viblo.asia/4076d27e-746a-467c-9706-39423b260dc8.png)
## Giới thiệu Google Analytics Debugger
   ![](https://images.viblo.asia/0de7394b-1b20-48aa-81b9-64f9a33041dc.png)
  
 Đây là 1 extension của Google Chrome. Bạn có thể dễ dàng tải về và bật nó lên trên trang web của bạn
 Sau khi bật, bạn F12 và mở Console lên, nó sẽ hiển thị như thế này:
   ![](https://images.viblo.asia/f64fbdaa-435e-4175-a3fb-6702f6e4a986.PNG)
    
  Sau đó bạn chỉ cần gõ các lệnh gửi event lên Google Analytics và xem GA phân tích các sự kiện đó như thế nào.
  Chẳng hạn như: `ga('send', 'event', 'Menu', 'click', 'Login');`
   ![](https://images.viblo.asia/16338d41-ffe1-4abf-b181-c208779a74f2.PNG)
 
 
# Kết luận
 Trước đây mình phải mất công xây dựng cả 1 hệ thống theo dõi bên trong Admin, code rất mất thời gian và nặng máy. Nhưng từ khi có Google Analytics vừa dễ dùng vừa tiện ích như vậy thì tại sao các bạn lại không bắt tay vào sử dụng nó nhỉ!
> Tham khảo:
> https://developers.google.com/analytics/devguides/collection/analyticsjs/