Bài viết này sẽ giới thiệu những khái niệm cơ bản ban đầu về **kho dữ liệu** và **khai phá dữ liệu**. Đây là những hướng phát triển mới của CSDL nhằm hỗ trợ cho việc xây dựng các mô hình đưa ra quyết định mang tính chiến lược trong hoạt động của các tổ chức xí nghiệp.

# 1. Kho dữ liệu

## a. Khái niệm kho dữ liệu

Kho dữ liệu **(data warehouse)** là một tuyển tập:
* Dữ liệu có tính hướng chủ đề 
* Dữ liệu được tích hợp 
* Dữ liệu biến đổi theo thời gian
* Dữ liệu có tính ổn định 

Kho dữ liệu được dùng để hỗ trợ cho việc xử lí, hỗ trợ đưa ra các quyết định của người làm quản lí. Việc phân tích chi tiết hơn về bốn tính chất sau của dữ liệu trong một kho dữ liệu sẽ giúp cho chúng ta có thể hiểu rõ hơn khái niệm trên

* **Dữ liệu có tính hướng chủ đề (subject-oriented):** 
    * Vì mỗi kho dữ liệu được tổ chức theo một số chủ đề chính của một tổ chức xí nghiệp chứ không hướng theo các ứng dụng. 
    * Chẳng hạn kho dữ liệu theo chủ đề về **khách hàng**, **sản phẩm** và **việc mua bán** chứ không phải theo các việc như là **lập hóa đơn khách hàng**, **quản lí kho** hay **bán sản phẩm**. 
    * Xây dựng một kho dữ liệu là tập trung vào việc mô hình hóa và phân tích dữ liệu có ích cho việc đưa ra quyết định, nó không nhằm phục vụ các ứng dụng, xử lí các giao dịch hay các hoạt động nghiệp vụ của hệ thống. 
    * Như vậy kho dữ liệu phải cung cấp những khung nhìn đơn giản và cô đọng cho một chủ đề cụ thể, những dữ liệu không cần thiết cho việc đưa ra quyết định sẽ không có mặt ở đây

* **Dữ liệu có tính tích hợp (integrated):**
    * Vì dữ liệu mà ta có được chính là kết quả của việc tích hợp dữ liệu từ nhiều nguồn dữ liệu hướng ứng dụng khác nhau với các định dạng khác nhau. 
    * Dữ liệu từ các nguồn khác khi di chuyển về kho dữ liệu phải được chuyển đổi về các dạng qui định, tạo nên một sự nhất quán trong việc hiển thị nội dung khung nhìn duy nhất cho người dùng. Để làm được việc này ta cần phải sử dụng các kĩ thuật làm sạch và tích hợp dữ liệu

* **Dữ liệu có tính biến đổi theo thời gian (time-variant):**
    * Vì nó chỉ đúng và chính xác tại một thời điểm nào đó, hay trong một khoản thời gian nào đó. Các CSDL tác nghiệp lưu trữ dữ liệu có giá trị hiện thời, còn kho dữ liệu cung cấp thông tin để thể hiện triển vọng dựa vào những dữ liệu mang tính lịch sử (chẳng hạn như dựa vào dữ liệu được tích hợp trong 5-10 năm qua)
    * Có thể hình dung dữ liệu bên trong kho dữ liệu ở đây được thể hiện như một dãy hình ảnh theo dãy thời điểm trong tiến triển của thời gian
* **Dữ liệu có tính ổn định (non-volative):**
    * Vì không được cập nhập theo thời gian thực dữ liệu mới sẽ được đưa vào kho dữ liệu như là dữ liệu cung cấp thêm chứ không phải như một thay đổi cho dữ liệu đã có.
    * Kho dữ liệu liên tục hấp thu những dữ liệu mới tích hợp và thêm vào bổ sung vào những dữ liệu trước đó
    * Và như vậy thì trong môi trường kho dữ liệu sẽ không có các thao các nghiệp vụ theo kiểu tác nghiệp, không có các yêu cầu xử lí giao tác và không cần cơ chế phục hồi hay điều khiển tương tranh. Ở đây chỉ có hai loại thao tác 
        * Nạp dữ liệu vào kho (initial loading data)
        * Truy cập dữ liệu (access of data)

Phân biệt **hệ thống CSDL truyền thống** với tư cách là **hệ thống xử lí giao dịch trực tuyến** **(On-Line Transaction Processing OLTP)** với **kho dữ liệu** với tư cách là **hệ thống phân tích trực tuyến** **(On-Line Analytical Processing OLAP)**, bảng bên dưới sẽ cho thấy được một số điểm khác biệt giữa hai loại hệ thống này:



|                | Hệ thống OLTP | Hệ thống OLAP |
| --------       | --------      | -------- |
| Người dùng     | người làm tin học, nhân viên văn phòng  | Các kĩ sư tri thức     |
| Chức năng     | Hỗ trợ các hoạt động hàng ngày          | Hỗ trợ quyết định mang tính chiến lược     |
| Thiết kế     | Hướng ứng dụng          | Hướng chử đề     |
| Dữ liệu     | Chi tiết mang tính ứng dụng, cập nhập thường xuyên          | Có tính lịch sử, mang tính thống kê, tích hợp nhiều chiều và cô đọng     |
| Sử dụng     | Thường xuyên          | Trong những trường hợp đặc biệt     |
| Đơn vị công việc     | Giao dịch đơn giản, ngắn          | Các câu truy vấn phức tạp     |
| Độ đo     | Thông lượng giao dịch          | Thông lượng truy vấn và trả lời     |

Còn tiếp