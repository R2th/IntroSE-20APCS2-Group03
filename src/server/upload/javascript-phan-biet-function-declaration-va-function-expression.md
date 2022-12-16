```
// Function Declaration
function test(val){
    return val=== true;
}
 
// Function Expression
var isTest = function(val){
    return val === true;
}
```
Câu hỏi đặt ra là: chúng khác nhau chỗ nào?

- Sự khác nhau đó là: function declaration có thể được lôi cổ gọi dùng bất cứ khi nào, bất cứ chỗ nào bởi bộ phân tích (interpreter) của trình duyệt. JavaScript biết sự có mặt của nó và parse nó trước khi chương trình JavaScript của chúng ta thực thi. Nói một cách khác (trừu tượng hơn) đó là JavaScript đưa các function loại này lên trên top của scope hiện tại. 

```
myFunc();
function myFunc (){
    alert(“Hello Góc Kinh Nghiệm”);
}
```

Ở ví dụ trên chúng ta thấy hàm test() được gọi trước khi nó được khai báo. Tuy nhiên, chúng ta cũng có thể viết dạng như sau cũng được:

```
function myFunc (){
    alert(“Hello Góc Kinh Nghiệm”);
}
myFunc();
```

Còn function expression thì sao? Nó không được JavaScript đánh giá cho đến khi nó được gán vào biến. Hơi trừu tượng một tí, chúng ta làm cái ví dụ cho dễ hiểu

```
// Báo lỗi nè!
expression();
var expression = function (){
    alert(“Gọi tui là lỗi nha mấy chú”);
}
```

Nếu các bạn chạy đoạn mã trên thì sẽ báo lỗi vì expression được gọi trước khi nó được khai báo. Để chạy được, chúng ta phải viết lại như sau:

```
var expression = function (){
    alert(“Gọi tui là lỗi nha mấy chú”);
}
expression();
```

=> function declaration thì có thể gọi trước khi khai báo hoặc sau khi khai báo đều được, còn function expression thì phải có trình tự.
# Function Declaration
- khi bạn tạo ra một function có tên, đó gọi là function declaration

```
function handleClick() {
        console.log("clicked")
    }
```

# Function Expression

```
const handleClick = function() {
        console.log("clicked")
    }
```

- Hoặc sử dụng cú pháp es6 tạo ra một function anonymous (khai báo một function nhưng không dùng từ khóa function) cũng là function expression.

```
 const handleClick = () => {
        console.log('clicked')
    }
```

- Bản chất:

    + Còn về bản chất function declaration và function expression khác nhau ở vùng scope ảnh hưởng. Với function declaration, tên của function sẽ hiện hữu ở scope của nó và scope cha của nó (Nơi nó được tạo ra), còn với function expression, tên của function (Nếu có) sẽ chỉ hiện hưũ ở scope của nó, và nó sẽ không tồn tại ngoài scope cha. Một điều quan trọng nữa, function expression sẽ không được hoisting như function bình thường.

```
// Chạy ngon
console.log(foo());
function foo() {};

// Lỗi
console.log(foo());
var a = function foo() {};
```

# Hoisting
- Khái niệm hoisting biểu thị function hay biến có thể được "gọi" ngay từ dòng code đầu tiên, trước khi chúng được khai báo.
- Function Declaration có thuộc tính hoisting còn Function Expression thì không, điều này dễ dàng được biểu thị qua hai ví dụ sau:
Đoạn code dưới đây sẽ thực thi bình thường khi dùng Function Declaration

```
handleStuff()

function handleStuff() {
    // do stuff
}
```

Đối với Function Expression thì sẽ báo lỗi

```
handleStuff()

const handleStuff = function() {
    // do stuff
}
```

# Hoàn cảnh sử dụng
- Qua hai phần trên, ta có thể thấy Function Declaration và Function Expression chủ yếu khác nhau bởi thuộc tính Hoisting và Function Declartion có vẻ như mạnh mẽ hơn vì phạm vi sử dụng, tuy nhiên trong thực tế chúng ta chỉ nên cân nhắc scope để sử dụng đúng Function Declaration, nhằm tránh việc có quá nhiều function không cần thiết trong global scope.
# Tổng kết
- Chúng ta sử dụng function declartion khi muốn tạo ra function để sử dụng ở bất cứ đâu trong toàn bộ mã code và sử dụng function expression khi function bị giới hạn vùng sử dụng, giúp global scope nhẹ và sạch hơn.