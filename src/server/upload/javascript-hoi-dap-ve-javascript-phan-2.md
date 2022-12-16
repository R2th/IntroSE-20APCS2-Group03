## Introduction
Quay trở lại với series hỏi đáp về javascript, hôm nay chúng ta sẽ đi qua các câu hỏi, các khái niệm về **scope**, **lexical scope**, **hoisting**, **function**, **IIFE**, **function expression**, **function declaration**, **closure**. Let's get started.
## Scope
### C10. Scope là gì?
Scope là tập các rules để lưu trữ variable sao cho ta có thể truy xuất nó sau này. Hơi khó hiểu phải không, bạn cứ tưởng tượng thế này. Scope chính là các đất nước trên thế giới, mỗi đất nước đều có tập các rules để phân biệt với nhau (biên giới, tọa độ, quốc kì, ...), khi này người dân (variables) thỏa mãn các điều kiện (rules) thì sẽ thuộc đất nước đó. Nhưng trong đất nước thì cũng có các scope nhỏ hơn, ví dụ Hà Nội chẳng hạn, một người thuộc scope Hà Nội (người Hà Nội) thì cũng thuộc scope Việt Nam (vì Hà Nội nằm trong Việt Nam). Nhưng nếu mà lỡ một variable nào đó lạc sang scope Trung Quốc (chả liên quan gì Việt Nam ngoài thi thoảng sang xin tí đất), thì javascript sẽ tìm cách báo lỗi: "Có thằng vượt biên, có thằng vượt biên".

![](https://images.viblo.asia/2b079305-ebcf-4a45-8199-aa0c21d2ef42.jpg)

Mỗi ngôn ngữ thì sẽ implement một loại scope (như mình nói ở trên, là tập các quy tắc, rules) khác nhau. Ví dụ Việt Nam và Trung Quốc sử dụng chung 1 scope có 1 rule là "cấm vượt biên" nên nếu có variable vượt biên sẽ gây lỗi, nhưng Châu Âu thì lại implement 1 scope khác, "Sang thoải con gà mái rule", nên khi vượt biên thì sẽ không bị gì. Javascript và đa phần các ngôn ngữ đều sử dụng *lexical scope*. Vậy thì ...

### C11. Thế nào là lexical scope?
Tôi tin là khi mà các bạn đi phỏng vấn hay đọc các bài post về javascript, thi thoảng các bạn sẽ gặp khái niện này: **lexical scope**. Muốn hiểu khái niệm này thì cần đi sâu hơn vào cách javascript compile và transpile code một chút.

![](https://images.viblo.asia/2aa97978-70ee-4631-a05e-363690a8b471.png)

Khi compile code, javascript engine sẽ trải qua 3 giai đoạn
1. Tokenizing / Lexing: chuyển string (code) thành các tokens. Ví dụ statement sau `var a = 2;` sẽ được chuyển thành `var`, `a`, `=`, `2`, `;`
2. Parsing: chuyển các tokens thành một AST (Abstract syntax tree) đại diện cho cấu trúc ngữ nghĩa của chương trình. Ví dụ từ tập các tokens trên, tôi sẽ build ra 1 tree có root node là `VariableDeclaration`, nó sẽ có 2 child node là `Identifier` có value là `a` và `AssignmentExpression`, node này có 1 node con là `NumericLiteral` có value là 2.
3. Code - Generation: chuyển AST thành executable code. `var a = 2` sẽ được chuyển thành các machine instructions: tạo variable a, assign cho giá trị = 2, rồi lưu vào memory.

Lúc trước tôi có nói compiler của javascript không giống các ngôn ngữ compiled thông thường, và ngoài 3 bước trên thì nó còn thực hiện thêm 1 vài bước mà chỉ chúa mới biết. Nhưng trọng tâm là giải thích cho các bạn hiểu về lexical scope nên tôi không đề cập tới.
Vậy là ta hiểu thêm 1 chút về compiler và các steps của nó, bạn có thấy quen quen không. **lexical scope** , **lexing**. Vâng, chuẩn cmnr. **lexical scope** chính là scope được quyết định ở giai đoạn **lexing**, lúc compile, chứ không phải lúc execute. Và để dễ hiểu hơn, **lexical scope** là scope mà ta chỉ cần nhìn nó thế nào, thì scope của nó là thế đấy. 
Ví dụ:
```
var a = 2;
function print() {
    console.log(a); // 2
    var b = 100;
}
print();
console.log(b); //ReferenceError: b is not defined
```
Làm thế nào để không chạy mà cũng biết nó bị lỗi, hãy nghe tôi: **NHÌN**, vâng, chỉ cần nhìn thôi, không cần biết lúc chạy code thế nào, miễn là bạn code nó như thế, nhìn nó như thế, thì scope của nó sẽ là vậy. `var a = 2;` tức là nó ở global scope, thế thì dùng nó ở đâu mà chả được, còn `var b = 100;` nằm ở scope của function `print`, hay còn gọi là local variable. Nhưng chúng ta lại có ý định dùng nó ở scope bên ngoài. `ERRRRRRRRRR` - Vượt biên - Báo lỗi.

### C12. Áp dụng kiến thức về lexical scope. Đoạn code sau in ra gì:
```javascript
function foo() {
    var a = 2;
    console.log(a);
}

function bar() {
    var a = 3;
    foo();
}

var a = 'Ahihi';
bar();
```

=> Đoạn code sẽ in ra `2`. Và nếu ta bỏ đoạn code `var a = 2;` trong function `foo` thì nó sẽ in ra ... `Ahihi`. Có lẽ, tôi cũng không cần phải giải thích nhỉ.


### C13. Thế nào là hoisting?
Nhắc tới, scope, lexical scope mà quên mất hoisting là không được. Nhưng trước khi giải thích khái niệm hoisting. Tôi sẽ giải đáp câu **C9** của post trước. Câu ấy như sau:
> **C9. Đoạn code sau in ra gì:**
```
console.log(a);
var a = 100;
```

Các bạn làm về javascript được bao lâu rồi, nếu trên 1 năm mà trả lời là 100 thì xin lỗi, các bạn nên **CHẠY NGAY ĐI**, nộp đơn xin nghỉ việc đi là vừa.
Đùa thôi, thi thoảng bị hỏi lại câu này, tôi vẫn trả lời là *Error chứ còn lăn tăn cm gì nữa*. Thực ra đáp án của nó là:
=> `undefined` Tại sao lại là `undefined`?? Hãy đọc lại post  trước của tôi, 3 trường hợp `undefined`, bạn nghĩ câu C9 rơi vào trường hợp nào mà lại ra `undefined`.
Là trường hợp đầu tiên, biến `a` **đã được khai báo**, **nhưng chưa được assign value**, nên nó giữ giá trị `undefined`. wtf, khai báo lúc sau mà. Chắc các bạn đang thốt lên vậy đúng không.

![](https://images.viblo.asia/7dd08274-917a-40b5-9c59-a0b1c6ea51b4.jpg)

Trong javascript tồn tại một khái niệm là **hoisting**. Miễn là ta khai báo variable, nó sẽ được sử dụng ở bất cứ đâu trong **lexical scope**. Đó, rõ ràng chưa, ta đã khai báo `var a = 100;` ngay sau lệnh `console.log(a);`. Điều này cũng tương tự việc dù bạn đang sống ở Sài Gòn, nhưng vẫn đăng kí được sổ hộ khẩu Hà Nội vậy. Có thể các bạn sẽ thấy ngoài tác dụng gây thêm vài cái bug thì nó không được tích sự gì cả. Đây cũng chính là lý do, trong ES6, nếu các bạn khai báo với `let` hoặc `const` thì hoisting không còn tạc dụng nữa
```
console.log(a); //ReferenceError
let a = 'ahihi'; // the same with const
```

### C14. Function scope vs Block scope?
Tôi đã có nhắc về sự khác biệt này trong một bài về [ES6 - The Good Part (Phần 1)](https://viblo.asia/p/es6-the-good-part-phan-1-L4x5xQ1mKBM). Scope trong javascript là **Function scope**. Tức là một khi bạn khai báo một variable trong function, scope cuả nó sẽ là nằm bên trong function đấy (Như kiểu sinh ra ở Việt Nam thì là dân Việt Nam luôn ấy). Trong ES6 thì người ta thêm 1 rule nữa, tạo ra 1 scope là **Block scope**, miễn là bạn khai báo variable giữa 2 giấu ngoặc nhọn `{ }` thì scope của nó là nằm trong 2 dấu ngoặc ấy. Điều này sẽ tốt cho bạn khi khai báo ở trong `if`, `while`, `for`, tên biến sẽ không bị pollute ra bên ngoài, mà lại tốt cho việc garbage collection.

```javascript
function run() {
    if (100 > 20) {
        var m = 100;
        console.log(m, "meters !!");
    }
    console.log("you ran ", m, "meters");
}
run();  //100meters !! 
            //you ran 100 meters;
```
Tôi đã đảo thứ tự khai báo variable `m` đi một chút, nhưng function `run()` vẫn hoạt động êm ru, sao lại thế? Bởi `var` là function scope, nên dù khai báo bên trong mệnh đề `if` nó vẫn được vô tư sử dụng bên ngoài, miễn là còn nằm trong function (không thể hư cấu hơn :D ). 
Giải pháp ở đây chính là const và let (block scope). Tương tự với function scope, miễn là variable khai báo với `const` hoặc `let`, ta sẽ dùng được nó tại bất cứ đâu bên trong `{ }` (bên trong dấu đóng mở ngoặc).
```javascript
function run() {
    if (100 > 20) {
        let m = 100;
        console.log(m, "meters !!");
    }
    console.log("you ran ", m, "meters");
}
run();  //100meters !! 
            //Reference error: m is not defined
```

## Function
### C15. What is function?
Function trong javascript:
```javascript
function sayHello() {
    console.log('Hello world!');
}
```
Các variable truyền vào function được gọi là parameters, về lí thuyết thì chúng ta có thể pass bao nhiêu parameters chúng ta muốn. Và trong function sẽ luôn có một variable store các parameters, đó là `arguments`. Parameters tức là các variable truyền vào khi khai báo hàm, còn arguments thì là các value mình truyền vào khi sử dụng các bạn nhé.
```javascript
function list() {
    for (var i=0; i<arguments.length; i++) {
        console.log(arguments[i]);
    }
}

list(1, 2, 3 , 5);
//result
/*
1
2
3
5
*/
```

Built-in function: chúng ta có rất nhiều built-in function trong javascript như: `prompt`, `console.log`, `alert`, `Math.random`, `document.write`, ... Sử dụng các function này sẽ tiết kiệt rất nhiều thời gian cho lập trình viên.

### C16. Chuyện gì xảy ra nếu tôi truyền thiếu arguments vào function?
=> Undefined
```javascript
function sayHello(name, old) {
    console.log('Hello, My name is ' + name + '.Im ' + old);
}
sayHello('james'); // Hello, My name is james. Im Undefined
```

### C17. Thế nếu truyền thừa thì sao?
=> Sẽ không có chuyện gì xảy ra cả.

### C18. Chạy đoạn code sau thì có lỗi không?
```javascript
list(1, 2, 3 , 5);

function list() {
    for (var i=0; i<arguments.length; i++) {
        console.log(arguments[i]);
    }
}
```

=> Lỗi làm sao được, hoisting, hoisting, hoisting. Và thậm gì cũng chẳng phải `Undefined`, mà kết quả không khác gì đảo ngược lại đoạn chạy function và đoạn khai báo.

![](https://images.viblo.asia/05f8175a-bd2e-44ad-91bd-c6a4fd53e96b.gif)

=> Như các bạn biết, khi browser load trang, nó chạy code javascript top to bottom, vậy thì đáng nghẽ ra phải lỗi mới phải. Thế quái này chưa khai báo, mà vẫn sử dụng được. Vâng, mọi chuyện là thế này. Javascript là một ngôn ngữ biên dịch (compiled) (thực ra vừa là thông dịch, vừa là biên dịch bởi bước compile của javascript không hề giống với các ngôn ngữ compiled thông thường). Code javascript sẽ được compile trước rồi mới chạy. Và trong lần compile này thì Javascript engine sẽ đọc tất cả các function definitions. Đây là lí do bạn đặt function ở bất cứ đâu thì lúc chạy code, mọi thứ vẫn ngon nghẻ.

![](https://images.viblo.asia/8c89c47d-58cb-4a15-b8c5-20ebed92e2de.png)

### C19. Có vẻ ok, vậy đoạn code sau in ra gì?

```
list(1, 2, 3 , 5);

var list = function () {
    for (var i=0; i<arguments.length; i++) {
        console.log(arguments[i]);
    }
}
```
 
 =>`Error: list is not a function`

![](https://images.viblo.asia/2c71dd3f-02a6-4c10-8560-98bb615da643.jpeg)

Lại gì nữa, lại gì nữa đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy. Hãy nghe tôi, bạn có hiểu tới mức nào, thì bạn vẫn trả lời sai mấy câu này như thường thôi =)) 
Hoisting function chỉ có tác dụng với *Function declaration*, chứ không hiệu quả với *Function expression*. Lý do sâu xa hơn, thì mời các bạn đọc câu trả lời cho câu hỏi ngay sau đây. Sự khác biệt giữa Function Declaration và Function Expression là lý do đằng sau `Error` ở trên.

### C20. Làm thế nào để phân biệt Function Declaration vs Function Expression?
=> Thực ra cách phân biệt khá đơn giản. Function declaration luôn bắt đầu bằng `function` và theo sau là function name `sayHello`. 
```javascript
function sayHello() {
    console.log('Hello World!');
}
```
Còn với function declaration, không hề có function_name `sayHello`, ngoài ra, result mà nó trả về, là một *reference* tới function đó.
*reference* này được assign cho variable `saySomething` để sau này ta có thể invoke function bằng `saySomething()`
```javascript
var saySomething = function() {
    console.log('Ahihi');
}

saySomething(); //Ahihi
```
Ngoài cú pháp ra, còn 1 điều nữa làm ra sự khác biệt của *Function declaration* và *Function expression*. Như tôi đã nhắc tới từ trước, javascript trước khi execute code, nó sẽ compile code trước. Ở bước compile này, khi compiler gặp *Function declaration*, nó sẽ compile toàn bộ function và assign function reference vào `function_name` (ví dụ `sayHello`). Nói cách khác, ngay từ bước compile, javascript engine đã biết function này ở đâu, nội dung là gì. Dẫn tới việc khi execute code, bạn có thể dùng nó ở bất cứ đâu trong lexical scope. Nhưng khi gặp *Function declaration* thì khác, nó sẽ ... không làm gì cả. Đúng vậy, với `var saySomething = function () { ... };` thì điều duy nhất compiler làm là khai báo `saySomething` và assign cho nó value là `undefined`, không đả động gì đến *Function expression*. Đến khi javascript engine execute code, `saySomething` mới được assign một `reference` tới Function expression, để từ đó về sau ta mới dùng được. Điều này dẫn tới hoisting không hề tồn tại với *Function expression*.

Phân biệt được *Function expression* và *Function declaration* cũng sẽ giúp ích cho bạn trong việc hiểu một vào khái niệm về sau, ví dụ như **First Class Function** hay **IIEE** (Immediately invoke function expression).

### C21. First Class Function là gì?
=> Tôi nghĩ, đa phần các bạn đọc bài post này, đều có chút kiến thức về javascript, nên hẳn các bạn không còn lạ gì với function expression, gán một function cho một variable, hay return một function trong javascript. Nhưng thực chất, nếu chỉ mới động đến C, C++, java thì các bạn sẽ thấy *Function expression* là khá khó hiểu. Làm sao có thể assign một function cho một variable được.

Trong ngành khoa học máy tính, tồn tại một khái niệm là **First Class Values**, ám chỉ các value mà
* Có thể assign cho một variable
* Truyền value cho một function
* Return value từ một function

Từ đây thì các bạn hiểu **First Class Function** là gì rồi chứ, đúng vậy, **values** ở đây ám chỉ **Function**. Trong javascript, chúng ta có thể assign một function cho variable (như đã làm ở trên với function expression), truyền như một param ở một function khác hoặc return một function từ một function khác.

### C22. IIFE (Immediately Invoke Function Expression)?
=> IIFE thì có lẽ nhiều người đã nghe và dùng đến, nó kiểu kiểu thế này:
```javascript
(function () {
    console.log('Show immediately!'); 
})(); // Show immediately! 
```

Hàm được khai báo và chạy ngay lập tức, đó chính là IIFE, nhưng tại sao lại có một cú phát kì dị như này, `function` đã được dấu trong dấu đóng mở ngoặc tròn, và ngay sau đó lại đóng mở ngoặc.
Đơn giản là thế này, dấu đóng mở ngoặc đầu tiên, bao quanh function, chính là đánh dấu, chỉ ra rằng, nó là một function expression, một function expression trả về gì: là reference, đúng thế, reference. Và sau khi có reference, ngay đằng sau là dấu đóng mở ngoặc, mục đính là chạy ngay hàm này. Bạn có thể hiểu đoạn code trên tương đương với như sau:
```javascript
var func = function() {
    console.log('Show immediately!');
}
func();
```

Sử dụng IIFE cũng chính là một cách để tạo scope rất hiệu quả.

```javascript
var a = 2;
(function IIFE( global ){
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
})( window );
console.log( a ); // 2
```

### C23. Closure?
Một trong những thứ được sử dụng nhiều nhất trong javascript, nhưng chả mấy javascript developer hiểu được bản chất nó là gì. Tôi nghĩ sở dĩ javascript xuất hiện nhiếu điều khó hiểu như vậy là bởi người ta có thể dễ dàng code javascript mà không cần dùng não. 
=> Ok, vậy closure là gì. **Closure là một function đi kèm với envirment của nó** Định nghĩa hơi khó hiểu, hãy cùng đi vào ví dụ sau:
```javascript
function foo() {
    var text = 'Ahihi';
    function bar() {
        console.log(text);
    }
    return bar;
}

var saySomething = foo();
saySomething();
```

Nào, cùng đoán xem đoạn code trên in ra gì.

=> `Ahihi`
Đúng vậy, đoạn code trên in ra `Ahihi`. Vấn đề ở chỗ, `foo()` trả về reference cho function `bar`, mà rõ ràng nếu chỉ execute mỗi function `bar` thì làm gì có variable `text`. Đây chính là điều làm nên sự khác biệt giữa một closure và một function bình thường.  Closure được quyền truy cập tới các variable nằm trong cùng scope với nó, tạo thành một environment.
Ở đây, mặc dù `bar` chạy độc lập, nhưng nó vẫn có quyền truy cập và thay đổi variable `text` ở bên trong function `foo`, đấy là bởi scope bên trong foo đã tạo thành một **environment**, function `bar` cùng với environment này, tạo thành closure. Easy.

Tôi sẽ đi vào thêm 1 ví dụ nữa. Giả sử ta có 1 element có id là `click-counter`.

```javascript
window.onload = function() {
    var count = 0;
    var counterEle = document.querySelector('#click-counter');
    counterEle.onClick = function() {
        console.log(++count);
    }
}
```
Tôi click vào element này 3 lần, bạn nghĩ console sẽ in ra gì.

=> Kết quả đây
```javascript
1
2
3
```
Bạn hiểu ý tôi chứ, event handler cũng là 1 closure, ngoài ra, closure còn được ứng dụng trong callback function (`setTimeout` chẳng hạn), currying pattern.

### C24. Áp dụng kiến thức về Scope và Function. Giải quyết bài toán sau.
Đoạn code sau in ra gì, và làm thế nào để nó in ra theo thứ tự 0, 1, 2 ... 5 sau mỗi 1s. 
```javascript
for(var i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i); 
    }, i*1000);
}
```
Đoạn code này chắc là quen thuộc với nhiều người. Thi thoảng tôi lại thấy người ta nhắc lại về câu hỏi này khi đề cập tới scope hay function trong javascript. Các bạn làm được chứ?

=> Đoạn code trên sẽ in ra 5 con số 5, sau mỗi 0, 1, 2, 3, 4 giây. Vấn đề là tôi muốn nó in ra 5 con số 0, 1, 2, 3, 4 chứ không phải 5 con số 5. Lý do đằng sau 5 con số 5 rất đơn giản. Chường trình do javascript engine execute luôn chia làm 2 Lần. Lần 1 sẽ gồm code được chạy ngay lập tức, lần 2 là các dòng code còn lại chạy ngay sau lần 1. Function mà bạn truyền vào cho `setTimeout` là một dạng thuộc lần 2, tức là không cần biết bạn truyền vào đó 0 giây, 1 giây, 100 giây, nó sẽ luôn chạy sau code ở lần 1, ví dụ như vòng `for` ở trên.

Nói cách khác, đoạn code trên, vòng `for`, hàm `setTimeout` sẽ execute trước, rồi mới tới function `console.log(i);` execute 5 lần. Và ở trên, như tôi đã nói, function mà bạn truyền vào setTimeout là một closure, vậy nên, ta sẽ có 5 closure đợi chạy ở lần thứ 2. Cả 5 closure này cùng share 1 environment, trong có truy cập vào biến i.
```javascript
console.log(i);
console.log(i);
console.log(i);
console.log(i);
console.log(i);
```

 trong lần chạy thứ 2, sau khi execute xong 5 vòng lặp `for`, thì `i` (vốn là một reference, trỏ tới một giá trị), sẽ có giá trị là .... `5`. 5 closure cùng share variable này, nên chúng cùng log giá trị 5.

Giờ tôi muốn nó phải ra `0`, `1`, `2`, `3`, `4`. Ta có 2 cách giải quyết. Nên nhớ 2 điều rằng `console.log` cùng environment chứa variable `i` tạo thành 1 closure  và hàm console.log phải chạy ở lần execute thứ 2 là KHÔNG THỂ THAY ĐỔI ĐƯỢC. Có thay đổi ở đây, chính là thay đổi environment để nó chứa giá trị đúng mà ta muốn.

Cách thứ 1, cần phải cho 5 closure này 5 environment khác nhau, mỗi environment chưa 1 variable mang giá tị lần lượt là `0`, `1`, `2`, `3`, `4`. Nếu các bạn đọc kĩ phần trên + 1 chút suy luận, thì tôi đã từng đề cập tới 1 cách để tạo environment. Đó chính là, là, là ... `let` & `const`. Đúng vậy, là `let` và `const`. Nhưng `const` thì chắc chắn là không dùng được ở đây ( có `i++`) nên ta dùng `let`.
```javascript
for(let i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i); 
    }, i*1000);
}
```
Đơn giản thôi, ta thay `var` bằng `let`. `let` sau mỗi vòng lặp, sẽ tạo ra một **block scope** => **environment** khác nhau cho mỗi closure, dẫn tới bài toán được giải quyết.

Cách 2: tạo 5 environment khác nhau bằng việc sử dụng tới **IIFE**. 
```javascript
for(var i = 0; i < 5; i++){
    (function(i) {
        setTimeout(function(){
            console.log(i); 
        }, i*1000);
    })(i)
}
```
Hãy tự mình giải thích tại sao nhé.

## The end
Cám ơn các bạn, thật sự cám ơn nếu bạn đọc tới phần này của bài viết. Bài viết không chỉ dài mà còn tập hợp các kiến thức khá khó hiểu và nhàm chán nên thật sự cảm kích bạn đã cùng tôi đi tới tận đây. Nhưng chuyến hành trình hỏi đáp về javascript vẫn chưa kết thúc. Ở phần 3 của bài viết, tôi sẽ mang đến những câu hỏi cùng câu trả lời cho 2 nội dung không kém phần quan trọng trong javascript là **This** và **Object**. Hẹn gặp lại.