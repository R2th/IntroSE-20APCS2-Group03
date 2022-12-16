Thỉnh thoảng, bạn sẽ bắt gặp 1 khai báo abstract class trong rails như sau:

```ruby
class SomeAbstractModel < ApplicationRecord
  self.abstract_class = true
  
  # some heritable methods here
end
```

Dòng khai báo này là một cách đầy ma thuật giải quyết các vấn đề trong cơ chế thừa kế của ruby, và tất nhiên, là khởi đầu cho một núi vấn đề khác. Cùng đi tìm hiểu về nó nào.

# Đầu tiên: Nó dùng làm gì?
Cơ bản là: 1 abstract class sẽ không thể được sử dụng để khởi tạo một object. Nếu cố làm điều này thì tất nhiên bạn sẽ nhận lại 1 exception:

```ruby
SomeAbstractClass.create!
# => NotImplementedError: (Vehicle is an abstract class and cannot be instantiated.)
```

# Ờ thế cần nó làm gì?
Single-Table Inheritance (STI) là một thứ nổi tiếng lắm vấn đề, bạn có thể đọc thêm về nó ở đây [https://viblo.asia/p/single-table-inheritance-sti-trong-rails-vyDZOXoalwj](https://viblo.asia/p/single-table-inheritance-sti-trong-rails-vyDZOXoalwj). Và một trong những cách tiếp cận là abstract class. 
## Quá nhiều cột trống:
Khi bạn tạo ra một STI, bạn phải tạo ra một object cha trong đó chứa cột ```:type``` và mọi cột mà các con của nó cần có. 
Xem xét một class Vehicle ví dụ như sau:

```ruby
class Vehicle < ApplicationRecord
  with_options presence: true, allow_blank: false do
    validates :weight
    validates :color
  end
def convert_weight(unit)
    case unit
    when :lbs
      weight * 2.20462
    when :g
      weight * 1000.0
    end
  end
end
```
Và 2 con:
```ruby
class Car < Vehicle
  validates :number_of_wheels, presence: true, allow_blank: false
end
class Airplane < Vehicle
  validates :number_of_wings, presence: true, allow_blank: false
end
```

Trong mô hình STI, khi migrate, Vehicle có thêm trường ```:type```. Tạo ra 1 object Car, type sẽ là "car" và tương tự cho Airplane. Mọi thứ đều có vẻ ổn đấy chứ?
Nhưng Vehicle vẫn cần 2 column ```:number_of_wheels``` và ```:number_of_wings``` vì các attribute này vẫn cần ở Car và Airplane.

```ruby
create_table :vehicles do |t|
  # columns required by some children
  t.integer :number_of_wheels
  t.integer :number_of_wings
  # columns required by all children
  with_options null: false do
    t.string  :type # required for inheritence
    t.integer :weight
    t.string  :color
  end
end
```

Vấn đề sẽ ngày càng lớn khi có quá nhiều trường khác nhau một chút như vậy. Nếu chúng ta tạo ra Thuyền (Boat), Xe trượt tuyết (SnowBike), thậm chí là tàu ngầm (Submarine)... Sự khác nhau này sẽ khiến bảng thừa 1 lượng lớn trường không cần thiết.

# Và Abstract Class xuất hiện
Abstract class giống như một interface cho các trường giống nhau. Nó chỉ đơn giản chứa các properies và các method mà các con của nó cần có. Nhưng nó không biết chính xác các method được thực thi ở các con như thế nào.
Quay lại với class Vehicle:
```ruby
class Vehicle < ApplicationRecord
  self.abstract_class = true
with_options presence: true, allow_blank: false do
    validates :weight
    validates :color
  end
def convert_weight(unit)
    case unit
    when :lbs
      weight * 2.20462
    when :g
      weight * 1000.0
    end
  end
end
```
Và migration ==========> Chả có migration nào cả, nó đâu có thật!
Nào giờ đến con của nó:
```ruby
class CreateVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      with_options null: false do
        t.integer :weight
        t.string  :color
        t.integer :number_of_wheels
      end
    end
    create_table :airplanes do |t|
      with_options null: false do
        t.integer :weight
        t.string  :color
        t.integer :number_of_wings
      end
    end
  end
end
```
Giờ 2 bảng Cars và Airplanes đã tách biệt tuy nhiên chúng ta vẫn có thể sử dụng chung method convert_weight, tất nhiên đó là chung, còn nếu cần có thể override nó nếu cần.
# Kết thúc: Khi nào tôi nên sử dụng abstract class?
Nó không thực sự tốt hơn STI, nhưng trong 1 số trường hợp đây là giải pháp phù hợp, đặc biệt là khi class con có nhiều sự khác biệt nhưng bạn vẫn muốn tái sử dụng code.

Ngoài ra, ruby là một ngôn ngữ khá thoải mái trong cú pháp. Bạn có thể sử dụng extent, prepend, hoặc include để làm điều tương tự, tuy nhiên đối với nhiều ngôn ngữ hoặc trường hợp khác, abstract class là giải pháp duy nhất. Biết thêm để có thêm lựa chọn thôi.

Nguồn: [https://medium.com/@jeremy_96642/deep-rails-how-to-use-abstract-classes-6aee9b686e75](https://medium.com/@jeremy_96642/deep-rails-how-to-use-abstract-classes-6aee9b686e75)