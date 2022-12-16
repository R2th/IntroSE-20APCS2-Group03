`Ruby Set` là gì?
Theo định nghĩa thì `Set` là một cách thức lưu trữ chuỗi các phần tử duy nhất được sắp xếp theo nhóm vì chúng có liên quan với nhau theo một cách nào đó. `Sets` có thể chứa các `sets` khác, có thể trống, nhưng chúng không thể chứa các thành viên trùng lặp. 
Nó giống như `Array` tuy nhiên trong một số trường hợp nó có thể nhanh gấp 10 khi sử dụng Array

Trong [ Ruby tutorial](https://www.rubyguides.com/ruby-tutorial/) bạn sẽ thấy rằng:

- Làm sao vs Khi nào để sử dụng `Set` có hiệu suất cao nhất
- Sự khác nhau giữa Array vs Set
- Một danh sách các phương thức thiết lập hữu ích


### Ruby Set Examples

`Set` là một Class của Ruby hỗ trợ bạn tạo ra 1 array có giá trị duy nhất

Sau đây là một số ví dụ cơ bản:

Giả sử bạn có một danh sách `products` rất lớn tuy nhiên có rất nhiều `product` lặp trong danh sách này và bạn chỉ muốn lấy ra những `product` có sự độc đáo.

Nếu vậy bạn hãy dùng `Set`, `Set` sẽ hỗ trợ bạn tạo ra một danh sách các `product` duy nhất.

Và đây là cách làm nó: bạn có thể thực hiện tren `irb`

```
require 'set'
products = Set.new
products << 1
products << 1
products << 2
products
# Set: {1, 2}
```

Một lợi ích khác là việc tìm kiếm danh sách này sẽ rất nhanh:

```
products.include?(1)
# true
```

Điều này quá nhanh vì việc tìm kiếm được thực hiện trong thời gian không đổi.

### Sự khác nhau giữa `Set` vs `Array`

Bây giờ bạn đang tự hỏi ...

Vậy sự khác biệt giữa `Set` và `Array` là gì?

Một `Set` không có quyền lấy trực tiếp vào các giá trị:

```
products[0]
# undefined method `[]'
```

Đó là sự khác biệt chính.

Nhưng có thể được chuyển đổi thành `Array` bất cứ lúc nào bạn cần:

```
products.to_a
# [1, 2]
```

`Set` có 2 đặc điểm chính là:

- Thời gian tìm kiếm nhanh
- Giá trị trong set là duy nhất

Nếu bạn cần những thứ này thì  `Set` sẽ giúp bạn tăng hiệu suất tốt và bạn sẽ không gọi uniq trên mảng của mình mỗi khi bạn muốn các giá trị duy nhất.

### Set vs Array Benchmark

Đây là một điểm chuẩn để cho bạn thấy sự khác biệt hiệu suất giữa `Array` & `Set` với class `include?`

```
# Ruby 2.5.0
set   include: 8381985.2 i/s
array include: 703305.5  i/s - 11.92x  slower
```

Lý do cho sự khác biệt này là một mảng phải kiểm tra từng phần tử ...

... Nếu bạn có mảng 1 triệu phần tử, bạn sẽ kiểm tra 1 triệu phần tử mỗi lần bạn `include?`
`Set`  không phải làm điều đó.

### Ruby Set Methods

Một trong những phương thức thiết lập hữu ích là toán tử union:

```
products | (1..10)
# Set: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
```

Điều này hoạt động với bất kỳ đối tượng Enumerable, như arrays, ranges & hashes

Đây là toán tử khác biệt:

```
products - (3..4)
# Set: {1, 2, 5, 6, 7, 8, 9, 10}
```

Và đây là tóan tử giao:

```
Set.new(1..3) & Set.new(2..5)
# Set: {2, 3}
```

### Cách sử sắp xếp trong `Set`

Nếu bạn mong muốn `set` luôn được sắp xếp, bạn có thể dụng `SortedSet`.

Có một số yêu cầu để sử dụng lớp này:

- Các đối tượng phải cùng một kiểu với nhau (so sánh số nguyên với số nguyên hoặc chuỗi với chuỗi).

Đây là một ví dụ:

```
sorted_numbers = SortedSet.new
sorted_numbers << 5
sorted_numbers << 2
sorted_numbers << 1
sorted_numbers
# SortedSet: {1, 2, 5}
```

### Tổng kết

Bạn đã học được cách cơ bản để sử dụng `Set` trong ruby để có performance tốt hơn và sự khác nhau giữa `Set` và `Array`

Cảm ơn đã đọc!