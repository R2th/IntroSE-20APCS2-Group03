# 1. Triple equals là gì?
Triple Equals - được mọi người biết đến một trong hai toán tử so sánh bằng trong Ruby với công dụng so sánh ngang bằng về giá trị và kiểu dữ liệu. === được sử dụng để xác định trường hợp sẽ được lựa chọn để thực hiện trong câu lệnh điều khiển.
Trong trường hợp mặc định, triple equals (===) chỉ là một bí danh cho double equals (==). Nó được thể hiện rõ ràng nhất khi các lớp ghi đè lên hành vi của chính mình. Hãy cùng xem xét một số ví dụ về điều này nhé:

### Ranges
```
rng === anObject -> true or false
Ex: (1..10) === 1
```
Với range, triple equal là bí danh cho *include?*.  *===* giúp bạn kiểm tra một giá trị có thuộc một range mà bạn đã có từ trước hay không, nếu nó là 1 giá trị trong range đó, kết quả nhận được sẽ là True và nếu là false trong TH ngược lại.
Ngoài ra, trong cấu trúc của câu lệnh điều khiển *case when*, *===* cũng làm nhiệm vụ thầm lặng, đó là xác định rằng các hành động được thực hiện sẽ là gì khi so sánh một giá trị cụ thể với một loạt các TH mà bạn liệt kê ra.
```
case 79
 when 1..50   then   print "low\n"
 when 51..75  then   print "medium\n"
 when 76..100 then   print "high\n"
end
    
Output: high
```
Trong ví dụ này, với giá trị cụ thể là 79, *===* đã xác định được nó là 1 giá trị thuộc range 76..100, như vậy những hành động mà bạn muốn thực hiện trong TH này sẽ được thực thi, ở đây, đó là in ra màn hình 1 đoạn text "hight" như kết quả ở trên.

### Regex
Tiếp theo, hãy cùng xem tác dụng của *===* trong các biểu thức chính quy nhé:
```
rxp === aString -> true or false
Ex: /abc/ === 'abcdef'
```
Với regex, *===* chính là bí danh cho *match*.  Với một biểu thức chính quy cho trước, hàng loạt các đoạn ví dụ sẽ được lấy để so sánh xem nó có là 1 thể hiện của đoạn mã mẫu hay không?. Kết quả nhận được là True nếu nó là 1 thể hiện của biểu thức mẫu đó, và False nếu không là thể hiện của biểu thức mẫu.
Ngoài ra, trong cấu trúc điều khiển case when, thì *===* cũng dùng để xác định đường đi mà mình sẽ thực hiện khi lần lượt được kiểm nghiệm với các TH được nêu ra.
```
a = "HELLO"
case a
when /^a-z*$/; print "Lower case\n"
when /^A-Z*$/; print "Upper case\n"
else;            print "Mixed case\n"
end

output: Upper case
```
Nếu là một lập trình viên về Web, nhất định các bạn đã từng 1 lần sử dụng các đoạn biểu thức chuẩn để kiểm tra tính hợp lệ của các email mà người dùng nhập vào khi thực hiện hành động đăng ký.
```
email_regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
```
Bằng việc sử dụng đoạn mã này, thật đơn giản để kiểm tra tính hợp lệ của các email mà người dùng nhập. Ví dụ:
Email hợp lệ: lucifer@gmail.com, viblo@example.com...
Email không hợp lệ: lucifer@.
### Classes

Tiếp tục nhé, với class thì *===* có công dụng như thế nào? Hãy cùng xem ví dụ:
```
   String === 'foo'
```
Trong class, * ===* là bí danh cho *i_sa?*. Thực hiện nhiệm vụ kiểm tra xem với giá trị value cụ thể a (ở đây là 'foo') có thuộc vào lớp A (ở đây là String) hay không? Có là 1 thể hiện cho lớp A hay không?

### Procs

```
proc === obj
-> a { a > 5 } === 6
```
Với proc, === tương tự với phương thức *call*.  Các proc sẽ được gọi với params là object để thực thi. Block sẽ được chạy và trả về kết quả ứng với giá trị mà bạn truyền vào. Lúc này, thì proc cũng có thể xem như 1 trường hợp *when* trong câu lệnh điều khiển *case when*.
# 2. Querying
Hầu hết các bạn đã thực hiện các câu lệnh truy vấn trên các đối tượng, giống như cách mà tôi truy vấn đối với Person dưới đây:
```
   Person.where(name: 'Bob', age: 10..20)
```
Thì đây cũng có thể coi là bạn đang kiểm tra với phép so sánh *===* với từng đối tượng thuộc Person với điều kiện trê để có được một mảng các đối tượng Person thỏa mãn.
Với các công dụng của *===* mà tôi đã trình bày ở trên trong Range, Regex ... Nếu không phải thực hiện việc truy vấn này trên đối tượng mà là 1 mảng phức tạp?
Hãy bắt đầu với một mảng các hashes nhé:
```
people = [
  {name: 'Bob', age: 20},
  {name: 'Sue', age: 30},
  {name: 'Jack', age: 10},
  {name: 'Jill', age: 4},
  {name: 'Jane', age: 5}
]
```
Nếu muốn lấy ra tất cả các người trong mảng trên có tuổi lớn hơn 20. Như cách thông thường trong Ruby bạn sẽ làm như sau:
```
people.select { |person| person[:age] >= 20 }
```
Nếu các hash trong mảng phức tạp hơn, nhiều thuộc tính hơn và các điều kiện cũng nhiều hơn, thì việc làm như ở trên sẽ khá khó rất khó implement và thực thi. Đến đây, hãy nhớ rằng bạn còn có *===*.
Hãy xem *===*  xử lý khó khăn này nhé :
```
def where(list, conditions = {})
  return list if conditions.empty?
  list.select { |item|
    conditions.all? { |key, matcher| matcher === item[key] }
  }
end
```
Hãy nhìn cách mà === hoạt động.  Với hàm where bạn định nghĩa lại cho đối tượng Person như trên, thì dù có 1, hai hay nhiều các condition phức tạp theo cả về số lượng hay đa dạng về kiểu dữ liệu của các trường đối tượng Person đi nữa, thì công việc kiểm tra cũng rất đơn giản.

# 3. JSON Packet Dump
Chúng ta có thể truy vấn với một số loại gói tin dump trong JSON: 
```
where(packets,
  source_ip: IPAddr.new('10.0.0.0/8'),
  dest_ip:   IPAddr.new('192.168.0.0/16')
  ttl:       -> v { v > 30 }
)
```
Với định nghĩa hàm Where ở phần trước, thì việc truy vấn các gói tin đang trở nên phức tạp hơn nếu chứa các condition dưới dạng IPAddr và proc. Để giải quyết các condition ở dạng này, phía Ruby có hỗ trợ gem [Ramda](https://github.com/lazebny/ramda-ruby). Ramda đã định nghĩa hàm *gt* để thay thế cho Proc để tối giản sự phức tạp trong cú pháp của câu lệnh where ở trên và vẫn giải quyết được bài toán đang phải làm.
```
curried_method(:gt) do |a, b|
      a > b
end
```
```
where(packets,
  source_ip: IPAddr.new('10.0.0.0/8'),
  dest_ip:   IPAddr.new('192.168.0.0/16')
  ttl:       R.gt(30)
)
```

Có rất nhiều thứ bạn có thể làm với *===*, kết hợp với từng chức năng bạn có thể phát hiện ra rất nhiều điều thú vị từ nó, trên đây mình chỉ giới thiệu qua với các bạn phần nhỏ nói về những hữu ích mà nó mang lại. Mong rằng nó sẽ đem lại cho các bạn một cái nhìn mới về toán tử so sánh bằng này.