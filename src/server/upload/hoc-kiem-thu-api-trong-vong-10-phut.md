Trước khi đến với kiểm thử API, chúng ta sẽ cùng tìm hiểu:

# 1. API là gì ?

API là từ viết tắt của Giao diện lập trình ứng dụng (Application Programming Interface).

Nó cho phép giao tiếp và trao đổi dữ liệu giữa hai hệ thống phần mềm riêng biệt. Mỗi hệ thống phần mềm thực hiện một API chứa các hàm / các thường trình con có thể được thực thi bởi một hệ thống phần mềm khác.

# 2. Kiểm thử API là gì ?

![](https://images.viblo.asia/f0cea0d2-b93b-48d4-a964-3ebcde4ca406.png)

Kiểm thử API hoàn toàn khác với Kiểm thử GUI, phương pháp này tập trung chủ yếu vào lớp logic nghiệp vụ của kiến trúc phần mềm. Kiểm thử này sẽ không tập trung vào giao diện của ứng dụng.

Thay vì sử dụng đầu vào người dùng chuẩn (bàn phím) và đầu ra, trong kiểm thử Api, bạn sử dụng phần mềm để gửi các yêu cầu đến API, nhận đầu ra và ghi lại phản hồi của hệ thống.

Kiểm thử Api yêu cầu ứng dụng tương tác với API. Để kiểm thử API, bạn sẽ cần:

* Sử dụng công cụ kiểm thử để tiếp cận API
* Viết mã lệch được tạo ra bởi bạn để kiểm thử API

# 3. Thiết lập môi trường Kiểm thử API

Kiểm thử API khác với các loại kiểm thử khác vì thường GUI đang không khả dụng và bạn sẽ được thiết lập môi trường ban đầu gọi API với các tham số bắt buộc, sau đó kiểm tra kết quả đã thực hiện.

Do đó, việc thiết lập môi trường kiểm thử để kiểm thử API có vẻ hơi phức tạp một chút.

Cơ sở dữ liệu và máy chủ phải được cấu hình theo yêu cầu của ứng dụng.

Sau khi cài đặt xong, chức năng API sẽ được gọi để kiểm tra xem API đó có đang hoạt động hay không.

# 4. Các loại đầu ra của một API
# 
Đầu ra của API có thể là:

* Mọi loại dữ liệu
* Trạng thái (Pass hoặc Fail)
* Gọi tới một API khác.

Hãy xem xét một ví dụ về từng loại trên:

1. Bất kỳ loại dữ liệu nào

*Ví dụ: Có một hàm API cần thêm hai số nguyên*.

> Long add(int a, int b)


*Các số phải được đưa ra dưới dạng tham số đầu vào. Đầu ra phải là tổng của hai số nguyên. Đầu ra này cần được xác minh với kết quả mong đợi.*
*Việc gọi cần được thực hiện như sau: *

> add (1234, 5656)

*Các ngoại lệ phải được xử lý nếu số đó vượt quá giới hạn số nguyên.

2. Trạng thái (Pass hoặc Fail)

*Hãy xem xét hàm API bên dưới -*

* Lock()
* Unlock()
* Delete()

*Chúng trả về giá trị đầu ra bất kỳ như True (trong trường hợp thành công) hoặc false (Trong trường hợp lỗi).

*Một trường hợp kiểm tra chính xác hơn sẽ là, có thể gọi các hàm trong bất kỳ kịch bản nào và sau đó kiểm tra các thay đổi trong cơ sở dữ liệu hoặc GUI ứng dụng.*

3. Gọi API / Sự kiện khác

![](https://images.viblo.asia/b0f2c1c7-4e0a-43c1-82c2-8bc5c3a05625.png)

Trong trường hợp này, gọi một trong các chức năng API mà lần lượt sẽ gọi một chức năng khác.

Ví dụ - Chức năng API đầu tiên có thể được sử dụng để xóa một bản ghi được chỉ định trong bảng và chức năng này lần lượt gọi một hàm khác để REFRESH cơ sở dữ liệu.

# 5. Các trường hợp kiểm tra để kiểm tra API:
# 
**Các trường hợp kiểm tra thử nghiệm API dựa trên:**
* Giá trị trả về dựa trên điều kiện đầu vào: nó tương đối dễ kiểm tra, vì đầu vào có thể được xác định và kết quả có thể được xác thực
* Không trả lại bất cứ điều gì: Khi không có giá trị trả về, hoạt động của API trên hệ thống sẽ được kiểm tra
* Kích hoạt một số API / sự kiện / gián đoạn khác: Nếu đầu ra của API kích hoạt một số sự kiện hoặc gián đoạn, thì những sự kiện đó và trình lắng nghe gián đoạn phải được theo dõi
* Cập nhật cấu trúc dữ liệu: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc hiệu quả trên hệ thống và cần được xác thực
* Sửa đổi các tài nguyên nhất định: Nếu cuộc gọi API sửa đổi một số tài nguyên thì nó phải được xác thực bằng cách truy cập các tài nguyên tương ứng
**Phương pháp kiểm tra API:**
Các điểm sau giúp người dùng thực hiện phương pháp Kiểm tra API:
![](https://images.viblo.asia/ddb660bf-4d01-427c-8585-5b8a9ef3dfed.png)
* Hiểu được chức năng của chương trình API và xác định rõ phạm vi của chương trình
* Áp dụng các kỹ thuật thử nghiệm như các lớp tương đương, phân tích giá trị biên, đoán lỗi và viết testcase cho API
* Tham số đầu vào cho API cần được lên kế hoạch và xác định một cách thích hợp
* Thực hiện các testcase sau đó so sánh kết quả dự kiến với thực tế

# 6. Sự khác biệt giữa thử nghiệm API và kiểm thu Đơn vị
# 


| Kiểm thử đơn vị |  Kiểm thử API   |
| -------- | -------- |
| Lập trình viên thực hiện     | Người kiểm thử thực hiện nó    |
| Lập trình viên có thể truy cập mã nguồn     | Người kiểm thử không thể truy cập mã nguồn   |
| Cũng kiểm tra các giao diện liên quan     | Chỉ kiểm tra chức năng API đó    |
|Chỉ có chức năng cơ bản được kiểm tra | Tất cả các chức năng đều được kiểm tra|
|Chỉ giới hạn trong phạm vi | Bao quát rộng hơn phạm vi|
|Thường được thực hiện trước khi sản phẩm được kiểm thử | Thường được thực hiện sau khi build|

# 7.Những gì cần kiểm tra trong kiểm thử API
# 
Kiểm thử API nên bao gồm ít nhất các phương pháp kiểm thử sau quy trình SDLC thông thường

* **Kiểm thử khám phá**: Nhóm thử nghiệm nên tự thực thi tập hợp các cuộc gọi được ghi lại trong API như xác minh rằng một tài nguyên cụ thể được API hiển thị có thể được liệt kê, tạo và xóa khi thích hợp
* **Kiểm thử khả năng sử dụng**: kiểm thử này xác minh xem API có hoạt động hay không, thân thiện với người dùng hay không. API có tích hợp tốt với một nền tảng khác hay không
* **Kiểm thử bảo mật**: Kiểm thử này bao gồm :loại xác thực là bắt buộc, dữ liệu bảo mật đã được mã hóa qua HTTP chưa. 
* **Kiểm thử tự động**: Kiểm thử API sẽ lên đến đỉnh điểm trong việc tạo tập hợp các tập lệnh hoặc công cụ có thể được sử dụng để thực thi API thường xuyên
* **Tài liệu:** Nhóm kiểm thử phải đảm bảo rằng tài liệu đầy đủ và cung cấp đủ thông tin để tương tác với API. Tài liệu phải là một phần của công việc cuối cùng

# 8.Thực tiễn tốt nhất về kiểm thử API:
* Các trường hợp kiểm tra phải được nhóm theo danh mục kiểm thử
* Trên đầu mỗi phần kiểm thử, bạn nên bao gồm các khai báo của các API được gọi.
* Lựa chọn tham số phải được đề cập rõ ràng trong chính trường hợp kiểm thử
* Ưu tiên các lời gọi hàm API để các luồng kiểm tra dễ dàng kiểm thử.
* Mỗi trường hợp kiểm thử phải độc lập và độc lập với các phụ thuộc càng tốt
* Tránh "kiểm thử chuỗi" trong sự phát triển của bạn
* Cần chú ý đặc biệt trong khi xử lý các chức năng gọi một lần như - Xóa,CloseWindow, v.v ...
* Trình tự lời gọi nên được thực hiện và lên kế hoạch tốt
* Để đảm bảo phạm vi kiểm thử hoàn chỉnh, hãy tạo các trường hợp kiểm thử cho tất cả các kết hợp đầu vào có thể có của API.

# 9. Các loại lỗi mà kiểm thử API phát hiện
* Không xử lý các điều kiện lỗi một cách chuẩn.
* Cờ không sử dụng
* Thiếu hoặc trùng lặp chức năng
* Vấn đề độ tin cậy. Khó kết nối và nhận phản hồi từ API.
* Vấn đê bảo mật
* Sự cố đa luồng
* Vấn đề hiệu năng. Thời gian phản hồi API rất cao.
* Lỗi / cảnh báo không đúng cho lời gọi.
* Xử lý không hợp lệ các giá trị đối số hợp lệ
* Dữ liệu phản hồi không được cấu trúc đúng (JSON hoặc XML)

# 10. Công cụ để thử nghiệm API

Vì kiểm thử API và kiểm thử đơn vị có mục tiêu mã nguồn đích nên các công cụ tương tự có thể được sử dụng để kiểm tra cả hai.

* SOAPUI - Đây là một công cụ dễ sử dụng với khả năng kiểm tra API REST và SOAP rộng lớn - không yêu cầu trải nghiệm tập lệnh.
* Runscope
* Postman với jetpacks
* Postman với Newman
* Curl
* Cfix
* Check
* CTESK
* dotTEST
* Công cụ Eclipse SDK- Kiểm tra API tự động

Ngoài ra còn có các công cụ kiểm tra API hàng đầu ( mình sẽ đề cập đến vào bài viến tháng sau).

# 11. Những thách thức về kiểm tra API

Những thách thức về kiểm tra API bao gồm:

* Những thách thức chính trong kiểm thử API là kết hợp tham số, lựa chọn tham số và sắp xếp thứ tự các chuỗi được gọi đến.
* Không có giao diện ứng dụng để kiểm thử điều này gây khó khắn cho việc truyền dữ liệu đầu vào.
* Xác nhận và xác minh đầu ra trong các hệ thống khác nhau có chút khó khăn cho người kiểm thử.
* Việc lựa chọn tham số và phân loại là yêu cầu bắt buộc người kiểm thử phải biết.
* Chức năng xử lý ngoại lệ cũng cần được kiểm thử.
* Kiến thức mã hóa là cần thiết cho người kiểm thử.

# 12. Phần kết luận

API bao gồm một tập hợp các lớp / hàm / thủ tục đại diện cho lớp logic nghiệp vụ. Nếu API không được kiểm tra đúng cách, nó có thể gây ra sự cố không chỉ với ứng dụng API mà còn cả trong ứng dụng đang được gọi đến.

# Tài liệu tham khảo

https://www.guru99.com/api-testing.html