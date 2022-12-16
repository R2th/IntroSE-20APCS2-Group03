Đôi lúc ghé thăm những trang landing page ở những web phổ biến, có bao giờ bạn bắt gặp phần dải phân cách giữa các section thay vì đường kẻ ngang đơn giản, thì lại là một **đường cong "lượn sóng"** mượt mà? Bạn có thắc mắc họ đã làm thế nào, và làm sao để đem những chi tiết độc đáo đó **vào landing page của chính bạn**, để làm **tăng thêm vẻ mềm mại và tự nhiên** cho landing page của bạn?

![](https://images.viblo.asia/fa222c2a-240d-4f1b-9798-b46df3b7afd6.jpg)

Có rất nhiều cách để làm ra dải phân cách kể trên, nhưng trong bài này mình xin hướng dẫn một cách đơn giản và nhanh gọn với **công cụ Haikei** miễn phí.

# Chuẩn bị

Để thuận tiện cho việc hướng dẫn trong bài, mình có chuẩn bị nhanh trước cho bạn một trang landing page đơn giản ban đầu để thực hành với **Tailwind CSS 3** như sau:

![](https://images.viblo.asia/dcd435ff-2c73-4889-9e31-8d4ce00fc9f3.png)

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Untitled</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <header class="h-[80vh] bg-blue-600 flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden">
      <div class="p-8 flex-0">
      <div class="bg-blue-200 h-10 w-[18rem] mb-4"></div>

      <div class="bg-blue-300 h-5 w-[20rem] mb-1"></div>
      <div class="bg-blue-300 h-5 w-[24rem] mb-1"></div>
      <div class="bg-blue-300 h-5 w-[14rem]"></div>
      </div>

      <div class="hidden md:block h-[80%] flex-0">
        <div class="translate-x-6 rounded-lg w-[800px] h-full bg-blue-700 flex flex-col overflow-hidden shadow-lg shadow-blue-900/30">
          <div class="w-full h-8 bg-blue-800 flex gap-1 items-center p-3">
            <div class="rounded-full h-4 w-4 bg-blue-300"></div>
            <div class="rounded-full h-4 w-4 bg-blue-300"></div>
            <div class="rounded-full h-4 w-4 bg-blue-300"></div>
          </div>
        </div>
      </div>
    </header>

    <section class="min-h-[80vh] bg-white flex flex-col lg:flex-row gap-4 justify-between items-center py-16 max-w-screen-lg mx-auto overflow-hidden">
      <div class="flex flex-col items-center">
        <div class="rounded-lg w-36 h-36 bg-gray-200 mb-3"></div>
        <div class="w-[16rem] h-5 bg-gray-100 mb-1"></div>
        <div class="w-[13rem] h-5 bg-gray-100"></div>
      </div>

      <div class="flex flex-col items-center">
        <div class="rounded-lg w-36 h-36 bg-gray-200 mb-3"></div>
        <div class="w-[16rem] h-5 bg-gray-100 mb-1"></div>
        <div class="w-[13rem] h-5 bg-gray-100"></div>
      </div>

      <div class="flex flex-col items-center">
        <div class="rounded-lg w-36 h-36 bg-gray-200 mb-3"></div>
        <div class="w-[16rem] h-5 bg-gray-100 mb-1"></div>
        <div class="w-[13rem] h-5 bg-gray-100"></div>
      </div>
    </section>

    <section class="min-h-[80vh] bg-yellow-200 flex flex-col items-center justify-center py-16">
      <div class="bg-yellow-400 h-8 w-[18rem] mb-8"></div>

      <div class="bg-yellow-300 h-5 w-[27rem] mb-1"></div>
      <div class="bg-yellow-300 h-5 w-[27rem] mb-1"></div>
      <div class="bg-yellow-300 h-5 w-[27rem] mb-1"></div>
      <div class="bg-yellow-300 h-5 w-[27rem] mb-1"></div>
      <div class="bg-yellow-300 h-5 w-[27rem] mb-1"></div>
      <div class="bg-yellow-300 h-5 w-[20rem] mb-1"></div>
    </section>

    <footer class="bg-gray-800 min-h-[10vh] py-16 flex flex-col items-center justify-center">
      <div class="bg-gray-600 h-5 w-[10rem]"></div>
    </footer>
  </body>
</html>
```

{@embed: https://codepen.io/tranxuanthang/pen/qBPRJvb}

# Tiến hành

## Tạo hình lượn sóng

### Hình 1

Truy cập vào địa chỉ [app.haikei.app](https://app.haikei.app/), sau đó chọn vào công cụ **Wave**:

![](https://images.viblo.asia/9dbdb16a-ad94-48af-be7f-2f3ee95848b7.jpg)

Chỉnh kích thước của hình thành **2500x150** pixel:
![](https://images.viblo.asia/8da48a75-868d-4923-b373-71f17cefac7d.jpg)

Đổi màu sắc lại cho tương ứng với màu nền của 2 section nối tiếp nhau. Ở ví dụ landing page của mình, nền phía trên có mã màu là **#2563eb**, màu nền phía bên dưới là **#ffffff**.
![](https://images.viblo.asia/f273a66c-29e8-48f3-956a-04131e71d28b.jpg)

Tùy chỉnh các lựa chọn sao cho vừa với ý muốn của bạn, sau đó lưu lại hình dưới dạng **SVG**:
![](https://images.viblo.asia/32f9d54a-7195-4222-8f1f-d3acee197e70.jpg)

### Hình 2

Sau đó đến đường để nối tiếp giữa 2 section phía dưới. Nền phía trên có mã màu **#ffffff**, còn nền phía dưới là **#fef08a**. Bạn có thể sinh ngẫu nhiên lại hình một vài lần cho đến khi vừa ý và lưu lại hình khi đã xong.

![](https://images.viblo.asia/f709e4d1-6788-4300-beb0-c25e1dd60ae7.jpg)

### Hình 3

Tương tự với 2 hình đầu:

![](https://images.viblo.asia/05bda33b-2b76-4f36-b81e-e30ae3c0fcd7.jpg)


### Tại sao lại là 2500x150 pixel?

Không phải là tạo hình SVG có chiều rộng lên đến 2500 pixel sẽ quá thừa với nhiều thiết bị và sẽ tốn nhiều dung lượng, làm chậm web hơn? Mình xin được bao biện cho hành động này bằng 3 ý:
- Hầu hết người dùng hiện nay có chiều rộng màn hình **không nhiều hơn** 2500 pixel
- Vì là **hình dạng vector** (SVG) nên 2500 pixel không phải là vấn đề quá lớn. Thực chất, các hình bạn tạo ra theo các bước trên đều **không quá 2KB dung lượng**.
- Nếu để hình SVG có chiều rộng bé hơn, bạn có thể sẽ phải stretch hình để vừa với chiều ngang của viewport của trình duyệt. Tuy nhiên, nhiều trình duyệt **không stretch được một cách hoàn hảo** hình SVG và để lại đường kẻ khác màu, làm giảm thẩm mỹ của thành quả của chúng ta.

## Tiến hành thêm vào landing page

Trước tiên, bạn cần đổi tên các hình đã được tải ở bước trước và bỏ nó vào thư mục của project ở đường dẫn theo ý muốn.

Đoạn code để thêm vào landing page chỉ đơn giản như sau:

```html
<!-- header -->
<div class="overflow-hidden">
  <img class="max-w-none" src="./1.wave-haikei.svg" width="2500" height="150" alt="">
</div>
<!-- section 1 -->
<div class="overflow-hidden">
  <img class="max-w-none" src="./2.wave-haikei.svg" width="2500" height="150" alt="">
</div>
<!-- section 2 -->
<div class="overflow-hidden">
  <img class="max-w-none" src="./3.wave-haikei.svg" width="2500" height="150" alt="">
</div>
<!-- footer -->
```

CSS `overflow: hidden` giúp ẩn đi phần hình bị thừa mà không tạo ra thêm thanh scrollbar (vì hình chúng ta tạo có width dài đến 2500 pixel!), còn `max-width: none` giúp hình svg có thể rộng đúng với chiều rộng gốc của nó.

## Thành quả cuối cùng

Kết quả cuối cùng của chúng ta sẽ trông như hình phía dưới:

![](https://images.viblo.asia/ce8307de-5382-456b-8e6e-84ca70435a3d.png)

Hoặc bạn có thể xem demo tại [tranxuanthang.gitlab.io/landing-demo](https://tranxuanthang.gitlab.io/landing-demo/).

## Còn gì khác không?

Không chỉ cho tạo hình dạng lượn sóng (wave), Haikei còn cung cấp **khả năng generate** ra nhiều dạng hình khác như nền với màu mờ (blur), các hình thù dị dạng (blob),... Tất cả đều được **sinh ra ngẫu nhiên**, tức hoàn toàn không đụng hàng với bất cứ ai khác! Bằng cách khôn khéo tận dụng nó, bạn có thể giúp landing page mà bạn đang phát triển có giao diện trông đẹp và tự nhiên hơn rất nhiều. Nếu bạn biết các giải pháp hay khác hoặc công cụ hữu ích khác thì hãy cho mình và mọi người cùng biết ở phần bình luận nhé.