Trong bài viết này, chúng ta sẽ cùng quay trở lại với chủ đề [Boolean & Switching](https://viblo.asia/p/924lJRY6lPM) để nói thêm về thao tác chuyển kiểu dữ liệu, các phép so sánh, và các cấu trúc điều kiện.

## 1. Quy đổi các giá trị thành các đồng xu boolean

Lần này quay lại với chủ đề về các đồng xu `boolean`, chúng ta đã biết quá rõ khái niệm về những đồng xu này rồi. Phần mà chúng ta muốn quan tâm tới ở đây là kết quả của các thao tác chuyển đổi các giá trị từ kiểu dữ liệu khác sang `boolean`.

Để biết được kết quả của các thao tác chuyển đổi kiểu dữ liệu sang `boolean` thì chúng ta không hẳn là cần tài liệu tham khảo ở đâu cả. Chúng ta có trình soạn thảo code và trình duyệt web để chạy thử code ở đây rồi. Vậy hãy cùng viết code ví dụ để xem các kết quả chuyển đổi điển hình để ghi nhớ quy tắc mà chúng ta nghiệm thu được. Ở đây chúng ta sẽ sử dụng `class Boolean` như một hàm để chuyển đổi bất kỳ giá trị nào thành một giá trị `boolean` đơn nguyên `true/false`.

```convertion.js
// --- các giá trị vô nghĩa tương đương với `false`
console.log( Boolean(null) );   // false
console.log( Boolean(undefined) );   // false

// --- một số bất kỳ khác 0 sẽ tương đương với `true`
console.log( Boolean(0) );   // false
console.log( Boolean(0.1) );   // true

// --- các giá trị số học đặc biệt đều là `true`, ngoại từ `NaN`
console.log( Boolean(NaN) );   // false
console.log( Boolean(Infinity) );   // true
console.log( Boolean(-Infinity) );   // true

// --- một chuỗi bất kỳ `không rỗng` sẽ là `true`
console.log( Boolean('') );   // false
console.log( Boolean(' ') );   // true
console.log( Boolean('0') );   // true

// --- một object bất kỳ sẽ tương đương với `true`, ngoại trừ `new Boolean(false)`
console.log( Boolean(new Function()) );   // true
console.log( Boolean(new Array()) );   // true
console.log( Boolean(new Object()) );   // true
console.log( Boolean(new Boolean(false)) );   // false
```

Như vậy để dễ ghi nhớ quy tắc chuyển đổi từ một giá trị bất kỳ sang một giá trị đơn nguyên `primitive` thuộc kiểu `boolean` thì chúng ta có thể nhớ ngắn gọn là - trong hầu hết tất các trường hợp chúng ta sẽ đều thu được kết quả là `true` - và chỉ có một số ít vài trường hợp sẽ thu được kết quả `false` khi giá trị ban đầu là -

- Giá trị `null`
- Giá trị `undefined`
- Giá trị số học `0`
- Giá trị số học `NaN`
- Chuỗi ký tự rỗng `''`
- Object `new Boolean(false)`

Việc ghi nhớ quy tắc này sẽ rất có ích khi chúng ta cần kiểm tra dữ liệu đầu vào của một hàm hay của một chương trình có ý nghĩa hay không để tiếp tục thực hiện các thao tác xử lý logic tiếp theo; Hoặc, chúng ta sẽ có thể tự tin sử dụng các giá trị bất kỳ thay vì các giá trị `boolean` hay các biểu thức trong cú pháp điều kiện `if`.

## 2. Các phép kiểm tra so sánh các giá trị và phép lấy giá trị logic nghịch đảo

Trong lần thảo luận trước đây, chúng ta cũng đã biết rằng nơi thực hiện các phép kiểm tra so sánh các giá trị, hoặc nơi thực hiện phép nghịch đảo giá trị logic `!`, cũng là những nơi mà chúng ta có thể nghiệm thu được các giá trị `boolean` đơn nguyên. Do đó, để có thể làm việc tự tin hơn với kiểu dữ liệu này, chúng ta cũng nên tìm hiểu thêm về các phép xử lý này. Tuy nhiên, trước hết chúng ta hãy điểm danh lại các phép kiểm tra logic mà chúng ta đã biết -

- `a > b` - phép kiểm tra tính lớn hơn của `a` so với `b` - trả về `true` nếu `a` lớn hơn `b`, ngược lại trả về `false`.
- `a < b` - phép kiểm tra tính nhỏ hơn của `a` so với `b` - trả về `true` nếu `a` nhỏ hơn `b`, ngược lại trả về `false`.
- `a >= b` - phép kiểm tra tính lớn hơn hoặc bằng của `a` so với `b`.
- `a <= b` - phép kiểm tra tính nhỏ hơn hoặc bằng của `a` so với `b`.
- `a == b` - phép kiểm tra tính tương đồng của `a` so với `b` - trả về `true` nếu `a` tương đồng với `b`, ngược lại trả về `false`. Ở đây chúng ta lưu ý là `tương đồng` không có nghĩa là `bằng nhau` hay `giống nhau`.
- `a != b` - phép kiểm tra tính bất đồng của `a` so với `b` - trả về `true` nếu `a` không tương đồng với `b`, ngược lại trả về `false`.
- `! a` - phép lấy giá trị logic nghịch đảo của `a`.

### 2.1 Các phép kiểm tra so sánh lớn hơn - nhỏ hơn

Khi thực hiện các phép kiểm tra tính lớn hơn `>`, nhỏ hơn `<`, lớn hơn hoặc bằng `>=`, nhỏ hơn hoặc bằng `<=`; Thì các giá trị `a` ở phía bên trái và `b` ở phía bên phải sẽ được tạm thời chuyển đổi về kiểu số học theo phương thức nào đó để thực hiện so sánh. Ví dụ như khi so sánh 2 chuỗi ký tự `'abcd' < 'asd'`, phép kiểm tra `<` sẽ lấy ra từng cặp ký tự để thực hiện so sánh lần lượt. Mỗi ký tự sẽ được biểu thị bởi một mã ký tự `charCode` và có thể được truy xuất với phương thức [`String.charCodeAt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt).

```charcode.js
var b_code = 'abcd'.charCodeAt(1);
console.log(b_code);   // 98
var s_code = 'asd'.charCodeAt(1);
console.log(s_code);   // 115

console.log('abcd' < 'asd');   // true
```

### 2.2 Các phép kiểm tra tính tương đồng và bất đồng

Tuy nhiên đối với các phép kiếm tra tính tương đồng `==`, và tính bất đồng `!=`; Thì các giá trị sẽ được ưu tiên chuyển đổi về dạng số học chỉ khi có 1 trong 2 giá trị `a` hoặc `b` thuộc kiểu `number` hoặc `boolean`; Nếu không thì máy tính sẽ tiếp tục kiểm tra xem có giá trị nào là chuỗi ký tự không, nếu có thì sẽ ưu tiên chuyển đổi về dạng chuỗi `string`; Nếu vẫn tiếp tục không thể chuyển đổi để đồng nhất kiểu dữ liệu thì mặc định kết quả sẽ là `false` cho phép kiểm tra tương đồng `==`, và `true` cho phép kiểm tra bất đồng `!=`.

```equanamity.js
// --- chuyển đổi về `string`
console.log('' == []);   // true

// --- chuyển đổi về `number`
console.log(true == '');   // false
console.log(false == '');   // true
console.log(0 == '');   // true
console.log(0 == '0');   // true

// --- so sánh 2 chuỗi
console.log('' == '0');   // false
```

Và chúng ta còn có 2 trường hợp đặc biệt với kết quả kiểm tra sẽ phụ thuộc vào những quy ước định trước chứ không có sự chuyển đổi hay so sánh nào được thực hiện - Đó là `null` và `undefined`. 

Giá trị `null` khởi điểm được tạo ra khi người ta muốn biểu thị một trường dữ liệu trống trong các chương trình quản lý CSDL - cơ sở dữ liệu; Và hiển nhiên các môi trường của các ngôn ngữ lập trình cũng có thể được xem là các phần mềm quản lý dữ liệu ở một khía cạnh nào đó và được định nghĩa kiểu giá trị này. Ý nghĩa của `null` là `không tương đồng` với bất kỳ trạng thái nào khác của dữ liệu được lưu trữ -

- `null` không có ý nghĩa tương đồng với các giá trị số học `number`.
- `null` không có ý nghĩa tương đồng với các chuỗi ký tự `string`.
- `null` không có ý nghĩa tương đồng với các giá trị `boolean`.
- `null` v.v...
- `null` không quan tâm tới sự so sánh mà chỉ đơn giản là `không có ý nghĩa tương đồng` thôi. :D

```null.js
console.log(null == 0);   // false
console.log(null == '');   // false
console.log(null == true);   // false
console.log(null == false);   // false
console.log(null == []);   // false
console.log(null == {});   // false
```

Mặc dù nếu như chúng ta quy đổi `null` và các giá trị trên sang miền số học, chúng ta sẽ thấy `null` được xem là `0` và có giá trị tương đương với nhiều giá trị khác trong ví dụ trên.

```number.js
console.log( Number(null) );   // 0
console.log( Number('') );   // 0
console.log( Number(true) );   // 1
console.log( Number(false) );   // 0
console.log( Number([]) );   // 0
console.log( Number({}) );   // 0
```

Bạn thấy đấy, khái niệm `tương đồng` còn phụ thuộc vào ngữ cảnh mà người ta quy ước nữa. Và tương tự thì chúng ta có `undefined` khởi điểm được tạo ra trong bối cảnh của môi trường lập trình khác ngoài các trình quản lý CSDL. Giá trị `undefined` đại diện cho trạng thái dữ liệu chưa được định nghĩa - ví dụ như một biến chưa được gán giá trị, hay một vị trí trong mảng chưa được sử dụng đến - và cũng `không có ý nghĩa tương đồng` với tất cả các trạng thái khác của dữ liệu.

```undefined.js
console.log(undefined == 0);   // false
console.log(undefined == '');   // false
console.log(undefined == true);   // false
console.log(undefined == false);   // false
console.log(undefined == []);   // false
console.log(undefined == {});   // false
```

Tuy nhiên `null` và `undefined` thì lại có điểm chung như đã nói - đó là `không có ý nghĩa tương đồng với tất cả các trạng thái khác của dữ liệu`; Vì vậy nên 2 giá trị này được xem là có ý nghĩa tương đồng với nhau. :D

```nothing.js
console.log(null == undefined);   // true
```

Đó là các lưu ý mà chúng ta cần ghi nhớ về phép kiểm tra tính tương đồng `==`. Đối với phép kiểm tra tính bất đồng `!=` thì kết quả là nghịch đảo với trường hợp của `==` nên chúng ta không cần ghi nhớ thêm gì nữa. :D

### 2.3 Kiểm tra tính tương đồng và bất đồng giữa 2 object bất kỳ

Các phép kiểm tra tính tương đồng `==` và bất đồng `!=` lại không được thiết kế để làm việc với các `object` trên phương diện này. Khi chúng ta áp dụng các phép kiểm tra này lên 2 `object` bất kỳ, JavaScript sẽ thực hiện so sánh `địa chỉ` tham chiếu của 2 giá trị ở 2 bên, chứ không phải là nội dung bên trong của các `object`.

```reference.js
var firstJust = { value : 0 };
var secondJust = { value : 0 };
console.log(firstJust == secondJust);   // false
```

Trong ví dụ ở trên, chúng ta có 2 `object` có nội dung như nhau. Tuy nhiên đó là 2 `object` khác nhau và được lưu trữ ở những vị trí khác nhau trong bộ nhớ máy tính. Kết quả là phép kiểm tra `==` cho chúng ta kết luận `object` đang được lưu ở biến `firstJust` không phải là `object` đang được lưu ở biến `secondJust`.

Để kiểm tra tính tương đồng về mặt nội dung của các `object`, chúng ta sẽ cần phải xây dựng một phương thức kiểm tra riêng để phù hợp với tiêu chí `tương đồng` mà chúng ta đưa ra. :D

### 2.4 Phép lấy giá trị logic nghịch đảo `!`

Phép toán logic này sẽ mặc định tạm thời chuyển đổi giá trị đứng sau nó sang kiểu `boolean` để thực hiện nghịch đảo và trả về kết quả. Do đó chúng ta chỉ cần quan tâm tới các trường hợp hữu hạn khi mà các giá trị chuyển đổi thu về kết quả `false` và sau đó được nghịch đảo thành `true`.

```inversion.js
console.log( ! undefined);   // true
console.log( ! null);   // true
console.log( ! 0);   // true
console.log( ! NaN);   // true
console.log( ! '');   // true
```

Tất cả những trường hợp khác khi thực hiện phép lấy giá trị logic nghịch đảo `!` của một giá trị nào đó bất kỳ thì hiển nhiên chúng ta có thể mặc định kết quả trả về sẽ là `false`. 

## 3. Gặp lại cú pháp switch

Lần trước, khi nói về cú pháp `switch`, chúng ta đã lướt qua rất ngắn gọn nhằm mục đích thay thế cho các khối `if ... else if ...` nối tiếp. Tuy nhiên thì cú pháp này vẫn còn một vài điểm mà chúng ta có thể tìm hiểu thêm để sử dụng chính xác hơn và linh hoạt hơn. Hãy xem lại ví dụ mà chúng ta đã sử dụng trong lần giới thiệu trước đó.

```switch.js
var nthDayOfTheWeek = 1;

switch (nthDayOfTheWeek) {
   case 0:
      console.log('Chủ Nhật. Ngày ông mặt Trời làm Chủ!');
      break;
   case 1:
      console.log(
         'Số O trông mới giống ông mặt Trời.\n' + 
         'Với lại, lập trình viên... ai lại đếm từ số 1... :D'
      );
      break;
   case 2:
      console.log('Thứ Hai');
      break;
   case 3:
      console.log('Thứ Ba');
      break;
   case 4:
      console.log('Thứ Tư');
      break;
   case 5:
      console.log('Thứ Năm');
      break;
   case 6:
      console.log('Thứ Sáu');
      break;
   case 7:
      console.log('Thứ Bẩy');
      break;
   default:
      console.log(
         'Bạn không dùng lịch tây phải không?\n' +
         'Mình cũng chỉ xem Trăng là chủ yếu thôi.\n' +
         'Nhân tiện thì Luna là tên latin của Trăng đấy. :D'
      );
} // switch

// kết quả:
// 'Số O trông mới giống ông mặt Trời.'
// 'Với lại, lập trình viên... ai lại đếm từ số 1... :D'
```

Ở đây chúng ta đã biết về cơ chế hoạt động cơ bản của khối `switch` trong ví dụ này. Đó là biến `nthDayOfTheWeek` sẽ được so sánh với từng giá trị được liệt kê sau các khóa `case`. Nếu `nthDayOfTheWeek` có giá trị tương đương với `case` nào thì thực hiện câu lệnh in ra `console` bắt đầu ngay sau `case` đó. 

Tuy nhiên lúc này nếu như chúng ta thay giá trị của `nthDayOfTheWeek` thành chuỗi `'1'` thì kết quả hoạt động lại không giống như trước nữa.

```switch.js
var nthDayOfTheWeek = '1';

switch (nthDayOfTheWeek) {
   /* ... */
} // switch

// kết quả:
// 'Bạn không dùng lịch tây phải không?'
// 'Mình cũng chỉ xem Trăng là chủ yếu thôi.'
// 'Nhân tiện thì Luna là tên latin của Trăng đấy. :D'
```

Như vậy là phép kiểm tra tương đồng mà `switch` thực hiện đã không tự động chuyển đổi kiểu dữ liệu của `nthDayOfTheWeek` thành `number` trước khi so sánh với `case 1` - giống như một phép kiểm tra yêu cầu sự chính xác chứ không có sự linh động. Người ta thường gọi phép kiểm tra này là phép kiểm tra nghiêm ngặt `strict comparison`, và JavaScript có hỗ trợ một cú pháp ngắn để biểu thị phép kiểm tra này.

```strict.js
console.log('1' === 1);   // false
console.log('1' !== 1);   // true
```

Ngoài ra thì khối `switch` còn một điểm đáng lưu ý nữa đó là các lệnh `break;`. Các câu lệnh này sẽ được sử dụng để dừng khối lệnh `switch` và chuyển đến câu lệnh tiếp theo ở bên ngoài (nếu có). Nếu chúng ta bỏ đi các lệnh `break;` trong code ví dụ, các lệnh in sẽ được thực hiện từ `case` phù hợp và xuyên suốt cho tới hết khối lệnh.

Không chỉ được sử dụng trong các khối `switch`, câu lệnh `break;` còn có thể được sử dụng trong các cú pháp lặp mà chúng ta chưa được gặp gỡ trong lần thảo luận trước về chủ đề `Collection & Looping`. Và ở trong bài viết tiếp theo, chúng ta sẽ quay lại với chủ đề về các bộ dữ liệu và thao tác lặp để gặp gỡ những cấu trúc lặp khác. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[JavaScript] Bài 15 - Collection & Looping](https://viblo.asia/p/LzD5dR60ZjY)