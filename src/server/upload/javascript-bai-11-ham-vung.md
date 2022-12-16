Trong bài viết này, chúng ta sẽ gặp lại 2 khái niệm: Hàm `function` và Vùng `scope` - đã được giới thiệu trong [**bài viết JavaScript số 3**](https://viblo.asia/p/QpmleRQ95rd) mà chúng ta đã thực hiện trước đây. Chúng ta đã có một phần giới thiệu về 2 khái niệm này ở một giao diện bề mặt đơn giản, phù hợp với thời điểm khởi đầu. Tuy nhiên ở thời điểm hiện tại, chúng ta đã khá quen với `JavaScript` và công việc lập trình nói chung; Và tất nhiên là đã có thể tự tin hơn để tìm hiểu về các khái niệm ở một giao diện có chiều sâu và chi tiết hơn. Hãy cùng gặp gỡ những điều mới mẻ của những khái niệm cũ. :D

## Một cú pháp khác để khởi tạo hàm trong JavaScript

Bên cạnh cú pháp khai báo hàm bằng từ khóa `function` mà chúng ta đã biết, JavaScript còn cung cấp cho chúng ta một cú pháp khác để khởi tạo một hàm như sau:

```function.js
const doubleIt = (num) => num * 2;
console.log( doubleIt(9) );
// kết quả: 18
```

Như bạn thấy thì cú pháp mới không sử dụng từ khóa mà thay vào đó chúng ta có một ký hiệu `=>` ở sau cặp ngoặc đơn khai báo các biến nhận dữ liệu vào hàm `(num)`. Cũng vì ký hiệu `=>` này mà các hàm được tạo ra bằng cú pháp mới được gọi là các hàm mũi tên `arrow function`. Nó có tên gọi riêng để phân biệt với cái cũ thì hiển nhiên cũng sẽ có những điểm khác biệt nào đó nữa để người ta cần phải đặt tên mới như vậy. Chúng ta sẽ xem có những gì khác nữa nào. :D

Hàm `doubleIt` của chúng ta sẽ trả về một giá trị được khuếch đại lên gấp 2 lần như tên hàm đã mô tả. Vậy ở đây chúng ta có phần phía sau ký hiệu `=>` chính là phần thân hàm `num * 2`. Chúng ta không thấy từ khóa `return` để trả về giá trị và cũng không có cặp ngoặc đơn `{}` thường thấy để khoanh vùng phần thân hàm. Vậy có lẽ cú pháp này được thiết kế để viết hàm ở những vị trí nào đó mà chúng ta cần sự ngắn gọn, xúc tích. :D

Bây giờ giả sử chúng ta có một mảng các giá trị số học và muốn tạo ra một mảng mới có các phần tử được `nhân đôi` so với các giá trị ở mảng cũ. Có lẽ cú pháp mới này sẽ rất phù hợp. :D

```function.js
var numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var newArray = numArray.map((num) => num * 2);

console.log(newArray);
// kết quả: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

Ồ... như vậy là đối với những trường hợp cần truyền một hàm `đơn giản` vào một hàm khác, có lẽ chúng ta sẽ không cần phải cố gắng nghĩ ra thêm một cái tên cho một hàm mà chúng ta không có nhu cầu sử dụng lại. Thật tuyệt. :D

Tuy nhiên, đó - chưa phải là tất cả. Cú pháp `=>` còn cho phép chúng ta viết hàm ngắn gọn hơn trong trường hợp muốn tạo ra một hàm nhận vào nhiều giá trị, và muốn áp dụng các giá trị đầu vào theo từng phần.

```partial.js
const multiply = (a) => (b) => a * b;
const doubleIt = multiply(2);
const tripleIt = multiply(3);

console.log( doubleIt(0) );   // kết quả: 0
console.log( doubleIt(1) );   // kết quả: 2
console.log( tripleIt(0) );   // kết quả: 0
console.log( tripleIt(1) );   // kết quả: 3
```

Ở đây hàm `multiply` được định nghĩa là một hàm nhận vào duy nhất một giá trị `(a)` và trả về một giá trị nào đó sau ký hiệu `=>` đầu tiên. Sau đó giá trị trả về ở đây lại là một hàm được định nghĩa là nhận vào duy nhất một giá trị `(b)` và trả về kết quả là `a * b`. Do hàm thứ 2 được tạo ra xếp chồng ở bên trong hàm đầu tiên, nên có thể tham chiếu tới biến đầu vào `a` của hàm thứ nhất.

Trong trường hợp sử dụng cú pháp `function` để khởi tạo hàm `multiply` như trên, chúng ta sẽ phải viết dài hơn khá nhiều.

```partial.js
const multiply = function(a) {
   return function(b) {
      return a * b;
   };
}; // multiply
```

Tuy nhiên thì mọi thứ đều có ưu điểm và nhược điểm riêng. Nếu đứng từ góc độ của một người chưa từng viết code, rõ ràng từ khóa `function` có tính mô tả tốt hơn và chỉ ra rất rõ rằng `đây là một hàm`; Và không yêu cầu người đọc phải tìm hiểu thông tin về ý nghĩa của cú pháp đang sử dụng là `để làm gì`? Trong khi đó thì ký hiệu `=>` chỉ nói được lên rằng `có một sự liên quan` giữa ký hiệu `a` với vế bên phải, và tương tự với ký hiệu `b` sau đó.

Vì vậy nên trường hợp sử dụng với các hàm lặp của mảng thì cú pháp mới khá phù hợp, còn ở trường hợp thứ 2 thì chúng ta sẽ cần phải cân nhắc xem code mà chúng ta viết ra sẽ chia sẻ cho những ai nữa. Bản thân mình thì rất ưa thích cú pháp `=>` để sử dụng cho trường hợp số 2 vì nó cho phép định dạng code với các tham số thẳng hàng và rất dễ theo dõi.

```partial.js
const divide =
   (divident = 0) =>
   (divisor = 1) =>
      {  return divident / divisor  }

var divNine = divide(9)

console.log( divNine(81) )   // 9
console.log( divNine(108) )   // 12
```

Tuy nhiên trong ở đây thì chúng ta sẽ luôn luôn dự trù thêm trường hợp có ai đó bất chợt ghé qua và tham gia học cùng; Do đó bạn thông cảm là các ví dụ từ đây về sau này mình vẫn sẽ dùng chủ yếu là cú pháp `function` nhé. Khi nào tới thời điểm rất rất cần chuyển đổi cú pháp sử dụng thì mình sẽ báo trước. :D

## Hỗ trợ lượng tham số không cố định

Chúng ta có thể viết một hàm làm việc với số lượng giá trị được truyền vào chưa được biết trước tại thời điểm định nghĩa hàm như sau.

```rest.js
const log = function(...parameters) {
   var line = parameters.join(' ');
   console.log(line);
};

log('one', 'two');
// 'one two'
```

## Các giá trị đầu vào mặc định

Một điểm mới nữa về các hàm, đó là chúng ta sẽ có thể thiết lập giá trị mặc định cho các biến đầu vào của hàm. 

Điều này sẽ giúp chúng ta đảm bảo là hàm sẽ hoạt động tốt trong trường hợp `không có` dữ liệu truyền vào hàm ở những tình huống cụ thể, chứ không báo lỗi hay trả về một giá trị vô nghĩa đối với đoạn code tiếp theo sau lời gọi hàm đó.

Bên cạnh đó thì việc thiết lập giá trị mặc định cho các biến đầu vào sẽ giúp cho các trình soạn thảo code nhận diện được kiểu giá trị của biến đó, và sẽ gợi ý cho chúng ta các hàm liên quan có thể muốn sử dụng khi chúng ta sử dụng biến đó. Tới đây thì mình muốn giới thiệu tới bạn một trình soạn thảo code miễn phí khác là [**Visual Studio Code của Microsoft**](https://code.visualstudio.com/). Trình soạn thảo code này thực sự rất tuyệt khi làm việc với JavaScript; Còn với Atom thì chúng ta sẽ cần phải cài thêm một vài `plug-in` hỗ trợ để được gợi ý code JavaScript tốt hơn.

```parameter.js
const fixNum = function(a = 0) {
   return a.toFixed(2);
};

console.log( fixNum() );
// kết quả: '0.00'

console.log( fixNum(10.0123456789) );
// kết quả: '10.01'
```

Thực ra vẫn còn một vài điều nữa mà chúng ta chưa tìm hiểu hết về các hàm được tạo ra bởi `function` và `=>`. Tuy nhiên những kiến thức đó lại có phần liên quan tới `object` cho nên chúng ta sẽ để dành sang bài viết tiếp theo về `Object & Everything`. Còn bây giờ thì chúng ta sẽ gặp gỡ một kiểu hàm mới. :D

## Các hàm `function*`

Đây là một kiểu hàm mới chứ không phải là một cú pháp thay thế như cú pháp `=>`. Các hàm `function*` còn được gọi là các `generator` - các hàm sản xuất ra các giá trị. Trước khi nói thêm về kiểu hàm mới này, chúng ta cần một đoạn code ví dụ:

```generator.js
const createNumbers = function* () {
   yield 1;
   yield 2;
   yield 3;
};

var numberGenerator = createNumbers();

numberGenerator.next()
console.log( numberGenerator.value );
// kết quả: 1

numberGenerator.next();
console.log( numberGenerator.value );
// kết quả: 2

numberGenerator.next();
console.log( numberGenerator.value );
// kết quả: 3
```

Thay vì trả về một giá trị cố định, một hàm `function*` sẽ trả về một object thực thể của [**class Generator**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator). Hàm `createNumbers` ban đầu sẽ được lưu lại trong object `numberGenerator` này nhưng code bên trong hàm chưa được thực thi ngay.

Khi chúng ta gọi hàm `next` (đi tiếp) lần đầu tiên, hàm `createNumbers` mới thực sự được thực thi và dừng lại ở câu lệnh `yield` đầu tiên trả về giá trị là `1` và được lưu vào biến `value` của object `numberGenerator`.

Ở lần gọi hàm `next` tiếp theo thì hàm `numberGenerator` bắt đầu chạy tiếp từ điểm dừng lần trước và đi tới câu lệnh `yield` tiếp theo để trả về giá trị là `2` và được lưu tiếp vào biến `value` của `numberGenerator`. Và cứ như vậy...

Như bạn thấy thì các hàm `function*` sẽ rất hữu ích khi chúng ta muốn trả về các giá trị theo từng phần. Ngược lại với logic truyền các giá trị vào hàm từng phần ở phía trên. :D 

Hoặc, trong trường hợp chúng ta muốn trả về một tập giá trị vô hạn, nhưng chỉ khi chúng ta cần sử dụng tới đâu thì `generator` mới thực hiện tính toán và cung cấp ra giá trị tới đó. Tuy nhiên để làm vậy thì chúng ta sẽ cần tới sự hỗ trợ của một cấu trúc lặp có thể lặp vô hạn mà chúng ta chưa được gặp gỡ. Hãy tạm ghi nhớ điểm này và nhắc mình khi chúng ta tìm hiểu về các cấu trúc lặp trong một bài viết sau này nhé. :D

Lưu ý cuối cùng về các `object Generator`, đó là để kiểm tra trạng thái của hàm thực thi bên trong `generator`, chúng ta truy xuất tới biến `done`. Nếu thu được giá trị `true` thì có nghĩa là hàm thực thi bên trong đã được chạy hết các lệnh `yield` tiềm năng; Còn nếu là `false` thì chúng ta vẫn còn có thể tiếp tục gọi hàm `next` để lấy ra giá trị tiếp theo.

Để để kết thúc `generator` trước khi hàm thực thi bên trong được chạy xong thì chúng ta có thể gọi hàm `.return()`.

```generator.js
const createNumbers = function* () {
   yield 1;
   yield 2;
   yield 3;
};

var numberGenerator = createNumbers();

numberGenerator.next();
console.log( numberGenerator.value );
// kết quả: 1

numberGenerator.return();
console.log( numberGenerator.value );
// kết quả: undefined
```

## Các hàm được thực hiện xử lý không đồng bộ `asynchronous function`

Ở đây từ "không đồng bộ" hay `async` (asynchronous), được hiểu lơ mơ là kiểu hàm này sẽ được xử lý trễ nhưng môi trường chạy JavaScript sẽ không chờ đợi các lời gọi hàm này được thực hiện xong rồi mới tiếp tục thực hiện phần code tiếp theo sau đó.

Thông thường thì tiến trình chạy code JavaScript sẽ được thực hiện tuần tự; Và lệnh gọi hàm sau sẽ phải chờ cho đến khi lệnh gọi hàm trước được thực hiện xong rồi mới được thực thi. Tuy nhiên, nếu vậy thì trang web của chúng ta sẽ rất thiếu linh động.

Giả sử chúng ta có một lời gọi hàm đầu tiên truy vấn thêm dữ liệu từ máy chủ web, và một lời gọi hàm thứ hai thực hiện hiển thị một thành phần khác trong trang web không liên quan tới hàm đầu tiên. Nếu như khi chúng ta chạy hàm đầu tiên và kết quả trả về từ máy chủ web bị trễ một thời gian, vậy công việc mà hàm thứ hai thực hiện sẽ bị trễ theo. Và điều này sẽ khiến cho trang web của chúng ta sẽ giống như bị lỗi.

Đó là lý do JavaScript được thiết kế để cho phép những hàm nhất định có thể được thực thi không đồng bộ với tiến trình chính. Ví dụ phổ biến nhất là các hàm giao tiếp với máy chủ web, hoặc các hàm có chứa nội dung thực hiện được hẹn giờ trễ.

```async.js
   /* Hàm in được xử lý không đồng bộ */

const asyncPrint = function(data) {
   var delay = 10 * 1000;
   setTimeout((_) => console.log(data), delay);
};

   /* Hàm in bình thường */ 

const normalPrint = function(data) {
   console.log(data);
};

   /* Chạy các hàm */

asyncPrint('Thông báo được in ra sau 10 giây.');
normalPrint('Thông báo bình thường.');

// kết quả:
// 'Thông báo bình thường.'
// 10 giây sau...
// 'Thông báo được in ra sau 10 giây.'
```

Trong ví dụ trên, chúng ta có 2 hàm in thông báo. Hàm đầu tiên `asyncPrint` được định nghĩa trì hoãn lệnh in 10 giây và được gọi trước hàm in bình thường `normalPrint`. Tuy nhiên kết quả là hàm `normalPrint` được thực thi xong trước và không phải chờ đợi hàm `asyncPrint` được thực thi xong.

Nếu nói về lý do trên phương diện kỹ thuật, thì những hàm chứa các thao tác có thể bị trì trệ như `asyncPrint` sẽ được JavaScript thực thi ở một tiến trình riêng biệt; Và tiến trình thực thi chính sẽ tiếp tục đi tới phần code tiếp theo ngay sau khi phát động lời gọi hàm `asyncPrint` mà không chờ đợi hàm này được thực thi xong.

Tới đây thì chúng ta có một câu hỏi khác xuất hiện. Nếu như trong trường hợp chúng ta muốn chờ đợi một hàm như `asyncPrint` được thực thi xong, rồi tiếp tục thực hiện một công việc liên quan cần sử dụng tới kết quả của lời gọi hàm này, thì chúng ta cần phải xử lý như thế nào?

## Các hàm gọi lại `callback`

Thuật ngữ "hàm gọi lại" hay `callback` được gắn liền với các hàm `async`. Các hàm `callback` không có gì đặc biệt, và chỉ đơn giản là các hàm được truyền vào những lời gọi hàm `async` để được thực hiện sau khi tác vụ chính của hàm `async` đã hoàn thành.

```callback.js
   /* Hàm in được xử lý không đồng bộ */

const asyncPrint = function(message, callback) {
   var delay = 10 * 1000;
   setTimeout(
      function() {
         console.log(message);
         callback();
      },
      delay
   ); // setTimeout
}; // asyncPrint

   /* Hàm in bình thường */

const normalPrint = function(data) {
   console.log(data);
};

   /* Thực hiện in thông báo */

var asyncMessage = 'Thông báo được in ra sau 10 giây.';
var callback = (_) => normalPrint('Thông báo bình thường.');
asyncPrint(asyncMessage, callback);

// kết quả:
// trễ 10 giây...
// 'Thông báo được in ra sau 10 giây.'
// 'Thông báo bình thường.'
```

## Các hàm khép kín `closure`

Thuật ngữ "hàm khép kín" hay `closure` được sử dụng để mô tả các hàm có khả năng duy trì các biến nội bộ như các thuộc tính trong trường hợp của một `object`.

```closure.js
const createClosure = function() {
   var oneProperty = -1;
   
   var closure = function() {
      oneProperty += 1;
      return oneProperty;
   };
   
   return closure;
}; // createClosure

const generateNumber = createClosure();

console.log( generateNumber() );   // 0
console.log( generateNumber() );   // 1
console.log( generateNumber() );   // 2
console.log( generateNumber() );   // 3
```

Trong code ví dụ trên, chúng ta thấy khi thực hiện chạy hàm `createClosure()` thì biến `oneProperty` sẽ được tạo ra với `scope` nội bộ. Thông thường thì sau khi hàm được thực thi xong, các biến cục bộ như `oneProperty` sẽ được xóa khỏi bộ nhớ đệm của máy tính. Tuy nhiên trong trường hợp này, biến `oneProperty` vẫn có khả năng sẽ được tham chiếu và sử dụng bởi hàm `closure` được trả về môi trường bên ngoài, do đó vẫn được duy trì.

Lúc này chúng ta thấy biến `oneProperty` rất giống với một thuộc tính ẩn của một `object`. Nó không thể được truy xuất tới từ đâu khác, nhưng lại có thể được sử dụng bởi hàm `closure`. Trường hợp này có thể được xem như chúng ta đang tạo ra một `object` trực tiếp mà không sử dụng `class`, và `object` này có một thuộc tính ẩn là `oneProperty` kèm theo một phương thức mở cho code bên ngoài sử dụng đó là `closure`.

## Các hàm tự gọi `self-invoking`

Thông thường thì tệp JavaScript chính để khởi chạy chương trình sẽ bao gồm nhiều lời định nghĩa hàm và một đoạn code ở bên ngoài các định nghĩa hàm để trình duyệt web chạy ngay khi tải xong. Nếu chúng ta không muốn đoạn code này tạo ra các biến gắn trên dòng chảy chính của chương trình, chúng ta có thể tạo ra một hàm khởi điểm tên là `main` giống như nhiều ngôn ngữ lập trình khác thường làm. Rồi thực hiện một lệnh gọi hàm `main()` để bắt đầu chạy chương trình.

Như vậy cũng được. Tuy nhiên trong JavaScript thì chúng ta còn một khái niệm khác là các hàm tự gọi `self-invoking function` - được hiểu nôm na là các hàm không tên và được thực thi ngay khi vừa mới định nghĩa xong.

```void.js
void function() {
   var nonGlobalBox = 'Biến này không thể là `global`.';
   console.log('Bắt đầu chạy chương trình...');
} ();

// 'Bắt đầu chạy chương trình...'
```

Bạn lưu ý là ở đây chúng ta sử dụng phép gọi hàm `()` ngay sau khi kết thúc định nghĩa một hàm không tên. Tuy nhiên điều này chỉ có thể được thực hiện hợp lệ nếu như chúng ta sử dụng từ khóa `void` đặt trước từ khóa `function` như trên, hoặc bao quanh phần định nghĩa hàm bằng một cặp ngoặc đơn nữa `()` để đoạn code khai báo hàm sẽ trả về một `object Function` ngay tại vị trí viết.

Trên thực tế thì từ khóa `void` trong JavaScript được sử dụng để đảm bảo giá trị trả về của biểu thức phía bên phải nó sẽ được bỏ đi và không được sử dụng vào mục đích khác. Do đó đoạn khai báo định nghĩa hàm đứng sau sẽ được hiểu là một biểu thức và trả về một `object Function` ngay tại vị trí đó. Sau đó thì phép gọi hàm `()` sẽ được ưu tiên cao hơn từ khóa `void` và sử dụng `object Function` trước. Kết quả là hàm của chúng ta được chạy ngay sau khi định nghĩa xong.

## Nói thêm về khái niệm Vùng `scope`

Lần này gặp lại khái niệm Vùng `scope` chúng ta sẽ đi qua nhanh thôi vì căn bản chúng ta đã hiểu `scope` là cái gì rồi. :D

Trong bài viết trước thì chúng ta được gặp 2 từ khóa mới `const` và `let` giúp chúng ta tạo ra những chiếc hộp lưu trữ các giá trị - bên cạnh từ khóa `var` đã biết. Điểm khác biệt cơ bản là `const` và `let` có khả năng tạo vùng hoạt động nhỏ hơn so với cấp độ của hàm `function`. Hãy cùng xem xét ví dụ sau.

```scope.js
const printNumbers = function() {
   var theVar = 1;
   let theLet = 2;
   
   if (true) {
      var theVar = 3;
      let theLet = 4;
   }
   
   console.log(theVar);   // 3
   console.log(theLet);   // 2
}; // printNumbers

printNumbers();
```

Như bạn thấy trong kết quả được in ra, biến `theVar` ban đầu được ghi đè lại bởi đoạn khai báo bên trong khối `if` nhưng biến `theLet` ban đầu thì không bị ghi đè. Lý do là vì đoạn khai báo `theLet` bên trong khối `if` sẽ tạo ra một biến mới với phạm vi hoạt động `scope` giới hạn bên trong cặp ngoặc xoắn `{}` của khối `if`.

Vì vậy nên các khóa `const` và `let` được xem là các giá trị hỗ trợ `block scope` - phạm vi hoạt động giới hạn bởi các khối lệnh được khoanh vùng bởi một cặp ngoặc xoắn `{}` bất kỳ - còn `var` thì không.

```scope.js
var theVar = 1;
let theLet = 2;

{
   var theVar = 3;   // ghi đè
   let theLet = 4;   // biến mới
}
```

## Vùng hoạt động `scope` lớn nhất

Code JavaScript khi được viết ở bên ngoài tất cả các cặp ngoặc xoắn `{}` sẽ thuộc `scope` lớn nhất và thuộc về `object` mô tả môi trường chạy JavaScript. Trong các trình duyệt web thì đó là `window`, còn ở môi trường NodeJS sẽ là `global`.

Khi chúng ta khai báo các biến `var` ở `scope` này thì nó trở thành thuộc tính gắn với `object` môi trường và có thể truy xuất ở bất kỳ đâu. Do đó còn được gọi là các biến toàn cục `global`. Tuy nhiên các khóa `const` và `let` ở mặt khác lại được thiết kế để `không` hoạt động như vậy.

```global.js
var globalBox = 'something';
console.log( window.globalBox );
// 'something'

const nonGlobalBox = 'another thing';
console.log( window.nonGlobalBox );
// 'undefined'
```

## Vậy chúng ta nên dùng `var`, `let`, hay `const`?

Tùy vào mục đích sử dụng trong từng tình huống và người viết code thôi. :D Bạn có thể dùng bất kỳ cái nào bạn ưa thích và với mục đích nào đó để đem lại tiện ích nhất định cho code của bạn. :D

Mình thì hay dùng `const` để khai báo hàm ở `scope` ngoài cùng để tránh bị khai báo đè, hoặc ghi đè giá trị nào đó vào ở một đoạn code nào đó khác; Và dùng `var` cho các biến khai báo trong hàm để sử dụng vì mình thường viết các hàm ngắn nên cũng dễ theo dõi và không ngại khả năng khai báo lặp.

Và vì từ khóa `var` có tính mô tả tốt hơn `let` nên người đọc không biết gì về JavaScript thì cũng lơ mơ đoán ra được `var` nó là `variable` cũng giống như `const` thì chắc là `constant`. :D Còn khi đọc từ `let` thì không chắc đó là `Biến` hay là `Hằng`. Lý do là vì JavaScript hỗ trợ nhiều mô hình lập trình và từ khóa `let` lại thường xuất hiện trong các ngôn ngữ chủ điểm `Functional Programming` ví dụ như Haskell, F#, v.v... - mô hình lập trình lấy các hàm làm trọng tâm, biểu thị cho các khối xây dựng nên chương trình. Do đó nên `let` có khả năng sẽ được đoán nhầm là `Hằng` thay vì `Biến`. :D 

Việc sử dụng `var` thay vì `let` cũng là một dạng ràng buộc mình muốn tạo ra để bản thân buộc phải suy nghĩ về việc chia nhỏ tác vụ cần thực hiện thành các hàm nhỏ hơn, như vậy nó giúp mình tư duy tốt hơn khi viết code nữa. :D

## Các hàm đệ quy `recursion`

Mình để phần này ở cuối bài sau khi đã nói xong về `scope` là bởi vì khái niệm "đệ quy" không phải là một khái niệm riêng dành cho hàm. Nó dành cho tất cả mọi thứ trong cuộc sống của chúng ta. :D

![image.png](https://images.viblo.asia/a9c475e1-94db-4e9e-a586-5e7d097b1768.png)

Khái niệm "đệ quy" hay `recursion`, được hiểm nôm na là một thứ gì đó được định nghĩa bởi chính nó. :D

Mới nghe thì có vẻ như đây là một khái niệm gì đó rất trừu tượng và xa vời với cuộc sống hàng ngày của chúng ta. Nhưng thực tế thì khi chúng ta suy nghĩ một cách nghiêm túc về tất cả mọi thứ xung quanh... chúng ta sẽ thấy là: "không có bất kỳ một thứ gì trong cuộc sống của chúng ta không mang tính đệ quy". Và nếu có, thì chỉ là vì tầm nhìn của chúng ta chưa đủ lớn để bao quát hết một chu kỳ chuyển động của thứ mà chúng ta đang quán xét. :D

Nhưng thôi, lan man quá là sẽ thành ra khó hiểu. Chúng ta thử xem một code ví dụ đi. :D

```recursion.js
   /* Functions */

const flatSum = function(numArray) {
   var total = 0;
   numArray.forEach((num) => total += num);
   return total;
};

const recursiveSum = function(numArray) {
   var firstNum = numArray[0];
   var restNums = numArray.slice(1);
   // ---
   if (numArray.length > 0)   return firstNum + recursiveSum(restNums);
   else                       return 0;
};

   /* Test */

var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var fortyFive = flatSum(numArray);
console.log(fortyFive);
// kết quả: 45

var fortyFiveAgain = recursiveSum(numArray);
console.log(fortyFive);
// kết quả: 45
```

Ở đây chúng ta có các hàm `sum` hỗ trợ tính tổng của một mảng các số nguyên `numArray`. Khi mới bắt đầu suy nghĩ về một cách thức để xử lý tác vụ tính tổng của một mảng số nguyên như thế này, chúng ta thường sẽ có 2 cách suy nghĩ tùy vào trạng thái tâm thức của chúng ta ở mỗi thời điểm nhất định.

Cách đầu tiên là lối tư duy phẳng `flat`. Chúng ta giả lập một chiếc hộp `total` để lưu trữ kết quả tổng và khởi đầu với giá trị là `0`. Sau đó chúng ta lấy ra từng phần tử của mảng `numArray` để gộp dần vào trong chiếc hộp `total`. Chúng ta biết rất rõ "việc cần làm là gì?" với cách tư duy này.

Cách thứ hai là lối tư duy đệ quy `recursive`. Tổng giá trị mà chúng ta cần tính đã ở đó rồi, nó chính là mảng `numArray`. Bởi vì tất cả các giá trị mà chúng ta đang cần tính tổng đều ở đó cả, chúng sẽ không tự di chuyển đi đâu nếu như chúng ta không làm việc đó. :D Việc chúng ta cần làm là đựa ra định nghĩa tổng của một mảng mà chúng ta đang cần tính "là cái gì?".

Cụ thể là chúng ta có thể chia mảng `numArray` thành 2 phần, bao gồm - phần tử đầu tiên `firstNum`, và một mảng ngắn hơn chứa các phần tử còn lại `restNums`. Vậy "tổng của một mảng bất kỳ" sẽ có thể hiểu là "phần tử đầu tiên" cộng gộp với "tổng của mảng còn lại". Điều này hiển nhiên đúng, phải không? :D Nó luôn luôn đúng cho đến khi "phần tử đầu tiên" không thể xác định được, hay nói cách khác là khi nó không tồn tại bởi vì chúng ta có một mảng rỗng `[]`. Vậy "tổng của một mảng bất kỳ" còn có thể là `0` nếu đó là một mảng rỗng `[]`. :D

Sau khi chúng ta định nghĩa xong rồi thì công việc tính toán là của máy tính thôi. :D

```conversation.js
[ Máy tính ] "Tổng của mảng [1, 2, 3, 4, 5, 6, 7, 8, 9] là gì?"
[Người dùng] "Ủa, tưởng giỏi tính toán hơn tôi. Sao hỏi kỳ thế?"
[ Máy tính ] "Tôi giỏi tính toán chứ không giỏi tiếng Việt.  
              Tổng đấy là cái gì thế?"
[Người dùng] "Ừ thì là: 1 + tổng của mảng [2, 3, 4, 5, 6, 7, 8, 9]"
[ Máy tính ] "Ok, đó là bước 1. Cái đoạn `1 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 2 + tổng của mảng [3, 4, 5, 6, 7, 8, 9]"
[ Máy tính ] "Ok, đó là bước 2. Cái đoạn `2 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 3 + tổng của mảng [4, 5, 6, 7, 8, 9]"
. . .
. . .
[ Máy tính ] "Ok, đó là bước 8. Cái đoạn `8 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 9 + tổng của mảng []"
[ Máy tính ] "Ok, đó là bước 9.  Cái đoạn `9 +` thì tôi biết rồi.
              Nhưng tổng của mảng [] là cái gì?"
[Người dùng] "Là 0. Có gì đâu để mà tính. Thế ra kết quả chưa?"

[ Máy tính ] "Từ từ để tôi quay lại bước 9 đã... Tổng là 9."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
[ Máy tính ] "Từ từ để tôi quay lại bước 8 đã... Tổng là 17."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
. . .
. . .
[ Máy tính ] "Từ từ để tôi quay lại bước 2 đã... Tổng là ..."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
[ Máy tính ] "Từ từ để tôi quay lại bước 1 đã... Tổng là 45.
              Kết quả cuối cùng rồi đấy."

[Người dùng] "Ok, thế bây giờ tính giúp tôi tổng của mảng  
              [1, 2, 3, ..., 100_000] được không?"
[ Máy tính ] "Tôi chỉ nhớ được khoảng 10_000 bước thôi."
```

Đệ quy là vậy đấy. Lối tư duy này không bao giờ khiến chúng ta phải cố gắng suy tưởng cho 1001 thao tác tiếp theo cần thực hiện, hay 1001 ngày tiếp theo cuộc sống sẽ như thế nào. Nếu như thành công của bạn được định nghĩa là 1001 ngày làm việc chăm chỉ và sống tích cực. Thì chúng ta cũng có thể hiểu đó là - "1 ngày hôm nay làm việc chăm chỉ và sống tích cực" và tiếp tục bước tới "phần còn lại của thành công". :D

Như vị sư trong tấm hình mô tả ở phần mở đầu đang sống ở ngày hôm nay, và tiếp tục hành trình cho tới khi đi tới một điểm nào đó ở giữa vòng xoáy đệ quy. Như câu nói của thầy Lão Tử truyền lại từ hơn 3000 ngăm trước được ghi trong tấm hình ấy.

> "Hành trình dài ngàn dặm, xuất phát bởi bước đi đầu tiên."  
> *_Lão Tử*

Chúc bạn may mắn và thiện duyên - trong công việc và cuộc sống ở hiện tại - ngày hôm nay. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

> "Hành trình dài ngàn dặm, là khoảng 999999999.... bước. Không biết có đi nổi tới nơi không nữa. =,="  
> *_Suy nghĩ của tôi vào những lúc tâm trí đi lạc tới một ngày không đẹp trời trong tương lai giả định :D*

[**[JavaScript] Bài 12 - Object & Everything**](https://viblo.asia/p/3P0lP8Avlox)