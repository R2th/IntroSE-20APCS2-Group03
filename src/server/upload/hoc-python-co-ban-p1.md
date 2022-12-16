### Python là gì? 
Python là một ngôn lập trình bậc cao do Guido van Rossum tạo ra vào 1990 và nó có cấu trúc rõ ràng sáng sủa, và dễ học với bất cứ ai muốn học về lập trình.
 
 Python được dùng trong rất nhiều lĩnh vực: khoa học dữ liệu, web, machine learning... Vd như các trang web nổi tiếng: Quora, Printerest và Spotify đều dùng python cho phần backend web development.
 
##  Kiến thức cơ bản:
###  1.Variables
 Một cách đơn giản bạn có thể hiểu Variables như là một thứ dùng để lưu trữ giá trị (value).
 
 Trong python rất dễ định nghĩa variable và thiết lập giá trị cho nó. Hãy tưởng tượng bạn muốn lưu số 1 vào variable tên là "one". Cú pháp như sau:
```
    one = 1
```
Trông rất đơn giản phải không? Bạn chỉ cần gán giá trị 1 vào variable "one."

```
    two = 2
    some_number = 10000
```

Ở đây bạn vừa tạo thêm một vài variable khác và gán giá trị cho chung, bạn có thể thấy variable "two" lưu trữ giá trị integer 2, và "some_number" lưu giá trị 10,000.

Bên cạnh kiểu số nguyên (integer), chúng ta cũng có thể dùng kiểu booleans (True/False), strings, float, và nhiều loại dữ liệu khác.

```
# booleans
true_boolean = True
false_boolean = False

# string
my_name = "Leandro Tk"

# float
book_price = 15.80
```

### 2. Control Flow: conditional statements
"If" đùng để đánh giá các biểu thức mà kết quả trả về là True hoặc False. Nếu nó là True thì nó sẽ thực thi các dòng code bên trong "if". Vd:
```
if True:
  print("Hello Python If")

if 2 > 1:
  print("2 is greater than 1")
```

2 lơn hơn 1 là True, vì thế "print" sẽ được thực thi.
Ngoài ra ta có thể dùng thêm lệnh "else" để thực thi những dòng code mà "if" trả về False.

```
if 1 > 2:
  print("1 is greater than 2")
else:
  print("1 is not greater than 2")
```
Trong đoạn code trên: 1 không lớn hơn 2 nên kết quả của biểu thức là False vì thế nó sẽ thực thi đoạn code nằm trong "else".

Nếu bạn có nhiều hơn 2 trường hơp có thể xảy ra bạn có thể dùng thêm lệnh "elif"  (else if) để đánh giá qua từng trường hợp, vd:

```
if 1 > 2:
  print("1 is greater than 2")
elif 2 > 1:
  print("1 is not greater than 2")
else:
  print("1 is equal to 2")
```

### 3. Looping/Iterator

Trong python , chúng ta có một vài hình thức vòng lặp khac nhau. Chúng ta sẽ nói về 2 loại vòng lặp là: while và for.

Vòng lặp While: khi nào mà điều kiện còn trả về True, thì đoạn code trong while sẽ còn thực thi. Vd như đoạn code dưới sẽ print ra từ 1 tới 10.
```
num = 1

while num <= 10:
    print(num)
    num += 1
```

Vong lặp "while" cần 1 một điều kiện lặp (loop condition), khi nào điều kiện này còn là True, thì nó sẽ tiếp tục lặp. 

Trong vd, khi num là 11 thì loop condition là False nên nó sẽ không lặp nữa.
Một vd tốt hơn để hiểu được cách hoạt động của nó:
```
loop_condition = True

while loop_condition:
    print("Loop Condition keeps: %s" %(loop_condition))
    loop_condition = False
```

loop_condition ban đầu là True nên nó sẽ thực thi dòng code trong while, tại cuối block thì loop_condition gán thành False nên nó sẽ không lặp lại nữa.

Vòng lặp For:  Vòng lặp for được sử dụng để lặp một biến qua một dãy (List hoặc String) theo thứ tự mà chúng xuất hiện. Sau đây là đoạn code sẽ print từ 1 tới 10.
```
for i in range(1, 11):
  print(i)
```

Trông có vẻ đơn giản, đoạn code trên sẽ đi từ 1 cho tới 10 (tổng quát nếu range(a,b) thì nó sẽ lần lượt đi từ a cho tới b -1).

## List: Collection | Array | Data Structure
Hãy tưởng tượng bạn muốn lưu trữ integer 1 vào trong 1 variable. Nhưng sau đó bạn lại muốn lưu trữ tiếp 2. Và 3,4,5...

Và nếu các loại dữ liệu trở nên rất lơn thì bạn không thể tạo ra từng biến để lưu trữ riêng lẽ nữa mà cần phải có cách khác để lưu trữ chúng.
### List
List là một collection có thể dùng dể lưu trữ các danh sách giá trị. vd:

```
my_integers = [1, 2, 3, 4, 5]
```

Chúng ta tạo ra một array và lưu trữ chúng trên my_integer.

Nhưng có thể bạn tự hỏi rằng làm sao tôi có thể lấy các giá trị mà tôi đã lưu trong list.

Đây là một câu hỏi tốt. List có một khái niệm gọi là index. Theo quy ước thì phần tử đầu tiên của list sẽ có index = 0, phần tử thứ 2 có index = 1...

Để rõ ràng hơn bạn có thể nhìn vào hình bên dưới:

```
my_integers = [5, 7, 1, 3, 4]
print(my_integers[0]) # 5
print(my_integers[1]) # 7
print(my_integers[4]) # 4
```

Một vd khác nếu bạn lưu một list string.

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

Chúng ta dùng lệnh append đê thêm 1 phần tử mới vào list:

```
bookshelf = []
bookshelf.append("The Effective Engineer")
bookshelf.append("The 4 Hour Work Week")
print(bookshelf[0]) # The Effective Engineer
print(bookshelf[1]) # The 4 Hour Work Week
```

Bây giờ, chúng ta sẽ qua các loại Dictionary

### Dictionary: Key-Value Data Structure

Chúng ta đã biết List có index là một số nguyên, nhưng trong một số trường hợp chúng ta không muốn dùng một số integer để lấy giá trị, mà thay vào đó chúng ta có thể dùng kiểu chữ (string) để lấy giá trị.

```
dictionary_example = {
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```
Key chính là một loại "index" của kiểu dictionary mà bạn có thể dùng để lấy các loại giá trị. Vd:
```
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

print("My name is %s" %(dictionary_tk["name"])) # My name is Leandro
print("But you can call me %s" %(dictionary_tk["nickname"])) # But you can call me Tk
print("And by the way I'm %s" %(dictionary_tk["nationality"])) # And by the way I'm Brazilian
```

Tôi tạo ra một Dictionary về tôi, gồm name, nickname và nationality, đây là các key của dictionary vừa được tạo.

Như chúng ta đã biết cách dùng index của để lấy giá trị từ List, chúng ta cũng dùng một cách tương tự đới với dictionary bằng cách sử dụng key.

Trong vd, tối đã in các câu về bản thân và sử dụng tất cả các dữ liệu được lưu trữ trong dictionary, khá đơn giản phải không?

Nếu tôi muốn thêm 1 thuộc tính mới cho kiểu dictionary, chẳng hạn như tôi sẽ thêm từ khóa "age" với kiểu giá trị là integer vào:
```
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian",
  "age": 24
}

print("My name is %s" %(dictionary_tk["name"])) # My name is Leandro
print("But you can call me %s" %(dictionary_tk["nickname"])) # But you can call me Tk
print("And by the way I'm %i and %s" %(dictionary_tk["age"], dictionary_tk["nationality"])) # And by the way I'm Brazilian
```

Ngoài ra, chúng ta có thể bổ sung thuộc tính "age" thông qua key:
```
dictionary_tk = {
  "name": "Leandro",
  "nickname": "Tk",
  "nationality": "Brazilian"
}

dictionary_tk['age'] = 24

print(dictionary_tk) # {'nationality': 'Brazilian', 'age': 24, 'nickname': 'Tk', 'name': 'Leandro'}
```
Ở phần tiếp theo mình sẽ nói về Classes & Objects trong python.