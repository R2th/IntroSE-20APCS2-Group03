![](https://media.giphy.com/media/NvCgbZWGtcCLP9FZ0o/giphy.gif)

Có bao giờ bạn thắc mắc rằng liệu có khó để tạo ra các bố cục độc đáo, tương tự như phần "ảnh bìa" ở trang cá nhân Facebook, Twitter hay không? Câu trả lời là không hề khó chút nào, với một chút kiến thức căn bản về HTML, CSS và nhất là sau khi đọc xong bài viết này!

# Điều kiện cần
Những điều cần biết trước khi đọc bài viết này:
- Một chút kiến thức về HTML và CSS cơ bản
- Tìm hiểu sơ qua trước về [TailwindCSS](https://tailwindcss.com/)
- Một con mắt thẩm mĩ, cẩn thận, tỉ mỉ

# Tiến hành
## Bước 1: Mock vài nội dung cơ bản
Không có gì quá đặc biệt ở bước này. Mình đơn giản chỉ tạo một container giới hạn độ rộng tối đa là màn hình xl (bằng `max-w-screen-xl`) và căn nó ra giữa trang bằng trick `margin: 0 auto`. 

Thêm nữa, container được làm đẹp bằng vài style màu sắc nhẹ cùng bo tròn (với `rounded-lg`) và đổ bóng (với `shadow-lg`).

```html
<main class="mx-auto max-w-screen-xl my-12">
  <div class="mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="font-mock px-5 py-8 text-gray-500 leading-none">
      <p class="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, sequi. Debitis, odio dolorem? Doloremque, impedit. Ratione aliquam dolor quidem, quod adipisci distinctio aperiam doloremque eveniet. Aliquam voluptatibus atque sunt id.</p>

      <p class="mb-5">Architecto aliquid deleniti doloribus ut possimus ipsum excepturi laboriosam nobis laudantium quibusdam est velit, nesciunt rerum deserunt. Commodi voluptatibus sed ipsum, sapiente voluptatem voluptates aut dolor itaque aspernatur totam tempore.</p>

      <p class="mb-5">Tempora dolore fugit mollitia iste assumenda placeat molestiae, dolorem expedita fugiat. Delectus a consequuntur corporis molestias, impedit blanditiis tempora, nostrum quo magni assumenda dicta, optio laboriosam minima eum ratione quasi?</p>

      <p>Suscipit dicta asperiores magnam deserunt eveniet alias nostrum itaque voluptas! Fugiat, consequuntur incidunt ipsum, quasi voluptates quaerat alias in quae, labore corporis vero tempore natus debitis accusamus cupiditate fuga odio.</p>
    </div>
  </div>
</main>
```

![Tạo bố cục ban đầu](https://images.viblo.asia/a99ce45b-150a-4048-8962-51b0188705f3.png)

## Bước 2: Bổ sung ảnh bìa vào trang web

Sau đó, mình sẽ đặt trước một cái "ảnh bìa" vào vào trước phần đoạn văn. Ảnh bìa của Facebook thường có kích thước là 820x312 pixel. Trước mắt, mình sẽ sử dụng một phần tử `<canvas>` để tạm làm phần tử thay thế cho bức ảnh thật.

```html
<main class="mx-auto max-w-screen-xl my-12">
  <canvas class="w-full bg-gray-300" width="820" height="312"></canvas>
  ...
```

Đến bước này, chúng ta đã có kết quả như sau:

![Bổ sung ảnh bìa facebook vào bố cục ban đầu](https://images.viblo.asia/9d08aff3-ab2a-4024-b870-b50b58dbc09a.png)

## Bước 2: Ảnh bìa đi kèm hình đại diện
Giờ chúng ta đã đặt được ảnh bìa vào trong bố cục trang, bước tiếp theo bây giờ là đặt một cái avatar của bạn vào.

Ở trang cá nhân Facebook, hình đại diện được đính vào cùng với ảnh bìa ở phía góc dưới bên trái của ảnh bìa. Để đạt được điều này, thuộc tính `position` của CSS là công cụ chính xác dùng cho trường hợp này.

```html
<main class="mx-auto max-w-screen-xl my-12">
  <div class="relative">
    <canvas class="w-full bg-gray-300" width="940" height="352"></canvas>
    <canvas class="absolute bottom-0 left-0 bg-gray-400 z-10"  width="820" height="312"></canvas>
  </div>
  <div class="mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
    ...
```

Kết quả là sẽ như hình dưới:

![](https://images.viblo.asia/f1da61c1-0d76-4a8c-b113-599293f6c4cb.png)

## Bước 3: Căn chỉnh vị trí của ảnh đại diện

Tuy giờ ảnh đại diện đã được nằm ở góc phía dưới bên trái so với ảnh bìa, nhưng cũng chưa thực sự đúng kỳ vọng của mình lắm: ảnh đại diện nên nằm cách xa ra một chút thay vì vừa vặn so với phần biên của ảnh bìa.

Có rất nhiều cách để định nghĩa thêm khoảng cách của ảnh đại diện, như sử dụng các thuộc tính CSS định vị vị trí (tức `top`, `left`, `bottom`, `right`), hay sử dụng thuộc tính `margin` và `padding`. Ở đây, mình sẽ chọn sử dụng thuộc tính `transform` và `translate` như sau:

```html
...
<div class="relative">
  <canvas class="w-full bg-gray-300" width="940" height="352"></canvas>

  <div class="absolute bottom-0 left-0 z-10 transform translate-y-3/4 translate-x-1/2">
    <canvas class="bg-gray-400" width="160" height="160"></canvas>
  </div>
...
```

Kết quả sau khi sử dụng thêm `translate` sẽ trông như sau:

![Vị trí phần tử avatar](https://images.viblo.asia/960536a9-7003-4a9b-8c06-bfd32048fc4f.png)

Bằng việc sử dụng `absolute` position kết hợp với thuộc tính vị trí cùng `transform` và `translate`, giờ mình có thể dễ dàng tùy chỉnh vị trí của phần tử ảnh đại diện như mong muốn.

Nhưng có một vấn đề mới: phần tử ảnh đại diện bị đẩy ra ngoài sẽ làm che khuất nội dung của đoạn nội dung phía dưới. Trong lúc xử lý vấn đề này, mình cũng sẽ tạo luôn một mục để chứa thông tin ngay dưới phần ảnh bìa và ảnh đại diện.

## Bước 4: Mục chứa thông tin (họ tên, giới thiệu,...)

Phần chứa thông tin này sẽ được nằm ngay dưới ảnh bìa, nhưng cần được bố cục sao cho "tránh" được phần ảnh đại diện bị đẩy xuống phía dưới.

Để ý lại thì lúc trước mình có sử dụng translate là `translate-y-3/4` và `translate-x-1/2`. Vậy phần tử thông tin này được tạo cần phải đảm bảo:
- Chiều cao tối thiểu là **3/4 chiều cao** của avatar (tức **120 pixel**)
- Nội dung nằm cách lề trái tối thiểu là **3/2 chiều dài** của avatar (tức **240 pixel**)

Biết được các thông tin trên, mình có thể thêm phần tử mới đó như sau:

```html
<main class="mx-auto max-w-screen-xl my-12">
  <div class="mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="relative">
      <canvas class="w-full bg-gray-300" width="940" height="352"></canvas>

      <div class="absolute bottom-0 left-0 z-10 transform translate-y-3/4 translate-x-1/2">
        <canvas class="bg-gray-400" width="160" height="160"></canvas>
      </div>
    </div>
    
    <div class="bg-gray-100 pl-[240px] min-h-[120px]">
      <div class="p-4">
        <h1 class="font-mock text-2xl text-gray-700 mb-4">
          nunc id cursus metus
        </h1>
        
        <h2 class="font-mock text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu ultrices vitae auctor eu augue ut lectus.
        </h2>
      </div>
    </div>
```

![Bố cục trang cá nhân facebook](https://images.viblo.asia/d6e74516-11d4-4a78-9232-18734a2db38b.png)

## Bước 5: Responsive cho thiết bị điện thoại

![Bố cục responsive cho điện thoại](https://images.viblo.asia/de58b92d-f017-4178-a310-b88600abd091.png)

Khi trang cá nhân Facebook hiển thị trên điện thoại, ảnh avatar thường được căn giữa, đồng thời không có các khoảng cách lề trái ở phần tử chứa thông tin (họ tên, giới thiệu) như ở phiên bản màn hình rộng.

Khi chưa có thay đổi gì, trang web chúng ta vừa làm hiển thị trên điện thoại sẽ trông "ngu ngu" như sau:

![Bố cục trang khi chưa thực hiện responsive](https://images.viblo.asia/b54301b2-f164-4e8e-892e-2e94df1002e5.png)

Với TailwindCSS, việc thực hiện responsive cho trang Web vô cùng đơn giản qua các prefix `sm`, `md`, `lg`,... Để tiến hành căn giữa phần tử avatar chỉ ở trên màn hình điện thoại, chúng ta sẽ chỉnh sửa lại phần tử avatar như sau:

```html
<div class="w-full absolute bottom-0 left-0 z-10 transform translate-y-3/4 lg:w-auto lg:translate-x-1/2 flex justify-center">
  <canvas class="bg-gray-400" width="160" height="160"></canvas>
</div>
```

Sau đó phần đoạn văn cũng cần sửa lại tương ứng để thực hiện tránh khu vực phần tử avatar bị đẩy lùi ra ngoài:

```html
<div class="bg-gray-100 pt-[120px] lg:pt-0 lg:pl-[240px] min-h-[120px]">
  <div class="p-4 text-center lg:text-left">
    <h1 class="font-mock text-2xl text-gray-700 mb-4">
      nunc id cursus metus
    </h1>

    <h2 class="font-mock text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu ultrices vitae auctor eu augue ut lectus.
    </h2>
  </div>
</div>
```

# Thành quả
![](https://media.giphy.com/media/NvCgbZWGtcCLP9FZ0o/giphy.gif)

Như vậy, nhờ sự trợ giúp của TailwindCSS, chúng ta đã hoàn thành được một dạng layout tương đối phức tạp mà **không cần phải động đến viết lấy một dòng CSS**!

Bạn có thể xem demo của toàn bộ ví dụ ở đây:

https://play.tailwindcss.com/3c2UJXq8bR

Ngoài ra, bạn có thể tìm hiểu thêm về TailwindCSS tại [tailwindcss.com](https://tailwindcss.com/). TailwindCSS là một atomic CSS framework, giúp bạn có thể tự do dựng một giao diện "độc nhất vô nhị" mà vẫn dễ dàng, nhanh chóng. TailwindCSS đối nghịch hoàn toàn với các CSS framework truyền thống khác như Bootstrap, vốn áp buộc style của thiết kế của bạn theo các element có sẵn và khó tùy biến theo ý muốn.