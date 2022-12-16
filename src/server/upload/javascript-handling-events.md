Khi sử dụng các website, thỉnh thoảng chúng ta sẽ thấy một số chương trình hoạt động dựa trên user input, ví dụ như các action của chuột hay bàn phím. Các sự kiện này thường được cài đặt kiểu real time, nói cách khác là khi người dùng tạo ra một sự kiện nào đó từ bàn phím hoặc chuột thì chương trình phải có phản hồi gần như lập tức. 
### Event Handlers
Để tạo một event handlers cho chương trình, chúng ta sẽ sử dụng function `addEventListener`. 
```html
<p>Click this document to activate the handler.</p>
<script>
window.addEventListener("click", () => {
    console.log("You knocked?");
});
</script>
```
Tham số đầu tiên của function `addEventListener` chính là tên của sự kiện mà người dùng tạo ra, ở ví dụ trên là `click`. Còn tham số thứ 2 chính là một hoạt động ngay sau khi sự kiện `click` được xảy ra, hay còn gọi là `event handler function`.

Chúng ta cũng có thể sử dụng function này cho từng DOM, không nhất thiết phải là đối tượng `window`. Ví dụ
```html
<button>Click me</button>
<p>No handler here.</p>
<script>
let button = document.querySelector("button");
button.addEventListener("click", () => {
console.log("Button clicked.");
});
</script>
```
Nếu có `add` thì chắc chắn có `remove`. Để có thể hủy bỏ việc lắng nghe sự kiện từ người dùng, chúng ta có thể sử dụng `removeEventListener`. Ví dụ
```html
<button>Act-once button</button>
<script>
let button = document.querySelector("button");
function once() {
console.log("Done.");
button.removeEventListener("click", once);
}
button.addEventListener("click", once);
</script>
```
Ở ví dụ trên, sau khi button được `click`, hệ thống sẽ in ra `Done`. Tuy nhiên khi chúng ta `click` tiếp vào button, hệ thống sẽ không in `Done` ra nữa vì việc lắng nghe sự kiện này đã bị hủy bỏ. 

### Event object
Như các ví dụ ở phần trên, các `event handler function` đều là một function không tham số. Tuy nhiên, đầy đủ hơn thì các function này sẽ nhận vào một tham số là `event object`. Ví dụ
```html
<button>Click me any way you want</button>
<script>
let button = document.querySelector("button");
button.addEventListener("mousedown", event => {
if (event.button == 0) {
console.log("Left button");
} else if (event.button == 1) {
console.log("Middle button");
} else if (event.button == 2) {
console.log("Right button");
}
});
</script>
```

Cũng khá đơn giản phải không các bạn :D

### Propagation
Khi xử lý event chúng ta sẽ thấy có một vấn đề như sau. Giả sử chúng ta có một button nằm trong một paragraph. Cả hai objetc này đều handle sự kiện click, như vậy rõ ràng khi chúng ta click vào button, event hander function của paragraph cũng sẽ được thực thi.
```html
 <p>A paragraph with a <button>button</button>.</p>
<script>
  let para = document.querySelector("p");
let button = document.querySelector("button");
para.addEventListener("click", () => {
console.log("Handler for paragraph.");
});
button.addEventListener("click", event => {
console.log("Handler for button.");
});
  </script>
```

Hầu hết các event object đều có một thuộc tính là target, target chính là object mà tạo ra cái sự kiện hiện tại, ví dụ khi chúng ta click vào một button thì button đó chính là target. Để hiểu rõ hơn, chúng ta sẽ chạy thử đoạn code sau :D
```html
<button>A</button>
<button>B</button>
<button>C</button>
<script>
document.body.addEventListener("click", event => {
if (event.target.nodeName == "BUTTON") {
console.log("Clicked", event.target.textContent);
}
});
</script>
```

### Default actions
Chúng ta có rất nhiều các event action mặc định, ví dụ khi click vào một link, thì chúng ta sẽ mở trình duyệt với link đó. Hoặc ví dụ như khi người dùng nhấn down arrow, web page sẽ scroll down. Tuy nhiên nếu chúng ta add listener cho funtion thì event handler function sẽ được gọi trước event mặc định.

```html
<a href="https://developer.mozilla.org/">MDN</a>
<script>
let link = document.querySelector("a");
link.addEventListener("click", event => {
console.log("Nope.");
event.preventDefault();
});
</script>
```

Chúng ta cũng có thể loại bỏ action mặc định bằng function `preventDefault()` như ví dụ trên. Tuy nhiên có một số trường hợp mà chúng ta ko thể hadle được, ví dụ như trên Chrome, chúng ta ko thể handle sự kiện đóng current tab (Ctrl + W hoặc Command + W).

### Key events
Khi một phím trên bàn phím được người dùng nhấn, trình duyệt sẽ hiểu đó là hành động `keydown`. Khi chúng ta nhả tay khỏi phím sau khi bấm, trình duyệt sẽ hiểu hành động này là `keyup`. Để bắt được các sự kiện này, chúng ta vẫn tiếp tục sử dụng `addEventListener` function như sau
```html
<p>This page turns violet when you hold the V key.</p>
<script>
window.addEventListener("keydown", event => {
if (event.key == "v") {
document.body.style.background = "violet";
}
});
window.addEventListener("keyup", event => {
if (event.key == "v") {
document.body.style.background = "";
}
});
</script>
```

Chú ý khi người dùng nhấn và giữ một phím nào đó thì hành động `keydown` và handler sẽ được lặp lại nhiều lần. Do đó chùng ta cần cẩn thận khi bắt sự kiện này nhé :D

### Pointer events
Tiếp theo chúng ta sẽ tìm hiểu các hành động khi người dùng sử con trỏ (từ chuột). 
#### Mouse click
Tương tự như button trên bàn phím, mouse button cũng có 2 sự kiện là `mouseup` và `mousedown`. `Click` event là sự kiện bao gồm cả `mouseup` và `mousedown`, ví dụ khi chúng ta `mousedown` trên một đoạn text xong đó di chuyển contrỏ sang đoạn text khác rồi `mouseup` thì sự kiện `click` sẽ xảy ra đối với element chứa cả hai đoạn text trên.

Đối với trường hợp hai clicks liên tiếp, chúng ta có event `dbclick` (double click).

Để lấy được thông tin của con trỏ trên browser chúng ta có mấy thuộc tính sau:
+ clientX và clientY: hai thuộc tính này sẽ thể hiện tọa độ (dựa theo pixels) của con trỏ tương ứng với khoảng cách top-left của cửa sổ window.
+ pageX và pageY: tương tự như trên nhưng đây tương ứng với khoảng cách top-left của document (các thuộc tính này khác nhau khi window được scroll).

```html
<style>
body {
height: 200px;
background: beige;
}
.dot {
height: 8px; width: 8px;
border-radius: 4px; /* rounds corners */
background: blue;
position: absolute;
}
</style>
<script>
window.addEventListener("click", event => {
let dot = document.createElement("div");
dot.className = "dot";
dot.style.left = (event.pageX - 4) + "px";
dot.style.top = (event.pageY - 4) + "px";
document.body.appendChild(dot);
});
</script>
```

#### Mouse motion
Mỗi lần con trỏ chuột di chuyển trên browser, sự kiện `mousemove` sẽ xảy ra.  Sự kiện này thường được sử dụng để thực hiện các tác vụ dragging trên màn hình. Ví dụ
```html
<p>Drag the bar to change its width:</p>
<div style="background: orange; width: 60px; height: 20px">
</div>
<script>
let lastX; // Tracks the last observed mouse X position
let bar = document.querySelector("div");
bar.addEventListener("mousedown", event => {
if (event.button == 0) {
lastX = event.clientX;
window.addEventListener("mousemove", moved);
event.preventDefault(); // Prevent selection
}
});
function moved(event) {
if (event.buttons == 0) {
window.removeEventListener("mousemove", moved);
} else {
let dist = event.clientX - lastX;
let newWidth = Math.max(10, bar.offsetWidth + dist);
bar.style.width = newWidth + "px";
lastX = event.clientX;
}
}
</script>
```

Ví dụ trên sẽ render một bar, khi chúng ta di chuyển con trỏ trên thanh đó, thanh đó sẽ được kéo dài ra :D Các bạn có thể chạy thử đoạn code trên và xem kết quả nhé :D

#### Cảm ơn các bạn đã đọc bài viết! Happy coding!