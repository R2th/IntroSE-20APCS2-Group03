![](https://images.viblo.asia/8dcddc38-474f-4109-86fa-c9e9c2708d33.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 30 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1.  Có hẳn thuộc tính CSS `aspect-ratio`

Từ trước đến giờ mỗi lần muốn [tạo 1 khối (hình ảnh/video) theo 1 tỷ lệ 16:9, 4:3, 3:2](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-1-3Q75wppeKWb#_2-image-background-responsive-1) mình thường làm `Aspect Ratio` bằng cách sử dụng `padding-top`. Ví dụ:

* Tỉ lệ 1:1 -> `padding-top: 100%`
* Tỉ lệ 4:3 -> `padding-top: 75%`
* Tỉ lệ 3:2 -> `padding-top: 66.67%`
* Tỉ lệ 16:9 -> `padding-top: 56.25%`
* Hoặc 1 tỉ lệ bất kỳ, mà giúp cho cái box đó có khả năng responsive -> `padding-top: (height_image/width_image) * 100%` (Giống như cách làm responsive cho video ở [Phần 1 của series này](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-1-3Q75wppeKWb#_2-image-background-responsive-1))

Và [đầu năm 2021 Chrome 88 đã mang lại cho chúng ta 1 thuộc tính mới là `aspect-ratio`](https://www.chromestatus.com/feature/5738050678161408).  Ví dụ với tỉ lệ 16:9, bạn chỉ cần viết CSS `aspect-ratio: 16 / 9`.

{@embed: https://codepen.io/tinhh/pen/OJbjrox?theme-id=dark}

Thử luôn demo với `iframe`

{@embed: https://codepen.io/tinhh/pen/qBqXLgb?theme-id=dark}

Vẫn work rất OK luôn :hugs: 

Với Firefox thì hiện tại tính năng này chỉ có trên bản Nightly.

> Firefox Nightly là phiên bản thử nghiệm được cập nhật thường xuyên, không ổn định. Chỉ được sử dụng bởi những người thử nghiệm và các nhà phát triển Firefox.

[Theo như bài viết](https://web.dev/aspect-ratio/) của bà chị [Una Kravets](https://twitter.com/una) thì Firefox 87 sẽ hỗ trợ (Hiện tại ở thời điểm của bài viết này Firebox đang là 85).

Thuộc tính mới `aspect-ratio` thì chưa được phổ biến ở các trình duyệt, trong khi bạn vẫn muốn sử dụng cho Chrome trước, thì có thể kết hợp thêm cú pháp `@supports not (...)` để tạo fallback nhé.

Code fallback của bạn như thế này:

```scss
div {
  aspect-ratio: 16 / 9;
  
  @supports not (aspect-ratio: 16 / 9) { 
          ...
          padding-top: 56.25%;
    }
}
```

#### Đọc hiểu thêm

- https://web.dev/aspect-ratio/
- https://twitter.com/smashingmag/status/1351902173307744256
- https://caniuse.com/mdn-css_properties_aspect-ratio

### 2. Thay đổi màu của cursor khi focus vào input/textarea

Cursor ở đây là cái dấu này mọi người ạ!

![](https://images.viblo.asia/5c9a9b62-4378-4df9-9fb8-e4cf0441c28a.PNG)

Chuyện là hôm bữa có bạn dev Frontend hỏi mình, giờ design họ vẽ cái cursor màu đỏ, trong khi text đang màu đen, thì có đổi  màu được không?

Mình thì chưa gặp yêu cầu này bao giờ và đang nghĩ chắc phải làm vài đường trick hay hack các kiểu thì mới có thể làm ra được, vì theo mình biết, ví dụ để tạo cursor màu đỏ, thì dùng `color`, nhưng lúc này text cũng ăn màu đỏ theo luôn.

```css
input {
   color: red;
}
```

{@embed: https://codepen.io/tinhh/pen/oNYeKeg?theme-id=dark}

Sau 1 hồi tìm kiếm giải pháp, cuối cùng cũng tìm ra cái thuộc tính gọi là `caret-color` giải quyết được yêu cầu trên. Xịn thật sự mọi người ạ (vỡ_òa) :blush: 

```css
input {
   caret-color: red;
}
```

{@embed: https://codepen.io/tinhh/pen/QWGMeqQ?theme-id=dark}

Ngoài ra, bạn còn có thể chế hiệu ứng đổi màu cursor đó bằng `@keyframes`, `animation`nữa đó

(demo lấy từ [bài viết trên CSS-Tricks](https://css-tricks.com/almanac/properties/c/caret-color/))

{@embed: https://codepen.io/PINT/pen/wqqooq?theme-id=dark}

[Lại là bác IE không chịu support](https://caniuse.com/css-caret-color)

#### Đọc hiểu thêm

- https://www.samanthaming.com/tidbits/31-css-caret-color/
- https://css-tricks.com/almanac/properties/c/caret-color/
- https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color

### 3. Một số tính năng mới của Chrome DevTools

Kể từ [phần 3](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-3-E375z04dZGW#_1-enable-show-user-agent-shadow-dom-trong-devtools-cua-trinh-duyet-de-debug-css-de-dang-hon-0) của series này, nay mình xin phép update thêm 1 vài tính năng hay ho của DevTools mà nó giúp ích cho công việc của Frontend Developer, đặc biệt là các bạn làm nhiều về CSS.

**#1: Đồng hồ để điều chỉnh góc độ (0 ~ 360) đối với các thuộc tính có sử dụng đơn vị `deg`**

![alt](https://developers.google.com/web/updates/images/2020/11/devtools/01-angle.png)

Khi các bạn viết các thuộc tính như `transform: rotate(...deg)`, `background: linear-gradient(..deg, color1, color2)`, sử dụng tới đơn vị  `deg`, thì khi bật DevTools lên sẽ thấy biểu tượng đồng hồ bên cạnh để điều chỉnh rất trực quan.

**#2: Giả lập việc image được load như thế nào, nếu gặp phải các loại định dạng không được hỗ trợ như AVIF, WebP**

![alt](https://developers.google.com/web/updates/images/2020/11/devtools/02-emulate-image-type.png)

Bạn đang áp dụng kỹ thuật load ảnh như dưới đây

```html
<picture>
  <source srcset="test.avif" type="image/avif">
  <source srcset="test.webp" type="image/webp">
  <img src="test.png" alt="A test image">
</picture>
```

Đối với các trình duyệt hiện đại, thì xu hướng là nhận được các định dạng mới như `.avif`, nếu không support, thì bạn nghĩ tiếp theo nó nên nhận `.webp`, hoặc nếu trình duyệt nào hơi cũ tí, bạn nghĩ sẽ phải load được ảnh `.png` kia.

Và để test được việc này, trước kia bạn thường phải mở các trình duyệt lên để kiểm tra xem ảnh load ra đúng như mình đã nghĩ hay chưa?

Nhưng từ nay, với tính năng giả lập mới phát triển của Chrome, bạn chỉ cần mở DevTools, chọn `disabled` cho từng định dạng ảnh, là có thể kiểm tra được ảnh được load ra đúng hay không rồi.

**#3: Chụp ảnh trang web mà không cần phải install extension nào cả**

![alt](https://developers.google.com/web/tools/chrome-devtools/images/shared/command-menu.png)

Mở DevTools -> Nhấn `Control+Shift+P` hoặc `Command+Shift+P` (dành cho Mac) để mở cửa sổ Command Menu. Gõ vào `Screenshot`, bạn sẽ có các lựa chọn chụp hình trang web.

![](https://images.viblo.asia/5cd65287-ac9e-4b1d-9b47-5ce4202a012c.PNG)

Ở đây mình thường dùng `Capture full size screenshot` và `Capture screenshot`. Rất là tiện và mình đã gỡ extension chụp hình ra rồi :smiley: (Trước mình cài extension có tên `Full Page Screen Capture`)

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!