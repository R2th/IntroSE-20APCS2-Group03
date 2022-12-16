... hoặc ít nhất, bạn nên nhớ những điều này khi sử dụng nó

Đối tượng Date trong JavaScript không lý tưởng, API khá là nghèo nàn. Vì vậy, chúng ta thường đi tìm các thư viện bên ngoài và việc lựa chọn Moment.js là hiển nhiên. Moment.js - thư viện JS DateTime phổ biến nhất này hỗ trợ cho chúng ta mọi thứ từ Date API gốc.

Nó tốt hơn nhiều native API, vậy tại sao lại không nên sử dụng nó?

## 1. Tốc độ chậm
Chúng ta sẽ so sánh hiệu năng của Moment.js và các thư viện khác qua biểu đồ dưới đây

![](https://images.viblo.asia/490d1fd4-158b-4a4e-9985-34988188aaec.PNG)
So sánh thời gian cần thiết để thực hiện các tính toán chung x 100 000 [s]

**ISO 8601 Parsing**

Moment.js mất tận 9s để chuyển đổi 100 000 ngày định dạng ISO 8601, trong khi Day.js chỉ cần 0.5s. Chúng có API tương tự nhau, nhưng xử lý khác nhau. Day.js sử dụng thủ thuật thông minh, nó phát hiện nếu có Z ở cuối string đã truyền thì sẽ sử dụng hàm Native là new Date(String). Còn Moment.js, Luxon và JS-Joda lại sử dụng giải pháp regex riêng của nó. 

**EPOCH Time Parsing**

Không có gì bất ngờ cả. Tất cả thư viện đều làm rất tốt về tốc độ, nhưng khi bạn cần một cỗ máy siêu tốc, Date-Fns chính là bạn của bạn

**Formatting**

Thư viện hiệu quả nhất trong việc định dạng chính là JS-Joda. Nó sử dụng các hàm điều chỉnh với rất nhiều if và charAts, nhanh hơn các  giải pháp dựa trên regex

**Math**

Việc tính toán DateTime là khá khó khăn, Moment.js đã làm rất tốt nó, không giống như Day.js và Luxon. Tuy nhiên, một lần nữa, JS-Joda mới là thư viện đứng đầu trong  trận tranh tài này

**Comparisons**

Tất cả các thư viện đều có kết quả khá tốt tuy nhiên Luxon xử lý khá tệ với hàm `isSameDay` và Day.js thì bị chậm hơn ở hàm `isBefore`.

## 2. Dung lượng lớn
Moment.js có dung lượng 232 kB (66 kB gzipped), mà theo phân tích của Yoshihide Jimbo nó có thể giảm xuống khoảng 68 kB (23 kB gzipped) bằng cách sử dụng Webpack. Nó không hỗ trợ tree-shaking bởi vậy khó có thể giảm dung lượng của nó xuống hơn nữa. 

![](https://images.viblo.asia/e7ef8f92-86fc-45cb-9053-c5d52090288e.PNG)
So sánh dung lượng [kB]

JS-Joda nhẹ hơn một chút so với Moment.js, nhưng như đã đề cập, Moment.js là một thư viện thực sự lớn với hỗ trợ chu kỳ và múi giờ.

Sự khác biệt lớn ở đây đến từ Luxon, Day.js và Date-Fns. Ngay cả khi không sử dụng tree-shaking, Day.js chỉ tốn 3kB để minified & gzipped, nhẹ hơn 22 lần so với Moment.js.

Sẽ không có vấn đề gì nếu là back-end, nhưng chắc chắn nó cần được xem xét khi sử dụng ở Frontend-End. Thời gian tải lâu nghĩa là trải nghiệm người dùng và SEO cũng kém hơn.

## 3. Tính biến đổi
Hãy tưởng tượng bạn đang xây dựng một calendar app và bạn muốn tạo một khung thời gian

```javascript
const startedAt = moment()
const endedAt   = startedAt.add(1, 'year')

console.log(startedAt) // > 2020-02-09T13:39:07+01:00
console.log(endedAt)   // > 2020-02-09T13:39:07+01:00
```

```javascript
const init   = moment()
const add    = init.add(1, 'year')
const sub    = init.subtract(10, 'months')
const start  = init.startOf('year')
const end    = init.endOf('year')
const utc    = init.utc()
const local  = init.local()
const offset = init.utcOffset(480)
```
Tất cả biến đều tham chiếu đến cùng 1 đối tượng, vì vậy mà khi thay đổi 1 biến sẽ là thay đổi tất cả các biến. May thay, có một giải pháp đơn giản

```javascript
const startedAt = moment()
const endedAt   = moment(startedAt).add(1, 'year')
```
Truyền đối tượng Moment.js như là tham số trong phương thức moment() để tạo thực thể mới. Hãy ghi nhớ điều này mỗi khi sử dụng Moment.js

## 4. Khó khăn cho việc debug
Nếu dữ liệu input tốt, mọi thứ sẽ được dự đoán và hoạt động tốt. Tuy nhiên, đôi khi chúng ta sẽ mắc sai lầm trong việc chọn đầu vào.  Thật tốt nếu thư viện cảnh báo cho chúng ta có điều gì đó đang không ổn

Hãy xem ví dụ dưới đây. Chúng ta có một đối tượng persion và trong đó có 1 field là` lastVistedAt`. 

```javascript
const person = { lastVisitedAt: '2017-11-11T00:00:00.000Z' }
moment(person.lastVsitedAt).format() // > '2019-02-08T16:01:45+01:00'
```
Ở đây đã có một lỗi đánh máy xảy ra, đúng ra nó phải là lastVisitedAt thay vì lastVsitedAt. Theo thiết kế, `moment(undefined)` sẽ không gây ra lỗi. Nó xử lý như hàm `moment()`

Hãy cẩn thận hơn với các giá trị dưới đây:

```javascript
moment().format()          // > 2019-02-08T17:07:22+01:00
moment(undefined).format() // > 2019-02-08T17:07:22+01:00
moment(null).format()      // > Invalid date
moment({}).format()        // > 2019-02-08T17:07:22+01:00
moment("").format()        // > Invalid date
moment([]).format()        // > 2019-02-08T17:07:22+01:00
moment(NaN).format()       // > Invalid date
moment(0).format()         // > 1970-01-01T01:00:00+01:00
```
Chỉ có NULL, string rỗng và NaN là không hợp lệ, khá là không nhất quán. Ngoài ra, không có lỗi nào xảy ra, Moment.js chỉ trả về đối tượng `Invalid Date`

```javascript
moment().toISOString()          // >  2019-02-08T16:14:10.835Z
moment(undefined).toISOString() // >  2019-02-08T16:14:10.835Z
moment(null).toISOString()      // >  null
moment({}).toISOString()        // >  2019-02-08T16:14:10.836Z
moment("").toISOString()        // >  null
moment([]).toISOString()        // >  2019-02-08T16:14:10.836Z
moment(NaN).toISOString()       // >  null
moment(0).toISOString()         // >  1970-01-01T00:00:00.000Z
```

Khi sử dụng  `toISOString()` thì lại khác. Thay vì Invalid Date, chúng ta nhận được null. 

```javascript
moment()          // >  moment("2019-02-08T17:21:46.584")
moment(undefined) // >  moment("2019-02-08T17:21:46.584")
moment(null)      // >  moment.invalid(/* NaN */)
moment({})        // >  moment("2019-02-08T17:21:46.584")
moment("")        // >  moment.invalid(/* NaN */)
moment([])        // >  moment("2019-02-08T17:21:46.584")
moment(NaN)       // >  moment.invalid(/* NaN */)
moment(0)         // >  moment("1970-01-01T01:00:00.000")
```
## **Tổng kết**: 

`Undefined` không phải thuộc tính hợp lệ cho phương thức `moment()`, nhưng `null` thì có. Tuy nhiên, moment sẽ không gây ra lỗi khi sử dụng null, thay vào đó, bạn sẽ nhận được đối tượng Invalid Date, null hoặc đối tượng tuỳ chỉnh, phụ thuộc vào ngữ cảnh hiện tại🤯

**Mặt khác...**

...Moment.js mang lại rất nhiều tiện ích mà chúng ta không thể bỏ qua. Nó có cộng đồng lớn, dễ dàng giúp bạn trong việc phát hiện và sửa lỗi. Ngoài ra, bạn có thể tìm được thêm nhiều thư viện bên ngoài để thêm các nhiều chức năng khác  (ví dụ `moment-business-days`). Một điều nữa là nó hỗ trợ múi giờ tốt hơn nhiều so với các thư viện DateTime khác.

**Lựa chọn thay thế**

Việc nâng cấp từ native Date API thành Moment.js là một bước cải tiến lớn, nhưng không có nghĩa là nó không thể tốt hơn? Vậy cái gì mới thực sự là tốt hơn? Yep, và việc tốt hơn hay không này phụ thuộc vào nhu cầu của bạn cho dự án.

Nếu size nặng hay nhẹ là quan trọng tôi khuyên bạn nên sử dụng Date-Fns hoặc Day.js. Đối với Back-End và các dự án thực hiện nhiều phân tích cú pháp hoặc thao tác dễ bị lỗi, Luxon hoặc JS-Joda là sự lựa chọn tốt nhất. Nếu bạn cần sự hỗ trợ rộng rãi và nhiều plugin, hãy gắn bó với Moment.js nhưng hãy để ý đến các vấn đề của nó

![](https://images.viblo.asia/c231050a-4b2c-4525-b9c0-2415cf7cb922.PNG)

Nếu việc so sánh này là không đủ với bạn, hãy nhìn đoạn code dưới đây (hoặc [chạy online](https://repl.it/@piotrekfracek/DateTime))

```javascript
const moment                                 = require('moment');
const dayjs                                  = require('dayjs')
const { DateTime }                           = require('luxon')
const { ZonedDateTime, DateTimeFormatter }   = require('js-joda')
const { parse, addYears, subMonths, format } = require('date-fns')

const iso = '2011-10-11T13:00:00.000Z';

// Moment
const from    = moment(iso)
const to      = moment(from).add(1, 'year').subtract(6, 'months')
const format  = 'YYYY-MM-DD [at] HH:mm'
const fromStr = from.format(format)
const toStr   = to.format(format)
const str     = `From ${fromStr} to ${toStr}`
console.log(str) // > From 2011-10-11 at 13:00 to 2012-04-11 at 13:00

// Day.js
const from    = dayjs(iso)
const to      = from.add(1, 'year').subtract(6, 'months')
const format  = 'YYYY-MM-DD [at] HH:mm'
const fromStr = from.format(format)
const toStr   = to.format(format)
const str     = `From ${fromStr} to ${toStr}`
console.log(str) // > From 2011-10-11 at 13:00 to 2012-04-11 at 13:00

// Luxon
const from    = DateTime.fromISO(iso)
const to      = from.plus({ year: 1 }).minus({ month: 6 })
const format  = "yyyy-MM-dd 'at' HH:mm"
const fromStr = from.toFormat(format)
const toStr   = to.toFormat(format)
const str     = `From ${fromStr} to ${toStr}`
console.log(str) // > From 2011-10-11 at 13:00 to 2012-04-11 at 13:00

// JS-Joda
const from    = ZonedDateTime.parse(iso)
const to      = from.plusYears(1).minusMonths(6)
const format  = DateTimeFormatter.ofPattern("y-MM-d 'at' H:mm")
const fromStr = from.format(format)
const toStr   = to.format(format)
const str     = `From ${fromStr} to ${toStr}`
console.log(str) // > From 2011-10-11 at 13:00 to 2012-04-11 at 13:00

// Date-Fns
const from    = parse(iso)
const to      = subMonths(addYears(from, 1), 6) // or you can use any chain tool, e.g @inventistudio/using-js
const formatS = "YYYY-MM-DD [at] HH:mm"
const fromStr = format(from, formatS)
const toStr   = format(to, formatS)
const str     = `From ${fromStr} to ${toStr}`
console.log(str) // > From 2011-10-11 at 13:00 to 2012-04-11 at 13:00
```

## TL;DR
Moment.js khá nặng, chậm, biến đổi và khó để debug, tuy nhiên nó vẫn có nhiều lợi thế. Bạn có thể cân nhắc sử dụng các thư viện khác như  `JS-Joda`,` Luxon`, `Date-Fns` or `Day.js`, phụ thuộc vào nhu cầu của bạn. Và nếu bạn vẫn quyết định gắn bó với Moment.js, hãy luôn nhớ một số điều, ví dụ `moment(undefined)` sẽ trả về giá trị hợp lệ.

**Nguồn**: https://inventi.studio/en/blog/why-you-shouldnt-use-moment-js

**Tham khảo các thư viện:**
* Moment.js: https://momentjs.com/
* JS-Joda: https://js-joda.github.io/js-joda/
* Luxon: https://moment.github.io/luxon/
* Date-Fns: https://date-fns.org/
* Day.js: https://github.com/iamkun/dayjs