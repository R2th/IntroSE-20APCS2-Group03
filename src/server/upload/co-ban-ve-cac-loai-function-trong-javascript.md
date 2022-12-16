### 1. Function là gì?
+ Function (hàm, chức năng), gọi chung là subprogram (chương trình con) có thể được gọi ở bên ngoài hoặc bên trong chính nó.
+ Nó bao gồm tập hợp các câu lệnh gọi là function body. Các giá trị có thể truyền đến một hàm, và một hàm có thể trả về giá trị. Bây giờ, với các ứng dụng hiện đại, các function có thể là một chương trình hoàn chỉnh, chứ không phải là k
### 2. Function không có tham số và không trả về bất cứ giá trị gì.  
```
function sayHello () {
  console.log("Hello !");
}
sayHello();
```
+ Function ở trên không có một tham số nào, và không trả về một giá tri.
### 
### 3. Arrow function
```
const sayHello = () => {
  console.log("Hello !");
}
sayHello();
```
+ Một arrow function có cú pháp ngắn hơn cú pháp function bình thường, nó có thể không có đối số, super hoặc new.target của nó.
Những function này phù hợp nhất cho các non-method function và chúng không thể sử dụng như các constructor. Có điều gì khi tôi nói, function ở trên không trả về giá trị gì?
+ Nếu tôi cố gắng để lưu trữ kết quả của function được gọi ở trên vào một biến  nó sẽ nhận giá trị "undefined".
### 4. Anonymous functions

```
var showDomain = function()
{
    alert('Học Javascript tại Freetuts.net');
};
showDomain();
```
+ Anonymous functions hay còn gọi là hàm ẩn danh, là một hàm được sinh ra đúng vào thời điểm chạy của chương trình. Thông thường khi bạn khai báo một hàm thì trình biên dịch sẽ lưu lại trong bộ nhớ nên bạn có thể gọi ở trên hay dưới vị trí khai báo hàm đều được, nhưng với anonymous functions thì nó sẽ được sinh ra khi trình biên dịch xử lý tới vị trí của nó.
+ Anonymous functions được khai báo bằng cách sử dụng toán tử thay vì sử dụng cú pháp định nghĩa hàm thông thường. 
### 5. Function có một tham số và trả về một giá trị cụ thể

```
function square(number) {
 return number * number;
}
console.log(square(2));
# 4
```
### 6. Function có thể có nhiều đối số (thực tế có thể có 'n' đối số)
+ Làm thế nào để viết một function có thể truyền vào 'n' đối số? 
+ Viết một function có tên là sum() có thể truyền 'n' đối số và trả về tổng của các đối đã truyền đó
```
####### Cách 1

const sum = function () {
  let result = 0;
  for(let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

console.log(sum(1,2));
console.log(sum(1,2,3,4));
console.log(sum(1,3,5,7,9));
```
+ Nó hoạt động như thế nào?
+ Nếu bạn nhìn vào function sum, nó không cần một tham số rõ ràng nào. Bây giờ, hãy tưởng tượng bạn đang thực hiện function sum() này một cách rõ ràng, điều gì là khó khăn để xác định các tham số trước đó. Nếu bạn không biết hãy nhìn các kết quả khi gọi function sum().
+ Nếu truyền vào 1 tham số tương ứng như sum(1) nó sẽ trả về 1.
+ Nếu truyền vào 2 tham số tương ứng như sum(1,2) nó sẽ trả về 3.
+ Nếu truyền vào 100 tham số tương ứng như sum(1,2,3,4..,99,100) nó sẽ trả về 5050.
+ Vì vậy, JavaScript đã cung cấp một object bí mật là "arguments", nó chứa toàn bộ tham số và có thể sử dụng trong bất kỳ function nào.
+ Lưu ý, object "arguments" không phải là một Array mà là một Array like object(kay:  "value"). Có nghĩa là bạn không thể gọi bất kỳ phương thức áp dụng cho mảng trên đối tượng arguments (Nếu bạn tò mò, hãy nghiên cứu thêm về vấn đề này).
```
########### Cách 2

const sum = function (...args) {
  let result = 0;
  for(let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
```
+ ...args là 1  "REST parameters"
+ ...args lấy mọi tham số truyền vào cho function và làm cho nó tồn tại dưới một mảng. Hãy nhớ rằng arguments là một đối tượng (array like object) còn ...args là một mảng.
### 7. Function lấy function như một tham số(callback funtion)

```
function dispatch (fn) {
  fn();
}

//Cách 1: khai báo một function để làm tham số.
var fn = () => { console.log( "Hello !"); }
// gọi function dispatch()
dispatch(fn);  // Outputs "Hello !"

//Cách 2:  Khai báo một anonymous function bên trong
dispatch (function () {
  console.log("Hello !");
});

//METHOD 3:  Định nghĩa một arrow function bên trong
dispatch (() => { console.log ("Hello !") });
```
+ Callback phải là một function Callback là một function nên bạn nhất định phải truyền vào là một function, nếu bạn truyền một type khác thì bạn sẽ nhận được error notice: "Callback is function" trong console.
+ Từ khóa this trong callback Như đã nói ở trên thì callback là một hàm bình thường nên khi sử dụng từ khóa this trong hàm thì nó sẽ hiểu this lúc này chính là đối tượng Window, nếu bạn dùng debuger trong hàm callback rồi vào console gõ this, thì sẽ được Window {external: Object, chrome: Object, result: undefined,...... Vì vậy cho dù bạn định nghĩa hàm callback nằm trong một object thì không thể truy cập đến dữ liệu của object thông qua từ khóa this.
### 8. Kết luận
+ Bài viết này mình đã trình bày cơ bản về các loại Function() trong JavasCript hi vọng sẽ giúp được bạn phần nào nắm được các kiểu Function() được sử dụng khá nhiều trong lập trình Js nói chung.  Cảm ơn các bạn đã theo dõi.