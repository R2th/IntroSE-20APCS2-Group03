Trong bài viết này, chúng ta sẽ nói về 2 khái niệm cơ bản trong lập trình là Kiểu và Biến; Và giới thiệu sơ lược về 2 Kiểu dữ liệu phổ biến nhất. Hãy bắt đầu với khái niệm Kiểu.

## Kiểu là cái gì?

> Kiểu dữ liệu là khái niệm về việc phân loại dữ liệu để sử dụng trong phần mềm máy tính.  
> *_Một người mới học lập trình*

Thực ra thì mình không phải là fan của việc sử dụng các từ ngữ mang tính chất học thuật để mô tả mọi thứ; Bởi vì những từ ngữ này thường khiến cho chúng ta có cảm giác trừu tượng và xa lạ đối với những thứ rất phổ cập mà chúng ta đang sử dụng hàng ngày. Vì vậy nên hãy bỏ qua câu định nghĩa về Kiểu ở phía trên. Chúng ta sẽ tìm ra một cách khác để hiểu được khái niệm này.

## Hãy làm gì đó với các con số

Bạn có hay sử dụng máy tính bỏ túi không?

![](https://images.viblo.asia/c05686ab-48b1-4d76-90d8-5f5255361161.jpg)

Chúng ta đều biết rằng những chiếc máy tính bỏ túi là công cụ rất hữu dụng để làm việc với các con số. Bạn chỉ cần nhấn vài nút và kết quả cần tính toán sẽ xuất hiện trong một nháy mắt. Chiếc máy tính cá nhân mà bạn đang sử dụng để đọc bài viết này thậm chí còn mạnh mẽ hơn những chiếc máy tính bỏ túi cả ngàn lần. Hãy thử nhờ nó thực hiện một phép tính cộng và in kết quả ra `console` bằng JavaScript.

```smart.js
console.log(1 + 2);
// result: 3
```

Chắc chắn rồi, chúng ta có thể đưa cho nó một tác vụ phức tạp hơn một chút.

```smart.js
console.log((1 + 1) * 9 / 3 - 6);
// result: 0
```

Bạn cũng có thể dễ dàng tìm ra phần dư của một phép chia.

```smart.js
console.log(9 % 2);
// result: 1
```

JavaScript còn cung cấp cho chúng ta rất nhiều công cụ tiện ích khác nữa để làm việc với các con số; Tuy nhiên ở thời điểm hiện tại, chúng ta sẽ giữ mọi thứ đơn giản và để dành những công cụ đó cho các bài sau. Bây giờ thì chúng ta hãy thử làm gì đó khác.

## Hãy lấy một sợi dây

![](https://images.viblo.asia/595bb19c-cd0d-4300-b7d4-a1bd3b11bf46.jpg)

Ấy, từ từ đã! Cái này là do mình dịch nhầm nghĩa của từ `string` trong tài liệu mà mình đang học. :D Chính xác thì từ này còn có một ý nghĩa khác là `chuỗi ký tự`. Nhưng mà hình như hai ý nghĩa này cũng có phần liên quan. Một dây ký tự nghe có hợp lý không? :D

Bởi vì các con số không phải là tất cả mọi thứ, còn có những nhu cầu khác mà mọi người mong muốn được hỗ trợ xử lý trong việc sử dụng máy tính. Trong cuộc sống hàng ngày, hầu hết chúng ta đều sử dụng các `từ ngữ` nhiều hơn là các con số. Vì vậy nên khi chúng ta tạo ra một giải pháp phần mềm để tự động hóa một tác vụ thì chắc tới 99% là chúng ta cũng sẽ phải làm việc với các nội dung văn bản.

Bây giờ thì bạn thấy rằng chúng ta cần một cách thức để biểu thị các nội dung văn bản trong code; Để khiến cho chiếc máy tính của bạn có thể nhận biết và làm việc với các nội dung này theo kiểu logic khác so với khi làm việc với các con số. Đây chính là điểm mà khái niệm về Kiểu xuất hiện. Chúng ta có kiểu dữ liệu cơ bản đầu tiên là số `number` và kiểu tiếp theo được gọi là chuỗi `string`. Nhưng mà trong series JavaScript ở đây chúng ta có thể gọi `string` là "dây" được không? :D

Trong JavaScript, một `string` được khoanh vùng bằng cách sử dụng các dấu nháy đơn `'` hoặc các dấu nháy kép `"`.

```string.js
console.log('A string is not always used to tie something.');
```

Bạn có thể đặt một đấu `+` ở giữa 2 `string` để nối chúng lại với nhau. Do chúng ta đang làm việc với các `string` (chứ không phải `number`), máy tính của bạn sẽ xem dấu `+` là một phép ghép nối thay vì một phép cộng số học.

```string.js
console.log('20' + '23');
// result: '2023'
```

JavaScript cũng cung cấp nhiều công cụ tiện ích khác nữa hỗ trợ chúng ta làm việc với các `string` linh hoạt và thuận tiện hơn. Tuy nhiên chúng ta sẽ không mang tất cả những thứ đó tới đây bởi vì mục đích chính của bài này chỉ là gặp gỡ khái niệm về Kiểu; Và chúng ta cũng còn một khái niệm quan trọng khác nữa cần nói đến. Hãy nói thêm một chút về Kiểu trước khi chúng ta chuyển sang Biến.

## Tự động chuyển đổi kiểu

Việc lập trình trong JavaScript cũng rất linh động giống như những công việc khác trong cuộc sống hàng ngày của chúng ta. Đôi khi chúng ta có thể sử dụng bảng vẽ wacom để bày bên cạnh chiếc laptop thay vì chuột máy tính. Lý do không phải là vì 2 thứ này giống nhau mà là bởi vì chúng có ý nghĩa khá tương đồng đối với một số người dùng máy tính như mình hiện tại. Kiểu kiểu như tác vụ chủ yếu là di chuyển con trỏ chuột tới điểm này hay điểm khác trên màn hình rồi click thôi ấy mà. :D Khả năng tương tự cũng xảy ra với các Kiểu trong JavaScript. Đôi khi chúng ta có thể sử dụng `kiểu này` thay vì `kiểu kia` trong một biểu thức yêu cầu `kiểu kia`. :D

```conversion.js
console.log('Life always gives ' + 1001 + ' possibilities.');
```

Trong ví dụ phía trên, thứ mà chúng ta mong muốn là thực hiện các phép nối các `string`; Thế nhưng chúng ta đã đặt vào đó một `number` và... mọi thứ vẫn hoạt động bình thường. Đây là một tính năng thông minh của JavaScript giúp tự động chuyển đổi giá trị `number` kia thành một `string` trước khi phép nối các `string` được thực hiện.

Trong nhiều ngôn ngữ lập trình khác, việc chuyển đổi Kiểu sẽ cần được thực hiện bằng cách viết thêm các dòng code chỉ dẫn. JavaScript cũng cung cấp các công cụ hỗ trợ chuyển đổi Kiểu và chúng ta sẽ nói về chúng trong các bài viết tiếp theo.

> JavaScript linh động hơn các ngôn ngữ lập trình khác.  
> *_Một người từng học lập trình*

## Khái niệm về Biến

Hãy giả định là bạn đang xây dựng một trang blog cá nhân. Trang chủ blog của bạn sẽ hiển thị các thẻ `.entry` điều hướng tới 10 bài viết mới nhất. Mỗi thẻ này `.entry` sẽ có một đoạn trích ngắn được tạo ra từ nội dung của bài viết tương ứng và đặt trong một thẻ `.excerpt`.

Bạn quyết định tải toàn bộ nội dung của 10 bài viết tới các thẻ `.excerpt` rồi sau đó viết code JavaScript tách từ các nội dung này khoảng 320 ký tự cho mỗi trích đoạn. Và đây là các bước cần được thực hiện trong code JavaScript để tạo ra `1` trích đoạn như vậy:

- Tách lấy nội dung của một thẻ `.excerpt` từ văn bản HTML.
- Tách lấy 320 từ đầu tiên trong nội dung đó.
- Nối thêm dấu 3 chấm `...` ở cuối của nội dung trích đoạn.
- Thay nội dung đã xử lý vào lại thẻ `.excerpt`.

Do công việc xử lý nội dung lúc này được thực hiện qua nhiều bước mới đi tới kết quả được sử dụng, chúng ta sẽ cần `tạm thời lưu trữ nội dung ở đâu đó` để thực hiện biến đổi từng bước cho đến khi nội dung này đạt tới trạng thái cuối cùng. Chúng ta cần một Biến!

```variable.js
var box;
box = 'thứ gì đó';
```

Một biến trong JavaScript là một cái hộp được tạo ra bằng cách sử dụng từ khóa `var` theo sau bởi một cái tên mà chúng ta muốn sử dụng để ghi ở bên ngoài hộp cho đỡ nhầm với những chiếc khác. Để đặt một giá trị vào trong hộp thì một dấu bằng `=` được sử dụng. Phép toán này sẽ lấy `'thứ gì đó'` ở phía `bên phải` và đặt vào trong hộp có ghi tên ở phía `bên trái`. Bất cứ khi nào chúng ta muốn sử dụng giá trị đã được lưu trữ thì chỉ cần gọi tên biến là được.

```variable.js
var box = 'a cat';
console.log(box);
// result: 'a cat'
```

![](https://images.viblo.asia/fdce9cc1-0bfd-4827-9964-444ba535fa28.jpg)

Bạn có thể cùng lúc tạo ra một cái hộp và đặt thứ gì đó vào bên trong như ví dụ ở trên. Cách làm này sẽ không có gì khác biệt so với ví dụ đầu tiên. Trước đó mình đã tách câu lệnh ra để giải thích chi tiết hơn một chút thôi. :D

> Một biến chỉ đơn giản là một cái hộp mà bạn có thể đặt bất cứ thứ gì vào bên trong.  
> _Một người từng học lập trình

Ok, giờ chúng ta hãy tạo ra một cái hộp khác và thực hiện một phép biến đổi đơn giản.

```variable.js
var box = 'a cat';
var newBox = box + ' and another cat';
console.log(newBox);
// result: 'a cat and another cat'
```

![](https://images.viblo.asia/b6b1ceb0-23bf-4fe2-82fc-dfa7ebb77030.jpg)

Trong câu lệnh thứ 2 thì phép toán `=` sẽ lấy `'thứ gì đó'` ở phía bên phải để đặt vào một chiếc hộp mới `newBox` ở phía bên trái. Nhưng `thứ gì đó` ở đây lại là một biểu thức và máy tính của bạn trước hết cần thực hiện tính toán để thu được kết quả. Lúc này biến `box` được gọi để lấy ra giá trị là `'a cat'`; Và một phép nối `string` được thực hiện để thu được kết quả là ``a cat and another cat``.

Bạn cũng có thể đặt kết quả trở lại chiếc hộp cũ thay `box` vì tạo thêm hộp mới `newBox`. Tuy nhiên mình khuyến khích việc tạo ra một chiếc hộp mới như trên; Vì tên của các biến rất hữu ích trong việc mô tả các trạng thái của nội dung được lưu trữ sau mỗi pha biến đổi. Điều này sẽ giúp cho code dễ đọc hơn khi nhìn lướt qua.

Về việc đặt tên biến thì chúng ta có thể sử dụng bất kỳ cái tên nào tùy ý nhưng cũng có một số qui tắc mà chúng ta cần lưu ý ở đây:

- Tên biến có thể chứa các chữ cái, chữ số, dấu gạch chân `_`, và dấu `$`.
- Không bắt đầu tên biến bằng một chữ số.
- Tên biến có phân biệt chữ viết hoa và chữ viết thường. Cụ thể là `Box` và `box` sẽ được xem là 2 biến khác nhau.
- Không sử dụng các từ khóa mặc định của JavaScript. Bạn có thể xem danh sách các từ khóa ở đây - [**Các từ khóa của JavaScript**](https://www.w3schools.com/js/js_reserved.asp).

## Các biến `undefined` và giá trị `null`

Chúng ta đã hoàn thành xong phần chính của bài viết. Phần này chỉ là để ghi chú một vài thứ nhỏ nhặt trước khi chúng ta chuyển tới bài tiếp theo.

Nếu như một biến không được gán bất kỳ giá trị nào thì biến đó sẽ được xem là chưa được định nghĩa `undefined`. Hoặc chúng ta có thể nói là "biến này không tồn tại".

```undefined.js
var box;
console.log(box);
// result: undefined
```

Nếu như muốn tạo ra một biến và duy trì biến đó tồn tại như một chiếc hộp rỗng thì chúng ta có thể gán cho biến đó giá trị `null`. Giá trị này được coi là một giá trị vô nghĩa.

```null.js
var box = null;
console.log(box);
// result: null
```

Ok, như vậy là chúng ta đã biết 2 khái niệm cơ bản đầu tiên trong lập trình và một vài thứ phổ biến có liên quan. Hãy nghỉ giải lao một chút và tiếp tục. :D

[**[JavaScript] Bài 3: Hàm & Vùng**](https://viblo.asia/p/QpmleRQ95rd)