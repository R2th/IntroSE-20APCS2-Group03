Khi chúng ta lập trình thì chúng ta thường thao tác với rất nhiều kiểu dữ liệu. Hôm nay mình xin giới thiệu một trong những kiểu dữ liệu rất quan trọng khi lập trình.
Đó là kiểu dữ liệu List trong python. 

List là một danh sách các phần tử được phân cách với nhau bằng dấu phẩy, và có thể chứa nhiều kiểu dữ liệu khác nhau. Và nó được lưu trữ theo thứ tự.

**Khởi tạo List:**
```
list1 = ['physics', 'chemistry', 1997, 2000];
list2 = [1, 2, 3, 4, 5 ];
list3 = ["a", "b", "c", "d"]
```
Chỉ mục trong list được đánh số từ 0.

 **Truy cập dữ liệu trong List**
 
Chúng ta có thể truy cập dữ liệu trong list thông qua chỉ mục:
```
list1 = ['physics', 'chemistry', 1997, 2000];
list2 = [1, 2, 3, 4, 5, 6, 7 ];
print "list1[0]: ", list1[0]
print "list2[1:5]: ", list2[1:5]
```
Kết quả:
```
list1[0]:  physics
list2[1:5]:  [2, 3, 4, 5]
```
**Các methods thao tác với List objects:**

Khởi tạo 1 list:
    ```
    a = [66.25, 333, 333, 1, 1234.5]
    ```

* list.append(x)

    Thêm một item vào vị trí cuối cùng của list
    
    ```a.append(333)```
    
    => ```[66.25, 333, 333, 1, 1234.5, 333]```
* list.extend(L)

    Mở rộng danh sách bằng cách thêm tất cả các phần tử của một mảng mới vào mảng đã cho
    
    ```
    aList = [123, 'xyz', 'zara', 'abc', 123];
    bList = [2009, 'manni'];
    aList.extend(bList)
    print "Extended List : ", aList 
    ```
    => ```Extended List :  [123, 'xyz', 'zara', 'abc', 123, 2009, 'manni']```
* list.insert(i,x)

    Thêm một phần tử vào 1 vị trí được chỉ định
    
    ```a.insert(2, -1)```
    
    => ```[66.25, 333, -1, 333, 1, 1234.5, 333]```
* list.remove(x)

    Xóa một phần tử đầu tiên mà nó bắt gặp được trong list
    
    ```a.remove(333)```
    
    => ```[66.25, -1, 333, 1, 1234.5, 333]```
* list.pop([i])

    Lấy ra một phần tử và trả về phần tử đó với vị trí chỉ định sẵn. Nếu không chỉ định vị trí muốn lấy ra thì sẽ mặc đinh lấy phần tử cuối cùng của list 
    
    ```a.pop()```
    
    => ```333```
* list.index(x)

    Trả lại index của một giá trị trong list, nếu giá trị truyền vào không có trong list sẽ báo lỗi value error. Nếu trong list có nhiều giá trị truyền vào thì nó sẽ trả lại index của phần tử đầu tiên nó timfm thấy
    
    ```a.index(333)```
    
    => ```2```
* list.count(x)

    trả lại tổng số phần tử trong list
* list.sort(cmp=None, key=None, reverse=False)

    Sắp xếp lại các phần tử trong list
    
    ```
    >>> a.sort()
    >>> a
    ```
    
    =>``` [-1, 1, 66.25, 333, 333]```
* list.reverse()

    Đảo ngược các phần tử trong list
    
     ```
    >>> a.reverse()
    >>> a
    ```
    
    => ```[333, 333, 66.25, 1, -1]```


**Sử dụng List như Stacks**

Chúng ta có thể dễ dàng sử dụng List như Stacks nới mà phần tử cuối cùng được thêm vào là phần tử đầu tiên được lấy ra ("last-in, first-out"). Để add item vào đỉnh stack dùng **append()**. Để lấy phần tử trên đỉnh stack dùng **pop()**.

```
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack
[3, 4, 5, 6]
>>> stack.pop()
6
>>> stack.pop()
5
>>> stack
=> [3, 4]
```

**List Comprehensions**

List comprehension cung cấp cú pháp để tạo một list môt cách ngắn gọn. 
ví dụ khi thao tác bình thường để tạo 1 list of squares:
```
squares = []

for x in range(10):

      squares.append(x**2)
      
squares 

=> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Chúng ta có thể viết gọn lại như sau:
```
squares = [x**2 for x in range(10)]
```

Trong trường hợp chúng ta phải viết 2 vòng for lồng nhau đi kèm với check điều kiện abcxyz.
Đại loại như sau:

```
combs = []

for x in [1, 2, 3]:

  	  for y in [3, 1, 4]:
      
   		  if x != y:
          
 			  combs.append((x, y))
              
combs
=> [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```
Thì thay vào đó chỉ với 1 dòng:
```
[(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
```
Kết quả nhận được thì vẫn như nhau.
=> [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

Trên đây thì mình đã giới thiệu những hàm và cách chúng ta có thể tạo ra những cấu trúc dữ liệu phức tạp với những dòng code ngắn gọn. Hi vọng bài viết sẽ giúp ích phần nào cho các bạn. 
Thank for reading!

Tham khảo:
https://docs.python.org/2/tutorial/introduction.html#lists