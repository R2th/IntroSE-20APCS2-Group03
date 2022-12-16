Có thể bạn biết rồi: [mp3 là định dạng nén âm thanh phổ biến nhất mọi thời đại](https://www.adobe.com/creativecloud/video/discover/best-audio-format.html). Vậy đã bao giờ bạn tự hỏi "mp3" là gì và nó hoạt động như thế nào chưa ? Nếu bạn cũng tò mò thì hãy cùng tôi tìm hiểu khái quát về định dạng mp3 qua ca "cứu hộ online" mà tôi thực hiện vào năm 2017 dưới đây nhé !

Số là tình cờ tôi lướt qua bài đăng nhờ giúp đỡ của một bạn trẻ trên một nhóm Facebook. Bạn này dùng một tiện ích tên là iMazing để export kho nhạc từ iPhone ra định dạng mp3, tuy nhiên sau khi import các file mp3 này vào iTunes thì hầu hết đều bị lỗi.

Trong video quay màn hình bạn đó đính kèm, trình phát nhạc hiển thị **bài hát chỉ có độ dài 02:35.** Tuy nhiên khi con trỏ chạm đến điểm cuối của thanh progress bar (tức đạt đến điểm 02:35 / 02:35) thì trình phát nhạc tiếp tục phát thêm 5 giây của 1 đoạn "vu vơ" giữa bài rồi mới ngắt hẳn, dẫn đến **độ dài thực tế của bài nhạc lên đến 02:40**. Tôi nghi ngờ rằng file nhạc đã bị *corrupted*, tức là metadata của file được khai báo chính xác, nội dung gốc của bài hát cũng còn nguyên, chỉ có 5 giây cuối đã bị encoder thêm vào do nhầm lẫn.

![](https://images.viblo.asia/c9051a03-e435-480e-a6dd-067c2870bc82.jpg)
> Hình minh họa: Decode bằng ffmpeg cho thấy file mp3 có độ dài thực tế **lớn hơn 5s** so với khai báo



## Kiểm chứng

Để kiểm tra giả định của mình, tôi đã nhờ bạn ấy gửi cho tôi 2 file mp3 lỗi. Khi import cả 2 file này vào *Rythmbox* trên máy tính của tôi, chúng đều hiển thị thời lượng khớp với nội dung bài hát, sau khi kết thúc trình phát nhạc tiếp tục chơi một đoạn âm thanh thừa lấy từ một vị trí [có vẻ] ngẫu nhiên trong bài.

Tôi dùng ffmpeg để kiểm tra thời lượng thực tế của file thứ nhất:

```shell
$ ffmpeg -i "yeu 5 - rhymastic ( darrys flip_ ).mp3" -f null -
...
  Duration: 00:02:35.48, start: 0.011995, bitrate: 137 kb/s
    Stream #0:0: Audio: mp3, 44100 Hz, stereo, s16p, 128 kb/s
...
frame=    1 fps=0.0 q=-0.0 Lsize=N/A time=00:02:40.56 bitrate=N/A
video:0kB audio:27659kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown
```

Output cho thấy sự chênh lệch giữa phần khai báo và thực tế khi decode (`Duration: 00:02:35.48 vs time=00:02:40.56`). Phân tích bài thứ hai còn cho kết quả tệ hơn vì thừa tới 36 giây (`Duration: 00:03:28.73 vs time=00:04:04.44`). Như vậy rõ ràng những file này không lỗi ở phần khai báo mà lỗi ở phần nội dung như tôi đã nghi ngờ. Từ đó hướng xử lí tôi nghĩ đến là giữ nguyên metadata và sử dụng thông tin về thời lượng trong khai báo để cắt bỏ đoạn nhạc thừa.

## MPEG 1 Layer III - MP3

Tôi hiểu là mình sẽ phải viết một chương trình để parse file mp3 và cắt bớt phần thừa ở cuối file. Tuy nhiên phải thú thật là tôi không còn nhớ gì về cấu trúc của định dạng MP3 (MPEG 1 Layer III) mặc dù tôi đã học đến 6 tín chỉ cho module tự chọn “Xử lí âm thanh và hình ảnh” hồi ĐH (:sweat_smile:). Vậy nên đầu tiên tôi cần xem lại đặc tả kĩ thuật của định dạng này. Một vòng tìm kiếm trên Google cho tôi nhớ lại sơ đồ minh họa dưới đây:

```shell
+-------------+
|  ID3v2 Tag  |
+-------------+
| Xing header |
+-------------+
   \
    +-------------+
    |    Frame1   |
    +-------------+
    |    Frame2   |
    +-------------+
    |    Frame3   |
    +-------------+
    |    ....     |
    +-------------+
   /
+-------------+
| ID3v1 Tag   |
+-------------+
```

### a. Audio frame

Định dạng MP3 không phải là một khối thống nhất mà được chia nhỏ thành nhiều phần, gọi là frame. Mỗi frame sẽ chứa phần khai báo (frame header) và dữ liệu âm thanh mã hóa (audio information). Các frame được xếp liên tiếp nhau tạo thành một chuỗi. Đây là thành tố quan trọng nhất vì một file mp3 chỉ cần chứa duy nhất chuỗi audio frame hợp lệ là đã có thể được giải mã mà không cần header hay bất kì loại thông tin nào khác đính kèm, tất cả những gì *decoder* cần làm chỉ là đọc tuần tự từ frame đầu tiên đến frame cuối cùng là xong.

### b. ID3 Tag

ID3 Tag được tạo ra để lưu trữ thêm các thông tin liên quan đến nội dung âm thanh (vd tên bài hát, ca sĩ, album, năm phát hành, lyrics, album cover…). Đây thưc chất là những phần thông tin chỉ có giá trị trang trí, được thêm vào trước chuỗi audio frame (đối với ID3v2) hoặc sau chuỗi audio frame (đối với ID3v1),  nên có thể xóa bỏ mà file mp3 vẫn hợp lệ. Xem thêm tại [https://id3.org/id3v2.4.0-structure](https://id3.org/id3v2.4.0-structure).

### c. Xing header

Trước khi nói đến phần này, tôi muốn giải thích về bit rate nếu bạn chưa biết về nó. Nói đơn giản thì bit rate là lượng dữ liệu âm thanh (bit) được xử lí trong một giây. Ví dụ dễ thấy, bit rate chính là các con số 128Kbps, 192Kbps, 320Kbps… mà các bạn thường thấy đi liền với file mp3 (Kbps = Kilobits per second). Con số này càng lớn thì chất lượng âm thanh càng cao.

Đối với định dạng MP3, có hai khái niệm phát sinh liên quan đến bit rate:
  * Constant Bit Rate (CBR): tất cả các audio frame trong file có chung một bit rate không đổi.
  * Variable Bit Rate (VBR): bit rate không đồng nhất giữa các audio frame, dẫn đến bit rate của cả file sẽ là bit rate trung bình cả các audio frame trong file.

Xing header nằm trong một **audio frame rỗng** (không có dữ liệu âm thanh mã hóa), đứng đầu chuỗi audio frame, có chứa một số thông tin giúp cho decoder giải mã file hiệu quả hơn như tổng số frames, tổng số bytes, danh mục các frame (do kích thước các frame VBR không đồng nhất nên cần tạo danh mục để có thể “tua” - seeking - trong file)… Vì lí do đó nên Xing header thường xuất hiện trong các file VBR (nhưng không bắt buộc) và được coi như một dấu hiệu nhận biết loại file này mà không cần phải đọc tất cả các frame. Xing header cũng có thể xuất hiện ở một file CBR, trong trường hợp này header tag sẽ là Info thay vì Xing (tôi sẽ giải thích cụ thể ở phần sau). Việc khai báo thành phần này không đúng với thực tế sẽ khiến cho trình phát hiển thị sai thời lượng của bài nhạc và chức năng tua hoạt động không chính xác.

## Giải thuật

Từ những kiến thức trên, tôi có thể cụ thể hóa hướng xử lí ban đầu thành thuật toán như sau:

```
Cho input=file mp3 lỗi, output=file mới
  * Đọc input
  * Nếu tìm thấy ID3v2 Tag thì copy y nguyên sang output
  * Tìm Xing header, đọc tổng số audio frame được khai báo ở đây (gọi là N). Copy Xing header sang output.
  * Copy N audio frames theo sau Xing header sang output.
  * Copy ID3v1 tag (nếu có) sang output
```

Ta sẽ thử duyệt bằng tay để kiểm chứng thuật toán.

Đầu tiên cần phải xác định xem các file này là VBR hay CBR bằng cách xem frame đầu tiên có chứa chuỗi **Xing** (`0x58 0x69 0x6e 0x67`) hay **Info** (`0x49 0x6e 0x66 0x6f`). Các chuỗi này có thể tìm thấy ở vị trí 36 bytes tính từ đầu frame (4 bytes cho frame header + 32 bytes cho side informations).

Như đã nói ở phần trên, cấu trúc của một frame có dạng `frame=<frame header><audio data>` (trường hợp không có 16 bits CRC).

Trong đó **frame header** có định dạng là một chuỗi dài 32 bits `AAAAAAAA AAABBCCD EEEEFFGH IIJJKLMM` ([chi tiết](http://www.mp3-tech.org/programmer/frame_header.html)), trong đó phần chúng ta quan tâm là đoạn từ A đến G:
  * A: Frame sync, giá trị cố định `11111111111` (11 bits), là dấu hiệu nhận biết điểm khởi đầu của một frame
  * B và C: phiên bản MPEG và mô tả Layer của frame. Do chúng ta đang xử lí các file MP3 a.k.a. MPEGv1 Layer III nên cần tìm B=`11` và C=`01`
  * D: 1 bit, cho biết đoạn frame này có chứa CRC hay không (để kiểm tra tính toàn vẹn của frame)
  * E: 4 bits, index đến [bảng bit rate](http://www.mp3-tech.org/programmer/frame_header.html)
  * F: 2 bits, index đến [bảng sampling rate](http://www.mp3-tech.org/programmer/frame_header.html). Thuật ngữ này nói về việc mỗi giây âm thanh được ghi âm bởi bao nhiêu mẫu - sample, cho biết mức độ chi tiết của âm thanh. Ví dụ con số này đối với các file mp3 phổ thông là 44100Hz, còn đĩa CD là 48000Hz.
  * G: 1 bit, cho biết frame có được nối - padding thêm 1 bytes hay không, dùng để bảo đảm frame có độ dài khớp với bitrate khai báo.

Tổng độ dài của frame sẽ được tính theo công thức:
```
Frame Size = int( (Samples Per Frame / 8 * Bitrate) / Sampling Rate) + Padding Size
```

Cả hai file lỗi tôi nhận được đều là MP3 128Kbps 44100Hz không có CRC, vì thế nên các đoạn frame header cần tìm có dạng `11111111 11111011 10010000 = 0xff 0xfb 0x90` hoặc `11111111 11111011 10010010 = 0xff 0xfb 0x92`. Theo công thức ở trên ta cũng tính được độ dài của mỗi frame là 417 bytes (không padding) và 418 bytes (có padding).

Áp dụng thuật toán lên file "yeu 5 - rhymastic ( darrys flip_ ).mp3", tôi định vị được frame header đầu tiên (`0xff 0xfb 0x90 0x00`).
    
![](https://images.viblo.asia/1597585a-7392-42b4-8fa6-6a7e631946b7.jpg)

Liên sau đó 32 bytes `0x00` là chuỗi `0x49 0x6e 0x66 0x6f` (**Info**).

![](https://images.viblo.asia/d40aefad-9625-415f-9c70-0b89474c45df.jpg)

Đây chính là Xing header của file, chuỗi Info cho thấy đây là một file CBR (trường hợp dễ). Dựa vào [bài viết của Gabriel Bouvigne](http://gabriel.mp3-tech.org/mp3infotag.html#versionstring) và một [bài viết khác rất chi tiết của Konrad Windszus](https://www.codeproject.com/Articles/8295/MPEG-Audio-Frame-Header#SideInfo), tôi trích xuất được thêm các thông tin sau:

  * Header tag: `0x49 0x6e 0x66 0x6f` (Info)
  * Header flags: `0x00 0x00 0x00 0x0f`, nghĩa là cả 4 trường **frames count**, **bytes count**, **TOC** và **Quality indicator** đều được khai báo trong header này.
  * Vì thế nên frames count chắc chắn sẽ nằm ở vị trí 8 bytes, tức là ngay sau header flags. Ta thu được `0x00 0x00 0x17 0x40`, tức **5952 frames** được khai báo

Như vậy chỉ cần cắt bỏ bất kì audio frame nào xuất hiện sau frame thứ 5952 là ta sẽ trả file mp3 về nguyên trạng, khớp với thông tin khai báo trong Xing Header ! Tada !

![https://tenor.com/view/pgt-vape-surprise-emerge-gif-11624869.gif](https://tenor.com/view/pgt-vape-surprise-emerge-gif-11624869.gif)

## Kết

Phần hay ho đã hết giờ chỉ còn phần nhàm chán: viết mã :grin: Source code của chương trình tôi viết bằng Go có thể tải ở đây (fix.go - *đang cập nhật*). Vì là POC nên tôi chỉ xử lí các file CBR 128Kbps 44100Hz, các trường hợp khác có thể phát triển thêm dựa vào bảng index tôi dẫn ở phần trên. Tuy nhiên chỉ nhiêu đó thôi là đủ để giải quyết vấn đề của bạn trẻ kia rồi nên tôi quyết định dừng lại.

Hi vọng qua bài viết này tôi đã giúp các bạn phần nào có thêm thông tin về định dạng mp3. Ở đây có một điều may mắn là tôi mới chỉ xử lí metadata chứ chưa thực sự decode dữ liệu âm thanh trong từng audio frame mà đã giải quyết được vấn đề rồi nên chưa có cơ hội để "làm bài sao" :grin: Một ngày nào đó rảnh rỗi nhất định tôi sẽ thử !