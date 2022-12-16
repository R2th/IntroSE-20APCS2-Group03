Đối với những bạn mới bắt đấu bước vào Rails, thì thuật ngữ Scope nghe có vẻ rất mơ hồ nhưng thực chất đây lại là 1 điểm nhấn rất hữu dụng của Rails.
* Scope là một tập hợp các câu lệnh truy vấn được xác định trước và có thể dễ dàng kết hợp với nhau để truy vấn đến các dữ liệu phức tạp.
* Scope là 1 công cụ tuyệt vời của Rails giúp chúng ta dễ dàng truy vấn dữ liệu thay vì phải viết những cậu lệnh SQL thuần, phức tạp.
* Giờ hãy cùng đi đến cú pháp để mường tượng scope như thế nào :
- Scope sẽ nhận 2 tham số đầu vào là : 
    + Tên của scope ( cái mà bạn sẽ sử dụng để gọi scope này )
    +  Lambda ( cái mà sẽ thực hiện các câu lệnh truy vấn )
```
class User < ApplicationRecord
    scope :admin, ->{ where role: 1}
end
```
Để sử dụng chỉ cần gõ User.admin, Scope trên cũng tương đương với câu lệnh truy vấn :
```
SELECT * FROM user WHERE role = 1
```
**Vậy khi nào ta nên dùng scope?**

* Xét thử 1 ví dụ như sau :
* Giả sử ta có một method index  (Trong controller ) muốn hiện thị tất cả các quyển sách mà có tiêu đề nhiều hơn 30 kí tự :
```
def index
    @book = BOOK.where("LENGTH(title) > 30")
end
```
Chúng ta thấy khá ổn nhỉ ? nhưng thử đặt ra trường hợp bạn cũng muốn dùng câu truy vấn này ở 1 số method khác , ở các vị trí khác nhau => Trùng lặp code => Khiến cho project khó theo dõi , maintain.
* Giải pháp : Chúng ta sẽ sử dụng Scope như sau 
+ Vào file model của Book ( book.rb )
```
 class Book < ApplicationRecord
     scope :with_long_title, -> { Where("LENGTH(title) > 30") }
 end
```
+ Sau khi định nghĩa scope thì controller của chúng ta sẽ nhìn như sau:
```
def index
    @book = Book.with_long_title
end
```
=> Qua đây, ta thấy việc sử dụng code sẽ tránh được việc trùng lặp code và clean code hơn, tạo điều kiện thuận lợi cho việc maintain code !

**Có thể sử dụng tham số đối với Scope?**
* Câu trả lời là có !
* Hãy xem thử ví dụ nhé :
```
class Book < ApplicationRecord
     scope :with_long_title, ->(length) { where("LENGTH(title) > ?", length) }
 end
```
* Điểm khác biệt với ví dụ xét trên là chúng ta có thêm dấu hỏi chấm "?", dấu này giống như 1 placeholder, nó sẽ được thay thế bởi giá trị của tham số length.
* Gõ câu lệnh Book.with_long_title(30)  tương đương với câu truy vấn :
```
    SELECT * FROM book WHERE LENGTH(title) > 30
```
sẽ trả về cho chúng ta 1 collection gồm các quyển sách có tiêu đề dài hơn 30 kí tự.

**Tóm lại :**
* Scope khiến code clean hơn vì cú pháp của nó.
* Scope được sử dụng cho 1 tác vụ rất cụ thể là truy vấn , nên bạn có thể hiểu ngay target của đoạn code khi bạn nhìn thấy scope
* Scope thì không được trộn lẫn với bất cứ method nào, nên bạn có thể dễ dàng nhận ra nó .
* Tái sử dụng lại scope
* Kết hợp được với toán tử điều kiện
* Kết hợp các câu scope đơn giản lại để viết những câu truy vấn phức tạp
    
 => Chúng ta hãy học cách sử dụng Scope 1 cách hiệu quả để không còn bối rối trước những câu truy vấn phức tạp và tạo 1 thói quen code cleaner và tránh trùng lặp code nhé !