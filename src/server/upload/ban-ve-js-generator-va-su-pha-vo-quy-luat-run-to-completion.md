Có thể các bạn đã biết tới các khái niệm để thực thi bất đồng bộ trong JS như là callback hay promise. Ngày hôm nay chúng ta sẽ cùng tìm hiểu về generator, một thứ ma thuật giúp biến một async control flow thành một phong cách rất tuần tự và synchronous.

# Generator
Có một phần đông các developer luôn nhìn các dòng code theo kiểu: một function khi bắt đầu thực thi, nó sẽ chạy cho tới khi hoàn thành, và không có đoạn code nào có thể làm gián đoạn hay chạy xen vào.

Điều này có vẻ kì quái nhưng ES6 đã giới thiệu một type mới của function mà không thực thi theo kiểu run-to-completion. Kiểu function mới này gọi là "generator".

Ta đi xem xét ví dụ sau:
```
var x = 1;
function foo() {
    x++;
    bar();                    // <-- what about this line?
    console.log("x: ", x)
}
function bar() {
    x++;
}
foo();                        // x: 3
```
Trong ví dụ, ta biết chắc chắn rằng bar() sẽ chạy giữa `x++` và `console.log(x)`. Nhưng nếu ta không đặt `bar()` ở đó?
Thì tất nhiên kết quả sẽ là 2 thay vì 3 như trên.

Bây giờ thử xoáy vào một chút. Sẽ như nào nếu `bar()` không đặt đó, nhưng ta vẫn có thể bằng một cách nào đó chạy code giữa hai câu lệnh `x++` và `console.log(x)`? Làm thế mèo nào để được thế?

Các ngôn ngữ đa luồng ưu tiên (preemptive multithreaded language) về cơ bản là đều có thể làm cho `bar()` có khả năng "interrupt" hai câu lệnh và chạy ở một thời điểm chính xác giữa chúng. Nhưng JS không preemptive, cũng chẳng phải đa luồng luôn. Tuy nhiên, cách để thực hiện được cái trò "interrupt" này là có thể, nếu như `foo` có thể tự xác định một điểm "pause" ở trong code.

Đoạn code dưới đây là cách thức để ES6 có thể thực hiện việc này:
```
var x = 1;
function *foo() {
    x++;
    yield; // pause!
    console.log("x ", x);
}
function bar() {
    x++;
}
```
Và bây giờ, làm thế nào để ta chạy đoạn code trên theo kiểu `bar()` thực thi ở điểm mà tại đó `yield` nằm trong `*foo()`?
```
// construct an iterator 'it' to control the generator
var it = foo();
// start 'foo()' here!
it.next();
x;                    // 2
bar();
x;                    // 3
it.next();            // x: 3
```
OK, sẽ có một số người thấy cú pháp mới lạ ở hai cái đoạn code trên. Cơ mà trước khi đi giải thích các cú pháp của ES6, hãy đi qua flow của cái đoạn code trên trước:
1. `it == foo()` không thực thi `*foo()`, mà nó construct một *iterator* mà có thể điều khiển việc thực thi của foo. Tí nữa nói về *iterator* sau.
2. Câu lệnh `it.next()` đầu tiên sẽ bắt đầu `*foo()`, và chạy `x++` ở dòng đầu tiên của `*foo()`.
3. `*foo()` dừng ở lệnh `yield`, và đó cũng là lúc lệnh `it.next()` đầu tiên hoàn thành. Ở thời điểm hiện tại, `*foo()` vẫn còn active, nhưng đang ở trạng thái pause.
4. Ta inspect giá trị `x`, và giờ nó là 2.
5. Ta gọi `bar()`, làm tăng `x` lên với lệnh `x++`.
6. Ta inspect giá trị `x`, và giờ nó là 3.
7. Câu lệnh `it.next()` cuối cùng gọi lên và resume `*foo()` tiếp ở chỗ nó bị dừng, và do đó gọi tới lệnh `console.log(..)`, và in ra `x: 3`.

Rõ ràng ta có thể thấy, `foo()` chạy, nhưng không run-to-completion. Nó pause ở `yield`. Ta resume `foo()` sau đó, và cho nó kết thúc, nhưng thậm chí là việc đấy cũng chẳng cần thiết.

Vậy có thể rút ra rằng, một generator là một dạng đặc biệt của function mà có thể start và stop ở nhiều thời điểm, và không cần hoàn thành. Bạn có thể sẽ chưa rõ lắm cái generator này được cái việc gì, và sao cái tính năng đấy lại được coi là mạnh mẽ, nhưng sự thực thì nó là một trong những fundamental building blocks ta sử dụng để cấu trúc nên một pattern gọi là generators-as-async-flow-control. Phần này sẽ được nói cụ thể trong những bài sau.

## Input và Output
Một generator function là một function đặc biệt với mô hình xử lý mới mà ta vừa minh hoạ bên trên. Nhưng nó vẫn là một function, và như thế có nghĩa là nó vẫn còn một số nguyên lý cơ bản của function, đó là vẫn nhận các arguments (aka "input"), và trả về một giá trị (aka "output"):
```
function *foo(x, y) {
    return x * y;
}
var it = foo(6, 7);
var res = it.next();
res.value; // 42
```
Ta đưa `6` và `7` vào `*foo(..)` dưới dạng tham số `x` và `y` tương ứng. Và `*foo(..)` trả giá trị `42` về với đoạn code gọi lên.

Ta có thể thấy một điểm khác biệt khi một generator được gọi và một function bình thường được gọi. `foo(6, 7)` trông có vẻ quen thuộc, tuy nhiên lúc này `*foo(..)` generator chưa được chạy như giống với function bình thường.

Thay vào đó, chúng ta chỉ tạo ra một *iterator* object, và gán nó cho biến `it` để điều khiển `*foo()` generator. Tiếp theo ta gọi `it.next()`, lệnh này sẽ thực thi `*foo(..)` generator từ vị trí hiện tại và dừng ở lệnh `yield` tiếp đó, hoặc tới cuối generator.

Kết quả của lời gọi `next()` là một object với một `value` property giữ giá trị (nếu có) được trả ra từ `*foo()`. `yield` có thể đưa một giá trị ra ngoài generator, giống như một kiểu `return`.

## Iteration Messaging
Ngoài việc generator có thể nhận các đối số và có giá trị trả về, chúng ta còn có một cách để đưa input vào lấy output thông qua `yield` và `next(..)`.
```
function *foo(x) {
    var y = x * (yield);
    return y;
}
var it = foo(6);
// start 'foo(..)'
it.next();
var res = it.next(7);
res.value;             // 42
```
Đầu tiên, ta truyền 6 vào và gọi `it.next()` để bắt đầu `*foo(..)`.

Bên trong `*foo(..)`, lệnh `var y = x ..` bắt đầu được xử lý, nhưng sau đó gặp `yield` nên hàm bị pause lại (ở giữa cái câu lệnh gán luôn), và yêu cầu một lời gọi để cung cấp giá trị tại vị trí của `yield`. Tiếp theo, chúng ta gọi `it.next(7)`, lúc này 7 sẽ được truyền vào thay thế ở vị trí của `yield` khi hàm bị dừng lại lúc nãy.

Vì vậy, lúc này, câu lệnh gán sẽ thành `var y = 6 * 7`. Bây giờ thì lệnh `return y` sẽ trả về giá trị 42 về với kết quả của lời gọi `it.next(7)`.

Chú ý rằng có một vài điều quan trọng và có thể dễ gây bối rối, thậm chí là với các JS developer có kinh nghiệm, đó là một vài hiểu nhầm giữa `yield` và `next(..)`. Tổng thể mà nói, ta sẽ có gọi `next(..)` nhiều hơn số lượng `yield`. Vì câu lệnh `next(..)` đầu tiên luôn là để bắt đầu generator, và chạy tới chỗ `yield` đầu tiên. Do đó, lệnh `next(..)` thứ hai sẽ truyền đối số vào `yield` thứ nhất, lệnh `next(..)` thứ ba truyền vào `yield` thứ hai, và tiếp tục vậy.

#### Câu chuyện về hai câu hỏi

Thực tế thì, ta có thể thấy sự ảnh hưởng của việc hiểu nhầm trên ở đâu?

Xem xét đoạn code trong generator như sau:
```
var y = x * (yield);
return y;
```
Cái `yield` đầu tiên về cơ bản là hỏi rằng: "Nên đặt giá trị nào vào đây?"

Ai sẽ đi trả lời câu hỏi đó? `next()` **đầu tiên** được chạy để bắt đầu generator và đưa tới vị trí `yield` này, thế nên nó không thể trả lời. Vì thế, `next()` **thứ hai** sẽ trả lời câu hỏi được đưa lên bởi `yield` **thứ nhất**.

Và đó chính là sự lầm tưởng có thể xảy ra.

Cơ mà giờ ta hãy nhìn từ một mặt khác. Hãy nhìn nhận vấn đề từ phía iterator chứ ko phải generator.

Để minh hoạ cho góc nhìn này, ta cần phải nằm được rằng messages có thể đi hai chiều, có nghĩa là `yield` có thể gửi message ra ngoài để trả lời `next()`, và `next()` có thể truyền giá trị vào vị trí của `yield`.
```
function *foo(x) {
    var y = x * (yield "Hello"); // <-- yield a value
    return y;
}
var it = foo(6);
var res = it.next();   // first 'next()', don't pass anything
res.value;             // "Hello"
res = it.next(7);      // pass '7' to waiting 'yield'
res.value;             // 42
```
`yield ..` và `next()` đi cặp với nhau như một two-way message passing system trong suốt quá trình thực thi của generator.
Nếu ta chỉ nhìn vào phần code của iterator:
```
var res = it.next();   // first 'next()', don't pass anything
res.value;             // "Hello"
res = it.next(7);      // pass '7' to waiting 'yield'
res.value;             // 42
```
> Chú ý: Ta không truyền giá trị vào `next()` đầu tiên. Chỉ có paused `yield` mới có thể nhận giá trị pass vào bởi `next()`, và ở thời điểm đầu tiên của generator khi ta gọi `next()`, không hề có paused `yield` nào để nhận giá trị cả. Tất cả các browsers chỉ đơn thuần là lặng lẽ bỏ qua tất cả những gì truyền vào `next()` đầu tiên. Sẽ rất là không hay nếu ta cố tính truyền một giá trị vào, nó sẽ chỉ tạo nên một dòng code gây bối rối và khó hiểu. Vì thế nên luôn luôn start một generator với lời gọi `next()` không có đối số.

Lời gọi `next()` **đầu tiên** sẽ đặt ra một câu hỏi: "Giá trị nào tiếp theo mà `*foo()` generator sẽ trả ra?". Và ai sẽ là người trả lời câu hỏi này? Đó là lệnh `yield` **đầu tiên**.

Đó, và không có sự lầm tưởng nào diễn ra ở đây cả.

Dựa trên việc ai là người hỏi câu hỏi, vấn đề về sự nhầm lẫn sẽ có thể xảy ra hoặc không.

Nhưng chờ đã, chúng ta vẫn còn thêm một `next()` cuối cùng nhiều hơn so với số lượng của `yield`. Lúc nó được gọi lên thì hết `yield` rồi, vậy ai sẽ trả lời cho nó câu hỏi về giá trị tiếp theo sẽ sinh ra?

Lệnh `return` sẽ trả lời.

Và nếu không có một `return` nào ở trong generator, chúng ta luôn có một implicit `return;` (aka `return undefined;`) được tự sinh ra. Và nó sẽ trả lời cho lệnh `next()` cuối cùng.

Những câu hỏi và câu trả lời này, hay việc two-way message truyền giữa `yield` và `next(..)`, khá là mạnh. Nhưng đây dĩ nhiên chưa phải toàn bộ về việc làm thế nào cơ chế này kết nối với async flow control. Ta sẽ khám phá ở các bài sau.

## Multiple Iterators
Vấn đề này có thể xuất hiện từ thói quen sử dụng khi ta dùng *iterator* để điều khiển generator. Đó là mỗi khi ta construct một *iterator*, ta ngầm định tạo ra một instance mới của generator mà *iterator* đó điều khiển.
Ta có thể có nhiều instance của một generator cùng chạy một lúc, và chúng thậm chí còn có thể tương tác với nhau:
```
function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}
var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;             // 2 <-- yield 2
var val2 = it2.next().value;             // 2 <-- yield 2

val1 = it1.next(val2 * 10).value;        // 40 <-- x: 20, z: 2
val2 = it2.next(val1 * 5).value;         // 600 <-- x: 200, z: 3

it1.next(val2 / 2);                      // y: 300
                                         // 20 300 3
it2.next(val1 / 4);                      // y: 10
                                         // 200 10 3
```
> Cảnh báo: Phần lớn các common usage khi sử dụng nhiều instance của cùng một generator chạy song song không phải theo cái kiểu trên, mà là khi generator sản sinh ra giá trị của nó mà không có input mà là từ một vài resource chung được kết nối vào trong hàm.

## Interleaving
Đây là một đoạn code theo kiểu "Run-to-completion" thông thường:
```
var a = 1;
var b = 2;

function foo() {
    a++;
    b = b * a;
    a = b + 3;
}
function bar() {
    b--;
    a = 8 + b;
    b = a * 2;
}
```
Với JS function bình thường, ta chỉ có 2 trường hợp có thể xảy ra, đó là `foo()` chạy trước hoặc `bar()` chạy trước, chúng không thể xen vào lẫn nhau.

Tuy nhiên với generator, việc xen lẫn vào nhau là có thể (thậm chí là giữa câu lệnh):
```
var a = 1;
var b = 2;

function *foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}

function *bar() {
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}
```
Dựa trên thứ tự gọi tương ứng của các *iterator* điều khiển `*foo()` và `*bar`, chương trình trên có thể sinh ra những kết quả khác nhaunhau. Hay nói cách khác, ta có thể mô tả (bằng việc fake thứ tự) về lý thuyết của "threaded race conditions".

Đầu tiên, hãy tạo một hàm helper gọi là `step(..)` sẽ điều khiển *iterator*:
```
function step(gen) {
    var it = gen();
    var last;
    
    return function() {
        // whatever is `yield`ed out, just
        // send it right back in the next time!
        last = it.next(last).value;
    }
}
```
`step(..)` khởi tạo một *iterator*, và trả về một function sao cho mỗi khi gọi function này, *iterator* sẽ được next thêm 1 bước. Thêm vào đó, giá trị được `yield` từ lần trước đó sẽ được truyền sang lần tiếp theo. Khi đó, ví dụ như `yield 8` sẽ thành `8` và `yield b` sẽ thành `b`...

Và bây giờ, hãy thử trải nghiệm xem những hiệu ứng có được khi ta xen kẽ những chuỗi khác nhau của `*foo()` và `*bar()`. Ta sẽ bắt đầu với trường hợp chán nhất, đó là đảm bảo rằng `*foo()` kết thúc rồi mới đến `*bar()`:
```
// make sure to reset 'a' and 'b'
a = 1;
b = 2;

var s1 = step(foo);
var s2 = step(bar);

// run '*foo()' completely first
s1();
s1();
s1();

// now run '*bar()'
s2();
s2();
s2();
s2();

console.log(a, b);  // 11 22
```
Kết quả là `11` và `12` không có gì hot. Bây giờ ta có thể gọi lung tung `s1()`, `s2()` xen kẽ và xem xem nó thay đổi kết quả như thế nào:
```
a = 1;
b = 2;

var s1 = step(foo);
var s2 = step(bar);

s2();     // b--;
s2();     // yield 8
s1();     // a++;
s2();     // a = 8 + b;
          // yield 2
s1();     // b = b * a;
          // yield b
s1();     // a = b + 3;
s2();     // b = a * 2;
```
Thử ngồi tính kết quả trước khi nhìn đáp án xem ra bao nhiêu :v
```
console.log(a, b);   // 12 18
```
Các bạn có thể thử tự thay đổi thứ tự và tính kết quả để hiểu rõ vấn đề hơn, thực hành luôn là cách tốt nhất để học một cái gì đó.

# Kết
Hy vọng với chút kiến thức trên sẽ giúp ích được cho các bạn trong công việc cũng như tăng thêm vốn hiểu biết cho các JavaScript developer. Chúc các bạn thành công!


-----
*Dịch và tham khảo từ cuốn [You Don't Know JS - Async and PerformancePerformance](https://www.amazon.com/You-Dont-Know-JS-Performance/dp/1491904224) của Kyle Simpson*