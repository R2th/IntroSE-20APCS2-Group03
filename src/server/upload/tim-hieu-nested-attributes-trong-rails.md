# 1. Khái niệm
> **Nested attibutes** là một tính năng của Active Record, hỗ trợ tạo mới bản ghi thông qua bản ghi cha của nó. Mặc định tính năng không được kích hoạt, muốn sử dụng chúng ta phải khai báo trong Model muốn thực hiện. Kích hoạt nó bằng phương thức: `accepts_nested_attributes_for`

```
class Book < ActiveRecord::Base
  has_one :author
  has_many :pages

  accepts_nested_attributes_for :author, :pages
end
```

`accepts_nested_attributes_for :model_name` ở ví dụ trên sẽ tạo ra 2 phương thức mới: `author_attributes=(attributes)` và `pages_attributes=(attributes)`

> Option `:autosave` sẽ tự động được bật trên mọi liên kết mà accepts_nested_attributes_for được sử dụng
# 2. Cách sử dụng
## 2.1. Quan hệ 1-1

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar
end
```

=> Chỉ tạo được duy nhất 1 lần trong mối quan hệ 1-1

```
params = { member: { name: 'Jack', avatar_attributes: { icon: 'smiling' } } }
member = Member.create(params[:member])
member.avatar.id # => 2
member.avatar.icon # => 'smiling'
```

=> Cũng có thể cập nhật bản ghi con avatar thông qua member, lưu ý bản ghi cha phải được `save` thì bản ghi con mới được `save`

```
params = { member: { avatar_attributes: { id: '2', icon: 'sad' } } }
member.update params[:member]
member.avatar.icon # => 'sad'
```

=> Nếu bạn muốn update avatar mà không cần cung cấp `:id` thì phải thêm option `:update_only`
```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end
```

```
params = { member: { avatar_attributes: { icon: 'sad' } } }
member.update params[:member]
member.avatar.id # => 2
member.avatar.icon # => 'sad'
```

=> Mặc định chỉ cho `create `và `update` trên model liên kết, nếu bạn muốn `destroy` thông qua bản ghi cha thì trước tiên ta cần thêm option `:alow_destroy`, sau đó thêm `_destroy` vào attributes hash, với value là `true `thì ta sẽ hủy được bản ghi con.

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, allow_destroy: true
end

member.avatar_attributes = { id: '2', _destroy: '1' }
member.avatar.marked_for_destruction? # => true
member.save
member.reload.avatar # => nil
```
> Bản ghi con sẽ không được destroy nếu bạn ghi cha chưa được lưu

## 2.2. Quan hệ 1-n

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end
```
=> Đối với mỗi hàm băm không có khóa `:id`, một bản ghi mới sẽ được khởi tạo, trừ khi hàm băm cũng chứa khóa` _destroy :true`

```
params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '', _destroy: '1' } # bỏ qua
  ]
}}
```

```
member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen
```

=> Chúng ta cũng có thể đặt option `:reject_if` proc để bỏ qua bất kỳ hàm băm bản ghi mới nào nếu chúng không đạt yêu cầu do mình đề ra. Với ví dụ trên

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: proc { |attributes| attributes['title'].blank? }
end

params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '' } # this will be ignored because of the :reject_if proc
  ]
}}

member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

=> một số cách khác khi dùng với `:reject_if`

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :new_record?
end

class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :reject_posts

  def reject_posts(attributes)
    attributes['title'].blank?
  end
end
```

=> Nếu hash chứa khóa `:id` khớp với bản ghi đã được liên kết, bản ghi phù hợp sẽ được `update`

```
member.attributes = {
  name: 'Joe',
  posts_attributes: [
    { id: 1, title: '[UPDATED] An, as of yet, undisclosed awesome Ruby documentation browser!' },
    { id: 2, title: '[UPDATED] other post' }
  ]
}
member.posts.first.title # => '[UPDATED] An, as of yet, undisclosed awesome Ruby documentation browser!'
member.posts.second.title # => '[UPDATED] other post'
```
> Tuy nhiên, điều trên chỉ áp dụng nếu mô hình cha cũng đang được cập nhật. Ví dụ: nếu bạn muốn tạo một member có tên Joe và muốn cập nhật các post cùng lúc, điều đó sẽ gây ra lỗi `ActiveRecord :: RecordNotFound`. 
> 
> Để destroy bản ghi con thì ta cũng làm tương tự với quan hệ 1-1

## 2.3. Các option thường được sử dụng
* `  :allow_destroy`  Cho phép xóa bản ghi con, truyền vào `_destro`y một giá trị true sẽ thực hiện việc xóa các bản ghi con. Bản ghi chỉ được xóa khi bản ghi cha đã lưu thành công.
* `:reject_if`  Cho phép chỉ định một Proc hoặc một Symbol trỏ đến method kiểm tra điều kiện, cả hai có giá trị trả về là `true/false`. Khi false, `:reject_if` không được gọi, nested attributes sẽ được tạo với đầy đủ giá trị cho từng trường ngoại trừ `_destroy`, khi điều kiện trả về false thì trường ` _destroy` sẽ được gán giá trị `true` để hủy đi bản ghi đó.
* `:limit`  (1-n) Cho phép chỉ định số lượng bản ghi con tối đa có thể tạo được trong bản ghi cha. Nếu số lượng bản ghi con vượt quá giới hạn limit thì raised exception `NestedAttributes :: TooManyRecords`
* `:update_only`  (1-1) Nếu muốn update bản ghi con mà không cần thêm `:id`

## 2.4. Tóm lại
* Cách mà Nested_attributes nhận biết lúc nào là create, update hay destroy bản ghi con ==> Nó dựa vào trường `:id` có trong parmas của bản ghi con. Nếu params của bản ghi con không có`:id` thì nó là `create`, khi có `:id` sẽ là `update` và khi có `:id` và trường `_destroy` có giá trị 1 (true) thì sẽ là `destroy` (nhớ là có option :alow_destroy nữa nhé)
* Trường hợp chúng ta `create` hay `update` nhiều bản ghi con, mà một trong những bản ghi con bị `false` thì sao ==> Thì transaction sẽ tự động `rollback` và tất cả bản ghi con, và bản ghi cha sẽ không được lưu, vì các action như create, update, destroy đều nằm trong transaction của nested_attributes và nó luôn đảm bảo tính thống nhất của dữ liệu. Vì vậy khi 1 bản ghi gặp lỗi thì transaction sẽ `rollback database `về trạng thái trước transaction.
# 3. Tham khảo
To be continued...

https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html

Bài viết đầu tiên còn nhiều thiếu sót rất mong các bạn thông cảm, bài sau mình sẽ hướng dẫn các bạn về cách dùng `Nested Attributes `thực tế . Cảm ơn các bạn đã scroll chuột tới đây :laughing: !