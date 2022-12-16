# 1. StickerJS:
- `StickerJS` là thư viện Javscript cho phép tạo Sticker Effect mà không cần phụ thuộc vào jQuery hay thư viện nào khác.

- Để sử dụng `StickerJS` ta chỉ cần thêm file [sticker.min.js](https://github.com/cmiscm/stickerjs/blob/master/sticker.min.js) vào file html.

- Để tạo Sticker Effect cho element, ta chỉ việc gọi hàm `Sticker()` với tham số tryền vào là element đó.
    ```
    Sticker('.sticker')
    ```

- Khi đó `StickerJS` sẽ tạo ra các element `<div class="sticker-img">` và `<dov class="sticker-shadow">`, ta cần thêm css cho các element này để tạo Sticker Effect mà ta mong muốn.
    ```
    // sticker width image
    .sticker-img {
      background-image: url("image.png");
      background-color: red;
    }
    
    // sticker with color
    .sticker-img {
      background-color: red;
    }
    
    // shadow 
    .sticker-shadow {
      opacity: 0.6;
    }
    ```

- Link tham khảo: https://github.com/cmiscm/stickerjs

- Source code demo: https://github.com/LeTanThanh/StickerJS

    ![](https://images.viblo.asia/2ad079c6-227e-4fa9-839a-0318a466e027.png)

# 2.Intense Image JS:
- `IntenseImage` là thư viện Javascript độc lập cho phép hiển thị ảnh trên toàn bộ màn hình khi click vào ảnh.

- Để sử dụng `IntenseImage` ta chỉ cần thêm file [intense.js](https://github.com/tholman/intense-images/blob/master/intense.js) vào file html.

- Gọị function `Intense()` và truyền vào các element cần hiển thị ảnh trên toàn màn hình khi click vào
    ```
    window.onload = function() {
      var elements = document.querySelectorAll('.intense-image');
      Intense(elements);
    }
    ```

- Các element đó có thể là `<img>`
    ```
    <img src="images/h1_small.jpg" class="intense-image" >
    ```

- Hoặc là các loại element khác, sử dụng `data-image` để  chỉ định hình ảnh được hiển thị khi click vào.
    ```
    <div class="intense-image" data-image="images/h1_small.jpg">
    ```
    
- Có thể sử dụng thêm `data-title` và `data-caption` để chỉ định title và caption khi ảnh được hiển thị toàn màn hình.
    ```
    <img src="images/h1_small.jpg" class="intense-image"
       data-title="Beautiful fields"
       data-caption="With lots of wheaty puffs. Love those puffs.">
    ```


- Link tham khảo: https://github.com/tholman/intense-images

- Source code demo: https://github.com/LeTanThanh/Intense-Images

    ![](https://images.viblo.asia/366eb5aa-d748-4edc-adb6-0bbc4ffa48e1.png)
    
# 3. TwentyTwenty:
- `TwentyTwenty` là thư viện Javascript cho phép tạo hiệu ứng so sánh giữa 2 ảnh cho trước.

- `TwentyTwenty` được sử dụng đi kèm với [jquery.event.move](https://github.com/stephband/jquery.event.move).

- Để sử dụng `TwentyTwenty` ta cần thêm file [jquery.event.move.js ](https://github.com/stephband/jquery.event.move/blob/master/js/jquery.event.move.js) và [jquery.twentytwenty.js](https://github.com/zurb/twentytwenty/blob/master/js/jquery.twentytwenty.js) vào file html.

- Gọi function `twentytwenty()` cho element chưa 2 ảnh cần so sánh.
    ```
    $('.twentytwenty-container').twentytwenty();
    ```
    
- Element được gọi hàm `twentytwenty()` là 1 container chứa 2 ảnh cần so sánh có cấu trúc như sau:
    ```
    <div class="twentytwenty-container">
        <img src="images/before.jpg" />
        <img src="images/after.jpg" />
      </div>
    ```

- Ta có thể truyền thêm các tham số vào function `twentytwenty()`:

| Property | Type | Description | 
| -------- | ---- | ----------- |
| default_offset_pct | decimal | Phần ảnh before hiển thị bao nhiêu khi load trang |
| orientation |  string (`horizontal` hoặc `vertical`) | Hướng hiển thị của ảnh before và after (theo chiều ngang hoặc chiều dọc ) |
| before_label | string | Nội dung labe đi kèm với ảnh before |
| after_label | string | Nội dung labe đi kèm với ảnh after |
| no_overlay | boolean | có show overlay hay không |
| move_slider_on_hover | boolean | có thực hiện di chuyển slider khi hover chuột hay không |
| move_with_handle_only | boolean | thực hiện di chuyển slider chỉ khi kéo thả chuột thôi phải không |
| click_to_move | boolean | có thực hiện di chuyển slider khi click chuột hay không |

- Link tham khảo: https://github.com/zurb/twentytwenty

- Source code demo: https://github.com/LeTanThanh/TwentyTwenty

    ![](https://images.viblo.asia/ab7411bf-c40c-448e-94ad-663e8b3badf6.png)