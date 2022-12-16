![](https://images.viblo.asia/5c1f5b78-53d6-47f9-be6f-fe543d2bc5c2.jpeg)

Rails transactions là cách để đảm rằng một tập hợp các thao tác với database sẽ chỉ xảy ra nếu tất cả tập lệnh đó thành công. Nếu một trong những tập lệnh đó thất bại thì dữ liệu sẽ trở lại trạng thái trước đó.

### 1. Sử dụng căn bản
Để chứng minh sự hữu dụng của nó, chúng ta sẽ cùng nhau đi vào một ví dụ `chuyển tiền` trong ngân hàng để cùng tìm hiểu. 
Bài toán chuyển tiền vô cùng đơn giản:

> Ted chuyển tiền cho John, John chỉ nhận được tiền khi Ted mất số tiền tương ứng.
> 

```
def transfer_money
 
  ActiveRecord::Base.transaction do
    john.update!(money: john.money + 100)
    ted.update!(money: ted.money - 100)
  end
 
end
```

Thật đơn giản phải không ? Bằng cách này, nếu có bất kì lỗi gì xảy ra bên trong khối giao dịch, toàn bộ dữ liệu sẽ được khôi phục về trạng thái trước đó.

Để ý chúng ta vừa sử dụng hàm `update!` thay vì `update`.  Bởi vì `update` không rase ra `errors` mà chỉ trả về `false`, nó sẽ không thể kích hoạt được `rollback` trong `transaction`.

Hãy ghi nhớ `errors` được trả về bởi hàm `update!` sẽ hiển thị một trang lỗi cho người dùng của bạn. Nhưng chúng ta sẽ tìm hiểu cách xử lý với điều đó trong chủ đề tiếp theo.

### 2. Rescuing erros trong Transaction

Khi chúng ta sử dụng `!` trong ActivieRecord, chúng ta có thể đoán được một số lỗi có thể xảy ra, phổ biến nhất là `ActiveRecord::RecordInvalid`.

Những `errors` đó sẽ được thông báo trong một số trường hợp khi bạn thao tác với những bản ghi không hợp lệ.

```
def transfer_money(amount)
 
  ActiveRecord::Base.transaction do
    john.update!(money: john.money + amount)
    ted.update!(money: ted.money - amount)
  end
 
rescue ActiveRecord::RecordInvalid
  puts "Oops. We tried to do an invalid operation!"
end
```

Trong ví dụ trên, `amount` có thể không hợp lệ, dẫn tới một giá trị không hợp lệ cho thuộc tính `money`.

Chúng ta đã xử lý việc `rescuing` từ lỗi `RecordInvalid` và in ra một thông báo cho người dùng.

### 3. Kích hoạt một Rollback
Đôi khi chúng ta muốn hủy một `transaction` bằng tay. Giống như ví dụ:
```
def transfer_money
 
  ActiveRecord::Base.transaction do
    john.update!(money: john.money + 100)
    ted.update!(money: ted.money - 100)
    raise ActiveRecord::Rollback if john.is_an_asshole?
  end
 
end
```
 Trong kịch bản này chúng ta sẽ đưa ra một lỗi theo logic đã được định nghĩa từ trước là `is_an_asshole?`  =)). Nếu join không thỏa mãn điều kiện đó thì toàn bộ `transaction` sẽ bị dừng lại.
 
 Một điều cần lưu ý rằng `ActiveRecord::Rollback` không thực sự gây ra lỗi, nó chỉ được sử dụng để kích hoạt từ bên trong giao dịch.
 
### 4. Nested transactions

Cùng quan sát ví dụ dưới:

```
def transfer_money
 
  ActiveRecord::Base.transaction do
    john.update!(money: john.money + 100)
    ted.update!(money: ted.money - 100)
 
    ActiveRecord::Base.transaction do
      transfer.create!(amount: 100, receiver: john, sender: ted)
    end
 
  end
 
end
```

Trong trường hợp này, mỗi giao dịch sẽ xảy ra và `rollback` độc lập với nhau. Nhưng vẫn sẽ được gắn với một kết nối với cơ sở dữ liệu.

Một điều cần chú ý là trong ví dụ trên, một lỗi bên trong giao dịch bên trong sẽ `rollback` giao dịch bên ngoài bởi vì chúng ta đang không `rescuing` bất cứ gì cả.

### 5. Mở rộng
Thông thường chúng ta sẽ được hướng dẫn sử dụng transaction với cú pháp:

> ActiveRecord::Base.transaction do
> 

Nhưng chúng ta cũng có thể sử dụng:

> User.transaction do
> 

Hoặc

> john.transaction do
> 

Trên thực tế không có sự truy vấn khác biệt trong số đó nhưng với cá nhân tác giả bài viết này luôn cố gắng sử dụng `record.transaction` càng nhiều càng tốt, vì với tác giả việc kiểm tra giao dịch sau này sẽ dễ dàng hơn.

**Rails transactions được gắn với một kết nối database**
Một khi `transaction` đang chạy, một kết nối cơ sở dữ liệu đang được mở. Vì vậy, hãy cố gắng thực hiện ít nhất có thể trong `transaction`, nếu không bạn sẽ chặn kết nối tới database trong thời gian nhiều hơn mà bạn có thể giảm bớt.

Nguồn: https://medium.com/@kristenrogers.kr75/rails-transactions-the-complete-guide-7b5c00c604fc