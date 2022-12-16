## 1. Yêu cầu

Yêu cầu bài toán là khi click vào button thì bật tắt bóng đèn. Thực ra là mình đã có sẵn hai ảnh bóng đèn lúc bật lúc tắt rồi, khi click thì ta chỉ việc thay đổi ảnh là xong. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/34399eeb-5d52-4372-a53b-6cad2dcc9041.gif)

## 2. Giao diện HTML - CSS

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Project</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
</head>
<body>
  <div class="text-center mt-5">
    <div class="mb-5">
      <img src="off.jpg" class="img-thumbnail" alt="" />
    </div>
    <button class="btn btn-primary">Bật đèn</button>
  </div>
  <script> // code Javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính

Khi click vào button thì ta thay đổi đường dẫn bức ảnh từ 
```html
<img src="off.jpg" />
```
thành 
```html
<img src="on.jpg" />
```

## 4. Javascript

* **Step 1:** Đặt biến để lưu trạng thái là đang bật hay tắt bóng đèn. Mặc định ban đầu là tắt nên ta cho **statusLight = false**
* **Step 2:** Đặt biến để lưu các thẻ html mình cần, ở đây là thẻ img và thẻ button
* **Step 3:** Khi click vào button thì **thay đổi giá trị src** của thẻ img từ **off.jpg** sang **on.jpg** hoặc ngược lại
* Lưu lại trạng thái ẩn hay hiện để lần sau tính toán
* Chuyển chữ trong button tương ứng để giúp người dùng dễ hiểu
* Dưới đây là toàn bộ code JS
```js
// step 1
let statusLight = false

// step 2
const imgElement = document.querySelector('img')
const btnElement = document.querySelector('button')

// step 3
btnElement.addEventListener('click', function() {
  imgElement.src       = statusLight ? 'off.jpg' : 'on.jpg'
  btnElement.innerText = statusLight ? 'Bật đèn' : 'Tắt đèn'
  statusLight          = !statusLight
})
```
## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/c5zxjg67/13/embed/result,html,js/dark}

## 6. Yêu cầu nâng cao

Bài này cũng khá dễ không có yêu cầu gì cao siêu, các bạn có thể tự viết lại code để quen code Javascript nhé.


-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://project-js-toggle-light--kentrung.repl.co/) 
* [Code online](https://repl.it/@kentrung/Project-JS-toggle-light)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256