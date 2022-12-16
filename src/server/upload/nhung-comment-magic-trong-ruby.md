Chắc bất kỳ một bạn coder nào cũng đã một lần sử dụng qua chức năng comment để giải thích đoạn mã mình đang làm gì, mô tả những gì nó làm. Bên cạnh những tác dụng đó, thì ruby còn cung cấp cho các bạn một loại comment, nó được gọi là comment magic. Vậy comment magic và comment thường khác gì nhau ? Comment magic hoạt động như thế nào ? Hãy cùng mình tìm hiểu chúng trong bài viết này nhé!!!

Để hiểu một cách chi tiết comment magic là gì, hoạt động ra sao, cú pháp thế nào, chúng ta cùng đi qua các mục lớn sau nhé:

* Comment thường và comment magic.
* Comment magic.
* Những comment magic phổ biến.

## Comment thường so với comment magic

Trong Ruby , bạn có thể chú thích và tài liệu hóa các dòng code của mình bằng các comment.

Để khai báo một comment, chúng ta sử dụng ký tự `#` ở phía trước những gì muốn comment.

```
# Polylithic linked list structure
class LinkedList
end
```

Ở đây, tất cả các văn bản sau  `#` không được thông dịch bởi Ruby. Nó chỉ giúp nhà phát triển hiểu ý nghĩa của đoạn mã đang thực thi điều gì.

Mặt khác, có một số comment lại được thông dịch bởi Ruby. Chúng được gọi là comment magic.

```
# encoding: big5

''.encoding # => #<Encoding:Big5>
```

Ở đây, `# encoding: big5` được thông dịch bởi Ruby.

Khi Ruby đọc những comment magic này, nó sẽ tự động mã hóa chuỗi được khai báo trong tệp này thành `Encoding:Big5-` chúng ta sẽ đi sâu hơn vào `encoding:`phần cuối của bài viết này.

Bây giờ chúng ta đã biết sự khác biệt giữa một comment thông thường và một comment magic, chúng ta hãy xem comment magic là gì, cú pháp sử dụng ra sao và những comment magic phổ biến nhé.

## Comment magic

Chúng ta hãy xem các quy tắc ngầm mà chúng ta cần biết để tận dụng tốt nhất tính năng này.

**Cú pháp**

Có hai cú pháp để khai báo một comment magic:

```
# encoding: UTF-8
# -*- encoding: UTF-8 -*-
```

Cả hai cú pháp sẽ được hiểu tương tự nhau trong Ruby.

**Phạm vi hoạt động**

Chúng ta hãy xem phạm vi hoạt động của một comment magic.

```
# encoding: big5

''.encoding # => #<Encoding:Big5>

require './world.rb'
```
> hello.rb
```
''.encoding # => #<Encoding:UTF-8>
```

> world.rb

Như chúng ta có thể thấy, comment magic chỉ có hiệu lực trong tệp được khai báo. Thật vậy, mã hóa trong tệp `world.rb`  là mã hóa Ruby mặc định : `UTF-8`.

Vì vậy, comment magic được khai báo trong các modules được gọi trong cú pháp required sẽ không có bất kỳ tác động file hiện tại bạn đang thực thi.

**Nhiều comment magic trong cùng một tập tin**

Chúng ta có thể khai báo nhiều comment magic trong cùng một tập tin.

```
# encoding: big5
# frozen_string_literal: true
```

Tại đây, Ruby sẽ phân tích và xử lý cả hai comment magic. Vì vậy, cả hai sẽ có hiệu lực trong tập tin này.

**Độ ưu tiên**

Vì các quy tắc ưu tiên là khác nhau đối với mỗi comment magic, tôi sẽ mô tả các quy tắc này dưới mỗi phần comment magic.

Bây giờ chúng ta đã quen thuộc hơn với khái niệm comment magic, chúng ta hãy cũng đi sâu vào tìm hiểu cách thức hoạt động của một số comment magic phổ biến .

## Những comment magic phổ biến

Trong phần này, chúng ta sẽ nói về từng comment magic. Mục tiêu ở đây là trình bày cho bạn những comment kỳ diệu và đưa ra cho bạn những quy tắc ưu tiên được áp dụng cho chúng. 

### Encoding: Comment magic

Trong Ruby, mã hóa mặc định cho bất kỳ chuỗi ký tự nào là `UTF-8.`

Những `encoding:` comment magic này cho phép chúng ta sửa đổi mã hóa mặc định này trong tập tin mà comment này được định nghĩa.

```
# encoding: big5

''.encoding # => #<Encoding:Big5>
```

Chúng ta có thể thấy rằng mã hóa chuỗi của chúng ta là `Encoding:Big5-` như được khai báo trong comment magic.

**Độ ưu tiên**

```
# encoding: big5
# encoding: iso-8859-2
# coding: binary

''.encoding # => #<Encoding:Big5>
```

Ở đây, chỉ có `encoding:` comment được khai báo đầu tiên được xử lý. Những comment khai báo phía dưới được bỏ qua.

Lưu ý rằng chúng ta có thể sử dụng `encoding:`hoặc `coding:`.

### frozen_string_literal: comment magic

Comment magic này khá hữu ích khi bạn khai báo một chuỗi tương tự nhiều lần bằng cách sử dụng chuỗi ký tự.

Thật vậy, nó thực hiện tối ưu hóa bằng cách chỉ tạo một instance trên mỗi chuỗi, dựa trên values mà bạn cung cấp cho nó.

```
# frozen_string_literal: true

p 'key'.object_id # => 70306598556120
p 'key'.object_id # => 70306598556120
```

Ở đây, chúng ta có thể thấy rằng nếu chúng ta khai báo hai chuỗi tương tự, chỉ một instance của lớp `String` được tạo cho cả hai chuỗi. Cơ chế này đặc biệt hữu ích khi chúng ta sử dụng các chuỗi làm định danh cho các tài nguyên, tương tự với `symbol`.

**Độ ưu tiên**

```
# frozen_string_literal: false
# frozen_string_literal: true

p 'key'.object_id # => 70306598556120
p 'key'.object_id # => 70306598556120
```

Ở đây, chỉ có `frozen_string_literal`: comment khai báo cuối cùng được ưu tiênxử lý. Những comment khai báo phía trước được bỏ qua.

### `warn_indent:` comment magic

Khai báo này hoạt động tương tự như output của dòng lệnh  `ruby -w warn_indent.rb`

```
# warn_indent: true

def h
  end # bad indentation
```

```
$> ruby warn_indent.rb
warn_indent.rb:4: warn: mismatched indentations at 'end' with 'def'
```

Ở đây, chúng ta có thể thấy rằng nếu đoạn code của bạn convention chưa được chuẩn, Ruby sẽ đưa ra cảnh báo tương ứng.

**Độ ưu tiên**

```
# warn_indent: false
# warn_indent: true

def h
  end # bad indentation
```

Ở đây, chỉ có `warn_indent:` comment khai báo cuối cùng được xử lý. Những comment khai báo phái trước được bỏ qua.

Trên đây mình đã giới thiệu cho các bạn qua về comment magic là gì? Nó hoạt động như thế nào trong mỗi file ruby của bạn. Mong rằng qua bài viết này, các bạn có thể hiểu và sử dụng được những lợi ích mang lại từ các comment magic mà Ruby cung cấp. Hãy sử dụng nó vào chính trong những dự án mà bạn đang làm và khám phá nó nhé!

Cảm ơn các bạn đã dành thời gian theo dõi bài viết!

Nguồn tài liệu: https://medium.com/rubycademy/magic-comments-in-ruby-81d45ff92e34