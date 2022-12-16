![](https://2.bp.blogspot.com/-fbrmoKKIVEs/XRqd5mhJTnI/AAAAAAAAJhM/vpSAo10DeGoKInMNYOGvkzbHIVu604yNQCLcBGAs/s1600/Apps%2Band%2Bmicrophone%2Bv2.png)
Trên Android Q được ban hành có một API mới cho phép ứng dụng ghi âm lại âm thanh của một ứng dụng. Đó là [AudioPlaybackCapture API](https://developer.android.com/preview/features/playback-capture) và nó cho phép một số trường hợp sử dụn quan trọng cho việc chia sẻ nội dung và tiếp cận được dễ dàng.

Các ví dụ bao gồm:

- **Live captioning**: cho phép nội dung âm thanh của ứng dụng đang chạy hiện tại để ghi chú hoặc biên dịch theo thời gian thực (**Real time**). Trên thực tế, tính năng [Live Caption](https://www.youtube.com/watch?v=hPv1PkjJ-J0) được trình diễn ở Google I/O năm nay là một phần của API này. Tính năng này cho phép người dùng tương tác với các nội dung có thể nghe thấy được ngay cả khi chúng không thể hoặc bất tiện để làm ví dụ như nghe tại các địa điểm công cộng khi không có headphones.
- **Game recording và streaming**: Âm thanh trong game có thể được ghi âm lại và phát trực tiếp tới các khác giả, giúp bạn tăng khả năng tương tác với mạng xã hội với các nội dung game liên quan.

Sẽ có thể một số trường hợp khi developer mong muốn không cho phép ứng dụng khác ghi âm ứng dụng của họ. Bài viết này sẽ giải thích tính năng ghi âm này hoạt động như thế nào đối với người dùng và developer có thể ngăn chặn ứng dụng thứ 3 ghi âm ứng dụng của họ nếu cần.

#### Người dùng sẽ thấy gì?

Khi ghi âm audio của ứng dụng khác, người dùng cần phải cho phép [Quyền Ghi Âm](https://developer.android.com/reference/android/Manifest.permission#RECORD_AUDIO) để ứng dụng có thể chạy tính năng này.

![](https://3.bp.blogspot.com/-v-OC6Rj-7DU/XRqcVWGeUeI/AAAAAAAAJgw/dPhi2iFHaA4nk5VF5gBGCIJhDFcekJn0QCLcBGAs/s1600/image1.png)

Ngoài ra, để một phiên ghi âm có thể chạy thì ứng dụng ghi âm sẽ phải gọi [MediaProjectionManager.createScreenCaptureIntent()](https://developer.android.com/reference/android/media/projection/MediaProjectionManager#createScreenCaptureIntent()). Nó sẽ hiển thị dialog dưới cho người dùng nhận biết việc ghi âm sẽ start như thế nào.

![](https://4.bp.blogspot.com/-Sx_t-bIpW5A/XRqcnxKpEqI/AAAAAAAAJg4/CxWubwSVzUAdJMggie2QtTiPwYtVpeurwCLcBGAs/s1600/image2.png)

Người dùng phải chọn **"Start now"** để việc ghi âm được bắt đầu, nó cho phép cả video lẫn âm thanh được ghi âm cùng một thời điểm và icon Cast sẽ được hiển thị màu đỏ trên *Status Bar*.

![](https://3.bp.blogspot.com/-tIBcfupRCbY/XRqc1AvjKPI/AAAAAAAAJg8/1EfBOio9f3svtaUocggLTsgYLRfyP0wwgCLcBGAs/s1600/image3.png)

#### Ứng dụng của tôi có thể bị ghi lại?

Trường hợp này ta sẽ so sánh **Target API** từ 28 trở xuống và 29 (Android Q).

- Mặc định ứng dụng bên thứ ba có thể ghi lại âm thanh của bạn?
1. **API từ 28 trở xuống:** Không thể, ứng dụng cần phải có chính sách rõ ràng **-** [Capture Policy](https://developer.android.com/preview/features/playback-capture#capture_policy)
2. **API 29:** Có thể đối với âm thanh khi sử dụng *Audio Usage* là *MEDIA, GAME và UNKNOWN*

- Mặc định ứng dụng của hệ thống và các thành phần có thể ghi lại âm thanh ứng dụng của bạn? Đối với trường hợp này thì giống như trường hợp thứ 2 đó là có thể đối với âm thanh khi sử dụng *Audio Usage* là *MEDIA, GAME và UNKNOWN*.

#### Ngăn chặn việc ghi âm bởi ứng dụng bên thứ 3
Sẽ có một số trường hợp mong muốn ngăn chặn việc âm thanh của ứng dụng được ghi âm bởi các ứng dụng khác bởi vì âm thanh có thể chứa:

- **Thông tin nhạy cảm** - âm thanh riêng tư, thông tin các nhân.
- **Tài liệu bản quyền** - ví dụ như các bài nhạc bản quyền từ các bộ phim, ca sỹ.

#### Cách ngăn chặn việc ghi âm tất cả âm thanh từ ứng dụng bên thứ 3
Để ngăn chặn việc này thì bạn có thể chọn 1 trong 2 cách dưới đây: 

1. Thêm **android:allowAudioPlaybackCapture="false"** vào trong **AndroidManifest.xml**

``` Kotlin
<application
...
android:allowAudioPlaybackCapture="false"/>
```

2. Thêm **AudioManager.setAllowedCapturePolicy(ALLOW_CAPTURE_BY_SYSTEM)**  vào trong code ngay khi khởi tạo ứng dụng.

Ngoài ra có thể ngăn chặn một số ứng dụng được chỉ định bằng cách **AudioAttributes.Builder.setAllowedCapturePolicy(ALLOW_CAPTURE_BY_SYSTEM)**. Ví dụ như ứng dụng của bạn có các âm thanh bản quyền và không bản quyền, nó sẽ phân tách cho phép người dùng được ghi âm lại âm thanh không bản quyền và ngược lại.

#### Ngăn chặn việc ghi lại bởi ứng dụng hệ thống và các thành phần
Theo mặc định, các ứng dụng và thành phần hệ thống được phép thu âm thanh của ứng dụng nếu việc sử dụng là MEDIA, GAME và UNKNOWN, vì điều này cho phép các trường hợp sử dụng khả năng truy cập quan trọng.

Trong trường hợp nguy hiểm khi developer mong muốn chặn việc ghi âm bởi ứng dụng hệ thống, việc này cũng sẽ ngăn chặn ứng dụng bên thứ 3 ghi âm ứng dụng của bạn.

#### Ngăn chận ghi lại tất cả các âm thanh 
Ta chỉ việc thêm dòng code dưới đây 
```
AudioManager.setAllowedCapturePolicy(ALLOW_CAPTURE_BY_NONE)
```

Còn đối với việc ngăn chặn ghi âm theo các chính sách

```
AudioAttributes.Builder.setAllowedCapturePolicy(ALLOW_CAPTURE_BY_NONE)
```

#### Tiếp theo?
Nếu ứng dụng của bạn targeting tới API 28 hoặc thấp hơn và bạn muốn bật tích năng ghi âm, thêm **android:allowAudioPlaybackCapture="true"** vào trong app *manifest.xml* của bạn.

Nếu muốn chặn tất cả hoặc một số audio, hãy xem các hướng dẫn tại bài viết phía trên.

*Sources*: 

https://developer.android.com/preview/features/playback-capture
https://android-developers.googleblog.com/2019/07/capturing-audio-in-android-q.html?linkId=69868955