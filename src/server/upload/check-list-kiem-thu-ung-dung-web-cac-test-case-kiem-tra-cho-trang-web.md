Trong khi kiểm thử các ứng dụng web, tester nên xem xét các template được đề cập dưới đây. Check list test case sau đây hầu như có thể áp dụng cho tất cả các loại ứng dụng web tùy thuộc vào yêu cầu nghiệp vụ.

Check list test case cho ứng dụng web bao gồm:
* Usability Testing
* Functional Testing
* Compatibility Testing
* Database Testing
* Security Testing
* Performance Testing

## I. Usability Testing 
### 1. Định nghĩa Usability Testing
* Là kiểm tra tính thân thiện với người dùng
* Là kiểm tra tính dễ sử dụng với người dùng
* Về cơ bản, làm cho hệ thống có tính dễ sử dụng
### 2. Mục tiêu của Usability Testing
Usability test nhằm thiết lặp tính hiệu quả và dễ sử dụng cho sản phẩm thông qua kiểm tra khả năng sử dụng tiêu chuẩn
### 3. Ví dụ test case kiểm tra tính khả dụng
* Nội dung trang web chính xác mà không có lỗi chính tả hoặc ngữ pháp
* Tất cả các phông chữ theo đúng yêu cầu
* Tất cả các văn bản, text được căn chỉnh chính xác
* Tất cả các thông báo lỗi phải chính xác mà không có bất kỳ lỗi chính tả hoặc ngữ pháp nào. Và thông báo lỗi phải phù hợp với từng field (trường), label
* Mỗi field nên có tool tip
* Tất cả các field phải được căn chỉnh chính xác
* Tất cả các button phải đúng đính dạng và kích thước
* Các trang khác đều liên kết với home page 
* Các trường không khả dụng nên để grayout (màu xám)
* Kiểm tra khi link và image bị lỗi
* Cần hiển thị message thông báo khi có hoạt động update, delete
* Kiểm tra hiển thị khi ở các độ phân giải khác nhau (640 x 480, 600x800,...) 
* Kiểm tra để không xảy ra sự cố khi end user sử dụng hệ thống 
* Kiểm tra để các tab hoạt động đúng
* Scroll bar hiển thị theo đúng yêu cầu.
* Nếu có thông báo lỗi được submit, thì cần có cả thông tin của người gửi
* Mỗi trang web cần hiển thị title page
* Tất cả các trường (Textbox, dropdown, radio button, v.v.) và các button: có thể sử dụng phím tắt để thao tác và người dùng sẽ có thể thực hiện tất cả các thao tác bằng cách sử dụng bàn phím.
* Kiểm tra xem dữ liệu dropdown có bị cắt bớt do kích thước trường không và cũng kiểm tra xem dữ liệu có bị hardcode không hoặc được quản lý thông qua admin.
## II. Functional Testing
###  1. Định nghĩa Functional Testing (kiểm thử chức năng)
* Kiểm tra các tính năng và hành vi hoạt động của sản phẩm để đảm bảo đúng với thông số kỹ thuật được mô tả.
* Là loại kiểm thử bỏ qua cấu trúc bên trong của hệ thống, mà chỉ tập trung vào giá trị input và outputs của hệ thống
###  2. Mục tiêu của Functional Testing
* Mục tiêu của Functional Testing là xác minh xem sản phẩm có đáp ứng được các thông số chức năng đã được mô tả trong tài liệu phát triển hay không.
###  3. Ví dụ một số kịch bản test Functional 
* Kiểm tra tất cả các trường mandatory.
* Tại các trường mandatory đều hiển thị dấu hoa thị (*).
* Đối với các trường không phải là mandatory: không hiển thị thông báo lỗi.
* Các trường date time, nếu input năm nhuận thì vẫn tính toán đúng.
* Các trường số: không chấp nhận ký tự a,b,c.... và hiển thị message báo lỗi thích hợp.
* Kiểm tra số âm nếu là trường số.
* Kiểm tra xem trường hợp chia cho 0 thì xử lý tính toán có đúng không.
* Kiểm tra max length của mỗi trường để đđảm bảo dữ liệu không bị cắt ngắn
* Kiểm tra các pop up message ("Trường này được giới hạn ở 500 ký tự") sẽ hiển thị nếu dữ liệu của trường đạt kích thước tối đa.
* Khi thực hiện update hoặc delete thì cần có message thông báo xác nhận.
* Các trường tiền tệ hiển thị đúng định dạng.
* Đối với các trường input: kiểm tra cả ký tự đặc biệt.
* Kiểm tra chức năng khi timeout.
* Kiểm tra chức năng sắp xếp.
* Kiểm tra chức năng của các nút có sẵn.
* Kiểm tra Chính sách bảo mật & Câu hỏi thường gặp có nội dung rõ ràng và nên có sẵn cho người dùng.
* Kiểm tra xem có bất kỳ chức năng nào bị lỗi thì người dùng sẽ được chuyển hướng đến trang lỗi tương ứng.
* Kiểm tra tất cả các tài liệu tải lên cần mở được và đúng.
* Kiểm tra người dùng có thể tải xuống các file đã tải lên.
* Kiểm tra chức năng email của hệ thống.
* Kiểm tra các tập lệnh Java sẽ hoạt động tốt ở các trình duyệt khác nhau (IE, Firefox, Chrome, safari và Opera).
* Kiểm tra để xem có điều gì xảy ra nếu người dùng xóa cookie ở trong trang web.
* Kiểm tra để xem có điều gì xảy ra nếu người dùng xóa cookie sau khi truy cập trang web.
* Kiểm tra tất cả dữ liệu bên trong combo / list box có được sắp xếp theo thứ tự thời gian.

## III. Compatibility Testing
### 1. Định nghĩa Compatibility Testing (kiểm thử tương thích)
* Là loại kiểm thử để xác định xem phần mềm có tương thích với các yếu tố khác của hệ thống  hay không, ví dụ: Trình duyệt, Hệ điều hành hoặc phần cứng.
### 2. Mục tiêu của Compatibility testing
* Mục đích của Compatibility testing là đánh giá xem phần mềm có hoạt động tốt hay không trong một trình duyệt, Hệ điều hành, phần cứng hoặc phần mềm cụ thể.
###  3. Ví dụ một số kịch bản test Compatibility testing
* Đảm bảo websize vẫn hoạt động, hiển thị đúng trên các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera).
* Phiên bản HTML đang  sử dụng có tương thích với các phiên bản trình duyệt phù hợp không?
* Hình ảnh hiển thị có chính xác trong các trình duyệt khác nhau không?
* Các phông chữ có thể sử dụng trong các trình duyệt khác nhau không?
* Mã javascript có thể sử dụng được trong các trình duyệt khác nhau không?
* Ảnh GIF có hoạt hình trên các trình duyệt khác nhau không?

(Còn tiếp...)

Link reference: https://www.guru99.com/complete-web-application-testing-checklist.html