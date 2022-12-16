# Radio Button HTML
 Radio Input là 1 thành phần HTML thường được sử dụng khá nhiều trong trang web. Hôm nay mình xin giúp thiệu với các bạn về chúng và thực hiện một demo "rating" mà không cần dùng đến javascript. 
 Như vậy có hai cách thích hợp để bố trí các nút radio trong HTML mà mình hay dùng.
Cách thứ nhất `input` được bao ngoài bởi `label`. Điều này hoàn toàn liên kết `label` với `input` và đồng thời làm tăng khu vực để chọn của `input` lên tương đường với diện tích mà `label` đang chiếm giữ.

```html
<label>
  <input type="radio" name="radio" />
  Radio label text
</label>
```
Cách thứ 2 `input` và `label` cùng cấp với nhau. Giá trị `id` của `input` được set cho thuộc thính `for` của `label` để tạo sự liên kết.

```html
<input type="radio" name="radio" id="radio1" />
<label for="radio1">Radio label text</label>
```

Như vậy thì muốn trỏ đến đối tượng để style cho chúng, thì chúng ta làm như sau, ví dụ vài mẫu hay dùng. Áp dụng cho cách 2, nhưng đừng lo lắng tí nữa mình sẽ đề cập cho cách thứ nhất ở phần dưới hehee
```scss
[type="radio"]:not(:checked) + label:after {}

input[type="radio"] {}

input[type="radio"]:checked {}

input[type="radio"]:checked + label {}

input[type="radio"]:checked + label:before {}

input[type="radio"]:focus {}

input[type="radio"]:hover {}

....

```
Với những cách trỏ đến đối tượng style như trên chúng ta hoàn toàn có thể tùy biến radio button một cách vô cùng linh hoạt, với những radio button không cần quá cầu kỳ chúng ta dùng css thôi là đủ, với những radio button độc đáo chúng dùng css kết hợp với image (svg, png, ...)

Và tiếp theo đây mình xin đi đến làm một ví dụ minh họa, nào cùng đi thôi.


# Thực hiện
```html

<div class="card">
  <div class="rating-container">
    <div class="rating-text">
      <p>I'm feeling...</p>
    </div>
    <div class="rating">
      <form class="rating-form">

        <label>
			<input type="radio" name="rating" class="super-happy" value="super-happy" />
			<svg viewBox="0 0 24 24"><path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
			</label>

        <label>
			<input type="radio" name="rating" class="happy" value="happy" checked />
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" /></svg>
			</label>

        <label>
			<input type="radio" name="rating" class="neutral" value="neutral" />
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" /></svg>
			</label>

        <label>
			<input type="radio" name="rating" class="sad" value="sad" />
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" /></svg>
			</label>

        <label>
			<input type="radio" name="rating" class="super-sad" value="super-sad" />
			<svg viewBox="0 0 24 24"><path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" /></svg>
			</label>

      </form>
    </div>
  </div>
</div>

```


```css
.card {
	display: flex;
	margin: auto;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 16, 0.19), 0 0.3rem 0.3rem rgba(0, 0, 16, 0.23);
	background-color: rgb(255, 255, 255);
	padding: 0.8rem;
	width: 33rem;
}

.rating-container {
	display: flex;
	justify-content: space-between;
	padding: 0.4rem 0.8rem;
	width: 100%;
}

.rating-text p {
	color: rgba(0, 0, 16, 0.8);
	font-size: 1.3rem;
	padding: 0.3rem;
}

.rating {
	background-color: rgba(0, 0, 16, 0.8);
	padding: 0.4rem 0.4rem 0.1rem 0.4rem;
	border-radius: 2.2rem;
}

svg {
	fill: rgb(242, 242, 242);
	height: 3.6rem;
	width: 3.6rem;
	margin: 0.2rem;
}

.rating-form-2 svg {
	height: 3rem;
	width: 3rem;
	margin: 0.5rem;
}

#radios label {
	position: relative;
}

input[type="radio"] {
	position: absolute;
	opacity: 0;
}

input[type="radio"] + svg {
	-webkit-transition: all 0.2s;
	transition: all 0.2s;
}

input + svg {
	cursor: pointer;
}

input[class="super-happy"]:hover + svg,
input[class="super-happy"]:checked + svg,
input[class="super-happy"]:focus + svg {
	fill: rgb(0, 109, 217);
}

input[class="happy"]:hover + svg,
input[class="happy"]:checked + svg,
input[class="happy"]:focus + svg {
	fill: rgb(0, 204, 79);
}

input[class="neutral"]:hover + svg,
input[class="neutral"]:checked + svg,
input[class="neutral"]:focus + svg {
	fill: rgb(232, 214, 0);
}

input[class="sad"]:hover + svg,
input[class="sad"]:checked + svg,
input[class="sad"]:focus + svg {
	fill: rgb(229, 132, 0);
}

input[class="super-sad"]:hover + svg,
input[class="super-sad"]:checked + svg,
input[class="super-sad"]:focus + svg {
	fill: rgb(239, 42, 16);
}


```
Tada, vậy là xong, và đây thành quả của chúng ta
![](https://images.viblo.asia/674cdd1d-946c-40bf-a1e8-79d4fce655e6.png)

Mình sẽ giới thiệu sơ về nguyên lý nếu các bạn còn chưa rõ nhé, phần input chúng ta dùng css để ẩn đi tuy nhiên nó vẫn tồn tại, `label` bọc ngoài `input` thì khi  có sự kiện click vào phạm vi `label` đồng nghĩa với click vào `input`, giá trị `:checked` cứ như thế thay đổi. Và khi `input` thay đổi thì ở các trạng thái thì chúng ta css theo ý muốn của mình. Như ví dụ ở trên dùng `fill` đổi màu khác cho ảnh svg
```
input[class="super-happy"]:hover + svg,
input[class="super-happy"]:checked + svg,
input[class="super-happy"]:focus + svg {
	fill: rgb(0, 109, 217);
}
```

Vậy là bài viết của mình đã đến xong, cảm ơn các bạn đã đọc đến đây :fire:
{@embed: https://codepen.io/kh-nh-l/pen/bGpOLGB}

Tham khảo: https://dev.to/5t3ph/pure-css-custom-styled-radio-buttons-3dm5
https://codepen.io/nikkipantony/pen/wpPGZp @nikkipantony