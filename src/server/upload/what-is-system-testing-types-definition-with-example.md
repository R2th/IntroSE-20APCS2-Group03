# 1. System test là gì? 
- System test là quá trình kiểm tra xác nhận một sản phẩm phần mềm đã hoàn chỉnh và tích hợp đầy đủ.
- Mục đích để đánh giá các thông số của hệ thống có đáp ứng được yêu cầu đã đặt ra hay không.
- System test thuộc loại kiểm thử hộp đen.

# 2. Làm thế nào để thực hiện System Test
- Khi lên plan test thì bạn cần estimate cho cả phần System Test. Vì đây là một phần cơ bản không thể thiếu trong kiểm thử phần mềm.  
- Để thực hiện system test yêu cầu đầu vào và đầu ra phải rõ ràng và đòi hỏi QA phải nắm được cách vận hành cũng như sử dụng hệ thống.
- Cần lưu ý các thiết bị bên thứ 3 để kiểm tra các thành phần khi tương tác với nhau sẽ ra sao: hiệu năng, cài đặt, bảo mật, khả năng phục hồi,..

Các bước để thực hiện: 
1. Create System Test Plan: Trước khi thực hiện system test cần phải đưa ra rõ mục tiêu, phạm vi sẽ test cái gì? chiến lược test, môi trường, công cụ sử dụng? Test Schedule, Resource,...
2. Create Test Cases/ Test scripts: Theo tôi bước này rất quan trọng, để đảm bảo hệ thống đáp ứng được yêu cầu tới  End_User thì bộ Test Cases phải đảm bảo đầy đủ các yêu cầu đầu vào, đầu ra của hệ thống. Nên kết hợp nhiều kĩ thuật thiết kế test case cùng lúc để tăng mức độ hiệu quả: phân vùng tương đương, giá trị biên, bảng quyết định,.. 
Ngoài những yêu cầu có sẵn trong requirement thì đòi hỏi QA cũng phải nghĩ thêm những case có khả năng phát sinh từ bên thứ ba có khả năng làm ảnh hưởng tới hệ thống.
5.  Chuẩn bị bộ Test Suites: Tạo sẵn bộ data test để thực hiện kiểm thử. Bộ data test cũng rất quan trọng vì có thể do data khác nhau mà output cũng sẽ khác nhau. Hãy đứng về phía End_User để chọn lọc cũng như đem ra được bộ data test đầy đủ nhất. 
6.  Execute test cases: Giai đoạn này sẽ thực hiện chạy test cases, log bug, verify bug  để và đảm bảo bộ test case được pass 100%. Giai đoạn này QA nên kết hợp Ad-hoc và Exploratory Testing để phát hiện sớm issue còn tiềm ẩn trong sản phẩm phần mềm 
7.  Regression Test: Thực hiện test hồi quy để kiểm tra ảnh hưởng sau khi có thay đổi trong code: Sau khi fix bug sẽ không tránh khỏi impact range tới màn hình cũ cũng như mới. Việc thực hiện Regression Test để giảm thiểu bug Degrade có thể xảy ra. 
8.  Test lại hệ thống một lần nữa để đảm bảo hệ thống đã sẵn sàng bàn giao qua cho khách hàng: Đảm bảo các test case đều được chạy xong, không còn bug. Hoặc nếu có thì bug đó phải được report lại cho khách trong trường hợp issue chưa thể giải quyết ngay để được sự chấp thuận của khách hàng. 
# 3. Sytem test được thực hiện ở giai đoạn nào?
![](https://images.viblo.asia/b3dfeb81-93f6-4a37-b352-82782773b023.png)
Kiểm thử phần mềm cũng có từng giai đoạn và được sắp xếp theo trình tự thời gian. Một sản phẩm trước khi đến tay người dùng sẽ trải qua các giai đoạn test sau:
*  Unit Testing:  thực hiện trên mỗi module trong quá trình phát triển. Nó thường được thực hiện bởi các Developer 
*  Sau đó tới giai đoạn Intergration Testing. Mỗi một module phần mềm riêng biệt đều sẽ được kết hợp lại để thực hiện kiểm thử theo nhóm 
*  System testing: Kiểm tra sản phẩm đã hoàn thiện trước khi đưa ra thị trường
*  Acceptance testing: Thử nghiệm trải nghiệm sản phẩm bởi end_user
# 4. System test có những loại nào? 
Có tới  hơn 50 loại System test. Bạn có thể tham khảo đầy đủ ở link sau: [click here](https://www.guru99.com/types-of-software-testing.html)

Còn đây sẽ liệt kê các loại system test thông dụng được các công ty phát triển phần mềm lớn sử dụng: 
1. Usability Testing: Tập trung vào tính dễ sử dụng, linh hoạt trong việc xử lý và khả năng hệ thống đáp ứng được mục tiêu của nó 
2. Loading Testing:  Kiểm tra mức độ tải lớn mà sản phẩm có thể chịu được 
3. Regression Testing: Đảm bảo các chức năng cũ và mới vận hành đúng sau khi có sự thay đổi trong hệ thống 
4. Recovery testing: Xác định độ tin cậy của sản phẩm, khả năng khôi phục lại bình thường sau khi có sự cố xảy ra 
5. Migration testing: Đảm bảo phần mềm được chuyển từ hệ thống cũ qua hệ thống hiện tại mà không gặp phải issues nào. 
6. Functional Testing: Còn được gọi là kiểm tra tính hoàn chỉnh của chức năng. Nghĩ ra các chức năng mà sản phẩm có thể bị thiếu. Từ đó có thể lập ra được danh sách bổ sung chức năng để cải thiện sản phẩm
7. Hardware/Software Testing: Kiểm tra sự tương tác giữa phần cứng và phần mềm

# 5. Nên sử dụng loại System Test nào?
Có quá nhiều loại để thực hiện System Test. Trong trường hợp nào sử dụng loại test gì là thích hợp?

Sẽ có một số yếu tố dưới đây để quyết định việc bạn sẽ thực hiện loại test nào:
* Khách hàng của bạn là ai? Bởi phương pháp được sử dụng bởi các công ty lớn sẽ khác so với công ty vừa và nhỏ 
* Thời gian để thực hiện test là bao lâu? Thời gian sẽ là thứ giới hạn chúng ta chỉ sử dụng được những loại phù hợp nhất cho sản phẩm phần mềm 
* Nguồn nhân lực có sẵn? Xác định nguồn lực và nhân lực có sẵn để đảm bảo có thể thực hiện được theo phương pháp nào. 
* Software Tester's Education: Có một lịch trình học tập nhất định cho mỗi loại kiểm thử phần mềm có sẵn. Bởi để sử dụng một số phần mềm liên quan, đòi hỏi Tester phải học cách sử dụng nó 
* Testing Budget: Chi phí là một yếu tố quyết định không chỉ đối với các công ty nhỏ, các nhà phát triển cá nhân mà còn ngay cả với các công ty lớn.

 
Tham khảo: https://www.guru99.com/system-testing.html#2