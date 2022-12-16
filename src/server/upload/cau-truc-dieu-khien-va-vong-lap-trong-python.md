Như bài trước thì mình đã đi tìm hiểu về variable trong Python. Nếu bạn nào chưa xem thì xem [tại đây](https://viblo.asia/p/variable-trong-python-tiep-4dbZNnaqZYM). Còn phần này mình sẽ đi tiếp về cấu trúc điều khiển và vong lặp trong Python. Let's go.

Python hỗ trợ một số cấu trúc điều khiển thông dụng. Hầu hết các cấu trúc điều khiển đều dựa vào thụt đầu dòng (4 spaces)  để tạo thành một block xử lý, thay vì sử dụng { … } như các ngôn ngữ khác (PHP, Javascript).

**1. Boolean và toán tử logic**

Trong python cũng có nhiều các toán tử logic phổ biến trong các ngôn ngữ khác.

- Toán tử số học

| Toán tử | Mô tả |
| -------- | -------- |
|   +     | Toán tử cộng 2 giá trị     |
|   -     | Toán tử trừ 2 giá trị     |
|   *     | Toán tử nhân 2 giá trị     |
|   /     | Toán tử chia 2 giá trị (chia ra số thập phân)    |
|   %     | Toán tử chia 2 giá trị lấy phần dư     |
|   //     | Toán tử chia 2 giá trị, làm tròn xuống    |
|   **     | Toán tử mũ     |

- Toán tử quan hệ

| Toán tử | Mô tả |
| -------- | -------- |
|   ==     | So sánh giá trị của các đối số xem có bằng nhau hay không     |
|   !=     | So sánh giá trị của các đối số xem có khác nhau hay không.     |
|   <     | Dấu < đại diện cho phép toán nhỏ hơn     |
|   >    | Dấu > đại diện cho phép toán lớn hơn    |
|   >=     | Dấu > đại diện cho phép toán nhỏ hơn hoặc bằng     |
|   <=     | Dấu > đại diện cho phép toán lớn hơn hoặc bằng    |

- Toán tử gán

| Toán tử | Mô tả |
| -------- | -------- |
|   =     | Toán tử gán cho 1 biến khác     |
|   +=     | Toán tử này cộng rồi gán lại cho biến đó    |
|   -=   | Toán tử này trừ rồi gán lại cho biến đó     |
|   *=    | Toán tử này nhân rồi gán lại cho biến đó   |
|   /=     | Toán tử này chia rồi gán lại cho biến đó     |
|   %=     | Toán tử này chia lấy dư rồi gán lại cho biến đó    |
|   **=     | Toán tử này tính mũ rồi gán lại cho biến đó    |
|   //=     | Toán tử này chia làm tròn xuống rồi gán lại cho biến đó    |

- Toán tử logic

| Toán tử | Mô tả |
| -------- | -------- |
|   and     | Giống toán tử &&, đúng nếu 2 vế của end là True, còn lại là False     |
|   or     | Giống toán tử ??, đúng nếu 1 trong 2 vế của or là True, còn lại là False    |
|   not     | Giống toán tử !, dang phủ định     |
|   in    | Nếu 1 đối số thuộc 1 tập nào đó thì trả về là True, ngược lại là False    |
|   not in     | Ngược lại của in     |
|   is     |Toán tử này trả về nếu 2 vế của toán tử: a == b   |
|   not is     |Ngược lại của is   |

- Toán tử trên bit: &, |, ^, ~, <<, >>

**2. Conditional statements if**

- Câu lệnh if được sử dụng để kiểm tra một điều kiện: nếu điều kiện là đúng sẽ chạy một khối các câu lệnh (được gọi là if-block).

```
if condition:
    statements
```

- Khối else sẽ được thực thi nếu điều kiện trong if là sai

```
if 1 > 2:
    print("1 is greater than 2")
else:
    print("1 is not greater than 2")
```

- Khi ta phải kiểm tra thêm một điều kiện nữa nếu trong if là sai ta có thể sử dụng elif

```
numberInput = int(input('Nhap vao 1 so: '))
if numberInput == 1:
    print("numberInput is one")
elif numberInput == 2:
    print("numberInput is two")
else:
    print("numberInput is not one or two")
```


- Chúng ta có thể đặt các khối lệnh if lồng nhau:

```
if numberInput == 1:
    print("numberInput is one")
else:
    if numberInput == 2:
        print("numberInput is two")
    else:
        print("numberInput is not one or two")
```

**3. Switch**

- Có một điều đặc biệt hơn các ngôn ngữ khác là Python không có Switch case. Thay vào đó chúng ta có thể sử dụng if...elif....else để thay thế cấu trúc switch case (hơi bất tiện nhỉ, thế nếu mà có 8 - 10 case thì cứ if else thế này chắc khó đọc quá?)

- Ngoài cách dùng if else trên có thể sử dụng cách sau:

```
switcher = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6
}
switcher.get(key, "nothing")
```

- Đoạn code trên key tương tự đầu vào của hàm switch nếu key thỏa mãn 1 giá trị nào đó thì sẽ trả về giá trị đúng. nếu key ko tồn tại thì sẽ trả về mặc định nothing.

```
switcher.get('A', "nothing") => 1
switcher.get('G', "nothing") => nothing
```

Ví dụ khác:

```
 def one():
    return 'January'
def two():
    return 'February'
def three():
    return 'March'
def four():
    return 'April'

switcher = {
    1: one,
    2: two,
    3: three,
    4: four,
}
func = switcher.get(key, lambda: ‘nothing’)
print func()
```

**4. Cấu trúc vòng lặp**

Trong python hỗ trợ cấu trúc vòng lặp: for và while.

Vòng lặp for: Vòng lặp for ở trong Python có tác dụng lặp các biến dữ liệu có kiểu dữ liệu list, tuple hoặc string,... Sử dụng cú pháp như sau:

```
for variable in data:
	# code
```

Câu lệnh for trong Python khác một chút so với các ngôn ngữ khác quen dùng như C, PHP, ... Thay vì lặp theo các bước, cung cấp cho dev xác định các bước lặp và điều kiện tạm dừng như C, PHP, ... . Câu lệnh for của Python lặp qua các phần tử của 1 danh sách truyền vào ~ tương tự với foreach - lặp tất cả các phần tử.

```
words = ['cat', 'dog', 'bird'];
for w in words:
    print(w)

# cat
# dog
# bird
```
```
for c in 'Hello':
   print(c)
#H
#e
#l
#l
#o
```

Hàm range(): giúp chúng ta có thể tạo ra một list một cách nhanh chóng. Với cú pháp:

```
range(elementNumbers)
```

Với cú pháp này tạo ra 1 list bắt đầu từ 0 liên tục và kết thúc khi có đủ elementNumbers:

```
range(5)
```
```
range(start, stop [, step])
```

Hàm range() có 3 tham số:
 
- start: số nguyên bắt đầu, chuỗi sẽ bắt đầu với tham số này. Giá trị mặc định là 0.

- stop: số nguyên kết thúc, chuỗi sẽ kết thúc với tham số này.

- step: số nguyên xác định khoảng cách giữa các số bên trong chuỗi. Giá trị mặc định là 1.

Kết hợp range với for cho phép tạo vòng lặp dễ dàng hơn:

```
for number in range(5):
    print(number)
 
#0
#1
#2
#3
#4
```

- vòng lặp while trong python tương tự trong các ngôn ngữ khác, lặp khi thỏa mãn điều kiện cho trước. Cú pháp:

```
while <condition>:
	# code
```

- break và continue: Giống với PHP, break cho phép thoát khỏi vòng lặp, còn continue cho phép bỏ qua lượt chạy hiện tại của vòng lặp và chạy tiếp.

```
i = 0
while (i <= 10):
	print(i)
	if i == 5:
		break
	i += 1

for i in ‘i am a robot’:
	if i == ‘ ’:
		continue
	print(i, end=’’)
```

- else trong vòng lặp: khác với các ngôn ngữ khác, trong Python có else trong for. Khi được sử dụng với vòng lặp, mệnh đề else xảy ra khi trong vòng lặp không có câu lệnh break nào được chạy - khi chạy hết các vòng lặp, và ngược lại nếu có lệnh break trong vòng lặp thì sẽ không chạy vào else.

```
for x in range(5):
    print(x)
else:
    print('else')

#1
#2
#3
#4
#else
```
```
for x in range(5):
    print(x)
    if x % 2 == 0:
        break
else:
    print('else')

#0
```

**5. Exception trong python**

Ngoại lệ (Exception) là lỗi xảy ra trong quá trình thực thi một chương trình, khi thực hiện 1 đoạn code nào đó mà có thể xảy ra lỗi trong quá trình chạy mà ta chưa thể xác định được trước, nó có thể làm cho chương trình bị chết, chết trang, ... hoặc khi lưu vào db có thể 1 lỗi nào đó xảy ra khiến dữ liệu lưu vào bị gián đoạn tạo ra các dữ liệu lỗi. Trong TH này chúng ta sử dụng try-catch để bắt các lỗi hiển thị. Cú pháp:

```
try:
// code
except:
// ngoai le
finally:
// run every time
```

Đoạn code trong khối lệnh try sẽ được chạy, nếu có lỗi xảy ra thì chạy vào except, và code trong khối finally sẽ luôn chạy bất kể có lỗi hay không.

Các exception có sẵn trong Python bạn có thể tham khảo [tại đây](https://docs.python.org/3/library/exceptions.html#exception-hierarchy).

-----

Vậy là mình đã đi qua về vòng lặp trong Python. Cảm ơn các bạn đã quan tâm 😃