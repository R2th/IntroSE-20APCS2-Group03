Link bài trước (phần 1):

https://viblo.asia/p/check-list-kiem-thu-ung-dung-web-cac-test-case-kiem-tra-cho-trang-web-Az45bmRzlxY
# IV. Database Testing
## 1. Thế nào là Database Testing
* Trong database testing các bản ghi được kiểm thử cần điền đầy đủ thông tin qua các ứng dụng. Dữ liệu được hiển thị trong ứng dụng phải khớp với dữ liệu được lưu trong database.
## 2.Để thực hiện database testing, tester cần lưu ý các những điểm sau đây:
* Tester cần hiểu rõ các yêu cầu chức năng, logic nghiệp vụ, luồng ứng dụng và thiết kế cơ sở dữ liệu.
* Tester nên tìm ra các table, trigger, store proceduce, view và cursor được sử dụng cho ứng dụng.
* Tester nên hiểu logic của  trigger, store proceduce, view và cursor được tạo.
* Tester nên tìm ra các table bị ảnh hưởng khi thực hiện insert, update và delete (DML) được thực hiện thông qua các ứng dụng.

**Với những điểm đã nêu ở trên, tester có thể dễ dàng viết các kịch bản test để kiểm tra Cơ sở dữ liệu.**

## 3. Ví dụ test case kiểm thử cơ sở dữ liệu
* Xác minh tên database: Tên database phải khớp với thông số kỹ thuật.
* Xác minh table, column, column type và giá trị default: đúng với thông số kỹ thuật.
* Xác minh xem cột có cho phép null hay không?
* Xác nhận khóa chính và khóa ngoại của mỗi bảng
* Xác nhận các store Procedure.
* Kiểm tra xem các store Procedure đã được cài đặt hay chưa?
* Xác nhận tên store Procedure
* Xác nhận tên parameter, loại và số lượng parameter.
* Kiểm tra các parameter nếu là require hay không?
* Kiểm tra các store Procedure bằng cách xóa một parameter
* Kiểm tra khi đầu ra bằng 0, các bản ghi bằng 0 có bị ảnh hưởng không
* Kiểm tra store procedure bằng cách viết các truy vấn SQL đơn giản.
* Kiểm tra xem store procedure có trả về các giá trị không
* Kiểm tra store procedure với dữ liệu mẫu.
* Xác nhận hành vi của mỗi flag trong bảng
* Xác minh dữ liệu được lưu chính xác vào cơ sở dữ liệu sau mỗi lần submit.
* Xác minh dữ liệu nếu các hoạt động DML (update, delete, insert) được thực hiện.
* Kiểm tra độ dài của mọi trường: Độ dài trường ở bac kend và front end phải giống nhau
* Xác nhận tên cơ sở dữ liệu của QA, UAT và production. Các tên nên là duy nhất.
* Xác nhận dữ liệu được mã hóa trong cơ sở dữ liệu.
* Xác nhận kích thước cơ sở dữ liệu. Cũng kiểm tra thời gian phản hồi của từng truy vấn được thực hiện.
* Xác nhận dữ liệu được hiển thị ở front end và back end giống nhau.
* Xác minh tính hợp lệ của dữ liệu bằng cách chèn dữ liệu không hợp lệ vào cơ sở dữ liệu.
* Xác minh các Trigger.
# V. Thế nào là Security Testing?
Sercurity Testing là kiểm tra để xác định bất kỳ sai sót và lỗ hổng từ quan điểm bảo mật.
## 1. Ví dụ test case kiểm thử bảo mật
1. Trang web chứa dữ liệu quan trọng như mật khẩu, số thẻ tín dụng, câu trả lời bí mật cho câu hỏi bảo mật, v.v. nên được gửi qua HTTPS (SSL).
2. Thông tin quan trọng như mật khẩu, số thẻ tín dụng, vv sẽ hiển thị ở định dạng được mã hóa.
3. Rule liên quan tới mật khẩu được thực hiện trên tất cả các trang xác thực như Đăng ký, quên mật khẩu, thay đổi mật khẩu.
4. Nếu mật khẩu bị thay đổi, người dùng sẽ không thể đăng nhập bằng mật khẩu cũ.
5. Các thông báo lỗi sẽ không hiển thị bất kỳ thông tin quan trọng.
6. Nếu người dùng đã đăng xuất khỏi hệ thống hay phiên người dùng đã hết hạn, người dùng sẽ không thể thao tác trong hệ thống.
7. Xác minh để truy cập trực tiếp các trang web được bảo mật và không bảo mật mà không cần đăng nhập.
8. Xác minh tùy chọn “View Source code” bị vô hiệu hóa và không hiển thị cho người dùng.
9. Tài khoản người dùng bị khóa nếu người dùng nhập sai mật khẩu nhiều lần.
10. Xác nhận cookie không nên lưu trữ mật khẩu.
11. Xác minh xem, bất kỳ chức năng nào không hoạt động, hệ thống sẽ không hiển thị ở bất kỳ ứng dụng, máy chủ hoặc thông tin cơ sở dữ liệu nào. Thay vào đó, nó sẽ hiển thị trang lỗi tùy chỉnh.
12. Xác minh SQL injection
13. Xác minh quyền theo role user. Ví dụ: User thông thường không thể truy cập trang quản trị
14. Xác minh các hoạt động quan trọng cần được ghi trong file log và thông tin đó phải truy xuất được.
15. Xác minh sesion value đã được mã hóa trong thanh địa chỉ.
16. Xác nhận thông tin cookie được lưu trữ đã được mã hóa.
17. Xác minh ứng dụng khi thực hiện tấn công Brute Force
# VI. Thế nào là Performance Testing?
Performance testing được thực hiện để đánh giá sự tuân thủ của một hệ thống hoặc một phần của hệ thống với các yêu cầu hiệu suất được chỉ định.
## 1. Kịch bản test chung
* Để xác định hiệu suất, tính ổn định và khả năng mở rộng của ứng dụng trong các điều kiện tải khác nhau.
* Để xác định xem kiến trúc hiện tại có thể hỗ trợ ứng dụng khi lượng người dùng cao nhất hay không.
* Để xác định cấu hình cho mức hiệu suất tốt nhất.
* Để xác định xem version mới của phần mềm có ảnh hưởng xấu đến thời gian phản hồi hay không.
* Để đánh giá xem sản phẩm và / hoặc phần cứng có thể xử lý khối lượng tải dự kiến hay không.
## 2. Làm thế nào thực hiện performance testing? Bằng cách kiểm tra thủ công hay tự động hóa
Thực tế không thể thực hiện performance testing theo cách thủ công vì một số nhược điểm như:
* Lượng resource sẽ được yêu cầu.
* Thao tác đồng thời là không thể.
* Không dễ để thực hiện các nhiệm vụ lặp đi lặp lại.

Do đó để khắc phục các vấn đề trên, chúng ta nên sử dụng công cụ Kiểm tra hiệu suất. Dưới đây là danh sách một số công cụ kiểm tra phổ biến.
* Apache JMeter
* Load Runner
* Borland Silk Performer.
* Rational Performance Tester
* WAPT
* NEO LOAD

Link reference: https://www.guru99.com/complete-web-application-testing-checklist.html