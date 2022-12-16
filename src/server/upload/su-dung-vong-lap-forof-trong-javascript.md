Trong bài viết này mình sẽ chia sẻ cách sử dụng vòng lặp for...of trong es6 nhé.<br>
Cú pháp khai báo:<br>
```Javascript
for (variable of iterable) {
   // ...
}
```
Trong mỗi lần lặp thì bạn có thể sử dụng các từ khóa như var, let, const để khai báo variable<br>
Ví dụ:<br>
### 1) Lặp qua mảng
```Javascript
let scores = [80, 90, 70];

for (let score of scores) {
    score = score + 5;
    console.log(score);
}
```
Output:<br>
```
85
95
75
```

Nếu bạn không muốn thay đổi giá trị của biến score trong mỗi lần lặp, bạn có thể sử dụng từ khóa const để khai báo biến như bên dưới.<br>
```Javascript
let scores = [80, 90, 70];

for (const score of scores) {
    console.log(score);
}
```
Output:<br>
```
80
90
70
```
Để có thể truy cập được index của mỗi phần tử trong mỗi lần lặp, bạn có thể sử dụng phương thức entries() như bên dưới.<br>
```Javascript
let colors = ['Red', 'Green', 'Blue'];

for (const [index, color] of colors.entries()) {
    console.log(`${color} is at index ${index}`);
}
```
Output:<br>
```
Red is at index 0
Green is at index 1
Blue is at index 2
```
### 2) Sử dụng object destructuring với for…of
Hãy xem xét ví dụ sau:<br>
```Javascript
const ratings = [
    {user: 'John',score: 3},
    {user: 'Jane',score: 4},
    {user: 'David',score: 5},
    {user: 'Peter',score: 2},
];

let sum = 0;
for (const {score} of ratings) {
    sum += score;
}

console.log(`Total scores: ${sum}`); // 14
```
Output:<br>
```
Total scores: 14
```
### 3) Lặp qua strings
Hãy xem xét ví dụ sau:<br>
```Javascript
let str = 'abc';
for (let c of str) {
    console.log(c);
}
```
Output:<br>
```
a
b
c
```
### 4. sự khác nhau giữa for...of vs. for...in
Hãy xem xét ví dụ sau:<br>
```Javascript
let scores = [10,20,30];
scores.message = 'Hi';

console.log("for...in:");
for (let score in scores) {
  console.log(score); 
}

console.log('for...of:');
for (let score of scores) {
  console.log(score);
}

```
Output:<br>
```
for...in:
0
1
2
message
for...of:
10
20
30
```
Ở ví dụ trên for...in sẽ thực hiện lặp qua các thuộc tính của mảng scores <br>
```Javascript
for...in:
0
1
2
message
```
Trong khi đó for...of thực hiện lặp qua các thành phần của mảng scores.<br>
```Javascript
for...of:
10
20
30
```