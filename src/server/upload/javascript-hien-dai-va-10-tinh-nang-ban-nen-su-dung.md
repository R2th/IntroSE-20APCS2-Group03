> Bài viết này chủ yếu hướng về đối tượng bạn đọc mới làm quen với JavaScript, hoặc sử dụng loại công cụ này một cách rời rạc trong khoảng 1 năm. Các tính năng được mô tả trong bài viết này là một vài recommendation khá ổn mà mình nghĩ nên được sử dụng hàng ngày, nếu bạn thực sự nghiêm túc về JavaScript.


# 1. Toán tử spread

Toán tử spread được kí hiệu là ```...``` trước một object hoặc 1 mảng, và đúng như tên gọi, toán tử này chuyển đối tượng từ một cấu trúc thành 1 danh sách được phân cách bằng dấu phẩy. Dưới đây là 1 ví dụ:
```js
let firstHalf = [ 'one', 'two'];  //["one", "two"]
let secondHalf = ['three', 'four', ...firstHalf];  //["three", "four", "one", "two"]
```

Kết quả trả về của đoạn code trên tương tự với đoạn code sau đây:
```js
let firstHalf = [ 'one', 'two'];  //["one", "two"]

let secondHalf = ['three', 'four'];  //['three', 'four']

for(var i=0, i <firstHalf.length; i++ ) {
  secondHalf.push(firstHalf[i]);
}
```

Toán tử này cũng được sử dụng đối với object để gộp thuộc tính của chúng:
```js
const hero = {
  name: 'Xena - Warrior Princess',
  realName: 'Lucy Lawless'
}
hero; //{name: "Xena - Warrior Princess", realName: "Lucy Lawless"}

const heroWithSword = {
 ...hero,
 weapon: 'sword'
}
heroWithSword; //{name: "Xena - Warrior Princess", realName: "Lucy Lawless", weapon: "sword"}
```

# 2. Rest parameter (tham số phần còn lại)
Rest parameters là cách mà chúng ta thu thập các tham số còn lại vào 1 mảng. JavaScript có khả năng linh hoạt về số lượng tham số đầu vào được cung cấp. Thông thường sẽ có 1 arguments variable để thu thập các tham số này. Hãy cũng xem ví dụ sau:

```js
function add(first, second, ...remaining) {
  return first + second;
}
```

Ở ví dụ trên, chúng ta chỉ tổng hợp được 2 tham số là ```first``` và ```second```. Điều đó có nghĩa là khi gọi ```add(1, 2)``` hay ```add(1, 2, 3, 4)``` sẽ trả về cùng 1 kết quả. Để tổng hợp toàn bộ các tham số truyền vào, ta làm như sau:
```js
function add(first, second, ...remaining) {
  return first + second + remaining.reduce((acc, curr) => acc + curr, 0);
}
```

# 3. Thêm vào chuỗi (string interpolation)
Chắc hẳn các bạn sẽ khá quen với đoạn code như sau:
```js
class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  getDescription() {
    return " Full description \n" + 
    " name: " + this.name + 
    " description: " + this.description
  }
}
```

Thứ mình muốn nói ở đây là phương thức ```getDescription()``` dài lê thê và khá khó đọc. Đây cũng là 1 ví dụ thực tế áp dụng với khá nhiều loại ngôn ngữ. Tuy nhiên, ngày nay có rất nhiều ngôn ngữ có các phương thức hỗ trợ string interpolation, và may thay, JavaScript cũng không phải ngoại lệ. Chúng ta có thể tùy biến lại hàm ```getDescription()``` như sau:
```js
getDescription() {
  return `Full description \n: 
  name: ${this.name}
  description ${this.description}
  `;
}
```
Ở đây, chúng ta sử dụng 2 dấu backticks để định nghĩa multi-line string, và dùng tổ hợp kí hiệu ```${}``` để chèn giá trị vào chuỗi.

# 4. Thuộc tính rút gọn
Có thể cũng nhiều bạn đã sử dụng đến cách viết này rồi. Ở ES5, chúng ta sẽ phải khai báo như sau:
```js
function createCoord(x, y) {
  return {
    x: x,
    y: y
  }
}
```
Tuy nhiên đối với ES6 trở đi, bạn có thể bỏ qua những gì ở bên phải dấu ```:``` nếu nó có cùng tên, giống như ví dụ sau:
```js
function createCoord(x, y) {
  return {
    x,
    y
  }
}
```

# 5. Thuộc tính là phương thức
Đây là cách thông thường mà chúng ta định nghĩa 1 thuộc tính trỏ tới 1 phương thức. Bên dưới là ví dụ sử dụng ES5:
```js
const math = {
  add: function(a,b) { return a + b; },
  sub: function(a,b) { return a - b; }, 
  multiply: function(a,b) { return a * b; }
}
```
Từ ES6 trở đi, chúng ta không còn phải thêm cú pháp ```[tên phương thức]:``` vào nữa, mà có thể định nghĩa thẳng như sau:
```js
const math = {
  add(a,b) { return a + b; },
  sub(a,b) { return a - b; },
  multiply(a,b) { return a * b; }
}
```

# 6. Destructuring (phá hủy)
## Object destructuring
Xét ví dụ sau:
```js
function handle(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const url = req.url;

  log('url endpoint', url);

  // lots of logic happening
  dbService.createPerson( name, description )
}
```
Đoạn code trên thực sự không hoàn hảo, nhưng nó tượng trưng cho trường hợp mà ta muốn khai thác dữ liệu từ một đối tượng ở các cấp độ khác nhau. Vấn đề ở đây là, sẽ thế nào nếu ta không cần phải định nghĩa rất nhiều biến và tiết kiệm được rất nhiều tổ hợp phím? Well, chúng ta có thể làm như sau:
```js
function handle(req, res) {
  const { body: { name, description }, url }, = req;

  log('url endpoint', url);

  // lots of logic happening
  dbService.createPerson( name, description )
}
```
Voila, đó là cách 3 dòng trở thành 1.

## Array destructuring
Hãy xem đoạn code sau:
```js
const array = [1,2,3,4,5,6]; 
array; //[1, 2, 3, 4, 5, 6]

const a = array[0];
a; //1

const c = array[2];
c; //3
```

Đoạn code trên có thể viết lại theo như sau:
```js
const array = [1,2,3,4,5,6];
const [a, ,c, ...remaining] = arr;.
// remaining = [4, 5, 6]
```
Chúng ta có thể tách từng giá trị trong mảng bằng cách khớp theo mẫu trên. Nếu muốn skip 1 giá trị, ta hoàn toàn có thể bỏ trống giá trị giữa cặp dấu ```,```.

## Parameter matching
Chúng ta cũng có thể thực hiện việc này trên 1 hàm và các tham số của nó. Đây có thể coi là 1 tiêu chuẩn thực tế để thu thập tất các các tham số của 1 đối tượng, khi mà bạn có nhiều hơn 2, 3 tham số trong 1 function:
```js
function doSomething(config) {
  if(config.a) { ... }
  if(config.b) { ... }
  if(config.c) { ... }
}
```
Cách tốt hơn để viết đoạn code trên:
```js
function doSomething({ a, b, c }) {
  if(a) { ... }
  if(b) { ... }
  if(c) { ... }
}
```

# 7. Phương thức cho mảng
ES6 cung cấp cho người dùng 1 loạt các phương thức cho mảng có thể sử dụng như:
* `find()`: tìm kiếm và trả về 1 phần tử trong list hoặc null
* `findIndex()`: tìm kiếm và trả về index của 1 phần tử
* `some()`: nhận định là true cho ít nhất 1 item có trong list
* `includes()`: xác định item có nằm trong list

Đoạn code sau đây minh họa cách sử dụng của các phương thức trên:
```js
const array = [{ id: 1, checked: true }, { id: 2 }];
arr.find(item => item.id === 2) // { id: 2 }
arr.findIndex(item => item.id === 2) // 1
arr.some(item => item.checked) // true

const numberArray = [1,2,3,4];
numberArray.includes(2) // true
```

# 8. Promises và Async/Await
Đã từng có 1 thời điểm, callbacks như dưới đây là tất cả những gì ta có:
```js
function doSomething(cb) {
  setTimeout(() =>  {
    cb('done')
  }, 3000)
}

doSomething((arg) => {
 console.log('done here', arg);
})
```
Chúng ta từng sử dụng cách viết như trên để xử lý một vài quá trình bất đồng bộ và cần thời gian để thực thi. Và rồi, thư viện promises ra đời và người ta bắt đầu sử dụng nó. Và bây giờ chúng ta có thể xử lý các tiến trình như sau:
```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() =>  {
      resolve('done')
    }, 3000)
  })
}

doSomething().then(arg => {
 console.log('done here', arg);
})
```

Thậm chí, ta còn có thể chain nhiều promise với nhau:
```js
getUser()
  .then(getOrderByUser)
  .then(getOrderItemsByOrder)
  .then(orderItems => {
    // do something with order items
})
```

## Async/await
Và rồi, khái niệm ```async/await```. Hãy thử tưởng tượng ví dụ trên với promise trở thành như sau:
```js
async function getItems() {
  try {
    const user = await getUser();
    const order = await getOrderByUser(user);
    const items = await getOrderItemsByOrder(order);
    return items;
  } catch(err) {
    // handle error here, the suggestion to return something or rethrow
  }
}

getItems().then(items => {
  // do something with order items
})
```
Và với cách viết này, chúng ta có 1 đoạn code bất đồng bộ với cú pháp đồng bộ.

# 9. Modules
Khá nhiều ngôn ngữ lập trình hỗ trợ khái niệm module. Khả năng phân chia code thành nhiều file chứa các đơn vị độc lập được được gọi là module. Hãy xét ví dụ sau:
```js
// math.js

export function add(a,b) { return a + b; }
export function sub(a,b) { return a - b; }

export default (a,b) => a * b;

// main.js
import mult, { add, sub } from './math';

mult(2, 4) // 8
add(1,1)   // 2
sub(1,2)   // -1
```

Ở trên chúng ta sử dụng từ khóa ```export``` để báo hiệu rằng các cấu trúc `add` và `sub` có sẵn công khai cho bất kì module nào import các module này. Từ khóa `export default` là những gì chúng ta có khi mới thực thi việc import. Trong file `main.js` chúng ta import phương thức mặc định có tên là `mult` và chúng ta cũng chỉ ra các phương thức đặc thù là `add()` và `sub()`

# 10. Arrow functions và từ khóa ```this```
## Arrow functions
Trong bài viết này mình có sử dụng arrow functions xuyên suốt, và thực tế đây chỉ là một cách viết khác cho function. Trong quá khứ chúng ta đã quen với cách khai báo sau:
```js
function printArray(arr) {
 // do something
}
```
Và ngày nay chúng ta có thêm cách khai báo sau:
```js
const printArray = (arr) => {
 // do something
}
```
Chúng ta còn có thể định nghĩa hàm trên 1 dòng như dưới đây:
```js
const add = (a,b) => a + b
```
Cách viết này mặc định có nghĩa là ta sẽ thực thi các phép toán và trả về kết quả. Chúng ta cũng có thể khai báo tương tự với 1 object, và cú pháp sẽ là:
```js
const create = (a,b) = > ({ x: a, y: b })
```

## Từ khóa `this`
Trong quá khứ, chúng ta từng đối mặt với vấn đề không biết `this` đang trỏ đến đâu:
```js
let array = [1,2,3];

function sum() {
  this.total = 0;

  arr.forEach(function(item) {
    this.total+= item;
  })
  return total;
} 
```
Trong ví dụ trên, `this` trỏ tới bên trong `forEach`. Để giải quyết vấn đề chúng ta có cách viết sau:
```js
function sum() {
  this.total = 0;
  var self = this;

  arr.forEach(function(item) {
    self.total+= item;  // now we are using `self`, it solves it but feels hacky
  })
  return total;
} 
```
Bây giờ, với sự ra đời của arrow functions, chúng ta sẽ không cần dùng đến biến `self` nữa:
```js
function sum() {
  this.total = 0;

  arr.forEach((item) => {
    this.total+= item;  // all is well `this` points to outer function
  })
  return total;
} 
```



-----

*Nguồn bài viết: [Modern JavaScript, 10 things you should be using, starting today](https://dev.to/itnext/modern-javascript-10-things-you-should-be-using-starting-today-22dp)*