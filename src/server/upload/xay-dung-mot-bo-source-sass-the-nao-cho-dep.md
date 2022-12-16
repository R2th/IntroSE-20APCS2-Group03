Ở [bài trước](https://viblo.asia/p/frontend-developer-va-hanh-trang-lam-dau-trong-moi-du-an-LzD5djDwZjY), mình đã chia sẻ với các bạn một số tips để coding *"vở sạch chữ đẹp"*. Để tiếp nối cho phần chia sẻ trước, hôm nay mình xin chia sẻ cách để tổ chức source và coding SASS tối ưu thời gian đồng thời giúp cho mình "Best Practices" hơn.

![](https://images.viblo.asia/bcb55b91-7ac4-4d0f-8e5a-d29d49f90631.png)

## Quy hoạch thế nào để dễ quản lý
Đây là một dạng cấu trúc folder SASS của mình trong mỗi dự án. Bạn cũng có thể tham khảo
```
sass/
|
|– abstracts/
|   |– _variables.scss    // Variables
|   |– _functions.scss    // Functions
|   |– _mixins.scss       // Mixins
|
|– base/
|   |– _animation.scss    // Animation
|   |– _global.scss       // Global define
|   |– _fonts.scss        // Fonts define
|   |– _reset.scss        // Reset/normalize
|   |– _utilities.scss    // utilities
|
|– components/
|   |– _buttons.scss      // Buttons
|   |– _tabs.scss         // Tabs
|   |– _slider.scss       // Slider
|
|– layout/
|   |– _navigation.scss   // Navigation
|   |– _grid.scss         // Grid system
|   |– _header.scss       // Header
|   |– _footer.scss       // Footer
|   |– _sidebar.scss      // Sidebar
|   |– _forms.scss        // Forms
|
|– pages/
|   |– _home.scss         // Home specific styles
|   |– _about.scss        // About specific styles
|   |– _contact.scss      // Contact specific styles
|
`– main.scss              // Main SASS file
```

> - Abstracts là nơi định nghĩa `variables`, `functions`, `mixins`.
> - Base bao gồm những tiêu chuẩn styles như resets, các rule và phần chung thường được sử dụng xuyên suốt project.
> - Components (or modules) định nghĩa các styles dành cho buttons, tabs, card, sliders và các thành phần tương tự. thông thường 1 project sẽ có nhiều components như vậy.
> - Layout chứa tất cả các styles liên quan đến layout trong project của bạn. Ví dụ như phần header, footer, navigation và grid system.
> - Pages những styles cho từng trang cụ thể. Ví dụ như có một trang không cùng styles với các trang khác và bạn không muốn để ở phần styles chung.
> - Vendors (có thể import từ `node_modules`) bao gồm tất cả những phần code mở rộng của bên thứ 3 của thư viện như, `jQuery`, `Bootstrap`...
> - `main.scss` dùng import các file khác để tạo ra file css chung cho cả website.

```scss
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';

// Import library from node_modules
@import 'node_modules/jquery';
@import 'node_modules/bootstrap';

@import 'base/reset';
@import 'base/fonts';
@import 'base/animation';
@import 'base/global';

@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/navigation';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/tabs';
@import 'components/slider';

@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';

@import 'base/utilities';
```

## Sắp xếp sao cho ngăn nắp
Thông thường khi làm việc với SASS, bạn sẽ `include`, `extend`... Vậy sắp xếp thế nào cho đúng:
> `extend` luôn đặt trên cùng > sau đó đến `include` > properties ở những line tiếp theo sẽ override phần ở trên.

```scss
.section-header {
  @extend .other-component;
  @include middle-flex();

  margin: 10px;
  padding: 10px;
}
```

### Sắp xếp các thuộc tính theo nhóm
Thông thường, chúng ta viết các thuộc tính CSS một cách tự do, việc này cũng không có vấn đề gì. Tuy nhiên, để giúp code sạch đẹp, ngăn nắp hơn thì việc sắp xếp các thuộc tính theo 1 quy tắc nhất định sẽ giúp bản thân và người người khác maintain đỡ vất vả. Khi đó code của bạn cũng được đánh giá cao.

Có người sẽ sắp xếp theo thứ tự abc... theo mình cách dễ nhìn nhất là sắp xếp theo nhóm các thuộc tính liên quan.

```css
.component {
  // Layout properties
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  // Position properties
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  // Box model properties
  width: 100px;
  height: 200px;
  padding: 10px 0;
  margin: 0 10px;

  // Visual Properties
  background: $white;
  color: $primary;
  border: 1px solid $dark-1;
  border-radius: 10px;
  outline: 0;
  box-shadow: 0 5px 0 $white;

  // Typography properties
  font-family: $font-base;
  font-size: $font-size-base;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;

  // Mics properties
  cursor: pointer;
  overflow: auto;
  z-index: 9;

  // CSS3 properties
  transform: scale(2);
  transition: all .3s;

  // Pseudo class
  &:hover {}

  &:after {}

  &:before {}

  &:first-child {}

  &:last-child {}

  // Breakpoint sorted descending
  @media screen and (max-width: 1200px) {}

  @media screen and (max-width: 992px) {}

  @media screen and (max-width: 767px) {}

  // Selector 
  &__list {}

  .selector {}
}
```

## Đôi lời gửi gắm
### - Dùng SCSS thay vì SASS
Nên viết với định dạng `.scss` thay vì `.sass`.
SCSS (Sassy CSS) là bản nâng cấp, thừa hưởng những gì tốt đẹp nhất từ người anh trai SASS. Tuy nhiên cũng có một vài ưu điểm điểm khiến mình lựa chọn.

|  | SASS | SCSS |
| -------- | -------- | -------- |
| Thể hiện quy tắc xếp chồng (Nested) | Chỉ sử dụng thụt lề (indent) | Sử dụng cặp dấu `{ }`|
| Kết thúc property	| Không dùng `;` (semicolon)	| Dùng `;` |
| Khai báo mixins | Sử dụng `=` | Sử dụng `@mixins` |
| Sử dụng mixins | Sử dụng `+` | Sử dụng `@include` |

### - Tích cực thống nhất code của mình bằng variables
```scss  
// ======================================================
// Abstracts :: Variables
// ======================================================

// Paths
$path-image: '../images';
$path-fonts: '../fonts';

// Colors
$white: #fff;
$black: #000;
$primary: #c00400;

// Fonts
$font-family-base: 'Hiragino Sans', 'Noto Sans Japanese', 'Yu Gothic', 'Meiryo', 'Hiragino Kaku Gothic Pro', '游ゴシック', 'メイリオ', 'MS ゴシック', 'sans-serif';
$font-family-heading: 'Playfair Display', serif;

// Breakpoints
$breakpoints: (
  small: 767px,
  medium: 992px,
  large: 1200px
);
```

```scss
.title {
  color: $primary;
  background: $white;
  font-size: $font-family-heading;
}
```

Những thuộc tính như `font-size`, `font-family`, `color`, `background` nên dùng biến để thống nhất, không đặt trực tiếp.

### - Dừng lại ở 3 level
```scss
.section {
  .list {
    .items {
      // STOP!
    }
  }
}
```
Selector chỉ nên viết **tối đa 3 level**, càng nhiều cấp sẽ làm performance bị hạn chế hiệu năng. Bạn cũng nên sử dụng BEM để hạn chế việc phải selector nhiều cấp.
```scss
.section {
  &__list { // .section__list
    &__items {} // .section__list__items
  }

  &--about {} // .section--about
}
```
Cách viết trên sẽ giúp chúng ta dễ phân biệt được các level của block, element, modifier và giúp ta tránh được việc selector nhiều cấp, giúp performance được tối ưu.

### - Viết gọn code để dễ đọc
```scss
// Good
@for $i from 1 through 3 {
  .fading-item {
    &:nth-child(#{$i}) {
      transition-delay: 250ms * $i;
    }
  }
}
```

```scss
// Bad
.fading-item {
  &:nth-child(1) {
    transition-delay: 250ms;
  }
  
  &:nth-child(2) {
    transition-delay: 500ms;
  }
  
  &:nth-child(3) {
    transition-delay: 750ms;
  }
}
```

## Tổng kết
Trên đây là một vài chia sẻ của mình về kinh nghiệm xây dựng dự án với SASS. Hãy tạo cho mình một bộ source thật bài bản và những dòng code dễ maintain. Chúc các bạn có một source code *"sạch sẽ"* và review những dòng code của người khác thật dễ nhìn. Nếu các bạn có ý tưởng gì hay, hãy cùng chia sẻ với mình ở comment nhé.