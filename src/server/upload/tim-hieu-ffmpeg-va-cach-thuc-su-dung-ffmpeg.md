> *Có những lúc download video hoặc âm thanh từ trên mạng về mà máy mình lại không thể xem được. Sử dụng các phần mềm đao to búa lớn để xem được hoặc nghe được có khi trầy trật.* .
# Bạn đã nghe đến FFMPEG bao giờ chưa?
FFmpeg là một framework miễn phí hàng đầu về xử lý multimedia bao gồm: encode (mã hóa), decode (giải mã), transcode (chuyển mã), mux (ghép kênh), demux (tách kênh), stream, filter, play v...v...
FFMpeg hỗ trợ hầu hết các định dạng và chạy trên nhiều nền tảng như Linux, Mac OS X, Windows, BSD, Solaris, ...
Các thư viện mà ffmpeg sử dụng bao gồm: libavcodec, libavutil, libavformat, libavfilter, libavdevice, libswscale và libswresample. Các option để sử dụng tương ứng cũng sẽ có fmpeg, ffserver, ffplay và ffprobe được sử dụng để transcoding, streaming và playing. FFmpeg là phần mềm đơn giản, dễ sử dụng và hiệu quả khi xử lý audio, video cho những mục đích cá nhân.
**Cách cài đặt ffmpeg**
Step 1 – Setup FFmpeg PPA
```
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
```
Step 2 – Install FFmpeg on Ubuntu
```
sudo apt-get update
sudo apt-get install ffmpeg
```
Step 3 – Check FFmpeg Version
```
ffmpeg -version

ffmpeg version 4.0.3-1~18.04.york0 Copyright (c) 2000-2018 the FFmpeg developers
built with gcc 7 (Ubuntu 7.3.0-27ubuntu1~18.04)
...
```
Step 4 – FFmpeg Basic Commands
```
ffmpeg -version:            show version
ffmpeg -formats:            show available formats
ffmpeg -codecs:             show available codecs
ffmpeg -decoders:           show available decoders
ffmpeg -encoders:           show available encoders
ffmpeg -bsfs:               show available bit stream filters
ffmpeg -protocols:          show available protocols
ffmpeg -filters:            show available filters
ffmpeg -pix_fmts:           show available pixel formats
ffmpeg -layouts:            show standard channel layouts
ffmpeg -sample_fmts:        show available audio sample formats
```
Step 5 – Basic Examples
Reduce .mov File Size:
```
ffmpeg -i in.mov -c:v libx264 -c:a copy -crf 20 out.mov
```
Convert .move To .mp4
```
ffmpeg -i in.mov -vcodec copy -acodec aac -strict experimental -ab 128k out.mp4
```
![](https://images.viblo.asia/b544d917-dbd2-43c5-aaa9-ffbdad6cbefb.jpg)
###  FFMpeg - Tiện ích trên command line để chuyển đổi định dạng tập tin
Các thông số và ý nghĩa
```
+ i : đầu vào input
+ f : định dạng format
+ vn : vô hiệu hóa việc recoding video trong quá trình chuyển đổi
+ ar : cài đặt thông số tần số lấy mẫu của audio (sample rate)
+ ac : cài đặt số kênh (channel) của audio
+ ab : cài đặt audio bitrate
+ vf : cài đặt bộ lọc video (video filter)
```
Một số câu lệnh FFMPEG đơn giản:
Chuyển đổi 1 folder ảnh ( các file ảnh đặt tên là img1.jpg, img2.jpg .... tăng dần) thành video hoặc ngược lại, tách video thành các frame ảnh
```
ffmpeg -f image2 -i img%d.png video.mp4
ffmpeg -i video.mp4 image%d.png
```
Đổi định dạng video ví dụ từ .flv sang .mp4. Tuy nhiên phần này có nhiều cách để tìm hiểu như: codec của video đó là gì? sử dụng card rời để tăng tốc encode lại video hay như các loại đuôi và ý nghĩa như nào để chúng ta chuyển phù hợp.
```
ffmpeg -i video_input.flv video_output.mp4
```
Nếu bạn lười cắt các đoạn ngắn video mà cần sử dụng 1 phần mềm thứ 3 thì có thể sử dụng như sau
```
ffmpeg -i video.mp4 -ss 00:00:50 -t 00:01:00 -c copy -a copy short.mp4
```
Đây là cách cắt từ giây thứ 50 đến giây thứ 60 của video và giữ nguyên codec âm thanh + video mà không encode lại.

Một số các tip trick mình đã tìm hiểu và chia sẻ với mọi người khi sử dụng ffmpeg
Nvidia Support	
```
ffmpeg -hwaccel cuvid -c:v h264_cuvid -i input.mp4 -c:v h264_nvenc -preset slow output.mkv
```
Resize video
```
ffmpeg -i test.mp4 -vf scale=854:480 output.mp4
```
Crack audio
```
ffmpeg -i file_input.mp3 -af "pan=stereo|c0<c0+0*c1|c1<c0+0*c1,aeval=val(0)|-val(1)" output.mp3
or
ffmpeg -i file_input.mp3 -af "pan=stereo|c0<0*c0+c1|c1<0*c0+c1,aeval=-val(0)|val(1)" output.mp3"
```

mp3 + image = video
```
ffmpeg -loop 1 -i 001.jpg -i 001.mp3 -c:v libx264 -tune stillimage -c:a aac -strict experimental -b:a 192k -pix_fmt yuv420p -shortest 001-out.mp4
```
Merge video
```
#input.txt
file 'in1.mp4'
file 'in2.mp4'
file 'in3.mp4'
file 'in4.mp4'
#ffmpeg -f concat -i input.txt -c copy output.mp4
```
Merge video (Ts/mpg)	
```
ffmpeg -i "concat:input1.mpg|input2.mpg|input3.mpg" -c copy output.mpg
```

Remove sound	
```
ffmpeg -i example.mkv -c copy -an example-nosound.mkv
```
Add audio to video
```
ffmpeg -i nosound.mp4 -i song.mp3 -ss 00:00:00 -to 00:02:34 -c:v copy -c:a aac -strict experimental output.mp4
```
Stream video to youtube	
```
ffmpeg -re -stream_loop -1 -i "Solo Shang  6.mp4" -deinterlace -c copy -r 30 -g 60 -threads 1 -bufsize 4500k -f flv "rtmp://a.rtmp.youtube.com/live2/{KEY}"
```
Tăng giảm bitrate	
```
ffmpeg -i input.mp4 -vcodec libx264 -crf 20 output.mp4
```
Crop size bất kỳ 
```
ffmpeg -i "input.mp4" -ss 00:01:00 -to 00:01:34 -filter:v "crop=884:592:300:60" -c:a copy out4.mp4
```
Crop video lấy 50% giữa	
```
ffmpeg -i "input.mp4" -ss 00:01:00 -to 00:01:34 -filter:v "crop=in_w/2:in_h:in_w/4:0" -c:a copy out5.mp4
```
Cám ơn các bạn đã theo dõi bài viết
Bài viết sử dụng dữ liệu từ : https://www.ffmpeg.org/documentation.html