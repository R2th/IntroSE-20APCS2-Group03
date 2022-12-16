Bạn là một Web Developer. Khi nghe các đồng nghiệp code Native nói về công nghệ AR (Augmented Reality), bạn thấy rất thú vị và muốn thử nó nhưng việc phải học code Native cũng là một trở ngại. Sau đây với thư viện này bạn không cần phải học code Native mà vẫn có thể dễ dàng viết một ứng dụng AR bằng HTML và JS.

# Giới thiệu về AR.js

[AR.js](https://github.com/jeromeetienne/AR.js/blob/master/README.md) là một giải pháp ứng dụng AR hiệu quả trên nền tảng Web. Nó chạy 100% trên web browser, có nghĩa là không cần phải cài ứng dụng. Không cần một thiết bị cụ thể, nó có thể chạy trên hầu hết các nền tảng di động như: Android, iOS, Windows Phone. Bạn có thể sử dụng nó ngay trên thiết bị di động của bạn.

Tùy thuộc vào thiết bị của bạn, nó có thể chạy rất nhanh, lên đến 60fps trên những chiếc điện thoại trên 2 năm tuổi (nexus6p)! Mã nguồn mở và tất cả đều có sẵn trên [github](https://github.com/jeromeetienne/AR.js).

# Thử chạy một ứng dụng AR.js trên điện thoại

Như đã nói, nó chạy trên tất cả các nền tảng di động thông minh. Android, IOS và window phone. Nó chạy trên bất kỳ trình duyệt với WebGL và WebRTC. (Trên IOS, Bạn cần cập nhật lên ios11)

Để thử, bạn cần làm 2 bước:

1. Mở hình [hiro marker](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg) này trên trình duyệt máy tính.
2. Mở [ứng dụng AR](https://jeromeetienne.github.io/AR.js/three.js/examples/mobile-performance.html)  trên trình duyệt điện thoại.

Vậy là xong. Bạn hãy sử dụng camera và soi vào hình [hiro marker](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg), bạn sẽ thấy như dưới đây.

![](https://cloud.githubusercontent.com/assets/252962/23072106/73a0656c-f528-11e6-9fcd-3c900d1d47d3.jpg)

# Viết ứng dụng AR ít hơn 10 dòng code bằng HTML và JS

Đây là ví dụ về một ứng dụng AR chưa tới 10 dòng code.

```html
<script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js"></script>
<body style='margin : 0px; overflow: hidden;'>
	<a-scene embedded arjs='sourceType: webcam;'>
		<a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
		<a-marker-camera preset='hiro'></a-marker-camera>
	</a-scene>
</body>
```

Xem trên [codepen](https://codepen.io/jeromeetienne/pen/mRqqzb) hoặc [bl.ocks.org](https://bl.ocks.org/jeromeetienne/feeb69257803e69f18dc3ea5f4fc6d71).

Chúng ta sẽ break down nó để dễ hiểu hơn.

## Đầu tiên là include các libraries

```html
<script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js"></script>
```

Đầu tiên, bạn include [a-frame](https://aframe.io/), một nỗ lực do MozillaVR khởi xướng để xây dựng trải nghiệm VR. A-frame chứa [three.js](https://threejs.org/). Sau đó bạn include [AR.js]( cho a-frame. AR.js will make the 3d displayed in AR run very fast on your phone, even if it’s a 2–3 year old phone!

## Thẻ body

```html
<body style='margin : 0px; overflow: hidden;'>
</body>
```

Trong bước này, tất cả đều là công việc như bình thường. Bạn thêm thẻ body, giống như bạn sẽ làm trong tất cả các trang HTML.

## Tạo một 3d Scene

```html
<a-scene embedded arjs='sourceType: webcam;'>
	<!-- Đặt các nội dung 3d vào đây -->
</a-scene>
```

Tiếp theo, chúng ta sẽ tạo a-frame scene của chúng ta. Chúng ta cũng cần thêm thành phần ARToolkit. [ARToolKit](https://artoolkit.org/) là một thư viện mã nguồn mở mà chúng ta sử dụng để localize nó thông qua camera phone.

## Tạo nội dung đơn giản

```html
<a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
```

Khi chúng ta đã tạo 3d scene, chúng ta có thể bắt đầu thêm các đối tượng vào nó. Trong dòng này, chúng ta thêm một box đơn giản. Sau đó chúng ta sửa material để cho nó trở nên transparent (trong suốt). Chúng ta cũng thay đổi position của nó để nó hiển thị lên trên AR marker.

## Thêm vào AR Camera

```html
<a-marker-camera preset='hiro'></a-marker-camera>
```

Trong bước cuối cùng này, chúng ta sẽ thêm một camera. Chúng ta cũng include preset 'hiro' (sử dụng [Hiro marker](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg) như ví dụ đầu tiên). Cuối cùng, hãy đem nó lên điện thoại của bạn. Dễ dàng phải không?

Chúc mừng bạn đã hoàn thành việc viết một ứng dụng AR chưa đến 10 dòng code bằng HTML và JS. 

Bài viết tham khảo các nguồn:
 - [Github AR.js](https://github.com/jeromeetienne/AR.js)
 - [Augmented Reality in 10 Lines of HTML](https://medium.com/arjs/augmented-reality-in-10-lines-of-html-4e193ea9fdbf)