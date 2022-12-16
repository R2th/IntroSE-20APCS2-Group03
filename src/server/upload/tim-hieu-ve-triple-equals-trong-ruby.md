# I. Giới thiệu
Triple Equals (===) là một trong những tính năng cực kì tuyệt vời của Ruby, nhưng có lẽ nhiều người không sử dụng chúng hoặc là hiểu nhầm nó chỉ là toán từ so sánh một cách chặt chẽ. Nhưng thật chất nó chứa nhiều điều bí mật hơn là phép so sánh đơn thuần.

Trong bài viết này , chúng ta sẽ khám phá những điều thú vị của Triple Equals (===), bạn sẽ nhận ra nó có thể làm được nhiều điều hơn bình thường.

# II. Triple Equals
Một vài người code Javascript sẽ nghĩ rằng === chỉ là toán tử để so sánh một cách nghiêm khắc hơn ==, nhưng trong Ruby có một số thứ rất khác. Mặc định nó là alias của ==, nhưng một vài class có thể làm được nhiều thứ thú vị hơn

Nó còn có một số tên gọi khác : Case equality operator, membership operator, triple equals.

Nhìn chung, chức năng này rất giống với việc kiểm tra xem giá trị bên phải có phải là thành viên của giá trị bên trái hay không.

##  1. Ranges
Range trong ruby là một khoảng có điểm bắt đầu và kết thúc , như 1..10 là khoảng từ 1 tới 10.  Trong trường hợp này, Triple Equals (===) hoạt động giống như include?, nó kiểm tra giá trị bên phải có nằm trong khoảng của giá trị bên trái không :

```
(1..10) === 1
# => true

(1..10).include?(1)
# => true
```

Range thú vị ở chỗ nó không giới hạn chỉ là số, String cũng dùng được, nó làm cho phạm vi của Range còn thú vị hơn :
```
range = '2.7.0'..'3.0.0'
range === '2.7.5'
# => true
```

Ví dụ ở trên sẽ false khi vượt quá trong khoảng từ 2.7.0 tới 3.0.0, nhưng điều thú vị là === cũng nhận ra được các kiểu dự liệu ngoài integer để so sánh một cách chính xác

## 2. Regular Expressions
Regular Expressions ( biểu thức chính quy) là một ngôn ngữ tìm ra patterns phù hợp trong văn bản, trong trường hợp này === hoạt động giống như hàm match? :
```
/abc/ === 'abcdef'
# => true

/abc/.match?('abcdef')
# => true
```

=== trong trường hợp này nói rằng có một kết quả khớp hoặc chuỗi của ta là một thành viên của tập hợp các kết quả mà Regex đề cập đến

## 3. Classes
Ruby có các lớp như Integer, String và các lớp khác. Thông thường, bạn có thể kiểm tra xem dữ liệu đó thuộc một loại nào bằng cách sử dụng is_a  ?. Không có gì đáng ngạc nhiên === hoạt động theo tương tự ở đây:
```
String === 'foo'
# => true

'foo'.is_a?(String)
# => true
```

=== ở đây nói rằng 'foo' là một thành viên của lớp String class, hoặc nó được bao gồm trong cái mà chúng ta gọi là String.
Cần lưu ý rằng điều này hoạt động đối với mọi lớp chính của Ruby trong thư viện tiêu chuẩn.

## 4. Functions (Proc and Lambda)
Ruby có một số cách để thể hiện các  anonymous functions, procs và lambdas. Chúng có thể được diễn đạt như sau:
```
add_one_lambda = -> x { x + 1 }
add_one_proc   = proc { |x| x + 1 }
```
Chúng ta sẽ không đi sâu vào sự khác biệt giữa tất cả chúng.
Để sử dụng các hàm này, bạn cần phải sử dụng .call (hoặc [] hoặc. ()), Mà bạn có thể không ngạc nhiên khi biết === cũng như:
```
add_one_lambda = -> x { x + 1 }

add_one_lambda === 1
# => 2
add_one_lambda.call(1)
# => 2
add_one_lambda.(1)
# => 2
add_one_lambda[1]
# => 2
```
Cái này là head scratcher? Trong Toán học, nó được gọi là miền của một hàm, hoặc tập hợp của tất cả các đầu vào hợp lệ, vì vậy điều đó nghe rất giống với tư cách thành viên!

## 5. IP Addresses
Ruby cũng có chức năng này cho hoạt động liên quan đến kiểu mạng, IPAddr:
```
require 'ipaddr'

IPAddr.new('10.0.0.1')
```
Bạn thậm chí có thể biểu hiện các mạng con bằng cách sử dụng như sau:
```
local_network = IPAddr.new('192.168.1.0/24')
local_network.include?('192.168.1.1')
# => true
```
Sử dụng ===  thay thế include? như ở đây:
```
local_network === '192.168.1.1'
# => true
```
Đối với điều này, chúng ta đang kiểm tra xem địa chỉ IP có phải là thành viên của một mạng con nhất định hay không

#  III. Tổng kết
Vì vậy, có rất nhiều bí ẩn ở khắp mọi nơi trong Ruby, bài viết trên là một trong những ví dụ thú vị của việc đó. Qua bài viết này hi vọng các bạn có thể hiểu thêm được về toán tử === trong Ruby, và có thể áp dụng nó vào trong các project sau này.

# IV. Tài liệu tham khảo
* [ Understand ruby tripel equal ](https://dev.to/baweaver/understanding-ruby-triple-equals-2p9c)