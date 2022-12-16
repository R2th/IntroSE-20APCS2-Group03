Trong bài viết này, chúng ta sẽ tìm hiểu về các chế độ `mode` vận hành code JavaScript nói chung. Bên cạnh đó thì chúng ta cũng sẽ gặp một khái niệm mới `module` giúp chúng ta phân tách và quản lý code tốt hơn khi xây dựng những ứng dụng web có nhiều tính năng và độ phức tạp cao. Hãy cùng mở đầu với các chế độ vận hành code JavaScript.

## Các chế độ vận hành code JavaScript

Bây giờ, chúng ta sẽ thử vận hành code JavaScript ở một chế độ khác.

> Từ từ đã, JavaScript có những chế độ vận hành nào?

Chúng ta có 2 chế độ vận hành code JavaScript là - mặc định `default` và nghiêm túc `strict`. :D

> Những điểm khác biệt giữa `default` và `strict` là gì?

Về cơ bản thì `default` sẽ giúp chúng ta tự động sửa một số lỗi lập trình và giúp cho chương trình của chúng ta có thể vận hành được mà không có sự kiện nào phát sinh ngoại lệ.

Còn `strict`, ở một khía cạnh khác, sẽ giúp chương trình của chúng ta luôn luôn thông báo về các ngoại lệ logic sinh ra bởi các lỗi lập trình, để giúp chúng ta nhận diện và sửa dần các thói quen viết code đã tạo ra các ngoại lệ đó.

> Làm thế nào để kích hoạt `strict`?

Trong hầu hết mọi trường hợp thì các môi trường chạy JavaScript sẽ đều làm việc ở chế độ `default` - tuy nhiên cũng có một số ít trường hợp mặc định là `strict` và chúng ta sẽ nói tới sau.

Để chủ động kích hoạt chế độ nghiêm túc `strict` thì chúng ta cần sử dụng chỉ dẫn `'use strict;'` mở đầu hàm `function` mà chúng ta đang xây dựng, hoặc mở đầu cho tệp JavaScript mà chúng ta đang viết để áp dụng cho toàn bộ code được viết trong tệp đó.

> Chúng ta có thể làm một ví dụ về sự khác biệt giữa `default` và `strict` không?

Có. Luôn và ngay. :D

```default.js
// `default`:
// "chúng ta có thể sử dụng một biến chưa được khai báo"

box = 'something';
console.log(box);   // 'something'
```

```strict.js
'use strict';
// "chưa tạo ra biến mà đã sử dụng là không đúng logic"

box = 'something';   // Ngoại lệ chưa được xử lý ReferenceError: biến `box` chưa được định nghĩa
console.log(box);   // dừng ở lệnh phát sinh ngoại lệ phía trên
```

Trong trường hợp `default` ở phía trên, chúng ta đã bỏ quên từ khóa khai báo biến và môi trường chạy code JavaScript sẽ tự động sửa lỗi này bằng cách ngầm định rằng chúng ta đã khai báo biến `var box`. Lúc này biến `box` sẽ trở thành biến `global` và là một thuộc tính của `object` mô tả môi trường chạy code. Như vậy chương trình của chúng ta viết ra sẽ có khả năng cao nhất để có thể vận hành được. :D

Ở trường hợp `strict` thì môi trường chạy code JavaScript không thực hiện thao tác giúp chúng ta sửa lỗi như `default`, mà thay vào đó thì một thông báo ngoại lệ được tạo ra để chúng ta biết được thói quen viết code mà mình cần thay đổi. :D

Cả 2 chế độ vận hành code đều rất tuyệt đứng trên phương diện hỗ trợ chúng ta xây dựng `strict` và vận hành `default` chương trình. :D

## Sử dụng `module` trong JavaScript

Bây giờ chúng ta sẽ thử sử dụng `module` trong JavaScript.

> Từ từ đã. Cái `module` là cái gì thế?

Khái niệm `module` trong JavaScript nói riêng được định nghĩa là các khối tính năng được đóng gói trong một tệp JavaScript - có thể kết nối tới các tệp khác là các `module` con để tổng hợp lại. Tuy nhiên không phải tệp JavaScript nào cũng là một `module`. :D

> Vậy một tệp `module` khác một tệp JavaScript thông thường ở điểm nào?

Để bắt đầu sử dụng `module` trong môi trường trình duyệt web thì chúng ta cần chỉ định thuộc tính `type="module"` cho các thẻ `<script>`. Ví dụ -

```index.html
<script type="module" src="student.js"></script>
```

Các tệp `module` cần phải thực hiện thao tác xuất khẩu `export` các thành phần muốn chia sẻ, nếu không thì tất cả sẽ đều được ẩn đi đối với môi trường bên ngoài. Code trong các tệp `module` cũng sẽ cần phải thực hiện thao tác nhập khẩu `import` các hàm hay biến chức năng mà các `module` khác cung cấp để có thể sử dụng.

```modules/student.js
export class Student { ... } 
```

```main.js
import Student from 'student.js';

var john = new Student(roll = 0, name = 'John');
```

Thêm vào đó, trong môi trường trình duyệt web nói riêng, các tệp `module` sẽ chỉ được tải và chạy `1 lần duy nhất` ngay cả khi chúng ta `copy/paste` nhiều lần một thẻ `<script>` tham chiếu tới một `module` nào đó.

Tuy nhiên, vì các tệp `module` được bổ sung tính năng bảo mật giúp cho các trang web thuộc nhóm tên miền khác sẽ không thể sử dụng ké những tệp này. Do đó khi chúng ta mở tệp HTML đang lưu tĩnh trên máy tính thì tính năng `module` sẽ không hoạt động. Phương án xử lý là chúng ta cần chạy một phần mềm `server` đơn giản trên máy tính của chúng ta để thử tính năng này.

Nói tơi đây thì mình chợt nhớ ra là `Sub-Series NodeJS` của [**Tự Học Lập Trình Web Một Cách Tật Tự Nhiên**](https://viblo.asia/s/Wj53OQQP56m) cũng đã xuất phát với một vài bài viết rồi. Và chúng ta đã có thể tập sử dụng `module` tại môi trường `server-side`, rồi sau đó khi đã có thể gửi một tệp HTML phản hồi yêu cầu từ trình duyệt web thì bạn sẽ có thể dùng `module` trong môi trường trình duyệt web khi xây dựng trang web. :D

## Các thao tác xuất `export` / nhập `import`

Về cơ bản thì các thao tác xuất khẩu `export` trong các `module` có thể được chia thành 2 loại - `export` kèm theo tên định danh `named`, và `export` không kèm theo tên định danh `default`.

Và tương ứng thì các thao tác nhập khẩu `import` trong các `module` cũng sẽ có 2 loại - `import` bằng tên định danh `named`, và `import` sử dụng tên tự định nghĩa cho thành phần được `export default`.

```export.js
var box = 'something';
const just = function() { console.log('named export') };
class Student {}

// --- named export
export { box, just, Student };

// --- default export
export default function() { console.log('default export') };
```

```import.js
import { box, just, Student } from 'export.js';
import defaultFunction from 'export.js';

defaultFunction();   // 'default export'
```

Các  thao tác `export` và `import` cũng có thể được hỗ trợ thêm với các tên định danh thay thế được khai báo bởi từ khóa `as`.

```export.js
var box = 'something';
export { box as b };
```

```import.js
import { b as boo } from 'export.js';

console.log(boo);   // 'something'
```

## Kết thúc bài viết

Tới đây thì bài viết về chủ đề `Mode & Module` của chúng ta đã kết thúc. Trong bài tiếp theo, chúng ta sẽ nói về một bộ công cụ mới của JavaScript, giúp chúng ta làm việc dễ dàng và thuận tiện hơn với các tác vụ xử lý được thực thi không đồng bộ `asynchronous`. Hẹn gặp lại bạn trong bài viết tiếp theo.

[**[JavaScript] Bài 18 - Async & Await**](https://viblo.asia/p/YWOZrApPKQ0)