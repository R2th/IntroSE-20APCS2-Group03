Để bắt đầu viết code ví dụ với `jQuery`, chúng ta sẽ tận dụng `code HTML/CSS` của `dropdown` mà chúng ta đã xây dựng trong những bài viết trước của Series JavaScript. Sau khi làm quen với các công cụ mà `jQuery` cung cấp, chúng ta sẽ cập nhật luôn code JavaScript của `dropdown` để so sánh với code JavaScript đã viết trước đó. Bạn lưu ý là chúng ta cần gắn tệp `jquery.min.js` ở phía trên tệp `dropdown.js` nhé. :D

```dropdown.html
<!doctype html>
<html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
   <title>A Weird Dropdown</title>
    
   <link rel="stylesheet" href="dropdown.css">
</head>
<body>
   <div class="dropdown">
      <button class="dropdown-btn primary">
         Toggle List
      </button>
   
      <div class="dropdown-list hidden">
         <a class="dropdown-item" href="#">The rose is red</a>
         <a class="dropdown-item" href="#">The sky is sunny</a>
         <a class="dropdown-item" href="#">The river is blue</a>
         <a class="dropdown-item" href="#">The grass is green</a>
      </div>
   </div><!-- .dropdown -->
    
   <!-- copy/paste 1000 dropdown nữa -->

   <script src="https://code.jquery.com/jquery-3.6.0.min.js"
           integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
           crossorigin="anonymous">
   </script>
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
   background: RoyalBlue;
}

.dropdown-btn.primary:hover {
   background: DodgerBlue;
}

.dropdown-list {
   position: absolute;
   top: calc(100% + 3px);

   overflow: hidden;
   transition: max-height 0.5s;
}

.dropdown-list.shown {
   max-height: 390px;
}

.dropdown-list.hidden {
   max-height: 0;
}

.dropdown-item {
   display: block;
   min-width: 245px;
   max-width: 335px;
   padding: 15px 25px;

   color: White;
   background: RoyalBlue;
   border-bottom: 1px solid DodgerBlue;

   text-decoration: none;
}

.dropdown-item:hover {
   background: DodgerBlue;
}
```

```dropdown.js
var toggleTheList = function(event) {
   var theBtn = event.target;
   var theList = theBtn.nextElementSibling;

   var theListIsHidden = theList.className.includes('hidden');
   if (theListIsHidden)
      theList.className = 'dropdown-list shown';
   else
      theList.className = 'dropdown-list hidden';
};

var hideOtherLists = function(event) {
   var theBtn = event.target;
   var theList = theBtn.nextElementSibling;

   var allList = document.getElementsByClassName('dropdown-list');
   var allListArray = Array.from(allList);
   var otherLists = allListArray.filter(function(oneList) {
      return oneList != theList
   });
   
   otherLists.forEach(function(oneList) {
      oneList.className = 'dropdown-list hidden';
   });
};

/* Main function */

var toggleList = function(event) {
   toggleTheList(event);
   hideOtherLists(event);
};

/* Binding to buttons */

var btnList = document.getElementsByClassName('dropdown-btn');
var btnArray = Array.from(btnList);

btnArray.forEach(function (btn) {
   btn.onclick = toggleList;
});
```

##  Câu lệnh JavaScript đầu tiên sử dụng jQuery

Bây giờ chúng ta sẽ thử viết lại code thay thế cho phần code truy vấn tất cả các nút nhấn `.dropdown-btn` có mặt trong một trang đơn và gắn hàm xử lý sự kiện `toggleList` vào các nút nhấn.

```dropdown.js
/* Binding to buttons */

$('.dropdown-btn').click(toggleList);
```

Thật kỳ diệu, chúng ta thậm chí còn không cần phải tạo ra bất kỳ một biến nào và thao tác trở nên rất ngắn gọn. Hãy cùng phân tích câu lệnh `jQuery` đầu tiên mà chúng ta có ở đây.

Câu lệnh của chúng ta có 2 phần chính. Đầu tiên là một lời gọi hàm `$('.dropdown-btn')` trả về kết quả là một object nào đó. Ở đây hàm `$` là hàm khởi điểm để chúng ta sử dụng thư viện `jQuery`.

Ký hiệu `$` có rất nhiều ý nghĩa. Ở một nơi nào đó cách mảnh đất hình chữ `S` xa xa, nó được hiểu là một đơn vị tiền tệ và có tên gọi là gì đó. Còn ở đây nó được gọi là `jQuery` - phiên âm qua tiếng Việt yêu dấu là `dzây-que-ri` hoặc `dzi-que-ri`. Đâu đó sau này rất có thể chúng ta sẽ đọc nó là `PHP`, hay `XSLT`, hay `bash`, như nhiều lập trình viên khác. Nhưng thôi, chuyện đó còn xa lắm, bây giờ chúng ta hãy cứ đọc là `jQuery` đi. Bạn nhớ là chữ `Q` phải được viết in hoa nhé. :D

```dropdown.js
/* Binding to buttons */

var $btnList = jQuery('.dropdown-btn');
$btnList.click(toggleList);
```

Lời gọi hàm đầu tiên trả về một `object jQuery` đóng gói các phần tử `.dropdown-btn`. Với object này thì chúng ta đã có thể thực hiện các thao tác đối với các phần tử `.dropdown-btn` ví dụ như gắn các hàm xử lý cho các sự kiện khác nhau được `jQuery` lập tài liệu trong [chỉ mục `Events`](https://api.jquery.com/category/events/). Tuy nhiên thì bạn nên xem tổng quan sơ lược bằng các chỉ mục con ở thanh điều hướng bên trái thay vì xem danh sách tổng hợp.

Ở đây chúng ta cần gắn hàm xử lý sự kiện click chuột và đã gọi hàm tương ứng là `.click(toggleList)`. Lúc này, việc lặp lại thao tác gắn hàm xử lý `toggleList()` cho từng nút nhấn đã được `jQuery` tự động thực hiện. Kết quả là phần code chính của chúng ta đã trở nên ngắn gọn hơn rất nhiều. Hãy cùng xem xét chi tiết hơn về việc tạo ra một `object jQuery`.

## Tạo ra một `object jQuery`

Một `object jQuery` có thể được tạo ra bằng cách gọi hàm khởi điểm của thư viện này với giá trị được truyền vào hàm có thể là một hoặc nhiều `object Element`, hoặc một chuỗi mô tả `bộ chọn CSS`, hoặc một chuỗi mô tả `code HTML`.

```selector.js
var $document = $(document);
var $allDropdownList = $('.dropdown-list');
var $newListItem = $('<a class="dropdown-item" href="#">New item of the list</a>');
```

Chúng ta cũng có thể nhanh chóng lược bỏ những `phần tử HTML` không cần thiết trong một tập kết quả truy vấn. Ví dụ sau đây sẽ chọn ra các `.dropdown-list` đang ẩn `.hidden` bằng cách loại trừ các `.shown`.

```selector.js
var $allDropdownList = $('.dropdown-list');
var $hiddenDropdownList = $allDropdownList.not('.shown');
```

`jQuery` còn hỗ trợ rất nhiều bộ chọn khác và các bộ lọc giống như `.not()` trong ví dụ trên. Tất cả được lập tài liệu trong [**chỉ mục `Selectors`**](https://api.jquery.com/category/selectors/) của trang web. Nếu bạn xem danh sách các chỉ mục con của `Selectors` ở phía bên trái thì các chỉ mục dành cho các bộ lọc có thêm từ khóa `Filter`.

Bên cạnh đó thì chúng ta cũng có thể chuyển đối tượng làm việc, xuất phát từ một phần tử HTML bất kỳ và di chuyển tới các phần tử cha, anh chị em, con cháu, bla bla... được lập tài liệu trong [**chỉ mục `Traversing`**](https://api.jquery.com/category/traversing/).

```dropdown.js
var $body = $(document.body);
var $html = $body.parent();
var $head = $body.prev();
var $allDropdown = $body.children();
```

Ở đây các hàm `Traversing` như `parent()`, `prev()`, `children()` đều có thể nhận vào chuỗi mô tả `bộ chọn CSS` để giúp chúng ta sàng lọc tập kết quả trong trường hợp bộ chọn trước đó trả về một nhóm các phần tử.

```dropdown.js
// xuất phát từ các container `.dropdown`
var $allDropdown = $('.dropdown');
// chọn tới các phần tử con không phải là các `.dropdown-list`
$btnList = $allDropdown.children(':not(.dropdown-list)');
```

Như bạn thấy đấy, việc chọn ra các phần tử HTML mà chúng ta cần thao tác làm việc với sự hỗ trợ của `jQuery`, về cơ bản có cảm giác chung là: "Con đường nào rồi cũng sẽ dẫn tới thành Tơ-roa". Bạn chỉ cần nghĩ ra một logic chọn phù hợp và sẽ có rất nhiều hàm hỗ trợ để bạn có thể chuyển tải logic đó thành một mảnh code ngắn gọn. Bây giờ chúng ta hãy cùng nói về các thao tác cơ bản có thể áp dụng sau kết quả thu được từ các bộ chọn.

## Các thao tác cơ bản với HTML

Việc truy xuất nội dung chữ của một phần tử HTML qua biến `.textContent` của `object Element` được thay thế bằng hàm `.text()` trong `jQuery`. 

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
console.log( $firstItem.text() );
// 'The rose is red'
```

Để thay đổi nội dung của phần tử được chọn, chúng ta có thể truyền vào hàm chuỗi nội dung thay thế. Trong trường hợp này thì thao tác gọi hàm `.text(newContent)` sẽ trả về `object jQuery` thực hiện thao tác. Như vậy chúng ta sẽ có kết viết nối tiếp nhiều thao tác sau khi đã cảm thấy quen thuộc với `jQuery`.

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
var $whichItem = $firstItem.text('The grace ...');
console.log($whichItem == $firstItem);
// kết quả: true
```

Trong trường hợp làm việc với nhiều phần tử thì `jQuery` tất nhiên cũng giúp chúng ta tự động lặp thao tác thay đổi nội dung cho tất cả các phần tử được chọn.

Để làm việc với các  `thuộc tính HTML` nói chung, chúng ta sử dụng hàm `.attr()` (viết tắt của `attribute`). Để truy xuất giá trị của một thuộc tính nào đó, chúng ta cần truyền vào hàm tên của thuộc tính.

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
var url = $firstItem.attr('href');
console.log(url);
// kết quả: '#'
```

Để thay đổi giá trị của một thuộc tính, chúng ta cần truyền vào hàm `.attr()` thêm một giá trị nữa.

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
$firstItem.attr('href', 'https://viblo.asia/');
```

Các thao tác cơ bản với nội dung và các thuộc tính của các phần tử HTML được lập tài liệu trong [**chỉ mục `Manipulation`**](https://api.jquery.com/category/manipulation/) và [**chỉ mục `Attributes`**](https://api.jquery.com/category/attributes/).

Tuy nhiên đối với thuộc tính `class` nói riêng, do tần suất cần sử dụng rất nhiều nên chúng ta còn có thêm các hàm hỗ trợ làm việc trực tiếp, được liệt kê trong [**chỉ mục `CSS`**](https://api.jquery.com/category/css/).

- Để kiểm tra một phần tử có `class` nào đó hay không, chúng ta có hàm [`.hasClass()`](https://api.jquery.com/hasClass/).
- Sau đó nếu muốn thêm vào một `class` nào đó thì chúng ta có hàm [`.addClass()`](https://api.jquery.com/addClass/).
- Hoặc để xóa đi một `class` nào đó thì chúng ta có hàm [`.removeClass()`](https://api.jquery.com/removeClass/).
- Bên cạnh đó thì chúng ta có hàm [`.toggleClass()`](https://api.jquery.com/toggleClass/) để thay đổi trạng thái `có` hoặc `không` của một `class`.

## Các thao tác cơ bản với CSS

`Chỉ mục CSS` mà chúng ta đang nói tới bao gồm nhóm các hàm hỗ trợ các thao tác phổ biến để làm việc với các `thuộc tính CSS`, từ việc đo đếm giá trị đang được áp dụng bởi trình duyệt web cho đến áp dụng các giá trị khác thay thế.

Hàm tổng quan nhất là `.css()`, sẽ giúp chúng ta truy xuất giá trị đang được áp dụng của một thuộc tính CSS.

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
var bgColor = $firstItem.css('background-color');
console.log(bgColor);
// result: 'rgb(65, 105, 225)'
```

Để thiết lập giá trị áp dụng mới cho thuộc tính CSS, chúng ta cung cấp thêm giá trị này ở vị trí thứ hai khi gọi hàm `.css()`.

```dropdown.js
var $firstItem = $('.dropdown-list > a').first();
$firstItem.css('background-color', 'navy');
```

Riêng đối với thao tác làm việc với kích thước thực của các phần tử khi được trình duyệt web hiển thị thực tế. Chúng ta có các hàm hỗ trợ liên quan tới 2 từ khóa `width` và `height`. Bạn có thể tự thực hiện vài ví dụ nếu cảm thấy cần thiết cho công việc xây dựng trang blog của bạn ở thời điểm hiện tại. :D

Bộ 3 các hàm `.position()` , `.scrollTop()`, và `.scrollLeft()`, được sử dụng để xác định vị trí khung hiển thị trên dòng chảy nội dung của trang web, và thực hiện cuộn tới vị trí nhất định mà bạn muốn người dùng có thể bắt đầu xem ngay những nội dung quan trọng.

## Viết lại code JavaScript cho 1001 `dropdown`

Bây giờ thì chúng ta đã có được cái nhìn tổng quan về bộ tài liệu mà `jQuery` cung cấp, và cũng đã cảm thấy hơi quen thuộc với cú pháp của `jQuery` rồi. Bạn có thể thử viết lại code xử lý cho `dropdown` mà chúng ta đã có trước đó với sự hỗ trợ của `jQuery`. Do logic xử lý của code sẽ không có gì thay đổi, nên mình sẽ chỉ đặt code ví dụ mà mình đã viết lại ở đây và trích dẫn một vài liên kết tham khảo thôi; Vì mình tin chắc chắn là bạn có thể làm tốt hơn nữa kìa. :D

```dropdown.js
const toggleTheList = function(event) {
   var $theList = $(event.target).next();
   $theList.toggleClass('shown').toggleClass('hidden');
};

const hideOtherLists = function(event) {
   var $theList = $(event.target).next();
   var $otherLists = $('.dropdown-list').not($theList);
   $otherList.attr('class', 'dropdown-list hidden');
};

const toggleList = function(event) {
   toggleTheList(event);
   hideOtherLists(event);
};

   /* Binding to buttons */

$('.dropdown-btn').click(toggleList);
```

Các liên kết tham khảo về các phương thức đã sử dụng trong code ví dụ cho 1001 `dropdown`:

- [**Phương thức `.next()`**](https://api.jquery.com/next/)
- [**Phương thức `.toggleClass()`**](https://api.jquery.com/css/)`
- [**Phương thức `.not()`**](https://api.jquery.com/not-selector/)
- [**Phương thức `.attr()`**](https://api.jquery.com/attr/)
- [**Phương thức `.click()`**](https://api.jquery.com/click/)

[**[jQuery] Bài 3 - Các Hàm Tạo Hiệu Ứng Chuyển Tiếp & Gửi Yêu Cầu Tới Máy Chủ Web**](https://viblo.asia/p/bJzKmAXkK9N)