Bạn đã từng gặp phải vấn đề khi quản lý sự thay đổi trạng thái của 1 bản ghi chưa?

   Ví dụ:
   Quản lý trạng thái đơn hàng trên shopee:

*Chờ xác nhận -> Chờ lấy hàng -> Đang giao -> Đã nhận hàng ..*.

Đây là lúc bạn cần đến State Machine.

Vậy:

## I. State Machine là gì?

   State Machine là một mô hình tính toán dựa trên một máy giả định được tạo thành từ một hoặc nhiều trạng thái. Nó chuyển từ trạng thái này sang trạng thái khác để thực hiện các hành động khác nhau.

Ví dụ:

   Một trang web bất động sản có luồng xác minh tài sản như sau:

- Người bán upload 1 tài sản cùng với danh sách các tài liệu cần thiết về thông tin chi tiết của tài sản đó.
- Admin xác minh các tài liệu đó và đánh dấu tài sản đó đã được xác minh hoặc bị từ chối.
- Sau khi xác minh thành công, nếu admin nghĩ rằng cần phải có thêm thông tin thì họ sẽ liên hệ với người bán và có thể đánh đấu tài sản đó là chưa xác minh.
- Admin có thể công khai hoặc không công khai tài sản đó.
- Nếu một tài sản nào đó được bán, admin sẽ chuyển tài sản đó về trạng thái đã bàn giao.
   Chúng ta có biểu đồ như hình dưới:
![](https://images.viblo.asia/8c855d5f-a6a7-47a5-a8df-b6248d4db14c.png)

   Đó là một tập các trạng thái của tài sản cần bán và chúng ta sẽ có nhiều cách khác nhau để xử lí chúng.

**Sử dụng State Machine với gem AASM?**

   Có rất nhiều gem giúp chúng ta làm State  Machine trong ruby.
Trong bài này tôi sẽ giới thiêu cho bạn về gem AASM. NÓ làm việc với Ruby thuần cùng với các thư viện như: ActiveRecord, Sequel, Dynamoid, Redis hay Mongoid. Điều tuyệt vời nhất của AASM là nó rất trực quan và dễ triển khai, cho phép bạn có thể thêm 1 Stata machine có đầy đủ chức năng 1 cách dễ dàng.

## **II. Cách sử dụng gem AASM**

### ***1. Cài đặt***

- Thêm gem AASM vào Gemfile:
```ruby
gem 'aasm', '~> 4.12'
```
- Thêm cột `aasm_state` trong bảng `properties`. Tên cột có thể thay đổi được bằng cách ghi đè trong block `aasm`:
```ruby
class Property < ApplicationRecord
  ...
  aasm column: 'state' do
   ...  
  end
end
```
### ***2. Cách sử dụng cơ bản***
- Trong model `Property`, include module AASM:
```ruby
class Property < ApplicationRecord
  include AASM
  ...
end
```
- Trong block `aasm`, chúng ta phải định nghĩa rõ ràng các trạng thái khác nhau. Với mỗi trạng thái, mỗi khi chúng ta tạo 1 instance của `Property`, trường state sẽ mặc định đặt ở `unverified`.

```ruby
class Property < ApplicationRecord
  include AASM
  aasm do
    state :unverified, initial: true
    state :verified
    state :rejected
    state :published
    state :archived
  end
end
```
- Tiếp theo, chúng ta định nghĩa tất cả sự kiện có thể xảy ra. Mỗi sự kiện có thể có 1 sự thay đổi từ trạng thái này sang trạng thái khác.
```ruby
class Property < ApplicationRecord
  include AASM
  aasm do
    state :unverified, initial: true
    state :verified
    state :published
    state :archived
    state :rejected
    event :verify do
      transitions from: [:unverified], to: :verified
    end
    event :reject do
      transitions from: [:unverified], to: :rejected
    end
    event :reverify do
      transitions from: [:verified], to: :unverified
    end
    event :publish do
      transitions from: [:verified], to: :published
    end
    event :unpublish do
      transitions from: [:published], to: :verified
    end
    event :archive do
      transitions from: [:published, :verified, :unverified], to: :archived
    end
  end
end
```
- Bây giờ có rất nhiều thứ mà ta có thể làm với gem này. Nó cung cấp cho bạn một số các phương thức public cho các instance của class `Property`. Sau đây là một số ví dụ về chúng trong rails console:
```ruby
> p = Property.new # new property object with unverified state
> p.aasm_state # return the current state
=> "unverified"
> p.verified?
=> false
> p.may_verify?
=> true
> p.may_publish?
=> false
> p.verify # Changes the state to 'verified' but doesn't save it.
=> true
> p.verify! # => raises AASM::InvalidTransition
> p.publish! # Changes the state to 'published' and saves it.
=> true
```

- Phương thức `verified?`, `may_publish?` có thể hữu ích trong views để hiển thị một số UI đặc biệt dựa trên trạng thái hiện tại.

***Chú ý:***

   Nếu bạn không thích các exceptions mà thích các dạng response `true` hoặc `false` đơn giản, bạn có thể bảo AASM làm điều đó:

```ruby
class Property < ApplicationRecord
  ...
  aasm :whiny_transitions => false do
    ...
  end
end
```

### ***3. Sử dụng Callbacks & Guards***

- Gem này cung cấp một số callbacks mà bạn có thể thêm trực tiếp vào các states, events và transitions. Và nó sẽ kích hoặt một số phương thức mỗi khi callback thực hiện.
```ruby
class Property < ApplicationRecord
  ...
  aasm do
    state :unverified, initial: true, :before_enter => :do_something
    ...
    
    after_all_transitions :log_status_change
    event :verify, :after => :notify_seller do
      transitions from: [:unverified], to: :verified
    end
    ....
  end
  
  # Callback on state  
  def do_something
    ...
  end
  # Callback on event
  def notify_seller
    ...  
  end
  # Callback on transition
  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state}"  
  end
  ....
end
```
    

   Bạn có thể tham khảo [Danh sách callbacks](https://github.com/aasm/aasm#callbacks) tại đây.

- Một điểm quan trọng cần chú ý là State Machine không thực sự quan tâm tới những gía trị mà callback trả về. Tuy nhiên bạn có thể thêm một guard class tới bất kỳ một transition cụ thể nào để nó sẽ không được chạy mỗi khi mà phương thức trả về `false`
```ruby
class Property < ApplicationRecord
  ...
  aasm do
    ...
    event :verify do
      transitions from: [:unverified], to: :verified, :guard => :documents_checked?
    end
    ....
  end
  def documents_checked?
    # If returned false, the execution will stop
  end
end
```
   Bạn có thể sử dụng nhiều hơn một guard cho mỗi transition nhưng bắt buộc phải chạy thành công. 
   Bạn có thể xem các tài liệu triển khai [tại đây](https://github.com/aasm/aasm#guards).

## III. Kết luận

   Quản lý các trạng thái với AASM sẽ không làm thay đổi các trải nghiệm của người dùng, nhưng nó sẽ cho code chúng ta trực quan, đơn giản và dễ phát triển hơn. Có một số cách để custom AASM, bạn hãy tham khảo tại [official documentation](https://github.com/aasm/aasm) để hiểu rõ hơn. Bạn có thể tìm thấy source codes của bài viết này trên [Github repository](https://github.com/avishekjana/rails-state-machine).

Link tài liệu tham khảo:

https://medium.com/geogo-in/state-machines-in-rails-5-45259a4f42da

https://medium.com/geogo-in/state-machines-in-rails-5-45259a4f42da