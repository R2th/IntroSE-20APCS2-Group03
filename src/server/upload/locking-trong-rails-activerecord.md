Tính nhất quán của dữ liệu rất quan trọng trong nhiều ứng dụng, đặc biệt đối với ứng dụng liên quan đến tài chính, ngân hàng, v.v ...Một lỗi nhỏ có thể trở thành thảm kịch nếu chúng ta không đối xử nghiêm túc với nó. 

## Tại sao Locking cần thiết?

Hãy tưởng tượng bạn đang xây dựng một ứng dụng trong đó người dùng sẽ có một tài khoản với một khoản tiền ảo. Và người dùng có id 5 đang truy cập trang web để sử dụng tiền ảo trên, chúng ta có truy xuất tài khoản như sau:

```ruby
account = Account.find(5)
```

Sau khi chọn món đồ yêu thích của mình với giá 50$, anh ta nhấp vào thanh toán và bắt đầu thanh toán cho mặt hàng đó. Trước khi thực hiện yêu cầu, trước tiên chúng ta sẽ kiểm tra xem anh ta có đủ tiền trong tài khoản của mình hay không và nếu có chúng ta sẽ giảm số dư trong tài khoản của anh ấy một số tiền tương ứng với giá của mặt hàng đó. 

```ruby
if account.balance >= item.price
	account.balance = account.balance - item.price
	account.save
end
```

Chúng ta có thấy thì logic này rất đúng. Tuy nhiên nếu anh này sử dụng một tab khác trong web và chọn một mục khác với giá 80$ và bằng cách nào đó đồng thời nhấp vào thanh toán trên cả hai tab. 
Mặc dù rất khó xảy ra nhưng không có gì là không thể. Vì lý do nào đó mà request trên tab đầu tiên và thứ 2 đến máy chủ gần như cùng lúc và cả 2 được server xử lý đồng thời

```ruby
#account.balance = 100
account = Account.find_by_user_id(5) 


#item.price is 50
if account.balance >= item.price
  #it's good, allow user to buy this item
  account.balance = account.balance - item.price
  
  #account.balance is now 50

  account.save
end

```

Nhưng sau khi thực hiện `account.balance = account.balance - item.price` và trước khi lưu đối tượng tài khoản, CPU chuyển sang thực thi yêu cầu thứ hai (với cùng mã).

```ruby

account = Account.find_by_user_id(5) 
#account.balance is still 100

#item.price is 80
if account.balance >= item.price
  #it's good, allow user to buy this item
  account.balance = account.balance - item.price
  
  #account.balance is now 20

  account.save
end

```

Tôi chắc chắn bạn có thể thấy sự cố ngay bây giờ. Mặc dù sau khi mua mặt hàng đầu tiên, chúng ta nghĩ rằng người dùng chỉ còn lại 50$ trong tài khoản của mình và theo lý thuyết, anh ta không thể mua một mặt hàng khác có giá lớn hơn 50$. Nhưng ở đây, anh ta có thể mua cả hai mặt hàng vì nó thỏa mãn điều kiện.

Bằng cách sử dụng `Lock`, chúng ta có thể ngăn chặn tình huống tương tự. Khi `Lock` tại chỗ, chúng sẽ không cho phép hai quá trình đồng thời cập nhật cùng một đối tượng trong cùng một thời điểm.

##  Chúng ta có hai loại khóa: `Optimistic` và `Pessimistic`. 

### Optimistic Locking

Trong loại khóa này, nhiều người dùng có thể truy cập cùng một đối tượng để đọc giá trị của nó nhưng nếu hai người dùng thực hiện cập nhật đồng thời, chỉ một người dùng sẽ thành công và người dùng khác sẽ nhận được ngoại lệ

```ruby
p1 = Person.find(1)
p2 = Person.find(1)

p1.first_name = "Michael"
p1.save

p2.first_name = "should fail"
p2.save # Raises a ActiveRecord::StaleObjectError
```

Để tạo khóa Optimistic, bạn có thể tạo cột `lock_version` trong model của bạn muốn đặt khóa và Rails sẽ tự động kiểm tra cột này trước khi cập nhật đối tượng.
Cơ chế của nó khá đơn giản. Mỗi khi đối tượng được cập nhật thì cột `lock_version` sẽ được tăng lên.
Do đó, nếu hai yêu cầu muốn thực hiện cùng một đối tượng. Và yêu cầu đầu tiên sẽ thành công vì `lock_version` của nó giống như khi nó được đọc. Nhưng yêu cầu thứ hai sẽ thất bại vì `lock_version` đã được tăng lên trong cơ sở dữ liệu theo yêu cầu đầu tiên.
Khi sử dụng loại khoá này, chúng ta có nhiệm vụ phải xử lý ngoại lệ được trả về khi thao tác cập nhật không thành công. Bạn có thể đọc thêm ở đây: [Optimistic](http://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html).

### Pessimistic Locking

Với kiểu Lock này, chỉ người dùng đầu tiên truy cập vào đối tượng mới có thể cập nhật nó. Tất cả những người dùng khác sẽ bị loại trừ ngay cả khi đọc đối tượng (hãy nhớ rằng trong khóa Optimistic, chúng ta chỉ khóa nó khi cập nhật dữ liệu và người dùng vẫn có thể đọc được).

Rails thực hiện Pessimistic Lock bằng cách tạo ra một truy vân đặc biệt trong cơ sở dữ liệu. Ví dụ: giả sử bạn muốn truy vấn tới  đối tượng `Account` và khóa đối tượng đó cho đến khi bạn cập nhật xong.

```ruby
account = Account.find(5)
account.lock!
#no other users can read this account, they have to wait until the lock is released
account.save! 
#lock is released, other users can read this account
```


Việc biết ý tưởng nào nên được sử dụng hoàn toàn phụ thuộc vào các yêu cầu được đề ra. Nếu nó không có bất kỳ yêu cầu đặc biệt, khóa Optimistic là đủ bởi vì nó là linh hoạt hơn và yêu cầu đồng thời hơn có thể được phục vụ. Trong trường hợp Pessimistic Lock, bạn cần đảm bảo rằng bạn nhả khóa khi bạn cập nhật xong đối tượng.


Nếu bạn quan tâm, bạn có thể đọc thêm từ các nguồn khác:

1. http://blog.couchbase.com/optimistic-or-pessimistic-locking-which-one-should-you-pick
2. https://4loc.wordpress.com/2009/04/25/optimistic-vs-pessimistic-locking/
3. http://api.rubyonrails.org/classes/ActiveRecord/Locking/Pessimistic.html
4. http://api.rubyonrails.org/classes/ActiveRecord/Locking/Optimistic.html

## Kết luận

Cám ơn bạn đã đọc bài viết, với locking thì mình nghĩ đây là một kỹ năng rất cần thiết để tránh trường hợp xảy ra lỗ hổng hệ thống cơ sở dữ liệu và gây ra rất nhiều những bất cập trong dữ liệu.

Bài viết mình dịch tại trang http://thelazylog.com/understanding-locking-in-rails-activerecord/.