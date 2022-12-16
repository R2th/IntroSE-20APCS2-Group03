Sự kiện và actions xảy ra trong hệ thống bạn đang lập trình, cái mà hệ thống nói cho bạn biết để bạn có thể response với nó trong 1 vài cách nếu bạn mong muốn. Ví dụ nếu bạn người dùng click 1 button trên trang web, bạn có thể muốn response 1 hành động để hiển thị thông tin gì đó.

Mỗi sự kiện khả dụng có 1 **event handler**, cái là 1 khối code (thường sẽ là JavaScript function do bạn tạo ra) sẽ chạy khi sự kiện kích hoạt. Chú ý rằng đôi khi nó được gọi là **event listeners** - chúng có thể hoán đổi cho nhau vì mục đích của chúng tôi, mặc dù nói đúng ra, chúng hoạt động cùng nhau.

> Note: Web events are not part of the core JavaScript language — they are defined as part of the APIs built into the browser.

# 1. Ways of using web events
Có 1 vài cách để chúng ta thêm event listener code vào trang web. Trong phần này, chúng ta review 1 vài cách và thảo luận xem chúng ta nên dùng cách nào.

## 1.1. Event handler properties

CÓ rất nhiều properties tồn tại chứa event handler code chúng ta có thể gặp thường xuyên:
```js
const btn = document.querySelector('button');

btn.onclick = function() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```
Thuộc tính onclick như trên là một ví dụ, ngoài ra nó còn rất nhiều các thuộc tính khác.

* `btn.onfocus` and `btn.onblur` — The color changes when the button is focused and unfocused; try pressing tab to focus on the button and press tab again to focus away from the button. These are often used to display information about how to fill in form fields when they are focused, or display an error message if a form field has just been filled in with an incorrect value.
* `btn.ondblclick` — The color changes only when the button is double-clicked.
* `window.onkeypress, window.onkeydown, window.onkeyup` — The color changes when a key is pressed on the keyboard. The keypress event refers to a general press (button down and then up), while keydown and keyup refer to just the key down and key up parts of the keystroke, respectively. Note that it doesn't work if you try to register this event handler on the button itself — we've had to register it on the window object, which represents the entire browser window.
* `btn.onmouseover` and `btn.onmouseout` — The color changes when the mouse pointer is moved so it begins hovering over the button, or when pointer stops hovering over the button and moves off of it, respectively.

Có 1 vài sự kiện rất phổ biến và khả dụng cho bất kì element nào (ví dụ `onclik` handler có thể đăng kí gần như với bất kì element), tuy nhiên có 1 vài thuộc tính đặt biệt chỉ hữu ích với tình huống nhất định (ví dụ `onplay` chỉ khả dụng với các thẻ nhất định, như `<video>`)

## 1.2. Inline event handlers — don't use these
Bạn cũng có thể thấy mẫu code như thế này trong code của bạn:
```js
<button onclick="bgChange()">Press me</button>

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```
Hoặc thêm trực tiếp code JavaScript vào trong thuộc tính như ví dụ:
```js
<button onclick="alert('Hello, this is my old-fashioned event handler!');">Press me</button>

```
Bạn có thể tìm nhiều thuộc tính HTML tương đương cho nhiều event handler properties, tuy nhiên bạn không nên sử dụng nó - nó là một **bad practice**. Nó thực sự khó để quản lý code và không hiệu quả.

Với 1 người bắt đầu, không nên trộn lẫn file HTML với JS của bạn làm 1 vì nó rất khó phân tích cú pháp, để tất cả các file JS của bạn ở 1 chỗ khác sẽ tốt hơn, bạn có thể áp dụng mỗi file JS với nhiều file HTML khác nhau.

Kể cả khi để chúng trong 1 file, inline event handlers cũng không phải là 1 ý tưởng tốt. Một button thì OK, nhưng chuyện gì xảy ra nếu có 100 buttons, bạn sẽ phải thêm 100 thuộc tính vào file, lúc đó bảo trì code sẽ trở thành 1 cơn ác mộng. Với JS, bạn có thể thêm 1 hàm event handler với tất cả các button trong trang web không vấn đề bao nhiêu lần bằng cách sử dụng như sau:
```js
const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = bgChange;
}
```
Hay một tùy chọn khác sử dụng `forEach` built-in method có sẵn của NodeList objects:
```js
buttons.forEach(function(button) {
  button.onclick = bgChange;
});
```

## 1.3. `addEventListener()` and `removeEventListener()`
Loại mới nhất của chế event được định nghĩa trong đối tượng [DOM level 2](https://www.w3.org/TR/DOM-Level-2-Events/) cái mà cung cấp trình duyệt với 1 hàm mới ` addEventListener()`. Hàm này là 1 cách tương tự event handler properties nhưng cú pháp có đôi chút khác biệt
```js
const btn = document.querySelector('button');

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}   

btn.addEventListener('click', bgChange);
```

Trong hàm `addEventListener()` function, có 2 tham số, tên sự kiện chúng ta muốn đăng kí và đoạn code bao gồm handler function chúng ta muốn chạy để phản hồi lại sự kiện. Chú ý rằng hoàn toàn có thể đặt toàn bộ code trong hàm `addEventListener()` như 1 hàm vô danh như sau:
```js
btn.addEventListener('click', function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
});
```
Cơ chế này có 1 vài lợi ích so với 2 cơ chế trước đó. Đầu tiên là nó có 1 hàm đối tác `removeEventListener()` cái mà sẽ xóa listener trước đó đã được thêm. Ví dụ sau sẽ xóa listener được thêm ở trên:
```js
btn.removeEventListener('click', bgChange);
```
Điều này không có ý nghĩa lắm đối với các chương trình nhỏ, nhưng đối với chương trình lớn hơn, phức tạp hơn có có thể cực kì hiệu quả để dọn dẹp event handlers không sử dụng. Ngoài ra, ví dụ, điều này cho phép bạn có cùng một button thực hiện các hành động khác nhau trong các trường hợp khác nhau - tất cả những gì bạn phải làm là thêm hoặc xóa các event handlers.

Thứ 2, bạn cũng có thể đăng kí nhiều handlers cho listener giống nhau. Hai handlers dưới đây không thể được áp dụng:
```js
myElement.onclick = functionA;
myElement.onclick = functionB;
```
Dòng thứ 2 đã overwrites giá trị onclick được set bởi dòng đầu. Lúc đó bạn cần
```js
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```
Khi đó cả 2 hàm đều được thực thi khi element được click.

Ngoài ra nó còn nhiều lợi ích khác thông qua các tùy chọn của sự kiện, bạn có thể tìm hiểu thêm tại trang chủ của nó.

## 1.4. What mechanism should I use?

Trong cả 3 cơ chế, bạn không nên sử dụng HTML event handler attributes, nó đã outdated, và là 1 bad practice như đã đề cập ở trên.

Hai cái còn lại tương đối có thể thay thế cho nhau, ít nhất là cho những mục đích đơn giản:
* **Event handler properties** ít sức mạnh và tùy chọn hơn nhưng nó lại có khả năng tương thích với trình duyệt (hỗ trợ trình duyệt IE8). Bạn nên bắt đầu với cơ chế này nếu bạn đang học JS.
* **DOM Level 2 Events (addEventListener(), etc.)** có nhiều sức mạnh hơn nhưng cũng phức tạp và không phải tương thích với nhiều trình duyệt (hỗ trỡ IE9). Bạn nên sử dụng khi bạn đã có kinh nghiệm.

Lợi ích chính của cơ chế thứ 3 là bạn có thể xóa event handler code nếu cần, sử dụng `removeEventListener()` và thêm nhiều listeners với 1 sự kiện cho element nếu yêu cầu. Ví dụ bạn có thể gọi `addEventListener('click', function() {...})` trên 1 element nhiều lần với nhiều hàm khác nhau trong đối số thứ 2. Nó là điều không thể với event handler properties vì một vài việc gán trong các lần tiếp theo sẽ ghi đè lần trước đó, ví dụ:
```js
element.onclick = function1;
element.onclick = function2;
etc.
```

> Note: Nếu bạn được yêu cầu hỗ trợ các trình duyệt cũ hơn Internet Explorer 8 trong công việc của mình, bạn có thể gặp khó khăn, vì các trình duyệt cổ này sử dụng các mô hình sự kiện khác nhau từ các trình duyệt mới hơn. Nhưng không bao giờ sợ hãi, hầu hết các thư viện JavaScript (ví dụ jQuery) đều có các hàm dựng sẵn giúp loại bỏ sự khác biệt giữa các trình duyệt. Đừng lo lắng về điều này quá nhiều ở giai đoạn này trong hành trình học tập của bạn. 

# 2. Other event concepts

## 2.1. Event objects
Đôi khi chúng ta truyền vào hàm xử lý event một đối tượng với tên đại loại như `event`, `evt` hay đơn giản chỉ là `e`. Nó được gọi là event object và nó tự động truyền vào hàm xử lý sự kiện để thêm các chức năng và thông tin. Ví dụ:
```js
function bgChange(e) {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}  

btn.addEventListener('click', bgChange);
```
Bạn có thể xem fullcode tại https://github.com/mdn/learning-area/blob/master/javascript/building-blocks/events/random-color-eventobject.html

> Note: You can use any name you like for the event object — you just need to choose a name that you can then use to reference it inside the event handler function.` e/evt/event` are most commonly used by developers because they are short and easy to remember. It's always good to be consistent — with yourself, and with others if possible.

## 2.2. Event bubbling and capture
Chủ đề cuối cùng chúng tôi muốn nói là thứ mà bạn có thể không gặp thường xuyên nhưng nó có thể thực sự dễ gây bug cho bạn nếu bạn không hiểu.**Event bubbling** and **capture** và 2 cơ chế mô tả cái diễn ra khi 2 hàm xử lý cho 1 sự kiện thông nhau được kích hoạt trong 1 element. Xem ví dụ sau để hiểu nó:

Ví dụ cực kì đơn giản shows và hides 1 `<div>` với `<video>` bên trong:
```js
<button>Display video</button>

<div class="hidden">
  <video>
    <source src="rabbit320.mp4" type="video/mp4">
    <source src="rabbit320.webm" type="video/webm">
    <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
  </video>
</div>
```
Khi bạn click `<button>`, video sẽ hiểu thị bằng cách thay đổi thuộc tính class trong `<div>` từ hidden thành showing:
```js
btn.onclick = function() {
  videoBox.setAttribute('class', 'showing');
}
```
Sau đó có 2 thêm sự kiện onclick event handlers - 1 cho `<div>` và cái thứ 2 cho `<video>`. Ý tưởng là khi khu vực `<div>` ngoài video được click, box này sẽ ẩn lại, còn khi video click, video sẽ bắt đầu chạy:
```js
videoBox.onclick = function() {
  videoBox.setAttribute('class', 'hidden');
};

video.onclick = function() {
  video.play();
};
```
Nhưng mà lại có 1 vấn đề - hiện tại, khi bạn click video để bắt đầu chạy nhưng nó cũng là` <div>` bị ẩn đi trong cùng thời điểm. Đó là bởi vì `<video>` bên trong thẻ `<div>`, vì vậy khi bạn click video thì thực chất nó chạy cả 2 sự kiện.

## 2.3. Bubbling and capturing explained
Khi 1 sự kiện được phát ra từ 1 element, cái mà có parent elements (như ví dụ `<video>` có thẻ `<div>` là cha), các browsers hiện đại sẽ chạy 1 giai đoạn khác nhau: the capturing phase and the bubbling phase.

**In the capturing phase:**
- Trình duyệt kiểm tra nếu tổ tiên bên ngoài gần nhất `<html>` (outer-most ancestor) có sự kiện onclick được đăng kí  trong giai đoạn bắt sự kiện và chạy nó nếu có
- Sau đó nó di chuyển vào phần tử tiếp theo bên trong `<html>` và làm tương tự, sau đó tiếp tục cho đến khi nó chạm đến thành phần cái mà thực sự được click vào

**In the bubbling phase, the exact opposite occurs:**

- Trình duyệt sẽ kiểm tra để xem nếu thành phần thực sự được click có 1 onclick event handler được đăng kí trong giai đoạn sủi bọt, chạy nó nếu có
- Sau đó nó di chuyển vào các element tổ tiên lập tức và thực hiện tương tự, tiếp tục như vậy cho đến `<html>` element
![](https://media.prod.mdn.mozit.cloud/attachments/2016/10/07/14075/1805b5a6f5ec0cd7f64f9d645f144510/bubbling-capturing.png)


Trong các browers hiện đại, mặc định tất cả event handlers được đăng kí trong giai đoạn sủi bọt. Bởi vậy trong ví dụ hiện tại, khi bạn click video, sự kiện sủi bọt từ `<video>` sẽ được hướng ra tới thẻ `<html>`. Chi tiết sẽ như sau:
- Nó tìm `video.onclick` ... handler và chạy nó do vậy đầu tiên video sẽ bắt đầu chạy
- Sau đó tìm kiếm `videoBox.onclick`... handler và chạy nó, do vậy video sẽ bị ẩn đi

## 2.4. Fixing the problem with `stopPropagation()`
Đây là 1 hành vi khó chịu nhưng có 1 cách để fix nó. Đối tượng Event chuẩn có 1 hàm khả dụng là `stopPropagation()`, khi được gọi trong 1 handlers của event object, handler đầu tiên sẽ chạy nhưng sự kiện không sủi bọt một lần nào nữa, vì vậy không có thêm handlers nào sẽ được chạy:
```js
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

> Note: Tại sao chúng ta phải quan tâm cả capturing and bubbling? Well, vào 1 ngày tồi tệ, trình duyệt ít các tương thích hợn như chúng ta có bây giờ, Netscape chỉ sử dụng event capturing và Internet Explorer chỉ sử dụng event bubbling. Khi W3C quyết định cố gắng chuẩn hóa hành vi và đạt được sự đồng thuận, họ đã kết thúc với hệ thống này bao gồm cả hai, đó là một trình duyệt hiện đại được triển khai

> Note: Như đã đề cập ở trên, mặc định tất cả các event handlers được đăng kí trong bubbling phase và điều này làm ý nghĩa hơn cho hầu hết thời gian. Nếu bạn thực sự muốn đăng kí 1 sự kiện trong phase capturing, bạn có thể đăng ký hanlder của bạn bằnh cách sử dụng addEventListener() và setting tùy chọn thứ 3 là true

## 2.5. Event delegation: Ủy quyền sự kiện

Bubbling cũng cho phép chúng ta tận dụng lợi thế của event delegation - khái niệm này dựa vào 1 thực tế nếu bạn muốn 1 vài đoạn code chạy khi bạn click vào 1 vài số lượng lớn các child elements, bạn có thể set event listener cho cha của chúng và có sự kiện cái mà diễn ra ở chúng nổi bọt hơn cha có thể phải set event listener trong mỗi thẻ con. Nhớ rằng trước đó chúng nó nói bubbling liên quan đến việc kiểm tra element sự kiện được kích hoạt for an event handler first mà moving up to đến element cha của nó?

Một ví dụ tốt là có nhiều danh sách items - nếu bạn muốn mỗi chúng hiển thị 1 message khi click, bạn có thể set click event listener trên thẻ cha `<ul>` và sự kiện sẽ nổi bọt từ mỗi items đến `<ul>`

Even delegation cho phép bạn tránh được thêm sự kiện cho mỗi nodes riêng biệt, thay vào đó event listener được thêm vào 1 thẻ cha. Event listener phân tích từ event được nổi bọt để tìm ra thẻ con. Khái niêm cơ bản khá đơn giản nhưng nhiều người không hiểu cách thức hoạt động của event delegation. Hãy để tôi giải thích nhé

Xem đoạn mã UL với 1 vài thẻ con:
```js
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
```
Bây giờ chúng ta gán sự kiện cho mỗi thẻ con khi được click. Bạn có thể thêm các event listener riêng biệt cho mỗi thẻ LI riêng, nhưng nếu LI thường xuyên được thêm hoặc xóa thì sao? Thêm và xóa event listeners sẽ trở thành 1 cơn ác mộng đặc biệt là khi đoạn code thêm và xóa ở các vị trí khác nhau trong ứng dụng của bạn. Giải pháp tốt để thêm event listener là thêm vào thẻ cha UL. Nhưng nếu bạn thêm vào thẻ cha, làm bạn biết được element nào được click?

Đơn giản: khi sự kiện nổi bọt lên cho UL element, bạn sẽ kiểm tra thuộc tính target của đối tượng event để có được 1 tham chiếu đến node được click thực tế. Đây là ví dụ cơ bản JavaScrit minh họa **event delagation**:
```js
// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if (e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});
```
Bắt đầu bằng cách thêm 1 click event listener tới thẻ cha. Khi event listener được kích hoạt, kiểm tra event element để chắc chắn nó là loại element đang bắt. Nếu nó là LI element, boom: đúng cái tao cần đây rồi. Nếu không phải element ta cân, sự kiện sẽ bị bỏ qua. Ví dụ cực kì đơn giản -UL và LI sự so sánh thẳng tiến. Hãy thử 1 vài thứ khó hơn. Hãy xem xét thẻ cha DIV có nhiều con nhưng chúng ta chỉ quan tâm 1 nhãn `A` với class CSS `classA`:
```js
// Get the parent DIV, add click listener...
document.getElementById("myDiv").addEventListener("click",function(e) {
	// e.target was the clicked element
  if (e.target && e.target.matches("a.classA")) {
    console.log("Anchor element clicked!");
	}
});
```
Bạn có thể xem Element.matches API tại đây: https://davidwalsh.name/element-matches-selector

Vì hầu hết các nhà phát triển sử dụng thư viện JavaScript để xử lý sự kiện và phần tử DOM của họ, tôi khuyên bạn nên sử dụng phương pháp ủy quyền sự kiện của thư viện, vì họ có khả năng xác định ủy nhiệm và phần tử nâng cao.

Hi vọng bài viết hữu ích cho bạn về những khái niệm xung quanh ủy quyền sự kiện và các thuận tiện xung quanh sức mạnh của sự ủy quyền này.

# Tổng kết
- Có 3 cách chung để gán sự kiện cho một thành phần DOM,: gán vào thuộc tính, gán inline hoặc sử dụng `addEventListener()`
- Cách `addEventListener()` có thể gán **nhiều sự kiện** cho 1 thành phần, và có một đối tác là `removeEventListener()` xóa sự kiện đã gán hiệu quả.
- Ngoài ra khi truyền sự kiện có nhiều thành phần được truyền theo. 
- Bạn nên hiểu bubbling and capture trong event, các DOM xử lý sự kiện theo các thẻ cha, con. Bên cạnh đó tận dụng lợi thế của nó với Event delegation
> Bubbling cũng cho phép chúng ta tận dụng lợi thế của event delegation - khái niệm này dựa vào 1 thực tế nếu bạn muốn 1 vài đoạn code chạy khi bạn click vào 1 vài số lượng lớn các child elements, bạn có thể set event listener cho cha của chúng và có sự kiện cái mà diễn ra ở chúng nổi bọt hơn cha có thể phải set event listener trong mỗi thẻ con. 
# Tài liệu tham khảo:
* Các sự kiện cho 1 trang web: [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)