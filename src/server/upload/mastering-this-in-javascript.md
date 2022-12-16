Một lý do mà khái niệm của từ khóa "this" gây rắc rỗi với nhiều lập trình viên JavaScript, thậm chí với những người làm việc lâu năm, là vì "this" khá phức tạp: thứ mà "this" đại diện lại tùy thuộc vào ngữ cảnh, và đôi lúc theo một cách rất là khó hiểu. Để hiểu được "this" thì không chỉ là biết được cách hành xử theo ngữ cảnh của "this", mà còn phải hiểu được chính ngữ cảnh đó, và cách để nhận diện chúng trong mã nguồn.

### Một số vấn đề cơ bản
Trong JavaScript, function chính là object. Bởi vậy, tất cả function trong JavaScript đều có thuộc tính (property) và phương thức (method), giống như một đối tượng (object). 

Bất cứ khi nào một function được thực thi, nó được gán một thuộc tính là "this", một biến với giá trị của đối tượng được truyền vào function nơi "this" được dùng.

Nói cách khác, khi "this" được dùng trong function, giả sử là function A, nó hành động không giác gì một biến (variable) chứa giá trị của object đã gọi function A. "this" không chỉ là một shortcut, quan trọng hơn là cách "this" hoạt động như một bộ nhận dạng: có lúc ta cần nó để truy cập phương thức và thuộc tính của đối tượng đã gọi function A vì không phải lúc nào ta cũng biết được tên của đối tượng đó. Đôi lúc, đối tượng này không có tên để trỏ đến, chẳng hạn như callback, anonymous, hoặc là immediately invoked function.

*“Điều quan trọng cần nhớ là "this" không phải author-time binding mà là runtime binding, nôm na là lúc thực thi chứ không phải lúc viết code. Nghĩa là nơi function được khai báo không ảnh hưởng gì đến "this", bản thân "this" được xác định dựa vào nơi function được gọi.”*

Phát biểu trên hoàn toàn đúng, nhưng hơi phức tạp và khó hiểu, đặc biệt là với một tay mơ như tôi. Thay vào đó, tôi thấy dễ hiểu hơn khi tiếp cận "this" từ một hướng khác, đó là từ đối tượng đã gọi function. Vì đối tượng dễ nhận diện hơn, đặc biệt là trong đoạn mã lớn, xem xét "this" như một biến trỏ đến đối tượng gọi hàm khiến tôi thấy dễ thở hơn nhiều.
>> *'this" là một binding được tạo khi function được gọi, không phải khi nó được khai báo. 'This' tham chiếu đến cái gì sẽ được xác định dựa trên call-site nơi mà function được gọi.*

Lưu ý: *call-site* là vị trí trong đoạn code mà nơi function được gọi. Và việc tìm ra *call-site* không phải lúc nào cũng đơn giản chỉ là tìm xem vị trí function được gọi. Hãy nghĩ về *call-stack*, tức là thứ tự các function được gọi để đưa ta đến trạng thái hiện tại.
Hãy xem ví dụ dưới đây để hiểu cách xác định *call-site* rõ ràng hơn:
```javascript
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope
    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}
function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`
    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}
function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`
    console.log( "foo" );
}
baz(); // <-- call-site for `baz`
```

Có 4 kiểu binding "this" trong JavaScript:
- Implicit Binding
- Explicit Binding
- new Binding
- default Binding
### Default binding
Quy tắc đầu tiên chúng ta dùng để kiểm tra 'this' đến từ trường hợp gọi hàm phố biến nhất: một hàm độc lập thông thường 

Cùng xem xét đoạn mã sau:

```javascript
function foo() {
    console.log( this.a );
}
var a = 2;
foo(); // 2
```
Điều đầu tiên cần lưu ý là biến a được khai báo trong phạm vi toàn cục (global scope), và nó đồng bộ với thuộc tính cùng tên của một đối tượng toàn cục (global-object). Thứ 2 là khi gọi function foo(), *this.a* sẽ trả về 2, tại sao? Đó là vì trong trường hợp này, *default binding* sẽ trỏ "this" đến global object (lưu ý là bất kỳ function nào cũng được wrap bởi một object, trong trường hợp trên thì object đó là window object vì ta chưa bind nó cho một object cụ thể nào cả). Xem ảnh dưới đây để rõ hơn:

![](https://images.viblo.asia/0c803715-760a-4791-b950-9b0ea4c07b86.png)

(Lưu ý là nếu dùng "strict mode" thì "this" sẽ có giá trị là undefined) (Bạn có thể xem thêm tại đây [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context))
### Implicit binding
Một quy tắc khác để xem xét là liệu *call-site* có phương thức được định nghĩa và gọi trong cùng một đối tượng hay không.
Ví dụ:
```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```
Đầu tiên cần lưu ý là foo() được khai báo và sau đó được thêm vào thành một thuộc tính của *obj*, tức là dù foo() được khai báo ban đầu ở đâu, rồi thêm vào thành tham chiếu ở *obj* ra sao, thì nó cũng không thuộc sở hữu hay là được chứa trong object *obj*. Tuy nhiên, *call-site* sử dụng ngữ cảnh *obj* để tham chiếu đến function, nên ta có thể xem như object *obj* chứa tham chiếu đến foo() tại thời điểm function foo() được gọi.

Khi có một đối tượng ngữ cảnh (context object) cho một tham chiếu kiểu function, quy tăc *implicit binding* nói rằng đối tượng đó nên được dùng cho việc binding 'this', và vì *obj* chính là *this* của foo(), nên *this.a* tương đương với obj.a.

#### Implicitly lost
Một trong những nhầm lần chung là "this" binding tạo ra là khi function mất đi binding đó, dẫn đến việc nó quay trở lại sử dụng *default binding*, tức là *this* trỏ về global object hoặc *undefined*, tùy vào *strict mode*
```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

Dù bar là một tham chiếu đến *obj.foo*, thì trên thực tế nó là một tham chiếu khác đến chính bản thân function foo (mà ta khai báo ở trên cùng ấy), vậy nên khi gọi bar(), ta sẽ quy về *default binding* (vì gọi bar() không khác gì gọi foo()).
### Explicit binding
Như trên thì ta phải thay đổi đối tượng để thêm một tham chiếu đến function, và sử dụng tham chiếu này để *bind* gián tiếp 'this' đến đối tượng. Nhưng nếu ta muốn việc gọi hàm sẽ bind "this" cho một đối tượng cụ thể mà không cần phải thêm một thuộc tính để tham chiếu như trên thì sao? Trong Javascript có một số function cho phép ta làm điều trên, chẳng hạn call() hay apply(). Cụ thể như sau:
```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
foo.call( obj ); // 2
```
Bình thường nếu ta chỉ gọi foo(), thì theo *default binding* nó sẽ trả về *undefined*, vì "this" sẽ trỏ đến window object và biến a chưa được khởi tạo. Nhưng bằng việc *explicit binding* với foo.call() cho phép chúng ta trỏ "this" đến object *obj*.
### *new* binding (‘this’ trong hàm khởi tạo)
Quy tắc cuối cùng là sử dụng constructor. Khi một function được dùng để tạo một đối tượng mới, nó được gọi là hàm khởi tạo. Để gọi một hàm khởi tạo, ta dùng từ khóa "new". Một cách khác để nhận diện hàm khởi tạo là khi function bắt đầu bằng một chữ cái viết hoa, và kèm theo nó là ta cần invoke function đó bằng việc sử dụng "new".

Khi constructor được gọi, "this" của nó trỏ đến đối tượng vừa được tạo.

Hãy đào sâu hơn một chút để hiểu tại sao "this" trong constructor lại hoạt động như trên: mỗi khi constructor được gọi, cùng lúc đó, nó tạo một thể hiện mới của "this". Nhiệm vụ của constructor là tạo đối tượng mới với một bí danh tạm thời là "this", và sauddos trả về đối tượng mới này với "this" đã được gán cho nó.

Ta không cần khai báo "this" vì tính năng này được đi cùng từ khóa "new", nghĩa là "this" tự động được tạo ở background mỗi khi constructor được gọi.

![](https://images.viblo.asia/9e8b68ab-be3b-4461-a9e4-273afcdb8b0e.png)

Dài quá ngại đọc: "this" trong constructor trỏ đến đối tượng mới được tạo ra khi gọi constructor đó.

### Thứ tự ưu tiên khi kiểm tra "this" binding
Vậy là ta đã biết được 4 quy tắc để bind "this" khi gọi hàm. Việc ta cần làm là xác định *call-site* và xem xét sử dụng quy tắc nào. Tuy nhiên, nếu *call-site* có thể áp dụng nhiều quy tắc thì sao, ta sẽ cần phải có một thứ tự ưu tiên cho những quy tắc này.

Điều đầu tiên, *default binding* có độ ưu tiên thấp nhất. Tiếp theo, giữa *implicit binding* và *explicit binding*, cái nào có độ ưu tiên cao hơn. Cùng xem ví dụ sau:
```javascript
function foo() {
    console.log( this.a );
}
var obj1 = {
    a: 2,
    foo: foo
};
var obj2 = {
    a: 3,
    foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```
Vậy là *explicit binding* có độ ưu tiên cao hơn *implicit binding*.

Tương tự thì *new* binding cũng được ưu tiên cao hơn *implicit binding*:
```javascript
function foo(something) {
    this.a = something;
}
var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```
### Nâng cao cùng "this"
Giờ ta sẽ đi sâu và phức tạp hơn một tí. Điều gì sẽ xảy ra khi ta đặc function trong một constructor, thậm chí là gọi nó?

Dưới đây ta có một function getThis(), một constructor và một đối tượng mới được tạo bởi constructor. Ví dụ này gọi getThis() trong constructor:

![](https://images.viblo.asia/5047e5ad-5d54-4025-a7ce-463c9f4ecb36.png)

getThis() vẫn trỏ đến Window, vì dù nó được gọi trong Doge() constructor thì bản thân function getThis() chạy trong phạm vi toàn cục (global scope).

Tuy nhiên, khi ta chuyển getThis() thành method trong constructor, "this" sẽ trỏ đến đối tượng mới được tạo:

![](https://images.viblo.asia/2d108b8e-3e50-4bc3-b4b0-eebed221b9f4.png)

Vậy nếu gọi phương thức getThis() ngay trong constructor khi tạo đối tượng mới thì sao?

![](https://images.viblo.asia/c25ee128-8fbf-4956-9879-3b8d17c1e69c.png)

getThis() vẫn trỏ đến đối tượng vừa tạo.

Hơi rối nhỉ, mình cũng chưa hiểu hết, còn một số vấn đề nữa, đặc biệt là việc mất "this" trong callback, mình sẽ đề cập trong một bài khác.

Dịch và soạn lại từ:

- [https://thenewstack.io/tutorial-mastering-javascript/](https://thenewstack.io/tutorial-mastering-javascript/)

- You Don't Know JS - this & Object Prototypes [KYLE SIMPSON]