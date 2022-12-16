**1. Giới thiệu chung**

Test game là phần quan trọng nhất trong quá trình phát triển game. Đây là bước cuối cùng để xác định game của bạn đã sẵn sàng ra mắt hay chưa. Những công việc như vậy mang đến cho quá trình phát triển một cái nhìn quan trọng về những lỗi, về những thứ chưa nhất quán và về sự hoàn thiện của sản phẩm. 

Không có một cách thức chuẩn và đồng bộ cho việc test game. Những người phát triển có cách thức test riêng của họ và những người xuất bản game cũng có cách thức test riêng và những phương thức test này được nâng cấp theo thời gian. Tuy nhiên có một số phương thức test game được ứng dụng phổ biến hơn những cái khác. Bên dưới sẽ phân tích vào 9 kỹ thuật test game phổ biến nhất:

* Combinatorial Testing 
* Clean Room Testing
* Compatibility Testing
* Tree Testing
* Regression Testing
* Ad hoc Testing
* Load Testing
* Play Testing

**2. Combinatorial Testing**

Combinatorial Testing (Test tổ hợp) là một phương pháp dựa trên việc thiết kế thử nghiệm được sử dụng để test các phần mềm thương mại và để tạo ra các testcase. Ứng dụng kỹ thuật test tổ hợp vào test game làm tăng hiệu quả quá trình thực thi test, cung cấp chất lượng tốt hơn và giúp giảm chi phí.

Những đặc điểm chính:

* Mọi sự kết hợp có thể có giữa các giá trị của tham số được bao quát bằng cách sử dụng phương pháp kiểm thử này.
* Chỉ ra những thuộc tính có thể bị biến đổi theo dữ liệu hoặc cấu hình.
* Tạo ra những sự kết hợp phục vụ việc test một cách có hệ thống.
* Bao gồm test từng phần, test theo cặp và test theo mục lục.
* Những biến được đưa vào quá trình test thường được lựa chọn từ những chức năng, sự kiện, thành phần, cài đặt, tùy chọn chơi game, thuộc tính, những lựa chọn tùy biến, …

**3. Clean Room Testing**

Clean Room Testing (Test phòng sạch) là một quy trình phát triển phần mềm dự định sẽ phát triển phần mềm game với một mức độ tin cậy có thể xác nhận được.

Những đặc điểm chính:
* Quá trình phát triển chỉ bắt đầu khi những yêu cầu đã được xác định rõ.
* Không có phương thức test dành cho người lập trình.
* Phương thức này kết hợp những lý luận toán học, sự sàng lọc trong thiết kế và những lý luận thống kê trong quá trình sinh test case và kiểm thử.
* Mục đích chính của phương pháp này là tối thiểu hóa những rủi ro của phần mềm.

**4. Functionality Testing**

Functionality Testing (Test theo chức năng) là phương thức để chỉ ra những bug và lỗi trong một game mà có thể ảnh hưởng đến trải nghiệm người dùng.

Những đặc điểm chính:
* Xác định xem ứng dụng có đang làm việc theo đúng spec hay không.
* Là một phương thức test phức tạp thuộc loại kỹ thuật test hộp đen.
* Mất nhiều thời gian để thực hiện vì người test cần kiểm tra nhiều vấn đề liên quan đến việc chơi game, các vấn đề đồ họa, các vấn đề liên quan đến âm thanh, …
* Kiểm tra quá trình cài đặt có diễn ra trơn tru hay không, các chức năng tối thiểu của ứng dụng có hoạt động đúng hay không, ứng dụng có cho phép các tùy chọn liên kết với mạng xã hội hay không, có hỗ trợ liên kết đến các cổng thay toán hay không và nhiều đặc điểm khác.

Các bạn có thể tham khảo thêm thông tin tại liên kết: https://www.testbytes.net/blog/game-testing-tutorial/

**5. Compatibility Testing**

Compatibility Testing (Test tương thích) là phương thức này để kiểm tra một game có hoạt động đúng hay không khi cài đặt và chạy trên những cấu hình phần cứng, đồ họa, phần mềm khác nhau. Việc kiểm tra một game có chạy tốt trên một số thiết bị xác định hay không cũng là một dịch vụ test cơ bản đối với việc test trên thiết bị di động.

Những đặc điểm chính:
* Kiểm tra nếu giao diện người dùng của ứng dụng là phù hợp với kích thước hiển thị của thiết bị và với độ phân giải cao nhất có thể.
* Đảm bảo chắc chắn những dòng văn bản là có thể đọc được với tất cả người dùng.
* Đảm bảo chắc chắn sản phẩm đạt được tất cả những yêu cầu cần thiết của người phát triển và người dùng cuối.
* Đảm bảo việc tương thích của ứng dụng trong nhiều môi trường khác nhau.
* Xác nhận về độ ổn định và khả năng làm việc của phần mềm.

**6. Tree Testing**

Tree Testing (Test cây) là phương thức tương tự như việc test [tính sử dụng được](https://www.testbytes.net/blog/5-top-elements-website-usability-testing-infographic/) của ứng dụng và được sử dụng để cấu thành lên những test case. Nó cũng giúp lựa chọn một bộ những testcase thích hợp cho những thay đổi mã nguồn tương ứng.

Những đặc điểm chính:
* Có thể được sử dụng để nâng cao hiệu quả trong việc thiết kế bố cục trang hoặc menu điều hướng.
* Cho phép thực hiện việc thăm dò với ít sự tốn kém, giúp sàng lọc các danh mục menu, nhãn, …
* Các tester không cần phác thảo hay viết các nội dung test. Những thứ duy nhất được yêu cầu là cây (mục lục) và những nhiệm vụ (hướng dẫn).
* Giúp nâng cao sự hiểu biết về những đặc điểm phức tạp trong game.

**7. Regression Testing**

Regression Testing (Test hồi quy) được sử dụng để kiểm tra lại các thành phần không thay đổi trong phần mềm. Ở đây, những testcase sẽ được kiểm tra lại để đảm bảo các chức năng không thay đổi vẫn làm việc tốt và không bị ảnh hưởng bởi những thay đổi khác, bao gồm không phát sinh các lỗi mới và các lỗ hổng bảo mật mới.

Những đặc điểm chính:
* Chạy lại những bài test đã thực hiện trước đó.
* Giúp so sánh những kết quả test trước đây với kết quả test hiện tại và chỉ ra những lỗi phát sinh nếu có.
* Có vai trò quan trọng trong việc làm chủ các lỗi.
* Tiết kiệm thời gian nhờ việc tìm ra những lỗi ngay tại giai đoạn bắt đầu của nó.
* Có thể được chạy như một bài test chức năng để kiểm tra tính sử dụng được của phần mềm cuối.

**8. Ad hoc Testing**

Ad hoc Testing (Test ngẫu nhiên) là một phương thức test nhìn chung không theo một kế hoạch nào, và được sử dụng để phá vỡ hệ thống. Những tester sẽ thực hiện những bài test bất kỳ mà không dựa trên bất kỳ testcase hay tài liệu nào.

Những đặc điểm chính:
* Không tuân theo bất kỳ cách thức định sẵn nào. Nó được thực hiện bất kỳ và trên bất kỳ phần nào của ứng dụng.
* Mục đích chính để tìm ra những khuyết tật của phần mềm dựa trên việc kiểm tra bất kỳ.
* Được thực thi dựa trên phương thức test dự đoán lỗi.
* Do những khuyết tật của phần mềm không đi kèm với các testcase cụ thể nên sẽ khá khó để tái hiện chúng.

Liên kết tham khảo: https://www.testbytes.net/blog/how-to-identify-a-good-mobile-game-tester/

**9. Load Testing**

Load Testing (Test tải) là một kiểu của test thực thi để kiểm tra thực thi của hệ thống với tải dưới thời gian thực. Test tải thể hiện đáp ứng của một ứng dụng khi nhiều người sử dụng hệ thống đồng thời.

Những đặc điểm chính:
* Xác định xem hệ thống hiện tại có đủ để đáp ứng cho game chạy mượt mà hay không.
* Kiểm tra độ ổn định của ứng dụng ở mức tải người dùng cao nhất.
* Xác định số lượng người dùng mà ứng dụng có thể hỗ trợ và mức độ mở rộng của nó để hỗ trợ nhiều người dùng.
* Hỗ trợ các chiến lược để quản lý hiệu năng.

**10. Play Testing**

Play Testing (Test chơi game) là một phương pháp kiểm thử game bằng cách chơi game đó và phân tích những đặc điểm non-function của game như: yếu tố giải trí, độ khó, sự cân bằng,... Ở đây, một nhóm người chơi sẽ được lựa chọn để thực hiện chơi các phiên bản chưa hoàn thiện của game để kiểm tra luồng hoạt động của game đó.

Những đặc điểm chính:
* Nó là một phần có ý nghĩa quan trọng trong việc thiết kế game và được sử dụng đối với các game PC hay game chiến thuật.
* Nó có tác dụng nhiều hơn trong việc đánh giá game hơn là những chức năng thực tế.
* Mục đích chính để kiểm tra game hoạt động đúng theo một hệ thống đã được định sẵn.

**10. Kết luận**

Như vậy việc test game cần cả thực tế và tầm nhìn. Ngày nay, một đội phát triển game cần nhiều thời gian để test hay bất kỳ đội phát triển phàn mềm nào khác bởi vì sự phức tạp ngày càng cao do có nhiều thành phần khác nhau và như bất kỳ ứng dụng nào khác, người dùng sẽ chỉ bị cuốn hút trong một thời gian và sau đó lại muốn có những kết quả tốt hơn và những trải nghiệm người dùng tốt hơn, điều này đòi hỏi đội ngũ phát triển cần liên tục thay đổi và cập nhật.

**11. Liên kết tham khảo**

https://www.testbytes.net/blog/types-of-game-testing/

https://toy-testing.org/testing-techniques.html

https://www.testbytes.net/blog/how-to-identify-a-good-mobile-game-tester/