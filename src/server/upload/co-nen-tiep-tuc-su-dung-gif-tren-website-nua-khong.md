Trong một lần support người bạn làm tính năng tạo gif thumbnail cho video, mình phát hiện ra rằng một ảnh GIF có cùng duration, resolution và fps sẽ có dung lượng lớn hơn nhiều lần so một video tương đương!!!
Cụ thể nếu video dài 10s (có dung lượng khoảng 1.3Mb) thì sau khi convert qua GIF sẽ có dung lượng khoảng 14Mb. Trước đó thì mình cứ nghĩ rằng gif sẽ phải nhẹ hơn video nhưng qua vụ này thì thấy có vấn đề không ổn. Ban đầu mọi lý do bị quy cho là mình dùng `ffmpeg` không đúng, đã thử optimize mọi cách (đã thử  cắt thủ công từng frame, optimize frame sau đó ghép lại) nhưng vẫn không ổn. Mình test thử với một số công cụ conver mp4 --> gif thì kết quả cũng không khá hơn tí nào. Bắt tay vào tìm hiểu thì hóa ra là do concept và công nghệ encoding của hai đứa khác nhau hoàn toàn. Chính sự khác nhau đó đã tạo nên sự khác biệt khiến GIF bị thất thế hơn nhiều!

Trước đây khi nhắc đến "web động", đối với người dùng bình thường thì đó là một trang web "động đậy" được, đại ý là với các trang web với những hình ảnh như thế này

![](https://images.viblo.asia/a269031e-8054-462a-9560-437860df1978.gif)

![](https://images.viblo.asia/2ed17699-2ad4-4de0-8085-e6d04e31e07a.gif)

Đó là sự thật và bạn có thể ngắm lại chúng thông qua một trang web mới nhưng với tư tưởng và style cũ như này:
https://makefrontendshitagain.party/
https://www.warnerbros.com/archive/spacejam/movie/cmp/tunes/tunesframes.html

Quay lại câu chuyện về việc có nên tiếp tục sử dụng GIF? GIF đã xuất hiện từ rất lâu và nó thực sự phổ biến đến mức ngay cả người dùng phổ thông cũng biến đến với khái niệm  "ảnh động"
## GIF của ngày xưa
Có một sự thật là ngày nay GIF không còn mang lại hiệu quả nữa là bởi vì nó đã hết thời. Mình có tìm hiểu thì vào những năm đầu thập kỉ 90 (thế kỷ trước) thì GIF thực sự mang lại rất nhiều hiệu quả, nó được dùng như là một cách để nén các hình ảnh (LZW compression), GIF giúp những hình ảnh lớn có thể được tải trong thời gian ngắn thông qua đường truyền mạng với băng thông nhỏ. Về sau thì người ta cho thêm những hiệu ứng đơn giản, cho phép những hình ảnh có thể xuất hiện theo chuỗi với thời gian delay tùy chỉnh. Tất cả những thứ đó: công nghệ nén ảnh, một vài hiệu ứng đơn giản, transparence... đã giúp cho GIF trở nên hữu ích trong việc hiển thị logo động hay những icon đơn giản. Suy cho cùng thì GIF cũng đã từng rất hữu ích tại thời điểm mà nó được tạo ra

## GIF ngày nay
Hãy cùng so sánh một chút giữa những điểm mạnh của GIF so với các công nghệ tương đương hiện nay nhé

### Image compression
GIF từng được biết đến như là một công nghệ nén ảnh không suy giảm (lossless compression). Tuy nhiên nó chưa bao giờ là đối thủ của PNG cả. Ngày nay thì PNG là một trong những định dạng được dùng phổ biến nhất trên nền tảng web. Cùng với PNG còn có JPEG (một định dạng lossy). JPEG không giữ được chất lượng toàn vẹn như PNG, một số vùng trên bức ảnh sẽ không giữ được chất lượng đầy đủ; đó cũng là yếu tố khiến JPEG giành rất nhiều lợi thế trong việc tối ưu về mặt dung lượng lưu trữ.

### Color and transparency
Bạn có thể sẽ nhận ra rằng ảnh gif không phỉ lúc nào cũng sặc sỡ hoặc có màu sắc trung thực, mà nhiều khi nó bị vỡ hoặc mang một tông màu rất xấu. Lý do là chuẩn GIF standard chỉ hỗ trợ đến 256 colors (8 bit channel) bên cạnh đó là một binary channel giành cho transparence (điều này khiến cho chúng ta không thể tạo nên những ảnh GIF mà trong đó chưa pixel mờ - opacity. Mỗi pixel trong gif chỉ có 2 trạng thái là transparance hoàn toàn hoặc không tồn tại transparance)
Trong khi GIF quá nghèo nàn thì định dạng PNG hỗ trợ tới 16.9 triệu màu (24bit color channel) và thêm 8 bit channel nữa giành cho transparancy (mỗi pixel có thể có nhiều trạng thái transparance khác nhau: 256)

### Animation
Đây chắc chắn là lý do mà ngày nay GIF vẫn còn quá phổ biến. Tuy nhiên với sự xuất hiện của html vector, html5 animation có hiệu suất cao hơn, nhẹ nhàng và uyển chuyển hơn thì trong tương lai GIF sẽ không còn được ưa chuộng nhiều nữa.
Bênh cạnh html5 animation thì APNG cũng là một đối thủ cạnh tranh rất lớn của GIF, khi mà ông lớn cuối cùng (chromium) đã chấp nhận support APNG thì sự từ chối của PNG GROUP từ năm 2007 không còn là rào cản cho sự phát triển của APNG nữa (https://en.wikipedia.org/wiki/APNG). APNG thừa hưởng toàn bộ điểm mạnh của PNG, bên cạnh đó nó cũng hỗ trợ animation như của gif, giúp tạo ra những bức ảnh PNG animation chất lượng cao

## Yếu điểm của GIF
Hãy thử so sánh chất lượng và dung lượng của 2 file sau nhé:
Mp4: https://www.sohamkamani.com/colors-31fcc56a1f9f6ed31aa38d7fb54f298d.mp4
Gif: https://www.sohamkamani.com/colors-0a09f43e8b766a26d52ee256424446e1.gif

Như bạn thấy thì file mp4 khoảng 2.4MB, trong khi file Gif có chất lượng kém hơn nhiều nhưng dung lượng lại tới 14MB. Lý do là:
### Lợi thế của video compression
Nếu bạn lấy ra 2 frames liên tiếp của một video bất kì, bạn sẽ thấy rằng phần lớn 2 frame liên tiếp ở bất kỳ thời gian nào trong video cũng sẽ không có quá nhiều sự khác biệt (về mặt hình ảnh). Sự khác biệt đôi khi chỉ là sự thay đổi màu sắc của một vài pixel hay sự thay đổi vị trí không đáng kể của một vài pixel. Các phương pháp encode video ngày nay chỉ tập trung vào những sự thay đổi này, chúng chỉ quan tâm đến sự khác biệt giữa các frame mà không cần phải lưu trữ toàn bộ thông tin của từng frame một cách riêng biệt. Điều đó cho phép chúng ta có thể lưu trữ video với dung lượng nhỏ hơn nhiều con số chúng ta tưởng tượng được.
GIF thì khác, nó được sinh ra như một định dạng giúp nén ảnh, mỗi frame (single image) trong GIF được nén một cách riêng biệt, hoàn toàn độc lập nhau. Thông tin về mỗi frame sẽ không có tác dụng gì đối với các frame khác. Dẫn đến một hệ quả là GIF sẽ phải lưu toàn bộ thông tin về từng frame cho dù giữa 2 frame liên tiếp không có nhiều sự khác biệt. Điều này giúp chúng ta có được câu trả lời khá hợp lý cho việc GIF có chất lượng kém hơn nhưng dung lượng lại lớn hơn video rất nhiều

## Giải pháp thay thế cho GIF
Vì những nhược điểm khá lớn của GIF, có lẽ chúng ta cần một hoặc vài thứ có thể thay thế cho GIF trong thời gian hiện tại.
### Với animation icon
Sử dụng html5 animation cho dung lượng nhỏ hơn mà lại "mượt" hơn
### Với ảnh lớn
Sử dụng HTML5 `<video>` element
```
<video autoplay loop>
  <source src="my-video.mp4" type="video/mp4">
  <source src="my-video.webm" type="video/webm">
</video>
```

Trong trường hợp bạn có rất nhiều ảnh gif và muốn sử dụng chúng trên website, hãy thử với `ffmpeg`
```
ffmpeg -i abc.gif abc.mp4
```
Với ie6 hoặc các browser không hỗ trợ `video` element, bạn có thể set fallback về gif như sau
```
<video autoplay loop>
  <source src="my-video.mp4" type="video/mp4">
  <source src="my-video.webm" type="video/webm">
  <img src="my-video.gif"/>
</video>
```

Tốc độ truy cập internet hiện nay đã tốt hơn rất nhiều so với thời điểm GIF được tạo ra, bài toán tốc độ và băng thông không còn là bài toán sống còn, nhưng nếu bạn muốn website của mình nhanh hơn; hoặc đơn giản là mang lại trải nghiệm tốt hơn cho người dùng thì bạn có thể thay đổi ngay từ cái ảnh gif...
PS: Nếu bạn ngó qua một số dịch vụ lớn, bạn sẽ thấy rằng họ cũng đang sử dụng video để thay thế cho gif. Trong đó có facebook, khi một link ảnh gif được share lên Facebook, nó sẽ ngay lập tức được chuyển đổi thành video. Cách làm này vừa giúp tạo hiệu ứng play/pause, giảm được rất nhiều chi phí cho băng thông/storage, đồng thời giúp tiết kiệm thời gian tải trang. Bạn cũng có thể tham quan GIFV của imgur để trải nghiệm cách làm này https://blog.imgur.com/2014/10/09/introducing-gifv/