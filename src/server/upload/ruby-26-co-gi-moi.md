###### - `Ruby 2.1` được phát hành vào dịp Giáng sinh năm 2013 và theo truyền thống từ đó với mỗi phiên bản mới sẽ được phát hành vào dịp Giáng sinh tiếp theo.<br>- Như vậy, có thể `Ruby 2.6` sẽ được phát hành vào tháng tới và chúng ta cùng điểm qua những thứ thay đổi trong bản này nhé.<br>
##### **1.Endless ranges** ( Phạm vi vô tận )
```ruby
array = [1, 2, 3]
array[1..] => [2, 3]                           # giống như array[1..-1]
(1..).each {|index| ... }           # vòng lặp vô hạn từ index thứ nhất
array.zip(1..) {|elem, index| ... }   # tương tự array.each.with_index(1) { }
```
##### **2.Array#difference và Array#union**
- Cách đơn giản để phân biệt và kết hợp nhiều mảng 
```ruby
[1, 1, 7, 6, 6, 2, 2, 4, 5].difference([1, 2, 7, 4]) #=> [6, 6, 5]
["a", "b", "c"].union(["c", "d", "a"])          #=> [ "a", "b", "c", "d" ]
["a"].union([["e", "b"], ["a", "c", "b"]])      #=> [ "a", "e", "b", "c" ]
```
##### **3.Array#filter là một alias mới của Array#select**
- Giống như các ngôn ngữ được sử dụng phổ biến khác như Javascript, PHP, Java. Bộ lọc cũng được đặt bí danh, và điều này bây giờ có thể sử dụng với cú pháp:<br>
```ruby
[:male, :female].filter { |x| x == :male } # => [:male]
```
##### **4.Enumerable#to_h**
- Có nhiều cách để tạo một hash từ một mảng trong Ruby, một số trong số đó là<br>
```ruby
[1, 2, 3].map { |x| [x, x ** 2] }.to_h 
#=> {1=>1, 2=>4, 3=>9}
[1, 2, 3].each_with_object({}) { |x, h| h[x] = x ** 2 }
#=> {1=>1, 2=>4, 3=>9}
```
Thế nhưng, bắt đầu từ bản 2.6, bây giờ có thể sử dụng một block để loại bỏ mảng trung gian:
```ruby
[1, 2, 3].to_h { |x| [x, x ** 2] } #=> {1=>1, 2=>4, 3=>9}
```
##### **5.Hash#merge, merge!**
- Ở phiên bản hiện tại việc merge hash lại với nhau có thể dùng theo một số cách, ví dụ:
```ruby
hash1 = {a: 1, b: 2}
hash2 = {c: 3, d: 4}
hash3 = {e: 5, f: 6}
hash1.merge(hash2).merge(hash3) #=> {:a=>1, :b=>2, :c=>3, :d=>4, :e=>5, :f=>6}

[hash1, hash2, hash3].inject do |result, part|
  result.merge(part) { |key, value1, value2| key + value1 + value2 }
end
#=> {:a=>1, :b=>2, :c=>3, :d=>4, :e=>5, :f=>6}
```
- Nhưng đối với bản 2.6, sử dụng merge hay merge! sẽ chấp nhận nhiều đối số<br>
```ruby
hash1 = {a: 1, b: 2}
hash2 = {c: 3, d: 4}
hash3 = {e: 5, f: 6}
hash1.merge(hash2, hash3) #=> {:a=>1, :b=>2, :c=>3, :d=>4, :e=>5, :f=>6}
```
##### **6.Phương thức #then**
- Quay trở lại với version Ruby 2.5, phương thức yielf_self đã được giới thiệu, nó có thể truyền một khối tới bất kỳ instance nào và nhận instance bên trong khối làm đối số.<br>
```ruby
"Wait".yield_self { |str| str + " Ruby 2.6" } #=> "Wait Ruby 2.6"
```
- Chúng ta xét tiếp ví dụ sau:<br>
- Bình thường ta viết ở controller như sau:
```ruby
posts = Post.limit(params[:limit]) if params[:limit]
posts = Post.where(status: params[:status]) if params[:status]
posts
```
- Khi sử dụng `yield_self`:
```ruby
Post.yield_self { |posts| params[:limit]  ? posts.limit(params[:limit]) : posts }
  .yield_self { |posts| params[:status] ? posts.where(status: params[:status]) : posts }
# hoặc
Post.yield_self { |_| params[:limit] ? _.limit(params[:limit]) : _ }
  .yield_self { |_| params[:status] ? _.where(status: params[:status]) : _ }
# hay
def with_limit(posts)
  params[:limit] ? posts.limit(params[:limit]) : posts
end
def with_status(posts)
  params[:status] ? posts.where(status: params[:status]) : posts
end
Post.yield_self(&method(:with_limit)).yield_self(&method(:with_status))
```
- Đối với `#then`, thức chất là `#then` là alias của `#yield_self`:
```ruby
Post.then { |posts| params[:limit] ? posts.limit(params[:limit]) : posts }
  .then { |posts| params[:status] ? posts.where(status: status) : posts }
# hay
Post.then(&method(:with_limit)).then(&method(:with_status))
```
##### **7.Random.bytes**
- Hiện tại việc tạo random byte phải thông qua việc khởi tạo đối tượng như sau:
```ruby
Random.new.bytes(10) # => "\xD7:R\xAB?\x83\xCE\xFAkO"
```
- Còn đối với với bản 2.6:
```ruby
Random.bytes(8) # => "\xAA\xC4\x97u\xA6\x16\xB7\xC0\xCC"
```
##### **Tổng kết**
- Trên đây là một số những thứ thay đổi trong phiên bản ruby 2.6 sắp tới, cảm ơn mọi người đã theo dõi.
##### **Tài liệu tham khảo**
- [Medium.com](https://medium.com/tailor-tech/whats-new-in-ruby-2-6-a4774f3631c1)