Xin chào các bạn, hôm nay mình xin mạn phép giới thiệu tới các bạn cái gọi là "Open class" trong ruby. Như các bạn đã thấy ở trong Ruby thì có những method convert như là` to_s`, `to_i`,` to_a`... thì được mọi người rất thường xuyên sử dụng bởi vì nó rất tiện. Và một ngày nọ chúng ta phải làm một màn hình "Create a info of book", tuy nhiên chúng ta hãy nhìn lại rằng, name của book được admin nhập không cẩn thận nên có vài dấu câu thừa thãi hay là nhiều khoảng trống quá thì khi public lên thì không được hay lắm nên chúng ta trước khi lưu book name thì chúng ta nên convert lại true format để hợp lý hơn bằng cách là chúng ta viết medthod convert trong model book như sau:
``` ruby
# in models/book.rb
def to_alphanumeric(s)
  s.gsub(/[^\w\s]/, '').squeeze(' ')
end
```

```irb
# Result test in irb
irb(main):001:0> name_book = "Ruby    on   rails #^"
=> "Ruby    on   rails #^"
irb(main):002:0> name_book.gsub(/[^\w\s]/, '').squeeze(' ')
=> "Ruby on rails "
```
Vấn đề ở đây là khi chúng ta viết method như thế này thì giống như là String tự convert chính nó thì điều đó liệu có nên? Theo mình tìm hiểu được thì nó hơi thừa bởi vì chuỗi đầu vào cũng chỉ là một chuỗi bình thường, rồi sau đó lại tự convert chính nó. Tại sao chúng ta không viết thêm một method của class String để trong dự án của mình có cần dùng đến ở đâu cũng có thể gọi được mà không cần phải viết lại một method như vậy.
```ruby
class String
  def to_alphanumeric
    gsub(/[^\w\s]/, '').squeeze(' ')
  end
end
```
Bây giờ thì mọi người có thể thấy được, `to_alphanumeric` đã là một method của class String rồi và mình không cần phải xử lý rườm rà và vòng vo như lúc đầu nữa.
```irb
irb(main):003:0> class String
irb(main):004:1>   def to_alphanumeric
irb(main):005:2>     gsub(/[^\w\s]/, '').squeeze(' ')
irb(main):006:2>   end
irb(main):007:1> end
=> :to_alphanumeric
irb(main):008:0> name_book.to_alphanumeric
=> "Ruby on rails "
```
Mọi người có thể thấy được sự nhanh gọn khi không cần phải viết riêng một method cho một model mà viết trực tiếp vào class String của ruby. Nhưng tại sao trong ruby đã có class String rồi mà ở đây mình lại định nghĩa được class có tên là String nưa nhỉ, để hiểu rõ hơn nữa thì đi tiếp ví dụ nữa nhé! (bow).\

#### **Inside Class Definitions**
```irb
irb(main):009:0> 3.times do
irb(main):010:1* class C
irb(main):011:2> puts "Hello"
irb(main):012:2> end
irb(main):013:1> end
Hello
Hello
Hello
=> 3
```
Nhìn vào đây thì bạn có nghĩ là Ruby đã defined cho chúng ta được 3 class cùng tên không nhỉ? Câu trả lời là không nhé, để hiểu rõ hơn thì tiếp tục với mình ở ví dụ duới đây:
```irb
irb(main):014:0> class Test
irb(main):015:1>   def test1
irb(main):016:2>     'test1'
irb(main):017:2>   end
irb(main):018:1> end
=> :test1
irb(main):019:0> class Test
irb(main):020:1>   def test2
irb(main):021:2>     'test2'
irb(main):022:2>   end
irb(main):023:1> end
=> :test2
irb(main):024:0> obj = Test.new
=> #<Test:0x00000001d78600>
irb(main):025:0> obj.test1
=> "test1"
irb(main):026:0> obj.test2
=> "test2"
```
Rõ ràng là mình đã defined đã 2 class với tên giống nhau rồi, và trong từng class cũng có method khác nhau, tuy nhiên khi defined như vậy thì vừa không bị lỗi mà còn gọi được 2 method nữa.\
Bơi vì là do khi defined class Test ở lần 1 thì Ruby kiểm tra class với tên là Test không tồn tại nên nó được định nghĩa, sang đến defined lần thứ 2 thì nó không như vậy, nó kiểm tra thấy tồn lại nên lần này không được defined mà  thay vào đó, Ruby đã mở lại class Test đó và defined method với tên là test2 vào class Test nên chúng ta mới có thể gọi được method tên là test2.
#### Summary

Ở đây, class trong Ruby giống với scope hơn là defined class. Bởi vì khi kiểm tra tồn tại thì nó không có thêm mà nó thêm method ở class được defined sau khi tồn tại. Như vậy chúng ta có thể thấy rằng là chúng ta có thể viết thêm method cho class mặc định của Ruby hoặc thậm chí có thể sửa luôn method của Ruby bằng cách sử dụng kỹ thuật "Open class". Tuy nhiên chúng ta cũng phải cân nhắc khi sử dụng kỹ thuật này vì rất dễ bị rỗi khi defined quá nhiều như vậy, nên hãy cẩn thận, không gì là tuyệt đối cả. \
Xin cảm ơn mọi người đã đọc bài viết này! Và cũng mong nhận được sự đóng góp ý kiến từ mọi người!\
(thankyou)(bye)