Javascript (hay còn viết tắt là JS) là một ngôn ngữ lập trình hướng đối tượng phổ biến nhất trên thế giới tính đến nay. Không chỉ là một công cụ phụ trợ như trong quá khứ, Js đã len lỏi vào moị mặt trận lập trình WEB, từ những script nhỏ nhất, đến các framework được ưa dùng như angularJs, ReactJS,..ngay cả đến back-end như Node.js. Tuy mạnh mẽ như vâỵ, nhưng đôi khi coder vẫn rất ngán ngẩm vì những chức năng dường như là mặc định mà vẫn phải viết cả 1 đoạn code để xử lí: find một phần tử trong 1 mảng các hash, so sánh, kiểm tra null(undefined,NaN,[],""..) và vô số những chức năng nhỏ lẻ nữa.

Hôm nay mình xin được giới thiệu 1 thư viện Js cực kì tiện ích để giúp anh em giảm nhẹ công sức trước những công việc tốn effort như đã nêu ở trên.
Văn vẻ thế là đủ, tên của thư viện là **LODASH**
Giờ anh em đang quan tâm xem nó làm được những gì phải không? Để tôi liệt kê ra nhé :v:

Với gần 500 function được viết sẵn, support anh em tận răng, công việc code Js trở nên dễ dàng hơn bao giờ hết:

Có 11 nhóm chính:

Array

Collection

Date

Function

Lang

Math

Number

Object

Seq

String

Util

Properties

Methods


Mỗi nhóm đều chữa các function dễ dang sử dụng mà lại hiệu qủa cao:
Giả sử  bạn cần kiểm tra một biến xem có phải undefined hoặc null hay không, trước đâu bạn cần viết:
```
var a = undefined;
if( typeof(a) === 'undefined' || a === null) {
    // anything
}
```

Nhưng giờ với Lodash, cú pháp trở nên dễ hiểu hơn nhiều:

var a = undefined;
if (_.isUndefined(a) || _isNull(a)) {
   // anything
}

Không chỉ dừng lại tại đây, trước đây, nếu cần loại bỏ một phần tử ra khỏi 1 array như ví dụ dưới đây:
Ví dụ: Cho mảng [{id: 1, name: "Dendi", role: "mid", active: true},{id: 2, name: "Puppey", role: "support", active: true}, {id: 322, name: "solo", role: "throw", active: false}], hãy loại bỏ các object có id > 100

```
function reject(array) {
    var result = [];
    forEach(array, function(obj) {
        if(object.id < 100) {
            result.push(object);
        }
    });
   return result;
}
```

thì với Lodash, mọi thứ trở nên đơn giản hơn bao giờ hết:
```

_.reject(array, function(obj){return obj > 100;})
```
Nếu cần loại bỏ các phần tử mà active == false còn đơn giản hơn nữa:
```
_.reject(array, ['active': false])0;

```
và còn vô vàn những function hữu ích nữa mà bạn có thể tìm thấy trong document của thư viện lodash

Sau đây là cách install:

Installation

In a browser:
```

<script src="lodash.js"></script>
```

Using npm:
```

$ npm i -g npm
$ npm i --save lodash
```
In Node.js:
```

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

Chúc mọi người có 1 trải nghiệm thú vị!!!!


Link thư viện: https://lodash.com/