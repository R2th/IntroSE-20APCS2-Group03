Ở bài viết này, mình sẽ hướng dẫn từng bước để tạo hiệu ứng so sánh hình ảnh trước và sau bằng cách sử dụng `HTML range input`.
![](https://miro.medium.com/max/1400/0*5EjJLzvTqRblCGKx)
Như bạn thấy đấy, cái `slider` này cho phép người dùng có thể kiểm soát việc hiển thị hai ảnh khác nhau trên màn hình và tự do khám phá, trải nghiệm mỗi khi scroll thanh cuộn.<br/>
Có thể nhiều bạn cho rằng để làm được hiệu ứng như vậy thì cần phải có 1 thư viện phức tạp nào đó hỗ trợ đúng không? Nhưng, không hề.Với kiến thức cơ bản về CSS và JS thì mọi người đều có thể làm được. <br>Nào hay cùng nhau bắt tay vào làm nó thôi.
## Step by step guide
### Step 1. Hiểu vấn đề cần triển khai
`Vấn đề` cần làm ở đây là tạo ra một cái `image slider` đơn giản thôi. Bạn chỉ cần có hai components là `image container` và `slider`.<br>
Với `image container` chỉ cần là một thẻ `div` thông thường, với hai hình ảnh có cùng kích thước được chồng lên nhau. Một ảnh sẽ là `background` và ảnh còn lại sẽ là `foreground`.

![](https://images.viblo.asia/f235dbf2-bfef-494c-bd28-a80fe72ca0f5.png)
Chúng ta sẽ sử dụng thuộc tính`position: absolute` để `foreground` chắc chắn đè khít lên `background`. Với `Background` phải luôn luôn có `width là 100%`, trong khi chiều rộng của `foreground` sẽ thay đổi tùy theo điều khiển của người dùng, làm cho một phần của `background` xuất hiện.<br>
Thành phần thứ hai là "slider", để đơn giản hóa, chúng ta có thể sử dụng phần tử có sẵn là [HTML input range](https://www.w3schools.com/howto/howto_js_rangeslider.asp). Nó cho phép người dùng chọn một giá trị bằng cách kéo, giữa giá trị tối thiểu và tối đa đã xác định của bạn. Bạn có thẻ lấy giá trị đầu vào bằng cách sử dụng javascript để bắt sự kiện.

![](https://images.viblo.asia/0dfa9aed-7408-458b-bdf6-70a2b87b0774.gif)
```html
<input type="range" min="1" max="100" value="50" class="slider" id="myRange">
```

> Một nhược điểm của việc sử dụng `default slider input` là kiểu dáng của nó có phần hạn chế, bạn sẽ không bị điên nếu cứ sử dụng nó như vậy. Còn nếu bạn đang tìm cách để tạo một thanh `slider` có thể tùy chỉnh nhiều hơn, bạn có thể phải tự mình xây dựng nó. Tuy nhiên, nó không phải là trọng tâm của bài này.

Chúng ta sẽ tạo ra thanh trượt với chiều rộng là 100% và chiều cao là chiều cao của `container` và đặt nó lên trong `image containter`. Khi người dùng kéo thanh trượt, thì cập nhật chiều rộng của `foreground` cùng lúc đó. Khi đó tạo ảo giác người dùng đang kéo hình ảnh.

![](https://images.viblo.asia/521da2ba-d61a-43c9-b483-a8796195c70a.png)
Giờ thì ý tưởng đã rõ ràng rồi thì chúng ta bắt tay vào làm thôi.


### Step 2. Tạo image container
Hãy bắt đầu bằng cách tạo một `container`. Nó là một cấu trúc đơn giản chỉ với hai thẻ `div` bên trong. Vì chúng ta không muốn hình ảnh của mình mở rộng tỷ lệ dựa trên chiều rộng của thẻ `div` chứa chúng, nên ta sẽ sẽ sử dụng áp `background-image` thay vì thẻ `<img>`. Một điều quan trọng nữa là chúng ta cần sử dụng là thuộc tính`background-size` và đảm bảo rằng hình ảnh luôn ở cùng một kích thước.
```html
  <div class='container'>
    <div class='img background-img'></div>
    <div class='img foreground-img'></div>
  </div>
```
```scss
.container {
  position: relative;
  width: 900px;
  height: 600px;
  border: 2px solid white;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 900px 100%;
  }
  .background-img {
    background-image: url('https://i.imgur.com/s08MkXC.jpg');
  }
  .foreground-img {
    background-image: url('https://i.imgur.com/PfIWek4.jpg');
    width: 50%;
  }
}
```
Bây giờ chúng ta đã có `container` mình cần, giờ hãy thêm `slider` - thanh trượt.
### Step 3. Tạo thanh cuộn
Thanh trượt của chúng ta cần bao phủ toàn bộ hình ảnh, với một thanh mỏng màu trắng "phân chia" giữa `foreground` và `background`. Nó có thể tạo thành từ thanh `slider` và `slider-thumb`.
Chúng ta cần phải để giao diện mặc định của `slider-thumb` ẩn đi, sau đó áp dụng style riêng của mình cho nó.
```html
<div class='container'>
  ...
  <input type="range" min="1" max="100" value="50" class="slider" name='slider' id="slider">
</div>
```
```scss
@mixin center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider {
    position: absolute;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    background: rgba(#f2f2f2, .3);
    outline: none;
    margin: 0;
    transition: all .2s;
    @include center;
    &:hover {
      background: rgba(#f2f2f2, .1);
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 6px;
      height: 600px;
      background: white;
      cursor: pointer;
  }
}
```
>Nếu bạn không sử dụng SCSS, hãy thay thế `@include center` thành `@mixin center`, và sử dụng `.slider::-webkit-slider-thumb` để thay thế cho cú pháp `&`

![](https://miro.medium.com/max/1200/1*BHRzsvTNqUVy56lYJM5H8A.gif)

Bây giờ chúng ta có một thanh trượt đang hoạt động, giờ hãy liên kết nó với chiều rộng của `foreground`

### Step 4. Thêm event listener cho thanh cuộn
Bước cuối cùng là kết nối giá trị nhận được từ thanh trượt với chiều rộng của `foreground`. Chúng ta có thể nhận được giá trị từ 1–100 trong `event.target.value` khi chúng ta áp dụng event listener.<br>
Sau đó, chúng ta chỉ cần chọn `foreground` và thay đổi chiều rộng của nó bất cứ khi nào thanh trượt thay đổi.
```javascript
$("#slider").on("input change", (e)=>{
  const sliderPos = e.target.value;
  // Update the width of the foreground image
  $('.foreground-img').css('width', `${sliderPos}%`)
});
```
> Ở đây mình có sử dụng Jquery, bạn có thể import bằng cách sử dụng jQuery CDN [tại đây](https://www.w3schools.com/jquery/jquery_get_started.asp) nhé

![](https://miro.medium.com/max/1200/1*o6We3crc1FXXMWJ44Y5Ygg.gif)

### Step 5. Thêm circle thumb cho thanh cuộn
Khi chúng ta thay thế  "circle-thumb" mặc định bằng đường phân cách màu trắng, chúng ta cần phải thêm vòng tròn trở lại bằng cách nào đó. <br>
Một cách đơn giản (nhưng hơi bẩn :v) để làm điều đó là thêm một phần tử khác, hoàn toàn không liên quan đến thanh trượt, nhưng được đặt ở trung tâm của nó và sẽ “follow” chuyển động của nó bằng javascript. Và đây chính xác là những gì chúng ta sẽ làm.
```html
  <div class='container'>
    ...
    <div class='slider-button'></div>
  </div>
```
```scss
.slider-button {
    $size: 30px;
    pointer-events: none;
    position: absolute;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: white;
    left: calc(50% - 18px);
    top: calc(50% - 18px);
    @include center;
    
    @mixin arrow-helper() {
      content: '';
      padding: 3px;
      display: inline-block;
      border: solid #5D5D5D;
      border-width: 0 2px 2px 0;
    }
    &:after {
      @include arrow-helper();
      transform: rotate(-45deg);
    }
    &:before {
      @include arrow-helper();
      transform: rotate(135deg);
    }
  }
```
> Phần tử `after` và `before` sẽ thêm hai “arrow” bên trong nút hình tròn

```javascript
$("#slider").on("input change", (e)=>{
  const sliderPos = e.target.value;
  // Update the width of the foreground image
  $('.foreground-img').css('width', `${sliderPos}%`)
  // Update the position of the slider button
  $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
});
```
Một điều nữa chúng ta cần làm là làm cho vòng tròn không thể chọn được, do đó sự kiện chuột luôn chuyển đến thanh trượt. Với một số thiết lập cẩn thận bằng CSS và JS, chúng ta sẽ làm cho `circle-thumb` di chuyển cùng với thanh trượt.
![](https://miro.medium.com/max/1200/1*N0fGWEYzGyTyN3SN095qOw.gif)
Và cuối cùng thì thanh filter ảnh `ngày ấy` và `bây giờ` của chúng ta đã hoàn thành. Bây giờ bạn có thể chọn hình ảnh yêu thích của mình và thử nghiệm với nó.
## Demo
{@codepen:  https://codepen.io/josephwong2004/pen/NWRGxdR}
source: https://codepen.io/josephwong2004/pen/NWRGxdR. Chi tiết bài viết bạn có thể tham khảo [tại đây](https://levelup.gitconnected.com/how-to-create-a-before-after-image-slider-with-css-and-js-a609d9ba77bf)
## Lời kết
Trong ví dụ này, mình sử dụng hình ảnh đen trắng và so sánh hình ảnh màu. Nhưng mình thấy rất nhiều ví dụ khác về sự thay đổi của thời gian (chẳng hạn như cùng một thành phố cách đây 100 năm và hiện tại, ảnh hồi bé và ảnh bây giờ, ...). Đối với kiểu thiết kế đó, bạn cũng có thể thêm thẻ sau hiển thị các năm hiện tại (tương tự như cách chúng ta thêm nút trượt). <br>
Ngoài ra, vì chúng ta đang sử dụng thuộc tính `background image` (không bị ảnh hưởng bởi kích thước `container`), bạn cũng có thể sử dụng ảnh gif động để tạo thanh trượt từ tĩnh đến chuyển động một cách dễ dàng.