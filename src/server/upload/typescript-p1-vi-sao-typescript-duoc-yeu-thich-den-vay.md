## Trải nghiệm thực tế

Trước khi là một Web Developer, tôi là một Mobile Developer và Java là thứ mà tôi từng theo đuổi. Nhắc đến Java chúng ta đều biết nó là một ngôn ngữ lập trình hướng đối tượng.

Mô hình lập trình hướng đối tượng hầu như được áp dụng trong hầu hết các dự án lớn. Với những ưu điểm mà mô hình này mang lại giúp tăng năng suất, đơn giản hóa việc bảo trì, dễ dàng mở rộng, code dễ đọc dễ hiểu dễ debug hơn...

Tôi yêu thích Java vì mọi thứ đều rõ ràng, dễ đọc, dễ hiểu, dễ debug. Ví dụ như định nghĩa rõ kiểu dữ liệu của biến lúc khởi tạo...

Tôi đã quen việc khai báo biến với java:
```
// Java
private String name;
private int age;
private double gpa;
```

Mọi thứ đều rõ ràng, các biến được khai báo với kiểu dữ liệu cụ thể, nếu gán giá trị có kiểu dữ liệu khác thì trình biên dịch báo lỗi (compile time), điều này giúp tiết kiệm được khá nhiều thời gian và công sức.

Khi chuyển sang làm một Web Developer, làm quen với JavaScript, mới đầu tôi cũng khá bỡ ngỡ về "xin tách" khai báo biến của nó.
```
// JavaScript
var age;
let gpa;
```

À nhìn ngắn gọn đấy, khá thú vị, biến có thể nhận bất kỳ kiểu dữ liệu nào. Đúng là ngôn ngữ hiện đại - ngắn gọn và không yêu cầu phải nhớ nhiều kiểu dữ liệu :scream:

## Vấn đề gặp phải
Trong thực tế, khi làm việc với JavaScript tôi đã gặp một vài trường hợp:
-  Tôi khai báo một biến array, sau quá trình tính toán thì biến này lại có giá trị là string. Đến khi xảy ra lỗi, quay lại điều tra xem từng đoạn code xem giá trị của biến đó là gì.
Mặc dù thấy lỗi này có vẻ đơn giản, nhưng nó tốn khá nhiều thời gian để debug :cry:. Nếu như lỗi sai kiểu dữ liệu này được checking trong thời gian compile time thì sẽ tối ưu thời gian dev rất nhiều.

- Một trường hợp nữa là có nhiều function trong codebase. Khi ai đó vào đọc code, trong trường hợp code không có comment block, họ lại mất thời gian lần mò xem hàm đó trả về gì, kiểu dữ liệu gì? Tham số truyền vào là kiểu gì? Nếu ở vào 1 codebase to và phức tạp thì chưa cần làm đã thấy stress lắm rồi.
- Ở các dự án lớn gọi api các thứ, nhưng trong api docs thì không có cập nhật thông tin chi tiết về api đó, đành phải gọi lại các api để check xem response trả về gồm những gì, kiểu dữ liệu ra sao? Khá mệt phải không, nhưng với TypeScript sẽ phải định nghĩa rõ ràng những thứ đó, người mới vào code chỉ cần xem qua là biết response của api này như nào rồi.
- Hơn nữa khi api trả về response dạng object, nếu sử dụng javascript làm thế nào để biết được object đó có những property nào nhỉ? Lại phải debug object đó ra để xem. Nhưng với TypeScript đã suggest cho chúng ta biết object đó có những property nào để sử dụng (*thông qua định nghĩa interface mình sẽ đề cập ở số sau*), giúp việc code nhanh hơn, tiện hơn.

## TypeScript

Và tôi đã tìm thấy TypeScript - có thể nói nó là một phiên bản nâng cao của JavaScript.

TypeScript là một ngôn ngữ lập trình hướng đối tượng được phát triển bởi Microsoft - được thiết kế hoàn toàn tuân theo khái niệm OOPs (Có vẻ giống như Java rồi đây :yum:)).

Với sự hỗ trợ của TSC (TypeScript Compiler), chúng ta có thể convert TypeScript code (.ts) sang JavaScript (.js). Như vậy bắt đầu và kết thúc của TypeScript cũng chỉ là JavaScript.  Bản chất của nó là convert file ts sang file js thuần để trình duyệt có thể đọc được.

![](https://images.viblo.asia/a2e68875-2d88-424c-99c3-49bf62f307da.png)


Phiên bản đầu tiên (TypeScript 0.8) được phát hành vào năm 2012 bởi Anders Hejlsberg. Và phiên bản mới nhất là [TypeScript 3.0](https://www.typescriptlang.org/) được phát hành vào 07/2018.

#### Ưu/nhược điểm của TypeScript

##### a. Ưu điểm
* Dễ dàng hơn trong phát triển các dự án lớn, được hỗ trợ bởi các Javascript Framework lớn.
* Hầu hết các cú pháp hướng đối tượng đều được hỗ trợ bởi Typescript như kế thừa, đóng gói, constructor, abstract, interface, implement, override…v.v
* Cách tổ chức code rõ ràng hơn, hỗ trợ cơ chế giúp kiến trúc hệ thống code hướng module, hỗ trợ namespace, giúp xây dựng các hệ thống lớn nơi mà nhiều lập trình viên có thể làm việc cùng nhau một cách dễ dàng hơn.
* Hỗ trợ các tính năng mới nhất của Javascript. TypeScript luôn đảm bảo việc sử dụng đầy đủ các kỹ thuật mới nhất của Javascript, ví dụ như version hiện tại là ECMAScript 2015 (ES6).
* Một lợi thế của Typescript nữa là mã nguồn mở vì vậy nó miễn phí và có cộng đồng hỗ trợ rất lớn.
* Với *static typing (kiểm tra lỗi lúc compile time)*, code viết bằng TypeScript dễ dự đoán hơn, và dễ debug hơn.

Typescript đang được sử dụng ở các Framework phổ biến như Angular, Nodejs, VueJs…

##### b. Nhược điểm
Bất kỳ ngôn ngữ nào cũng có điểm yếu và hạn chế của nó, và TypeScript cũng vậy, điểm hạn chế của TypeScript là:
* Bắt buộc dùng biên dịch
* Chỉ là phần ngôn ngữ mở rộng hỗ trợ: Sau cùng vẫn biên dịch về file js.

Tuy nhiên so với những ưu điểm mà TypeScript mang lại thì đây vẫn là một thứ rất thú vị.

#### Các IDE hỗ trợ TypeScript
Hiện nay, rất nhiều IDE hỗ trợ sẵn hoặc thông qua các plugin để hỗ trợ cú pháp của TypeScript, auto-complete suggestions, bắt lỗi và thậm chí tích hợp sẵn trình biên dịch.
* Visual Studio Code – Một trình soạn thảo mã nguồn mở của Microsoft. Hỗ trợ sẵn TypeScipt.
* Plugin cho Sublime Text
* Phiên bản mới nhất của WebStorm cũng hỗ trợ TypeScript
* Và nhiều trình soạn thảo khác như Vim, Atom, Emacs …

## Cài đặt TypeScript

Nói thì sẽ chẳng hiểu được lâu, có lẽ chúng ta phải nhảy vào "cốt" xem mặt mũi nó thế nào nhỉ? À mà trước tiên chúng ta phải cài đặt đã nhỉ.

Cài đặt TypeScript cũng k có gì quá phức tạp. Thông qua [npm](https://www.npmjs.com/get-npm), sử dụng lệnh dưới đây có thể cài đặt TypeScript toàn cục, giúp cho trình biên dịch TypeScript có thể sử dụng trong mọi dự án ([tham khảo](https://www.typescriptlang.org/download)).

```
npm install -g typescript
```

Kiểm tra cài đặt bằng lệnh:

```
tsc -v
```

Thế là chúng ta đã set up xong rồi đó. Trước khi làm cái demo hãy làm ngụm trà đã nhỉ :beers:

Ok... Chúng ta sẽ làm quen với TypeScript thông qua một ví dụ siêu kinh điển trong mọi ngôn ngữ lập trình - HelloWord =))
* Đầu tiên sẽ tạo 1 file đặt tên là HelloWord và có đuôi là .ts -> HelloWord.ts
* Tiếp theo làm vài dòng code nhỉ. Chúng ta chỉ việc dùng JavaScript thuần thôi.
```
let slogan: string = 'Welcome to TypeScript';

console.log(slogan);
```
Ở đây tôi khai báo 1 biến slogan có kiểu dữ liệu là string.

* Okay, tiếp theo chúng ta sẽ biên dịch file .ts này sang file .js. Chạy lệnh sau:
```
tsc HelloWord.ts
```
Và đây là kết quả - tạo ra file HelloWord.js:
![](https://images.viblo.asia/19d46d65-ff07-41d5-9778-10251072f6ad.png)

```
var slogan = 'Welcome to TypeScript';
console.log(slogan);
```

***Tips**: Nếu bạn muốn biên dịch tất cả các file TypeScript bên trong bất kỳ thư mục nào, hãy sử dụng lệnh: tsc  .ts.*

Đó, xong rồi đó, thật đơn giản phải không nào.

À, chúng ta sẽ thay đổi 1 chút nhé, giờ sẽ đổi kiểu dữ liệu của biến slogan từ string thành number. Oops, nó báo lỗi ngay trong thời gian compile time, quá tuyệt vời :wine_glass:

![](https://images.viblo.asia/16c33500-1588-4982-a480-0c8c06086a93.png)

## Kết luận
Hôm nay đến đây thôi nhỉ. Trọng tâm bài viết này tôi muốn chia sẻ với các bạn vấn đề gặp phải khi tôi làm việc JavaScript và giới thiệu đến các bạn một version cao cấp hơn của JavaScript đó là TypeScript.

Còn rất nhiều điều thú vị về TypeScript, nhưng hẹn các bạn ở số tiếp theo nhé!

Cảm ơn các bạn đã đọc.