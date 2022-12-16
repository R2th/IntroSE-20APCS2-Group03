Ở bài viết này chúng ta sẽ cùn tìm hiểu và thực hiện list, dict, set và khởi tạo Comprehensions ( Bao hàm ) trong python.
# 1. Comprehensions in Python
Comprehensions (bao hàm) là các cấu trúc cho phép các chuỗi được xây dựng từ các chuỗi khác. Python 2.0 đã giới thiệu cho chúng ta khái niệm về  list comprehensions và Python 3.0 đã đưa nó đi xa hơn bằng cách bao gồm từ dict comprehensions và set comprehensions.

Các dạng Comprehensions:
![](https://images.viblo.asia/3b6a7ca1-a8af-4d4b-b952-0a188363795d.png)

Tại sao Comprehensions lại có sức mạnh đến vậy? Chúng ta sẽ thử và hiểu điều này với một ví dụ. Chúng ta đều biết Python cung cấp nhiều cách khác nhau để thể hiện một danh sách. Ví dụ:

*  Người ta có thể viết rõ ràng toàn bộ  như sau:
```
squares = [0, 1, 4, 9, 25]
```
* Hoặc, viết 1 vòng lặp để tạo ra list:
```
squares = []
for num in range(6):
    squares.append(num*num)
```
*  Một cách khác là viết 1 dòng code đơn giản như sau
```
squares = [num*num for num in range(6)]
```

Việc dùng 1 dòng duy nhất gọi là một list comprehensions và là một cách thuận tiện để tạo một danh sách. Nó loại bỏ sự phụ thuộc vào các vòng lặp và làm cho code nhỏ gọn. Phần tiếp theo đi sâu hơn vào khái niệm danh sách và các kiểu hiểu khác được cung cấp trong Python 3.
# 2 . List Comprehensions [ ]

List Comprehensions là một cách để xác định và tạo danh sách trong Python một cách súc tích. Trong hầu hết các trường hợp, việc hiểu danh sách cho phép chúng ta tạo danh sách trong một dòng mã mà không phải lo lắng về việc khởi tạo danh sách hoặc thiết lập các vòng lặp.
Bao gồm các phần sau:
![](https://images.viblo.asia/d9592b4f-c0cc-4851-a472-05f4b6ee701e.png)
chúng ta cần tìm các mảng gồm năm số chẵn nguyên dương đầu tiên. Như đã thấy trong phần trước, có hai cách để làm điều này: với một vòng lặp for  hoặc với một list comprehensions. Hãy thử với cả hai.
```
even_squares = []
>>> for num in range(11):
...    if num%2 == 0:
...        even_squares.append(num * num)
>>> even_squares
[0, 4, 16, 36, 64, 100]
```
```
even_squares = [num * num for num in range(11) if num%2 == 0]
even_squares
[0, 4, 16, 36, 64, 100]
```

Nếu chúng ta nhìn kỹ, có thể thấy rằng một list comprehensions có thể được tạo ra bằng cách chỉ sắp xếp lại một vòng lặp For.
![](https://images.viblo.asia/f6bafffa-99ce-49ec-b8e7-0219e450872e.png)
Việc List comprehension là cách Python Python để thực hiện ký hiệu cho các tập hợp được sử dụng trong toán học.
![](https://images.viblo.asia/d5e94a9b-5ec0-4664-a206-9c732708abea.png)

Cùng thực hiện một số ví dụ toán học để hiểu rõ hơn

*  Bài toán Pitago
```
[(a,b,c) for a in range(1,30) for b in range(1,30) for c in range(1,30)if a**2 + b**2 == c**2]
[(3, 4, 5), (4, 3, 5), (5, 12, 13), (6, 8, 10), (7, 24, 25), (8, 6, 10), (8, 15, 17), (9, 12, 15), (10, 24, 26), (12, 5, 13), (12, 9, 15), (12, 16, 20), (15, 8, 17), (15, 20, 25),(16, 12, 20), (20, 15, 25),(20, 21, 29), (21, 20, 29), (24, 7, 25), (24, 10, 26)]
```
* List comprehension với chuỗi
Chuyển đổi chữ thường trong một chuỗi thành chữ hoa.
```
colors = ["pink", "white", "blue", "black", purple"]
[color.upper() for color in colors]
['RED', 'GREEN', 'BLUE', 'PURPLE']
```
*  Hoán đổi tên và họ trong một danh sách nhất định.
```
presidents_usa = ["George Washington", "John Adams","Thomas Jefferson","James Madison","James Monroe","John Adams","Andrew Jackson"]
split_names = [name.split(" ") for name in presidents_usa]
swapped_list = [split_name[1] + " " + split_name[0] for split_name in split_names]
swapped_list
['Washington George', 'Adams John', 'Jefferson Thomas', 'Madison James', 'Monroe James', 'Adams John', 'Jackson Andrew']
```
* List comprehension với tuples
Nếu biểu thức có chứa một tuple (ví dụ: (x, y), thì nó phải được ngoặc đơn.
```
# Convert height from cms to feet using List Comprehension : 1 cm = 0.0328 feet
height_in_cms = [('Tom',183),('Daisy',171),('Margaret',179),('Michael',190),('Nick',165)]
height_in_feet = [(height[0],round(height[1]*0.0328,1)) for height in height_in_cms]
height_in_feet
[('Tom', 6.0), ('Daisy', 5.6), ('Margaret', 5.9), ('Michael', 6.2), ('Nick', 5.4)]
```
# 3. Nested List Comprehensions [[ ]]

Danh sách hiểu cũng có thể được lồng nhau để tạo danh sách phức tạp. Chẳng hạn, chúng ta có thể tạo một ma trận chỉ bằng cách list comprehensions
* Tạo ma trận 3X3
```
matrix = [[j * j+i for j in range(3)] for i in range(3)]
matrix
[[0, 1, 4], [1, 2, 5], [2, 3, 6]]
```
# 4. Set Comprehensions { }

Một Set Comprehensions tương tự như một List Comprehensions nhưng trả về một set thay vì một list. Cú pháp hơi khác theo nghĩa là chúng ta sử dụng dấu ngoặc nhọn thay vì dấu ngoặc vuông để tạo một tập hợp.
Hãy xem xét danh sách sau đây bao gồm tên của mọi người:
```
names = [ 'Arnold', 'BILL', 'alice', 'arnold', 'MARY', 'J', 'BIll' ,'maRy']
```

Danh sách này bao gồm rất nhiều bản sao và có những cái tên chỉ có một chữ cái duy nhất. Những gì chúng tôi muốn là một danh sách bao gồm các tên dài hơn một chữ cái và chỉ có chữ cái đầu tiên viết hoa. Để hoàn thành một nhiệm vụ như vậy, chúng tôi chuyển sang Set Comprehensions.
```
{name.capitalize() for name in names if len(name) > 1}
{'Alice', 'Arnold', 'Bill', 'Mary'}
```
# 5. Dict Comprehensions  {}

Dict Comprehensions được sử dụng khi đầu vào ở dạng dictionary hoặc cặp key: value. Ví dụ, hãy xem xét một dict trong đó các key đại diện cho các ký tự và các giá trị biểu thị số lần các ký tự này xuất hiện trong một kho văn bản.
```
char_dict = {'A' : 4,'z': 2, 'D' : 8, 'a': 5, 'Z' : 10 }
```

dict char_dict bao gồm một hỗn hợp các chữ cái viết hoa và viết thường. Chúng tôi muốn đếm tổng số lần xuất hiện của các chữ cái không phân biệt trường hợp của chúng. Hãy để sử dụng một dict Comprehensions để đạt được điều này:
```
{ k.lower() : char_dict.get(k.lower(), 0) + char_dict.get(k.upper(), 0) for k in char_dict.keys()}
{'a': 9, 'z': 12, 'd': 8}
```
# 6. Biểu thức khởi tạo()


Cú pháp và cách làm việc của các biểu thức khởi tạo chính xác giống như list comprehension ngoại trừ việc chúng sử dụng dấu ngoặc tròn thay vì dấu vuông. Hãy nói rằng chúng tôi muốn tính tổng bình phương của mười số tự nhiên đầu tiên.
```
# Sum of first ten natural numbers using List Comprehensions
sum([num**2 for num in range(11)])
385
```

Kết quả sẽ giống như vậy nếu chúng tôi sử dụng bất kỳ lần lặp nào khác và không nhất thiết phải là một danh sách.
```
sum({num**2 for num in range(11)})
385
```

Bây giờ, nếu chúng ta sử dụng biểu thức trình tạo để tính bình phương của mười số tự nhiên đầu tiên, thì nó sẽ giống như thế này:
```
squares = (num**2 for num in range(11))
squares
squares
<generator object <genexpr> at 0x1159536d8>
```

Không giống như list comprehension, một biểu thức trình tạo không nhận lại một danh sách nhưng một generator object. Để có kết quả, chúng ta có thể sử dụng biểu thức trên với hàm sum.
```
sum(n ** 2 for n in numbers)
385
```
# 7 . Đừng quá lạm dụng list comprehensions

list comprehensions là một cách hiệu quả để giảm độ dài của mã. Nó cũng làm cho mã dễ đọc hơn. Nhưng có những trường hợp khi chúng ta có thể thoải mái làm mà không cần chúng.
Không nên sử dụng comprehension khi logic của chương trình của bạn quá dài. Ý tưởng chính của việc sử dụng comprehension là rút ngắn mã. Tuy nhiên, khi chúng ta bắt đầu đóng gói quá nhiều mã vào một câu lệnh, chúng ta có xu hướng thỏa hiệp với khả năng đọc mã Code. Một vòng lặp for là một ý tưởng tốt hơn trong các tình huống như vậy.

nguồn: https://towardsdatascience.com/comprehending-the-concept-of-comprehensions-in-python-c9dafce5111