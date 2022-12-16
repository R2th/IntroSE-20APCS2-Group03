Trong bài viết này, chúng ta sẽ cùng nhau khám phá các chủ đều sau:

- method "arg" và return
- method1 || method2 "hello"
- variable = a or b
- block {..} với block do..end

# Introduction

Độ ưu tiên của toán tử là một tập hợp các quy tắc phản ánh các quy ước về trình tự thực hiện các toán tử nhằm đánh giá một biểu thức toán học cho trước.
Đó là một điều rất quan trọng trong bất kì một ngôn ngữ lập trình nào. Có thể thay đổi cách thức sử dụng một ngôn ngữ.

Trong thực tế, tùy thuộc vào độ ưu tiên của một toán tử, keyword hay method được gọi, chương trình của bạn có thể sinh ra các incedent mà bạn không hề ngờ tới. Trong bài viết này, chúng ta sẽ giới thiệu chi tiết một số biểu thức giúp chúng ta dễ dàng đọc source code nhưng có thể dẫn đến các ảnh hưởng không mong muốn trong Ruby

# method 'arg' and return

Biểu thức này có thể dẫn đến những hiệu ứng không mong muốn vì toán tử '&&' có độ ưu tiên cao hơn 'and'

Ví dụ:

```
def method1
  p 'method1' and return
end

def method2
  p 'method2' && return
end

method1
method2
```

Kết quả:

```
"method1"
```

Do vậy ở đây chỉ có method1 là thực hiện lời gọi put với method p.
Vậy tại sao lời gọi method2 lại không in ra string "method2"

Điều này là do thực tế toán tử && có độ ưu tiên  cao hơn so với lệnh p "method2" trong khi đó toán tử and lại có độ ưu tiên thấp hơn. Hãy sửa lại một chút ví dụ trên để thấy cách Ruby thực hiện nội dung của method1 và method2

```
 def method1
  p('method1') and return
end

def method2
  p ('method2' && return)
end

method1
method2
```

Chúng ta đã thêm dấu ngoặc đơn để biểu thị rõ cách Ruby hoạt động trong ví dụ trên. Chúng ta có thể nhìn thấy rằng, với method1, toán tử 'and' có độ ưu tiên thấp hơn lời gọi p 'method1'. Vì vậy, lời gọi p được xử lý trước rùi mới return.
Còn ở method2, toán tử && có độ ưu tiên cao hơn lời gọi p "method2". Do đó, mặc dù không có ngoặc đơn bao quanh params của method p nhưng toán tử && sẽ apply LOGICAL AND giữa string "method2" và return đầu tiên. Kết quả của hành động này sẽ là params cho method p. Nhưng return sẽ thoát khỏi method ngay lập tức và lời gọi p sẽ không bao giờ được thực hiện. Vì vậy giải pháp ở đây là sử dụng 'and' thay thế cho '&&'

# method1 || method2 'hello'

Biểu thức khá phổ biến này có thể dẫn đến những nhầm lẫn không mong muốn nếu chúng ta không quen với các quy tắc ưu tiên cho || và or. Hãy cùng nhau xem ví dụ sau:

```
def method1
  'hello world!'
end

def method2(name)
  "How are you doing #{name}?"
end

method1 or method2 'Jim' # => "hello world!"
method1 || method2 'Jim' # => syntax error, unexpected tSTRING_BEG, expecting keyword_do or '{' or '('
```

Biểu thức method1 or method2 ‘Jim’ làm việc như mong đợi bởi vì method1 return một string. Chú ý rằng, ở đây toán tử or có độ ưu tiên thấp hơn lời gọi method2 'Jim'.
Vậy tại sao lời gọi method1 || method2 'Jim' raises ra một SyntaxError.

Hãy cùng nhau sửa lại ví dụ trên một chút để show cách mà Ruby thực hiện đoạn code ở trên:

```
def method1
  'hello world!'
end

def method2(name)
  "How are you doing #{name}?"
end

(method1) or (method2 'Jim') # => "hello world!"
(method1) || (method2) 'Jim' # => syntax error, unexpected tSTRING_BEG, expecting keyword_do or '{' or '('
```

Do toán tử 'or' có độ ưu tiên thấp hơn lời gọi method2 'Jim' nên không có lỗi cú pháp nào ở biểu thức đầu tiên, method1 được thực hiện mà không lỗi gì.
Nhưng với toán tử || có độ ưu tiên cao hơn lời gọi method2 'Jim' nên nó sẽ cố gắng để thực hiện phép toán OR giữa method1 và method2 trước nên lúc này 'Jim' sẽ trở thành params của method1 chứ không phải là method2.

Có ít nhất 3 solution để giải quyết trong trường hợp này:

- Sử dụng dấu ngoặc đơn bao quanh params: method1 || method2('Jim')
- Sử dụng OR để thay thế ||
- Sử dụng keyword modifier-unless: method2 'Jim' unless method1

# variable = a or b

Do thực tế, toán tử = có độ ưu tiên cao hơn or nên trong một số trường hợp có thể dẫn đến các kết quả không chính xác:

```
a = nil || 42
a # => 42

b = nil or 42
b # => nil
```

Ở đây, biến a chứa giá trị 42 trong khi b lại là nil. Hãy cùng sửa lại một chút ví dụ trên để mô ta cách Ruby thực hiện đoạn code

```
a = (nil || 42)
a # => 42

(b = nil) or 42
b # => nil
```

Với biến a, toán tử || có độ ưu tiên cao hơn =. Vì vậy, nil || 42 sẽ tính toán giá trị và kết quả sẽ được gán cho biến a.
Đối với biến b, toán tử or có độ ưu tiên thấp hơn =. Vì vậy nil được gán cho biến b trước. Do vậy trong trường hợp này nên sử dụng || để thay thế cho or

# block {..} vs block do..end

Độ ưu tiên cũng là vấn đề với các block trong Ruby. Thực sự thì, block sử dụng dấu ngoặc nhọn có độ ưu tiên cao hơn block sử dụng do..end

Hãy xem ví dụ minh họa sau:

```
def method1(options = {}, &block)
  puts "method1 received block? #{block_given?}"
end

def method2(&block)
  puts "method2 received block? #{block_given?}"
end

method1 callback: method2 { 42 }
puts
method1 callback: method2 do 42 end
```

Kết quả:

```
method2 received block? true
method1 received block? false
method2 received block? false
method1 received block? true
```

Tại sao lại có sự khác biệt ở đây, hãy cùng nhau xem cách Ruby đã thực hiện

```
def method1(options = {}, &block)
  puts "method1 received block? #{block_given?}"
end

def method2(&block)
  puts "method2 received block? #{block_given?}"
end

method1(callback: method2 { 42 })
puts
method1(callback: method2) do 42 end
```

Vì vậy, có thể nói rằng, {..} có độ ưu tiên cao hơn do..end, block này sẽ ảnh hưởng đến method gọi đến block được gắn vào này.

Tham khảo:


https://medium.com/rubycademy/4-interesting-examples-of-high-precedences-operations-in-ruby-bd9e49dba52b