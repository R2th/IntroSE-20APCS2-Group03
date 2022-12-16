Biểu thức chính quy là một công cụ hỗ trợ thực hiện tìm kiếm chuỗi hoặc các thao tác phức tạp với chuỗi, thường được tích hợp trong các công cụ soạn thảo văn bản, ngôn ngữ lập trình… và tất nhiên là Ruby cũng không ngoại lệ.

Thành phần chủ chốt của biểu thức chính quy là các chuỗi tìm kiếm (tiếng Anh là search pattern hoặc pattern không cũng được) dùng để thực hiện so sánh trên các chuỗi thật. Các chuỗi tìm kiếm này được xây dựng dựa trên các kí tự bình thường và các kí tự đặc biệt.

Đây là danh sách các kí tự đặc biệt:

.	Tìm bất kì ký tự nào

*	Tìm kí tự đứng trước đó 0 hoặc nhiều lần

[ ]	Tìm bất kì kí tự đứng trong cặp dấu []

[^ ]	Tìm bất kì kí tự nào không nằm trong cặp dấu []

^	Tìm tại điểm bắt đầu của chuỗi

$	Tìm tại điểm kết thúc của chuỗi

|	Toán tử OR

Chúng ta sẽ lần lượt đi vào tìm hiểu các kí tự trên.
Ví dụ:

```Ruby
example.rb
re = Regexp.new 'Jane'
p "Jane is a girl".match re
p "Jane is a girl" =~ /Jane/
p "Jane is a girl".match %r{Jane}
```
Để tìm xem chuỗi tìm kiếm có khớp với một chuỗi nào đó không thì chúng ta có 3 cách.

```Ruby
re = Regexp.new "Jane"
```
Để tạo các chuỗi tìm kiếm thì chúng ta dùng lớp Regexp, ở dòng trên chúng ta tạo một đối tượng Regexp với chuỗi tìm kiếm là “Jane”.

```Ruby
p "Jane is hot".match re
p "Jane is hot" =~ /Jane/
p "Jane is hot".match %r{Jane}
```

Để tìm xem chuỗi tìm kiếm có khớp với một chuỗi nào đó hay không thì chúng ta có thể dùng phương thức match của lớp String hoặc toán tử =~. Tham số của phương thức match và toán tử =~ là một đối tượng Regexp hoặc một chuỗi tìm kiếm nằm trong bộ kí tự %r{}, hoặc một chuỗi tìm kiếm nằm trong cặp dấu //. Trong các ví dụ bên dưới chúng ta sẽ làm việc chủ yếu với cặp dấu //.

```Ruby
#<MatchData "Jane">
0
#<MatchData "Jane">
```
Phương thức match sẽ trả về một đối tượng MatchData nếu tìm thấy hoặc nil nếu không tìm thấy, còn toán tử =~ sẽ trả về chỉ số của chuỗi con được tìm thấy đầu tiên hoặc nil nếu không tìm thấy, ở ví dụ trên toán tử =~ trả về 0 vì chuỗi “Jane” được tìm thấy nằm ở đầu chuỗi gốc.

Tìm bất kì ký tự nào
Như đã mô tả trong bảng các kí tự đặc biệt ở trên, kí tự dấu chấm “.” sẽ tìm bất kì một kí tự nào. Ví dụ:

```Ruby
p "RubyCode".match /.Code/
p "Code".match /.Code/
```
Trong đoạn code trên, chuỗi tìm kiếm là .Code, tức là khi tìm thì Ruby sẽ tìm bất kì kí tự nào theo sau bởi chuỗi “Code”. Nếu tìm thấy thì in ra chuỗi đó, không thì trả về đối tượng nil.

```Ruby
#<MatchData "yCode">
nil
```
Một số biến đặc biệt
```Ruby
special_variables.rb
puts "Her name is Jane" =~ /name/
 
p $`
p $&
p $'
```
Khi chúng ta tìm kiếm chuỗi thì các chuỗi có liên quan đến quá trình tìm kiếm sẽ được lưu trong một số biến đặc biệt có sẵn.

```Ruby
puts "Her name is Jane" =~ /name/
```
Ở ví dụ này chúng ta tìm kiếm chuỗi “name” trong chuỗi gốc “Her name is Jane”. Như đã nói ở trên, toán tử =~ sẽ trả về vị trí đầu tiên của chuỗi được tìm thấy, ở đây là vị trí số 4.

```Ruby
p $`
```
Ngoài ra Ruby còn có biến $`, biến The $` lưu chuỗi nằm phía trước chuỗi được tìm thấy. Tức là trong chuỗi “Her name is Jane” thì chuỗi “Her “ đứng trước chuỗi “name” nên sẽ được lưu trong biến $`.

```Ruby
p $&
```
Biến $& lưu chính chuỗi được tìm thấy, ở đây là “name”.

```Ruby
p $'
```
Biến $’ ngược lại với $` là lưu chuỗi nằm phía sau chuỗi được tìm thấy. Ở đây là ” is Jane”.

```Ruby
"Her "
"name"
" is Jane"
Anchor
```
Anchor là các kí tự tìm kiếm tại các vị trí đặc biệt.

Ví dụ 1:
```Ruby
anchor1.rb
sen1 = "Programming Ruby"
sen2 = "Ruby programming language"
 
p sen1.match /^Ruby/ 
p sen2.match /^Ruby/ 
 
p sen1.match /Ruby$/ 
p sen2.match /Ruby$/ 
```
Kí tự ^ sẽ tìm chuỗi con tại vị trí đầu trong chuỗi gốc, trong khi kí tự $ sẽ tìm chuỗi con bắt đầu từ cuối chuỗi.

```Ruby
sen1 = "Programming Ruby"
sen2 = "Ruby programming language"
```
Trong ví dụ này chúng ta có 2 chuỗi với chuỗi con “Ruby” nằm ở cuối chuỗi sen1 và đầu chuỗi sen2.

```Ruby
p sen1.match /^Ruby/ 
p sen2.match /^Ruby/
```
^Ruby tức là tìm xem có chuỗi “Ruby” nào nằm ở đầu chuỗi gốc hay không.

```Ruby
p sen1.match /Ruby$/ 
p sen2.match /Ruby$/ 
```
Ngược lại Ruby$ tức là tìm chuỗi “Ruby” ở cuối chuỗi.
```Ruby
Output
nil
#<MatchData "Ruby">
#<MatchData "Ruby">
nil
```
Ví dụ 2:
```Ruby
anchor2.rb
text = "The cat also known as the domestic cat is a small, 
usually furry, domesticated, carnivorous mammal."
 p text.scan /cat/
```
Chúng ta có một chuỗi text và chúng ta tìm chuỗi con “cat” bằng phương thức scan.
```Ruby
p text.scan /cat/
```
Phương thức scan sẽ tìm tất cả những chuỗi con có nội dung là “cat” trong chuỗi gốc, ở đây phương thức này tìm thấy 3 chuỗi “cat”, chuỗi con “cat” thứ 3 nằm trong từ “domesticated”.
```Ruby
Output
["cat", "cat", "cat"]
```
Nhưng đôi khi chúng ta lại không muốn tìm những chuỗi con nằm lẫn trong một từ khác như “domesticated” như trên mà chúng ta chỉ muốn tìm những chuỗi con đứng một mình như 2 chuỗi “cat” đầu tiên tìm được. Lúc đó chúng ta phải dùng đến kí tự \b.

Ví dụ 3:
```Ruby
anchor3.rb
text = "The cat also known as the domestic cat is a small, 
usually furry, domesticated, carnivorous mammal."
 
p text.scan /\bcat\b/
```
Bằng cách thêm kí tự \b vào trước và sau chuỗi tìm kiếm cần tìm, Ruby sẽ tìm chuỗi con đứng một mình chứ không tìm chuỗi con lẫn trong các chuỗi khác lớn hơn.
```Ruby
Output
["cat", "cat"]
```
Gom nhóm các kí tự
Chúng ta có thể gộp các kí tự cần kiểm tra lại với nhau vào bên trong cặp dấu ngoặc vuông []. Ví dụ /[ab]/ sẽ tìm bất kì kí tự a hoặc b nào, còn /ab/ sẽ tìm bất kì kí tự ab nào, tức là /ab/ phải có cả kí tự a lẫn kí tự b, còn /[ab]/ chỉ là tìm xem có kí tự a hoặc b hay không thôi.

Ví dụ 1:
```Ruby
group_characters1.rb
words = %w/ sit MIT fit fat lot pad /
 
pattern = /[fs]it/
 
words.each do |word|
   if word.match pattern
       puts "#{word} matches"
   else
       puts "#{word} does not match"
   end
end
```
Chúng ta có mảng words chứa các chuỗi. Chúng ta sẽ duyệt qua từng chuỗi và xem có chuỗi nào khớp với chuỗi tìm kiếm hay không.

```Ruby
pattern = /[fs]it/
```
chuỗi tìm kiếm có dạng /[fs]it/ tức là khớp với chuỗi fit hoặc sit.
```Ruby
Output
sit matches
MIT does not match
fit matches
fat does not match
lot does not match
pad does not match
```
Kết quả chúng ta có 2 chuỗi khớp.

Ví dụ 2:
```Ruby
group_characters2.rb
p "car".match %r{[abc][a]}
p "car".match /[a-r]+/
p "23af 433a 4ga".scan /\b[a-f0-9]+\b/
```
Chúng ta kiểm tra 3 chuỗi tìm kiếm.

```Ruby
p "car".match %r{[abc][a]}
```
Đoạn chuỗi tìm kiếm ở trên khá dễ hiểu, tìm một chuỗi có 3 kí tự, kí tự đầu tiên là a hoặc b hoặc c, kí tự thứ 2 là a, kí tự thứ 3 là r hoặc s.

```Ruby
p "car".match /[a-r]+/
```
Chúng ta có thể dùng dấu gạch nối “-“ để biểu diễn một khoảng giá trị. thay vì viết [abcdefghijklmnopqrstuvwxyz] để tìm một kí tự từ a đến z, thì ở đây chúng ta chỉ cần ghi là [a-z] là Ruby sẽ hiểu. Sau đó chúng ta có thể dùng dấu + để báo rằng kí tự đứng trước dấu cộng có thể lặp lại 1 hoặc nhiều lần.

```Ruby
p "23af 433a 4ga".scan /\b[a-f0-9]+\b/
```
Nếu muốn tìm một kí tự có nhiều khoảng giá trị khác nhau thì chúng ta cứ ghi chúng ra trong cặp dấu ngoặc vuông []. Ở dòng code trên [a-f0-9]+ nghĩa là tìm một kí tự có giá trị trong khoảng a-z hoặc từ 0-9 và kí tự này có thể lặp lại nhiều lần. Ngoài ra ở đây chúng ta còn dùng thêm kí tự \b để báo cho Ruby biết rằng chúng ta không tìm chuỗi con trong chuỗi khác mà chỉ tìm các chuỗi đứng một mình.
```Ruby
Output
#<MatchData "car">
#<MatchData "car">
["23af", "433a"]
```
Ví dụ 3:
```Ruby
group_characters3.rb
p "ABC".match /[^a-z]{3}/
p "abc".match /[^a-z]{3}/
```
Chúng ta có thể thêm dấu ^ để chỉ định cho Ruby tìm những kí tự không thuộc khoảng giá trị đó. Tức là ngược với ví dụ 2.

```Ruby
p "ABC".match /[^a-z]{3}/
```
Trong đoạn code trên [^a-z] tức là tìm một kí tự mà không thuộc khoảng giá trị từ a đến z. Ngoài ra [^a-z]{3} sẽ tìm một chuỗi có đúng 3 kí tự, thay vì dùng dấu + như trước là lặp lại vô số lần.

```Ruby
p "abc".match /[^a-z]{3}/
```
Chuỗi “ABC” ở trên khớp với mẫu vì ABC là các kí tự in hoa, còn chuỗi “abc” là các kí tự thường nên bị loại bỏ.
```Ruby
Output
#<MatchData "ABC">
nil
```
Chỉ định số lượng kí tự cần tìm
Trong các ví dụ trên chúng ta đã biết là dấu + sẽ lặp lại 1 hoặc nhiều lần, hay {3} là tìm 3 kí tự. Chúng ta sẽ tìm hiểu thêm các cách chỉ định số lượng kí tự dưới đây.

```Ruby
?     - có hoặc không có
*     - lặp lại 0 hoặc nhiều lần
+     - lặp lại 1 hoặc nhiều lần
{n}   - Xuất hiện chính xác n lần
{n,}  - Xuất hiện n lần hoặc nhiều hơn
{,n}  - Xuất hiện ít hơn hoặc bằng n lần
{n,m} - Xuất hiện từ n đến m lần
```
Chúng ta sẽ tìm hiểu thêm qua các ví dụ ở dưới.

Ví dụ 1:
```Ruby
quantifiers1.rb
p "open source is the future".scan /\w{3}/
p "open source is the future".scan /\b\w{3}\b/
```
Trong ví dụ này, \w là tìm một kí tự chữ cái, tức là tương đương với [a-zA-Z], thêm {3} vô nghĩa là tìm chuỗi có 3 kí tự chữ cái. Dòng tiếp theo chúng ta có thêm \b tức là chỉ tìm những chuỗi con có đúng 3 chữ cái.

Output
[ "ope", "sou", "rce", "the", "fut", "ure"]
["the"]

Ví dụ 1:
```Ruby
quantifiers3.rb
p "color colour colors colours".scan /colou?rs/
p "color colour colors colours".scan /colou?rs?/
p "color colour colors colours".scan /\bcolor\b|\bcolors\b|\bcolour\b|\bcolours\b/
```
Kí tự dấu chấm hỏi "?" cho biết kí tự đứng trước nó có thể có hoặc không có cũng được.

```Ruby
p "color colour colors colours".scan /\bcolor\b|\bcolors\b|\bcolour\b|\bcolours\b/
```Ruby
Hoặc nếu muốn dễ nhìn hơn chúng ta có thể dùng kí hiệu “|”, kí hiệu này có chức năng giống như toán tử OR vậy, tức là chuỗi tìm kiếm ở trên sẽ tìm những chuỗi con là color, colors, colour, hoặc colours.
```Ruby
Output
["colors", "colours"]
["color", "colour", "colors", "colours"]
["color", "colour", "colors", "colours"]
```
Phân biệt chữ HOA-thường
```Ruby
incasesensitive.rb

p "Jane".match /Jane/
p "Jane".match /jane/
p "Jane".match /JANE/
 
p "Jane".match /jane/i
p "Jane".match /Jane/i
p "Jane".match /JANE/i
```
Trong các ví dụ từ đầu bài đến giờ chúng ta tìm kiếm kí tự chữ cái có phân biệt chữ hoa và chữ thường, nếu muốn Ruby không phân biệt chữ hoa và chữ thường thì chúng ta thêm tùy chọn i vào sau chuỗi tìm kiếm.
```Ruby
Output
#<MatchData "Jane">
nil
nil
#<MatchData "Jane">
#<MatchData "Jane">
#<MatchData "Jane">
Email
```
Trong ví dụ này chúng ta sẽ thực hiện tạo chuỗi kiểm tra email. Đây là một trong những bài toán điển hình của biểu thức chính quy.
```Ruby
email.rb

emails = %w/ admin@example.com jane@gmail.com ioah2423^as f3444@gmail.com /
     
pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/
 
emails.each do |email| 
 
    if email.match pattern
        puts "#{email} matches"
    else
        puts "#{email} does not match"
    end
     
end
```
Chúng ta có một mảng emails lưu các chuỗi email mẫu để kiểm tra.

```Ruby
pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z.]{2,5}$/
```
Trên đây là chuỗi Regex mà chúng ta dùng để kiểm tra. Chúng ta sẽ lần lượt tìm hiểu từng phần của chuỗi này.

```Ruby
[a-zA-Z0-9._-]+@
```
Đoạn code trên có nghĩa là tìm một chuỗi có nhiều kí tự có giá trị từ A đến Z, hoặc từ a đến z, hoặc từ 0 đến 9, hoặc đó là kí tự dấu chấm “.”, dấu gạch ngang “_” hoặc dấu gạch nối “-“. Tiếp theo sau đó là một kí tự @. Phần này khớp với phần đầu email, ví dụ admin@…

```Ruby
[a-zA-Z0-9]+\.
```
Sau kí tự @ chúng ta lại tìm một chuỗi con có giá trị từ A đến Z, hoặc từ a đến z hoặc từ 0 đến 9. Đoạn này khớp với phần tên nhà cung cấp email như gmail, yahoo…

Sau đó là kí tự \., theo nghĩa bình thường thì kí tự chấm có nghĩa là ở đó tồn tại bất kì kí tự gì như chúng ta đã nói ở gần đầu bài, nhưng ở đây có dấu “\” phía trước, tức là ở đây chúng ta cần tìm một kí tự dấu chấm “.” thật sự chứ không phải một kí tự nào khác.

```Ruby
[a-zA-Z.]{2, 5}
```
Cuối cùng là tìm một chuỗi con có giá trị từ a đến z hoặc từ A đến Z hoặc một dấu chấm “.”, và chuỗi này có từ 2 đến 5 kí tự, phần này tương ứng với com, info, net… lý do tại sao lại có dấu chấm sau cùng là vì có một số tên miền có 2 phần như com.vn, co.uk…
```Ruby
Output
admin@example.com matches
jane@gmail.com matches
ioah2423^as does not match
f3444@gmail.com matches
```
source: http://zetcode.com/lang/rubytutorial/regex/