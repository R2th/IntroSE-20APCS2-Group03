Bài viết này là một bài độc lập trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m), nhằm mục đích tổng hợp code `dropdown` đã được xây dựng qua các bài viết thuộc `Sub-Series JavaScript`. Ở đây, chúng ta sẽ viết code để tạo ra những chiếc nút nhấn gắn kèm theo danh sách sổ xuống `dropdown`, có thể được sử dụng trong các thanh điều hướng `navbar` của những trang web có nhiều danh mục nội dung.

[Và đây là kết quả dự kiến](https://codepen.io/semiarthanoi/full/zYpZEpR)

## Chuẩn bị code HTML cho 1001 dropdown

Ở thời điểm hiện tại, viết code HTML để tạo ra một `dropdown` thì hiển nhiên không phải là chuyện lớn đối với chúng ta nữa. Một `dropdown` về cơ bản chỉ có 2 thành phần chính là - 1 nút nhấn và 1 danh sách liên kết. Tuy nhiên chúng ta sẽ sử dụng code HTML này cho 1001 `dropdown` trong trường hợp cần thiết, vì vậy nên chúng ta cần suy nghĩ thêm một chút tới CSS và JavaScript khi viết code HTML.

Do chưa biết trước số lượng `dropdown` có thể được sử dụng trong một trang web đơn bất kỳ, chúng ta sẽ không sử dụng tới các `id` bởi vì thuộc tính này biểu thị sự đặc biệt, duy nhất, không lặp lại. Như vậy các tác vụ xử lý trong CSS và JavaScript chúng ta sẽ quyết định là thực hiện thông qua các class. Và code HTML của chúng ta sẽ có dạng như sau:

```dropdown.html
<div class="dropdown">
   <button class="dropdown-button">
      Toggle List
   </button>

   <div class="dropdown-list left hidden">
      <a class="dropdown-item" href="#">The rose is red</a>
      <a class="dropdown-item" href="#">The sky is sunny</a>
      <a class="dropdown-item" href="#">The river is blue</a>
      <a class="dropdown-item" href="#">The grass is green</a>
      <a class="dropdown-item" href="#">The emptiness ...</a>
      <a class="dropdown-item" href="#">The grace ...</a>
   </div>
</div><!-- .dropdown -->

<!-- copy/paste thêm 1000 dropdown nữa ở đây :D -->
```

Ở đây chúng ta có các `class` đại diện cho các thành phần chính của `dropdown` là -

- `.dropdown` - container tổng bộ của `dropdown`.
- `.dropdown-button` - nút nhấn mở/đóng danh sách.
- `.dropdown-list` - danh sách sổ xuống.
- `.dropdown-item` - các thành phần được liệt kê trong danh sách sổ xuống.

Nói riêng về danh sách sổ xuống `.dropdown-list`, chúng ta cần biểu thị 2 vị trí hiển thị của danh sách này tương ứng với 2 trường hợp - khi `dropdown` được đặt ở gần phía bên trái màn hình, và khi `dropdown` được đặt ở gần phía bên phải màn hình -

- `.left` - danh sách `.dropdown-list` được hiển thị thẳng hàng với cạnh trái của nút nhấn `.dropdown-button`.
- `.right` - danh sách `.dropdown-list` được hiển thị thẳng hàng với cạnh phải của nút nhấn `.dropdown-button`.

Ngoài ra, chúng ta cũng cần biểu thị các trạng thái `ẩn/hiện` (mở rộng/thu gọn) của danh sách này. Ở đây chúng ta có thể mặc định 1 trong 2 trạng thái và tạo thêm một `class` bổ trợ để mô tả trạng thái còn lại. Tuy nhiên nếu như vậy thì sau 1 năm nữa chúng ta nhìn vào bề mặt code HTML khi không có `class` bổ trợ, chúng ta sẽ không biết trạng thái mặc định của `.dropdown-list` là `ẩn` hay `hiện` cho đến khi mở tệp CSS và mò cho tới đoạn code của `class` bổ trợ ở đâu đó trong một dòng chảy code CSS dài như bất tận. :D

Do đó ở đây chúng ta sẽ quyết định là sử dụng 2 `class` bổ trợ để mô tả rõ ràng 2 trạng thái của danh sách `.dropdown-list` ngay trên bề mặt của code HTML -

- `.hidden` - danh sách `.dropdown-list` đang ẩn.
- `.shown` - danh sách `.dropdown-list` đang hiện đầy đủ.

## Viết code CSS cho 1001 dropdown

Sau khi đã có code HTML thì công việc tiếp theo của chúng ta là dàn chỉnh các thành phần của `dropdown` để có được phong cách hiển thị rõ ràng và đem lại trải nghiệm sử dụng tốt lành cho người dùng. Khởi đầu vẫn sẽ là thiết lập cơ bản để `reset` một số thuộc tính liên quan tới kích thước mặc định của các phần tử - giúp chúng ta chắc chắn rằng kết quả hiển thị trên các trình duyệt web khác nhau đều sẽ đem lại trải nghiệm người dùng đồng bộ.

```dropdown.css
   /* Reset CSS */

* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}
```

Nội dung chính mà người dùng quan tâm tới vẫn là `chữ`. Do đó chúng ta sẽ thiết lập các thuộc tính liên quan tới nội dung trước khi thực hiện các tác vụ khác như lên màu, thiết lập kích thước, và canh chỉnh vị trí cho các thành phần. Ở đây chúng ta sẽ sử dụng kích thước `font` tối thiểu để có trải nghiệm đọc dễ chịu là `16px`; Các nút nhấn `.dropdown-button` sẽ có phần chữ bên trong được in đậm để nổi bật trên thanh điều hướng và tương phản tốt hơn với các liên kết trong danh sách sổ xuống; Các liên kết `.dropdown-item` trong danh sách `.dropdown-list` sẽ được hiển thị mà không có phần gạch chân chữ.

```dropdown.css
   /* Typography */

.dropdown-button,
.dropdown-item {
   font-family: Arial, sans-serif;
   font-size: 16px;
}

.dropdown-button {
   font-weight: bold;
   letter-spacing: 1px;
}

.dropdown-item {
   text-decoration: none;
}
```

Công việc quan trọng tiếp theo là chỉ định màu sắc cho các thành phần để chúng ta có thể dễ dàng quan sát các thao tác thiết lập kích thước ở bước kế tiếp. Đồng thời tạo ra phong cách hiển thị đồng bộ và dễ nhìn cho `dropdown`. Ở đây chúng ta sẽ sử dụng màu nền có sắc tố đầy đủ cho các thành phần nên sẽ nghịch đảo lại màu chữ so với mặc định. Do các giá trị màu được sử dụng lại nhiều lần, chúng ta sẽ sử dụng các biến để lưu lại. Như vậy chúng ta sẽ có tone màu chính `--color-accent`, tone màu hiệu ứng trỏ chuột `--color-hover`, và màu chữ `--color-text`. Sau khi đã thiết lập xong màu sắc thì chúng ta sẽ thấy là cần phải bỏ đi phần viền của các nút nhấn để có kết quả hiển thị `tone-sur-tone` hơn với danh sách sổ xuống.

```dropdown.css
   /* Colors & Borders */

body {
   --color-accent: royalblue;
   --color-hover: dodgerblue;
   --color-text: white;
}

.dropdown-button,
.dropdown-item {
   color: var(--color-text);
   background: var(--color-accent);
}

.dropdown-button:hover,
.dropdown-item:hover {
   background: var(--color-hover);
}

.dropdown-button {
   border: none;
}

.dropdown-item {
   border-bottom: 1px solid var(--color-hover);
}
```

Bây giờ thì chúng ta đã có thể quan sát được kích thước hiển thị của các thành phần trong `dropdown`. Việc thiết lập kích thước của các thành phần đã có thể được thực hiện dễ dàng hơn. Ở đây mặc dù các thẻ `<button>` đều mặc định là các khối `inline-block`, tuy nhiên chúng ta vẫn nên chỉ định lại trong code CSS để tránh ràng buộc cấu trúc HTML. Kích thước của danh sách sổ xuống nên được thiết lập bởi các liên kết `.dropdown-item` trong danh sách để đảm bảo phong cách hiển thị đồng bộ giữa các liên kết. Do đó `container` của danh sách sổ xuống là `.dropdown-list` nên được hiển thị với độ rộng linh động bao quanh các liên kết như một khối `inline-block`. Bên cạnh đó thì các liên kết cần được hiển thị theo cột dọc và chúng ta sẽ thiết lập đơn giản thành các khối `block`.

Ngoài việc sử dụng `padding` để tạo kích thước linh động cho các thành phần bao quanh nội dung chữ, chúng ta cũng nên quan tâm tới các trường hợp đặc biệt khi nội dung chữ quá ngắn hay quá dài. Đối với các nút nhấn thì chúng ta sẽ chỉ quan tâm tới trường hợp nội dung chữ quá ngắn và container không đủ rộng để người dùng dễ dàng thao tác chạm trên màn hình cảm ứng.

```dropdown.css
   /* Sizing */

.dropdown-button {
   display: inline-block;
   padding: 15px 30px;
   min-width: 42px;
   cursor: pointer;
}

.dropdown-list {
   display: inline-block;
}

.dropdown-item {
   display: block;
   min-width: 245px;
   max-width: 345px;
   padding: 15px 25px;
}
```

Công việc tiếp theo là canh chỉnh vị trí của danh sách `.dropdown-list` tương quan với nút nhấn `.dropdown-button`. Theo phương dọc thì chúng ta sẽ cần đảm bảo là danh sách `.dropdown-list` sẽ ở ngay sát phía dưới nút nhấn `.dropdown-button` và có thể tách ra một vài `px` tùy ý. Tuy nhiên theo phương ngang thì chúng ta có 2 trường hợp - đó là khi `dropdown` được đặt ở gần cạnh trái của màn hình `.left`, và khi `dropdown` được đặt ở gần cạnh phải của màn hình `.right`.

```dropdown.css
   /* Positioning */

.dropdown {
   display: inline-block;
   position: relative;
}

.dropdown-list {
   position: absolute;
   top: calc(100% + 3px);
}

.dropdown-list.left {
   right: auto;
   left: 0;
}

.dropdown-list.right {
   right: 0;
   left: auto;
}
```

Công việc cuối cùng là code biểu thị các trạng thái `ẩn/hiện` (thu gọn/mở rộng) của danh sách `.dropdown-list`. Ở đây chúng ta cũng có thể chọn một hiệu ứng chuyển tiếp và một thuộc tính tương ứng để `ẩn/hiển` danh sách.

```dropdown.css
   /* States & Transitions */

.dropdown-list {
   overflow: hidden;
   transition: max-height 0.45s;
}

.dropdown-list.hidden {
   max-height: 0;
}

.dropdown-list.shown {
   max-height: 420px;
}
```

## Code JavaScript cho 1001 dropdown

Công việc viết code xử lý sự kiện khi người dùng click vào các nút nhấn `.dropdown-button` trong JavaScript cũng sẽ được thực hiện theo nhóm tương tự như CSS. Khi người dùng nhấn vào một nút nhấn `.dropdown-button`, chúng ta cần thực hiện 2 thao tác xử lý đó là -

- `toggleTheList` - tìm và thay đổi trạng thái hiển thị của `.dropdown-list` tương ứng.
- `hideOtherShownList` - nếu đang có `.dropdown-list` nào đó khác đang hiện thì chúng ta sẽ cần phải tìm ra và ẩn đi.

Như vậy đầu tiên chúng ta cần thiết lập phần khung code với 2 hàm xử lý sự kiện và lặp thao tác gắn 2 hàm này cho nhóm `.dropdown-button`.

```dropdown.js
   /* Event Listeners */

const toggleTheList = function(event) {};
const hideOtherShownLists = function(event) {};

   /* Binding Lísteners */

const buttonList = document.getElementsByClassName('dropdown-button');
const buttonArray = Array.from(buttonList);

const bindListeners = function(button) {
   button.addEventListener('click', toggleTheList);
   button.addEventListener('click', hideOtherShownLists);
};

buttonArray.forEach(bindListeners);
```

Tổng quan tác vụ của hàm xử lý sự kiện đầu tiên `toggleTheList` có thể được chia làm 2 tác vụ phụ -

1. `findTheList` - tìm ra danh sách `theList` biểu thị cho `.dropdown-list` tương ứng với nút nhấn vừa nhận click chuột.
2. `toggleVisibility` - thay đổi trạng thái hiển thị của danh sách `theList`.

Và đối với hàm xử lý sự kiện thứ hai `hideOtherShownLists` chúng ta cũng sẽ chia thành 2 tác vụ phụ tương tự -

1. `findOtherShownLists` - tìm ra tất cả các danh sách `.dropdown-list` khác đang hiện.
2. `toggleVisibility` - thay đổi trạng thái hiển thị của các danh sách tìm thấy.

Ở đây để hàm thực hiện tác vụ phụ `toggleVisibility` có thể hoạt động tốt trong cả 2 trường hợp - với 1 phần tử, và với 1 mảng các phần tử - thì chúng ta sẽ mặc định là hàm này sẽ yêu cầu truyền vào một mảng chứa các phần tử. Trong quá trình chạy thực tế thì mảng truyền vào có thể chứa `0`, `1`, hoặc `nhiều` phần tử tùy theo kết quả tìm kiếm của bước trước đó.

```dropdown.js
   /* Event Listeners */

const toggleTheList = function(event) {
   var theList = findTheList(event);
   toggleVisibility( [theList] );
};

const hideOtherShownLists = function(event) {
   var otherShownListArray = findOtherShownLists(event);
   toggleVisibility(otherShownListArray);
};
```

Bây giờ chúng ta cần viết code chi tiết cho 3 hàm thực hiện tác phụ phụ -

- `findTheList` - tìm nút nhấn nhận click `theButton` đang là mục tiêu `target` của sự kiện `event`.
- `findOtherShownLists` - tìm tất cả các danh sách đang hiện `allShownListArray`, sau đó loại trừ đi danh sách `theList` tương ứng với nút nhấn đang nhận click.
- `toggleVisibility` - định nghĩa thao tác `toggleVisibilityClasses` thay đổi các `class` để ẩn đi 1 danh sách bất kỳ `oneList`, sau đó lặp thao tác này trên mảng danh sách truyền vào `arrayOfList` .

```dropdown.js
   /* Subsequent Tasks */

const findTheList = function(event) {
   var theButton = event.target;
   var theList = theButton.nextElementSibling;
   // ---
   return theList
};

const findOtherShownLists = function(event) {
   var theList = findTheList(event);
   // ---
   var allShownLists = document.querySelectorAll('.dropdown-list.shown');
   var allShownListArray = Array.from(allShownLists);
   var otherShownListArray = allShownListArray.filter((oneList) => (oneList != theList));
   // ---
   return otherShownListArray
};

const toggleVisibility = function(arrayOfList) {
   // ---
   var toggleVisibilityClasses = function(oneList) {
      elementTogglesClass(oneList, 'shown');
      elementTogglesClass(oneList, 'hidden');
   };
   // ---
   arrayOfList.forEach((oneList) => toggleVisibilityClasses(oneList));
};
```

Phần còn lại là viết các hàm tiện ích để hỗ trợ làm việc với các `class`.

```dropdown.js
   /* Utility Functions */

const elementHasClass = function(element, theClass) {
   return element.className.includes(theClass);
};

const elementAddsClass = function (element, theClass) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.concat(theClass);
   element.className = newClassArray.join(' ');
};

const elementRemovesClass = function(element, theClass) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.filter((oneClass) => (oneClass != theClass));
   element.className = newClassArray.join(' ');
};

const elementTogglesClass = function(element, theClass) {
   if (elementHasClass(element, theClass))
      elementRemovesClass(element, theClass);
   else
      elementAddsClass(element, theClass);
};
```

## Tổng kết code cho 1001 dropdown

Xin chúc mừng. Bạn đã hoàn thành công việc viết code cho 1001 `dropdown` đơn giản. Tuy không phải là một tác vụ quá khó khăn, nhưng đây thực sự cũng là một công việc nghiêm túc. Chúc bạn có thêm nhiều hơn nữa tinh thần dành cho công việc và học tập kiến thức mới. Hẹn gặp lại bạn trong những bài viết khác của [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m). :D

```dropdown.html
<div class="dropdown">
   <button class="dropdown-button">
      Toggle List
   </button>

   <div class="dropdown-list left hidden">
      <a class="dropdown-item" href="#">The rose is red</a>
      <a class="dropdown-item" href="#">The sky is sunny</a>
      <a class="dropdown-item" href="#">The river is blue</a>
      <a class="dropdown-item" href="#">The grass is green</a>
      <a class="dropdown-item" href="#">The emptiness ...</a>
      <a class="dropdown-item" href="#">The grace ...</a>
   </div>
</div><!-- .dropdown -->

<!-- copy/paste thêm 1000 dropdown nữa ở đây :D -->
```

```dropdown.css
   /* Reset CSS */

* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

   /* Typography */

.dropdown-button,
.dropdown-item {
   font-family: Arial, sans-serif;
   font-size: 16px;
}

.dropdown-button {
   font-weight: bold;
   letter-spacing: 1px;
}

.dropdown-item {
   text-decoration: none;
}

   /* Colors & Borders */

body {
   --color-accent: royalblue;
   --color-hover: dodgerblue;
   --color-text: white;
}

.dropdown-button,
.dropdown-item {
   color: var(--color-text);
   background: var(--color-accent);
}

.dropdown-button:hover,
.dropdown-item:hover {
   background: var(--color-hover);
}

.dropdown-button {
   border: none;
}

.dropdown-item {
   border-bottom: 1px solid var(--color-hover);
}

   /* Sizing */

.dropdown-button {
   display: inline-block;
   padding: 15px 30px;
   min-width: 42px;
   cursor: pointer;
}

.dropdown-list {
   display: inline-block;
}

.dropdown-item {
   display: block;
   min-width: 245px;
   max-width: 345px;
   padding: 15px 25px;
}

   /* Positioning */

.dropdown {
   display: inline-block;
   position: relative;
}

.dropdown-list {
   position: absolute;
   top: calc(100% + 3px);
}

.dropdown-list.left {
   right: auto;
   left: 0;
}

.dropdown-list.right {
   right: 0;
   left: auto;
}

   /* States & Transitions */

.dropdown-list {
   overflow: hidden;
   transition: max-height 0.45s;
}

.dropdown-list.hidden {
   max-height: 0;
}

.dropdown-list.shown {
   max-height: 420px;
}
```

```dropdown.js
   /* Utility Functions */

const elementHasClass = function(element, theClass) {
   return element.className.includes(theClass);
};

const elementAddsClass = function (element, theClass) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.concat(theClass);
   element.className = newClassArray.join(' ');
};

const elementRemovesClass = function(element, theClass) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.filter((oneClass) => (oneClass != theClass));
   element.className = newClassArray.join(' ');
};

const elementTogglesClass = function(element, theClass) {
   if (elementHasClass(element, theClass))
      elementRemovesClass(element, theClass);
   else
      elementAddsClass(element, theClass);
};

   /* Subsequent Tasks */

const findTheList = function(event) {
   var theButton = event.target;
   var theList = theButton.nextElementSibling;
   // ---
   return theList
};

const findOtherShownLists = function(event) {
   var theList = findTheList(event);
   // ---
   var allShownLists = document.querySelectorAll('.dropdown-list.shown');
   var allShownListArray = Array.from(allShownLists);
   var otherShownListArray = allShownListArray.filter((oneList) => (oneList != theList));
   // ---
   return otherShownListArray
};

const toggleVisibility = function(arrayOfList) {
   // ---
   var toggleVisibilityClasses = function(oneList) {
      elementTogglesClass(oneList, 'shown');
      elementTogglesClass(oneList, 'hidden');
   };
   // ---
   arrayOfList.forEach((oneList) => toggleVisibilityClasses(oneList));
};

   /* Event Listeners */

const toggleTheList = function(event) {
   var theList = findTheList(event);
   toggleVisibility( [theList] );
};

const hideOtherShownLists = function(event) {
   var otherShownListArray = findOtherShownLists(event);
   toggleVisibility(otherShownListArray);
};

   /* Binding Lísteners */

const buttonList = document.getElementsByClassName('dropdown-button');
const buttonArray = Array.from(buttonList);

const bindListeners = function(button) {
   button.addEventListener('click', toggleTheList);
   button.addEventListener('click', hideOtherShownLists);
};

buttonArray.forEach(bindListeners);
```