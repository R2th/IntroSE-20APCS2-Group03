**React-native-video**

Chào các bạn, đến hẹn lại lên, mỗi tháng 1 lần đều như vắt chanh. Lần này tôi sẽ giới thiệu đến các bạn 1 thư viện hỗ trợ cho các bạn làm việc với video trên react native. Thư viện này đã được đầu tư phát triển từ rất lâu rồi, suốt từ năm 2015 đến nay, trải qua 56 lần release, gần 21 ngàn lượt download. Nói thế chắc các bạn cũng có phần nào niềm tin với việc cân nhắc để tìm hiểu và sử dụng. Đó là thư viện react-native-video
Bạn nào từng làm android thì chắc hẳn sẽ biết đến exoplayer do chính google phát triển để hỗ trợ cho nền tảng con cưng của mình trong việc sử dụng để hiển thị, control video. Exoplayer nó cũng hoàn thiện dần dần qua từng năm tháng, hỗ trợ nhiều tính năng ưu việt siêu smooth. 
Giờ đây khi làm việc với react-native bạn vẫn có cơ hội được thưởng thức ưu điểm đó qua react-native-video. Nó phát triển dựa trên chính exoplayer.

Về mặt chức năng, react-native-video nó cũng hỗ trợ vô cùng đầy đủ, cho bạn thoải mái các lựa chọn. 
1. Cấu hình:

```
```

allowsExternalPlayback, audioOnly, bufferConfig, ignoreSilentSwitch, muted, paused, playInBackground, playWhenInactive, poster, posterResizeMode, progressUpdateInterval, rate, repeat, resizeMode, selectedAudioTrack, selectedTextTrack, stereoPan, textTracks, useTextureView, volume
```
```

2. Event props:
```
onAudioBecomingNoisy
onFullscreenPlayerWillPresent
onFullscreenPlayerDidPresent
onFullscreenPlayerWillDismiss
onFullscreenPlayerDidDismiss
onLoad
onLoadStart
onProgress
onTimedMetadata
```
    
3. Phương thức: 

```
dismissFullscreenPlayer
presentFullscreenPlayer
seek
```

Hơn nữa, cách sử dựng thư viện lại cực kỳ đơn  giản:
bạn chỉ cần chạy lệnh sau để install thư viện mà ko cần phải link
```
npm install --save react-native-video
```
Tiếp đó là cách dùng trong code:
```
// Load the module
 
import Video from 'react-native-video';
 
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
 
<Video source={{uri: "background"}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onEnd={this.onEnd}                      // Callback when playback finishes
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
 
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
```

nó thì rất đơn giản đưa vào 1 component phải không nào, việc sử dụng nó giống y như việc sử dụng 1 view bình thường, hơn nữa bạn vẫn có thể thoải mái sử dụng StyleSheet để căn chỉnh.
Dưới đây là link thư viện
[https://www.npmjs.com/package/react-native-video](https://www.npmjs.com/package/react-native-video)

Chúc các bạn ứng dụng thư viện vào dự án thành công!