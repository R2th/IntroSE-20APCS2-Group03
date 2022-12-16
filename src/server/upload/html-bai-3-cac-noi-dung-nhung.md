Các nội dung nhúng - là những nội dung được nhập từ một tệp khác ở bên ngoài vào văn bản HTML. Trong bài trước, chúng ta đã thực hiện thao tác `nhúng` một tệp ảnh vào một trang web đơn. Ở đây chúng ta sẽ thử thực hiện thêm một vài thao tác tương tự như vậy.

## Làm thế nào để thêm video vào trang đơn?

Lần này thì chúng ta sẽ thử nhúng các tệp video được lưu trữ trong máy tính của chúng ta trước:

- Đầu tiên bạn hãy đặt tệp video của bạn vào cùng thư mục với văn bản HTML.
- Nhờ Atom thực hiện câu thần chú này: `vi`
- Bạn sẽ thấy có gì đó hiện ra trông có dạng như thế này: `<video src="" autoplay poster=""></video>`
- Bây giờ dùng thuộc thuộc tính `src` để trỏ tới tệp video của bạn.
- Thay thế `poster=""` với thuộc tính [`controls`](https://www.w3schools.com/tags/att_video_controls.asp)
- Và như vậy là được rồi đấy.

`Ảnh chụp màn hình`
![thẻ HTML video](https://images.viblo.asia/194db43e-9027-4e72-8e43-356a2dbc2079.png)

```video.html
<video src="bhaisajyaguru.mp4" autoplay controls>
   Dòng chữ này sẽ được hiển thị
   khi trình duyệt không tìm thấy video.
</video>
```

Một cách làm khác, đó là bạn có thể đăng tải video của bạn lên [YouTube.com](https://www.youtube.com/watch?v=eNzenkoeJcY) sau đó nhúng ngược trở lại trang đang viết. Hầu hết những website cho phép đăng tải và chia sẻ các tệp đa phương tiện `multimedia` đều cung cấp thêm một nút `Chia sẻ` với một lựa chọn `embed`. Bạn chỉ cần sao chép code HTML được cung cấp ở đó vào trang đơn của bạn là được.

`Ảnh chụp màn hình`
![nhúng từ Youtube](https://images.viblo.asia/09c0562b-da2b-4795-9e3e-cc7ab95f7884.png)

```youtube.html
<iframe width="720" height="405"
        src="https://www.youtube.com/embed/omG0IrO-QH8"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>
```

Chúng ta sẽ nói về thẻ `iframe` trong phần tiếp theo.

Liên kết tham khảo: [Các định dạng video được hỗ trợ](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats)

## Thẻ iframe

Thẻ [`iframe`](https://www.w3schools.com/TAgs/tag_iframe.asp) cho phép chúng ta nhúng một trang đơn trong một trang khác.

```iframe.html
<iframe src="https://viblo.asia" 
        width="360px" height="550px">
</iframe>
```

Các thuộc tính [`width`](https://www.w3schools.com/tags/att_iframe_width.asp) và [`height`](https://www.w3schools.com/tags/att_iframe_height.asp) được sử dụng để thiết lập kích thước của cửa sổ bên trong chứa trang đơn được nhúng. Trong đó thì `width` là kích thước chiều rộng và `height` là kích thước chiều cao của khung hiển thị.

## Làm thế nào để thêm tệp audio vào trang đơn?

Việc nhúng một tệp audio vào trang đơn cũng được thực hiện tương tự. Chúng ta sẽ gửi tới Atom một câu thần chú khác:

- Ooommm... Atom, thần chú mới là.. `au`
- Poof! `<audio src=""></audio>`
- Bây giờ chúng ta cần thêm một đường dẫn tới tệp audio trong thuộc tính [`src` (source)](https://www.w3schools.com/tags/att_audio_src.asp).
- Đồng thời, chúng ta cũng cần thêm các thuộc tính [`autoplay`](https://www.w3schools.com/tags/att_audio_autoplay.asp) và [`controls`](https://www.w3schools.com/tags/att_audio_controls.asp).

Có lẽ bạn cũng đã quen cách làm ảo thuật với Atom rồi. Vì vậy nên kể từ giờ thì mình sẽ chỉ ghi code minh họa thôi nhé. :D

`Ảnh chụp màn hình`

![thẻ HTML audio](https://images.viblo.asia/4353096b-3bbb-4136-b84d-c62fa1efe2f1.png)

```audio.html
<audio src="cundhidaranis.mp3" autoplay controls>
   Dòng chữ này sẽ được hiển thị
   nếu trình duyệt không tìm thấy tệp audio.
</audio>
```

Ngoài ra thì chúng ta cũng có những giải pháp miễn phí khác nếu như bạn không muốn tự 
lưu trữ các tệp audio cồng kềnh. Bạn có thể sử dụng một dịch vụ stream audio trực tuyến như 
[SoundCloud.com](https://soundcloud.com/azliel/dj-okawari-bluebird-story-ft) chẳng hạn. Cái này cũng giống với YouTube thôi, nhưng được thiết kế dành riêng để stream audio.

```soundcloud.html
<iframe width="100%" height="300" scrolling="no"
        frameborder="no" allow="autoplay"
        src="https://bit.ly/3CJc9Bh">
</iframe>
```

Ồ... Mình đã không để ý rằng bài hướng dẫn này đã hơi ồn ào quá rồi. :D  
Thật xin lỗi bạn nếu như mấy đoạn code minh họa phía trên làm bạn phân tán tư tưởng.

Sau ba bài mở đầu, bây giờ thì chúng ta đã biết cách làm thế nào để thêm vào trang đơn các kiểu nội dung cơ bản. Việc quan trọng cần làm tiếp theo đó là nhóm các nội dung liên quan lại với nhau để tạo thành các phần mang tính bố cục của trang web (thanh điều hướng, khu vực hiện nội dung chính, phần chân trang web, ...) và điều chỉnh cho các phần này hiển thị gọn gàng, đẹp mắt.

[**[HTML] Bài 4 - Các thẻ Container*](https://viblo.asia/p/aWj53xd8K6m)