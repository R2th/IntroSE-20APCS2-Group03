Trong quá trình kiểm thử phần mềm, tùy thuộc vào từng loại ứng dụng và nghiệp vụ mà kiểm thử viên có thể đưa ra một danh sách kịch bản kiểm thử phù hợp. Dưới đây mình xin đưa ra gợi ý chung cho kịch bản kiểm thử có thể áp dụng được cho hầu hết các ứng dụng website.
Danh sách kiểm thử cho một ứng dụng web bao gồm:

* Kiểm thử tính khả dụng
* Kiểm thử chức năng
* Kiểm thử tính tương thích
* Kiểm thử cơ sở dữ liệu
* Kiểm thử bảo mật
* Kiểm thử hiệu năng

Sau đây, mình cùng đi vào chi tiết từng loại nhé:

# 1. Kiểm thử tính khả dụng
Hiểu một cách đơn giản, kiểm thử tính khả dụng là kiểm tra ứng dụng web có thân thiện với người dùng hay không? Người dùng mới có thể hiểu ứng dụng dễ dàng hay không?

Danh sách kịch bản kiểm thư tính khả dụng:
* Nội dung chính xác, không có bất kỳ lỗi chính tả hoặc ngữ pháp nào.
* Tất cả phông chữ phải giống nhau theo yêu cầu.
* Tất cả văn bản phải được căn chỉnh đúng.
* Tất cả các thông báo lỗi phải chính xác, không có bất kỳ lỗi chính tả hoặc ngữ pháp nào và thông báo lỗi phải khớp với nhãn trường.
* Có tool tip hướng dẫn ở các trường.
* Tất cả các trường phải được căn chỉnh đúng.
* Phải có khoảng trống hợp lý giữa các nhãn trường, cột, hàng và thông báo lỗi.
* Tất cả các button phải có một định dạng và kích thước chuẩn.
* Liên kết đến trang chủ nên có trên mỗi trang.
* Các trường bị khóa (disable) sẽ bị chuyển sang màu xám.
* Kiểm tra các liên kết và hình ảnh bị hỏng.
* Thông báo xác nhận được hiển thị cho bất kỳ loại hoạt động cập nhật và xóa nào.
* Kiểm tra trang web trên các độ phân giải khác nhau (640 x 480, 600x800...)
* Kiểm tra người dùng cuối có thể chạy hệ thống mà không bị thất bại.
* Kiểm tra tab sẽ hoạt động bình thường.
* Thanh cuộn scroll brar sẽ chỉ hiển thị nếu được yêu cầu.
* Nếu có bất kỳ thông báo lỗi trong quá trình người dùng gửi (submit), thông tin được người dùng điền vào vẫn phải hiển thị trên form.
* Tiêu đề sẽ hiển thị trên mỗi trang web
* Tất cả các trường (textbox, dropdown, radio button vv) và các nút có thể truy cập được bằng các phím tắt thì người dùng có thể thực hiện tất cả các thao tác bằng bàn phím.
* Kiểm tra dữ liệu dropdown không bị cắt bớt do kích thước trường và cũng kiểm tra xem dữ liệu có được mã hóa hay quản lý qua quản trị viên hay không.


# 2. Kiểm thử chức năng
Kiểm thử chức năng là để xác minh xem sản phẩm có đáp ứng các đặc điểm chức năng, nghiệp vụ được đề cập trong tài liệu đặc tả hay không.

Các kịch bản thử nghiệm chức năng:

* Kiểm tra tất cả các trường bắt buộc phải được xác minh tính hơp lệ.
* Kiểm tra dấu hoa thị sẽ hiển thị cho tất cả các trường bắt buộc.
* Kiểm tra hệ thống sẽ không hiển thị thông báo lỗi cho các trường tùy chọn.
* Kiểm tra rằng năm nhuận được xác nhận chính xác và không gây ra lỗi / tính toán.
* Kiểm tra các trường số không nên chấp nhận các bảng chữ cái và thông báo lỗi thích hợp sẽ hiển thị.
* Kiểm tra các số âm nếu được phép đối với trường số.
* Kiểm tra phép tính chia cho số không cần được xử lý đúng cách để tính toán.
* Kiểm tra độ dài tối đa của mỗi trường để đảm bảo dữ liệu không bị cắt bớt.
* Kiểm tra thông báo hiển thị ("Trường này giới hạn 500 ký tự") sẽ hiển thị nếu dữ liệu đạt đến kích thước tối đa của trường.
* Kiểm tra rằng thông báo xác nhận sẽ hiển thị cho các hoạt động cập nhật và xóa.
* Kiểm tra giá trị số tiền sẽ hiển thị theo đúng định dạng tiền tệ.
* Kiểm tra tất cả các trường nhập cho các ký tự đặc biệt.
* Kiểm tra chức năng thời gian chờ (timeout).
* Kiểm tra chức năng sắp xếp.
* Kiểm tra chức năng của các nút có sẵn.
* Kiểm tra Chính sách bảo mật & Câu hỏi thường gặp được xác định rõ ràng và sẽ có sẵn cho người dùng.
* Kiểm tra xem có bất kỳ chức năng nào không bị người dùng chuyển hướng đến trang lỗi tùy chỉnh hay không.
* Kiểm tra tất cả các tài liệu được tải lên được mở đúng cách.
* Kiểm tra người dùng sẽ có thể tải xuống các tệp đã tải lên.
* Kiểm tra chức năng email của hệ thống.
* Kiểm tra Java script làm việc đúng trong các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera).
* Kiểm tra xem điều gì sẽ xảy ra nếu người dùng xóa cookie trong khi ở trong trang web.
* Kiểm tra xem điều gì xảy ra nếu người dùng xóa cookie sau khi truy cập trang web.
* Kiểm tra tất cả các dữ liệu bên trong combo box / list được sắp xếp theo thứ tự thời gian.

# 3. Kiểm thử tính tương thích
Mục đích của kiểm tra Khả năng tương thích là đánh giá phần mềm hoạt động tốt như thế nào trong một trình duyệt cụ thể, Hệ điều hành, phần cứng hoặc phần mềm.

Các kịch bản thử nghiệm tương thích:

* Kiểm tra trang web trong các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera) và đảm bảo trang web hiển thị chính xác.
* Kiểm tra phiên bản HTML đang được sử dụng tương thích với các phiên bản trình duyệt thích hợp.
* Kiểm tra hình ảnh hiển thị chính xác trong các trình duyệt khác nhau.
* Kiểm tra phông chữ có thể sử dụng được trong các trình duyệt khác nhau.
* Kiểm tra javascript có thể sử dụng được trong các trình duyệt khác nhau.
* Kiểm tra ảnh GIF động trên các trình duyệt khác nhau.

Công cụ kiểm tra khả năng tương thích:

Spoon.net: Spoon.net cung cấp quyền truy cập vào hàng nghìn ứng dụng (Trình duyệt) mà không cần cài đặt. Công cụ này giúp bạn kiểm tra ứng dụng của mình trên các trình duyệt khác nhau trên cùng một máy.
# 4. Kiểm thử cơ sở dữ liệu
Kiểm thử cơ sở dữ liệu là việc kiểm tra dữ liệu được hiển thị trong ứng dụng web có khớp với dữ liệu được lưu trữ trong Cơ sở dữ liệu hay không? Dữ liệu thao tác trên ứng dung có được insert vào cơ sở dữ liệu một cách chính xác hay không?

Để thực hiện kiểm tra Cơ sở dữ liệu, kiểm thử viên cần lưu ý các điểm sau:

* Kiểm thử viên nên hiểu các yêu cầu chức năng, logic nghiệp vụ, luồng ứng dụng và thiết kế cơ sở dữ liệu kỹ lưỡng.
* Kiểm thử viên nên tìm ra các bảng, trình kích hoạt, thủ tục lưu trữ, khung nhìn và con trỏ được sử dụng cho ứng dụng.
* Kiểm thử viên nên hiểu được logic của các trình kích hoạt, các thủ tục lưu trữ, các khung nhìn và các con trỏ được tạo ra.
* Kiểm thử viên nên tìm ra các bảng bị ảnh hưởng khi các hoạt động chèn cập nhật và xóa (DML) được thực hiện thông qua các ứng dụng web hoặc máy tính để bàn.

Các kịch bản kiểm tra để kiểm tra cơ sở dữ liệu:

* Xác minh tên cơ sở dữ liệu: tên cơ sở dữ liệu phải khớp với thông số kỹ thuật.
Xác minh Bảng, cột, loại cột và mặc định: Tất cả mọi thứ phải khớp với thông số kỹ thuật.
* Xác minh xem cột có cho phép null hay không.
* Xác minh khóa chính và khóa ngoài của mỗi bảng.
* Xác minh thủ tục được lưu trữ:
* Kiểm tra xem các thủ tục lưu trữ được cài đặt hay không.
* Xác minh tên thủ tục được lưu trữ
* Xác minh tên tham số, loại và số tham số.
* Kiểm tra các tham số xem chúng có phải là tham số bắt buộc (required) hay không.
* Kiểm tra thủ tục đã lưu bằng cách xóa một số tham số
* Kiểm tra khi đầu ra bằng không, các bản ghi 0 sẽ bị ảnh hưởng.
* Kiểm tra thủ tục được lưu trữ bằng cách viết các truy vấn SQL đơn giản.
* Kiểm tra xem liệu thủ tục lưu sẵn có trả về các giá trị hay không
* Kiểm tra quy trình được lưu trữ với dữ liệu đầu vào mẫu.
* Xác minh sự làm việc đúng của từng cờ trong bảng.
* Xác minh dữ liệu được lưu đúng vào cơ sở dữ liệu sau mỗi lần gửi trang.
* Xác minh dữ liệu nếu các hoạt động DML (Cập nhật, xóa và chèn) được thực hiện.
* Kiểm tra độ dài của mọi trường: Độ dài trường trong backend và fontend phải giống nhau.
* Xác minh tên cơ sở dữ liệu của QA, UAT và sản xuất. Tên phải là duy nhất.
* Xác minh dữ liệu được mã hóa trong cơ sở dữ liệu.
* Xác minh kích thước cơ sở dữ liệu và kiểm tra thời gian phản hồi của mỗi truy vấn được thực hiện.
* Xác minh dữ liệu được hiển thị trên giao diện người dùng đảm bảo giống với backend.
* Xác minh tính hợp lệ của dữ liệu bằng cách chèn dữ liệu không hợp lệ vào cơ sở dữ liệu.
* Xác minh trình kích hoạt.
# 5. Kiểm thử tính bảo mật

Kiểm thử tính bảo mật liên quan đến thử nghiệm để xác định bất kỳ sai sót và lỗ hổng bảo mật nào. 

Các kịch bản kiểm thử để kiểm tra tính bảo mật:

* Xác minh trang web có chứa dữ liệu quan trọng như mật khẩu, số thẻ tín dụng, câu trả lời bí mật cho câu hỏi bảo mật, vv phải được gửi qua HTTPS (SSL).
* Xác minh thông tin quan trọng như mật khẩu, số thẻ tín dụng, v.v. sẽ hiển thị ở định dạng được mã hóa.
* Xác minh quy tắc mật khẩu được thực hiện trên tất cả các trang xác thực như Đăng ký, quên mật khẩu, thay đổi mật khẩu.
* Xác minh nếu mật khẩu được thay đổi, người dùng sẽ không thể đăng nhập bằng mật khẩu cũ.
* Xác minh các thông báo lỗi sẽ không hiển thị bất kỳ thông tin quan trọng nào.
* Xác minh nếu người dùng đăng xuất khỏi hệ thống hoặc phiên người dùng đã hết hạn, người dùng sẽ không thể điều hướng trang web.
* Xác minh việc truy cập trực tiếp vào các trang web được bảo mật và không được bảo mật mà không cần đăng nhập.
* Xác minh tùy chọn “Xem mã nguồn” bị tắt và không hiển thị với người dùng.
* Xác minh tài khoản người dùng bị khóa nếu người dùng nhập sai mật khẩu nhiều lần.
* Xác minh các cookie không nên lưu trữ mật khẩu.
* Xác minh nếu, bất kỳ chức năng nào không hoạt động, hệ thống sẽ không hiển thị bất kỳ thông tin ứng dụng, máy chủ hoặc cơ sở dữ liệu nào. Thay vào đó, nó sẽ hiển thị trang lỗi tùy chỉnh.
* Xác minh các cuộc tấn công SQL injection.
* Xác minh vai trò người dùng và quyền của họ. Ví dụ người dùng bình thường không thể truy cập trang quản trị.
* Xác minh các hoạt động quan trọng được ghi trong các tệp nhật ký và thông tin đó sẽ được theo dõi.
* Xác minh các giá trị phiên trong định dạng được mã hóa trong thanh địa chỉ.
* Xác minh thông tin cookie được lưu trữ ở định dạng được mã hóa.
* Xác minh ứng dụng tấn công Brute Force
# 6. Kiểm thử hiệu năng
Kiểm tra hiệu năng được tiến hành để đánh giá sự tuân thủ của một hệ thống hoặc thành phần với các yêu cầu về hiệu năng.

Một số kịch bản thử nghiệm như sau:

* Để xác định hiệu suất, tính ổn định và khả năng mở rộng của ứng dụng trong các điều kiện tải khác nhau.
* Để xác định xem kiến trúc hiện tại có thể hỗ trợ ứng dụng ở mức người dùng cao nhất hay không.
* Để xác định kích thước cấu hình nào cung cấp mức hiệu suất tốt nhất.
* Để xác định tình trạng tắc nghẽn ứng dụng và cơ sở hạ tầng.
* Để xác định xem phiên bản mới của phần mềm có ảnh hưởng bất lợi đến thời gian phản hồi hay không.
* Để đánh giá sản phẩm và phần cứng để xác định xem nó có thể xử lý khối lượng tải dự kiến hay không.


Làm thế nào để làm thử nghiệm hiệu suất? Bằng cách kiểm tra thủ công hoặc bằng tự động hóa?

Thực tế, không thể thực hiện Kiểm tra hiệu suất theo cách thủ công do một số hạn chế như:
* Cần có thêm số lượng tài nguyên.
* Hành động đồng thời là không thể.
* Giám sát hệ thống không có sẵn.
* Không dễ thực hiện nhiệm vụ lặp đi lặp lại.

Do đó, để khắc phục các vấn đề trên, chúng ta nên sử dụng công cụ kiểm tra hiệu suất. Dưới đây là danh sách một số công cụ kiểm tra phổ biến.
Apache JMeter
Tải Runner
Borland Silk Performer.
Rational Performance Tester
WAPT
NEO LOAD

## Tài liệu tham khảo
https://www.guru99.com/complete-web-application-testing-checklist.html