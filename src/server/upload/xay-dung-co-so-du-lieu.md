# 1. Thế nào là web tĩnh, web động:

Trước khi đi vào tìm hiểu về CSDL, thì chúng ta hãy cùng đi tìm hiểu, phân loại 2 loại web tĩnh và web động.

|  | Web tĩnh | Web động |
| -------- | -------- | -------- |
| Khái niệm     |  Là website không có hệ thống quản lý nội dung, hoặc có nhưng về nội dung website thì ít/không thay đổi| Là những website có cơ sở dữ liệu và được hỗ trợ bởi các phần mềm phát triển web.    |
| Ngôn ngữ     | Thường được xây dựng từ **CSS, HTML, JAVASCRIPT**     | Sử dụng các công nghệ như **HTML,  CSS, JAVASCRIPT**, ... và điều đặc biệt là có sử dụng một **ngôn ngữ lập trình server như PHP**, một **hệ quản trị cơ sở dữ liệu như MySQL**, vì vậy web động phải chạy trong máy chủ     |
| Ưu điểm     | Tốc độ truy cập nhanh; Chi phí đầu tư thấp     | Dễ dàng quản lý nội dung, nâng cấp và bảo trì; Có thể xây dụng được web lớn; Thường sử dụng tương tác với người dùng cao     |
| Nhược điểm     | Khó quản lý nội dung; nâng cấp bảo trì; Mỗi khi thay đổi phải vào file HTML, CSS hoặc JAVASCRIPT để chỉnh sửa     | Chi phí xây dựng cao; Nếu web lớn có thể cần thêm nhân sự chuyên ngành     |

# 2. Cơ sở dữ liệu là gì?
Như đã nói ở trên, CSDL là điểm khác biệt cơ bản giữa web tĩnh và web động.

Vì vậy ta có thể coi CSDL là nền móng của một ứng dụng web, nó giúp máy tính có thể dễ dàng đọc thông tin, chỉnh sửa, thêm hoặc xóa dữ liệu. Ví dụ trong một website quản lí trường học ta cần lưu trữ thông tin sinh viên (tên, tuổi, quê quán, giới tính..), giảng viên, lớp môn học, ..vv..vv

Bởi vậy, bài đầu tiên của series là "Xây dựng cơ sở dữ liệu"!

## Trước hết cùng xem khái niệm CSDL là gì?

"**Cơ sở dữ liệu** (viết tắt **CSDL**; tiếng Anh là **database**) là một tập hợp liên kết các dữ liệu,  lưu trên một thiết bị lưu trữ, được duy trì dưới dạng một tập hợp các tập tin trong hệ điều hành hay được lưu trữ trong các **hệ quản trị cơ sở dữ liệu**."

"**Hệ quản trị cơ sở dữ liệu** (tiếng Anh: **Database Management System - DBMS**), là phần mềm hay hệ thống được thiết kế để quản trị một cơ sở dữ liệu. Cụ thể, các chương trình thuộc loại này hỗ trợ khả năng lưu trữ, sửa chữa, xóa và tìm kiếm thông tin trong một **cơ sở dữ liệu (CSDL)**".

Các **hệ quản trị CSDL** phổ biến được nhiều người biết đến là **MySQL**, **Oracle**, **PostgreSQL**, **SQL Server**. Chúng có đặc điểm chung là sử dụng ngôn ngữ truy vấn theo cấu trúc mà tiếng Anh gọi là **Structured Query Language (SQL)**. Ngoài ra còn có **hệ quản trị CSDL** họ **NoSQL** như **MongoDB(2009)**, **Redis(2009)**.

## Nguyên tắc thiết kế CSDL

* Chính xác
* Tránh trùng lặp
* Dễ hiểu
* Chọn đúng thuộc tính và kiểu thuộc tính
* Chọn đúng mối quan hệ


## Chuẩn hoá CSDL
Khi xây dựng các bảng trong một CSDL, ta cần làm cho nó càng đáp ứng được nhiều nguyên tắc càng tốt cho quá trình hoạt động và xử lí của website sau này. Và quá trình làm cho nó tuần theo các nguyên tắc ấy gọi là **CHUẨN HOÁ CSDL**. 

Cụ thể, đó là quá trình tách bảng (phân rã) thành các bảng nhỏ hơn dựa vào các phụ thuộc hàm. 
Mục đích của chuẩn hoá là loại bỏ các dư thừa dữ liệu, các lỗi khi thao tác dư thừa, các lỗi khi thao tác dữ liệu (Insert, Delete, Update) và làm tăng thời gian truy vấn. 

Các dạng chuẩn là các chỉ dẫn để thiết kế các bảng trong CSDL.

### Dạng chuẩn 1 – 1NF (First Normal Form)
- **Định nghĩa**: Một bảng (quan hệ) được gọi là ở dạng chuẩn 1NF nếu toàn bộ các miền giá trị của các cột có mặt trong bảng (quan hệ) đều chỉ chứa các giá trị nguyên tử (tức  là một ô trong CSDL chỉ chứa duy nhất 1 giá trị. 
- **Thực hiện**: Loại bỏ nhóm lặp và loại bỏ các thuộc tính tính toán.
- **Ví dụ**: trong một CSDL quản lí điểm thì một môn học sẽ có nhiều đầu  điểm, nên để mỗi đầu điểm ứng với một cột trong bảng thay vì để duy nhất 1 cột điểm chứa nhiều giá trị.

| MaSV  | MaMon | DiemCC | DiemTH | DiemCuoiKy
| -------- | -------- | -------- |  -------- |  -------- | 


### Dạng chuẩn 2 – 2NF

- **Định nghĩa**: một quan hệ ở dạng chuẩn 2NF nếu quan hệ đó:
   + Đã đạt 1NF

  + Các thuộc tính không khoá phải phụ thuộc hàm đầy đủ vào khoá chính (tức là tất cả các thuộc tính không khoá có thể suy ra được từ tập các thuộc tính khoá chính)
 - **Thực hiện**: Loại bỏ các phụ thuộc hàm không hoàn toàn vào khóa chính
 - **Ví dụ**: trong bảng sinh viên, khoá chính là MaSV thì tất cả các thuộc tính khác trong bảng (họ tên, địa chỉ, email, sđt, ... ) đều có thể suy ra được từ MaSV. Nếu không, sẽ phải tiến hành tách bảng.

### Dạng chuẩn 3 – 3NF
- **Định nghĩa**: là một quan hệ:

    - Đã đạt 2NF
    - Các thuộc tính không khoá phải phụ thuộc trực tiếp vào khoá chính
- **Thực hiện**: Loại bỏ các phụ thuộc hàm bắc cầu vào khóa chính
- **Ví dụ**:

### Dạng chuẩn BCNF (Boyce Codd Normal Form)
- **Định nghĩa**: Một quan hệ ở dạng chuẩn BCNF nếu quan hệ đó:

    - Đã đạt 3NF

    - Thuộc tính khoá không được phụ thuộc hàm vào thuộc tính không khoá.
- **Thực hiện**: tách thuộc tính khoá và thuộc tính không khoá mà nó phụ thuộc hàm thành một bảng riêng.
- **Ví dụ**:  quan hệ R = (ABCDGH) , khoá là AB và tập phụ thuộc hàm.

     F = {AB -> C, AB -> D, AB -> GH, H -> B} là quan hệ không đạt chuẩn BCNF vì có H -> B. Để chuẩn hoá đạt BCNF: cần tách R1=(H, B) với H là khoá chính và R2=(A,H,C,D,G) với khoá chính là AH.
     
###  Ngoài ra còn một số dạng chuẩn cao hơn: 
Trong 4 dạng kể trên là những dạng cơ bản thường gặp nhất trong quá trình học tập cũng như  mới bắt đầu công việc, sau này có thể công việc sẽ yêu cầu chuẩn cao hơn.

# Kết luận:
  Đoạn chuẩn hoá có vẻ hơi khó hiểu nếu chỉ đọc, vì vậy mình khuyên các bạn nên bắt tay vào làm ngay một CSDL để làm thực tế sẽ dễ hiểu và nhớ lâu hơn nhiều.
  
Mình cũng xin chia sẻ một trang khá hay để học về truy vấn CSDL (SQL), và trên trang này cũng có sẵn 1 bộ CSDL để bạn có thể tải về và vọc vạch.

https://o7planning.org/vi/10241/co-so-du-lieu-sql-server-mau-de-hoc-sql#a23467
 
 **Hẹn gặp lại các bạn trong các bài viết tiếp theo trong series này**.
 
 # Tài liệu tham khảo:
 https://viblo.asia/p/tong-hop-ve-chuan-hoa-co-so-du-lieu-ORNZqP33K0n
 
 https://techtalk.vn/cac-buoc-chuan-hoa-co-so-du-lieu-co-ban.html