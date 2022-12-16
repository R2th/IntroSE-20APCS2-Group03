Tôi có sự quan tâm đặc biệt đến ngôn ngữ lập trình Ruby, do đó là ngôn ngữ lập trình đầu tiên tôi học. Ruby thực tế và súc tích kèm khả năng mở rộng cao. Cú pháp và cấu trúc rất dễ nhìn, và có nhiều base hỗ trợ ngôn ngữ.
Tôi muốn biên soạn một danh sách thú vị về các phương thức hay ho tôi đã tìm thấy trong suốt thời gian tôi phát triển với Ruby.<br>

Ruby được tích hợp rất nhiều các phương thức. Một số phương thức rất là hữu dụng và được sử dụng thường xuyên, trong khi các cái khác ít được sư dụng hoặc không rõ mục đích sử dụng của nó. Dưới đây tôi sẽ liệt kê một số phương thức nằm ở giữa 2 thái cực đó.<br>
<br>
## 1.[Tap](https://apidock.com/ruby/Object/tap)
Định nghĩa của tap theo apidock như sau:
> Yields <code>x</code> to the block, and then returns <code>x</code>. The primary purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain
> 
Để hiểu rõ hơn về method tap chúng ta có thể vào một ví dụ thực tế sau đâu: 

Bạn muốn update giá trị của một đối tượng user, và trả về kết quả của đối tượng đó sau khi update thì ta có đoạn code sau:
```
user = User.first
user.assign_attributes(name: "aaa")
user.save
user
```
Viết kiểu như trên thì tự nhiên cuối method có trả về 1 biến user, thực sự thì không được hay cho lắm trong khi đó ta đã biết rằng method tap có thể returns self. Do đó ta có thể sửa lại như sau:
```
User.first.tap do |user|
    user.assign_attributes(name: "aaa")
    user.save
end
```
## 2.[each_with_index](https://apidock.com/ruby/Enumerable/each_with_index)
Phương thức này chắc chắn phổ biến hơn so với trước đây nhưng đôi khi hay bị quên. Nó giống như phương thức cơ bản each, nhưng nó đem cho bạn một lợi ích là: chỉ mục (index)

Method each_with_index không những cho phép bạn truy cập vào từng phần tử trong mảng, mà còn cung cấp cho chúng ta chỉ mục của phần tử hiện tại. Điều này khá là hữu ích khi bạn muốn bỏ qua phần tử dựa trên chỉ mục.

Ta có một ví dụ nhỏ sau về each_with_index:
```
 pry(main)> [1,2,3,4,5].each_with_index { |val, index| puts "index: #{index} for #{val}" }
index: 0 for 1
index: 1 for 2
index: 2 for 3
index: 3 for 4
index: 4 for 5
=> [1, 2, 3, 4, 5]
```
Mặc dù cách này lặp khá nhiều lần để xử lý tình huống này, nhưng nó phác thảo cách dùng phương thức này.
Tương tự như each_with_index chúng ta có Enumerator#with_index
```
[1,2,3,4,5].with_index { |val, index| puts "index: #{index} for #{val}" }
NoMethodError: undefined method `with_index' for [1, 2, 3, 4, 5]:Array
```
Như ví dụ bên trên ta thấy with_index không phải là 1 method của array, để method này họat động được trước tiên ta phải convert array sang dạng Enumerator. Và để làm được điều đó có các phương thức hỗ trợ như .to_enum, each, .map
```
[1,2,3,4,5].each.with_index { |val, index| puts "index: #{index} for #{val}" }
index: 0 for 1
index: 1 for 2
index: 2 for 3
index: 3 for 4
index: 4 for 5
=> [1, 2, 3, 4, 5]
```
Có một chú ý nhỏ rằng each_with_index tương đương với with_index(0), bởi vì chúng đều có chỉ mục index bắt đầu từ 0.
```
pry(main)> [1,2,3].each_with_index { |val, index| puts "index: #{index} for #{val}" }
index: 0 for 1
index: 1 for 2
index: 2 for 3
=> [1, 2, 3]
pry(main)> [1,2,3].each.with_index(0) { |val, index| puts "index: #{index} for #{val}" }
index: 0 for 1
index: 1 for 2
index: 2 for 3
=> [1, 2, 3]
```
Method with_index(x) khi ta truyền tham số x vào thì chỉ mục index sẽ bắt đầu từ giá  trị x, còn mặc định khi không truyền thêm tham số vào thì chỉ mục index sẽ bắt đầu từ 0.
```
 pry(main)> [1,2,3].each.with_index(1) { |val, index| puts "index: #{index} for #{val}" }
index: 1 for 1
index: 2 for 2
index: 3 for 3
=> [1, 2, 3]
pry(main)> [1,2,3].each.with_index { |val, index| puts "index: #{index} for #{val}" }
index: 0 for 1
index: 1 for 2
index: 2 for 3
=> [1, 2, 3]
```
## 3.[respond_to?](https://apidock.com/ruby/Object/respond_to%3F)
Phương thức này sẽ trả về true nếu đối tượng đáp ứng với tên phương thức truyền vào, nó có thể là một symbols.
Ta có một ví dụ sau có một class bao gồm các method public, private, protected.
```
pry(main)> class Foo
pry(main)*   def bar
 pry(main)*     puts "method public"
pry(main)*   end  
pry(main)*   
pry(main)*   private
pry(main)*   def bar_private
pry(main)*     puts "method private"
pry(main)*   end  
pry(main)*   
pry(main)*   protected
pry(main)*   def bar_protected
pry(main)*     puts "method protected"
pry(main)*   end  
pry(main)* end  
```
Đối với phương thức public ta chỉ cần gọi như sau:
```
pry(main)> a = Foo.new
=> #<Foo:0x00007f116b4d1218>
pry(main)> a.respond_to? :bar
=> true
```
Đối với phương thức private, protected:
```
pry(main)> a.respond_to? :bar_private
=> false
 a.respond_to? :bar_protected
=> false
```
Ta thấy rằng với cách gọi như các method public thì respond_to? trả về false. Lưu ý rằng tham số thứ hai của method respond_to? rất quan trọng ở đây, nó biểu thị rằng respond_to? có thể tìm tất cả các method mà phạm vị bao gồm cả các method riêng tư. Ta có thể gọi respond_to? đối với các method private và protected như sau:
```
pry(main)> a.respond_to? :bar_private, true
=> true
 a.respond_to? :bar_protected, true
=> true
```
## 4.[squeeze](https://apidock.com/ruby/String/squeeze)
Đây là một phương thức rất đơn giản trên chuỗi, nó loại bỏ các ký tự trùng nhau liên tiếp trong chuỗi đó. 
```
pry(main)> "yellowl   moon".squeeze
=> "yelowl mon"
```
Khi không truyền vào tham số nó sẽ tìm tất cả các ký tự trùng nhau liên tiếp trong chuỗi bảo gồm cả các khoảng trắng.
```
pry(main)> "yellowl     moon".squeeze("b-n")
=> "yelowl     moon"
```
Khi truyền vào tham số là chuỗi thể hiện khoảng của những ký tự trong bảng chữ cái ví dụ những chữ cái từ b-n ta chỉ tìm để loại bỏ các ký tự trùng nhau liên tiếp trong khoảng b-n, chú ý rằng ở đây các khoảng trắng trùng nhau sẽ không bị loại bỏ.
```
pry(main)> "  yeowl     moon".squeeze(" ")
=> " yellowl  moon"
```
Khi truyền vào tham số " " sẽ chỉ loại bỏ các khoảng trằng trùng nhau liên tiếp.
## Kết luận:
Tôi hi vọng bạn thích tìm hiểu về các phương thức này và thử dùng nó trong dự án của mình - hoặc thâm chí đơn giản chỉ nghịch với chúng trong irb hay pry để tìm hiểu cách thức hoạt động của chúng.
<br>
tài liệu tham khảo:
https://apidock.com/ruby/Object/tap
https://apidock.com/ruby/Enumerator/each_with_index
https://apidock.com/ruby/String/squeeze
https://apidock.com/ruby/Object/respond_to%3F