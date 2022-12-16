Ở phiên bản [0.9](https://devblogs.microsoft.com/typescript/announcing-typescript-0-9/#typescript-0-9-language), Typescript đã bổ sung tính năng Generic, vốn là một trong những tính năng được yêu cầu nhiều nhất bởi người dùng Typescript. 

Về cơ bản, Generic cho phép ta kiểm soát mối liên hệ về kiểu giữa dữ liệu Input và Output.

Cùng xem qua 1 ví dụ kinh điển của Generic, hay còn gọi là ví dụ **"hello world" of generics**.

# 1. Hello World of Generics
Đó chính là **identity function**. Identity function là một hàm sẽ trả về bất cứ thứ gì nó được nhận vào. Có thể xem nó tương tự như hàm `echo`.

Nếu không có **generics**, chúng ta hoặc là phải chỉ định cụ thể *type* của tham số truyền vào:

```js
function identity(arg: number): number {
  return arg;
}
```

Hoặc chúng ta sẽ để nó nhận vào type **any**:

```js
function identity(arg: any): any {
  return arg;
}
```

Ở đây, việc sử dụng *any* đã đáp ứng yêu cầu **generic**, nghĩa là nó đáp ứng được việc function của chúng ta sẽ chấp nhận những tham số thuộc nhiều *type* khác nhau, không cụ thể một *type* nào cả, **not specific** :smiley:

Nhưng, một vấn đề xảy ra là chúng ta đã mất đi thông tin về type khi function trả dữ liệu về :hankey: khi  chúng ta truyền vào một number, thông tin duy nhất mà chúng ta có được là any type có thể được trả về :hankey: 

Điều này sẽ phá vỡ sự liên kết tĩnh về type của toàn ứng dụng, chúng ta cần tạo ra 1 sự liên kết ở đây. Đây chính là lúc ta cần tính năng Generic được giới thiệu ở phiên bản [0.9](https://devblogs.microsoft.com/typescript/announcing-typescript-0-9/#typescript-0-9-language) của Typescript.

Về ý tưởng, chúng ta sẽ cần 1 cơ chế để nắm giữ được type của dữ liệu truyền vào, và từ đó lắp vào type cho dữ liệu trả về, **giữ cho dòng chảy type được xuyên suốt** trong program. :joy:

Generic sẽ có syntax trong như sau:

```ts
function identity<Type>(arge: Type): Type {
  return arg;
}
```

Ở đây, chúng ta sử dụng một **type variable**, nó là một loại biến đặc biệt, chủ yếu làm việc với types thay vì với values.

> Ngoài lề 1 tí là code của chúng ta sẽ trở nên dài dòng hơn khi sử dụng Generic :nauseated_face:, thoạt nhìn vào trông rất rườm rà, cồng kềnh, nhưng... 

Chúng ta đã thêm một type variable `Type` vào cho indentity function, rồi ta sử dụng nó cho type tham số truyền vào là type của dữ liệu trả về. Điều này sẽ cho phép ta **lưu thông về type của dữ liệu từ đầu này sang đầu kia của 1 function**. :relaxed:

> Tôi không cần biết bạn truyền vào giá trị có kiểu gì, chỉ biết cái kiểu đó sẽ được trả về. Khác với "any" - bất cứ thứ gì cũng có thể trả ra.

Tại đây, chúng ta có thể nói, phiên bản này của identity function là generic, bởi về nó có thể làm việc với nhiều type khác nhau, không cụ thể (specific) một type duy nhất. Nhưng không như phiên bản sử dụng **any**, phiên bản này đã trở nên thông minh hơn, nó không để bị rơi rớt mất thông tin liên quan type của dữ liệu.

# 2. Use Generic function
Có 2 cách để sử dụng generic functions.

Cách 1: là truyền tất cả tham số vào cho function, bao gồm cả **type argument**:
```js
let output = identity<string>("myString")
```

Ở đây, chúng ta đã tường minh chỉ ra `Type` có giá trị `string`, sử dụng dụng cặp ký tự `<>` bên cạnh cú pháp gọi hàm thông thường `()`.

Cách 2: và cũng đồng thời là cách phổ biến nhất. Chúng ta sẽ sử dụng **type argument inference** - đó là để cho Compiler tự động xác định giá trị của `Type` giúp chúng ta, dựa vào giá trị ta truyền vào.
```js
let output = identity("myString")
```

Với cách này, code của chúng ta sẽ ngắn gọn hơn, tuy nhiên, type inference có thể sẽ không thể được thực hiện trong một số trường hợp phức tạp.


-----
**Reference**: https://www.typescriptlang.org/docs/handbook/2/generics.html