# 1. Kiểm thử khả năng tương tác là gì?

Kiểm thử khả năng tương tác là một loại kiểm thử phần mềm, kiểm tra xem phần mềm có thể tương tác với các thành phần, phần mềm hoặc hệ thống khác hay không.

Nói cách khác, kiểm thử khả năng tương tác có nghĩa là chứng minh rằng chức năng đầu cuối giữa hai hệ thống giao tiếp với nhau phải theo yêu cầu tiêu chuẩn mà các hệ thống đó dựa trên.

*Ví dụ: kiểm thử khả năng tương tác được thực hiện giữa điện thoại thông minh và máy tính bảng . kiểm thử khả năng truyền dữ liệu qua Bluetooth.*

**Trong bài viết này chúng ta sẽ tìm hiểu về**: 

* Kiểm thử khả năng tương tác là gì?
* Mức độ khác nhau về khả năng tương tác giữa các phần mềm với nhau.
* Tại sao phải kiểm thử khả năng tương tác
* Làm thế nào để kiểm thử khả năng tương tác
* Các trường hợp kiểm thử, ví dụ về kiểm thử khả năng tương tác
* Nhược điểm của kiểm thử khả năng tương tác
* Sự khác biệt giữa Kiểm thử khả năng tương tác và Kiểm thử phù hợp

# 2. Mức độ khác nhau về khả năng tương tác giữa các phần mềm với nhau.

Có nhiều mức độ khác nhau về Kiểm thử khả năng tương tác: 

* Khả năng tương tác vật lý
* Khả năng tương tác dữ liệu
* Khả năng tương tác về mức độ kỹ thuật
* Khả năng tương tác ngữ nghĩa

# 3. Tại sao phải kiểm thử khả năng tương tác

Kiểm tra khả năng tương tác được thực hiện bởi vì,

Nó đảm bảo cung cấp dịch vụ đầu cuối trên hai hoặc nhiều sản phẩm từ các nhà cung cấp khác nhau.

Sản phẩm phần mềm có thể giao tiếp với thành phần hoặc thiết bị khác mà không gặp sự cố tương thích.

Rủi ro liên quan do thiếu Kiểm thử khả năng tương tác là:

* Mất dữ liệu
* Hiệu suất không đảm bảo
* Hoạt động không đảm bảo
* Hoạt động không chính xác
* Khả năng bảo trì thấp

# 3. Làm thế nào để kiểm thử khả năng tương tác

Quá trình kiểm thử Khả năng tương tác bao gồm các bước sau: 

**Bước 1: Bắt đầu dự án.**

* Xác định và mô tả đúng kế hoạch và chiến lược kiểm thử. Xây dựng khung quản lý .  

**Bước 2: Thiết lập công cụ kiểm thử**

* Bảo đảm tất cả yêu cầu, kỹ thuật của công cụ kiểm thử tự động được thiết lập.
* Sử dụng các công cụ tự động để giảm thiểu các trường hợp cần kiểm thử và sử dụng lại được các trường hợp kiểm thử lặp .
* Duy trì cơ sở dữ liệu của các tệp cấu hình
* Ghi lại và phân tích số liệu 
* Ghi lại cấu hình từ các kiểm thử không thành công để tham khảo và phân tích

**Bước 3: Xây dựng kế hoạch kiểm thử**

* Viết kế hoạch kiểm thử ( [Test plan](https://www.guru99.com/what-everybody-ought-to-know-about-test-planing.html) )
* Xác định các trường hợp và thủ tục kiểm thử ( [Test case](https://www.guru99.com/test-case.html) )
* Thiết lập thiết bị giám sát cần thiết để duy trì nhật ký kiểm thử.

**Bước 4: Thực hiện kiểm thử**

* Thực hiện các trường hợp kiểm thử .  ( [Test case](https://www.guru99.com/test-case.html) )
* Làm việc với nhóm kiểm thử để phân tích nguyên nhân gốc rễ của sự thất bại

**Bước 5: Kết quả** 

* Sử dụng nhật ký kiểm thử để ghi lại các ghi chú thực hiện

**Bước 6: Giải phóng tài nguyên và đánh giá hiệu suất.**

* Với sự trợ giúp của các công cụ kiểm thử tự động phân tích kết quả kiểm thử

# 4.  Các trường hợp kiểm thử, ví dụ về kiểm thử khả năng tương tác

![](https://images.viblo.asia/0f24b49a-f022-4388-8df8-388075d4f947.png)

Kế hoạch kiểm thử khả năng tương tác bao gồm:

* Kết nối hai hoặc nhiều thiết bị từ các nhà cung cấp khác nhau
* Kiểm tra kết nối giữa các thiết bị
* Kiểm tra xem thiết bị có thể gửi / nhận gói tin hoặc khung cấu tạo từ nhau không
* Kiểm tra xem dữ liệu được xử lý chính xác trong các lớp mạng và lớp cơ sở không.
* Kiểm tra xem các thuật toán được thực hiện có hoạt động chính xác không
* Kết quả ok: kiểm tra kết quả tiếp theo
* Kết quả không ổn: Sử dụng các công cụ giám sát để phát hiện nguyên nhân lỗi
* Báo cáo kết quả trong quá trình sử dụng công cụ kiểm thử để kiểm thử.

# 5. Điều kiện cần phải có để kiểm thử khả năng tương tác

Điều kiện cần phải có để kiểm thử khả năng tương tác là: 

* Xác định nguyên nhân gốc của khuyết tật
* Phương pháp đo lường chính xác
* Khả năng mở rộng của thử nghiệm
* Độ phức tạp của mạng
* Kiểm tra thiết bị kiểm tra
* Tài liệu kết quả kiểm tra và học tập
* Yêu cầu không đầy đủ

# 6. Sự khác biệt giữa Kiểm thử khả năng tương tác và Kiểm thử phù hợp



| Kiểm thử khả năng tương tác | Kiểm thử phù hợp |
| -------- | -------- |
| Đảm bảo rằng sản phẩm hoặc phần mềm sẽ tương tác được với các sản phẩm hoặc phần mềm khác mà không có bất kỳ vấn đề nào    | Đảm bảo sự tuân thủ của sản phẩm liên quan đến tiêu chuẩn và đặc điểm kỹ thuật cần thiết    |

# 7. Kết luận 

Trong Kỹ thuật phần mềm, kiểm thử khả năng tương tác là việc kiểm tra xem phần mềm có thể tương tác với một thành phần phần mềm hoặc  phần mềm khác hay không
Nó đảm bảo rằng sản phẩm phần mềm sẽ có thể giao tiếp với các thành phần hoặc thiết bị khác mà không có bất kỳ vấn đề về tương thích nào.

#  Tài liệu tham khảo
https://www.guru99.com/interoperability-testing.html#1