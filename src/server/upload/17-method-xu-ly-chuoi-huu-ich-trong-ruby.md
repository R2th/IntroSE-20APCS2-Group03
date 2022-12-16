Mỗi dòng code bạn không viết là một dòng code bạn không phải duy trì

Thao tác với String là công việc mà các lập trình viên làm hàng ngày. Trong bài đăng này, tôi sẽ thảo luận về 17 phương thức chuỗi hiệu quả được cung cấp bởi Ruby String Class, điều này sẽ giúp bạn tiết kiệm thời gian trong việc xử lý các chuỗi.

# 1. Lặp lại từng kí tự của một chuỗi

  Thường thì chúng ta cần lặp qua các chuỗi để xử lý các ký tự. Ví dụ: bạn có thể muốn in tất cả các kí tự có trong chuỗi
  ```ruby
  str = "abcdeU"
temp = ""
str.each_char do |char|
 puts char if ['a','e','i','o','u'].include? char.downcase
end
# a
# e
# U
  ```
#  2. Chuyển đổi một chuỗi thành một mảng ký tự
Để chuyển đổi một chuỗi thành một mảng, chúng ta có thể sử dụng str.chars, là cách viết tắt của str.each_char.to_a.
```ruby
char_array = "abcdeABCDE".chars
# ["a", "b", "c", "d", "e", "A", "B", "C", "D", "E"]
```
  Bây giờ chúng ta có một mảng, chúng ta có thể sử dụng bất kỳ phương thức nào của mảng. Ví dụ: phương thức nối chuyển đổi từng phần tử của mảng thành Chuỗi, được phân tách bằng dấu phân cách đã cho.
  ```ruby
  char_array.map { |c| c.downcase }.join(', ')
# "a, b, c, d, e, a, b, c, d, e"
  ```
#   3. Lấy độ dài của một chuỗi
Mình nghĩ nghĩ đây là phương pháp được sử dụng nhiều nhất. Rất hữu ích khi bạn muốn kiểm tra độ dài chuỗi trước khi chèn nó vào bảng cơ sở dữ liệu. Tùy thuộc vào sở thích của bạn, bạn có thể chọn một trong hai. 
```ruby
"HELLO World".length 
# 11
"HELLO World".size
# 11
```
# 4. Nhận số lượng ký tự của một chuỗi
str.count nhận một hoặc nhiều bộ ký tự làm tham số. Sau đó, chúng ta lấy phần giao nhau của các bộ này để có được bộ ký tự cuối cùng.
```ruby
"look up!".count("o")
# 2
"look up!".count("m")
# 0
"abcdef".count("a-c", "c-f")
# 1
```
Chúng ta có thể sử dụng nó để đếm nhiều ký tự, ví dụ thử đếm các kí tự thường
```ruby
"abcdeUUU".downcase.count("aeiou")
# 5
```
# 5. Đảo ngược một chuỗi
Đảo ngược chuỗi có thể hữu ích, chẳng hạn như khi bạn muốn kiểm tra xem một chuỗi có phải là số nguyên tố Palindrome hay không
```ruby
str = "Anna"
str.reverse 
# "annA"
puts "palindrome" if str.downcase == str.downcase.reverse
# palindrome
# eql? is a synonym for ==
puts "palindrome" if str.downcase.eql?(str.downcase.reverse)
# palindrome
```
# 6. Tìm kiếm một hoặc nhiều ký tự của một chuỗi
str.include? trả về true nếu có chuỗi hoặc ký tự và trả về false nếu không
```ruby
"hEllo wOrlD".include?("w") 
# true
"hEllo wOrlD".include?("1") 
# false
```
# 7. Thay thế các ký tự trong một chuỗi
Thay thế một hoặc nhiều ký tự của chuỗi là một cách tốt để làm sạch hoặc định dạng dữ liệu. str.gsub thay thế tất cả các lần xuất hiện bằng các chuỗi được cung cấp. Ở đây đối số đầu tiên đại diện cho bộ ký tự mà chúng ta muốn thay thế, à đối số thứ hai là các ký tự thay thế được đặt.
```ruby
"Red, Red and Blue".gsub("Red", "Orange") 
"Orange, Orange and Blue"
```
Nếu bạn muốn thay thế lần xuất hiện đầu tiên, hãy sử dụng str.sub.
```ruby
"Red, Red and Blue".sub("Red", "Orange") 
"Orange, Red and Blue"
```
# 8. Tách một chuỗi
Tách một chuỗi dựa trên dấu phân cách (mặc định là khoảng trắng) hoặc mẫu nào đó.
```ruby
sentence = "There Is No Spoon"
words = sentence.split
# ["There", "Is", "No", "Spoon"]
sentence = "There_Is_No_Spoon"
words = sentence.split("_")
# ["There", "Is", "No", "Spoon"]
```
Bạn có thể giới hạn số lần phân tách bằng cách cung cấp đối số thứ hai
```ruby
sentence = "June 27,June 26,June 25"
words = sentence.split(/,/, 2)
# ["June 27", "June 26,June 25"]
```
# 9. Cắt một chuỗi
str.trim sẽ xóa bất kỳ ký tự đầu và cuối nào sau đây:  null("\x00"), horizontal tab("\t"), line feed(\n), vertical tab("\v"), form feed(f), carriage return(\r), space(" ").
```ruby
" hEllo WOrlD \n\t\v\r ".strip 
# "hEllo WOrlD"
```
# 10. Cắt ký tự cuối cùng của một chuỗi
str.chomp loại bỏ một ký tự ở cuối khi được cung cấp dấu phân tách bản ghi hoặc các ký tự xuống dòng (\ n, \ r và \ r \ n).
```ruby
"...hello...world...".chomp(".")
# "...hello...world.."
"...hello...world".chomp(".")
"...hello...world"
"...hello...world...\n".chomp(".")
# "...hello...world...\n"
"...hello...world...\n".chomp
# "...hello...world..."
"...hello...world...\r".chomp
# "...hello...world..."
"...hello...world...\r\n".chomp
# "...hello...world..."
"...hello...world...\n\r".chomp
"...hello...world...\n"
```
# 11. Thêm một chuỗi trước một chuỗi khác
Nối một hoặc nhiều ký tự vào một chuỗi ở đầu chuỗi.
```ruby
a = "world" 
a.prepend("hello ") 
# "hello world"
```
# 12. Chèn một chuỗi
Thêm một hoặc nhiều ký tự vào một vị trí cụ thể của một chuỗi.
```ruby
a = "hello" 
a.insert(a.length, " world") 
# "hello world"
```
# 13. Các phương pháp thay đổi trường hợp của một chuỗi
Hàm str.downcase sẽ chuyển đổi từng ký tự của chuỗi thành chữ thường.
```ruby
"HELLO World".downcase 
# "hello world"
```
str.upcase sẽ chuyển đổi mỗi ký tự của một chuỗi thành chữ hoa
```ruby
"hello worlD".upcase 
# "HELLO WORLD"
```
Hàm str.capitalize sẽ chuyển đổi ký tự đầu tiên của chuỗi thành chữ hoa và phần còn lại thành chữ thường
```ruby
"hEllo wOrlD".capitalize 
# "Hello world"
```
str.swapcase sẽ hoán đổi ký tự viết hoa thành ký tự thường và ký tự viết thường thành ký tự hoa của một chuỗi.
```ruby
"hEllo WOrlD".swapcase 
# "HeLLO woRLd"
```
# 14. Thêm chuỗi
Một trong những hoạt động string thường xuyên là nối. Để làm điều đó, chúng ta có thể sử dụng str.concat hoặc <<.
```ruby
str1 = "hello"
str2 = "world"
str1.concat(" ").concat(str2)
puts "#{str1}"
# "hello world"
# << is same as concat
str1 = "hello"
str2 = "world"
str1 << " " << str2
puts "#{str1}"
# "hello world"
```
# 15. Nhận chuỗi con
Phương thức str.slice dùng khi bạn muốn một phần cụ thể của một Chuỗi, nó trả về một chuỗi con.
```ruby
str = "hello world"
puts "#{str.slice(0, 5)}"
# hello
```
# 16. Tìm một chuỗi với tiền tố và hậu tố đã cho
Chúng ta có thể kiểm tra xem một chuỗi bắt đầu hay kết thúc bằng một chuỗi.
```ruby
str = "Mr. Leonardo"
str.start_with?("Mr.")
# true
str = "The quick brown fox jumps over the lazy dog."
str.end_with?(".")
# true
```
# 17. Kiểm tra chuỗi trống
Có lẽ một phương pháp được sử dụng thường xuyên nhất là str.empty, có thể được sử dụng để xác thực dữ liệu
```ruby
output = ""
output.empty?
# true
output = " "
output.empty?
# false
```
# Tổng kết
Giống như các ngôn ngữ khác, Ruby có các thư viện các phương thức hỗ trợ tối ưu hiệu xuất. Sử dụng 17 hàm nay sẽ giúp bạn tiết kiệm được rất nhiều thời gian. Happy coding!
# Tài liệu tham khảo
https://towardsdatascience.com/17-useful-ruby-string-methods-to-clean-and-format-your-data-9c9147ff87b9


#