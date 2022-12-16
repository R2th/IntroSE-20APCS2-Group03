## 1. Class Names:
- Tên của class sẽ bắt đầu bằng 1 chữ cái viết in hoa. Sử dụng quy tắc đặt tên camelCase thay vì snake_case.
    + camelCase: giống như cách viết của nó, từ đầu tiên viết thường, các từ tiếp theo viết hoa chữ cái đầu, ví dụ $thisIsMyVariable.
    + snake_case:  gọi là underscore case, là cách viết code dùng dấu gạch dưới để phân cách các từ, tất cả từ đều được viết thường. ví dụ: this_is_my_var
## 2. Initialize Method & Creating a Class:
- Khi tạo một lớp, bạn muốn tạo ra một phương thức khởi tạo. <br>Ví dụ: khi bạn tạo một đối tượng mới chẳng hạn, nó sẽ chạy phương thức khởi tạo và thực thi bất kỳ mã nào trong phương thức đó.
- Tuy nhiên có nhiều tham số bạn phải truyền vào để thực hiện. Trong ruby, chúng ta sử dụng toán tử @ trước một tham số để biểu thị rằng đó là một biến instance. 
Ví dụ: 
```
class Car
    def initialize(make, model)
        @make = make
        @model = model
    end
end
    vehicle = Car.new(Lexus, Vinfast)
```
Trong ví dụ: Chúng ta đã tạo 1 class với tên là Car và tạo 1 đối tượng là vehicle với 2 tham số truyền vào tương ứng là Lexus, Vinfast. <br>
=> Để tạo mới 1 đối tượng ta sử dụng phương thức là: name = Object.new() 
## 3. Public:
### a. Public Class Method:
Tạo một lớp mới (chưa được đặt tên) với super class đã cho (hoặc Object nếu không có tham số nào được đưa ra). Bạn có thể đặt tên cho một lớp bằng cách gán đối tượng lớp cho hằng số.<br>
Nếu một khối được đưa ra, nó được truyền vào đối tượng lớp và khối của lớp này như class_eval.
```
class Foo
  def self.bar
    puts 'class method'
  end
end
Foo.bar # => "class method"
```
Class method có thể gọi thẳng tới method từ Class cha. 
### b. Public Instance Methods:
Instance method thì sử dụng đơn giản hơn class method.
Ví dụ:
```
class Foo
  def baz
    puts 'instance method'
  end
end

Foo.new.baz # "instance method"
```
Chúng ta phải khai báo đối tượng mới có thể gọi method baz trong class Foo.
##  4. Private Instance Methods
Có gọi được và sử dụng nếu là lớp con của lớp hiện tại.
Ví dụ: 
```
class Foo
  def self.inherited(subclass)
    puts "New subclass: #{subclass}"
  end
end

class Bar < Foo
end

class Baz < Bar
end

#New subclass: Bar
#New subclass: Baz
```
## 5. Kết luận:
- Qua các ví dụ trên mong các bạn sẽ hiểu rõ thêm về class trong ruby. Nếu có sai sót gì mong các bạn góp ý và cùng xây dựng để bài viết có chất lượng hơn.
- Một vài tài liệu tham khảo: 
    + ruby-doc.org
    + AT-ruby tranning