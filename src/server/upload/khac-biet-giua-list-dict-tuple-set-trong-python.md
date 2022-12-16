Chào các bạn, Trong ngôn ngữ Python kiểu dữ liệu List là một trong các kiểu dữ liệu tập hợp bao gồm: List, Tuple, Set, Dictionary tuy nhiên việc hiểu ý nghĩa và cách sử dụng của từng kiểu đôi khi lại gây chút nhầm lẫn :disappointed_relieved:, trong bài viết này mình sẽ gới thiệu 4 kiểu dữ liệu List và sự khác biệt giữa chúng :stuck_out_tongue_winking_eye:
# List
Kiểu dữ liệu List là kiểu dữ liệu được sử dụng nhiều nhất trong Python bạn có thể thấy chúng bất kì đâu trong một dự án Python, List chứa một tập các giá trị, được phân tách nhau bằng dấu phẩy, List có thể chứa bất kỳ kiểu dữ liệu nào.
Một List được tạo bởi cặp dấu [] như sau:
```
lst = [2, 4, 3, "ABC", 3, [6, 4, 2]] #=> [2, 4, 3, 'ABC', 3, [6, 4, 2]]
print type(lst) #=> <type 'list'>
```
Các thao tác cơ bản với List:
- Truy cập đến một phần tử trong mảng:
```
print lst[2] #=> 3 
```
- Gán giá trị mới cho một phần tử trong mảng:
```
lst[2] = 100
print lst #=> [2, 4, 100, 'ABC', 3, [6, 4, 2]]
```
- Lấy độ dài của mảng:
```
print len(lst) #=> 6
```
- Thêm phần tử mới vào mảng:
```
lst.append(True) #=> [2, 4, 100, 'ABC', 3, [6, 4, 2], True]
```
- Gộp hai mảng:
```
any_lst = ['one', 'two', 'three']
lst.extend(any_lst) #=> [2, 4, 100, 'ABC', 3, [6, 4, 2], True, 'one', 'two', 'three']
```
- Sắp xếp hay đảo ngược:
```
lst = [4,3,5,2,7,5,2]

lst.sort() #=> [2, 2, 3, 4, 5, 5, 7]
lst.sort(reverse = True) #=> [7, 5, 5, 4, 3, 2, 2]
```

# Tuple
Tương tự như kiểu dữ liệu List tuy nhiên lại có một sự khác biệt với kiểu List đó là các phần tử trong Tuple không thể bị thay đổi sau khi gán chính vì vậy tốc độ của Tuple luoonm luôn nhanh hơn so với List, Tuple chứa một tập các giá trị, được phân tách nhau bằng dấu phẩy,  có thể chứa bất kỳ kiểu dữ liệu nào.
Một tuple được tạo bởi cặp dấu () như sau:
```
tup = (2, "ABC", 7, 3, [4,3,7], True, 3) #=> (2, 'ABC', 7, 3, [4, 3, 7], True, 3)
print type(tup) #=> <type 'tuple'>
```
- Không thể thay đổi một phần tử của Tuple:
```
tup[1] = 100 #=> TypeError: 'tuple' object does not support item assignment
```
- Không thể xoá phần tử trong Tuple:
```
del tup[1] #=> TypeError: 'tuple' object doesn't support item deletion
```
- Đếm số lần xuất hiện của một phần tử trong Tuple:
```
print tup.count(3) #=> 2
```
- Lấy ra vị trí index đầu tiên tìm được:
```
print tup.index(3) #=> 3
```

# Set
Tương tự như 2 kiểu dữ liệu chúng ta đã tìm hiểu ở trên tuy nhiên Set lại chứa các phần tử là DUY NHẤT có nghĩa là các phần tử không bị lặp lại trong một tập hợp Set :100:, Set chứa một tập các giá trị, được phân tách nhau bằng dấu phẩy, có thể sử dụng được các phép toán trên tập hợp, các phần tử trong Set không có thứ tự.
Một tập hợp Set được tạo bởi cặp dấu {} như sau:
```
st_a = { 2, 7, 3, 2, 5 } #=> set([2, 3, 5, 7])
print type(str_a) #=> <type 'set'>
```
Các thao tác cơ bản với Set:
- Thêm một phần tử vào Set:
```
st_a.add(100) #=> set([2, 3, 100, 5, 7])
```
- Xoá một phần tử bằng pop:
```
st_a.pop #=> set([2, 3, 100, 5, 7]) #=> set([3, 5, 7])
```
- Pép &h lấy giao của A và B
```
print st_a & st_b #=>  set([2, 3, 7])
```
- Phép | lấy hợp của A và B
```
print st_a | st_b #=> set([1, 2, 3, 4, 5, 7, 9])
```
- Phép - lấy các giá trị chỉ có ở A không có ở B
```
print st_a - st_b #=> set([5])
```
- Phép ^ bù của A và B chỉ lấy những phần tử có ở A và B nhưng không phải phần tử chung của hai tập hợp này
```
print st_a ^ st_b #=> set([1, 4, 5, 9])
```

# Dict

Khác với 3 kiểu dữ liệu ở trên Dict lưu trữ các phần tử theo dạng {key: value}, các key phải có giá trị khác nhau và Python chỉ chấp nhận các key có các kiểu dữ liệu như (string, number, tuple): 
Một Dict được tạo bởi cặp dấu {} và mỗi phàn tử là một cặp key:value :open_mouth: như sau:
```
dict_a = {1: "MySQL", 2: "SQLServer", 3:"SQLite"} #=> {1: 'MySQL', 2: 'SQLServer', 3: 'SQLite'}
dict_b = {"a": "MySQL", "b": "SQLServer", (2, 3, 7): "SQLite"} #=> {'a': 'MySQL', 'b': 'SQLServer', (2, 3, 7): 'SQLite'}
```
Các thao tác cơ bản với Dict:
- Lấy các keys của Dict:
```
print dict_a.keys() #=> [1, 2, 3]
```
- Lấy các values của Dict:
```
print dict_a.values() #=> ['MySQL', 'SQLServer', 'SQLite']
```
- Lấy các items của Dict:
```
print dict_a.items() #=> [(1, 'MySQL'), (2, 'SQLServer'), (3, 'SQLite')]
```
- Truy cập bằng key:
```
print dict_a[2] #=> SQLServer
```
- Thêm một phần tử vào Dict:
```
dict_a[100] = "MongoDB"
print dict_a #=> {1: 'MySQL', 2: 'SQLServer', 3: 'SQLite', 100: 'MongoDB'}
```
- Xoá một phần tử:
```
dict_a.pop(3)
print dict_a #=> {1: 'MySQL', 2: 'SQLServer', 100: 'MongoDB'}
```
# Tổng kết
Như vậy chúng ta vừa ôn lại 4 kiểu dữ liệu: List, Tuple, Set, Dict và chúng ta có thể đưa ra một tóm tắt như bảng dưới đây :+1::+1:: 

| Tên | Đặc trưng | Mutable | Sắp xếp | Đặt trong dấu | Khởi tạo | 
| -------- | -------- | -------- | -------- | -------- | -------- |
| List  | Chứa bất kì kiểu dữ liệu nào | x       | x       | []            | list()   |
| Tuple | Giá trị không thể thay đổi   |         | x       | ()            | tuple()  |
| Set   | Giá trị là duy nhất          | x       |         | {}            | set()    |
| Dict  | Key: Value                   | x       |         | {}            | dict()   |

Như vậy là mình đã giới thiệu xong cách sử dụng và sự khác biệt giữa các loại List trong Python ngoài ra các bạn có thể tham khảo thêm các function có sẵn khác có rất nhiều [ function](https://docs.python.org/3/tutorial/datastructures.html) để các bạn tham khảo và sử dụng khi làm việc với List .

Tài liệu tham khảo:
Data Structures (list, dict, tuples, sets, strings): https://thomas-cokelaer.info/tutorials/python/data_structures.html