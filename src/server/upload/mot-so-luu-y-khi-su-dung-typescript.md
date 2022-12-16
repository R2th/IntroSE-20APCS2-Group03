## General Types
### Number, String, Boolean và Object
Đừng bao giờ sử dụng kiểu Number, String, Boolean, hoặc Object. 

Các kiểu này refer đến  non-primitive object . Đối vơi những ngôn ngữ như Java , C++ ..  thì các kiểu như này là hợp lệ . 

Nhưng trong  TypeScript thì kiểu khai báo như này là không được công nhận . 
```
/* WRONG */
function reverse(s: String): String;
```
Thay vào đó hãy dùng type : number, string, boolean, hoặc object để thay thế
```
/* OK */
function reverse(s: string): string;
```

## Callback Types
### Return Types của Callbacks
Không nên dùng kiểu `any` cho return của function trong hàm callback với result của return được bỏ qua
```
/* WRONG */
function fn(x: () => any) {
    x();
}
```
Thay vào đó hãy dùng kiểu `void` 
```
/* OK */
function fn(x: () => void) {
    x();
}
```
Lý do : Khi sử dụng `void` sẽ an toàn hơn vì nó ngăn bạn vô tình sử dụng giá trị trả về của `x` theo cách không được kiểm soát .
```
function fn(x: () => void) {
    var k = x(); // oops! meant to do something else
    k.doSomething(); // error, but would be OK if the return type had been 'any'
}
```

## Optional  Parameters trong hàm Callbacks
Không nên dùng Optional  Parameters trong Callbacks trừ khi bạn bạn thực sự muốn làm như thế :v 
```
/* WRONG */
interface Fetcher {
    getObject(done: (data: any, elapsedTime?: number) => void): void;
}
```
Điều này có ý nghĩa callback được thực hiện có thể được gọi với 1 parameters hoặc có thể được gọi với 2 parameters. Có lẽ ý  đồ của tác giả  có ý định nói rằng callback có thể không quan tâm đến tham số `elapsedTime`, nhưng  optional  parameters để thực hiện điều này  là không cần thiết bởi vì nó luôn luôn hợp pháp để cung cấp một callback chấp nhận ít parameters hơn.

Thay vào đó hãy viết parameters trong callback theo kiểu non-optional:
```
/* OK */
interface Fetcher {
    getObject(done: (data: any, elapsedTime: number) => void): void;
}
```

## Overloads và Callbacks
Đừng viết các hàm overloads  riêng biệt chỉ khác nhau ở trong parameter của function
```
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```
Thay vào đó hãy viêt duy nhất một hàm overloads và với parameter là nhiều nhất 
```
/* OK */
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

## Function Overloads
Đừng viết các hàm  general overloads trước các hàm  specific overloads : 
```
/* WRONG */
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

Thay vào đó hãy khai báo các hàm  specific overloads trước : 
```
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```
Lý do : TypeScript chọn các hàm overload đươc khai báo đầu tiên .

## Dùng Optional Parameters
Đừng viết các hàm overload mà chỉ khác nhau ở parameter truyền vào 
```
/* WRONG */
interface Example {
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}
```
Thay vào đó hãy dùng optional parameters bất cứ khi nào có thể 
```
/* OK */
interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}
```

## Dùng Union Types 
Đừng viết các hàm overloads  chỉ khác nhau ở argument position
```
/* WRONG */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number): Moment;
    utcOffset(b: string): Moment;
}
```
Thay vào đó hãy dùng union types thay thế
```
/* OK */
interface Moment {
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}
```
Cảm ơn các bạn đã theo dõi . 

Bài viết được dịch từ : https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html