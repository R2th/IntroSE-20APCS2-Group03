Những kiến giải từ việc đọc 1 lượt cuốn sách - The ruby programming language - được viết năm 2008, Ruby version 1.9

Copyright © 2008 David Flanagan and Yukihiro Matsumoto.

Cắt bỏ những phần liên quan ruby 1.9 vì cũ quá, có thể xuất hiện nội dung không phù hợp với phiên bản Ruby 2.6.5 ở thời điểm hiện tại.

---
# Chương 1. Cưỡi ngựa xem hoa, lướt qua khái niệm
Chương ngày chủ yếu lướt qua cách sử dụng và cú pháp ruby, có thể chú thích thêm những điểm cần chú ý.
### 1.1 Ruby là ngôn ngữ Object-Oriented
Bất cứ thứ gì `.class` đều được:
```ruby
0.class # => FixNum
0.1.class # => Float
```
---
bởi vì ruby là ngôn ngữ hướng đối tượng, nó được thiết kết theo [mô hình object](https://viblo.asia/p/mo-hinh-ruby-object-63vKjdekl2R)
### 1.2 Blocks và vòng lặp
Nếu như python hướng đối tượng 1000%(kể cả code), thì mọi thứ trong ruby đều là object **ngoại trừ** block. Một số method cần kết hợp với blocks:
```ruby
3.times { print "Ruby! " } # Prints "Ruby! Ruby! Ruby! "
1.upto(9) {|x| print x } # Prints "123456789"
```
```ruby
a = [1,2,3,4]
a.inject do |sum,x|
  sum + x
end
```
### 1.3 Biểu thức và toán tử
Cái này có bộ quy tắc y như python, php, java, C++ => Biết rồi nên ko có gì quan trọng để nêu ở đây. Đọc chương 4 để biết thêm.
### 1.4 Phương thức
```ruby
def polar(x,y)
def polar x = 1, y
def polar x: 1, y: nil
```
### 1.5 Gán
```ruby
x,y, *z = [1,2,3,4]
 => [1, 2, 3, 4]
```
### 1.6 Tiền tố , hậu tố
> global variables are prefixed with $ , instance variables are prefixed with @ , and class variables are prefixed with @@ .
### 1.7 Regexp và Range
```ruby
def are_you_sure?
  while true
    print "Are you sure? [y/n]: "
    response = gets
    case response
    when /^[yY]/
      return true
    when /^[nN]/, /^$/
      return false
    end
  end
end
```
### 1.8 Classes, Modules
Dành cho cả **Chương 7** để đọc cho thoải mái.
### 1.9 Hai tính năng đáng kinh ngạc.
=> **kinh dị** thì đúng hơn.
* Ruby’s strings are **mutable**.
Toán tử `<<` dùng để nối chuỗi.
Dùng `freeze` để cố định 1 chuỗi. Dùng magic comment để immutable tất cả các chuỗi trong 1 file.
https://bugs.ruby-lang.org/issues/8976#note-30 => Một cuộc tranh cãi nảy lửa về việc có nên mặc định immutale với string trong Ruby 3, thay vì cứ phải dùng magic comment ở đầu file như thế này:
```ruby
# frozen_string_literal: true
```
Có lẽ **Lý do duy nhất** mà ruby để cho chuỗi có thể bị thay đổi là cải thiện **hiệu suất vòng lặp** khi 1 chuỗi bị biến đổi liên tục(chắc là cái kiểu sửa đi sửa lại 1 chuỗi, sẽ không phải copy từng phần tử(character) của chuỗi đó đem copy ra object mới rồi đem gán lại cho object cũ): *tưởng tượng một string phải thay đổi liên tục 1 triệu lần sẽ nhanh hơn 1 triệu string mới được tạo ra để gán lại cho string cần thay đổi*
```ruby
2.6.5 :002 > a =  "abc"
 => "abc" 
2.6.5 :003 > a[0] = "b"
 => "b" 
2.6.5 :004 > a
 => "bbc"
```
Tuy nhiên các biến bị đột biến rất dễ gây ra lỗi, đặc biệt là khi nhiều biến cùng tham chiếu đến một đối tượng. Tác dụng phụ cảu phương thức này có thể thay đổi hành vi của một phương thức khác. Sự khó hiểu xuất hiện vì tên biến không đủ để dự đoán nội dung giá trị của bản thân nó. Dev phải biết được vòng đời của biến.

=> sự không đột biến sẽ giúp cho code hoạt động tốt hơn. => :pensive::pensive:
* Biểu thức điều kiện ngoài false thì Ruby nhận giá trị `nil` là false => Khi kiểm tra đúng sai, chỉ có false và nil là dành cho giá trị sai. Tất cả mọi thứ còn lại đều là true (bao gồm 0, 0.0, "", và []).
---
# Chương 2. Cấu trúc ngôn ngữ, chương trình Ruby
## 2.1 Cấu trúc từ vựng
### 2.1.1 Bình luận
```
# bình luận vào đây
# hoặc
=begin Someone needs to fix the broken code below!
Any code here is commented out
...
=end
```
### 2.1.2 Văn phong
Là cách ruby xuất hiện trực tiếp trong source code bao gồm số, chuỗi văn bản và biểu thức chính quy. mảng và hash, các biểu thức phức tạp hơn được mô tả trong chương 3 Datatype and objects
### 2.1.3 Dấu câu
Dấu câu có thể dùng để làm toán từ `+`, `-`, `*`, `/`. Phân tách chuỗi, Biểu thức chính quy, array, hash. Nhóm và tách các biểu thức, các tham số của phương thức, và chỉ mục aray indexes. 

*Tất cả những thứ này sẽ xuất hiện rải rác tại các Ruby syntax mà ta code ra.*
### 2.1.4 Định danh
Để đặt tên cho variables, methods, classes ... 

Định danh bao gồm ký tự, số, gạch dưới `_`, **Nhưng không bắt đầu bằng chữ số**, **Không bao gồm** dấu cách, ký tự không in ra màn hình được.

Định danh được viết hoa Chữ cái đầu là hằng số (thường để đặt tên class hay module), nếu thay đổi giá trị sẽ được trình tương tác cảnh báo, không phải lỗi =)), `irb`:
```ruby
2.6.5 :001 > Abc = 1
 => 1 
2.6.5 :002 > Abc = 2
(irb):2: warning: already initialized constant Abc
(irb):1: warning: previous definition of Abc was here
 => 2 
```
Còn hằng số được viết hoa toàn bộ `HANG_SO = 1`

**Nhạy cảm**: ruby phân biệt hoa thường => từ khóa `end` - không phải từ khóa `END` =))

**Unicode** Ngoài ASCII, ruby còn có thể viết bằng tiếng Nhật (vì ruby language được tạo ra bởi người Nhật), bảng mã SJIS hoặc EUC đều bao gồm bảng hệ chữ cái Kanji trong tiếng nhật. Tuy nhiên các rule đặc biệt đều base trên ASCII.

**Dấu câu sử dụng trong định danh**
* bắt đầu bằng `$` => dùng khai báo global variable
* `@` instance variable
* `@@` class variable
* `?` đơn giản là việc áp dụng coding convention, mang ý nghĩa reutrn True hoặc False
* `!` mang ý nghĩa thận trọng vì ngoài giá trị trả vệ nó còn thay đổi chính nội tại của đối tượng (nhưng ko phải tất cả, vd: `exit!` sẽ dừng chương tình ngay lập tức)
* `=` gán giá trị

### 2.1.5 Bộ các Keywords của ruby
Không nhiều, nhưng chưa chắc đã sử dụng hết:
```ruby
__LINE__  __ENCODING__  __FILE__  BEGIN END  alias defined? begin
class module super  def yield  return  rescue  retry ensure redo
self  in  undef
unless  if  elsif else end
then  do  and or not  true  false nil
for case while  when  until break  next
```
### 2.1.6 Dấu khoảng trắng
Dấu space, tab, một dòng trắng đều mang ý ngiã token thông báo.

Hầu hết các khoảng trắng bị trình thông dịch bỏ qua, chỉ một số khoảng trắng là bắt buộc. 

Một vài trường hợp chèn hoặc bỏ 1 khoảng trắng làm thay đổi ý nghĩa chương trình.
## 2.2 Cấu trúc cú pháp
phần này mô tả ngắn gọn cách kết hợp các từ vựng của phần 2.1 lại để tạo ra một chương trình ruby, từ các **biểu thức** đơn giản nhất, cho đến các **module** lớn với nhiều chức năng.

về khởi tạo cấu trúc dữ liệu cơ bản: mảng, hash và range:
```ruby
[1,2,3]
{1=>"one", 2=>"two"}
1..3
```
Biểu thức gốc: số, biến, gán, gán kết hợp 2 toán tử
```ruby
1
x
x = 1
x = x + 1
```
Biểu thức điều kiện:
```ruby
if x < 10 then
  x = x + 1
end
```
```ruby
while x < 10 do
print x
x = x + 1
end
```
### 2.2.1 Cấu trúc Block trong Ruby
Block là một khối code được liên kết với một method lặp.
```ruby
3.times { print "Ruby! " }
```
```ruby
1.upto(10) do |x|
  print x
end
```
## 2.3 Cấu trúc của 1 File ruby
1. “shebang” comment nói cho trình biên dịch biết chương trình hoạt động trên hệ thống như thế nào
2. Nếu chương trình ruby phải mã hóa để đọc được thì comment ở dòng thứ 2 (nếu có dòng đầu tiên)
3. `__END__` trình thông dịch sẽ dừng đọc code tại đây, ký tự phía sau có thể dùng làm I/O program data
4. Tải mã từ một file khác bằng require
```
#!/usr/bin/ruby -w                                    shebang comment
# -*- coding: utf-8 -*-                               coding comment
require 'socket'                                      load networking library
... program code goes here
__END__
... mark end of code
program data goes here
```
## 2.4 Mã hóa chương trình
`# coding: utf-8`
`# -*- coding: utf-8 -*-`
`# vi: set fileencoding=utf-8 :`
kết quả là dạng:
```ruby
#!/usr/bin/ruby -w
# coding: utf-8
```
Cơ bản là bắt chước python: https://www.python.org/dev/peps/pep-0263/
=> ruby giống em trai của python =)) đang học python có thể quay sang học ruby và ngược lại.
sử dụng tham số sau để chỉ định encoding khi thực hiện chương trình ruby bằng shell command
```bash
ruby -E utf-8
ruby -Eutf-8
ruby --encoding utf-8
ruby --encoding=utf-8
```
Nhưng ruby 2.1 trở lên mặc định mã hóa utf8 nên chẳng cần khai báo => haizZ, phí công viết đoạn này quá, đọc sách cũ khổ vãi !!!
## 2.5 Thực thi chương trình
Trình thông dịch => Đọc file, Thực thi các class được định nghĩa, sau đó chạy bất cứ dòng nào sau viết sau cái gọi là BEGIN. Chỉ dừng lại khi gặp 1 trong 3 trường hợp:
1. Gặp câu lệnh khiến cho chương trình ruby dừng lại.
2. gặp kết thúc file
3. đọc dòng đánh dấu logical phần cuối của file với cái token `__END__`
---
# Chương 3. Kiểu dữ liệu và các đối tượng cơ sở trong ruby
## 3.1 Number
Ruby có 5 built-in class để đại diện cho kiểu dữ liệu số:
![](https://images.viblo.asia/7bf65782-8cb0-4315-92a9-a0da09b13c96.png)
Số có giá trị trong khoảng 31 bits thì là FixNum, còn không thì là BigNum. BigNum là kết quả của một phép tính trên các toán hạng (kết quả có giá trị không vừa với FixNum).

Các lớp Số phức, số thực dấu phẩy động và số hữu tỉ không được tích hợp sẵn cho Ruby mà được phân phối với Ruby như một phần của thư viện chuẩn.
## 3.2 String
`irb:`
```ruby
2.6.5 :053 > puts "ruby giải thích dấu \\ ở cuối rằng dòng này bỏ qua \"ký tự xuống dòng\" "\
2.6.5 :054 >   "nên sẽ đọc tiếp cả dòng này mới hoàn thành một lệnh statements"
ruby giải thích dấu \ ở cuối rằng dòng này bỏ qua "ký tự xuống dòng" nên sẽ đọc tiếp cả dòng này mới hoàn thành một lệnh statements
 => nil 
```
Chú ý sự khác nhau giữa chuỗi có sử dụng nháy đơn `'` và nháy kép `"`: chuỗi nội suy chỉ truyền giá trị vào được khi dùng nháy kép.
```ruby
2.6.5 :062 > a = 1
 => 1 
2.6.5 :063 > puts "a = #{a}"
a = 1
 => nil 
2.6.5 :064 > puts 'a = #{a}'
a = #{a}
 => nil 
```
Sử dụng **Unicode escapes** để dùng các ký tự khác của bảng mã ASCII.
```ruby
2.6.5 :119 > "\u{A5}"
 => "¥" 
2.6.5 :120 > "\u{3C0}"
 => "π" 
```
3 Cách để in văn bản mà không phải thêm `\` vào phía trước nháy đơn hay nháy kép hay các ký tự không được giải thích khác trong một chuỗi:
```ruby
2.6.5 :001 > %q(Don't worry about escaping ' characters!)
 => "Don't worry about escaping ' characters!" 
2.6.5 :002 > %Q|"How are you?", he said|
 => "\"How are you?\", he said" 
2.6.5 :003 > %-This string literal ends with a newline\n-
 => "This string literal ends with a newline\n"
```
Viết heredoc (here doc là cách khia báo string nhiều dòng):
```ruby
query = %Q(
  Article about heredocs
)
```
```ruby
query = <<-HTML.chomp
  Article about heredocs
HTML
```
```ruby
type  = "healthy"
table = "food"
query = <<-SQL
  SELECT * FROM #{table}
  WHERE #{type} = true
SQL
```
thực thi command với ubuntu shell, `irb` :
```ruby
2.6.5 :020 > cmd = 'echo Hello World'
2.6.5 :020 > system( cmd )
Hello World
 => true
```
Đã nói ở phần 1.9 rồi, chuỗi trong ruby là mutable, nên trình thông dịch không thể sử dụng cùng một đối tượng cho 1 chuỗi. Nên tránh lặp với chuỗi khởi tạo trực tiếp, mỗi khi gặp 1 chuỗi ký tự ruby lại tạo một đối tượng mới trên bộ nhớ
```
10.times { puts "test".object_id }
```
---
**Một số ký tự thay thế** khó biểu hiện được thông thường như xuống dòng, táp, biểu tượng đặc biệt, cần sử dụng ký tự chữ thay thế:
```ruby
?A # ký tự ASCII cho `A`
?€ == "\u20AC" # => true
?\t == "\t" # bằng với `TAB` trong ASCII
?\C-x # thay thế `Ctrl+X`
?\111 # ký tự mã hóa thành 0111 hệ bát phân
```
---
**Toán tử với chuỗi** vs **Truy xuất**, **Cắt**, **lặp** chuỗi
2 phần này thực hành khi làm project thì biết. Viết ra còn khó hiểu hơn :v
## 3.3 Arrays, Hashes, Range, Symbol
 Phần này trong sách toàn là trình bày những đường cơ bản, làm việc với mảng, hash, range quen rồi nên đọc phần này sẽ thấy ngán tận cổ.

 Ruby Hashes <=> Python Dictionary, trong C++, Java, PHP vẫn gọi là Associative Arrays, hash đơn giản là kiểu dữ liệu na ná như mảng nhưng index không hề mặc định mà được chỉ định.
 
Symbol là 1 kiểu dữ liệu trong ruby, hiểu đơn giản là string **không thể thay đổi** trong ruby, ruby lưu tất cả symbol lên bộ nhớ bằng bảng symbol mỗi khi có 1 symbol mới được tạo.
##  3.4 True, False, và Nil
ruby khác ngôn ngữ khác ở chỗ 3 cái này đều là object, đặc điểm thì trình bày gọn gàng ở mục 1.9 rồi.
## 3.5 Objects - Những hình dạng hài hước
Sự bá đạo của Ruby là mọi thứ đều là Object, khiến cho phần này có hơi bị nhiều gạch đầu dòng để viết:
### 3.5.1 Tham chiếu
> bất kể một đối tượng tên gì, ở đâu, giới tính đều có thể bị thay đổi, ngoại trừ chứng minh thư nhân dân là chỉ một và duy nhất.

Bản chất thực sự khi làm việc với object trong ruby là làm việc với **Tham chiếu** của đối tượng.

=> Khi gán giá trị(đối tượng) cho một biến => bản chất là gán tham chiếu của đối tượng vào biến đó. => Xử lý biến bản chất là **xử lý đối tượng mà biến trỏ tới**.

Minh họa:
```ruby
s = "Ruby" # Khởi tạo đối tượng string "Ruby" gán cho s
t = s # gán giá trị của s cho t => Bản chất là trỏ t tới đối tượng "Ruby"
t[-1] = "" # Thay đổi đối tượng "Ruby"
print s # => trở thành "Rub"
t = "Java" # trỏ t sang một đối tượng mới
print s,t # Prints "RubJava". => s trỏ tới "Rub", t trỏ tới "Java"
```
In other way, khi truyền biến vào method params là truyền tham chiếu trực tiếp đến giá trị. Nói cách khác nên nói là truyền giá trị thì đúng hơn là truyền tham chiếu. Nhưng giá trị truyền vào bản chất là tham chiếu của đối tượng (không phải tham chiếu của tham chiếu).

Bởi vì object references được truyền vào cho method, method có thể **chỉnh sửa căn bản object. Sự thay đổi này được áp dụng khi method return**.

**Giá trị tức thời**. Khác với tham chiếu đến đối tượng. các đối tượng Fixnum và Symbol là có giá trị tức thời, cả 2 class đều có các method biến đổi, vậy Fixnum và Symbol objects là **bất biến**, thứ này có nghĩa là không có cách nào có thể bị *thao túng* giá trị ngoài việc dùng tham chiếu. (VD không thể sửa, xóa, biến đổi, chỉ có thể tham chiếu để dùng)

Sựa khác biệt sử dụng trong thực tế chỉ là giá trị tức thời không thể có **singleton methods** được định nghĩa trên chúng (chúng ở đây là Fixnum hoặc Symbol objects - giá trị tức thời), singleton methods được giải thích ở chương 6.1
### 3.5.2 Cuộc đời object
> `Jack` (Jack là cách tôi trừu tượng hóa cách gọi một object trong mọi object trong ruby) 

Ông `Jack` (Object) được sinh ra trên bộ nhớ memory sau câu lệnh `.new`(`myClass.new`). 
`Jack` có được linh hồn của mình sau lời gọi hồn `initialize`. 
Ngay khi `Jack` được sinh ra đời bởi (`.new`) Jack đã có được hình hài của một con người bởi những vacxin (params) tiêm trực tiếp vào cho `.new`. Những vacxin này giúp Jack hoàn thiện những thuộc tính cần thiết cho trạng thái cơ thể mình, có được linh hồn và trở thành một object tồn tại sừng sững trong tiến trình ruby.

Mặc định thì Jack sẽ được sáng tạo ra như vậy, tuy nhiên cũng có cách khác, định nghĩa các methods, gọi là “factory methods” (Chương 7.4)
### 3.5.3 Danh tính
> Nếu như chứng minh thư dùng để xác định một người thì ai cũng có 1 dấu vân tay duy nhất, không giống ai.

Jack có định danh, Định danh là duy nhất cho đến khi chết đi. đó là `jack.object_id`
### 3.5.4 Lớp và kiểu
> Để jack ngày một hoàn hảo, jack phải có bằng cấp
> 
Jack học qua 1 loại các lớp từ tiểu học đến đại học chính quy. Đó gọi là sự kế thừa. 
Tưởng tượng rằng Công ty mà jack đang làm việc có mô hình đào tạo nhân viên thực thập Internship có thể đào tạo số lượng lớn sinh viên mới ra trường, trước đây khi mô hình công ty còn nhỏ, tiền thân Internship trước đây là TrainningStaff cũng là một lớp giúp đào tạo những nhân viên còn non tay nghề cho công ty.
```ruby
jack.class # Internship jack thuộc lớp thực tập sinh dành cho sinh viên mới ra trường
jack.class.superclass # TrainningStaff - tiền đề  ban đầu đào tạo nhân viên chất lượng cao của cty - Sau này hoàn thiện và xuất hiện Intership jack đang làm việc
jack.class.superclass.superclass # nil không còn lớp nào cao hơn
```
```ruby
jack.is_a? Internship # True Jack là một thực tập sinh
jack.is_a? TrainningStaff # True Jack cũng là một nhân viên được đào tạo bài bản
jack.instance_of? Internship # True Jack là sản phẩm của lò đào tạo Internship
jack.instance_of? TrainningStaff # False nhưng jack không phải học viên của lò đào tạo TrainningStaff, lớp Internship đã kế thừa các mô hình đào tạo của TrainningStaff.
```
Tuy nhiên dù là sản phẩm của lò đào tạo nào đi nữa, điều mà cty cần là kỹ năng và tay nghề của nhân viên
```
jack.respond_to? :"reading_report_document_skills" # true nếu jack có kỹ năng đọc tài liệu.
```
Cho nên cty có thể tuyển nhân viên thử việc từ Internship hoặc từ bên ngoài, nghĩa là có rất nhiều "Kiểu" nhân viên thử việc có thể tuyển tại công ty. Kiểu Nhân viên được đào tạo từ Internship sẽ đọc được tốt tài liệu nội bộ hoặc phổ thông 'BaseDocument' trong công ty, nhưng kiểu nhân viên từ công ty khác chuyển sang lại có khả năng đọc một số dạng tài liệu chuyên môn khác (SaleDocument, AnalyticDocument, ...). Nghĩa là đều là đọc tài liệu, nhưng tài liệu có dạng gì thì chỉ có kiểu nhân viên tương ứng mới làm tốt được.
Vì thế cty cần quan tâm "kiểu" nhân viên để sắp xếp công việc phù hợp:
```ruby
if jack.is_a? Internship
  jack.can_reading_report_document base_document
end
base_document.class # => BaseDocument
if john.is_a? BusinessStaff
  john.can_reading_report_document analytic_document
end
analytic_document.class # => AnalyticDocument
```
=> Việc kiểm tra kiểu được nói đến như là phong cách lập trình trong ruby, phogn cách “duck typing.” Chương 7
### 3.5.5 So sánh bằng
> Trong thế giới này, ta sẽ luôn so sánh vs con nhà người ta, tuy nhiên so sánh có rất nhiều khía cạnh chú không chỉ mỗi học giỏi.

Object bao gồm 2 phần id trên bộ nhớ và giá trị của bản thân nó, thành ra **có đến 5 kiểu so sánh bằng** giữa 2 đối tượng, 5 case này:
* equal?
```
a.object_id == b.object_id # làm việc như a.equal?(b)
```
* eql?
```ruby
1 == 1.0 # true: so sánh giá trị (không so sánh địa chỉ tham chiếu)
1.eql?(1.0) # false: nhưng so sánh thêm cả kiểu dữ liệu (class) Fixnum vs Float
```
* ==
ít nghiêm ngặt hơn `.eql?`, chỉ so sánh giá trị (tính cả các kiểu dữ liệu có thể được chuyển đổi, vd: Fixnum có thể ép kiểu sang Float )
```ruby
1 == 1.0 # true
```
* ===
gọi là các các trường hợp khác tương tự == equality
```ruby
(1..10) === 5 # true
/\d+/ === "123" # true
String === "s" # true
```
Vì thế toán tử này hơi khác biệt nên *không nên dùng phổ biến*, mà chỉ nên dùng trong trường hợp cụ thể.

---
* `=~`
Toán tử so khớp Regex cơ bản. Không thực sự là toán tử so sánh bằng. Được cho vào danh sách toán tử cho ... *đủ bộ* => WTF cái ông cha đẻ ruby này
```ruby
2.6.5 :098 > /hay/ =~ 'Ôhaythằngnày'
 => 1 
2.6.5 :099 > 'aiÔhaythằngnày' =~ /hay/ 
 => 3
```
Tuy vậy ruby  vẫn quan tâm tới các dev bằng cách cung cấp các kỹ thuật giúp *đọc* regex tốt hơn bằng cách [nhóm và đặt tên biến và tham chiếu ngược với chuỗi thông qua regex](https://viblo.asia/p/ruby-3-cach-dung-regex-capture-groups-voi-tham-chieu-nguoc-back-references-yMnKM04D57P)

---
### 3.5.6 Các phép toán so sánh toán hạng
> Trước khi thực hiện việc ra quyết định, cần phải đánh giá được ai giỏi hơn ai.

class Numer hiển hiên có thể định nghĩa sẵn cho việc so sánh(vì nó là số mà), tuy vậy Nếu một class khác cũng định nghĩa một thứ tự, thì các thể hiện của lớp có thể được so sánh và sắp xếp "như với kiểu số".

vd: text trong bảng ASCII, cũng có thể so sánh nếu được định thứ tự
```ruby
"b" > "a" # do thứ thự b lớn hơn a 1 đơn vị trong ASCII
```
Toán tử `<=>` trả về 1, 0 , -1 cho biết kết quả so sánh 2 toán hạng
```ruby
2.6.5 :135 > "b" <=> "a" 
 => 1 
2.6.5 :136 > "b" <=> "b" 
 => 0 
2.6.5 :137 > "b" <=> "c" 
 => -1 
2.6.5 :138 >
```
Tuy nhiên cách này không trực quan nên ta có thể sử dụng theo cách quen thuộc, nhờ việc `**Comparable** mixin` đã định nghĩa ra các toán tử sau đây, mỗi toán tử là 1 trường hợp điều kiện của `<=>`:
* `<`
* `<=`
* `==`
* `>=`
* `>`
* `between?`
> Modules and mixins => xem Chương 7
### 3.5.7 Chuyển đổi thành đối tượng khác
> Dễ dàng thay đổi phong cách sống khác là một điều thú vị trong cuộc sống.

- Các class `String , Integer , Float , Array` định nghĩa sẵn các method chuyển đổi cực kỳ eazy. `to_s , to_i , to_f , to_a`
- Các kiểu đối tượng khi chuyển đổi dĩ nhiên cần có kiểu "phong cách" tương đồng mới được. VD: `[[:a, 1], ["b", 2]]` có thể chuyển đổi phong cách với `{:a=>1, "b"=>2}` và ngược lại.
- 
### 3.5.8 Sao chép
> Đây chính xác là Nhân bản vô tính

`jack.dup`  sẽ tạo ra 1 thằng `jack` khác, 2 thằng jack giống hệt mọi thứ trừ định danh object_id (cả định danh của những thuộc tính string được copy bên trong đối tượng cũng sẽ thay đổi nữa - do string trong ruby là mutable). Kiểu a = "abc" thì b = a.dup tương đương với `b = "abc"`, chứ không phải `b = a`.

### 3.5.9 Văn bản hóa đối tượng
(lưu trạng thái của đối tượng vào file I/O)
```ruby
[1] pry(main)> a
=> #<Abc:0x0000000009c13a50 @ahaha=11>
[2] pry(main)> Marshal.dump a
=> "\x04\bo:\bAbc\x06:\v@ahahai\x10"
[3] pry(main)> Marshal.load(Marshal.dump(a))
=> #<Abc:0x0000000009e33510 @ahaha=11>
[4] pry(main)> Marshal.load("\x04\bo:\bAbc\x06:\v@ahahai\x10")
=> #<Abc:0x0000000009e85d10 @ahaha=11>
```
### 3.5.10 Đóng băng đối tượng
> Tiến vào Kỷ băng hà

`.freeze` sẽ đóng băng tất cả thuộc tính của đối tượng => đơn giản là đối tượng không thể bị thay đổi nữa.

### 3.5.11 Đối tượng nhiễm độc
> Những kẻ ngoài pháp luật
```ruby
s = "untrusted"
s.taint
s.tainted?
s.upcase.tainted?
s[3,4].tainted?
```
khi được đánh dấu là taint => object này có nghĩa là nhiễm độc, có thể gây nguy hiểm, mọi object phát sinh từ object này cũng sẽ bị đánh dấu.

Người dùng nhập vào, chẳng hạn như đối số dòng lệnh, biến môi trường và đọc 1 chuỗi bất kỳ với `gets` sẽ tự động bị nhiễm độc.

Các ứng dụng web thường phải theo dõi dữ liệu bắt nguồn từ đầu vào của người dùng không đáng tin cậy để tránh các cuộc tấn công SQL injection và các rủi ro bảo mật tương tự.

---
# Chương 4. Biểu thức và toán tử
Chương này không có vấn đề gì cả, nhưng vẫn sẽ review lại 1 lượt về cách sử dụng biểu thức, toán tử, cú pháp của ruby.
## 4.1 Các ký tự, các từ khóa
Về cơ bản thì Chương 2 đã giới thiệu các ứng dụng của từ khóa được built sẵn bởi ruby. 
Về việc sử dụng biến, trong bất kỳ hoản cảnh nào ta có thể thấy luôn có sẵn những biến tham chiếu chuyên biệt như: `nil`, `true`, `false`, `self`, `__FILE__`, `__LINE__`, `__ENCODING__`.

## 4.2 Biến
Như đã giải thích trong Chương 2, có bốn loại biến trong Ruby và quy tắc từ vựng để quản lý họ hàng nhà `biến` :v :
 - Các biến bắt đầu bằng `$` là các biến toàn cục, xuất hiện trong suốt một chương trình Ruby
 - Các biến bắt đầu bằng `@` và `@@` là các  "instance variables và class"
 - Và có tên bắt đầu bằng dấu gạch dưới hoặc chữ thường là các biến cục bộ, chỉ được định nghĩa trong phương thức hoặc [block](https://viblo.asia/p/tim-hieu-block-proc-va-lambda-trong-ruby-gDVK28qXlLj) hiện tại. phạm vi của biến này cần được miêu tả rõ ràng tại chương 5. Hoặc có thể đọc thêm tại [đây](https://viblo.asia/p/scope-gates-trong-ruby-phan-1-aWj53LjeK6m) và [đây nữa](https://viblo.asia/p/scope-gates-trong-ruby-phan-2-924lJqGNZPM)

Nói chung, bạn phải luôn luôn gán giá trị cho hoặc khởi tạo các biến của mình trước khi sử dụng
chúng trong biểu thức. Tuy nhiên có một vào sự khó hiểu xảy ra nếu biến chưa hề được khai báo:
- gọi biến toàn cục:  trả về `nil`,  trong "bộ phim kinh điển ruby" dù bất kì đâu, khi nào cũng luôn có một thằng đệ nhất thiên hạ, thế còn nó là thằng nào thì tùy vào diễn biến bộ phim :v
- gọi Class variables: raise NameError => trước khi bộ phim tổ chức họp báo ra mắt báo kiểu gì cũng phải công khai danh sách nhân vật chính.
- gọi Instance variable: trả về `nil` Nhân vật phụ có thể bỏ trống bộ phim vẫn sẽ diễn ra
- Nhà biên kịch cho biết cốt truyện có 1 thằng tên là `độc cô cầu bại`, và nó là thằng như nào thì lại chưa được đạo diễn chỉ định do chưa có diễn viên đủ điều kiện casting. Còn thằng `đông phương bạch` vì không phải nhân vật chính trong phim nên bị đạo diễn bỏ ra khỏi kịch bản (biên kịch rất cáu mà ko làm gì được :v):
```ruby
a = 0.0 if false # hành động gán này chả bao h xảy ra
print doc_co_cau_bai # ấy vậy mà chỗ  này vẫn in ra `nil` =))
print dong_phuong_bat_bai # NameError: trong khi ở đây bắn lỗi như đúng rồi
```
=> hơi gì và này nọ => cơ mà thôi cũng kệ.

## 4.3 Hằng số
Trình thông dịch Ruby không thực sự thực thi đóng băng trạng thái của hằng số, nhưng nó đưa ra cảnh báo nếu một chương trình thay đổi giá trị của một Constant.
Hằng số được khai báo bởi class như một biến thông thường, trừ cách đặt tên biến phải VIET_HOA, hoặc Viet_Hoa. Tuy nhiên cách khai báo hằng số `Viet_Hoa` thường dùng cho việc đặt tên Module và Class.
Dấu `::` để tách hẳng số được định nghĩ bên tỏng module: TenModule::TEN_HANG_SO. Nói dung hằng số sử dụng như 1 biến.

## 4.4 Gọi method
Chỉ mỗi gọi method thôi mà nó được chia làm 4 phần nha:
- `dấu gọi` một phương thức là `.`  theo sau là tên phương thức, dấu `::` cũng được dùng để gọi hằng số (nhớ rằng `TênClass`, `TênModule` cũng là hằng số)
- `tên` phương thức
- Các giá trị đối số được truyền cho phương thức. Danh sách các đối số có thể là kèm theo trong ngoặc đơn, nhưng chúng thường là tùy chọn. (Tùy chọn và bắt buộc dấu ngoặc đơn được thảo luận chi tiết trong Chương §6.3. Dấu cách **2.1.6** mang ý ngiã token thông báo.) Nếu có nhiều hơn một đối số, chúng được phân tách với nhau bằng dấu phẩy. Số lượng và loại đối số phụ thuộc vào định nghĩa phương thức. Một số phương thức không mong đợi đối số.
- Một [block](https://viblo.asia/p/tim-hieu-block-proc-va-lambda-trong-ruby-gDVK28qXlLj) code tùy chọn được phân tách bằng dấu ngoặc nhọn `{}` hoặc theo cặp `do / end` . Phương thức có thể thực hiện code ở trong block này bằng cách sử dụng từ khóa `yield`. Khả năng này để liên kết tùy ý các `block code` với bất kỳ lời gọi phương thức nào và là cơ sở cho các phương thức lặp mạnh mẽ của Ruby mà coder luôn luôn dùng, chẳng hạn như ở 2.2.1 (map, reduce, inject, times, upto, downto, step .... thằng nào chẳng dùng block)


---

Còn tiếp ...