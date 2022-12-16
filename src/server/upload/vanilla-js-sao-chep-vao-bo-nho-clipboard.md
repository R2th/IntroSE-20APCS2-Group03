## 1. Yêu cầu
Yêu cầu bài toán là khi người dùng click vào button **Copy** thì sẽ lưu giá trị trong ô input bên cạnh vào bộ nhớ thay cho việc người dùng phải nhấn **Ctrl + C** mất thời gian. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.


![](https://images.viblo.asia/ae78ba73-a0a8-4889-9d22-c466ca6d35d6.gif)


## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Project: Copy to clipboard</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
</head>
<body>
  <div class="container">
    <h1 class="my-5 text-center">Copy to clipboard</h1>
    <div>API Key</div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" value="KTp90fd5JSy5M0Kdw3tCFGkUJ_8yC1MoXSs9DE" readonly>
      <div class="input-group-append">
        <button class="btn btn-primary">Copy</button>
      </div>
    </div>
  </div>
  <script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Select những giá trị trong ô input 
* Copy những giá trị đó vào bộ nhớ
* Chuyển chữ trong button từ Copy thành Copied!

## 4. Javascript
* **Step 1:** Đặt biến để lưu các thẻ html mình cần, ở đây gồm có input và button.
* **Step 2:** Lắng nghe sự kiện click của button
* **Step 3:** Chuyển chữ trong button thành Copied!
* **Step 4:** Select những giá trị trong input
* **Step 5:** Lưu giá trị này vào trong bộ nhớ
* Dưới đây là toàn bộ code JS
```js
// step 1
const ipnElement = document.querySelector('input')
const btnElement = document.querySelector('button')

// step 2
btnElement.addEventListener('click', function() {
  btnElement.innerText = 'Copied!' // step 3
  ipnElement.select()              // step 4
  document.execCommand('copy')     // step 5
}) 
```
## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/je3Ldfnt/3/embed/result,html,js/dark}

## 6. Yêu cầu nâng cao
Code ở trên đã áp dụng được với những giá trị nằm trong input một cách dễ dàng nhưng sẽ có lúc đoạn cần copy đó không nằm trong input nên đoạn code ở step 4 sẽ không khả thi.

Cách giải quyết bài toán này đa phần chúng ta sẽ tạo ra textarea tạm thời, chuyển những giá trị cần copy vào trong textarea trên để sử dụng được code ở step 4, xong xuôi đâu đấy rồi thì ta lại xóa textarea tạm thời kia đi.

Nếu bạn có hướng giải quyết khác xin đừng ngần ngại comment cho mọi người cùng thảo luận.

-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://copy-to-clipboard.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Copy-to-clipboard)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256