# I> Giới thiệu:
Hôm nay mình lại tìm hiểu về cách xử lý ngày tháng trong javascript với 1 thư viện date-fns. Lý do tìm hiểu là do thèn moment dạo này nghe anh em phân tích là dính một số phốt như :
- Tốc độ xử lý của nó chậm ở 1 số trường hợp(như parsing ngày chuẩn ISO8601 ) 
-  Dôi lúc trả về lỗi khó kiểm soát được. 

Mọi người có thể tìm hiểu tại đây: [why dont use momentjs](https://inventi.studio/en/blog/why-you-shouldnt-use-moment-js). Mình tìm hiểu tại [Link này](https://github.com/you-dont-need/You-Dont-Need-Momentjs) thì thấy date-fns có vẻ xử lý được thay thế cho momentjs. 
Nó có lượt rate khá cao, được giới việt cách hoạt động tương tự lodash về xử lý ngày giờ với hơn 140 function hay dùng.Cùng thử tìm hiểu nào mọi người ơi.
![](https://images.viblo.asia/4fc1394a-e227-44ec-a3e2-e2cdc71edcaf.PNG)
# II> Các hàm hay sử dụng để xử lý ngày giờ:
Đầu tiên ta cần cài đặt nó vào project:
```commnadline
npm install date-fns --save
# or
yarn add date-fns
```
## 1> Các hàm format ngày tháng:
### a. Format:
  Với javascript,  khi khởi tạo Date() sẽ ra định dạng với nhiều thông tin trong đó. Ta có thể lấy thông tin mình muốn lấy với hàm format():
```js
import format from 'date-fns/format'
format(date, format, [options])
```
Trong đó:
-  date ta khởi tạo bằng new Date()
-  format là dạng chuỗi string mình muốn lấy (ví dụ: MM/dd/yyyy HH:MM : tương ứng với tháng/ngày/năm Giờ: Phút định dạng 24h)
-  option: các option khác nếu có (ví dụ như hay dùng là locale)

Ví dụ:
``` js
const dateFormat = format(new Date(2014, 1, 11), "MM/dd/yyyy");
console.log(dateFormat);
//=> '02/11/2014'
```

### b. formatDistance:
Nếu bạn muốn biết khoảng cách giữa 2 khoảng thời gian 1 cách tương đối dưới dạng từ ngữ hàng ngày (3/2/2020 cách ngày 5/2/2020 là 3 ngày) bạn có thể dùng hàm này:

```js
import formatDistance from 'date-fns/formatDistance'
formatDistance(date, baseDate, [options])
```
Trong đó: 
- date, baseDate là 2 thời gian bạn muốn so sánh
- option: các tham số khác(nếu có)

Ví dụ:
```js
var distanceDate = formatDistance(new Date(2020, 1, 2), new Date(2021, 1, 2))
console.log(distanceDate)
// in aobut 1 year.
```
### c. Các hàm khác:
- formatDistanceToNow : khoảng cách từ 1 ngày giờ nào đó đến hiện tại:
```js
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
var distanceToNow = formatDistanceToNow(new Date(2014, 6, 2), { addSuffix: true })
```

## 2.  Các hàm tính toán:
### a. Add() : 
Ta có thể xác định thời gian sau 1 khoảng thời gian (năm, tháng, ngày, giờ, phút) là bao nhiêu. 
- Ví dụ:

```js
var addNewDate = add(new Date(), {
  years: 2,
  months: 9,
  weeks: 1,
  days: 7,
  hours: 5,
  minutes: 9,
  seconds: 30
});
console.log(addNewDate);
// Thu Jan 05 2023 03:19:15 GMT+0700 (Indochina Time)
   ```
    
   ### b. Sub():
   Tương tự hàm này cho phép ta xác định thời gian trước 1 khoảng thời gian (năm, tháng, ngày, giờ, phút) là bao nhiêu.
- Ví dụ:

```js
var subToday = add(new Date(), {
  years: 2,
  months: 9,
  weeks: 1,
  days: 7,
  hours: 5,
  minutes: 9,
  seconds: 30
});
console.log(subToday);
//Thu Jan 05 2023 03:34:47 GMT+0700 (Indochina Time)
```

Ngoài ra còn có các hàm khác : addMilliseconds, subMilliseconds, differenceInMilliseconds,addSeconds...

## 3> Các hàm kiểm tra:
### a. isAfter()
Kiểm tra xem thời gian thứ nhất có sau thời gian thứ 2 hay không. Ví dụ:
```js
import isAfter from 'date-fns/isAfter'
var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
//=> true
```
### b. isBefore():
Tương tự nó sẽ kiểm tra xem thời gian thứ nhất có trước thời gian thứ 2 hay không. Ví dụ:
```js
import isBefore from 'date-fns/isBefore'
// Is 10 July 1989 before 11 February 1987?
var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
//=> false
```
### c.isDate():
Kiểm tra xem thử nó có phải là thời gian hợp lệ hay không?
```js
import isDate from 'date-fns/isDate'
var result = isDate(new Date())
//=> true
var result = isDate('2014-02-31')
//=> false
var result = isDate({})
//=> false
```
### c.isFuture():
Kiểm tra xem nó có phải là ngày tháng trong tương lai hay không: 
```js
import isFuture from 'date-fns/isFuture'
var result = isFuture(new Date(2014, 11, 31))
//=> false
```
### d.isPast():
Kiểm tra xem nó có phải là ngày tháng trong quá khứ hay không: 
```js
import isPast from 'date-fns/isPast'
var result = isPast(new Date(2014, 6, 2))
//=> true
```


## 4> i18n:
- Đầu tiên ta phải import file định dạng của ngôn ngữ đó vào, ví dụ với tiếng Việt:
```js
import viLocale from "date-fns/locale/vi";
```
- Ví dụ để lấy thứ trong tiếng Việt:

```js
console.log(viLocale.localize.day(0)); //Chủ nhật
console.log(viLocale.localize.day(1));// Thứ 2 
console.log(viLocale.localize.day(2));// Thứ 3
```
- Tương tự lấy tháng trong tiếng Việt:
-```js
console.log(viLocale.localize.month(0)); //Tháng một
console.log(viLocale.localize.month(1));// Tháng hai
console.log(viLocale.localize.month(2));// Th
```

- Ví dụ ứng dụng với hàm format (ở mục 1>)
```js
console.log(
  formatDistance(
    new Date(1986, 3, 4, 11, 32, 0),
    new Date(1986, 3, 4, 10, 32, 0),
    { locale: viLocale }
  )
);
// khoảng 1 giờ
```
Tuy nhiên việc hỗ trợ i18n của thèn date-fns còn đang xây dựng và phát triển. còn chưa hỗ trợ về số lượng ngôn ngữ như của thèn moment (đã ra đời từ lâu).
# III> Kết luận:
Date-fns có thể là 1 thư viện đang để sử dụng vì nó được nhiều người tin dùng, nó có hỗ trợ hầu hết các trường hợp xử lý các vẫn đề vè ngày giờ(chú ý: với các version IE 9 thì bạn hãy cẩn thận đừng dùng đến nó @@ nó còn chưa hỗ trợ tốt được như moment).

Tham khảo:
https://inventi.studio/en/blog/why-you-shouldnt-use-moment-js
https://date-fns.org/v2.11.0/
https://github.com/you-dont-need/You-Dont-Need-Momentjs