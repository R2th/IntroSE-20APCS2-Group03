# Factory Method
*Hay còn được biết đến là **Virtual Constructor***

## Tư tưởng

`Factory Method` là một `creational parttern`, nó cung cấp giao diện để tạo các đối tượng trong `superclass`, nhưng cho phép `subclasses` thay đổi loại đối tượng sẽ được tạo.

## Đặt vấn đề

Hãy tưởng tượng rằng bạn đang tạo ra một ứng dụng quản lý logistics. Phiên bản đầu tiên của ứng dụng chỉ có thể xử lý việc vận chuyển bằng xe tải, vì vậy phần lớn code của bạn nằm trong class `Truck`.

Sau một thời gian, ứng dụng của bạn được nhiều công ty sử dụng hơn. Mỗi ngày bạn nhận được hàng tá yêu cầu từ các công ty vận tải biển về việc tích hợp dịch vụ logistic trên biển vào ứng dụng của bạn.

![](https://images.viblo.asia/b9e62d60-a2af-4f7e-b7fb-e8c5e2257127.png)

Đấy là tin tuyệt vời đúng không? Nhưng làm thế nào đề triển khai? Hiện tại, hầu hết code của bạn được được thiết kế để xử lý các object thuộc class `Truck`. Thêm`Ship` vào ứng dụng sẽ yêu cầu thực hiện thay đổi cho toàn bộ phần code base. Hơn nữa, nếu sau này bạn quyết định thêm một `class` ứng với 1 loại phương tiện giao thông nào đó vào ứng dụng, có lẽ bạn sẽ cần phải thực hiện lại tất cả những thay đổi này.

Kết quả là bạn sẽ kết thúc với đoạn code trong khá nát, đánh đố với các câu lệnh `if else`, `case when`?

## Giải pháp

`Factory Method parttern` gợi ý rằng thay vì gọi method từ 1 class thì hay tạo ra các `subclasses`, triển khai logic code hay dữ liệu trả về tại các methods ở `subclasses`. Và khi bạn cần sử dụng methods nào thì hay gọi trực tiếp từ `subclasses`

![](https://images.viblo.asia/7f3383d7-16d4-49df-949c-c80b9149b3c3.png)

## Ứng dụng
* Sử dụng `Factory Method` khi bạn không biết trước loại hay thuộc tính của các đối tượng mà code của bạn sẽ phải xử lý.


-----


`Factory Method` tách biệt phần code khởi tạo `product` với phần code sử dụng `product`. Do đó, nó dễ dàng hơn để mở rộng mã xây dựng `product` một cách độc lập với phần còn lại.
*Ví dụ: để thêm một `product` vào ứng dụng, bạn sẽ chỉ cần tạo một `subclass` mới và ghi đè các phương thức của superclass.*


-----


* Sử dụng `Factory Method` khi bạn muốn cung cấp cho người dùng thư viện hoặc framework một cách dễ mở rộng các thành phần bên trong nó.


## Example code

```
# The Creator class declares the factory method that is supposed to return an
# object of a Product class. The Creator's subclasses usually provide the
# implementation of this method.
class Creator
  # Note that the Creator may also provide some default implementation of the
  # factory method.
  def factory_method
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  # Also note that, despite its name, the Creator's primary responsibility is
  # not creating products. Usually, it contains some core business logic that
  # relies on Product objects, returned by the factory method. Subclasses can
  # indirectly change that business logic by overriding the factory method and
  # returning a different type of product from it.
  def some_operation
    # Call the factory method to create a Product object.
    product = factory_method

    # Now, use the product.
    result = "Creator: The same creator's code has just worked with #{product.operation}"

    result
  end
end

# Concrete Creators override the factory method in order to change the resulting
# product's type.
class ConcreteCreator1 < Creator
  # Note that the signature of the method still uses the abstract product type,
  # even though the concrete product is actually returned from the method. This
  # way the Creator can stay independent of concrete product classes.
  def factory_method
    ConcreteProduct1.new
  end
end

class ConcreteCreator2 < Creator
  # @return [ConcreteProduct2]
  def factory_method
    ConcreteProduct2.new
  end
end

# The Product interface declares the operations that all concrete products must
# implement.
class Product
  # return [String]
  def operation
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

# Concrete Products provide various implementations of the Product interface.
class ConcreteProduct1 < Product
  # @return [String]
  def operation
    '{Result of the ConcreteProduct1}'
  end
end

class ConcreteProduct2 < Product
  # @return [String]
  def operation
    '{Result of the ConcreteProduct2}'
  end
end

# The client code works with an instance of a concrete creator, albeit through
# its base interface. As long as the client keeps working with the creator via
# the base interface, you can pass it any creator's subclass.
def client_code(creator)
  print "Client: I'm not aware of the creator's class, but it still works.\n"\
        "#{creator.some_operation}"
end

puts 'App: Launched with the ConcreteCreator1.'
client_code(ConcreteCreator1.new)
puts "\n\n"

puts 'App: Launched with the ConcreteCreator2.'
client_code(ConcreteCreator2.new)
```