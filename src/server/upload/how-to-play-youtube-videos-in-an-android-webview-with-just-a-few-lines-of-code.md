## Introduction
Youtube có một [Player API](https://developers.google.com/youtube/android/player) chính thức cho Android, để play video trong một native player(nguyên thủy). Nhưng APIs này có một vài giới hạn(sẽ được trình bày ở dưới). Các thức tốt nhất để giải quyết các vấn đề xoay quanh các giới hạn này là play Youtube videos trong một WebView. Bằng cách sử dụng một WebView bạn sẽ có một view đơn giản cái có thể được thêm vào mọi nơi trong ứng dụng của mình. Nó sẽ trở nên dễ dàng hơn việc sử dụng một native API và bạn không phải xử lý các bugs và issues của nó.

Nhưng bạn không thể chỉ tải một trang từ Youtube trong WebView của mình, như vậy ứng dụng của bạn sẽ chỉ giống như một web browser với một trải nghiệm người dùng nghèo nàn. Các tốt nhất để play Youtube Videos trên web là sử dụng [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) từ Youtube. Đây là một JavaScript API cung cấp khả năng truy cập tới một web-based Youtube player.

Để sử dụng nó trong ứng dụng cảu mình bạn cần viết một web page và rồi tải trang đó lên một WebView. Nhưng giờ đây bạn có một vài công việc mở rộng khác cần phải làm, làm thế nào để tương tác với WebPage trong code Android của mình? Các thức để thực hiện điều này là viết một [JavaScript Interface](https://developer.android.com/guide/webapps/webview#BindingJavaScript), cái được tích hợp vào bên trong WebView và tạo một lớp cầu nối giữa thế giới Android(Kotlin/Java) và thế giới Web(Java Script).
Có rất nhiều việc phải thực hiện nếu bạn chỉ cần play một Youtube Video. Tôi đã phải thực hiện toàn bộ điều đó cùng lúc trong ứng dụng của mình, và để tránh việc tiêu tốn thời gian cho những người khác, tôi đã quyết định phát hành mã nguồn của nó như là một thư viện mã nguồn mở. Thư viện này được gọi là [android-youtube-player](https://pierfrancescosoffritti.github.io/android-youtube-player/), nó là một API nhằm play Youtube Videos trong một Android WebView, với một cách thức nhằm cảm thấy tự nhiên và tốn ít nỗ lực nhất cho các nhà phát triển. Bạn không phải viết bất cứ web pages hoặc đoạn JavaScript nào cả.

<div align="center"><img src="https://images.viblo.asia/fa312906-0ff1-4357-af8b-0cfbafe03884.jpeg" /></div><br />


## I. Why should you consider not using the official library from YouTube?
Bạn đang xây dựng một ứng dụng Android mới và bạn cần cho phép người dùng của mình có thể xem Youtube Videos trong nó. Điều đầu tiên bạn có thể nghĩ đó là sử dụng Youtube Android Player API chính thức của Google. Điều này không nhất thiết là sự lựa chọn tốt nhất. 
### 1. Nếu bạn lo lắng về tính ổn định
Tới thời điểm này(25/12/2017) Youtube Player API chính thức cho Android là không tuyệt vời cho lắm. Bạn sẽ cảm thấy ổn nếu bạn cần sử dụng YoutubeBaseActivity/YoutubeStandalonPlayer, nhưng bạn sẽ trải qua rất nhiều vấn đề rắc rối khi sử dụng YoutubePlayerFragment.
Thư viện này có một vài bugs đã xuất hiện từ rất lâu, [Ở đây](https://issuetracker.google.com/issues/35172585) có thống kê một khối lượng đáng kể các bugs. Trong quá trình phát triển ứng dụng của tôi, tôi đã trải qua việc phát triển trên thư viện đó và thấy ứng dụng của mình crash bất ngờ mà không rõ lý do. Nó làm cho ứng dụng của tôi trở nên không ổn định và chưa bao giờ sẵn sàng cho một bản production.
Các bugs vẫn tồn tại ở đó như tôi biết. Một phiên bản mới hơn của thư viện nên được tạo, nhưng nó vẫn chưa được phát hành tính tới thời điểm hiện tại.

### 2. Nếu bạn không muốn bị dàng buộc bởi các ứng dụng Google Play và Youtube
Để chạy, Youtube Player API chính thức cần đến việc thiết bị của người dùng phải được cài đặt đồng thời các ứng dụng Google Play và Youtube. Điều này là một hạn chế cái không bị đòi hỏi bởi [android-youtube-player APsI](https://pierfrancescosoffritti.github.io/android-youtube-player/).

### 3. Nếu bạn muốn kiểm soát được nhiều hơn những gì Android Youtube Player cung cấp(Giao diện người dùng + hành vi)
Youtube Player API chính thức từ Google không phải là mã nguồn mở do đó bạn không thể tùy biến nhiều hơn những gì mà APIs cung cấp. Thật không may điều này có nghĩa là: thực sự không nhiều cho lắm.
Có thể bạn cần thay đổi UI cho Player hoặc viết một vài hành vi tùy biến cụ thể cho từng trường hợp sử dụng của mình. Điều đó là không thể đối với the official Youtube Player APIs.

### 4. Bạn không muốn đăng kí ứng dụng của mình trong Google Developers Console
... Đó là một chút lười biếng, nhưng android-youtube-player API không đòi hỏi bạn thực hiện điều đó.
Giữa tất cả những điều này thì điều tôi lo lắng lớn nhất chính là sự ổn định của thư viện. Có lẽ một ngày nào đó Google sẽ phát hành một phiên bản mới, cái giải quyết hết những issues, nhưng hiện tại thì nó vẫn chưa xảy ra(Kể từ 2013). Nếu giống như tôi, bạn cần phát hành ứng dụng của mình, bạn có nẽ cần nhiều giải pháp tức thời hơn.

## II. The alternative: android-youtube-player API
[android-youtube-player APIs](https://github.com/PierfrancescoSoffritti/android-youtube-player) cung cấp một View đơn giản cái có thể dễ dàng tích hợp vào mọi Activity và Fragment. Nằm ở phía bên dưới thư viện này tương tác với Youtube thông qua [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference), cái được chạy bên trong một WebView. Nếu bạn muốn sử dụng Web UIs của web player, bạn có thể thực hiện nó. Nhưng bạn cũng có thể sử dụng một native UI có thể tùy biến cái được cung cấp bởi thư viện. Bạn có thể xây dựng ngay cả ứng dụng cần tùy biến UI ngày từ đầu cho mình.
Bởi vì API sử dụng IFrame Player API chính thức nhằm truy cập tới Youtube, do đó không có issues về việc vi phạm các chính sách sử dụng dịch vụ.
Dưới đây là một số lợi thế mà thư viện có được so với thư viện Youtube Player APIs chính thức của Google và những thư viện khác:
### 1. Dễ dàng sử dụng
android-youtube-player không yêu cầu những người sử dụng nó phải kết thừa bất cứ Activities hay Fragments nào cả, nó chỉ là một View. Bạn có thể vứt nó vào bất cứ đâu bạn muốn.

### 2. Có khả năng tùy biến UIs
android-youtube-player cho bạn rất nhiều tự do trong điều kiện phải thực hiện quá trình tùy biến UIs. Nếu bạn cần, bạn có thể [thay thế hoàn toàn UI cho player](https://medium.com/@soffritti.pierfrancesco/customize-android-youtube-players-ui-9f32da9e8505) của mình.
Hoặc bạn có thể dễ dàng thêm vào hoặc loại bỏ các Views từ UIs mặc định.

### 3. Hỗ trợ Chrome Cast
Bắt đầu từ version 8, android-youtube-player APIs cũng có thể được sử dụng để [ném(cast) videos từ một ứng dụng Android tới một Google Case device](https://medium.com/@soffritti.pierfrancesco/how-to-send-youtube-videos-from-your-android-app-to-a-chromecast-device-541d59ea1260).

## III. How to play YouTube videos
Ở đây sẽ trình bày một ví dụ đơn giản về việc làm thế này để lấy về và sử dụng thư viện chỉ với một vài dòng code.

Mã nguồn cùng một vài ví dụ khác là sẵn có [ở đây](https://github.com/PierfrancescoSoffritti/android-youtube-player), trong các sample app.
Bạn cũng có thể [tải về các apk ứng dụng mẫu](https://github.com/PierfrancescoSoffritti/android-youtube-player/tree/master/core-sample-app/apk) và thử chạy nó trên điện thoại của mình.

### 1. Những bước đầu tiên
Để sử dụng APIs bắt đầu bằng việc thêm thư viện vào dependency, bằng cách thêm những dòng này vào ***build.gradle*** ở mức module trong ứng dụng của bạn.
(Thay "**last_version** với phiên bản cuối cùng thực của thư viện, các versions được phát hành có thể được tìm thấy [ở đây](https://github.com/PierfrancescoSoffritti/android-youtube-player/releases))

```
dependencies {
  implementation 'com.pierfrancescosoffritti.androidyoutubeplayer:core:last_version'
}
```

Để bắt đầu sử dụng player bạn cần thêm vào một **YoutubePlayerView** cho layout của mình. Bạn cũng có thể tạo nó theo cách lập trình mà bạn muốn.

```
<LinearLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical" >
  
<com.pierfrancescosoffritti.androidyoutubeplayer.core.player.views.YouTubePlayerView
  android:id="@+id/youtube_player_view"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  app:videoId="S0Q4gqBUs7c"
  app:autoPlay="true"
  app:showFullScreenButton="false" />
  
</LinearLayout>
```

Trong Activity/Fragment, lấy tham chiếu tới **YoutubePlayerView** trong mã nguồn của bạn và thêm nó như là một đối tượng lắng nghe các sự liện Lifecycle từ cha của nó.

*Bạn cần phải đang sử dụng Androidx thay cho các thư viện support libraries cũ, do đó bạn có thể sẽ gặp phải những issues về sự tương thích ở bước này.*

```
YouTubePlayerView youTubePlayerView = findViewById(R.id.youtube_player_view);
getLifecycle().addObserver(youTubePlayerView);
```

Đây là tất cả những gì bạn cần để bắt đầu play Youtube videos trong ứng dụng của mình.

Nếu bạn cần kiểm soát nhiều hơn, mọi thứ bạn có thể được hiện bằng cách lấy tham chiếu tới **YoutubePlayerView** của bạn và thêm vào một **YoutubePlayerListener** cho nó.

```
YouTubePlayerView youTubePlayerView = findViewById(R.id.youtube_player_view);
getLifecycle().addObserver(youTubePlayerView);
youTubePlayerView.addYouTubePlayerListener(new AbstractYouTubePlayerListener() {
  @Override
  public void onReady(@NonNull YouTubePlayer youTubePlayer) {
    String videoId = "S0Q4gqBUs7c";
    youTubePlayer.loadVideo(videoId, 0f);
  }
});
```

Không có cách thức dễ dàng nào để play Youtube Videos trên Android. :'(

### 2. Những bước tiếp theo
1. [Vào home page của project](https://github.com/PierfrancescoSoffritti/android-youtube-player#android-youtube-player).
2. [Đọc APIs Document](https://github.com/PierfrancescoSoffritti/android-youtube-player#android-youtube-player).
3. [Để lại một star trên Github](https://github.com/PierfrancescoSoffritti/android-youtube-player/stargazers). :D

## IV. How to customize the UI of an Android YouTube Player
### 1. inflateCustomPlayerUI
Từ những giới hạn của Google Android Youtube Player APIs đã đề cập từ trước chúng ta có thể thấy rằng rất khó để có thể thay đổi UI/Behaviors của Player được cung cấp sẵn. Cái bạn cần là thiết kế lại Youtube Player để nhìn và tương tác tốt hơn cho ứng dụng của mình.
Bắt đầu từ Version 5.0.0 của thư viện Android Youtube Player APIs, chúng ta hoàn toàn có thể thay thế UI cho Player của mình. Điều này dễ dàng được thực hiện bằng cách sử dụng phương thức mới của [YoutuberPlayerView](https://github.com/PierfrancescoSoffritti/android-youtube-player#youtubeplayerview).

```
View inflateCustomPlayerUI(@LayoutRes int customUILayoutID)
```

Phương thức này lấy vào một ID của một resource layout và trả về một đối tượng Views tương ứng với layout đã được dựng lên. UI mặc định của player sẽ được loại bỏ và thay thế bằng UI mới.

Phương thức này đưa đến cho bạn tất cả sự tự do bạn cần. Resource layout bạn truyền vào phương thức có thể là chính những thứ bạn cần.

Bạn sẽ chịu trách nhiệm chính và việc cập nhật trạng thái cho UI của mình, ví dụ như chuyển đổi các icons trạng thái play/pause(Nếu bạn có), cập nhật tiến trình trên seek bar(Nếu bạn có),....

<div align="center"><img src="https://images.viblo.asia/8105a675-6231-4ba0-89a4-fe87bcd22f7b.jpeg"></div><br />

### 2. Simple example
Phần này sẽ là một ví dụ đơn giản trình bày việc làm thế nào để sử dụng phương thức này. Ví dụ này là rất đơn giản, nó chỉ là xử lý hành vi cho play/pause button.

```
<FrameLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent" >
  
  <Button
    android:id="@+id/play_pause_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Play/Pause" />
  
</FrameLayout>
```

Giờ đây chúng ta có thể gọi phương thức ***inflateCustomPlayerUI*** nhằm sử dụng layout này cho Player UI của mình.

```
View customUiView = youTubePlayerView.inflateCustomPlayerUI(R.layout.custom_player_ui)
```

Tính năng này trả về một tham chiếu tới layout được dựng lên(inflated layout).

Bây giờ, UI mới đã sẵn sàng, nhưng chúng ta không biết làm thế nào để tương tác với nó khi người dùng click lên nó. Trong ví dụ của chúng ta: Điều gì sẽ xảy ra khi người dùng clicks vào button? Player nên stop hay play video phụ thuộc vào trạng thái của UI.
Để điều khiển trạng thái của UI chúng ta sẽ định nghĩ UI Controller cho mình bằng class sau:

```
class CustomUiController {
  
  private boolean isPlaying = false;
  
  CustomUiController(View customPlayerUI, YouTubePlayer youTubePlayer) {   
    playPauseButton = customPlayerUI.findViewById(R.id.play_pause_button);
    
    playPauseButton.setOnClickListener( view -> {
      if(isPlaying) youTubePlayer.pause();
      else youTubePlayer.play();
      
      isPlaying = !isPlaying;
    });
  }
}
view raw
```

Bây giờ, chúng ta chỉ cần tạo thể hiện của CustomUiController của mình bằng cách truyền vào cho nó tham chiếu tới inflated View trên YoutubePlayer của mình.

Cái này là ví dụ rất cơ bản, trong một vài trường hợp phức tạp hơn bạn sẽ cần CustomUiController của mình implement ***YouTubePlayerFullScreenListener***, ***YouTubePlayerListener*** một cách chính xác để có thể tương tác với những thay đổi trạng thái của Player.

Nếu bạn muốn thấy ví dụ phức tạp hơn, bạn có thể tìm thấy nó ở đây, trong [sample app](https://github.com/PierfrancescoSoffritti/android-youtube-player/tree/master/core-sample-app/src/main/java/com/pierfrancescosoffritti/aytplayersample/examples/customUIExample). Bạn cũng có thể tải [sample app apk](https://github.com/PierfrancescoSoffritti/android-youtube-player/tree/master/core-sample-app/apk) và thử nó trên điện thoại của mình.

<div align="center"><img src="https://images.viblo.asia/82610a47-64b2-4b93-977e-c4ddaaddc690.gif" /></div><br />

Ảnh gif này là kết quả của ví dụ mẫu, nó có một button enter/exit full screen và hai text views thể hiện theo dõi video progress và duration.

## V. An API to send YouTube videos from an Android app to a Chromecast device
https://medium.com/@soffritti.pierfrancesco/how-to-send-youtube-videos-from-your-android-app-to-a-chromecast-device-541d59ea1260

## VI. Source
1. https://medium.com/@soffritti.pierfrancesco/how-to-play-youtube-videos-in-an-android-webview-90e4b89adf79
2. https://medium.com/@soffritti.pierfrancesco/how-to-play-youtube-videos-in-your-android-app-c40427215230

## VII. Reference
1. https://developers.google.com/youtube/iframe_api_reference
2. https://developer.android.com/guide/webapps/webview#BindingJavaScript
3. https://pierfrancescosoffritti.github.io/android-youtube-player/
4. https://issuetracker.google.com/issues/35172585
5. https://developers.google.com/youtube/android/player
6. https://pierfrancescosoffritti.github.io/android-youtube-player/
7. https://medium.com/@soffritti.pierfrancesco/customize-android-youtube-players-ui-9f32da9e8505
8. https://medium.com/@soffritti.pierfrancesco/how-to-send-youtube-videos-from-your-android-app-to-a-chromecast-device-541d59ea1260
9. https://github.com/PierfrancescoSoffritti/android-youtube-player
10. https://github.com/PierfrancescoSoffritti/android-youtube-player/tree/master/core-sample-app/apk
11. https://github.com/PierfrancescoSoffritti/android-youtube-player#android-youtube-player

## VIII. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))