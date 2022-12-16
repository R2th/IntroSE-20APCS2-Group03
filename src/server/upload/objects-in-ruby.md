Ruby là một ngôn ngữ lập trình hướng đối tượng. Tất cả mọi thứ trong Ruby đều là đối tượng. Các đối tượng trong Ruby tồn tại trong suốt quá trình biên dịch code. Có 2 loại đối tượng là đối tượng có sẵn và đối tượng do chúng ta định nghĩa. Đối tượng có sẵn là các đối tượng đã được định nghĩa sẵn trong Ruby hoặc các thư viện do người khác viết bằng Ruby và chúng ta có thể sử dụng. Còn loại kia là đối tượng do chúng ta định nghĩa để sử dụng với công việc đặc thù của riêng chúng ta khi các đối tượng có sẵn không đáp ứng được.

Muốn sử dụng đối tượng thì chúng ta phải khởi tạo trước. Một đối tượng chứa thuộc tính và phương thức bên trong nó. Thuộc tính là dữ liệu của đối tượng, đây là thành phần tĩnh, phương thức là phần động. Đối tượng có thể được chỉnh sửa hoặc giao tiếp với các đối tượng khác thông qua phương thức.

```Ruby
puts "Ruby language"
```
Nếu bạn đã từng lập trình C++, Java thì bạn cũng đã biết tới những từ khóa hoặc hàm dùng để in một chuỗi ra màn hình, chẳng hạn như hàm printf() trong C, std::cout trong C++, System.out.println() trong Java… các hàm này có chức năng là in một chuỗi ra màn hình, từ khóa puts trong Ruby ở trên cũng có chức năng tương tự. Các từ khóa/hàm này nhận vào một giá trị là một chuỗi, trong ví dụ trên thì “Ruby language” là một giá trị,

Nhưng trong Ruby thì có hơi khác, bản thân chuỗi “Ruby language” cũng là một đối tượng. Do đó chúng ta cũng có thể gọi phương thức từ chuỗi này.

Ngoài ra phương thức tồn tại trong các đối tượng chứ không tự tồn tại một mình ở đâu đó được, puts cũng là một phương thức của một đối tượng đó là module Kernel.

Ví dụ 1:
```Ruby
simple2.rb
Kernel.puts "Ruby language"
Kernel.puts "Ruby language".size
```
Trong dòng code đầu tiên chúng ta gọi phương thức puts và gọi cả tên module Kernel ra luôn. Trong C# hay Java cũng tương tự là Console.writeln và System.out.println(). Tất nhiên là chúng ta cũng không cần gọi Kernel ra như vậy trong Ruby nhưng ví dụ này chỉ để khẳng định là phương thức thì luôn đi kèm với một đối tượng nào đó.

Trong dòng tiếp theo chúng ta in ra kích thước của chuỗi “Ruby language”, điều này chứng tỏ chuỗi “Ruby language” cũng chính là một đối tượng chứ không đơn thuần chỉ là một giá trị như trong các ngôn ngữ khác. Phương thức size sẽ trả về số lượng kí tự trong một chuỗi.
```Ruby
Output
Ruby language
13
```
Ví dụ 2:
```Ruby
objectnumber.rb

puts 6.object_id
 
puts 6.even?
puts 6.zero?
 
puts 6.class
```
Chúng ta có số 6 và cũng có thể gọi một số phương thức của số 6 này.

```Ruby
puts 6.object_id
```
Mỗi đối tượng đều được gán một id và chúng ta có thể lấy giá trị đó ra bằng cách gọi phương thức object_id. Mỗi lời gọi phương thức đều được đặt sau dấu chấm sau tên đối tượng.

```Ruby
puts 6.even?
puts 6.zero?
```
Phương thức even? trả về True nếu số đó là số chẵn và ngược lại. Phương thức zero? trả về True nếu số đó là 0. Ở đây có một điểm lưu ý là nếu phương thức trả về True hoặc False thì phải kèm thêm dấu ? sau tên phương thức.

```Ruby
puts 6.class
```
Phương thức class cho biết tên lớp của đối tượng, ở đây số 6 là một đối tượng thuộc lớp Fixnum.
```Ruby
Output
13
true
false
Fixnum
```
**Tạo đối tượng**

Một đối tượng phải được tạo ra thì mới có thể sử dụng được. Đối tượng trong Ruby có thể được tạo ra một cách rõ ràng hoặc tạo ngầm. Ví dụ về đối tượng ngầm là mấy cái đối tượng được tạo ra từ giá trị như số 6 hay chuỗi “Ruby language” ở trên. Còn để tạo đối tượng một cách rõ ràng thì chúng ta dùng từ khóa new. Đối tượng thuộc lớp do chúng ta tự định nhĩa cũng dùng từ khóa new.
```Ruby
object_creation.rb

class Being
end
     
puts 67
puts "Hello world"
 
s = String.new "Hello world"
puts s
 
# n1 = Fixnum.new 67
# puts n1
 
b = Being.new
puts b
```
Trong đoạn code trên chúng ta tạo một số đối tượng bằng các cách khác nhau.
```Ruby
class Being
end
```
Chúng ta định nghĩa lớp Being. Để định nghĩa một lớp thì chúng ta dùng từ khóa class.

```Ruby
puts 67
puts "Hello world"
```
Hai dòng code trên tạo đối tượng ngầm là 67 và chuỗi “Hello world”.

```Ruby
s = String.new "Hello world"
puts s
```
Tương tự, chúng ta có thể tạo đối tượng string một cách rõ ràng luôn với từ khóa new.

```Ruby
# n1 = Fixnum.new 67
# puts n1
```
Không phải tất cả các lớp có sẵn trong Ruby đều có thể được tạo ra bằng từ khóa new, Fixnum là một ví dụ, các đối tượng Fixnum chỉ có thể được tạo ngầm.

```Ruby
b = Being.new
puts b
```
Đoạn code trên tạo đối tượng b từ lớp Being do chúng ta định nghĩa.

Output
```Ruby
67
Hello world
Hello world
#<Being:0x8492o3a>
```
**Đối tượng giá trị**

Như đã nói ở trên là chúng ta có thể tạo đối tượng một cách ngầm định từ các giá trị. Ở đây chúng ta sẽ làm việc với một số phương thức của loại đối tượng này.

literals.rb
```Ruby
4.times { puts "Ruby" }
 
puts "Ruby".size
puts "Ruby".downcase
 
puts [1, 2, 3].include? 3
puts [1, 2, 3].empty?
 
puts :name.class
puts :name.frozen?
 
puts (1..6).class
puts (1..6).include? 4
```
Trong đoạn code trên chúng ta có các đối tượng Fixnum, String, Array, kiểu Symbol và kiểu Range. Chúng ta sẽ tìm hiểu kỹ hơn về các kiểu đối tượng này trong bài sau.

```Ruby
4.times { puts "Ruby" }
```
Phương thức times của đối tượng Fixnum thực hiện phép nhân lên giá trị phía sau nó, ở đây là thực hiện puts "Ruby" 4 lần.

```Ruby
puts "Ruby".size
puts "Ruby".downcase
```
Phương thức size lấy về số kí tự trong chuỗi, phương thức downcase thực hiện chuyển chuỗi về kiểu chữ in thường.

```Ruby
puts [1, 2, 3].include? 3
puts [1, 2, 3].empty?
```
Trong 2 dòng code trên chúng ta sử dụng đối tượng kiểu mảng – Array, phương thức include? cho biết một giá trị nào đó có thuộc mảng hay không. Phương thức empty? cho biết mảng này rỗng hay không.

```Ruby
puts :name.class
puts :name.frozen?
```
Ở 2 dòng trên chúng ta thao tác với kiểu Symbol, symbol có tên bắt đầu bằng dấu 2 chấm ":" chúng ta sẽ tìm hiểu thêm trong bài sau.

```Ruby
puts (1..6).class
puts (1..6).include? 4
```
Cuối cùng là 2 đối tượng kiểu Range, về bản chất thì kiểu này cũng tương tự như kiểu mảng vậy. Phương thức class trả về tên của kiểu dữ liệu này, còn phương thức include? cho biết giá trị nào đó có nằm trong danh sách hay không.
```Ruby
Output
Ruby
Ruby
Ruby
Ruby
4
ruby
true
false
Symbol
false
Range
true
```
**Thừa kế**

Một trong những khái niệm trong lập trình hướng đối tượng là thừa kế và Ruby cũng thế. Thừa kế bao gồm các đối tượng cha và đối tượng con, đối tượng cha sẽ chứa những thuộc tính và phương thức mà đối tượng con có thể thừa kế lại. Tất cả các đối tượng trong Ruby đều thừa kế từ một đối tượng gốc có tên là Object. Tất cả các đối tượng trong Ruby đều có các phương thức mà đối tượng Object có, nhưng có thể định nghĩa lại.
```Ruby
mother.rb
puts 4.is_a? Object
puts "Ruby".is_a? Object
puts [2, 3].is_a? Object
puts :name.is_a? Object
puts (1..2).is_a? Object
```
Đoạn code trên cho chúng ta thấy tất cả các đối tượng đều thừa kế từ đối tượng Object.

```Ruby
puts 4.is_a? Object
```
Trong dòng code trên phương thức is_a? cho biết đối tượng 4 có được kế thừa từ đối tượng Object hay không.

```Ruby
true
true
true
true
true
```
Trong ví dụ dưới đây, chúng ta sẽ định nghĩa các lớp có kế thừa nhau.
```Ruby
custom_inher.rb
class Being
  def to_s
      "This is Being"
   end
   def get_id
      9
   end
end
 
class Living < Being
    def to_s
        "This is Living"
    end
end
l = Living.new
 
puts l
puts l.get_id
puts l.is_a? Being
```
Chúng ta định nghĩa 2 lớp Being và Living, lớp Living kế thừa từ lớp Being, do đó lớp Being là lớp cha, lớp Living là lớp con.
```Ruby
class Being 
   def to_s
     "This is Being"
   end
   def get_id
      9
   end
end
```
Để định nghĩa một lớp thì chúng ta sử dụng cặp từ khóa class...end, sau từ khóa class là tên lớp mà chúng ta muốn đặt. Bên trong lớp chúng ta có thể định nghĩa các phương thức bằng cách dùng cặp từ khóa def…end, sau từ khóa def cũng từ tên phương thức mà chúng ta muốn đặt. Trong đoạn code trên chúng ta có 2 phương thức là to_s và get_id.

Đối tượng nào cũng có phương thức to_s cả vì mặc định đối tượng Object cũng có phương thức này. Khi chúng ta dùng phương thức puts để in ra một giá trị nào đó thì phương thức này sẽ tự động gọi đến phương thức to_s có trong các đối tượng. Trong ví dụ này chúng ta định nghĩa lại phương thức to_s, nếu không thì puts sẽ sử dụng phương thức to_s mặc định của đối tượng Object.

```Ruby
class Living < Being
 def to_s
   "This is Living"
  end
end
```
Chúng ta định nghĩa lớp Living, lớp này kế thừa từ lớp Being, để một lớp được kế thừa từ lớp khác thì chúng ta thêm dấu < cùng với tên của lớp cha vào sau tên lớp con. Ở đây lớp Living cũng định nghĩa lại phương thức to_s của riêng nó.

```Ruby
l = Living.new
```
Chúng ta tạo đối tượng Living bằng cách dùng từ khóa new.

```Ruby
puts l
```
Phương thức puts sẽ gọi đến phương thức to_s trong lớp Living.

```Ruby
puts l.get_id
```
Lớp Living không định nghĩa lại phương thức get_id nên Ruby sẽ tìm dần dần các lớp cha xem lớp nào có thì gọi phương thức get_id từ lớp đó.

```Ruby
puts l.is_a? Being
```
Dòng code trên sẽ trả về True vì lớp Living kế thừa từ lớp Being nên một đối tượng Living cũng là một đối tượng Being.
```Ruby
Output
This is Living
true
```
**Đối tượng main**

Trong các ngôn ngữ như C++, Java… thì chương trình bắt đầu chạy từ một hàm đặc biệt tên là hàm main(), khi chạy chương trình hàm này sẽ được gọi từ hệ điều hành.

Trong Ruby cũng thế, mỗi đoạn code trong file .rb đều nằm trong một đối tượng có tên là main mặc dù ở đây chúng ta không khai báo ra, đối tượng này cũng kế thừa từ đối tượng Object. Chính vì main cũng là một đối tượng nên các biến được khai báo trong main cũng là thuộc tính của main.
```Ruby
toplevel.rb
n1 = 3
n2 = 5

 
puts local_variables
 
Kernel.puts self
puts self.class
```
Đoạn code trên ví dụ về đối tượng main trong Ruby.

```Ruby
n1 = 3
n2 = 5
```
Chúng ta có 2 đối tượng số nguyên. Cả hai đối tượng này đều thuộc về đối tượng main.

```Ruby
puts local_variables
```
Biến local_variables thực chất là một phương thức của module Kernel, lưu trữ danh sách các biến cục bộ hiện có.

```Ruby
Kernel.puts self
```
Biến self là biến tham chiếu đến đối tượng hiện tại, nói cho dễ hiểu thì self chính là main, nếu bạn biết con trỏ this trong C++, Java… thì self cũng giống như con trỏ this vậy.

```Ruby
puts self.class
```
Biến class cho biết tên lớp của đối tượng hiện tại, hiện tại chúng ta dùng đối tượng self (hoặc main) mà đây là đối tượng thuộc lớp Object nên dòng trên sẽ in ra chuỗi Object.
```Ruby
Output
n1
n2
main
Object
```