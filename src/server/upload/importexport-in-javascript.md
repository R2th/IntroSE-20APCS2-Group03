Bài viết này của mình sẽ hướng dẫn mọi người cách dùng import/export trong javascript.

### Khai báo bằng Export 

   Dùng `export` trước khai báo biến
   
   ```
   // export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
      constructor(name) {
        this.name = name;
      }
}
```

Sau khai báo Function, Class thì không sử dụng dấu `;` :

```
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // no ; at the end
```

### Export phần được khai báo

Đầu tiên chúng ta khai báo, sau đó `export`:

```
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
```

### Import  *

 Chúng ta lấy ra danh sách những gì cần bằng cách sử dụng `import { ... }`:
 
```
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Nhưng nếu có nhiều thứ cần `import` , chúng ta có thể `import` mọi thứ dưới dạng object `import * as <obj>`:

```
// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```

`import mọi thứ` nge có vẻ rất tuyệt, cú pháp ngắn vậy tai sao chúng ta nên liệt kê rõ ràng những gì cần import  `import { ... } `, đây là một vài lý do:
* Các công cụ build (webpack, ...) kết hợp các modules lại với nhau và tối ưu hóa chúng để tăng tốc độ tải và loại bỏ những thứ không sử dụng. Trong `say.js` có nhiều functions: 

    ```
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```
    
    Bây giờ chúng ta chỉ muốn sử dụng 1 function trong `say.js`:
    ```
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    Sau đó, trình tối ưu hóa sẽ thấy điều đó và loại bỏ các chức năng khác khỏi mã được đóng gói, do đó làm cho bản dựng nhỏ hơn. Cái đó được gọi là `tree-shaking`.
    
 * tên ngắn hơn `sayHi()` thay vì `say.sayHi()`.
 * Sử dụng `import { ... } ` cung cấp tổng quan tốt hơn về cấu trúc code: những gì được sử dụng và ở đâu, làm cho code dễ sử dụng và refactoring hơn.

### Import as

Chúng ta có thể sử dụng `as` để import dưới một cái tên khác.

```
// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

### Export as

Tương tự như cú pháp `import`: 

```
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

### export default

Chủ yếu có hai loại Modules.

Các modules có chứa một thư viện, gói các hàm, như `say.js` ở trên.
Các modules khai báo một thực thể duy nhất, ví dụ: một modules `user.js` chỉ export class User.

Modules cung cấp cú pháp `export default` để làm 'một điều trên mỗi module'.

Đặt `export default` trước thực thể cần export:

```
// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
```
Ở đây chỉ có 1 `export default` trên mỗi file, và sau đó import mà không cần dấu ngoặc nhọn:

```
// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');
```

Import không có dấu ngoặc nhọn trông đẹp hơn. Một lỗi phổ biến khi bắt đầu sử dụng các modules là quên dấu ngoặc nhọn ở mọi trường hợp. Vì vậy, hãy nhớ rằng, import cần các dấu ngoặc nhọn cho export có tên và không cần chúng cho mặc định.

vd:

Name export : 
```
export class User {...}  
import {User} from ...
```

Default export: 
```
export default class User {...}
import User from ...
```

(to be continue)