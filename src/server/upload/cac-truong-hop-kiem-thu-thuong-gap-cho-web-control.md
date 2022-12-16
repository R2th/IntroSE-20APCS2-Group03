**Kiểm thử phần mềm là gì?**

Kiểm thử phần mềm là một cơ chế để kiểm tra ứng dụng phần mềm đã phát triển nhằm mục đích tìm ra lỗi trong ứng dụng. Nó là để kiểm tra tính đúng đắn và đầy đủ của phần mềm. Nó có thể là sự sai lệch giữa yêu cầu và ứng dụng thực tế như đầu ra.

Đã đề cập đến một số trường phổ biến mà người thử nghiệm thường gặp trong khi thử nghiệm ứng dụng web. Vì vậy, nếu đây là các trường phổ biến, chúng tôi có thể có danh sách kiểm tra trong khi thử nghiệm giống nhau, vì vậy nó sẽ giảm khả năng bỏ sót bất kỳ lỗi nào liên quan đến các phần này.
Vì vậy, đó là một thử nghiệm nhỏ để có một danh sách sẽ giúp người kiểm tra phần mềm trong khi kiểm tra bất kỳ ứng dụng web nào

**Dưới đây là các trường hợp kiểm thử cho web control:**

**Kiểm thử cho Liên kết**

Có hai loại liên kết có thể có trên trang web là liên kết nội bộ và liên kết ngoài, đây là một số kịch bản thử nghiệm để kiểm tra liên kết trên trang web

1. Liên kết phải có sẵn và có ý nghĩa.
1. Kiểm tra xem tất cả các liên kết bên ngoài có đang mở trong cửa sổ mới với URL thích hợp hay không
1. Kiểm tra tất cả các liên kết nội bộ đang điều hướng trong ứng dụng theo yêu cầu
1. Kiểm tra các liên kết nhảy trên các trang giống nhau
1. Kiểm tra xem liên kết địa chỉ email có mở phiên bản thư như outlook hay không
1. Kiểm tra để kiểm tra xem có bất kỳ trang trống nào để liên kết không
1. Kiểm tra các liên kết mở trong tab / cửa sổ khác theo yêu cầu
1. Kiểm tra khả năng tương thích cho tất cả các liên kết trên các trình duyệt khác
1. Đảm bảo rằng màu sắc của các liên kết thay đổi sau khi trang được truy cập một lần. (Điều này có thể thay đổi tùy theo thiết kế).
1. Đảm bảo rằng màu liên kết theo đặc điểm kỹ thuật.
1. Đảm bảo rằng biểu tượng bàn tay được hiển thị khi con trỏ chuột được di chuột qua liên kết.
1. Kiểm tra thời gian tải cho các liên kết nội bộ theo yêu cầu
1. Kiểm tra xem liên kết được chia sẻ có được chia sẻ đúng với địa chỉ chính xác hay không
1. Kiểm tra xem liên kết được chia sẻ có được mở đúng cách hay không

**Kiểm thử cho Biểu mẫu**

Có nhiều loại biểu mẫu khác nhau mà người ta có thể tìm thấy trên các trang web, nhưng các trường tương đối giống nhau, theo đó sau đây là các tình huống để kiểm tra biểu mẫu

1. Kiểm tra vị trí biểu mẫu trên trang web
1. Kiểm tra xem tất cả các điều khiển có sẵn trên biểu mẫu theo yêu cầu hay không
1. Kiểm tra sự căn chỉnh của các điều khiển web trong biểu mẫu
1. Kiểm tra tất cả các nhãn của biểu mẫu
1. Dấu hoa thị được hiển thị gần các trường bắt buộc
1. Kiểm tra hoạt động của biểu mẫu bằng cách không điền bất kỳ dữ liệu nào vào biểu mẫu.
1. Kiểm tra tiêu đề của biểu mẫu
1. Kiểm tra trường số điện thoại với dữ liệu chữ cái và các định dạng không hợp lệ
1. Kiểm tra trường email có định dạng email không hợp lệ
1. Kiểm tra trường Captcha bằng nút đặt lại
1. Lưu và hủy các nút trong biểu mẫu
1. Kiểm tra hoạt động của biểu mẫu bằng cách thêm dữ liệu ngẫu nhiên vào trường văn bản.
1. Thông báo xác thực trên trường bắt buộc hoặc các giá trị không chính xác
1. Kiểm tra xem điều hướng giữa các trường có thành công hay không bằng cách sử dụng tab
1. Không được phép nhấp nhiều lần vào quá trình gửi trong khi đang tiến hành đăng ký.
1. Nút gửi có thể bị tắt trước khi nhập các trường bắt buộc trong biểu mẫu.

**Kiểm thử cho  Tìm kiếm**

Hộp tìm kiếm là trường phổ biến và thiết yếu nhất của bất kỳ trang web nào, đây là một số tình huống có thể giúp kiểm tra trường hộp tìm kiếm.

1. Không cần nhập bất cứ điều gì, nhấp vào nút Tìm kiếm.
1. Đánh dấu chéo hoặc tùy chọn hủy bỏ để xóa từ khóa tìm kiếm
1. Nhấp vào trường tìm kiếm và nhấn phím Enter.
1. Nhập một ký tự bất kỳ và nhấp vào nút Tìm kiếm / nhấn phím Enter.
1. Chỉ nhập các ký tự đặc biệt và nhấp vào nút Tìm kiếm.
1. Chỉ nhập số và nhấp vào nút Tìm kiếm
1. Nhập các ký tự chữ và số và nhấp vào nút Tìm kiếm
1. Nhập ký tự chữ và số và ký tự đặc biệt và nhấp vào nút tìm kiếm.
1. Nhập chuỗi nhiều hơn giới hạn ký tự tối đa của trường.
1. Nhập chuỗi có dấu cách (trước chuỗi, sau chuỗi và ở giữa) và xác minh kết quả.
1. Xác minh điều này trên tất cả các trang có Hộp tìm kiếm
1. Cố gắng kéo và thả hình ảnh hoặc tệp khác vào hộp tìm kiếm và kiểm tra kết quả
1. Kiểm tra xem tìm kiếm có được áp dụng trên water mark được cập nhật trong hộp tìm kiếm không
1. Kiểm tra xem đề xuất tự động có hoạt động hay không

**Kiểm thử  cho Email**

Email là một phần quan trọng của trang web vì nó kết nối người dùng và chủ sở hữu, đây là một số điểm cần kiểm tra khi thử nghiệm chức năng email

1. Kiểm tra từ id nào nó sẽ bị kích hoạt
1. Kiểm tra xem nó sẽ được nhận bởi ai
1. Kiểm tra dòng chủ đề của một email
1. Kiểm tra nội dung của một email
1. Kiểm tra xem có bất kỳ liên kết nào Hiện diện trong Email không nếu có nơi nó đang chuyển hướng.
1. Kiểm tra nhấp chuột lặp lại trên cùng một liên kết dẫn đến kết quả?
1. Kiểm tra chính tả trên tất cả các email
1. Kiểm tra Nếu thư là "Không trả lời" Loại điều gì xảy ra ngay cả khi đã trả lời
1. Kiểm tra xem thư không thuộc loại “Không trả lời” điều gì sẽ xảy ra Khi trả lời
1. Kiểm tra các ký tự đặc biệt trong mẫu nội dung email phải được xử lý đúng cách.
1. Kiểm tra nội dung của email
1. Kiểm tra email trong các dịch vụ email khác nhau như outlook, Gmail, Hotmail, yahoo, v.v.
1. Kiểm tra chức năng gửi email bằng các trường TO, CC và BCC
1. Kiểm tra xác thực trong khi gửi nội dung thư trống
1. Kiểm tra xác thực khi phần người gửi hoặc người nhận trống
1. Kiểm tra việc gửi số lượng lớn email.
1. Kiểm tra các ngôn ngữ khác nhau được xử lý đúng cách trong nội dung
1. Kiểm tra xem email có đi vào thư mục spam hay không

**Kiểm thử để tải lên hình ảnh / tệp**

 Nó rất thuận tiện cho người dùng tải lên tập tin hoặc hình ảnh hơn là viết đoạn văn dài nên nó phải thân thiện với người dùng và được hướng dẫn đúng cách.

1. Kiểm tra đường dẫn hình ảnh đã tải lên
1. Kiểm tra tải lên hình ảnh và thay đổi chức năng
1. Kiểm tra chức năng tải lên hình ảnh với các tệp hình ảnh có các phần mở rộng khác nhau (ví dụ: JPEG, PNG, BMP, v.v.)
1. Kiểm tra chức năng tải lên hình ảnh với hình ảnh có khoảng trống hoặc bất kỳ ký tự đặc biệt nào được phép khác trong tên tệp
1. Kiểm tra tải lên hình ảnh tên trùng lặp
1. Kiểm tra tải lên hình ảnh với kích thước hình ảnh lớn hơn kích thước tối đa cho phép. Thông báo lỗi thích hợp sẽ được hiển thị.
1. Kiểm tra chức năng tải lên hình ảnh với các loại tệp khác với hình ảnh (ví dụ: txt, doc, pdf, exe, v.v.). Kiểm tra xác thực định dạng không hợp lệ
1. h. Kiểm tra xem hình ảnh có chiều cao và chiều rộng được chỉ định (nếu được xác định) có được chấp nhận hay không nếu không sẽ bị từ chối
1. Kiểm tra thanh tiến trình sẽ xuất hiện cho hình ảnh kích thước lớn
1. Kiểm tra xem chức năng của nút hủy có đang hoạt động giữa quá trình tải lên hay không
1. Kiểm tra xem hộp thoại chọn tệp chỉ hiển thị các tệp được hỗ trợ được liệt kê hay không
1. Kiểm tra chức năng tải lên nhiều hình ảnh
1. Kiểm tra chất lượng hình ảnh sau khi tải lên. Chất lượng hình ảnh không được thay đổi sau khi tải lên
1. Kiểm tra xem người dùng có thể sử dụng / xem các hình ảnh đã tải lên hay không

**Kiểm thử cho bộ lọc thả xuống**

Để tránh đầu vào sai từ trình đơn người dùng thả xuống là lựa chọn tốt nhất hoặc tìm nạp dữ liệu chính xác từ nhiều tùy chọn có sẵn trên trang web. Dưới đây là một số tình huống trong khi thử nghiệm

1. Kiểm tra giá trị đã chọn mặc định trong menu thả xuống
1. Kiểm tra hiển thị độ dài ký tự tối đa trong menu thả xuống
1. Kiểm tra tối đa không. giá trị hiển thị trong menu thả xuống mà không có thanh cuộn
1. Kiểm tra thả xuống sẽ được mở bằng cách nhấp vào cả hai hộp và mũi tên thả xuống
1. Kiểm tra sau khi trình đơn thả xuống được chọn, bạn sẽ có thể chọn giá trị bằng các phím mũi tên trên bàn phím hoặc cuộn chuột ngay cả khi trình đơn thả xuống bị đóng.
1. Kiểm tra sau khi chọn menu thả xuống, nếu bạn nhấn bất kỳ phím bảng chữ cái nào, giá trị tương ứng sẽ được chọn tự động.
1. Kiểm tra xem người dùng không thể chỉnh sửa giá trị thả xuống
1. Kiểm tra xem các giá trị thả xuống có được sắp xếp theo thứ tự bảng chữ cái hay không

**Kiểm thử cho trường Ngày / Kiểm soát lịch**

Trường ngày là trường thường được sử dụng trong hầu hết các trang web để kiểm tra trường này, một số điểm được gợi ý bên dưới

1. Kiểm tra bằng cách nhập ngày không hợp lệ và tháng hợp lệ và năm hợp lệ
1. Kiểm tra bằng cách nhập ngày hợp lệ và tháng hợp lệ và năm không hợp lệ
1. Kiểm tra bằng cách nhập ngày hợp lệ và tháng không hợp lệ và năm hợp lệ
1. Kiểm tra bằng cách nhập ngày hợp lệ và tháng không hợp lệ và năm không hợp lệ
1. Kiểm tra bằng cách nhập ngày không hợp lệ và tháng không hợp lệ và năm không hợp lệ
1. Kiểm tra bằng cách nhập ngày không hợp lệ và tháng hợp lệ và năm không hợp lệ
1. Kiểm tra bằng cách nhập khoảng trống không hợp lệ và tháng hợp lệ không hợp lệ
1. Blank space
1. Kiểm tra bằng cách nhập khoảng trống cho ngày và khoảng trống cho tháng và
1. Blank space for year
1. Kiểm tra xem năm đã nhập là năm nhuận hay năm thường.
1. Kiểm tra cho năm bình thường, giới hạn số tối đa trong trường ngày trong tháng phải là 31.
1. Kiểm tra năm nhuận, giới hạn số lượng tối đa trong trường ngày trong tháng tháng 2 phải là 29.
1. Kiểm tra các tháng thay thế cho ngày trong trường ngày, tức là 30/31 sẽ được chấp nhận.
1. Kiểm tra bằng cách nhập ngày bên dưới / ngoài phạm vi, tức là 32 hoặc 0, v.v.
1. Kiểm tra bằng cách nhập tháng bên dưới / ngoài phạm vi, tức là 13 hoặc 0…
1. Kiểm tra bằng cách nhập số 0 trước số có một chữ số trong ngày / tháng.
1. Kiểm tra xem lịch được điền tự động được gửi có đang mở khi nhấp vào hộp hoặc trên biểu tượng lịch hay không
1. Kiểm tra xem chúng ta có thể chọn ngày mong muốn trên lịch hay không.
1. Kiểm tra sau khi chúng tôi nhấp vào ngày đã chọn sẽ xuất hiện trong hộp và lịch
1. Kiểm tra xem trường lịch có thể chỉnh sửa được không ngay cả khi người dùng có thể chọn ngày cho

**Kiểm thử cho Messages và Pop-up**

Messages là hướng dẫn hoặc cảnh báo cho người dùng vì vậy nó là rất cần thiết tại mọi thời điểm thông báo phải được đưa ra cho người dùng

1. Kiểm tra thông báo cho từng trường của ứng dụng web
1. Kiểm tra Messages thông tin sẽ hiển thị biểu tượng chuẩn, nội dung Messages, nút chéo và ok
1. Kiểm tra tất cả các Messages để biết chính tả và ngữ pháp
1. Messages xác nhận
1. Pop up Messages
1. Messages as per Browser
1. Error Messages
1. Cảnh báo / Thông báo lỗi sẽ được hiển thị bằng màu đỏ
1. Kiểm tra tất cả các thông báo cảnh báo sẽ hiển thị dấu chấm hỏi
1. Thông báo xác nhận Chức năng thành công sẽ được hiển thị bằng màu Xanh lục
1. Xác nhận trước khi xóa chức năng
1. Phông chữ, Căn chỉnh, Kích thước và màu sắc của Tin nhắn
1. Đặt & Khoảng cách Tin nhắn
1. Định dạng  message
1. Trong khi pop-up hoặc một cửa sổ con mở ra cho thông báo, các khu vực khác sẽ không thể chỉnh sửa được.
1. Thời gian phải sao cho người dùng có thể đọc được message
1. Messages phải liên quan đến trang quan tâm chỉ nó sẽ biến mất sau khi trên trang mới**


**Tài liệu tham khảo**

https://www.qaacharya.in/2020/03/test-cases-for-dialog-box-popup-window.html
https://www.microfocus.com/documentation/silk-test/205/en/silktestclassic-help-en/STCLASSIC-776DB3A3-EXAMPLE-TESTCASES-FOR-THE-FIND-DIALOG.html
https://mundrisoft.com/tech-bytes/test-case-for-buttonpasswordformslinks/