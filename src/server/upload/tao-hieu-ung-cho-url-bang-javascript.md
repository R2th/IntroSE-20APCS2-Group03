Bài viết này tham khảo từ bài [Animating URLs with Javascript and Emojis](http://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis) của bạn Matthew Rayfield. Blog của bạn này khá là dị và tất nhiên là ý tưởng trong bài viết này cũng dị không kém.

Trong URL có một thành phần là hash, thường dùng để tự cuộn viewport tới một vị trí nào đó trong page, hoặc dùng trong single page app (SPA). Khi hash thay đổi không dẫn tới việc trình duyệt reload page.

Với đặt tính của hash như vậy, Matthew có ý tưởng là sẽ liên tục thay đổi hash bằng emoji hoặc các ký tự đặt biệt trong bản mã unicode để tạo thành hiệu ứng trên thanh địa chỉ.
![](https://images.viblo.asia/d9ce8a25-f44f-4186-8802-174f6fc9f78b.gif)

## Emoji
Cái thú vị là có khá nhiều emoji thể hiện các trạng thái liên tiếp của một đối tượng nào đó, ví dụ như:

- Mặt trăng: 🌑 🌒 🌓 🌔 🌝 🌖 🌗 🌘
- Trái đất: 🌎🌍🌏
- Đồng hồ: 🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧
- Ổ khóa: 🔒🔓

Hoặc cũng có thể sử dụng các ký tự unicode:

![](https://images.viblo.asia/b639f776-504b-4184-9566-05d8a1392781.png)

## Loop
Giống như cách phim được tạo ra, chúng ta cho các emoji này thay thế nhau trong một khoản delay nhất định sẽ tạo ra hiệu ứng. Ví dụ như:

![](https://images.viblo.asia/8f1b0eca-610a-481c-872f-0fac5078b8e9.gif)

Hoặc các ký tự unicode:
![](https://images.viblo.asia/200c625f-753e-48bd-989f-c2c371cb230c.gif)

## Code
Ý tưởng thì khá độc đáo nhưng cách làm thì khá đơn giản nên cũng không biết phải đặt heading sao cho phù hợp. Bạn có một array các emoji, bạn loop trong array này và set hash cho location.hash.
- Mặt trăng (bạn thử mở console rồi dán đoạn code này vào xem nhé)

```js
const moons = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘'];
let currentIndex = 0;
function loop() {
    location.hash = moons[currentIndex % moons.length];
    currentIndex++;
    if (currentIndex >= moons.length) {
      currentIndex = 0; 
    }
    setTimeout(loop, 100);
}

loop();
```
- Đồng hồ (bạn thử mở console rồi dán đoạn code này vào xem nhé)
```js
var clocks = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
let currentIndex = 0;
function loop() {
    location.hash = clocks[currentIndex % clocks.length];
    currentIndex++;
    if (currentIndex >= clocks.length) {
      currentIndex = 0; 
    }
    setTimeout(loop, 100);
}

loop();
```
- Mặt trăng loading (bạn thử mở console rồi dán đoạn code này vào xem nhé)
```js
var f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'],
        d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        m = 0;

function loop() {
    var s = '', x = 0;

    if (!m) {
        while (d[x] == 4) {
            x ++;
        }

        if (x >= d.length) m = 1;
        else {
            d[x] ++;
        }
    }
    else {
        while (d[x] == 0) {
            x ++;
        }

        if (x >= d.length) m = 0;
        else {
            d[x] ++;

            if (d[x] == 8) d[x] = 0;
        }
    }

    d.forEach(function (n) {
        s += f[n];
    });

    location.hash = s;

    setTimeout(loop, 50);
}

loop();
```
## Lời kết
Ngoài ra còn nhiều hiệu ứng khác thú vị hơn. Đặt biệt là ứng dụng hiển thị thanh playback của video.

![](https://images.viblo.asia/4823aede-a439-4252-91e3-4e5120966891.gif)

Bạn có thể xem thêm các ý tưởng rất thú vị này tại chính blog của Matthew: [Animating URLs with Javascript and Emojis](http://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis)

Dù các hiệu ứng này thú vị và mới lạ, nhưng tính thực tế có lẽ không cao, vì nếu URL dài hoặc kích thước màn hình nhỏ thì thanh địa chỉ không thể được nhìn thấy, trên nhiều browser và trên mobile thì thanh address này còn bị ẩn đi. Cuối năm rồi, chúc các bạn có một cái Tết ấm no, hẹn gặp lại!