# 1. Giới thiệu
Xin chào. Có lẽ nhắc đến từ "**Youtube**" thì có lẽ ngày nay đã quá phổ biến rồi.
**Youtube** là 1 sản phẩm của **Google**. Đây là 1 trang web lưu trữ chia sẻ video trực tuyến *phổ biến nhất* hiện nay trên thế giới.
Ở thời điểm hiện tại thì có khá nhiều công cụ để hỗ trợ việc **download** video từ **Youtube** (ví dụ https://y2mate.com/), mình đã thử tìm hiểu và tạo 1 công cụ để *paste youtube URL* vào là có thể *download*. 
Thật tuyệt vời vì có những thư viện người ta đã làm hết rồi, mình chỉ cần cài đặt vào là sử dụng luôn. 

![](https://images.viblo.asia/5472a2e9-afd5-4e81-9647-e8dcdadfda36.png)
# 2. Các thư viện hỗ trợ
Mình chỉ tìm hiểu để làm tool chạy ở trên **Windows** sử dụng **.NET framework**, có 3 thư viện được lên top google đó là:
* YoutubeExtractor https://github.com/flagbug/YoutubeExtractor
* LibVideo https://github.com/i3arnon/libvideo
* YoutubeExplode https://github.com/Tyrrrz/YoutubeExplode

Cùng tìm hiểu từng thư viện nhé:
## 2.1 YoutubeExtractor
- Có đến 612 star trên **Github**, nhưng commit cuối cùng có vẻ đã lâu (từ *Feb 1, 2017* - hơn 1 năm kể từ thời điểm bài viết này được public), nên có vẻ không được hỗ trợ nữa.
### Ưu điểm 
- có hỗ trợ report progress để hiển thị được số % download được, khá cool
### Nhược điểm
- không hỗ trợ cú pháp async await
- có 1 số video từ trang nước ngoài không download được.

**Comment**: thư viện này nếu được phát triển thêm thì có thể sẽ ngon.

## 2.2 LibVideo
- Có 228 star trên **Github**, commit cuối cùng ở thời điểm khá gần đây (*May 27, 2018* - cách khoảng 3 tháng ở thời điểm bài viết này được public), nên có vẻ vẫn được quan tâm chăm sóc.
### Ưu điểm
- Hỗ trợ cú pháp bất đồng bộ Async await
- Hỗ trợ .NET framework 4.5+, Windows 10 Universal apps, Portable Class Libraries, Xamarin.iOS, Xamarin.Android, Mono (Mac/Linux), Windows 8.1 and 8.0, Windows Phone 8.1 (quá ngon)
- Tốc độ download khá nhanh (400% faster than YoutubeExtractor, ghê quá)
- Download được các videos (mình thử chưa video YT nào không down được)
### Nhược điểm
- Chỉ hỗ trợ download video, lấy những thông tin video cơ bản (title, extention)

**Comment**: Thư viện này dung API giống như YoutubeExtractor, nhưng được cải tiến nhiều, dùng download Youtube video thì OK.


## 2.3 YoutubeExplode
- Có 368 star trên **Github**, commit cuối cùng gần đây (*Aug 4, 2018* - chỉ vài chục ngày ở thời điểm bài viết), vẫn đang được phát triển (nói chung là dùng ngon)
### Ưu điểm
- HỖ trợ bất đồng bộ async await
- Hỗ trợ .NET Framework 4.5+, .NET Core 1.0+, .NET Standard 1.1+
- Download video bằng Stream gồm cả 3 loại (muxed - cả video và audio, chỉ video, chỉ audio), và dĩ nhiên download OK.
- Hỗ trợ helper để parse id của video, id của playlist, id của channel.
- Lấy được thông tin các video khá chi tiết (có cả số lượng view, like, dislike), lấy được cả playlist, channels, captions luôn.
### Nhược điểm
- Nhìn chung thấy ngon nhất rồi, chỉ có điều phần Readme có 1 số function mà áp dụng vào code thì không thấy.

**Comment**: nhiều tính năng hữu ích, nói chung đây là thư viện tốt nhất mà mình để xuất trong cả ba.
# 3. Sản phẩm
Sau khi tìm hiểu các thư viện thì mình cũng tạo được 1 tool nhỏ để giúp mình download video từ Youtube về, mình dùng cả 3 thư viện trên để test. 
P/s: Chỉ là download được còn mình không validate exception nên đương nhiên lỗi vẫn xảy ra :drooling_face: 

![](https://images.viblo.asia/df063fea-c849-4a55-b38d-a5615e589a80.png)

# 4. Kết bài
Trên đây chỉ là những chia sẽ chủ quan của mình với các thư viện trên, hi vong nó có thể có ích cho các bạn. 
Cảm ơn các bạn đã đọc bài.

Github tool: https://github.com/furytara/youtubeDownloader

Download tool: https://goo.gl/tbq79V