Từ ES6 (2015) để khắc phục những nhược điểm của `var` chúng ta đã có thêm `let` và `const`.  Với `let` `const` giờ đây các lập trình viên có thêm tùy chọn hợp lý hơn so với việc phải dùng `var` trong tất cả các trường hợp. Từ đây chúng ta thường nói về sự khác nhau về scope của `var`, `let` và `const`. Bài viết hôm nay chúng ta sẽ nhìn xem chúng thực sự khác nhau như thế nào nhé!

### 1. var
`var` là function scope. Một biến thì luôn có phạm vi truy cập của nó. Ở đây `var` có phạm vi ảnh hưởng trong một function, ra khỏi function thì `var` sẽ không tồn tại nữa. 
Vậy, vấn đề của `var` ở đây là gì mà chúng ta lại có thêm `let` và `const`? Một trong những điều đặc biệt của `var` là có thể ghi đè trong cùng phạm vi function scope mà không gặp bất kì một lỗi nào. Tiếp là dù khai báo ở đâu trong function scope thì khi biên dịch biến `var` cũng được đưa lên đầu function scope và được định nghĩa hay khởi tạo với giá trị không xác định hay còn gọi là `hoisting`.
```
function nodeSimplified(){
  var a =10;
  console.log(a);  // output 10
  if(true){
   var a=20;
   console.log(a); // output 20
  }
  console.log(a);  // output 20
}
```
Để khắc phục nhược điểm của `var` thì từ ES6 chúng ta có thêm `let` và `const`
### 2. let
`let` là block scope. Block là code trong dấu ngoặc nhọn {}. Do đó khi thoát khỏi block thì biến được khai báo bằng `let` sẽ không tồn tại nữa.
```
function nodeSimplified(){
  let a =10;
  console.log(a);  // output 10
  if(true){
   let a=20;
   console.log(a); // output 20
  }
  console.log(a);  // output 10
}
```

Giá trị của `let` trong cùng một block code thì không thể ghi đè.
```
function nodeSimplified(){
  let a =10;
  let a =20; //throws syntax error
  console.log(a); 
}
```
Còn với `var` thì đè bao nhiêu cũng được hết.
```

function nodeSimplified(){ 
  var a =10;   
  var a =20;   
  var a =30;
  console.log(a);  //output 30 
}
```

Chúng ta còn có thể sử dụng `let` một cách hiệu quả nhờ callback trong vòng lặp.
Nếu chúng ta dùng `var` kết quả thu được sẽ là số lần lặp. Để giải thích vấn đề này chúng ta sẽ xem xét 1 ví dụ thường thấy sau:
```
var callbacks = [];
(function() {
  for (var i = 0; i < 5; i++) {
    callbacks.push( function() { return i; } );
  }
})();
console.log(callbacks.map( function(cb) { return cb(); } ));
```
Kết quả thu được với `var`:
```
[5,5,5,5,5] 
```
Kết quả sẽ là `[5,5,5,5,5]` khác với yêu cầu `[0,1,2,3,4]` như thiết kế.
Tại sao lại có kết quả như vậy. Chúng ta cùng xem xét lại ví dụ trên:
Chúng ta định nghĩa một biến `var`  `i` để lưu trữ giá trị index của vòng lặp `for`. Khi hết vòng lặp giá trị của `i` sẽ bằng 5. Trong phần thân hàm, các giá trị được gọi sẽ lấy giá trị `i` hiện tại sau cùng của `i` (vì `i = 5` khi chay hết `for` và hàm callback là hàm gọi hàm nên `i = 5` trong các trường hợp). Đối với trường hợp này bạn cần phải giải quyết rất nhiều để có thể fix được. Tuy nhiên, `let` cung cấp cho chúng ta một giải giáp lịch thiệp và đơn giản hơn rất nhiều.
Với `let`:
```
var callbacks = [];
(function() {
  for (let i = 0; i < 5; i++) {
    callbacks.push( function() { return i; } );
  }
})();
console.log(callbacks.map( function(cb) { return cb(); } ));
```
Kết quả của đoạn code trên là `[0,1,2,3,4]` phù hợp với nhu cầu đặt ra. Điều này là nhờ phạm vi của `let` có hiệu lực trong khối {}. Thay vì được định nghĩa trong phạm vi của hàm, `let` nằm trong phạm vi khối của vòng lặp , tạo  `i` riêng cho mỗi lần lặp.
### 3. const
`const` trong javascript giúp đỡ chúng ta biết được lúc nào các biến bị đột biến về giá trị, từ đó giúp chúng ta xác hạn chế được các lỗi không mong muốn. Với yêu cầu này rõ ràng từ khóa `var` là không phù hợp.
```
function nodeSimplified(){
  const MY_VARIABLE =10;
  console.log(MY_VARIABLE);  //output 10 
}
```
`const` là một biến hằng số, không thể thay đổi giá trị. Nhưng nó chỉ đúng cho những dạng dữ liệu đơn giản như string, number, boolean (primitive type). Còn với object thì không đúng nữa, ta có thể thay đổi thuộc tính của object.
```
function nodeSimplified(){
    const OBJ = {
     weight: '65',
     height: '175'
    }
    obj = {};   //error
    obj.weight = '70';   // not error
}
```
Để tạo một hằng cho một object chúng ta cần sử dụng `Object.freeze` để ngăn chặn việc thay đổi các thuộc tính của object đó.
```
function nodeSimplified(){
    const OBJ = Object.freeze({
     weight: '65',
     height: '175'
    });
    obj.weight = '70';// error
}
```
Để có cái nhìn trực quan hơn về scope của `var`, `let` và `const` chúng ta có bảng so sánh dưới đây:
![](https://images.viblo.asia/29409ff3-233f-420f-942c-11a6e85b1e9e.png)
### Tổng kết
Trên đây là một vài tìm hiểu của mình về `var`, `let` và `const`, qua đây mong là các bạn có thể thấy được sự khác nhau giữa chúng và vận dụng một cách hiệu qủa nhé. Cảm ơn các bạn!