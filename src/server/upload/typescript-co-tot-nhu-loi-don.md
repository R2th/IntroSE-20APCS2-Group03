**TypeScript** là một ngôn ngữ lập trình mã nguồn mở, được công bố lần đầu tiên vào tháng 10 năm 2012 (ở phiên bản 0.8), sau hai năm phát triển nội bộ tại Microsoft. Và trong những năm gần đây, Typescript đã trở thành một trào lưu trong giới phát triển web. Vậy điều gì đã đưa Typescript trở nên phổ biến như vậy, và liệu nó có thực sự tốt như lời đồn??? Cùng mình tìm hiểu nhé ;)

![](https://images.viblo.asia/8ce7f00d-32b7-444b-83e7-478aff0e5dbb.png)


### 1. TypeScript là gì?
TypeScript là một ngôn ngữ mã nguồn mở được xây dựng dựa trên JavaScript bởi Microsoft.

![](https://images.viblo.asia/c76740da-06f1-4995-bbf0-8d6e0fcd50f0.png)

Typescript được xây dựng trên chuẩn ES6, và được biên dịch thành mã Javascript để có thể chạy trên mọi browser.

Ví dụ đoạn code typescript sau
```js:Typescript
class Customer {
    Name : string;
    constructor (firstName: string, lastName: string)
    {
            this.Name = firstName + "  " + lastName;
    }
    GetName()
    {
            return "Hello, " + this.Name;
    }
}
```
sẽ được biên dịch sang mã javascript như vậy
```js:Javascript
var Customer = (function () {
    function Customer(firstName, lastName) {
        this.Name = firstName + "  " + lastName;
    }
    Customer.prototype.GetName = function () {
        return "Hello, " + this.Name;
    };
    return Customer;
}());
```

<br>

Có thể nói, Typescript là một phiên bản nâng cấp của Javascript vì nó là siêu tập hợp cú pháp nghiêm ngặt (typed superset) mã Javascript, bổ sung những tùy chọn kiểu tĩnh (static typing) và các lớp hướng đối tượng.

### 2. Các tính năng của TypeScript

- **TypeScript chính là JavaScript**. TypeScript được xây dựng từ mã JavaScript và được dịch thành mã JavaScript. Do vậy, bạn chỉ cần biết JavaScript thì sẽ có thể sử dụng TypeScript. Tất cả mã TypeScript sẽ được biên dịch thành JavaScript tương ứng với mục đích thực thi.

- **TypeScript hỗ trợ các thư viện JS**: TypeScript được biên dịch có thể được sử dụng bất kỳ đoạn mã JavaScript nào vì vậy TypeScript có thể sử dụng lại tất cả các framewords, tools và thư viện hiện có của JavaScript.

- **JavaScript là TypeScript**: Điều này có nghĩa là bất kỳ tệp `.js` hợp lệ nào cũng có thể được đổi tên thành `.ts` và được biên dịch như các tệp TypeScript khác.

- **TypeScript là linh động**: TypeScript có thể linh động trên các trình duyệt, thiết bị và các hệ điều hành. Nó có thể chạy trên bất kỳ môi trường nào mà JavaScript có thể chạy trên đó. Không giống như các đối tác của nó, TypeScript không cần một máy ảo chuyên dụng hoặc một môi trường cụ thể để thực thi.


### 3. Nghịch ngợm với Typescript

#### 3.1 Kiểu dữ liệu và khai báo biến
Typescript hỗ trợ toàn bộ các kiểu dữ liệu của ES6, bao gồm các kiểu dữ liệu nguyên thủy (string, number và boolean), array, enum,... cùng kiểu dữ liệu do người dùng tự định nghĩa.

**Cú pháp khai báo biến**
```
<hoisting> <identifier> [: <type>] [= <value>];
```

Trong Typescript, khi bạn khai báo một biến với hoisting (const, var hoặc let), bạn có thể thêm chú thích kiểu để chỉ định cụ thể kiểu của biến.

Nếu bạn khai báo như vậy, Typescript sẽ tự nhận định type của biến `myName`
```js
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```
hoặc bạn có thể khai báo chặt chẽ hơn như vậy
```js
let myName: string = "Alice";
```

Một số ví dụ về khai báo biến cho các kiểu dữ liệu khác
```js
// Khai báo biến boolean
var x : boolean = true;
// Khai báo mảng chuỗi
var strs : string[] = ['string_1', 'string_2'];
// Khai báo mảng số
var numbers : number[] = [1, 2, 3];
// Khai báo kiểu mảng any
var anyArray = any[] = ['string_1', 1, 2]
// Khai báo kiểu Tuple (biến có thể có nhiều hơn 1 kiểu dữ liệu)
var tupleVar = number | tring;
```
<br>

Cón đây là ví dụ về việc định nghĩa 1 object
```js
type Point = {
  x: number;
  y?: number;
};

```
Tùy chọn `?` sẽ chỉ định thuộc tính của object là bắt buộc hoặc không
Với Typescript, chúng ta còn có một cách khác để khai báo object là `interface`
```js
interface Point {
  x: number;
  y: number;
}
```
Về cơ bản thì `type` và `interface` đều khá giống nhau về việc khai báo và khả năng mở rộng. Nhưng `interface` thì linh động hơn `type` vì nó có thể định nghĩa lại.

JavaScript có hai kiểu giá trị nguyên thủy được sử dụng cho các giá trị vắng mặt hoặc chưa được khởi tạo là *null* và *undefined*. Nhưng khác với Javascript, Typescript cho phép bạn tùy chỉnh việc kiểm tra các giá trị này bằng `strictNullChecks`.

Nếu `strictNullChecks` tắt, các giá trị null hoặc undefined vẫn có thể được truy cập bình thường và có thể được gán thuộc tính. Ngược lại, với strictNullChecks bật , khi một giá trị là null hoặc undefined, bạn sẽ cần phải kiểm tra các giá trị đó trước khi sử dụng.

<br>

#### 3.2 Khai báo function
Tương tự khi khai báo biến, bạn cũng có thể chỉ định kiểu cho tham số như ví dụ sau
```js
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```
hoặc như vậy cho tham số có chấp nhận nhiều hơn 1 kiểu dữ liệu
```js
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
```

Tham số đặc biệt `...` -  rest parameter, cho phép bạn khai báo các tham số có thể có của function
```js
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

<br>

Bạn còn có thể định nghĩa kiểu trả về của dữ liệu cho mỗi function
```js
function getFavoriteNumber(): number {
  return 26;
}
```
Nếu bạn không định nghĩa, kiểu trả về sẽ mặc định là `any`.

Một số ví dụ về khai báo function
```js
// Khai báo 1 hàm f() có thể nhận vào 1 param kiểu number (hoặc không) và không có dữ liệu trả về
function f(x?: number): void;
// Khai báo 1 hàm trả về giá trị không xác định với unknow
function safeParse(s: string): unknown {
  return JSON.parse(s);
}
// Khai báo một hàm không bao giờ trả về giá trị với never 
function fail(msg: string): never {
  throw new Error(msg);
}
```

<br>

#### 3.3 Khai báo class và hướng đối tượng trong Typescript
```js
class Point {
  x: number;
  y: number;
  
  sum (): number {
      return this.x + this.y;
  }
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
console.log(pt.sum());
```
Đây là một ví dụ về khai báo class cho Typescript. Nhưng khác với Javascript, trong Typescript, bạn có thể đảm bảo việc các trường lớp có cần định nghĩa hàm khởi tạo trong class hay không bằng cách thiết lập `strictPropertyInitialization`.

Nếu bạn bật `strictPropertyInitialization`, khai báo này sẽ bị cảnh báo
```js
class BadGreeter {
  name: string;
// Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```
vì khai báo chính xác sẽ phải như vậy
```js
class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}
```

Một khái niệm mới của Typescript nữa mà mình cần chú ý đó là Generic Class
```js
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b = new Box("hello!");
//    ^ = const b: Box<string>
```
Nó cho phép bạn tùy chỉnh kiểu dữ liệu khi sử dụng. Thay vì khai báo cụ thể ngay khi khai báo class, bạn sẽ khai báo kiểu khi sử dụng class.
Điều này sẽ giúp bạn tối ưu code, thay vì phải viết nhiều class cho nhiều kiểu khác nhau thì bạn chỉ cần viết 1 class, và khai báo khi sử dụng class đó.

Về tính hướng đối tượng
- **Tính trừu tượng**
    Typescript cho phép bạn khai báo các abstract class và abstract thành phần bằng từ khóa `abstract`
    
    ```js
    abstract class Base {
      abstract getName(): string;

      printName() {
        console.log("Hello, " + this.getName());
      }
    }

    const b = new Base();
    // Cannot create an instance of an abstract class.

    class Derived extends Base {
      getName() {
        return "world";
      }
    }

    const d = new Derived();
    d.printName();
    ```

- **Tính kế thừa**

    Bạn có thể tạo ra 1 class con, kế thừa từ 1 class cha bằng cách sử dụng `extends`
    ```js
    class Derived extends Base {
      constructor() {
        super();
      }
    }
    ```
    Function super() sẽ cho phép bạn gọi đến hàm khởi tạo cha cho class con. Nhưng khác với javascript, Typescript chỉ cảnh báo việc gọi hàm super() khi cần thiết.
    
- **Tính bao đóng**

     Visibility đảm bảo việc cho phép hoặc không cho phép việc kế thừa của class con với class cha.
 
     Các visibility được hỗ trợ bao gồm: public, private, protected
     
     ```js:public
      class Greeter {
          public greet() {
            console.log("hi!");
          }
        }
        const g = new Greeter();
        g.greet();
     ```
 
     ```js:protected
     class Greeter {
          public greet() {
            console.log("Hello, " + this.getName());
          }
          protected getName() {
            return "hi";
          }
        }

        class SpecialGreeter extends Greeter {
          public howdy() {
            // OK to access protected member here
            console.log("Howdy, " + this.getName());
          }
        }
        const g = new SpecialGreeter();
        g.greet(); // OK
        g.getName();
        Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.
     ```
    
    ```js:private
    class Base {
          private x = 0;
        }
        const b = new Base();
        // Can't access from outside the class
        console.log(b.x);
        Property 'x' is private and only accessible within class 'Base'.
    ```
   <br>
- **Tính đa hình**
    
    Đây là một ví dụ cho tính đa hình của Typescript
    ```js
    class Person {
      name: string;
      age: number;
    }

    class Employee {
      name: string;
      age: number;
      salary: number;
    }

    // OK
    const p: Person = new Employee();
    ```
    
    Bạn cũng có thể overload các function
    ```js
    class Point {
      // Overloads
      constructor(x: number, y: string);
      constructor(s: string);
      constructor(xs: any, y?: any) {
        // TBD
      }
    }
    ```

    cũng như overriding
    ```js
    class Base {
      greet() {
        console.log("Hello, world!");
      }
    }

    class Derived extends Base {
      greet(name?: string) {
        if (name === undefined) {
          super.greet();
        } else {
          console.log(`Hello, ${name.toUpperCase()}`);
        }
      }
    }

    const d = new Derived();
    d.greet();
    d.greet("reader");
    ```
    
-  **accessors (getter và setter)**
    ```js
    class C {
      _length = 0;
      get length() {
        return this._length;
      }
      set length(value) {
        this._length = value;
      }
    }
    ```
    >>> Lưu ý: TypeScript có một số quy tắc đặc biệt cho accessors:
    >>> - Nếu không settẻ không tồn tại, thuộc tính sẽ tự động được hiểu là một thuộc tính readonly
    >>> - Kiểu tham số của setter sẽ được suy ra từ kiểu trả về của getter
    >>> - Nếu tham số setter có chú thích kiểu, nó phải khớp với kiểu trả về của getter
    >>> - Getter và setter phải có cùng [Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)


### 4. Đánh giá ưu điểm và nhược điểm
**Ưu điểm**
- Là ngôn ngữ mã nguồn mở 
- Mã dễ hiểu và dễ tiếp cận, nhất là khi bạn đã học Javascript
- Có đầy đủ tính năng của ES6
- Chặt chẽ và dễ dàng tối ưu code hơn Javascript
- Hỗ trợ lập trình hướng đối tượng

**Nhược điểm**
- Cần biên dịch sang mã Javascript
- Khó khăn trong việc thiết lập: cần đảm bảo rằng máy chủ Node.js, trình thử nghiệm và webpack đều có thể hoạt động với TypeScript

### 5. Kết luận
Với từng này tư liệu thì mình chưa thể đưa ra kết luận rằng về tính hữu dụng và cần thiết như lời đồn của trending Typescript này. Nhưng phải công nhận so với việc dùng Javascript thuần thì Typescript chặt chẽ hơn nhiều. Tuy nhiên, so với việc sử dụng các framework như vue, react,... thì tính chặt chẽ và thư viện hỗ trợ của chúng cũng không thua kém, chung quy thì phải làm dự án thật mới có thể đưa ra nhận xét chính xác.

>>> Vì vậy, xin lỗi bạn, Tiêu đề chỉ mang tính chất câu view =))

Hi vọng bài viết sẽ cung cấp cho bạn một số thông tin cơ bản về Typescript. Cảm ơn vì đã đọc bài viết của mình và hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo

[Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

[Typescript Tutorial](https://www.tutorialspoint.com/typescript/typescript_overview.htm)