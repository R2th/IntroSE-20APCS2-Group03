Date là một thứ kỳ dị trong javascript. Nó làm cho chúng ta lo lắng đến nỗi mà khi chúng ta cần làm việc với ngày tháng là lại phải hướng tới các thư viện hỗ trợ (giống như Moment...)

Thực ra chúng ta không cần thiết lúc nào cũng phải sử dụng thư viện. Date có thể thực sự khá đơn giản nếu bạn biết những gì cần chú ý. Trong bài viết này mình sẽ cũng tìm hiểu mọi thứ cần hiểu về Date trong javascript.

Đầu tiên, hãy cùng tìm hiểu về timezones

## Timezones

Có hàng trăm múi giờ trên thế giới. Trong Javascript, chúng ta chỉ quan tâm tới 2 cái đó là Local Time và Coordinated Universal Time (UTC)

- Local time: hướng tới timezone máy tính của bạn.
- UTC: đồng nghĩa với Greenwich Mean Time (GMT)

Mặc định, gần như tất cả các phương thức Date trong javascript đều trả cho bạn ngày/giờ ở Local Time. Bạn chỉ nhận được giờ UTC nếu bạn chỉ định UTC cho phương thức đó.

## Creating a date

Bạn có thể tạo 1 ngày với phương thức **new Date()**. Có 4 cách có thể dùng new Date():

- Sử dụng với string date
- sử dụng với date arguments
- sử dụng với 1 timestamp
- hoặc không có đối số nào cả

### Date-string method

Ở đây, bạn có thể tạo 1 ngày bằng cách truyền 1 string date vào phương thức new Date

```
new Date('2019-03-01')
```

Đây có lẽ là cách tiếp cận cơ bản nhất.

Nếu bạn viết '02-03-2019', bạn sẽ không khó để hiểu đây là ngày 2 tháng 3 năm 2019. Nhưng nếu bạn viết như vậy trong javascript, bạn sẽ nhận được *Invalid date*

Trên thế giới có nhiều cách viết ngày tháng. Ví dụ như ở trên, bạn vừa có thể hiểu là ngày 2 tháng 3 năm 2019 hoặc ngày 3 tháng 2 năm 2019, tuỳ vào ngữ cảnh bạn nhắc tới. Chính vì thế Javascript ko thể hiểu tất cả và đưa về cho bạn kết quả mà bạn mong muốn.

Nên trong javascript, nếu bạn muốn dùng string date, bạn phải sử dụng đúng format mà nó quy định, một trong nhưng format mà JS chấp nhận **ISO 8601 Extended format**
```
// ISO 8601 Extended format
`YYYY-MM-DDTHH:mm:ss:sssZ`
```

Cần chú ý, có một vấn đề lớn ở với việc tạo ngày bằng chuỗi. Bạn có thể thấy nó khi console.log. 

Nếu bạn sống ở khu vực nằm sau GMT, bạn sẽ nhận được *10th June*
```
new Date('2019-06-11')
=> Date Mon Jun 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)
```

Nếu bạn sống ở khu vực phía trước GMT, bạn lại nhận được *11h June*
```
new Date('2019-06-11')
=> Date Tue Jun 11 2019 08:00:00 GMT+0800 (Singapore Standard Time)
```

Điều này xảy ra bởi vì phương thức date-string có một hành vi đặc biệt. Nếu bạn tạo ngày mà không chỉ định thời gian, bạn sẽ nhận được ngày ở UTC.

Nếu bạn muốn có ngày ở Local Time, bạn cần chỉ định thời gian cho phương thức.
```
new Date('2019-06-11T00:00')
=> Date Tue Jun 11 2019 00:00:00 GMT-0700 (Pacific Daylight Time)
```

## Creating dates with arguments

Bạn có thể truyền tối đa 7 đối số vào hàm để tạo ra ngày/giờ
- Year: 4 ký tự năm
- Month: (0-11). Month là zero-indexed
- Day
- Hour
- Minutes
- Seconds
- Milliseconds

```
new Date(2017, 3, 22, 5, 23, 50)
// Year: 2017
// Month: April (vì month là zero-indexed)
// Date: 22
// Hours: 5
// Minutes: 23
// Seconds: 50
```

Hãy luôn nhớ Month là dạng zero-indexed, January === 0, February === 1 ...
Nếu muốn lấy ngày ở UTC
```
new Date(Date.UTC((2019, 5, 11)))
```

## Creating a date with a timestamp

Trong javascript, Timestamp là số mili giây tính từng ngày 1 tháng 1 năm 1970 (1/1/1970 hay còn được gọi là Unix epoch time). 
```
new Date(1560211200000)
```

## With no arguments

Phương thức đơn giản nhất để lấy thời gian hiện tại (ở local time)
```
new Date()
```

# Formatting a date

Cơ bản Javascript cung cấp 7 method dùng để format date.
```
const date = new Date(2019, 0, 23, 17, 23, 42)
```
- **toString**: Wed Jan 23 2019 17:23:42 GMT+0800 (Singapore Standard Time)
- **toDateString**:  Wed Jan 23 2019
- **toLocaleString**: 23/01/2019, 17:23:42
- **toLocaleDateString**: 23/01/2019
- **toGMTString**: Wed, 23 Jan 2019 09:23:42 GMT
- **toUTCString**: Wed, 23 Jan 2019 09:23:42 GMT
- **toISOString**: 2019-01-23T09:23:42.079Z

## Comparing dates

Nếu bạn muốn biết một ngày là trước hay sau một ngày khác, bạn có thể so sánh chúng trực tiếp với >, <, >= và <=

```
const earlier = new Date(2019, 0, 26)
const later = new Date(2019, 0, 27)

console.log(earlier < later) // true
```

Sẽ khó khăn hơn nếu bạn muốn so sánh hai ngày có bằng nhau hay không. Bạn không thể so sánh chúng với == hay ===

```
const a = new Date(2019, 0, 26)
const b = new Date(2019, 0, 26)

console.log(a == b) //false
console.log(a === b) //false
```

Để có hiệu quả như mong muốn, bạn có thể quy đổi ngày về timestamps để so sánh với phương thức getTime

```
const isSameTime = (a, b) => a.getTime() === b.getTime()

const a = new Date(2019, 0, 26)
const b = new Date(2019, 0, 26)

console.log(isSameTime(a, b)) //true
```

## Automatic date correction

Nếu bạn truyền giá trị nằm ngoài khoảng giá trị chấp nhận của method, Javascript sẽ tự động tính toán lại cho bạn.
Ví dụ, nếu ta set ngày là 33 tháng 3 năm 2019. (thực tế làm gì có ngày 33 tháng 3). Trong trường hợp này Javascript sẽ tự tính toán lại và trả về ngày 3 tháng 3 năm 2019

```
// 33rd March => 3rd March
new Date(2019, 03, 03)
```