> Bài viết gốc: https://manhhomienbienthuy.github.io/2019/08/19/javascript-modules.html

Trong một [bài viết đã khá lâu](https://manhhomienbienthuy.github.io/2016/May/12/using-amd-and-requirejs-to-modularize-large-javascript-project.html) chúng ta đã tìm hiểu về các phương thức module hoá JavaScript.  Tuy nhiên, đã nhiều năm trôi qua và bản thân ngôn ngữ JavaScript cũng đã chuyển mình.  Trong bài viết này, chúng ta sẽ tìm hiểu một phương thức module hoá JavaScript, phương thức của chính ngôn ngữ mà không cần phải sử dụng bất kỳ một thư viện nào.

# Nhắc lại về module hoá và các phương thức (cũ)

Khi ứng dụng web của chúng ta ngày càng lớn hơn, code ngày càng nhiều hơn thì nhu cầu cần tổ thức lại code thành các file nhỏ hơn đến một cách rất tự nhiên.  Trong bài viết này, chúng ta sẽ chỉ bàn về JavaScritp mà thôi.

Nếu không chia module, code JavaScript trở nên phức tạp với hàng trăm nghìn dòng code.  Mà với những file lớn như vậy, bạn phải là một siêu nhân mới có thể đọc và hiểu chúng.  Để code dễ đọc hơn, và dễ bảo trì, thay đổi hơn, chúng ta cần chia chúng thành các thành phần nhỏ hơn. Mỗi phần có những tính năng riêng biệt, khi cần sửa chữa phần nào chỉ cần quan tâm đến đúng phần đó là được.

Và để phục vụ cho nhu cầu module hoá JavaScript trong lúc mà bản thân ngôn ngữ không hỗ trợ việc đó, cộng đồng developer đã cố gắng tìm ra nhiều phương thức khác nhau để thực hiện việc này, ví dụ:

* The Module pattern
* [CommonJS](http://www.commonjs.org/)
* [Asynchronous Module Definition (AMD)](https://en.wikipedia.org/wiki/Asynchronous_module_definition)

Thế nhưng hiện tại đó đều là quá khứ.  Kể từ khi ECMAScript 2015 (ES2015 - ES6), chúng ta có thể sử dụng khái niệm "module" và module hoá một cách rất chính thống bằng chính JavaScript mà không phải sử dụng bất kỳ một phương thức thay thế nào.

# ES2015 module: giới thiệu

Một module có thể hiểu là một file, trong đó sẽ chứa những đoạn code đảm nhiệm một chức năng nào đó.  Với ES2015, một module có thể load các module khác bằng cách sử dụng `export` và `import` một cách phù hợp.

```javascript
// say.js
export function sayHello(user) {
	console.log(`Hello, ${user}`);
}

// main.js
import {sayHello} from './say.js';
console.log(sayHello);
// function...
sayHello('FooBar');
// Hello, Foobar
```

## Các đặc trưng của module

Bằng việc hỗ trợ module bởi chính JavaScript, thì một module sẽ có những đặc trưng rất thú vị.

### Luôn luôn ở strict mode

Một module luôn luôn sử dụng `use strict`, nghĩa là code JavaScript luôn luôn ở trong [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). Nhờ việc này, nếu chúng ta gán một biến không có khai báo trước sẽ bị lỗi ngay

```html
<script type="module">
foo = 5
// error
</script>
```

Cũng bởi vì module luôn luôn ở strict mode, nên `this` trong một module sẽ là undefined chứ không phải là `window` như các script thông thường.

```html
<script>
console.log(this);
// window
</script>

<script type="module">
console.log(this);
// undefined
</script>
```

### Scope

Mỗi module có một scope riêng, điều đó khiến cho các biến, hàm, v.v... của mỗi module sẽ chỉ thuộc về module đó mà thôi, các module khác sẽ không thể gọi hay sử đụng được.

Như trong ví dụ dưới đây, nếu truy cập đến một biến ở module khác sẽ gặp lỗi:

```javascript
// user.js
const user = 'FooBar';

// main.js
console.log(user);
// no such variable
```

Module cần phải sử dụng `export` để định nghĩa những gì mà các script bên ngoài có thể sử dụng được (và nếu muốn sử dụng phải `import`). Trong ví dụ trên, nếu muốn sử dụng `user` ở module khác, chúng ta phải `export/import` như sau:

```javascript
// user.js
export const user = 'FooBar';

// main.js
import {user} from './user.js';
console.log(user);
// FooBar
```

Scope của một module cũng có ý nghĩa kể cả với các module dạng inline như dưới đây:

```html
<script type="module>
let user = 'FooBar';
</script>

<script type="module>
console.log(user);
// Error: user is not defined
</script>
```

### Code trong module chỉ được thực thi 1 lần khi import

Đây là một tính chất hầu như xuất hiện trên tất cả các ngôn ngữ.  Nếu như một module được import nhiều lần, thì code của nó cũng chỉ được thực thi một lần duy nhất (ở lần import đầu tiên) mà thôi.  Đây là một trong số những tính chất rất quan trọng.

```javascript
// console.js
console.log('This module is evaluated');

// 1.js
import './console.js';
// This module is evaluated

// 2.js
import './console.js';
// Không có dòng nào được in ra
```

Trong thực tế, thường code trong module được sử dụng để khởi tạo, tạo các cấu trúc dữ liệu và nếu có thứ gì cần được tái sử dụng ở chỗ khác thì nó sẽ được export, giống như ví dụ dưới đây:

```javascript
// admin.js
export const admin = {
	name: 'Foo',
	sirname: 'Bar'
}

// 1.js
import {admin} from './admin.js';
admin.name = 'Baz';

// 2.js
import {admin} from './admin.js';
console.log(admin.name);
// Baz
// Với điều kiện 1.js và 2.js được load theo thứ tự
```

### `import.meta`

Một đối tượng `import.meta` sẽ chứa thông tin về module hiện tại. Khi được thực thi bởi JavaScript engine của trình duyệt, nó chứa thông tin URL của script (hoặc URL của trang hiện tại nên là inline module).

## Các đặc trưng của module khi thực thi ở trình duyệt

Có một số khác biệt cơ bản của một module với trình duyệt (khi load script với `type="module"`) so với những script thông thường.

### Module luôn luôn `defer`

Module luôn luôn được defer (tương tự như load một script có thuộc tính `defer` vậy).  Thuộc tính này cho phép module được load "ngầm" trong khi HTML của trang vẫn được load tiếp và code của module được thực thi khi nào script load xong.  Điều này dẫn đến một số kết quả như sau:

- Việc load các script có `type="module"` không ảnh hưởng đến HTML, chúng diễn ra song song với nhau
- Script của module sẽ chờ đến khi HTML được load hết mới thực thi
- Thứ tự của các script vẫn được bảo toàn (script load trước vẫn được thực thi trước)

Và một kết quả tất yếu của quá trình trên, đó là script của module sẽ có thể truy cập toàn bộ DOM của HTML, ngay cả với các thành phần ở bên dưới thẻ `script` đó.

```html
<script type="module">
	console.log('This is from a module');
	console.log(type of button);
</script>
// Bởi vì module được defer nên đoạn code trên sẽ được thực thi sau
// khi HTML load hết

<script>
	console.log('This is regular script');
	console.log(typeof button);
	// undefined
</script>
// Script thông thường sẽ được thực thi ngay, kể cả HTML chưa được
// load, nên kết quả ở đây là undefined

<button id="button">Button</button>
```

Khi sử dụng module, chúng ta cần chú ý điểm này.  Nếu không, ứng dụng của chúng ta có thể không hoạt động đúng như ý tưởng ban đầu và việc debug ở đây cũng tương đối khó khăn.

### Inline module với `async`

Thuộc tính `async` thông thường chỉ có tác dụng với các script load từ bên ngoài.  Nhưng với module, nó có tác dụng với tất cả, kể cả các script inline.

Nói qua một chút về thuộc tính `async`, nó khác với `defer` ở chỗ, script sẽ được load "ngầm" và được thực thi ngay khi load xong, bất kể HTML hay các script khác đã được load hay chưa.

Như trong ví dụ dưới đây, module với thuộc tính `async` sẽ được load bất đồng bộ và được thực thi ngay khi load xong `analytics.js` và không cần phải chờ HTML hay bất kỳ một thành phần nào khác đã được load hay chưa.

Tính chất này rất hay nếu chúng ta cần đến những script mà không có sự phụ thuộc nào, ví dụ các script phân tích truy cập, quảng cáo, v.v...

```html
<!-- analytics.js sẽ được load và script sẽ được thực thi mà không -->
<!-- phải chờ bất kỳ thành phần nào khác -->
<script async type="module">
	import {counter} from './analytics.js';
	counter.count();
</script>
```

### Load script từ bên ngoài

Các script được load từ bên ngoài và có `type="module"` thì có một số điểm khác biệt với các script thông thường.

Thứ nhất, là nếu nhiều script có chúng `src` thì chúng chỉ được thực thi 1 lần mà thôi.

```html
<!-- script chỉ được load và thực thi một lần duy nhất -->
<script type="module" src="script.js"></script>
<script type="module" src="script.js"></script>
```

Thứ hai, các script mà khác nguồn gốc (ví dụ khác domain) thì yêu cầu phải có các header [CORS](https://manhhomienbienthuy.github.io/2019/Jan/20/cors.html).  Nói đơn giản, thì server chứa các script bên ngoài này phải hỗ trợ CORS thì mới có thể load được.

```html
<!-- another-site.com phải cung cấp header Access-Control-Allow-Origin -->
<!-- thì mới load được -->
<script type="module" src="//another-site.com/script.js"></script>
```

### Tương thích ngược với `nomodule`

Nhiều trình duyệt cũ không hiểu `type="module` trong thẻ `script`, do đó, nó sẽ bỏ qua các script dạng này.  Để tương thích ngược với các trình duyệt đó, chúng ta có thể sử dụng `nomodule`:

```html
<script type="module">
	console.log('This is run in modern browser');
</script>

<script nomodule>
	console.log('Modern browser will skip this');
	console.log('Old browser will execute this');
</script>
```

## Build

Trong các ứng dụng thực tế, hầu như không có ai sử dụng JavaScript module một cách trực tiếp cả.  Thông thường, các công cụ để "build" gọi là module bundler sẽ được sử dụng để gom các module này lại với nhau.  Một trong những công cụ được yêu thích trong thời gian gần đây là [Webpack](https://webpack.js.org/).

Việc sử dụng module bunlder có nhiều lợi ích khác nhau, cho phép chúng ta có thể kiểm soát code dễ dàng hơn, thậm chí module bundler còn cho phép chúng ta sử dụng các module mà ngôn ngữ còn không hỗ trợ, ví dụ các module HTML hay CSS.

Về cơ bản, một module bundler sẽ thực hiện các công việc như sau:

- Chọn ra một module chính (dựa vào config dùng để build).
- Phân tích các thành phần phụ thuộc, những gì cần import và cả import của import, v.v...
- Build một file duy nhất với tất cả các module, thay thế `import` của JavaScript thành hàm của module bundler.  Nhờ cách này, và một module bundler có thể hỗ trợ việc import các module một cách không chính thống, ví dụ module CSS, HTML.
- Thực hiện một số thao tác transform và tối ưu code:
	- Xoá bỏ các code không được sử dụng.
	- Xoá bỏ những thành phần không được `import` mà vẫn `export`.
	- Xoá bỏ những đoạn code chuyên dùng trong khi phát triển như
    `debugger` hay `console.log`.
	- Sử dụng công cụ như [Babel](https://babeljs.io/) để transpile code ES2015, 2016, 2017 về dạng mà các trình duyệt cũ hơn vẫn có thể thực thi được.
	- Minified file kết quả

Bằng việc sử dụng module bundler, toàn bộ các module sẽ được gộp vào chung một file, và mọi quá trình `import`, `export` sẽ diễn ra bên trong file đó (được thay thế bằng các hàm của module bunlder tương ứng).  Do đó, file kết quả này thực ra không cần dùng đến `type="module"`, chúng ta có thể sử dụng nó hoàn toàn giống như một script thông thường

```html
<!-- bundle.js là file chúng ta thu được từ module bundler -->
<script src="bundle.js"></script>
```

# `import` và `export` trong module

Cú pháp `import` và `export` cũng thiên biến vạn hoá trong module. Trong phần trước, chúng ta thấy những cách dùng đơn giản nhất.   Trong phần này sẽ trình bày kỹ hơn về chúng.

## `export` kèm với khai báo

Mọi khai báo hàm, biến, v.v... đều có thể dễ dàng thêm từ khoá `export` về phía trước với ý nghĩa rằng, những thứ đó vừa được khai báo, đồng thời cũng được export để dùng ở module khác.

```javascript
export const THIS_YEAR = 2019;

export let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export class Foo {
	constructor(bar) {
		this.foo = bar;
	}
}
```

Lưu ý rằng, việc đặt `export` vào phía trước khai báo một class hay một hàm không làm thay đổi tính chất của khai báo đó (nghĩa là nó không trở thành một function expression).  Do đó, chúng ta không có dấu chấm phẩy khi kết thúc những khai báo này.

```javascript
export function foo() {
	console.log('Hello, world!');
}
```

## `export` tách rời khỏi khai báo

Chúng ta hoàn toàn có thể sử dụng `export` tách rời hoàn toàn khỏi khai báo hàm, biến, v.v...  Việc này sẽ cho chúng ta một đoạn code dài hơn nhưng có vẻ như rõ ràng, dễ hiểu hơn.

```javascript
function foo() {
	console.log('Hello, world');
}

export {foo};
```

## `import *`

Thông thường, chúng ta sẽ viết tất cả các thành phần cần import trong ngoặc nhọn `import {...}` như dưới đây:

```javascript
import {foo, bar} from './script.js';
```

Khi mà danh sách những thứ cần import trở nên dài hơn, chúng ta có một cú pháp cho phép import "mọi thứ" như sau:

```javascript
import * as foo from './script.js';

foo.bar
foo.baz
```

Tuy nhiên, cú pháp này được khuyến khích không nên sử dụng.  Vì mặc dù cho chúng ta một cách làm nhanh chóng hơn, nó mang lại nhiều hệ luỵ hơn là lợi ích.

Thứ nhất, nếu sử dụng module bundler, việc import mọi thứ như vậy sẽ không thể tối ưu được do module bundler không thể xác định được thứ gì không thực sự cần thiết.

Thứ hai, việc import một cách tường mình giúp code dễ đọc và dễ bảo trì hơn sau này, khi đó việc thay đổi hay refactor code cũng dễ dàng hơn.

## `import ... as ...`

Chúng ta có thể sử dụng `as` trong lúc `import` để sử dụng các thành phần được import với một tên khác cho tiện (hoặc tránh xung đột giữa các module khi dùng chung tên). ví dụ:

```javascript
import {foo as bar} from './script.js';
```

## `export ... as ...`

Cú pháp này tương tự như cú pháp import phía trên, tuy nhiên cá nhân tôi cảm thấy rằng nó không thực sự cần thiết lắm

```javascript
export {foo as bar};
```

## `export default`

Có 2 loại module trong thực tế: module chứa các thư viện, các hàm tiện ích và module định nghĩa duy nhất 1 thực thể (ví dụ một class `User` chẳng hạn).  Và các developer cũng thường tiếp cận theo hướng mỗi module chỉ có 1 thực thể duy nhất.  Mỗi thứ riêng trong một module có vẻ là một cách tổ chức code tốt.

Tuy nhiên, một hệ quả tất yếu là chúng ta sẽ cần rất nhiều module. Mọi việc sẽ chẳng có vấn đề gì, nếu các file được tổ chức tốt và đặt tên đàng hoàng.

Và thậm chí, JavaScript còn cho chúng ta một cú pháp rất hay, đó chính là `export default` để giúp các module chỉ chứa 1 thứ này được sử dụng dễ dàng hơn.

```javascript
export default class User {
	constructor(name, sirname) {
		this.name = name;
		this.sirname = sirname;
	}
}
```

Hoặc có thể tách riêng `export default` ra khỏi khai báo cũng được:

```javascript
class User {
	constructor(name, sirname) {
		this.name = name;
		this.sirname = sirname;
	}
}

export default User;
}
```

Và với những module được export default như vậy, chúng ta có thể import mà không cần đến dấu ngoặc nhọn:

```javascript
import User from './user.js';

new User('foo', 'bar');
```

Về mặt kỹ thuật, chúng ta có thể code một module có cả export default và export thông thường.  Tuy nhiên, không nên làm như vậy.  Một module chỉ nên export theo một trong hai cách.

Ngoài ra, vì export default chỉ được thực hiện một lần duy nhất cho mỗi module, nên thực thể được export thậm chí không cần đặt tên vẫn được:

```javascript
export default class {
	// không cần tên class
	constructor() {
		...
	}
}

export default function() {
	// không cần tên hàm
	...
}

export default ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
```

Việc không đặt tên này không có bất kỳ vấn đề gì, bởi kỳ export default chỉ có một cho mỗi module, nên việc import (không dùng dấu ngoặc nhọn) sẽ hiểu cần import cái gì.

Trong một số trường hợp, từ khoá `default` có thể được sử dụng để tham chiếu đến đối tượng được `export default`.  Như trong ví dụ dưới đây, chúng ta có thể tách rời export khỏi khai báo:

```javascript
function foo() {
	console.log('foo');
}

// tác dụng tương tự export default
export {foo as default};
```

Một ví dụ dưới đây có lẽ hiếm gặp trong thực tế, nhưng hoàn toàn có thể thực hiện được về mặt kỹ thuật, một module export default và export thông thường cùng một lúc:

```javascript
export default class Foo {
	constructor() {
		...
	}
}

export function bar() {
	...
}
```

Và nếu muốn import cả hai cùng một lúc, chúng ta có thể dùng cách này:

```javascript
import {default as Foo, bar} from './script.js';
```

và nếu sử dụng `import *` thì `default` chính là thứ được `export default`:

```javascript
import * as foo from './script.js';

foo.default;
```

## `export ... from ...`

Đây là cú pháp cho phép chúng ta import một thứ và ngay lập tức export nó (có thể sử dụng tên khác), ví dụ:

```javascript
export {foo} from './foo.js';

export {default as bar} from './bar.js';
```

Cú pháp này trên thực tế cực kỳ hữu tích nếu chúng ta tổ chức code theo kiểu như thế này: một thư mục sẽ chứa nhiều module, và trong đó sẽ có một số hàm cần được export ra ngoài để sử dụng, nhiều thành phần khác chỉ cần thiết giữa các module trong thư mục đó mà thôi.

Trong trường hợp này, thư mục đó như một package thu nhỏ, và chúng ta đơn giản chỉ cần thêm một file `index.js` trong đó sẽ export giống như ở trên những gì cần thiết, ngoài ra những thứ khác sẽ được giữ kín ở trong package đó mà thôi.

Thông thường, chúng ta sẽ import rồi sau đó export như thế này:

```javascript
// index.js
import {login, logout} from './auth.js';
export {login, logout}
```

Với cú pháp ngắn gọn hơn, mọi việc dễ dàng hơn khá nhiều:

```javascript
// index.js
export {login, logout} from './auth.js';
```

Tuy nhiên, với các thành phần được export default, mọi việc không đơn giản như vậy, chúng ta sẽ cần phải sử dụng đến từ khoá `default`:

```javascript
// user.js
export default class User {
	...
}

// index.js
export {default as User} from './user.js';
```

# Import động

Những phần trước chúng ta đã tìm hiểu cách các module export và import.  Tuy nhiên, đó hoàn toàn là import tĩnh, mọi import là cố định và không thể thay đổi được.

Trong thực tế có nhiều tình huống chúng ta cần import một cách động hơn, nghĩa là import module này hay module kia tuỳ vào điều kiện nào đó.  Tất nhiên là chúng ta có thể import cả hai module, còn dùng cái này thì tuỳ điều kiện, nhưng như vậy không hay.

Thế nhưng các cách import động như dưới đây đều không được phép bởi lỗi cú pháp

```javascript
import ... from getModuleName();
// Lỗi, phải import từ string

if (...) {
	import ...
else {
	import ...
}
// Lỗi, import không được đặt trong block
```

Thế nhưng, rất may là từ khoá `import` lại có thể gọi như một hàm và nó sẽ trả về một promise, do đó chúng ta có thể dùng cách này để thực hiện import động:

```javascript
import('./foo.js')
	.then(module => {
		// do something
	})
```

và nếu như trong một hàm `async` thì chúng ta có thể kết hợp với `await`:

```javascript
let module = await import('./foo.js');
module.foo
```

Bằng cách này, chúng ta có thể thực hiện import động theo nhu cầu một cách khá dễ dàng:

```javascript
async function() {
	let module;
	if (foo) {
		module = await import('./foo.js');
	} else {
		module = await import('./bar.js');
	}
}
```

Tuy nhiên, có điểm cần lưu ý rằng, việc gọi `import` trông như một hàm, nhưng thực tế, nó là một cú pháp đặc biệt của từ khoá này, chứ bản thân `import` không phải một hàm.  Do đó, không thể sử dụng `call` hay `apply` được.

# Kết luận

Việc module hoá các ứng dụng hiện nay đã trở thành một nhu cầu hiển nhiên, do lượng code ngày càng lớn, các ứng dụng ngày càng "cool" hơn.  Trong bài viết, chúng ta đã tìm hiểu được một phương thức module hoá rất hay, được hỗ trợ bởi chính ngôn ngữ JavaScript.  Hy vọng nó sẽ giúp ích cho các bạn trong công việc.