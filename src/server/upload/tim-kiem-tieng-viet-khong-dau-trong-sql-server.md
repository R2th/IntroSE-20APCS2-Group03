## Tìm kiếm toàn văn trong Sql Server

Tìm kiếm toàn văn (theo như chúng ta vẫn hiểu là tìm kiếm khi đầu vào là tiếng Việt không dấu/ có dấu cho kết quả tiếng Việt không dấu/ có dấu) trong Sql đã được một số bạn quan tâm thảo luận tại topic: Tìm kiếm dữ liệu tiếng việt có dấu trong sql như thế nào?

Mình thấy cũng có nhiều người quan tâm đến vấn đề này, và để nhiều người đã có thể đã quên topic trên vì đã lâu ngày muốn tham khảo thêm nên mình tạo topic này chia sẻ vấn đề này cho mọi người (ai biết rồi thì thôi nhé) và mọi người thảo luận thêm.

Để tìm kiếm toàn văn trong Sql, làm như sau:

CÁCH LÀM:
- Khi chúng ta tạo mới một Database (DB) thì thuộc tính Collation của DB mặc định là "Vietnamese_CI_AS". Theo đó, các cột của bảng có kiểu dữ liệu thuộc một trong các kiểu char, nchar, varchar, nvarchar, text, ntext cũng có thuộc tính Collation là "Vietnamese_CI_AS". (Như vậy, DB và các Table đều có thuộc tính Collation của riêng nó).
- Việc chúng là cần làm là thiết lập cho thuộc tính Collation của các cột của bảng cần tìm kiếm toàn văn một giá trị thích hợp. Ở đây mình chọn giá trị "SQL_Latin1_General_CP1_CI_AI".
- Trong SQL Server Management Studio, chọn bảng cần làm việc, nhấp phải chuột chọn Modify, tìm đến cột cần làm việc (tức cột sau này cần tìm kiếm toàn văn, ví dụ cột tên, cột địa chỉ, ...) bằng cách nhập chuột vào đó. Trong của sổ Column Properties tương ứng với cột chọn, tìm đến thuộc tính Collation, nó đang ở chế độ mặc định thì sẽ có dòng chữ "<database default>". Nhấp chuột vào nút ... bên phải, trong hộp thoại hiện ra, chọn Sql Collation thay vì Windows Collation. Trong combobox, chọn giá trị "SQL_Latin1_General_CP1_CI_AI" cho Sql Collation. Xong nhập OK để kết thúc. Công việc đã xong, các bạn hãy thử vài truy vấn để kiểm tra nhé.

LƯU Ý: 
- Để nhẹ nhàng hơn, khỏi phải mất công tìm giá trị "SQL_Latin1_General_CP1_CI_AI" trong combobox cho thuộc tính Collation thì các bạn có thể làm như sau:
  - Trước hết, thiết lập thuộc tính Collation cho DB có giá trị "SQL_Latin1_General_CP1_CI_AI". Nhấp chuột phải vào DB, chọn Properties, trong hộp thoại Database Properties hiện ra, nhấp chuột vào Options ở bên trái hộp thoại, mục Collation hiện ra bên phải, chọn giá trị "SQL_Latin1_General_CP1_CI_AI" trong combobox, xong nhấp OK để kết thúc.
  - Tiếp theo, bây giờ vẫn phải vào thiết lập thuộc tính Collation cho các cột cần tìm kiếm toàn văn trong các bảng như trên. Tuy nhiên, trong hộp thoại Column Properties, các bạn không cần phải chọn Sql Collation, không phải tìm đến giá trị "SQL_Latin1_General_CP1_CI_AI" trong combobox nữa, mà các bạn chỉ cần nhập vào nút "Restore Default" là xong.

LỜI KHUYÊN:
- Nếu ngay từ ban đầu, khi mới tạo DB mà chưa có Table nào, nếu DB được thiết lập thuộc tính Collation có giá trị "SQL_Latin1_General_CP1_CI_AI" thì khi tạo các bảng, các cột (có kiểu dữ liệu thuộc một trong các kiểu đã nói ở trên) sẽ mặc định theo thuộc tính Collation của DB là "SQL_Latin1_General_CP1_CI_AI". Do đó, nếu xác định ứng dụng (kể cả software, website nói chung) có thể có sử dụng tìm kiếm toàn văn (mà thông thường là vậy) thì ngay từ khi tạo mới DB, hãy thiết lập thuộc tính Collation chó DB để sau này khỏi mất công thiết lập cho từng cột trong các bảng như vậy.

P/S: Mình đang hướng dẫn trên Sql Server 2005, trên các phiên bản khác có thể có sự khác biệt ít nhiều, các bạn để ý nhé.

Nguồn tham khảo: http://diendan.congdongcviet.com/threads/t78345::tim-kiem-toan-van-trong-sql-server.cpp