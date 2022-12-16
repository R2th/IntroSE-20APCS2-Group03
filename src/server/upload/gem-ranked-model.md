# Gem ranked-model
## Intro
ranked-model  là một thư viện sắp xếp hàng hiện đại được xây dựng cho Rails 4.2+. Nó sử dụng ARel mạnh mẽ và được tối ưu hóa tốt hơn hầu hết các thư viện khác.

## Installation
ranked-model tương thích với Rails 4.2, 5.0, 5.1, 5.2, 6.0 và MySQL, Postgres, and SQLite
Để cài đặt, chỉ cần thêm vào Gemfile:

```ruby
gem 'ranked-model'
```

Sau đó chạy lệnh `bundle` để update Gemfile.lock

## Simple Use
Giả sử ta đã có model Duck và database tương ứng.

Thêm cột row_order 
```ruby
rails g migration AddRowOrderToDucks row_order:integer
```

Thêm `include RankedModel` và `ranks :row_order` vào model Duck
```ruby
class Duck < ActiveRecord::Base

  include RankedModel
  ranks :row_order

end
  ```
  
  Sắp xếp Ducks theo row_order tăng dần
  ```ruby
  Duck.rank(:row_order).all
  ```
  
  Các số nguyên xếp hạng được lưu ở cột row_order lớn và cách xa nhau.
  Khi thực hiện sắp xếp thông qua UI chỉ cần update resource bằng cách thêm hậu tố `_position` và đưa ra vị trí cần thay đổi:
  ```ruby
  @duck.update row_order_position: 0  # or 1, 2, 37. :first, :last, :up và :down đêù hợp lệ
  ```
  **Quan trọng: Chú ý rằng ta phải thêm hậu tố `_position` vào tên cột khi thiết lập vị trí cho 1 record mới. Đây là một cột giả có thể nhận các giá trị dựa trên chỉ mục tương đối cũng như tuyệt đối cho vị trí.**
  
  Vị trí đầu tiên bắt đầu từ 0. Một vị trí lớn hơn các vị trị hiện có sẽ là `:last`. `:up` và `:down` di chuyển thứ tự record lên xuống 1 đơn vị.
  Ví dụ ở controller :
  ```ruby
  @duck.update row_order_position: 9
  ```
  
  Nếu cần lấy ra rank của 1 item với các item đã được sắp xếp khác, ta có thể sử dụng
  ```ruby
  {column_name}_rank
  ```
  Ví dụ: 
  ```ruby
 Duck.rank(:row_order).first.row_order_rank # => 0
 Duck.rank(:row_order).third.row_order_rank # => 9
  ```
  
##   Complex Use

Method `ranks` nhận một số đối số:
```ruby
class Duck < ActiveRecord::Base

  include RankedModel

  ranks :row_order,                # Đặt cho rank một alias mới là row_order thay vì sử dụng tên cột mặc định 
    column: :sort_order             # bằng cách dùng column   

  belongs_to :pond
  ranks :swimming_order,
    with_same: :pond_id              # Ducks belong_to Ponds, swimming_order dùng để sort những Duck có cùng pond_id, 
    # những Duck thuộc về pond khác nhau thì rank độc lập và có thể giống nhau 
  ranks :row_order,
    with_same: [:pond_id, :breed]    # sort những Duck có cùng pond_id và breed

  scope :walking, where(walking: true )
  ranks :walking_order,
    scope: :walking                  # Thu hẹp rank vào một scope

  belongs_to :parent, class_name: 'Duck', optional: true
  ranks :child_order,
    unless: :has_no_parent?,         # Chỉ sắp xếp những duck có parent. Ngoài ra proc và lambda cũng có thể được sử dụng, ví dụ proc { parent.nil? }
    with_same: :parent_id

  def has_no_parent?
    parent.nil?
  end
end
```

Khi sử dụng:
```ruby
Duck.rank(:row_order)

Pond.first.ducks.rank(:swimming_order)

Duck.walking.rank(:walking)
```

## Single Table Inheritance (STI)
Phạm vi vị trí của record dựa trên class name. Nếu ta có 1 cột STI `type` trong model, ranked-model sẽ tham chiếu đến class đó để lấy vị trí. Ví dụ:
```ruby
class Vehicle < ActiveRecord::Base
  ranks :row_order
end

class Car < Vehicle
end

class Truck < Vehicle
end

car = Car.create!
truck = Truck.create!

car.row_order
=> 0
truck.row_order
=> 0
```
Trong ví dụ này, `row_order` của car và truck được set là 0, vì chúng thuộc về 2 class khác nhau nên không gian so sách khác nhau, độc lập, riêng biệt.
Nếu muốn chúng sắp xếp cùng 1 không gian chỉ cần thêm option `class_name`:
```ruby
class Vehicle < ActiveRecord::Base
  ranks :row_order, class_name: 'Vehicle'
end

class Car < Vehicle
end

class Truck < Vehicle
end

car = Car.create!
truck = Truck.create!

car.row_order
=> 0
truck.row_order
=> 4194304
```

## Note
ranked-model đã được tối ưu để ghi data vào database ít nhất có thể: rank được lưu từ -2147483648 đến 2147483647 (kiểu Int trong MySql). Khi 1 duck update vị trị mới thì row_order nó sẽ được gán với 1 số trong khoảng giữa row_order của 2 record cạnh record hiện tại ở vị trí mới. Trường hợp row_order của 2 record bên cạnh ở vị trí mới nil thì ranked-model sẽ cố gắng dịch chuyển các record khỏi đường đi. Nếu không thể dịch chuyển thì ranked-model sẽ cân bằng lại data row_order của các record trong cùng không gian.
Nếu data row_order không đúng theo chuẩn của rank-model, thì ranked-model sẽ update lại, điều này làm tốn tài nguyên đáng kể.