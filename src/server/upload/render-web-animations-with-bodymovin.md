## Giới thiệu

***“Phải làm gì để đáp ứng trải nghiệm người dùng? Tương tác thế nào sẽ sáng tạo và thú vị nhất?”***
<br><br>

Đã bao giờ bạn đặt ra câu hỏi này cho chính mình khi bắt đầu làm một ứng dụng gi đó chưa?
<br><br>

`Web Animation` dần trở thành xu hướng trong lĩnh vực thiết kế web và nhận được sự đón nhận nồng nhiệt của người sử dụng. Những hiệu ứng sống động từ `animation` gần như đóng góp đáng kể vào sự thành công của một website. Bằng chứng rằng chỉ với một vài icon nhấp nháy, menu linh hoạt, hình ảnh chuyển động cũng đã  đủ khiến người truy cập thêm tò mò, thích thú.
<br><br>
![web animation](https://github.com/airbnb/lottie-web/raw/master/gifs/Example4.gif)
<br><br>
Tuy nhiên, để tạo ra các `animation` này không hề dễ. Chính vì vậy, có rất nhiều thư việc được tạo ra nhằm hỗ trợ tạo ra các `animation` đẹp mắt mà bạn không cần phải `code` quá nhiều. Các thư viện này hỗ trợ bạn tạo `animation` dựa trên các phần tử html mà bạn đã tạo ra.
<br><br>
Tuy nhiên, nếu bạn đã có sẵn một loạt các animation trên `After Effects` và bạn muốn sử dụng nó trên trang web của bạn thì phải làm sao? Chuyển nó thành `video`? chuyển nó thành `gif`? Quá nặng, sẽ ảnh hưởng quá nhiều tới quá trình load và hiển thị website của bạn. Bạn cần phải chuyển đổi nó thành `cái gì đó` nhẹ hơn để load và `1 cái gì khác` để render animation của bạn trên web.

## Render animation cùng với BodyMovin
Như đã nó ở trên, bạn cần chuyển AE animation của bạn thành một cái gì đó nhẹ và có thể dùng để render ra trê web. [BodyMovin](https://aescripts.com/bodymovin/) chính là thứ mà bạn cần.
<br><br>
{@codepen: https://codepen.io/airnan/pen/NjayEE}
<br><br>
Trong bài viết này mình sẽ hướng dẫn các bạn sử dụng các file json được export từ AE để render các animation trên website của bạn. Còn việc export như thế nào thì các bạn có thể tham khảo ở video ở dưới đây nhé
<br><br>
{@youtube: https://youtu.be/5XMUJdjI0L8}
*Video hướng dẫn export json từ AE*
<br><br>

#### Cài đặt
```bash
# with npm
npm install lottie-web

# with bower
bower install bodymovin
```

Hoặc bạn có thể download tại [cdnjs](https://cdnjs.com/libraries/bodymovin)

#### Sử dụng

```html
<script src="js/lottie.js" type="text/javascript"></script>

<script>
lottie.loadAnimation({
    container: element, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: data.json',
    rendererSettings: {
        context: canvasContext, // the canvas context
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        className: 'some-css-class-name'
    }
});
</script>
```

Sau khi `import` thư viện vào, bạn có thể gọi `lottie.loadAnimation()` để bắt đầu animation. Tham số của phương thức `loadAnimation()` là một object chứa các thông tin về animation được export từ AE:
- path: đường dẫn tới file json chứa thông tin của animation
- loop: lặp animation hoặc không, giá trị: `true` / `false` / `number`
- autoplay: tự động chạy animation khi nó load dữ liệu xong
- name: tên của animation
- renderer: kiểu render `svg` / `canvas` / `html`
- container: `dom element` nơi mà animation được render

Nó sẽ trả về một instance animation, bạn có thể điều khiển play, pause, setSpeed,... animation thông qua instance này. Nói chung, khá là đơn giản.
<br><br>
{@codepen: https://codepen.io/airnan/pen/gvBMPV}

#### Thư viện animation được export sẵn
Thực sự mà nói thì không phải ai cũng có sẵn hàng tá các animation trên AE để export và sử dụng, vậy nên chúng ta có trang web [lottiefiles](https://www.lottiefiles.com/). 
<br><br>
Đây là trang web chứa sẵng hàng nghìn các animation được export sẵn cho các bạn download, và nó free hoàn toàn. Ngoài ra nó còn hỗ trợ các bạn tạo `gif` từ animation mà các bạn chọn.
<br><br>
Bạn có thể xem các animation được hoạt động như thế nào trước khi download nó về máy.
Ví dụ như với cái này: https://www.lottiefiles.com/427-happy-birthday

![](https://images.viblo.asia/54085c41-3cf4-4f99-82d2-2ca3cdd1cada.gif)