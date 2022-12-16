# 1. Duyệt và tách mảng
## 1.1 Destructing
Dưới đây là phương pháp tách mảng và gán nó với biến theo thứ tự phần tử trong mảng

```
first, second = [42, 43]

p first   # 42
p second  # 43
```

Còn đối với mảng đa chiểu thì sao? Mảng đa chiều là một mảng chứa các phần tử là cũng là một mảng

```
first, second = [[4, 8], [3, 16], [23, 42, 15]]

p first   # [4, 8]
p second  # [3, 16]
```

Lưu ý rằng vì số lượng biến chỉ định để gán sẽ là 2 nên phần tử thứ 3 sẽ không được gán cho bất kỳ biến nào cả

Khi sử dụng trong block

```
[[1, 2, 3, 4], [42, 43]].each { |a, b| puts "#{a} #{b}" }
 
# 1 2
# 42 43
```

Trong trường hợp destructing một mảng gồm 2 phần tử cho 3 biến, biến thứ 3 sẽ chứa giá trị nil vì mảng không có phần tử thứ 3

```
first, second, third = [42, 43]

puts first  # 42
puts second # 43
puts third  # nil
```

## 1.2 Splat operator
Khác với destructing tách mảng ra và gán với số lượng biến hiễn hữu tương ứng ở bên trái, đối với splat operator (* ) , mảng sẽ được tách ra theo số lượng biến và phần cuối cùng của mảng sẽ được gán vào biến bên phải

```
*initial, last = [42, 43, 44]

p initial # [42, 43]
p last    # 44
```

Khi splat operator là biến bên phải

```
initial, *last = [42, 43, 44]

p initial # 42
p last    # [43, 44]
```

Sử dụng splat operator để chia đều mảng cho 3 biến

```
*initial, second_last, last = [42, 43, 44]

p initial     # [42]
p second_last # 43
p last        # 44
```

Vì tính tiện lợi của nó nên splat operator thường được sử dụng để làm tham số của một hàm mà ta không xác định được số lượng tham số cố định của hàm đó

```
def greeting(message, *persons)
  persons.each { |person| puts "#{message} #{person}!" }
end

greeting("Hi", "Nam", "Quan", "Vu")

# Hi Nam!
# Hi Quan!
# Hi Vu!
```

# 2. Các hàm thống kê trên mảng
## 2.1 count, size và length

count, size và length đều có tác dụng là trả về số phần tử trong mảng, tuy nhiên 3 phương thức này cũng có một số điểm chung nhất định

```
puts [4, 8, 15, 16, 23, 42].count  # 6
puts [4, 8, 15, 16, 23, 42].size   # 6
puts [4, 8, 15, 16, 23, 42].length # 6 
```
 hàm `count` có thể nhận một tham số và trả về số lượng phần tử đó trong mảng
 
 ```
puts [4, 23, 15, 16, 23, 42].count(23)  # 2
```
  Hoặc `count` cũng có thể nhận một tham số là block và trả về số lượng phần tử thỏa mãn biểu thức điều kiện trong block đó
  
  ```
   [4, 8, 15, 16, 23, 42].count { |e| e.even? } # 4
  ```
  
  ## 2.2 flatten và compact
  
 phương thức  `flatten` trả về một mảng là phiên bản một chiều của mảng gốc, nó sẽ duyệt đệ quy mảng gốc để lấy tất cả các phần tử của mảng gốc và đưa nó vào một mảng một chiều

```
p [4, 8, 15, 16, 23, 42].flatten         # [4, 8, 15, 16, 23, 42]
p [4, [8], [15], [16, [23, 42]]].flatten # [4, 8, 15, 16, 23, 42]
```

ngoài ra `flatten` có thể nhận một tham số là số level tối đa mà flatten có thể truy cập để lấy ra trong mỗi phần tử của mảng gốc

```
p [4, [8], [15], [16, [23, 42]]].flatten(1) # [4, 8, 15, 16, [23, 42]]
```

Phương thức compact hoạt động rất đơn giản, nó sẽ loại bỏ tất cả các giá trị *nil* có trong mảng

```
p [nil, 4, nil, 8, 15, 16, nil, 23, 42, nil].compact # [4, 8, 15, 16, 23, 42]
```

## 2.3 zip, slice và join
Phương thức `zip` sẽ lấy mỗi phần tử ở mảng gốc và mảng tham số và merge chúng lại với nhau, kết quả trả về là một mảng mới với mỗi phần tử là một mảng chứa 2 phần tử ở vị trí tương ứng cảu mảng gốc và mảng tham số

```
p [4, 8, 15, 16, 23, 42].zip([42, 23, 16, 15, 8]) # [[4, 42], [8, 23], [15, 16], [16, 15], [23, 8], [42, nil]]
```

trường hợp mảng gốc cà mảng tham số có độ dài không bằng nhau, giá trị *nil* sẽ được dùng để thay thế cho phần tử bị thiếu của mảng ngắn hơn.

Phương thức `slice` có cách thức hoạt động giống với việc sử dụng toán tử `[]` để lấy một mảng con tử một mảng gốc, nó nhận tham số là một index để lấy phần tử ở vị trí tương ứng hoặc một range để trả về một mảng là các phần tử trong khoảng range đó

```
p [4, 8, 15, 16, 23, 42].slice(2)    # 15
p [4, 8, 15, 16, 23, 42].slice(2..5) # [15, 16, 23, 42]
```

Phương thức `join` sẽ gộp tất cả các phần tử trong mảng thành một chuỗi được phân tách bởi ký tự là tham số của phương thức join

```
p  [4, 8, 15, 16, 23, 42].join(", ") # "4, 8, 15, 16, 23, 42"
p  [4, 8, 15, 16, 23, 42].join("* ") # "4* 8* 15* 16* 23* 42"
```

Trái ngược với phương thức join là phương thức `split`, nó sẽ phân tách một chuỗi thành một mảng.

```
p  "4, 8, 15, 16, 23, 42".split(", ") # ["4", "8", "15", "16", "23", "42"]
```

## 2.4 shift và unshift

Với phương thức `shift`, ta có thể xóa phần tử đầu tiên tính từ trái sang phải của mảng và trả về phần tử đó, ngoài ra ta có thể truyền vào tham số `shift(n)` sẽ xóa n phần tử từ trái sang phải của mảng gỗ và trả về số phần tử đã bị xóa đó dưới dang mảng

```
p [4, 8, 15, 16, 23, 42].shift    # 4
p [4, 8, 15, 16, 23, 42].shift(3) # [4, 8, 15]
```
 Trong khi đó hàm `unshift` thì ngược lại, nó sẽ nhận các tham số và thêm nó vào vị trí bắt đầu của mảng
 
 ```
 p [8, 15, 16, 23, 42].unshift(4) # [4, 8, 15, 16, 23, 42]
 p [16, 23, 42].unshift(4, 8, 15) # [4, 8, 15, 16, 23, 42]
 ```
 
 # 3. Lời kết
 
 Trên đây là một số phương thức để thao tác với mảng , cám ơn các bạn đã theo dõi :D