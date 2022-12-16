Python là một ngôn ngữ quen thuộc của hầu hết những người mới lập trình. Phần lớn bởi vì Python khá đơn giản trong cấu trúc, có nhu cầu cao và đặc biệt Python là một ngôn ngữ được ứng dụng cực kì rộng rãi. Nhưng có một vài trường hợp có thể gây nhầm lẫn hay có thể gọi là "những cú lừa" dành cho những người mới, những trường hợp đó được gọi là “Gotchas”!, bắt nguồn không chính thức từ “Got You!”, Một `gotcha` thường là một trường hợp hoặc một kịch bản khi chương trình trả về kết quả không như mong muốn. 

Một điều cần lưu ý rằng `gotchas` không phải lỗi hay bất kỳ một ngoại lệ nào. Nó là những dòng code hợp lệ dẫn đến đầu ra không chính xác bởi vì chúng ta đã bỏ qua một số tiểu tiết và kết quả trả về thực tế của tiểu tiết đó. Do đó, có thể coi `gotchas` là những lỗi thông thường khi code.

![](https://images.viblo.asia/bbb4200d-1d4f-4b49-a418-348b84b2923c.png)


# Bắt đầu với một vài ví dụ về `Python 3` và xem xét `gotchas` gặp phải.

## 1. `gotchas` dấu ngoặc đơn:
Có một số lỗi phát sinh khi dấu ngoặc đơn được sử dụng không chính xác hoặc không cần thiết.
```python
print(5>2 == True)  # results in False
```
Điều này dẫn đến `False` bởi vì biểu thức trên có nghĩa là `5>2` và `2== True`. Điều này dẫn đến `True and False` và kết quả là `False` .
Có thể sửa lỗi này với dấu ngoặc đơn.
```python
print((5>2) == True) # results in True
```
Đây là một ví dụ khác:
```python
print(5 is (not None)) # results in False
```
This is because "is not" is different from "is" and "not" being used separately. The part (not None) equals True and 5 is True results in False. It can be corrected by not using any parenthesis.<br>
Điều này là do `is not` khác với `is` và `not` được sử dụng riêng. Phần `not None` trả về `True` và `5` là `True` sẽ trả về kết quả `False`. Chúng ta sẽ sửa nó bằng cách bỏ dấu ngoặc đơn đi.
```python
print(5 is not None) # results in True
```
## 2. `gotchas` `is`, `==`, `is not`, `!=` :
Các toán tử so sánh được sử dụng rất nhiều, nhưng chúng cũng là những `gotchas` rất phổ biến. Rất nhiều lập trình viên mới thường nghĩ rằng là `is` và `==` là so sánh những thứ giống nhau, nhưng chắc chắn là không.
```python
print(1 == True) # results in True
print(1 is True) # results in False
```
Mặc khác,  `is not` và `!=` lại là như nhau.
```python
print(1 != False) # results in True
print(1 is not False) # results in True
```
## 3. `gotchas` tham số mặc định:
Trong Python, các đối số mặc định chỉ được khai báo một lần khi hàm được chạy lần đầu tiên và từ đó trở đi, đối số đã khai báo được sử dụng mỗi lần.
```python
def appendNew(appendTo =[]):      
    appendTo.append(1)   
    return appendTo

print(appendNew()) # [1]
print(appendNew()) # [1, 1]
```
Mỗi khi chúng ta gọi `appendNew()`, một danh sách mới sẽ được tạo, danh sách này sẽ có số `1` được thêm vào.<br>
Biến `appendTo` không được tạo lại khi chạy hàm lần thứ hai. Thay vào đó, nó chỉ được tạo ra lần đầu tiên và được sử dụng nhiều lần. Có thể giải quyết nó bằng cách:
```python
def appendNew(appendTo = None):  
    if appendTo == None:
        appendTo =[]    
    appendTo.append(1)   
    return appendTo

print(appendNew()) # [1]
print(appendNew()) # [1]
```
## 4. `gotchas`  phạm vi:
Đôi khi, chúng ta phải ghi nhớ phạm vi của biến mà chúng ta đang xử lý, tức là nó là phạm vi toàn cục (hoạt động nhưng bên trong và bên ngoài một hàm) hay phạm vi cục bộ (chỉ hoạt động bên trong hàm).
```python
list1 = [1, 2, 3]
def baz1():
    list1.append(4) 
    return list1
def baz2():
    list1 += [5]      
    return list1

print(baz1()) # [1, 2, 3, 4]
print(baz2()) # Error
```
Ở `baz2()` chúng ta đang gán cho biến `list1` nhưng `list1` được xác định bên ngoài phạm vi chức năng của chúng ta. Trong khi ở trong `baz1()`, vậy nên thêm vào `list1` thay vì gán và do đó nó hoạt động tốt.
## 5. `gotchas` late binding:
Python có một "late binding behavior" (hành vi ở thời điểm thực thi). 
```python
def create_multipliers():
    return [lambda c : i * c for i in range(6)] 
  
for multiplier in create_multipliers():
    print multiplier(3)
```
Kết quả mong đợi:
```
0
3
6
9
12
15
```
Nhưng kết quả thực tế:
```
15
15
15
15
15
15
```
Điều này là do khi vòng lặp hoàn thành, `i` có giá trị là 5, vì thế `5*3` sẽ được in ra 6 lần khi vòng lặp kết thúc.
Có thể giải quyết như sau:
```python
def create_multipliers():
    return [lambda x, i = i : i * x for i in range(6)]
      
for multiplier in create_multipliers():
    print(multiplier(3))
```
# Kết
Trên đây là một vài ví dụ điển hình về `gotchas` trong python mà các lập trình viên mới thường xuyên gặp phải.<br>

Bài viết của một người mới tập code python và hướng tới những người mới, không thể trách khỏi sai sót. Điều gì chưa chính xác xin vui lòng bỏ qua.

Nguồn: https://docs.python-guide.org/writing/gotchas // https://www.geeksforgeeks.org/gotchas-in-python/