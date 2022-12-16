* Python là một trong những ngôn ngữ bậc cao có cú pháp đơn giản, ngắn, dễ đọc, dễ hiểu bậc nhất hiện nay. Đặc điểm này khiến python trở thành 1 ngôn ngữ được nhiều bạn lập trình viên mới bắt đầu chọn để học. 
* Tuy nhiên, dù dùng bất kỳ ngôn ngữ nào, nếu chỉ nghĩ đến việc viết làm sao để code chạy, thì sớm muộn, đống code của các bạn cũng sẽ trở nên quá lằng nhằng, dài dòng khó hiểu mà có khi đến chính bạn khi đọc lại cũng chả thể hiểu nổi code của mình. Đáng tiếc đây lại là tâm lý chung của các bạn mới bắt đầu với lập trình.
* Mình cũng chẳng ngoại lệ, cũng một thời cắm mặt code để rồi bị comment sấp mặt. Nhưng từ đó cũng rút dc khá nhiều kinh nghiệm để giúp code ngắn gọn sạch sẽ, dễ hiểu hơn. Vì vậy hôm nay mình viết bài này chia sẻ những gì mình đã rút ra được, mong là có thể ít nhiều giúp được các bạn.
# Hàm next()
* Hàm `next()` trả về phần tử tiếp theo trong iterator. Nếu ta thêm điều kiện cho nó, nó sẽ trả về phần tử tiếp theo thỏa mãn điều kiện
* Ví dụ: 
```
for item in list:
    if item.name == 'item name':
        return item
```
* Với hàm `next()` ta chỉ cần 1 dòng:
```
return next(item for item in list if item.name == 'item name')
```
* Bạn cũng có thể thêm giá trị default trả về nếu không có item nào thỏa mãn điều kiện :
```
return next((item for item in list if item.name == 'item name'), None)
```
# Hàm any()
* Hàm `any()` khá giống hàm `next()` nhưng thay vì trả về item nếu item đó thỏa mãn điều kiện, nó sẽ trả về kiểu `Boolean`. `True` khi tồn tại item thỏa mãn điều kiện, `False` khi không có item nào.  
* Code thường :
```
for item in list:
    if item.name == 'item name':
        return True
return False
```
* Code với hàm  `any()`:
```
return any(item.name == 'item name' for item in list)
```
# Hàm all()
* Hàm `all()` ngược lại với hàm `any()`. Nó trả về `True` nếu tất cả phần tử trong iterator đều thỏa mãn điều kiện và `False` nếu ngược lại
* Code thông thường:
```
for item in list:
    if item.name != 'item name':
        return False
return True
```
* Code với  hàm `all()`
```
return all(item.name == 'item name' for item in list)
```
# Hàm set()
* Kiểu dữ liệu `set` là 1 tập hợp các giá trị mà trong đó mỗi giá trị đều là duy nhất. Hàm `set()` sẽ giúp các bạn loại bỏ các giá trị bị duplicate và khi dùng kết hợp với hàm `list()`, ta sẽ lấy ra được 1 list đã loại bỏ tất cả các giá trị bị duplicate
* Ví dụ
```
a = [1, 2, 2, 3, 4, 4, 5]
a = list(set(a))
```
* Kết quả
```
[1, 2, 3, 4, 5]
```
# Hàm enumerate()
* Hàm `enumerate()` giúp ta có thể lấy được index của các item trong 1 vòng lặp for
```
for index, item in enumerate(list):
    print(index)
```
* Bạn có thể chỉ định giá trị bắt đầu của index bằng cách thêm param `start` cho hàm
```
for index, item in enumerate(list, start=1):
    print(index)
```
* Như trên index sẽ bắt đầu từ 1 thay vì default = 0 như cách khai báo ban đầu
# List Comprehension
* List comprehension là 1 cách viết ngắn gọn để tạo ra 1 list với các điều kiện phức tạp. Nghe như này chắc các bạn thấy hơi khó hiểu. Đừng lo,  đi xuống các ví dụ cụ thể thì các bạn sẽ hiểu ngay thôi
* Ví dụ mình muốn tạo ra 1 list chứa các phần tử từ 1 đến 10
    * Cách code thông thường
    ```
    a = []
    for item in range(1, 10):
        a.append(item)
    ```
    * Khi dùng với list comprehension
    ```
    a = [item for item in range(1, 10)]
    ```
* Hai đoạn mã trên cho về cùng 1 kết quả, tuy nhiên với cach thứ 2 ta chỉ cần dùng 1 dòng thay vì 3 dòng như cách 1 nhưng vẫn đảm bảo tính dễ đọc, dễ hiểu.
* Cùng thử 1 số list comprehension phức tạp hơn, mình muốn lấy ra mảng các số chẵn từ 1 đến 10:
    * Cách thông thường
    ```
    a = []
    for item in range(1, 10):
        if item % 2 == 0
            a.append(item)
    ```
    * Dùng với list comprehension
    ```
    a = [item for item in range(1, 10) if item % 2 == 0]
    ```
* Phức tạp hơn nữa, bạn thậm chí có thể lồng các vòng lặp trong 1 list comprehension
* Ví dụ mình cần lấy ma trận chuyển vị của  1 ma trận 
    * Đầu vào
    ```
    [[1, 2], [3, 4], [5, 6]]
    ```
    * Đầu ra
    ```
    [[1, 3, 5], [2, 4, 6]]
    ```
 * Code thông thường
 ```
transposed = []
matrix = [[1, 2], [3, 4], [5, 6]]

for i in range(2)):
    transposed_row = []

    for row in matrix:
        transposed_row.append(row[i])
    transposed.append(transposed_row)
 ```
 * Với list comprehension
 ```
matrix = [[1, 2], [3,4], [5,6]]
transpose = [[row[i] for row in matrix] for i in range(2)]
 ```
# If/else theo cách thông minh hơn
- If else là 1 trong những hàm thông dụng và thường xuyên được sử dụng nhất, tuy nhiên không phải ai cũng biết cách viết if else sao cho hiệu quả và ngắn gọn. Ở đây mình sẽ chỉ ra 1 vài trường hợp thường gặp nhất
* Kiểm tra True/False
    * Chưa tốt
    ```
    if a == True:
    if len([a, b, c]) != 0:
    if 'string' != '':
    if a != None:
    ```
    * Nên dùng
    ```
    if a:
    if [a, b, c]:
    if 'string':
    if a:
    ```
* Lấy giá trị của 1 biến theo điều kiện
    * Chưa tốt
    ```
    if a == True:
        b = 1
    else:
        b = 2
    ```
    * Nên dùng
    ```
    b = 1 if a else 2
    ```
* return giá trị theo điều kiện
     * Chưa tốt
     ```
     if a == True:
         ......some logic code
         return True
     else:
         return False
     ```
     * Nên dùng
     ```
     if not a:
         return False
    .....some logic code
     return True
     ```
     * Chưa tốt
     ```
     if a:
         return a
     return b
     ```
     * Nên dùng
     ```
     return a or b
     ```
# Python unpacking
* Lấy giá trị trong 1 iterable gán cho các biến trong 1 câu lệnh
    ```
    a , b, c = [1, 2, 3]
    ```
    * Kết quả:
    ```
    a = 1, b = 2, c=3
    ```
* Lấy ra các giá trị trong 1 iterable gán cho các biến mà không cần gán tất cả từng phần tử trong iterable
    ```
    a, *b, c = [1, 2, 3, 4, 5, 6]
    ```
    * Kết quả
    ```
    a = 1, b = [2, 3, 4, 5], c = 6
    ```
* Tạo 1 iterable từ các biến
    ```
    a = 1
    b = 2
    c = 3
    d = a, b, c
    ```
    * Kết quả
    ```
    d = (1, 2, 3)
    ```
* Swap giá trị giữa hai biến
    ```
    a, b = 1, 2
    a, b = b, a
    ```
    * Kết quả
    ```
    a = 2, b = 1
    ```
# Python collecttion
* Tìm giao của 2 list
    ```
    a = [1, 2, 3]
    b = [3, 2, 4, 5]
    c = list(set(a) & set(b))
    ```
    * Kết quả
    ```
    c = [2, 3]
    ```
* Hợp 2 list
    ```
     a = [1, 2, 3]
    b = [3, 2, 4, 5]
    c = list(set(a) | set(b))
    ```
    * Kết quả
    ```
    c = [1, 2, 3, 4, 5]
    ```
# Kết luận
* Trên đây là một vài những tips, tricks khá hữu dụng và hay gặp mà mình đã tổng hợp được sau 1 thời gian làm việc với python. Hi vọng nó có thể ít nhiều giúp các bạn trong quá trình học tập và làm việc.
* Nếu có bất kỳ ý kiến hoặc góp ý nào, các bạn vui lòng để lại dưới phần comment, mình sẽ check và giải đáp sớm nhất có thể.
* Thank for reading!