Hôm nay chúng ta cùng tìm hiểu về Array - được dùng khá phổ biến trong Javascript.
> Kiểu dữ liệu của Array trong JavaScript là objects, và đặc biệt nó có thêm thuộc tính length và có thể truy cập các phần tử theo chỉ số.

Trong bài viết hôm nay, chúng ta không đi vào chi tiết tìm hiểu Array, mà là chia sẽ những cách để tạo Array hoặc clone từ các Array có sẵn
# Những cách tạo Array
## Dùng Array Literal
Đây là cách đơn giản nhất và có thể bạn hay sử dụng nhiều nhất. 
`let arr = [1,2,3]`

## Dùng Array Constructor
Array trong Javascript là object, vì thế ta cũng có thể dùng nó để tạo 1 đối tượng array. Giả sử chúng ta muốn tạo 1 array có 1001 phần tử, và không cần quan tâm đến giá trị các phần tử đó, chẳng lẽ dùng array literal để tạo sao?. Chúng ta không có rảnh rỗi để viết 1001 phần tử được. Array constructor sẽ giúp chúng ta giải quyết vấn đề này.
```
// Tạo array với nhiều tham số
var array1 = new Array(1, 2, 3);
console.log(array1); // [1, 2, 3]
console.log(array1.length); // 3

// Tạo array với 1 tham số  (là số )
var array2 = new Array(3);
console.log(array2); // Array(3) {length: 3}
console.log(array2.length); // 3

// Tạo array với 1 tham số  (không phải là số )
var array3 = new Array("3");
console.log(array3); // ["3"]
console.log(array3.length); // 1
```

Array constructor tạo ra những array khác nhau tùy theo tham số mà nó nhận được.
**Vấn đề với Array constructor**
Chúng ta tưởng rằng đã giải quyết vấn đề tạo ra 1 array có 1001 phần tử rồi đúng không? Đơn giản ta dùng Array constructor với 1 tham số truyền vào là 1001: var array = new Array(1001).  Nhưng không ,
```
var array1 = Array(5);

console.log(array1.length); //5

console.log(array1[0]); //undefined
console.log(array1[1]); //undefined
console.log(array1[2]); //undefined
console.log(array1[3]); //undefined
console.log(array1[4]); //undefined
```
Thoạt nhìn thì chẳng có vấn đề gì cả, bạn nghĩ rằng array1 sẽ có 5 phần tử, và mỗi phần tử của nó có giá trị là undefined. Thật ra thì chẳng có phần tử nào ở đây cả, mà chỉ có mỗi thuộc tính length được gán = 5.
Hãy chạy đoạn code sau:

```
var array1 = Array(5);
var array2 = Array(1, 2, 3);

//Only length property exists for array1
console.log(Object.getOwnPropertyNames(array1)); //["lenght"]

// Both length and index properties exist for array2
console.log(Object.getOwnPropertyNames(array2));

// ["0", "1", "2", "length"]
```

Vấn đề này làm cho các hàm như map(), filter() hoặc reduce() trở nên vô dụng khi dùng với array ở trên. Và dưới đây là 1 sai lầm thường gặp nếu chúng ta không hiểu rõ vấn đề này (bạn muốn tạo ra 1 array có 5 phần tử và mỗi phần tử có giá trị = 5):

```
var array1 = Array(5).map(function(value, index) { return 5});

console.log(array1[0]); //undefined
console.log(array1[1]) ; //undefined
console.log(array1[2]); //undefined
console.log(array1[3]) ; //undefined
console.log(array1[4]); //undefined

console.log(Object.getOwnPropertyNames(array1)); //["length"]
```


chẳng có phần tử = 5 nào được tạo ra cả, hàm map không làm việc vì trong array1 chỉ có thuộc tính length mà không có thuộc tính index nào. 
Chẳng lẽ đành bó tay. Sau đây có những cách giúp ta giải quyết vấn đề này
### 1. Dùng Array.prototype.fill()
Hàm fill cho phép chúng ta điền vào tất cả các phần tử của array với 1 giá trị

```
var array1 = Array(5).fill(5);

console.log(array1[0]); //5
console.log(array1[1]);  //5
console.log(array1[2]);//5
console.log(array1[3]);//5
console.log(array1[4]);//5
```

### 2. Dùng Array.from()
Hàm Array.from tạo mới 1 array, là bản sao từ 1 array ban đầu.

```
var array1 = Array.from(new Array(5));

console.log(array1[0]); //undefined
console.log(array1[1]);//undefined
console.log(array1[2]);//undefined
console.log(array1[3]);//undefined
console.log(array1[4]);//undefined
```

Bạn có thể thấy log undefined ở đây giống như ví dụ lúc dùng Array constructor, nhưng giờ undefined chính là giá trị của phần tử nhé.

Một điều tuyệt vời nữa của Array.from() là nó có thể nhận tham số thứ 2, là một map function. Hàm này sẽ được gọi với mỗi phần tử của array và giá trị trả về là giá trị của phần tử đó, giống như hàm .map()

```
let array1 = Array.from(Array(5), (x, index) => index + 1);

console.log(array1[0]); //1
console.log(array1[1]);//2
console.log(array1[2]);//3
console.log(array1[3]);//4
console.log(array1[4]);//5
```

### 3. Dùng Spread Operator
**spread operator (...)**, tính năng này được thêm vào trong ES6, nó cho phép thêm những phần tử bị thiếu vào array với giá trị undefined, kết quả giống như sử dụng hàm Array.from().

```
var array1 = [...new Array(5)];

console.log(array1[0]); //undefined
console.log(array1[1]); //undefined
console.log(array1[2]); //undefined
console.log(array1[3]); //undefined
console.log(array1[4]); //undefined

console.log(Object.getOwnPropertyNames(array1));
// ["0", "1", "2", "3", "4", "length"]
```


### 4 Dùng Array.of()

Cách dùng hàm Array.of giống y như dùng Array constructor, chỉ có 1 khác biệt duy nhất là cách mà Array.of tạo ra array khi tham số truyền vào là 1 số nguyên.

Trong khi Array.of(5) tạo 1 array có 1 phần tử, và giá trị của nó là 5, thì new Array(5) tạo ra 1 array với length là 5

```
var array1 = Array.of(5); // [5]
var array2 = Array(5); // Array(5) {length: 5}
```
# Áp dụng

Viết hàm range cho phép chúng ta tạo ra 1 array gồm các phần tử, bắt đầu (start) từ đâu, kết thúc (end) ở đâu và bước (step) bằng bao nhiêu:
```
function range(start, end, step = 1) {
    // kiểm tra điều kiện
    const allNumbers = [start, end, step].every(Number.isFinite);
    if (!allNumbers) {
        throw new TypeError('range() expects only finite numbers as arguments.');
    }
    if (step <= 0) {
        throw new Error('step must be a number greater than 0.');
    }
    if (start > end) {
        step = -step;
    }

    // tính toán số  phần tử
    const length = Math.floor(Math.abs((end - start) / step)) + 1;

    return Array.from(Array(length), (x, index) => start + index * step);
}
```

Ở đây mình dùng Array.from, các bạn có thể dùng nhiều cách khác nhé.

```
console.log(range()); // TypeError
console.log(range(1)); //TypeError
console.log(range(0, 5)); // [0, 1, 2, 3, 4, 5]
console.log(range(0, 5, -1)); // Error
console.log(range(0, 5, 0.5)); // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
console.log(range(1, 5, 0.75)); // [1, 1.75, 2, 2.5, 3.25, 4, 4.75]
console.log(range(10, 0, 2)); // [10, 8, 6, 4, 2, 0]
console.log(range(15, 1, 2.25)); // [15, 12.75, 10.5, 8.25, 6, 3.75, 1.5]
```

Phần này kết thúc tại đây. Ở phần sau mình sẽ viết về về các cách để clone 1 array từ array có sẵn nhé. 
Cảm ơn các bạn