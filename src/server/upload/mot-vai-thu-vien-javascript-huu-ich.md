# 1.[Linkfy](https://github.com/SoapBox/linkifyjs)
> * Linkify là một plugin JavaScript để tìm các liên kết ở dạng văn bản thuần túy và chuyển đổi chúng thành các thẻ HTML <a>.
> 
> * Nó hoạt động với tất cả các URL và địa chỉ email hợp lệ.
> 
> * Nó có độ chính xác, tốc độ cao và dễ sử dụng.

### Cài đặt.
[Tải xuống](https://github.com/SoapBox/linkifyjs/releases/download/v2.1.6/linkifyjs.zip) bản mới nhất hoặc cài đặt thông qua NPM
```bash
npm install linkifyjs
```
hoặc Bower.
```bash
bower install linkifyjs
```
hoặc sử dụng link cdn.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.6/linkify.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.6/linkify-jquery.min.js"></script>
```

### Quick Start
Để sử dụng linkfy thì cần phải import thư viện jquery. Thêm linkify và linkify-jquery vào HTML của bạn sau jQuery.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.6/linkify.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.6/linkify-jquery.min.js"></script>
```

**Tìm tất cả các liên kết và chuyển đổi chúng thành các thẻ liên kết**

Ví dụ: Chuyển tất cả các liên kết trong thẻ p thành các thẻ liên kết.
```html
<p>
    Truy cập trang cá nhân https://viblo.asia/u/thanhnn
</p>
```
Thêm javascript.
```javascript
$('p').linkify();
```
Kết quả.

![](https://images.viblo.asia/7563c4f3-fbdf-4d9a-a59b-df8c8347e88b.png)

**Tìm tất cả các liên kết trong chuỗi đã cho**

```javascript
linkify.find('Any links to github.com here? If not, contact test@example.com');
```
Kết quả trả về là 1 mảng.
```javascript
[
  {
    type: 'url',
    value: 'github.com',
    href: 'http://github.com'
  },
  {
    type: 'email',
    value: 'test@example.com',
    href: 'mailto:test@example.com'
  }
]
```
# 2.[Keymaster](https://github.com/madrobby/keymaster)

> Keymaster là một thư viện đơn giản tạo các phím tắt trong các ứng dụng web của bạn.
> 
### Cài đặt.
Cài đặt thông qua NPM
```bash
npm install keymaster
```
hoặc Bower.
```bash
bower install keymaster
```
hoặc sử dụng link cdn.
```html
<script src="https://cdn.jsdelivr.net/keymaster.js/1.6.1/keymaster.js"></script>
```

hoặc file min

```html
<script src="https://cdn.jsdelivr.net/keymaster.js/1.6.1/keymaster.min.js"></script>
```

### Quick Start
Keymaster có thể hoạt động độc lập, không phụ thuộc vào các thư viện khác, vì vậy không cần import jquery. Thêm keymaster.min.js vào HTML của bạn sau jQuery.
```html
<script src="https://cdn.jsdelivr.net/keymaster.js/1.6.1/keymaster.min.js"></script>
```
**Định nghĩa các phim tắt**

Sử dụng hàm key.
```javascript
// define short of 'a'
key('a', function () {
    alert('you pressed a!')
});

// returning false stops the event and prevents default browser events
key('ctrl+r', function () {
    alert('stopped reload!');
    
    return false
});

// multiple shortcuts that do the same thing
key('⌘+r, ctrl+r', function () {
    // do somethings
});
```
**Các phím được hỗ trợ**

* Các phím đặc biệt sau đây có thể được sử dụng cho các phím tắt: `backspace`, `tab`, `clear`, `enter`, `return`, `es`c, `escape`, `space`, `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete` và `f1` đến `f19`.

> Ngoài ra còn có 1 số tiện ích khác bạn có thể tìm hiểu thêm tại https://github.com/madrobby/keymaster
# 3.[Sortable](http://rubaxa.github.io/Sortable/)

> Sortable là một thư viện JavaScript dùng để kéo và thả các phần tử trên trang web. Không cần phải có jQuery.
> 
### Cài đặt.
Cài đặt thông qua NPM
```
npm install sortablejs --save
```
hoặc Bower.
```
bower install --save sortablejs
```
hoặc sử dụng link cdn.
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.6.0/Sortable.js"></script>
```

hoặc file min

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.6.0/Sortable.min.js"></script>
```

### Usage
```html
<ul id="items">
	<li>item 1</li>
	<li>item 2</li>
	<li>item 3</li>
</ul>
```
```html
var el = document.getElementById('items');
var sortable = Sortable.create(el);
```

Ngoài <ul>/<ol> thì bạn củng có thể sử dụng cho thẻ [div](http://jsbin.com/qumuwe/edit?html,js,output), ..v..v..

### Các tùy chọn
```javascript
var sortable = new Sortable(el, {
	group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
	sort: true,  // sorting inside list
	delay: 0, // time in milliseconds to define when the sorting should start
	touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
	disabled: false, // Disables the sortable if set to true.
	store: null,  // @see Store
	animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
	handle: ".my-handle",  // Drag handle selector within list items
	filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
	preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
	draggable: ".item",  // Specifies which items inside the element should be draggable
	ghostClass: "sortable-ghost",  // Class name for the drop placeholder
	chosenClass: "sortable-chosen",  // Class name for the chosen item
	dragClass: "sortable-drag",  // Class name for the dragging item
	dataIdAttr: 'data-id',

	forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

	fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
	fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
	fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

	scroll: true, // or HTMLElement
	scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
	scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	scrollSpeed: 10, // px

	setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
		dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
	},

	// Element is chosen
	onChoose: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging started
	onStart: function (/**Event*/evt) {
		evt.oldIndex;  // element index within parent
	},

	// Element dragging ended
	onEnd: function (/**Event*/evt) {
		var itemEl = evt.item;  // dragged HTMLElement
		evt.to;    // target list
		evt.from;  // previous list
		evt.oldIndex;  // element's old index within old parent
		evt.newIndex;  // element's new index within new parent
	},

	// Element is dropped into the list from another list
	onAdd: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Changed sorting within list
	onUpdate: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Called by any change to the list (add / update / remove)
	onSort: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Element is removed from the list into another list
	onRemove: function (/**Event*/evt) {
		// same properties as onEnd
	},

	// Attempt to drag a filtered element
	onFilter: function (/**Event*/evt) {
		var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
	},

	// Event when you move an item in the list or between lists
	onMove: function (/**Event*/evt, /**Event*/originalEvent) {
		// Example: http://jsbin.com/tuyafe/1/edit?js,output
		evt.dragged; // dragged HTMLElement
		evt.draggedRect; // TextRectangle {left, top, right и bottom}
		evt.related; // HTMLElement on which have guided
		evt.relatedRect; // TextRectangle
		originalEvent.clientY; // mouse position
		// return false; — for cancel
	},

	// Called when creating a clone of element
	onClone: function (/**Event*/evt) {
		var origEl = evt.item;
		var cloneEl = evt.clone;
	}
});
```
  
**`Group option`**

* Để kéo các phần tử từ danh sách này sang danh sách khác, cả hai danh sách phải có cùng một giá trị `group`.
* Bạn cũng có thể xác định xem danh sách nào có thể kéo, kéo và giữ một bản sao, và nhận các phần tử hay không.
* xem demo

    http://jsbin.com/naduvo/edit?js,output

    http://jsbin.com/rusuvot/edit?js,output

    http://jsbin.com/magogub/edit?js,output
  
**`Sort option`**

* Dùng để sắp xếp bên trong danh sách.
* Xem demo http://jsbin.com/xizeh/edit?html,js,output

**`Delay option`**

* Dùng để xác định thời điểm sắp xếp sẽ bắt đầu. Thời gian được tính bằng mili giây. 
* Xem demo: http://jsbin.com/xizeh/edit?html,js,output

**`TouchStartThreshold option`**

* Tùy chọn này tương tự như tùy chọn `fallbackTolerance`.
* Dùng để tùy chọn độ trẻ khi kéo thả.

**`Disabled options`**

* Disables the sortable nếu được đặt là true.
* Xem demo: http://jsbin.com/xiloqu/edit?html,js,output

**`Handle option`**
* Dùng để xử lý chọn vùng có thể giữ để kéo thả.
* Xem demo: http://jsbin.com/newize/edit?html,js,output

**`GhostClass`**
* Dùng để tạo placeholder giữ chổ thả xuống phần tử.
* Xem demo: http://jsbin.com/hunifu/4/edit?css,js,output

> Các bạn có thể xem thêm 1 số option tại https://github.com/RubaXa/Sortable#options