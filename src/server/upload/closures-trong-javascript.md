## Closures are not magic

Bài này giải thích về Closures để lập trình viên có thể hiểu chúng - sử dụng trong code JavaScript. Nó không dành cho các chuyên gia hoặc lập trình viên functional programming.

Closures không khó hiểu một khi ta đã nắm được cốt lõi của nó. Tuy nhiên, ta sẽ rất khó có thể hiểu được bằng cách đọc bất kỳ lời giải thích định hướng lý thuyết hoặc học thuật!

Bài viết này dành cho các lập trình viên có một số kinh nghiệm lập trình bằng ngôn ngữ chính của mình và những người có thể đọc hàm JavaScript sau:

```
function sayHello(name) {
  var text = 'Hello ' + name;
  var say = function() { console.log(text); }
  say();
}
sayHello('Joe');
```

## Định nghĩa ngắn gọn cho Closures

Khi một hàm (foo) khai báo các hàm khác (bar và baz), và một nhóm các biến local được tạo ra bên trong foo không bị xoá đi khi kết thúc hàm, các biến này trở nên vô hình đối với bên ngoài, nhờ đó foo có thể trả về các hàm bar và baz, và chúng có thể tiếp tục thực hiện thao tác read, write và trao đổi với nhau thông qua môi trường đóng bao gồm các biến này (được gọi là Closure) và không ai khác có thể thao tác được với các biến này, kể cả những người gọi lại hàm này vào một lần khác trong tương lai.

Một closure là một cách để hỗ trợ các hàm first-class, nó là một expression có thể gọi tới các biến ở bên trong scope của hàm (khi được khai báo lần đầu), được assign vào một biến, hoặc được gửi đi như một tham số của một hàm hoặc được trả về như kết quả của một hàm.

## Một ví dụ về closure

Đoạn code sau đây trả về một tham chiếu tới một hàm:

```
function sayHello2(name) {
  var text = 'Hello ' + name; // Local variable
  var say = function() { console.log(text); }
  return say;
}
var say2 = sayHello2('Bob');
say2(); // logs "Hello Bob"
```

Hầu hết các lập trình viên JavaScript sẽ hiểu làm thế nào một tham chiếu đến một hàm được trả về một biến `(say2)` trong đoạn mã trên. Nếu bạn chưa hiểu, thì bạn cần phải đọc trước nội dung này trước khi bạn có thể học về closure. Một lập trình viên sử dụng C sẽ nghĩ về hàm như trả về một con trỏ cho hàm và các biến `say` và `say2` là mỗi con trỏ cho một hàm.

Có một sự khác biệt quan trọng giữa con trỏ C với hàm và tham chiếu JavaScript đến hàm. Trong JavaScript, bạn có thể nghĩ về một biến tham chiếu hàm là có cả một con trỏ tới một hàm cũng như một con trỏ ẩn tới một Closure.

Đoạn mã trên có một closure vì hàm hàm anonymous `function () {console.log (text); }` được khai báo bên trong một hàm khác, `sayHello2()` trong ví dụ này. Trong JavaScript, nếu bạn sử dụng từ khóa `function` bên trong một hàm khác, bạn đang tạo một Closure.

Trong C và hầu hết các ngôn ngữ phổ biến khác, sau khi một hàm trả về, tất cả các biến cục bộ không còn truy cập được nữa vì khung stack bị phá hủy.

Trong JavaScript, nếu bạn khai báo một hàm trong một hàm khác, thì các biến local của hàm ngoài có thể vẫn có thể  được truy cập sau khi kết quả hàm đó được return. Điều này được thể hiện ở trên, bởi vì chúng ta gọi hàm `say2()` sau khi chúng ta return hàm `sayHello2()`. Lưu ý rằng đoạn code trên tham chiếu tới biến `text`, là biến local của hàm `sayHello2()`.

```
function() { console.log(text); } // Output of say2.toString();
```

Nhìn vào output của `say2.toString()`, chúng ta có thể thấy rằng đoạn code có tham chiếu tới biến `text`. Hàm anonymous có thể tham chiếu biến `text` chứa giá trị 'Hello Bob' vì các biến cục bộ của `sayHello2()` đã được giữ bí mật để tồn tại trong một bao đóng.

Điểm tuyệt vời trong JavaScript đó là, một tham chiếu hàm cũng có một tham chiếu bí mật đến Closure mà nó được tạo ra - tương tự như cách các `delegates` là một con trỏ phương thức cộng với một tham chiếu bí mật đến một đối tượng.

## Các ví dụ khác

Vì một số lý do, closures có vẻ rất khó hiểu khi bạn đọc về chúng, nhưng khi bạn thấy một số ví dụ, nó trở nên rõ ràng hơn về cách chúng hoạt động. Bạn nên học thông qua các ví dụ một cách cẩn thận cho đến khi bạn hiểu cách chúng hoạt động. Nếu bạn bắt đầu sử dụng các closures mà không hiểu đầy đủ về cách chúng hoạt động, bạn sẽ sớm tạo ra một số lỗi rất kỳ lạ!

### Ví dụ số 3

Ví dụ này cho thấy các biến local không được copy mà nó được giữ bằng các tham chiếu. Nó giống như một stack-frame vẫn tồn tại trong memory ngay cả khi hàm cha kết thúc.

```
function say667() {
  // Local variable that ends up within closure
  var num = 42;
  var say = function() { console.log(num); }
  num++;
  return say;
}
var sayNumber = say667();
sayNumber(); // logs 43
```

### Ví dụ số 4

Cả ba hàm global có chung tham chiếu tới một closure bởi vì chúng đều được khai báo bên trong một lần gọi duy nhất tới hàm `setupSomeGlobals()`.

```
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  // Local variable that ends up within closure
  var num = 42;
  // Store some references to functions as global variables
  gLogNumber = function() { console.log(num); }
  gIncreaseNumber = function() { num++; }
  gSetNumber = function(x) { num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog() // 5
```

Ba hàm đã chia sẻ quyền truy cập vào cùng một closure - các biến local của `setupSomeGlobals()` khi ba hàm được xác định.

Lưu ý rằng trong ví dụ trên, nếu bạn gọi lại setupSomeGlobals (), thì một closure mới (stack-frame!) Được tạo. Các biến gLogNumber, gIncreasNumber, gSetNumber cũ được ghi đè bằng các hàm mới có closure mới. (Trong JavaScript, bất cứ khi nào bạn khai báo một hàm bên trong một hàm khác, (các) hàm bên trong sẽ / được tạo lại mỗi lần hàm ngoài được gọi.)

### Ví dụ số 5

Ví dụ này cho thấy Closure chứa bất kỳ biến local nào được khai báo bên trong hàm cha trước khi thoát. Lưu ý rằng biến `alice` thực sự được khai báo sau hàm anonymous. Hàm anonymous được khai báo đầu tiên và khi hàm đó được gọi, nó có thể truy cập biến `alice` vì `alice` nằm trong cùng phạm vi (JavaScript sử dụng `variable hoisting`). Ngoài ra `sayAlice()` chỉ gọi trực tiếp tham chiếu hàm được trả về từ `sayAlice()` - nó hoàn toàn giống với những gì đã được thực hiện trước đó nhưng không có biến tạm thời.

```
function sayAlice() {
    var say = function() { console.log(alice); }
    // Local variable that ends up within closure
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();// logs "Hello Alice"
```

Chú ý rằng biến `say` cũng nằm bên trong closure và có thể được truy cập bởi bất kỳ hàm nào được khai báo bên trong `sayAlice()`, hoặc có có thể được truy cập một cách đệ quy bên trong hàm con.

### Ví dụ số 6

Đây thực sự là một "cú lừa" cho nhiều người, vì vậy bạn cần phải hiểu nó. Hãy cẩn thận nếu bạn đang định nghĩa một hàm trong một vòng lặp: các biến cục bộ từ closure có thể không hoạt động như bạn nghĩ lúc đầu.

Bạn cần hiểu tính năng "variable hoisting" trong Javascript để hiểu ví dụ này.

```
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

 testList() //logs "item2 undefined" 3 times
 ```

Đoạn code `result.push( function() {console.log(item + ' ' + list[i])}` thêm vào một tham chiếu tới một hàm anonymous ba lần tới mảng kết quả. Nếu bạn không quen với hàm anonymous, hãy nghĩ rằng nó giống như là:

```
pointer = function() {console.log(item + ' ' + list[i])};
result.push(pointer)
```

 Hãy chú ý khi bạn thực hiện ví dụ trên, kết quả "item2 undefined" được log lại ba lần! Lý do cũng giống như ví dụ trước, chỉ có đúng một closures cho các biến local cho `buildList1` (đó là `result`, `i` và `item`). Khi các hàm anonymous được gọi trong dòng `fnlish[j]()`; chung sử dụng chung một closure duy nhất, và chúng sử dụng giá trị hiện tại cho `i` và `item` bên trong một closure đó (trong đó `i` có giá trị bằng 3 bởi vì sau khi vòng lặp kết thúc, i=2 và i++; tương tự như vậy với `item2`.
 
 Nó có thể giúp ích cho bạn nếu bạn xem điều gì xảy ra khi một lời khai báo của biến `item` ở cấp độ `block` được sử dụng (thông qua keyword `let`) thay vì một lời khai báo ở cấp độ hàm thông qua keyword `var`. Nó bạn thay đổi theo hướng đó, thì mỗi hàm anonymous trong mảng `result` sẽ có closure riêng của nó; và khi thực hiện lại ví dụ trên sẽ cho ra kết quả như sau:

```
item0 undefined
item1 undefined
item2 undefined
```

If the variable i is also defined using let instead of var, then the output is:
Nếu biến `i` cũng được định nghĩa sử dụng keyword `let` thay vì `var`, thì kết quả sẽ trở thành

```
item0 1
item1 2
item2 3
```

### Ví dụ số 7

Trong ví dụ cuối cùng, mỗi lời gọi tới hàm chính tạo ra một closure riêng rẽ.

```
function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;
```

## Tóm lại

Nếu mọi thứ vẫn chưa rõ ràng với bạn, thì việc tốt nhất đó là ngồi thử với các ví dụ. Đọc một lời giải thích sẽ khó khăn hơn nhiều việc hiểu các ví dụ. Lời giải thích trên về closures và stack-frames... không hoàn toàn đúng về mặt kỹ thuật - nó là những sự đơn giản hoá nhằm mục đích giúp bạn hiểu được. Một khi những ý tưởng cơ bản được nắm rõ, bạn có thể đi đến những thứ chi tiết hơn.

## Điều cuối cùng

Whenever you use function inside another function, a closure is used.
Whenever you use eval() inside a function, a closure is used. The text you eval can reference local variables of the function, and within eval you can even create new local variables by using eval('var foo = …')
When you use new Function(…) (the Function constructor) inside a function, it does not create a closure. (The new function cannot reference the local variables of the outer function.)
A closure in JavaScript is like keeping a copy of all the local variables, just as they were when a function exited.
It is probably best to think that a closure is always created just an entry to a function, and the local variables are added to that closure.
A new set of local variables is kept every time a function with a closure is called (given that the function contains a function declaration inside it, and a reference to that inside function is either returned or an external reference is kept for it in some way).
Two functions might look like they have the same source text, but have completely different behavior because of their 'hidden' closure. I don't think JavaScript code can actually find out if a function reference has a closure or not.
If you are trying to do any dynamic source code modifications (for example: myFunction = Function(myFunction.toString().replace(/Hello/,'Hola'));), it won't work if myFunction is a closure (of course, you would never even think of doing source code string substitution at runtime, but...).
It is possible to get function declarations within function declarations within functions… and you can get closures at more than one level.
I think normally a closure is a term for both the function along with the variables that are captured. Note that I do not use that definition in this article!
I suspect that closures in JavaScript differ from those normally found in functional languages.

## Tham khảo

1. https://stackoverflow.com/questions/111102/how-do-javascript-closures-work
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript