## Triple equals là gì?

Mặc định nó là alias của toán tử so sánh == với công dụng so sánh ngang bằng về giá trị và kiểu dữ liệu. Nó được thể hiện rõ ràng nhất khi các lớp ghi đè lên hành vi của chính mình. Hãy xem một số ví dụ về nó:

### Ranges
```
(1..10) === 1
# => true

(1..10).include?(1)
# => true
```

Đối với Ranges, === làmột bí danh cho **includes?**, nó giúp bạn kiểm tra giá trị có thuộc một ranges đã cho trước hay không. Đặc biệt hơn nó không chỉ kiểm tra những con số, với range là String vẫn có thể kiểm tra được.
```
SUPPORTS_PATTERN_MATCH_VERSIONS = '2.7.0'..'3.0.0'
SUPPORTS_PATTERN_MATCH_VERSIONS === '2.7.5'
# => true
```
### Regular Expressions
```
/abc/ === 'abcdef'
# => true

/abc/.match?('abcdef')
# => true
```

Đối với Regex, === là một bí anh cho **match?**, với một Regex cho trước nó sẽ kiểm tra xem chuỗi để được so sánh có phải là con của tập kết quả Regex hay không.

### Classes
```
String === 'foo'
# => true

'foo'.is_a?(String)
# => true
```
Đối với Class , === là một bí anh cho **is_a?**, kiểm tra xem với giá trị đã cho có thuộc vào lớp này hay không?
### Functions (Proc and Lambda)
Ruby có một số cách để thể hiện các anonymous functions, procs và lambdas. Chúng có thể được diễn đạt như sau:
```
add_one_lambda = -> x { x + 1 }
add_one_proc   = proc { |x| x + 1 }
```
```
add_one_lambda = -> x { x + 1 }

add_one_lambda === 1 (object)
# => 2
add_one_lambda.call(1)
# => 2
add_one_lambda.(1)
# => 2
add_one_lambda[1]
# => 2
```

Ở đây === tương tự với phương thức call. Các Proc and Lambda sẽ được gọi với params là object để thực thi. Block sẽ được chạy và trả về kết quả ứng với giá trị mà bạn truyền vào.

### IP Addresses

Ruby cũng có tính năng cho tất cả chúng ta hoạt động và các loại mạng, IPAddr:
```
require 'ipaddr'

IPAddr.new('10.0.0.1')
```
Bạn có thể thể hiện các mạng con bằng cách sử dụng nó:
```
local_network = IPAddr.new('192.168.1.0/24')
local_network.include?('192.168.1.1')
# => true
```

Sử dụng === thay thế include? như ở đây:
```
local_network === '192.168.1.1'
# => true
```

ở đây chúng ta đang kiểm tra xem địa chỉ IP có phải là thành viên của một mạng con nhất định hay không

### Kết luận
Có rất nhiều điều thú vị đối với toán tử so sánh ===, ở đây mình chỉ giới thiệu một số ít thôi các bạn có thể tìm hiểu thêm ở link dưới. <br>
https://medium.com/rubyinside/triple-equals-black-magic-d934936a6379 <br>
https://dev.to/baweaver/understanding-ruby-triple-equals-2p9c