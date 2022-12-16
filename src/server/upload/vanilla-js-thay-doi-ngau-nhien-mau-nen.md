## 1. Yêu cầu
* Yêu cầu thứ nhất là khi click vào button thì thay đổi màu nền ngẫu nhiên trong một danh sách các mã màu cho trước. 
* Yêu cầu thứ hai là màu sau không trùng với màu trước.
* Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.


![](https://images.viblo.asia/6db1ef85-b27e-4ef8-a301-6aff9b48a5ef.gif)

## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS: Random color</title>
  <!-- bootstrap 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
  <style>
    body {width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;}
  </style>
</head>
<body>
  <button class="btn btn-primary">Thay đổi ngẫu nhiên màu nền</button>
  <script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Lấy mã màu hiện tại
* Lọc danh sách mã màu đã loại bỏ màu ở trên 
* Lấy màu ngẫu nhiên trong danh sách đã lọc (easy game)


## 4. Javascript
* **Step 1:** Đặt biến lưu giá trị màu hiện tại, mặc định lúc đầu có thể đặt là transparent

```js
let currentColor = 'transparent'
```
* **Step 2:** Cho danh sách các mã màu cho sẵn
```js
const listColors = ['red', 'orange', 'yellow', 'blue', 'green', 'cyan', 'violet']
```
* **Step 3:** Viết hàm làm 3 nhiệm vụ: 
* Lọc danh sách đã loại trừ màu `currentColor`
* Lấy màu ngẫu nhiên trong danh sách trên
* Lưu `currentColor` bằng màu ngẫu nhiên đó
* Trả về giá trị màu ngẫu nhiên
```js
function getRandomColorExcept(previousColor) {
  const listColorsFiltered = listColors.filter(color => color !== previousColor)
  randomColor = listColorsFiltered[Math.floor(Math.random() * listColorsFiltered.length)]
  currentColor = randomColor
  return randomColor
}
```

* **Step  4** Lắng nghe sự kiện click của thẻ button, mỗi lần click sẽ lấy màu ngẫu nhiên ở step 3 và gán màu cho background
* Dưới đây là toàn bộ code JS
```js
// step 1
let currentColor = 'transparent'

// step 2
const listColors = ['red', 'orange', 'yellow', 'blue', 'green', 'cyan', 'violet']

// step 3
function getRandomColorExcept(previousColor) {
  const listColorsFiltered = listColors.filter(color => color !== previousColor)
  randomColor = listColorsFiltered[Math.floor(Math.random() * listColorsFiltered.length)]
  currentColor = randomColor
  return randomColor
}

// step 4
const btnElement = document.querySelector('button')
const bodyElement = document.querySelector('body')

btnElement.addEventListener('click', function() {
  bodyElement.style.backgroundColor = getRandomColorExcept(currentColor)
})
```

## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/uba9nfy2/1/embed/result,html,css,js/dark}

-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://Vanilla-JS-Random-color.kentrung.repl.co)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Random-color)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256