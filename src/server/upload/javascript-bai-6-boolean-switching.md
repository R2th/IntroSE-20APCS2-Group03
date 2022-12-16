Trong bài viết này, chúng ta sẽ nói về một kiểu dữ liệu mới có tên gọi là `boolean` và một cấu trúc điều kiện cho phép chúng ta thay đổi cách thức hoạt động của code trong hoàn cảnh nhất định.

## Chuyện chưa kể

Đó là một ngày bình thường như bao ngày khác, đã khá muộn và thần mặt trời cũng đã chuyển công tác tới một nửa phần còn lại của Trái Đất, lúc bấy giờ Luna - một trong những lập trình viên đầu tiên của thế giới - đang đi dạo trong khu vườn mây của mình. Cũng như bất kỳ ai trong số chúng ta khi ưu tư tìm kiếm giải pháp cho các tình huống trong cuộc sống, công việc, ..., sau một khoảng thời gian ngắm nhìn những suy nghĩ nội tại của bản thân, cuối cùng thì cô cũng có được một `khoảnh khắc "a ha!"` cho nỗi niềm mà cô đang trăn trở: "Làm thế nào để những chiếc máy tính có thể có được khả năng tự ra quyết định hành động trong những trường hợp nhất định?"

"Một đồng xu!" - cô ấy nói - "Những chiếc máy tính cần một đồng xu để có thể tự ra quyết định hành động trong những trường hợp cụ thể!". Và như vậy là một kiểu dữ liệu mới được tạo ra để mô tả 2 trạng thái của 1 đồng xu đang xoay lật.

```coin.js
var shouldDoIt;
shouldDoIt = false;
shouldDoIt = true;
```

Lại một lần nữa, một lỗi đánh máy không đáng có đã khiến kiểu dữ liệu `coin` có một cái tên gọi chính thức không hề liên quan `boolean` và được phổ truyền trên khắp thế giới. Đâu đó trong dòng chảy thời gian cho tới sau này, người ta cũng lại bắt đầu suy nghĩ về thứ gì đó liên quan tới toán học mỗi khi kiểu dữ liệu này được nhắc tới.

> Boolean - denoting a system of algebraic notation used to represent logical propositions, especially in computing and electronics.  
> *_Google*

Như vậy là trước đó chúng ta có từ khóa đánh máy nhầm là hàm `function` thay cho hành động `action`, và bây giờ là `boolean` thay cho đồng xu `coin`.  :D

Việc nhắc lại mấy câu chuyện lịch sử như thế này thực ra là vì mình muốn đảm bảo rằng bạn không cảm thấy xa lạ với những công cụ lập trình được xuất phát từ những thứ rất thân thuộc trong cuộc sống hàng ngày của chúng ta. Thế nên từ giờ cứ tự tin mà học tiếp, đừng quan trọng gì mấy từ vựng chuyên môn nhé. Mấy cái đó là để làm tài liệu cho có độ chuẩn thôi, chứ về bản chất thì toàn là những thứ mà chúng ta đã biết. :D

## Thế bây giờ mấy chiếc máy tính sử dụng mấy đồng xu này như thế nào?

Cũng như cách mà chúng ta sử dụng trong cuộc sống thực tế thôi, tung một đồng xu lên rồi đỡ lấy xem mặt nhìn thấy là mặt nào. Rồi sau đó ra quyết định xử lý công việc như kiểu "đội nào sẽ được giao bóng trước trong  một trận bóng... gì đó". :D

```comparison.js
console.log(1 == 0); // kết quả: false
console.log(1 > 0);  // kết quả: true
console.log(1 < 0);  // kết quả: false
```

Các giá trị `boolean` có thể được nghiệm thu khi chúng ta thực hiện các phép so sánh, để nhận định là đúng `true` hay sai `false`. Ở đây để kiểm tra xem giá trị `a` có bằng giá trị `b` hay không, chúng ta sử dụng ký hiệu với 2 đấu bằng `==`. Bên cạnh đó chúng ta còn 2 phép so sánh nữa là - lớn hơn hoặc bằng `>=` & nhỏ hơn hoặc bằng `<=`. Ngoài ra thì chúng ta còn có thể thu được một giá trị `boolean` khi thực hiện các phép toán logic như mô tả trong ví dụ dưới đây:

```logic.js
console.log(! true ); // kết quả: false
console.log(! false); // kết quả: true

console.log(true  && true ); // kết quả: true
console.log(true  && false); // kết quả: false
console.log(false && true ); // kết quả: false
console.log(false && false); // kết quả: false

console.log(true  || true ); // kết quả: true
console.log(true  || false); // kết quả: true
console.log(false || true ); // kết quả: true
console.log(false || false); // kết quả: false
```

Phép toán đầu tiên trong code ví dụ ở trên là lấy giá trị nghịch đảo của giá trị đứng bên phải dấu `!`. Kế đến là phép toán `&&` được sử dụng để kiểm tra xem đồng thời cả 2 giá trị đều `true` hay không? Cuối cùng là phép toán `||` sẽ kiểm tra liệu có bất kỳ giá trị nào trong số 2 giá trị được cung cấp là `true` hay không? 

Sau khi đã biết cách hướng dẫn máy tính làm thao tác tung đồng xu rồi thì chúng ta cần hướng dẫn cách sử dụng kết quả thu được để ra quyết định thực hiện hành động. Bước này cũng như cách mà chúng ta ra quyết định cho các tình huống trong cuộc sống hàng ngày thôi:

`Nếu (còn khỏe)` {  
&nbsp; &nbsp; &nbsp; thì học + công việc + chia sẻ kiến thức,  
}  
`không` {  
&nbsp; &nbsp; &nbsp; thì... chịu thôi. :D  
}

```condition.js
var beingHealthy = true;

if (beingHealthy) {
   console.log('Học + công việc + chia sẻ kiến thức.');
}
else {
   console.log('Chịu thôi. :D')
}

// kết quả: 'Học + công việc + chia sẻ kiến thức.'
```

Và đó là cú pháp điều kiện mà chúng ta đang mong chờ. Trong ví dụ trên, chúng ta có 2 khối code `if` và `else`. Đầu tiên, máy tính sẽ kiểm tra giá trị điều kiện bên trong cặp ngoặc đơn `()` của `if` để xem có nên thực hiện hành động trong cặp ngoặc xoắn `{}` đầu tiên hay không? Nếu `true` thì hành động đó sẽ được thực hiện, còn nếu `false` thì sẽ không được thực hiện.

Trong trường hợp `false` thì máy tính sẽ bỏ qua khối lệnh đặt trong cặp ngoặc xoắn `{}` đầu tiên và chuyển xuống khối `else` để thực hiện luôn khối lệnh ở trong cặp ngoặc xoắn thứ hai `{}`. Nếu như chúng ta chỉ có một câu lệnh đơn ở khối nào thì chúng ta có thể bỏ cặp ngoặc xoắn `{}` của khối đó đi và code vẫn sẽ hoạt động bình thường.

Cú pháp điều kiện của chúng ta cũng có thể được lược bỏ bớt khối `else` trong trường hợp không cần chỉ định phương án dự phòng mặc định `backup`. Hoặc cũng có thể nối tiếp từ khóa `else` với các khối điều kiện `if` khác nữa để xử lý một tình huống có nhiều ngã rẽ lựa chọn.

```posibility.js
var nthDayOfTheWeek = 1;

if (nthDayOfTheWeek == 0)
   console.log('Chủ Nhật. Ngày ông mặt Trời làm Chủ!');
else if (nthDayOfTheWeek == 1)
   console.log(
      'Số 0 trông mới giống ông mặt Trời.\n' + 
      'Với lại, lập trình viên, ai lại đếm từ số 1... :D'
   );
else if (nthDayOfTheWeek == 2)
   console.log('Thứ Hai');
else if (nthDayOfTheWeek == 3)
   console.log('Thứ Ba');
else if (nthDayOfTheWeek == 4)
   console.log('Thứ Tư');
else if (nthDayOfTheWeek == 5)
   console.log('Thứ Năm');
else if (nthDayOfTheWeek == 6)
   console.log('Thứ Sáu');
else if (nthDayOfTheWeek == 7)
   console.log('Thứ Bẩy');
else
   console.log(
      'Bạn không dùng lịch tây phải không?\n' +
      'Mình cũng chỉ xem Trăng là chủ yếu thôi.\n' +
      'Nhân tiện thì Luna là tên Latin của Trăng đấy. :D'
   );

// kết quả:
// Số 0 trông mới giống ông mặt Trời.
// Với lại, lập trình viên, ai lại đếm từ số 1... :D
```

Trong trường hợp có nhiều ngã rẽ lựa chọn xử lý như trên thì chúng ta còn có một cú pháp thay thế sử dụng từ khóa `switch` như thế này.

```switch.js
var nthDayOfTheWeek = 1;

switch (nthDayOfTheWeek) {
   case 0:
      console.log('Chủ Nhật. Ngày ông mặt Trời làm Chủ!');
      break;
   case 1:
      console.log(
         'Số 0 trông mới giống ông mặt Trời.\n' + 
         'Với lại, lập trình viên, ai lại đếm từ số 1... :D'
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
```

Ở đây bạn lưu ý là trong cấu trúc `switch`, chúng ta cần kết thúc mỗi trường hợp `case` bằng một lệnh `break;` để code hoạt động giống với logic của các khối `if ... else ìf ...` nối tiếp.

## Bình thường hóa cái dropdown kỳ lạ

Tới đây thì chúng ta đã có trong tay bộ công cụ để bình thường hóa cái `dropdown` mà chúng ta đã xây dựng trong bài viết trước rồi. Bây giờ chúng ta cần thực hiện một số việc như sau:

- Sửa lại code HTML để bỏ đi nút `Hide List` có nền màu ghi.
- Nút nhấn còn lại chúng ta có thể ghi chữ 'Show/Hide List' hoặc ghi tiêu đề cho danh sách, và tên `id` có thể đổi thành `#btn-toggle`.
- Chỉnh lại code CSS để lược bỏ code thừa.
- Trong code JS thì chúng ta cần viết thêm một hàm xử lý sự kiện `toggleList(event)` để ra quyết định khi nào thì thực hiện `showList(event)` và khi nào thì thực hiện `hideList(event)`.

Ở đây mình sẽ chỉ đặt phần code JS bổ sung để bạn so sánh với cách thực hiện trong code của bạn thôi. :D

```dropdown.js
/* ... */

function toggleList(event) {
   var theList = document.getElementById('the-list');
   var theListIsHidden = theList.className.includes('hidden');
   
   if (theListIsHidden)
      showList(event);
   else
      hideList(event);
}

var theBtn = document.getElementById('btn-toggle');
theBtn.onclick = toggleList;
```

Ở dòng code thứ 2 trong code ví dụ, phép kiểm tra xem danh sách `#the-list` đang ẩn hay đang hiện, chúng ta truy vấn tới biến `className` và thu được kết quả là chuỗi `'dropdown-list hidden'` hoặc `'dropdown-list shown'`.

Lúc này chúng ta có thể sử dụng hàm [includes](https://www.w3schools.com/jsref/jsref_includes.asp) của `string` để kiểm tra sự tồn tại của chuỗi con `'hidden'`. Hàm này sẽ trả về giá trị `true` nếu chuỗi thu được là `'dropdown-list hidden'` và sẽ trả về `false` trong trường hợp còn lại.

Như vậy là chúng ta đã chính thức hoàn thành việc xây dựng một `dropdown` với JavaScript. Tuy nhiên code của chúng ta vẫn còn một hạn chế, đó là nếu như chúng ta có nhiều `dropdown` na ná như nhau trong cùng một trang đơn thì chúng ta sẽ phải viết lặp khá nhiều thành phần trong code JavaScript.

Lý do là vì giải pháp hiện tại của chúng ta đang làm việc xung quanh bộ chọn `id`. Nếu như chúng ta có nhiều `dropdown` đang cùng bày trong một giao diện thì hiển nhiên chúng ta sẽ phải đặt thêm các tên `id` khác nữa cho các thành phần và tạo thêm biến `id` trong định nghĩa hàm để truyền tên các `id` vào các lần gọi hàm. Đối với mỗi một `dropdown` như vậy chúng ta sẽ phải thực hiện lại thao tác gắn hàm xử lý vào một nút nhấn đặc định.

Hạn chế này có thể được loại bỏ khi chúng ta có được sự giúp đỡ của một bộ công cụ mới đó là một kiểu dữ liệu phức hợp được gọi là bộ sưu tập `collection` và các công cụ hỗ trợ lặp thao tác xử lý qua các thành phần của `collection`. Bây giờ thì hãy nghỉ giải lao một chút đã. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

> Trăng bao nhiêu tuổi trăng già,  
> Núi bao nhiêu tuổi gọi là núi non.  
> Trăng bao nhiêu tuổi trăng tròn,  
> Núi bao nhiêu tuổi núi còn trơ trơ.  
> *_Ca dao Việt Nam*

[[JavaScript] Bài 7 - Collection & Looping](https://viblo.asia/p/3P0lP8yolox)