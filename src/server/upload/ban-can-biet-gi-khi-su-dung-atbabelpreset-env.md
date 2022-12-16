#### Chào anh em, package `@babel/preset-env` có thể nhiều anh em đã quen thuộc với nó nhưng thực sự đã hiểu rõ hết sức mạnh của nó chưa ? hôm nay mình cùng nhau tìm hiểu nhé. Vào :grinning:

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về `Babel`.
- Môi trường mình sẽ demo:
  - macOS
  - node v10.16.1
  - yarn v1.17.3
- Editor: VSCode
 
#### Mục đích:
- Tìm hiểu chuyên sâu về package `@babel/preset-env`.
- Tìm ưu điểm và nhược điểm để sử dụng sao cho phù hợp với từng dự án.

# 2. Nội dung
### Babel là gì ?
Babel là một trình biên dịch
```js
source code → output code
```

Cũng giống như các trình biên dịch khác nó chạy trong 3 giai đoạn
```js
parsing → transforming → printing
```

### Preset env
- Hiểu đơn giản là nó cho phép bạn có thể sử dụng cú pháp JavaScript mới nhất mà không cần lo lắng về việc tương thích hay không với các trình phiên dịch JavaScript trên các trình duyệt (Tất nhiên vẫn sẽ có một số ngoại lệ) vì nó sẽ biến đổi thành cú pháp `ES5` (JavaScript engine có thể hiểu được)
- Nó là tập hơp một số `@babel/plugin-*`, danh sách các plugin của nó bạn có thể xem tại [đây](https://github.com/babel/babel/blob/master/packages/babel-preset-env/package.json)

Ví dụ
```js
// .babelrc
{
  "presets": [
    "@babel/preset-env"
  ]
}

// input.js
const func = () => {
  console.log('Hello')
}

func()

const name = 'Dai'
const age = '69'
const info = `name: ${Dai}, age: ${age}.`

// output.js
"use strict";

var func = function func() {
  console.log('Hello');
};

func();
var name = 'Dai';
var age = '69';
var info = "name: ".concat(Dai, ", age: ").concat(age, ".");
```

### Options

```js
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

Chúng ta sẽ đi qua các option thông dụng
#### modules
`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`, defaults to `false`

Ví dụ chúng ta muốn biến đổi cú pháp `ES6 module`  thành `commonjs module`
```js
// .babelrc
{
  "presets": [["@babel/preset-env", { "modules": "commonjs" }]]
}

// input.js
import { func1 } from './input2'

function main() {
  console.log('start')
  func1()
  console.log('end')
}

// output.js
"use strict";

var _input = require("./input2");

function main() {
  console.log('start');
  (0, _input.func1)();
  console.log('end');
}
```

Khi làm việc với `webpack` có thể các bạn thường thấy option `modules: false`, mục đích để tắt chức năng biến đổi `ES6 module` vì webpack đã hỗ trợ nó và làm việc đó còn tốt hơn.

#### targets
`string | Array<string> | { [string]: string }`, defaults to `{}`

Mô tả các môi trường dự án của bạn hỗ trợ

Ví dụ bạn muốn hỗ trợ cho các môi trường `chrome58` và `ie11`
```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "58",
          "ie": "11"
        }
      }
    ]
  ]
}
```

#### useBuiltIns
`"usage" | "entry" | false`, defaults to `false`
Option này cấu hình cách `@babel/preset-env` xử lý các `polyfill` 

Cần cài 2 package này để babel có thể giúp bạn import các `polyfill`
```js
"core-js" // hoặc chỉ định rõ version core-js@3
"regenerator-runtime/runtime"
```

Ví dụ chúng ta xử dụng `useBuiltIns: usage` và `corejs: 3`
```js
// input.js
const handleAsyncAwait = async () => {
  const greeting = await Promise.resolve('hi')
  return greeting
}

const myMap = new Map()
const myArray = Array.from([1, 2, 3], (x) => x + x)
const isExistedInArray = ['a', 'b'].includes('a')
```

Với mỗi `target` khác nhau thì số lượng các `polyfill` được import cũng sẽ là khác nhau

1. với target là `ie11`
```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "ie": 11
        }
      }
    ]
  ]
}

// output.js
"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var handleAsyncAwait = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var greeting;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve('hi');

          case 2:
            greeting = _context.sent;
            return _context.abrupt("return", greeting);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleAsyncAwait() {
    return _ref.apply(this, arguments);
  };
}();

var myMap = new Map();
var myArray = Array.from([1, 2, 3], function (x) {
  return x + x;
});
var isExistedInArray = ['a', 'b'].includes('a');
```

2. với target là `chrome60`
```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "chrome": 60
        }
      }
    ]
  ]
}

// output.js
"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.iterator");

const handleAsyncAwait = async () => {
  const greeting = await Promise.resolve('hi');
  return greeting;
};

const myMap = new Map();
const myArray = Array.from([1, 2, 3], x => x + x);
const isExistedInArray = ['a', 'b'].includes('a');
```

Thông thường với các project của công ty thì bạn nên sử dụng `useBuiltIns: entry` và import 2 thằng này đầu tiên ở entry file sẽ bundle
```js
import "core-js/stable"
import "regenerator-runtime/runtime"
```
Và nó sẽ import toàn bộ những `polyfill` dựa vào môi trường tương ứng

#### loose
`boolean` defaults to `false`

Nhiều `plugin` trong `babel` có 2 chế độ
1. Chế độ bình thường tuân theo ngữ nghĩa của `ECMAScript` càng sát càng tốt khi biến đổi chúng thành `ES5`
2. Chế động `loose` sẽ tạo ra mã `ES5` đơn giản hơn khi biến đổi (ít code hơn nhưng đôi khi sẽ không an toàn bằng cách 1)

Ngoài ra còn rất nhiều option khác bạn có thể đọc thêm tại [đây](https://babeljs.io/docs/en/babel-preset-env#options)
# 3. Kết luận
Qua bài viết này hi vọng sẽ giúp anh em phần nào hiểu rõ hơn về package này: 
1. Thấy được việc biến đổi mã.
2. Môi trường mà dự án của bạn hướng đến được hỗ trợ đầy đủ nhất và cũng giảm thiểu kích thước của file bundle.
3. `polyfill` code.

Cảm ơn anh em đã đọc bài viết này.

Toàn bộ ví dụ trên tại [repo](https://github.com/daint2git/viblo.asia/tree/master/babel-preset-env)