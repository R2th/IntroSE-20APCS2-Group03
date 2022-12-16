Trước đây, bạn nào đã từng code native, xử lý việc play video youtube, chúng ta cũng mất khá nhiều time để tìm tòi và xử lý code cũng khá là dài dòng. Nhưng trên React native, chuyện đó giờ đã trở nên đơn giản hơn rất nhiều với sự hỗ trợ của thư viện [react-native-youtube](https://www.npmjs.com/package/react-native-youtube)
và cách sử dụng cũng cực kỳ đơn giản
![](https://images.viblo.asia/6f51c26c-d1fc-435e-8537-17225e76c04d.png)

Các bạn hãy xem đoạn code sau:
```
<YouTube
  videoId="KVZ-P-ZI6W4"   // The YouTube video ID
  play={true}             // control playback of video with true/false
  fullscreen={true}       // control whether the video should play in fullscreen or inline
  loop={true}             // control whether the video should loop when ended
 
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
 
  style={{ alignSelf: 'stretch', height: 300 }}
/>
```

Trên đây là một ví dụ về cách sử dụng của thư viện này, YouTube nó giống như 1 component mà các bạn vẫn sử dụng trong react native.
Bên cạnh đó nó cho bạn rất nhiều các thuộc tính, events, methods ... để giúp các bạn tuỳ chỉnh cho việc xử lý video của mình.

Dưới đây là list các thuộc tính mà các bạn có thể tuỳ chỉnh:

- apiKey (string, Android): API Key của bạn, khi đã đăng kí với youtube để trở thành developer bạn sẽ có dc 1 key. Đây là tham số bắt buộc bạn phải điền vào để có thể sử dụng. bạn có thể xem chi tiết thông tin tại [đây](https://developers.google.com/youtube/android/player/register)
- videoId (string): Đây là ID của video youtube để bạn có thể play. Trong qúa trình play video, có thể thay đổi được.
- videoIds (strings array): Đây là mảng các Ids để play. Có thể bị thay đổi khi mounted. Ghi đè khi bắt đầu bởi videoId.
- playlistId (string): Một ID của YouTube Playlist để play như một tương tác playlist. Có thể bị thay đổi khi mounted. Ghi đè khi bắt đầu bởi videoId và videoIds.
- play (boolean): Controls playback của video với true/false. Cài đặt nó là true khi bắt đầu bản thân nó tạo ra video autoplay khi loading. Mặc định: false.
- loop (boolean): Lặp video. Mặc định: false.
- fullscreen (boolean): Điều khiển chế độ play video fullscreen hoặc thông thường. Mắc định: false.
- controls (number): Cài đặt các chế độ điều khiển của player. Các giá trị được hỗ trợ 0, 1, 2. Mặc định: 1. Trên iOS có các số tương ứng. Trên Android thì sẽ có các lưa chọn tương ứng là 0 = CHROMELSEE, 1 = DEFAULT, 2 = MINIMAL ([thông tin chi tiết](https://developers.google.com/youtube/android/player/reference/com/google/android/youtube/player/YouTubePlayer.PlayerStyle)).
- showFullscreenButton (boolean): Hiện hoặc ẩn button Fullscreen. Mặc định: true.
- showinfo (boolean, iOS): Cài đặt các giá trị của tham số là false lý do player không hiển thị thông tin như là title của video và uploader trước khi video được start playing. Mặc định là: true.
- modestbranding (boolean, iOS): Đây là tham số để bạn sử dụng YouTube player nhưng không hiển thị YouTube logo. Mặc định: false.
- origin (string, iOS): Đây là tham số bổ sung thêm tính bảo mật cho iFrame API.
- rel (boolean, iOS): Hiển thị các video liên quan khi video hiện tại chạy xong. Mặc định: true.
- resumePlayAndroid (boolean, Android): Tạo ra video resume playback sau khi ứng dụng resumes từ background. Mặc định: true.