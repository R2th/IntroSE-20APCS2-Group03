# Một số tips trong ruby
1. Gán các phần tử còn lại của mảng
2. Thay đổi giá trị mặc định trong hash
3. Đưa ra exception trong hash
4. Toán tử & khi so sánh mảng
5. Gán nhiều giá trị cho nhiều biến trên cùng một dòng
6. Sử dụng | để lấy tất cả giá trị từ hai mảng
7. Sử dụng - để trả về phần tử không tồn tại trong mảng
8. Hoán đổi các giá trị
9.  Sử dụng !! khi tìm kiếm trong RegEx
10.  Kết

## 1. Gán các phần tử còn lại của mảng
- Trong cấu trúc của mảng chúng ta có thể sử dụng * để gán các phần tử còn lại của mảng thay vì nhập từng giá trị

Ví dụ:
```
array = ["a", "b", "c"]
val, *otherval = *array

val #kết quả: "a"
otherval #kết quả: ["b", "c"]
array #kết quả: ["a", "b", "c"]
```

## 2. Thay đổi giá trị mặc định trong hash
- Chúng ta có thể sử dụng default và default_proc để thay đổi giá trị mặc định trong hash

Ví dụ 1:
```
hash1={}
hash1[:val]
#kết quả: nil
h.default = "default val"
h[:val]
#kết quả: "default val"
```

Ví dụ 2:
```
hash2 = Hash.new do |hash2, name|
  hash2[name] = Hash.new(&hash2.default_proc)
end

hash2[:name1][:name2][:name3] = 'big hash'
hash2
#kết quả: { name1: { name1: { name1: 'big hash' } } }
```

## 3. Đưa ra exception trong hash
- Đưa ra một exception khi khóa trong hash không tồn tại

Ví dụ:

```
hash = Hash.new { |h, k| raise ArgumentError.new("the key not found: #{ k }") }
hash[:ao] = 1
hash[:ao] 
#kết quả: 1
hash[:new_key] 
#kết quả: raises ArgumentError: No hash key: x
```


## 4. Sử dụng & để tạo procs
- Ví dụ nếu chúng ta có một mảng muốn convert sang số hay chuỗi hoặc viết hoa... chúng ta có thể sử dụng & để rút gọn

Ví dụ:
```
array1 = [1, 2, 3]
result = array1.map {|val| val.to_f}
result.map(&:to_f)
#kết quả: [1.0, 2.0, 3.0]

array2 = ["HELLO", "GUYS"]
result = array1.map {|val| val.downcase}
result.map(&:downcase)
#kết quả: ["hello", "guys"]
```
## 5. Gán nhiều giá trị cho nhiều biến trên cùng một dòng
- Chúng ta có thể gán các giá trị cho các biến trên cùng một dòng

Ví dụ :  Gán các biến với các giá trị tương ứng

```
val1, val2 = ["a", "b"]
#kết quả: ["b", "b"]
val1
#kết quả: "a"
val2
#kết quả: "b"
```

## 6. Sử dụng | để lấy tất cả giá trị từ hai mảng
- Chúng ta có thể sử dụng toán tử | để lấy tất cả giá trị từ hai mảng mà không bị trùng lặp

Ví dụ:
```
array1 = ["a", "b", "c"]
array2 = ["d", "e", "f"] 
array1 | array2
#kết quả: ["a", "b", "c", "d", "e", "f"]
```

## 7. Sử dụng - để trả về phần tử không tồn tại trong mảng
- Chúng ta có thể sử dụng toán tử - để trả về phẩn tử đầu tiên trong mảng thử nhất không tồn tại trong mảng thứ hai

Ví dụ:
```
array1 = ["a", "b", "c"]
array2 = ["b", "c"] 
array1 - array2
#kết quả: ["a"]
```

## 8. Hoán đổi các giá trị
- Giống như cách gán nhiều giá trị cùng lúc, chúng ta có thể hoán đổi nhiều giá trị với nhau

Ví dụ:
```
a, b, c = [10, 11, 12] 
a, b, c = b, c, a
#kết quả: [10, 11, 12] 
#kết quả: [11, 12, 10]
```

## 9. Sử dụng !! khi tìm kiếm trong RegEx
- Chúng ta có thể dùng !! để trả về true hoặc false khi tìm kiếm trong RegEx

Ví dụ:
```
a = "hello"
b = "world"
regex = /hello/

!!(a =~ regex) 
#kết quả: true
!!(b=! regex)
#kết quả: false
```

## 10. Kết
Đây là một số tips trong ruby, các bạn có thể tự tìm hiểu thêm các tips  khác.