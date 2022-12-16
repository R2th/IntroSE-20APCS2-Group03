Tiếp nối bài viblo: https://viblo.asia/p/lam-the-nao-de-tich-hop-uft-qtp-voi-alm-hp-alm-quality-center-phan-3-1VgZv1WmKAw

**Phần F - Phân tích kết quả:**

Bước 1) Bảng Execution được hiển thị trở lại cho người dùng khi đóng hộp thoại 'Người chạy tự động'.

* Với trạng thái thực hiện kiểm tra được cập nhật.
* Có thể truy cập báo cáo thử nghiệm UFT sẵn có bằng cách nhấp vào nút 'Launch Report'.
![](https://images.viblo.asia/355000fc-fcb1-4ecc-ade0-6be2f63f80f2.PNG)


Bước 2) Báo cáo thử nghiệm UFT sẽ được hiển thị cho người dùng.
![](https://images.viblo.asia/033de69a-54d0-41f1-9769-27a6d263cc2d.PNG)

Bước 3) Các kết quả chi tiết có thể được truy cập bằng mô-đun 'Test Runs'. Giống như kiểm tra thủ công, kết quả chi tiết hiển thị tất cả các thông tin.
![](https://images.viblo.asia/3b060739-71d6-4aab-b59a-6386ebb203a5.PNG)

Bước 4) Kết quảTest cũng tạo ra một tệp kết quả văn bản có thể được truy cập từ phần đính kèm. Tệp văn bản được tạo bởi tập lệnh (test framework) KHÔNG phải là báo cáo sẵn có của UFT. Để truy cập tương tự thực hiện như sau:

* Chọn 'Run ID'.
* Hộp thoại 'Run details' mở ra.
* Vào 'Attachments'.
* Một tập tin kết quả sẽ có sẵn cho người dùng tải về. Nhấp đúp chuột vào tập tin văn bản.

![](https://images.viblo.asia/4e4ce741-e673-4fa3-8442-9bd1bb6734d7.PNG)

Bước 5) Tệp kết quả văn bản được mở trong notepad. Các tập tin kết quả sẽ được hiển thị như dưới đây.
![](https://images.viblo.asia/1639c63e-7895-4f9d-92de-0121e322da0c.PNG)

**Làm thế nào để tạo mới một Defect**

Bước 1) Điều hướng đến tab Quality Center và nhấp vào nút "New Defect".
![](https://images.viblo.asia/8e16a652-7d61-42bb-9821-191578c92591.PNG)

Bước 2) Hộp thoại "New Defect" Mở ra. Điền vào các thông tin bắt buộc sau đây.

* Nhập Detected theo trường
* Nhập Phát hiện vào ngày - Theo mặc định ngày hiện tại sẽ được chọn
* Đặt mức độ nghiêm trọng của khuyết tật.
* Người dùng cũng có thể nhập thông tin khác và nhập mô tả ngắn gọn về lỗi
![](https://images.viblo.asia/a5420343-7d92-4fdd-af03-3cdb51c4c1e3.PNG)

Bước 3) Người kiểm tra cũng có thể đính kèm ảnh chụp màn hình / các tệp có liên quan khác liên quan đến lỗi bằng cách sử dụng tab 'tệp đính kèm'.

* Nhấp vào tab 'Tệp đính kèm'
* Nhấp vào nút 'Tệp đính kèm'
* Chọn một tệp từ hộp thoại Trình thám hiểm tệp.
* Nhấp vào 'Mở'
![](https://images.viblo.asia/493d1113-2da0-4d7c-a1ea-d2d4fcfa72de.PNG)

Bước 4) Khi nhấp vào 'Mở', chúng ta sẽ có thể thấy rằng tệp được đính kèm trong phần đính kèm.

* Tệp đã chọn đã được tải lên
* Nhấp vào 'Submit' để gửi một khiếm khuyết sau đó nó tạo ra một ID khiếm khuyết.

![](https://images.viblo.asia/f10f6738-54da-48c3-a27a-2ea5363d7dfa.PNG)

Bước 5) Lỗi được đăng, tương tự được truy cập trong Tab khuyết tật như hiển thị bên dưới. Bạn cũng có thể nhận thấy rằng ID khiếm khuyết được tạo khi đăng lỗi.
![](https://images.viblo.asia/b18119ed-b762-4884-a0e9-18c2c2a8950d.PNG)


**Làm thế nào để liên kết khiếm khuyết với một yêu cầu**
* Người dùng có thể liên kết một khiếm khuyết với các khiếm khuyết khác hoặc liên kết một khiếm khuyết với các yêu cầu. Bằng cách liên kết các khiếm khuyết và yêu cầu, chúng tôi có thể tạo biểu đồ phân tích bảo hiểm và ma trận truy xuất nguồn gốc.
* Bước 1) Sau khi tạo ra lỗi, người kiểm tra có thể ánh xạ các yêu cầu được liên kết với nó. Để làm cái tương tự,
* Nhấp vào 'Defect ID'
* Hộp thoại chi tiết lỗi mở ra như hình dưới đây.
![](https://images.viblo.asia/dc00f40f-e513-4a8a-9b59-381013ed32b8.PNG)


Bước 2) Để liên kết các thực thể,

* Điều hướng đến 'Linked Entities'
* Nhấp vào 'Others' để liên kết các yêu cầu chống lại khiếm khuyết này.
* Nhấp vào nút 'Link' và chọn 'by Id' (chúng tôi cũng có thể chọn dựa trên tên yêu cầu)
* Nhập ID yêu cầu mà lỗi này phải được ánh xạ.
* Nhấp vào nút 'Link'

![](https://images.viblo.asia/c314a178-8594-4a64-b913-2004a1247e2c.PNG)

Bước 3) Sau khi nhấp vào nút liên kết, cửa sổ chi tiết lỗi được hiển thị lại cho người dùng với liên kết được thêm vào như bên dưới.
![](https://images.viblo.asia/c1b8ca47-5ce9-4489-b627-4fb38d521c84.PNG)

Bước 4) Sau khi yêu cầu được liên kết với một khiếm khuyết, yêu cầu sẽ hiển thị với biểu tượng liên kết với nó như được hiển thị bên dưới.
![](https://images.viblo.asia/f051d61a-c5c5-4284-86ae-cd3902a62b54.PNG)


Bước 5) Khi yêu cầu được liên kết với một khiếm khuyết, Ma trận truy xuất nguồn gốc yêu cầu có thể được tạo. Để tạo Ma trận truy xuất nguồn gốc điều hướng để xem menu của 'Requirements' và chọn 'Traceability matrix '. Ma trận truy xuất nguồn gốc được tạo sẽ được tạo như dưới đây.

Lưu ý: Vui lòng tham khảo hướng dẫn 'Mô-đun yêu cầu' để tạo ma trận truy xuất nguồn gốc trong đó các bước được xây dựng chi tiết.
![](https://images.viblo.asia/4be5c793-832c-4dd7-b05b-59d56a556220.PNG)

Tài liệu tham khảo: https://www.guru99.com/hp-alm-defect-management.html