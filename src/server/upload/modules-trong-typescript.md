Kể từ ES6, JavaScript bắt đầu hỗ trợ các modules như một phần của ngôn ngữ. TypeScript chia sẻ các khái niệm module giống với JavaScript.<br>
Một module trong TypeScript có chứa cả khai báo và code. Một module thực thi trong phạm vi riêng của nó, không phải trong phạm vi toàn cục. Điều đó có nghĩa là khi bạn khai báo các biến, hàm, lớp, giao diện, v.v., trong một module, chúng không hiển thị bên ngoài module, trừ khi bạn xuất chúng một cách rõ ràng bằng cách sử dụng câu lệnh **export** .<br>
Mặt khác, nếu bạn muốn truy cập các biến, hàm, lớp, v.v., từ một module, bạn cần nhập chúng bằng cách sử dụng câu lệnh **import** .<br>
### Creating a new module
Code bên dưới tạo một module gọi là **Validator.ts** và khai báo interface với tên là **Validator** :<br>
```TypeScript
export interface Validator {
    isValid(s: string): boolean
}
```
Trong module này, chúng ta đặt từ khóa **export** trước từ khóa **interface** để các modules có thể sử dụng nó.<br>
Nếu bạn không sử dụng từ khóa **export** , thì interface **Validator** sẽ là kiểu private trong **Validator.ts**, do đó, bạn không thể sử dụng từ các modules khác.<br>
### Export statements
Để xuất một khai báo từ một module, ta sử dụng câu lệnh **export** . Ví dụ:<br>
```TypeScript
interface Validator {
    isValid(s: string): boolean
}

export { Validator };
```
TypeScript  cũng cho phép bạn thay đổi tên khái báo module như dưới:<br>
```TypeScript
interface Validator {
    isValid(s: string): boolean
}

export { Validator as StringValidator };
```

### Importing a new module
Để sử dụng một module, bạn sử dụng câu lệnh **import**. Ví dụ bên dưới tạo một module **EmailValidator.ts** và module này sử dụng module **Validator.ts**.<br>
```TypeScript
import { Validator } from './Validator';

class EmailValidator implements Validator {
    isValid(s: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(s);
    }
}

export { EmailValidator };
```
Khi bạn nhập một module, bạn có thể đổi tên nó như sau:<br>
```TypeScript
import { Validator as StringValidator } from './Validator';
```
Bên trong module **EmailValidator** , bạn có thể sử dụng interface **Validator** với tên thay thế là **StringValidator**  :<br>
```TypeScript
import { Validator as StringValidator } from './Validator';

class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(s);
    }
}

export { EmailValidator };
```

Ví dụ sau minh họa cách sử dụng module **EmailValidator** trong tệp **App.ts**:<br>
```TypeScript
import { EmailValidator } from './EmailValidator';

let email = 'john.doe@typescripttutorial.net';
let validator = new EmailValidator();
let result = validator.isValid(email);

console.log(result);
```
Output:<br>
```TypeScript
true
```
### Importing types
Code bên dưới khai báo một type gọi trong module **Types.ts** :<br>
```TypeScript
export type alphanumeric = string | number;
```
Để import type alphanumeric từ module **Types.ts**, bạn sử dụng câu lệnh **import type**:<br>
```TypeScript
import type {alphanumeric} from './Types';
```
Lưu ý rằng TypeScript đã hỗ trợ câu lệnh nhập từ phiên bản 3.8. Trước TypeScript 3.8, bạn cần sử dụng câu lệnh **import** để thay thế:<br>
```TypeScript
import {alphanumeric} from './Types';
```
### Importing everything from a module
Để nhập mọi thứ từ một module, bạn sử dụng cú pháp sau:<br>
```TypeScript
import * from 'module_name';
```
### Re-exports
Sau đây tạo một module mới có tên **ZipCodeValidator.ts** sử dụng mô-đun **Validator.ts**:<br>
```TypeScript
import { Validator } from './Validator';

class ZipCodeValidator implements Validator {
    isValid(s: string): boolean {
        const numberRegexp = /^[0-9]+$/;
        return s.length === 5 && numberRegexp.test(s);
    }
}

export { ZipCodeValidator };
```

Bạn có thể gộp các module EmailValidator và ZipCodeValidator trong một module mới bằng cách kết hợp tất cả các lần exports của chúng theo cú pháp sau:<br>
```TypeScript
export * from 'module_name';
```
Ví dụ sau minh họa cách gộp các module EmailValidator.ts và ZipCodeValidator.ts trong module FormValidator.ts:<br>
```
export * from "./EmailValidator";
export * from "./ZipCodeValidator";
```
### Default Exports
Ví dụ:<br>
```TypeScript
import { Validator } from './Validator';

export default class ZipCodeValidator implements Validator {
    isValid(s: string): boolean {
        const numberRegexp = /^[0-9]+$/;
        return s.length === 5 && numberRegexp.test(s);
    }
}
```
Để import  một bản default export, bạn sử dụng một cú pháp **import**  như sau:<br>
```TypeScript
import default_export from 'module_name';
```
Sau đây là cách sử dụng default export từ **ZipCodeValidator** trong tệp **App.ts**:<br>
```TypeScript
import ZipCodeValidator from './ZipCodeValidator';

let validator = new ZipCodeValidator();
let result = validator.isValid('95134');

console.log(result);
```
Output:<br>
```
true
```

**Tóm tắt**:<br>
- TypeScript chia sẻ cùng một khái niệm module với module ES6. Một module có thể chứa cả khai báo và code.
- Trong một module, các biến, hàm, lớp, giao diện, v.v., thực thi trên phạm vi riêng của nó, không phải phạm vi toàn cục.
- Sử dụng câu lệnh **export**  để **export** các biến, hàm, lớp, giao diện, kiểu, v.v., từ một module.
- Sử dụng câu lệnh **import**  để truy cập các **exports** từ các mô-đun khác.