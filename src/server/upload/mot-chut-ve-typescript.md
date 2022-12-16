## TypeScript là gì?
TypeScript là một superset của JavaScript, nhằm giúp cho JavaScript có thể mở rộng và đáng tin cậy hơn. TypeScript là mã nguồn mở và đã được Microsoft duy trì kể từ khi họ tạo ra nó vào năm 2012. Tuy nhiên, TypeScript đã có bước đột phá ban đầu của nó như là ngôn ngữ lập trình cốt lõi trong Angular 2. Nó đang tiếp tục phát triển giống như React và Vue.

Trong bài viết này, mình sẽ cùng các bạn tìm hiểu các khái niệm cơ bản của TypeScript .
## Tại sao nên sử dụng TypeScript?
Trước khi đi vào tìm hiểu các khái niệm cơ bản chúng ta cùng tìm hiểu xem tại sao chúng ta lại nên sử dụng TypeScript:
* **Dễ phát triển dự án lớn:** Với việc sử dụng các kỹ thuật mới nhất và lập trình hướng đối tượng nên TypeScript giúp chúng ta phát triển các dự án lớn một cách dễ dàng.
* **Nhiều Framework lựa chọn:** Hiện nay các Javascript Framework đã dần khuyến khích nên sử dụng TypeScript để phát triển, ví dụ như AngularJS 2.0 và Ionic 2.0.
* **Hỗ trợ các tính năng của Javascript phiên bản mới nhất:** TypeScript luôn đảm bảo việc sử dụng đầy đủ các kỹ thuật mới nhất của Javascript.
* **Là mã nguồn mở:** TypeScript là một mã nguồn mở nên bạn hoàn toàn có thể sử dụng mà không mất phí, bên cạnh đó còn được cộng đồng hỗ trợ.
* **TypeScript là Javscript:** ản chất của TypeScript là biên dịch tạo ra các đoạn mã javascript nên ban có thê chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch Javascript. Ngoài ra bạn có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong TypeScript, điều này giúp các lập trình viên tiếp cận TypeScript dễ dàng hơn.
## Cài đặt TypeScript
Trước khi bắt đầu vào code, chúng ta cần cài đặt TypeScript trên máy tính của mình. Chúng ta sẽ sử dụng npm cho việc này, vì vậy chỉ cần mở terminal và gõ lệnh sau:
```
npm install -g typescript
```
Sau khi cài đặt, chúng ta có thể kiểm tra xem TypeScript đã được cài đặt thành công hay chưa bằng cách chạy lệnh `tsc -v`, nó sẽ hiển thị phiên bản của TypeScript đã được cài đặt.
## Những dòng code đầu tiên
Hãy tạo file TypeScript đầu tiên của bạn và bắt đầu code. Đối với các file TypeScript, chúng ta lưu đuôi `.ts` nhé. Tạo file `test.ts`. Bây giờ, mình sẽ viết một vài dòng JavaScript thuần cũ, vì tất cả code JavaScript cũng là code TypeScript hợp lệ:
```
let a = 5;
let b = 5;
let c = a + b;
console.log(c);
```
Bước tiếp theo là biên dịch TypeScript của chúng ta thành JavaScript đơn giản, vì các trình duyệt cần các file  .js để đọc.
## Biên dịch TypeScript
Để biên dịch TypeScript sang Javascript, chúng ta sẽ chạy lệnh tsc test.ts. Bản chất của nó là convert file ts sang file js thuần để trình duyệt có thể đọc được. Vì vậy, mở terminal ở vị trí của file test.ts và chạy lệnh sau:
```
tsc test.ts
```
**Tips:** Nếu bạn muốn biên dịch tất cả các file TypeScript bên trong bất kỳ thư mục nào, hãy sử dụng lệnh: tsc * .ts.
## Các kiểu dữ liệu cơ bản
**1. Boolean:** Một trong những kiểu dữ liệu cơ bản nhất là giá trị true\false, với JavaScript và TypeScript được gọi là boolean.
```
let isDone: boolean = false;
```
**2. Number:**   Cũng như JavaScript tất cả số trong TypeScript đều là số thực dấu phẩy động (floating point), tất cả những số thực dấu phẩy động đều có kiểu dữ liệu là number, ngoài hệ thập lục phân(hexadecimal) và thập phân (decimal literals), TypeScript còn hỗ trợ hệ nhị phân (binary) và bát phân (octal literals) được giới thiệu trong ES6.
```
let decima: number = 10;
let hex: number = 0xf00e;
let binary: number = 0b1010;
let octal: number = 0o744;
```
**3. String:** Cũng như các ngôn ngữ lập trình khác, TypeScript sử dụng kiểu string để chỉ kiểu dữ liệu văn bản. Cũng tuơng tự JavaScript, TypeScript cũng sử dụng dấu nháy kép (") hoặc dấu nháy đơn (') bao quanh văn bản.
```
let color: string = "blue";
color = 'green';
```
Bạn cũng có thể sử dụng biến hoặc biểu thức trong chuỗi văn bản, chuỗi string được bao quang bởi dấu nháy đơn (`) và biểu thức nhúng có dạng ${}:
```
let fullName: string = 'Henni Kent';
let age: number = 24;
let sentence: string = `Tôi tên là ${fullName}. Năm nay tôi ${age} tuổi.`
```
**4. Array:** Typescript cho phép bạn làm việc với mảng các giá trị. Array có thể được khai báo bằng hai cách sau:
```
let arr: number[] = [1, 2, 3];
let arr: Array<number> = [1, 2, 3];
```
**5. Tuple:** cho phép bạn khai báo mảng với các giá trị có kiểu dữ liệu mà bạn đã biết. Như ví dụ dưới đây:
```
let arr: [string, number];
arr = ["henni", 5]; //OK
arr = [5, "henni"]; //ERROR
```
**6. Enum:** Một bổ sung hữu ích cho các kiểu dữ liệu cơ bản từ javascript là enum.
```
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
```
**7. Any:** Đôi khi chúng ta cần một kiểu dữ liệu mà chúng ta không biết chắc chắn kiểu dữ liệu của nó, những giá trị này là nội dung động như từ một thư viện khác hoặc người dùng nhập. Để làm như vậy, chúng ta sử dụng `any`
```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```
Any cũng rất thuận tiện khi bạn chỉ biết chắc chắn kiểu dữ liệu ở một phần của mảng, còn các phần khác thì không.
```
let list: any[] = [1, true, "free"];
list[1] = 100;
```
**8. Viod:** hàm sẽ không trả về giá trị gì:
```
function warnUser(): void {
    alert("This is my warning message");
}
```
sử dụng biến kiểu void là không hữu ích lắm vì bạn chỉ có thể gán 2 giá trị là null và undefined cho biến kiểu void
```
let unusable: void = undefined;
```
**9. Null và Undefined:** Với typescript cả null và unidefined đều là 2 kiểu dữ liệu với tên tuơng ứng.
```
let u: undefined = undefined;
let n: null = null;
```
Mặc định null và unidefined đều là subtype của các kiểu dữ liệu khác, bạn có thể gán null và unidefined cho các biến với các kiểu dữ liệu khác như number, string...
## Kết luận
Như vậy mình cùng các bạn cũng đã tìm hiểu qua về typescript. Do vừa tìm hiểu nên bài viết có nhiều thiếu sót rất mong các bạn thông cảm. Trong bài viết tới chúng ta sẽ cùng nhau tìm hiểu sâu hơn về typescript nhé. Cảm ơn các bạn đã theo dõi.
Bài viết được thao khảo tại:

https://medium.freecodecamp.org/learn-typescript-in-5-minutes-13eda868daeb

https://www.typescriptlang.org/docs/handbook/basic-types.html