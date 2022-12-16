Đã lâu không quay lại chủ đề này, vì trước mấy ku em bảo mình viết hàn lâm khó hiểu quá nên mình chuyển qua dạng vấn đáp xem có dễ hiểu hơn chút nào không? Các bạn có góp ý vui lòng comment nhé!

Toàn bộ series tại [đây](https://viblo.asia/s/toi-uu-database-DVK2jDrnKLj)

Chuyện kể rằng xưa cụ Nguyễn Du có ngồi tìm cách tìm kiếm tập câu hỏi trong bộ Kim Vân Kiều Truyện để làm nên bộ Đoạn Trường Tân Thanh bất hủ.  Cụ tìm ra cách đánh chỉ mục perfect được viết trong tác phẩm khác từ Từ Hải Thúy Kiều truyện. Sao không phải là Kim Kiều mà chọn Từ Hải, vì ông Kim Trọng đến chậm không cứu được Kiều mà chỉ lấy được Vân mà trong cơ sở dữ liệu chậm là cụ ghét rồi, còn sao cụ chọn Từ Hải, vì ông này đầu hàng nhanh quá treo cả server (Chết đứng ấy) nên cụ chọn. Mấy chương này kể chuyện Thúy Vân hỏi Từ Hải làm sao anh lại nhanh thế.

Thúy Kiều: Em có một câu hỏi quan trọng muốn hỏi, ví dụ trong câu WHERE em có hai điều kiện, thì đánh một index chứa hai trường tốt hơn, hay đánh mỗi trường một index tốt hơn.

Từ Hải: Thực ra câu này đơn giản. Trong đa số trường hợp dùng 1 index chứa nhiều trường sẽ tốt hơn.

Thúy Kiều: Còn thiểu số thì sao?

Từ Hải: Có những trường hợp về bản chất một index không thể hoạt động hoàn hảo dù em có định nghĩa index kiểu gì đi chăng nữa. Ví dụ truy vấn theo hai kiểu range như dưới đây

```
SELECT first_name, last_name, date_of_birth 
  FROM employees
 WHERE UPPER(last_name) < ? 
   AND date_of_birth    < ?
```

Thúy Kiều: Với câu truy vấn thế kia đúng là không dùng được thật, vì bản chất index là Linked List. Nếu sắp xếp nhân viên theo thứ tự từ A-Z thì tuổi cũng không thế đúng thứ tự được. Trường hợp này dùng được một index trên UPPER(last_name) thôi. Nhưng em để ý một tý là nếu câu trên là bằng ví dụ (UPPER(last_name)=A) thì một index trên hai trường này lại hoàn hảo đúng không?.

Từ Hải. Uk đúng vậy vì nếu là bằng với điều kiện đầu, thì thứ tự sẽ tiếp tục điều kiện thứ hai. Nhưng đang nói trong trường hợp range thì index chỉ hoạt động được một nửa, nếu điều kiện thứ nhất kia có độ select cao ( nghĩa là có thể lấy về số lượng bản ghi nhỏ) thì index vẫn hiệu quả.

Thúy Kiều: Để cho xịn em có thể xem trường nào có selectivity cao em đặt index trường đó lên trước được không? 

Từ Hải: Cái này thường thì cũng hiệu quả (chứ không phải luôn luôn), tuy nhiên cần so sánh nhiều yếu tố chứ không phải lúc nào cũng cho trường có selectivity cao nhất lên. Tốt nhất là nó nên được dùng trong điều kiện Access predicate (“access”) ( Nghĩa là nó lấy được ngay dữ liệu ra mà không cần duyệt qua Linked List). Còn nếu là Filter predicate ( Nghĩa là phải duyệt qua Linked list) thì còn tùy. Ví dụ với câu truy vấn trên, với date_of_birth công ty có 365 ngày mà có tuổi từ 22 tới 60. Giả sử rằng  tìm những người 50 tuổi có tên đứng trước vần B chả hạn. Có 50000 ông trên 50 tuổi duyệt trên index, rồi mới tìm vài ông bắt đầu bằng A Ă Â . Thì lúc này dù date_of_birth selectivity cao nhưng vấn lấy về nhiều bản ghi trên index, trong khi số nhân viên có tên bắt đầu bằng A, Á, Â ít chả hạn thì hiệu năng vẫn chậm bình thường.

Thúy Kiều: Trường hợp này chơi hai index riêng biệt trên hai cột được không?

Từ Hải: Cũng được lúc này database sẽ duyệt qua hai index độc lập rồi merge với nhau. Tuy nhiên thay vì duyệt qua một index, nó phải duyệt hai lần nên tốn hiệu năng và tốn tài nguyên hơn. Hơn nữa nó tốn RAM và CPU hơn để tổng hợp kết quả. Em hãy nhớ một index thì nhanh hơn hai.

Thúy Kiều: Vậy database làm thế nào để tổng hợp hai index?

Từ Hải: Có hai cách, cách một là index join nghĩa là tìm trên hai index rồi join với nhau ra kết quả. Cách hai là dùng bitmap index

Thúy Kiều: Nghĩa là sao

Từ Hải: bitmap index là một kiểu index trên nhiều cột em hiểu thế là được, nó hỗ trợ việc combine nhiều index lại một như kiểu ô bàn cờ ấy. Tuy nhiên bitmap index rất tốn hiệu năng cho các thao tác thêm sửa xóa dữ liệu, gần như không thể đọc ghi đồng thời, cho nên nó thường không được dùng cho dữ liệu online mà thường dùng trong warehouse. 

Kiều: Vậy anh nói làm gì mất công?

Từ Hải: Vì nhiều database sử dụng hệ thống lai giữa Btree và Bitmap index. Nếu không cách nào xịn hơn nó sẽ dùng Btree lấy dữ liệu rồi load vào bitmap index trên bộ nhớ, lúc này nó có thể kết hợp hiệu quả. Trường hợp này bitmap được tạo ra rồi xóa ngay sau khi thực thi xong nên không gây ra vấn đề hiệu năng khi ghi nữa. Tuy nhiên làm kiểu này thì ăn RAM, CPU nhiều hơn Chư Bát Giới nên cũng không tính là ngon lắm.

Kiều: Vậy chốt lại là thông thường 1 index kết hợp nhiều trường ngon hơn hai index mỗi trường đúng không? Còn trường hợp kia thỉnh thoảng mới bị lúc đó cần phân tích kỹ hơn đúng không?

Từ Hải: Chốt! Đúng rồi

Các bạn có thể Join hai group này để cùng xây dựng cộng đồng lập trình viên level quốc tế nhé

[Facebook](https://www.facebook.com/groups/3277228842495302)
[Telegram](https://t.me/+8mH3YcWnBZNjZmZl)