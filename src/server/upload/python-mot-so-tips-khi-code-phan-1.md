Python hiện nay đang trở thành xu hướng mà đa số các bạn trẻ, các lập trình viên hướng đến. Một phần vì nó đa dạng về lĩnh vực, thứ hai cũng là sự đơn giản trong code của nó.  Trong bài này mình sẽ giới thiệu cho các bạn một vài mẹo vô cùng hữu ích. Giúp các bạn có thể giảm được lượng code khá đáng kể và tăng hiệu năng cho các đoạn code của bạn.
![](https://images.viblo.asia/bd6cc2fe-1af2-4fa0-8af3-0ae7e4884590.jpg)


# 1. Toán tử 3 ngôi
Một trong số lệnh điều kiện được chúng ta sử dụng nhiều nhất đó là cặp lệnh `If ... else` Vậy chúng ta hay thường gặp vấn đề gì khi sử dụng cặp lệnh này, mình sẽ trình bày ngay dưới đây thôi:
Thông thường, theo bản năng chúng ta sẽ viết một đoạn code `if ... else` như sau:
```python
if condition:
    return True
else:
    return False
```
Nhưng khi nhìn lại, chỉ `return True hoặc False` thôi mà chúng ta mất tới 4 dòng cho nó. Do đó, mình sẽ viết như sau
```python
return True if condition else False
```
# 2. Sử dụng `if ... in`
Giả sử, chúng ta có biến `vehicle = 'car'`. Để kiểm tra `car` có trùng với một phần tử nào đó trong `vehicles = ['bike', 'motorbike', 'car']` không:
```python
for item in vehicles:
    if vehicle === item:
        print('Matched!')
```
Thay vào đó, chúng ta chỉ cần viết:
```python
if vehicle in vehicles:
    print('Matched')
``` 
Nhìn đã ngắn hơn rồi đúng không nào? Nhưng kết hợp với toán tử 3 ngôi ở trên thì: 
```python
print('Matched') if vehicle in vehicles
```
# 3. Sử dụng điều kiện ngược
```python
if condition:
    <statements>
else:
    break
```
Trong một số trường hợp cần xử lý nếu thỏa mãn điều kiên, ngược lại sẽ break luôn, và khi sử dụng điều kiện ngược lại sẽ là:
```python
if not condition:
    break
<statements>
```
# 4. Kiểm tra `empty`
Để kiểm tra một list, dict... có empty hay không:
```python
if len(list) > 0:
    <statements>
    
hay là:
if list != []:
    <statements>
```
Thay vào đó, đơn giản hơn ta chỉ cần:
```python:
if list:
    <statements>
```
# 5. List comprehension
Để thêm một phần tử vào một `list`, ta sẽ `for` từng phần tử rồi `append` chúng vào list đúng không nào.
```python
list_numbers = []
for i in range(5):
    list_numbers.append(i)
```
Ngắn gọn hơn sẽ là:
```python
list_numbers = [i for i in range(5)]
```
hoặc thêm điều kiện: 
``` python
list_number_even = [i for i in range(5) if i % 2 == 0]
```
# 6. any() và all()
#### a. any()
`any()` được sử dụng khi chỉ cần một thỏa mãn điều kiện:
```python
for i in list_numbers:
    if i > 0 and i < 10:
        return True
```
Sử dụng `any()` chúng ta sẽ được:
```python
list_numbers = [0, 5, 15]
any(i > 0 and i < 10 for i in list_numbers)

# True
```
Lí do kết quả ra `True` bởi vì đã có `5` thỏa mãn điều kiện.
#### b. all()
`all()` thì hoạt động ngược lại với `any()`. Kết quả trả về `True` khi và chỉ khi tất cả các phần tử thỏa mãn điều kiện được đưa ra:
```python
list_numbers = [0, 5, 15]
all(i > 0 and i < 10 for i in list_numbers)

# False
```
`0` và `15` không thỏa mãn điều kiện nên hàm `all()` trả về False .
# 7. Merge hai hay nhiều lists
Ta có `list_a = [1,2,3]` và `list_b = [4,5,6]`
Để không phải xử lý cồng kềnh như:
```python
for i in list_b:
    list_a.append(i)
```
thì chúng ta có một cách ngắn hơn đó là:
```python
list = list_a + list_b
```
# 8. Hoán đổi giá trị của hai biến không sử dụng biến trung gian
Đây là một bài toán rất hay mà mình đã đọc được. Giả sử ta có `a = 4, b = 5`. Thông thường, ta sẽ hoán đổi như sau:
```python
a = a + b # a = 9
b = a - b # b = 4
a = a - b # a = 5
```
Đó là trong trường hợp biến `a,b` đều là số nguyên. Còn trong  trường hợp `a và b` là một kiểu dữ liệu khác như string thì sao. Rất hay là Python giúp chúng ta làm điều đó bằng một dòng đơn giản:
```python
a, b = b, a
```
# 9. Lấy giá trị của dict dựa vào key
Chúng ta vẫn có thói quen lấy giá trị trong `dict` dựa vào `key` như: 
```python
var = dict['key']
```
Nhưng trong `dict` của chúng ta không tồn tại `key` đó thì sẽ bị tạch luôn ở case này. (yaoming) Để chắc chắn hơn, chúng ta sử dụng 
```python
var = dict.get('key')
```
Trong trường hợp không tồn tại `key` đó cũng ko sao `var` của chúng ta không có bất kỳ giá trị nào cả.

#### Trên đây là những thứ mình đã học được khi code Python. Mong các bạn ủn mông để mình có thể cho ra đời những phần tiếp theo của series bài viết về Tips và Tricks trong python.