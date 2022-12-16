### Code thối là cái gì vậy ?
![](https://images.viblo.asia/72eea62d-888f-4820-9a15-b80b79ddb0cb.jpg)
Code Smells (Mã xấu, hay "Code Thối" nếu thích) là từ được dùng để chỉ phần code mà ta cảm thấy không hề  ổn chút nào. Đây thường là đoạn code vi phạm những quy tắc trong lập trình. Giả sử bạn đang đọc một bài viết và bắt gặp một lỗi chính tả thì ngay lập tức, bạn sẽ có cảm giác ngờ ngợ, khó chịu. Khi xem code, ta cũng có những phản ứng tương tự. Lúc đó, ta sẽ ngửi thấy mùi hôi thối của đoạn mã xấu.

Code Smells có thể là nguyên nhân dẫn đến nhưng vấn đề hay bug sâu hơn, khó tìm hơn, và  với việc loại bỏ chúng thì ta có thể biết code của chúng ta sạch sẽ và tinh tế hơn. Code Smells thường gặp nhất là class dài loằng ngoằng, method quá to, code ko dùng đến hay lặp code. Những vấn đề này có thể sẽ không sinh ra lỗi ngay lập tức nhưng chúng có thể khiến chúng ta khó maintain cũng như có thể gây ra cả lỗi về sau. Sau đây mình xin đưa ra một vài đoạn code thối, bao gồm nhưng đoạn code thừa thãi, điều kiện quá dài, class có thuộc tính nhưng không có phương thức và tên biến không hợp lý.
### 1. Code thừa: `if ... return true, else return false`
Đoạn pattern `if ... return true, else return false` xuất hiện rất rất nhiều lần trong code của chúng ta. Trả về `true` hoặc `false` từ câu `if` là một việc khá thừa thãi (xem ví dụ bên dưới). Cách viết code như thế này là ví dụ điển hình cho việc code thừa và điều này sẽ dẫn đến việc project của chúng ta bị phát tướng và trở nên khó đọc hơn. Mình sẽ đưa ra hai cách viết code cho pattern này, một đoạn vừa dài vừa thừa và một đoạn ngắn gọn, tinh tế (:D). Đây là một hàm trong class `Animal` để kiểm tra xem nó có phải là con mèo hay không. 
```
class Animal
	attr_reader :type
	
	def initialize(type)
		@type = type
	end

	def is_a_cat?
		if type == "cat"
			return true
		else
			return false
		end
	end
end
```

Các bạn có ngửi thấy mùi thum thủm không? ĐIều kiện `type == "cat"` vốn đã trả về kiểu `boolean` rồi nên chúng ta không cần phải thêm nó vào câu điều kiện `if` :

```
class Animal
	attr_reader :type
	
	def initialize(type)
		@type = type
	end

	def is_a_cat?(animal)
		type == "cat"
	end
end
```

Yeah, thơm hơn rồi đó. Các bạn khi dùng pattern `if ... return true, else return false` chỉ cần nhớ rằng loại bỏ code thừa thì chúng ta sẽ có một đoạn code sạch đẹp và dễ đọc hơn nhiều. Tiếp tục thôi nào.

### 2. Câu điều kiện quá dàiiiiiiiiiiiiii
Nhiều lúc chúng ta sẽ phải check xem biến của chúng ta có bằng với một trong rất nhiều options khác nhau, có khá nhiều cách để làm việc này, nhưng một số cách lại "thối" hơn nhiều so với các cách còn lại. 
```
puts "What is your major?"
major = gets.chomp

case major
when "Biology"
	puts "Mmm the study of life itself!"
when "Computer Science"
	puts "I'm a computer!"
when "English"
	puts "No way! What's your favorite book?"
when "Math"
	puts "Sweet! I'm great with numbers!"
else
	puts "That's a cool major!"
end
```
Cách này vẫn còn khá dài và khó đọc, thử cách này xem:
```
puts "What is your major?"
major = gets.chomp

# Set default response
major_responses = Hash.new("That's a cool major!")

# Add other responses
major_responses["Biology"] = "Mmm the study of life itself!"
major_responses["Computer Science"] = "I'm a computer!"
major_responses["English"] = "No way! What's your favorite book?"
major_responses["Math"] = "Sweet! I'm great with numbers!"

puts major_responses[major]
```
Bằng cách map `major` với `response`, chúng ta đã có 1 hash các `major` với `response` tương ứng. Chúng ta cũng tạo ra 1 giá trị mặc định để trả về khi môn học ta nhập vào không tồn tại trong hash `major_responses`. Sau khi tạo mapper cho `major/response` chúng ta chỉ cần 1 dòng code là có thể trả về đc kết quả tương ứng. Hãy nhớ là đây chỉ là 1 cách để tối ưu code,**không phải** là cách hợp lý và hiệu quả nhất.

### 3. Class có thuộc tính nhưng không có method
Như chúng ta đã biết, Class dùng để tổ chức lại các object có chung tính chất và biểu hiện. Nhưng sẽ ra sao nên chúng ta có 1 class không có method hay action nào ?
```
class Person
	attr_reader: :height, :hair_color, :dominant_hand, :iq, :race
	def initialize(height, hair_color, dominant_hand, iq, race)
		@height = height
		@hair_color = hair_color
		@dominant_hand = dominant_hand
		@iq = iq
		@race = race
	end
end
```
Như ta thấy, 1 `Person` có nhiều thuộc tính, nhưng trong ví dụ trên, 1 `Person` không hề có action nào hết. Vì thế mà, 1 class ko phải là cách hay nhất để thể hiện cho object `Person` này, cách hay và phù hợp hơn là dùng `struct`. `struct` được dùng để tạo ra các class đơn giản và được khởi tạo một cách chính xác hơn. Chúng ta có thể tạo 1 `struct` như sau: 
```
Struct.new("Person", :height, :hair_color, :dominant_hand, :iq, :race)
```
Hoặc, 
```
Person = Struct.new(:height, :hair_color, :dominant_hand, :iq, :race)
```
Và chúng ta tạo 1 object `Person` như sau:
```
nam = Person.new(170, "black", :right, 140, "asian")
```
Và thuộc tính của `nam` có thể được truy cập giống như với 1 class
```
nam.height  # 170
nam.hair_color # "black"
nam.dominant_hand # :right
nam.iq # 140
nam.race # "asian"
```
Từ nay chúng ta có thể "khử mùi" code của ta bằng cách sử dụng `struct` khi chúng có một object hoàn toàn có thể tự định nghĩa nó chỉ với các thuộc tính mà không có action hay method nào. Note thêm là `struct` khá hữu dụng cho việc xử lý các note-based data structure như `list`, `tree` hay `graph`.

### 4. Đặt tên biến
Hãy đặt tên biến của bạn một các phù hợp, chúng ta đã nghe thấy vấn đề này rất rất nhiều lần rồi. Trong khi `x`, `y`, hay `a` , `b` , `c` rất tiện và đỡ mất công nghĩ tên nhưng để sau này đọc lại code của bạn thì đúng là ác mộng, khiến cho việc bảo trì hay maintain project khó khăn hơn nhiều.

```
A = :cat
B = :dog
C = :bird

class Thing
	attr_reader :x
	
	def initialize(x)
		@x = x
	end

	def lightbulb
		if x == A || x == B || x == C
			puts "Animal !!"
		else
			puts "Nah !!"
		end
	end
end
```
VÍ dụ bên trên là biểu hiện rõ nhât của việc đặt tên biến khó hiểu. x là gì ? A, B, C là cái gì nhỉ, ai mà biết được. Cho nên hãy rõ ràng trong việc đặt tên biến, phương thức hay object, ... Điều này giúp đồng nghiệp của bạn có thể hiểu được đoạn code đó cũng như dễ cho chúng ta quay về debug hơn. 
```
class Thing
		attr_reader :type
	
		def initialize(type)
			@type = type
		end

	def is_an_animal?
		if type == :cat || type == :dog || type == :bird
			puts "Animal !!"
		else
			puts "Nah !!"
		end
	end
end
```

### 5. Trùng lặp code
```
def post_to_site(data)
  url = build_url(data)
  response = RestClient.post(url)
end

def get_from_site(data)
  url = build_url(data)
  response = RestClient.get(url)
end

def delete_from_site(data)
  url = build_url(data)
  response = RestClient.delete(url)
end
```
Bạn có thể sửa lại đoạn code này bằng một câu lệnh meta-programming đơn giản:
```
def  response_from_site(data, method = :get)
  url = build_url(data)
  response = RestClient.public_send(method, url)
end
```
Đó, sạch sẽ - thơm tho - dễ đọc - dễ hiểu (:D)

### Túm lại
Qua bài viết này chúng ta đã có thể hiểu đc một số kiểu "thối" của code Ruby và cách "khử mùi" cho chúng. Chỉ cần phân tích và hiểu được cơ bản của đoạn code để chúng ta có thể sửa chúng và biến code của chúng ta rõ ràng hơn và một phần cũng cải thiện đc phong cách code của chúng ta.

*nguồn: https://www.codementor.io/ruby-on-rails/tutorial/check-my-code-tips-to-keep-ruby-codes-smell-free*