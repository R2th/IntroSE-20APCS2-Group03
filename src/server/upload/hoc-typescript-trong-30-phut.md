## Học TypeScript trong 30 phút
Hôm nay, chúng ta sẽ học TypeScript, một ngôn ngữ được biên dịch thành JavaScript, được thiết kế để xây dựng các ứng dụng lớn và phức tạp. Nó kế thừa nhiều khái niệm từ các ngôn ngữ như C# và Java, những ngôn ngữ nghiêm ngặt và có trật tự trái ngược với sự thoải mái và free-typed của JavaScriptt.

Bài viết này, hướng đến những người đã khá thành thạo JavaScript nhưng vẫn còn là beginner khi đến với TypeScript. Chúng tôi sẽ đề cập hầu hết các tính năng chính và cơ bản bao gồm nhiều ví dụ với chú thích để giúp bạn thấy cách ngôn ngữ này hoạt động. Hãy bắt đầu!
### Lợi thế của việc sử dụng TypeScript
JavaScript đã đủ tốt và bạn có thể tự hỏi: Liệu tôi có thực sự cần học TypeScript? Về mặt kỹ thuật, bạn không cần học TypeScript để trở thành một lập trình viên giỏi, hầu hết mọi người đều ổn mà không có nó. Tuy nhiên, làm việc với TypeScript có một số lợi thế sau:

* Với static typing, code viết bằng TypeScript dễ dự đoán hơn, và dễ debug hơn.
* Dễ dàng tổ chức code cho các ứng dụng cực lớn và phức tạp nhờ modules, namespaces và hỗ trợ OOP mạnh mẽ.
* TypeScript có một bước biên dịch thành JavaScript, sẽ bắt tất cả các loại lỗi trước khi chúng chạy và làm hỏng một vài thứ.
* Framework Angular 2 viết với TypeScript và nó cũng khuyến khích các lập trình viên sử dụng ngôn ngữ này trong các dự án của họ.

### Cài đặt TypeScript
Cách dễ nhât để thiết lập TypeScript là thông qua npm. Sử dụng lệnh dưới đây có thể cài đặt TypeScript package toàn cục, giúp cho trình biên dịch TypeScript có thể sử dụng trong mọi dự án của chúng ta:
```js
npm install -g typescriptjavascript:void(0)
```

Thử mở một cửa sổ terminal ở bất kỳ đâu và chạy lệnh tsc -v , nếu cài đặt thành công màn hình sẽ như thế này:
```js
tsc -v
Version 1.8.10
```

### Các Text Editor hỗ trợ TypeScript
TypeScript là một dự án mã nguồn mở nhưng được phát triển và duy trì bởi Microsoft và vì vậy nó được hỗ trợ sẵn trong nền tảng Visual Studio của Microsoft.

Hiện nay, rất nhiều text editor và IDE hỗ trợ sẵn hoặc thông qua các plugin để hỗ trợ cú pháp của TypeScript, auto-complete suggestions, bắt lỗi và thậm chí tích hợp sẵn trình biên dịch.

* Visual Studio Code – Một trình soạn thảo mã nguồn mở của Microsoft. Hỗ trợ sẵn TypeScipt.
* Plugin cho Sublime Text
* Phiên bản mới nhất của WebStorm cũng hỗ trợ TypeScipt
* Và nhiều trình soạn thảo khác như Vim, Atom, Emacs …


### Biên dịch sang JavaScript
TypeScript được viết trong các file .ts (hoặc .tsx cho JSX), nó không thể sử dụng trực tiếp trong trình duyệt và cần biên dịch thành JavaScript. Điều này có thể thực hiện với một số cách:
* Trong terminal sử dụng lệnh tsc
* Trực tiếp trong Visual Studio hoặc các IDE và trình soạn thảo khác
* Sử dụng các task runner như Gulp

Cách đầu tiên là dễ dàng nhất, cho những người mới bắt đầu, vì thế chúng ta sẽ sử dụng nó trong bài viết này.

Câu lệnh sau sẽ nhận một file TypeScipt là main.ts và chuyển nó thành JavaScipt main.js. Nếu main.js đã tồn tại nó sẽ bị ghi đè:
```js
tsc main.ts
```

Chúng ta có thể biên dịch nhiều file cùng lúc bằng cách liệt kê chúng hoặc áp dụng các wildcard:
```js
# Will result in separate .js files: main.js worker.js.
tsc main.ts worker.ts    

# Compiles all .ts files in the current folder. Does NOT work recursively.
tsc *.ts
```

Chúng ta cũng có thể sử dụng tùy chọn –watch để tự động biên dịch một file TypeScript khi có thay đổi:
```js
# Initializes a watcher process that will keep main.js up to date.
tsc main.ts --watch
```

Nhiều lập trình viên TypeScript cao cấp cũng tạo ra một file tsconfig.json chứa nhiều thiết lập. Một file cấu hình như vậy rất tiện lợi khi làm việc trên các dự án lớn có nhiều file .ts vì nó giúp tự động hóa một phần tiến trình. Bạn có thể đọc nhiều hơn về tsconfig.json trong tài liệu hướng dẫn của TypeScript ở [đây](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### Static Typing
Một tính năng rất đặc biệt của TypeScript là hỗ trợ static typing. Điều này có nghĩa là bạn có thể khai báo kiểu cho biến, và trình biên dịch sẽ đảm bảo rằng chúng không bị gán sai kiểu của các giá trị. Nếu khai báo kiểu bị bỏ qua, chúng sẽ được tự động phát hiện từ code của bạn.

Đây là một ví dụ. Mọi biến, tham số của hàm hoặc giá trị trả lại có thể có các kiểu được định nghĩa khi khởi tạo:


```js
var burger: string = 'hamburger',     // String 
    calories: number = 300,           // Numeric
    tasty: boolean = true;            // Boolean

// Alternatively, you can omit the type declaration:
// var burger = 'hamburger';

// The function expects a string and an integer.
// It doesn't return anything so the type of the function itself is void.

function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
```

Khi TypeScript được biên dịch thành JavaScript, toàn bộ khai báo kiểu sẽ bị xóa:
```js
// JavaScript code from the above TS example.

var burger = 'hamburger',
    calories = 300, 
    tasty = true; 

function speak(food, energy) {
    console.log("Our " + food + " has " + energy + " calories.");
}

speak(burger, calories);
```

Nếu chúng ta thử làm một điều gì đó không hợp lệ, khi biên dịch tsc sẽ báo lỗi. Ví dụ:
```js
// The given type is boolean, the provided value is a string.
var tasty: boolean = "I haven't tried it yet";
```

```js
main.ts(1,5): error TS2322: Type 'string' is not assignable to type 'boolean'.
```

Nó cũng cảnh báo khi chúng ta truyền sai tham số tới một hàm:

```js
function speak(food: string, energy: number): void{
  console.log("Our " + food + " has " + energy + " calories.");
}

// Arguments don't match the function parameters.
speak("tripple cheesburger", "a ton of");
```

```js
main.ts(5,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

Đây là một vài kiểu dữ liệu được sử dụng phổ biến nhất:

* **Number** – Tất cả giá trị số được biểu diễn bởi kiểu number, không có định nghĩa riêng cho số nguyên (interger), số thực (float) hoặc các kiểu khác.
* **String** – Giống như string của JavaScript có thể được bao quanh bởi ‘dấu nháy đơn’ hoặc “dấu nháy kép”.
* **Boolean** – true hoặc false, sử dụng 0 và 1 sẽ gây ra lỗi biên dịch.
* **Any** – Một biến với kiểu này có thể có giá trị là một string, number hoặc bất kỳ kiểu nào.
* **Arrays** – Có 2 kiểu cú pháp: my_arr: number[]; hoặc my_arr: Array number.
* **Void** – Được sử dụng khi hàm không trả lại bất kỳ giá trị nào.
    
### Interfaces
Interfaces được sử dụng để kiểm tra, xem một đối tượng có phù hợp với một cấu trúc nhất định hay không. Bằng cách định nghĩa một interface, chúng ta có thể đặt tên một sự kết hợp đặc biệt của các biến, đảm bảo rằng chúng luôn luôn đi cùng nhau.

Trong ví dụ dưới đây chúng ta định nghĩa một interface đơn giản để kiểm tra kiểu các tham số của một hàm:
```js
// Here we define our Food interface, its properties, and their types.
interface Food {
    name: string;
    calories: number;
}

// We tell our function to expect an object that fulfills the Food interface. 
// This way we know that the properties we need will always be available.
function speak(food: Food): void{
  console.log("Our " + food.name + " has " + food.calories + " calories.");
}

// We define an object that has all of the properties the Food interface expects.
// Notice that types will be inferred automatically.
var ice_cream = {
  name: "ice cream", 
  calories: 200
}

speak(ice_cream);
```

Thứ tự các thuộc tính không quan trọng. Chúng ta chỉ cần đủ số lượng các thuộc tính và đúng kiểu. Nếu một thuộc tính nào đó bị thiếu, hoặc sai kiểu, hoặc sai tên, trình biên dịch sẽ cảnh báo chúng ta.

```js
interface Food {
    name: string;
    calories: number;
}

function speak(food: Food): void{
  console.log("Our " + food.name + " has " + food.calories + " grams.");
}

// We've made a deliberate mistake and name is misspelled as nmae.
var ice_cream = {
  nmae: "ice cream", 
  calories: 200
}

speak(ice_cream);
```

```js
main.ts(16,7): error TS2345: Argument of type '{ nmae: string; calories: number; } 
is not assignable to parameter of type 'Food'. 
Property 'name' is missing in type '{ nmae: string; calories: number; }'.
```

### Classes
Khi xây dựng các ứng dụng lớn, phong cách lập trình hướng đối tượng được ưa thích bởi rất nhiều lập trình viên, đặc biệt là trong các ngôn ngữ như Java hoặc C#.

Cũng phải đề cập là từ phiên bản ECMAScript 2015, classes là một tính năng có sẵn trong JS và có thể không cần sử dụng TypeScript. Hai phiên bản khá giống nhau, nhưng chúng vẫn có điểm khác biệt, đó là TypeScript nghiêm ngặt hơn.

Đây là một ví dụ đơn giản về TypeScript:

```js
class Menu {
  // Our properties:
  // By default they are public, but can also be private or protected.
  items: Array<string>;  // The items in the menu, an array of strings.
  pages: number;         // How many pages will the menu be, a number.

  // A straightforward constructor. 
  constructor(item_list: Array<string>, total_pages: number) {
    // The this keyword is mandatory.
    this.items = item_list;    
    this.pages = total_pages;
  }

  // Methods
  list(): void {
    console.log("Our menu for today:");
    for(var i=0; i<this.items.length; i++) {
      console.log(this.items[i]);
    }
  }

} 

// Create a new instance of the Menu class.
var sundayMenu = new Menu(["pancakes","waffles","orange juice"], 1);

// Call the list method.
sundayMenu.list();
```

Bất kỳ ai đã biết một chút về Java hoặc C# sẽ thấy cú pháp này khá quen thuộc. Tương tự cho kế thừa:

```js
class HappyMeal extends Menu {
  // Properties are inherited

  // A new constructor has to be defined.
  constructor(item_list: Array<string>, total_pages: number) {
    // In this case we want the exact same constructor as the parent class (Menu), 
    // To automatically copy it we can call super() - a reference to the parent's constructor.
    super(item_list, total_pages);
  }

  // Just like the properties, methods are inherited from the parent.
  // However, we want to override the list() function so we redefine it.
  list(): void{
    console.log("Our special menu for children:");
    for(var i=0; i<this.items.length; i++) {
      console.log(this.items[i]);
    }

  }
}

// Create a new instance of the HappyMeal class.
var menu_for_children = new HappyMeal(["candy","drink","toy"], 1);

// This time the log message will begin with the special introduction.
menu_for_children.list();
```

### Generics
Generics là các mẫu cho phép cùng một hàm có thể chấp nhận các tham số với nhiều kiểu khác nhau. Việc tạo ra các thành phần có thể tái sử dụng với generics tốt hơn sử dụng kiểu any, vì generics bảo tồn kiểu của các biến vào và ra của chúng.

Ví dụ dưới đây nhận một tham số và trả lại một mảng chứa cùng tham số

```js
// The <T> after the function name symbolizes that it's a generic function.
// When we call the function, every instance of T will be replaced with the actual provided type.

// Receives one argument of type T,
// Returns an array of type T.

function genericFunc<T>(argument: T): T[] {    
  var arrayOfT: T[] = [];    // Create empty array of type T.
  arrayOfT.push(argument);   // Push, now arrayOfT = [argument].
  return arrayOfT;
}

var arrayFromString = genericFunc<string>("beep");
console.log(arrayFromString[0]);         // "beep"
console.log(typeof arrayFromString[0])   // String

var arrayFromNumber = genericFunc(42);
console.log(arrayFromNumber[0]);         // 42
console.log(typeof arrayFromNumber[0])   // number
```

Lần đầu tiên gọi hàm chúng ta thiết lập kiểu thành string. Điều này không bắt buộc vì trình biên dịch có thể xem tham số được truyền và tự động quyết định kiểu nào phù hợp nhất, giống như lần gọi hàm thứ 2.

Mặc dù không bắt buộc, luôn luôn cung cấp kiểu được coi là cần thiết vì trình biên dịch có thể đoán sai kiểu trong các kịch bản phức tạp.

### Modules
Một khái niệm quan trọng, khi làm việc trên một ứng dụng lớn là tính module hóa. Chia code thành nhiều thành phần nhỏ có khả năng tái sử dụng giúp dự án của bạn dễ tổ chức và dễ hiểu, khi so sánh với một file duy nhất có 10000 dòng code.

TypeScript giới thiệu một cú pháp để exporting và importing các module, nhưng không thể xử lý thực sự việc liên kết giữa các file. Để cho phép modules TS dựa trên các thư viện của bên thứ ba: require.js cho các ứng dụng client và CommonJS cho Node.js. Hãy xem một ví dụ đơn giản với require.js:


Chúng ta có 2 file. Một file export một hàm, file còn lại import và gọi nó.

`exporter.ts`
```js
var sayHi = function(): void {
    console.log("Hello!");
}

export = sayHi;
```
`importer.ts`
```js
import sayHi = require('./exporter');
sayHi();
```

Bây giờ chúng ta cần download require.js và thêm nó trong một thẻ script – xem hướng dẫn ở đây. Bước cuối cùng là biên dịch 2 file .ts. Mộ tham số mở rộng cần được thêm vào để nói với TypeScript chúng ta đang xây dựng các module cho require.js (còn được gọi là AMD):

```js
tsc --module amd *.ts
```