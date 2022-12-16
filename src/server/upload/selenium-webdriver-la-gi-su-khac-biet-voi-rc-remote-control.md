# **WebDriver là gì?**

WebDriver là một framework tự động dành cho Web cho phép thực hiện các kiểm thử của mình đối với các trình duyệt khác nhau, không chỉ Firefox, Chrome (không giống như Selenium IDE).

WebDriver cũng cho phép sử dụng ngôn ngữ lập trình trong việc tạo tập lệnh kiểm thử của QA (không thể có trong Selenium IDE).

Bây giờ bạn có thể sử dụng các hoạt động có điều kiện như if-then-other hoặc switch-case. Bạn cũng có thể thực hiện vòng lặp như do-while.
![](https://images.viblo.asia/3b547fb7-3c40-4739-944c-d5d5f9221f4d.jpg)


Các ngôn ngữ lập trình sau được hỗ trợ bởi WebDriver

* Java
* .Net
* PHP
* Python
* Perl
* Ruby

Không cần thiết phải biết tất cả các ngôn ngữ trên. Chúng ta chỉ cần có kiến thức một trong những cái đó. Tuy nhiên, ở phần dưới này, rất phổ biến và hay được sử dụng sẽ tập trung hướng dẫn về Java với Eclipse làm IDE.

# Sự khác biệt giữa Selenium RC và Webdriver

Trước khi WebDriver ra đời năm 2006, đã có một công cụ tự động hóa khác gọi là Selenium Remote Control. Cả WebDriver và Selenium RC đều có các tính năng sau:

Cả hai đều cho phép sử dụng ngôn ngữ lập trình trong việc thiết kế các kịch bản kiểm thử và đều cho phép chạy kịch bản kiểm thử trên các trình duyệt khác nhau. Ngoài ra có 1 vài điểm khác nhau sau:
## 1. Architecture -  Kiến trúc

Kiến trúc của WebDriver đơn giản hơn Selenium RC's.

Nó kiểm soát trình duyệt từ cấp độ hệ điều hành.
Tất cả những gì ta cần là IDE của ngôn ngữ lập trình (chứa các lệnh Selenium của mình) và trình duyệt.
![](https://images.viblo.asia/81f3ffca-6b84-47f8-9c5e-d97fa8262f2b.jpg)
Ngược lại, kiến trúc của Selenium RC's phức tạp hơn nhiều WebDriver

* Trước tiên, ta cần khởi chạy một ứng dụng riêng có tên Selenium Remote Control (RC) Server trước khi có thể bắt đầu kiểm thử.
* Phía Server RC Selenium hoạt động như một "người trung gian" giữa các lệnh Selenium và trình duyệt.
* Khi bạn bắt đầu kiểm tra, Selenium RC Server sẽ đưa vào một chương trình Javascript có tên Selenium Core vào trình duyệt.
* Sau khi chương trình được đưa vào, Selenium Core sẽ bắt đầu nhận các hướng dẫn được chuyển tiếp bởi Máy chủ RC từ chương trình chạy kiểm thử .
* Khi các hướng dẫn được nhận, Selenium Core sẽ thực thi chúng dưới dạng các lệnh Javascript.
Trình duyệt sẽ tuân theo hướng dẫn của Selenium Core và sẽ chuyển tiếp phản hồi của nó tới RC Server.
* Máy chủ RC sẽ nhận được phản hồi của trình duyệt và sau đó hiển thị kết quả. RC Server sẽ lấy hướng dẫn tiếp theo từ tập lệnh kiểm thử để lặp lại toàn bộ chu trình.

![](https://images.viblo.asia/a4c63982-68ab-4a4a-bcef-182cae1a8767.jpg)
## Speed -  Tốc độ

WebDriver nhanh hơn Selenium RC vì nó làm việc trực tiếp với trình duyệt sử dụng công cụ riêng của trình duyệt để điều khiển nó. Selenium RC chậm hơn vì nó sử dụng chương trình Javascript có tên Selenium Core. Selenium Core này là thứ trực tiếp điều khiển trình duyệt chứ không phải qua Selenium RC.

##  Real-life Interaction - Tương tác ngoài đời thực

![](https://images.viblo.asia/aab3cd7e-bdcc-4588-af9f-c1d3a3f044cb.jpg)


WebDriver tương tác với các Page elements theo cách chân thực hơn. Ví dụ: nếu bạn có một Textbox bị disable trên một trang đang test, WebDriver thực sự không thể nhập bất kỳ giá trị nào trong đó giống như cách một người dùng thao tác
![](https://images.viblo.asia/cc76d6c1-292c-49be-8651-1543c07a96d5.jpg)

## API

![](https://images.viblo.asia/867d5ef7-c8a1-476f-9a9c-6ca21858b5d1.jpg)


API của Selenium RC bao phủ hơn nhưng chứa các phần thừa và các lệnh thường gây nhầm lẫn. Ví dụ, hầu hết thời gian, người kiểm thử đều bối rối không biết nên sử dụng type hay typeKeys; hoặc sử dụng click, mouseDown hoặc mouseDownAt. Chưa kể các trình duyệt khác nhau diễn giải từng lệnh này theo những cách khác nhau!

API của WebDriver đơn giản hơn Selenium RC's. Nó không chứa các lệnh dư thừa và gây hiểu nhầm.
## Browser Support - Hỗ trợ trình duyệt

WebDriver có thể hỗ trợ trình duyệt "headless" HtmlUnit  

HtmlUnit được gọi là "headless" bởi vì nó là  trình duyệt vô hình - nó không có GUI - một trình duyệt xử lý tốc độ rất nhanh vì không có thời gian chờ đợi để tải các phần tử trang. Điều này tăng tốc chu kỳ thực hiện kiểm thử của Tester.

Vì nó là vô hình với người dùng, nó chỉ có thể được điều khiển thông qua các phương thức tự động.

## Limitations of WebDriver - Hạn chế của WebDriver


WebDriver không thể sẵn sàng hỗ trợ trình duyệt mới bởi vì WebDriver hoạt động ở cấp độ HĐH. Ngoài ra,  các trình duyệt khác nhau giao tiếp với HĐH theo những cách khác nhau. Nếu một trình duyệt mới xuất hiện, nó có thể có một quá trình giao tiếp với HĐH khác so với các trình duyệt khác. Vì vậy, bạn phải dành cho nhóm WebDriver khá nhiều thời gian để tìm ra quy trình mới đó.
Tuy nhiên, tùy thuộc vào nhóm các nhà phát triển của WebDriver để quyết định xem họ có nên hỗ trợ trình duyệt mới hay không.

Selenium RC đã tích hợp sẵn Trình tạo kết quả kiểm thử  
Selenium RC tự động tạo tệp HTML kết quả kiểm tra. Định dạng của báo cáo được thiết lập sẵn bởi chính RC. Hãy xem một ví dụ về báo cáo này dưới đây.

![](https://images.viblo.asia/aa696cc2-2a58-43e7-b434-a09593efe63e.jpg)


## Kết luận


* WebDriver là một công cụ để kiểm tra các ứng dụng web trên các trình duyệt khác nhau bằng các ngôn ngữ lập trình khác nhau.
* Có thể tự thiết kế các bài kiểm tra cho riêng mình vì WebDriver cho phép bạn được lựa chọn ngôn ngữ lập trình.
* WebDriver nhanh hơn Selenium RC vì kiến trúc đơn giản hơn.
* WebDriver trực tiếp nói chuyện với trình duyệt trong khi Selenium RC cần sự trợ giúp của máy chủ RC để thực hiện điều đó.
* API của WebDriver ngắn gọn hơn Selenium RC's.
* WebDriver có thể hỗ trợ HtmlUnit trong khi Selenium RC không thể.
* Hạn chế duy nhất của WebDriver là:
 không thể dễ dàng hỗ trợ các trình duyệt mới, nhưng Selenium RC thì có thể.
 
 Tài liệu tham khảo : https://www.guru99.com/introduction-webdriver-comparison-selenium-rc.html