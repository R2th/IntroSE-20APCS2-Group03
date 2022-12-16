Bài viết này là một trong số những bài thuộc chỉ mục bổ sung của Sub-Series JavaScript. Ở đây chúng ta sẽ điểm qua một vài phương thức thường dùng của các object `Date` và một vài ứng dụng của các giá trị `Symbol`.

## Một số phương thức thường dùng của các object Date

Một `object Date` trong JavaScript được sử dụng để biểu thị một thời điểm `timestamp` duy nhất trong dòng thời gian theo định dạng độc lập và không phụ thuộc vào nền tảng nào. Mỗi `object Date` có chứa một giá trị số học, biểu thị thời gian theo đơn vị `mili-giây` tính từ mốc thời gian `0:00:00 1/1/1970 UTC`.

```timestamp.js
var timestamp = new Date();

var miliseconds = timestamp.getTime() + ' mili-seconds\n'
               +'from 0:00:00 1/1/1970 UTC';
console.log(miliseconds);
// '1648864582000 mili-seconds'
// 'from 0:00:00 1/1/1970 UTC'

var datetime = timestamp.toUTCString();
console.log(datetime);
// 'Sat, 02 Apr 2022 01:56:22 GMT'
```

Một giá trị `timestamp` bât kỳ cũng có thể được chuyển đổi thành một `object Date` bằng cách sử dụng hàm khởi tạo.

```timestamp.js
var timestamp1 = new Date('Sat, 02 Apr 2022 01:56:22 GMT');
console.log( timestamp1.getTime() );
// 1648864582000

var timestamp2 = new Date(1648864582000);
console.log( timestamp2.toUTCString() );
// 'Sat, 02 Apr 2022 01:56:22 GMT'
```

Ngoài giá trị trung tâm biểu thị thời gian và cột mốc quy ước đều được tính theo giờ UTC, các `object Date` có cung cấp một số phương thức phổ biến để thực hiện trích xuất thông tin từ giá trị trung tâm, và biểu thị tương quan theo múi giờ địa phương `locale` mà hệ thống đang sử dụng.

```timestamp.js
var timestamp = new Date(1_648_864_582_123);   // 'Sat, 02 Apr 2022 01:56:22 GMT'

console.log( timestamp.getFullYear() );   // 2022
console.log( timestamp.getMonth() );   // 3 (tháng tư)
console.log( timestamp.getDate() );   // 2 (mùng hai)
console.log( timestamp.getDay() );   // 6 (thứ bảy)
console.log( timestamp.getHours() );   // 8 (08:56:22 GMT+7)
console.log( timestamp.getMinutes() );   // 56
console.log( timestamp.getSeconds() );   // 22
console.log( timestamp.getMilliseconds() );   // 123
```

Bên cạnh đó thì chúng ta cũng có thể chỉnh sửa thông tin lưu trữ trong các `object Date` với các phương thức `.setSomething()` tương ứng với `getSomething()` trong code ví dụ trên.

## Sử dụng các giá trị biểu trưng Symbol

Các giá trị biểu trưng `Symbol` là các giá trị không trùng lặp với bất kỳ một giá trị nào khác trong môi trường vận hành phần mềm. Chính vì đặc tính này, các giá trị `Symbol` thường được sử dụng làm thành phần định vị cho các `object`. Trước khi các giá trị `Symbol` xuất hiện, để biểu thị tính đặc trưng duy nhất của một bản ghi dữ liệu, một object, người ta sử dụng các `timestamp` hiện hành được tạo ra và lưu trữ tạm trong quãng thời gian phần mềm được sử dụng.

Để tạo ra một giá trị `Symbol`, chúng ta có thể sử dụng hàm `Symbol` không kèm theo từ khóa `new`. Ở đây hàm `Symbol` được thiết kế với đặc trưng như vậy. :D

```unique.js
var firstSymbol = Symbol();
var secondSymbol = Symbol();

console.log(firstSymbol == secondSymbol);   // false
```

Để thuận tiện hơn trong việc truy xuất và sử dụng, chúng ta có thể truyền vào một chuỗi để sử dụng làm từ khóa truy xuất trong thư viện toàn cục `Symbol registery` - được thiết kế để lưu trữ tất các `Symbol` đã được tạo ra và đảm bảo không có sự trùng lặp.

```unique.js
var firstSymbol = Symbol('first');
var secondSymbol = Symbol('second');

var oneSymbol = Symbol.for('first');
var oneKey = Symbol.keyFor(oneSymbol);

console.log( oneSymbol );   // Symbol(first)
console.log( oneKey );   // 'first'
```

Ngoài việc được sử dụng để làm các thành phần định danh cho các `object`. Các giá trị `Symbol` còn được sử dụng để làm địa chỉ tham chiếu tới một số thuộc tính và phương thức của các `object` và gửi `key` cho code bên ngoài cần sử dụng phương thức đó. Cách thức sử dụng này giúp hạn chế việc tham chiếu tự do tới các thuộc tính và phương thức quan trọng.

Một số giá trị `Symbol` đặc biệt được cung cấp bởi JavaScript còn cho phép chúng ta định nghĩa lại nhiều phương thức hoạt động của các kiểu `object`. Điển hình là [`Symbol.asyncIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) có thể được sử dụng tạo ra phương thức hỗ trợ lặp `async` của một `object` chứa dữ liệu tiếp nhận từ một nguồn `async` nào đó; Và như vậy chúng ta sẽ có thể sử dụng vòng lặp `for await .. of` để lặp qua nguồn dữ liệu `async` này.

```forasync.js
var stringListFromServer = { };

stringListFromServer[Symbol.asyncIterator] = async function* () {
   yield 'sky';
   yield 'tree';
   yield 'we';
};  // iterator

void async function() {
   for await (var oneString of stringListFromServer) {
      console.log(oneString);
   }
} (); // void

// 'sky'
// 'tree'
// 'we'
```

[Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) - tương tự với `Symbol.asyncIterator`, nhưng được thiết kế dành cho các nguồn dữ liệu thông thường.

```iterator.js
const oneObject = { };

oneObject[Symbol.iterator] = function* () {
   yield 1;
   yield 2;
   yield 3;
}; // iterator

console.log([ ...oneObject ]);
// [1, 2, 3]
```

[Symbol.isConcatSpreadable] - được sử dụng để cho phép một `object` phức tạp có thể được dàn trải thành mảng chứa các giá trị khi được nối vào một mảng bằng phương thức `array.concat(value)`.

```notarray.js
var oneArray = [1, 2, 3];

var notArray = {
   length: 3,
   0: 'sky',
   1: 'tree',
   2: 'we'
}; // notArray

notArray[Symbol.isConcatSpreadable] = true;

var newArray = oneArray.concat(notArray);
console.log(newArray);
// [1, 2, 3, 'sky', 'tree', 'we']
```

[Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) - định nghĩa cách thức chuyển đổi về một giá trị `primitive` của một `object.`

```unboxing.js
var eightyOne = { value: 'eighty-one' }; // thing

eightyOne[Symbol.toPrimitive] = function (hint) {
   if (hint == 'number')   return 81;
   else                    return this.value;
}; // toPrimitive

console.log('the value is: ' + eightyOne);
// 'the thing is: eighty-one'

console.log(-eightyOne - 9);
// -90
```

## Kết thúc bài viết

Bài viết bổ sung và điểm danh các phương thức phổ biến làm việc với kiểu dữ liệu `Date` và `Symbol` của chúng ta tới đây là kết thúc. 😄 Như vậy là chúng ta đã thực hiện xong các bài viết bổ sung về các thao tác thường gặp khi làm việc với các kiểu dữ liệu phổ biến. Nhóm nội dung còn lại của chúng ta là chủ đề về các mô hình lập trình, hay yếu tố trọng tâm để thiết kế và viết code triển khai khi xây dựng phần mềm. 

Tuy nhiên trước khi thực hiện các bài viết thuộc nhóm nội dung cuối cùng, mình sẽ đăng tải thêm một bài viết tham khảo về một bộ công cụ không thuộc nhóm phổ biến của JavaScript nhưng lại rất hữu ích trong những trường hợp nhất định. Mặc dù những công cụ này không thuộc nhóm rất rất cần thiết `essential`, nhưng nếu như có thể thì bạn hãy đọc lướt qua và ghi nhớ tên của chúng nhé. Chỉ là để đề phòng nhỡ như có khi bạn sẽ cần tới hoặc đọc tới một bài viết nào đó về lập trình và muốn tìm hiểu về những công cụ này. :D

Hẹn gặp lại bạn trong các bài viết tiếp theo.

(Chưa đăng tải) [[JavaScript] Bài 22 - Proxy & Reflect](#)