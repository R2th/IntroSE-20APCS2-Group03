Bài viết được dịch từ bài [A Weird and Wonderful Trip through Ruby’s Standard Library](https://medium.com/rubyinside/a-weird-and-wonderful-trip-through-rubys-standard-library-762ddcf7a908) của tác giả [Alex Taylor](https://medium.com/@mctaylorpants).
![](https://images.viblo.asia/a5fb007d-2adb-4140-a9a8-e11c5e08ab4c.png)

-----
Bạn có thể đã biết - Bundler đã được tích hợp vào Ruby core! Thật tuyệt vời khi thấy rằng các dự án như Bundler, đã trở thành trung tâm của trải nghiệm ngôn ngữ Ruby, đang trở thành một phần quan trọng của Ruby một cách sâu sắc.
Nó cũng khiến tôi có suy nghĩ: có gì khác trong đó? Tôi sử dụng Ruby chủ yếu để viết các ứng dụng web, nhưng với lịch sử phong phú của Ruby Language, như một ngôn ngữ kịch bản có nghĩa là có rất nhiều chức năng mà chúng ta không sử dụng đến hàng ngày và có lẽ rất nhiều điều mà tôi không biết đã tồn tại.
Vì vậy, tôi quyết định tìm hiểu. Tôi đã dành một chút thời gian để xem qua các tài liệu thư viện tiêu chuẩn, đôi mắt của tôi sáng sửa lên vì những điều tôi không nhận ra. Tôi tìm thấy một số điều khá kỳ lạ và tuyệt vời, và tôi muốn chia sẻ một số mục yêu thích của tôi.

Hãy sẵn sàng cho một số ví dụ giả định!
## Shellwords
Đầu tiên: mô-đun `Shellwords`. Nó cung cấp một vài phương thức hay giúp cho việc xây dựng và phân tích các lệnh shell dễ dàng hơn từ bên trong Ruby.

Ví dụ: bạn có một tên tệp có 1 dấu nháy đơn và bạn muốn sử dụng `cat` để lấy nội dung của tệp. (Tôi đã nói những điều này là giả định, phải không?)

Bạn có thể làm như thế này:
```ruby
$> filename = "Alex's Notes.txt"
$> `cat #{filename}`
```
Thế nhưng shell bash "không thích" các nháy đơn, vì vậy bạn sẽ gặp lỗi:
```ruby
sh: -c: line 0: unexpected EOF while looking for matching `''
sh: -c: line 1: syntax error: unexpected end of file
=> ""
```
Đừng lo lắng! đã có #shellescape ở đây!
```ruby
$> filename.shellescape
=> "Alex\\'s\\ Notes.txt"
```
```ruby
$> `cat #{filename.shellescape}`
=> "Apostrophes in a filename? 🤔"
```
Hurrah, vấn đề của bạn đã được giải quyết!
## English: một ít về $$
> Đố bạn: $$ return cái gì?
> 
Nếu câu trả lời của bạn là: "hỏi ngu sao?, ID process hiện tại, (̀google là biết, tất nhiên)!,  thì tôi cho rằng bạn có thể bỏ qua phần này, haha.

Đối với phần còn lại của chúng ta, Ruby, `$$` là một sự tôn kính đối với Perl và trả về ID của quy trình hệ thống hiện tại. Nhưng nó không phải là tên thân thiện với nhà phát triển nhất, vì vậy mô-đun Ruby `English` cung cấp một số alias hữu ích: `$PROCESS_ID và $PID`.

Đây là một điều khá nhỏ nhặt, nhưng tôi nghĩ nó là một ví dụ hoàn hảo về **mục tiêu ban đầu của Matz với Ruby**, đó là tạo ra **một ngôn ngữ mà con người hiểu được trước tiên và máy tính thứ hai**.

**English** cung cấp một số hữu ích các alias. Một cái hữu ích khác là `$CHILD_STATUS`, sẽ trả về exit code của lệnh command shell cuối cùng:
```ruby
$> `exit 42`
=> ""
$> $CHILD_STATUS   # or $? for the purists
=> #<Process::Status: pid 25566 exit 42>
```
## Prime
Nếu bạn require  mô-đun Prime, Ruby có thể cho bạn biết nếu một số là số nguyên tố:
```ruby
$> 5.prime?
=> true
```
Ok, cool.

Nhưng bạn có biết rằng Ruby không phải là một, không phải hai, mà là các triển khai `two-and-a-half*`  để xác định tính nguyên thủy của một số?

Trước hết, có `TrialDivision`, một cách tiếp cận cực kỳ brute-force(nguyên thủy) chia một số trong câu hỏi cho các số nhỏ hơn khác và đệ quy cho đến khi nó có câu trả lời dứt khoát =)).

Ngoài ra còn có `EratosthenesSieve`, mà như bạn có thể biết từ cái tên, đã được phát minh ra hơn 2.000 năm trước bởi một nhà toán học Hy Lạp.
```ruby
$> Prime::EratosthenesGenerator.new.take(10)
=> [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
$> Prime.take(10)   # uses Eratosthenes under the hood, by default
=> [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```
Cuối cùng, và có lẽ là ít nhất - đây là lý do tại sao chỉ có hai rưỡi, sau tất cả - chúng ta có `Generator23`. Đây là một số đặc biệt, vì nó không thực sự tạo ra các số nguyên tố, mà là các số không chia hết cho 2 hoặc 3. Đây là một tối ưu hóa thông minh được phát minh bởi các nhà toán học để xác thực một số nguyên tố hiệu quả hơn về bộ nhớ. Do đó, trình tạo này được `#prime?`, Sử dụng cùng với một số tính toán bổ sung, để kiểm tra tính nguyên thủy.
## Abbrev
Đây có lẽ là mô-đun kỳ lạ và tuyệt vời nhất tôi tìm thấy trong trò chơi của mình. Theo các tài liệu, viết tắt:
> Tính toán ra tập hợp các chữ viết tắt duy nhất cho một set các string đã cho.

Thú vị lắm, hãy để tôi trình bày nó trong hành động:
```ruby
$> require 'abbrev'
=> true
$> %w(ruby rules).abbrev
=> {
     "ruby"=>"ruby",
     "rub"=>"ruby",
     "rules"=>"rules",
     "rule"=>"rules",
     "rul"=>"rules"
   }
```
Cung cấp viết tắt cho các chuỗi sau đó lấy các viết tắt unique, ở đây cả hai đều bắt đầu bằng từ `ru` chúng ta phải gọi tên cụ thể hơn nếu muốn gọi cái này hay cái kia.

Mô-đun này được cho là hạn chế trong các trường hợp sử dụng của nó, nhưng dù sao nó cũng thanh lịch và tuyệt vời. Tôi chỉ thích cấu trúc dữ liệu đó: tận dụng các khóa độc đáo của hash và để nó quay trở lại từ gốc? 👌👌

Các cách sử dụng duy nhất của `Abbrev` mà tôi có thể tìm thấy là trong [RDoc](https://docs.ruby-lang.org/en/2.1.0/RDoc/RI/Driver.html#method-i-expand_class) và [một tập lệnh linh tinh trong lõi Ruby](https://github.com/ruby/ruby/blob/trunk/tool/redmine-backporter.rb#L578), nhưng tôi tưởng tượng người ta có thể sử dụng nó tốt trong những thứ cần tự động hoàn thành dòng lệnh.

Hoặc, bạn có thể sử dụng nó để viết Trình tạo tên hiệu không rõ ràng của riêng bạn!
```ruby
$> names = %w(Alex Amy Ayla Amanda)
$> names.abbrev.keys.select { |n| n.length > 2 }
=> ["Alex", "Ale", "Amy", "Ayla", "Ayl", "Amanda", "Amand", "Aman", "Ama"]
```
## Endgame - nhưng không kém phần quan trọng…
Có thể đôi lúc bạn đã thực hiện một yêu cầu HTTP từ chương trình Ruby của mình. Bạn có thể đã sử dụng `Net :: HTTP` (hoặc có thể là một loại gem khác sử dụng nó).

Nhưng hãy để tôi hỏi bạn điều này - bạn đã bao giờ kiểm tra e-mail của mình với Ruby chưa?

Giới thiệu `Net :: POP3`!

Đúng vậy, bạn có thể kiểm tra e-mail của mình mà không cần rời IRB:
```ruby
$> inbox = Net::POP3.new('pop.gmail.com')
=> #<Net::POP3 pop.gmail.com: open=false>
$> inbox.start('your-email-here@gmail.com', 'supersecret')
=> #<Net::POP3 pop.gmail.com: open=true>
$> inbox.each_mail { |m| puts m.pop.split("\n").grep(/Subject/) }
Subject: Hello IRB!
$> pop.finish
=> "+OK Farewell."
```
![](https://images.viblo.asia/1c9cb5be-2a02-4146-b1f2-84846b7334fd.png)
## Kết luận
Thật là một chuyến đi fiêu lưu! Tôi hy vọng tôi đã mở ra cho bạn một số khả năng mới với ngôn ngữ bạn biết và yêu thích. Tôi chắc chắn đã học được một tấn điều thú vị, và đào sâu vào những góc kỳ lạ, bụi bặm này của Ruby chỉ khiến tôi yêu nó nhiều hơn. ❤️

Bạn đã tìm thấy bất kỳ mô-đun Ruby thú vị nào khác chưa, hoặc bạn có thể nghĩ đến việc sử dụng khác cho `Abbrev` không?