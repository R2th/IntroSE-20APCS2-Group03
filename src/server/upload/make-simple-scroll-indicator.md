Nếu bạn đã từng vào những trang báo hay blog để đọc thì ắt hẳn bạn sẽ để ý thấy họ hay sử dụng 1 **Scroll Indicator** nhằm mục đích giúp người dùng có thể đoán được họ đã đọc được bao nhiêu % của bài viết hoặc họ còn phải đọc bao nhiêu nữa mới kết thúc bài viết đó.

![](https://images.viblo.asia/8229f3c2-a6de-43e1-8937-7754b386dca0.jpg)

Demo sau bài viết này sẽ tương tự như gif dưới đây:

![](https://images.viblo.asia/ce7a23ea-6cd9-4a2f-b8af-fb4d27e89e57.gif)

Trong bài viết này mình chỉ đưa ra và giải thích khung của trang web, còn code cụ thể các bạn có thể xem trong codepend ở dưới cùng bài viết.

### HTML

* Đương nhiên rồi bắt đầu 1 demo ta cần dựng HTML & CSS cho nó.
* Bắt đầu chúng ta sẽ khởi tạo 1 container div để chứa toàn bộ nội dung bài post.

```html
<div class="post-container"></div>
```

* Vậy process bar sẽ nằm ngay trên nội dung của bài post đó và nó sẽ có 1 thanh hiển thị % đã đọc, nó giống như sau:

```html
<div class="post-container">
   <!-- bar div -->
   <div class="progress-bar-container">
     <div class="progress-bar-container__progress"></div>
   </div>
</div>
```

Trong demo này mình sử dụng ký pháp BEM **Block - Element - Modifile** để viết cho nhanh.

Với bài toán scroll Indicator hầu như mọi người đều dùng chung 1 ý tưởng là: Bạn sẽ tạo 1 bar container ở trên top và 1 thanh process sẽ hiển thị số % theo lượng scroll bar đang được kéo. Nó tương tự như hình dưới này:

![](https://images.viblo.asia/75655844-07bb-45db-91d4-504ba6440224.jpg)

### CSS

Css cho ví dụ này chỉ đơn giản như sau:

```css
/* Tạo biến css mặc định */
:root {
    --progress-color: #33cc33;
    --progress-height: .9rem;
}
  
  /* post content and container */
.post-container {
    padding: 2rem 3rem;
    box-sizing: border-box;
    height: 100vh;
    overflow: scroll;
}
  
/* progress bar container */
.progress-bar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--progress-height);
}
  
  /* progress bar */
.progress-bar-container__progress {
    height: var(--progress-height);
    background-color: var(--progress-color);
    width: 0%;
    float: left;
}
```

Ở đây mình set thằng `post-container` là phần tử có thể scroll được, nhưng trong bài toán của bạn thì bạn làm như nào cũng được.

### JS

Bắt đàu bằng việc định nghĩa các element trong trang web, ở đây mình dùng DOM do lười import cdn jquery.

```js
// variables for progress bar and post container elements
const progressContainerEl = document.querySelector(".post-container");
const progressBarEl = document.querySelector(".progress-bar-container__progress");
```

Phần khó nhất là viết hàm update cho bar process. Ý tưởng là mình sẽ kiểm tra vị trí scroll hiện tại và cập nhật width của bar process tương ứng.

Ở đây minh có sử dụng 1 hàm tính toán trên stackoverflow nếu bạn có dùng nó thì nhớ vào upvote 1 cái nhé.

```js
// function to check scroll position and update scroll progress bar accordingly
const updateScrollProgressBar = () => {
  // get full scroll height
  const scrollHeight = progressContainerEl.scrollHeight - heightInViewport(progressContainerEl);
  console.log(scrollHeight);
  // get current scroll position
  const scrollPosition = progressContainerEl.scrollTop;
  
  // get scroll percentage and set width of progress bar
  const scrollPercentage = (scrollPosition / scrollHeight) * 100;
  progressBarEl.style.width = scrollPercentage + "%";
}

// function to get visible height in viewport
// some code taken from user Roko C. Buljan on https://stackoverflow.com/questions/24768795/get-the-visible-height-of-a-div-with-jquery
function heightInViewport(el) {
    var elH = el.offsetHeight,
        H   = document.body.offsetHeight,
        r   = el.getBoundingClientRect(), t=r.top, b=r.bottom;
    return Math.max(0, t>0? Math.min(elH, H-t) : Math.min(b, H));
}
```

Sử dụng nó nào ở đây bạn thường nghĩ sẽ sử dụng trong tiến trình scroll của thằng `post-container`, nhưng nó vẫn thiếu bởi có 1 case như sau: khi bạn load bài post nhưng không phải với vị trí ban đầu mà với gim ở giữ bài viết thì scroll bar process sẽ không được update. Nên bạn cần phải gọi thêm 1 event load nữa.

```js
// bind window onload and onscroll events to update scroll progress bar width
progressContainerEl.addEventListener("scroll", updateScrollProgressBar)
progressContainerEl.addEventListener("load", updateScrollProgressBar)
```

Kết quả:
{@embed: https://codepen.io/cuongtobi/pen/PoqGYbZ}

* Để làm 1 demo như này thì không hề khó và cũng đã có rất nhiều trang web bài viết demo rồi. Nếu có ý kiến mong các bạn góp ý.

* Link ý tưởng: https://www.w3schools.com/howto/howto_js_scroll_indicator.asp

* Link text: http://randomtextgenerator.com

* Link awsome function: https://stackoverflow.com/questions/24768795/get-the-visible-height-of-a-div-with-jquery

* Link đọc Bem: https://techtalk.vn/su-dung-ky-phap-bem-cho-css.html