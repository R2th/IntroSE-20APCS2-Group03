## Bắt đầu

Đã bao giờ bạn thắc mắc tại sao lại có cả MP4 và MPEG-4, bạn có nghĩ MP4 là viết tắt của MPEG-4? Nếu có thì bạn giống tôi :v 

Có lẽ chúng ta đã quá quen với các video MP4, FLV, WebM, MKV..., tuy nhiên khi nhắc đến MPEG-4, HEVC, H.264, H265... thì nếu không phải dân chuyên media thì có lẽ chúng ta cũng không quan tâm lắm. Tôi cũng vậy cho đến khi làm dự án gặp phải một tình huống oái oăm: 

## Chromium
Dự án sử dụng Chromium để duyệt web, và khách nói răng không thể play video MP4 trong Chromium, và yêu cầu điều tra xem tại sao.

Khách nói thế thì OK đièu tra thôi chứ sao (facepalm)

Nhưng khi tôi thử lại bằng video MP4 của tôi lại play được! Khách chơi tôi à?

Đến khi thử lại thêm một vài video khác thì có cái play được, có cái không. Vô lý thế nhở?

Thôi thì Google thôi: "Chromium play MP4 video". Sau một hồi tìm kiếm thì nó dẫn tôi đến trang github của Chromium:
https://github.com/cefsharp/CefSharp/wiki/General-Usage#multimedia-audiovideo. 

> CEF and subsequently CefSharp only supports freely available audio and video codecs. To see what the version of CefSharp you are working with supports open http://html5test.com/ in a ChromiumWebBrowser instance.
>
>MP3 patent has expired and as a result is supported in version 65.0.0 on wards.
>
>H264/AAC are classed as Proprietary Codecs and are not supported, they require you to obtain a license. Sites like Netflix/Twitter/Instagram use H264 and as a result their videos won't play. See https://www.fsf.org/licensing/h264-patent-license for some comments from the Free Software Foundation on the subject.
>
>Compiling CEF with support for H264/AAC is outside the scope of this project. The following are provided for reference only, please don't ask for support for compiling CEF.

Truy cập http://html5test.com/ bằng Chromium để xem nó support những gì nào?

![image.png](https://images.viblo.asia/5620ef13-c9ac-4da9-be23-cd3feebb9a79.png)

Không thấy nhắc gì đến MP4 cả? Không play được MP4 thật sao? Trong đây không nhắc gì đến định dạng video MP4 mà chỉ nói đến video codec được support. OK vậy tìm hiểu video codec là gì đã nào!

## Codec

Đầu tiên thì video là một loại dữ liệu rất lớn, hầu như là lớn nhất trong các loại dữ liệu. Độ phân giải càng cao thì dung lượng lưu trữ của video lại càng lớn.

Thứ hai, đó là một file video không chỉ có video, mà còn là tổng hợp của rất nhiều thứ như metadata, subtitle, infor... được đóng gói vào một file dữ liệu.

Codec là chương trình thuật toán dùng bộ nén để nén video hoặc chuyển đổi giữa tín hiệu analog và kĩ thuật số. Trên thực tế chúng ta sẽ gặp các dạng codec như audio codec, video codec.

**Vậy tại sao lại cần codec?**

Vì các tập tin phim ảnh, âm nhạc thường rất lớn nên rất khó chia sẻ qua mạng. Để tăng tốc độ tải xuống, các codec toán học được dùng để mã hóa, hoặc rút gọn tín hiệu truyền tải, sau đó giải mã để xem và chỉnh sửa. Nếu không có codec, việc tải các file video và audio sẽ lâu hơn bây giờ từ 3 tới 5 lần.

Từ ý nghĩa của codec, chúng ta có thể suy ra được:

- **Audio codec:** phương thức nén dành cho audio.
- **Video codec**: phương thức nén dành cho video.

Ngoài ra còn 1 khái niệm nữa, là media container. Đây chính là phần đuôi (file extension) của file đó :D 

Hiểu một cách đơn giản, chúng ta có thể khái quát được một công thức sau:

```csharp
Media Container = video format (video codec) + audio format (audio codec) + subtitle
```

Có thể kể ra một số codec và media container phổ biến mà chúng ta gặp nhiều khi tải 1 video hoặc audio nào đó:

- **Audio codec**: FLAC, MP3, AAC, Vorbis...
- **Video codec**: MPEG-4, h.264, HEVC/h.265, FLV...
- **Media container**: 3GP, FLV, MP4, WebM

Có một lưu ý là không phải một media container có thể chứa tất cả các loại video codec và audio codec mà chỉ support một số codec nhất định. Các bạn nên để ý điều này khi muốn sử dụng codec và media container kết hợp với nhau.
Chi tiết vui lòng tham khảo tại [đây](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats), phần **Video coding formats support** sẽ cũng cấp đầy đủ thông tin bạn cần.

Đến bây giờ, các bạn chắc hẳn cũng đã biết được câu trả lời cho câu hỏi: Sự khác nhau giữa MPEG-4 và MP4 là gì?

- MPEG-4 là video codec.
- MP4 là media container.

Và như vậy, video MP4 **chứa** video được nén bằng codec MPEG-4. Vậy là xong, khá đơn giản phải không?
Như vậy là bạn đã hiểu được một file media chứa những gì rồi đúng không nào? Và lý do một số video hoặc bài hát bạn tải về nhưng không thể mở được, đó là do trình player của bạn không hỗ trợ codec (video hoặc audio) mà file đó sử dụng để nén dữ liệu. Việc của bạn là tìm và tải đúng codec đó về và cài đặt, bạn sẽ chơi được file media đó :D 

Thế là như nào để biết được file đó được encode bằng codec nào? Rất đơn giản chỉ cần sử dụng các trình player hỗ trợ như VLC, đây là một player khá tốt, có thể xem được codec của video, audio, thệm chí transcode thành codec khác luôn. Khá là bá nhỉ?

## Giải quyết

Vậy lý do mà Chromium không play được video của khách, mà lại play được video của mình chắc các bạn cũng đoán ra được rồi nhỉ :D 

Từ hình trên, ta có thể thấy Chromium chỉ support 2 codec là VP8 và VP9. Vì là mã nguồn mở, nên Chromium chỉ support những codec free, còn các codec khác không hỗ trợ vì vấn đề về license.

Player trên web chỉ phát được video nếu Chromium support codec dùng để decode video đó. Ở đây khả năng là video của khách hàng dùng các codec khá là phổ biến như MPEG-4 hoặc h.264. HEVC/h.265...từ đó khiến cho video trên web được duyệt bằng Chromium không thể play được. Vậy phải giải quyết ra sao?

Khá là đơn giản, chỉ cần transcode video đó sang codec VP8 hoặc VP9, nhưng vẫn giữ media container là MP4. Chúng ta có thể thấy video của khách và của mình tuy cùng đuôi MP4 (media container MP4 support cả MPEG-4 lẫn VP8 (VP9)) nhưng khác video codec nên Chromium chỉ play được video mà nó hỗ trợ codec (ở đây là VP8(VP9)). Để giải quyết vấn đề này, chúng ta sẽ lấy gợi ý khách hàng khi upload video lên web, đảm bảo rằng nó được encode bằng VP8 hoặc VP9 là có thể play được rồi :D 

Cảm ơn mọi người đã đọc bài của mình :D Nếu có gì sai sót thì comment sửa giúp mình nhé :D