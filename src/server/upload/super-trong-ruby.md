Trong khi tìm hiểu dự án thì mình gặp rất nhiều đoạn những coder trước sử dụng `super`, lúc đầu lúng túng không biết dùng để làm gì, `binding` vào thì chả hiểu tại sao lại chạy thêm một đoạn log nữa ở đầu ra :v. Lúc này thì hỏi bác GG trước vậy =)),  chúng ta cùng tìm hiểu nhé - đương nhiên là nếu bạn hứng thú :).

## Super vs Super ()
Câu đầu tiên mình đọc được khi tìm kiếm về `super` là
`super method calls the parent class method` - `method super gọi method ở class cha`. Đơn giản thôi!, làm một ví dụ nhỏ là hiểu

```
class A
  def a
    puts 'class A'
  end
end

class B < A
  def a
    puts 'class B'
  end
end

B.new.a => "class B"

```

đây là ghi đề method `#a` chứ chưa sử dụng `super` =))

```
class A
  def a
    puts 'class A'
  end
end

class B < A
  def a message
    super
  end
end

B.new.a => "class A"

```

class B đang ghi đè method a của class A, trong method a của class B ta có thể gọi `super` mà không cần tham số truyền vào nào cả. Sau đó, Ruby cố tìm 1 method #a trong `ancestor chain` của class B. Hiểu đơn giản thì nó sẽ gọi được method `#a` trong class A và trả về kết quả như nè. Việc này rất hữu ích để sử dụng các inherited class.

Nhưng nếu như method `#a ` trong class B có tham số truyền vào thì liệu có sử dụng được keyword `super` không?
Thay đổi lại method `#a` trong class B và thử lại xem nào.
```
class B < A
  def a message
    super
  end
end

B.new.a  => ArgumentError (wrong number of arguments (given 1, expected 0))
```

Trường hợp này xảy ra lỗi bởi vì method `#a` trong class A không có tham số nào cả. Nhưng ta vẫn cứ muốn truyền tham số vào thì phải làm thế nào? Lúc này ta có thêm `super()`

```
class B < A
  def a message
    super()
  end
end

B.new.a('Hello !')  => "class A"
```

## super with blocks

Cùng định nghĩa lại các method trên đã

```
class A
  def a
    yield
  end
end

class B < A
  def a
    super
  end
end

B.new.a { p 'Ielts Face-Off' } # => "Ielts Face-Off"
```
=> `super` đã gọi tới keyword `yield` để có thể thực hiện được khối block truyền vào

Cùng tóm tắt lại nào

- Khi bạn gọi `super` mà không có tham số, Ruby sẽ gửi một thông điệp tới cha mẹ của đối tượng hiện tại, yêu cầu nó gọi một phương thức có cùng tên với phương thức gọi `super`. Nó tự động chuyển tiếp các tham số được truyền cho phương thức mà nó được gọi.
- Được gọi với một danh sách tham số trống - super () - nó không gửi tham số cho phương thức cao hơn, ngay cả khi các tham số được truyền cho phương thức hiện tại.
- Được gọi với các tham số cụ thể - super (a, b, c) - nó gửi chính xác các tham số đó.
- Ta có thể truyền block thông qua việc gọi super đến parent class có keyword `yield`

Tks for reading!

Tài liệu tham khảo

http://rubylearning.com/satishtalim/ruby_overriding_methods.html

https://medium.com/rubycademy/the-super-keyword-a75b67f46f05

https://stackoverflow.com/questions/4632224/super-keyword-in-ruby