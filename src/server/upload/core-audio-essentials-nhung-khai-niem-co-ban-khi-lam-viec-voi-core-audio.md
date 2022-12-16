Apple thiết kế các software interface để làm việc với Core Audio thông qua các cách tiếp cận khác nhau như theo layer, cooperation hay task-focus. 

Bài viết hôm nay giới thiệu ngắn gọn những interface này và cách chúng làm việc với nhau.

## API Architectural Layers

Programming interface của Core Audio được xếp thành 3 tầng, như mô tả dưới đây:

![](https://images.viblo.asia/114a1d64-0748-4cd7-954f-998957d48348.png)

Tầng thấp nhất bao gồm:
- I/O Kit, để tương tác với các trình điều khiển.
- Audio hardware abstraction layer (audio HAL), cung cấp cho ta một device-independent, driver-independent interface để làm việc với phần cứng.
- Core MIDI, cung cấp software abstraction để ta làm việc với MIDI streams và các thiết bị.
- Host Time Services, cung cấp khả năng truy cập vào computer's clock.

Mac app có thể được viết để sử dụng những công nghệ này một cách trực tiếp khi bài toán của ta yêu cầu hiệu năng cao nhất, real-time nhất có thể. Tuy nhiên có nhiều ứng dụng không cần truy cập đến tầng này. Core Audio trong iOS cung cấp nhiều cách để có thể đạt được real-time audio sử dụng các interface ở level cao hơn. Ví dụ như OpenAL, sử dụng I/O trực tiếp cho real-time audio trong game. Cho ta một API nhẹ nhàng hơn đáng kể và phù hợp với nền tảng di động.

Tầng giữa trong Core Audio bao gồm các service để convert data format, đọc và ghi ra ổ cứng, parse stream, và làm việc với các plug-in.

- Audio Converter Services  cho phép ứng dụng làm việc với các audio data format converter.
- Audio File Services hỗ trợ đọc ghi audio data trên ổ đĩa cứng.
- Audio Unit Services và Audio Processing Graph Services cho phép ứng dụng làm việc với các digital signal processing (DSP) plug-in như là equalizer và mixer.
- Audio File Stream Services cho phép ta xây dựng ứng dụng có thể parse stream, như play file stream qua kết nối mạng.
- Core Audio Clock Services hỗ trợ đồng bộ audio và MIDI cũng như việc chuyển đổi time-base.
- Audio Format Services (một API nhỏ không có trong hình trên) hỗ trợ việc quản lý audio format trong ứng dụng.

Core Audio trong iOS có hầu hết các service này.

Tầng cao nhất trong Core Audio bao gồm các streamlined interface, là sự kết hợp các tính năng từ các tầng dưới.

- Audio Queue Services cho phép ra record, play, pause, loop, và đồng bộ audio. Nó sử dụng các codecs cần thiết để xử lý các định dạng âm thanh nén.
- `AVAudioPlayer` class cung cấp một Objective-C interface để play và loop audio cũng như việc tua lại hay tua nhanh.
- Extended Audio File Services kết hợp các tính năng từ Audio File Services và Audio Converter Services. Cho ta một interface thống nhất để đọc và ghi các file âm thanh nén và không nén.
- OpenAL là phần implementation của Core Audio theo chuẩn open-source OpenAL cho positional audio. Nó được xây dựng trên nền là 3D Mixer audio unit mà hệ thống cung cấp. Tất cả các ứng dụng đều có thể sử dụng OpenAL, mặc dù nó thích hợp nhất là cho phát triển game.

## Frameworks

Để có một góc nhìn khác về Core Audio, ta hãy xem xét các API framework của nó.

- Audio Toolbox framework (`AudioToolbox.framework`) cung cấp interface cho các mid và high level service trong Core Audio. Trong iOS, framework này chứa Audio Session Services, interface để quản lý audio behaviour của ứng dụng ở ngữ cảnh thiết bị là mobile device.
- Audio Unit framework (`AudioUnit.framework`) cho phép ứng dụng làm việc với các audio plug-in, vào gồm các audio unit và codec.
- AVFoundation framework (`AVFoundation.framework`) cung cấp `AVAudioPlayer` class, một streamlined và simple Objectice-C interface cho audio playback. Nó cũng cung cấp `AVAudioEngine` class để có thể có xử lý tinh vi hơn.
- Core Audio framework (`CoreAudio.framework`) cung cấp các kiểu dữ liệu sử dụng xuyên suốt Core Audio cũng như các interface để làm việc với các low-level service.
- Core Audio Kit framework (`CoreAudioKit.framework`) cung cấp một API nhỏ để tạo UI cho các audio unit. Framework này không có trong iOS.
- Core MIDI framework (`CoreMIDI.framework`) cho phép ứng dụng làm việc với MIDI data và cấu hình mạng MIDI. Framework này không có trong iOS.
- Core MIDI Server framework (`CoreMIDIServer.framework`) cho phép các trình điều khiển MIDI giao tiếp với OS X MIDI server. Framework này không có trong iOS.
- OpenAL framework (`OpenAL.framework`) cung cấp một interface để làm việc với OpenAL, một open source, positional audio technology.

## Proxy Objects

Core Audio sử dụng từ *proxy object* để thể hiện những thứ như file, stream, audio player,... Khi ta muốn ứng dụng làm việc với các audio file trên ổ cứng, bước đầu tiên là khởi tạo một instance của audio file object thuộc kiểu `AudioFileID`. Object này được khai báo là một opaque data structure trong `AudioFile.h`:
```rust
typedef struct OpaqueAudioFileID *AudioFileID;
```
Ta khởi tạo một audio file object, và tạo một audio file thực gắn với object đó bằng việc gọi hàm `AudioFileCreateWithURL`.  Hàm này cho ta một tham chiếu tới audio file object. Bắt đầu từ thời điểm này, bạn đang làm việc với audio file thực thông qua việc giao tiếp với proxy object.

Cách hoạt động này đồng nhất xuyên suốt Core Audio khi bạn làm việc với audio file, iPhone audio session hay thậm chí là hardware devices.

## Properties, Scopes, and Elements

Phần lớn các Core Audio interface sử dụng một cơ chế *property* để quản lý object state hoặc sửa đổi object behaviour. Một property là một cặp key-value.

- Một property key thường là một hẳng số enum với một cái tên gợi nhớ, như kiểu `kAudioFilePropertyFileFormat` hoặc `kAudioQueueDeviceProperty_NumberChannels`.
- Một property value là giá trị của một kiểu dữ liệu phù hợp với mục đích của property, một `void*`, một `Float64`, một `AudioChannelLayout` structure,...

Có nhiều property được Apple định nghĩa sẵn. Ta đi tìm các nơi viết các định nghĩa này ở trong các header file của Core Audio framework. Một vài Core Audio interface, như Audio Unit Services, cho phép ta tự định nghĩa property riêng của mình.

Các Core Audio interface sử dụng các hàm accessor để nhận property value từ một object và trong trường hợp writable property, các hàm này có thể thay đổi giá trị của property value. Ta cũng có thể tìm thấy một third accessor function để lấy thông tin về các properties. Ví dụ, hàm `AudioUnitGetPropertyInfo` trong Audio Unit Services cho ta biết kích cỡ kiểu dữ liệu của một property value được đưa vào và khả năng thay đổi nó. Hàm `AudioQueueGetPropertySize` lấy thông tin về kích thước một property value.

Các Core Audio interface cung cấp một cơ chế để thông báo cho ứng dụng khi một property thay đổi. Ta sẽ xem ở section dưới.

Trong một số trường hợp, một property apply cho toàn bộ audio object. Ví dụ, để bật audio level metering trong một playback audio queue object, ta thiết lập giá trị của `kAudioQueueProperty_EnableLevelMetering` là `true`.

Các Core Audio object có thể có các tập property riêng. Ví dụ như một audio unit có một input scope, một output scope, một global scope. Một input hay output scope của một audio unit bao gồm một hay nhiều element, mỗi element tương tự như một channel bus trong audio hardware. Khi ta gọi hàm `AudioUnitGetProperty` với `kAudioUnitProperty_AudioChannelLayout` property, ta chỉ định không chỉ audio unit mà ta cần thông tin mà còn cả scope (input hay output) và element (0, 1, 2,...).

## Callback Functions: Interacting with Core Audio

Có nhiều Core Audio interface có thể giao tiếp với ứng dụng của bạn thông qua các callback function. Core Audio sử dụng các callback cho những thứ như:

- Cung cấp một đoạn audio data tới ứng dụng (như khi record, ta nhận dữ liệu audio ghi được qua hàm callback và ghi vào ổ cứng).
- Yêu cầu một đoạn audio data từ ứng dụng (như khi play, hàm callback đọc từ ổ cứng và trả về data)
- Thông báo cho ứng dụng biết một object đã thay đổi trạng thái.

Trong trường hợp callback, hệ điều hành sẽ invoke behaviour mà ta implement trong ứng dụng. Bằng việc định nghĩa một callback trong ứng dụng tuân theo template, hệ điều hành có thể invoke thành công. Ví dụ, Audio Queue Services chỉ định một template cho một callback cho phép ta lấy và tương tác khi một audio queue property thay đổi. Callback template này được khai báo trong `AudioQueue.h`:
```c
typedef void (*AudioQueuePropertyListenerProc) (
                                    void*                  inUserData,
                                    AudioQueueRef          inAQ,
                                    AudioQueuePropertyID   inID,
                                );
```
Để implement và sử dụng một callback trong ứng dụng, ta xử lý 2 việc:
1. Implement callback function. Ví dụ, ta có thể implement audio queue property listener callback để cập nhật title và enable/disable state của nút trên UI, dựa vào trạng thái running hay stopped của audio queue object.
2. Đăng ký callback function với object mà ta muốn tương tác cùng. Một cách để đăng ký callback, điển hình khi sử dụng để gửi hoặc nhận audio data, đó là khi khởi tạo object: Trong hàm gọi khởi tạo object, ta truyền một tham chiếu tới callback dưới dạng function parameter. Một cách khác, điển hình khi sử dụng để lắng nghe trạng thái property, là sử dụng dedicated function call.

Một property listener callback implementation
```java
static void propertyListenerCallback (
    void                    *inUserData,
    AudioQueueRef           queueObject,
    AudioQueuePropertyID    propertyID
) {
    AudioPlayer *player = (AudioPlayer*) inUserData;
    // gets a reference to the playback object
    [player.notificationDelegate updateUserInterfaceOnAudioQueueStateChange: player];
    // your notificationDelegate class implements the UI update method
}
```
Trong Objective-C class definition, ta đặt định nghĩa hàm này nằm ngoài class. Đây là lý do, trong thân hàm, có một câu lệnh để lấy tham chiếu tới playback object, trong trường hợp này, `inUserData` parameter chính là object của ta. Tham chiếu này được truyền vào khi ta đăng ký callback.

Đăng ký một property listener callback
```python
AudioQueueAddPropertyListener (
    self.queueObject,                 // the object that will invoke your callback
    kAudioQueueProperty_IsRunning,    // the ID of the property you want to listen for
    propertyListenerCallback,         // a reference to your callback function
    self
);
```

# Kết
Trên đây là những điều cơ bản đầu tiên bạn cần biết để làm việc với Core Audio. Hy vọng bài viết sẽ có ích cho các bạn. Phần này còn nhiều, tôi sẽ viết tiếp ở các bài sau.

-----

*Dịch và tham khảo từ [Core Audio Overview](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/WhatisCoreAudio/WhatisCoreAudio.html)*