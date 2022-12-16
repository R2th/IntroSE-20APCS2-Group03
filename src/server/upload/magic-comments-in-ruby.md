Trong bài viết này, chúng ta sẽ đi tìm hiểu một số vấn đề sau đây:
* Comment và magic comments
* Thông số kỹ thuật
* Một vài Magic comments thông dụng
# 1. Comment và Magic Comments
Trong Ruby, bạn có thể chú thích cho dòng code của mình bằng comment. Để định nghĩa một comment, chúng ta sử dụng kí tự # trước mỗi dòng comment của mình.
```ruby
# Polylithic linked list structure
class LinkedList
end
```
Ở đoạn code trên, tất cả những dòng sau dấu # sẽ không được Ruby thực hiện. Nó chỉ giúp cho các nhà phát triển hiểu hơn về code của mình <br>
Tuy nhiên, vẫn có một số comment sẽ được thực thi bởi Ruby. Chúng được gọi là magic comments (bình luận ma thuật) hay magic instructions

```ruby
# encoding: big5
''.encoding # => #<Encoding:Big5>
```
Ở đây, đoạn mã # encoding: big5  vẫn được Ruby thực thi. Khi Ruby thực thi đến dòng bình luận này, nó sẽ tự động đặt mã hóa của bất kỳ chuỗi nào được khai báo trong tệp này thành `encoding: big5`. Chúng ta sẽ đi sâu hơn vào `encoding:` ở phần cuối của bài viết này. <br>
Bây giờ chúng ta đã biết sự khác biệt giữa một comment và magic comment, chúng ta hãy xem các thông số của magic comments
# 2.Thông số kỹ thuật
Chúng ta hãy xem xét các quy tắc quan trọng để tận dụng tốt tính năng này
### Cú pháp
Có hai cú pháp để định nghĩa một magic comments
```ruby
# encoding: UTF-8
# -*- encoding: UTF-8 -*-
```
Hai cú pháp này là hoàn toàn tương tự nhau
### Multiple files
```ruby
# encoding: big5
''.encoding # => #<Encoding:Big5>
require './world.rb'

```
Như chúng ta có thể thấy, magic comments chỉ có hiệu lực trong tệp được khai báo. Thật vậy, mã hóa trong  world.rb là mã hóa Ruby mặc định: UTF-8.<br>
Vì vậy, magic comments không có bất kỳ tác động nào đến các tập tin cần thiết
### Multiple magic comments
Chúng ta có thể định nghĩa nhiều magic comments trong cùng một files.<br>
Ví dụ:
```ruby
# encoding: big5
# frozen_string_literal: true
```
Tại đây, Ruby sẽ phân tích và xử lý 2 magic comments này, chúng ta sẽ đi chie tiết về những magic comments này trong phần tiếp theo. Vì vậy, cả hai magic comments này vẫn được thực thi trong tập tin này.
### Độ ưu tiên
Vì các quy tắc ưu tiên là khác nhau đối với mỗi nhận xét ma thuật, tôi sẽ mô tả các quy tắc này dưới mỗi phần nhận xét ma thuật.<br>
Bây giờ chúng ta đã khá quen thuộc với khái niệm magic comments, chúng ta xem xét các magic comments khác nhau mà chúng ta có thể áp dụng.
# 3. Một vài Magic comments thông dụng.
Trong phần này, chúng ta sẽ nói chi tiết hơn về từng magic comments. Chúng ta sẽ không đi sâu vào từng khái niệm. Mục tiêu ở đây là trình bày cho bạn một vài magic comments và đưa ra cho bạn những quy tắc ưu tiên được áp dụng cho chúng. Bạn có thể xem các tài liệu chính thức để biết thêm thông tin về nó.
## The encoding: magic comments
Trong Ruby, mã hóa mặc định cho bất kỳ chuỗi ký tự nào là  `UTF-8`. Bạn có thể đọc `The Evolution of Ruby Strings from 1.8 to 2.5` nếu bạn không quen thuộc với khái niệm về tiền mã hóa và mã hóa.<br>
Các encoding: magic coments cho phép chúng ta sửa đổi mã hóa mặc định này trong tập tin mà nhận xét này được định nghĩa.
```ruby
# encoding: big5

''.encoding # => #<Encoding:Big5>

```
Chúng ta có thể thấy rằng chuỗi của chúng ta đã mã hóa là  `Encoding:Big5` như đã định nghĩa trong magic comments
### Độ ưu tiên
```ruby
# encoding: big5
# encoding: iso-8859-2
# coding: binary

''.encoding # => #<Encoding:Big5>
```
Ở đây, chỉ có dòng `# encoding: big5` là được thực thi, những dòng khác sẽ bị bỏ qua.<br>
Chú ý rằng, chúng ta có thể sử dụng `encoding:` hoặc `coding: `.
## The frozen_string_literal: magic comments
Magic comments này rất hữu ích khi bạn khai báo một chuỗi tương tự nhiều lần bằng cách sử dụng chuỗi ký tự. <br>
Thật vậy, nó thực hiện tối ưu hóa bằng các chỉ tạo một đối tượng chuỗi, sau đó nó sẽ dùng lại đối tượng đó với các chuỗi có cùng nội dung.
```ruby
# frozen_string_literal: true

p 'key'.object_id # => 70306598556120
p 'key'.object_id # => 70306598556120
```
Ở đây, chúng ta có thể nhìn thấy nếu chúng ta định nghĩa hai chuỗi giống nhau, sẽ chỉ có một thể hiện của lớp String được tạo ra cho chúng. Cơ chế đặc biệt này hữu ích khi chúng ta sử dụng các chuỗi làm định danh cho các tài nguyên, giống như một symbol.
### Độ ưu tiên
```ruby
# frozen_string_literal: false
# frozen_string_literal: true

p 'key'.object_id # => 70306598556120
p 'key'.object_id # => 70306598556120
```
Chúng ta thấy rằng, Chỉ có magic comments `# frozen_string_literal: ` cuối cùng được thực thi. Những dòng khác được bỏ qua.
## The warn_indent: magic comments
Magic comments này làm việc giống như câu lệnh `ruby -w warn_indent.rb`. Nó sẽ chạy chương trình, đưa ra cảnh báo nếu các dòng code được thụt dòng không đúng cách.
```ruby
# warn_indent: true

def h
  end # bad indentation
```
```
$> ruby warn_indent.rb
warn_indent.rb:4: warn: mismatched indentations at 'end' with 'def'
```
Ở đây, chúng ta có thể thấy nếu dòng code không được thụt dòng đúng cách, Ruby sẽ đưa ra một cảnh báo.
### Độ ưu tiên
Câu lệnh định nghĩa `warn_indent:` cuối cùng sẽ được thực thi. Những câu lệnh khác được bỏ qua. <br>
Ví dụ :
```ruby
# warn_indent: false
# warn_indent: true

def h
  end # bad indentation
```
Tài liệu tham khảo 
> https://medium.com/better-programming/magic-comments-in-ruby-81d45ff92e34
>