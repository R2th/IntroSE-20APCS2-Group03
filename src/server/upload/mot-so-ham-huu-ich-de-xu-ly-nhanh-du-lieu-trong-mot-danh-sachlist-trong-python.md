## Giới thiệu
* List là một trong những kiểu dữ liệu được sử dụng rất nhiều trong python.
* Các thao tác thường được thực hiện trên list: xử lý từng phần tử trong list, lọc lấy một số phần tử thỏa điều kiện, tính toán dựa trên tất cả các phần tử của list và trả về kết quả.
* Để đơn giản việc xử lý List, Python hỗ trợ một số hàm có sẵn để thực hiện các tác vụ trên gồm **map**, **filter**, **reduce**

## Map
**Map** áp dụng function cho mỗi phần tử của list và trả về list kết quả `map(function_to_apply, list_of_inputs)`


**Ví dụ:** Tính bình phương các số có trong list `items`, thông thường chúng ta sẽ xử lý như sau:
```
items = [1, 2, 3, 4, 5]
squared = []
for i in items:
    squared.append(i**2)
```

**Map** cho phép chúng ta thực hiện điều này theo cách đơn giản và đẹp hơn nhiều, như sau:

```
items = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, items))
```
## Filter
Như cái tên cho thấy, **filter** tạo ra một danh sách các phần tử mà function trả về true.  Dưới đây là một ví dụ ngắn gọn và súc tích:
```
number_list = range(-5, 5)
less_than_zero = list(filter(lambda x: x < 0, number_list))
print(less_than_zero)

# Output: [-5, -4, -3, -2, -1]
```
**Filter** giống như vòng lặp for nhưng nó được xây dựng sẵn và nhanh hơn

## Reduce

**Reduce** là một function thật sự hữu ích để thực hiện một số tính toán trong danh sách và trả về kết quả. Nó áp dụng rolling computation cho các cặp giá trị tuần tự trong một danh sách. Ví dụ bạn muốn tính tích các phần tử của một danh sách các số nguyên:

Cách thông thường: 
```
product = 1
list = [1, 2, 3, 4]
for num in list:
    product = product * num

# product = 24
```
Bây giờ hãy thử với reduce:
```
from functools import reduce
product = reduce((lambda x, y: x * y), [1, 2, 3, 4])

# Output: 24
```
## Kết luận
Trong bài viết chỉ đưa ra những ví dụ đơn giản nên có thể các bạn chưa thấy được sự tiện dụng của  **map**,  **filter**,  **reduce**. Tuy nhiên khi phải làm việc với list nhiều các bạn sẽ thấy nó rất là tiện đặc biệt là khi sử dụng kèm lambda hoặc tái sử dụng các hàm với map, filter và reduce.
## Tài liệu tham khảo
http://book.pythontips.com/en/latest/map_filter.html