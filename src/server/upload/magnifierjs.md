![](https://images.viblo.asia/d4cd85c7-9272-45cf-9700-559f0f926a92.png)

# 1. Giới thiệu MagnifierJS:
- `MagnifierJS` là thư viện Javscript cho phép tạo Glass Effect cho ảnh.

- Các chức năng chính của `MagnifierJS`:
    1. Zoom in, zoom out ảnh khi hover.
    2. Cài đặt các option sử dụng javascript function hoặc html data-attribute.
    3. Tạo hiệu ứng cho nhiều ảnh chỉ với 1 lần gọi hàm.
    4. Ảnh được zoom có thể được thể hiện bên trong bức ảnh đó hoặc bên ngoài bức ảnh (bên trong 1 wrapper khác).
    5. Tạo các event ứng với các thao tác với ảnh.
    6. Hiển thị text khi ảnh đang được load và hiển thị Glass Effect sau khi ảnh được load xong.

- `Magnifier` được sử dụng kèm với [EventJS](https://github.com/mark-rolich/Event.js).

# 2. Cài đặt và sử dụng:
## a. HTML:
- Để sử dụng `MagnifierJS` ta cần thêm file [event.js](https://github.com/mark-rolich/Event.js/blob/master/Event.js), [magnifier.css](https://github.com/mark-rolich/Magnifier.js/blob/master/magnifier.css) và [magnifier.js](https://github.com/mark-rolich/Magnifier.js/blob/master/Magnifier.js) vào file html.

- Để sử dụng `MagnifierJS`, ta cần tạo html có cấu trúc như sau:
    1. Tạo element class `.magnifier-thumb-wrapper` chứa `<img>`, `<img>` này chính là ảnh cần tạo hiệu ứng.
        ```
        <span class="magnifier-thumb-wrapper">
            <img id="js-thumb" src="images/original_image.png">
        </span>
        ```
    3. Tạo element class `.magnifier-preview`, đây là element chứa hình preview khi zoom ảnh.
        ```
        <div class="magnifier-preview" id="js-preview">
        </div>
        ```

## b. Sử dụng JS function(): 
- Sau khi đã tạo html, ta thực hiện các bước sau:
    1. Tạo `Event` object.
        ```
        var event = new Event();
        ```
    3. Tạo `Magnifier` với `Event` object vừa được tạo.
        ```
        var magnifier = new Magnifier(event);
        ```
    5. Sử dụng `Magnifier` object vừa được tạo, gọi function `attach()` và truyền các `option` cần thiết.
        ```
        magnifier.attach({
          thumb: '#js-thumb',
          large: 'images/large_image.jpg',
          largeWrapper: 'js-large-wrapper'
        });
        ```
        
## c. Sử dụng HTML data-attribute:
- Các `option` trong function `attach()` có thể thay thế bằng các html `data-attribute` tương ứng và viết lại như sau.

- HTML:
    ```
   <span class="magnifier-thumb-wrapper">
      <img id="js-thumb" src="images/original_image.jpg"
          data-large-img-url="images/large_image.jpg"
          data-large-img-wrapper="js-large-wrappe">
   </span>

   <div class="magnifier-preview" id="js-large-wrapper">
   </div>   
   ```

- JS:
    ```
    var event = new Event();
    var magnifier = new Magnifier(event);

   magnifier.attach({
      thumb: '#js-thumb'
   });
   ```

## c. Các option của function attach():
- Các `option` của function `attach()`:

| Property | Data attribute | Type | Description | Required | Default |
| -------- | -------------- | ---- | ----------- | -------- | ------- |
| thumb || string | ID hoặc class của image, bắt đầu với `.` hoặc `#` | yes ||
| large | data-large-img-url | string | URL của preview image, thường lớn hơn thump image  | yes |  |
| largeWrapper | data-large-img-wrapper | string | ID của the element mà large image được chứa bên trong nó	| yes (nếu mode là `outside`) ||
| zoom | data-zoom | int | zoom level, zoom mang giá trị bao nhiêu thì class `.magnifier-lens` có kích thước (width, height) nhỏ hơn bấy nhiêu lần so với ảnh gốc | no | 2 |
| mode | data-mode | string | `inside` hoặc `outside`, quy định hình preview được show bên trong hay bên ngoài class `.magnifier-lens` | no | `outside` |
| zoomable | data-zoomable | bool | Enable hoặc disable chức năng zoom khi lăn chuột | no | false |
| onthumbenter || callback | function được gọi khi di chuyển chuột vào trong image | no ||
| onthumbmove || callback | function được gọi khi di chuyển chuột bên trong image | no ||
| onthumbleave || callback | function được gọi khi di chuyển chuột ra ngoài image | no ||
| onzoom || callback | function được gọi thực hiện zoom | no ||

## d. Các callback():
- Các `callback()` nhận 1 tham số được cũng có thể được truyền vào function `attach()` như 1 `option`.

- Tùy vào loại `callback()` được gọi mà tham số truyền vào có thể truy cập các thuộc tính khác nhau

- Các thuộc tính `thumb`, `lens`, `large`, `x`, `y` cho tất cả các `callback()`.

- Các thuộc tính `zoom`, `w`, `h` cho `onzoom()`.
    ```
    var event = new Event();
    var magnifier = new Magnifier(event);

    magnifier.attach({
       thumb: '#js-thumb-options',
       large: 'images/large_image.jpg',
       largeWrapper: 'js-large-wrapper-options',
       zoomable: true,
       onthumbenter: function(event) {
          console.log('\n onthumbenter ...');
       },
       onthumbmove: function(event) {
          console.log('\n onthumbmove ...');
       },
       onthumbleave: function(event) {
          console.log('\n onthumbleave ...');
       },
       onzoom: function(event) {
          console.log('\n onzoom ...');

          // all callback can access properties below
          console.log('thum: ', event.thumb);
          console.log('lens: ', event.lens);
          console.log('large: ', event.large);
          console.log('x: ', event.x);
          console.log('y: ', event.y);

          // only onzoom callback can access properties below
          console.log('zoom: ', event.zoom);
          console.log('w: ', event.w);
          console.log('h: ', event.h);
       }
    });
    ```

- Các thuộc tính được truy cập trong `callback()`:
    | Property | Description |
    | --- | ---|
    | thumb | thumbnail DOM element |
    | lens | lens DOM element |
    | large | large image DOM element |
    | x | tọa độ x của chuột |
    | y | tọa độ y của chuột |
    | zoom | zoom level |
    | w | chiều rộng cùa lens |
    | h | chiều cao của lens |

# 3. Tham khảo:
- Link tham khảo: https://github.com/mark-rolich/Magnifier.js

- Source code demo: https://github.com/LeTanThanh/MagnifierJS