# 1. Căn trung tâm (Perfect Centering)
Sử dụng flex giúp căn chỉnh một cách nhanh chóng và rất dễ dàng. Chúng ta hãy xem ví dụ về code căn trung tâm nhé :

```html
<h1>Perfect Centering</h1>

<p>A container with both the justify-content and the align-items properties set to <em>center</em> will align the item(s) in the center (in both axis).</p>

<div class="flex-container">
  <div></div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: DodgerBlue;
}

.flex-container > div {
  background-color: #f1f1f1;
  color: white;
  width: 100px;
  height: 100px;
}
```

Và chúng ta sẽ kết quả đẹp, như mong muốn như sau:

![](https://images.viblo.asia/5d1ff13a-1d0b-4f06-9385-161f20752ba7.png)

# 2. Chế độ hòa trộn (Blend Modes)
Chúng ta có thể thực hiện nhiều thứ hay ho trong CSS ngay bây giờ và một trong số đó là chế độ hòa trộn.

Có hai thuộc tính cho chế độ hòa trộn:
* **mix-blend-mode**: Xác định pha trộn giữa phần tử và phần tử phía sau.
* **background-blend-mode**: Xác định pha trộn giữa hình nền và màu nền của phần tử.

Trước tiên ta thử với chế độ **mix-blend-mode**. Hã xem cách thức hoạt động qua cs dụ dưới đây :

```html
<div class="container">
  <img src="https://cdn.pixabay.com/photo/2016/12/11/12/02/bled-1899264_960_720.jpg" />
   <h1>NATURE</h1>
</div>
```

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
}

.container {
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
} 

.container img {
  position: absolute;
}

.container h1 { 
  font-size: 150px;
  mix-blend-mode: overlay;
}
```

Hãy tận hưởng kết quả nào :

![](https://images.viblo.asia/b34d8620-5785-45fd-bb46-984fe7d1d116.png)

Hãy xem ví dụ ở chế độ background-blend-mode:

```html
<div class="container">
  <div class="blend-before"></div>
  <div class="blend-after"></div>
</div>
```

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
}

.blend-before {
  background-image: url(https://cdn.pixabay.com/photo/2016/12/11/12/02/bled-1899264_960_720.jpg);
  width: 100vw;
  height: 300px;
  background-size: cover;
} 

.blend-after {
  background-image: url(https://cdn.pixabay.com/photo/2016/12/11/12/02/bled-1899264_960_720.jpg);
  width: 100vw;
  height: 300px;
  background-color: #20126f;
  background-size: cover;
  background-blend-mode: overlay;
}
```

Kết quả :

![](https://images.viblo.asia/709aa566-3124-4365-93ed-aedbc89d8033.png)

Hình ảnh đầu tiên là trước khi trộn, và hình ảnh thứ hai là sau khi trộn.

Vì thuộc tính này tồn tại, nó cho phép chúng ta hòa trộn mà không cần phải sử dụng Photoshop hay thay thế ảnh.

# 3. Cuộn Prallax
Parallax là một hiệu ứng rất phổ biến trong thế giới lập trình web hiện đại. Hiệu ứng này nói về việc cuộn nội dung background ở tốc độ khác với nội foreground khi chúng ta cuộn trang.

Hãy cùng xem hiệu ứng này có thể được thực hiện bằng CSS như thế nào nào:

```html
<div class="wrapper">
  <div class="box box-back">
    <h3>SWEETIES</h3>
  </div>
  <div class="box box-front">
      <img src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_960_720.jpg" />
  </div>
</div>
```

```css
.wrapper {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f6f6f6;
}

.box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20vh 0;
}

img {
  width: 100%;
}

h3 {
  font-size: 60px;
  color: white;
}

.box.box-back {
  transform: translateZ(0);
  z-index: 99;
  text-align: center;
}

.box.box-front {
  width: 1500px;
  transform: translateZ(-1px) scale(2);
}
```

 Các bạn hãy thử và cảm nhận nhé.

Bạn có thể thấy văn bản và hình nền của chúng ta đang di chuyển với tốc độ khác nhau như thế nào khi cuộn. Đó là do đã sử dụng TransformZ, để tăng tốc một phần tử và làm chậm một phần tử khác.

# 4. Shape Outsite
Có một tính năng hay ho khác đi kèm với CSS nhưng nó không phổ biến lắm.

Đó là thuộc tính shape-outsite. Thuộc tính CSS này quyết định cách nội dung sẽ bao quanh phần tử float.

Hãy cùng xem cách thức hoạt động của nó:

```html
<div class="circle"></div>
<p>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.

Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.

Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
  
Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
</p>
```

```css
.circle {
  shape-outside: circle(50%);
  width: 200px;
  height: 200px;
  float: left;
}
```

Cùng chạy thử nào :

![](https://images.viblo.asia/11edff94-8f84-43da-bfcf-36813bf5f7be.png)

Trong ví dụ trên, bạn có thể thấy rằng văn bản “né” khỏi vòng tròn. Ví dụ này mình đặt giá trị của của hình thành circle(50%), nhưng bạn cũng có thể đặt là image, triangle, square , v.v. Hãy thử tự làm xem nhé!

# 5.  Cắt ngắn một chuỗi (Truncate)
Trong Javascript, có một số cách chúng ta có thể quản lý nó, nhưng bạn hoàn toàn có thể cắt ngắn văn bản bằng CSS.

Hãy xem ví dụ dưới đây:

```html
<p>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
</p>
```

```css
p {
  background-color: #ddd;
  width: 200px;
  margin: auto;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Cùng xem nào :
![](https://images.viblo.asia/96ac258c-8188-450b-905e-8594822ead51.png)

Ở trên, bạn có thể thấy CSS có thể cắt văn bản và kết quả của nó.

Mình đã sử dụng overflow: hidden, white-space: nowrap, và cuối cùng để có ba dấu chấm, mình đã sử dụng text-overflow: ellipsis.

Như ở trên là khi chúng ta muốn hiển thị chữ một dòng rồi kết hợp dấu 3 chấm, nhưng trường hợp chúng ta muốn hiển thị nhiều dòng rồi mới có dấu 3 chấm phía sau thì làm sao ? Thì lúc này chúng ta nên sử dụng thuộc tính line-clamp trong CSS để xử lý vấn đề này như sau :

```css
p {
  background-color: #ddd;
  width: 200px;
  margin: auto;
  padding: 10px;
  display: -webkit-box;
  height: 56px;
  line-height: 22px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Chúng ta cùng xem kết quả nào :

![](https://images.viblo.asia/2028bfdf-8f97-44d1-a2d9-aa513a9ed74b.png)

# 6. Clip path
Là một người làm về nghệ thuật, đôi khi bạn cần sáng tạo thêm một chút.

Ví dụ, đặt một hình ảnh trong một hình dạng cụ thể, như hình tam giác chẳng hạn.

Việc này hoàn toàn có thể, bạn có thể sử dụng thuộc tính clip-path! Hãy xem cách thức nó làm việc:

```html
<div class="ellipse">
  <img src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_960_720.jpg" />
</div>

<div class="circle">
  <img src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_960_720.jpg" />
</div>

<div class="polygon">
  <img src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_960_720.jpg" />
</div>
```

```css
img {
  width: 50%;
}

.ellipse img {
  clip-path: ellipse(200px 200px at 100px 100px);
}

.circle img {
  clip-path: circle(30%);  
}

.polygon img {
  clip-path: polygon(5% 5%, 100% 10%, 900% 75%, 75% 75%, 75% 100%, 60% 75%, 20% 80%);
}
```

Kết quả :

![](https://images.viblo.asia/ffa843ee-a2af-49de-a052-23498eb06d32.png)

Trong ví dụ trên, mình đã tạo một hình tròn, eclipse và hình dạng đa giác (polygon) tùy chỉnh.

# 7. Full height và Full width
Nếu chúng ta muốn thiết lập ứng dụng hoặc trang web của mình được điều chỉnh theo chế độ xem, các đơn vị vh và vw sẽ làm cho việc này dễ dàng hơn nhiều.

Vh có nghĩa là viewport height và vw có nghĩa là viewport width.

Hãy để kiểm tra cách thức hoạt động của nó trong một ví dụ thực tế:

```html
<div class="blue-box"></div>
```

```css
.blue-box {
  width: 50vw;
  height: 50vh;
  background-color: #20126f;
}
```

Trong ví dụ trên, mình đã đặt phần tử blue-box thành 50vw và 50vh, có nghĩa là nó phải có 50% chiều rộng khung nhìn và 50% chiều cao của khung nhìn và nếu bạn thay đổi kích thước khung nhìn, bạn sẽ thể nhận thấy cách nó điều chỉnh.

Bạn có thể thử thay đổi thành 100vw và 100vh rồi thay đổi kích thước khung nhìn xem.


# 8. Bộ lọc ảnh (Fillter img)
Hình ảnh đẹp có thể mang lại nhiều hiệu ứng tuyệt vời cho website và giúp tạo ra sản phẩm tốt hơn.

Làm đẹp cho trang web là việc của CSS. Vậy không lý do gì mà nó không có bộ lọc ảnh cả.

CSS cho phép sử dụng nhiều bộ lọc (filter) trên hình ảnh để giúp các lập trình viên front end thay đổi hình ảnh mà không cần dùng photoshop.

Dưới đây là một số filter chúng ta có thể sử dụng:

```html
<div class="image">
  <img class="nofilter" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
  <img class="blur" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
  <img class="grayscale" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
  <img class="brightness" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
    <img class="sepia" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
   <img class="saturate" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
     <img class="invert" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
   <img class="huerotate" src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg" />
</div>
```

```css
.image img {
  max-width: 400px;
}

.blur {
  filter: blur(5px);
}

.grayscale {
  filter: grayscale(100%);
}

.brightness {
  filter: brightness(150%);
}

.saturate {
  filter: saturate(200%);
}

.invert {
  filter: invert(100%);
}

.huerotate {
  filter: hue-rotate(180deg);
}
```

Chúng ta cùng đón xem kết quả nào :

![](https://images.viblo.asia/22e94249-179c-4a62-907f-55deda820b04.png)

Trong ví dụ trên, bạn có thể thấy 7 bộ lọc khác nhau được sử dụng trong cùng một hình ảnh.

# 9. Mặt nạ (mask)
Nếu bạn đã từng làm thiết kế đồ họa, photoshop, chắc là bạn sẽ biết mặt nạ hữu ích như thế nào.

Trong CSS, chúng ta cũng có thể tạo và sử dụng mặt nạ.

Hãy thử tạo mặt nạ cho ảnh qua ví dụ dưới đây:

```html
<img src="https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?cs=srgb&dl=dramatic-evening-hd-wallpaper-36744.jpg&fm=jpg" />
```

```css
img {
  width: 1000px;
 -webkit-mask-image: radial-gradient(circle at 50%, black 50%, rgba(0, 0, 0, 0.2) 10%);
  mask-image: radial-gradient(circle at 50%, black 50%, rgba(0, 0, 0, 0.2) 10%);
}
```

![](https://images.viblo.asia/13c9cb3a-2339-4940-afff-9718948344b2.png)

Trong ví dụ trên, mình đã tạo mặt nạ gradient hình tròn. Nhưng ngoài ra, bạn cũng có thể sử dụng SVG làm mặt nạ.

# 10. Zoom khi Hover
Khi bạn tạo một allbum trên trang web, hiệu ứng khi di chuột (hover) qua ảnh sẽ rất thu hút được người dùng.

Ý tưởng phổ biến và hiệu quả nhất là thêm hiệu ứng zoom khi hover để làm nổi bật ảnh được di chuột. Hãy cùng xem cách thức hoạt động của nó:

```html
<div class="images">
  <div class="image-frame">
    <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
  </div>
  <div class="image-frame">
    <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
  </div>
  <div class="image-frame">
  <img src="https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
  </div>
  <div class="image-frame">
  <img src="https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
  </div>
</div>
```

```css
.images {
  display: flex;
  width: 100vw;
  juftify-content: center;
  align-items: center;
}

.image-frame {
  width: 200px;
  margin-right: 10px;
  overflow: hidden;
}

img {
  width: 200px;
}

img:hover {
  transform: scale(1.3);
  transition: 3s;
}
```

Bạn hạy code và chạy thử nhé.

Ở đây mình đã sử dụng 
* **image:hover** Khi di chuột qua ảnh thì có hiệu ứng `transform: scale(1.3)`. Thời gian transform từ 1 đến 1.3 là 3s (Sử dụng thuộc tính `transition: 3s`)
* **image-frame** đã sử dụng thuộc tính `overflow: hidden` để khi ảnh zoom vượt quá kích thước 400px thì tự động ẩn phần vượt quá.

# Tổng kết
Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình học tập cũng như làm việc. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.