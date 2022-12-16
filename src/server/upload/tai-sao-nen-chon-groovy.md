# Giới thiệu
Groovy là một ngôn ngữ lập trình được phát triển dựa trên nền tảng Java và thêm một số tiện ích khác, phiên bản mới nhất của Groovy được xuất bản vào năm 2007. Một số tính năng mà Groovy như sau:
- Hỗ trợ cho cả kiểu động và kiểu tĩnh
- Hỗ trợ ghi đè cho toán tử
- Native syntax cho các kiểu danh sách
- Hỗ trợ native cho regular expression
- Hỗ trợ native cho các ngôn ngữ đánh dấu như XML, HTML 
- Có thể sử dụng các thư viện của Java
# Tại sao lại chọn Groovy
Có rất nhiều lý do để học Groovy, ở đây mình sẽ nêu ra một số lý do tiêu biểu
## Sự đơn giản
Khi lập trình với ngôn ngữ Java thì khi chúng ta khai báo thì phải chỉ định kiểu của dữ liệu một cách rõ ràng, Groovy cung cấp cho chúng ta một cách khai báo biễn một cách linh hoạt nó tương tự khi chúng ta dùng từ khoá var trong javasript vậy ở đây Groovy cung cấp từ khoá def cho việc khai báo mà không cần phải chỉ rõ kiểu của dữ liệu đó một cách tường minh.
Ví dụ khi chúng ta khai báo một list hay một map thì chỉ cần như thế này
```
def myList = []
def myMap = [:]
```
## Chuyển đổi Json thành Class
chuyển đổi dữ liệu từ Json thành một Object là việc không thể thiếu trong Web Service, Groovy cung cấp cho chúng ta cú pháp rất đơn giản để chuyển đổi Json thành Object với việc chỉ cần truyền Json vào phương thức khởi tạo của class.
Ví dụ:
```
String response = '{name:"Name 1", address: "DN"}'

// Json response to map
def studentMap = new JsonSlurper().parseText(response)
// Consider an Student class with the attributes name, address
Student student = new Student(studentMap)
```
Chỉ cần như vậy chúng ta đã có thể tạo ra một Object từ Json string.
Ở chiều ngược lại khi muốn parse từ một Object thành json string thì chúng ta sẽ thực hiện như sau
```
def json = JsonOutput.toJson(student)
```
## Hasing 
Trong khi việc sử dụng Java khá rườm rà trong việc hasing thì Groovy cho phép thực hiện nó một cách dễ dàng, ví dụ như
```
def password = "myPassword"

def md5 = password.md5()
def sha256 = password.sha256()
//For other algorithms use digest() method
def sha1 = password.digest('SHA-1')
```
## Toán tử
Nếu như trong Java chúng ta phải chỉ rõ điều kiện khi dùng toán tử ? như thế này
```
def user = person.name ? person.name : 'Guest'
```
Thì chúng ta có thể rút gọn lại như sau
```
def user = person.name ?: 'Guest'
```
Rõ ràng nó giúp chúng ta thu gọn lại biểu thức trong thấy vì toán tử này có thể dùng lồng vào nhau rất nhiều 
Khi dùng Java chúng ta có một rắc rối khi gán dữ liệu cho một biễn bằng giá trị của một thuộc tính bên trong của một đối tượng, giả sử như sau
```
String name = student.name;
```
như vậy thì trong trường hợp nếu student mà bị null thì sẽ gây ra lỗi null poiter exception và nếu muốn tránh trường hợp lỗi thì ta lại phải kiểm tra điều kiện student trước
```
String name;
if (student != null) {
name = student.name;
}
```
khá phức tạp phải không, thay vì đó Groovy cung cấp cho chúng ta cách dễ dàng và an toàn hơn
```
def name = student?.name
```
như vậy sẽ không gây trường hợp lỗi null poiter exception nữa, nếu student object mà null thì name sẽ nhận giá trị null.

Có một toán tử rất lợi hại nữa đó là "Spred Operator" 
Trong trường hợp muốn tương tác với các item trong một mảng nào đó, ví dụ như sau 
Chúng ta có một mảng đối tượng Student 
```
def students = [
new Student(name: "name 1", address: "DN"),
new Student(name: "name 2", address: "SG")
]
```
nếu bây giờ chúng ta muốn lấy tất cả tên của các sinh viên thì sẽ thực hiện lặp qua mảng và get từng name một. Groovy hỗ trợ chúng ta làm việc đó chỉ trong một nốt nhạc:
```
def names = students*.name
```
## Traits
Mình có thể mô tả cái này như là một Interface trong Java nhưng có thể implement function bên trong interface 
và các class implement nó không cần phải override lại hàm đó 
```
trait Sociable {
    void greet() { println "Hello!" }
}

class Person implements Sociable {}

Person p = new Person()
p.greet()
```
Kết quả ở đây sẽ in ra Hello!
## Regular Expressions
Groovy giúp chúng ta tương tác với regular expressions một cách dễ dàng hơn, với 3 toán tử được cung cấp tương ứng với 
### pattern operator ~
Là toán từ giúp chúng ta tạo ra một đối tượng Pattern 
```
def pattern = ~"^abc{2}\d"
```
### find operator =~
Là toán tử tìm kiếm pattern trong một string và trả về một Matcher 
```
def pattern = ~"abc{2}\d"
def found = "abcc5" =~ pattern
```
### match operator ==~
Toán tử cuối cùng giúp chúng ta trả về giá trị true false nếu string mà match với lại regrex hay không 
```
def found = "abcc5" ==~ pattern
```

# Kết Luận
Ở trên mình chỉ nêu một số lý do để có thể cân nhắc việc lựa chọn Groovy cho dự án, một số lợi ích để có thể dễ dàng triển khai trong quá trình phát triển dự án. 
Có rất nhiều bài viết chỉ ra lợi ích của việc dùng Groovy này như một số tài liệu tham khảo sau
https://dev.to/jcoelho/10-reasons-to-use-groovy-in-2019-431f
https://dev.to/jcoelho/10-reasons-to-use-groovy-in-2019-431f
https://xebia.com/blog/why-and-when-to-use-groovy/