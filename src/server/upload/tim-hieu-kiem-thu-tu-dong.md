## 1. Kiểm thử phần mềm là gì? 
Kiểm thử phần mềm là một cuộc kiểm tra nhằm cung cấp cho các bên liên quan(khách hàng hay nhóm phát triển phần mềm …) thông tin về chất lượng của sản phẩm hoặc dịch vụ đang được kiểm thử.
Mục đích của kiểm thử:
- Đánh giá chất lượng hoặc tính chấp nhận được sản phẩm
- Phát hiện lỗi hoặc bất kỳ vấn đề bất thường của sản phẩm
Kiểm thử phần mềm là một lĩnh vực rất rộng, nhưng có thể được phân loại thành hai loại thử nghiệm là kiểm thử thủ công (manual testing) và kiểm thử tự động (automation testing).

## 2. Phân biệt manual testing và automation testing
### 2.1. Manual testing
Manual testing là một hình thức kiểm tra khá phổ biến của các tester từ trước đến nay. Ví dụ để test một form login thì Tester sẽ manual sẽ tự tay nhập username, password sau đó click vào button “login” để kiểm tra kết quả đăng nhập đó có thành công hay không. Đúng như ý nghĩa của việc kiểm thử thủ công thì Tester sẽ thực hiện tất cả các thao tác bằng tay và thực hiện một cách thủ công.
Mọi công việc Tester phải thực hiện đó là: viết testcase, thực hiện việc test, báo các kết quả… Quá nhiều công việc phải làm và đôi khi là những kịch bản test phải làm đi làm lại nhiều lần dẫn đến rất mất thời gian và có thể làm Tester chán dần với công việc này.
### 2.2. Automation testing
Sau khi có kịch bản test thì Tester sẽ viết script để chạy tự động tất cả các bước bao gồm nhập thông tin, click đăng nhập và kiểm tra kết quả, so sánh kết quả chạy thực tế với kết quả mong muốn.
Trong trường hợp bạn vào một dự án mà được yêu cầu nhập 10.000 bản ghi và kiểm tra dữ liệu đầu vào và đầu ra đúng chưa? Việc này nếu bạn thực hiện bằng tay thì mỗi ngày bạn chỉ nhập được 100 bản ghi dữ liệu, tính ra con số thì bạn đã mất tầm 100 ngày để nhập xong đống dữ liệu đó. Khi bạn báo cáo điều này với khách hàng thì không biết cảm nhận của khách hàng sẽ ra sao? và những tester thực hiện công việc này họ sẽ nghĩ thật là nhàm chán 🙁 . Trong trường hợp này theo tôi bạn nên nghĩ đến việc thực hiện automation testing. Bạn chỉ cần viết script theo kịch bản test để chạy tất cả các bước bao gồm: nhập thông tin, click vào các button và kiểm tra kết quả trả ra thực tế và kết quả mong muốn. Khi bạn viết xong script đó thì bạn có thể để script chạy tự động, trong thời gian đó bạn có thể làm song song các việc khác và quay lại xem kết quả. Chỉ mất thời gian ban đầu nhưng bạn sẽ tiết kiệm công sức, thời gian và sử dụng lâu dài cho các lần test tiếp theo rất nhiều.
## 3.  Những ưu điểm và nhược điểm của automation testing
### 3.1. Ưu điểm
- Automation testing thực hiện những công việc mà manual testing không làm được: Khi bạn nhận được yêu cầu thực hiện test trường hợp cho 10.000 users truy cập vào hệ thống cùng một lúc. Bạn không thể huy động 10.000 máy tính có sẵn trình duyệt hoặc những cài đặt liên quan để có thể truy cập hệ thống cùng một lúc được 🙂 Lúc đó bạn nên nghĩ sẽ tận dụng tool automation để giúp chúng ta thực hiện công việc này.
- Test mang tính toàn diện cao: Mình có thể tạo ra các kịch bản test để bao quát tất cả các feature trong ứng dụng.
- Đáng tin cậy: Những script đã chạy chính xác theo kịch bản đã định sẵn, vì vậy tránh được nhiều lỗi do con người tạo ra, ví dụ như nhập sai dữ liệu hay một bước nào đó dẫn đến kết quả test sai.
- Tái sử dụng: Có thể tận dụng để test trên các phiên bản khác nhau của ứng dụng, ngay cả khi có những sự thay đổi về giao diện.
- Tiết kiệm thời gian: Chỉ cần dành thời gian ban đầu để thiết kế scripts và về sau có thể tiết kiệm thời gian khi gặp tình huống lặp đi lặp lại nhiều lần(cùng một lúc) trên cùng script test. Automation tool giúp chạy test nhanh hơn test manual
- Bao phủ được nhiều trường hợp hơn: Nhờ những tiện ích của tool automation mang lại mình có thể thực hiện nhiều trường hợp test tinh vi hơn để thu về những thông tin ẩn từ ứng dụng. Ở trường hợp này thì manual test không thực hiện được.
- Có tính kinh tế cao: vì có thể giúp giảm thiểu nguồn nhân lực làm kiểm tra hồi quy. Giúp tester bớt nhàm chán khi phải thực hiện nhiều lần trên cùng một công việc.
- Chất lượng và hiệu suất phần mềm tốt hơn: mình có thể chạy nhiều test trong thời gian ngắn hơn với ít resource nhất.
### 3.2. Nhược điểm
- Nhiều tool automation có chi phí rất cao ví dụ như HP Quick Test Pro…
- Mức lương chi trả ban đầu cho automation testing cao hơn rất nhiều so với manual testing vì công việc của họ đòi hỏi nhiều kỹ năng cao hơn, ví dụ tester phải hiểu về các ngôn ngữ lập trình, biết code, biết viết script…
- Đòi hỏi Tester phải có kinh nghiệm về technical và kỹ năng lập trình.
- Chi phí để phát triển và bảo trì test script cao: Một số testcase khi thực hiện manual test thì không mất time lắm nhưng khi chuyển qua script thì mất rất nhiều cho thời gian ban đầu.
- Cần thời gian chuẩn bị cài đặt môi trường trước khi test: Để sử dụng được tool và custom thì cần phải setup môi trường test trước. Ví dụ như để chạy selenium với ngôn ngữ java thì bạn cần phải cài đặt eclip, selenium …. Điều đó dẫn đến việc mất thời gian chuẩn bị ban đầu cho việc test.
- Nhiều dự án không nên sử dụng automation test: ví dụ như khi test một chức năng quá phức tạp của một ứng dụng hoặc một GUI object thì nên chạy manual testing.
## 4. Khi nào nên áp dụng automation testing vào dự án?
- Những trường hợp không thể thực hiện manual testing.
- Những chức năng cần thực hiện nhiều lần, thường xuyên phải thực hiện kiểm tra hồi quy, cần thực hiện một số lượng data lớn trong thời gian ngắn.
- Thường được áp dụng với những project ổn định, những màn hình, chức năng không thay đổi trong tương lai.
- Kiểm tra sự kết hợp của nhiều giá trị đầu vào ở một bước nào đó
- Thực hiện kiểm tra nhiều màn hình trong thời gian ngắn, liên tục
- Thực thi test performance testing hoặc load testing thì việc tận dụng automation testing dường như là duy nhất.
- Tùy từng dự án mà chúng ta mới cần áp dụng automation testing,vì để đảm bảo chi phí chi trả cho việc thực hiện, bảo trì automation test trong suốt quá trình mới đem lại hiệu quả cho dự án.
## 5.  Một số test automation tool
### 5.1. Web functional/ Regression Test tools (các công cụ kiểm tra chức năng/hồi quy web)
- Selenium IDE: Là một thành phần của Selenium và hoạt động như một trình duyệt firefox add-on. Selenium IDE giúp ghi lại quá trình tạo một mẫu test case và có khả năng phát lại quá trình tạo ra test case đó. Selenium IDE rất tiện lợi và giúp lưu lại test case dưới nhiều định dạng file khác nhau như html, Java, PHP… 
- Selenium Webdriver: Hỗ trợ mức cao hơn selenium IDE, cho phép chúng ta sử dụng một trong những ngôn ngữ lập trình như HTML, Java, Ruby, .NET…để tạo kịch bản test (test case) kết hợp với việc sử dụng điều kiện, vòng lặp… khiến cho test script trở nên chính xác hơn.
- Robot Framework:  Là một framework cung cấp mọi thứ cần thiết cho tester xây dựng kịch bản kiểm thử đầu vào, điều kiện kết thúc hay báo cáo kết quả… Robot framework giúp tester viết kịch bản kiểm thử dựa trên từ khóa (keyword). 
- Automate: Giúp tự động hóa từ việc tự động hóa mạng.
- SimpleTest: Là mã nguồn mở giúp cho unit testing trở nên dễ dàng hơn.
### 5.2. Load and performance test tools(công cụ kiểm tra hiệu năng)
- Jmeter: Là một phần mềm mã nguồn mở bằng java nhằm mục đích giúp kiểm thử chức năng và hiệu suất. Có thể sử dụng để test performance trên cả nguồn tĩnh và nguồn động, có thể kiểm thử nhiều kiểu server: Web – HTTP, HTTPS, SOAP, Database – JDAP, JMS, Mail – POP3…
- Loadrunner: là một công cụ kiểm thử tự động thực hiện việc kiểm tra hiệu năng của phần mềm. Nó cho phép chúng ta tìm ra những lỗi về khả năng thực thi bằng việc phát hiện ra nguyên nhân, chỗ làm cho phần mềm chạy chậm hoặc không đúng yêu cầu. Đây là công cụ mạnh với giải pháp kiểm tra tải, phát hiện và đưa ra giải pháp cải tiến. 
- Web Performance Load Tester: Là tool cung cấp test performance như độ chịu tải của website, xử lý được bao nhiêu user, bị phá vỡ ở điều kiện nào… 
- SilkPerformer: là công cụ kiểm tra tải cấp doanh nghiệp từ Microfocus.
## 5.3. Java test tool
- Junit: Là một framwork đơn giản dùng cho việc tạo các unit test tự động, và chạy các test có thể lập đi lập lại. Junit là một chuẩn trên thực tế cho các unit testing trong java 
- TestNG: là framwork testing dựa trên cảm hứng từ Junit và Nunit. Là công cụ cho phép tạo testcase kiểm thử cho các mức độ kiểm thử: kiểm thử chức năng và kiểm thử tích hợp. Và cũng là một trong những công cụ kiểm thử tự động được sử dụng phổ biến hiện nay.
- JTest: là một phần mềm kiểm thử tự động bằng java. Jtest bao gồm các chức năng cho việc tạo và phát triển trường hợp kiểm thử đơn vị, phân tích tĩnh luồng dữ liệu và phân tích số liệu, kiểm tra hồi quy, phát hiện lỗi trong thời gian chạy…
- W3c: Là web link validator kiểm tra tính toàn vẹn của website, hợp lệ các cú pháp và tự động báo cáo công việc 
- Link checker pro: Thực hiện phân tích website, phát hiện link lỗi và kiểm tra tất cả các vấn đề có thể xảy ra với link. 
- HTML validator: Là tool giúp hỗ trợ kiểm tra độ chuẩn của code, một trong số những tool là validator của W3C 
## 5.4. Web site sercurity tools
- Gamasec: Là công cụ có khả năng quét ứng dụng website và lấy dữ liệu của toàn bộ website rồi phân tích toàn bộ những tệp tin, hiển thị cả cấu trúc của tệp tin đó
- McAfee SiteAdvisor Software: Là công cụ kiểm tra mã độc, các java độc hại, phần mềm gián điệp có nguy cơ làm tổn hại đến máy tính của bạn.