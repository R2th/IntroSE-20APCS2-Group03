Nested attributes cho phép bạn lưu các thuộc tính trên các model có liên kết với nhau. 
Mặc định thì nested attribute đã bị tắt và bạn phải thêm  #accepts_nested_attributes_for vào model.  
Tên của nested attribute được đặt tên với hậu tố là _attributes.

```
class Book < ActiveRecord::Base
  has_one :author
  has_many :pages

  accepts_nested_attributes_for :author, :pages
end
```

Với ví dụ này ta sẽ có author_attributes và pages_attributes.

# One-to-one

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar
end
```

Với liên kết 1-1 cho phép bạn Member và Avatar trong 1 lần:

```
params = { member: { name: 'Jack', avatar_attributes: { icon: 'smiling' } } }
member = Member.create(params[:member])
member.avatar.id # => 2
member.avatar.icon # => 'smiling'
```

Bạn cũng có thể update khi truyền id vào nested attribute:

```
params = { member: { avatar_attributes: { id: '2', icon: 'sad' } } }
member.update params[:member]
member.avatar.icon # => 'sad'
```

Nếu bạn không truyền id vào, cũng có thể sử dụng option :update_only 

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end
```

Mặc định bạn có thể tạo hoặc cập nhật với nested attribute, nhưng nếu muốn xoá bạn phải sử dụng option :allow_destroy

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, allow_destroy: true
end
```

Và sau đó bạn phải thêm vào tham số của attribute _destroy: “1” để có thể xoá:

```
member.avatar_attributes = { id: '2', _destroy: '1' }
member.avatar.marked_for_destruction? # => true
```

Chú ý: model con sẽ không bị xoá cho đến khi save được gọi từ model cha và bạn phải thêm id của model muốn xoá vào attribute hash.

# One-to-many

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end
```

Với mối quan hệ 1-n thì cũng không khác gì quan hệ 1-1. Bạn chỉ cần lưu ý nested attribute phải là số nhiều giống với has_many là: posts_attributes.

```
params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '', _destroy: '1' } # this will be ignored
  ]
}}
```

Bạn có thể sử dụng :reject_if để bỏ qua một vài trường hợp với điều kiện của bạn.

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :reject_posts

  def reject_posts(attributes)
    attributes['title'].blank?
  end
end
```

# Saving

Với tất cả sự thay đổi hay xoá model thì việc lưu lại và xoá sẽ được tự động khi model cha gọi hàm save. 
Điều này xảy ra trong một transaction của model cha.

# Các option hỗ trợ cho accepts_nested_attributes_for

### :allow_destroy

Cho phép xoá một vài model với id và _destroy: true (gía trị chấp nhận 1, ‘1’, true, ‘true'). Mặc định option này đã tắt.

### :reject_if

Cho phép bạn đưa ra điều kiện để thay đổi với Proc trả về true hoặc false.

### :limit

Cho phép bạn giới hạn số lượng model được tạo ra. Có thể sử dụng Proc trả về một giá trị number. 
Chú ý nó chỉ áp dụng với quan hệ 1-n.

### :update_only

Với quan hệ 1-1, cho phép bạn cập nhật giá trị của model con trong nested attribute mà không cần truyền vào id của nó.