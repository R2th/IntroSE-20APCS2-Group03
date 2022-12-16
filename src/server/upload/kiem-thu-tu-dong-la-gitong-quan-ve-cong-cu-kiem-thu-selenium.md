# 1. Kiểm thử tự động là gì?
## 1.1 Khái niệm
**Kiểm thử tự động**: Là xử lý một cách tự động các bước thực hiện các testcase, kiểm thử tự động bằng một công cụ nhằm rút ngắn thời gian kiểm thử.

**Kiểm thử tự động**: là một kỹ thuật tự động trong đó người kiểm thử tự viết các tập lệnh và sử dụng phần mềm phù hợp để kiểm thử phần mềm. Nó về cơ bản là một quá trình tự động hóa của một quy trình kiểm thử thủ công. Giống như kiểm thử hồi quy, kiểm thử tự động cũng được sử dụng để kiểm thử ứng dụng theo quan điểm tải, hiệu năng và ứng suất.

Kiểm thử tự động giúp giảm chi phí kiểm thử bằng cách hỗ trợ quá trình kiểm thử thông qua các công cụ phần mềm.

Kiểm thử tự động hay sử dụng phần mềm để kiểm thử với các ưu điểm:

+ Có thể thực hiện các kiểm thử một cách liên tục, lặp lại và giảm chi phí cho nhân lực kiểm thử.

+ Luôn đảm bảo hoạt động theo một kịch bản duy nhất – không bị ảnh hưởng như với kiểm thử viên.

## 1.2 Quy trình kiểm thử tự động

**Quy trình kiểm thử tự động bao gồm**: tester sử dụng các kịch bản tự động (automation scripts) và thực thi các script để chạy ứng dụng với sự giúp sức của các automation tool. Một khi script đã sẵn sàng thì việc thực thi kiểm thử có thể diễn ra nhanh chóng và hiệu quả.

Các hoạt động của kiểm thử tự đông:

+ Phân tích yêu cầu/Xác định môi trường/công cụ

+ Xác định tiêu chí đầu ra

+ Lên kế hoạch và kiểm soát

+ Thiết lập môi trường kiểm thử

+ Triển khai thiết kế kiểm thử

+ Thực thi kiểm thử

+ Phân tích, báo cáo

## 1.3 Mục đích của kiểm thử tự động 

**Kiểm thử tự động với các mục đích**:

+ Giảm bớt công sức và thời gian thực hiện quá trình kiểm thử

+ Tăng độ tin cậy.

+ Giảm sự nhàm chán cho con người

+ Rèn luyện kỹ năng lập trình cho kiểm thử viên

+ Giảm chi phí cho tổng quá trình kiểm thử

## 1.4 Kiểm thử tự động khi nào?

**Khi nào cần kiểm thử tự động:**	

+	Không đủ tài nguyên: Khi số lượng TestCase quá nhiều mà kiểm thử viên không thể hoàn tất trong thời gian cụ thể.
+	Kiểm tra hồi quy: Nâng cấp phần mềm, kiểm tra lại các tính năng đã chạy tốt và những tính năng đã sửa. Tuy nhiên, việc này khó đảm bảo về mặt thời gian.
+	Kiểm tra khả năng vận hành phần mềm trong môi trường đặc biệt (Đo tốc độ trung bình xử lý một yêu cầu của Web server, xác định cấu hình máy thấp nhất mà phần mềm vẫn có thể hoạt động tốt).

# 2. Một số công cụ kiểm thử tự động 

Một số công cụ giúp ích trong việc kiểm thử tự động:

+ HP Quick Test Professional

+ Selenium

+ Visual Studio Test Professional

+ WATIR

+ IBM Rational Functional Tester

+ TestComplete

+ Testing Anywhere

+ WinRunner

+ LaodRunner

+ SilkTest

# 3. Tổng quan về công cụ kiểm thử Selenium

## 3.1 Giới thiệu về  Selenium
**Selenium** (thường được viết tắt là SE ) là một công cụ kiểm thử phần mềm tự động, được phát triển bởi ThoughtWorks từ năm 2004với tên ban đầu là JavaScriptTestRunner. Đến năm 2007, tác giả Jason Huggins rời ThoughtWorks và gia nhập Selenium team, một phần của Google và phát triển thành Selenium như hiện nay.

**Selenium** là một công cụ hỗ trợ kiểm tra tự động cho các ứng dụng chạy trên nền web. Selenium hỗ trợ kiểm tra hầu hết trên các trình duyệt phổ biến hiện nay như Firefox, Internet Explorer, Safari,…cũng như các hệ điều hành chủ yếu như Windows, Linux, Mac,…

**Selenium** hỗ trợ một số lớn các ngôn ngữ lập trình như C#, Java, Perl, PHP, Python, Ruby,…

**Selenium** có thể kết hợp thêm một số công cụ khác như Bromien, Junit nhưng với người dùng thông thường chỉ cần chạy tự động mà không cần cài thêm các công cụ hỗ trợ.

## 3.2 Các thành phần của Selenium

**Selenium** bao gồm một bộ các công cụ hỗ trợ kiểm tra tự động tính năng của ứng dụng web bao gồm: Selenium IDE, Selenium Remote Control (RC), Selenium Web Driver và Selenium Grid.

![](https://images.viblo.asia/7fe87c13-4dd1-4812-8a76-43d543eaea2e.PNG)
Hình 3.2 Cấu trúc Selenium

**Selenium Integrated Development Environment - Selenium IDE:** Đây là công cụ tích hợp trên trình duyệt và khá đơn giản với người dùng, hỗ trợ Record các thao tác để tạo thành các kịch bản kiểm thử và Playback trên các trình duyệt khác.

**Selenium Remote Control - Selenium RC:** Đối với các kịch bản thực tiễn, cần phải thực hiện các công việc kiểm tra phức tạp với các câu lệnh, Selenium RC hỗ trợ tối đa các công việc này.

**Selenium Grid**: Hỗ trợ thực hiện kiểm thử trên các trình duyệt song song mà không cần chỉnh sửa kịch bản.

**Selenium WebDriver:** Là bộ thư viện API nhằm giúp xây dựng ca kiểm thử trên nền tảng của ngôn ngữ lập trình

## 3.3 Một số ưu điểm và hạn chế của Selenium
**Ưu điểm :**

+ Mã nguồn mở: Đây là điểm mạnh nhất của Selenium khi so sánh với các test tool khác. Selenium không mất phí bản quyền hay thời hạn sử dụng.

+ Cộng đồng hỗ trợ khá mạnh mẽ, đặc biệt là nhà phát triển là Google. Đơn giản, dễ cài đặt, dễ làm việc
+ Selenium hỗ trợ nhiều ngôn ngữ lập trình và hỗ trợ chạy trên nhiều OS khác nhau.
Dễ dàng điều chỉnh thông qua các plugin.

+ Hỗ trợ các tệp tin selenium user-extensions.js.
+ Tự động hoàn chỉnh cho tất cả các lệnh Selenium thường gặp.

**Hạn chế :**

+ Selenium chỉ hỗ trợ những ứng dụng web
+ Các ứng dụng trên moblie không thể sử dụng Selenium
+ Selenium là một tool miễn phí, do đó không có hỗ trợ từ nhà cung cấp mặc dù có thể tìm thấy giúp đỡ từ đông đảo cộng đồng sử dụng Selenium
+ Người sử dụng cần có kiến thức về ngôn ngữ lập trình

# Kết Luận:
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về Kiểm thử tự động là gì, tổng quan về công cụ kiểm thử tự động Selenium. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về Kiểm thử tự động cũng như công cụ kiểm thử Selenium này để áp dụng hiệu quả nó vào công việc của bạn.

Tài liệu tham khảo: 

https://www.devpro.edu.vn/kiem-thu-tu-dong-la-gi

https://vntesters.com/gioi-thieu-cong-cu-kiem-thu-tu-dong-selenium/