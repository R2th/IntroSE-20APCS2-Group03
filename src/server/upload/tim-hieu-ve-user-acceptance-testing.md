UAT sẽ được bắt đầu ngay sau khi giai đoạn *System Testing* và *Integration Testing* được hoàn thành.
### User Acceptance Testing là gì?
- Là quy trình kiểm thử phần mềm trong đó hệ thống được kiểm tra về khả năng chấp nhận (acceptability) và validate một lần nữa quy trình nghiệp vụ. Loại thử nghiệm này được thực hiện bởi khách hàng trong môi trường test riêng biệt (gần giống với môi trường production).
- Được thực hiện sau khi giai đoạn System Testing được hoàn thành. Lúc này tất cả hoặc hầu hết các bug lớn (Bug được gắn nhãn immediately, critial, block hoặc có độ ưu tiên lớn) đã được fix. UAT sẽ được thực hiện trong giai đoạn cuối cùng của vòng đời phát triển phần mềm (Software Development Life Cycle) trước khi hệ thống được public ra ngoài và được sử dụng bởi end-user. Trong quá trình này, UAT user hoặc end-user chỉ tập trung vào các end to end scenarios và nó thường liên quan đến việc test lại bộ test case trên hệ thống hoàn chỉnh.
- Là một kỹ thuật của “black box”, nghĩa là UAT user không cần biết cấu trúc bên trong hệ thống, cấu trúc code. Họ chỉ cần quan tâm đến việc khi input các đầu vào hệ thống có trả về các output tương ứng hay không? Và kết quả đó có đúng với yêu cầu ghi trong spec hay không?
- Khách hàng sẽ là primary owners - người thực hiện chính của việc kiểm tra UAT. 

![](https://images.viblo.asia/b3413aef-60b2-464a-9daf-0be2cb72936a.png)

*Hình 1.* Các Levels của testing – User Acceptance Testing

### Điều kiện tiên quyết của User Acceptance Testing
Các checkpoint sau sẽ được xem xét và kiểm tra trước khi bắt đầu giai đoạn UAT:
- Các yêu cầu về nghiệp vụ đã được chuẩn bị.
- Việc phát triển phần mềm đã được hoàn thành và các level test Unit testing, Integration Testing và System Testing cũng đã được hoàn thành.
- Tất cả các bug/defect với mức độ nghiêm trọng cao, ưu tiên cao đã được fix và confirm. Không có bất kỳ lỗi Showstoppers nào trong hệ thống.
- Kiểm tra xem tất cả các bug đã log đã được verify trước khi bắt đầu UAT hay chưa?
- Traceability matrix của tất cả các thử nghiệm phải được hoàn thành.
- Trước khi UAT bắt đầu các bug về layout sẽ được chấp nhận nhưng nên báo với khách hàng về các bug này.
- Sau khi đã fix tất cả các bug, Regression Testing nên được thực hiện một lần nữa để xác định các bug đã fix không ảnh hưởng đến các màn hình, chức năng khác của hệ thống.
- Môi trường riêng dành cho UAT tương tự như môi trường production nên được chuẩn bị sẵn sàng.
- Việc đăng xuất - The sign off sẽ được thực hiện bởi nhóm system testing và mục đích của việc làm này là cho biết ứng dụng Phần mềm đã sẵn sàng để thực hiện giai đoạn UAT.
### Các loại Acceptance test 
Ứng dụng phần mềm có thể được sử dụng bởi những người dùng khác nhau theo các cách khác nhau mà dev hoặc tester không thể dự đoán được tất cả các tình huống/case có thể xảy ra hoặc fake dữ liệu thử nghiệm đúng với dữ liệu thực mà end-user sẽ sử dụng trong ứng dụng phần mềm. Vì vậy, hầu hết các software vender đều sử dụng thuật ngữ thử nghiệm Alpha và thử nghiệm Beta để nói về các bug có thể xảy ra trong môi trường test. Trong phương pháp thử nghiệm này, ứng dụng phần mềm sẽ được release đến end-user sau khi đã pass các test case của team test và các feedback của khách hàng.

***Alpha Testing***

Được thực hiện bởi khách hàng tại site của developer. Lần thử nghiệm alpha này không phải là thử nghiệm trên phiên bản cuối cùng. Sau khi fix tất cả các bug đã log. Phiên bản mới nhất của phần mềm sẽ được release. 

***Beta Testing***
- Giai đoạn này được sử dụng để nhận phản hồi của người dùng. Dựa trên các phản hồi đó team dev sẽ fix và hoàn thiện sản phẩm để chuẩn bị cho bản release cuối cùng. Phiên bản phát hành sau khi thử nghiệm beta được gọi là “Beta release”.
- Đây là giai đoạn cuối cùng của thử nghiệm sau đó sản phẩm sẽ được public cho end-user sử dụng hoặc được dùng để cung cấp một bản trail và có thể download được.
### Cần test gì trong giai đoạn User Acceptance Testing?
- Bộ test case và nó sẽ được tạo ra dựa trên định nghĩa của các yêu cầu sử dụng của người dùng.
- Ngoài các case đã được tạo trong bộ testcase, người test cũng cần quan tâm đến các kịch bản có thể sẽ xảy ra khi ứng dụng được mang vào sử dụng.
- Sẽ được thực hiện test trên môi trường gần giống với môi trường production.
- Testcase phải được thiết kế sao cho cover được hết các màn hình, chức năng của phần mềm nhằm đảm bảo UAT đạt hiệu quả cao nhất.
### Key deliverable của User Acceptance Testing là gì?
Hoàn thành UAT là việc quan trọng khi áp dụng phương pháp test truyền thống.
Các key deliverable của UAT:
- Kế hoạch test - test plan: Đây là outline của chiến lược test.
- UAT test cases: bộ test case sẽ giúp team test test hiệu quả hơn trong giai đoạn UAT.
- Test Results and Error Reports - Kết quả test và báo cáo lỗi: Đây là log ghi lại toàn bộ kết quả của các case test và kết quả thực tế.
- User Acceptance Sign-off - Sign-off chấp nhận của người dùng: Đây là hệ thống, document và tài liệu training đã pass tất cả các case test trong phạm vi có thể.
- Installation Instructions - Hướng dẫn cài đặt: Đây là tài liệu hướng dẫn cài đặt hệ thống trên môi trường production.
- Documentation Materials: Tài liệu người dùng và tài liệu training sẽ được kiểm tra và cập nhật liên tục trong quá trình UAT.
### Kết luận
***User Acceptance Testing*** (UAT) - Thử nghiệm chấp nhận người dùng còn được gọi là ***Customer Acceptance Testing*** (CAT) - thử nghiệm chấp nhận khách hàng. CAT hoặc UAT là xác nhận cuối cùng từ khách hàng trước khi hệ thống sẵn sàng release bản production. Và việc kiểm tra sẽ được thực hiện bởi khách hàng trên môi trường test được set up gần giống nhất với môi trường production.


------------------------------------------------------------------------------------------------------------------------------

*Link tham khảo:*
- https://www.softwaretestingclass.com/user-acceptance-testing-what-why-how/