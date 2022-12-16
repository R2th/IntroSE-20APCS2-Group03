## 1. XSS Auditor là gì ?
XSS Auditor là một chức năng tích hợp trong Chrome được tạo ra nhằm giảm thiểu các cuộc tấn công Cross-site Scripting (XSS). Mục đích của nó nhằm xác định xem các tham số truy vấn có chứa các mã JavaScript độc hại hay không, đồng thời, chặn các response nếu phản hồi của máy chủ đã dính payload độc hại. <br>
XSS Auditor được bật mặc định, nhưng có thể được cấu hình lại hoặc tắt đi thông qua X-XSS-Protection HTTP header :<br>
+ Disable XSS auditor<br>		
                `X-XSS-Protection: 0` <br>
+ Run in rewrite mode<br>
               `X-XSS-Protection: 1`<br>
+ Run in “block” mode<br>
                `X-XSS-Protection: 1; mode=block` <br>
+ Run with reporting<br>
                `X-XSS-Protection: 1; report=http://example.com/your_report_URI `<br>

## 2. XSS Auditor hoạt động như thế nào ?
Cách thức XSS Auditor hoạt động khá đơn giản:
* Bất cứ khi nào bạn gửi request đến web server, Google Chrome sẽ xem xét thanh URL cũng như nội dung trong POST body (nếu có). Nó sẽ tìm kiếm các string nguy hiểm có thể dẫn đến việc thực thi các đoạn code JavaScript. Các đoạn string này có thể là các thẻ HTML, event handlers, external URLs, hay các URI schemes như dữ liệu hoặc JavaScript. 
* Tuy nhiên, nó sẽ không chặn những yêu cầu này ngay lập tức. Thay vào đó, nó sẽ chờ phản hồi từ máy chủ để kiểm tra xem những đầu vào nguy hiểm này có thực sự được reflected trên page mà không có bất kì kiểm duyệt nào không. Chỉ trong trường hợp đó, XSS Auditor mới có hành động:  ngăn toàn bộ quá trình loading của trang web hoặc xóa các đoạn script được chèn.
![](https://images.viblo.asia/b0ab953c-8535-4a89-ab96-4f1f09c3b39f.png)


## 3. XSS Auditor Bypass 
* XSS Auditor không phải là hoàn hảo. Trên thực tế, bypass XSS Auditor phổ biến đến nỗi nó được nhóm Chromium coi là lỗi chức năng mà không phải là vấn đề bảo mật. Trong những năm qua, rất nhiều trường hợp bypass đã được báo cáo tới đội phát triển của Chrome. Vài trong số đó rất khôn khéo và đòi hỏi sự hiểu biết sâu sắc về HTML, JavaScript, XSS Auditor và phương thức rending của Chrome. 
* Ngoài ra, có một số vấn đề không thể khắc phục trong phần code của XSS Auditor, điển hình là ví dụ sau đây:
  + Thử tưởng tượng điều gì sẽ xảy ra nếu một developer quyết định loại bỏ tất cả các dấu nháy đơn khỏi phần input để ngăn chặn SQL Injections. XSS Auditor sẽ thấy <'s'c'r'i'p't'> trong đầu vào, nhưng máy chủ sẽ gửi lại <script> trong đầu ra. 
  + Làm cách nào Chrome có thể chắc chắn rằng tình huống nào được gây ra bởi đầu vào có chứa các dấu nháy đơn? Vấn đề tương tự cũng xảy ra nếu xóa bỏ những từ như SELECT khỏi input. 
  + XSS Auditor có khả năng phát hiện các phát sinh tương tự ở một mức độ nhất định. Nhưng chúng ta khó mà kì vọng công cụ này có thể bắt kịp mọi thay đổi từ phía máy chủ, số lượng các kết quả false positive có thể là rất lớn.
* Những lỗi quá rõ ràng một khi đã được phát hiện hầu hết đều được bên phía phát triển sửa lại, điều này có nghĩa là người dùng đã khá an toàn với XSS, miễn là họ không phải đối mặt với những kẻ tấn công có kiến thức chuyên sâu về Cross-Site-Scripting và XSS Auditor. Mặc dù việc bypass đã trở nên khó khăn hơn. nhưng không phải là không thể. Những trường hợp như vậy đã được dự kiến ngay từ đầu.

## 4. Những lỗ hổng gây ra bởi XSS Auditor
### Disabling Scripts
* Ban đầu, XSS Auditor loại bỏ những script nguy hiểm theo chế độ mặc định. 
![](https://images.viblo.asia/af4980c0-bd77-43e5-ae7d-508d102eaf92.png)

* Tuy nhiên, việc này không an toàn vì các tính năng bảo mật có thể bị vô hiệu hóa. 
* Thay vì ngăn toàn bộ trang hiển thị, XSS Auditor loại bỏ script không an toàn và hiển thị phần còn lại của trang. Vấn đề lớn nằm ở ngay đây. Lý do là XSS Auditor không thể phát hiện script nào được đưa lên trang bởi nhà phát triển và script nào được đưa vào bởi kẻ tấn công. Tất cả những gì nó có thể làm là so sánh request và response.
* Giả sử có một đoạn script như sau nằm trên trang web:  <br>
	 ```js
    <script>callSecurityRelatedFunction()</script>
    ``` 
     + Hàm này có thể chứa một frame buster - một đoạn mã xác định xem trang có được load trong iframe hay không, bằng cách nào đó nó sẽ ngăn chặn quá trình render của trang - tương tự HTTP X-Frame-Options header. Nếu kẻ tấn công muốn loại bỏ chức năng này, chúng có thể chèn thêm script vào câu truy vấn. <br>
`/account?attacker=<script>callSecurityRelatedFunction()</script>` <br>
   + XSS Auditor sẽ thấy script trong yêu cầu và nghĩ rằng chúng được viết bởi kẻ tấn công. Sau đó, nó sẽ xóa đoạn mã khỏi trang, kết quả là biện pháp bảo mật mà nhà phát triển muốn thực hiện bị vô hiệu hóa.
   
### Serious Information Leaks
* Sau đó, XSS Auditor đi theo hướng khác: chặn toàn bộ các trang trong cài đặt mặc định của mình. 
![](https://images.viblo.asia/4e8d06ce-caeb-4a4d-b570-91813322a5d4.png)
* Nhưng hành động này cũng lắm rủi ro vì nó dẫn đến rò rỉ thông tin. 
* Giả sử phía phát triển đặt một script như thế này trên trang web của họ: <br>
`<script> const userSecret = 23456 </ script>` <br>
  + Trang web này chứa các tập lệnh, hình ảnh, video, phông chữ,... . Tất cả đều mất một lượng thời gian có thể tính toán được để tải. 
  + Sau khi tải xong nội dung, ví dụ như trong iframe, kẻ tấn công có thể nhận được thông báo, thông qua onload event handle chẳng hạn. Bây giờ, chúng có thể gửi đi nhiều payloads khác nhau:  <br>
  `/account?attacker=<script>const userSecret = 1 // takes some time to load`  <br>
  `/account?attacker=<script>const userSecret = 2 // instantly failes due to being blocked by the auditor`  <br>
 `/account?attacker=<script>const userSecret = 21 // takes some time to load ` <br>
 `/account?attacker=<script>const userSecret = 22 // takes some time to load ` <br>
 `/account?attacker=<script>const userSecret = 23 // fails as it's being blocked `<br>
    
* Cuối cùng, Chrome quyết định để XSS Auditor quay trở lại phương án loại bỏ các đoạn script nguy hiểm (quay về "filter mode" thay vì "block mode") - lựa chọn giải pháp ít vấn đề hơn so với rò rỉ thông tin.

## 5. Chrome gỡ bỏ XSS Auditor
Ngày 15/7/2019, các kỹ sư của Google đã công bố kế hoạch loại bỏ XSS Auditor khỏi Chrome. Có một vài lý do được đưa ra để loại bỏ tính năng này: 
*  Nguyên nhân đầu tiên là do có quá nhiều cuộc bypass đã diễn ra trong vài năm qua. Nhiều người săn bug đùa rằng bạn sẽ chưa thực sự là một người nghiên cứu về bảo mật nếu chưa từng bypass XSS Auditor.
*  Nguyên nhân tiếp theo là việc tạo các bản vá cho XSS Auditor đang gây ra các lỗ hổng trong chính Chrome.
*  Hơn nữa, quá nhiều false positives cũng là một vấn đề. Rất nhiều trang web hợp pháp đã bị XSS Auditor chặn do các phát hiện sai lệch.
 ## References
* https://www.netsparker.com/blog/web-security/xss-auditors/
* https://www.netsparker.com/blog/web-security/goodbye-xss-auditor/
* https://www.virtuesecurity.com/understanding-xss-auditor/
* https://bugs.chromium.org/p/chromium/issues/detail?id=667079