Array - Mảng, đại diện cho danh sách dữ liệu trong chương trình của bạn. Khi bạn có dữ liệu trong một mảng, bạn có thể sắp xếp, xóa những trùng lặp, đảo ngược trật tự, trích xuất phần tử, hoặc tìm kiếm dữ liệu đặc biệt nào đó trong mảng. bạn cũng có thể chuyển mảng sang 1 chuỗi string, chuyển đổi một mảng thành một mảng  dữ liệu khác và biến 1 mảng thành một giá trị duy nhất.
Trong hướng dẫn này, bạn sẽ khám phá một số phương thức thông dụng nhất mà Ruby cung cấp để làm việc với mảng.

# 1. Truy xuất tới một phần tử
Nếu bạn đã theo dõi hướng dẫn  *[How To Work with Arrays in Ruby](https://www.digitalocean.com/community/tutorials/how-to-work-with-arrays-in-ruby )* thì bạn đã biết cách truy cập vào một phần tử trong mảng sử dụng index của nó, bắt đầu bằng 0, ví dụ:
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks[0]    # "Tiger"
sharks[1]    # "Great White"
sharks[-1]   # "Angel"
```
- `first & last` : Bạn cũng có thể gọi phần tử đầu cuối bằng phương thức first & last :
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks.first   # "Tiger"
sharks.last    # "Angel"
```
- `fetch` : khi bạn truy cập vào một phần tử không tồn tại, bạn sẽ nhận được giá trị nil. Nhưng bạn muốn trả về lỗi, bạn có thể sử dụng phương thức fetch:
```
sharks.fetch(42)
Output
IndexError: index 42 outside of array bounds: -4...4
```
Nếu bạn muốn tạo default cho phần tử không tồn tại, bạn có thể làm như sau:
```
sharks.fetch(42, "Nope")     
# "Nope"
```
# 2. Truy xuất nhiều phần tử
Có nhiều lần bạn muốn lấy một tập hợp con các phần tử từ mảng thay vì chỉ lấy 1 phần tử. Nếu bạn chỉ định một index bắt đầu, sau đó là số phần tử mà bạn muốn, bạn sẽ nhận được một mảng mới chứa các giá trị đó. ví dụ:
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks[1,2]   # ["Great White", "Hammerhead"]
```
- `slice` : Bạn cũng có thể sử dụng `slice` để làm điều tương tự:
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks.slice(1,2)   # ["Great White", "Hammerhead"]
```
Phương thức `slice` cũng trả về một mảng mới, không thay đổi mảng ban đầu. Tuy nhiên, nếu bạn muốn thay đổi thì có thể sử dụng phương thức `slide!`
- `take` :  cho phép bạn lấy số lượng phần tử được chỉ định từ đầu một mảng:
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sharks.take(2)  # ["Tiger", "Great White"]
```
# 3. Lấy ngẫu nhiên phần tử từ một mảng
Lấy ngẫu nhiên một phần tử từ mảng có thể áp dụng khi bạn đang xây dựng một trò chơi random,... 
- `sample` :
```
answers = ["Yes", "No", "Maybe", "Ask again later"]
print answers.sample

Output
Maybe
```
`sample` có thể nhận tham số là số lượng phần tử muốn lấy ra, ví dụ:
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
sample = sharks.sample(2)
print sample

Output
["Whale", "Great White"]
```
# 4. Tìm kiếm, lọc phần tử
Khi bạn muốn tìm kiếm những phần tử đặc biệt trong một mảng, bạn thường lặp đi lặp lại các điều kiện cho đến khi bạn tìm được. Nhưng Ruby đã cung cấp những phương thức để đơn giản hóa quá trình tìm kiếm.
- `include?` : tìm kiếm sự hiện diện của phần tử nào đó trong mảng, trả về true/false:
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
sharks.include? "Tiger"      # true	
["a", "b", "c"].include? 2   # false
```
Lưu ý, `include? `yêu cầu một điều kiện chính xác, ví dụ:
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
sharks.include? "Tiger"      # true
sharks.include? "tiger"      # false
sharks.include? "ti"         # false
```
- `find` : định vị và trả về phần tử đầu tiên thỏa mãn điều kiện
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
result = nil
sharks.each do |shark|
  if sharks.include? "a"
    result = shark
    break
  end
end
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
result = sharks.find {|item| item.include?("a")}
print result

Output
Hammerhead
```
`find` thực thi khối lệnh bạn cung cấp cho mỗi phần tử trong mảng. Nếu biểu thức cuối cùng trong khối là `true`, `find` trả về giá trị đúng và dừng vòng lặp. Nếu không thấy kết quả thì sau khi lặp qua tất cả các phần tử nó sẽ trả về `nil`.
- `select` : gần giống `find`, chỉ khác là nó trả về một mảng mới chứa tất cả các giá trị thỏa mãn điều kiện, nếu không có nó sẽ trả về mảng rỗng
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
results = sharks.select {|item| item.include?("a")}
print results

Output
["Hammerhead", "Great White", "Whale"]
```
- `reject` : ngược lại với `select`
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
results = sharks.reject {|item| item.include?("a")}
print results

Output
["Tiger"]
```
Cả `select` và `reject` đều không thay đổi giá trị mảng ban đầu, nếu bạn muốn, có thể sử dụng `select!` hoặc `reject!`
- `find_all` : alias của `select`, nhưng không tồn tại phương thức `find_all!`

# 5. Sắp xếp mảng
- `reverse` : đảo ngược mảng
```
sharks = ["Angel", "Great White", "Hammerhead", "Tiger"]
reversed_sharks = sharks.reverse
print reversed_sharks

Output
["Tiger", "Hammerhead", "Great White", "Angel"]
```
`reverse` không thay đổi mảng ban đầu, có phương thức` reverse!` sẽ thay đổi mảng ban đầu
- `sort` : sắp xếp mảng theo chiều tăng dần
```
sharks = ["Tiger", "Great White", "Hammerhead", "Angel"]
sorted_sharks = sharks.sort
print sorted_sharks

Output
["Angel", "Great White", "Hammerhead", "Tiger"]
```

- `sort_by` : sắp xếp với điều kiện cho trước
```
sharks = [
  {name: "Hammerhead"},
  {name: "Great white"},
  {name: "Angel"}
]

sorted_sharks = sharks.sort_by{|shark| shark[:name] }
print sorted_sharks
Output
[{:name=>"Angel"}, {:name=>"Great white"}, {:name=>"Hammerhead"}]
```
Cả `sort` và `sort_by` đều không làm thay đổi mảng ban đầu, nếu muốn bạn có thể sử dụng `sort!` hoặc `sort_by!`

# 6. Xóa các phần tử lặp
- `uniq` :
```
[1,2,3,4,1,5,3].uniq   # [1,2,3,4,5]
```
- Đối với hai mảng:
```
sharks = ["Tiger", "Great White"]
new_sharks = ["Tiger", "Hammerhead"]
sharks + new_sharks
# ["Tiger", "Great White", "Tiger", "Hammerhead"]

sharks | new_sharks
# ["Tiger", "Great White", "Hammerhead"]

sharks = ["Tiger", "Great White"]
new_sharks = ["Tiger", "Hammerhead"]
sharks - new_sharks   # ["Great White"]
```
# 7. Chuyển đổi dữ liệu
Phương thức `map` và `collect` (alias của map) có thể biến đổi nội dung của mảng, nghĩa là nó có thể thực hiện một thao tác trên từng phần tử trong mảng.

Ví dụ: bạn có thể sử dụng `map` để thực hiện số học trên mỗi phần tử trong một mảng và tạo một mảng mới chứa các giá trị mới:
```
numbers = [2,4,6,8]

# square each number
squared_numbers = numbers.map {|number| number * number}

print squared_numbers

Out put
[4, 16, 36, 64]
```
`map` thường được sử dụng trong các ứng dụng web để chuyển đổi một mảng thành các thành phần cho danh sách HTML. Ví dụ:
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]

options = sharks.map {|shark| "<option>#{shark}</option>"}

print options

Out put
["<option>Hammerhead</option>", "<option>Great White</option>", "<option>Tiger</option>", "<option>Whale</option>"]
```
`map` trả về một mảng mới, khiến cho mảng ban đầu không được sửa đổi. Sử dụng `map!` sẽ sửa đổi các mảng hiện có. Và hãy nhớ rằng `map` có alias là `collect`. Bạn nên nhất quán và sử dụng cái này hay cái khác trong code của bạn.

# 8. Chuyển đổi mảng thành chuỗi
- `to_s` : 
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
Out put:
“[\"Hammerhead\", \"Great White\", \"Tiger\", \"Whale\"]"
```
- `join` : có thể kết hợp với điều kiện để nối các phần tử trong mảng thành chuỗi  "đẹp" hơn
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
result = sharks.join(" ")
print result
Output
Hammerhead Great White Tiger Whale

sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
result = sharks.join
print result

Output
HammerheadGreat WhiteTigerWhale
```
Sử dụng `map` và `join` là cách nhanh chóng để chuyển đổi một loạt các dữ liệu. Sử dụng map khi muốn chuyển đổi một số phần tử trong mảng, sau đó dùng `join` để nối chúng lại với nhau. Ví dụ:
```
sharks = ["Hammerhead", "Great White", "Tiger", "Whale"]
options = sharks.map {|shark| "<option>#{shark}</option>"}
output = options.join("\n")
print output

Output
<option>Hammerhead</option>
<option>Great White</option>
<option>Tiger</option>
<option>Whale</option>
```
# 9. Biến mảng thành một giá trị
- `each` : 
Khi bạn làm việc với một tập hợp dữ liệu, bạn có thể thấy rằng bạn cần sắp xếp lại dữ liệu thành một giá trị duy nhất, chẳng hạn như một tổng. Một cách bạn có thể làm điều này là sử dụng một biến và phương thức `each`:
```
result = 0
[1, 2, 3].each {|num| result += num}
print result

Output
6
```
- `reduce`: 
Bạn có thể sử dụng phương thức `reduce` để làm điều này. `reduce` lặp lại trên một mảng và giữ tổng số hoạt động bằng cách thực hiện thao tác nhị phân cho mỗi phần tử.
`reduce` chấp nhận một giá trị ban đầu cho kết quả, cũng như một khối có hai giá trị cục bộ: tham chiếu đến kết quả và tham chiếu đến phần tử hiện tại. Bên trong khối, bạn chỉ định logic để tính kết quả cuối cùng.
Ví dụ:
```
output = [1,2,3].reduce(0) {|result, current| result += current }
print output

Output
6
```
Nếu bạn dự định khởi tạo kết quả là 0, bạn có thể bỏ qua đối số. Ví dụ:
```
output = [1,2,3].reduce {|result, current| result += current }
print output

Output
6
```
`reduce` cũng là bạn chỉ định một phương thức nhị phân hoặc một phương thức trên một đối tượng chấp nhận một đối tượng khác làm đối số của nó, nó sẽ thực thi cho mỗi phần tử trong mảng. `reduce` sau đó sử dụng kết quả để tạo ra một giá trị duy nhất.
```
2.+(2)   # 4
```
Ruby sử dụng một số cú pháp để bạn có thể biểu thị nó thành 2 + 2.

`reduce` cho phép bạn chỉ định một phương thức nhị phân bằng cách chuyển tên của nó thành symbol. Điều đó có nghĩa là bạn có thể truyền `: +` cho `reduce` để tính tổng mảng:
```
output = [1, 2, 3].reduce(:+)   
print output

Output
6
```
Bạn có thể sử dụng `reduce` để làm nhiều hơn là chỉ thêm danh sách các số. Bạn có thể sử dụng nó để chuyển đổi các giá trị. Hãy nhớ rằng giảm làm giảm một mảng đến một giá trị. Nhưng không có quy tắc nào nói rằng giá trị duy nhất có thể là một mảng khác.

Hãy nói rằng chúng tôi có một danh sách các giá trị mà chúng tôi cần chuyển đổi thành số nguyên. nhưng chúng tôi chỉ muốn các giá trị có thể được chuyển đổi thành số nguyên.

Chúng ta có thể sử dụng `reject`  để loại bỏ các giá trị không phải là số và sau đó sử dụng `map` để chuyển đổi các giá trị còn lại thành số nguyên. Nhưng chúng ta có thể làm tất cả trong một bước với `reduce`.

Sử dụng một mảng trống làm giá trị khởi tạo. Sau đó, trong khối, chuyển đổi giá trị hiện tại thành Số nguyên bằng phương thức `Integer`. Nếu giá trị có thể được chuyển đổi thành một số nguyên, `Integer` sẽ đưa ra một ngoại lệ, bạn có thể bắt và gán `nil` cho giá trị.

Sau đó lấy giá trị và đặt nó vào mảng, nhưng chỉ khi nó không `nil`.
```
values = ["1", "2", "a", "3"]
integers = values.reduce([]) do |array, current|
  val = Integer(current) rescue nil
  array.push(val) unless val.nil?
  array
end
print integers

Output
[1,2,3]
```
# Kết luận
Trong hướng dẫn này, bạn đã sử dụng một số phương thức để làm việc với mảng. Bạn đã lấy các phần tử riêng lẻ, truy xuất các giá trị bằng cách tìm kiếm trong mảng, các phần tử được sắp xếp và bạn đã chuyển đổi dữ liệu, tạo các mảng, chuỗi và tổng mới. Bạn có thể áp dụng các khái niệm này để giải quyết nhiều vấn đề lập trình phổ biến với Ruby.

Nguồn dịch : 
https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-ruby