Trong MySQL sẽ có nhiều kiểu Storage Engine để bạn lựa chọn. Trong đó có 3 kiểu lưu trữ bảng được dùng nhiều nhất là InnoDB, MyISAM và Memory.
# 1. MyISAM trong MySQL
Đây là kiểu Storage Engine mặc định khi tạo bảng và được dùng phổ biến nhất.
MyISAM cho phép lập chỉ mục toàn cột (Full Text Index). Do đó, Storage Engine này cho tốc độ truy suất (Đọc và tìm kiếm) nhanh nhất trong các Storage Engine.
Nhược điểm của MyISAM là hoạt động theo kiểu Table Level locking nên khi cập nhật (Thêm,xóa,sửa) 1 bản ghi nào đó trong cùng 1 table thì table đó sẽ bị khóa lại, không cho cập nhật (Thêm,xóa,sửa) cho đến khi thao tác cập nhật trước đó thực hiện xong.
Ngoài ra, do thiết kế đơn giản và không kiểm tra ràng buộc dữ liệu nên loại Storage Engine này dễ bị hỏng chỉ mục và dễ bị Crash. Đây là cơn ác mộng của các webmaster khi table Crash là table có dung lượng lớn, khi phục hồi rất lâu và hồi hộp
# 2. InnoDB trong MySQL
Đây là kiểu Storage Engine mới hơn MyISAM. Storage Engine này không hỗ trợ Full Text Index như MyISAM (Tin mừng là sắp có hỗ trợ ở các phiên bản mới, hiện tại đã có beta rồi ) nhưng hỗ trợ quan hệ giữa các bảng (Khóa ngoại). Do đó, kiểu Storage này kiểm tra tính toàn vẹn dữ liệu và ràng buộc rất cao => Khó sảy ra tình trạng hỏng chỉ mục và Crash như MyISAM.
Ngoài ra, kiểu Storage Engine này hoạt động theo cơ chế Row Level Locking nên khi cập nhật (Thêm,xóa,sửa) 1 bảng thì chỉ có bản ghi đang bị thao tác bị khóa mà thôi, các hoạt động khác trên table này vẫn diễn ra bình thường.
Vì những tính chất trên, kiểu Storage Engine này thích hợp sử dụng cho Ngân hàng và các trang web có tần suất cập nhật dữ liệu cao như Mạng xã hội, diễn đàn....
Tuy nhiên, nó có nhược điểm là hoạt động tốn RAM hơn so với MyISAM (Nếu MyISAM mà tần suất insert hay update cao thì nếu cấu hình chưa đủ mạnh thì khéo còn tốn RAM nhiều hơn InnoDB vì hàng đợi lớn )
=> vBulletin, mã nguồn diễn đàn lớn nhất hiện nay thật sai lầm khi chọn MyISAM làm kiểu Storage Engine cho các bảng dữ liệu forum. Vì thế mà các trang lớn mới hay bị Crash bảng như vậy (Database Error)
# 3. MEMORY trong MySQL
Đây là kiểu Storage Engine được lưu trữ dữ liệu trực tiếp lên RAM nên tốc độ truy xuất và cập nhật rất nhanh. Vì thế, nó được dùng làm các table chứa dữ liệu tạm, chứa các phiên làm việc của user...
Khi khởi động lại dịch vụ MySQL thì dữ liệu trên bảng có Storage Engine là MEMORY sẽ mất hết dữ liệu. Chính vì thế nên khi các bạn khởi động lại mysqld trên VPS hay Server thì sẽ thấy số người online = 0
MEMORY sử dụng cơ chế table-level locking như MyISAM.
Dung lượng của 1 bảng Storage Engine dạng MEMORY tối đa là bao nhiêu ?
Nó phụ thuộc vào cấu hình thông số max_heap_table_size trong file my.cnf, mặc định 1 bảng kiểu MEMORY có dung lượng tối đa là 16MB. Nếu vượt quá bạn sẽ nhận được lỗi: Table xyz is full…
# Tóm lại,
-> Với 1 ứng dụng có tần suất đọc cao như trang tin tức,blog... thì bạn nên dùng MyISAM.
-> Với ứng dụng có tần suất insert và update cao như: Diễn đàn, mạng xã hội.. thì bạn nên dùng InnoDB
-> Bạn nên dùng MEMORY Storage Engine cho các table chứa dữ liệu tạm và thông tin phiên làm việc của người dùng (Session)
-> Việc chuyển đổi 1 table từ storage engine này sang storage engine khác sẽ diễn ra tương đối lâu nếu dữ liệu trên table lớn. Do đó cần kiên nhẫn.

Nguồn: https://www.zozozo.xyz/2018/08/su-khac-nhau-giua-2-storage-engine.html