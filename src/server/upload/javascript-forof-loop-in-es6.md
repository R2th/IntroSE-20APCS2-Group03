Trong hướng dẫn này,  mình sẽ giới thiệu cho bạn về câu lệnh for ... of trong js cho phép bạn tạo một vòng lặp lặp qua một đối tượng có thể lặp lại

ES6 đã giới thiệu một cấu trúc mới for ... of tạo ra một vòng lặp lại trên đối tượng có thể lắp lại như **Array**, **Map**, **Set** hoặc bất kỳ đối tượng nào có thể lặp.

Dưới đây là ví dụ cho **for ... of**

```
for (variable of iterable) {
   // statements 
}
```

Các bạn cùng xem một số ví dụ về việc sử dụng **for ... of**

##### Array #####
Ví dụ sau cho bạn thấy cách sử dụng for ... of để lặp qua các phần tử của một mảng
```
let scores = [10, 20, 30];
for (let score of scores) {
    score = score + 5;
    console.log(score);
}
// 15
// 25
// 35
```
Nếu bạn không thay đổi biến bên trong vòng lặp, bạn nên sử dụng **const** thay vì **let** như sau:
```
for (const score of scores) {
    console.log(score);
}
// 10
// 20
// 30
```

##### String #####
Ví dụ sau cho bạn thấy cách sử dụng for ... of để lặp qua các phần tử của một chuỗi
```
let str = 'abc';
for (let c of str) {
    console.log(c);
}
// a
// b
// c
```

##### Map #####
Ví dụ sau cho bạn thấy cách sử dụng for ... of để lặp qua các phần tử của một map
```
var colors = new Map();
colors.set('red', '#ff0000');
colors.set('green', '#00ff00');
colors.set('blue', '#0000ff');

for (let color of colors) {
    console.log(color);
}

// ["red", "#ff0000"]
// ["green", "#00ff00"]
// ["blue", "#0000ff"]
```

##### Set #####
Ví dụ sau cho bạn thấy cách sử dụng for ... of để lặp qua các phần tử của một set
```
let nums = new Set([1, 2, 3]);

for (let num of nums) {
    console.log(num); //
}
// 1
// 2
// 3
```

##### for...of vs. for...in #####
Vòng lặp **for ... in** lặp qua tất cả các thuộc tính có thể liệt kê của một đối tượng. Nó không lặp lại qua một tập hợp như **Array**, **Map**, **Set**

Không giống như vòng lặp **for ... in**, vòng lặp **for ... of** lặp lại một tập hợp, thay vì một đối tượng. Trên thực tế, for ... of lặp qua các phần tử của bất kỳ tập hợp nào có thuộc tính **[Symbol.iterator]**.

Ví dụ sau minh họa sự khác biệt giữa **for ... of** và **for ... in**
```
let numbers = [6, 7, 8];
numbers.foo = "foo";

for (let i in numbers) {
    console.log(i);
}
// 0
// 1
// 2
// foo
for (let i of numbers) {
    console.log(i);
}
// 6
// 7
// 8
```

Trong bài viết này, mình đã cách sử dụng for ... of trong js để lặp qua một collection

Hẹn các bạn ở bài viết tiếp theo :)