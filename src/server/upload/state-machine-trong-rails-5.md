# Đặt vấn đề
Bạn đang xây dựng một model với các trạng thái khác nhau. Bạn vẫn có thể thiết kế model của bạn mà không cần sử dụng đến state machine. Bạn vẫn có thể viết thêm vài validation, các phương thức instance và helper để làm cho mọi thứ hoạt động bình thường. Bạn có thể làm điều đó miễn là model của bạn bị giới hạn ở một vài state. Nhưng giả sử, với cách viết đó và bạn thực hiện cho một quy trình phức tạp giống như quy trình thanh toán của một trang web thương mại điện tử. Từ kiểm tra hàng tồn kho cho đến xử lý thanh toán để thưc hiện đơn đặt hàng, bạn sẽ phải viết một model chứa hàng trăm dòng validation cho mỗi quá trình chuyển đổi trạng thái. Và nhiều lúc chúng ta phải thêm 1 vài state nữa vào model của mình,  sau đó bạn phải chắp vá đống code lộn xộn chỉ để đảm bảo thêm một state nữa sẽ không phá vở hệ thống. 

Đó là lý do chính để sử dụng `state machine`. Nó sẽ đơn giản hóa quá trình thiết kế của bạn, làm cho việc quản lý trạng thái trở nên đơn giản hơn.
# Kế hoạch
Có rất nhiều gem nổi tiếng giúp chúng ta làm machine state trong ruby,  ví dụ như **state_machine** và **aasm**. Trong bài viết này, chúng ta sẽ đi tìm hiểu cách sử dụng gem `aasm`, một gem phổ biến thứ 2 theo số lượng tải xuống.

Bây giờ, chúng ta sẽ xây dựng một hệ thống quản lý hợp đồng cho một công ty. Chúng ta có một model tên là Contract, nó sẽ có nhiều trạng thái khác nhau, từ lúc ứng viên apply vào công ty cho đến lúc hợp đồng ứng viên kết thúc. Sẽ có các trạng thái sau: 
*  `applying` 
* `accepted`
* `rejected`
* `doing`
* `ended`

Hãy xem sơ đồ sau đây: 
![](https://images.viblo.asia/3de1bedf-caeb-486d-85ac-701cf01f3c29.png)
# Thực hiện
Bây giờ chúng ta sẽ thiết kế model `Contract`.
### Cài đặt
1. Đầu tiên chúng ta phải thêm gem trong Gemfile.
```
gem 'aasm', '~> 4.12'
```
2. Sau đó, chúng ta sẽ thêm một cột `status` trong bảng `Contracts`. 
```
class AddStatusToContracts < ActiveRecord::Migration[5.1]
  def change
    add_column :contracts, :status, :string
  end
end
```
### Sử dụng
Trong model `Contract`, trước tiên chúng ta phải include module AASM
```
class Contract < ApplicationRecord
  include AASM
  ...
end
```
Sau đó, bên trong block aasm, chúng ta phải chỉ định các trạng thái khác nhau. Theo biểu đồ trạng thái, bất cứ khi nào chúng ta tạo một Contract object mới, trạng thái ban đầu sẽ là `applying`.
```
class Contract < ApplicationRecord
  include AASM
  aasm column: :status do
    state :applying, initial: true
    state :accepted
    state :rejected
    state :doing
    state :ended
  end
end
```
Tiếp theo, chúng ta sẽ xác định tất cả các sự kiện có thể có. Mỗi sự kiện có thể có sự chuyển đổi từ trạng thái này sang trạng thái khác.
```
class Contract < ApplicationRecord
  include AASM
  aasm column: :status do
    state :applying, initial: true
    state :accepted
    state :rejected
    state :doing
    state :ended
    
    event :accept do
      transitions from: :applying, to: :accepted
    end
    
    event :reject do
      transitions from: [:applying, :accepted], to: :rejected
    end
    
    event :do do
      transitions from: :accepted, to: :doing
    end
    
    event :end do
      transitions from: :doing, to: :ended
    end
  end
end
```
Bây giờ sẽ có rất nhiều điều chúng ta có thể làm với gem này. Nó cung cấp cho bạn một vài phương thức cho các object của class `Contract`. Hãy thử mở rails console lên và thử một vài dòng lệnh sau.
```
> c = Contract.new
> c.status
=> "applying"
> c.accepted?
=> false
> c.may_accept?
=> true
> c.may_do?
=> false
> c.accept # Thay đổi status thành 'accepted' nhưng chưa save.
=> true
> c.accept! # => raises AASM::InvalidTransition
> c.do! # Thay đổi status thành 'doing' và save.
=> true
```
Các method như `accepted?` và `may_accept?` có thể hữu ích trong view để hiển thị giao diện cụ thể dựa trên trạng thái hiện tại. 
Nếu bạn không thích exception, bạn có thể làm như dưới đây:
```
class Contract < ApplicationRecord
  ...
  aasm :whiny_transitions => false do
    ...
  end
end
```
### Callbacks và Guards
Gem này cung cấp một số callback mà bạn có thể thêm trực tiếp vào các state, event hoặc transition.
```
class Contract < ApplicationRecord
  ...
  aasm column: :status do
    state :applying, initial: true, :before_enter => :do_something
    ...
    
    after_all_transitions :log_status_change
    event :accept, :after: :notify_applicant do
      transitions from: :applying, to: :accepted
    end
    ....
  end
  
  # Callback on state  
  def do_something
    ...
  end
  # Callback on event
  def notify_applicant
    ...  
  end
  # Callback on transition
  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state}"  
  end
  ....
end
```
Bạn có thể xem tất cả các callback có sẳn [ở đây](https://github.com/aasm/aasm#callbacks).

Ngoài ra, bạn có thể thêm một guard vào bất kỳ transition cụ thể nào để nó sẽ không diễn ra nếu phương thức trả về false.
```
class Contract < ApplicationRecord
  ...
  aasm column: :status do
    ...
    event :accept do
      transitions from: :applying, to: :accepted, guard: :documents_checked?
    end
    ....
  end
  def documents_checked?
    # If returned false, the execution will stop
  end
end
```
Bạn cũng có thể sử dụng nhiều guard cho một transition, tìm hiểu thêm [tại đây](https://github.com/aasm/aasm#guards).
# Tổng kết
Quản lý các trạng thái với AASM sẽ không tạo ra bất kỳ khác biệt lớn nào cho người dùng, nhưng nó sẽ làm cho code của bạn sạch hơn, dễ đọc hơn và có thể mở rộng được. Có nhiều tùy chọn hơn của AASM mà trong bài viết này không đề cập đến, bạn nên đọc tài liệu chính thức của họ để biết thêm thông tin. Đây là [Github repository](https://github.com/aasm/aasm) của nó.