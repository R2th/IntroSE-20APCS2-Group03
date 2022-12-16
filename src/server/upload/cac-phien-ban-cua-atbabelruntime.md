#### Chào mọi người, lại là mình đây, hôm nay chúng ta cùng tìm hiểu về các phiên bản của `@babel/runtime` nhé :grinning:.

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về babel.
- Môi trường mình sẽ demo:
  - window 10
  - node v8.11.3
  - yarn v1.7.0
 
#### Mục đích:
- So sánh các phiên bản.
- Tự kiểm nghiệm ưu và nhược điểm để sử dụng sao cho phù hợp với từng dự án.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).
-  Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.

# 2. Tiến hành
### Các phiên bản của @babel/runtime

1. `@babel/runtime` = Babel modular runtime helpers + `regenerator-runtime`
2. `@babel/runtime-corejs2` = Babel modular runtime helpers + `regenerator-runtime` + `core-js@2`
3. `@babel/runtime-corejs3` = Babel modular runtime helpers + `regenerator-runtime` + `core-js@3`

> bạn có thể xem thêm [core-js](https://github.com/zloirock/core-js)

### Package đi kèm bắt buộc

`@babel/plugin-transform-runtime`: cho phép re-use code bằng cách inject các Babel helper cần thiết và các helper đó sẽ tùy vào bản `@babel/runtime`

### Ví dụ

#### Tạo một số file sau để tiến hành so sánh các phiên bản.

#### Các bước

1. `package.json`
```json
{
  "name": "default",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "author": "daint2",
  "devDependencies": {
    "@babel/cli": "^7.6.0",
    "@babel/core": "^7.6.0",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "@babel/preset-react": "^7.0.0"
  },
  "scripts": {
    "build": "yarn build:runtime && yarn build:runtime-corejs2 && yarn build:runtime-corejs3",
    "build:runtime": "babel --config-file ./.with-babel-runtime.js --out-file output-with-babel-runtime.js  input.js",
    "build:runtime-corejs2": "babel --config-file ./.with-babel-runtime-corejs2.js --out-file output-with-babel-runtime-corejs2.js input.js",
    "build:runtime-corejs3": "babel --config-file ./.with-babel-runtime-corejs3.js --out-file output-with-babel-runtime-corejs3.js input.js"
  },
  "dependencies": {
    "@babel/runtime": "^7.6.0",
    "@babel/runtime-corejs2": "^7.6.0",
    "@babel/runtime-corejs3": "^7.6.0",
    "react": "^16.9.0"
  }
}
```

2. yarn install packages

3. Tạo các file babel config

`.with-babel-runtime.js` sử dụng cho `@babel/runtime`
```js
module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: ['@babel/proposal-class-properties', '@babel/transform-runtime'],
}
```

`.with-babel-runtime-corejs2.js` sử dụng cho `@babel/runtime-corejs2`
```js
module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/transform-runtime',
      {
        corejs: 2,
      },
    ],
  ],
}

```

`.with-babel-runtime-corejs3.js` sử dụng cho `@babel/runtime-corejs3`
```js
module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
}
```

4. Tạo file input

Bao gồm các tính năng của esnext và một react component

```jsx
import React from 'react'

export const handlePromise = () =>
  new Promise(resolve => {
    resolve('hi')
  })

export const handleAsyncAwait = async () => {
  const data = await Promise.resolve('hi')
  return data
}

export function* handleGenerator() {
  yield 1
  yield 2
}

export async function* handleAsyncAwaitGenerator() {
  await 1
  yield 2
}

export const myMap = new Map()

export const myWeakMap = new WeakMap()

export const mySymbol = new Symbol()

export const myArray = Array.from([1, 2, 3], x => x + x)

export const cloneArray = [...myArray]

export const myObject = { name: 'Dai', age: 26 }

export const cloneObject = { ...myObject }

export const isExistedInArray = ['a', 'b'].includes('a')

export const isExistedInString = 'ab'.includes('a')

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleIncrement() {
    this.setState(({ count }) => ({ count: count + 1 }))
  }

  handleDecrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <p>{this.state.count}</p>
      </div>
    )
  }
}

export default Counter
```

5. Chạy lệnh `yarn build`

6. Output như sau

###### `output-with-babel-runtime.js`
```js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGenerator = handleGenerator;
exports.handleAsyncAwaitGenerator = handleAsyncAwaitGenerator;
exports["default"] = exports.isExistedInString = exports.isExistedInArray = exports.cloneObject = exports.myObject = exports.cloneArray = exports.myArray = exports.mySymbol = exports.myWeakMap = exports.myMap = exports.handleAsyncAwait = exports.handlePromise = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

...

var myMap = new Map();
exports.myMap = myMap;
var myWeakMap = new WeakMap();
exports.myWeakMap = myWeakMap;
var mySymbol = new Symbol();
exports.mySymbol = mySymbol;
var myArray = Array.from([1, 2, 3], function (x) {
  return x + x;
});
exports.myArray = myArray;
var cloneArray = (0, _toConsumableArray2["default"])(myArray);
exports.cloneArray = cloneArray;
var myObject = {
  name: 'Dai',
  age: 26
};
exports.myObject = myObject;

var cloneObject = _objectSpread({}, myObject);

exports.cloneObject = cloneObject;
var isExistedInArray = ['a', 'b'].includes('a');
exports.isExistedInArray = isExistedInArray;
var isExistedInString = 'ab'.includes('a');
exports.isExistedInString = isExistedInString;

...
```
###### `output-with-babel-runtime-corejs2.js`
```js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.handleGenerator = handleGenerator;
exports.handleAsyncAwaitGenerator = handleAsyncAwaitGenerator;
exports["default"] = exports.isExistedInString = exports.isExistedInArray = exports.cloneObject = exports.myObject = exports.cloneArray = exports.myArray = exports.mySymbol = exports.myWeakMap = exports.myMap = exports.handleAsyncAwait = exports.handlePromise = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

...

var myMap = new _map["default"]();
exports.myMap = myMap;
var myWeakMap = new _weakMap["default"]();
exports.myWeakMap = myWeakMap;
var mySymbol = new _symbol["default"]();
exports.mySymbol = mySymbol;
var myArray = (0, _from["default"])([1, 2, 3], function (x) {
  return x + x;
});
exports.myArray = myArray;
var cloneArray = (0, _toConsumableArray2["default"])(myArray);
exports.cloneArray = cloneArray;
var myObject = {
  name: 'Dai',
  age: 26
};
exports.myObject = myObject;

var cloneObject = _objectSpread({}, myObject);

exports.cloneObject = cloneObject;
var isExistedInArray = ['a', 'b'].includes('a');
exports.isExistedInArray = isExistedInArray;
var isExistedInString = 'ab'.includes('a');
exports.isExistedInString = isExistedInString;

...
```

###### `output-with-babel-runtime-corejs3.js`
```js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.handleGenerator = handleGenerator;
exports.handleAsyncAwaitGenerator = handleAsyncAwaitGenerator;
exports["default"] = exports.isExistedInString = exports.isExistedInArray = exports.cloneObject = exports.myObject = exports.cloneArray = exports.myArray = exports.mySymbol = exports.myWeakMap = exports.myMap = exports.handleAsyncAwait = exports.handlePromise = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

...

var myMap = new _map["default"]();
exports.myMap = myMap;
var myWeakMap = new _weakMap["default"]();
exports.myWeakMap = myWeakMap;
var mySymbol = new _symbol["default"]();
exports.mySymbol = mySymbol;
var myArray = (0, _from["default"])([1, 2, 3], function (x) {
  return x + x;
});
exports.myArray = myArray;
var cloneArray = (0, _toConsumableArray2["default"])(myArray);
exports.cloneArray = cloneArray;
var myObject = {
  name: 'Dai',
  age: 26
};
exports.myObject = myObject;

var cloneObject = _objectSpread({}, myObject);

exports.cloneObject = cloneObject;
var isExistedInArray = (0, _includes["default"])(_context4 = ['a', 'b']).call(_context4, 'a');
exports.isExistedInArray = isExistedInArray;
var isExistedInString = (0, _includes["default"])(_context5 = 'ab').call(_context5, 'a');
exports.isExistedInString = isExistedInString;

...
```

Nhìn qua thì các bạn cũng đã có thể nhận thấy những điểm khác biệt chính

Package | Sử dụng helper | Biến đổi async-await, generator | Biến đổi Promise, Map, WeakMap | Biến đổi array.includes, string.includes
------------ | ------------- | ------------ | ------------- | -------------
@babel/runtime | @babel/runtime/helpers | có | không | không 
@babel/runtime-corejs2 | @babel/runtime-corejs2/helpers, @babel/runtime-corejs2/core-js | có | có| không
@babel/runtime-corejs3 | @babel/runtime-corejs3/helpers, @babel/runtime-corejs3/core-js-stable | có | có| có

# 3. Kết luận
Qua bài viết này chúng ta có thể phần nào đó: 
1. cho thấy các sự biến đổi riêng với từng loại syntax như `async-await, Promise, Sympol, .includes, .vv` thành es5 thông qua `runtime` như thế nào.
2. giảm kích thước đáng kể cho file bunde nếu sử dụng phù hợp với môi trường đích và phiên bản của es sẽ sử dụng.
3. một sự thay thế cho `polyfill`.

Hi vọng nó mang lai cho bạn thêm một chút kiến thức hay ho gì đó, cảm ơn bạn đã đọc bài viết này.

Toàn bộ ví dụ trên tại [repo](https://github.com/daint2git/viblo.asia/tree/master/babel-runtime)