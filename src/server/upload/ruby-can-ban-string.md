**String**  có lẽ là kiểu dữ liệu quan trọng nhất trong mọi ngôn ngữ. Nó được sử dụng trong mọi loại ứng dụng mà chúng ta đã từng viết. Nó cũng có thể được gọi là một nguyên liệu thô của Web. Do đó, String là nơi tuyệt vời để bắt đầu tìm hiểu về ngôn ngữ lập trình Ruby. 

## String basics
String được tạo thành từ các chuỗi ký tự theo thứ tự cụ thể. Hãy xem điều gì sẽ xảy ra khi ta gõ một String (Không dùng **puts**) vào Ruby.
```cpp
irb(main):006:0> "hello, world!"<br>
=> "hello, world!"
```
Ở đây chúng ta đã nhập vào một chuỗi ký tự được gọi là string và bắt đầu bằng dấu nháy kép **"**. Và REPL (Read-Evaluate-Print Loop) sẽ in ra kết quả của dòng là chính string đó.<br>
Có một chuỗi quan trọng - đáng chú ý đó là một chuỗi không có nội dung, chỉ bao gồm 2 dấu nháy kép. Chúng ta gọi đó là một **empty string**  .
```scala:scala:scala
>> ""
=> ""
```
## Concatenation and interpolation
2 trong số những thao tác quan trọng nhất đối với string đó là **concatenation** (nối chuỗi) và **interpolation** (nội suy - truyền giá trị của biến vào string ). Chúng ta sẽ bắt đầu với  **concatenation** bằng cách sử dụng toán tử **+** .
```ruby
$ irb
>> "foo" + "bar"             # String concatenation
=> "foobar"
>> "ant" + "bat" + "cat"     # Multiple strings can be concatenated at once.
=> "antbatcat"
```
Ở đây, khi nối "foo" với "bar" ta được một string mới là "foobar".<br>
Chúng ta hãy thử nhìn concatenation string trong ngữ cảnh sử dụng các variables (biến). Đó là, bạn hãy cứ nghĩ rằng đó là các hộp được đặt tên, và có chứa giá trị trong đó. <br>
> **Variables and identifiers**
> <br>Nếu bạn chưa bao giờ làm quen với ngôn ngữ lập trình, có thể bạn sẽ thấy lạ lẫm với thuật ngữ variable. Nó là một ý tưởng thiết yếu trong khoa học máy tính. Bạn có thể nghĩ về variable như là một chiếc hộp được đặt tên, trong đó giữ nội dung- giá trị khác nhau. 
> <br> Để dễ hiểu hơn, bạn có thể xem hình ảnh dưới đây. Đó là những khoang- hộp được dán nhãn, mà nhiều trường cung cấp cho học sinh để cất quần áo, sách vở, balo ... Và ta gọi là variable là vị trí của hộp,  nhãn của hộp là tên của variable (hay còn gọi là identifier), và thứ chứa trong hộp gọi là giá trị của variable. <br>
> Trong thực tế thì, các định nghĩa khác nhau này thường xuyên bị xáo trộn hay lẫn lộn. Và variable thường được dùng cho bất kỳ khái niệm nào trong 3 khái niệm trên (location, label, hay value).<br>
> 

![](https://images.viblo.asia/ab15656e-85af-417d-bed3-bd76e2a9596e.jpg)

Thử làm một ví dụ cụ thể, ta thử tạo 2 biến cho first name và last name bằng cách sử dụng dấu **=** như dưới đây : <br>
```ruby
>> first_name = "Michael"
>> last_name  = "Hartl"
```
Ở đây, Liên kết **=** đã gán giá trị "Michael"  cho first_name và "Hartl" cho last_name. <br>
Và biến first_name và last_name đang được viết theo quy tắc snake case (Đây là convention phổ biến nhất cho cách đặt tên biến của Ruby. Ngược lại, đối với Class của Ruby, khi đặt tên sẽ tuân theo convention CamelCase)

![](https://images.viblo.asia/01e51425-fff9-41b3-9f6f-1a24b66ab3d8.jpg)

Khi đã định nghĩa các tên biến ở trên, ta có thể sử dụng chúng để gép first name và last name, đồng thời cũng chèn thêm một khoảng trắng ở giữa.
```scala:scala:scala
>> first_name + " " + last_name
=> "Michael Hartl"
```
Cũng có cách khác để tạo string đó là thông qua interpolation (nội suy) bằng cách sử dụng ký hiệu # và dấu ngoặc nhọn **#{...}**.<br>
```ruby
>> "#{first_name} is my first name."
=> "Michael is my first name."
```
Ở đây, Ruby sẽ tự động chèn giá trị của biến first_name vào string ở ví trị ta đã chỉ định.  Cụ thể, thay vì dùng khoảng trắng chúng ta có thể dùng interpolation như cách dưới đây: 
```ruby
>> first_name + " " + last_name     # Concatenation, with a space in between
=> "Michael Hartl"
>> "#{first_name} #{last_name}"     # The equivalent interpolation
=> "Michael Hartl"
```
2 biểu thức bên trên là tương đương nhau, nhưng t thích cách dùng interpolation hơn, vì ta đỡ mất công chèn vào ký tự khoảng trắng.
## Single-quoted strings
Ở tất cả các ví dụ bên trên, ta đã sử dụng dấu nháy kép, tuy nhiên Ruby cũng support dấu nháy đơn. Đối với nhiều mục đích khác nhau, 2 loại trên tương đối giống nhau.
```ruby
>> 'foo'          # A single-quoted string
=> "foo"
>> 'foo' + 'bar'
=> "foobar"
```
Điếm khác biệt quan trọng ở đây đó là, dấu nháy kép được biết đến như là **raw strings**. Ví dụ, Ruby sẽ không thể thực hiện nội suy trong string sử dụng dấu nháy đơn : 
```ruby
>> '#{first_name} #{last_name}'     # No interpolation!
=> "\#{first_name} \#{last_name}"
```
Quan sát giá trị trả về trong dấu nháy kép, ta thấy no yêu cầu dấu gạch chéo ngược \ để thoát khỏi sự kết hợp ký tự đặc biệt như là **#{**.
## Printing
Tiếp theo chúng ta sẽ tìm hiểu cách mà Ruby in một string ra màn hình. <br>
Sử dụng hàm **puts**
```cpp
>> puts "hello, world!"     # Print output
hello, world!
=> nil
```
Function này hoạt động như một [side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) (Hiệu ứng lề). Nó hướng tới việc fuction đã thực hiện hơn là việc return giá trị.
`puts "hello, world!"` sẽ in string ra màn hình và return nil. Nil là viết ngắn gọn của chữ Latin **nihil**, nghĩa là **nothing**.
<br>Chú ý rằng cách viết dưới đây cũng hoàn toàn hợp lệ trong ruby.  **Puts** có thể được gọi cùng với dấu ngoặc đơn.
```cpp
>> puts("hello, world!")
"hello, world!"
=> nil
```
Một function tương tự puts đó là **print**. Nó cũng in giá trị ra màn hình như không tự động chèn vào ký tự xuống dòng.
```cpp
>> print "hello, world!"
hello, world!=> nil
```
Khi dùng print, chúng ta có thể xuống dòng bằng cách chèn thêm ký tự \n.
```cpp
>> print "hello, world!\n"
hello, world!
=> nil
```
## Attributes, booleans, and control flow
Mọi thứ trong Ruby, bao gồm cả String đều là object. Điều này có nghĩa là chúng ta có thể nhận được nhiều thông tin hữu ích về string cùng với việc sử dụng dấu chấm . để gọi những thuộc tính tiện ích.
<br> Chúng ta sẽ bắt đầu bằng cách truy cập vào các string attribute, đó là một phần data được gắn vào object. Cụ thể là, trong console, chúng ta có thể dụng attribute **length** để tìm số lượng ký tự trong một string. 
```html:html:html
$ irb
>> "badger".length    # Accessing the "length" property of a string
=> 6
>> "".length          # The empty string has zero length.
=> 0
```
Attribute **length** đặc biệt hữu ích khi sử dụng để so sánh, ví dụ như kiểm tra độ dài của string để so sánh với một giá trị cụ thể. <br>
```html:html:html
>> "badger".length > 3
=> true
>> "badger".length > 6
=> false
>> "badger".length >= 6
=> true
>> "badger".length < 10
=> true
>> "badger".length == 6
=> true
```
Ở dòng cuối cùng đã sử dụng toán tử so sánh là **==**, về điều này thì Ruby cũng tương tự như các ngôn ngữ khác. (Và chú ý rằng, cũng tương tự như Javascript, Ruby cũng support toán tử **===**)
<br>Các giá trị return về ở phép so sánh trên luôn trả về là true hoặc false. Nó được gọi là giá trị boolean. <br>
Giá trị Boolean đặc biệt hữu ích cho **control flow** (điều khiển luồng). Nó cho phép chúng ta thực hiện các hành động dự trên kết quả so sánh. 
```html:html:html
>> password = "foo"
=> "foo"
>> if (password.length < 6)
>>   "Password is too short."
>> end
=> "Password is too short."
```
Ở đoạn code bên trên, ta thấy đằng sau lệnh so sánh **if** là dấu ngoặc đơn, và câu lệnh **if** được kết thúc bằng từ khóa **end**. Phần phía sau là bắt buộc, tuy nhiên ở trong Ruby dấu ngoặc đơn đó là optional, và chúng ta thường không viết dấu ngoặc đơn, như ở dưới đây: 
```html:html:html
>> if password.length < 6
>>   "Password is too short."
>> end
=> "Password is too short."
```
Các đoạn code ở trên cũng tuân theo quy tắc thụt đầu dòng (indentation). Nó không liên quan tới cú pháp bắt buộc của Ruby nhưng nó rất quan trọng đối với người review hay đọc code. <br>
> **Code formatting**
> <br> Các đoạn code sample trong bài viết này được viết một cách dễ đọc và dễ hiểu nhất. Ruby thì không quan tâm tới những format đó, nhưng nó rất quan trọng đối với developer hay người đọc code. <br>
> Dưới đây là một số hướng dẫn chung để ta có thể viết code có format tốt. <br>
> * Indent để biểu thị cấu trúc của một block.
> * Dùng 2 spaces cho indent. Nhiều developers sử dụng 4 hoặc 8 spaces, tuy nhiên tôi thấy 2 spaces là đủ để biểu thị một block rõ ràng, và cũng là để tiết kiệm không gian ngang chật hẹp. 
> * Thêm một dòng mới để biểu thị cấu trúc logic. Một điều tôi đặc biệt muốn làm đó là add thêm một dòng mới sau một chuỗi các công việc gán giá trị, hay khởi tạo biến. Điều đó biểu thị rằng, công việc setup ban đầu đã hoàn tất, và có thể bắt đầu code. 
> * Giới hạn dòng trong 80 ký tự. Đây là một ràng buộc cũ, bắt đầu từ việc các thiết bị đầu cuối trước đây có chiều rộng 80 ký tự. Rất nhiều developers ngày nay vi phạm ràng buộc này, và coi như nó đã lỗi thời. Tuy nhiên, theo kinh nghiệm của tôi, giới hạn trong 80 ký tự là một quy tắc tốt, (ví dụ như bạn phải dùng code của bạn trong các tài liệu với yêu cầu chiều rộng nghiêm ngặt hơn như là trong cuốn sách chẳng hạn. ) giúp người đọc code dễ đọc và dễ hiểu hơn. 
> 
Tiếp theo chúng ta sẽ tìm hiểu cách sử dụng hàm **else**, hàm này đóng vai trò thực hiện việc mặc định nếu so sánh đầu tiên là sai. 
```
>> password = "foobar"
>> if password.length < 6
>>   "Password is too short."
>> else
>>   "Password is long enough."
>> end
=> "Password is long enough."
```
Dòng đầu tiên, define lại password bằng cách gán cho nó một giá trị mới, sau khi gán lại giá trị thì biến password có độ dài là 6, do đó **password.length < 6** sẽ trả về **false**. Kết quả là, code bên trong hàm if không được chạy qua, mà chương trình sẽ chạy vào nhánh **else**,  và in ra kết quả là: `"Password is long enough."`
<br> Ruby còn có một từ khóa khác đó là **elsif** có nghĩa là **“else if”**, 
```
>> password = "goldilocks"
>> if password.length < 6
>>   "Password is too short."
>> elsif password.length < 50
>>   "Password is just right!"
>> else
>>   "Password is too long."
>> end
=> "Password is just right!"
```
Chú ý là, Ruby cũng cho phép chúng ta đặt lệnh if ở phía sau, đối với trường hợp code chỉ trên 1 dòng.
```
>> password = "foo"
>> "Password is too short." if password.length < 6
=> "Password is too short."
```
Và lệnh **if** là phủ định của **unless** với sự so sánh ngược lại.
```
>> "Password is too short." unless password.length >= 6
=> "Password is too short."
```
Về cơ bản chúng ta thường sử dụng **if**, tuy nhiên trong một số trường hợp sử dụng **unless** có thể tốt hơn.
## Combining and inverting booleans
Booleans có thể được kết hợp hay đảo ngược bằng cách sử dụng các toán tử như **&** (“and”), **||** (“or”), and **!** (“bang” or “not”) .
<br>Hãy bắt đầu với **&&**. Khi so sánh hai booleans với **&&**, cả 2 phải là **true** thì kết quả mới là **true**.
Ví dụ tôi nói tôi muốn khoai tây chiên và khoai tây nướng. Thì để sau khi kết hợp lại nó là true, nếu tôi trả lời đúng cho cả 2 câu hỏi, "Bạn có muốn khoai tây chiên không?" và "Bạn có muốn khoai tây nướng không?". Nếu câu trả lời của tôi chỉ là một trong hai, thì sau khi kết hợp nó sẽ là false. Kết quả của sự kết hợp sẽ được liệt kê trong bảng dưới đây, nó được gọi là **truth table**.
```
>> true && false
=> false
>> false && true
=> false
>> false && false
=> false
>> true && true
=> true
```
Bạn có thể áp dụng nó vào biểu thức cụ thể như sau: 
```
>> x = "foo"
>> y = ""
>> if x.length == 0 && y.length == 0
>>   "Both strings are empty!"
>> else
>>   "At least one of the strings is nonempty."
>> end
=> "At least one of the strings is nonempty."
```
Ta thấy kết quả của y.length là 0, kết quả của x.length sẽ khác 0, khi kết hợp lại sẽ trả về **false** do đó sẽ nhảy sanh nhánh else để xử lý. <br>
Ngược lại với toán tử &&, thì toán tử **||** sẽ trả về true, nếu có bất kỳ giá trị nào là true. Hãy tham khảo bảng giá trị bên dưới <br>
```
>> true || false
=> true
>> false || true
=> true
>> true || true
=> true
>> false || false
=> false
```
Thử áp dụng toán tử ||, ta sẽ được kết quả như sau: 
```
>> x = "foo"
>> y = ""
>> if x.length == 0 || y.length == 0
>>   "At least one of the strings is empty!"
>> else
>>   "Neither of the strings is empty."
>> end
=> "At least one of the strings is empty!"
```
Ngoài && và ||, Ruby còn hỗ trợ phủ định thông qua toán tử "not" ! (Phát âm là "bang"). Tác dụng của nó là đảo ngược true thành false, hoặc false thành true. 
```
>> !true
=> false
>> !false
=> true
```
Bạn có thể sử dụng như trong câu điều kiện ở trên, hoặc sử dụng kết hợp với dấu ngoặc đơn (, như ở dưới đây: 
```
>> x = "foo"
>> if !(x.length == 0)
>>   "x is not empty."
>> else
>>    "x is empty."
>> end
=> "x is not empty."
```
Cách viết như trên là hợp lệ trong Ruby, vì đơn giản nó chỉ phủ định câu **x.length == 0**, và trả về giá trị **true**.
```
>> !(x.length == 0)
=> true
```
Tuy nhiên, trong trường hợp này có cách viết phổ biến hơn, đó là sử dụng toán tử **!=** ("not equals").
```
>> if x.length != 0
>>   "x is not empty."
>> else
>>    "x is empty."
>> end
=> "x is not empty"
```
Ở trên, chúng ta không còn phủ nhận toàn bộ biểu thức nên không cần dùng dấu ngoặc đơn.
## Bang bang
Không phải tất cả booleans đều là kết quả của sự so sánh, trên thực tế mọi object của Ruby đều có giá trị là true hoặc false trong bối cảnh boolean. Chúng ta có thể ép buộc Ruby sử dụng ngữ cảnh boolean bằng cách sử dụng toán tử **!!** (phát âm là "bang bang") . Bởi vì, **!** sẽ convert true thành false, và **!!** sẽ đưa chúng về trạnh thái boolean ban đầu. 
```
>> !!true
=> true
>> !!false
=> false
```
Bằng cách sử dụng thủ thuật này, sẽ cho phép ta thấy rằng một string như là **"foo"** sẽ trả về **"true"** trong ngữ cảnh boolean.
```
>> !!"foo"
=> true
```
Và thực tế, một empty string sẽ cũng trả về **true** trong ngữ cảnh boolean. 
```
>> !!""
=> true
```
Và, **0** cũng là **true** trong Ruby.
```
>> !!0
=> true
```
Ngoài **false**, thì còn một đối tượng Ruby cũng trả về false trong ngữ cảnh boolean đó là **nil**.
```
>> !!nil
=> false
```
## Methods
Như đã đề cập ở bên trên, object string của Ruby có một attribute là length, nhưng trên thực tế Ruby không có sự phân biệt cơ bản giữa **attributes** và **methods**, t cũng có thể nghĩ nó như là những thông điệp truyền tới object và yêu cầu object trả về một giá trị nào đó. <br>
Trong ngôn ngữ lập trình hướng đối tượng, một khởi tạo string sẽ trả về một số method cụ thể. Ví dụ, string sẽ trả về method **length** với việc return về độ dài của string. <br>
Có một class method quan trọng đó là method **boolean**, nó trả về giá trị **true** hoặc **false**. Khác với ngôn ngữ khác, Ruby cho phép dấu câu trong tên method, và boolean method trong Ruby thường kết thúc bằng dấu chấm hỏi **?**. 
```
>> "badger".empty?
=> false
>> "".empty?
=> true
```
Ở đây ta thấy rằng method **empty?** sẽ return **true** cho empty string, và ngược lại. <br>
Chúng ta có thể dùng method **empty?** để viết lại đoạn code ở phía trên, sao cho chúng tự nhiên hơn.
```
>> if x.empty? && y.empty?
>>   "Both strings are empty!"
>> else
>>   "At least one of the strings is nonempty."
>> end
=> "At least one of the strings is nonempty."
```
String cũng hỗ trợ rất nhiều các method giúp biến đổi chuỗi. Ví dụ, string hỗ trợ method **downcase** giúp convert tất cả ký tự về chữ thường.
```ruby
>> "HONEY BADGER".downcase
=> "honey badger"
```
Có chú ý là method **downcase** sẽ return về một string mới mà không làm biến đổi, hay thay đổi string gốc.
```ruby
>> animal = "HONEY BADGER"
>> animal.downcase
=> "honey badger"
>> animal
=> "HONEY BADGER"
```
Method này khá hữu dụng trong một số trường hợp, ví dụ như chuẩn hóa thành chữ viết thường trong địa chỉ email.
```ruby
>> first_name = "Michael"
>> username = first_name.downcase
>> "#{username}@example.com"    # Sample email address
=> "michael@example.com"
```
Chắc bạn cũng có thể đoán được, đó là Ruby cũng support các thao tác ngược lại, đó là **upcase**.
```ruby
>> last_name.upcase
=> "HARTL
```
Ngoài ra khi xem document của Ruby, thì có rất nhiều method hữu ích hỗ trợ xử lý string. Hãy thử xem một số phương thức dưới đây: 
![](https://images.viblo.asia/282c79be-c7f6-4bf0-882b-edac9bc282be.png)

Trong list trên, chúng ta thử xem xét method sau: <br>
`include? other_str → true or false`
<br>Method này có truyền vào đối số là **other_str** và sẽ return về **true** hoặc **false**. Giống như method **empty?**, method này cũng kết thúc bằng dấu hỏi **?**, cho thấy rằng đây cũng là boolean method.
Như ta thấy ở trên thì dấu ngoặc đơn là optional (có thể có hoặc không). 
```ruby
>> "hello".include? "lo"
=> true
>> "hello".include? "ol"
=> false
>> "hello".include? ?h
=> true
```
Như đã thấy ở trên, method **include?** sẽ trả về **true**, nếu nó có chứa string hoặc ký tự đã cho. <br>
Ở dòng thứ 3 ở trên, bạn có thấy bối rối hay khó hiểu với đối số truyền vào là **?h** không ? Thực ra nó là cú pháp trước đây, và tôi đã kiểm tra lại bằng irb và thấy rằng **?h** thì cũng giống như **"h"** thôi. <br>
Mặc dù, chúng ta có thể bỏ qua dấu ngoặc đơn, nhưng tôi thích sử dụng dấu ngoặc đơn hơn. Hãy xem thêm một số ví dụ mở rộng bên dưới nữa nhé. 
```ruby
>> soliloquy = "To be, or not to be, that is the question:"
>> soliloquy.include?("To be")        # Does it include the substring "To be"?
=> true
>> soliloquy.include?("question")     # What about "question"?
=> true
>> soliloquy.include?("nonexistent")  # This string doesn't appear.
=> false
>> soliloquy.include?("TO BE")        # String inclusion is case-sensitive.
=> false
```
Ta thấy rằng **String#include?** (Viết như vậy để nhấn mạnh rằng **include?** là một instance method của **String**) có thể được gọi với các substring đa dạng, nó xử lý khoảng trắng tốt, và cả trường hợp case-sensitive.
## String iteration
Topic cuối của chúng ta về String đó là **iteration**, chúng ta sẽ thực hành lặp qua từng phần tử của đối tượng. Lặp là một chủ đề cơ bản trong lập trình máy tính. Sau này chúng ta sẽ cùng tìm hiểu về việc hạn chế sử dụng lặp.
<br>Trong trường hợp string, chúng ta sẽ tìm hiểu làm thế nào để lặp qua mỗi ký tự, Có hai điều kiện tiên quyết chính cho vấn đề này. Thứ nhất là, chúng ta cần học cách truy cập một ký tự cụ thể trong chuỗi. Thứ hai là, chúng ta cần tìm hiểu làm thế nào để tạo một vòng lặp. <br>
Chúng ta có thể tìm tìm cách truy cập vào một ký tự cụ thể bằng cách tham khảo list method support cho string. Bao gồm các mục sau: <br>
```go
str[index] → new_str or nil
Nếu index được pass, thì nó sẽ trả về một substring tại vị trí index đó.
```
Hãy thử quan sát vị dụ sau đây, để thấy cách nó hoạt động như thế nào: 
```ruby
>> puts soliloquy   # Just a reminder of what the string is
To be, or not to be, that is the question:
>> soliloquy[0]
=> "T"
>> soliloquy[1]
=> "o"
>> soliloquy[2]
=> " "
```
Từ ví dụ trên, ta thấy rằng Ruby hỗ trợ dấu ngoặc vuông để truy cập các phần tử, ký tự trong string, ví dụ **[0]** sẽ trả về ký tự đầu tiên, **[1]** sẽ trả về ký tự thứ 2....(Mỗi số như là 0,1,2 được gọi là một index.) <br>
Sau đây, chúng ta cùng nhau xem ví dụ đầu tiên về vòng lặp, ta sẽ dùng vòng lặp **for** định nghĩa một index giá trị **i**, và thực hiện lặp qua từng giá trị từ 0 tới 4. (**0..4**)
```ruby
>> for i in 0..4 do
?>   puts i
>> end
0
1
2
3
4
```
Đây là kiểu vòng lặp for cổ điển của ruby, và cũng tương tự với các ngôn ngữ khác như C và C++ tới JavaScript, Perl, hay PHP. Tuy nhiên điểm khác ở đây là, trong khi các ngôn ngữ khác phải dùng biến đếm tăng lên mỗi lần lặp, thì Ruby xác định thông qua kiểu dữ liệu phạm vi đặc biệt.
Do đó nó sẽ ngắn gọn hơn, so với kiểu lặp như của Javascript dưới đây : 
```ruby
> for (i = 0; i < 5; i++) {
  console.log(i);
}
0
1
2
3
4
```
Khi kết hợp với method **length**, chúng ta lại có một ví dụ về vòng lặp for như sau.
```ruby
>> for i in 0..(soliloquy.length - 1) do
?>   puts soliloquy[i]
>> end
T
o

b
e
.
.
.
t
i
o
n
:
```
Có một điều cơ bản đó là, chúng ta nên hạn chế tối đa sử dụng hàm **for**, ở các bài sau chúng ta sẽ tìm hiểu về hàm **each** để thấy lợi điểm của nó.

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*