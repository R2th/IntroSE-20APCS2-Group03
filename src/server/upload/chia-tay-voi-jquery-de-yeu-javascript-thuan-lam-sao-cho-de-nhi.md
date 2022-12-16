## Chào các bạn,

Người ta thường bảo *"Hãy yêu lập trình viên bởi họ rất chung tình"*, nhưng đấy là trong cuộc sống tình trường mà thôi! :rofl:

Đối với mình, một lập trình viên phải mang tiếng "gã trai tồi đào hoa" trong chính công việc của mình. Ta không thể cứ yêu mãi một cách code, một framework, một thư viện, một design pattern... và ở đâu cũng muốn gắn bản thân với chúng được. Thậm chí đôi khi, ta cần phải có một cái đầu lạnh để thay đổi liên tục cách ta thực hiện công việc của mình nhằm có thể đạt được sự "viên mãn" và đưa mọi thứ "lên đỉnh" theo cách tinh tế, thông minh nhất... :stuck_out_tongue_closed_eyes: 

Quay lại với tựa đề bài viết, mình tin Jquery vẫn là một thư viện tốt và hữu dụng trong thực tế. Song, với sự phát triển nhanh chóng của các trình duyệt hiện đại đang dần hỗ trợ mạnh mẽ ES6, cùng với đó là tốc độ phát triển vô cùng nhanh của Javascript, Jquery dần để lộ ra nhiều yếu điểm của chính nó: xa rời với các frameworks React - Vue - Angular, đi sau so với tốc độ phát triển của Javascript, mất công cài đặt thêm trong các dự án, xuất hiện nhiều lỗi,... Mình cá là sẽ có nhiều bạn đồng tình với mình về vụ này, bạn có thể tìm kiếm thử trên Stackoverflow, kết quả ta nhận được về các vấn đề liên quan tới Jquery lên tới trên con số **1 triệu**. :sweat_smile:

Liệu mình đã lay động được trái tim của các bạn để bỏ Jquery và tiến tới Javascript thuần chưa nhỉ? :stuck_out_tongue_closed_eyes: Nếu bạn vẫn e ngại không biết nên "chia tay" Jquery, và "tán đổ" cô nàng Javascipt như nào thật nhanh - *Fuckboi chính hiệu* - thì hãy cùng mình xem qua các tình huống dưới đây nhé. :sunglasses:

# 1. Lựa chọn các thành phần
Đây chắc hẳn là công việc cơ bản và quan trọng nhất trong Jquery khi ta cần thao tác với DOM. Tương đương với `$()` hay `jQuery()` chính là 2 hàm [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) và [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). Ta có thể dễ dàng code như sau nha:

```js
// jQuery, chọn toàn bộ dối tượng '.box'
$(".box");

// Thay vào đó, chọn đối tượng '.box' đầu tiên
document.querySelector(".box");

// ... hoặc chọn toàn bộ đối tượng '.box'
document.querySelectorAll(".box");
```

# 2. Thực hiện chức năng trên toàn bộ thành phần được chọn
`querySelectorAll()` trả cho chúng ta một mảng các [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList). Khác với jQuery ta chỉ cần đơn giản gọi hàm qua đối tượng jQuery, với Javascript ta sẽ cần phải duyệt qua toàn bộ mảng NodeList được lấy ra với [NodeList.foreach()](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach). Thôi không sao, "tán gái" cũng có lúc khó mà :rofl:

```js
// Với jQuery
// Ẩn toàn bộ đối tượng '.box'
$(".box").hide();

// Với Javascript
// Duyệt qua từng thằng '.box' và gán thuộc tính cho nó để ẩn nó đi
document.querySelectorAll(".box").forEach(box => { box.style.display = "none" })
```

# 3. Tìm một thành phần bên trong thành phần khác
jQuery cung cấp cho chúng ta hàm `find()` để có thể tìm kiếm thành phần nào đó bên trong 1 thằng khác. Cá nhân mình với tình huống này thì mình thích Javascript hơn, vì đơn giản là ta vẫn sử dụng lại hàm `querySelector()` và `querySelectorAll()` để thực hiện lấy ra thành phần ta muốn.

```js
// Với jQuery
// Lấy ra thằng '.box' đầu tiên trong '.container'
var container = $(".container");
// ...ta sẽ cần làm như này tiếp
container.find(".box");

// Với Javascript
// Lấy ra thằng '.box' đầu tiên trong '.container'
var container = document.querySelector(".container");
// ...ta cũng sẽ cần làm như này tiếp
container.querySelector(".box");
```

# 4. Duyệt cây DOM với một số tình huống thông dụng
Sẽ có nhiều khi bạn cần nhanh chóng duyệt được thành phần trước, kế tiếp hoặc cha của một thành phần có sẵn. jQuery có các hàm quen thuộc là `parent()`, `next()` và `prev()`. Chẳng hề kém cạnh, Javascript cũng cho chúng ta trực tiếp 3 thuộc tính của 1 thành phần, đó là `parentElement`, `nextElementSibling` và `previousElementSibling`. Xời, tưởng gì :sunglasses:

```js
// Với jQuery
// Trả về thành phần kế tiếp, trước đó và cha của '.box'
$(".box").next();
$(".box").prev();
$(".box").parent();

// Với Javascript
// Trả về thành phần kế tiếp, trước đó và cha của '.box'
var box = document.querySelector(".box");
box.nextElementSibling;
box.previousElementSibling;
box.parentElement;
```

# 5. Làm việc với các sự kiện
jQuery có cả tá các hàm để đính một sự kiện cụ thể vào thành phần của chúng ta. Còn với JS, hãy xem sức mạnh của hàm `addEventListener()` nhé:

```js
// Với jQuery
$(".button").click(function(e) { /* xử lý sự kiện 'click' */ });
$(".button").mouseenter(function(e) {  /* xử lý sự kiện 'mouseenter' */ });
$(document).keyup(function(e) {  /* xử lý sự kiện 'keyup' */  });

// Với Javascript
document.querySelector(".button").addEventListener("click", (e) => { /* ... */ });
document.querySelector(".button").addEventListener("mouseenter", (e) => { /* ... */ });
document.addEventListener("keyup", (e) => { /* ... */ });
```

# 6. Thêm sự kiện cần lắng nghe vào thành phần
Hàm `on()` trong jQuery là cách ta thêm các sự kiện động vào thành phần của mình, một lần với tình huống này, ta sẽ lại gặp hàm `addEventListener()` quen thuộc của "cô nàng" Javascipt. :heart_eyes:

```js
// Với jQuery
// Xử lý sự kiện 'click' của '.search-result elements', 
// ngay cả khi chúng được thêm động vào cây DOM
$(".search-container").on("click", ".search-result", handleClick);

// Với Javascript
// Tạo một thành phần mới và thêm vào cây DOM
var searchElement = document.createElement("div");
document.querySelector(".search-container").appendChild(searchElement);
// Thêm sự kiện vào trong thành phần mới đó
searchElement.addEventListener("click", handleClick);
```

# 7. Kích hoạt hoặc khởi chạy sự kiện
Tương đương với hàm `trigger` của jQuery và hàm [`dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) từ phía JS, hàm này có thể được gọi ở bất cứ thành phần nào và sẽ nhận đầu vào là một đối tượng `Event`. Vụ này có vẻ hơi "căng" à nha  :sweat_smile:

```js
// Với jQuery
// Khởi chạy 'myEvent' cho đối tượng document và '.box'
$(document).trigger("myEvent");
$(".box").trigger("myEvent");

// Với Javascript
// Tạo và kích hoạt sự kiện 'myEvent'
document.dispatchEvent(new Event("myEvent"));
document.querySelector(".box").dispatchEvent(new Event("myEvent"));
```

# 8. Styling cho thành phần
Mình đã thử tìm từ "styling" trong tiếng Việt và thấy nó thật củ chuối... :sweat_smile:

Để style thành phần, tương tự với hàm `css` trong jQuery là thuộc tính [`.style`](https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style) trong JS

```js
// Với jQuery
// Chọn tất cả '.box' và chuyển màu chữ sang #000
$(".box").css("color", "#000");

// Với Javascript
// Chọn '.box' đầu tiên và chuyển màu chữ sang #000
document.querySelector(".box").style.color = "#000";
```

Ngoài ra, đối với hàm `css()` ta có thể truyền một đối tượng chứa các thuộc tính cần style. Trong khi đó để thực hiện style nhiều thuộc tính trong Javascript, ta cần thay đổi từng thuộc tính còn của `.style` trong thành phần đó.

```js
// Với jQuery
// Truyền nhiều styles
$(".box").css({
  "color": "#000",
  "background-color": "red"
});

// với Javascript
// Đổi màu chữ sang #000 và màu nền thành đỏ
var box = document.querySelector(".box");
box.style.color = "#000";
box.style.backgroundColor = "red";

// Hoặc ta cũng có thể style nhiều thuộc tính bằng cách sau
box.style.cssText = "color: #000; background-color: red";
```

# 9. Sự kiện Document ready
Có rất nhiều khi ta cần thực thi sự kiện khi toàn bộ trang/DOM đã được tải xong, đối với jQuery ta đơn giản sử dụng hàm `$(document).ready()` hoặc ta có thể ngắn gọn hơn với đối tượng `$()`. Đối với Javascript, ta sẽ cần một chút công sức để viết ra một hàm thực thi việc này, cơ mà không sao, chỉ là một chút khó khăn nữa khi "tán gái" thui đúng không anh em :rofl:

```js
// Với jQuery
$(document).ready(function() { 
  /* Làm gì đó khi DOM đã được tải hết */
});

// Với Javascript
// Định nghĩa một phương thức tiện ích để thực hiện
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Làm gì đó khi DOM đã được tải hết */
});
```

# 10. Làm việc với CSS Classes
Để thao tác với CSS Classes trong Javascript, ta sẽ cần thông qua thuộc tính [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) của thành phần 

```js
// Với jQuery
// Thêm, xóa, hoặc bật tắt class 'focus' cho thành phần '.box'
$(".box").addClass("focus");
$(".box").removeClass("focus");
$(".box").toggleClass("focus");

// Với Javascript
// Thêm, xóa, hoặc bật tắt class 'focus' cho thành phần '.box'
var box = document.querySelector(".box");
box.classList.add("focus");
box.classList.remove("focus");
box.classList.toggle("focus");
```

Ta cũng có thể thực thi với hàng loạt classes như sau

```js
// Thêm class "focus" và "highlighted", rồi xóa chúng đi
var box = document.querySelector(".box");
box.classList.add("focus", "highlighted");
box.classList.remove("focus", "highlighted");
```

Hay thậm chí thay đổi class, Javascript quả thực chẳng thiếu gì đâu nhé! :sunglasses:
```
// Xóa class "focus" và thay bằng class "blurred"
document.querySelector(".box").classList.replace("focus", "blurred");
```

# 11. Kiểm tra thành phần có class hay không?
Chà, theo mình thấy thì quả thực jQuery đúng là ngắn gọn hơn JS nhiều, bảo sao nhiều người ưa thích nó. Nhưng mà mất khoản này thì ta được nhiều khoản khác thôi nha. :stuck_out_tongue_closed_eyes:

jQuery thì có sẵn hàm `hasClass()` trong khi với Javascript, ta sẽ cần mất công hơn một chút: 

```js
// Với jQuery
// Kiểm tra nếu thành phần '.box' có chứa class 'focus'
if ($(".box").hasClass("focus")) {
  // Làm gì đóoooooo...
}

// Without jQuery
// Kiểm tra nếu thành phần '.box' có chứa class 'focus'
if (document.querySelector(".box").classList.contains("focus")) {
  // Cũng làm gì đóoooooo...
}
```

# 12. Gọi các HTTP Requests
Đây chắc chắn là một chức năng vô cùng quan trọng trong bất cứ dự án Front-end nào. Có thể các bạn đã quá thân quen với jQuery AJAX, nhưng đừng lo, với Javascript chúng ta đã có [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) vô cùng mạnh mẽ và dễ dàng sử dụng. Fetch sẽ trả cho chúng ta 1 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) để ta có thể xử lý kết quả thật nhanh gọn. Đừng lo nữa nha những anh em, đồng chí của tôi... :rofl:

```js
// Với jQuery
$.ajax({
    url: "data.json"
  }).done(function(data) {
    // ...
  }).fail(function() {
    // Xử lý lỗi
  });

// Với Javascript
fetch("data.json")
  .then(data => {
    // Xử lý dữ liệu
  }).catch(error => {
    // Xử lý lỗi
  });
```

# 13. Cập nhật DOM
Đơn giản nhất là thay đổi nội dung chữ bên trong thành phần, nhưng các bạn cẩn thận khi thực hiện việc này nhé, vì Hacker có thể lợi dụng nó để thực hiện tấn công XSS đó :scream:. Nhưng yên tâm, nếu bạn muốn giải quyết vấn đề này, hãy thử đọc thêm [tại đây](https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/) nhé!

Ta có thể dễ dàng cập nhật nội dung trong DOM với cô nàng JS bằng cách sử dụng thuộc tính [`.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

```js
// Với jQuery
// Cập nhật nội dung văn bản bên trong '.button'
$(".button").text("New text");
// Đọc nội dung văn bản trong '.button'
$(".button").text(); // Trả về "New text"

// Với Javascript
// Cập nhật nội dung văn bản bên trong '.button'
document.querySelector(".button").textContent = "New text";
// Đọc nội dung văn bản trong '.button'
document.querySelector(".button").textContent; // Trả về "New text"
```

Nâng cao hơn, đó chính là việc thay đổi các thành phần bên trong thành phần đã có. Ta sẽ thực hiện như sau:

```js
// Tạo thành phần 'div' và thêm nó vào trong '.container'
$(".container").append($("<div/>"));

// Tạo thành phần 'div' và thêm nó vào trong '.container'
var element = document.createElement("div");
document.querySelector(".container").appendChild(element);
```

Gộp lại thì ta sẽ có một cái ví dụ "full topping" như sau ạ: :sunglasses:

```js
// Tạo thẻ 'div'
var element = document.createElement("div");

// Cập nhật class cho nó
element.classList.add("box");

// Đặt nội dung văn bản bên trong
element.textContent = "Text inside box";

// Thêm nó vào trong '.container'
document.querySelector(".container").appendChild(element);
```

## Vẫn là chào các bạn, nhưng chào tạm biệt :rofl:
Thế là mình đã chỉ cho các bạn **13 bí kíp "tán đổ cô nàng" Javascript**... Còn giờ mình sẽ cho bạn thời gian suy ngẫm xem bạn có dám mạnh mẽ nói lời "chia tay" với jQuery hay không nhé! :laughing:

Mình rất mong mình đã mang cho các bạn những kiến thức hay, cảm ơn các bạn đã đọc tới dòng cuối cùng của bài viết này, mình rất trân trọng tình cảm của mọi người dành cho mình. Chào tạm biệt các bạn và hẹn gặp lại trong những bài viết sau nhé! Peaceeeee... :heart_eyes:

---
[Nguồn tham khảo](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/)