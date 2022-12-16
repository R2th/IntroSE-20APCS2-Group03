![](https://images.viblo.asia/cc48b721-d5c8-4c27-9567-5775cc5b61c6.jpeg)

Khi bạn bắt đầu code Ruby, chắc ai cũng trải qua những lần sử dụng các câu lệnh điều kiện if/else để xác thực dữ liệu đầu vào được nhập bởi người dùng và ngăn chặn sự phá vỡ CLI trong ứng dụng của các bạn. Mình chắc chắn rằng các bạn có thể hiểu rằng đây không phải là cách hiệu quả nhất để code của bạn được an toàn và bảo mật - mặc dù trước đó bạn đã biết đến Active Record, nó cực kỳ mạnh mẽ, tiết kiệm thời gian. Trong bài viết này, tôi sẽ phác thảo tầm quan trọng của việc sử dụng các xác nhận hợp lệ và một số hỗ trợ validate của Active Record mà mình hay sử dụng.

## Tại sao cần Validations?

Validations được sử dụng để đảm bảo chỉ có dữ liệu hợp lệ mới được lưu trữ trong cơ sở dữ liệu của bạn. Có nhiều cách để xác thực dữ liệu trong  Ruby, nhưng theo tài liệu của Ruby, validation ở tầng model là phù hợp nhất trong hầu hết các trường hợp.

Như bạn biết, lưu một đối tượng tương quan đến một hàng trong cơ sở dữ liệu của bạn là một quá trình gồm 2 bước trong Active Record. Đầu tiên, chúng ta sẽ khởi tạo đối tượng.

`rails_girl_supporter = User.new("Kanye", 323-290-5589)`

Thứ hai, đối tượng được lưu và tồn tại trong cơ sở dữ liệu.

`rails_girl_supporter.save`

Thời điểm bạn lưu đối tượng vào cơ sở dữ liệu, Active Record validation được kích hoạt. Đây là lý do tại sao nên tách biệt việc khởi tạo và lưu để việc xử lý handle lỗi được dễ dàng hươn - trái ngược với việc kết hợp chúng lại với nhau bằng Active Record, giống như `.create` vậy. Các phương pháp sau sẽ kích hoạt validation:

```
.create
.create!
.save
.save!
.update
.update!
```

Các version !, ngoài việc chạy validation, ngoài ra nó còn đưa ra một ngoại lệ (exception) nếu bản ghi của bạn không hợp lệ, trong khi các version không ! sẽ làm như sau: `.save` và `.update` trả về `false`, `.create` trả về object. Lưu ý: bạn có thể lưu một đối tượng vào cơ sở dữ liệu mà không kích hoạt các validations. Hãy chắc chắn sử dụng các phương pháp này nếu bạn muốn kích hoạt validations.

Nếu các bạn cần thêm trợ giúp để xử lý lỗi, hãy xem xét đến việc sử dụng các phương pháp sau nhé:

```
.valid? # kích hoạt validations và trả về true nếu không có lỗi được tìm thấy trên object, các TH khác trả về false
.invalid? # ngược lại của  .valid?
.errors.messages # trả về tập hợp các lỗi (nếu tồn tại).
```

## Validation Helpers

Active Record cung cấp cho chúng ta 13 validation helper chính. Bạn có thể tìm được các hữu ích khi kết hợp các validations một cách hợp lý, các bạn có thể tham khảo tài liệu chính thức để tùy chỉnh các validations này hoặc tạo validations của riêng bạn khi bạn cần thêm cho các thuộc tính cụ thể. Đối với phạm vi của bài đăng này, tôi sẽ chỉ đề cập đến việc triển khai đơn giản nhất các trợ giúp validations chính của Active Record.

### acceptance

```
class User < ApplicationRecord
    validates :terms_of_use, acceptance: true
end
```

Phương pháp này xác nhận rằng form HTML checkbox đã được check khi biểu mẫu được gửi. Thường được sử dụng để xác nhận rằng người dùng đã đọc các điều khoản dịch vụ, đồng ý với điều gì đó, v.v.

### validates_associated

```
class Author < ApplicationRecord
    has_many :posts
    validates_associated :posts
end
```

Sử dụng phương pháp này khi đối tượng có mối quan hệ với một đối tượng khác cần được xác nhận. Phương thức `.valid?` sẽ được gọi trên mỗi đối tượng liên quan trước khi tiếp tục. Lưu ý: phương pháp này hoạt động với tất cả các loại mỗi quan hệ, nhưng hãy nhớ chỉ gọi trong một đối tượng để ngăn chặn vòng lặp validations vô hạn.

### confirmation

```
class User < ApplicationRecord
    validates :email, confirmation: true
    validates :email_confirmation, confirmation: true
end
```

Phương thức này tạo ra một thuộc tính ảo có tên là tên của trường phải được xác nhận với  "_ confirmation". Nó được sử dụng khi chúng tôi muốn so sánh và đảm bảo rằng hai trường text giống hệt nhau (nghĩa là người dùng phải nhập vào cùng một email hai lần để xác nhận email chính xác). Form với validation này như sau:

```
<%= text_field :user, :email %>
<%= text_field :user, :email_confirmation %>
```

### exclusion

```
class User < ApplicationRecord
    validates :email, exclusion: {in: %w(yahoo aol hotmail msn)}
end
```

Validation này được sử dụng khi chúng ta muốn loại trừ các mục có đặc tính hoặc nội dung text nhất định. Chúng ta sử dụng `: in` để nhận một tập hợp các giá trị sẽ không được chấp nhận cho các thuộc tính hợp lệ. Trong ví dụ này, tôi không muốn lưu bất kỳ email nào từ những người dùng có tài khoản Yahoo, AOL, Hotmail và MSN.

### format

```
class User < ApplicationRecord
    validates :name, format: {with: /\A[a-zA-Z]+\z/, message: "only     
      allows letters"}
end
```

Phương pháp này đảm bảo rằng nội dung text có format như được định nghĩa. Chúng tôi sử dụng `:with` để so sánh thuộc tính của chúng ta bằng cách sử dụng biểu thức chính quy (xem [Rubular](https://rubular.com/) để tìm hiểu các trợ giúp với các biểu thức chính quy). Với `:message` được sử dụng ở đây, chúng ta có thể custom các thông báo lỗi mà chúng ta muốn khi nội dung text không đúng với format mà chúng ta định nghĩa ở trên (xem [ActiveRecord Validations ](https://guides.rubyonrails.org/active_record_validations.html#message) để biết thêm thông tin option message này nhé).

### inclusion

```
class Tshirt < ApplicationRecord
    validates :size, inclusion: {in: %w(small medium large)}
end
```

Validation này đảm bảo rằng giá trị của thuộc tính là một giá trí trong tập hợp giá trị được định nghĩa. Như ví dụ trên, size của áo phông phải có kích thước nhỏ, trung bình hoặc lớn. Một lần nữa, các bạn lại thấy tôi sử dụng `: in `để cung cấp một tập hợp các giá trị.
Về cơ bản thì `inclusion` đang ngược lại với `exclusion`.

### length

```
class User < ApplicationRecord
    validates :bio, length: {maximum: 500}
end
```

Nghe có vẻ đơn giản, việc validation cho độ dài sẽ hạn chế độ dài của thuộc tính. Bạn có thể sử dụng các option đi kèm như `:minimum`, `:maximum`, `:in` (cho range) và `:is` (cho giá trị chính xác) để hỗ trợ trong phần định nghĩa validation.

### numericality

```
class User < ApplicationRecord
    validates :age, numericality: true
end
```

Phương thức này đảm bảo giá trị của thuộc tính là số. Nó so sánh giá trị đã cho với biểu thức chính quy sau: `/ \ A [+ -]? \ D + \ z /`. Theo mặc định, giá trị nil không được chấp nhận. Bạn có thể sử dụng các option đi kèm với `numericality:` để custom validation của mình theo từng bối cảnh của thuộc tính:

```
:only_integer
:greater_than
:greater_than_or_equal_to
:equal_to
:less_than
:less_than_or_equal_to
:other_than
:odd
:even
:allow_nil
```

### presence

```
class User < ApplicationRecord
    validates :name, :age, :email, presence: true
end
```

Validation này được sử dụng để xác nhận sự tồn tại giá trị của các thuộc tính. Nó sử dụng `.blank?` để kiểm tra xem thuộc tính có hay không và phát sinh lỗi nếu nó trả về false.

### absence

```
class User < ApplicationRecord
    validates :name, :age, :email, absence: true
end
```

 Ngược lại với `present`, validation này yêu cầu giá trị của các thuộc tính là không có giá trị và nó sử dụng `.present?` để đánh giá, giá trị được chấp nhận là nil hoặc một chuỗi rỗng.
 
###  uniqueness

```
class User < ApplicationRecord
    validates :email, uniqueness: true
end
```

Validation này là vô cùng hữu ích. Nó kiểm tra chéo cơ sở dữ liệu về tính duy nhất giá trị trước khi lưu đối tượng. Lưu ý: vẫn có thể có các giá trị lặp lại nếu đối tượng được kết nối với hai cơ sở dữ liệu khác nhau. Bạn có thể sử dụng `:scope` để chỉ định các thuộc tính cụ thể, sẽ đi kèm với thuộc tính chính, khi đó, tập hợp các thuộc tính này, giá trị của chúng cùng lúc phải là duy nhất, bạn có thể tham khảo cách sử dụng tại [document](https://guides.rubyonrails.org/active_record_validations.html#uniqueness).

### validates_with & validates_each

Những validaiton này phức tạp và tùy biến cao hơn. Nói 1 cách dễ hiễu thì `validates_with` sử dụng các mối quan hệ với các đối tượng khác để validation các thuộc tính. Nó chuyển bản ghi đến một lớp riêng để kiểm tra validation. Trong khi đó, `validates_each` validate các thuộc tính với một khối. Nó không có function validation được xác định trước, do đó yêu cầu bạn phải tùy chỉnh và chỉ định. Bạn có thể tham khảo [tài liệu](https://guides.rubyonrails.org/active_record_validations.html#validates-with) để biết thêm thông tin và ví dụ.
Với 2 loại phương thức validate này, sẽ giúp bạn giảm thiểu được việc lặp code khi tiến hành thực hiện việc xây dựng validations trong các model.

Hy vọng, qua bài giới thiệu này. các bạn đã nắm được cơ bản về cách thức và lý do sử dụng của các Active Record Validations để ngăn chặn sự phá vỡ và dữ liệu không mong muốn trong cơ sở dữ liệu của bạn. 

### Tài liệu tham khảo

https://guides.rubyonrails.org/active_record_validations.html
https://medium.com/@haleighdalke/active-record-validations-9a784c31ff57