![](https://images.viblo.asia/abbba451-7007-4f37-b28f-31763539480d.png)


## Introduction: What Is Aspect Ratio?

Trong thiết kế web, khái niệm tỷ lệ khung hình (`aspect ratio`) được sử dụng để mô tả tỉ lệ giữa chiều rộng (`width`) và chiều cao (`height`) của hình ảnh, có mối quan hệ về kích thước tương ứng với nhau.

- Hãy xem xét hình sau.

![](https://images.viblo.asia/274439e9-2d27-4f71-bf77-d8e1e592092c.jpg)

Chúng ta có tỷ lệ 4 : 3.

Điều đó cho thấy tỉ lệ giữa táo và nho là 4 : 3.

Nói cách khác, khối nhỏ nhất mà chúng ta có thể tạo với `aspect ratio` là `4 : 3` là khối 4px * 3px.

Khi chiều cao của khối này được thay đổi thì kích thước tương ứng với chiều rộng của nó cũng sẽ phải thay đổi theo, chúng ta sẽ có một khối luôn có tỉ lệ là 4 : 3.

- Hãy xem xét hình sau.

![](https://images.viblo.asia/e7bdab35-bccc-4507-8c16-1bdaa7f795a0.jpg)

Khối có thể được thay đổi kích thước theo tỷ lệ nhưng tỷ lệ giữa chiều rộng và chiều cao của nó là bất biến

Bây giờ, hãy tưởng tượng rằng khối đó chứa một hình ảnh gốc mà chúng ta cần hiển thị tất cả các chi tiết của nó (không bị cắt).

![](https://images.viblo.asia/e49ff6cd-8839-45cc-8413-75ea5e8c0924.jpg)

Lưu ý rằng các chi tiết hình ảnh sẽ phải được giữ nguyên, bất kể kích thước là bao nhiêu.

Bằng cách có một tỷ lệ khung hình nhất quán, chúng ta nhận được những lợi ích sau:

* Hình ảnh trên một trang web sẽ nhất quán trên các kích thước cửa sổ, thiết bị xem khác nhau.
* Các chi tiết quan trọng được giữ nguyên.
* Chúng ta cũng có thể có các thành phần video tương ứng.
* Nó giúp các designer tạo ra một hướng dẫn rõ ràng về kích thước hình ảnh để các nhà lập trình web có thể xử lý chúng trong quá trình phát triển.

## Measuring Aspect Ratio

Để đo tỷ lệ khung hình, chúng ta cần chia chiều rộng cho chiều cao như trong hình sau.

![](https://images.viblo.asia/e6c19761-b434-4cc2-8a4a-4b662508432c.jpg)

Tỷ lệ giữa chiều rộng và chiều cao là `1,33`.

Điều đó có nghĩa là tỷ lệ này cần được xác định và tuân thủ .

- Hãy xem xét những điều sau:

![](https://images.viblo.asia/5aa9c012-7efb-4d8c-8333-a0b454ef7f99.jpg)


Lưu ý trên hình ảnh bên phải, giá trị của chiều rộng ÷ chiều cao là `1,02`, không phải là tỷ lệ khung hình gốc (1,33 hoặc 4: 3) ..

Bạn có thể đang nghĩ, làm thế nào để đưa ra giá trị 4: 3? 

Trong khi làm việc trên thiết kế giao diện người dùng, bạn nên biết chính xác tỷ lệ khung hình của hình ảnh bạn đang sử dụng là bao nhiêu. 

Đây được gọi là `Nearest Normal Aspect Ratio` và có những công cụ có thể giúp chúng ta tìm ra nó. [Tham khảo để tìm được tỉ lệ gần nhất](http://lawlesscreation.github.io/nearest-aspect-ratio/)

Với những điều trên, chúng ta hy vọng rằng khái niệm về `aspect ratio` đã rõ ràng đối với bạn.

## Implementing Aspect-Ratio In CSS

Chúng ta đã từng triển khai tỷ lệ khung hình bằng cách sử dụng phần trăm với `padding` trong CSS.

Tin tốt là gần đây, chúng tôi đã nhận được hỗ trợ cho `aspect ratio` trong tất cả các trình duyệt.

Trước khi đi sâu vào sử dụng , chúng ta nên tìm hiểu thêm cách cũ trước đã.

Khi một phần tử có phần `padding` tỉ lệ phần trăm theo chiều dọc, phần tử đó sẽ dựa trên chiều rộng chính của nó.

- Hãy xem xét hình sau:

![](https://images.viblo.asia/d5e9f467-831e-496b-a139-1ffafb600709.jpg)

Khi tiêu đề có `padding-top: 50%`,  giá trị được tính dựa trên chiều rộng cha của nó.

Vì chiều rộng của trang gốc là `200px`, nên `padding-top` sẽ trở thành `100px`.

Để tìm ra giá trị phần trăm sẽ sử dụng, chúng ta cần chia chiều cao của hình ảnh cho chiều rộng của hình ảnh.

Con số kết quả là tỷ lệ phần trăm bạn muốn sử dụng.

Coi rằng chiều rộng hình ảnh là `260px` và chiều cao là `195px`.

Phần trăm `padding = height / width`

Kết quả của `195/260` là `0,75 (hoặc 75%)`.

- Ta có một ví dụ khác: 

![](https://images.viblo.asia/29b05c6f-abe8-4dd2-8718-a29f48d09e03.jpg)

Vì lý do nào đó,  nội dung đựoc tải lên một hình ảnh có kích thước không phù hợp với những hình ảnh khác.

Chú ý chiều cao của thẻ ở giữa không bằng các thẻ khác.

Bạn có thể nghĩ như là, chúng ta có thể thêm một chiều cao cố định và thuộc tính `object-fit: cover`.

Vấn đề đã được khắc phục, phải không?

Nó không đơn giản như vậy.

Giải pháp này sẽ không đẹp ở nhiều kích thước màn hình khác nhau.

![](https://images.viblo.asia/42fd66b5-a819-4076-b0d3-2a8a7d1e4051.jpg)

Lưu ý rằng ở kích thước trung bình, hình ảnh có chiều cao cố định bị cắt quá nhiều từ trái và phải, trong khi trên thiết bị di động, chúng quá rộng.

Tất cả những điều đó là do sử dụng một chiều cao cố định.

Chúng ta có thể điều chỉnh chiều cao theo cách thủ công với các truy vấn các thiết bị khác nhau, nhưng đây không phải là giải pháp thực tế.

Những gì chúng ta cần là kích thước phù hợp cho hình thu nhỏ bất kể kích thước khung nhìn là bao nhiêu.

Để đạt được điều đó, chúng tôi cần triển khai tỷ lệ khung hình bằng cách sử dụng tỉ lệ phần trăm với `padding`.

```html
<article class="card">
  <div class="card__thumb">
    <img src="thumb.jpg" alt="" />
  </div>
  <div class="card__content">
    <h3>Muffins Recipe</h3>
    <p>Servings: 3</p>
  </div>
</article>
```

```css
.card__thumb {
  position: relative;
  padding-top: 75%;
}

.card__thumb img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Với code trên, chúng ta đã xác định rằng chiều cao của khối bao bọc hình của thẻ (`.card__thumb`) phụ thuộc vào chiều rộng của nó.

Ngoài ra, hình ảnh được định vị tuyệt đối (` position: absolute;`) và nó có đầy đủ chiều rộng và chiều cao của hình ảnh gốc, với `object-fit: cover` cho các trường hợp tải lên hình ảnh có kích thước khác.

[Xem video tại đây](https://ishadeed.com/assets/aspect-ratio-css/cards-list.mp4)

- Lưu ý rằng kích thước thẻ thay đổi như thế nào và tỷ lệ co của hình thu nhỏ không bị ảnh hưởng.


### Introducing The Aspect-Ratio Property

Điều hữu ích về thuộc tính `aspect-ratio` là chúng ta hoàn toàn không phải thêm tỉ lệ phần trăm với `padding` nữa.

Chúng ta chỉ cần xác định tỷ lệ khung hình (`aspect-ratio`) mà chúng ta cần.

Nếu chúng ta quay lại ví dụ trước, chúng ta có thể viết lại nó như sau:

```css
/* The current way */
.card__thumb {
  position: relative;
  padding-top: 75%;
}

/* With native aspect-ratio support */
.card__thumb {
  position: relative;
  aspect-ratio: 4/3;
}
```

- Codepen: 
{@embed: https://codepen.io/vinh-nguyen-the-sans/full/xxqegKz}

### Progressive Enhancement

Ngày nay, chúng ta có thể sử dụng `aspect-ratio` bằng cách sử dụng CSS `@supports` và các biến CSS.

Chúng ta đã biết về điều này từ [bài báo của Peter-Paul Koch](https://www.quirksmode.org/blog/archives/2021/05/aspectratio.html).

```css
.card {
  --aspect-ratio: 16/9;
  padding-top: calc((1 / (var(--aspect-ratio))) * 100%);
}

@supports (aspect-ratio: 1) {
  .card {
    aspect-ratio: var(--aspect-ratio);
    padding-top: initial;
  }
}
```

## Use Cases

Trường hợp sử dụng phổ biến nhất cho `aspect-ratio` là cho hình ảnh thẻ.

### Logo Images

- Hãy xem các biểu tượng logo sau.

![](https://images.viblo.asia/f8b32bfc-4da8-4bea-b9a2-d8adcfb8bf98.jpg)

Bạn có nhận thấy rằng kích thước của chúng nhất quán và chúng đã được căn chỉnh không?

```html
<li class="brands__item">
  <a href="#">
    <img src="assets/batch-2/aanaab.png" alt="" />
  </a>
</li>
```

```css
.brands__item a {
  padding: 1rem;
}

.brands__item img {
  width: 130px;
  object-fit: contain;
  aspect-ratio: 2/1;
}
```

Chúng ta đã thêm chiều rộng cơ sở là `130px` để có kích thước tối thiểu và `aspect-ratio` chỉ cần quan tâm đến chiều cao.

- Khi inspect, chúng ta sẽ thấy: 

![](https://images.viblo.asia/595d9c84-bab1-46b0-9060-38e2aa982acc.jpg)

Vùng màu xanh lam là kích thước hình ảnh và việc có `object-fit: contain` là quan trọng để tránh làm biến dạng hình ảnh.

### Responsive Circles

Bạn đã bao giờ cần tạo một phần tử hình tròn có khả năng `responsive` chưa?

`aspect-ratio` hoàn toàn phù hợp cho trường hợp sử dụng này.

![](https://images.viblo.asia/8a89a506-137c-46d1-870b-0f8b76044dd1.jpg)

```css
.person {
  width: 180px;
  aspect-ratio: 1;
}
```

- Nếu hai giá trị cho `aspect ratio` giống nhau, chúng ta có thể viết `aspect-ratio: 1;` thay vì `aspect-ratio: 1;`.

### External Links

Đây là một trường hợp sử dụng mà chúng ta đã thường gặp

Chúng ta có một liên kết bên ngoài.

![](https://images.viblo.asia/0f1c8856-c5a9-405c-8fdf-60de63a03c83.jpg)

- Với `aspect-ratio`, chúng ta có thể làm cho chúng `responsive` dễ dàng và đơn giản hơn rất nhiều.

## Conclusion

Bên trên là tìm hiểu về thuộc tính `aspect-ratio` trong CSS, hi vọng giúp ích đựợc cho mọi người trong việc sắp xếp hay custom lại các hình cảnh

Thank for watching!!!

## Reference

- [aspect-ratio article](https://www.quirksmode.org/blog/archives/2021/05/aspectratio.html)
- [aspect-ratio detail](https://www.bram.us/2020/11/30/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio/)
- [nearest-aspect-ratio](http://lawlesscreation.github.io/nearest-aspect-ratio/)
- [css-aspect-ratio](https://ishadeed.com/article/css-aspect-ratio/)