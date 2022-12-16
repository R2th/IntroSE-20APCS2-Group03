Scope và context là những đặc điểm độc nhất của JavaScript. Function có thể được áp dụng cho nhiều context và scope có thể được đóng gói. Tuy nhiên, điều này cũng là nguồn cơn gây nhầm lẫn cho rất nhiều developer. Sau đây là phần giải thích toàn diện về scope và context, sự khác biệt và cách các design pattern sử dụng chúng.

### Context vs. Scope
Điều đầu tiên là phải phân biệt: ```context``` và ```scope``` là 2 khái niệm khác nhau. Tôi thấy rất nhiều developer nhầm lẫn 2 thuật ngữ này trong một thời gian dài (bao gồm cả tôi). 

Mỗi khi function được gọi thì có cả ```scope``` và ```context``` kết hợp với nó. Về cơ bản, ```scope``` là dựa trên function, còn ```context``` dựa trên object. Nói cách khác, ```scope``` liên quan đến việc function truy xuất biến khi nó được gọi. Còn ```context``` luôn chỉ đến giá trị của từ khóa ```this``` tham chiếu đến object sở hữu đoạn code đang được thực thi.


### Variable Scope
Một biến có thể được định nghĩa trong phạm vi cục bộ (local scope) hoặc toàn cục (global scope), thiết lập khả năng truy cập biến từ các phạm vi khác nhau. Bất kỳ biến toàn cục (tức là những biến khai báo ngoài phạm vi của function) sẽ tồn tại suốt thời gian chạy và được truy cập và chỉnh sửa từ bất kỳ phạm vi nào. Biến local chỉ tồn tại trong phần thân hàm nơi nó được định nghĩa và có phạm vi khác nhau tùy theo cuộc gọi hàm.  Ở đó nó chỉ có thể gán giá trị, truy xuất vào thao tác chỉ  trong cuộc gọi đó và không thể được truy xuất bên ngoài hàm.

ECMAScript 6 (ES6/ES2015) giới thiệu 2 từ khóa là ```let``` và ```const``` cho phép khai báo biến cục bộ của một ```block scope```. Tức là biến được giới hạn trong phạm vi của ```block``` nơi nó được định nghĩa, chẳng hạn như trong câu lệnh ```if``` hoặc vòng lặp ```for```. Điều này trái ngược với việc khai báo biến sử dụng từ khóa ```var```, khi đó ta có thể truy cập biến ngoài ```block``` nó định nghĩa. Sự khác biệt giừa ```let``` và ```const``` là ```const``` là khai báo tham số, tức giá trị đã gán cho biến sẽ không thể thay đổi.

### “this” Context là gì

Context (hay ngữ cảnh) thường được xác định bằng cách gọi hàm. Khi một hàm được gọi như một phương thức của object, ```this``` sẽ là đối tượng đó.
```javascript
var obj = {
    foo: function() {
        return this;   
    }
};

obj.foo() === obj; // true
```

Nguyên tắc này cũng đúng khi gọi hàm bằng từ khóa ```new``` để tạo một thực thể của đối tượng. Khi gọi theo cách này, giá trị của ```this``` trong phạm vi của hàm sẽ là thực thể vừa tạo:

```javascript
function foo() {
    alert(this);
}

foo() // window
new foo() // foo
```

Khi được gọi như một ```unbound function```, ```this``` mặc định trỏ đến ngữ cảnh toàn cục hoặc window object trong trình duyệt. Tuy nhiên, nếu function được thực thi ở strict mode thì context mặc định là ```undefined```.

P/S: tham khảo thêm ở [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
### Ngữ cảnh thực thi (Execution Context)
JavaScript là ngôn ngữ đơn luồng (single thread), nghĩa là chỉ một tác vụ được thực thi tại một thời điểm. Khi trình thông dịch JavaScript thực thi đoạn code, nó mặc định nằm trong ngữ cảnh thực thi toàn cục (global execution context). Mỗi lần gọi hàm sau đó sẽ tạo một ngữ cảnh thực thi mới.

Đây là nơi thường bị nhầm lẫn, thuật ngữ "execution context" là để chỉ ```scope``` chứ không phải ```context``` như đã nói. Đây là tên quy ước được định nghĩa bởi ECMAScript nên chúng ta phải chấp nhận.

Mỗi lần một ngữ cảnh thực thi mới được tạo, nó sẽ nằm phía trên cùng ```execution stack``` (1). Trình duyệt sẽ luôn thực thi ngữ cảnh nằm ở trên cùng của ```execution stack```. Mỗi khi hoàn thành, nó được xóa khỏi stack và trở lại ngữ cảnh thực thi phía dưới. Về logic, một bộ ngữ cảnh thực thi đang hoạt động sẽ tạo thành một stack. Đáy của stack này luôn luôn là ngữ cảnh thực toàn cục (global context), còn ở trên cùng là ngữ cảnh thực thi hiện tại. 

Một ngữ cảnh thực thi được chia thành 2 pha: tạo và thực thi. Ở pha tạo, trình thông dịch sẽ tạo một đối tượng biến (```variable object```) chứa tất cả các biến, khai báo hàm, tham số được định nghĩa trong ngữ cảnh thực thi. Từ đó ```scope chain``` được khởi tạo, và giá trị của ```this``` được xác định sau cùng. Ở pha thực thi, code được thông dịch và chạy.

### Scope Chain
Với mỗi ngữ cảnh thực thi sẽ có một ```scope chain``` đi kèm. ```Scope chain``` chứa đối tượng biến mà ta đề cập ở trên (chứa biến, khai báo hàm, ...). Nó được dùng để xác định việc truy cập các biến và định danh. Ví dụ:

```javascript
function first() {
    second();
    function second() {
        third();
        function third() {
            fourth();
            function fourth() {
                // do something
            }
        }
    }   
}
first();
```

Thực thi đoạn code trên sẽ có kết quả là các hàm lồng nhau được thực thi. Lúc này ```scope chain```, từ trên xuống dưới là: hàm thứ 4, 3, 2, 1, và global. Hàm thứ 4 có thể truy xuất đến biến toàn cục và tất cả các biến được định nghĩa trong 3 hàm kia, và tất nhiên của cả chính nó nữa.

Xung đột tên biến giữa các ngữ cảnh thực thi được giải quyết bằng cách dựa theo ```scope chain```, đi từ ```local``` đến ```global```. Nói một cách đơn giản, mỗi lần bạn thử truy cập biến trong ngữ cảnh thực thi của hàm, quá trình tìm kiếm sẽ bắt đầu với đối tượng biến của hàm đó. Nếu không tìm được thì nó sẽ tìm kiếm tiếp ở ```scope chain```, kiểm tra trong đối tượng biến của ngữ cảnh thực thi xem có biến đó hay không.

### Closures
Truy cập biến ngoài ```lexical scope``` tạo ra một ```closure```. Nói cách khác, ```closure``` được tạo thành khi một function được định nghĩa trong một function khác, cho phép truy cập đến biến của function bên ngoài (outer function). Function bên trong được trả về cho phép ta giữ được quyền truy cập đến biến cục bộ, tham số của outer function. Cách đóng gói này cho phép ta ché giấu và bảo tooàn được ngữ cảnh thực thi khỏi ```scope``` bên ngoài, trong khi vẫn có một ```public interface``` và vẫn có thể tiếp tục thao tác lên nó. Hãy xem ví dụ sau:

```javascript
function foo() {
    var localVariable = 'private variable';
    return function() {
        return localVariable;
    }
}

var getLocalVariable = foo();
getLocalVariable() // "private variable"
```

Một trong những kiểu ```closure``` phổ biến là ```module pattern```; nó cho phép ta mô phỏng biến ```public```, ```private```:

```javascript
var Module = (function() {
    var privateProperty = 'foo';

    function privateMethod(args) {
        // do something
    }

    return {

        publicProperty: '',

        publicMethod: function(args) {
            // do something
        },

        privilegedMethod: function(args) {
            return privateMethod(args);
        }
    };
})();
```

Module được thực thi ngay khi trình biên dịch thông dịch nó, bằng dấu ```()``` ở cuối hàm. Những member sẵn có ngoài ngữ cảnh thực thi của ```closure``` là phương thức và thuộc tính ```public``` nằm trong đối tượng trả về. Tuy nhiên, tất cả các thuộc tính và phương thức ```private``` vẫn tồn tại xuyên suốt ứng dụng, nghĩa là các biến private vẫn có thể được tương tác thông qua các phương thức ```public```.

Một kiểu khác của ```closure``` gọi là ```immediately-invoked function expression``` (IIFE), tức là một ```anonymous function``` được thực thi ngay lập tức:

```javascript
(function(window) {
          
    var foo, bar;

    function private() {
        // do something
    }

    window.Module = {

        public: function() {
            // do something 
        }
    };

})(this);
```

Biểu thức này hữu ích nhất khi bảo toàn được ```global namespace``` vì bất kỳ biến khai báo trong hàm sẽ cục bộ với ```closure``` nhưng vẫn tồn tại trong thời gian thực thi. Đây cũng là phương thức đóng gói mã nguồn phổ biến của ứng dụng và framework, chỉ public một giao diện để tương tác.

### Call và Apply
Đây là hai phương thức sẵn có cho tất cả các hàm, cho phép bạn thực thi bất cứ hàm nào trong bất cứ ngữ cảnh mong muốn. Hàm ```call``` yêu cầu tham số được liệt kê tường mình, trong khi hàm ```apply``` cho phép bạn truyền tham số như array:

```javascript
function user(firstName, lastName, age) {
    // do something 
}

user.call(window, 'John', 'Doe', 30);
user.apply(window, ['John', 'Doe', 30]);
```
Kết quả của 2 hàm trên giống nhau, hàm ```user``` được gọi ở ```window context``` và được cung cấp 3 tham số giống nhau.

ECMAScript 5 (ES5) giới thiệu phương thức  ```Function.prototype.bind``` được dùng để thao tác ```context```. Nó trả về một hàm mới liên kết vĩnh viễn với tham số đầu tiên của ```bind```, bất chấp việc hàm đó được dùng ra sao.

```javascript
if(!('bind' in Function.prototype)){
    Function.prototype.bind = function() {
        var fn = this;
        var context = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return fn.apply(context, args.concat([].slice.call(arguments)));
        }
    }
}
```

Nó thường dùng ở nơi  ```context``` bị mất: hướng đối tượng và xử lý sự kiện

```javascript
function Widget() {
    this.element = document.createElement('div');
    this.element.addEventListener('click', this.onClick.bind(this), false);
}

Widget.prototype.onClick = function(e) {
    // do something
};
```

### Tổng kết
Hiểu được những khái niệm này rất cần thiết trước khi tiếp cận đến ```design pattern```, vì ```scope``` và ```context``` đóng vai trò cơ bản trong JavaScript hiện đại. Dù ta đang nói về ```closure```, hướng đối tượng và kế thừa,... thì ```context``` và ```scope``` đều đóng một vai trò quan trọng. Nếu mục tiêu của bạn là master JavaScript thì ```scope``` và ```context``` nên là điểm bắt đầu.

Dịch: [http://ryanmorr.com/understanding-scope-and-context-in-javascript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

(1) Execution stack: hay còn gọi là ```call stack```, nó liên quan đến ```event loop```, ```callback queue``` và cách JavaScript thực thi tác vụ bất đông bộ (dù bản thân nó là ngôn ngữ single-thread), mình sẽ nói ở một bài khác.