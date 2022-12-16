Ở các bài viết trước, chúng ta đã tìm hiểu về [String](https://viblo.asia/p/ruby-can-ban-string-ByEZkVk4KQ0) và [Array](https://viblo.asia/p/ruby-can-ban-array-E375zQJRlGW) trong Ruby. Ở bài viết lần này, chúng ta tiếp tục tìm hiểu về một số object quan trọng khác của Ruby : math, dates, regular expressions, và hashes.
## Math
Giống như hầu hết các ngôn ngữ lập trình, Ruby hỗ trợ một số lượng lớn các phép toán:
```ruby
>> 1 + 1
=> 2
>> 2 - 3
=> -1
>> 2 * 3
=> 6
>> 10/5
=> 2
```
Hãy rất chú ý tới phép chia, vì nó dễ gây nhầm lẫn :
```ruby
>> 10/4
=> 2
>> 2/3
=> 0
```
Ở đây, Ruby sử dụng phép chia số nguyên. Nếu bạn muốn thực hiện phép chia số thập phân, thì hãy thêm **.0** vào tử số hoặc mẫu số.
```ruby
>> 10/4.0
=> 2.5
>> 2/3.0
=> 0.6666666666666666
```
Có rất nhiều dev, trong đó có cả tôi ưa thích sử dụng irb như một chiếc máy tính đơn giản khi có nhu cầu tính toán. Giao diện có vẻ không đẹp mắt lắm, nhưng nó khá nhanh và mạnh mẽ, với khả năng xác định các biến.
### More advanced operations
Ruby cũng hỗ trợ một loạt các phép toán nâng cao thông qua module gọi là **Math**, với các hàm tiện ích như : constants, roots hay các hàm lượng giác.
```ruby
>> Math::PI
=> 3.141592653589793
>> Math.sqrt(2)
=> 1.4142135623730951
>> Math.cos(2*Math::PI)
=> 1
```
Ký hiệu dấu 2 chấm và các chữ được viết hoa (**Math::PI**) ở bên trên là đặc trưng của module **constants**.
Ngoài ra, Ruby cũng hỗ trợ một số hàm lượng giác và lũy thừa khác như :
```ruby
>> Math.log(Math::E)
1
>> Math.log(10)
2.302585092994046

>> Math.log10(10)
1
>> Math.log10(1000000)
6
>> Math.log10(Math::E)
0.4342944819032518

>> 2**3
=> 8
>> Math::E**100
=> 2.6881171418161212e+43
```
Bạn có thể tìm hiểu chi tiết hơn về module Math tại [đây](https://ruby-doc.org/core-2.5.0/Math.html).
### Math to string
Ở các bài viết trước, chúng ta đã tìm hiểu cách convert string thành array (và ngược lại) bầng cách sử dụng **split** và **join**. Tương tự, Ruby cũng cho phép chúng ta convert giữa number và string.<br>
Có lẽ cách phổ biến nhất để convert number thành string là sử dụng method **to_s** ("to string").
```ruby
>> tau = 2 * Math::PI
>> tau.to_s
=> "6.283185307179586"
```
Ngoài ra, còn một số method khác như **to_i** ("to integer") and **to_f** ("to float").
```ruby
>> "6.283185307179586".to_f
=> 6.283185307179586
>> "6".to_i
=> 6
```
## Time
Một object cũng thường xuyên được sử dụng khác đó là **Time** (Về mặt kỹ thuật thì coi nó là một class). Thông qua tìm hiểu về **Time**, chúng ta có cơ hội đầu tiên để tìm hiểu về **new** method, còn được gọi là **constructor function** là một cách cơ bản của Ruby để tạo object mới. <br>
Từ trước tới nay, chúng ta thường sử dụng dấu nháy hoặc dấu ngoặc để khởi tạo trực tiếp một object mới, thì bây giờ cung ta có thể sử dụng method **new** để định nghĩa một object mới như string hoặc array...<br>
```ruby
>> s = String.new("A man, a plan, a canal—Panama!")
=> "A man, a plan, a canal—Panama!"
>> s.split(", ")
=> ["A man", "a plan", "a canal—Panama!"]
```
và
```ruby
>> a = Array.new
>> a << 3 << 4
=> [3, 4]
>> a << "hello, world!"
=> [3, 4, 'hello, world!']
```
Không giống như string hay array, chúng ta không thể khởi tạo Time bằng dấu ngoặc hay dấu nháy, mà chúng ta phải sử dụng method **new**.
```ruby
>> now = Time.new
=> 2018-08-14 19:18:36 -0700
```
Khi gọi mà không truyền vào đối số nào, **Time.new** sẽ return về time hiện tại. Ngoài ra, ta cũng có thể sử dụng **Time.now** để lấy về time hiện tại.
```ruby
>> now = Time.now
=> 2018-08-14 19:18:55 -0700
```
Cũng tương tự như các object Ruby khác, object **Time** cũng hỗ trợ nhiều method khác nhau.
```ruby
>> now.year
=> 2018
>> now.day
=> 14
>> now.month
=> 8
>> now.hour
=> 19
```
Ta cũng có thể khởi tạo object **Time** bằng cách truyền vào giá trị date và time cụ thể.
```ruby
>> moon_landing = Time.new(1969, 7, 20, 20, 17, 40)
=> 1969-07-20 20:17:40 -0700
>> moon_landing.day
=> 20
```
Mặc định, **Time** sẽ sử dụng local time zone, tuy nhiên nó sẽ gây ra sự khác biệt giữa các địa điểm cho nên chúng ta sẽ sử dụng giờ [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
```ruby
>> moon_landing = Time.utc(1969, 7, 20, 20, 17, 40)
=> 1969-07-20 20:17:40 UTC
```
Cuối cùng, đối với Time, ta cũng có thể thực hiện các phép toán với chúng, ví dụ như phép cộng, trừ...
```ruby
>> now - moon_landing
=> 1548482571.0
```
Chúng ta có thể lấy về tên của thứ hiện tại bằng cách tạo một array chưa các ngày trong tuần. Sau đó, dùng **wday** (weekday) như là index của mảng.
```ruby
irb(main):016:0> DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]
irb(main):019:0> DAYNAMES[Time.now.wday]
=> "Tuesday"
```
Cuối cùng, chúng ta sẽ update lại ứng dụng hello app (dùng Sinatra) để hiển thị ra thông tin ngày trong tuần. 
```ruby
require 'sinatra'

get '/' do
  DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"]
  dayname = DAYNAMES[Time.now.wday]
  "Hello, world! Happy #{dayname}."
end
```
## Regular expressions
Ruby support đầy đủ cho **regular expressions**, thường được gọi ngắn gọn là **regexes** hoặc **regexps**, đây là một ngôn ngữ nhỏ và đầy mạnh mẽ cho việc matching các patterns trong text.<br>
Việc master hoàn toàn regular expressions thì nằm ngoài phạm vi của bài viết này, và có lẽ rất ít người master được nó. Nhưng tin tốt là, có rất nhiều tài liệu về regular expressions để chúng ta có thể tìm hiểu sâu về nó. <br>
Điều quan trọng là bạn nắm được ý tưởng chung về regular expressions và có thể tìm hiểu sâu hơn khi bạn cần dùng tới nó.<br>
Regexes nổi tiếng là rất ngắn gọn và dễ bị lỗi, như lập trình viên nổi tiếng - [Jamie Zawinski](https://en.wikipedia.org/wiki/Jamie_Zawinski) đã [nói](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/): <br>
> Đối với một số người, khi họ đối mặt với một vấn đề, họ nghĩ "Ok, tôi sẽ dùng regular expressions để giải quyết". Và thế là họ gặp phải 2 vấn đề!

Thật may mắn là, tình trạng này được cải thiện rất nhiều bới các ứng dụng web hữu ích như là [Rubular](https://rubular.com/) nó cho phép chúng ta xây dựng các biểu thức regexes một cách trực quan.
![](https://images.viblo.asia/e153b117-ac5d-4a24-9311-e5551ccbb91f.png)
Rubular là web regexes chuyên dụng cho Ruby. Và chúng ta hãy cũng tìm hiểu một số kiến thức cơ bản về regex trong Ruby nhé. <br>
Một regex cơ bản là kiểm tra một chuỗi có match với một pattern cụ thể không. Chúng ta có thể tạo một regex mới bằng cách sử dụng hàm **new**. Tuy nhiên, chúng ta thường sử dụng ký hiệu **/.../** hơn.
Ví dụ dưới đây là regex match với [ZIP Code](https://en.wikipedia.org/wiki/ZIP_Code) của Mỹ, bao gồm 5 chữ số liên tiếp.
`zip_code = /\d{5}/`<br>
Nếu bạn dùng nhiều regular expressions thì bạn sẽ nhớ cú pháp, tuy nhiên bạn cũng có thể tra cứu tại các tài liệu tham khảo như [Rubular](https://rubular.com/). <br>
Và bây giờ chúng ta sẽ xem làm thế nào để biết một string có match với regex hay không. Và chúng ta sẽ dùng method **match** để kiểm tra.
```ruby
>> "no match".match(zip_code)
=> nil
>> "Beverly Hills 90210".match(zip_code)
=> #<MatchData "90210">
```
Trong thực tế, ta thường dùng nó trong ngữ cảnh boolean hơn, như sau : 
```ruby
>> s = "Beverly Hills 90210"
>> puts "It's got a ZIP code!" if s.match(zip_code)
"It's got a ZIP code!"
```
Một hoạt động phổ biến khác đó là việc tạo ra một mảng của tất cả các match. Trước hết chúng ta tạo ra một string dài hơn và chứa 2 zip code. 
```ruby
>> s =  "Beverly Hills 90210 was a '90s TV show set in Los Angeles."
>> s += " 91125 is another ZIP code in the Los Angeles area."
=> "Beverly Hills 90210 was a '90s TV show set in Los Angeles. 91125 is another
 ZIP code in the Los Angeles area."
```
Để check xem string có match với regex hay không, ta sử dụng method **String#scan** để tìm ra một mảng các matches.
```ruby
>> s.scan(zip_code)
=> ["90210", "91125"]
```
chúng ta cũng có thể sùng **scan** để tìm ra tất cả các từ đều là chữ in hoa.
```ruby
>> s.scan(/[A-Z]{2,}/)
=> ["TV", "ZIP"]
```
Ngoài ra, bạn có thể tham khảo thêm ở [Rubular](https://rubular.com/) .
### Splitting on regexes
Ở phần trước, chúng ta đã tìm hiểu cách split một chuỗi dựa trên space như thế này: 
```ruby
>> "ant bat cat duck".split(" ")
=> ['ant', 'bat', 'cat', 'duck']
```
Ở phần này, bằng cách vận dụng regex chúng ta có thể sử dụng phương pháp mang lại hiệu quả mạnh mẽ hơn. Trong regex thì khoảng trắng là **\s**  và thể hiện việc "một hoặc nhiều" là dấu cộng **+**. Và chúng ta được kết quả như sau: 
```ruby
>> "ant bat cat duck".split(/\s+/)
=> ["ant", "bat", "cat", "duck"]
```
Bằng cách này thì chúng ta sẽ có được kết quả tương tự đối với string có nhiều khoảng trắng, nhiều tabs, hay nhiều newline...
```ruby
>> "ant    bat\tcat\nduck".split(/\s+/)
=> ["ant", "bat", "cat", "duck"]
```
Ngoài ra, đã khi gọi hàm **split** không tham số, thì Ruby cũng tự động phân tách dựa trên khoảng trắng:
```ruby
>>  "ant    bat\tcat\nduck".split
=> ["ant", "bat", "cat", "duck"]
```
## Hashes
Kiểu data tiếp theo chúng ta sẽ tìm hiểu đó là **hash** hay còn được gọi là **associative array** (mảng kết hợp). Bạn có thể nghĩ hash giống như một mảng thông thường nhưng nó được gán nhãn cho mỗi giá trị chứ không phải tính theo chỉ số. Ví dụ, Thay vì là **array[0] = 0** thì trong hash sẽ là **hash["name"] = "Michael"**. Do đó, mỗi phần tử trong đó là một cặp giá trị: bao gồm 1 label (key) và một giá trị bất kỳ (valune). Và ta thường gọi nó là cặp **key/value**. <br>
Và chúng ta thường set giá trị cho label (key) là kiểu string, ví dụ ta có thể tạo một object lưu họ và tên của user như sau: 
```ruby
>> user = {}                          # {} is an empty hash.
=> {}
>> user["first_name"] = "Michael"     # Key "first_name", value "Michael"
=> "Michael"
>> user["last_name"] = "Hartl"        # Key "last_name", value "Hartl"
=> "Hartl"
```
Như bạn thấy, ta khởi tạo một empty hash bằng dấu ngoặc nhọn **{}**. Và gán giá trị cho phần tử bằng dấu ngoặc vuông **[]** (tương tự như đối với mảng). Và ta có thể truy xuất giá trị của phần tử theo cùng 1 cách: 
```ruby
>> user["first_name"]       # Element access is like arrays
=> "Michael"
>> user["last_name"]
=> "Hartl"
>> user["nonexistent"]
=> nil
```
Lưu ý, ở ví dụ cuối cùng bên trên, hash sẽ trả về **nil** khi key không tồn tại. <br>
Thay vì định nghĩa từng phần tử một cho hash bằng cách dùng dấu ngoặc vuông, thì ta có thể dùng dấu hashrocket **=>** để định nghĩa một loạt các phần tử.
```ruby
>> user
=> {"first_name"=>"Michael", "last_name"=>"Hartl"}
>> moonman = { "first_name" => "Buzz", "last_name" => "Aldrin" }
=> {"first_name"=>"Buzz", "last_name"=>"Aldrin"}
```
### Symbols
Như đã tìm hiểu ở bên trên, chúng ta đã sử dụng string cho hash key, tuy nhiên hiện tại chúng ta thường sử dụng **symbols** hơn.
Symbols trông cũng tương tự string, tuy nhiên nó sẽ đi kèm tiền tố là dấu hai chấm **:**, chứ không phải được bao quanh bằng dấu ngoặc kép. 
```ruby
>> "name".split('')
=> ["n", "a", "m", "e"]
>> :name.split('')
NoMethodError: undefined method `split' for :name:Symbol
```
Symbols là một kiểu dữ liệu đặc biệt của Ruby, và rất ít có ở các ngôn ngữ khác. Do đó, ban đầu nhìn chúng có vẻ hơi lạ, nhưng Ruby sử dụng chúng rất nhiều, nên bạn sẽ nhanh chóng làm quen với nó thôi.<br>
Không giống như string, không phải tất cả các ký tự đều hợp lệ đối với symbol, tuy nhiên, nếu bạn để nó trong dấu nháy kép như là một loại string thì nó sẽ chạy:
```ruby
>> :foo-bar
NameError: undefined local variable or method `bar' for main:Object
>> :2foo
SyntaxError
>> :"foo-bar"
=> :"foo-bar"
>> :"2foo"
=> :"2foo"
```
Chúng ta có thể định nghĩa một hash **user** sử dụng symbol như sau:
```ruby
>> user = { :name => "Michael Hartl", :email => "michael@example.com" }
=> {:name=>"Michael Hartl", :email=>"michael@example.com"}
>> user[:name]              # Access the value corresponding to :name.
=> "Michael Hartl"
>> user[:password]          # Access the value of an undefined key.
=> nil
```
Việc sử dụng symbol cho hash là rất phổ biển, vì vậy Ruby cũng hỗ trợ cách khởi tạo hash như sau: 
```ruby
>> user = { name: "Michael Hartl", email: "michael@example.com" }
=> {:name=>"Michael Hartl", :email=>"michael@example.com"}
```
Ở syntax thứ 2, ta đã thay thế ký hiệu symbol/hashrocket, bằng tên của key và theo sau là dấu 2 chấm.
```ruby
{ name: "Michael Hartl", email: "michael@example.com" }
```
Cách viết này tương tự với các ngôn ngữ khác (như là Javascript) nên cách viết này ngày càng được ưa thích trong cộng đồng Ruby. Tóm lại, 2 cách viết trên là rất phổ biến, cho nên ta có thể viết theo cách nào cũng được. <br>
Tuy nhiên, bạn cần để ý kỹ cách viết khác nhau giữa 2 cách trên để tránh nhầm lẫn, đó là : `{ :name => "Michael Hartl" } `(dấu 2 chấm đằng trước, và có dấu hashrocket =>) và `{ name: "Michael Hartl" }` (dấu 2 chấm phía sau)
### Nested hashes
Thực ra, hash có thể chưa bất kỳ giá trị gì, thậm trí là chứa các hash khác. Và người ta gọi nó là **nested hashes**, nó thường xuyên được sử dụng trong phát triển web.
```ruby
>> params = {}        # Define a hash called 'params' (short for 'parameters').
=> {}
>> params[:user] = { name: "Michael Hartl", email: "mhartl@example.com" }
=> {:name=>"Michael Hartl", :email=>"mhartl@example.com"}
>> params
=> {:user=>{:name=>"Michael Hartl", :email=>"mhartl@example.com"}}
>>  params[:user][:email]
=> "mhartl@example.com"
```
#### Hash iteration
Cũng tương tự như array, hash cũng support method **each**. Ví dụ, hãy xem hash **flash** với key là **:success** và **:danger**
```ruby
>> flash = { success: "It worked!", danger: "It failed." }
=> {:success=>"It worked!", :danger=>"It failed."}
>> flash.each do |key, value|
?>   puts "Key #{key.inspect} has value #{value.inspect}"
>> end
Key :success has value "It worked!"
Key :danger has value "It failed."
```
Chú ý rằng, trong khi **each** trong array thì chỉ có một biến trong block code, thì **each** trong hash sẽ có 2 biến đó là **key** và **value**. Do vậy, với mỗi vòng lặp **each** method sẽ lặp qua một cặp key-value.<br>
Tiếp theo, ta sẽ tìm hiểu method **inspect**, hàm này trả về một string với chữ đại diện mà nó gọi: 
```ruby
>> puts (1..5).to_a            # Put an array as a string.
1
2
3
4
5
>> puts (1..5).to_a.inspect    # Put a literal array.
[1, 2, 3, 4, 5]
>> puts :name, :name.inspect
name
:name
>> puts "It worked!", "It worked!".inspect
It worked!
"It worked!"
```
Chúng ta có cách viết ngắn gọn của **inspect** là:
```ruby
>> p :name             # Same output as 'puts :name.inspect'
:name
```
## Application: unique words
Giờ thì chúng ta sẽ áp dụng kiến thức về hash ở trên và làm thử một bài tập nhé. Nhiệm vụ của chúng ta là trích xuất các từ trong một đoạn văn khá dài, và đếm số lần mà từ đó xuất hiện. <br>
Vì code của chúng ta có vẻ dài, nên ta sẽ tạo một file Ruby để tiện thao tác. Ta có thể tạo file bằng cách gõ lệnh sau:<br>
`$ touch count.rb`<br>
và khởi tạo một biến chứa string như sau:
```count.rb
sonnet = "Let me not to the marriage of true minds
Admit impediments. Love is not love
Which alters when it alteration finds,
Or bends with the remover to remove.
O no, it is an ever-fixed mark
That looks on tempests and is never shaken
It is the star to every wand'ring bark,
Whose worth's unknown, although his height be taken.
Love's not time's fool, though rosy lips and cheeks
Within his bending sickle's compass come:
Love alters not with his brief hours and weeks,
But bears it out even to the edge of doom.
  If this be error and upon me proved,
  I never writ, nor no man ever loved."
```
Và khởi tạo một hash là **uniques** chứa những từ duy nhất: `uniques = {}`. <br>
Sau đó định nghĩa biến **words** chứa một hay nhiều từ, sử dụng regular expression: `words = sonnet.scan(/\w+/)` <br>
Và sử dụng **scan** method để trả về một mảng các string match với regex bên trên. 
```count.rb
sonnet = "Let me not to the marriage of true minds
Admit impediments. Love is not love
Which alters when it alteration finds,
Or bends with the remover to remove.
O no, it is an ever-fixed mark
That looks on tempests and is never shaken
It is the star to every wand'ring bark,
Whose worth's unknown, although his height be taken.
Love's not time's fool, though rosy lips and cheeks
Within his bending sickle's compass come:
Love alters not with his brief hours and weeks,
But bears it out even to the edge of doom.
  If this be error and upon me proved,
  I never writ, nor no man ever loved."

uniques = {}
words = sonnet.scan(/\w+/)
```
Tiếp theo, chúng ta sẽ lặp qua mảng **words** và thực hiện những việc sau: 
* Nếu từ đó đã tồn tại thì cộng thêm 1
* Nếu từ đó chưa tồn tại thì khởi tạo là 1
Sử dụng toán tử += để thực hiện, như sau:
```
words.each do |word|
  if uniques[word]
    uniques[word] += 1
  else
    uniques[word] = 1
  end
end
```
Và cuối cùng là in ra kết quả:` puts uniques` <br>
Code đầy đủ sẽ như sau: 
```count.rb
sonnet = "Let me not to the marriage of true minds
Admit impediments. Love is not love
Which alters when it alteration finds,
Or bends with the remover to remove.
O no, it is an ever-fixed mark
That looks on tempests and is never shaken
It is the star to every wand'ring bark,
Whose worth's unknown, although his height be taken.
Love's not time's fool, though rosy lips and cheeks
Within his bending sickle's compass come:
Love alters not with his brief hours and weeks,
But bears it out even to the edge of doom.
  If this be error and upon me proved,
  I never writ, nor no man ever loved."

# Unique words
uniques = {}
# All words in the text
words = sonnet.scan(/\w+/)

# Iterate through `words` and build up a hash of unique words.
words.each do |word|
  if uniques[word]
    uniques[word] += 1
  else
    uniques[word] = 1
  end
end

puts uniques
```
Thực hiện chạy file **count.rb**, ta được kết quả như sau: 
```ruby
$ ruby count.rb
{"Let"=>1, "me"=>2, "not"=>4, "to"=>4, "the"=>4, "marriage"=>1,
"of"=>2, "true"=>1, "minds"=>1, "Admit"=>1, "impediments"=>1,
"Love"=>3, "is"=>4, "love"=>1, "Which"=>1, "alters"=>2, "when"=>1,
"it"=>3, "alteration"=>1, "finds"=>1, "Or"=>1, "bends"=>1, "with"=>2,
"remover"=>1, "remove"=>1, "O"=>1, "no"=>2, "an"=>1, "ever"=>2,
"fixed"=>1, "mark"=>1, "That"=>1, "looks"=>1, "on"=>1, "tempests"=>1,
"and"=>4, "never"=>2, "shaken"=>1, "It"=>1, "star"=>1, "every"=>1,
"wand"=>1, "ring"=>1, "bark"=>1, "Whose"=>1, "worth"=>1, "s"=>4,
"unknown"=>1, "although"=>1, "his"=>3, "height"=>1, "be"=>2,
"taken"=>1, "time"=>1, "fool"=>1, "though"=>1, "rosy"=>1,
"lips"=>1, "cheeks"=>1, "Within"=>1, "bending"=>1, "sickle"=>1,
"compass"=>1, "come"=>1, "brief"=>1, "hours"=>1, "weeks"=>1,
"But"=>1, "bears"=>1, "out"=>1, "even"=>1, "edge"=>1, "doom"=>1,
"If"=>1, "this"=>1, "error"=>1, "upon"=>1, "proved"=>1, "I"=>1,
"writ"=>1, "nor"=>1, "man"=>1, "loved"=>1}
```

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*