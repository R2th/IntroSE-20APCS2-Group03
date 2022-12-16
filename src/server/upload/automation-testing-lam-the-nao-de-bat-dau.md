Hiện nay, kiểm thử phần mềm được tự động để tăng phạm vi kiểm thử, cải thiện hiệu quả trong việc tìm lỗi và nâng cao sự hiệu quả của quy trình phát triển. Trong các dự án lớn, phức tạp và quan trọng yếu tố thời gian, code cần được kiểm thử một cách thường xuyên và lặp lại trong cùng một vùng chức năng của ứng dụng, kiểm thử tự động tăng hiệu quả và giảm chu kỳ test. Nếu bạn là một chuyên gia về phần mềm hoặc là một quản lý của một đơn vị kiểm thử phần mềm, việc kiểm thử tự động chắc chắn sẽ mang lại cho bạn lợi thế cạnh tranh trên thị trường. Chúng ta sẽ cùng thảo luận về các khía cạnh để đạt được kiểm thử tự động hiệu quả.

Quá trình sử dụng phần mềm tự động để điều khiển việc thực hiện kiểm thử phần mềm từ đó so sánh kết quả thực tế và kết quả mong muốn được gọi là Automation Testing. Nó được sử dụng để giảm thiểu thời gian test cho những hành động phức tạp như test hồi qua và các quy trình tốn nhiều công sức hoặc mở rộng những quá trình test trong quy trình phát triển phần mềm. 
<br/>Kiểm thử tự động thường được sử dụng yêu cầu phải kiểm thử thường xuyên cùng 1 phần code khi mà các yêu cầu bị thay đổi thường xuyên, khi các ứng dụng phải được kiểm tra hiệu năng với một số lượng người dùng và khi thời gian kiểm thử ngắn.

![](https://images.viblo.asia/da4703ec-cbe3-4576-b80f-20d1b5aaef4a.png)


## Làm thế nào để Kiểm thử tự động?
Bạn có thể tự động hoá quy trình kiểm thử của bạn bằng cách sử dụng ngôn ngữ hỗ trợ như VB Scripting và ứng dụng phần mềm tự động. Có rất nhiều tool có sẵn trên thị trường mà chúng ta có thể sử dụng để viết các kịch bản kiểm thử tự động. Nếu bạn đang băn khoăn làm thế nào để có thể tự động các hoạt động test, đây là quy trình với từng bước sẽ giúp bạn vạch ra được kế hoạch:

**1. Xác định những chức năng trong phần mềm cần automation test** - Tự động hoá toàn bộ quy trình kiểm thử là điều rất khó và không hiệu quả về mặt chi phí do tính chất đắt đỏ của các công cụ kiểm thử. Nên điều quan trọng nhất là xác định những vùng chức năng cần kiểm thử tự động.
<br/>**2. Chọn một công cụ phù hợp cho test tự động** - Có khá nhiều công cụ test tự động có sẵn; Tuy nhiên, việc chọn đúng tool rất quan trọng đối với việc kiểm thử tự động. Cho dù đó là quy trình kiểm thử  dựa trên code-driven hoặc dựa trên GUI, bạn phải chọn tool thích hợp cho việc kiểm thử.
<br/>**3. Thực hiện tạo test scripts** - Bạn cần phát triển testcases và scripts để bao quát phần lớn của phần mềm đảm bảo rằng những chức năng hoạt động đúng.
<br/>**4. Phát triển test suites** - Test suites được phát triển để đảm bảo rằng các case kiểm thử tự động chạy mà không có sự can thiệp thủ công nào. Điều này được thực hiện bằng cách tạo một test suite có nhiều test cases, một thư viện và dòng lệch để chạy test suite.
<br/>**5. Thực thi đoạn scripts** - Test scripts có thể được thực hiện thủ công, với nhà phát triển cũng có thể thực hiện một cách tự động. Điều này đảm bảo rằng các vấn đề được phát hiện hiệu quả trong trường hợp code có sự thay đổi.
<br/>**6. Tạo báo cáo kết quả** - Bạn cần tạo nhiều định dạng báo cáo để ghi lại test logs chi tiết về các hành động được thực hiện trong quá trình kiểm thử.
<br/>**7. Xác định các vấn đề tiềm ẩn và các vấn đề liên quan đến hiệu suất** - Bạn cần phải xác định sớm được các vấn đề phát sinh trong quá trình kiểm thử và nguyên nhân của chúng, sửa đúng các vấn đề gặp phải để đạt được hiệu quả test tốt hơn.

## Các phương pháp kiểm thử tự động
Hiện nay có rất nhiều tools kiểm thử tự động nhưng trước khi thảo luận về điều đó, chúng ta cần hiểu sự khác biệt giữa các phương pháp kiểm thử tự động, sẽ được đề cập ở dưới:
<br/>**Code-driven testing** - Phương pháp này sử dụng những framework kiểm thử như xUnit framework,v.v. Tập trung thực hiện những trường hợp kiểm thử để kiểm tra những phần code có được thực thi theo đúng yêu cầu trong các điều kiện khác nhau không. Đây là một phương pháp phổ biến được sử dụng trong mô hình phát triển phần mềm agile khi mà các unit testcases được viết để xác định các yêu cầu phần mềm được xây dựng và kiêm tra khả năng hoạt động trước khi mà code thực sự được viết.
<br/>**Graphical user interface (GUI) testing** - Giao diện GUI của các ứng dụng có thể được test bằng phương pháp này vì nó cho phép các tester có thể ghi lại các hành động của người dùng và phân tích chúng. Ví dụ: Nếu bạn muốn kiểm tra một trang web, bạn có thể sử dụng công cụ kiểm thử tự động như Selenium, tool cung cấp chức năng record và playback để lưu lại những kịch bản test mà không cần có hiểu biết về ngôn ngữ về script test. Test case có thể được viết bằng một số ngôn ngữ như C#, Java, Perl, Python etc.
<br/>**Framework approach** -  Phương pháp này không để tự động bất cứ gì cả nhưng là một hệ thống tích hợp các quy tắc để kiểm tra một sản phẩm cụ thể. Framework mang đến thư viện tập hợp các chức năng, nguồn dữ liệu test, chi tiết các đối tượng và các module tái sử dụng khác. Nó đưa ra các quy tắc chung của tự động hóa và đơn giản hóa các nỗ lực cần thiết trong khi chi phí bảo trì thấp. Ví dụ: nếu có bất kỳ thay đổi nào trong test case, chỉ cần cập nhật file test case cần thay đổi mà không ảnh hưởng gì đến driver hoặc script khởi tạo ban đầu. Framework có thể là linear, structured, data driven, keyword driven hoặc kết hợp bất cứ thứ nào trong số chúng.

Qua đó, trong khi manual testing có hiệu quả trong các dự án có nhiều môi trường hoạt động và cấu hình phần cứng, thì automation testing là vô cùng cần thiết cho sự thành công các dự án quy mô lớn cần thực hiện các trường hợp kiểm thử lặp đi lặp lại và phức tạp. Automation testing không chỉ cần thiết mà còn quan trọng đối với sự phát triển của một dự án phần mềm.

## Những lợi ích của kiểm thử tự động
* Tiết kiệm thời gian, chi phí
* Nâng cao tính chính xác của việc kiểm thử
* Tăng phạm vi bảo phủ
* Giảm độ phức tạp của việc kiểm thử
* Tăng hiệu quả và tinh thần đồng đội

Tóm lại, trong khi manual testing có hiệu quả trong các dự án có nhiều môi trường hoạt động và cấu hình phần cứng, thì automation testing là vô cùng cần thiết để đảm bảo thành công các dự án quy mô lớn cần thực hiện các trường hợp thử nghiệm lặp đi lặp lại và phức tạp. Automation testing không chỉ cần thiết mà còn quan trọng đối với sự phát triển và thành công của một dự án phần mềm.

Nguồn tham khảo: https://www.udemy.com/blog/automation-testing-tutorial/