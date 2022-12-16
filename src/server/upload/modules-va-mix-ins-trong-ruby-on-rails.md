# Giới thiệu
Đây là những chủ đề cũ, không mới đối với các lập trình viên. Hôm nay trong bài viết này tôi muốn chia sẻ vai trò của các mô-đun và mix-in trong Ruby on Rails.

Ngày nay nhiều lập trình viên phát triển rất nhiều chương trình. Độ dài của chương trình là không thể biết trước được. Nhưng những đoạn code đó không phải lúc nào cũng là duy nhất trong chương trình. Có một số trường hợp trong đó một đoạn code được sử dụng nhiều lần. Bởi vì việc các đoạn code được gọi lại nhiều lần, các phương thức được sử dụng nhiều lần, ví dụ: trong một chương trình như dự án thương mại điện tử, cổng thanh toán phải được đặt trên nhiều nơi, bởi vì trong trang web đó, đối với mỗi sản phẩm mà người dùng mua thì cần phải thanh toán và sau đó nhận được sản phẩm. Vì vậy, code giao diện cổng thanh toán này phải được đặt trên nhiều sản phẩm trong trang web. Vì vậy, trong những trường hợp như vậy, chúng ta cần một khái niệm ngôn ngữ lập trình cho phép tính năng viết code tại một nơi và cho phép truy cập vào nhiều nơi trong dự án.

Các ngôn ngữ lập trình tương tự như là Java, Python sẽ đưa ra giải pháp cho vấn đề của mình thông qua các tính năng của nó như đa hình, kế thừa, interfaces,...

Trước khi bắt đầu tìm hiểu vai trò của các mô-đun và Mix-in, mình sẽ giới thiệu chi tiết cho bạn các khái niệm đó.

**Class**: Một lớp chỉ đơn giản là tập hợp các phương thức, biến. Ở đây, tên lớp được thêm tiền tố với một từ khóa class.

Ở đây các module giống với class, chứa một tập hợp các biến, phương thức, hàm,... Mỗi mô-đun phải được thêm tiền tố với từ khóa module.

Các mô-đun là một cách để nhóm các phương thức, lớp và hằng số lại với nhau. Các mô-đun cung cấp cho bạn hai lợi ích chính.
* Các mô-đun cung cấp một namespace và ngăn chặn xung đột tên.
* Các mô-đun thực hiện các cơ sở mixin.
## Cú pháp
```
module Identifier
   statement1
   statement2
   ...........
end
```

Các hằng số mô-đun được đặt tên giống như các hằng lớp, với một chữ cái viết hoa ban đầu. Các định nghĩa phương thức trông cũng tương tự: Các phương thức mô-đun được định nghĩa giống như các phương thức lớp.

Như với các phương thức lớp, bạn gọi một phương thức mô-đun bằng cách đặt trước tên của nó với tên của mô-đun và bạn tham chiếu một hằng số bằng cách sử dụng tên mô-đun và hai dấu hai chấm.
## Ví dụ
```
#!/usr/bin/ruby

# Module defined in trig.rb file

module Trig
   PI = 3.141592654
   def Trig.sin(x)
   # ..
   end
   def Trig.cos(x)
   # ..
   end
end
```
Chúng ta có thể định nghĩa thêm một mô-đun có cùng tên chức năng nhưng chức năng khác nhau
```
#!/usr/bin/ruby

# Module defined in moral.rb file

module Moral
   VERY_BAD = 0
   BAD = 1
   def Moral.sin(badness)
   # ...
   end
end
```
Giống như các phương thức lớp, bất cứ khi nào bạn định nghĩa một phương thức trong một mô-đun, bạn chỉ định tên mô-đun theo sau là một dấu chấm và sau đó là tên phương thức.
# Lệnh require trong Ruby
Câu lệnh yêu cầu tương tự như câu lệnh trong C và C ++ và câu lệnh import của Java. Nếu một chương trình thứ ba muốn sử dụng bất kỳ mô-đun được xác định nào, nó chỉ có thể tải các tệp mô-đun bằng cách sử dụng câu lệnh Ruby require
## Cú pháp
```
require filename
```
## Ví dụ
```
$LOAD_PATH << '.'

require 'trig.rb'
require 'moral'

y = Trig.sin(Trig::PI/4)
wrongdoing = Moral.sin(Moral::VERY_BAD)
```
Ở đây chúng ta đang sử dụng `$LOAD_PATH << '.'` để làm cho Ruby biết rằng các tệp được bao gồm phải được tìm kiếm trong thư mục hiện tại. Nếu bạn không muốn sử dụng $LOAD_PATH thì bạn có thể sử dụng require_relative để bao gồm các tệp từ một đường dẫn thư mục tương đối.
# Lệnh include trong Ruby
Bạn có thể nhúng một mô-đun trong một lớp. Để nhúng một mô-đun vào một lớp, bạn sử dụng câu lệnh include  trong lớp
## Cú pháp
```
include modulename
```
Nếu một mô-đun được định nghĩa trong một tệp riêng biệt, thì bắt buộc phải include tệp đó bằng cách sử dụng câu lệnh require trước khi nhúng mô-đun vào một lớp.
## Ví dụ
Hãy xem xét các mô-đun sau được viết trong tệp support.rb
```
module Week
   FIRST_DAY = "Sunday"
   def Week.weeks_in_month
      puts "You have four weeks in a month"
   end
   def Week.weeks_in_year
      puts "You have 52 weeks in a year"
   end
end
```
Bây giờ, bạn có thể include mô-đun này trong một lớp như sau
```
#!/usr/bin/ruby
$LOAD_PATH << '.'
require "support"

class Decade
include Week
   no_of_yrs = 10
   def no_of_months
      puts Week::FIRST_DAY
      number = 10*12
      puts number
   end
end
d1 = Decade.new
puts Week::FIRST_DAY
Week.weeks_in_month
Week.weeks_in_year
d1.no_of_months
```
Điều này sẽ tạo ra kết quả sau đây
```
Sunday
You have four weeks in a month
You have 52 weeks in a year
Sunday
120
```
# Mixins trong Ruby
Trước khi đi qua phần này, chúng ta giả sử đã có kiến thức về các khái niệm hướng đối tượng.

Khi một lớp có thể kế thừa các tính năng từ nhiều hơn một lớp cha, lớp đó có nghĩa vụ hiển thị đa kế thừa.

Ruby không hỗ trợ đa kế thừa trực tiếp nhưng Ruby Modules có một công dụng tuyệt vời khác. Để làm được điều đó ruby cung cấp một phương tiện gọi là mixin.

Mixins cung cấp cho bạn một cách kiểm soát tuyệt vời để thêm chức năng cho các lớp. Tuy nhiên, sức mạnh thực sự của chúng xuất hiện khi mã trong mixin bắt đầu tương tác với mã trong lớp sử dụng nó.

Hãy cùng thực thi đoạn code sau đây để hiểu về mixin
```
module A
   def a1
   end
   def a2
   end
end
module B
   def b1
   end
   def b2
   end
end

class Sample
include A
include B
   def s1
   end
end

samp = Sample.new
samp.a1
samp.a2
samp.b1
samp.b2
samp.s1
```
Mô-đun A bao gồm các phương thức a1 và a2. Mô đun B bao gồm các phương thức b1 và b2. Lớp Smaple bao gồm cả hai mô-đun A và B. Lớp Sample có thể truy cập cả bốn phương thức, cụ thể là a1, a2, b1 và b2. Do đó, bạn có thể thấy rằng lớp Sample kế thừa từ cả hai mô-đun. Vì vậy, bạn có thể nói lớp Sample hiển thị đa kế thừa hoặc một mixin.