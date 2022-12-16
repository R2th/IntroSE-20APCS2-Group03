Khi thực hiện code với ReactJs, có bao giờ bạn đặt câu hỏi rằng: Sao chúng ta lại thực hiện hành động `bind` các method trong class với `this` trong hàm constructors trong React Component giống dưới này chưa?
```js
    this.example1 = this.example1.bind(this); 
```

Và sau một thời gian khi Component trở nên lớn hơn với thật là nhiều call back function, thì hàm `constructors` sẽ trở nên dài và khá là xấu xí như này:
```js
import React from 'react';

class App extends React.Component {
    constructor(props) {
        this.example1 = this.example1.bind(this); 
        this.example2 = this.example2.bind(this); 
        this.example3 = this.example3.bind(this); 
        ...
    }
    
    example1() { }
    example2() { }
    example3() { }
    
    render() {
        ...
    }
}
```

Gần đây mình có được một anh trong Group gợi ý thử sử dụng Arrow function để thay thế cho cách trên với lý do là với Arrow function, bạn sẽ không cần đến những đoạn `bind(this)` thật là dài như trên kia nữa.
Khi đó Component trông đơn giản hơn khá nhiều:
```js
import React from 'react';

class App extends React.Component {
    constructor(props) {   
    }
    
    example1 = () => { }
    example2 = () => { }
    example3 = () => { }
    
    render() {
        ...
    }
}
```
Ổn luôn, trông gọn gàng và dễ hiểu hơn hẳn so với ví dụ trên kia. Tuy nhiên mình cũng nhận được một số ý kiến trái chiều về việc sử dụng Arrow function như vậy, vì thế mình đã đi tìm hiểu để xem hai cách này lợi và hại như thế nào để thực sự hiểu hơn và xem xem sẽ áp dụng cách nào ở tình huống nào.

Trước đó, mình sẽ quay trở lại một chút để làm rõ vài thứ. Đầu tiên `bind` là gì và để làm gì.
## Bind
> “The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.”

Đại loại, hàm `bind()` sẽ khởi tạo một function mới mà không phải gọi đến function một cách trực tiếp, khi được gọi cùng với tham số `this` thì những tham số truyền vào sau này khi gọi tới function mới sẽ được thay đổi sang ngữ cảnh mà `this` gắn tới.

Các bạn có thể nhìn ví dụ dưới đây để thấy rõ hơn:
```js
function example() {
  console.log(this.address);
}
var home = {'address': 'HN'};
example(); // undefined
// thực hiện bind home cho function example
example = example.bind(home)
example(); // HN 
```
Có thể thấy trước khi được `bind` *home*, `example()` chỉ là một function bình thường và không được tham chiếu tới đâu hết nên nó không in được ra giá trị khi gọi `this.address`. 
Tuy nhiên sau khi `bind` thì ngữ cảnh của `this` chính là *home*, và khi đó đã có thể lấy được giá trị của *address*.

Rất là cơ bản, tuy nhiên trong trường hợp phức tạp hơn một chút thì sao? 
```js
function example() {
  console.log(this.address);
}
var home = {'address': 'HN'};
example(); // undefined
// Gắn example vào như một property của home
home.example = example;
home.example(); // HN
// Copy home.example sang biến mới
var example1 = home.example;
example1(); // undefined ??:D??
```
Khi gắn `example` vào *home* và gọi tới nó dưới ngữ cảnh của *home* thì mọi thứ vẫn chạy bình thường. Tuy nhiên khi copy nó sang *example1* thì BÒM, mất luôn ngữ cảnh `this` của nó và khi đó đã không còn `this.address` nữa. Vậy thì giải quyết sao đây? Lại quay về với `bind`.
```js 
example = example.bind(home);

home.example = example;
var example1 = home.example;
example1(); // đã có giá trị HN 
```

Có vẻ với `bind` như vậy là ổn. Tuy nhiên ở trong các class thì sao? Về bản chất class trong javascript là những function đặc biệt chứ không hề liên quan gì đến class trong OOP, nó giúp cú pháp đơn giản và rành mạch hơn cho việc tạo object. Có nghĩa là hành vi ở các class giống nhau.

Vì vậy khi thấy hành động copy một method trong class sang một biến mới thì hãy hiểu rằng đây chính xác là việc tạo ra các *callback* mà thôi. Điển hình như thuộc tính `onClick` của element `button` dưới này.

```js
class App extends React.Component {
  constructor() {
    this.clickhandler = this.clickhandler.bind(this);
  }
  
  clickhandler() {
    console.log('Clicked');
  }
  
  render() {
    return ( 
        <div>
          <button onClick={this.clickhandler}> // => CALLBACK
            Click
          </button>
        </div>
    );
  }
}
```
OK mãi mới thông được chỗ đó. Vậy với Arrow function mà từ đầu đến giờ mới đả động lại thì sao?
## Arrow function
Quay lại vấn đề cơ bản:
```js
var address = 'BV';
var example = () => { 
    console.log(this.address) 
};
example(); // BV

var home = {'address': 'HN'};
home.example = example;
home.example() // BV
example.bind(home)
home.example() // BV
```
Lý do gì mà ở đây dù đã `bind` mà vẫn không gắn được ngữ cảnh của *home* vào `example`?
> “This is because, you cannot “rebind” an arrow function. It will always be called with the context in which it was defined.“
> 
**Bởi vì sẽ không thể rebind Arrow function, nó luôn luôn gọi đến ngữ cảnh mà nó đã được định nghĩa ra.**

Điều này có nghĩa là khi sử dụng Arrow function như các callback thì nó sẽ hoạt động đúng yêu cầu. Vì với callback Arrow function như `clickhandler` được định nghĩa một cách vĩnh viễn trong ngữ cảnh của class *App*. 
```js
class App extends React.Component {
  constructor() {
  }
  
  clickhandler = () => {
    console.log('Clicked');
  }
  
  render() {
    return ( 
        <div>
          <button onClick={this.clickhandler}> // => CALLBACK
            Click
          </button>
        </div>
    );
  }
}
```
Nhưng hãy chú ý: 

**Với những function thông thường khi bạn gán nó cho một biến hay sử dụng như callback thì ngữ cảnh của nó sẽ bị mất.**

##  Ngoài lề
Nhìn chung sự khác nhau cơ bản đã được giải đáp, tuy nhiên so sánh sâu hơn nữa, dưới đây là thể hiện của Component App với 2 kiểu sử dụng function `clickhandler`:

Cách thông thường: `clickhandler` được gán như một property của *App*

![regular function](https://images.viblo.asia/d6ff5d98-3a1d-4703-90e4-8aff8a31349a.png)

Sử dụng Arrow function: `cickhandler` lại không thấy đâu nữa ??:D??

![arrow function](https://images.viblo.asia/27c41b3a-392d-4120-91ca-3432efd3917a.png)

Để hiểu được điều này, chúng ta sẽ thử một ví dụ:
```js
class Foo {
  constructor(name) {
    this.name = name;
  }
  function bar() {console.log(this.name)}
  foobar = () => {console.log(this.name)}
}
var f = new Foo("jack")
f.bar() // jack
f.foobar() // jack

console.dir(Foo);
console.dir(f);
```
Chúng ta có 2 method trong class được định nghĩa theo dạng thông thường và Arrow function. Dưới đây là thể hiện của chúng.
![](https://images.viblo.asia/3dc1889b-9056-4881-808a-858ca18a3f16.png)

`bar()` được gắn vào làm một property của class *Foo* và được sao chép vào `__proto__` khi tạo một instance của *Foo*. Còn `foobar()` lại bị ẩn đi ở class *Foo* nhưng được định nghĩa là một thuộc tính độc lập trên instance của *Foo*.

**Vì vậy có thể thấy khi thay thế việc sử dụng các function thông thường bằng Arrow function trong class giúp chúng trở nên private(Maybe =)) )**

## Kết
Trên đây là một số những nhận định mà mình rút ra được, và việc sử dụng Arrow function như thế nào sẽ tuỳ thuộc vào mục đích và ngữ cảnh của bạn. Cám ơn đã theo dõi!

Tham khảo:
https://blog.usejournal.com/arrow-functions-are-disrupting-react-components-63662d35f97b
https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Classes