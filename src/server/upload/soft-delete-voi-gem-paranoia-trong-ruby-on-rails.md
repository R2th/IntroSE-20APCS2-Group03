# 1.Đặt vấn đề
   Đôi khi chúng ta cần xóa một bản ghi một cách không hoàn toàn.Thông thường, khi chúng ta gọi phương thức destroy trong rails , bản ghi sẽ được xóa hoàn toàn trong Database.
Ví dụ: Xóa một bản ghi trong bảng `Center`:
``` ruby
center = Center.first
center.destroy
```
bản ghi trên sẽ được xóa khỏi Database qua câu truy vấn:
``` sql
DELETE FROM "centers" WHERE "centers"."id" = 1
```
  Soft delete là cách đơn giản để bảo vệ an toàn cho dữ liệu của hệ thống. Bằng việc không xóa hoàn toàn record trong Database, mà chỉ đưa nó về một trạng thái nào đó được quy ước là đã xóa, tức không còn tồn tại trong các câu truy vấn thông thường.Trước khi đi vào tìm hiểu cách sử dụng gem paranoia để thực hiện soft delete, chúng ta hãy cân nhắc một số điểm sau trước khi quyết định sử dụng soft delete trong hệ thống của mình.
*   Nếu thực hiện `hard delete`, tức xóa hoàn toàn record trong database bằng câu truy vấn DELETE quen thuộc, rất đơn giản chúng ta đã xóa hoàn toàn các dữ liệu cần loại bỏ. Không còn dữ liệu dư thừa trong hệ thống, nó sẽ chạy nhanh hơn; nhưng cùng với điều đó là chúng ta không thể khôi phục lại dữ liệu đã xóa, dữ liệu đó đã mất vĩnh viễn nếu bạn không có bản backup nào cho nó.
* Thay vì dùng `hard delete`, chúng ta sử dụng `soft delete` để giữ lại các bản ghi đã bị loại bỏ. Có một vấn đề xảy ra: chúng ta đã không xóa bất kỳ của relation của bản ghi đã xóa, mà có thể là những thứ sẽ gây ra lỗi nghiêm trọng mà chúng ta không lường đến. Để khắc phục việc này, bạn sẽ phải chuyển việc xử lý những rắc rối đó sang cho ứng dụng của mình, mà chưa chắc rằng các cách xử lý đó sẽ khắc phục hết những rắc rối do những record relation đó sinh ra. Cùng với đó là việc các query không được xóa sẽ làm cho hệ thống của chúng ta nặng nề hơn, dẫn đến việc thực hiện các query khác cũng chậm hơn.
# 2.Cài đặt gem paranoia
Thêm `gem "paranoia", "~> 2.2"` vào `Gemfile.` 
Sau đó chạy `bundle install` để cài đặt.
Ở đây, chúng ta có một model `Center`. Để sử dụng `soft delete` cho model `Center`, chúng ta cần thêm cột `deleted_at` vào bảng `Center`.

Bằng cách chạy lệnh `migration`.


``` ruby
rails generate migration AddDeletedAtToCenters deleted_at:datetime:index
```
Sau đó thêm vào model `acts_as_paranoid` để model `Center` có thể  thực hiện `soft delete`:

``` ruby
class Center < ApplicationRecord
  acts_as_paranoid
end
```
# 3.Sử dụng
Bây giờ khi chúng ta gọi phương thức `destroy`, mọi bản ghi trong bảng `Center` đều sẽ được `soft delete`.

```ruby
center = Center.first
center.destroy
```
 Lúc này trường `deleted_at` sẽ được cập nhật thông qua câu truy vấn SQL:
``` sql
UPDATE "centers" SET deleted_at = '2018-07-06 16:27:46.017491' WHERE "centers"."deleted_at" IS NULL AND "centers"."id" = 1
```
gía trị của cột `deleted_at` sẽ được cập nhật bằng thời gian hiện tại.
    
* Nếu muốn xóa hoàn toàn bản ghi, ta dùng lệnh
``` ruby
Center.really_destroy!
```

* Nếu muốn tìm mọi bản ghi, bao gồm những bản ghi đã xóa ta dùng lệnh: 

``` ruby
Center.with_deleted 
```

* Nêú muốn tìm bản ghi, không bao gồm bản ghi đã xóa ta dùng lệnh:

```ruby
Center.without_deleted
```
* Nếu muốn khôi phục lại các bản ghi đã `soft delete`, ta dùng lệnh:
```ruby
Center.restore(id)
# hoặc
Center.restore
```
Lúc này trường `deleted_at` sẽ được cập nhật lại bằng NULL thông qua câu truy vấn SQL:
`UPDATE "centers" SET deleted_at = NULL WHERE "centers"."id" = 1`

* Với những bản ghi có quan hệ `dependently destroyed` cần lưu ý rằng bất bất kỳ phương thức nào được gọi trên model cha cũng sẽ được gọi trên model con. Ví dụ:
``` ruby
class Center < ActiveRecord::Base
  acts_as_paranoid

  has_many :users, dependent: :destroy
end

class User < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :center
end
```

* Khi ta gọi `destroy` ở model `Center` thì phương thức `destroy` cũng được gọi ở model `User`
Ví dụ: 

```ruby
center = Center.first
center.users.count
# => 2
center.destroy
# => 
User.where(center_id: client.id).count
# => 0
User.with_delete.where(center_id: center.id).count
# => 2
```
* Nếu muốn khôi phục những model có quan hệ `dependently destroyed` ta dùng
```ruby
 center.restore(:recursive => true)   
```
* Tương tự khi ta gọi phương thức `really_destroy!` ở `center` thì phương thức `really_destroy!` cũng được gọi đến mỗi `user` thuộc `center` đó.
Ví dụ:

```ruby
center = Center.first
center.users.count
# => 2
center.id
# => 1
center.really_destroy!
Center.find 1
# => ActiveRecord::RecordNotFound
User.with_deleted.where(client_id: 1).count
# => 0
```
* Trường hợp nếu model `User` không có `acts_as_paranoid` thì khi gọi `destroy` ở `Center` thì `User` sẽ bị xóa hoàn toàn `hard delete` khỏi database. 
Ví dụ: 
```ruby
class Center < ActiveRecord::Base
  acts_as_paranoid

  has_many :users, dependent: :destroy
end

class User < ActiveRecord::Base
  belongs_to :client
end

center.users.count
# => 2
center.destroy
>> User.where(center_id: center.id).count
# => 0
>> User.with_deleted.where(center: center.id).count
# => NoMethodError: undefined method `with_deleted' for #<Class:0x0123456>
```


Trên đây là một chút chia sẻ về cách sử dụng `gem paranoia` Hi vọng bài viết này có thể giúp mọi người có thêm lựa chọn khi xóa một bản ghi nào đó bằng cách sử dụng `gem paranoia`. Cám ơn mọi người đã đọc bài chia sẻ.