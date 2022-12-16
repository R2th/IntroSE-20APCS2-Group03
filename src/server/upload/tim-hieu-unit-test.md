## Giới thiệu.
- Hôm trước mình có tham gia một buổi siminar do anh Thắng chia sẻ về việc unit test trong các dự án laravel, bài viết này mình thực hiện việc trình bày lại các nội dung đã được chia sẻ.
## Nội dung
### Unit test là gì?
- Unit Testing là một phương pháp kiểm thử phần mềm mà ở đó từng đơn vị riêng lẻ (Individual Unit) của source code được test để kiểm tra xem chúng có đảm bảo chất lượng để sử dụng không.
- Ở trong Laravel Project, viết Unit Test là quá trình mà ở đó, tất cả các Test Case cho từng function/method riêng biệt được viết.

### Code coverage là gì ?
- Code coverage là một phương pháp đánh giá được dùng để mô tả mức độ mà source code của một chương trình đã được thực thi, khi mà một bộ Test cụ thể chạy. Nói một cách khác, Code Coverage là một cách để đảm bảo rằng Tests của bạn thực sự đang test Codes của bạn!
- Ví dụ: Nếu code coverage của bạn là 90%, điều đó có nghĩa là 90% các dòng codes trong project của bạn đã được gọi ghi chạy Test.
### Tại sao lại phải viết unit test
- Nâng cao chất lượng code
- Dễ phát hiện bug từ sớm (vì mỗi lần chạy unit test, unit test chết là phát hiện ra vấn đề, một là update unit test, hay là đang sai logic)
- Dễ dàng thích ứng với thay đổi
- Dễ dàng debug khi có lỗi
- Dễ dàng tích hợp, giúp CI/CD thực sự trở lên hiệu quả, giảm công sức phát triển, giá , và những nguy cơ có thể gặp phải.
### Một số những hiểu lầm về unit test
- Code Coverage 100% là việc viết test đã hoàn hảo. 
Code Coverage chỉ cho biết đoạn code nào đã được chạy qua, khi chạy test. Logic của code đã thật sự đúng hay không, Test đã thực sự cover được hết các trường hợp hay chưa, sẽ phụ thuộc vào chất lượng của test, hay năng lực của người viết Test. 
Code Coverage không phải là con số có thể phản ánh đúng chất lượng của Test, nhưng là thước đo tốt nhất chúng ta có thể có để đánh giá tiến độ của việc viết Test
- Viết Tests theo ducument của Laravel là viết Unit Test
- Viết Test bằng PHPUnit là viết Unit Test
- Viết Test bằng RSpec là viết Unit Test
- Viết Test trong project Laravel là viết Unit Test 
#### Facts:
- Unit Test: Test đơn vị riêng lẻ, không phụ thuộc vào nhau
- Feature Test/Integration Test/Functional Test: từng đơn vị phần mềm riêng biệt được kết hợp lại, và kiểm tra như một khối thống nhất
- Nếu như Unit Test giúp chúng ta chắc chắn rằng từng function riêng biệt hoạt động chính xác, thì Integration/Feature/Functional Test giúp chúng ta chắc chắn rằng các thành phần khác trong của project sẽ hoạt động hoàn hảo khi chúng kết hợp với nhau trong thực tế.
### Cách viết unit test đúng
- Unit Test cần được thiết kế để kiểm tra function một cách độc lập. Hay nói cách khác: A cần B để chạy. Ngay cả khi B có lỗi, thì Unit Test của A VẪN SẼ PASS nếu không có vấn đề gì với A
- Một Unit Test tốt KHÔNG thực hiện những việc như sau: 
  + Trigger để chạy codes từ những functions khác trong project 
  + Truy vấn vào cơ sở dữ liệu 
  + Sử dụng file system 
  + Truy cập mạng
### Vấn đề của việc viết unit test
- Tốn thời gian học, thời gian training
- Tốn thời gian/effort viết test 
- Chất lượng của Test phụ thuộc vào năng lực của developer