# I. Giới thiệu
* ES6 được hiểu là phiên bản thứ 6 của tập hợp chuẩn các kỹ thuật nâng cao cho Javascript (ECMA Script). Ra đời sau phiên bản thứ 5 (2011). ES6 được công bố vào năm 2015 với tên gọi đầy đủ ECMAScript 2015.

* Những cú pháp và tính năng mới được bổ sung ở phiên bản ES6 làm cho code hiện đại và dễ đọc hơn. Các đoạn code sẽ được tối giản hơn nhưng lại có thể làm được nhiều việc hơn. Một số điểm nổi bật có thể kể đến như **arrow functions, template strings, class destruction, Modules**, ... Với những tính năng này lập trình viên có thể phát triển những hệ thống lớn một cách dễ dàng hơn trước đây rất nhiều.  

* Phần lớn các web browsers hiện nay đã support hầu hết các tính năng của ES6, tuy nhiên đối với một số khách hàng lớn tuổi họ thường sử dụng các browsers quá cũ (trước năm 2015) hoặc chả bao giờ cập nhật máy tính thì chúng ta cũng có thể sử dụng phần mềm để chuyển đổi code ES6 về ES5 để đảm bảo ứng dụng của chúng ta chạy mượt mà trên hầu hết các browsers.

# II. Một số tính năng mới
## 1. const and let
`const` là một keyword mới được dùng để khai báo các biến. Một khi đã được sử dụng biến đó sẽ không thể được gán lại hay nói cách khác nó là một biến không thay đổi ngoại trừ khi được sử dụng với các đối tượng.

Điều này thực sự hữu ích khi ta gán biến cho các đối tượng mục tiêu. Keyword `const` thường được sử dụng thay vì `var` khi ta muốn tạo sự kiện cho một button hay khi muốn lựa chọn một phần tử HTML nào đấy. Bởi vì `var` thường phải đưa lên đầu nên `const` là lựa chọn yêu thích của các lập trình viên.

```
// ES5
var MyBtn = document.getElementById('mybtn');

// ES6
const MyBtn = document.getElementById('mybtn');
```

Với đoạn code trên, const sẽ không thể thay đổi hay gán lại. Thông báo lỗi sẽ xảy ra nếu bạn cố gắng gán một giá trị mới cho nó.
```
Uncaught TypeError: Assignment to constant variable.
    at <anonymous>:1:2
```

Cũng là blocked-scope (phạm vi sử dụng trong scope mà nó được khai báo) nhưng `let` keyword lại trái ngược với `const`, let dùng để khai báo các biến có thể thay đổi (mutable variable).

```
let name = "Said"
name = "Rick"
console.log(name)
Rick
```

## 2. Arrow functions
Với cách viết arror functions những đoạn code sẽ được làm tinh gọn, dễ đọc và có cấu trúc hơn kiểu viết cũ. Ta so sánh 2 cách viết sau: 

```
// ES5
function myFunc(name) {
    return 'Hello ' + name;
}

console.log(myFunc('John'));
```


```
// ES6
const myFunc = name => {
    return `Hi ${name}`
}

console.log(myFunc('John'));
```

Tương tự ta cũng có thể sử dụng arrow function cùng với map, filter, reduce

```
// ES5
const myArray = [1, 2, 3];
let newArray = myArray.map(function(item){
    return item*item;
});
console.log(newArray); //(3) [1, 4, 9]

//ES6
let otherArray = myArray.map(item => item*item)
console.log(otherArray); //(3) [1, 4, 9]
```

## 3. Template Literals
Thay vì sử dụng biểu thức cộng để nối string hay đưa biến vào trong string thì với ES6 chúng ta có thể đưa biến vào chuỗi string bằng cách đặt trong biểu thức sau `${your variable}`

```
//ES5
function myFunc(name, age){
    return 'Hi ' + name + ' your age is ' + age + ' years old!';
}

console.log(myFunc('Peter',22));

//ES6
const myFunc = (name, age) => {
    return `Hi ${name} your age is ${age} years old!`
}

console.log(myFunc('Peter',22));
```

Đối với mình đây là một cải tiến đáng kể giúp cho developer cảm thấy thoải mái hơn rất nhiều so với cách viết "+" trước đây. Kiểu viết này giống với hầu hết các ngôn ngữ back-end hiện nay.

## 4. Default parameters
Default parameters thực sự rất hữu khi ích trong trường hợp chúng ta truyền thiếu params vào function vì một lí do nào đó. Khi sử dụng default parameters chương trình sẽ không bắn ra lỗi khi thiếu params mà thay vì đó nó sẽ gọi đến giá trị default đã được khai báo.

```
const myFunc = (name, age = 22) => {
    return `Hi ${name}, your age is ${age} years old!`
}

console.log(myFunc('Peter')); // Hi Peter, your age is 22 years old!
```

## 5. Array and object destructing
ES6 cho phép chúng ta gán các thuộc tính của đối tượng vào mảng hay hash một cách đơn giản hơn bao giờ hết.
Chúng ta cùng xem 2 ví dụ sau đây để so sánh sự tiện lợi giữa ES5 và ES6 nhé 

```
//ES5
const contacts = {
    name: 'said',
    familyName: 'Hayani',
    age: 22
}
let name = contacts.name;
let familyName = contacts.familyName;
let age = contacts.age;
console.log(name); //said
console.log(familyName); //Hayani
console.log(age); //22
```

```
//ES6
const contacts = {
    name: 'said',
    familyName: 'Hayani',
    age: 22
}
let{name, familyName, age} = contacts
console.log(name) //said
console.log(familyName) //Hayani
console.log(age) //22
```

Rõ ràng có thể thấy với ES5 chúng ta phải chỉ định từng giá trị cho biến, trong khi đó ES6 ta chỉ cần đặt các biến trong dấu `{}` và gắn thằng chúng cho object luôn và giá trị tương ứng của các thuộc tính sẽ được set cho các của của chúng ta trong cặp dấu `{}`. 

*Note: Các biến được gán giá trị phải cùng tên với tên các property nếu không nó sẽ trả về undefined. Tuy nhiên nếu như trong trường hợp bạn muốn đổi tên biến khác với tên thuộc tính bạn có thể dử dụng dấu `:` đi sau tên thuộc tính để đổi tên biến nhé.*

```
//ES6
const contacts = {
    name: 'said',
    familyName: 'Hayani',
    age: 22
}
let{name:otherName, familyName, age} = contacts
console.log(otherName) //said
```
 Tương tự ta cũng có thể sử dụng với array.
  
## 6. Import and export
Để cấu trúc chương trình một cách khoa học và hiện đại chúng ta cần tách các thành phần có cùng tính chất lại vào những module khau nhau, sau đó chia sẻ hay tái sự dụng chúng bằng cách `import` hay `export` giữa các file với nhau.

* `export`: cho phép export module tới những javascript component khác
* `import`: cho phép import module khác tới component hiện tại

Giả sử ở file `detailComponent.js` ta cần export function `detail` sau:
```
//ES6
//detailComponent.js
export default function detail(name, age){
    return `Hello ${name}, your age is ${age} year old!`
}
```

Giờ ta cùng import function `detail` vào file `homeComponent.js` nhé 
```
//homeComponent.js
import detail from './detailComponent'
console.log(detail('said', 20))
```

Để import nhiều module ta có thể đặt chúng trong cặp dấu `{}`
```
import {detail, userProfile, getPosts} from './detailComponent'
```

## 7. Promises
Promises là một method mới được bổ sung ở ES6 cho phép viết code không đồng bộ. Nó thường được sử dụng khi ta fetch data từ API hoặc khi có một function cần thời gian để được thực thi. 

```
const myPromise = () => {
    return new Promise((resolve, reject) => {
        resolve('Hi the Promise execute successfully')
    })
}
console.log(myPromise())
```

## 8. Rest parameter and Spread operator
Rest parameter được dùng để get argument của một array sau đó trả về một array mới.

```
const arr = ['said', 20, 'JavaScript enthusiast', 'Hi', 'Said', 'How are you']
const [val1, val2, val3, ...rest] = arr;
const Func = (restOfArr) => {return restOfArr.filter(item => {return item}).join(" ")}
console.log(Func(rest))
```

## 9. Classes
Class là một trong những khái niệm cốt lõi của lập trình hướng đối tượng (OOP). Chúng làm cho những dòng code của bản được đóng gói và bảo mật. 
```
class MyClass {
    constructor(){
    
    }
}
```
Để tạo class ta đơn giản chỉ cần sử dụng `class` keyword trước tên class và cặp dấu `{}` đi kèm. 
```
class MyClass{
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

const user = new MyClass('said', 22)
console.log(user.name)
console.log(user.age)
```
Nếu muốn kế thừa một class cha nào đó ta sử dụng extends keyword theo sau tên class nhé.
```
class UserProfile extends MyClass{
    userName(){
        console.log(this.name)}
}
const profile = new UserProfile('said', 22)
profile.userName()
```

-----

Trên đây mình đã tổng hợp một số tính năng mới đối với phiên bản ES6, hi vọng có thể mang đến cho các bạn nhưng kiến thức thú vị và bổ ích. Chúc các bạn một ngày làm việc vui vẻ!

# III. Tài liệu tham khảo

1. [JavaScript ES6 — write less, do more](https://medium.freecodecamp.org/write-less-do-more-with-javascript-es6-5fd4a8e50ee2)
2. [What Is ES6 and What Javascript Programmers Need to Know](https://www.makeuseof.com/tag/es6-javascript-programmers-need-know/)
3. [ES6 for beginners](https://codeburst.io/es6-tutorial-for-beginners-5f3c4e7960be)