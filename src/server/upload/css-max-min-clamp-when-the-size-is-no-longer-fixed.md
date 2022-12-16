Chào mọi người, hôm nay mình xin phép được chia sẻ về 3 hàm tính toán đặc biệt trong CSS mà mình vừa mới được học, và có lẽ là 1 trong những hàm mà mình thích nhất :heart_eyes_cat: :rofl: .

## I. The story began:
Là một Front-End dev, đặc biệt trong bối cảnh `mobile first hiện tại`, responsive không còn là 1 điều quá xa lạ, và hiển nhiên những sản phẩm web khi được release, đều phải đáp ứng được yêu cầu này. 

Trong những dự án hiện tại, hầu như mình luôn phải code BEMCSS, và khi responsive, đôi khi chúng ta gặp phải những trường hợp như này:

```CSS
.detail-post {
	...
	&__img {
		...
		width: X; // For desktop's screen

		@media (max-width: 992px) { // For small desktop's screen
			...
			width: Y;
		}

		@media (max-width: 768px) { // For tablet and phone
            ...
			width: Z;
		}
	}
}
```

Đầu tiên thì, đoạn code trên sẽ được chạy mà không gặp bất kỳ lỗi nào. Nhưng bạn đã nghĩ đến việc làm cho đoạn code này ngắn hơn chưa?

## II. Min, Max, Clamp:
### 1. min():
Định nghịa cơ bản:
> The [min()](https://developer.mozilla.org/en-US/docs/Web/CSS/min()) CSS function lets you set the smallest (most negative) value from a list of comma-separated expressions as the value of a CSS property value.

> Hàm `min()` sẽ chọn phần tử nhỏ nhất từ danh sách biểu thức để làm giá trị cho CSS.

Cách dùng:
```css
.box {
    width: min(50%, 400px);
}
```
Lúc này, phần tử `.box` của chúng ta sẽ nhận chiều dài nhỏ nhất trong 2 giá trị trên, cụ thể:
1. `50vw`: 50% kích thước của screen's width, khi ở các thiết bị có bề ngang bé hơn 800px (X < 800px => (X/2) < 400px).
2. `400px`: Đối với trường hợp screen's width lớn hơn 800px, `.box` sẽ nhận giá trị là 400px.

![](https://images.viblo.asia/41423fcc-f4b8-47b7-aedb-0c6f02d1f41f.gif)

[Code demo](https://codepen.io/una/pen/rNeGNVL)

### 2. max():
Định nghịa cơ bản:
> The [max()](https://developer.mozilla.org/en-US/docs/Web/CSS/max()) CSS function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value.

Tương tự như `min()`, nhưng `max()` sẽ lấy ra giá trị lớn nhất.

Cách dùng:
```css
.box {
    width: max(50$, 400px);
}
```
Lúc này, phần tử `.box` của chúng ta sẽ nhận chiều dài lớn nhất trong 2 giá trị trên, cụ thể:
1. `50vw`: 50% kích thước của screen's width, khi ở các thiết bị có bề ngang lớn hơn 800px (X > 800px => (X/2) > 400px).
2. `400px`: Đối với trường hợp screen's width bé hơn 800px, `.box` sẽ nhận giá trị là 400px.

![](https://images.viblo.asia/a25ec602-b3f4-44ef-87dd-37b06b0bf0c7.gif)

[Code demo](https://codepen.io/una/pen/RwaZXqR)

### 3. clamp():
Định nghịa cơ bản:
> The [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) CSS function clamps a value between an upper and lower bound. `clamp()` enables selecting a middle value within a range of values between a defined minimum and maximum.

Khác với `min()` và `max()`, `clam()` nhận vào 3 giá trị gồm `MIN, VAL, MAX` - `nhỏ nhất, ưu tiên, lớn nhất` và trả về giá trị phù hợp theo công thức:
```
clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))
```

Cách dùng:
```css
.box {
    width: clamp(350px, 50vw, 500px);
}

```
Lúc này, phần tử `.box` của chúng ta sẽ nhận chiều dài như sau: (350 < X/2 < 500)
1. `500px`: khi màn hình có kích thước lớn hơn 1000px.
2. `350px`: khi màn hình có kích thước bé hơn 700px.
3. `50vw`: Khi màn hình nằm giữa 700px và 1000px.

![](https://images.viblo.asia/a566e1a0-591f-4e68-a992-d164da1dfdaf.gif)

[Code demo](https://codepen.io/una/pen/bGpoGdJ)

### III. Link References:
Bài viết dịch từ [min(), max(), and clamp(): three logical CSS functions to use today](https://web.dev/min-max-clamp/).