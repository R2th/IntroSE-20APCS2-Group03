## Halo các bạn,

Lại là mình với một bài post liên quan tới chủ đề Front-end đây :rofl: Mình còn nhớ hồi mình bắt đầu tìm hiểu và bị SASS lôi cuốn, mình đã nghĩ rằng mình sẽ chẳng bao giờ cần dùng đụng tới CSS thuần nữa... Đúng là yêu vào thì ai cũng sẽ mù quáng mà... :sneezing_face: 

Nhưng rồi, qua nhiều dự án và nhiều vấn đề phát sinh trong việc quản lý, sử dụng và mở rộng code, mình dần nhận ra được tầm quan trọng cũng như sức mạnh của CSS thuần mà trước đây mình không hề hay biết! Vì thế, hôm nay mình sẽ nói về một trong những điều mình đã được "giác ngộ", đó là: [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).

![](https://images.viblo.asia/a2ea9522-5816-44ef-a596-98ff6c7074ca.png)

## Trước tiên...

Để có thể nắm bắt được nội dung của bài viết này, các bạn cần hiểu cơ bản về [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) cũng như [SASS variables](https://sass-lang.com/documentation/variables). Để tiện hơn, nhất là cho các bạn chưa rõ, thì mình sẽ nói từ ví dụ cơ bản nhất nhé:

**Trong CSS:**
```css
:root {
  --color-primary: hsl(220, 90%, 56%);
}

.link {
  color: var(--color-primary);
}
```

Đây là cách cơ bản để khai báo một thuộc tính trong CSS mà không cần phải sử dụng thêm các bổ trợ bên ngoài như SASS...

**Trong SCSS:**
```css
$color-primary: hsl(220, 90%, 56%);

.link {
  color: $color-primary;
}
```

Nhìn qua ví dụ trên thì có vẻ chúng trông khá giống nhau, nhưng thực tế thì không hẳn nha! :rofl:

CSS custom properties khác SASS varialbes ở một số điểm như sau:
1. Các thuộc tính nằm trong phạm vi phần tử mà chúng được khai báo (tức là có chia scope)
1. Có sự phân tầng
1. Có thể tương tác với Javascript

Chính sự khác biệt đó đã tạo ra một thế giới của những khả năng vô cùng mới mẻ cho CSS properties mà không phải ai cũng biết... Hãy cùng mình ngó qua một số ví dụ thực tế hơn để thấy rõ hơn những gì đã nói phía trên nhé! :sunglasses:

# 1. Khởi tạo và ứng dụng các chủ đề màu sắc (color themes)

Ví dụ mình cần tạo 2 chủ đề màu sắc là sáng (mặc định) và tối, khi triển khai với SASS varialbes, theo một cách tối giản nhất thì trông "nó sẽ kiểu kiểu như này":

```css
$color-primary: blue;
$color-text: black;
$color-bg: white;
/* invert */
$color-primary-invert: red;
$color-text-invert: white;
$color-bg-invert: black;

.component {
  color: $color-text;
  background-color: $color-bg;

  a {
    color: $color-primary;
  }
}

.component--dark {
  color: $color-text-invert;
  background-color: $color-bg-invert;

  a {
    color: $color-primary-invert;
  }
}
```

Ồ, trông có vẻ không có vấn đề gì lắm, nhưng hãy giả sử trong dự án thực tế khi mà chúng ta có cả tá các components hay themes trong ứng dụng, ta sẽ phải xử lý từng component ở mỗi theme bất kể khi nào ta thêm mới hay cập nhật... Ôi, chắc làm như vậy thì mình xin phép đi ngủ luôn ấy chứ. :scream:

Nhưng nếu ta áp dụng CSS properties, mọi chuyện sẽ trở nên dễ dàng hơn rất nhiều. Trước hết ta cũng cần khai báo các màu sắc:

```css
:root, [data-theme="default"] {
  --color-primary: blue;
  /* color contrasts */
  --color-bg: white;
  --color-contrast-lower: hsl(0, 0%, 95%);
  --color-contrast-low: hsl(240, 1%, 83%);
  --color-contrast-medium: hsl(240, 1%, 48%);
  --color-contrast-high: hsl(240, 4%, 20%);
  --color-contrast-higher: black;
}

[data-theme] {
  background-color: var(--color-bg);
  color: var(--color-contrast-high);
}

[data-theme="dark"] {
  --color-primary: red;
  /* color contrasts */
  --color-bg: black;
  --color-contrast-lower: hsl(240, 6%, 15%);
  --color-contrast-low: hsl(252, 4%, 25%);
  --color-contrast-medium: hsl(240, 1%, 57%);
  --color-contrast-high: hsl(0, 0%, 89%);
  --color-contrast-higher: white;
}
```

Rõ ràng ta có thể thấy, đối với theme dark hay các theme khác sau này, ta chỉ cần override các màu sắc ta cần sử dụng, chứ không phải khai báo thêm màu sắc mới! Và tiếp theo là cách mà ta áp dụng các màu đã khai báo vào components của mình:

```css
.component {
  color: var(--color-contrast-higher);
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-contrast-low);

  a {
    color: var(--color-primary);
  }
}
```

Chỉ vậy thôi đó, ta không phải khai báo nhân đôi thêm số lượng components cho các themes khác, hay lo lắng về sự phức tạp của components như với cách tiếp cận ban đầu nữa. Công việc của ta bây giờ là quan tâm các màu sắc được sử dụng cho mỗi theme mà thôi... Điều này giúp lập trình viên quản lý và mở rộng code quả thực dễ dàng hơn rất rất nhiều luôn ý. :100:

Ngoài view thì ta chỉ cần vài ba dòng code như này là xong xuôi:

```css
<section data-theme="dark">
  <div class="component">
    <div class="child" data-theme="default"></div>
  </div>
</section>
```

Trông cái code xem, ta có thể vừa apply dark theme cho thằng cha, vừa apply default theme cho thằng con mà chẳng cần suy nghĩ nhiều! "Thật đáng sợ". :scream: 

Và đương nhiên, khi đã nắm được kĩ thuật hay ho này, bạn có thể hoàn toàn làm ra một trang web có nhiều color themes vô cùng trendy:
![](https://images.viblo.asia/598b6ad2-7a8c-4907-9f8a-c6ec8f28a0b3.gif)

# 2. Điều chỉnh độ giãn nở kiểu chữ
Khi bạn quản lý độ giãn nở của kiểu chữ, mình cá là bạn sẽ đồng ý với mình về cách code này khi dùng SASS properties:
```css
$text-xs: 0.694em;
$text-sm: 0.833em;
$text-base-size: 1em;
$text-md: 1.2em;
$text-lg: 1.44em;
$text-xl: 1.728em;
```

Hmmmmmm, trông cũng ổn mà, nhưng vấn đề là với các breakpoints màn hình khác nhau mà ta muốn có các giá trị khác thì sao? Ta chỉ có thể tạo thêm các biến SCSS mới mà thôi! Mình cá là bạn không muốn vậy, nên hãy cùng xem cách tiếp cận vấn đề khi sử dụng CSS nhé!

Ta cũng sẽ khai báo các giá trị khởi tạo như bình thường, ở đây mình có 2 thuộc tính là `--text-base-size` và `---text-scale-ratio` để kiểm soát toàn bộ các thuộc tính giãn nở khác khi chúng đều được tính toán dựa trên 2 thuộc tính ban đầu này!  :stuck_out_tongue_winking_eye:

```css
:root {
  // body font size
  --text-base-size: 1em;
  
  // type scale
  --text-scale-ratio: 1.2;
  --text-xs: calc((1em / var(--text-scale-ratio)) / var(--text-scale-ratio));
  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));
  --text-md: calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));
  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));
  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));
  --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));
}
```

Và ứng với mỗi breakpoints mong muốn, mình đơn giản chỉ cần override lại thuộc tính đó trong scope của breakpoint đó mà thôi, so easyyy: :100:

```css
:root {
  @include breakpoint(md) {
    --text-base-size: 1.25em;
    --text-scale-ratio: 1.25;
  }
}
```

Hãy nhìn bức ảnh phía dưới xem, ta chỉ cần thay đổi 1 chỗ, rất nhanh thôi ta đã có 1 bộ kiểu chữ hoàn toàn mới cho ứng dụng của mình:

![](https://images.viblo.asia/87db6347-787b-41f0-ab39-4be9e68bc1e8.gif)

# 3. Điều chỉnh độ giãn nở khoảng cách

Tương tự như với phần trên, ta sẽ áp dụng CSS properties để quản lí các thuộc tính khoảng cách trong ứng dụng vô cùng "mượt" như sau:

```css
:root {
    --space-unit:  1em;
    --space-xxxxs: calc(0.125 * var(--space-unit)); 
    --space-xxxs:  calc(0.25 * var(--space-unit));
    --space-xxs:   calc(0.375 * var(--space-unit));
    --space-xs:    calc(0.5 * var(--space-unit));
    --space-sm:    calc(0.75 * var(--space-unit));
    --space-md:    calc(1.25 * var(--space-unit));
    --space-lg:    calc(2 * var(--space-unit));
    --space-xl:    calc(3.25 * var(--space-unit));
    --space-xxl:   calc(5.25 * var(--space-unit));
    --space-xxxl:  calc(8.5 * var(--space-unit));
    --space-xxxxl: calc(13.75 * var(--space-unit));
}

@supports(--css: variables) {
  :root {
    @include breakpoint(md) {
      --space-unit:  1.25em;
    }
  }
}
```

Cách tiếp cận thông minh này quả thực là liều thuốc chữa đau đầu cho bất cứ Front-end developer nào về vấn đề responsive. :rofl:

![](https://images.viblo.asia/395581a9-9621-4234-a5e1-8b3da9da0e60.gif)

# 4. Chỉnh sửa giá trị ở cấp độ thành phần
Hãy cùng nhìn qua đoạn code sau và xem vấn đề chúng ta gặp phải là gì nha...

```css
.article {
  h1, h2, h3, h4 {
    line-height: 1.2;
    margin-bottom: $space-xs;
  }

  ul, ol, p, blockquote {
    line-height: 1.5;
    margin-bottom: $space-md;
  }
}

.article--sm {
  h1, h2, h3, h4 {
    line-height: 1.1;
    margin-bottom: $space-xxxs;
  }

  ul, ol, p, blockquote {
    line-height: 1.4;
    margin-bottom: $space-sm;
  }
}
```

Có lẽ bạn đã thấy sự bất cập của SCSS variables khi ta cần tạo ra component `article` ở các kích thước khác nhau, ta sẽ cần tạo thêm các lớp component khác đôi khi chỉ để chỉnh sửa một vài giá trị thích hợp. Thế còn với CSS properties?

```
// Base component 
.text-component {
  --component-body-line-height: calc(var(--body-line-height) * var(--line-height-multiplier, 1));
  --component-heading-line-height: calc(var(--heading-line-height) * var(--line-height-multiplier, 1));
  --line-height-multiplier: 1;
  --text-vspace-multiplier: 1;

  h1, h2, h3, h4 {
    line-height: var(--component-heading-line-height);
    margin-bottom: calc(var(--space-xxxs) * var(--text-vspace-multiplier));
  }

  h2, h3, h4 {
    margin-top: calc(var(--space-sm) * var(--text-vspace-multiplier));
  }

  p, blockquote, ul li, ol li {
    line-height: var(--component-body-line-height);
  }
  
  ul, ol, p, blockquote, .text-component__block, .text-component__img {
    margin-bottom: calc(var(--space-sm) * var(--text-vspace-multiplier));
  }
}

// Main component, we just need to override some properties
.article.text-component { // e.g., blog posts
  --line-height-multiplier: 1.13; // increase article line-height
  --text-vspace-multiplier: 1.2; // increase vertical spacing
}
```

Thật vi diệu, ta chỉ cần khai báo mọi thứ ở class `.text-component` và override lại thuộc tính quan trọng ở nơi ta sử dụng chúng (ví dụ: `.article.text-component`) mà thôi. Các bạn có thể xem cụ thể hơn ở code dưới đây nha:

{@codepen: https://codepen.io/codyhouse/pen/yQxVXG}

# 5. Trừu tượng hóa hành vi của các thành phần
Rõ ràng mà nói, nhìn các ví dụ phía trên, mình dám chắc bạn sẽ cảm thấy như đang code OOP vậy vì ta sử dụng sức mạnh của override rất nhiều :rofl:. Ta hoàn toàn thấy được hành vi của các thành phần đã được trừu tượng hóa dựa vào việc giá trị của thuộc tính CSS trong scope của nó. Với cá nhân mình mà nói, việc này chắc chắn sẽ mang cho chúng ta một cuộc sống của developer dễ thở hơn rất nhiều... :heart_eyes:

## Có thể kết hợp CSS và SASS không?
Câu hỏi đơn giản nhưng cũng có nhiều bạn mới sẽ thắc mắc, câu trả lời ở đây là: **Hoàn toàn có**. SASS cũng dựa trên CSS mà ra, nó cung cấp thêm rất nhiều thứ mà CSS thuần không thể làm được, vậy chẳng có lý do gì mà ta không sử dụng. Cái mình nói trong bài viết này không phải về sử dụng CSS hay SASS, mà là về một số kỹ thuật của chúng mà ta nên biết để áp dụng sao cho hiệu quả nhất mà thôi! :rofl:

## Tính tương thích
Nghe chừng cái lưu ý này có vẻ ít người cần lo lắng, nhưng tính mình cẩn thận nên cứ nhắc các bạn là CSS properties và các kỹ thuật sử dụng nó trong các ví dụ phía trên có thể không tương thích hay hoạt động với một số trình duyệt cũ nha. Cụ thể các bạn có thể [xem thêm ở ảnh dưới](https://caniuse.com/css-variables): 

![](https://images.viblo.asia/c4020f3a-53ff-41a9-a502-dd2e8fde51d5.png)

## ... Cuối cùng
Vậy là chúng ta đã thấy được sự vượt trội của CSS properties so với SCSS variables qua các ví dụ thực tiễn ở trên. Mình tin nếu bạn nắm được kỹ thuật này và sử dụng linh hoạt nó trong các dự án của mình, bạn sẽ có thể kiểm soát và tăng tốc việc quản lý, chỉnh sửa các components lên rất nhiều! :sunglasses:

Rất cảm ơn các bạn đã đọc tới đây, mình mong bài viết của mình sẽ giúp bạn có thêm được những điều bổ ích để áp dụng vào trong công việc của bản thân... :heart_eyes:

___
[Nguồn tham khảo](https://codyhouse.co/blog/post/css-custom-properties-vs-sass-variables)