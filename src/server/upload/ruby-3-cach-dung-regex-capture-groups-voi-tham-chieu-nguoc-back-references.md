- Bài viết được dịch từ bài [3 ways to use Regexp capture groups with back-references in Ruby](https://medium.com/rubycademy/3-ways-to-use-regexp-capture-groups-with-back-references-in-ruby-b4969cc9b3ec) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/700/1*0nRMOC_fy33mSYM5uyISYg.png)

> Lợi dụng các Regexp capture groups để xử lý so khớp các chuỗi trong Ruby
-----
### Nhắc qua về Regexp và các capture groups
Trong Ruby, logic Regexp được đóng gói trong lớp Regexp. Có 3 cách để khởi tạo một `Regexp`
```ruby
Regexp.new(".*").class # => Regexp
/.*/.class             # => Regexp
%r{.*}.class           # => Regexp
```
Vì vậy, câu hỏi tiếp theo là: làm thế nào để `Regexp#match` này với một `String`?
```ruby
/I love Ruby/.match('I love Ruby') # => #< MatchData "I love Ruby">
```
Phương thức  `Regexp#match` trả về một instance của MatchData. Lớp MatchData *đóng gói tất cả các kết quả của một pattern match*. Tôi mời bạn [đọc tài liệu chính thức](https://ruby-doc.org/core-2.5.0/MatchData.html) để tìm hiểu những gì bạn có thể làm với một instance của MatchData. Ví dụ: bạn có thể sử dụng `MatchData#to_a` để lặp lại các kết quả.
### Toán tử Pattern-Matching `=~`
Để dễ sử dụng các Regexp, Ruby cung cấp cú pháp sugar `=~`. Toán tử này so khớp một Regexp với một chuỗi.
```ruby
# The =~ operator returns the index of the first letter of the first matching occurence
/(rubycademy)/ =~ "https://www.rubycademy.com" # => 12
"https://www.rubycademy.com" =~ /(rubycademy)/ # => 12

# Note that the operator returns nil if no matching found
/lol/ =~ "It's not funny" # => nil
```
Lưu ý rằng tất cả các magic variable được set bởi vì toán tử `=~` khởi tạo một MatchData nếu regexp khớp với Chuỗi.
### Capture Groups
Một cách thú vị để sử dụng Regexp trong Ruby là tận dụng các Capture Groups. Với các Capture Groups, chúng ta có thể *chụp* một phần của `match` và sử dụng lại sau đó. Để *chụp* một kết quả phù hợp, chúng ta đặt phần chúng ta muốn *chụp* trong dấu ngoặc đơn.
```ruby
if /(hello) (world)/ =~ "hello world"
  puts "#{$2} #{$1}" # => "world hello"
end
```
Ở đây, chúng ta truy cập nội dung của 2 groups capture - pattern nằm giữa dấu ngoặc đơn - bằng cách sử dụng các biến toàn cục `$n` trong đó n là vị trí chỉ mục của groups capture trong regexp.
### Đặt tên Named Captures
Tính năng capture được đặt tên, khi nó được sử dụng với toán tử `=~`, có một cơ chế mạnh mẽ tự động gán kết quả của một matching group phù hợp vào một biến cục bộ bằng cách sử dụng tên được gán cho group vào Regexp
```ruby
if /(?<domain>rubycademy)/ =~ 'https://www.rubycademy.com'
  p domain # => "rubycademy"
end
```
Tính năng Named Capture cũng khả dụng với method `Regexp#match`. Sự khác biệt chính là không có biến được tạo ra. Thật vậy, các bản Named Capture có sẵn trong instance MatchData được trả về bằng cách sử dụng method `MatchData#[]`
```ruby
if projects = /(?<domain>rubycademy)/.match('https://www.rubycademy.com')
  p projects['domain'] # => "rubycademy"
end
```
### Capture groups và back-references
Capture groups và *tham chiếu ngược* - back-references là một số tính năng thú vị hơn của Regexp. Bạn đặt một biểu thức con trong dấu ngoặc đơn, bạn truy cập vào lệnh bắt bằng `\1`
```ruby
/(hello) \1/ =~ "hello hello" # => 0
```
Ở đây, `\1` đề cập đến Capture group được khai báo đầu tiên `(hello)`. Nếu bạn khai báo hai capture group thì bạn có thể tham chiếu đến từng nhóm này bằng cách sử dụng `\1` và `\2`.

Capture group và *tham chiếu ngược* trở lại thật dễ dàng và thú vị. Nhưng Ruby cho phép bạn tiến xa hơn nữa. Thật vậy, Ruby cho phép bạn truy cập các Capture group bên ngoài Regexp bằng cách sử dụng back-references. Hãy xem 3 ví dụ để làm quen với khái niệm này.
### Sử dụng back-references trong Ruby
Tại đây, bạn sẽ thấy cách Ruby tận dụng đặc điểm Regexp để mở rộng lớp String một cách trang nhã.
```ruby
html = <<-HTML
<html>
 <head>
 </head>
 <body class="home-index">
 </body>
</html>
HTML

# This call captures all the html code within the `html` tag
html[/<(html)>(.+)<\/\1>/m, 2] # => "\n<head>\n</head>\n<body class=\"home-index\">\n</body>\n"
```
Ở đây, chúng ta có thể thấy rằng để tránh phải viết lại html trong regexp, chúng ta sử dụng back-references `\1` đến Capture group đầu tiên (html). Pattern này giúp chúng ta tránh dư thừa trong regexp của chúng ta.

Kỹ thuật này chủ yếu được sử dụng để tránh dư thừa và tăng cường khả năng đọc cho Regexp của bạn. Nhưng khi bạn phải đối phó với một số Capture group, việc sử dụng tham chiếu ngược có thể nhanh chóng khiến regexp của bạn không thể đọc được. Đó là lý do tại sao, một phương pháp hay là chú thích các Capture group bằng chỉ mục back-references của chúng để duy trì khả năng đọc của Regexp `\1 : (html) , \2 : (head)`, v.v
### Phưởng thức kinh điển String#gsub 
```ruby
def to_https(url)
  url.gsub(/(http)(?!s)/, '\1s')
end

to_https('http://www.rubycademy.com')  # => "https://www.rubycademy.com"
to_https('https://www.rubycademy.com') # => "https://www.rubycademy.com"

url = 'For further information: http://www.rubycademy.com'
to_https(url) # => "For further information: https://www.rubycademy.com"
```
Ở đây, phương thức `to_https` convert url `http` thành `https`. Để làm như vậy, chúng ta sử dụng phương thức `gsub` với đối số là:
* một regexp đại diện cho chuỗi con cần thay thế — nó bao gồm http (`(http)`) và loại trừ các ký tự `s` (`(?! s)`) phía sau
* chuỗi thay thế bằng back-reference đến capture group đầu tiên `(http)` the replacing string with a  to the first  (http)


Điều này thể hiện sự quan tâm mà Ruby dành cho các nhà phát triển. Thật vậy, trong phương thức `String#gsub`, chuỗi thay thế có thể bao gồm các back-reference đến các capture group trong biểu thức chính quy!

![](https://miro.medium.com/max/500/1*wiX40f7oFFYHD1lksCxEXQ.gif)
> Nhân tiện, hãy xem [tài liệu Ruby chính thức](https://ruby-doc.org/core-2.7.2/Regexp.html#class-Regexp-label-Anchors) nếu bạn không quen với khái niệm `(?!)`

### Back-referencing named groups
```ruby
def to_https(url)
  url.gsub(/(?<scheme>http)(?!s)/, '\k<scheme>s')
end

to_https('http://www.rubycademy.com')  # => "https://www.rubycademy.com"
to_https('https://www.rubycademy.com') # => "https://www.rubycademy.com"

url = 'For further information: http://www.rubycademy.com'
to_https(url) # => "For further information: https://www.rubycademy.com"
```
Ở đây chúng ta tái hiện hành vi tương tự như ví dụ trước. Thay đổi duy nhất là chúng ta sử dụng các named groups thay vì capture groups. Vì vậy, trong chuỗi con thay thế, chúng ta sử dụng `\k` theo sau là nhãn của named groups giữa các chữ cái `\k<scheme>` để Back-reference đến named group trong patterm được truyền làm đối số đầu tiên.
### Phần kết luận
Kết hợp các capture groups và  back-references là một công cụ mạnh mẽ có thể nâng cao khả năng đọc code của bạn. Tuy nhiên, có một phương pháp hay đó là chú thích các capture groups bằng các chỉ mục back-references  để duy trì khả năng đọc của biểu thức chính quy của bạn.