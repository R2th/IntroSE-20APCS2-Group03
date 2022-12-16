Trong bài viết này, chúng ta sẽ tìm hiểu cách định nghĩa một function, đào sâu nghiên cứu về blocks, và cũng sẽ tìm hiểu về **chain** methods. Tất cả chúng có liên quan chặt chẽ tới nhau.
## Function definitions
Như chúng ta đã tìm hiểu ở các bài viết trước, function trong Ruby bao gồm tên và không có hoặc nhiều tham số: 
```ruby
>> puts "hello, world!"
hello, world!
```
Mặc dù thông thường ta thường bỏ qua dấu ngoặc đơn, tuy nhiên nó ta còn có thể viết theo cách có dấu ngoặc đơn như sau: 
```ruby
>> puts("hello, world!")
hello, world!
```
Một trong những nhiệm vụ quan trọng nhất trong lập trình là liên quan tới việc định nghĩa một function. Trong Ruby ta có thể thực hiện bằng cách sử dụng keyword **def**. Sau đây, chúng ta sẽ xem một ví dụ đơn giản trong REPL.
Chúng ta sẽ định nghĩa một function tên là **day_of_the_week**, nhận đối số là **Time**, và trả về tên ngày trong tuần bởi time đó. <br>
Hãy nhớ lại rằng object **Time** có method là wday trả về index của ngày đó trong tuần.  (zero-offset)
```ruby
>> now = Time.now
>> now.wday
=> 4
```
Tiện đây, tôi cũng giải thích một chút về thư viện **Date**, nó định nghĩa một constant cho các ngày trong tuần. 
```ruby
>> require 'date'
>> Date::DAYNAMES
=> ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
```
Và nó giúp chúng ta tìm thấy tên ngày trong tuần như sau: 
```ruby
>> Date::DAYNAMES[now.wday]
=> "Thursday"
```
Sẽ rất thuận tiện, khi chúng ta đóng gói định nghĩa này và logic trong function **day_of_the_week**, sao cho chúng ta có thể viết như này: `day_of_the_week(Time.now)`.
Kết hợp các thành phần bên trên, chúng ta có hàm như sau:
```ruby
>> def day_of_the_week(time)
?>   return Date::DAYNAMES[time.wday]
>> end
```
Chúng ta thấy rằng, một function Ruby sẽ bắt đầu với từ khóa **def**, theo sau là tên function và đối số tùy í; sau đó là **body** của function, nó xác định giá trị trả về của function; cuối cùng được kết thúc bởi từ khóa **end**. (nó tương đương với dấu ngoặc nhọn đóng **}** như trong ngôn ngữ C hoặc Javascript). Chúng ta có thể test thử như sau:
```ruby
>> day_of_the_week(Time.now)
=> "Thursday"
```
Function bên trên có vẻ khá đơn giản, chỉ là tìm phần tử tương ứng của mảng với giá trị wday. Cũng như nhiều ngôn ngữ khác, Ruby trả về giá trị thông qua sử dụng từ khóa **return**, nhưng trong thực tế thì từ khóa  **return** là không cần thiết. Thông thường, Ruby sẽ return ngầm, theo đó, biểu thực cuối cùng body của function sẽ được tự động return. Do đó, chúng ta có thể viết lại hàm **day_of_the_week** như sau: 
```ruby
>> def day_of_the_week(time)
?>   Date::DAYNAMES[time.wday]
>> end
```
## Functions in a file
Mặc dù định nghĩa hàm trong REPL khá tiện lợi để minh họa cho người khác xem, tuy nhiên nó khá cồng kềnh, cho nên cách tốt nhất là chúng ta viết nó vào file.
Chúng ta sẽ di chuyển hàm đã định nghĩa bên trên vào file hello_app.rb. Hãy nhớ lại cách viết chúng ta đã viết lần đầu tiên như sau:
```hello_app.rb
require 'sinatra'

get '/' do
  DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"]
  dayname = DAYNAMES[Time.now.wday]
  "Hello, world! Happy #{dayname}."
end
```
Bước đầu tiên, chúng ta cần định nghĩa function trong file. 
```hello_app.rb
require 'sinatra'

# Returns the day of the week for the given Time object.
def day_of_the_week(time)
  Date::DAYNAMES[time.wday]
end

get '/' do
  DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"]
  dayname = DAYNAMES[Time.now.wday]
  "Hello, world! Happy #{dayname}."
end
```
Sau đó, ta edit lại body trong **get**, sẽ được như sau:
```hello_app.rb
require 'date'

# Returns the day of the week for the given Time object.
def day_of_the_week(time)
  Date::DAYNAMES[time.wday]
end

get '/' do
  "Hello, world! Happy #{day_of_the_week(Time.now)}."
end
```
Chúng ta thử chạy để xem ứng dụng có chạy đúng như mong muốn hay không. `$ ruby hello_app.rb`

![](https://images.viblo.asia/7b09c46e-f3b2-4ff4-94f9-d59224776563.png)

Chúng ta có thể làm code bên trên trở nên gọn gàng hơn bằng cách di chuyển hàm **day_of_the_week** ra một file riêng biệt và include vào app của chúng ta. Trước tiên, ta tạo ra một file mới, **day.rb**: `touch day.rb`. Và thay đổi code một chút để dễ dàng nhận biết là code của chúng ta có hoạt động. Chú ý rằng, ta cần restart lại Sinatra server để code được cập nhật.
```day.rb
require 'date'

# Returns the day of the week for the given Time object.
def day_of_the_week(time)
  Date::DAYNAMES[time.wday]
end
```
```hello_app.rb
require 'sinatra'

get '/' do
  "Hello, world! Happy #{day_of_the_week(Time.now)}—now from a file!"
end
```
Để check xem code có chạy k, ta sẽ restart lại server và reload lại trình duyệt.<br>
Thật không may, app của chúng ta bị crashes ngay lập tức, và trả về Sinatra error page, và đó là một exception loại NoMethodError. Để biết chúng ta đã làm sai điều gì, thì hãy chú ý vào nội dung error message. Nó chỉ ra rằng **day_of_the_week** method chưa được defined. Và chúng ta cũng thấy được chính xác dòng code gây ra lỗi.

![](https://images.viblo.asia/cb251ceb-1753-4402-835a-cc13d8d1fb5b.png)

![](https://images.viblo.asia/ae5485f9-0627-47a9-a4f2-1c87b9eae75e.png)

Đây cũng là một kỹ thuật debug rất hữu ích: đó là, nếu chương trình Ruby của bạn bị lỗi, thì điều đầu tiên là phải đọc kỹ error messages. Và nếu vẫn không hiểu chính xác lỗi ở đâu, thì có thể google theo nội dung error messages.

> **Debugging Ruby**<br>
> Một trong những technique cần thiết khi lập trình đó là debug: làm sao để có thể nhanh chóng tìm ra và sửa lỗi trong chương trình. Dưới đây là một số phương pháp tìm ra được nguyên nhân lỗi trong chương trình của mình: 
> * Trace the execution with **puts**: Khi bạn cố gắng tìm ra nguyên nhân tại sao chương trình lại chạy không như ý, sẽ rất hữu ích khi ta cho hiển thị giá trị của biến bằng lệnh **puts**, và xóa đi khi fix xong bugs. Kỹ thuật này đặc biệt hữu ích khi kết hợp với **inspect** method, hàm này trả về thể hiện bằng chữ của object. Ví dụ, `puts array.inspect` hoặc` p array`
> * Stop the execution with **raise**: Sử dụng raise functon, nó sẽ raise lên một exception, đây là một kỹ thuật khá to tay vì nó sẽ stop toàn bộ chương trình, nhưng đối khi nó lại là phương pháp hữu ích. Ví dụ, `raise array.inspect`
> * Comment out code: Đây là một ý tưởng tốt, trong trường hợp bạn nghĩ đoạn code này là không liên quan tới vấn đề, và bạn cần tập trung focus đoạn code chạy không đúng. 
> * Use the REPL: Hãy mở irb lên, và paste đoạn code có vấn đề vào, đó là một cách tiện lợi để cô lập vấn đề. (Một kỹ thuật cao cấp hơn đó là sử dụng gem **pry**, nó cho phép chạy irb ngay trong app)
> * Google it: Nếu ta không thể tự mình tìm ra vấn đề, thì search google nội dung error message là một cách hay. (Nó thường dẫn chúng ta tới một số trang hữu ích như  [Stack Overflow](https://stackoverflow.com/) chẳng hạn...)

Nguyên nhân khiến app của chúng ta bị crash là do ta đã xóa hàm **day_of_the_week** ở file **hello_app.rb**, do đó app của chúng ta sẽ không hiểu hàm đó là gì. Giải pháp là chúng ta sẽ thêm lệnh **require** đối với file chứa function đó. Chú ý là, lệnh require sẽ bao gồm cả đường dẫn tương đối của file.
```hello_app.rb
require 'sinatra'
require './day'

get '/' do
  "Hello, world! Happy #{day_of_the_week(Time.now)}—now from a file!"
end
```

![](https://images.viblo.asia/6cde2c2b-1a7e-4b11-bba3-7168add2ff63.png)

Restart lại Sinatra server, và app của chúng ta đã hoạt động tốt.
## Method chaining
Trong phần này chúng ta cùng xây dựng **palindrome?** function, hàm này trả về **true** nếu đối số đầu vào khi đọc xuôi, đọc ngược đều giống nhau. Ngược lại, sẽ trả về **false**.
Hoặc chúng ta có thể hiểu về palindrome một cách đơn giản là "Một chuỗi và đảo ngược của chuỗi đó đều giống nhau." 
Và, method chaning nghĩa là gọi một chuỗi các thông điệp của một object cụ thể. Ngoài ra, ở các bài trước chúng ta đã tìm hiểu cách để tạo một mảng các ký tự đó là split bằng empty string:
```ruby
>> "racecar".split("")
=> ["r", "a", "c", "e", "c", "a", "r"]
```
Và cách đảo ngược một array thì như sau:
```ruby
>> a = [ 17, 42, 8, 99 ]
>> a.reverse()
=> [99, 8, 42, 17]
```
Và method **join** để undo lại method **split**:
```ruby
>> ["r", "a", "c", "e", "c", "a", "r"].join
=> "racecar"
```
Và, chúng ta có thể đảo ngược một string bằng cách dùng method chaining như sau:
```ruby
>> "Racecar".split("").reverse.join
=> "racecaR"
```
Hoặc là chúng ta có thể dụng method đơn giản hơn là **String#chars** method, nó sẽ trả về các ký tự của string như là một mảng: 
```ruby
>> "Racecar".chars.reverse.join
=> "racecaR"
```
Method này hoàn toàn phù hợp để sử dụng, và rất cần thiết trong những ngôn ngữ không hộ trở method chuyên dụng để đảo ngược một string (như là Javascript...). Tuy nhiên, Ruby có hỗ trợ sẵn method chuyên dụng cho đảo ngược string, thông qua **String#reverse** method: 
```ruby
>> "Racecar".reverse
=> "racecaR"
```
Tuy nhiên, để phát hiện palindromes như là “Racecar”, thì chúng ta cần kết hợp **reversing** và **downcasing**: 
```ruby
>> "Racecar".downcase.reverse
=> "racecar"
```
Với kiến thức ở trên, ta thử tạo palindrome method nhé. Đầu tiên, ta cần tạo file **palindrome.rb** để viết function của chúng ta: `$ touch palindrome.rb`
Hàm palindrome sẽ nhận vào một string và trả về true nếu string đó là palindrome, ngược lại sẽ trả về false.
```palindrome.rb
# Returns true for a palindrome, false otherwise.
def palindrome?(string)
  string == string.reverse
end
```
Ở trên, ta đã dùng phép so sánh **==**, cho nên Ruby sẽ tự động return về giá trị boolean.
Ta có thể test code bằng irb như sau:
`>> load './palindrome.rb'` <br>
Sử dụng **load** sẽ tốt hơn **require** như đã sử dụng ở các phần trên. Bởi vì, nó cho phép reload lại file nếu có thay đổi, còn **require** thì không cho phép ta làm điều đó. Và qua đó, ta có thể truy cập palindrome? từ REPL:
```ruby
>> palindrome?("racecar")
=> true
>> palindrome?("Racecar")
=> false
```
Method palindrome đã chỉ ra rằng **“Racecar”** không phải là một palindrome, do đó để làm cho function của chúng ta trở nên tổng quát hơn, ta cần **downcase** string trước khi so sánh như sau:
```palindrome.rb
# Returns true for a palindrome, false otherwise.
def palindrome?(string)
  string.downcase == string.downcase.reverse
end
```
Chúng ta thử chạy lại và kiểm tra:
```ruby
>> load './palindrome.rb'
>> palindrome?("Racecar")
=> true
```
-> Đã trả về true. <br>
Cuối cùng, ta sẽ áp dụng nguyên tắc **DRY**(Don’t Repeat Yourself) để loại bỏ sự trùng lặp trong đoạn code ở trên. Xem lại đoạn code trên, ta thấy rằng **string.downcase** đã được sử dụng 2 lần. Do đó, ta sẽ khai báo 1 biến mới là **processed_content** giữ giá trị string để so sánh với string đảo ngược. 
```palindrome.rb
# Returns true for a palindrome, false otherwise.
def palindrome?(string)
  processed_content = string.downcase
  processed_content == processed_content.reverse
end
```
Đoạn code bên trên đã giúp ta giảm 1 lần gọi **downcase**, tuy nhiên lại phải viết thêm 1 dòng. Nhìn có vẻ nó không hẳn là đã cải tiến hơn, nhưng với việc khai báo 1 biến riêng biệt sẽ giúp chúng ta linh hoạt hơn nhiều trong việc phát hiện và xử lý một palindromes phức tạp. <br>
Cuối cùng, ta chạy lại xem function palindrome? có còn hoạt động chính xác không.
```ruby
>> load './palindrome.rb'
>> palindrome?("Racecar")
=> true
>> palindrome?("Able was I ere I saw Elba")
=> true
```
## Blocks
**Blocks** là một trong những đặc trưng và cấu trúc hữu ích nhất trong Ruby. Chúng ta đã nhìn thấy nó ở trong các phần và bài viết trước. Tuy nhiên, trong phần này ta sẽ tập trung tìm hiểu sâu hơn về cách nó hoạt động. <br>
Chúng ta sẽ bắt đầu với một block đơn giản, đó là in ra lũy thừa của 2: 
```ruby
>> (1..5).each { |i| puts 2**i }
2
4
8
16
32
```
Đoạn code bên trên đã gọi hàm **each** trong phạm vi **(1..5)** và có blocks là **{ |i| puts 2 * i }**. Trong đó, các thanh dọc bao quanh tên biến **|i|** đó là cú pháp của Ruby gọi là **block variable**. Trong trường hợp này, method **each** có thể xử lý block với single local variable, mà chúng ta đã đặt là **i**, và chỉ thực hiện block này trong phạm vi đã đặt ra. <br>
Chúng ta có thể dùng dấu ngoặc nhọn để khoanh vùng một block như trên, hoặc có thể viết theo cách như sau:
```ruby
>> (1..5).each do |i|
?>   puts 2**i
>> end
2
4
8
16
32
=> 1..5
```
Blocks thì có thể là một hay nhiều dòng. Thông thường, chúng ta sẽ tuân theo convention là dùng dấu ngoặc nhọn cho method ngắn (trong 1 dòng) và dùng **do..end** cho method dài (viết trên nhiều dòng).
```ruby
>> (1..5).each do |number|
?>   puts 2 ** number
>>   puts '--'
>> end
2
--
4
--
8
--
16
--
32
--
```
Ở trên, ta đã thay tên biến từ **i** thành **number**, để nhấn mạnh rằng tên biến là tùy ý, bạn có thể đặt bất cứ tên gì.<br>
Và chúng ta có thể nghĩ blocks như là những hàm vô danh (chưa được đặt tên) (anonymous (unnamed) functions) mà chúng ta có thể tạo ngay khi cần. Nếu bạn đã tìm hiểu về Javascript, bạn sẽ thấy cách sử dụng này khá quen thuộc, đó là nó bao gồm một function chưa được đặt tên để in ra các phần tử trong mảng Javascript :
```ruby
> ["ant", "bat", "cat", 42].forEach(function(element) {
  console.log(element);
});
ant
bat
cat
42
```
Một Ruby block có thể được xem như là một cách để làm tương tự như đoạn code Js bên trên mà không cần phải include một hàm riêng biệt. 
```ruby
>> ["ant", "bat", "cat", 42].each do |element|
?>   puts element
>> end
ant
bat
cat
42
```
Có lẽ rằng, **each** là method phổ biến nhất để sử dụng trong block, tuy nhiên cũng còn nhiều hàm khác tương tự, như là method **times** sẽ thực hiện lặp một block đã cho trong một số lần nhất định: 
```ruby
>> 3.times { puts "Betelgeuse!" }   # `times` takes a block with no variables.
"Betelgeuse!"
"Betelgeuse!"
"Betelgeuse!"
```
## Yield
Chúng ta có thể phát triển sự hiểu biết về blocks bằng cách sử dụng chúng trong một vài function của chúng ta. Chú ý rằng, (1) mọi Ruby method có thể lấy 1 block và (2) ta có thể gọi block bằng cách sử dụng từ khóa **yield**. Hãy xem sét một vài ví dụ cụ thể để hiểu cách nó hoạt động như thế nào nhé: <br>
Đầu tiên, ta tạo một file mới: `$ touch blocks.rb`. <br>
Sau đó, ta định nghĩa một function tên là **sandwich**, và  **yields một block** sẽ nằm giữa 2 lệnh **puts**
```blocks.rb
def sandwich
  puts "top bread"
  yield
  puts "bottom bread"
end
```
Vậy **yields một block**  nghĩa là gì? Đó là một cách cho chạy qua **sandwich** một block.
```blocks.rb
def sandwich
  puts "top bread"
  yield
  puts "bottom bread"
end

sandwich do
  puts "mutton, lettuce, and tomato"
end
```
Chạy file trên, ta có kết quả như sau:
```ruby
$ ruby blocks.rb
top bread
mutton, lettuce, and tomato
bottom bread
```
Một lợi thế của Ruby's block đó là nó sẽ không hiển thị cho tới khi từ khóa **yield** xuất hiện. <br>
Ví dụ tiếp theo đó là về **tag** function, hàm này sẽ wrap text vào trong thẻ HTML đã truyền vào. Ở ví dụ này, chúng ta tìm hiểu cách dùng block variable như thế nào. 
```blocks.rb
.
.
.
def tag(tagname, text)
  html = "<#{tagname}>#{text}</#{tagname}>"
  yield html
end
```
Ở trên, ta đã định nghĩa một function có nhiều tham số, giữa các tham số cách nhau bằng giấu phẩy.
Sau đó, ta truyền vào **tag** function 2 tham số yêu cầu đó là, **tagname** và **text** và một block thể hiện HTML markup.
```blocks.rb
.
.
.
def tag(tagname, text)
  html = "<#{tagname}>#{text}</#{tagname}>"
  yield html
end

# Wrap some text in a paragraph tag.
tag("p", "Lorem ipsum dolor sit amet") do |markup|
  puts markup
end
```
Chạy đoạn code trên, ta được kết quả như sau:
```ruby
$ ruby blocks.rb
top bread
mutton, lettuce, and tomato
bottom bread
<p>Lorem ipsum dolor sit amet</p>
```

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*