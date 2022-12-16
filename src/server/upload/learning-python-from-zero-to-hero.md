![](https://images.viblo.asia/70862457-9098-4077-845b-3057d32dd361.png)

Đối với tôi, lý do đầu tiên để học Python là nó là một ngôn ngữ lập trình đẹp. Thật là tự nhiên khi viết mã và thể hiện suy nghĩ của mình.

Một lý do khác là ta có thể sử dụng Python theo nhiều cách: data scienve, web development, machine learning, ... . Các trang web nổi tiếng như Quora, Pinterest và Spotify đều sử dụng Python để phát triển phần backend. Vì vậy, ta hãy tìm hiểu một chút về nó nhé.

# Basic
## Variables
Bạn có thể nghĩ là các biến như các từ chứa một giá trị. Chỉ đơn giản vậy thôi.

Trong Python, nó thực sự dễ dàng để xác định một biến và thiết lập một giá trị cho nó. Hãy tưởng tượng bạn muốn lưu trữ số **1** và trong một biến được gọi là **one**. Hãy làm điều đó. 
```
one = 1
```

Đơn giản vậy thôi. Bạn vừa gán giá trị **1** cho biến **one**


Và bạn có thể gán bất kỳ giá trị nào khác cho bất kỳ biến nào khác mà bạn muốn. Ví dụ như trường hợp đưới đây, bạn gán số nguyên **2** vào biến **two**, 10.000 vào biến **some_number**
```
two = 2
some_number = 10000
```
Bên cạnh các số nguyên, chúng ta cũng có thể sử dụng boolean (True/False), string, boolean và rất nhiều kiểu dữ liệu khác.
```
# booleans
true_boolean = True
false_boolean = False

# string
company_name = "Framgia"

# float
book_price = 16
```
## Conditional statements
Câu lệnh **if** sử dụng một biểu thức để đánh giá liệu một câu lệnh là True hay False. Nếu nó là True, nó thực thi những gì nằm trong câu lệnh **if**. Ví dụ:
```
if True:
  print("Hello Python If")

if 2 > 1:
  print("2 is greater than 1")
```

Câu lệnh **else** sẽ thực hiện nếu biểu thức **if** là false
```
if 1 > 2:
  print("1 is greater than 2")
else:
  print("1 is not greater than 2")
```
Bạn cũng có thể sử dụng câu lệnh **elif**
```
if 1 > 2:
  print("1 is greater than 2")
elif 2 > 1:
  print("1 is not greater than 2")
else:
  print("1 is equal to 2")
```
## Looping / Iterator
Trong Python, chúng ta có thể lặp trong các hình thức khác nhau. Tôi sẽ nói về: **while** và **for**
Vòng lặp **while**: trong khi câu lệnh trả về **true**, đoạn code bên trong khối sẽ được thực thi. Ví dụ dưới, kết quả sẽ in ra số từ 1 đến 10.
```
num = 1

while num <= 10:
    print(num)
    num += 1
```
Vòng lặp **while** cần **loop condition**. Nếu nó vẫn trả về **true**, nó sẽ tiếp tục lặp lại. Trong ví dụ trên, khi **num** là **11**, điểu kiện lặp sẽ là **false**.

Đối với vòng lặp **for**, bạn áp dụng biến **num** cho khối, và câu lệnh **for** sẽ lặp lại biến đó cho bạn. Kết quả sẽ in ra số từ 1 đến 10.
```
for i in range(1, 11):
  print(i)
```
Trông nó thật đơn giản phải không. Phạm vi bắt đầu từ 1 đến phần tử thứ 11.

## List: Collection | Array | Data Structure
Hãy tưởng tượng bạn muốn lưu trữ số nguyên **1** trong một biến. Nhưng giờ bạn muốn lưu trữ **2** và **3, 4, 5, ... .**

**List** là một collection có thể được sử dụng để lưu trữ một danh sách các giá trị (như các số nguyên mà bạn muốn). Vì vậy, hãy sử dụng nó:
```
my_integers = [1, 2, 3, 4, 5]
```
Trông nó thực sự đơn giản. Chúng ta đã tạo ra một mảng và lưu trữ các giá trị với biến **my_integers**.

Nhưng bạn có thể hỏi: "Làm thế nào để tôi có thể lấy ra được một giá trị từ mảng này?"

**List** có một khái niệm là **index**. Phần tử đầu tiên nhận index 0, thứ hai nhận là 1,... .

Bạn có hình dung như sau:
![](https://images.viblo.asia/cb7a8664-3da5-4ca8-9d24-6b08921c9383.jpeg)
Sử dụng theo cú pháp Python, nó sẽ như thế này:
```
my_integers = [5, 7, 1, 3, 4]
print(my_integers[0]) # 5
print(my_integers[1]) # 7
print(my_integers[4]) # 4
```
Hãy tưởng rằng giờ bạn không muốn lưu trữ các số nguyên mà thay vào đó là lưu trữ các string, ví dụ như danh sách tên người chẳng hạn. Xem ví dụ bên dưới nhé:
```
relatives_names = [
  "Toshiaki",
  "Juliana",
  "Yuji",
  "Bruno",
  "Kaio"
]

print(relatives_names[4]) # Kaio
```
Nó hoạt động theo cùng cách như với số nguyên. So good :)
Nhưng giờ muốn thêm phần tử vào **List** thì sẽ như thế nào đây. Dưới đây là cách thực hiện:
```
bookshelf = []
bookshelf.append("The Effective Engineer")
bookshelf.append("The 4 Hour Work Week")
print(bookshelf[0]) # The Effective Engineer
print(bookshelf[1]) # The 4 Hour Work Week
```
## Dictionary: Key-Value Data Structure
Bây giờ,chúng ta biết rằng **List** chỉ tạo ra được với chỉ mục là số nguyên. Vậy chúng ta không muốn sử dụng số nguyên làm chỉ mục thì sao nhỉ? Một số cấu trúc dữ liệu mà chúng tôi có thể sử dụng là số, chuỗi hoặc các loại chỉ mục khác.

Hãy tìm hiểu về **Dictionary**. **Dictionary** là tập  hợp các key-value. Nó sẽ trông giống như dưới đây:
```
dictionary_example = {
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```
**key** là chỉ mục trỏ đến **value**. Làm thế nào để truy cập giá trị của Dictionary. Hãy thử nó xem sao:
```
ictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

print("My name is %s" %(dictionary_tk["name"])) # My name is Leandro
print("But you can call me %s" %(dictionary_tk["nickname"])) # But you can call me Tk
print("And by the way I'm %s" %(dictionary_tk["nationality"])) # And by the way I'm Brazilian
```
Vậy ta thêm phần tử vào **Dictionary** như nào nhỉ? Cùng xem ví dụ dưới đây:
```
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

dictionary_tk['age'] = 24

print(dictionary_tk) # {'nationality': 'Brazilian', 'age': 24, 'nickname': 'Tk', 'name': 'Leandro'}
```
Chúng ta chỉ cần gán một **value** cho một **Dictionary key**. Không có gì phức tạp ở đây phải không :).
## Iteration: Looping Through Data Structures
Như chúng ta đã học ở bên trên, việc lặp lại List cũng rất đơn giản. Hãy thử nào:
```
bookshelf = [
  "The Effective Engineer",
  "The 4 hours work week",
  "Zero to One",
  "Lean Startup",
  "Hooked"
]

for book in bookshelf:
    print(book)
```
Đối với hash, chúng ta cũng có thể sử dụng vòng lặp **for**, nhưng chúng ta sẽ áp dụng với **key**:
```
dictionary = { "some_key": "some_value" }

for key in dictionary:
    print("%s --> %s" %(key, dictionary[key]))
    
# some_key --> some_value
```
Chúng ta đã đặt tên cho 2 tham số là **key** và **value**, nhưng không cần thiết. Chúng ta có thể đặt tên khác, hãy thử xem nào:
```
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian",
  "age": 24
}

for attribute, value in dictionary_tk.items():
    print("My %s is %s" %(attribute, value))
    
# My name is Leandro
# My nickname is Tk
# My nationality is Brazilian
# My age is 24
```
## Classes & Objects
Python là một ngôn ngữ lập trình hướng đối tượng, có các khái niệm:**class** và **object.**

Một **class** là một mô hình chi tiết cho các đối tượng của nó.

Vì vậy, một lần nữa, một **class** chỉ là một mô hình, hoặc một cách để xác định các **attributes** và **behavior**.

Cùng xem cú pháp Python cho **class**:
```
class Vehicle:
    pass
```
Các **Object** là thể hiện của một **class**.
```
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x7fb1de6c2638>
```
Ở đây **car** là một đối tượng của class **Vehicle**.

Chúng ta thiết lập tất cả các thuộc tính như số bánh xe, loại xe, sức chứa, vận tốc tối đa khi khở tạo đối tương xe. Ở đây chúng ta định nghĩa lớp để nhận dữ liệu khi khởi tạo nó.
```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```
Chúng ta sử dụng **init method**. Chúng ta gọi đây là phương thức khởi tạo. Vì vậy, khi chúng ta khởi tạo ra đối tượng xe, chúng ta có thể định nghĩa các thuộc tính này. Hãy tưởng tượng chúng ta **Tesla Model S**, và chúng ta muốn tạo ra đối tượng này. Nó có 4 bánh xe, chaỵ bằng năng lượng điện, 5 chỗ ngồi, vận tốc tối đa là 250 km/h. Hãy tạo đối tượng này:
```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
```
Tất cả các thuộc tính đã được thiết lập. Nhưng làm cách nào để chúng ta có thể truy cập vào các giá trị của các thuộc tính này? Đó là **method**. Đó là **object’s behavior**.
```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def number_of_wheels(self):
        return self.number_of_wheels

    def set_number_of_wheels(self, number):
        self.number_of_wheels = number
```
Đây là triển khai thực hiện 2 methods: **number_of_wheels** và **set_number_of_wheels**. Chúng được gọi là **getter** và **setter**. Bởi vì giá trị đầu tiên nhận giá trị thuộc tính và giá trị thứ hai đặt giá trị mới cho thuộc tính.

Trong Python, chúng ta có thể làm điều đó bằng cách sử dụng @property để xác định **getters** và **setters**. Hãy xem đoạn code dưới đây:
```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    @property
    def number_of_wheels(self):
        return self.number_of_wheels

    @number_of_wheels.setter
    def number_of_wheels(self, number):
        self.number_of_wheels = number
```
Và chúng ta có thể sử dụng **methods** này như các **attributes**.
```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
print(tesla_model_s.number_of_wheels) # 4
tesla_model_s.number_of_wheels = 2 # setting number of wheels to 2
print(tesla_model_s.number_of_wheels) # 2
```
Điều này hơi khác so với defining methods. Các phương thức hoạt động như các thuộc tính.

Nhưng chúng ta cũng có thể sử dụng các methods cho những thứ khác, như phương pháp '**make_noise**'. Hãy xem nó:
```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def make_noise(self):
        print('VRUUUUUUUM')
```
Khi chúng ta họi đến method này
```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
tesla_model_s.make_noise() # VRUUUUUUUM
```
## Encapsulation
### Public Instance Variables
Đối với một lớp Python, chúng ta có thể khởi tạo một **public instance variable** trong phương thức khởi tạo của chúng ta. 

Trong phương thức khởi tạo:
```
class Person:
    def __init__(self, first_name):
        self.first_name = first_name
```
Ở đây chúng ta áp dụng giá trị **first_name** làm đối số cho **public instance variable**
```
tk = Person('TK')
print(tk.first_name) # => TK
```
Trong class:
```
class Person:
    first_name = 'TK'
```
Ở đây chúng ta không cần phải áp dụng **first_name** như một đối số, và tất cả các đối tượng thể hiện sẽ có một **class attribute** được khởi tạo là **TK**
```
tk = Person()
print(tk.first_name) # => TK
```
Chúng ta có thể đặt một giá trị khác cho biến **first_name**
```
tk = Person('TK')
tk.first_name = 'Kaio'
print(tk.first_name) # => Kaio
```
Vì đó là một biến public, nên chúng ta có thể làm điều đó.

**...**
# Tham khảo
https://medium.freecodecamp.org/learning-python-from-zero-to-hero-120ea540b567