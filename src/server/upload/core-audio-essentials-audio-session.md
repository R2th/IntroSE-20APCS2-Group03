Trong iOS, ứng dụng của ta chạy trên một thiết bị mà thi thoảng lại có một tác vụ quan trọng cần thực hiện ví dụ như gọi điện thoại. Nếu ứng dụng của ta đang play âm thanh và có một cuộc gọi đến, iPhone sẽ cần phải xử lý một số thứ cho nó "đúng đắn".

Đầu tiên, cái "đúng đắn" ở đây là phải đáp ứng được trải nghiệm người dùng. Thứ hai, nó cũng có nghĩa là iPhone cần xem xét trạng thái của mỗi ứng dụng đang chạy khi xử lý các yêu cầu tranh nhau từ các ứng dụng.

Một *audio session* là một trung gian giữa ứng dụng của ta và iOS. Mỗi ứng dụng trên iPhone có duy nhất một audio session. Ta cấu hình nó để thể hiện các ý định tương tác với audio của ứng dụng. Để bắt đầu, ta cần phải tự trả lời một số câu hỏi về việc ứng dụng muốn có các hành vi như thế nào:

- Ứng dụng của ta sẽ xử lý thế nào khi gặp các interruption? Ví dụ như một cuộc gọi điện thoại.
- Có định hòa âm thanh của ứng dụng với âm thanh từ các app khác đang chạy, hay muốn các app khác im hết?
- Ứng dụng của ta sẽ xử lý thế nào khi gặp một audio route change? Ví dụ như người dùng gắn hay tháo tai nghe.

Với các câu trả lời trong tay, ta truy cập audio session interface (khai báo trong `AudioToolbox/AudioServices.h`) để cấu hình audio session cho app.

| Audio session feature | Description |
| -------- | -------- |
| Categories    | Một category là một chiếc chìa khóa để xác định một tập các audio behavior cho app của ta. Khi thiết lập category, ta xác định các định hướng tương tác audio với iOS, như là việc audio có nên tiếp tục khi màn hình bị khóa hay không. |
| Interruptions và route changes | Audio session sẽ post các notification khi gặp interruption, khi kết thúc interruption, và khi xuất hiện audio route change từ phần cứng. Các notification này cho phép ta phản ứng với các thay đổi trong môi trường âm thanh lớn hơn (chẳng hạn như bị gián đoạn do một cuộc gọi điện thoại tới) một cách nuột nà. |
| Hardware characteristics | Ta có thể yêu cầu audio session show ra các đặc tính của thiết bị mà ứng dụng đang chạy cùng, ví dụ như hardware sample rate, số lượng hardware channel, và audio input có hay không. |

### Audio Session Default Behavior

Một audio session cung cấp một vài behavior mặc định. Cụ thể là:

- Khi người dùng gạt nút Ring/Silent để chuyển về chế độ im lặng, audio của ta sẽ bị im lặng.
- Khi người dùng bấm nút Sleep/Wake để khóa màn hình, hoặc khi chu kì Auto-Lock tới hạn, audio của ta sẽ bị im lặng.
- Khi audio của ta bắt đầu chạy, các audio khác trên thiết bị (như Apple Music đang play nhạc chẳng hạn) sẽ bị im lặng.

Tập các behavior này được chỉ định bằng audio session category mặc định, hay còn được biết đến với cái tên `kAudioSessionCategory_SoloAmbientSound`. iOS cung cấp các category cho nhiều nhu cầu audio khác nhau. từ hiệu ứng UI đến việc chạy đồng thời audio input và output, hay việc sử dụng cho ứng dụng VOIP. Ta có thể chỉ định category mong muốn vào lúc khởi động hoặc trong khi app chạy.

Audio session default behavior đủ để bạn bắt đầu với iPhone audio development ngoại trừ một số trường hợp đặc biệt

### Interruptions: Deactivation và Activation

Một tính năng mà ta có thể dễ thấy là thiếu sót trong một default audio session đó là khả năng tự kích hoạt lại sau khi gặp interruption. Một audio session có hai trạng thái chính: active và inactive. Audio có thể làm việc với ứng dụng chỉ khi audio session ở trạng thái active.

Khi khởi chạy, default audio session sẽ là active. Tuy nhiên, nếu có một cuộc gọi điện thoại tới, session của ta sẽ ngay lập tức bị deactivate và audio sẽ dừng lại. Điều này được gọi là *interruption*. Nếu người dùng chọn bỏ qua cuộc gọi, ứng dụng của ta sẽ tiếp tục chạy, nhưng audio session đã chuyển thành inactive, audio không còn hoạt động.

Nếu ta sử dụng OpenAL, I/O audio unit, hoặc Audio Queue Services cho audio trong ứng dụng, ta cần phải viết một hàm callback để lắng nghe interruption và tự kích hoạt lại audio session khi interruption kết thúc. Tham khảo [Audio Session Programming Guide](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/Introduction/Introduction.html) để biết chi tiết và có các example.

Nếu ta sử dụng class `AVAudioPlayer`, class này sẽ lo luôn việc kích hoạt lại audio session.

### Xác định Audio Input có hay không

Một ứng dụng ghi âm trên một iOS-based device chỉ có thể ghi chỉ nếu có audio input hardware. Để xem có hay không, ta sử dụng một audio session property là `kAudioSessionProperty_AudioInputAvailable`. Thực ra phần này giới thiệu cho biết vì hồi iPod touch thế hệ 2 chưa có sẵn mic ghi âm trên máy nên cần phải check.

```
UInt32 audioInputIsAvailable;
UInt32 propertySize = sizeof(audioInputIsAvailable);
 
AudioSessionGetProperty (
    kAudioSessionProperty_AudioInputAvailable,
    &propertySize,
    &audioInputIsAvailable // A nonzero value on output means that
                           // audio input is available
);
```

### Sử dụng Audio Session

Ứng dụng chỉ có một audio session category tại một thời điểm, vì thế, tại một thời điểm nhất định, tất cả audio tuân theo các đặc tính của category đang active. Có một audio nằm ngoài nguyên tắc này đó là audio được play bởi System Sound Services - một API cho các âm thanh thông báo và hiệu ứng UI. Các audio này luôn sử dụng audio session category có độ ưu tiên thấp nhất [Responding to Interruptions](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/HandlingAudioInterruptions/HandlingAudioInterruptions.html) mô tả tất cả các category.

Khi ta thêm một audio session vào app, ta vẫn có thể dev và test trên máy ảo. Tuy nhiên, máy ảo không mô phỏng session behavior. Để kiểm tra audio session code, ta cần chạy trên máy thật.

> **Chú ý**: Bỏ qua Audio Session Services sẽ không ngăn ứng dụng chạy, nhưng app có thể không hoạt động theo cách ta muốn. Trong phần lớn trường hợp, ta không nên phát triển ứng dụng sử dụng audio mà không xử lý audio session. 

## Playback sử dụng AVAudioPlayer

`AVAudioPlayer` cung cấp một interface Objective-C đơn giản cho audio playback. Nếu ứng dụng của ta không yêu cầu định vị stereo hoặc đồng bộ chính xác, và nếu không play audio từ network stream, Apple khuyến khích ta sử dụng class này để playback.

Sử dụng một audio player ta có thể:

- Phát âm thanh với bất kỳ thời lượng nào.
- Phát âm thanh từ files hoặc bộ nhớ buffer.
- Lặp âm thanh.
- Phát nhiều âm thanh cùng một lúc.
- Kiểm soát playback level cho từng âm thanh mà ta đang phát.
- Seek tới một điểm trong sound file, hỗ trợ các tính năng như tua nhanh và tua lại.
- Lấy dữ liệu để dùng cho audio level metering.

`AVAudioPlayer` cho phép ta phát âm thanh với theo bất kỳ audio forrmat nào có sẵn trong iOS. 

Không giống như OpenAL, I/O audio unit, và Audio Queue Services, `AVAudioPlayer` không yêu cầu ta sử dụng Audio Session Services. Một audio player sẽ tự kích hoạt lại sau khi gặp interruption. Nếu ta muốn các hành vi được chỉ  định bởi default audio session category, như kiểu audio tự dừng khi màn hình khóa, ta có thể sử dụng default audio session kèm với một audio player.

Để cấu hình một audio player để playback, ta gán một sound file cho nó, chạy hàm prepare, gán delegate các thứ:

```
NSString *soundFilePath =
                [[NSBundle mainBundle] pathForResource: @"sound"
                                                ofType: @"wav"];
 
NSURL *fileURL = [[NSURL alloc] initFileURLWithPath: soundFilePath];
 
AVAudioPlayer *newPlayer =
                [[AVAudioPlayer alloc] initWithContentsOfURL: fileURL
                                                       error: nil];
[fileURL release];
 
self.player = newPlayer;
[newPlayer release];
 
[self.player prepareToPlay];
[self.player setDelegate: self];
```

Ta có thể sử dụng một delegate object để xử lý interruption và để cập nhật UI khi một file âm thanh phát xong. 

```
- (void) audioPlayerDidFinishPlaying: (AVAudioPlayer *) player
                        successfully: (BOOL) flag {
    if (flag == YES) {
        [self.button setTitle: @"Play" forState: UIControlStateNormal];
    }
}
```

Để play, pause hoặc stop một `AVAudioPlayer` object, ta chỉ cần gọi các hàm điều khiển playback tương ứng. Ta có thể kiểm tra playback có đang chạy không bằng `playing` property. 

```
- (IBAction) playOrPause: (id) sender {
 
    // if already playing, then pause
    if (self.player.playing) {
        [self.button setTitle: @"Play" forState: UIControlStateHighlighted];
        [self.button setTitle: @"Play" forState: UIControlStateNormal];
        [self.player pause];
 
    // if stopped or paused, start playing
    } else {
        [self.button setTitle: @"Pause" forState: UIControlStateHighlighted];
        [self.button setTitle: @"Pause" forState: UIControlStateNormal];
        [self.player play];
    }
}
```

`AVAudioPlayer` sử dụng các thuộc tính để quản lý thông tin về một âm thanh, ví dụ như điểm playback trong timeline của âm thanh, cũng như truy cập các tùy chọn playback như volume và looping.

```
[self.player setVolume: 1.0];    // available range is 0.0 through 1.0
```

Để biết thêm thông tin, hãy xem docs của Apple nhé [AVAudioPlayer Class Reference](https://developer.apple.com/documentation/avfoundation/avaudioplayer)


-----

*Dịch và tham khảo từ [Core Audio Overview](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/Introduction/Introduction.html)*