Sau [phần hai](https://viblo.asia/p/nhung-thuoc-tinh-thu-vi-trong-css-p2-Eb85one8l2G) về các thuộc tính thụ vị trong CSS, thì hôm nay mình sẽ tiếp tục với 10 thuộc tính tiếp theo. Không chờ lâu, bắt đầu nào !!!
## 1. Font-smoothing
Thuộc tính `font-smoothing` giúp chúng ta kiểm soát khả năng khử răng cưa được áp dụng vào `font` chữ. Có một vấn đề với cách khử mặc định của trình duyệt là `font` của bạn trông hơi khác so với thiết kế. Thật may mắn là ta đã có cách giải quyết.
- `webkit-font-smoothing`:
    - `none`: Tắt khử răng cưa.
    - `antialiased`: Làm mịn phông chữ ở mức `pixel`, làm cho văn bản trông sáng hơn trên nền tối.
    - `subpixel-antialiased`: Làm mịn phông chữ ở mức `subpixel` để nhìn rõ hơn trên màn hình `retina`.
- `moz-osx-font-smoothing`:
    - `auto`: Để trình duyệt tự quyết định.
    - `grayscale`: Khử răng cưa theo thang độ xám, nó khá tương đồng với `antialiased` trên `webkit`.
    
{@embed: https://codepen.io/gregh/pen/PWwoVd}
## 2. font-variant
Giá trị `small-caps` của `font-variant` sẽ giúp chúng ta hiển thị văn bản bằng chữ in hoa nhỏ. Điều này giúp ích khi sử dụng với `selector` `::first-line`.
{@embed: https://codepen.io/chriscoyier/pen/oBWPGo}
 ## 3. Grid
 Đây là thuộc tính `css` được mọi người nhắc tới nhiều nhất hiện nay, chúng ta có thể tóm tắt như sau: `Grid` trong `CSS` cho phép chúng ta tạo lưới hai chiều mà không gặp sự cố như thường gặp với `tables` và `floats`.
 
 Một `grid` bao gồm các `container` và các `items` bên trong nó. Sau đó, bạn phải xác định cách không gian được phân phối giữa các hàng và cột. Các giá trị đại diện cho kích thước cột và bạn cũng có thể đặt tên cho chúng.
 ```css
 .container {
  display: grid;
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
 ```
 - Cột `thứ nhất` và `thứ năm` có chiều rộng `40px`, 
 - Cột `thứ hai` và `thứ tư` chiều rộng `50px` 
 - Cột `ở giữa` sẽ lấy `phần còn lại` của không gian. 
 
 Chúng ta hãy xem làm thế nào để định vị mục bên trong container. Chúng ta phải thực sự đặt điểm bắt đầu và điểm kết thúc cho phần tử. Mục này sẽ áp dụng CSS sau đây cho nó:
 ```css
 .item {
  grid-column-start: 2; // sẽ bắt đầu ở điểm bắt đầu của cột thứ 2
  grid-column-end: 5;   // sẽ kết thúc ở điểm bắt đầu của cột thứ 5
  grid-row-start: 1;    // sẽ bắt đầu ở điểm bắt đầu của hàng thứ nhất
  grid-row-end: 3;      // sẽ kết thúc ở bắt đầu của hàng thứ 3
}
```
 ## 4. hyphens 
 Chỉ định cách trình duyệt gạch nối giữa các từ.
 - `none`: Không áp dụng dấu gạch ngang, văn bản sẽ tràn vào `container`.
 - `auto`: Trình duyệt xác định tự động nối văn bản.
 - `manual`: Tự xác định điểm dừng.
 
 Có hai ký tự ngắt dòng có thể sử dụng:
 
 -`&shy`:  sẽ cho trình duyệt biết rằng đó là một vị trí trong văn bản nơi phép nối có thể được thực hiện nếu cần thiết.

 -`hyphen`: sẽ hiển thị dấu gạch nối ngay cả khi dòng không bị xuống dòng. 
    {@embed: https://codepen.io/gregh/pen/QdwwyW}
## 5. image-rendering
Thuộc tính `image-rendering` xác định cách mà `image` được render khi nó nó bị `scaled`. Trình duyệt tự động `resize` ảnh, hoặc bạn có thể tuỳ biến bằng các thuộc tính sau đây:
-`auto`: (default) trình duyệt tự tính toán.
-`crisp-edges`: Độ tương phản và các cạnh được giữ nguyên, để chúng không bị nhẵn hoặc mờ khi thu nhỏ
-`pixelated`: Thuộc tính này chỉ `upsize` ảnh lên và làm cho ảnh hiển thị những `pixel`.
{@embed: https://codepen.io/gregh/pen/dNPPBr}
## 6. list-style-image
Trong đa số trường hợp làm việc với thẻ `ul`, chúng ta thường sử dụng `list-style-type: none;`, tuy nhiên bạn thể dùng `list-style-image` để `apply` một ảnh làm `marker` cho nó:
```css
ul {
  list-style-image: url('square.gif');
}
```
## 7. list-style-position
Thuộc tính `list-style-position` chỉ định vị trí mà `marker` trong thẻ `list` sẽ xuất hiện. Nó chấp nhận hai giá trị:

-`inside`: `marker` xuất hiện bên trong thẻ `li`
-`outside`: `marker` xuất hiện bên ngoài thẻ `li`
## 8. object-fit
Nó giống như thuộc tính `background-size` vậy nhưng có điều đạc biệt hơn là thuộc tính `object-fit` được sử dụng cho phần tử hình ảnh `<img>`
-`fill`
-`contain`
-`cover`
-`none`
-`scale-down`
Xem thêm các ví dụ để rõ hơn nhé
{@embed: https://codepen.io/gregh/pen/RKNWNp}
## 9. orphans
Thuộc tính `orphans` trong `CSS` được sử dụng để thiết lập số dòng `tối thiểu` trong một phần tử phải xuất hiện tại cuối một trang.
Giả sử bạn soạn thảo một tài liệu Word đến trang thứ n nào đó. Lúc này, trang thứ n này chỉ còn 1 dòng để soạn thảo và bạn có một đoạn văn A dài 5 dòng. Vậy đoạn văn của bạn sẽ bị chia làm hai: 1 dòng trên trang n và 4 dòng còn lại trên trang (n+1). Trong ngành in, người ta gọi đó là một Orphans.

Thuộc tính orphan kiểm soát số dòng tối thiểu của một đoạn văn mà bị rời lại trên trang cũ (trang n trong ví dụ trên).

## 10. order
Thuộc tính `order` chỉ định các `thứ tự` xuất hiện của một `item` trong một `flex container`. giá trị là `một số`, cũng có thể là `số âm` hoặc `“inherit”`, `“initial”`, `“unset”`.
```html
<div class="flex-container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```
```css
.item:nth-child(1) { order: 3 }
.item:nth-child(2) { order: 1 }
.item:nth-child(3) { order: 2 }
```

### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)