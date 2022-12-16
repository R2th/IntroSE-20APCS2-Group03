### Arrow function có gì hay
* Ngắn gọn súc tích hơn.
* Có thể sử dụng return một cách "không minh bạch". :rofl:
* Không bind lại giá trị của `this` khi sử dụng một arrow function trong một function khác.
***
### Convert funtion trong ES5 thành arrow function như thế nào?
Mình có một ví dụ đơn giản sử dụng `.map()` như sau:

Đầu tiên, khai báo một mảng chứa các tên:
```javascript 
const names = ['Ross', 'Monica', 'Ben']
```
Bây giờ mình muốn thêm họ vào cho các tên thì mình sẽ dùng một hàm sử dụng `.map()` như sau:
```javascript
const fullNames = names.map(function(name) {
    return `${name} Geller`;
});
```
Trong console, khi mình gọi:
```javascript
names
```
Nó sẽ trả về:
```javascript
['Ross', 'Monica', 'Ben']
```
Sau đó nếu mình gọi:
```javascript
fullNames
```
Nó sẽ trả về:
```javascript
["Ross Geller", "Monica Geller", "Ben Geller"]
```

<br>

#### Đầu tiên, hãy thử thay thế từ `function` bằng một mũi tên đôi `=>` và di chuyển nó ra phía sau tham số
```javascript
const fullNames = names.map((name) =>  {
    return `${name} Geller`;
});
```
Nếu như hàm của bạn chỉ có một tham số bạn có thể bỏ luôn cả ngoặc tròn:
```javascript
const fullNames = names.map(name =>  {
    return `${name} Geller`;
});
```
Chạy thử lại trên console có bạn có thể thấy được rằng kết quả vẫn giống như cũ.

<br>

#### Còn có thể return một cách "không minh bạch"
Vậy trước hết, return một cách minh bạch/tường minh (**explicit**) là như thế nào?

Return một cách tường minh là khi bạn viết rõ từ `return` ra trong function.

Để return một cách "không minh bạch" (**implicit**), hãy bỏ từ `return` rồi chuyển những thứ bạn muốn return về cùng một dòng với phần khai báo function. Ban có thể bỏ luôn cả ngoặc nhọn.

Explicit return:
```javascript
const fullNames = names.map(name => {
    return `${name} Geller`;
});
```
implicit return:
```javascript
const fullNames = names.map(name => `${name} Geller`);
```
Nếu như không có tham số, ban có thể thay thế nó bằng một cặp ngoặc tròn:
```javascript
const fullNames = names.map(() => `hey Geller!`);

// return:
["hey Geller!", "hey Geller!", "hey Geller!"]
```
***
### Các Arrow funcion luôn luôn là hàm khuyết danh
Trước khi nói về hàm khuyết danh, chúng ta hãy trả lời câu hỏi "Hàm có tên là hàm như thế nào?" trước đã.
```javascript
// Trong ES5, một hàm có tên có thể được khai báo như sau:
function myFavFood(food) {
    console.log(`My favorite food is ${food}!`);
}

// myFavFood là tên của hàm.

// Gọi nó trong console:
myFavFood('pizza');

// sẽ trả về:
My favorite food is pizza!
```
Trong các ví dụ trước, tất cả các arrow function hay kể cả các hàm viết dưới dạng ES5 đều khuyết danh.

Chúng ta gọi các hàm đó bằng cách đặt chúng bằng với một biến `const` tên là `fullNames` rồi gọi biến đó ra.

Sử dụng ví dụ về food phía trên, chúng ta có thể gán arrow function vào một biến `const` tên là `myFavFood`.
```javascript
const myFavFood = (food) => { console.log(`My favorite food is ${food}!`) }

// Trong console gọi:
myFavFood('pizza');

// sẽ trả về:
My favorite food is pizza!
```

Vậy vì sao chúng ta cần phải đặt arrow function tương ứng với một biến nào đó?

Một trong các lý do là đặt như vậy sẽ giúp ích cho chúng ta trong việc debug JavaScript vì đôi lúc, số của dòng là chưa đủ để khoanh vùng bug.
***
### Tạo object literal từ một mảng
Giả sử chúng ta có một mảng những người thắng trong giải đua xe Tour de France gần đây nhất và chúng ta muốn tạo một **object literal** - hay, một danh sách các cặp name-value phân cách nhau bởi dấu phẩy và bọc bởi một cặp ngoặc nhọn - hiển thị tên người thắng, thứ hạng cùng với tên của giải đua xe.

Chúng ta có thể làm điều này bằng cách lặp qua mảng đã cho bằng `map()`.

#### Ví dụ:
Trước khi dùng cú pháp của ES6, hãy dùng ES5 trước đã.

Cho:
```javascript
const competition = 'Tour de France';
const winners = ['Geraint Thomas', 'Tom Dumoulin', 'Chris Froome'];
```
Chúng ta có thể làm như sau:
```javascript
const win = winners.map(function(winner, i) {
    return {
        name: winner,
        competition: competition,
        place: i + 1
    }
})

console.log(win);

// Trả về:
0: {name: "Geraint Thomas", competition: "Tour de France", place: 1}
1: {name: "Tom Dumoulin", competition: "Tour de France", place: 2}
2: {name: "Chris Froome", competition: "Tour de France", place: 3}
```
*Note: Bạn có thể dùng `console.table(win)` để trả về object dưới dạng bảng:*

![](https://images.viblo.asia/51d72e66-0547-4778-8ede-cd352320ef87.JPG)

#### Chuyển sang ES6:
```javascript
ES5:
const win = winners.map(function(winner, i) {
    return {
        name: winner,
        competition: competition,
        place: i + 1
    }
})

ES6:
// 1. Thay 'function' bằng mũi tên đôi và chuyển nó ra sau đối số.
// 2. Bỏ từ 'return'.
// 3. Vì chúng ta muốn return một object nên chúng ta cần đặt ngoặc tròn bao lấy ngoặc nhọn.

const win = winners.map((winner, i) => ({ name: winner, competition: competition, place: i + 1 }))
```