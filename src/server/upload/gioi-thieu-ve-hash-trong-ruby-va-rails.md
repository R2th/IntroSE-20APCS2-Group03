![](https://images.viblo.asia/b3bb9110-0c7f-44ae-99f2-c86037a41507.png)

Hash là một cấu trúc dữ liệu lưu trữ bằng các khóa liên quan. Điều này trái ngược với array lưu trữ các mục theo một chỉ mục có thứ tự. Các mục nhập trong một hash thường được gọi là các cặp khóa-giá trị. Điều này tạo ra một đại diện liên kết của dữ liệu. Thông thường nhất, một hash được tạo bằng cách sử dụng các ký hiệu làm khóa và bất kỳ kiểu dữ liệu nào làm giá trị. Tất cả các cặp khóa-giá trị trong một hash được bao quanh bởi dấu ngoặc nhọn {} và được phân tách bằng dấu phẩy. Hash có thể được tạo bằng hai cú pháp. Cú pháp cũ hơn đi kèm với dấu => để phân tách khóa và giá trị.

```
irb :001 > old_syntax_hash = {:name => 'bob'}
=> {:name=>'bob'}
```

Cú pháp mới hơn được giới thiệu trong phiên bản Ruby 1.9 và đơn giản hơn nhiều. Như bạn thấy, kết quả là như nhau.

```
irb :002 > new_hash = {name: 'bob'}
=> {:name=>'bob'}
```

Bạn cũng có thể có hash với nhiều cặp khóa-giá trị.

```
irb :003 > person = { height: '6 ft', weight: '160 lbs' }
=> {:height=>'6 ft', :weight=>'160 lbs'}
```

Giả sử bạn muốn thêm vào một hash hiện có.

```
irb :004 > person[:hair] = 'brown'
=> "brown"
irb :005 > person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown'}

irb :006> person[:age] = 62
=> 62
irb :007> person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown', :age=>62}
```

Và điều gì sẽ xảy ra nếu bạn muốn xóa một cái gì đó khỏi một hash hiện có?

```
irb :008 > person.delete(:age)
=> 62
irb :009 > person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown'}
```

Bây giờ làm cách nào để bạn lấy một phần thông tin từ một hash?

```
irb :010 > person[:weight]
=> "160 lbs"
```

Điều gì sẽ xảy ra nếu bạn muốn hợp nhất hai hash với nhau?

irb :011 > person.merge!(new_hash)
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown', :name=>'bob'}Lưu ý rằng chúng tôi đã sử dụng hậu tố bang (!) Để thực hiện thay đổi này là phá hủy. Thay vào đó, chúng tôi có thể chọn sử dụng phương pháp hợp nhất, phương pháp này sẽ trả về một băm được hợp nhất mới, nhưng vẫn để nguyên băm của người ban đầu không được sửa đổi.

### Lặp các phần tử trong Hash

Bởi vì hash có thể có nhiều phần tử trong chúng, nên sẽ có lúc bạn muốn lặp lại một hash để thực hiện điều gì đó với mỗi phần tử. Lặp lại các hash tương tự như lặp lại các mảng với một số khác biệt nhỏ.

```
# iterating_over_hashes.rb

person = {name: 'bob', height: '6 ft', weight: '160 lbs', hair: 'brown'}

person.each do |key, value|
  puts "Bob's #{key} is #{value}"
End
```

Chúng ta sử dụng phương thức each như trước đây, nhưng lần này chúng ta gán một biến cho cả khóa và giá trị. Trong ví dụ này, chúng tôi đang đặt khóa cho biến khóa và giá trị cho biến giá trị. Chạy chương trình này tại dòng lệnh với ruby iterating_over_hashes.rb để xem kết quả. Đầu ra là:

```
Bob's name is bob
Bob's height is 6 ft
Bob's weight is 160 lbs
Bob's hair is brown
```

### Hash dưới dạng tham số tùy chọn

Bạn cũng có thể sử dụng hash để chấp nhận các tham số tùy chọn khi tạo các phương thức. Điều này có thể hữu ích khi bạn muốn cung cấp cho các phương pháp của mình sự linh hoạt và dễ hiểu hơn. Nhiều lựa chọn hơn, nếu bạn muốn! Hãy tạo một phương thức thực hiện điều đó.

```
# optional_parameters.rb

def greeting(name, options = {})
  if options.empty?
    puts "Hi, my name is #{name}"
  else
    puts "Hi, my name is #{name} and I'm #{options[:age]}" +
         " years old and I live in #{options[:city]}."
  end
end

greeting("Bob")
greeting("Bob", {age: 62, city: "New York City"})
```

Chúng tôi đã sử dụng Ruby hash's empty? để phát hiện xem tham số tùy chọn, là một hash, có bất kỳ thứ gì được truyền vào nó hay không. Bạn chưa thấy phương pháp này nhưng bạn có thể suy ra nó hoạt động như thế nào. Bạn cũng có thể xem Tài liệu Ruby để tra cứu phương pháp. Cuối cùng, chúng tôi đã gọi phương thức hai lần. Một lần sử dụng không có tham số tùy chọn và lần thứ hai sử dụng hash để gửi các tham số tùy chọn. Bạn có thể thấy cách sử dụng tính năng này có thể làm cho các phương thức của bạn trở nên linh hoạt hơn nhiều.

Và cuối cùng, bạn cũng có thể chuyển các đối số vào phương thức chào như sau: greeting("Bob", age: 62, city: "New York City")

Lưu ý rằng dấu ngoặc nhọn, {}, không bắt buộc khi hàm băm là đối số cuối cùng.

### Các phương thức hash phổ biến

Hãy xem xét một số phương thức phổ biến đi kèm với class Ruby's Hash.

**has_key?**

Has_key? cho phép bạn kiểm tra xem một hash có chứa một khóa cụ thể hay không. Nó trả về một giá trị boolean.

```
irb :001 > name_and_age = { "Bob" => 42, "Steve" => 31, "Joe" => 19}
=> {"Bob"=>42, "Steve"=>31, "Joe"=>19}
irb :002 > name_and_age.has_key?("Steve")
=> true
irb :003 > name_and_age.has_key?("Larry")
=> false
```

**select**

Phương thức select cho phép bạn chuyển một block và sẽ trả về bất kỳ cặp khóa-giá trị nào được đánh giá là true khi chạy qua block.

```
irb :004 > name_and_age.select { |k,v| k == "Bob" }
=> {"Bob"=>42}
irb :005 > name_and_age.select { |k,v| (k == "Bob") || (v == 19) }
=> {"Bob"=>42, "Joe"=>19}
```

**fetch**

Phương thức cho phép bạn chuyển một khóa nhất định và nó sẽ trả về giá trị cho khóa đó nếu nó tồn tại. Bạn cũng có thể chỉ định một tùy chọn trả lại nếu không có khóa đó. Hãy xem các tài liệu về Ruby ở đây để xem những gì khác có thể xảy ra.

```
irb :006 > name_and_age.fetch("Steve")
=> 31
irb :007 > name_and_age.fetch("Larry")
=> KeyError: key not found: "Larry"
     from (irb):32:in `fetch'
     from (irb):32
     from /usr/local/rvm/rubies/ruby-2.5.3/bin/irb:16:in `<main>'
irb :008 > name_and_age.fetch("Larry", "Larry isn't in this hash")
=> "Larry isn't in this hash"
```

**to_a**

Phương thức to_a trả về một phiên bản mảng của hash của bạn khi được gọi.

```
irb :009 > name_and_age.to_a
=> [["Bob", 42], ["Steve", 31], ["Joe", 19]]
irb :010 > name_and_age
=> {"Bob"=>42, "Steve"=>31, "Joe"=>19}
```

**keys and values**

Nếu bạnmuốn truy xuất tất cả các khóa hoặc tất cả các giá trị từ một hash

```
irb :0011 > name_and_age.keys
=> ["Bob", "Steve", "Joe"]
irb :0012 > name_and_age.values
=> [42, 31, 19]
```

Lưu ý rằng các giá trị trả về có định dạng mảng. Bởi vì nó trả về một mảng, bạn có thể làm in ra tất cả các khóa trong một hàm băm: name_and_age.keys.each {| k | đặt k}