## Workflows
### Sử dụng Playback information functions
play có thể được sử dụng để bắt đầu phát lại trên một trình phát có nguồn.

```
var myPlayer = videojs('some-player-id');

myPlayer.src ({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready (function () {
  myPlayer.play();
});
```

pause() có thể được sử dụng để tạm dừng phát lại trên trình phát đang phát.

```
var myPlayer = videojs('some-player-id');

myPlayer.src ({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready (function () {
  myPlayer.play();
  myPlayer.pause();
});
```

paused() có thể được sử dụng để xác định xem một trình phát hiện đang bị tạm dừng.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});

myPlayer.ready(function() {
  console.log (myPlayer.paused());

  myPlayer.play();
  console.log (! myPlayer.paused());

  myPlayer.pause();
  console.log (myPlayer.paused());
});
```

currentTime() sẽ cung cấp cho bạn Thời gian hiện tại (tính bằng giây) mà quá trình phát lại hiện đang diễn ra.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  // đặt thời gian hiện tại thành 2 phút cho video
  myPlayer.currentTime(120);

  // lấy thời gian hiện tại, phải là 120 giây
  var whereYouAt = myPlayer.currentTime();
});
```

duration() sẽ cung cấp cho bạn tổng thời lượng của video đang phát

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  var lengthOfVideo = myPlayer.duration();
});
```

remainingTime() sẽ cung cấp cho bạn số giây được làm lại trong video.

```
var myPlayer = videojs('some-player-id');
myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function () {
   myPlayer.currentTime(10);

   // phải ít hơn thời lượng 10 giây
   console.log(myPlayer.remainingTime());
});
```

.buffered() sẽ cung cấp cho bạn một đối tượng timeRange đại diện cho phạm vi thời gian hiện tại đã sẵn sàng để phát tại một thời điểm trong tương lai.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  var bufferedTimeRange = myPlayer.buffered();

  // số khoảng thời gian khác nhau đã được lưu vào bộ đệm.
  // Thường là 1
  var numberOfRanges = bufferedTimeRange.length,

  // Thời gian tính bằng giây khi phạm vi đầu tiên bắt đầu.
  // Thường là 0
  var firstRangeStart = bufferedTimeRange.start (0),

  // Thời gian tính bằng giây khi phạm vi đầu tiên kết thúc
  var firstRangeEnd = bufferedTimeRange.end (0),

  // Độ dài tính bằng giây của phạm vi thời gian đầu tiên
  var firstRangeLength = firstRangeEnd - firstRangeStart;
});
```

bufferedPercent() sẽ cung cấp cho bạn phần trăm hiện tại của video được lưu vào bộ đệm.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function () {
  // ví dụ 0.11 hay còn gọi là 11%
  var howMuchIsDownloaded = myPlayer.bufferedPercent();
});
```

### Xử lý nguồn hoặc người đăng trên trình phát

Chuyển một nguồn cho trình phát qua API. (điều này cũng có thể được thực hiện bằng cách sử dụng các options)

```
var myPlayer = videojs ('some-player-id');

myPlayer.src ('http://www.example.com/path/to/video.mp4');
```

Khi một chuỗi được cung cấp làm nguồn, Video.js sẽ cố gắng suy ra loại video từ phần mở rộng tệp, nhưng nó sẽ không hoạt động trong mọi trường hợp.

**Đối tượng nguồn (hoặc phần tử)**: Một đối tượng javascript chứa thông tin về tệp nguồn. Sử dụng phương pháp này nếu bạn muốn trình phát xác định xem nó có thể hỗ trợ tệp hay không bằng cách sử dụng thông tin loại.

```
var myPlayer = videojs ('some-player-id');

myPlayer.src ({type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'});
```

**Mảng đối tượng nguồn**: Để cung cấp nhiều phiên bản nguồn để nó có thể được phát bằng HTML5 trên các trình duyệt, bạn có thể sử dụng một mảng đối tượng nguồn. Video.js sẽ phát hiện phiên bản nào được hỗ trợ và tải tệp đó.

```
var myPlayer = videojs ('some-player-id');

myPlayer.src ([
  {type: 'video / mp4', src: 'http://www.example.com/path/to/video.mp4'},
  {type: 'video / webm', src: 'http://www.example.com/path/to/video.webm'},
  {type: 'video / ogg', src: 'http://www.example.com/path/to/video.ogv'}
]);
```

Thay đổi hoặc thiết lập người đăng thông qua API. (điều này cũng có thể được thực hiện với các options)

```
var myPlayer = videojs ('example_video_1');

// set
myPlayer.poster ('http://example.com/myImage.jpg');

// get
console.log (myPlayer.poster ());
// 'http://example.com/myImage.jpg'
```

### Truy cập Tech trên trình phát
Tech trên trình phát chỉ có thể được accesed bằng cách viết hoa {IWillNotUseThisInPlugins: true} vào hàm tech () trên trình phát.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
   // tech() will error with no argument
   var tech = myPlayer.tech({IWillNotUseThisInPlugins: true});
});
```

## Options 
### autoplay
* giá trị boolean là false: không tự động phát
* giá trị boolean là true: tự động phát
* giá trị String 'muted': sẽ tắt tiếng video và sau đó gọi play () theo cách thủ công khi bắt đầu tải. 
* giá trị String 'play': sẽ gọi play () khi bắt đầu tải, tương tự như trình duyệt tự động phát
* giá trị String 'any': sẽ gọi play () khi khởi động tải và nếu promise từ chối, nó sẽ tắt tiếng phần tử video sau đó gọi play ().
```
var player = videojs('my-video', {
  autoplay: 'muted'
});

// or

player.autoplay('muted');
``` 

### controls

Xác định xem trình phát có các điều khiển mà người dùng có thể tương tác hay không. Không có điều khiển, cách duy nhất để bắt đầu phát video là sử dụng autoplaythuộc tính hoặc thông qua API trình phát.

### height

Đặt chiều cao hiển thị của trình phát video theo pixel.

### loop

Khiến video bắt đầu lại ngay sau khi kết thúc.

### muted

Sẽ tắt tiếng mọi âm thanh theo mặc định.

### poster

URL đến hình ảnh hiển thị trước khi video bắt đầu phát. Đây thường là một khung của video hoặc một màn hình tiêu đề tùy chỉnh. Ngay sau khi người dùng nhấn "play", hình ảnh sẽ biến mất.

### preload

Đề xuất cho trình duyệt xem dữ liệu video có nên bắt đầu tải xuống ngay sau khi <video>phần tử được tải hay không. Các giá trị được hỗ trợ là:

#### 'auto'
Bắt đầu tải video ngay lập tức (nếu trình duyệt hỗ trợ). Một số thiết bị di động sẽ không tải trước video để bảo vệ việc sử dụng băng thông / dữ liệu của người dùng. Đây là lý do tại sao giá trị được gọi là 'tự động' chứ không phải thứ gì đó dễ kết luận hơn 'true'.

Đây có xu hướng là giá trị phổ biến nhất và được đề xuất vì nó cho phép trình duyệt chọn hành vi tốt nhất.

#### 'metadata'
Chỉ tải dữ liệu meta của video, bao gồm thông tin như thời lượng và kích thước của video. Đôi khi, dữ liệu meta sẽ được tải bằng cách tải xuống một vài khung hình video.

#### 'none'
Không tải trước bất kỳ dữ liệu nào. Trình duyệt sẽ đợi cho đến khi người dùng nhấn "play" để bắt đầu tải xuống.

#### src
Kiểu: string

URL nguồn của một nguồn video để nhúng.

#### width

Đặt chiều rộng hiển thị của trình phát video theo pixel.

Tham khảo: [tại đây](https://docs.videojs.com/)