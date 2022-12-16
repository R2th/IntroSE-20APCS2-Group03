Vào ngày 25 tháng 12 sắp tới, phiên bản **Ruby 2.7** sẽ chính thức được phát hành. Đây cũng chính là phiên bản cuối cùng trước khi chúng ta sẽ đến với **Ruby 3.0**. Trong quá trình làm việc, Ruby thực sự đã khiến cho các lập trình viên cảm thấy thoải mái, điều mà nó luôn hướng tới. Vậy hãy cùng xem trong phiên bản mới này, Ruby sẽ mang đến cho chúng ta thêm những gì nữa.
## Pattern Matching
Đây là một tính năng mà theo mình sẽ là đáng để chờ đợi nhất trong phiên bản Ruby 2.7 này. Nó làm mình liên tưởng tới tính năng [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) trong ES6, nhưng Ruby còn làm được nhiều hơn thế. Về cơ bản `Pattern Matching` kết hợp giữa `destructuring` và `specifying patterns`. Chúng ta sẽ cùng xem các ví dụ dưới đây để hiểu rõ hơn:
```ruby
case 0
in 0
  :match
end
#=> :match

case 0
in 3..6
  :no_match
end
#=> NoMatchingPatternError (0)
```
Chúng ta cũng có thể sử dụng partern matching với những kiểu dữ liệu phức tạp hơn:
```ruby
case "A String"
in String
  :match
end

case [0, 1]
in [_, a]
  a 
end
#=> 1

case [0, 1, 2]
in [0, *tail]
 tail  
end
#=> [1, 2]

case {a: 0, b: 1, c: 2}
in {a: 0, b: b, c: 2}
  b
end
#=> 1
```

## Numbered Parameters
Trong các block mặc định của Ruby, các tham số có thể được yield vào. Chắc hẳn chúng ta đã quá quen thuộc với những đoạn code như dưới đây:
```ruby
(1..3).each{|x| puts x}
[1, 3, 2, 5].sort{|a, b| b <=> a}
```
Tuy nhiên ở phiên bản mới này các tham số sẽ được đánh số thứ tự, và ta có thể viết lại như sau:
```ruby
(1..3).each{puts _1}
[1, 3, 2, 5].sort{_2 <=> _1}
```
Đây là một tính năng thử nghiệm, tuy ngắn gọn hơn nhưng nó cũng phải trả một cái giá đó là đoạn code sẽ phần nào mất đi sự rõ ràng.
## Enumerable#tally
Đây là một method mới có nhiệm vụ là đếm số lần suất hiện của một phần tử trong `array` và trả về một `hash` với những giá trị tương ứng
```ruby
[1, 2, 1, "one", "two", "one"].tally
```
Và đây sẽ là kết quả trả về
```ruby
{"1"=>2, "2"=>1, "one"=>2, "two"=>1}.tally
```
## Enumerable#filter_map
Đúng như tên gọi của nó, đây là sự kết hợp của 2 method mà chúng ta đã rất quen thuộc ở các phiên bản trước là `select` và `map`
Ví dụ, khi muốn lấy ra những số chẵn rồi sau đó chuyển chúng về dạng string thì chúng ta có thể làm như sau:
```ruby
[1, 2, 3, 6].select{|number| number.even?}.map{|number| number.to_s}
```
Nhưng nếu bạn muốn ngắn gọn hơn nữa thì có thể sử dụng:
```ruby
[1, 2, 3, 6].filter_map{|number| number.to_s if number.even?}
```
## Array#intersection
Thực ra có thể xem đây là alias của toán tử `&` mà chúng ta đã từng biết trước đó:
```ruby
[1, 2, 2] & [3, 2, 1] #=> [1, 2]
["a", "b", "c"] & ["b", "c", "d"]   #=> ["b", "c"]
```
Với `intersection` chúng sẽ được viết lại như sau:
```ruby
[1, 2, 2].intersection [3, 2, 1] #=> [1, 2]
["a", "b", "c"].intersection ["b", "c", "d"]   #=> ["b", "c"]
```
Chúng ta sẽ thu về cùng một kết quả tuy nhiên việc sử dụng `intersection` trông sẽ rõ ràng và hướng đối tượng hơn
## Enumerator.produce
Đây là một tính năng mới khá thú vị và hữu ích. Cơ chế làm việc của nó là sẽ tạo ra một tập hợp vô hạn bằng việc xác định phần tử tiếp theo dựa vào một phần tử trước đó:
```ruby
produce = Enumerator.produce(1, {|previous_number| previous_number * 2})
produce.take(2).last #=> 4
produce.take(4).last #=> 16
```
Trên đây là một ví dụ trong việc sử dụng `produce` trong việc tính lỹ thừa của 2
## Beginless Ranges
Một sự thay đổi khác nữa và cũng là một cách để tạo ra một nửa khoảng tập hợp vô hạn đó là việc không sử dụng giá trị cho các đầu mút của một `Range`. Đây là một tính năng thử nghiệm và chủ yếu dùng để so sánh hay kiểm tra một phần tử có nằm trong tập hợp nào đó hay không:
```ruby
case date
when ..Date.today
  :past
when Date.today..
  :feture
else
  :now
end
```
## Một vài thay đổi khác
- `Symbol#start_with?` / `Symbol#end_with?`: đây là những method đã được sử dụng cho các chuỗi `String`, với phiên bản mới này chúng ta đã có thể sử dụng nó cho các `Symbol`
- Khi một method định nghĩa một dối số là `**nil` thì sẽ được hiểu là method này không nhận một keyword nào cả
- Module GC sẽ được cải tiến để làm việc hiệu quả hơn trong việc cải thiện phân mảnh bộ nhớ
- Cải tiến về thread giúp cho việc chạy đa luồng nhanh hơn

## Summary
Vừa rồi mình đã gửi đến các bạn một số tính năng mới cũng như các thay đổi trong phiên bản Ruby 2.7 sẽ được phát hành trong thời gian sắp tới. Đây cũng là thời điểm tốt nhất để chúng ta cùng nhìn lại những điều mà Ruby đã mang đến và chuẩn bị cho một sự thay đổi lớn hơn ở phiên bản Ruby 3.0

***(Bài viết có tham khảo các nguồn trên Internet)***

Blog: https://www.dnlblog.com/posts/ruby-2-7-va-nhung-tinh-nang-moi