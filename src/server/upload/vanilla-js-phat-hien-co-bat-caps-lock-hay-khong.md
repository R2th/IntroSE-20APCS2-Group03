## 1. Yêu cầu

Yêu cầu bài toán là khi người dùng nhập text vào ô input thì kiểm tra xem **Caps Lock** có bật hay không. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript thuần không framework nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/f4b4660e-802e-4402-abce-7c22a3f1d0bb.gif)


## 2. Giao diện HTML - CSS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla JS: Detect Caps Lock</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
</head>
<body>
  <div class="container">
    <h2 class="my-5 text-center">Vanilla JS: Detect Caps Lock</h2>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="mb-3">
          <input type="text" class="form-control" />
        </div>
        <div id="capsLockWarning" class="text-danger"></div>
      </div>
    </div>
  </div>
  <script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính

* Kiểm tra trạng thái của Caps Lock mỗi khi người dùng gõ kí tự vào input

## 4. Javascript

* **Step 1:** Đặt biến để lưu các thẻ html mình cần, ở đây là thẻ input và chỗ hiện ra thông báo
* **Step 2:** Lắng nghe sự kiện keydown khi người dùng gõ kí tự vào input
* **Step 3:** Kiểm tra trạng thái của CapsLock thông qua phương thức [getModifierState](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState) của `KeyboardEvent`, sau đó thay đổi thông báo tương ứng

```js
// step 1
const ipnElement = document.querySelector('input')
const messageElement = document.querySelector('#capsLockWarning')

// step 2
ipnElement.addEventListener('keydown', function (e) {
  // step 3
  if (e.getModifierState('CapsLock')) {
    messageElement.textContent = 'Caps lock is on'
  } else {
    messageElement.textContent = ''
  }
})
```
## 5. Kết quả

{@embed: https://jsfiddle.net/trungnt256/bq8szpch/11/embed/result,html,js/dark/}



-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://vanilla-js-detect-caps-lock.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Detect-Caps-Lock)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256