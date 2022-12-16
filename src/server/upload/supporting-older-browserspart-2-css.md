## Introduction
Ở phần [trước](https://viblo.asia/p/supporting-older-browsers-part-1-javascript-07LKXmOrZV4) mình đã giới thiệu về vấn đề javascript support cho các browser cũ, ở bài viết này mình sẽ tiếp tục giới thiệu về CSS support, cụ thể là về **Property fallbacks** và **Feature queries**
## Property fallbacks
![](https://images.viblo.asia/4df8c130-a085-4566-b6d9-8e6eea84726a.png)

Nếu browser không hỗ trợ property A nào đó hoặc các giá trị tương ứng, nó sẽ bỏ qua toàn bộ property A đó. Trong trường hợp này, browser sẽ tìm các giá trị đằng trước - **fallback**- mà nó tìm thấy.

Ví dụ về việc sử dụng **fallback**:
```css
.layout {
  display: block;
  display: grid;
}
```
Browser support CSS Grid sẽ sử dụng `display: grid` và ngược lại, nó sẽ dùng `display: block`
### Omit default values
Nếu element có default là `display: block`, chúng ta có thể bỏ qua việc khai báo `display: block`. Tức là chúng ta chỉ cần viết lại vd trên thành:
```css
.layout {
  display: grid;
}
```
Browser support CSS Grid sẽ đọc được các properties khác vd như `grid-template-columns`, trong khi các browser không hỗ trợ CSS Grid thì không. Điều này có nghĩa là chúng ta có thể viết thêm các CSS Grid properties mà không cần bận tâm đến fallback values:
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
}
```
## Feature queries
**Feature queries**, hay còn được viết dưới dạng `@supports`, có nhiệm vụ cho chúng ta biết CSS property có được support bởi browser hay không. Nó được ví như `if/else` phía backend vậy:
```css
@supports (property: value) {
  /* Code when property or value is supported*/
}

@supports not (property: value) {
  /* Code when property or value is not supported */
}
```
`@supports` khá hữu ích trong trường hợp ta muốn browser đọc CSS property chỉ khi các properties đó được browser hỗ trợ. Quay lại vd CSS Grid bên trên, ta có thể viết như sau:
```css
@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }
}
```
Ở đây `padding-left` và `padding-right` chỉ được đọc bởi browser hỗ trợ cả `@supports` và CSS Grid.

Một ví dụ khác về `-webkit-initial-letter` property:
```css
@supports (initial-letter: 4) or (-webkit-initial-letter: 4) {
  p::first-letter {
     -webkit-initial-letter: 4;
     initial-letter: 4;
     color: #FE742F;
     font-weight: bold;
     margin-right: 0.5em;
  }
}
```
![](https://images.viblo.asia/63f8762d-b1f4-4539-bfd8-5541842af502.gif)

Bên trái là trường hợp property được browser support và ngược lại.
### Support for feature queries
Điều may mắn là **Features queries** được support trên tất cả các trình duyệt phổ biến hiện nay.
![](https://images.viblo.asia/20228847-2001-4430-9b19-596feb66f5bd.PNG)
## Using property-fallback and feature queries at the same time
Hãy cùng xét đoạn code dưới:
```css
@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }
}

.layout {
  padding-left: 2em;
  padding-right: 2em;
}
```
Trong trường hợp này tất cả browsers sẽ áp dụng `2em` cho padding 2 bên trái phải. Lý do đơn giản là vì `padding-left: 2em` và `padding-right: 2em` được định nghĩa sau. Trong CSS file properties nào ở sau sẽ override lại properties trước.

Nếu ta muốn `padding-left: 2em` và `padding-right: 2em` được áp dụng chỉ khi browser không support CSS Grid, chúng ta cần đổi lại thứ tự định nghĩa là được:
```css
.layout {
  padding-left: 2em;
  padding-right: 2em;
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }
}
```
Điều này cũng đồng nghĩa với việc nếu chúng ta sử dụng cả 2 `@supports` và `@supports not`, ta phải định nghĩa `@supports not` trước:
```css
/* Always write "@supports not" first if you use it */
@supports not (display: grid) {
  .layout {
    padding-left: 2em;
    padding-right: 2em;
  }
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }
}
```
## Summary
Bài viết nhằm chia sẻ về cách để support CSS với các browser cũ qua việc sử dụng **Property fallbacks** và **Feature queries** . Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian theo dõi.

Nguồn: https://zellwk.com/blog/older-browsers-css/