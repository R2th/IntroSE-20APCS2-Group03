Biến là một khái niệm rất quan trọng trong nhiều ngôn ngữ lập trình, được sử dụng để lưu trữ cá giá trị. Chúng ta có thể gán một giá trị cho một biến, khi nào cần giá trị (số, chuỗi, etc) thì gọi tên biến thay vì giá trị, các *interpreter*, *compiler* truy xuất đến giá trị đã được gán vào biến khi thực hiện việc tính toán thay cho chúng ta. Con người dễ tiếp thu ngôn ngữ hơn là những giá trị, con số, biến là một ánh xạ đơn giản, từ *một từ* sinh ra *giá trị*. Tên của biến phải là độc nhất theo những quy tắc đặt tên của các ngôn ngữ lập trình, một biến chỉ lưu trữ một giá trị tại 1 thời điểm nhất định.

Thoát khỏi việc ghi nhớ các giá trị bằng cách sử dụng biến, các lập trình viên lại có thêm vài vấn đề như sau: Đặt tên biến như thế nào để ngắn gọn, dễ nhớ? Muốn nhiều biến có cùng tên được không? etc. Nhằm giải quyết vấn đề về *cách đặt tên biến*, các ngôn ngữ lập trình đã hỗ trợ thêm những khái niệm *lexical, scope,...* 

# Variable naming
Nói về việc đặt tên biến thì có nhiều quy tắc
- Tối thiểu:
    - Tên của một biến phải độc nhất trong một phạm vi nhất định
    - Bao gồm các ký tự trong bảng chữ cái (cả thường và hoa), số, ký tự đặc biệt cho phép tuỳ theo mỗi ngôn ngữ lập trình (JS thì chỉ cho phép 2 ký tự là "_" và "$")
    - Không được trùng với các reserved word (keyword)
    - Không được bắt đầu bằng số
- Nên có:
    - Ít mang động từ
    - Ngắn ngọn, súc tích, có nghĩa 
    - Sử dụng cách nối (như kebab case, snake case, camel case,etc.) khi có nhiều hơn 2 từ
    - ...
Và quan trọng hơn hết là phải tuân thủ cú pháp để khai báo biến của ngôn ngữ lập trình!
```js
// ở trong javascript, chúng ta có 3 cách khai báo biến 
// bằng viêc sử dụng 3 reserved word như var, let, const
var revenues;
let costs;
const profits;
```

Vốn từ vựng nhiều là một lợi thế khi đặt tên biến, tuy nhiên chúng ta không đặt tên biến khác nhau hoàn toàn. Nếu đặt tên biến khác nhau hoàn toàn thì sẽ có rất nhiều biến, việc nhớ chúng sẽ rất tốn thời gian. Thay vì đó, các ngôn ngữ lập trình hỗ trợ các khái niệm *idetifier, scope, lexical,etc.* để giúp chúng ta tiết kiệm thời gian, công sức.

# Identifier & access scope
Biến là một **identifier**, tức là định danh (identifier còn có thể các function, class, etc). Chúng ta có thể khởi tạo (tạo ra) nhiều biến có cùng tên, lưu trữ các giá trị khác nhau ở các **scope** khác nhau. Trình duyệt sẽ dựa vào các scope, xác định các **identifier** và giá trị của chúng phù hợp. Các **identifier** khi được khởi tạo luôn được gắn chặt với **scope** nơi mà chúng được khởi tạo. Chúng ta chỉ có thể truy cập tới các identifier ở các **outer scope**, không đối với **inner scope**. **Scope** có phạm vi truy cập lớn nhất **Global Scope**. Sự khác biệt giữa **let** & **var**

```js
let revenues = 100000;
let costs = 12345
if (revenue > 0 ){
  let profits = revenues - costs

}
console.log(profits)
// ReferenceError: profits is not defined
// Hàm console ở global scope truy cập tới biến profits, 
// tuy nhiên biến profits được khởi tạo ở scope của if (inner scope), 
// nên việc truy cập thất bại. Tuy nhiên việc truy cập 
// revenues & costs đều thành công khi ở trong scope của if vì 
// đối vời scope của if thì global là outer scope
```
Khi thực hiện việc tìm kiếm các **identifier** thì ta sẽ tuân theo quy tắc từ trong ra ngoài. Javascript sẽ xét ở scope hiện tại, sau đó chuyện tới outer scope, xét tiếp, tiếp tục chuyển tới outer scope,... cho tới khi gặp được **identifier** hợp lệ hoặc tới global scope mà không tìm được thì sẽ báo lỗi - scopes chain. Đối với từ khoá `let` thì quy tắc **scopes chain** đúng hoàn toàn, và nhiều ngôn ngữ khác cũng vậy. Tuy nhiên điều này không đúng với `var`.

```js
if (true){
  var z = 100
}
console.log(z)
// 100 
// Điều này chứng mình rằng khi khai báo var, quy tắc scope chain
// không còn chính xác nữa
```

`var` đặc biệt hơn với `let` ở chỗ nó không tuân theo quy tắc chung. Chúng ta có thể kết luận rằng, khi khai báo **identifier** với từ khoá `var` sẽ có scope là global không? Tất nhiên là không!

```js
function initialVariable() {
  var z = 'this is z'
  console.log(z)
}
initialVariable()
console.log(z)
// this is z
// ReferenceError: z is not defined
```

Vậy nên ta không thể kết luận rằng **khai báo identifier với từ khoá `var` sẽ có scope là global**. Vậy thì lí do tại sao ví dụ ở trên lại bị sai nhỉ? Câu trả lời là đối với **scope** của hàm thì có một chút khác biệt, có tên là **lexical**. Khi khai báo **identifier** bằng `var`, thay vì **bind** vào scope, thì **identifier** được **bind** vào **lexical**. Ngoại trừ điều đó ra thì `var` còn có khả năng **redeclarion** (tái khai báo) mà không gặp lỗi. (làm với `let` thì sẽ gặp lỗi `SyntaxError: Identifier _ has already been declared`)
```js
var z ='this is z at first'
console.log(z)
function initialVariable() {
  var z = 'this is z'
  console.log(z)
  var z = 'this is z but 4th' // redeclaration
  console.log(z)
}
initialVariable()
console.log(z)
// this is z at first
// this is z
// this is z but 4th
// this is z at first
```
Xét thêm trường hợp này 
```js
var z= 1000
function f() {
  var fs = []
  for (var i = 0; i < 5; i++) {
    fs.push(function () {
      var z = i
      console.log(z)
    })
  }
  fs[3]()
}
f()
console.log(z)
// 5
// i được khai báo ở lexical f, khi thực hiện vòng lặp với post operator là i++ thì 
// đang thay đổi giá trị của biến i ở lexical f. 
```
Ngoại trừ việc **bind** khác một chút `var` vẫn tuân theo quy tắc của **scope chain**. Có nhiều bạn tưởng rằng `var` sẽ tạo một property ở global object (cụ thể window ) - chưa hoàn toàn đúng, chỉ khi nào bạn khai báo bằng `var` ở global scope thì mới tạo property, còn lại thì không.
```js
function f() {
    var z = '111'
    console.log(z)
    console.log(window.z)
}
f()
```


# `const`
Điều khiến **identifier** đặc biệt là không cho phép **direct assignment**. Assignment là một toán tử cho phép cập nhật **giá trị** đã được lưu trữ của **identifier**.

```js
const z = 100;
z = '??'
// TypeError: Assignment to constant variable.
```
Tuy nhiên ,việc thay đổi nội tại bên trong, hoặc thay đổi thông qua trung gian vẫn có thể.(Đối với references data type)
```js
const z = []
console.log(z)
z.push(1,2,3,4)
console.log(z)
// []
// (4) [1, 2, 3, 4]
```
```js
const z = {}
z.name = 'z'
console.log(z)
// {name: "z"}
```

# Hoisting & Tempotary Dead Zone
- Một **identifier** được khỏi tạo thông qua 1 hoặc 2 giai đoạn : **declaration** (**defination**) và **initialization**. Giai đoạn 2 có thể có hoặc không. **declaration** mang ý nghĩa cấp vùng nhớ dùng để lưu giá trị và **bind identifier** với giá trị có sẵn ở vùng nhớ(C++), **initialization** mang ý nghĩa khởi tạo cho giá trị ban đầu là bao nhiêu. Nếu không có **initialization** thì giá trị mạc định là **undefined**
```js
let z;
// declaration
let z = 100;
// declaration + initialization
```

Hãy xem xét các ví dụ sau:

```js
console.log(z)
let z = 10;
// ReferenceError: Cannot access 'z' before initialization
// Chúng ta đã sử dụng biến z trước khi nó được khai báo, đây được gọi là tdz
```

```js
console.log(z)
var z = 10;
// undefined
// Nếu thay let bằng var thì ta lại nhận được giá trị. Đây là ví dụ cho việc hoisting
```
Tempotary Dead Zone là khái niệm dùng để nói về việc sử dụng một **identifier** trước khi được tạo ra.Hoisting áp dụng đối với **identifier** được khai báo bằng từ khoá `var` và `function`. Hoisting chỉ hiệu quả trong một **lexical**. Hoisting nghĩa là Javascript sẽ đem tất cả các biến phù hợp ( khai báo bằng `var` và `function`), thực hiện việc **declaration** trước, khi đến dòng thực sự khai báo, chỉ phải thực hiện assignment mà thôi.

TDZ không phải ám chỉ thứ tự khai báo các biến và sử dụng, mà thường dùng để nói về thứ tự thực thi (Execution Order). Miễn là tại thời điểm thực thi các biến đã được khởi là là ổn. TDZ thường hay đề cập đối với `let` hơn là `var` (`var` sẽ Javascript áp dụng hoisting nên chuyện chưa được khởi tạo không xảy ra - chỉ có vấn đề là giá trị là undefined mà thôi). Để khắc phục tình trạng một biến gặp trường hợp **tdz** thì nên cân nhắc đem tất cả các biến lên khai báo ở đầu scope/lexical
```js
if(true){ 
  console.log(z); 
  console.log(x); 
  var z = 'this is z';
  let x = 'this is x'; 
}
// undefined
// ReferenceError: Cannot access 'x' before initialization
```
```js
// Đây là ví dụ về thực thi
if (true){
  // 
  function f(){
    console.log(z)
  }
  let z = 'this is z'
}
f()   // 
// this is z
// this is z - khi khai hàm bằng function => giống như var
//  bind thẳng lexical chứ không phải scope - arrow function 
// khắc phục được điểm này
```

Khi bạn sử dụng các từ khoá để khởi tạo các **identifier**, thì các **identifier** được bind vào scope/lexical tuỳ thuộc vào nơi khai báo. Nhưng **nếu** bạn không khai báo biến mà trực tiếp **assignment** thì mặc định Javascript sẽ làm tự động tạo cho bạn 1 biến ở **global scope** (Nếu chưa tồn tại ở **scope chain** dẫn ra **global scope**)

```js
x = 'this is x';
    function f() {
        function g(){
            z = 'this is z lexical of g'
        }
        g()
    }
    f();
    console.log(globalThis)
    console.log(x, z);
// this is x this is z lexical of g
```

---

# References & more resources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

---

### P/S:
- Các đoạn code ở trên được mình chạy ở trên engine V8 của Chrome thông qua trình duyệt Brave. Có thể tuỳ thuộc vào các engine có một cách thực thi Javascript khác nhau nên có gì sai sót xin email cho mình để mình cập nhật. Xin cảm ơn!
- Bài viết gốc: https://sonlhcsuit.github.io/p/variable/