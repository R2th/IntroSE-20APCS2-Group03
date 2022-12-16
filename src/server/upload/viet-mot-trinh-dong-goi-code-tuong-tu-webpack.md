Trong quá trình tìm hiểu về cách thức hoạt động của webpack, mình vô tình đọc được 1 loạt bài rất hay, tiếc là lâu quá rồi giờ không tìm lại được đầy đủ. May thay vẫn còn tìm lại được 1 cái video, do chính cha đẻ của Webpack hướng dẫn cách thức hoạt động của Webpack.

Bài viết này mình dịch lại nội dung video và giải thích kỹ càng để giúp các bạn hiểu tường tận về cách thức hoạt động của Webpack. Hiểu được điều này sẽ rất có lợi cho chúng ta khi sử dụng Webpack, và cả quá trình làm việc với Javascript sau này nữa.

Link video [**đây nhé**](https://youtu.be/Gc9-7PBqOC8) mọi người (Tay này người Ukraine nên âm hưởng tiếng Anh rất khó nghe, phải vừa nghe vừa đoán mới hiểu được hắn ta nói gì.)

## Modules Bundler là gì?

Webpack là một trình **modules bundler** (đóng gói modules), vì vậy ta cần phải tìm hiểu khái niệm về **modules bundler** trước đã.

Hiểu một cách đơn giản nhất thì **modules bundler** sẽ cho phép chúng ta viết code dưới dạng modules, nhưng đóng gói lại để trình duyệt có thể hiểu được. Có 2 lý do mà chúng ta dễ dàng thấy được tại sao cần phải có **modules bundler** đó là:

1. Chúng ta thích viết Javascript theo ECMAScript (hay typescript, hay flow, coffee script chẳng hạn), nhưng trình duyệt không hiểu được mã ECMAScript;
2. Chúng ta thích viết mã dưới dạng các modules, tức là tách nhỏ mã ra thành các modules riêng biệt, nhưng chúng ta không thích trình duyệt mỗi lần request 100 files modules này, thay vào đó chúng ta muốn nó chỉ request 1 file đã được đóng gói lại.

Ví dụ đơn giản, đây là một đoạn mã được viết dưới dạng ECMAScript:

```javascript
// Mã nguồn của module ABC.js

// Module này có một dependency là lodash
import _ from 'lodash';


// module này export cái gì?
export default someValue;
```

Còn đây là CommonJS:

```javascript
// Mã nguồn của module ABC.js

// Module này có một dependency là lodash
const _ = require('lodash');


// module này export cái gì?
module.exports = someValue;
```

Quay trở lại một chút, chúng ta cũng cần phải hiểu **Babel** chính là **transpiler**, tức là trình để chuyển đổi code từ ECMAScript về code Javascript sao cho trình duyệt có thể hiểu được. 

Như vậy là  **Modules Bundler** sẽ bao gồm toàn bộ công việc của **transpiler**, cộng thêm một số tác vụ như: dependency resolution (quá trình giải quyết việc tạo ra một mạng liên kết các dependencies vào trong mã nguồn như thế nào), caching (để việc build được nhanh hơn), code splitting (để tối ưu performance cho website), circular dependencies, một số plugins cho phép can thiệp vào mã nguồn để tạo ra mã cuối cùng theo ý muốn, v.v... và nhiều thứ khác phức tạp hơn nữa.

Trong khuôn khổ bài viết này, chúng ta chỉ tìm hiểu về **transpiler** và một chút về **dependency resolution**, caching, code splitting và những thứ phức tạp khác chắc sẽ hẹn ở một bài viết khác vậy.

## Dependency Graph

Giả sử rằng chúng ta có đoạn mã nguồn sau:

```javascript
// app.js
import {Component} from 'react';
import {Button} from './button';

export class App extends Component {
	render() {
		// ...
	}
}
```

Chúng ta thấy rằng trong **react** có thể có rất nhiều *dependencies*, trong **button** cũng vậy. Vì thế mà Dependency Graph của chúng ta sẽ có dạng như sau:

![](https://images.viblo.asia/72bf76a8-d404-4bfd-9ddc-92b27de92142.jpg)

Như vậy công đoạn đóng gói của chúng ta sẽ bao gồm các bước sau:

* **Bước 1:** Đọc nội dung của 1 file mã nguồn, sau đó lấy ra danh sách các Dependencies của nó 
* **Bước 2:** Xây dựng ra một Dependency graph, dựa trên danh sách trên, bằng phương pháp đệ quy
* **Bước 3:** Đóng gói chúng lại thành 1 file duy nhất

Trong ví dụ này, chúng ta sẽ viết code để bundler một dự án có cấu trúc như sau:

![](https://images.viblo.asia/3ebdf694-601f-4b9e-9025-cadca864b298.jpg)

File ```entry.js``` có một dependency là ```message.js```, file ```message.js``` có một dependency là ```name.js```;

![](https://images.viblo.asia/0dba698c-9783-4d45-858b-e5be218e7077.jpg)

Nội dung các  files này hết sức đơn giản, để giữ cho ví dụ của chúng ta dễ hiểu nhất:

```javascript
// file entry.js
import message from './message.js';

console.log(message);
```

```javascript
// file message.js
import {name} from './name.js';

export default `Hello ${name}!`;
```

```javascript
// file name.js
export const name = 'Cong Nguyen';
```

### **Bắt đầu code nào!**

Mặc dù không cần hiểu quá sâu về Babel ở đây, nhưng chúng ta cần tìm hiểu 1 khái niệm cơ bản đó là ast trước, điều này sẽ giúp chúng ta hiểu được các đoạn code phía sau tốt hơn.

AST là viết tắt của Abstract Syntax Tree, nói ngắn gọn là một dạng cây (tree) đại diện cho mã Javascript, và cho phép các trình biên dịch như Babel hiểu được code. Tức là thay vì làm việc với một đống chữ, thì Babel sẽ làm việc với một cây ảo.

Có một trang để bạn có thể tìm hiểu về AST rất tốt đó là https://astexplorer.net

### Bước 1: Đọc nội dung của 1 file mã nguồn, sau đó lấy ra danh sách các Dependencies của nó

Chúng ta sẽ bắt đầu bằng việc tạo ra một hàm `createAsset`, hàm này nhận vào 1 filename, đọc nội dung file đó và trả về danh sách các dependencies của nó. (tương đương Bước 1 đã nói ở trên). Dưới đây là code:

```javascript
// import một số packages
// Làm việc với files
const fs = require('fs');
// Làm việc với path
const path = require('path');
// 1 trình JavaScript parser để chuyển code Javascript thành cây AST
const babylon = require('babylon');
// Chúng ta có thể hiểu sau khi parse mã nguồn ra thành 1 cây ast gồm các nodes thì traverse là cái sẽ giúp chúng ta làm việc với các nodes này dễ dàng hơn
const traverse = require('babel-traverse').default;
// transformFromAst nhận đầu vào là 1 ast, rồi transform ra thứ gì chúng ta muốn
const {transformFromAst} = require('babel-core');

let ID = 0;

function createAsset(filename) {
  // Đọc nội dung file
  const content = fs.readFileSync(filename, 'utf-8');
  
  // Bây giờ khi đã có nội dung file, chúng ta cần phải lấy ra danh sách dependencies của file này. (tức là các files được import vào)
  // Để làm được như vậy, chúng ta sẽ tìm tất cả chỗ nào có chữ "**import**"
  // Nhưng thay vì làm việc với chuỗi, thì chúng ta sẽ làm việc với cây AST tương ứng của nó
  
  // Sử dụng trình Javascript parser là Babylon, chuyển mã thành cây AST trước
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  // Mỗi khi tìm được một dependency, chúng ta sẽ thêm nó vào mảng này.
  const dependencies = [];

  // Sử dụng trình traverse như đã giải thích ở trên, duyệt qua từng node 
  // và kiểm tra xem nó có phải là node loại **import** không
  traverse(ast, {
    // ImportDeclaration chính là thứ tương đương với **import** trong code của chúng ta
    ImportDeclaration: ({node}) => {
      // OK, thêm nó vào mảng kia thôi
      dependencies.push(node.source.value);
    },
  });

  // Phát sinh cho nó 1 ID mới thôi
  const id = ID++;

  // Chúng ta đã biết rằng mã EcmaScript sẽ không làm việc được trên trình duyệt,
  // vì vậy chúng ta sẽ transpile nó với Babel
  const {code} = transformFromAst(ast, null, {
    presets: ['env'],
  });

  // Cuối cùng là trả về kết quả thôi
  return {
    id,
    filename,
    dependencies,
    code,
  };
}
```

### Bước 2: Xây dựng ra một Dependency graph, dựa trên danh sách trên, bằng phương pháp đệ quy

```javascript
// Bây giờ chúng ta sẽ thiết lập một biểu đồ quan hệ giữa các dependencies
// Chúng ta sẽ bắt đầu từ file entry.js, đây là điểm đầu vào của project
//
// Tiếp đó, chúng ta sẽ làm tương tự với các dependency của file này (entry.js)
// Từ đó chúng ta có được một mạng quan hệ giữa các dependencies này và thấy rõ
// chúng liên quan với nhau như thế nào. Đây chính là khái niệm về dependency graph
function createGraph(entry) {
  // Start by parsing the entry file.
  const mainAsset = createAsset(entry);
  
  // Chúng ta sẽ tạo ra một queu cho mỗi file mã nguồn, ban đầu thì nó chỉ có cái file entry.js thôi
  const queue = [mainAsset];

  // Chúng ta sẽ dùng vòng lặp `for ... of` để lặp qua cái queue này.
  // Mặc dù lúc mới khởi tạo, queu này chỉ có mỗi 1 file entry thôi,
  // nhưng trong quá trình lặp, mỗi khi tìm thấy 1 file mới chúng ta lại đẩy nó
  // vào trong queu này
  // Vì vậy chúng ta sẽ lặp cho đến khi nào không tìm thấy một dependency nào nữa thì dừng
  for (const asset of queue) {
    // Mỗi file mà chúng ta lặp qua có một danh sách các relative paths được import vào
    // Chúng ta sẽ lặp qua chúng, sử dụng hàm createAsset() đã viết ở trên để tạo ra một dependency graph
    // Lưu nó vào một Object là mapping, để đảm bảo không bị trùng lặp
    asset.mapping = {};

    // Sử dụng thư viện path để xác định thư mục chứa file đang làm việc
    const dirname = path.dirname(asset.filename);

    // Lặp qua relative paths của nó nào
    asset.dependencies.forEach(relativePath => {
      // Hàm `createAsset()` cần phải truyền vào đường dẫn tuyệt đối thì mới đọc được
      const absolutePath = path.join(dirname, relativePath);

      // Đọc nội dung file và lấy danh sách dependencies.
      const child = createAsset(absolutePath);

      // mapping này sẽ lưu quan hệ giữa file này và 1 child dependency của nó
      asset.mapping[relativePath] = child.id;

      // Cuối cùng, đẩy nó vào dependencies queu, để có thể lặp tiếp
      queue.push(child);
    });
  }

  return queue;
}
```

### Bước 3: Đóng gói chúng lại thành 1 file duy nhất

```javascript
// Tiếp theo, chúng ta sẽ viết 1 hàm đóng gói cái graph ở trên để trình duyệt có thể thực thi được
//
// File cuối cùng sẽ chỉ gồm 1 hàm self-invoking (hàm tự gọi, tự chạy) như này:
//
// (function() {})()
//
// Tham số truyền vào duy nhất là cái graph thu được ở trên
function bundle(graph) {
  let modules = '';

  // Để tạo ra phần body cho hàm này, bản chất là lập qua tất cả module
  // Hãy tưởng tượng rằng ta có một chuỗi rỗng ban đầu: var s = '';
  // Sau đó cứ mỗi module, chúng ta sẽ append vào chuỗi đó 1 đoạn: `key: value,`
  // trong đó key là id của module và value là mã của nó.
  graph.forEach(mod => {
    // Mỗi một module sẽ tạo ra một cặp `key: value,`
    // trong đó value là một mảng gồm 2 giá trị
    //
    // Giá trị thứ nhất là code của module, được bao trong một hàm nhằm mục đích
    // tránh xung đột cho các biến trong module đó với module khác
    //
    // Our modules, after we transpiled them, use the CommonJS module system:
    // They expect a `require`, a `module` and an `exports` objects to be
    // available. Those are not normally available in the browser so we'll
    // implement them and inject them into our function wrappers.
    //
    // Giá trị thứ 2 là một mapping có dạng: {'đường dẫn' : 'ID'}
    // { './relative/path': 1 }.
    //
    // Điều này giúp ta biết được code tương ứng với relative path dễ dàng hơn mà thôi
    // Chẳng hạn khi relative path = './relative/path' thì ta biết module ID = 1,
    // nó là 1 field của chính Object này rồi nên có thể lấy ngay code được
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });
  ```
  
  Như vậy là đã xong, giờ chúng ta chỉ cần code để thực thi nữa thôi:

```javascript
const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

  return result;
}

const graph = createGraph('./example/entry.js');
const result = bundle(graph);

console.log(result);
```

Đóng gói toàn bộ code trên thành 1 file `bundler.js`

```javascript
// import một số packages
// Làm việc với files
const fs = require('fs');
// Làm việc với path
const path = require('path');
// 1 trình JavaScript parser để chuyển code Javascript thành cây AST
const babylon = require('babylon');
// Chúng ta có thể hiểu sau khi parse mã nguồn ra thành 1 cây ast gồm các nodes thì traverse là cái sẽ giúp chúng ta làm việc với các nodes này dễ dàng hơn
const traverse = require('babel-traverse').default;
// transformFromAst nhận đầu vào là 1 ast, rồi transform ra thứ gì chúng ta muốn
const {transformFromAst} = require('babel-core');

let ID = 0;

function createAsset(filename) {
  // Đọc nội dung file
  const content = fs.readFileSync(filename, 'utf-8');
  
  // Bây giờ khi đã có nội dung file, chúng ta cần phải lấy ra danh sách dependencies của file này. (tức là các files được import vào)
  // Để làm được như vậy, chúng ta sẽ tìm tất cả chỗ nào có chữ "**import**"
  // Nhưng thay vì làm việc với chuỗi, thì chúng ta sẽ làm việc với cây AST tương ứng của nó
  
  // Sử dụng trình Javascript parser là Babylon, chuyển mã thành cây AST trước
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  // Mỗi khi tìm được một dependency, chúng ta sẽ thêm nó vào mảng này.
  const dependencies = [];

  // Sử dụng trình traverse như đã giải thích ở trên, duyệt qua từng node 
  // và kiểm tra xem nó có phải là node loại **import** không
  traverse(ast, {
    // ImportDeclaration chính là thứ tương đương với **import** trong code của chúng ta
    ImportDeclaration: ({node}) => {
      // OK, thêm nó vào mảng kia thôi
      dependencies.push(node.source.value);
    },
  });

  // Phát sinh cho nó 1 ID mới thôi
  const id = ID++;

  // Chúng ta đã biết rằng mã EcmaScript sẽ không làm việc được trên trình duyệt,
  // vì vậy chúng ta sẽ transpile nó với Babel
  const {code} = transformFromAst(ast, null, {
    presets: ['env'],
  });

  // Cuối cùng là trả về kết quả thôi
  return {
    id,
    filename,
    dependencies,
    code,
  };
}

// Bây giờ chúng ta sẽ thiết lập một biểu đồ quan hệ giữa các dependencies
// Chúng ta sẽ bắt đầu từ file entry.js, đây là điểm đầu vào của project
//
// Tiếp đó, chúng ta sẽ làm tương tự với các dependency của file này (entry.js)
// Từ đó chúng ta có được một mạng quan hệ giữa các dependencies này và thấy rõ
// chúng liên quan với nhau như thế nào. Đây chính là khái niệm về dependency graph
function createGraph(entry) {
  // Start by parsing the entry file.
  const mainAsset = createAsset(entry);
  
  // Chúng ta sẽ tạo ra một queu cho mỗi file mã nguồn, ban đầu thì nó chỉ có cái file entry.js thôi
  const queue = [mainAsset];

  // Chúng ta sẽ dùng vòng lặp `for ... of` để lặp qua cái queue này.
  // Mặc dù lúc mới khởi tạo, queu này chỉ có mỗi 1 file entry thôi,
  // nhưng trong quá trình lặp, mỗi khi tìm thấy 1 file mới chúng ta lại đẩy nó
  // vào trong queu này
  // Vì vậy chúng ta sẽ lặp cho đến khi nào không tìm thấy một dependency nào nữa thì dừng
  for (const asset of queue) {
    // Mỗi file mà chúng ta lặp qua có một danh sách các relative paths được import vào
    // Chúng ta sẽ lặp qua chúng, sử dụng hàm createAsset() đã viết ở trên để tạo ra một dependency graph
    // Lưu nó vào một Object là mapping, để đảm bảo không bị trùng lặp
    asset.mapping = {};

    // Sử dụng thư viện path để xác định thư mục chứa file đang làm việc
    const dirname = path.dirname(asset.filename);

    // Lặp qua relative paths của nó nào
    asset.dependencies.forEach(relativePath => {
      // Hàm `createAsset()` cần phải truyền vào đường dẫn tuyệt đối thì mới đọc được
      const absolutePath = path.join(dirname, relativePath);

      // Đọc nội dung file và lấy danh sách dependencies.
      const child = createAsset(absolutePath);

      // mapping này sẽ lưu quan hệ giữa file này và 1 child dependency của nó
      asset.mapping[relativePath] = child.id;

      // Cuối cùng, đẩy nó vào dependencies queu, để có thể lặp tiếp
      queue.push(child);
    });
  }

  return queue;
}

// Tiếp theo, chúng ta sẽ viết 1 hàm đóng gói cái graph ở trên để trình duyệt có thể thực thi được
//
// File cuối cùng sẽ chỉ gồm 1 hàm self-invoking (hàm tự gọi, tự chạy) như này:
//
// (function() {})()
//
// Tham số truyền vào duy nhất là cái graph thu được ở trên
function bundle(graph) {
  let modules = '';

  // Để tạo ra phần body cho hàm này, bản chất là lập qua tất cả module
  // Hãy tưởng tượng rằng ta có một chuỗi rỗng ban đầu: var s = '';
  // Sau đó cứ mỗi module, chúng ta sẽ append vào chuỗi đó 1 đoạn: `key: value,`
  // trong đó key là id của module và value là mã của nó.
  graph.forEach(mod => {
    // Mỗi một module sẽ tạo ra một cặp `key: value,`
    // trong đó value là một mảng gồm 2 giá trị
    //
    // Giá trị thứ nhất là code của module, được bao trong một hàm nhằm mục đích
    // tránh xung đột cho các biến trong module đó với module khác
    //
    // Our modules, after we transpiled them, use the CommonJS module system:
    // They expect a `require`, a `module` and an `exports` objects to be
    // available. Those are not normally available in the browser so we'll
    // implement them and inject them into our function wrappers.
    //
    // Giá trị thứ 2 là một mapping có dạng: {'đường dẫn' : 'ID'}
    // { './relative/path': 1 }.
    //
    // Điều này giúp ta biết được code tương ứng với relative path dễ dàng hơn mà thôi
    // Chẳng hạn khi relative path = './relative/path' thì ta biết module ID = 1,
    // nó là 1 field của chính Object này rồi nên có thể lấy ngay code được
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

  return result;
}

const graph = createGraph('./entry.js');
const result = bundle(graph);

console.log(result);
```

Setup một chút để file `package.json` trông như thế này:

```
{
  "name": "viblo-example",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "babel-traverse": "^6.26.0",
    "babylon": "^6.18.0"
  }
}
```

Mở terminal và chạy: `node bundler.js` sẽ được kết quả như này:

```javascript
(function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({0: [
      function (require, module, exports) {
        "use strict";

var _message = require("./message.js");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_message2.default);
      },
      {"./message.js":1},
    ],1: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require("./name.js");

exports.default = "Hello " + _name.name + "!";
      },
      {"./name.js":2},
    ],2: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = 'Cong Nguyen';
      },
      {},
    ],})
   
   ```
    
    
   
Copy lại đoạn trên, mở trình duyệt, F12 và paste nó vào rồi enter. Và đây là thành quả:
![](https://images.viblo.asia/f3776dab-7a0a-4067-86b6-532b17a8f18f.jpg)

## Kết

Như vậy là đã xong rồi đấy! Hi vọng bạn hiểu được cách mà Webpack làm việc thông qua ví dụ nhỏ này.

Ví dụ này cũng khá là phức tạp, nên có khi bạn sẽ phải đọc đi đọc lại nhiều lần, nhưng hãy kiên nhẫn nhé!

Hiện tại mình đang build một trình modules bundler riêng có tên là **x-packer**, ý tưởng là đóng gói modules theo kiến trúc AMD để có kết quả tương tự cách mà Facebook họ build code. Lý do tại sao mình lại muốn build theo cách của Facebook thì sắp tới mình sẽ chia sẻ nhé!

Cảm ơn bạn đã đọc bài!