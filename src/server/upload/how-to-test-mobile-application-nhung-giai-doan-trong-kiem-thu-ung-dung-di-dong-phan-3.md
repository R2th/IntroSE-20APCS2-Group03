Phần 1 và phần 2, chúng ta đã có những nhận định cơ bản về đặc thù của một ứng dụng di động, một vài giai đoạn trong kiểm thử ứng dụng di động(các loại test cơ bản trong những giai đoạn đó). Phần này chúng ta sẽ tìm hiểu hết về những giai đoạn còn lại trong kiểm thử di động. 

### IV. UI (User Interface) testing - Kiểm thử giao diện

![](https://images.viblo.asia/ab040e8d-186c-4c07-b28e-51daa885ce91.png)



Khái niệm này đối với một tester chắc là quá quen thuộc đối với công việc của mình. Kiểm thử giao diện nhằm đảm bảo đồ họa, giao diện của ứng dụng bạn đang phát triển đáp ứng được các thông số kỹ thuật đưa ra.

Dưới đây là một số điểm trọng tâm cần chú ý khi kiểm thử giao diện ứng dụng trên di động:

* Đảm bảo ứng dụng được tuân thủ các tiêu chuẩn UI cơ bản nhất(Button có những trạng thái hiển thị khác nhau, hyperlink text có gạch chân phía dưới, primary button hiển thị với highlight...)
* Kiểm tra giao diện hiển thị của ứng dụng với những màn hình có độ phân giải khác nhau trên thị trường di động: 640 × 480, 800 × 600, 1024 × 768, 1280 × 800, 1366 × 768, 1400 × 900, 1680 × 1050.
* Kiểm tra hiển thị của ứng dụng trên những thiết bị khác nhau, khác model, khác nhà sản xuất, độ phân giải.
* Kiểm tra các thành phần chính hiển thị: Các button, icon, màu sắc, liên kết, font chữ, kích thước font, layout, định dạng văn bản, tiêu đề, danh sách hiển thị...
* Quảng cáo được thêm vào không đè lên các thành phần của ứng dụng.
* Đối với các quảng cáo tùy chọn, đảm bảo button đóng phải có, và có thể đóng để hiển thị lại ứng dụng bình thường.
* Kiểm tra hiển thị của ứng dụng trên các loại màn hình khác nhau: Retina, Amoled, LCD...
* Kiểm tra hiển thị của các thành phần, nếu ứng dụng vừa hỗ trợ portait, vừa hỗ trờ landscape.

Các bạn có thể tìm hiểu kĩ hơn về UI/UX tại [đây](https://viblo.asia/p/nhung-dieu-can-biet-ve-uiux-trong-kiem-thu-phan-mem-RnB5p1M2KPG).


### V. Compatibility (Configuration) testing - Kiểm thử tính tương thích thiết bị

Kiểm thử tương thích nhằm đảm bảo ứng dụng đạt hiệu suất sối đa khi sử dụng trên các thiết bị khác nhau - có kích thước, độ phân giải màn hình, cấu hình phần cứng, phiên bản phần mềm khác nhau. Ở đây, chủ yếu vẫn là các loại sau:

* Cấu hình của phiên bản hệ điều hành.
* Cấu hình của trình duyệt sử dụng.
* Cấu hình của cơ sở dữ liệu.
* Cấu hình của thiết bị.
* Cấu hình của kết nối dữ liệu.

![](https://images.viblo.asia/e7532f52-5806-49c6-a5f2-d27b57fcf4de.jpg)

**Kiểm tra phiên bản hệ điều hành** giúp bạn chắc chắn rằng ứng dụng của mình trên các hệ điều hành khác nhau: Windows, iOS, Android, Blackberry, ColorOS...

**Kiểm tra trình duyệt** testing đảm bảo ứng dụng hoạt động ổn định và chính xác khi xử dụng trình duyệt khác nhau như: Mozilla Firefox, Google Chrome, Safari, Internet, Opera Mini...

**Kiểm tra cơ sở dữ liệu** nhằm đảm bảo tính chính xác của ứng dụng khi sử dụng cấu hình cơ sở dữ hiệu khác nhau:  Oracle, DB2, MySql, Sybase...

**Kiểm tra cấu hình thiết bị** nên tính tới các trường hợp như:

* Loại thiết bị: Điện thoại, máy tính bảng, thiết bị nghe nhạc...
* Cấu hình của thiết bị: Bộ nhớ RAM, độ phân giải màn hình, tỉ lệ màn hình, thời lượng pin, bộ nhớ trong...

**Kiểm tra cấu hình mạng** đảm bảo chắc chắn rằng ứng dụng của bạn vẫn hoại động tốt và ổn định với các loại kết nối mạng khác nhau: EDGE/2G, 3G, LTE, Wifi.

Một vài mẹo khi kiểm thử tính tương thích trên thiết bị:

* Tạo một bảng, ma trận đan chéo giữa các cấu hình nằm trong sự cho phép của ứng dụng: nhằm đánh giá khách quan nhất về hoạt động của ứng dụng.
* Nên ưu tiên cấu hình thiết bị.
* Kiểm tra từng cấu hình, từng bước, kịch bản đã định sẵn theo độ ưu tiên đã được định danh bằng sự phổ biến, sự nổi tiếng của các thiết bị -  cụ thể tùy vào yêu cầu của khách hàng.

### VI. Perfomance testing - Kiểm thử hiệu năng

![](https://images.viblo.asia/8ff41120-24b3-486a-b284-8cf09dbcbe4e.png)

Kiểm thử hiệu năng là bao gồm các thể loại kiểm thử nhằm mục đích xác định khả năng hoạt động, tính ổn định, mức tiêu thụ tài nguyên, các thuộc tính khác và chất lượng sử dụng ứng dụng theo các kịch bản sử dụng khác nhau.

* Mục đích chính của kiểm thử hiệu năng là:

    * Kiểm tra thời gian hồi đáp của ứng dụng với các yêu cầu khác nhau, để đảm bảo rằng ứng dụng hoạt động hoạt động theo các yêu cầu của một người dùng thông thường (**Load testing** - Kiểm thử tốc độ).
    * Kiểm tra khả năng làm việc của ứng dụng khi mức tải lượt quá nhiều lần của một người dùng (**Stress test** - Kiểm thử hiệu suất).
    * Kiểm tra khả năng hoạt động của ứng dụng trong thời gian dài, trong mức bình thường (**Stability testing** - Kiểm thử độ ổn định).
    * Kiểm tra hiệu suất làm việc của ứng dụng trong trường hợp mở rộng cơ sở dữ liệu, trên mức bình thường, trong một khoảng thời gian cho phép (**Volume testing** - Kiểm thử khối lượng).
    * Xác định số người dùng có thể đồng thời làm việc với ứng dụng trong một khoảng thời gian (**Concurrency testing** - Kiểm thử đồng thời).


* Một vài điều cần lưu ý khi kiểm thử hiệu năng cho ứng dụng của bạn:
    * Chắc chắn rằng ứng dụng của bạn hoạt động ổn định trong các điều kiện kết nối khác nhau.
    * Tìm các lý do, nguyên nhân vì sao gây ra sự trì hoãn, xử lý chậm trong ứng dụng của bạn.
    * Đánh giá được khối lượng tải của ứng dụng để đối phó với khối lượng tải theo kế hoạch.
    * Xác định được thời gian phản hồi của ứng dụng khi gặp các điều kiện kĩ thuật khác nhau.
    * Kiểm tra sự ổn định khi được một người dùng phá phách sử dụng.
    * Đảm bảo hiệu suất của ứng dụng nếu nó hoạt động trong môi trường kết nối internet không ổn định.
    * Đảm bảo cấu hình giữa người dùng - Server ổn định, có hiệu suất tốt nhất.

### VII. Scurity testing - Kiểm thử bảo mật

![](https://images.viblo.asia/8bc809f3-0680-4c89-9f9c-4352fa61f410.jpg)

Đúng như tên gọi, kiểm thử bảo mật nhằm kiểm tra tính bảo mật của hệ thống, cũng phân tích các rủi ro liên quan đến việc an toàn thông tin dưới sự ảnh hưởng từ: Tin tặc, virus, truy cập trái phép vào các dữ liệu nhạy cảm của hệ thống.

* Sau đây là một vài điểm mà bạn nên xem xét khi kiểm thử bảo mật:
    * Đảm bảo các dữ liệu của người dùng (Mật khẩu, Thẻ ngân hàng, Số điện thoại...) được bảo vệ khỏi các cuộc tấn công mạng.
    * Kiểm tra hệ thống của bạn yêu cầu độ dài của mật khẩu đủ dài để không thể tìm ra được, mật khẩu phải được mã hóa khi lưu vào cơ sở dữ liệu.
    * Đảm bảo rằng ứng dụng không cấp quyền truy cập vào nội dung nhạy cảm mà không có các xác thực rõ ràng.
    * Bảo vệ ứng dụng của bạn khỏi các cuộc[ tấn công SQL](https://vi.wikipedia.org/wiki/SQL_injection).
    * Bảo vệ ứng dụng của bạn trong các cuộc tấn công mạng DDOS.
    * Bảo vệ ứng dụng của bạn khỏi các cuộc tấn công tới người dùng cuối.
    * Bảo vệ hệ thống khi các cuộc tấn công nhằm vào lúc chương trình đang chạy trọng điểm.
    * Quản lý các phiên hoạt động từ các truy cập trái phép vào hoạt động.
    * Ngăn chặn các mã độc hại có thể của bộ nhớ đệm các tập tin.
    * Kiểm tra các tập tin của người dùng khi đưa vào hệ thống, ngăn chặn lại khi phát hiện mã độc.
    * Phân tích sự tương tác của các tệp tin hệ thống, xác định được và sửa các lỗ hổng.
    * Ngăn chặn các độc hại từ cookie.


### VIII. Recovery testing - Kiểm thử phục hồi

Kiểm thử phục hồi xác minh về khả năng chịu đựng và phục hồi thành công từ các lỗi có thể xảy ra do lỗi phần mềm, lỗi phần cứng, khả năng giao tiếp.
* Dưới đây là một vài xác minh trong kiểm thử phục hồi:
    * Kiểm tra sự phục hồi hiệu quả của ứng dụng sau các tình huống lỗi không lường trước.
    * Đảm bảo được sự hồi phục dữ liệu sau khi ngắt kết nối mạng.
    * Kiểm tra phục hồi sau lỗi hệ thống, lỗi giao dịch không thành công.
    * Xác minh được khả xử lý của ứng dụng sau các giao dịch trong trường hợp tắt máy đột ngột (pin yếu, tắt ứng dụng không chính xác, v.v.).

### IX. Localization testing - Kiểm thử nội địa hóa

![](https://images.viblo.asia/4fd2dfd0-796c-4ad1-8fb3-8360383f92ab.png)

Kiểm thử nội địa hóa cho phép bạn kiểm tra sự tương thích của ứng dụng với đối tượng cụ thể nào đó, phù hợp với đặc thù văn hóa hay không.

* Thường thì khi thực hiện LOC(Localization) testing sẽ là 1 team chuyên biệt, hoặc những người có nguồn kiến thức chuyên sâu về ngôn ngữ hoặc văn hóa riêng mới có thể thự hiện được, nhưng sau đây cũng có một vài tip nhỏ cho bạn khi bạn tự mình thực hiện:
    * Xác minh được ứng dụng của bạn hỗ trợ những ngôn ngữ nào.
    * Đảm bảo sự chính xác tuyệt đối về các bản dịch của ứng dụng.
    * Xác minh tính chính xác của bản dịch phục thuộc vào chủ đề của ứng dụng.
    * Kiểm tra định dạng ngày tại mỗi quốc gia sẽ khác nhau.
    * Kiểm tra các dấu phân cách các số hiển thị như thế nào.

Tất nhiên như mình đã nói ở trên, người bản địa với ngôn ngữ mẹ đẻ sẽ được ưu tiên thực hiện localization testing.

---
[Phần 1: How to test mobile application? Tổng quan, so sánh sự khác biệt về Mobile app & Desktop app, chiến lược kiểm thử](https://viblo.asia/p/how-to-test-mobile-application-tong-quan-so-sanh-su-khac-biet-ve-mobile-app-desktop-app-chien-luoc-kiem-thu-phan-1-eW65GP66KDO).


[Phần 2: How to test mobile application? Các giai đoạn, phân loại trong kiểm thử ứng dụng di động](https://viblo.asia/p/how-to-test-mobile-application-cac-giai-doan-phan-loai-trong-kiem-thu-ung-dung-di-dong-phan-2-gDVK29Wr5Lj).

---


Nguồn:

Get Easy QA: https://geteasyqa.com/qa/mobile-apps-testing/

SQL injection: https://vi.wikipedia.org/wiki/SQL_injection

Viblo: https://viblo.asia/newest