### Giới thiệu
Xin chào tất cả các bạn, lại là mình đây. Cũng như tiêu đề thì hôm nay mình sẽ giới thiệu tới các bạn những thứ dường như đã bị lãng quên trong javascript. Chính vì ít người dùng, cả mình cũng vậy hiếm khi nào sử dụng đến nó.

Vậy nên mình viết bài này hy vọng sẽ giúp các bạn biết đến nó. Nào hãy cùng nhau tìm hiểu nào.

### 1. Tagged template

```
taggingThis`Hello!!, I'm ${name}. Do you know me?`
```
Thế nào bạn đã từng thấy cú nào nào như vậy trong javascript chưa :D Nếu bạn đã từng thấy thì chắc bạn đã làm việc qua với react.
Ở đây  mình sẽ phân tích cho các bạn:
- `taggingThis` thực ra ở đây là 1 function và cái `Hello!!, I'm ${name}. Do you know me?` chính là đối số của nó. 
- Tham số truyền vào sẽ trở thành 1 array string. Kiểu như thế này `['Hello!!, I'm ', '. Do you know me?']`. Thế còn cái `${name}` đâu rồi. Vâng nó sẽ thành đối số thứ 2 của function. Ví dụ `name = 'Tagged'` thì sẽ như thế này `['Tagged']`.

Từ đó chúng ta có thể viết được 1 tagged function đơn giản như sau:
```
function taggingThis(strings, ...vals) {
  console.log(strings[0], vals[0], strings[1]);
}

const name = 'Tagged';
taggingThis`Hello!!, I'm ${name}. Do you know me?` // Output: Hello!!, I'm Tagged. Do you know me?
```
Như vậy đấy, giờ các bạn đã biết thêm 1 cái rồi đấy :D Giờ đến cái tiếp theo ngay và luôn nhé.

### 2. Comma operator
```
let expr = (99, 88, 77);
expr // Output: 77
```
Thế nào cái này thì sao, bạn đã thấy hoặc dùng bao giờ chưa?  Nếu chưa thì mình xin giải thích 1 chút ở đây nhé.
Thực ra cái này ko có gì cao siêu ở đây cả đơn giản là nó chỉ trả về kết quả cuối cùng của biểu thức ở trên.
Việc áp dụng **Comma operator** này chúng ta có thể tạo ra 1 lambda functions đơn giản như sau:
```
const array = [];
const lambda = (a, b, arr) => (arr.push(a * b), a * b);
lambda(2, 3, array); // Output: 6. And array = [6];
```

Nếu như các bạn không biết **Comma operator** này thì cái lambda function trên có thể viết thành như sau:
```
const lambda = (a, b, arr) => {
  const mul = a * b;
  array.push(mul);
  return mul;
}
```
Đấy mình đã thiệu thêm 1 cái thú vị, các bạn thấy cách nào ngắn gọn súc tích hơn thì dùng nhá :)

### 3. with
Thực sự mình chưa thấy ai sử dụng cú pháp này bao giờ @@ Nó được khuyến khích là không nên sử dụng và javascript cũng đã không cho sử dụng ở strict mode
Các bạn hãy xem ví dụ sau:
```
const a = 45
let b = 8
var f = 909
with(f) {
  let c = 1000;
  console.log(f, b, a) // Output: 909 8 45
}
console.log(c); // Output: undefined
```
Chức năng của `with` này chỉ để mở rộng scope của `var f`.  Các biến được `let, const` trong `with` sẽ không dùng được ở ngoài. 
Đấy chức năng chỉ có vậy thôi nên người ta không khuyến khích sử dụng nó, các bạn cũng chỉ tham khỏa cho biết thôi nhé :)

### 4.  in
Cái này thì mình cũng hay sử dụng.  Thường dùng để kiểm tra 1 property có tồn tại trong 1 object hay không
```
const obj = { prop1: 1 };
console.log('prop1' in obj); // Output: true
console.log('prop2' in obj); // Output: false
```

Hoặc là được sử dụng trong vòng lặp for
```
const array = [1, 2];
for(i in array) { console.log(i); }
// Output:
// 1
// 2
```

### 5. Array constructor
Như thường lệ thì các bạn tạo mới một array như thế nào. Có phải là như vậy không?
```
const array = [1, 2, 3];
```

Ngoài ra bạn có thể sử dụng:
```
const array = new Array(1, 2, 3);
```

Nhưng bạn nên lưu ý với việc sử dụng `new Array()` vì lý do sau đây:
- `const array = new Array(6)` không bằng việc `const array = [6]` đâu nhé. Mà nó là array có length bằng 6 và có 6 empty items. Tương đương với việc `const array = [,,,,,,]`.


### 6. Function constructor
Bạn biết bao nhiêu cách để định nghĩa được 1 function?
```
// Với array function
const mul = (a, b) => a* b;

// Với function 
function mul(a, b) {
  return a * b;
}
// hoặc
const mul = function(a, b) {
  return a * b;
}
```
Ngoài ra bạn có thể dùng
```
const mul = new Function('a', 'b', 'return a *b');
```
Ở đây bạn có thể truyền bao nhiêu đối số cũng được. Đối số cuối cùng sẽ là phần thân của function các đối số còn lại đều là tham số có function.

### Kết luận

Bài viết này mình đã thới thiệu với các bạn một số thứ đã bị lãng quên trong javascript. Thực ra còn rất nhiều thứ khác nữa nhưng bài viết đến đây đã khá dài nên có lẽ mình sẽ chia ra làm nhiều phần, các bạn hãy chú ý đòn xem nhé. Cám ơn tất cả các bạn :)))))