Bài viết này, chúng ta cùng nhau đi tìm hiểu về những feature gây ra nhầm lẫn trong ngôn ngữ Ruby.

### 1. Method `[]` 

Cũng như trong các ngôn ngữ lập trình khác, `[]`  có thể được sử dụng để truy cập các phần tử Array và Hash

```
array = [1, 2, 3]   #array[0] => 1
hash = {foo: "bar", hello: "goodbye"}  #hash[:foo] => "bar"
```

Ngay cả với String, dùng `[]` chúng ta cũng có thể truy cập được vào bên trong chuỗi.
```
"Hello World"[0]  # => "H"
```

Và điều gây nhầm lẫn nhất là khi bạn gọi một Proc hoặc Lambda bởi `[]`.

```
hello = (-> (tên) {"Chào, # {name}!"})
hello ["John"] # => "Chào, John"
```
Nhưng nếu chúng ta nối chúng lại với nhau thì sao?

```
wise_words_factory = (-> (number_of_elements) { (1..number_of_elements).map { WideWord.random } })

wise_words_factory[10][0][:category] # "Body builder"
wise_words_factory[10][0][:words] # "No pain, no gain"
wise_words_factory[10][0][:words][0] # "N"
```
### 2. Toán tử `%`

Giống như `[]`, `%` trong Ruby cũng gây ra một số nhầm lẫn khi sử dụng.

`%`  có thể được sử dụng làm toán tử modulo:  
```
103 % 100 =>  3
```

Và chúng ta cũng có thể sử dụng `%` để định dạng chuỗi, nơi sự nhầm lẫn phát sinh.  
```
"% s:% d"% ["tuổi", 18] # => tuổi: 18
```

Để tránh nhầm lẫn, sử dụng `Kernel.format` thay thế sẽ cho kết quả tương tự. `Kernel.format("% s:% d", "age", 18) # => tuổi: 18 `

### 3.  Hàm `Integer#zero?` 

Nếu chúng ta chưa chắc chắn về những gì chúng ta hiểu biết về hàm `zero?` thì cùng xem qua một ví dụ đơn giản như sau:

```
assert_equal(1 == 0, 1.zero?) # => true
```

Nhìn qua thì hàm `zero?` dường như trông rất ngắn ngọn, súc tích và dễ đọc. Tuy nhiên, hàm này có thể gây ra nhiều nhầm lẫn hơn là giải quyết, bởi vì về bản chất hai biểu thức trên không hoàn toàn bằng nhau. Sử dụng toán tử `== 0` sẽ thực hiện so sánh bằng với một hằng số, trong khi đó sử dụng hàm `zero?` trong lý thuyết hướng đối tượng, sẽ gửi một lời gọi hàm đến đối tượng, và trả về kết quả nếu có method được định nghĩa.


Ở 2 ví dụ dưới đây, ví dụ đầu tiên sẽ fail và raise exeption nếu đối số `number` truyền vào không phải là 1 số.
```
def x_or_o(number)
  number.zero? ? "o" : "x"
end

def x_or_o(number)
  number == 0 ? "o" : "x"
end
```

Do đó, hãy sử dụng `== 0`, hoặc là chắc chắn sử dụng `zero?` với kiểu dữ liệu số.

### 4. Biến toàn cục `$[number]`

Cùng theo dõi  regex matching dưới đây:

```
# test.rb
string = "Hi, John!"
matched = %r(^(.+), (.+)!$).match(string)
matched[0] => "Hi, John!"
matched[1] => "Hi"
matched[2] => "John"
```

Trông khá là gọn gàng ha. Nhưng Ruby còn hỗ trợ một cách khác để lấy dữ liệu như sau đây:

```
string = "Hi, John!"
%r(^(.+), (.+)!$).match(string)
$1 => "Hi"
$2 => "John"
```
Nhìn đoạn mã trên và ta có thể hét lên rằng: "Thay đổi biến toàn cục cho mỗi thao tác regex matching thật là khủng khiếp và có thể sinh ra cả đống lỗi không ngờ đến". 
Tuy nhiên, Ruby cũng đã covered được hết điều này. Theo như documentation, các biến toàn cục này là cục bộ theo các luồng và các hàm. Về cơ bản thì chúng không phải là các biến toàn cục.

Khi thủ với matched[0], điều tuyệt vời xảy ra ngay sau đây:

```
$0 # => test.rb
```

Vậy là biến $0 trong Ruby dùng để lưu trữ thông tin môi trường hiện tại.

Ngoài ra,  trong Ruby có thể sử dụng số âm để đi ngược lại các mảng.Ta cũng có thể thử ngay và luôn với index âm:

```
matched[-1] # => "John"
$-1 # => nil
```

Thậm chí ta có thể gán giá trị cho biến $-1:

```
$-1 = 100
$-1 # => 100
```

Nhưng, khi thử như sau thì:

```
$-100 = 100

#SyntaxError: (irb):29: syntax error, unexpected tINTEGER, expecting end-of-input
#$-100
#     ^
#   from /usr/local/bin/irb:11:in `<main>'
```

Do đó, các biến toàn cục $-[number] chỉ hoạt động khi number chạy từ 1 đến 9.

### 5. The masterpiece of the omnipotent God: `Time.parse`

`Time.parse` là một bộ parse thời gian rất mạnh, với nhiều định dạng thời gian được hỗ trợ.

```
Time.parse("Thu Nov 29 14:33:20 GMT 2001")
# => 2001-11-29 14:33:20 +0000

Time.parse("2011-10-05T22:26:12-04:00")
# => 2011-10-05 22:26:12 -0400
```

đôi khi thì mạnh quá mức. 😱

```
Time.parse("Thu Nov 29 a:b:c GMT 2001")
# 2017-11-29 00:00:00 +0100
```

Để hiểu tại sao chúng ta cần phải xem xét document của `Time.parse`. Hàm này thực sự có tồn tại một tham số phụ thứ hai, một mốc thời gian để Ruby căn cứ vào mỗi khi một phần của string không thể parse được và sẽ lấy giá trị mặc định là `Time.now`.

Đây là một tính năng ám ảnh. Nếu như xem lại đoạn code trên, ta thấy rõ ràng là string nhập vào hoàn toàn sai, và ta nên nhận về một exception hơn thay vì nhận được một mốc thời gian sai.

Ngoài ra việc hỗ trợ quá nhiều format cũng gây ra nhiều rắc rối và nhầm lẫn:

```
Time.parse("12/27") # => 2017-12-27 00:00:00 +0100
Time.parse("27/12/2017") # => 2017-12-27 00:00:00 +0100
```

### 6. Delegator

Cùng xem ví dụ sau:

```
require "delegate"

class Foo < Delegator
  def initialize(the_obj)
    @the_obj = the_obj
  end

  def __getobj__
    @the_obj
  end
end

foo = Foo.new(1)
foo.inspect # => 1
foo == 1 # => true
```

biểu hiện như trên là sai và gây ra nhầm lẫn tai hại vì một delegator của 1 không thể bằng một hằng số 1.

> Equality — At the Object level, == returns true only if obj and other are the same object.

Theo Ruby doccument, chúng không cùng một đối tượng. Thế nên, lý do biểu thức trả về là bằng nhau vì với mỗi lời gọi nhận được, delegator chỉ cần truyền nó cho object gốc, không quan tâm đó là hello hay ==.

Điều này dẫn tới một vấn đề khác sau:

```
foo = Foo.new(nil)
foo.inspect # => nil
```

Khi ta muốn dump một object foo, Ruby sẽ dump object được delegate thay vì bản thân delegator. Lý tưởng hóa, thì nó sẽ phải chạy kiểu như:

```
foo = Foo.new(nil)
foo.inspect # <Foo: delegated: nil>
```


Bài viết dịch từ [đây](https://quan-cam.com/posts/six-confusing-features-in-ruby)

Hi vọng hữu ích với mọi người.

Thanks for your reading!