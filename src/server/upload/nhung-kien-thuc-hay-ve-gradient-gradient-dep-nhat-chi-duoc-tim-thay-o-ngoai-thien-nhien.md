![Mặt trời lặn với nền trời gradient](https://images.viblo.asia/4353d85e-1fee-42e8-adee-6536f3be961e.jpg)

Quen thuộc từ lâu với rất nhiều người, **nền Gradient** chỉ là những bức nền với 2 hay nhiều dải màu sắc được hòa trộn với nhau. Đơn giản là vậy, nhưng càng ngày Gradient càng phổ biến hơn trong thiết kế Website ngày nay. Bằng cách chọn các màu sắc thật khéo léo, người ta có thể dễ dàng đem lại một vẻ ngoài bắt mắt, sống động cho Website nhờ Gradient.

Bạn cũng dễ dàng bắt gặp các mẫu thiết kế có sử dụng Gradient trên **Dribbble**, hay rất nhiều trang Web đang dần dần ứng dụng nó trong thiết kế như **TailwindCSS** hay **CSS-Tricks**. Đa phần những gì bạn thấy ở đó đều là những sản phẩm được quan tâm đến thiết kế một cách tỉ mỉ và đều rất đẹp!

Bài viết này là tổng hợp một vài các kiến thức hay và thú vị liên quan đến Gradient mà mình có dịp tìm hiểu được, hy vọng bạn sẽ thấy có ích.

## Gradient đẹp nhất được tìm thấy ở ngoài thiên nhiên
Không phải ngẫu nhiên mà các nhà thiết kế lão làng thì chọn ra được những dải màu Gradient vô cùng dễ chịu, "thuận mắt". Tuy nhiên đến lúc bạn chọn thì lại chỉ ra toàn những dải Gradient **xấu hoắc**! Liệu có quy tắc hay bí quyết gì để tạo ra một Gradient tự nhiên và đẹp không?

Không phải cứ chọn lấy 2 màu bất kỳ là bạn sẽ có ngay được dải Gradient đẹp. Bí mật chính là đây: **các dải Gradient đẹp đều được lấy cảm hứng từ ngoài thiên nhiên!**

Gradient xuất hiện rất nhiều ở ngoài thế giới tự nhiên mà bạn có thể dễ dàng bắt gặp, nhưng dễ thấy nhất vẫn là *bầu trời*. Tùy vào từng khoảnh khắc bình minh hay hoàng hôn, trời trong xanh hay giông bão, bầu trời có thể có gần như vô vàn các sắc thái Gradient khác nhau.

![Gradient nền trời 1](https://images.viblo.asia/5cbebe25-825e-4be7-8733-0373fe408759.png)
![Gradient nền trời 2](https://images.viblo.asia/36041e4c-adcc-41a3-bac7-f711e255acea.png)

(Hình ảnh gốc bởi [@veeterzy](https://www.pexels.com/photo/silhouette-photo-of-a-mountain-during-sunset-114979/) và [@mullins](https://unsplash.com/photos/3Jnws1iRSwk))

Trên đây là một vài bức hình mà mình chọn được sau một hồi tìm kiếm. Sau đó, nhờ sử dụng các **công cụ trích xuất màu** từ bức ảnh (ví dụ như [canva.com/colors/color-palette-generator](https://canva.com/colors/color-palette-generator), mình có được bảng màu của ảnh. Từ những màu đó, mình có thể dễ dàng sử dụng để tạo ra vài Gradient trông rất đẹp mắt và tự nhiên.

Những ví dụ về các phối hợp màu Gradient mà **bạn không nên dùng** là *Cam* + *Xanh nước biển*, hoặc *Xanh lá cây* + *Đỏ*. Những dải màu như này hiếm khi thấy được ở thiên nhiên và sẽ trông khá **kỳ cục và không thuận mắt** khi đưa vào các thiết kế:

![Những cách phối hợp màu Gradient mà bạn không nên sử dụng](https://images.viblo.asia/3d5465c5-a760-47b3-bbbf-5b06e68a1797.png)

Chẳng ai biết rõ nguyên nhân tại sao, nhưng có lẽ thiên nhiên qua thời gian đã khắc sâu vào trong tiềm thức của loài người và luôn là chuẩn mực của cái đẹp trong đôi mắt chúng ta.

## Gradient mượt mà hơn với Easing Function
### Giới thiệu
Giờ mình cần bạn để ý kỹ sự khác biệt giữa hai bức ảnh dưới đây:

![Gradient không dùng easing function](https://images.viblo.asia/2d406931-ea03-43d2-aede-4c9c7e32864b.png)
![Gradient có dùng easing function](https://images.viblo.asia/2bfdfdb4-f9f5-4a06-94e4-89b4a2f00aea.png)

Cái mình vừa làm ở 2 bức ảnh trên là sử dụng một gradient màu *đen* -> *trong suốt* để giúp làm **nổi bật tiêu đề** của ảnh trong trường hợp bức ảnh quá sáng. Tuy nhiên, giữa hai bức ảnh, gradient trong ảnh thứ 2 có **cải thiện rõ rệt** so với ảnh 1 ở một chỗ: **Gradient ở ảnh 2 được hòa quyện vào bức hình một cách hoàn hảo, nhưng bức ảnh 1 thì Gradient lại bị để lại một đường cạnh sắc nhọn.**

Tại sao lại có sự khác biệt như thế? Mình xin được bật mí bí mật này:

Gradient ở ảnh 1 là Gradient linear-gradient vốn có của CSS, **chuyển dịch theo một hàm tuyến tính:**

![Gradient 1 CSS](https://images.viblo.asia/3f9a30e2-1178-402f-979b-669b0888e413.png)

``` css
.bg-grad {
  background: linear-gradient(
    to top, 
    hsl(0, 0%, 0%),
    hsla(0, 0%, 0%, 0)
  );
```

Do chuyển dịch theo kiểu tuyến tính, **Gradient ở ảnh 1 này sẽ luôn để lại một đường "góc cạnh" khó chịu** ở cuối Gradient.

Trong khi ở ảnh 2, mình có **sử dụng thêm hàm chuyển động giúp làm mượt lại 2 phía** của Gradient:

![Gradient 2 CSS](https://images.viblo.asia/5e9ee911-94b7-422e-9dc2-80781f55a2ed.png)

``` css
.bg-grad {
  background: linear-gradient(
    to top, 
    hsl(0, 0%, 0%),
    ease-in-out,
    hsla(0, 0%, 0%, 0)
  );
```

### Áp dụng
Khá tuyệt đúng hông? Nhưng nếu bạn thử áp dụng cú pháp Easing Gradient phía trên luôn thì sẽ **không hoạt động** đâu, vì hiện tại cú pháp trên chưa được chính thức hỗ trợ bởi CSS =)).

Để tạo **Easing Gradient**  như vậy, bạn có 2 lựa chọn:
- Một là sử dụng thêm **công cụ build** cho dự án frontend của bạn, có tích hợp thêm **postCSS** và sử dụng plugin [postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients). Nếu dự án bạn vốn có sử dụng build tool như Vue hay React thì việc tích hợp này rất dễ dàng.
- Hai là sử dụng **công cụ online** ở [larsenwork.com/easing-gradients](https://larsenwork.com/easing-gradients/#editor).

Nếu là ở cách 1 thì bạn có thể dùng đúng cú pháp như ví dụ phía trên. Nhưng nếu bạn theo cách 2 thì công cụ online trên sẽ tự sinh cho bạn một đoạn CSS thay thế, trông tương tự thế này:

``` css
.bg-grad {
  background: linear-gradient(
    to top,
    hsl(0, 0%, 0%) 0%,
    hsla(0, 0%, 0%, 0.987) 8.1%,
    hsla(0, 0%, 0%, 0.951) 15.5%,
    hsla(0, 0%, 0%, 0.896) 22.5%,
    hsla(0, 0%, 0%, 0.825) 29%,
    hsla(0, 0%, 0%, 0.741) 35.3%,
    hsla(0, 0%, 0%, 0.648) 41.2%,
    hsla(0, 0%, 0%, 0.55) 47.1%,
    hsla(0, 0%, 0%, 0.45) 52.9%,
    hsla(0, 0%, 0%, 0.352) 58.8%,
    hsla(0, 0%, 0%, 0.259) 64.7%,
    hsla(0, 0%, 0%, 0.175) 71%,
    hsla(0, 0%, 0%, 0.104) 77.5%,
    hsla(0, 0%, 0%, 0.049) 84.5%,
    hsla(0, 0%, 0%, 0.013) 91.9%,
    hsla(0, 0%, 0%, 0) 100%
  );
}
```

Đây là CodePen của ví dụ này:

{@embed: https://codepen.io/tranxuanthang/pen/zYKeJRv}

Ngoài ra, **trình xem video của Youtube** cũng sử dụng **Easing Gradient** để khiến phần điều kiển không bị chìm vào video. Tuy nhiên, giải pháp của họ khá hay là thay vì dùng CSS thì họ sử dụng một **ảnh PNG trong suốt**:

![Trình xem video của Youtube](https://images.viblo.asia/8a3b09f4-3f14-40db-ac67-4a821fbd4370.png)

## Tham khảo
- https://uxplanet.org/the-secret-of-great-gradient-2f2c49ef3968
- https://css-tricks.com/easing-linear-gradients/
- https://larsenwork.com/easing-gradients/