Trong bài viết này, chúng ta sẽ quay lại với chủ đề [**Collection & Looping**](https://viblo.asia/p/3P0lP8yolox) để tìm hiểu thêm về những kiểu `collection` khác mà JavaScript cung cấp. Đồng thời, chúng ta cũng sẽ được gặp những cú pháp lặp mà chúng ta chưa biết đến trong lần thảo luận trước. Tuy nhiên. trước hết chúng ta hãy gặp lại các mảng `Array` để nói thêm về những thao tác quan trọng mà chúng ta đã bỏ lỡ. :D

## 1. Phân tách các giá trị từ một mảng

Tương tự với khi làm việc cùng các `object`, JavaScript cũng cung cấp cho chúng ta một cú pháp ngắn để nhanh chóng tách lấy các giá trị từ một mảng.

```destructuring.js
var numberArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
var [ one, two ] = numberArray;
console.log(one);   // 1
console.log(two);   // 2
```

Trong ví dụ ở trên, chúng ta đã thử tách lấy giá trị của 2 phần tử đầu tiên của mảng `numberArray` và gán vào 2 biến `one` và `two`, với cách viết khá tương đồng khi chúng ta phân tách các thuộc tính của `object` trong [**bài viết JavaScript số 12**](https://viblo.asia/p/javascript-bai-12-object-everything-3P0lP8Avlox). 

Ở đây vẫn còn một điểm tương đồng nữa với phép phân tách các `object`, đó là chúng ta có thể gom các phần tử còn lại trong phép phân tách mảng vào một mảng con nhỏ hơn với phép lấy phần thừa `rest operator` được ký hiệu bằng dấu 3 chấm `...`.

```rest.js
var numberArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
var [ one, two, ...rest ] = numberArray;
console.log(one);    // 1
console.log(two);    // 2
console.log(rest);   // [ 3, 4, 5, 6, 7, 8, 9 ];
```

Bên cạnh cách viết này, chúng ta cũng có thể nhanh chóng phân tách tất cả các phần tử của một mảng để sao chép vào một mảng khác tương tự với trường hợp sao chép `object` bằng phép dàn trải `spread operator` cũng được ký hiệu bằng dấu 3 chấm `...`.

```spread.js
var smallArray = [ 1, 2, 3, 4, 5 ];
var bigArray = [ ...smallArray, 6, 7, 8, 9 ];
console.log(bigArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Ngoài các cú pháp tiện ích hỗ trợ các thao tác thường dùng như trên, chúng ta cũng chưa nói đến một khả năng khác của mảng `Array`. Đó là các mảng `Array` trong JavaScript được thiết kế để có thể làm việc ở cấp độ lưu trữ dữ liệu bậc thấp, gần với tiến trình phân bổ bộ nhớ của máy tính. Tuy nhiên ở thời điểm này, những thứ này thực sự chưa có nhiều ý nghĩa với tiến trình học tập và xây dựng trang web đơn giản của chúng ta. Do đó bạn có thể lưu lại các liên kết tham khảo dưới đây để tìm hiểu thêm khi nào cảm thấy thực sự cần thiết. :D

- [**Tài liệu giới thiệu về các mảng định kiểu `TypedArray` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).
- [**Tài liệu về `class ArrayBuffer` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
- [**Tài liệu về `class DataView` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView).

## 2. Lưu trữ tập các giá trị không trùng lặp

Xuất phát từ nhu cầu lưu trữ dữ liệu trong cuộc sống thực tế của chúng ta, trong hầu hết các trường hợp, chúng ta không muốn có những bản dữ liệu trùng lặp trong một tập dữ liệu về các thực thể nào đó để đảm bảo tính nhất quán của dữ liệu khi được truy xuất để sử dụng lại. Nhằm phản ánh đặc điểm lưu trữ này trong phần mềm, JavaScript và nhiều ngôn ngữ lập trình khác có cung cấp một kiểu `collection` có tên là tập, bộ, hay `Set` - [**Tài liệu về `class Set` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

```set.js
var numberSet = new Set();
numberSet.add(1);
numberSet.add(2);
numberSet.add(3);
numberSet.add(4);
numberSet.add(1);   // không có hiệu lực
console.log(numberSet.size);   // 4
console.log(numberSet);   // { 1, 2, 3, 4 }
```

Như chúng ta có thể thấy trong ví dụ trên, thao tác `numberSet.add(1)` lần thứ 2 không có hiệu lực vì giá trị truyền vào trùng lặp với phần tử đầu tiên của `numberSet`. Do đó kích thước `size` của `numberSet` vẫn là `4` tương ứng với số lượng giá trị được in ra ở câu lệnh sau đó.

Ngoài thuộc tính `size` và phương thức `add`, chúng ta cũng có thể liệt kê các phương thức mà `Set` cung cấp ở đây vì số lượng không nhiều. :D

- [**Hàm khởi tạo `new Set()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) - có thể nhận vào một `object` hỗ trợ thao tác lặp để phân tách vào `set`.
- [**Phương thức `clear()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) - xóa nội dung bên trong `set`.
- [**Phương thức `delete()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) - xóa một phần tử của `set`.
- [**Phương thức `has()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) - kiểm tra một giá trị đã tồn tại trong `set` hay chưa.
- [**Phương thức `values()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) - tạo ra một `collection` chứa tất cả các giá trị đang có trong `set`.

Theo định nghĩa của `Set` thì trường hợp ứng dụng đơn giản nhất mà chúng ta có thể nghĩ đến là loại bỏ các phần tử lặp lại nhiều lần của một mảng hoặc một `collection` nào đó.

```duplicated.js
var duplicatedArray = [
   1, 2, 3, 4, 5, 6, 7, 8, 9,
   1, 2, 3, 4, 5, 6, 7, 8, 9
];
var numberSet = new Set(duplicatedArray);
var numberArray = [ ...numberSet ];
console.log(numberArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Tuy nhiên đối với trường hợp sử dụng với các `object`, chúng ta cần lưu ý là các `collection` cũng giống như một tập các biến, chỉ lưu trữ `địa chỉ` tham chiếu của các `object` và thực hiện so sánh các `địa chỉ` tham chiếu để thực hiện lưu trữ. Do đó chúng ta vẫn có thể lưu trữ các `object` khác nhau nhưng có cùng nội dung.

```reference.js
var objectSet = new Set();
var firstObject = { value: 1 };
var secondObject = { value: 1 };
var thirdObject = { value: 1 };

objectSet.add(firstObject);
objectSet.add(secondObject);
objectSet.add(thirdObject);

console.log(objectSet);
// { {value:1}, {value:1}, {value:1} }
```

Các `set` sẽ chỉ có thể giúp chúng ta tránh lưu lặp lại nhiều lần địa chỉ tham chiếu của một `object`.

```reference.js
var objectSet = new Set();
var theObject = { value: 1 };

objectSet.add(theObject);
objectSet.add(theObject);
objectSet.add(theObject);

console.log(objectSet);
// { {value:1} }
```

Bên cạnh `class Set`, JavaScript còn có [**WeakSet**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) được thiết kế để lưu trữ các liên kết yếu với các `object`. Trong trường hợp các `object` dữ liệu không còn được sử dụng ở nơi nào khác trong phần mềm, các liên kết yếu sẽ được nới lỏng để môi trường chạy JavaScript có thể xóa các `object` và tiết kiệm bộ nhớ đệm cho các tác vụ khác cần xử lý. Vì lý do này nên `WeakSet` sẽ không có kích thước xác định `size` và chỉ có các phương thức `add`, `delete`, và `has`.

## 3. Lưu trữ các giá trị kèm theo tên tham chiếu

Các `object` được tạo ra với mục đích là mô tả các thực thể với các thuộc tính và quan trọng nhất là kèm theo các phương thức mô tả khả năng thực hiện hành động. Tuy nhiên đôi khi chúng ta chỉ cần lưu trữ dữ liệu và làm việc bằng các thao tác khách quan từ bên ngoài đối tượng dữ liệu. Lúc này chúng ta có một kiểu `collection` khác hỗ trợ phù hợp hơn được gọi là `Map` - [**Tài liệu về `class Map` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

Kiểu `collection` mới - `Map` hỗ trợ chúng ta lưu trữ dữ liệu ở dạng các cặp `khóa/giá trị` hay `key/value`. Các giá trị được sử dụng để làm `key` hoặc `value` của `Map` có thể là các giá trị bất kỳ và không có quy tắc ràng buộc nào. Trong khi đó thì đối với `object`, chúng ta chỉ có thể sử dụng `key` là các chuỗi `string` hoặc các biểu tượng `symbol`.

```map.js
var numberMap = new Map();
var firstKey = {};
numberMap.set(firstKey, 1);

var one = numberMap.get(firstKey);
console.log(one);   // 1
```

Một điểm khác biệt cơ bản nữa so với `Object`, đó là `Map` luôn duy trì thứ tự lưu trữ các cặp `key/value` theo trình tự được bổ sung vào `collection`. Còn `Object` thì luôn sắp xếp các cặp `key/value` theo thứ tự Alphabet của khóa `key`.

```order.js
var charCodeMap = new Map();
charCodeMap.set('a', 97);
charCodeMap.set('c', 99);
charCodeMap.set('b', 98);

charCodeMap.forEach((value, key) => console.log(key + ': ' + value));
// 'a: 97'
// 'c: 99'
// 'b: 98'
```

Bên cạnh `Map` thì chúng ta cũng có `WeakMap` để làm việc linh động hơn với các `object`. Các khóa `key` của `WeakMap` có thể là các liên kết yếu với các `object` để được tự động tách rời khi `object` không còn cần sử dụng ở đâu khác nữa và sẽ được môi trường thực thi xóa đi để dọn dẹp bộ nhớ đệm.

## 4. Các cú pháp lặp thực hiện khách quan

Các phương thức lặp thao tác mà chúng ta đã sử dụng trước đó, đều là các phương thức chủ quan của các `collection`, tiếp nhận vào một thao tác xử ký dữ liệu và tự lặp lại thao tác xử lý lên từng phần tử dữ liệu mà mình đang lưu trữ.

Ở một góc nhìn khác, JavaScript và nhiều ngôn ngữ lập trình phổ biến khác còn hỗ trợ các cú pháp lặp khách quan đứng từ vị trí quan sát bên ngoài các `collection`.

### 4.1 Các vòng lặp `for .. in` và `for .. of`

```for.js
var numberArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ];

var keyArray = [];
for (var key in numberArray) {
   keyArray.push(key);
}
console.log(keyArray);
// [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]

var valueArray = [];
for (var value of numberArray) {
   valueArray.push(value);
}
console.log(valueArray);
// [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ]
```

Trong ví dụ ở trên chúng ta có 2 cú pháp lặp khách quan - 

- [`for .. in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) được sử dụng để lặp qua các khóa `key` của một `collection`.
- [`for .. of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) được sử dụng để lặp qua các giá trị `value` của một `collection`.

Đối với một mảng `Array` thì chúng ta có các khóa `key` chính là các trị số chỉ vị trí `index`, và các giá trị `value` chính là các giá trị đang được lưu trữ trong mảng. Ở đây chúng ta đã không sử dụng tới các phương thức lặp chủ quan của mảng như `.forEach()` hay `.map()` để truy xuất các giá trị, tuy nhiên cơ chế lặp vẫn là đi lần lượt từ phần tử đầu tiên cho đến hết mảng. 

Các cú pháp này có thể là lựa chọn tốt khi làm việc với các `collection` không có phương thức lặp chủ quan, ví dụ như `HTMLNodeCollection`. Đối với thao tác lặp và gọi hàm xử lý đơn giản thì các cú pháp này có thể bỏ đi các cặp `{}` và trông khá gọn gàng, dễ đọc.

### 4.2 Vòng lặp `for` nguyên thủy :D

Trong trường hợp chúng ta cần thực hiện các thao tác xử lý phức tạp hơn, thì cú pháp lặp `for` có hỗ trợ thêm cách sử dụng khác, tồn tại từ khi công việc lập trình bắt đầu xuất hiện. :D

```ancient.js
var numberArray = [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
var numberOfItems = numberArray.length;

var keyArray = [];
var valueArray = [];

for (
   var key = 0;
   key < numberOfItems;
   key += 1
) {
   keyArray.push(key);
   valueArray.push( numberArray[key] );
}

console.log(keyArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(numberArray);
// [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ]
```

Ở đây cú pháp `for` có một cặp ngoặc đơn `()` để xét điều kiện lặp giống với trường hợp của `if`. Tuy nhiên chúng ta có tới 3 câu lệnh bên trong -

- `var key = 0` - khởi tạo biến `key` để theo dõi vị trí lặp tới trong `collection`.
- `key < numberOfValues` - kiểm tra điều kiện lặp. Nếu `true` thì thực hiện khối lệnh bên trong cặp ngoặc xoắn `{}`, nếu `false` thì bỏ qua vòng lặp `for` và đi tới đoạn code tiếp theo trong chương trình chính.
- `key += 1` - tăng biến `key` sau mỗi lần thực hiện xong khối lệnh `{}` để di chuyển tới vị trí tiếp theo trong `collection`, và quay trở lại bước kiểm tra điều kiện lặp.

Với cách sử dụng này, chúng ta có thể thay đổi thao tác tăng biến `key` để mỗi bước lặp có thể nhảy cóc qua một hoặc nhiều phần tử nếu muốn. :D

Ở đây chúng ta cần lưu ý bên trong cặp ngoặc đơn `()` điều kiện của `for`, đó là các dấu chấm phẩy `;` cần được sử dụng đúng với lý do nguyên thủy khiến chúng được tạo ra - Chúng ta chỉ chỉ được phép dùng các dấu `;` để phân tách giữa các câu lệnh chứ không được dùng để trang trí cho câu lệnh tăng biến `key` ở cuối cùng. :D

### 4.3 Các vòng lặp `while` và `do .. while`

Cùng xuất hiện và tồn tại song hành với cú pháp `for` nguyên thủy, chúng ta còn có 2 cú pháp lặp `while` và `do .. while` cũng có mặt trong nhiều ngôn ngữ lập trình phổ biến khác. Chúng ta sẽ xem ví dụ được viết lại với cú pháp `while` trước.

```while.js
var numberArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
var numberOfItems = numberArray.length;

var keyArray = [];
var valueArray = [];

var key = 0;
while (key < numberOfItems) {
   keyArray.push(key);
   valueArray.push( numberArray[key] );
   key += 1;   // tăng biến `key` trước khi quay lại kiểm tra điều kiện
}

console.log(keyArray);
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(numberArray);
// [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ]
```

Sau đó là viết lại với cú pháp `do .. while`.

```do.js
var numberArray = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
var numberOfItems = numberArray.length;

var keyArray = [];
var valueArray = [];

var key = 0;
do {
   keyArray.push(key);
   valueArray.push( numberArray[key] );
   key += 1;   // tăng biến `key` trước khi kiểm tra điều kiện để quay lại
}
while (key < numberOfItems);

console.log(keyArray);
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(numberArray);
// [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ]
```

Điểm khác biệt cơ bản giữa `do .. while` và `while`, đó là trong cú pháp `do .. while` thì khối lệnh `{}` sẽ được thực thi ít nhất 1 lần trước khi kiểm tra điều kiện để lặp lại. Vì vậy nên cú pháp này thường được sử dụng để in giao diện người dùng trong các ứng dụng `console` và chờ người dùng nhập lựa chọn thao tác tiếp theo. Khi đó, điều kiện lặp thường sẽ phụ thuộc vào thao tác của người dùng để tiếp tục sử dụng chương trình hoặc thoát.

## Kết thúc một bài viết hơi quá dài

Tất cả chỉ là các công cụ mang lại cho chúng ta thêm khả năng để chuyển tải ý tưởng phần mềm thành các dòng code. Do đó bạn đừng cố gắng ghi nhớ chi tiết toàn bộ mà nên giữ một cái nhìn tổng quan đầy đủ và lưu lại các liên kết tham khảo. Sau đó, hãy luyện tập sử dụng những thứ phù hợp với phong cách tư duy của bạn nhất, cho đến khi bạn cần mở rộng kĩ năng với những công cụ khác. :D

Bài viết của chúng ta về chủ đề `Collection & Looping` đến đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ tới với một chủ đề mới. Đó là khoanh vùng và xử lý các trường hợp kết quả vận hành ngoại lệ của chương trình mà chúng ta viết ra so với logic vận hành mà chúng ta mong muốn. Bây giờ thì chúng ta nên nghỉ giải lao một chút đã. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[**[JavaScript] Bài 16 - Error & Handling**](https://viblo.asia/p/Eb85oAMmZ2G)