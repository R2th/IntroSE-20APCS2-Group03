Trong khi chúng ta làm việc với cơ sở dữ liệu thì việc thay đổi dữ liệu liên quan đến nhiều bảng và cần sự nhất quán là bài toán được đặt ra. Với việc thực hiện từng câu lệnh đơn lẻ sẽ khiến dữ liệu khó nhât quán nếu một trong số đó xẩy ra lỗi bà bị hủy bỏ.

Một ví dụ cụ thể như khi chúng ta thực hiện lưu dữ liệu của một đơn hàng và đồng thời cũng muốn lưu các chi tiết sản phẩm có trong đơn hàng đó lần lượt vào hai bảng là `orders` và `detail orders`. Trong trường hợp chúng ta thực hiện bằng hai câu lệnh đơn lẻ thì nếu một trong hai xẩy ra lỗi và không thể lưu dữ liệu thì lúc này chúng ta sẽ không thể lấy ra được đầy đủ các thông tin của đơn hàng đó.
  
`Transaction` được dùng để đảm bảo tính toàn vẹn dữ liệu trong các tình huống như vậy. Khi một `transaction` bao gồm nhiều tập lệnh cập nhật dữ liệu nó đảm bảo tất cả các tập lệnh đó đều được thực hiện một cách thành công hoặc trong trường hợp xẩy ra lỗi thì toàn bộ `transaction` bị hủy bỏ.
  
Một `transaction` là một chuỗi một hoặc nhiều câu lệnh `SQL` được kết hợp lại với nhau thành một khối công việc. Các câu lệnh `SQL` xuất hiện trong `transaction`
thường có mối quan hệ tương đối mật thiết với nhau và thực hiện các thao tác độc lập. 

Việc kết hợp các câu lệnh lại với nhau trong một `transaction` nhằm đảm bảo tính toàn vẹn dữ liệu và khả năng phục hồi dữ liệu. Trong một `transaction`, các câu lệnh có thể độc lập với nhau nhưng tất cả các câu lệnh trong một `transaction` đòi hỏi hoặc phải thực thi trọn vẹn hoặc không một câu lệnh nào được thực thi.
Các cơ sở dữ liệu sử dụng `transaction log` để ghi lại các thay đổi mà `transaction` tạo ra trên cơ sở dữ liệu và thông qua đó có thể phục hồi dữ liệu trong
trường hợp gặp lỗi hay hệ thống có sự cố.

## Một số tính chất của transaction
Một transaction đòi hỏi phải có 4 tính chất:
* Atomicity: Mọi thay đổi về mặt dữ liệu phải được thục hiện trọn vẹn khi transaction thực hiện thành công hoặc không có bất kì sự thay đổi nào về mặt dữ liệu nếu có xẩy ra sự cố.
* Consistency: Sau khi một transaction kết thúc thì tất cả dữ liệu phải được nhất quán dù thành công hay thất bại.
* Isolation: Các transaction khi đông thời thực thi trên hệ thống thì không có bất kì ảnh hưởng gì tời nhau.
* Durability: Sau khi một transaction thành công thì tác dụng mà nó tạo ra phải bền vững trong cơ sở dữ liệu cho dù hệ thống có xẩy ra lỗi.

## Cấu trúc transaction
Một transaction được định nghĩa dựa trên:
* BEGIN TRANSACTION: Bắt đầu một transaction
* SAVE TRANSACTION: Đánh dấu vị trí trong transaction(điểm đánh dấu)
* ROLLBACK TRANSACTION: Quay lui lại đầu transaction hoặc điểm đánh dấu trước đó trong transaction.
* COMMIT TRANSACTION: Đánh dấu điểm kết thúc của một transaction, khi câu lệnh này thực thi có nghĩa là transaction thực hiện thành công.
* ROLLBACK WORK: Quay lui lại đầu transaction.
* COMMIT WORK: Đánh dấu kết thúc transaction.

Một transaction được bắt đầu bởi câu lệnh `BEGIN TRANSACTION`. Câu lệnh này đánh  dấu điểm bắt đầu transaction và kết thúc trong các trường hợp sau:
* Câu lệnh `COMMIT TRANSACTION` (hoặc `COMMIT WORK`) được thực
thi. Câu lệnh này báo hiệu sự kết thúc thành công của một transaction. Sau câu
lệnh này, một transaction mới sẽ được bắt đầu.
* Khi câu lệnh `ROLLBACK TRANSACTION` (hoặc `ROLLBACK WORK`)
được thực thi để huỷ bỏ một `transaction` và đưa `cơ sở dữ liệu` về trạng thái như
trước khi `transaction` bắt đầu. Một `transaction` mới sẽ bắt đầu sau khi câu lệnh
`ROLLBACK` được thực thi.
* Một `transaction` cũng sẽ kết thúc nếu trong quá trình thực hiện gặp lỗi (chẳng
hạn hệ thống gặp lỗi, kết nối mạng,...). Trong trường hợp này, hệ
thống sẽ tự động phục hồi lại trạng thái cơ sở dữ liệu như trước khi `transaction`
bắt đầu (tương tự như khi câu lệnh ROLLBACK được thực thi để huỷ bỏ một
giao tác). Tuy nhiên, trong trường hợp này sẽ không có `transaction` mới được bắt
đầu.

Sau khi câu lệnh `ROLLBACK TRANSACTION` được sử dụng để quay lui lại
một điểm đánh dấu trong `transaction`, `transaction` vẫn được tiếp tục với các câu lệnh sau đó.
Nhưng nếu câu lệnh này được sử dụng để quay lui lại đầu `transaction` ,`transaction` sẽ kết thúc và do đó câu lệnh COMMIT TRANSACTION trong trường
hợp này sẽ gặp lỗi.

## Transaction lồng nhau
Khi các `transaction` SQL được lồng vào nhau, `transaction`
ngoài cùng nhất là `transaction` có vai trò quyết định. Nếu `transaction` ngoài cùng nhất được uỷ
thác (commit) thì các `transaction` được lồng bên trong cũng đồng thời uỷ thác; Và nếu
`transaction` ngoài cùng nhất thực hiện lệnh `ROLLBACK` thì những `transaction` lồng bên trong
cũng chịu tác động của câu lệnh này (cho dù những `transaction` lồng bên trong đã thực
hiện lệnh `COMMIT TRANSACTION`).