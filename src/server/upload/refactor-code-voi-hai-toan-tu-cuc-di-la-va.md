Refactor code là chuyện thường xuyên gặp phải và cũng là kĩ năng mà một developer cần có. Nó giúp cho chúng ta cải thiện performance hệ thống, tăng khả năng đọc hiểu, khả năng mở rộng và bảo trì của dự án. Trong bài viết này mình sẽ xin chia sẻ cách refactor code với hai toán tử "cực dị" là `&.` và `&.!=` nhé :smile: :smile: :smile:

### Toán tử `&.`
Toán tử `&.` được gọi là **Safe Navigation Operator** được ra mắt ở phiên bản Ruby 2.3.0. Nó khá là giống với toán tử `?.` trong **C#**, **Kotlin**, **Objective-C**, ... Hãy xem xem nó có thể làm những gì nhé.

Giả sử như bạn của bạn nuôi một chú mèo và bạn muốn biết chú mèo này giống gì:
```ruby
if friend && friend.cat && friend.cat.kind
...
end
```
Viết như thế này rất rườm rà và khi sửa logic thì cũng cực kì khó chịu. `ActiveSupport` có method `try` cũng tương tự như toán tử này:
```ruby
if friend.try(:cat).try(:kind)
...
end
```
Cả hai đoạn code này làm tròn nhiệm vụ của nó, hoặc sẽ trả về `nil` nếu như một method trong chuỗi  trả về `nil`; hoặc sẽ trả về giống của chú mèo nếu như không có gì bất thường.

Với **Safe Navigation Operator** - toán tử `&.`, ta có thể refactor code lại như sau:
```ruby
friend&.cat&.kind
```
Cú pháp nhìn thì có vẻ hơi "si đa" nhưng trông cũng khá là compact đấy chứ. :rofl: :rofl: :rofl:

**Ví dụ:**
```ruby
friend = Friend.new cat: nil # Bạn của bạn không nuôi mèo :))

friend.cat.kind
# => NoMethodError: undefined method `kind' for nil:NilClass

friend && friend.cat && friend.cat.kind
# => nil

friend.try(:cat).try(:kind)
# => nil

friend&.cat&.kind
# => nil
```
Trường hợp này không có gì bất thường, giờ giả sử `cat = false` xem sao (hầu như không có trong thực tế nên ví dụ chỉ mang tính chất minh họa thôi nhé :satisfied:)
```ruby
friend = Friend.new cat: false

friend.cat.kind
# => NoMethodError: undefined method `kind' for false:FalseClass`

friend && friend.cat && friend.cat.kind
# => false

friend.try(:cat).try(:kind)
# => nil

friend&.cat&.kind
# => undefined method `kind' for false:FalseClass`
```
Trường hợp này ta thấy toán tử `&.` đã không pass được giá trị là `false`. Giờ nếu trường hợp là `Object` thì sao?
```ruby
friend = Friend.new cat: Object.new

friend.cat.kind
# => NoMethodError: undefined method `kind' for #<Object:0x00559996b5bde8>

friend && friend.cat && friend.cat.kind
# => NoMethodError: undefined method `kind' for #<Object:0x00559996b5bde8>`

friend.try(:cat).try(:kind)
# => nil

friend&.cat&.kind
# => NoMethodError: undefined method `kind' for #<Object:0x00559996b5bde8>`
```
Ta thấy toán tử `&.` sẽ chỉ trả về `nil` nếu như method hoặc object trước đó là `nil` mà thôi, các trường hợp còn lại vẫn sẽ raise error như thường.

Giờ xét thêm trường hợp của `try`, theo định nghĩa:
> **try(\*a, &b)**
> 
> Invokes the public method whose name goes as first argument just like `public_send` does, except that if the receiver does not respond to it the call returns `nil` rather than raising an exception.
> 


Trong ví dụ trên `:cat` không **respond** với `:kind`, chính vì vậy `friend.try(:cat).try(:kind)` mới trả về `nil`. Để raise exception, chúng ta có thể dùng `try!`:
> **try!(\*a, &b)**
> 
> Same as try, but raises a `NoMethodError` exception if the receiver is not `nil` and does not implement the tried method.
> 

```ruby
friend.try!(:cat).try!(:kind)
# => NoMethodError: undefined method `kind' for #<Object:0x00559996b5bde8>`
```

###  Toán tử `&.!=`
**Cái gì?!? Toán tử `&.!=`?!?!** 

**Cái quái gì đây?!?!**

Đúng rồi đấy, bạn không nhìn nhầm đâu :rofl: :rofl: :rofl: 

Thực chất, toán tử `&.!=` là toán tử `&.` và `!=` được kết hợp lại với nhau. Sở dĩ có thể kết hợp được như vậy là bởi vì `!=` trông như một toán tử nhưng về bản chất nó lại là một method.

Với cách kết hợp này, chúng ta thậm chí có thể refactor đoạn code dài dòng sau:
```ruby
if friend.cat && friend.cat != my.cat
...
end
```
thành:
```ruby
if friend.cat&.!= my.cat
...
end
```
Hơi hack não nên mình sẽ giải thích một chút:

Hãy coi toán tử `!=` là một method và coi nó giống như method `kind` ban nãy nhưng `kind` bây giờ lại nhận thêm tham số là `my.cat` (đừng quan tâm đến logic, chỉ là ví dụ thôi :joy:)
```ruby
friend.cat&.kind

# sẽ thành

friend.cat&.kind(my.cat)

# giờ thay kind bằng !=

friend.cat&.!= my.cat
```
Thực sự, mình thấy đây là một cách refactor code cực kì hay. Tuy nhiên, nó khá là hack não nếu như ai chưa biết đến **Safe Navigation Operator** - Toán tử `&.` này. Cá nhân mình khá là thích refactor code, trông cool ngầu hơn, dễ sửa đổi, dễ hiểu lại còn DRY được code nữa. Hy vọng với bài này các bạn sẽ có thêm những cú refactor code thật cool ngầu trong pull request và làm điên đảo reviewer nhé! :clap: :clap: :clap:

### Tài liệu tham khảo
* https://aaronlasseigne.com/2016/01/04/rubys-new-safe-navigation-not-equal-operator/
* http://mitrev.net/ruby/2015/11/13/the-operator-in-ruby/
* https://api.rubyonrails.org/
* https://en.wikipedia.org/wiki/Safe_navigation_operator