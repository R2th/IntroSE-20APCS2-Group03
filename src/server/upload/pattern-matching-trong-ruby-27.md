## 1. Pattern Matching là gì?
Pattern matching là một cách để xác định một pattern cho dữ liệu của chúng ta và nếu dữ liệu được khớp với pattern đó, chúng ta có thể giải mã dữ liệu theo pattern này.

Có vẻ lý thuyết quá nhiều đúng ko, mình sẽ đưa ra ví dụ đi massage vào pattern matching này. Khi bạn đi massage, quán massage sẽ chỉ nhận khách là nam giới, đây chính là pattern, nếu bạn là nam thì sẽ match với pattern và được vào tận hưởng, còn không thì bạn xách b*** ra về. 

Trong ruby Pattern Matching được thể hiện thông qua câu lệnh *case*, tuy nhiên nó sẽ không đi cùng với *when* mà đi cặp với *in*, và cấu trúc cơ bản sẽ như sau
```
case [variable or expression]
in [pattern]
  ...
in [pattern] if [expression]
  ...
else
  ...
end
```

## 2. Một số Pattern cơ bản
### 2.1 Value Pattern
Trong value pattern điều kiện để matching là *pattern === object*
ví dụ:

```
case 1
in Integer
  puts "Reached Integer"
in -1..1
  puts "Reached -1..1"
end
# => "Reached Integer"
```

Như bạn thấy ở 2 pattern đều match, tuy nhiên khi bạn đã match với 1 pattern nào đó thì nó sẽ dừng ngày ở pattern đó và không kiểm tra các pattern bên dưới nữa.

### 2.2 Variable Pattern
Đối với Variable Pattern thì nó sẽ gán giá trị khớp với chính nó
```
case 100
  in num
    p "num got its name bound to #{num}"
end
=> "num got its name bound to 100"
```

### 2.3 AS PATTERN
**as pattern** sẽ gán giá trị cho biến ngay sau pattern bằng dấu *=>*  nếu match với pattern đó. Với pattern này khá hữu dụng cho các developer trong việc check email. ví dụ

```
bad_email = 'wrongmailATmail.com'

case bad_email
  in /.+@.+\.\w/ => email
    p "Sending to #{email}"
  else
    p 'This is not an email'
end
=> "This is not an email"
```

```
good_email = 'rightmail@mail.com'

case good_email
  in /.+@.+\.\w/ => email
    p "Sending to #{email}"
end
=> "Sending to rightmail@mail.com"
```

### 2.4 ARRAY PATTERN
Dưới đây sẽ là 1 vài ví dụ về array pattern
```
case [0, 1, 2]
in [0, a, 3]
 :no_match       
end
#=> NoMatchingPatternError ([0, 1, 2])
case [0, 1, 2]
in [0, a, 2]
 a        
end
#=> 1
case [0, 1, 2]
in [0, *tail]
 tail  
end
#=> [1, 2]
```

Ngoài ra với array pattern, chúng ta có thể đi giải mã các mảng, ví dụ
```
case [1, 2, 3]
in Array(a, b, c)
  puts a, b, c
end
# => 1
# => 2
# => 3
```

Hoặc có thể lấy một giá trị từ mảng thông qua biến
```
case [1, 2, 3]
in 1, a, 3
  a
end
# => 2
```

Toán từ `*` hữu ích với các mảng có kích thước không xác định hoặc khi chúng ta chỉ muốn chọn một phần của mảng
```
case [1, 2, 3]
in [*a] # *a will also do the job
  a
end
# => [1, 2, 3]
------------------------
case [1, 2, 3]
in 1, *a
  a
end
# => [2, 3]
```

### 2.5 Hash Pattern
Hash pattern thì khá giống với array pattern. Hash pattern không chỉ rành riêng cho các hash objects và cũng có một số rule riêng của nó. Pattern sẽ match nếu:
1. `Constant === object` returns **true** . Trong case này **Constant** có thể là một Hash `Hash(one: "one", two: "two", ...)`, một Object `Object[one: "one", two: "two", ...]` hoặc `{ one: "one", two: "two", ... }`
2. Một object sẽ có một phương thức `#deconstruct_keys` và phương thức này sẽ trả về 1 Hash

```
case { name: "Bob", age: 21, city: "Toronto" }
in name:
  name
end
# => "Bob"
```

Hash pattern sẽ hoạt động với object nào được thực thi trong method `#deconstruct_keys` ví dụ
```
Person = Struct.new(:name, :age, :city, keyword_init: true) do
  def deconstruct_keys(keys)
    {
      name: name, age: age, city: city
    }
  end
end
```

Và cũng xem cách thức hoạt động
```
person = Person.new(name: "John", age: 21, city: "Tokyo")
case person
in name:, age:, city:
  puts name, age, city
end
# => "John"
# => 21
# => "Tokyo"
```

Còn khá nhiều điều đang lưu ý về Pattern Matching, khi thực hành thêm mình sẽ giải thích đến các bạn

## Tham khảo
1 https://medium.com/akra-polska/pattern-matching-in-ruby-2-7-0-88c56e646454
2 https://dev.to/uryelah/find-your-way-in-rubys-pattern-matching-1n43