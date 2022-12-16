Ruby có nhiều phương thức tích hợp giúp dễ dàng sửa đổi và thao tác văn bản, một tác vụ phổ biến trong nhiều chương trình.

Trong hướng dẫn này, bạn sẽ sử dụng các phương thức để xác định độ dài của chuỗi, chỉ mục và phân tách chuỗi để trích xuất các chuỗi con, thêm và xóa khoảng trắng và các ký tự khác, thay đổi trường hợp ký tự trong chuỗi và tìm và thay thế văn bản. Khi bạn thực hiện xong, bạn sẽ có thể kết hợp các phương pháp này vào các chương trình của riêng bạn.
## 1. Xác định độ dài chuỗi
- `length`: trả về số kí tự của chuỗi. phương thức này hữu ích khi bạn thao tác liên quan đến độ dài của chuỗi, như hiển thị giới hạn đoạn chuỗi, giới hạn min/max độ dài mật khẩu,...
ví dụ:
```
open_source = "Sammy contributes to open source."
print open_source.length

Output
33
```
- ` empty?` :
Mọi ký tự, bao gồm các chữ cái, số, ký tự khoảng trắng và ký hiệu sẽ được tính, vì nó là một phần của chuỗi. Để check xem chuỗi đó có rỗng hay không, sử dụng phương thức "empty?
```
name = ""
name.empty?    # true

name = "Sammy"
name.empty?    # false

name = "     "
name.empty?    # false
```
## 2.  Truy cập các ký tự trong một chuỗi
- `slice`:
Để in hoặc làm việc với một số ký tự trong chuỗi, bạn có thể sử dụng phương thức `slice` để lấy phần bạn cần.

Giống như mảng, mỗi phần tử tương ứng với một số chỉ mục, mỗi ký tự chuỗi cũng tương ứng với một số chỉ mục, bắt đầu bằng 0.

Phương thức `slice` cho phép bạn lấy một ký tự hoặc một phạm vi ký tự. Truyền một số nguyên duy nhất trả về ký tự tại chỉ mục đó. Vượt qua hai số nguyên, cách nhau bằng dấu phẩy, sẽ trả về tất cả các ký tự từ chỉ mục đầu tiên đến chỉ mục cuối cùng. Phương thức `slice` cũng chấp nhận một phạm vi, chẳng hạn như 1..4, để chỉ định các ký tự cần trích xuất:

```
"Sammy".slice(0)     # "s"
"Sammy".slice(1,2)   # "am"
"Sammy".slice(1..4)  # "ammy"
```
Cú pháp [] là một alias của slice, vì vậy bạn có thể coi các chuỗi như mảng:
```
"Sammy"[0]     # "s"
"Sammy"[1,2]   # "am"
"Sammy"[1..4]  # "ammy"
```
Bạn cũng có thể truy cập một ký tự từ cuối chuỗi có chỉ số âm. -1 sẽ cho phép bạn truy cập ký tự cuối cùng của chuỗi, -2 sẽ truy cập từ thứ hai đến cuối cùng, v.v.
- `chars` :
Cuối cùng, bạn có thể chuyển đổi chuỗi thành một mảng các ký tự bằng phương thức "chars":
```
"sammy".chars    # ["S", "a", "m", "m", "y"]
```

## 3. Chuyển đổi sang chữ hoa và chữ thường
- `upcase / downcase` :
có hai phương thức thường dùng là upcase và downcase: upcase để in hoa chuỗi cần, downcase in thường.
```
name = "Sammy Shark"
print name.upcase

Ouput
SAMMY SHARK

print name.downcase

Ouput
sammy shark

```
- `capitalize` : trả về một chuỗi mới với ký tự đầu tiên được viết hoa
```
"sammy".capitalize    # "Sammy"

```
- `swapcase` : trả về một chuỗi được hoán đổi:
```
text = "Sammy"
print text.swapcase

sAMMY

```
Các phương thức `downcase`, `upcase`, `captalize` and `swapcase` đều trả về một chuỗi mới và không thay đổi chuỗi hiện có. Điều này rất quan trọng để nhớ nếu bạn làm việc gì đó ngoài việc in ra ngay văn bản. Hãy xem ví dụ  sau:
```
text = "sammy"
text.capitalize

print "Hello, #{text}!"

Output
Hello, sammy!

```
Để thay đổi đoạn string ban đầu, ta cần sửa lại code như sau:
```
text = "sammy"
text = text.capitalize

print "Hello, #{text}!"

Output
Hello, Sammy!
```
Hoặc sử dụng các phương thức `downcase!`, `upcase!`, `capitalize!` and `swapcase!`
```
text = "sammy"
text.capitalize!

print "Hello, #{text}!"

Output
Hello, Sammy!

```

## 4. Padding and Stripping chuỗi
Nếu bạn đang viết một chương trình phải định dạng một số văn bản, bạn sẽ thường thấy rằng bạn sẽ muốn thêm một khoảng trống ở phía trước, sau hoặc xung quanh một chuỗi để làm cho nó thẳng hàng với dữ liệu khác. Và những lần khác, bạn có thể muốn xóa các ký tự không cần thiết khỏi đầu hoặc cuối chuỗi của mình, như khoảng trắng thêm hoặc ký tự đặc biệt.
Một số phương thức hữu ích cho bạn:
- `center` : bao quanh mội chuỗi
```
"Sammy",center(21)    # "        Sammy        "
" [Sammy] ".center(21, "<>")   # "<><><> [Sammy] <><><>"
```
- `ljust / rjust` :  thêm khoảng trắng hoặc ký tự ở bên trái hoặc bên phải của chuỗi và hoạt động chính xác như phương thức `center`
```
"Sammy".ljust(20)         # "Sammy               "
"Sammy".rjust(20)         # "               Sammy"
"Sammy".rjust(20, "!")    # "!!!!!!!!!!!!!!!Sammy"
```
- `rstrip / lstrip` : Để xóa khoảng trắng hàng đầu khỏi chuỗi, sử dụng phương thức rstrip. Để loại bỏ dấu cách, sử dụng lstrip. Sử dụng `strip` để loại bỏ cả không gian hàng đầu và khoảng trắng
```
"        Sammy".rstrip    # "Sammy"
"Sammy        ".lstrip    # "Sammy"
"      Sammy  ".strip     # "Sammy"
```
- `chop` : Xóa kí tự cuối cùng của chuỗi
```
"Sammy".chop     # "Samm"
"This string has a newline\n".chop
```
- `chomp` : loại bỏ nhiều ký tự từ cuối chuỗi và xóa bỏ new line nếu có
```
"Sammy".chomp("my")    # "Sam"
"This string has a newline\n".chomp   # "This string has a newline
"Sammy".chomp     # "Sammy"
```
Tương tự như `upcase` và `downcase`, `center`,  `ljust` , `rjust`, `rstrip`, `lstrip` cũng không thay đổi chuỗi ban đầu, để làm được điều đó ta có các phương thức `center!`, `ljust!`, `rjust!`, `rstrip!`, `lstrip!`, `chomp!`
```
string = "Hello\n"
string.chomp!     # "Hello"

string = "Hello"
string.chomp!     # nil
```
## 5. Tìm kiếm kí tự và đoạn văn bản
-` include?` : trả về true or false, giống như trong mảng
```
"Sammy".include?("a")   # true
"Sammy".include?("b")   # false
```
- `index` : return vị trí đầu tiên của kí tự đó trong chuỗi
```
"Sammy".index("a")     # 1
"Sammy".index("mm")    # 2
"Sammy".index("Fish")  # nil
text = "Sammy has a balloon"
text.index("a")    # 1
```
Để in ra tất cả bạn có thể sửa lại code như sau:
```
text = "Sammy has a balloon"
indices = text.chars
  .each_with_index
  .select{|char, index| char == "a" }
  .map{|pair| pair.last}

print indices

[1, 7, 10, 13]
```
- `start_with?` : trả về true/false
```
text = "Sammy has a balloon"
text.start_with?("s")         # true
text.start_with?("Sammy has"  # true
text = "Sammy has a balloon"
text.start_with?("Sammy the Shark", "Sammy") # true
```
- `end_with?` : trả về true/false
```
text = "Sammy has a balloon"
text.end_with?("balloon")               # true
text.end_with?("boomerang")             # false
text.end_with?("boomerang", "balloon")  # true
```

## 6. Thay thế đoạn văn bản trong chuỗi
- `sub`: thay thế từ muốn thay trong chuỗi nhưng chỉ thay ở vịt trí đầu tiên tìm thấy
```
balloon = "Sammy has a balloon. The balloon has a ribbon"
print balloon.sub("has","had")
Output
Sammy had a balloon. The balloon has a ribbon
```

- `gsub`: thay thế tất cả từ muốn thay trong chuỗi
```
balloon = "Sammy has a balloon. The balloon has a ribbon"
print balloon.gsub("has","had")
Output
Sammy had a balloon. The balloon had a ribbon
```
```
balloon = "Sammy has a balloon. The balloon has a ribbon"
print balloon.gsub(/.(?=....)/, '#')
Output
##########################################bon

```
Cả `sub` và `gsub` đều không thay đổi chuỗi ban đầu, nếu muốn thay đổi ta có thể dùng `sub!` hoặc `gsub!`
```
text = "Sammy has a red balloon"
text.sub!("red", "blue")
text.sub!("balloon", "boomerang")
print text

Output
Sammy has a blue boomerang
```
`sub` và `gsub` chấp nhận cả các biểu thức chính quy, ví dụ sau:
```
"Sammy has a red balloon".gsub /[aeiou]/, "@"

"S@mmy h@s @ r@d b@ll@@n"
```
Trong trường hợp Giá trị thay thế không phải là một chuỗi, bạn có thể sử dụng hàm băm để chỉ định cách thay thế các ký tự hoặc phần riêng lẻ. Hãy thay thế tất cả các lần xuất hiện của chữ a bằng @ và tất cả các ký tự o bằng số không:
````
"Sammy has a red balloon".gsub /[aeiou]/, {"a" => "@", "o" => "0"}
# "S@mmy h@s @ rd b@ll00n"
````
- `delete` : xóa các kí tự trong chuỗi
```
 str = "Hoang Thi Lien"
 str.delete('aeiouAEIOU')
 Output:
 Hng Th Ln
```
- `tr`: 
```
str = "Sammy has a balloon. The balloon has a ribbon"
t2.tr('aeouiAEOUI', '')

Output
"Smmy hs  blln. Th blln hs  rbbn"
```
## Kết luận
Trong hướng dẫn này, bạn đã làm việc với và thao tác các chuỗi bằng một số phương thức dựng sẵn cho kiểu dữ liệu chuỗi. Bạn cũng đã học được rằng nhiều phương thức để làm việc với các chuỗi có hai biến thể: một phương thức giữ cho chuỗi không thay đổi và một phương thức sửa đổi chuỗi gốc. Cái nào bạn sử dụng phụ thuộc vào nhu cầu của bạn. Ruby cung cấp cho bạn sự linh hoạt để chọn cách bạn muốn làm việc với dữ liệu của mình. Tuy nhiên, việc viết mã không sửa đổi dữ liệu hiện có có thể dễ dàng hơn để gỡ lỗi sau này.

### Nguồn tham khảo:
https://www.digitalocean.com/community/tutorials/how-to-work-with-string-methods-in-ruby