![Comparing size between gif, mp4 and webm format](https://images.viblo.asia/d793dde0-d5cd-45da-a887-d3cbf38c4fd1.png)

# Vấn đề của GIF
Chắc đã rất quen thuộc với nhiều người, GIF là định dạng file dành cho ảnh động. Các file ảnh có định dạng GIF trông giống như được gộp từ nhiều bức ảnh khác nhau chuyển động qua lại, và có thể **lặp lại vô hạn**. GIF giống như các đoạn video ngắn, nhưng khác với video, nó có thể dễ dàng chia sẻ lên bất cứ đâu có hỗ trợ chèn ảnh như khi trò chuyện trên các diễn đàn hay comment vào blog. Nó hoàn toàn **tự động phát** và lặp đi lặp lại mà hoàn toàn không yêu cầu nhấn vào nút play nào cả. Và cuối cùng là GIF cũng **hỗ trợ tới cả những trình duyệt tối cổ nhất** như Internet Explorer 6 hay các điện thoại nút bấm Nokia cổ xưa...

Có lẽ nhờ những ưu điểm trên mà định dạng GIF vượt trội và phổ biến hẳn so với các định dạng video, vốn từng không hỗ trợ chơi trên điện thoại, khó khăn trong việc autoplay hay loop, lại cần phải cài đặt thêm Adobe Flash nữa. Người ta dùng GIF để tạo hướng dẫn ngắn mà dễ hiểu về cách sử dụng máy tính, quay lại các khoảnh khắc highlight khi họ chơi video game, những cảnh đáng nhớ trong một bộ phim, hay phổ biến hơn cả là **chia sẻ các các ảnh GIF "reaction" hay "meme"** hài hước.

Thế nhưng một vấn đề lớn của GIF: **định dạng GIF có dung lượng không lớn, mà là *khổng lồ***. Một tệp GIF chỉ dài chưa đến 1 phút nhưng có thể nặng đến 30-50MB. Điều này không chỉ khiến người dùng với Internet băng thông thấp khó xem được GIF, mà còn khiến server của các website cho lưu và chia sẻ GIF phải chịu một lượng băng thông cực lớn. Vậy các trang Web cho upload, chia sẻ ảnh GIF lớn nhất hiện nay như **Gfycat**, **Giphy** hay **Imgur** đã sử dụng giải pháp gì để vẫn có thể cho người dùng thoải mái **sử dụng dịch vụ miễn phí?**

# Giải pháp
Chúng ta chỉ việc **chuyển định dạng GIF về một file video** với định dạng MP4 hay WEBM! Khác với định dạng GIF đã hơn 3 chục năm tuổi, các định dạng video có đầy những lợi ích như: cho khả năng nén tốt hơn dẫn đến **dung lượng nhỏ tí hon**, chưa kể còn hỗ trợ hàng triệu màu sắc, hỗ trợ 60+ FPS cũng như tăng tốc bằng phần cứng nếu phần cứng có hỗ trợ.

{@embed: https://vimeo.com/479861055}

Ví dụ với một hình GIF ở trên với **dung lượng ảnh tận 40,5MB**! Sau khi chuyển về định dạng MP4 và WEBM thì dung lượng file lần lượt là **5,5MB** và **1MB**. Như vậy, với độ phân giải, số khung hình và chất lượng (gần như) không hề thay đổi, chuyển đổi từ ảnh GIF sang định dạng video có thể giúp **giảm dung lượng ảnh lên đến 40 lần**!

Ngày nay, nhờ có HTML5 mà **các trình duyệt hiện đại đều hỗ trợ phát video** mà không cần thêm phần bổ trợ hay cài đặt thêm gì cả. Video khi phát trên web có thể tuỳ biến để **tự động phát và lặp**, cũng như tuỳ biến (hay ẩn hoàn toàn) các nút control để **trông không khác gì một ảnh GIF thật sự**. Các định dạng hỗ trợ rất rộng rãi, tuy vẫn có vài vấn đề khác mà mình sẽ đề cập ở phần sau của bài.

Ở bài này, mình xin được hướng dẫn các bạn sử dụng công cụ *ffmpeg* để chuyển đổi định dạng ảnh GIF sang các định dạng video như MP4, WEBM, WEBP và các vấn đề liên quan khác trong việc sử dụng định dạng video đó.

# Hướng dẫn sử dụng ffmpeg
## Giới thiệu, cài đặt và sử dụng ffmpeg cơ bản
Mình thấy có một bài viết trên Viblo hướng dẫn cơ bản rất đầy đủ bởi bạn @thinhhung tại [FFmpeg và 20 câu lệnh cơ bản xử lý âm thanh, hình ảnh và video](https://viblo.asia/p/ffmpeg-va-20-cau-lenh-co-ban-xu-ly-am-thanh-hinh-anh-va-video-naQZRYBAKvx) nên mình thấy tốt hơn là không hướng dẫn lại ở đây nữa.

## Chuyển đổi ảnh GIF sang định dạng video MP4
Câu lệnh để chuyển định dạng từ GIF sang MP4:
``` shell
ffmpeg -i input.gif -c:v libx264 -crf 23 -movflags faststart -pix_fmt yuv420p -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' output.mp4
```

Các tham số được dùng:
* `-c:v libx264`: output với định dạng mp4.
* `-crf 23`: giá trị trong khoảng 0 and 51. Càng nhỏ thì đầu ra trông càng nét (nhưng dung lượng càng cao). Tốt nhất bạn nên chọn trong khoảng 18 and 28.
* `-movflags faststart`: giúp file video khi được xem online có thể được phát sớm nhất có thể.
* `-pix_fmt yuv420p`: giúp tương thích rộng với các thiết bị và trình phát (ví dụ như QuickTime)?
* `-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'`: với định dạng MP4, nhiều trình phát (ví dụ như trên Safari) sẽ không phát được video nếu chiều dài và chiều rộng video không chia hết cho 2. Tham số này giúp đảm bảo rằng điều này không xảy ra.

## Chuyển đổi ảnh GIF sang WEBM
Câu lệnh giúp chuyển đổi từ GIF sang WEBM như sau:
``` shell
ffmpeg -i tom_jerry-2.gif -c:v libvpx -crf 12 -b:v 500K output.webm
```

Giải thích các tham số:
* `-c:v libvpx` hay `-vcodec libvpx`: cần thiết cho việc sử dụng output là webm.
* `-crf 12`: giá trị từ 4 đến 63. Giá trị càng thấp thì chất lượng càng cao.
* `-b:v 500K`: giá trị bitrate cao nhất được phép. Càng cao thì chất lượng đầu ra càng tốt.

## Chuyển đổi ảnh GIF sang WEBP
Câu lệnh giúp chuyển đổi từ GIF sang WEBP:
``` shell
ffmpeg -i input.gif -c:v libwebp -lossless 0 -q:v 60 -loop 0 output.webp
```

Giải thích các tham số:
* `-c:v libwebp` hay `-vcodec libwebp`: cần thiết cho việc sử dụng output là webp.
* `-lossless 0`: cho phép ảnh có thể bị giảm chất lượng.
* `-q:v 60`: chỉ số quality từ 0 đến 100. Chỉ số càng thấp thì chất lượng càng giảm.
* `-loop 0`: ảnh webp này sẽ lặp mãi mãi (infinite loop).

## Tuỳ biến thêm vào các câu lệnh trên
*ffmpeg* là một công cụ nâng cao và cần nhiều thời gian để bạn làm quen và thành thạo. Mặc dù các câu lệnh trên đã là đủ so với 98% yêu cầu, bạn vẫn có thể tuỳ biến thêm rất nhiều tham số khác nhau, ví dụ như:

* Sử dụng h265 thay cho h264 với MP4,
* Sử dụng codec vp9 thay cho vp8 với WEBM,
* Chỉnh số khung hình/giây (FPS),
* Crop, resize,...

Đừng ngại tìm tòi, thử nghiệm nhiều tham số khác nhau với *ffmpeg* để cho ra kết quả output tốt nhất. 

# Chèn video vào website với HTML5 (và để video hiển thị y như một hình GIF)
Ngày nay, mọi trình duyệt hiện đại đều đã hỗ trợ HTML5 với thẻ `<video>`, giúp bạn chèn video vào website mà không cần phải cài thêm bất kỳ plugin (e hèm, Adobe Flash) nào hết!

Đoạn code mà bạn cần chỉ đơn giản gói gọn trong 1 dòng:

``` html
<video loop muted playsinline autoplay src="https://example.com/link-to-your-video.mp4"></video>
```

Bạn cũng có thể dùng thêm thẻ `<source>` để định nghĩa thêm nhiều định dạng video khác nhau và để trình duyệt chọn ra định dạng nó có thể phát:

``` html
<video loop muted playsinline autoplay>
  <source src="https://example.com/link-to-your-video.webm" type="video/webm">
  <source src="https://example.com/link-to-your-video.mp4" type="video/mp4">
</video>
```

Ở trong 2 code HTML trên:
* `loop` và `autoplay` là để giả lập hành vi của video cho giống như GIF (có thể tự động phát và lặp vô hạn). 
* `playsinline` là tham số dành riêng cho Safari để tự động phát và không mặc định mở video toàn màn hình. 
* Ngoài ra, một vài trình duyệt, nhất là trình duyệt điện thoại, không cho video tự động phát nếu video đó không có tham số `muted` (kể cả khi video không phát ra âm thanh gì), nên bạn cũng phải bổ sung `muted` vào nữa.
* Với dùng nhiều thẻ `<source>` thì độ ưu tiên của trình duyệt chọn là từ trên xuống dưới.

# Vấn đề xoay quanh việc sử dụng HTML5 video
## MP4 vs. WEBM
**MP4 tuy được hỗ trợ rộng rãi, nhưng không phải là định dạng miễn phí**. Rất nhiều công ty và nhiều bên (trong đó có bạn) **phải trả phí bản quyền**. Nếu quan tâm, bạn có thể tìm hiểu thêm về vấn đề bản quyền của MP4 tại [đây](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Supported_media_formats#MP4_H.264_(AAC_or_MP3))).

Định dạng **WEBM của Google hoàn toàn mở và miễn phí**, cùng với được thiết kế riêng để phát trên web, cho dung lượng nhỏ và chất lượng cao không kém gì MP4. Điểm trừ là duy nhất trình duyệt **Safari của Apple rất "lười nhác" trong việc hỗ trợ WEBM**, đến cả bản Safari 14 mới nhất vẫn chưa có động tĩnh gì về việc hỗ trợ!

## Tại sao dùng WEBP?
Khác với MP4 hay WEBM là định dạng video trá hình, **WEBP là một định dạng ảnh thực thụ**. Nó vừa hỗ trợ trong suốt và lossless (không khác gì png), hoặc cũng có thể lossy (như jpg) và hỗ trợ luôn cả ảnh động (như gif). Tuy dung lượng ảnh WEBP vẫn nặng hơn so với các định dạng video, nhưng **WEBP vẫn cho dung lượng nhỏ hơn rất nhiều so với GIF** nếu so sánh cùng chất lượng.

Ngon lành hơn nữa là định dạng WEBP hết sức dễ dùng, có thể chèn vào web bằng thẻ `<img>`, dễ dàng chèn vào các forum, đăng lên các mạng xã hội **như bất cứ file ảnh nào khác**.

WEBP ngày nay đã **được hỗ trợ bởi tất cả các trình duyệt hiện tại**, bao gồm Edge, Chrome, Firefox, và Safari 14. Lưu ý là Safari 13 trở về trước vẫn chưa hỗ trợ WEBP nhé.

## Vấn đề trên Safari
Cái trình duyệt phiền phức này giống như IE của năm 2020 vậy. Safari có khá khá vấn đề như sau:
1. Safari 14 mới nhất chưa hỗ trợ WEBM. Có thể bạn cần phải tạo ra 2 phiên bản video (một là WEBM, hai là MP4) và dùng thẻ `<source>` để cho Safari fallback về MP4.
2. Safari 14 mới nhất đã hỗ trợ WEBP, nhưng các bản trước đó thì chưa hỗ trợ. Ở thời điểm viết bài này thì mình thấy thị phần sử dụng bản iOS/Safari cũ hơn vẫn còn rất lớn.
3. Bạn cần thêm một thuộc tính đặc biệt vào thẻ `<video>` là `playsinline` (như đã nhắc phía trên).
4. Cuối cùng là khi người dùng iOS bật battery saving thì dù bạn làm thế nào `<video>` của bạn cũng chẳng thể autoplay được! Bạn có thể cần phải bổ sung thêm thuộc tính `controls` hoặc làm một custom control để người dùng có thể nhấn vào video để phát/tạm dừng video đó.

## Nhúng vào các website hay blog, diễn đàn
Với blog cá nhân, việc nhúng video khá dễ dàng với thẻ `<video>` HTML5. Các dịch vụ như Gfycat, Giphy đều có đoạn mã `<iframe>` giúp bạn dễ dàng embed được chỉ bằng cách copy-paste.

Với chia sẻ lên diễn đàn, mạng xã hội,... thì việc nhúng video vào hơi khó, mặc dù nhiều diễn đàn được tích hợp sẵn khả năng embed từ các dịch vụ như Gfycat. Lúc này định dạng ảnh thực thụ WEBP sẽ là định dạng cứu cánh chuẩn xác nhất.

# Tham khảo
* https://trac.ffmpeg.org/
* https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
* https://web.dev/replace-gifs-with-videos/
* https://www.clas.kitasato-u.ac.jp/~fujiwara/Mathematica/GIFtoMP4.html
* https://gist.github.com/ndarville/10010916
* https://unix.stackexchange.com/questions/40638/how-to-do-i-convert-an-animated-gif-to-an-mp4-or-mv4-on-the-command-line
* https://css-tricks.com/what-does-playsinline-mean-in-web-video/
* https://developer.mozilla.org/zh-TW/docs/Web/HTML/Supported_media_formats#MP4_H.264_(AAC_or_MP3)