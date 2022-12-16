# Giới thiệu
Xin chào tất cả các bạn, hôm nay mình sẽ trình bày về những điểm quan trọng về kĩ thuật khi xử lý video trong lập trình iOS bằng cách sử dụng AVFoundation và CoreMedia.

Để có thể cho mọi người nắm bắt được thì mình sẽ chia bài viết thành 2 phần: 
* Chúng ta sẽ tạo một VideoService để set-up và launches một UIImagePickerController-có trách nhiệm cho việc ghi và lưu một tệp video vào ứng dụng Photos.
* Chúng ta sẽ custom VideoPlayerView tuỳ chỉnh để phát lại video. Ngoài ra VideoPlayerView sẽ cung cấp chức năng tạm dừng và có thể kéo thời lượng qua một thanh slider đồng thời hiện thị thời lượng và vị trí phát hiện tại.
# Phần 1: Recording and Saving Video with VideoService
## Tạo một Singleton
Bởi vì recording và saving video phải cùng một thời điểm nên 2 tác vụ này cần phải có một trạng thái để video đã lưu. Chúng ta sẽ tạo 1 singleton trong class VideoService
```
class VideoService {
    
    static let instance = VideoService()
    private init() {}
    
}
```
## Get Permissions, Perform Device Checks and Launch Video Recorder
Trước khi khởi chạy trình quay video thì chúng ta cần phải xin phép quyển truy cập camera và microphone từ device. Permissions trong iOS chúng ta sẽ thực hiện trong file info.plist. Mở file ra và add thêm 2 key là Microphone Usage Description và Camera Usage Description. Mỗi key cần có một String đính kèm thường sẽ là nội dung message để giải thích ngắn gọn cho user tại sao ứng dụng cần truy cập camera và microphone của họ.

Tiếp theo chúng ta sẽ thực hiện việc kiểm tra và setup trình ghi video thông qua thằng UIImagePickerController. Đoạn code dưới đây sẽ bao gồm 2 private method. Đầu tiên đó là `isVideoRecordingAvailable`
nó sẽ trả về một giá trị kiểu boolean và nội dung nó implementation trong function để check phải có cả camera trước và sau mới pass.Còn ở method thứ 2 là  `setupRecordingPicker` trả về một instance của UIImagePickerController
```
import MobileCoreServices

extension VideoService {
    
    private func isVideoRecordingAvailable() -> Bool {
        let front = UIImagePickerController.isCameraDeviceAvailable(.front)
        let rear = UIImagePickerController.isCameraDeviceAvailable(.rear)
        if !front || !rear {
            return false
        }
        guard let media = UIImagePickerController.availableMediaTypes(for: .camera) else {
            return false
        }
        return media.contains(kUTTypeMovie as String)
    }
    
    private func setupVideoRecordingPicker() -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.videoQuality = .typeMedium
        picker.mediaTypes = [kUTTypeMovie as String]
        return picker
    }
```
Bây giờ chúng ta đã có thể tạo 1 public method `launchVideoRecorder(in vc: completion:)` sẽ bao gồm 2 method trên và để thuận tiện hơn nữa thì mình sẽ tạo thêm một block để trong trường hợp bộ điều khiển xem cần thực thi mã sau khi segue xong.
```
import MobileCoreServices

extension VideoService {
    
    private func isVideoRecordingAvailable() -> Bool {
        let front = UIImagePickerController.isCameraDeviceAvailable(.front)
        let rear = UIImagePickerController.isCameraDeviceAvailable(.rear)
        if !front || !rear {
            return false
        }
        guard let media = UIImagePickerController.availableMediaTypes(for: .camera) else {
            return false
        }
        return media.contains(kUTTypeMovie as String)
    }
    
    private func setupVideoRecordingPicker() -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.videoQuality = .typeMedium
        picker.mediaTypes = [kUTTypeMovie as String]
        return picker
    }
    
    func launchVideoRecorder(in vc: UIViewController, completion: (() -> ())?) {
        guard isVideoRecordingAvailable() else {
            return }

        let picker = setupVideoRecordingPicker()

        if UIDevice.current.userInterfaceIdiom == UIUserInterfaceIdiom.phone {
            vc.present(picker, animated: true) {
                completion?()
            }
        }
    }
}
```
Và có vẻ như ngon hơn một tí rồi. Bây giờ ta có thể mở trình quay video từ một ViewController bất kỳ chỉ với oneline code ^^

`VideoService.instance.launchVideoRecorder(in: self, completion: nil)`

Để test code thì chúng ta phải dùng device thật.

## Conform to UIImagePickerControllerDelegate
Sau khi người dùng chọn video đã lưu và cho chạy nó thì cũng tương ứng với việc sẽ gọi một delegate của nò là `imagePickerController(picker: didFinishPickingMediaWithInfo:)` Vì thế chúng ta cần adopt và conform `UIImagePickerControllerDelegate`
Chúng ta sẽ đặt delegate ở trong method `setupVideoRecordingPicker()`
```
class VideoService: NSObject {
    
    static let instance = VideoService()
    private override init() {}
    
}

extension VideoService: UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        print("VideoService: entered didFinishPickingMediaWithInfo")
    }
}
```
## Save Video to Photos Album
Sau khi đã hứng được sự kiện người dùng khi tap vào bất kì một media(image hoặc video) thì method đó sẽ được gọi đến. Để add một media vào thư viện thì cũng giống như xin quyền truy cập camera chúng ta cũng phải cần xin phép quyền add thêm vào thư viện. Vì vậy chúng ta sẽ quay lại với file `info.plist` và tạo một key mới là `Photo Library Additions Usage Description` với nội dung message tương ứng để hiển thị cho người sử dụng. Đến đây việc lưu video cực kì đơn giản thông qua 2 static method trong UIKit đầu tiên trả về một giá trị boolean để cho biết việc video có tương thích với việc lưu vào thư viện hay không. Sau đó lần thứ 2 thực hiện việc lưu và gọi `#selector` để thông báo thành công hay chưa. Phương thức `#selector` này sẽ được dùng ở phần sau.
```
extension VideoService {

    private func saveVideo(at mediaUrl: URL) {
        let compatible = UIVideoAtPathIsCompatibleWithSavedPhotosAlbum(mediaUrl.path)
        if compatible {
            UISaveVideoAtPathToSavedPhotosAlbum(mediaUrl.path, self, #selector(video(videoPath:didFinishSavingWithError:contextInfo:)), nil)
            
        }
    }

    @objc func video(videoPath: NSString, didFinishSavingWithError error: NSError?, contextInfo info: AnyObject) {
        //we will use this soon.
    }
}
    
extension VideoService: UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            guard let mediaURL = info[UIImagePickerController.InfoKey.mediaURL] as? URL else { return }
            self.saveVideo(at: mediaURL)
    }
}
```
##  Pass Video URL with Delegate Pattern
Sau khi lưu thành công video thì chúng ta muốn có thể chuyển URL của nó tới ViewController của chúng ta. Để làm được việc này chúng ta sẽ dùng Delegate pattern. Đầu tiên chúng ta sẽ tạo một protocol `VideoServiceDelegate` và tạo một phương thức `videoDidFinishSaving(error: url:)` có nhiệm vụ sẽ pass qua Error khi việc lưu không thành công và sau đó là url tuỳ chọn nếu lưu thành công. Tiếp theo chúng ta tạo một delegate property của `VideoServiceDelegate` có nhiệm vụ để pass error và url trong phương thức `#selector` mà chúng ta đã tạo trong đoạn trước.
```
protocol VideoServiceDelegate {
    func videoDidFinishSaving(error: Error?, url: URL?)
}

class VideoService: NSObject {
    
    var delegate: VideoServiceDelegate?
    
    static let instance = VideoService()
    private override init() {}
    
}

extension VideoService {

    @objc func video(videoPath: NSString, didFinishSavingWithError error: NSError?, contextInfo info: AnyObject) {
        let videoURL = URL(fileURLWithPath: videoPath as String)
        self.delegate?.videoDidFinishSaving(error: error, url: videoURL)
    }
}
```

Bây giờ trong ViewController, ta có thể adopt `VideoServiceDelegate`, implement phương thức trong protocol và set VideoService’s delegate property bằng cách sử dụng `VideoService.instance.delegate = self`. Đoạn dưới đây ta sẽ hiện thị alert cho người dùng khi việc lưu xong thành công hoặc không thành công.
```
extension ViewController : VideoServiceDelegate {
    
    func videoDidFinishSaving(error: Error?, url: URL?) {
        let success: Bool = error == nil && url != nil
        
        let title = success ? "Success" : "Error"
        let message = success ? "Video was saved" : "Could not save video"
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)n
        alert.addAction(UIAlertAction(title: "OK", style: .cancel, handler: nil))
        self.present(alert, animated: true, completion: nil)
    } 
}
```
# Phần 2: Playing Back Video with VideoPlayerView
Trước đây việc phát lại video được support bởi `MPMoviePlayerController`. Tuy nhiên đó từ khi iOS9 nó đã thay thế bởi `AVFoundation` mặc dù yêu cầu nhiều hơn về thiết lập nhưng nó cho phép sự tuỳ chỉnh trình phát video của bạn nhiều hơn.

Phần tiếp theo chúng ta sẽ custom VideoPlayerView là con của UIView và chứa tất cả các thành phần giao diện người dùng để tương tác với video.
##  Create AVPlayer and AVPlayerLayer
Để hiển thị video chúng ta cần `import AVFoundation` và setup 2 property là `AVPlayer` và `AVPlayerLayer`. Ở đây chúng ta sẽ tạo `AVPlayer` một công cụ có thể handle playing, pause và tracking progress.
```
class VideoPlayerView: UIView {
    
    private var player: AVPlayer?
    private var playerLayer: AVPlayerLayer?

    init(withFrame frame: CGRect, videoURLString: String) {
        super.init(frame: frame)
        
        setupVideoPlayer(with: videoURLString)
    }
  
    private func setupVideoPlayer(with path: String) {
        addPlayer(with: path)
        player?.play()
    }
    
    private func addPlayer(with urlPath: String) {
        let videoURL = URL(fileURLWithPath: urlPath)
        player = AVPlayer(url: videoURL)
        playerLayer = AVPlayerLayer(player: player)
        
        self.layer.addSublayer(playerLayer!)
        playerLayer?.frame = self.bounds
    }
}
```

Bây giờ chúng ta có thể test nó bằng cách lấy url từ method `VideoServiceDelegate` và pass vào method `playMovie(with url:)`
```
extension ViewController : VideoServiceDelegate {
    
    func videoDidFinishSaving(error: Error?, url: URL?) {
        let success: Bool = error == nil && url != nil
        
        if success {
            playMovie(with: url!)
        }
    }
}
  
 
extension ViewController {
     
    private func playMovie(with url: URL) {        
        let playerRect = CGRect(x: 0, y: 0, width: view.bounds.width, height: view.bounds.width / 2)
        videoPlayerView = VideoPlayerView(withFrame: playerRect, videoURLString: url.path)
        view.addSubview(videoPlayerView!)
    }
   
}
```
## Tap Gesture Controls Play and Pause
Bây giờ chúng ta sẽ kiểm soát khi việc phát và tạm dừng bằng cách thêm tap gesture vào `VideoPlayerView` với một selector mothod là `handleTapGesture(sender:)`. Phương thức này kiểm tra một giá trị boolean `isSettingPlay` để xác định là có nên bắt đầu hay tạm dừng phát lại hay không.
```
class VideoPlayerView: UIView {
    
    private var isSettingPlay = true
  
    init(withFrame frame: CGRect, videoURLString: String) {
        super.init(frame: frame)
       
        setupVideoPlayer(with: videoURLString)
        addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleTapGesture)))
    }
  
    @objc private func handleTapGesture(sender: UITapGestureRecognizer) {
        if isSettingPlay {
            player?.pause()
        } else {
            player?.play()
        }
        isSettingPlay = !isSettingPlay
    }
    
}
```
## Track Video Progress with Labels and Slider
Đến đây còn phần này nữa là ngon. Ta sẽ tạo thêm method mới là `trackVideoProgress()` để cập nhật nhãn thời gian và slider cho trình quay video. Rất may trong CoreMedia của apple đã cung cấp cho ta CMTime có trách nhiệm quản lý và đại diện thời gian trong `AVFoundation`.Chúng ta sẽ update Label time và slider trong completion handler.
Để lấy được ra tổng thời gian của video chúng ta sẽ sử dụng method ` observeValue(forKeyPath:, of object: , change:, context: )`
```
extension String {
    
    static func duration(from time: CMTime) -> String {
        let totalSeconds = CMTimeGetSeconds(time)
        let secondsText = String(format: "%02d", Int(totalSeconds) % 60)
        let minutesText = String(format: "%02d", Int(totalSeconds) / 60)
        return  "\(minutesText):\(secondsText)"
    }
    
}

extension UISlider {
    
    func setSliderValue(for player: AVPlayer, progress: CMTime) {
        guard let duration = player.currentItem?.duration else { return }
        let totalSeconds = CMTimeGetSeconds(duration)
        let progressSeconds = CMTimeGetSeconds(progress)
        self.value = Float(progressSeconds / totalSeconds)
    }
    
}

extension VideoPlayerView {
  
  private func trackVideoProgress() {
        let interval = CMTime(value: 1, timescale: 2)
        player?.addPeriodicTimeObserver(forInterval: interval, queue: DispatchQueue.main, using: { (progressTime) in
            self.currentTimeLabel.text = String.duration(from: progressTime)
            if let player = self.player {
                self.slider.setSliderValue(for: player, progress: progressTime)
            }
        })
    }

    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        
        guard keyPath == AVPlayer.observableKey.loadedTimeRanges.rawValue else { return }
        
        guard let duration = player?.currentItem?.duration else { return }
        videoLengthLabel.text = String.duration(from: duration)
    }
}  
```
## Scrub to Different Points in Video Using Slider
```
extension VideoPlayerView {

      @objc private func handleSliderChangedValue(sender: UISlider) {
        if let duration = player?.currentItem?.duration {
            let totalSeconds = CMTimeGetSeconds(duration)
            
            let value = Float64(slider.value) * totalSeconds
            let seekTime = CMTime(value: Int64(value), timescale: 1)
            
            player?.seek(to: seekTime, completionHandler: { (_) in })
        }
    }
}
```
# Tổng kết
Như vậy chúng ta đã tìm hiểu qua về cách xử lý video trong lập trình iOS-Swift với chức năng cơ bản cho trình phát video.
Bái viết nhằm mục đích chia sẻ học tập và có gì còn thiếu sót các bạn có thể phản hồi bên dưới comment.
# Tài liệu tham khảo
1. https://developer.apple.com/av-foundation/
2. https://developer.apple.com/documentation/coremedia
3. https://medium.com/swift2go/working-with-video-in-ios-avfoundation-and-coremedia-10bdd71f6a6e