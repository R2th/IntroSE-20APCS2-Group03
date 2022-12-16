###### Sau đây mình xin hướng dẫn cách tạo một Bouncing Page Loader giống như hình bên trên, ta có thể làm theo cách sau:
<hr>

### :small_orange_diamond: HTML

- Đầu tiên, hãy viết HTML cơ bản cho project của bạn
```html
<p>Hello world!</p>

<div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>
```
- Ta sẽ thêm một `div` mới với class là `loader`.   `div` này chịu trách nhiệm cho thằng `loader` trên trang của mình. Trong `div` này, ta  thêm ba thẻ `span` liên tiếp, mỗi thẻ đại diện cho vòng tròn trên trình tải trang.

<hr>

### :small_orange_diamond: CSS Style
- Trước tiên hãy tạo style cho các thẻ cơ bản của chúng ta.
```css
body {
  background: #2C294F;
  padding: 2rem;
}

p {
  color: white;
  text-align: center;
}
```
- Đoạn code trên xác định các kiểu CSS tùy chọn cho thẻ `p` và `body`

##### :small_red_triangle_down: Tạo style cho class loader
- Tiếp theo, ta tạo style cho thằng `loader` của mình với các thuộc tính sau:
```css
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
- Ở đây ta sử dụng [Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) (`display: flex;`). Thuộc tính để đặt `bouncing page loader` của mình ở giữa trang theo chiều ngang và chiều dọc.
```css
.loader > span {
  background: #FAD000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
}

.loader > span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > span:nth-child(3) {
  animation-delay: 0.4s;
}
```
- Mỗi vòng tròn sẽ có được tạo style: `width: 1rem;` và `height:1rem;` với màu là `#FFB651`. Theo mặc định, hình dạng `loader` của ta sẽ là hình vuông. Để tạo cho nó một hình tròn, ta đặt `border-radius` thành 50%.
- Ta cũng đã chỉnh lề giữa cho các vòng tròn (`margin: 5rem 0.5rem;`). Tuy nhiên phần thú vị nhất ở đây là thuộc tính `animation`. Chúng ta đang sử dụng một `animation keyframe` được gọi là `bouncingLoader` chạy một lần trong 0,6 giây và cứ thế cứ thế nó lặp đi lặp lại. (Nếu bạn muốn `loader` của mình ở dạng hình vuông, hãy bỏ thuộc tính `border-radius` đi)

![](https://images.viblo.asia/c182781b-2cdf-408d-bf7c-82ecfd962483.gif)

<hr>

### :small_orange_diamond: Tạo Animation Keyframe
- `Keyframes`  được sử dụng để định nghĩa cách hoạt động của `animation` mà mình đang tạo và cung cấp cho ta quyền kiểm soát hoàn toàn một chu kỳ của `animation` trong CSS. Chúng tôi định nghĩa nó là `@keyframes`  theo sau là tên của `animation`trong trường hợp này là  `bouncingLoader` .
- Bên trong `@keyframe`, ta sử dụng các từ khóa `from` và `to` để chỉ định điểm bắt đầu và điểm kết thúc cho `animation` của mình. Ta cũng có thể sử dụng `0%` cho `from` để từ đó mô tả điểm bắt đầu và `100%` cho `to` để mô tả điểm kết thúc cho `animation`.
- Nếu ta muốn một vài hiệu ứng chuyển tiếp, ta có thể xác định một phạm vi tỷ lệ phần trăm, mỗi phần chứa danh sách các tùy chọn mà ta cần. Các tỷ lệ phần trăm này có thể được liệt kê theo bất kỳ thứ tự nào cùng với sự khác biệt giữa chúng. Ví dụ:
```css
@keyframes animationExample {
  0% { opacity: 1; }
  30% { opacity: 0.75; }
  50% { opacity: 0.5; }
  100% { opacity: 0.25; }
}
```
 - Quay trở lại bài viết, ta sẽ viết `keyframe` cho thằng `loader` của mình
 ```css
 @keyframes bouncingLoader {
  from {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
  }
  to {
    width: 1rem;
    height: 1rem;
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
```
- Ta sử dụng các từ khóa `from` và `to` để xác định các thuộc tính kiểu dáng cơ bản về chiều rộng, chiều cao và độ mờ của các vòng tròn. Ngoài ra, để tạo hiệu ứng `bouncing`, ta sử dụng thuộc tính `transform` CSS để thay đổi tọa độ của một phần tử đã cho để chuyển đổi vị trí của mỗi vòng tròn.
- Với thuộc tính `transform` này, ta đã sử dụng hàm `translate3D()` có ba đầu vào là các tọa độ x, y, z. Vì ta muốn trình tải của mình chạy theo chuyển động sóng, nên ta cần dịch chủ yếu theo trục y và giữ cho trục x và z không đổi. Do đó, giá trị điểm kết thúc của ta là `(0, -1rem, 0)`.
- Nếu ta đặt giá trị điểm kết thúc của mình là biến đổi: `translate3d (1rem, 0rem, 1rem);`. Điều đó có nghĩa là ta đang chuyển đổi nó dọc theo trục x và z trong khi giữ cho trục y của ta không đổi. Nó sẽ thành như thế này:\

![](https://images.viblo.asia/72d5786b-1e11-40ca-a056-ef8964f758c1.gif)

##### :small_red_triangle_down: Sử dụng Animation Delay với Keyframe
- Vì ta đã viết mã cho `@keyframe` của mình nên bây giờ ta sẽ thiết lập và chạy nó.
```css
.loader > span {
  background: #FAD000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
}
```
- Ta định kiểu phần tử ta muốn tạo hiệu ứng với thuộc tính `animation` cộng với việc có thể có hoặc không có thuộc tính phụ cho nó. Sử dụng thuộc tính này, ta có thể kiểm soát `timing, duration` và các chi tiết khác của `animation`. Ví dụ:
```css
animation: animation-name, animation-duration, animation-iteration-count, animation-direction;
/*animation-name: Xác định tên của animation của mình, trong trường hợp của ta là thằng loader*/
/*animation-duration: cấu hình thời lượng mà animation của mình sẽ mất để hoàn thành một chu kỳ*/
/*animation-iteration-count: Cho biết số lần ta muốn chu kỳ animation của mình phát trước khi dừng*/
/*animation-direction: Xác định rằng animation của mình sẽ phát theo hướng nào*/
```
OK, trên đây là cách mình tạo ra một Bouncing Page Loader. Cảm ơn các bạn đã đọc bài viết này!

##### Tài liệu tham khảo:
[Bouncing Page Loader](https://scotch.io/tutorials/create-a-bouncing-page-loader-with-css3-animations#toc-creating-animation-keyframe)