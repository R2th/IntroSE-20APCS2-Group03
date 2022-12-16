![image.png](https://images.viblo.asia/fa7e2c79-f49f-48cf-ab2a-839a3aac5ec4.png)

Như tiêu đề bài viết, hôm nay chúng ta sẽ cùng nhau tìm hiểu về Date object trong JavaScript, chuyên về xử lý các vấn đề liên quan đến ngày tháng năm và giờ giấc. Thời gian mà ông thần này lấy chính là thời gian ở máy tính của chúng ta, do đó mà khi xử lý hay thao tác gì đến thời gian để lưu trữ lại thì ta không nên lấy ở client mà dành việc đó ở phía sever nhé 😉.

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/date-trong-javascript/)

## I. Khái niệm.

Date là một object hổ trợ ta có thể lấy thời gian ở client, qua đó ta có thể sử dụng các giá trị này cho các công việc khác cần nó.

Ví dụ như check xem người dùng login được bao lâu nếu quá thời gian cho phép thì sẽ tự động logout ra chẳng hạn,...

## II. Cú pháp và cách sử dụng.

Vì là một object nên khi khai báo một đối tượng mới, ta khai báo dạng constructor như sau:

```
let takeDate = new Date();
```

Ngoài ra bạn có thể truyền giá trị khởi tạo vào như: date string, một value number nào đó, ngày, tháng, năm, giờ, phút, giây.

```
const takeDate = new Date();
const takeDate = new Date(value);
const takeDate = new Date(dateString); 
// date string ~ "April 06, 2017 12:00:00"

const takeDate = new Date(year, month);
const takeDate = new Date(year, month, day);
const takeDate = new Date(year, month, day, hours);
const takeDate = new Date(year, month, day, hours, minutes);
const takeDate = new Date(year, month, day, hours, minutes, seconds);
const takeDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
```

Ví dụ:

```
let today = new Date(); 
//--> Sun Aug 08 2021 16:38:44 GMT+0700 (Indochina Time)

let birthday_1 = new Date('June 07, 1998 03:24:00');
let birthday_2 = new Date('1998-06-07T03:24:00');
//--> Sun Jun 07 1998 03:24:00 GMT+0700 (Indochina Time)

let birthday_3 = new Date(1998, 06, 07);   
//--> Tue Jul 07 1998 00:00:00 GMT+0700 (Indochina Time)

let birthday_4 = new Date(1998, 06, 07, 3, 24, 0);
//--> Tue Jul 07 1998 03:24:00 GMT+0700 (Indochina Time)
```

## III. Các định dạng của date trong JavaScript.

Trong JavaScript có 4 định dạng cơ bản của một chuỗi ngày tháng gồm: short date, long date, full date và ISO date.

### 1. Định dạng short date.

Định dạng short date được lưu ở dạng `MM/DD/YYYY`, `YYYY/MM/DD`, `MM-DD-YYYY` hoặc `YYYY-MM-DD`

```
let shortDate_1 = new Date("08-08-2021");
let shortDate_2 = new Date("08/08/2021");
let shortDate_3 = new Date("2021/08/08");
let shortDate_4 = new Date("2021-08-08");
//--> Sun Aug 08 2021 07:00:00 GMT+0700 (Indochina Time)
```

### 2. Định dạng long date.

Một chuỗi ngày tháng năm thuộc định dạng long date có kiểu Month DD YYYY. Với Month ở đây là chữ đầy đủ của tháng hoặc chữ viết tắt của tháng. Ưu điểm của dạng này là bạn đổi vị trí của nó với nhau thì Date object cũng tự động convert lại theo đúng định dạng.

```
let longDate_1 = new Date("Aug 08 2021");
let longDate_2 = new Date("2021 Aug 08");
let longDate_3 = new Date("08 2021 Aug");
let longDate_4 = new Date("August 08 2021");
//--> Sun Aug 08 2021 00:00:00 GMT+0700 (Indochina Time)
```

### 3. Định dạng full date.

Một chuỗi ngày tháng năm được xem là full date thì sẽ có dạng `Day Month DD YYYY` với `Day` là thứ trong tuần (viết bằng tiếng anh nhé 😉) có thể ghi đầy đủ hoặc viết tắt, `Month` cũng vậy.

```
let fullDate_1 = new Date("Sunday August 08 2021");
let fullDate_2 = new Date("Sun Aug 08 2021");
//--> Sun Aug 08 2021 00:00:00 GMT+0700 (Indochina Time)
```

### 4. Định dạng ISO date.

Định dạng ISO date là định dạng theo chuẩn ISO 8601 sẽ có dạng `YYYY-MM-DD`, `YYYY-MM` hoặc `YYYY`

Lưu ý: nếu bạn truyền vào không đủ (ngày, tháng, năm hay giờ,  phút , giây) thì mặc định các tham số khác sẽ lấy thời gian nhỏ nhất.

```
var ISO_1 = new Date("2021-08-08");
//--> Sun Aug 08 2021 07:00:00 GMT+0700 (Indochina Time)

var ISO_2 = new Date("2021-08");
//--> Sun Aug 01 2021 07:00:00 GMT+0700 (Indochina Time)

var ISO_3 = new Date("2021");
//--> Fri Jan 01 2021 07:00:00 GMT+0700 (Indochina Time)
```

### 5. Date JavaScript format

Là người việt, chúng ta chắc chắn sẽ muốn format lại các định dạng ngày tháng năm mà ta nhận được sang định dạng quen thuộc với người việt chúng ta, đúng không 😁. Việt Nam chúng ta sử dụng định dạng `dd/mm/yyyy`.

Trong JavaScript, định dạng ngày tháng năm được sử dụng là chuẩn quốc tế, do đó để convert lại sang định dạng của Việt Nam chúng ta thực hiện như sau:

```
function formatDateVN(dateString) {
    var subDateStr = dateString.split("/");
 
    // Tháng bắt đầu từ 0 nên ta phải giảm đi 1: subDateStr[1] - 1
    return new Date(+subDateStr[2], subDateStr[1] - 1, +subDateStr[0]); 
}

formatDateVN('08/08/2021');
//--> Sun Aug 08 2021 00:00:00 GMT+0700 (Indochina Time)
```

## IV. Các hàm xử lý date trong JavaScript.

JavaScript có support cho chúng ta các hàm dùng để thao tác với ngày tháng năm gồm 2 loại là Get date và Set date

### 1. Nhóm Get date.

Nhóm gồm 10 hàm hổ trợ lấy các mốc thời gian thông dụng bao gồm:

* getDate(): hàm trả về ngày trong tháng (từ ngày 1 - 31).
* getDay(): hàm trả về ngày trong tuần (0-6), với chủ nhật là 0, thứ 2 là 1, thứ 3 là 2 ,...
* getMonth(): hàm trả về tháng trong năm (từ 0 - 11), do đó ta cần cộng thêm 1 nha.
* getFullYear(): hàm trả về năm dạng đầy đủ dạng YYYY.
* getHours(): hàm trả về số giờ dạng 24h ( từ 0 - 23)
* getMinutes() trả về phút trong giờ (0 - 59).
* getSeconds() trả về số giây trong phút (0 - 59).
* getMilliSeconds() trả về tích tắc trong giây (0 - 999).
* getTime() Trả về thời gian dạng mili giây.

```
// Đối tượng thời gian hiện tại
var presentDate = new Date();
 
presentDate.getDate(); 			//--> 8
presentDate.getDay(); 			//--> 0: Chủ nhật
presentDate.getFullYear(); 		//--> 2021
presentDate.getYear(); 			//--> 121
presentDate.getHours(); 		//--> 17
presentDate.getMilliseconds(); 	//--> 636
presentDate.getMinutes();		//--> 14
presentDate.getMonth() + 1; 	//--> 8
presentDate.getSeconds();		//--> 6
presentDate.getTime(); 			//--> 1628417646636
```

### 2. Nhóm Set date.

Nhóm này gồm 9 hàm hổ trợ tạo một mốc thời gian, bao gồm:

* setDate(): hàm giúp ta thiết lập ngày (từ 1 - 31).
* setFullYear(): hàm giúp ta thiết lập năm đầy đủ theo dạng `YYYY`.
* setYear(): hàm giúp ta thiết lậpnăm 2 số cuối YY.
* setHours(): hàm giúp ta thiết lập số giờ (0 - 23)
* setMiliSeconds(): hàm giúp ta thiết lập số mili giây (0 - 999)
* setMinutes(): hàm giúp ta thiết lập số phút (0 - 59)
* setMonth(): hàm giúp ta thiết lập tháng (0 - 11)
* setSeconds(): hàm giúp ta thiết lập số giây (0 - 59)
* setTime(): hàm giúp ta thiết lập thời gian đã được convert sang dạng miliseconds.

```
// Đối tượng thời gian hiện tại
const presentDate = new Date();
 
presentDate.setDate(20); 	   //--> 1629454864897
presentDate.setFullYear(2022); //--> 1660990864897
presentDate.setHours(2);       //--> 1660936864897
presentDate.setMilliseconds(2);//--> 1660936864002
presentDate.setMinutes(3);     //--> 1660935784002
presentDate.setMonth(4); 	   //--> 1652986984002
presentDate.setSeconds(5); 	   //--> 1652986985002
```

Lưu ý:

* Hàm `set` là dùng để khởi tạo, do đó ta cần truyền tham số khi sử dụng.
* Các hàm này có tác động với nhau, tức là khi ta `set` sai ngày giờ thì nó sẽ tự động lấy ngày giờ mặc định đấy nhé.
* Nếu bạn dùng hàm `setTime()` để set thời gian thì nó sẽ ảnh hưởng tới tất cả các giá trị còn lại, bởi vì hàm `setTime()` là hàm thiết lập thời gian đầy đủ đã chuyển sang định dạng miniseconds.

## V. Tổng kết.

Bài này chỉ đơn giản là giới thiệu về khái niệm Date object và các function của Date cùng các định dạng ngày tháng năm để giúp bạn có chút kiến thức để làm việc với date trong JavaScript được thuận lợi hơn. Ngoài các phương thức kể trên thì vẫn còn các phương thức khác ít dùng hơn thôi nếu các bạn muốn có thể tìm hiểu [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date?retiredLocale=vi). Cảm ơn các bạn đã đọc 🤗. See u again!