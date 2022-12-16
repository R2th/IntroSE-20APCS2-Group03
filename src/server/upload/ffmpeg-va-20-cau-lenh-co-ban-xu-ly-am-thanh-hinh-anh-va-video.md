![](https://images.viblo.asia/b7aeed06-f350-46ac-bea3-b869ca616e0d.png)

# FFmpeg là gì?

FFmpeg là một dự án phần mềm miễn phí bao gồm một bộ phần mềm khổng lồ gồm các thư viện và chương trình để xử lý video, audio, multimedia files và streams. Cốt lõi của nó là chính chương trình FFmpeg, được thiết kế để xử lý các video và audio dựa trên command line và được sử dụng rộng rãi để  chuyển đổi định dạng, chỉnh sửa cơ bản (cắt và ghép), chia tỷ lệ video, hiệu ứng hậu kỳ video. FFmpeg được xuất bản theo Giấy phép [GNU Lesser General Public License](https://en.wikipedia.org/wiki/GNU_Lesser_General_Public_License) 2.1+ hay [GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) 2+ (dựa theo option nào được enabled).

Tên của dự án được lấy cảm hứng từ chuẩn video MPEG,  "FF" viết tắt của "fast forward ". Logo sử dụng mô hình ngoằn ngoèo cho thấy cách các MPEG video codecs xử lý  [entropy encoding](https://en.wikipedia.org/wiki/Entropy_encoding).

FFmpeg là được ứng dụng rất nhiều trong các phần mềm xử lý audio và video, thư viện của nó là thành phần core của ứng dụng media player như VLC , cũng là thành phần core trong quá trình xử lý video của YouTube và iTunes khi lưu trữ file. 

# Cài đặt FFmpeg

## Cài đặt trên Ubuntu

```bash
sudo apt-get install ffmpeg
```

## Cài đặt trên  Mac sử dụng Homebrew

```bash
brew install ffmpeg
```

## Cài đặt trên Windows

Trên windows, tải gói phần mềm ffmpeg tại đây: [FFmpeg Downloads](https://www.ffmpeg.org/download.html#build-windows).

Sau khi tải, giải nén ra bạn sẽ có file `ffmpeg.exe`.

Ở windows bạn có thể chạy ffmpeg thông qua command line sử dụng bash hoặc powershell, sử dụng các tham số giống với trên Ubuntu và Mac.

VD: Convert video file mp4 thành mp3 

```bash
.\ffmpeg.exe -i video.mp4 audio.mp3
```

Input là file video.mp4, còn output là file audio.mp3

# 20 câu lệnh FFmpeg cơ bản xử lý âm thanh, hình ảnh và video

Cú pháp cơ bản của một câu lệnh FFmepg:

```bash
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...
```

Sau đây sẽ là một số câu lệnh FFmpeg quan trọng và hữu ích.

## 1. Xem thông tin file

```bash
ffmpeg -i video.mp4
```

**Output**
```bash
ffmpeg version N-93077-g075fd5ba45 Copyright (c) 2000-2019 the FFmpeg developers
  built with gcc 8.2.1 (GCC) 20181201
  configuration: --enable-gpl --enable-version3 --enable-sdl2 --enable-fontconfig --enable-gnutls --enable-iconv --enable-libass --enable-libdav1d --enable-libbluray --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-libopus --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libtheora --enable-libtwolame --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2 --enable-libzimg --enable-lzma --enable-zlib --enable-gmp --enable-libvidstab --enable-libvorbis --enable-libvo-amrwbenc --enable-libmysofa --enable-libspeex --enable-libxvid --enable-libaom --enable-libmfx --enable-amf --enable-ffnvcodec --enable-cuvid --enable-d3d11va --enable-nvenc --enable-nvdec --enable-dxva2 --enable-avisynth --enable-libopenmpt
  libavutil      56. 26.100 / 56. 26.100
  libavcodec     58. 46.100 / 58. 46.100
  libavformat    58. 26.100 / 58. 26.100
  libavdevice    58.  6.101 / 58.  6.101
  libavfilter     7. 48.100 /  7. 48.100
  libswscale      5.  4.100 /  5.  4.100
  libswresample   3.  4.100 /  3.  4.100
  libpostproc    55.  4.100 / 55.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'output.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.26.100
  Duration: 00:00:29.96, start: 0.000000, bitrate: 545 kb/s
    Stream #0:0(und): Video: h264 (Constrained Baseline) (avc1 / 0x31637661), yuv420p, 590x394 [SAR 1:1 DAR 295:197], 218 kb/s, 25 fps, 25 tbr, 12800 tbn, 50 tbc (default)
    Metadata:
      handler_name    : VideoHandler
    Stream #0:1(und): Audio: mp3 (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 320 kb/s (default)
    Metadata:
      handler_name    : SoundHandler
At least one output file must be specified
```

Nếu không muốn xem FFmpeg banner và thông tin khác, bạn thêm tham số `-hide_banner`

```bash
ffmpeg -i video.mp4 -hide_banner
```

**Output**

```bash
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'output.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.26.100
  Duration: 00:00:29.96, start: 0.000000, bitrate: 545 kb/s
    Stream #0:0(und): Video: h264 (Constrained Baseline) (avc1 / 0x31637661), yuv420p, 590x394 [SAR 1:1 DAR 295:197], 218 kb/s, 25 fps, 25 tbr, 12800 tbn, 50 tbc (default)
    Metadata:
      handler_name    : VideoHandler
    Stream #0:1(und): Audio: mp3 (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 320 kb/s (default)
    Metadata:
      handler_name    : SoundHandler
At least one output file must be specified
```

## 2. Convert sang định dạng khác

FFmpeg là trình convert audio và video mạnh mẽ, do đó, nó có thể convert các multimedia files thành các định dạng khác nhau . 

Ví dụ, convert file `mp4` thành `avi`:
```bash
fmpeg -i video.mp4 video.avi
```

Tương tự, bạn có thể convert thành các định dạng khác.

Convert flv sang mpeg:

```bash
ffmpeg -i video.flv video.mpeg
```

Convert `flv` sang `mpeg`:

```bash
ffmpeg -i video.flv video.mpeg
```

Nếu bạn muốn giữ chất lượng của video, hãy sử dụng tham số `-qscale 0`.

```bash
ffmpeg -i input.webm -qscale 0 output.mp4
```

Convert nhạc `mp3` sang `wma`:

```bash
ffmpeg -i audio.mp3 audio.wma
```

Convert ảnh `png` sang `jpg`:

```bash
ffmpeg -i image.png audio.jpg
```

....

Để kiểm tra danh sách các định dạng được hỗ trợ bởi FFmpeg, chạy:

```
ffmpeg -formats
```

FFmpeg hỗ trợ rất nhiều định dạng, vì vậy mình sẽ không show ouput ở đây.

## 3. Convert video sang audio

Để convert file video sang âm thanh, chỉ cần chỉ định định dạng output là .mp3 hoặc .ogg hoặc bất kỳ định dạng âm thanh nào khác.

Command dưới đây sẽ convert video `mp4` sang file âm thanh `mp3`

```bash
ffmpeg -i video.mp4  -vn -ab 320 audio.mp3
```

Ngoài ra có một số tham số khác cũng thường được dùng như sau:

```bash
ffmpeg -i video.mp4  -vn -ar 44100 -ac 2 -ab 320 -f mp3 audio.mp3
```

* -vn - Disable chức nắc video recording trong output file.
* -ar - Tần số âm thanh của output. Các giá trị phổ biến được sử dụng là 22050, 44100, 48000 Hz.
* -ac - Audio channels.
*- ab - Audio bitrate.
*-f - Định dạng output. Trong trường hợp của chúng ta output là mp3.

## 4. Thay đổi độ phân giải video (kích thước video)

Nếu bạn muốn đặt độ phân giải cụ thể cho  video, bạn có thể sử dụng command sau:

```bash
ffmpeg -i input.mp4 -filter:v scale=1280:720 -c:a copy output.mp4
```

Hay

```bash
ffmpeg -i input.mp4 -s 1280x720 -c:a copy output.mp4
```

Câu lệnh phía trên sẽ output ra video với đội phân giải 1280 × 720.

Tương tự, để convert video thành kích thước 640 × 480, chạy:

```bash
ffmpeg -i input.mp4 -filter:v scale=640:480 -c:a copy output.mp4
```

Hay

```bash
ffmpeg -i input.mp4 -s 640x480 -c:a copy output.mp4
```

## 5. Giảm dung lượng/chất lượng video

Bạn muốn giảm dung lượng video để lưu trữ cho đỡ tốn bộ nhớ, command dưới đây sẽ giảm dung lượng của file output

```bash
ffmpeg -i input.mp4 -vf scale=1280:-1 -c:v libx264 -preset veryslow -crf 24 output.mp4
```

Lưu ý rằng chất lượng video sẽ giảm theo, tham số `-crf` càng cao thì chất lượng video càng thấp.

Bạn cũng có thể giảm một chút chất lượng của âm thanh video bằng cách thêm tham số
```bash
-ac 2 -c:a aac -strict -2 -b:a 128k
```

## 6.  Giảm dung lượng/chất lượng audio

Bạn cũng có thể giảm dung lượng file nhạc bằng cách giảm audio bitrate xuống với tham số `-ab`.

Ví dụ bạn đang có file nhạc 320k, bạn giảm xuống 128k:

```bash
ffmpeg -i input.mp3 -ab 128 output.mp3
```

Audio bitrate thông dụng:

1. 96kbps
1. 112kbps
1. 128kbps
1. 160kbps
1. 192kbps
1. 256kbps
1. 320kbps

## 7. Xóa audio stream (xóa nhạc)

Bạn không muốn giữ lại nhạc của video, thêm tham số `-an`

```bash
ffmpeg -i input.mp4 -an output.mp4
```

## 8. Xóa video stream

Tương tự giống xóa audio stream, ta có `-vn` dùng để xóa video stream

```bash
ffmpeg -i input.mp4 -vn output.mp3
```

## 9. Xuất ảnh từ video

Một tính năng khác rất hữu ích của FFmpeg là xuất ảnh từ video. Để xuất ảnh, chúng ta dùng command sau:

```bash
ffmpeg -i input.mp4 -r 1 -f image2 img-%3d.png
```

* -r – Frame rate. Số khung hình trên giây . Mặc định là 25.
* -f – Output format
* image-%2d.png – Tên file output. Trường hợp này các file output sẽ có tên: img-001.png, img-002.png, img-003.png,...

## 10. Thay đổi tỷ lệ khung hình

Thay đổi tỷ lệ khung hình sang 16:9

```bash
ffmpeg -i input.mp4 -aspect 16:9 output.mp4
```

Tỷ lệ khung hình thường dùng

* 16:9
* 4:3
* 16:10
* 5:4
* 2:21:1
* 2:35:1
* 2:39:1

## 11. Convert một phần cụ thể của video

Đôi khi, bạn có thể muốn convert chỉ một phần cụ thể của  video sang định dạng khác. Ví dụ, lệnh sau sẽ convert 50 giây đầu tiên của file video.mp4 định dạng video.avi.

```bash
ffmpeg -i input.mp4  -t 50 output.avi
```

Tham số `-t 50` có nghĩa là lấy 50 giây, bạn cũng có thể truyền vào thời gian với format `hh.mm.ss`

## 12. Tạo video với ảnh và file audio

Trường hợp bạn muốn tạo video với 1 ảnh lặp đi lặp lại, và audio nền, command sẽ đơn giản như sau:

```bash
ffmpeg -loop 1 -i inputimage.jpg -i inputaudio.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest output.mp4
```

## 13. Trim video/audio

Bạn muốn trim video với thời gian bắt đầu là phút thứ 1, thời lượng là 60 giây

```bash
ffmpeg -i input.mp4 -ss 00:01:00 -codec copy -t 60 output.mp4
```

* –s – Thời gian bắt đầu
* -t – Thời lượng

Tương tự với file audio

```bash
ffmpeg -i audio.mp3 -ss 00:01:54 -to 00:06:53 -c copy output.mp3
```

## 14. Chia video thành nhiều phần

Một số website chỉ cho phép upload video với thời lượng nhất định, bạn có thể chia nó thành nhiều phần như sau:

```bash
ffmpeg -i input.mp4 -t 00:00:30 -c copy part1.mp4 -ss 00:00:30 -codec copy part2.mp4
```

Ở đây, `-t 00:00:30` nghĩa là part 1 của video sẽ kéo dài 30 giây. `-ss 00:00:30` là thời gian bwats đầu cho phần tiếp theo. Điều đó có nghĩa là part 2 sẽ bắt đầu từ giây thứ 30 và sẽ tiếp tục cho đến hết video.

## 15. Nối nhiều video thành một

FFmpeg cũng có thể nối nhiều video thành một.

Đầu tiên, chúng ta sẽ tạo file `video.txt` với nội dung:

```
file 'part1.mp4'
file 'part2.mp4'
```

Trong đó `part1.mp4` và `part2.mp4` là đường dẫn tới file muốn nối. Sau đó nối video bằng command:

```bash
ffmpeg -f concat -i video.txt -c copy output.mp4
```

Tương tự ta cũng có thể làm với audio.

## 16. Thêm subtitle cho video

Chúng ta có file sub với nội dung như sau, tên file `subtitle.srt`:

```
1
00:00:00,498 --> 00:00:02,827
- Here's what I love most
about food and diet.

2
00:00:02,827 --> 00:00:06,383
We all eat several times a day,
and we're totally in charge

3
00:00:06,383 --> 00:00:09,427
of what goes on our plate
and what stays off.
```

Sử dụng command sau để thêm sub cho video:

```bash
fmpeg -vf subtitles=subtitle.srt output.mp4
```

## 17. Xem, test file video và audio

Xem video

```bash
ffplay video.mp4
```

![](https://images.viblo.asia/fda0d503-e157-4df4-b43a-2598d8daea10.PNG)https://images.viblo.asia/fda0d503-e157-4df4-b43a-2598d8daea10.PNG

Xem file audio

```bash
ffplay audio.mp3
```

![](https://images.viblo.asia/b677f340-504b-4e80-bb28-b58c263460e7.PNG)https://images.viblo.asia/b677f340-504b-4e80-bb28-b58c263460e7.PNG

## 18. Tăng giảm tốc độ phát video

FFmpeg cho phép bạn thay đổi tốc độ phát video, ví dụ để tăng tốc độ phát:

```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
```

Giảm tốc độ phát

```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
```

## 19. Live stream video
Bạn có thể live stream một video, ví dụ mình live stream trên youtube

```bash
 ffmpeg -re -i output.mp4 -f flv rtmp://a.rtmp.youtube.com/live2/{stream_key}
 ```
 
* -f - Định dạng output. Dùng để live stream trên youtube hay để flv
* rtmp://a.rtmp.youtube.com/live2/{stream_key} - Stream url

## 20. Xem thông tin về phiên bản FFmpeg, hướng dẫn về các tham số

```bash
ffmpeg.exe -h
```