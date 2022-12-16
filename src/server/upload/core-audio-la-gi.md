Core Audio là một digital audio infrastructure của iOS và OS X. Nó bao gồm một tập các framework được thiết kế để xử lý âm thanh cho ứng dụng của bạn. Hãy xem xem chúng ta có thể làm được gì với Core Audio nhé.

# Core Audio trong iOS và OS X

Core Audio được tích hợp vào trong iOS và OS X để cung cấp khả năng xử lý với hiệu năng cao và độ trễ thấp.

Trong OS X, phần lớn các service của Core Audio nằm trên Hardware Abstraction Layer (HAL) như hình bên dưới. Tín hiệu audio truyền tới và từ phần cứng đều thông qua HAL. Ta có thể truy cập HAL sử dụng Audio Hardware Services trong Core Audio framework khi cần tới real-time audio. Core MIDI (Musical Instrument Digital Interface) framework cung cấp các interface tương tự để làm việc với dữ liệu và thiết bị MIDI.

![OS X Core Audio Architechture](https://images.viblo.asia/88df6e53-4f84-4980-9bfc-17f1df9bfc0b.png)

Bạn sẽ thấy các service tầng ứng dụng của Core Audio nằm trong Audio Toolbox và Audio Unit framework.
- Sử dụng Audio Queue Services để record, playback, pause, loop và synchronize audio.
- Sử dụng Audio File, Converter, và Codec Services để đọc và ghi từ disk và thực hiện chuyển đổi định dạng audio. Trong OS X bạn có thể tạo ra custom codecs.
- Sử dụng Audio Unit Services và Audio Processing Graph Services để tổ chức các audio unit (hay còn gọi là audio plug-ins) trong ứng dụng. Trong OS X bạn có thể tạo ra các custom audio unit để sử dụng trong ứng dụng của mình hoặc cung cấp cho các ứng dụng khác.
- Sử dụng Music Sequencing Services để play MIDI-based control và music data.
- Sử dụng Core Audio Clock Services cho việc đồng bộ của audio và MIDI, đồng thời quản lý time format.
- Sử dụng System Sound Services để play system sounds và các sound effect.

Core Audio trong iOS được tối ưu để tính toán các tài nguyên có sẵn trong nền tảng mobile chạy bằng pin. Do đó không có API nào cho những services cần phải được quản lý rất chặt chẽ bởi hệ điều hành như HAL và I/O Kit. Tuy nhiên, có một vài services khác thêm vào trong iOS mà không có trên OS X. Ví dụ, Audio Session Services cho phép ta quản lý các audio behavior của những ứng dụng mà chạy trên những thiết bị là mobile hay iPod.

![iOS Core Audio Architecture](https://images.viblo.asia/023a7b57-adcd-464f-bf9c-27e4f7d0a189.png)

## Một chút về Digital Audio và Linear PCM
Phần lớn Core Audio services sử dụng và thao tác với audio ở dạng linear pulse-code-modulated (hay *linear PCM*), định dạng digital audio không nén phổ biến nhất. Digital audio khi record sẽ tạo ra PCM data nhờ vào việc tính toán cường độ tín hiệu audio analog một cách đều đặn (chỉ số *sampling rate* chính là ám chỉ điều này) và chuyển đổi mỗi mẫu (sample) thu được thành một giá trị số.

Standard compact disc (CD) audio sử dụng sampling rate 44.1 kHz với 16-bit integer để thể hiện 1 sample (hay còn gọi là *bit depth*)
- Một *sample* là một giá trị số đơn lẻ cho một channel đơn lẻ.
- Một *frame* là một tập của các mẫu trùng thời gian. Ví dụ, âm thanh stereo có hai channel, do đó luôn có 2 samples mỗi frame, một cái ở left channel và một cái ở right channel, còn âm thanh mono chỉ có 1 channel nên một frame chỉ có 1 sample.
- Một *packet* là một tập bao gồm một hoặc nhiều frame liên tiếp. Trong linear PCM audio, một packet chỉ chưa 1 frame. Trong các định dạng nén khác thì còn tùy. Packet định nghĩa số lượng frame nhỏ nhất cho một định dạng audio.

Trong linear PCM audio, một giá trị sample thay đổi một cách tuyến tính với biên độ của tín hiệu gốc mà nó thể hiện. Ví dụ, các sample 16-bit integer theo chuẩn CD audio cho phép 65,536 giá trị có thể có giữa mức im lặng và mức tối đa. Sự khác biệt trong biên độ từ một giá trị này đến giá trị tiếp theo luôn giống nhau.

Cấu trúc dữ liệu của Core Audio, được khai báo trong `CoreAudioTypes.h` header file, có thể mô tả linear PCM ở bất kì sample rate và bit depth nào. Chúng ta sẽ nói rõ hơn ở trong bài về Audio Data Formats.

Trong OS X, Core Audio expect dữ liệu audio ở dạng native-endian, 32-bit floating-point, linear PCM format. Ta có thể sử dụng Audio Converter Services để translate audio data giữa các phiên bản khác nhau của linear PCM. Ta có thể sử dụng những converter này để translate giữa linear PCM và các định dạng audio nén như MP3 và Apple Lossless. Core Audio trong OSX hỗ trợ codecs để translate phần lớn các định dạng audio phổ thông (mặc dù vậy nó không cung cấp encoder để chuyển đổi sang MP3).

iOS sử dụng integer và fixed-point audio data. Kết quả tính toán sẽ nhanh hơn và tốn ít pin hơn khi xử lý audio. iOS cung cấp một Converter audio unit và bao gồm interface từ Audio Converter Services. Để biết chi tiết hơn về cái thứ gọi là *canonical* audio data formats cho iOS và OS X, ta cùng chờ đón những bài sau.

Trong iOS và OS X, Core Audio cũng hỗ trợ phần lớn các định dạng file phổ thông để chứa và play audio data.

## Audio Units
*Audio units* là các plug-in để xử lý audio data. Trong OS X, một single audio unit có thẻ được sử dụng đồng thời bởi nhiều channel và application.

iOS cung cấp một tập các audio unit được tối ưu hiệu năng trên nền tảng di động. Bạn có thể phát triển các audio unit để sử dụng trong app của mình. Tuy nhiên bởi vì bạn phải statically link các custom audio unit vào trong app, audio units mà bạn tự phát triển không thể sử dụng bởi những app khác trong iOS.

Các audio unit được cung cấp trong iOS không có sẵn giao diện người dùng. Công việc chính của chúng là cung cấp low-latency audio cho app. Để biết kỹ hơn về audio unit trên iPhone, ta cùng chờ đón các bài viết sau.

Với Mac apps thì khác, bạn có thể sử dụng system-supplied hoặc third-party-supplied audio units. Bạn cũng có thể phát triển 1 audio unit nhưng là một product . Người dùng có thể gắn các audio unit của bạn trong những ứng dụng như GarageBand hay Logic Studio, cũng như các audio unit hosting application khác.

Một số Mac audio unit chỉ làm việc ngầm để đơn giản hóa các công việc cho bạn, ví dụ như chia tách tín hiệu hoặc là giao tiếp với phần cứng. Một số khác thì xuất hiện trên màn hình, với UI riêng của nó, để cung cấp khả năng thao tác và xử lý tín hiệu. Ví dụ, effect units có thể giúp ta bắt chước các âm thanh trong thế giới thực, như kiểu guitaris's distortion box. Một số audio unit thì sinh tín hiệu, có thể là do lập trình hoặc trả lời các MIDI input.

Một số ví dụ của audio unit có thể kể đến:
-  Một signal processor (ví dụ như một high-pass filter, reverb, compressor, hay distortion unit). Mỗi cái là một *effect unit* và thực hiện digital signal processing (DSP) theo cách tương tự như một hardware effect box hay outboard signal processor.
-  Một musical instrument hay software synthesizer. Cái này thì được gọi là *instrument unit* (hoặc thỉnh thoảng là music device) và thường dùng để sinh các music note trả lời cho MIDI input.
-  Một signal source. Không giống như instrument unit, một *generator unit* không được activated bởi MIDI input mà thông qua code. Ví dụ, một generator unit có thể tính toán và generate sóng sin, hoặc lấy source data từ file hay network stream.
-  Một interface để giao tiếp phần cứng. Cái này thì gọi là *I/O units.*
-  Một format converter. Một *converter unit* có thể translate data giữa các dạng linear PCM, merge hoặc split audio streams, hoặc thực hiện time và pitch change. 
-  Một mixer hoặc panner. Một *mixer unit* có thể combine audio tracks. Một *panner unit* có thể apply stereo hoặc 3D panning effect.
-  Một effect unit làm việc offline. Một *offline effect unit* thực hiện những công việc mà quá chuyên sâu về bộ xử lý hoặc đơn giản là không thể thực hiện trong thời gian thực. Ví dụ, một effect thực hiện việc đảo ngược thời gian trên một file cần được apply offline.

Trong OS X ta có thể mix các audio unit với nhau theo yêu cầu của người dùng. Hình dưới đây môt tả một chain cơ bản của các audio unit. Có một instrument unit để sinh tín hiệu dựa trên dữ liệu nhận được từ một outboard MIDI keyboard. Audio sinh ra được pass qua các effect unit để có thêm các hiệu ứng bandpass filtering và distortion. Một chain của các audio unit như vậy được gọi là một *audio processing graph*.

![](https://images.viblo.asia/892c1d3f-cde3-4e97-8c00-e5bc7f48f575.png)

Nếu bạn phát triển audio DSP code mà muốn dùng cho nhiều app, bạn cần đóng gói code lại thành một audio unit.

Nếu bạn phát triển Mac audio apps, việc hỗ trợ audio unit sẽ cho phép bạn và user của mình tận dụng những thư viện audio unit sẵn có để mở rộng khả năng của app.

## Hardware Abstraction Layer
Core Audio sử dụng một hardware abstraction layer (HAL) để cung cấp một interface nhất quán và dễ dùng cho ứng dụng để có thể tương tác với hardware. HAL cũng có thể cung cấp thông tin thời gian cho app của bạn để đơn giản hóa việc đồng bộ hoặc điều chỉnh độ trễ.

Trong phần lớn trường hợp, code của bạn không tương tác trực tiếp với HAL. Apple hỗ trợ một audio unit đặc biệt, gọi là AUHAL unit trong OS X và AURemoteIO unit trong iOS, cho phép ta pass audio từ một audio unit khác tới hardware. Tương tự như vậy, input từ hardware được định tuyến qua AUHAL unit (hoặc AURemoteIO trên iOS) và được cung cấp cho các audio unit khác trong chuỗi.

![](https://images.viblo.asia/988a71da-8102-4721-9d67-afe6c07f8e33.png)

AUHAL unit (hay AURemoteIO unit) cũng lo luôn việc chuyển đổi định dạng dữ liệu hoặc channel mapping cần thiết để có thể translate audio data giữa các audio unit và hardware.

# Kết

Trên đây là một số kiến thức và khái niệm khởi đầu khi làm việc với Core Audio, hy vọng sẽ là một nguồn tham khảo hữu ích dành cho các bạn.


-----

Dịch và tham khảo từ [Core Audio Overview](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/WhatisCoreAudio/WhatisCoreAudio.html)