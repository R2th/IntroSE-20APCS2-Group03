# 1. Giới thiệu
Dentaku là một trình phân tích cú pháp và đánh giá cho ngôn ngữ công thức toán học và logic cho phép liên kết thời gian chạy của các giá trị với các biến được tham chiếu trong các công thức. Nó được dự định để đánh giá một cách an toàn các biểu thức không đáng tin cậy mà không cần mở các lỗ hổng bảo mật.
# 2. Cài đặt
Để sử dụng Dentaku, cần thêm gem Dentaku vào ```Gemfile```
```ruby
#Gemfile
gem "dentaku"
```
Sau đó chạy `bundle install`
# 3. Ví dụ
Lấy một ví dụ đơn giản sử dụng Dentaku:
```ruby
vari = Dentaku::Calculator.new
vari.evaluate("8 * 7")
#=> 56
```
Hoặc có thể tham chiếu 1 biến:
```ruby
vari.evaluate("abc * 7", abc: 8)
#=> 56
```
Mặc định Dentaku sẽ không phân biệt chữ hoa và chữ thường, nếu các biến giống nhau nó sẽ sử dụng biến sau cùng, Ví dụ:
```ruby
vari.evaluate("abc * 7", abc: 8, Abc: 7, aBc: 6)
#=> 42
```
Nếu muốn phân biệt chữ hoa và chữ thường, ez, Ví dụ:
```ruby
vari = Dentaku::Calculator.new(case_sensitive: true)
vari.evaluate("abc * 7", abc: 8, Abc: 7, aBc: 6)
#=> 56
```
Có thể lưu trữ giá trị vào các biến để có thể sử dụng lại:
```ruby
vari.bind(remem: 10)
vari.evaluate("remem + 10")
#=> 20
```
Method ```evaluate``` sẽ trả về ```nil``` nếu có lỗi trong công thức. Để bắn ra exception thì sử dụng ```evaluate!```, Ví dụ:
```ruby
vari.evaluate("10 + x")
#=> nil
vari.evaluate!("10 + x")
#=> Dentaku::UnboundVariableError: Dentaku::UnboundVariableError
```
# 4. Performance 
Nếu hiệu suất là một mối quan tâm, bạn có thể kích hoạt bộ đệm ẩn AST:
```ruby
Dentaku.enable_ast_cache!
```
Dentaku sẽ lưu trữ AST của từng công thức mà nó đánh giá, do đó các đánh giá tiếp theo (ngay cả với các giá trị khác nhau cho các biến) sẽ nhanh hơn nhiều - gần hơn với tốc độ Ruby bản địa gấp 4 lần.
# 5. Built-in operators and functions

Math: `+`,  `-`, `*`,  `/`, `%`, `^`, `|`, `&`.

Tất cả các function từ module Math cảu Ruby, bao gồm: `SIN`, `COS`, `TAN`, etc.

So sánh: `<`, `>`, `<=`, `>=`, `<>`, `!=`, `=`

Logic: `IF`, `AND`, `OR`, `NOT`, `SWITCH`

Numeric: `MIN`, `MAX`, `SUM`, `AVG`, `COUNT`, `ROUND`, `ROUNDDOWN`, `ROUNDUP`

Selections: `CASE`

String: `LEFT`, `RIGHT`, `MID`, `LEN`, `FIND`, `SUBSTITUTE`, `CONCAT`, `CONTAINS`

# 6. Resolving Dependencies
Nếu các công thức của bạn dựa vào nhau, chúng có thể cần được giải quyết theo một thứ tự cụ thể. Ví dụ: Thu nhập hàng tháng `monthly_income` của bạn là 50. Để tính thuế thu nhập `income_taxes` thì cẩn phải tính thu nhập hàng năm trước `annual_income`, theo dõi đoạn code dưới:
```ruby
calc = Dentaku::Calculator.new
calc.bind(monthly_income: 50)
need_to_compute = {
  income_taxes: "annual_income / 5",
  annual_income: "monthly_income * 10"
}
```
Để Dentalu biết đc thứ tự thực hiện các phép tính trên, ta chỉ cần:
```ruby
calc.solve!(need_to_compute)
#=> {annual_income: 500, income_taxes: 100}
```
# 7. Inline Comments 
Bạn có thể xem ví dụ sau:
```ruby
vari.evaluate("abc * 7 /* This is a comment */", abc: 8)
#=> 7
```
Comments có thể là một dòng hoặc nhiều dòng:
```ruby
/*
 * This is a multi-line comment
 */

/*
 This is another type of multi-line comment
 */
```
# 8. External Functions
Bạn có thể tự tạo cho mình 1 function theo ý bạn, Ví dụ:
```ruby
var = Dentaku::Calculator.new
var.add_function(:pow, :numeric, ->(a, b) { a ** b })
var.evaluate("POW(3,2)")
#=> 9
```
# 9. Function Aliases
Mỗi chức năng có thể được đặt bí danh bởi các từ đồng nghĩa. Ví dụ, nó có thể hữu ích nếu ứng dụng của bạn là đa ngôn ngữ.
```ruby
Dentaku.aliases = {
  round: ['rrrrround!', 'округлить']
}

Dentaku('rrrrround!(8.2) + округлить(8.4)') # the same as round(8.2) + round(8.4)
# 16
```
Bạn cũng có thể thêm chúng khi khởi tạo `Dentaku::Calculator`, Ví dụ:
```ruby
aliases = {
  round: ['rrrrround!', 'округлить']
}
var = Dentaku::Calculator.new(aliases: aliases)
var.evaluate('rrrrround!(8.2) + округлить(8.4)')
# 16
```
# End
Cảm ơn các bạn đã xem bài viết, hãy để lại comment của bạn cho bài viết của mình, nếu thấy hay hãy upvote, share để được đẹp trai và xinh gái hơn.