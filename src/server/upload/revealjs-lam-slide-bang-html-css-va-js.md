![](https://images.viblo.asia/97416884-fedf-4237-a573-72fb3b3d79fe.jpg)


# 1. Introduce Reveal JS: 
- Reveal JS là JavaScript framework được sử dụng để tạo các bài presentation sử dụng HTML, CSS và JS.

- Các chức năng cơ bản của Reveal JS bao gồm: nested slides, markdown contents, PDF export, speaker notes.

# 2. Install:
- Bạn có thể download các folder `css`, `js`, `lib`, `plugin` từ [github](https://github.com/hakimel/reveal.js/) bỏ vào source.

- Tạo thêm 1 file `index.html` như sau.
```html
<!DOCTYPE html>
<html>
<head>
  <title>RevealJS</title>
  <link rel="stylesheet" href="css/reveal.css">
    <link rel="stylesheet" href="css/theme/white.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section>Slide 1</section>
      <section>Slide 2</section>
    </div>
  </div>

  <script src="js/reveal.js"></script>
  <script>
    Reveal.initialize();
  </script>
</body>
</html>
```

- Finish, bạn đã install xong Reveal JS và tạo 1 bài presentation đơn giản với 2 slide đơn giản tương ứng với 2 thẻ `<section>`.

- Các bạn cần chú ý thêm markdown của bài presentation nên được trình bày theo cấu trúc sau.
    ```html
    .reveal > .slides > section
    ```

# 3. Nested slides:
- Theo mặc định các thẻ `<section>` cùng level sẽ thể hiện các slide theo chiều ngang (horizontal), sử dụng các phím arrow left, right để duy chuyển qua lại giữa các slide.

- Nếu bạn để các thẻ `<section>` nested bên trong 1 thẻ `<section>` khác thì các `<section>` này sẽ thể hiện các slide con của slide ứng với thẻ `<section>` ngoài cùng và được thể hiện theo chiều dọc (vertical), sử dụng các phím arrow up, down để duy chuyển qua lại giữa các slide này.
```html
<div class="slides">
  <section>Single Horizontal Slide</section>
  <section>
    <section>Vertical Slide 01</section>
    <section>Vertical Slide 02</section>
  </section>
</div>
```
    
# 4. Markdown:
- Đối với Reveal JS, các bạn cũng có thể sử dụng markdown thay cho HTML để tạo slide.

## a. Internal markdown:
- Đầu tiên bạn cần thêm các file js thực hiện chức năng markdown vào file index.html.
```html
<script src="js/reveal.js"></script>
<script src="plugin/markdown/marked.js"></script>
<script src="plugin/markdown/markdown.js"></script>
```
    
- Thêm attribute `data-markdown` cho `<section>`.
- Tạo `<textarea>` có attribute `data-template` để wrap markdown.
```html
<section data-markdown>
  <textarea data-template>
    ## Reveal JS

    You can read more here [link](https://github.com/hakimel/reveal.js/).
  </textarea>
</section>
```
- Các bạn có thể tham khảo thêm về cách viết Github Markdown tại [đây](https://help.github.com/en/categories/writing-on-github).

## b. External markdown:
- Đối với cách sử dụng `internal markdown`, chúng ta define markdown bên trong thẻ `<text-area data-template>`.
- Cách này khá là giống với cách sử dụng `internal css`, chúng ta cũng define css trong thẻ `<style type="text/css">`.

- Tương tự như vậy, chúng ta sử dụng `external css` thông qua thẻ `<link href="style.css"/>` thì chúng ta cũng có thể sử dụng `external markdown` thông qua thẻ `<data-markdown="markdowm.md">`.
    ```html
    <section data-markdown="markdown.md" data-separator="^\n\n\n" data-separator-vertical="^\n\n"></section>
    ```
- Tuy nhiên cách này cần chạy trên `WebServer` hoặc `localhost` nên mình sẽ gửi đến các bạn trong bài viblo sau, trong bài lần này mình sẽ tập trung vào các tính năng có thể chạy trực tiếp trên file `index.html`.

## c. Attributes for markdown:
- Ngoài 2 cách kể trên, chúng ta còn có thể sử dụng markdown thông qua thẻ `<script type="text/template">` và `<!-- HTML comment -->`.

### i. Create slide:
```html
<section data-markdown data-separator="---">
  <script type="text/template">
    ## Main Features
    ---
    ## 01. Nested slides
    ---
    ## 02. Markdown contents
    ---
    ## 03. PDF export
    ---
    ## 04. Speaker notes
    ---
    ## 05. JavaScript API
   </script>
</section>
```

### ii. Edit markdown element attributes:
```html
<section data-markdown>
  <script type="text/template">
    ## Main Features
    - 01. Nested slides <!-- .element: class="fragment" data-fragment-index="1" -->
    - 02. Markdown contents <!-- .element: class="fragment" data-fragment-index="2" -->
    - 03. PDF export <!-- .element: class="fragment" data-fragment-index="3" -->
    - 04. Speaker notes <!-- .element: class="fragment" data-fragment-index="4" -->
    - 05. JavaScript API <!-- .element: class="fragment" data-fragment-index="5" -->
  </script>
</section>
```

### iii. Edit slide attributes:
```html
<section data-markdown>
  <script type="text/template">
    <!-- .slide: data-background="#ff0000" -->
    And more ....
  </script>
</section>
```

### iv: Insert code:
```html
<section data-markdown>
  <script type="text/template">
    ## Simply call
    ```javascript
    Reveal.initialize();
    ```
  </script>
</section>
```

- Chúng ta cần load thêm `highlight.js` vào file `index.html`
```html
<script src="js/reveal.js"></script>
<script src="plugin/highlight/highlight.js"></script>
<script>
  Reveal.initialize();
  hljs.initHighlightingOnLoad();
</script>
```

### v: Display image:
```html
<section data-markdown>
  <script type="text/template">
    ![Reveal JS](https://images.viblo.asia/97416884-fedf-4237-a573-72fb3b3d79fe.jpg)
  </script>
</section>
```

# 5. Configuration:
- Bạn có thể thêm các config cho Reveal JS bằng cách truyền tham số vào hàm `Reveal.initialize()`
```html
<script>
  Reveal.initialize({
    // Display the page number of the current slide
    slideNumber: true,

    // Add the current slide number to the URL hash so that reloading the
    // page/copying the URL will return you to the same slide
    hash: true,

    // Push each slide change to the browser history. Implies `hash: true`
    history: true,

    // Number of milliseconds between automatically proceeding to the
    // next slide, disabled when set to 0, this value can be overwritten
    // by using a data-autoslide attribute on your slides
    autoSlide: 0
  });
</script>
```

- Bạn cũng có thể override lại các config lúc initialize bằng cách truyền tham số vào hàm `Reveal.configure()`
```html
<script>
  Reveal.configure({
    // Start auto-sliding every 5s
    autoSlide: 5000
  });
</script>
```

# 6. Dependencies:
- Reveal JS có thể hợt động độc lập mà không cần load thêm jQuery hay bất cứ các thư viện Javascript nào khác.
- Tuy nhiên Reveal JS cũng cho phép bạn load thêm 1 số thư viện đi kèm để thực hiện các hiệu ứng hay các chức năng đặc biệt
    * hightlight.js cho chức năng Hight light code.
    * markdown.js cho chức năng Markdown.
    * math.js để hiển thị các công thức toán học (MathJax).
    * note.js để hiển thị note của speaker.
    * zoom.js
    * search.js
    * print-pdf.js
- Các thư viện này được tải về cùng khi bạn download Reveal JS từ Github.

- Để sử dụng các thư viện này, thay vì để trong thẻ `<script>`, bạn có thể để vào tham số `dependencies` khi gọi hàm `Reveal.initialize()`.
```javascript
<script>
  Reveal.initialize({
    dependencies: [
      {
        src: 'plugin/markdown/marked.js',
        async: true,
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      },
      {
        src: 'plugin/markdown/markdown.js',
        async: true,
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      },
      {
        src: 'plugin/highlight/highlight.js',
        async: true,
        callback: function() {
          hljs.initHighlightingOnLoad();
        }
      }
	]
  });
<script>
```

- Đối với từng dependency chúng ta cần truyền vào các tham số sau:
    * src: đường dẫn đến file script của dependency.
    * async (optional): load script của dependency sau khi Reveal js đã load thành công (default là false).
    * condiiction (optional): function xác định xem script của dependency có được load (function trả về true) hay không (function trả về false).
    * callback (optional): function được gọi sau khi script của dependency đã load thành công.

# 7. Events:
- Event `ready` được gọi khi Reveal JS đã load tất cả các non-async dependencies.
- Bạn cũng có thể sử dụng `Reveal.isReady()` để kiểm tra Reveal JS đã ready hay chưa.
```javascript
Reveal.addEventListener('ready', function(event) {
  // event.currentSlide
});
```

- Event `slidechanged` được gọi mỗi lần thay đổi slide.
```javascript
Reveal.addEventListener('slidechaned', function(event) {
  // event.currentSlide
});
```

- Event `resize` được gọi khi Reveal JS khi slide được resize.
```javascript
Reveal.addEventListenner('resize', function(event) {
  // event.size
});
```

- Ngoài ra Reveal JS còn support thêm các event khác.

# 8. Document:
- Các bạn có thể tham khảo đấy đủ document của Reveal JS tạo [đây](https://github.com/hakimel/reveal.js/).
- Source code sử dụng trong bài viblo này mình đang để tạo [đây](https://github.com/LeTanThanh/RevealJS).
- Các tính năng như [PDF Export](https://github.com/hakimel/reveal.js/#pdf-export),  [Speaker Notes](https://github.com/hakimel/reveal.js/#speaker-notes), ... cần được chạy trên web server hoặc localhost mình sẽ gửi đến các bạn trong bài viblo sau, see you next month =))