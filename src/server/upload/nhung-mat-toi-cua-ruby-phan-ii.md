Tiếp nối [phần 1](https://viblo.asia/p/nhung-mat-toi-cua-ruby-phan-i-1Je5EEzw5nL), ở phần 2 này mình sẽ tiếp tục đưa ra những mặt không tốt của Ruby.

# 4. BEGIN và END:
Begin và End cũng xuất hiện ở Ruby từ Perl, mặc dù nguồn gốc thực sự của chúng vẫn đang rất mơ hồ. Begin và End cho phép bạn xác định một đoạn code sẽ được thực thi ngay sau khi chương trình bắt đầu và ngay trước khi nó kết thúc. Hãy xem ví dụ sau:
```
END {
  puts "inside END block..."
}

puts "Hello!"

BEGIN {
  puts "inside BEGIN block..."
}

 # => inside BEGIN block...
 # => Hello!
 # => inside END block...
```

Thực sự thì mình chưa thấy một trường hợp nào mà những block này thực sự hữu dụng trong một ứng dụng Ruby trong thực tế. Không những vô tác dụng, chúng còn gây ảnh hưởng không nhỏ đến luồng ứng dụng bình thường và khiến cho việc tìm hiểu và gỡ lỗi trở nên khó khắn hơn.

# 5. Biến toàn cục:
Có một điều về biết toàn cục được thừa nhận rộng rãi là nó thật sự rất "evil". Chúng khiến cho các phần mềm trở nên khó đọc và khó hiểu hơn. Chúng ta có thể truy cập chúng từ mọi nơi ở trong code, điều này khiến cho nó không thể tạc biệt một cách rõ ràng với những đơn vị trong code. Chúng làm tăng nguy cơ xảy ra xung đột tên biến. 

Một số ngôn ngữ không hề tồn tại biến toàn cục. Tất nhiên Ruby không nằm trong số các ngôn ngữ này. Không chỉ làm cho phép sử dụng, Ruby còn có một tập hợp các biến toàn cục được xây dựng sẵn. Một vài ví dụ có thể kể đến như $@, $?, $1, $2, $3, ... Tên của các biến này hoàn toàn không có ý nghĩa hay tượng trưng cho một cái gì cả, đây cũng là một vấn đề của Ruby. Các biến này đượng dùng cho mục đích gì? Một số biến này có liên quan đến các biểu thức so sánh thông dụng ví dụ như:

* $& - văn bản được so khớp với regex
* $`- văn bản trước so sánh
* $'- văn bản sau so sánh
* $1, $2, $3… $ n - văn bản được so sánh khớp bởi nhóm thứ n

Còn một số ví dụ khác như:
* $ * - các gọi khác của ARGV, chỉ đọc
* $$ - PID của quá trình hiện tại
* $? - trạng thái thoát của quá trình kết thúc cuối cùng

Bạn có thể xem đầy đủ hơn về danh sách các biến toàn cục của Ruby [tại đây] http://www.rubyist.net/~slagell/ruby/globalvars.html[](http://www.rubyist.net/~slagell/ruby/globalvars.html)

Bạn có biết các biến toàn cục và cái tên bí ẩn của chúng được vay mượn từ đâu không? Không sai, chính là từ Perl đấy. May mắn thay, Ruby có kèm theo một thư viện bằng tiếng Anh, nó bổ sung thêm nhiều cái tên rõ nghĩa và tường minh hơn cho các biến toàn cục được xây dựng sẵn. 

Danh sách các cái "tên giả" này có thể được tìm thấy trong [ruby-doc](http://ruby-doc.org/stdlib-2.0.0/libdoc/English/rdoc/English.html). Để sử dụng những cái tên này, bạn cần gọi ra thư viện bên trong code của mình:
```
require "English"

"abc" =~ /.{3}/
puts $MATCH

=> "abc"
```

Việc định nghĩa như thế này dễ đọc hơn nhiều, nhưng chúng ta vẫn đang sử dụng các biến toàn cục. Ta có thể đạt được kết quả tương tự với phương thức sau:
```
m = "abc".match(/.{3}/)
puts m[0]

=> "abc"
```

Trước phiên bản 1.9 trình hỗ trợ đa ngôn ngữ của Ruby (m17n) là không ổn. Theo mặc định, Ruby chỉ hỗ trợ các chuỗi được mã hóa ASCII và giả đinh là tất cả mọi ký tự phải được mã hóa bằng chính xác một byte. Việc thêm hỗ trợ cho các trình mã hóa khác như UTF-8 là có thể nhưng làm việc với chúng gây ra một sự khó chịu nhất định.

Kể từ khi phát hành phiên bản 1.9, vấn đề trên đã được cải thiện đáng kể. Trái với hầu hết các ngôn ngữ khác, Ruby sử dụng mã hóa trên mỗi chuỗi (per-string encoding) chứ không mã hóa toàn cục cho toàn bộ các chuỗi.
Danh sách các phương thức mã hóa được hỗ trợ được liệt kê dưới đây:
```
Encoding.list
=> [#<Encoding:ASCII-8BIT>,
 #<Encoding:UTF-8>,
 #<Encoding:US-ASCII>,
 #<Encoding:UTF-16BE (autoload)>,
 #<Encoding:UTF-16LE (autoload)>,
 #<Encoding:UTF-32BE (autoload)>,
 #<Encoding:UTF-32LE (autoload)>,
 #<Encoding:UTF-16 (dummy) (autoload)>,
 #<Encoding:UTF-32 (dummy) (autoload)>,
 #<Encoding:UTF8-MAC>,

Encoding.list.count
=> 100
```

Tương tự như các chuỗi, các biểu thwusc chính quy cũng có mã hóa của riêng chúng.

Các tệp nguồn cũng có mã hóa. Để thiết lập mã hóa như mong muốn, bạn cần thêm một đoạn comment trên dòng đầu tiên hoặc thứ hai của tệp, bao gồm mã hóa được viết sau dấu : và "encoding". Ví dụ, bắt đầu của một tập tin mã nguồn UTF-8 có thể trông như sau: 
```
#!/usr/bin/env ruby
# encoding: utf-8
```

Việc mã hóa mã nguồn cho phép bạn sử dụng những chuỗi ký tự unicode trong chuỗi ký tự hoặc tên biến.

Hai loại mã hóa còn lại là mã hóa bề ngoài, chịu trách nhiệm xử lý các đối tượng đầu vào - đầu ra và mã hóa nội bộ, được sử dụng cho nội bộ. Hãy xem nó hoạt động như thế nào

Trước tiên, chúng ta sẽ tạo một tệp văn bản với một số ký tự đặc biệt, sử dụng mã hóa iso-8859-2:
```
ąęć
```

Bây giờ chúng ta sẽ mở tệp:
```
File.open("iso-8859-2.txt", "r") do |f|
  puts f.external_encoding
  puts f.read          # content
  puts f.read.encoding # internal encoding
end

# UTF-8
# ���
# UTF-8

```

Vâng, nó không hoạt động. Tệp được hiểu là UTF-8. Hãy thử xác định rõ ràng mã hóa bên ngoài. Chúng ta có thể làm điều đó bằng cách thêm đối số encoding vào:
```
File.open("iso-8859-2.txt", "r:iso-8859-2") do |f|
  puts f.external_encoding
  puts f.read          # content
  puts f.read.encoding # internal encoding
end

# ISO-8859-2
# ���
# ISO-8859-2
```

Lần này tệp được hiểu là iso-8859-2, nhưng chúng ta vẫn không thể thấy các ký tự. Đó là vì console của chúng ta mong đợi các ký tự được mã hóa UTF-8. Chúng ta có thể khắc phục sự cố bằng cách chỉ định mã hóa bên trong ngay sau mã hóa bên ngoài:
```
File.open("iso-8859-2.txt", "r:iso-8859-2:utf-8") do |f|
  puts f.external_encoding
  puts f.read          # content
  puts f.read.encoding # internal encoding
end

# ISO-8859-2
# ąęć
# UTF-8
```

Một vấn đề khác khi định dạng có thể xảy ra khi bạn cố gắng so sánh chuỗi trong một mã hoá với biểu thức chính quy trong mã hóa khác.

Vô số mã hóa trong Ruby đôi khi có thể là nguồn gôc của những vấn đề đau đầu. Để tránh các vấn đề tiềm ẩn, bạn nên sử dụng unicode cho mọi thứ.

Ruby không hoàn hảo. Không có gì trên thế giới này là hoàn hảo. Nó có những phần xấu của nó và điều quan trọng là bạn phải nhận thức được chúng. Bằng cách này, chúng ta có thể đưa ra các quyết định việc đó có phải là công cụ thích hợp cho công việc hay các tính năng của công việc chúng ta nên sử dụng và những công việc nào cần tránh. 

Nếu bạn có ý kiến gì về chủ đề này hoặc muốn bổ sung thêm một cái gì đó vào danh sách? Xin hãy vui lòng để lại nhận xét!