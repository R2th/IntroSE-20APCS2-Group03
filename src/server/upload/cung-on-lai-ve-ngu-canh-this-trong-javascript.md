**This**  trong **javascript** biểu thị ngữ cảnh (context) của **function**, mỗi khi ta gọi từ khoá **this** trong một **function**, ta đang tham chiếu tới đối tượng "ngữ cảnh" của **function** đó. **This** trong **javascript** không hề giống hoàn toàn các ngôn ngữ khác, đồng thời có sự thay đổi khi chúng ta thiết lập **strict mode**.  
Trong đa số trường hợp, giá trị của **this**  được xác định bởi cách chúng ta gọi **function**. Nó không thể được chỉ định trong quá trình thực thi, và cũng có thể khác nhau mỗi lần mà **function** được gọi. Từ **Javascript** **ES5** chúng ta có hàm **bind** cho phép chỉ định ngữ cảnh cụ thể của một **function**. Và từ **ES6** ta có thêm **Arrow function** - **function** không cung cấp khả năng ràng buộc ngữ cảnh **this**.  
```js
const testObject = {
  prop: 24,
  func: function() {
    return this.prop;
  },
};

console.log(testObject.func());
// output: 24
```
####  Ngữ cảnh toàn cục (global)  
Trong một ngữ cảnh toàn cục (không thuộc **function** nào), từ khoá **this** luôn tham chiếu tới đối tượng toàn cục, trong môi trường runtime là trình duyệt, **this** sẽ tham chiếu tới đối tượng **window**.  
```js
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)
```
> Một lưu ý là chúng ta có thể tham chiếu tới object toàn cục ở bất cứ đâu bằng cách sử dụng từ khoá [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)    
  
 #### Ngữ cảnh Function  
 Bên trong **function**,  giá trị của **this** phụ thuộc vào cách mà **function** đó được gọi.  
 
 ##### Function được gọi thông thường  
 Nếu ta không chỉ định **strict mode**, **this** vẫn sẽ chỉ định tới tới đối tượng toàn cục.  
 ```js
 function checkContext() {
  return this;
}

// browser:
checkContext() === window; // true

// nodejs:
checkContext() === global;
 ```
 Còn nếu chúng ta chỉ định **strict mode**, nếu giá trị của **this** không được chỉ định, nó sẽ nhận giá trị là **undefined**.  
 ```js
 function checkContext() {
  'use strict'; // see strict mode
  return this;
}

checkContext() === undefined;
 ```
Trong trường hợp này, ta cần chỉ định ngữ cảnh cho **function**, bằng cách sử dụng 2 từ khoá **call** hoặc **apply**, ví dụ:  
```js
var obj = {a: 'Custom'};

// This property is set on the global object
var a = 'Global';

function whatsThis() {
  return this.a;  // The value of this is dependent on how the function is called
}

whatsThis();          // 'Global'
whatsThis.call(obj);  // 'Custom'
whatsThis.apply(obj);
```  
##### Phương thức bind  
Phiên bản **ES5** đã giới thiệu phương thức **bind**, cho phép tạo ra một **function** từ một **function** sẵn có, cho phép chỉ định ngữ cảnh của **function**.  
```js
function showName() {
  return this.name;
}

var g = showName.bind({name: 'test'});
console.log(g()); // test

var h = g.bind({a: 'test2'}); // bind only works once!
console.log(h()); // test
```
##### Arrow Function  
Đối với **arrow function**, **this**  tham chiếu tới ngữ cảnh chứa đựng nó, tức là **arrow function** không bao giờ sinh ra ngữ cảnh mới, kể cả khi ta sử dụng các phương thức chỉ định như **bind**, **call**, hay **apply**.  
```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject);
// true
```
##### Function là phương thức trong Object  
Khi một **fucntion** được sử dụng như một phương thức trong một **object**, ngữ cảnh **this** tham chiếu tới đối tượng mà phương thức đó được gọi, và không bị ảnh hưởng bởi cách chúng ta khai báo **function**.
```js
var obj = {
  prop: 37,
  func: function() {
    return this.prop;
  }
};

console.log(obj.func()); // 37
```
##### Sử dụng this trong constructor  
Khi một **function** được sử dụng như một hàm **constructor** (sử dụng từ khoá **new**), ngữ cảnh **this** của nó được ràng buộc với đối tượng mới vừa được sinh ra:  
```js
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // 37


function C2() {
  this.a = 37;
  return {a: 38};
}

o = new C2();
console.log(o.a); // 38
```
##### Sử dụng this trong hàm xử lý sự kiện DOM  
Khi một **function** được sử dụng như một hàm xử lý sự kiện, ngữ cảnh **this** của nó được chỉ định tới đối tượng đặt phương thức lắng nghe sự kiện.  Ví dụ:  
```js
function handler(e) {
  console.log(this === e.currentTarget); // true
  this.style.color = '#989898';
}

var elements = document.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handler, false);
}
```
Tham khảo tại [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)