Chào các bạn hôm nay mình lại đến tháng đây :grinning::grinning::grinning:
Đợt này mình có tham gia vài cái serminar thấy có rất nhiều nội dung hay và muốn chia sẻ cho mọi người.

Như mọi người đã biết ai mà đã đã code đến js thì cũng đều biết đến jquery 1 thư viện khá là nổi tiếng tầm 3-4 năm trước,  nhưng đến bây giờ nó đã ít được sử dụng đến bởi vì có những framework client mới nổi lên như vuejs, reactjs ...
nhưng số star hay số lượt tải những  thư viện này so với thời hoàng kim của jquery thì vẫn còn kém xa =))

Dưới đây là số lượt đánh giá qua từng nằm của các thư viện

![](https://images.viblo.asia/33906908-0221-44ee-b149-669c7fe4a24d.png)

Hiện tại những dự án mới họ ít sử dụng jquery nhưng ở những dự án maintain mình chắc chắn mọi người vẫn phải đụng đến jquery, jquery sử dụng rất dễ và đơn giản. nhưng sử dụng như thế nào cho hợp lý, code 1 cách clear nhất thì không phải ai cũng biết,

Thôi nói mở đầu dài dòng quá, chúng ta bắt đầu luôn nhé.

# jQuery ready event
Khi mọi người làm việc với jquery thì chắc ai cũng đã làm việc với 
**$(document).ready(**)  **và window.onload** rồi đúng không, cơ bản là 2 thằng này nó đều chạy khi DOM tree đã được load xong nhưng **window.onload** sẽ cover lâu hơn 1 tý là nó chờ DOM tree chạy xong rồi image, js, css nghĩa là khi trình duyệt đã load xong mọi thứ  thì thằng này nó mới chạy, tuỳ theo với yêu cầu của bài toán thì mọi người dùng cái nào cho hợp lý là được, 
Bình thường mn hay code như thế này đúng không

```js
$("document").ready(function () {
  // The DOM is ready!
  // The rest of the code goes here
});

```
Hoặc cách viết ngắn hơn thì sẽ là
```js
$(function () {
  // The DOM is ready!
  // The rest of the code goes here
});

```

Rồi mình có 1 câu hỏi

*Cách làm như vậy có ổn không?*

> Câu trả lời là: “Khá” ổn
> 
> Nếu bạn biết chắc chắn môi trường nơi mà code của bạn sẽ được thực thi
> 
> Nếu bạn không quan tâm tới hiệu năng khi tải trang
> 
> Nếu bạn không quan tâm tới “[best practices](https://toidicodedao.com/2018/07/10/hoc-best-practice-programming/)”
>

Vậy, cách tốt hơn là gì???

```js
// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {
  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function () {
    // The DOM is ready!
  });
  // The rest of the code goes here!
}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter

```
Với cách viết này code của bạn sẽ clear hơn rất là nhiều, (Ví dụ như trang của bạn đang sử dụng jquery version 1.0.1 mà ai đó import version 1.0.2 vào thì đoạn code
```js
$(function () {
  // The DOM is ready!
  // The rest of the code goes here
});
```
của bạn có nguy cơ bị lỗi rất cao vì lúc này biến $ nó sẽ không hiểu đang là của version nào, nhưng với đoạn code mới, bạn có thể define version bạn muốn sử dụng trong các hàm của mình bằng cách truyền vào thôi
```js
// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {
  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $(function () {
    // The DOM is ready!
  });
  // The rest of the code goes here!
}(window.jQuery1.0.2, window, document));
// The global jQuery object is passed as a parameter

```
)

# DOM manipulation

Làm việc với jquery thì chắc chắn sẽ phải sử dụng đếm DOM đúng không, chúng ta thường thấy rất nhiều những đoạn như này trong dự án
```js
// Set's an element's title attribute using it's current text
$(".container input#elem").attr("title", $(".container input#elem").text());

// Set's an element's text color to red
$(".container input#elem").css("color", "red");

// Makes the element fade out
$(".container input#elem").fadeOut();

```
Mình lại có 1 câu hỏi

> Cách làm như vậy có ổn không?
> 
> Câu trả lời là: “Khá” ổn
> 
> Nếu bạn muốn code của mình được lặp lại
> 
> Nếu bạn không quan tâm tới hiệu năng
> 
> Nếu bạn không quan tâm tới “best practices”

Cách viết tốt hơn là

```js
// Set's an element's title attribute using it's current text
$("#elem").attr("title", $("#elem").text());

// Set's an element's text color to red
$("#elem").css("color", "red");

// Makes the element fade out
$("#elem").fadeOut();
```
Vì id chỉ là duy nhất nên khi gọi đến element đấy mình chỉ cần gọi đến id thôi, không cần gọi đến những element parent của nó

 hoặc cách tối ưu nhất là lưu các selector vào các biến
 
 ```js
 // Stores the live DOM element inside of a variable
var elem = $("#elem");

// Set's an element's title attribute using it's current text
elem.attr("title", elem.text());

// Set's an element's text color to red
elem.css("color", "red");

// Makes the element fade out
elem.fadeOut();

 ```
 
 hoặc cách tối ưu hơn nữa là  Lưu các selector vào các biến 
 ```js
 // Stores the live DOM element inside of a variable
var elem = $("#elem");

// Chaining
elem.attr("title", elem.text()).css("color", "red").fadeOut();
 ```
 
 với những cách này sẽ giảm bớt việc truy cập DOM, tăng khả performance  cho trang web của bạn :+1::grinning:
 
 Hay chúng ta cũng hay thấy đoạn này nữa
 ```js
 // Dynamically building an unordered list from an array
var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"];
var list = $("ul.people");

$.each(localArr, function (index, value) {
  list.append("<li id=" + index + ">" + value + "</li>");
});

 ```
mình lại có một câu hỏi =))

> Cách làm như vậy có ổn không?
> 
> Câu trả lời là: “Khá” ổn
> 
> Nếu bạn muốn lặp lại việc thêm mới các DOM vào DOM
> 
> Nếu bạn thích có một web app nặng nề
> 
> Nếu bạn không quan tâm tới “best practices”

với cách trên thì sau mỗi li DOM lại được cập nhật 1 lần, thế có 1 nghìn thẻ li thì phải cập nhật DOM 1 nghìn lần đúng không, khá là tù nhỉ
Cách tốt nhất là chỉ cập nhật DOM 1 lần thôi 
```js
// Dynamically building an unordered list from an array
var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"];
var list = $("ul.people");
var dynamicItems = "";

$.each(localArr, function (index, value) {
  dynamicItems += "<li id=" + index + ">" + value + "</li>";
});

list.append(dynamicItems);

```
Lúc này khi biến dynamicItems đã có dữ liệu rồi thì việc cập nhật DOM chỉ cần 1 lần duy nhất

# Event handling

 Phần xử lý sự kiện này mình cũng gặp khá là nhiều đúng không
 
 ```js
 $("#longlist li").on("mouseenter", function () {
  $(this).text("Click me!");
});

$("#longlist li").on("click", function () {
  $(this).text("Why did you click me?!");
});
 ```
 Cách làm như vậy có ổn không?
 
> Câu trả lời là: “Khá” ổn
> 
> Nếu bạn muốn sử dụng một lượng  lớn RAM để xử lý các sự kiện DOM
> 
> Nếu bạn không có quá nhiều DOM
> 
> Nếu bạn không quan tâm tới “best practices”
> 

Khi code kiểu này nếu như 1 thẻ li được bọc ở bên ngoài thẻ ul (thẻ này cũng add 1 event) thẻ ul lại được bọc bằng 1 thẻ div (thẻ này cũng có event) như thế khi click vào thẻ li thì mình cũng gọi luôn cả 3 sự kiện kia nữa đúng ko, quả là không đáng tý nào

\
Cách tốt hơn là gì? - DRY(Don't Repeat Yourself)
```js
var listItems = $("#longlist li");
listItems.on({
  "mouseenter": function () {
    $(this).text("Click me!");
  },
  "click": function () {
    $(this).text("Why did you click me?!");
  }
});

```
hay cách tốt hơn nữa là
```js
var list = $("#longlist");

list.on("mouseenter", "li", function () {
  $(this).text("Click me!");
});

list.on("click", "li", function () {
  $(this).text("Why did you click me?!");
});

```
# AJAX

Phần này ai mà biết đến jquery thì không thể nào không động đến thằng này , Chúng ta có thể thấy những đoạn code như thế này trong rất nhiều dự án.

```js
function getName(personId) {
  var dynamicData = {};
  dynamicData["id"] = personId;
  $.ajax({
    url: "getName.php",
    type: "get",
    data: dynamicData,
    success: function (data) {
      // Updates the UI based the ajax result
      $(".person-name").text(data.name);
    }
  });
}
getName("2342342");
```
> 
> Cách làm như vậy có ổn không?
> 
> Câu trả lời là: “Khá” ổn
> 
> Nếu bạn thích code không linh hoạt :)
> 
> Nếu bạn không lo lắng tới việc có quá nhiều ajax request
> 
> Nếu bạn không quan tâm tới “best practices”

Với cách làm như trên thì mỗi lần bạn call ajax với những ID khác nhau bạn lại phải tạo đúng 1 function getName khác để sử lý cái data trả về đúng không, như thế ko ổn tý nào, có 1 nghìn hàm chẳng nhẽ code 1 nghìn lần.

Cách tốt nhất - Sử dụng jQuery Promise

```js
function getName(personID) {
  var dynamicData = {};
  dynamicData["id"] = personID;
  return $.ajax({
    url: "getName.php",
    type: "get",
    data: dynamicData
  });
}
getName("2342342").done(function (data) {
  // Updates the UI based the ajax result
  $(".person-name").text(data.name);
});
```
Lúc này phần done sẽ là function callback mà ajax trả về, có thể dùng done, sussess, error thoải mái nhé.

Các tốt hơn là mình tùy biến ID, type, url, data mình truyền vào

```js
function getName($url, $type, $params) {
  return $.ajax({
    url: $url,
    type: $type,
    data:  $params
  });
}

getName("getName.php", "get", "12121212").done(function (data) {
  // Updates the UI based the ajax result
  $(".person-name").text(data.name);
});
```
với cách code này bạn có thể dùng đi dùng lại nhiều lần được đúng không

# Kết luận

ok bài của mình hôm nay đến đây thôi, đây là những thứ mình cũng được học hỏi lại từ những người kinh nghiệm hơn mình mong có thể giúp đỡ được mọi người trong lúc làm dự án 

Tham khảo: Serminar Team IronMan (G2-Sun*)