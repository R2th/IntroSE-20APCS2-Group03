Chào các bạn Trong bài  này, bạn sẽ tìm hiểu về Lập trình hướng đối tượng (OOP) bằng Python và khái niệm cơ bản của nó và một số các ví dụ. Các bạn cùng tìm hiểu trong bài viết của mình nhé!


----
####  Lập trình hướng đối tượng

Python là một ngôn ngữ lập trình đa mô hình. Nó hỗ trợ các cách tiếp cận lập trình khác nhau.
Một trong những cách tiếp cận phổ biến để giải quyết vấn đề lập trình là tạo các đối tượng. Điều này được gọi là Lập trình hướng đối tượng (OOP).

Một đối tượng sẽ có hai đặc điểm:
* Thuộc tính
* Hành vi

Mình có 1 ví dụ :

Một con vẹt có thể là một đối tượng, vì nó có các đặc tính sau:

* Tên, tuổi, màu sắc thì sẽ là thuộc tính
* chạy nhảy, hỏi hoặc hót thì sẽ là hành vi

Trong Python, khái niệm OOP tuân theo một số nguyên tắc cơ bản như sau:

----
####  Lớp (Class)

Một lớp là một bản thiết kế cho đối tượng.Với ví dụ con Vẹt ở trên thì chúng ta có thể hình dung `class` sẽ như một bản phác thảo về con Vẹt. Nó sẽ chứa tất cả các chi tiết về tên, màu sắc v.v. Về con Vẹt.
Ví dụ về `class`:

``` html
class Parrot:
    pass
```

Ta dùng  từ khóa `class` để định nghĩa cho 1 class `Parrot`. Từ `class` bạn có để định nghĩa các thuộc tính chi tiết để mô tả về `Parrot`.



----
####  Đối tượng (Object)

Một đối tượng) là một khởi tạo của một lớp. Khi lớp được định nghĩa nó sẽ là mô tả cho một đối tượng đước xác định.

Ở đây `obj` là một đối tượng của lớp `Parrot`.

Bây giờ, chúng ta sẽ bắt đầu xây dựng lớp và các đối tượng của `Parrot`.


#####  Tạo lớp và đối tượng trong Python


``` html
class Parrot:

    # class attribute
    species = "bird"

    # instance attribute
    def __init__(self, name, age):
        self.name = name
        self.age = age

# instantiate the Parrot class
blu = Parrot("Blu", 10)
woo = Parrot("Woo", 15)

# access the class attributes
print("Blu is a {}".format(blu.__class__.species))
print("Woo is also a {}".format(woo.__class__.species))

# access the instance attributes
print("{} is {} years old".format( blu.name, blu.age))
print("{} is {} years old".format( woo.name, woo.age))
```

Giá trị hiển thị :

``` html
Blu is a bird
Woo is also a bird
Blu is 10 years old
Woo is 15 years old
```

Trong chương trình trên, chúng ta đã tạo một lớp với tên Parrot. Sau đó, chúng ta  xác định các thuộc tính. Các thuộc tính là một đặc tính của một đối tượng.

Các thuộc tính này được định nghĩa bên trong phương thức `__init__` của lớp. Đây là phương thức khởi tạo được chạy đầu tiên ngay sau khi đối tượng được tạo.

Tiếp đó chúng ta tạo các instances cho  lớp `parrot`. Với ví dụ ở trên thì `blu` và `woo` sẽ là các trá trị để tham chiếu đến đối tượng.

Ta có thể truy cập thuộc tính class bằng cách sử dụng `__class__.species`. Tương tự ta cũng có thể truy cập các thuộc tính của instance bằng các sử dụng `blu.name` và `blu.age`

----
####  Phương thức (Methods)

Các phương thức là các hàm được định nghĩa bên trong phần thân của một lớp. Chúng được sử dụng để xác định các hành vi của một đối tượng.

#####  Tạo phương thức trong Python

``` html
class Parrot:
    
    # instance attributes
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    # instance method
    def sing(self, song):
        return "{} sings {}".format(self.name, song)

    def dance(self):
        return "{} is now dancing".format(self.name)

# instantiate the object
blu = Parrot("Blu", 10)

# call our instance methods
print(blu.sing("'Happy'"))
print(blu.dance())
```

Giá trị hiển thị :

``` html
Blu sings 'Happy'
Blu is now dancing
```

Với ví dụ trên. Ta đã sác định được 2 phương thức là `sing()` và `dance()`. chúng chính là phương thức cho đối tượng `blu`

----
####  Kế Thừa (Inheritance)

Kế thừa là một cách tạo một lớp mới để sử dụng các thuộc tính  của một lớp hiện có mà không cần sửa đổi nó. Lớp mới được hình thành là một lớp dẫn xuất (hoặc lớp con). Tương tự, lớp hiện có là một lớp cơ sở (hoặc lớp cha).

#####  Sử dụng Kế thừa trong Python

``` html
# parent class
class Bird:
    
    def __init__(self):
        print("Bird is ready")

    def whoisThis(self):
        print("Bird")

    def swim(self):
        print("Swim faster")

# child class
class Penguin(Bird):

    def __init__(self):
        # call super() function
        super().__init__()
        print("Penguin is ready")

    def whoisThis(self):
        print("Penguin")

    def run(self):
        print("Run faster")

peggy = Penguin()
peggy.whoisThis()
peggy.swim()
peggy.run()
```

Giá trị hiển thị :

``` html
Bird is ready
Penguin is ready
Penguin
Swim faster
Run faster
```

Ở ví dụ trên ta tạo ra 2 lớp là `Bird`(là lớp cha) và `Penguin`(là lớp con). Ở đây lớp con sẽ kế thừa các chức năng và thuộc tính của lớp cha. Ở ví dụ trên đứng từ lớp con ta có thể gọi phương thức `swim()` từ lớp cha

Tiếp đó ví dụ trên ta đã có thể sửa đổi hành vi của lớp cha là  phương thức `whoisThis()`. Hơn thế nữa ta có thể extend chức năng của lớp cha bằng cách tạo ra một phương thức `run()`

Ngoài ra, ta  sử dụng hàm `super ()` bên trong phương thức `__init __ ()`. Điều này cho phép chúng ta chạy phương thức `__init __ ()` của lớp cha bên trong lớp con.

----
####  Đóng gói (Encapsulation)

Sử dụng OOP trong Python,  ta có thể hạn chế quyền truy cập vào các phương thức và biến. Điều này ngăn dữ liệu khỏi sửa đổi trực tiếp  đây có thể gọi là Đóng Gói. Trong Python,  ta biểu thị các thuộc tính riêng tư bằng cách sử dụng dấu gạch dưới làm tiền tố, sử dụng `_` hoặc `__`

#####  Đóng gói dữ liệu trong Python

``` html
class Computer:

    def __init__(self):
        self.__maxprice = 900

    def sell(self):
        print("Selling Price: {}".format(self.__maxprice))

    def setMaxPrice(self, price):
        self.__maxprice = price

c = Computer()
c.sell()

# change the price
c.__maxprice = 1000
c.sell()

# using setter function
c.setMaxPrice(1000)
c.sell()
```


Giá trị hiển thị :

``` html
Selling Price: 900
Selling Price: 900
Selling Price: 1000
```

Ở ví dụ trên ta đã định nghĩa một lớp `computer`. Ta sử dụng phương thức `__init__()` để set giá cho `computer`. Ta đã thử sửa lại giá. Tuy nhiên sẽ không thể tahy đổi được giá vì trong Python `__maxprice` là một thuộc tính private.

Vì vậy để thay đổi giá ta cần sử dụng một mà `setMaxPrice` để lấy price làm tham số.


----
####  Tính đa hình (Polymorphism)

Tính đa hình trong OOP sử dụng một giao diện chung cho nhiều kiểu dữ liệu.

Giả sử, chúng ta cần tô màu cho một vật , có nhiều tùy chọn hình dạng (hình chữ nhật, hình vuông, hình tròn). Tuy nhiên, chúng ta có thể sử dụng cùng một phương pháp để tô màu bất kỳ hình dạng nào. Khái niệm này được gọi là Đa hình.




#####  Sử dụng tính đa hình  trong Python

``` html
class Parrot:

    def fly(self):
        print("Parrot can fly")
    
    def swim(self):
        print("Parrot can't swim")

class Penguin:

    def fly(self):
        print("Penguin can't fly")
    
    def swim(self):
        print("Penguin can swim")

# common interface
def flying_test(bird):
    bird.fly()

#instantiate objects
blu = Parrot()
peggy = Penguin()

# passing the object
flying_test(blu)
flying_test(peggy)

```


Giá trị hiển thị :

``` html
Parrot can fly
Penguin can't fly
```


Ở ví dụ ta đã định nghĩa 2 lớp `Parrot` và `Penguin`. Mỗi lớp đều có phương thức chung là `fly()`. Tuy nhiên chức năng thì sẽ khác nhau.

Để sử dụng tính đa hình. Ta tạo một hàm `fly_test()` nhận bất kì đối tượng là và gọi vào phương thức `fly()` của đối tượng đó. Vì vậy khi ta chuyển các đối tượng `blu` và `peggy` thì hàm sử dụng được và trả ra kết quả.

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về Lập Trình Hướng Đối Tương và  các ví dụ cụ thể 
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/object-oriented-programming