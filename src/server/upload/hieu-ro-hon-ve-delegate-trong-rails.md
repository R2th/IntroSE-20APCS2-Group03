# Lời mở đầu
Trong bài viết này mình sẽ giải thích về phương thức `delegate` trong Ruby on Rails, khái niệm, lý do nên sử dụng và cách sử dụng hợp lí thông qua các ví dụ nho nhỏ.

# Nội dung
![](https://images.viblo.asia/42714955-ea8a-47e0-8fe7-2f8540218db3.png)


## Delegate là gì?

Theo như API chính thức mô tả: 

> Provides a delegate class method to easily expose contained objects’ public methods as your own.

Cung cấp cho đối tượng một class method `delegate` để dễ dàng gọi các public method của các object khác giống như là của chính đối tượng đó.

```ruby
delegate(*methods, to: nil, prefix: nil, allow_nil: nil)
```

## Tại sao nên dùng Delegate?

Định luật Demeter là một nguyên tắc thiết kế để phát triển phần mềm, đặc biệt là các chương trình hướng đối tượng. Định luật này được phát biểu như sau: 
> Hãy tối giản sự hiểu biết của 1 object về cấu trúc, thuộc tính của các object khác ngoài nó (bao gồm các thành phần con). 

Việc này giúp cho các thành phần trong hệ thống ít phụ thuộc vào nhau hơn, dễ dàng hơn trong việc đóng gói và tái sử dụng.

Phương thức `delegate` trong Rails giúp chúng ta áp dụng định luật này bằng cách chỉ cho phép truy cập các phương thức cần thiết của đối tượng cha và bằng cách đó, giúp việc truy cập tới các thuộc tính của chúng dễ dàng hơn.


## Làm sao để sử dụng Delegate?

Ví dụ, chúng ta có 2 ActiveRecord models có quan hệ `has_many` như sau:

```ruby
class GiftBox < ActiveRecord::Base
  has_many :kit_kats
end

class KitKat < ActiveRecord::Base
  belongs_to :gift_box
end
```

Hãy mở `rails console` lên và xem 2 model này có những thuộc tính gì nào:

```ruby
[3] pry(main)> GiftBox.column_names
=> [“id”, “name”, “description”, “image_url”, “created_at”, “updated_at”]
[4] pry(main)> KitKat.column_names
=> [“id”, “gift_box_id”, “message”, “created_at”, “updated_at”]
```

Bây giờ chúng ta sẽ lấy `name` và `description` của `GiftBox` thông qua `KitKat`, thông thường chúng ta sẽ làm như sau:

```ruby
[5] pry(main)> kit_kat = KitKat.find(13)
[6] pry(main)> kit_kat.gift_box.name
=> "Rainy"
[7] pry(main)> kit_kat.gift_box.description
=> "For Valentine's Day"
```

Vậy là chúng ta đã lấy được `name` và `description` thông qua mối quan hệ với `GiftBox`

Nhưng nếu chúng ta sử dụng phương thức `delegate`, chúng ta có thể lấy được `name` và `description` một cách dễ dàng và tiện lợi hơn. Hãy sửa lại KitKat model một chút.

```ruby
class KitKat < ActiveRecord::Base
  belongs_to :gift_box
  
  delegate :name, :description, to: :gift_box
end
```

Bằng cách sử dụng delegate, mình đã khiến `name` và `description` của GiftBox như là những phương thức của KitKat rồi. Từ bây giờ chúng ta có thể lấy được chúng mà không cần phải gọi đến `:gift_boxs` nữa bằng cách như sau:

```ruby
[10] pry(main)> kit_kat.name
=> "Rainy"
[11] pry(main)> kit_kat.description
=> "For Valentine's Day"
```

### `:prefix`
Nhưng nếu trong chính model KitKat cũng có phương thức `name` thì sao? Lúc đấy chúng ta cần sử dụng option `:prefix`:

```ruby
class KitKat < ApplicationRecord 
  belongs_to :gift_box

  delegate :name, :description, to: :gift_box, prefix: true
  
  def name
    "Matcha"
  end
end
```

Lúc đấy chúng ta có thể gọi 2 phương thức `name` như sau:
```ruby
[10] pry(main)> kit_kat.name
=> "Matcha"
[11] pry(main)> kit_kat.gift_box_name
=> "Rainy"
```

Chúng ta có thể custom được tên prefix tuỳ ý, ví dụ như `prefix: :show`

```ruby
[11] pry(main)> kit_kat.show_name
=> "Rainy"
```

### `:allow_nil`

Nếu như đối tượng trong `:to` có giá trị `nil`, nó sẽ bắn ra một Exception:

```ruby
[34] pry(main)> KitKat.new.name
Module::DelegationError: KitKat#name delegated to gift_box.name, but gift_box is nil: #<KitKat id: nil, gift_box_id: nil, description: nil, created_at: nil, updated_at: nil>
```

Để tránh việc trả về **`Module::DelegationError`**, chúng ta có thể thêm option `allow_nil: true` vào `delegate`:

```ruby
class KitKat < ApplicationRecord
 
  belongs_to :gift_box
  
  delegate :name, :description, to: :gift_box, allow_nil: true
end
```

```ruby
[36] pry(main)> KitKat.new.name
=> nil
```

# Tham khảo
1. https://apidock.com/rails/Module/delegate
2. http://en.wikipedia.org/wiki/Law_of_Demeter