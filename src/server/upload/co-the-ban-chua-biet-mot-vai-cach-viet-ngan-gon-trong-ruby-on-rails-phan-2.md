Tiếp nối [phần 1](https://viblo.asia/p/co-the-ban-chua-biet-mot-vai-cach-viet-ngan-gon-trong-ruby-on-rails-phan-1-gDVK2MD05Lj), mình sẽ tiếp tục mang đến những cách viết ngắn gọn trong Ruby on Rails cho các bạn trong post này.
Lên đường nàoooo!

#### Nối String với "# {}" thay vì "+"
```Ruby
"Hello, " + user.name + "!"
```

Nhìn đẹp hơn rồi nhỉ ^^
```Ruby
"Hello, #{user.name}!"
```

#### String với nhiều dòng
Cái này khá hay ho và đẹp mắt, thay vì dùng `\n` để xuống dòng 
```Ruby
text = "Hello, world!\nGood-bye, world!"
```
Chúng ta có thể viết như thế này nè
```Ruby
text = <<-TEXT
Hello, world!
Good-bye, world!
TEXT
```

#### Cố định hằng số với String
 Dù hằng số được khai báo là một chuỗi ký tự, một mảng hay một hash, thì cũng cần cố định giá trị của nó (đúng như ý nghĩa của hằng số là bất biến), không nên thay đôi hằng số
```Ruby
CONTACT_PHONE_NUMBER = "03-1234-5678"
CONTACT_PHONE_NUMBER << "@#$%^"
puts CONTACT_PHONE_NUMBER # => 03-1234-5678@#$%^
```

Cố định với `freeze`
```Ruby
CONTACT_PHONE_NUMBER = "03-1234-5678".freeze
CONTACT_PHONE_NUMBER << "@#$%^" # => RuntimeError: can't modify frozen String
```

#### Với mảng
```Ruby
ADMIN_NAMES = ["Tom", "Alice"]
ADMIN_NAMES << "Taro"
ADMIN_NAMES[0].downcase!
puts ADMIN_NAMES # => ["tom", "Alice"]
```

```Ruby
ADMIN_NAMES = ["Tom", "Alice"].freeze.each(&:freeze)
ADMIN_NAMES << "Taro" # => RuntimeError: can't modify frozen Array
ADMIN_NAMES[0].downcase! # => RuntimeError: can't modify frozen String
```

#### Với Số nguyên
Thực ra, vì số nguyên (FixNum) không thể thay đổi, nó không quan trọng nếu bạn không đóng băng nó =)))

```Ruby
# Không có lỗi và cũng không có ý nghĩa (yaoming)
ITEM_LIMIT = 500.freeze
```

#### Khi khởi tạo array hay hash, có thể (nên) giữ dấu "," ở phần tử cuối cùng
```Ruby
countries = [
  :japan,
  :italy,
  :uk
]

capitals = {
  japan: 'Tokyo',
  italy: 'Rome',
  uk: 'London'
}
```

```Ruby
countries = [
  :japan,
  :italy,
  :uk,
]

capitals = {
  japan: 'Tokyo',
  italy: 'Rome',
  uk: 'London',
}
```

Tại sao mình khuyên các bạn nên giữ dấu "," vào phần tử cuối cùng khi code, vì sẽ có trường hợp các phần tử được thêm vào trong tương lai, khi đó chúng ta không cần phải sửa đổi dòng trước đó, có thể tiết kiệm cho bạn 1 chút thời gian. Ngoài ra, nếu bạn thêm dấu phẩy vào tất cả các phần tử, bạn cũng có thể sửa đổi thứ tự của các phần tử bằng cách cắt và dán đơn giản mà không phải lo lắng gì cả.

#### Khi tạo mảng, hãy sử dụng %w(),%i() thay vì []
Cách viết này khá ngắn gọn và nhìn code đẹp + pro hơn xíu xíu đó :D
```Ruby
actions = ['index', 'new', 'create']
```

```Ruby
actions = %w(index new create) # => ['index', 'new', 'create']
```

```Ruby
actions = %i(index new create) # => [:index, :new, :create]
```

#### Khi xử lý mảng theo thứ tự, hãy sử dụng "&: method" thay vì "object.method"
```Ruby
names = users.map{|user| user.name }
```

```Ruby
names = users.map(&:name)
```

Ngoài `map` mình lấy ví dụ ở trên, thì các phương thức như `each`, `select` ... cũng có cách viết tương tự.

#### Phân biệt giữa nil và array
Cách này khá thú vị, nếu Array () (Kernel # Array) được sử dụng, có thể loại bỏ việc check là array hay không để xử lý

```Ruby
if users
  users.each{|user| send_direct_mail(user)}
end 
```

Cách này Awesome hơn rất nhiều phải không? ^^
```Ruby
Array(users).each{|user| send_direct_mail(user)}
```

Trước khi biết method `Array()` mình cũng đã từng viết 1 kiểu như thế này, khá dài dòng và xấu
```
users = users || []
users.each{|user| send_direct_mail(user)}
```

#### Khi khai báo một số lớn, hãy đặt "_" để dễ đọc hơn
```Ruby
ITEM_LIMIT = 1000000000
```

```Ruby
ITEM_LIMIT = 1_000_000_000
```

#### Thay vì định nghĩa 1 method đơn giản hay sử dụng attr_reader
```Ruby
class Person
  def initialize
    @name = "No name"
  end

  def name
    @name
  end
end
```

```Ruby
class Person
  attr_reader :name

  def initialize
    @name = "No name"
  end

  # いらない
  # def name
  #   @name
  # end
end
```

#### Sử dụng * (splat) thay vì + để ghép các mảng
```Ruby
numbers = [1, 2, 3]
numbers_with_zero_and_100 = [0] + numbers + [100] # => [0, 1, 2, 3, 100]
```

```Ruby
numbers = [1, 2, 3]
numbers_with_zero_and_100 = [0, *numbers, 100] # => [0, 1, 2, 3, 100]
```

Nếu không sử dụng `*` thì sẽ hiểu `numbers` như 1 phần tử
```Ruby
[0, numbers, 100] # => [0, [1, 2, 3], 100]
```

#### Sử dụng symbol thay vì string cho các key trong hash
```Ruby
# Sử dụng string cho key
currencies = { 'japan' => 'yen', 'america' => 'dollar', 'italy' => 'euro' } 
currencies['japan'] # => 'yen'
```

```Ruby
# Sử dụng symbol cho key
currencies = { japan: 'yen', america: 'dollar', italy: 'euro' } 
currencies[:japan] # => 'yen'
```

Việc sử dụng symbol có những ưu điểm sau:
- Có thể được viết bằng một chữ ngắn gọn như {key: value}.
- Nhanh hơn khi dùng key bằng string
- Hiệu quả sử dụng bộ nhớ tốt hơn string

Để tìm hiểu sâu về vấn đề này các bạn có thể tham khảo ở đây [ Why use symbols as hash keys in Ruby? - Stack Overflow](https://stackoverflow.com/questions/8189416/why-use-symbols-as-hash-keys-in-ruby). Khá là thú vị.

Ôi mỏi tay quá, post này mình tạm dừng ở đây nhaaaa (seeyou)