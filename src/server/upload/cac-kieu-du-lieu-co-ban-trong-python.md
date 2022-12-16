# Giới thiệu
Trong lập trình, kiểu dữ liệu là một khái niệm rất quan trọng. Các biến có thể lưu trữ dữ liệu thuộc nhiều kiểu khác nhau và các kiểu khác nhau có thể làm những việc khác nhau.

Python có các kiểu dữ liệu sau được tích hợp sẵn theo mặc định:

*Text Type:	`str`

*Numeric Types:	`int, float, complex`

*Sequence Types:	`list, tuple, range`

*Mapping Type:	`dict`

*Set Types:	`set, frozenset`

*Boolean Type:	`bool`

*Binary Types:	`bytes, bytearray, memoryview `

Bạn có thể lấy kiểu dữ liệu của bất kỳ đối tượng nào bằng cách sử dụng hàm `type()`:

```python
x = 5
print(type(x))
```

Trong Python, kiểu dữ liệu được đặt khi bạn gán giá trị cho một biến. Nếu bạn muốn chỉ định kiểu dữ liệu, bạn có thể sử dụng các hàm khởi tạo sau:

| Example | Data type |
| -------- | -------- |
| x = str("Hello World")     | str     |
| x = int(20)    | int     |
| x = float(20.5)   | float     |
| x = complex(1j)   | complex     |
| x = list(("apple", "banana", "cherry"))   | list     |
| x = tuple(("apple", "banana", "cherry"))   | tuple     |
| x = range(6)   | range     |
| x = dict(name="John", age=36)   | dict     |
| x = set(("apple", "banana", "cherry"))   | set     |
| x = frozenset(("apple", "banana", "cherry"))   | frozenset     |
| x = bool(5)   | bool     |
| x = bytes(5)   | bytes     |
| x = bytearray(5)   | bytearray     |
| x = memoryview(bytes(5))   | memoryview     |
# Python numbers
Có ba kiểu số trong Python:

* int

* float

* complex

## int
Int, hoặc integer, là một số nguyên, dương hoặc âm, không có số thập phân, có độ dài không giới hạn.
```python
x = 1
y = 35656222554887711
z = -3255522
```

## float
Float, hoặc "số dấu phẩy động" là một số, dương hoặc âm, chứa một hoặc nhiều số thập phân.
```python
x = 1.10
y = 1.0
z = -35.59
```

Float cũng có thể là các số khoa học với chữ "e" để biểu thị lũy thừa của 10.
```python
x = 35e3
y = 12E4
z = -87.7e100
```

## Complex
Complex (số phức) được viết với "j" là phần ảo:
```python
x = 3+5j
y = 5j
z = -5j
```
# Python Strings
## String Literals
Các ký tự chuỗi trong python được bao quanh bởi dấu ngoặc kép đơn hoặc dấu ngoặc kép.

'hello' cũng giống như "hello".

Bạn có thể hiển thị một chuỗi ký tự bằng hàm print():
```python
print("Hello")
print('Hello')
```

## Multiline Strings
Bạn có thể gán một chuỗi nhiều dòng cho một biến bằng cách sử dụng ba dấu ngoặc kép:
```python
a = """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua."""
print(a)
```
Hoặc
```python
a = '''Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.'''
print(a)
```
## Chuỗi là Mảng
Giống như nhiều ngôn ngữ lập trình phổ biến khác, chuỗi trong Python là các mảng byte đại diện cho các ký tự unicode. Tuy nhiên, Python không có kiểu dữ liệu ký tự, một ký tự đơn giản chỉ là một chuỗi có độ dài là 1. Dấu ngoặc vuông có thể được sử dụng để truy cập các phần tử của chuỗi.

Ví dụ: Lấy ký tự ở vị trí 1 (hãy nhớ rằng ký tự đầu tiên có vị trí 0)
```python
a = "Hello, World!"
print(a[1])
```
# Python Booleans
Boolean đại diện cho một trong hai giá trị: True hoặc False.
## Giá trị Boolean
Trong lập trình, bạn thường cần biết một biểu thức là True hoặc False. Bạn có thể đánh giá bất kỳ biểu thức nào trong Python và nhận được một trong hai câu trả lời, True hoặc False. Khi bạn so sánh hai giá trị, biểu thức được đánh giá và Python trả về câu trả lời Boolean:
```python
print(10 > 9)
print(10 == 9)
print(10 < 9)
```
## Hầu hết các giá trị đều là True
Hầu hết mọi giá trị đều được đánh giá là True nếu nó có một số loại nội dung.

Bất kỳ chuỗi nào là True, ngoại trừ các chuỗi rỗng.

Bất kỳ số nào là True, ngoại trừ 0.

Mọi list, tuple, set và dictionary đều True, ngoại trừ những danh sách trống.
## Một số giá trị là False
Trên thực tế, không có nhiều giá trị được đánh giá là False, ngoại trừ các giá trị trống, chẳng hạn như (), [], {}, "", số 0 và giá trị None. Và tất nhiên giá trị False đánh giá là False.
# Python Lists
**List là một tập hợp được sắp xếp và có thể thay đổi. Trong Python, list được viết bằng dấu ngoặc vuông.**
```python
thislist = ["apple", "banana", "cherry"]
print(thislist)
```

Bạn truy cập các mục trong list bằng cách tham chiếu đến số chỉ mục:
```python
thislist = ["apple", "banana", "cherry"]
print(thislist[1])
```

Ngoài ra, cũng có thể sử dụng hàm tạo `list()` để tạo một danh sách mới.
```python
thislist = list(("apple", "banana", "cherry")) # lưu ý 2 cặp dấu ngoặc tròn
print(thislist)
```

# Python Tuples
**tuple là một tập hợp được sắp xếp theo thứ tự và không thể thay đổi. Trong Python, tuple được viết bằng dấu ngoặc tròn.**
```python
thistuple = ("apple", "banana", "cherry")
print(thistuple)
```
Bạn có thể truy cập phần tử của tuple bằng cách tham chiếu đến số chỉ mục, bên trong dấu ngoặc vuông:
```python
thistuple = ("apple", "banana", "cherry")
print(thistuple[1])
```

**Tạo Tuple với một mục**

Để tạo một bộ dữ liệu tuple chỉ có một phần tử, bạn phải thêm dấu phẩy sau phần tử đó, nếu không Python sẽ không nhận ra nó là một tuple.
```python
thistuple = ("apple",)
print(type(thistuple))

#NOT a tuple
thistuple = ("apple")
print(type(thistuple))
```
Cũng có thể sử dụng hàm tạo tuple() để tạo một bộ tuple.
```python
thistuple = tuple(("apple", "banana", "cherry")) # lưu ý 2 cặp dấu ngoặc tròn
print(thistuple)
```
Khi một tuple được tạo, bạn không thể thay đổi các giá trị của nó. Tuples là không thể thay đổi, hoặc cũng được gọi bất biến.

Nhưng có một cách giải quyết. Bạn có thể chuyển đổi tuple thành một list, thay đổi list và chuyển đổi lại list thành tuple.
# Python Sets
**set là một tập hợp không có thứ tự và không được lập chỉ mục. Trong Python, set được viết bằng dấu ngoặc nhọn.**

```python
thisset = {"apple", "banana", "cherry"}
print(thisset)
```

**Bạn không thể truy cập các mục trong một set bằng cách tham chiếu đến chỉ mục hoặc khóa.**

Nhưng bạn có thể lặp qua các phần tử trong set bằng vòng lặp `for` hoặc kiểm tra xem giá trị được chỉ định có trong set hay không bằng cách sử dụng từ khóa `in`.

Lặp qua tập hợp và in các giá trị:
```python
thisset = {"apple", "banana", "cherry"}

for x in thisset:
  print(x)
```
Kiểm tra xem "chuối" có trong set không:
```python
thisset = {"apple", "banana", "cherry"}

print("banana" in thisset)
```
Sau khi set được tạo, bạn không thể thay đổi các mục của nó, nhưng bạn có thể thêm các mục mới.

Có thể sử dụng hàm tạo set() để tạo một set.
```python
thisset = set(("apple", "banana", "cherry")) # note the double round-brackets
print(thisset)
```
# Python Dictionaries
**dictionary là một tập hợp không có thứ tự, có thể thay đổi và được lập chỉ mục. Trong Python dictionary được viết bằng dấu ngoặc nhọn và chúng có các khóa và giá trị.**
```python
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
print(thisdict)
```
dictionary cũng có thể chứa nhiều dictionary, đây được gọi là nested dictionaries.
```python
myfamily = {
  "child1" : {
    "name" : "Emil",
    "year" : 2004
  },
  "child2" : {
    "name" : "Tobias",
    "year" : 2007
  },
  "child3" : {
    "name" : "Linus",
    "year" : 2011
  }
}
```
Hoặc, nếu bạn muốn lồng ba dictionary đã tồn tại dưới dạng dictionary:
```python
child1 = {
  "name" : "Emil",
  "year" : 2004
}
child2 = {
  "name" : "Tobias",
  "year" : 2007
}
child3 = {
  "name" : "Linus",
  "year" : 2011
}

myfamily = {
  "child1" : child1,
  "child2" : child2,
  "child3" : child3
}
```
Cũng có thể sử dụng hàm tạo dict() để tạo dictionary mới:
```python
thisdict = dict(brand="Ford", model="Mustang", year=1964)
# lưu ý rằng từ khóa không phải là chuỗi ký tự
# lưu ý việc sử dụng dấu bằng thay vì dấu hai chấm cho việc gán giá trị
print(thisdict)
```