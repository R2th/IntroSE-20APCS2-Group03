Hôm nay mình sẽ chia sẻ một số tip hữu ích cho CSS, Html, Javascript
> Frontend là tuyến phòng thủ đầu tiên của trang web (hoặc chính xác hơn là bộ mặt đầu tiên vào người dùng), vì vậy các developer front-end luôn có rất nhiều việc phải làm.Để giúp các developer dễ dàng hơn trong công việc, chúng tôi đã chọn một số kỹ thuật HTML, CSS và JavaScript hữu ích nhưng không phổ biến lắm.
### 1. Quick hide
Để ẩn phần tử DOM, bạn không cần JavaScript. Một thuộc tính HTML gốc là đủ hidden. Hiệu ứng tương tự như thêm một màn hình display: none;
```
<p hidden>This paragraph is not visible on the page, it is hidden from the HTML.</p>
```
Tất nhiên, thủ thuật này sẽ không hoạt động với pseudo-elements.
### 2. Position quickly
Bạn đã biết đến thuộc tính CSS inset? Đây là một phiên bản viết tắt cho ``top``, ``left`` và ``right`` ``bottom``. Bằng cách tương tự với cú pháp ``margin`` hoặc thuộc tính ``padding``, bạn có thể đặt tất cả thuộc tính của ``position`` cho một phần tử trong một dòng.
```
// Before
div {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

// After
div {
  position: absolute;
  inset: 0;
}
```
Việc sử dụng các cú pháp rút gọn giúp giảm kích thước tệp css, và trông code sạch sẽ hơn.
### 3. Find out your internet speed

Bạn có thể dễ dàng xác định tốc độ internet của người dùng từ JavaScript bằng trình điều hướng  ``navigator``.
```
navigator.connection.downlink;
```
### 4. Enable vibration on your smartphone
Method ``vibrate()`` của ``window.navigator`` có thể bật chế độ rung trên thiết bị di động. Bạn có thể truyền thời gian rung băng mili giây, thậm chí có thể custom các khoảng rung, bằng cách truyền vào một mảng tham số
```
window.navigator.vibrate(500);
```
### 5. Prohibit pull-to-refresh
Pull-to-refresh là mô hình phát triển phổ biến trên di động. Nếu bạn không thích nó, chỉ cần tắt hiệu ứng này bằng thuộc tính css ``overscroll-behavior-y``  với giá trị ``contain``.
```
body {
 overscroll-behavior-y: contain;
}
```
### 6.  Prohibit inserting text
Bạn có thể muốn ngăn người dùng ``paste`` văn bản được sao chép từ đâu đó trong các trường nhập liệu. Điều này rất dễ thực hiện bằng cách theo dõi sự kiện ``paste`` và gọi phương thức của nó ``preventDefault()``.
```
<input type="text"></input>
<script>
  const input = document.querySelector('input');

  input.addEventListener("paste", function(e){
    e.preventDefault()
  })

</script>
```
Những tip trên không được sử dụng thường xuyên, nhưng có thể sẽ hữu ích cho các bạn trong một số tình huống. Hi vọng các bạn sẽ cảm thấy thú vị với nó. :v