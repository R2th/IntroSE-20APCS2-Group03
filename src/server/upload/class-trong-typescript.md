Xin chào các bạn, vậy là lại đến hạn Monthly Report nữa rồi, và bài viết của mình tháng này sẽ tiếp tục đi tìm hiểu về TypeScript (TS).

Trong bài trước chúng ta đã tìm hiểu về cú pháp TS kết hợp với Vue 3, nếu bạn nào chưa đọc có thể tham khảo [tại đây](https://viblo.asia/p/lam-quen-cu-phap-ts-thong-qua-vi-du-todoapp-ket-hop-vue-3-oOVlYPLVZ8W) nhé. 

Ở bài trước chúng ta đã đề cập qua về cách khai báo Class trong TS. Và bài này chúng ta cùng tìm hiểu sâu hơn về nó nhé.

![](https://images.viblo.asia/ce1be88f-6962-4110-883e-f4cc31b941f8.jpg)

## Class trong JavaScript
Trước khi tìm hiểu Class trong TS, chúng ta sẽ cùng xem xét qua cách khai báo class trong JS.

Trong JS ta có 2 cách để khai báo 1 lớp:

#### Sử dụng Functions ([Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function), [function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))

Mình sẽ sử dụng Function declaration.
```
/*Init class*/
function Animal(name) {
    this.name = name;
}

/*Add method*/
Animal.prototype.getName = function () {
    console.log(`${this.name}`);
}

/*Init instance*/
const dog = new Animal('Milu');
```

Đôi khi chúng ta cũng có thể gặp cách khai báo sau:
```
/*Init class*/
function Animal(name) {
    this.name = name;

    /*Add method*/
    this.getName = function () {
        console.log(`${this.name}`);
    }
}

/*Init instance*/
const dog = new Animal('Milu');
```

Trên đây đều là cách khai báo 1 class. Vậy thì 2 cách làm này có gì giống và khác nhau, cách làm nào là tiện và chuẩn nhất? Cái này các bạn có thể tìm hiểu nhé, mình xin phép sẽ không đi sâu vào vấn đề này.

#### Sử dụng Class trong ES6 ([class expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class), [class declarations.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class))

Để khai báo một class, chúng ta sẽ sử dụng `từ khóa class + với tên lớp.`

```
/*Init class*/
class Animal {
    constructor(name) {
        this.name = name;
    }

    /*Add method*/
    getName () {
        console.log(`${this.name}`);
    }
}

/*Init instance*/
const dog = new Animal('Milu');
```

> Trên đây, chúng ta đã đi qua cách cơ bản khai báo class trong JS. Bạn thích sử dụng cách nào hơn? Với bản thân mình, mình thấy cách sử dụng Class trong ES6 tiện lợi hơn rất nhiều khi lập trình hướng đối tượng. Nếu bạn sử dụng cú pháp cũ (Sử dụng Functions), cần phải nắm rõ nguyên tắc kế thừa bằng prototype và cách sử dụng this.

## Class trong TypeScript
Nếu bạn nào đã có kinh nghiệm làm việc với JS sẽ nhận ra một điều là JavaScript có cấu trúc khá lỏng lẻo, điều này đã gây ra khó khăn cho nhưng lập trình viên đã quen với những ngôn ngữ hướng đối tượng có cấu trúc và những quy định chặt chẽ hơn.

Bắt đầu với ECMAScript 2015 (còn được gọi là ECMAScript 6) các lập trình viên JavaScript sẽ có thể xây dựng các ứng dụng của họ bằng cách sử dụng phương pháp tiếp cận dựa trên hướng đối tượng này.

Và TypeScript ra đời, nhằm giúp các lập trình viên sử dụng theo hướng đối tượng. Sau đây là cách khai báo 1 class trong TS.

```
/*Init class*/
class Animal {
    private name: string

    constructor(name: string) {
        this.name = name;
    }

    /*Add method*/
    getName(): string {
        return this.name;
    }
}

/*Init instance*/
const dog = new Animal('Milu');
```

### Getters / Setters
Một lớp cũng có thể có `accessors`:
```
/*Init class*/
class Animal {
    private name: string

    constructor(name: string) {
        this.name = name;
    }
    
    /*Setter*/
    setName(name: string) {
        this.name = name;
    }

    /*Getter*/
    getName(): string {
        return this.name;
    }
}

/*Init instance*/
const dog = new Animal('Milu');
dog.setName('Mickey');

//Output: Mickey
```

### Public, private, protected , readonly
Cũng giống như ngôn ngữ khác như C++ , Java... chúng ta cũng có các access modifiers là public, private, protected. Cái này chắc không cần phải nói quá kỹ đâu các bạn nhỉ? Mình sẽ chỉ đưa ra ví dụ thôi nhé.
#### public
```
/*Init class*/
class Animal {
    /*Public member*/
    public name: string

    constructor(name: string) {
        this.name = name;
    }
}

/*Init instance*/
const dog = new Animal('Milu');
/*Access public member*/
dog.name;
```

#### private
```
/*Init class*/
class Animal {
    /*Private member*/
    private name: string

    constructor(name: string) {
        this.name = name;
    }
}

/*Init instance*/
const dog = new Animal('Milu');
/*Access public member*/
dog.name; //TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

#### protected
```
/*Init class*/
class Animal {
    /*Protected member*/
    protected name: string

    constructor(name: string) {
        this.name = name;
    }
}

/*Init instance*/
const dog = new Animal('Milu');
/*Access protected member*/
dog.name; //TS2445: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

#### readonly
Nếu chúng ta muốn field nào đó chỉ được phép đọc, có thể sử dụng `readonly` modifier.
```
readonly name: string
...
/*TS2540: Cannot assign to 'name' because it is a read-only property.*/
setType(name: string) {
        this.name = name;
}
```

Có thể dùng kết hợp với Access Midifier (public, protected, private)

### Static Members
Trong Class có 1 thành viên nữa được gọi là Static. Chúng ta có thể truy cập trực tiếp thành viên này thông qua Class, chứ không cần phải khởi tạo instance.

```
/*Init class*/
class Animal {
    static type: string = 'Default'
}

/*Access static member*/
Animal.type;
```

Thành viên static có thể sử dụng kết hợp với Access Modifier (public, protected, private).

> Có một số static member được xây dựng sẵn, vì vậy khi khai báo static member mà bị trùng thì chúng ta sẽ được thông báo lỗi. Một số static members built-in: `name, length, call...`

### Class Expressions
TS hỗ trợ một cách khai báo class nữa, đó là `Class Expressions`.

```
/*Class Expressions*/
const animal = class {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Mình thì mình thích cách khai báo phía trên (sử dụng từ khóa Class) hơn cách này, vì nhìn nó dễ hiểu, rõ ràng. Các bạn thích cách nào thì đều có thể sử dụng nhé.

## Tổng kết

Trên đây, chúng ta đã tìm hiểu về Class trong TypeScript, so sánh nó với JavaScript. Nếu sử dụng JS mà không có sự hỗ trợ của ES6 thì việc lập trình theo hướng đối tượng khá là loằng ngoằng và code khó nhìn, dễ nhầm lẫn (class với function).

TS là một giải pháp tuyệt vời giúp các lập trình viên dễ dàng xây dựng cấu trúc code theo mô hình hướng đối tượng.

Bài viết này mình xin phép dừng ở đây. Hẹn các bạn trong những số sau nhé. Cảm ơn các bạn đã đọc.

Nguồn tham khảo:
https://www.typescriptlang.org/docs/handbook/2/classes.html
https://comdy.vn/typescript/class-trong-typescript/