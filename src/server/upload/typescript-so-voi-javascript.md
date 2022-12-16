TypeScript(TS) và JavaScript(JS) là hai ngôn ngữ được biết đến rộng rãi trong thế giới lập trình, nhưng sự khác biệt là gì và sử dụng như nào cho phù hợp? Trong bài này, mình sẽ so sánh hai ngôn ngữ, cách chúng liên hệ với nhau, thảo luận về những khác biệt chính của chúng và phác thảo lợi ích của mỗi ngôn ngữ.

### Định nghĩa TypeScript

[TypeScript](https://www.typescriptlang.org/) là mã nguồn mở dựa theo cú pháp của JavaScript, biên dịch thành JavaScript (EcmaScript 3+). TypeScript cung cấp các chú thích kiểu có thể tùy chọn, kiểm tra kiểu tĩnh tại thời gian biên dịch. Vì nó là một superset của JavaScript, tất cả JavaScript là TypeScript hợp lệ về cú pháp. Tuy nhiên, điều đó không có nghĩa là tất cả JavaScript thực sự có thể được xử lý bởi trình biên dịch TypeScript:

```
let a = 'a';
a = 1; // throws: error TS2322: Type '1' is not assignable to type 'string'.
```

### Lợi ích của TypeScript

#### Chú thích kiểu

TypeScript đã được tạo thành "cấu trúc nhận dạng tĩnh có thể là lỗi". Điều này cho phép chúng ta đưa ra các giả định an toàn về trạng thái trong quá trình thực thi. Hãy so sánh các hàm JavaScript và TypeScript sau đây:

```
// JavaScript
function getPassword(clearTextPassword) {
    if(clearTextPassword) {
        return 'password';
    }
    return '********';
}

let password = getPassword('false'); // "password"
```

Không có gì trong JavaScript sẽ ngăn chặn một kịch bản gọi hàm getPassword() với các tham số không hợp lệ (không phải boolean) sẽ dẫn đến một lỗi ẩn khi chạy. Điều này hoàn toàn có thể tránh được tại thời gian biên dịch bằng cách sử dụng chú thích kiểu của TypeScript:

```
// TypeScript
function getPassword(clearTextPassword: boolean) : string {
    if(clearTextPassword) {
        return 'password';
    }
    return '********';
}

let password = getPassword('false'); // throws: error TS2345: Argument of type '"false"' is not assignable to parameter of type 'boolean'.
```

Ví dụ này chứng minh làm thế nào chúng ta có thể ngăn chặn các hoạt động do các action trên các đối tượng có kiểu không xác định. Trong lịch sử, một trong những khó khăn lớn nhất của JavaScript là việc theo dõi các vấn đề vì thiếu kiểm tra kiểu kết hợp với những thứ như ép buộc loại có thể gây ra kết quả không mong muốn cho những người không quen với JavaScript phức tạp.

#### Tính năng ngôn ngữ

Ngoài việc phân tích kiểu tĩnh, TypeScript cũng thêm các tính năng sau vào JavaScript

- [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [Null checking](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html)
- [Access Modifiers](https://www.typescriptlang.org/docs/handbook/classes.html)

#### So sánh cú pháp và biên dịch
Thông thường, các nhà phát triển chọn TypeScript vì các tính năng như modules và classes. Tuy nhiên, điều quan trọng là phải hiểu các tính năng này cũng có sẵn trong JavaScript từ ES6 và bạn có thể sử dụng Babel để chuyển đổi xuống ES5 để có khả năng tương thích trình duyệt cao hơn. Do sự nhầm lẫn này, đây là một so sánh cú pháp nhanh cho một số tính năng EcmaScript gần đây hơn. Đối với mỗi tính năng, bạn sẽ tìm thấy phiên bản TypeScript và JavaScript ES5 được biên dịch cùng với định nghĩa ES6 động được chuyển thành ES5 bằng cách sử dụng babel.

#### Classes

```
// -- TypeScript -- //
class Article {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

// -- TypeScript compiled output -- //
var Article = /** @class */ (function () {
    function Article(name) {
        this.name = name;
    }
    return Article;
}());
```

```
// -- JavaScript with Babel -- //
class Article {
    constructor(name) {
        this.name = name;
    }
}

// -- Babel compiled output -- //
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function Article(name) {
    _classCallCheck(this, Article);

    this.name = name;
};
```

#### Modules
```
// -- TypeScript -- //
export default class Article { }

// -- TypeScript compiled output -- //
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Article = /** @class */ (function () {
        function Article() {
        }
        return Article;
    }());
    exports.default = Article;
});
```

```
// -- JavaScript with Babel -- //
export default class Article { }

// -- Babel compiled output -- //
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function Article() {
  _classCallCheck(this, Article);
};

exports.default = Article;
```

#### Optional Parameters

```
// -- TypeScript -- //
function log(message: string = null) { }

// -- TypeScript compiled output -- //
function log(message) {
    if (message === void 0) { message = null; }
}
```

```
/ -- JavaScript with Babel -- //
function Log(message = null) { }

// -- Babel compiled output -- //
"use strict";

function Log() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
}
```

### Khi nào cần lựa chọn: Typescript vs. JavaScript

#### TypeScript
- Kiểm tra kiểu thời gian biên dịch: Hoàn toàn có thể xác minh kiểu thời gian chạy bằng cách sử dụng vanilla JavaScript. Tuy nhiên, điều này gây thêm chi phí thời gian để chạy bổ sung nhưng có thể tránh được bằng cách thực hiện xác thực thời gian biên dịch

- Làm việc với thư viện mới hoặc Framework: Giả sử bạn đang dùng React cho một dự án mới. Bạn không quen thuộc với các API của React, nhưng vì chúng cung cấp các định nghĩa kiểu, bạn có thể nhận được intellisense sẽ giúp bạn điều hướng và khám phá các giao diện mới.

- Các dự án lớn hoặc nhiều nhà phát triển: TypeScript có ý nghĩa nhất khi làm việc trên các dự án lớn hoặc bạn có một số nhà phát triển làm việc cùng nhau. Việc sử dụng các giao diện của TypeScript và các công cụ sửa đổi truy cập có thể là vô giá trong việc giao tiếp các API (các thành viên của một lớp có sẵn để sử dụng).

#### JavaScript
- Xây dựng các công cụ cần thiết : TypeScript đòi hỏi một bước xây dựng để tạo ra JavaScript cuối cùng được thực thi. Tuy nhiên, ngày càng trở nên hiếm hoi để phát triển các ứng dụng JavaScript mà không cần xây dựng các công cụ dưới bất kỳ hình thức nào.
- Các dự án nhỏ : TypeScript có thể quá mức cần thiết cho các nhóm nhỏ hoặc các dự án lượng code nhỏ.
- Quy trình thử nghiệm mạnh mẽ : Nếu bạn có một nhóm JavaScript mạnh mẽ đã triển khai thử nghiệm phát triển theo hướng thử nghiệm, việc chuyển sang TypeScript có thể không cung cấp cho bạn nhưng gì mà nó xứng đáng với các chi phí liên quan.
- Thêm các phụ thuộc : Để sử dụng các thư viện với TS, bạn sẽ cần định nghĩa kiểu của chúng. Mỗi định nghĩa kiểu có nghĩa là một gói npm phụ. Bằng cách phụ thuộc vào các gói bổ sung này, bạn chấp nhận rủi ro mà chúng có thể không được duy trì hoặc có thể không chính xác. Nếu bạn chọn không nhập các định nghĩa kiểu, bạn sẽ mất nhiều lợi ích của TS. Lưu ý rằng  dự án DefinitelyTyped tồn tại để giảm thiểu những rủi ro này. Thư viện càng phổ biến, thì càng có nhiều định nghĩa kiểu được duy trì trong tương lai gần.
- Framework không được hỗ trợ : Nếu framework của bạn lựa chọn không hỗ trợ TS, chẳng hạn như EmberJS (mặc dù điều này được lên kế hoạch và là ngôn ngữ được lựa chọn cho Glimmer), khi đó thì bạn có thể không tận dụng được các tính năng của nó

### Những ý kiến khác
Vì vậy, bạn đã quyết định đã đến lúc giới thiệu một hệ thống kiểu cho công việc phát triển front-end của bạn. TypeScript là lựa chọn duy nhất? Câu trả lời ngắn gọn là "không". Trong thực tế, có hai công cụ chính khác cho chú thích kiểu đáng xem xét và sẽ được thảo luận ở nơi khác