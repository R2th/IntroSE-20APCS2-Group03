Việc duy trì một dự án CSS quy mô lớn thật khó, tất cả chúng ta đều cố gắng đạt được hai mục tiêu sau:

- **Hiệu quả**: đạt được hiệu quả mong muốn, tăng hiệu suất.
- **Nhất quán**: giảm thời gian suy nghĩ về cách mọi thứ, giảm thời gian làm việc.

Dưới đây là một bài viết được chia sẻ về một dự án yêu cầu xây dựng một kiến trúc CSS có thể mở rộng, sử dụng BEM và các utility classes.

## CSS Globals

Globals là một file CSS bao gồm những rules được áp dụng cho tất cả các components (ví dụ như màu, tỷ lệ giãn cách, tỷ lệ kiểu chữ,...). Globals sử dụng tokens để giữ cho các thiết kế nhất quán ở tất cả components và giảm kích thước CSS. Dưới đây là một ví dụ:

```css
/* Typography | Global */
:root {
  /* body font size */
  --text-base-size: 1em;

  /* type scale */
  --text-scale-ratio: 1.2;
  --text-xs: calc((1em / var(--text-scale-ratio)) / var(--text-scale-ratio));
  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));
  --text-md: calc(
    var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio)
  );
  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));
  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));
}

@media (min-width: 64rem) {
  /* responsive decision applied to all text elements */
  :root {
    --text-base-size: 1.25em;
    --text-scale-ratio: 1.25;
  }
}

h1,
.text-xxl {
  font-size: var(--text-xxl, 2.074em);
}
h2,
.text-xl {
  font-size: var(--text-xl, 1.728em);
}
h3,
.text-lg {
  font-size: var(--text-lg, 1.44em);
}
h4,
.text-md {
  font-size: var(--text-md, 1.2em);
}
.text-base {
  font-size: 1em;
}
small,
.text-sm {
  font-size: var(--text-sm, 0.833em);
}
.text-xs {
  font-size: var(--text-xs, 0.694em);
}
```

## BEM

BEM là một phương pháp đặt tên class nhằm mục đích nhất quáng vào tạo ra các components tái sử dụng

- **Block** là một component tái sử dụng
- **Element** là con của một block (Ví dụ: .block\_\_element)
- **Modifier** là một biến thể của block/element (Ví dụ: .block--modifier, .block\*\*element--modifier)

```html:html
<header class="header">
  <a href="#0" class="header__logo"><!-- ... --></a>
  <nav class="header__nav">
    <ul>
      <li>
        <a href="#0" class="header__link header__link--active">Homepage</a>
      </li>
      <li><a href="#0" class="header__link">About</a></li>
      <li><a href="#0" class="header__link">Contact</a></li>
    </ul>
  </nav>
</header>
```

## Utility classes

Utility class là một lớp CSS chỉ làm một việc. Ví dụ:

```html:html
<section class="padding-md">
  <h1>Title</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</section>

<style>
  .padding-sm {
    padding: 0.75em;
  }
  .padding-md {
    padding: 1.25em;
  }
  .padding-lg {
    padding: 2em;
  }
</style>
```

Bạn có thể kết nối các lớp tiện ích với CSS globals:

```css
/* Spacing | Global */
:root {
  --space-unit: 1em;
  --space-xs: calc(0.5 * var(--space-unit));
  --space-sm: calc(0.75 * var(--space-unit));
  --space-md: calc(1.25 * var(--space-unit));
  --space-lg: calc(2 * var(--space-unit));
  --space-xl: calc(3.25 * var(--space-unit));
}

/* responsive rule affecting all spacing variables */
@media (min-width: 64rem) {
  :root {
    --space-unit: 1.25em; /* 👇 this responsive decision affects all margins and paddings */
  }
}
/* margin and padding util classes - apply spacing variables */
.margin-xs {
  margin: var(--space-xs);
}
.margin-sm {
  margin: var(--space-sm);
}
.margin-md {
  margin: var(--space-md);
}
.margin-lg {
  margin: var(--space-lg);
}
.margin-xl {
  margin: var(--space-xl);
}

.padding-xs {
  padding: var(--space-xs);
}
.padding-sm {
  padding: var(--space-sm);
}
.padding-md {
  padding: var(--space-md);
}
.padding-lg {
  padding: var(--space-lg);
}
.padding-xl {
  padding: var(--space-xl);
}
```

Sau đây là một ví dụ thực tế

```html:html
<div class="grid">
  <article class="card">
    <a class="card__link" href="#0">
      <figure>
        <img class="card__img" src="/image.jpg" alt="Image description" />
      </figure>

      <div class="card__content">
        <h1 class="card__title-wrapper">
          <span class="card__title">Title of the card</span>
        </h1>

        <p class="card__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          totam?
        </p>
      </div>

      <div class="card__icon-wrapper" aria-hidden="true">
        <svg class="card__icon" viewBox="0 0 24 24"><!-- icon --></svg>
      </div>
    </a>
  </article>

  <article class="card"><!-- card --></article>
  <article class="card"><!-- card --></article>
  <article class="card"><!-- card --></article>
</div>
```

```css
/* without BEM */
.grid {
}
.card {
}
.card > a {
}
.card img {
}
.card-content {
}
.card .title {
}
.card .description {
}

/* with BEM */
.grid {
}
.card {
}
.card__link {
}
.card__img {
}
.card__content {
}
.card__title {
}
.card__description {
}
```

Update thêm: [http://stech.edu.vn/](http://stech.edu.vn/)