### Giới thiệu
Rails transaction là một cách để đảm bảo một tập các thao tác trên database chỉ được thực hiện khi mà tất cả đều thành công. Nếu không, dữ liệu sẽ rollback về trạng thái trước đó.

### Cách dùng cơ bản:
```
ActiveRecord::Base.transaction do
  david.update!(money: david.money + 100)
  marry.update!(money: marry.money - 100)
end
```

Ví dụ trên sẽ chỉ thực hiện được khi tất cả các câu lệnh trong block đều không `raise exception`. Exception dừng transaction lại và thực hiện `rollback` database về trạng thái trước khi transaction bắt đầu. Đó cũng chính là lí do sử dụng `update! `thay vì `update` bởi vì `update` không `raise exception` mà chỉ trả về `false`.

Một điều lưu ý là các dữ liệu mà thể hiện của object sử dụng trong `transaction` (david, mary) sẽ không trở về trạng thái trước đó.

### Xử lý exception và rollback

Các `exception` sau khi kích hoạt `rollback` cũng sẽ được ném ra ngoài nên chúng ta cần phải xử lý các exception đó. Trong đó phổ biến nhất là` ActiveRecord::RecordInvalid`, khi mà dữ liệu bạn muốn thêm hay thay đổi vào cơ sở dữ liệu không hợp lệ.

```
ActiveRecord::Base.transaction do
  david.update!(money: david.money + 100)
  marry.update!(money: marry.money - 100)
  
  rescue ActiveRecord::RecordInvalid
    puts "Marry's money is not enough"
  end
end
```

Trong ví dụ này chúng ta đã xử lý trường hợp money có thể không hợp lệ (có giá trị âm) , cụ thể là in ra một đoạn thông báo thân thiện với người dùng. Tương tự như với các `exception` khác và việc xử lý tùy thuộc vào bạn.


### Kích hoạt một rollback 

Chúng ta cũng có thể hủy bỏ `transaction` một cách thủ công, bằng cách `raise exception` dựa theo logic của chương trình.

```
ActiveRecord::Base.transaction do
  david.update!(money: david.money + 100)
  marry.update!(money: marry.money - 100)
  raise ActiveRecord::Rollback if david.account_is_blocked?
end
```
`ActiveRecord::Rollback` là một trường hợp đặc biệt. Nó chỉ kích hoạt `rollback` chứ không thực sự là một `exception`. Ở ví dụ này, transaction có thành công hay không phụ thuộc vào kết quả của function `account_is_blocked?`

### Nested Transaction
Transaction có thể lồng với nhau. Khi đó transaction con (gọi là `sub-transaction`) là 1 phần của transaction cha. Tuy nhiên `exception` trong` sub-transaction` sẽ không kích hoạt bất kỳ `rollback `nào. Để có thể rollback trong nested transaction, ta phải thêm option `requires_new: true` vào `sub-transaction`. Khi đó, rollback sẽ chỉ thực hiện trong phạm vi `sub-transaction`. 

```
ActiveRecord::Base.transaction do
  david.update!(money: david.money + 100)
  ActiveRecord::Base.transaction(requires_new: true) do
    marry.update!(money: marry.money - 100)
    raise ActiveRecord::Rollback
  end
end
```
Kết quả sẽ chỉ có money của david được `update`. Tuy nhiên chỉ có một số database hỗ trợ nested transaction.

### Callback
Trong Rails transaction có 2 loại callback là `after_commit` và `after_rollback`

* `after_commit` được gọi tới ngay sau khi  transaction thực hiện thành công.
* `after_rollback` được gọi tới ngay sau khi transaction bị rollback.

Callback thường được dùng để tương tác với các hệ thống khác, đảm bảo được sự đồng nhất với database bởi callback chỉ được gọi đến khi khi database đã ở trạng thái ổn định. Xét ví dụ sau:

```
after_commit :save_in_file, on: :update

ActiveRecord::Base.transaction do
  david.update!(money: david.money + 100)
  marry.update!(money: marry.money - 100)
  raise ActiveRecord::Rollback if david.account_is_blocked?
end
```

Giả sử function `save_in_file` lưu lại giá trị money của david sau mỗi transaction vào file trong hệ thống. Nếu không sử dụng callback `after_commit`, thì trường hợp transaction bị rollback, chương trình sẽ vẫn lưu david.money (đã thay đổi) vào file, tạo ra sự không đồng nhất với database.

### Một số lưu ý khác
* `save` và `destroy` mặc định thuộc một transaction.
* Trong một transaction, có thể gọi tới nhiều model, hay ActiveRecord class khác nhau.
* Transaction chỉ hoạt động trên một kết nối database duy nhất.
* Khi thực hiện transaction, database sẽ khóa các bản ghi bị ảnh hưởng đến khi transaction kết thúc. Vì vậy ta cần tránh các trường hợp xung đột transaction.

### Tham khảo
http://codeatmorning.com/rails-transactions-complete-guide/

http://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html