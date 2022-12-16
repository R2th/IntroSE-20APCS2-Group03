![](https://images.viblo.asia/2d8356aa-2864-4d8c-b013-2ff223a56959.png)

## Bạn sẽ học được gì

Bài viết này là phần giới thiệu về các khái niệm và cách sử dụng Generics trong TypeScript, tại sao nó lại quan trọng và trong trường hợp nào. Nó sẽ bao gồm cú pháp, các loại và cách các tham số được xây dựng với các ví dụ được xác định rõ ràng mà bạn có thể tự theo dõi và áp dụng cho các dự án của bản thân.

## Cài đặt 1 số thứ cần thiết

[Node.js](https://nodejs.org/)

[Node Package Manager](https://nodejs.org/)

[TypeScript](https://www.typescriptlang.org/)

```
npm install -g TypeScript
```

[bài viết này sử dụng Visual Studio Code](https://code.visualstudio.com/)

## TypeScript Generics là gì?

Trong TypeScript, Generics về cơ bản là một loại công cụ cho phép bạn tạo các thành phần mã có thể sử dụng lại hoạt động với nhiều type khác nhau thay vì chỉ một type duy nhất. Sử dụng Generics là một cách rất an toàn để trao quyền cho các lớp, loại và giao diện để hành động theo cách các tham số hoạt động để bạn có thể dễ dàng sử dụng lại chúng cho tất cả các loại đầu vào. Tuy nhiên, TypeScript Generics không nên bị nhầm với bất kỳ loại nào bạn sẽ thấy sự khác biệt giữa chúng sau này trong bài viết này.

Trong các ngôn ngữ như C # và Java, một trong những công cụ chính trong hộp công cụ để tạo các thành phần có thể sử dụng lại là generic , nghĩa là có thể tạo ra một thành phần có thể hoạt động trên nhiều loại chứ không phải một loại. Điều này cho phép người dùng sử dụng các thành phần này và sử dụng các loại riêng của họ.

## Thiết lập TypeScript với VS code

Tạo một thư mục mới trong máy tính của bạn ở một vị trí mà bạn có thể dễ dàng truy cập, sau đó mở nó bằng Visual Studio Code

Bên trong VS Code, tạo một tệp và đặt tên là app.ts , đây sẽ là nơi chứa tất cả mã TypeScript của chúng ta.

Thêm đoạn console log sau vào trình soạn thảo:

```
console.log(“hello TypeScript”);
```

Nhấn phím F5 và bạn sẽ thấy tệp `launch.json` trông giống như thế này:

```
 {
// Use IntelliSense to learn about possible attributes.
"version": "0.2.0",
 "configurations": [
{
  "type": "node",
  "request": "launch",
  "name": "TypeScript",
  "program": "${workspaceFolder}/app.ts",
  "outFiles": [
    "${workspaceFolder}/**/*.js"
     ]
    }
   ]
  }
  ```
  
 Phần tên đã được thay đổi từ chương trình Launch thành TypeScript.

Nhấp vào Tab Terminal và chọn các tác vụ đang chạy và chọn tab `TypeScript Watch Mode` và nó sẽ kéo lên một tệp Task.json như thế này:

```
 {
 // See https://go.microsoft.com/fwlink/?LinkId=733558
 // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
  {
   "label": "echo",
   "type": "shell",
   "command": "tsc",
   "args": ["-w", "-p","."],
   "problemMatcher": [
    "$tsc-watch"
    ],
   "isBackground": true
   }
  ]
 }
 ```
 
 Tạo một tệp khác với tên `tsconfig.json` trong thư mục của dự án nơi đặt tệp app.ts. Sao chép mã dưới đây vào tập tin:
 
 ```
 {
  "compilerOptions": {
    "sourceMap": true
  }
}
```

điều này sẽ cho phép trình chạy tác vụ biên dịch TypeScript thành javascript để thay đổi tập tin.

Nhấp vào tab Terminal lần nữa và chọn `run build task`

Chọn `TypeScript watch` và bạn sẽ thấy:

```
[9:25:43 AM] Starting compilation in watch mode…
```

Bạn có thể sử dụng phần gỡ lỗi của VS code để biên dịch tệp TypeScript của mình.

![](https://images.viblo.asia/e9c1ecd7-10d9-4939-a9e2-f72799ae330c.png)

Với thiết lập môi trường phát triển, bạn có thể giải quyết một số vấn đề nảy sinh về khái niệm TypeScript Generics.

## Vấn đề

Khi xây dựng các ứng dụng với TypeScript, kiểu `any` không được khuyến khích sử dụng vì một vài lý do mà bạn sẽ thấy trong suốt bài đăng này. Một trong những lý do là cung cấp không đầy đủ thông tin cần thiết trong khi gỡ lỗi. Một lý do chính đáng để VS Code được chọn là vì sự phức tạp mà nó mang lại.

Nếu bạn có một class Collection với một phương thức để thêm một cái gì đó vào collection  và một phường thức khác trả về một cái gì đó theo chỉ mục của nó như thế này:

```
class Collection {
  private _things:string[];
  constructor() {
    this._things = [];
  }
  add(something: string) {
    this._things.push(something);
  }
  get(index: number): string {
    return this._things[index];
  }
}
```

Bạn có thể nhanh chóng thấy rằng collection này được xác định rõ ràng là một string collection và không thể sử dụng các số trong danh sách này. Vì vậy, giải pháp thay thế sẽ là tạo ra một collection mới trong đó là các số thay vì các chuỗi được chấp nhận. Đây là một thay thế tuyệt vời, tuy nhiên nó đi kèm với một nhược điểm lớn - sao chép mã. Sao chép mã cuối cùng dẫn đến việc tiêu tốn nhiều thời gian hơn cho cả ghi và gỡ lỗi và cả việc sử dụng bộ nhớ không hiệu quả.

Tùy chọn thứ hai là sử dụng loại `any` thay cho loại `string` để xác định class, như thế này bên dưới:

```
class Collection {
  private _things:any[];
  constructor() {
    this._things = [];
  }
  add(something: any) {
    this._things.push(something);
  }
  get(index: number): any {
    return this._things[index];
  }
}
```

Lúc này, collection hỗ trợ bất kỳ loại dữ liệu nào bạn cung cấp, nếu bạn tạo logic để điền vào collection như vậy:

```
let Stringss = new Collection();
Stringss.add("hello");
Stringss.add("world");
```

Điều này sẽ thêm các string `hello` và `world` vào collection và bạn chỉ cần log là 1 cái gì đó, ví dụ độ dài string của bất kỳ mục nào trong collection.

```
console.log(Stringss.get(0).length);
```

String `hello` có năm ký tự, do đó bạn sẽ thấy nó khi bạn chạy mã TypeScript ở chế độ gỡ lỗi.

![](https://images.viblo.asia/f67ce087-679e-4c9a-bb84-b5dcf0b6b293.png)

Lưu ý rằng khi bạn di chuột qua thuộc tính độ dài, VS Code intellisense cho biết không có thông tin gì vì nó không biết loại chính xác mà bạn đang chọn để làm việc. Nó thậm chí còn `dở hơi` hơn khi bạn truyền số vào, như:

```
let Stringss = new Collection();
Stringss.add(001);
Stringss.add("world");
console.log(Stringss.get(0).length);
```

Bạn nhận được một đầu ra không xác định. Nếu bạn đi xa hơn và quyết định in một chuỗi con của chuỗi - nó sẽ báo lỗi.

```
console.log (Strings.get (0) .substr (0,1)); 
```


![](https://images.viblo.asia/f9ff75e2-7a92-4b0a-9ffe-9a9d087c2ecd.png)

Đây chỉ đơn giản là kết quả của bất kỳ loại nào đã được sử dụng để xác định bộ sưu tập.

## Hiểu ý tưởng trung tâm

Vấn đề đã được minh họa bằng loại `any` và có thể được giải quyết đúng cách bằng TypeScript Generics. Ý tưởng trung tâm ở đây là sự an toàn, với TypeScript Generics, bạn có thể chỉ định các loại tham số cho các thể hiện của các class, loại hoặc giao diện mà trình biên dịch có thể hiểu và cũng suy ra logic của chúng ta. Bằng cách này, sự an toàn được đảm bảo khi bạn nhận được các lỗi thời gian biên dịch khi bạn có một kiểu không khớp như trong bất kỳ ngôn ngữ nào được gõ.

Cú pháp cho generics giống như thế này:

```
function identity<T>(arg: T): T {
  return arg;
}
```

Bạn có thể chỉ định các loại chung cho collection bạn đã tạo ở trên bằng cách sử dụng dấu ngoặc nhọn.

```
class Collection<T> {
  private _things:T[];
  constructor() {
    this._things = [];
  }
  add(something: T): void {
    this._things.push(something);
  }
  get(index: number): T {
    return this._things[index];
  }
}
let Stringss = new Collection<String>();
Stringss.add(001);
Stringss.add("world");
console.log(Stringss.get(0).substr(0, 1));
```

Nếu bạn đã sao chép logic mới này với dấu ngoặc nhọn vào trình soạn thảo mã của mình, bạn sẽ nhận thấy ngay lập tức dòng nguệch ngoạc bên dưới `001`. Điều này là do TypeScript hiện có thể suy ra từ loại chung được chỉ định rằng `001` không phải là một chuỗi. Loại an toàn đạt được khi bạn xác định rằng loại chuỗi được sử dụng ở bất cứ đâu bạn có T, điều này nói về bản chất rằng đầu ra từ bộ sưu tập này có thể thuộc loại `any` nhưng bạn kỳ vọng nó thuộc loại chuỗi. Khai báo chung này được sử dụng ở đây là ở cấp độ lớp, nó cũng có thể được định nghĩa ở các cấp độ khác như cấp độ phương thức tĩnh và cấp độ phương thức cá thể như bạn sẽ thấy sau trong bài viết.

## Làm việc với Generics

Bạn có thể có nhiều hơn một tham số đầu vào một khai báo chung, chúng chỉ cần được phân tách bằng dấu phẩy như thế này:

```
class Collection<T, K> {
  private _things:K[];
  constructor() {
    this._things = [];
  }
  add(something: K): void {
    this._things.push(something);
  }
  get(index: number): T {
    console.log(index);
  }
}
```

Các tham số loại cũng có thể được sử dụng rõ ràng trong các hàm trong các khai báo như thế này:

```
class Collection {
  private _things:any[];
  constructor() {
    this._things = [];
  }
  add<A>(something: A): void {
    this._things.push(something);
  }
  get<B>(index: number): B {
    return this._things[index];
  }
}
```

Vì vậy, khi bạn muốn tạo một Collection mới, các tổng quát hiện được khai báo ở cấp phương thức cũng sẽ được ghi trong cấp độ gọi phương thức như thế này:

```
let Stringss = new Collection();
Stringss.add < string > "hello";
Stringss.add("world");
```

Bạn cũng nhận thấy rằng khi di chuột, intellisense của VS Code có thể suy ra rằng lệnh gọi hàm thêm thứ hai vẫn thuộc kiểu chuỗi.

Khai báo chung cũng hoạt động cho các phương thức tĩnh:

```
static add<A>(something:A):void{
 this._things.push(something);
}
```

Mặc dù các phương thức tĩnh có thể được khởi tạo để có các kiểu chung, mặt khác, các thuộc tính tĩnh không thể.

## Những hạn chế của Generics

Bây giờ bạn đã hiểu rất rõ về TypeScript Generics, cần phải đề cập đến một loại nhược điểm mà Generics có ở cốt lõi và một giải pháp rất thiết thực cho nó. Sử dụng Generics, rất nhiều loại thuộc tính và giá trị có thể được suy ra bởi TypeScript chỉ bằng một khai báo chung, nhưng tại một số điểm mà TypeScript không chắc chắn về suy luận, nó sẽ không giả sử. Để an toàn, bạn phải xác định các yêu cầu hoặc ràng buộc này như một interface và mở rộng nó trong khởi tạo chung của chúng ta.

Nếu bạn có một chức năng rất đơn giản như thế này:

```
function printName<T>(arg: T) {
  console.log(arg.length);
  return arg;
}
printName(3);
```

Bạn sẽ thấy một dòng nguệch ngoạc dưới thuộc tính độ dài khi bạn nhập nó vì TypeScript không thể suy ra loại tham số arg là gì, không thể chứng minh rằng tất cả các loại có thuộc tính độ dài và do đó cũng không thể giả sử đó là một chuỗi (có thuộc tính độ dài) . Như bạn đã thấy trước đó, bạn phải tạo một giao diện mà việc khởi tạo chung có thể mở rộng để trình biên dịch sẽ không cảnh báo chúng ta với các lỗi một lần nữa.

```
interface NameArgs {
  length: number;
}
```

Bạn có thể mở rộng khai báo chung:

```
function printName <T extends NameArgs>(arg: T){
  console.log(arg.length);
  return arg;
}
```

Điều này báo cho TypeScript hoạt động với bất kỳ loại nào có thuộc tính độ dài. Khi điều này đã được xác định, câu lệnh gọi hàm của bạn cũng phải thay đổi vì nó không hoạt động trên tất cả các loại. Vì vậy, nó sẽ trông như thế này thay vào đó:

```
printName({length: 1, value: 3});
```

Đây là một trường hợp sử dụng rất cơ bản, nhưng với nó, bạn có thể thấy cách thiết lập các ràng buộc hữu ích cho chúng ta bằng cách sử dụng generics.

## Tại sao Generics?

[Behrooz](https://stackoverflow.com/users/3486500/behrooz) , một thành viên tích cực của cộng đồng Stack Overflow đưa ra câu trả lời độc đáo này trong các câu tiếp theo . Lý do chính để sử dụng generic trong TypeScript là để cho phép các loại, lớp hoặc giao diện hoạt động như các tham số. Nó giúp chúng ta sử dụng lại cùng một mã cho các loại đầu vào khác nhau vì chính loại đó có sẵn như là một tham số.

Một số lợi ích của thuốc generic là:

* Xác định mối quan hệ giữa các loại tham số đầu vào và đầu ra. Ví dụ:` function test <T>(input: T[]): T { … }` cho phép bạn đảm bảo đầu vào và đầu ra sử dụng cùng loại, mặc dù đầu vào là một mảng.
* Kiểm tra loại mạnh hơn tại thời gian biên dịch sẽ có sẵn. Trong trường hợp ví dụ trên, trình biên dịch cho bạn biết các phương thức mảng có sẵn cho đầu vào chứ không phải bất kỳ phương thức nào khác.
* Bạn có thể loại bỏ một số loại không cần thiết. Ví dụ: khi bạn có ` Array<Item> = []`, đi qua các phần tử mảng, bạn sẽ có quyền truy cập vào tất cả các thành viên của Item.

## Tài nguyên bổ sung

[Tài liệu](https://www.typescriptlang.org/docs/handbook/generics.html)

## Phần kết luận

Bạn đã được xem qua một cái nhìn tổng quan về khái niệm khái quát và đã sử dụng các ví dụ khác nhau để giúp phá vỡ ý tưởng đằng sau nó. Khái niệm về generics có thể hơi khó hiểu lúc đầu. Đó là một khái niệm tuyệt vời giúp chúng tôi kiểm soát nhiều hơn các đầu vào và đầu ra trong không chỉ javascript mà cả các ngôn ngữ khác có generics. Happy Coding!