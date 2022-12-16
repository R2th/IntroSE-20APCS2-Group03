Là một Web Developer việc tiếp xúc với các Web APIs của Javascript là thường dễ thấy, thế nhưng có rất nhiều các APIs hay ho mà không phải ai trong chúng ta cũng đã biết và sử dụng.

Một số đặc điểm của các Web APIs này có thể kể đến là:
* Mở rộng các chức năng với browser
* Cung cấp số lượng lớn các API giúp thao tác với browser dễ dàng
* Đơn giản hóa các chức năng tưởng chừng như phức tạp

Trong bài viết lần này mình xin phép giới thiệu đến các bạn một số Web APIs khá hay mà mình có tìm hiểu được

Bắt đầu thoai.

# 1. Page Visibility API
Bắt đầu với chiếc API đầu tiền đó là **Page Visibility API**. Đọc đến tên của `API` này thôi chúng ta cũng có thể đoán được nôm na rằng `API` làm nhiệm vụ gì, nó cung cấp cho chúng ta một sự kiện **theo dõi document(cửa sổ hiện tại) có đang được hiển thị hay không**, nói một cách dễ hiểu hơn thì nó phát hiện sự kiện **chuyển tab khác** hay **minimizes trình duyệt** đó các cậu.

Trong thực tế, có rất nhiều trường hợp chúng ta cần sử dụng đến `API` này ví dụ như để tạm dừng việc một công việc nào đó ở **cửa sổ  trình duyệt** khi mà người dùng không còn làm việc bên **cửa sổ** đó nữa. Hay là một chức năng khá phổ biến khác như `image carousel` sẽ không tự động next image tiếp theo cho đến khi mà người dùng quay lại **tab** đó.

**Page Visibility API** sử dụng một `event` là **visibilitychange** để phát hiện trạng thái được "ẩn" đi của document hiện tại.

Song song với event này đó chính là việc sử dụng thêm các properties của `Document interface` là
* **Document.hidden**: giá trị này sẽ trả về `true` nếu như document hiện tại của bạn bị ẩn đi hoặc ngược lại.
* **Document.visibilityState**: giá trị trả về của thuộc tính này là `visible` nếu như nội dung hiện tại được hiển thị ít nhất một phần, `hidden` nếu như nội dung của trang đó không được thấy bởi người dùng, giá trị `prerender` khi nội dung đã được hiển thị trước nhưng không được thấy bởi người dùng, giá trị cuối cùng là `unloaded`khi mà quá trình tải trang đang diễn ra.

Ví dụ :
```javascript
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
  	alert('hidden')
  } else {
  	alert('visible')
  }
})
```


# 2. HTML Drag and Drop API
APi thứ hai mà mình muốn giới thiệu là một API làm một công việc khá phổ biến hiện nay, ngay cả Viblo cũng đang sử dụng tính năng này đó là tính năng **kéo thả**. Hiểu đơn giản cho những các bạn mới biết tính năng này thì nó cho phép chúng ta kéo phần tử này ra một vị trí khác (sắp xếp lại vị trí của một danh sách...)

`HTML Drag and Drop` interfaces cho phép chúng ta sử dụng tính năng kéo thả này trên trình duyệt. Khi làm việc với chức năng này tức là chúng ta đang làm việc với các **event**(sự kiện), đúng vậy `HTML Drag and Drop` sẽ sử dụng `Event interface` và `DragEvent interface`. 

`DragEvent interface` cung cấp cho chúng ta một loạt các loại sự kiện để thao tác dễ dàng với chức năng kéo thả.

* **drag**: được kích hoạt khi người dùng kéo một phần tử nào đó, sự kiện này được gọi liên tục trong quá trình kéo
* **dragend**: được kích hoạt khi kết thúc hành động kéo (xảy ra khi bấm phím `esc`, hoặc người dùng thả chuột)
* **dragenter**: được kích hoạt khi phần tử được kéo vào vị trí được thả hợp lệ
* **dragleave**: được kích hoạt khi phần tử được kéo rời khỏi vị trí được thả hợp lệ
* **dragexit**: sự kiện này họat động khá giống với **dragleave**, sự khác biệt duy nhất cho đến hiện tại mình thấy đó là **dragexit** chỉ hoạt động được trên `Firefox`.
* **dragover**: hoạt động giống như **dragenter**, nhưng sự kiện này sẽ được kích hoạt liên tục khi phần tử được kéo và con trỏ chuột bên trong vùng thả hợp lệ
* **dragstart**: được kích hoạt khi bắt đầu kéo một phần tử
* **drop**: được kích hoạt khi người dùng thả chuột.

`HTML Drag and Drop` bao gồm các interfaces khác như `DragEvent`, `DataTransfer`, `DataTransferItem` and `DataTransferItemList`.  Vì là `DragEvent` và `DataTransfer` được hỗ trợ nhiều hơn trên các trình duyệt nên ở bài giới thiệu này mình cũng chỉ giới thiệu về 2 interfaces này thôi nhé.

Như mình có giới thiệu ở trên thì API kéo thả này sẽ sử dụng `DragEvent`.  `DrageEvent` cung cấp cho chúng ta một thuộc tính là ` dataTransfer` thuộc `DataTransfer object`. Thuộc tính này sẽ giúp chúng ta đọc được dữ liệu của phần tử được kéo.

## Làm tính năng kéo thả
Đầu tiên để bắt đâu làm được chắc năng kéo thả , trước tiên cần phải xác định được đối tượng mà cho phép chúng ta có thể kéo thả được. Để xác định được đối tượng được phép kéo thả cần thêm thuộc tính `draggable=true` và sử dụng sự kiện `ondragstart` để bắt đầu việc kéo thả.

Mình có các file như sau 
```html:index.html
<p id="dragEl" draggable="true" ondragstart="drag(event)">kéo tôi đi</p>
<div class="box">
</div>
```

```css:style.css
.box {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
```
và file js để xử lý
```javascript:script.js
function drag (ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}
```
Trong hàm `drag` này mình sử dụng phương thức `setData` của `DataTransfer` dùng để lưu trữ thông tin của phần tử đang được kéo, hàm này nhận vào hai tham số
* tham số thứ nhất là để định dạng format cho tham số thứ hai
* dữ liệu đang được "chuyển đi"

Ở đây mình sử dụng `id` là dữ liệu được chuyển đi vì đây là dữ liệu có thể coi là `unique` trong ứng dụng, tí nữa mình sẽ dùng tới nó sau (tùy từng trường hợp mà các bạn hãy cân nhắc dùng dữ liệu gì để truyền đi nhé).

Sau khi có tính năng **kéo** rồi, giờ chúng ta cần thêm tính năng **thả**, tính năng thả thì là lúc chúng ta sử dụng event **drop**. Các bạn hãy thêm sự kiện **ondrop** vào nơi cần thả vào, ở trong ví dụ này mình đang dùng là thẻ `div`
```html:index.html
<p id="p1" draggable="true" ondragstart="drag(event)">kéo tôi đi</p>
<div class="box" ondrop="drop(event)">
</div>
```
Thêm hàm xử lý việc thả
```javascript:script.js
function drag (ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop (event) {
	const data = event.dataTransfer.getData("text")
  	event.target.appendChild(document.getElementById(data));
}
```
Giải thích tiếp một chút, khi **kéo** mình đã sử dụng phương thức **setData** để lưu trữ dữ liệu của phần tử đang được kéo, giờ để lấy được giá trị đã lưu mình sẽ sử dụng phương thức **getData** với một tham số truyền vào là định dạng của dữ liệu được lấy.

Sau đó là truy xuất phần tử được kéo đi với `id` được truyền và thêm vào thẻ `div` là ok thoai. Chạy trình duyệt lên vào thử thôi nào.

**Tuy nhiên**: Khi chạy lên các bạn sẽ vẫn chưa thấy nó thả vào thẻ div đúng không :rofl::rofl::rofl:

Lý do là vì đối với những `DOM elements` thì trình duyệt mặc định đã chặn hành động **thả** vào, vì vậy để sử dụng được sự kiện này thì sử dụng `preventDefault` là được, nhưng cho vào đâu ???

Ở trên mình có một sự kiện là **dragover** được kích hoạt khi phần tử kéo được đi vào bên trong vùng thả hợp lệ, vậy thì chỉ cần xử lý khi phần tử kéo vào nơi được "thả" hợp lệ là được

```html:index.html
<p id="p1" draggable="true" ondragstart="drag(event)">kéo tôi đi</p>
<div class="box" ondrop="drop(event)" ondragover="dragover">
</div>
```
```javascript:script.js
function dragover(event) {
	event.preventDefault();
}
```
Kết quả
{@jsfiddle: https://jsfiddle.net/nguyenquangphu/fd1nLhg6/1/}

# 3. Fetch API
**Fetch API** là một API hỗ trợ việc gửi và nhận các request trong Javascript. API này khá giống **XMLHttpRequest** nhưng nó mạnh mẽ và linh hoạt hơn, việc sử lý với các response cũng dễ dàng

**Fetch API** cũng cung cấp cho chúng ta các khái niệm khác liên quan đến request như CORS hay HTTP Origin header. Việc tạo một request với API này khá dễ dàng khi chỉ cần sử dụng phương thức `fetch()` đã tích hợp sẵn trong rất nhiều các interfaces khác nhau đặc biệt là `Window` và `WorkerGlobalScope`, vì vậy có thể sử dụng phương thức này ở hầu hết các trường hợp cần gọi API.

Phương thức `fetch()` yêu cầu một tham số duy nhất đó là đường dẫn tới nơi mà bạn muốn gọi API tới

```javascript
fetch(url)
```

Phương thức `fetch()` sẽ trả về một `Promise`, nếu trạng thái của `Promise` là `resolve`, đoạn code bên trong phương thức `then()` sẽ được thực thi, bên trong function này chúng ta thường thực thi các đoạn code để xử lý dữ liệu trả về. 

Một `response` trả về là một thực thể của [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, để xử lý việc lấy dữ liệu đã có sẵn các phương thức củab [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body). Vì Response `implement` Body, nên chúng ta có thể truy xuất dữ liệu từ response bằng các gọi tới các hàm trong Body.

Khi việc gọi API bằng phương thức `fetch()` gặp lỗi, lúc này Promise trả về trạng thái là `reject`, lúc này phương thức `catch()` sẽ được gọi tới để xử lý các ngoại lệ.

Cấu trúc cơ bản của `Fetch API` như thế này
```javascript
fetch(url)
.then(function() {

})
.catch(function() {

});
```

Mặc định phương thức `fetch()` sử dụng GET method, còn nếu muốn sử dụng các method khác như POST chúng ta cần truyền thêm một tham số thứ hai là một object, bên trong object này chứa các định nghĩa cho một request được viết dưới dạng `key: value`, `key` ở đây có thể là `method, body, headers, cache`...

Ví dụ
```javascript
fetch(url, {
    method: POST,
    body: formData,
    headers: new Headers({'Content-Type' : 'image/jpeg', 'X-My-Custom-Header' : 'Zeke are cool'})
}).then(function() {
}).catch(function() {
})
```
Game là dễ nhỉ
# Kết luận
Trên đây là những API mà mình thấy khá phổ biến được xử dụng trong các trang web mà mìn muốn chia sẻ với các bạn. Mặc dù các API này ở các framework hầu như đã có các thư viện để xử lý nhưng mình nghĩ đây vẫn là những thứ nên biết.

Nếu bài viết hay, hãy tặng mình 1 upvote nhé :rofl::kissing_heart::rofl::kissing_heart: