Chao,
Chào các bạn, đến hẹn lại lên. Hôm nay mình xin phép chia sẽ với các bạn về một khái niệm rất hay ho, đó là Immutablejs.
Không dài dòng nữa, mình bắt đầu luô với nhưng kiến thức cơ bản về Immutable nhé! (len)
# Immutable là gì?

Với cách hiểu nôm na, Immutable như là một đặc tính của một đối trường nào đó. Nó khiến cho dữ liệu không thể thay đổi khi được tạo, dẫn đến việc dễ dàng hơn rất nhiều trong việc phát triển ứng dụng. Không sao chép, cho phép ghi nhớ và phát hiện kịp thời những thay đổi là những điểm nổi bật cần nhắc đến của Immutable.

Immutable cung cấp cho người dùng rất nhiều cấu trúc dữ liệu ổn định, trong đó có thể kể đến: List, Stack, Map, OrderedMap, Set, OrderedSet, Record.

Các cấu trúc dữ liệu này có hiểu quả rất cao trên modern JavaScript.

Immutable cũng đồng thời cung cấp lazy Seq, hổ trợ tốt các methods như map, filter mà không cần các thành phần trung gian.

# Bắt đầu với Immutable

Chúng ta có thẻ cài đặt Immutable qua npm, chắc hẳn với các Developer có một chút kinh nghiệm, thao tác này không còn quá xa lạ nữa.

## Install npm

```bash
npm install immutable
```

Sau đó add thêm các require vào bất cứ module nào bạn có thể

```javascript
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') + " vs. " + map2.get('b') // 2 vs. 50
```

# Browser

Immutable không có bất cứ dependencies nào, vậy nên có thể sử dụng module bundle như webpack, rollup, hoặc browserify. Bạn có thể hoàn toàn yên tâm về sự hoạt động của các module immutable npm

Ngoài ra, các Immutable có thể bao gồm các script tag. Bạn có thể download hoặc link đến CDN dạng CDNJS hoặc jsDelivr để kiểm tra.

## Sử dụng tập lệnh để thêm Immutable trong phạm vi mở
```html
<script src="immutable.min.js"></script>
<script>
  var map1 = Immutable.Map({a:1, b:2, c:3});
  var map2 = map1.set('b', 50);
  map1.get('b'); // 2
  map2.get('b'); // 50
</script>
```

Hoặc bạn có thể sử dụng AMD-style loader(giống như requirejs)

```javascript
require(['./immutable.min.js'], function (Immutable) {
  var map1 = Immutable.Map({a:1, b:2, c:3});
  var map2 = map1.set('b', 50);
  map1.get('b'); // 2
  map2.get('b'); // 50
});
```

# Flow & TypeScript

Sử dụng các Immutable collections và sequences  giống như cách mà bạn sử dụng các natibe collertions trong Flowtype hoặc TypeScript
khi vẫn tận dụng tốt lợi thế của generics. Phát hiện lỗi và tự động complete trong IDE của bạn. Cài đặt immutable qua NPM mang theo định nghĩa cho Flow (v0.39.0 hoặc cao hơn) và TypeScript (v2.1.0 hoặc cao hơn), do đó, bạn không cần phải làm thêm bất cứ điều gì cả.
## Using TypeScript with Immutable.js v4
Định nghĩa Immutable.js bao gồm ES2015. Mặc dù Immutable.js tự hỗ trợ các trình duyệt và môi trường kế thừa, các loại định nghĩa của nó yêu cầu phải có thư viện TypeScript 2015. Bao gồm "target" : "es2015" hoặc "lib" : "es2015" trong tsconfig.json hoặc gõ lệnh tsc -- target es2015 hoặc tsc -- lib es2015 trong cmd.
```javascript
import { Map } from "immutable";
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set(\'b\', 50);
map1.get(\'b\'); // 2
map2.get(\'b\'); // 50
```

## Sử dụng TypeScript với Immutable.js v3 and trước đó

```javascript
<reference path=\'./node_modules/immutable/dist/immutable.d.ts\'/>
import Immutable = require(\'immutable\');
var map1: Immutable.Map<string, number>;
map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set(\'b\', 50);
map1.get(\'b\'); // 2
map2.get(\'b\');
```

#  Các trường hợp cho Immutability

Immutable collections nên được xem là giá trị chứ không phải đối tượng. Nguyên tắc này là khá quan trọng để bạn hiểu được rằng việc sử dụng dữ liệu không thay đổi hợp lý. Bạn cần sử dụng các chức năng Immutable.is() hoặc equals() để thay thế cho các toán tử so sánh ngang bằng. Điều này giúp cho Immutable.js collections được công nhận như là một giá trị, thay vì đối tượng.

Một số ví dụ:
```javascript
const { Map } = require(\'immutable\')
const map1 = Map( {a: 1, b: 2, c: 3 })
const map2 = map1.set(\'b\', 2)
assert(map1.equals(map2) === true)
const map3 = map1.set(\'b\', 50)
assert(map1.equals(map3) === false)
```

# JavaScript-first API

Sự khác biệt cho các immutable collections là các phương pháp có thể làm biến đổi bộ sưu tập, như push , set , unshift hoặc splice thay vì trả về một bộ sưu tập mới bất biến. Các phương thức trả về mảng mới như slice hoặc concat thay vì trả về các bộ sưu tập mới bất biến.
```javascript
const { List } = require(\'immutable\')
const list1 = List([ 1, 2 ]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);
assert(list1.size === 2);
assert(list2.size === 5);
assert(list3.size === 6);
assert(list4.size === 13);
assert(list4.get(0) === 1);
```

Lưu ý: Gần như tất cả các phương thức thao tác trên array đều có thể được tìm thấy trên Immutable.list, map có thể thay thế bằng Immutable.map, set cũng tương tự.

Ví dụ: 

```javascript
const { Map } = require(\'immutable\')
const alpha = Map({ a: 1, b: 2, c: 3, d: 4 });
alpha.map((v, k) => k.toUpperCase()).join();
```

Trên là một số góc nhìn ban đầu về Immutable, mọi người có thể tìm hiểu thêm hoặc nghiên cứu kĩ hơn qua các tài liệu khác.
Tham khảo thêm: (https://facebook.github.io/immutable-js/)