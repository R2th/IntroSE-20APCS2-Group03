Nếu như `lodash` giúp tăng sức mạnh cho javascript thì `date-fns` cũng là một thư viện giúp chúng ta làm việc với kiểu dữ liệu date time một cách dễ dàng hơn với `140+ functions`.
Một trong những thư viện javascript được mọi người chuyển qua sử dụng gần đây để thay thế cho thư viện `moment.js` với các ưu điểm hơn như cách viết hướng function sử dụng tới đâu import tới đó không giống như `moment.js` phải import cả thư viện trong khi mình không sử dụng hết các tính năng của nó.
Trong bài viết này mình sẽ giới thiệu một số các phương thức hữu hiệu khi làm việc với date time.
# compareAsc() & compareDsc()
`compareAsc(d1, d2)`  so sánh 2 tham số date (d1, d2) và trả về
* `-1` nếu d1 trước d2.
* `1` nếu d1 sau d2.
* `0` nếu d1 bằng d2.

Còn với `compareDsc` thì ngược lại.
```
var result = compareAsc(
  new Date(2018, 1, 1),
  new Date(2019, 1, 1)
)
//=> -1

var result = compareDsc(
  new Date(2018, 1, 1),
  new Date(2019, 1, 1)
)
//=> 1
```

# isBefore(), isAfter(), isEqual()
`isBefore(d1, d2)` phương thức trả về kiểu boolean:
* `true` nếu d1 trước d2.
* `false` nếu d1 bằng hoặc sau d2.

Còn `isAfter` và `isEqual` tương tự như cái tên của chúng.
```
var result = isBefore(new Date(2019, 1, 1), new Date(2018, 1, 1));
//=> false

var result = isAfter(new Date(2019, 1, 1), new Date(2018, 1, 1));
//=> true

var result = isEqual(new Date(2019, 1, 1), new Date(2019, 1, 1));
//=> true
```

# Tăng giảm đơn vị thời gian
Với các hàm `sub` và `add` được cung cấp như `subMonths`, `subYears`, `subDays`, ... chúng ta có thể dễ dàng tăng giảm time theo từng trường hợp. Ví dụ

`subMonths(date, monthSub)` trả về date mới với số tháng bị trừ đi bằng số tháng truyền vào ở tham số thứ 2.
```
var result = subMonths(new Date(2019, 1, 1), 1); // 1/2/2019
//=> 1/1/2019
```

# Tính toán sự khác nhau giữa 2 date
Với các hàm `differenceIn` như `differenceInMilliseconds`, `differenceInSeconds`, `differenceInMinutes`, ... sẽ trả về số đơn vị thời gian khác nhau giữa 2 date tùy vào các phương thức đưuọc gọi, Giá trị trả về là số âm nếu date 1 < date 2 và ngược lại.
```
var result = differenceInMonths(
  new Date(2019, 8, 1),
  new Date(2019, 1, 1)
)
//=> 7
```

# Lấy các đơn vị thời gian.
`date-fns` cung cấp các phương thức để lấy các đơn vị thời gian như
```
var result = getMilliseconds(new Date(2019, 1, 28, 11, 45, 5, 123))
//=> 123

var result = getSeconds(new Date(2019, 1, 28, 11, 45, 5, 123))
//=> 5

var result = getMinutes(new Date(2019, 1, 28, 11, 45, 5))
//=> 45

var result = getHours(new Date(2019, 1, 28, 11, 45))
//=> 11

var result = getDate(new Date(2019, 1, 28))
//=> 28

var result = getDay(new Date(2019, 1, 28))
//=> 4

var result = getMonth(new Date(2019, 1, 28))
//=> 1

var result = getYear(new Date(2019, 1, 28))
//=> 2019
```

# Bắt đầu và kết thúc của một đơn vị thời gian
Với các hàm `startOf` cung cấp như `startOfSecond`, `startOfMinute`, `startOfHour`, ... sẽ trả về date mới với đơn vị thời gian tương ứng với các phương thức dược gọi là thời điểm bắt đầu. Ví dụ
```
var result = startOfMonth(new Date(2019, 8, 2))
//=> 01/09/2019
```

Và ngược lại với các phương thức `starOf` là các phương thức `endOf`
```
var result = endOfMonth(new Date(2019, 8, 2))
//=> 30/09/2019
```
# Khoảng cách giữa 2 date
`distanceInWords` trả về khoảng cách giữa 2 date bằng các chuỗi.
![](https://images.viblo.asia/d3c1b313-ed1c-4364-8d73-3dd782dca58a.PNG)

`distanceInWordsToNow` cũng tương tự như `distanceInWords` nhưng khoảng cách là với thời gian hiện tại.

# Tạm kết
Trên đây là một số phương thức của thư viện `date-fns`. Để xem chi tiết các phương thức và nhiều hơn nữa các phương thức của `date-fns` các bạn có thể truy cập [date-fns docs](https://date-fns.org/v1.30.1/docs/) để xem cụ thể.