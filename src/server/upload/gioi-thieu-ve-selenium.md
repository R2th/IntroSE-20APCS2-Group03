# 1. Selenium là gì?
  ## 1.1. Selenium
  Selenium là một nguyên tố hóa học với số nguyên tử 34 và ký hiệu hóa học Se. Nó là một phi kim, về mặt hóa học rất giống với lưu huỳnh. Từ Selenium xuất phát từ tiếng hy lạp “selene”, có nghĩa là mặt trăng. Cách đặt tên trên có liên quan đến sự phản quang của Selenium được nhân lên khoảng 1000 lần khi Selenium được đưa từ bóng tối ra ánh sáng mặt trời…
![](https://images.viblo.asia/3531cc85-d96b-49ad-b723-5f3b628ae2e1.jpg) 
## 1.2. Selenium Testing
Kiểm thử được thực hiện bằng công cụ Selenium thường được gọi là Selenium Testing.

Selenium Testing là một bộ kiểm thử tự động miễn phí (mã nguồn mở), chỉ dành cho các ứng dụng web trên nhiều trình duyệt  như IE, Mozilla firefox, Chrome, Safari, Opera và hầu hết các hệ điều hành như Windows, Mac, Linux.
## 1.3. Nguồn gốc,lịch sử
Selenium chủ yếu được phát triển bởi  **Jason Huggins** là một kỹ sư của **ThoughtWorks** từ **năm 2004** với tên ban đầu là **JavaScriptTestRunner**. Đến **năm 2007**, tác giả **Jason Huggins** gia nhập Google và phát triển thành Selenium như hiện nay.

## 1.4. Tên gọi Selenium
Cái tên Selenium xuất phát từ một trò đùa của Huggins trong một email, chế giễu một đối thủ cạnh tranh tên là **Mercury** ( công ty đã tạo ra một framework thử nghiệm tự động khác phổ biến hơn trong quá trình phát triển Selenium), ông nói rằng **you can cure mercury poisoning by taking selenium supplements** (bạn có thể chữa ngộ độc thủy ngân bằng cách bổ sung selenium). Những người khác nhận được email , họ đồng ý và lấy tên **Selenium**
# 2. Tại sao nên sử dụng Selenium
* Selenium là Tool free và có open source. Vì là mã nguồn mở nên chúng ta có thể sử dụng mà không phải lo lắng về phí bản quyền hay thời hạn sử dụng

  Vì là mã nguồn mở nên Selenium có một cộng đồng hỗ trợ khá mạnh mẽ. Bên cạnh đó, Google là nơi phát triển Selenium nên chúng ta hoàn toàn có thể yên tâm về sự hổ trợ miễn phí khi có vấn đề về Selenium. 
  
  Tuy nhiên, đây cũng là một điểm yếu của Selenium. Cơ bản vì là hàng miễn phí, cộng đồng lại đông nên một vấn đề có thể nhiều giải pháp, và có thể một số giải pháp là không hữu ích. Mặc khác, chúng ta không thể hối thúc hay ra deadline cho sự hỗ trợ.
 
* Selenium là công cụ kiểm thử tự động dành cho các ứng dụng web
* Selenium có cộng đồng sử dụng rộng rãi
* Selenium có khả năng tương thích trên nhiều trình duyệt như Mozilla firefox, Chrome, Safari, Opera, Internet Explorer với mức độ chỉnh sửa script hầu như là không có. Thực sự thì điều này phụ thuộc phần lớn vào khả năng viết script của chúng ta
* Selenium có khả năng tương thích tốt với nhiều platform như [ Java](https://en.wikipedia.org/wiki/Java_(programming_language)), [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)), [Ruby](https://en.wikipedia.org/wiki/Ruby_(programming_language)),[ JavaScript](https://en.wikipedia.org/wiki/JavaScript), [R](https://en.wikipedia.org/wiki/R_(programming_language)) and [Python](https://en.wikipedia.org/wiki/Python_(programming_language)).
* Selenium không chỉ là một tool hay một tiện ích mà nó là một gói tool cho cùng một chức năng và được biết đến như một suit (bộ).
Nó có bốn thành phần.

   - Môi trường phát triển tích hợp Selenium (IDE).
   - Selenium Remote Control (RC).
   - WebDriver.
   - Selenium Grid.
* Chạy test case ở backround. Khi chúng ta thực thi một test scrpit, chúng ta hoàn toàn có thể làm việc khác trên cùng một PC. Điều này hỗ trợ chúng ta không cần tốn quá nhiều tài nguyên máy móc khi chạy test script.
* Selenium thường xuyên được phát triển và cải tiến.
# 3. Phân loại Selenium
![](https://images.viblo.asia/b8db34a1-4328-4fb8-b526-31bc3a19c5e2.png)

## 3.1. Selenium IDE (Integrated Development Environment)
* Là một công cụ được xây dựng dưới dạng **Add-ons** của **firefox**. Đây là cách tiện ích nhất để xây dựng các ca kiểm thử, gồm các phần tử giao diện giúp chúng ta có thể thực hiện các thao tác. Nó giúp tiết kiệm thời gian và là cách thông minh để hiểu được kịch bản Selenium.
* Bộ công cụ cho phép chúng ta **Record/Playback** một test suit. Nhờ đó Tester có thể nhanh chóng tạo ra một kịch bản test (test script) bằng cách **record trực tiếp** các thao tác của mình trên các đối tượng cần kiểm tra thành 1 tập các **câu lệnh** bằng ngôn ngữ kịch bản được phát triển cho Selenium IDE và Selenium Core có **dạng bản HTML** sau đó **Playback** (chạy lại) các câu lệnh này để kiểm tra. Công cụ này rất hữu dụng vì nó tiết kiệm được thời gian viết kịch bản kiểm tra và có thể lưu kịch bản test đưới nhiều loại ngôn ngữ lập trình.

## 3.2. Selenium RC (Selenium Remote control)
* Là bộ công cụ cho phép **nhận các test script** được thu bởi Selenium IDE. Nó cho phép **chỉnh sửa, cải tiến** linh động **bằng ngôn ngữ lập trình khác nhau**.  Sau đó  khởi động một trong các trình duyệt web được chỉ định để kiểm tra trực tiếp trên trình duyệt đó. Selenium RC còn cung cấp khả năng **lưu lại kết quả** kiểm tra.
* Nó là một công cụ **đơn lẻ**, tức là bạn phải cài thư việc **Selenium server standalone**, sau đó khởi động server manual (bằng tay). Server sẵn sàng thì bạn mới bắt đầu chạy được test
* Selenium RC là phiên bản cũ, hầu hết bây giờ không ai còn dùng mà chuyển qua Selenium WebDriver luôn rồi.

## 3.3. Selenium Grid
Vào năm 2008, **Philippe Hanrigou** (lúc đó làm tại ThoughtkWorks) đã tạo ra "**Selenium Grid**", cung cấp một hub cho phép **chạy nhiều thử nghiệm Selenium đồng thời trên bất kỳ số lượng hệ thống cục bộ hoặc từ xa nào**, do đó giảm thiểu thời gian thực hiện thử nghiệm. Lưới được cung cấp, dưới dạng nguồn mở, khả năng tương tự như đám mây Google nội bộ / riêng tư cho Selenium RC. 

   Ngay cả việc test manual, tester cần test trên nhiều môi trường, nhiều nền tảng khác nhau. Ví dụ như nền tảng web thì có nhiều loại browser như Chrome, Firefox, Safari,… Mobile gồm nhiều devices, nhiều phiên bản hệ điều hành. Vỡi mỗi môi trường thì đều cần một lượng effort nhất định.

   Automation test cũng vậy, chúng ta cần chạy kịch bản test trên nhiều môi trường khác nhau, với mỗi môi trường, bộ kịch bản test cũng khác nhau, và nếu như vậy thì effort bỏ ra cho automation cũng rất lớn, vừa viết code, vừa tạo data, vừa thời gian chạy test. Rất may, Selenium hỗ trợ một tính năng nhằm khắc phục tình trạng trên, đó là Selenium Grid.

* Là một trong số các bộ test tool của selenium, nó cho phép chúng ta có thể **chạy nhiều kịch bản test trên nhiều máy, nhiều hệ điều hành và nhiều trình duyệt khác nhau trên cùng một lúc**.
* Selenium Grid còn giúp tiết kiệm thời gian thực hiện bộ test case. Ví dụ, ứng dụng của bạn cần chạy trên 5 trình duyệt khác nhau, nếu thông thường thì bạn phải thực hiện chạy 1 test case của bạn trên 5 trình duyệt khác nhau nhưng với Selenium Grid thì bạn chỉ cần chạy 1 lần.

## 3.4. Selenium Web Driver
Năm 2007 **Simon Stewart** tại ThoughtWorks đã phát triển một công cụ tự động hóa trình duyệt ưu việt có tên là **WebDriver**
* Là các gói thư viện hỗ trợ kiểm thử trên **nền tảng web**, hỗ trợ nhiều ngôn ngữ lập trình khác nhau để tạo kịch bản test đầy đủ.
* Hiện tại WebDriver đã mạnh, cộng đồng người dùng và người phát triển lớn khiến WebDriver có thể giải quyết nhiều bài toán khó. Tester sử dụng các thư viện (libraries) kết hợp các thư viện bên ngoài (ví dụ như poi – xử lý file excell, log4j – hiển thị log, …) để xây dựng kịch bản (script).

 Năm 2009, sau cuộc họp giữa các nhà phát triển tại Hội nghị tự động hóa thử nghiệm của Google, họ đã quyết định hợp nhất hai dự án  **Selenium RC** với **Web Driver** và gọi dự án mới là **Selenium WebDriver**, hoặc Selenium 2.0.
## Kết luận: 
Mọi người nói, thấy ở đâu có automation testing thì ở đó có Selenium. Hầu hết các công cụ tự kiểm thử tự động như QTP, Katalon, … đều phát triển dựa trên công cụ Selenium, vì thế muốn thực hiện automation testing thì chúng ta phải đi từ Selenium. Ở bài viết trên mình đã chia sẻ về quá trình hình thành cũng như các thành phần của Selenium, và hôm sau chúng ta sẽ cùng nhau tìm hiểu về cơ chế hoạt động, thao tác, và từng chức năng cụ thể của từng thành phần trên Selenium. 

## Tài liệu tham khảo
https://en.wikipedia.org/wiki/Selenium_(software)
https://text.relipasoft.com/2017/12/cung-tim-hieu-ve-selenium/?fbclid=IwAR00i7V8uIN858c7lX0wP5sgfwn3jdm7b77V_j_CIgk7kw2DsIZfkeNt22c