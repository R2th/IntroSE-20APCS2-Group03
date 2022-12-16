Bài viết này chia sẻ về một cách hạn chế việc lặp code hay DRY, nếu bạn chưa biết về DRY có thể đọc thêm tại đây [Rails AntiPattern: Duplicate Code Duplication (p1)](https://viblo.asia/p/rails-antipattern-duplicate-code-duplication-p1-1VgZvwGYlAw)

Khi chúng ta viết một phần mở rộng cho Ruby on Rails model, `ActiveSupport::Concern` có thể là một lựa chọn tốt. chúng hoạt động giống như `mixin modules` có thể được bao gồm vào trong một lớp, nhưng có thêm một số lợi ích cho Rails model, chẳng hạn như khả năng thêm `Callbacks`. 

Bài viết này sẽ chỉ cho bạn cách DRY đoạn code của bạn, concern không chỉ thêm các custom methods cho các bản ghi, mà còn thêm `Callbacks` kích hoạt khi create, update và delete. 

### ActiveRecord Callbacks

`Callbacks` là các phương thức được kích hoạt khi một số sự kiện nhất định xảy ra trong vòng đời của `ActiveRecord model`. Bạn có thể xem danh sách `ActiveRecord Callbacks` trên [Rails Guide](http://guides.rubyonrails.org/active_record_callbacks.html).  Một số `Callbacks` trong đó:
* `before/after validations`
* `before/after save/update/destroy`
* `around save/create/update/destroy`
* `after_commit/after_rollback` (được liên kết với các bản ghi trong database/rollbacks)\
* `after_initialize` (khi `new` được gọi trên một bản ghi)
* `after_find` (bất cứ khi nào `Active Record` lấy một bản ghi từ cơ sở dữ liệu)
* `after_touch`

Bạn có thể thêm vào code của bạn để chạy khi các `Callbacks` này được kích hoạt. Một cách để làm điều này là sử dụng một `ActiveSupport::Concern`, mà sau đó có thể chia sẻ hay sử dụng trên nhiều model.

### Using a Callback in a Concern

Bạn có thể khai báo một Concern bằng cách sử dụng module được extended `ActiveSupport::Concern`. Sau đó thêm các phương thức khác mà bạn muốn bao gồm. 

``` ruby
module Publishable
  extend ActiveSupport::Concern
  def email
    UserMailer.weekly_summary(self).deliver_now
  end
end
```

Để thêm Concern vào model, bạn include vào như bạn muốn với module vậy. Sau đó, bạn có thể gọi concern đó trong `model callbacks` để chúng được chạy khi callback được kích hoạt. 

``` ruby
class User < ApplicationRecord
  include Publishable
  after_save -> { email }
end
```

Điều này có nghĩa là bạn có thể tạo các bản ghi và gọi phương thức `email` của Concern.

Callback `after_save` được kích hoạt khi create hoặc update, vì vậy phương thức `email` sẽ được gọi cho các phương thức sau:
* `User.create`
* `User.new.save`
* `User.update`

### Extracting the Callback into the Concern

Bạn cũng có thể khai báo Concern để gọi các `callbacks` khi nó được include vào model. Để làm được điều này chúng ta sẽ sử dụng `included` trong Concern.

``` ruby
module Publishable
  extend ActiveSupport::Concern
  
  included do
    after_create -> { email }
  end
  def email
    UserMailer.weekly_summary(self).deliver_now
  end
end
```

Bây giờ model không còn chứa các đoạn code logic nữa mà Concern sẽ làm điều đó.

```
class User < ApplicationRecord
  include Publishable
end
```
### Testing Callbacks with RSpec

Ví dụ, bạn có một `Callback` chẳng hạn như `after_save :email` sử dụng `Rails ActionMailer` để gửi xác nhận email sau khi user đã được lưu.

``` ruby
class User < ApplicationRecord
  after_save -> { email }
  def email
    UserMailer.confirmation(self).deliver_now
  end
end
```

Một email sẽ được gửi đi khi một bản ghi được lưu trong test của bạn.

Để ngăn chặn điều này, bạn cần [stub](https://relishapp.com/rspec/rspec-mocks/v/2-14/docs/method-stubs) phương thức này. Tùy vào codebase của bạn, bạn có thể stub cho các file riêng lẻ hoặc toàn bộ test của bạn.

Trong một tệp riêng lẻ, bạn sẽ thêm các phần sau để có thể chạy Rspec:

``` ruby
RSpec.describe User do
  subject { FactoryBot.create(:user) }
  before do
    allow(subject).to receive(:email)
  end
... your tests
```

Hoặc với toàn bộ các file bằng cách thêm phần sau vào file `spec_helper.rb`

``` ruby
RSpec.configure do |config|
  config.before(:each) do
    allow_any_instance_of(User).to receive(:email)
  end
end
```

**Chú ý: nó có thể gây chậm khi chạy test**

Sau đó khi bạn muốn test cho `Callbacks`, bạn cần phải tạo bản ghi, đặt expect cho nó, sau đó gọi một phương thức để kích hoạt `Callback`.

``` ruby
RSpec.describe User do
  describe "#create" do
    it "calls the Callback #email" do
      record = User.new(params)
      expect(record).to receive(:email)
      record.save
    end
  end
end
```

Thanks for reading!

Nguồn: https://medium.freecodecamp.org/add-callbacks-to-a-concern-in-ruby-on-rails-ef1a8d26e7ab