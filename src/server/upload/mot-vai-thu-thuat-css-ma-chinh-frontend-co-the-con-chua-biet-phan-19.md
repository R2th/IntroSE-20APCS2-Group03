![](https://images.viblo.asia/cb0dc1aa-abd2-420a-9eea-5169fdd457a6.jpeg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 19 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Máy em yếu lắm, em muốn tắt animation trên web đi thì phải làm sao?

Trên các hệ điều hành dành cho Desktop và cả Mobile, các nhà phát hành đều đang hoàn thiện và cung cấp cho người dùng tính năng để "tắt đi bớt hiệu ứng (motion, animation)" trên hệ điều hành.

Và hưởng ứng theo phong trào đấy, thì các trình duyệt cũng đang dần hoàn thiện và phát hành đến cho cộng đồng phát triển web 1 media query có tên **prefers-reduced-motion**

Tuy chưa được phổ biến ở tất cả các trình duyệt mà chúng ta thường phục vụ, trong đó có IE, nhưng vì đây là 1 tính năng hoạt động theo kiểu enhancement, tức là nếu được thêm trình duyệt nào đáp ứng thì càng tốt chừng đó. Vì nó không ảnh hưởng trực tiếp đến trải nghiệm của người dùng, nên nếu trình duyệt không support, thì cũng không có gì phải lo cả.

Cơ chế hoạt động của tính năng này vô cùng dễ hiểu, giả sử bạn đang có 1 đoạn code CSS viết hiệu ứng `hover` thì cho cái hộp `transform` xoay 1 vòng:

```scss
.box {
   ... các thuộc tính khác
   transition: .5s;
   
   &:hover {
      transform: rotate(1turn);
   }
}
```

Giả sử người dùng ở đây đang sử dụng MacOS, họ thường có xu hướng tick vào `Reduce Motion` để disable đi hiệu ứng.

![](https://images.viblo.asia/09f252a5-08a1-4140-b7c3-9b95c37946f5.png)

> Đối với các HĐH khác, thì bạn có thể xem thêm phần **User Preferences** ở [link này](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) để biết cách chọn tính năng này.

Rồi khi quay lại web, họ muốn hiệu ứng `hover` kia không còn hoạt động nữa (cái `.box` kia không bị xoay vòng tròn nữa). Lúc này code của chúng ta sẽ cần dùng đến media query `prefers-reduced-motion` như sau:

```scss
.box {
   ... các thuộc tính khác
   transition: .5s;
   
   &:hover {
      transform: rotate(1turn);
      
      @media (prefers-reduced-motion: reduce) {
          transform: none;
      }
   }
}
```

{@codepen: https://codepen.io/tinhh/pen/GRgXZVN}

Nếu bạn ấy đang sử dụng Chrome hoặc Firefox với các phiên bản mới nhất, thì chắc chắc đoạn code trên hoạt động được rồi đấy.

Và đó là trường hợp mình giả sử cho các bạn dễ hiểu (hiệu ứng có vẻ đang còn khá đơn giản, chưa đến mức cần phải tắt nó đi), nhưng trong thực tế sẽ có những trang web khách hàng muốn có nhiều hiệu ứng, và đâu đó nó đang ngốn RAM và làm cho máy tính của bạn có cảm giác bị chậm hơn, trải nghiệm trên trang web lúc đấy không còn được smooth, hoặc đôi khi là bị giật giật nếu máy có cấu hình hơi yếu.

> **Browser Support:** KHÔNG VẤN ĐỀ GÌ
> 
> Như đã giải thích ở trên, đây là tính năng giúp cải thiện trải nghiệm người dùng tốt hơn, nên cứ trình duyệt nào mà hỗ trợ thì càng tốt.
> 
> https://caniuse.com/#feat=mdn-css_at-rules_media_prefers-reduced-motion

#### Đọc hiểu thêm

- https://developers.google.com/web/updates/2019/03/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

### 2. Viết `@keyframes` ngắn hơn

`@keyframes` được coi là thứ quan trọng nhất của thuộc tính `animation`, nhưng mình chắc rằng lâu nay khi các bạn define 1 `@keyframes` mà không để ý tận dụng hết khả năng vốn có của các thuộc tính con của `animation` như `animation-fill-mode` hay `animation-direction` mang lại. Dưới đây là 1 vài khám phá mà mình học hỏi được:

**2.1. `animation-fill-mode: forwards`**

Với kiểu hiệu ứng chuyển động **fade-in** khá là quen thuộc với nhiều dev và hay được sử dụng, có phải bạn thường sẽ viết theo kiểu:

```scss
@keyframes fadeIn {
   from {
       opacity: 0;
   }
   to {
       opacity: 1;
   }
}

.box {
   ... các thuộc tính khác
   
   opacity: 1;
   animation: fadeIn 2s;
}
```

{@codepen: https://codepen.io/tinhh/pen/dyPqQBW}

Nhưng trong trường hợp này, thuộc tính `animation-fill-mode` với giá trị là `forwards` sẽ giúp cho đoạn định nghĩa `@keyframes` ở trên không cần phải khai báo phần `from { ... }` nữa.

```scss
@keyframes fadeIn {
   to {
       opacity: 1;
   }
}

.box {
   ... các thuộc tính khác
   
   opacity: 0;
   animation: fadeIn 2s forwards;
}
```

{@codepen: https://codepen.io/tinhh/pen/gObdZOz}

**2.2. `animation-direction: alternate`**

Tiếp tục 1 case chuyển động khác, lần này mình muốn màu background chuyển động từ **màu đỏ** sang **màu vàng** và cho chuyển động liên tục (infinite)

Trước đây, mình toàn viết thế này:

```scss
@keyframes bgColorTransition {
   0% {
      background-color: red;
   }
   50% {
      background-color: yellow;
   }
   100% {
      background-color: red;
   }
}

.box {
   ... các thuộc tính khác
   
   animation: bgColorTransition 2s linear infinite;
}
```

{@codepen: https://codepen.io/tinhh/pen/ExaeGLm}

Nhưng khi biết được sự hay ho của thuộc tính `animation-direction: alternate`, thì code mình giảm đi hẳn được mấy dòng không cần thiết :smiley: , mà hiệu ứng vẫn đạt được như ý muốn.

```scss
@keyframes bgColorTransition {
   to {
      background-color: yellow;
   }
}

.box {
   ... các thuộc tính khác
   
   background-color: red;
   animation: bgColorTransition 1s linear infinite alternate;
}
```

{@codepen: https://codepen.io/tinhh/pen/eYmLbbg}

> **Browser Support:** HỖ TRỢ NGON LÀNH
> 
> Những tips trên đều là các thuộc tính `animation`, mà `animation` thì đã được hỗ trợ trên các trình duyệt khá là phổ biến rồi (IE10 trở lên cũng đã hỗ trợ tốt)
> 
> https://caniuse.com/#feat=css-animation

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
- https://twitter.com/anatudor/status/1213449962610147330

### 3. Tạo khoảng cách cho một component với ĐIỀU KIỆN LÀ

Bạn hình dung có kiểu tình huống như này, bạn thường chia các section trên trang thành những component riêng biệt để có thể reuse, cũng như là dễ code, dễ maintain, dễ đọc nữa..

```html
<!-- Trang 1 -->
<div>
    <ComponentA />
    <ComponentB />
    <ComponentC />
</div>

<!-- Trang 2 -->
<div>
    <ComponentB />
    <ComponentC />
    ^
    <ComponentA />
</div>
```

Khi xây dựng **ComponentA** mình không set `margin-top` vì nhìn vào tổng thể thiết kế, nó thường đặt ở đầu và không có khoảng cách gì so với top cả, nhưng có vài trường hợp thì nó lại chui xuống dưới nằm và thật không may là khi **ComponentA** mà ở dưới **ComponentC** thì 2 component dính sát vào nhau, trông giao diện lúc này khá là xấu, lúc này mình sẽ phải tìm cách tạo 1 khoảng `margin` cho 2 component trên.

Case này để xử lý thì không có gì khó cả, các bạn dev sẽ nghĩ ra rất nhiều cách, kiểu như:

- Đặt `class` thêm cho **componentA**, ví dụ 1 class tiện ích kiểu `mt-30` (`margin-top: 30px`) và gắn class vào khi mà gọi **ComponentA** ở dưới **ComponentC**.
- Nếu bạn đang làm việc với React hoặc Vue, thì có lẽ bạn nghĩ tới việc define 1 props là `marginTop` chẳng hạn.

Các cách trên thì nhìn có vẻ cũng ok rồi đó, nhưng mà mình muốn nó auto 1 chút, cứ phải làm sao mà khi 2 component kia đi liền kề (**ComponentA** liền kề sau **ComponentC**) thì CSS set `margin-top` vào đó :smiley: 

Mà nói đến liền kề, thì mình chỉ có nghĩ ngay đến selector `+` trong CSS thôi!!!

Và đoạn code ở đây là:

```scss
.ComponentC + .ComponentA {
    margin-top: 30px;
}
```

Đoạn code trên nghĩa là **ComponentA** chỉ ăn được CSS `margin-top: 30px` khi mà nó đặt cùng cấp và liền kề sau với **ComponentC** mà thôi.

> **Browser Support:** 100% ĂN CHẮC
> 
> Ký hiệu `+` kia là selector của CSS 2.1 mà, nên không có gì để bàn về Browser Support nữa rồi
> 
> https://caniuse.com/#feat=css-sel2

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!