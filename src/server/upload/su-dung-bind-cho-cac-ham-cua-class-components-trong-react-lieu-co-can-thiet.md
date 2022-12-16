## Đặt vấn đề
Trong quá trình làm việc với các Components trong React, bạn đã có lần nào bắt gặp đoạn code của ai đó dùng hàm `.bind()` cho các method của các *component instance* trong *constructor*:
```
class Foo extends React.Component{
    constructor( props ){
        super( props );
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        // your event handling logic
    }
    render(){
        return (
            <button type="button" onClick={this.handleClick}>Click Me</button>
        );
    }
}
ReactDOM.render(<Foo />,document.getElementById("app"));
```
Trong bài viết này chúng ta tìm hiểu lý do tại sao cần phải làm như vậy 😃
<br/>
*Kiến thức này phù hợp cho các bạn đã có kiến thức cơ bản về Javascript hoặc đang tìm hiểu React. Để hiệu quả, nếu chưa từng biết qua về hàm `.bind()`, bạn xem qua tại đây, sau đó mới đọc tiếp nhé !*
## React không có lỗi, lỗi ở JavaScript
Sự thật thì đây chỉ là do cách hoạt động khá đặc biệt của `this` trong JS:
```
class Foo extends React.Component{
    constructor( props ){...}
    
    handleClick(event){
        console.log(this); // 'this' is undefined
    }
    
    render(){
        return (
            <button type="button" onClick={this.handleClick}>Click Me</button>
        );
    }
}
ReactDOM.render(...);
```
[Open in Codepen](https://codepen.io/echovariables/pen/pGVqOp?editors=1011)
<br/>
Khi ấn vào Click me, bạn sẽ thấy kết quả in ra `undefined` trong cửa sổ Console. Phải chăng hàm `handleClick()` đã mất đi ngữ cảnh thực thi của nó? 🤔🤔
<br/>
Như đã nói ở trên thì dẫn tới kết quả như trên là do cách hoạt động của `this` trong Javascript, và để giải thích vấn đề này, ta sẽ gác lại đoạn code trên một chút, cùng tìm hiểu về từ khóa `this` nhé!
## "this" trong Javascript
Trong bài viết này mình sẽ không đi sâu quá nhiều vào cách xác định giá trị của this nên bạn có thể tham khảo thêm [tại đây](https://haodev.wordpress.com/2018/11/16/this-in-javascript/).
Mấu chốt của vấn đề này là:
> The value of this inside a function depends upon how that function is invoked.
<br/>
Giá trị của `this` trong hàm phụ thuộc vào cách mà nó được gọi. Để làm rõ hơn phát biểu này ta đi vào các trường hợp cụ thể:
### Default binding
```
function display(){
    console.log(this);
}
display();
```
Đây là cách gọi hàm đơn giản ta hay dùng. Giá trị của `this` trong `display()` một *global object* ( như *window* chẳng hạn) ( hoặc sẽ là `undefined` trong trường hợp sử dụng *strict mode*)
### Implicit binding
```
var cat = {
    name: 'Gafield',
    display: function(){
        console.log(this.name); // 'this' points to cat
    }
};
cat.display(); // Saurabh
```
Khi chúng ta gọi một hàm theo cách này (**context object .method**), giá trị của `this` trong `display()` sẽ được gán cho `cat`.

Bây giờ, thử tạo một tham chiếu của hàm này tới biến khác và thực thi hàm mới được tham chiếu này, bạn sẽ nhận được giá trị của `this` không còn của đối tượng ban đầu nữa:
```
var name = "Tom";
var outerDisplay = cat.display;
outerDisplay(); // Bạn đoán xem kết quả là như thế nào?
```
Xem kết quả [tại đây](https://codepen.io/echovariables/pen/OdZdXj?editors=0011) 
<br/>
Trong ví dụ trên, khi gọi hàm `outerDisplay()`,  chúng ta không chỉ định *context object*, nghĩa là nó gọi phương thức này nhưng chẳng bảo nó là của đối tượng nào cả. Trường hợp này, giá trị của `this` sẽ được *Default binding*. Nghĩa là sẽ log ra `Tom` (hoặc log ra `undefined` trong *strict mode* )
### "this" với Callback.
Điều này cũng tương tự trong trường hợp bạn truyền một hàm callback cho một hàm khác.
<br/>
Giả sử, với hàm `setTimeout()`:
`setTimeout( cat.display, 1000 );`
<br/>
Lệnh trên sẽ thực thi `cat.display()`. Sau 1s, bạn nghĩ kết quả in ra là gì? 🤔🤔
<br/>
Xem kết quả [tại đây](https://codepen.io/echovariables/pen/daeaNM)
<br/>
Hãy cùng phân tích, mình có thể hiểu định nghĩa hàm `setTimeout()` kiểu sơ khai đơn giản như sau:
```
function setTimeout(callback, delay){
    //wait for 'delay' milliseconds
    callback();
}
```
Hình dung rằng khi gọi hàm `setTimeout()`, JS sẽ có một bước gán `cat.display` cho *argument callback*:
`callback = obj.display;`<br/>
Tới đây thì cũng giống như trường hợp hàm `outerDisplay()` phía trên, làm cho hàm `display()` bị mất ngữ cảnh của nó. <br/>
Do đó, khi callback này được gọi bên trong `setTimeout()`, giá trị của `this` bên trong hàm này sẽ lại theo quy tắc *default binding*:
```
var name = "Tom";
setTimeout( obj.display, 1000 ); //Tom
```
## Explicit Hard Binding
Nãy giờ nói khá nhiều về *default binding*, như vậy thì để tránh các trường hợp đó, khi gọi method nào của đối tượng nào mình declare cứng luôn thông qua phương thức `.bind()`. Chỉnh sửa đoạn code trong [demo phía trên](https://codepen.io/echovariables/pen/OdZdXj?editors=0011) thành như sau:
<br/>
```
var name = "Tom";
var outerDisplay = cat.display.bind(obj);;
outerDisplay(); // Gafield
```
Bây giờ khi ta gọi `outerDisplay()`, `this` vẫn sẽ trỏ tới đối tượng `cat`. Hay cho dù gọi nó như một callback thì `this` vẫn sẽ trỏ đúng đối tượng `cat`.
## Quay lại vấn đề với Class Component
[Vấn đề ban đầu](https://codepen.io/echovariables/pen/pGVqOp?editors=1011) của chúng ta là khi không `.bind()` các method của các *component instance* trong *constructor* thì giá trị của `this` là `undefined`?
<br/>
Việc mình truyền hàm `handle()` như một *callback* trong React Component sẽ làm mất context của nó. Do đó, `this` sẽ là một *global object* hoặc `undefined` như phần review `this` mình đề cập phía trên 
Hơn nữa, trong [việc sử dụng class trong ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) có một quy tắc:
> The bodies of class declarations and class expressions are executed in strict mode, that is the constructor, static and prototype methods. Getter and setter functions are executed in strict mode.
>
Để `this` giữ đúng context của nó, bạn chỉ cần `bind()`:
```
class Foo {
    constructor(name){
      this.name = name
      this.display = this.display.bind(this);
    }
    ...
}
```
**Notes:** *Không nhất thiết phải `.bind()` trong `constructor()`. Tuy nhiên, `constructor()` là được recommended để bind các method, vì đó là nơi quá trình khởi tạo diễn ra.*
## Giải pháp khác
Hmm... Vẫn dựa vào cách hoạt động của `this`, tuy nhiên đối với *arrow function*, ta không cần phải dùng phương thức `.bind()` nữa 😃
> For arrow function, this is bound lexically. This means that it uses the context of the enclosing function — or global — scope as its this value
> 
<br/>
Khi sử dụng arrow function, hàm thực thi sẽ được tự động gắn cho component instance, và ta không cần phải bind nó trong constructor():

**Cách 1: Public Class Fields**

```
class Foo extends React.Component{
    handleClick = () => {
    console.log(this); 
}

    render(){
        return (
            <button type="button" onClick={this.handleClick}>Click Me</button>
        );
    }
} 
ReactDOM.render(<Foo />, document.getElementById("app"));
```
Hàm *arrow function* được bao bởi `Foo` class  (hoặc hàm *constructor function*), nên context của nó vẫn vẫn là *component instance*.
<br/>
**Cách 2: Arrow function as callback**
```
class Foo extends React.Component{
  handleClick(event){
    console.log(this);
  }
 
  render(){
    return (
      <button type="button" onClick={(e) => this.handleClick(e)}>Click Me</button>
    );
  }
}
ReactDOM.render(<Foo />,document.getElementById("app"));
```
Trường hợp *arrow function* được dùng như một *callback* trong `render()` (được gọi bởi React trong context của *component instance*). Do đó, giá trị của `this` chắc chắn cũng sẽ trỏ về *component instance* đó. 😄😄
## Tóm tắt
* Trong Class Components của React, khi bạn truyền vào một  callback, nó có thể mất đi context của nó. Hay khi sự kiện diễn ra, hàm được gọi, giá trị của `this` sẽ trở về *default binding*, cụ thể sẽ là `undefined` vì class declarations trong ES6 áp dụng strict mode.
* Có 2 hướng để xử lý:
    * **`.bind()`**: gắn hàm xử lý đó với *component instance* trong *constructor* thông qua hàm `.bind()`
    * **Arrow function**:  Sử dụng *Arrow function* là một giải pháp vì nó dùng **lexical `this` binding** nên sẽ tự động gắn hàm đó vào *scope* mà nó được định nghĩa.
<br/>

Mong rẳng bài viết của mình sẽ phần nào giúp ích cho các bạn ! <br/>
<br/>
Nguồn tham khảo: [Medium](https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb), [Personal Blog](https://haodev.wordpress.com)