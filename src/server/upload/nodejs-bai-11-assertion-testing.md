Trong bài viết này, chúng ta sẽ tìm hiểu về module `assert` - cung cấp các phương thức kiểm tra các nút dữ liệu trong tiến trình vận hành code. Sau đó, chúng ta sẽ làm quen với một thư viện hỗ trợ tự động hóa một số thao tác chạy code kiểm thử `test` trên nền NodeJS.

## Module assert

Module `assert` được NodeJS cung cấp với hai chế độ vận hành với các phép kiểm tra bình thường `normal` và các phép kiểm tra nghiêm ngặt `strict`. Hai chế độ kiểm tra này có các phương thức tương đồng với cú pháp sử dụng giống nhau:

```test.js
const assert = require("assert");

assert.testMethod(...args);
```

Trong đó `testMethod` là tên của một trong số các phương thức được liệt kê dưới đây:

- [`.ok(value[, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertokvalue-message) - nếu giá trị `value` không tương đương với `true`, thì sẽ `throw` một object `AssertionError` có thuộc tính `message`.
- [`.match(string, regexp[, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertmatchstring-regexp-message) - nếu chuỗi `string` không phù hợp với biểu thức `regexp`, thì sẽ `throw` một object `AssertionError` có thuộc tính `message
- `.doesNotMatch(string, regexp[, message])` - ngược lại với `.match()` ở trên.
- [`.equal(actual, expected[, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertequalactual-expected-message) - nếu giá trị thực tế khi vận hành code `actual` không tương đương với kết quả dự kiến `expected`, thì sẽ `throw` một object `AssertionError` có thuộc tính `message`.
- `.notEqual(actual, expected[, message])` - ngược lại với `.equal()` ở trên.
- [`.deepEqual(actual, expected[, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertdeepequalactual-expected-message) - giống với `.equal()` ở trên, nhưng được thiết kế để kiểm tra các `object` còn `.equal()` được sử dụng để kiểm tra các giá trị đơn nguyên `primitive`.
- `.notDeepEqual(actual, expected[, message])` - ngược lại với `.deepEqual()` ở trên.
- [`.throws(fn[, error][, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertthrowsfn-error-message) - nếu hàm `fn` không `throw`, hoặc `throw` một object không thuộc kiểu `error`, thì sẽ `throw` một object `AssertionError` có thuộc tính `message`.
- `.doesNotThrow(fn[, error][, message])` - ngược lại với `.throws()` ở trên.
- [`.rejects(asyncFn[, error][, message])`](https://nodejs.org/dist/latest-v16.x/docs/api/assert.html#assertrejectsasyncfn-error-message) - nếu promise tại `asyncFn` trả về kết quả `.reject()`, thì sẽ `throw` một object `AssertionError` có thuộc tính `message`.
- `.doesNotReject(asyncFn[, error][, message])` - ngược lại với `.rejects()` ở trên.

Riêng đối với các phương thức `equal` thì chúng ta còn có thêm phiên bản kiểm tra với phép so sánh nghiêm ngặt với cú pháp `assert.strict.testMethod()`.

## Unit Testing

Là phương thức kiểm tra hoạt động của code bằng cách khoanh vùng các thành phần đơn vị `unit` tạo nên `project` và thực hiện các phép kiểm tra để đảm bảo logic hoạt động của code đúng với thiết kế mong muốn.

Ở đây một `unit` có thể là một thủ tục `procedure`, một hàm `function`, một `object`, một `module`, và thậm chí là một `package`. :D Tuy nhiên phương thức thực hiện kiểm tra là đi từ các`unit` cỡ nhỏ nhất rồi mới tới các đường viền cỡ lớn. Và cho tới phạm vi cuối cùng là kiểm tra hoạt động tổng bộ của nguyên cái `project` mà bạn đang viết luôn. :D

Hãy thử viết `test` cho một hàm đơn giản thực hiện phép chia số học `divide`. Chúng ta sẽ dự kiến thiết kế hàm này có thể tiếp nhận các tham số thuộc kiểu chuỗi `string` hoặc `number`.

```Desktop/divide.js
const divide =
   (dividend = 0) =>
   (divisor = 1) =>
      {  return dividend / divisor / 1001  }

module.exports = divide
```

Khá đơn giản, chúng ta chỉ cần trả về kết quả của phép chia tham số thứ nhất cho tham số thứ hai, rồi chia tiếp cho 1001. Bây giờ chúng ta cần viết `test` để dự trù các tình huống của tham số đầu vào và định hướng cách xử lý, chỉnh sửa code nếu cần thiết.

```Desktop/divide.test.js
const assert = require("assert")
const divide = require("./divide")

// --- đảm bảo kết quả trả về đúng độ lớn và là primitive number

var nine = divide ("9") (1)
assert.strict.equal(nine, 9, `Kết quả: ${result} | Kiểu: ${typeof result}`)

var hado = divide ("9") (2)
assert.strict.equal(hado, 4.5, `Kết quả: ${hado} | Kiểu: ${typeof hado}`)
```

```CMD|Terminal.io
cd Desktop
node divide.test.js

AssertionError [ERR_ASSERTION]: Kết quả: 0.008991008991008992 | Kiểu: number
```

Ok... chúng ta đã có kiểu trả về là `number` nhờ tính năng tự chuyển đổi kiểu khi các tham số tham gia vào phép chia `/`; Ở đây tham số đầu tiên được tự động chuyển về kiểu `number` trước khi phép chia được thực hiện và trả về kết quả. Tuy nhiên công thức thì có hơi sai rồi. :D Lúc nãy mình lỡ tay viết thêm cái đoạn chia tiếp cho 1001. Bạn xóa bớt đi nhé. :D

Bây giờ đứng ở vị trí viết code sử dụng hàm `divide`, chúng ta cũng rất muốn rằng nếu như một trong số các tham số truyền vào không hợp lệ, thì hàm này sẽ `throw` một object mô tả ngoại lệ chứ không trả về một kết quả vô định kiểu như `NaN`. Vậy chúng ta sẽ bổ sung thêm một trường hợp kiểm tra `test case` trước rồi mới nghĩ đến việc sửa lại code của hàm `divide`.

Đây là một phương thức để thiết kế một `unit` có khả năng tốt hơn để vận hành đúng như chúng ta mong muốn. Bởi vì khi đặt góc nhìn từ vị trí của người sử dụng một `unit` được cung cấp từ đâu đó, chúng ta sẽ biết chính xác hơn những mong muốn về cách mà `unit` đó phản hồi trong từng trường hợp sử dụng `use case` cụ thể.

```divide.test.js
const assert = require("assert")
const divide = require("./divide")

// --- 1. đảm bảo sẽ throw ngoại lệ nếu dividend không phải là một số
// --- 2. đảm bảo sẽ throw ngoại lệ nếu divisor không phải là một số
// --- 3. đảm bảo kết quả trả về đúng độ lớn và là primitive number
```

Đây là các `test case` mà chúng ta có thể liệt kê được hiện tại xuất phát từ mong muốn về phương cách phản hồi của `divide` khi sử dụng. Ở đây `test case` mà chúng ta vừa viết lúc nãy nên được đặt dưới cùng, bởi vì so với các trường hợp khác thì trường hợp phép chia được thực hiện và có kết quả trả về là trường hợp khá thuận lợi `happy`. 

Và khi chúng ta ưu tiên kiểm tra là các `test case` không thuận lợi trước `error first`, thì chúng ta sẽ có khả năng dự trù được các ngoại lệ tốt hơn. Điều này cũng đồng nghĩa với việc, code mà chúng ta viết ra sẽ ít có khả năng gặp lỗi hơn khi vận hành thực tế.

```divide.test.js
// --- 1. đảm bảo sẽ throw ngoại lệ nếu divident không phải là một số

var maybeNine = (_) => divide("nine")(1)
assert.throws(maybeNine, Error, "Thiếu logic kiểm tra divident")
```

Chạy `test` trước để kiểm tra hoạt động của code `test`. Lúc này chúng ta chưa bổ sung logic kiểm tra tham số `divident` do đó hàm `divide` sẽ không `throw` ngoại lệ. Do đó `assert.throws()` sẽ báo lỗi và in ra chuỗi thông báo trong code.

```CMD|Terminal.io
node divide.test.js

AssertionError [ERR_ASSERTION]: Missing expected exception (Error): Thiếu logic kiểm tra dividend
```

Bổ sung logic xử lý cho hàm `divide`.

```divide.js
const divide =
   (dividend = 0) =>
   (divisor = 1) =>
      {  dividend = Number.parseFloat(dividend)
         // - - - - - - - - - - - - - - - - - -
         if (Number.isNaN(dividend))   throw new Error("dividend không phải là một số")
         else                          return dividend / divisor
      }
```

Chắc là cái `test case` mới cũng ổn rồi. Chúng ta sẽ bổ sung luôn cái `test case` tiếp theo rồi mới chạy `test`.

```divide.test.js
// --- 1 đảm bảo throw trong trường hợp divident không phải là một số

var maybeNine = (_) => divide("nine")(1)
assert.throws(maybeNine, Error, "Thiếu logic kiểm tra divident")

// --- 2. đảm bảo sẽ throw ngoại lệ nếu divisor không phải là một số

var maybeHado = (_) => divide(9)("two")
assert.throws(maybeHado, Error, "Thiếu logic kiểm tra divisor")

// --- 3. đảm bảo kết quả trả về đúng độ lớn và là primitive number

var nine = divide("9")(1)
assert.strict.equal(nine, 9, `Kết quả: ${nine} | Kiểu: ${typeof nine}`)

var hado = divide("9")(2)
assert.strict.equal(hado, 4.5, `Kết quả: ${hado} | Kiểu: ${typeof hado}`)
```

```CMD|Terminal.io
node divide.test.js

AssertionError [ERR_ASSERTION]: Missing expected exception (Error): Thiếu logic kiểm tra divisor
```

Như vậy là logic `dividend` đã hoạt động tốt và chúng ta code `test case` cho `divisor` cũng đã hiện thông báo cần thêm logic kiểm tra `divisor`.

```divide.js
const divide =
   (dividend = 0) =>
   (divisor = 1) =>
      {  dividend = Number.parseFloat(dividend)
         divisor = Number.parseFloat(divisor)
         // - - - - - - - - - - - - - - - - - -
         if (Number.isNaN(dividend))   throw new Error("dividend không phải là một số")
         if (Number.isNaN(divisor))    throw new Error("divisor không phải là một số")
         else                          return dividend / divisor
      }
```

```CMD|Terminal.io
node divide.test.js

Không có gì được in ra trong console cả. Chắc ổn rồi. :D
```

Tiến trình viết `test` và bổ sung logic xử lý cho `divide` dần dần như chúng ta vừa thực hiện được gọi là Test Driven Development (TDD) - dịch nôm na là quy trình phát triển phần mềm dựa trên tác vụ kiểm thử. Tức là chúng ta cứ viết `test case` trước rồi mới viết code xử lý logic thực tế để vượt qua được mấy cái `test case`. Như vậy khi chúng ta đặt suy nghĩ về phương cách phản hồi của một `unit` sẽ ít bỏ sót những trường hợp ngoại lệ hơn.

Và trong trường hợp chúng ta có 1001 `unit` từ cấp `atomic` (nguyên tử) cho tới `planetary` (hành tinh) thì chúng ta sẽ có 1001 tệp `.test.js`. Lúc này nếu như chúng ta đang có một `unit` cỡ `planetary` đang hoạt động tốt với một vài `test case`, và tự nhiên nghĩ ra một cái `test case` mới cho một `unit` cỡ `atomic` ở bên dưới. Việc chỉnh sửa code logic của một `atomic` bên dưới để đáp ứng với `test case` mới có thể sẽ ảnh hưởng tới cả những cái `planetary` khác nữa đang lệ thuộc vào cái `atomic`.

Nếu vậy chúng ta sẽ cần phải chạy `test` lại 1001 tệp `.test.js` để đảm bảo rà soát được hết sự ảnh hưởng của một `atomic` tới toàn bộ `project`; Và công việc này chắc chắn là cần được tự động hóa giúp tăng độ chính xác và tiết kiệm thời gian để dành cho việc suy nghĩ về logic xử lý của các `unit`. Vì vậy nên...

## Một số Framework Unit Test phổ biến

Chắc chắn là có rất nhiều `framework` hỗ trợ tác vụ này, nhưng mình không sử dụng nhiều nên không biết hết để mà giới thiệu đủ. Trong danh sách dưới đây thì mình liệt kê tạm một vài cái `framework` mà mình biết, nếu bạn tìm thấy thêm cái nào thì chat spam ở cuối bài giúp mình để ghi chú lại đây nhé. Nhỡ có lúc cần tới. :D

- Jest - [https://jestjs.io/](https://jestjs.io/)
- QUnit - [https://qunitjs.com/](https://qunitjs.com/)
- Mocha - [https://mochajs.org/](https://mochajs.org/)
- Chai - [https://www.chaijs.com/](https://www.chaijs.com/)
- Cypress - [https://www.cypress.io/](https://www.cypress.io/)
- Jasmine - [https://jasmine.github.io/](https://jasmine.github.io/)

Tuy nhiên đối với nhu cầu sử dụng cơ bản dành cho các `beginner` như chúng ta thì có lẽ là `framework` nào cũng như nhau thôi. Vì vậy nên bạn cứ chọn tạm cái nào nghe tên gọi thấy xuôi xuôi mà dùng. :D Mình thì chọn Jest của Facebook và QUnit của jQuery.

Sau khi đã chọn được một `framework` để tự động hóa việc chạy `test` thì chúng ta cần thêm một công cụ hỗ trợ chạy code từ từ từng bước một để lần ra logic cần sửa lại khi gặp một `test case` mới. Trước đó thì chúng ta đã biết tới lệnh `debugger;` và trình chạy code `Inspector` trong các trình duyệt web.

NodeJS mặc định không có ứng dụng đồ họa để thể hiện một `Inspector` như vậy và sẽ cần một chút thiết lập để mượn tạm giao diện tương tác của các trình duyệt web `Chromium-based` (được xây dựng trên Chromium) - cụ thể là Google Chrome, Microsoft Edge, Opera, v.v... Và trong bài viết sau thì chúng ta sẽ tìm hiểu cách thiết lập để sử dụng một `Inspector` hỗ trợ soát lỗi vận hành khi xây dựng các ứng dụng trên NodeJS.

[[NodeJS] Bài 12 - Inspector & Debugger](https://viblo.asia/p/1VgZvAYrKAw)