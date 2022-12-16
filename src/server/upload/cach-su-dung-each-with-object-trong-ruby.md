Bạn đã bao giờ tạo một hash rỗng để sử dụng với each chưa? Bạn có thể đã tự nghĩ "phải có một cách dễ dàng hơn để làm điều này." Câu trả lời là Có !
Chúng ta có một array như sau
```
array = ["alpha", "beta", "omega"]
```
Bạn muốn chuyển array này thành 1 hash với key là các phần tử của mảng và value là phần tử đó được in hoa.
Thông thường bạn sẽ dùng như sau: 
```
array = ["alpha", "beta", "omega"]
hash = {}
array.each do |element|
   hash[element] = element.upcase
end
return hash
#=> { "alpha"=>"ALPHA", "beta"=>"BETA", "omega"=>"OMEGA" }
```
Cách làm trên thực sự lòng vòng khi phải tạo thêm 1 hash rồi chạy vòng lặp với array. Cuối cùng mới return hash ta cần.

### Enter .each_with_object
Để đơn giản nhất, each_with_object chỉ đơn giản là chạy từng hàm sau khi tạo một đối tượng mới, cho phép bạn tạo đối tượng này liên quan đến hash hoặc mảng mà bạn đang thực hiện lặp.
```
array = ["alpha", "beta", "omega"]
array.each_with_object({}) do |element, hash|
   hash[element] = element.upcase
end
#=> { "alpha"=>"ALPHA", "beta"=>"BETA", "omega"=>"OMEGA" }
```
Bằng cách sử dụng each_with_object, bạn có thể đạt được kết quả mong muốn mà lại ít line code hơn.

### Counting with .each_with_object
Tiếp theo nếu bạn cần đếm các phần tử trùng nhau trong 1 array thì nó vẫn có thể giúp bạn
Ta có array như sau
```
array = ["John", "Marcel", "Joe", "John", "AJ", "John"]
```

Trước đó bạn đã làm như thế này ?
```
array = ["John", "Joe", "Marcel", "John", "AJ", "Marcel", "John"]
hash = {}
array.each do |element|
   if hash[element]
      hash[element] += 1
   else
      hash[element] = 1
   end
end
return hash
#=> { "John"=>3, "Joe"=>1, "Marcel"=>2, "AJ"=>1 }
```
Với ví dụ này bạn vẫn phải tạo 1 hash rỗng rồi chạy vòng lặp trên array, trong mỗi lần lặp phải kiểm tra condition. Cuối cùng mới return hash ở cuối.
Nhưng bạn cũng có thể có được kết quả trên với bỏ qua với việc xét condition

```
array = ["John", "Joe", "Marcel", "John", "AJ", "Marcel", "John"]
hash = {}
array.uniq.each do |element|
   hash[element] = 1
end
# hash = { "John"=>0, "Joe"=>0, "Marcel"=>0, "AJ"=>0 }
array.each do |element|
   hash[element] += 1
end
# adds 1 to the correct key every time the name is encountered
return hash
#=> { "John"=>3, "Joe"=>1, "Marcel"=>2, "AJ"=>1 }
```
Cũng như ví dụ trên, vẫn phải tạo hash và bạn lại có thêm bước để setup key cho mỗi phần tử. Cuối cùng vẫn return hash

Hãy say No với 2 cách trên và sử dụng each_with_object nhé
```
array = ["John", "Joe", "Marcel", "John", "AJ", "Marcel", "John"]
array.each_with_object(Hash.new(0)) do |element, hash|
   hash[element] += 1
end
#=> { "John"=>3, "Joe"=>1, "Marcel"=>2, "AJ"=>1 }
```
Chú ý là argument truyền vào each_with_object là Hash.new(0) dùng để mỗi key tạo ra sẽ có giá trị mặc định là 0. Các element cùng key sẽ được cộng dồn 1.


### Creating an Array Using .each_with_object
Ta lại có array ban đầu như thế này 
```
array = ["tangerine", "peach", "apricot"]
```
Và bạn muốn có một new_array mới như sau:
```
new_array = [
   "tangerine crayon", 
   "tangerine marker", 
   "peach crayon", 
   "peach marker",
   "apricot crayon",
   "apricot marker"
]
```
Nếu không dùng each_with_object tôi cá bạn sẽ code như này :
```
array = ["tangerine", "peach", "apricot"]
new_array = []
array.each do |element|
   new_array << element + "crayon"
   new_array << element + "marker"
end
return new_array
```
Như đã đề cập nhiều lần ở các ví dụ, nó luôn phải tạo array mới và return ở cuối cùng.

Hãy viết nó ngắn lại với each_with_object nhé
```
array = ["tangerine", "peach", "apricot"]
array.each_with_object([]) do |element, new_array|
   new_array << element + "crayon"
   new_array << element + "marker"
end
```

Trên đây là một số cách sử dụng each_with_object. Chúc bạn đọc có những dòng code thú vị nhé <3