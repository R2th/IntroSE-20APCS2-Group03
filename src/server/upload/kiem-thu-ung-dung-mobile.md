Kiểm thử ứng dụng Mobile là  một quá trình mà một ứng dụng phần mềm được phát triển cho các thiết bị di động cầm tay và chúng sẽ được kiểm thử về chức năng, khả năng sử dụng, và tính nhất quán. Kiểm thử ứng dụng Mobile có thể được tự động hoặc Kiểm thử thủ công

Với bất kì ứng dụng nào, đầu tiên chúng ta phải xác định được các yếu tố liên quan đến ứng dụng:
* Ứng dụng đó dựa trên tập quán chức năng nào ( ngân hàng, kinh hoanh, chơi game hay xã hội, ...)
* Đối tượng mà ứng dụng hướng tới (người tiêu dùng, doanh nghiệp, giáo dục, ...)
* Kênh phân phối được sử dụng để truyền bá ứng dụng (Apple App Store, Google play, phân phối trực tiếp)

Dưới đây mình sẽ chia sẻ các kịch bản kiểm thử cho một ứng dụng đặt vé máy bay trực tuyến

## 1. Functional Testing - Kiểm thử chức năng.

Functional Testing là bước kiểm thử cơ bản nhất cho bất kỳ một ứng dụng nào để đảm bảo rằng nó được làm việc theo đúng các yêu cầu, quy định đã đặt ra. 

Tương tự như các ứng dụng user-interface cơ bản khác, các ứng dụng di động cần đến sự tương tác giữa con người với chúng.

Kịch bản kiểm thử:

* Xác nhận rằng luôn có chuyến bay sẵn sàng được hiển thị cho một điểm đến nào đó và cho phép chọn ngày.
* Xác nhận ngày đã qua không được hiển thị trong kết quả tìm kiếm.
* Xác thực xem ứng dụng có hoạt động bình thường khi có cuộc gọi, tin nhắn, thông báo từ ứng dụng khác đến
* Xác thực ứng dụng hỗ trợ mọi giao dịch cổng thanh toán như Visa, Mastercard, Paypal, vv theo yêu cầu của ứng dụng.
* Xác thực rằng người dùng nhận được thông báo lỗi thích hợp như lỗi Mạng Network.
* Xác thực rằng ứng dụng sẽ tiếp tục ở hoạt động cuối cùng trong trường hợp khởi động lại cứng hoặc sự cố hệ thống.

## 2. Compatibility Testing - Kiểm thử khả năng tương thích.

Kiểm tra khả năng tương thích là bước quan trọng nhất khi nói đến kiểm thử ứng dụng di động. 

Mục đích của mỗi lần kiểm thử khả năng tương thích của ứng dụng di động  là để đảm bảo các chức năng chính của ứng dụng hoạt động đúng như mong đợi trên một thiết bị cụ thể. Sự tương thích của ứng dụng chỉ mất một vài phút, và có thể lên kế hoạch cụ thể trước đó để có thể tiến hành trôi chảy nhất.
![](https://images.viblo.asia/c63e80bf-f413-463c-95db-77e29f9ff2af.png)


Kịch bản kiểm thử:

* Xác minh rằng tìm kiếm chuyến bay được thực hiện thành công với thiết bị Android.
* Xác minh rằng tìm kiếm chuyến bay được thực hiện thành công cho Apple iPad.

## 3. Usability Testing - Kiểm thử khả năng sử dụng
Kiểm tra khả năng sử dụng đánh giá ứng dụng dựa trên ba tiêu chí sau cho đối tượng mục tiêu -

* Hiệu quả - Độ chính xác và đầy đủ mà người dùng được chỉ định có thể đạt được các mục tiêu được chỉ định trong một môi trường cụ thể.
* Hiệu quả - Các tài nguyên sử dụng liên quan đến tính chính xác và đầy đủ của các mục tiêu đạt được.
* Sự hài lòng - Sự thoải mái và chấp nhận của hệ thống làm việc đối với người dùng và những người khác bị ảnh hưởng bởi việc sử dụng nó.

Phải kiểm tra khả năng sử dụng ngày từ giai đoạn đầu của thiết kế ứng dụng và không nên chỉ thực hiện khi ứng dụng hoàn thành.

Kịch bản kiểm thử:

* Kiểm tra phòng trống nên có trên trang chủ.
* Quảng cáo được tài trợ không nên được hiển thị ở giữa nội dung
* Đảm bảo rằng các nút phải có kích thước yêu cầu và phù hợp với ngón tay .
* Đảm bảo rằng các nút được đặt trong cùng một phần của màn hình để tránh gây nhầm lẫn cho người dùng cuối.
* Đảm bảo rằng các biểu tượng là tự nhiên và phù hợp với ứng dụng.
* Đảm bảo rằng các nút có cùng chức năng cũng phải có cùng màu.
* Đảm bảo rằng việc xác thực cho các tiện ích phóng to và thu nhỏ phải được bật.
* Đảm bảo rằng ứng dụng cung cấp một phương thức để quay lại hoặc hoàn tác một hành động, chạm vào mục sai, trong khoảng thời gian chấp nhận được.
* Đảm bảo rằng kích thước phông chữ đủ lớn để có thể đọc được và không quá lớn hoặc quá nhỏ.


## 4. Localization Testing.

Ngày nay, hầu hết các ứng dụng được thiết kế để sử dụng trên toàn cầu và chúng quan tâm đến cả địa điểm, ngôn ngữ, múi giờ, ... của người sử dụng hiện tại. Điều quan trọng là để xác nhận chức năng của ứng dụng khi một người nào đó thay đổi múi giờ. Điều đó phải được đưa vào xem xét rằng đôi khi thiết kế dành cho các quốc gia phương Tây có thể làm việc không như mong muốn đối với các đối tượng từ các nước phương đông và ngược lại.

![](https://images.viblo.asia/6da57286-e718-4175-9037-c5c690bf5ca8.png)

Kịch bản kiểm thử:

* Xác minh rằng không có vấn đề giao diện người dùng hoặc dữ liệu cắt bớt khi chúng tôi sử dụng các ứng dụng di động với các ngôn ngữ khác nhau (hay nói, ngôn ngữ không phải tiếng Anh).
* Xác minh rằng chức năng thay đổi thời gian múi giờ được xử lý một cách thuận tiện cho các ứng dụng điện thoại di động của bạn.

## 5. Laboratory Testing.

Laboratory Testing thường được thực hiện bởi nhà mạng, được thực hiện bằng cách mô phỏng một cách hoàn chỉnh các mạng không dây. Kiểm thử này được thực hiện để tìm ra những trục trặc bất kỳ khi một ứng dụng điện thoại di động sử dụng giọng nói  hoặc kết nối dữ liệu để thực hiện một số chức năng.


Kịch bản kiểm thử:

* Xác minh rằng không có trục trặc trong khi một khách hàng đang có voice chat với nhân viên hỗ trợ.
## 6. Performance Testing - Kiểm thử hiệu suất.

Thực hiện kiểm thử hiệu suất của Mobile bao gồm hiệu suất của ứng dụng client, hiệu suất server và hiệu suất mạng. 

Mục tiêu cơ bản của loại thử nghiệm này là đảm bảo ứng dụng hoạt động có thể chấp nhận được theo các yêu cầu hiệu suất nhất định như truy cập bởi một số lượng lớn người dùng hoặc loại bỏ một phần cơ sở hạ tầng quan trọng như máy chủ cơ sở dữ liệu.
![](https://images.viblo.asia/fd0c81b6-49ab-4d1c-b3ce-e6f00295dccb.png)


Kịch bản kiểm thử:

* Xác minh rằng việc check về các chuyến bay chuyến bay có sẵn chỉ mất một khoảng thời gian hợp lý.
* Xác minh rằng trong khi đang check các chuyến bay có sẵn điện thoại di động hoạt động bình thường và không treo.
* Xác định mức tiêu thụ pin của ứng dụng 
* Xác định hiệu suất ứng dụng khi thực hiện thay đổi mạng từ Wifi thành 2G/3G và ngược lại

## 7. Stress Testing.

Stress Testing là trường hợp kiểm thử với mục đích phát hiện lỗi trong những trường hợp ngoại lệ, bị treo, và deadlocks mà có thể không được chú ý trong quá trình Functional Testing và interface testing. 

Dưới đây là danh sách của một số các tiêu chí để Stress Testing:

* Tải ứng dụng của bạn với dữ liệu càng nhiều càng tốt để cố gắng đạt được điểm giới hạn của nó.
* Thực hiện các hành động tương tự và nhiều hơn thế nữa. 
* Thực hiện các hoạt động lặp đi lặp lại ở tốc độ khác nhau - rất nhanh hoặc rất chậm. 
* Để ứng dụng của bạn chạy trong một thời gian dài, cả hai tương tác với các thiết bị và chỉ để cho nó nghỉ sau khi thực hiện một số nhiệm vụ tự động sau một thời gian dài, ví dụ: một slideshow.

* Tap ngẫu nhiên vào màn hình và bàn phím thiết bị trong quá trình chạy ứng dụng.
* Cài đặt nhiều ứng dụng chạy trên thiết bị của bạn để bạn có thể chuyển đổi giữa các ứng dụng của bạn và các ứng dụng khác.

Kịch bản kiểm thử

* Kiểm tra 1000 người dùng đang truy cập vào các ứng dụng điện thoại di động để tìm kiếm các chuyến bay nội địa.

* Kiểm tra 1000 người dùng đang truy cập vào các ứng dụng điện thoại di động để tìm kiếm các chuyến bay quốc tế.

## 8. Security Testing - Kiểm thử bảo mật.

Lỗ hổng để hack, xác thực và chính sách thẩm định, bảo mật dữ liệu, quản lý data và tiêu chuẩn bảo mật khác cần được xác nhận đó là một phần của Security Testing.

Một cách để kiểm tra các trường hợp liên quan đến an ninh là để lộ dữ liệu của điện thoại di động của bạn thông qua một máy chủ proxy như OWASP Zed Attack Proxy và tìm kiếm các lỗ hổng.

![](https://images.viblo.asia/6f0f97da-f126-4f97-9dd5-20c5efe6ec8c.png)


Kịch bản kiểm thử:

* Chắc chăn rằng các ứng dụng không được thực thi với các thông tin của cùng một người dùng trên hai thiết bị di động khác nhau.
* Chắc chắn rằng một phiên làm việc tự động hết hạn, nếu nó vẫn không hoạt động trong thời gian hơn 15 phút.

### Tài liệu tham khảo:

https://www.tutorialspoint.com/mobile_testing/mobile_testing_application.htm