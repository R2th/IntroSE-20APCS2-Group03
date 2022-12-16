Hầu hết dự án dù to hay nhỏ, phức tạp hay đơn giản đều phải có test plan, test steategy, test case, test script(với dự án auto test), test Scenario, test condition. Không phải ai cũng hiểu rõ và phân biệt những loại test này, đôi khi với cả người làm kiểm thử phần mềm đã làm nhiều dự án và hơn nữa với những bạn mới bước chân vào nghề kiểm thử. Hôm nay chúng ta sẽ đi làm rõ những khái niệm này và làm rõ sự khác nhau giữa chúng.
![](https://images.viblo.asia/4e11ec98-9cbd-4e04-85e4-f716675a5252.jpg)
### 1. Sự khác nhau giữa Test Plan và Test Steategy
- Test Plan là nột tài liệu liệt kê tất cả các chức năng, hoạt động trong một dự án QA, ở đó lên lịch cụ thể cho từng phần( lịch viết testcase, lịch test, người viết, người test, kết quả...), nó xác định vai trò của dự án, vai trò và trách nhiệm, rủi ro,  mục tiêu kiểm tra và bất kì điều gì họ có thể nghĩ ra để phù hợp với thực trạng của từng dự án.
- Test Plan nó có thể được coi như là "siêu tài liệu" vì ở đó liệt kê đủ mọi thứ cần biết. Nó hỗ trợ cho việc quản lí dự án chính xác và nhanh chóng và tránh được những việc chậm hạn hay rủi ro không mong muốn khác.
- Test Steategy( chiến lược thử nghiệm) vạch ra phương pháp thử nghiệm và mọi thứ khác xung quanh nó. Nó khác với kế hoạch thử nghiệm, theo nghĩa là chiến lược Thử nghiệm chỉ là một tập con của kế hoạch thử nghiệm. Trong quá trình phát triển một dự án có thể có nhiều chiến lược thử nghiệm được thay thế nhau cho phù hợp với hoàn cảnh của dự án để đem lại hiệu quả làm việc cao nhất. Có thể lấy ví dụ như:
Một dự án bao gồm rất nhiều chức năng nhỏ, ban đầu lên plan sẽ cho mỗi tester thực hiện kiểm thử một chức năng, nhưng trong quá trình làm việc thấy khả năng đảm bảo chất lượng cho từng chức năng chưa được cao thêm vào đó các member bị hạn chế về sự hiểu biết toàn bộ dự án vì mỗi người chỉ đang đi sâu về phần chức năng mình đang làm. Do vậy để cải thiện tình hình sẽ thay đổi chiến lược thử nghiệm trong dự án là thực hiện kiểm thử chéo đồng thời phân bố chức năng theo năng lực từng người cho phù hợp
### 2. Sự khác nhau giữa Test case và Test script
![](https://images.viblo.asia/0e9ea736-30bb-4376-b0fb-084aa2e4a0a3.png)                                   ![](https://images.viblo.asia/0e9ea736-30bb-4376-b0fb-084aa2e4a0a3.png)
- Với 2 khái niệm này có rất nhiều người nghĩ rằng trường hợp thử nghiệm là một thuật ngữ được sử dụng trong môi trường kiểm thử thủ công và kịch bản thử nghiệm được sử dụng trong môi trường tự động hóa. Điều này là một phần đúng, vì mức độ thoải mái của người kiểm thử trong các lĩnh vực tương ứng và cũng về cách các công cụ tham khảo các bài kiểm tra (một số được gọi là thử nghiệm script và một số được gọi là kiểm tra các trường hợp). Vì vậy, trong thực tế, kịch bản thử nghiệm và trường hợp thử nghiệm cả hai là các bước được thực hiện trên một ứng dụng để xác nhận chức năng của nó cho dù bằng tay hoặc thông qua tự động hóa.
- Bản thân tôi thì thấy hai thuật ngữ này có thể được sử dụng thay thế cho nhau.  Trường hợp thử nghiệm là một chuỗi các bước giúp kiểm thử viên thực hiện một thử nghiệm nhất định trên ứng dụng. Mục đích của kịch bản thử nghiệm cũng giống như thế
- Điểm khác giữa 2 khái niệm này chỉ là hình thức: Test case được viết ra và được kiểm thử bằng manual test còn test script là những kịch bản đầy đủ các bước mà kiểm thử viên viết lên để chạy trong quá trình tự động
### 3. Sự khác nhau giữa Kịch bản thử nghiệm(Test scenario) và Điều kiện thử nghiệm
- Với khái niệm về Test scenario chắc hẳn cũng không xa lạ gì với nhiều người. Đây là kịch bản kiểm tra cuối cùng toàn bộ một vòng tất các các chức năng và mối liên quan giữa các chức năng trong dự án. Kịch bản này được thực hiện vào lúc cuối cùng của dự án trước khi tiến hành bàn giao sản phẩm cho khách hàng
Có thể lấy một ví dụ đơn giản như làm về hệ thống thăm dò ý kiến của nhân viên trong công ty. Các chức năng bao gồm: Tạo công ty,Tạo câu hỏi(admin), gửi mail, Tổng hợp câu trả lời của nhân viên thì phải tạo một kịch bản thử nghiệm từ bước tạo công ty cho đến tổng hợp câu trả lời của nhân viên xem toàn bộ hệ thống có hoạt động đúng và trơn tru hay không
- Điều kiện thử nghiệm được hiểu là những điều kiện cần chuẩn bị để có thể thực hiện được những kịch bản kiểm thử. Trên thực tế không phải kịch bản thử nghiệm nào cũng cần phải có điều kiện thử nghiệm
Ví dụ: 
+ Cũng với hệ thống trên trong trường hợp muốn kiểm thử việc gửi mail thăm dò ý kiến nhân viên đến toàn bộ nhân viên trong công ty, điều kiện cần thiết của nó là phải đăng kí sắn mail của toàn bộ nhân viên công ty trong hệ thống
+ Một ví dụ đơn giản khác như: bạn muốn kiểm tra trường hợp upload ảnh lên hệ thống thì điều kiện thử nghiệm của bạn phải chuẩn bị là có sẵn các ảnh hợp lệ, ảnh lỗi, ảnh quá dung lượng... tùy vào từng  mục đích của kịch bản kiểm thử là gì
### 4. Sự khác biệt giữa thủ tục kiểm tra và bộ thử nghiệm
- Thủ tục kiểm tra được hiểu là sự kết hợp của các trường hợp thử nghiệm dựa trên một lý do hợp lý nhất định, như thực hiện một tình huống từ đầu đến cuối hoặc một cái gì đó cho hiệu ứng đó. Thứ tự trong đó các trường hợp thử nghiệm được chạy là cố định.
Ví dụ: muốn test gửi mail thì các bước cần kiểm tra là:
+ Kiểm tra việc đăng nhập vào gmail
+ Kiểm tra soạn mail
+ Kiểm tra việc đính kèm
+ Kiểm tra định dạng mail
+ Kiểm tra địa chỉ gửi kèm
+ Kiểm tra việc gửi mail và xác nhận mail trong hòm thư đã gửi
- Bộ kiểm thử là danh sách tất cả các trường hợp thử nghiệm phải được thực hiện như là một phần của chu kỳ kiểm tra hoặc pha hồi quy, vv Không có nhóm logic dựa trên chức năng. Thứ tự các trường hợp kiểm tra thành phần được thực hiện có thể hoặc không quan trọng.
### 5. Phần kết luận
Khi chưa hiểu rõ những khái niệm về Test Plan, Test Strategy, Test Case, Test Script, Test Scenario và Test Condition thì người kiểm thử rất hay bị nhầm lẫn giữa các loại với nhau, hi vọng qua bài viết này các bạn có cái nhìn rõ ràng hơn, hiểu rõ hơn về từng loại để phục vụ tốt hơn trong công việc kiểm thử phần mềm của bản thân.

Nguồn:
https://www.softwaretestinghelp.com/difference-between-test-plan-test-strategy-test-case-test-script-test-scenario-and-test-condition/