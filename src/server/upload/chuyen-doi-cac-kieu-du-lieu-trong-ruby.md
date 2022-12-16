Mặc dù mỗi chương trình bạn tạo sẽ chứa nhiều kiểu dữ liệu, điều quan trọng cần lưu ý là bạn sẽ thực hiện các hoạt động trong cùng một kiểu dữ liệu. Đó là, bạn sẽ thực hiện toán học trên các số hoặc nối các chuỗi với nhau.
Đôi khi dữ liệu đến từ các nguồn bên ngoài, chẳng hạn như bàn phím, API hoặc cơ sở dữ liệu và bạn sẽ cần phải chuyển đổi dữ liệu để hoạt động với nó. Ruby cung cấp một số phương thức để chuyển đổi giá trị từ kiểu dữ liệu này sang kiểu dữ liệu khác. Trong hướng dẫn này, bạn sẽ chuyển đổi chuỗi thành số, đối tượng thành chuỗi, chuỗi thành mảng và chuyển đổi giữa các chuỗi và symbol.
## 1. Convert Strings to Numbers

Ruby cung cấp các method `to_i`, `to_f` để convert từ string thành number , `to_i` convert về kiểu Integer, `to_f` convert về kiểu Float:
```
"5".to_i       # 5
"55.5".to_i    # 55
"55.5".to_f    # 55.5
```
Để thể hiện điều này bằng cách tạo ra một chương trình nhỏ với hai số và hiển thị tổng. Tạo một chương trình Ruby mới gọi là adder.rb với đoạn code sau:
```
print "What is the first number? "
first_number = gets.chop

print "What is the second number? "
second_number = gets.chop

sum = first_number + second_number

print sum

Output
What is the first number? 5
What is the second number? 5
55
```
Đoạn code trên cho thấy tổng 5 và 5 là 55. Bạn biết kết quả đó sai, nhưng với máy tính thì logic đó không sai. Chương trình trên nhận vào 2 số, nhưng chúng ta không nhập số 5 mà nhập kí tự "5". Nói cách khác, chương trình trên xem như đầu vào là string "5" và "5" rồi thực hiện nối chuỗi, tức là "55"
Để tránh điều này, chúng ta cần phải convert string sang kiểu number. Sửa lại đoạn code sử dụng phương thức to_f :
```
print "What is the first number? "
first_number = gets.chop

print "What is the second number? "
second_number = gets.chop

# convert strings to numbers
first_number = first_number.to_f
second_number = second_number.to_f

sum = first_number + second_number

print sum
Output
What is the first number? 5
What is the second number? 5
10.0

```
Ngoài to_f còn có phương thức to_i
```
"123-abc".to_i  # 123
```
Trong ví dụ trên, phương thức to_i dừng lại khi nó tìm thấy kí tự không phải là số đầu tiên. Các nhà phát triển Ruby đã khai thác điều này bằng cách tạo ra các URL như 15-sammy-shark, trong đó 15 là ID, phần còn lại là mô tả của URL.
Đây là một ví dụ khác:
```
"abc".to_i     # 0
```
Trong ví dụ này, phương thức to_i đã trả về 0, khi mà không có kí tự nào có thể convert được. Điều này có thể dẫn đến hành vi không mong muốn: nếu người dùng nhập "abc" vào chương trình của bạn và bạn chuyển đổi giá trị đó thành một số nguyên và chia một số cho giá trị đó, chương trình của bạn sẽ bị sập, vì nó có thể chia cho 0.
Ruby đề xuất một cách khác trong trường hợp này là dùng phương thức Integer và Float:
```
Integer("123")  # 123
Integer("123abc") # ArgumentError: invalid value for Integer(): "123abc"
```
Sau đó, bạn có thể xử lý lỗi và cung cấp thông báo cho người dùng, yêu cầu họ cung cấp dữ liệu tốt hơn. Cách tiếp cận này ít thuận tiện hơn, nhưng nó có thể dẫn đến tính toàn vẹn dữ liệu tốt hơn.

## 2. Convert Data to String
Ruby cung cấp phương thức to_s để convert từ các loại data khác về string
```
25.to_s                    # "25"
(25.5).to_s                # "25.5"
["Sammy", "Shark"].to_s    # "[\"Sammy\", \"Shark\"]"
```
Bạn thường chuyển đổi dữ liệu thành Chuỗi khi tạo output cho chương trình.

Ví dụ: chúng ta muốn theo dõi một người mà đốt cháy calo hàng ngày sau khi tập luyện. Chúng ta muốn hiển thị tiến trình này cho người dùng, điều đó có nghĩa là chúng ta sẽ in ra các giá trị chuỗi và chuỗi cùng một lúc. Tạo tập tin calo.rb với nội dung sau:
```
user = "Sammy"
calories = 100

print "Congratulations, " + user + "! You just burned " + calories + " calories during this workout."
```
Chúng ta rất khó mã hóa tên và lượng calo trong chương trình này, nhưng trong một chương trình thực tế, bạn đã lấy các giá trị đó từ một nguồn khác.

Chạy chương trình với ruby calo.rb.

Khi bạn chạy chương trình này, bạn sẽ thấy lỗi này:
```
Output
TypeError: no implicit conversion of Integer into String
```
Ruby không cho phép bạn thêm biến calories vào phần còn lại của output, bởi vì nó là một số nguyên. Chúng ta có thể chỉ cần thay đổi nó thành một chuỗi bằng cách đặt dấu ngoặc kép xung quanh nó, bởi vì, một lần nữa, dữ liệu calo có thể đến từ một nơi nào đó mà chúng ta không kiểm soát được. Thay vào đó, chúng ta cần chuyển đổi dữ liệu calo thành một chuỗi để chúng ta có thể nối nó với phần còn lại của output.

Sửa đổi output code để nó chuyển đổi calories thành chuỗi bằng cách sử dụng phương thức to_s:
```
user = "Sammy"
calories = 100

print "Congratulations, " + user + "! You just burned " + calories.to_s + " calories during this workout."
Output
Congratulations, Sammy! You just burned 100 calories during this workout.
```
Tính năng nội suy chuỗi Ruby tự động chuyển đổi các đối tượng thành chuỗi cho bạn. Đây là phương pháp ưa thích để tạo output trong các chương trình Ruby.
```
print "Congratulations, #{user}! You just burned #{calories} calories during this workout."
```
Chạy lại chương trình và bạn sẽ thấy output giống với output bên trên.

Lưu ý: 
Các đối tượng Ruby cũng cung cấp phương thức kiểm tra rất phù hợp để gỡ lỗi. Phương pháp kiểm tra hoạt động giống như to_s. Nó thường trả về một chuỗi đại diện của đối tượng và dữ liệu của nó. Bạn sẽ không sử dụng tính năng kiểm tra trong một product app, nhưng bạn có thể sử dụng nó với các lệnh khi nhìn vào một biến trong khi code.

## 3. Convert String to Array
Nếu bạn có một chuỗi, bạn có thể convert nó thành một mảng sử dụng phương thức split:
```
"one two three".split   # ["one", "two", "three"]
```
Bạn có thể sửa chỉ định kí tự để làm dấu phân cách bằng cách truyền nó như một tham số vào phương thức split:
```
data = "Tiger,Great White,Hammerhead,Whale,Bullhead"

# Convert data to an array by splitting on commas
sharks = data.split(",")

# Sort the sharks alpabetically
sharks = sharks.sort!

# Print out the sharks
sharks.each{|shark| puts shark }
Output
Bullhead
Great White
Hammerhead
Tiger
Whale
```
Mảng Ruby là cấu trúc dữ liệu mạnh, thường được sử dụng để xử lý dữ liệu.

## 4. Convert between Strings and Symbols
Đôi khi bạn sẽ muốn chuyển đổi một symbol thành một string để bạn có thể hiển thị nó và đôi khi bạn sẽ muốn chuyển đổi một string thành một symbol để bạn có thể sử dụng nó để tìm kiếm một thứ gì đó trong Hash.

Phương thức to_s cũng hoạt động trên Symbols, vì vậy bạn có thể chuyển đổi Symbols thành String.
```
:language.to_s   # "language"
```
Điều này rất hữu ích nếu bạn cần hiển thị Symbol và muốn biến đổi giao diện của nó. Ví dụ: chương trình này lấy symbol :first_name và chuyển đổi nó thành chuỗi "First name", dễ đọc hơn chongười dùng:
```
string = :first_name.to_s

# replace underscore with a space and capitalize
string = string.gsub("_"," ").capitalize
```
Convert stirng thành symbol sử dụng method to_sym:
```
"first_name".to_sym   # :first_name
string = "First name"

# replace spaces with underscores and convert to lowercase
string = string.gsub(" ","_").downcase

# Convert to symbol
symbol = string.to_sym
```

Bạn sẽ tìm thấy các trường hợp mà bạn sẽ muốn thực hiện các chuyển đổi này, cho dù đó là hiển thị một symbol trên màn hình ở định dạng thân thiện với người sử dụng hoặc sử dụng một chuỗi để tra cứu một key trong hàm băm sử dụng các symbol cho các key của nó.

## Kết luận:
Bài viết này đã trình bày cách chuyển đổi một số loại dữ liệu gốc quan trọng sang các loại dữ liệu khác bằng các phương thức tích hợp. Bây giờ bạn có thể chuyển đổi số thành chuỗi, chuỗi thành mảng và chuyển đổi giữa các symbol và chuỗi.

Nguồn tham khảo : 
https://www.digitalocean.com/community/tutorials/how-to-convert-data-types-in-ruby