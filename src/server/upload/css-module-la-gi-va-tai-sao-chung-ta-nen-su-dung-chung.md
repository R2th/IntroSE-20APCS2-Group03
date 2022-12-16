## CSS Module là gì?

- Theo định nghĩa [ở đây](https://github.com/css-modules/css-modules), CSS module là những file css bao gồm tất cả các **class names** và **animation names**.
- Vì vậy, cũng gần giống như một số ngôn ngữ css mở rộng như sass hay scss, **css module** không thể thực thi trực tiếp trên trình duyệt mà cần thông qua  các trình biên dịch ( Webpack hoặc Browserify) 

![](https://images.viblo.asia/1678d148-b870-4f25-b831-f75dbaad22fa.png)

- Bây giờ chúng ta xét một ví dụ cụ thể cho dễ hiểu. Đầu tiên chúng ta cần 1 file html và css thông thường như sau:

```HTML
  <h1 class="title">An example heading</h1>
```

```CSS
  .title {
     background-color: red;
  }
```

- Khi áp dụng đoạn code trên, chúng ta sẽ có được thẻ H1 màu đỏ, Browser sẽ hiểu cả 2 file và không cần xử lý gì cả. 
- Nhưng css module thì khác, thay vì viết code html , chúng ta cần viết code bằng javascript, ví dụ như sau:

```JS
    import styles from "./styles.css";

    element.innerHTML = 
      `<h1 class="${styles.title}">
         An example heading
       </h1>`;
```

```style.css
  .title {
     background-color: red;
  }
```

- Trong quá trình build, trình biên dịch sẽ duyệt tìm qua file  "./styles.css" . Và sau đó sẽ tìm qua file Javascript mà chúng ta đã viết. Tạo class ".title" có thể truy cập qua {styles.title}. Tiếp đó compiler sẽ xử lý để tạo 2 file html và css mới, với một chuỗi ký tự mới thay thế cho cả html và css selector

```html
<h1 class="_styles__title_309571057">
  An example heading
</h1>
```

``` CSS
._styles__title_309571057 {
  background-color: red;
}
```

- Thuộc tính class và selector .title đã hoàn toàn biến mất, được thay thế hoàn toàn bằng một chuỗi mới. File CSS ban đầu của chúng ta không hề được sử dụng trên browser. 

![](https://images.viblo.asia/bb168b95-1ee2-4eaf-92d4-c9b1e316e178.png)

- Tại sao chúng ta lại muốn xáo trộn css và html để làm điều này? Tại sao chúng ta lại muốn style theo cách này?

## Tại sao chúng ta nên sử dụng CSS Module

CSS Module đảm bảo rằng tất cả style cho một component:
- Chỉ tồn tại ở 1 nơi
- Chỉ được sử dụng cho riêng component đó mà không sử dụng ở bất kỳ chỗ nào khác
- Thêm vào đó bất kỳ component nào đều có một sự phụ thuộc, Ví dụ:

```JS
    import buttons from "./buttons.css";
    import padding from "./padding.css";

    element.innerHTML = `<div class="${buttons.red} ${padding.large}">`;

```

- Với cách này chúng ta khắc phục được vấn đề phạm vi global trong css.
- Đã bao giờ bạn rơi vào tình trạng thiếu thời gian hoặc nhân lực để xây dựng web, buộc phải viết CSS nhanh nhất có thể mà không xem xét đến những vấn đề ảnh hưởng các bạn có thể gây ra chưa?
- Bạn đã bao giờ đọc cả file css và bạn không thể chắc chắn các đoạn style trong file làm công việc gì, hay chúng có được sử dụng hay không chưa?
- Bạn đã bao giờ tự hỏi nếu bạn có thể thay đổi một vài style mà không làm phá vỡ style của những chỗ khác? tự hỏi rằng style chỉ phụ thuộc vào chính nó hay còn phụ thuộc vào các thứ khác? hoặc bị override ở nơi khác?
- Đó là những câu hỏi gây đau đầu cho chúng ta
- Với CSS Module, và khái niệm phạm vi local theo mặc định, chúng ta sẽ tránh được vấn đề này. Bạn sẽ luôn bị buộc phải suy nghĩ về hậu quả khi các bạn viết code style.
-  Ví dụ: Nếu bạn sử dụng một class bất kì "random-gross-class" trong HTML nhưng bạn không kết nối nó với style của css module. Nó sẽ không được nhận style vì lúc đó trình biên dịch css selector sẽ chuyển thành ._style_random-gross-class_0038089

## Từ khoá composes

- Giả sử chúng ta có một module và được style  bằng file type.css. Như ví dụ dưới đây:

```CSS
    .serif-font {
      font-family: Georgia, serif;
    }

    .display {
      composes: serif-font;
      font-size: 30px;
      line-height: 35px;
    }

```
- Chúng ta có thể khai báo một trong các class trong template như sau:
```JS
    import type from "./type.css";

    element.innerHTML = 
      `<h1 class="${type.display}">
        This is a heading
      </h1>`;
```
- Chúng ta sẽ được kết quả như sau:

```
    <h1 class="_type__display_0980340 _type__serif_404840">
      Heading title
    </h1>
```

- Cả 2 class đều được rằng buộc vào phần tử bằng cách sử dụng từ khoá composes, từ đó tránh được một số vấn đề không hay của [các giải pháp #](https://www.sitepoint.com/avoid-sass-extend/) , như Sass’ @extend.
- Chúng ta thậm chí có thể biên soạn từ một class cụ thể trong từng file css riêng biệt.

Ví dụ:
```CSS
    .element {
      composes: dark-red from "./colors.css";
      font-size: 30px;
      line-height: 1.2;
    }

```
- Nếu các bạn quan tâm hơn nữa đến css module, và muốn tìm hiểu thêm về nó thì Glen Madden đã viết về một số lợi ích khác của css module bạn có thể tham khảo [ở đây ](https://glenmaddern.com/articles/css-modules)

- Bài viết tiếp theo trong loạt bài về css module mình sẽ hướng dẫn các bạn tạo một dự án sử dụng Webpack và CSS module. Chúng ta sẽ tìm hiểu một vài ví dụ để hướng dẫn các bạn sử dụng css module

##  kết luận:
- Link tham khảo bài viết:
    - https://css-tricks.com/css-modules-part-1-need/
    - [CSS Modules: Welcome to the Future](https://glenmaddern.com/articles/css-modules)
    - [Hugo Giraudel’s CSS Modules tutorial on Sitepoint](http://www.sitepoint.com/understanding-css-modules-methodology/)