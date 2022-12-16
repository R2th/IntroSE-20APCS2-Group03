## JavaScript series

Chương thứ 4 giới thiệu về object trong JavaScript.

Bài viết này là một phần của series [JavaScript dành cho người không mới](https://viblo.asia/s/javascript-danh-cho-nguoi-khong-moi-yEZkg8LgZQ0), giúp các bạn đã có kinh nghiệm code trong các ngôn ngữ khác nhanh chóng làm quen với JS.

Nếu được rất mong nhận được sự ủng hộ và đóng góp ý kiến của mọi người để hoàn thiện series.

## A. Object

### 1. Overview

Well, về object các bạn có thể đã biết về khái niệm object (đối tượng). Object đại diện cho một thực thể, gồm các thông tin chứa trong những thuộc tính (property) và có những hành vi là những phương thức (method). Object trong JS cũng thế.

Các tính chất của OOP không thể hiện rõ ràng như một số ngôn ngữ khác, điển hình như Java. 

### 2. Creating object

Có nhiều cách để tạo ra một object trong JS:

* Tạo single object bằng object literal (initializer)
* Tạo object bằng new và Object constructor
* Tạo object bằng một constructor tùy chỉnh
* Tạo từ class

Từ ES5 có thể dùng method `Object.create()` để tạo object.

**Object literal**

Đây là cách đơn giản và rõ ràng nhất để tạo object. Nhược điểm là nó chỉ tạo ra một object duy nhất, nên muốn tạo ra nhiều object cùng lúc cần dùng cách khác.

```script.js
let shortObj = { name: "John", age: 20 };
let longObj = {
    name: "John",
    age: 20
}
```

Chú ý hai cách viết trên, cách 1 ngắn gọn dùng cho object nhỏ, đơn giản. Cách 2 tuy dài hơn nhưng rõ ràng và phù hợp cho các object phức tạp. Và chú ý luôn cả cách mình đặt space trong các dòng.

**New keyword & Object constructor**

```script.js
let john = new Object();
john.name = "John";
john.age = 20;
```

Cách này sử dụng từ khóa new và Object constructor. Đầu tiên dòng 1 chỉ tạo ra object rỗng, và rồi bạn mới thêm các thuộc tính vào bằng cách gán value cho nó.

**Define a constructor**

Cách này khá giống cách ở trên, nhưng chúng ta sử dụng constructor tùy chỉnh thay vì Object. Constructor chỉ là một function bình thường, gán giá trị cho this, và được gọi bằng new keyword.

```script.js
function createPerson(name, age) {
    this.name = name;
    this.age = age;
}
let john = new createPerson("John", 20);
```

Cách này trước khi JS có class được dùng khá nhiều, vì nó có thể tạo ra được nhiều object tương tự nhau.

**Instantiate from class**

ES6 bổ sung thêm từ khóa class, nên có thể khởi tạo nhiều object từ một class đã định nghĩa. Việc này tương tự trong các ngôn ngữ khác nên dễ làm quen hơn.

```script.js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let john = new Person("John", 20);
```

Phần về class sẽ bàn sâu hơn trong các phần tiếp theo.

**Object.create()**

`Object.create()` là method rất hay để tạo object khi bạn muốn chọn prototype cho object tạo ra.

```script.js
let Vehicle = {
    name: 'unknow',
    run: function () {
        console.log(this.name + ' is running');
    }
}
let car = Object.create(Vehicle);  // Tạo Car từ prototype của Vehicle
car.name = 'Car';
car.run();  // Car is running
```

### 3. Display object

Đôi khi chúng ta muốn xem tất cả giá trị của object, thì có thể dùng một số cách sau.

* Hiển thị một property
* Dùng vòng lặp `for in` để hiển thị tất cả property và value của chúng
* Dùng method `Object.keys()` hoặc `Object.values()` để lấy tất cả key hoặc value của object dạng array.
* Dùng method `toString()` hoặc `JSON.stringify()`.
* Xuất ra bằng `console.log()`.

Tuy nhiên, trong phần này mình muốn giới thiệu tới các bạn method `console.table()` sẽ hiển thị toàn bộ object dưới dạng bảng trong console rất tiện. Nhược điểm là các method sẽ không hiển thị trong bảng, nên nó rất phù hợp khi bạn muốn xem nhanh dữ liệu trong object.

```script.js
console.table(john);
```

## B. Property & method

### 1. Property

Thuộc tính (property) là nơi chứa dữ liệu cho object, mỗi thuộc tính là một cặp `key: value`. Giữa tên thuộc tính `key` và `value` tách nhau bởi dấu hai chấm, và giữa các thuộc tính với nhau cách nhau bởi dấu phẩy.

```script.js
let obj = {
    name: "John",  // Thuộc tính name
    age: 20,  // Thuộc tính age
    callPolice: function () { console.log(113) }
}
```

Trong JS, các phương thức cũng được xem là thuộc tính, với value là một function, như trên.

Tên thuộc tính đặc biệt có thể chứa khoảng trắng, khi đó cần dùng dấu nháy bao lại.

Thuộc tính của object trong JS gồm 2 loại:

* Own property: do object định nghĩa
* Prototype property: có được từ prototype mà object thừa hưởng

**Access property**

Có hai cách để truy cập thuộc tính, nghĩa là đọc value hoặc thay đổi value của nó.

```script.js
console.log("My name is ", john.name);  // Đọc
john["age"] = 21;  // Ghi
```

Cách 1 sử dụng cú pháp `object.property` được dùng nhiều hơn.

Cách 2 sử dụng cách truy cập như mảng `object["property"]`, trong đó `property` là tên của thuộc tính. Cách 2 thường dùng khi tên property có dấu cách, hoặc truy cập các computed name property.

**Add, delete property**

Để thêm thuộc tính vào object, chỉ cần gán một value cho nó.

```script.js
john.isMale = true;  // Thêm thuộc tính isMale vào john
john["isSingle"] = false;  // Cách này cũng được
```

Để xóa thuộc tính, dùng toán tử delete. Lưu ý delete chỉ có thể xóa được các own property, còn các property của prototype không xóa được.

```script.js
delete john.isMale;
delete john["isSingle"];
```

Chú ý, việc thêm và xóa thuộc tính có thể bị chặn vì object không cho phép (các phần sau sẽ bàn tới). Trong strict mode, delete bị cấm. Và nên hạn chế thêm hoặc xóa thuộc tính của object.

**For in loop**

Để duyệt qua các thuộc tính, sử dụng vòng lặp `for in`. Vòng lặp này sẽ lặp qua tất cả thuộc tính, của cả object và prototype mà nó thừa hưởng.

```script.js
for (prop in john)
    console.log(prop, ": ", john[prop]);
```

Biến `prop` mỗi lần lặp sẽ nhận lần lượt các property name, và sử dụng `john[prop]` để lấy giá trị property đang trỏ tới. Chú ý phải dùng `john[prop]` mà không phải `john.prop`, vì `prop` ở đây không phải là thuộc tính cố định.

**Property metadata**

Thuộc tính trong JS có ba tính chất đặc biệt:

* Writable: cho phép thay đổi thuộc tính hay không
* Enumerable: cho phép thuộc tính được tìm thấy bằng vòng lặp `for in` hoặc các method như `Object.keys` hoặc `Object.values`.
* Configurable: cho phép cấu hình thuộc tính, nghĩa là thay đổi được các thông số như writable, enumerable trên. Chỉ những thuộc tính có configurable mới có thể xóa bởi toán tử `delete`.

Mọi thuộc tính trong JS đều có thể đọc được, do đó muốn bảo mật thì nên dùng closure thay thế.

**Kiểm tra property có trong object hay không**

Vì JS cho phép thêm, xóa property của object, nên đôi lúc chúng ta cần kiểm tra xem object có chứa một property nào đó hay không. Có hai cách để làm việc này.

* Dùng toán tử `in`
* Dùng method `hasOwnProperty()`

Code sau minh họa hai cách làm trên, dùng kiểm tra thuộc tính `name` có tồn tại trong đối tượng `john` hay không.

```script.js
let john = { name: 'John' };
'name' in john;  // true
john.hasOwnProperty('name');  // true
```

Sự khác biệt giữa chúng như sau:

* `in` kiểm tra property của chính object và của prototype, ví dụ như `'toString' in john` sẽ là true, vì `toString` là property của prototype.
* `hasOwnProperty()` method chỉ kiểm tra nếu property là của chính object đó, ví dụ trên thì `john.hasOwnProperty('toString')` là false.

### 2. Method

Method là những function bên trong object, và các method cũng là property có value là function ẩn danh.

```script.js
let john = {
    name: "John",
    age: 20,
    callPolice: function() { console.log("POLICE!!!"); },
    callMom() { console.log("Hello Mom"); }
}
john.callPolice();
john.callMon();
```

Hai method trên khai báo hai cách khác nhau. Cách 1 là cách cũ trước đây, và cách 2 là cách viết method gọn hơn được giới thiệu từ ES6.

**This keyword**

Trong method, từ khóa `this` chỉ tới owner của method, là chính object chứa nó. Do đó, chúng ta có thể gọi các method và property khác bên trong cùng object nhờ `this`.

Trường hợp ngoại lệ khi gọi method bằng `call()` hoặc `apply()`. Khi đó `this` sẽ là đối số đầu tiên (dạng object) khi gọi `call()`, `apply()`.

**Add method**

Để thêm method vào, tương tự như thêm thuộc tính, chỉ cần gán value là một function ẩn danh cho nó.

```script.js
john.callDad = function() { console.log("Hi Dad"); }
```

**Delete method**

Các method của object không thể bị xóa.

## C. Accessor, constructor & prototype

### 1. Accessor

**Getter & setter**

Từ ES5 đã giới thiệu getter và setter, nhờ đó thay vì truy cập thẳng vào thuộc tính thì phải thông qua một accessor (đối tượng truy cập). Sử dụng accessor tương tự như property, khác biệt ở cách chúng hoạt động:

* Thuộc tính bình thường đọc ghi trực tiếp vào property.
* Accessor sử dụng getter để đọc và setter để ghi mỗi khi có yêu cầu tới thuộc tính. Setter và getter là các hàm, bạn có thể viết code cho nó để chúng xử lý dữ liệu trước khi đưa ra ngoài (getter) hoặc ghi vào property (setter).

```script.js
let john = {
    _name: "John",
    get name() {
        return this._name;
    }
    set name(value) {
        console.log("Tên tao ai cho mày thay đổi :D");
    }
}
console.log(john.name);  // Read name > get name()
john.name = "Mike";  // Write name > set name()
```

Thuộc tính `_name` là thuộc tính thực, trong đó `name` là accessor tạo bởi `get name()` và `set name()`. Ở đây mình viết thuộc tính thực có dấu underscore _ phía trước.

Khi đọc ghi trên accessor, thì tùy vào hành động (đọc hoặc ghi) thì getter (đọc) hoặc setter (ghi) sẽ được gọi tương ứng.

Một thuộc tính có thể không có getter, setter, có một trong hai hoặc cả hai đều được.

**Cấu trúc getter, setter**

Getter có cấu trúc một method, không tham số và return một giá trị.

```script.js
get name() {
    ...
    return this._name;
}
```

Setter là method nhận vào một value, và không return giá trị nào.

```script.js
set name(value) {
    ...
}
```

Tên của method ở getter và setter là tên accessor phải trùng nhau, để trỏ tới cùng một accessor. Và tên accessor được sử dụng như tên property thông thường.

**Tại sao dùng accessor**

Một số lý do để sử dụng accessor như sau:

* Cú pháp đơn giản và giống nhau giữa property và method
* Đảm bảo luồng dữ liệu vào ra object hợp lệ và chuẩn
* Giúp thực hiện các thao tác khác trong nền khi truy cập thuộc tính

**Accessor cho property có sẵn**

Có thể định nghĩa thêm accessor cho một thuộc tính đã có mà không cần chỉnh sửa code object đó bằng method `Object.defineProperty()`.

```script.js
let john = {
    _name: "John",
    age: 20
}
Object.defineProperty(john, "name", {
    get: function () { return this._name; },
    set: function (value) { this._name = value; }
});
```

Method trên nhận vào ba tham số. Tham số 1 là object chỉ định, tham số 2 là tên thuộc tính. Tham số 3 là một object đại diện cho thuộc tính.

Cú pháp chỉ định getter setter của method trên hơi khác với định nghĩa trực tiếp trong object. Có thể hiểu tham số 3 của `Object.defineProperty()` là một object cấu hình, có hai method là `get()` và `set()` đại diện cho getter và setter, do đó nó không có tên mà chính get và set là tên rồi.

Method này sẽ được nói kĩ hơn trong những phần sau.

### 2. Constructor

Constructor chỉ là function dùng tạo object, và được gọi với từ khóa new. Constructor sử dụng từ khóa this đại diện object sẽ tạo ra, this sẽ được tự động return ra ngoài constructor thành một object mới.

```script.js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
let john = new Person("John Doe", 20);
let vu = new Person("Vu Tong", 19);
```

Với constructor, có thể tạo ra nhiều object có cấu trúc giống nhau nhanh chóng, mặc dù giá trị trong đó có thể khác nhau. Constructor thường nhận vào các tham số, tương ứng với các thuộc tính sẽ có của object, và được gán cho this như trên.

Với mỗi object tạo ra, nó sẽ có thuộc tính `constructor` giữ tham chiếu tới construcotrr tạo ra nó. Như ví dụ trên, thì `john.constructor`, `vu.constructor` sẽ cùng trỏ tới function `Person()`.

Chú ý nên sử dụng constructor đúng với chức năng của nó. Không nên gọi function với new, cũng như không gọi constructor như function bình thường (không có new).

**This keyword**

Tùy thuộc cách gọi function, gọi bình thường thì this là owner của function (object window hoặc object chứa method). Nếu gọi function có từ khóa new, thì function thành constructor, thì this mang ý nghĩa khác.

This trong constructor là object tạm, khi constructor thực hiện xong thì object tạm sẽ được tạo ra và được gán tham chiếu cho một biến object.

```script.js
let john = new Person();
    // This trong Person sẽ trở thành object
    // và được gán tham chiếu cho biến john
```

**Add property, method in constructor**

Thêm như object bình thường, nhưng sử dụng `this` cho object chứ không phải bản thân constructor.

```script.js
function Person(name) {
    this.name = name;  // Ok
    Person.name = name;  // Sai
}
```

**Type constructors**

Các kiểu dữ liệu có những constructor xây dựng sẵn, ví dụ object thì có `Object()`, string thì có `String()`, tương tự với `Number()`, `Boolean()`,... kể cả kiểu primitive.

```script.js
let n = new Number(100);
let s = new String("ABC");
```

Tuy có thể tạo primitive type với new, nhưng không nên dùng vì nhiều hạn chế.

### 3. Prototype

JS trước ES6 thì chưa có khái niệm class, nên việc thực hiện kế thừa (inheritance) giữa các object phải thông qua prototype (prototype based language). Có thể hiểu nếu hai object có cùng prototype, thì chúng sẽ có những thuộc tính và phương thức chung của prototype đó.

`prototype` là một thuộc tính có trong mọi function, nếu function làm chức năng tạo ra object (là constructor), thì những object được tạo ra sẽ có chung những gì có trong `prototype`. Và những object đó sẽ lưu trữ một tham chiếu tới `prototype` gốc thông qua thuộc tính `__proto__`.

```script.js
// Tạo một function User
function User(email, password) {
    this.email = email;
    this.password = password;
}

// Thêm thuộc tính vào User.prototype (prototype) cũng là 1 object
User.prototype.name = 'Noname';

// Bây giờ User.prototype trông như sau
// {
//     constructor: function () {...},
//     name: 'Noname'
// }

// Tạo object từ User
let a = new User('a@a.com', '123');

// Object a sẽ có tất cả mọi thứ từ User.prototype
a.name;  // Noname

// Xem thử thuộc tính a.__proto__
a.__proto__;  // Tương tự User.prototype
```

Về cơ bản thuộc tính `prototype` cũng là một object con, do đó nó có thể chứa method hoặc property. Và `prototype` luôn có một method tên là `constructor` là constructor sở hữu prototype.

Đối với object tạo ra, nó sẽ có mọi thứ từ prototype của function tạo ra nó. Và những object đó có thuộc tính `__proto__` để giữ tham chiếu tới `prototype` của function (dùng phép so sánh `a.__proto__ === User.prototype` cho kết quả true).

Mọi thay đổi đối với `function.prototype` hoặc `any_obj.__proto__` đều ảnh hưởng tới toàn bộ object khác có chung prototype đó.

## D. Object constructor

`Object` trong JS là một constructor dùng để tạo ra các object. Bên cạnh đó, nó cũng chứa một số thuộc tính và phương thức xử lý cho mọi object, ví dụ như.

```index.js
let obj = { ... };
Object.keys(obj);
```

Các method xử lý object của Object được sử dụng như trên, giống như ví dụ về các static method.

### 1. Object properties

Chỉ có hai property của Object là `length` và `prototype`.

Thuộc tính `length` luôn trả về 1, và `prototype` cho phép bổ sung thêm các thành viên khác cho các object tạo ra từ Object.

### 2. Object methods

Tất cả các method của Object đều nhận vào một tham số là một object nào đó.

**Object.create method**

Tạo một object mới với prototype của một object khác được chỉ định. Chi tiết đã nói ở phần trên.

**Object.keys & Object.values method**

Method `Object.keys()` trả về một mảng các tên thuộc tính (còn gọi là key vì thuộc tính có tên: value, tương ứng với key: value).

```script.js
let john = { name: 'John', age: 20 };
let arr = Object.keys(john);  // ['name', 'age']
```

Nếu method không truyền object mà nhận vào string hoặc array, thì danh sách key lấy ra có dạng 1, 2, 3,... (vì string và array đánh index cho từng phần tử, nên key sẽ là index).

Method `Object.values()` tương tự, nhưng nó trả về các value của thuộc tính thay vì key.

**Object.getOwnPropertyNames method**

Method `Object.getOwnPropertyNames()` tương tự như `Object.keys()`, dùng lấy ra một mảng các tên thuộc tính (key hoặc property name). Hoặc có một cách nữa là dùng vòng lặp `for in` để lặp qua mọi thuộc tính.

Khác biệt ở chỗ `Object.getOwnPropertyNames()` lấy ra cả những thuộc tính enumerable là false, còn `Object.keys()` và `for in` không tìm thấy những thuộc tính không enumerable.

**Object.seal & Object.freeze method**

Method `Object.seal()` ngăn chặn việc xóa các thuộc tính của object. Method `Object.freeze()` cũng không cho phép xóa, và cũng không cho phép thay đổi value của bất kì thuộc tính nào trong object.

Có hai method khác để kiểm tra là `Object.isSealed()` để kiểm tra object có được sealed không, và `Obect.isFrozen()` để kiểm tra tình trạng freeze của object.

**Object.preventExtensions & Object.isExtensible**

Method `Object.preventExtensions()` không cho phép thêm thuộc tính và method vào method.

Và dùng method `Object.isExtensible()` để kiểm tra object có thể thêm thuộc tính và method vào không. Nếu đã dùng `Object.preventExtensions()` ở trên thì `Object.isExtensible()` là false.

**Object,is method**

Dùng method `Object.is()` để kiểm tra xem hai value có giống nhau hay không:

* Cả hai có cùng giá trị, undefined, null, hoặc true, hoặc false, hoặc string giống nhau.
* Đối với object (tính cả array), thì method trả về true khi cả hai có cùng địa chỉ bộ nhớ (hoặc tham chiếu cùng một object).
* Đối với số, thì nó phải giống nhau hoàn toàn, ví dụ `+0` và `-0` là khác nhau, `Number.NaN` và `NaN` là giống nhau, `Number.POSITIVE_INFINITY` và `Infinity` giống nhau.

Nói chung thì `Object.is()` và hai phép so sánh `==` và `===` khá giống nhau, nhưng `Object.is()` giống với `===` hơn. Ví dụ.

```script.js
10 == '10';  // true
10 === '10';  // false
Object.is(10, '10');  // false
```

Khác biệt giữa toán tử `===` và method `Object.is()` nằm ở chỗ chúng so sánh các số, như đề mục thứ 3 ở trên. Hãy xem ví dụ sau.

```script.js
+0 === -0;  // true, vì đều bằng 0
Object.is(+0, -0);  // false, vì chúng khác dấu :)

-0 === -0;  // true, vì đều bằng 0
Object.is(-0, -0);  // true, vì chúng cùng dấu :D

Number.NaN === NaN;  // false, vì === thích thế
Object.is(Number.NaN, NaN);  // true, éo hiểu

Number.POSITIVE_INFINITY === Infinity;  // false
Object.is(Number.POSITIVE_INFINITY, Infinity);  // true
```

JS thật vl :D.

**Object.assign method**

Dùng method này để sao chép đối tượng nguồn (source) sang đối tượng đích (target) và trả về đối tượng đích. Nếu source không phải object, JS sẽ cố chuyển nó thành object bằng cách dùng wrapper cho nó.

Method `Object.assign()` sao chép theo đúng nghĩa copy dữ liệu các thuộc tính và method vào object khác, còn phép gán `=` chỉ là gán tham chiếu thôi. Và chú ý các thuộc tính enumerable là false và accessor sẽ không được sao chép.

```script.js
let source = { a: 10, b: 20 };
let target = { b: 30, c: 40 };
Object.assign(target, source);
    // target = { a: 10, b: 20, c: 40 };
```

Chú ý, method trên copy từ source vào target, các thuộc tính trùng tên đã có trong target sẽ bị source ghi đè lên (do đó `b` có giá trị là 20 chứ không phải 30, vì `b` của source đã ghi đè lên b của target).

Thêm một ví dụ nữa đơn giản hơn về sao chép đối tượng, nghĩa là tạo đối tượng mới có nội dung y chang đối tượng đã có.

```script.js
let obj1 = { a: 10, b: 20 };
let obj2 = {};
Object.assign(obj2, obj1);
```

Như trên sau khi copy thì hai object có nội dung giống nhau hoàn toàn. Nhưng thường người ta sẽ lợi dụng tính trả về của `Object.assign()`, mà rút gọn đi dòng khai báo thứ 2 ở trên.

```script.js
let obj1 = { a: 10, b: 20 };
let obj2 = Object.assign({}, obj1);
```

Method `Object.assign()` có thể nhận nhiều hơn một source, khi đó cấu trúc sẽ có dạng như sau.

```script.js
let target = Object.assign({}, source1, source2,...);
```

Chú ý object source đứng sau sẽ ghi đè lên thuộc tính trùng tên đã có.

**Object.defineProperty method**

Dùng method này để định nghĩa một thuộc tính mới, hoặc thay đổi các thông số của thuộc tính đã có.

```script.js
let john = { name: 'John', age: 20 };
Object.defineProperty(john, 'isMale', {
    value: true
});
```

Method trên nhận vào 3 tham số:

* Tham số 1 là object sẽ được thêm thuộc tính vào
* Tham số 2 là tên thuộc tính (có thể là thuộc tính mới hoặc đã có rồi)
* Tham số 3 là descriptor, là một object chứa các metadata của thuộc tính. Chú ý tới tham số này.

Bạn có thể chỉ định value, getter, setter cho thuộc tính thông qua descriptor (tham số 3). Desriptor là một object quy định các thông số của thuộc tính như writable, enumerable, configurable, getter và setter như ví dụ sau.

```script.js
Object.defineProperty(john, 'isMale', {
    // Giá trị thuộc tính isMale (không có getter)
    value: true,
    
    // Metadata cho thuộc tính isMale
    enumerable: true,
    configurable: false,
    writable: false,
    
    // Getter và setter
    get: function () {},
    set: function (value) {}
});
```

Method `Object.definePropery()` cũng được dùng để modify lại những thuộc tính đã có, có thể là thay đổi value, thêm getter hoặc setter cho nó, hoặc sửa lại các thông số khác.

**Object.defineProperties method**

Method `Object.defineProperties()` khá giống với `Object.defineProperty()`, khác biệt ở chỗ method số nhiều sẽ định nghĩa liên tiếp nhiều thuộc tính.

Ví dụ về cú pháp method này, gồm tham số 1 là object cần sửa, tham số 2 là một object lớn, chứa bên trong là những cặp thuộc tính, có tên thuộc tính là tên object, value của thuộc tính là một object descriptor như trên phần `Object.defineProperty()` đã nói.

```script.js
Object.defineProperties(john, {
    'name': {
        value: 'John',
        writable: false,
        enumerable: true,
        configurable: false,
        get: function () { return this.name },
        set: function (value) {}  // Prevent change name
    },
    'age': {
        ...
    }
})
```

**Others**

Trên đây chỉ là những thuộc tính và method cơ bản, hay dùng của Object, có thể tìm hiểu nhiều thêm nữa.

## E. Classes

### 1. Overview

Từ phiên bản ES6 (ECMAScript 2015) đã giới thiệu thêm class. Class về bản chất là một function constructor theo đúng nghĩa (typeof một class sẽ ra function :)), nhưng được viết với cú pháp gần với những ngôn ngữ khác hơn.

**Definition**

Cú pháp định nghĩa class như sau.

```script.js
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
        // Define properties here
    }
    // Define methods here 
}
let john = new Person('John', 20);
john.
```

Trong class luôn có một method constructor, là nơi định nghĩa các thuộc tính. Còn những method khác được định nghĩa ở ngoài (cùng cấp với constructor).

Việc tạo object từ class tương tự như constructor, có từ khóa `new` như trong ví dụ trên.

**Inheritance**

ES6 bổ sung thêm từ khóa `extends` để kế thừa class.

```script.js
class Student extends Person {
    constructor (name, age, school) {
        super(name, age);
            // Luôn gọi đầu tiên, trước khi gán thuộc tính mới
        this.school = school;
    }
    ...
}
let a = new Student('Nguyen Van A', 17, 'Binh Thuan');
```

Để truy cập ngược lên lớp cha, sử dụng từ khóa `super`. Chú ý, khi kế thừa constructor lớp con thì luôn luôn gọi constructor lớp cha (nếu có) ở đầu tiên.

**Hoisting**

Class thì không được hoisting, mặc dù nó cũng là function.

**Strict mode**

Cú pháp viết class luôn phải tuân thủ strict mode, điều này là bắt buộc.

### 2. Methods

**Constructor**

Constructor là một method đặc biệt, là nơi khởi tạo các thuộc tính cũng như kế thừa lớp cha. Constructor luôn được tự động gọi mỗi khi tạo object mới từ class.

Một class chỉ có duy nhất một constructor, nếu không chỉ định constructor thì JS sẽ tự thêm constructor ẩn không làm gì cả.

Constructor có các tham số như của function constructor, nhận những giá trị được truyền vào khi tạo object với `new`.

**Method**

Method cũng không có gì để nói nhiều. Trong khi các thuộc tính định nghĩa bên trong constructor, thì các method sẽ được viết cùng cấp với constructor.

Method cũng có hai cách viết, cách mới ES6 và cách cũ như trình bày ở trên.

Chú ý quan trọng, giữa các constructor và method, cũng như các method với nhau không có dấu phẩy, ví dụ.

```script.js
class Person {
    constructor () {
        ...
    },  // Dấu phẩy ở đây là sai
    method() {
        ...
    }
}
```

**Static method**

Các static method sẽ được gọi từ class thay vì gọi từ object. Chỉ cần thêm từ khóa `static` vào đầu khai báo method.

Vì static có từ ES6, nên nó phải dùng cách khai báo method mới của ES6, là `static func() {}` chứ không phải `static func: function () {}`.

```script.js
class Student extends Person {
    constructor (name, age, school) {
        super(name, age);
        this.school = school;
    }
    static introduce(student) {
        console.log(student.name, student.age, student.school);
    }
}

let a = new Student('Nguyen Van A', 17, 'Binh Thuan');
let b = new Student('Le Thi B', 18, 'Quang Binh');

Student.introduce(a);
Student.introduce(b);
```

Static method thường dùng để viết các tập method xử lý chính đối tượng đó, vì vậy tham số nhận vào là object tạo ra từ class đó.

### 3. Property

Định nghĩa property trong class thì nó phải ở trong constructor.

```script.js
class Person {
    constructor (name) {
        this._name = name;
    }
    get name() { return this._name; }
    set name(value) { this._name = value; }
}
```

Đối với getter và setter thì tương tự method.