## 1. Yêu cầu
Yêu cầu bài toán là người dùng nhập năm Dương Lịch vào ô input, khi click vào button thì chuyển năm đó sang Âm Lịch. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/54b1e9b2-6e20-400f-b33a-b5f291970974.gif)


## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Vanilla JS: Solar calendar to Lunar calendar</title>
    <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
</head>
<body>
	<div class="container">
	  <h2 class="mt-5 mb-3">Chuyển Dương Lịch sang Âm Lịch</h2>
	  <div class="input-group mb-2">
	    <input type="text" class="form-control" placeholder="Nhập năm dương lịch">
	    <div class="input-group-append">
	      <button class="btn btn-primary">Chuyển</button>
	    </div>
	  </div>
	  <p id="result1"></p>
	  <p id="result2"></p>
	</div>
	<script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Lấy năm Dương Lịch mà người dùng nhập vào
* Bấm đốt ngón tay dễ dàng ta tính ra được năm Âm Lịch ^^
* In kết quả
* Đùa vậy thôi, ta có năm Âm Lịch là từ có 2 chữ được ghép từ **CAN** và **CHI**
* Cách tính **CAN** thì lấy năm Dương chia lấy dư cho 10, phần dư so sánh bảng dưới
* Cách tính **CHI** thì lấy năm Dương chia lấy dư cho 12, phần dư so sánh bảng dưới

| Số dư | CAN | CHI |
| -------- | -------- | -------- |
| 0  | Canh   | Thân |
| 1  | Tân    | Dậu  |
| 2  | Nhâm   | Tuất |
| 3  | Quý    | Hợi  |
| 4  | Giáp   | Tí   |
| 5  | Ất     | Sửu  |
| 6  | Bính   | Dần  |
| 7  | Đinh   | Mão  |
| 8  | Mậu    | Thìn |
| 9  | Kỷ     | Tỵ   |
| 10 | &nbsp; | Ngọ  |
| 11 | &nbsp; | Mùi  |




## 4. Javascript
* **Step 1:** Đặt biến để lưu các thẻ html mình cần, ở đây gồm có input để lấy năm người dùng nhập vào, button để click và các thẻ html để in kết quả
* **Step 2:** Lắng nghe sự kiện click của thẻ button
* **Step 3:** Lấy năm Dương người dùng nhập vào `solarYear`, lưu ý những giá trị này là string nên cần chuyển sang number
* **Step 4:** Viết hàm convert năm Dương sang năm Âm
* **Step 5:** In kết quả
```js
// step 1
const ipnElement     = document.querySelector('input')
const btnElement     = document.querySelector('button')
const resultElement1 = document.querySelector('#result1')
const resultElement2 = document.querySelector('#result2')

// step 4
function convertYear(solarYear) {
  if (solarYear < 0) return 'Năm Dương Lịch phải lớn hơn 0'
  if (Number.isNaN(solarYear)) return 'Năm Dương Lịch không đúng định dạng, vui lòng nhập lại'

  let can = 'Không'
  if ((solarYear % 10) >= 0 && (solarYear % 10) <= 9) {
    can = danh_sach_can[solarYear % 10]
  }

  let chi = 'Biết'
  if ((solarYear % 12) >= 0 && (solarYear % 12) <= 11) {
    chi = danh_sach_chi[solarYear % 12]
  }
  return `${can} ${chi}`
}

// step 2
btnElement.addEventListener('click', function() {
  // step 3
  const solarYear = Number(ipnElement.value)

  // step 5
  resultElement1.innerHTML = `Năm dương lịch: <b>${solarYear}</b>`
  resultElement2.innerHTML = `Năm âm lịch: <b>${convertYear(solarYear)}</b>`
})

```
## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/qst7v5mj/36/embed/result,html,js/dark}

## 6. Yêu cầu nâng cao
Ở trên cơ bản chúng ta đã giải quyết xong bài toán nhưng vẫn còn nhiều thứ cần được hen đồ (handle)

**Bug 1:**
- Nhập input: **kentrung**
- Kết quả: **Không Biết**
- Nguyên nhân: người dùng nhập không đúng định dạng
- Mong đợi kết quả: **Năm Dương Lịch không đúng định dạng, vui lòng nhập lại**

**Bug 2:**
- Nhập input: **-2000**
- Kết quả: **Canh Biết**
- Nguyên nhân: người dùng nhập năm âm
- Mong đợi kết quả: **Năm Dương Lịch phải lớn hơn 0**


Nói chung ở step 4 chúng ta mới chỉ lấy dữ liệu từ input và chuyển nó thành kiểu number để tính toán, sẽ cần có step 4.5 làm nhiệm vụ kiểm tra tính hợp lệ của dữ liệu, không nên tin bất cứ cái gì người dùng nhập vào, đủ các thứ linh tinh hổ lốn, trên rắn dưới nát, thập cẩm lòng mề... Trường hợp nhập đúng năm chỉ là happy case mà thôi.

-----

Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://vanilla-js-solar-calendar-to-lunar-calendar.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Solar-calendar-to-Lunar-calendar)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256