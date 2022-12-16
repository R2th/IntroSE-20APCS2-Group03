## Audio Data Format

Core Audio giúp chúng ta không cần phải hiểu biết quá chi tiết về các audio data format. Điều này không chỉ giúp ta có thể dễ dàng xử lý một format cụ thể mà còn giúp code của ta có thể làm việc được với bất cứ format nào mà hệ điều hành hỗ trợ.

> **Chú ý**: *Audio data format* và *audio file format* là hai khái niệm khác nhau. Audio data format mô tả dữ liệu audio thông qua những thứ như sample rate, bit depth và packetization. Audio file format mô tả cách mà audio data, audio metadata và filesystem metadata của một sound file được sắp xếp như thế nào trên ổ đĩa.

### Universal Data Types trong Core Audio
Trong Core Audio, ta sử dụng hai universal data type để thể hiện bất cứ audio data format nào. Đó là `AudioStreamBasicDescription` và `AudioStreamPacketDescription`, cả hai đều được khai báo trong `CoreAudioTypes.h` và được mô tả trong [Core Audio Data Types Reference](https://developer.apple.com/documentation/coreaudio/core_audio_data_types)

`AudioStreamBasicDescription` data type
```
struct AudioStreamBasicDescription {
    Float64 mSampleRate;
    UInt32  mFormatID;
    UInt32  mFormatFlags;
    UInt32  mBytesPerPacket;
    UInt32  mFramesPerPacket;
    UInt32  mBytesPerFrame;
    UInt32  mChannelsPerFrame;
    UInt32  mBitsPerChannel;
    UInt32  mReserved;
};
typedef struct AudioStreamBasicDescription  AudioStreamBasicDescription;
```
Trong struct trên, `mReserved` luôn phải có giá trị 0. Các thành phần khác cũng có thể có giá trị 0. Ví dụ, khi nén các audio format sử dụng số lượng bit trên mỗi sample khác nhau, với định dạng này, giá trị của `mBitsPerChannel` là 0.

> **Về cái tên**: Mặc dù data type này có chữ "stream" trong tên, nhưng ta vẫn sử dụng nó trong các instance mà ta cần represent một audio data format, dù có là non-streamed, standard file. Chữ "stream" ở đây thực chất chỉ muốn ám chỉ để việc khi ta play một audio, ta cần di chuyển audio data đi qua các thành phần hardware.

Type còn lại, audio stream packet description thường sử dụng cho một số định dạng nén cụ thể, ta sẽ bàn về vấn đề này phía dưới.
```
struct  AudioStreamPacketDescription {
    SInt64  mStartOffset;
    UInt32  mVariableFramesInPacket;
    UInt32  mDataByteSize;
};
typedef struct AudioStreamPacketDescription AudioStreamPacketDescription;
```
Để cố định bit-rate audio data, ta thiết lập `mVariableFramesInPacket` giá trị 0.

### Lấy Data Format từ Sound File
Khi tự điền các thành phần của `AudioStreamBasicDescription`, ta có thể sẽ không biết được giá trị chính xác cho một vài thành phần. Nên ta sẽ đi set các giá trị đó là 0 và sau đó sử dụng các Core Audio interface để lấy bản chuẩn.

Ví dụ, ta có thể sử dụng các Audio File Service để nhận được audio stream basic description hoàn chỉnh của một sound file nằm trên ổ đĩa như sau:
```
- (void) openPlaybackFile: (CFURLRef) soundFile {
 
    AudioFileOpenURL (
        (CFURLRef) self.audioFileURL,
        0x01,                  // read only
        kAudioFileCAFType,
        &audioFileID
    );
 
    UInt32 sizeOfPlaybackFormatASBDStruct = sizeof ([self audioFormat]);
 
    AudioFileGetProperty (
        [self audioFileID],
        kAudioFilePropertyDataFormat,
        &sizeOfPlaybackFormatASBDStruct,
        &audioFormat          // the sound file's ASBD is returned here
    );
}
```

### Canonical Audio Data Formats

Dựa trên platform, Core Audio sẽ có một hoặc hai "canonical" audio data format, các format này có thể là:

- Bắt buộc phải là format trung gian trong khi convert.
- Format mà một service trong Core Audio được tối ưu hoá.
- Một format mặc định khi ta không chỉ định bất cứ ASBD (AudioStreamBasicDescription) nào.

Cụ thể như sau:

- *iOS input và output*: Linear PCM với 16-bit integer samples.
- *iOS audio units và các tiến trình xử lý audio khác*: Noninterleaved linear PCM với 8.24-bit fixed-point sample.
- *Mac input và output*: Linear PCM với 32-bit floating point samples.
- *Mac audio units và các tiến trình xử lý audio khác*: Noninterleaved linear PCM với 32-bit floating point sample.

Dưới đây là một ví dụ về một ASBD đầy đủ thể hiện một format với 2 channel, canonical iPhone audio unit sample, 44.1 kHz sample rate.

```
struct AudioStreamBasicDescription {
    mSampleRate       = 44100.0;
    mFormatID         = kAudioFormatLinearPCM;
    mFormatFlags      = kAudioFormatFlagsAudioUnitCanonical;
    mBitsPerChannel   = 8 * sizeof(AudioUnitSampleType);                    // 32 bits
    mChannelsPerFrame = 2;
    mBytesPerFrame    = mChannelsPerFrame * sizeof(AudioUnitSampleType);    // 8 bytes
    mFramesPerPacket  = 1;
    mBytesPerPacket   = mFramesPerPacket * mBytesPerFrame;     // 8 bytes
    mReserved         = 0;
};
```

Các constant và data type được sử dụng như các giá trị ở ví dụ trên được khai báo trong `CoreAudioTypes.h` và được mô tả trong [Core Audio Data Types Reference](https://developer.apple.com/documentation/coreaudio/core_audio_data_types). Sử dụng `AudioUnitSampleType` ở đây (và `AudioSampleType` khi xử lý audio I/O) để đảm bảo rằng ASBD này là platform agnostic.

Hai khái niệm tiếp theo sẽ hoàn thiện phần bàn luận về audio data format trong Core Audio: Magic Cookies và Packets.

### Magic Cookies

Trong Core Audio, một magic cookie là một tập các metadata được gắn vào một compressed sound file hoặc stream. Metadata này cung cấp cho các bộ giải mã các chi tiết cần thiết để giải nén đúng cách file hoặc stream. Ta xem magic cookie là một black box, dựa trên hàm của Core Audio để copy, đọc và sử dụng contained metadata.

Ví dụ dưới đây viết một method mà nhận về một magic cookie từ một sound file và cung cấp cho một playback audio queue object:
```
- (void) copyMagicCookieToQueue: (AudioQueueRef) queue fromFile: (AudioFileID) file {
 
    UInt32 propertySize = sizeof(UInt32);
 
    OSStatus result = AudioFileGetPropertyInfo (
                            file,
                            kAudioFilePropertyMagicCookieData,
                            &propertySize,
                            NULL
                        );
 
    if (!result && propertySize) {
 
        char *cookie = (char*)malloc(propertySize);
 
        AudioFileGetProperty (
            file,
            kAudioFilePropertyMagicCookieData,
            &propertySize,
            cookie
        );
 
        AudioQueueSetProperty (
            queue,
            kAudioQueueProperty_MagicCookie,
            cookie,
            propertySize
        );
 
        free(cookie);
    }
}
```

### Audio Data Packets

Một packet là một tập hợp của một hoặc nhiều frame. Nó là một tập frame nhỏ nhất mà có nghĩa của một audio data format. Và với lý do đó, nó là đơn vị tốt nhất của một audio data để thể hiện một đơn vị thời gian trong một audio file. Việc đồng bộ trong Core Audio làm việc bằng cách đếm các packet. Ta có thể sử dụng các packet để tính toán kích thước buffer hữu dụng.

Tất cả các audio data format đều được định nghĩa một phần bởi cách mà các packet của nó được cấu hình. Audio stream basic description mô tả thông tin cơ bản về format's packet ở giá trị `mBytesPerPacket` và `mFramesPerPacket`. Với các format yêu cầu các thông tin thêm, ta sử dụng audio stream packet description.

Có ba loại packet sử dụng trong audio data format:

- Trong các CBR (constant bit rate) format, như linear PCM và IMA/ADPCM, tất cả các packet có cùng size.
- Trong các VBR (variable bit rate) format, như AAC, Apple Lossless, và MP3, tất cả các packet có cùng số lượng frame nhưng số lượng bit trong mỗi giá trị sample có thể khác nhau.
- Trong các VFR (variable frame rate) format, các packet có số lượng frame khác nhau. Không có format phổ thông nào ở dạng này.

Để sử dụng các VBR và VFR format trong Core Audio, ta sử dụng audio stream packet description structure. Mỗi structure như vậy mô tả một single packet trong sound file. Để record hoặc play một VBR hoặc VFR sound file, ta cần một mảng của các structure này, một phần tử cho một packet trong file.

Các interface trong Audio File Services và Audio File Stream Services cho phép ta làm việc với các packet. Ví dụ, một hàm `AudioFileReadPackets`  trong `AudioFile.h` cho ta một tập packet đọc từ một sound file trên ổ đĩa và đặt chúng vào một buffer. Cùng lúc đó, nó cho ta một mảng của `AudioStreamPacketDescription` structure mô tả mỗi phần tử trong đống packets thu được.

Trong các CBR và VBR format, số lượng packet mỗi giây được cố định cho mỗi audio file hoặc stream. Nó ngụ ý rằng: việc đóng gói thể hiện một đơn vị thời gian của format. Ta có thể lợi dụng điều này khi tính toán buffer size. Ví dụ, method dưới đây xác định số lượng packet để đọc và fill vào một buffer với một thời lượng của audio data được cấp sẵn:

```
- (void) calculateSizesFor: (Float64) seconds {
 
    UInt32 maxPacketSize;
    UInt32 propertySize = sizeof(maxPacketSize);
 
    AudioFileGetProperty (
        audioFileID,
        kAudioFilePropertyPacketSizeUpperBound,
        &propertySize,
        &maxPacketSize
    );
 
    static const int maxBufferSize = 0x10000;   // limit maximum size to 64K
    static const int minBufferSize = 0x4000;    // limit minimum size to 16K
 
    if (audioFormat.mFramesPerPacket) {
        Float64 numPacketsForTime =
            audioFormat.mSampleRate / audioFormat.mFramesPerPacket * seconds;
        [self setBufferByteSize: numPacketsForTime * maxPacketSize];
    } else {
        // if frames per packet is zero, then the codec doesn't know the
        // relationship between packets and time. Return a default buffer size
        [self setBufferByteSize:
            maxBufferSize > maxPacketSize ? maxBufferSize : maxPacketSize];
    }
 
    // clamp buffer size to our specified range
    if (bufferByteSize > maxBufferSize && bufferByteSize > maxPacketSize) {
        [self setBufferByteSize: maxBufferSize];
    } else {
        if (bufferByteSize < minBufferSize) {
            [self setBufferByteSize: minBufferSize];
        }
    }
 
    [self setNumPacketsToRead: self.bufferByteSize / maxPacketSize];
}
```

## Chuyển đổi Data Format

Để chuyển đổi audio data từ một format này sang format khác, ta sử dụng một audio converter. Ta có thể thực hiện một cú chuyển đổi đơn giản như là đổi sample rate hay interleaving/deinterleaving. Ta cũng có thể thực hiện một cú chuyển đổi phức tạp như nén hay giải nén audio. Có ba loại chuyển đổi:

- Giải mã một audio format (như là AAC sang linear PCM format).
- Chuyển đổi linear PCM data sang một audio format khác.
- Chuyển đổi qua lại giữa các linear PCM khác loại (ví dụ, 16-bit signed integer linear PCM sang 8.24 fixed-point linear PCM).

Khi ta sử dụng Audio Queue Services, ta sẽ tự động có một audio converter phù hợp. Audio Codec Services (chỉ trên Mac) cho phép ta tạo ra các audio codec chuyên dụng, như là để xử lý quản lý bản quyền kỹ thuật số (DRM) hoặc các định dạng âm thanh độc quyền. Sau khi ta tạo ra một custom codec, ta có thể sử dụng một audio converter để truy cập và sử dụng nó.

Khi ta sử dụng một audio converter trực tiếp trong OS X, ta gọi một hàm convert với một converter instance cụ thể, chỉ định nơi đọc input data và nơi ghi ra output data. Phân lớn việc chuyển đổi yêu cầu một callback function để định kỳ cung cấp input data cho converter.

# Kết

Trên đây là một số kiến thức cần thiết về Audio Data Format khi làm việc với Core Audio. Hy vọng sẽ hữu ích cho bạn nào cần.

-----

*Dịch và tham khảo từ [Core Audio Overview](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/WhatisCoreAudio/WhatisCoreAudio.html)*