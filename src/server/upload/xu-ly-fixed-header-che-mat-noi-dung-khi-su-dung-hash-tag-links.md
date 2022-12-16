Như chúng ta đã biết, khi click vào một thẻ `a` có chứa hash, như dưới đây:
```html
<a href="#section-2">Section 2</a>
```
Trình duyệt sẽ scroll tới vị trí của element có ID là "section-2" và nó sẽ scroll đến vị trí nhỏ nhất có thể để element đó hiển thị đầy đủ nhất trên màn hình.

Một vài vấn đề đau đầu thường gặp khi sử dụng thẻ `a` với hash nhằm mục đích tạo hành động scroll:
*  Có thể gây nhầm lẫn (đặc biệt là khi link đó nhảy đến một khu vực có chứa các tiêu đề khác).
*  Khi mà `header` có `position: fixed`
*  ...

Việc `header` có `position: fixed` là mối đe dọa lớn nhất, chúng ta sẽ xem xét một vài cách xử lý vấn đề đó trong bài viết này

## Dirty HTML Method

Thay vì tập trung vào việc xử lý vấn đề trước tiên như chúng ta thường làm, thì hãy xem cách xử lý vấn đề đó thích hợp cho nhiều trình duyệt trước đã.

Chúng ta sẽ không đặt `id` cho thẻ `section` (hoặc các thẻ heading) như bình thường, thay vào đó chúng ta sẽ đặt nó vào một thẻ `span` trống đặt bên trong `section` hoặc các thẻ heading. Nó sẽ không xuất hiện bên trong các thẻ đó, tuy nhiên sử dụng `span` cho mục đích này không phải là ý kiến hay.

```html
<header>
    ...
        <a href="#goto">Jump</a>
    ...
</header>

<section class="section">
  <span id="section-1">&nbsp;</span>
  <h2>Section 1</h2>
    ...
</section>
```

Tiếp theo chúng ta sẽ ***styles*** cho thẻ `span` đó với giá trị của `margin-top`là giá trị âm của chiều cao `header`. Sau đó, chúng ta sẽ đẩy `header` lại vị trí cũ với giá trị của `padding-top` bằng chiều cao của `header` đó.

```css
.section span{
    margin-top: -80px;        /* Size of fixed header */
    padding-bottom: 80px;
    display: block;
}
```

Cuối cùng, chúng ta sẽ có được một page hoạt động đúng như ý chúng ta muốn.

{@embed: https://codepen.io/numberboo/pen/XWWxreK}

## Clean HTML Method

Sử dụng một thẻ `span` ở vị trí đó khiến code khó hiểu, cơ bản thề `span` không nên đặt ở đó, ngoài ra chúng ta dẫn link đến một thẻ `span` trống - điều này thật vô nghĩa. Code HTML nên giống như dưới đây:
```html
<section id="section-1" class="section">
  <h2>Section 1</h2>
    ...
</section>
```

Chúng ta sẽ xử lý bước tiếp theo bằng CSS bằng cách sử dụng *pseudo element* thay cho nhiệm vụ của thẻ `span` ở cách trên. Chúng ta sẽ set giá trị cho `height` với giá trị bằng chiều cao của `header`, sau đó set giá trị âm cho `margin-top` để đẩy phần nội dung về lại vị trí cũ.

```css 
.section{
  &::before{
    display: block; 
    content: ""; 
    margin-top: -80px; 
    height: 80px; 
    visibility: hidden; 
    pointer-events: none;
  }
  ...
}
```

Và chúng ta đã có một kết quả ưng ý với một cách làm tốt hơn rất nhiều

{@embed: https://codepen.io/numberboo/pen/XWWPZoR}

## Scroll-padding-top

Như chúng ta thấy, hai cách trên đã giúp chúng ta xử lý đc vấn đề nêu ra, nhưng nó lại không giải quyết được trong trường hợp `section` của chúng ta có `padding-top`. Lúc này thì header lại tiếp tục che đi nội dung của `section` (cụ thể ở đây là title của `section`). Để xử lý trường hợp này, chúng ta sẽ sử dụng `scroll-padding` mà cụ thể ở đây là `scroll-padding-top`. Tuy nhiên trước đó chúng ta sẽ tìm hiểu xem `scroll-padding` là gì?

`scroll-padding` là một phần của **CSS Scroll Snap Module**, `scroll-padding` được sử dụng để điều chỉnh lại vị trí của element đối với viewport khi scroll đến element đó. Nó rất hiệu quả khi xử lý fixed header che mất nội dung. (chi tiết mọi người có thể tham khảo [tại đây](https://css-tricks.com/almanac/properties/s/scroll-padding/))

```css
html, body{
  scroll-padding-top: 80px; /* Size of fixed header */
}
```

{@embed: https://codepen.io/numberboo/pen/pooxdeE}

Tuy nhiên `scroll-padding` lại có một số hạn chế về browser hỗ trợ, cụ thể như dưới đây (tham khảo tại [Can i use](https://caniuse.com/#search=scroll-padding))
![](https://images.viblo.asia/810ece62-06c1-4188-83c8-d044f6aaed7e.PNG)

## JS/jQuery Method

Chúng ta đều biết Javascript (hay jQuery) rất mạnh trong các tùy biến trên web page, tạo ra những hiệu ứng cũng như các trải nghiệm người dùng vô cùng tuyệt vời. Điều này không cần phải bàn luận thêm gì nữa, hãy cùng xem cách giải quyết thông qua JS hoặc jQuery.

Cụ thể, chúng ta sẽ lấy height của `header` và `offsetTop` của vị trí `section` chúng ta muốn scroll tới. Dựa vào đây chúng ta sẽ cho window scroll tới vị trí của `section` nhưng scroll lùi một đoạn bằng chiều cao của `header`. Hãy cùng xem:

Trước tiên là jQuery Method:
```js
$('a').click(function(e) {
  const headerHeight = $('header').height();
  const hash = this.hash;
  const scrollToSection = $(hash).offset().top - headerHeight;
  $('html, body').animate({
    scrollTop: scrollToSection,
  }, 300);
});
```

Đối với Javascript Method:
```js
const navLink = document.querySelectorAll('a');
const header = document.querySelector('header');

for(let link of navLink){
  link.onclick = function(e) {
    e.preventDefault();
    const hash = link.hash;
    const section = document.querySelector(hash);
    const scrollToSection = section.offsetTop - header.offsetHeight;
    window.location.hash = hash;
    window.scrollTo(0, scrollToSection);
  }
}
```

Và đây là kết quả chúng ta đạt được
{@embed: https://codepen.io/numberboo/pen/JjjmOpB}
## Lời kết
Trên đây chúng ta đã tìm hiểu 2 hướng xử lý khi muốn tạo một fixed header có chứa các thẻ link tới các khu vực trong page mà không khiến nội dung của các phần đó bị header che mất. 

Nếu bài viết có sai sót ở đâu đó hoặc mọi người có cách xử lý hay hơn thì hãy để lại comment bên dưới. Cảm ơn mọi người đã đọc bài viết.

## References
[https://css-tricks.com/hash-tag-links-padding/](https://css-tricks.com/hash-tag-links-padding/)


[https://css-tricks.com/almanac/properties/s/scroll-padding/](https://css-tricks.com/almanac/properties/s/scroll-padding/)