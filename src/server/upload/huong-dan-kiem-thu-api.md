**Trước khi đến với kiểm thử API, trước tiên hãy hiểu**

### API là gì?
API là từ viết tắt của Giao diện lập trình ứng dụng.Một hệ thống phần mềm triển khai API chứa các hàm / các thường trình con có thể được thực thi bởi một hệ thống phần mềm khác.

### Kiểm thử API là gì?
Kiểm tra API hoàn toàn khác với Kiểm tra GUI và tập trung vào lớp logic nghiệp vụ của kiến trúc phần mềm.Thử nghiệm này sẽ không tập trung vào giao diện của ứng dụng.
Thay vì sử dụng đầu vào và đầu ra tiêu chuẩn của người dùng (bàn phím), trong thử nghiệm API, bạn sử dụng phần mềm để gửi các cuộc gọi đến API, nhận đầu ra và ghi lại phản hồi của hệ thống.
Kiểm tra API yêu cầu ứng dụng tương tác với API. Để kiểm thử API, chúng ta cần phải:
* Sử dụng Công cụ kiểm thử để điều khiển API
* Viết mã của riêng bạn để kiểm tra API
Trong hướng dẫn này, chúng ta sẽ học : 
* Thiết lập môi trường kiểm tra API
* Các loại đầu ra của API
* Các trường hợp kiểm tra để kiểm tra API
* Phương pháp kiểm tra API
* Sự khác biệt giữa thử nghiệm API và thử nghiệm đơn vị
* Kiểm tra những gì trong thử nghiệm API
* Thực tiễn tốt nhất về kiểm tra API
* Các loại lỗi mà Kiểm tra API phát hiện
* Công cụ kiểm tra API
* Những thách thức của kiểm tra API

**Thiết lập môi trường kiểm thử API**
* Kiểm tra API khác với các loại kiểm thử phần mềm khác vì GUI không khả dụng và bạn được yêu cầu thiết lập môi trường ban đầu để gọi API với một bộ tham số bắt buộc và cuối cùng sẽ kiểm tra kết quả kiểm tra.
* Do đó, Thiết lập môi trường thử nghiệm để kiểm tra API có vẻ hơi phức tạp.
* Cơ sở dữ liệu và máy chủ nên được cấu hình theo yêu cầu ứng dụng.
* Sau khi cài đặt xong, Hàm API sẽ được gọi để kiểm tra xem API đó có hoạt động không.

**Các loại đầu ra của API**
Một đầu ra của API có thể là :
* Bất kỳ loại dữ liệu
* Trạng thái (nói Pass hoặc Fail)
* Gọi một hàm API khác.

**Mọi loại dữ liệu**

Ví dụ: Có một hàm API sẽ thêm hai số nguyên.

`Long add(int a, int b)`

Đầu ra phải là tổng của hai số nguyên. Đầu ra này cần được xác minh với kết quả mong đợi.

Gọi điện thoại cần phải được thực hiện như

`add(1234, 5656)`

Các ngoại lệ phải được xử lý nếu số lượng vượt quá giới hạn số nguyên.

**Status ( say Pass or Fail) **
Hãy xem xét chức năng bên dưới 

* Lock()
* Unlock()
* Delete()

Trả lại bất kỳ giá trị nào như True (trong trường hợp thành công) hoặc false (Trong trường hợp có lỗi) làm đầu ra.

Một Test Case chính xác hơn sẽ có thể gọi các hàm trong bất kỳ tập lệnh nào và sau đó kiểm tra các thay đổi trong cơ sở dữ liệu hoặc GUI ứng dụng.

**Gọi một API/ Hoặc 1 sự kiện khác**

Trong trường hợp này, chúng tôi gọi một trong các hàm API, lần lượt sẽ gọi một hàm khác.

Ví dụ: Hàm API đầu tiên có thể được sử dụng để xóa một bản ghi đã chỉ định trong bảng và lần lượt, hàm này gọi một hàm khác để REFRESH cơ sở dữ liệu.

**Các trường hợp kiểm tra để kiểm tra API**:

Các trường hợp thử nghiệm kiểm tra API dựa trên

*Giá trị trả về dựa trên điều kiện đầu vào*: tương đối dễ kiểm tra, vì đầu vào có thể được xác định và kết quả có thể được xác thực
*Không trả về bất cứ điều gì*: Khi không có giá trị trả về, một hành vi API trên hệ thống sẽ được kiểm tra
*Kích hoạt một số API / sự kiện / ngắt khác*: Nếu đầu ra của API kích hoạt một số sự kiện hoặc gián đoạn, thì những sự kiện và trình lắng nghe bị gián đoạn đó sẽ được theo dõi
*Cập nhật cấu trúc dữ liệu*: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc ảnh hưởng đến hệ thống và điều đó cần được xác thực
*Sửa đổi một số tài nguyên*: Nếu lệnh gọi API sửa đổi một số tài nguyên thì nó phải được xác thực bằng cách truy cập vào tổng tài nguyên

**Phương pháp kiểm thử API**:

Các điểm sau giúp người dùng thực hiện phương pháp Kiểm tra API:
Hiểu chức năng của chương trình API và xác định rõ phạm vi của chương trình
Áp dụng các kỹ thuật kiểm tra như các lớp tương đương, phân tích giá trị biên và đoán lỗi và viết các trường hợp kiểm thử cho API
Các tham số đầu vào cho API cần được lên kế hoạch và xác định một cách thích hợp
Thực hiện các trường hợp thử nghiệm và so sánh dự kiến và thực tế.

### Cách kiểm tra API
Kiểm tra API phải bao gồm ngoài quy trình SDLC thông thường

* *Kiểm tra khám phá*: Nhóm thử nghiệm nên thực hiện thủ công bộ lệnh gọi được ghi trong API như xác minh rằng một tài nguyên cụ thể được API hiển thị có thể được liệt kê, tạo và xóa
* *Kiểm tra khả năng sử dụng*: Kiểm tra xác minh xem API này có hoạt động và thân thiện với người dùng hay không và API cũng tích hợp tốt với nền tảng khác
* *Kiểm tra bảo mật*: Thử nghiệm này bao gồm loại xác thực được yêu cầu và nơi dữ liệu nhạy cảm được mã hóa qua HTTP hoặc cả hai
* *Kiểm tra tự động*: Kiểm tra API sẽ đạt đến đỉnh điểm trong việc tạo ra một tập lệnh hoặc công cụ có thể được sử dụng để thực thi API thường xuyên
* *Tài liệu*: Nhóm thử nghiệm phải ghi lại tài liệu nào là đầy đủ và cung cấp đủ thông tin để tương tác với API. Tài liệu phải là một phần của bản phân phối cuối cùng.

### Thực tiễn tốt nhất về kiểm tra API:

* Các trường hợp thử nghiệm nên được nhóm theo thể loại thử nghiệm
* Trên đầu mỗi bài kiểm tra, bạn nên bao gồm các khai báo về các API được gọi.
* Lựa chọn tham số nên được đề cập rõ ràng trong chính trường hợp thử nghiệm
* Ưu tiên các lệnh gọi hàm API để người kiểm tra dễ dàng kiểm tra
* Mỗi trường hợp thử nghiệm phải độc lập và độc lập với các phụ thuộc càng tốt
* Tránh "kiểm tra chuỗi" trong sự phát triển của bạn
* Phải đặc biệt cẩn thận trong khi xử lý các chức năng gọi một lần như - Xóa, ĐóngWindow, v.v ...
* Trình tự cuộc gọi nên được thực hiện và lập kế hoạch tốt
* Để đảm bảo phạm vi kiểm tra hoàn chỉnh, hãy tạo các trường hợp kiểm tra cho tất cả các kết hợp đầu vào có thể có của API.

### Các loại lỗi mà API kiểm tra phát hiện

* Không thể xử lý các điều kiện lỗi một cách duyên dáng
* Cờ không sử dụng
* Thiếu hoặc trùng lặp chức năng
* Các vấn đề về độ tin cậy. Khó khăn trong việc kết nối và phản hồi từ API.
* Vấn đề bảo mật
* Vấn đề đa luồng
* Các vấn đề về hiệu suất. Thời gian phản hồi API rất cao.
* Lỗi / cảnh báo không đúng cho người gọi
* Xử lý sai các giá trị đối số hợp lệ
* Dữ liệu phản hồi không được cấu trúc chính xác (JSON hoặc XML).

### Công cụ kiểm tra API
Vì API và Kiểm tra đơn vị cả mã nguồn, các công cụ / khung có thể được sử dụng để tự động hóa.

* Runscope
* Người đưa thư với jetpacks
* Người đưa thư với Newman
* Làm xoăn
* Tiền tố
* Kiểm tra
* CTESK
* dotTEST
* Công cụ SDK của Eclipse - Kiểm tra API tự động

### Những thách thức của kiểm tra API

Những thách thức của việc làm sạch API bao gồm:

* Những thách thức chính trong kiểm tra API Web là Kết hợp tham số, Chọn tham số và Trình tự cuộc gọi
* Không có GUI để kiểm tra ứng dụng có thể khó đưa ra các giá trị đầu vào
* Xác nhận và xác minh đầu ra trong một hệ thống khác là điều khó khăn đối với người kiểm tra
* Lựa chọn tham số và phân loại là cần thiết để người kiểm tra biết
* Chức năng xử lý ngoại lệ cần được kiểm tra
* Kiến thức mã hóa là cần thiết cho người kiểm tra.

### Kết luận

*Đây là một thử nghiệm không thể thiếu trong công nghệ phần mềm. Nếu API không được kiểm tra đúng cách, nó có thể gây ra sự cố không chỉ cho ứng dụng API mà còn trong ứng dụng gọi điện.*

Dịch từ nguồn : https://www.guru99.com/api-testing.html?fbclid=IwAR1ls1ctzGkVYIO1_079YLp0gAPIoU9n4dXicQ3Hxlu1bSKBMJd1Qg_waiE