> Bài viết gốc: https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/

Trong một số website hoặc ứng dụng, đôi khi bạn có thể muốn chạy một vài đoạn code để phản hồi khi có sự kiện nào đó xảy ra.
Đây thường là những lệnh nằm bên ngoài chức năng cốt lõi của bạn. Bạn có thể có một modal plugin, một hộp thoại ẩn, hoặc bật-tắt một menu, và bạn muốn điều chỉnh hành vi của nó một chút trong một số trường hợp nhất định.

Ví dụ:
* Sau khi nút bấm mở modal được click, bạn sẽ gọi hàm ajax lấy dữ liệu và hiển thị modal.
* Sau khi mở một hộp thoại, tìm và đóng các hộp thoại khác.
* Sau khi một menu được mở, gỉam kích cỡ của logo để có thêm khoảng trống.

Sau đây tôi sẽ giới thiệu hai phương pháp để xử lý vấn đề này.
# Vấn đề
Để lấy ví dụ, hãy giả sử chúng ta có một đoạn code đếm số lần nhấp vào nút bấm.

```html
<p>
	<button data-count>Add One</button>
</p>

<p>
	Total: <span id="counter">0</span>
</p>
```

```js
/**
 * The counter script
 * @param  {Node} btn     The counter button
 * @param  {Node} counter The count in the UI
 */
var countUp = function (btn, counter) {

	// The current count
	var currentCount = 0;

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

	});

};

// Get the button and count elements
var btn = document.querySelector('[data-count]');
var counter = document.querySelector('#counter');

// Run the script
countUp(btn, counter);
```

Demo:

{@embed: https://codepen.io/cferdinandi/pen/eYZMrXB}

Tưởng tượng bất kỳ lúc nào nút bấm được click, chúng ta muốn kiểm tra số lần bấm lớn hơn hoặc bằng 10 thì sẽ đưa ra một cảnh báo `“over capacity.”`

Đây sẽ chỉ là một đoạn mã phụ, không liên quan đến logic ban đầu. Đôi khi sẽ cần đến trong dự án.

# Cách 1: Callbacks
Một callback là một hàm được gọi sau khi một hàm khác chạy xong.

Trong hàm `counter()` của chúng ta, cần thêm một tham số thứ ba là một callback function, và gọi nó sau khi thực hiện tăng số đếm.

Chúng ta có thể truyền thêm một số thông tin vào callback, như là số lượt đếm hiện tại, để có thể sử dụng.

```js
/**
 * The counter script
 * @param  {Node}     btn      The counter button
 * @param  {Node}     counter  The count in the UI
 * @param  {Function} callback An optional callback function
 */
var countUp = function (btn, counter, callback) {

	// The current count
	var currentCount = 0;

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

		// If there's a callback, run it
		if (callback && typeof callback === 'function') {
			callback(currentCount);
		}

	});

};
```

Để sử dụng nó, chúng ta có thể làm đơn giản như sau:

```
countUp(btn, counter, function (count) {

	// if the count is 10 or more, alert the user
	if (count > 9) {
		alert('You are over capacity!');
	}

});
```

Demo với callback:

{@embed: https://codepen.io/cferdinandi/pen/PoNReLL}

# Cách 2: Custom Events

Callbacks khá là tuyệt, nhưng nó cũng có 2 nhược điểm:

1.  Nó yêu cầu bạn tính đến bất kỳ trường hợp nào cần sử dụng nó tại thời điểm bạn chạy tập lệnh của mình.
2. Bạn phải đặt tất cả các đoạn mã cần chạy ở một vị trí.

Ví dụ: giả sử sau đó bạn thêm một tập lệnh khác, khi số lần bấm đạt giới hạn, hãy gửi một API và gửi email yêu cầu thêm số lần bấm vì mức độ phổ biến của sự kiện.

Tùy thuộc vào cấu trúc dự án của bạn, bạn có thể muốn mã đó nằm trong tệp hiện tại. Cũng có thể bạn cũng muốn tải nó bất đồng bộ khi cần thiết để giảm kích thước tệp JavaScript của bạn.

Và nếu bạn muốn đổi sang cách khác và xoá đi các callbacks, bạn sẽ cần nhớ vị trí của bất kỳ chỗ nào `countUp()` chạy và xoá callback của nó.

Nó sẽ là một vấn đề lớn cần xem xét khi ứng dụng được mở rộng.

##  Tách các phần mã xử lý với sự kiện

Với Custom events bạn có thể tách các phần mã xử lý và phản hồi với sự kiện.

JavaScript cũng cấp phương thức để tạo một một custom event, và nó có thể được nghe với `addEventListener()`, giống như các sự kiện bình thường `click` hoặc `scroll`.

Bạn thậm chí có thể chuyển dữ liệu tùy chỉnh vào callback của `event listener` để sử dụng.

## Tạo một custom event

Bạn có thể tạo một custom event với `new CustomEvent()` constructor.

Truyền vào tên của event cùng với một object cài đặt. Bạn có thể tuỳ chỉnh `bubbles`, `cancelable`. Và để truyền dữ liệu cần dùng thì bạn truyền vào `detail`.

```js
// Create a new event
var event = new CustomEvent('counted', {
	bubbles: true,
	cancelable: true,
	detail: {
		currentCount: currentCount
	}
});
```

Sau đó, bạn có thể kích hoạt nó bằng hàm `dispatchEvent()` trên element bạn gắn trình nghe sự kiện.

```js
counter.dispatchEvent(event);
```

## Trở lại với mã của chúng ta

Đây là hàm `countUp()` khi sử dụng cách này.

```js
/**
 * The counter script
 * @param  {Node}     btn      The counter button
 * @param  {Node}     counter  The count in the UI
 */
var countUp = function (btn, counter) {

	// The current count
	var currentCount = 0;

	// Emit a custom event
	var emitEvent = function () {

		// Create a new event
		var event = new CustomEvent('counted', {
			bubbles: true,
			cancelable: true,
			detail: {
				currentCount: currentCount
			}
		});

		// Dispatch the event
		counter.dispatchEvent(event);

	};

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

		// Emit the custom event
		emitEvent();

	});

};
```

Và thêm đoạn code cảnh báo khi số lượt bấm đạt giới hạn:

```js
// Run the script
countUp(btn, counter);

// Alert the user when the count reaches 10
counter.addEventListener('counted', function (event) {
	if (event.detail.currentCount > 9) {
		alert('You are over capacity!');
	}
});
```

Demo với custom event:
{@embed: https://codepen.io/cferdinandi/pen/MWyVXJm}

## Tính tương thích với trình duyệt

Custom events có trên tất cả trình duyệt hiện đại và IE 11. [Bạn có thể thêm hỗ trợ cho IE9 với polyfill.](https://vanillajstoolkit.com/polyfills/customevent/)

# Cách nào bạn nên sử dụng?
Với các đoạn mã thực sự đơn giản, tôi thường sử dụng callback.

Nhưng tôi thường thích cách sử dụng custom event. Nó cung cấp cho developer tính linh hoạt cao hơn và giống như một cách hiện đại hơn để tiếp cận việc xây dựng các plugin và ứng dụng.