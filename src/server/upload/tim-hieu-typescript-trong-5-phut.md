![](https://images.viblo.asia/94df91ba-9028-4929-a519-9ad7e11a1587.png)
# Giới thiệu
`TypeScript` là một superset của JavaScript, nhằm giúp cho JavaScript có thể mở rộng và đáng tin cậy hơn.
TypeScript là mã nguồn mở và đã được Microsoft duy trì kể từ khi họ tạo ra nó vào năm 2012. Tuy nhiên, TypeScript đã có bước đột phá ban đầu của nó như là ngôn ngữ lập trình cốt lõi trong Angular 2. Nó đang tiếp tục phát triển giống như React và Vue.

Trong bài viết này, mình sẽ cùng các bạn tìm hiểu các khái niệm cơ bản của TypeScript qua các ví dụ thực tế.

Cùng bắt đầu nào!

# Cài đặt TypeScript
Trước khi bắt đầu code, chúng ta cần phải cài đặt TypeScript:
```sh
npm install -g typescript
```
Sau khi cài đặt, chúng ta có thể kiểm tra xem TypeScript đã được cài đặt thành công hay chưa bằng cách chạy lệnh `tsc -v`, nó sẽ hiển thị phiên bản của TypeScript đã được cài đặt.

![](https://images.viblo.asia/675cd48d-d4b3-4204-b1c3-eca421f94613.png)

# Code những dòng đầu tiên
Hãy tạo file TypeScript đầu tiên của bạn và bắt đầu code.
Đối với các file TypeScript, chúng ta lưu đuôi `.ts` nhé.
Tạo file `hello.ts`.
Bây giờ, mình sẽ viết một vài dòng JavaScript thuần cũ, vì tất cả code JavaScript cũng là code TypeScript hợp lệ:
```js
let x = 1;
let y = 2;
let z = x + y;
console.log(z);
```
Bước tiếp theo là biên dịch TypeScript thành JavaScript thuần, vì trình duyệt cần file `.js` để đọc.
# Biên dịch TypeScript
Để biên dịch TypeScript sang Javascript, chúng ta sẽ chạy lệnh `tsc hello.ts`. Bản chất của nó là convert file ts sang file js thuần để trình duyệt có thể đọc được.
Vì vậy, mở terminal ở vị trí của file `hello.ts` và chạy lệnh sau:

![](https://images.viblo.asia/6f941f51-3dbe-46f4-9c9c-a23c50781998.png)

Sau khi chạy lệnh, chúng ta sẽ thấy 1 file `hello.js` sinh ra như thế này:

![](https://images.viblo.asia/623b218e-16cf-4bc8-a86f-5ad56bf4f0a8.png)

Kết quả khi chạy file `hello.js` ở đoạn code bên trên là: `3`.

**Mẹo:** Nếu bạn muốn biên dịch tất cả các file TypeScript bên trong bất kỳ thư mục nào, hãy sử dụng lệnh: `tsc * .ts`.

# Data types
TypeScript - giống như tên gọi của nó - là phiên bản kiểu dữ liệu (typed) của JavaScript. Điều này có nghĩa là chúng ta có thể chỉ định kiểu cho các biến khác nhau tại thời điểm khai báo. Nó sẽ luôn giữ 1 kiểu dữ liệu trong phạm vi (scope) đó.

Kiểu dữ liệu là một tính năng rất hữu ích để đảm bảo độ tin cậy và khả năng mở rộng code sau này. Nó giúp đảm bảo code của chúng ta hoạt động như mong đợi. Ngoài ra, nó giúp tìm kiếm lỗi, và log lại lỗi.

Cú pháp để gán một kiểu cho biến bất kỳ là viết tên của biến sau đó là dấu `:`, sau đó là tên của kiểu, tiếp theo là dấu `=` và giá trị của biến.

Có ba kiểu khác nhau trong TypeScript: kiểu bất kỳ (**any type**), các kiểu dựng sẵn (**Built-in types**) và các kiểu do người dùng tự định nghĩa (**User-defined types**). Hãy tìm hiểu mỗi về từng kiểu dữ liệu này.

## any type
Kiểu dữ liệu `any` là kết hợp của tất cả các kiểu dữ liệu trong TypeScript.
```js
let myVariable: any = 'Hello World'
```

## Built-in types
Đây là những kiểu dữ liệu được xây dựng trong TypeScript, bao gồm: `number`, `string`, `boolean`, `void`, `null` và `undefined`.
```js
let memberCount: number = 100;
let memberName: string = 'Tien Dat Duong';
let isAdmin: boolean = true;
```

## User-defined types
Các kiểu dữ liệu do người dùng định nghĩa bao gồm: `enum`, `class`, `interface`, `array` và `tuple`. 

Chúng ta sẽ tìm hiểu một số type trong số này sau nhé. Hôm nay mình chỉ giới thiệu với các bạn 2 type chúng ta hay sử dụng: `class` và `interface`.

# Lập trình hướng đối tượng
TypeScript hỗ trợ tất cả các tính năng của lập trình hướng đối tượng, chẳng hạn như `class` và `interface`.

Chức năng này là một sự phát triển rất lớn đối với JavaScript. Bởi vì trước đây nó luôn gặp khó khăn với OOP, đặc biệt là khi các nhà phát triển bắt đầu sử dụng nó cho các dự án quy mô lớn.

## Class
Trong lập trình hướng đối tượng, một lớp là khuôn mẫu của các đối tượng. Một lớp sẽ xác định đối tượng sẽ có thuộc tính và chức năng gì. Một lớp cũng đóng gói dữ liệu cho đối tượng.

Trong ES5 và các phiên bản trước đó, TypeScript không tích hợp class. Nhưng ở các phiên bản sau này thì đã có rồi.
```js
class Member {
  // fields
  id: Number;
  name: String;
  isAdmin: Boolean;
  constructor(id: Number, name: String, isAdmin: Boolean) {
    this.id = id;
    this.name = name;
    this.isAdmin = isAdmin;
  }
  show(): void {
    console.log(`Day la thanh vien ${this.name}`);
  }
}
```
Trong ví dụ trên, chúng ta đã khai báo một lớp `Member`, cùng với một số thuộc tính của nó được khởi tạo bởi function `constructor` và function `show` để hiển thị tên của member.

Chúng ta có thể tạo 1 object mới của class này như sau:
```js
const newMember = new Member(1, 'Dat', true);
newMember.show(); // Day la thanh vien Dat
```
Sau khi tạo object `newMember`, nó cũng sẽ có đầy đủ các thuộc tính như `id`, `name`, `isAdmin` và có method `show()` có quyền truy cập vào các thuộc tính của `newMember`.

Kết quả mình chạy file `hello.js` sẽ là dòng chữ:`Day la thanh vien Dat`

![](https://images.viblo.asia/5b24d605-3510-46e2-9acd-dd4b4a3e0232.png)

## Interface
Interface là một tính năng mạnh mẽ khác của TypeScript, cho phép bạn xác định cấu trúc của các biến. Một interface chứa các phương thức mà một đối tượng bắt buộc phải tuân thủ.
```js
interface House {
  address: String,
  acreage: Number,
  show: () => void
}
const MyHouse: House = {
  address: 'Hanoi',
  acreage: 50,
  show: (): void => { console.log(`Tim hieu ve TypeScript tai Framgia`); }
}

console.log(MyHouse.address, MyHouse.acreage, MyHouse.show());
```
Ở đây, chúng ta đã khai báo một interface được `House` và tạo một object `MyHouse`. `MyHouse` bây giờ ràng buộc với interface `House` (giống implement), đảm bảo rằng object `MyHouse` đều có tất cả các thuộc tính của interface.

Kết quả mình chạy file `hello.js`:
![](https://images.viblo.asia/ac18b54e-6ac6-48bf-bd60-8cf5f1903162.png)

# Kết luận
Qua bài viết này, mình hy vọng có thể giúp cho bạn có một cái nhìn cơ bản nhất về TypeScript và cách nó có thể làm cho JavaScript của bạn chạy ổn định hơn và ít bị lỗi, với 1 cấu trúc chặt chẽ, rõ ràng hơn.

TypeScript đang trên đà phát triển nhanh trong thế giới phát triển web. Cũng có một số lượng lớn các dev React đang áp dụng nó.

TypeScript chắc chắn là một ngôn ngữ đáng để học cho các dev front-end trong năm 2018.

# Tham khảo
https://medium.freecodecamp.org/learn-typescript-in-5-minutes-13eda868daeb
https://medium.freecodecamp.org/want-to-learn-typescript-heres-our-free-22-part-course-21cd9bbb5ef5
https://www.tutorialspoint.com/typescript/typescript_interfaces.htm