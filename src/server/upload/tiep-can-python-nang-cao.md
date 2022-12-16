Python là một ngôn ngữ hướng đối tượng,  nó trở thành một ngôn ngữ tuyệt vời để học cho người mới bắt đầu. Nó có các tính năng nâng cao và gói thư viện được hỗ trợ thậm chí làm cho tác vụ cứng có thể ghi được trong một loạt các dòng code. Trong bài viết này, chúng ta sẽ đi qua một số tính năng nâng cao của python.
 # 1. List comprehension 
 List comprehension cung cấp một sự thay thế ngắn và tốt hơn để phổ biến cho các vòng lặp. Nó được sử dụng trong ngữ cảnh của các lần lặp mà chúng ta cần thực hiện một thao tác trên mọi thành phần của list.
 ```
  [some_operation(element) for element in sequence]
   - returns list of elements.
 ```
 Ví dụ
 ```
 # Python program to segregate positive and negative numbers in an array.

def segregate(arr):
  return [x for x in arr if x%2 == 0] + [x for x in arr if x%2 != 0]

if __name__ == '__main__':
  arr = [1, 8, 5, 3, 2, 6, 7, 10]
  arr = segregate(arr)
  print (arr)
  # prints [8, 2, 6, 10, 1, 5, 3, 7]
 ```
 # 2. Slicing
slicing được sử dụng để trích xuất một chuỗi liên tục / chuỗi con của các phần tử từ một chuỗi đã cho. Theo mặc định step_size là một và do đó tạo ra một chuỗi liên tục. Tuy nhiên, chúng ta có thể cung cấp bất kỳ giá trị nào cho step_size để có được chuỗi phần tử không liên tục.
```
list[start_index : end_index : step_size]     
           - returns list of elements.
           - default start_index is 0.
           - default end_index is -1.
           - default step_size is 1.
```
ví dụ 
```
# Python program to rotate an array by 'd' elements.

def rotate(arr, d):
  return arr[d:] + arr[:d]
  
if __name__ == '__main__':
  arr = [1, 2, 3, 4, 5, 6, 7, 8]
  arr = rotate(arr, 3)
  print (arr)
  # prints [3 ,4, 5, 6, 7, 8, 1, 2]
  ```
 Ở đây một lần nữa, chúng tôi đang kết hợp các kết quả của hai hoạt động cắt lát. Đầu tiên, chúng tôi sẽ cắt list từ chỉ mục to đến cuối, sau đó từ đầu đến chỉ mục.
 ```
 # Python program to reverse an array.

def reverse(arr):
  return arr[::-1]
  
if __name__ == '__main__':
  arr = [1, 2, 3, 4, 5, 6, 7, 8]
  arr = reverse(arr)
  print (arr)
  # prints [8 ,7, 6, 5, 4, 3, 2, 1]

 ```
 Một ví dụ khác cho thấy trường hợp sử dụng cho step_size. Kích thước bước -1 có nghĩa là cắt sẽ từ đầu đến cuối.
 # 3. Lambda
 Lambda là một hàm ẩn danh với khả năng chỉ giữ một biểu thức. Nó về cơ bản là một tốc ký cho các chức năng và có thể được sử dụng ở bất cứ nơi nào cần một biểu thức.
 ```
 lambda arguments : expression
 ```
 ví dụ
```
import math

square_root = lambda x: math.sqrt(x)
# is an equivalant lambda expression for below function
def square_root(x): 
  return math.sqrt(x)
```
# 4. Map
Map được sử dụng trong các tình huống trong đó chúng ta cần áp dụng hàm / lambda qua một chuỗi các phần tử. Mặc dù bạn hầu như luôn có thể thay thế nhu cầu sử dụng bản đồ bằng cách list comprehension .
```
map(function , sequence)
- returns an iterable.
```
ví dụ 
```

# Square the numbers in the list.
import math
  
if __name__ == '__main__':
  arr = [1, 2, 3, 4, 5]
  arr = list(map(lambda x : x**2, arr))
  print (arr)
  # prints [1, 4, 9, 16, 25]
  ```
  Map được sử dụng để bình phương mọi phần tử của chuỗi. Khi map trả về một lần lặp, chúng ta cần bọc kết quả với loại mong muốn (liệt kê trong ví dụ trên).
  # 5. Filter
  Mặt khác, filter áp dụng hàm / lambda trên một chuỗi các phần tử và trả về chuỗi các phần tử mà hàm / lambda trả về True.
 ```
  filter(function, sequence)
    - returns an iterable.
```

ví dụ:
 ```
    # Print all even numbers in an array.

if __name__ == '__main__':
  arr = [1, 2, 3, 4, 5, 6]
  arr = list(filter(lambda x : x%2 == 0, arr))
  print (arr)
  # print [2, 4, 6]
 ```
 Ở đây, chúng ta đã áp dụng bộ lọc để chỉ trả về các số chẵn trong chuỗi.
 
 # 6. Iteration protocol
Một khái niệm quan trọng thấm vào ngôn ngữ lập trình python là iteration protocol và iterables. Nói một cách đơn giản nhất, một iterable là thứ có thể được lặp lại bằng cách sử dụng giao thức lặp(iteration protocol ). Một trong những cách dễ nhất để hiểu giao thức lặp là xem cách nó hoạt động với các loại tích hợp. Hãy để một ví dụ về tập tin. Tệp chúng tôi sẽ sử dụng làm mẫu là script.txt với nội dung sau:
```
import os
print (os.name)
print (os.getcwd())
```
Chúng ta có một vài cách để đọc một tập tin bằng python, một số cách hiệu quả hơn những cách khác. Một cách, không phải trong thể loại sau, sẽ là sử dụng đường dẫn.
```
file_obj = open('script.py')

file_obj.readline()
# 'import os'             # first line.
file_obj.readline()
# 'print (os.name)'       # next line.
file_obj.readline()
# 'print (os.getcwd())'   # next line.
file_obj.readline()
# ''                      # empty string at the end of file.
```
Một cách khác được ưa thích và hiệu quả hơn là sử dụng vòng lặp for:
```
# Reading file using 'for loop' based on iteration protocol.

for line in open('script.py')
  print ('line')
```
Bất kỳ đối tượng nào có phương thức _ _next_ _ để tiến tới kết quả tiếp theo và làm tăng ngoại lệ StopIteration ở cuối chuỗi kết quả, được coi là một trình vòng lặp trong python. Bất kỳ đối tượng như vậy cũng có thể được chuyển qua với vòng lặp for hoặc công cụ lặp khác.
```
file_obj = open('script.py')

file_obj.__next__() 
# 'import os'
file_obj.__next__()
# 'print (os.name)'
file_obj.__next__()
# 'print (os.getcwd())'
file_obj.__next__()
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
# StopIteration

```
Và đó, những gì bên trong vòng lặp hoặc nói chung, bất kỳ công cụ lặp nào cũng sẽ thực hiện phương thức __next__ cho đến khi kết thúc. Bên cạnh vòng lặp còn có các công cụ lặp khác trong python như list comprehension, map, zip etc.

tuy nhiên có thêm một bước để giao thức lặp và đó là để có được trình lặp của đối tượng cơ bản. Bước này không bắt buộc đối với tệp đối tượng vì nó lặp lại trình lặp của chính nó. Nhưng đối với các đối tượng khác như list, chúng ta cần trải qua một bước nữa để truy xuất trình vòng lặp.
```

L = [1,2,3]

I = iter(L)
print (I.__next__())
# '1'
print (I.__next__())
# '2'
print (I.__next__())
# '3'
print (I.__next__())
# Traceback (most recent call last):                                                                                                                                                  
# StopIteration 
```
# 7. Generators
 là một cách đơn giản để tạo các vòng lặp. Chính thức hơn, các trình tạo là các hàm trả về một đối tượng (iterator) mà chúng ta có thể lặp lại (một giá trị tại một thời điểm). Nếu chúng ta viết cùng một chức năng từ đầu trong python, nó sẽ giống như
 ```
 
# Iterator for next power of two.
class NextPowTwo:
    def __init__(self, max_ele = 0):
        self.max_ele = max_ele

    def __iter__(self):
        self.n = 0
        return self

    def __next__(self):
        if self.n <= self.max_ele:
            result = 2 ** self.n
            self.n += 1
            return result
        else:
            raise StopIteration
            
if __name__ == '__main__':
    it = iter(NextPowTwo(20))
    print (next(it))     # prints '1'
    print (next(it))     # prints '2'
    print (next(it))     # prints '4'
    print (next(it))     # prints '8'
 ```
 Tuy nhiên, python đã làm cho nó dễ dàng cho chúng tôi. Dưới đây là một cái gì đó tương tự bằng cách sử dụng Generators. Như bạn có thể thấy, tất cả các chi phí được đề cập ở trên (gọi _ _iter _ _ () và _ _next _ _ ()) sẽ tự động được xử lý bởi các trình tạo.
 
 ```
 # Generator for next power of two.
def NextPowTwo(max_ele):
    n = 0
    while n < max_ele:
        yield 2 * n
        n += 1
    raise StopIteration
            
obj = NextPowTwo(20)
print (obj.next())
print (obj.next())
print (obj.next())
print (obj.next())
 ```
*  có ít nhất một yield statement.
*  trả về một đối tượng (iterator) nhưng không bắt đầu thực thi ngay lập tức.
*  nhớ các biến cục bộ và trạng thái của chúng giữa các lệnh gọi liên tiếp.
*  thực hiện giao thức lặp.

# 8. Generator Expression
Vì lambda là để hoạt động,  Generator Expression là cho trình tạo trong biểu thức trình tạo python i.e tạo ra một hàm tạo ẩn danh. Cú pháp của nó rất giống với việc hiểu list.
```
# generator function example.

def func():
  n = 1
  while n < 25:
    yield n**n
    n += 1
    
if __name__ == '__main__':
  it = func()
  print (next(it))
  print (next(it))
  print (next(it))
```
Sự khác biệt chính giữa list comprehension and generator là trong khi list comprehension tạo ra toàn bộ list, generator expression tạo ra một mục tại một thời điểm. Về bản chất, chúng là loại  lazy counter của việc list comprehension.
nguồn: https://medium.com/quick-code/advanced-python-made-easy-eece317334fa