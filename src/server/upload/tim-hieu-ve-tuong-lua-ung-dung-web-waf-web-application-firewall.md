> Những năm gần đây, tấn công ứng dụng Web dần trở thành chiến thuật yêu thích của các Hacker. Trong đó các kỹ thuật tấn công phổ biến và nguy hiểm nhất được tội phạm mạng khai thác bao gồm SQL Injection, Cross Site Scripting,… Trước thực tế này, các doanh nghiệp cần nhanh chóng tối ưu hệ thống bảo mật ứng dụng Web. Có vậy mới bảo vệ Website khỏi những vụ tấn công có chủ đích. Sở hữu nhiều tính năng vượt trội, tường lửa ứng dụng Webchính là giải pháp đang được đánh giá cao, nâng cao hiệu quả bảo mật.

> WAF giúp bảo vệ các ứng dụng Web bằng cách lọc và giám sát lưu lượng truy cập.

## 1. Tường lửa ứng dụng Web (Web Application Firewall) là gì?

WAF (Web Application Firewall) còn gọi là **tường lửa ứng dụng web**. WAF là một thiết bị proxy có thể xử lý giao thức HTTP nhằm bảo vệ ứng dụng web. WAF kiểm tra lượng truy cập và sẽ lọc ra các yêu cầu có mối đe dọa xâm hại đến website trước khi đến ứng dụng web. <br>
![](https://images.viblo.asia/de955ba3-ad9f-4c05-99b8-bd1479cadb32.png)
<div align="center">Hình 1: WAF tường lửa ứng dụng web</div>

<br>
Tường lửa ứng dụng Web (Web Application Firewall – WAF) được triển khai ở đường biên mạng (Network Edge). Nó thực hiện việc kiểm tra lưu lượng truy cập đến và đi khỏi các ứng dụng Web. WAF có thể lọc và giám sát lưu lượng truy cập để bảo vệ chống lại các cuộc tấn công như SQL Injection, Cross Site Scripting (XSS) hay Cross-site Request Forgery – CSRF (tấn công giả mạo yêu cầu Cross-site).
<br> <br>
WAF hoạt động tại lớp 7 (tầng ứng dụng). Mặc dù WAF có thể bảo vệ chống lại hàng loạt các cuộc tấn công ở lớp ứng dụng nhưng nó không thể tự hoạt động một mình mà phải kết hợp với các công cụ bảo mật khác. Có vậy mới đảm bảo chống lại các cuộc tấn công nhắm vào các lớp mạng khác hoặc các phần khác của môi trường bảo mật. <br>

![](https://images.viblo.asia/3cc17aa8-5099-42aa-9845-ed164c44efae.png)
<div align="center">Hình 2: Mô hình của một hệ thống tường lửa ứng dụng Web ( WAF)</div>
<br>  

**Hoạt động của tường lửa ứng dụng web** <br>
* WAF được triển khai trước các ứng dụng web và phân tích lưu lượng HTTP – kiểm tra cả request GET và POST nhằm phát hiện và chặn bất kỳ thứ gì độc hại.
* Không giống như tường lửa (Firewall) thông thường chỉ đóng vai trò như một cổng an toàn giữa các server, WAF là một biện pháp bảo mật ứng dụng được đặt giữa Web Client và  Web Server.
* Các cuộc tấn công độc hại đến máy tính thường được tự động hóa. Những loại tấn công này rất khó phát hiện vì chúng thường được thiết kế để bắt chước giống lưu lượng truy cập của con người và không bị phát hiện.
* WAF thực hiện kiểm tra chi tiết mọi request và response đối với tất cả các dạng lưu lượng truy cập web phổ biến. Việc kiểm tra này giúp WAF xác định và chặn các mối đe dọa, ngăn chúng xâm nhập vào server.

![](https://images.viblo.asia/26560bd5-0846-4568-82c3-0054baaa62dc.png)
<div align="center">Hình 3: Cách thức hoạt động của WAF trước khi đến ứng dụng web</div>
<br>

## 2. Kiến trúc tường lửa ứng dụng web.

**1. Vị trí đặt WAF:**  <br>
Các thiết bị WAF cứng thường được đặt sau tường lửa mạng và trước máy chủ ứng dụng web. Việc đặt WAF được thực hiện sao cho tất cả các lưu lượng đến ứng dụng web cần qua WAF trước. Tuy nhiên, đôi khi cũng có ngoại lệ khi WAF chỉ được dùng để giám sát cổng đang mở trên máy chủ web. Ngoài ra, các chương trình WAF còn được cài đặt trực tiếp lên máy chủ web và thực hiện các chức năng tương tự như các thiết bị WAF là giám sát các lưu lượng đến và ra khỏi ứng dụng web. <br>

![](https://images.viblo.asia/5db477e6-62de-4265-9fb3-1f569ecb0368.png)
<div align="center">Hình 5:  Một ví dụ triển khai WAF trong máy chủ web Windows</div>
<br>

**2. Mô hình bảo mật:**  <br>
Một WAF hoạt động dựa theo 2 mô hình bảo mật: Positive và Negative. Mô hình Positive chỉ cho phép các lưu lượng hợp lệ được định nghĩa sẳn đi qua và chặn tất cả các lưu lượng còn lại. Mô hình Negative sẽ cho phép tất cả các lưu lượng vượt qua và chỉ chặn các lưu lượng được mà WAF cho là nguy hại. Đôi khi cũng có các WAF cung cấp cả 2 mô hình trên, tuy nhiên thông thường WAF chỉ cung cấp 1 trong 2 mô hình. Với mô hình Postitive thì đòi hỏi nhiều cấu hình và tùy chỉnh, còn mô hình Negative chủ yếu dựa vào khả năng học hỏi và phân tích hành vi của lưu lượng mạng.
<br>

**3. Mô hình hoạt động:**  <br>
WAF có thể hoạt động ở các mô hình riêng biệt, dưới đây là một số mô hình tham khảo: <br>
* Reverse Proxy: đây là chức năng được sử dụng phổ biến khi triển khai WAF. Trong mô hình này, WAF giám sát tất cả các lưu lượng đi đến ứng dụng web, sau đó thay vì cho các địa chỉ IP bên ngoài gửi yêu cầu trực tiếp đến máy chủ web thì WAF đứng ra làm trung gian để gửi các yêu cầu này đến máy chủ web thay cho trình duyệt gốc rồi gửi trả lại kết quả cho các địa chỉ IP kia. Mô hình này có nhược điểm là tạo ra độ trễ khi kết nối từ trình duyệt đến ứng dụng web. <br>
*  Transparent Proxy: Ở mô hình này, WAF đứng giữa tường lửa mạng và máy chủ web và hoạt động tương tự ở mô hình Reverse Proxy nhưng không đứng ra làm trung gian kết nối như bên Reverse Proxy. Mô hình này không đòi hỏi phải thay đổi điều gì trong hạ tầng mạng nhưng có thể không cung cấp được một số dịch vụ như mô hình Reverse Proxy có thể. <br>
*  Layer 2 Brigde: Ở mô hình này, WAF đứng giữa tường lủa mạng và máy chủ web, nhưng hoạt động giống như một thiết bị Switch ở lớp 2. Mô hình này giúp mạng hoạt động với hiệu năng cao và mạng thay đổi không đáng kể, tuy nhiên nó lại không thể cung cấp các dịch vụ cao cấp khác mà các mô hình WAF khác có thể. <br>
*  Host/Server Based: Đây là các phần mềm được cài trực tiếp lên máy chủ web. Các loại Host based không cung cấp các tính năng tương tự như các loại WAF network base. Tuy nhiên mô hình này có thể khắc phục được vài điểm yếu mà các mô hình network base (các thiết bị WAF cứng) có. Tuy nhiên nó cũng làm tăng mức độ tải của máy chủ web. <br>

## 3. Lợi ích của Web App Firewall

* 	Tổng chi phí sở hữu (TCO) thấp: Là một giải pháp cloud tổng thể, WAF không yêu cầu phần cứng, phần mềm, chi phí vận hành và bảo trì, cũng như không cần rack space hoặc chi phí điện. Không cần kỹ sư WAF in-house ở phía khách hàng.  <br>
* 	Bảo mật toàn diện cho trang web: Ngăn chặn việc hack và các cuộc tấn công từ DDoS trước khi tiếp cận server web của bạn cũng như bảo vệ khỏi việc khai thác các lỗ hổng ứng dụng web và code bị lỗi.  <br>
* 	Chi phí băng thông (bandwidth) hiệu quả: Giải pháp tập trung vào việc giảm thiểu tấn công hơn là hấp thụ nhằm đảm bảo rằng băng thông chỉ được sử dụng bởi lưu lượng sạch chứ không phải bởi lưu lượng tấn công độc hại.

<br>
<br>

***~~Lời kết: ~~*** <br>
Tường lửa bảo vệ ứng dụng Web (WAF) cho phép ngăn chặn và giảm thiểu các cuộc tấn công lỗ hổng ở lớp ứng dụng như: SQL injection, cross-site scripting, botnet, DDoS attacks... mà các tường lửa thông thường (Network Firewall) không ngăn chặn được, đồng thời hệ thống đưa ra các cảnh báo tấn công, đề xuất giải pháp ngăn chặn các lỗ hổng đã phát hiện được. Trước mắt Website của các Công ty Điện lực tập trung về Trung tâm dữ liệu của EVNCPC sẽ được bảo vệ, sau đó các ứng dụng Web của EVNCPC sẽ được đưa vào bảo vệ và giám sát thường xuyên. 


Tham khảo:
*  [tim-hieu-ve-tuong-lua-ung-dung-web-waf-web-application-firewall](https://viettelidc.com.vn/tin-tuc/tim-hieu-ve-tuong-lua-ung-dung-web-waf-web-application-firewall)
* [WAF là gì? Tìm hiểu về tường lửa ứng dụng web](https://vietnix.vn/waf/)

<br>