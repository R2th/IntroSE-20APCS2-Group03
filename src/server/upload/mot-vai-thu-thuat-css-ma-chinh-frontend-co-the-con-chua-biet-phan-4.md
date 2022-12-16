![](https://images.viblo.asia/16e6eb05-76f8-4b8d-8bdd-d1bfbda6d0da.jpg)

Hello mọi người, mình tiếp tục trở lại với series về thủ thuật CSS đây. Các mẹo CSS trong phần này có 1 số chưa được support đầy đủ ở các trình duyệt phổ biến, nên mình đánh dấu **[Not Cross-Browsers]** để các bạn dễ nhận biết nhé!

### 1. Flexbox với `margin-left: auto`

Giả sử ta có 1 layout thường gặp như sau:

![Layout minh họa](https://images.viblo.asia/dfce6539-94ad-4fbd-8ae2-ac9f5b4b08a7.png)

Khi sử dụng Flexbox để xử lý layout trên, hay thấy mọi người code kiểu này:

```html
<header>
	<div>
		<div class="logo"></div>
		<div class="menu"></div>
	</div>
	<div class="user"></div>
</header>
```

```css
header {
    display: flex;
    justify-content: space-between;
}
```

Nhưng với thuộc tính `margin-left: auto`, mọi người có thể giản lược đi 1 thẻ `div` không cần thiết, code sẽ được viết lại như sau:


```html
<header>
	<div class="logo"></div>
	<div class="menu"></div>
	<div class="user"></div>
</header>
```

```css
header {
    display: flex;
}
.user {
    margin-left: auto;
}
```

Để tìm hiểu thêm sự kỳ diệu của thuộc tính `margin` khi kết hợp với `flexbox` có thể đọc thêm ở [bài viết này](https://css-tricks.com/the-peculiar-magic-of-flexbox-and-auto-margins/)

### 2. Value `initial` [Not Cross-Browsers]

Đã có bao giờ bạn phải đi search google hay viết sai giá trị default của 1 thuộc tính trong CSS chưa? Đơn giản với thuộc tính `width` lại có mỗi default value khác nhau, nhiều lúc không thể nhớ hết

* `width` -> Default value: `auto`
* `min-width` -> Default value: `0`
* `max-width` -> Default value: `none`

Và chúng ta có value gọi là `initial` giải quyết được điều này, đối với mọi thuộc tính trong CSS khi cần set về giá trị mặc định chỉ cần gọi `initial`.

Tuy nhiên nó [chưa được support trên IE 11](https://caniuse.com/#feat=css-initial-value). Vậy để dễ dàng sử dụng thuộc tính trên mà không phải lo về khoản browser support thì ta cần 1 tool gọi là PostCSS sẽ tự động tạo ra fallback value cho từng thuộc tính, bạn có thể [đọc thêm bài viết về PostCSS của mình trước đó](https://viblo.asia/p/ban-co-biet-ve-postcss-Qbq5QrkJKD8#_kham-pha-1-so-plugins-noi-tieng-cua-postcss-5)

Ta chỉ cần viết:
```css
.class-name {
    min-width: initial;
}
```

PostCSS sẽ giúp build ra CSS như sau:

```css
.class-name {
    min-width: 0;
    min-width: initial;
}
```

### 3. Style CSS cho input placeholder với `:placeholder-shown` [Not Cross-Browsers]

CSS cho placeholder của input không phải là xa lạ đối với 1 Frontend và thường sẽ thấy mọi người hay sử dụng như sau:

```css
input::placeholder {
    color: red;
}
```

Với `::placeholder` ta chỉ có thể tác động style vào phần text của input như `font-size`, `color`, nhưng với `:placeholder-shown` ta còn có thể tác động style vào toàn bộ input khi mà placeholder đang được show như `border` chẳng hạn.

À, mọi người cần chú ý về dấu hai chấm nữa nhé, kẻo viết sai cú pháp:

* `placeholder` là **pseudo element** nên sẽ viết 2 dấu hai chấm => `::placeholder`
* `placeholder-shown` là **pseudo class** nên sẽ viết 1 dấu hai chấm => `:placeholder-shown`

Để hình dung thêm cách hoạt động của `:placeholder-shown` có thể đọc thêm ở [bài viết này](https://css-tricks.com/almanac/selectors/p/placeholder-shown/)

Rất tiếc là trên trình duyệt `Egde` lại [không được support](https://caniuse.com/#feat=css-placeholder-shown), nên cũng hãy cân nhắc về phía yêu cầu của dự án để có thể áp dụng nó.

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS của mình với 3 tips trên.

Nếu thấy thích thì **Upvote**, thấy hay thì **Clip** bài này của mình nhé! ^^

**P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!**