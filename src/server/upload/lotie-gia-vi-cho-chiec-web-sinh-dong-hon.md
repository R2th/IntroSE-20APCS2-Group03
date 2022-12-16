Lottie là một thư viện dành cho cả Android, iOS, Web và Windows phân tích cú pháp các hoạt ảnh Adobe After Effects được xuất dưới dạng json với Bodymovin và hiển thị chúng nguyên bản trên thiết bị di động và trên web. Nhưng mình làm web nên chỉ nói liên quan web thui nha.

Có thể tạo và gửi các hình ảnh động đẹp mắt mà không cần dev hì hục code bục mặt nữa. Kiểu như mấy ảnh tung tăng này nè
![](https://images.viblo.asia/f9f0cc49-a199-411f-8de4-0b8a2cb2daac.gif)

Tất cả các hoạt ảnh trên đều được tạo trong After Effects và có thể được xuất sang Lottie bằng cách sử dụng plugin Bodymovin hoặc plugin LottieFiles cho After Effects và được hiển thị nguyên bản mà không cần thêm nỗ lực kỹ thuật nào.

## 1. Bắt đầu nào
Bodymovin có thể hiển thị các tệp Lottie JSON trên web.

Đầu tiên, lấy thư viện javascript trình phát bodymovin. Nó được lưu trữ tĩnh tại https://cdnjs.com/libraries/bodymovin hoặc bạn có thể tải javascript trực tiếp bằng cách nhấp Get Player nha.

Add zô html ạ
```html
<script src="js/bodymovin.js" type="text/javascript"></script>
<!-- OR -->
<script src="https://cdnjs.com/libraries/bodymovin" type="text/javascript"></script>
```

Bodymovin cũng có sẵn trên npm và bower.

Sau đó, phát hoạt ảnh đơn giản như:

```js
var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'data.json', // Required
  renderer: 'svg/canvas/html', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Hello World", // Name for future reference. Optional.
})
```
## 2. Cài đặt trình phát HTML

### URL tĩnh
Hoặc bạn có thể sử dụng tệp script từ đây: https://cdnjs.com/libraries/lottie-web

### Từ phần Extension
Hoặc tải trực tiếp từ plugin AE bằng cách nhấp vào Get Player

### lottie light
Phần mở rộng bao gồm phần mở rộng `lottie_light.js` sẽ phát các hoạt ảnh được xuất dưới dạng svgs.

### NPM
```npm install lottie-web```

### Bower
```bower install lottie-web```


## 3. Cách dùng

Gọi `lottie.loadAnimation()` để bắt đầu hoạt ảnh. Nó nhận một đối tượng làm tham số duy nhất với:

* **animationData**: một Đối tượng với dữ liệu hoạt ảnh đã xuất.
* **path:** đường dẫn tương đối đến đối tượng hoạt hình. (animationData và đường dẫn loại trừ lẫn nhau)
* **loop:** true / false / number
* **autoplay:** true / false nó sẽ bắt đầu phát ngay khi nó sẵn sàng
* **name**: tên hoạt hình để tham khảo trong tương lai
* **renderer**: 'svg' / 'canvas' / 'html' để đặt trình kết xuất
* **container**: phần tử dom để hiển thị hoạt ảnh

Nó trả về phiên bản hoạt ảnh mà bạn có thể kiểm soát bằng play, pause, setSpeed, v.v.
```js
lottie.loadAnimation({
  container: element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // the path to the animation json
});
```
Các trường hợp hoạt ảnh có các phương thức chính sau:

* **anim.play()**
* **anim.stop()**
* **anim.pause()**
* **anim.setLocationHref(locationHref)** -- một tham số thường được truyền dưới dạng `location.href`. Nó hữu ích khi bạn gặp sự cố trong safari nơi url của bạn không có `#`.
* **anim.setSpeed(speed)** -- một tham số (1 là tốc độ bình thường)
* **anim.goToAndStop(value, isFrame)** param đầu tiên là một giá trị số. tham số thứ hai là một boolean xác định thời gian hoặc khung cho tham số đầu tiên
* **anim.goToAndPlay(value, isFrame)** param đầu tiên là một giá trị số. tham số thứ hai là một boolean xác định thời gian hoặc khung cho tham số đầu tiên
* **anim.setDirection(direction)** -- một tham số direction (1 là direction bình thường.)
* **anim.playSegments(segments, forceFlag)** -- tham số đầu tiên là một mảng đơn hoặc nhiều mảng có hai giá trị mỗi mảng (fromFrame, toFrame), tham số thứ hai là boolean để buộc phân đoạn mới ngay lập tức
* **anim.setSubframe(flag)** -- Nếu false, nó sẽ để nguyên original AE fps. Nếu đúng, nó sẽ cập nhật nhiều nhất có thể. (đúng theo mặc định
* **anim.destroy()**

lottie có 8 method chính:

* **lottie.play()** -- với option `name` để nhắm target với một hoạt ảnh cụ thể
* **lottie.stop()** -- với option `name` để nhắm target với một hoạt ảnh cụ thể
* **lottie.setSpeed()** -- tốc độ tham số đầu tiên (1 là tốc độ bình thường) - với option `name` để nhắm mục tiêu một hoạt ảnh cụ thể
* **lottie.setDirection()** -- tham số directino đầu tiên (1 là direction bình thường.) - với option `name`  để nhắm mục tiêu một hoạt ảnh cụ thể
* **lottie.searchAnimations()** -- tìm kiếm các phần tử có lớp "lottie"
* **lottie.loadAnimation()** -- Đã giải thích ở trên. trả về một instance hoạt ảnh để điều khiển riêng lẻ.
* **lottie.destroy()** -- Để xóa và giải phóng tài nguyên. DOM được làm trống
* **lottie.registerAnimation()**-- bạn có thể đăng ký một phần tử trực tiếp với registerAnimation. Nó phải có thuộc tính "data-animation-path" trỏ đến url data.json
* **lottie.setQuality()** -- mặc định 'high', đặt 'high', ' medium', 'low' hoặc một số > 1 để cải thiện hiệu suất trình phát. Trong một số hoạt ảnh thấp nhất là 2 sẽ không hiển thị bất kỳ sự khác biệt nào.

## 4. Event
* onComplete
* onLoopComplete
* onEnterFrame
* onSegmentStart

**Bạn cũng có thể sử dụng addEventListener với các sự kiện sau:**

* complete
* loopComplete
* enterFrame
* segmentStart
* config_ready (when initial config is done)
* data_ready (when all parts of the animation have been loaded)
* DOMLoaded (when elements have been added to the DOM)
* destroy

#### Các tùy chọn khác

##### Nếu bạn muốn sử dụng canvas hiện có để vẽ, bạn có thể chuyển một đối tượng bổ sung: 'render' với cấu hình sau:
```js
lottie.loadAnimation({
container: element, // the dom element
renderer: 'svg',
loop: true,
autoplay: true,
animationData: animationData, // the animation data
rendererSettings: {
  context: canvasContext, // the canvas context
  scaleMode: 'noScale',
  clearCanvas: false,
  progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
  hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
}
});
```
Nếu như này, bạn sẽ phải xử lý việc xóa canvas sau mỗi frame nha

Một cách khác để tải hoạt ảnh là thêm các thuộc tính cụ thể vào một phần tử dom. Bạn phải bao gồm một div và đặt lớp của nó thành lottie. Nếu bạn làm điều đó trước khi tải trang, nó sẽ tự động tìm kiếm tất cả các thẻ có lớp "lottie". Hoặc bạn có thể gọi `lottie.searchAnimations()` sau khi tải trang và nó sẽ tìm kiếm tất cả các phần tử có lớp là "lottie".

* thêm `data.json` vào một thư mục liên quan đến html
* tạo một div chứa hoạt ảnh.

Cần thiết

* một lớp học được gọi là "lottie"
* thuộc tính "data-animation-path" với đường dẫn tương đối đến data.json

Không bắt buộc

* thuộc tính "data-anim-loop"
* thuộc tính "data-name" để chỉ định tên để nhắm mục tiêu các điều khiển chơi cụ thể

Thí dụ
```html
<div style="width:1067px;height:600px" class="lottie" data-animation-path="animation/" data-anim-loop="true" data-name="ninja"></div>
```


source: https://airbnb.io/lottie/#/web?id=usage