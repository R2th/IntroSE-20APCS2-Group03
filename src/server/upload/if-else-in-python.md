### Khái niệm
Với câu lệnh if có 3 keyword ở trong python là: 
* if
* elif
* else

Với Syntax như sau: 
```php

if some_condition:
    # execute some code
elif some_other_condition:
	# do something different
else:
	# do something else

```

###     Ví dụ cụ thể
**Ví dụ 1:** 
<br> Là một ví dụ cơ bản áp dụng theo đúng syntax được mô tả ở trên: 
```
name = "Banana"
if name == "Apple":
    print("Hello Apple")
elif name == "Banana":
    print("Hello Banana")
else:
    print("What is your name")
```

Note: Chỗ này có 1 lưu ý. Dòng print cần lùi vào 4 space. Vì sao lại lùi vào 4 space mỗi dòng? Đó là vì theo convention PEP-8 của Python. Tìm hiểu thêm về convention python tại đây: https://www.python.org/dev/peps/pep-0008/#function-and-method-arguments (Mục Code Lay-out có đề cập đến "**Use 4 spaces per indentation level**") hoặc https://codelearn.io/sharing/pep8-chuan-ket-noi-python-phan-1 hoăc tự search convention python nhé. 

**Ví dụ 2:**
```
a = 1
b = 2
if a < b:
    print("a is less than b")
    print("a is definitely less than b")
print("Not sure if a is less than b")
```

Note: Nếu để 2 dòng print thẳng hàng như trên thì run câu lệnh hoàn toàn đúng ko bị báo lỗi. 
Nhưng nếu dòng print đầu tiên lùi vào 4 space, dòng print thứ 2 lùi vào 5 space. Khi đó run sẽ bị báo lỗi như sau. Vì vậy qua ví dụ này ta rút ra được một bài học là cần vô cùng cẩn thận với việc lùi vào lề bao nhiêu space nhé.
![](https://images.viblo.asia/1ddb1562-b1e3-4e5c-975e-09e6567b64f3.png)

```
a = 1
b = 2
if a < b:
    print("a is less than b")
      print("a is definitely less than b")
print("Not sure if a is less than b")
```
**Ví dụ 3:** Là ví dụ về việc sử dụng 2 hoặc nhiều elif trong câu lệnh rẽ nhánh if
```
a = 20
b = 8
if a < b:
    print("a is less than b")
elif a == b:
    print("a is equal to b")
elif a > b + 10:
    print("a is greater than b more than 10")
else: 
    print("a is greater than b")
```

**Ví dụ 4:** Là ví dụ về việc biểu diễn if else lồng nhau. 
```
a = 8
b = 6
if a < b:
    print("a is less than b")
else: 
    if a == b:
        print("a is equal to b")
    else:
        print("a is greater than b")
		
```
**Ví dụ 5:** Là bài toán về chỉ số BMI
```
name = "Sunny"
height = 1.58
weight = 55

bmi = weight / (height ** 2) # height ** 2 cũng bằng với height * height
print("bmi is: ")
print(bmi)
if bmi < 25:
    print(name)
    print("is not overweight")
else:
    print(name)
    print("is overweight")
```
> Chúng mình vừa cùng nhau đi qua 05 ví dụ về câu lệnh rẽ nhánh if trong Python. Cùng nhau vượt qua các chủ đề của Python cơ bản nhé!