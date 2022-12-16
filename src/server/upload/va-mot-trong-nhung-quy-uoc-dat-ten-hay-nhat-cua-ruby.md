`!`và `?` mà chúng ta thấy ở cuối phương thức là quy ước của Ruby, của Rails hay cái nào khác? 

Chúng ta hãy cùng tìm đáp án của câu hỏi trong bài chia sẻ nhé.

`It’s all about conventions, in the end (Các quy ước ở vị trí cuối cùng)`
                                                                                                                            
Trước hết, từ quan điểm thực hiện, đặt tên phương thức với `!` hoặc` ?` cuối cùng không có tác dụng gì trong chức năng của phương thức.  Vì vậy, phương thức có tên kết thúc bằng các dấu này cũng bình thường như mọi phương thức khác. Bạn không bị ràng buộc kết quả trả về có định dạng ra sao hay giá trị cụ thể như thế nào.

`This convention is all a matter of code readability (Quy ước là tất cả các vấn đề về khả năng đọc code)`
                                                                                                                            
Là một ngôn ngữ lập trình, một trong những tính năng chính của Ruby là có cú pháp ngắn gọn, dễ đọc và dễ viết. Về mặt đọc code của Ruby nên giống như việc đọc một văn bản tiếng Anh. Những quy ước đặt tên đã đưa ra để giúp đạt được mục tiêu đó.

## PREDICATE METHOD

Hãy xem xét về câu hỏi này: "Can you buy some drinks?"

- Câu hỏi nhận câu trả lời là `yes` hoặc `no`.
- Không gây ra bất kỳ sự thay đổi nào trên đối tượng đang được hỏi.

Và như vậy phương pháp của chúng ta có hậu tố `?`.

`?` nói với ta, khi có người đọc mã code của bạn, rằng phương thức này (còn được gọi là phương thức `predicate`) sẽ trả về giá trị boolean và nó sẽ không mang lại [tác dụng phụ](https://dzone.com/articles/side-effects-1) hoặc thay đổi trạng thái của đối tượng. Chúng ta có một số ví dụ điển hình trong Ruby như:

```
"".empty?     # => true
nil.nil?      # => true
[1].nil?      # => false
```

Với ý nghĩ đó, bạn có thể thực hiện các tình huống như sau:

```
class Country
  attr_reader :legal_age
  
  def initialize(legal_age:)
    @legal_age = legal_age
  end
end

class Person
  attr_reader :age, :country

  def initialize(age:, country:)
    @age = age
    @country = country
  end

  def can_buy_drinks?
     age >= country.legal_age
  end
end

brasil = Country.new legal_age: 18

tom = Person.new(age: 17, country: brasil)

tom.can_buy_drinks? # => false
```

## BANG METHOD

Dấu `!` thì phức tạp hơn một chút.

Cũng được gọi là "`bang` method", mặc dù rất phổ biến nhưng có rất nhiều sự đồng thuận về việc sử dụng nó.

Khi đó, tôi sẽ liệt kê một vài tình huống để bạn có thể sử dụng `bang` vào một trong những phương pháp của bạn. Vì vậy, nếu phương pháp của bạn:

- Thực hiện một hành động phá hoại (giống như xóa một vài thứ gì đó từ database);

- Có tác dụng: ghi vào tệp, gọi đầu vào của người dùng, sửa đổi trạng thái không cục bộ...

- Sửa đổi đối tượng ban đầu đang được gọi;

- Có khả năng để đưa ra một ngoại lệ;

Hãy sử dụng `bang!`.

Nhưng mẹo quan trọng nhất là cái này

 ```
If you have a method that is marked with a bang at its end, then a version without it should also exist. (Nếu bạn có một phương thức được đánh dấu bằng bang ở cuối, thì phiên bản không có bang của nó cũng sẽ tồn tại).
```

Lấy đoạn mã sau đây để làm ví dụ:

```
my_hash = {}         # => {}

my_hash.merge id: 1  # => {id: 1}
my_hash              # => {} - my_hash không có sự thay đổi

my_hash.merge! id: 1 # => {id: 1}
my_hash              # => {id: 1} - my_hash đã được thay đổi
```

Phương thức `merged` trả về một phiên bản băm mới hợp nhất nhưng giữ nguyên đối tượng ban đầu (giá trị trả về và đối tượng ban đầu là các đối tượng khác nhau), trong khi `merged!` sẽ thay đổi giá trị trên chính nó.

Người ta thậm chí có thể nói "`bang`" là một "phiên bản overheated" của phương thức, giống như cách nói "I AM DANGEROUS" hay "I CAN RAISE AN EXCEPTION" hoặc "I'LL FLIP THIS TABLE".

Một lời khuyên cho các bạn khi sử dụng `bang`:

`When working on a project, try to keep up with the project’s convention. There is a variety of situations where you could use this to write your methods, so it’s very important to keep your codebase consistent. Keep that in mind ʕᵔᴥᵔʔ (Khi làm việc trong dự án, hãy cố gắng tuân thủ theo quy ước của dự án. Có nhiều tình huống mà bạn có thể sử dụng điều này để viết các phương thức của mình, do đó, đây là điều rất quan trọng để giữ cho đoạn mã của bạn có sự nhất quán. Hãy ghi nhớ điều này nhé.)`

### A special case (Trường hợp đặt biệt)

Hãy nhớ rằng các phương thức predicate KHÔNG nên thay đổi trạng thái global của đối tượng hoặc mang lại hiệu ứng phụ. Trong thư viện tiêu chuẩn của Ruby, có một lớp có tên là SET: "[It] is a hybrid of Array’s intuitive inter-operation facilities and Hash’s fast lookup (Nó là sự kết hợp của các cơ sở tương tác trực quan trên Array và tra cứu nhanh trên Hash)"

Trong bất kỳ trường hợp nào của SET, bạn sẽ tìm thấy hai phương thức: `add` và `add?`. Hãy cùng kiểm tra nó qua ví dụ dưới đây nha:

```
require 'set'
set = Set.new  # => <Set: {}>
set.add 1      # => <Set: {1}>
set.add 2      # => <Set: {1, 2}>
set            # => <Set: {1, 2}>
set.add 1      # => <Set: {1, 2}>
set            # => <Set: {1, 2}>

# looks okay, right? now check this out:

set = Set.new  # => <Set: {}>     
set.add? 1     # => <Set: {1}>   
set.add? 2     # => <Set: {1, 2}> 
set            # => <Set: {1, 2}>
set.add? 1     # => nil         
set            # => <Set: {1, 2}>
```

Trên thực tế, nó cũng khá tuyệt vời về khả năng sử dụng, mặc dù có một chút không phù hợp với quy ước.

Hãy xem cách mà phương thức `add?` được sử dụng nhé:

```
ingredients = Set.new([
  :avocado,
  :garlic,
  :onion,
  :lemon,
  :black_pepper,
  :coriander
]) #<Set: {:avocado, :garlic, :onion, :lemon, :black_pepper, :coriander}>

if ingredients.add?(:tomato)
  puts 'Oh, I forgot to add the tomatoes!'
end

ingredients # => #<Set: {:avocado, :garlic, :onion, :lemon, :black_pepper, :coriander, :tomato}>
```

Vấn đề `Set` là cấu trúc dữ liệu cho các `key` duy nhất! Vì vậy, thay vì phải hỏi liệu bạn có thể thêm một item và sau đó thêm nó, bạn có thể thực hiện hai thao tác này trong một thao tác và tránh phải xử lý thêm điều kiện.

## Tổng kết

Mặc dù các quy ước này có vẻ không liên quan, nhưng chúng là một kỹ thuật rất hay giúp đọc code nhanh hơn và hiểu ý nghĩa của nó dễ dàng hơn, tăng khả năng maintain.

Nguồn: [https://blog.codeminer42.com/and-understanding-one-of-rubys-coolest-naming-conventions-5a9300b75605](https://blog.codeminer42.com/and-understanding-one-of-rubys-coolest-naming-conventions-5a9300b75605)