Một số ghi chép của mình trong quá trình học ES hơi sâu :sweat_smile:

# ECMAScript
- Tên chính thức của Javascript
- Tài liệu chuẩn hóa Javascript
- Thường được gọi tắt là ES

# ES6

## ES6 là gì?
- Bản đặc tả ECMAScript phiên bản 6. Đặc tả tức là bản mô tả chức năng, cú pháp, còn việc có hỗ trợ hay không là phụ thuộc vào phiên bản của từng platform (browser, node.js, babel transpiler,...)
- Ra đời vào năm 2015 nên còn được gọi là ES2015
- Là phiên bản nâng cấp lớn của ES5 ra đời vào năm 2009
- 6 năm cho một lần release là quá lâu và số lượng feature mới cũng là quá nhiều mà chưa có platform nào implement được đầy đủ [1],[2]. Do đó quy trình release đã được thay đổi. Các phiên bản tiếp theo được release theo từng năm và theo quy trình mở [3],[4].
- Có thể chia ra thành các phiên bản: ES6, ES 2016+ (ES7, ES8, ES9, ES10...) và ES Next (là những chức năng mới sắp được release [5])
- Vì thường có yêu cầu phải support nhiều phiên bản trình duyệt khác nhau nên chúng ta thường phải sử dụng các transpiler (chẳng hạn babel, swc) để translate ra cú pháp mà support được các browser cũ, do đó khi đọc bảng compatibility table [1] nên chú ý đến cột *Babel + core-js*

Tham khảo thêm:
- [1] https://kangax.github.io/compat-table/es6/
- [2] https://node.green/
- [3] https://kipalog.com/posts/Tim-hieu-quy-trinh-TC39
- [4] http://2ality.com/2015/11/tc39-process.html
- [5] https://github.com/tc39/proposals/blob/master/finished-proposals.md

## [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
ES6 giới thiệu 2 từ khóa mới là `let` và `const` dùng để khai báo biến, trước đây chỉ có `var`.

### Khác với [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
Các biến được khai báo với `var` có phạm vi `function scope`, còn với `let`, `const` thì nó phạm vi `block scope`
- `function scope`: Biến được khai báo dùng được trong toàn bộ function
    ```js
    function usingVar() {
        let x = 1;
        if (true) {
            var y = 2;
            console.log(x); // 1
        }

        console.log(y); // 2
    }
    ```
- `block scope`: Biến được khai báo chỉ sử dụng được trong block {} nơi mà nó được khai báo
    ```js
    function usingLet() {
        let x = 1;
        if (true) {
            let y = 2;
            console.log(x); // 1
        }

        console.log(y); // Error: y is not defined
    }
    ```
    Hoặc đối với biến trong vòng for:
    ```js
    for (let i = 0; i < 5; ++i) {
        console.log(i); // OK
    }

    console.log(i); // Error: y is not defined
    ```

### let vs const
- `let`: biến đã khai báo có thể được gán lại
    ```js
    let letVar = 'My old name';
    if (true) {
        letVar = 'I can have new name';
    }
    ```
- `const`: biến đã khai báo không thể được gán lại
    ```js
    const constVar = 'Only god can change me';
    if (true) {
        constVar = 'Don\'t try to change me'; // Error: invalid assignment
    }
    ```
    Tuy nhiên nếu const là object thì giá trị của object vẫn có thể bị thay đổi. Chỉ *không thể bị gán thành object khác* mà thôi.
    ```js
    const myObject = {
        id: 1,
        name: 'Can be changed'
    };
    myObject.name = 'New name'; // OK
    myObject = null; // Error
    ```

Từ đây trở đi chúng ta sẽ chủ yếu dùng `let` và `const`.

## [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
ES6 giới thiệu thêm việc khai báo string bằng ký tự \` (backtick), bổ sung cho `'` và `"`.

Dùng backtick ta có thể khai báo multiline string:
```js
const multiline = `Rose is #f00
Violet is #00f
People often use word
But I will use hex code for you!
`;
```
Thay cho trước đây:
```js
const multiline = 'This is first line'
    + 'This is second line';
```

Có thể dùng biến hoặc biểu thức JS trong string (String interpolation):
```js
const name = 'ES6';
function thanks() {
    return 'Thank you!';
};
const obj = {
    ask() {
        return 'And you?';
    }
};
const superPowerString = `How are you, ${name}? - I'm fine. ${thanks()} ${obj.ask()}`;
```

## [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
Cú pháp khá giống với các ngôn ngữ class based OOP như PHP hoặc Java.

Class trong ES6 support kế thừa, super (parent) calls, instance method, static methods and constructor.

### Constructor
```js
class Animal {
    constructor(name) {
        this.name = name;
    }
}

let dog = new Animal('Golden Retriever');
console.log(dog.name);
```

### Instance method
```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`My name is ${this.name}`);
    }
}

let dog = new Animal('Golden Retriever');
console.log(dog.introduce());
```

### Static method
```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    static species() {
        return 1300000;
    }
}

console.log(Animal.species());
```

### Getter & Setter
ES6 class support define các getter, setter cho các property của object. Cho phép chúng ta custom logic khi đọc/ghi giá trị của property, chẳng hạn validate, biến đổi giá trị...
```js
class Animal {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name.toUpperCase();
    }

    set name(name) {
        this._name = name.toLowerCase();
    }
}

let dog = new Animal('Golden Retriever');
console.log(dog.name);

dog.name = 'Husky';
console.log(dog.name);
```
Nhìn vào class có thể nhầm lẫn `name()` là một instance method, nhưng ở đây nó là method đặc biệt, chúng ta không thể gọi trực tiếp method này mà từ tên method => tên property.

```js
let dog = new Animal('Golden Retriever');
dog.name(); // ERROR
dog.name; // OK
```

### Inheritance
```js
class Animal {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name.toUpperCase();
    }

    set name(name) {
        this._name = name.toLowerCase();
    }

    introduce() {
        console.log(`My name is ${this.name}`);
    }

    static species() {
        return 1300000;
    }
}

class Cat extends Animal {
    constructor(name, isReal) {
        super(name);

        this.isReal = isReal;
    }

    static species() {
        return NaN;
    }
}

let tom = new Cat('Tom', false);
console.log(tom);
tom.introduce();
console.log(Cat.species());
```

### [Class fields](https://github.com/tc39/proposal-class-fields)
ES vẫn chưa chính thức support việc khai báo private/public property của object class, tính năng này vẫn đang còn được thảo luận ([Proposal Stage 3](https://github.com/tc39/proposal-class-fields)).
```js
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Static field
Rectangle.staticWidth = 20;
```
Với proposal này ta có thể viết khai báo instance field và static field như sau:
```js
class Rectangle {
    height = 0;
    width;

    static staticWidth = 20;

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
```

Nếu sử dụng Create React App thì tính năng này cũng đã được enable, chúng ta có thể sử dụng nó:
```jsx
class Button extends React.Component {
    static defaultProps = {
        type: 'primary',
    }

    static propTypes = {
        children: PropTypes.string,
    };

    static contextType = MyContext;
}
```

## [Enhanced Object Properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
ES6 cung cấp thêm một số cú pháp giúp cho việc khai báo object dễ dàng hơn.

### Property Shorthand
Khai báo property và value ngắn gọn:
```js
const name = 'Killua';
const type = 'Transmuter';

const killa = { name, type };
```

Tương đương với cách cũ:
```js
const name = 'Killua';
const type = 'Transmuter';

const killa = { name: name, type: type };
```

### Computed Property Names
Property của object có thể là dynamic:
```js
const event = 'click';

const handlers = {
    [`on${event}`]: true,
};
// {onclick: true}
```

Nếu viết theo cách cũ:
```js
const event = 'click';

const handlers = {};
handlers[`on${event}`] = true;
```

### Method Properties
```js
const command = {
    play() {
        //
    },
    pause() {
        ///
    },
    seek(time) {
        //
    },
};
```

Với cách viết cũ:
```js
const command = {
    play: function () {
        //
    },
    pause: function () {
        ///
    },
    seek: function (time) {
        //
    },
};
```

## [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
Cú pháp viết function ngắn gọn sử dụ dấu `=>` hay còn gọi là **fat arrow**:

```js
const hello = () => {
    console.log('Hello ES6 "fat arrow" function');
}
```
Ví dụ trên tương đương với cách viết cũ như sau:
```js
function hello() {
    console.log('Hello ES6 "fat arrow" function');
}
```

### Tham số trong arrow function
Khi cần truyền tham số:
```js
const hello = (name, year) => {
    console.log(`Hello ${name} from the year ${year} of future!`)
}
```
Nếu chỉ có 1 tham số thì có thể lược bỏ dấu ngoặc đơn:
```js
const hello = name => {
    console.log(`Hello ${name}!`)
}
```

### Expression bodies (Implicit returns)
Không có curly braces => Implicit return
```js
const add = (x, y) => x + y;
console.log(add(1, 2)); // 3

const products = [
    {id: 1, name: 'Ubuntu'},
    {id: 2, name: 'CentOS'},
    {id: 3, name: 'openSUSE'},
];
const productIds = products.map(product => product.id);
```

Nếu muốn return object thì sao? => Wrap object bên trong cặp ngoặc `()`:
```js
const makeCoffee = () => ({
    type: 'Gi cung duoc',
});
console.log(makeCoffee()); // { type: "Gi cung duoc" }

this.setState(prevState => ({
    count: prevState.count++
}));
```

### Statement Bodies
Nếu viết theo statement bodies:
```js
const add = (x, y) => {
    return x + y;
}

const makeCoffee = () => {
    return {
        type: 'Gi cung duoc',
    };
};

this.setState(prevState => {
    return {
        count: prevState.count++
    };
}
```

### Lexical this
Khoan nói về khái niệm `lexical this`.

##### `this` là gì?
Giống như trong các ngôn ngữ lập trình khác như PHP, Java thì `this` được sử dụng như một đại từ nhân xưng để thay thế cho đối tượng mà chúng ta đang sử dụng.

Ví dụ:
```php
class Person {
    private $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function hello()
    {
        return "My name is {$this->name}.";
    }
}

$es = new Person('ES');
$es->hello(); // "My name is ES."
```

`this` chỉ tồn tại và được sử dụng bên trong object (hay còn gọi là: instance của một class). Thật đơn giản và dễ hiểu!!!

Nhưng ở đây Javascript không như vậy. Điều khác biệt là:
- Function trong JS cũng là một object và do đó nó có `this`
- `this` được xác định vào lúc function được gọi, dựa theo ngữ cảnh: *ai* (*đối tượng nào*) gọi function đó và gọi theo cách nào, chứ không phải dựa theo nơi mà nó được sử dụng (bên trong method của class)

Vậy trong JS có những cách gọi function nào? Ví dụ ta có function sau:
```js
function whoami() {
    console.log('You are ', this);
}
```
- Global function call:
    ```js
    whoami(); // You are Window
    ```
    > => `this` được xác định là global object, tương đương với đối tượng `window` trên trình duyệt hoặc `global` trong NodeJS.

- Method call:
    ```js
    const obj = {
        name: 'Normal Person',
        whoami: whoami,
    };

    obj.whoami(); // "You are " Object { name: "Normal Person" }
    ```
    > => `this` ở đây là đối tượng `obj`, do method `whoami` được `obj` gọi

- Thông qua `apply()` hoặc `call()`:
    Nhớ lại, trong JS function cũng là một object và object này có một số method mặc định. Trong đó có `apply` và `call`, mục đích của 2 method này giống nhau, chỉ khác trong cách truyền tham số:
    ```js
    function.apply(thisArg, [argsArray])
    //
    function.call(thisArg, arg1, arg2, ...)
    ```
    Và mục đích ở đây là: set giá trị của `this` bên trong function, truyền tham số (nếu có) và gọi function. Ví dụ:
    ```js
    const harry = {
        name: 'Harry Potter',
    };

    const ron = {
        name: 'Ron Weasley',
    };

    whoami.call(harry); // "You are " Object { name: "Harry Potter" }

    whoami.apply(ron); // "You are " Object { name: "Ron Weasley" }
    ```
    > => `this` ở đây là giá trị được chỉ định tường minh (explicit binding).

    Ví dụ sử dụng khi function có nhiều tham số:
    ```js
    function sendMessage(to, message) {
        console.log(`From: ${this.name}, To: ${to.name} ==> ${message}`);
    }

    const harry = {
        name: 'Harry Potter',
    };

    const ron = {
        name: 'Ron Weasley',
    };

    sendMessage.call(harry, ron, 'Buzzz!!!'); // "From: Harry Potter, To: Ron Weasley ==> Buzzz!!!"

    sendMessage.apply(harry, [ron, 'Buzzz!!!']); // "From: Harry Potter, To: Ron Weasley ==> Buzzz!!!"
    ```

    Ngoài ra khi làm việc với React, chúng ta có thể hay dùng đến method `bind()`. Mục đích của method này đó là: copy function tạo ra function mới và set giá trị của `this` bên trong function mới tạo.
    ```js
    function speak() {
        console.log(this.voice);
    }

    const cat = {
        voice: 'Meow',
    };
    const catSpeak = speak.bind(cat);
    catSpeak();

    const dog = {
        voice: 'Gogo',
    };
    const dogSpeak = speak.bind(dog);
    dogSpeak();
    ```
- Callback, event handler:
    Ở đây, chúng ta không trực tiếp gọi function mà là khai báo function và đưa cho đối tượng khác sử dụng.
    ```js
    const pikachu = {
        name: 'Pikachu',
        type: 'Electric',
        showDetail: function () {
            console.log(`This is ${this.name} from ${this.type} World`);
        }
    }

    setTimeout(pikachu.showDetail, 5000);
    ```
    Chú ý là khi viết `pikachu.showDetail` tức là chúng ta đang coi nó như là một object, chứ chưa gọi method `pikachu.showDetail()`.

    `pikachu.showDetail` ở đây được gọi là callback cho hàm `setTimeout`, tức là khi cần (ví dụ, sau khi đếm ngược hết 5 giây) thì `setTimeout` sẽ gọi hàm `pikachu.showDetail` (Hiểu từ theo cách tự nhiên: anh đưa cho em *số điện thoại này* khi nào cần em *gọi lại* (callback) cho anh nhé!!! :D).

    Thế nhưng đối tượng gọi hàm `showDetail` ở đây không phải là `pikachu` mà là function `setTimeout`. Vậy chắc bạn cũng đoán được kết quả rồi.

    Một ví dụ khác:
    ```js
    const sampleSet = {
        sets: [],
        addMany: function (values) {
            values.forEach(function (value) {
                if (this.sets.indexOf(value) === -1) {
                    this.sets.push(value);
                }
            });
        }
    }
    sampleSet.addMany([1, 2, 3]);
    sampleSet.addMany([2, 5, 4]);
    ```
    Ở đây chúng ta truyền callback cho method `forEach` là một anonymous function (hàm không tên).

    Ví dụ tương tự với event handler:
    ```html
    <button id="js-btn-show-pikachu">Show Pikachu</button>

    <script>
    const pikachu = {
        name: 'Pikachu',
        type: 'Electric',
        showDetail: function () {
            console.log(`This is ${this.name} from ${this.type} World`);
        }
    }

    document.querySelector('#js-btn-show-pikachu').addEventListener('click', pikachu.showDetail);
    // $('#js-btn-show-pikachu').on('click', pikachu.showDetail);
    </script>
    ```
    Giống như trong React chúng ta hay viết:
    ```jsx
    class PikachuButton extends React.Component {
        constructor() {
            super();

            this.name  = 'Pikachu';
            this.type  = 'Electric';
        }

        showDetail() {
            console.log('this is:', this);
        }

        render() {
            return (
                <button onClick={this.showDetail}>Click me (onegai)</button>
            );
        }
    }
    ```
    Tương tự với ví dụ `setTimeout`, khi có sự kiện `click` thì đối tượng gọi hàm `showDetail` ở đây sẽ là `button` và đến đây thì ai cũng biết kết quả là gì rồi.

    Để có kết quả như ý muốn, ta có thể sửa lại như sau:
    ```js
    const showPikachuCallback = pikachu.showDetail.bind(pikachu);
    setTimeout(showPikachuCallback, 5000);

    $('#js-btn-show-pikachu').on('click', showPikachuCallback);
    ```

    ```js
    const sampleSet = {
        sets: [],
        addMany: function (values) {
            const self = this;
            values.forEach(function (value) {
                if (self.sets.indexOf(value) === -1) {
                    self.sets.push(value);
                }
            });
        }
    }
    sampleSet.addMany([1, 2, 3]);
    sampleSet.addMany([2, 5, 4]);
    ```

    ```jsx
    class PikachuButton extends React.Component {
        constructor() {
            super();

            // ...

            this.showDetail = this.showDetail.bind(this);
        }

        // ...

        render() {
            return (
                <button onClick={this.showDetail}>Click me (onegai)</button>
            );
        }
    }
    ```
    Xem thêm ví dụ về React => https://codesandbox.io/s/hardcore-johnson-h6eki

#### `lexical this` là gì?
Khác với function thông thường, arrow function không tự bind `this` và chúng ta cũng không dùng được các method `call()`, `apply()`, `bind()` để "set this" cho function.

`this` trong arrow function được xác định dựa vào nơi mà nó được define (hoặc là global hoặc bên trong class hoặc bên trong function khác).

Thử thay function thông thường bằng arrow function trong các ví dụ trên:
```js
const whoami = () => {
    console.log('You are ', this);
}

const harry = {
    name: 'Harry Potter',
};

const ron = {
    name: 'Ron Weasley',
};

whoami.call(harry); // You are Window

whoami.apply(ron); // You are Window
```
`call()`, `apply()`, `bind()` đều không áp dụng được cho arrow function. Ở ví dụ trên, function `whoami` được define global nên `this` bên trong function này sẽ được gắn với global object (window).

Cần phải chú ý khi dùng arrow function cho callback, event handler, object method:
```js
document.querySelector('#js-btn-show').addEventListener('click', () => {
    console.log(this); // window!!!
});

const pikachu = {
    name: 'Pikachu',
    type: 'Electric',
    showDetail: () => {
        console.log(this);
    }
}
pikachu.showDetail(); // window!!!
```

Tuy vậy, arrow function là khá hữu ích khi dùng làm callback trong trường hợp này:
```js
const sampleSet = {
    sets: [],
    addMany: function (values) {
        values.forEach((value) => {
            if (this.sets.indexOf(value) === -1) {
                this.sets.push(value);
            }
        });
    }
}
sampleSet.addMany([1, 2, 3]);
sampleSet.addMany([2, 5, 4]);
```

Hoặc event handler trong React class component:
```jsx
class Button extends React.Component {
    handleClick(event) {
        console.log(event, this);
        // this.setState()...
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(event)}>Click me (onegai)</button>
        );
    }
}
```
Vì arrow function được khai báo bên trong class, `this` tham chiếu đến chính đối tượng của class này, chứ không tự động bind theo ngữ cảnh lúc gọi nữa.

Hoặc sử dụng proposal class fields (đã được [include](https://facebook.github.io/create-react-app/docs/supported-browsers-features) trong Create React App):
```jsx
class Button extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}
```

## [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
```js
function button(name, type = 'default') {
    return `Render button with name ${name} and type ${type}`;
}

button('Add');
button('Edit', 'warning');
```
Nếu viết theo cách cũ:
```js
function button(name, type) {
    if (type === undefined) {
        type = 'default';
    }

    return `Render button with name ${name} and type ${type}`;
}
```

## [Rest Parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
Trong variadic function (function có số lượng parameters không cố định) thì tập hợp các tham số còn lại của function có thể được nhóm vào một mảng duy nhất gọi là `rest parameter`:
```js
function variadicFunction(first, second, ...rest) {
    console.log(first, second, rest);
}

variadicFunction(); // undefined, undefined, []
variadicFunction(1, 2); // 1, 2, []
variadicFunction(1, 2, 3, 4); // 1, 2, [3, 4]
```

## [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
Spread operator `...` dùng để extract các phần tử của array (hoặc string) thành các tham số khi gọi function hoặc khi thêm vào array khác.

### Function call
```js
function sum(x, y, z) {
    return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// Old ways:
console.log(sum(numbers[0], numbers[1], numbers[2]));
console.log(sum.apply(null, numbers));
```

### Array
- Tạo array mới chứa array cũ
    ```js
    const parts = ['shoulders', 'knees'];
    const lyrics = ['head', ...parts, 'and', 'toes'];
    // ["head", "shoulders", "knees", "and", "toes"]
    ```
    Khi chưa có spread:
    ```js
    const parts = ['shoulders', 'knees'];
    let lyrics = ['head'];
        lyrics = lyrics.concat(parts).concat(['and', 'toes']);
    ```
- Copy array
    ```js
    const arr = [1, 2, 3];
    const copiedArr = [...arr]; // like arr.slice()
    copiedArr.push(4);

    // copiedArr == [1, 2, 3, 4]
    // arr == [1, 2, 3]
    ```
- Concat array
    ```js
    const arr1 = [0, 1, 2];
    const arr2 = [3, 4, 5];
    const newArr = [...arr1, ...arr2]; // newArr == [0, 1, 2, 3, 4, 5]
    // newArr = arr1.concat(arr2);
    ```
- Unshift array
    ```js
    const arr1 = [0, 1, 2];
    const arr2 = [3, 4, 5];
    const newArr = [...arr2, ...arr1]; // newArr == [3, 4, 5, 0, 1, 2]
    // Array.prototype.unshift.apply(arr1, arr2) // arr1 modified
    ```

## [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
Extract values của các phần tử trong mảng, property của object thành các biến.

### Array destructuring
```js
const foo = [1, 2, 3];

const [one, two, three] = foo;
console.log(one); // 1
console.log(two); // 2
console.log(three); // 3
```
Gán giá trị mặc cho biến nếu vượt quá độ dài của array:
```js
const foo = [1, 2];

const [one, two, three = "default"] = foo;
```
Swap giá trị của 2 biến:
```js
let a = 1;
let b = 2;

[a, b] = [b, a];
```
Bỏ qua phần tử nào đó trong array:
```js
const arr = [1, 2, 3];

const [one, , three] = arr;
```
Rest elements:
```js
const arr = [1, 2, 3, 4];

const [one, two, ...rest] = arr;
// 1, 2, [3, 4]
```

### Object destructuring
```js
const o = {p: 42, q: true};
const {p, q} = o;
```
Thay đổi tên biến:
```js
const {p: foo, q: bar} = o;
```
Giá trị mặc định:
```js
const {p, q, r = 'default'} = o;
```
Kết hợp việc thay đổi tên biến và giá trị mặc định:
```js
const {p: foo, q: bar = 'default bar', r: baz = 'default baz'} = o;
```
Function parameter destructuring:
```js
function button({name, type = 'default'}) {
    console.log(name, type);
}

button({name: 'Edit'});
```

## Modules
Trong ES6, bạn có thể [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) và [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) các chức năng từ các module giữa các file. Những chức năng này có thể là function, class, constant,... về cơ bản là mọi thứ bạn có thể gán vào một biến.

Những  module có thể là những file riêng biệt hoặc toàn bộ folder với một file index như là một `entry point`.

Các câu lệnh `import` và `export` giúp bạn thực hiện code splitting, bạn viết code ra nhiều file, giúp cho việc sử dụng lại và maintain, thiết kế các module chức năng. Hơn nữa, nó giúp bạn suy nghĩ về tính đóng gói. Không phải mọi chức năng trong module cần export ra bên ngoài mà chỉ được dùng trong cùng file. Những chức năng được export giống như là public API của module, chỉ những chức năng được export có thể được sử dụng lại bên ngoài.

Có hai cách `export`:
- Export theo tên: **named export**
- Export `default`

### Named export
VD: Export biến từ `file1.js` the kiểu **named export**:
```js
const firstname = 'robin';
const lastname = 'wieruch';
export { firstname, lastname };
```
Hoặc export từng biến:
```js
export const firstname = 'robin';
export const lastname = 'wieruch';
```
Và sau đó import vào `file2.js`:
```js
import { firstname, lastname } from './file1.js';
console.log(firstname);
// output: robin
```

Bạn cũng có thể import tất cả biến được export từ file khác như là một object.

`file2.js`:
```js
import * as person from './file1.js';
console.log(person.firstname);
// output: robin
```

Import có thể có một alias, bạn có thể sử dụng nó trong trường hợp import 2 chức năng từ 2 module có cùng tên :
`file2.js`:
```js
import { firstname as foo } from './file1.js';
console.log(foo);
// output: robin
```

### Export default
Với `default` export, bạn có thể sử dụng trong các trường hợp:
- Export duy nhất một chức năng
- Để làm nổi bật chức năng chính của module

Ví dụ
`file1.js`:
```js
const robin = {
    firstname: 'robin',
    lastname: 'wieruch',
};

export default robin;
```

Khi import, bạn có thể bỏ qua dấu ngoặc cho việc import `default` export.

`file2.js`:
```js
import developer from './file1.js';
console.log(developer);
// output: { firstname: 'robin', lastname: 'wieruch' }
```
Hơn nữa, tên import có thể khác với export default name.

Bạn cũng có thể kết hợp cả hai kiểu export:

`file1.js`:
```js
const firstname = 'robin';
const lastname = 'wieruch';
const person = {
    firstname,
    lastname,
};

export {
    firstname,
    lastname,
};

export default person;
```

`file2.js`:
```js
import developer, { firstname, lastname } from './file1.js';
console.log(developer);
// output: { firstname: 'robin', lastname: 'wieruch' }
console.log(firstname, lastname);
// output: robin wieruch
```

## [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
### Kiểu dữ liệu `Map`
Tương tự như object dạng key-value, nhưng có những điểm khác biệt:
- Key của object chỉ có thể là string, number hoặc [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), trong khi đó key của map có thể là bất cứ giá trị nào bao gồm cả function, object.
    ```js
    const myMap = new Map();

    const keyString = 'a string';
    const keyObj = {};
    const keyFunc = function() {};

    // setting the values
    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, 'value associated with keyObj');
    myMap.set(keyFunc, 'value associated with keyFunc');

    myMap.size; // 3
    ```
- Thứ tự insert của key trong Map được giữ nguyên khi lặp
- Map có method `size()` để biết số lượng phần tử trong Map
- Map là một iterable object nên có thể sử dụng trong `for..of`, `forEach`
    ```js
    const myMap = new Map();
    myMap.set(0, 'zero');
    myMap.set(1, 'one');
    for (const [key, value] of myMap) {
        console.log(key + ' = ' + value);
    }
    // 0 = zero
    // 1 = one

    myMap.forEach(function(value, key) {
        console.log(key + ' = ' + value);
    });
    ```
- Object có prototype nên nó sẽ có một số key mặc định
- Map phù hợp hơn trong các kịch bản thêm, xóa key-value thường xuyên
### Kiểu dữ liệu `Set`
Là một tập hợp, gồm các phần tử có unique value.
```js
var mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
```

## [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
Thêm 1 cú pháp để lặp các `iterable objects`: String, Array, Map, Set...
```js
let iterable = [10, 20, 30];

for (let value of iterable) {
  value += 1;
  console.log(value);
}

for (const value of iterable) {
  console.log(value);
}
```

## [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- Là những function có thể tạm dừng và tiếp tục ở một thời điểm khác sau khi gọi
    ```js
    function* generator(i) {
        yield i;
        i = i + 5;
        yield;
        yield i + 10;
        return 100;
    }

    var gen = generator(10);
    console.log(gen.next()); // { value: 10, done: false }
    console.log(gen); // Generator object
    console.log(gen.next().value); // undefined
    console.log(gen.next().value); // 25
    console.log(gen.next().value); // 100
    ```
- Sử dụng từ khóa `function*` để khai báo một generator function
- Sử dụng `yield` để tạm dừng function và trả về giá trị cho method `next()`
- Giá trị trả về khi gọi một generator function đó là một `Generator Object`
    + `Generator Object` có thể dùng trong vòng lặp `for..of`
        ```js
        function* foo() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
            return 6; // Not include in for..of
        }

        for (const v of foo()) {
            console.log(v);
        }
        // 1 2 3 4 5
        ```
        > Chú ý là `for..of` ignore giá trị `return 6`

    + Hoặc gọi nhiều lần method `next()` resume function, chạy đến từng điểm đã `yield` trong function cho đến khi gặp return hoặc `yield` cuối cùng
    + Method `next()` trả về object có dạng `{value: value, done: true/false}`, `value` là do yield hoặc `return` trả về và `done` để xác định generator đã kết thúc chưa

## [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Hỗ trợ lập trình bất đồng bộ (asynchronous)
- Promise là một object đại diện cho kết quả hoặc lỗi của một hoạt động bất đồng bộ
- Thay vì truyền callback vào function, Promise object cho phép chúng ta attach callback và chaining:
    Ví dụ truyền callback:
    ```js
    function successCallback(result) {
        console.log("Data loaded: ", + result);
    }

    function failureCallback(error) {
        console.log("Error loading data: " + error);
    }

    loadData(options, successCallback, failureCallback);
    ```
    Sử dụng promise:
    ```js
    loadData(options).then(successCallback, failureCallback);

    // const promise = loadData(options);
    // promise.then(successCallback, failureCallback);
    ```
- Then chaining
    Method `then()` trả về một promise mới, vì thế có thể chaining `then()` nhiều lần.
    ```js
    doSomething()
        .then(function(result) {
            return doSomethingElse(result);
        })
        .then(function(newResult) {
            return doThirdThing(newResult);
        })
        .then(function(finalResult) {
            console.log('Got the final result: ' + finalResult);
        })
        .catch(failureCallback);
    ```
    > Cần chú ý return value ở `then()` thì `then()` sau mới có result
    > Promise chaining dừng nếu có exception, khi đó các `then()` ở sau bị bỏ qua và chỉ có `catch` handlers được gọi

    Nếu truyền callback cũ thì có dẫn đến callback hell như thế này:
    ```js
    doSomething(function(result) {
        doSomethingElse(result, function(newResult) {
            doThirdThing(newResult, function(finalResult) {
                console.log('Got the final result: ' + finalResult);
            }, failureCallback);
        }, failureCallback);
    }, failureCallback);
    ```
    Ví dụ với fetch:
    ```js
    fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data))
    ```
    => `then()` thứ nhất json decode response string, `then()` thứ hai lấy data từ promise của `then()` thứ nhất.

- Chạy song song nhiều async function
    ```js
    Promise.all([func1(), func2(), func3()])
        .then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });

    const wait = second => new Promise(resolve => setTimeout(() => resolve(second), 1000 * second));
    const multipleWaits = seconds => {
        let promises = seconds.map(second => wait(second));

        return Promise.all(promises);
    }

    multipleWaits([1, 2, 3]).then(results => console.log(results)); // done in 3 seconds
    ```
- Sai lầm thường gặp
    + Không return value
    ```js
    doSomething()
        .then(function(result) {
            doSomethingElse(result); // No return
        })
        .then((newResult) => console.log(newResult)); // undefined
    ```
    + Nesting promise. Vì `then()` return promise, không cần phải chaing bên trong callback
    ```js
    // Bad
    doSomethingCritical()
        .then(result => doSomethingOptional()
            .then(optionalResult => doSomethingExtraNice(optionalResult))
            .catch(e => {})); // No need nesting
        .then(() => moreCriticalStuff())
        .catch(e => console.log("Critical failure: " + e.message));

    // Better
    doSomethingCritical()
        .then(result => doSomethingOptional())
        .then(optionalResult => doSomethingExtraNice(optionalResult))
        .then(() => moreCriticalStuff())
        .catch(e => console.log("Critical failure: " + e.message));
    ```
    + Không `catch` error có thể dẫn đến lỗi "Uncaught promise rejections" (có thể làm crash Nodejs app)

# ES 2016
## [Exponent (**) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation_(**))
Có thể dùng thay thế cho `Math.pow`:
```js
Math.pow(2, 3) == 2 ** 3;
```

## Array method [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
Check phần tử có thuộc array:
```js
const numbers = [1, 2, 3];
console.log(numbers.includes(2)); // true

const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat')); // true
console.log(pets.includes('at')); // false
```

# ES 2017
## [Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values), [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
`Object.values` trả về mảng giá trị của từng key trong object:
```js
const object1 = {
    a: 'somestring',
    b: 42,
    c: false
};

console.log(Object.values(object1));
// expected output: Array ["somestring", 42, false]
```

`Object.entries` trả về mảng cặp giá trị [key, value] của object:
```js
const object1 = {
    a: 'somestring',
    b: 42
};

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
// expected output:
// "a: somestring"
// "b: 42"
```

## [Async / Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- Sử dụng Promise như cách lập trình đồng bộ thông thường (synchronous)
- await chỉ có thể được dùng trong async function để tạm dừng async function *chờ* kết quả từ một Promise
    ```js
    function resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }

    function promiseCall() {
        console.log('calling');
        return resolveAfter2Seconds()
            .then(result => console.log(result));
            // expected output: 'resolved'
    }
    promiseCall();

    async function asyncCall() {
        console.log('calling');
        const result = await resolveAfter2Seconds();
        console.log(result);
        // expected output: 'resolved'
    }
    asyncCall();
    ```
- Giá trị trả về function async function luôn là một Promise, vì được ngầm định wrapped trong `Promise.resolve()`
- Await trong loop
    ```js
    function wait(second) {
        return new Promise(resolve => {
            setTimeout(() => resolve('Resolved ' + second), 1000 * second);
        });
    }

    function returnPromises(seconds) {
        // async function always returns promise
        // so this will return array of promises
        return seconds.map(async second => await wait(second));
    }

    function returnOnePromise(seconds) {
        const promises = seconds.map(async second => await wait(second));

        // Use Promise.all to return only one promise
        return Promise.all(promises);
    }

    async function test() {
        const seconds = [1, 2, 3];
        const promises = await returnPromises(seconds);
        console.log(promises); // Run immediately because we just return array of promises as result of `map()` function

        const values = await returnOnePromise(seconds);
        console.log(values); // After 3 seconds
    }

    async function testConcurrent() {
        const start = performance.now();
        const values1 = returnOnePromise([1, 2]);
        const values2 = returnOnePromise([1, 2, 3]);

        console.log(await values1); // 2 seconds from start
        console.log(performance.now() - start);
        console.log(await values2); // + 1 seconds = 3 seconds from start
        console.log(performance.now() - start);
    }
    ```

# ES 2018
## [Object rest/spread operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals)
- Support rest/spread operator cho object:
- Rest properties:
    ```js
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x; // 1
    y; // 2
    z; // { a: 3, b: 4 }
    ```
- Spread properties:
    ```js
    let n = { x, y, ...z };
    n; // { x: 1, y: 2, a: 3, b: 4 }
    ```
    Clone, merge object:
    ```js
    const obj1 = { foo: 'bar', x: 42 };
    const obj2 = { foo: 'baz', y: 13 };

    const clonedObj1 = { ...obj1 };
    clonedObj1.foo = 'changed';
    // clonedObj1 { foo: "changed", x: 42 }
    // obj1 { foo: "bar", x: 42 }

    const mergedObj = { ...obj1, ...obj2 };
    // Object { foo: "baz", x: 42, y: 13 }
    ```

## [Promise `finally`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
- Define callback được thực thi trong cả 2 trường hợp Promise chạy thành công hoặc có lỗi
- Tránh lặp code trong `then()` và `catch()`, chẳng hạn set trạng thái loading khi gọi ajax:
    ```js
    let isLoading = true;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(() => isLoading = false);
    ```

# Reference
- http://es6-features.org/
- https://github.com/lukehoban/es6features/
- https://kangax.github.io/compat-table/es6/
- https://medium.com/craft-academy/everything-i-learned-from-es6-for-everyone-ff93ebc64b86
- https://developer.mozilla.org/en-US/docs/Web/JavaScript