- Bài viết được dịch từ bài [Scope gates in Ruby](https://medium.com/rubycademy/scope-gates-in-ruby-part-ii-e3c01ece9ad6) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/1280/1*Txj1ThGRKnJpwMnHTgfKrg.jpeg)

-----
[Phần 1](https://viblo.asia/p/scope-gates-trong-ruby-phan-1-aWj53LjeK6m) chúng ta đã tìm hiểu:

* method scope
* class scope

Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:

* module scope
* nesting và scopes

> Trước tiên, hãy thoải mái khi đọc bài [Scope gates trong Ruby: Phần 1](https://viblo.asia/p/scope-gates-trong-ruby-phan-1-aWj53LjeK6m) trước khi tiếp tục.

### Module Scope
Khi chúng ta sử dụng từ khóa `module`:
* Giá trị của `self` thay đổi
* Nội dung của module được nhúng trong một scope biệt lập

Hãy cùng xem một ví dụ sau
```ruby
self # => main

outer_variable = 'hello'

module Commentable
  p self # => Commentable
  
  @instance_variable = 'hello world!'
  
  def self.hello
    p outer_variable # => NameError (undefined local variable or method `outer_variable' for Commentable:Module)
  end
  
  def self.hello_world
    p @instance_variable # => 'hello world!'
  end
end
```

Ở đây chúng ta có thể thấy rằng trong module `self ` có một giá trị khác - nó đề cập đến module `Commentable `.

Ngoài ra, chúng ta không có quyền truy cập vào các biến và phương thức được khai báo bên ngoài module.

Lưu ý rằng chúng ta có quyền truy cập vào các biến thể hiện trong các phương thức với cùng lý do được mô tả trong [Phần I](https://viblo.asia/p/scope-gates-trong-ruby-phan-1-aWj53LjeK6m)

### Nesting and scopes
Khi chúng ta lồng một module hoặc một class bên trong một module khác thì:
* giá trị của self thay đổi
* nội dung của nested module được nhúng trong một phạm vi tách biệt
* nested module có thể truy cập các biến cục bộ từ scope cao hơn
* nested module có thể truy cập các biến instance được định nghĩa trong nesting scope (theo mình hiểu thì nesting scope nghĩa là các scope cao hơn hoặc cùng cấp)

```ruby
local_variable = 'hello local'

module First
  self # => First
  
  @instance_variable = 'hello module First'

  def self.hello_world
    @instance_variable
  end

  module Second
    self # => First::Second
    
    def self.local_hello_world
      local_variable
    end

    def self.instance_hello_world
      @instance_variable
    end
  end
end

First.hello_world                  # => 'hello module First'
First::Second.local_hello_world    # => NameError (undefined local variable or method `local_variable' for First::Second:Module)
First::Second.instance_hello_world # => nil
```
Ở đây, giá trị của `self` là `First ` trong nesting module và `First::Second` trong nested module.

Ngoài ra, chúng ta có thể thấy module `First::Second` có thể truy cập vào biến @instance_variable được xác định trong module `First`

Thật vậy, @instance_variable bằng với nil bởi vì nó có một biến instance được khai báo mới trong module `First::Second`

Trong Phần III, chúng ta sẽ nói về khái niệm Flat Scope và chúng ta sẽ xem cách truy cập higher scope Các biến cục bộ trong một class hoặc module!

Tôi đã giải thích trong tất cả 2 bài viết rằng chúng ta không thể truy cập các biến cục bộ từ bên ngoài scope trong một module hoặc một class.

Nhưng Ruby là một ngôn ngữ cho phép! :-)

---

Scope gates trong Ruby: [Phần cuối - flat scope](https://medium.com/rubycademy/scope-gates-in-ruby-flat-scopes-bbf100f8e459)