Không hẳn là JavaScript Developer nào cũng để ý tới những vấn đề của Object nằm ở dưới core JS. Vì thế mình sẽ chia sẻ ở đây một số kiến thức liên quan đến Object để anh em nào chưa biết có thể thu nạp thêm, cũng như ai đã biết thì có thể ôn lại cho nhớ.

## Object Contents
Contents của một object chỉ đơn thuần là các properties. Về mặt bản chất, JS engine sẽ không lưu các giá trị của property cùng với object container trong bộ nhớ, những gì được chứa cùng với container chỉ là các property name, mà thực chất hoạt động như các pointer (hay còn gọi là các reference) trỏ tới nơi mà giá trị được lưu trữ.

Cho mấy cái dòng sau:
```javascript
var myObject = {
    a: 2
};
myObject.a; // 2
myObject["a"]; // 2
```

Để truy cập giá trị của ở một vị trí `a` trong `myObject`, chúng ta cần sử dụng `.` hoặc `[ ]`. Về mặt kết quả, chúng y như nhau, đều truy cập tới cùng 1 ví trị và lấy ra cùng 1 giá trị. Điểm khác biệt chính giữa hai cú pháp này là cái trò dùng `.` yêu cầu property name đứng sau phải là dạng [Identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)-compatible, còn `[ ]` thì chỉ cần 1 cái property name ở dạng UTF-8/Unicode-compatible là được.

Trong object, property name luôn luôn là string. Nếu ta sử dụng bất cứ giá trị nào khác với string để làm property, nó sẽ được convert về string. Bao gồm cả number luôn, thế nên cẩn thận kẻo bị rối lên khi sử dụng number giữa object với array.
```javascript
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"]; // "foo"
myObject["3"]; // "bar"
myObject["[object Object]"]; // "baz"
```

## Computed Property Names
Cú pháp `[ ]` khá là hữu dụng khi chúng ta muốn sử dụng một computed expression value làm key name, như kiểu `myObject[prefix + name]`. Tuy nhiên declare property theo cái kiểu set từng phát một này trông khá là poor nên ES6 đã thêm vào một khả năng gọi là "computed property names", mà ta có thể sử dụng được khi khai báo object theo kiểu object-literal declaration:
```javascript
var prefix = "foo";

var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world",
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

Nhu cầu sử dụng phổ biến nhất của trò này được cho là dành cho ES6 Symbol. Nói gắn ngọn thì Symbol là một primitive data type mà giá trị của nó là không đoán được (tuy nhiên nó là một string) vì mỗi JS engine sẽ biểu diễn nó theo một kiểu. Do đó ta tránh làm việc trực tiếp với giá trị thực của Symbol, thay vào đó sử dụng kiểu như sau:
```javascript
var myObject = {
    [Symbol.Something]: "hello world"
};
```

## Property vs Method
Một số developer thích phân biệt khi nói về property access trên 1 object, khi mà giá trị được truy cập tới là một function.

Ở một số ngôn ngữ lập trình khác, một function mà thuộc về một object (hay "class") thì được gọi là "method". Và chính bởi ý nghĩ đó đã gây ra sự phân biệt, và người ta gọi nó là "method access" thay vì "property access".

Về mặt technical, trong JS, function không bao giờ "thuộc về" object, thế nên việc gọi nó là "method" khá là sai.

Đồng ý là một số function có tham chiếu this bên trong, và cái this đó có thể là object ở thời điểm gọi hàm. Nghe thì nó có vẻ khá là "method", nhưng this ở trong JS không giống this ở các ngôn ngữ khác, this là một tham chiếu động, nó có thể được thay thế và được bind lúc runtime, thế nên điều này chẳng thể nào biến function trở thành "method" được.

Do đó mỗi khi truy cập một property, thao tác đó chỉ đơn thuần là "property access", không liên quan đến type của giá trị mà ta lấy về.
```javascript
function foo() {
    console.log("foo");
}
var someFoo = foo; // variable reference to 'foo'
var myObject = {
    someFoo: foo
};
foo; // function foo(){..}
someFoo; // function foo(){..}
myObject.someFoo; // function foo(){..}
```
`someFoo` và `myObject.someFoo` chỉ là hai tham chiếu khác nhau tới cùng một function. Điểm khác biệt duy nhất là nếu trong `foo()` có sử dụng `this` bên trong hàm, thì `myObject.someFoo` sẽ *implicit binding* `this` với `myObject`.

Và thậm chí nếu ta khai báo hàm như là một phần của object, function đó cũng không "thuộc về" object một cách vi diệu nào đó được, nó chỉ đơn thuần ra reference đến cái function đó khác đi 1 tí:
```javascript
var myObject = {
    foo: function() {
        console.log("foo");
    }
};
var someFoo = myObject.foo;
someFoo; // function foo(){..}
myObject.foo; // function foo(){..}
```

## Arrays
Array cũng sử dụng `[ ]` để truy cập phần tử, tuy nhiên nó có một cấu trúc quản lý rõ ràng về việc lưu giá trị ở đâu và như thế nào.
Array sử dụng numberic indexing
```javascript
var myArray = ["foo", 42, "bar"];
myArray.length; // 3
myArray[0]; // "foo"
myArray[2]; // "bar"
```
Array là object, vì thế ta vẫn có thể add property cho nó:
```javascript
var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```
Chú ý rằng thêm property không làm thay đổi length của array.

Ta có thể sử dụng array để làm một key/value object bình thường, và không add một phần tử mảng nào vào, cơ mà trò này chẳng để làm gì vì array được thiết kế để tối ưu cho định hướng sử dụng của nó. Ta chỉ nên sử dụng object để chứa các cặp key/value, còn array để chứa dữ liệu có thể đánh số chỉ mục.

Cảnh báo rằng nếu ta thêm một property vào một array nhưng property name lại "trông như" số, nó sẽ thành ra là thêm vào array một phần tử mới, do đó thay đổi mảng dữ liệu:
```javascript
var myArray = ["foo", 42, "bar"];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"
```

## Duplicating Objects
Một trong những thứ hay được các JS developer mới hay tìm kiếm đó là làm thể nào để duplicate một object. Tại sao lại không có sẵn 1 hàm built-in như kiểu `copy()` chẳng hạn? Bởi vì thực thế việc duplicate khá là phức tạp.
```javascript
function anotherFunction() { /*..*/ }
var anotherObject = {
    c: true
};
var anotherArray = [];
var myObject = {
    a: 2,
    b: anotherObject, // reference, not a copy!
    c: anotherArray, // another reference!
    d: anotherFunction
};
```
Vậy chính xác một bản copy của `myObject` nó phải thế nào?

Đầu tiên, ta nên sử dụng shallow copy hay deep copy? Với shallow copy thì ta chỉ copy được `a`, còn `b`, `c`, `d` chỉ là reference. Với deep copy, ta cần duplicate cả các object mà `b`, `c`, `d` trỏ tới, nhưng nếu trong object đó là chứa reference tới `myObject` thì sao? Vậy là chúng ta sẽ sinh ra một vòng lặp vô hạn khi deep copy.

Liệu ta có nên kiểm tra vòng lặp và break nó ra không (như thế thì deep copy sẽ ko hoàn toàn duplicate)? Hay ta nên bắn 1 cái lỗi ra? Hay xử lý gì đó ở giữa quá trình?

Và hơn nữa, việc duplicate một function là cái kiểu gì?

Vậy làm thế nào để chúng ta có thể giải quyết tất cả các câu hỏi trên? Có nhiều JS frameworks đã tự lựa chọn cách làm của họ, thế cách nào JS nên dùng để đưa vào thành một tiêu chuẩn? Và trong một thời gian dài đã không có câu trả lời nào rõ ràng.

Có một giải pháp nếu object là dạng JSON-safe, ta có thể dễ dàng duplicate như sau:
```javascript
var newObj = JSON.parse(JSON.stringify(someObj));
```
Và tất nhiên ta cần phải đảm bảo rằng object của ta là dạng JSON-safe, mà nếu đã như thế thì đã chẳng có nhiều vấn đề phải nói. Do đó cái này cũng chẳng nói lên điều gì.

Chốt lại thì, shallow copy được cho là dễ hiểu và ít issue hơn hẳn, nên ES6 đã cung cấp sẵn một hàm `Object.assign(..)` để làm việc này nhanh hơn:
```javascript
var newObj = Object.assign({}, myObject);
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

## Property Descriptors
Trước ES5,  JS không có cách nào để giúp ta xác định các đặc tính cho property, ví dụ như kiểu read-only chẳng hạn.
Cơ mà từ ES5, tất cả các property có thể được đặc tả kèm với một property descriptor.
```javascript
var myObject = {
    a: 2
};

Object.getOwnPropertyDescriptor(myObject, "a");
// {
//     value: 2,
//     writable: true,
//     enumerable: true,
//     configurable: true
// }
```
Như ta có thể thấy, ngoài giá trị 2, một property còn có 3 đặc tính bao gồm: `writable`, `enumerable`, `configurable`.
Ta có thể sử dụng `Object.defineProperty(..)` để thêm một property mới kèm với descriptor, hoặc modify cái đã có (tuy nhiên `configurable` của nó phải là true).
Ví dụ:
```javascript
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});
myObject.a; // 2
```

### Writable
Khả năng thay đổi giá trị của một property có được hay không là do `writable`
```javascript
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
});
myObject.a = 3;
myObject.a; // 2
```
Nếu ở strict mode, ta sẽ dính error
```
"use strict";
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
});
myObject.a = 3; // TypeError
```

### Configurable
Miễn là property đang configurable, là ta có thể modify descriptor của nó, vẫn sử dụng `defineProperty(..)`
```javascript
var myObject = {
    a: 2
};
myObject.a = 3;
myObject.a; // 3
Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurable: false, // not configurable!
    enumerable: true
});
myObject.a; // 4
myObject.a = 5;
myObject.a; // 5
Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true
}); // TypeError
```
Lời gọi hàm `defineProperty(..)` sẽ sinh ra `TypeError`, không liên quan đến việc ta có đang ở strict mode hay không, nếu ta cố tình thay đổi descriptor của một nonconfigurable property.

Và cảnh báo rằng: việc thiết lập configurable thành false là một chiều, không thể undo được đâu nhé!
> Có một ngoại lệ là ngay cả khi `configurable:false`, ta vẫn có thể thay đổi `writable` từ true thành false mà không hề bị báo lỗi, tuy nhiên từ false về true là không được.
> 

Ngoài ra, `configurable:false` cũng sẽ chặn không cho phép ta xóa property:
```javascript
var myObject = {
    a: 2
};
myObject.a; // 2
delete myObject.a;
myObject.a; // undefined

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
});
myObject.a; // 2
delete myObject.a;
myObject.a; // 2
```

Một chút về `delete`: `delete` chỉ được sử dụng để xóa object property trực tiếp từ object. Nếu object property là một reference cuối cùng tới một object nào đó, thì khi ta `delete` nó, reference sẽ mất và object sẽ được "garbage-collected". Nhưng nói chung `delete` không phải dùng để free up memory như trong C++, `delete` chỉ để xóa object property, hết.

### Enumerable
Đặc tính cuối cùng mà ta đề cập ở đây đó là `enumerable`.
Cái tên cũng thể hiện sẵn rồi, và nói chung thì đặc tính này cho phép property có xuất hiện hay không trong những object-property enumeration nhất định, ví dụ như vòng lặp `for..in`.

Tất cả các property mặc định sẽ có đặc tính này là true, cơ mà trong một số bài toán nhất định, ta cần loại bỏ nó khỏi enumeration, thì khi đó ta thiết lập lại `enumerable:false`.

# Kết
Các vấn đề liên quan tới Object vẫn còn khá là nhiều, tuy nhiên ở bài viết này chỉ chọn lọc một phần. Hy vọng sẽ hữu ích cho công việc của các bạn và là một nguồn kiến thức lý thú.



-----
*Tham khảo từ [You Don't Know JS - this & Object Prototypes](https://www.oreilly.com/library/view/you-dont-know/9781491905142/)*