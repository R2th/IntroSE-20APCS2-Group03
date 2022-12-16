## 1. Security là gì?

Bảo mật (Security) là một loạt các biện pháp để nhằm bảo vệ một ứng dụng chống lại các hành động không lường trước được, khiến cho ứng dụng ngừng hoạt động hoặc bị khai thác. Những hành động không lường trước được có thể là cố ý hoặc không cố ý.

![](https://images.viblo.asia/097867ff-a2f4-4174-be56-afad633ae50a.jpg)

## 2. Giới thiệu về Security testing

 Kiểm thử bảo mật là một trong những loại quan trọng nhất của kiểm thử phần mềm. Mục tiêu chính của kiểm thử bảo mật là để tìm các lỗ hổng của hệ thống và xác định rằng dữ liệu và tài nguyên được bảo vệ từ các yếu tố có thể xâm nhập. Kiểm thử bảo mật cho phép xác định các dữ liệu bí mật vẫn bí mật hay không.

Việc Kiểm thử bảo mật đối với bất kỳ hệ thống nào đều là tìm kiếm tất cả các lỗ hổng và điểm yếu trong hệ thống mà dẫn đến rò rỉ thông tin của tổ chức, nhằm đảm bảo các hệ thống và ứng dụng trong một tổ chức không có bất kỳ sơ hở nào có thể gây ra các tổn thất về an toàn bảo mật. Nó giúp xác định tất cả các rủi ro về an toàn bảo mật trong hệ thống và giúp các nhóm phát triển phần mềm trong việc khắc phục các vấn đề này.
## 3.  Tầm quan trọng của kiểm thử bảo mật
Ngày nay khi công nghệ ngày càng phát triển với muôn vàn tính năng, người người nhà nhà sử dụng các trang mạng xã hội. Và đều lưu thông tin của mình trên đó. Điều này khiến cho các hacker dễ dàng lợi dụng sơ hở vào các lỗ hổng bảo mật của hệ thống đánh cắp thông tin người dùng sử dụng vào các mục đích xấu.

**Vậy cái giá phải trả khi dữ liệu bị đánh cắp là gì?**
+ Mất dữ liệu: Việc mất dữ liệu có thể quy ra hóa đơn được, nhưng không có một cái giá cố định cho dữ liệu đâu, mất dữ liệu có thể là một thảm họa. Mất dữ liệu đã nguy hiểm, mất dữ liệu của công ty và khách hàng còn nguy hiểm hơn.
+ Lộ các thông tin bí mật của công ty cũng như người dùng
+ Mất niềm tin của khách hàng
+ Gián đoạn và lo âu: Khi một trang web bị hacker tấn công ít nhiều nó sẽ bị gián đoạn và ngừng hoạt động. Sẽ vô cùng phiền phức không chỉ cho chúng ta những nhà phát triển phần mềm và còn cho khách hàng, khách hàng của khách hàng... Mọi công việc liên quan đến hoạt động của web đều bị dừng lại
+ Tổn thất lớn về mặt kinh tế: Chúng ta sẽ phải bồi thường cho khách hàng nếu sản phẩm của chúng ta để lại lỗi bảo mật và bị hacker tấn công. Rồi chúng ta cũng sẽ phải đầu tư thời gian, nhân lực và tài chính để lấy lại dữ liệu bị đánh cắp và ngăn không cho hacker có cơ hội tấn công tiếp theo

Chính vì rủi ro khi bị đánh cắp dữ liệu, lộ các thông tin bảo mật là rất cao nên việc kiểm thử bảo mật là vô cùng quan trọng trong quá trình phát triển phần mềm.

## 4. Lỗ hổng bảo mật website
Không nắm được định nghĩa lỗ hổng bảo mật website là gì có thể dẫn đến việc website bị hack. Người ta thường nói phòng bênh hơn chữa bệnh, chúng ta nên tìm ra sớm những lỗ hổng bảo mật và bắt tay ngay vào sửa chữa những lỗ hổng bảo mật còn tồn tại trong website của mình để tránh sảy ra những trường hợp bị kẻ xấu tấn công
### 4.1 Định nghĩa về lỗ hổng bảo mật web
Lỗ hổng bảo mật là những điểm yếu nằm trong thiết kế và cấu hình của hệ thống, lỗi của lập trình viên hoặc sơ suất trong quá trình vận hành.
### 4.2 Cách thức hoạt động
Hacker sử dụng các công cụ dò quét để phát hiện một loạt các website có cấu hình bảo mật
kén hoặc website trên các nền tảng phổ biến như WordPress hay Joomla có các lỗ hổng đã được công bố nhưng chưa được chủ website xử lý. Từ đó tin tặc sẽ lợi dụng chúng để tấn công, cài đặt mã độc và phá hoại các website

### 4.3 Các lỗ hổng bảo mật phổ biến

**SQL INJECTION**

![](https://images.viblo.asia/bdbe1020-59a6-4c1d-a267-c03a6afe2cb6.png)
SQL injection cho phéo kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào và các thông báo lỗi do hệ quản trị cơ sở dữ liệu trả về inject(tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp

SQL injection cho phép xóa, chèn, cập nhập,... trên cơ sở dữ liệu của website, thậm chí là server

Ví dụ về việc vì sao chúng ta cần kiểm thử bảo mật với câu lệnh SQL injection. Đặc biệt với các ô textbox để người dùng nhập username và password
![](https://images.viblo.asia/cf8aa998-1129-4182-a8ab-59cb8d1c31bf.png)
Câu lệnh sql cho trg username and password nếu nhập 105 or 1=1 vào username thì sẽ đăng nhập đc vào hệ thống mà k cần mật khẩu, vì password để sau dấu # xem như k quan tâm. Chính vì thế dev cần code cẩn thận và fix lỗi này.

![](https://images.viblo.asia/835b4323-dde0-410d-80ec-de7dfd0a482b.png)
**LOCAL FILE INCLISION**

Website thường sử dụng các biến để lưu địa chỉ của file, ví dụ như ở trang thông báo lỗi, địa chỉ thật của file chứa thông tin về lỗi sẽ được lưu ở http://example.com/error.php?page=404.php

Lỗ hổng này xảy ra khi giá trị của biến này được thay thế bằng đường dẫn tới một file khác, từ đó hacker có thể truy cập trái phép vào những file nhạy cảm hoặc thực thi các file độc hại trên web server


**CROSS  SITE SCRIPTING (XSS)**

* Cho phép hacker chèn những đoạn script độc hại (thường là Javascript hoặc HTML) vào website và thực thi trong trình duyệt của người dùng.

* Hacker có thể dùng XSS để gửi những đoạn script độc hại tới một người dùng bất kỳ để lấy cookie, keylogging hoặc lừa đảo.

Lỗ hổng XSS nghiêm trọng như thế nào?

Kẻ tấn công có thể sử dụng lỗ hổng XSS để ăn cắp cookie, chiếm đoạt tài khoản, thực hiện ActiveX, thực thi Flash content, lừa người dùng tải phần mềm… Các vụ tấn công lừa đảo thường khai thác lỗ hổng XSS để giả mạo là các website hợp pháp. Nếu kẻ tấn công thực sự khôn ngoan, chúng có thể thực hiện một cuộc tấn công XSS nhắm mục tiêu tới các quản trị viên. Có thể bằng cách gửi thư có tiêu đề “Trợ giúp! URL website này tiếp tục báo lỗi cho tôi!”. Sau khi quản trị viên mở URL, kẻ tấn công có thể gây ra nhiều thiệt hại như ăn cắp thông tin của họ và chiếm đoạt quyền quản trị viên.

Lỗ hổng XSS có thể được kiểm thử bằng thủ công hoặc dùng các tool hỗ trợ

Ví dụ 1: Trong trường review nếu hacker nhập đoạn code sau:

```
<script>destroyWebsite();</script>
```

Sau đó, hàm destroyWebsite() sẽ được gọi và nó sẽ thực hiện các hành động có hại của nó. Như hầu hết chúng ta biết, cuộc tấn công này chủ yếu được sử dụng để thu thập cookie của người khác, có thể được sử dụng để đăng nhập bằng các danh tính khác. Hãy để chúng tôi phân tích một ví dụ khác về kịch bản XSS có thể có với hành vi trộm cắp cookie có thể xảy ra.

Ví dụ 2: thông qua lỗ hổng của website, tin tặc sẽ tiêm mã thích hợp.
```

<script type=”text/javascript”>

Var test=’../example.php?cookie_data=’+escape(docuent.cookie);

</script>
```

Như đã thấy trong Ví dụ trên, cookie bị mất và được gửi tới biến ‘cookie_data’ của tập lệnh mẫu example.php. Nếu hacker sẽ chèn tập lệnh này vào mã của trang web, thì mã sẽ được thực thi trong trình duyệt của người dùng và cookie sẽ được gửi tới hacker.

Kiểm thử tự động lỗ hổng XSS

Một công cụ quét lỗ hổng bảo mật thông thường sẽ kết nối với ứng dụng web thông qua giao diện web để có thể tìm ra các lỗ hổng tiềm tàng và những điểm yếu về cấu tạo của web. Công cụ này sẽ không truy cập vào mã nguồn mà chỉ thực hiện kiểm tra chức năng để tìm ra các lỗ hổng bảo mật. Hiện nay trên thị trường có rất nhiều công cụ quét lỗ hổng bảo mật ứng dụng web, có thể miễn phí hoặc cần trả phí mới sử dụng được. Dưới đây là một số công cụ quét lỗ hổng bảo mật ứng dụng web hàng đầu có thể giúp bạn đánh giá ứng dụng web để loại bỏ các rủi ro về bảo mật.
1. CyStack Platform – A Web Security Platform
2. Phần mềm Burp Suite Free
3. Phần mềm Netsparker
4. Arachni

**SERVER -SIDE TEMPLATE INJECTION**

Template là một thành phần thường được sử dụng trong các website và email. Lỗ hổng này là khi lập trình viên cho phép dữ liệu đầu vào của người dùng được chèn vào template mà không có biện pháp bảo vệ. Không giống XSS, Template Injection đặc biệt nguy hiểm ở chỗ cho phép tấn công trực tiếp vào server và thực thi mã từ xa.

Ngoài ra còn rất nhiều lỗ hổng bảo mật đã được phát hiện và công bố trên thế giới

Biểu đồ ở bên dưới được tạo bởi Web Hacking Incident Database for 2011 (WHID), rõ ràng cho thấy rất nhiều phương pháp tấn công khác nhau đang tồn tại, trong đó SQL injection và XSS là phổ biến nhất.

![](https://images.viblo.asia/66263970-db6e-461b-9a45-dd6e81fb033c.jpg)

***Tài liệu tham khảo:***

http://www.softwaretestingclass.com/security-testing-approach-for-web-application-testing/