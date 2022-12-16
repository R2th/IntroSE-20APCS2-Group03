Hôm nay chúng ta sẽ cùng thảo luận 1 tí về việc _delegate event_ trong javascript (vanilla JS).

Chắc mọi người đã từng nghe qua khái niệm bubbling, đơn giản thôi:

> When an element in the DOM is clicked, the event bubbles all the way up to the parent element (the document and then the window). This allows you to listen for events on the parent item and still detect clicks that happen inside it.

Hiểu nôm na là khi một sự kiện xảy ra trên DOM, các hàm handlers sẽ được gọi trên nó, sau đó đến parent element, đến document và cả window.

![](https://images.viblo.asia/93ae94dc-d895-4f4c-beff-57ccb36d0d16.png)

_(Ảnh: https://javascript.info/bubbling-and-capturing)_

__"Phần lớn"__ các events là bubble. Một số không bubble ví dụ event `focus`.

# The concept

Như vậy cách tiếp cận ở đây là thay vì gắn listener vào DOM cụ thể, bạn sẽ gắn listener đó vào một parent element (ví dụ `document` hoặc `window`).

Tất cả các event cùng loại đó sẽ có thể xảy ra bên trong parent element đó đều sẽ được bubble up, nhưng đừng lo, bạn hoàn toàn có thể lọc những event match với element mà bạn muốn handle là xong. 

Ví dụ bạn muốn thực thi 1 đoạn logic khi click vào `button.click-me`, cách truyền thống mà bạn sẽ thực hiện:

```js
document.querySelector('.click-me').addEventListener(function(evenet) {
  /* Phần code của event handler sẽ nằm đây */
});
```

Trong phần code trên thậm chí bạn còn phải check nếu `querySelector` trả về `null` nữa. 

Còn với __event delegation__ code của bạn sẽ như sau:

```js
document.addEventListener('click', function (event) {

  /* Kiểm tra nếu element vừa bị click có phải là .click-me không */
  /* Nếu không thì return */

  if (!event.target.matches('.click-me')) return;

  /* Phần code của event handler sẽ nằm đây */
});
```

Trông nó hơi bựa đúng không, handler không gắn lên element mà lại gắn cho 1 element khác, sẽ hơi bất tiện trong việc quản lý. Đó chính xác là một điểm yếu, nhưng cũng sẽ là thế mạnh trong 1 số trường hợp khác. 

Cụ thể khi bạn muốn gắn event listener vào nhiều hơn 1 element, có class name là `click-me`.

Với jQuery thì mọi chuyện sẽ rất đơn giản:

```js
$('.click-me').click(function(event) {
  // Do things...
});
```

Tuy nhiên, với vanilla JS thì `addEventListener()` không hoạt động như bạn mong đợi, nó chỉ có thể gắn vào 1 element cụ thể. Và nếu code như này tất nhiên sẽ _không_ thành công.

```js
document.querySelectorAll('.click-me')
  .addEventListener('click', function (event) {
    // Do stuff...
  }, false);
```

Và nếu dùng vòng lặp để gán vào từng element cũng tạch nốt, vì biến `i` trong vanilla JS không `scoped` trong vòng lặp. Như này cũng tạch luôn

```js
var elements = document.querySelectorAll('.click-me');

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', function (event) {
    // Do stuff...
  }, false);
}
```

Lúc này _event delegation_ lại là lựa chọn tối ưu. 

Nghe mọi click hanldler đều gắn vào `document` có vẻ hơi đáng quan ngại, không biết nó có làm giảm performance không. Nhưng thực tế, performance sẽ được cải thiện vì sẽ không phải cấp phát nhiều vùng nhớ cho nhiều event handler, performance còn cao hơn cả việc có hàng tá event linsteners trên từng element.

Nếu bạn cần lắng nghe sự kiện click trên nhiều phần tử và làm nhiều việc khác nhau cho từng phần tử, bạn có thể chọn _event delegation_ để tối ưu hoá performance.

Vậy còn lợi ích nào khác không? còn

# Dynamically rendered elements

Nếu bạn gắn event handler vào một element cụ thể vào lúc DOM loads thì khi sinh ra moojt DOM mới sau thời điểm đó, bạn cũng sẽ phải chạy lại đoạn code gắn event handler đó vào DOM mới, mà bất cẩn thì có thể bạn sẽ làm những DOM cũ gắn nhiều event handler giống nhau nữa.

Ví dụ trên xuất hiện nhiều trong các trang web ngày nay với sự phổ biến của ajax. Do đó, hãy gắn sự kiện vào parent element hoặc `document` để giải quyết vấn đề.

# Modular functions

Có thể bạn sẽ tự hỏi làm thế nào để tránh việc lộn xộn logic khi có quá nhiều element cần handler bên trong 1 handler chung như vậy?

Bạn hãy move từng khối logic sang từng hàm handler khác nhau, và pass `event` object vào.

```js
var showModal = function(event) {
  if (!event.target.matches('.modal-open')) return;

  // Run your code to open a modal
};

var hideModal = function(event) {
  if (!event.target.matches('.close')) return;

  // Run your code to close a modal
};

var handleShowMe = function(event) {
  if (!event.target.matches('.show-me')) return;

  // The code you want to run goes here...
};

var handleSaves = function(event) {
  if (!event.target.matches('.save')) return;

	// The code you want to run goes here...
};

document.addEventListener('click', function(event) {
  showModal(event);
  hideModal(event);
  handleShowMe(event);
  handleSaves(event);
});
```

Với ý tưởng trên, bạn có thể dùng duy nhất 1 event listener cho toàn bộ trang, và cũng tránh được việc phải `if...else` lộn xộn bên trong nó. Mỗi logic nó nằm trong từng hàm riêng của nó, khá dễ dàng để thêm, hay bớt, thậm chí sửa từng logic.

# Conclusion 
Không có một chiếc áo nào mặc vừa cho tất cả mọi người, cũng như không có giải pháp nào là tốt và tối ưu toàn diện, mà nó chỉ có thể phù hợp với hoàn cảnh sử dụng của bạn hay không.

Cách tiếp cận này khá ổn tuy nhiên với các single page application mình không khuyến khích lắm vì độ phứt tạp của nó cao hơn rất nhiều, và object document sẽ không bị khởi tạo lại cho tới khi bạn tải lại trang. Do đó nếu muốn áp dụng _event delegation_ bạn sẽ phải quản lý thật tốt việc `addEventListener` và `removeEventListener` nếu không bạn sẽ gặp phải những bug không đáng có đấy.

Xin chào và hẹn gặp lại trong các bài viết sau nhé.