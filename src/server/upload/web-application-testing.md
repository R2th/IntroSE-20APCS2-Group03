## 1.Giới thiệu

Ứng dụng web là một ứng dụng được người dùng truy cập qua mạng như Internet hoặc mạng nội bộ.

Kiểm tra ứng dụng web là kiểm tra trang web của bạn để tìm các lỗi tiềm ẩn trước khi nó được phát hành trực tiếp hoặc trước khi mã được chuyển vào môi trường sản xuất.
![](https://images.viblo.asia/52ec548c-797e-446d-9e19-0422c6a62417.png)
## 2. Kỹ thuật kiểm tra ứng dụng web

Có các loại kiểm thử dưới đây có thể được sử dụng trong kiểm thử ứng dụng web:

 **Kiểm tra giao diện người dùng:**
- xác minh sự tương tác của người dùng với phần mềm. Mục tiêu của kiểm tra giao diện người dùng là đảm bảo rằng giao diện người dùng cung cấp cho người dùng quyền truy cập và điều hướng thích hợp với mục tiêu kiểm tra thông qua các chức năng. Ngoài ra, kiểm tra giao diện người dùng đảm bảo rằng các đối tượng trong chức năng UI được như mong đợi và tuân thủ các tiêu chuẩn của công ty hoặc ngành sản xuất.

 **Khả năng tương thích trình duyệt:**
- kiểm tra ứng dụng web trên các trình duyệt khác nhau như Internet explorer, Firefox, Safari, trình duyệt Opera với các phiên bản khác nhau
![](https://images.viblo.asia/ad863021-7c61-48e8-8c09-e73d0deea723.jpg)
**Kiểm tra chức năng:**
- Điều này được sử dụng để kiểm tra sản phẩm của bạn theo thông số kỹ thuật bạn dự định cho sản phẩm cũng như các yêu cầu chức năng mà bạn đã vạch ra cho tài liệu phát triển của mình. Mục tiêu của các thử nghiệm này là để xác minh việc chấp nhận, xử lý và truy xuất dữ liệu phù hợp và thực hiện đúng các quy tắc kinh doanh. Người kiểm tra có thể kiểm tra hệ thống bằng tay hoặc tự động (sử dụng công cụ kiểm tra tự động hóa). 

**Kiểm tra theo chu kỳ kinh doanh:**

- mô phỏng các hoạt động được thực hiện trên hệ thống theo thời gian. Với một khoảng thời gian được xác định, chẳng hạn như một năm, và các giao dịch và hoạt động sẽ xảy ra trong khoảng thời gian một năm nên được thực hiện. Điều này bao gồm tất cả các chu kỳ hàng ngày, hàng tuần và hàng tháng và các sự kiện quan trọng trong ngày tháng đó.

**Chuyển đổi dữ liệu:**

- đảm bảo dữ liệu cũ, được di chuyển sang hệ thống mới, hoạt động như dữ liệu mới được nhập.

**Kiểm soát truy cập (vai trò và quyền):** 
- đảm bảo rằng, dựa trên mong muốn của doanh nghiệp, các tác nhân cụ thể sẽ bị hạn chế đối với các chức năng cụ thể hoặc trong trường hợp sử dụng cụ thể sẽ bị giới hạn khi truy cập dữ liệu có sẵn. Ví dụ: mọi người có thể được phép nhập dữ liệu và tạo tài khoản mới, nhưng chỉ người quản lý mới có thể xóa chúng

**Tích hợp với hệ thống khác(dịch vụ của bên thứ ba):**

- đảm bảo rằng việc tích hợp hệ thống hiện tại với bên thứ ba hoạt động.

**Kiểm thử hiệu năng:** 
- là kiểm tra chung được thực hiện để xác định cách thức hệ thống hoạt động theo mức độ đáp ứng và ổn định trong một khối lượng công việc cụ thể. Phải sử dụng công cụ kiểm tra để thực hiện kiểm tra hiệu suất. 

**Kiểm tra bảo mật:**

- đảm bảo rằng hệ thống và ứng dụng trong một tổ chức không có bất kỳ sơ hở nào có thể gây ra tổn thất lớn. Phải sử dụng công cụ kiểm tra để thực hiện kiểm tra bảo mật.



## 3	Thiết kế các testcase theo từng kỹ thuật

### 3.1 Kiểm tra giao diện người dùng

Dựa trên thiết kế màn hình / nguyên mẫu

![](https://images.viblo.asia/f45e6471-6c81-4be1-a570-18bdc58bf44e.jpg)
Các trường hợp thử nghiệm để kiểm tra giao diện người dùng cụ thể:

 + Giao diện: kích thước, vị trí, menu, căn chỉnh trường, giao diện (như thiết kế màn hình / nguyên mẫu), chính tả

 + Đối tượng: buttons, checkbox, text  box, list box, links, combo box: cần kiểm tra các thông tin sau:

        • Loại đối tượng / điều khiển

        • Có thể chỉnh sửa

        •	Bắt buộc

        •	Giá trị mặc định

        • Ẩn / Bỏ ẩn

        •	Liên kết bị hỏng


 + Phương thức truy cập: phím tab, chuyển động chuột, phím tăng tốc, mẹo công cụ

### 3.2 Tương thích trình duyệt

• Kiểm tra trang web trong các trình duyệt khác nhau (IE, Firefox, Chrome, Safari và Opera) và đảm bảo trang web hiển thị đúng.

• Kiểm tra phiên bản HTML đang được sử dụng có tương thích với các phiên bản trình duyệt phù hợp không.

• Kiểm tra hình ảnh hiển thị chính xác trong các trình duyệt khác nhau.

• Kiểm tra các phông chữ có thể sử dụng được trong các trình duyệt khác nhau.

• Kiểm tra mã script java có thể sử dụng được trong các trình duyệt khác nhau.

• Kiểm tra ảnh GIF trên các trình duyệt khác nhau
![](https://images.viblo.asia/4f343174-a65d-4fc5-b87c-fa09fae83dd3.png)
Thông thường để kiểm tra xem hệ thống có chạy tốt trong các trình duyệt khác nhau hay không, người kiểm tra phải thực hiện tất cả các trường hợp kiểm tra đã chuẩn bị cho một trình duyệt thực hiện tương tự cho các trình duyệt khác.
 
### 3.3 Kiểm tra chức năng

**3.3.1 Các trường hợp thử nghiệm cho một view/report**

• Xác minh điều kiện lọc cho chế độ view/report

• Xác minh dữ liệu trong chế độ view/report

• Xác minh nhóm và xác minh collapse/expand

• Xác minh sắp xếp

• Xác nhận phân trang

**3.3.2 Các trường hợp thử nghiệm cho một chức năng**

• Các trường hợp kiểm tra chức năng bao gồm:

o Các trường hợp thử nghiệm với dữ liệu hợp lệ / luồng chính

o Các trường hợp thử nghiệm cho các quy tắc kinh doanh được xác định trong tài liệu đặc tả / luồng thay thế

Sử dụng các kỹ thuật kiểm tra để thiết kế các trường hợp kiểm tra chức năng:

o Phân vùng tương đương

o Giá trị biên

o Bảng quyết định

o Chuyển đổi trạng thái

• Các trường hợp kiểm tra xác thực trường: 

xác thực cho loại dữ liệu khác nhau



|  Loại đối tượng | Thiết kế trường hợp thử nghiệm | 
| -------- | -------- | -------- |
| Combo box    | Xác minh danh sách giá trị của Combo box / trường Combo box    |
|    | Xác minh giá trị mặc định   |
|    |  Xác minh sắp xếp trong các trường  (thường theo thứ tự bảng chữ cái)  |
|    |  Xác minh chọn giá trị   |
|  Văn bản: Một dòng văn bản  |  Xác minh tính bắt buộc   |
|    | Xác nhận tự động cắt   |
|    | Xác minh mã hóa (nhập văn bản bằng thẻ html)   |
|    | Xác nhận độ dài tối đa   |
|    |  Xác minh phân biệt chữ hoa chữ thường (trường văn bản trong tìm kiếm)  |
|  Văn bản dạng nhiều dòng văn bản  |   Xác minh tính bắt buộc |
|    |  Xác minh hiển thị thanh cuộn dọc khi nhập nhiều dòng văn bản  |
|    |  Xác minh nhập nhiều dòng văn bản với văn bản định dạng (in đậm, in nghiêng, màu, liên kết, tệp đính kèm) vào các trường văn bản có định dạng  |
|    |Xác nhận văn bản được wrap text    |
|    |  Xác nhận bảng, liên kết, hình ảnh  |
|    |  Xác minh liên kết, tệp đính kèm  |
|  Các trường ngày tháng  |  Kiểm tra các trường bắt buộc  |
|    |  Kiểm tra chọn ngày  |
|    |   Kiểm tra định dạng ngày (ngày nhập, chuyển đổi ngày đã nhập) |
|    | So sánh ngày nhập với ngày hiện tại (nếu cần)   |
|    |  So sánh ngày dựa trên quy tắc kinh doanh  |
|    |   Hiển thị trường ngày khi thay đổi Cài đặt khu vực  |
| Trường dạng số   |  Kiểm tra tính bắt buộc   |
|    |  Kiểm tra giá trị tối đa / giá trị tối thiểu  |
|    | Kiểm tra số nguyên / số thập phân   |
|    | Kiểm tra số dương / âm   |
|    |Kiểm tra chuyển đổi định dạng (ký hiệu thập phân, ký hiệu nhóm chữ số, hiển thị số 0)    |
|Các trường dạng đính kèm|  Đính kèm với nhiều loại tệp khác nhau (.doc, .xls, .pdf, v.v.)  |
|    |   Tệp đính kèm với kích thước tệp> 50Mb |
|    | Hủy thêm tệp đính kèm (bằng cách nhấp vào nút [Hủy] trên trang trình duyệt)   |
|    |Xóa các tệp đính kèm    |
| Các trường email   | Kiểm tra tính bắt buộc   |
|    | Kiểm tra định dạng   |



•	Kiểm soát truy cập

### 3.4 Chuyển đổi dữ liệu
![](https://images.viblo.asia/723c15e7-c2af-40c5-b16d-a38503b997ac.jpg)
o Xác nhận số tài liệu / hồ sơ

o Xác minh ánh xạ dữ liệu

o Xác minh các chức năng hệ thống trong hệ thống dữ liệu di chuyển

- Xem chi tiết của một tài liệu / hồ sơ

- Chỉnh sửa tài liệu hiện có

- Xóa một tài liệu hiện có

- Tìm kiếm

- Quy trình làm việc

- Lượt xem / Báo cáo


### 3.5 Kiểm soát truy cập (Vai trò và quyền)

Chính sách kiểm soát truy cập được chỉ định bằng cách ánh xạ quyền vào các vai trò mà người dùng được gán. Các quyền ánh xạ các ủy quyền có thể có của một vai trò theo các hoạt động cụ thể mà người dùng kích hoạt vai trò đó có thể thực hiện trên tài nguyên hệ thống tương ứng. Người dùng được gán cho một vai trò không thể gọi các quyền của vai trò đó cho đến khi người dùng thực sự kích hoạt vai trò đó.
![](https://images.viblo.asia/c2b2d442-5af0-481d-8229-37f90c3c778f.jpg)
Dựa trên bản đồ cấp phép / bản đồ bảo mật của các trường hợp thử nghiệm thiết kế sản phẩm để đảm bảo:

 - o Mỗi vai trò với các đặc quyền cụ thể được kiểm tra

- o Người dùng có vai trò kết hợp được kiểm tra

 
### 3.6 Tích hợp với hệ thống khác

Thiết kế trường hợp thử nghiệm để kiểm tra tích hợp giữa hệ thống thử nghiệm hiện tại và các dịch vụ bên ngoài.
![](https://images.viblo.asia/30ffbdb4-248e-43ef-b9b2-d207bbabfed2.png)
Nếu đầu vào của hệ thống hiện tại được nhận thông tin từ các dịch vụ bên ngoài thì hãy tạo các trường hợp thử nghiệm để kiểm tra xem

o Định dạng của đầu vào là chính xác.

o Dữ liệu đúng

o Hệ thống hiện tại hoạt động chính xác với đầu vào từ các dịch vụ bên ngoài

Nếu đầu ra của hệ thống hiện tại là đầu vào cho các dịch vụ bên ngoài thì hãy tạo các trường hợp thử nghiệm để kiểm tra xem

o Định dạng đầu ra là chính xác.

o Dữ liệu đúng

o Hệ thống bên ngoài hoạt động tốt