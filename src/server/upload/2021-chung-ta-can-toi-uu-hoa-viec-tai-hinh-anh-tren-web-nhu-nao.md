### Rất chào các bạn,

Như các bạn đã biết, trong kỉ nguyên công nghệ, song song với sự sinh ra dày đặc của các trang web mới cũng là sự biến mất của những trang web "lạc hậu" hay hoạt động kém hiệu quả. Một trang web hấp dẫn người dùng luôn có cách cung cấp nội dung hiệu quả, sáng tạo, dễ dàng nắm bắt; và các bức ảnh chất lượng, thú vị là cách tốt nhất để thực hiện điều đó. Nhưng rồi một ngày đẹp trời bạn bạn nhận ra trang web tuyệt đẹp của mình lại gây thất vọng với người dùng bởi tốc độ tải trang chậm hơn cả "cụ rùa", khiến họ ngán ngẩm thoát ra. :sob: 

Vì thế hôm nay tôi sẽ chỉ cho các bạn 8 kỹ thuật tối ưu hóa không chỉ giúp bạn giảm băng thông tải mà còn giảm cả việc hao tốn CPU để hiển thị bất kì bức ảnh nào trên ứng dụng web của mình. Chúng ta vào việc ngay thôi! :sunglasses:

Trước hết, tôi sẽ đặt ngay ở đây một đoạn code tổng hợp hầu hết các kỹ thuật tôi sắp nói giúp hiển thị một bức ảnh "chuẩn không cần chỉnh":
```markdown:html
<picture>
    <source type="image/avif" srcset="/img/remote/ZiClJf-1920w.avif 1920w, /img/remote/ZiClJf-1280w.avif 1280w, /img/remote/ZiClJf-640w.avif 640w, /img/remote/ZiClJf-320w.avif 320w" sizes="(max-width: 608px) 100vw, 608px">
    <source type="image/webp" srcset="/img/remote/ZiClJf-1920w.webp 1920w, /img/remote/ZiClJf-1280w.webp 1280w, /img/remote/ZiClJf-640w.webp 640w, /img/remote/ZiClJf-320w.webp 320w" sizes="(max-width: 608px) 100vw, 608px">
    <source type="image/jpeg" srcset="/img/remote/ZiClJf-1920w.jpg 1920w, /img/remote/ZiClJf-1280w.jpg 1280w, /img/remote/ZiClJf-640w.jpg 640w, /img/remote/ZiClJf-320w.jpg 320w" sizes="(max-width: 608px) 100vw, 608px">
    <img loading="lazy" decoding="async" style="background-size: cover; background-image: none;" src="/img/remote/ZiClJf.jpg" alt="Sample image illustrating the techniques outlined in this post." width="4032" height="2268">
</picture>
```

![](https://images.viblo.asia/6ab0dfb2-4dde-48df-932b-184a2bc6d504.jpg)

*"Oke con dê nhé!"* :rofl::rofl::rofl:

# 8 Kỹ thuật tối ưu của chúng ta

## 1. Responsive layout
Hiểu đơn giản, kỹ thuật này giúp ảnh của chúng ta chiếm trọn toàn bộ không gian chiều ngang cho phép tới mức tối đa mà vẫn giữa được tỷ lệ khung hình của chúng.

Một điều khá mới mẻ trong năm 2020, đó là các trình duyệt sẽ dành cho các bức ảnh một không gian chiều dọc chính xác trước khi nó được tải với điều kiện là chiều rộng và chiều cao của ảnh cần được cung cấp từ trước cho thẻ `<img>`. Tin vui này chính là giải pháp để tránh được vấn đề [Cumulative Layout Shift (CLS)](https://web.dev/cls/).

```html:html
<style>
  img {
    max-width: 100%;
    height: auto;
  }
</style>
<!-- Providing width and height is more important than ever. -->
<img height="853" width="1280" … />
```

## 2. Lazy rendering
Kỹ thuật thứ 2 này tiên tiến hơn, đó là áp dụng thuộc tính mới của CSS `content-visibility: auto` để chỉ cho trình duyệt của bạn biết rằng nó không cần quan tâm tới bố cục những bất cứ hình ảnh nào trừ khi chúng chuẩn bị được xuất hiện lên màn hình người dùng. Cách này quả thực mang lại rất nhiều lợi ích trong việc tiết kiệm CPU, nhất là việc trình duyệt chẳng phải "động tay động chân" lo bày trí hình ảnh khi chưa dùng tới. :100:

Cần chú ý một điều nhỏ, việc sử dụng kỹ thuật này sẽ có thể dẫn tới vấn đề [Cumulative Layout Shift (CLS)](https://web.dev/cls/) đã nêu trên. Đối với các trình duyệt web mới như Chrominum 88 thì ta có thể sử dụng kỹ thuật 1 để khai báo kích thước giúp tránh tình trạng này. Nếu không, bạn có thể tìm hiểu thuộc tính [`contain-intrinsic-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size) để đặt kích thước tự nhiên cho đối tượng ảnh bạn muốn.

```css:html
<style>
  /* This probably only makes sense for images within the main scrollable area of your page. */
  main img {
    /* Only render when in viewport */
    content-visibility: auto;
  }
</style>
```

## 3. Định dạng AVIF
Đừng quá sốc, [AVIF](https://jakearchibald.com/2020/avif-has-landed/) đơn giản là một kiểu format mới được chấp thuận sử dụng cho web, Chrominum và Firefox mới đã hỗ trợ tốt kiểu định dạng này, còn bạn nào fan Safari thì phải chờ một thời gian nữa nhé! AVIF được đánh giá thực tế hiệu quả đáng kể về kích thước so với JPEG, và lại còn phù hợp với việc truyền tải dữ liệu hơn WebP. :astonished:

Để sử dụng định dạng AVIF, ta sẽ cần dùng tới thẻ [`picture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture). Ta sẽ lồng thẻ `img` vào bên trong thẻ `picture`. Nếu bạn cảm thấy khó hiểu, đừng lo, thẻ `picture` chỉ giúp ta định nghĩa các `source` ảnh khả dụng, còn bản chất việc hiển thị bố cục vẫn là ở thẻ `img`. 

Nếu bạn gặp khó khăn trong việc mã hóa định dạng AVIF ở phía server, thì thư viện [sharp](https://github.com/lovell/sharp) sẽ giúp bạn biến mọi thứ trở nên thật đơn giản! :heart_eyes:

```shell:html
<picture>
  <source
    sizes="(max-width: 608px) 100vw, 608px"
    srcset="
      /img/Z1s3TKV-1920w.avif 1920w,
      /img/Z1s3TKV-1280w.avif 1280w,
      /img/Z1s3TKV-640w.avif   640w,
      /img/Z1s3TKV-320w.avif   320w
    "
    type="image/avif"
  />
  <!-- snip lots of other stuff -->
  <img />
</picture>
```

## 4. Chọn đúng kích thước ảnh

Ở đoạn code ngay phía trên, bạn sẽ thấy sự xuất hiện của 2 thuộc tính `srcset` và `sizes`. Việc sử dụng selector `w` sẽ giúp trình duyệt chọn ra được URL hình ảnh sẽ được hiển thị dựa trên việc tính toán kích thước thiết bị người dùng ứng với giá trị mà thuộc tính `sizes` cung cấp.

Trình duyệt sẽ luôn chọn ra ảnh có kích thước nhỏ nhất có chất lượng phù hợp với thiết bị người dùng hoặc khi người dùng chủ động sử dụng chế độ tiết kiệm dữ liệu.

Một ví dụ khác với ảnh có định dạng nguyên thủy thay vì AVIF cho các bạn đỡ rối nhé! :sunglasses:

```shell:html
<source
  sizes="(max-width: 608px) 100vw, 608px"
  srcset="
    /img/Z1s3TKV-1920w.webp 1920w,
    /img/Z1s3TKV-1280w.webp 1280w,
    /img/Z1s3TKV-640w.webp   640w,
    /img/Z1s3TKV-320w.webp   320w
  "
  type="image/webp"
/>
<source
  sizes="(max-width: 608px) 100vw, 608px"
  srcset="
    /img/Z1s3TKV-1920w.jpg 1920w,
    /img/Z1s3TKV-1280w.jpg 1280w,
    /img/Z1s3TKV-640w.jpg   640w,
    /img/Z1s3TKV-320w.jpg   320w
  "
  type="image/jpeg"
/>
```

## 5. Caching / Immutable URLs
Bạn có thể thấy ở ví dụ trên tên ảnh đã được băm thành "Z1s3TKV" để có một cái tên "độc nhất vô nhị", từ đây ta có thể áp dụng tính năng caching vô thời hạn cho những bức ảnh đó. Caching headers của bạn sau khi áp dụng sẽ trông kiểu kiểu như này `cache-control: public, =31536000,immutable`.

Đáng tiếc một chút là thuộc tính `immutable` lại chưa được hỗ trợ trên nhiều trình duyệt, nhưng không sao vì số đông chúng ta là fan của Chrominum phải không nào? `max-age` là thuộc tính dự phòng nhằm xác định thời gian caching tính bằng năm. Còn `public` giúp cho phép [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) cache lại hình ảnh của bạn, tuy nhiên hãy cẩn thận với các ảnh riêng tư của mình nhé. :stuck_out_tongue_winking_eye:

## 6. Lazy loading
Kỹ thuật này có thể khá quen thuộc với nhiều bạn, đó là áp dụng thuộc tính `loading="lazy"` vào thẻ `img` để nhắc trình duyệt chỉ tải ảnh khi chúng "có vẻ" chuẩn bị được xuất hiện lên màn hình người dùng.

```markdown:html
<img loading="lazy" … />
```

## 7. Asynchronous decoding
Kỹ thuật này sử dụng thuộc tính `decoding="async"` cho thẻ `img` để trình duyệt giải mã ảnh hiển thị một cách bất đồng bộ, tránh sự ảnh hưởng của người dùng tới CPU. Bản thân mình chưa thấy được sự bất lợi nào của kỹ thuật này, nhưng chắc phải có lý do thì nó mới không được để là mặc định nhỉ? :rofl:

```markdown:html
<img decoding="async" … />
```

## 8. Blurry placeholder
Blurry placeholder là một hình ảnh "nội tuyến" cung cấp cho người dùng cảm quan nhất định về hình ảnh sẽ được tải lên mà không cần phải tải nạp dữ liệu.

![](https://images.viblo.asia/51de3d77-cde8-4b68-bb4d-579880857b23.png)

Một chút chú ý về cách triển khai thuần html về kỹ thuật này:
* Kỹ thuật này sẽ nội suy ảnh mờ làm nền cho ảnh thật mà không cần tạo thêm một đối tượng ảnh thứ 2, ảnh mờ sẽ được ẩn đi khi ảnh thật hoàn tất việc tải lên. Chính vì thế chúng ta sẽ không cần đụng tới Javascript ở đây nhé!
* Kỹ thuật này sẽ bao bọc URI dữ liệu của ảnh gốc vào bên trong URI dữ liệu của ảnh mờ ở định dạng svg. Toàn bộ quá trình được thực hiện ở mức độ xử lý SVG thay vì các bộ lọc CSS, vì thế đối với mỗi ảnh, quá trình chỉ xảy ra một lần khi tổng hợp SVG chứ không thực hiện hiển thị và lưu các lớp layouts gây hao tốn CPU.

Nghe có vẻ khó hiểu ghê :sweat_smile::sweat_smile::sweat_smile:. Chúng ta đi vào ví dụ luôn nha:
```objectivec:html
<img
  style="
      …
      background-size: cover;
      background-image: 
        url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http%3A//www.w3.org/2000/svg\'
        xmlns%3Axlink=\'http%3A//www.w3.org/1999/xlink\' viewBox=\'0 0 1280 853\'%3E%3Cfilter id=\'b\' color-interpolation-filters=\'sRGB\'%3E%3CfeGaussianBlur stdDeviation=\'.5\'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type=\'discrete\' tableValues=\'1 1\'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter=\'url(%23b)\' x=\'0\' y=\'0\' height=\'100%25\' width=\'100%25\' 
        xlink%3Ahref=\'data%3Aimage/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAs0lEQVQI1wGoAFf/AImSoJSer5yjs52ktp2luJuluKOpuJefsoCNowB+kKaOm66grL+krsCnsMGrt8m1u8mzt8OVoLIAhJqzjZ2tnLLLnLHJp7fNmpyjqbPCqLrRjqO7AIeUn5ultaWtt56msaSnroZyY4mBgLq7wY6TmwCRfk2Pf1uzm2WulV+xmV6rmGyQfFm3nWSBcEIAfm46jX1FkH5Djn5AmodGo49MopBLlIRBfG8yj/dfjF5frTUAAAAASUVORK5CYII=\'%3E%3C/image%3E%3C/svg%3E');
    "
  …
/>
```

### Cải thiện thêm bằng Javascript?
Đôi khi trình duyệt vẫn thực hiện công việc xử lý, tổng hợp ảnh mờ cho dù ảnh thật vốn dĩ đã tải xong. Đặc biệt là khi ảnh gốc của chúng ta là một ảnh có độ trong suốt/xuyên thấu nhất định, thì việc ảnh mờ vẫn chưa được xóa quả là một lỗi cần xử lý. Vậy nên lúc này, ta cần sử dụng Javascript để chủ động xóa đi ảnh mờ ở phần nền.

```javascript:html
<script>
  document.body.addEventListener('load', (e) => {
      if (e.target.tagName != 'IMG') {
        return;
      }
      // Remove the blurry placeholder.
      e.target.style.backgroundImage = 'none';
    },
    /* capture */ true
  );
</script>
```

### Chào các bạn lần nữa,

Vậy là mình đã tổng hợp xong 8 kỹ thuật mình tìm hiểu và thấy vô cùng có ích trong việc nâng cao hiệu suất xử lý dữ liệu hình ảnh trong chính những trang web của chúng ta rồi. Mong rằng các bạn sẽ rút ra được những điều mới mẻ cho bản thân sau khi đọc bài viết của mình. :heart_eyes:

Cảm ơn các bạn đã dành thời gian cho những điều mình chia sẻ! Hẹn gặp lại các bạn trong những bài viết tiếp theo... :innocent: