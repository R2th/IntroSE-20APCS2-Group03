SVG là một định dạng hình ảnh tuyệt vời và vô cùng mạnh mẽ. Trong bài viết này sẽ cung cấp cho bạn tổng quan về SVG bằng cách giải thích tất cả những gì bạn cần biết theo một cách đơn giản

## Giới thiệu 

Mặc dù đã được chuẩn hóa vào đầu những năm 2000, nhưng SVG (Scalable Vector Graphics) vẫn là một chủ đề nóng trong những ngày này.

SVG đã bị phạt trong một vài năm vì khả năng hỗ trợ trình duyệt kém (nhất là IE).

Tôi tìm thấy câu trích dẫn này từ một cuốn sách năm 2011: tại thời điểm đó, nhúng trực tiếp SVG vào HTML chỉ hoạt động được trong các trình duyệt mới nhất. Đó là 7 năm trước, giờ đây, chúng ta có thể sử dụng các ảnh SVG một cách an toàn.

Ngày nay chúng ta có thể sử dụng ảnh SVG một cách an toàn, trừ khi bạn có nhiều người dùng với IE8 trở xuống hoặc với các thiết bị Android cũ hơn. Khi đấy, vẫn còn vài lỗi tồn tại.

![](https://images.viblo.asia/614c39df-0f36-4082-b7da-95579a644151.png)

Một phần của sự thành công của SVG là do sự đa dạng của màn hình hiển thị cần phải hỗ trợ, với các độ phân giải và kích thước khác nhau. Một ưu điểm hoàn hảo cho SVG.

Ngoài ra, sự suy giảm nhanh chóng của Flash trong vài năm qua đã dẫn đến mối quan tâm mới đối với SVG

SVG là một định dạng file hình ảnh vector. Nó rất khác so với các định dạng hình ảnh phổ biến như PNG, GIF hoặc JPG, đó là các định dạng file ảnh raster.

## Ưu điểm của SVG 

Ảnh SVG, nhờ sử dụng kỹ thuật hình ảnh vector, có thể mở rộng vô hạn và không làm giảm chất lượng hình ảnh. Đó là vì ảnh SVG được xây dựng bằng cách sử dụng XML markup và trình duyệt sẽ in chúng bằng cách vẽ từng điểm và đường kẻ, thay vì lấp đầy khoảng trống bằng các pixel được xác định trước. Điều này đảm bảo hình ảnh SVG có thể thích ứng với các kích thước và độ phân giải màn hình khác nhau.

Nhờ được định nghĩa dựa theo XML, ảnh SVG linh hoạt hơn nhiều so với ảnh JPG hoặc PNG và chúng ta có thể sử dụng CSS và JavaScript để tương tác với chúng. Ảnh SVG thậm chí có thể chứa cả CSS và JavaScript.

Ảnh SVG có thể hiển thị hình ảnh kiểu vector nhỏ hơn rất nhiều so với các định dạng khác và chủ yếu được sử dụng trên logo và hình minh họa. Ngoài ra cũng được dùng nhiều trong các biểu tượng. Ngày nay, các nhà thiết kế thích sử dụng hình ảnh SVG vì chúng nhỏ hơn và chúng hỗ trợ các biểu tượng nhiều màu.

SVG rất dễ để tạo các hoạt hình

SVG cung cấp một số hiệu ứng chỉnh sửa hình ảnh, như che và cắt, sử dụng các bộ lọc và hơn thế nữa.

SVG chỉ là văn bản và do đó nó có thể được nén bằng GZip.

## Ví Dụ 

Ảnh SVG được xác định bằng XML. Điều này có nghĩa là SVG sẽ trông rất quen thuộc nếu bạn thành thạo HTML, trong SVG, ngoài có các thẻ phổ biến trong DOM (như p, article, footer, aside), thì còn có các khối xây dựng hình ảnh vector như path, rect, line, ...

VD, đây là một hình ảnh SVG:

```ruby
<svg width="10" height="10">
  <rect x="0" y="0" width="10" height="10" fill="blue" />
</svg>
```

Rất dễ đọc và hiểu hình ảnh trên: nó đơn giản là có một hình chữ nhật màu xanh với 10 x 10 pixel.

Hầu hết các bạn sẽ không phải chỉnh sửa mã SVG, mà sẽ sử dụng các công cụ như Sketch hoặc Figma hoặc bất kỳ công cụ đồ họa vector nào khác để tạo hình ảnh và xuất nó dưới dạng SVG.

Phiên bản hiện tại của SVG là 1.1 và SVG 2.0 đang được phát triển.

## Cách sử dụng

Hình ảnh SVG có thể được trình duyệt hiển thị bằng cách đưa chúng vào thẻ img:

```ruby
<img src="image.svg" alt="My SVG image" />
```

tương tự như các định dạng ảnh khác 

```ruby
<img src="image.png" alt="My PNG image" />
<img src="image.jpg" alt="My JPG image" />
<img src="image.gif" alt="My GIF image" />
<img src="image.webp" alt="My WebP image" />
```

Thêm vào đó, SVG có thể trực tiếp nhúng vào trang HTML

```ruby
<!DOCTYPE html>
<html>
  <head>
    <title>A page</title>
  </head>
  <body>
    <svg width="10" height="10">
      <rect x="0" y="0" width="10" height="10" fill="blue" />
    </svg>
  </body>
</html>
```

## Các thành phần SVG 

Trong VD trên, các bạn đã thấy được cách sử dụng cả thẻ rect, trong SVG có rất nhiều các thẻ khác:

Các thẻ hay được dùng phổ biến là:

* text: tạo một thẻ text 
* circle: tạo một vòng tròn
* rect: tạo một hình chữ nhật 
* line: tạo một đường kẻ 
* path: tạo một đường giữa 2 điểm 
* textPath: tạo một đường giữa 2 điểm và thẻ text nằm trên link 
* polygon: cho phép tạo nhiều kiểu đa giác 
* g: nhóm các thẻ riêng biệt 

### text 

Thẻ text  dùng để thêm văn bản. text có thể được chọn bằng chuột. x và y để xác định điểm bắt đầu của văn bản

```ruby
<svg>
  <text x="5" y="30">A nice rectangle</text>
</svg>
```

![](https://images.viblo.asia/66901744-300d-43fb-9c8c-ee87814c098b.png)

### circle

Để định nghĩa một đường tròn. `cx` và `cy` là tọa độ trung tâm và `r` là bán kính. `fill` là một thuộc tính phổ biến và đại diện cho màu của hình.

```ruby
<svg>
  <circle cx="50" cy="50" r="50" fill="#529fca" />
</svg>
```

![](https://images.viblo.asia/547a186b-938d-460e-995f-caadc1905f2d.png)

### rect 

Định nghĩa một hình chữ nhật. `x`, `y` là tọa độ bắt đầu, `width` và `height` lần lượt là chiều rộng và chiều cao.

```ruby
<svg>
  <rect x="0" y="0" width="100" height="100" fill="#529fca" />
</svg>
```

![](https://images.viblo.asia/261f6e61-bea4-45b2-ac9b-1c6388539b4a.png)

### line

`x1` và `y1` xác định tọa độ bắt đầu. `x2` và `y2` xác định tọa độ kết thúc. `stroke` là một thuộc tính phổ biến và đại diện cho màu của line.

```ruby
<svg>
  <line x1="0" y1="0" x2="100" y2="100" stroke="#529fca" />
</svg>
```

![](https://images.viblo.asia/ed3f033d-c2b7-4209-9a32-42c2a250165b.png)

### path 

Một path là một chuỗi các đường thẳng và đường cong. Nó là công cụ mạnh nhất để vẽ bằng cách sử dụng SVG, và nó rất phức tạp.

`d` chứa các lệnh chỉ hướng. Các lệnh này bắt đầu bằng tên và một tập tọa độ:

* M (Move), nó nhận một tập toạ độ x, y
* L (Line), nó nhận một tập toạ độ x, y để vẽ đường 
* H (Horizontal Line) là một đường nằm ngang, nó chỉ nhận toạ độ x 
* V (Vertical Line) là một đường thẳng đứng, nó chỉ nhận toạ độ y 
* Z (Close Path), tạo một đường quay trở lại điểm ban đầu 
* A (Arch), hình cung 
* Q là một một đường cong Bezier bậc hai

```ruby
<svg height="300" width="300">
  <path d="M 100 100 L 200 200 H 10 V 40 H 70"
        fill="#59fa81" stroke="#d85b49" stroke-width="3" />
</svg>
```

![](https://images.viblo.asia/646d7783-f810-4b0a-87df-16a282663745.png)

### textPath

Thêm một text dọc theo đường path 

```ruby
<svg viewBox="0 0 1000 600"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="MyPath" d="M 20 40 Q 260 240 400 500" />
  </defs>
  <use xlink:href="#MyPath" fill="none" stroke="#59fa81" />
  <text font-family="Courier New" font-size="42.5">
    <textPath xlink:href="#MyPath">
    Wow such a nice SVG tut
    </textPath>
  </text>
</svg>
```

![](https://images.viblo.asia/8581b12d-10c7-4687-a9b3-92511fa45f3a.png)

### polygon

Vẽ bất kỳ đa giác ngẫu nhiên nào với thẻ `polygon`. `points` đại diện cho một tập toạ độ x, y tạo nên liên kết:

```ruby
<svg>
  <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
</svg>
```

![](https://images.viblo.asia/f2487438-cd68-4647-b897-a31ed693765a.png)

### g 

Sử dụng thẻ `g` để nhóm bất kỳ thẻ nào khác 

```ruby
<svg width="200" height="200">
  <rect x="0" y="0" width="100" height="100" fill="#529fca" />
  <g id="my-group">
    <rect x="0" y="100" width="100" height="100" fill="#59fa81" />
    <rect x="100" y="0" width="100" height="100" fill="#ad4a3d" />
  </g>
</svg>
```

![](https://images.viblo.asia/db1d3f12-158d-4c48-bfb6-fb24dabd8309.png)

## SVG viewport và viewBox

Kích thước của một SVG phụ thuộc với vùng chứa của nó, được đặt theo các thuộc tính chiều rộng và chiều cao của thẻ svg. Đơn vị mặc định là pixel, nhưng bạn có thể sử dụng bất kỳ đơn vị thông thường nào khác như % hoặc em. Đó gọi là một `viewport`.

Một thuộc tính quan trọng khác là `viewBox`. Nó cho phép định nghĩa một hệ thống toạ độ mới trong SVG canvas.

VD, ta có một hình tròn nằm trong 200x200px SVG

```ruby
<svg width="200" height="200">
  <circle cx="100" cy="100" r="100" fill="#529fca" />
</svg>
```

![](https://images.viblo.asia/a6b82a49-7d25-4820-801b-22984624e808.png)

Bằng cách chỉ định một viewBox, bạn có thể chọn chỉ hiển thị một phần của SVG. Ví dụ: bạn có thể bắt đầu tại điểm 0, 0 và chỉ hiển thị khung hình 100x100px:

```ruby
<svg width="200" height="200" viewBox="0 0 100 100">
  <circle cx="100" cy="100" r="100" fill="#529fca" />
</svg>
```

![](https://images.viblo.asia/39719198-eb4d-416e-8482-e0ecee5a817d.png)

bắt đầu từ điểm 100, 100 bạn sẽ thấy một phần khác, nửa dưới bên phải của vòng tròn:

```ruby
<svg width="200" height="200" viewBox="100 100 100 100">
  <circle cx="100" cy="100" r="100" fill="#529fca" />
</svg>
```

![](https://images.viblo.asia/621e659c-315c-4626-a9dd-28cd8e0b2fac.png)

Một cách đơn giản để hình dung điều này là ta tưởng tượng Google Maps là một hình ảnh SVG khổng lồ và trình duyệt của bạn là một viewBox lớn như kích thước window. Khi bạn di chuyển xung quanh, viewBox thay đổi tọa độ điểm bắt đầu (x, y) và khi bạn thay đổi kích thước viewBox, bạn thay đổi chiều rộng và chiều cao của viewBox.

## Thêm SVG vào trong trang web

Có nhiều cách để thêm SVG vào trong trang web, nhưng phổ biến là:

* qua thẻ img
* với thuộc tính CSS background-image
* nhúng trong HTML
* với thẻ object, iframe hay embed 

### Thẻ img

```ruby
<img src="flag.svg" alt="Flag" />
```

### Thuộc tính CSS background-image

```ruby
<style>
.svg-background {
  background-image: url(flag.svg);
  height: 200px;
  width: 300px;
}
</style>
<div class="svg-background"></div>
```

### Nhúng trong HTML

```ruby
<svg width="300" height="200" viewBox="0 0 300 200"
    version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Italian Flag</title>
  <desc>By Flavio Copes https://flaviocopes.com</desc>
  <g id="flag">
      <rect fill="green" x="0" y="0" width="100" height="200"></rect>
      <rect fill="white" x="100" y="0" width="100" height="200"></rect>
      <rect fill="red" x="200" y="0" width="100" height="200"></rect>
  </g>
</svg>
```

### Thẻ object, iframe hay embed

```ruby
<object data="flag.svg" type="image/svg+xml"></object>

<iframe src="flag.svg" frameborder="0"></iframe>

<embed src="flag.svg" type="" />
```

Sử dụng embed, bạn có tùy chọn nhận tài liệu SVG từ tài liệu cha bằng cách sử dụng

```ruby
document.getElementById('my-svg-embed').getSVGDocument()
```

hoặc là 

```ruby
window.parent.document
```

## Sử dụng SVG với Data URL

```ruby
<img src="data:image/svg+xml;<DATA>" alt="Flag" />

<object data="data:image/svg+xml;<DATA>" type="image/svg+xml"></object>

<iframe data="data:image/svg+xml;<DATA>" frameborder="0"></iframe>
```

và kết hợp CSS

```ruby
.svg-background {
  background-image: url('data:image/svg+xml;<DATA>');
}
```

## Style trong các thành phần 

Bất kỳ thành phần SVG nào cũng có thể chấp nhận một thuộc tính kiểu như các thẻ HTML. Không phải tất cả các thuộc tính CSS đều hoạt động như bạn mong đợi, do tính chất SVG. Ví dụ: để thay đổi màu của thẻ text, hãy sử dụng fill thay vì color.

```ruby
<svg>
  <text x="5" y="30" style="fill: green">A nice text</text>
</svg>

<svg>
  <text x="5" y="70" style="fill: green; font-family: Courier New">
    A nice text
  </text>
</svg>
```

Một vài thuộc tính phổ biến khác như:

* fill-opacity: chỉnh độ trong suốt của màu nền 
* stroke: định nghĩa màu viền 
* stroke-width: định nghĩa độ rộng của viền 

Sử dụng CSS với các thẻ SVG tương tự như các thẻ HTML khác:

```ruby
rect {
  fill: red;
}
circle {
  fill: blue;
}
```

## Tương tác SVG với CSS hoặc JavaScript

SVG images can be styled using CSS, or scripted with JavaScript, in those cases:

when the SVG is inlined in the HTML
when the image is loaded through object, embed or iframe tags

Hình ảnh SVG có thể được tạo style bằng CSS hoặc được viết kịch bản bằng JavaScript, được dùng trong các trường hợp:

* khi SVG được inline trong HTML
* khi hình ảnh được tải thông qua object, iframe hoặc embed 

## CSS trong SVG 

Thêm CSS trong CDATA:

```ruby
<svg>
  <style>
    <![CDATA[
      #my-rect { fill: blue; }
    ]]>
  </style>
  <rect id="my-rect" x="0" y="0" width="10" height="10" />
</svg>
```

## JavaScript trong SVG

Bạn có thể đặt JavaScript trước và bao bọc trong một sự kiện tải để thực thi nó khi trang được tải đầy đủ và SVG được chèn vào DOM:

```ruby
<svg>
  <script>
    <![CDATA[
      window.addEventListener("load", () => {
        //...
      }, false)
    ]]>
  </script>
  <rect x="0" y="0" width="10" height="10" fill="blue" />
</svg>
```

hoặc bạn có thể tránh việc thêm trình lắng nghe sự kiện nếu bạn đặt JS ở cuối mã SVG khác, để đảm bảo JavaScript chạy khi có SVG trong trang:

```ruby
<svg>
  <rect x="0" y="0" width="10" height="10" fill="blue" />
  <script>
    <![CDATA[
      //...
    ]]>
  </script>
</svg>
```

Các phần tử SVG, giống như các thẻ html, có thể có các thuộc tính id và class, vì vậy chúng ta có thể sử dụng API Selector để tham chiếu chúng:

```ruby
<svg>
  <rect x="0" y="0" width="10" height="10" fill="blue"
        id="my-rect" class="a-rect" />
  <script>
    <![CDATA[
      console.log(document.getElementsByTagName('rect'))
      console.log(document.getElementById('my-rect'))
      console.log(document.querySelector('.a-rect'))
      console.log(document.querySelectorAll('.a-rect'))
    ]]>
  </script>
</svg>
```

## JavaScript bên ngoài the SVG

Nếu bạn có thể tương tác với SVG (SVG là inline trong HTML), bạn có thể thay đổi bất kỳ thuộc tính SVG nào bằng JavaScript, ví dụ:

```ruby
document.getElementById('my-svg-rect').setAttribute('fill', 'black')
```

## CSS bên ngoài the SVG

Bạn có thể thay đổi bất kỳ kiểu dáng của hình ảnh SVG bằng CSS.

Các thuộc tính SVG có thể dễ dàng được ghi đè bằng CSS và chúng có mức độ ưu tiên thấp hơn CSS. Chúng không hoạt động như CSS inline, có mức độ ưu tiên cao hơn.

```ruby
<style>
  #my-rect {
    fill: red
  }
</style>
<svg>
  <rect x="0" y="0" width="10" height="10" fill="blue"
        id="my-rect" />
</svg>
```