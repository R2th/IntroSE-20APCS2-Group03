Chắc hẳn trong chúng ta đều đã quá quen thuộc với cụm từ Selenium như mình, nhưng để hiểu rõ và sử dụng nó thì chắc không phải ai cũng biết, như mình là một ví dụ. Đã biết đến Selenium từ lâu nhưng chỉ dừng lại ở mức độ nghe nói - biết, cũng rất thích tìm hiểu và tò mò, tình cờ bắt gặp 1 series tutorial về Selenium rất hay và dễ hiểu trên đây https://www.softwaretestinghelp.com/selenium-tutorial-1/ nên hôm nay mình quyết định viết blog, 1 phần là để lưu trữ những gì mình học được, phần khác là muốn chia sẻ kiến thức tuyệt vời này đến các bạn. Chúng ta cùng nhau tìm hiểu nhé, có gì chưa đúng thì xin được nhận hết gạch đá của mọi người để mình sửa chữa ạ (yeah)

## Selenium là gì?

Selenium là một bộ công cụ kiểm thử tự động mã nguồn mở dành cho các ứng dụng web, hỗ trợ hoạt động trên hầu hết các trình duyệt như IE, Mozilla FireFox, Chrome, Safari, Opera; và hầu hết các hệ điều hành như Windows, Mac, Linux… Với Selenium bạn có thể viết các kịch bản test (Selenium script) bằng các ngôn ngữ lập trình khác nhau như Java, PHP, C#, Ruby hay Python hay thậm chí là Perl …

Selenium được sử dụng để tự động hóa các thao tác với trình duyệt, hay dễ hiểu hơn là nó giúp giả lập lại các tương tác trên trình duyệt như một người dùng thực sự. Ví dụ bạn có thể lập trình để tự động bật trình duyệt, mở một link, nhập dữ liệu đầu vào, hay lấy thông tin của page, upload, download dữ liệu từ trên trang web... và rất nhiều thứ khác nữa. Hơn nữa, bạn có thể sử dụng tùy biến để tận dụng tối đa sức mạnh của nó. Ngoài mục đích sử dụng trong kiểm thử, bạn còn có thể tự xây dựng một project để tự động hóa những công việc nhàm chán, lặp đi lặp lại của bạn.

## Vì sao lại dùng Selenium?

Kiểm thử tự động là hot trend hiện nay, càng ngày kiểm thử tự động càng được ưa chuộng và sử dụng ở nhiều dự án và công ty, và Selenium là 1 trong những công cụ số 1 được lựa chọn để kiểm thử tự động Web. Bởi vì chúng có 1 số lợi ích to lớn sau: 
1. Giúp bạn thực hiện lặp đi lặp lại  bộ Test Cases một cách dễ dàng.
2. Dễ sử dụng, giao diện đơn giản, thân thiện.
3. Hỗ trợ kiểm tra Ma trận thử nghiệm lớn
4. Cho phép thực thi song song
5. Khuyến khích thực hiện không giám sát
6. Cải thiện độ chính xác do đó giảm lỗi do con người tạo ra
7. Tiết kiệm thời gian và tiền bạc
8. Hỗ trợ export ra nhiều ngôn ngữ phổ biến như Ruby, Java, Python…

Selenium tạo được sự yêu thích , tin tưởng bởi vì:
1. Nó là một mã nguồn mở
2. Nó có một cơ số người dùng lớn và cộng đồng để trợ giúp khi có vấn đề
3. Nó có khả năng tương thích đa trình duyệt và đa nền tảng. 
4. Nó có các kho phát triển hoạt động
5. Nó hỗ trợ nhiều ngôn ngữ
6. Là một trong những công cụ được chấp nhận nhất từ phía các chuyên gia kiểm thử.

![](https://images.viblo.asia/57a4bb54-2070-4d76-8c87-776fa016f8c3.jpg)

## Selenium Components (Các thành phần / cấu trúc của Selenium)

![](https://images.viblo.asia/eb3fe457-13eb-480a-9294-2c94811eeb31.jpg)

Selenium không chỉ là một công cụ đơn lẻ hay một tiện ích, mà là một gói gồm nhiều công cụ kiểm tra, do đó nó được gọi là 1 bộ (Suite). Mỗi loại/công cụ này được thiết kế để phục vụ các yêu cầu của môi trường kiểm thử và nội dung kiểm thử khác nhau. Về cơ bản thì Selenium có 4 thành phần:
* Selenium IDE: Selenium Integreted Development Environment (IDE), là một plug-in trên trình duyệt Fire-Fox, chúng ta có thể sử dụng để ghi lại (record) và chạy lại (play back) các thao tác đó theo một quy trình hay một test case nào đó.
* Selenium RC: Selenium Remote Control (RC), Selenium server khởi chạy và tương tác với trình duyệt web.
* WebDriver: Selenium WebDriver gửi lệnh khởi chạy và tương tác trực tiếp tới các trình duyệt mà không cần thông qua một server như Selenium RC.
* Selenium Grid: Selenium Hub dùng để khởi chay nhiều các test thông qua các máy và các trình duyệt khác nhau tại cùng một thời điểm.

## Giới thiệu tóm tắt về các công cụ Selenium

### Selenium Core

Selenium là kết quả của những nỗ lực không ngừng nghỉ của một kỹ sư tên Jason Huggins từ ThoughtWorks. Với vai trò chịu trách nhiệm kiểm tra thời gian và chi phí nội bộ của ứng dụng, anh nhận thấy sự cần thiết của một công cụ kiểm thử tự động để thoát khỏi các tác vụ thủ công lặp đi lặp lại mà không được ảnh hưởng đến chất lượng và độ chính xác.

Kết quả là vào đầu năm 2004, anh đã xây dựng một chương trình JavaScript, được đặt tên là JavaScriptTestRunner, có thể tự động điều khiển các hành động của trình duyệt, có vẻ rất giống với người dùng thật giao tiếp với trình duyệt.

Tiếp đó, Jason bắt đầu giới thiệu công cụ này với một lượng lớn khán giả. Từ đó, các cuộc thảo luận đã được đưa ra để phân loại công cụ này trong danh mục mã nguồn mở và tiềm năng của nó để phát triển như một khung thử nghiệm có thể sử dụng lại cho các ứng dụng web khác.

Công cụ này sau đó đã được chào đón với tên gọi là "Selenium Core".

### Selenium IDE (Selenium Integrated Development Environment)

Selenium IDE được phát triển bởi Shinya Kasatani. Khi nghiên cứu Selenium Core, anh nhận ra rằng mã JavaScript này có thể được mở rộng hơn nữa để tạo một môi trường phát triển tích hợp (IDE), cái mà có thể cắm (plug) vào Mozilla Firefox được. IDE này có khả năng ghi lại và phát lại các hành động của người dùng trên một phiên bản Firefox mà nó đã được cắm vào. Sau đó, Selenium IDE đã trở thành một phần của gói Selenium Package vào năm 2006. Công cụ này đã tạo ra một giá trị và tiềm năng lớn cho cộng đồng.

Selenium IDE là công cụ đơn giản nhất và dễ nhất trong tất cả các công cụ trong gói Selenium Package. Tính năng ghi và phát lại của nó làm cho nó cực kỳ dễ học với những người chỉ biết sơ sơ với bất kỳ ngôn ngữ lập trình nào. Nhưng Selenium IDE cũng coa 1 vài nhược điểm làm cho nó không phù hợp để sử dụng trong trường hợp các kịch bản thử nghiệm nâng cao hơn. Dưới đây là 1 số ưu - nhược điểm của Selenium IDE

![](https://images.viblo.asia/81c96a22-5338-4fce-8284-18b8b5dfa113.jpg)

***Ưu điểm:***
* Dễ dàng cài đặt và sử dụng
* Không yêu cầu người dùng phải có kỹ năng lập trình, chỉ cần bạn có hiểu biết một chút về HTML và DOM là đã có thể sử dụng được tool rồi.
* Có thể export các test đã tạo để sử dụng trong Webdriver hoặc Selenium RC
* Có cung cấp chức năng để bạn có thể report kết quả hoặc các hỗ trợ khi sử dụng
* Bạn có thể sử dụng tích hợp với các extension khác nữa.

***Nhược điểm:***
* Là 1 extension mà bạn chỉ có thể cài đặt trên trình duyệt Fire Fox
* Nó được thiết kể để tạo các test đơn giản hoặc prototype test
* Với IDE thì bạn không thể thực hiện được các tính toán, câu lệnh phức tạp, hay có điều kiện.
* Hiệu năng hoạt động thì chậm hơn nhiều so với Webdriver và Selenium RC

Những nhược điểm này của IDE không phải là nhược điểm của Selenium. Chúng chỉ là những hạn chế đối với những gì IDE có thể đạt được. Những hạn chế này có thể được khắc phục bằng cách sử dụng Selenium RC hoặc WebDriver.

### Selenium RC (Selenium Remote Control)

Selenium RC là một công cụ được viết bằng Java, cho phép người dùng xây dựng các kịch bản kiểm thử cho một ứng dụng dựa trên web bằng bất kỳ ngôn ngữ lập trình nào mà họ chọn. Selenium RC là kết quả để khắc phục những nhược điểm của Selenium IDE hoặc Core phát sinh.

Các lỗ hổng và hạn chế trong khi sử dụng Selenium Core khiến người dùng gặp khó khăn trong việc tận dụng lợi ích của công cụ này. Do đó, quá trình kiểm thử trở thành một nhiệm vụ nặng nề và sâu rộng. Một trong những hạn chế quan trọng là Chính sách xuất xứ tương tự (**Same Origin Policy**), với những vấn đề rắc rối như:
Nó không cho phép truy cập DOM của tài liệu từ một nguồn khác với nguồn mà chúng ta đang truy cập vào tài liệu.
Origin (nguồn) là sự kết hợp tuần tự của : lược đồ, máy chủ và cổng của URL. Ví dụ: đối với URL http://www.seleniumhq.org/projects/, nguồn là sự kết hợp của HTTP, seleniumhq.org, port 80 tương ứng.
Vì vậy, Selenium Core (Chương trình JavaScript) không thể truy cập các phần tử từ một nguồn khác với nơi nó được đưa ra.
Ví dụ : nếu tôi đã khởi chạy Chương trình JavaScript từ trực tuyến http://www.seleniumhq.org/ , thì tôi đã có thể truy cập các trang trong cùng một domain, ví dụ như http://www.seleniumhq.org/projects/ hoặc http://www.seleniumhq.org/download/ . Các tên miền khác như google.com, yahoo.com sẽ không thể truy cập được nữa.

Chính vì thế, khi sử dụng Selenium Core để kiểm tra bất kỳ ứng dụng nào, người ta phải cài đặt toàn bộ ứng dụng trên Selenium Core và một máy chủ web để khắc phục vấn đề của chính sách này.

![](https://images.viblo.asia/9ef94c01-7188-4797-a3ab-a09b32029334.jpg)

Để điều chỉnh chính sách này mà không cần tạo một bản sao Ứng dụng riêng biệt đang được kiểm thử trên Selenium Core, Selenium RC (Remote Control) đã được giới thiệu. Trong khi Jason Huggins đang giới thiệu Selenium, một đồng nghiệp khác tại ThoughtWorks tên Paul Hammant đã đề xuất cách giải quyết chính sách xuất xứ tương tự và một công cụ có thể kết nối với ngôn ngữ lập trình mà chúng ta lựa chọn. Do đó, Selenium RC ra đời.
Không giống như Selenium IDE, Selenium RC hỗ trợ nhiều trình duyệt và nền tảng.

![](https://images.viblo.asia/5583275e-9b73-48c8-aef7-ff808e27fc76.jpg)

**Mô tả quy trình làm việc**
* Người dùng tạo một kịch bản kiểm thử bằng ngôn ngữ lập trình mong muốn.
* Đối với mỗi ngôn ngữ lập trình, có một thư viện client được chỉ định.
* Thư viện client này sẽ trục xuất các lệnh kiểm tra đến máy chủ Selenium.
* Máy chủ Selenium giải mã và chuyển đổi các lệnh kiểm tra thành các lệnh JavaScript và gửi chúng đến trình duyệt.
* Trình duyệt thực thi các lệnh bằng Selenium Core và gửi kết quả trở lại máy chủ Selenium
* Máy chủ Selenium cung cấp kết quả kiểm tra đến thư viện client.

**Có một vài điều kiện tiên quyết được đưa ra trước khi tạo tập lệnh Selenium RC:**
* Ngôn ngữ lập trình - Java, C #, Python, v.v.
* IDE (môi trường phát triển tích hợp) - Eclipse, Netbeans, v.v.
* Testing Framework (tùy chọn) - JUnit, TestNG, v.v.
* Và thiết lập Selenium RC

**Ưu điểm và nhược điểm của Selenium RC:**

![](https://images.viblo.asia/51826ec1-19e0-4fa0-b9ff-a44c766c12c7.jpg)

### Selenium Grid

Khi các xu hướng mới nổi lên yêu cầu thực hiện đồng thời các kịch bản thử nghiệm khác nhau trên nhiều nền tảng và nhiều trình duyệt mục đích để thực thi kiểm thử  phân tán, thử nghiệm trong các môi trường khác nhau và tiết kiệm thời gian thực hiện. Để phục vụ những yêu cầu này Selenium Grid đã được đưa vào bởi Pat Lightbody nhằm giải quyết nhu cầu thực hiện các bộ thử nghiệm trên nhiều nền tảng cùng một lúc.
Về lý thuyết ta có thể hiểu đây là xây dựng một Selenium hub dùng để khởi chay nhiều các test thông qua các máy và các trình duyệt khác nhau tại cùng một thời điểm.

![](https://images.viblo.asia/b5ffe00b-d552-4783-b266-e07bec7d4e7d.png)

### Selenium WebDriver

![](https://images.viblo.asia/61618980-b8e8-4c4c-96d1-68f85fb2e953.png)

Selenium WebDriver được tạo ra bởi một kỹ sư khác tại ThoughtWorks có tên Simon Stewart vào năm 2006. WebDriver cũng là một công cụ kiểm tra dựa trên web có sự khác biệt tinh tế với Selenium RC. Vì công cụ này được xây dựng trên nền tảng cơ bản nơi một máy khách bị cô lập được tạo cho mỗi trình duyệt web; không cần JavaScript quá nhiều. 
Selenium WebDriver sạch sẽ và hoàn toàn là một khung hướng đối tượng. Nó sử dụng khả năng tương thích riêng của trình duyệt để tự động hóa mà không cần sử dụng bất kỳ thực thể ngoại vi nào. Với nhu cầu ngày càng tăng, nó đã trở nên phổ biến và có 1 cơ số người dùng lớn.
Selenium Webdriver được đánh giá là tốt hơn Selenium IDE và Selenium RC trên rất nhiều các khía cạnh. Selenium Webdriver thực hiện automate tương tác với trình duyệt với hướng tiếp cận hiện đại và ổn định hơn. Các tương tác với trình duyệt được gửi trực tiếp từ Selenium driver mà không thông qua Javascript như selenium RC.

**Ưu điểm và nhược điểm của Selenium WebDriver**

![](https://images.viblo.asia/4a92d9de-92c0-4528-8a0e-d75cde16a113.jpg)

***Ưu điểm:***
* Communicate trực tiếp với trình duyệt
* Tương tác với trình duyệt giống như thao tác của một người dùng thật
* Tốc độ nhanh hơn so với Selenium IDE
* Thao tác dễ dàng hơn với các phép tính toán logic hay các điều kiện phức tạp

***Nhược điểm:***
* Cài đặt phức tạp hơn so với Selenium IDE
* Đòi hỏi người dùng phải có kĩ năng lập trình

## Environment And Technology Stack

Với sự ra đời và bổ sung của từng công cụ mới trong bộ Selenium, môi trường và công nghệ trở nên tương thích hơn. Dưới đây là danh sách đầy đủ các môi trường và công nghệ được Selenium Tools hỗ trợ.

### Các trình duyệt được hỗ trợ

![](https://images.viblo.asia/f80ac149-afa1-4822-a8dd-6cdc80e26980.jpg)

### Các ngôn ngữ được hỗ trợ

![](https://images.viblo.asia/e9e7b53a-9fe2-4e45-a368-1b35f4f37663.jpg)

### Các hệ điều hành được hỗ trợ

![](https://images.viblo.asia/8d6c0f2a-6652-4e71-b704-a1a69f0ddbfd.jpg)

### Các Framework Test được hỗ trợ

![](https://images.viblo.asia/cdd67da3-cb41-4b7e-928c-5171a5545ca9.jpg)

## Kết luận

Trên đây là những giới thiệu tổng quát về bộ các công cụ của Selenium, hẹn các bạn ở bài viết tiếp theo về Cách cài đặt Selenium nhé. Bài viết còn nhiều thiếu xót, mọi bình luận góp ý xin comment phái dưới cho mình biết nha. Thanks for watching :D