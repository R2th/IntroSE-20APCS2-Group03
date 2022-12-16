Mình xin chia sẻ 3 tips mà mình thấy rất hữu dụng cho dev khi dùng Typescript.

- Hạn chế import quá nhiều  interfaces.
- Sử dụng các thuộc tính của interface là optional
- Stop throwing me error, I know what I'm doing
Những tips này tôi đã phát hiện ra trong quá trình sử dụng angular nhưng nó áp dụng được cho typescript chứ không chỉ angular.

**1. Hạn chế import quá nhiều  interfaces.**

Tôi thích sử dụng interface. Tuy nhiện tôi không thích import chúng mọi lúc. Mặc dù Visual Studio có chức năng auto import, nhưng tôi thực sự khó chịu khi thấy code có một đống lines import.
Đây là ví dụ mà chúng ta thường sử dụng.

```
// api.model.ts
export interface Customer {
    id: number;
    name: string;
}

export interface User {
    id: number;
    isActive: boolean;
}
```

```
// using the interfaces
import { Customer, User } from './api.model'; // this line will grow longer if there's more interfaces used

export class MyComponent {
    cust: Customer; 
}
```

**Solution 1: Using namespace**

Bằng cách sử dụng namespace, chúng ra có thể hạn chế việc import interface nhiều.

```
// api.model.ts
namespace ApiModel {
    export interface Customer {
        id: number;
        name: string;
    }

    export interface User {
        id: number;
        isActive: boolean;
    }
}
```

```
// using the interfaces
export class MyComponent {
    cust: ApiModel.Customer; 
}
```

Có vẻ tốt hơn nhỉ. Sử dụng namespace cũng giúp chúng ta tổ chức và quản lý các interface tốt hơn. Chú ý là bạn có thể chia thành nhiều namespace trên nhiều files khác nhau.

Giả sử bạn có một tệp khác là api.v2.model.ts. Bạn định nghĩa interfacem mới nhưng bạn muốn sử dụng cùng một namespace.

```
// api.v2.model.ts
namespace ApiModel {
    export interface Order {
        id: number;
        total: number;
    }
}
```

Để sử dụng interface mới vừa tạo, bạn sử dụng chúng giống như ví dụ trước như sau:

```
// using the interfaces with same namespaces but different files
export class MyComponent {
    cust: ApiModel.Customer; 
    order: ApiModel.Order;
}
```

Here is the detail documentation on Typescript namespacing.

**Solution 2: Using d file**

Có một cách khác để loại bỏ việc import là tạo một file typescript với đuôi .d.ts. `d` được hiểu là sẽ tự động export và có thể dụng mọi chỗ trong project.

```
// api.model.d.ts
// you don't need to export the interface in d file
interface Customer {
    id: number;
    name: string;
}
``` 

Và sau đó sử dụng chúng một cách bình thường.

```
// using the interfaces of d file
export class MyComponent {
    cust: Customer; 
}
```

Tôi khuyên bạn sử dụng cách 1 bởi vì:

- d file thường sử dụng cho bên thứ 3
-  name space cho phép bạn sử dụng và tổ chức file rõ ràng hơn.

**2. Sử dụng các thuộc tính của interface là optional**

Việc này khác phổ biến khi bạn dùng interface để mô tả cấu trúc cho các đối tượng, có thể là cho CRUD. Giả sử bạn có 1 interface Customer, khi tạo thì tất cả các trường là bắt buộc còn khi update thì không bắt buộc tất cả. Như vậy bạn có cần phải địng nghĩa 2 interface cho 2 trường hợp không, câu trả lời là không.

Đây là interface Customer.

```
// api.model.ts
export interface Customer {
    id: number;
    name: string;
    age: number;
}
```

**Solution: Use Partial**

Partial là một kiểu thuộc tính của đối tượng mang tính tùy chịn. Việc địng nghĩa này được tích hợp mặc địng trong file lib.es5.d.ts.

```
// lib.es5.d.ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

Chúng ta có thể sử dụng như sau:

```
// using the interface but make all fields optional
import { Customer } from './api.model';

export class MyComponent {
    cust: Partial<Customer>;  /

    ngOninit() {
        this.cust = { name: 'jane' }; // no error throw because all fields are optional
    }
}
```

**3. Stop throwing me error, I know what I'm doing**

Giống như Javascript, đôi khi lỗi xảy ra trên typescript khiến bạn cảm thấy bị phiển. Trong nhiều trường hợp, bạn muốn nói với Typescript: "hey, tôi biết tôi đang làm gì, làm ơn để tôi yên".

**Solution: Use @ts-ignore comment**

Từ Typescript version 2.6, bạn có thể làm vậy bằng cách thêm comment @ts-ignore để tránh việc raise lỗi.

Ví dụ, Typescript sẽ throw lỗi "Unreachable code detected"  trong đoạn code sau:

```
if (false) {
    console.log('x');
}
```

Bạn có thể cấm khẩu nó bằng cách thêm comment @ts-ignore.

```
if (false) {
    // @ts-ignore
    console.log('x');
}
```

Dĩ nhiên, tôi khuyến cáo bạn nên luôn luôn fix lỗi sau khi sử dụng chức năng này.