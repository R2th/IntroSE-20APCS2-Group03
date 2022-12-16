**Hi everybody! Sau 1 thời gian khá dài với series các bài viết về các *Tips & Tricks  Javascript* trong quá trình làm việc mà mình tích lũy được, thì cảm thấy mọi thứ khá "bão hòa" và "nhàm chán". Vì vậy, nay mình quyết định trở lại với 1 bài viết "nhẹ nhàng" và "tình cảm" hơn nhiều, vài thứ chia sẻ nho nhỏ về anh chàng HTML thân thiện (đỡ đau đầu :grinning:).**

Chắc hẳn tất cả các Web Developer ai cũng đã từng làm việc với thẻ `video` của HTML5. Tuy nhiên, cũng có 1 số developer mới tìm hiểu và làm việc với HTML5 thì thường chỉ sử dụng 1 số ít tính năng và bỏ qua nhiều thứ hay ho khác. Vì vậy, trong bài viết này mình sẽ tổng hợp tất cả những gì thuộc về thẻ `video`, mời các bạn cùng theo dõi :wink:

![](https://images.viblo.asia/f2c426b4-d50e-4474-9c8c-88418b4fbfac.jpg)

### 1. Bắt đầu
Để bắt đầu sử dụng thẻ `video`, thật sự đơn giản để thêm video trực tiếp vào trang web của bạn.

```html
<video src="video.mp4" controls></video>
```

Trong trường hợp trình duyệt của người dùng không hỗ trợ thẻ `video` HTML5, bạn cần thông báo cho họ biết. Nội dung bên trong thẻ `video` sẽ hoạt động như một phương án dự phòng cho các trình duyệt không hỗ trợ thẻ `video`.

```html
<video src="video.mp4" controls>
  Bữa nay còn dùng IE8 à bro...Hãy tải ngay Chrome để trải nghiệm nhé!
</video>
```

hoặc

```html
<video src="video.mp4" controls>
  <p>
    Bữa nay còn dùng IE8 à bro...Hãy tải ngay Chrome để trải nghiệm nhé!
    Hoặc bro lười tải thì click vào <a href="video.mp4">đây</a> nha! (Dù sao vẫn nên tải Chrome, nhanh thôi mà)
  <p>
</video>
```

![](https://images.viblo.asia/b302306a-f53f-4bb0-84f6-5a1607cc52c2.png)


### 2. Liên kết source video

Có 2 cách để bạn có thể chỉ định nguồn video.

```html
<video src="video.mp4" controls ></video>
```

hoặc

```html
<video controls>
  <source src="video.webm" type="video/webm">
  <source src="video.ogg"  type="video/ogg">
  <source src="video.mp4"  type="video/mp4">
</video >
```

Lợi ích của việc sử dụng `<source>` là bạn có thể thêm các loại video khác nhau vào video của mình. Không phải tất cả các trình duyệt đều hỗ trợ cùng một định dạng video. Vì vậy, bằng cách chuyển nhiều định dạng tệp video, bạn có thể cho phép trình duyệt của mình quyết định video phù hợp.

### 3. Video Attribute
Có rất nhiều attributes đi kèm, trước tiên là 1 số attributes quan trọng và phổ biến như:

*  **`controls`**: thực hiện các tác vụ với video như play, pause và volume.

* **`width`** và **`height`**: set chiều cao và chiều rộng cho video. Nếu chiều cao và chiều rộng không được đặt, trang có thể nhấp nháy trong khi tải video.

* **`<source>`**: cho phép bạn chỉ định các video thay thế mà trình duyệt hỗ trợ. Trình duyệt sẽ sử dụng định dạng được nhận dạng đầu tiên.

* Đoạn text trong thẻ **`<video>Some text</video>`** sẽ chỉ được hiển thị trong các trình duyệt không hỗ trợ <video>.
    
*  **`autoplay`**: tự động start video. Lưu ý: thuộc tính này không hỗ trợ trên các devices mobile như iPhone, iPad.
    
Ngoài ra, còn có rất nhiều attributes khác nữa...

* **`poster`**: thuộc tính này cho phép truyền vào một image URL, hình ảnh này sẽ hiển thị trong khi video đang tải xuống hoặc cho đến khi nhấn play.
    Ví dụ: 
```html
<video poster="image.png"></video>
```
    
* **`preload`**: xác định việc tập tin video có được tải cùng với lúc tải trang hay không.
* **`muted`**: video sẽ mặc định được thiết lập ở chế độ "im lặng".
* **`loop`**: video sẽ tự động được phát lặp lại sau mỗi lần kết thúc.

### 4. Thêm chú thích và phụ đề với `track` tag

Để thêm phụ đề hoặc chú thích cho 1 video, thẻ `track` sẽ đi kèm cùng với video của bạn bằng cách đọc từ 1 file có định dạng `.vtt`, ví dụ:
    
```html
<video controls>
  <source src="video.webm" type="video/webm">
  <source src="video.ogg"  type="video/ogg">
  <source src="video.mp4"  type="video/mp4">
  <track kind="subtitles" src="english-subtitles.vtt" srclang="en" default />
  <track kind="subtitles" src="vietnamese-subtitles.vtt" srclang="vi" />
</video >
```

Xem video ngắn dưới đây để hiểu cách 1 HTML5 video có phụ đề hoạt động như thế nào:

{@embed: https://www.youtube.com/watch?v=CWZJ4_Ifzbk&ab_channel=PcwebschoolMediaEs}
    
Ngoài ra, để tìm hiểu chi tiết hơn về `track` tag, các bạn có thể xem thêm ở [đây](https://www.htmlquick.com/reference/tags/track.html).
    
Trên đây là tất tần tật những gì về HTML5 Video qua kinh nghiệm làm việc và tìm hiểu của mình tích lũy được. Hy vọng sẽ giúp ích được các bạn ít nhiều trong quá trình học tập, làm việc. Xin chào và hẹn gặp lại! :wink: