Khi vòng đời của một sản phẩm thì không thể thiếu công đoạn test, trong công việc test thì phải nhắc đến unit test, vậy unit test là gì, tại sao lại phải sử dụng kỹ thuật unit test, và tạo ra một unit test như thế nào?

### Giới thiệu về UnitTest
Kiểm thử phần mềm là một việc làm cần thiết để kiểm tra sản phẩm trước khi bàn giao cho khách hàng. Vậy các mức độ của việc kiểm thử (test levels) như thế nào để đạt được chất lượng kiểm thử tốt? Mời các bạn xem các test level trong kiểm thử phần mềm.
![](https://images.viblo.asia/4f5c0b4d-ade6-42b0-acf5-19bf7e85763f.png)

Hình trên mô tả về các loại test level trong đó: 
Mình liệt kê ra đây các mức test, chỉ mô tả các mức test hiện có chứ chưa đi sâu vào mô tả một loại.
Sau này có thời gian mình sẽ post chi tiết nội dung từng loại test.

1. Unit Testing: test ở mức cơ bản (test từng hàm, từng màn hình,...),  kiểm tra xem mỗi đơn vị cần test có làm đúng chức năng mà đơn vị đó cần phải làm hay không
2. Integration Testing: test ở mức tích hợp (tích hợp các hàm lại với nhau, tích hợp các màn hình lại với nhau theo từng module hay dựa theo chức năng)
3. System Testing: test ở mức hệ thống (tích hợp toàn bộ các hàm, các chức năng thành một phần mềm, module hoàn chỉnh)
4. Acceptance Testing: mức test này giống như system test nhưng thường được khách hàng thực hiện test, mục đích là xem phần mềm có đáp ứng đúng yêu cầu của khách hàng chưa.

Chúng ta hãy cùng đi sâu vào unit test nhé:

Unit Testing (kiểm thử đơn vị) là một mức kiểm thử phần mềm với mục đích để xác nhận từng đơn vị của phần mềm được phát triển đúng như được thiết kế. Unit testing là mức test nhỏ nhất trong bất kỳ phần mềm nào. các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method) đều có thể được xem là Unit. Nó thường có một hoặc vài đầu vào nhưng đầu ra là duy nhất.

Unit testing được thực hiện bởi lập trình viên và là white box testing. Được thực hiện càng sớm càng tốt trong giai đoạn viết code và xuyên suốt quá trình phát triển phần mềm.

**Mục tiêu**: Tập trung vào các thành phần có thể kiểm tra riêng biệt.
+ Xác minh các hành vi chức năng và phi chức năng của thành phần
+ Cải thiện chất lượng của code, Unit Test xem xét nhiều khía cạnh của chức năng xác định mọi khiếm khuyết có thể xuất hiện giúp giảm thiểu các lỗi và nâng cao chất lượng code.
+ Phát hiện sớm các lỗi, vấn đề về thiết kế, xử lý hệ thống, thậm chí các mô hình thiết kế.
+ Tạo hàng rào an toàn cho các khối mã.

Tuy nhiên bạn đừng nên hiểu rằng Unit test dùng để tìm bug. Theo định nghĩa, thì các unit test kiểm tra mỗi đơn vị (unit) code của bạn một cách riêng biệt. Nhưng khi ứng dụng của bạn chạy trong thực tế, tất cả những đơn vị phải làm việc cùng nhau, toàn bộ sẽ trở nên phức tạp và tinh tế hơn so với tổng số các phần của nó đã được kiểm thử độc lập. Việc chứng minh rằng các thành phần X và Y có thể làm việc độc lập không chứng tỏ rằng chúng tương thích với nhau hoặc được cấu hình một cách chính xác. Viết Unit Test là một quá trình thiết kế, chứ không phải là một quá trình kiểm thử. Viết Unit Test buộc bạn phải suy nghĩ về thiết kế, xác định rõ được input, output kì vọng của mỗi đơn vị riêng biệt, từ đó đưa ra các thành phần, class.. module cần có của mỗi đơn vị

**Các thành phần test**: Một Unit là một thành phần nhỏ nhất mà ta có thể kiểm tra được như các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method), Database modules....

**Develop nên viết unit test khi nào?**
![](https://images.viblo.asia/e9ff2594-59e7-40e1-ae2c-98b137188b19.png)

Thông thường khi được nhận một task bạn có thường làm theo các bước: 
Đọc hiểu requirement-> code->có bug->fix bug

Tuy nhiên có một gợ ý cho bạn, hãy ưu tiên viết UnitTest tước khi implement code. Điều này giúp định hướng căn bản cho việc detail design của chương trình,  giúp bạn xác định rõ được các requirement, những gì cần có trong đoạn codel, cũng như chỉ định rõ những code của bạn cần phải đạt được.
Unit test cần được viết base trên các ý có trong spec requirement, từ các phân tích spec, chúng ta define ra các thành phần phần mềm, các class, interface v.v.. cần thiết và các logic tương tác giữa các unit này được chuyển từ mô tả trong spec sang test case method trong unit test. Quá trình đó có thể bao gồm các bước

1. Viết một “kịch bản test” (test case), và đảm bảo nó sẽ fail (vì chưa code gì cả, fail là chắc)
2. Code để pass qua test case đó
3. Bổ sung thêm test case mới
4. Tiếp tục code để pass qua test case mới
5. Lặp lại  quá trình bổ sung test case và code cho đến khi pass hết các test case
6. Refactor code – điều chỉnh lại code cho gọn gàng, dễ hiểu

### Các kỹ thuật viết UnitTest
![](https://images.viblo.asia/ab8e6ce9-3d08-4c4c-a28b-d00fc36b8447.png)

Như mình đã chia sẻ bên trên Unit Test là một dạng của kỹ thuật White Box Testting. Trong ngành kiểm thử phần mềm có 2 chiến lược kiểm thử tiêu biểu là black box testing và whitebox testing. Black box testing là thực hiện quá trình kiểm thử khi không biết source code của chương trình. Còn whitebox testing được sử dụng khi đã có source code của chương trình và có thể thực hiện kiểm thử tính logic của chương trình thông qua việc truy cập vào cấu trúc dữ liệu và giải thuật bên trong chương trình
 Kỹ thuật kiểm thử phần mềm White box testting được chia làm 2 loại: Control flow và Data flow
+ Control flow: Dựa vào luồng code để đưa ra test case
+ Data flow: Dựa vào luồng dữ liệu để đưa ra test case

 Khi bạn viết Unit Test có từng đặt ra câu hỏi "Bao nhiêu phần của ứng dụng đã được kiểm thử?".  Ở phạm vi bài viết này mình sẽ chia sẽ phương pháp đánh giá test case theo Control flow.
 
**Code coverage** là một phương pháp đánh giá được dùng để mô tả mức độ mà source code của một chương trình đã được thực thi, khi mà một bộ Test cụ thể chạy. Nói một cách khác, Code Coverage là một cách để đảm bảo rằng Tests của bạn thực sự đang test Codes của bạn. 

**Test coverage** = số lượng test được kiểm tra ((pass, fail) /Tổng số test case

**Tested successful coverage** = Tống lượng test được kiểm tra (pass) / Tổng lượng test - N/A

Trong code coverage có thể phần chia thành các loại sau

1 Bao phủ dòng lệnh(Statement Coverage): đảm bảo rằng tất cả các dòng lệnh trong mã nguồn đã được kiểm tra ít nhất một lần
Statement coverage = (số lượng lệnh code được kiểm tra / tổng số lệnh code ) x100
Ví dụ: Có 100 lệnh, thực thi kiểm tra được 87 lệnh ⇒ statement coverage = 87%
![](https://images.viblo.asia/4ff320a1-9847-4cd5-b7df-53fbc3a50f0a.png)

Đối với ví dụ trên, để cover dc 100% statement coverage thì yêu cầu mỗi lệnh được kiểm tra ít nhất 1 lần
Nhìn vào sơ đồ trên, chỉ cần ít nhất 1 test case với a = 7 thì đảm bảo tất cả các lệnh được test ít nhất 1 lần (chạy qua tất cả các hình chữ nhật, hình thoi)
=> 1 test case với a = 7 thì đạt được statement coverage = 100%.

2 Bao phủ nhánh (Decision Coverage): Mỗi lệnh if, case, do-while...được coi là 1 decision. 1 decision thì có 2 đầu ra là TRUE hoặc FALSE được gọi là decision outcome
Để đảm bảo 100% coverage thì mỗi đầu ra TRUE FALSE phải được test ít nhất 1 lần. Và được tính theo công thức
 Decision coverage = (Tổng số decision outcome được test / Tổng số decision outcome) * 100
 
 Chú ý: Khi bạn đã đảm bảo đã test qua được tất cả các decision out come đồng nghĩa với việc bạn cũng đảm bảo test qua được tất cả các dòng lệnh.
         100% decision coverage => 100% statement coverage

 ![](https://images.viblo.asia/88a2bdf5-660f-4db0-8c2c-beba13469423.png)
 
Để mỗi decision outcome được test ít nhất 1 lần với sơ đồ trên thì cần ít nhất 2 Test case
Test case 1 là: C = -1, sẽ thỏa mãn điều kiện đi qua decision outcome TRUE
Test case 2 là C = 0, sẽ thỏa mãn điều kiện đi qua decision outcome FALSE
Như vậy chỉ cần ít nhất 2 Test case để đạt 100% decision coverage với bài toán trên

3.Bao phủ đường dẫn (Path Coverage): đảm bảo tất cả các đường có thể xảy ra đi từ điểm đầu đến điểm cuối được test hết
![](https://images.viblo.asia/6080bd88-b4a8-44eb-bad8-f3a900563d94.png)

Việc bản đảm bảo 100% Path Coverage đồng nghĩa với việc bạn đã đảm bảo 100%decision coverage
### Kết luận
Trên đây là những gì mình đã tìm hiểu được về Unit Test, hi vọng bài viết trên có thể giúp các bạn có cái nhìn tổng quan về UnitTest cũng như đưa ra được các test case phù hợp!
### Tài liệu tham khảo
* https://vi.wikipedia.org/wiki/Unit_testing
* https://www.guru99.com/unit-testing-guide.html#:~:text=UNIT%20TESTING%20is%20a%20type,an%20application%20by%20the%20developers.