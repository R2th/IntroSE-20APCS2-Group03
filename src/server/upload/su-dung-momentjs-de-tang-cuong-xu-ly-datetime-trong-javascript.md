Trong bất kỳ một project nào, việc xử lý datetime là không thể tránh khỏi, đặc biệt một số project đặc thù về datetime như booking, calendar,... thì đòi hỏi phải áp dụng một cách triệt để và nâng cao những kiến thức, cách tính toán, parse, validate datetime mà ngôn ngữ cung cấp. Trong javscript, `moment.js` là một thư viện mạnh mẽ hổ trợ những công việc phức tạp trên.
 
 ### Cài đặt:
 `moment.js` support trên nhiều môi trường browser, nodejs, và hổ trợ nhiều cách cài đặt npm, bower, cdn,...
 
Ở đây chúng ta sẽ cài đặt trên một javascript project sử dụng npm
```js
npm install moment
```

### I. Tạo moment object:

#### Now
Có nhiều cách để tạo một moment object với ngày hiện tại như sau:
```js
moment();
moment(undefined);
moment([]);
moment({});
moment(new Date());
```
> Lưu ý: `moment(null)` là moment object không hợp lệ

#### Tạo moment object với datetime cụ thể
Ở đây chúng ta muốn tạo một moment object với bất kì một datetime cụ thể thì có những cách sau:
##### 1. String
```js
const date = moment("2020-10-25") // Tạo một moment object với format YYYY-MM-DD
const dateTime = moment("2020-10-25 09:30:25") // Tạo một moment object với format YYYY-MM-DD HH:mm:ss
```
Vì datetime có nhiều loại format nên cách tạo moment ở trên có thể không chính xác và không support ở một số browsers nếu string là invalid. Do đó chúng ta nên sử dụng cách tạo moment với tham số string format đi kèm dưới đây

##### 2. String + format
Nếu biết chính xác định dạng datetime thì chúng ta có thể sử dụng string format để parse
```js
moment("12-25-1995", "MM-DD-YYYY");
moment("2020-10-20 5:30:15", "YYYY-MM-DD HH:mm:ss");
```

##### 3. Object
```js
moment({ years:2020, months:10, date:20, hours:15, minutes:10, seconds:3, milliseconds:123});
```
> Lưu ý: month có value từ 0 - 11

##### 4. Date object
Tạo moment object với javascript Date object
```js
const day = new Date(2020, 10, 16);
const dayWrapper = moment(day);
```
> Lưu ý: `dayWrapper` được clone từ `Date` object, việc thay đổi trên 2 object này là độc lập, không ảnh hưởng đến nhau

##### 5. Array
```js
moment([2020, 10, 14, 15, 25, 50, 125]); // Tạo moment object với parameters [year, month, day, hour, minute, second, millisecond]
```
>Lưu ý: month có value từ 0 - 11

##### 6. Unix Timestamp
Tương tự `new Date(Number)`, chúng ta có thể tạo một moment object từ số seconds/miliseconds kể từ mốc thời gian Unix Epoch (Jan 1 1970 12AM UTC)
```js
moment(1318781876406); // Timestamp miliseconds
moment.unix(1318781876); // Timestamp seconds
```

##### 7. UTC
UTC là time với múi giờ chuẩn quốc tế là 0, tức là không phụ thuộc vào múi giờ locale của máy.

Mặc đinh, một moment object sẽ được parse mà hiển thị theo local time (ví dụ VN có múi giờ +7 là GMT+0700). Nếu chúng ta muốn parse và display moment theo UTC thì sử dụng `moment.utc()` thay cho `moment()`

```js
moment().format();     // 2020-04-04T10:35:24+07:00
moment.utc().format(); // 2020-04-04T18:35:24+00:00
```

### II. Vaidation
Chúng ta có thể check một moment object có datetime là hợp lệ hay không với method `moment().isValid()`
```js
  const date = moment([2020, 10, 35])
  date.format() // Invalid date
  date.isValid() // false
```

### III. Get and Set
#### 1. Set
Thay đổi moment object bằng cách set value theo các unit tương ứng
```js
moment().millisecond(Number);
moment().second(Number);
moment().minute(Number);
moment().hour(Number);
moment().date(Number); // date of month 1-31
moment().day(Number|String); // day of week Sunday as 0 and Saturday as 6
moment().month(Number|String); // from 0 to 11
moment().year(Number);
```

#### 2. Get
Lấy value theo các unit tương ứng
```js
moment().millisecond(); // Number
moment().second(); // Number
moment().minute(); // Number
moment().hour(); // Number
moment().date(); // Number
moment().day(); // Number
moment().month(); // Number
moment().year(); // Number
```

#### 3. Find maximum date
Tìm ngày lớn nhất sử dụng method `max`
```js
moment.max(Moment[]) // return max moment object
const a = moment().subtract(1, 'day');
const b = moment().add(1, 'day');
moment.max([a, b]);  // b
```

#### 4. Find minimum date
Tìm ngày nhỏ nhất sử dụng method `min`
```js
moment.min(Moment[]) // return min moment object
const a = moment().subtract(1, 'day');
const b = moment().add(1, 'day');
moment.min([a, b]);  // a
```

### IV: Thao tác với moment object
Sau khi chúng ta tạo ra moment object; ta cần thực hiện các thao tác, tính toán trên object vừa tạo ra với những method sau đây

#### 1. Add
Thay đổi moment object bằng cách add thêm thời gian hoặc một khoảng thời gian
```js
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
```

```js
moment().add(1, 'days'); // Thêm 1 ngày vào time hiện tại
moment().add(1, 'days').add(1, 'months'); // Add thêm 1 ngày và 1 tháng vào time hiện tại sử dụng chaining method
moment().add({days:1, months:1}); // Add thêm 1 ngày và 1 tháng vào time hiện tại sử dụng object parameter
```

#### 2. Subtract
Thay đổi moment object bằng cách trừ bớt thời gian hoặc một khoảng thời gian
```js
moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
```

```js
moment().subtract(1, 'days'); // Trừ 1 ngày vào time hiện tại
moment().subtract(1, 'days').subtract(1, 'months'); // Trừ 1 ngày và 1 tháng vào time hiện tại sử dụng chaining method
moment().subtract({days:1, months:1}); // Trừ 1 ngày và 1 tháng vào time hiện tại sử dụng object parameter
```

#### 3. Start of Time
Thay đổi moment object bằng cách set nó bằng giá trị bắt đầu của một đơn vị thời gian (year, month, day, hour, minute, second)

```js
moment().startOf('year'); // set moment value bằng ngày đầu tiên của năm hiên tại(2020) => Jan 01 2020 00:00:00 GMT+0700
moment().startOf('month'); // set moment value bằng ngày đầu tiên của năm/tháng hiên tại(2020/04) => Apr 01 2020 00:00:00 GMT+0700
moment().startOf('date'); // set moment value bằng giờ đầu tiên của năm/tháng/ngày hiên tại(2020/04/22) => Apr 22 2020 00:00:00 GMT+0700
moment().startOf('hour'); // set moment value bằng phút đầu tiên của năm/tháng/ngày/giờ hiên tại(2020/04/22 05) => Apr 22 2020 05:00:00 GMT+0700 
moment().startOf('minute'); // set moment value bằng giây đầu tiên của năm/tháng/ngày/giờ/phút hiên tại(2020/04/22 05:10) => Apr 22 2020 05:10:00 GMT+0700
moment().startOf('second'); // set moment value bằng milisecond đầu tiên của năm/tháng/ngày/giờ/phút/giây hiên tại(2020/04/22 05:10:10) => Apr 22 2020 05:10:10 GMT+0700
```

#### 4. End of Time
End of time sẽ tương tự như Start of Time nhưng với giá trị kết thúc của một đơn vị thời gian

```js
moment().endOf('year'); // set moment value bằng tháng/ngày/giờ/phút/giây cuối cùng của năm hiên tại(2020) => Dec 31 2020 23:59:59 GMT+0700
```
Tương tự cho month, day, hour, minute, second