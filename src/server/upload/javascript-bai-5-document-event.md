Trong bài viết này, chúng ta sẽ cùng nói về một object dựng sẵn, hỗ trợ các thao tác chỉnh sửa cấu trúc văn bản HTML và các thuộc tính CSS. Đồng thời, chúng ta cũng sẽ tìm hiểu cách để khiến một thành phần trong trang web có thể tương tác với người dùng. Hãy bắt đầu với object `document`.

## Object document

Do `object` này đã được khởi tạo sẵn, chúng ta sẽ không cần phải quan tâm đến việc nó đã được tạo ra như thế nào; Và mục đích của chúng ta ở đây chỉ đơn giản là khám phá cách sử dụng nó để chỉnh sửa cấu trúc văn bản HTML và các thuộc tính CSS. Trước khi thảo luận, bạn có thể xem lướt qua liên kết tham khảo liệt kê các thành phần được đóng gói trong `object` này tại đây: [Tài liệu về object `document`](https://www.w3schools.com/jsref/dom_obj_document.asp).

Nói riêng về tác vụ chỉnh sửa cấu trúc văn bản HTML, object `document` cung cấp cho chúng ta một vài khả năng sau đây:

1. Tìm kiếm và chỉnh sửa các phần tử HTML nhất định.
2. Tạo ra các phần tử mới và thay đổi cấu trúc của văn bản HTML.
3. Gắn các hàm xử lý sự kiện (các hành động) vào các thành phần tương tác với người dùng.

Song song với việc tìm hiểu về object `document`, chúng ta sẽ áp dụng một vài tính năng của object này để tạo ra một danh sách dạng sổ xuống `dropdown`; Vì vậy nên mình đã chuẩn bị code HTML và CSS ở đây, và chúng ta có thể bắt đầu ngay với phần thảo luận về code JavaScript.

```dropdown.html
<!doctype html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>Một cái dropdown kỳ lạ :D</title>
      <link rel="stylesheet" href="dropdown.css">
   </head>
   
   <body>
      <div class="dropdown">
         <button id="btn-show" class="dropdown-btn primary">
            Show List &#9662;
         </button>
         <button id="btn-hide" class="dropdown-btn secondary">
            Hide List &#9652;
         </button>

         <div id="the-list" class="dropdown-list shown">
            <a class="dropdown-item" href="#">The rose is red</a>
            <a class="dropdown-item" href="#">The sky is sunny</a>
            <a class="dropdown-item" href="#">The river is blue</a>
            <a class="dropdown-item" href="#">The grass is green</a>
         </div>
      </div><!-- .dropdown -->

      <script src="dropdown.js"></script>
   </body>
</html>
```

```dropdown.css
.dropdown {
   font-family: Arial, sans-serif;
   font-size: 16px;

   display: inline-block;
   position: relative;
}

.dropdown-btn {
   font-size: 14px;
   font-weight: bold;
   letter-spacing: 1px;

   padding: 15px 30px;

   color: White;
   border: none;
   cursor: pointer;
}

.dropdown-btn.primary {
   background: royalblue;
}

.dropdown-btn.primary:hover {
   background: dodgerblue;
}

.dropdown-btn.secondary {
   background: darkgray;
}

.dropdown-btn.secondary:hover {
   background: lightgray;
}

.dropdown-list {
   position: absolute;
   top: 108%;

   overflow: hidden;
   transition: max-height 0.5s linear;
}

.dropdown-list.shown {
   max-height: 420px;
}

.dropdown-list.hidden {
   max-height: 0;
}

 .dropdown-item {
   display: block;
   min-width: 245px;
   max-width: 335px;
   padding: 15px 25px;

   color: white;
   background: royalblue;
   border-bottom: 1px solid dodgerblue;

   text-decoration: none;
}

 .dropdown-item:hover {
   background: dodgerblue;
}
```

Và đây là kết quả mà chúng ta dự kiến:

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/ZEvWyWO)

Bạn có thể nhận thấy là `dropdown` này có hơi kỳ lạ một chút. Thông thường thì một `dropdown` chỉ có 1 nút nhấn nhưng `dropdown` mà chúng ta đang xây dựng ở đây lại có 2 nút nhấn. Chúng ta sẽ nói về điểm kỳ lạ này ở phần cuối bài. À mà bạn đừng nhìn vào code JS trên CodePen nhé. Chúng ta sẽ tiến hành viết code xử lý từ đầu; Công việc này khá đơn giản và sẽ không tốn nhiều thời gian đâu. :D

## 1. Tìm kiếm & Chỉnh sửa các phần tử

Object `document` thực ra là một bản mô phỏng phần tử gốc của văn bản HTML được tạo ra bởi cặp thẻ `<html></html>`. Tất cả các phần tử xếp chồng bên trong cũng được mô phỏng lại bởi các `object` tương ứng và đóng gói trong object `document` với cấu trúc xếp chồng giống với cấu trúc trong văn bản HTML. Hãy thử lấy ra 2 phần tử con của `<html>` là `<head>` và `<body>`.

```dropdown.js
var head = document.head;
console.log(head);
// một object mô phỏng phần tử <head>

var body = document.body;
console.log(body);
// một object mô phỏng phần tử <body>
```

Các object như `head`, `body`, và các phần tử khác, được tạo ra từ một class cơ sở được lập tài liệu trong liên kết tham khảo sau: [object `Element`](https://www.w3schools.com/jsref/dom_obj_all.asp).

Xuất phát từ một phần tử bất kỳ, chúng ta có thể truy xuất tới phần tử cha, anh chị em, và con cháu của phần tử đó như thế này.

```dropdown.js
var body = document.body;
// xuất phát từ <body>

var html = body.parentElement;
// phần tử cha là <html>

var head = body.previousSiblingElement;
// anh chị là <head>

var dropdown = body.firstElementChild;
// con đầu là <div class="dropdown">

var script = body.lastElementChild;
// con út là <script>
```

Việc di chuyển giữa các phần tử xếp chồng bằng cách truy xuất qua các biến tham chiếu như trên sẽ hơi bất tiện một chút nếu như chúng ta muốn chọn tới một phần tử được xếp chồng khá sâu trong kiến trúc HTML. Vì vậy nên có cung cấp một cách làm khác - đó là chúng ta có thực hiện tìm kiếm bằng các hàm đóng gói trong `document`. Dưới đây là cách tìm kiếm một phần tử bằng `id`.

```dropdown.js
var theList = document.getElementById('the-list');
console.log(theList);
// phần tử khởi tạo danh sách trong `dropdown`
```

Bây giờ thì chúng ta đã biết cách tìm kiếm các phần tử đặc định. Hãy thử thay đổi nội dung văn bản của một phần tử nào đó. Từ tài liệu về `class Element` thì chúng ta có tên biến mô phỏng nội dung bên trong các phần tử là `textContent`.

```dropdown.js
var theList = document.getElementById('the-list');
var firstItem = theList.firstElementChild;

console.log( firstItem.textContent );
// 'The rose is red'

firstItem.textContent = 'The flower is dancing';
// Thay thế nội dung mới vào `textContent`
```

Việc truy xuất và chỉnh sửa giá trị của các thuộc tính HTML cũng có thể được thực hiện với cách thức tương tự. Chúng ta chỉ cần tìm tên các biến liên quan được liệt kê trong tài liệu về `class Element` hoặc `console.log` phần tử mà chúng ta đang làm việc để xem tên của các biến được đóng gói. Trong ví dụ dưới đây, biến `className` được sử dụng để tham chiếu tới thuộc tính `class` của `#the-list`.

```dropdown.js
var theList = document.getElementById('the-list');

console.log( theList.className );
// 'dropdown-list shown'

theList.className = 'dropdown-list hidden';
// thay đổi class để ẩn danh sách
```

Bằng việc thay đổi qua lại giữa 2 class CSS `.shown` và `.hidden` - chúng ta có thể thay đổi trạng thái hiển thị của danh sách `#the-list`. Như vậy là chúng ta đã biết cách để ẩn đi danh sách sổ xuống của `dropdown`; Tiếp theo chúng ta cần tìm hiểu cách thức gắn các thao tác xử lý này vào các nút nhấn để `dropdown` có thể hoạt động.

## 3. Xử lý các sự kiện để tương tác với người dùng

Khi một click chuột được thực hiện trên một nút nhấn, trình duyệt web sẽ phát động một sự kiện `event` và kích hoạt các hàm xử lý sự kiện (nếu có). Để gắn một hàm xử lý sự kiện vào một phần tử, cách đơn giản nhất là lưu thao tác đó vào biến `onclick` của phần tử đó.

```dropdown.js
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * #btn-show
 */
 
var btnShow = document.getElementById('btn-show');

var showList = function(event) {
   var theList = document.getElementById('the-list');
   theList.className = 'dropdown-list shown';
};

btnShow.onclick = showList;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * #btn-hide
 */
 
var btnHide = document.getElementById('btn-hide');

var hideList = function(event) {
   var theList = document.getElementById('the-list');
   theList.className = 'dropdown-list hidden';
};

btnHide.onclick = hideList;
```

Các phần tử HTML có thể tiếp nhận nhiều kiểu sự kiện khác nhau như:
- Các sự kiện tạo ra bởi thao tác sử dụng chuột máy tính.
- Các sự kiện tạo ra bởi thao tác sử dụng bàn phím.
- Các sự kiện tạo ra bởi đáp ứng của trình duyệt web.
- Các sự kiện tự định nghĩa của người viết code.

Bạn có thể tự làm các ví dụ dùng thử các kiểu sự kiện khác được liệt kê trong liên kết tham khảo sau: [Các kiểu sự kiện trong môi trường trình duyệt web](https://www.w3schools.com/jsref/dom_obj_event.asp).

Nói về biến `event` được khai báo nhưng chưa được sử dụng tới trong các hàm `showList` và `hideList` ví dụ ở trên; Khi một sự kiện được phát động, trình duyệt web sẽ tạo ra một `object` để mô tả sự kiện này và truyền vào các hàm xử lý sự kiện. Object `event` này cung cấp nhiều thông tin hữu dụng trong một vài tình huống. Bạn có thể `console.log` để biết thêm về nó hoặc sử dụng liên kết thao khảo sau: [Object `Event`](https://www.w3schools.com/jsref/obj_events.asp).

Trường hợp ứng dụng phổ biến nhất của object `event` là để xác định phần tử đích `target` trực tiếp nhận sự kiện; Hoặc để xác định phím được nhấn khi làm việc với các sự kiện tạo ra bởi thao tác người dùng sử dụng bàn phím.

## 4. Khởi tạo các phần tử mới & Chỉnh sửa cấu trúc văn bản HTML

Có thể bạn cũng để ý và thấy rằng danh sách của `dropdown` trong kết quả hiển thị có nhiều hơn một vài phần tử so với code HTML. Các phần tử này được tạo ra bằng cách sử dụng JavaScript. Hãy cùng viết một hàm thực hiện công việc này. Chúng ta sẽ sử dụng tên hàm là `addNewItem` nhận vào nội dung văn bản của phần tử mới qua biến `text`. Công việc thực hiện bên trong `addNewItem` bao gồm 2 thao tác là:

- Tạo ra một object `Element` mô phỏng phần tử mới với nội dung được truyền vào qua `text`.
- Gắn `object` mới được tạo ra vào văn bản HTML, đứng sau phần tử cuối cùng mà danh sách `#the-list` đang có.

```dropdown.js
/* ... */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * new List-Item
 */

var createNewItem = function(text) {
   var newItem = document.createElement('a');
   newItem.textContent = text;
   newItem.href = '#';
   return newItem;
};

var displayNewItem = function(newItem) {
   var theList = document.getElementById('the-list');
   theList.appendChild(newItem);
};

var addNewItem = function(text) {
   var newItem = createNewItem(text);
   displayNewItem(newItem);
};

addNewItem('The emptiness ...');
addNewItem('The grace ...');
addNewItem('The gratitude ...');
```

Thao tác đầu tiên bên trong hàm `addNewItem` là tạo ra một object `Element` mô phỏng phần tử mới của `dropdown` bằng cách gọi hàm `createNewItem` được định nghĩa phía trên và lưu vào biến `newItem`.

Nội dung `text` được truyền vào `addNewItem` tiếp tục được sử dụng để truyền vào `createNewItem` và chèn vào trong `object` mô tả phần tử mới. Lúc này bên trong hàm `createNewItem` thì một `object` mới mô tả một phần tử `<a href="#">` được tạo ra bằng cách gọi hàm [`createElement`](https://www.w3schools.com/jsref/met_document_createelement.asp) đóng gói trong `document`. Hàm `createElement` như trong tài liệu tham khảo yêu cầu đầu vào là một `string` mô tả tên của thẻ muốn tạo ra. Các thao tác gắn nội dung chữ cho phần tử `<a>` và chỉnh sửa thuộc tính `href` đều được thực hiện bằng việc sử dụng các biến liên quan. Sau đó `object` mô tả phần tử mới được trả về vị trí hàm `createNewItem` được gọi trong phần code định nghĩa hàm `addNewItem`.

Thao tác thứ hai bên trong hàm `addNewItem` là hiển thị phần tử mới trong văn bản HTML được thực hiện bằng cách gọi hàm hỗ trợ `displayNewItem` được định nghĩa bên dưới. Phần tử mới được truyền vào hàm `displayNewItem`. Lúc này câu lệnh đầu tiên bên trong hàm `displayNewItem` sẽ truy xuất `object` phần tử mô phỏng container của danh sách sổ xuống `#the-list` và lưu vào biến `theList`. Sau đó chúng ta đã gọi hàm [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp) đóng gói trong Element `#the-list` để gắn phần tử mới vào vị trí cuối cùng trong danh sách.

Như vậy là chúng ta đã biết cách thực hiện các thao tác: `chỉnh sửa` một phần tử, `bổ sung` thêm một phần tử mới; Và có thể là bạn cũng muốn tìm hiểu thêm cách để `xóa` một phần tử nữa. Để thực hiện thao tác này thì đầu tiên bạn sẽ cần truy xuất được chính xác phần tử muốn xóa; Sau đó gọi hàm [removeChild](https://www.w3schools.com/jsref/met_node_removechild.asp) của Element `#the-list`. 

Nghe chừng cũng rất đơn giản phải không? :D Vậy bạn hãy dành thời gian tự viết code thử nghiệm nhé. :D

Các liên kết tham khảo:

- [document.createElement(tagName)](https://www.w3schools.com/jsref/met_document_createelement.asp)
- [element.appendChild(anElement)](https://www.w3schools.com/jsref/met_node_appendchild.asp)
- [element.removeChild(anElement)](https://www.w3schools.com/jsref/met_node_removechild.asp)

## Nói về điểm kỳ lạ của dropdown này

Như vậy là chúng ta đã thực hiện xong phần nội dung chính của bài viết về `document` và `event`. Ở đây chúng ta sẽ thảo luận một chút về điểm kỳ lạ của `dropdown` mà chúng ta đã xây dựng.

Thông thường thì một `dropdown` sẽ chỉ có một nút nhấn duy nhất để đảm nhiệm cả 2 tác vụ: Hiển thị & Ẩn danh sách. Điều đó có nghĩa là chúng ta chỉ có thể có một hàm duy nhất để xử lý sự kiện click chuột của người dùng. Và như vậy thì logic hoạt động của hàm xử lý lúc này cần phải có khả năng thay đổi để đáp ứng dựa trên trạng thái hiện tại của danh sách `#the-list` là đang ẩn hay đang hiện.

Với tất cả những công cụ đã được gặp từ bài viết đầu tiên về JavaScript, chúng ta thực sự không có cách nào để viết được một hàm xử lý như vậy. Đó là lý do vì sao chúng ta đã phải cân nhắc việc xây dựng một `dropdown` kỳ lạ với 2 nút nhấn.

Khả năng thay đổi cách thức hoạt động hoạt động của một hàm có thể trở nên khả thi với một chút sự giúp đỡ từ một bộ công cụ mới: Một kiểu có tên gọi là `boolean` & Một cú pháp điều kiện cho phép chúng ta sử dụng các giá trị `boolean` để quyết định thay đổi cách thức hoạt động của một đoạn code tùy theo hoàn cảnh.

Trong bài viết tiếp theo, chúng ta sẽ nói về bộ công cụ mới này và sử dụng nó để bình thường hóa cái `dropdown` mà chúng ta đang có ở đây với một nút nhấn đơn. Hãy nghỉ giải lao một chút. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[JavaScript] Bài 6 - Boolean & Switching](https://viblo.asia/p/javascript-bai-6-boolean-switching-924lJRY6lPM)