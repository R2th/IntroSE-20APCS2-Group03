##  Mở đầu
Là một javascript deverloper, việc tạo các *functions* hay hàm là phổ biến và thường xuyên, nhưng để áp dụng một cách chính xác chúng ta cần phải hiểu bản chất về việc gọi hàm được thực hiện như thế nào và đặc biệt là biến `this` được dùng ra sao.

Lúc tôi mới tìm hiểu javascript và sau này khi đã làm quen với javascript thì vẫn còn nhiều sự nhầm lẫn và tò mò về cách gọi một *function* trong một chương trình javascript và tất nhiên trong đó có cả sự nhầm lẫn về việc sử dụng biến `this`, bây giờ chúng ta cùng tìm hiểu về *function* và biến `this` nhé.

## Cách gọi hàm nguyên thủy
Đầu tiên, chúng ta hãy xem cách gọi hàm nguyên thủy, đó là sử dụng function `call`.

1.  Tạo một hàm `hello` với một tham số đầu vào
2.  Gọi hàm vừa tạo bằng cách sử dụng function `call` với 2 tham số, chú ý ở đây là tham số đầu tiên được set với biến `this`
```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

hello.call("Viet Nam", "world") //=> Viet Nam says hello world
```

Với ví dụ ở trên, ta gọi function `hello` với biến `this` được set là  *Viet Nam*,  và 1 tham số *world*. Cách gọi hàm này là cách gọi nguyên thủy, chúng ta có thể xem những cách gọi hàm thường dùng như bây giờ (*hello(), ..*.) là được bắt nguồn và kế thừa từ cách gọi hàm nguyên thủy ở trên tức là sử dụng function `call`.

## Cách gọi hàm thường dùng trong một javascript program
Chắc chắn việc gọi hàm theo cách nguyên thủy(sử dụng function `call`) như trên
trong tất cả các tình huống là điều không phù hợp và dài dòng. Javascript cho chúng
ta gọi hàm sử dụng cú pháp dấu ngoặc tròn (`hello(world)`). Và chúng ta sẽ xem xét mối quan hệ giữa 2 cách gọi hàm như sau:

```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

// Cách gọi thông thường:
hello("world")

// Sẽ ngầm gọi theo cách gọi nguyên thủy:
hello.call(window, "world");
```

Ở trên chúng ta sẽ thấy nếu cách gọi thông thường sử dụng  cú pháp cặp ngoặc kép thì về bản chất javascript engine sẽ sử dụng function `call` và binding biến `this` vào tham số đầu tiên, biến `this` ở đây là ngữ cảnh mà ta gọi hàm `hello` chính là `window` global object.

**Nếu chúng ta sử dụng strict mode**
```js
"use strict";

// Cách gọi thông thường:
hello("world")

// Sẽ ngầm gọi theo cách gọi nguyên thủy:
hello.call(undefined, "world");
```

## Cách gọi hàm trong object - member functions

Cách gọi hàm phổ biến tiếp theo là gọi một method của object. Trong trường hợp này việc gọi hàm sẽ như sau:

```js
let country = {
  name: "Viet Nam",
  hello: function(thing) {
    console.log(this + " says hello " + thing);
  }
}

// Cách gọi thông thường:
country.hello("world")

// Sẽ ngầm gọi theo cách gọi nguyên thủy:
country.hello.call(country, "world");
```

Ở đoạn code trên, chúng ta attached method `hello` ngay khi tạo object `country`,
và giá trị của biến `this` lúc này chính là object `country`.

Nhưng nếu tạo method `hello` riêng lẻ và attach method đó vào object dynamically thì giá trị của biến `this` lúc này tùy vào ngữ cảnh mà ta gọi hàm đó, như ví dụ dưới đây:

```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

country = { name: "Viet Nam" }
country.hello = hello;

country.hello("world") // ngầm gọi theo cách nguyên thủy với biến this là country -> country.hello.call(country, "world")

hello("world") // ngầm gọi theo cách nguyên thủy với biến this là window "[object DOMWindow]world"
```

Qua đây, ta có thể thấy giá trị của biến `this` không được set khi khai báo hàm, mà được set dynamically lúc thực thi dựa trên ngữ cảnh gọi method đó.

## Sử dụng Function.prototype.bind
Trong một số trường hợp chúng ta cần set biến `this` bằng một giá trị cụ thể mà không muốn chúng thay đổi theo ngữ cảnh gọi nó. Để giải quyết vấn đề này, mọi người có thể sử dụng 1 trick là **closure** để chuyển đổi thành function với giá trị của biến  `this` không thay đổi theo ngữ cảnh.
```js
let country = {
  name: "Viet Nam",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

// binding giá trị của biến this là object country
var boundHello = function(thing) { return country.hello.call(country, thing); }

boundHello("world");
// kết quả console.log: Viet Nam says hello world
```

Ở đoạn code trên, khi gọi hàm `boundHello("world");` thì sẽ ngầm chuyển thành `boundHello.call(window, "world");` nhưng kết quả của chương trình trên vẫn là `Viet Nam says hello world`, điều đó cho thấy ngay cả khi chúng ta gọi hàm `boundHello` trong bất kì ngữ cảnh nào thì giá trị của biến `this` luôn là object `country`.

Qua những ví dụ và vấn đề nêu trên, việc bind giá trị cụ thể của biến `this` vào một method là rất cần thiết và phổ biến, thay vì sử dụng trick **closure** dài dòng ở trên thì phiên bản ES5 đã bổ sung method `bind` trên `Function` object, cho chúng ta bind một giá trị cụ thể của biến `this` vào trong function.

```js
var boundHello = country.hello.bind(country); // bind object country(this) vào method hello
boundHello("world") // "Viet Nam says hello world"
```

Chắc chắn kết quả của đoạn code này cũng giống với cách sử dụng trick closure, nhưng nhìn dễ đọc và thuận tiện hơn nhiều.

## Kết luận
Tìm hiểu qua những ví dụ ở trên đã cho chúng ta hiểu rõ hơn về bản chất của việc gọi hàm và cách binding biến `this` trong một chương trình javascript, hy vọng mọi người có thể apply chúng một cách hiệu quả trong các projects javascript của mình. Xin cám ơn!