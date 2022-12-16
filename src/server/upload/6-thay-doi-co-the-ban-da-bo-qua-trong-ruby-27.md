Có thể bạn đã biết hoặc chưa biết, ngày 30-5-2019 vừa rồi ruby dev trên toàn thế giới đón nhận phiên bản mới nhất của ruby vào thời điểm hiện tại (Ruby 2.7.0).
\
Ngoài những thay đổi rất thú vị như [pattern matching](https://dev.to/baweaver/ruby-2-7-pattern-matching-first-impressions-13j9?source=post_page---------------------------) hay là [pipeline operator](https://dev.to/baweaver/ruby-2-7-the-pipeline-operator-1b2d?source=post_page---------------------------) thì có 6 thứ mà mình thấy khá là "hay ho" mà mình sẽ nói đến trong chủ đề lần này
### 1. Điều hướng đến các dòng được thực hiện trước đó trong IRB
Đầu tiên, nếu bạn thích thử code của mình trong IRB, có lẽ bạn đã từng phải làm rất nhiều lần việc nhấn phím mũi tên lên (↑) chỉ để tìm ra một dòng nào đó bạn vừa thực hiện trong định nghĩa method và tận dụng hoặc sửa nó.
\
\
Ruby 2.7 giới thiệu một sự thay đổi gọn gàng về cách thức hoạt động. Bây giờ nó sẽ tải toàn bộ định nghĩa phương thức và thậm chí cho phép bạn chỉnh sửa nó như thể bạn đang ở trên một trình soạn thảo văn bản.
\
\
![](https://images.viblo.asia/f69a2895-6e5f-440c-be2e-27591c92f927.gif)
\
Có thể có nhiều cách sử dụng hơn cho cái tip này và thậm chí những thay đổi trong IRB chưa được thực thi cũng có thể sử dụng được tip này.
### 2. Giới thiệu về Module#const_source_location
Sử dụng  Method#source_location giúp việc tìm vị trí của bất kỳ method nào khá dễ dàng. Tuy nhiên, như vậy không có nghĩa là nó sẽ tương tự với const. Điều này có nghĩa là trừ khi hằng số bạn cần tìm được xác định trong codebase, nếu không việc tìm vị trí nguồn của nó là không hề dễ dàng.
\
\
Điều trên chính là lý do tại sao Ruby 2.7 cho ra mắt Module#const_source_location, điều này sẽ giúp việc tìm vị trí của hằng số dễ dàng như việc tìm kiếm một method như bên trên.
\
Để rõ hơn thì chúng ta cùng xem ví dụ sau:
```ruby
class MyClass
  MY_CONSTANT = :value
end
```
\
Bất cứ khi nào ta muốn tìm nơi MY_CONSTANT được định nghĩa lần cuối, tại ruby 2.7.0 chúng ta có thể làm như sau:
\
```ruby
> Module.const_source_location(:MyClass)
=> ["my_class.rb", 1]
> MyClass.const_source_location(:MY_CONSTANT)
=> ["my_class.rb", 2]
```
\
Method này cũng hiểu được hằng số dưới dạng string nếu bạn thích nó theo cách đó.
```ruby
> Module.const_source_location("MyClass")
=> ["my_class.rb", 1]
```

### 3. Ra mắt FrozenError#receiver
Khi lỗi FrozenError được raise lên, thường rất khó xác định từ bối cảnh nào, đối tượng bị đóng băng nào bị lỗi mà một sự thay đổi trước đó gây ra.
\
Ruby 2.7 giới thiệu FrozenError#receiver nó sẽ trả về đối tượng bị đóng băng đã sửa đổi, tương tự như NameError#receiver. Điều này có thể giúp xác định chính xác các ```frozen object``` là gì.
\
Trong code Ruby của bạn, ```frozen object``` có thể được set khi raising FrozenError bằng cách truyền nó làm đối số thứ hai cho FrozenError.new. ví dụ:
```ruby
> FrozenError.new("error message", "frozen string".freeze).receiver
=> "frozen string"
> _.frozen?
=> true
```

### 4. Kết hợp non-symbol và symbol keys được sử dụng lại
Trước Ruby 2.6, nếu chúng ta có một phương thức nhận được các đối số từ khóa bằng cách sử dụng toán tử splat kép như thế này:
```ruby
def method_with_keyword_args(opt=nil, **keyword_args)
  keyword_args
end
```
\
Chúng ta có thể gọi nó bằng cách sử dụng Hash làm tham số ngay cả khi một số khóa của nó không phải là symbol và nó sẽ coi chúng là đối số tùy chọn đầu tiên.
```scala
> method_with_keyword_args(a: 1, "b" => 2, "c" => 3)
=> {:a=>1}
```
\
Năm 2018, Matz bắt đầu một cuộc thảo luận trên Twitter để ủng hộ việc loại bỏ hỗ trợ cho các non-symbol keys, kết thúc bằng một tính năng thử nghiệm được giới thiệu trong Ruby 2.6.0.
\
Điều đó có nghĩa là việc gọi method theo cách tương tự đã được trình bày bên trên sẽ đưa ra một ArgumentError.
```rust
> method_with_keyword_args(a: 1, "b" => 2, "c" => 3)
ArgumentError (non-symbol key in keyword arguments: "b")
```
\
May mắn thay, có vẻ như các dev phát triển Ruby sau đó đã quyết định hoàn trả chức năng cũ. Vì vậy, trong 2.7 (thực tế là sớm nhất là 2.6.2), chức năng đã được trả lại nguyển bản và bây giờ giống như trong các phiên bản Ruby trước 2.6.0.
### 5. Sử dụng Proc và lambda mà không cần block
Hãy bắt đầu với Proc. Khi Proc.new hoặc Proc được gọi mà không có block bên trong một method và method đó được gọi với một block, một cảnh báo sẽ được in ra.
\
Để minh họa cho điều đó, chúng ta hãy cùng xem ví dụ sau:
```ruby
def proc_without_block
  proc
end
```
\
Trong Ruby 2.6, gọi method bằng một khối block sẽ chỉ send ```call``` đến khối block đó nhưng được truyền dưới dạng tham số (theo mình hiểu thì chính là gọi ```call``` tới nội dung của block mà thôi):
\
```html
> proc_without_block { "in here!" }.call
=> "in here!"
```
\
Điều đó đã thay đổi trong ruby 2.7. Mặc dù method vẫn sẽ hoạt động giống nhau, nhưng một cảnh báo không dùng nữa sẽ được in ra.
\
```javascript
> proc_without_block { "in here!" }.call
warning: Capturing the given block using Proc.new is deprecated; use `&block` instead
=> "in here!"
```
\
Bây giờ hãy để nói về lambda. Trong Ruby 2.7, khi lambda được gọi mà không có khối block bên trong một method và method đó được gọi tới một khối block, một lỗi sẽ được đưa ra. Để minh họa điều đó, hãy để nói rằng chúng ta có ví dụ sau:
\
```ruby
def lambda_without_block
  lambda
end
```
\
Như đã đề cập bên trên, trong Ruby 2.7, điều này sẽ không còn hoạt động nữa và một ArgumentError sẽ được raise lên.
```markdown
> lambda_without_block { :in_here }
ArgumentError (tried to create Proc object without a block)
```
\
Gọi method như vậy với một khối block trong Ruby 2.6 sẽ trả về Proc và in ra cảnh báo không dùng nữa:
```markdown
> lambda_without_block { :in_here }
warning: tried to create Proc object without a block
=> #<Proc:0x00007fa527865d70 (lambda)>
```
### 6. Không khuyến khích sử dụng $; và $, các biến đặc biệt
Như Matz đã đề cập nhiều lần. Một trong những điều mà Ruby sao chép từ Perl là định nghĩa của một vài biến đặc biệt. Các biến global sẽ được định nghĩa với ký tự ```$``` ở đầu tiên.
\
Giống như ở trong perl, các biến đặc biệt sẽ có một ý nghĩa đặc biệt trong rails. Cả `$;` và `$,` đều được sử dụng cho định dạng đầu vào và đầu ra. Chi tiết:
- `$;` : Dấu phân cách mặc định cho `String#split`
- `$,` : Item được sinh ra giữa các tham số của `print` và `Array#join`

\
Ruby 2.7 không khuyến khích sử dụng những biến `global` đó bằng một cảnh báo không dùng nữa. Chúng được in ra khi đặt chúng thành giá trị không phải là số 0 và sử dụng chúng với `String#split` và `Array#join` tương ứng.
\
```html
> $; = " "
warning: non-nil $; will be deprecate
=> " "
> "hello world!".split
warning: $; is set to non-nil value
=> ["hello", "world!"]
> $, = " "
warning: non-nil $, will be deprecated
=> " "
> ["hello", "world!"].join
warning: non-nil $, will be deprecated
=> "hello world!"
```
\
Thực hiện tương tự trong Ruby 2.6 sẽ không kích hoạt bất kỳ cảnh báo nào khi đặt chúng thành giá trị không phải là 0:
\
```html
> $; = " "
=> " "
> "hello world!".split
=> ["hello", "world!"]
> $, = " "
=> " "
> ["hello", "world!"].join
=> "hello world!"
```

### Các thay đổi khác thì sao?
Trên đây là bài tìm hiểu và dịch của mình về các thay đổi khá 'thú vị' mới này.
\
Còn rất nhiều các thay đổi khác mà cách tốt nhất là các bạn có thể trực tiếp xem sự thay đổi trong [new files](https://github.com/ruby/ruby/blob/master/NEWS?source=post_page---------------------------). Việc xem các thay đổi sẽ cho bạn nắm rõ hơn các tính năng mới trong Ruby 2.7
\
Bài viết được tham khảo và dịch từ nguồn [6 changes you might have missed coming in Ruby 2.7](https://sourcediving.com/less-known-changes-in-ruby-2-7-8d5db660370f)
\
Bài còn nhiều hạn chế mong các bạn đóng góp thêm để mọi người cùng nhau hiểu nhanh hơn các tính năng mới trong ruby 2.7.
\
Cảm ơn mọi người đã theo dõi bài viết!