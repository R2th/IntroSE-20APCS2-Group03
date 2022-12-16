![](https://images.viblo.asia/182f22be-42e1-4e0b-8708-bfe85135c652.png)

## What’s The Problem?

Nếu bạn đang sử dụng các `CSS variables (biến CSS)` giống như `CSS pre-procccersors` (ví dụ: Sass), thì bạn đang không tận dụng được đầy đủ lợi ích của chúng.

Hãy xem xét những ví dụ sau:

```css
:root {
    --brand-primary: #7777e9;
    --brand-secondary: #c96fde;
}

.title {
    color: var(--brand-primary);
}
```

… nó không có gì khác biệt so với trong Sass:

```css
$brand-primary: #7777e9;
$brand-secondary: #c96fde;

.title {
    color: $brand-primary;
}
```

Chỉ sử dụng các `biến CSS` cho các biến màu không sai chút nào, nhưng nó giống như việc sử dụng Apple M1 MacBook để duyệt internet, mặc dù phiên bản cũ 2012 của bạn vẫn hoạt động tốt.

Có ích gì khi để một chiếc máy tính tiên tiến thực hiện công việc tương tự trong khi bạn có cơ hội sử dụng hết tiềm năng của nó?

Đó chính xác là những gì chúng ta cảm nhận về việc sử dụng các `biến CSS`.

Mục tiêu của bài viết này là hướng dẫn chúng ta qua các trường hợp sử dụng các biến CSS.

## Use Cases And Examples

### Longhand Properties

Trong một số trường hợp, bạn có thể cần phải điều chỉnh thủ công của thuộc tính css.

Ví dụ: một thuộc tính `padding` có thể khác khi ở trong component khác.

Thay vì viết lại, chúng ta có thể sử dụng một `biến CSS` cho thứ sẽ thay đổi và nó sẽ được ghi đè thông qua `CSS class`.

![](https://images.viblo.asia/4581256f-5ffc-48d4-b16e-b321f6a91bf2.jpg)

```html
<!-- Base component -->
<header class="page-header">
    <h2>...</h2>
    <p>...</p>
</header>

<!-- Component variation -->
<header class="page-header page-header--compact">
    <h2>...</h2>
    <p>...</p>
</header>
```

```css
.page-header {
    --padding-start: 2.5rem;
    --padding-block: 2rem;
    padding: var(--padding-block) 1rem var(--padding-block) var(--padding-start);
}

.page-header--compact {
    --padding-start: 1.5rem;
    --padding-block: 1rem;
}
```

Lưu ý rằng chúng ta chỉ cần thay đổi giá trị `biến CSS` để thay đổi `padding`.

Nếu không có `biến CSS`, chúng ta sẽ cần phải nhập toàn bộ thuộc tính `padding` chỉ để ghi đè một giá trị của nó.

```css
.page-header {
    padding: 2rem 1rem 2rem 1.5rem;
}

.page-header--compact {
    padding: 1rem 1rem 1rem 2.5rem;
}
```

Những điều trên cũng có thể áp dụng cho việc sử dụng `margin`.

### CSS Backgrounds

Khi nói đến `CSS backgrounds`, các `biến CSS` có thể giúp chúng ta giảm bớt code CSS mà chúng ta viết.

Thậm chí tốt hơn, nó có thể làm cho CSS trông đơn giản hơn để đọc.

#### Storing The URL Value

![](https://images.viblo.asia/a9eef084-3695-4f03-acb6-5da5e9596a31.jpg)

Trong khi làm markup, có một số trường hợp, chúng ta cần sử dụng thẻ `<div>` với style `backgrouds-image` để có thể giải quyết.

Nếu không có `biến CSS`, HTML sẽ giống như sau:
    
```html
 <section 
    class="newsletter" 
    style="background-image: url('/assets/ui/decoraitve/newsletter-lg-aj1891101.svg')">
</section>
```

Thay vì trực tiếp thay đổi thuộc tính `background-image`, chúng ta có thể làm như sau.

```html
<section 
    class="newsletter" 
    style="--thumb:url('/assets/ui/decoraitve/newsletter-lg-aj1891101.svg')">
</section>
```

```css
.newsletter {
    background-image: var(--thumb);
    background-size: cover;
    background-position: 100% 50%;
}
```

Lưu ý rằng chúng ta cần bao gồm `url()` mà không có `biến CSS`

#### Background Position

![](https://images.viblo.asia/6f7fcd69-3f6b-4d10-bedb-7775b91da961.jpg)

Trong ví dụ trước, `background image` được đặt ở phía bên phải.

Đối với bố cục từ phải sang trái (RTL), `position` phải được lật lại.

```css
.newsletter {
    --pos: 100% 50%;
    background-image: var(--thumb);
    background-size: cover;
    background-position: 100% 50%;
}

html[dir="rtl] .newsletter {
    background-position: 0% 50%;
}
```

Chúng ta có thể thấy được sự trợ giúp từ các `biến CSS` để thực hiện việc này dễ dàng hơn.

```css
.newsletter {
    /* other styles */
    background-position: var(--pos);
}

html[dir="rtl"] .newsletter {
    --pos: 0% 50%;
}
```

#### The Angle Of A Gradient: Part 1

Điều này cũng liên quan đến việc xây dựng bố cục cho đa ngôn ngữ.

Theo mặc định, một góc gradient có thể là `45deg` và nó cần phải là `-45deg` cho các bố cục RTL.

![](https://images.viblo.asia/c6948940-d542-4423-b822-fadfda53fb0d.jpg)

```css
.element {
    --angle: 90deg;
    background: linear-gradient(var(--angle), #4088vb, #C05858);
}

html[dir="rtl"] .element {
    --angle: -90deg;
}
```

#### The Angle Of A Gradient: Part 2

Liên quan đến góc `radient` sử dụng các `biến CSS` với gradient để điều chỉnh `position` rất tiện dụng.

Trong ví dụ sau, vị trí của gradient đã được thay đổi bằng cách chỉ thay đổi biến `--pos`.

![](https://images.viblo.asia/6f30d25f-a734-459b-8395-4e52631969e7.jpg)

Đây là cách chúng ta có thể làm điều này mà không cần biến CSS.

```css
.card {
    background: radial-gradient(
        circle 200px at center top,
        rgba(64, 136, 203, 0.5),
        #f7f7f7
    );
}
```

Giả sử rằng chúng ta có `card`, `.card-2` và nó phải có `position` khác nhau.

Chúng ta cần viết như sau:

```css
.card-2 {
    background: radial-gradient(
        circle 200px at center top,
        rgba(64, 136, 203, 0.5),
        #f7f7f7
    );
}
```

Toàn bộ khai báo gradient đang được ghi đè.

```css
.card {
    --pos: center top;
    background: radial-gradient(
        circle 200px at var(--pos),
        rgba(64, 136, 203, 0.5),
        #f7f7f7
    );
}

.card-2 {
    --pos: left top;
}
```

### Clip Path

Một trường hợp sử dụng hữu ích cho các `biến CSS` là thay đổi các giá trị của `clip-path: polygon()` trên thiết bị di động so với giao diện pc.

![](https://images.viblo.asia/dac77569-67cd-4203-acc5-7a75584572e8.jpg)

Trong hình trên, các điểm đa giác cần được thay đổi và việc sử dụng các `biến CSS` giúp quá trình đó dễ dàng hơn.

```css
.hero {
    --first: 4% 7%;
    --second: 80% 0;
    --thrid: 100% 95%;
    --fourth: 10% 100%;
    clip-path: polygon(var(--first), var(--second), var(--thrid), var(--fourth));
}

@media (min-width: 40rem) {
    .hero {
        --second: 96% 0;
        --thrid: 92% 82%;
    }
}
```

Nếu bạn muốn tìm hiểu thêm về `CSS clip-path`, đây thực sự là [một bài viết của bạn](https://viblo.asia/p/tim-hieu-ve-clip-path-trong-css-naQZRyzjKvx).

### Checkbox Component

Một trường hợp sử dụng hoàn hảo cho các biến CSS là kết hợp chúng với `hsla()`.

Bằng cách đó, chúng ta có thể tạo các `component` động thực hiện chúng bằng cách chỉ thay đổi một hoặc một vài `biến CSS`.

![](https://images.viblo.asia/c9ed6cad-f70d-427c-b58b-ab6cf7aa97e3.jpg)

Điều đầu tiên tôi đã làm là xác định các giá trị `hsla()` cho `root element` của `component`.

```css
.form-item {
    --primary-h: 240;
    --primary-s: 56%;
    --primary-l: 63%;
    --primary-alpha: 100%;
}
```

```css
/* The circle that appears on hover */
.form-item__label:after {
    --primary-alpha: 0;
    background-color: hsla(
        var(--primary-h),
        var(--primary-s),
        var(--primary-l),
        var(--primary-alpha)
    );
}

.form-item__label:hover:after {
    --primary-alpha: 15%;
}
```

{@embed: https://codepen.io/shadeed/pen/ExZJNxJ}


### Building Sass-Like Mixins

Ý tưởng là chúng ta là  đặt các `biến CSS` ban đầu cho một thuộc tính cụ thể và sau đó chúng ta có thể ghi đè các biến khi cần.

Trong nhiều trường hợp, chúng ta cần phải căn giữa các `container`, điều này có thể được giải quyết bằng cách thêm `margin: 0 auto` vào. 

Trong trường hợp này, chúng ta sẽ đặt một class giữ `CSS biến`, một class giữ giá trị của biến căn giữa đó:

```html
<div class="featured-section u-center"></div>
```

```css
.u-center {
  --mx: initial;
  --my: initial;

  margin: var(--my) var(--mx);
}

.featured-section {
  --mx: auto;
  --my: 2rem;
}
```

Đầu tiên, chúng ta đã tạo một class `.u-center` với các giá trị lề ngang và dọc mặc định.

Chúng ta có thể thêm class đó vào phần tử và sau đó ghi đè các `biến CSS`.

### Using Calc()

Hàm `calc()` có thể rất tiện dụng với các `biến CSS`.

Chúng ta có thể tạo kích thước cơ sở cho một `component`, sau đó chỉ thay đổi `biến CSS` để làm cho nó nhỏ hơn hoặc lớn hơn.

Điều này có thể hữu ích cho các trường hợp sử dụng khác nhau.

![](https://images.viblo.asia/84f7c267-d0e8-417e-9607-83d23b8a252b.png)

```css
.c-avatar {
  width: calc(var(--size, 32) * 1px);
  height: calc(var(--size, 32) * 1px);
}
```

Lưu ý rằng chúng ta đã sử dụng `var(--size, 32)`.

Nếu biến `--size` không được xác định, thì `32` sẽ được sử dụng như một giá trị mặc định.

`1px` quan trọng để thêm `px` vào số cuối cùng.

Với điều đó, chúng ta có thể tạo các class có thể dùng chung bằng cách thêm `biến CSS` `--size`.

```css
.c-avatar--medium {
    --size: 64;
}

.c-avatar--large {
    --size: 128;
}
```

### Pseudo-Elements

Với các `biến CSS`, có thể thay đổi `pseudo-element` vì thuộc tính này được kế thừa từ thuộc tính gốc của nó.

Hãy xem xét ví dụ sau:

![](https://images.viblo.asia/ff16e1a0-cbcf-42f5-b5e2-f8a14d0fe5e1.png)

Phần tiêu đề có một đường màu tím sử dụng `pseudo-element` để trang trí.

Chúng ta có thể chuyển một `biến CSS` vào tiêu đề và `pseudo-element` sẽ kế thừa nó.

```css
.section-title {
    --dot-color: #829be9;
}

.section-title:before {
    content: "";
    background-color: var(--dot-color);
}
```

Ngoài ra, chúng ta còn có thể thay đổi `pseudo-element` thông qua Javascript code.

### Inline Styles

Một cách sử dụng hữu ích khác cho các `biến CSS` là sử dụng chúng như `inline styles`.

Điều này có thể mở ra rất nhiều khả năng tùy chỉnh `component` chỉ bằng cách thay đổi một hoặc nhiều biến.

Hãy xem xét ví dụ sau.

```css
.o-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--item-width, 200px), 1fr);
    grid-gap: var(--gap);
}
```

Chúng ta có một `grid component` và chiều rộng mặc định là `200px`.

Trong HTML, chúng ta có thể ghi đè bằng cách đặt lại `biến CSS` thành một giá trị khác.

```html
<!-- Example 1 -->
<div class="o-grid" style="--item-width: 250px;">
     <div></div>
     <div></div>
     <div></div>
</div>

<!-- Example 2 -->
<div class="o-grid" style="--item-width: 350px;">
     <div></div>
     <div></div>
     <div></div>
</div>
```

Nếu bạn quan tâm đến `CSS variable inline` , có thể xem thêm [bài viết này](https://ishadeed.com/article/css-variables-inline-styles/).

## Conclusion

Trên là tìm hiểu vể các trường hợp sử dụng `css variables`, hi vọng giúp ích được cho mọi người

Thank for watching!!!

## References

- [use css variables](https://viblo.asia/p/cach-su-dung-co-ban-css-variables-gGJ59kXGZX2)
- [css variable 101](https://ishadeed.com/article/css-vars-101/)
- [css variables inline](https://ishadeed.com/article/css-variables-inline-styles)
- [benefits css variables](https://viblo.asia/p/kham-pha-nhung-loi-ich-cua-css-variables-Eb85oBE6l2G)
- [practical-css-variables](https://ishadeed.com/article/practical-css-variables/)