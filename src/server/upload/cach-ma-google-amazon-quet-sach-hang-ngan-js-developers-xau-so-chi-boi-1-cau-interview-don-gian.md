Dạo này làm ninja nhiều rồi, nay mình come out :kissing_heart: với mọi người! Lang thang mình thấy có câu interview của Google & Amazon rất hay nên muốn chia sẻ với các bạn. Không chần chờ gì nhiều, chúng ta lập tức vào câu hỏi ngay và luôn!

### Câu hỏi phỏng vấn của Google & Amazon
```javascript
const arr = [1,2,3,4];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(i);
  }, 3000)
}
```
Output của câu trên sẽ là như thế nào? expect của người viết có đúng mong đợi hay không? Nếu không thì phải xử lý thế nào cho đúng?
Bạn hãy thử suy luận và tìm câu trả lời xem. Nếu bạn đã có câu trả lời hãy xem có giống kết quả bên dưới hay không.

Nhìn nhanh sơ qua 3s, chúng ta sẽ lớ ngớ à thì nó sẽ in theo thứ tự :
> 0 1 2 3

Nếu bạn nào hiểu thêm tí nữa sẽ nhìn ra vấn đề kiểu: Ơ mà nó có function setTimeout, nó phải đợi sau khi vòng for chạy hết hoàn toàn thì các function setTimeout mới được chạy. Và i lúc này là 4 cho nên nó phải là:
> 4 4 4 4

Ồ lần này có vẻ chuẩn đấy, nhưng đây không phải là expect người viết code mong đợi :( Well well, vậy thì phải sửa thôi. Làm sao đây?:thinking:

Ta sẽ có 2 cách để đạt được expect mình mong muốn.

### Cách 1: Dùng **IIFE** (Immediately Invoked Function Expression)

**IIFE** đơn giản là một cách tạo và khai báo 1 function và chạy lập tức sau khi kết thúc khai báo function đó (Nếu bạn chưa nắm rõ hãy google từ khóa IIFE là biết ngay liền).
```javascript
const arr = [1,2,3,4];
for (var i = 0; i < arr.length; i++) {
(function (i) {
      setTimeout(function() {
        console.log(i);
      }, 3000)
    })(i)
}
```

Hoặc dễ hiểu hơn
```javascript
const arr = [1,2,3,4];

function log(value) {
 var i = value;
 setTimeout(function() {
        console.log(i);
      }, 3000)
}
for (var i = 0; i < arr.length; i++) {
        log(i);
}
```

Sẽ có bạn thắc mắc: Tại sao lồng setTimeout vào 1 function khác thì sẽ chạy được? Well, giờ thì sẽ là 1 câu chuyện dài trước khi chúng ta bước sang cách 2.

Ok, mình sẽ giải thích nhanh qua, hy vọng nó sẽ giúp ít cho các bạn chưa biết thêm về cơ chế hoạt động của js. Để hiểu được cách 1 hay mình gọi nó là story 1 (câu chuyện 1) ở trên, chúng ta cần biết về: ***Scope, Closure Function, cách For Loop hoạt động và cơ chế Event Loop trong js***.

### **Scope**
Trong javascript ta có 2 scopes: **Global scope** và **local scope**. Nếu bạn đã làm việc với js 1 thời gian, bạn sẽ nhận ra ngay.

> ***Global scope** là scope mà các functions, variables được khai báo ở ngoài cùng của file js bạn đang code. Tức là nó sẽ không nằm trong bất kì một functions nào khác.*

> ***Local scope** gồm chia làm 2 loại: **Functional scope và Block scope**. **Functional scope** là phạm vi mà variables hoặc functions bạn khai báo nằm trong 1 function A, do đó các variables/functions sẽ chỉ được access và exist trong scope của function A, nếu thoát khỏi function A bạn không thể access hoặc use chúng nữa.*

> ***Block scope** tương tự Functional scope, chỉ khác là thay vì phạm vi scope sẽ nằm trong 1 function thì ở Block scope phạm vi sẽ  là trong **Block** { }. Lưu ý: Block scope dành cho Let, Const và khai báo function bằng function expression (ES6). Var và khai báo function bình thường sẽ không hoạt động, vì chúng không dùng cho block scope.*



Ví dụ:

```javascript
var a = 5; // a has global scope
function add(a) { // add function has global scope
   var b = 10; // b has local scope (functional scope)
   return function result() { // result function has local scope (functional scope)
            return a + b;
    }
}

{
    let c = 15; // c has local scope (block scope)
    let test = () => { // test has local scope (block scope)
        console.log('here is blockScope');
    }
}
```
Copy đoạn code trên và paste vào developer console của browser để test nhé. Nếu ta chạy đoạn code trên xong, ta gọi **a**, **add** ta thấy có thể nhìn thấy giá trị hoặc định nghĩa function bởi vì nó thuộc về global scope. Còn **b, result, c, test** thì không vì chúng thuộc local scope và chỉ có thể access và exist trong local scope chúng thuộc về.

Ok, sau khi hiểu về scope, ta có thể bước qua 1 mảnh chuyện nhỏ tiếp theo: **Closure function**. Trước khi tìm hiểu về nó, mình muốn nói thêm 1 vấn đề nhỏ để giúp bạn có thể dễ hiểu hơn. Trong js, chúng ta còn có 1 thứ gọi là **scope chaining**. Hãy xem qua ví dụ sau:
```javascript
 var a = 10;
function test1() {
   console.log('test1', a);
    return function test2() {
      var a = 15;
    console.log('test2', a);
       return function test3() {
            console.log('test3', a);
                }
         }
}
```

Kết quả lần lượt sẽ là: 
> test1 10, test2 15, test3 15

Bởi vì scope chaining, nên khi ta dùng biến a. Nếu biến a nếu không được khai báo trong scope hiện tại, nó sẽ tìm lên **outer scope** (scope chứa scope hiện tại), cho tới khi biến a có giá trị đã khai báo hoặc dừng tại global scope. Vậy tuần tự theo ví dụ trên là: Khi ta gọi **test3**, biến **a** không có khai báo trong scope của **test3** cho nên nó sẽ đi lên trên và tìm trong scope của **test2**. Và ở đây **test2** có khai báo biến **a = 15**. Sau khi tìm được, **test3** sẽ tham chiếu tới biến **a** trong **test2** để dùng trong function. Ta sẽ thấy kết quả là: **test3 15**. Tương tự khi ta gọi thực hiện function **test2** và **test1**.

###  **Closure function**

là 1 function (**inner function**) nằm trong 1 function khác (**outer function**) hoặc **block scope** khác. Có thể access các variables (còn gọi là có **lexical scope bind to outer function**) trong outer function và **hold** giá trị của các variables đó cho dù outer function được gọi và kết thúc, hoặc inner function được gọi ở global scope...

```
function A() { // outer function
 var a = 10; // can be accessible by closure function
    return function B() { // inner function (closure function)
        return a + 10;
     }
}

var closureFunc = A(); // assign B to a variable and finish A function
closureFunc(); // 20
```

Trong ví dụ, như các bạn thấy, dù A đã được gọi và kết thúc, nhưng giá trị của biến a vẫn được hold trong function B (closure function)! Yeah, sắp đến kết quả ta cần!

Tiếp theo, khi khai báo vòng lặp **For**, biến **i** chỉ được khai báo 1 lần duy nhất, những lần lặp sau, i chỉ đơn giản là tăng giá trị lên chứ không hề khai báo lại từ đầu (Cần lưu ý điểm này vì nó sẽ liên quan tới cách 2 ta sẽ nói đến sau).

Về **Event Loop** mình sẽ không đi sâu vào nó vì nằm ngoài phạm vi bài viết, các bạn có thể google tìm hiểu, rất tốt cho nền tảng js đấy. Mình sẽ viết về nó sau nếu có thể. Còn hiện tại mình sẽ nói sơ về cách hoạt động của nó với các Async functions. Như ta biết, Js cơ chế là single-thread (Tại một thời điểm chỉ làm 1 tác vụ duy nhất). Do đó để hỗ trợ các Async functions, JS engine v8 đã dùng Event Loop để giúp ta xử lý chúng.

Ta có thể hiểu đại khái khi run 1 file js. Nó sẽ chạy đồng bộ (synchronization) từ đầu đến cuối trong 1 **Call Stack** theo thứ tự **Last In First Out**, khi gặp các async function như setTimeout, call HTTP request... Event Loop sẽ không chạy chúng ngay lập tức mà đem các async functions xếp hàng 1 hàng chờ gọi là **Event Queue**. Khi các functions trong file được chạy hết hoàn toàn và không còn thực hiện 1 action nào khác nữa trong **Call Stack**. **Event Queue** sẽ đem các functions trong hàng đợi bỏ vào **Call Stack** và thực thi.

Kết hợp giữa **Scope, closure function, For Loop và Event Loop**. Hãy cùng nhau nhìn lại câu hỏi. Không cần phải scroll lên đâu, mình sẽ giúp bạn:

```javascript
const arr = [1,2,3,4];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(i);
  }, 3000)
}
```
- Vậy thì khi vòng For chạy, biến **i** được khai báo, mỗi vòng lặp sẽ gọi setTimeout, setTimeout nằm trong scope của vòng For cho nên nó có thể access biến **i** và lưu giá trị (còn gọi là tham chiếu tới biến **i**).

- setTimeout là async cho nên sẽ xếp vào hàng đợi và chờ cho vòng for kết thúc. Khi vòng For kết thúc, **i** lúc này là 4. Và như ta biết đặc tính của closure function: dù cho outer function hoặc block scope chứa nó kết thúc thì nó vẫn có thể lưu lại giá trị biến **i**. 

- Sau đó khi không còn bất kỳ code đồng bộ nào được chạy nữa. Lúc này Call Stack rỗng và Event Queue sẽ đưa các function setTimeout chờ từ trước đó đưa vào Call Stack và thực hiện. Khi đó **i = 4**. Suy ra ta có kết quả: `4 4 4 4`

Để sửa vấn đề này, ta cần ở mỗi vòng lặp sẽ lưu lại giá trị **i** riêng. Để làm được điều này, với những gì học được ở trên. Ta áp dụng tạo ra scope riêng cho setTimeout function để có thể lưu lại giá trị **i** và access sử dụng nó dù sau khi scope chứa setTimeout function không còn tồn tại!

```javascript
const arr = [1,2,3,4];
for (var i = 0; i < arr.length; i++) {
(function (i) {
      setTimeout(function() {
        console.log(i);
      }, 3000)
    })(i)
}
```

- IIFE giúp chúng ta tạo ra một anonymous function (tạo ra functional scope) chứa lấy setTimeout. Function này sẽ có param là **i**. và setTimeout là inner function (closure function) và có thể access và hold giá trị **i**. Sau đó, anonymous function kết thúc, nhưng setTimeout hold được **i** cho nên khi ta gọi nó ở bất cứ đâu, thời điểm nào thì nó vẫn là giá trị đó không thay đổi. Và cứ tiếp lặp như thế cho tới hết vòng For. Và sau đó ta sẽ có kết quả là `0 1 2 3` ( Chúng ta có thể không dùng IIFE mà tạo 1 function bình thường khác như ví dụ ở phía đầu bài viết).

Phù, cuối cùng đã xong 1 story dài. Hy vọng các bạn hiểu :( với câu từ rối ren của mình. Ok, không nên lười biếng, tiếp tới cách 2 dễ dàng dễ chơi dễ trúng thưởng nào.

### **Cách 2: dùng let**
Ôi dồi ôi đơn giản lắm chỉ cần đổi **var** thành **let**
```javascript
const arr = [1,2,3,4];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(i);
  }, 3000)
}
```

What! Chỉ việc hô biến dùng **let** (ES6) thế là xong. Chả cần biết mấy cái nào là **scope, closure function**. Giờ ai cũng xài ES6 hết mà.
Chắc các bạn cũng nghĩ nếu dễ thế thì bàn làm gì? Chúng ta cần phải dựa trên cơ chế của JS để có thể tiên đoán actions của cách 2.

 Nếu bạn nào giờ là fan của **Scope, closure** hẳn giờ phải nổi cáu lên. Rõ ràng đoạn code này vô lý. Vì sao? Vì let hay var thì về mặt khai báo nó đều như nhau (chỉ khác **let** chỉ tồn tại trong block scope), không có 1 magic nào cho **let** cả. Vậy đáng lẽ cuối cùng **i** vẫn phải là 4 chứ. Hm...

Lý thuyết là đúng, nhưng thật bất ngờ thay. JS đã thêm 1 tính năng cho **let** trong vòng lặp **For** rằng:
> Khi khai báo **let** trong vòng For, ở mỗi vòng lặp sẽ khai báo một **let** mới và **Block scope** mới (Tương tự như tạo 1 Functional scope).

Đồng nghĩa với việc, mỗi vòng lặp, setTimeout sẽ là closure function cho Block scope của vòng lặp đó. Và khi vòng lặp đó kết thúc,  setTimeout vẫn hold lại giá trị **i** khai báo và tồn tại trong Block scope trước đó. Và kết quả là `0 1 2 3`. 

Surprise! dù đơn giản nhưng nó vẫn liên quan tới **scope, closure function và For loop cũng như Event loop**. Đọc đến đây bạn vẫn chưa tin ư? Đơn giản để bạn kiểm chứng. Cứ copy đoạn code trên và paste vào [Babel](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAhgJwTAvDA2gRgDQCZsDM2ALALoDcAUAGYjIAUANgKawCWqMADOTBwDzwkAOhZgA5lAAWvNgGo5AShgBvSjBgRWAFTYBbZiACuUetSNhgUNuHrK1GjaEggWokOPptFVDQF9sGAIuEMVKPyA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.10.4&externalPlugins=). Bạn sẽ thấy đoạn code sẽ được convert sang ES5 như sau:

```javascript
var arr = [1, 2, 3, 4];

var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  }, 3000);
};

for (var i = 0; i < arr.length; i++) {
  _loop(i);
}
```

### Kết Luận
Ta thấy được Block scope của từng vòng loop giờ đây sẽ được convert thành functional scope và let thành var để tương thích với các browser cũ.
Vậy thì về cơ bản 2 cách trên tuy khác nhau nhưng về bản chất nó đều là 1. Chỉ cần bạn nắm vững về **scope, closure function, For loop và Event Loop** thì bạn chả sợ ES5 hoặc ES6 trở lên gì cả. Nhìn thế thôi chứ bao nhiêu dev đã và đang phải điên đảo để nắm vững chúng đấy. Các bạn có thể tìm hiểu thêm về chúng qua keywords mình đã gợi ý trên. 

Thế là đã hết bài viết rồi. Mình đành kết bài vậy, hẹn các bạn. Bài viết đầu tay mong các bạn chém nhẹ :D