Lúc mới học JS, mình chỉ biết mỗi một kiểu cơ bản nhất là:
```calculator.js
function add(a, b) {
    return a + b;
}
```

```index.html
<!DOCTYPE html>
<html lang="en">
<body>
    <script src="calculator.js"></script>
    <script>
        console.log(add(4, 6)) // 10
    </script>
</body>
</html>
```

Đúng vậy, khi cần tách code, cứ nhóm tất cả các hàm liên quan với nhau vào một file, khi cần lôi các hàm ra dùng thì nhúng file này vào trang HTML bằng thẻ `<script>`, quá ez luôn. Nhưng khi bắt đầu ra lăn lộn giang hồ + sự tiến hóa không ngừng của công nghệ, mình gặp phải nhiều cú pháp ngoài hình tinh để tách code, cũng bị xoắn não và mệt mỏi lắm mới có thể nắm bắt được. Nên trong bài viết này, mình xin tổng hợp và chia sẻ **các kiểu khai báo module** phục vụ việc tách code và cách phân biệt từng kiểu để dễ nhớ.

Bài viết sẽ không nói về khái niệm "Module là gì?" hay "Sao phải sử dụng module?", bởi vì đã có nhiều bài viết trả lời những câu hỏi này, và mình nghĩ chắc nhiều bạn cũng như mình, chả thể nuốt nổi ba cái lý thuyết nếu không ứng dụng thực tế để thật sự hiểu và tự trả lời cho mấy câu hỏi trên.

# Các kiểu khai báo
## 1. IIFE
Viết tắt của **Immediately Invoked Function Expression**, hiểu đơn giản là "tạo hàm, gọi liền". Đây là kỹ thuật sơ khai nhất được các bậc tiền nhân phát minh và vẫn đang được sử dụng rộng rãi cho các bộ compiler/bundler như Babel, Webpack, Rollup... nhằm chuyển các cú pháp khai báo module hiện đại về code JavaScript thuần (< ES6). Nếu các bạn đọc source của jQuery, thư viện từng thống trị một thời, thì sẽ thấy nhiều đoạn cũng sử dụng IIFE. Cú pháp có dạng như sau:

```js
(function() {
    // code
})();
```

Nhìn có vẻ hack não bởi cả đống ngoặc, nhưng nếu viết dạng tương đương dưới đây chắc bạn dễ nhìn hơn:

```js
function add() {
    // code
}
add();
```

Như các bạn thấy, hàm `add()` sau khi tạo liền được gọi, để hiểu rõ nữa thì các bạn chịu khó search bài viết khác nhé, mình quay lại với cách khai báo module. **IIFE** giúp ẩn các code được xử lý bên trong và chỉ xuất ra những gì mà chúng ta muốn. Ví dụ:

```js
var text = (function() {
    var privateText = "Text không thể truy cập!";
    var publicText = "Text được phép truy cập!"
    return publicText;
})();
console.log(text); // Text được phép truy cập!
```

Một ví dụ phức tạp hơn:

```js
var calculator = (function() {
    function add(a, b) {
        return a + b;
    }
    function subtract(a, b) {
        return a - b;
    }
    function divide(a, b) {
        return a / b;
    }
    return {
        add: add,
        subtract: subtract,
    };
})();
console.log(calculator.add(2, 2)); // 4
console.log(calculator.subtract(2, 2)); // 0
console.log(calculator.divide(2, 2)); // Xảy ra lỗi vì hàm "divide" không được xuất ra ngoài
```

## 2. CJS
Viết tắt của **CommonJS**. Dân chơi hệ back-end, đặc biệt là những ai hay sử dụng NodeJS chắc hẳn không lạ gì với cái tên này. Xuất hiện lần đầu với tên gọi **ServerJS** thay vì CommonJS như bây giờ, nghe tên là biết ngay mục tiêu của dự án là nhắm vào một hệ sinh thái module dành cho JavaScript phía back-end, CommonJS đến nay vẫn đang gắn bó thân thiết với một số nền tảng phổ biến như NodeJS, MongoDB... Ví dụ cách khai báo module bằng CJS:

```calculator.js
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
module.exports = {
    // những gì cần xuất ra ngoài được đặt trong này
    add: add,
    subtract: subtract,
};
```

```index.js
// dùng "require" để load module "calculator.js" (phần đuôi .js có thể được lược bỏ)
var calculator = require("./calculator");
console.log(calculator.add(2, 2)); // 4
console.log(calculator.subtract(2, 2)); // 0
```

## 3. AMD
Viết tắt của **Asynchronous Module Definition**. Như tên gọi, nhiệm vụ của AMD là quy định kiểu khai báo cho module và load *bất đồng bộ* các dependency của module đó nếu có. Do đó, trái với CJS, AMD sinh ra để dành cho dân chơi hệ front-end. Cú pháp đầy đủ có dạng như sau:

```js
define(id?, dependencies?, factory);
```

Các đối số:
* `id` (string): Tên định danh cho module. Không bắt buộc, nhưng cần khi khai báo module.
* `dependencies` (array): mảng chứa tên các module khác cần được load. Không bắt buộc nếu không có dependency.
* `factory` (object/function): object hoặc function để khởi tạo cho module.

Cùng xem ví dụ sau để dễ hình dung hơn:

```calculator.js
// module với tên "calculator" được khai báo là một object chứa 2 hàm.
define("calculator", {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
});
```

```index.js
// dùng hàm "require" để load module "calculator"
require(["calculator"], function(calculator) {
    console.log(calculator.add(2, 2)); // 4
    console.log(calculator.subtract(2, 2)); // 0
});
```

## 4. UMD
Viết tắt của **Universal Module Definition**. UMD có một sứ mệnh là mang back-end và front-end đến gần nhau hơn, bằng việc hỗ trợ nhiều trường hợp để tương thích cho cả hai, bao gồm cả browser global. Vì lý do này mà code của UMD tương đối phức tạp, chúng ta cùng xem ví dụ khai báo một module bằng UMD:

```calculator.js
(function (calculator) {
    if (typeof define === 'function' && define.amd) {
        // xuất bằng AMD
        define("calculator", calculator);
    } else if (typeof module === 'object' && module.exports) {
        // xuất bằng CJS
        module.exports = calculator;
    } else {
        // xuất bằng browser global
        window.calculator = calculator;
    }
}({
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
}));
```

```index.js
// load bằng AMD
require(["calculator"], function (calculator) {
    console.log(calculator.add(2, 2));
    console.log(calculator.subtract(2, 2));
});

// load bằng CJS
var calculator = require("./calculator");
console.log(calculator.add(2, 2));
console.log(calculator.subtract(2, 2));

// nếu trong browser thì có thể truy xuất trực tiếp
console.log(calculator.add(2, 2));
console.log(calculator.subtract(2, 2));
```

Qua ví dụ thì các bạn có thể thấy, UMD tập hợp các trường hợp khai báo module khác nhau, giúp module "calculator" có thể được sử dụng cho tất cả môi trường từ trước (front-end) ra sau (back-end).

## 5. ESM
Viết tắt của **ECMAScript Modules**. Còn gọi là ES6 Modules, ESM chính là giải pháp cho một tương lai tươi sáng của hệ sinh thái module bằng việc chuẩn hóa cú pháp khai báo module, hoạt động từ trước ra sau, và được hỗ trợ bởi chính JavaScript mà không cần thông qua bất kì một compiler hay loader nào (trừ việc phải polyfill từ ES6 về các phiên bản ES trước cho các trình duyệt cũ). Chắc hẳn nhiều bạn đã quá quen với đoạn code sau:

```js
import React from "react";
import App from "./App";
render(<App />, document.getElementById("root"));
```

Đúng vậy, đoạn code được sử dụng trong `index.js` của một React App, sử dụng ESM để load các module. Giờ chúng ta cùng xem một ví dụ khác tương đương các ví dụ trên bằng ESM:

```calculator.js
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
export default {
    add,
    subtract,
};
```

```index.js
import calculator from "./calculator";
console.log(calculator.add(2, 2));
console.log(calculator.subtract(2, 2));
```

Ví dụ trên sử dụng `default export` để xuất tất cả những gì cần xuất trong duy nhất một object, ngoài cách này, ESM còn hỗ trợ `named export` cho phép xuất nhiều thứ cùng lúc. Để biết thêm, các bạn search bài viết khác hoặc tham khảo các liên kết bên dưới nhé.

# Tổng kết
Đọc đến đây chắc cũng có bạn còn mông lung, vẫn chưa rõ tại sao lại có quá nhiều kiểu khai báo module trong JavaScript, cũng như làm sao để nhớ hết cả đống kiến thức trên. Mình xin tóm tắt lại những cái quan trọng để mọi người cùng nhớ:

**1. IIFE (Immediately Invoked Function Expression)**
* Kỹ thuật khai báo module cho JS thuần (ES5 trở về trước)
* Cú pháp:
    ```js
    var moduleName = (function() {
        // return something to export
    })();
    ```

**2. CJS (CommonJS)**
* Cú pháp khai báo module được sử dụng dưới back-end (phổ biến nhất là NodeJS)
* Các module được import một cách *đồng bộ*
* Cú pháp:
    ```js
    // export
    module.exports = factory;
    
    // import
    var alias = require("./moduleName")
    ```

**3. AMD (Asynchronous Module Definition)**
* Cú pháp khai báo module được sử dụng trên front-end (thông qua bộ loader phổ biến là RequireJS)
* Các module được import một cách *bất đồng bộ*
* Cú pháp:
    ```js
    // export
    define("moduleName", ["dependency1", "dependency2", ...], factory);
    
    // import
    require(["moduleName"], function(alias) {
        // code
    });
    ```

**4. UMD (Universal Module Definition)**
* Kỹ thuật kết hợp nhiều cú pháp khai báo module
* Tương thích với front-end lẫn back-end
* Cú pháp tương đối phức tạp
* Cú pháp:
    ```js
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define("moduleName", factory);
        } else if (typeof module === 'object' && module.exports) {
            module.exports = factory;
        } else {
            window["moduleName"] = factory;
        }
    })(factory);
    ```

**5. ESM (ECMAScript Modules)**
* Cú pháp khai báo module được chuẩn hóa, hỗ trợ trực tiếp bởi JS thuần (ES6 trở về sau)
* Tương thích với front-end lẫn back-end
* Cú pháp đơn giản nhưng đa dạng, linh động hơn
* Cú pháp:
    ```js
    // default exports
    export default { }
    export default function fnA() { }
    export default class classB { }

    // named exports
    export function fnA() { }
    export var varB = "";
    
    // default import
    import alias from "moduleName";

    // named imports
    import * as alias from "moduleName";
    import { fnA, varB } from "moduleName";
    ```

# Tham khảo
* [FreeCodeCamp - JavaScript Modules: A Beginner's Guide](https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/)
* [Dev.to - What are CJS, AMD, UMD, and ESM in JavaScript](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
* [Wikipedia - Asynchronous module definition](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
* [Github - AMD Specification](https://github.com/amdjs/amdjs-api)
* [Github - UMD Pattern](https://github.com/umdjs/umd)
* [ExploringJS - ES6 Modules](https://exploringjs.com/es6/ch_modules.html)

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)