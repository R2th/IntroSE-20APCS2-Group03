# Giới thiệu

![](https://1.bp.blogspot.com/-mzBypNKvfsw/XSS7YgXYNMI/AAAAAAAA0ZU/GC0w0FVL8Y4UV5A2h1V78BvEaDnNOuZ2QCLcBGAs/s728-e100/lodash-prototype-pollution.png)
(Image Source: https://thehackernews.com)

Tấn công __Prototype Pollution__ giống như cái tên đã gợi ý phần nào, là hình thức tấn công (thêm/sửa/xoá thuộc tính) vào prototype của Object trong trong Javascript dẫn đến sai khác logic, nhiều khi dẫn đến việc thực thi những đoạn code tuỳ ý trên hệ thống (Remote Code Excution - RCE). Lỗ hổng này đã được phát hiện ra từ năm 2018 trên một số thư viện Javascript hay dùng là JQuery và đến gần đây lại tiếp tục phát hiện ra lỗ hổng này trên thư viện Lodash, một trong những thư viện phổ biến. Chúng ta cùng thử tìm hiểu xem hình thức tấn công này như thế nào nhé.

# Đối tượng trong Javascript

Trước hết, ta cần hiểu qua về `Object` trong javascript. Object đơn giản là tập hợp của các cặp khoá và giá trị, thường được gọi là các `property` (thuộc tính) của đối tượng đó. Ví dụ:

![](https://images.viblo.asia/763221df-b020-4945-8e81-93c3414d0c50.png)

Sử dụng `{}` giúp chúng ta khai báo một đối tượng mới và gán cho nó các thuộc tính `name` và `user_id` tương ứng. Sau khi khai báo xong, ta có thể truy cập đến các thuộc tính này như bình thường. Tuy nhiên, bên trong của object `user` không chỉ có những thuộc tính ta đã gán mà còn có rất nhiều thông tin khác như ở câu lệnh cuối cùng chỉ ra. Vậy những thuộc tính này đến từ đâu?

Trong Javascript, `Object` là đối tượng cơ bản, là khuôn mẫu cho tất các đối tượng được tạo mới. Ta hoàn toàn có thể tạo một đối tượng rỗng bằng cách truyền `null` vào `Object.create` tuy nhiên, đối tượng mới được tạo ra cũng sẽ có kiểu tương ứng với tham số truyền và kế thừa tất cả các thuộc tính cơ bản.

```javascript
console.log(Object.create(null)); // prints an empty object
```

# Hàm/Lớp trong Javascript

Trong Javascript, khái niệm của class (lớp) và function (hàm) khá liên quan đến nhau (function bản thân nó đóng vai trò như là constructor (hàm khởi tạo) cho class và bản chất thực tế thì ko có khái niệm "class" trong javascript). Chúng ta cùng xem VD sau:

```javascript
function person(fullName, age) {
    this.age = age;
    this.fullName = fullName;
    this.details = function() {
        return this.fullName + " has age: " + this.age;
    }
}

console.log(person.prototype); // prints the prototype property of the function

/*
{constructor: ƒ}
    constructor: ƒ person(fullName, age)
    __proto__: Object
*/

var person1 = new person("Anirudh", 25);
var person2 = new person("Anand", 45);

console.log(person1);

/*
person {age: 25, fullName: "Anirudh"}
age: 45
fullName: "Anand"
__proto__:
    constructor: ƒ person(fullName, age)
        arguments: null
        caller: null
        length: 2
        name: "person"
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: VM134:1
    [[Scopes]]: Scopes[1]
__proto__: Object
*/

console.log(person2);

/*
person {age: 45, fullName: "Anand"}
age: 45
fullName: "Anand"
__proto__:
    constructor: ƒ person(fullName, age)
        arguments: null
        caller: null
        length: 2
        name: "person"
    prototype: {constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: VM134:1
    [[Scopes]]: Scopes[1]
__proto__: Object
*/

person1.details(); // prints "Anirudh has age: 25"
```

Trong ví dụ ở trên, chúng ta đã định nghĩa một hàm tên là `person` và khởi tại 2 đối tượng tên `person1` và `person2`. Nếu chúng ta nhìn vào thuộc tính của những đối tượng mới được tạo, chúng ta có thể để ý thấy 2 điều:

- Khi hàm được tạo, javascript engine đã bao gồm thuộc tính `prototype` vào trong hàm. Thuộc tính prototype này là một đối tượng (được gọi là prototype object)) có một thuộc tính constructor mặc định chỉ về hàm mà chứa thuộc tính prototype này.

-  Khi đối tượng được tạo, javascript engine sẽ thêm một thuộc tính `__proto__` vào trong đội tượng mới được tạo ra, thuộc tính này chỉ tới prototype object của hàm constructor. Nói một cách ngắn gọn, `object.__proto__`  chỉ đến `function.prototype`.

# Constructor là gì?
- `Constructor` là một thuộc tính đặc biệt trả về hàm đã được dùng để tạo ra đối tượng đó. Prototype object có constructor chỉ đến hàm đó và  constructor của constructor sẽ là hàm constructor toàn cục (global). Ví dụ:

```javascript
var person3 = new person("test", 55);

person3.constructor;  // prints the function "person" itself 

person3.constructor.constructor; // prints ƒ Function() { [native code] }    <- Global Function constructor

person3.constructor.constructor("return 1");

/*
ƒ anonymous(
) {
return 1
}
*/

// Finally call the function
person3.constructor.constructor("return 1")();   // returns 1
```

# Prototypes in javaScript
Một điều cần lưu ý đó là thuộc tính prototype có thể bị thay đổi thêm/sửa/xoá khi thực thi code. Ví dụ:

```javascript
function person(fullName, age) {
    this.age = age;
    this.fullName = fullName;
}

var person1 = new person("Anirudh", 25);

person.prototype.details = function() {
        return this.fullName + " has age: " + this.age;
    }

console.log(person1.details()); // prints "Anirudh has age: 25"
```

Ở trên, ta đã thay đổi prototype của hàm và thêm vào đó thuộc tính mới là `details`. Ta có thể làm điều tương tự bằng các sử dụng đống tượng:

```javascript
function person(fullName, age) {
    this.age = age;
    this.fullName = fullName;
}

var person1 = new person("Anirudh", 25);
var person2 = new person("Anand", 45);

// Using person1 object
person1.constructor.prototype.details = function() {
        return this.fullName + " has age: " + this.age;
    }

console.log(person1.details()); // prints "Anirudh has age: 25"

console.log(person2.details()); // prints "Anand has age: 45" :O
```

Bạn có thấy điều gì lạ không :joy: Chúng ta thay đổi đối tượng `person1` nhưng kéo theo ảnh hưởng lên cả `person2`. Lý do cho điều này là ở ví dụ trước, chúng ta thay đổi trực tiếp `person.prototype` để thêm vào thuộc tính mới nhưng ở ví dụ thứ 2, chúng ta làm điều này nhưng ở trên đối tượng. Vì constructor sẽ trả ra hàm được dùng để tạo ra đối tượng nên `person1.constructor` sẽ chỉ đến hàm `person` và `person1.constructor.prototype` lúc này chính là `person.prototype`.

# Prototype Pollution

Lấy ví dụ, `obj[a][b] = value`. Nếu kẻ tấn công có thể điều khiển được  giá trị`a` và `value`, khi đó hắn chỉ cần chỉnh giá trị của `a` thành `__proto__` (chú ý trong javascript, `obj["__proto__"]` và `obj.__proto__` là hoàn toàn tương đương) thì khi đó thuộc tính `b` của tất cả những đối tượng đang tồn tại trong ứng dụng sẽ bị bị gán thành `value`.

Tuy nhiên, tấn công không đơn giản như ở trên, theo [paper](https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf) thì ta chỉ có thể tấn công được khi có 1 trong 3 điều kiện sau:

- Thực hiện việc ghép đệ quy các đối tượng (Object recursive merge)
- Định nghĩa thuộc tính qua đường dẫn (Property definition by path)
- Thực hiện nhân bản đối tượng (clone object)

Chúng ta cùng xem xét thông qua các lỗi sau:

# CVE-2019-11358: Tấn công prototype pollution thông qua jQuery $.extend

`$.extend` nếu xử lý không đúng có thể dẫn tới chỉnh những thuộc tính của `Object` prototype (khuôn mẫu của các object trong app). Khi đó thuộc tính này sẽ xuất hiện trên toàn bộ các đối tượng. Chú ý là chỉ có phiên bản "deep" (tức là g) của `$.extened` bị ảnh hưởng.

Các lập trình viên thường sử dụng hàm này để nhân bản một đối tượng hoặc điền vào các thuộc tính mới từ một đối tượng mặc định. Ví dụ:

```javascript
var myObject = '{ "myProperty" : "a", "__proto__" : { "isAdmin" : true } }'

var newObject = jQuery.extend(true, {}, JSON.parse(myObject))
```

(Ta có thể tưởng tượng myObject là một trường nhập từ người dùng và được serialized vào trong DB)

Ở đoạn code này, thường ta sẽ nghĩ, khi chạy sẽ gán thuộc tính `isAdmin` và trong đối tượng mới được tạo ra. Nhưng về bản chất, nó đang gán thẳng vào `{}` và khi đó `{}.isAdmin` sẽ có giá trị `true`. Nếu sau đoạn code này, ta thực hiện kiểm tra như sau:

```
If (user.isAdmin === true) {
    // do something for admin
}
```

nếu user chưa tồn tại (`undefined`) thì thuộc tính `isAdmin` sẽ được tìm kiếm trong đối tượng cha của nó, chính là Object mà lúc này đã bị thêm vào thuộc tính `isAdmin` với giá trị `true` ở trên.

Ví dụ khác khi thực hiện trên JQuery 3.3.1:

```javascript
$.extend(true, {}, JSON.parse('{"__proto__": {"devMode": true}}'))
console.log({}.devMode); // true
```

Những lỗi này có thể ảnh hướng đến rất nhiều dự án Javascript, đặc biệt là các dự án NodeJS, ví dụ thực tế nhất chính là lỗi ở [Mongoose](https://thecodebarbarian.com/mongoose-prototype-pollution-vulnerability-disclosure.html), thư viện JS giúp thao tác với MongoDB, vào hồi tháng 12 năm 2018.

# CVE-2018-3721, CVE-2019-10744: Tấn công prototype pollution thông qua lodash

[Lodash](https://www.npmjs.com/package/lodash) cũng là một thư viện nổi tiếng cung cấp rất nhiều hàm khác nhau, giúp chúng ta viết code thuận tiện vào gọn gàng hơn với hơn 19 triệu lượt tải hàng tuần. Cách thức khai thác tương tự như với JQuery.

## CVE-2018-3721

```javascript
var _= require('lodash');
var malicious_payload = '{"__proto__":{"oops":"It works !"}}';

var a = {};
console.log("Before : " + a.oops);
_.merge({}, JSON.parse(malicious_payload));
console.log("After : " + a.oops);
```

## CVE-2019-10744

Lỗi này ảnh hưởng đến tất cả các phiên bản của Lodash, kể cả phiên bản mới nhất `4.17.11`. Bản vá sẽ được cập nhật trong thời gian sớm nhất.

```javascript
# PoC by Snyk
const mergeFn = require('lodash').defaultsDeep;
const payload = '{"contructor": {"prototype": {"a0": true}}}';

function check(){
    mergeFn({}, JSON.parse(payload));
    if (({})[`a0`] === true) {
        console.log('Vulnerable to Prototype Pollution via ${payload}');
    }
}
```

# Tôi có thể làm gì để phòng tránh?
1. Đóng băng các thuộc tính bằng `Object.freeze(Object.prototype)`
2. Thực hiện validation trên các input JSON theo đúng schema của ứng dụng
3. Tránh sử dụng các hàm có ghép đệ quy (recursive merge) các đối tượng một cách không an toàn
4. Sử dụng đối tượng không có thuộc tính prototype,  ví dụ `Object.create(null)` để tránh ảnh hưởng đến prototype chain
5. Sử dụng `Map` thay vì `Object`
6. Thường xuyên cập nhật bản vá mới cho các thư viện

# Tham khảo
- https://thehackernews.com/2019/07/lodash-prototype-pollution.html
- https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf
- [HackerOne - Prototype pollution attack (lodash)](https://hackerone.com/reports/310443)
- [HackerOne - Prototype pollution attack through jQuery $.extend](https://hackerone.com/reports/454365)
- [After three years of silence, a new jQuery prototype pollution vulnerability emerges once again](https://snyk.io/blog/after-three-years-of-silence-a-new-jquery-prototype-pollution-vulnerability-emerges-once-again/)
- [Analysis and Exploitation of Prototype Pollution attacks on NodeJs - Nullcon HackIM CTF web 500 writeup](https://blog.0daylabs.com/2019/02/15/prototype-pollution-javascript/)
- https://thecodebarbarian.com/mongoose-prototype-pollution-vulnerability-disclosure.html
- https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf
- https://snyk.io/vuln/SNYK-JS-JQUERY-174006