## 1. Giới thiệu thẻ <picture>

Thẻ `<picture>` cung cấp phương thức để khai báo nguồn ảnh giúp tối ưu việc `load` ảnh cho các kích thước màn hình khác nhau. Các web developer sẽ không còn cần CSS hay thủ thuật JavaScript để tối ưu hình ảnh trong các design responsive. Và nó cũng giúp tối ưu hóa việc tải nguồn ảnh, đặc biệt hữu ích với người dùng có kết nối mạng tầm thấp.

Bên cạnh đó, các thuộc tính `srcset`, `sizes` gần đây mới được thêm vào thẻ `<img>`, `<picture>` cũng giúp web developer linh động hơn trong việc định dạng ảnh. Nó cũng giúp cho các đoạn code `html` trở nên dễ đọc và `clear` hơn. Giờ đây chúng ta chỉ cần viết code html và browser sẽ tự động chọn `nguồn` ảnh tối ưu nhất, nó sẽ cải thiện thời gian tải trang web:

- **Art direction-based selection**: Dù là mobile device với khung màn hình dọc hay 1 màn desktop ngang rộng thì việc tải hình ảnh cũng được tối ưu hóa theo kích thước màn hình.
- **Device-pixel-ratio-based selection**: Nếu như đó là thiết bị có độ phân giải cao thì browser sẽ tải hình ảnh có độ phân giải cao hơn.
- **Viewport-based selection**: Nếu hình ảnh luôn phải `fill` với `viewport` thì tải hình ảnh `thích hợp` với viewport đó
- **Image format-based selection**:  Nếu trình duyệt của bạn hỗ trợ các loại tệp hình ảnh làm tăng hiệu suất (như là kích thước nhỏ hơn) thì ta có thể tải file ảnh thay thế như là [WebP](https://developers.google.com/speed/webp/).

### Sử dụng cho tinh chỉnh giao diện

Ứng dụng phổ biến nhất của thẻ `<picture>`  là **art direction**. Thay vì dùng 1 hình để điều chỉnh lên hay xuống tùy theo chiều rộng của màn hình, ta có thể sử dụng nhiều hình hiển thị tương ứng với mỗi kích thước của màn hình.

![resized-image.png](https://images.viblo.asia/0e86943a-ea64-4270-bb94-c18693c2b4fb.png) |![art-direction.png](https://images.viblo.asia/7cc3e5c1-2cc6-4b7e-9a35-cd2fb63a77af.png)
:----:|:----:
Kết quả của việc sử dụng chỉ một ảnh rồi điều chỉnh scale lên xuống theo chiều rộng màn hình|Sử dụng một vài ảnh khác nhau và cho hiển thị theo mỗi scale của màn hình đương thời.

### Cải thiện hiệu suất tải tài nguyên

Khi sử dụng `<picture>` hoặc `<img> ` với thuộc tính `srcset` và `sizes`, trình duyệt sẽ chỉ tải xuống hình ảnh phù hợp với trạng thái hiện tại của thiết bị. Việc này giúp cho browser có thể tận dụng khả năng lưu trữ và tải trước hình ảnh của trình duyệt.

## 2. Cú pháp

Đoạn HTML và CSS sau đây là tất những gì ta cần làm cho demo:

```HTML
<style>
    img {display: block; margin: 0 auto;}
</style>

<picture>
    <source media="(min-width: 650px)" srcset="images/kitten-stretching.png">
    <source media="(min-width: 465px)" srcset="images/kitten-sitting.png">
    <img src="images/kitten-curled.png" alt="a cute kitten">
</picture>
```

***Note***: Các bạn có thể thấy, ở đây chúng ta không hề sử dụng `javascript` hay thư viện nào cả. Thẻ `<style>` chỉ sử dụng để `style` cho ảnh và không chứa `media queries` nào cả. 

### Sử dụng cùng với thẻ `<source>`
Thẻ `picture` không chứa thuộc tính riêng nào cả. `Điều kì diệu` xảy ra khi chúng ta sử dụng nó như một `container` của các thẻ `<source>`

Trước đây thẻ `<source>` được sử dụng để `load media` như video và âm thanh, sau đó nó đã được cập nhật để tải hình ảnh và thêm một số thuộc tính mới:

- **srcset** (*required*)

    Chứa một đường dẫn tới hình ảnh (e.g. `srcset="kitten.png"`).
    
    Hoặc danh sách các đường dẫn được phân cách bằng dấu phẩy cùng các ký hiệu mật độ pixel (ví dụ: `srcset="kitten.png, kitten@2X.png 2x"` -  ở đây `1x` được ẩn đi, ảnh đầu tiên sẽ tương ứng với `1x`).
    
- **media** (*optional*)

    Chấp nhận bất kì `media query` hợp lệ mà bạn thường dùng trong CSS @media (ví dụ: `media="(max-width:30em)"`).

- **sizes** (*optional*)

    Chấp nhận tham số là một `mô tả`(`descriptor`) về độ rộng (e.g. `sizes="100vw"`) hoặc một `media query` có chứa mô tả về độ rộng (e.g. `sizes="(max-width: 30em) 100vw"`).

    Hoặc một danh sách của các `media query` cùng với `descriptor` về độ rộng (e.g. `sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"`) trong đó mục cuối cùng danh sách được sử dụng làm mặc định.

- **type** (*optional*)
    
    Đầu vào là các kiểu định dạng được hỗ trợ - `MIME type` (e.g. `type="image/webp"` or `type="image/vnd.ms-photo"`).


Trình duyệt sẽ sử dụng các tuỳ chọn được truyền vào dưới dạng các giá trị thuộc tính để tải hình ảnh thích hợp nhất. Thứ tự danh sách các thẻ rất quan trọng! Trình duyệt sẽ sử dụng thẻ `<source>` đầu tiên phù hợp và bỏ qua bất kỳ thẻ `<source>` nào sau thẻ đó.

### Thêm thẻ `<img>` ở cuối cùng

Thẻ `<img>` được sử dụng trong thẻ `<picture>` có tác dụng như một trường hợp dự phòng nếu browser chưa hỗ trợ thẻ `<picture>` hoặc không có một thẻ `<source>` nào phù hợp. Sử dụng thẻ `<img>` bên trong `<picture>` là bắt buộc - nếu bạn quên nó hay không có nó trong thẻ `<picture>` thì sẽ không có hình ảnh nào được hiển thị.

Chúng ta cần đặt thẻ `<img>` ở vị trí cuối cùng trong thẻ `<picture>` vì trình duyệt sẽ bỏ qua bất thẻ `<source>` nào sau khi tìm thấy thẻ `<img>`. Thẻ `<img>` cũng là nơi bạn có thể thêm thuộc tính `alt` cho ảnh.

### Kết hợp với mô tả mật độ điểm ảnh

Chúng ta có thể thêm hỗ trợ cho màn hình có độ phân giải cao bằng cách sử dụng các ký hiệu mật độ pixel như 1x, 1.5x, 2x và 3x. Thuộc tính `srcset` có thể áp dụng cho cả hai thẻ `<img>` và `<source>`.

Ví dụ bên dưới hỗ trợ màn hình độ phân giải 1x, 1.5x và 2x:

```HTML
<picture>
  <source
    media="(min-width: 650px)"
    srcset="images/kitten-stretching.png,
            images/kitten-stretching@1.5x.png 1.5x,
            images/kitten-stretching@2x.png 2x">
  <source
    media="(min-width: 465px)"
    srcset="images/kitten-sitting.png,
            images/kitten-sitting@1.5x.png 1.5x
            images/kitten-sitting@2x.png 2x">
  <img
    src="images/kitten-curled.png"
    srcset="images/kitten-curled@1.5x.png 1.5x,
            images/kitten-curled@2x.png 2x"
    alt="a cute kitten">
</picture>
```

### Kết hợp với mô tả chiều rộng

>"Khi kích thước cuối cùng của hình ảnh không được biết, có thể khó xác định độ phân giải của các hình ảnh. Điều này đặc biệt đúng đối với các hình ảnh có chiều rộng theo tỷ lệ của trình duyệt và tùy thuộc vào kích thước của trình duyệt.
>
> Thay vì cung cấp kích thước và độ phân giải cố định, kích thước của mỗi ảnh được cung cấp có thể được chỉ định bằng cách thêm mô tả về chiều rộng cùng với kích thước của hình ảnh, cho phép trình duyệt tự động tính toán mật độ pixel hiệu quả và chọn hình ảnh tốt nhất để tải xuống."


Dưới đây là ví dụ về việc sử dụng thuộc tính `sizes` để đặt tỷ lệ hình ảnh luôn lấp đầy 80% của `viewport`. Nó được kết hợp với thuộc tính `srcset` để cung cấp bốn tuỳ chọn của cùng một hình ảnh ngọn hải đăng có chiều rộng là `160px`,` 320px`, '640px` và `1280px`:

```HTML
<img src="lighthouse-160.jpg" alt="lighthouse"
     sizes="80vw"
     srcset="lighthouse-160.jpg 160w,
             lighthouse-320.jpg 320w,
             lighthouse-640.jpg 640w,
             lighthouse-1280.jpg 1280w">
```

Trình duyệt sẽ sử dụng các tuỳ chọn này để chọn hình ảnh phù hợp nhất dựa trên độ rộng khung nhìn và độ phân giải màn hình phần cứng:

![lighthouse-example-img.png](https://images.viblo.asia/cd2d1d2f-445d-4765-a39a-c92eb91ca0e9.png)

Ví dụ, khung nhìn bên trái rộng xấp xỉ 800px. Trình duyệt sẽ tải `lighthouse-640.jpg` trừ khi tỷ lệ pixel của thiết bị là 2x — trong trường hợp đó, `lighthouse-1280.jpg` sẽ được tải thay thế.

Như đã nói ở phần trước, thuộc tính `sizes` có thể được áp dụng cho cả hai thẻ `<img>` và `<source>`, chúng ta có thể viết lại đoạn code ở trên như sau:
```HTML
<picture>
  <source media="(min-width: 800px)"
          sizes="80vw"
          srcset="lighthouse-landscape-640.jpg 640w,
                  lighthouse-landscape-1280.jpg 1280w,
                  lighthouse-landscape-2560.jpg 2560w">
  <img src="lighthouse-160.jpg" alt="lighthouse"
       sizes="80vw"
       srcset="lighthouse-160.jpg 160w,
               lighthouse-320.jpg 320w,
               lighthouse-640.jpg 640w,
               lighthouse-1280.jpg 1280w">
</picture>
```

Dựa trên ví dụ trước, khi `viewport` ở 800px trở lên, trình duyệt sẽ sử dụng tuỳ chọn ảnh ngang của ngọn hải đăng thay vì ảnh dọc như ví dụ trên:

![lighthouse-example-picture.png](https://images.viblo.asia/8c075145-67bf-4ba7-9398-d41de9da5180.png)


### Tải các định dạng tệp hình ảnh thay thế

Thuộc tính `type` của `<source>` có thể được sử dụng để tải các định dạng tệp hình ảnh thay thế, có thể không được hỗ trợ trong tất cả các trình duyệt. Ví dụ, bạn có thể sử dụng một hình ảnh ở định dạng WebP cho các trình duyệt hỗ trợ nó, còn nếu browser không hỗ trợ bạn sẽ sử dụng ảnh định dạng JPEG:

```HTML
<picture>
  <source type="image/webp" srcset="images/butterfly.webp">
  <img src="images/butterfly.jpg" alt="a butterfly">
</picture>
```

### Demo

{@codepen: https://codepen.io/nhatanhchan/pen/erWXBG}