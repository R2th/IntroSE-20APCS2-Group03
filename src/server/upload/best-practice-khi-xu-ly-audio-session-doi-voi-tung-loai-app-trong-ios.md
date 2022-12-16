Game sẽ không thể nào có những yêu cầu về audio giống như một video call app. Mỗi kiểu ứng dụng lại có những yêu cầu khác nhau về việc xử lý audio cho hợp lý, đặc biệt là khi làm việc với audio session, interuption, route change. Chúng ta hãy cùng xem xem mỗi loại app nên xử lý audio như thế nào nhé!

## Games
Phần lớn game yêu cầu người dùng tương tác với những thứ có trong game. Ta sử dụng session category `AVAudioSessionCategoryAmbient` hoặc `AVAudioSessionCategorySoloAmbient` khi thiết kế logic audio cho game. Khi người dùng đưa một ứng dụng khác lên foreground hoặc lock screen, họ sẽ mong muốn rằng app dừng lại. Và thường thì người dùng sẽ muốn audio từ ứng dụng khác có thể play trong khi chơi game (ví dụ như vừa bật nhạc vừa chơi game chẳng hạn). Sau đây là các best practice:

- Activate audio session trong hàm `applicationDidBecomeActive:` của app delegate.
- Cho phép audio từ các ứng dụng khác được play cùng với sound effect.
- Chỉ play soundtrack khi các audio khác không play.
- Luôn luôn reactivate và resume playback của các sound effect sau khi interruption kết thúc.
- Kiểm tra property `secondaryAudioShouldBeSilencedHint` của audio session để xác định xem có nên resume playback của soundtrack của game hay không.
- Bỏ qua xử lý route changes trừ khi app có vấn đề đặc biệt cần chú ý tới.
- Thiết lập audio category trước khi hiển thị một video splash khi app chạy.

## Ứng dụng có Playback và Recording điều khiển bởi người dùng

Các ứng dụng recording và playback như Pandora và Netflix có các behaviour tương tự. Kiểu ứng dụng này sử dụng category `AVAudioSessionCategoryRecord`, `AVAudioSessionCategoryPlayAndRecord`, hoặc `AVAudioSessionCategoryPlayback` và thường interrupt các system audio khác khi audio session của nó được activate. Giao diện thường bao gồm nút play/pause hoặc record/pause.

Sau đây là các best practice cho kiểu ứng dụng này:

- Khi ứng dụng vào trạng thái foreground, chờ người dùng bấm Play hoặc Record thì mới activate audio session.
- Trong khi ứng dụng đang ở foreground, giữ cho audio session active cho đến khi bị interrupt. 
- Nếu ứng dụng không play hay record audio khi nó chuyển về background, hãy deactivate audio session. Điều này giúp audio session tránh bị interrupt bởi các ứng dụng nonmixable hoặc bị system suspend.
- Cập nhật UI để xác định việc playback hoặc recording dừng lại khi gặp interrupt tuy nhiên không deactivate audio session. 
- Observe notification `AVAudioSessionInterruptionNotification` để nhận thông báo về audio session interruption. Khi interruption kết thúc, đừng bắt đầu play hay record lại trừ khi app đang thực hiện việc này trước khi gặp interruption.
- Dừng playback hoặc recording nếu một route change xảy ra do việc user tháo tai nghe, tuy nhiên vẫn giữ cho audio session active.
- Nếu audio session đang inactive khi chuyển từ trạng thái suspend thành foreground. Hãy reactive lại audio session khi người dùng bấm Play hoặc Record.
- Đảm bảo rằng audio `UIBackgroundModes` được thiết lập.
- Đăng ký remote control event (xem tài liệu về `MPRemoteCommandCenter`) và cung cấp thông tin Now Playing thích hợp cho media của bạn (xem tài liệu về MPNowPlayingInfoCenter).
- Sử dụng `MPVolumeView` object để thể hiện system volume slider và route picker.
- Sử dụng background task thay vì streaming silence để giữ ứng dụng không bị suspend.
- Yêu cầu người dùng quyền record bằng cách sử dụng hàm `requestRecordPermission:` thay vì để OS hỏi người dùng.
- Với các ứng dụng record, có thể sử dụng category `AVAudioSessionCategoryPlayAndRecord` thay cho `AVAudioSessionCategoryRecord` vì category chỉ record không sẽ silence hầu hết các cổng output của hệ thống và sẽ khá là hạn chế. Tuy nhiên nói chung điều này phụ thuộc vào business của app.

## Ứng dụng VoIP và Chat
Ứng dụng VoIP và Chat yêu cầu cả input và output phải available. Loại app này sử dụng category `AVAudioSessionCategoryPlayAndRecord` và sẽ không mix âm với những app khác.

Sau đây là các best practice:

- Chỉ activate audio session khi user trả lời hoặc bắt đầu một cuộc gọi.
- Nhớ cập nhật UI để thể hiện rằng audio của cuộc gọi đã bị interrupt nếu nhận được interruption notification.
- Không activate lại audio session sau interruption cho tới khi người dùng chủ động trả lời hoặc bắt đầu một cuộc gọi.
- Deactivate audio session sau khi cuộc gọi kết thúc, sử dụng kèm option `AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation`.
- Bỏ qua tất cả việc xử lý route changes trừ khi app có điểm đặc biệt cần chọc vào. Ví dụ, route change có thể gây ra những thay đổi với session sample rate, buffer duration, hay latency. Nếu những giá trị này liên quan tới app, bạn cần kiểm tra sau khi một route change xảy ra để lấy được trạng thái mới nhất.
- Với VoIP app, sử dụng Apple's Voice Processing I/O audio unit.
- Đảm bảo rằng audio `UIBackgroundModes` được thiết lập.
- Sử dụng `MPVolumeView` object cho volume slide và route picker.
- Yêu cầu người dùng quyền record bằng cách sử dụng hàm `requestRecordPermission:` thay vì để OS hỏi người dùng.

Bắt đầu từ iOS 10, để build VoIP app với những tính năng và khả năng giống với ứng dụng có sẵn như Phone hay FaceTime, bạn cần sử dụng CallKit framework.

## Ứng dụng đo lường

Các ứng dụng đo lường cần một lượng tối thiểu của việc xử lý tín hiệu do hệ thống cung cấp áp dụng với input và output route. Thiết lập category `AVAudioSessionCategoryPlayAndRecord` và chế độ đo lường để tối thiểu hóa việc xử lý tín hiệu. App dạng này cũng sẽ không trộn âm với những app khác.

Sau đây là các best practice:

- Luôn luôn activate lại và tiếp tục playback sau khi một interruption kết thúc.
- Bỏ qua tất cả route change trừ khi app cần thiết chọc vào.
- Thiết lập audio category trước khi hiển thị video splash khi app chạy.
- Yêu cầu người dùng quyền record bằng cách sử dụng hàm `requestRecordPermission:` thay vì để OS hỏi người dùng.

## Ứng dụng tương tự trình duyệt mà thi thoảng play audio
Social media hoặc browser-like app thường play các video ngắn. Loại app này sử dụng category `AVAudioSessionCategoryPlayback` và nó cũng không trộn âm thanh với các app khác.

Sau đây là các best practice:
- Luôn luôn chờ người dùng bắt đầu việc playback.
- Deactive audio session sau khi một video kết thúc, sử dụng kèm option `AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation`.
- Dừng audio do một route change xảy ra bởi việc tháo tai nghe, nhưng giữ cho audio session vẫn active.
- Đăng ký remote control event trong khi video đang play, và tháo đăng ký khi video kết thúc.
- Cập nhật UI khi app nhận được begin interruption event.
- Chờ người dùng bắt đầu playback sau khi nhận một end interruption event.

## Ứng dụng điều hướng và workout 
Các ứng dụng navigation và workout sử dụng category `AVAudioSessionCategoryPlayback` hoặc `AVAudioSessionCategoryPlayAndRecord`. Audio từ các ứng dụng này thường thường bao gồm các short voice prompt. Khi play, các prompt sẽ gây interrupt cho các spoken audio, như một podcast hay một audio book, nhưng trộn âm với các các audio khác như playback từ ứng dụng Music.

Sau đây là các best practice:
- Activate audio session với cả hai option `AVAudioSessionCategoryOptionInterruptSpokenAudioAndMixWithOthers` và `AVAudioSessionCategoryOptionDuckOthers`.
- Không activate audio session cho tới khi cần tới một prompt.
- Luôn luôn deactivate audio session sau khi một prompt được play.
- Không resume playback một prompt đã bị interrupt.

## Ứng dụng hòa âm

Các ứng dụng cooperative music được thiết kế để play cùng với các app khác. Category mà loại này sử dụng là `AVAudioSessionCategoryPlayback` hoặc `AVAudioSessionCategoryPlayAndRecord`, và tất nhiên là option của nó sẽ mix với các app khác.

Sau đây là các best practice:
- Activate audio session sử dụng kèm option `AVAudioSessionCategoryOptionMixWithOthers`.
- Nếu UI của app không cung cấp nút start/stop, tuân theo các best practice của game apps.
- Nếu UI của app cung cấp nút start/stop, chỉ activate audio session khi người dùng bấm nút play.
- Không đăng ký remote control events.
- Đảm bảo rằng audio `UIBackgroundModes` được thiết lập.
- Nếu ứng dụng có ghi âm, yêu cầu người dùng quyền record bằng cách sử dụng hàm `requestRecordPermission:` thay vì để OS hỏi người dùng.


# Kết
Trên đây là các best practice khi ta làm việc với audio session cho từng loại app trong iOS, hy vọng nó sẽ là nguồn kiến thức lý thú cho bạn nào đang phải làm việc với ứng dụng cần tới audio session.

---
*Tham khảo từ [Audio Session Programming Guide](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/AudioGuidelinesByAppType/AudioGuidelinesByAppType.html#//appleref/doc/uid/TP40007875-CH11-SW1)*