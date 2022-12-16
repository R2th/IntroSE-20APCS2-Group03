Nếu bạn muốn thực sự hiểu Ruby, bạn phải hiểu về Lập trình Hướng đối tượng (OOP). 

Bạn có thể viết bất kì chương trình Ruby nào mà không cần OOP.
Nhưng việc sử dụng OOP khiến mọi thứ trở nên dễ dàng hơn nếu ứng dụng ngày một lớn.
Bởi, OOP thể hiện cách bạn thiết kế và tổ chức đoạn code.
Bạn tạo nên các lớp đại diện cho ứng dụng của mình.
Và mỗi lớp thực hiện một công việc cụ thể.
<br>Vậy còn chờ đợi gì nữa, bắt đầu tìm hiểu thôi nào!
#  1. Lớp
   Lớp là một bản thiết kế bao gồm các thuộc tính và hành động, để từ đó các đối tượng được tạo ra.<br>
   Trong Ruby, lớp được khai báo bằng từ khóa "class", theo sau là tên lớp được viết theo quy tắc CamelCase và kết thúc bằng từ khóa "end". 
   <br>Ví dụ sau định nghĩa một lớp đơn giản xác định các loài động vật:
<br>
```
class Animal
# Properties, method here
end
```
<br>Vậy tiếp sau đây, ta sẽ tìm hiểu đối tượng là gì, để xem nó có mối quan hệ như thế nào với lớp, và sự khác nhau giữa chúng ra sao :fist_oncoming::fist_oncoming::fist_oncoming:


   # 2. Đối tượng
   Đối tượng là các thể hiện của lớp. Khi các lớp được định nghĩa, không có bộ nhớ nào được cấp phát. Nhưng khi nó được khởi tạo (các đối tượng được tạo ra), bộ nhớ sẽ được cấp phát.
   <br>Chúng ta quay lại với ví dụ về Animal ở trên, ta có lớp Animal được khai báo như sau:
  ```
 class Animal
  end
```
Ta tạo một đối tượng từ lớp Animal:
```
dog = Animal.new
```
Tại ví dụ trên, ta chú ý đến các thành phần chính:
* dog: tên đối tượng, giá trị này sẽ cho bạn lựa chọn, miễn sao phù hợp nhu cầu sử dụng.
* Animal: tên lớp mà bạn tạo các đối tượng từ đó
* new: đây là phương thức được định nghĩa trong thư viện của Ruby, bạn sử dụng như cách gọi các phương thức qua tên lớp để tạo ra một đối tượng


# 3. Phương thức trong Ruby
Phương thức trong Ruby tương tự như hàm ở trong các ngôn ngữ khác, thể hiện hành động mà đối tượng sẽ thực thi.
Tương tự cách khai báo lớp, phương thức định từ bằng từ khóa "def", theo sau là tên phương thức viết theo quy tắc snake_case và kết thúc bằng từ khóa "end".
<br>Ví dụ đơn giản sau thể hiện một hành động di chuyển của Animal
  ```
 class Animal
   def animal_moving
     puts "Animal is moving!"
  end
```
Mình vừa tạo một phương thức **animal_moving**. Khi bạn gọi phương thức này bằng tên của nó, hành động bên trong sẽ được thực hiện. Cách gọi như sau:
```
rabbit = Animal.new
rabbit.animal_moving
```
Kết quả:
```
Animal is moving!
```
**Lưu ý:** Bạn gọi phương thức thông qua đối tượng của Animal, không phải trực tiếp Animal.
<br>Ta gọi những phương thức này là "instance method", bởi instance là cách gọi khác của object, và những phương thức này tồn tại để phục vụ cho object.
<br>Nếu bạn gọi qua chính tên lớp:
```
Animal.animal_moving
```
 lỗi sẽ xảy ra:
```
undefined method `animal_moving' for Animal:Class (NoMethodError)
```
Để có thể gọi phương thức từ chính tên lớp, chúng ta sẽ sử dụng "class method", với từ khóa "self" mà chúng ta sẽ tìm hiểu kĩ ở phần 5.<br>
##  ***Phương thức khởi tạo trong Ruby***
<br>Mỗi loài động vật đều sẽ có tiếng kêu của loài. Nếu bạn muốn khởi tạo đối tượng từ lớp Animal cùng **tiếng kêu của chúng**, ta sẽ sử dụng **initialize method**, tương tự như constructor ở các ngôn ngữ lập trình khác, gọi là **phương thức khởi tạo**. Phương thức này sẽ nhận một danh sách các tham số, khởi tạo chúng ngay khi đối tượng được tạo ra. Ta đến với ví dụ dưới đây để hiểu rõ hơn nha:
<br>
```
class Animal
  def initialize sound
    @sound = sound
  end
end
```
Ở ví dụ trên, ta đã sử dụng phương thức khởi tạo, tương tự như các phương thức khác trong ruby nhưng có thêm từ khóa **initialize** để báo với Ruby rằng đây là phương thức khởi tạo. Tại đây, ta đã truyền vào **tham số *sound***, đại diện cho tiếng kêu động vật khi một đối tượng Animal được khai báo.
<br>Còn @sound được gọi là instance variable, tạm gọi là biến đối tượng. Khi đối tượng được khởi tạo, biến @sound sẽ có giá trị khởi tạo là giá trị tham số "sound" được truyền vào, và ta có thể sử dụng biến @sound cùng giá trị này song song cùng đối tượng được tạo ra. Ta đi đến ví dụ với lớp Animal có phương thức khởi tạo ở trên nhé :wink::wink:
<br>
```
tiger = Animal.new "gru gru"
chicken = Animal.new "chiep chiep"
```
Vậy là, tiger kêu gru gru, chicken kêu chiep chiep (gà con nha mọi người, đừng bắt bẻ mình gà mẹ kêu cục tác - gà bố kêu chipu nha :joy::joy::joy: )
<br>Đặc biệt lưu ý, khi bạn sử dụng phương thức khởi tạo có tham số, thì khi khai báo đối tượng bắt buộc phải truyền giá trị cho tham số để tránh bị lỗi nhé.
# 4. Attribute Accessors
Ta vừa học về phương thức khởi tạo ở phần 4, vậy làm sao để truy cập, cũng như chỉnh sửa các giá trị của instance variable đã khai báo trong phương thức khởi tạo.
Có 2 trường hợp cụ thể:
1. Nếu bạn đang ở trong một instance method, bạn có thể tham chiếu tới nó một cách trực tiếp (thông qua @ten_bien)
2. Nếu bạn ở bên ngoài phạm vi lớp, bạn sẽ cần sử dụng attribute accessor

Ta sử dụng lại object **tiger** đã khai báo ở phần 4. Nếu ta muốn in ra màn hình âm thanh của tiger:
```
puts tiger.sound
```
lỗi sẽ nhảy ra ngay:
```
NoMethodError: undefined method 'sound'
```

Instance variable mặc định là private, đó là lí do tại sao chúng ta không thể lấy giá trị "sound" một cách trực tiếp.
<br>Attribute accessor sẽ giúp bạn làm điều đấy. 
Có các loại accessor khác nhau:
* attr_reader (chỉ đọc)
* attr_writer (chỉ ghi)
* attr_accessor (đọc & ghi)

Khi sử dụng attr_writer or attr_accessor, bạn có thể thay đổi giá trị instance variables ngay khi bạn ở bên ngoài lớp. Hãy đi đến ví dụ ngay để dễ hiểu hơn:


```
class Animal
  attr_accessor :sound

  def initialize sound
    @sound = sound
  end
end

tiger = Animal.new "gru gru"
puts tiger.sound

tiger.sound = "huhuhu"
puts tiger.sound
```
Kết quả sẽ là:
```
gru gru
huhuhu
```
# 5. Class method
Như dã đề cập ở trên, để truy cập đến phương thức mà không cần tạo đối tượng, ta sử dụng **class method**, với từ khóa **self**.
Ta đi đến ví dụ:
```
class Animal
  def self.eating
    puts "They are eating."
  end
end
```
Từ khóa **self** ở ngay trước tên phương thức, làm cho phương thức đấy trở thành class method. Ở đây, **self** đề cập đến tên lớp (Animal).
<br>Rõ ràng:
<br> Sự khác biệt giữa instance method & class method là instance method dành cho objects, và class method dành cho chính nó.
<br>Cách sử dụng class method rất đơn giản, tương tự như cách gọi các phương thức khác, ta gọi phương thức qua tên của nó.
```
Animal.eating
```
Kết quả:
```
They are eating.
```

***Tại sao cần sử dụng class method?***
<br>Đa số khi lập trình Ruby, ta sẽ làm việc với object. Nhưng đôi khi, ta không cần thiết phải tạo một đối tượng, như khi ta sử dụng lớp **Math** từ thư viện Ruby, để tìm căn bậc 2 của 25:
```
Math.sqrt(25)
```

Bạn không cần đối tượng Math bởi vì Math không lưu trữ dữ liệu nào.
Phương thức của Math nhận tham số, trả về giá trị cần thiết cho bạn. Đó là trường hợp sử dụng của các class method.