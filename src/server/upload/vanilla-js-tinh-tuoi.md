## 1. Yêu cầu
Yêu cầu bài toán là người dùng nhập năm sinh vào ô input, khi click vào button thì tính tuổi của họ. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/f1e42bfb-edc1-43ed-a318-3181e5399fc1.gif)

## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Project: tính tuổi</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
</head>
<body>
  <div class="container">
    <h1 class="mt-5 mb-3">Nhập năm sinh của bạn</h1>
    <div class="input-group">
      <input type="text" class="form-control">
      <div class="input-group-append">
        <button class="btn btn-primary">Tính tuổi</button>
      </div>
    </div>
    <p id="result1"></p>
    <p id="result2"></p>
    <p id="result3"></p>
  </div>
  <script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Lấy ra năm hiện tại
* Lấy năm sinh mà người dùng nhập vào
* Tính tuổi = năm hiện tại - năm sinh
* In kết quả

## 4. Javascript
* **Step 1:** Đặt biến để lưu các thẻ html mình cần, ở đây gồm có input để lấy năm sinh, button để click và các thẻ html để in kết quả
* **Step 2:** Lắng nghe sự kiện click của thẻ button
* **Step 3:** Lấy ra năm hiện tại `currentYear`
* **Step 4:** Lấy năm sinh người dùng nhập vào `birthYear`, lưu ý những giá trị này là string nên cần chuyển sang number
* **Step 5:** Tính tuổi = `currentYear - birthYear`
* In kết quả
```js
// step 1
const ipnElement     = document.querySelector('input')
const btnElement     = document.querySelector('button')
const resultElement1 = document.querySelector('#result1')
const resultElement2 = document.querySelector('#result2')
const resultElement3 = document.querySelector('#result3')

// step 2
btnElement.addEventListener('click', function() {
  // step 3
  const currentYear = new Date().getFullYear()
  // step 4
  const birthYear = Number(ipnElement.value)
  // step 5
  const age = currentYear - birthYear
  // step 6
  resultElement1.innerHTML = `Năm hiện tại: ${currentYear}`
  resultElement2.innerHTML = `Năm sinh: ${birthYear}`
  resultElement3.innerHTML = `Tuổi của bạn: ${currentYear} - ${birthYear} = ${age} tuổi`
})
```
## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/t7dv1uyj/4/embed/result,html,js/dark}

## 6. Yêu cầu nâng cao
Ở trên cơ bản chúng ta đã giải quyết xong bài toán nhưng vẫn còn nhiều thứ cần được hen đồ (handle)

**Bug 1:**
- Năm hiện tại: 2020
- Input: không nhập gì cả và click luôn vào button
- Kết quả: **2020 - NaN = NaN tuổi**
- Nguyên nhân: người dùng không nhập giá trị gây ra lỗi
- Mong đợi kết quả: **Vui lòng nhập năm sinh của bạn.**

**Bug 2:**
- Năm hiện tại: 2020
- Nhập input: **3000**
- Kết quả: **2020 - 3000 = -980 tuổi**
- Nguyên nhân: năm sinh người dùng nhập vào lớn hơn năm hiện tại gây ra lỗi
- Mong đợi kết quả: **Năm sinh không được lớn hơn năm hiện tại, vui lòng nhập lại.**


**Bug 3:**
- Năm hiện tại: 2020
- Nhập input: **-1000**
- Kết quả: **2020 - - 1000 = 3020 tuổi**
- Nguyên nhân: năm sinh người dùng nhập vào là số âm
- Mong đợi kết quả: **Năm sinh không được nhỏ hơn 0, vui lòng nhập lại.**


**Bug 4:**
- Năm hiện tại: 2020
- Nhập input: **1020**
- Kết quả: **2020 - 1020 = 1000 tuổi**
- Nguyên nhân: theo ý kiến chủ quan của mình thì chưa thấy ai trên 150 tuổi cả nên trường hợp này cho vào lỗi
- Mong đợi kết quả: **Hệ thống chỉ ghi nhận người tối đa là 150 tuổi, vui lòng nhập lại.**

**Bug 5:**
- Năm hiện tại: 2020
- Nhập input: **kentrung**
- Kết quả: **2021 - NaN = NaN tuổi**
- Nguyên nhân: người dùng nhập không đúng định dạng
- Mong đợi kết quả: **Năm sinh không đúng định dạng, vui lòng nhập lại.**


**Bug thứ N: ...**

Nói chung ở step 4 chúng ta mới chỉ lấy dữ liệu từ input và chuyển nó thành kiểu number để tính toán, sẽ cần có step 4.5 làm nhiệm vụ kiểm tra tính hợp lệ của dữ liệu, không nên tin bất cứ cái gì người dùng nhập vào, đủ các thứ linh tinh hổ lốn, trên rắn dưới nát, thập cẩm lòng mề... Trường hợp nhập đúng năm chỉ là happy case mà thôi.

-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://vanilla-js-age-calculation.kentrung.repl.co)
* [Code online](https://replit.com/@kentrung/vanilla-js-age-calculation)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256