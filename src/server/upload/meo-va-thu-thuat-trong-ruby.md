### Multiple Assignments
Bạn có thể gán nhiều giá trị cho 1 biến trên 1 dòng

```
ví dụ 1

var_1, var_2 = ["carrots", "peppers"]
#=> ["carrots", "peppers"]
var_1
#=> "carrots"
var_2
#=> "peppers"
```

Trong ví dụ 1,  tôi đã thiết lập hai biến, `var_1` và `var_2` tương ứng với `carrots` và `peppers`. Hai chuỗi phải nằm trong một mảng.

Chúng ta có thể đặt nhiều giá trong một mảng bằng cách cú pháp tương tự.

```
ví dụ 2

fast_food = ["a", "b", "c", "d"]
fast_food[0..1] = ["McDonalds", "Wendys"]
#=> ["a", "b", "c", "d"]
#=> ["McDonalds", "Wendys"]
fast_food[0]
#=> "McDonalds"
fast_food[1]
#=> "Wendys"
```

### Hoán đổi nhiều biến
Giống như cách chúng ta có thể gán nhiều giá trị cùng một lúc, chúng ta có thể trao đổi nhiều biến trong một dòng

```
a, b, c = [1, 2, 3]
a, b, c = b, c, a
#=> [1, 2, 3]
#=> [2, 3, 1]
```

### Union
Một toán tử union` (|)` trả về tất cả các phần tử của cả hai mảng. Có nghĩa là `union` sẽ trả về một mảng mới bằng cách nối 2 mảng với nhau, và các giá trị trong mảng mới trả về là duy nhất
```
[1, 2, 3] | [4, 5, 6]
=> [1, 2, 3, 4, 5, 6]
[1, 2] | [2]
=> [1, 2]
```

### Intersection
Toán tử intersection trả về các phần tử chung của cả 2 mảng.
```
[1, 2, 3] & [3, 4]
#=> [3]
[1, 2] & [3, 4]
#=> []
```

### Difference
Toán tử difference `(-)` trả về các phần từ từ mảng đầu tiên không tồn tại trong mảng thứ 2
```
[1, 2, 3] - [2, 3]
#=> [1]
[1] - [1]
#=> []
```

### Forty_two()
Trong rails có các phương thức để hỗ trợ truy cập các phần tử thứ 1 -> 10 của mảng.  `Array#first`, `Array#second`,…, `Array#tenth`

Nhưng bạn có biết bạn có thể lấy [phần tử thứ 42](https://apidock.com/rails/Array/forty_two) cụ thể trong một mảng không?
```
arr[41]
arr.forty_two
```

Theo tài liệu của Rails, `Array#forty_tw`o is [Also known as accessing "the reddit"](https://www.quora.com/Why-is-Array-forty_two-called-the-reddit-in-Ruby-on-Rails).

### Kết
Trên đây là một số thủ thuật nho nhỏ giúp công việc của các bạn dễ dàng hơn. Cảm ơn các bạn đã theo dõi