Dưới đây là một số mẹo nhỏ mình thấy đôi khi khá hữu ích, hãy học cùng mình nha:

### 1. Quickly hide
Để ẩn một phần tử DOM, chúng ta không cần sử dụng JavaScript, chủ cần sử dụng thuộc tính HTML ``hidden``.
Thuộc tính này có tác dụng tương tự như style css với ``display: none``.

### 2. Xác định vị trí với thuộc tính ``position`` rút gọn
Mọi người có biết thuộc tính ``inset`` trong css không ? Nó là viết tắt của top, left, right và bottom.
Cùng xem ví dụ này nhá:
```css
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
Việc sử dụng syntax rút gọn kiểu này giúp giảm kích thước của file, ngoài ra giúp code trông gọn gàng hơn.

### 3. Xác định tốc độ Internet
Chúng ta có thể xác định tốc độ internet của người dùng với Web APIS Navigator:
```javascript
Navigator.connection.downlink;
```
Nó sẽ trả về ước tính băng thông tính bằng megabit / giây,

### 4. Làm rung thiết bị di động với JS
Phương thức ``vibrate`` của ``window.navigator`` cho phép bật chế độ rung trên thiết bị di động.

```javascript
window.navigator.vibrate(500);
```

Chúng ta có thể truyền vào ``vibrate`` với một số hoặc một mảng, với đơn vị là milisecond.

Tham khảo: https://viblo.asia/p/lam-rung-thiet-bi-di-dong-voi-javascript-vyDZOweRZwj

### 5. Chặn việc "kéo xuống để làm mới/tải lại"
Kéo xuống để làm mới là tính năng trên thiết bị di động. Nếu muốn chặn tính năng đó, chúng ta có thể làm bằng cách sử dụng CSS với thuộc tính ``overscroll-behavior-y``:
```css
body {
  overscroll-behavior-y: contain;
}
```

Cảm ơn mọi người đã dành thời gian học cùng mình :kissing_heart: