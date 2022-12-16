![](https://images.viblo.asia/de90bf02-aa06-462b-86da-6e7973f3e1c8.png)

# Lời mở đầu.
TypeScript được gọi là  một phiên bản nâng cao của JavaScript bởi vì nó bổ sung những tùy chọn kiểu tĩnh và các lớp hướng đối tượng  nhằm mục đích làm cho ngôn ngữ có thể mở rộng và đáng tin cậy hơn.

Nó là mã nguồn mở và đã được Microsoft duy trì kể từ khi họ tạo ra nó vào năm 2012. Tuy nhiên, TypeScript đã có bước đột phá ban đầu như là ngôn ngữ lập trình cốt lõi trong Angular 2. Kể từ đó, nó đã tiếp tục phát triển, cũng như trong cộng đồng React, Vue và NodeJs.

Trong bài viết này mình và bạn sẽ học những kiến ​​thức cơ bản về TypeScript với sự trợ giúp của các ví dụ thực tế.
# I. Install TypeScript.
Trước khi bắt đầu coding, chúng ta cần cài đặt TypeScript trên máy tính của mình. Chúng ta chỉ cần mở terminal và nhập lệnh sau:

`npm install -g typescript`  (chú ý máy tính đã được cài npm nhé :)))

cài đặt xong để kiểm tra đã cài đặt thành công chưa hoặc version của ts thì ta chạy lệnh:

`tsc -v`

# II. Writing some code
Hãy tạo tệp TypeScript đầu tiên của chúng ta và viết những dòng code đơn giản nhất bên trong nó bằng cách. 

Mở IDE hoặc Trình soạn thảo văn bản yêu thích của bạn và tạo một tệp với tên **first.ts **- Đối với tệp TypeScript, chúng tôi sử dụng phần mở rộng **.ts**

Hiện tại, chúng ta sẽ chỉ viết một vài dòng JavaScript cũ đơn giản, vì tất cả mã JavaScript cũng là mã TypeScript hợp lệ:

```
let a = 5;  
let b = 5;  
let c = a + b;

console.log(c);
```

Để chạy được file **.ts** thì chúng ta compile  nó về JavaScript thuần túy. 

# III. Compiling TypeScript.
Để compile file ** .ts** rất đơn giản ta chỉ cần chạy lệnh:

`tsc first.ts`

Lệnh này sẽ giúp biên dịch ra 1 file .js tương ứng.

# IV. Data types.

TypeScript - như tên gọi của nó - là kiểu phiên bản JavaScript. Điều này có nghĩa là chúng ta có thể chỉ định các kiểu cho các biến khác nhau tại thời điểm khai báo. Chúng sẽ luôn giữ cùng một loại dữ liệu trong phạm vi đó.

Typing là một tính năng rất hữu ích để đảm bảo độ tin cậy và khả năng mở rộng. Kiểm tra type giúp đảm bảo mã của chúng tôi hoạt động như mong đợi. Ngoài ra, nó giúp tìm kiếm lỗi và lỗi và ghi lại mã của chúng tôi một cách chính xác.

Cú pháp để gán một kiểu cho bất kỳ biến nào là viết tên của biến theo sau là :dấu, sau đó là tên của kiểu theo sau là =dấu và giá trị của biến.

Có ba kiểu khác nhau trong TypeScript: `any` type, `Built-in`type và `User-defined`type. Chúng ta hãy xem xét từng kiểu 1 nhé.

### 1. Any type - bất kì loại dữ liệu nào.

`Any` là kiểu dữ liệu tập hợp siêu của tất cả các kiểu dữ liệu trong TypeScript. Cung cấp cho bất kỳ biến nào kiểu `any` tương đương với việc  không tham gia kiểm tra kiểu dữ liệu cho biến.
```
let myVariable: any = 'This is a string'
```

### 2. Built-in types - Kiểu dữ liệu được định nghĩa sẵn

Đây là những kiểu được xây dựng trong TypeScript. Chúng bao gồm number, string, boolean, void, null và undefined.
```
let num: number = 5;  
let name: string = 'Alex';  
let isPresent: boolean = true;
```

### 3. User-defined types - Kiểu dữ liệu do người dùng xác định.
Các `User-defined `loại bao gồm `enum`, `class`, `interface`, `array`, và `tuple`. Chúng ta sẽ nhắc về một số loại phổ biến trong bài viết này.


### 4. Object-oriented programming - Lập trình hướng đối tượng

TypeScript hỗ trợ tất cả các tính năng của lập trình hướng đối tượng, chẳng hạn như các lớp và giao diện. Khả năng này là một sự thúc đẩy lớn đối với JavaScript - nó luôn gặp khó khăn với chức năng OOP của mình, đặc biệt là kể từ khi các nhà phát triển bắt đầu sử dụng nó cho các ứng dụng quy mô lớn.

### 5. Class.
Trong lập trình hướng đối tượng, class là khuôn mẫu của các đối tượng. class sẽ định nghĩa một đối tượng sẽ trông như thế nào về các tính năng và chức năng của đối tượng đó. Class cũng đóng gói dữ liệu cho đối tượng.


TypeScript có hỗ trợ tích hợp cho các lớp, không được hỗ trợ bởi ES5 và các phiên bản trước đó. Điều này có nghĩa là chúng ta có thể sử dụng `class` từ khóa để khai báo một cách dễ dàng.

```javascript
class Car {

// fields  
  model: String;  
  doors: Number;  
  isElectric: Boolean;

constructor(model: String, doors: Number, isElectric: Boolean) {  
    this.model = model;  
    this.doors = doors;  
    this.isElectric = isElectric;  
  }

displayMake(): void {  
    console.log(`This car is ${this.model}`);  
  }

}
```

Trong ví dụ trên, chúng ta đã khai báo một class **Car** , cùng với một số thuộc tính của nó, mà chúng ta đang khởi tạo trong constructor. Chúng ta cũng có một phương thức sẽ hiển thị một số thông báo bằng cách sử dụng thuộc tính của nó.

Hãy xem cách chúng ta có thể tạo một phiên bản mới của lớp này như thế nào:
.
```javascript
const Prius = new Car('Prius', 4, true);  
Prius.displayMake(); // This car is Prius
```

Nếu như các bạn đã làm với lập trình hướng đối tượng thì đã quá quen thuộc với các bước trên.

 chúng ta sử dụng từ khóa of `new` và gọi hàm khởi tạo của lớp và chuyển cho nó các thuộc tính. 
 
 Bây giờ đối tượng này `Prius` có đặc tính riêng của mình `model`, `doors` và `isElectric`. Đối tượng cũng có thể gọi phương thức của `displayMake`, phương thức này sẽ có quyền truy cập vào các thuộc tính của Prius.
 
 
 ### 6. Interface.
 
 Khái niệm về interfaces là một tính năng mạnh mẽ khác của TypeScript, cho phép bạn xác định cấu trúc của các biến. Tại nên 1 khuân mẫu  bao gồm những đặc điểm đặc trưng để một đối tượng phải tuân theo.

Interfaces  được mô tả tốt nhất thông qua một ví dụ thực tế. Vì vậy, giả sử chúng ta có một đối tượng là Car:

```javascript
const Car = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}
```

Nếu chúng ta nhìn vào đối tượng ở trên và cố gắng trích xuất signature của nó, nó sẽ là:

```javascript
{  
  model: String,  
  make: String,  
  display(): void  
}
```

Nếu muốn sử dụng lại signature này, chúng ta có thể khai báo dưới dạng interface. Để tạo interface, chúng tôi sử dụng từ khóa `interface`.

```javascript
interface ICar {  
  model: String,  
  make: String,  
  display(): void  
}

const Car: ICar = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}
```

Ở đây, chúng ta đã khai báo một interface được gọi là `ICar` và tạo một đối tượng `Car`. `Car` bây giờ liên kết với `ICar` interface, đảm bảo rằng đối tượng `Car` xác định tất cả các thuộc tính có trong interface.

# Phần kết luận
Tôi hy vọng bài viết này sẽ giúp bạn có cái nhìn sơ lược về cách TypeScript có thể làm cho JavaScript của bạn ổn định hơn và ít bị lỗi hơn.

TypeScript đang là từ khóa rất hot với development tôi cũng đang tiếp cận nó và thấy rất thú vị nên có gì hay ho mong mọi người chía sẻ cho mình nhé. Thanks!!!!!

Link thao khảo:

https://www.freecodecamp.org/news/learn-typescript-in-5-minutes-13eda868daeb/

https://levelup.gitconnected.com/typescript-best-practices-namespaces-exceptions-and-type-definitions-131d85579fa3