Trong ruby, ta thường sửa dụng 2 class [Array](https://ruby-doc.org/core-2.5.1/Array.html) và [Hash](https://ruby-doc.org/core-2.5.1/Hash.html) để lưu trữ và truy vấn sữ liệu. Hôm nay mình sẽ viết 1 bài về các phương thức thường được sử dụng của [Array](https://ruby-doc.org/core-2.5.1/Array.html), bài về [Hash](https://ruby-doc.org/core-2.5.1/Hash.html) hẹn tháng sau nhé (yaoming).

# I. Array:
## 1. Khởi tạo array:
- Ruby cung cấp nhiều cách khởi tạo array khác nhau.
- Khởi tạo array và gán giá trị cho các phần tử:
```
arr = [1, "two", 3.0] # [1, "two", 3.0]
```
- Khởi tại array rỗng:
```
arr = Arrray.new # []
```
- Khởi tạo array với số lượng phần từ biết trước:
```
arr = Array.new(3)    # [nil, nil, nil]
arr = Array.new(3, 1) # [1, 1, 1]
```
- Khởi tạo array và truyền vào block để khởi tạo giá trị cho các phần từ của mảng:
```
arr = Array.new(3) {|i| i.to_s} # [0, 1, 2]
```

## 2. Truy vấn các phần tử của array:
### a. Hàm [] với 1 tham số:
- Index các phần tử của phần tử trong array được tính bắt đầu từ 0 (tương tự như C hay Java).
- Mỗi phần tử được lưu trong array có thể là bất kỳ object nào trong ruby.
- Do đó các phần tử của array trong Ruby được truy vấn theo index tính từ 0 và tăng dần đến cuối array (index tăng dần theo thứ tự, 0, 1, ... tăng dần đến cuối array). 
- Tuy nhiên trong Ruby, các phần tử của array cũng có thể được truy vấn theo index tính từ -1 và giảm dần đến đầu array (index giảm dần theo thứ tự -1, -2, ... giảm dần đến đầu array)
- Khi truy vấn 1 phần tử có index nằm ngoải array thì ruby trả về nil
- Ví dụ ta có array có 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
```
- Khi đó
```
arr[0] # "one"
...
arr[4] # "five"
arr[5] # nil

arr[-1] # "five" (= arr[4])
...
arr[-5] # "one" (= arr[0])
arr[-6] # nil
```

### b. Hàm [] với nhiều tham số:
- Cách truy vấn trên trả về 1 phần tử có trong array, để trả về 1 mảng con các phần tử liên tiếp ta thay đổi các tham số truyền vào hàm `[]`, có thể truyền vào 2 số nguyên hoặc 1 range
- Ví dụ ta có array 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
```
- Khi đó
```
arr[1, 3] # ["two", "three", "four"]
(array con 3 phần tử liên tiếp, tính từ arr[1])

arr[1..3] # ["two", "three", "four", "five"]
(array con từ arr[1]...arr[3])
```

### c. Hàm at(), first(), last():
- Hàm `at()` nhận 1 tham số và hoạt động tương tự hàm `[]` nhận 1 tham số
- Ví dụ ta có array 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
```
- Khi đó
```
arr.at(0) # "one" (= arr[0])
...
arr.get(4) # "five" (= arr[4])
arr.get(5) # nil

arr.get(-1) # "five" (= arr[-1 ])
...
arr.at(-5) # "one" (= arr[0])
arr.at(-6) # nil

arr.first() # "one" (= arr[0])
arr.last() # "five" (= arr[4])
```

### d. Hàm take(), drop():
- Hàm `take()` và `drop()` trả về array mới và không thay đổi array gọi hàm.
- Hàm `take(n)` trả về array mới n phần tử đầu tiên.
- Hàm `drop(n)` trả về  array mới là phần còn lại của array gọi hàm sau khi xóa n phần tử đầu tiên.
- Ví dụ ta có array 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
```
- Khi đó
```
arr.take(3) # ["one", "two", "three"]
arr         # ["one", "two", "three", "four", "five"]

arr.drop(3) # ["four", "five"]
arr         # ["one", "two", "three", "four", "five"]
```

### e. Hàm empty?(), include?():
- Hàm `empty?()` cho ta biết array đó có rỗng hay không.
- Hàm `include?()` cho ta biết array gọi hàm có chứa phần tử được truyền vào hàm hay không.
- Ví dụ ta có array 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
empty_arr = []
```
- Khi đó
```
arr.empty?       # false
empty_arr.empty? # true

arr.include?(1)     # false
arr.include?("one") # true
```

### f. Hàm count(), length() và size() (alias của length()):
- Hàm `count()`, `length()` khi không truyền tham số sẽ trả về số phần tử có trong array.
- Hàm `count()` khi truyền vào `block` sẽ trả về số phần tử trong array thỏa điều kiện.
- Ví dụ ta có array 5 phần tử
```
arr = ["one", "two", "three", "four", "five"]
```
- Khi đó
```
arr.count  # 5
arr.length # 5

arr.count("one")                  # 1 (["one"])
arr.count {|obj| obj.length == 3} # 2 (["one", "two"])
```

## 3. Thêm phần tử vào array:
### a. Hàm push():
- Hàm `push()` có tác dụng thêm 1 phần tử vào cuối array.
- Ta có thể sử dụng toán tử `<<` để thêm 1 phần tử vào array tương tự như hàm `push()`.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr.push(6) # [0, 1, 2, 3, 4, 5, 6]
arr         # [0, 1, 2, 3, 4, 5, 6]

arr << 7 ＃[1, 2, 3, 4, 5, 6, 7]
arr      # [0, 1, 2, 3, 4, 5, 6]
```

### b. Hàm unshift():
- Hàm `push()` có tác dụng thêm 1 phần tử vào cuối arry
- Hàm `unshift()` thì ngược lại, có tác dụng thêm 1 phần tử vào đầu array.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr.unshift(6) # [6, 0, 1, 2, 3, 4, 5]
arr            # [6, 0, 1, 2, 3, 4, 5]
```

### c. Hàm insert():
- Hàm `push()` và `unshift()` có tác dụng thêm 1 phần tử vào array tại vị trí xác định.
- Để thêm nhiều phần tự vào mảng tại 1 index cho trước, ta sử dụng hàm `insert()`.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr                            # [0, 1, 2,                  3, 4, 5]
arr.insert(3, "three", "four") # [0, 1, 2, "three", "four", 3, 4, 5]
arr                            # [0, 1, 2, "three", "four", 3, 4, 5]
```

## 4. Xóa phần tử khỏi array:
### a. Hàm pop():
- Hàm `pop()` xóa phần tử cuối ra khỏi array và trả về phần tử đó.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr.pop() # 5
arr       # [0, 1, 2, 3, 4]
```

### b. Hàm shift():
- Hàm `shift()` xóa phần tử đầu tiên ra khỏi array và trả về phần tử đó.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr.shift() # 0
arr         # [1, 2, 3, 4, 5]
```

### c. Hàm delete_at():
- Hàm `delete()` xóa phần từ của aray tại vị trí truyền vào hàm và trả về phần tử đó.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 3, 4, 5]
```
- Khi đó
```
arr.delete_at(1) # 1
arr              # [0, 2, 3, 4, 5]
```

### d. Hàm delete():
- Hàm `delete()` xóa tất các các phần tử  trong array khớp với giá trị được truyền vào hàm.
- Nếu gia trị truyền vào hàm có trong array thì hàm trả về giá trị đó, không thì trả về nil.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 0, 5]
```
- Khi đó
```
arr.delete(1) # 1
arr           # [0, 2, 0, 5]
arr.delete(6) # nil
arr           # [0, 2, 0, 5]
```

### e. Hàm delete_if():
- Hàm `delet_if()` xóa tất cả các phần tử thỏa mãm điều kiện truyền vào trong block.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 0, 5]
```
- Khi đó
```
arr.delete_if {|a| a > 1} # [0, 1, 0]
arr                       # [0, 1, 0]
```

### f. Hàm keep_if(): 
- Hàm `keep_if()` có chức năng ngược lại hàm `delete_if()`, thực hiện xóa tất cả các phần tử không thỏa mãn điều kiện truyền vào trong block.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 2, 0, 5]
```
- Khi đó
```
arr.keep_if {|a| a > 1} # [2, 5]
arr                     # [2, 5]
```

### g. Hàm compact() và compact!():
- Hàm `compact()` và `compact!()` đều thực hiện xóa tất cả các giá trị niltrong array và trả về array không có các phần tử nil.
- Tuy nhiên hàm `compact()` không thay đổi giá trị của array gọi hàm còn hàm `compact!()` thì có.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, nil, 3, nil]
```
- Khi đó
```
arr.compact()  # [0, 1, 3]
arr            # [0, 1, nil, 3, nil]
arr.compact!() # [0, 1, 3]
arr            # [0, 1, 3]
```

 ### h. Hàm `uniq()`:
 - Hàm `uniq()` xóa tất các phần tử bị lặp có trong array.
- Ví dụ ta có array 5 phần tử
```
arr = [0, 1, 1, 3, 4]
```
- Khi đó
```
arr.uniq()  # [0, 1, 3, 4]
arr         # [0, 1, 3, 4]
```