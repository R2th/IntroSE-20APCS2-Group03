*Audio Queue Services* cung cấp một cách trực tiếp và tốn ít công sức để record và play audio. Nó cho phép ứng dụng của chúng ta sử dụng thiết bị ghi âm và playback (như microphones và loa) mà không cần phải biết cách tương tác với hardware interface. Nó cũng cho phép ta sử dụng các codecs phức tạp mà không cần biết làm thế nào để codecs hoạt động.

Mặc dù là một high-level interface, *Audio Queue Services* hỗ trợ một vài tính năng nâng cao. Giả dụ như nó cung cấp khả năng kiểm soát timing một cách chi tiết để hỗ trợ việc lên lịch playback và đồng bộ hóa. Ta có thể sử dụng nó để đồng bộ playback của nhiều hàng đợi audio (audio queues), để có thể play song song nhiều âm thanh, để kiểm soát một cách độc lập playback level của nhiều âm thanh, và để thực hiện việc phát lặp. *Audio Queue Services* và `AVAudioPlayer` là những lựa chọn tốt để play các định dạng audio nén trên các thiết bị iOS. Thực ra bây giờ còn có `AVAudioEngine` nữa rất hay.

Người ta thường sử dụng *Audio Queue Services* kết hợp với *Audio File Services* hoặc với *Audio File Stream Services*.

## Sử dụng Audio Queue Callback Functions để Recording và Playback

Cũng giống như các audio services khác, chúng ta tương tác với audio queue objects sử dụng callbacks và properties. Để recording, ta implement một callback function mà công việc của nó là nhận audio data buffers được cung cấp bởi recording audio queue object, và sau đó ghi xuống bộ nhớ lưu trữ. Audio queue object sẽ gọi tới hàm callback của ta khi có một buffer mới của dữ liệu ghi âm. Hình dưới đây là sự minh hoạ cho quá trình này:

![](https://images.viblo.asia/625b0084-c731-4ae8-b9ee-fc712676e671.png)

Để playback, hàm callback sẽ có vai trò ngược lại. Nó sẽ được gọi tới khi playback audio queue object cần thêm buffer của audio để play. Hàm callback sau đó đọc một lượng audio packets từ bộ nhớ và đưa chúng vào một trong các audio queue object's buffer. Audio queue object sẽ play các buffer lần lượt.

![](https://images.viblo.asia/7e7df52c-8ff3-44dd-9731-30c721882c97.png)

## Tạo một Audio Queue Object

Để sử dụng Audio Queue Services, đầu tiên ta cần phải tạo ra một audio queue object. Mặc dù có 2 nhiệm vụ khác nhau nhưng data type thì đều là `AudioQueueRef`.
- Để tạo ra một recording audio queue object , sử dụng `AudioQueueNewInput`.
- Để tạo ra một playback audio queue object, sử dụng `AudioQueueNewOutput`

Để tạo ra một audio queue object cho việc playback, ta thực hiện ba bước sau:

1. Tạo một data structure để quản lý thông tin cần bởi audio queue, như là audio format cho dữ liệu mà ta muốn play.
2. Định nghĩa 1 hàm callback để quản lý audio queue buffers. Callback này sử dụng Audio File Services để đọc file mà ta muốn play.
3. Khởi tạo playback audio queue sử dụng hàm `AudioQueueNewOutput`.

```
static const int kNumberBuffers = 3;
// Create a data structure to manage information needed by the audio queue
struct myAQStruct {
    AudioFileID                     mAudioFile;
    CAStreamBasicDescription        mDataFormat;
    AudioQueueRef                   mQueue;
    AudioQueueBufferRef             mBuffers[kNumberBuffers];
    SInt64                          mCurrentPacket;
    UInt32                          mNumPacketsToRead;
    AudioStreamPacketDescription    *mPacketDescs;
    bool                            mDone;
};
// Define a playback audio queue callback function
static void AQTestBufferCallback(
    void                   *inUserData,
    AudioQueueRef          inAQ,
    AudioQueueBufferRef    inCompleteAQBuffer
) {
    myAQStruct *myInfo = (myAQStruct *)inUserData;
    if (myInfo->mDone) return;
    UInt32 numBytes;
    UInt32 nPackets = myInfo->mNumPacketsToRead;
 
    AudioFileReadPackets (
        myInfo->mAudioFile,
        false,
        &numBytes,
        myInfo->mPacketDescs,
        myInfo->mCurrentPacket,
        &nPackets,
        inCompleteAQBuffer->mAudioData
    );
    if (nPackets > 0) {
        inCompleteAQBuffer->mAudioDataByteSize = numBytes;
        AudioQueueEnqueueBuffer (
            inAQ,
            inCompleteAQBuffer,
            (myInfo->mPacketDescs ? nPackets : 0),
            myInfo->mPacketDescs
        );
        myInfo->mCurrentPacket += nPackets;
    } else {
        AudioQueueStop (
            myInfo->mQueue,
            false
        );
        myInfo->mDone = true;
    }
}
// Instantiate an audio queue object
AudioQueueNewOutput (
    &myInfo.mDataFormat,
    AQTestBufferCallback,
    &myInfo,
    CFRunLoopGetCurrent(),
    kCFRunLoopCommonModes,
    0,
    &myInfo.mQueue
);
```

## Kiểm soát Audio Queue Playback level

Audio queue object cho chúng ta hai cách để kiểm soát playback level.

Để thiết lập trực tiếp playback level, sử dụng hàm `AudioQueueSetParameter` với param là `kAudioQueueParam_Volume`. Những thay đổi sẽ được apply ngay lập tức.

```
Float32 volume = 1;
AudioQueueSetParameter (
    myAQstruct.audioQueueObject,
    kAudioQueueParam_Volume,
    volume
);
```

Bạn cũng có thể thiết lập playback level cho một audio queue buffer, sử dụng hàm `AudioQueueEnqueueBufferWithParameters`. Thực tế thì cách này cho phép ta gán các thiết lập của audio queue cho một audio queue buffer mà ta đang đợi. Những thay đổi này sẽ được apply khi audio queue buffer bắt đầu play.

Trong cả hai trường hợp, các thay đổi về level sẽ giữ nguyên cho tới khi ta thay đổi nó lần nữa.

## Xác định Audio Queue Playback level

Ta có thể nhận về giá trị hiện tại của playback level từ một audio queue object bằng việc truy vấn tới thuộc tính `kAudioQueueProperty_CurrentLevelMeterDB` của nó. Giá trị của thuộc tính này là một mảng của `AudioQueueLevelMeterState` struct, mỗi channel 1 mảng. Về cấu trúc của struct:

```
typedef struct AudioQueueLevelMeterState {
    Float32     mAveragePower;
    Float32     mPeakPower;
};  AudioQueueLevelMeterState;
```

## Play nhiều âm thanh song song

Để play nhiều âm thanh song song, ta tạo một playback audio queue object cho mỗi âm thanh. Với mỗi audio queue đó, lên lịch trình cho buffer đầu tiên của audio bắt đầu cùng thời điểm sử dụng hàm `AudioQueueEnqueueBufferWithParameters`.

Định dạng audio là cực kỳ quan trọng khi ta play nhiều âm thanh song song trên iOS. Bởi vì playback của một định dạng nén nhất định trong iOS cần sử dụng hardware codec một cách hiệu quả. Chỉ một instance của một trong các định dạng sau đây có thể play trên device ở một thời điểm:

- AAC
- ALAC (Apple Lossless)
- MP3

Để play nhiều âm thanh song song với chất lượng cao, sử dụng linear PCM hoặc IMA4 audio.

List dưới đây mô tả cách mà iOS hỗ trợ các định dạng audio cho việc playback đa hay đơn lẻ:

- *Linear PCM và IMA/ADPCM (IMA4)*: Bạn có thể play nhiều âm thanh ở định dạng linear PCM hoặc IMA4 song song trong iOS mà sẽ không phát sinh vấn đề tài nguyên CPU.
- *AAC, MP3 và Apple Lossless (ALAC)* sử dụng nhiều hardware-based decoding trên iOS. Ta có thể play chỉ một âm thanh ở một thời điểm.

## Playback với Positioning sử dụng OpenAL

Audio API có trong OpenAL framework và được xây dựng nằm trên Core Audio, nó được tối ưu cho việc positioning âm thanh trong khi playback. OpenAL giúp mọi việc dễ dàng hơi khi ta play, position, mix và move âm thanh, sử dụng một interface được mô phỏng theo OpenGL. OpenAL và OpenGL sử dụng chung một hệ tọa độ , cho phép chúng ta đồng bộ những di chuyển của âm thanh và các đối tượng đồ họa trên màn hình. OpenAL sử dụng trực tiếp Core Audio's I/O audio unit để có được độ trễ playback thấp nhất.

Với tất cả những lý do này, OpenAL là lựa chọn tốt nhất để play sound effects trong những ứng dụng game trên iOS. Tuy nhiên cũng là một lựa chọn tốt cho những ứng dụng iOS có playback khác.

OpenAL 1.1 trong iOS chưa hỗ trợ audio capture. Do đó để recording trong iOS, ta sử dụng *Audio Queue Services*.

OpenAL trong OS X được tạo ra từ specs của OpenAL 1.1 kèm theo những mở rộng. OpenAL trong iOS có hai tính năng mở rộng của riêng Apple:

- `alBufferDataStaticProcPtr` tuân theo việc sử dụng pattern cho `alBufferData` nhưng loại bớt đi một buffer data copy.
- `alcMacOSXMixerOutputRateProcPtr` cho phép ta kiểm soát sample rate của mixer nằm bên dưới. Với Mac, để lấy ví dụ về việc sử dụng OpenAL trong Core Audio, xem `Services/OpenALExample` trong Core Audio SDK.

---

*Dịch và tham khảo từ [Core Audio Programming Guide](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/CoreAudioOverview/CoreAudioEssentials/CoreAudioEssentials.html#//appleref/doc/uid/TP40003577-CH10-SW32)*