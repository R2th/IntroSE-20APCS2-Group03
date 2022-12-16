Ngày nay, các ứng dụng trên điện thoại di động ngày càng phát triển và mở rộng với nhiều tính năng đa dạng như các ứng dụng từ điển, học tiếng nước ngoài, kiểm tra sức khỏe, chơi game, chụp ảnh, nghe nhạc, mạng xã hội,...Điều này làm cho điện thoại di động trở nên một thế giới đầy trải nghiệm thú vị với người dùng hơn là việc chỉ nghe, gọi và nhắn tin đơn thuần. Và để các trải nghiệm này trở nên hữu ích, tức là các ứng dụng này hoạt động tối ưu, chất lượng nhất có thể khi đến tay người dùng, quá trình kiểm thử cũng đang được triển khai rộng rãi trên các thiết bị di động, đặc biệt là trên smartphone. Có 2 loại kiểm thử trên thiết bị di động là kiểm thử phần cứng và kiểm thử phần mềm:
* Kiểm thử phần cứng (hardware testing): gồm các hoạt động như kiểm thử bộ vi xử lý, độ phân giải, kích thước màn hình, Ram và Rom, Wifi, Bluetooth,... Kiểm thử phần cứng còn được gọi là mobile testing
* Kiểm thử phần mềm hay được gọi là kiểm thử ứng dụng di động (mobile application testing) là các hành động kiểm thử sự hoạt động của các app được cài trên các thiết bị di động.

# Người ta chia ứng dụng trên di động thành 3 loại:

## 1. Native Mobile App
- La các ứng dụng được viết riêng cho một loại nền tảng như iOS, Android, Windows Phone bằng các ngôn ngữ tương ứng của mỗi nền tảng đó (như Java trên Android, Object C trên iOS, C# trên Windowphone). Mỗi Native App chỉ chạy được trên 1 nền tảng và không thể mang sang các nền tảng khác, như không thể mang app game trên iOS sang chạy ở Android được. Ví dụ cho Native App là các game mobile hiện nay.
## 2. Web-based App
- Là các ứng dụng chạy trên nền web, người dùng phải sử dụng các trình duyệt khác nhau như Chrome, Firefox, Safari để truy cập vào web-serve để sử dụng. Chúng được viết bằng các ngôn ngữ web như HTML5, CSS, Javascript hoặc jQuery Mobile. Nhìn chung, giao diện và nội dung của các app này sẽ giống với trên web vì được load từ web về. Ví dụ như m.facebook.com.
## 3. Hybrid App
- Còn gọi là ứng dụng lai vì nó là sự kết hợp ưu điểm giữa 2 loại trên để có được sự trải nghiệm cao nhất, có thể chạy được offline lẫn online và sử dụng kỹ thuật làm web như HTML5 và CSS. Các thành phần cơ bản thì vẫn được viết bằng ngôn ngữ web, nhưng được đặt trong native container nên vẫn có thể đưa lên kho tải. Ví dụ Vnexpress là ứng dụng trang tin tức lai.

# Một số gạch đầu dòng cho việc kiểm thử ứng dụng trên thiết bị di động
## 1. Về cài đặt và định hình ứng dụng
- Ứng dụng của bạn được khách hàng yêu cầu test trên thiết bị di động hay tablet nào (ví dụ ở dự án hiện tại của tôi về iOS là trên iPhone 5SE, iPhone 6S và iPhone 8Plus), kích thước màn hình hỗ trợ  là bao nhiêu (như 4.0 inch, 4.5 inch,...) để dùng chương trình giả lập và dùng các thiết bị di động đúng yêu cầu đó để kiểm thử.
- Ứng dụng cần kiểm thử được lưu trữ ở đâu? (thẻ nhớ hay bộ nhớ trong của điện thoại)
- Ứng dụng cùng hoạt động trên nhiều thiết bị khác nhau thì việc đồng bộ sẽ thế nào?
- Mình có thể tải ứng dụng ở đâu? Có chú đến các case như đầy bộ nhớ hoặc bị gián đoạn trong quá trình tải
- Quá trình cài đặt ban đầu, gỡ bỏ rồi lại cài lại cũng cần được kiểm thử, có tính đến trường hợp bị gián đoạn
- Quá trình update version mới, nếu người dùng không update thì sẽ thế nào cũng cần được test
## 2. Về UI của ứng dụng
- Màu nền, màu chữ, chữ hoa chữ thường, font chữ ra sao, khớp với Design không. Nếu không có Design thì theo cảm nhận của người test, UI như thế có bị rối mắt người dùng không, khó đọc và gây khó chịu không
- Font size, size của các text box, button và căn lề trái, phải, giữa thế nào, chế độ landscape (xoay ngang xoay dọc) ra sao, có bị vỡ màn hình không....
- Border của các text box, button, icon,... có đúng không, mượt không? Vị trí của chúng có đúng thiết kế không?
- Text, tooltip, placeholder của các nút, tên hiển thị dài, các icon hướng dẫn, warning message, nội dung trang hiển thị,...
- Hiệu ứng scroll down/up, pagination, chuyển trang có hoạt động không
- Sau khi rời màn hình đó sang màn khác hay reload lại trang/signout-signin lại có lưu dữ liệu không
- Tùy theo đặc tả của từng dự án mà kiểm tra xem các hiệu ứng khác như swipe, touch, tap on, zoom in/ou, pinch, shake,... có hoạt động không
- Keyboard sử dụng đúng, không gõ ra lỗi chính tả,...
- Hiển thị header and footer có đúng không
- Các giá trị mặc định (ngay sau khi mở màn hình ra) đúng không
- Chạm nhiều lần cùng 1 lúc vào ảnh thì ảnh có được phóng to/thu nhỏ không, giao diện tổng thể có bị vỡ không, vẫn hoạt động được chứ...
## 3. Về chức năng của ứng dụng
- Test đầy đủ các chức năng của ứng dụng hoạt động đúng mong muốn KH trong bản đặc tả và thiết kế ban đầu (chú ý đến các giá trị biên max/min)
- Kiểm thử các chức năng ngoài luồng
- Test các chức năng này khi mất mạng, mất kết nối Wifi, kết nối chậm, chế độ máy bay, kết nối 3G, 4G,...
- Click, rotate, swip, scroll,...nhanh có bị lỗi không
- Sự chuyển hướng của các link kèm trong ứng dụng có đến đúng trang cần hoặc việc đăng nhập vào các Social link như G+, Facebook
- Thời gian của ứng dụng, hoặc khi thay đổi các cài đặt trong thiết bị di động thì hoạt động của ứng dụng ra sao, bị ảnh hưởng không,...
- Hoạt động của ứng dụng thế nào trong trường hợp khóa màn hình hay đang sử dụng các ứng dụng nghe nhạc,...
- Xác nhận sự đồng bộ khi đăng nhập ứng dụng ở các thiết bị khác nhau như desktop, table, smartphone
- Với các ứng dụng có thể chụp ảnh, kiểm thử khả năng chụp ảnh và sau khi chụp thì được lưu trữ ở đâu
- Kiểm thử Notification từ ứng dụng như update version/tính năng mới, hoặc nhắc nhở,..
- Chú ý đến các trường hợp khác như đang sử dụng ứng dụng thì có cuộc gọi đến, có tin nhắn, pin yếu,...
- Kiểm thử các trường hợp hệ thống bị crash,...
- Kiểm thử ứng dụng khi có cùng lúc nhiều đối tượng hoạt động xem có hoạt động tốt không
- Kiểm tra việc chuyển giữa các màn của app xem có mượt và chính xác không
## 4. Về Performance and Load test
- Kiểm tra xem ứng dụng cần khoảng thời gian bao lâu để mở ra cho người dùng sử dụng
- Sự phản hồi các xử lý của ứng dụng có nằm trong khoảng thời gian cho phép không?
- Xem ứng dụng ngốn hết bao nhiêu tài nguyên như tốn bao nhiêu pin
- Kiểm tra mức tiêu thụ bộ nhớ thiết bị của ứng dụng
- Kiểm tra việc chạy song song cùng lúc nhiều ứng dụng khác khi đang sử dụng ứng dụng đang kiểm thử
- Việc khôi phục ứng dụng sau một khoảng thời gian sử dụng dài,...
Ngoài ra, chúng ta còn cần chú ý đến kiểm thử tính thân thiện dễ dùng của ứng dụng (như cung cấp hướng dẫn cho người dùng, text đơn giản, menu rõ ràng,...), khả năng tương thích của ứng dụng trên nhiều nền tảng phần cứng/phần mềm, hệ điều hành, môi trường mạng (như thực hiện các thao tác của ứng dụng trên Chrome, Safari, IE hay khi thay đổi từ 3G/4G sang dùng Wifi hoặc ứng dụng hoạt động tốt khi có nhiều kết nối như Bluetooth/Wifi/dây cáp,...), khả năng tương tác với các ứng dụng khác trên cùng thiết bị di động với ứng dụng đang test, Monkey testing, Security Test, Location test,...

* Nguồn tham khảo:
https://csc.edu.vn/kiem-thu-phan-mem/tin-tuc/kien-thuc-kiem-thu/mobile-app-testing-mot-so-luu-y-cho-nguoi-moi-bat-dau-224
https://techtalk.vn/su-khac-nhau-giua-native-app-mobile-web-app-va-hybrid-app.html
http://kiemthuphanmemvvn.blogspot.com/2015/02/mobile-testing1.html
https://viblo.asia/p/test-viewpoint-cho-test-ung-dung-tren-mobile-YWOZrMpPKQ0