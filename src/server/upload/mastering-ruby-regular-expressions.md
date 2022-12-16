Regular Expressions (viết tắt là regex) hay còn gọi là biểu thức chính quy, nó là một công cụ hỗ trợ thực hiện tìm kiếm chuỗi hoặc các thao tác phức tạp với chuỗi, thường được tích hợp trong các công cụ soạn thảo văn bản, ngôn ngữ lập trình.. và tất nhiên là Ruby cũng không hợp lệ. Hai trường hợp phổ biến để áp dụng regex là xác thực và phân tích cú pháp.

Thành phần chủ chốt của regex là các chuỗi tìm kiếm (search pattern hoặc specific patterns) dùng để thực hiện so sánh trên chuỗi yêu cầu. Các chuỗi tìm kiếm này được xây dựng dựa trên các kí tự bình thường và các kí tự đặc biệt.

Ví dụ phổ biến nhất để áp dụng regex: Kiểm tra địa chỉ email có hợp lệ hay không, với 1 regex ruby bạn có thể định nghĩa 1 chuỗi tìm kiếm (specific patterns) cho một địa chỉ email hợp lệ. Từ đó chương trình của bạn có thể phân biệt địa chỉ email hợp lệ từ địa chỉ email không hợp lệ bởi (specific patterns).

Regex của Ruby được định nghĩa giữa hai dấu `/` để phân biệt chúng với cú pháp ngôn ngữ khác. Ví dụ các biểu thức đơn giản khớp với một từ hoặc 1 chữ cái:

```
# Find the word 'like'
"Do you like cats?" =~ /like/
```

Cú pháp trên sẽ trả về chỉ mục của lần xuất hiện đầu tiên của từ nếu nó được tìm thấy hoặc không. Nếu ở đây bạn không quan tâm đến chỉ mục bạn có thể sử dụng phương thức `String#include?`.

Một cách khác để tra xem chuỗi có khớp với regex hay không là sử dụng phương thức `match`:

```
if "Do you like cats?".match(/like/)
  puts "Match found!"
end
```
Tương tự thế bạn có thể tìm hiểu cách xây dựng patterns nâng cao hơn để có thể `match`, `capture`, `replace` cho ngày, số điện thoại, url, ...

## Character Classes

Một character class cho phép bạn xác định một chuỗi hoặc danh sách các ký tự để  `match`.
Ví dụ: `match` với bất kỳ một nguyên âm nào. (`[aeiou]`)

```
# chuỗi có chưa nguyên âm không?

def contains_vowel(str)
  str =~ /[aeiou]/
end
contains_vowel("test") # returns 1
contains_vowel("sky")  # returns nil
```

## Ranges

Bạn có thể sử dụng phạm vị để `match` với nhiều chũ hoặc số mà không cần nhập tất cả chúng, ví dụ như `[2-5]` sẽ tương tự như `[2345]`

Một số phạm vi bạn nên biết: 

* `[0-9]` khớp với bất kỳ số nào từ 0 đến 9.
* `[a-z]` khớp với bất kỳ chữ cái từ a đến z (không có dấu).
* `[^a-z]` phạm vi phủ định của `[a-z]`

Ví dụ: Chuỗi có chứa bất kỳ chữ số nào không?

```
def contains_number(str)
  str =~ /[0-9]/
end
contains_number("The year is 2015")  # returns 12
contains_number("The cat is black")  # returns nil
```

> Lưu ý: gía trị trả về khi sử dụng `=~`  là chỉ mục hoặc `nil`

Một số cú pháp viết tắt để xác định phạm vi ký tự:

* `\w` tương ứng với `[0-9a-zA-Z]`
* `\d` ~  Match khi nó là số. tương đương từ `[0-9]`
* `\s` ~ white space (tabs, regular space, newline)

Cú pháp phủ định:

* `\W` ~ Match tất cả trừ kí tự có trong `[0-9a-zA-Z]`
* `\D` ~ Match tất cả trừ số
* `\S` ~ Match tất cả trừ space.

Ví dụ: Escaping ký tự đặc biệt:

```
# If we don't escape, the letter will match
"5a5".match(/\d.\d/) 
=> #<MatchData "5a5">

# In this case only the literal dot matches
"5a5".match(/\d\.\d/) 
=> nil

"5.5".match(/\d\.\d/) 
=> #<MatchData "5.5">
``` 

## Modifiers

Từ kiến thức ở trên, bạn mới chỉ có thể match một single character tại một thời điểm. Vậy để match nhiều characters bạn có thể sử dụng pattern modifiers.


| Modifier |  Mô tả |
| -------- | -------- |
| `+`     | 1 hoặc nhiều hơn     | 
| `*`     | 0 hoặc nhiều hơn     | 
| `?`     | 0 hoặc 1     | 
| {3,5}    | giữa 3 và 5    | 

Bạn có thể tổng hợp các kiến thức ở trên để tạo ra biểu thức chính quy phức tạp hơn:

Ví dụ: Kiểm tra chuỗi ký tự có giống với 1 địa chỉ IP không?

```
# Note that this will also match some invalid IP address
# like 999.999.999.999, but in this case we just care about the format.
def ip_address?(str)
  # We use !! to convert the return value to a boolean
  !!(str =~ /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
end
ip_address?("192.168.1.1")  # returns true
ip_address?("0000.0000")    # returns false
```

Exact String Matching

Nếu bạn cần match chính xác, bạn sẽ cần một loại modifier khác. hãy xem ví dụ sau để bạn hiểu được điều này:

```
# Mình muốn tìm xem liệu chuỗi này có chính xác là bốn chữ cái không. (chỉ match khi chuỗi đủ 4 ký tự)
# Nhưng với câu lệnh sau mới chỉ đáp ứng match 4 chữ cái nếu chuỗi có lớn hơn 4 ký tự => nó không thỏa màn với điều mình mong muốn.

pry(main)> "Regex are cool".match /\w{4}/
=> #<MatchData "Rege">

pry(main)> "Re".match /\w{4}/
=> nil

pry(main)> "Re    ".match /\w{4}/
=> nil

# Thay vào đó mình có thêm điều kiện đầu dòng và cuối dòng

pry(main)> "Regex are cool".match /^\w{4}$/
=> nil

pry(main)> "Rege".match /^\w{4}$/
=> #<MatchData "Rege">

```

Nếu bạn match hoàn toàn ở đầu chuỗi và không chỉ trên mọi dòng (sau \ n), bạn cần sử dụng \ A và \ Z thay vì ^ và $.

## Capture Groups

Với capture groups, bạn có thể  bắt được kết quả sau match và sử dụng lại chúng. 

Ví dụ:

```
Line = Struct.new(:time, :type, :msg)
=> Line

LOG_FORMAT = /(\d{2}:\d{2}) (\w+) (.*)/
=> /(\d{2}:\d{2}) (\w+) (.*)/

def parse_line(line)
  line.match(LOG_FORMAT) { |m| Line.new(*m.captures) }  
end  
=> :parse_line

parse_line("12:41 INFO User has logged in.")
=> #<struct Line time="12:41", type="INFO", msg="User has logged in.">
```

Trong ví dụ trên mình đang sử dụng `.match` thay vì `=~`

Phương thức này trả về một đối tượng `MatchData` nếu có một kết quả trùng hợp, nếu không thì sẽ trả về  `nil`.

Nếu bạn muốn kết quả trả về  chỉ là giá trị (`true`/`false`) thì bạn có thể sử dụng phương thức `match?` có sắn trong ruby từ 2.4. 

Bạn cũng có thể truy cập dữ liệu đã capture bằng cách sử dụng phương thức `.captures` hoặc xử lý đối tượng `MatchData` như một mảng. Chỉ đến chỉ mục `[0]` sẽ có toàn bộ kết quả.

Nếu bạn muốn capture group đầu tiên bạn có thể  sử dụng:

```
m = "John 31".match /\w+ (\d+)/
m[1]
# 31
```

Bạn cũng có thể có non-capturing groups với các biểu thức sau:


| Syntax| Description |
| -------- | -------- | 
| (?:...)     | Non-capturing group     | 
| (?<foo>...)    | Non-capturing group    | 

Ví dụ:

```
m = "David 30".match /(?<name>\w+) (?<age>\d+)/
m[:age]
# => "30"
m[:name]
# => "David"
</age></name>
```

## Ruby's Regex Class
Ruby regular expressions là instances của lớp Regexp. Hầu hết thời gian bạn sẽ không trực tiếp sử dụng lớp này nhưng bạn nên biết đôi chút về nó.

```
puts /a/.class
# Regexp
```

Một cách sử dụng có thể là tạo một regex từ một chuỗi:

```
regexp = Regexp.new("a")
```

Một cách khác để tạo một regexp:

```
regexp = %r{\w+}
```


## Formatting Long Regular Expressions

Complex Ruby regular expressions có thể khó đọc, vì vậy sẽ rất hữu ích nếu bạn chia chúng thành nhiều dòng. Bạn có thể làm điều này bằng cách sử dụng `x`. Định dạng này cũng cho phép bạn sử dụng các nhận xét bên trong regex của bạn.

```
LOG_FORMAT = %r{
  (\d{2}:\d{2}) # Time
  \s(\w+)       # Event type
  \s(.*)        # Message
}x
```

## Ruby regex: Putting It All Together

Ruby regex có thể được sử dụng với nhiều phương thức Ruby.

Ví dụ: Match cả các từ trong chuỗi bằng `.scan`

```
"this is some string".scan(/\w+/)
# => ["this", "is", "some", "string"]
```

Ví dụ: Chỉ lấy tất cả các số từ một chuỗi

```
"The year was 1492.".scan(/\d+/)
# => ["1492"]
```

ví dụ: Viết hoa tất cả các từ trong chuỗi

```
str = "lord of the rings"
str.gsub(/\w+/) { |w| w.capitalize }
# => "Lord Of The Rings"
```

## Conclusion

Ruby regular expressions rất hữ ích nhưng đôi khi chúng có thể hơi phức tạp một chút. Sử dụng một công cụ như [rubular.com ](http://rubular.com)có thể giúp bạn xây dựng regex ruby của bạn theo cách tương tác hơn. Rubular cũng bao gồm một biểu thức chính quy của Ruby mà bạn sẽ thấy rất hữu ích. Bây giờ đến lượt bạn để mở trình soạn thảo đó và bắt đầu viết mã!