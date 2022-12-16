Spread operator có cú pháp giống với rest paraterter tuy nhiên cả hai có ý nghĩa khác nhau. Rest paramter được sử dụng khi khai báo hàm, ngược lại spread operator được sử dụng trong các câu lệnh, biểu thức hoặc khi gọi hàm.

ES6 cung cấp một toán tử mới gọi là spread operator bao gồm ba dấu chấm (...). Spread operator cho phép bạn trải ra các phần tử của một đối tượng có thể lặp lại, chẳng hạn như một **array**, **map** hoặc **set**. 

Trước khi ES6 được ra đời thì cách phổ biến để nối mảng là sử dụng phương thức **concat()** của một mảng với đối số truyền vào là những mảng khác sẽ được nối với mảng này:
VD:
```
var arr_1 = [1, 2, 3];
var arr_2 = [4, 5, 6];

arr_3 = arr_1.concat(arr_2);
console.log(arr_3); //  [1, 2, 3, 4, 5, 6]
```
Phía dưới là dùng spread operator
```
const arr_1 = [1,3,5];
const arr_2 = [2,4,6, ...odd];
console.log(arr_2); // [ 2, 4, 6, 1, 3, 5 ]
```
Trong ví dụ này, ba dấu chấm (...) nằm ở phía trước mảng **odd** là toán tử spread. Toán tử giải nén các phần tử của mảng **odd**.

Dưới đây là những khác biệt chính 

* Toán tử spread giải nén các phần tử.

* Các parameter còn lại gói các phần tử thành một mảng.

Các tham số còn lại phải là đối số cuối cùng của hàm. Tuy nhiên, toán tử spread có thể ở bất cứ đâu:

Như ví dụ dưới đây thì nó nằm ở đầu
```
const odd = [1,3,5];
const combined = [...odd, 2,4,6];
console.log(combined); //[ 1, 3, 5, 2, 4, 6 ]
```
hoặc
```
const odd = [1,3,5];
const combined = [2,...odd, 4,6];
console.log(combined); //[2, 1, 3, 5, 4, 6]
```

Các bạn cùng xem một số tình huống sử dụng các spread operator có thể rất hữu ích.

Đây là một hàm so sánh
```
function compare(a, b) {
    return a - b;
}
```
Trong ES5, để truyền một mảng gồm hai số cho hàm **compare()**, sử dụng phương thức **apply()** như sau:
```
var result = compare.apply(null, [1, 2]);
console.log(result); // -1
```
Tuy nhiên, khi bạn dùng spread operator, bạn có thể truyền một mảng gồm 2 số cho hàm **compare()**
```
let result = compare(...[1, 2]);
console.log(result); // -1
```
Khi dùng spread operator thì a = 1 và b =2;
### Sử dụng spread operator với array
#### Nối mảng
Ngoài ra, bạn có thể sử dụng spread operator để ghép hai hoặc nhiều mảng
```
let numbers = [1, 2];
let moreNumbers = [3, 4];
let allNumbers = [...numbers, ...moreNumbers];
console.log(allNumbers); // [1, 2, 3, 4]
```
#### Copy mảng
Bạn có thể copy một mảng bằng cách sử dụng spread operator 
```
let scores = [80, 70, 90];
let copiedScores = [...scores];
console.log(copiedScores); // [80, 70, 90]
```

### Sử dụng spread operator với string
Bạn hãy xem ví dụ sau 
```
let chars = ['A', ...'BC', 'D'];
console.log(chars); // ["A", "B", "C", "D"]
```
Trong ví dụ này, tôi đã khai báo mảng ký tự từ các chuỗi riêng lẻ. Khi áp dụng spread operator cho chuỗi 'BC', nó sẽ trải ra từng ký tự riêng lẻ của chuỗi 'BC' thành các ký tự riêng lẻ.
### Sử dụng spread operator với object
##### Copy object
Cũng giống như array thì object cũng có thể copy được
```
var obj = { name: 'ES6' };

var cloned = { ...obj };
console.log(cloned);
// { name: 'ES6' }
```
#### Gộp object
Chúng ta có thể sử dụng spread operator để gộp các object với nhau
```
var obj_1 = { name: 'Khanh' };
var obj_2 = { year: 2020 };

var cloned_obj = { ...obj_1, ...obj_2 };
console.log(cloned_obj);
// {name: "Khanh", year: 2020}
```

**Tóm lược** 

* Spread operator được biểu thị bằng ba dấu châm (...)
* Spread operator giải nén các phần tử của các đối tượng có thể lặp như mảng, object và map vào một danh sách. 
* Tuy nhiên, nó gói các đối số còn lại của hàm vào một mảng.
* Spread operator có thể được sử dụng copy array, object hoặc hợp nhất array, object thành một 

Cảm ơn các bạn đã đọc bài viết của mình. Hẹn các bạn ở các bài tiếp theo 😍😍