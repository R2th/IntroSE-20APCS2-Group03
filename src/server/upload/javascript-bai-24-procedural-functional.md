Trong bài viết này, chúng ta sẽ cùng tản mạn về `Procedural Programming` và `Functional Programming` - tạm dịch là `lập trình thủ tục` và `lập trình hàm`.

## Hàm thì chúng ta biết rồi nhưng thủ tục là cái gì thế?

Trước khi bắt đầu, bạn có thể đặt khái niệm hàm mà chúng ta đã biết sang một bên được không? :D Bởi vì để thuận lợi cho quãng thời gian khởi đầu, mình đã cố gắng giới thiệu các khái niệm theo hướng dễ tiếp cận nhất. Nhưng tới thời điểm hiện tại thì những cách hiểu cũ của chúng ta không hẳn là hoàn toàn phù hợp nữa. Ở đây chúng ta sẽ lại xuất phát từ vị trí hơi gần con số `0` nhé. :D

Về cơ bản thì các `thủ tục` và các `hàm` khi được biểu thị trong các ngôn ngữ lập trình phổ biến sẽ đều có điểm chung là các khối lệnh được đặt tên và `có thể gọi được` - hay `callable`.

Điểm khác biệt chính giữa hai khái niệm này là một `thủ tục` hay `procedure`, được xem là một `tác vụ`, hay một `công việc` cần được tiến hành, hay một `hành động` của một chủ thể nào đó tác động lên một tối tượng dữ liệu để tạo ra sự thay đổi, cập nhật trên đối tượng dữ liệu đó. Ví dụ như trong cuộc sống hàng ngày, có khi chúng ta cần đi tới một cơ quan nào đó để thực hiện `thủ thục` này hay `thủ tục` kia, đó chính là lúc chúng ta thực hiện một `procedure`. :D

Trong khi đó thì một `hàm (toán học)` hay `function`, lại `không` được xem là một tác vụ, hay công việc, hay hành động của một chủ thể nào và `không` tác động lên một đối tượng dữ liệu nào cả. Một `hàm` chỉ đơn giản là một `định nghĩa` biểu thị mối liên hệ tương quan giữa các yếu tố thường được gọi là các `tham số` và một giá trị `đích đến`.

Trong một số ngôn ngữ lập trình như [Ada](https://learn.adacore.com/courses/intro-to-ada/chapters/subprograms.html#subprogram-calls) hay `SQL` thì việc khai báo `thủ tục` và `hàm` sẽ được phân biệt bởi các từ khóa `procedure` và `function`. Điều này giúp người sử dụng luôn phân biệt được rất rõ hai khái niệm này và giúp cho việc thiết kế các khối lệnh `callable` sẽ trở nên có chủ đích rõ ràng và rành mạch hơn.

Còn ở đây, với JavaScript, chúng ta có một [từ khóa được tạo ra bởi một lỗi đánh máy](https://viblo.asia/p/QpmleRQ95rd) và được sử dụng chung cho cả hai. :D

```procedure.js
// thủ tục thực hiện công việc
// tăng giá trị của một object lên gấp hai lần

function doubleIt(theObject) {
   theObject.value *= 2
}

var just = { value: 1 };
doubleIt(just);
console.log(just);   // { value: 2 }
```

```function.js
// hàm f(x) = x * 2
// biểu thị liên hệ giữa một giá trị x
// và một giá trị khác ở đâu đó, lớn gấp 2 lần x

function f(x) {
   return x * 2;
}

var one = 1;

f(1);   // one sẽ không bị thay đổi
console.log(one);   // 1

var two = f(1);   // lưu lại giá trị đối chiếu từ one
console.log(two);   // 2
```

## Nếu vậy khi nói tới Hàm có nghĩa là chúng ta chỉ làm việc với các giá trị số học?

Không. Hoàn toàn không phải vậy. Khái niệm `hàm` đúng là được vay mượn từ toán học, nhưng trong lập trình nói chung thì hoàn toàn không hề bị giới hạn xung quanh các `định nghĩa` liên quan tới các giá trị số học. 

Khi sử dụng `hàm`, chúng ta chỉ cần đảm bảo tiêu chí ban đầu - đó là không thực hiện thao tác nào tác động thay đổi lên các đối tượng dữ liệu đầu vào. Tất cả những gì chúng ta làm là `định nghĩa` mối liên hệ tương quan giữa `tham số` của hàm và một giá trị `đích đến`.

```function.js
// hàm f(object) đối chiếu giữa một object ban đầu
// với một object đích đến có giá trị value gấp hai lần

function doubleOf(theObject) {
   var anotherObject = { value: theObject.value * 2 };
   return anotherObject;
}

var just = { value: 1 };
var anotherJust = doubleOf(just);

console.log(just);   // { value: 1 }
console.log(anotherJust);   // { value: 2 }
```

Và như đã nói, trong code ví dụ ở trên, chúng ta đã không thực hiện thao tác nào tác động lên `just` để tạo ra thay đổi về mặt nội dung của `object` này. Logic định nghĩa bởi `doubleOf` sẽ chỉ đường cho chúng ta tìm đến một object khác `anotherJust` mà không gây ảnh hưởng gì tới tham số đầu vào và bất kỳ yếu tố nào của môi trường bên ngoài. Theo cách nói của các bạn yêu thích môn toán thì đó là một ánh xạ từ miền giá trị này sang một miền giá trị khác. Mấy từ `ánh xạ` với `miền giá trị` nghe oách thật; Nhưng mà thôi, chúng ta cứ dùng từ `chỉ đường` đi cho dân dã. :D

## Những đặc tính cơ bản

Xuất phát từ những định nghĩa cơ bản ở trên thì chúng ta có thêm được một số cái gạch đầu dòng về các đặc tính cơ bản của `procedural` và `functional` ở đây. Tuy nhiên thì để dễ nhớ hơn, chúng ta sẽ liệt kê các đặc tính ở dạng so sánh song song giữa hai khía cạnh tư duy này.

### a. Phương Thức & Giá Trị

Các `thủ tục` hay `procedure` về cơ bản thì như chúng ta đã nói đó là các `hành động` của một chủ thể nào đó. Ngay cả khi chương trình mà chúng ta viết ra không làm việc với các `object` thì chúng ta vẫn có thể xem đó là các `phương thức` của phần mềm tổng bộ. Một `thủ tục` có ý nghĩa biểu thị là một thao tác hay `cách thức` thực hiện công việc, và `không` có ý nghĩa biểu thị là một `giá trị`.

Trong khi đó, các `hàm` hay `function` như chúng ta cũng vừa thảo luận thì lại `không` biểu thị cho hành động hay `cách thức` thực hiện công việc, và sẽ `không` thực hiện tác động `thay đổi` lên các đối tượng dữ liệu. Và bởi vì ứng với mỗi một giá trị ban đầu, chúng ta luôn luôn có thể sử dụng một hàm để đối chiếu tới một giá trị khác ở đâu đó; Do đó nên một `hàm` còn được xem là biểu thị cho một `giá trị trừu tượng`, và chúng ta có thể truyền các `giá trị trừu tượng` kiểu này vào một `hàm` nào đó khác cần sử dụng - hoặc trả về một `giá trị trừu tượng` ở vị trí mà một hàm được gọi. :D

```functional.js
const map = function(func) {
   return function(arr) {
      var [first, ...rest] = arr;
      // - - - - - - - - -
      if (arr.length == 0)    return [];
      if ('in-normal-case')   return [func(first), ...map(func)(rest)];
   };
}; // map

const doubleOf = function(num) {
   return num * 2;
};

const tripleOf = function(num) {
   return num * 3;
};

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var doubleOfArr = map(doubleOf)(arr);
console.log(doubleOfArr);
// [2, 4, 6, 8, 10, 12, 14, 16,18]

var tripleOfArr = map(tripleOf)(arr);
console.log(tripleOfArr);
// [3, 6, 9, 12, 15, 18, 21, 24, 27]
```

Bạn thấy đấy, chính vì đặc điểm một `hàm` có thể được xem là một `giá trị`. Chúng ta có thể kết hợp các `hàm` với nhau để tạo ra một logic hoạt động rất linh hoạt. Hàm `map` trong ví dụ ở trên, biểu thị liên hệ giữa hàm `func`, mảng `arr`, và kết quả `đích đến` là một mảng mới nào đó. Tuy nhiên logic dẫn đường từ `arr` tới mảng kết quả sẽ còn phụ thuộc vào việc chúng ta truyền `hàm` nào vào vị trí của `func`. :D

Như vậy chúng ta cũng có thể thấy, thực ra trọng tâm của code `functional` là biểu thị các `giá trị`. Ngoài các `giá trị thông thường` mang ý nghĩa là dữ liệu thì bây giờ chúng ta còn biết thêm các `giá trị trừu tượng` chính là các hàm. Bên cạnh đó, hướng tư duy `functional` còn rất quan tâm tới việc biểu thị các `tập giá trị`. Chúng ta có thể truyền một `tập giá trị` rộng vô hạn vào một lời gọi hàm để được chỉ dẫn tới một `tập giá trị` đích cũng có độ rộng vô hạn.

Đối với cách sử dụng `hàm` như thế này, các ngôn ngữ chủ điểm hỗ trợ `functional` sẽ triển khai sẵn một tính năng tên là `Lazy Evaluation` - tạm dịch là chế độ tính toán trễ - để trì hoãn việc thực hiện tính toán ngay tại thời điểm gọi hàm với một `tập giá trị vô hạn` như vậy. Và chỉ khi chúng ta cần lấy ra một `khoảng giá trị hữu hạn` từ tập kết quả thì tiến trình tính toán mới thực sự được thực hiện. Còn trong JavaScript thì chúng ta sẽ cần nhờ tới các hàm `generator` và tự xây dựng hàm truy xuất các khoảng giá trị con với cách viết code triển khai rất... `imperative`. :D

```lazy.js
const range = function (min) {
   return function* (max) {
      while (min <= max) {
         yield min;
         min += 1;
      }
   }; // return
}; // range

const take = function (n) {
   return function (range) {
      var first = range.next().value;
      // - - - - - - - - -
      if (n == 0)          return [];
      if ('normal-case')   return [first, ...take(n-1)(range)];
   };
}; // take

var positiveInt = range(1)(Infinity);
var oneToNine = take(9)(positiveInt);
console.log(oneToNine);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Trên thực tế thì việc viết định nghĩa để mô tả và sử dụng các miền giá trị vô hạn như trên trong JavaScript - sẽ cần thêm thao tác thiết lập lại `generator` mỗi khi `take`. Tuy nhiên thì ở đây chúng ta chỉ tạm tập trung vào minh họa khái niệm `Lazy Evaluation` để hiểu hơn về lối tư duy `functional` thôi. :D

### b. Trạng Thái & Bất Biến

Chính bởi vì vị trí đặc trưng của `procedural` là tiếp giáp tới những nơi lưu dữ liệu tương tác hay trạng thái `state`; Kết quả hoạt động của một `thủ tục` thường sẽ mang tính điều kiện và phụ thuộc vào những yếu tố khác bên ngoài. 

Chúng ta có thể thực hiện nhiều lần truy vấn tới cùng một thành phần `input` của một giao diện web và nhận được kết quả mỗi lần mỗi khác, tùy vào tương tác của người dùng. Chúng ta cũng có thể gửi nhiều lần yêu cầu truy vấn cùng một bản ghi tới cơ sở dữ liệu và nhận được kết quả mỗi lần mỗi khác tùy vào những cập nhật xảy ra trong cơ sở dữ liệu xen giữa các lần truy vấn.

Trong khi đó thì các lời gọi một `hàm` với cùng một dữ kiện đầu vào, sẽ luôn luôn trỏ tới chính xác một kết quả đích đến. Với một giá trị `A` ban đầu, sau một lộ trình di chuyển qua các nút giá trị, chắc chắn chúng ta sẽ chỉ tìm thấy một giá trị `Z` duy nhất, kết quả này sẽ luôn đúng với 1001 lần vận hành code `functional`. Điều này sẽ giúp chúng ta duy trì được kết quả hoạt động của code dễ phỏng đoán, và việc kiểm tra hay sửa lỗi logic cũng sẽ rất thuận lợi. :D

Do đó nên khi muốn áp dụng lối tư duy `functional` trong JavaScript, chúng ta sẽ luôn luôn cần cố gắng không chạm vào các thao tác thay đổi giá trị của bất kỳ biến nào xuất hiện trong code. Và trong cả việc lựa chọn các phương thức làm việc với các nút dữ liệu cũng cần tránh sử dụng những phương thức can thiệp vào nội dung của các đối tượng dữ liệu. Nói ngắn gọn hơn là chúng ta cần đảm bảo các giá trị đều bất biến `immutable`.

```functional.js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log('=== tạo ra mảng mới từ mảng arr và các phần tử muốn bổ sung');
var paddedArr = [0, ...arr, 10];

console.log(arr);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(paddedArr);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log('=== tạo ra mảng mới từ paddedArr bớt đi phần tử đầu tiên');
var trimmedLeft = paddedArr.slice(1);

console.log(paddedArr);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(trimmedLeft);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log('=== tạo ra mảng mới từ paddedArr bớt đi phần tử cuối cùng');
var trimmedRight = paddedArr.slice(0, -1);

console.log(paddedArr);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(trimmedRight);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### c. Nối Tiếp & Kết Hợp

Để chuyển tiếp kết quả hoạt động từ một `thủ tục` này tới một `thủ tục` khác, chúng ta không cần làm thao tác gì đặc biệt cả. Bởi vì các `thủ tục` đều là các thao tác khách quan tác động lên các đối tượng dữ liệu. Do đó chúng ta chỉ cần cung cấp các địa chỉ tham chiếu cho các `thủ tục` để tìm tới và xử lý dữ liệu giống như trong ví dụ mà chúng ta đã có trước đó với các lời gọi nối tiếp `chaining`.

```procedural.js
void function main() {
   var a = { value: null };
   var b = { value: null };
   var result = { value: null };
   // - - - - - - - - -
   getUserInput(a, b);
   calculate(a, b, result);
   updateView(result);
} (); // chạy chương trình

...
```

Ở đây chúng ta thấy các thủ tục `getUserInput`, `calculate`, và `updateView` sẽ lần lượt tìm tới các đối tượng dữ liệu `a`, `b`, và `result` để thao tác đọc hoặc chỉnh sửa các giá trị `value`.

Trong khi đó, để chuyển tiếp kết quả hoạt động giữa các `hàm` thì chúng ta có thể biểu thị sự kết hợp `composition` các chặng đường thành một lộ trình `đầu -> cuối` rồi sau đó thực hiện gọi hàm bằng `reduce`.

```functional.js
const add_1 = function(x) {
   return x + 1;
};

const multiply_2 = function(x) {
   return x * 2;
};

const subtract_3 = function(x) {
   return x - 3;
};

const power_4 = function(x) {
   return x ** 4;
};

var one = 1;     // xuất phát từ 1

var route = [
   add_1,        // đi tới 2
   power_4,      // đi tới 16
   multiply_2,   // đi tới 32
   subtract_3,   // đi tới 29
];

var target = route.reduce((x, f) => f(x), one);

console.log(one);   // 1
console.log(target);   // 29
```

Ở các ngôn ngữ chủ điểm hỗ trợ `functional` người ta còn cung cấp thêm cách viết biểu thị sự kết hợp `composition` của các hàm theo dạng `biểu thức` thông thường. Tuy nhiên trong JavaScript thì chúng ta có thể sử dụng cách viết như trên để theo dõi tuần tự của code từ trên xuống cũng được. :D

```composition.hs
fn = add_1 . power_4 . multiply_2 . subtract_3
fn 1
-- 29
```

## d. Một số đặc tính chung khác

Ngoài những đặc tính đã nêu trên thì các ngôn ngữ lập trình hiện đại đều cố gắng hỗ trợ một số tính năng chung để đáp ứng với nhu cầu xây dựng những phần mềm có kiến trúc phức tạp. Những đặc tính này có thể kể tên là - Trừu Tượng `Abstraction`, Đóng Gói `Encapsulation`, Kế Thừa `Inheritance`, và Đa Hình `Polymorphism`.

Đây là các đặc tính chung trong thiết kế phần mềm chứ không bị giới hạn ở của riêng ngôn ngữ hay mô hình lập tình nào cả. Tuy nhiên do bài viết này tới đây đã hơi quá dài nên chúng ta sẽ tạm chưa quan tâm tới việc thể hiện chúng trên nền `PP (Procedural Programming)` hay `FP (Functional Programming)` như thế nào. 

Các thuật ngữ này rất phổ biến trong `OOP (Object-Oriented Programming)` và nhiều khi được hiểu nhầm thành đặc tính riêng của mô hình lập trình này; Và tiện thể khi nói tới `OOP` ở bài viết sau thì chúng ta sẽ nói về chúng. Khi chúng ta hiểu cách mà những đặc tính này được biểu thị trên nền móng `OOP` thì chúng ta cũng sẽ biết cách để có thể mang chúng tới `FP` hay `PP`, hay bất kỳ đâu mà chúng ta cần, với tất cả những khả năng mà một ngôn ngữ hay một môi trường vận hành cung cấp. :D

## Kết thúc bài viết

Bài viết giới thiệu về hai khía cạnh tư duy `Procedural & Functional` của chúng ta đến đây là kết thúc. Trong bài sau, chúng ta sẽ cùng tản mạn về `Object-Oriented Programming` và `Agent-Oriented Programming`. Còn bây giờ thì đã đến lúc nghỉ giải lao rồi. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[**[JavaScript] Bài 25 - Object-Oriented Programming**](https://viblo.asia/p/AZoJj7BzLY7)