Phần thứ hai của hướng dẫn Burp Suite  bao gồm các công cụ xâm nhập và bộ lặp. Sử dụng hướng dẫn Burp Suite này để tùy chỉnh các cuộc tấn công vào các ứng dụng Web thông qua các lỗi SQLi và XSS.
Trong phần đầu tiên của loạt bài hướng dẫn Burp Suite , chúng tôi đã trình bày những điều cơ bản của Burp Suite và trình bày tổng quan về một số công cụ trong khung. Trong phần thứ hai này, chúng tôi sẽ mô tả hai công cụ quan trọng hơn của framework đó là  intruder và repeater..  

Burp intruder
Intruder được sử dụng để tự động hóa các cuộc tấn công tùy chỉnh chống lại các ứng dụng Web. Nó có bốn panel: mục tiêu, vị trí, tải trọng và các tùy chọn - như trong Hình 1.


![](https://images.viblo.asia/7605a81c-fa44-4348-8b98-61bdd24f8bad.PNG)






Hình 1. Burp intruder 

Mục tiêu: Bảng này được sử dụng để chỉ định máy chủ đích (URL) và cổng sẽ sử dụng cho kết nối. Có một tùy chọn để sử dụng mã hóa SSL, nếu cần. Hình 2 cho thấy bảng điều khiển đích.







![](https://images.viblo.asia/77713837-c55e-46e2-81f3-5e14d6c69d8f.PNG)



Hình 2. Bảng mục tiêu trong kẻ xâm nhập Burp

Vị trí: Bảng này rất quan trọng trong việc tự động hóa các chuỗi tấn công vào mục tiêu. Các loại vectơ tấn công là tấn công  sniper , battering ram, pitchfork  và  cluster bomb.


![](https://images.viblo.asia/f0dd2508-3ece-4778-86ab-326e3ae204c8.png)


Hình 3. Bảng vị trí, với các vectơ tấn công khác nhau

Trong hướng dẫn Burp Suite này, Hình 3 cho thấy các vị trí payload được tự động tô sáng bằng ký tự § . Điều này đạt được bằng cách nhấp vào nút tự động ở bên phải. Bạn có thể thêm các điểm đánh dấu và tùy chỉnh kịch bản theo yêu cầu.

Các chức năng tấn công  sniper như một tập payload duy nhất. Ở đây, chỉ có một giá trị được thay thế cho tất cả các vị trí payload theo trình tự. Cuộc tấn công này thường được sử dụng để kiểm tra các cuộc tấn công SQL và XSS phổ biến trên trang web.

Một cuộc tấn công Battering Ram là một loại tấn công khác của tấn công payload đơn. Điều này được sử dụng khi cần một giá trị duy nhất ở vị trí payload và hoạt động tốt khi các quy tắc và chính sách chất lượng mật khẩu được đặt yếu. Việc liệt kê đáng kể cần phải được thực hiện trước khi sử dụng hình thức tấn công này; nó hoạt động trong các tình huống, ví dụ, cả tên người dùng và mật khẩu đều có cùng một giá trị.

Tấn công pitchfork hoặc tấn công cluster bomb có thể được sử dụng khi cần nhiều bộ payload. Trong một cuộc tấn công cluster bomb có hai danh sách, với mỗi từ trong danh sách đầu tiên chạy với một từ tương ứng trong danh sách thứ hai. Nó được sử dụng khi target có một hình thức đăng nhập  bị vi phạm.

Trong phần hướng dẫn Burp Suite này, chúng tôi sẽ thử tấn công SQLi trên trang demo của etopshop tại URL sau: http://www.etopshop.com/demo/pcstore/admin.asp .

Kiểm tra tiêm SQL bằng cách sử dụng Burp  intruder

Sau khi chụp trang như được mô tả trong Phần 1 của loạt bài hướng dẫn Burp Suite này, hãy chọn các điểm đánh dấu payload làm trường tên người dùng và trường mật khẩu. Vì cuộc tấn công yêu cầu hai tham số, chúng tôi sẽ cần một cuộc tấn công payload nhiều lần. Chúng ta sẽ chọn vectơ tấn công pitchfork từ menu thả xuống và danh sách đặt trước để thêm các chuỗi tấn công SQL sẽ được thử tại target. Hình 4 cho thấy các tùy chọn đang được thiết lập cho cuộc tấn công.



![](https://images.viblo.asia/aab6692b-66fa-4f38-ac64-dc0293f4b2cf.PNG)


Hình 4. Kiểm tra tiêm SQL bằng cách sử dụng Burp

Có một số tùy chọn theo bộ tải trọng này. Chúng bao gồm dựa trên ký tự, dựa trên số, ký tự ngẫu nhiên, lực lượng vũ phu, ngày, v.v. Đối với hướng dẫn Burp Suite này, chúng tôi đã sử dụng danh sách đặt trước. Khi chúng tôi thiết lập các tùy chọn và tải trọng ở đây, chúng tôi đã sẵn sàng để kiểm tra mục tiêu. Để làm như vậy, đi đến kẻ xâm nhập trong thanh menu và nhấp vào tấn công tart .

![](https://images.viblo.asia/a70d94e7-9825-4e27-8bc2-e0a7279baacd.PNG)



Hình 5. Cuộc tấn công SQL đang diễn ra với kẻ xâm nhập Burp intruder

Hình 5 cho thấy quá trình  SQL injection. Tab kết quả  hiển thị các payload được gửi đến mục tiêu. Các tab yêu cầu hiển thị các nguồn HTML và làm thế nào các payload được đặt ở các marker chọn. Các phản ứng tab cho thấy rằng tiêm đã thành công; phân tích nguồn HTML cho thấy một thông điệp "Welcome". Để xem trang web, chỉ cần nhấp vào tab render .


![](https://images.viblo.asia/6acbf23d-df85-43ee-906e-b6439f03eba1.PNG)


Hình 6 của hướng dẫn Burp Suite này cho thấy sự thâm nhập thành công của ứng dụng Web, việc sử dụng lỗ hổng SQL injection. Tương tự, các lỗ hổng tấn công XSS cũng có thể được kiểm tra bằng cách sử dụng danh sách đặt trước để tải các chuỗi XSS và thăm dò mục tiêu.






Burp repeater
Bây giờ chúng ta hãy chuyển sang Burp repeater trong hướng dẫn Burp Suite này. Burp repeater là một công cụ được sử dụng để sửa đổi thủ công các yêu cầu HTTP và kiểm tra các phản hồi được cung cấp bởi trang. Điều này thậm chí có thể dẫn đến việc thăm dò các lỗ hổng trên trang web. Về cơ bản, điều này được sử dụng để phát lại các yêu cầu đến máy chủ.

Hiểu XSS với Burp repeater
Đối với hướng dẫn Burp Suite này, chúng tôi sẽ sử dụng ứng dụng Web dễ bị tổn thương tại http://www.steve.org.uk/Security/XSS/Tutorial/simple.html để hiểu và phân tích lỗ hổng XSS (cross-site scripting) trong trang web .



![](https://images.viblo.asia/2c791297-eaab-4aeb-a0da-bf3a1b4b9022.PNG)


Hình 7. Panel Burp repeater

Trong Hình 7, điểm tấn công lấy đầu vào trên trang web đã được tô sáng. Chúng ta cần tìm hiểu xem liệu đầu vào có được khử trùng để tiêm mã hay không. Đầu tiên, chúng ta sẽ thử tiêm HTML đơn giản trên trang web như trong Hình 8. Điều này cho chúng ta biết rằng các thẻ HTML không được khử trùng trong đầu vào. Như trước, sử dụng render để xem trước trang web trong công cụ trong bảng điều khiển riêng.



![](https://images.viblo.asia/6103adc3-03db-43b5-88ba-5d4f2afdcaf1.PNG)


Hình 8. Tiêm HTML

Tiếp theo, chúng tôi sẽ thử thăm dò các lỗ hổng XSS. Đối với điều này, chúng ta cần phải vượt qua một thẻ script. Chuỗi tấn công có thể là một JavaScript đơn giản như:

<iframe src = "javascript: alert ('Xss')"; </ iframe>


![](https://images.viblo.asia/aa468f7c-5bfc-48d7-9688-8877da9ea541.PNG)



Hình 9. Tiêm iframe bằng repeater

Trong hình 9 của hướng dẫn Burp Suite này, chúng ta thấy rằng mã iframe được đưa vào nguồn của trang web. Kiểm tra trình duyệt để xác nhận nếu có lỗi XSS trong ứng dụng. Chúng tôi thấy rằng có một lỗ hổng XSS được phản ánh trên mục tiêu, như trong Hình 10.



![](https://images.viblo.asia/ee2eaad1-be1a-4f6a-a9fe-dbc8f140ca18.PNG)

Hình 10. Xác nhận lỗ hổng XSS trong mục tiêu

Trong phần hướng dẫn Burp Suite này, chúng tôi đã đề cập chi tiết về các công cụ ntruder vàrepeater . Chúng tôi cũng đã giải thích cách phân tích mục tiêu cho các lỗi bảo mật liên quan đến Web như SQL injection và  XSS. Trong phần thứ ba và phần cuối cùng, chúng tôi sẽ đề cập đến các công cụ còn lại của Burp Suite.

Refer: 
Part I: https://viblo.asia/p/huong-dan-su-dung-burp-suite-phan-i-924lJDk6KPM
Part II:  https://www.computerweekly.com/tutorial/Burp-Suite-Tutorial-Part-2-Intruder-and-repeater-tools