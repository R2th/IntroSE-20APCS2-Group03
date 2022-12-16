`Intl` là đối tượng mãnh mẽ hỗ trợ Javascript Internationalization API.

Các thuộc tính của nó là:
* `Intl.Collator`: cung cấp quyền truy cập vào việc so sánh các chuối.
* `Intl.DateTimeFormat`: cung cấp quyền truy cập vào việc định dạngung cấp quyền truy cập vào việc định dạng ngày giờ.
* `Intl.NumberFormat`: cung cấp quyền truy cập vào việc định dạng số.
* `Intl.PluralRules`:  cung cấp quyền truy cập vào các quy tác định dạng số nhiều  và quy tắc.
* `Intl.RelativeTimeFormat`: cung cấp quyền truy cập vào định dạng thời gian tương đối.

Nó cũng cung cấp một phương thức: `Intl.getCanonicalLocales()`.

`Intl.getCanonicalLocales()` cho phép bạn kiểm tra xem locale có hợp lệ không và trả về định dạng đúng cho nó. Nó có thể chấp nhận một chuỗi hoặc một mảng:

```
Intl.getCanonicalLocales('it-it') //[ 'it-IT' ]
Intl.getCanonicalLocales(['en-us', 'en-gb']) //[ 'en-US', 'en-GB' ]
```

và throw lỗi nếu locale không hợp lệ

```
Intl.getCanonicalLocales('it_it') //RangeError: Invalid language tag: it_it
```

Bạn có thể bắt lỗi này với try/catch.

Có nhiều cách để giao tiếp với `Intl API` cho các nhu cầu cụ thể. Đặc biệt chúng ta có thể đề cập:

* `String.prototype.localeCompare()`
* `Number.prototype.toLocaleString()`
* `Date.prototype.toLocaleString()`
* `Date.prototype.toLocaleDateString()`
* `Date.prototype.toLocaleTimeString()`

Hãy cùng tìm hiểu cách làm việc với các thuộc tính `Intl` ở trên:

### Intl.Collator

Thuộc tính này cho phép bạn truy cập vào việc so sánh chuỗi.

Bạn khởi tạo một đối tượng Collator bằng cách sử dụng `new Intl.Collator ()` , chuyển cho nó một locale và bạn sử dụng phương thức `compare ()` của nó để trả về giá trị dương nếu đối số thứ nhất xuất hiện sau đối số thứ hai. Một số âm nếu nó ngược lại và ngược lại nếu nó có cùng giá trị:

```
const collator = new Intl.Collator('it-IT')
collator.compare('a', 'c') //a negative value
collator.compare('c', 'b') //a positive value
```

Chúng ta có thể sử dụng nó để sắp xếp các mảng ký tự.

### Intl.DateTimeFormat

Thuộc tính này cho phép bạn truy cập vào định dạng ngày và giờ.

Bạn khởi tạo một đối tượng DateTimeFormat bằng cách sử dụng `newIntl.DateTimeFormat ()`, chuyển nó thành một locale và sau đó bạn chuyển nó một ngày để định dạng nó như ngôn ngữ đó thích:

```
const date = new Date()
let dateTimeFormatter = new Intl.DateTimeFormat('it-IT')
dateTimeFormatter.format(date) //27/1/2019
dateTimeFormatter = new Intl.DateTimeFormat('en-GB')
dateTimeFormatter.format(date) //27/01/2019
dateTimeFormatter = new Intl.DateTimeFormat('en-US')
dateTimeFormatter.format(date) //1/27/2019
```

Phương thức `formatToParts ()` trả về một mảng với tất cả các phần ngày:

```
const date = new Date()
const dateTimeFormatter = new Intl.DateTimeFormat('en-US')
dateTimeFormatter.formatToParts(date)
/*
[ { type: 'month', value: '1' },
  { type: 'literal', value: '/' },
  { type: 'day', value: '27' },
  { type: 'literal', value: '/' },
  { type: 'year', value: '2019' } ]
*/
```

Bạn có thể  sử dụng để in ra thời gian. Kiểm tra tất cả các tùy chọn bạn có thể sử dụng trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)

### Intl.NumberFormat

Thuộc tính này cho phép bạn truy cập vào định dạng số. Bạn có thể sử dụng nó để định dạng một số làm giá trị tiền tệ.

Giả sử bạn có một số như là số `10`, và nó đại diện cho giá của một cái gì đó.

Bạn muốn chuyển đổi nó thành `$ 10,00`.

Tuy nhiên, nếu số có nhiều hơn 3 chữ số, thì nó sẽ được hiển thị khác đi, ví dụ, `1000` sẽ được hiển thị là `$ 1.000,00`.

Đây là USD, tuy nhiên

Các quốc gia khác nhau có các quy ước khác nhau để hiển thị các giá trị.

JavaScript biến chúng trở nên dễ dàng hơn với [ECMAScript Internationalization API](https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api/), một API cung cấp rất nhiều tính năng quốc tế hóa, như định dạng ngày và giờ.

Nó được hỗ trợ rất tốt: 
![](https://images.viblo.asia/f7622c0f-d5c3-4001-aaa6-3e6e3ca17d2f.png)

```
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

formatter.format(1000) // "$1,000.00"
formatter.format(10) // "$10.00"
formatter.format(123233000) // "$123,233,000.00"
```

Thuộc tính `minimFractionDigits` đặt phần phân số luôn có ít nhất 2 chữ số. Bạn có thể kiểm tra các tham số khác bạn có thể sử dụng trong trang [MDN NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

Ví dụ tạo ra một định dạng số cho đồng tiền Euro, cho quốc gia Ý:

```
const formatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR'
})
```

### Intl.PluralRules

Thuộc tính này cho phép bạn truy cập vào định dạng số nhiều cà quy tắc số nhiều. Tôi đã tìm thấy [1 ví dụ trên Google ủa Mathias Bynens](https://v8.dev/features/intl-pluralrules), 1 ví dụ duy nhất mà tôi nghĩ có thể liên quan đến việc sử dụng trong thực tế: đưa ra một hậu tố cho các số thứ tự: 0th, 1, 2, 3, 4, 5 ..

```
const pr = new Intl.PluralRules('en-US', {
    type: 'ordinal'
})
pr.select(0) //other
pr.select(1) //one
pr.select(2) //two
pr.select(3) //few
pr.select(4) //other
pr.select(10) //other
pr.select(22) //two
```

Mỗi khi chúng ta có `other`, chúng tôi dịch nó sang `th`. Nếu chúng ta có `one`, chúng ta sử dụng `st`. Đối với `two` chúng tôi sử dụng `nd`. `few` sẽ là `rd`.

Chúng ta có thể sử dụng một đối tượng để tạo một mảng kết hợp:

```
const suffixes = {
  'one': 'st',
  'two': 'nd',
  'few': 'rd',
  'other': 'th'
}
```

và chúng ta thực hiện một chức năng định dạng để tham chiếu giá trị trong đối tượng và trả về một chuỗi chứa số gốc và hậu tố của nó:

```
const format = (number) => `${number}${suffixes[pr.select(number)]}`
```

Bây giờ chúng ta có thể sử dụng nó như thế này:

```
format(0) //0th
format(1) //1st
format(2) //2nd
format(3) //3rd
format(4) //4th
format(21) //21st
format(22) //22nd
```