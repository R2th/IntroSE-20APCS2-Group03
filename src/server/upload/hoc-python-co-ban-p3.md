# Mở đầu
Hôm nay mình sẽ tiếp tục viết tiếp về những kiến thức cơ bản của python, các bạn có thể xem 

P1 ở đây: https://viblo.asia/p/hoc-python-co-ban-p1-LzD5d6REZjY

P2 ở đây: https://viblo.asia/p/hoc-python-co-ban-p2-m68Z00wdZkG

## Encapsulation: Ẩn thông tin
**Encapsulation** (đóng gói) là một cơ chế hạn chế quyền truy cập trực tiếp vào data và method của object. Nhưng đồng thời, nó tạo điều kiện cho hoạt động trên các data và method của object một cách hiệu quả hơn.

“Đóng gói có thể được sử dụng để ẩn các biến và phương thức của object. Theo định nghĩa này, đóng gói có nghĩa là biểu diễn bên trong của một object thường bị ẩn khỏi tầm nhìn bên ngoài định nghĩa của đối tượng. ”- Wikipedia

Tất cả các đại diện bên trong của một object được ẩn từ bên ngoài. Chỉ có bên trong object mới có thể tương tác với dữ liệu nội bộ của nó.

Đầu tiên, chúng ta cần phải hiểu các biến và phương thức công khai và không công khai hoạt động như thế nào.

### Public Instance Variables
Đối với class trong Python, chúng ta có thể khởi tạo một **public variable** (biến công khai) bên trong phương thức khởi tạo.
Hãy xem điều này:

```
class Person:
    def __init__(self, first_name):
        self.first_name = first_name
```

Ở đây chúng ta áp dụng giá trị *firstname* làm một biến công khai.

```
tk = Person('TK')
print(tk.first_name) # => TK
```

Bây giờ, chúng ta tạo ra một giá trị mặc định cho Person, Trong class Person chỉnh thành:
```
class Person:
    first_name = 'TK'
```

Ở đây, chúng ta không cần phải khai báo *firstname* khi khởi tạo nữa, và tất cả các đối tượng Person được khởi tạo với giá trị mặc định "TK".

```
tk = Person()
print(tk.first_name) # => TK
```

Bây giờ chúng ta đã học được rằng chúng ta có thể sử dụng các biến công khai.

Một điều thú vị khác về phần biến công khai là chúng ta có thể Get và Set các giá trị cho các biến.

Vd như chúng ta muốn đặt một giá trị khác cho biến *firstname* của nó:

```
tk = Person('TK')
tk.first_name = 'Kaio'
print(tk.first_name) # => Kaio
```

Chúng ta chỉ cần thiết lập một giá trị khác (Kaio) cho biến cá thể *firstname* và nó đã được cập nhật giá trị.
Đơn giản như thế.Vì đó là một biến công khai, chúng ta có thể làm điều đó :]].

### Non-public Instance Variable

Chúng tôi không sử dụng thuật ngữ "private" (riêng tư) ở đây vì không có thuộc tính nào thực sự riêng tư trong Python - PEP 8

Như **public instance variable**, chúng ta có thể định nghĩa **non-public instance variable** trong cả phương thức khởi tạo hoặc trong class. Sự khác biệt cú pháp là: đối với các **non-public instance variables** chúng ta sử dụng dấu gạch dưới (_) trước tên biến.

*"Các biến cá thể" riêng tư "không thể truy cập từ bên ngoài trừ từ bên trong một đối tượng không tồn tại trong Python*.

Tuy nhiên, có một **quy ước** được theo sau bởi hầu hết mã Python: một tên được đặt trước bằng dấu gạch dưới (ví dụ _spam) sẽ được coi là một phần không công khai của API (cho dù đó là function, method hoặc các thành phần data) ”

Ví dụ:

```
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email
```

Bạn có thấy biến email không? Đây là cách chúng tôi xác định biến không công khai:
```
tk = Person('TK', 'tk@mail.com')
print(tk._email) # tk@mail.com
```

Chúng ta có thể truy cập và cập nhật nó. **Các biến không công khai chỉ là một quy ước** và được coi là một phần không công khai.

Vì vậy, chúng tôi sử dụng một phương pháp cho phép chúng tôi làm điều đó bên trong định nghĩa lớp học của chúng tôi. 

Hãy thực hiện hai phương thức (email và update_email) để hiểu nó:
```
class Person:
    def __init__(self, first_name, email):
        self.first_name = first_name
        self._email = email

    def update_email(self, new_email):
        self._email = new_email

    def email(self):
        return self._email
```

Bây giờ chúng ta có thể cập nhật và truy cập các biến không công khai bằng cách sử dụng các phương thức đó.

Hãy xem:
```
tk = Person('TK', 'tk@mail.com') #1
print(tk.email()) # => tk@mail.com #2
tk._email = 'new_tk@mail.com' #3
print(tk.email()) # => tk@mail.com #4
tk.update_email('new_tk@mail.com') #5
print(tk.email()) # => new_tk@mail.com #6
```

1. Chúng tôi bắt đầu khởi tạo một đối tượng mới với first_name là TK và email là tk@mail.com.

2. In email bằng cách truy cập biến không công khai với phương thức email().

3. Đặt một email mới từ bên ngoài class qua biến không công khai _email.

4. Nhưng bạn thấy chúng ta không thể gán giá trị mới cho biến không công khai từ bên ngoài class bằng cách trực tiếp qua biến đó.

5. Chúng ta sẽ dùng hàm để cập nhập giá trị mới cho biến không công khai.

6.Thành công :]]! Chúng ta có thể cập nhật nó bên trong class của chúng ta với phương thức trợ giúp


### Public Method
Với các phương thức công khai, chúng ta cũng có thể sử dụng chúng ra class của chúng ta:
```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._age
```

Hãy thử nghiệm nó:

```
tk = Person('TK', 25)
print(tk.show_age()) # => 25
```

Tuyệt vời - chúng ta có thể sử dụng nó mà không có bất kỳ vấn đề gì :]].

### Non-public Method

Nhưng với phương thức không công khai, chúng ta không thể làm được.

Chúng ta hãy thực hiện cùng một lớp Person, nhưng bây giờ với một phương thức không công khai show_age bằng cách thêm dấu gạch dưới (_).

```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def _show_age(self):
        return self._age
```

Và bây giờ, chúng ta sẽ cố gắng gọi phương thức không công khai này với đối tượng của chúng ta:

```
tk = Person('TK', 25)
print(tk._show_age()) # => 25
```

Chúng tôi có thể truy cập và cập nhật nó. 
**Các phương thức không công khai chỉ là một quy ước** và được coi là một phần không công khai.

Dưới đây là ví dụ về cách chúng ta có thể sử dụng một cách hợp pháp =)):

```
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self._age = age

    def show_age(self):
        return self._get_age()

    def _get_age(self):
        return self._age

tk = Person('TK', 25)
print(tk.show_age()) # => 25
```

Ở đây chúng ta có phương thức không công khai _get_age và phương thức public_ public_age.

Show_age có thể được sử dụng bởi đối tượng của chúng ta (ngoài lớp của chúng ta) và _get_age chỉ được sử dụng bên trong định nghĩa lớp của chúng ta (bên trong phương thức show_age).

### Encapsulation Summary
Với việc đóng gói chúng ta có thể đảm bảo rằng biểu diễn bên trong của đối tượng được ẩn từ bên ngoài


## Inheritance: behaviors and characteristics

Một số đối tượng có một số điểm chung: hành vi và đặc điểm của chúng.

Ví dụ, tôi thừa kế một số đặc điểm và hành vi từ cha tôi.

Tôi thừa hưởng đôi mắt và mái tóc của anh ấy như những đặc điểm, và sự thiếu kiên nhẫn và thái độ của anh ấy như những hành vi.


Trong lập trình hướng đối tượng, các class có thể kế thừa các đặc điểm chung (data) và hành vi (method) từ một class khác.

Hãy xem một ví dụ khác và triển khai nó trong Python.

Hãy tưởng tượng một chiếc xe hơi. Số lượng bánh xe, công suất chỗ ngồi và vận tốc tối đa là tất cả các thuộc tính của một chiếc xe hơi.

Chúng ta có thể tạo ra một lớp ElectricCar kế thừa các thuộc tính giống nhau từ lớp Car thông thường.

```
class Car:
    def __init__(self, number_of_wheels, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```

Tạo ra một biến Car:

```
my_car = Car(4, 5, 250)
print(my_car.number_of_wheels) #4
print(my_car.seating_capacity) #5
print(my_car.maximum_velocity) #20
```

Trong Python, chúng ta áp dụng một class cha cho class con làm tham số. Một class ElectricCar có thể kế thừa từ class Car của chúng ta.

```
class ElectricCar(Car):
    def __init__(self, number_of_wheels, seating_capacity, maximum_velocity):
        Car.__init__(self, number_of_wheels, seating_capacity, maximum_velocity)
```

Đơn giản như thế. Chúng ta không cần phải thực hiện bất kỳ phương thức nào khác, bởi vì lớp này đã có nó (kế thừa từ lớp Car).
Cùng kiểm tra lại điều này:

```
my_electric_car = ElectricCar(4, 5, 250)
print(my_electric_car.number_of_wheels) # => 4
print(my_electric_car.seating_capacity) # => 5
print(my_electric_car.maximum_velocity) # => 250
```

# Tổng kết
Qua 3 Phần Python cơ bản mình đã cũng cấp cho các bạn những kiến thức cơ bản nhất về Python, mình hy vọng các bài viết sẽ hữu ích cho các bạn :]].