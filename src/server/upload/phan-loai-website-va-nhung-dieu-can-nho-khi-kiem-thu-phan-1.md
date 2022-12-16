*Hiện nay website rất đa dạng, được phân thành nhiều loại với nhiều lĩnh vực khác nhau (khoảng 20 loại). Các loại được thu nhỏ theo hai kiểu phổ biến là website kiểu tĩnh và kiểu động (static and dynamic type). Trong số đó, nổi trội và được biết đến nhiều là các loại website sau:*

* Simple static website (Website tĩnh đơn giản)
* Dynamic web application (Website động)
* E-commerce website (Website thương mại)
* Mobile website (Website dùng trên thiết bị di động)

*Chúng ta sẽ cùng tìm hiểu về các đặc điểm cơ bản của các loại website phổ biến trên và những điều cần lưu ý khi thực hiện việc kiểm thử các website ấy qua bài viết nhé.*

![](https://images.viblo.asia/05da925d-b314-471f-90de-013f9d6e672b.png)

# Simple static website (Website tĩnh đơn giản):
## 1. Thế nào là một website tĩnh:  
* Một website tĩnh đơn giản là trang web sẽ hiển thị cùng một nội dung cho tất cả khách đang truy cập trang web vào những thời điểm khác nhau - hay còn được gọi là một trang web thông tin. 
* Các website này hướng đến nhiều thông tin có thể hành động hơn và bao gồm cách thức hướng dẫn, các mẹo và thủ thuật, sửa chữa, hướng dẫn thông tin hỗ trợ,…
* Website tĩnh được viết hoàn toàn dựa trên nền tảng HTML CSS và thêm các hiệu ứng từ Javascript nếu muốn. Trong trường hợp muốn chỉnh sửa các chi tiết hay giao diện của website tĩnh, người chủ sở hữu website cần phải yêu cầu các nhà cung cấp dịch vụ hoặc các lập trình viên hỗ trợ. Loại trang web này sẽ không có bất kỳ chức năng chính nào và hoàn toàn phụ thuộc vào thiết kế giao diện người dùng.
## 2. Những điểm lưu ý khi kiểm thử: 
*Kiểm thử một trang web tĩnh đơn giản là khá dễ dàng, chúng ta sẽ chỉ phải xem xét một số điều trong lúc kiểm thử được đề cập dưới đây:*

![](https://images.viblo.asia/51ea8c0c-48fa-41ca-bfc2-497cfcf20a58.png)


* Kiểm tra thiết kế UI là điều quan trọng nhất vì một trang web tĩnh hoàn toàn phụ thuộc vào nó. Cần so sánh các tệp photoshop document đã được phê duyệt với trang web đang phát triển. Bên cạnh đó cũng nên kiểm tra tất cả các yếu tố trong thiết kế đã được hiển thị lên trang web hay chưa.
* Các phần khác của thiết kế UI là kiểm tra kích thước phông chữ, kiểu phông chữ, khoảng cách và màu sắc,...
* Tiếp đến, cần kiểm tra các liên kết của trang (link page) xem nó có hoạt động tốt hay không? có bất kỳ liên kết nào bị hỏng không?
* Kiểm tra chính tả và nội dung trong tất cả các trang web bằng cách so sánh với nội dung do khách hàng cung cấp.
* Trong một vài trường hợp, hình ảnh sẽ không hiển thị đúng, có thể bị vỡ hoặc đôi khi bị trùng lặp, hiển thị sai,... cần phải được kiểm tra cẩn thận. Vì đối với một trang web tĩnh, chỉ có nội dung và hình ảnh mới mang lại sức sống và điểm thu hút người truy cập.
* Kiểm tra thanh cuộn cẩn thận, đôi khi chúng ta có thể gặp vấn đề với thanh cuộn. Vấn đề gặp phải là cuộn không mong muốn xuất hiện hoặc cuộn bị ẩn (nó có thể ẩn nội dung). Các vấn đề trên có thể áp dụng cho cả cuộn ngang và cuộn dọc.
* Nếu có một biểu mẫu liên hệ (qua email, số điện thoại,...), hãy kiểm tra xem nó có hoạt động bình thường không bằng cách gửi một số tin nhắn giả.
* Những điều cần kiểm tra trong biểu mẫu liên hệ là:

  :small_blue_diamond:Liệu tin nhắn có được gửi đúng cách và thông báo thành công xuất hiện không?
  
  :small_blue_diamond:Kiểm tra email nhận được có đúng định dạng như thiết kế không?
  
  :small_blue_diamond:Kiểm tra email có vào mục thư rác hay không?
  
  :small_blue_diamond:Nếu có kích hoạt email trả lời, hãy kiểm tra xem người gửi đã nhận được thư chưa?
* Ngoài ra, một số lưu ý cần được kiểm tra liên tục ở một trang web tĩnh:

  :small_orange_diamond:Kiểm tra biểu tượng yêu thích có trên thanh tab
  
  :small_orange_diamond:URL phải chứa đúng tiêu đề trang
  
  :small_orange_diamond:Nếu thông tin bản quyền có, nó sẽ được hiển thị
  
  :small_orange_diamond:Nếu có một biểu mẫu liên hệ, Captcha là bắt buộc (ngăn chặn email rác)
  
  :small_orange_diamond:Kiểm tra tốc độ tải của trang web. Một trang web tĩnh sẽ không mất nhiều thời gian để tải. 
  
  :small_orange_diamond:Nếu hình ảnh gif được sử dụng trong khi tải thì hãy theo dõi chức năng của nó.
* Ngoài những điều đã liệt kê ở trên, có rất nhiều thứ phải được kiểm tra ở phần phụ trợ của mọi trang web đó là kiểm tra hệ thống, kiểm tra bảo mật, kiểm tra giao diện, kiểm tra khả năng tương thích và kiểm tra hiệu suất,...
# Dynamic Web Application - CMS Website (Website động - Ứng dụng web):
## 1. Thế nào là một Website động - Ứng dụng web:
* Trang web động là loại mà người dùng có thể cập nhật và thay đổi nội dung trang web của họ thường xuyên, được viết kèm theo một bộ công cụ quản trị để người quản trị web có thể dễ dàng thay đổi một số chi tiết trong website mà họ mong muốn. Đây được gọi là các CMS (Hệ thống quản trị cơ sở dữ liệu). 
* Việc thiết kế một website động còn được gọi là thiết kế Web application (Ứng dụng web),là sự kết hợp của lập trình front-end và back-end. Front-end sẽ là HTML và CSS trong khi back-end sử dụng các ngôn ngữ lập trình như PHP,  Javascript và ASP,... Với phần phụ trợ này, người dùng / khách hàng có thể thêm hoặc thay đổi nội dung trên trang web.
* Kiểm tra chức năng là điều quan trọng nhất được thực hiện trong khi kiểm tra ứng dụng web. Web app có thể chứa nhiều chức năng phức tạp nên người kiểm thử cần phải rất cẩn thận trong khi kiểm tra.
* Có hai loại web app khác nhau, loại thứ nhất là không có hành động nào sẽ được thực hiện bởi người dùng ở front-end (tức là chỉ những thay đổi của back-end sẽ phản ánh trong front-end), loại còn lại là người dùng cuối sẽ làm việc ở front-end (ví dụ: đăng nhập, đăng ký, đăng ký nhận bản tin và các hành động tương tự khác). Vậy nên tùy theo loại chức năng của web mà chúng ta sẽ lựa chọn phương pháp kiểm thử thích hợp.
## 2. Những điểm lưu ý khi kiểm thử:
*Kiểm thử Web app cần bao gồm cả những lưu ý khi kiểm thử trang web tĩnh. Ngoài ra, những điều sau đây cần chú ý thêm:*

![](https://images.viblo.asia/5eb2c920-2d51-4155-b7dc-64303ade1bad.jpg)


* Trong phần UI, tooltip là bắt buộc đối với tất cả các field (trường nhập dữ liệu) và button (nút), căn chỉnh trường (spacing) phải được thực hiện đúng cách, field/ button vô hiệu hóa phải có màu xám, field / button phải ở định dạng chuẩn như trong SRS.
* Thông báo lỗi phải được hiển thị nếu có sự cố, pop-up thông báo chỉ nên hiển thị ở giữa trang web, menu drop-down không bị mất bớt. Phím tắt tab phải hoạt động trong tất cả các field.
* Trong phần chức năng (function), nếu ứng dụng web có các chức năng đăng nhập hoặc đăng ký, hãy kiểm tra xác thực trường bắt buộc, xác thực biểu mẫu (các trường số chỉ chấp nhận số, không phải bảng chữ cái), giới hạn ký tự (chỉ những ký tự này có thể được nhập), giới hạn ký tự đặc biệt và số âm ở các field,...
* Kiểm tra chức năng email, kiểm tra upload tài liệu (chỉ có thể tải lên các loại tài liệu được chỉ định), chức năng thời gian chờ, chức năng sắp xếp, javascript đang hoạt động trên các trình duyệt tương thích,... cũng nên được kiểm tra.
* Đối với các phần chức năng back-end, hãy kiểm tra upload hình ảnh, xem hình ảnh có bị hỏng hay không, văn bản nhập vào các trường có hoạt động hay không. Cập nhật back-end nên phản ánh về giao diện người dùng, kiểm tra cơ sở dữ liệu (có thể thêm các field mới hoặc xóa các field không mong muốn) tất cả những điều này cần phải được thực hiện kiểm thử.
* Kiểm thử hiệu suất không nhất thiết cần đối với một ứng dụng web (dynamic website) vì nó có rất ít nội dung. Nếu cần, có thể thực hiện với các công cụ quen thuộc. Chọn một số công cụ hiệu suất trực tuyến tiêu chuẩn, để thực hiện kiểm tra hiệu suất đơn giản: Locust.io, Jmeter, Google PageSpeed Insights, Siege,... 


*Tài liệu tham khảo:* https://www.softwaretestinghelp.com/web-application-testing/