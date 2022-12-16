Trong bài viết này chúng ta sẽ đi tìm hiểu về một class rất đặc biệt trong Ruby, đó là `Symbol` class thông qua việc tìm hiểu về các vấn đề liên quan:
* What’s a Symbol in Ruby?
* The Symbol class
* Symbols behind the scene
## What’s a Symbol in Ruby?
Trong Ruby một symbol là một đối tượng thuộc `Symbol` class. Mỗi một đối tượng symbol là duy nhất và được sử dụng để định danh cho một resource. Đó có thể là:
* Một method
* Một variable
* Một hash key
* Một trạng thái
* ...

Mỗi một symbol sẽ chỉ được tạo ra một lần duy nhất
```
:pending.object_id # => 1277788
:pending.object_id # => 1277788
```
Chúng ta có thể thấy, symbol `:pending` chỉ được khởi tạo trong lần đầu tiên nó được gọi. Và `:pending.object_id` lúc nào cũng cho ra một kết quả giống nhau.
`Symbol` thường được so sánh với `String` bởi chúng có nhiều điểm tương đồng. Điều khác biệt cơ bản nhất đó là khác với `Symbol`, một đối tượng `String` sẽ được tự động tạo ra ngay sau khi chúng được định nghĩa.
```
"pending".object_id # => 70324176174080
"pending".object_id # => 70324176168090
```
## The Symbol class
`Symbol` class là một phần của **Ruby’s Core Library**
```
irb> Symbol.new
NoMethodError (undefined method `new' for Symbol:Class)
```
Chúng ta nhận được thông báo lỗi như trên là do một symbol sẽ được ngầm tạo ra khi chúng ta định nghĩa nó
```
irb> :dummy_symbol.class
 => Symbol
```
Chúng ta hãy cùng nhau xem qua chuỗi kế thừa của `Symbol` class để hiểu rõ hơn về chúng
```
irb> Symbol.ancestors
 => [Symbol, Comparable, Object, Kernel, BasicObject]
```
`Symbol` class được kết thừa trực tiếp từ `Object` class, bởi vì `Comparable` là một module. Trong `Symbol` class cũng định nghĩa các method phục vụ cho việc chỉnh sửa hay so sánh các symbol với nhau. Phần lớn các method này sử dụng `Symbol#to_s` method như một là một thể hiện để làm việc với các `String`
## Symbols behind the scene
Nhắc lại một lần nữa rằng mỗi một symbol sau khi được tạo ra là duy nhất. Để đảm bảo việc đó, Ruby sẽ phải có cơ chế để theo dõi chúng.
Ruby cung cấp một table có tên là `global_symbols` chịu trách nhiệm theo dõi tất cả các symbol trong khi chương trình chạy
> Mỗi một symbol từ khi được tạo ra sẽ được lưu trên bộ nhớ và tồn tại cho đến khi chương trình kết thúc. Điều này giúp chúng được sử dụng hiệu quả tuy nhiên chúng có thể làm lãng phí bộ nhớ. Điều này sảy ra với các phiên bản Ruby có version < 2.2.0, ở các phiên bản cao hơn, các symbol sẽ được quản lý và tự động dọn dẹp nhờ vào bộ dọn rác của Ruby

`Symbol.all_symbols` method được sử dụng để hiển thị ra một mảng các symbol đại diện cho dữ liệu hiện tại có trong table `global_symbols`
```
Symbol.all_symbols.length                    # => 3893
Symbol.all_symbols.grep /Struct/             # => [:Struct, :OpenStruct]

:dummy_symbol
Symbol.all_symbols.length                    # => 3894
Symbol.all_symbols.include?(:dummy_symbol)   # => true

dummy_variable = nil
Symbol.all_symbols.length                    # => 3895
Symbol.all_symbols.include?(:dummy_variable) # => true

def dummy_method; end
Symbol.all_symbols.length                    # => 3896
Symbol.all_symbols.include?(:dummy_method)   # => true

class DummyClass; end
Symbol.all_symbols.length                    # => 3897
Symbol.all_symbols.include?(:DummyClass)     # => true

Symbol.all_symbols.include?(:Hash)           # => true
class Hash; end
Symbol.all_symbols.length                    # => 3897
```
Bất cứ khi nào một variable được khai báo, một method, hay class được định nghĩa... tương ứng với đó là một symbol sẽ được đưa vào trong table `global_symbols`
## Summary
Như vậy chúng ta đã đi tìm hiểu xong về Symbol - một class rất quan trọng trong Ruby

Source: https://medium.com/@farsi_mehdi/symbol-in-ruby-daca5abd4ab2