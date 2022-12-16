Nếu như coi **JavaScript** là chiếc găng tay vô cực huyền thoại, thì **Lodash** chính là viên đá vô cực "Power". Khi kết hợp 2 thứ trên lại với nhau thì người sử dụng găng tay **JavaScript** - chính là các Developers sẽ giải quyết được các bài toán 1 cách nhanh gọn nhất có thể (chưa đến mức chỉ cần 1 cái búng tay như Thanos trên phim đâu nhé :D)

Trong bài viết ngày hôm nay mình sẽ giới thiệu với các bạn 1 thư viện của bên thứ 3 cực kỳ mạnh mẽ cho JavaScript đó chính là **Lodash**.
## **Giới thiệu về Lodash**

![](https://images.viblo.asia/680a5182-aaa5-449b-ba8b-3c9bc05f7aba.jpeg)

Tiền thân của **Lodash** là thư viện **underscorejs**, có thể xem Lodash là phiên bản mở rộng hơn của underscore, nó cung cấp rất nhiều tính năng linh hoạt cho các lập trình viên ví dụ như: chức năng xử lý Array, chức năng xử lý Object, chức năng xử lý Array, nhóm xử lý Date, Function, Number... 

Các bạn có thể truy cập trang chủ [https://lodash.com/](https://lodash.com/) để xem đầy đủ và chi tiết các chức năng của Lodash nhé!

## **Tại sao nên dùng Lodash**
Các lý do mà chúng ta nên sử dụng **Lodash** cho dự án của mình:

- Lodash làm cho code JavaScript trở nên ngắn gọn và sạch sẽ hơn.
- Với lodash ta có thể xử lý các Array, Object, String, Number... 1 cách nhanh chóng.
- Có hỗ trợ **Functional Programming** (dành cho những tín đồ của FP :D).
- Với hơn 40.000 sao trên github thì Lodash nhận được sự support rất lớn từ cộng đồng người dùng trên thế giới. 

## **Cài đặt và sử dụng**
Để cài đặt Lodash cho dự án thì mọi người có thể dùng `npm` như sau:
```
$ npm i -g npm
$ npm i --save lodash
```

Sau khi cài đặt xong thì chúng ta sẽ import Lodash:
```js
import _ from 'lodash'; // Load the full build.
```
hoặc sử dụng Lodash **functional programming**
```js
import fp from 'lodash/fp'; // Load the FP build for immutable auto-curried iteratee-first data-last methods.
```
Cá nhân mình thì thích dùng lodash/fp hơn bởi vì ngoài việc sử dụng cú pháp **functional programming** ra thì nó còn có những đặc tính rất là thú vị như là **immutable, auto-curried, iteratee-first, data-last**... Để hiểu rõ hơn về những đặc tính trên của lodash/fp các bạn có thể tìm hiểu thêm [ở đây](https://hackernoon.com/function-composition-with-lodash-d30eb50153d1)

Về cách sử dụng thì lodash cũng gần tương tự như là **Array.prototype** nên mình sẽ không trình bày ở đây nữa, mình sẽ chủ yếu nói về thằng **lodash/fp**. Mọi người cùng xem ví dụ bên dưới về lodash/fp nhé:
```js
import { filter } from 'lodash/fp';

const users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

filter(user => user.active)(users); // [{ 'user': 'barney',  'active': true }]
```

Như mọi người có thể thấy thì lodash/fp nó sẽ yêu cầu người dùng truyền tham số đầu vào làm last argument, còn những action mà mình sẽ thực hiện với data sẽ là first argument, nó ngược lại hoàn toàn so với lodash thông thường.

Việc thực hiện 1 chuỗi các thao tác liên tiếp đối với lodash/fp cũng sẽ trở nên rất tường minh và đơn giản với **flow**:
```js
import { filter, flow, sortBy } from 'lodash/fp';

const users = [
  { 'user': 'barney',  'active': true, 'age': 23 },
  { 'user': 'fred',    'active': true, 'age': 20 },
  { 'user': 'pebbles', 'active': false, 'age': 21 }
];

flow([
    filter(user => user.active),
    sortBy(['age']),
    ])(users);
// [{ 'user': 'fred', 'active': true, 'age': 20 }, { 'user': 'barney', 'active': true, 'age': 23 }]
```

## **So sánh với ES6 method**
Lúc đầu khi mới tiếp xúc với **lodash** thì chắc hẳn ai cũng sẽ thắc mắc rằng tại sao không sử dụng các method có sẵn trong ES6, vừa đơn giản, vừa tiện lợi lại vừa làm giảm được dung lượng của app. Tuy nhiên thì chúng ta cần phải chú ý đến 1 số vấn đề sau:
- **Thứ nhất** là thư viện Lodash rất nhẹ (~69 KB) nên nó sẽ không ảnh hưởng nhiều đến dung lượng của app.
- **Thứ hai**: Như đã nói ở trên thì Lodash có hỗ trợ **Functional Programming** - 1 xu hướng công nghệ trong tương lai
- **Thứ ba**: thư viện Lodash phong phú hơn ES6 method rất nhiều, ngoài Array, Object nó còn có hỗ trợ cho cả việc xử lý Date, Function, Number...
## **Kết luận** <br/>
Qua bài viết này mình đã giới thiệu với mọi người về 1 thư viện cực kỳ nổi tiếng là **Lodash** cũng như **Lodash/fp**. Bài viết chỉ mang tính chất giới thiệu về Lodash cho những ai chưa biết để dễ hình dung **Lodash** là gì và làm việc như thế nào. Hy vọng các bạn có thể tận hưởng được những trải nghiệm tốt nhất khi sử dụng Lodash trong dự án của mình nhé.

**References**:<br/>
[https://lodash.com/](https://lodash.com/)<br/>
[https://hackernoon.com/function-composition-with-lodash-d30eb50153d1](https://hackernoon.com/function-composition-with-lodash-d30eb50153d1)<br/>
[https://github.com/wahengchang/lodash-vs-es6](https://github.com/wahengchang/lodash-vs-es6)