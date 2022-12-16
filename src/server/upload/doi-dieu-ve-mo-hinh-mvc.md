**Là một lập trình viên Web không thể không biết đến mô hình MVC. Nó là một mô hình được sử dụng trong hầu hết các dự án phát triển Web. Trong post này mình sẽ trình bày mô hình MVC là gì nó hoạt động như thế nào và ưu điểm nhược điểm nó là gì? theo cách hiểu của mình thông qua quá trình mình tìm hiểu và sử dụng nó.**
<br>


-----
![](https://images.viblo.asia/9a58b050-1a54-4d2d-8813-4b831d6a4ea2.png)
<br>

### Mô hình MVC là gì?
MVC là từ viết tắt của **'Model View Controller'**. Nó đại diện cho các nhà phát triển kiến ​​trúc áp dụng khi xây dựng các ứng dụng. Với kiến ​​trúc MVC, chúng ta xem xét cấu trúc ứng dụng liên quan đến cách luồng dữ liệu của ứng dụng của chúng ta hoạt động như thế nào. <br><br>
***Dễ hiểu hơn, nó là mô hình phân bố source code thành 3 phần, mỗi thành phần có một nhiệm vụ riêng biệt và độc lập với các thành phần khác.***
<br>
### Các thành phần trong mô hình MVC

Mô hình MVC được chia làm 3 lớp xử lý gồm Model – View – Controller :<br>

* **Model :** là nơi chứa những nghiệp vụ tương tác với dữ liệu hoặc hệ quản trị cơ sở dữ liệu (mysql, mssql… ); nó sẽ bao gồm các class/function xử lý nhiều nghiệp vụ như kết nối database, truy vấn dữ liệu, thêm – xóa – sửa dữ liệu…
<br>
* **View :** là nới chứa những giao diện như một nút bấm, khung nhập, menu, hình ảnh… nó đảm nhiệm nhiệm vụ hiển thị dữ liệu và giúp người dùng tương tác với hệ thống.<br>
* **Controller :** là nới tiếp nhận những yêu cầu xử lý được gửi từ người dùng, nó sẽ gồm những class/ function xử lý nhiều nghiệp vụ logic giúp lấy đúng dữ liệu thông tin cần thiết nhờ các nghiệp vụ lớp Model cung cấp và hiển thị dữ liệu đó ra cho người dùng nhờ lớp View.
### Sự tương tác giữa các thành phần

- **Controller** tương tác với qua lại với **View**
- **Controller** tương tác qua lại với **Model**
- **Model** và **View** không có sự tương tác với nhau mà nó tương tác với nhau thông qua **Controller**.
<br>

***Đến đây có một câu hỏi đặt ra sự tương tác với nhau giữa các thành phần trong các trường hợp cụ thể nó như nào?***
<br>
### Kịch bản mô hình hoạt động theo mô hình MVC
![](https://images.viblo.asia/243b3d41-ec57-4d3f-8d8b-c2d4db8a467f.png)
<br>
**Kịch bản 1:** Người dùng chỉ gửi yêu cầu chuyển từ trang hiện tại sang một trang khác của web không có yêu cầu về dữ liệu.
* Nếu như người lập trình thực hiện việc **redirect** ở **Controller** thì lúc này luồng hoạt động là: **1 -> 3 -> 11**. **Request** được gửi từ **Browser** (trình duyệt) đến **Route** (nơi định tuyến hay phân định các request sẽ được xử lý ở đâu là trực tiếp tại **Route** hay là tại **Controller** nào đó).
* Nếu người lập trình để việc **redirect** trang ở trực tiếp tại **Route** thì luồng hoạt động của nó là: **1 -> 2** yêu cầu chuyển trang sẽ được xử lý ngay tại **Route** mà không cần gọi đến **Controller**.<br>

**Kịch bản 2:** Người dùng gửi 1 **request** **redirect** về 1 trang khác của web có trả về dữ liệu (ví dụ như xem danh sách các Tour đã đặt).
* Luồng hoạt động của nó là: **1 -> 3 -> 4 -> 6 -> 7 -> 8 -> 10 -> 9 > 11**. Sau khi **request** gửi về **Route** được **Route** chuyển về xử lý tại **Controller**, lúc này các yêu cầu liên quan đến dữ liệu sẽ được xử lý và **Controller** sẽ có sự tương tác với **Model** để lấy dữ liệu, **Controller** sẽ sử dụng các **lớp/hàm** trong **Model** cần thiết để lấy ra những dữ liệu chính xác. **Model** tương tác với **Database** để lấy dữ liệu, dữ liệu trả về được gửi về **Model** từ **Model** gửi lại về **Controller**, **Controller** gọi đến **View** phù hợp với **request** kèm theo dữ liệu cho **View**, **View** sẽ lắp dữ liệu tương ứng vào **HTML** và gửi lại một **HTML** cho **Controller** sau khi thực hiện xong nhiệm vụ của mình. Hoàn tất các công đoạn trên **Controller** sẽ trả kết quả về **Browser**.
<br>

**Kịch bản 3:**  Người dùng chỉ yêu cầu dữ liệu nhưng không chuyển trang 
* Luồng hoạt động của nó là: **1 -> 3 -> 4 -> 6 -> 7 -> 8 -> 11**. Thứ tự xử lý tương tự ở kịch bản 2 nhưng đến khi **Controller** nhận được dữ liệu trả về thì không gọi đến **View** mà trả **respone** lại cho trình duyệt thông qua **API**, dữ liệu trả về thường sẽ là dạng **JSON**.
<br>

=> **Trên đây là 1 số kịch bản thường xảy ra với request ở client gửi lên Server và được xử lý theo mô hình MVC.**
<br>
### Ưu điểm MVC
- Trình tự xử lý rất rõ ràng
- Mô hình MVC quy hoạch các class/function vào các thành phần riêng biêt
**Controller - Model - View**, việc đó làm cho quá trình phát triển - quản lý - vận hành - bảo trì web diễn ra thuận lợi hơn, tạo ra được các chức năng chuyên biệt hoá đồng thời kiểm soát được luồng xử lý.
- Tạo mô hình chuẩn cho dự án, khi người có chuyên môn ngoài dự án tiếp cận với dự án dễ dàng hơn.
- Mô hình đơn giản, dễ hiểu, xử lý những nghiệp vụ đơn giản, và dễ dàng triển khai với các dự án nhỏ.
### Nhược điểm mô hình MVC
- Đối với các dự án có tính phức tạp cao thì mô hình MVC trở nên không khả dụng.

### Tham khảo nguồn 
http://kienthucweb.net/tim-hieu-mo-hinh-mvc.html