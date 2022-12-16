Xin chào mọi người, hôm nay chúng ta sẽ cùng tìm hiểu một khái niệm khá quan trọng trong javascript đó là con trỏ this. Hiểu được nó ta sẽ tránh được bug không mong muốn khi làm việc với javascript. Mọi người hãy tìm hiểu trước về các hàm call, apply, bind trước khi đọc bài viết.
# 1. Call site
Để hiểu được khái niệm this, ta cần hiểu trước về call-site (được hiểu là vị trí mà đoạn code được gọi, không phải là vị trí code được khai báo). Tìm được call-site tức là tìm được nơi hàm được gọi, điều này không phải lúc nào cũng dễ dàng trong javascript. Một khái niệm nữa cần biết đó là call-stack( một hàng đợi khi các function được thực thi). Cùng hiểu về call-site và call-back qua ví dụ sau đây: <br>
``` javascript
    function baz() {
        // call-stack là: `baz`
        // call-site sẽ là trong global scope
        console.log( "baz" );
        bar(); // <-- call-site cho `bar`
    }
    function bar() {
        // call-stack là: `baz` -> `bar`
        // call-site là trong `baz`
        console.log( "bar" );
        foo(); // <-- call-site cho `foo`
    }
    function foo() {
        // call-stack là: `baz` -> `bar` -> `foo`
        // call-site trong `bar`
        console.log( "foo" );
    }
    baz(); // <-- call-site cho `baz`
```
Qua ví dụ trên, ta đã hiểu được rõ hơn về khái niệm call-site và call-back. Hãy cùng xem về các rule khi áp dụng với "this" trong javascript
# 2. Các Rules áp dụng với This
Chúng ta sẽ hướng sự chú ý về việc call-site sẽ xác định như thế nào về vị trí của "this" khi thực hiện một function.
## 2.1 Default Binding
Rule đầu tiên về this đó là khi function được gọi một cách độc lập, hãy nghĩ về rule này như là một rule defult khi mà không áp dụng đối với các rule còn lại. <br>
Ví dụ <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var a = 2;
    foo(); // 2
```
Khi hàm foo được gọi, this.a sẽ trỏ đến biến a của global object. Tại sao? Vì ta cùng xét đến call-site của foo(). Hàm foo() được gọi một cách trực tiếp, không có tham chiếu đến đâu cả. <br>
Chú ý rằng khi ta sử dụng strict mode trong hàm thì this ở đây sẽ nhận giá trị undefined do đó sẽ có lỗi <br>
``` javascript
    function foo() {
        "use strict";
        console.log( this.a );
    }
    var a = 2;
    foo(); // TypeError: `this` là `undefined`
```
## 2.2 Implicit Binding
Rule thứ 2 khi áp dụng với this đó là khi call-site có context là object. Xét ví dụ sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    obj.foo(); // 2
```
Điều đầu tiên cần chú ý đó là function foo() được khởi tạo, sau đó được tham chiếu bởi một thuộc tính trong obj ta hiểu là hàm bị bao bởi một object (trong trường hợp này là obj) <br>
Call-site sử dụng obj để tham chiếu đến hàm, ta hiểu rule này là obj sẽ được tham chiếu đến this khi hàm foo được gọi, hay có thể hiểu this.a ở đây chính là obj.a <br>
Cũng cần nhớ rằng chỉ có obj cuối cùng trong chuỗi gọi sẽ được tham chiếu đến như trong ví dụ sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var obj2 = {
        a: 42,
        foo: foo
    };
    var obj1 = {
        a: 2,
        obj2: obj2
    };
    obj1.obj2.foo(); // 42 this sẽ tham chiếu đến obj2 thay vì là obj1
```
### Implicitly lost
Có thể sẽ có trường hợp ngoại lệ của rule này như sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var bar = obj.foo;
    var a = "oops, global"; // `a` cũng là một biến của global object
    bar(); // "oops, global"  sẽ gọi của global object thay vì của obj
```
Nhớ lại về call-site áp dụng trong trường hợp này, hàm được gọi một cách trực tiếp không thông qua đâu cả nên rule một được áp dụng tại đây <br>
Ngay cả khi truyền hàm như một biến trong call back function như trong trường hợp sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    function doFoo(fn) {
        // `fn` tham chiếu đến `foo`
        fn(); // call-site!
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var a = "oops, global"; // một thuộc tính khác của global object
    doFoo( obj.foo ); // "oops, global"
```
## 2.3 Explicit binding
Rule thứ 3 áp dụng đối với this tạm hiểu là kiểu tường minh. Xét ví dụ sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2
    };
    foo.call( obj ); // 2
```
Khi ta gọi foo.call(...) tức là cho phép ta gấn this với obj. Tuy nhiên áp dụng cái này cũng chưa thể giúp ta giải quyết được tình trạng "implicit lost" như trên phần trước.
### Hard binding
Cùng xem xét ví dụ sau <br>
``` javascript
    function foo() {
        console.log( this.a );
    }
    var obj = {
        a: 2
    };
    var bar = function() {
        foo.call( obj );
    };
    bar(); // 2
    setTimeout( bar, 100 ); // 2
    bar.call( window ); // 2
```
Hãy cùng xem ví dụ này hoạt động như thế nào. Ta tạo ra một fuction bar(), rồi gọi foo.call(obj) tức là mỗi lần gọi hàm foo thì "this" sẽ luôn tham chiếu đến obj, đây được gọi là "hard binding". Cùng xem xét một ví dụ nữa sau đây <br>
``` javascript
    function foo(something) {
       console.log( this.a, something );
       return this.a + something;
    }
    var obj = {
        a: 2
    };
    var bar = function() {
        return foo.apply( obj, arguments ); // hard binding cho foo với obj
    };
    var b = bar( 3 ); // kết quả: 2 3 this sẽ luôn tham chiếu đến obj
    console.log( b ); // 5
```
Bởi vì hard binding là một pattern khá phổ biến nên từ ES5 đã cung cấp một hàm bind để thực hiện điều này, nó được sử dụng như sau để giúp ta giải quyết vấn đề "implicit lost" của rule 2 <br>
``` javascript
    function foo(something) {
        console.log( this.a, something );
        return this.a + something;
    }
    var obj = {
        a: 2
    };
    var bar = foo.bind( obj ); // "bind" foo với obj
    var b = bar( 3 ); // kết quả: 2 3 vì this trong foo luôn tham chiếu đến obj 
    console.log( b ); // 5
```
## 2.4 New
Rule tiếp theo khi áp dụng đối với this đó là khi sử dụng với từ khóa new. Khi ta gọi một function trong javascript với từ khóa new đằng trước nó thì các điều sau sẽ được thực hiện: <br>
1. Một object mới sẽ được tạo ra
2. Object mới này sẽ được binding this với function đó
3. Trừ phi hàm đó trả về một object thay thế nếu không sẽ luôn tự động trả về obj mới tạo ra <br>
Xét ví dụ sau <br>
``` javascript
    function foo(a) {
        this.a = a;
    }
    var bar = new foo( 2 );
    console.log( bar.a ); // 2
```
Bằng cách gọi foo(...) với từ khóa new đằng trước nó, ta tạo ra một object mới và set object mới này như là this cho foo(...). Đây gọi là new binding
# Review
Hãy cùng review lại 4 rule khi áp dụng với this <br>
1. Khi call với new? thì rule về new binding sẽ được áp dụng 
2. Khi gọi với call, apply hay bind? rule => explicit binding 
3. Khi gọi mà có một context object chứa ? rule => implicit binding
4. Rule default sẽ được áp dụng trong các trường hợp còn lại 
# 3. Kết luận
Như vậy bài viết đã giúp tìm hiểu về contrỏ "this" trong javascript - một khái niệm rất quan trọng trong javascript. Các rule để giúp ta xác định được this trong javascript. Hi vọng bài viết giúp ích cho mọi người, nếu có gì góp ý hay thảo luận xin hãy để lại bình luận phía dưới. (See you) :D
# Reference
http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/ <br>
https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/this-object-prototypes/README.md