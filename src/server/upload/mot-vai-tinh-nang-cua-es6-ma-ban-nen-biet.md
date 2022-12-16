> ES6 mang đến nhiều tính năng hữu ích cho ngôn ngữ JavaScript. Một vài cú pháp trong đó giúp bạn viết code được ngắn gọn hơn và làm việc code JS trở nên thú vị hơn.
## let and const
Ở đây có 2 cách để khai báo 1 biến là dùng let hoặc const thay cho việc khai báo kiểu var.
### let 
let khái báo và có thể khởi tạo một biến trong một scope ở nơi nó khai báo. Một scope có thể ở phạm vi 1 module, một function hoặc đơn giản trong 1 block {} nào đó.
Scope định nghĩa phạm vi và sự tồn tại một biến. Một biến không được truy xuất từ bên ngoài scope chúng được khai báo.
Ví dụ về scope :
```javascript
let x = 1;
{ 
  let x = 2;
}
console.log(x); //1
```

Trong khi đó từ khóa var lại định nghĩa một biến và không kiểm tra scope của nó:

```javascript
var x = 1;
{ 
  var x = 2;
}
console.log(x); //2
```
### const
Từ khóa const lại mang đến javascript cách khai báo một biến constant. Một biến kiểu constant thì không được gán lại sau khi đã khởi tạo giá trị cho nó.
```javascript
const a = 5;
a=6; // error at here
```
## Modules
Trước khi có định nghĩa về modules thì một biến được khai báo bên ngoài bất cứ function nào sẽ là biến toàn cục.
Với modules, một biến khi khai báo bên ngoài bất cứ hàm nào sẽ được ẩn và không được nhìn thấy từ những modules khác trừ khi nó được export.
Export sẽ làm một hàm hoặc Object được nhìn thấy từ những modules khác. Trong ví dụ bên dưới, một hàm được export từ những modules khác nhau
```javascript
//module "./TodoStore.js"
export default function TodoStore(){}
//module "./UserStore.js"
export default function UserStore(){}
```
Import sẽ làm làm một function hoặc object, từ những modules khác nhau được nhìn thấy bởi modules nó gọi Import.
```javascript
import TodoStore from "./TodoStore";
import UserStore from "./UserStore";
const todoStore = TodoStore();
const userStore = UserStore();
```
## Spread/Rest
Dấu ... có thể dùng để lấy những phần từ bên trong một object ra ngoài hoặc để trích xuất phần còn lại của 1 parameter ra ngoài, dựa trên cách sử dụng chúng. 
Ví dụ về việc dùng để Spread (trích xuất những phần tử bên trong ra ngoài):
```javascript
const numbers = [1, 2, 3];
const arr = ['a', 'b', 'c', ...numbers];
console.log(arr);
["a", "b", "c", 1, 2, 3]
```
Tiếp theo ta có một ví dụ về cách lấy phần còn lại hay gọi là rest của một paramaters:
```javascript
function process(x,y, ...arr){
  console.log(arr)
}
process(1,2,3,4,5);
//[3, 4, 5]
function processArray(...arr){
  console.log(arr)
}
processArray(1,2,3,4,5);
//[1, 2, 3, 4, 5]
```
### arguments
arguments hơi khác so với spread và rest.
```javascript
function addNumber(total, value){
  return total + value;
}
function sum(...args){
  return args.reduce(addNumber, 0);
}
sum(1,2,3); //6
```
### Cloning
Spread operator có thể dùng được sao chép một Object hoặc một mảng một cách đơn giản và hiệu quả.
```javascript
const book = { title: "JavaScript: The Good Parts" };
//clone with Object.assign()
const clone = Object.assign({}, book);
//clone with spread operator
const clone = { ...book };
const arr = [1, 2 ,3];
//clone with slice
const cloneArr = arr.slice();
//clone with spread operator
const cloneArr = [ ...arr ];
```
### Concatenation
Spread operator còn có thể được dùng để tạo ra một Object mới từ việc nối 2 Object với nhau. Object có thể là kiểu Array hoặc là dạng Dict (key / value):
```javascript
const part1 = [1, 2, 3];
const part2 = [4, 5, 6];
const arr = part1.concat(part2);
const arr = [...part1, ...part2];
```
```javascript
const authorGateway = { 
  getAuthors : function() {},
  editAuthor: function() {}
};
const bookGateway = { 
  getBooks : function() {},
  editBook: function() {}
};
//copy with Object.assign()
const gateway = Object.assign({},
      authorGateway, 
      bookGateway);
      
//copy with spread operator
const gateway = {
   ...authorGateway,
   ...bookGateway
};
```
## Property short-hands
Ví dụ ta có một đoạn code như bên dưới :
```javascript
function BookGateway(){
  function getBooks() {}
  function editBook() {}
  
  return {
    getBooks: getBooks,
    editBook: editBook
  }
}
```
Ta có thể viết lại một cách ngắn gọn hơn như sau :
```javascript
function BookGateway(){
  function getBooks() {}
  function editBook() {}
  
  return {
    getBooks,
    editBook
  }
}
```
### Destructuring assignment
```javascript
function TodoStore(args){
  const helper = args.helper;
  const dataAccess = args.dataAccess;
  const userStore = args.userStore;
}
```
Đoạn code ở trên có thể được viết ngắn lại bởi dùng destructing như sau:
```javascript
function TodoStore(args){
   const { 
      helper, 
      dataAccess, 
      userStore } = args;
}
```
hoặc có thể destructing ngay ở parameters :
```javascript
function TodoStore({ helper, dataAccess, userStore }){}
```
### Default parameters
Ta có thể khai báo và khởi tạo một parameter  với biến mặc định như bên dưới:
```javascript
function log(message, mode = "Info"){
  console.log(mode + ": " + message);
}
log("An info");
//Info: An info
log("An error", "Error");
//Error: An error
```
### Template string literals
Một chuỗi mẫu là một chuỗi được bao bọc bởi dấu nháy `. Với chuỗi mẫu, ta có thể linh động trong việc xử lý chuỗi như bên dưới
```javascript
function log(message, mode= "Info"){
  console.log(`${mode}: ${message}`);
}
```
## Promises
> Một hàm dạng promise là một tham chiếu tới một lệnh được gọi bất đồng bộ. Nó có thể chạy thành công hoặc lỗi ở bất cứ nơi nào ở bất cứ thời điểm nào sau khi nó được gọi.
Hàm Promise dễ dàng được kết hợp với nhau. Như ví dụ bên dưới, nó dễ dàng được gọi một hàm sau khi tất cả các  lệnh được xử lý, có thể lỗi hoặc không.
```javascript
function getTodos() { return fetch("/todos"); }
function getUsers() { return fetch("/users"); }
function getAlbums(){ return fetch("/albums"); }
const getPromises = [
  getTodos(), 
  getUsers(), 
  getAlbums()
];
Promise.all(getPromises).then(doSomethingWhenAll);
Promise.race(getPromises).then(doSomethingWhenOne);
function doSomethingWhenAll(){}
function doSomethingWhenOne(){}
```
## Class
Class là một cách thức để tạo một Object với các thuộc tính, phương thức ta có thể tự định nghĩa.
```javascript
class Service {
  doSomething(){ console.log("doSomething"); }
}
let service = new Service();
service.doSomething();
```
### Kế thừa
Một class có thể được kế thừa từ những class khác. Ta dùng từ khóa extends cho việc đó như bên dưới :
```javascript
class Service {
  doSomething(){ console.log("doSomething"); }
}
class SpecialService extends Service {
  doSomethingElse(){ console.log("doSomethingElse"); }  
}
let specialService = new SpecialService();
specialService.doSomething();
specialService.doSomethingElse();
```
## Arrow functions
Arrow function có thể dùng để tạo một hàm ngay tại nơi nó được sử dụng. Chúng có thể được dùng khi tạo một hàm callback đơn giản một cách ngắn gọn.
```javascript
const titles = todos.map(todo => todo.title);
```
### this
Arrow function sẽ không có sở hữu this và tham số của nó. Mà nó dùng this của scope nới nó được tạo ra.
## Generators
Generators được dùng để tạo một objects mà ta có thể dùng next() trên nó. Ví dụ:
```javascript
function* sequence(){
  let count = 0;
  while(true) {
    count += 1;
    yield count;
  }
}
const generator = sequence();
generator.next().value;//1
generator.next().value;//2
generator.next().value;//3
```