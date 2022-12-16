Thời gian gần đây mình đang dần chuyển hướng từ Angular1 sang tìm hiểu và ứng dụng thử Angular2. 

Thời gian có lẽ là đủ để kiểm chứng sự ổn định và hiệu quả mà phiên bản mới này mang lại trong các dự án, nhưng mình nhận được khá nhiều lời khuyên từ các blogger là nên thử tìm hiểu Typescript trước khi học/ứng dụng Angular2 vì nó cho phép chúng ta chọn Javascript thuần hoặc Typescript .
So, here we go!

## 1. Typescript là gì?
TypeScript là một dự án mã nguồn mở được phát triển bởi Microsoft, nó có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript. TypeScript có thể sử dụng để phát triển các ứng dụng chạy ở client-side (Angular2) và server-side (NodeJS).

TypeScript sử dụng tất cả các tính năng và kỹ thuật mới nhất từ ECMAScript. Thực ra TypeScript không phải ra đời đầu tiên mà trước đây cũng có một số thư viện như CoffeScript và Dart được phát triển bởi Google, tuy nhiên điểm yếu là hai thư viện này sư dụng cú pháp mới hoàn toàn, điều này khác hoàn toàn với TypeScript, vì vậy tuy ra đời sau nhưng TypeScript vẫn đang nhận được sự đón nhận từ các lập trình viên.

## 2.Lý do nên sử dụng TypeScript:
Có thể điểm sơ qua một vài điểm mạnh của thanh niên này:
* Dễ phát triển dự án lớn: áp dụng nhiều kỹ thuật mới thì chắc chắn sẽ giúp chúng ta phát triển các dự án lớn dễ dàng hơn
* Nhiều Framework để lựa chọn: chúng ta có thể dùng trong Angular2 trở lên, Ionic . . . Hay sử dụng với các bộ thư viện như ReactJS . . .
* Hỗ trợ các tính năng của Javascript mới nhất
* Là mã nguồn mở: Vì vậy cộng đồng người dùng cũng như hỗ trợ rất đông và hung hãn
* TypeScript cũng là Javascript: như vậy chúng ta có thể chạy Typescript ở bất kì đâu miễn là nó hỗ trợ biên dịch Javascript

## 3.Sự khác nhau nhữaTypeScript và JavaScript:

Đây là code TypeScript
```
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
```


còn đây là Javascript sau khi biên dịch:

```
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

Cú pháp trong sáng mạch lạc và mang tính hướng đối tượng cao là những gì chúng ta có thể dễ dàng nhận thấy qua ví dụ ở trên.

## 4. Cài đặt TypeScript như thế nào?
Đầu tiên phải install nodejs trước 

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```


Sau đó là cài đặt TypeScript

```
npm install -g typescript
```



Để compile và tạo ra file cn.js thì làm như sau:
```
tsc cn.ts
```


## 5.Thử demo code TypeScript trong 5 phút nào
Đầu tiên tạo 1 file greeter.ts, sưr dụng code Javascript bình thường:

```
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```


Sau đó compile:
```
tsc greeter.ts
```


Kết quả chúng ta sẽ nhận được 1 file greeter.js chứa tất cả code js mà cúng ta đã viết ở trên. Bây giờ chúng ta bắt đầu thêm mắm dặm muối vào đoạn code, và biến nó thành TypeScript.
Thêm anotation : string vào argument "person" 


```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```


Giờ thử đưa 1 cái mảng vào user xem sao:


```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```


Chúng ta sẽ nhận được lỗi này sau khi compile lại, và kể cả có lỗi thì chúng ta vẫn nhận được file greeter.js
```
error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

Tương tự, nếu chúng ta bỏ argument lúc gọi greeter thì TypeScript cũng sẽ báo cho bạn rằng bạn đang gọi hàm không đúng số lượng params. Như vậy Typescript sẽ dựa trên cả cấu trúc code của bạn, lẫn anotation mà bạn thêm vào.

## 6.Interfaces và Class trong TypeScript:
Mình sẽ chỉ tập trung giới thiệu phần này, còn các cú pháp hay các khái niệm cơ bản khác thì có khá nhiều bài viết trên mạng, nếu mà thêm vào đây thì dài dòng quá .

* Interfaces:


```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```



Cái này chắc không phải giải thích nhiều nữa nhỉ

* Classes:
Bây giờ mở rộng đoạn code ở trên với class nào. TypeScript hỗ trợ nhiều tính năng mới trong js, điển hình là việc hỗ trợ OOP class-based.
Bây giờ chúng ta tạo 1 class Student với cóntructor và 1 vài thuộc tính public. Chú ý rằng classes và interfaces "chơi" tốt với nhau, lập trình viên là người quyết định level abstraction

```
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```


sau khi compile thì chúng ta sẽ nhận được 1 đoạn code js giống ban đầu. Class trong TypeScript chỉ là 1 cách viết ngắn của prototype-based OO thường được sử dụng trong js.

## 7.Kết luận
Trong phạm vi bài viết mình chỉ muốn giới thiệu khái niệm TypeScript là gì và mối liên hệ giữa TypeScript và Javascript, hy vọng bài này sẽ giúp ích cho các bạn. 

Hẹn gặp lại ở 1 bài 30' nâng cao( nếu mình có thời gian) với TypeScript

Các bạn có thể tham khảo thêm ở trang chủ của [TypeScript](http://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)