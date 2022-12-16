Mọi developer đều thi thoảng mắc lỗi khi viết ứng dụng. Đây là một phần cơ bản của quá trình phát triển. Trong đó, có một số lỗi mà sẽ bị mắc phải thường xuyên hơn các lỗi khác. Sẽ thật tốt nếu ta nhận biết được chúng và phòng tránh trước khi mắc phải. Một khi làm được điều đó thì chúng ta sẽ phát triển ứng dụng một cách dễ dàng hơn rất nhiều. Dưới đây là 10 lỗi phổ biến mà các Javascript developer thường gặp phải:
## Tham chiếu sai đến `this`
Các kỹ thuật coding và các mẫu thiết kế trong Javascript ngày càng tinh vi, và cùng với đó là sự tăng lên của self-referencing scopes trong callback và closure, một nguồn gốc của sự nhầm lẫn về this/that.

Xem xét đoạn code dưới đây:
```
Game.prototype.restart = function () {
  this.clearLocalStorage();
  this.timer = setTimeout(function() {
    this.clearBoard();    // what is "this"?
  }, 0);
};
```
Thực thi đoạn code trên sẽ dẫn đến một lỗi:
```
Uncaught TypeError: undefined is not a function
```
Tại sao?

Ta cần xem xét *context*. Nguyên nhân của lỗi trên là bởi vì, khi bạn gọi hàm `setTimeout()` thì thực sự ở đây bạn gọi đến hàm `window.setTimeout()`. Kết quả là hàm bạn truyền vào `setTimeout()` được định nghĩa trong context của window object. `this` ở đây là window object và nó không có hàm `clearBoard()`

Giải pháp truyền thống là lưu tham chiếu đến `this` trong một biến và có thể sử dụng bởi closure.
```
Game.prototype.restart = function () {
  this.clearLocalStorage();
  var self = this;   // save reference to 'this', while it's still this!
  this.timer = setTimeout(function(){
    self.clearBoard();    // oh OK, I do know who 'self' is!
  }, 0);
};
```
Một cách khác hiện đại hơn, bạn có thể sử dụng `bind()` để truyền một tham chiếu đúng:
```
Game.prototype.restart = function () {
  this.clearLocalStorage();
  this.timer = setTimeout(this.reset.bind(this), 0);  // bind to 'this'
};

Game.prototype.reset = function(){
    this.clearBoard();    // ahhh, back in the context of the right 'this'!
};
```
## Nghĩ rằng có block-level scope
Một nhầm lẫn của các developer là giả định rằng Javascript tạo ra một scope mới cho mỗi code block. Mặc dù điều này là đúng trong rất nhiều các ngôn ngữ lập trình khác, tuy nhiên nó không đúng với Javascript.

Ví dụ, xem xét đoạn code sau:
```
for (var i = 0; i < 10; i++) {
  /* ... */
}
console.log(i);  // what will this output?
```
Nếu bạn cho rằng `console.log()` sẽ in ra `undefined` hay ném ra một lỗi thì bạn đã sai. Tin được hay không, nó sẽ in ra output là 10. Tại sao?

Trong hầu hết các ngôn ngữ khác, đoạn code trên sẽ lỗi vì biến `i` chỉ có thể dùng trong block của vòng lặp `for`. Tuy nhiên, trong Javascript, biến `i` vẫn trong scope kể cả sau khi vòng lặp `for` kết thúc và giữ lại giá trị của nó sau khi thoát khỏi vòng lặp. Hành vi này được gọi là variable hoisting.

Điều đáng chú ý là block scope được hỗ trợ trong Javascript thông qua từ khóa `let`.
## Rò rỉ bộ nhớ
Rò rỉ bộ nhớ là vấn đề hầu như không thể tránh khỏi trong Javascript nếu bạn không có ý thức phòng tránh chúng. Có rất nhiều cách có thể làm rò rỉ bộ nhớ, vì vậy ta sẽ chỉ nhấn mạnh một số trường hợp phổ biến.

**Ví dụ 1: Tham chiếu lỏng lẻo đến các object không còn tồn tại.**

Xem xét đoạn code sau:
```
var theThing = null;
var replaceThing = function () {
  var priorThing = theThing;  // hold on to the prior thing
  var unused = function () {
    // 'unused' is the only place where 'priorThing' is referenced,
    // but 'unused' never gets invoked
    if (priorThing) {
      console.log("hi");
    }
  };
  theThing = {
    longStr: new Array(1000000).join('*'),  // create a 1MB object
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000);    // invoke `replaceThing' once every second
```
Nếu bạn thực thi đoạn code trên và theo dõi bộ nhớ được sử dụng, bạn sẽ thấy một lượng bộ nhớ lớn bị rò rỉ, 1MB mỗi giây. Điều đó trông như ta đang bị rò rỉ `longStr` mỗi khi `replaceThing` được gọi. Nhưng tại sao?

Hãy kiểm tra kỹ hơn.

Mỗi `theThing` object chứa 1MB `longStr` object. Mỗi giây, khi ta gọi `replaceThing`, nó giữ một tham chiếu đến `theThing` object trước trong `priorThing`. Nhưng có lẽ đây không phải là vấn đề, vì mỗi lần chạy qua, tham chiếu trước đó đến `priorThing` sẽ bị hủy (khi `priorThing` được gán lại thông qua `priorThing = theThing;`). Hơn thế nữa, nó chỉ được tham chiếu đến trong thân hàm `replaceThing` và trong hàm `unused` không bao giờ được sử dụng.

Vậy tại sao lại có sự rò rỉ bộ nhớ ở đây?

Để hiểu điều gì xảy ra, chúng ta cần hiểu rõ hơn về cách mọi thứ hoạt động trong Javascript. Nếu cả hai hàm được định nghĩa trong `replaceThing` thực sự sử dụng `priorThing`, thì điều quan trọng là cả hai đều nhận cùng một object, kể cả nếu `priorThing` được gán đi gán lại, cả hai hàm vẫn sử dụng cùng mội môi trường lexical. Nhưng ngay khi một biến được sử dụng bởi bất kỳ một closure nào, nó kết thúc trong môi trường lexical được chia sẻ bởi tất cả closure trong scope đó. Và nó dẫn đến rò rỉ bộ nhớ.

**Ví dụ 2: Tham chiếu vòng tròn**

```
function addClickHandler(element) {
    element.click = function onClick(e) {
        alert("Clicked the " + element.nodeName)
    }
}
```
Ở đây, `onClick` có một closure giữ tham chiếu đến element (thông qua `element.nodeName`). Bằng cách gán `onClick` cho `element.click`, tham chiếu vòng tròn được tạo ra: `element` -> `onClick` -> `element` -> `onClick` -> `element`…

Kể cả nếu `element` được xóa khỏi DOM, sự tham chiếu như trên vẫn sẽ ngăn chặn không cho `element` và `onClick` được dọn dẹp, và do đó, dẫn đến rò rỉ bộ nhớ.

**Phòng tránh rò rỉ bộ nhớ: Những gì bạn cần biết**

Việc quản lý bộ nhớ trong Javascript phụ thuộc chủ yếu vào khả năng truy cập object.

Các object sau được cho là có thể truy cập và được coi là root:
* Object được tham chiếu từ bất kỳ đâu trong call stack hiện tại (tất cả các biến cục bộ, các tham số trong hàm đang được gọi, các biến trong closure scope)
* Tất cả các biến toàn cục.

Object được giữ trong bộ nhớ ít nhất là khi chúng còn có thể truy cập được từ bất kỳ một root nào thông qua tham chiếu hay một chuỗi các tham chiếu. 
## Nhầm lẫn khi so sánh bằng
Một trong những tiện lợi của Javascript là tự động ép kiểu cho giá trị boolean khi tham chiếu đến một boolean context. Nhưng đôi khi việc tiện lợi này lại gây nhầm lẫn. Ví dụ một vài điều sau đây thường gây khó chịu cho các Javascipt developer:
```
// All of these evaluate to 'true'!
console.log(false == '0');
console.log(null == undefined);
console.log(" \t\r\n" == 0);
console.log('' == 0);

// And these do too!
if ({}) // ...
if ([]) // ...
```
Như ví dụ mô tả trên, các quy tắc ép kiểu đôi khi không rõ ràng, do đó, tốt hơn hết nên sử dụng `===` thay vì `==`.

Thêm một điều cần lưu ý là việc so sánh mọi thứ với `NaN` sẽ luôn trả về `false`. Do đó, để xác định một giá trị là `NaN` cần sử dụng một hàm toàn cục có sẵn `isNaN()`:
```
console.log(NaN == NaN);    // false
console.log(NaN === NaN);   // false
console.log(isNaN(NaN));    // true
```
## Việc thao tác DOM không hiệu quả
Javascript cung cấp việc thao tác các phần tử DOM một cách khá dễ dàng, tuy nhiên không có điều gì để thúc đẩy để làm việc đó một cách hiệu quả.

Một ví dụ phổ biến là thêm một loạt các phần tử DOM cùng một lúc. Việc thêm một phần tử DOM là một hoạt động khá tiêu tốn chi phí, do đó, việc thêm đồng loạt các phần tử DOM là không hiệu quả và có thể không hoạt động đúng.

Một thay thế hiệu quả khi cần thêm nhiều phần tử DOM là sử dụng `document fragments`. Nó sẽ cải thiện cả hiệu quả lẫn hiệu suất.

Ví dụ:
```
var div = document.getElementsByTagName("my_div");

var fragment = document.createDocumentFragment();

for (var e = 0; e < elems.length; e++) {  // elems previously set to list of elements
    fragment.appendChild(elems[e]);
}
div.appendChild(fragment.cloneNode(true));
```
## Sử dụng sai định nghĩa hàm trong vòng lặp `for`
Theo dõi đoạn code sau:
```
var elements = document.getElementsByTagName('input');
var n = elements.length;    // assume we have 10 elements for this example
for (var i = 0; i < n; i++) {
    elements[i].onclick = function() {
        console.log("This is element #" + i);
    };
}
```
Ở đoạn code trên, nếu ta có 10 phần tử `input`, khi click vào bất kỳ phần tử nào thì ta đều nhận được thông báo "This is element #10". Đó là do khi `onclick` được kích hoạt trên bất kỳ phần tử nào thì vòng lặp `for` khi đó đã hoàn thành và giá trị của `i` là 10. Sau đây là cách để sửa đoạn code trên để đạt được hành vi mong muốn:
```
var elements = document.getElementsByTagName('input');
var n = elements.length;    // assume we have 10 elements for this example
var makeHandler = function(num) {  // outer function
     return function() {   // inner function
         console.log("This is element #" + num);
     };
};
for (var i = 0; i < n; i++) {
    elements[i].onclick = makeHandler(i+1);
}
```
Với cách sửa như trên, `makeHandler` được thực thi ngay lập tức mỗi lần chạy qua vòng lặp, nhận tham số `i + 1` và bind nó vào scope của biến `num`. Việc này sẽ đảm bảo mỗi sự kiện `onclick` sẽ nhận được giá trị `i` phù hợp thông qua biến `num` này.
## Vận dụng không triệt để kế thừa prototype
Một số lượng lớn các Javascript developer không hiểu đầy đủ và tận dụng không triệt để các tính năng của kế thừa prototype.

Ví dụ:
```
BaseObject = function(name) {
    if(typeof name !== "undefined") {
        this.name = name;
    } else {
        this.name = 'default'
    }
};
```
Nhìn có vẻ khá đơn giản. Nếu truyền vào `name` thì sẽ sử dụng nó, nếu không sẽ gán name là "default".
```
var firstObj = new BaseObject();
var secondObj = new BaseObject('unique');

console.log(firstObj.name);  // -> Results in 'default'
console.log(secondObj.name); // -> Results in 'unique'
```
Nhưng nếu ta làm như sau:
```
delete secondObj.name;
```
thì sẽ nhận được:
```
console.log(secondObj.name); // -> Results in 'undefined'
```
Nhưng sẽ tốt hơn nếu nó là giá trị mặc định "default". Điều này có thể đạt được bằng cách tận dụng kế thừa prototype:
```
BaseObject = function (name) {
    if(typeof name !== "undefined") {
        this.name = name;
    }
};

BaseObject.prototype.name = 'default';
```
Với cách này, `BaseObject` kế thừa thuộc tính `name` từ `prototype` object. Nếu thuộc tính `name` bị xóa khỏi một thể hiện của `BaseObject`, prototype chain sẽ được tìm kiếm và `name` sẽ được lấy từ `prototype` object và có giá trị là "default". Do đó ta sẽ có:
```
var thirdObj = new BaseObject('unique');
console.log(thirdObj.name);  // -> Results in 'unique'

delete thirdObj.name;
console.log(thirdObj.name);  // -> Results in 'default'
```
## Tạo tham chiếu không đúng đến các instance method
Hãy định nghĩa một object, và tạo một instance của nó:
```
var MyObject = function() {}

MyObject.prototype.whoAmI = function() {
    console.log(this === window ? "window" : "MyObj");
};

var obj = new MyObject();
```
Bây giờ, để thuận tiện, tạo một tham chiếu đến `whoAmI` và ta có thể gọi nó bằng cách `whoAmI()` thay vì `obj.whoAmI()`.
```
var whoAmI = obj.whoAmI;
```
Để chắc chắn mọi thứ trùng khớp, in ra giá trị của `whoAmI`:
```
console.log(whoAmI);
```
Kết quả:
```
function () {
    console.log(this === window ? "window" : "MyObj");
}
```
Ok, nhìn có vẻ tốt.

Nhưng bây giờ, nhìn sự khác nhau khi ta gọi `obj.whoAmI()` và `whoAmI()`:
```
obj.whoAmI();  // outputs "MyObj" (as expected)
whoAmI();      // outputs "window" (uh-oh!)
```
Điều gì sai ở đây.

Khi ta thực hiện phép gán `var whoAmI = obj.whoAmI;`, biến `whoAmI` được định nghĩa trong global namespace. Và kết quả là, giá trị của `this` là `window`, không phải là `object` instance của `MyObject`.

Do đó, nếu ta cần tạo một tham chiếu đến một method của một object, ta cần chắc rằng điều đó được thực hiện trong object namspace để giữ được giá trị của `this`. Ví dụ:
```
var MyObject = function() {}

MyObject.prototype.whoAmI = function() {
    console.log(this === window ? "window" : "MyObj");
};

var obj = new MyObject();
obj.w = obj.whoAmI;   // still in the obj namespace

obj.whoAmI();  // outputs "MyObj" (as expected)
obj.w();       // outputs "MyObj" (as expected)
```
## Sử dụng string làm tham số đầu tiên của `setTimeout` hay `setInterval`
Việc truyền tham số đâù tiên vào `setTimeout` hay `setInterval` một giá trị string không phải là một lỗi. Vấn đề ở đây là về hiệu suất. Nếu ta truyền tham số là string như vậy, nó sẽ được gửi đến function constructor và được chuyển đổi thành một hàm mới. Quá trình này chậm và không hiệu quả, và thực sự nó không cần thiết.

Thay vì viết như sau:
```
setInterval("logTime()", 1000);
setTimeout("logMessage('" + msgValue + "')", 1000);
```
hãy chuyển đổi nó thành:
```
setInterval(logTime, 1000);   // passing the logTime function to setInterval

setTimeout(function() {       // passing an anonymous function to setTimeout
    logMessage(msgValue);     // (msgValue is still accessible in this scope)
  }, 1000);
```
## Không sử dụng "strict mode"
"strict mode" là một cách để thực thi các phân tích cú pháp và xử lý lỗi nghiêm ngặt hơn với code Javascript tại thời điểm runtime.

Dưới đây là một số lợi ích chính của việc sử dụng "strict mode":
* Làm cho việc gỡ lỗi trở nên dễ dàng hơn: những lỗi có thể bị bỏ qua hoặc thất bại một cách âm thầm sẽ được ném ngoại lệ.
* Ngăn chặn việc vô tình tạo biến toàn cục: Nếu không sử dụng "strict mode", việc gán giá trị cho một biến chưa được định nghĩa sẽ tự động tạo một biến toàn cục. Đây là một lỗi khá phổ biến trong Javascript. Với "strict mode", làm việc như vậy sẽ ném ra một ngoại lệ.
* Ngăn chặn tham chiếu đến `this` là null hay undefined. 
* Không cho phép trùng lặp tên các thuộc tính của một object hay các tham số của một hàm.
* Ném ra lỗi khi sử dụng sai `delete`. `delete` không thể được sử dụng với thuộc tính non-configurable. Khi không sử dụng "strict mode" thì hành vi như vậy sẽ thất bại một cách thầm lặng mà ta không biết. Nhưng với "strict mode" thì lỗi sẽ được thông báo.
## Tham khảo
[https://www.toptal.com/javascript/10-most-common-javascript-mistakes](https://www.toptal.com/javascript/10-most-common-javascript-mistakes)