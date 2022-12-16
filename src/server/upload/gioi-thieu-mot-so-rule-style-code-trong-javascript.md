Chào cả nhà!
Chuyện là lâu nay vẫn code js theo quán tính, code chạy đúng logic là được. Gần đây mới quán tâm đến rule khi code js và cũng tìm được một số rule mà dân mạng bảo là style phổ biến được các đồng nghiệp code js dùng. Nên mình xin giới thiệu đến các bạn, hi vọng sẽ giúp code các bạn code ra trong pro hơn.

* **Sử dùng 2 space cho indent.**
```
function hello (name) {
  console.log('hi', name) //indent is 2 space
}
```
* **Sử dụng nháy đơn "'"cho string**
```
console.log('hello there')    // ✓ ok
console.log("hello there")    // ✗ avoid
console.log(`hello there`)    // ✗ avoid
 
$("<div class='box'>")        // ✓ ok
console.log(`hello ${name}`)  // ✓ ok
```
* **Thêm một space sau keyword của js**
```
if (condition) { ... }   // ✓ ok
if(condition) { ... }    // ✗ avoid
```
* **Thêm một space trước dấu mở ngoặc đơn trong định nghĩa function**
```
function name (arg) { ... }   // ✓ ok
function name(arg) { ... }    // ✗ avoid
 
run(function () { ... })      // ✓ ok
run(function() { ... })       // ✗ avoid
```
* **Luôn sử dụng '===' thay cho '=='**
Ngoại lệ: obj == null được cho phép để kiểm tra null hoặc undifined
```
if (name === 'John')   // ✓ ok
if (name == 'John')    // ✗ avoid
```
```
if (name !== 'John')   // ✓ ok
if (name != 'John')    // ✗ avoid
```
* **Trước và sau toán tử Infix là space**
```
// ✓ ok
var x = 2
var message = 'hello, ' + name + '!'
```
```
// ✗ avoid
var x=2
var message = 'hello, '+name+'!'
```
* **Sau dấu ',' là một space**
```
// ✓ ok
var list = [1, 2, 3, 4]
function greet (name, options) { ... }
```
```
// ✗ avoid
var list = [1,2,3,4]
function greet (name,options) { ... }
```
* **Giữ các câu lệnh else trên cùng dòng với dấu ngoặc nhọn của chúng.**
```
// ✓ ok
if (condition) {
  // ...
} else {
  // ...
}
```
```
// ✗ avoid
if (condition) {
  // ...
}
else {
  // ...
}
```
* **Câu lệnh if nhiều dòng phải dùng dấu ngoặc nhọn '{  }'**
```
// ✓ ok
if (options.quiet !== true) console.log('done')
```
```
// ✓ ok
if (options.quiet !== true) {
  console.log('done')
}
```
```
// ✗ avoid
if (options.quiet !== true)
  console.log('done')
```
* **Luôn xử lý tham số err của function**
```
// ✓ ok
run(function (err) {
  if (err) throw err
  window.alert('done')
})
```
```
// ✗ avoid
run(function (err) {
  window.alert('done')
})
```
* **Nhiều dòng trắng liên tiếp là không được phép**
```
// ✓ ok
var value = 'hello world'
console.log(value)
```
```
// ✗ avoid
var value = 'hello world'
 
 
console.log(value)
```
* **Đối với toán tử 3 ngôi được viết trên nhiều dòng thì '?' và ':' ở đầu dòng**
```
// ✓ ok
var location = env.development ? 'localhost' : 'www.api.com'
 
// ✓ ok
var location = env.development
  ? 'localhost'
  : 'www.api.com'
 
// ✗ avoid
var location = env.development ?
  'localhost' :
  'www.api.com'
```
* **Thêm space bên trong single block**
```
function foo () {return true}    // ✗ avoid
function foo () { return true }  // ✓ ok
```
* **Sử dụng camelcase cho tên biến và tên function**
```
  function my_function () { }    // ✗ avoid
  function myFunction () { }     // ✓ ok
 
  var my_var = 'hello'           // ✗ avoid
  var myVar = 'hello'            // ✓ ok
```
Trên đây là một số rule mình giới thiệu đến các bạn, hi vọng các bạn sẽ áp dụng khi code để code trong pro hơn nhé.
Ngoài ra còn một rất nhiều rule khác, các bạn có thể tham khảo [ở đây](https://standardjs.com/rules.html)