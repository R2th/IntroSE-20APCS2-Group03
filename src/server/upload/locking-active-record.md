# Đặt vấn đề
Bạn hãy tưởng tượng điều gì xãy ra nếu một người sở hửu một tài khoản ngân hàng có 500 vnd nhưng đồng thời tiến anh chuyển 500 vnd này cho 500 người.
Tất nhiên là chỉ chuyển được lần đầu thôi đúng không. Tuy nhiên nếu điều này xãy ra trên ứng dụng của chính bạn thì sao.
Đây là cách mà request thứ nhất đã được thực hiện 
```
#account.balance = 500
account = Account.find 5 
# the transfer amount is 500
if account.balance >= transfer_amount
  #it's good, allow user to tranfers
  account.balance = account.balance - transfer_amount
  #account.balance is now 0
  account.save
end
```
Nhưng sau khi thực hiện account.balance = account.balance - transfer_amount và trước khi lưu vào Database, CPU thực hiện các yêu cầu thứ hai (với cùng code)
Chắc chắn là nó được phép chuyển khoản vì trong Database lúc này vẫn  đang là 500
# Giải pháp
Trong ruby on rails bằng cách sử dụng Locking Active Record, chúng ta có thể ngăn chặn tình trạng tương tự. Khi Locking được đặt ra, họ sẽ không cho phép hai tiến trình đồng thời cập nhật các đối tượng trong cùng một thời điểm.

Có hai loại Locking : Optimistic và Pessimistic.
# Optimistic Locking
Loại này cho phép nhiều request đồng thời truy cập đến cùng một đối tượng để đọc giá trị của nó những chỉ duy nhất một request được cập nhật giá trị của đối tượng tại cùng một thời điểm.
```
a1 = Account.find 5
a2 = Account.find 5

a1.balance = 500
a2.balance = 1000

a1.save
a2.save  # Raises a ActiveRecord::StaleObjectError
end
```
Active Record đã hỗ trợ optimistic locking nếu tồn tại trường lock_version. Rails sẽ tự động kiểm tra trước khi cập nhật các đối tượng. Cơ chế của nó là khá đơn giản. Mỗi lần các đối tượng được cập nhật, giá trị lock_version sẽ được tăng lên. Do đó, nếu hai yêu cầu muốn thực hiện cùng một đối tượng, yêu cầu đầu tiên sẽ thành công vì lock_version của nó cũng giống như khi nó được đọc. Nhưng yêu cầu thứ hai sẽ thất bại vì lock_version đã được tăng lên trong cơ sở dữ liệu của các yêu cầu đầu tiên.

Trong loại locking này, bạn có trách nhiệm xử lý các ngoại lệ trả lại khi cập nhật hành động không thành nếu không rails sẽ phóng lỗi ActiveRecord::StaleObjectError
Để tắt chức năng này bạn chỉ cần thiết lập ActiveRecord::Base.lock_optimistically = false. Còn muốn thay đỗi tên trường mà bạn muốn đặt khóa, tại model bạn thực hiện. 
```
class Account < ActiveRecord::Base
  self.locking_column = :lock_balance
end
```

# Pessimistic Locking
Khác với Optimistic Locking. Loại này không chỉ ngăn chặn việc cập nhật đôí tượng, mà nó còn ngăn chặn luôn việc đọc đối tượng đồng thời. Cụ thể để thực hiện ta làm như sau.
```
account = Account.find 5
account.lock!
#no other users can read this account, they have to wait until the lock is released
account.save! 
#lock is released, other users can read this account
```

Ngoài method lock!  còn có lock('some locking clause') và with_lock. Bạn có thể tìm hiểu thêm tại đây
http://api.rubyonrails.org/classes/ActiveRecord/Locking/Pessimistic.html
# Kết luận
Data consistency là một vấn đề quan trọng, đặc biệt là khi xây dựng ứng dụng có liên quan đến tiền. 
Locking nên được sử dụng phụ thuộc vào yêu cầu. Nếu không có bất kỳ yêu cầu đặc biệt, Optimistic locking là đủ bởi vì nó là linh hoạt hơn và nhiều hơn nữa yêu cầu đồng thời có thể được phục vụ. Trong trường hợp của Pessimistic Locking, bạn cần phải chắc chắn rằng bạn mở khóa khi bạn hoàn thành việc cập nhật các đối tượng.