### Đặt vấn đề

Giả dụ, 2 vợ chồng cùng dùng chung 1 thẻ atm và đang dư 1 củ.

Một hôm đẹp giời, cô vợ thấy cái váy xinh đặt hàng online và thanh toán bằng internet banking, cái váy giá 500k.
Cũng hôm đẹp trời đó, thì anh chồng lại cần phải thanh toán 1 khoản vừa tròn 1 củ
Và xem như hai cái hành động này đồng thời xảy ra => cả hai giao dịch vẫn thành công.


Ta thấy rõ vấn đề ở đây, sau khi thanh toán internet banking giá cái váy thì số dư chỉ còn 500k và trên lý thuyết là người chống sẽ không thể thanh toán đủ số tiền 1 củ kia. Nhưng tại sao giao dịch vẫn xảy ra?

Như thế thì quá hời cho cả 2 vợ chồng :)) => ngưng ảo tưởng ngay nhé. `Locking` sẽ giải quyết hết vấn đề này. 

`Locking` là cơ cấu cho phép ngăn ngừa các hành động có thể gây ra xung đột trên đối tượng với những gì đã thực hiện và hoàn thành trước đó của đối tượng đó. Khi làm việc trên cơ sở dữ liệu đa người dùng, xung đột giữa nhiều người sử dụng cùng thực hiện là thường xuyên xảy ra. Khi khóa được thiết lập sẽ không cho phép hai tiến trình cập nhật đồng thời các đối tượng cùng 1 lúc.

Có 2 loại `locking` là: `Optimistic` và `Pessimistic`.

![](https://images.viblo.asia/fad587f3-af0f-4f26-bcc5-4f092470d3d0.png)

### 1. Optimistic Locking

Với `Optimistic lock` nhiều người dùng có thể cùng truy cập đến đối tượng và đọc dữ liệu từ nó. Nhưng khi có 2 hay nhiều người dùng muốn update đối tượng đó thì chỉ người truy cập đầu tiên mới có thể update, những người dùng khác sẽ bị bắn ra exception.

```
c1 = Candidate.find(10)
c2 = Candidate.find(10)
c1status = "success"
c1.save

c2.status = "fail"
c2.save => #Raises a ActiveRecord::StaleObjectError

//Optimistic locking will also check for stale data when objects are destroyed

c1 = Candidate.find(10)
c2 = Candidate.find(10)

c1.name = "Tieu Tu Uyen"
c1.save

c2.destroy # Raises an ActiveRecord::StaleObjectError

```

Để dùng được `optimistic locking` thì chúng ta cần thêm 1 trường là `lock_version` vào model chúng ta muốn sử dụng, Rails sẽ tự động kiểm tra cột này trước khi đối tượng được update. Mỗi lần cập nhật bản ghi thì giá trị `lock_version` sẽ được tăng lên. Do đó, đảm bảo việc chỉ request đầu tiên được thực hiện trong trường hợp có 2 hoặc nhiều hơn các request muốn cập nhật cùng một object vì lúc này `lock_version` có giá trị giống như lúc nó được đọc. Còn request sau đó fail và raise ra 1 exception là `StaleObjectError ` bởi vì `lock_version` của nó thực sự đã được cập nhật ở lần request thứ nhất và lúc này giá trị `lock_version` sẽ không tương ứng với giá trị lúc nó được đọc.


### 2. Pessimistic Locking

Với khóa này, thì chỉ người dùng đầu tiên truy cập vào đối tượng mới có thể update được nó. Những người dùng khác không thể update và ngay cả việc đọc dữ liệu từ đối tượng cũng không thể. Đây là điểm khác biệt của `pessimistic locking` với `optimistic locking`.

Rails sẽ thiết lập `Pessimistic Locking` bằng một truy vấn đặc biệt trong DB.

*Ví dụ:*  

```
//khi muốn lấy ra một object là account và muốn khóa nó lại cho đến khi update xong:

account = Account.find_by_user_id(10)
account.lock!
#no other users can read this account, they have to wait until the lock is released
account.save! 
#lock is released, other users can read this account
```


Hoặc chúng ta cũng có thể dùng với `with_lock` như sau:

```
account = Account.first
account.with_lock do
  # This block is called within a transaction,
  # account is already locked.
  account.balance -= 100
  account.save!
end
```

Túm váy lại là, việc sự dụng khóa nào cho phù hợp thì hoàn toàn phụ thuộc vào requirements của ứng dụng. Tuy nhiên nếu không có quá nhiều những requirement đặc biệt thì vẫn nên sử dụng `Optimistic locking` bởi tính linh hoạt của nó cũng như việc nó cho phép nhiều người dùng có thể cùng truy cập đọc dữ liệu từ đối tượng cùng 1 lúc.

**Thanks for your reading!**


Tham khảo từ [understanding-locking-in-rails-activerecord](http://thelazylog.com/understanding-locking-in-rails-activerecord/) và [optimistic-or-pessimistic-locking-which-one-should-you-pick](https://blog.couchbase.com/optimistic-or-pessimistic-locking-which-one-should-you-pick/)