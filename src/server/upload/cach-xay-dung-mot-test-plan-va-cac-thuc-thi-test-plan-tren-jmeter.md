Một kịch mô tổ một loạt các bước của Jmeter sẽ được thực thi khi chạy. Một kịch bản kiểm thử sẽ bao gồm một hoặc nhiều Thread Groups, logic điều kiển, bộ điều khiển tạo mẫu, trình nghe, bộ hẹn giờ, xác nhận và các thành phần cấu hình.

1.1. Thêm và xóa các phần tử 
       
 Thêm các yếu tố vào bản kế hoạch kiểm tra bằng một cú nhấp chuột phải vào các yếu tố trong cây và chọn một yếu tố mới từ danh sách thêm. Ngoài ra, các yếu tố có thể được tải từ tệp và thêm bằng cách chọn tùy chọn "hợp nhất" hoặc "mở".
 Để xóa phần tử, đảm bảo phần tử được chọn, nhấp chuột phải vào phần tử và chọn tùy chọn "xóa". Để xóa phần tử, đảm bảo phần tử được chọn, nhấp chuột phải vào phần tử và chọn tùy chọn "xóa".
 
 1.2.  Các yếu tố tải và lưu
 
 Để tải một phần tử từ tệp, nhấp chuột phải vào các phần tử cây hiện có mà bạn muốn thêm phần tử được tải và chọn tùy chọn "hợp nhất". Chọn tập tin mà các yếu tố của bạn được lưu. JMeter sẽ hợp nhất các yếu tố vào cây.Để lưu các phần tử cây, nhấp chuột phải vào một phần tử và chọn tùy chọn "Lưu lựa chọn dưới dạng". JMeter sẽ lưu phần tử được chọn, cộng với tất cả các phần tử con bên dưới nó. Bằng cách này, bạn có thể lưu các đoạn cây thử nghiệm và các yếu tố riêng lẻ để sử dụng sau.
 
 1.3. Cấu hình các yếu tố cây
 
 Bất kỳ yếu tố nào trong cây thử nghiệm sẽ đưa ra các điều khiển trong khung bên phải của JMeter. Các điều khiển này cho phép bạn định cấu hình hành vi của phần tử kiểm tra cụ thể đó. Những gì có thể được cấu hình cho một phần tử phụ thuộc vào loại phần tử đó.
 
 Bản thân Cây thử nghiệm có thể được thao tác bằng cách kéo và thả các thành phần xung quanh cây thử nghiệm.
 
 1.4. Lưu kế hoạch kiểm thử
 
 Mặc dù không bắt buộc, chúng tôi khuyên bạn nên lưu Kế hoạch kiểm tra vào một tệp trước khi chạy. Để lưu Kế hoạch kiểm tra, chọn "Lưu" hoặc "Lưu kế hoạch kiểm tra dưới dạng" từ menu Tệp (với bản phát hành mới nhất, trước tiên không còn cần phải chọn phần tử Kế hoạch kiểm tra).
 
 JMeter cho phép bạn lưu toàn bộ cây Test Plan hoặc chỉ một phần của nó. Để chỉ lưu các phần tử nằm trong một "nhánh" cụ thể của cây Kế hoạch kiểm tra, hãy chọn phần tử Kế hoạch kiểm tra trong cây để bắt đầu "nhánh", sau đó nhấp vào nút chuột phải của bạn để truy cập vào "Lưu lựa chọn dưới dạng "Mục menu. Hoặc, chọn phần tử Kế hoạch kiểm tra thích hợp và sau đó chọn "Lưu lựa chọn dưới dạng" từ menu Chỉnh sửa.
 
 1.5. Chạy một kế hoạch kiểm tra
 
 Để chạy gói thử nghiệm của bạn, chọn "Bắt đầu" (Control + r) từ mục menu "Chạy". Khi JMeter đang chạy, nó hiển thị một hộp nhỏ màu xanh lá cây ở phía bên tay phải của phần ngay dưới thanh menu. Bạn cũng có thể kiểm tra menu "Chạy". Nếu "Bắt đầu" bị vô hiệu hóa và "Dừng" được bật, thì JMeter đang chạy kế hoạch kiểm tra của bạn (hoặc, ít nhất, nó nghĩ là như vậy).

Các số ở bên trái của hộp màu xanh lá cây là số lượng chủ đề đang hoạt động / tổng số chủ đề. Những điều này chỉ áp dụng cho một bài kiểm tra chạy cục bộ; chúng không bao gồm bất kỳ luồng nào được khởi động trên các hệ thống từ xa khi sử dụng chế độ máy khách-máy chủ.

Sử dụng chế độ GUI như được mô tả ở đây chỉ nên được sử dụng khi gỡ lỗi Kế hoạch kiểm tra của bạn. Để chạy thử tải thực, sử dụng chế độ CLI.

1.6.  Dừng test 

Có hai loại lệnh dừng có sẵn trong menu:

Dừng (Control +.) - Dừng các luồng ngay lập tức nếu có thể. Nhiều bộ lấy mẫu bị gián đoạn có nghĩa là các mẫu hoạt động có thể được chấm dứt sớm. Lệnh dừng sẽ kiểm tra xem tất cả các luồng đã dừng trong thời gian chờ mặc định, là 5000 ms = 5 giây. Nếu các chủ đề chưa dừng lại, thì một thông báo sẽ được hiển thị. Lệnh Dừng có thể được thử lại, nhưng nếu thất bại, thì cần phải thoát JMeter để dọn dẹp.

Tắt máy (Control +,) - yêu cầu các luồng dừng ở cuối bất kỳ công việc hiện tại nào. Sẽ không làm gián đoạn bất kỳ mẫu hoạt động. Hộp thoại tắt chế độ sẽ vẫn hoạt động cho đến khi tất cả các luồng đã dừng

Nếu tắt máy mất quá nhiều thời gian. Đóng hộp thoại Tắt máy và chọn Chạy / Dừng hoặc chỉ cần nhấn Control + ..

Khi chạy JMeter ở chế độ CLI, không có Menu và JMeter không phản ứng với các tổ hợp phím như Control + .. Vì vậy, chế độ JMeter CLI sẽ lắng nghe các lệnh trên một cổng cụ thể (mặc định 4445, xem thuộc tính JMeter jmeterengine.nongui.port ). JMeter hỗ trợ tự động lựa chọn một cổng thay thế nếu cổng mặc định đang được sử dụng (ví dụ bởi một đối tượng JMeter khác). Trong trường hợp này, JMeter sẽ thử cổng cao hơn tiếp theo, tiếp tục cho đến khi đạt đến thuộc tính JMeter jmeterengine.nongui.maxport) mặc định là 4455. Nếu maxport nhỏ hơn hoặc bằng cổng, quá trình quét cổng sẽ không diễn ra.

Cổng đã chọn được hiển thị trong cửa sổ giao diện điều khiển.

Các lệnh hiện được hỗ trợ là:

Shutdown - tắt máy duyên dáng
StopTestNow - tắt máy ngay lập tức

Các lệnh này có thể được gửi bằng cách sử dụng tập lệnh shutdown [.cmd | .sh] hoặc stoptest [.cmd | .sh]. Các kịch bản sẽ được tìm thấy trong thư mục bin JMeter. Các lệnh sẽ chỉ được chấp nhận nếu tập lệnh được chạy từ cùng một máy chủ.

1.7. Thông báo lỗi

JMeter báo cáo các cảnh báo và lỗi cho tệp jmeter.log, cũng như một số thông tin về bản thử nghiệm tự chạy. JMeter hiển thị số lượng cảnh báo / lỗi được tìm thấy trong tệp jmeter.log bên cạnh biểu tượng cảnh báo (hình tam giác) ở phía bên tay phải của cửa sổ. Nhấp vào biểu tượng cảnh báo để hiển thị tệp jmeter.log ở dưới cùng của cửa sổ JMeter. Chỉ thỉnh thoảng có thể có một số lỗi mà JMeter không thể bẫy và đăng nhập; những thứ này sẽ xuất hiện trên bảng điều khiển lệnh. Nếu một kiểm tra không hoạt động như bạn mong đợi, vui lòng kiểm tra tệp nhật ký trong trường hợp có bất kỳ lỗi nào được báo cáo (ví dụ: có thể là lỗi cú pháp trong lệnh gọi hàm).

Lỗi lấy mẫu (ví dụ: HTTP 404 - không tìm thấy tệp) thường không được báo cáo trong tệp nhật ký. Thay vào đó, chúng được lưu trữ dưới dạng các thuộc tính của kết quả mẫu. Có thể thấy trạng thái của một kết quả mẫu trong các Trình nghe khác nhau.

(nguồn :https://jmeter.apache.org/usermanual/build-test-plan.html)