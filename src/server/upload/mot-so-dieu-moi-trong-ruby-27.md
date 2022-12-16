## Pattern Matching
Dùng để xác định dữ liệu trong một pattern khi ta đã có một số thông tin hoặc cấu trúc của pattern đó
<br/>
Cú pháp : 
```
case expr
in pattern
...
in pattern
...
else
...
end
```
Các pattern sẽ chạy từ trên xuống dưới cho đến patten đầu tiên match với expr, nếu không nó sẽ chạy vào khối lệnh else.
### Ví dụ :
Detect values khi đã biết cấu trúc của tập hợp ban đầu
```
case [0, [1, 2, 3]]
in [a, [b, *c]]
  p a #=> 0
  p b #=> 1
  p c #=> [2, 3]
end
```
Khi đã có một số values:
```
case [0, [1, 2, 3]]
in [0, [a, 2, b]]
  p a #=> 1
  p b #=> 3
end
```
Pattern Matching cũng có thể sử dụng với Hash, variable..., Pattern Matching đặc biệt rất hữu ích với các tập hợp có cấu trúc phức tạp.
Để rõ hơn về Pattern Matching các bạn có thể tìm hiểu [ở đây](https://speakerdeck.com/k_tsj/pattern-matching-new-feature-in-ruby-2-dot-7)
## Beginless Ranges
Ở Ruby 2.6 chúng ta đã được biết đến endless range và 2.7 chúng ta sẽ được biết đến beginless range.
Với Range thông thường ta cần xác định điểm đầu và cuối của range còn với beginless range chúng ta sẽ không cần xác định điểm bắt đầu của range.
### Ví dụ :
```
a = (..3) # a gồm các số nguyên nhỏ hơn hoặc bằng 3.
# Kiểm tra
a === -1000 # => true
a === 2 # => true
a === 4 # => false
```
## Flip flop operator
Flip flop operator được hiểu là phạm vi được sử dụng giữa 2 câu điều kiện.
### Ví dụ :
```
(1..10).each { |i| puts i if (i == 5) .. (i == 8) }
5
6
7
8
=> 1..10
```
## Enumerable#filter_map
Trước Ruby 2.7 select và map thường được sử dụng để lọc và biến đổi giá trị. Nhưng trong ruby 2.7 ta có thể làm điều này chỉ với filter_map
### Ví dụ :
```
[1, 2, 3].filter_map {|x| x.odd? ? x.to_s : nil } #=> ["1", "3"]
```

## Enumerable#tally
Với tally ta có thể xác định tần suất xuất hiện của các phần tử trong một Enumerable
## Kết Luận
Trên đây là một số điểm mới trong ruby 2.7 mà mình mới tìm hiểu được. Các bạn có thể tham khảo thêm [tại đây](https://medium.com/rubyinside/whats-new-in-ruby-2-7-79c98b265502#:~:text=x%20Ruby%20version%20and%20also,numbered%20arguments%20and%20bug%20fixes.)
### Tài Liệu Tham Khảo
https://medium.com/rubyinside/whats-new-in-ruby-2-7-79c98b265502#:~:text=x%20Ruby%20version%20and%20also,numbered%20arguments%20and%20bug%20fixes.