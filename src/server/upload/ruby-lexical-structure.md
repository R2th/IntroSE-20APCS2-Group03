Ngôn ngữ máy tính cũng như ngôn ngữ của con người đều có cấu trúc nhất định, trong hôm nay mình sẽ giới thiệu 1 số cấu trúc của ngôn ngữ ruby

**Comment - bình luận**

Bất cứ 1 ngôn ngữ lập trình nào cũng có các đoạn comment dùng để ghi chú mã nguồn, ruby cũng ko ngoại lệ, cú pháp comment của ruby có 2 loại là comment cho 1 dòng ( bắt đầu bởi dấu #) và comment cho n dòng (bọc bởi cặp kí hiệu =begin và =end)
```ruby
comments.rb
=begin
  comments.rb
  thangtx
=end
```
puts "Comments example"

```Ruby
=begin
  comments.rb
  txthang
=end
```

**Variable - Biến**

"Biến" chỉ đến 1 cái tên, dại diện cho một công việc hoặc lưu trữ 1 giá trị bất kì, có thể là 1 đoạn text, 1 dãy số hoặc 1 đối tượng.
Thông thương tên biến sẽ được đặt bằng các kí tự trong bảng chữ cái và dấu gạch dưới, nhưng ko nên dc bắt đầu bằng kí tự số, cũng ko nên bắt đầu bằng kí tự HOA, nếu dùng chữ HOA thì ruby sẽ hiểu nhầm sang là "hằng số "

```Ruby
company_name
```
company_name là biến.
```Ruby
12Val
exx$
first-name
```
Ở trên là các tên biến không hợp lệ.

Lưu ý: biến trong Ruby là có phân biệt HOA-thường, tức là thangtx và tHangtx là 2 biến khác nhau.

**Hằng số – Constant**

Hằng số cũng là các biến  nhưng chỉ lưu một giá trị và không thể thay đổi được. Nhưng với ruby thì giá trị của các hằng số có thể thay đổi được, khi thay đổi giá trị hằng số ruby không báo lỗi mà chỉ đưa ra cảnh báo.

Tên của 1 hằng số  thường dc bắt đầu bởi 1 kí tự viết Hoa tuy nhiên khi code ruby khi đặt tên hằng số ta nên viết hoa toàn bộ kí tự trong tên.

```Ruby
constants.rb
Ten = "thangtx"
TUOI = 30
 
Ten = "hoahau"
```

Ở đoạn code  trên chúng ta định nghĩa hằng Ten và TUOI, sau đó thay đổi giá trị của Ten thì Ruby sẽ cảnh báo như sau.

```Ruby
warning: already initialized constant Ten
```

**Literal - Giá trị**

Giá trị là các kí tự mô tả một giá trị của một kiểu dữ liệu nào đó, có thể là một con số, một đoạn text… dùng để gán cho các biến. 

```Ruby
tuoi = 30
ten = "thangtx"
```

Ở đoạn code trên thì "30" và “thangtx” là giá trị, tuoi và ten là biến.

**Block - Khối lệnh**

Khối lệnh là cách để chúng ta gộp nhóm các lệnh lại với nhau. Khối lệnh trong Ruby được bắt đầu và kết thúc bởi cặp dấu {} hoặc cặp từ khóa do-end.

```Ruby
puts [2, -1, -4, 0].delete_if { |x| x < 0 }
     
[1, 2, 3].each do |e|
    puts e
end
```

Ngoài các câu lệnh tính toán bình thường thì trong lập trình còn có các câu lệnh điều khiển, ví dụ như câu lệnh if, đây là câu lệnh điều kiện, theo sau if là một biểu thức rồi tới một khối lệnh nằm trong cặp từ khóa then-end. Chúng ta sẽ tìm hiểu thêm về các câu lệnh điều kiện sau.
```Ruby
if true then
    puts "Ruby language"
    puts "Ruby script"
end
```
**Sigil**

Sigil là các kí tự $ và @ dùng để khai báo phạm vi hoạt động của biến. Trong đó $ cho biết biến đó là một biến toàn cục, @ cho biết đó là biến instance, @@ là biến class.

$car_name = "Misubishi"
@sea_name = "East Sea"
@@species = "Cat"

Sigil luôn được đặt trước tên biến.

**Operators - Toán tử**

Toán tử là các kí tự thực hiện các hành động nào đó trên một giá trị nào đó.

!    +    -    ~    *    **    /    %
<< >>    &    |    ^
==    ===    !=    <=>    >=    >
<    <=    =    %=    /=    -=
+=    *=    **=    ..    ...    not
and    or    ?:    &&    || 


**Keyword - từ khóa**

Từ khóa là các từ ưu tiên trong Ruby, thường dùng làm các câu lệnh thực hiện hành động nào đó, chẳng hạn như in giá trị ra màn hình, thực hiện các công việc lặp đi lặp lại hay thực hiện tính toán. Khi đặt tên biến chúng ta không được đặt tên trùng với từ khóa.

```Ruby
alias    and      BEGIN      begin    break    case
class    def      defined?   do       else     elsif
END      end      ensure     false    for      if
in       module   next       nil      not      or
redo     rescue   retry      return   self     super
then     true     undef      unless   until    when
while    yield
```
Link tham khảo: http://zetcode.com/lang/rubytutorial/lexis/