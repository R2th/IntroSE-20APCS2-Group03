## I. Giới thiệu về Singleton Pattern:
- **Singleton Pattern** là một mẫu thiết kế phần mềm được sủ dụng để hạn chế sự khởi tạo của các lớp đối tượng. Điều này rất hữu ích khi cần một đối tượng chính xác để điều phối hành động trên toàn bộ hệ thống.
- Đối với một ứng dụng nghe nhạc, thì **Singleton Pattern** vô cùng hữu dụng bởi nó sẽ chỉ cho phép khởi tạo duy nhất một **instance** để phát và điều khiển nhạc trong ứng dụng và mọi thao tác sẽ xoay quanh **instance** này.
## II. Những yêu cầu khi sử dụng Singleton Pattern:
- Đảm bảo rằng chỉ có một **instance** duy nhất của lớp Singleton tồn tại.
- Cung cấp truy cập **public** cho trường hợp đó.
- Thông thường, tất cả các **contructor** của lớp phải là **private**.
- Cung cấp một phương thức tĩnh để trả về một tham chiếu đến đối tượng.
## III. Tạo Singleton để chơi nhạc:
1. Đầu tiên, chúng ta sẽ tạo một project có tên là MusicSingleton
![](https://images.viblo.asia/1154bd8e-e36b-4187-8cb9-6e9bbac6ec59.png)
2. Chúng ta sẽ tạo một ViewController với giao diện tương ứng, sau đó sẽ kéo action của các button vào trong ViewController
![](https://images.viblo.asia/df865895-c91e-48db-9448-8b2edd3942fe.png)
```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func buttonPlayClick(_ sender: Any) {
    }
    
    @IBAction func buttonStopClick(_ sender: Any) {
    }
    
    @IBAction func buttonNextClick(_ sender: Any) {
    }
    
    @IBAction func buttonPrevClick(_ sender: Any) {
    }
}
```
3. Các bạn lên bất kỳ một trang nhạc online nào để tải vài bài nhạc về làm dữ liệu mẫu nhé, ở đây mình lên mp3.zing.vn và tải 5 bài nhạc về, sau đó copy vào trong project.
![](https://images.viblo.asia/9c3e7de5-68c8-4667-b056-ed85092e3af1.png)
4. Sau đó tạo một mảng trong ViewController để lưu trữ tên các bài nhạc nhé
```swift
class ViewController: UIViewController {
    let musicList = [
        "la_lung",
        "loving_you",
        "ngay_lang_thang",
        "ngay_mai_em_di",
        "noi_dau_xot_xa"
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
    }
```
5.  Tiếp đến là phần quan trọng nhất, chúng ta sẽ tạo một Singleton để chơi nhạc
```swift
import Foundation
import AVFoundation

private protocol MediaManagerProtocol {
    func prepare(index: Int)
    func play()
    func pause()
    func changeTrack(increase: Int)
    func next()
    func previous()
}

class MediaManager: MediaManagerProtocol {
    private static let sharedInstance = MediaManager()
    private var audioPlayer = AVAudioPlayer()
    private var index = 0
    var musicList = [String]()
    
    static func getInstance() -> MediaManager {
        return sharedInstance
    }
    
    func prepare(index: Int) {
        let filePath = Bundle.main.path(forResource: musicList[index], ofType: "mp3")
        guard let path = filePath else {
            return
        }
        let url = URL.init(fileURLWithPath: path)
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: url)
            audioPlayer.prepareToPlay()
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(AVAudioSessionCategoryPlayback)
        }catch {
        }
    }
    
    func play() {
        audioPlayer.play()
    }
    
    func pause() {
        if audioPlayer.isPlaying {
            audioPlayer.pause()
        }
    }
    
    func changeTrack(increase: Int) {
        index = index + increase
        if index >= musicList.count {
            index = 0
        } else if index < 0 {
            index = musicList.count - 1
        }
        prepare(index: index)
        play()
    }
    
    func next() {
        changeTrack(increase: 1)
    }
    
    func previous() {
        changeTrack(increase: -1)
    }
}
```
6.  Sau khi tạo được Singleton rồi thì chỉ việc gọi ra để sử dụng trên ViewController thôi
```swift
class ViewController: UIViewController {
    let mediaManager: MediaManager = MediaManager.getInstance()
    let musicList = [
        "la_lung",
        "loving_you",
        "ngay_lang_thang",
        "ngay_mai_em_di",
        "noi_dau_xot_xa"
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        mediaManager.musicList = musicList
        mediaManager.prepare(index: 0)
    }
    
    @IBAction func buttonPlayClick(_ sender: Any) {
        mediaManager.play()
    }
    
    @IBAction func buttonStopClick(_ sender: Any) {
        mediaManager.pause()
    }
    
    @IBAction func buttonNextClick(_ sender: Any) {
        mediaManager.next()
    }
    
    @IBAction func buttonPrevClick(_ sender: Any) {
        mediaManager.previous()
    }
}
```
7.  Ngoài ra, chúng ta cũng có thể bật Background Mode để ứng dụng có thể chơi nhạc khi ở dưới background
![](https://images.viblo.asia/3b8e476c-6921-4615-ab45-7d690872a340.png)
## IV. Tài liệu tham khảo:
- https://vi.wikipedia.org/wiki/Singleton_pattern
- https://www.youtube.com/watch?v=dqad3XuMwHI