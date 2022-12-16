Chào mọi người, hôm nay mình muốn giới thiệu với mọi người về `Date Object`, 1 trong những đối tượng mà chúng ta hầu như đều `đụng đến` ở mọi dự án.
Và mình muốn chia sẻ hiểu biết của mình về `Date Object trong Javascript` đến cho mọi người. Let's go! :car: 

# I. Khái niệm cơ bản:
>JavaScript Date Object lets us work with dates:

```javascript
const today = new Date();
```
[What will happen when i call `today`?](https://repl.it/@trdbau/WobblyConcernedPagerecognition)

`Date Object`  được giới thiệu là một `đối tượng - Object` chứa thông tin về thời gian, và tất nhiên `Date Object` cũng có những `method` để giúp chúng ta lấy được giá trị đó.

# II. Khai báo mới:
```javascript
const today = new Date();
```
Biến `today` sẽ có giá trị là thời điểm của đoạn code trên được biên dịch và thực hiện. Ví dụ nếu như code thực hiện vào `19:00` và pending
 3 giây bằng `setTimeout` rồi `console.log` thì giá trị vẫn là `19:00` nha :smile:.
 ```javascript
 const today = Date.now();

console.log(today); // your current date

setTimeout(() => {
	console.log(today); // still the same
}, 3000)
 ```
 [Run Code Here!](https://repl.it/@trdbau/GrowingMonumentalUnix#index.js)
 
Ồ, bạn thấy 2 dãy số loằng ngoằng `giống nhau` thay vì giá trị thời gian như ở ví dụ ban đầu hả?

Mình có thay đổi 1 chút, sử dụng `today` lấy giá trị từ `Date.now()`. Nó sẽ lấy chính xác giá trị thời gian thôi, nhưng theo 1 định dạng khác, gọi là `Dates as Milliseconds`, sẽ lấy mốc là `00:00:00 ngày 01, tháng 1, năm 1970 (UTC)`.

```javascript
// get Dates as Milliseconds
const today_1 = new Date().valueOf();
const today_2 = new Date().getTime();
const today_3 = Date.now();
```
[Run Code Here!](https://repl.it/@trdbau/KnowledgeableCommonTag#index.js)

Ngoài ra, chúng ta còn có thể  tạo 1 `Date Object` từ dữ liệu có sẵn:
```javascript
var day_1 = new Date(2020, 06, 20, 12, 00, 00, 0); // params: year, month, day, hour, minute, second, and millisecond.
var day_2 = new Date(1998, 10, 01, 06, 33, 30); // params: year, month, day, hour, minute, second.
// tương tự chúng ta có thể rút ngắn params cho đến khi chỉ còn một biến thì đây sẽ là milliseconds
var day_3 = new Date(1998); // param: milliseconds.
// hoặc chúng ta có thể truyền vào một chuỗi (dateString):
var day_4 = new Date("January 10, 1998 06:33:00");
```
[Run Code Here!](https://repl.it/@trdbau/KeyPungentString#index.js)


Hãy lưu ý rằng:
>JavaScript counts months from 0 to 11.
>
>January is 0. December is 11.

# III. Format:
Có 3 kiểu định dạng `Date` chính trọng `Javascript`, trong đó kiểu `ISO` có tên đầy đủ là `ISO-8601` và định dạng của `IOS` là `YYYY-MM-DDTHH:mm:ss.sssZ` cũng sẽ là kiểu mặc định khi bạn tạo mới 1 `Date Object`:

|Kiểu| Ví dụ|
| -------- | -------- | 
|ISO Date|"1998-01-10" (The International Standard) |
|Short Date|01/10/1998|
|Long Date|	"Jan 10 1998" hoặc"10 Jan 1998"|

# IV. Working with `Date Object`:
## 1. Date Methods:
Đối tượng `Date Object` cung cấp nhiều methods để xử lý thời gian, bạn có thể check list methods ở [ĐÂY](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Chúng ta sẽ đi qua một vài methods thường được dùng:

*  **getDate()** : lấy ngày của tháng:
```javascript
const day = new Date(1998, 01, 10);
console.log(day.getDate()); // -> 10
```
*  **getDay()** : lấy thứ trong tuần, với giá trị trả về là `0-6`, tương ứng với `Sunday-Saturday`:
```javascript
const day = new Date(1998, 01, 10);
console.log(day.getDay()); // -> 2
```
*  **getMonth()** : lấy tháng với giá trị từ `0-11`, tương ứng với `Jan-Dec`:
```javascript
const day = new Date(1998, 01, 10);
console.log(day.getMonth()); // -> 0
```
*  **getFullYear()** : lấy năm:
```javascript
const day = new Date(1998, 01, 10);
console.log(day.getFullYear()); // -> 1998
```
Chúng ta cũng có methods lấy giờ:
*  **getMilliseconds()** : lấy giây.
*  **getMinutes()** :  lấy phút.
*  **getHours()** : lấy giờ:
```javascript
const day = new Date(1998, 01, 10);
console.log(day.getHours()); // -> vì không có param cho Hour nên mặc định là 0
```
Ngoài ra chúng ta còn có các methods cho giờ quốc tế bằng việc thêm UTC sau get và trước phần tử chúng ta cần lấy: 

* **getUTCDate()**: lấy giờ theo mốc UTC.
## 2. Xử lý ngày giờ trong 1 project:
Như các bạn thấy, `Date Object` hỗ trợ chúng ta rất đầy đủ các methods, xong việc sử dụng lại là một vấn đề khác.

Chẳng hạn, chúng ta muốn lấy ra giờ hiện tại chẳng hạn, bạn có chắc mình sẽ thích sử dụng các methods của `Date Object`?
```javascript
const date = now Date();
console.log(date.getHours(),':',date.getMinutes()); // bạn hãy để ý nếu giờ bé hơn 10 sẽ không hiển thị ở định dạng 0X.
```
Nếu chúng ta lấy ra định dạng khác thì sao? Chẳng hạn: `MM-DD-YYYY hh:mm`, đoạn code trên sẽ rất là dài, nào là `get` giờ phút giây, rồi check xem giá trị có bé hơn 10 không để chèn thêm số 0.
Lúc này chúng ta thường tìm đến sự trợ giúp từ các Date Libraries bên ngoài, và được đông đảo người dùng nhất có lẽ là [moment.js](https://momentjs.com/). Hỗ trợ nhiều dạng, từ `format` cho đến `locales`. Nhưng vấn đề của Moment.js khiến mình và nhiều Dev khác không thích có lẽ là kích thước:

![](https://images.viblo.asia/7476fe69-64ce-45f3-90bc-7c67def0b52b.png)

Profile xịn xò từ phía moment.js  :clap:.

Nhưng chúng ta đã bỏ sót đi 1 bạn khác, đó là [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) - `built-in Object` của Javascript. `Intl` là 1 `API` ra mắt vào năm 2012 ([đọc thêm ở đây nè!](https://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html)), với kha khá công dụng:
>which provides language sensitive string comparison, number formatting, and date and time formatting.

Để có thể `format date` bằng methods `DateTimeFormat`:
```javascript
/* FORMAT: new Intl.DateTimeFormat(locales, options).format(DateTimeVariable); */
```
Ví dụ:
```javascript
const date = new Date();

console.log(new Intl.DateTimeFormat('en-US').format(date));
// output: "MM/DD/YYYY"
````
Cách thức sử dụng `Intl.DateTimeFormat` cũng cực kỳ đơn giản:

* Thay đổi `locales` cho định dạng ngày tháng hoặc giờ.
* Thay đổi `options` cho cách hiển thị:
```javascript
const options = {...};
const formattedDate = new Intl.DateTimeFormat('ja', options).format(date);
````
Các bạn có thể xem qua các `option` được hỗ trợ [ở dây](https://devhints.io/wip/intl-datetime).

Bây giờ, quay về với bài toán định dạng `MM-DD-YYYY hh:mm`,  chúng ta sẽ sử dụng `Intl.DateTimeFormat`:
```javascript
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const date = new Date();
const formattedDate = new Intl.DateTimeFormat('en-US', options)
                              .format(date)
                              .replace(/\,/g,'')
                              .replace(/\//g, '-');

console.log(formattedDate); // -> MM-DD-YYYY hh:mm
```
Vậy là bạn đã biết thêm 1 cách làm việc với `Date Object` rồi phải không? Kể từ khi biết đến `Intl.DateTimeFormat`, mình đã từ chối mọi `PR` `install` `moment.js` trong các dự án có mình tham gia :clap:. 

Song đây chỉ là lời khuyên của cá nhân mình thôi nhé, nếu một ngày bạn gặp 1 trường hợp làm việc với `Date Object` và cảm thấy phức tạp, bạn cũng có thể check qua list `Date Time Libraries` [này](https://blog.logrocket.com/javascript-date-libraries/)!!~~