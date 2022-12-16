![](https://images.viblo.asia/3c8bb5af-c0e9-4144-be5d-542fe1ae85e7.png)
# 1. Giới thiệu CamanJS:
- `CamanJS` là thư viện javascript cho phép thực hiện chỉnh sửa ảnh bằng cách gọi duy nhất hàm `Caman()`.

# 2. Cài đặt và cách sử dụng:
## a. Cài đặt:
- Để sử dụng `CamanJS` ta chỉ cần thêm [CDN](https://cdnjs.com/libraries/camanjs) của `CamanJS` vào trong file HTML.

## b. Cách sử dụng.
- Hàm `Caman()` nhận 2 tham số:
1. Tham số thứ nhất: selector của `<image>` hoặc `<canvas>`.
2. Tham số thứ hai: `function()` thực hiện chỉnh sửa ảnh.

- Ví dụ: 
    ```
    Caman('#js-image', function() {
        this.brightness(10);
        this.render();
    });
    ```

- Khi hàm `Caman()` được gọi với tham số thứ nhất là selector của `<image>` thì sau đó `<image>` này sẽ được thay thế bằng `<canvas>` có selector tương ứng.

- Ví dụ: khi `<image id="js-image" src="image.png">` được truyền vào hàm `Caman()` thì `<image id="js-image" src="image.png">` sẽ được thay thế bằng `<canvas id="js-image" data-caman-id="1">` trên `DOM`.

## c. Các hàm chỉnh sửa ảnh:
- `CamanJS` cung cấp 1 số lượng lớn các `function()` chỉnh sửa ảnh.
- Các `function()` như `brightness()`, `contrast()`, `saturation()`, `vibrance()`, `exposure()`, `hue()`, `sepia()`, `gamma()`, `noise()`, `clip()`, `sharpen()`, `stackBlur()` nhận 1 tham số để chỉnh sửa ảnh, tham số này thường nằm trong khoảng từ -100 đến 100.
- Ta có thể gọi 1 `function()` để chỉnh sửa ảnh.
    ```
    Caman('#js-image', function() {
        this.brightness(10);
        this.render();
    });
    ```
- Hoặc kết hợp nhiều `function()` để chỉnh sửa ảnh.
    ```
    Caman('#js-image', function() {
        this.brightness(10);
        this.contrast(10);
        this.render();
    });
    ```
- Trong trường hợp bạn muốn function() trả về ảnh sau khi chỉnh sửa, bạn có thể truyền thêm `function()` vào `render()` như sau: 
    ```
    Caman('#js-image', function() {
        this.brightness(10);
        this.render(function() {
            var base64 = this.save("image.png");
            $('#js-preview-image').attr('src', base64);
            // or something else
        });
    });
    ```
- Ngoài các `function()` trên, `CamanJS` cung cấp các `function()` mặc định chỉnh sửa ảnh không nhận tham số như `greyscale()`, `invert()`, `vintage()`, `lomo()`, `clarity()`, `sinCity()`, `crossProcess()`, `sunsire()`, `crossProcess()`, `orangePeel()`, `love()`, `grungy()`, `jarques()`, `pinhole()`, `oldBoot()`, `glowingSun()`, `hazyDays()`, `nostalgia()`, `hemingway()`, `concontrate()`.
    ```
    Caman('#js-image', function() {
        this.vintage();
        this.render();
    });
    ```

# 3. Demo:
- Github: https://github.com/LeTanThanh/CamanJS
- CamanJS: http://camanjs.com/
- Video: {@youtube: https://www.youtube.com/watch?v=_YViN2jPmyA&feature=youtu.be}