Trong phần trước chúng ta đã tìm hiểu một số thành phần cơ bản trong bộ Complier của JavaScript. Trong bài viết trước có xuất hiện khái niệm Lexical Environment mà mình chưa có thời gian để giải thích cụ thể, vậy thì trong bài viết này chúng ta sẽ cùng tìm hiểu cụ thể hơn về khái niệm này và cách nó liên quan đến Closures của JavaScript như thế nào.

**Trước khi đọc bài viết này, nếu chưa biết Closures là gì, bạn nên giành chút thời gian lướt qua google để hiểu cơ bản về Closures.**

Closures có thể là một khái niệm khó với bạn khi chưa quen với *vũ trụ* JavaScript. Bạn có thể đọc thấy rất nhiều định nghĩa về Closures khác nhau trên internet. Nhưng bạn có thể thấy hầu hết những định nghĩa này đều mơ hồ, khó hiểu và không giải thích được nguyên nhân cơ bản của sự tồn tại và mục đích của Closures.

Trong bài viết này chúng ta sẽ cố gắng làm sáng tỏ một số khái niệm của ECMAScript 262, bao gồm **Execution Context**, **Lexical Environment**, và **Identifier Resolution**. Ngoài ra, chúng ta sẽ biết rằng do các cơ chế trên, *tất cả* các function trong ECMAScript đều là *Closures*.

# Execution Context
Chúng ta cùng nhắc lại về khái niệm này một chút. Trình biên dịch của JavaScript tạo một context mới bất cứ kì nào nó chuẩn bị thực thi một hàm hoặc một tập lệnh đã được viết trước. Mọi tập lệnh / đoạn code bắt đầu với một Execution Context được gọi là **Global Execution Context**. Và mỗi khi chúng ta gọi một hàm, một Execution Context mới được tạo ra và được đặt trên đầu của *Excution stack*. Tương tự điều này cũng sẽ xảy ra khi bạn gọi một hàm lồng trong một hàm khác.

![](https://images.viblo.asia/da9afd53-d607-4352-a113-00b52389a998.png)

Hãy cùng xem điều gì xảy ra khi đoạn code của chúng ta được thực thi như trong hình trên đã thể hiện:
- Một *Global Execution Context* được tạo ra và đặt xuống cuối cùng của Excution stack
- Khi bar() được gọi, một *bar Execution Context* sẽ được tạo ra và đặt lên trên *Global Execution Context*. Trong bài viết trước chúng ta đã biết mỗi hàm khi được gọi sẽ tạo ra một Execution Context với định danh độc nhất của function đó, trong trường hợp này là  function bar() =>  bar Execution Context
- Sau đó, khi bar() gọi đến hàm foo() lồng trong nó, một *foo Execution Context* sẽ được tạo và được đặt bên trên của *bar Execution Context*
- Khi foo() return - tức là function foo đã thực thi xong, *foo Execution Context* sẽ bị loại bỏ khỏi stack và luồng chạy sẽ quay trở lại *bar Execution Context*
- Khi quá trình thực thi bar() kết thúc, luồng chạy sẽ quay lại *Global Execution Context*, và cuối cùng stack sẽ được làm trống.

> Excution stack thực thi theo cấu trúc LIFO (Last In First Out), nó đợi execution context ở trên cùng thực thi xong trước khi thực khi các context bên dưới.

Về mặt khái niệm, Execution context có cấu trúc giống như sau:

```JS
// Execution context in ES5

ExecutionContext = {
  ThisBinding: <this value>,
  VariableEnvironment: { ... },
  LexicalEnvironment: { ... }
}
```
Đừng lo lắng nếu nhìn cấu trúc này đáng sợ. Chúng ta sẽ xem xét các thành phần của nó ngay sau đây. Điểm mấu chốt cần nhớ ở đây là mọi lệnh gọi đến Execution context sẽ có 2 trạng thái - tương ứng với 2 giai đoạn:
- Trạng thái Khởi tạo - **Creation Stage** (tương ứng là Giai đoạn Khởi tạo - **Creation Phrase**)
- Trạng thái Thực thi - **Execution Stage** (tương ứng là Giai đoạn Thực thi - **Execution Phrase**)

Giai đoạn Khởi tạo là khi context đã được tạo ra nhưng chưa được gọi. Một số điều sau xảy ra trong giai đoạn khởi tạo:
- VariableEnvironment được sử dụng để lưu trữ giá trị bạn đầu cho các biến, đối số và khai báo hàm. Các biến *var* được khai báo sẽ được khởi tạo với giá trị là  *undefined*
- Giá trị của **this** được xác định
- LexicalEnvironment chỉ là bản sao của VariableEnvironment trong giai đoạn này

Giờ hãy tìm hiểu xem Lexical Environment là gì nào.
# Lexical Environment
Theo ECMAScript 262 (8.1):

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code

> Lexical Environment là một định dạng đặc biệt dùng để định nghĩa liên hệ giữa định danh (tên biến, tên function) với giá trị tương ứng của nó, dựa trên cấu trúc nesting của ES.

Hãy cùng tìm hiểu một vài thứ ở đây. Một Lexical Environment bao gồm 2 thành phần chính: **environment record** và một **reference** (tham chiếu) đến Lexical Environment bên ngoài (cha của Lexical Environment hiện tại):

```JS
var x = 10;

function foo(){
  var y = 20;
  console.log(x + y); // 30
}

// Environment technically consist of two main components: 
// environmentRecord, and a reference to the outer environment

// Environment of the global context
globalEnvironment = {
  environmentRecord: {
    // built-ins
    // our bindings:
    x: 10
  },
  outer: null // no parent environment
};

// Environment of the "foo" function
fooEnvironment = {
  environmentRecord: {
    y: 20
  },
  outer: globalEnvironment
};
```

Trực quan nó sẽ trông như thế này:
![](https://images.viblo.asia/0a59f5f2-3ccc-4f8a-89e5-5beb290f3d25.png)

Như bạn có thể thấy khi muốn định danh "x" trong foo context, cần phải tiếp cận đến environment bên ngoài (Global environment). Quá trình này được gọi là **Identifier Resolution** (Phân giải định danh) và nó xảy ra trên execution context đang chạy.

Bây giờ, dựa trên những kiến thức về Environment này, hãy quay lại với cấu trúc của Execution context và xem điều gì đang xảy ra trong đó:
- **VariableEnvironment**: Môi trường của nó được sử dụng để lưu trữ giá trị khởi tạo cho các biến, đối số và khai báo hàm. Các giá trị này sẽ được gán bằng giá trị thật khi bước vào giai đoạn kích hoạt.

```JS
function foo(a) {
  var b = 20;
}

foo(10);

// the VariableEnvironment component of the foo function context at creation stage
fooContext.VariableEnvironment = {
  environmentRecord: {
    arguments: { 0: 10, length: 1, callee: foo },
    a: 10,
    b: undefined
  },
  outer: globalEnvironment
};

// After the execution stage, the VariableEnvironment envRec table is filled in with the value
fooContext.VariableEnvironment = {
  environmentRecord: {
    arguments: { 0: 10, length: 1, callee: foo },
    a: 10,
    b: 20
  },
  outer: globalEnvironment
};
```

- **LexicalEnvironment**: Ban đầu nó chỉ là một bản sao của VariableEnvironment. Trong context đang chạy, nó được sử dụng để xác định ràng buộc của một định danh (ví dụ một biến) xuất hiện trong context.

Cả VariableEnvironment (VE) và LexicalEnvironment (LE) về bản chất của chúng đều là Lexical Environment, tức là cả 2 cơ bản (ở giai đoạn khởi tạo) đều lưu trữ *tĩnh* các ràng buộc bên ngoài để dùng cho các function được tạo bên trong context. **Điều này liên quan đến Closures**.

Việc lưu trữ các liên kết tĩnh bên ngoài dùng cho các chức năng bên trong góp phần phát sinh sự hình thành của Closures.

# Identifier Resolution a.k.a Scope chain lookup
Trước khi tìm hiểu về Closures, hãy tìm hiểu một chút về cách chuỗi Scope được tạo trong Execution context. Như chúng ta thấy trước đó, mỗi Execution context đều có LexicalEnvironment được sử dụng để phân giải định danh. Tất cả các ràng buộc cục bộ cho context được lưu trữ trong bảng Environment record . Nếu định danh không thể tìm được trong environmentRecord hiện tại, quá trình định danh sẽ sẽ tiếp tục tìm đến bảng Environment record ở môi trường bên ngoài (context cha). Quá trình này sẽ tiếp tục cho đến khi định danh nhận được giá trị. Nếu không tìm thấy, một *ReferenceError* sẽ xuất hiện.

Bây giờ, điều cần phải nhớ ở đây là LexicalEnvironment lưu trữ *tĩnh* liên kết tới môi trường bên ngoài trong giai đoạn Khởi tạo context và sẽ sử dụng nó trong quá trình chạy context (Giai đoạn thực thi).

# Closures
Như chúng ta đã thấy trong phần trước rằng ở giai đoạn khởi tạo, việc lưu trữ *tĩnh* liên kết tới môi trường bên ngoài của LexicalEnvironment bên trong sẽ liên quan đến Closures bất kể một hàm có được kích hoạt hay không. Hãy xem thử một ví dụ:

## Ví dụ 1
```JS
var a = 10; 

function foo(){
  console.log(a);
};

function bar(){
  var a = 20; 
  foo();
};

bar(); // will print "10"
```

LexicalEnvironment của foo lưu trữ liên kết với "a" tại thời điểm khởi tạo, lúc này đang có giá trị là 10. Vì vậy, khi foo được gọi sau đó (giai đoạn thực thi), giá trị của "a" là 10 chứ không phải 20.

Về mặt khái niệm, quá trình phân giải nhận dạng ví dụ trên sẽ giống như sau:

```
// check for binding "a" in the env record of "foo"
-- foo.[[LexicalEnvironment]].[[Record]] --> not found
// if not found, check for its outer environment
--- global[[LexicalEnvironment]][[Record]] --> found 10
// resolve the identifier with a value of 10
```

![](https://images.viblo.asia/1d0c9732-e14e-4764-b4f5-97d48eca0841.png)


Vì *Reference* của foo liên kết tới Environment  của Global context - nơi đang lưu trữ giá trị "a" là 10, do đó giá trị "a" ở trong foo sẽ là 10.

## Ví dụ 2

```JS
function outer() {
  let id = 1;

  return function inner(){
    console.log(id);
  }
};

const innerFunc = outer(); 
innerFunc(); // prints 1; 
```

Khi hàm outer() return, Execution context của nó sẽ bị loại bỏ khỏi Execution stack. Nhưng khi chúng ta gọi hàm *innerFunc()* sau đó, nó vẫn quản lý để in ra giá trị chính xác vì LexicalEnvironment của hàm bên trong nó đã lưu trữ *tĩnh* giá trị ràng buộc "id" của môi trường bên ngoài (funciton outer) từ khi nó được tạo ra.

```
// check for binding "id" in the env record of "inner"
-- inner.[[LexicalEnvironment]].[[Record]] --> not found
// if not found, check for its outer environment (outer)
--- outer[[LexicalEnvironment]][[Record]] --> found 1
// resolve the identifier with a value of 1
```

![](https://images.viblo.asia/0e595ea1-40d3-40f6-8e25-c91935100337.png)

Ở đây chúng ta có thể nhận ra, mặc dù context của outer đã bị loại bỏ khỏi Execution stack, tuy nhiên liên kết **Reference** tới LexicalEnvironment outer của hàm innerFunc() vẫn được giữ lại mà không hề mất đi. Đây chính là ý nghĩa của **lưu trữ tĩnh** mà chúng ta đã nhắc tới rất nhiều trong bài viết.

# Tổng kết

- **Execution context stack** có cấu trúc LIFO
- Có một **Global context** tổng, nơi mà code của chúng ta được thực thi
- Mỗi lần gọi đến một function sẽ tạo ra một **Execution context** mới. Nếu nó có một function lồng trong đó được gọi đến, một Execution context mới sẽ tiếp tục được tạo và đặt bên trên context cha. Khi context được thực thi xong, nó sẽ bị loại bỏ khỏi stack và luồng chạy sẽ quay trở lại context tiếp theo trong stack.
- **Lexical Environment** có hai thành phần: **environmentRecord** và **reference** (tham chiếu) tới môi trường bên ngoài.
- **VariableEnvironment** (VE) và **LexicalEnvironment** (LE) đều lưu trữ tĩnh các ràng buộc với môi trường bên ngoài để sử dụng cho các function bên trong context của chính nó.
- Tất cả các function ở Giai đoạn khởi tạo đều lưu trữ tĩnh các liên kết với môi trường cha của chúng. Điều này cho phép các hàm lồng nhau truy cập vào liên kết bên ngoài ngay cả khi context cha đã bị xóa khỏi Execution stack. Cơ chế này là nền tảng của các **Closures** trong JavaScript.

<br>

**[Phần 3: JavaScript "cơ bản" (Phần 3): Hoisting](https://viblo.asia/p/javascript-co-ban-phan-3-hoisting-vyDZO68dKwj)**