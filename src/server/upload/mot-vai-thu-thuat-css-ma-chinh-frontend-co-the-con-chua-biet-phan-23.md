![](https://images.viblo.asia/cac19f07-1ac1-4d07-8d27-bf8f60a36056.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 23 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Đừng viết nhiều CSS quá

CSS code thì dễ lắm, vì nó cho phép bạn viết thừa code cũng chẳng ảnh hưởng gì, miễn là bạn cung cấp đủ những thuộc tính cần cho trình duyệt hiểu là được.

Nhiều lúc code mà trình duyệt chưa ăn CSS, bạn lập tức mở Inspect Element ra chỉnh cho nhanh, chính vì sự dễ tiếp cận và làm việc cùng với CSS như vậy, nên hầu như các dev mà làm về web thì đều biết code CSS hết.

Nhưng khi bạn làm với nó lâu, bạn hiểu nó hơn, thì sẽ nhận ra nhiều lúc mình đang viết thuộc tính CSS thừa quá.

Đặc biệt là 1 dev Frontend bạn cần phải trau chuốt phần code CSS nhiều hơn, giảm đi các thuộc tính CSS thừa, thì file CSS cũng sẽ giảm dung lượng theo.

Nếu có đem source code đi show cho khách hàng xem, giả sử họ cũng rành về CSS, thì lúc đấy bạn nhận thêm điểm cộng với source code sạch sẽ, gần như không có CSS thừa.

Mình thấy những lỗi thừa code CSS hay gặp phải là:

- Những [thẻ block](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) mà còn thêm `display: block`. Ví dụ như `div` thì bản chất là block element rồi, không cần phải thêm `display: block` làm gì nữa.
- Chỗ nào cũng thêm `font-family: ...`. Mà quên rằng `font-family` là [thuộc tính CSS có tính chất thừa kế](https://stackoverflow.com/questions/5612302/which-css-properties-are-inherited), chỉ cần ở global (là thẻ `body`) bạn khai báo là đủ rồi. Chỉ khai báo thêm nếu ở đó có `font-family` khác mà thôi. `font-size` cũng tương tự như vậy.
- Ngoài ra có vài trường hợp đặc biệt, như khi đi cùng thuộc tính này thì thuộc tính kia trở nên vô dụng. Ví dụ như `position: static` thì `z-index: 99999...` có bao nhiêu đi chăng nữa cũng là thừa.

Thử tìm ra những thuộc tính thừa ở ví dụ bên dưới nhé!

{@codepen: https://codepen.io/tinhh/pen/JjYzxgd}

Thôi mình copy code ra đây để anh em tiện xem..

```html
<div class="card">I'm card</div>
```

```scss
body {
   display: flex;
   align-items: center;
   justify-content: center;
   min-height: 100vh;
   font-size: 14px;
   line-height: 1.5;
   font-family: Arial, sans-serif;
}

.card {
   display: block; // thừa => vì class "card" là thẻ div và nó là block element
   width: 200px;
   height: 300px;
   background-color: olive;
   color: #fff;
   border-radius: 5px;
   display: flex;
   flex-direction: row; // thừa => mặc định `flex-direction` là row mà không cần khai báo thêm
   align-items: center;
   justify-content: center;
   overflow: hidden;
   position: relative;
   font-size: 14px; // thừa => ở global đã khai báo font-size là 14px rồi
   line-height: 20px; // có thể không cần khai báo, thừa kế line-height từ body là đủ rồi, trừ trường hợp đặc biệt mới cần set lại
   font-family: Arial, sans-serif; // thừa => ở global đã khai báo font-family tương tự rồi
   
   &:before {
      content: "NEW";
      background-color: #000;
      padding: 3px 7px;
      display: block; // thừa => đây là điều đặc biệt, khi khai báo absolute, thì không cần display: block nữa
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      font-size: 12px;
      font-family: Arial, sans-serif; // thừa => ở global đã khai báo font-family tương tự rồi
   }
}
```

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
- https://stackoverflow.com/questions/5612302/which-css-properties-are-inherited
- https://stackoverflow.com/questions/5042467/css-displayinline-block-and-positioningabsolute

### 2. `image-rendering: pixelated` ảnh QR code đã hết mờ rồi

Đã bao giờ bạn scale 1 bức hình to gấp vài lần ảnh gốc và sau khi scale to lên nó trông mờ đi không?

{@codepen: https://codepen.io/tinhh/pen/mdeogzN}

Ở ví dụ trên bạn thấy bức hình bị mờ đi và đây cũng chính là kỹ thuật render hình ảnh mặc định của trình duyệt.

Tuy nhiên CSS3 đã cho ra đời 1 thuộc tính có tên `image-rendering` gồm 2 value là `crisp-edges` và `pixelated` cho phép can thiệp các loại thuật toán render hình ảnh khác nhau. 

Riêng cái `pixelated` mình khá là ưng, vì đã từng rơi vào trường hợp cần phóng to 1 ảnh QR code, như thông thường thì nó sẽ bị mờ, nhưng giờ đơn giản chỉ cần đặt 1 thuộc tính `image-rendering: pixelated;` là giải quyết được vấn đề ngay tức khắc.

{@codepen: https://codepen.io/tinhh/pen/gOaEyyb}

Chắc có lẽ sẽ còn nhiều case thực tế tận dụng được tính năng trên, nhưng mình chưa từng gặp, nếu bạn có biết thì cho mình xin thêm ý kiến dưới comment bài viết nhé!

> **Browser Support:** Support khá OK, cần thêm prefix là được
> 
> https://caniuse.com/#feat=css-crisp-edges

#### Đọc hiểu thêm

- https://css-tricks.com/almanac/properties/i/image-rendering/
- https://css-tricks.com/keep-pixelated-images-pixelated-as-they-scale/
- https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
- https://codepen.io/robinrendle/full/EaOJeq/

### 3. Kỹ thuật Data URLs vẫn có cái hay

Sử dụng source image với đường dẫn external như file `.png`, `.jpg` hay `.svg` thì ai cũng biết rồi. Thế bạn có bao giờ để ý đến những đường dẫn `<img />` kiểu như:

```html
<img width="16" height="16" alt="star" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7" />
```

Hay là `background-image` kiểu này

```css
div {
    background: url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7) no-repeat left center;
}
```

Vâng đó chính là [kỹ thuật Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) một chuỗi dài hơi "vô nghĩa" được tạo ra từ mỗi bức ảnh bằng **Base64 Encoding**.

> Base64 là từ khóa mà mọi người dùng để trao đổi về kỹ thuật này. Vì đây là phương thức encoding chính mà kỹ thuật này thường sử dụng.

Với phương thức sử dụng load data kiểu này, cá nhân mình thấy những lợi ích kiểu như:

- Tăng tốc page loading, vì không phải load resource ngoài như kiểu 1 tấm ảnh PNG, JPG. Sẽ không phải tốn 1 Requests HTTP nào thêm.
- Đưa vào code mà không phải kèm theo 1 file ảnh đi cùng, thuận lợi cho việc chia sẻ file hơn. Load offline cũng tiện nữa.

Những anh em đã từng sử dụng bộ Boilerplate [Create React App](https://create-react-app.dev/docs/adding-images-fonts-and-files) chắc cũng biết đến cơ chế import ảnh của nó, cũng áp dụng kỹ thuật convert ảnh kiểu này.

Hay là anh em sử dụng [custom select](https://getbootstrap.com/docs/4.5/components/forms/#select-menu) của Bootstrap, thì để ý đến dấu mũi tên ở góc phải, nó cũng đang được áp dụng kỹ thuật này đấy.

Sẽ có khá nhiều tool thực hiện công việc này bao gồm dạng online như `https://www.base64-image.de/` hay các package trên NPM tùy theo công cụ mà anh em sử dụng là `Webpack`, `Gulp`...

![](https://images.viblo.asia/3f04f4dd-7ee7-498f-b271-5117a0f75cd7.PNG)

> **Browser Support:** Hầu như các Browsers phổ biến đều đang hỗ trợ tốt
> 
> https://caniuse.com/#feat=datauri

#### Đọc hiểu thêm

- https://css-tricks.com/data-uris/
- https://css-tricks.com/probably-dont-base64-svg/
- https://base64.guru/developers/data-uri
- https://create-react-app.dev/docs/adding-images-fonts-and-files
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!