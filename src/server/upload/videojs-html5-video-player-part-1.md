Video.js là một trình phát video trên web được xây dựng từ đầu cho HTML5. Nó hỗ trợ HTML5 và Flash video, cũng như YouTube và Vimeo (thông qua các plugin). Nó hỗ trợ phát lại video trên máy tính để bàn và thiết bị di động.

### Cài đặt
- Qua npm 
```
npm install --save-dev video.js
```

- Hoặc qua fastly
```
<head>
  <link href="https://vjs.zencdn.net/7.8.4/video-js.css" rel="stylesheet" />

  <!-- Nếu bạn không muốn support IE8 (cho Video.js versions trước v7) -->
  <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
</head>

<body>
  <video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    width="640"
    height="264"
    poster="MY_VIDEO_POSTER.jpg"
    data-setup="{}"
  >
    <source src="MY_VIDEO.mp4" type="video/mp4" />
    <source src="MY_VIDEO.webm" type="video/webm" />
    <p class="vjs-no-js">
     Để xem video này, vui lòng bật JavaScript và xem xét nâng cấp lên trình duyệt web
      <a href="https://videojs.com/html5-video-support/" target="_blank"> supports HTML5 video</a>
    </p>
  </video>

  <script src="https://vjs.zencdn.net/7.8.4/video.js"></script>
</body>
```


```
<!-- unpkg : use the latest version of Video.js -->
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>

<!-- unpkg : use a specific version of Video.js (change the version numbers as necessary) -->
<link href="https://unpkg.com/video.js@7.8.2/dist/video-js.min.css" rel="stylesheet">
<script src="https://unpkg.com/video.js@7.8.2/dist/video.min.js"></script>

<!-- cdnjs : use a specific version of Video.js (change the version numbers as necessary) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.8.1/video-js.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.8.1/video.min.js"></script>
Tiếp theo, sử dụng Video.js cũng đơn giản như tạo một <video>phần tử nhưng có thêm một thuộc tính data-setup. Ở mức tối thiểu, thuộc tính này phải có giá trị là '{}', nhưng nó có thể bao gồm bất kỳ tùy chọn Video.js nào - chỉ cần đảm bảo rằng nó chứa JSON hợp lệ!

<video
    id="my-player"
    class="video-js"
    controls
    preload="auto"
    poster="//vjs.zencdn.net/v/oceans.png"
    data-setup='{}'>
  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a
    web browser that
    <a href="https://videojs.com/html5-video-support/" target="_blank">
      supports HTML5 video
    </a>
  </p>
</video>
```
Khi trang tải, Video.js sẽ tìm thấy phần tử này và tự động thiết lập trình phát ở vị trí của nó.

Nếu bạn không muốn sử dụng thiết lập tự động, bạn có thể bỏ thuộc tính data-setup và khởi tạo phần tử <video> theo cách thủ công bằng cách sử dụng hàm videojs:

`var player = videojs('my-player');`

Các chức năng videojs cũng chấp nhận một options và một callback được gọi khi player đã sẵn sàng:

```
var options = {};

var player = videojs('my-player', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
});
```

### Phân phối cây thư mục 

```
Video.js/
├── alt
│   ├── video.core.js
│   ├── video.core.min.js
│   ├── video.core.novtt.js
│   ├── video.core.novtt.min.js
│   ├── video.novtt.js
│   └── video.novtt.min.js
├── examples/
├── font
│   ├── VideoJS.svg
│   ├── VideoJS.ttf
│   └── VideoJS.woff
├── lang/
├── video-js-<span class="vjs-version">$LATEST_VERSION$</span>.zip
├── video-js.css
├── video-js.min.css
├── video.cjs.js
├── Video.es.js
├── Video.js
└── video.min.js
```

### Workflows
#### Truy cập vào players đã được tạo trên một trang
Sau khi một instance đã được tạo, nó có thể được truy cập theo hai cách:

* Bằng cách gọi videojs('example_video_id');
* Bằng cách sử dụng nó trực tiếp qua videojs.players.example_video_id;

#### Xóa Player
Các developers có khả năng quản lý toàn bộ vòng đời của trình phát video - từ khi tạo đến khi phá hủy. Video.js hỗ trợ xóa trình phát thông qua phương pháp dispose().

dispose()
Phương pháp này có sẵn trên tất cả players và thành phần của Video.js . Đây là phương pháp duy nhất được hỗ trợ để xóa player Video.js khỏi cả DOM và bộ nhớ. Ví dụ: mã sau đây thiết lập một player và sau đó loại bỏ nó khi quá trình phát lại media hoàn tất:

```
var player = videojs('my-player');

player.on('ended', function() {
  this.dispose();
});
```
Gọi dispose() sẽ có một số effects:

* Kích hoạt sự kiện "dispose" trên player, cho phép thực hiện bất kỳ tác vụ cleanup tùy chỉnh nào cần được thực hiện bằng tích hợp.
* Xóa tất cả event listeners khỏi player.
* Xóa (các) phần tử DOM của player.
Ngoài ra, các hành động này được áp dụng đệ quy cho tất cả các player's child components.

#### Ẩn/ hiện player
Tùy thuộc vào các libraries/frameworks được sử dụng, một implementation có thể trông giống như sau:
```
modal.on('show', function() {
  var videoEl = modal.findEl('video');
  modal.player = videojs(videoEl);
});

modal.on('hide', function() {
  modal.player.dispose();
});
```

#### Thay đổi volumn của player
Âm lượng của trình phát có thể được thay đổi thông qua function volume trên trình phát. Function volume chấp nhận một số từ 0-1. Gọi nó mà không có đối số sẽ trả về âm lượng hiện tại.

```

var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  // get
  var howLoudIsIt = myPlayer.volume();
  // set
  myPlayer.volume(0.5); // Set volume to half
});
    
```
Âm lượng cũng có thể được tắt (mà không thay đổi giá trị âm lượng) bằng chức năng tắt tiếng. Gọi nó mà không có đối số sẽ trả về trạng thái tắt tiếng hiện tại trên trình phát.

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  // get, should be false
  console.log(myPlayer.muted());
  // set to true
  myPlayer.muted(true);
  // get should be true
  console.log(myPlayer.muted());
});
```

### Chế độ toàn màn hình
Để kiểm tra xem trình phát hiện đang ở chế độ toàn màn hình hay không, hãy gọi hàm isFullscreen trên trình phát 

```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  // get, should be false
  console.log(myPlayer.isFullscreen());

  // set, tell the player it's in fullscreen
  myPlayer.isFullscreen(true);

  // get, should be true
  console.log(myPlayer.isFullscreen());
});
```

Để yêu cầu player gọi exitFullscreen
```
var myPlayer = videojs('some-player-id');

myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
myPlayer.ready(function() {
  myPlayer.requestFullscreen();
  myPlayer.exitFullscreen();
});
```