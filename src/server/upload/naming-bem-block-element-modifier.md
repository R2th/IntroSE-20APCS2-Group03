![](https://images.viblo.asia/6036df9c-bb55-4e4d-82bf-738f0d294518.jpg)

### 1. Overview
- BEM (Block-Element-Modifier) là một quy ước đặt tên CSS được phát triển bởi team tại [Yandex](https://yandex.com/dev/bem/) để cải thiện khả năng mở rộng và khả năng bảo trì trong phát triển web
- Nói một cách đơn giản, ý tưởng của BEM là `chia giao diện người dùng thành các khối độc lập` bằng cách đặt tên cho các lớp CSS theo phương pháp sau:
```css
/* Block component */
.card {}
/* Elements are dependent on their parent block */ 
.card__img {}
/* Modifiers are for incremental style changes */
.card--dark {} 
.card__img--large {}
```
1. **Block**: Là một thành phần độc lập có thể được sử dụng lại. (VD: class `.nav`)
2. **Element**: Là một thành phần con trong một block không thể được sử dụng riêng biệt với block đó. (VD: class `.nav__item`)
3. **Modifier**: Là sự thay đổi style css của block hoặc element (VD: class `.nav--dark`, `nav__item--circle`)

### 2. Blocks
-  Là các khối có thể tái sử dụng, giống như `button`, `card`, hoặc `field` trong form
- Khi đặt tên Block, cần tập trung vào việc mô tả mục đích của nó (Nó là gì) thay vì trạng thái của nó (VD: Nó trông như thế nào) 
- Ví dụ: `.btn` hoặc `.nav` tuân theo quy ước đặt tên chính xác cho một block. `.big` hoặc `.bright-pink` mô tả cách nó trông như thế nào, vì vậy sẽ không mở rộng quy mô tốt khi bạn muốn thay đổi thiết kế sau này.
```html
<!-- INCORRECT -->
<div class="large-red-box">
 <img src="...">
 <h2>...</h2>
 <p>...</p>
 <a>...</a>
</div>
<style>
 .large-red-box {}
</style>
```
```html
<!-- CORRECT -->
<div class="card">
 <img src="...">
 <h2>...</h2>
 <p>...</p>
 <a>...</a>
</div>
<style>
 .card {}
</style>
```
- Nếu bạn đang tự hỏi làm thế nào để đặt tên các block lồng nhau (ví dụ: một button nằm trong nav) [bài viết này](https://scalablecss.com/bem-blocks-within-blocks/) sẽ giúp bạn làm điều đó.
### 3. Elements
- Các element nằm bên trong block, phụ thuộc vào block cha của chúng, do đó không thể sử dụng nếu không có block.
- Các element cũng có một quy ước đặt tên lớp CSS duy nhất hoạt động như sau: `.block__element`
- Ví dụ: Sử dụng thành phần `.card`, một phần tử bên trong thành phần thẻ (như image) sẽ có tên lớp như `.card__img`.
- Tên element luôn nối với tên block, được phân tách bằng dấu gạch dưới kép `__`.
```html
<!-- INCORRECT -->
<div class="card">
 <img src="...">
 <h2>...</h2>
 <p>...</p>
 <a>...</a>
</div>
<style>
 .card {}
 .card img {}
 .card h2 {}
 .card p {}
 .card a {}
</style>
```
```html
<!-- CORRECT -->
<div class="card">
 <img class="card__img" src="...">
 <h2 class="card__title" >...</h2>
 <p class="card__description" >...</p>
 <a class="card__button">...</a>
</div>
<style>
 .card {}
 .card__img {}
 .card__title {}
 .card__description {}
</style>
```
- Thực hiện theo cách tiếp cận này làm giảm nguy cơ xảy ra [các sự cố](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/) xuống dòng.
- Nếu bạn đang thắc mắc về cách xử lý các phần tử BEM được lồng sâu 3 hoặc 4 lớp, hãy xem [bài viết về chủ đề này](https://scalablecss.com/bem-nesting-grandchild-elements/).
### 4. Modifiers
- Khi bạn có nhiều kiểu khác nhau trong các khối (hoặc element), đó là lúc các công cụ sửa đổi xuất hiện.
- Ví dụ: khối `card` của bạn có thể có màu `light` và `dark`. Hoặc bạn có thể có các `button` chính và phụ.
-  Modifier có một quy ước đặt tên CSS duy nhất hoạt động như sau: `block--modifier` hoặc `block__element--modifier`.
-  Đúng vậy modifier có thể được áp dụng cho cả block và element.
-  Hãy xem VD đặt tên tốt và không tốt:
```html
<!-- INCORRECT -->
<div class="card--dark">
 <img src="...">
 <h2 class="card__title--large">...</h2>
 <p>...</p>
 <a>...</a>
</div>
<style>
 .card--dark {}
 .card__title--large {}
</style>
```
- Việc sử dụng riêng một lớp  (tức là không có block hoặc element) được coi là không tốt.
- Đó là bởi vì modifier có nghĩa là để thêm các thay đổi vào block.
- Do đó, bất cứ khi nào sử dụng modifier, hãy đảm bảo rằng nó được sử dụng với lớp cơ sở:
```html
<!-- CORRECT -->
<div class="card card--dark">
 <img src="...">
 <h2 class="card__title card__title--large">...</h2>
 <p>...</p>
 <a>...</a>
</div>
<style>
 .card {}
 .card--dark {}
 .card__title {}
 .card__title--large {}
</style>
```
- Đó là những nguyên tắc cơ bản giúp bạn bắt đầu và hoạt động với BEM.
- Nếu bạn muốn tìm hiểu thêm về  BEM, tôi khuyên bạn nên xem [bài viết Thủ thuật CSS này](https://css-tricks.com/bem-101/).
- Giống như học bất cứ điều gì mới, thực hành là chìa khóa. Hãy thử áp dụng BEM trong dự án tiếp theo của bạn và xem nó sẽ đưa bạn đến đâu!
### 5. Let's practice
**Trong phần này tôi sẽ triển khai một alert message theo cấu trúc BEM**
- Ở đây tôi tạo block alert để chứa các element `alert__icon`, `alert__body`, `alert__close` .
```html
<div class="alert">
    <div class="alert__icon">
        <i class="fas fa-check-circle"></i>
    </div>
    <div class="alert__body">
        <h3 class="alert__title">Title</h3>
        <p class="alert__msg">Message</p>
    </div>
    <div class="alert__close">
        <i class="fas fa-times"></i>
    </div>
</div>
```
- Style cho các element một chút nào
```css
.alert {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 0;
  border-left: 4px solid;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
}
.alert + .alert {
  margin-top: 24px;
}
.alert__icon {
  font-size: 24px;
  padding: 0 16px;
}
.alert__close {
  padding: 0 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.alert__body {
  flex-grow: 1;
}
.alert__title {
  font-size: 16px;
  font-weight: 800;
  color: #333;
}
.alert__msg {
  font-size: 14px;
  color: #888;
  margin-top: 6px;
  line-height: 1.5;
}
```
- Hình ảnh sau khi style
![](https://images.viblo.asia/bb23657a-f044-40b6-8040-209af4f51b85.PNG)

- Tiếp theo sẽ tạo class Modifier cho alert: `alert--success`, `alert--info`, `alert--warning`, `alert--danger`
```html
<div class="alert alert--success"></div>
<div class="alert alert--info"></div>
<div class="alert alert--warning"></div>
<div class="alert alert--danger"></div>
```
- Style css cho class modifier
```css
.alert--success {
    border-color: #47d864;
}
.alert--success .alert__icon {
    color: #47d864;
}
.alert--info {
    border-color: #2f86eb;
}
.alert--info .alert__icon {
    color: #2f86eb;
}
.alert--warning {
    border-color: #ffc021;
}
.alert--warning .alert__icon {
    color: #ffc021;
}
.alert--danger {
    border-color: #ff623d;
}
.alert--danger .alert__icon {
    color: #ff623d;
}
```
- Hình ảnh sau khi style  class modifier
![](https://images.viblo.asia/3d0eeb98-bfb8-4c10-a2f0-e6ad65b2b87e.PNG)
- Source code: https://codesandbox.io/s/bem-ghqjd?file=/index.html
### 6. Reference
- https://scalablecss.com/bem-quickstart-guide/