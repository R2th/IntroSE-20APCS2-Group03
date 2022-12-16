Trong bài này chúng ta sẽ cùng điểm qua 1 vài tính năng nổi bật của ES6
## 1. let và const
Thông thường chúng ta khai báo biến trong JavaScript bằng ***var***
Ví dụ:
```
var foo = 1
function printFoo(partyStartedYet) {
  if (partyStartedYet) {
    var foo = 2
  }
  return foo
}
console.log(printFoo(true)) // 2
```
```
var foo = 1
function printFoo(partyStartedYet) {
  if (partyStartedYet) {
    var foo = 2
  }
  return foo
}
console.log(printFoo(false)) // undefined
```
Với biến khai báo bởi var sẽ có tầm vực bên trong hàm gần nhất (function scope), và nó được đẩy lên đầu của tầm vực. Do đó mà ở đoạn code thứ 2, foo lại có giá trị là *undefined*
ES6 đã cung cấp let và const như hai cách khai báo biến mới, chúng hỗ trợ tầm vực theo khối (block scope) 

```
let foo = 1
function printFoo(partyStartedYet) {
  if (partyStartedYet) {
    let foo = 2
    console.log('Value of foo in scope', foo) // 2
  }
  console.log('foo is out of block scope', foo) // 1
  return foo
}
console.log(printFoo(false)) // 1
console.log(printFoo(true)) // 1
```
Với const,  chúng ta không thể gán lại giá trị mới cho biến sau khi nó được khai báo, tuy nhiên với let thì có thể.

```
let foo = 1
foo = 5
console.log(foo) // 5

const bar = 2
baz = 6 // get err
```
Chúng ta xem xét ví dụ sau:
```
const obj = { foo: 1 }
obj.foo = 2
obj.bar = 3
console.log(obj) // { foo: 2, bar: 3 }

const arr = [1]
arr.push(2)
console.log(arr) // [1, 2]
```
Có vẻ mâu thuẫn nhỉ, không thể gán lại giá trị mới cho biến cơ mà.
Lý do là const mang ý nghĩa “constant” chứ không phải "immutability". Điều đó có nghĩa là với các biến là object hay array, giá trị bên trong của chúng có thể được thay đổi.
```
// Như này mới ko đc
obj = { bar: 10 } // get error: Assignment to constant variable.
arr = [] // get error: Assignment to constant variable.
```
## 2. arrow functions
Đây là kiểu cú pháp ngắn gọn khi khai báo hàm thay cho việc sử dụng *function*
Cùng xem ví dụ nữa nhé:
```
function total(x, y) {
  return x + y
}

var total = function(x, y) {
  return x + y
}
```
Trong ES6, chúng ta có thể viết lại như sau:
```
const total = (x, y) => {
  return x + y
}
```
Hay ngắn gọn hơn nữa
```
const total = (x, y) => x + y
```
## 3.destructuring 
Đây là tính năng cực kỳ tiện dụng của ES6, nó giúp chúng ta tách biến từ thuộc tính của đối tượng hay là các phần tử của đối tượng
Ví dụ:
```
const employee = { name: 'Obama', salary: 1000, age: 21 }
const { name } = employee
console.log(name) // 'Obama'

const arr = [1, 2, 3]
const [first, second] = arr
console.log(first, second) // 1, 2

const str = 'Framgia'
const [first, second] = str
console.log(first, second) // 'F', 'r'
```
Chúng ta cũng có thể destructuring các thuộc tính nested
```
const employee = [
  {
    name: 'Trump',
    age: 21,
    missions: [{ name: 'Make US great again', time: 5 }, { name: 'ABCXYZ', time: 1000 }]
  }
]

const [{ missions: [{ time }] }] = employee
console.log(time) // 5
```
Tạm dừng ở đây, trong bài sau chúng ta sẽ tiếp tục chủ đề này nhé