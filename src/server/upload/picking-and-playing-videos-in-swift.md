Đến với bài viết này chúng ta sẽ tìm hiểu làm thế nào để ghi hoặc chọn một file video sử dụng một video picker controller và AVPlayer class, viết hoàn toàn bằng Swift 5.

### Let's pick some videos!

Trước hết bạn sẽ cần phải thêm một số thông tin vào file Info.plist của bạn, bởi vì bạn muốn truy cập một số dữ liệu cá nhân. Bạn cần biết: privacy là rất quan trọng. 🤫

```
<key>NSCameraUsageDescription</key>
<string>This app wants to take pictures &amp; videos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app wants to use your picture &amp; video library.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app wants to record sound.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>This app wants to save pictures &amp; videos to your library.</string>
```

Vì chúng ta sẽ không quay video silent chúng ta cũng phải thêm Privacy - Microphone Usage Description.  🎬

Lớp VideoPicker của chúng ta sẽ là 90% giống như lớp ImagePicker. Bạn có thể tạo một abstract class, bất cứ điều gì, tôi sẽ cho bạn thấy những mã cuối cùng, sau đó chúng ta có thể nói về sự khác biệt. 😅

```
import UIKit

public protocol VideoPickerDelegate: class {
    func didSelect(url: URL?)
}

open class VideoPicker: NSObject {

    private let pickerController: UIImagePickerController
    private weak var presentationController: UIViewController?
    private weak var delegate: VideoPickerDelegate?

    public init(presentationController: UIViewController, delegate: VideoPickerDelegate) {
        self.pickerController = UIImagePickerController()

        super.init()

        self.presentationController = presentationController
        self.delegate = delegate
    
        self.pickerController.delegate = self
        self.pickerController.allowsEditing = true
        self.pickerController.mediaTypes = ["public.movie"]
        self.pickerController.videoQuality = .typeHigh
    }
    
    private func action(for type: UIImagePickerController.SourceType, title: String) -> UIAlertAction? {
        guard UIImagePickerController.isSourceTypeAvailable(type) else {
            return nil
        }
        
        return UIAlertAction(title: title, style: .default) { [unowned self] _ in
            self.pickerController.sourceType = type
            self.presentationController?.present(self.pickerController, animated: true)
        }
    }
    
    public func present(from sourceView: UIView) {

        let alertController = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        if let action = self.action(for: .camera, title: "Take video") {
            alertController.addAction(action)
        }
        if let action = self.action(for: .savedPhotosAlbum, title: "Camera roll") {
            alertController.addAction(action)
        }
        if let action = self.action(for: .photoLibrary, title: "Video library") {
            alertController.addAction(action)
        }
        
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))

        if UIDevice.current.userInterfaceIdiom == .pad {
            alertController.popoverPresentationController?.sourceView = sourceView
            alertController.popoverPresentationController?.sourceRect = sourceView.bounds
            alertController.popoverPresentationController?.permittedArrowDirections = [.down, .up]
        }

        self.presentationController?.present(alertController, animated: true)
    }
    
    private func pickerController(_ controller: UIImagePickerController, didSelect url: URL?) {
        controller.dismiss(animated: true, completion: nil)
        
        self.delegate?.didSelect(url: url)
    }
}

extension VideoPicker: UIImagePickerControllerDelegate {
    
    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.pickerController(picker, didSelect: nil)
    }

    public func imagePickerController(_ picker: UIImagePickerController,
                                      didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {

        guard let url = info[.mediaURL] as? URL else {
            return self.pickerController(picker, didSelect: nil)
        }

//        //uncomment this if you want to save the video file to the media library
//        if UIVideoAtPathIsCompatibleWithSavedPhotosAlbum(url.path) {
//            UISaveVideoAtPathToSavedPhotosAlbum(url.path, self, nil, nil)
//        }
        self.pickerController(picker, didSelect: url)
    }
}

extension VideoPicker: UINavigationControllerDelegate {
    
}
```


Đó chỉ là một vài thay đổi nhỏ .  Đầu tiên là mediaTypes thuộc tính, bạn có thể sử dụng "public.movie" giá trị thời gian này. Ngoài ra, bạn nên thiết lập thuộc tính videoQuality trên pickerController, vì 4k luôn luôn là tốt hơn so với 320. 🤪

Các delegate là điều cuối cùng làm thay đổi một chút. Sau khi kết thúc chọn công việc bạn có thể nhận .mediaURL, đó là một URL để có được file đa phương tiện (còn được gọi là các captured / selected tập tin video). Nếu một tập tin mới được ghi nhận bạn cũng có thể lưu nó vào thư viện phương tiện truyền thông, đó chỉ là hai dòng mã thêm.

### Playing video files using AVPlayer & UIView

```
import UIKit
import AVFoundation

open class VideoView: UIView {
    
    public enum Repeat {
        case once
        case loop
    }
   
    override open class var layerClass: AnyClass {
        return AVPlayerLayer.self
    }

    private var playerLayer: AVPlayerLayer {
        return self.layer as! AVPlayerLayer
    }

    public var player: AVPlayer? {
        get {
            self.playerLayer.player
        }
        set {
            self.playerLayer.player = newValue
        }
    }
    
    
    open override var contentMode: UIView.ContentMode {
        didSet {
            switch self.contentMode {
            case .scaleAspectFit:
                self.playerLayer.videoGravity = .resizeAspect
            case .scaleAspectFill:
                self.playerLayer.videoGravity = .resizeAspectFill
            default:
                self.playerLayer.videoGravity = .resize
            }
        }
    }

    public var `repeat`: Repeat = .once
    
    public var url: URL? {
        didSet {
            guard let url = self.url else {
                self.teardown()
                return
            }
            self.setup(url: url)
        }
    }

    @available(*, unavailable)
    override init(frame: CGRect) {
        super.init(frame: frame)

        self.initialize()
    }

    @available(*, unavailable)
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)

        self.initialize()
    }

    public init() {
        super.init(frame: .zero)
        
        self.translatesAutoresizingMaskIntoConstraints = false

        self.initialize()
    }

    open func initialize() {
        
    }
    
    deinit {
        self.teardown()
    }
 

    private func setup(url: URL) {
        
        self.player = AVPlayer(playerItem: AVPlayerItem(url: url))
        
        self.player?.currentItem?.addObserver(self,
                                              forKeyPath: "status",
                                              options: [.old, .new],
                                              context: nil)
        
        self.player?.addObserver(self, forKeyPath: "rate", options: [.old, .new], context: nil)

        
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(self.itemDidPlayToEndTime(_:)),
                                               name: .AVPlayerItemDidPlayToEndTime,
                                               object: self.player?.currentItem)
        
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(self.itemFailedToPlayToEndTime(_:)),
                                               name: .AVPlayerItemFailedToPlayToEndTime,
                                               object: self.player?.currentItem)
    }
    
    private func teardown() {
        self.player?.pause()

        self.player?.currentItem?.removeObserver(self, forKeyPath: "status")
        
        self.player?.removeObserver(self, forKeyPath: "rate")
        
        NotificationCenter.default.removeObserver(self,
                                                  name: .AVPlayerItemDidPlayToEndTime,
                                                  object: self.player?.currentItem)
        
        NotificationCenter.default.removeObserver(self,
                                                  name: .AVPlayerItemFailedToPlayToEndTime,
                                                  object: self.player?.currentItem)
                                                  
        self.player = nil
    }

   

    @objc func itemDidPlayToEndTime(_ notification: NSNotification) {
        guard self.repeat == .loop else {
            return
        }
        self.player?.seek(to: .zero)
        self.player?.play()
    }
    
    @objc func itemFailedToPlayToEndTime(_ notification: NSNotification) {
        self.teardown()
    }
    
    
    open override func observeValue(forKeyPath keyPath: String?,
                                          of object: Any?,
                                          change: [NSKeyValueChangeKey : Any]?,
                                          context: UnsafeMutableRawPointer?) {
        if keyPath == "status", let status = self.player?.currentItem?.status, status == .failed {
            self.teardown()
        }

        if
            keyPath == "rate",
            let player = self.player,
            player.rate == 0,
            let item = player.currentItem,
            !item.isPlaybackBufferEmpty,
            CMTimeGetSeconds(item.duration) != CMTimeGetSeconds(player.currentTime())
        {
            self.player?.play()
        }
    }
}
```


Đây là repo demo bạn có thể có một cái nhìn trực quan hơn tại [The.Swift.Dev tutorials repository](https://github.com/theswiftdev/tutorials).

### External sources
* [Picking images with UIImagePickerController in Swift 5](https://theswiftdev.com/2019/01/30/picking-images-with-uiimagepickercontroller-in-swift-5/)
* [SwiftVideoPlayer](https://github.com/awojnowski/SwiftVideoPlayer)
* [AVPlayer stops playing and doesn't resume again](https://stackoverflow.com/questions/19291636/avplayer-stops-playing-and-doesnt-resume-again)
* [How to detect AVPlayer actually started to play in swift](https://stackoverflow.com/questions/40781738/how-to-detect-avplayer-actually-started-to-play-in-swift)


### Conclusion

Cám ơn các bạn đã quan tâm tới bài viết, bài viết này được dịch theo[ bài viết cùng tên của tác giả Tibor Bödecs.](https://theswiftdev.com/2019/08/28/picking-and-playing-videos-in-swift/)