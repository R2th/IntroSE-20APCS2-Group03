# Transactions
## I. Tổng quan
**Transaction** là một kỹ thuật trong việc lập trình, nó xử lý có tuần tự các thao tác trên cơ sở dữ liệu . Khi một transaction thực hiện thành công nghĩa là tất cả các thay đổi dữ liệu được thực hiện trong transaction được lưu vào cơ sở dữ liệu. Ngược lại khi một transaction bị lỗi và được rollback thì tất cả các sửa đổi dữ liệu sẽ bị xóa, dữ liệu sẽ khôi phục trở về trạng thái chưa thực hiện **transaction**.
## II. Các thuộc tính của Transaction
 **Atomicity - Tính bảo toàn**: nguyên tắc "all or nothing", đảm bảo rằng tất cả các câu lệnh trong nhóm lệnh được thực thi thành công. Nếu không, Transaction bị hủy bỏ tại thời điểm thất bại và tất cả các thao tác trước đó được khôi phục về trạng thái cũ đồng nghĩa với việc không có gì thay đổi về mặt dữ liệu.
 
 **Consistency - Tính nhất quán**: đảm bảo rằng cơ sở dữ liệu thay đổi chính xác các trạng thái khi một transaction được thực thi thành công.
 
 **Isolation - Tính độc lập**: cho phép các Transaction hoạt động độc lập và minh bạch với nhau.
 
 **Durability - Tính bền vững**: đảm bảo rằng kết quả của một transaction được xác định, không có chuyện dữ liệu của Transaction sau khi thực thi có thể chuyển lại trạng thái dữ liệu lúc trước khi thực hiện.
## III. Cách sử dụng Transaction trong Rails
Trước khi nói đến cách sử dụng của transaction hãy hình dung ra một bài toán có thể giải quyết bằng **Transaction**. Giả sử bạn đang tham gia một trò chơi cá cược kết quả một trận đấu bóng đá và đối thủ của bạn là một người nào đó bất kỳ với một số điểm cược là 100. Khi bạn dự đoán đúng số điểm của người thua sẽ chuyển sang cho bạn, hay nói cách khác hệ thống sẽ thực hiện 2 thao tác là trừ điểm của người đoán sai và cộng điểm cho người đoán đúng. Ví dụ sau đây sẽ sử dụng transaction để thực hiện 2 thao tác trên:
```ruby
def update_score 
  ActiveRecord::Base.transaction do
    user1.update!(score: user1.score + 100)
    user2.update!(score: user2.score - 100)
  end
end
```
Ở ví dụ trên `user1` được cộng 100 điểm và `user2` bị trừ 100 điểm, ta sử dụng `update!` thay vì dùng `update` vì khi update không thành công thì `update!` bắn ra **exception** còn `update` chỉ trả về giá trị `true/fail`.

Ở trên tôi đã giới thiệu cho các bạn 1 cách sử dụng của transaction ngoài ra ta còn 2 cách khác để sử dụng transaction trong Rails.

* Call by `class`
    ```ruby
    User.transaction do
      #code
    end
    ```
*  Call by `instance`
    ```ruby
    user.transaction do
      #code
    end
    ```
    
   **Lưu ý**: `object` bên trong transaction không nhất thiết phải được tạo từ class gọi nó, ví dụ:
   ```ruby
   User.transaction do
     bet.save!
     user.save!
   end
   ```
   Đối tượng `bet` bên trong transaction không phải là instance của `User`, từ đó suy ra transaction được thực hiện dựa trên kết nối từ database chứ không phải trên model.
  
## IV. Kích hoạt rollback và xử lý exception
Như đã nói ở trên, khi một thao tác trong transaction không được thực hiện, thì transaction đó sẽ bị hủy, khi đó  `exception` sẽ được bắn ra. `Exception` sẽ tự động kích hoạt `rollback` dữ liệu về trạng thái ban đầu.
Dưới đây là một ví dụ mà `rollback` được kích hoạt tự động:

Ở trong `user.rb`:

`validates :score, numericality: { greater_than: 0 }`

Ở đây ta thực hiện validates trường score luôn lớn hơn 0.
```
ActiveRecord::Base.transaction do
  user1.update!(score: user1.score + 1000)
  user2.update!(score: user2.score - 1000)
end
```
Kết quả: 

![](https://images.viblo.asia/e4e2d91d-bb84-4265-84dd-bd3afff1cd6c.png)

Như ta thấy Rails bắn ra exception và transaction bị ROLLBACK, vì score không chấp nhận giá trị nhỏ hơn 0.

**Xử lý exception**

Như ta thấy các `exception` sau khi kích hoạt `rollback` sẽ được đưa ra ngoài như ví dụ trên. Vì vậy chúng ta cần xử lý `exception` trên. Để xử lý `exception` trên ta có thể sử dụng `rescue` bắt ngoại lệ để in ra thông báo cho người sử dụng.

```ruby
def update_score user1, user2
  ActiveRecord::Base.transaction do
    user1.update!(score: user1.score + 1000)
    user2.update!(score: user2.score - 1000)
  end
  rescue ActiveRecord::RecordInvalid
  puts "Oops. Has errors"
end
```
Kết quả: 
![](https://images.viblo.asia/09722807-641f-4b7f-97f7-9dbb222c0e18.png)

Tuyệt! :D

Ngoài việc `rollback` được kích hoạt tự động bởi `exception` ta cũng có thể kích hoạt thủ công bằng cách sử dụng raise `ActiveRecord::Rollback` như ví dụ sau đây:

```ruby
def update_score user1, user2
  ActiveRecord::Base.transaction do
    user1.update!(score: user1.score + 100)
    user2.update!(score: user2.score - 100)
    raise ActiveRecord::Rollback if user2.score < 1500
  end
end
```
Ở đây, `ActiveRecord::Rollback` là một `exception` đặc biệt, nó chỉ có nhiệm vụ kích hoạt `rollback`.

## V. Transaction lồng nhau (nested transaction)
Trong Rails `transaction` có thể lồng nhau,  bất kỳ `exception` nào (kể cả `ActiveRecord::Rollback`) bên trong `sub-transaction` cũng không thể kích hoạt rollback. Để có thể kích hoạt rollback trong sub-transaction ta cần thêm tùy chọn `requires_new: true` vào `sub-transaction` đó.
```ruby
def nested_update_score user1, user2
  ActiveRecord::Base.transaction do
    user1.update!(score: user1.score + 100)
    
    ActiveRecord::Base.transaction(requires_new: true) do
      user2.update!(score: user2.score - 100)
      raise ActiveRecord::Rollback
    end
  end
end
```
Kết quả: là chỉ có user1 được update score.

## VI. Callback
Có 2 loại `callbacks` liên quan đến việc `commit` và `rollback` trong `transaction` là: `after_commit` và `after_rollback`.

* `after_commit` được gọi tới ngay sau khi transaction thực hiện thành công.
* `after_rollback` được gọi tới ngay sau khi transaction bị rollback.
## VII. Kết luận
Trên đây là những kiến thức cơ bản về kĩ thuật `transaction` trong `Rails`, hi vọng những kiến thức trên giúp các bạn đang bắt đầu tìm hiểu `Ruby on Rails` có thể hiểu và sử dụng được `transaction` trong công việc.

Cảm ơn!

Tài liệu tham khảo: https://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html
https://medium.com/@kristenrogers.kr75/rails-transactions-the-complete-guide-7b5c00c604fc