# Sound Files
Để làm việc với sound file trong ứng dụng, ta có thể sử dụng Audio File Services, một trong các mid-level service của Core Audio. Audio File Services cung cấp một khả năng mạnh mẽ giúp ta truy cập audio data, metadata, và để tạo sound file.

Bên cạnh việc cho phép ta làm việc với những thông tin cơ bản như file ID, file type và data format, Audio File Services cho phép ta làm việc với vùng, các điểm đánh dấu, lặp, hướng phát, SMPTE time code,...

Ta cũng sử dụng Audio File Services để kiểm tra các đặc tính của hệ thống. Một số hàm điển hình mà ta sử dụng như `AudioFileGetGlobalInfoSize` (lấy size để ta allocate memory cho thông tin mà ta muốn lấy) và `AudioFileGetGlobalInfo` (để lấy thông tin). Một danh sách dài liệt kê các thuộc tính nằm trong file `AudioFile.h` cho phép ta kiểm tra được các đặc tính của hệ thống như:

- Các loại file có thể đọc.
- Các loại file có thể ghi.
- Ở mỗi loại ghi, định dạng audio mà ta có thể đặt vào file là gì.

Bài này cũng sẽ giới thiệu cho bạn hai công nghệ của Core Audio:

- Audio File Stream Services , một audio stream parsing interface, cho phép ta đọc audio data từ ổ đĩa hoặc từ network stream.
- Extended Audio File Services (chỉ có trên Mac) gói gọn các tính năng từ Audio File Services và Audio Converter Services, làm code của ta đơn giản hơn.

## Tạo một sound file mới

Để tạo một sound file để ghi âm vào, ta cần:

- Đường dẫn cho file, ở dạng `CFURL` hoặc `NSURL`.
- Identifier của loại file mà ta muốn tạo, được mô tả ở Audio File Types enum bên trong `AudioFile.h`. Ví dụ, để tạo một CAF file, ta sử dụng identifier là `kAudioFileCAFType`.
- Audio stream basic description (ASBD) cho dữ liệu audio mà ta sẽ đưa vào file. Trong nhiều trường hợp ta có thể cung cấp một phần ASBD và yêu cầu Audio File Services tự điền nốt.

Ta đưa ba thông tin này tới Audio File Services thông qua các param của hàm `AudioFileCreateWithURL`, hàm này tạo file và trả cho ta một `AudioFileID` object. Ta sử dụng object này cho những tương tác sau này với sound file.

```
AudioFileCreateWithURL (
    audioFileURL,
    kAudioFileCAFType,
    &audioFormat,
    kAudioFileFlags_EraseFile,
    &audioFileID // hàm trả lại file object ở đây
);
```

## Mở một sound file
Để mở một sound file cho việc playback, ta sử dụng hàm `AudioFileOpenURL`. Ta cung cấp hàm này với URL của file, một hằng gợi ý file type, và các file access permission mà ta muốn sử dụng. `AudioFileOpenURL` sẽ trả lại ID của file.

Sau đó ta sử dụng các property identifier cùng với các hàm `AudioFileGetPropertyInfo`, `AudioFileGetProperty` để lấy các thông tin cần thiết từ file. Một số property identifier thường sử dụng và trông tên có vẻ dễ hiểu:

- `kAudioFilePropertyFileFormat`
- `kAudioFilePropertyDataFormat`
- `kAudioFilePropertyMagicCookieData`
- `kAudioFilePropertyChannelLayout`

Còn nhiều identifier khác trong Audio File Services cho phép ta nhận metadata có thể có trong file, như là các vùng đánh dấu, thông tin bản quyền, nhịp độ phát.

Khi gặp một VBR file rất dài, ví dụ như podcast, việc nhận toàn bộ packet table có thể tiêu tốn một lượng thời gian đáng kể. Trong trường hợp như vậy, hai property identifier sau đặc biệt hữu dụng: `kAudioFilePropertyPacketSizeUpperBound` và `kAudioFilePropertyEstimatedDuration`. Ta có thể sử dụng những thứ này để nhanh trong tính toán một cách xấp xỉ thời lượng sound file hoặc số lượng packets, thay vì phân tích toàn bộ file để có được con số chính xác.

## Đọc và ghi một sound file
Trong iOS ta thường sử dụng Audio File Services để đọc và ghi audio data với sound file. Việc đọc và ghi về cơ bản là hai hình ảnh đối lập của nhau khi ta sử dụng Audio File Services. Cả hai quá trình đều block luồng hiện tại cho tới khi hoàn thành, và cả hai đều có thể hoạt động sử dụng byte hoặc packet. Tuy nhiên, trừ khi ta có một số yêu cầu đặc biệt, còn không thì hãy sử dụng packet.

- Đọc và ghi bằng packet là lựa cho duy nhất cho VBR data.
- Sử dụng packet-based operation giúp ta tính toán thời lượng audio dễ dàng hơn.

Một option khác trong iOS để đọc audio data từ disk là Audio File Stream Services. Cuối bài ta sẽ đề cập đến cái này sau.

Audo Queue Services, khai báo trong `AudioQueue.h` trong Audio Toolbox framework, là một Core Audio interface cho việc recording và playback. Để có một cái nhìn tổng quan về Audio Queue Services, cùng theo dõi các bài tiếp theo nhé.

## Extended Audio File Services
Core Audio cung cấp một API khá là tiện lợi gọi là Extended Audio File Services. Interface này bao gồm các hàm cần thiết trong Audio File Services và Audio Converter Services, cung cấp việc chuyển đổi tự động định dạng linear PCM. Chúng ta sẽ có một bài khác để làm rõ hơn vấn đề này.

## iPhone Audio File Formats
iOS hỗ trợ *audio file format* được liệt kê ở bảng dưới đây. Còn thông tin về audio data formats trong iOS, cùng theo dõi các bài tiếp theo nhé.



| Format name | Format filename extensions
| -------- | -------- |
| AIFF | .aif, .aiff     |
| CAF | .caf |
| MPEG-1, layer 3 | .mp3 |
| MPEG-2 or MPEG-4 ADTS | .aac |
| MPEG-4 | .m4a, mp4 |
| WAV | .wav |
| AC-3 (Dolby Digital) | .ac3 |
| Enhanced AC-3 (Dolby Digital Plus) | .ec3 |

## CAF Files
iOS và OS X có một native audio file format gọi là Core Audio Format (hay CAF). Định dạng CAF được giới thiệu trong OS X v10.4 "Tiger" và có từ iOS 2.0 trở lên. Điều độc đáo ở đây là nó có thể chứa được bất cứ audio data format nào được hỗ trợ trên platform.

CAF file không có giới hạn kích thước, không giống như AIFF và WAV, và có thể hỗ trợ nhiều loại metadata, nhưng thông tin channel và các chú thích văn bản. Để có nhiều thông tin hơn về định dạng này, bạn có thể tham khảo *[Apple Core Audio Format Specification 1.0](https://developer.apple.com/library/archive/documentation/MusicAudio/Reference/CAFSpec/CAFintro/CAFintro.html#//appleref/doc/uid/TP40001862)*.

# Sound Streams
Không giống như disk-based sound file, một *audio file stream* là một audio data mà ta có thể không có quyền truy cập tới sự bắt đầu và kết thúc của nó. Cái mà ta tương tác là một stream. Ví dụ, khi ta xây dựng một Internet radio player app. Provider thường sẽ gửi stream của họ liên tục. Khi người dùng bấm Play để nghe, ứng dụng cần phải nhảy tới bất kể dữ liệu nào đang được sử dụng ở thời điểm đó. Thời điểm bắt đầu, giữa hoặc cuối của một audio packet, hoặc một magic cookie.

Và cũng không giống như sound file, dữ liệu của một stream có thể không phải là một dạng dữ liệu tin cậy. Các gói tin có thể bị drop, discontinuity, hoặc pause, phụ thuộc vào vấn đề network.

Audio File Stream Services cho phép ứng dụng làm việc với các stream và tất cả cái đống phức tạp đó. Nó lo việc parsing.

Để sử dụng Audio File Stream Services, ta tạo một audio file stream object, ở dạng `AudioFileStreamID`. Object này được sử dụng như một proxy cho stream. Object này cũng cho phép ứng dụng của bạn biết điều gì đang xảy ra với stream thông qua các property. Ví dụ, khi Audio File Stream Services xác định được bitrate của stream, nó sẽ thiết lập `kAudioFileStreamProperty_BitRate`  property trong audio file stream object.

Bởi Audio File Stream Services thực hiện việc parsing, nó trở thành một vai trò của app để đáp ứng lại việc được cung cấp các tập audio data và các thông tin khác. Ta sử dụng hai callback function để làm điều này:

Đầu tiên, ta cần một callback cho những thay đổi trong audio file stream object. Tối thiểu, ta cần viết callback này để đáp ứng những thay đổi trong `kAudioFileStreamProperty_ReadyToProducePackets` property. Kịch bản điển hình khi sử dụng property này như sau:

1. Một user bấm Play, hoặc các tương tác khác yêu cầu stream bắt đầu phát.
2. Audio File Stream Services bắt đầu parse cái stream.
3. Khi đủ audio data packets được parse để gửi đi khắp app, Audio File Stream Services thiết lập `kAudioFileStreamProperty_ReadyToProducePackets` property thành `true` (thực ra là giá trị 1) trong audio file stream object của ta.
4. Audio File Stream Services invoke các callback, kèm theo giá trị của property `kAudioFileStreamProperty_ReadyToProducePackets`.
5. Hàm callback sẽ chọn lựa action hợp lý, ví dụ như thiết lập một audio queue object để phát stream.

Thứ hai, ta cần một callback cho audio data. Audio File Stream Services gọi hàm callback này bất cứ khi nào nó thu thập được một tập audio data packets hoàn thiện. Ta thiết lập các callbacks này để xử lý audio nhận được. Thông thường, ta phát ngay lập tức băng việc gửi nó tới Audio Queue Services. Để biết chi tiết hơn về playback, mời các bạn đón chờ những bài sau nhé.

# Kết
Trên đây là một số vấn đề liên quan đến Sound Files và Sound Stream trong Core Audio, hy vọng sẽ đem lại nguồn kiến thức tham khảo cho mọi người.

----

*Dịch và tham khảo từ [Core Audio Essentials](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/CoreAudioEssentials/CoreAudioEssentials.html#//appleref/doc/uid/TP40003577-CH10-SW1)*