### Khái niệm Transaction
Transaction là một tiến trình xử lý có xác định điểm đầu và điểm cuối, được chia nhỏ thành các operation (phép thực thi) , tiến trình được thực thi một cách tuần tự và độc lập các operation đó theo nguyên tắc hoặc tất cả đều thành công hoặc một operation thất bại thì toàn bộ tiến trình thất bại. Nếu việc thực thi một operation nào đó bị fail (hỏng) đồng nghĩa với việc dữ liệu phải rollback (trở lại) trạng thái ban đầu.
### Các tính chất của Transaction
Một transaction đòi hỏi phải có 4 tính chất ACID. ACID là viết tắt của cụm từ Atomicity (nguyên tử), Consitency (nhất quán), Isolation (Cô lập), và Durability (Lâu bền). Đây là các thuộc tính mà mọi transaction đều được đảm  bảo bởi SQL Server.
* Atomicity: Mọi thay đổi về mặt dữ liệu phải được thục hiện trọn vẹn khi transaction thực hiện thành công hoặc không có bất kì sự thay đổi nào về mặt dữ liệu nếu có xẩy ra sự cố.
* Consistency: Sau khi một transaction kết thúc thì tất cả dữ liệu phải được nhất quán dù thành công hay thất bại.
* Isolation: Các transaction khi đông thời thực thi trên hệ thống thì không có bất kì ảnh hưởng gì tời nhau.
* Durability: Sau khi một transaction thành công thì tác dụng mà nó tạo ra phải bền vững trong cơ sở dữ liệu cho dù hệ thống có xẩy ra lỗi.
### Cấu trúc transaction
Một transaction được định nghĩa dựa trên:
* BEGIN TRANSACTION: Bắt đầu một transaction
* SAVE TRANSACTION: Đánh dấu vị trí trong transaction(điểm đánh dấu)
* ROLLBACK TRANSACTION: Quay lui lại đầu transaction hoặc điểm đánh dấu trước đó trong transaction.
* COMMIT TRANSACTION: Đánh dấu điểm kết thúc của một transaction, khi câu lệnh này thực thi có nghĩa là transaction thực hiện thành công.
* ROLLBACK WORK: Quay lui lại đầu transaction.
* COMMIT WORK: Đánh dấu kết thúc transaction.
### Một số vấn đề xuất hiện khi có hai transaction cùng hoạt động
Cùng một lúc, DB có thể được truy cập bởi nhiều clients. Nếu các clients cùng truy xuất vào một phần dữ liệu, thì sẽ nảy sinh các vấn đề liên quan đến tình trạng tranh chấp.Để giải quyết các vấn đề tranh chấp nêu trên, hệ quản trị cơ sở dữ liệu cần sử dụng các phương thức khóa, nhờ vậy mà khi có tranh chấp xảy ra hệ quản trị cơ sở dữ liệu có thể quyết định transaction nào được thực hiện và transaction nào phải chờ.

| Transaction 1 | Transaction 2 | Nhận xét |
| -------- | -------- | -------- |
| Đọc     | Đọc     | Không có tranh chấp     |
| Đọc     | Ghi     | Xảy ra tranh chấp     |
| Ghi     | Đọc     | Xảy ra tranh chấp     |
| Ghi     | Ghi     |  Chỉ cho phép có đúng 1 transaction được ghi trên đơn vị dữ liệu tại một thời điểm   |

*Trong môi trường truy xuất đồng thời, có thể xảy ra một số vấn đề như sau:*
*  Mất dữ liệu cập nhật (Dirty Write)
- Tình trạng này xảy ra khi có nhiều hơn một giao tác cùng thực hiện cập nhật trên 1 đơn vị dữ liệu. Khi đó, tác dụng của giao tác cập nhật thực hiện sau sẽ đè lên tác dụng của thao tác cập nhật trước.
* Đọc dữ liệu chưa commit (Uncommitted data, Dirty read)
- Xảy ra khi một giao tác thực hiện đọc trên một đơn vị dữ liệu mà đơn vị dữ liệu này đang bị cập nhật bởi một giao tác khác nhưng việc cập nhật chưa được xác nhận.
*  Giao tác đọc không thể lặp lại (Unrepeatable data)
- Tình trạng này xảy ra khi một giao tác T1 vừa thực hiện xong thao tác đọc trên một đơn vị dữ liệu (nhưng chưa commit) thì giao tác khác (T2) lại thay đổi (ghi) trên đơn vị dữ liệu này. Điều này làm cho lần đọc sau đó của T1 không còn nhìn thấy dữ liệu ban đầu nữa.
* Bóng ma (Phantom)
- Là tình trạng mà một giao tác đang thao tác trên một tập dữ liệu nhưng giao tác khác lại chèn thêm các dòng dữ liệu vào tập dữ liệu mà giao tác kia quan tâm.

*Giải pháp xử lý*
* Thực hiện cơ chế Transaction và cơ chế khóa. Một transaction khi muốn cập nhật bất cứ bản ghi nào, sẽ phải giữ lock cho bản ghi đó, lock này chỉ được trả lại sau khi transaction đã commit hoăc bị rollback. Nếu lock của bản ghi đang bị giữ bởi transaction khác, transaction hiện tại sẽ phải đợi cho tới khi lock đó được trả lại.
* Trước khi transaction đọc hoặc chỉnh sửa dữ liệu, nó cần được bảo vệ và tránh ảnh hưởng của các transaction khác đang chỉnh sửa cùng dữ liệu.
* Transaction yêu cầu khóa dữ liệu đang dùng.
* Có nhiều Mode khóa khác nhau phụ thuộc vào mức độ phụ thuộc dữ liệu của transaction.
* Sẽ không có transaction nào được cấp khóa nếu gây xung đột với mode khóa đã được cấp trên cùng dữ liệu cho một transaction khác trước đó.
* Nếu transaction yêu cầu một mode khóa xung đột , DBMS sẽ bắt transaction này dừng lại cho đến khi transaction trước đó được giải phóng.
* Tất cả các khóa sẽ được giải phóng khi transaction hoàn thành.
* Hầu hết các DBMS đa người dùng đều tự động thực thi các thủ tục khóa.
* Lock Manager có nhiệm vụ gán và tạo chính sách khóa cho các transaction.
* Khi cần phải sử dụng câu lệnh SQL, query processor sẽ xác định tài nguyên nào được truy xuất, loại khóa nào cần dùng, thiết lập mức độ cô lập (Isolation level) cho transaction. Kế đến query processor yêu cầu một khóa phù hợp từ lock manager. Lock Manager sẽ cấp khóa nếu không có xung đột.

*Tài liệu tham khảo*
https://kipalog.com/posts/DB-Transaction
https://techmaster.vn/posts/26316/transaction-la-gi