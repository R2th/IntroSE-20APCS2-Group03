Ở các bài viết trước, chúng ta đã tìm hiểu về khá nhiều loại Ruby objects khác nhau. Trong bài viết này, ta sẽ tìm hiểu về Ruby **classes**. Trong đó, ta sẽ tạo ra các object, và method của riêng nó.
## Defining classes
Ta biết rằng, Ruby objects có thể được tạo ra bằng cách sử dụng class name và **new** constructor method:
```ruby
>> String.new("Madam, I'm Adam.")
=> "Madam, I'm Adam."
>> Time.new(1969, 7, 20, 20, 17, 40)
=> 1969-07-20 20:00:00 -0700
```
Và ta có thể tạo ra class riêng của mình bằng cách sử dụng 3 thành phần cơ bản: 
1. Sử dụng **class** keyword để định nghĩa class.
2. Sử dụng method đặc biệt là **initialize** để chỉ định hành vi của **new**.
3. Sử dụng attribute accessor (**attr_accessor**) để cho phép getting và setting các attributes.

Ta sẽ đi vào một ví dụ cụ thể với **Phrase** class với **content** attribute. Ta sẽ viết nó trong file `palindrome.rb`:
```palindrome.rb
# Defines a Phrase class.
class Phrase
end

phrase = Phrase.new
puts phrase
```
Ở đây Phrase class đã tự động có **new** method vì nó đã thực hiện kế thừa (inheritance), chi tiết ta sẽ tìm hiểu thêm ở phần sau. Sau đó, lệnh **puts** sẽ in ra mã trừu tượng của class như sau:
```ruby
$ ruby palindrome.rb
#<Phrase:0x00007fa3d30a3e98>
```
Chú ý rằng, không giống như variables và methods là sử dụng quy tắc đặt tên kiểu snake_case, tên class sẽ sử dụng quy tắc CamelCase (viết hoa chữ đầu). <br>
[CamelCase](https://en.wikipedia.org/wiki/Camel_case) nghĩa là những chữ viết hoa là tương tự như cái bướu của con lạc đà vậy, từ trước và sau được phân tách - phân biệt bằng chữ hoa thay vì sử dụng ký tự gạch dưới. Ở trên, tên class là **Phrase** thì chỉ có 1 từ nên nó không thể hiện rõ ràng, nhưng ở phần sau ta sẽ định nghĩa một class mới là **TranslatedPhrase**.

![](https://images.viblo.asia/6bbc21c3-0a4b-4145-8f6a-27cd51d51a8e.png)

Tiếp theo, ta sẽ dùng class **Phrase** để thể hiện một cụm từ là “Madam, I’m Adam.”, cụm từ đạt tiêu chuẩn là một palindrome cho dù nó không giống nhau hoàn toàn khi xem theo chiều ngược và xuôi. Đầu tiên, ta sẽ định nghĩa một **Phrase** constructor function, nhận vào một đối số (là **content**) và set thuộc tính **content**. Tương tự như thuộc tính **length** của **String** objects, ta có thể truy cập **content** bằng cách sử dụng dấu chấm. <br>
Để làm cho code chạy được, đầu tiên ta cần định nghĩa **initialize** method, hàm này được gọi khi ta khởi tạo object bằng cách sử dụng **Phrase.new**: 
```palindrome.rb
# Defines a Phrase class.
class Phrase

  def initialize(content)
    @content = content
  end
end

phrase = Phrase.new("Madam, I'm Adam.")
puts phrase.content
```
Ở trên, ta đã khởi tạo một `instance variable @content`, loại biến này có ký tự **@** đằng trước. Thoạt nhìn, ta nghĩ rằng, chương trình sẽ tự động cho phép ta liên kết với biến với một object attribute. Nhưng, ta hãy chạy thử code bên trên xem sao nhé:
```ruby 
$ ruby palindrome.rb
Traceback (most recent call last):
palindrome.rb:15:in `<main>': undefined method `content' for
#<Phrase:0x00007fe8c70a3db0 @content="Madam, I'm Adam."> (NoMethodError)
```
Bởi vì là ta chỉ mới có mỗi một biến là `@content` nên Ruby sẽ không hiểu cái gì sẽ tạo ra **phrase.content** cho nên nó sẽ bắn ra một **NoMethodError** exception. <br>
Cách để fix vấn đề này đó là ta sẽ thêm **accessor** methods (nó được biết đến như là [ getter/setter method](https://en.wikipedia.org/wiki/Mutator_method)), nó cho phép ta truy cập (“get”) và gán giá trị (“set”) vào thuộc tính đã khai báo. Trong Ruby, ta có cú pháp là **attr_accessor** (“attribute accessor”).
```palindrome.rb
# Defines a Phrase class.
class Phrase
  attr_accessor :content

  def initialize(content)
   @content = content
  end
end

phrase = Phrase.new("Madam, I'm Adam.")
puts phrase.content
```
Chú ý rằng, đối số **attr_accessor** ở đây là một symbol, và Ruby sẽ tự động liên kết nó với instance variable có cùng tên giống nhau. Ở đoạn code bên trên, phrase.content đã dùng giá trị của `@content` instance variable. <br>
Điều quan trọng là phải hiểu được cách dùng **content** như thế nào, cái nào thì tên phải giống nhau, cái nào thì không cần. Ở đây, để cho **content** attribute chạy được thì 3 thành phần `:content`, `@content`, và `phrase.content` phải có tên giống nhau (trong trường hợp này nó tên là **content**). Tuy nhiên, tên của đối số ở hàm constructor **initialize** thì bạn có thể đặt bất cứ tên gì bạn muốn (Để cho tiện, thì ta cũng đều đã đặt tên là content). Mối quan hệ này được minh họa trong hình dưới đây: 

![](https://images.viblo.asia/c6e31b20-1755-4c1e-a8a1-ea13941c1d8f.png)

Khi chạy code, ta thu được kết quả như sau:
```ruby
$ ruby palindrome.rb
Madam, I'm Adam.
```
Bên cạnh đó, ta cũng có thể gán giá trị trực tiếp cho **content** bằng cách dùng ký hiệu dấu chấm.
```palindrome.rb
# Defines a Phrase class.
class Phrase
  attr_accessor :content

  def initialize(content)
   @content = content
  end
end

phrase = Phrase.new("Madam, I'm Adam.")
puts phrase.content

phrase.content = "Able was I, ere I saw Elba."
puts phrase.content
```
Và thu được kết quả như mong muốn: 
```ruby
$ ruby palindrome.rb
Madam, I'm Adam.
Able was I, ere I saw Elba.
```
Tiếp theo, ta sẽ khôi phục lại method **palindrome?** đã viết ở bài trước, và xóa các dòng puts đi như ở dưới đây:
```palindrome.rb
# Returns true for a palindrome, false otherwise.
def palindrome?(string)
  processed_content = string.downcase
  processed_content == processed_content.reverse
end

# Defines a Phrase class.
class Phrase
  attr_accessor :content

  def initialize(content)
    @content = content
  end
end
```
Để check xem có lỗi gì không, ta có một cách tiện lợi là mở irb lên để check: 
```ruby
>> load "./palindrome.rb"
>> phrase = Phrase.new("Racecar")
>> phrase.content
=> "Racecar"
>> palindrome?(phrase.content)
=> true
```
Bước tiếp theo, ta sẽ move **palindrome?** function vào **Phrase** object - thêm nó như là một method. Và ta cần sửa method đó thành không nhận đối số, và dùng **Phrase** content thay vì biến **string**. Chi tiết như sau:
```palindrome.rb
# Defines a Phrase class.
class Phrase
  attr_accessor :content

  def initialize(content)
    @content = content
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content = self.content.downcase
    processed_content == processed_content.reverse
  end
end
```
Từ đoạn code trên ta thấy, từ bên trong method **palindrome?** ta có thể truy cập giá trị của **content** bằng cách sử dụng **self** object, nó là một thể hiện của chính class đó. Nói cách khác, khi ta viết : `phrase = Phrase.new("Racecar")` ta có thể truy cập vào thuộc tính của **phrase** bên trong **Phrase** class có sử dụng **self**.
Kết quả là, ta có thể gọi method **palindrome?** trên **phrase** object, như dưới đây: 
```ruby
>> load "./palindrome.rb"
>> phrase = Phrase.new("Racecar")
>> phrase.palindrome?
=> true
```
-> Vậy là nó in ra đúng kết quả mong muốn, **phrase** object đã được khởi tạo với giá trị là "Racecar" thì đúng là một palindrome.
## Inheritance
Khi tìm hiểu về Ruby class, nhất định ta phải tìm hiểu về class hierarchy (phân cấp lớp) bằng cách sử dụng **class** và **superclass** methods. Hãy cùng tìm hiểu về ý nghĩa của nó trong trường hợp một class rất quen thuộc là, **String**: 
```ruby
>> s = String.new("foobar")
=> "foobar"
>> s.class                        # Find the class of s.
=> String
>> s.class.superclass             # Find the superclass of String.
=> Object
>> s.class.superclass.superclass  # Ruby has a BasicObject base class as of 1.9
=> BasicObject
>> s.class.superclass.superclass.superclass
=> nil
```
Dưới đây là inheritance hierarchy (hệ thống phân cấp kế thừa) của class **String**: 

![](https://images.viblo.asia/82af6ddd-1b10-42a7-b3a6-93f75694a4e4.png)

Ta thấy rằng, superclass của **String** là **Object**, supperclass của **Object** là **BasicObject**, nhưng **BasicObject** sẽ không có supperclass.
Và đây là pattern đúng với mọi Ruby object: Truy theo cấu trúc class thì mọi class trong Ruby cuối cùng đều kế thừa từ BasicObject và không còn supper class nào nữa. Và ý nghĩa cuối cùng đó là "mọi thứ trong Ruby đều là object". <br>
Cách mà hệ thống phân cấp class của Ruby hoạt động đó là, mỗi class sẽ kế thừa thuộc tính và method của class cao hơn trong hệ thống phân cấp. Ví dụ, vừa rồi ta vừa xem cách tìm ra class của **String** object: 
```ruby
>> "honey badger".class
=> String
```
Vậy thì bản thân **class** method được định nghĩa hay đến từ đâu ? Câu trả lời là, **String** kế thừa **class** từ **Object**. Điều này đã được mô tả trong [Documentation of Object](https://ruby-doc.org/core-2.5.0/Object.html) - hoặc xem ảnh trích dẫn dưới đây: 

![](https://images.viblo.asia/9c93fb4c-7c00-4294-858e-9561d3684f56.png)

Từ trên, ta thấy rằng do **String** kế thừa từ **Object** nên nó tự động có **class** method (và các **Object** methods khác.) Ở trong phiên bản cũ hơn của Ruby, Object là base của tất cả các class, nhưng Object có rất nhiều method và kinh nghiệm chỉ ra rằng trong một số ứng dụng, ta sử dụng [BasicObject class](https://ruby-doc.org/core-2.5.0/BasicObject.html) sẽ tiện lợi hơn. <br>
Quay trở lại với **Phrase** class được định nghĩa bên trên. Phrase có thuộc tính **content**, và phrase thực sự là **string**, và điều này gợi ý rằng nó kế thừa từ **String** class. (Nói theo thuật ngữ của lập trình hướng đối tượng, thì đây là mối quan hệ [ is-a](https://en.wikipedia.org/wiki/Is-a)). Các kế thừa trong Ruby đó là sử dụng ký hiệu ngoặc nhọn bên trái **<**. Chú ý rằng, ở đoạn code dưới đây, ta sẽ thay thế **self.content.downcase** thành **self.downcase**, bởi vì phrase là một string, **self** là một string, có nghĩa rằng ta có thể gọi **downcase** method một cách trực tiếp.
```palindrome.rb
# Defines a Phrase class.
class Phrase < String
  attr_accessor :content

  def initialize(content)
    @content = content
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content = self.downcase
    processed_content == processed_content.reverse
  end
end
```
Nếu tinh ý, bạn có thể thấy rằng ta đã không còn sử dụng **content** nữa, điều này có nghĩa rằng ta có thể loại bỏ hoàn toàn **attribute accessor** và **initialize** method. Kết quả là, ta có một **Phrase** class cực kỳ nhỏ gọn: 
```palindrome.rb
# Defines a Phrase class (inheriting from String).
class Phrase < String

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content = self.downcase
    processed_content == processed_content.reverse
  end
end
```
Ta có thể dùng irb để check xem nó còn hoạt động đúng không : 
```ruby
>> load "./palindrome.rb"
>> phrase = Phrase.new("Racecar")
>> phrase.palindrome?
=> true
```
Ở đây, **new** method là thuộc của **String** - vì ta đã loại bỏ hoàn toàn **initialize** custom method rồi. Cũng bởi vì Phrase là String nên ta có thể gọi bất kỳ [string methods](https://ruby-doc.org/core-2.5.0/String.html) nào.
```ruby
>> phrase.empty?
=> false
>> phrase.length
=> 7
>> phrase.scan(/c\w/)
=> ["ce", "ca"]
```
Mối quan hệ giữa **Phrase** và các class khác trong hệ thông phân cấp, ta có thể xem ở dưới đây:
```ruby 
>> phrase.class
=> Phrase
>> phrase.class.superclass
=> String
>> phrase.class.superclass.superclass
=> Object
>> phrase.class.superclass.superclass.superclass
=> BasicObject
```
Ta có thể minh họa cấu trúc phân cấp kế thừa của **Phrase** class bằng hình ảnh dưới đây: 

![](https://images.viblo.asia/90d13a64-64a8-4031-b440-28ca1b957a60.png)

## Derived classes
Dựa trên kiến thức về kế thừa ở trên, ta sẽ tạo ra một class kế thừa từ **Phrase**, ta gọi class này là **TranslatedPhrase**. Ta gọi đây là một **derived class** (lớp dẫn xuất), mục đích của class này là kế thừa từ **Phrase** nhiều nhất có thể, đồng thời cho phép ta kiểm tra một cách linh hoạt xem một **translation** có phải là palindrome hay không.<br>
Ta sẽ tạo ra một method riêng là **processed_content** từ method **palindrome?**. Điều này giúp ta tái sử dụng tốt trong mọi trường hợp.
```palindrome.rb
# Defines a Phrase class (inheriting from String).
class Phrase < String

  # Returns content for palindrome testing.
  def processed_content
    self.downcase
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end
end
```
Và giờ ta đã sẵn sàng cho việc kế thừa từ **Phrase**. Và ta bắt đầu bằng cách sử dụng toán tử kế thừa **<** như sau:
```ruby
# Defines a translated Phrase.
class TranslatedPhrase < Phrase

end
```
Kế hoạch của ta là sẽ sử dụng TranslatedPhrase theo cách như thế này: `TranslatedPhrase.new("recognize", "reconocer")`. <br>
Trong đó, đối số đầu tiên là **Phrase** content, đối số thứ 2 là một **translation**. Do **TranslatedPhrase** sẽ cần một thuộc tính **translation** cho nên ta sẽ tạo **initialize** và **attr_accessor** như là với **content**.
```ruby
# Defines a translated Phrase.
class TranslatedPhrase < Phrase
  attr_accessor :translation

  def initialize(content, translation)
    @translation = translation
  end
end
```
Chú ý rằng, initialize nhận vào 2 tham số là **content** và **translation**. Ta đã xử lí **translation** như một thuộc tính bình thường, nhưng ta sẽ phải làm gì với **content**? <br>
Ở class Phrase bên trên ta đã bỏ nó đi và delegate (ủy quyền ) cho constructor của **String** class, tuy nhiên trong TranslatedPhrase ta sẽ gọi tới method đặc biệt đó là **super**:
```ruby
# Defines a translated Phrase.
class TranslatedPhrase < Phrase
  attr_accessor :translation

  def initialize(content, translation)
    super(content)
    @translation = translation
  end
end
```
Việc này sẽ gọi tới **initialize** method của superclass - trong trường hợp này là **Phrase** class, nhưng trong **Phrase** lại không có **initialize**, cho nên nó sẽ tiếp tục tìm kiếm ở lớp bên trên là **String** class. Khi đó, Ruby sẽ khởi tạo self để có được giá trị được cung cấp bởi **content** parameter.
Kết hợp lại với nhau ta được đoạn code như sau:
```palindrome.rb
# Defines a Phrase class (inheriting from String).
class Phrase < String
  .
  .
  .
end

# Defines a translated Phrase.
class TranslatedPhrase < Phrase
  attr_accessor :translation

  def initialize(content, translation)
    super(content)
    @translation = translation
  end
end
```
Bởi vì **TranslatedPhrase** kế thừa từ **Phrase**, cho nên nó tự động sẽ có tất cả các method của **Phrase** bao gồm cả **palindrome?** method. Giờ hãy thử tạo một biến là frase (đọc là "FRAH-seh" đây là tiếng Spanish của "phrase"), và xem nó hoạt động ra sao nhé.
```ruby
>> load "./palindrome.rb"
>> frase = TranslatedPhrase.new("recognize", "reconocer")
>> frase.palindrome?
=> false
```
Ta thấy rằng, frase có method **palindrome?** như đã mô tả ở trên, và nó sẽ return **false** bởi vì "recognize" không phải là một **palindrome**. <br>
Nhưng, nếu ta muốn kiểm tra xem **translation** có phải là một palindrome không, chứ không phải kiểm tra content thì phải làm sao ? Bởi vì ở trên ta đã tách **processed_content** method thành riêng biệt, cho nên để đạt được được mục đích ta cần `overriding` **processed_content** method trong **TranslatedPhrase**.
```palindrome.rb
# Defines a Phrase class (inheriting from String).
class Phrase < String

  # Returns content for palindrome testing.
  def processed_content
    self.downcase
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end
end

# Defines a translated Phrase.
class TranslatedPhrase < Phrase
  attr_accessor :translation

  def initialize(content, translation)
    super(content)
    @translation = translation
  end

  # Processes the translation for palindrome testing.
  def processed_content
    self.translation.downcase
  end
end
```
Điểm mấu chốt ở đoạn code trên là ta đang sử dụng **self.translation** ở trong method **processed_content** của **TranslatedPhrase**, cho nên Ruby sẽ hiểu là sẽ sử dụng nó thay cho method trong **Phrase** class. 
Khi chạy thử, ta được kết quả như sau:
```ruby
>> load "./palindrome.rb"
>> frase = TranslatedPhrase.new("recognize", "reconocer")
>> frase.palindrome?
=> true
```
Bởi vì **"reconocer"** là một palindrome, nên kết quả trả về là **true**.
Cấu trúc kế thừa ta có thể tổng quát hóa bằng ảnh dưới đây: 

![](https://images.viblo.asia/3d216ad8-9b90-4357-8586-6899a7f7d015.png)

Việc override như thế này, giúp ta có được sự linh hoạt rất tuyệt vời. Ta có thể quan sát quá trình thực thi **frase.palindrome?** trong 2 trường hợp khác nhau: <br>
**Case 1**: Check palindrome trong **Phrase**.
1. **frase.palindrome?** sẽ gọi **palindrome?** method cho **frase** instance, đó là một **TranslatedPhrase**. Vì không có **palindrome?** method trong **TranslatedPhrase** object nên Ruby dùng method trong **Phrase**.
2. **palindrome?** method trong **Phrase** gọi tới **processed_content** method. Do không có **processed_content** method trong **TranslatedPhrase** object nên Ruby dùng method trong **Phrase**.
3. Kết quả là nó đã so sánh phiên bản đã xử lý của **Phrase** instance với bản đảo ngược của chính nó. Và do "recognize" không phải là một palindrome nên kết quả trả về là **false**.

**Case 2**: Check palindrome trong **TranslatedPhrase**.
1.  **frase.palindrome?** sẽ gọi **palindrome?** method cho **frase** instance, đó là một **TranslatedPhrase**. Như đã mô tả trong case 1,  do không có **palindrome?** method trong **TranslatedPhrase** object nên Ruby dùng method trong **Phrase**.
2.  **palindrome?** method trong **Phrase** gọi tới **processed_content** method. Do hiện tại đã có **processed_content** method trong **TranslatedPhrase** object, nên Ruby sẽ không dùng method trong **Phrase** mà sẽ dùng method của **TranslatedPhrase**.
3.  Kết quả là nó đã so sánh phiên bản đã xử lý của **self.translation** instance với bản đảo ngược của chính nó. Và do "reconocer" là một palindrome nên kết quả trả về là **true**.

![](https://images.viblo.asia/12b9b812-9ae0-4ceb-b647-2064140db9c4.jpg)

## Modifying native objects
Bước cuối cùng về tìm hiểu kế thừa trong Ruby, ta sẽ tìm hiểu cách sửa đổi `native Ruby objects` (đối tượng Ruby nguyên bản ). Cụ thể là, ta sẽ add thêm **palindrome?** method vào String để nó như là một method mặc định của String. <br>
Sau đây ta sẽ xóa **Phrase** class và thêm **palindrome?** và **processed_content** method  vào **String** class. <br>
Hãy xem lại **Phrase** class dưới đây, chú ý rằng, dưới đây ta đã xóa **TranslatedPhrase** class do ta sẽ không dùng đến nó nữa, và cũng sẽ xóa luôn phần comment ở phía trên **Phrase** class. 
```palindrome.rb
class Phrase < String

  # Returns content for palindrome testing.
  def processed_content
    self.downcase
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end
end
```
Thật ngạc nhiên là Ruby cho phép chúng ta mở và modify String class - cho dù nó được chính Ruby tạo ra. Do đó, ta chỉ cần đổi tên **Phrase** class thành **String** là ta có thể modify nó rồi. Chi tiết như dưới đây:
```palindrome.rb
class String

  # Returns content for palindrome testing.
  def processed_content
    self.downcase
  end

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end
end
```
Và bây giờ, khi chạy code của chúng ta vẫn tìm thấy **palindromes** method một cách chính xác, với việc dùng **String** thay cho **Phrase**.
```ruby
>> load "./palindrome.rb"
>> napoleonsLament = String.new("Able was I ere I saw Elba")
>> napoleonsLament.palindrome?
=> true
```
Thậm chí, nhanh gọn hơn nữa ta có thể gọi tới **palindromes** method trực tiếp trên string:
```ruby
>> "foobar".palindrome?
=> false
>> "Racecar".palindrome?
=> true
>> "Able was I ere I saw Elba".palindrome?
=> true
```
Việc làm này giúp ta rất nhanh chóng kiểm tra được một string có là **palindromes** hay không, tuy nhiên ta phải tự đặt câu hỏi rằng, việc sửa đối **String** class mặc định như thế, có phải là một ý tưởng tốt hay không. Câu trả lời là điều này còn tùy thuộc vào văn hóa của mỗi ngôn ngữ, nhìn chung Ruby cũng tương đối chấp nhận cho phép ta thêm các method vào native objects (đối tượng mặc định) miễn sao nó không bị lạm dụng. Theo quan điểm của t, ta có thể làm việc này trong những đoạn shell script hoặc dự án nhỏ, tuy nhiên nếu trong dự án lớn, với rất nhiều code logic phức tạp thì điều này là không nên. Do vậy, ta cần căn cứ vào đặc thù dự án của mình. 
## Modules
Mục cuối cùng chúng ta cùng nhau tìm hiểu về Ruby class **modules**, (còn được gọi là **mixins**). Ruby modules cho chúng ta một cách để xác định chức năng chung và sau đó dùng nó trong nhiều class khác nhau. Về khái niệm thì có vẻ hơi trừu tượng, giờ chúng ta sẽ xem xét một ví dụ cụ thể. <br>
Ở trên, ta đã thêm **palindrome?** method vào **String** class, và sau đây để đảm bảo **processed_content** method không bị truy cập tùy tiện từ bên ngoài, ta thiết lập thành **private**. 
```palindrome.rb
class String

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end

  private

    # Returns content for palindrome testing.
    def processed_content
      self.downcase
    end
end
```
Hóa ra, không phải có mỗi **String** có thể là một palindromes, mà **Integers** cũng có thể là một palindromes. Ví dụ, số 12321 là một palindromes bởi vì nó giống nhau khi viết cả xuôi và ngược. Điều này cho thấy, ta có thể định nghĩa **palindrome?** method **Integer** class như sau: 
```ruby
class Integer

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end

  private

    # Returns content for palindrome testing.
    def processed_content
      self.to_s
    end
end
```
Chú ý rằng, ta đã sử dụng **to_s** method để convert trước một integer thành một string để dùng trong **palindrome?** method. Thực ra, code đối với String và Integer giống hệt nhau, ngoại trừ **self.downcase** và **self.to_s**. <br>
Do việc gọi **to_s** trên string chỉ return về string, và việc gọi **downcase** trên string của số cũng sẽ chỉ return về số cho nên ta có thể kết hợp 2 method này với nhau như sau: `self.to_s.downcase`. → code này sẽ hoạt động trên cả string và integer. <br>
Tiếp theo, ta sẽ chuyển phần xử lý bên trên thành **module** để có thể include - và sử dụng nó trong nhiều class khác nhau: 
```palindrome.rb
module Palindrome

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end

  private

    # Returns content for palindrome testing.
    def processed_content
      self.to_s.downcase
    end
end
```
Sau đó, ta có thể **include** Palindrome module vào cả **String** và **Integer** classes, khi đó nó có thể tự động nhận tất cả các method của module (trong trường hợp này là **palindrome?** và the private **processed_content** method):
```palindrome.rb
module Palindrome

  # Returns true for a palindrome, false otherwise.
  def palindrome?
    processed_content == processed_content.reverse
  end

  private

    # Returns content for palindrome testing.
    def processed_content
      self.to_s.downcase
    end
end

class String
  include Palindrome
end

class Integer
  include Palindrome
end
```
Và ta có thể dùng irb để kiểm tra như sau:
```ruby
>> load "./palindrome.rb"
>> "Racecar".palindrome?
=> true
>> 12321.palindrome?
=> true
```
Tóm lại, Ruby modules là một kỹ thuật cơ bản, phổ biến để loại bỏ sự trùng lặp, và rất nhiều method Ruby quan trọng là thuộc Module chứ không phải class. Ví dụ, các method như map/collect, find_all/select, và reduce/inject— được định nghĩa trong [Enumerable module](https://ruby-doc.org/core-2.5.0/Enumerable.html). Kết quả là, bất kỳ class nào include Enumerable vào, như là Array, Range, hay Hash thì nó sẽ tự động nhận được một lượng lớn các method free.

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*