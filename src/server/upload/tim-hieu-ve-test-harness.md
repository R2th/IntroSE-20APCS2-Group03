### 1. Test Harness là gì?
Test Harness (Khai thác kiểm thử) là một tập hợp phần mềm và bộ dữ liệu test được cấu hình sẵn để kiểm thử một chương trình bằng cách chạy nó trong nhiều điều kiện khác nhau và chúng ta sẽ theo dõi hành vi và kết quả đầu ra của nó. Khai thác kiểm thử có hai phần chính: bộ máy thực hiện kiểm thử và một kho kịch bản kiểm thử.

Một định nghĩa thay thế về khai thác thử nghiệm là phần mềm được xây dựng để tạo điều kiện thuận lợi cho thử nghiệm tích hợp. Trong đó các phần khai thác thử nghiệm thường là các thành phần của ứng dụng đang được phát triển và được thay thế bằng thành phần đang hoạt động khi ứng dụng được phát triển (thiết kế từ trên xuống), các phần khai thác thử nghiệm nằm ngoài ứng dụng đang được thử nghiệm và mô phỏng các dịch vụ hoặc chức năng không khả dụng trong môi trường thử nghiệm. 
![](https://images.viblo.asia/a5184cfe-9dc2-4c8b-826d-4d8f03a6cf59.png)

Ví dụ: nếu bạn đang xây dựng một ứng dụng cần giao diện với ứng dụng trên máy tính lớn nhưng không có ứng dụng nào khả dụng trong quá trình phát triển, một bộ khai thác thử nghiệm có thể được xây dựng để sử dụng thay thế. Khai thác kiểm thử có thể là một phần của bàn giao sản phẩm. Nó được giữ bên ngoài mã nguồn ứng dụng và có thể được sử dụng lại cho nhiều dự án. Bởi vì bộ khai thác thử nghiệm mô phỏng chức năng ứng dụng - nó không có kiến thức về bộ kiểm thử , trường hợp kiểm thử hoặc báo cáo kiểm thử . Những thứ đó được cung cấp bởi một khuôn khổ kiểm thử và các công cụ kiểm tra tự động.

### 2. Tại sao cần sử dụng Test Harness 
Các mục tiêu tiêu biểu của một test harness là:
* Tự động hóa quá trình kiểm thử.
* Thực hiện các bộ kiểm thử của các trường hợp kiểm thử.
* Tạo ra các báo cáo kiểm thử liên quan.

Test harness có thể mang lại một số lợi ích sau đây:
* Hỗ trợ debug
*  Giúp dev đo lường mức độ bao phủ code
* Tăng năng suất do tự động hóa quá trình kiểm thử.
* Tăng xác suất kiểm tra hồi quy sẽ xảy ra.
* Tăng chất lượng của các thành phần phần mềm và ứng dụng.
* Đảm bảo rằng chạy thử nghiệm tiếp theo là bản sao chính xác của những người trước đây.
* Việc kiểm thử được thực thi dù trong trường hợp văn phòng không có nhân viên (tức là vào ban đêm)
* Để xử lý tình trạng phức tạp mà người kiểm tra đang gặp khó khăn trong việc mô phỏng

### 3. Các trường hợp sử dụng Test Harness 
Kiểm thử tự động: Nó chứa các kịch bản kiểm thử, các tham số cần thiết để chạy các kịch bản này và thu thập kết quả để phân tích nó

Kiểm tra tích hợp: Nó được sử dụng để tập hợp hai đơn vị mã hoặc mô-đun tương tác với nhau để kiểm tra xem hành vi kết hợp có như mong đợi hay không

So sánh Test Harness (Khai thác kiểm thử) và Test Framework (Khung kiểm thử)



| Test Harness | Test Framework |
| -------- | -------- |
| là một tập hợp phần mềm và bộ dữ liệu test được cấu hình sẵn để kiểm thử một chương trình     | Nó là một tập hợp các quy trình, thủ tục, khái niệm trừu tượng và một môi trường trong đó các thử nghiệm tự động được thiết kế và thực hiện     |
| Không thể tập lệnh "Ghi và phát lại" trong Khai thác thử nghiệm     | Có thể tập lệnh "Ghi và phát lại" theo cách thủ công trong khuôn khổ này     |
| Khai thác kiểm thử chứa tất cả thông tin cần thiết để biên dịch và chạy thử nghiệm như trường hợp kiểm thử , cổng triển khai mục tiêu (TDP), tệp nguồn đang thử nghiệm, sơ khai, v.v.     | Khung tự động thử nghiệm chứa thông tin như thư viện kiểm thử , công cụ kiểm thử , thực hành kiểm thử tự động, nền tảng kiểm thử , v.v.     |

Ví dụ về khung tự động hóa:  
* Kiểm tra theo hướng dữ liệu
* Kiểm tra theo hướng từ khóa
* Thử nghiệm theo hướng mô-đun
* Thử nghiệm kết hợp
* Kiểm tra dựa trên mô hình
* Kiểm tra theo hướng mã
* Kiểm tra theo hướng hành vi     

### Tài liệu tham khảo: https://www.guru99.com/what-is-test-harness-comparison.html