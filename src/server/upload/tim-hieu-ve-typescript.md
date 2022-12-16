### TypeScript là gì

TypeScript làm một ngôn ngữ lập trình mã nguồn mở được phát triển bởi Microsoft. Cha đẻ của TypeScript là Anders Hejlsberg, một kiến trúc sư trưởng (Lead Architect) của ngôn ngữ C# và là cha đẻ của ngôn ngữ lập trình Delphi và Turbo Pascal.

### Typescript khác với JavaScript thế nào

![](https://images.viblo.asia/cd6eace9-fbbf-4e0b-b8cf-8dc5b567fccd.png)

Có thể nói TypeScript là một phiên bản nâng cao của JavaScript vì nó bổ sung những kiểu dữ liệu tĩnh và các lớp hướng đối tượng, đồng thời nó bao gồm luôn các phiên bản ES mới nhất (tùy version của TypeScript). 

** ES5 = ECAMScript 5 được release năm 2009 <br>
** ES6 = ECAMScript 6 được release năm 2015 <br>
** Hiện tại là ES9 = ECAMScript 2018 là phiên bản Javascript mới nhất tính tại thời điểm mình viết bài này.

2. Các file TypeScript có đuôi (phần mở rộng – extension) là *.ts . Trong khi các file JS có đuôi được biết là *.js

3. Code được viết bằng TypeScript sẽ được biên dịch thành JavaScript thuần. Thường thì chúng ta sẽ dùng lệnh tsc để biên dịch vì trong TypeScript có tích hợp sẵn một trình biên dịch được viết bằng TypeScript luôn.

4. Với TypeScript chúng ta có thể khai báo biến với từ khóa: var, let và const. Trong khi var chỉ được dùng trong JS ( hình như từ ES6 trở đi JavaScript cũng dùng được var, let và const)

5. Các biến trong code TypeScript thường được dùng với kiểu dữ liệu rõ ràng hơn trong code JavaScript.

Ví dụ 1: Khai báo biến trong TypeScript
```php
var name: string = "Thang Pham";
var isSingle: bool = true;
```

Ví dụ 2: Khai báo biến trong JavaScript
```javascript
var name = "Thang Pham";
var isSingle = true;
```

6. TypeScript kiểm tra kiểu của các biến khi biên dịch code (compile time) trong khi JS kiểm tra lúc chạy (run time)

Ví dụ 3: TypeScript kiểm tra kiểu dữ liệu
```javascript
function add(num1: number, num2: number){
    return num1 + num2;
}
add(1, 2); //3
add(1, "hai"); //error
```

Ví dụ 4: JavaScript kiểm kiểu dữ liệu
```javascript
function add(num1: number, num2: number){
    return num1 + num2;
}
add(1, 2); //3
add(1, "hai"); //1hai
```

### Tại sao viết code dùng Typescript thay vì dùng Javascript
1. TypeScript được sử dụng để code Front-end như Angular 2 (và các phiên bản về sau), React, Ionic,… và back-end như NodeJs.
2. TypeScript hỗ trợ đầy đủ các tính năng mà JavaScript có với các phiên bản JavaScript mới nhất (ECMAScript versions) vì như mình đã nói nó được xem như là một bản nâng cao của JS.
3. Bạn có thể code với JS thì với qua TypeScript cũng như vậy. Vì dù sao thì code TypeScript cũng sẽ được biên dịch lại thành JS mà.
4. TypeScript giúp bạn viết code theo phong cách OOP như: C#, Java. Nghĩa là nó có: class, abstract class, interface, encapsulation, ….
5. Dễ dàng hơn để phát triển các dự án lớn vì nó giúp bạn kiến trúc hệ thống theo Module, namespace.
6. Bạn sẽ dễ dàng code TypeScript khi mà nó được tích hợp trong rất nhiều IDEs như: Visual Studio Code, Sublime Text,… 

Đó là những gì mình hiểu về TypeScript. Hy vọng giúp được anh em đang tìm hiểu về TypeScript có được kiến thức nền tảng.

Hãy cho mình biết ý kiến bằng cách comment bên dưới nhé.

[XEM THÊM BÀI VIẾT TẠI ĐÂY](https://thangphampt.wordpress.com/2018/12/12/tim-hieu-ve-typescript/)