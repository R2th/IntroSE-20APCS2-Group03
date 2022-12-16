Chào các bạn!

Đã bao giờ các bạn gặp phải trường hợp *trong design có 1 icon khác lạ mà icon đó không hề có trong library icon font mà bạn đang dùng* chưa? Có lẽ là không ít lần rồi nhỉ? Vậy bạn cần làm thế nào trong trường hợp này? Có lẽ đa phần các bạn sẽ chọn phương pháp là export icon đó sang file svg và dùng theo image hoặc background-image. Tuy nhiên, một vấn đề xảy ra ở đây là khi icon đó có nhiều màu khác nhau thì bạn sẽ phải export toàn bộ icon tương ứng với mỗi color đó. Như vậy sẽ khá là phiền nhỉ? Vậy sao chúng ta không dùng 1 cách khác vô cùng tiện lợi hơn? Đó là **convert file svg sang icon font.**

Như câu hỏi trên title của bài viết, hôm nay mình sẽ hướng dẫn các bạn cách convert 1 file svg 1 cách khá đơn giản và vô cùng tiện lợi cho các bạn.
Đầu tiên, các bạn có thể truy cập vào web này:
https://icomoon.io/app/#/select

Mình giới thiệu một chút về web này nhé. Web này cũng là 1 trong những library về icon font giống như Awesome. Các bạn có thể download icon font của nó về và sử dụng bình thường. Thậm chí trên web này còn cho phép import icon font từ library khác. 

![](https://images.viblo.asia/a3d59412-bb10-4c86-ad67-9c4d2f8cb6e4.png)

Ngoài các chức năng bên trên thì nó có thêm 1 chức năng khác là hỗ trợ **convert svg to icon font.**

- B1: Click vào button **Import Icons.**  Đây chính là phần up các file svg lên.

![](https://images.viblo.asia/b1285433-2d00-4660-8c58-ea06a353a118.png) 

Sau khi upload file svg lên, trên web sẽ hiển thị 1 list các icon của bạn *(là phần mình đã khoanh đỏ)*.

![](https://images.viblo.asia/fc4e2767-17ff-4e51-baa4-31d61db4cf67.png)

- B2: Config list icon font. Các bạn có thể sắp xếp, tuỳ biến list icon-font của các bạn bằng cách click vào icon nhỏ ở bên phải màn hình.

![](https://images.viblo.asia/8c6c25ea-6e15-4b4c-9b92-4a10c1f5f5da.png)

- B3: Select các icon mà bạn muốn convert sang icon font. Click vào các icon đó. Sau khi select, các icon được chọn sẽ có border vàng như ảnh dưới đây.

![](https://images.viblo.asia/4d0238d9-e19b-4a79-b807-2d6d12431148.png)

Sau khi select xong thì phần fixed taskbar bên dưới sẽ hiển thị số lượng icon mà các bạn đã chọn: **Selection (6)**

- B4: Click vào tab **Generate Font **

![](https://images.viblo.asia/6e4e80c2-f5ac-442a-9a7f-8aa131a9ecdb.png)

Lúc này sẽ nhảy sang page list icon-font. Các bạn có thể tuỳ ý thay đổi tên và download icon-font về sử dụng. Nó sẽ là 1 gói icon-font như bao library khác.

![](https://images.viblo.asia/42af3d1b-1444-4610-8aaf-ad203a1b23e0.png)

Về cách khai báo icon-font, có lẽ các bạn cũng đã biết rồi nhỉ

```
@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?6z598n');
  src:  url('fonts/icomoon.eot?6z598n#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?6z598n') format('truetype'),
    url('fonts/icomoon.woff?6z598n') format('woff'),
    url('fonts/icomoon.svg?6z598n#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Các bạn có thể tham khảo thêm về sử dụng icon-font trong bài viết này của mình nhé.

https://viblo.asia/p/bai-17-cach-su-dung-icon-font-trong-thiet-ke-web-vyDZOzaPKwj

Như vậy, qua bài viết bày các bạn đã biết thêm 1 phương pháp khá hữu dụng khi sử dụng file svg rồi. Chúc các bạn thành công!

-----