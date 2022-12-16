Trong phần này chúng ta sẽ tìm hiểu về các kiểu dữ liệu.

Tất cả các chương trình máy tính trên thế giới đều sử dụng dữ liệu, từ trình soạn thảo văn bản, máy tính, game… dữ liệu cũng được chia làm nhiều loại khác nhau chẳng hạn như số, kí tự, hình ảnh, âm thanh… Kiểu dữ liệu là một tập các giá trị và các thao tác có thể có trên các giá trị đó.

Tất cả các kiểu dữ liệu trong Ruby đều là lớp. Ruby hỗ trợ một số kiểu dữ liệu cơ bản sau đây:

###   **String – chuỗi kí tự**
###   **Symbol**
###   **Array – mảng**
###   **Hashe – bảng băm**

# 1. **Chuỗi**

Chuôi dùng để biểu diễn các ký tự chữ cái, chữ số, khoảng trắng, dấu xuống dòng và các ký tự đặc biệt như !, @, #, $.... Kiểu dứ liệu chuỗi được biểu diễn bằng dấu ' hoặc ".

```
string_1 = "Ruby"
string_2 = 'Ruby'
puts string_1 == string_2 # true
puts string_1 === string_2
```
**Đếm Ký Tự Trong Chuỗi**

Sử dụng phương thức length để đếm số ký tự trong một chuỗi:

```
string = "Ruby"
puts string.length
```
**In Hoa, In Thường**

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
# 2. **Symbol**

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

# 3. **Mảng**

Kiểu dữ liệu mảng giống như một bộ sưu tập bao gồm các giá trị và từng giá trị được đánh số thứ tự bắt đầu từ 0.

```
numbers = [1, 2, 3, 4, 5]

puts numbers[0] # hiển thị: 1
puts numbers[4] # hiển thị: 5
```
Mảng có thể chứa các giá trị thuộc nhiều kiểu dữ liệu khác nhau.

`array = [1, "Ruby", false]`
Trong Ruby, chúng ta có thể truy cập mảng theo các cách sau:

```
numbers = [1, 2, 3, 4, 5]

*# phần tử ở vị trí -1 là phần tử cuối của mảng*
puts numbers[-1] # hiển thị 5

*# bắt đầu từ phần tử ở vị trí số 2 và lấy ra 2 phần tử*
puts numbers[2, 2] # hiển thị: [3, 4]

*# lấy từ phần tử số 1 cho tới phần tử số 3*
puts numbers[1..3] # hiển thị [2, 3, 4]
```
**Đếm Số Phần Tử**

Sử dụng phương thức length để đếm số phần tử trong mảng.

```
numbers = [1, 2, 3, 4, 5]
puts numbers.length # hiển thị: 5
```

**Tìm Kiếm Giá Trị Trong Mảng**

Để kiểm tra xem mảng có chứa giá trị nào đó hay không chúng ta sử dụng phương thức include?:


```
numbers = [1, 2, 3, 4, 5]
puts numbers.include?(3) # hiển thị: true

*# hoặc bạn cũng có thể bỏ dấu ngoặc đơn*
puts numbers.include? 3 # hiển thị: true
```

**Truy Cập Các Phần Tử**
    
Sử dụng phương thức first và last để truy cập vào phần tử đầu tiên và phần tử cuối cùng:

```
numbers = [1, 2, 3, 4, 5]
puts numbers.first # hiển thị: 1
puts numbers.last # hiển thị: 5
```
Hoặc sử dụng phương thức [] của mảng với đối số truyền vào là giá trị khoá của phần tử.

```
numbers = [1, 2, 3, 4, 5]

*# sử dụng phương thức [] của mảng numbers*
puts number[](0) # hiển thị: 1
puts number[] (4) # hiển thị: 5

*# bạn cũng có thể bỏ cặp dấu ngoặc đơn khi gọi phương thức*
puts number[] 0 # hiển thị: 1
puts number[] 4 # hiển thị: 5
```

**Phạm Vi (Range)**

Trong Ruby phạm vi (hay range) bao gồm một số giá trị nằm trong phạm vi nhất định. Phạm vi được định nghĩa sử dụng dấu () như sau:

```
range_1 = (1..5)
puts range_1 # hiển thị: 1, 2, 3, 4, 5
```

```
range_2 = (1...5)
puts range_2 # hiển thị: 1, 2, 3, 4
```

```
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

**Giá Trị Lớn Nhất & Nhỏ Nhất Của Phạm Vi

Sử dụng phương thức min và max để tìm giá trị lớn nhất và nhỏ nhất của phạm vi.

```
range = [2, 3, 4, 5, 6, 7]
puts "GTLN là: #{range.min}" # hiển thị: 2
puts "GTNN là: #{range.max}" # hiển thị: 7
```
**Kiểm Tra Giá Trị Nằm Trong Phạm Vi**

Để kiểm tra một giá trị có nằm trong phạm vi hay không chúng ta sử dụng phương thức include?:

```
range = [2, 3, 4, 5, 6, 7]
puts range.include? 3 # hiển thị: true
puts range.include? 10 # hiển thị: false
```
# 4. **Hash**

Trong Ruby kiểu dữ liệu hash tương tự như mảng với giá trị khoá có thể là 1 chuỗi, 1 số hay một đối tượng object thay vì số.

`hash = {"color" => "Green", "number" => 100, 0 => "Blue"}`

```
puts "#{hash['color']}" # hiển thị: Green
puts "#{hash['number']}" # hiển thị: 100
puts "#{hash[0]}" # hiển thị: Blue
```
Bạn cũng có thể khởi tạo hash sử dụng Symbol cho khoá:
```

hash = { :color => "Green", :number => 100}
```
Với các phiên bản Ruby từ 1.9 trở lên, chúng ta còn có thể viết đoạn mã ở trên theo cấu trúc gọn hơn như sau:

`hash = { color: "Green", number: 100}`

## Nếu có bất cứ khó khăn gì có thể liên hệ trực tiếp với mình hoặc tham khảo tài liệu bên dưới.
  ### Tài liệu tham khảo
  https://www.digitalocean.com/community/tutorials/understanding-data-types-in-ruby