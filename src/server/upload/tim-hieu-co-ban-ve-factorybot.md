# Đôi lời về FactoryBot gem
FactoryBot gem thường được sử dụng khi viết rspec để sử dụng các chiến lược (phương thức) xây dựng model một cách đơn giản. FB cung cấp cho chúng ta 4 phương thức chính là: **build**, **create**, **attributes_for** và **build_stubbed**.

Có thể bạn chưa biết FB và [Faker](https://github.com/faker-ruby/faker) là một cặp đôi hoàn hảo trong việc tạo dữ liệu mẫu cho các model khi viết rspec.
*Chú ý: Để cho ngắn gọn trong bài mình sẽ dùng từ khoá FB cho FactoryBot, không phải FaceBook đâu nha =))*

Việc cài đặt sử dụng FB rất đơn giản, các bạn có thể vào [đây](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md) để xem cách cài đặt gem này. 
Có một chú ý, bạn nên thiết lập `FactoryBot::Syntax::Methods` cho dự án của mình để khi sử dụng FB thay vì phải gõ `FactoryBot.create` thì chỉ cần `create` là được.

Vì mình chỉ sử dụng rspec nên ví dụ này dành cho rspec và rails.

Bước 1: Tạo file theo đường dẫn spec/support/factory_bot.rb và kéo factory_bot vào rails_helper.rb là được.

```
spec/support/factory_bot.rb
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

# Cách định nghĩa Factory
Một factory có 2 phần chính là tên của factory và các thuộc tính.
```
//FB sẽ tự đoán factory này cho User class
FactoryBot.define do
  factory :user do
    first_name { "John" }
    last_name  { "Doe" }
    admin { false }
  end
end
```

Nếu bạn không muốn sử dụng tính năng tự  đoán của FB thì có thể sử dụng cách này. Chỉ rõ tên class mình muốn sử dụng mà không quan tâm tới tên factory là gì. 
```
factory :admin, class: "User" //Khuyên dùng
hoặc một tên constant khả dụng.
factory :access_token, class: User
```

*Lưu ý: Sử dụng constant sẽ gây ra ảnh hưởng hiệu năng test trong một ứng dụng Rails lớn, vì việc truy xuất tới constant sẽ khiến nó được tải một cách eagerly loaded.*

**Khuyến nghị khi định nghĩa factory**: Bạn nên khai báo mỗi factory cho mỗi class model có nghĩa là trong một factory chỉ nên định nghĩa các thuộc tính của một model class để việc dễ quản lý và rõ ràng. Việc khai báo nhiều factory có tên giống nhau là nỗ lực vô nghĩa.

# Những công dụng FB cung cấp
## 4 phương thức FB
Chúng ta sẽ có các phương thức: **build**,  **create**,  **attributes_for** và **build_stubbed**.
Bạn có thể sử dụng một cách linh hoạt các phương thức trên trong hầu hết các bài toán khi gặp phải một cách dễ dàng. Nhưng bản thân mình mới sử dụng nhiều đến 3 phương thức đầu đã là rất đủ rồi.

```
# Trả về User instance nhưng chưa được lưu
user = build :user

# Trả về một biễn User instance đã được lưu
user = create :user

# Trả về một hash of attributes mà có thể dùng để build một User instance
attrs = attributes_for :user

# Truyền một block vào bất kì phương thức nào bên trên sẽ nhận tham số truyền vào là object được trả về
create(:user) do |user|
  user.posts.create(attributes_for(:post))
end
```
## Ghi đè các thuộc tính
Việc ghi đè các thuộc tính theo mong muốn rất dễ dàng.
```
# Build một User instance và ghi đè thuộc tính first_name
user = build(:user, first_name: "Hello")
user.first_name
# => "Hello"
```

## Aliases - Tên thay thế
Để việc sử dụng lại các factory được dễ dàng, rõ ràng và phù hợp với từng bối cảnh thì alias là một giải pháp rất tốt. Mình giải thích ở cmt trong đoạn code bên dưới. 

```
factory :user, aliases: [:author, :commenter] do
  first_name { "John" }
  last_name { "Doe" }
  date_of_birth { 18.years.ago }
end

factory :post do
  # The alias cho phép sử dụng author thay vì
  # association :author, factory: :user
  author // một bài viết thì có tác giả quá là hợp lý rồi
  title { "How to read a book effectively" }
  body { "There are five steps involved." }
end

factory :comment do
  # The alias cho phép sử dụng commenter thay vì 
  # association :commenter, factory: :user
  commenter // comment thì nên là người comment sẽ rõ ràng và phù hợp hơn là user
  body { "Great article!" }
end
```

## Dependent Attributes 
Các thuộc tính có thể sử dụng lẫn nhau.

```
factory :user do
  first_name { "Joe" }
  last_name  { "Blow" }
  email { "#{first_name}.#{last_name}@example.com".downcase }
end

create(:user, last_name: "Doe").email
# => "joe.doe@example.com"
```

## Transient Attributes - Những thuộc tính tạm thời
Transient attributes chỉ khả dụng trong định nghĩa factory và sẽ không được sử dụng khi build model(Có nghĩ là thuộc tính này sẽ không thể lưu vào DB) . Nó phù hợp cho những logic phức tạp hơn bên trong phần định nghĩa factory.

```
factory :user do
  transient do
    rockstar { true }
  end

  name { "John Doe#{" - Rockstar" if rockstar}" }
end

create(:user).name
#=> "John Doe - ROCKSTAR"

create(:user, rockstar: false).name
#=> "John Doe"
```

Từ ví dụ trên ta thấy nhờ transites attribute mà ta như có thể truyền thêm tham số vào bên trong factory còn để làm gì thì tuỳ bạn nha. 

### Transites attribute với callback
Bạn cần truyền thêm một tham số nữa đại diện cho evaluator cho việc truy cập vào các transite attribute.
```
factory :user do
  transient do
    upcased { false }
  end

  name { "John Doe" }

  after(:create) do |user, evaluator|
    user.name.upcase! if evaluator.upcased
  end
end

create(:user).name
#=> "John Doe"

create(:user, upcased: true).name
#=> "JOHN DOE"
```

## Method Name / Reserved Word Attributes
Nếu khi khai báo các thuộc tính cho factory mà bị conflict với tên các method của FB thì bạn hãy sử dụng **add_attribute**.

```
factory :dna do
  add_attribute(:sequence) { 'GATTACA' }
end

factory :payment do
  add_attribute(:method) { 'paypal' }
end
```

## Inheritance - Kế thừa
Trong doc của FB sẽ giới thiệu cho bạn 2 cách nhưng mình sẽ sử dụng chính cách thứ 2 vì các factory sẽ có liên kết lỏng lẻo, dễ thay đổi mà không làm ảnh hưởng đến nhau.

```
//user_factory.rb
factory :post do
  title { "A title" }
end

//approved_post_factory.rb
factory :approved_post, parent: :post do
  approved { true }
end
```

# Kết luận
Trong bài này mình đã đi qua những tính năng FB cung cấp được sử dụng thông dụng trong khi viết rpsec. Ở phần 2, chúng ta sẽ đi tiếp tới các tính năng khác như association, sequences, … 

Thank for reading to my post <3

Bài viết tham khảo:
https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md