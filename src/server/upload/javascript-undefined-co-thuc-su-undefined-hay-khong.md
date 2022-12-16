### Lời chào
Chào tất cả các bạn, hôm nay mình sẽ mang đến cho các bạn một bài viết về undefined trong javascript. Nó có thực sự là cái undefined mà bạn đã biết hay không?
Nào cùng mình tìm hiểu nhé!

### Vấn đề chính
Như các bạn đã biết thì undefined trong javascript có nghĩa là khi sử dụng 1 variable nào đó mà chưa được định nghĩa hoặc một function void không trả về giá trị.
Ví dụ:
```
const obj = {};
console.log(obj.name); // undefined

function example() {}
console.log(example()); // undefined

console.log(void(0)); // undefined
```

### Điều gây nhầm lẫn
Vậy điều gì sẽ xảy ra nếu như chúng ta defined ra 1 variable "undefined" :))) 
Với các trình duyệt hiện nay thì undefined là readonly tức là ta sẽ không định nghĩa lại được nó nữa.
Ví dụ: 
```
const undefined = 10; // SyntaxError
let undefined = 10; // SyntaxError
var undefined = 10;
console.log(undefined); // undefined
```
Như ví dụ ở trên thì chúng ta ko thể định nghĩa lại variable undefined bởi vì nó là giá trị readonly.
Vậy thì làm sao để định nghĩa được nó. Các bạn hãy xem ví dụ tiếp theo sau đây.
```
function myFunction() {
    const undefined = 10;
    console.log(undefined);
}

myFunction(); // 10;
```
Các bạn đã thấy sự vi diệu ở đây chưa :D Lúc đầu chúng ta không thể định nghĩa ở scope là global nhưng với scope local của 1 function thì vẫn định nghĩa lại được.
Hãy thử với ví dụ khác. Trong scope là 1 cấu trúc điều kiện if
```
if (true) {
    var undefined = 10;
    console.log(undefined); // undefined
}

if (true) {
    let undefined = 10;
    console.log(undefined); // 10
}
```

### Tổng kết
Theo như mình đã trình bày ở trên thì trong scope local của 1 function nào đó thì undefined hoàn toàn có thể trở thành 1 variable có giá trị. Như vậy có nghĩa rằng.
- Hãy chắc chắn rằng mình không được đặt tên variable là undefined ở bất cứ đâu. 
- Nếu được hãy sử dụng void thay vì undefined để so sánh.
- Trong dự án hãy sử dụng linter: Eslint, Tslint, ... để hạn chế điều này.
- Trong trường hợp bắt buộc dụng undefined để sao sánh giá trị thì có thể gán variable undefined thành "undefined" để chắc chắn undefined chính là "undefined" :)))))

Cảm ơn các bạn đã dành thời gian để đọc bài viết của mình. Chúc các bạn có ngày làm việc và học tập hiệu quả.