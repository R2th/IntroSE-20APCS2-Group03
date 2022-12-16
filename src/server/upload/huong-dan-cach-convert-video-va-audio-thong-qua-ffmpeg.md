![](https://images.viblo.asia/3b795034-484c-4906-916d-b5e47abe261e.png)

Công việc chuyển đổi định dạng các file video và audio sang các định dạng khác nhau theo yêu cầu của khách hàng hay bạn bè nhờ vả.
Anh chị em trong ngành công nghệ thông tin nói chung hay được nhờ vả lắm.
Tại sao lại thế nhỉ?
Đơn giản vì các bạn học ngành khác luôn coi học ngành IT là biết tuốt, nên những việc đơn giản như cài win, diệt virus, tạo video gì đó đều được nhờ.


Đặc biệt mình cũng gặp các bạn ngành khác nhờ mình chuyển đổi video hay file audio sang các dạng khác nhau.
Đợt trước mình thường hay dùng các tool có sắn trên mạng, nó build sẵn UI mình chỉ việc download về dùng.
Đặc thù ở Việt Nam cái gì có bản quyền đều dùng crack hết @@

Haizz, dùng crack nhiều thành ra phổ biển và ai cũng mặc định là muốn dùng free mà không suy nghĩ gì.
Nhưng vấn đề ở đây cực kỳ nghiêm trọng, vì sao ư?

Bạn tìm crack các phần mềm khác nhau hay đơn giản như xem bóng đá Asiad chui của một kênh livestream nào đó vô tình đã cố súy cho hành vi ăn cắp chất xám và vi phạm bản quyền nghiêm trọng rồi.
Chúng ta sống ở Việt Nam thì vấn đề này không được coi trọng, nhưng thực chất đó là hành vi cực kỳ nguy hiểm chẳng khác nào cổ súy cho hành vi trộm cắp cả. @@ :(


Nói thế để các bạn biết mình đã rút ra kinh nghiệm khi dùng crack rồi, vì không chỉ là vấn đề bản quyền mà còn là vấn đề dùng crack dễ bị hacker lợi dụng để thực hiện ý đồ xấu.


Dài dòng thế đủ rồi :D
Bài viết này mình xin giới thiệu một tool convert video và audio sang định dạng khác hoàn toàn miễn phí,
bạn không phải lo vấn đề bản quyền hay đạo đức khi dùng tool này cả.

### Giới thiệu FFmpeg

Đó là  **[FFmpeg](https://www.ffmpeg.org/)** một mã nguồn mở viết bằng ngôn ngữ C hoàn toàn miễn phí, cộng đồng phát triển và support từ mã nguồn này cực lớn, đa số các tool convert có tính phí hiện nay đều dùng core là FFmpeg. FFmpeg hỗ trợ đa nền tảng như windows, linux, Mac OSX, ...


### Cài đặt và cách sử dụng FFmpeg
Ở đây mình xin nói qua về cách cài đặt trên 3 hệ điều hành phổ biến gồm: Windows, Linux và Mac OSX.

#### Hệ điều hành Windows

##### Cài đặt

https://www.ffmpeg.org/download.html#build-windows

Các bạn vào mục [download](https://www.ffmpeg.org/download.html) trên trang chủ của FFmpeg tại [đây](https://ffmpeg.org/releases/ffmpeg-4.0.2.tar.bz2) sau đó tải về.

![](https://images.viblo.asia/a29dbc81-0b27-48da-a970-f78eb6beef21.png)

Sau khi download về, các bạn giải nén ra trên máy tính của mình, sau đó thiết lập FFmpeg là một biến môi trường như sau.
Bạn vào mục Advanced systems settings => Enviroment Variables => Path => Điền đường link đến thưc mục vừa giải nén nhé.

![](https://images.viblo.asia/92427710-8bff-4236-9d44-4ea4d5def0bb.png)


##### Cách sử dụng
Sau khi hoàn thành bước trên các bạn tiếng hành convert video và audio theo ý mình thôi.
Mở command line lên và convert theo ý mình thôi. Chạy lệnh cực kỳ nhanh.
```
ffmpeg -i input.avi -b:v 64k -bufsize 64k output.avi
```

Giả sử convert từ file .flv sang file mp4 ta dùng lệnh sau:
```
ffmpeg -i video.flv video.mpeg
```

Muốn xem thông tin video thì mình dùng lệnh sau:
```
ffmpeg -i video.mp4
```

Kết quả sẽ như sau:

```
ffmpeg version 3.3 Copyright (c) 2000-2017 the FFmpeg developers
 built with gcc 6.3.1 (GCC) 20170306
 configuration: --prefix=/usr --disable-debug --disable-static --disable-stripping --enable-avisynth --enable-avresample --enable-fontconfig --enable-gmp --enable-gnutls --enable-gpl --enable-ladspa --enable-libass --enable-libbluray --enable-libfreetype --enable-libfribidi --enable-libgsm --enable-libiec61883 --enable-libmodplug --enable-libmp3lame --enable-libopencore_amrnb --enable-libopencore_amrwb --enable-libopenjpeg --enable-libopus --enable-libpulse --enable-libschroedinger --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxvid --enable-netcdf --enable-shared --enable-version3
 libavutil 55. 58.100 / 55. 58.100
 libavcodec 57. 89.100 / 57. 89.100
 libavformat 57. 71.100 / 57. 71.100
 libavdevice 57. 6.100 / 57. 6.100
 libavfilter 6. 82.100 / 6. 82.100
 libavresample 3. 5. 0 / 3. 5. 0
 libswscale 4. 6.100 / 4. 6.100
 libswresample 2. 7.100 / 2. 7.100
 libpostproc 54. 5.100 / 54. 5.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'video.mp4':
 Metadata:
 major_brand : isom
 minor_version : 512
 compatible_brands: isomiso2avc1mp41
 encoder : Lavf57.22.100
 Duration: 00:43:18.69, start: 0.000000, bitrate: 1039 kb/s
 Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1280x714 [SAR 1071:1072 DAR 120:67], 899 kb/s, 23.98 fps, 23.98 tbr, 24k tbn, 47.95 tbc (default)
 Metadata:
 handler_name : VideoHandler
 Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 132 kb/s (default)
 Metadata:
 handler_name : SoundHandler
At least one output file must be specified
```

Muốn tìm hiểu sâu hơn các bạn có thể đọc tại doc của FFmpeg: https://ffmpeg.org/ffmpeg.html

Quy trình tạo ra file video or audio như sau:

![](https://images.viblo.asia/36933eb2-f095-41de-879f-baa9334ab52e.png)


#### Hệ điều hành Linux

##### Cài đặt
https://www.ffmpeg.org/download.html#build-linux
- Với Ubuntu dùng các lệnh sau:

```
sudo apt-get install ffmpeg
sudo add-apt-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get dist-upgrade
```
- Với Fedora, RHEL, CentOS dùng các lệnh sau:

```
sudo yum install epel-release

// Fedora 22 and later:
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

// RHEL 6.x, CentOS 6.x:
sudo yum localinstall --nogpgcheck https://download1.rpmfusion.org/free/el/rpmfusion-free-release-6.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-6.noarch.rpm

// RHEL 7.x, CentOS 7.x:
sudo yum localinstall --nogpgcheck https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-7.noarch.rpm


sudo yum install ffmpeg ffmpeg-devel
```

Mở terminal lên ta gõ lệnh `ffmpeg`
kêt quả:
```
ffmpeg version 3.3 Copyright (c) 2000-2017 the FFmpeg developers
 built with gcc 6.3.1 (GCC) 20170306
 configuration: --prefix=/usr --disable-debug --disable-static --disable-stripping --enable-avisynth --enable-avresample --enable-fontconfig --enable-gmp --enable-gnutls --enable-gpl --enable-ladspa --enable-libass --enable-libbluray --enable-libfreetype --enable-libfribidi --enable-libgsm --enable-libiec61883 --enable-libmodplug --enable-libmp3lame --enable-libopencore_amrnb --enable-libopencore_amrwb --enable-libopenjpeg --enable-libopus --enable-libpulse --enable-libschroedinger --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libv4l2 --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxvid --enable-netcdf --enable-shared --enable-version3
 libavutil 55. 58.100 / 55. 58.100
 libavcodec 57. 89.100 / 57. 89.100
 libavformat 57. 71.100 / 57. 71.100
 libavdevice 57. 6.100 / 57. 6.100
 libavfilter 6. 82.100 / 6. 82.100
 libavresample 3. 5. 0 / 3. 5. 0
 libswscale 4. 6.100 / 4. 6.100
 libswresample 2. 7.100 / 2. 7.100
 libpostproc 54. 5.100 / 54. 5.100
Hyper fast Audio and Video encoder
usage: ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...

Use -h to get full help or, even better, run 'man ffmpeg'
```

##### Cách sử dụng
Cách sử dụng tương tự như dùng command trên Windows thôi

```
ffmpeg -i video.flv video.mpeg
```
Và kết quả sẽ hiện ra cho chúng ta test thôi. :D

#### Hệ điều hành Mac OS
https://www.ffmpeg.org/download.html#build-mac

Trên MacOS cài rất đơn giản, bạn chỉ cần dùng lệnh
```
brew install ffmpeg
```
Việc sử dụng ffmpeg cũng giống với hệ điều hành windows và linux thôi :)

```
ffmpeg -i file_example_OOG_1MG.ogg test_file.wav
```

![](https://images.viblo.asia/2a6a0d83-688d-4bdf-9588-e06b0feeccf7.png)


### Ngôn ngữ lập trình với FFmpeg

Ngoài ra các ngôn ngữ lập trình cũng có các package hỗ trợ convert video và audio dùng trên tool này như: PHP, Java, Ruby,...

Ví dụ một vài package phổ biến như sau:
- PHP https://github.com/PHP-FFMpeg/PHP-FFMpeg
- Java https://github.com/bramp/ffmpeg-cli-wrapper
- Ruby https://github.com/streamio/streamio-ffmpeg



> **FFmpeg không chỉ convert video và audio đâu nhé, cả các dạng file ảnh đều convert được hết và chạy thì cực nhẹ**

Từ giờ trở đi các bạn FA nếu được các bạn nữ nhờ vả thì có bí kíp này rồi cứ nhiệt tình support đi nhé, biết đâu lại có gấu nhờ sự trợ giúp của tool FFmpeg =))

#### Tham khảo
- https://ffmpeg.org/
- https://ffmpeg.org/ffmpeg.html
- https://www.ostechnix.com/20-ffmpeg-commands-beginners/
- https://www.ostechnix.com/install-ffmpeg-linux/