theo dõi trang, cho phép bạn đo lường các số liệu cụ thể trên trang đó. các Page thường xuyên sửa đổi cho toàn bộ element html, nhưng chúng ta có thể đại diện nội dung được tải động. điều này được hiểu là "virtual pageviews"

Hướng dẫn này giải thích làm như thế nào để theo dõi phần tử trang với analytics.js

Overview

đoạn mã tracking



(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview');





bao gồm 1 command tạo 1 đối tượng tracker, sau đó 1 command gửi 1 pageview đến Google Analytic. Khi tracker theo dõi được tạo xong một số Field đc đặt theo ngữ cảnh trình duyệt web. 
`ga('set', 'title', 'Settings'); `
trường title được đặt thành value của document.title, và location được get từ document.location ngoại trừ phần anchor mỏ neo của URL

Lưu ý nếu Url chứa thông tin của Campaign, các param đó sẽ đc gửi tới GA để sử lý

Khi 1 command được thực thi, trường title, location  được lưu ở tracker được gửi đi và GA sử dụng những giá trị đó cho việc hiển thị những trang mà người dùng của bạn đã truy cập

Tracker mặc định sẽ ko set trường page,  nhưng nếu nó set thủ công giá trị đó được lấy về làm đường dẫn trong báo cáo, ghi đè giá trị trường location

 

 

Implementation
Pageview hit Số lần xem trang có thể gửi sử dụng send() và chỉ định hitType của pageview. command Send() có theo dõi chữ ký cho kiểu truy cập pageview 

`ga('send', 'pageview', [page], [fieldsObject]);`

Pageview fields
tóm tắt các trường chính liên quan đến số lần truy cập trang. Để biết thêm chi tiết content information section thông tin nội dung of the field reference tài liệu trường.

 

Field Name	Value Type	Required	Description
title	text	no	The title of the page (e.g. homepage)
location	text	no *	URL of the page being tracked.
page	text	no *	The path portion of a URL. This value should start with a slash (/) character.
* mặc dù cũng không yêu cầu trường Page hoặc location bắt buộc...

 

Examples
theo dõi command send 1 lượt truy cập pageview tới GA và kéo pathname của trang web hiện tại

` ga('send', 'pageview', location.pathname);`
Chú ý đó là với commands Send() có thể viết lại như sau

```
ga('send', {
  hitType: 'pageview',
  page: location.pathname
});
```
Chi tiết hơn, ví dụ về phương pháp hay nhất để gửi hits. chi tiết hơn trong gọi chữ ký của Send() command command queue reference.

Modifying page URLs
/user/USER_ID/profile
/user/USER_ID/account
/user/USER_ID/notifications
Một số trường hợp bạn muốn gửi url khác url trên trình duyệt, cho ví dụ hay xem xét 1 vài trang mà người dùng có thể login, và edit thông tin cá nhân của họ.Nếu trang này có các thông tin tách biệt cho thông tin cá nhân, cài đặt tin nhắn, url có thể trông giống như trên

Cài đặt nó vào Tracker sẽ chắc chắn ở gía trị page mới lấy thông tin user cho lần truy cập tiếp theo

```
if (document.location.pathname.indexOf('user/' + userID) > -1) {
  var page = document.location.pathname.replace('user/' + userID, 'user');

  // Sets the page value on the tracker.
  ga('set', 'page', page);

  // Sending the pageview no longer requires passing the page
  // value since it's now stored on the tracker object.
  ga('send', 'pageview');
}
```
Tracking virtual pageviews
Nhiều website ngày nay load dữ liệu tự động qua ajax mà không yêu cầu load đầy đủ nội dụng mỗi page. các site trên gọi như là SPAs

nếu website load nội dung tự động và update lại url, bạn sẽ luôn luôn gửi pageview đính kèm để tracking các "virtual pageviews", cho ví dụ Link