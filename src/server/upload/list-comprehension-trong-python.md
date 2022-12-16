**List comprehension** cho phép chúng ta tạo một danh sách chứa dữ liệu chỉ với một dòng. Thay vì tạo một danh sách trống, lặp lại một số dữ diệu và thêm nó vào danh sách trên tất cả các dòng riêng biệt, chúng ta có thể sử dụng comprehension để thực hiện các bước này cùng một lúc. Nó không làm tăng performance, nhưng nó cleaner và giúp giảm các dòng code bên trong chương trình. Cùng với comprehension chúng ta có thể giảm hai hoặc nhiều dòng hơn thành một dòng duy nhất.

## List Comprehension Syntax

Cú pháp khi sử dụng list comprehension phụ thuộc vào những gì bạn đang cố gắng viết. Cấu trúc cú phát chung để hiểu list comprehension như sau: 

```python
*result* = [ *transform* *iteration* *filter* ]
```

Ví dụ, khi bạn muốn tạo một danh sách, cú pháp sẽ có cấu trúc như sau:

```python
name_of_list = [ item_to_append for item in list ]
```

Tuy nhiên, khi bạn muốn với một câu lệnh if, comprehension sẽ trông giống như thế này:

```python
name_of_list = [ item_to_append for item in list if condition ]
```

Item sẽ chỉ được thêm vào list nếu điều điện if được đáp ứng. Cuối cùng, nếu bạn muốn thêm 1 câu điều kiện else, nó sẽ trông giống như sau:

```python
name_of_list = [ item_to_append if condition else item_to_append for
item in list ]
```

Khi dùng câu điền kiện else bên trong list comprehension, item đầu tiên sẽ chỉ được thêm vào list khi câu lệnh if được chứng minh True. Nếu nó là False, thì item đi sau câu lệnh else sẽ được thêm vào list.

## Generating a List of Numbers

Hãy cùng thử tạo một danh sách các số từ 0 cho đến 100 bằng cách sử dụng list comprehension:

```python
# create a list of ten numbers using list comprehension
nums = [ x for x in range(100) ] # generates a list from 0 up to 100
print(nums)
```

Bạn có thể nhận thấy rằng in ra một danh sách bao gồm 100 number. List comprehension cho phép xây dựng danh sách này bằng một dòng duy nhất thay vì viết ra câu lệnh for và thêm vào các dòng riêng biệt. Hãy xem thử cách viết thông thường:

```python
nums = [ ]
for x in range(100):
    nums.append(x)
```

Như bạn có thể thấy, tôi đã giảm ba dòng xuống còn một dòng bằng cách comprehension. Điều này không cải thiện performance nhưng làm giảm số lượng dòng trong code xuống. Nó trở nên rõ ràng hơn trong các chương trình lớn hơn, và tôi khuyên bạn nên cố gắng sử dụng comprehension khi có thể.

## If Statements

Trước đó, tôi đã xem xét cách thay đổi cú pháp khi sử dụng một câu lệnh if trong comprehension. Hãy để thử một ví dụ bằng cách tạo một danh sách chỉ các số chẵn:

```python
# using if statements within list comprehesion
nums = [ x for x in range(10) if x % 2 == 0 ] # generates a list of even numbers up to 10

print(nums)
```

Đối với comprehension, biến x chỉ được thêm vào danh sách khi điều kiện **True**. Trong trường hợp của tôi, điều kiện là True khi giá trị hiện tại của x chia hết cho 2. Sau đây, bạn sẽ tìm thấy cùng một đoạn code cần thiết mà không cần sử dụng comprehension:

```python
nums = [ ]
for x in range(10):
    if x % 2 == 0:
        nums.append(x)
```

Lần này, tôi có thể giảm bốn dòng code xuống còn một dòng. Điều này thường có thể cải thiện khả năng đọc code của bạn.

## If-Else Statements

Bây giờ, hãy tiến thêm một bước và thêm vào một điều kiện else. Lần này, tôi sẽ nối thêm chuỗi **“Even”** khi số chia hết cho hai; nếu không, chúng tôi sẽ nối chuỗi **“Old”**:

```python
# using if/else statements within list comprehension
nums = [ "Even" if x % 2 == 0 else "Odd" for x in range(10) ] # generatesa list of even/odd strings
```

Điều này sẽ in ra một danh sách các chuỗi đại diện cho các số lẻ hoặc giá trị chẵn. Ở đây tôi thêm chuỗi **“Even”** ngay cả khi điều kiện là đúng; nếu không, câu lệnh khác sẽ được nhấn và thêm chuỗi **“Old”**. Việc trình bày cùng một code mà không dùng có thể được thấy sau đây:

```python
nums = [ ]
for x in range(10):
    if x % 2 == 0:
        nums.append("Even")
    else:
        nums.append("Odd")
```

Tôi đã giảm các dòng code từ sáu xuống còn một. Hiểu được rất tốt cho việc tạo dữ liệu nhanh chóng; tuy nhiên, nó trở nên khó khăn hơn khi các điều kiện lớn hơn. Comprehensions không cho phép sử dụng các câu lệnh elif, chỉ duy nhất if/else.

## List Comprehension với Variables

Comprehension rất tốt để tạo dữ liệu từ các danh sách. Hãy tạo một danh sách các số và tạo một danh sách riêng cho các số đó bình phương, dùng comprehension:

```python
# creating a list of squared numbers from another list of numbers using
list comprehension
nums = [2, 4, 6, 8]
squared_nums = [ num**2 for num in nums ] # creates a new list of squared numbers based on nums

print(nums)
```

Tôi sẽ nhận được một danh sách **[4, 16, 36, 64]**. Trong ví dụ này, tôi đã có thể tạo ra các số bình phương bằng cách thêm biểu thức  *“num∗∗2”*. Biểu diễn đoạn code không dùng comprehension sẽ như sau: 

```python
squared_nums = [ ]
for num in nums:
    squared_nums.append(num**2)
```

## Dictionary Comprehension

 Không chỉ có thể sử dụng comprehension trong list mà cả dictionary cũng rất tuyệt vời. Cấu trúc cú pháp giống hệt nhau, ngoại trừ bạn cần một cặp key-value thay vì một số duy nhất để thêm vào dictionary. Hãy tạo một dictionary các số chẵn là key còn các số bình phương làm value:
 
```python
# creating a dictionary of even numbers and square values using comprehension
numbers = [ x for x in range(10) ]
squares = { num : num**2 for num in numbers if num % 2 == 0 }
print(squares)
```

Tôi sẽ nhận được 1 dictionary sau đây: **{0: 0, 2: 4, 4: 16, 6: 36, 8: 64}**.

## Tài liệu tham khảo
https://docs.google.com/viewer?url=http://file.allitebooks.com/20191124/Python%20Projects%20for%20Beginners.pdf