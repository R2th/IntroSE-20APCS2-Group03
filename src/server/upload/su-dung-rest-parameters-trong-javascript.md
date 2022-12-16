### Giới thiệu về rest parameters
ES6 cung cấp một loại tham số mới gọi là rest parameters, cái có tiền tố là 3 dấu chấm (...)<br>
Ví dụ:<br>
```Javascript
function fn(a,b,...args) {
   return args;
}
```
Ở ví dụ trên tham số cuối cùng trong hàm fn() là args và được bắt đầu bằng 3 dấu chấm (...) , nó được gọi là một rest parameters<br>
Tất cả các đối số bạn truyền trong hàm sẽ ánh xạ đến danh sách các parameters, đối số đầu tiền sẽ ứng với tham số a, đối số thứ 2 sẽ ứng với tham số b, đối số thử 3, 4 và còn lại sẽ được lưu trong rest parameter args như một mảng(hay còn gọi là tham số args)<br>
Ví dụ:<br>
```Javascript
var result = fn(1, 2, 3, "A", "B", "C");
console.log(result);
```
**Output**:<br>
Mảng args sẽ lưu mảng dữ liệu như bên dưới<br>
```Javascript
[3, 'A', 'B', 'C']
```
Nếu bạn chỉ truyền 2 đối số vào hàm fn() thì rest parameter sẽ nhận kết quả là mảng [] như ví dụ bên dưới<br>
```Javascript
var result = fn(1,2);
console.log(result);
```
Kết quả của biến args sẽ là:<br>
```
[]
```
Khi sử dụng rest parameter thì bạn bạn phải đặt rest parameter ở cuối danh sách tham số của hàm thì mới sử dụng được nhé, nếu không đặt ở cuối thì nó sẽ báo lỗi như bên dưới.<br>
Ví dụ:<br>
```Javascript
function fn(a,...rest, b) {
 // error
}
```
**Error:**<br>
```Javascript
SyntaxError: Rest parameter must be last formal parameter
```
Tiếp theo các bạn hãy xem ví dụ tính tổng bên dưới.<br>
```Javascript
function sum(...args) {
    let total = 0;
    for (const a of args) {
        total += a;
    }
    return total;
}

var total = sum(1, 2, 3);
console.log(total);
```
Output:<br>
```
6
```