**Ở bài viết lần trước mình có 1 bài viết nhỏ chia sẻ về cách để xử lý ảnh đẹp hơn cho website với các thuộc tính CSS Filter của CSS3, để xem lại bài viết các bạn có thể truy cập ở [đây](https://viblo.asia/p/xu-ly-hieu-ung-hinh-anh-tuyet-dep-voi-css-filter-effect-gDVK2zRXKLj).**

Tuy nhiên, để xử lý được như trên thì bạn cần phải biết một chút code CSS, mà nếu bạn không phải là dân Frontend thì cũng hơi ngại nhỉ! Vậy thì để mình giới thiệu cho các bạn 1 thư viện rất hay có thể giúp bạn xử lý ảnh trở nên lung linh mà không cần phải viết 1 dòng code CSS nào cả, đó là [CSS Gram](https://github.com/una/CSSgram), với hơn 5k star trên Github :)

### 1. Giới thiệu

Để tạo các hiệu ứng, CSS Gram cũng sử dụng CSS filters và CSS blend mode, về cơ bản thì CSS Gram có sẵn hầu hết các hiệu ứng giống như trên Instagram. Các hiệu ứng được áp dụng cho vùng chứa image, thông qua việc xử lý CSS qua `pseudo-elements`. Thử xem qua 1 ví dụ dưới đây để xem cách mà CSS Gram thực hiện như thế nào:

Trước tiên là thêm `pseudo-elements`.

```css
._1977{
  position: relative;
}
._1977:after{
  content: '';
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
```

Tiếp theo là thêm CSS filter và blend mode:

```css
._1977 {
  -webkit-filter: contrast(1.1) brightness(1.1) saturate(1.3);
  filter: contrast(1.1) brightness(1.1) saturate(1.3); 
}
._1977:after {
  background: rgba(243, 106, 188, 0.3);
  mix-blend-mode: screen; 
}
```

Và đây là kết quả (đã xin phép bản quyền các chủ nhân trong bức ảnh :))

![](https://images.viblo.asia/24e559fb-06e7-4cca-bcdc-81b0aa2d90a6.png)

### 2. Làm thế nào để sử dụng

Ở trên chỉ là phần mô tả cách mà CSS Gram hoạt động như thế nào, còn để sử dụng thì rất đơn giản.

Trước tiên là thêm phần source code của CSS Gram vào source code của bạn (lấy nó ở [đây](https://raw.githubusercontent.com/una/CSSgram/master/source/css/cssgram.css), hơi bèo cái là không cài thông qua npm được :v):

```html:html:html:html
<link rel="stylesheet" href="path/to/cssgram.css">
```

Bạn chỉ cần thêm class vào thẻ HTML tương ứng với hiệu ứng mà bạn muốn xử lý cho tấm ảnh đó, ví dụ như sau:

```css
<figure class="_1977">
  <img src="images.jpg">
</figure>
```

Chúng ta không thêm class filter trực tiếp vào thẻ <img /> mà thêm vào thẻ HTML chứa hình ảnh đó, ví dụ như với thẻ <figure> ở trên.

Ngoài ra, CSS Gram còn cung cấp rất nhiều các hiệu ứng khác nữa, các bạn có thể xem tất cả các hiệu ứng đó ở [đây](https://una.im/CSSgram/). Việc của chúng ta cực kỳ đơn giản, chỉ cần bỏ đúng class vào thẻ chứa img là xong. Thật đơn giản phải không nào.

Cảm ơn các bạn đã theo dõi bài viết của mình, xin chào và hẹn gặp lại!

Tham khảo: [https://www.hongkiat.com/blog/instagram-filters-on-web-images/](https://www.hongkiat.com/blog/instagram-filters-on-web-images/)