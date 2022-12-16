Trong bài hướng dẫn này, chúng ta sẽ lấy một loạt các liên kết hình thumbnail và biến chúng thành một Responsive Gallery với CSS Grid đi kèm với hiệu ứng mờ. Chúng ta cũng sẽ sử dụng một thủ thuật CSS tuyệt vời để đảm bảo người dùng màn hình cảm ứng không bị bỏ qua!

Minh hoạ những gì mà chúng ta sẽ tạo ra

{@embed: https://codepen.io/tutsplus/pen/rQrVBg}

# 1. Thay đổi Markup 
Hãy nhìn vào markup được tạo bởi Rachel. Khi được sắp xếp, nó trông như thế này:

```
<div class="child-page-listing">
 
  <h2>Our Locations</h2>
 
  <article class="location-listing">
    <a class="location-title" href="#">San Francisco</a>
    <div class="location-image">
      <a href="#">
        <img src="image.jpg" alt="san francisco">
      </a>
    </div>
  </article>
 
  <!-- more articles -->
 
</div>
```

Chúng ta có một` <div>` cha trong đó chứa một` <h2>` và một số phần tử `<article>`. Khi chúng ta sử dụng CSS Grid trước tiên chúng ta định nghĩa một grid container. Trong trường hợp này chúng ta có thể sử dụng `<div>` cha, nhưng điều đó sẽ làm cho mỗi phần tử con trực tiếp, bao gồm` <h2>` - một phần tử grid, vì vậy chúng ta cần thay đổi các thứ một chút.

Chúng ta bao tất cả các phần tử `<article>` trong một `<div> `khác (bạn có thể sử dụng bất kỳ phần tử nào mà bạn thấy phù hợp nhất) cái mà chúng ta cho nó một lớp `grid-container`. Sử dụng pen cơ bản này như là nền tảng.

# 2. Responsive CSS Grid, Trong ba dòng

Chỉ với một vài quy tắc, chúng ta có thể biến hình thumbnail của mình thành một grid:
```
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
}
```

Các dòng đơn giản ở đây là `display: grid; `(biến tất cả phần tử con trực tiếp thành các phần tử grid và bố cục chúng) và `grid-gap: 1em; `(xác định gutter).

Sự phức tạp xuất phát từ giá trị mà chúng ta cung cấp cho thuộc tính `grid-template-columns`, định nghĩa các cột của chúng ta. Thông thường bạn sẽ trông chờ một cái gì đó như `repeat(3, 200px) `sẽ cung cấp cho chúng ta ba cột 200px. Trong trường hợp này, chúng ta sử dụng từ khóa `auto-fill` cho `repeat()` và theo sau đó một số giá trị. Điều này cung cấp cho chúng ta càng nhiều cột với tối thiểu 300px và tối đa 1fr sẽ vừa với grid container.

Thay đổi kích thước cửa sổ trình duyệt của bạn và xem nó hoạt động thế nào!

Một chi tiết cuối cùng bạn cần phải thêm:

```
img {
  width: 100%;
  height: auto;
}
```

Điều này sẽ đảm bảo các hình ảnh lấp đầy container của chúng một cách vừa vặn (đặc biệt cần thiết để sử dụng với bản demo của Rachel, vì chúng ta cần ghi đè lên các thuộc tính nội tuyến height và width mà WordPress xuất ra).

# 3. Hiệu ứng khi di chuột

Chúng ta sẽ sử dụng các tiêu đề làm lớp phủ cho các thumbnail, để lộ chúng khi di chuột. Chúng ta cũng sẽ cung cấp cho các hình ảnh một hiệu ứng màu đỏ và làm mờ một chút để giúp dễ đọc văn bản được phủ lên.

### Lớp phủ tiêu đề

Đối với lớp phủ tiêu đề, chúng ta cần định vị nó, vì vậy chúng ta sẽ bắt đầu bằng cách tạo article `position: relative;` và title `position: absolute;`. Chúng ta cũng cho nó một nền màu đỏ và cho nó lấp đầy toàn bộ khoảng trống.

```
.location-listing {
  position: relative;
}
 
.location-title {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(90,0,10,0.4);
}
```

Khởi đầu tốt!

![](https://images.viblo.asia/bf94c5f7-0e72-4d1d-8d2e-898bb394fe8c.jpg)

Có một hoặc hai điều cần cải thiện, bao gồm cả khoảng trắng thừa ở phía dưới (tiêu đề hơi lớn hơn một chút so với thumbnail). Điều này có thể được giải quyết bằng cách xóa line-height trên container của hình ảnh:

```
.location-image {
  line-height: 0;
}
```

### Trang trí tiêu đề
Một số kiểu chữ sẽ cải thiện cái nhìn của tiêu đề và ba dòng flexbox sẽ căn chỉnh nó vào giữa cho chúng ta:

```
.location-title {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(90,0,10,0.4);
   
  /* typographic styles */
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
   
  /* position the text centrally*/
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Tốt hơn nhiều:

![](https://images.viblo.asia/bf1dc4b7-0946-495a-b142-73eb68db6795.jpg)

### Ẩn tiêu đề
Bây giờ hãy ẩn tiêu đề bằng cách giảm opacity của nó để chúng ta chỉ có thể nhìn thấy nó khi di chuột. Một vài quy tắc nữa bên dưới những quy tắc mà chúng ta đã thêm vào `.location-title` của chúng ta sẽ thực hiện điều đó:

```
/* hide the title by default */
opacity: 0;
transition: opacity .5s;
```

Ở đây, chúng ta cũng thiết lập quy tắc `transition` để khi chúng ta tăng opacity trở lại, nó sẽ diễn ra dần dần (trong vòng 0,5 giây). Hãy mang nó trở lại ngay bây giờ:

```
.location-listing:hover .location-title {
  opacity: 1;
}
```
Tuyệt vời! Bây giờ tiêu đề của chúng ta xuất hiện trở lại khi di chuột:

![](https://images.viblo.asia/f9b6037d-a2b4-4b80-bc17-0670e53fb284.jpg)
### 
### Làm mờ

Chúng ta đã tạo ra một hiệu ứng di chuột trông rất tuyệt vời, nhưng hãy tiến một bước xa hơn nữa. Hãy thêm một bộ lọc mờ cho hình ảnh. Chúng ta sẽ bắt đầu bằng cách thiết lập bộ lọc mờ ở trạng thái normal, để cung cấp cho chúng ta thứ gì đó để transition từ đó. Sau đó, chúng ta sẽ làm mờ mọi thứ 2px cho trạng thái hover (thiết lập con số này tuỳ ý bạn muốn, nhưng tôi nghĩ 2px mang lại cho chúng ta một hình ảnh tuyệt vời):

```
.location-image img {
  filter: blur(0px);
  transition: filter 0.3s ease-in;
}
 
.location-listing:hover .location-image img {
  filter: blur(2px);
}
```

Đây là những gì nó mang lại cho chúng ta:

![](https://images.viblo.asia/360135e0-d8d4-4dc9-a41f-ffbe95fd18f2.jpg)

### Một vài điều cần lưu ý:

1. Tiêu đề đã biến mất vì trình duyệt hiện đang hiển thị hình ảnh mờ bên trên nó.
2 . Hiệu ứng mờ có vẻ đẹp, nhưng nó cũng làm cho cạnh bị mờ (chúng ta có thể làm tốt hơn thế).
Khắc phục tiêu đề bị ẩn đơn giản bằng việc thêm `z-index: 1`; vào lớp `.location-title.`

Khắc phục các cạnh bị mờ hơi phức tạp một chút. Để bắt đầu, chúng ta giãn kích thước hình ảnh để làm cho nó lớn hơn một chút, sau đó chúng ta thiết lập `overflow: hidden;` trên container của hình ảnh `(.location-listing)` để khi hình ảnh lớn hơn bị mờ các cạnh của nó được cắt một cách hiệu quả. Dưới đây là các thuộc tính đã hoàn thành cho hai phần tử theo yêu cầu:

```
.location-image img {
  filter: blur(0px);
  transition: filter 0.3s ease-in;
  transform: scale(1.1);
}
 
.location-listing {
  position: relative;
  overflow: hidden;
}
```

Quy tắt` transform: scale(1.1);` giãn kích thước hình ảnh của chúng ta theo mọi hướng lên 1.1 lần (trong đó 1.0 sẽ giữ mọi thứ có kích thước ban đầu). Đây là kết quả gọn gàng hơn nhiều:

![](https://images.viblo.asia/21c9b6ea-5215-4bda-bf52-5cca27d816da.jpg)

# 4. Vấn đề với màn hình cảm ứng
Như vậy, chúng ta đã có nó! Một image grid trông tuyệt vời với hiệu ứng di chuột mờ trên mỗi thumbnail. Điều duy nhất là các tiêu đề được ẩn cho bất kỳ ai không thể di chuột qua các hình ảnh (một số lượng lớn máy tính bảng và điện thoại thông minh không mô phỏng việc di chuột) khả năng truy cập thấp.

May mắn thay, CSS có một số Media Query tương tác rất hữu ích có thể giúp chúng ta (và chúng cũng hỗ trợ trình duyệt khá tốt). Các truy vấn này sẽ phát hiện cơ chế nhập dữ liệu của trình duyệt - khả năng di chuột và một số định nghĩa đặc biệt khác để chúng ta có thể xác định khá chính xác thumbnail của chúng ta có đang được xem trên thiết bị màn hình cảm ứng hay không.

Lấy truy media query này làm ví dụ (nó thực hiện chính xác những gì bạn có thể mong đợi):

Lấy truy media query này làm ví dụ (nó thực hiện chính xác những gì bạn có thể mong đợi):

`@media (hover: none) { }`
Trong các dấu ngoặc nhọn này, chúng ta đặt bất kỳ style nào mà chúng ta muốn áp dụng cho trình duyệt có thể xử lý :hover. Hãy làm điều đó, chúng ta sẽ nói rằng đối với các thiết bị di chuột là không thể hoặc ít nhất là bất tiện, thumbnail sẽ luôn bị mờ và tiêu đề sẽ luôn hiển thị:


```
/* for touch screen devices */
@media (hover: none) { 
  .location-title {
    opacity: 1;
  }
  .location-image img {
    filter: blur(2px);
  }
}
```

Hãy xem:
![](https://images.viblo.asia/099f248e-c0f3-4deb-8c91-52badf2b5707.jpg)

**Lưu ý:** Như đã đề cập, việc hỗ trợ cho việc này khá hợp lý, nhưng các cuộc thảo luận về việc cài đặt media query tương tác vẫn đang tiếp diễn. Khả năng cao là các thông số kỹ thuật này sẽ thay đổi hoặc loại bỏ các bộ phận.
### 
### Phần kết luận
Và chúng ta đã làm xong! Cảm ơn đã theo dõi, tôi hy vọng bạn đã học được một hoặc hai điều và thích thú với CSS (ai mà không thích cơ chứ?). 

{@embed: https://codepen.io/tutsplus/pen/rQrVBg}











*Tham khảo :* https://webdesign.tutsplus.com/tutorials/create-a-css-grid-image-gallery-with-blur-effect-and-interaction-media-queries--cms-32287