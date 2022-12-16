# Giới thiệu
Xin chào các bạn hôm nay tôi sẽ cùng các bạn đi tìm hiểu về GStreamer, đây là một trong những chủ đề được thầy tôi gợi ý để tìm hiểu khi còn học đại học và hôm nay tôi mới có thời gian để tìm hiểu. 

Đầu tiên chúng ta cần biết GStreamer là gì?

Theo trang chủ của GStreamer tại [đây](https://gstreamer.freedesktop.org/documentation/application-development/introduction/gstreamer.html?gi-language=c) 
> GStreamer is a framework for creating streaming media applications.

Có thể hiểu GStreamer là một framework cho phép chúng ta có thể tạo ra các ứng dụng đa phương tiện (multimedia). Một trong số các ứng dụng multimedia có thể kể đến là: Trình phát video và nhạc (media player), Streaming server, ứng dụng chỉnh sửa video (Video editor) hoặc có thể kể đến một ứng dụng hỗ trợ chat video đang được sử dụng rất nhiều trong thời gian Covid-19 ( ví dụ như Google meet, Microsoft Team...) thì GStreamer cũng có thể dùng để tạo ra được những ứng dụng tương tự như vậy.
# Kiến trúc
![](https://i.imgur.com/y81TLQ7.png)
Hình phía trên mô tả về GStreamer với các phần:
* Multimedia applications
* GStreamer tools
* GStreamer core famework

Với phần **Multimedia application** thì tôi đã nói qua ở phần giới thiệu về GStreamer thì đây là các ứng dụng phổ biến có thể dùng GStreamer để tạo ra (Media player, VoIP & Video conferencing, Streaming server, Video editor)

Phần **GStreamer tools**: đây là các công cụ mà GStreamer cunng cấp để khởi chạy các ứng dụng được tạo thành bởi nó, Tùy thuộc vào loại ứng dụng là gì, ta sẽ dùng tools phù hợp nhất.

Phần **GStreamer core framework** chỉ ra các thành phần mà GStreamer cung cấp để tạo ra một ứng dụng multimedia. Với GStreamer, Ứng dụng sẽ được tạo ra dựa trên kiến trúc đường ống (pipeline) mỗi thành phần của pipeline sẽ đảm nhiệm một nhiệm vụ cụ thể. GStreamer cung cấp tới hơn 250 plugins nhằm tạo ra sự đa dạng trong cách tạo ứng dụng. Chúng ta có thể tùy ý lựa chọn các plugins thích hợp sau đó ghép nối chúng lại với nhau để tạo ra một pipeline phục vụ một ứng dụng cụ thể.

Các Plugins mà GStreamer cung cấp có thể được chia thành 6 loại chính là:
* Protocols Handling
* Sources: for audio and video (involves protocol plugins)
* Formats: parsers, formaters, muxers, demuxers, metadata, subtitles
* Codecs: coders and decoders
* Filters: converters, mixers, effects, ...
* Sinks: for audio and video (involves protocol plugins)

Ngoài 6 loại plugins chính đề cập ở trên ta để ý còn có **3rd party plugins** hiểu đơn giản GStreamer cho phép các nhà phát triển tự tạo ra 1 custuom plugin với chức năng mà người dùng tự nghĩ ra. Nói đến việc tận dụng GStreamer để phát triển các plugins thì phải nói đến [DeepStream](https://developer.nvidia.com/deepstream-sdk) của NVIDIA. DeepStream được dựa trên GStreamer và được phát triển thêm các plugins về xử lý video và đặc biệt là các plugins về Trí tuệ nhân tạo AI, nó giúp xây dựng các ứng dụng phân tích video thông minh và tốc độ xử lý có thể đạt đến thời gian thực trên nhiều camera. Chi tiết về DeepStream là gì thì các bạn có thể tự tìm hiểu. Hi vọng trong tương lai tôi có thể ngồi note ra những điều thú vị về Deepstream để vừa ghi lại những gì tìm hiểu được đồng thời có thể giúp bạn đọc có thêm một chút kiến thức gì đó 😂

## Về Pipeline trong GStreamer
Để có thể hiểu hơn về cấu tạo của các thành phần trong pipeline của GStreamer tôi sẽ lấy pipeline dưới đây làm ví dụ:
![](https://i.imgur.com/giaiTNm.png)
Pipeline trên tạo ra một ứng dụng media player khá đơn giản là phát video có tiếng dựa trên file lưu trong máy.
Cùng tôi tìm hiểu pipeline này được xây dựng vào hoạt động như thế nào nhé

Đầu tiên, Pipeline được tạo thành bởi 6 elements lần lượt là: file-source, ogg-demuxer, vorbis-decoder, theora-decoder, audio-sink và video-sink. Các elements này thuộc về các loại Plugins là:
* **Sources**: Element *file-source* thuộc loại plugins Source với nhiệm vụ lấy và gửi luồng dữ liệu của file videos lưu trong ổ cứng đến các elements tiếp theo trong pipeline.
* **Formats**: Element *Ogg-demuxer* thuộc loại plugins Formats, elements này có tác dụng phân chia (demux) luồng dữ liệu được gửi đến từ *file-source* thành 2 luồng dữ liệu bao gồm luồng dữ liệu về hình ảnh (trên hình là *src_02*) và luồng dữ liệu về âm thanh (trên hình là *src_01*)
* **Codec**: Hai elements *Vorbis-decoder* và *Theora-decoder*  thuộc loại plugins *Codec* với tác dụng giải mã (decode) luồng dữ liệu được gửi từ *ogg-demuxer* thành âm thanh và hình ảnh tương ứng. *theora-decoder* thì chịu trách nhiệm giải mã luồng dữ liệu thành các khung hình của video, còn *vorbis-decoder* chịu trách nhiệm giải mã luồn dữ liệu thành âm thanh của video.
* **Sink**: Hai elements *video-sink* và *audio-sink* thuộc loại plugins *sink* với tác dụng đưa  những dữ liệu vào các elements trước đã decode đến vơi người dùng, hay nói cách khác chính là phát audio ra loa và hiển thị khung hình video lên màn hình.
## Cấu tạo các elements trong pipeline
Một Element của GStreamer thường được cấu tạo bởi các **pad** như hình dưới đây:

![](https://i.imgur.com/UUVWf7J.png)

Các **Pad** được hiểu ra các ngõ vào ra của dữ liệu. **Sink pad** là ngõ vào dữ liệu của 1 Element, **Source Pad** là ngõ ra của dữ liệu sau quá trình xử lý của Element.


-----


Các Elements của GStreamer được chia thành 3 loại dựa trên đặc điểm cấu tạo của nó:

Loại thứ nhất là **Source element**

![](https://i.imgur.com/jnRUUkL.png)

Đúng như cái tên của element này, *Source element* có nhiệm vụ tạo dữ liệu sử dụng cho pipeline. *Source element* tạo dữ liệu bằng cách đọc từ các file lưu từ ổ đĩa máy tính, hoặc dữ liệu thu từ sound card của máy tính...
 
 Đặc điểm của **Source element** là chỉ có duy nhất **src pad** do Element này chỉ tạo dữ liệu cho các elements mà không nhận dữ liệu từ đâu cả.
 

-----
Loại thứ hai gồm: Filters, convertors, demuxers, muxers and codecs

Đặc điểm của loại thứ 2 này là các elements sẽ có đầy đủ *src pad* và *sink pad* .Lấy ví dụ về element **Fliter**.

![](https://i.imgur.com/pglqEQV.png)

**Filter** có tác dụng tạo các hiệu ứng lên khung hình của video, element này gồm 2 pad sink và src, nó nhận dữ liệu từ các element khác thông qua sink pad và chuyển tiếp dữ liệu đã qua xử lý tới element tiếp theo thông qua src pad. 

Một ví dụ tiếp nữa là **demuxer** khác với **filter** thì element nay có đến 3 pad bao gồm 1 pad sink và 2 pad src. Lý do bởi chức năng của element này là chia luồng dữ liệu thành 2 phần riêng biệt, như ở trên *ogg-demuxer* có tác dụng chia luồng dữ liệu đầu vào thành 2 luồng dữ liệu về audio và video.

![](https://i.imgur.com/Gi1RJRE.png)


-----


Loại thứ ba là **Sink**
Đây là element nằm cuối pipeline của GStreamer, nó chỉ nhận dữ liệu từ các element phía trước và có nhiệm vụ ghi dữ liệu đó vào ổ đĩa hoặc phát ra loa và đưa hình ảnh lên màn hình.

![](https://i.imgur.com/4D5pyiS.png)



Để đọc chi tiết hơn về các loại elements này thì các bạn vào link này nhé: https://gstreamer.freedesktop.org/documentation/application-development/basics/elements.html?gi-language=c
# Hello world với GStreamer
## Cài đặt GStreamer
Tôi hay làm việc với Linux nên trong bài này tôi sẽ hướng dẫn các bạn cài đặt GStreamer trên Linux nhé. Rất đơn giản các bạn chỉ cần chạy lệnh dưới đây trên terminal
```
apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer-plugins-bad1.0-dev gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio
```
## Xây dựng ứng dụng media player sử dụng GStreamer
Phần này tôi sẽ cùng các bạn tìm hiểu cách code ứng dụng media player đơn giản sử dụng GStreamer. 

Phần code này tôi tham khảo ở tutorial của GStreamer tại link này [Basic tutorial 1: Hello world!](https://gstreamer.freedesktop.org/documentation/tutorials/basic/hello-world.html?gi-language=c)

```c
#include <gst/gst.h>

int
main (int argc, char *argv[])
{
  GstElement *pipeline;
  GstBus *bus;
  GstMessage *msg;

  /* Initialize GStreamer */
  gst_init (&argc, &argv);

  /* Build the pipeline */
  pipeline =
      gst_parse_launch
      ("playbin uri=https://www.freedesktop.org/software/gstreamer-sdk/data/media/sintel_trailer-480p.webm",
      NULL);

  /* Start playing */
  gst_element_set_state (pipeline, GST_STATE_PLAYING);

  /* Wait until error or EOS */
  bus = gst_element_get_bus (pipeline);
  msg =
      gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,
      GST_MESSAGE_ERROR | GST_MESSAGE_EOS);

  /* Free resources */
  if (msg != NULL)
    gst_message_unref (msg);
  gst_object_unref (bus);
  gst_element_set_state (pipeline, GST_STATE_NULL);
  gst_object_unref (pipeline);
  return 0;
}

```
Chi tiết về các đoạn code đã được giải thích rõ ràng ở phần Walkthrough của tutorial. các bạn có thể đọc thêm tại đó nhé.

Để chạy các bạn lưu đoạn code trên dưới tên file là *example.c* complie bằng câu lệnh
```cmd
gcc example.c -o test  `pkg-config --cflags --libs gstreamer-1.0
```
Khi đó các bạn sẽ có 1 file thực thi là test
Để khởi chạy file thực thi thì gõ 
```
./test
```
Và sẽ được kết quả như dưới đây :v 

{@youtube: https://www.youtube.com/watch?v=_OcKrmbZb4E}

# Kết luận

Vậy là trong bài này tôi đã cùng các bạn tìm hiểu sơ qua về các khái niệm cơ bản về GStreamer, GStreamer còn rất nhiều thứ thú vị. Bài viết do tôi tự tìm hiểu và viết lại nên không thể tránh khỏi các sơ xuất. Mọi ý kiến đóng góp các bạn có thể phản hồi lại dưới phần comment hoặc mail cho tôi tại địa chỉ [yoonachien@gmail.com](https://mail.google.com/).

Cảm ơn các bạn đã đọc bài viết của tôi. Nếu thấy thú vị thì đừng ngại ngần để lại cho tôi 1 **upvote** nhé. Cảm ơn các bạn.