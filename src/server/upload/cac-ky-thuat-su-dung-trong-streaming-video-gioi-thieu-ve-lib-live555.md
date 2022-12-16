```
FFMPEG là một thư viện dùng để ecoding và decoding video/audio
LIVE555 là một thư viện dùng để sẵn sàng cho việc streaming ecoding video/audio và đọc các luồng stream.
```
Một số phiên bản của FFMPEG vẫn có thể stream các video tuy nhiên bản chất của việc stream này vẫn cần encoding và decoding các video/audio đó. Trong khi Live555 là một thư viện khá phức tạp để truyền, nhận dữ liệu thông qua một số giao thức khác nhau ( Không chỉ với RTSP mà Live555 có thể thực hiện phát trực tuyến với MPEG-2). Thư viện nòng cốt của LIVE555 không cho phép mã hóa hoặc giải mã các bộ phim, nó làm việc đơn giản cho việc streaming video/audio. Một số phiên bản cho phép mã hóa cũng như giải mã nhưng bản chất thật sự nó đang sử dụng các thư viện khác ngoài LIVE555.
# Các kỹ thuật sử dụng trong streaming video
> Project này được viết cho việc streaming H264, H265 trong Visual Studio sử dụng FFMPEG và LIVE555 - [GIT](https://github.com/alm4096/FFMPEG-Live555-H264-H265-Streamer)
> 
**Streaming video** (luồng video) thực chất là quá trình truyền các frame của file video tới người nhận.
**Demand streaming** (stream theo yêu cầu) là quá trình streaming một file video có sẵn ( đã được lưu trên ổ cứng ) tới người nhận.
**Live streaming** (stream từ một nguồn tạo video) là quá trình streaming trực tiếp từ các frame video được tạo ra từ các thiết bị thu nhận video (như camera ) tới người nhận.
**H.264 , VP8** là các thuật toán mã hóa cho các luồng video.
**Bitstream** là khái niệm ám chỉ một luồng video từ máy chủ streaming tới máy khách nhận các frame video dựa vào giao thức MMS hay RTP.
**Codec**: thuật ngữ ám chỉ chung cho các thuật toán mã hóa đường truyền trong quá trình streaming audio hay video.
**RTSP (Real Time Streaming Protocol)** là giao thức mạng điều khiển quá trình streaming video hay streaming audio.
**RTP (Real-time Transport Protocol )** là giao thức chuẩn định dạng cho gói tin (packet) video hay audio được truyền trên mạng.
## Giao thức RSTP
- RSTP là giao thức ở tầng application được thiết kế để điều khiển sự truyền dữ liệu đa phương tiện (như play, pause, seek) với thông tin thời gian đi kèm (như audio, video). Giao thức này độc lập với các giao thức ở tầng thấp hơn, do đó nó có thể được thực hiện trên TCP hoặc UDP hoặc giao thức khác ở tầng giao vận. 
- Cú pháp của RSTP gần giống như cú pháp của HTTP/1.1, do đó dễ thực hiện và triển khai. Bên cạnh những điểm tương tự, nó có một số điểm khác nhau quan trọng. Thứ nhất, RSTP là giao thức stateful, do đó yêu cầu client duy trì thông tin về phiên streaming qua các request RSTP. Thứ 2 cả RSTP client và server đều có thể đưa ra RSTP request. 
- Cuối cùng, dữ liệu đa phương tiện được truyền ngoài dải dùng protocol riêng biệt ( có thể là giao thức RTP). Trong một ứng dụng streaming thông thường, trước hết client nhận file mô tả trình diễn (presentation description file) sử dụng 1 giao thức ngoài (có thể dùng HTTP). File mô tả trình diễn này mô tả một hoặc nhiều sự trình diễn, mỗi trình diễn bao gồm một hoặc nhiều dòng dữ liệu đa phương tiện được đồng bộ với nhau. File mô tả trình diễn cũng chứa các thuộc tính của các dòng dữ liệu như định dạng nén để client lựa chọn và chuẩn bị play media. 
![](https://images.viblo.asia/315e3016-2c6c-467e-886b-f50920294436.png)

Để thực hiện kỹ thuật streaming video theo giao thức RTSP nhất thiết máy client phải gửi lên máy server ( streaming server) những request sau và phải theo một trình tự nhất định.
1. Máy client sẻ gửi yêu cầu OPTIONS kèm với đường link trỏ tới file video cần xem tới máy server, để máy server chấp nhận đường link này.

![](https://images.viblo.asia/2d6c3835-b62f-42ce-a531-2c89d64bf7ee.png)

2. Nếu máy server trả về mã chấp nhận đường link trên thì máy client tiếp tục gửi yêu cầu DESCRIBE tới máy server để máy server phân tích đường link. Một yêu cầu DESCRIBE bao gồm một đường link RTSP có dạng (rtsp:// ) và kiểu dữ liệu đáp trả từ phía server. Cổng mặc định được sử dụng cho giao thức RTSP là 554 và cổng này được sử dụng cho cả giao thức của tầng giao vận UDP và TCP.  *Ngoài ra trong thông điệp trả về từ máy server còn liệt kê các đường link thích hợp hơn tới file video cần chơi khi mà trong file video đó có trộn lẫn giữa phụ đề và âm thanh. Và điều quan trọng nhất ở trong bản tin miêu tả phiên giao dịch này là streamid của luồng video và streamid của luồng âm thanh khi mà đoạn video đó có lồng âm thanh vào trong các frame.*

![](https://images.viblo.asia/e913dcf4-a76e-41c1-a874-ab9ac45a3007.png)

3. Sau khi hoàn tất yêu cầu SETUP, cấu hình được các luồng dữ liệu để chuẩn bị streaming, máy client sẽ gửi yêu cầu PLAY để thực hiện truyền các frame dữ liệu thật sự từ máy server tới máy client , và các frame dữ liệu này sẽ được lưu trong một bộ đệm của máy client, các frame này sẽ được giải mã ( decode ), rồi được hiển thị bởi trình chơi file video và âm thanh ( VLC).

![](https://images.viblo.asia/67f69430-e731-44b1-a12a-c3fa1677d0e5.png)

4. Tạm dừng hoặc dừng dừng hẳn quá trình streaming thì sẽ sử dụng PAUSE hoặc TEARDOWN
![](https://images.viblo.asia/12e4a34c-21bc-4ea7-9e61-3d836bf48a96.png)
![](https://images.viblo.asia/93faaf15-76ab-4bd3-a79c-4f122c9ef853.png)

## Giao thức Realtime Transport Protocol (RTP)
> RTP được thiết kế để truyền dữ liệu trong các ứng dụng thời gian thực như hội
đàm audio, video
![](https://images.viblo.asia/e2a8bab0-5a68-4487-8e79-a0eb567be010.png)
```
• V: là số phiên bản. với phiên bản hiện tại V=2.
• P là bit padding, bit này bật khi có padding bytes.
• Bit X được bật nếu có 1 header mở rộng sau header cố định này.
• CC là số lượng contributing source identifier sau header cố định này.
• M được dùng như 1 bộ phận đánh dấu, định nghĩa bởi 1 profile
• PT là kiểu của payload, được định nghĩa trong profile.
```
**RTP** được thiết kế độc lập với các giao thức ở tầng thấp hơn. Trên Internet các gói tin RTP được chuyển đi bằng giao thức UDP. Có thể thực hiện dồn (multiplexing) nhiều luồng dữ liệu RTP trong 1 máy (mỗi luồng dùng 1 cổngUDP). RTP cũng hỗ trợ cả vận chuyển đơn tuyến (unicast) và vận chuyển đa tuyến (multicast) như IP multicast. RTP định nghĩa một giao thức điều khiển gọi là RTCP (RTP control protocol) để cung cấp các chức năng điều khiển như: đồng bộ hóa, báo cáo thống kê gói tin nhận về,….
## Thư viện mã nguồn mở LIVE555
LIVE555 được sử dụng bởi những người chơi phương tiện phổ biến, cùng với một loạt các thiết bị tích hợp có khả năng phát trực tuyến. LIVE555 được duy trì bởi công ty Live Networks, thư viện hoạt động với các giao thức RTP / RTCP, RTSP hoặc SIP, với khả năng xử lý các định dạng video và âm thanh như MPEG, H.265, H.264, H.263 +, VP8, DV, JPEG, MPEG, AAC, AMR, AC-3 và Vorbis.
Các thư viện đa phương tiện của LIVE LIVE555 là một tập hợp các thư viện truyền phát đa phương tiện nhẹ cho các giao thức RTSP / RTCP / RTSP / SIP, với mã hỗ trợ cho các máy chủ và máy khách. Chúng được sử dụng bởi những người chơi phương tiện phổ biến như VLC và MPlayer, cũng như vô số thiết bị tích hợp (chủ yếu là máy ảnh).