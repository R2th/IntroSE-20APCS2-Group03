# Lời nói đầu.
Xin chào mọi người  đã quay trở lại seria bài viết về python của mình :D . Ai cần đọc về bài viết về python phần 1 của mình thì click vào link bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)

Ở bài viết đầu tiên mình đã giới thiêu sơ lược cho các bạn về cái nhìn tổng quát chung của Python: Những điều cần biết đầu tiên, Cú pháp , Biến và các loại kiểu dử liệu. Ngày hôm nay chúng ta sẽ bắt đầu vào các phần nâng cao hơn nhé . . . Let GO :D 

# Nội dung.
## 1:Python Operators
Trong Python, chúng ta chia các toán tử thành các loại như sau :
- Arithmetic operators (Toán tử số học)
- Assignment operators (Toán tử gán)
- Comparison operators (Toán tử so sánh)
- Logical operators (Toán tử logic)
- Identity operators (Toán tử định danh)
- Membership operators (Toán tử thành viên)
- Bitwise operators (Chịu không dịch được)

### 1.1: Arithmetic operators


| Toán tử | Name | Example |
| -------- | -------- | -------- |
| `+`     | Cộng     | x + y     |
| `-`     | Trừ     | x - y     |
| `*`     | Nhân     | x * y     |
| `/`     | Chia      | x / y     |
| `%`     | Đồng dư      | x % y     |
| `**`     | Lũy thừa     | x ** y     |
| `//`     | 	Floor division       | 	x // y     |

### 1.2: Comparison operators


| Toán tử | Example | Same As |
| -------- | -------- | -------- |
|=	|[x = 5](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass1)|	x = 5	|
|+=	|[x += 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass2)	|x = x + 3	|
|-=	|[x -= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass3)	|x = x - 3	|
|*=	|[x *= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass4)	|x = x * 3	|
|/=	|[x /= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass5)	|x = x / 3	|
|%=	|[x %= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass6)	|x = x % 3	|
|//=|[x //= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass7)	|x = x // 3	|
|**=|[x**= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass8)	|x = x**3	|
|&=	| [x&=3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass9)	|x = x & 3	
| `|=`	|[`x|= 3`](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass10)	|`x = x | 3`|	
|^=	|[x ^= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass11)	|x = x ^ 3|	
|>>=	|[x >>= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass12)   |x = x >> 3|	
|<<=	|[x <<= 3](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_ass13)	|x = x << 3|

### 1.3: Arithmetic operators

| Toán tử | Name | Example |
| -------- | -------- | -------- |
| `==`     | Bằng     | 	x == y    |
| `!=`     | Khác     | 	x != y    |
| `>`     | Nhỏ hơn     | 	x > y    |
| `<`     | Lớn hơn      | 	x < y    |
| `>=`     | Lớn hơn hoặc bằng      | 	x >= y     |
| `<=`     | Nhỏ hơn hoặc bằng    | 	x <= y    |

### 1.4: Identity operators

| Toán tử | Giải thích | Example |
| -------- | -------- | -------- |
| `is`     | Trả về `true` nếu cả hai biến là cùng một đối tượng     | 	`x is y`   |
| `is not`     | Trả về giá trị `true` khi cả 1 trong 2 điều kiện đều đúng     | 	x < 5 and  x < 10   |

### 1.5: Logical operators

| Toán tử | Giải thích | Example |
| -------- | -------- | -------- |
| `and`     | Trả về giá trị `true` khi cả 2 điều kiện đều đúng     | 	x < 5 and  x < 10    |
| `or`     | Trả về giá trị `true` khi cả 1 trong 2 điều kiện đều đúng     | 	x < 5 and  x < 10   |
| `not`     | Trả về giá trị `true` khi kết quả biểu thức bên trong là false và ngườc lại    | 		not(x < 5 and x < 10)   |

### 1.6: Membership operators
| Toán tử | Tên | Giải thích |
| -------- | -------- | -------- |
| `in `     | Trả về giá trị `true` khi giá trị (x) nằm trong  giá trị (y)     | 	[x in y](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_membership1)   |
| `not in`     | Trả về giá trị `true` khi giá trị (x) không nằm trong  giá trị (y)   | 	[x not in y](https://www.w3schools.com/python/showpython.asp?filename=demo_oper_identity2)  |

## 2: Cấu trúc: If ... Else
### 2.1 : Conditions Và If statements.
Cũng như các ngôn ngữ khác , Python hỗ trợ các conditions logic thông thường như sau :

- Bằng : `a == b`
- Khác: `a != b`
- Nhỏ hơn: `a < b`
- Nhỏ hơn hoặc bằng: `a <= b`
- Lớn hơn: `a > b`
- Lớn hơn hoặc bằng: `a >= b`

Các conditions này có thể được sử dụng theo nhiều cách, phổ biến nhất trong `if statements` và vòng lặp. 

Một "if statement" được viết bằng cách sử dụng từ khóa if (Ez vãi) =))

```
a = 1
b = 2
if b > a:
  print("b is greater than a")
```

Nhìn ví dụ đơn giản trên chắc ai cũng hiểu rồi nhỉ , khỏi cần thuyết trình thêm nữa :D

### 2.2 : Indentation.
Khác với một số ngôn ngữ khác, Python dựa vào whitespace để xác định phạm vi đoạn mã. Bạn có thể xem cụ thể hơn tại [đây](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7#_3-cu-phap-4).

## 3: Cấu trúc: Loops
### 3.1 : while Loop
Với `while Loop` chúng ta có thể tạo ra một tập hợp các lệnh bên trong, sao cho điều kiện đầu vào của `while` vẫn đúng . 

```
i = 1
while i < 6:
  print(i)
  i += 1
```

Nếu cần dừng lại vòng `while` khi điều kiện đầu vào chưa kết thúc thì có thể làm như sau :

```
i = 1
while i < 6:
  print(i)
  if i == 3:
    break
  i += 1
```

Hoặc nếu muốn bỏ qua một vòng lặp trong `while` thì có thể làm như sau : 
```
i = 0
while i < 6:
  i += 1 
  if i == 3:
    continue
  print(i)
```

Note : 
 - Đương nhiên rằng hãy nhớ thay đổi điều kiện đầu vào nếu ko để vòng loop thành mãi mãi
 - Hãy nhớ sử dụng đúng indent nhé 


### 3.2 : For Loop
- Cũng giống như các ngôn ngữ khác, vòng FOR cũng hoạt động để duyệt từng giá trị của mảng, Cụ thể như sau :
```
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
```

Tuy nhiên hơi khác vơi các ngôn ngữ khác 1 chút, là Python không cần biến chỉ mục đặt trước vòng for (có vẻ khá giống foreach trong php nhỉ :D )

Một điều nữa , trong Python ta cũng có thể for cả biến string:
```
for x in "banana":
  print(x)
```

Điều này được lí giải bởi tại [đây.](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7#_52--strings-8)


- Cũng tương tự như với `While`, trong `For` chúng ta cũng có `break` và `continue`: 

```
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
    continue
  if x == "banana":
    break
  print(x)
```


- Ngoài ra, để có một vòng `FOR`cố định số lượng mà không cần khai báo mảng, chúng ta có hàm `range()`. Hàm này sẽ trả về một chuỗi các số, bắt đầu từ 0 và tăng thêm 1 (mặc định) và kết thúc tại một số được chỉ định:

```
for x in range(6):
  print(x)
```

Lưu ý rằng `range(6)` không trả ra là các giá trị từ 0 đến 6, nhưng ma trả về giá trị từ 0 đến 5 .

Để thuận tiện hơn, bạn hoàn toàn có thể set giá trị bắt đầu (mặc định là từ 0) hoặc các block số nếu muốn (mặc định là 1).
```
#Print ra các số bắt đầu từ 2 tới 30 và mỗi lần tăng 3 đơn vị
for x in range(2, 30, 3):
  print(x)
```

- Một điểm khác biệt nữa là trong Python có hỗ trợ cho `Else in For Loop` có nghĩa là đoạn mã sau `else` sẽ được thực thi khi vòng lặp kết thúc. Cụ thể như sau :
```
for x in range(6):
  print(x)
else:
  print("Finally finished!")
```

- Tương tự như các ngôn ngữ khác, chúng ta hoàn toàn có thể `For In For` tức là lồng ghép các `For` lại với nhau. Điều quan trọng là các bạn phải nhớ `indent` cho đúng là ok .

```
adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]

for x in adj:
  for y in fruits:
    print(x, y)
```


- Đệ quy (recursion): Tương tự với các ngôn ngữ khác, Python cũng support các hàm đệ quy (hàm tự gọi chính bản thân mình). Tuy nhiên , ae hay hết sức cẩn thận với hàm đệ quy nhé. Nếu không anh em sẽ rất dễ tạo ra vòng `loop` vô hạn và khó kiểm soát. 
```
def tri_recursion(k):
  if(k>0):
    result = k+tri_recursion(k-1)
    print(result)
  else:
    result = 0
  return result

print("\n\nRecursion Example Results")
tri_recursion(6)
```

Ok, chúng ta đã tìm hiểu khá nhiều rồi. Mình xin kết thúc bài viết ở đây, hẹn gặp lại các bạn trong bài viết sau.

# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)