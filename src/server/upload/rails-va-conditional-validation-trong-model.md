## Lời nói đầu

> *I agree to terms of service and privacy policies*

Bắt đầu từ tháng 5/2018, cái checkbox vô dụng này đã trở thành quy định bắt buộc chung tại EU [GDPR](https://gdpr-info.eu/). :fearful:

Từ trước tới giờ, những thứ như vậy ta thường không lưu trong database làm gì - chỉ cần dùng code logic để check là đủ.

Việc implement thoạt nhìn có vẻ đơn giản, nhưng nếu ta nghiên cứu kỹ một chút thì sẽ nhận ra nó
... đơn giản thật. 

Trong bài viết lần này, *Terms of Service/Privacy Policies* không phải là chủ đề chính. 

Đơn thuần chỉ là ví dụ để phục vụ cho cái tiêu đề thôi, nên ta không cần bánh cuốn vào nó làm gì. :triumph:

### Mô tả bài toán

Chúng ta muốn đảm bảo rằng, user đã ấn vào accept "Terms of Service" khi tiến hành signup.

JS validation chỉ nằm ở client thôi, không tin hoàn toàn được -> validate cả ở phía backend nữa.


### Solution 1 - Add thêm attribute ảo và validate nó

Đây có lẽ là phương pháp đơn giản và ngắn gọn nhất để xử lý. 

Vậy ta implement nó như thế nào:

```Ruby
# app/models/user.rb
class User < ApplicationRecord
  attr_accessor :terms_of_service_accepted

  validates :terms_of_service_accepted, acceptance: true
end
```

Ok, nó chắc chắn hoạt động được. 

Nhưng nếu để vậy, validation này sẽ luôn luôn được gọi mọi lúc kể cả khi `update` -> vừa lãng phí vừa vô nghĩa -> next.

Ta cần tìm ra giải pháp tốt hơn.

### Solution 2 - Add thêm attribute ảo và chỉ validate khi create user

Cách này đơn giản là cải thiện từ đoạn code trước. 

Ta đảm bảo rằng, validation chỉ trigger khi mà `create` user mà thôi -> sử dụng `context` mặc định:

```Ruby
# app/models/user.rb
class User < ApplicationRecord
  attr_accessor :terms_of_service_accepted

  validates :terms_of_service_accepted, acceptance: true, on: :create
end
```

Kể cả khi implement thế này, ta vẫn gặp phải vấn đề -> Lúc éo nào `create` user nó cũng gọi, kể cả lúc tạo dữ liệu test bằng FactoryBot -> next.

Có cách khác cải tiến không? :|

### Solution 3 - Add thêm attribute ảo và sử dụng validate context cụ thể

Thú vị ở chỗ, ActiveModel validations với option `on`, nó không giới hạn ở những contexts `:create` hay `:update` - cái mà ActiveRecord cung cấp mặc định. 

Ta hoàn toàn có thể tự định nghĩa một context riêng cho trường hợp cụ thể đang gặp phải, áp dụng được cho cả method `valid?` và `save`:

```Ruby
user.valid?(:registration)
user.save(context: :registration)
```

Trong case này, ta thay thế context `:create` bằng cái tự định nghĩa `:registration` là xong.

```Ruby
# app/models/user.rb
class User < ApplicationRecord
  attr_accessor :terms_of_service_accepted

  validates :terms_of_service_accepted, acceptance: true, on: :registration
end
```

Nhưng đây cũng không phải là giải pháp hay lắm. 

Bạn tưởng tượng model giống như một ngôi nhà chung cho tất cả mọi người ấy.

Nếu với mỗi case nhỏ lại phải viết thêm một context riêng, thì ngôi nhà dần cũng trở nên lộn xộn và xấu xí. 

Có cách khác mà vẫn giữ được model sạch đẹp không?

### Solution 4 - Sử dụng form object

Có thể nói, sử dụng form object gần như là phương pháp sạch đẹp nhất để giải quyết vấn đề. 

Ta không cần quan tâm gì tới model nữa, tất cả đều được xử lý và gói gọn trong một object riêng biệt.

Có rất nhiều cách để implement form object: Sử dụng [virtus](https://github.com/solnic/virtus) để tạo class và gán attributes. Sử dụng gem [dry-validation](https://github.com/dry-rb/dry-validation) hay gem [reform](https://github.com/trailblazer/reform)

Dưới đây mình lấy ví dụ về `reform`. Giải thích về nó vượt ra ngoài phạm vi của bài viết này rồi, các bác có thể vào [reform](https://github.com/trailblazer/reform) để đọc.

Đại loại là code implement như sau:

```Ruby
# app/forms/user/registration_form.rb
require "reform/form/coercion"

class User::RegistrationForm < Reform::Form
  # other property declarations and validations

  property :terms_of_service_accepted, virtual: :true, type: Types::Form::Boolean

  validates :terms_of_service_accepted, acceptance: true
end
```

Mặc dù sử dụng form object là ổn, nhưng trong một số trường hợp, nó lại kéo theo nhiều hệ quả rắc rối.

Ví dụ khi có dính dáng đến logic của bên thứ ba - như [devise_invitable](https://github.com/scambra/devise_invitable) thì để dùng được form object, ta còn phải custom lại đống hàm bên trong gem nữa -> phải test lại nhiều case để đảm bảo coverage việc custom không gây ra lỗi nào khác.

Nhưng tôi lười lắm, còn giải pháp khác không? :sleeping:

### Solution 5 - DCI

Bạn đã bao giờ nghe về mô hình DCI ([Data Context Interaction](https://en.wikipedia.org/wiki/Data,_context_and_interaction)) chưa? 

Nếu rồi, chắc hẳn đoạn code kiểu này cũng đã từng thấy qua:
```Ruby
user = User.find(id)
user.extend(User::RegistrationContext)
```

Nghe cái tên màu mè vậy thôi, chứ bản chất đoạn code trên là add thêm function từ module `User::RegistrationContext` vào cho object `user`.

Kết quả là function bổ sung chỉ tồn tại ở object `user` này, chứ không phải toàn bộ instances của class User.

Đo chính xác là thứ ta đang cần:
- Xử lý được bài toán :+1:
- Logic không phức tạp :+1:
- Không làm rối thêm model :+1:

Module `User::RegistrationContext` được implement như sau:

```Ruby
# app/models/user/registration_context.rb
module User::RegistrationContext
  # inception code
  def self.extended(model)
    class << model
      validates :terms_of_service_accepted, acceptance: true
    end
  end

  attr_accessor :terms_of_service_accepted
end
```

Kết quả đê:

```Ruby
user = User.new
user.extend(User::RegistrationContext)
user.terms_of_service_accepted = "0"
user.valid?
=> false
user.errors.messages[:terms_of_service_accepted]
=> ["must be accepted"]
```

### Túm cái váy lại

Còn rất nhiều cách để xử lý cái conditional validation này (đội ơn cái độ mềm dẻo của Rails và Ruby :triumph:)

Vậy nên tùy từng trường hợp mà áp dụng phương pháp sao cho đơn giản và hiệu quả nhé các giáo sư. (csm)

### Nguồn tham khảo
- https://karolgalanciak.com/blog/2018/06/24/rails-and-conditional-validations-in-models/