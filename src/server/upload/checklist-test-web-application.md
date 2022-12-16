Thật ra không có bất kỳ quy tắc nào cho việc kiểm thử Web Application. Vì một quy tắc này có thể phù hợp để test với trang web này nhưng không chắc nó sẽ phù hợp khi test với các loại trang web còn lại. Do đó danh sách các checklist sau đây là những quan điểm test chung nhất mà mọi tester cần nhớ khi thực hiện test với website. Tùy theo từng loại trang web mà sẽ có checklist chi tiết tương ứng. Sau đây là một số gợi ý cho checklist test Web Application.
# Functionality Testing - Kiểm thử chức năng
## 1.1. Kiểm thử chức năng là gì?
Kiểm tra các tính năng (feature), các hành vi hoạt động của ứng dụng để đảm bảo ứng dụng đúng với các thông số kỹ thuật của sản phẩm.
Quá trình kiểm thử sẽ bỏ qua các cơ chế bên trong của một hệ thống hoặc thành phần (component) và chỉ tập trung vào các đầu ra (output) tương ứng với các đầu vào (input) kèm theo đó là các điều kiện đi cùng.
## 1.2. Mục đích của việc kiểm thử chức năng là gì?
   Để xác minh xem sản phẩm hay ứng dụng có đáp ứng được các đặc điểm chức năng như đã được đề cập trong tài liệu phát triển của dự án hay không?
## 1.3. Kịch bản kiểm thử.
- Kiểm tra tất cả các trường bắt buộc phải được xác thực (validate).
- Kiểm tra dấu hoa thị (*) có được hiển thị ở tất cả các trường bắt buộc.
- Kiểm tra hệ thống sẽ không hiển thị thông báo lỗi cho các trường không bắt buộc.
- Kiểm tra rằng năm nhuận được xác nhận chính xác và không gây ra lỗi tính toán.
- Kiểm tra các trường số không thể nhập chữ và có thông báo lỗi thích hợp sẽ được hiển thị.
- Kiểm tra các số âm có thể nhập được hay không tại các trường cho phép.
- Kiểm tra phép chia cho số không sẽ không thể thực hiện để đảm bảo các phép tính sẽ được thực hiện một cách đúng đắn nhất.
- Kiểm tra độ dài tối đa của mỗi trường để đảm bảo dữ liệu không bị cắt bớt và không thể nhập dữ liệu vượt quá độ dài tối đa.
- Kiểm tra thông báo bật lên (Ví du: Trường mô tả giới hạn 500 ký tự) sẽ hiển thị nếu dữ liệu đạt đến kích thước tối đa của trường.
- Kiểm tra rằng thông báo xác nhận sẽ hiển thị cho các hoạt động cập nhật và xóa.
- Kiểm tra giá trị số tiền sẽ hiển thị theo định dạng tiền tệ.
- Kiểm tra tất cả các trường nhập cho các ký tự đặc biệt.
- Kiểm tra chức năng thời gian chờ.
- Kiểm tra chức năng sắp xếp.
- Kiểm tra chức năng của các nút.
- Kiểm tra Chính sách bảo mật và Câu hỏi thường gặp được xác định rõ ràng và sẽ có sẵn cho người dùng.
- Kiểm tra xem khi bất kỳ chức năng nào người dùng thao tác nhưng bị thất bại thì có chuyển hướng đến trang thông báo lỗi hay không.
- Kiểm tra tất cả các tài liệu được tải lên có được mở đúng cách hay không.
- Kiểm tra người dùng có thể tải xuống các tệp đã tải lên hay không.
- Kiểm tra chức năng email của hệ thống.
- Kiểm tra Java script có chạy đúng trong các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera).
- Kiểm tra xem điều gì sẽ xảy ra nếu người dùng xóa cookie trong khi ở trong trang web.
- Kiểm tra xem điều gì xảy ra nếu người dùng xóa cookie sau khi truy cập trang web.
- Kiểm tra tất cả các dữ liệu bên trong combox/ list có được sắp xếp theo thứ tự thời gian/ thứ tự tăng dần hay giảm dần hay không.
## 1.4. Một số kịch bản kiểm thử cần lưu ý.

***a/ Kiểm thử Links/URL:***

Việc kiểm thử này sẽ rất có ích cho việc chạy SEO của trang web.

***Internal links*** - Liên kết nội bộ: Liên kết trỏ đến các trang của cùng một trang web. Thử nghiệm này đảm bảo rằng các liên kết nội bộ được liên kết đúng với các trang dự kiến của trang web. 

*Ví dụ:* Liên kết từ các trang thành phần đến “trang chủ”, từ trang chủ đến trang “liên hệ với chúng tôi”, trang “giới thiệu”... 

***- External links*** - Liên kết ngoài: Liên kết trỏ đến các trang của trang web bên ngoài. Thử nghiệm này đảm bảo rằng các liên kết nội bộ được liên kết đúng với các trang web bên ngoài. 

*Ví dụ:* Link facebook, link youtube, link instagram,...

***- Email links*** - Liên kết email: Đảm bảo rằng nếu người dùng nhấp vào liên kết email thì ứng dụng email mặc định sẽ được mở và địa chỉ To có thể được điền trước. 

***- Broken links*** - Liên kết gãy: Liên kết bị hỏng hay được gọi là Liên kết chết. Các liên kết này không được liên kết với bất kỳ trang nào trong số các trang nội bộ hoặc các trang bên ngoài của trang web. Liên kết như vậy được tạo ra với lỗi chính tả trong URL liên kết hoặc trang được liên kết bị xóa hoặc không tồn tại nữa. Để kiểm tra liên kết bị hỏng, bạn có thể sử dụng các công cụ trực tuyến để xác thực các liên kết bị hỏng trong trang web. 

***b/ Kiểm thử form web:***

Các form web thường được sử dụng nhiều nhất trong các trang web. Do đó, nó là một phần quan trọng nhất trong thử nghiệm trang web. 
- Kiểm tra logic validation cho từng field.
- Kiểm tra các trường mật khẩu không hiển thị nội dung mật khẩu.
- Kiểm tra giá trị đầu vào không hợp lệ của từng field.
- Validation phản hồi của một form submit.

***c/ Kiểm thử session và quản lý cookie:***

- Kiểm tra phiên đăng nhập ứng dụng/trang web bằng cách bật và tắt cookie.
- Thực hiện negative tets Cookie bằng cách sử dụng miền không khớp.
- Kiểm tra xem cookie có được reset lại giữa các phiên trình duyệt hay không
- Kiểm tra bảo mật ứng dụng bằng cách chọn lọc xóa cookie trong khi test operates.
# Performance Testing - Kiểm thử hiệu năng
## 1.1. Kiểm thử hiệu năng là gì?
   Để đánh giá sự tuân thủ của một hệ thống hoặc thành phần với các yêu cầu về hiệu năng được đặt ra trước đó.
## 1.2. Kịch bản kiểm thử.
- Xác định hiệu suất, tính ổn định và khả năng mở rộng của ứng dụng trong các điều kiện load khác nhau.
- Xác định xem kiến trúc hiện tại có thể hỗ trợ ứng dụng ở mức người dùng cao nhất hay không.
- Xác định kích thước cấu hình nào cung cấp mức hiệu suất tốt nhất.
- Xác định tình trạng tắc nghẽn (bottlenecks) ứng dụng và cơ sở hạ tầng.
- Xác định xem phiên bản mới của phần mềm có ảnh hưởng bất lợi đến thời gian response của trang web hay không. *Ví dụ:* Trang web được viết bằng ngôn ngữ ruby on rails. Vậy khi upgrde ruby hay rails cần kiểm tra lại xem trang web có chạy ổn định hay không? Có bị lỗi gì hay không?
- Đánh giá xem sản phẩm hoặc phần cứng để xác định xem nó có thể xử lý khối lượng tải dự kiến hay không.
## 1.3. Làm thế nào để kiểm thử hiệu năng? Bằng cách kiểm thử manual hay automation?
   Thực tế, không thể thực hiện Kiểm tra hiệu năng theo cách manual do một số hạn chế như:
- Cần một lượng tài nguyên lớn.
- Không thể có các action cùng thực hiện một lúc.
- Khó khăn trong việc thực hiện các hành động lặp đi lặp lại nhiều lần.

Do đó để khắc phục các vấn đề trên, tester nên sử dụng công cụ kiểm thử hiệu năng. Dưới đây là danh sách một số công cụ kiểm tra phổ biến:
- [Apache JMeter.](https://jmeter.apache.org/)
- [Load Runner.](https://software.microfocus.com/en-us/products/loadrunner-load-testing/overview)
- [Borland Silk Performer.](https://www.microfocus.com/products/silk-portfolio/silk-performer/)
- [Rational Performance Tester.](https://www.automation-consultants.com/products/ibm-products/rational-performance-tester/)
- [WAPT.](https://www.loadtestingtool.com/)
- [NEO LOAD.](https://www.neotys.com/neoload/overview)
# Web Usability Testing - kiểm thử khả năng sử dụng trang web
## 1.1. Kiểm thử khả năng sử dụng trang web là như thế nào?
   Một bài kiểm tra về sự dễ sử dụng và hiệu quả của một trang web là một trong những tiêu chuẩn của kiểm thử khả năng sử dụng của trang web.
## 1.2. Kịch bản kiểm thử.
- Nội dung trang web phải chính xác và không có bất kỳ lỗi chính tả hoặc ngữ pháp nào.
- Tất cả các phông chữ phải giống nhau theo yêu cầu.
- Tất cả văn bản phải được căn chỉnh chính xác.
- Tất cả các thông báo lỗi phải chính xác và không có bất kỳ lỗi chính tả hoặc ngữ pháp nào và thông báo lỗi phải khớp với field tương ứng.
- Các field đều phải có chú thích (Tolltip text).
- Tất cả các field phải được căn chỉnh đúng.
- Phải cung cấp đủ khoảng trống giữa các field, cột, hàng và thông báo lỗi.
- Tất cả các nút phải ở định dạng và kích thước chuẩn.
- Ở các trang thành phần của web đều phải có link đến trang chủ.
- Các trường bị disable phải chuyển sang màu xám.
- Kiểm tra các liên kết bị gãy (broken links) và hình ảnh.
- Thông báo xác nhận sẽ được hiển thị cho bất kỳ loại hoạt động cập nhật và xóa.
- Kiểm tra trang web trên các độ phân giải khác nhau (640 x 480, 600x800,...).
- Kiểm tra người dùng cuối có thể chạy hệ thống mà không có bất kỳ phàn nàn nào.
- Kiểm tra tab sẽ hoạt động bình thường.
- Thanh cuộn sẽ chỉ xuất hiện nếu được yêu cầu.
- Nếu có thông báo lỗi khi gửi, thông tin mà người dùng đã điền phải xuất hiện ở đó.
- Tiêu đề sẽ hiển thị trên mỗi trang web.
- Tất cả các trường (hộp văn bản, thả xuống, nút radio, vv) và các nút có thể truy cập được bằng các phím tắt và người dùng có thể thực hiện tất cả các thao tác bằng bàn phím.
- Kiểm tra xem dữ liệu thả xuống không bị cắt bớt do kích thước field và cũng kiểm tra xem dữ liệu có được mã hóa hay quản lý qua quản trị viên hay không.
# Compatibility Testing - kiểm thử khả năng tương thích
## 1.1. Kiểm thử tương thích là gì?
   Kiểm thử khả năng tương thích được sử dụng để xác định xem phần mềm có tương thích với các phần tử khác của hệ thống mà nó sẽ hoạt động hay không?
  *Ví dụ:* Trình duyệt, Hệ điều hành hoặc phần cứng.
## 1.2. Mục đích của việc kiểm thử khả năng tương thích là gì?
   Đánh giá phần mềm hoạt động tốt như thế nào trong một trình duyệt cụ thể, hệ điều hành, phần cứng hoặc phần mềm.
## 1.3. Kịch bản kiểm thử.
- Kiểm tra trang web trong các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera) và đảm bảo trang web hiển thị chính xác.
- Kiểm tra phiên bản HTML đang được sử dụng tương thích với các phiên bản trình duyệt khác nhau hay không.
- Kiểm tra hình ảnh hiển thị chính xác trong các trình duyệt khác nhau.
- Kiểm tra phông chữ có thể sử dụng được trong các trình duyệt khác nhau.
- Kiểm tra mã java script có thể sử dụng được trong các trình duyệt khác nhau.
- Kiểm tra GIF động trên các trình duyệt khác nhau.
## 1.4. Công cụ dùng để kiểm thử khả năng tương thích.
   Spoon.net cung cấp quyền truy cập vào hàng nghìn ứng dụng (Trình duyệt) mà không cần cài đặt. Công cụ này giúp tester kiểm tra ứng dụng của mình trên các trình duyệt khác nhau trên cùng một máy.
# Web Security Testing - kiểm thử bảo mật trang web
## 1.1. Kiểm thử bảo mật trang web là gì?
   Kiểm thử bảo mật liên quan đến việc kiểm tra để xác định có bất kỳ sai sót và khoảng trống nào từ quan điểm bảo mật.
## 1.2. Kịch bản kiểm thử bảo mật trang web.
- Xác minh trang web có chứa dữ liệu quan trọng như mật khẩu, số thẻ tín dụng, câu trả lời bí mật cho câu hỏi bảo mật, vv phải được gửi qua HTTPS (SSL).
- Xác minh thông tin quan trọng như mật khẩu, số thẻ tín dụng, v.v. sẽ hiển thị ở định dạng được mã hóa.
- Xác minh quy tắc đặt mật khẩu có được thực hiện trên tất cả các trang xác thực như Đăng ký, quên mật khẩu, thay đổi mật khẩu.
- Xác minh nếu mật khẩu được thay đổi, người dùng sẽ không thể đăng nhập bằng mật khẩu cũ.
- Xác minh các thông báo lỗi sẽ không hiển thị bất kỳ thông tin quan trọng nào.
- Xác minh nếu người dùng đăng xuất khỏi hệ thống hoặc phiên người dùng đã hết hạn, người dùng sẽ không thể điều hướng trang web.
- Xác minh để truy cập trực tiếp vào các trang web được bảo mật và không được bảo mật mà không cần đăng nhập.
- Xác minh tùy chọn “Xem mã nguồn” bị tắt và không hiển thị với người dùng.
- Xác minh tài khoản người dùng bị khóa nếu người dùng nhập sai mật khẩu nhiều lần.
- Xác minh các cookie không nên lưu trữ mật khẩu.
- Xác minh nếu, bất kỳ chức năng nào không hoạt động, hệ thống sẽ không hiển thị bất kỳ thông tin ứng dụng, máy chủ hoặc cơ sở dữ liệu nào. Thay vào đó, nó sẽ hiển thị trang lỗi tùy chỉnh.
- Xác minh các cuộc tấn công SQL injection.
- Xác minh vai trò người dùng và quyền của họ. Ví dụ: Người dùng bình thường không thể truy cập trang quản trị.
- Xác minh các hoạt động quan trọng được ghi trong các tệp nhật ký và thông tin đó sẽ được theo dõi.
- Xác minh các giá trị phiên trong định dạng được mã hóa trong thanh địa chỉ.
- Xác minh thông tin cookie được lưu trữ ở định dạng được mã hóa.
- Xác minh ứng dụng cho tấn công Brute Force.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
***Link tham khảo:*** 

- https://www.guru99.com/complete-web-application-testing-checklist.html
- http://www.pushtotest.com/guide-to-web-applications-testing
- http://www.softwaretestingclass.com/complete-checklist-for-website-testing/