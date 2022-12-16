Trong bài viết này, chúng ta sẽ lần lượt khám phá các chủ đều sau:

- return các giá trị với một mệnh đề ensure
- Khai báo các biến trong một câu điều kiện
- String#to_i và Integer(String)

# Introduction

Trong Ruby, cái mà ta gọi là unexpected behavior là những hành vi mà có vẻ không được tự nhiên lắm ở lần đầu nhìn thấy

Điều này nói lên rằng, vẫn có một chút gì đó khiến ta khó hiểu đằng sau cách thức mà chúng thực hiện

Trong bài viết này chúng ta sẽ cùng nhau phân tích và làm sáng tỏ 3 ví dụ của unexpected behavior trong Ruby

# Return values within an ensure clause

Trong Ruby, giá trị của câu lệnh cuối cùng được dùng để return giá trị của một method được gọi nếu không có một lời gọi return nào khác

```
def add
  21 + 21
end

add # => 42
```

Ở đây, giá trị của phép tính 21 + 21 được sử dụng để return giá trị của method add. Điều đó giải thích tại sao giá trị trả về của method add là 42

Nhưng điều gì sẽ xảy ra khi câu lệnh cuối cùng lại nằm trong một mệnh đề ensure

```
class Greeting
  attr_reader :name

  def hello(name)
    @name = name
  ensure
    "hello #{@name}"
  end
end

henry = Greeting.new

henry.hello('TJ Dillashaw') # => "TJ Dillashaw"
```

Ở đây, câu lệnh cuối cùng của lời gọi method henry.hello('TJ Dillashaw') là string "hello #{@name}" được đặt trong một mệnh đề ensure

Vì vậy, chúng ta mong đợi rằng lời gọi trên sẽ trả về string  "hello TJ Dillashaw" nhưng nó lại trả về string "TJ Dillashaw" là kết quả của phép gán @name = name

Vì vậy, chúng ta phải sử dụng rõ ràng keyword "return" nếu như chúng ta muốn return giá trị trong mệnh đề ensure

```

class Greeting
  attr_reader :name

  def hello(name)
    @name = name
  ensure
    return "hello #{@name}"
  end
end

henry = Greeting.new

p henry.hello('TJ Dillashaw') # => "hello TJ Dillashaw"
```

# Variables declared in a conditional block

Việc khai báo biến trong một câu điều kiện, cái mà trả về false sẽ được khởi tạo với gía trị default là nil

Ví dụ:

```
if 'Conor' > 'Khabib' # => which is false
  champ = 'Conor' # this code is never evaluated
end

champ # => nil
```

Ở đây biến champ được khởi tạo giá trị là nil mặc dù nội dung của câu lệnh if là chưa từng xảy ra.
Trong trường hợp này, chúng ta mong đợi một error được raise như sau:

```
NameError (undefined local variable or method `champ’ ..)
```

Việc này xảy ra dựa trên thực tế rằng, trong Ruby code phải được phân tích cú pháp trước khi chúng có thể chạy. Khi trình phân tích cú pháp quét đoạn code, bất cứ khi nào nó gặp một khai báo biến. nó sẽ phân bổ không gian bộ nhớ cho biến đó bằng việc set giá trị cho chúng là nil

# String#to_i vs Integer(String)

Method String#to_i được sử dụng để convert một xâu String sang một số của kiểu Integer. Ví dụ:

```
"42".to_i       # => 42
"42".to_i.class # => Integer
```

Nhưng nếu một string được gọi method to_i mà không phải dạng số. Ví dụ như:

```
"a string".to_i       # => 0
"a string".to_i.class # => Integer
```

Ở đây, ta có thể thấy "a string".to_i return ra 0
Chúng ta mong đợi rằng method trên phải return ra nil hoặc error nào khác. Để làm điều này, chúng ta có thể sử dụng method Kernel#Integer(). Method này sẽ raise một TypeError nếu đoạn xâu được gọi không đại diện cho một kiểu số:

```
Integer("42")       # => 42
Integer("a string") # => TypeError: (invalid value for Integer(): "a string")
```


Tham khảo:

https://medium.com/rubycademy/3-unexpected-behaviors-using-ruby-459297772b6b