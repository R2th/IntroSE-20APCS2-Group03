# Giới thiệu
Chào mọi người, một tháng trôi qua thật nhanh và mình lại trở lại đây :D

Hiện nay như mọi người cũng biết, với `HTML5` thì việc phát các Video hay Audio vô cùng đơn giản trên các trình duyệt, tuy nhiên trong các ứng dụng lớn thì việc sử dụng các thư viện hỗ trợ khiến cho lập trình viên giảm tải khối lượng code đi rất nhiều. Tuy vậy, số lượng các thư viện HTML5 Player rất là lớn, để tìm được một thư viện tốt và phù hợp với ứng dụng cũng ít nhiều tiêu tốn đi của bạn kha khá thời gian. Chính vì vậy, trong bài viết này mình sẽ giới thiệu với các bạn một thư số viện Player mà mình thấy tốt nhất.

# 1. [Plyr](https://plyr.io/)
Đây là một thư viện khá đơn giản để sử dụng, dễ dàng tiếp cận và tùy chỉnh. `Plyr` khá phổ biến đối với các lập trình viên mới bắt đầu cũng như lâu năm vì thiết kế nhỏ gọn nhưng nó xử lý rất mượt mà, kể cả đối với các Video có kích thước lớn. Nó hỗ trợ cho cả `HTML5 Video`, `HTML5 Audio`, `Youtue` và `Vimeo`. 

Một số ưu điểm của `Plyr`:
* Hỗ trợ đầy đủ cho các trình đọc màn hình và phụ đề.
* Nền tảng tùy biến cao cho phép người dùng thay đổi giao diện tùy theo lựa chọn của họ.
* Hỗ trợ responsive cho bất kì kích thước màn hình nào.
* Hỗ trợ các phím tắt điều khiển Player trên bàn phím.
* Hỗ trợ `hls.js`, `Shaka` và `dash.js` cho việc **streaming video, audio**.
* Hỗ trợ đa ngôn ngữ (`i18n`)
* ....

Đây là cứu tinh trong đồ án của mình, cá nhân mình cực kì thích `Plyr` vì nó cực kì dễ sử dụng cũng như khả năng tùy biến rất linh hoạt của nó. Ngoài ra `Plyr` còn hỗ trợ cho một số Framework Frontend như `VueJs`, `ReactJs`, `Angular`,..

![](https://images.viblo.asia/757ff7c5-a463-4e4f-82f4-0734b59a8062.png)
# 2. [Video.js](https://videojs.com/)
Đây là một thư viện Video player khá phổ biến, hiện tại nó có hơn 25k star trên Github, rất thích hợp cho những người thích Video được thiết kế từ HTML5. Nó được ra mắt từ năm 2010 và hiện đang phục vụ trong hơn 400,000 trang web khác nhau. `Video.js` tuân theo các giao thức của `Flash Video` và `HTML5 Video`, nó còn hỗ trợ cho cả `Vimeo` và `Youtube`.

Một số ưu điểm của `Video.jS`:
* Đơn giản, dễ dàng cài đặt và thiết lập.
* Dễ dàng tùy chỉnh giao diện player bởi vì nó được xây dựng bằng CSS và HTML.
* Hỗ trợ chế độ phát lại (Playback) trên máy tính và điện thoại.
* Với nhiều plugins nâng cao hỗ trợ dễ dàng các nền tảng truyền thông và xã hội. 
* Hỗ trợ nhiều định dạng Video.
* ...

Nếu ứng dụng của bạn chỉ thiên về việc xử lý Video thì đây là một Player khá tuyệt vời. Tuy nhiên nếu ứng dụng của bạn còn cần xử lý cả Audio nữa thì `Video.js` không thích hợp lắm, bởi vì `Video.js` không hỗ trợ mạnh đối với Audio.

![](https://images.viblo.asia/ec169bdd-4328-4f0f-b2b4-4649381b667d.png)
# 3. [jPlayer](http://jplayer.org/)
Đây là một thư viện mã nguồn mở, miễn phi và được viết bằng `JavaScript`. `jPlayer` cơ bản là một plugins của jQuery cho phép trình chiếu các video, audio đa nền tảng một cách nhanh chóng vào trong ứng dụng Website. `jPlayer` cung cấp một  bộ Api toàn diện cho phép bạn thỏa sức sáng tạo, đồng thời `jPlayer` cũng có một cộng đồng hỗ trợ khá mạnh mẽ.

Một số ưu điểm của `jPlayer`:
* Dễ dàng bắt đầu và triển khai chỉ trong vài phút.
* Kích thướt rất nhẹ - chỉ vỏn vẹn khoảng 14Kb.
* Hỗ trợ đa nền tảng, đa trình duyệt,..
* Hỗ trợ API và giao diện thích hợp trong tất cả trình duyệt, HTML5 hay Adobe® Flash™.
* Tài liệu hướng dẫn được cung cấp đầy đủ và cộng đồng người hỗ trợ khá mạnh mẽ.
* Hỗ trợ chức năng tạo Playlist (Danh sách phát).
* ....

Đây là một thư viện mình thấy thích thứ hai sau `Plyr` bởi vì khả năng tùy biến khá tốt và chức năng tạo Playlist vô cùng tuyệt vời của nó.  

![](https://images.viblo.asia/27d30466-9947-475c-872f-2387fc358ce3.png)
# 4. [Afterglowplayer](https://afterglowplayer.com/)
Đây là một thư viện `HTML5 Video Player`, là một trong những thư viện cực kì dễ sử dụng và tích hợp. Việc khởi tạo `Afterglowplayer` vô cùng đơn giản, nó có thể chuyển đổi các phần tử `HTML5 Video` thường thành các trình phát video với đầy đủ các chức năng.

Một số ưu điểm của `Afterglowplayer`: 
* Dễ dàng cài đặt, khởi tạo và sử dụng.
* Hoạt động tốt cũng như hỗ trợ responsive trên hầu hết các trình duyệt và thiết bị.
* Hỗ trợ phát video được lưu trữ trên Youtube hay Vimeo chỉ bằng cách cung cấp ID video.
* Hỗ trợ chức năng thay đổi chất lượng video (SD/HD) một cách dễ dàng.
* Hỗ trợ nhiều định dạng video.
* ....

Giống như `Video.js` thì `Afterglowplayer` là một thư viện thiên về việc xử lý video. Nếu bạn đang tìm kiếm một Player mà yêu cầu responsive cao thì `Afterglowplayer` là một lựa chọn tuyệt vời cho bạn, bởi vì giao diện của `Afterglowplayer` được thiết kế khá tốt, ngoài ra sử dụng `Afterglowplayer` cũng cực kì dễ dàng nữa.

![](https://images.viblo.asia/070595be-e2cd-43a0-ad3d-109b062cc448.png)
# 5. [Mediaelement.js](http://www.mediaelementjs.com/)
Đây là thư viện `Video`, `Audio Player` nâng cao dựa trên `HTML5`. Thay vì cung cấp `HTML5 Player` cho các trình duyệt mới và `Flash Player` cho các trình duyệt cũ hơn, `Mediaelement.js` lại cung cấp một bản nâng cấp với các `Flash` tùy chỉnh và `Silverlight plugins`, giống như như là `HTML5 MediaElement API` để các trình duyệt cũ và mới đều có thể sử dụng chung một giao diện.

Một số ưu điểm của `Mediaelement.js`: 
* Được xây dựng dựa trên CSS và HTML thuần nên rất dễ dàng tùy biến.
* Hỗ trợ chức năng tạo Playlist với các phím chức năng đầy đủ.
* Hỗ trợ video, audio streaming với `HLS`
* Hỗ trợ chức năng tạo phụ đề cho video.
* .....

Đây cũng là một sự lựa chọn không hề tệ cho ứng dụng của bạn. Một điểm trừ nhỏ của thư viện này là tài liệu hướng dẫn mà nó cung cấp thì mình thấy không được rõ ràng cho lắm.

![](https://images.viblo.asia/d9ba01d1-6e13-4a1f-b9b9-77da335352e7.png)


Ngoài ra, bạn còn có thể xem thêm một số HTML5 Player khác như: 
* [Cloudinary Video Player](https://cloudinary.com/blog/html5_video_player) 
* [JW Player](https://www.jwplayer.com/)
* [Projekktor Player](https://github.com/frankyghost/projekktor)
* [Acorn Media Player](https://github.com/ghinda/acornmediaplayer)
*  ....
# Kết luận
Qua bài viết này mình đã chọn ra và giới thiệu cho các bạn 5 thư viện HTML5 Player mà mình cảm thấy là tốt nhất cho các ứng dụng.  Hy vọng qua những gì mình chia sẻ, các bạn có thể tìm được thư viện `HTML5 Player` phù hợp với ứng dụng của bạn.

Nếu các bạn biết thêm một `HTML5 Player` nào khác tốt hơn mà mình đã không đề cập trong bài viết này thì hãy chia sẻ với mình nhé :D

# Tham khảo
https://blog.bitsrc.io/5-open-source-html5-video-players-for-2018-38fa85932afb
https://filmora.wondershare.com/video-player/12-best-html5-video-players.html