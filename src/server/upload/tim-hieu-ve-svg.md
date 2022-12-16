# I. Giới thiệu
## 1. SVG là gì?

SVG là viết tắt của `Scalable Vector Graphics`, nó được phát hành từ những năm 1999, nhưng cho đến năm 2011 mới trở nên phổ biến trên Internnet Explorer 9. SVG là một ngôn ngữ dạng XML, dùng để miêu tả hình ảnh đồ họa vector 2 chiều, tĩnh và hoạt hình, dành cho những ứng dụng trên các trang mạng. Tập tin có đuôi `.svg` được mặc định hiểu là tập tin SVG.
Trong bài viết này, mình sẽ tìm hiểu cách kết hợp giữa CSS và SVG, đưa SVG vào trong trang web như thế nào và cách thao tác với SVG.
## 2. Công dụng của SVG
Trước tiên, chúng ta hãy cùng nhau xem 1 bảng so sánh này để cùng nhau đánh giá:


|  | Loại định dạng | Bảng màu | Công dụng |
| -------- | -------- | -------- |-------- |
| JPG	     | Nén mất dữ liệu	     | Hàng triệu màu sắc     |Ảnh tĩnh, nhiếp ảnh     |
| PNG-8	     | Nén không mất dữ liệu	     | Tối đa 256 màu     |Tương tự như định dạng GIF, xử lý transparency tốt hơn nhưng không có hình động, tuyệt vời khi sử dụng cho biểu tượng     |
| PNG-24	     | Nén không mất dữ liệu	     | Không giới hạn màu sắc     |Tương tự như định dạng PNG-8, xử lý hình ảnh tĩnh và transperency|
| GIF	     | Nén không mất dữ liệu	     | Tối đa 256 màu    |Hình động đơn giản, đồ họa với màu trơn, đồ họa không có gradient|
| SVG	     | Vector/ Nén không mất dữ liệu	     |Không giới hạn màu sắc    |Đồ họa/Logo cho web, màn hình Retina/độ phân giải dpi cao     |






Như chúng ta đã biết, các hình ảnh bitmap như JPG, PNG, GIF xác định màu của từng pixel. Hình ảnh PNG với kích thước 100x100 sẽ yêu cầu 10000px. Mỗi pixel yêu cầu 4 byte cho màu đỏ, xanh lá cây, xanh lam và trong suốt. Do đó cần tối thiểu 40000 bytes cho 1 hình ảnh như vậy. Ngoài lề 1 chúc, là đôi khi người ta cũng nén để giảm kích thước của file xuống, nếu PNG và GIF sử dụng nén dạng ZIP không làm mất dữ liệu gốc, chất lượng không bị suy giảm, còn ảnh JPG chất lượng ảnh có bị suy giảm và nếu đã nén thì sẽ không thể khôi phục lại ảnh ban đầu. 

Nhược điểm của ảnh bitmap là khi phóng to, nét sẽ không được giữ được như ban đầu. Trong khi đó, SVG lại là các hình ảnh vector được định nghĩa trong XML và có những lợi ích đáng kể sau:

* Ảnh SVG sử dụng ít hơn 150 bytes, nhỏ hơn đáng kể so với PNG và JPG.
* Nền của SVG mặc định là trong suốt.
* Hình ảnh có thể phóng to thu nhỏ bất kì kích thước nào mà không làm giảm chất lượng.
* Mã code và các phần tử được tạo và thao tác rất dễ dàng trên server hay trình duyệt.
* Hình ảnh SVG là những hình ảnh dễ dàng  cho công cụ tìm kiếm google để điều hướng, rất tốt cho SEO.

Người ta sử dụng SVG chủ yếu cho logo, biểu đồ, sơ đồ đơn giản.
# II. Tìm hiểu
## 1. Những thành phần cơ bản của SVG
* `<svg>` là thẻ bao ngoài, định nghĩa đó là phần tử SVG.
* `<line>` tạo đường thẳng đơn.
* `<rect>` Tạo hình chữ nhật và hình vuông.
* `<polygon>` Tạo hình đa giác, với ba hoặc nhiều cạnh.
* `<path>` Tạo bất kỳ hình nào mà bạn thích bằng cách định nghĩa những điểm và đường thẳng giữa chúng.
* `<defs>` Định nghĩa những tài nguyên có thể sử dụng lại. Không có gì nằm trong phần `<defs>` được hiển thị.
* `<g>` Gom nhiều hình dạng thành một nhóm. Đặt các nhóm trong phần `<defs>` để cho phép chúng được sử dụng lại.
* `<use>` Lấy những tài nguyên được định nghĩa bên trong phần `<defs>` và làm cho chúng hiển thị trong SVG.
## 2. SVG Tools
Một số tool hỗ trợ cho bạn vẽ các hình ảnh SVG như là:
* [Adobe Illustrator](https://www.adobe.com/uk/products/illustrator.html) (commercial)
* [Affinity Designer](https://affinity.serif.com/en-gb/designer/) (commercial)
* [Sketch](https://www.sketchapp.com/) (commercial)
* [Inkscape](https://inkscape.org/en/) (open source)
* [Gravit Designer](https://gravit.io/) (free, online)
* [Vectr](https://vectr.com/) (free, online)
* [SVG-Edit](https://svg-edit.github.io/svgedit/releases/latest/editor/svg-editor.html) ( open source, online)
* [Boxy SVG](https://boxy-svg.com/) (free, app, online but Blink browsers only)
* [Vecteezy](https://www.vecteezy.com/editor) – (free, online but Blink browsers only)
* [SVG charting libraries](http://mediatemple.net/blog/tips/svg-charting-libraries/) — which generally create SVG charts using data passed to JavaScript functions.

Nếu để vẽ đơn giản thì các tools này cho ra kết quả khác nhau nhưng hình ảnh thì khá giống nhau. Nói chung là những hình ảnh phức tạp thì cần những tools phức tạp hơn.

Mã code kết quả cũng có thể được đơn giản hóa và giảm thiểu dung lượng bằng cách sử dụng SVGO hoặc SVGOMG.

## 3. SVG cũng giống như một ảnh tĩnh
Khi bạn sử dụng thẻ HTML `<img>` hoặc CSS `background-url` thì SVG cũng hoạt động giống hệt bitmap:
```html
<!-- HTML image -->
<img src="image.svg" alt="a vector graphic" />
```

```css
/* CSS background */
.myelement {
  background-image: url('image.svg');
}
```
Trình duyệt sẽ disable mọi đoạn script, link hay các tính năng tương tác khác được nhúng vào file SVG. Bạn có thể thao tác SVG bằng cách sử dụng CSS giống với các loại ảnh bình thường như là filter, transform,... Kết hợp CSS với SVG thường cho kết quả tốt hơn so với ảnh bitmap vì ảnh SVG có thể thu nhỏ được vô hạn.
### a. Chèn ảnh SVG vào code CSS
Một SVG có thể được viết trực tiếp trong code CSS bằng thuộc tính `background`. Nó phù hợp cho những icon nhỏ, tái sử dụng được và tránh việc thêm những request HTTP.
```css
.element {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><circle cx="400" cy="300" r="50" stroke-width="5" stroke="#f00" fill="#ff0" /></svg>') center center no-repeat;
}
```
`viewBox` ở đây định nghĩa tọa độ không gian. Trong ví dụ trên, sẽ có 1 vòng tròn màu vàng viền đỏ, và có diện tích là 800x600 bắt đầu từ vị trí 0, 0.
### b. Responsive với ảnh SVG
Khác với ảnh thông thường, ảnh SVG phải xác định thuộc tính `width` và `height` cho ảnh, bởi nếu ko set thì nó sẽ coi như là max-width bằng 0 và sẽ không thể nhìn thấy hình ảnh.
```css
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
```
## 4. Chèn ảnh SVG vào code HTML
Ảnh SVG có thể được đặt trực tiếp vào code HTML, khi đó nó sẽ trở thành 1 phần của cây DOM và có thể thao tác với CSS và Javascript:
```html
<p>SVG is inlined directly into the HTML:</p>

<svg id="invader" xmlns="http://www.w3.org/2000/svg" viewBox="35.4 35.4 195.8 141.8">
  <path d="M70.9 35.4v17.8h17.7V35.4H70.9zm17.7 17.8v17.7H70.9v17.7H53.2V53.2H35.4V124h17.8v17.7h17.7v17.7h17.7v-17.7h88.6v17.7h17.7v-17.7h17.7V124h17.7V53.2h-17.7v35.4h-17.7V70.9h-17.7V53.2h-17.8v17.7H106.3V53.2H88.6zm88.6 0h17.7V35.4h-17.7v17.8zm17.7 106.2v17.8h17.7v-17.8h-17.7zm-124 0H53.2v17.8h17.7v-17.8zm17.7-70.8h17.7v17.7H88.6V88.6zm70.8 0h17.8v17.7h-17.8V88.6z"/>
  <path d="M319 35.4v17.8h17.6V35.4H319zm17.6 17.8v17.7H319v17.7h-17.7v17.7h-17.7V159.4h17.7V124h17.7v35.4h17.7v-17.7H425.2v17.7h17.7V124h17.7v35.4h17.7V106.3h-17.7V88.6H443V70.9h-17.7V53.2h-17.7v17.7h-53.2V53.2h-17.7zm88.6 0h17.7V35.4h-17.7v17.8zm0 106.2h-35.5v17.8h35.5v-17.8zm-88.6 0v17.8h35.5v-17.8h-35.5zm0-70.8h17.7v17.7h-17.7V88.6zm70.9 0h17.7v17.7h-17.7V88.6z"/>
</svg>

<p>The SVG is now part of the DOM.</p>
```
Bạn có thể định nghĩa chiều rộng và chiều cao cho ảnh SVG ở trong CSS như thế này:
```css
#invader {
  display: block;
  width: 300px;
}

#invader path {
  stroke-width: 20;
  fill: #080;
}
```
Các phần tử SVG như là paths, circle, hay rectangles có thể chỉnh sửa được style như CSS:
```css
/* CSS styling for all SVG circles */
circle {
  stroke-width: 20;
  stroke: #f00;
  fill: #ff0;
}
```
Khi chỉnh sửa như vậy thì nó sẽ bị ghi đè lên bất kì thuộc tính nào được xác định trong SVG vì CSS được ưu tiên cao hơn. SVG CSS có 1 số lợi ích:
* attribute-based styling có thể được loại bỏ khỏi SVG để làm giảm dung lượng trang.
* CSS có thể được sử dụng lại cho các ảnh SVG khác ở các trang khác nhau.
* Có thể sử dụng các hiệu ứng của CSS lên SVG như là: `:hover`, `animation`, `transition`...
## 5. SVG Sprites
Thuật ngữ “Sprites” thực ra là kỹ thuật đưa tất cả các hình ảnh trang trí như các icon hay button đặt vào một file hình duy nhất. Sau đó dùng thuộc tính background-position của CSS để hiện ra đúng vị trí cần thiết.

Lợi ích của kĩ thuật này là trang web đó là chỉ tải một ảnh lớn thay vì hàng loạt hình nhỏ. Có bạn sẽ cho rằng việc tải các hình ảnh nhỏ thì sẽ nhanh hơn nhưng điều này không chính xác. Mỗi hình khi được tải sẽ tạo một request đến webserver, càng nhiều hình thì càng nhiều request. Và điều này ảnh hưởng lớn tới tốc độ của website. Và có một điều ít ai biết rằng khi đặt tất cả hình ảnh vào trong 1 file thì kích thước file sẽ giảm đi đáng kể so với tổng dung lượng các hình ảnh cộng lại. 

SVG cũng có sprites giống như ảnh thông thường. Một file SVG có thể chứa số lượng ảnh bất kì. Ví dụ file .svg này chứa folder icon được tạo bởi [IcoMoon](https://icomoon.io/). Mỗi một icon lại được chứa trong 1 thẻ `<symbol>` và có 1 ID riêng biệt.
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="icon-folder" viewBox="0 0 32 32">
      <title>folder</title>
      <path d="M14 4l4 4h14v22h-32v-26z"></path>
    </symbol>
    <symbol id="icon-folder-open" viewBox="0 0 32 32">
      <title>open</title>
      <path d="M26 30l6-16h-26l-6 16zM4 12l-4 18v-26h9l4 4h13v4z"></path>
    </symbol>
    <symbol id="icon-folder-plus" viewBox="0 0 32 32">
      <title>plus</title>
      <path d="M18 8l-4-4h-14v26h32v-22h-14zM22 22h-4v4h-4v-4h-4v-4h4v-4h4v4h4v4z"></path>
    </symbol>
    <symbol id="icon-folder-minus" viewBox="0 0 32 32">
      <title>minus</title>
      <path d="M18 8l-4-4h-14v26h32v-22h-14zM22 22h-12v-4h12v4z"></path>
    </symbol>
    <symbol id="icon-folder-download" viewBox="0 0 32 32">
      <title>download</title>
      <path d="M18 8l-4-4h-14v26h32v-22h-14zM16 27l-7-7h5v-8h4v8h5l-7 7z"></path>
    </symbol>
    <symbol id="icon-folder-upload" viewBox="0 0 32 32">
      <title>upload</title>
      <path d="M18 8l-4-4h-14v26h32v-22h-14zM16 15l7 7h-5v8h-4v-8h-5l7-7z"></path>
    </symbol>
  </defs>
</svg>
```

# III. Kết luận

Trên đây mình đã giới thiệu về ảnh SVG, vì trên viblo không thể chèn được ảnh svg minh họa nên các bạn chịu khó search nhé. Hi vọng bài viết này sẽ giúp ích 1 phần nào đó cho các bạn. Cảm ơ
> Tham khảo: https://www.sitepoint.com/real-world-use-of-css-with-svg/