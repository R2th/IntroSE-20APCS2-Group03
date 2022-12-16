## Giới Thiệu 
Xin chào mọi người, lại là mình Hưng - Lập Trình Viên AI. Hôm nay mình sẽ tiếp theo phần series về phần giải mã video với FFMPEG. Nếu các bạn chưa biết gì về FFMPEG và làm sao cài đặt FFMPEG thì có thể tham khảo phần 1 [Giới thiệu về FFMPEG và cài đặt FFMPEG (phần 1)](https://viblo.asia/p/su-dung-ffmpeg-de-giai-ma-luong-stream-h264-voi-thu-vien-tang-toc-phan-cung-nvidia-codec-sdk-phan-1-YWOZrr6EZQ0)

Trong phần này, mình sẽ đi sâu vào việc sử dụng các tools đi kèm với FFMPEG sau khi cài đặt là `ffprobe` và `ffplay` 

## Chuẩn Bị 
* Yêu cầu bạn đã cài đặt được và có sẵn FFMPEG trong máy tính nha. 
* Để minh họa các ví dụ được đồng nhất, mình sẽ sử dụng 1 video sample ở đây. Các bạn có thể tại về lin k sau [sampleVideo.mp4](https://drive.google.com/file/d/10G2qPeKNey7opPbhwLK-dXk3EKZAqPdT/view?usp=sharing) hoặc là chỉnh cần đổi tên 1 video bất kì trong máy tính của bạn thành `sampleVideo.mp4` là được. Sau đó mình lưu video đó ở thư mục `~/Videos` 
![image.png](https://images.viblo.asia/6bde42ab-a44a-4838-b4a0-6c46f63d4f67.png)

## Thí nghiệm 1 - Đọc thông tin từ video 
Đọc thông tin từ file `sampleVideo.mp4` bằng `ffprobe`. 
![image.png](https://images.viblo.asia/52ee24a0-b143-4dc4-a7ff-805bfca50a4a.png)

Thật là đơn giản không nào ? Mình có thể nắm được 1 số thông tin quan trọng từ video 
* Duration: Video dài bao lâu 
* Encoding Type: Video được nén dưới dạng H.264 
* Resolution: Độ phân giải của video 1920x1080 
* FPS: 23.98 frames / second 
* Bitrate: 4274 kb/ second 

Thật ra còn cách để xem thông tin video mà không cần dùng FFMPEG, bằng cách click chuột phải vào video chọn Properties. 
![image.png](https://images.viblo.asia/fbae1bc3-05e7-4530-bfc7-924854efbdb2.png)
Tuy nhiên, tool mặc định của hệ thống lại không đọc được bitrate của video. 

Cái hay của tool này là nó có thể đọc được thông tin từ luồng RTSP của camera nữa nha. Các bạn thử thử xem :grin:

## Thí nghiệm 2 - Play Video 
Mình sẽ play video bằng cách sử dụng `ffplay`  với tên của video/stream.
```
ffplay sampleVideo.mp4
```
![](https://images.viblo.asia/aafb354e-1697-42cb-9e17-927ecca1fc0e.png)

Mình đố các bạn `ffplay` có thể play được luồng RTSP camera hay không nhé ?

## Thí nghiệm 3 - Đánh Giá Hiệu Suất Hệ Thống bằng FFPLAY
Có bao giờ tự hỏi là khi mình play 1 cái video, máy tính của mình có CPU mạnh, có gắn card GPU, thì video player của mình nó sử dụng CPU hay GPU nhỉ ? 

Mình kiểm tra đơn giản bằng cách sử dụng `ffplay sampleVideo.mp4` . Monitor hệ thống với phần mềm `htop` nha. 

Trước khi play video 
![](https://images.viblo.asia/7665872c-fe97-4308-8206-1d99db91317a.png)


Sau khi play video 
![](https://images.viblo.asia/f752f54a-357d-4997-963c-cc1291bbaea2.png)

Như vậy thì đối với hệ thống hiện tại, CPU với GPU đều cùng nhích nhẹ lên một tí. Tức là cả CPU và GPU đang được sử dụng đồng thời với nhau để xử lí 1 video này.
 
Kết luận:   
* Tool FFplay có sử dụng đồng thời CPU và GPU để decode (giải mã) video. 

 ## Thí nghiệm 4 -  Đánh Giá Hiệu Suất Hệ Thống bằng FFMPEG
 Mình vọc chơi chơi mấy tool trên rồi, bây giờ vào chủ đề chính. Mình sẽ giới thiệu sơ sơ chút về thí nghiệm này. Mình sẽ sử dụng transcoding để test hiệu năng của hệ thống đơn giản nhất. 
 
 Bạn có thể đọc thêm về định nghĩa của Transcoding [ở đây](https://corp.kaltura.com/blog/what-is-transcoding/).
 
 Đây là một diagram mình vẽ, cụ thể 1 file video là 1 dạng dữ liệu được nén lại (encoded video), giải nén dữ liệu và thay đổi thông tin dữ liệu rồi cuối cùng nén dữ liệu đó lại thành 1 file video mới. 
 ![Deepstream Architecture.png](https://images.viblo.asia/59ad2380-624b-4a55-b721-7812909dddb4.png)
 
 Hồi xưa, mình hay sử dụng transcoding này mà mình không hề hay biết. Ví dụ mình download 1 file video - Japanese Video Anime :sweat_smile:, độ dài 1 tiếng với độ phân giải Full HD. Dung lượng file thì lớn tầm khoảng 1GB, tuy nhiên, con Iphone 5 16G của mình thì màn hình lại nhỏ, dung lượng cũng thấp. Giải pháp của mình là dùng 1 tool Video Converter để hạ độ phân giải video từ Full HD thành HD. Cuối cùng mình có thể nhét 1 file video Full HD dễ dàng vô cái điện thoại của mình. Quá trình trên thực chất là 1 dạng của Transcoding đấy. 
 
 ![Deepstream Architecture (1).png](https://images.viblo.asia/b8751535-e7ae-4ae2-a33f-9b8c12ea6e86.png)
 
Một ứng dụng khác của việc ứng dụng Transcoding là ứng dụng trong việc live stream, khi bạn live stream trên Youtube chả hạn, máy chủ của Youtube nó sẽ transcode ra nhiều streams cùng lúc với nhiều độ phân giải khác nhau. Nhiều độ phải khác nhau sẽ thích hợp cho nhiều thiết bị khác nhau ví dụ như Màn hình, Ipad, Iphone ... 

![Deepstream Architecture (2).png](https://images.viblo.asia/f72256c6-5d14-429c-ae8e-a69f5349c97f.png)
 
 Nhiều độ phân giải khác nhau cho cùng 1 video trên Youtube. Chắc chắn có sự hỗ trợ của công nghệ transcoding.
 ![image.png](https://images.viblo.asia/641509d9-0d2b-47c7-b577-19215f4097cc.png)
 
 Bây giờ mình thử áp dụng Transcoding nhẹ nhàng bằng FFMPEG nhé. Hiện tại `sampleVideo.mp4` file này có bitrate xấp xỉ là 4274 kb/s, dung lượng thực tế là 56,5 MB, độ phân giải Full HD (1920 x 1080). Mình sẽ giảm dung lượng file video này xuống mà vẫn giữ nguyên độ phân giải, chất lượng hình ảnh vẫn nét bằng cách hạ BitRate của video đầu ra. Mình cho nó xuống tầm khoảng 2000 kb/s thử. 
 
 ```
 time ffmpeg -i sampleVideo.mp4 -b:v 2M -acodec copy sampleVideo_2K_BR.mp4
 ```
 
 ![image.png](https://images.viblo.asia/275aea81-536e-4427-a67a-b9724c4e1697.png)
 
Các bạn chú ý ba vùng màu đỏ 1,2,3. Mình nhận thấy là 
* Tất cả các cores của CPU đều hoạt động 100% hết công suất
* Tốc độ xử lí đo bởi FFMPEG tầm 1.2x 
* GPU thì hoàn toàn không chạy tí gì. 

Tổng thời gian xử lí là 41s 
![image.png](https://images.viblo.asia/ec77898f-2ecc-4305-801c-227ad577d8f7.png)

Như vậy, trong quá trình transcoding, ffmpeg không dùng tí công năng nào của GPU cả. Anh GPU ngồi nghỉ chơi xơi nước :joy: 

Đây là thành quả sau khi giảm bitrate video xuống.
![image.png](https://images.viblo.asia/54d51f71-0d17-49cf-bbea-4fb2a65f6500.png)

Bây giờ mình ép buộc nó sử dụng GPU bằng cách chỉ định dùng bộ SDK của NVIDIA là nvenc_h264. FFMPEG trong quá trình encoding sẽ sử dụng GPU. 
 ```
 time ffmpeg -i sampleVideo.mp4 -vcodec nvenc_h264 -b:v 2M -acodec copy sampleVideo_2K_BR_GPU.mp4
 ```
 
![image.png](https://images.viblo.asia/913ae1d5-c944-42c3-b14d-b69698af1839.png)

Tổng thời gian xử lí là 6s
![image.png](https://images.viblo.asia/2f56185d-686a-4510-8b5a-139398458cc4.png)

Nhận thấy là:
* Tốc độ lên 18x
* Giảm tải việc sử dụng CPU
* Thời gian xử lí rút ngắn xuống còn 6s 
* Xuất hiện thông tin ENC trên GPU -> Đã tận dụng được bộ Encoder trên con card GPU.

Vì vậy, bất cứ khi nào có thể, bạn nên tận dụng cái bộ mã hóa encoder (nvenc_h264) của NVIDIA bằng cách thêm nào `-vcodec nvenc_h264`. 

FFMPEG là một thư viện mạnh, có rất nhiều commands, các bạn chịu khó đọc và tìm hiểu vài commands đơn giản thì sau này áp dụng cho nhiều việc lắm nhé. 

Hiện tại thì mình decode (giải mã) video bằng CPU, encode (mã hóa) ra video bằng GPU. Mình sẽ cập nhật phần giải mã rồi kết hợp vừa giải mã + mã hóa hoàn toàn bằng GPU sau.

## Kết luận 
Qua bài viết mình, các bạn có thể 
* Đọc thông tin chi tiết về video bằng cách sử dụng `ffprobe` 
* Play video bằng tool `ffplay` 
* Biết khái niệm Transcoding - ứng dụng của Transcoding trong live stream 
* Tận dụng GPU để transcode video nhanh hơn
* * Việc giải mã video sẽ chạy nhẹ nhàng hơn việc mã hóa. Encoding sẽ tốn nhiều tài nguyên hơn so với Decoding.

## Bài Tập Về Nhà
Sau đây là phần lý thuyết, theo mình thì học phải đi đôi với thực hành. Mình có một số bài tập giao về nhà cho các bạn nè. 
1. Dùng FFMPEG để đọc 1 video bất kì trong máy tính của bạn, chia sẻ một số thông tin từ video vào bên dưới comment của bài viết này. 
2. Hãy kể tên 3 định dạng video mà bạn biết ? Dạng nào được sử dụng phổ biến nhất ? Lý do tại sao? 
3. Ngoài định dạng H.264 của camera thì còn dạng khác nữa không ? Dạng đó tên là gì ? 
4. Nhà bạn có camera không nhỉ ? Nếu bạn có sử dụng camera của hãng HIKVision thì làm sao biết camera của bạn cung cấp luồng stream dạng H.264 hay không ?
5. Nếu 1 số camera không hỗ trợ trang web để xem cấu hình camera thì liệu mình có thể dùng FFMPEG để biết camera cung cấp thuộc dạng stream nào không? 
6. Thử thay đổi resolution của video sample từ Full HD xuống VGA 640x480 bằng phương pháp transcoding + resize 
7. Tạo 3 video files từ sample video tới 3 bitrate khác nhau trong 1 lần chạy FFMPEG command .

![Đang tải lên image.png…]()

## Tham Khảo
[1] Giới thiệu về FFMPEG và cài đặt FFMPEG (Phần 1) - https://viblo.asia/p/su-dung-ffmpeg-de-giai-ma-luong-stream-h264-voi-thu-vien-tang-toc-phan-cung-nvidia-codec-sdk-phan-1-YWOZrr6EZQ0

[2] FFMPEG Documentation: https://ffmpeg.org/documentation.html

[3] FFMPEG 4.4: https://ubuntuhandbook.org/index.php/2021/05/install-ffmpeg-4-4-ppa-ubuntu-20-04-21-04/

[4] Transcoding: https://corp.kaltura.com/blog/what-is-transcoding/