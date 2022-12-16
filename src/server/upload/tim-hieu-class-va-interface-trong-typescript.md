Xin chào mọi người, bài viết này tôi xin chia sẻ về cách sử dụng Class và interface trong typescript.
Class và interface là các cấu trúc tiện lợi cho việc lập trình hướng đối tượng, không những thế nó còn dùng để kiểm tra kiểu trong typescript. Một Class như là một cái bản đồ chi tiết về các thuộc tính và phương thức của đối tượng. Còn Interface lại giống như mô tả tổng quan về đối tượng, bao gồm nhóm các thuộc tính và phương thức, nhưng không cung cấp việc triển khai cũng như khởi tạo cho nó.

Vì cả 2 cấu trúc này đều định nghĩa đối tượng trông như thế nào nên được sử dụng trong TypeScript  để nhận dạng các biến. Việc chọn lựa sử dụng Class hay Interface phụ thuộc và mong muốn của bạn: Chỉ dùng để kiểm tra kiểu thì dùng Interface, còn muốn khai báo thêm function thì cần dùng Class.

**1. Using TypeScript class**

ES6 đã giới thiệu `TypeScript ` tăng cường các lớp JavaScript có thêm sức mạnh như kiểm tra kiểu và có thuộc tính `static`. 

Một `Class` là bản vẽ thiết kế nên object sẽ có hình hài và hành động là các thuộc tính và function được implement trong class. Do đó khi ta tạo một instance  của class, ta sẽ nhận được một đối tượng có các thuộc tính đã địng nghĩa và các hàm thực thi. Hãy cùng xem ví dụ: định nghĩa lớp PizzaMaker:

```
class PizzaMaker {
  static create(event: { name: string; toppings: string[] }) {
    return { name: event.name, toppings: event.toppings };
  }
}
```

`PizzaMaker` là một lớp đơn giản, nó có method `static` tên là create. Điều gì làm cho method này trở nên đặc biệt, đó là có thể gọi phương thức này trực tiếp từ class, nó giống như cách gọi này: `Array.from`:

```
const pizza = PizzaMaker.create({
  name: 'Inferno',
  toppings: ['cheese', 'peppers'],
});

console.log(pizza);
// Output: { name: 'Inferno', toppings: [ 'cheese', 'peppers' ] }
```

`PizzaMaker.create()` sẽ trả về một object, với thuộc tính `name` và `toppings ` được địng nghĩa thông qua thuộc tính truyền vào.
Nếu class PizzaMaker không định nghĩ method `create` là static, để dùng method ta cần khởi tạo đối tượng của lớp PizzaMaker.

```
class PizzaMaker {
  create(event: { name: string; toppings: string[] }) {
    return { name: event.name, toppings: event.toppings };
  }
}

const pizzaMaker = new PizzaMaker();

const pizza = pizzaMaker.create({
  name: 'Inferno',
  toppings: ['cheese', 'peppers'],
});

console.log(pizza);
// Output: { name: 'Inferno', toppings: [ 'cheese', 'peppers' ] }
```

Chúng ta đều có được kết quả như nhau ở 2 cách gọi trên. 

*Kiểm tra kiểu

Bây giờ chúng ta sẽ sử dụng khả năng kiểm tra kiểu của `TypeScript `. Định nghĩa lớp `Pizza ` như sau:

```
class Pizza {
  constructor(public name: string, public toppings: string[]) {}
}
```

Trong lớp `Pizza ` chúng ta đã dùng cú pháp thuận tiện của typescript định nghĩa thuộc tính từ các tham số truyền vào. Từ đó ta có thể tạo object từ class Pizza có thuộc tính `name` và `toppings`:

```
const pizza = new Pizza('Inferno', ['cheese', 'peppers']);

console.log(pizza);
// Output: Pizza { name: 'Inferno', toppings: [ 'cheese', 'peppers' ] }
```

Do đó ta có thể sử dụng `Pizza` để check dữ liệu truyền vào. Khi đưa vào class một object thông qua tham số, đối tượng sẽ nhận được sẽ bị giới hạn bởi các thuộc tính đã được địng nghĩa trong class.

```
class Pizza {
  constructor(public name: string, public toppings: string[]) {}
}

class PizzaMaker {
  static create(event: Pizza) {
    return { name: event.name, toppings: event.toppings };
  }
}
```

Sử dụng class `Pizza ` là một cách tuyệt vời để tạo nên một Pizza, nhưng chúng ta chỉ muốn địng nghĩa cấu trúc của pizza mà không cần khởi tạo. Đó là `interface `.


**2.Using TypeScript interface.**


Không giống `class`, `interface` là một cấu trúc ảo chỉ tồn tại trong TypeScript. TypeScript dùng `interface` với mục đích chủ yếu là kiểm tra kiểu.

Trong đoạn code ở ví dụ trên:

```
class PizzaMaker {
  create(event: { name: string; toppings: string[] }) {
    return { name: event.name, toppings: event.toppings };
  }
}
```

Thay vì địng nghĩa rõ cấu trúc của params event là `{ name: string; toppings: string[] }` ta có thể sử dụng `interface` đêt hay thế:

```
interface Pizza {
  name: string;
  toppings: string[];
}

class PizzaMaker {
  static create(event: Pizza) {
    return { name: event.name, toppings: event.toppings };
  }
}
```

Khi gọi method create ta làm như sau:

```
const pizza = PizzaMaker.create({ name: 'Inferno', toppings: ['cheese', 'peppers'] });
```

Như vậy là params truyền vào là `{ name: 'Inferno', toppings: ['cheese', 'peppers'] }` sẽ tự động ép kiểu  thành `Pizza` nên có thể gọi `event.name` và `event.toppings` thoải mái.

**3. Sử dụng class và interface**

Sử dụng bằng cách export class hoặc interface đó, nơi nào cần đến thì sẽ import để sử dụng:

```
export interface Student {
  id: number;
  name: string;
}
```

Khi cần sử dụng:

```
import { Student } from './student.ts';

setStudent(student: Student) {
  this.studentName = student.name;
}
```

Khi build js có thể phát hiện lỗi ép kiểu để thông báo, ví dụ gọi hàm như sau:

```
setStudent({id: 1, age: 8});
````

Khi đó lúc biên dịch sẽ báo lỗi `{id: 1, age: 8} cannot convert to Student`.

Trên đây là bài tìm hiểu của mình về class và interface trong typescript, mong được đóng góp ý kiến của mọi người.