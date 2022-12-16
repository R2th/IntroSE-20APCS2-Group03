Như đã trình bày trong bài viết về [hoisting](https://viblo.asia/p/tim-hieu-ve-es6-p1-hoisting-ORNZqO4q50n) khi khai báo biến với **var** ở phần 1. Vì vậy, để khắc phục vấn đề này thì trong ES6 đã cho ra mắt thêm 2 kiểu khai báo biến nữa đó là **let** và **const**. Chúng ta hãy cùng đi tìm hiểu xem sự khác biệt giữa let, var, const và cách khắc phục hoisting như nào nhé 

## 1. var
### 1.1 Phạm vi của var
Trước khi ES6 ra đời, **var** được sử dụng để khai báo biến, và nó là một **function scope**. Vậy **function scope** là gì ? Một biến thì luôn có phạm vi truy cập của nó, ở đây var có **phạm vi ảnh hưởng trong một function** và khi nó ra khỏi function thì var sẽ không còn tồn tại. Chúng ta hãy cùng xét ví dụ sau :

```
var x = 10;

function run() {
  if (false) {
    var y = 20;
  }
  console.log(y); // y = undefined
  console.log(x); // x = 10
}
run();

console.log(x); // x = 10
console.log(y); // y is not defined
```
Hãy cùng bắt đầu xét từ biến x trước nhé. Ở đây, biến x được khai báo ở phạm vi **global** và ta có thể truy cập vào nó ở bất cứ đâu, cho nên ở 2 lần console.log(x) đều cho ra kết quả x = 10. Còn biến y thì sao ? Biến y được khai báo bên trong 1 function, do vấn đề **hoisting** nên ở console.log(y) đầu tiền ta sẽ thấy kết quả là undefined. Còn với console.log(y) thứ 2 thì kết quả lại trả về là y is not defined, đây chính là **function scope**. Biến y chỉ có phạm vi ảnh hưởng trong một function nên khi ra khỏi function đó thì biến y sẽ không còn tồn tại.

### 1.2 Khai báo var
Biến var cho phép người dùng có thể khai báo 1 biến nhiều lần trong cùng scope và sẽ lấy kết quả của lần khai báo cuối cùng

```
var message = "hello baby";
var message = "Có làm thì mới có ăn"

console.log(message); // có làm thì mới có ăn
```

### 1.3 Vấn đề với var

Do biến var là function scope và cho phép khai báo nhiều lần trong cùng scope, nên đôi khi chúng ta sẽ có thể gặp trường hợp như sau

```
var x = 10;

if (true) {
    var x = 20;
}

console.log(x); // x = 20;
```
Nếu bạn muốn biến x sẽ được thay đổi như trên thì không có vấn đề gì xảy ra. Còn trong trường hợp ngược lại, khi số lượng code tăng lên hàng trăm hàng nghìn dòng thì việc kiểm soát khai báo biến sẽ trở nên khó khăn hơn, bạn sẽ không biết biến đó đã được khai báo trước đó hay chưa và liệu biến của mình có bị thay đổi bởi đoạn code của thằng nào đó do khai báo trùng hay không. Lúc này việc debug cũng trở nên khó khăn hơn.

## 2. let
### 2.1 Phạm vi của let
**let là block scope**. block scope được đánh dấu trong phạm vi cặp ngoặc nhọn {}. Và khi thoát khỏi block scope thì nó cũng bị mất đi.

```
let x = 10;
if (true) {
    let x = 5; // đây là biến x khác rồi nhé
    console.log(x); //5
}
console.log(x); // 10
```
Như vậy, ở lần khai báo biến thứ 2, biến x chỉ có phạm vi hoạt động trong hàm if nên nó không làm thay đổi biến x bên ngoài điều kiện if. 

Ngoài ra, khi khai báo ở global scope, thì từ khóa **var** tạo thuộc tính mới cho **global object**, còn từ khóa let thì không.
```
var x = 'global';
let y = 'global';

console.log(this.x); // global
console.log(this.y); // undefined
```

Bonus: các bạn hãy chạy thử đoạn code sau và xem sự khác biệt nhé
```
for (var i = 0; i < 5; i++) {
   setTimeout(function(){ 
      console.log(i);
   }, 1000);
}

for (let i = 0; i < 5; i++) {
   setTimeout(function(){ 
      console.log(i);
   }, 1000);
}

for (var i = 0; i < 5; i++) {
   callSetTimeOut(i);
}

function callSetTimeOut(i) {
    setTimeout(function(i){ 
      console.log(i);
   }, 1000);
}
```
Trong khuôn khổ bài viết này, mình xin phép không đi sâu vào giải thích vấn đề này. Gợi ý là do **sự khác biệt về scope giữa var và let**, cùng với **cơ chế bất đồng bộ** trong javascript . Các bạn có thể đọc và tìm hiểu kỹ hơn ở [đây](https://www.dotnetodyssey.com/2019/07/02/difference-between-var-and-let-keyword-in-javascript-in-calling-asynchronous-functions/)
### 2.2 Khai báo với let
let cho phép chúng ta thay đổi giá trị của biến tuy nhiên không cho phép người dùng khai báo hai lần trong cùng 1 scope,

```
TH1:
let x = "hello";
let x = "xin chào";
console.log(x); // Identifier 'x' has already been declared

TH2:
let x = "hello";
x = "xin chào";
console.log(x); // xin chào
```

### 2.3 Hoisting với let
Giống như var, khai báo let được nâng lên hàng đầu khi thực thi. Nhưng khác với var được khởi tạo là **undefined**, biến let không được khởi tạo. Vì vậy, nếu cố gắng sử dụng một biến let trước khai báo, bạn sẽ nhận được một Reference Error.

```
console.log(x);
let x = 10; // "Cannot access 'x' before initialization" thay vì "undefined" như với var
```

## 3 const
### 3.1 Phạm vi của const
cũng giống như **let**, const cũng là block scope

### 3.2 Khai báo với const
const không cho phép người dùng khai báo nhiều lần trong cùng scope, và cũng không cho phép người dùng cập nhật hay thay đổi giá trị của biến.

```
const msg = "konichiwa";
const msg = "hello"; // Identifier 'msg' has already been declared

const x = 10;
x = 15; // Assignment to constant variable
```
Chú ý: const mang ý nghĩa là ‘**constant**’ chứ không phải ‘**immutability**’. Nghĩa là các biến là object hay array, bạn vẫn có thể thay đổi giá trị bên trong của chúng.

```
Ví dụ 1:
const person = { name: 'giang' };
person.name = 'tuan giang';
person.age = 21;
console.log(person); // { name: 'tuan giang', age: 21};

Ví dụ 2:
const fruits = ['orange'];
fruits.push('apple');
console.log(fruits); // [ 'orange', 'apple' ];

Ví dụ 3: 
const fruits = ['orange'];
fruits = ['orange', 'apple'];
console.log(fruits); //Assignment to constant variable
```
 Gải thích: do object và array là các biến phức tạp, cho nên các biến này chỉ lưu lại địa chỉ của biến, còn giá trị của biến sẽ được lưu ở một nơi khác.
 
### 3.3 Hoisting với const
Cũng giống như let, các khai báo const được đưa lên đầu khi thực thi nhưng không được khởi tạo

## Kết luận
Chúng ta có thể rút ra một số kết luận như sau:<br/>
* var
    - Khai báo nhiều lần
    - Là function scope
    - Có thể bị hoisting khi sử dụng
    - Né sử dụng nhiều nhất có thể<br/>
* const
    - Khai báo một lần, không thể thay đổi giá trị
    - Là block scope
    - Không bị hoisting
    - const mang ý nghĩa là "constant" , không phải "immutablity"
    - Nên sử dụng như khai báo mặc định
* let
    - Khai báo một lần, cho phép thay đổi giá trị
    - Là block scope
    - Không hoisting
    - Nên sử dụng thay cho const khi phải thay đổi giá trị biến

Hy vọng, qua bài viết này có thể giúp các bạn phân biệt được let, var, const và biết cách sử dụng chúng sao cho phù hợp. Nếu có thắc mắc gì các bạn có thể bình luận phía bên dưới để cùng trao đổi thêm nhé!

**Link tham khảo:**<br/>
    * http://thaunguyen.com/blog/javascript/javascript-cach-su-dung-var-let-va-const<br/>
    * http://tuyendung.misa.com.vn/var-let-va-const-su-khac-nhau-trong-javascript-la-gi/<br/>
    * https://thefullsnack.com/posts/var-let-const.html<br/>
    * https://www.dotnetodyssey.com/2019/07/02/difference-between-var-and-let-keyword-in-javascript-in-calling-asynchronous-functions/<br/>