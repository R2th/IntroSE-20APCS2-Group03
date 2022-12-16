Nếu như trong các bài toán computer vision đầu vào là ảnh, trong nlp đầu vào là text thì trong bài toán speech to text (automatic speech recognition) đầu vào sẽ là audio. Trong bài viết này, mình sẽ trình bày một số lý thuyết chung về âm thanh.
## Âm thanh (sound)
### Âm thanh là gì?
Theo wikipedia, âm thanh là các dao động cơ học (biến đổi vị trí qua lại) của các phân tử, nguyên tử hay các hạt làm nên vật chất và lan truyền trong vật chất như các sóng. Âm thanh, giống như nhiều sóng, được đặc trưng bởi tần số, bước sóng, chu kỳ, biên độ và vận tốc lan truyền (tốc độ âm thanh).
![](https://images.viblo.asia/9036c2d1-02f3-4f9c-bc37-f031b724a3ed.png)



### Các đặc trưng của âm thanh
* Tần số: là số dao động mà nguồn âm có thể thực hiện được trong 1 giây. Đơn vị tần số là Hertz (hz). Con người có khả năng nghe âm thanh trong miền tần số 20-20.000 Hz
* Cường độ âm (I): biểu diễn mức năng lượng của âm thanh. Đơn vị đo cường độ âm là W/m²
## Âm thanh số hóa (digital sound - audio)
Âm thanh là dạng tín hiệu liên tục, trong khi máy tính làm việc với các con số rời rạc. Vì vậy, để thuận lợi trong việc lưu trữ, truyền tải, xử lý, tín hiệu âm thanh được chuyển sang dạng số (digital sound) - chính là những file audio với định dạng mp3, wav chúng ta thường nghe trên máy tính hoặc điện thoại.

### Các đặc trưng của âm thanh số hóa
![](https://images.viblo.asia/aaed8bd8-4912-4c16-989e-ffe92b1aa1f4.png)


* Sample rate: tần số lấy mẫu trên giây của tín hiệu (đơn vị Hz). Sample rate càng cao, chất lượng càng tốt. Một bản nhạc có sample rate là 44100 Hz thì mỗi giây nhạc sẽ được lấy mẫu 44100 lần. Sample rate trong nhận dạng giọng nói thường là 16000Hz.<br>
Về mặt toán học, để biến một sóng âm thanh thành số, chúng ta chỉ cần ghi lại chiều cao của sóng tại các điểm cách đều nhau. 
![](https://images.viblo.asia/7509050b-a63d-428b-b871-2b857ce432de.gif)

* Channels: mô phỏng âm thanh trong không gian, chanel càng cao, âm thanh càng sống động, giúp ta hình dung giống như cảm nhận được vị trí âm phát ra trong không gian.<br>
Stereo là một tập tin âm thanh tích hợp hai kênh âm thanh riêng biệt, chính là biểu tượng cho tai trái và tai phải người. Trong khi đó, Mono là một tập tin âm thanh đơn kênh.<br>
Bạn hãy thử mở một bản nhạc 360 độ, bạn sẽ cảm nhận sự khác biệt trong âm thanh được phát ra ở hai bên tai nghe, đó chính là âm thanh Stereo. Ngược lại, Momo lại phát ra âm thanh như nhau trong cả hai bên tai nghe.<br>
Trong nhận dạng giọng nói, thường đưa tín hiệu về dạng mono tức là 1 kênh.

* Bitrate: là đơn vị cơ bản để nói đến mức dung lượng mà thiết bị lưu trữ cần có để xử lý một giây âm thanh (đơn vị kbps - kilobit per second).<br>
Bitrate càng cao sẽ ghi nhận đầy đủ những loại âm thanh, chất lượng tập tin cũng cao hơn do đó dung lượng tập tin cũng sẽ lớn hơn. Ngược lại, bitrate càng thấp thì âm thanh bị lược bỏ càng nhiều nên chất lượng thấp hơn do đó dung lượng tập tin nhỏ hơn.<br>
Vì vậy nếu giảm bitrate quá nhiều thì dữ liệu âm thanh có khả năng bị mất.

### Các định dạng file audio
Ta có định dạng file wav là định dạng giữ nguyên gốc nhưng dung lượng rất lớn (khoảng 10Mb cho mỗi phút nhạc). Vì vậy, để tiện việc lưu trữ hay chia sẻ, chúng ta cần nén lại dưới các định dạng khác như mp3, ogg, … Cách để giảm kích thước tập tin là chỉnh sửa một trong các thông số (sample rate, bitrate hoặc channels)

*Có hai cách nén chính:*

* Nén có mất (lossy compression): mp3, wma, ogg, … Loại bỏ những dữ liệu “không cần thiết" trong tập tin âm thanh cần nén.
* Nén không mất (lossless compression): flac, ape, … Không làm mất dữ liệu của tập tin gốc.
## Kết luận
Bài đầu tiên trong chuỗi bài về Speech To Text, chúng ta tìm hiểu khái quát lý thuyết về âm thanh, âm thanh số hóa. Hẹn gặp lại các bạn ở bài viết tiếp theo nhé.

## Tài liệu tham khảo
https://vi.wikipedia.org/wiki/Âm_thanh<br>
http://physics.bu.edu/~duffy/py105/Sound.html<br>
https://towardsdatascience.com/audio-deep-learning-made-simple-part-2-why-mel-spectrograms-perform-better-aad889a93505