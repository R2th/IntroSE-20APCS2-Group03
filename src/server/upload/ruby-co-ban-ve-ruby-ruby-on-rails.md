# Ruby Là Gì

Ruby là ngôn ngữ lập trình kịch bản hướng đối tượng được sử dụng cho nhiều mục đích khác nhau như dùng xây dựng các ứng dụng web, desktop, quản lý máy chủ... Ruby được viết vào năm 1993 bởi Yukihiro Matsumoto dựa trên ngôn ngữ lập trình Smalltalk tuy nhiên có cú pháp trong sáng và đơn giản hơn rất nhiều so với Smalltalk.
Ruby là ngôn ngữ lập trình kịch bản vì mã lệnh của Ruby có thể chạy trực tiếp bởi máy tính mà không cần phải biên soạn thành một tệp thực thi (tệp tin .exe trên Windows hay tệp tin binary trên Linux).
Ruby là ngôn ngữ lập trình hướng đối tượng (object oriented) và mọi thứ trong Ruby đều là một đối tượng ngay cả một chuỗi đơn giản.

## Cú Pháp

### Câu Lệnh

Một câu lệnh là một chỉ dẫn để máy tính làm một việc nào đó như cộng 2 số, hiển thị ra màn hình giá trị một chuỗi ký tự hay một số.... Trong Ruby việc sử dụng ký tự ; để kết thúc câu lệnh là tuỳ ý.
```
puts "Câu lệnh trong Ruby không yêu câu phải có ; ở cuối";
puts 3 + 2
```
Ở ví dụ trên chúng ta có 2 câu lệnh trong đó chỉ có câu lệnh đầu dùng để hiển thị một chuỗi các ký tự và có sử dụng ; kết thúc câu lệnh này. Câu lệnh thứ 2 hiển thị 5 là tổng của 2 số (3+2).
### Biến

Biến được sử dụng để chứa dữ liệu sử dụng trong chương trình.
```
x = 100
```
Ngoài dữ liệu của biến thì kiểu dữ liệu của biến cũng có thể thay đổi trong quá trình chạy chương trình.
```
x = 100
puts x # hiển thị: 100
x = "một trăm"
puts x # hiển thị: một trăm
```

### Chú Thích (Comment)

Chú thích (hay comment) là những đoạn chú thích giải thích về mục đích, ý nghĩa... của một câu lệnh hay một khối các câu lệnh trong chương trình. Trong Ruby chúng ta tạo chú thích sử dụng ký tự #:
```
# Hiển thị kết quả tính tổng
puts 3 + 2 
```
Bạn cũng có thể đặt chú thích cùng dòng với câu lệnh:
```
puts 3 + 2 # Hiển thị "5"
```
### Khoảng Trắng và Tab

Khoảng trắng và tab thông thường sẽ được Ruby bỏ qua. Các câu lệnh ở ví dụ dưới đây được Ruby hiểu theo cách giống nhau:
```
puts 3+2 # Hiển thị "5"
puts     3 + 2     # Hiển thị "5"
puts 3 +      2   # Hiển thị "5"
```
### In Hoa, In Thường

Ruby phân biệt giữa ký tự in hoa và in thường. Ví dụ dưới đây hai biến a và A được Ruby hiểu là hai biến độc lập với nhau:
```
a = 5
A = 10
puts a # Hiển thị 5
puts A # Hiển thị 10
```
### puts và print

Cả hai hàm puts và print đều được dùng để hiển thị kết quả ra màn hình. Tuy nhiên khi sử dụng puts thì Ruby sẽ thêm dòng mới vào sau kết quả hiển thị còn print thì không:
```
puts "Xin chào" # Hiển thị "Xin chào"
puts "Tran Tinh"# Hiển thị "Tran Tinh"
puts "**********"
# Hiển thị "Xin chàoTran Tinh"
print "Xin chào"
print "Tran Tinh"
```
Ngoài ra thì hàm print sẽ hiển thị kiểu dữ liệu mảng (array) hay nil tốt hơn puts. 
```
puts [1, 2 ,3] # hiển thị 1 2 3
print [1, 2, 3] # hiển thị [1, 2, 3]
puts # tạo dòng mới
puts nil # không hiển thị
print nil # hiển thị "nil"
```
### Dấu Nháy Đơn và Dấu Ngoặc Kép

Cả dấu nháy đơn ' và ngoặc kép " đều có thể được sử dụng để biểu diễn chuỗi ký tự trong Ruby.
```
puts 'Xin chào'
puts "Xin chào"
```
Tuy nhiên khi bạn muốn in giá trị của biến đặt bên trong chuỗi thì bạn cần sử dụng ngoặc kép. Ở ví dụ dưới để hiển thị giá trị của biến name bên trong chuỗi chúng ta cần đặt biến này trong #{ } và sử dụng cặp ngoặc kép cho chuỗi.

name = "Tinh"
puts "Xin chào #{name}" # Hiển thị Xin chào Tinh
puts 'Xin chào #{name}' # Hiển thị Xin chào #{name}

## Phép Toán
  
Cũng như các ngôn ngữ lập trình khác Ruby hỗ trợ rất nhiều phép toán khác nhau.

### Phép Toán Số Học
```
puts 10 + 20 # hiển thị: 30
puts 10 - 20 # hiển thị: -10
puts 10 * 20 # hiển thị: 200
puts 10 / 3 # hiển thị: 3
puts 10 % 3 # hiển thị: 1
puts 10**2 # hiển thị 100
```
Ở ví dụ trên, phép chia 10/3 trả về giá trị là 3 trong khi giá trị đúng của phép toán này là 3.3333.. Khác với hầu hết các ngôn ngữ khác thì trong Ruby nếu phép chia bạn thực hiện có phần dư thì Ruby sẽ làm tròn kết quả cho bạn về số nguyên gần kề nhỏ hơn nó. Ruby chỉ trả về giá trị đúng cho bạn cần khi số chia hoặc số bị chia có kiểu dữ liệu là số thập phân (số thực):
```
puts 10.0/3 # hiển thị: 3.333..
puts  10/3.0 # hiển thị 3.333..
```
### Gán Giá Trị
Trong Ruby chúng ta có các phép toán gán giá trị khá tương tự các ngôn ngữ khác. Ngoài phép toán gán giá trị cho biến sử dụng ký tự = chúng ta còn có các phép toán gán giá trị kết hợp với phép toán số học như +=, -=, *=, /=, %= và **=.
```
a = 5 # Gán ngang bằng
puts a # hiển thị: 5

 # Gán kết hợp phép toán số học
a += 5 # tương đương với a = a + 5
puts a # hiển thị: 10

a -= 5 # tương đương với a = a - 5
puts a # hiển thị: 5

a *= 5 # tương đương a = a * 5
puts a # hiển thị: 25

a /= 10 # tương đương a = a / 10
puts a # hiển thị: 2
```
Ngoài ra Ruby còn cho phép gán giá trị song song nhiều biến cùng lúc.
```
a, b, c, d = 5, 6, "5", 5
puts a # hiển thị: 5
puts b # hiển thị: 6
puts c # hiển thị: 5
puts d # hiển thị: 5
```
### Phép Toán So Sánh

Chúng ta có 2 phép so sánh ngang bằng là == (so sánh ngang bằng về giá trị) và === (so sánh ngang bằng về giá trị và kiểu dữ liệu):

```
a, b, c, d = 5, 6, "5", 5
puts a == b # false
puts a == c # true

puts a == c # false
puts a === d # true
```
So Sánh lớn hơn, lớn hơn hoặc bằng, nhỏ hơn và nhỏ hơn hoặc bằng:

```
a, b, c = 5 , 7, 5
puts a > b # false
puts a >= c # true
puts a >= b # false

puts a < b # true
puts a <= c # true
puts a <= b # true
```
## Phương Thức

### Định Nghĩa Phương Thức
Phương thức trong Ruby tương tự như khái niệm hàm trong một số ngôn ngữ phổ biến khác. Phương thức giúp gộp một hay nhiều câu lệnh và sử dụng chúng lặp đi lặp lại nhiều lần trong chương trình.
```
def say 
  puts "Xin Chào"
end
```
`def `là viết tắt của từ define
### Gọi Phương Thức
Để thực thi các câu lệnh bên trong phương thức chúng ta cần gọi phương thức. Để gọi phương thức này chúng ta thêm cặp dấu ngoặc đơn () vào phía sau tên phương thức:
```
def say
  puts "Xin Chào"
end

say() # hiển thị: Xin Chào
```
Ruby cho phép chúng ta có thể gọi hàm mà không cần sử dụng cặp dấu ngoặc () như sau:
```
def say
  puts "Xin Chào"
end

say # hiển thị Xin Chào
```
### Tham Số, Đối Số

Tham số được sử dụng để truyền dữ liệu vào phương thức khi phương thức được gọi. Ví dụ:

```
def hello(name)
  puts "Chào #{name}"
end
```
Ở trên chúng ta định nghĩa phương thức hello với một tham số là name. Bên trong phương thức chúng ta sử dụng giá trị của tham số bằng cách đặt tên tham số bên trong #{ }:
```
puts "Chào #{name}"
```
Khi gọi phương thức chúng ta cần truyền vào giá trị cho tham số (hay đối số):
```
def hello(name)
  puts "Chào #{name}"
end

hello("Tình") # Chào Tình
```
Bạn cũng có thể định nghĩa phương thức cho phép việc truyền vào tham số hay không là tùy ý bằng cách đặt giá trị mặc định cho tham số:

```
def hello(name = "Tình")
  puts "Chào #{name}"
end

hello # Chào Tình. Khi gọi phương thức hello nếu bạn không truyền đối số vào thì đối số mặc định Tình sẽ được sử dụng:
```
## Câu Lệnh Điều Khiển
Câu lệnh điều khiển được sử dụng để điều khiển luồng chạy của chương trình. Ruby cung cấp cho chúng ta các câu lệnh điều khiển phổ biến sau đây:

### Câu Lệnh if

Câu lệnh if được sử dụng để kiểm soát việc thực thi của một (hoặc một số) câu lệnh dựa trên tính đúng của biểu thức điều kiện:

```
a = 20
if a > 10
    puts "a lớn hơn 10"
end
```
Ở ví dụ trên khi biểu thức điều kiện `a > 10` trả về giá trị `true` thì câu lệnh `puts "a lớn hơn 10"` đặt bên trong mệnh đề if sẽ được thực thi.
Câu lệnh trên còn có thể được viết chỉ trong một dòng sử dụng từ khoá `then`:
```
a = 20
if a > 10 then puts "a lớn hơn 10" end
```
### Câu Lệnh if...else

Với câu lệnh `if..else` nếu như biểu thức điều kiện trả về giá trị `true` thì các câu lệnh nằm trong mệnh đề `if `sẽ được thực thi ngược lại các câu lệnh bên trong mệnh đề `else` sẽ được thực thi:
```
a = 5
if a > 10
    puts "a lớn hơn 10"
else
   puts "a nhỏ hơn 10"
end
```
### Câu Lệnh if...elsif...else

Sử dụng `if...elsif..else` nếu có nhiều biểu thức điều kiện cần được kiểm tra.
```
a = 5
if a > 0
    puts "a là số dương"
elsif a < 0
    puts "a là số âm"
else
    puts "a bằng 0"
end
```
### Câu Lệnh unless

Câu lệnh điều khiển unless cũng được sử dụng tương đối phổ biến trong Ruby. Với câu lệnh này thì câu lệnh đặt trước biểu thức điều kiện unless luôn được thực thi trừ khi biểu thức này trả về giá trị true:
```
a =  1
unless a == 0
    print "a khác 0"
end
```
Ví dụ trên câu lệnh `print "$a khác 0"` sẽ luôn được thực thi trừ khi `$a == 0`
Ví dụ trên cũng có thể được viết theo cách tương đương như sau (lưu ý từ khoá end đã được bỏ đi):
```
a = 1
print "a khác 0" unless a == 0
```
### Câu Lệnh case

Câu lệnh case trong Ruby tương tự như câu lệnh SWITCH trong các ngôn ngữ khác:

```
site =  "Facebook"
case site
when "Google"
    puts "Trang tìm kiếm"
when "Facebook"
    puts "Trang mạng xã hội"
when "Youtube"
    puts "Trang chia sẻ video clip"
when "SlideShare"
    puts "Trang chia sẻ slide"
else
    puts "Website khác"
end
```
Ở ví dụ trên Ruby sẽ so sánh giá trị của biến site so với các giá trị trong mệnh đề when, nếu hai giá trị này là như nhau thì câu lệnh (hoặc khối lệnh) đặt trong when sẽ được thực thi.

## Vòng Lặp
Vòng lặp dùng để sử dụng để thực thi một câu lệnh hoặc một đoạn mã lệnh lặp đi lặp lại một số lần nhất định.

### Vòng Lặp while

Vòng lặp while trong Ruby có cú pháp như sau:
```
while biểu_thức_điều_kiện [do]
    mã_lệnh
end
```
Khi biểu thức điều kiện trả về giá trị true thì mã lệnh bên trong mệnh đề while sẽ được thực thi.
```
counter = 0

while counter < 5 do
   puts "Giá trị của biến counter là: #{counter}"
   counter +=1 # tăng giá trị của counter 1 đơn vị
end
```
Bạn cũng có thể thay từ khoá do sau biểu thức điều kiện bởi ký tự ; .
```
counter = 0

while counter < 5 ;
   puts "Giá trị của biến counter là: #{counter}"
   counter +=1 # tăng giá trị của i 1 đơn vị
end
```
Ngoài ra, vòng lặp while còn được viết với cú pháp khác như sau:
```
mã_lệnh while biểu_thức_điều_kiện
```
Ví dụ:
```
counter = 0

puts "Giá trị của biến counter là #{counter += 1}" while counter > 5
```
Ví dụ trên sử dụng cú pháp #{counter += 1} để hiển giá trị của biến counter được in ra màn hình sau đó tăng giá trị này đi 1 đơn vị. Việc này sẽ kết thúc cho tới khi nào biến counter > 5.

Câu lệnh while còn có thể được viết theo cú pháp sau:
```
begin 
    mã_lệnh 
end while biểu_thức_điều_kiện
```
Ví dụ:
```
counter = 0

begin
   puts "Giá trị của biến counter là #{counter += 1}"
end while counter > 5
```
Sử dụng cách này thì mã lệnh đặt trong câu lệnh begin luôn được thực thi ít nhất 1 lần ngay cả khi biểu thức điều kiện không trả về giá trị true ở vòng lặp đầu tiên. Ví dụ sau thay giá trị của counter là 5 thay vì 0 như lúc trước tuy nhiên mặc dù counter > 5 trả về giá trị false nhưng vòng lặp vẫn được chạy 1 lần:
```
counter = 5

begin
   puts "Giá trị của biến counter là #{counter += 1}"
end while counter > 5
```
### Vòng lặp for

Vòng lặp for trong Ruby có cú pháp hơi khác so với các ngôn ngữ khác:
```
for i in 0..5
   puts "Giá trị của biến i là: #{i}"
end
```
Ở ví dụ trên chúng ta sử dụng vòng for để lặp biến i trong phạm vi 0 tới 5 sử dụng kiểu dữ liệu range 0..5 và in ra giá trị của biến này. 

### Vòng lặp each và Blocks

Mặc dù for là vòng lặp được sử dụng phổ biến ở các ngôn ngữ lập trình khác thì trong Ruby each được sử dụng nhiều hơn:
```
(1..5).each do |counter|
  puts "Giá trị của counter: #{counter}"
end
```
Ví dụ trên sử dụng phương thức each có trong kiểu dữ liệu phạm vi 1..5. Phương thức này sẽ lặp qua từng đơn vị trong phạm vi và gán giá trị lặp này cho biến counter sau đó in ra màn hình giá trị này.

Vòng lặp each còn có thể được viết sử dụng cú pháp đơn giản như sau:
```
(1..5).each {|counter| puts "iteration #{counter}"}
```
Ví dụ trên sử dụng block (phần bắt đầu từ dấu ngoặc mở { cho tới dấu ngoặc đóng }) để thay thế cho cặp từ khoá do...end.
### Vòng lặp until

Cú pháp
```
until biểu_thức_điều_kiện [do]
    mã_lệnh
end
```
Trong đó mã lệnh sẽ được thực thi cho tới khi nào biểu thức điều kiện trả về giá trị là true.

Trong ví dụ sau giá trị của biến counter sẽ được hiển thị ra màn hình cho tới khi nào biểu thức counter > 5 trả về giá trị đúng:

```
counter = 0

until counter > 5  do
   puts("Giá trị của biến counter là #{counter += 1}" )
end
```
Bạn cũng có thể viết vòng lặp until theo cú pháp sau:
```
mã_lệnh until biểu_thức_điều_kiện
```
Ví dụ:
```
puts("Giá trị của biến counter là #{counter += 1}" ) until counter > 5
```
Hoặc sử dụng cú pháp:
```
begin
    mã_lệnh
end until biểu_thức_điều_kiện
```
Ví dụ:
```
counter = 0

begin
   puts("Giá trị counter là: #{counter += 1}" )
end until counter > 5
```
### break và next

Sử dụng từ khoá `break` được sử dụng để chấm dứt vòng lặp. Ở ví dụ dưới đây vòng lặp sẽ được chấm dứt nếu như biến i có giá trị lớn hơn 2:

```
for i in 0..5
    if i > 2 then
       break
    end
    puts "Giá trị của biến i là #{i}"
end
```
Sử dụng `next` để bỏ qua 1 vòng lặp để tiếp tục chạy vòng lặp tiếp theo. Ở ví dụ dưới đây vòng lặp sẽ được bỏ qua khi i có giá trị là 2:

```
for i in 0..5
    if i == 2 then
        next
    end
    puts "Giá trị của biến i là #{i}"
end
```
## Kiểu Dữ Liệu
### Chuỗi (String)

Chuỗi dùng để biểu diễn các ký tự chữ cái, chữ số, khoảng trắng, dấu xuống dòng và các ký tự đặc biệt như !, @, #, $.... Kiểu dứ liệu chuỗi được biểu diễn bằng dấu ' hoặc ".
```
string_1 = "Ruby"
string_2 = 'Ruby'
puts string_1 == string_2 # true
puts string_1 === string_2
```
Đếm Ký Tự Trong Chuỗi

Sử dụng phương thức length để đếm số ký tự trong một chuỗi:
```
string = "Ruby"
puts string.length
```
In Hoa, In Thường

Bạn có thể in hoa hay in thường các ký tự trong chuỗi sử dụng phương thức downcase và upcase. Cả 2 phương thức này đều không làm thay đổi giá trị của chuỗi ban đầu:

```
string = 'Ruby'
puts string.downcase # hiển thị: ruby
puts string # hiển thị: Ruby
puts string.upcase # hiển thị: RUBY
puts string # hiển thị: Ruby
```
Để thay đổi chuỗi ban đầu bạn cần thêm ký tự ! vào sau phương thức:

```
string = 'Ruby'
puts string.downcase! # hiển thị: ruby
puts string # hiển thị: ruby
puts string.upcase! # hiển thị: RUBY
puts string # hiển thị: RUBY
```
### Symbol

Kiểu dữ liệu Symbol trong Ruby khá đặc biệt, nó không dùng để biểu tượng hoá một giá trị (thường là chuỗi) nào đó mà giá trị này sẽ không thay đổi trong suốt quá trình thực thi chương trình.
```
status = :pending
puts status.class # hiển thị: Symbol
puts :pending.class # hiển thị: Symbol

puts status == 'pending' # hiển thị: false
```
Đối tượng Symbol chỉ cần phải khởi tạo lần đầu và sau đó có thể sử dụng lại mà không cần tạo đối tượng mới.
```
status_1 = :pending
status_2 = :pending
puts status_1 == status_2 # hiển thị: true
puts status_1 === status_2 # hiển thị: true
```
Bây giờ cùng so sánh ví dụ trên nếu sử dụng chuỗi:
```
status_1 = "pending"
status_2 = "pending"
puts status_1 == status_2 # hiển thị: true
puts status_1 === status_2 # hiển thị: false
```
Ở ví dụ trên 2 biến status_1 và status_2 được khởi tạo với 2 đối tượng chuỗi khác nhau nhưng có cùng giá trị là pending.

### Mảng (Array)

Kiểu dữ liệu mảng giống như một bộ sưu tập bao gồm các giá trị và từng giá trị được đánh số thứ tự bắt đầu từ 0.
```
numbers = [1, 2, 3, 4, 5]

puts numbers[0] # hiển thị: 1
puts numbers[4] # hiển thị: 5
```
Mảng có thể chứa các giá trị thuộc nhiều kiểu dữ liệu khác nhau.
```
array = [1, "Ruby", false]
```
Trong Ruby, chúng ta có thể truy cập mảng theo các cách sau:
```
numbers = [1, 2, 3, 4, 5]

# phần tử ở vị trí -1 là phần tử cuối của mảng
puts numbers[-1] # hiển thị 5

# bắt đầu từ phần tử ở vị trí số 2 và lấy ra 2 phần tử
puts numbers[2, 2] # hiển thị: [3, 4]

# lấy từ phần tử số 1 cho tới phần tử số 3
puts numbers[1..3] # hiển thị [2, 3, 4]
```
Đếm Số Phần Tử

Sử dụng phương thức length để đếm số phần tử trong mảng.
```
numbers = [1, 2, 3, 4, 5]
puts numbers.length # hiển thị: 5
```
Tìm Kiếm Giá Trị Trong Mảng

Để kiểm tra xem mảng có chứa giá trị nào đó hay không chúng ta sử dụng phương thức include?:
```
numbers = [1, 2, 3, 4, 5]
puts numbers.include?(3) # hiển thị: true

# hoặc bạn cũng có thể bỏ dấu ngoặc đơn
puts numbers.include? 3 # hiển thị: true
```
Truy Cập Các Phần Tử

Sử dụng phương thức first và last để truy cập vào phần tử đầu tiên và phần tử cuối cùng:
```
numbers = [1, 2, 3, 4, 5]
puts numbers.first # hiển thị: 1
puts numbers.last # hiển thị: 5
```
Hoặc sử dụng phương thức [] của mảng với đối số truyền vào là giá trị khoá của phần tử.

```
numbers = [1, 2, 3, 4, 5]

# sử dụng phương thức [] của mảng numbers
puts number[](0) # hiển thị: 1
puts number[] (4) # hiển thị: 5

# bạn cũng có thể bỏ cặp dấu ngoặc đơn khi gọi phương thức
puts number[] 0 # hiển thị: 1
puts number[] 4 # hiển thị: 5
```
### Phạm Vi (Range)

Trong Ruby phạm vi (hay range) bao gồm một số giá trị nằm trong phạm vi nhất định. Phạm vi được định nghĩa sử dụng dấu () như sau:

```
range_1 = (1..5)
puts range_1 # hiển thị: 1, 2, 3, 4, 5

range_2 = (1...5)
puts range_2 # hiển thị: 1, 2, 3, 4

range_3 = ("a".."e")
puts range_3 # hiển thị: a, b, c, d, e
```
Phạm vi có thể được chuyển qua kiểu dữ liệu mảng sử dụng phương thức to_a:
```
range_1 = (1..10).to_a
range_2 = ("car".."cat").to_a

puts "#{range_1}" # hiển thị: [1, 2, 3, 4, 5]
puts "#{range_2}" # hiển thị: [car, cas, cat]
```
Phạm vi thường được sử dụng trong vòng lặp for:
```
for i in (1..5)
    puts "Giá trị của i là: #{i}"
end
```
Hoặc vòng lặp each:
```
(1..5).each do |i|
   puts "Giá trị của i là: #{i}"
end
```
Giá Trị Lớn Nhất & Nhỏ Nhất Của Phạm Vi

Sử dụng phương thức min và max để tìm giá trị lớn nhất và nhỏ nhất của phạm vi.
```
range = [2, 3, 4, 5, 6, 7]
puts "GTLN là: #{range.min}" # hiển thị: 2
puts "GTNN là: #{range.max}" # hiển thị: 7
```
Kiểm Tra Giá Trị Nằm Trong Phạm Vi
Để kiểm tra một giá trị có nằm trong phạm vi hay không chúng ta sử dụng phương thức include?:
```
range = [2, 3, 4, 5, 6, 7]
puts range.include? 3 # hiển thị: true
puts range.include? 10 # hiển thị: false
```
### Hash

Trong Ruby kiểu dữ liệu hash tương tự như mảng với giá trị khoá có thể là 1 chuỗi, 1 số hay một đối tượng object thay vì số.
```
hash = {"color" => "Green", "number" => 100, 0 => "Blue"}

puts "#{hash['color']}" # hiển thị: Green
puts "#{hash['number']}" # hiển thị: 100
puts "#{hash[0]}" # hiển thị: Blue
```
Bạn cũng có thể khởi tạo hash sử dụng Symbol cho khoá:
```
hash = { :color => "Green", :number => 100}
```
Với các phiên bản Ruby từ 1.9 trở lên, chúng ta còn có thể viết đoạn mã ở trên theo cấu trúc gọn hơn như sau:
```
hash = { color: "Green", number: 100}
```
# Ruby on Rails Là Gì

Ruby on Rails là một khung làm việc (web framework) được viết trên ngôn ngữ lập trình Ruby và được sử dụng trong việc xây dựng và phát triển các ứng dụng web. Phiên bản đầu tiên của Ruby on Rails được giới thiệu ra cộng đồng vào năm 2015. Ruby on Rails là phần mềm mã nguồn mở miễn phí được phát triển bởi David Heinemeier Hansson.

**Tại Sao Chọn Rails**
Ruby on Rails được xây dựng trên các tập quán hiện đại nhất trong xây dựng và phát triển website do đó khi bạn nắm vững Ruby on Rails bạn sẽ dễ dàng chuyển sang một web framework khác.
Ruby on Rails có cấu trúc trong sáng và dễ hiểu rất dễ tiếp cận cho những lập trình viên mới vào nghề. Ngoài ra, Rails cung cấp cho chúng ta công cụ cửa sổ dòng lệnh CLI giúp tự động hoá nhiều công việc thường gặp khi lập trình qua đó tăng tốc độ và hiệu suất làm việc.
Ngoài ra, Ruby on Rails cũng là một trong những web framework được sử dụng phổ biến nhất hiện nay và được sử dụng bởi nhiều website lớn trên thế giới trong đó có mạng xã hội Twitter, trang mạng xã hội cho lập trình viên Github, công cụ quản lý dự án hàng đầu Redmine...

**Ruby on Rails và Ruby**
Ruby là ngôn ngữ lập trình, sử dụng Ruby các lập trình viên có thể phát triển nhiều loại ứng dụng khác nhau ngoài việc tạo website ví dụ như các phần mềm chạy trên máy tính cá nhân hay máy chủ.
Ruby on Rails là web framework được viết sử dụng ngôn ngữ Ruby. Ruby on Rails chỉ giới hạn trong việc xây dựng và phát triển các ứng dụng web.