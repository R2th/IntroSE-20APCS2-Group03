Chúng ta đã quá quen khi sử dụng comment trong code ruby và mục đích của nó thường dùng để ghi chú hoặc giải thích thêm về mục đích của đoạn code và comment sẽ không được thông dịch. Vậy comment có thể làm được những gì khác ngoài việc chỉ đơn giản là đoạn chú thích thôi. Cùng tìm hiểu tiếp nhé.

### Multi-line comments
Thường thì khi chúng ta cần comment trên nhiều line thì chỉ đơn giản là thêm dấu **#** ở phía trước mỗi line. Ví dụ như:
```ruby
#!/usr/bin/env ruby

# This is
# multi-line
# comments

puts "Running!"
```

Cách viết trên hoàn toàn đúng nhưng chúng ta có thể viết lại đoạn comment trên bằng cách khác tốt hơn như:
```ruby
#!/usr/bin/env ruby

=begin
  This is
  multi-line
  comments
=end
  
puts "Running!"
```

Đoạn code trên khi nhìn vào rất dễ đọc đặc biệt là khi chúng ta nhiều line hơn. Ngoài ra còn có cách khác đó là có thể viết nhiều comment ở cuối file như sau:

```ruby
#!/usr/bin/env ruby
puts "Hello"

__END__
Những đoạn code nằm phía sau __END__ đều được xem như là
comment và không được biên dịch.
```

Một sự lựa chọn khác để có thể comment trên nhiều line là sử dụng docstring.

```ruby
#!/usr/bin/env ruby
<<-DOC
  Đoạn này dùng để test chức năng comment trên nhiều line
  sử dụng docstring
DOC

puts "docstring"
```

### Indentation warning comment
Có thể bật tính năng warning indent bằng cách thêm đoạn comment `# warn_indent: true` ở đầu file ruby bạn cần bật. Khi chúng ta thêm đoạn comment trên vào thì nếu có lỗi về indent thì sẽ có message warning hiển thị ở console.

Ta có file **warn_ident.rb**:
```ruby
#!/usr/bin/env ruby
def hello
          puts "hello world"
               end
```
Trước khi bật **warn_indent**:
```
NO OUTPUT
```

Sau khi bật **warn_indent**:
```
warn-ident.rb:5: warning: mismatched indentations at 'end' with 'def' at 3
```

### Frozen String Literal Comment
Trong ruby, mặc định các **chuỗi string** đều là mutable và mỗi lần tạo mới một string giống nhau thì sẽ tạo mới một object. Và đó cũng là lí do chính dẫn đến tốn nhiều bộ nhớ trong ngôn ngữ ruby.

Và để khắc phục vấn đề này đơn giản chúng ta thêm đoạn comment phía dưới vào đầu file

```
# frozen_string_literal: true
```

Khi thêm đoạn comment trên vào thì các string object có giá trị giống nhau chỉ được khởi tạo chỉ một lần duy nhất.

Và đoạn comment trên sẽ giúp giảm đi 20% dung lượng bộ nhớ sử dụng.

Khi không sử dụng **frozen_string_literal**
```ruby
#!/usr/bin/env ruby

puts "hello".object_id # 60
puts "hello".object_id # 80
```

Khi có sử dụng **frozen_string_literal**
```ruby
#!/usr/bin/env ruby

# frozen_string_literal: true

puts "hello".object_id # 60
puts "hello".object_id # 60
```

Như ví dụ trên, khi chúng ta không sử dụng **frozen_string_literal** thì mặc dù 2 string có value giống nhau nhưng vẫn có đến 2 object được tạo. Còn ở ví dụ sau, chúng ta có sử dụng **frozen_string_literal: true** thì chỉ có một object được tạo ra.
Vậy nên khi làm việc với **string** thì mọi người cũng nên cân nhắc để thêm comment **frozen_string_literal: true** ở đầu file để giảm thiệu bộ nhớ nhé.

### File Encoding Comment
Ở ruby 2.0 thì encoding mặc định cho string sẽ là UTF-8. Ở version thấp hơn như 1.9.x thì encoding mặc định sẽ là US-ASCII. Đôi lúc chúng ta muốn sử dụng một Encoding khác ngoài những encoding mặc định bằng cách

```ruby
# encoding: ISO-8859-1
```

hoặc có thể viết theo format sau:
```ruby
# -*- coding: UTF-8 -*-

or

# coding: UTF-8
```

Hãy thử xem đoạn code phía dưới:

```ruby
# -*- coding: ASCII -*-

puts "Édsf"
```

Khi có nhiều comment về change default encoding trong cùng 1 file thì trình biên dịch sẽ chỉ nhận comment đầu tiên và các comment còn lại sẽ bị loại bỏ.

Đoạn code trên sẽ bắn lỗi bởi vì "É" không phải là kí tự có trong bảng ASCII, lỗi sẽ như sau:
```
➜  Desktop ruby encoding.rb
encoding.rb:3: invalid multibyte char (US-ASCII)
encoding.rb:3: invalid multibyte char (US-ASCII)
```

Chúng ta thử chuyển encoding sang UTF-8 xem thế nào nhé:
```ruby
# -*- coding: UTF-8 -*-

puts "Édsf"
```

Kết quả sau khi chạy file
```
➜  Desktop ruby encoding.rb
Édsf
```

Mọi người có thể xem danh sách các encoding support bởi ruby ở [đây](https://en.wikibooks.org/wiki/Ruby_Programming/Encoding)

Trên đây là một số tính năng khác của comment trong Ruby, hy vọng mọi người thể hiểu hơn về comment.
Cảm ơn mn đã đọc(bow)(bow)

Happy Coding!

Tham khảo:
- https://medium.com/tarkalabs/all-you-need-to-know-about-comments-in-ruby-97d991714cf3
- https://en.wikibooks.org/wiki/Ruby_Programming/Encoding
- https://stackoverflow.com/a/8879331/9436905