## 1. Yêu cầu

Yêu cầu bài toán là người dùng nhập password vào ô input, khi click vào button con mắt bên cạnh thì hiện password này lên. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/cdb3caec-0706-4660-b81e-d3c675397e1c.gif)

## 2. Giao diện HTML - CSS

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Vanilla JS Project: Toggle password visibility</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
  <!-- font awesome 5.13.1 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
</head>
<body>
  <div class="container">
    <h1 class="my-5 text-center">Vanilla JS Project: Toggle password visibility</h1>
    <div class="form-group">
      <label for="ipnPassword">Password</label>
      <div class="input-group mb-3">
        <input type="password" class="form-control" id="ipnPassword" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="btnPassword">
            <span class="fas fa-eye"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <script> // code Javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính

Bình thường khi input để chế độ `type="password"` thì toàn bộ những gì người dùng nhập vào đều được ẩn đi
```html
<input type="password" />
```
Giờ để hiện password lên ta đổi sang `type="text"` là xong

```html
<input type="text" />
```

## 4. Javascript

* **Step 1:** Đặt biến để lưu các thẻ html mình cần, ở đây là thẻ input và thẻ button
* **Step 2:** Lắng nghe sự kiện click vào button
* **Step 3:** Lấy type của input
* **Step 4:** Thay đổi type của input từ password sang text hoặc ngược lại

```js
// step 1
const ipnElement = document.querySelector('#ipnPassword')
const btnElement = document.querySelector('#btnPassword')

// step 2
btnElement.addEventListener('click', function() {
  // step 3
  const currentType = ipnElement.getAttribute('type')
  // step 4
  ipnElement.setAttribute(
    'type',
    currentType === 'password' ? 'text' : 'password'
  )
})
```
## 5. Kết quả

{@embed: https://jsfiddle.net/trungnt256/0r9e4p1u/11/embed/result,html,js/dark/}


## 6. Yêu cầu nâng cao

Ở trên cơ bản chúng ta đã giải quyết xong bài toán, các bạn có thể nâng cao làm thêm một vài yêu cầu nữa như:

* Khi click vào button thì tùy thuộc trạng thái mà ta thay đổi hình icon cho hợp lí như icon nhắm mắt - mở mắt
* Thay đổi kiểu hiện password theo kiểu nhấn và giữ chuột (click and hold) vào icon thì mới hiện pass, bỏ chuột ra thì lại ẩn đi



-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://Vanilla-JS-Toggle-password-visibility.kentrung.repl.co)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Toggle-password-visibility)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256