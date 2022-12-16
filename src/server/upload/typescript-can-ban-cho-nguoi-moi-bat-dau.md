JavaScript đang là một ngôn ngữ rất thịnh hành hiện nay đối với các developer. Javascript hiện nay rất linh hoạt, có thể dùng nó để code Website Front-end, Back-end cũng có thể sử dụng nó để code Mobile native app cho cả IOS và Android... Với sự lợi thế đó, mặt hạn chế của nó vẫn còn khi cấu trúc một dự án lớn, do tính không chặt chẽ và thoải mái nên có thể sẽ khiến cho ứng dụng trở nên khá thiếu chuyên nghiệp thậm chí nhiều khi khá khó check lỗi vì tính không chặt chẽ của dữ liệu. Với TypeScript một mã nguồn mở được xây dựng lên từ JavaScript bằng cách thêm định nghĩa  kiểu dữ liệu tĩnh (thay vì kiểu dữ liệu động như Javascript) .  TypeScript làm cho những dòng code của chúng ta trở nên chặt chẽ hơn, xác định ngay cho chúng ta biết rằng những kiểu dữ liệu cho biến nào đang thiếu chính xác. Nhờ sự tiện lợi đó thì developer không thể bỏ qua được ngôn ngữ này. Chúng ta cùng đi vào những thứ cơ bản của TypeScript nhé.



![](https://images.viblo.asia/f8d4357a-1d85-49a4-9f3d-b849aefde820.png)


# 1. Lợi ích của việc sử dụng TS
Với TypeScript chúng ta có rất nhiều lợi ích, mà một số trong đó có thể kể tới như:
- TypeScript là mã nguồn mở 
- TypeScript có thể viết theo hướng đối tượng.
- TypeScript cho phép chúng ta tận dụng tất cả những lợi thế từ ES6 (ECMAScript 6)
- Hỗ trợ kiểu dữ liệu tĩnh (static type) giúp code dễ dự đoán, debug lỗi hơn.
- Hỗ trợ module namespace
- Có thể code được trên cả Backend và Frontend Web, Mobile

Và còn rất nhiều lợi ích khác nữa hãy thử và khám phá nhé 
### Cài đặt

Ở dự án thông qua npm chúng ta cài đặt bằng câu lệnh: 
```js
npm install -g typescript
```

tạo 1 folder ```tsDemo``` file test thử: 
```bash 
$ mkdir tsDemo
$ cd tsDemo
$ touch index.ts
```
```index.ts 
const username: string = "hieupv";

console.log(username);
```

compile :
```
tsc index.ts
```

lúc này trong folder tsDemo sẽ có thêm file index.js
```bash
$ ls
index.js  index.ts
```
```bash
$ node index.js
Kết quả trả về: 
hieupv
```
Thành công và tiếp tục tới kiến thức cơ bản nào :D 
# 2. Types
Với Javascript, chúng ta có kiểu dữ liệu động, trong tùy từng trường hợp mà JavaScript sẽ tạo ra kiểu dữ liệu tương ứng. Ví dụ như:

### Variables
   ```js
   let hello = "Welcome To Viblo"
   ```
  Ở đây Javascript tự hiểu rằng biến ```hello``` khi này sẽ có kiểu dữ liệu là ```string``` . Tuy nhiên sau này khi dùng lại bán, có thể vô tình bạn lại gán cho nó kiểu số chẳng hạn. Như vậy với cùng một biến chúng ta lại sử dụng nhiều kiểu dữ liệu khác nhau mà không thấy trình biên dịch hay trình duyệt báo lỗi gì. Nhiều lúc thật khó hiểu :D.\
  TypeScript thì khác, TypeScript xây dựng cho chúng ta một kiểu dữ liệu tĩnh (static types) và từ đây chúng ta sẽ có đoạn code rõ ràng hơn : 
  ```js
  let hello: string = "Welcome To Viblo" 
  ```
  Đấy, nhìn có vẻ chuyên nghiệp hơn và rõ ràng hơn không nhỉ, sau này mà bạn còn gán lại cho hello bằng một số nữa thì nhận dòng đỏ lừ từ trình biên dịch của typescript nhé :D 

### Objects

Với một Object , bình thường JavaScript chỉ cần viết như thế này: 

```js
const user = {
    name: "hieu pham",
    age: "23"
}
```

Oke truy cập ```user.name```, ```user.age``` thì không sao đều ra được dữ liệu. Truy cập tới ```user.lover``` thì  ra dòng ```underfined```, báo lỗi chả rõ ràng gì cả. Chuyển qua TypeScript chúng ta sẽ nhận ngay lỗi :  
```js
Property 'lover' does not exist on type '{ name: string; age: number; }'.
```
Báo luôn là chả có thuộc tính ```lover``` nào ở đây hết, cho nên ông đừng có gọi nữa. 

Chúng ta cũng có thể định nghĩa kiểu dữ liệu cho 1 Objects nhất định thông qua interface như sau: 

```js
 interface User {
     id: number;
     name: string;
     address: string;
 }
```
```js
function sayHello(user: User) { // mỗi object truyền vào bắt buộc phải có type User
  return "Hello " + person.age;
} 
```
 
### Functions

Với function chúng ta cũng có thể định nghiã luôn kiểu dữ liệu cho tham số truyền vào hay kiểu dữ liệu trả ra của function như sau: 

```js
function isEvenNumber(param: number): boolean {
  return param % 2 === 0;
}
```

Với function này chúng ta đã định nghĩa tham số truyền vào bắt buộc phải là một số (number) và kiểu dữ liệu trả ra bắt buộc phải là boolean. Vì vậy nếu các bạn có sửa nó thành ```return xyz``` mà khác với kiểu boolean thì ngay lập tức nhận lỗi :D  Hoặc các bạn truyền vào tham số là ```string``` thì cũng nhận lỗi tượng tự như: 
```js
Argument of type 'string' is not assignable to parameter of type 'number'.

//tạm dịch: Cái biến mà ông truyền vào nó là string có phải là number đâu.
```

### Basic types
|Type  | Định nghĩa   |
|---|---|
|  Boolean  |True hoặc false   | 
|  Number |Kiểu số (float hoặc big intergers)  |  
|   String |Kiểu chuỗi   |  
|   Array  | Kiểu mảng, có 2 cách khai báo: ```let list: number[] = [1, 2] hoặc let list: Array <number> = [1, 2]```  |  
|   Object | Kiểu đối tượng như trên mình đã trình bày   |  
|   Tuple  | Kiểu dữ liệu này cho phép bạn khai bảo một mảng với số lượng phần tử cũng như type của từng phần tử đấy cho trước. Nếu phần tử đấy khác kiểu dữ liệu ban đầu có thể bị báo lỗi. Vd: ```let x: [string, number]```; thì khi bạn sử dụng x bắt buộc phần tử thứ nhất phải là string, phần tử thứ 2 phải là số|  
|   Unknown  | Kiểu này khi bạn muốn mô tả một dữ liệu mà chưa biết được trước kiểu dữ liệu của nó.   |  
|   Any  |  Cũng khá tương tự với Unknown khi chúng ta không biết trước được kiểu dữ liệu, tuy nhiên với any chúng ta có thể truy cập vào thuộc tính mặc dù không tồn tại của nó. Vd ```let user: any = 1; user.getDown()``` Chúng ta sẽ không gặp lỗi gì trong trường hợp này. Tuy nhiên khi dùng với unknown chúng ta sẽ bị lỗi ```let user: unknown = 1; user.getDown()``` ```Object is of type 'unknown'.```|  
|   Void  | Dùng cho function , có thể function trả ra  dữ liệu hoặc không trả ra gì  |
|   Enum  | Một cách đặt tên dễ dàng đọc hơn cho việc hiển thị dữ liệu số hay các biến mặc định |

### Classes
Với sự thừa hưởng và sử dụng được tất cả các tính năng trên ES6. Typescript cũng có thể sử dụng được class. Như vậy việc lập trình theo kiểu hướng đối tượng - OOP không còn là khó khăn.

```js
class User {
  name: string;
  message: string;

  constructor() {
    this.name = "";
    this.message = "Hello";
  }
}
```

Đoạn code trên chúng ta thấy cũng không khác gì js ngoài việc chúng ta sử dụng thêm type cho từng thuộc tính trong class. Ngoài ra chúng ta cũng có thể sử dụng được hầu hết các tính năng, đặc trưng của lập trình hướng đối tượng như các ngôn ngữ khác như : đóng gói, kế thừa, trừu tượng hay đa hình. Nếu có thời gian mình sẽ đi vào chi tiết những đặc trưng của class trong Typescript.
# 3. Composing Types (tự tạo type của bạn)
Với javascript điều đặc biện chúng ta có thể tự tạo được type phức tạp bằng cách kết hợp từ các kiểu dữ liệu đã  có.Có hai cách chính chúng ta thường làm đấy là sử dụng Unions và Generics
### unions
Với unions, chúng ta có thể kết hợp nhiều type khác nhau hoặc cùng một type nhưng bao gồm những giá trị cố định: 

```type married = "yes" | "no";```

ở trên ```married``` có kiểu dữ liệu là ```string``` và chỉ đc là 2 giá trị ```yes``` hoặc ```no```
### generics
 Chẳng hạn trường hợp như bạn muốn lấy dữ liệu từ database, theo phương pháp hướng đối tượng, mỗi đối tượng đấy gắn liền với những dữ liệu trong database, thì mỗi cột trong database sẽ trả ra kiểu dữ liệu khác nhau, chúng ta taọ nên một kiểu dữ liệu riêng cho đối tượng tương ứng đó bao gồm bên trong là định nghĩa chi tiết từng thuộc tính. Vd: một user:
 ```typescript
 interface User {
     id: number;
     name: string;
     address: string;
 }
 ```
 
 Bây giờ chúng ta muốn định nghĩa type cho một màng bao gồm list user: sẽ là : 
 
 ```js
 const listUser: Array<User>;
 ```
 
 Như vậy chúng ta đã tạo được một types theo mục đích sử dụng của mình.
 
 # 4. Kết luận
 TypeScript hiện tại đang là một ngôn ngữ với cộng đồng lập trình viên ưa thích sử dụng ngày một tăng nhờ sự chặt chẽ, cải thiện những yếu điểm từ Javascript. Typescript là một ngôn ngữ tuyệt vời cho việc phát triển ứng dụng lớn, có tính chặt chẽ vào maintain cao. Do mình cũng vừa đi vào làm việc với TypeScript vì vậy sai sót là điều khó tránh. Có ý kiến góp ý với bài viết mong mọi người comment ở dưới bình luận. Cảm ơn mọi người đã theo dõi bài viết và nếu thấy bổ ích thì upvote cho mình bài viết này nhé. :D
 
Thanks for peace !

Tài liệu tham khảo:
https://www.typescriptlang.org/docs/