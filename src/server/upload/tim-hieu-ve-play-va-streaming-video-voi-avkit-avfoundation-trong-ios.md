# I. Giới thiệu

Trong quá trình viết ứng dụng iOS, có thể chúng ta sẽ phải đối mặt với các công việc liên quan đến video như tạo video, cắt ghép video, chơi video,… Trong đó, công việc đơn giản nhất liên quan đến video là chơi video trên ứng dụng. Trong bài viết này, tôi sẽ giới thiệu đến các bạn một số phương pháp để chơi video.

Để chơi video, chúng ta có thể sử dụng AVKit framework và AVFoundation framework. Cả 2 framework này đều có thể sử dụng và mỗi framework lại có những ưu nhược điểm riêng. Dưới đây chúng ta sẽ tìm hiểu ưu nhược điểm của các framework và cách chơi video bằng các framework này thông qua project demo cụ thể.

# II. Nội dung

## 1. Tạo project

Các bạn vào Xcode, tạo project mới với ngôn ngữ là Swift, đặt tên project là PlayVideoTutorial và bấm create để tạo.

Tiếp theo, chúng ta cần sử dụng vài file video .mp4, các bạn có thể lên google search và download vài file mp4 về máy, đổi tên file cho dễ dùng 1 tí và kéo vào project. Ở đây mình download 3 file về và đặt tên lần lượt là SampleVideo1.mp4, SampleVideo2.mp4, SampleVideo3.mp4

Kế tiếp, vào Main.storyboard:
 * thêm navigation cho ViewController bằng cách vào Editor -> Embed In -> Navigation Controller
 * Kéo thả 3 buttonload vào ViewController, đặt tên cho 3 button lần lượt là AVKit, AVPlayer, AVQueuePlayer
 * Tạo thêm 1 UIViewController bằng cách vào File -> New -> File… đặt tên là PlayVideoViewController
 * Kéo tạo View Controller trong Main.storyboard và để tên class là PlayVideoViewController, để Storyboard ID cũng là PlayVideoViewController
 * Mở Assistant editor, kéo thả IBAction cho các button bên trên vào ViewController.swift và đặt tên các action với nội dung như sau:
```Swift
	@IBAction func handleAVKitClicked(_ sender: Any) {
        
    }
    
    @IBAction func handleAVPlayerClicked(_ sender: Any) {
        
    }
    
    @IBAction func handleAVQueuePlayerClicked(_ sender: Any) {
        
    }
```
Sau khi hoàn thành các bước bên trên, chúng ta sẽ được project với file Main.storyboard như hình sau:

![](https://images.viblo.asia/949eb8de-b944-42ca-af19-dd128ebe5798.png)

## 2. Play video với AVKit

AVKit là một framework “bậc cao” của iOS, được xây dựng bên trên AVFoundation framework. Vì là framework bậc cao nên việc sử dụng AVKit hết sức dễ dàng. Để play video, các bạn chỉ cần thêm code sau:
```Swift
	@IBAction func handleAVKitClicked(_ sender: Any) {
        // 1
        let videoString = Bundle.main.path(forResource: "SampleVideo1", ofType: "mp4")!
        let videoUrl = URL(fileURLWithPath: videoString)
        // 2
        let player = AVPlayer(url: videoUrl)
        // 3
        let playerViewController = AVPlayerViewController()
        playerViewController.player = player
        // 4
        present(playerViewController, animated: true) {
            player.play()
        }
    }
```

Trong đoạn code trên:
* 1: tạo URL của video
* 2: tạo player từ URL của video. AVPlayer là một class của AVFoundation, chúng ta sẽ nói rõ hơn về AVPlayer ở bên dưới. 
* 3: Khởi tạo instance của AVPlayerViewController. Đây là một class của AVKit framework, subclass từ UIViewController. việc play video do class này quản lý
* 4: hiển thị playerViewController và play video sau khi quá trình present playerViewController hoàn tất

Chỉ bằng một vài dòng code đơn giản bên trên, chúng ta đã hoàn thành việc chơi video bằng AVKit. Build chạy thử code, click vào nút AVKit, chúng ta được kết quả như hình sau:

![](https://images.viblo.asia/13c1014a-86ea-486c-8953-e4435e9399ae.png)

Việc sử dụng AVKit cực kỳ đơn giản, hơn nữa AVPlayerViewController cung cấp cho chúng ta các control cơ bản để điều khiển play video: play/pause, tắt/mở âm thanh, tua video. Trong những trường hợp play video cơ bản mà không có yêu cầu gì đặc biệt, lời khuyên của tôi là các bạn nên sử dụng AVKit để thực hiện việc này.

Bên trên, chúng ta đã chơi 1 video local. Trong AVPlayerViewController đã hỗ trợ cả tính năng stream video, vì vậy việc stream video cũng cực kỳ đơn giản. Để stream video, các bạn chỉ cần đơn giản thay url cho video từ local URL thành stream URL từ server, như sau:
```Swift
let videoString = "https://www.rmp-streaming.com/media/bbb-360p.mp4"        let videoUrl = URL(string: videoString)!
```

Build và chạy lại code, chúng ta sẽ vẫn được kết quả chơi video như bên trên, chỉ khác biệt ở chỗ bây giờ chúng ta không chơi video trong máy nữa mà chơi video từ trên server.

Dùng AVKit thật sự dễ dàng, tuy nhiên nhược điểm của AVKit là chúng ta không thể custom view hoặc thêm các chức năng nâng cao cho trình play video. Vì vậy, khi ứng dụng của các bạn yêu cầu nhiều hơn những gì AVKit có thể cung cấp, các bạn cần sử dụng AVFoundation

## 3. AVFoundation

AVFoundation là một framework cực kỳ mạnh mẽ của iOS, chúng ta có thể làm rất nhiều việc với framework này. Tuy nhiên trong phạm vi bài này chỉ đề cập đến play video, nên chúng ta chỉ cần quan tâm đến các thành phần chính sau:

* 1: AVPlayerLayer: đây là 1 subclass của CALayer, video sẽ được play trên layer này
* 2: AVAsset: đây là object chứa thông tin tĩnh về video, bao gồm các thông tin như thời lượng video, ngày tạo,…
* 3: AVPlayerItem: chứa nhiều thông tin động hơn về video như trạng thái hiện tại của video

### a. AVPlayer

Việc sử dụng AVPlayer để playvideo cũng không khó khăn lắm, bởi Apple đã cung cấp cho chúng ta các function rất tuyệt vời rồi. Các bạn implement hàm handleAVPlayerClicked(_ sender:) như sau:
```Swift
	@IBAction func handleAVPlayerClicked(_ sender: Any) {
        if let viewController = storyboard?.instantiateViewController(withIdentifier: "PlayVideoViewController") as? PlayVideoViewController {
            viewController.avplayerClicked = true
            navigationController?.pushViewController(viewController, animated: true)
        }
    }
```

Bên trên, chúng ta thêm code để khởi tạo instance của PlayVideoViewController và push vào navigationController. Tiếp theo, chúng ta mở PlayVideoViewController.swift lên và thêm code như sau:

```swift
import UIKit
import AVFoundation

class PlayVideoViewController: UIViewController {
    // 1
    var avplayerClicked = true

    override func viewDidLoad() {
        super.viewDidLoad()
		
		// 2
        if avplayerClicked == true {
            playAVPlayer()
        }
    }
    
    func playAVPlayer() {
        // 3
        let videoString = Bundle.main.path(forResource: "SampleVideo1", ofType: "mp4")!
        let videoUrl = URL(fileURLWithPath: videoString)
        // 4
        let asset = AVAsset(url: videoUrl)
        let item = AVPlayerItem(asset: asset)
        let player = AVPlayer(playerItem: item)
        // 5
        let playerLayer = AVPlayerLayer(player: player)
        playerLayer.frame = view.bounds
        playerLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(playerLayer)
        // 6
        player.seek(to: kCMTimeZero)
        player.play()
    }

}
```

Trong đoạn code bên trên:
* 1: thêm property avplayerClicked để xác định trường hợp chúng ta bấm nút “AVPlayer”, vì sau đây chúng ta cũng sẽ xử lý trường hợp bấm vào nút “AVQueuePlayer” trong PlayVideoViewController
* 2: dựa vào giá trị của avplayerClicked để gọi hàm playAVPlayer()
* 3: khởi tạo video URL
* 4: lần lượt khởi tạo instance của AVAsset, AVPlayerItem, AVPlayer. AVPlayer chính là class chúng ta cần để play video
* 5: Khởi tạo AVPlayerLayer instance và set các giá trị cho nó. video sẽ được chơi trên instance này
* 6: chỉnh thời gian của video đến giá trị 0 và play video

Build project và thử bấm vào nút “AVPlayer”, chúng ta sẽ được kết quả như hình sau:

![](https://images.viblo.asia/15515cb3-396c-48c2-9bab-7a5bfab2614b.png)

Như các bạn có thể thấy, video đã được chơi như chúng ta muốn. Tuy nhiên, chúng ta chỉ có duy nhất 1 khung chơi video, hoàn toàn không hề có 1 control nào (play/pause, mute, tua video,…). Để có được các control này, chúng ta phải tự tạo (các bạn có thể tìm các thư viện trên mạng, các thư viện này sẽ giúp chúng ta giảm thời gian dev). Tuy không được cung cấp các control và layout đẹp, bù lại chúng ta lại có thể tự do điều chỉnh khung video như ý chúng ta muốn. Trong demo này chúng ta không bàn đến chuyện xấu đẹp nên tôi cứ để nguyên frame của video như hình trên thôi :D.


### b. AVQueuePlayer

AVQueuePlayer là một subclass của AVPlayer. Khác với AVPlayer chỉ khởi tạo được với 1 video và chỉ play với video đó, AVQueuePlayer có thể khởi tạo với danh sách 1 list các video và chơi lần lượt từng video trong list đó. Ngoài khác biệt này ra thì việc sử dụng AVQueuePlayer cũng tương tự như sử dụng AVPlayer.

Đầu tiên, chúng ta thêm code vào hàm handleAVQueuePlayerClicked(_ sender:) trong ViewController.swift như sau:
```swift
	@IBAction func handleAVQueuePlayerClicked(_ sender: Any) {
        if let viewController = storyboard?.instantiateViewController(withIdentifier: "PlayVideoViewController") as? PlayVideoViewController {
            viewController.avplayerClicked = false
            navigationController?.pushViewController(viewController, animated: true)
        }
    }
```

Đoạn code bên trên, chúng ta cũng push instance của PlayVideoViewController vào navigationController, chỉ khác là chúng ta gán cho avplayerClicked giá trị false

Tiếp theo, chúng ta thêm code vào PlayVideoViewController.swift như sau:

```swift

	override func viewDidLoad() {
        super.viewDidLoad()
		// 1
        if avplayerClicked == true {
            playAVPlayer()
        } else {
            playAVQueuePlayer()
        }
    }

	func playAVQueuePlayer() {
        // 2
        var items = [AVPlayerItem]()
        for i in 1...3 {
            let videoString = Bundle.main.path(forResource: "SampleVideo\(i)", ofType: "mp4")!
            let videoUrl = URL(fileURLWithPath: videoString)
            let asset = AVAsset(url: videoUrl)
            let item = AVPlayerItem(asset: asset)
            items.append(item)
        }
        // 3
        let queuePlayer = AVQueuePlayer(items: items)
        // 4
        let playerLayer = AVPlayerLayer(player: queuePlayer)
        playerLayer.frame = view.bounds
        playerLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(playerLayer)
        // 5
        queuePlayer.play()
    }


```

Trong đoạn code trên, chúng ta lần lượt làm những công việc sau:
* 1: Dựa vào giá trị của avplayerClicked để xác định chơi video theo kiểu nào
* 2: tạo mảng các object của AVPlayerItem từ các file video trong project
* 3: tạo instance của AVQueuePlayer từ mảng AVPlayerItem
* 4: tạo instance AVPlayerLayer từ instance AVQueuePlayer. công việc này tương tự bên trên vì AVQueuePlayer là subclass của AVPlayer
* 5: gọi hàm play() để bắt đầu chơi video

Build và chạy thử project, click vào nút “AVQueuePlayer”, chờ video play trên màn hình, các bạn sẽ thấy các video của chúng ta lần lượt được chơi từng video một đến khi hết.

# III. Tổng kết

Trên đây tôi đã giới thiệu đến các bạn một vài phương pháp để viết ứng dụng iOS liên quan đến chức năng chơi video. Mỗi cách sử dụng lại có ưu nhược điểm khác nhau, và tuỳ vào requirement cụ thể mà chúng ta sẽ quyết định sử dụng cách nào là tốt nhất cho mình. Cả AVKit và AVFoundation đều là những framework tuyệt vời mà các bạn nên dành nhiều thời gian hơn tìm hiểu về chúng. Hi vọng bài viết này sẽ giúp ích cho các bạn trong quá trình làm việc với video trong iOS.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!