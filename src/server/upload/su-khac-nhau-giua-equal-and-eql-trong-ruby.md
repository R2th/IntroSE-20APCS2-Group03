Trong những năm dài theo đuổi lập trình từ chương trình Java trong trường học ,tới PHP và bây giờ là Ruby, tôi gần như đã vượt qua các bài thực hành trong Exercism.io và trong khi mọi người “soi xét” những dòng code của tôi, họ đã nói rằng có lẽ tôi không cần đến toán tử ===.  Mã code của tôi để đảm bảo 2 biến cùng loại và giá trị. Nó giống như sau:

``` ruby
# Bad - code bình thường variableA === variableB
```

### **Good - Code mới**
``` ruby
variableA == variableB 
```

Những người review đã cho rằng tôi chỉ cần dùng ==. Nhưng kể từ khi tiếp xúc với ngôn ngữ của PHP,  tôi đã nhầm lẫn vì sao tôi không nên sử dụng ===. Trong PHP, giá trị hai dấu bằng được dùng để kiểm tra value và không để ý đến loại. Trong Ruby, đó là một việc hoàn toàn khác. 

Tôi phát hiện ra thực tế rằng tất cả mọi thứ trong Ruby là một đối tượng và các đối tượng khác nhau có thể có định nghĩa khác nhau về sự bằng nhau. Class object của Ruby có toán tử ===, .equal ?, và .eql? là mặc định. Nhiều lần các lớp Ruby ghi đè lên == nhưng .equal? thì không bao giờ.

### **Định nghĩa ‘==’**

Ở cấp độ đối tượng Ruby, == chỉ trả về true nếu hai thực thể so sánh là object tương tự nhau. Bạn sẽ muốn sử dụng phương pháp này nếu object của bạn implement.

Nếu bạn đang tìm kiếm sự bằng nhau, hãy xem xét sử dụng, .eql ?. Bạn nên nhìn vào đối tượng Ruby cụ thể của bạn trong câu hỏi để xem cách chúng triển khai ==.

### **Định nghĩa ‘===’**

Toán tử === trong Ruby thường được gọi là case equality operator, được hiểu đơn giản là so sánh theo kiểu trường hợp. Các điều kiện của case sẽ đc implement với mỗi class tương ứng.

```ruby
(1..5) === 3 # => true
(1..5) === 6 # => false

Integer === 42 # => true 
Integer === ‘fourtytwo’ # => false 
```

### **Định nghĩa ‘.eql?’**

Phương thức .eql? trong Ruby thường được gọi là  ‘Generic Equality’. eql? sẽ trả về kết quả là true khi cả hai đối tượng bị gọi bởi eql? và đối tượng được gọi bởi eql? có gía trị giống nhau.

```ruby
1 == 1.0 #=> true 
1.eql? 1.0 #=> false
```

### **Định nghĩa ‘.equal?’**

equal? sẽ trả về kết quả là true chỉ khi nó (đối tượng bị gọi bởi equal?) và tham số (đối tượng được gọi bởi equal?) là cùng một đối tượng (giống nhau hoàn toàn).

```ruby
a = “a” # => “a” 
other = a.dup # => “a”
a == other # => true 
a === other # => true 
a.eql? other # => true 
a.equal? other # => false
```

_Tài liệu dịch_: http://www.rian.me/2013/10/15/what-is-the-difference-between-equals-equals-equals-and-equals-equals-in-ruby/