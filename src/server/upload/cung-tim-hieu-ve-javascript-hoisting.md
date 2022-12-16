### Hoisting là gì 
**Hoisting** là hành vi mặc định của JS, xác định tất cả các khai báo ở đầu phạm vi trước khi thực thi mã.

Khai báo biến và khởi tạo xảy ra theo trình tự sau:

```
// Variable lifecycle
let x;                 // Declaration
x = “hoisting”;        // Assignment
console.log(x);        // Usage
```

Tuy nhiên, vì JavaScript cho phép cả khai báo và khởi tạo biến đồng thời, đây là cú pháp được sử dụng nhiều nhất:

```
let x = “hoisting”;
```

Quan trọng nhất, bạn phải luôn nhớ rằng JavaScript khai báo biến đầu tiên trong background. Sau đó, khởi tạo chúng. Vì vậy, ta biết rằng việc xử lý các khai báo biến diễn ra trước khi thực thi bất kỳ mã nào. Tuy nhiên, cho đến khi việc thực thi mã gán chúng diễn ra, các biến không được khai báo không tồn tại trong JavaScript.

Do đó, khi gán được thực thi, một giá trị được gán cho một biến không được khai báo hoàn toàn tạo ra nó như một biến toàn cục. Điều này xác định rằng tất cả các biến không được khai báo là các biến toàn cục.

```
// hoisting
function Hoisting(){
  x = 100;
  let y = 200;
}
Hoisting();
console.log(x); // 100
console.log(y); // Reference Error: y is not defined
```

### Hosting in ES5

Hoisting với var có phần khác so với let / const. Ví dụ với var để xem cách hoạt động:

```
console.log(car);    // undefined
var car = ‘Lamborgini’;
```


```
console.log(num);// ReferencError: num is not defined
let num = 003;  
```

### Kết luận 
Với lượng kiến thức ít ỏi của mình, hy vọng sẽ giúp mọi người rõ hơn trong việc lập trình. Nếu có gì sai mong mọi người góp ý.

Xin cảm ơn :D