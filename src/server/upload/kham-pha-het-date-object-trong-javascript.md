Thật ra để xử lý `Date` trong **JavaScript** thì có vô vàn thư viện tuyệt vời hỗ trợ ta xử lý từ A-Z như 2 thư viện phổ biến nhất mình hay dùng đó là `Moment.js` and `date-fns`. Tuy nhiên là nó rất phổ biến nhưng không phải trường hợp này chúng ta cũng sử dụng những thư viện trên cả vì nó **QUÁ MỨC CẦN THIẾT** đối với nhu cầu xử lý `Date` đơn giản. Nên trong bài viết này mình sẽ chia sẻ một trường hợp có thể sử dụng `Date Object` của **JavaScript**.

# Khởi tạo instance

Tạo một instance từ `date object`

Khi ta không truyền tham số thì lúc này mặc định sẽ lấy `timezone` trên máy của bạn:

```js
const now = new Date();

console.log(now); // Wed Nov 18 2020 18:42:31 GMT+0700 (Indochina Time)
```

## Tham số Mili giây


Bạn cũng có thể chuyển vào một số nguyên tuơng ứng với số lượng mili giây được tính từ 1/1/1970 đến bây giờ theo múi giờ `UTC`:

```js
const latter = new Date(4000000000);

console.log(latter); // Mon Feb 16 1970 15:06:40 GMT+0800 (Indochina Time)
```

## Date String

Ngoài ra, bạn cũng có thể tạo một đối tượng `Date` bằng cách chuyển một chuỗi ngày tháng ví dụ:

```js
const format1 = new Date("2020-11-18");

// hoặc tham số thời gian bao gồm cả time one. `Z` chính là timezone UTC
const format2 = new Date("2020-11-18T02:56:03.392Z");
```

## Date Components

Cách này bạn có thể tạo đối tuợng `Date` theo timezone hiện tại bằng cách truyền tham số thời gian theo thứ tự
>> năm, tháng, ngày, giờ , phút, giây, mili giây


```js
const someDate = new Date(2020, 11, 18, 16, 34, 12, 24);

console.log(someDate); // Fri Dec 18 2020 16:34:12 GMT+0700 (Indochina Time)
```

Đây là trường hợp không có đủ tham số:

```js
const someDate = new Date(2000, 5, 20, 16, null, 12, 24);

console.log(someDate); // Tue Jun 20 2000 16:00:12 GMT-0700 (PDT)
```

## Timestamps

Để lấy được timestamp chúng ta sẽ sử dụng hàm `getTime()` và kết quả của hàm này sẽ trả về giá trị là số milliseconds kể từ 1/1/1907 UTC

```js
const nowTimestamp = new Date().getTime();

console.log(nowTimestamp); // 1605700184613
```

Hoặc 

```js
const nowTimestamp = Date.now();

console.log(nowTimestamp); // 1605700261905
```

Cách này thường dùng trong trường hợp để so sánh giá trị của 2 thời gian khác nhau:

```js
const diff = new Date("1995-02-03").getTime() - new Date(0).getTime();
```

Nhưng vẫn còn 1 cách khác để so sánh đó chính là không cần sử dụng hàm `.getTime()` vì mặc định `Date` đã mặc định convert về dạng milliseconds

```js
const diff = new Date("1995-02-03") - new Date(0);
```

## Lấy giá trị Human

`Object Date` cũng có cung cấp cho chúng ta 1 vài method để lấy giá trị `human-friendly`  như  **toDateString**, **toTimeString**, **toLocaleDateString**, **toLocaleString**, **toLocaleTimeString** and **toUTCString** là những method được sử dụng nhiều nhất, dưới đây là những ví dụ cụ thể:

```js
const now = new Date();

console.log(now.toDateString()); // Wed Nov 18 2020
console.log(now.toTimeString()); // 18:42:31 GMT+0700 (Indochina Time)
console.log(now.toLocaleDateString()); // 11/18/2020
console.log(now.toLocaleString()); // 11/18/2020, 6:42:31 PM
console.log(now.toLocaleTimeString()); // 6:42:31 PM
console.log(now.toUTCString()); // Wed, 18 Nov 2020 11:42:31 GMT
```

## Lấy từng thành phần thời gian

Bạn có thể lấy gía trị của các thành phần ngày/giờ/...  từ `date instance` bằng 1 số methods sau:

* **getFullYear**(): The year, using 4 digits.
* **getDate**(): The day of the month (e.g: 31).
* **getMonth**(): A zero-based integer for the month (e.g: 0 for January).
* **getDay**(): The index for the day of the week from 0 for Sunday up to 6 for Saturday.
* **getHours**(): The hour of the day.
* **getMinutes**(): The minutes.
* **getSeconds**(): The seconds.
* **getMilliseconds**(): The milliseconds.

Còn đây là 1 ví dụ cụ thể:

```js
const now2 = new Date();

console.log(`It's ${now2.getHours()}:${now2.getMinutes()} o'clock`);
// It's 18:54 o'clock
```

## Gán giá trị cho từng thành phần thời gian

Tương tự như cách lấy thành phần ở trên, chúng ta cũng có thể gán giá trị cho các thành phần thời gian tuơng tự như trên chỉ cần thay đổi `get` thành `set`:

```js
const now3 = new Date();

now3.setFullYear(2049);

console.log(now3.toLocaleString()); // 11/18/2049, 6:55:15 PM
```