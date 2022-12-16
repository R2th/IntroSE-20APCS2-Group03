Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu và khám phá các chủ đề sau:

- Nguyên tắc trách nhiệm duy nhất(Single responsibility principle)
- Nguyên tắc đóng mở(Open/closed principle)
- Nguyên tắc thay thế của Liskov(Liskov substitution principle)
- Nguyên tắc phân chia interface(Interface segregation principle)
- Nguyên tắc đảo ngược sự phụ thuộc(Dependency Inversion principle)

# Introduction

SOLID là viết tắt của 5 chữ cái đầu trong 5 nguyên tắc thiết kế hướng đối tượng, giúp cho developer viết ra những đoạn code dễ đọc, dễ hiểu, dễ maintain, được đưa ra bởi Bob Martin và Michael Feathers.
Như đã nói, hãy cùng nhau đi vào từng nguyên tắc và tìm hiểu các ví dụ nhỏ liên quan:

# Single Responsibility principle

Nguyên lý này dựa trên một thực tế rằng: một class chỉ nên chịu trách nhiệm cho 1 khía cạnh nào đó duy nhất của chương trình. Điều đó có nghĩa rằng, khi 1 class thay đổi, nó chỉ ảnh hưởng đến một khía cạnh của chương trình.
Lấy ví dụ:

```
class Logger
  def log(message)
    puts message
  end
end

class Authenticator
  def initialize
    @logger = Logger.new
  end

  def sign_in(profile)
    @logger.log("user #{profile.email}: signed in at <#{profile.signed_in_at}>"
  end
end
```

Ở ví dụ trên, nếu có sự thay đổi nào đó trong cách để in log, ví dụ như muốn log ra file thay vì một câu puts đơn giản trên, thì ta chỉ việc update sự thay đổi đó trong class Logger duy nhất, class duy nhất chịu trách nhiệm in log

# Open/Closed principle

Nguyên tắc này dựa trên một thực tế là: một class chỉ nên được mở rộng chứ không thay đổi trực tiếp bên trong class đó. Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ) không nên sửa đổi trực tiếp class cũ:
Ví dụ:

```
class Collection < Array
  def print_collection
    # ...
  end
  
  def [](position)
    # ...
  end
end
```

Ở ví dụ trên, lớp Array không thay đổi khi một lớp Collection kế thừa lớp Array, lớp Collection này vẫn nhận đầy đủ các thuộc tính của một mảng. Với pattern này, cho phép bạn add thêm các function mới cũng như có thể sửa đổi các  lại các function cũ của lớp Array, mà không ảnh hưởng đến các thể hiện đang có của mảng Array.

# Liskov Substitution principle
Nguyên tắc này dựa trên một thực tế là: lớp dẫn xuất phải thay thế được lớp cơ sở của nó
Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình

```
class Role
  def to_s; 'default' end
end

class Admin < Role
  def to_s; 'admin' end
end

class User < Role
  def to_s; 'user' end
end

class RoleLogger
  def print_role(role)
    p "role: #{role}"
  end
end

logger = RoleLogger.new
logger.print_role(Role.new)  # => "role: default"
logger.print_role(Admin.new) # => "role: admin"
logger.print_role(User.new)  # => "role: user"
```

Ở ví dụ trên, method RoleLogger#print_role mang một argument role. Lớp Admin và User được kế thừa từ Role. Chúng ta có thể dễ dàng thay đổi các lớp này mà không làm thay đổi cấu trúc của method RoleLogger#print_role

# Interface Segregation principle

Nguyên lý thứ tư, tương ứng với chữ I trong SOLID. Nội dung nguyên lý:
Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.

# Dependency Inversion principle

Nguyên lý cuối cùng, tương ứng với chữ D trong SOLID. Nội dung nguyên lý:

- Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
- Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)

Tham khảo:

https://medium.com/@farsi_mehdi/solid-ruby-in-5-short-examples-353ea22f9b05?fbclid=IwAR1ZjPcDivKoDWxWhR0RmMHZyM_98GAhZxs9oOIkN8lG8d-IQuvRMQ5phd8