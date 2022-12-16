# Lập trình Prototype trong Javascript

Javascript là một ngôn ngữ lập trình hướng đối tượng; tuy nhiên không giống với các ngôn ngữ hướng đối tượng mà bạn đã từng làm việc (C++, Java, C#, Ruby, python...). Các ngôn ngữ này hướng đối tượng theo kiểu `class-based`. Trong đó bạn sẽ phải define các `Class`, `attribute`, `method` và khởi tạo các object từ class đó. Tất cả các object được khởi tạo từ cùng 1 class sẽ có cùng một quyền access đến các phương thức ở `class-level` (hoặc các `static method`). Mỗi một object được phân biệt với nhau bởi chính tên biến lưu trữ nó, các attributes và phương thức cũng sẽ y hệt nhau. Hướng đối tượng trong javascript thì khác!

## Sự khác biệt của Javascript
`Javascript` cũng là hướng đối tượng, tuy nhiên thay vì đi theo hướng `class-based` thì Javascript lựa chọn `prototype-based`, theo đó quy định lại toàn bộ các rules trong khởi tạo đối tượng, shared resources access level và cả việc quyết định cách thức để thừa kế một phương thức nữa. Javascript về mặt khác giống như một ngôi ngữ tuần prototype hơn (https://en.wikipedia.org/wiki/Prototype-based_programming#Languages_supporting_prototype-based_programming)

Trong một ngôn ngữ hướng đối tượng `prototype-based`, bạn sẽ có cảm giác như Class bị lãng quên; lý do đơn giản vì nó chưa từng tồn tại cho đến trước khi es6 ra đời. Thay vì xây dựng một Class với các method, property thì với Javascript bạn chỉ có object, và mỗi object lại có cho riêng mình một `schema` nữa. (Lưu ý lại chút là với các ngôn ngữ hướng đối tượng khác thì các object được khởi tạo từ cùng 1 class sẽ share chung schema, nhưng trong JS thì mọi object đều sở hữu schema của riêng mình).
Trong Javascript, cách để xây dựng mối quan hệ giữa các object đó là tự xây dựng một kiến trúc object-to-object. Điều đó có nghĩa là bạn hoàn toàn có thể tạo ra một object mới từ một object có sẵn, object mới này sẽ được kế thừa toàn bộ các property và method từ object ban đầu.

Việc kế thừa từ `Class` không hề tồn tại trong Javascript. Khi một object mới tạo ra không có method mà bạn cần thì việc quyết định gọi method đó sẽ được ủy quyền (delegate) cho object ban đầu (object cha). Khái niệm `prototype` sinh ra từ đây và nó cũng là khởi nguồn cho tên `prototypal programming`

Điều thú vị là `Prototypal programming` trong Javascript thực ra lại rất dễ. Nhiều người có xu hướng làm phức tạp vấn đề hơn là nó vốn có chỉ vì họ không quen làm việc với `prototype`. Hãy cùng xem một ví dụ nhé:

```
var a = {
    name: 'Foo',
    alertMe: function() {
        alert('Foo!');
    }
};
 
var b = Object.create(a);
 
b.name;       // Foo
b.alertMe();  // alert with 'Foo!'
```

Trong ví dụ này chúng ta khởi tạo một object đơn giản `a` chứa 1 property và 1 method. Đây là 1 dạng object thường thấy và không có gì đặc biệt. Tuy nhiên hãy cùng theo dõi đến đoạn tiếp theo. Chúng ta sử dụng `Object.create()` để tạo một object mới (`b`) từ chính object `a`.

Kể từ thời điểm tạo xong thì `b` sẽ có prototype và có quyền access đến prototype của chính nó. Do đó từ `b` ta có thể trực tiếp gọi đến các method hoặc property đã được định nghĩa từ `a`. Sự liên kết từ object con tới object cha này được gọi là `protoype chain`. Khi chúng ta cần gọi một method không tồn tại từ một object thì quá trình tìm kiếm sẽ tiếp tục cho đến khi method được tìm thấy tại một object nào đó hoặc khi kết thúc `chains`.

Trong trường hợp đã kết thúc `chains` hoặc quá trình tìm kiếm không trả về kết quả nào thì kết quả trả về sẽ là `undefined`.

Trong ví dụ bên trên thì `b` không hề có property nào tên là `alertMe`, do đó quá trình tìm kiếm sẽ được chuyển sang thực hiện ở object `a`. Đây chính là sự khác biệt giữa Javascript với các ngôi ngữ `class-based` khác.

Có thể bạn sẽ thắc mắc là liệu `a` có được kế thừa từ object nào không? Câu trả lời là có nhé. Tại root của bất kỳ một chain nào thì tất cả các object đều kế thừa từ `Object.prototype`. Đó là lý do vì sao tất các object đều có các method mặc định như `hasOwnProperty()`, `valueOf()`, `toString()`

Quay trở lại ví dụ của chúng ta. Một câu hỏi đặt ra là liệu chúng ta có thể thiết lập thêm method cho object `b` không? (tất nhiên là có nhé)

```
b.bar = "bar";
 
b.bar;  // bar
a.bar;  // undefined
```
như bạn đã thấy thì chúng ta vừa thêm property `bar` cho object `b` và có thể access đến property đó từ `b`. Và hiển nhiên là property `bar` sẽ không thể được access từ `a` bởi vì `a` là object cha và chúng ta không hề thiết lập property `bar` cho `a`.

Ngược lại nếu chúng ta thiết lập `bar` cho `a` thì ta có thể access đến `bar` ngay cả từ `a` và `b`

```
a.bazbar = "bazbar";
 
a.bazbar;  // bazbar
b.bazbar;  // bazbar
```
## Đa hình

Chúng ta đã cùng xem ví dụ về việc kế thừa (ủy quyền) trong object, thế còn với tính `đa hình` thì sao nhỉ :D
Trong Javascript thì tính đa hình không thực sự tồn tại. Tuy nhiên bạn vẫn có thể  mô phỏng tính đa hình thông qua `shadowing`, theo đó thì các object sẽ có thể khởi tạo thêm các property mới cho bản thân nó mà không cần quan tâm đến sự tồn tại của property ở object cha

```
b.alertMe();  // Foo!
 
b.alertMe = function(){
    alert("I'm in B!");
};
 
b.alertMe();  // I'm in B!
 
// To access the prototype's alertMe() function:
 
b.__proto__.alertMe(); // Foo!
// or...
Object.getPrototypeOf('b').alertMe(); // Foo!
```

method `alertMe` tại object `b` hiện tại đã trở thành `shadowed propert` và có cách thực thi khác với method gốc tại object `a`. Chúng ta vẫn có thể access vào `alertMe` của `a` tại `b` thông qua `__proto__` hoặc `Object.getPrototypeOf`

### Lưu ý:
Phương pháp `Shadowing` như trên chỉ hoạt động với các property được đánh dấu là `writeable: true`. Mặc định khi tạo property bằng cách assign như trên thì `writeable` luôn là `true` nên `mặc định` ta luôn có thể `Shadowing` cho các property. Nếu bạn muốn thay đổi giá trị mặc định này, chỉ cần thiết lập lại giá trị writable khi define property
```
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

## Tạo object và thêm properties
Mỗi khi bạn tạo một object mới từ một prototype nào đó (sử dụng `Object.create()`), bạn có thể truyền vào tham số từ 2 liệt kê danh sách các property mà bạn muốn thêm cho object mới của mình

```
var y = {
  foo: "foo"
};
 
var x = Object.create(y, {
  baz: {
    value: "baz"
  }
});
 
x.foo;   // foo
x.baz;   // baz
```
việc thêm properties vào object như trên sử dụng format giống như khi bạn tạo properties sử dụng `Object.defineProperties()`. Giá trị của một property có thể là string, integer, null, function hay bất kỳ một kiểu dữ liệu nào hợp lệ trong javascript. Ngoài việc set giá trị trực tiếp cho property như trên thì chúng ta còn có thể đặt giá trị cho nó bằng cách sử dụng `getter`
```
var obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    if (this.log.length == 0) {
      return undefined;
    }
    return this.log[this.log.length - 1];
  }
}

console.log(obj.latest);
// expected output: "c"
```
## Good Prototypal Javascript
Cách tốt nhất để thực hành prototypal trong javascript đó là chúng ta hãy dùng các object đúng như ý nghĩa của nó; không phải function hay class gì cả. Để kế thừa thì chỉ cần tạo một object mới base trên object cũ là được
```
var Foo = {
  C: 3
};
 
var bar = Object.create(Foo);
 
bar.A = 1;
bar.B = 2;
```
như ví dụ ở trên, giả sử chúng ta có nhiều hơn 2 properties (A, B) cần thêm cho `bar` thì sao nhỉ? Để giải quyết vấn đề này ta cần quay lại với `Object.create()` và tham số thứ 2 của nó
```
var properties = {
  A: { value: 1 },
  B: { value: 2 }
};
 
var bar = Object.create(Foo, properties);
```
trong trường hợp có nhiều properties ta chỉ cần define mỗi property trong object `properties` bên trên là được

### Lưu ý:
Khi thêm properties theo cách này thì mặc định nó là `immutable`. Điều đó có nghĩa là chúng ta không thể thay đổi các properties đó sau khi nó đã được gán giá trị. Để giải quyết vấn đề này ta cần thay đổi `property descriptors` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

## Kết luận
Javascript là một ngôn ngữ mạnh mẽ với nhiều tính năng thú vị. Tuy nhiên để có thể làm việc tốt và khai thác được toàn bộ sức mạnh của javascript thì chúng ta nên học cách sử dụng các tính năng của nó đúng cách, đó cũng là cơ sở để ta có thể học và làm tốt với thư viện js nữa!


### Tham khảo:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
https://thesocietea.org/2015/08/prototypal-programming-in-javascript/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get