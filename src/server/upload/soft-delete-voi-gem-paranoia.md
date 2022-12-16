## Giới thiệu
Soft delete: Đôi khi ta cần xóa các bản ghi trong CSDL một cách không hoàn toàn nghĩa là chỉ quy ước là bản ghi đấy là đã xóa nhưng không xóa hẳn trong CSDL, điều này cho phép bảo vệ dự liệu của hệ thống. Với Gem Paranoia cho phép chúng ta  Soft delete các bản ghi đánh dấu chúng là bị xóa thông qua một cột trong bảng.
## Cài đặt
**Với Rails 3**
```
gem "paranoia", "~> 1.0"
```

**Rails 4 and 5**
```
gem "paranoia", "~> 2.2"
```
Sau đó chạy `bundle install`

**Add deleted_at to Model** <br>
`bin/rails generate migration AddDeletedAtToClients deleted_at:datetime:index`

Chạy migrate: `rails db:migrate`
## Sử dụng
Để model sử dụng soft delete thêm `acts_as_paranoid` trong model
```
class Client < ActiveRecord::Base
  acts_as_paranoid

  # ...
end
```

**Test soft delete**
```
client = Client.first
```
```
>> client.deleted_at
# => nil
>> client.destroy
# => client
>> client.deleted_at
# => [current timestamp]
```
Nếu bạn thiệt sự muốn xóa bản ghi hoàn toàn thì gọi `really_destroy!`
```
>> client.deleted_at
# => nil
>> client.really_destroy!
# => client
```
### Phạm vi

* with_deleted: Cho phép tìm mọi bản ghi, bao gồm những bản ghi đã xóa.
```
Client.with_deleted
```

* without_deleted: Cho phép tìm các bản ghi không bao gồm bản ghi đã xóa
```
Client.without_deleted
```

* restore:  Cho phép khôi phục lại các bản ghi đã soft delete
```
Client.restore(id)
# or
client.restore
```

* Nếu muốn khôi phục lại một loạt bản ghi
```
Client.restore([id1, id2, ..., idN])
```
*  Với những quan hệ `dependent: :destroy` và `acts_as_paranoid` 
```
class Client < ActiveRecord::Base
  acts_as_paranoid

  has_many :emails, dependent: :destroy
end

class Email < ActiveRecord::Base
  acts_as_paranoid

  belongs_to :client
end
```
=> Khi gọi `destroy` từ  đối tượng cha `client`, nó sẽ gọi `destroy` trên tất cả quan hệ con `emails`:
```
>> client.emails.count
# => 5
>> client.destroy
# => client
>> client.deleted_at
# => [current timestamp]
>> Email.where(client_id: client.id).count
# => 0
>> Email.with_deleted.where(client_id: client.id).count
# => 5
```
=> Và khi gọi `really_destroy!`từ đối tượng cha, thì mỗi `email` cũng sẽ `really_destroy!`
```
>> client.emails.count
# => 5
>> client.id
# => 12345
>> client.really_destroy!
# => client
>> Client.find 12345
# => ActiveRecord::RecordNotFound
>> Email.with_deleted.where(client_id: client.id).count
# => 0
```
=> Còn trường hợp nếu model con không có `acts_as_paranoid` thì `destroy` gọi ở cha thì những quan hệ con sẽ bị xóa hoàn toàn khỏi database:
```
class Client < ActiveRecord::Base
  acts_as_paranoid

  has_many :emails, dependent: :destroy
end

class Email < ActiveRecord::Base
  belongs_to :client
end

>> client.emails.count
# => 5
>> client.destroy
# => client
>> Email.where(client_id: client.id).count
# => 0
>> Email.with_deleted.where(client_id: client.id).count
# => NoMethodError: undefined method `with_deleted' for #<Class:0x0123456>
```
## Nguồn:
Trên chỉ là bài giới thiệu nhỏ cơ bản để thử làm quen với gem paranoia, còn chi tiết hơn thì bạn có thể tham khảo thêm trên: <br>
https://github.com/rubysherpas/paranoia <br>
https://rubyinrails.com/2018/02/21/rails-soft-delete-with-paranoia-gem/