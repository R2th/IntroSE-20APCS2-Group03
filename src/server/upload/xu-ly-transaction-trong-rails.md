## I. Tổng quan
`Transaction` là một thuật ngữ chung trong thiết kế phần mềm,  nó được hiểu như một tiến trình xử lý có xác định điểm đầu và điểm cuối, được chia nhỏ thành các operation (phép thực thi).
<br>
Tiến trình được thực thi một cách tuần tự và độc lập các operation đó theo `nguyên tắc hoặc tất cả đều thành công hoặc một operation thất bại thì toàn bộ tiến trình thất bại.`
 Nếu việc thực thi một operation nào đó bị fail đồng nghĩa với việc dữ liệu phải rollback lại trạng thái ban đầu.
 <br> 
Trong rails, transaction giúp dữ liệu trong database được toàn vẹn, tức là các thay đổi trong cơ sở dữ liệu chỉ được giữ lại khi tất cả các câu lệnh SQL trong transaction đều được thực hiện thành công. 

## II. Cách sử dụng 
Để sử dụng transaction trong rails có nhiều cách:
* Call by `ActiveRecord::Base`
   ```ruby
   ActiveRecord::Base.transaction do
      # code
   end
   ```
  
* Call by `Class`
   ```ruby
   Account.transaction do
       # code
   end
    ```

* Call by `instance`
   ```ruby
   account.transaction do
      # code
   end
   ```
 Nhưng thông thường Call by ActiveRecord::Base được sử dụng phổ biến hơn cả
 Có một lưu ý là object bên trong transaction `không nhất thiết phải được tạo từ class gọi nó`. Ta xét ví dụ sau:
 
  ```ruby
  Account.transaction do
    balance.save!
    account.save!
  end
  ```
  Như ta thấy đối tượng `balance` bên trong transaction không phải là instance của `Account` mặc dù transaction được gọi bởi class Account. Đó là bởi vì `transaction được thực hiện trên kết nối database chứ ko phải trên model`
  
##   III. Kích hoạt rollback và xử lý exception 
  Trong rails, transaction thành công nếu có commit được thực hiện, thất bại nếu có bất kỳ `exception` nào được raise lên. 
<br>
  Exception sẽ tự động kích hoạt `rollback` dữ liệu về lại trạng thái trước khi bắt đầu transaction.
  
  ```ruby
  def self.transfer_handle_ex_1 user1, user2
    ActiveRecord::Base.transaction do
      user1.update!(money: user1.money + 100)
      user2.update!(money: user2.money1 - 100)
    end
  end
  ```
`money1` ở ví dụ trên không tồn tại nên exception `NoMethodError` sẽ được raise và kích hoạt rollback 

![](https://images.viblo.asia/3921874c-cfb1-47c5-891a-15b6cefed67c.png)
  <br><br>
`Các exception` sau khi kích hoạt rollback cũng `sẽ được ném ra ngoài` nên chúng ta cần `phải xử lý các exception` đó, chẳng hạn như in ra một đoạn thông báo thân thiện với người dùng.

```ruby
def self.transfer_handle_ex_1 user1, user2
  ActiveRecord::Base.transaction do
    user1.update!(money: user1.money + 100)
    user2.update!(money: user2.money1 - 100)
  end
rescue NoMethodError
  puts "Opp! Has errors"
end
```
<br>
**Lưu ý:** 

* Vì rollback được kích hoạt bởi exception nên để đảm bảo tính đúng đắn của transaction, bên trong nó ta nên sử dụng các method có raise exception nếu fail như: `create!`, `update!`, `save!` ... <br>
* `save` và `destroy` tự động được gói lại trong 1 transaction.
<br>
<br>
  
Ngoài việc `rollback` được `kích hoạt tự động` bởi exception ta cũng có thể kích hoạt `thủ công` bằng cách `raise ActiveRecord::Rollback`.
  ```ruby
  def self.transfer user1, user2
    ActiveRecord::Base.transaction do
      user1.update!(money: user1.money + 100)
      user2.update!(money: user2.money - 100)
      raise ActiveRecord::Rollback if user2.money < 1500
    end
end
```
Ở đây, `ActiveRecord::Rollback` là một exception đặc biệt, nó chỉ có nhiệm vụ kích hoạt rollback mà không được ném ra ngoài.
<br>
## IV. Transaction lồng nhau (nested transaction)
Trong Rail transaction có thể lồng nhau, nhưng bất kỳ exception nào (kể cả `ActiveRecord::Rollback`) bên trong `sub-transaction` cũng không thể kích hoạt rollback. Để có thể kích hoạt rollback trong sub-transaction ta cần thêm tùy chọn `requires_new: true` vào sub-transaction đó.
```ruby
def self.nested_transaction user1, user2
  ActiveRecord::Base.transaction do
    user1.update!(money: user1.money + 100)
    
    ActiveRecord::Base.transaction(requires_new: true) do
      user2.update!(money: user2.money - 100)
      raise ActiveRecord::Rollback
    end
  end
end
```
Kết quả sẽ chỉ có money của user1 được update. Tuy nhiên `chỉ có một số database hỗ trợ nested transaction`.
<br>

## V. Callback
Có hai loại callbacks liên quan đến commit và rollback trong transaction: `after_commit` và `after_rollback`.
* after_commit được gọi tới ngay sau khi transaction thực hiện thành công.
* after_rollback được gọi tới ngay sau khi transaction bị rollback.

## VI. Tài liệu tham khảo
* https://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html
* https://makandracards.com/makandra/42885-nested-activerecord-transaction-pitfalls