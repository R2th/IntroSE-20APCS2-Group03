## Kết hợp mảng
Mảng trong Ruby có thể được kết hợp bằng một số cách tiếp cận khác nhau. Một lựa chọn đơn giản là cộng chúng lại:
```ruby
days1 = ["Mon", "Tue", "Wed"]
days2 = ["Thu", "Fri", "Sat", "Sun"]
days = days1 + days2
=> ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
```

Một cách khác đó là sử dụng method `concat`:
```ruby
days1 = ["Mon", "Tue", "Wed"]
days2 = ["Thu", "Fri", "Sat", "Sun"]
days = days1.concat(days2)
=> ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
```

Các phần tử cũng có thể được thêm vào một mảng hiện có bằng phương thức `<<`. Ví dụ:
```ruby
days1 = ["Mon", "Tue", "Wed"]
days1 << "Thu" << "Fri" << "Sat" << "Sun"
=> ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
```

## Giao, hợp và khác nhau
Sự hỗ trợ của Ruby cho việc thao tác với mảng vượt xa hơn so với các ngôn ngữ script khác. Một lĩnh vực mà điều này đặc biệt đúng đó là liên quan đến khả năng tạo ra các mảng mới dựa trên sự kết hợp, giao nhau và sự khác biệt của hai mảng. Các tính năng này được cung cấp thông qua các ký hiệu toán tử tập hợp sau:

| Toán tử | Mô tả |
| :--------: | -------- |
| `-` | Sự khác biệt - Trả về một mảng mới là bản sao của mảng đầu tiên với các phần tử xuất hiện trong mảng thứ hai thì đã bị loại bỏ. |
| `&` | Sự giao nhau - Tạo một mảng mới từ hai mảng hiện có chỉ chứa các phần tử chung cho cả hai mảng. Các phần tử lặp sẽ bị loại bỏ. |
| `|` | Sự kết hợp - Nối hai mảng. Các phần tử lặp sẽ bị loại bỏ. |

<br>
Một vài ví dụ sẽ giúp làm rõ các toán tử này. Hãy bắt đầu bằng cách tạo hai mảng:

```ruby
operating_systems = ["Fedora", "SuSE", "RHEL", "Windows", "MacOS"]

linux_systems = ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora"]
```

Bây giờ, chúng ta có thể tạo một sự kết hợp của hai mảng:
```ruby
operating_systems | linux_systems
=> ["Fedora", "SuSE", "RHEL", "Windows", "MacOS", "PCLinuxOS", "Ubuntu"]
```

Như chúng ta có thể thấy từ kết quả trên, toán tử kết hợp đã nối một mảng với một mảng khác, nhưng lại loại bỏ bất kỳ phần tử nào bị trùng lặp. Tiếp theo chúng ta có thể thực hiện sự giao nhau:
```ruby
operating_systems & linux_systems
=> ["Fedora", "SuSE", "RHEL"]
```

Lần này, chúng ta chỉ nhận được các phần tử mà nằm ở cả 2 mảng.
Cuối cùng, chúng ta hãy thử thực hiện việc tìm sự khác biệt:
```ruby
operating_systems - linux_systems
=> ["Windows", "MacOS"]
```

Trong trường hợp này, mảng mới cung cấp cho chúng ta sự khác biệt của 2 mảng. Hay nói cách khác thì chúng ta có một mảng mới chứa các phần tử của mảng `operating_systems` nhưng không nằm trong mảng `linux_systems`.  Điều quan trọng là phải rõ ràng ở điểm chúng ta không chỉ đơn giản là loại bỏ các phần tử trùng lặp với toán tử này, mà là loại bỏ các phần tử khỏi mảng được chỉ định bởi toán hạng bên trái cũng có trong mảng được chỉ định bởi toán hạng bên phải. Điều này có thể được chứng minh bằng thực tế là việc chuyển đổi các toán hạng cho chúng ta kết quả khác:
```ruby
linux_systems - operating_systems
=> ["PCLinuxOS", "Ubuntu"]
```

## Xác định các thành phần mảng duy nhất
Phương thức `uniq` của lớp `Array` có thể được sử dụng để loại bỏ các phần tử trùng lặp khỏi một mảng. Ví dụ:
```ruby
linux_systems = ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora", "RHEL", "SuSE"]

linux_systems.uniq
=> ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora"]
```

Lưu ý rằng trong trường hợp này, mảng ban đầu không bị thay đổi bởi phương thức `uniq`. Nếu bạn thực sự muốn loại bỏ các bản sao khỏi một mảng sao cho chính mảng đó bị thay đổi, hãy sử dụng phương thức `uniq!` như sau:
```ruby
linux_systems
=> ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora", "RHEL", "SuSE"]

linux_systems.uniq!
=> ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora"]

linux_systems
=> ["RHEL", "SuSE", "PCLinuxOS", "Ubuntu", "Fedora"]
```

## Push và Pop
Một mảng trong Ruby có thể xử lý như stack LIFO (Last In First Out) khi các mục được `push` vào và `pop` ra khỏi mảng. Điều này có thể làm được, không có gì đáng ngạc nhiên, bằng cách sử dụng các phương thức `push` và `pop`.

Ví dụ, chúng ta có thể tạo một mảng và sau đó đẩy các phần tử lên trên nó:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors.push "indigo"
=> ["red", "green", "blue", "indigo"]

colors.push "violet"
=> ["red", "green", "blue", "indigo", "violet"]
```

Sử dụng phương thức `pop`, chúng ta cũng có thể lấy phần tử trên cùng từ mảng:
```ruby
colors.pop
=> "violet"

colors.pop
=> "indigo"
```

## So sánh mảng trong Ruby
Mảng Ruby có thể được so sánh bằng cách sử dụng các phuongq thức `==`, `<=>` và `eql?`.

Phương thức `==` trả về `true` nếu hai mảng chứa cùng một số phần tử và cùng một nội dung cho mỗi phần tử tương ứng.

Phương thức `eql?` tương tự như phương thức `==` với ngoại lệ là các giá trị trong các phần tử tương ứng có cùng loại giá trị.

Ví dụ:
```ruby
[1, 2, 3.0] == [1, 2, 3] #=> true
[1, 2, 3.0].eql? [1, 2, 3] # => false
```

Cuối cùng, phương thức `<=>` (còn được gọi là phương thức "spaceship") so sánh hai mảng và trả về `0` nếu các mảng bằng nhau, `-1` một nếu các phần tử nhỏ hơn các phần tử trong mảng kia và `1` nếu chúng lớn hơn .

## Sửa đổi mảng
Một phần tử mới có thể được chèn vào một mảng bằng phương thức `insert`. Phương thức này có đối số là giá trị chỉ mục của phần tử được chèn, theo sau là giá trị mới. Ví dụ: để chèn một màu mới giữa các phần tử `red` và `green`, ta thực hiện:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors.insert( 1, "orange" )
=> ["red", "orange", "green", "blue"]
```

Bất kỳ phần tử mảng nào cũng có thể được thay đổi đơn giản bằng cách gán một giá trị mới sử dụng chỉ mục phần tử mảng:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors[1] = "yellow"
=> "yellow"

colors
=> ["red", "yellow", "blue"]
```

Nhiều phần tử có thể được thay đổi bằng cách sử dụng `range`:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors[1..2] = "orange", "pink"
=> ["orange", "pink"]

colors
=> ["red", "orange", "pink"]
```

## Xóa các phần tử của mảng
Không có gì lạ khi cần phải xóa các thành phần riêng lẻ khỏi một mảng.

Việc xóa có thể được thực hiện dựa trên nội dung của một phần tử mảng hoặc trên vị trí chỉ mục. Để xóa dựa trên một chỉ mục, hãy sử dụng phương thức `delete_at`:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors.delete_at(1)
=> "green"

colors
=> ["red", "blue"]
```

Để xóa các thành phần mảng dựa trên nội dung, hãy sử dụng phương thức `delete`:
```ruby
colors = ["red", "green", "blue"]
=> ["red", "green", "blue"]

colors.delete("red")
=> "red"

colors
=> ["green", "blue"]
```

## Sắp xếp mảng
Mảng được sắp xếp trong Ruby bằng phương thức `sort` và `reverse`:
```ruby
numbers = [1, 4, 6, 7, 3, 2, 5]
=> [1, 4, 6, 7, 3, 2, 5]

numbers.sort
=> [1, 2, 3, 4, 5, 6, 7]
```
Như với phương thức `uniq`, việc sắp xếp có thể được áp dụng cho chính mảng đó với cách dùng phương thức `sort!`.

Thứ tự của các phần tử trong một mảng có thể được đảo ngược bằng phương thức `reverse`:
```ruby
numbers = [1, 4, 6, 7, 3, 2, 5]
=> [1, 4, 6, 7, 3, 2, 5]

numbers.sort!
=> [1, 2, 3, 4, 5, 6, 7]


numbers.reverse
=> [7, 6, 5, 4, 3, 2, 1]
```

Một cách hay hơn là truyền vào một block:
```ruby
numbers = [1, 4, 6, 7, 3, 2, 5]
=> [1, 4, 6, 7, 3, 2, 5]

numbers.sort { |a, b| b <=> a }
=> [7, 6, 5, 4, 3, 2, 1]
```

Và có cách nữa là sử dụng phương thức `sort_by`:
```ruby
numbers = [1, 4, 6, 7, 3, 2, 5]
=> [1, 4, 6, 7, 3, 2, 5]

numbers.sort_by { |a| -a }
=> [7, 6, 5, 4, 3, 2, 1]
```

*Bài viết được tham khảo từ https://www.techotopia.com/index.php/Advanced_Ruby_Arrays*