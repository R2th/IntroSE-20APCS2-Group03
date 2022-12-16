# I. Toán tử "==" và "==="
### 1. Toán tử "=="
 Trong ruby toàn tử "==" trả về giá trị `true` nếu hai đối tượng được so sánh có cùng giá trị và có cùng một kiểu dữ liệu. Đây là cách so sánh phổ biến và cơ bản nhất trong hầu hết các ngôn ngữ lập trình.
### 2. Toán tử "==="
 Toán tử === được hiểu đơn giản là so sánh theo kiểu trường hợp. Các điều kiện của case sẽ đc implement với mỗi class tương ứng
 Ví dụ: 
 `(1..10) === 5  # => true`  
 `(1..10) === -2  # => false`\
 `Integer === 1  # => true`\
 `Integer === "one" # => false`\
 `/ney/ === "money" # => true`\
 `/ney/ === "funny" # => false`\
 `"test" === "test" # => true`\
 `"test" == "test" # => true`

 Vậy "===" và "==" có gì khác nhau?
 
 Xét ví dụ:
 
 `Integer == 1 # => false`\
 `Integer === 1 # => true`
 
 Như vậy `===` cũng đơn thuần là so sánh giá trị chứ không phải là so sánh object sự khác biệt là nó dùng case để so sánh và `===` còn được gọi là Case equality.
# II. eql? và equal?
### 1. equal?
 equal? sẽ trả về kết quả là `true` chỉ khi nó (đối tượng bị gọi bởi equal?) và tham số (đối tượng được gọi bởi equal?) là cùng một đối tượng (giống nhau hoàn toàn).
 Ví dụ: 
 
 `a = "a"`\
 `b = a`\
 `a.equal? b # => true` 
 
### 2. eql? 
 eql? sẽ trả về kết quả là `true` khi cả hai đối tượng bị gọi bởi eql? và đối tượng được gọi bởi eql? có gía trị giống nhau.

Ví dụ:
`1 == 1.0    # => true`\
`1.eql? 1.0  # => false`\
`"a".eql? "a" # => true`\ 

Tổng kết lại ta thấy: 

`a = "a"`\
`b = "a"`\
`c = a`\
`a == b # => true`\
`a.eql? b # => true`\
`a.eql? c # => true`\
`a.equal? b # => false`
`a.equal? c # => true`

Cám ơn mọi người đã theo dõi bài viết.