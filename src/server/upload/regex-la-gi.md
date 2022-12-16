Regexes, Một cơ chế để matching chuỗi. Khi nghe đến regex chắc hẳn bạn đã nghe nó khác là quen thuộc nhưng thường mới đầu thì chúng ta chưa thực sự quan tâm đến nó cho lắm. Nếu có dùng đến regex chắc chúng ta sẽ lên google search cho nhanh và hoàn thành công việc lúc đó.Nhưng nếu rảnh rỗi chúng ta có thể tìm hiểu lại những gi chúng ta đã dùng trước đó. =)).
### Mục tiêu đạt được?
1. Check if Regex Matches
2. Find Single/First Occurrence
3. Find All Occurrences
4. Replace
5. Split String Into Array
6. Filter Array of Strings
7. Partition String


-----

### 1. Check if Regex Matches
1.1 Match?

 Đây là một cách được ưa thích sử dụng kể từ ruby 2.4 . Nó chỉ trả về true hoặc false, nhưng không lưu trữ bất cứ data nào để có thể đạt được performance:
 ```ruby
 "string".match? /1.3/ # => false
 "123".match? /1.3/ # => true
 ```

1.2 `=~`

Đây là phương thức được đưa vào cú pháp của ruby, Mặc dù trả về giá trị của nó khá là khác biệt. Nó là codepoint index trong chuỗi nơi mà giá trị được match hoặc ngược lại là trả về `nil`. Tuy nhiên. Nó là sự lựa chọn thông minh để sử dụng nó cho giá trị `truthy/falsey`.
```ruby
"string" =~ /1.3/ # => false
"123" =~ /1.3/ # => true
```
Trái ngược với =~ thì trong ruby có một cú pháp khác là:
```ruby
"string" =~ /1.3/ # => true
"123" =~ /1.3/ # => false
```
Và ta có thể sử dụng cú pháp `=~` cho vài ví dụ khác sau:
```ruby
# Numbered: $1-$9
"String with 42 things" =~ /(\d+) things/
$1 # => "42"
```

-----

```ruby
"String with 42 things" =~ /(?<thing_count>\d+) things/
$~[:thing_count] # => "42"
```

1.3 Case Compare

Chúng ta có thể dùng toán tử `===` để compare và cũng trả về giá tri `true` hoặc `false`.Tuy nhiên nó không nên sử dụng trực tiếp(Vì nó phụ thuộc vào thứ tự toán hạng, regex phải đẩu tiên). Và nó cho bạn viết đoạn code rõ ràng hơn:
```ruby
case variable = "string or number"
when /\A\d+\z/
  variable.to_i
when /\A\d+\.\d+\z/
  variable.to_f
else
  variable.to_s
end
```
### 2. Find Single/First Occurrence

2.1 `String#[]`
Khi dùng `[]` nó sẽ trả vể kết quả phù hợp với đoạn regex.
```ruby
"String with 42 things"[/\d\d/] # => "42"
```
Ngoài ra cũng có thể dùng như sau:
```ruby
"String with 42 things"[/\d(\d)/, 1] # => "2"
"String with 42 things"[/(?<first>\d)\d/, :first] # => "4"
```
2.2 `=~ + $&`

Nếu bạn thích cú pháp này hơn `=~` bạn có thể truy xuất chuỗi phù hợp với biến đặc biệt `$&`
```ruby
"String with 42 things" =~ /\d+/
$& # => "42"
```
2.3 `String#rindex`

Nó sẽ bắt đầu quá trình so sánh sự sai khớp ở phía bên phải của chuỗi và trả về index đầu tiên:
```ruby
 "String with 42, sorry with 23 things".rindex /\d+/
 $& # => "3"
```
Lưu ý rằng nó không khớp với `'23'`, nhưng `'3'`. Nếu bạn muốn đối sánh một biểu thức liên quan đến phần cuối của chuỗi, bạn có thể sử dụng một dấu `\ z`:
```ruby
"String with 42, sorry with 23 things" =~ /\d+(?=\D*\z)/
$& # => "23"
```
### 3. Find All Occurrences
3.1  `String#scan`
```ruby
"String with 42, sorry with 23 things".scan /\d+/ # => ["42", "23"]
```
### 4. Replace
Có thể bạn đã quá quen thuộc với `gsub` để thay thế đoạn string thỏa mãn điều kiện của regex.

4.1  `String#gsub`
Không sử dụng block:
```ruby 
"String with 42 things".gsub /\d+/, "23" # => "String with 23 things"
```
Sử dụng block:
```ruby
"String with 42 things".gsub /\d+/ do
  $&.to_i + 1
end # => "String with 43 things"
```

### 5. Một số method sử dùng với regex.
5.1 Split
```ruby
array = "String with     42\nthings".split(/\s+/)
# => ["String", "with", "42", "things"]
```
5.2 Grep và Grep_v
```ruby
["String", "with", "42", "things"].grep(/\d/) # => ["42"]
```
```ruby
["String", "with", "42", "things"].grep_v(/\d/) # => ["String", "with", "things"]
```
5.3 Partition.
```ruby
parts = "String with 42 things".partition(/\d+/)
parts # => ["String with ", "42", " things"]
```
### 6 References
https://bom.to/Mwc0w