Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu các chủ đề sau:

- Gán phần còn lại của một mảng cho một biến
- array destructuring trong các block arguments
- Hash#default_proc như là một giá trị default
- HEREDOC và method chaining
- Toán tử đơn nguyên cho các đối tượng khác số

# Assigning the rest of an Array to a variable

Khi destructuring một mảng, ta có thể unpack và gán phần còn lại của nó cho một biến bằng cách sử đụng mẫu sau:

```
a = [1, 2, 3]
b, *rest = *a

b    # => 1
rest # => [2, 3]
a    # => [1, 2, 3]
```

# Array destructuring in block arguments

Chúng ta cũng có thể sử dụng kỹ thuật Array Destructuring trong một blocks Ruby:

```
array = [
  [:key1, :value1],
  [:key2, :value2],
  [:key3, :value3],
  [:key4, :value4]
]

array.each do |key, value|
  puts "#{key}: #{value}"
end
```

produces

```
key1: value1
key2: value2
key3: value3
key4: value4
```

Ở đây, mỗi mảng con được destructured với các phần tử thứ nhất và thứ hai được gán đến key và value trong tham số của block

# Hash#default_proc as default value

Phép khởi tạo Hash.new có thể gán giá trị default cho các key trong một block

```
h = Hash.new { |h, k| h[k] = {} }

h[:layer_1]           # => {}
h[:layer_1][:layer_2] # => nil
```

Tuy nhiên, nếu chúng ta muốn gán giá trị default đến các giá trị của key và các subentry của một hash?
Để làm điều này, chúng ta sử dụng method Hash#default_proc, có chứa một block, được truyền như là argument của method Hash.new

```
layers = Hash.new do |layers, layer_name|
  layers[layer_name] = Hash.new(&layers.default_proc)
end

layers[:layer_1][:layer_2][:layer_3] = 'a secret'

layers # => { layer_1: { layer_2: { layers_3: 'a secret' } } }
```

Ở đây, một Hash.new với argument là một block, được dùng để định nghĩa giá trị default cho một entry mới, được gán đến biến layers.
Khi layers[:layer_1] được gọi, một block được truyền như là đối số của hash layers được thực thi. Block này được thực thi theo follow sau:

```
layers[layer_1] = Hash.new(&layers.default_proc)

# SAME AS

layers[:layer_1] = Hash.new do |layers, layer_name|
  layers[layer_name] = Hash.new(&layers.default_proc)
end
```

# HEREDOC and method chaining

Heredoc là một cú pháp biểu diễn chuỗi trên nhiều dòng, ta có thể sử dụng các method trên đó. Cho ví dụ, chúng ta muốn loại bỏ các khoảng trắng và kí tự xuống dòng \n trpmg câu truy vấn SQL sau:

```
sql = <<-SQL.gsub("\n", ' ').squish
SELECT MIN(u.popularity)
FROM users u
WHERE
  u.created_at <= #{Time.now} AND u.created_at >= #{Time.now - 7.days}
SQL

puts sql
```

```
-- Produces:
SELECT MIN(u.popularity) FROM users u WHERE u.created_at <= 2018-04-23 21:42:00 +0200 AND u.created_at >= 2018-04-16 21:42:00 +0200
```

# Unary operators for non-numeric objects

Chúng ta có thể sử dụng các phép toán đơn nguyên như - và + trên một đối tượng bằng cách định nghĩa các method -@ và +@ trong khai báo lớp.

```
class True
  def -@
    false
  end
  
  def +@
    true
   end
end

t = True.new

p -t
p +t
```

produces:

```
false
true
```

Source:

https://medium.com/rubycademy/5-ruby-tips-you-probably-dont-know-76fee34cfd0c