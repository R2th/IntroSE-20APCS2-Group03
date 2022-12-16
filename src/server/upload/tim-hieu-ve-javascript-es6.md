### 1. Const and let
**const** là một từ khóa mới trong ES6 để khai báo các biến. **const** là mạnh mẽ hơn var. :)  Sau khi sử dụng, biến không thể được chỉ định lại. Nói cách khác, đó là một giá trị bất biến trừ khi nó được sử dụng với các đối tượng. :confounded::confounded::confounded:

Điều này thực sự hữu ích để sử dụng cùng với các **selector**. :+1:

Ví dụ: khi ta muốn có một nút duy nhất kích hoạt sự kiện hoặc khi bạn muốn chọn một phần tử HTML trong JavaScript, **hãy sử dụng const** thay vì var.:clap:
Điều này là bởi vì var có thể bị thay đổi giá trị. Chúng ta nên sử dụng **const** khi không muốn gán lại biến. 

```
// ES5
var my_btn = document.getElementById("my-btn");

// ES6
const my_btn = document.getElementById("my-btn");
```

Trong mã trên, **const** sẽ **không thể thay đổi** giá trị. Thế nên nếu bạn cố gắng gán cho nó một giá trị mới, nó sẽ trả về cho bạn một **lỗi**.

**let** có thể được chỉ định lại và nhận giá trị mới. Nó tạo ra một biến có thể thay đổi. 
**let** giống như const trong đó cả hai đều bị chặn phạm vi. Nó có nghĩa là biến chỉ có sẵn trong phạm vi của nó.

### 2. Arrow functions

**Arrow functions** thực sự tuyệt vời và làm cho mã của bạn dễ đọc hơn, có cấu trúc hơn và trông giống như mã hiện đại.:thinking::thinking::thinking:

```
// ES5
function myFunction(name) {
    return "Hello" + name
}

console.log(myFunction('Bay')) // output Hello Bay

// ES6
const myFunction = name =>{
    return `Hi ${name}`
}

console.log(myFunction('Nam')) // output Hi Nam

hoặc 

const myFunction = name => `Hi ${name}`

console.log(myFunction('Duy')) // output Hi Duy

```

Như bạn đã thấy cú pháp** arrow functions** có vẻ là rất dễ đọc và clear code hơn. Ta không cần phải sử dụng cú pháp cũ nữa. Thật là tuyệt vời phải không nào :D

Ngoài ra ta có thể sử dụng arrow functions với **map, filter và reduce.**

```
// ES5
const myArray = ['Bay', 'Duy', 'Nam']

let arr_es5 = myArray.map(function(value) {
    return `Hi ${value}`;
});

console.log(arr_es5); // output ['Hi Bay', 'Hi Duy', 'Hi Nam']

// ES6
let arr_es6 = myArray.map(value => `Hello ${value}`);
console.log(arr_es6) // output ['Hello Bay', 'Hello Duy', 'Hello Nam']

```

Một sự khác biệt rất rõ ràng. Ta hoàn toàn có thể áp dụng cho những phần khác như filter hay reduce.:scream:

### 3. Template Literals
Là một cách rất hay giúp chúng ta không phải sử dụng toán tử dấu cộng (+) để nối chuỗi hoặc khi chúng ta muốn **sử dụng một biến trong chuỗi**.:triumph:

```
// ES5
function myFunction(name, age) {
    return 'Hi ' + name + '! Your age is ' + age + ' year old.'; 
}

console.log(myFunction('Bay', 22)); // output Hi Bay! Your age is 22 year old.

// ES6
const myFunction(name, age) {
    return `Hi ${name}! Your age is ${age} year old.`;
}

console.log(myFunction('Bay', 22)); // output Hi Bay! Your age is 22 year old.

```
Thật là sự khác biệt rất lớn khi ta làm việc với chuỗi trong javascript. Kĩ thuật này cũng được áp dụng cho rất nhiều ngôn ngữ khác như **Ruby, PHP hay Java**. :clap::clap::clap:

### 4. Default parameters
Khi chúng làm việc trong ngôn ngữ Ruby, PHP, hay Java, chúng ta thường sử dụng các tham số mặc định. Nó cho phép ta không cần chuyền tham số khi sử dụng và nó sẽ nhận giá trị mặc định được định sẵn và không trả về lỗi.
```
const myFunction = (name, age)=> {
    return `Hello ${name} your age is ${age} year old?
}

console.log(myFunction('Bay')); // output Hi Bay! Your age is undefined year old?
```

Hàm trên trả về chuỗi có age không xác định vì ta chưa chuyền giá trị cho nó. Nhưng nếu ta trả về giá trị mặc định thì giá trị mặc định đó sẽ được sử dụng.

```
const myFunction = (name, age = 22) {
    return `Hello ${name} your age is ${age} year old?
}

console.log(myFunction('Bay')); // output Hi Bay! Your age is 22 ear old?
```

### 5. Xóa array and object

```
// ES5
const = contacts = {
    name: 'Bay',
    address: 'Ha Noi'
}

let name = contacts.name
let address = contacts.address

// ES6
const contacts = {
    name: 'Bay',
    address: 'Ha Noi'
}
let {name, address} =  constacts
```
Với ES5, chúng ta phải **gán từng giá trị cho từng biến.** Với ES6, chúng ta chỉ cần **đặt các giá trị của mình trong dấu ngoặc nhọn** để lấy bất kỳ thuộc tính nào của đối tượng.

Lưu ý: nếu bạn chỉ định một biến không trùng với tên của thuộc tính, nó sẽ trả về không xác định. Ví dụ: nếu tên của thuộc tính là name và chúng ta gán nó cho một username biến, nó sẽ trả về không xác định. Chúng ta luôn phải đặt tên cho biến giống như tên thuộc tính của đối tượng. Nhưng trong trường hợp chúng ta muốn đổi tên biến, chúng ta có thể sử dụng dấu hai chấm : thay thế.

```
const contacts = {
    name: 'Bay',
    address: 'Ha Noi'
}

let {name:username, address} =  constacts
```

Đối với mảng, chúng tôi sử dụng cú pháp tương tự như đối tượng. Chúng ta chỉ cần thay thế dấu ngoặc nhọn bằng dấu ngoặc vuông.
```
const arr = ['Bay', 'Duy', 'Nam'];

let[name_bay, name_duy, name_name] = arr;
```

### 6. Import và export.
Chúng cho phép ta tạo các thành phần riêng biệt và có thể tái sử dụng. Nếu bạn từng làm việc với **JavaScript MVC** nào, bạn sẽ thấy rằng họ sử dụng **import** và **export** để xử lý hầu hết các thành phần. Vậy làm thế nào để họ thực sự làm việc?
Nó đơn giản! **export** cho phép bạn xuất một mô-đun để sử dụng trong một thành phần JavaScript khác. **Import** để xử dụng mô-đun đó khác trong thành phần của chúng ta. :facepunch::facepunch::facepunch:

VD: Ta có 2 file:

```
// detailComponent.js
export default function detail(name, age) {
    return `Hello ${name}, your age is ${age} year old!`;
}
```
bây giờ ta muốn sử dụng method detail trong file homeComponent.js
ta phải sử dụng import.

```
import {detail} from './detailComponent' 

// homeComponent.js
console.log(detail('Bay', 22)); // output Hello Bay! Your age is 22 ear old!
```

### 7. Promises
**Promises** là một tính năng mới của ES6. Đây là một phương pháp để viết mã không đồng bộ. Nó có thể được sử dụng khi : "chúng ta muốn tìm nạp dữ liệu từ API hoặc khi chúng ta có một chức năng cần có thời gian để được thực thi. Promises giúp giải quyết vấn đề dễ dàng hơn.:heart_eyes_cat::heart_eyes_cat:
```
const myPromise=() =>{
    return new Promise((resolve, reject)=>{
        resolve('Hi the Promise execute successfully');
    })
}
```
Trên chỉ là một trường hợp có thể sử dụng promises. **Promises còn rất nhiều **thứ mình sẽ tìm hiểu trong bài viết sau.

### 8.  Spread operator
Khi ta định nghĩa một hàm thì nhưng tham số truyền vào có thể không có giới hạn và tham số này sẽ được chuyển vê thành một mảng. Bởi vậy ta có thể sử dụng cách này để lấy ra một mảng các tham số thay vì sử dụng vòng lặp for hoặc cách nào khác.

```
const arr = ['Bay', 'Duy', 'Nam'];
const[a,...rest] = arr;

const Func = (arr)=>{
    return arr.filter(item=>{return item}).join("");
}

console.log(Func(rest)) // output ["Duy", "Nam];

hoặc

const Func = (...arr)=>{
    return arr;
}

console.log(Func(rest)) // output ["Duy", "Nam];
```

Trên đây là những tính năng ES6 mà mình muốn giới thiệu tới các bạn. Bài viết còn nhiều thiếu sót rất mong các bạn góp ý ở comment bên dưới. (thankyou).

### 9. Tài liệu tham khảo :sleeping::sleeping::sleeping:
https://www.freecodecamp.org/news/write-less-do-more-with-javascript-es6-5fd4a8e50ee2/