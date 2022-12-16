Chúng ta gần như quá tải về các thuật ngữ kỹ thuật khi làm việc trong môi trường CNTT. Các quy trình, tài liệu, nhiệm vụ và mọi thứ khác đều được giải quyết bằng tên kỹ thuật riêng của nó. Vậy làm thế nào chúng ta có thể nhớ, hiểu và sử dụng chúng trong mỗi trường hợp?

Trong bài viết hôm nay, chúng ta sẽ trả lời (với các ví dụ) một số câu hỏi phổ biến nhất (và khó hiểu nhất) về sự khác biệt giữa test plan, test strategy, testcase, testscript, test scenario and test condition? Sự nhầm lẫn bao quanh những khái niệm này rất phổ biến và bài viết này cố gắng xác định và làm sáng tỏ hơn các thuật ngữ chuyên ngành cho các bạn.

![](https://images.viblo.asia/0b242e80-3609-4cec-8e23-44ed9469e7a7.jpg)


**1. Sự khác nhau giữa kế hoạch kiểm tra (Test Plan) và chiến lược kiểm tra là gì (Test strategy) ?**

Kế hoạch thử nghiệm (Test plan) là một tài liệu liệt kê tất cả các hoạt động trong một dự án QA, lên lịch cho họ, xác định phạm vi của dự án, vai trò & trách nhiệm, rủi ro, tiêu chí đầu vào đầu ra, mục tiêu kiểm tra và bất kỳ điều gì khác mà bạn có thể nghĩ đến. Kế hoạch thử nghiệm có thể gọi là 'siêu tài liệu' liệt kê mọi thứ cần biết. 

Chiến lược kiểm tra (Test strategy) vạch ra phương pháp thử nghiệm và mọi thứ khác xung quanh nó. Nó khác với kế hoạch thử nghiệm, chiến lược thử nghiệm chỉ là một tập con của kế hoạch thử nghiệm. Nó chỉ là một tài liệu ở mức chung chung hơn và không cần update mới thường xuyên.

Ví dụ Test plan sẽ cung cấp thông tin về ai sẽ test vào thời điểm nào. Ví dụ, Module 1 sẽ được kiểm tra bởi “ tester X”. Nếu Y thực hiện test thay thế X vì một lý do nào đó, test plan phải được cập nhật chính xác.

Ngược lại, một chiến lược thử nghiệm test strategy sẽ có các chi tiết như - “Các mô-đun riêng lẻ sẽ được kiểm tra bởi các thành viên trong nhóm testers. “Trong tài liệu này, không quan trọng ai đang test - vì vậy nó chung chung và sự thay đổi trong thành viên nhóm không cần phải được cập nhật.

**2. Sự khác nhau giữa Test case và Test script là gì?**

Theo tác giả bài viết, hai thuật ngữ này có thể được sử dụng thay thế cho nhau. Chúng gần như không có sự khác biệt. Testcases là một chuỗi các bước giúp chúng ta thực hiện một thử nghiệm nhất định trên ứng dụng. Kịch bản thử nghiệm cũng tương tự như vậy.


Tuy nhiên có một số người nghĩ rằng testcase là một thuật ngữ được sử dụng trong môi trường kiểm thử thủ công (manual test) và kịch bản thử nghiệm testscipt được sử dụng trong môi trường tự động hóa (automation test). Điều này có một phần đúng tuy nhiên trong thực tế, kịch bản thử nghiệm và trường hợp thử nghiệm cả hai đều là các bước được thực hiện trên một ứng dụng để xác nhận chức năng của nó cho dù test thủ công hoặc thông qua tự động hóa.

Một Test Case có thể coi nôm na là một tình huống kiểm tra, được thiết kế để kiểm tra một đối tượng có thỏa mãn yêu cầu đặt ra hay không. Một Test Case thường bao gồm các phần cơ bản:

• Mô tả

• Các bước thực hiên

• Dữ liệu nhập (nếu có)

• Kết quả mong đợi

Ví dụ một test case: ![](https://images.viblo.asia/2d89390c-3d56-44f3-bf74-747e3414bea9.jpg)

Test script là gì?

Một Test Script là một nhóm mã lệnh dạng đặc tả kịch bản dùng để tự động hóa một trình tự kiểm tra, giúp cho việc kiểm tra nhanh hơn, hoặc cho những trường hợp mà kiểm tra bằng tay sẽ rất khó khăn hoặc không khả thi.

Ví dụ một test scipt: ![](https://images.viblo.asia/498f08b8-ccaa-430a-a089-bffbd6bc2949.jpg)

**3. Sự khác nhau giữa Kịch bản thử nghiệm Test scenario và Điều kiện thử nghiệm Test condition là gì?**

Test scenario là một tài liệu mà người kiểm thử tạo ra như một bước chuyển tiếp vào giai đoạn test design. Tài liệu này sẽ trả lời câu hỏi là chúng ta cần test gì với một tính năng nhất định. Thông thường, các kịch bản thử nghiệm là một đầu vào để tạo ra các testcases. Trong các dự án có thời gian ngắn và cần test rất nhanh như các dự án Agile thì test scenario là các kết quả đầu ra duy nhất của test design và không cần viết đến testcase. Một scenario có thể dẫn đến nhiều trường hợp test khác nhau.

Ví dụ các kịch bản thử nghiệm :

1. Xác thực nếu một quốc gia mới có thể được thêm bởi Admin 
2. Xác thực nếu một quốc gia hiện tại có thể bị xóa bởi Admin 
3. Xác thực nếu một quốc gia hiện có có thể được cập nhật

Các điều kiện thử nghiệm (Test condition) có thể được định nghĩa gần như là mục tiêu /điều kiện để thực hiện các testcases tương ứng.

Điều kiện kiểm tra Ví dụ :
Trong ví dụ trên, nếu chúng ta để kiểm tra kịch bản 1, chúng ta có thể kiểm tra các điều kiện sau:
1. Nhập tên quốc gia là “Ấn Độ” (hợp lệ) và kiểm tra việc bổ sung nước
2. Nhập để trống và kiểm tra xem quốc gia có được thêm hay không. 
Trong mỗi trường hợp thì dữ liệu cụ thể được mô tả thì mục tiêu của việc test trở nên chính xác hơn nhiều.

**4. Sự khác biệt giữa thủ tục kiểm tra (Test procedure) và bộ thử nghiệm (Testsuit) là gì?**

Thủ tục kiểm tra là sự kết hợp của các trường hợp thử nghiệm dựa trên một lý do hợp lý nhất định. Thứ tự trong các trường hợp thử nghiệm khi chạy được cố định trước.

Ví dụ: nếu tôi kiểm tra việc gửi một email từ Gmail.com, thứ tự các trường hợp test mà tác giả sẽ kết hợp để tạo thành một test procedure sẽ là:

1. Test để kiểm tra đăng nhập Gmail
2. Test chức năng soạn email 
3. Test chức năng đính kèm một / nhiều file đính kèm 
4.  Định dạng email theo cách được yêu cầu bằng cách sử dụng các tùy chọn khác nhau 
5. Thêm địa chỉ liên hệ hoặc địa chỉ email vào To, BCC , Các trường CC 
6. Gửi email và đảm bảo rằng nó đang hiển thị trong phần “Thư đã gửi”

Tất cả các trường hợp thử nghiệm ở trên được nhóm lại để đạt được một mục tiêu cuối cùng là một chức năng của hệ thống được kiểm tra hoàn thiện. 

Còn bộ kiểm thử (testsuit) là danh sách tất cả các trường hợp thử nghiệm phải được thực hiện ở mỗi chu kỳ kiểm tra hoặc pha hồi quy, vv.  Các cases được tiến hành test  không quan trọng theo thứ tự nào không quan trọng miễn sao chúng ta chạy hết tất cả bộ testcase trong khoảng thời gian cho phép là được.

Ví dụ về bộ thử nghiệm : Nếu phiên bản hiện tại của ứng dụng là 2.0, phiên bản trước 1.0 có thể đã có 1000 testcase để kiểm thử hoàn toàn. Đối với phiên bản 2, có 500 testcases chỉ kiểm tra chức năng mới được thêm vào trong phiên bản mới lần này. Vì vậy, bộ thử nghiệm hiện tại sẽ là 1000 + 500 trường hợp thử nghiệm bao gồm cả hồi quy và chức năng mới. Bộ testcase cũng là một sự kết hợp giữa nhiều version của một ứng dụng nhất định.

Các bộ testcases có thể chứa 100 hoặc thậm chí 1000 hoặc hơn nữa cases, số lượng này tùy thuộc vào specs của từng dự án nhất định.

Bài viết được dịch và tham khảo từ link https://www.softwaretestinghelp.com/difference-between-test-plan-test-strategy-test-case-test-script-test-scenario-and-test-condition/