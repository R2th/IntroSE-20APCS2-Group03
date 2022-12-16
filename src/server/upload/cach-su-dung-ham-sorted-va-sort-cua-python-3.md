# *Xin chào mọi người. Ngôn ngữ lập trình Python 3 có sẵn 2 hàm sorted() và sort(), vậy hôm nay chúng ta hãy cùng hiểu xem các hàm này hoạt động thế nào.*
# Hàm sorted()
Đây là một hàm có sẵn trong Python. Đúng như tên gọi của nó thì hàm này có thể sắp xếp các phần tử ở trong một list, set hay tuple. 
## Sắp xếp với số
Hàm sorted được dùng thường xuyên với việc sắp xếp các số.
### Ví dụ :

Với list:
```
>>> number_list = [7, 5, 8, 2, 4, 1, 3]
>>> sorted(number_list)
[1, 2, 3, 4, 5, 7, 8]
```
Với tuple:
```
>>> number_tuple = (7, 5, 8, 2, 4, 1, 3)
>>> sorted(number_tuple)
[1, 2, 3, 4, 5, 7, 8]
```
Và với set:
```
>>> number_set = {7, 5, 8, 2, 4, 1, 3}
>>> sorted(number_set)
[1, 2, 3, 4, 5, 7, 8]
```

Có thể dễ dàng thấy là bất kể đầu vào là gì, thì đầu ra của hàm sorted() cũng sẽ là một list. Nếu bạn muốn chuyển lại kiểu cấu trúc ban đầu, bạn có thể gọi hàm biến đổi.

### Ví dụ :

```
>>> number_set = {1, 1, 9, 5, 6, 7, 10, 11, 4, 3, 7}
>>> sorted_number_set = sorted(number_set)
>>> sorted_number_set
[1, 3, 4, 5, 6, 7, 9, 10, 11]
>>> set(sorted_number_set)
{1, 3, 4, 5, 6, 7, 9, 10, 11}
```
## Sắp xếp với chuỗi ký tự
Hàm sorted() cũng có thể được sử dụng để sắp xếp các chuỗi ký tự. Lưu ý là hàm sorted() là case-sensitive, tức là các ký tự in hoa sẽ có giá trị và thứ tự khác với các ký tự không in hoa.
### Ví dụ :
```
>>> char_list = ['I', 'i', 'one', 'two', 'three', 'a', 'b', 'c']
>>> sorted(char_list)
['I', 'a', 'b', 'c', 'i', 'one', 'three', 'two']
```
Bạn có thể sắp xếp số (dưới dạng ký tự )
```
>>> string_number_list = ['1', '5', '9', '4', '2', '0']
>>> sorted(string_number_list)
['0', '1', '2', '4', '5', '9']
```
Bạn cũng có thể sắp xếp các ký tự trong một câu, sorted() sẽ coi từng ký tự là một phần tử và sẽ tách từng ký tự ra để sắp xếp.
```
>>> sentence = 'I like abc'
>>> sorted(sentence)
[' ', ' ', 'I', 'a', 'b', 'c', 'e', 'i', 'k', 'l']
```
## Các tham số không bắt buộc
Như ta đã thấy, hàm sorted() phải nhận 1 tham số bắt buộc là một đối tượng dạng list, set hoặc tuple, nhưng sorted() còn nhận 2 tham số khác, là reverse và key
### reverse
Khi bạn truyền một đối tượng vào hàm sorted(), tham số reverse được mặc định là False. Bạn có thể truyền vào reverse=True, khi đó sorted() sẽ sắp xếp đảo ngược thứ tự. 
```
>>> number_list = [1, 2, 3, 4, 5, 6]
>>> sorted(number_list, reverse=True)
[6, 5, 4, 3, 2, 1]
```
### key
Nếu bạn có một hàm đặc biệt và cần chạy hàm này với mỗi phần tử của đối tượng truyền vào hàm sorted(), bạn có thể truyền vào tham số key, và sorted sẽ sắp xếp các phần tử dựa trên kết quả trả về của hàm đó.
Giả dụ, bạn có 1 mảng 2 chiều

```
multidimensional_array = [[1, 3], [4,0], [2,1], [7,3], [9,9]]
```
Và giờ bạn muốn sắp xếp mảng này dựa trên phần tử tại vị trí thứ 2 (tức index là 1), bạn có thể truyền vào key một hàm lambda, ở đây chúng ta chỉ cần sắp xếp theo phần thử tại index 1, vậy hàm lambda sẽ là 
```
lambda x:x[1]
```
Kết hợp lại, ta có :
```
>>> multidimensional_array = [[1, 3], [4,0], [2,1], [7,3], [9,9]]
>>> sorted(multidimensional_array, key=lambda x:x[1])
[[4, 0], [2, 1], [1, 3], [7, 3], [9, 9]]
```
## Giới hạn và lỗi thường gặp với sorted():
Một trong những lỗi thường gặp nhất với sorted đó là trong đối tượng mà bạn truyền vào có các phần tử không thể so sánh được với nhau, ví dụ số và chữ, số và null, chữ và kiểu Boolean (True, False)
```
>>> nope_array = [1, '2', None]
>>> sorted(nope_array)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'str' and 'int'
```
Một lỗi khác mà có thể khiến kết quả trả về không như ý muốn là so sánh thứ tự nhưng lại có cả chữ thường và chữ in hoa. 

```
>>> char_list = ['a', 'C', 'b']
>>> sorted(char_list)
['C', 'a', 'b']
```
Điều khác cần lưu ý đó là hàm mà được truyền vào key chỉ được phép nhận 1 tham số.
```
>>> def change(x, y):
...     return x*y
... 
>>> number_list = [1, 2, 3, 4, 5]
>>> sorted(number_list, key=change)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: change() missing 1 required positional argument: 'y'
```
Và hàm được truyền vào key phải chạy thành công với mọi phần tử của đối tượng mà bạn đang truyền vào sorted().
```
>>> number_list = ['1', '2', '3', 'four']
>>> sorted(number_list, key=int)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: 'four'
```

# Hàm sort()
So với hàm sorted() thì hàm sort() có chức năng gần như tương tự, trừ 1 số điểm khác biệt. Hàm sort()  là một **method** của kiểu dữ liệu **list** trong python. Có 1 số điểm cần lưu ý
- Hàm sort() vẫn nhận thêm từ khóa key và reverse như hàm sorted
- Hàm sort() không phải là method của tuple và set, nên đối tượng thuộc kiểu này sẽ không gọi được nó
- Hàm sort() không trả về một list mới được sắp xếp, mà thay **đổi ngay tại chỗ** đối tượng list đã gọi nó. Vì vậy bạn không nên gán kết quả trả về của list.sort() vào 1 biến vì giá trị của biến đó sẽ là None.
```
>>> multidimensional_array = [[1, 3], [4,0], [2,1], [7,3], [9,9]]
>>> sorted_array = multidimensional_array.sort(reverse=True, key=lambda x:x[1])
>>> type(sorted_array)
<class 'NoneType'>
>>> multidimensional_array
[[9, 9], [1, 3], [7, 3], [2, 1], [4, 0]]
```
# Tổng kết
Như vậy là chúng ta đã biết sự khác biết giữa hàm sorted() và sort() trong Python, chung quy lại thì 2 hàm này gần như nhau, tuy có hàm sort() là method của list và các kiểu tuple, set sẽ không gọi được và nó sẽ thay đổi trực tiếp list gọi nó. Cả 2 hàm đều có thể nhận thêm tham số **key** giúp chúng chạy hàm với từng phần tử và **reverse** giúp chúng đảo ngược thứ tự sắp xếp. Mình mong các bạn đã học được thêm từ 2 bài viết này. Cảm ơn vì đã đọc ! Bạn có thể tham khảo thêm ở  [đây](https://realpython.com/python-sort/)