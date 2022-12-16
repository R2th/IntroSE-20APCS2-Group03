![](https://images.viblo.asia/7ed7799c-b7f9-47d3-acd7-2007281ebe83.png)

**Video streaming** ngày càng trở nên phổ biến, các app, service phục vụ mục đích `streaming` ngày càng tăng và phát triển không ngừng.

Bài viết này là tìm hiểu của mình về `streaming` flow, nó hoạt động như thế nào.

## Capture
Quá trình nhận video/audio data từ camera, là các raw digital video.
## Video Codecs and Encoding
Sau khi video được capture từ devices, nó sẽ được mã hóa phục vụ cho truyền tải data qua internet

### Encoding
**Video Encoding** là quá trình compress video raw data thành một format tương thích với nhiều devices, quá trình nèn sẽ nén dung lượng video từ hàng GB đến vài MB.

### Codec
**Video Encoding** sử dụng thuật toán để encode và decode data, thuật toán này gọi là
**Codec** (**co**der và **dec**oder)

**Video Encoding** bao gồm 2 quá trình: encoding `video` và `audio`. Ứng với `video` hoặc `audio` sẽ có các loại `codec` tương ứng.

Đối với `video` thì phổ biến nhất là **H.264**, ngoài ra còn có **H.265**, **VP9**, ...

`audio` thì phổ biến là **AAC**, ngoài ra **MP3**, ...

## Packaging and Protocols
### Video container
![](https://images.viblo.asia/1252c860-fd60-4956-89fe-032b701e8836.png)

Khi quá trình compress hoàn tất, `audio` và `video` encoded sẽ được wrap vào trong 1 file `container`.

File này bao gồm ` audio codec`, `video code`, `captioning`, `metadata`, ...

Các file này thường có format `.mp4`, `.mov`, `.ts`, `.wmv`, ...

![](https://images.viblo.asia/eaa7f8d1-2425-4f31-96dd-fd045f9d1c15.png)

Ta có thể hình dung quá trình streaming giống  với việc thu gom rác: `Stream data` được **capture** từ devices, ứng với việc bỏ rác vào thùng rác, sau đó được `Compression` `compress` theo các loại `Codec`, ứng với việc gom rác vào các túi to nhỏ; **Packaging** đưa các `audio` và `video` encoded vào `container`, ứng với việc đóng các túi rác vào thùng rác; cuối cùng các `container` được truyền đi qua internet, ứng với việc thùng rác được vận chuyển bằng xe chở rác đến bãi rác.

### Protocol
**Protocol** là cách mà video data được truyền đi từ nơi này sang nơi khác, các protocol thường được sử dụng là Real-Time Messaging Protocol (**RTMP**), HTTP-based protocols  **HLS**.

#### HLS
Trong **HLS**, video data được chia nhỏ thành các segment (hay chunks/packet) và được truyền đi lần lượt.

Khi bên nhận ác segments này (server), chúng được gom lại và đánh thứ tự (index) tạo nên 1 **.m3u8** Manifest File. 

Các device, application sẽ stream/download file này từ server cho việc stream/download data

![](https://images.viblo.asia/fab60098-0194-4a16-9c04-f40f687f3b2d.png)

## Ingest and Transcoding
**Transcoding** là quá trình chuyển đổi stream data thành nhiều dạng codec, bitrate, resolution, file container khác nhau, phục vụ cho việc delivery data tới nhiều device khác nhau.

* **Transmuxing**: các compressed video và audio data được packaged lại thành 1 file container khác format (mp4 => mov, ...)
* **Transcoding**:  decode các compressed video và audio data và thay đổi chúng, sau đó data này được recompress lại cho việc delivery
   + **Transrating**:  thay đổi bitrate của file data đã được decompress để phù hợp với tốc độ mạng, bao gồm thay đổi frame rate và resolution
   + **Transizing**: thay đổi video frame hoặc resolution cho phù hợp với các màn hình device khác nhau
## Delivery

Tốc độ delivery stream data từ server tới các end users device phụ thuộc vào khoảng cách từ device tới server, vì thế **CDN** ra đời
 
 **CDN** là hệ thống các distributed servers khắp thế giới phục vụ vận chuyển media data, tăng tốc độ truyền tải tới các device lân cận
## Playback
Đây là giai đoạn cuối cùng, devices nhận media data đã được encode, trancode phù hợp với mình, decode và playvideo cho end users