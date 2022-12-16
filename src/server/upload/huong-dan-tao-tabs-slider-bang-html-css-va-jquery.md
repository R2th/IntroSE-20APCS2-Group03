**Giới thiệu:**

**Tabs Slider** là những thuật ngữ quen thuộc trong Jquery. Hiển thị nội dung theo các tabs là một trong những kỹ thuật rất hiệu quả khi trang web của bạn có chứa nhiều nội dung ở các thể loại khác nhau, nó cũng rất hữu dụng ngay cả trang của bạn là một trang bán hàng. Việc sử dụng các tabs nội dung sẽ khiến trang web của bạn chuyên nghiệp và thân thiện hơn với người dùng, ta sẽ chỉ hiển thị nội dung mà người dùng quan tâm đến.

Trong bài viết này, mình sẽ hướng dẫn cách xây dựng chức năng hiện thị nội dung theo tabs và chạy slider với HTML, CSS và Jquery.

**HTML** :

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
</head>
<body>
  <h2>Tabs Slider Demo</h2>
  <div class="nav-links">
    <div class="nav-links__list nav nav-tabs nav-tabs--slider" role="tablist">
      <a class="nav-links__item" href="#">Item 1</a>
      <a class="nav-links__item" href="#">Item 2</a>
      <a class="nav-links__item" href="#">Item 3</a>
      <a class="nav-links__item" href="#">Item 4</a>
      <a class="nav-links__item" href="#">Item 5</a>
      <a class="nav-links__item" href="#">Item 6</a>
    </div>
    <div class="nav-links__content tab-content tab-content--slider">
      <div class="tab-pane">
        <div class="tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <div class="tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <div class="tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <div class="SPBL_tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <div class="SPBL_tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <div class="SPBL_tab-info">
          <ul class="tab-info__list unstyled">
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 1</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 2</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 3</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 4</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 5</a>
            </li>
            <li class="tab-info__item">
              <a class="tab-info__link" href="#">Content 6</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
</body>
</html>

```

**CSS** :

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}

.unstyled {
  list-style: none;
  margin: 0;
  padding: 0;
}

.section__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

.section__item {
  box-sizing: border-box;
  padding: 0 8px 10px;
  flex-basis: 50%;
  max-width: 50%;
}

.nav-links {
  background-color: #fff;
  border-top: 1px solid #d9e4e6;
  padding-top: 16px;
}

.nav-links__list {
  align-items: center;
  border-bottom: 3px solid #0e357f;
  display: flex;
  justify-content: space-between;
}

.nav-links__item {
  align-items: center;
  color: #133881;
  font-size: 12px;
  font-weight: 600;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
  height: 40px !important;;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
}

.nav-links__item:hover,
.nav-links__item:focus {
  outline: none;
  outline-offset: 0;
}

.slick-current.nav-links__item {
  background-color: #133881;
  color: #fff;
  border-radius: 6px 6px 0 0;
}

.tab-content--slider {
  padding-bottom: 45px;
}

.tab-content--slider .slick-arrow {
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  color: #707070;
  cursor: pointer;
  font-size: 0;
  height: 24px;
  padding: 0;
  position: absolute;
  text-align: center;
  bottom: 15px;
  width: 24px;
  line-height: 24px;
  z-index: 99;
}

.tab-content--slider .slick-prev {
  left: 15px;
}

.tab-content--slider .slick-next {
  right: 15px;
}

.tab-content--slider .slick-dots li {
  margin: 0 5px;
}

.tab-content--slider .slick-dots button {
  display: block;
  width: 6px;
  height: 6px;
  padding: 0;
  border: none;
  border-radius: 100%;
  background-color: #707070;
  text-indent: -9999px;
}

.tab-content--slider .slick-dots .slick-active button {
  background-color: #0e357f;
}

.tab-content--slider .slick-dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 23px;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  list-style-type: none;
}

.tab-info__item {
  border-bottom: 1px solid #d9e4e6;
  display: block;
  overflow: hidden;
  padding: 14px 16px;
}

.tab-info__link {
  color: #000;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  text-decoration: none;
}

.tab-info__link:hover {
  color: #133881;
}

```

**JS** :

```js
$(document).ready(function () {
  $('.nav-links').each(function () {
    const navSlides = $(this).find('.nav-tabs--slider')
    const contentSlides = $(this).find('.tab-content--slider')

    contentSlides.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      infinite: false,
      asNavFor: navSlides
    });

    navSlides.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: contentSlides,
      dots: false,
      arrows: false,
      infinite: false,
      focusOnSelect: true
    });
  });
});

```

**Demo** :

{@embed: https://codepen.io/huongk54a2/pen/zXLOym}

**Kết luận** :

Hy vọng bài viết này sẽ giúp mọi người tạo ra được 1 Tabs Slider đơn giản gọn nhẹ bằng  Jquery. Cảm ơn mọi người đã theo dõi.