10 cách để viết mã JavaScript tốt hơn

![image.png](https://images.viblo.asia/457b8436-2d59-4489-b678-d6dd7914fb26.png)


Hầu hết chúng ta đã quen với việc viết code JavaScript trong một thời gian dài. Nhưng chúng ta có thể đã không tự cập nhật các tính năng mới có thể giải quyết các vấn đề với cách tối ưu nhất. Những kỹ thuật này có thể giúp bạn viết Mã JavaScript sạch sẽ và tối ưu hóa. Hôm nay, mình sẽ tóm tắt một số đoạn mã JavaScript được tối ưu hóa có thể giúp bạn phát triển các kỹ năng của mình.

**1. Shorthand for if with multiple || conditions**
```
if (fruit === 'apple' || fruit === 'orange' || fruit === 'banana' || fruit ==='grapes') {
    //code
}
```
Thay thế nhiều cụm điều kiện **|| (OR)**  bằng một mảng với hàm includes.
```
if (['apple', 'orange', 'banana', 'grapes'].includes(fruit)) {
   //code
}
```


**2. Sử dụng shorthand cho if với multiple && conditions**
```
if(obj && obj.address && obj.address.postalCode) {
    console.log(obj.address.postalCode)
}
```
Thay thế bằng  **(?.)** 

`console.log(obj?.address?.postalCode);`

**3. Sử dụng shorthand cho null, undefined, và empty if checks**
```
if (first !== null || first !== undefined || first !== '') {
    let second = first;
}
```
Thay vì viết nhiều điều kiện kiểm tra, ta có viết tối ưu hơn bằng phép toán  **|| (OR)** .
`const second = first || '';`


**4. Sử dụng shorthand cho switch case**
```
switch (number) {
  case 1:
     return 'one';
  case 2:
     return 'two';
  default:
     return;
}
```
Sử dụng  một  map/ object để dễ hiểu hơn.
```
const data = {
  1: 'one',
  2: 'two'
};
```
//Access it using
`data[num]`


**5. Sử dụng shorthand cho nhiều function với một single line**
```
function doubleOf(value) {
  return 2 * value;
}
```
Thay thế bằng arrow function 
`const doubleOf = (value) => 2 * value`


**6. Sử dụng shorthand cho điều kiện để gọi hàm**
```
function area() {
    console.log('area');
}
function volume() {
    console.log('volume');
}
if(type === 'square') {
    area();
} else {
    volume();
}
```
Cách khác để kiểm tra và gọi hàm.
`(type === 'square' ? area : volume)()`


**7. Sử dụng shorthand cho việc sử dụng if để set một giá trị mặc định**
```
if(amount === null) {
    amount = 0;
}
if(value === undefined) {
    value = 0;
}
console.log(amount); //0
console.log(value); //0
```

Đơn giản hóa bằng cách gọi biểu thức  **|| (OR)** .
```
console.log(amount || 0); //0
console.log(value || 0); //0
```

**8. Sử dụng shorthand cho if…else**
```
let value;
if (num > 0) {
    value = 'positive';
} else {
    value = 'negative';
}
```
thay bằng: 
`const value = num > 0 ? 'positive' : 'negative';`


**9.Sử dụng shorthand cho việc gọi hàm lặp while như thông thường**
```
const arr = [11, 22, 33];
for(let i=0; i<arr.length; i++) {
    console.log(arr[i]);
}
```
Thay thế bằng forEach .
```
const arr = [11, 22, 33];
arr.forEach((val) => console.log(val));
```

**10.Sử dụng shorthand cho number sang string**
```
const num1 = parseInt("100");
const num2 =  parseFloat("11.11");
```
Đơn giản hơn chỉ cần phép cộng để chuyển sang chuỗi.
```
const num1 = +"100";
const num2 =  +"11.11";
```


**Kết luận**
Đây là những kỹ thuật viết ngắn gọn yêu thích của mình. Nó giúp lập trình viên viết code đúng chuẩn hơn, còn bạn hay dùng gì nữa, hãy để lại comment để mọi người tham khảo chung nha. Cám ơn.

Nguồn: https://javascript.plainenglish.io/stop-writing-javascript-like-this-a7fafbe451a5