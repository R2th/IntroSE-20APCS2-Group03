![](https://images.viblo.asia/f787b25b-d4be-499f-8bf5-9c68cf1b23d9.png)

## Hash là gì?
Hash là một kiểu cấu trúc dữ liệu lưu trữ các items bằng các keys liên quan.
Hash ngược với arrays (mảng) - nơi lưu trữ các items theo index (đánh số thứ tự).
Các entry (mục nhập) trong hash thường được gọi là cặp Key-value. 

Thông thường, hash được tạo ra bằng cách: sử dụng ký hiệu làm key, value là kiểu dữ liệu bất kỳ. Tất cả các cặp key-value  trong một hash được bao quanh bởi dấu ngoặc nhọn {} và được phân tách bằng dấu phẩy.

Hash được tạo ra bằng hai cú pháp (syntaxes). Cú pháp kiểu cũ đi kèm với dấu => để phân tách key và value.


```
irb :001 > old_syntax_hash = {:name => 'bob'}
=> {:name=>'bob'}
```
Cú pháp kiểu mới được giới thiệu trong phiên bản Ruby 1.9 và đơn giản hơn nhiều.
Như bạn có thể thấy, kết quả 2 cú pháp này là như nhau.

```
irb :002 > new_hash = {name: 'bob'}
=> {:name=>'bob'}
```
Bạn cũng có thể có hash với nhiều cặp key-value.

```
irb :003 > person = { height: '6 ft', weight: '160 lbs' }
=> {:height=>'6 ft', :weight=>'160 lbs'}
```
Giả sử bạn muốn thêm giá trị vào hash đã có từ trước.


```
irb :004 > person[:hair] = 'brown'
=> "brown"
irb :005 > person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown'}
```

irb :006> person[:age] = 62
=> 62
irb :007> person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown', :age=>62}
And what if you want to remove something from an existing hash?


```
irb :008 > person.delete(:age)
=> 62
irb :009 > person
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown'}
```
Bây giờ, làm cách nào để bạn lấy một phần thông tin từ hash?


```
irb :010 > person[:weight]
=> "160 lbs"
```

Điều gì sẽ xảy ra nếu bạn muốn merge 2 hash với nhau?


```
irb :011 > person.merge!(new_hash)
=> {:height=>'6 ft', :weight=>'160 lbs', :hair=>'brown', :name=>'bob'}
```

Lưu ý rằng trong ví dụ trên, chúng ta đã sử dụng bang suffix (!) để cho thay đổi này bị hủy. Chúng ta cũng có thể chọn sử dụng phương pháp merge để thay thế. Phương pháp này sẽ trả về một hash đã được merged mới, nhưng vẫn giữ nguyên hash ban đầu, không sửa đổi.

## Lặp lại các bước thông qua Hashes
Vì hash có chứa nhiều phần tử bên trong nó, nên sẽ có lúc bạn muốn lặp lại hash để thực hiện thao tác gì đó với từng phần tử. Việc lặp lại hash tương tự như lặp lại trong arrays,  kèm theo một số khác biệt nhỏ. Chúng ta sẽ sử dụng lại method **each** . Trong lần này chúng ta sẽ tạo một file mới để test thử.


```
# iterating_over_hashes.rb

person = {name: 'bob', height: '6 ft', weight: '160 lbs', hair: 'brown'}

person.each do |key, value|
  puts "Bob's #{key} is #{value}"
end
```
Chúng ta sẽ dùng method each nhuw trước đó. Nhưng lần lần chúng ta sẽ gán biến cho cả key và value. Trong ví dụ này, chúng ta đang set key cho biến key và value cho biến value. Chạy chương trình này trong command line  **iterating_over_hashes.rb** để xem kết quả. Ta có output như sau:


```
Bob's name is bob
Bob's height is 6 ft
Bob's weight is 160 lbs
Bob's hair is brown
```
## Hashes được dùng như mộ tham số tùy chọn
Trong chapter 3 nói về các method, chúng ta đã nói về khả năng gán tham số mặc định vào methods của bạn để output luôn nhất quán. 
Bạn cũng có thể sử dụng hash để chấp nhận các tham số tùy chọn (optional parameter) khi tạo method. Điều này có thể sẽ giúp ích cho bạn khi bạn muốn các method của mình trở nên linh hoạt và dễ diễn đạt hơn. Nó cũng giúp bạn có nhiều tùy chọn hơn, nếu bạn muốn! Hãy tạo một method thực hiện điều đó.

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

Chúng tôi đã sử dụng method "empty" của Ruby hash để phát hiện xem tham số tùy chọn- là một hash, có bất kỳ thứ gì được truyền vào nó hay không. Bạn chưa thấy method này, nhưng bạn có thể suy đoán nó hoạt động như thế nào. Bạn cũng có thể xem  Ruby document để tra cứu method. Ở phần cuối, chúng tôi đã gọi method hai lần. Một lần không sử dụng tham số tùy chọn và lần thứ hai sử dụng hash để gửi các tham số tùy chọn. Bạn có thể thấy cách sử dụng tính năng này có thể làm cho các method của bạn dễ biểu đạt hơn và linh động hơn.

Và cuối cùng, để thêm một twist nhỏ, bạn cũng có thể chuyển các đối số vào greeting method như sau:


`greeting("Bob", age: 62, city: "New York City")`

Lưu ý  dấu ngoặc nhọn, {},  không bắt buộc khi hash là đối số cuối cùng và hiệu ứng giống với ví dụ trước. Quy ước này thường được các nhà phát triển Rails sử dụng. Hiểu khái niệm này sẽ giúp bạn giải mã một số phần code Rails khó hiểu trước đây!

## Hashes vs. Arrays

Chương này và phần cuối đề cập đến hai cấu trúc dữ liệu rất quan trọng và được sử dụng rộng rãi: Hash và Array. 
Có thể bạn sẽ bị choáng ngợp khi phải xem xét các cách khác nhau để biểu diễn dữ liệu bằng code. Đừng nản lòng nha. Hãy coi như bản thân mình không thể biết tất cả mọi thứ ngay từ đầu và hãy cố gắng học tốt một vài thứ và sau đó xây dựng kiến thức của mình trên nền tảng đó.

Khi quyết định dùng Hash hay Array, hãy tự hỏi mình một số câu hỏi như sau:

Dữ liệu này có cần được liên kết với một label cụ thể không? Nếu có, hãy sử dụng hash. Nếu dữ liệu không có label, thì dùng array thông thường là được rồi.

Thứ tự có quan trọng không? Nếu có, hãy sử dụng array. Từ Ruby 1.9, các hash cũng duy trì thứ tự, nhưng các item có thứ tự thường được lưu trữ trong một array.

Có cần cấu trúc "stack" hay "queue" không? Array sẽ rất thích hợp trong việc mô phỏng các hàng đợi "first-in-first-ou" hoặc stack "last-in-first-out" .

Khi bạn làm việc trong dự án với tư cách là một developer, sự quen thuộc của bạn với hai cấu trúc dữ liệu này sẽ tự nhiên ảnh hưởng đến cấu trúc dữ liệu mà bạn tiếp cận khi tìm cách giải quyết các vấn đề cụ thể. Điều quan trọng là thực hành và thử nghiệm với từng cấu trúc để tìm ra cấu trúc dữ liệu nào hoạt động tốt nhất trong từng tình huống nhất định.

## Lưu ý về Hash Keys

Tới đây, chúng ta đã sử dụng các ký hiệu để làm key trong tất cả các hash mà chúng ta đã tạo. Chúng ta làm như vậy là vì đây là case sử dụng phổ biến nhất của Hash. Tuy nhiên, có thể sử dụng một kiểu dữ liệu khác để làm key. Hãy cùng xem ví dụ dưới đây.


```
irb :001 > {"height" => "6 ft"}     # string as key
=> {"height"=>"6 ft"}
irb :002 > {["height"] => "6 ft"}   # array as key
=> {["height"]=>"6 ft"}
irb :003 > {1 => "one"}             # integer as key
=> {1=>"one"}
irb :004 > {45.324 => "forty-five point something"}  # float as key
=> {45.324=>"forty-five point something"}
irb :005 > {{key: "key"} => "hash as a key"}  # hash as key
=> {{:key=>"key"}=>"hash as a key"}
```
Khá kỳ lạ phải không nào. 
Do đó, bạn có thể thấy rằng: Hash rất đa dạng. Bạn có thể lưu trữ bất cứ thứ gì bạn muốn trong Hash. Cũng cần lưu ý rằng: Chúng ta  phải sử dụng kiểu cũ (ví dụ, dùng =>) khi chúng ta chuyển sang sử dụng các symbol làm key.

## Các methods Hash phổ biến
Hãy cùng xem một số method phổ biến đi kèm với class Hash trong Ruby.

**key?**

Method key? cho phép bạn check xem hash có chứa key đặc biệt nào đó hay không. Nó sẽ trả về giá trị boolean.


```
irb :001 > name_and_age = { "Bob" => 42, "Steve" => 31, "Joe" => 19}
=> {"Bob"=>42, "Steve"=>31, "Joe"=>19}
irb :002 > name_and_age.key?("Steve")
=> true
irb :003 > name_and_age.key?("Larry")
=> false
```

**select**

 select method cho phép bạn truyền vào block và sẽ trả về cặp giá trị key-value bất kỳ đánh giá thành true khi truyền vào block.


```
irb :004 > name_and_age.select { |k,v| k == "Bob" }
=> {"Bob"=>42}
irb :005 > name_and_age.select { |k,v| (k == "Bob") || (v == 19) }
=> {"Bob"=>42, "Joe"=>19}
```
**fetch**
Method fetch cho phép bạn chuyển một key nhất định và nó sẽ trả về value cho key đó nếu nó tồn tại. Bạn cũng có thể chỉ định option trả về nếu không có key đó.
Hãy xem tài liệu Ruby [tại đây](https://ruby-doc.org/core-2.1.0/Hash.html#method-i-fetch) để xem nó có khả năng gì khác.


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

Method to_a trả về một version dạng array cho hash của bạn. Hãy xem nó hoạt động như thế nào nhé. 
 to_a sẽ không sửa đổi hash vĩnh viễn.


```
irb :009 > name_and_age.to_a
=> [["Bob", 42], ["Steve", 31], ["Joe", 19]]
irb :010 > name_and_age
=> {"Bob"=>42, "Steve"=>31, "Joe"=>19}
```
**keys and values**

Cuối cùng, nếu bạn chỉ muốn truy xuất tất cả các keys và tất cả các values có trong hash, bạn có thể thực hiện việc này rất dễ dàng.


```
irb :0011 > name_and_age.keys
=> ["Bob", "Steve", "Joe"]
irb :0012 > name_and_age.values
=> [42, 31, 19]
```
Lưu ý rằng các giá trị trả về ở định dạng array. Vì nó trả về array, nên bạn có thể làm những việc thú vị như: in ra tất cả các key trong một hash:
` name_and_age.keys.each { |k| puts k }.`

## Lưu ý về Hash Order

Trong các version cũ của Ruby, bạn không thể dựa vào thứ tự của Hash. Tuy nhiên, kể từ Ruby 1.9, các hash duy trì thứ tự mà chúng đang được lưu. Điều quan trọng là bạn phải biết điều này vì nếu bạn đang làm việc với phiên bản Ruby cũ hơn (bất kể phiên bản nào trước Ruby 1.9) bạn không thể dựa vào hash theo bất kỳ thứ tự cụ thể nào.

## Tóm tắt
giờ đây bạn đã có một khởi đầu tốt khi biết tất cả những điều tuyệt vời mà hash có thể làm được. Khái niệm về các cặp key-value cũng sẽ xuất hiện khá thường xuyên trong các ngôn ngữ khác. Vì vậy sẽ rất hữu ích nếu bạn hiểu rõ về nó.
Bạn cũng có thể làm 1 số bài luyện tập tại [trang này](https://launchschool.com/books/ruby/read/hashes#exercises) để củng cố kiến thức.