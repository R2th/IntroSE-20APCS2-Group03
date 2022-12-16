Một rest parameter(các tham số còn lại) cho phép một hàm chấp nhận không hoặc nhiều đối số của kiểu được chỉ định. Trong TypeScript các rest parameter tuân theo các quy tắc sau:<br>
- Một hàm chỉ có một rest parameter
- Rest parameter xuất hiện ở cuối danh sách các tham số
- Loại của rest parameter là một loại mảng

Để khai báo một rest parameter, bạn bắt đầu tên tham số bằng ba dấu chấm và sử dụng kiểu mảng làm chú thích kiểu:<br>
```TypeScript
function fn(...rest: type[]) {
   //...
}
```
Ví dụ:<br>
```TypeScript
function getTotal(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}
```
Trong ví dụ này, hàm getTotal () tính tổng các số được truyền vào nó.<br>
Vì số các tham số là một rest parameter, bạn có thể truyền một hoặc nhiều số để tính tổng:<br>
```TypeScript
console.log(getTotal()); // 0
console.log(getTotal(10, 20)); // 30
console.log(getTotal(10, 20, 30)); // 60
```