Trong bài viết này mình sẽ giới thiệu về đến các bạn một số hàm siêu hay của CSS.
## 1. Attr()
`attr()` là một hàm rất tốt để giúp chúng ta có để tận dụng việc custom data attributes.
chúng ta hãy cùng thực hiện ví dụ theo mẫu code sau :
```html
<div class="thumbnail" href="#" data-title="..." data-description="...">
  <img src="img.jpg" alt="Attr"/>
</div>
```
```css
.thumbnail::after {
  content: attr(data-title);
    ...
}
```
kết quả sẽ như sau:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/dyywzJE?editors=0100}

## 2. CSS counters
Đây không phải là một tính năng phổ biến của CSS nhưng nó lại làm được những thứ khá hay ho mà hầu hết các trình duyệt hiện nay đều hỗ trợ.
Hãy xem ví dụ sau:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/abbPyRP}

## 3. calc()
Trong bài này mình sẽ áp dụng calc() với Aligning `position: fixed`.
hãy xem demo sau:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/LYYMjXo}

## Kết luận
Như vậy trong bài này mình đã giới thiệu đến các bạn một vài hàm khá hữu ích trong CSS. cảm ơn các bạn đã đọc.

tham khảo: https://www.sitepoint.com/8-clever-tricks-with-css-functions/