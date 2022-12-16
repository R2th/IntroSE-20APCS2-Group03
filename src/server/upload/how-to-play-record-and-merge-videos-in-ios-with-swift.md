Xin chào các bạn hôm nay mình trình bày về cách Play, Record và Merge Videos trong iOS - Swift 4.0
Bài viết được clone từ bài viết của tác giả Owen Brown tại [đây](https://www.raywenderlich.com/188034/how-to-play-record-and-merge-videos-in-ios-and-swift) 
# Getting Started
Đầu tiên các bạn hãy download material cho project này tại [đây](https://koenig-media.raywenderlich.com/uploads/2018/05/RWVideoNinja.zip)
Project này chứa một story board và một số bộ điều khiển chế độ xem với giao diện người dùng để phát lại video và ứng dụng ghi âm đơn giản.
Màn hình chính chứa ba nút bên dưới để phân biệt với các bộ điều khiển chế độ xem khác:
* Select and Play Video
* Record and Save Video
* Merge Video
Build and run the project bạn sẽ thấy :
![](https://images.viblo.asia/2ce259f4-b37c-4b91-9838-c48153fbe669.png)
# Select and Play Video
Trong section của tutorial, bạn sẽ làm để chọn một video and play nó.
Mở PlayVideoViewController.swift và import như dưới đây :
```
import AVKit
import MobileCoreServices
```
Importing AVKit giúp bạn truy cập đối tượng AVPlayer để play video đã chọn. MobileCoreServices bao gồm nhiều hằng số như kUTTypeMovie -  cái mà sẽ cần cho việc chọn video.
Next, cuộn xuống dưới cùng và thêm 2 extension :
```
// MARK: - UIImagePickerControllerDelegate
extension PlayVideoViewController: UIImagePickerControllerDelegate {
}

// MARK: - UINavigationControllerDelegate
extension PlayVideoViewController: UINavigationControllerDelegate {
}
```
Extensions để set-up PlayVideoViewController để adopt tới UIImagePickerControllerDelegate và UINavigationControllerDelegate protocols.
Bạn sẽ sử dụng UIImagePickerController do hệ thống cung cấp để cho phép người dùng duyệt qua video trong thư viện ảnh và lớp đó liên lạc lại với ứng dụng của bạn thông qua các delegate protocols.
Next, quay trở lại phía trên của class PlayVideoViewController và thêm một  helper method từ VideoHelper để mở image picker. Sau đó, bạn sẽ thêm trong VideoHelper : 
```
VideoHelper.startMediaBrowser(delegate: self, sourceType: .savedPhotosAlbum)
```
Trong đoạn mã trên, bạn đảm bảo rằng việc nhấn Play Video sẽ mở UIImagePickerController, cho phép người dùng chọn tệp video từ thư viện phương tiện.
Bây giờ build và run project sau đó tap vào Select and Play Video và sau đó tap vào Play Video bạn sẽ thấy:
![](https://images.viblo.asia/482fe025-66b4-4b83-8ef4-94692f983ce7.png)
Đến đây để handle sự kiện khi chọn video để phát thì bạn sẽ cần phải quay lại UIImagePickerControllerDelegate trong PlayVideoViewController.swift và implementation cho nó :
```
func imagePickerController(_ picker: UIImagePickerController, 
                           didFinishPickingMediaWithInfo info: [String : Any]) {
  // 1
  guard 
    let mediaType = info[UIImagePickerControllerMediaType] as? String,
    mediaType == (kUTTypeMovie as String),
    let url = info[UIImagePickerControllerMediaURL] as? URL
    else { 
      return 
  }
  
  // 2
  dismiss(animated: true) {
    //3
    let player = AVPlayer(url: url)
    let vcPlayer = AVPlayerViewController()
    vcPlayer.player = player
    self.present(vcPlayer, animated: true, completion: nil)
  }
}
```
Trong method trên sẽ làm các nhiệm vụ sau :

1. Bạn nhận được loại phương tiện của phương tiện và URL đã chọn. Bạn đảm bảo đó là type movie.
2. Bạn dismiss image picker.
3. Trong khối hoàn thành, bạn tạo một AVPlayerViewController để phát phương tiện.
Build and run. Tap Select and Play Video, then Play Vided, và chọn video từ list.
![](https://images.viblo.asia/482fe025-66b4-4b83-8ef4-94692f983ce7.png)
![](https://images.viblo.asia/3c70cdce-775e-4d01-af95-26bbf5dd3695.png)
# Record and Save Video
Mở RecordVideoViewController.swift và sau đó import :
```
import MobileCoreServices
```
Bạn cũng sẽ cần phải áp dụng cùng một giao thức như PlayVideoViewController, bằng cách thêm phần sau vào cuối tệp:
```
extension RecordVideoViewController: UIImagePickerControllerDelegate {
}

extension RecordVideoViewController: UINavigationControllerDelegate {
}
```
Sau đó thêm đoạn mã sau vào record(: )
```
VideoHelper.startMediaBrowser(delegate: self, sourceType: .camera)
```
Build and run để nhìn thấy sự thay đổi
Chuyển tới màn hình Ghi và nhấn Record Video. Thay vì Thư viện ảnh, giao diện người dùng máy ảnh sẽ mở ra. Khi alert yêu cầu quyền đối với máy ảnh và quyền micrô, hãy nhấp vào OK. Bắt đầu quay video bằng cách nhấn vào nút ghi màu đỏ ở cuối màn hình và nhấn lại vào video khi bạn ghi xong.
Tiếp tục khi quay xong video thì cần implementation để lưu nó vào library :
```
func imagePickerController(_ picker: UIImagePickerController, 
                           didFinishPickingMediaWithInfo info: [String : Any]) {
  dismiss(animated: true, completion: nil)
  
  guard 
    let mediaType = info[UIImagePickerControllerMediaType] as? String,
    mediaType == (kUTTypeMovie as String),
    let url = info[UIImagePickerControllerMediaURL] as? URL,
    UIVideoAtPathIsCompatibleWithSavedPhotosAlbum(url.path)
    else {
      return
  }
  
  // Handle a movie capture
  UISaveVideoAtPathToSavedPhotosAlbum(
    url.path, 
    self, 
    #selector(video(_:didFinishSavingWithError:contextInfo:)), 
    nil)
}
```
UISaveVideoAtPathToSavedPhotosAlbum là chức năng được cung cấp bởi SDK để lưu video vào Album ảnh
Thêm implementation method video :
```
@objc func video(_ videoPath: String, didFinishSavingWithError error: Error?, contextInfo info: AnyObject) {
  let title = (error == nil) ? "Success" : "Error"
  let message = (error == nil) ? "Video was saved" : "Video failed to save"
  
  let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
  alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.cancel, handler: nil))
  present(alert, animated: true, completion: nil)
}
```
Build và run app bạn sẽ thấy khi bạn tap vào save video thì sẽ xuất hiện 1 alert pop up với nội dung là "Video was saved"
![](https://images.viblo.asia/abd6605d-49a3-4266-82b4-727e68c96e84.png)
# Merging Videos
Phần cuối cùng của chức năng cho ứng dụng là chỉnh sửa một chút. Người dùng của bạn sẽ chọn hai video và một bài hát từ thư viện nhạc và ứng dụng sẽ kết hợp hai video và mix nhạc.
Chúng ta sẽ implementation MergeVideoViewController.swift. Mã ở đây tương tự như mã bạn đã viết để phát video. Điểm khác biệt lớn nhất là khi hợp nhất, người dùng cần chọn hai video. Phần đó đã được thiết lập, do đó người dùng có thể thực hiện hai lựa chọn sẽ được lưu trữ trong firstAsset và secondAsset.
Bước tiếp theo là thêm chức năng để chọn tập tin âm thanh.
UIImagePickerController chỉ cung cấp chức năng để chọn video và hình ảnh từ thư viện phương tiện. Để chọn tệp âm thanh từ thư viện nhạc của bạn, bạn sẽ sử dụng MPMediaPickerController. Nó hoạt động cơ bản giống như UIImagePickerController, nhưng thay vì hình ảnh và video, nó truy cập các tệp âm thanh trong thư viện phương tiện.
Mở MergeVideoViewController.swift và thêm đoạn mã sau tới loadAudio(: )
```
let mediaPickerController = MPMediaPickerController(mediaTypes: .any)
mediaPickerController.delegate = self
mediaPickerController.prompt = "Select Audio"
present(mediaPickerController, animated: true, completion: nil)
```
Đoạn mã trên tạo ra một thể hiện MPMediaPickerController mới và hiển thị nó như một bộ điều khiển xem phương thức.
Build và run. Giờ hãy nhấn Merge Video, sau đó Load Audio để truy cập thư viện âm thanh trên thiết bị của bạn
![](https://images.viblo.asia/a835eae9-5b32-47ce-acda-f55e4b2b3318.png)
Tiếp theo sẽ là implementation cho handle khi chọn vào bài hát bằng cách tìm đến extension của class MPMediaPickerControllerDelegate : 
```
func mediaPicker(_ mediaPicker: MPMediaPickerController, 
                 didPickMediaItems mediaItemCollection: MPMediaItemCollection) {
  
  dismiss(animated: true) {
    let selectedSongs = mediaItemCollection.items
    guard let song = selectedSongs.first else { return }
    
    let url = song.value(forProperty: MPMediaItemPropertyAssetURL) as? URL
    self.audioAsset = (url == nil) ? nil : AVAsset(url: url!)
    let title = (url == nil) ? "Asset Not Available" : "Asset Loaded"
    let message = (url == nil) ? "Audio Not Loaded" : "Audio Loaded"
    
    let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .cancel, handler:nil))
    self.present(alert, animated: true, completion: nil)
  }
}

func mediaPickerDidCancel(_ mediaPicker: MPMediaPickerController) {
  dismiss(animated: true, completion: nil)
}
```
Build và run. Đi tới Merge Video sau đó select một audio file và nếu không có lỗi thì nó pop up một alert với nội dung "Audio Loaded"
![](https://images.viblo.asia/623d8c88-9d21-42c1-a6a3-77dd1cc56be0.png)
# Export and Merge
Mã để hợp nhất nội dung của bạn sẽ yêu cầu trình xử lý hoàn tất xuất video cuối cùng vào album ảnh. Thêm mã bên dưới vào MergeVideoViewController :
```
func exportDidFinish(_ session: AVAssetExportSession) {
  
  // Cleanup assets
  activityMonitor.stopAnimating()
  firstAsset = nil
  secondAsset = nil
  audioAsset = nil
  
  guard 
    session.status == AVAssetExportSessionStatus.completed,
    let outputURL = session.outputURL 
    else {
      return
  }
  
  let saveVideoToPhotos = {
    PHPhotoLibrary.shared().performChanges({ 
      PHAssetChangeRequest.creationRequestForAssetFromVideo(atFileURL: outputURL)
    }) { saved, error in
      let success = saved && (error == nil)
      let title = success ? "Success" : "Error"
      let message = success ? "Video saved" : "Failed to save video"
      
      let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.cancel, handler: nil))
      self.present(alert, animated: true, completion: nil)
    }
  }
  
  // Ensure permission to access Photo Library
  if PHPhotoLibrary.authorizationStatus() != .authorized {
    PHPhotoLibrary.requestAuthorization { status in
      if status == .authorized {
        saveVideoToPhotos()
      }
    }
  } else {
    saveVideoToPhotos()
  }
}
```
Khi quá trình xuất hoàn tất thành công, mã trên sẽ lưu video mới được xuất vào album ảnh. Bạn chỉ có thể hiển thị video đầu ra trong AssetBrowser, nhưng sẽ dễ dàng sao chép video đầu ra hơn vào album ảnh để bạn có thể xem kết quả cuối cùng.
Bây giờ sẽ thêm đoạn mã sau vào merge (: ) 
```
guard 
  let firstAsset = firstAsset, 
  let secondAsset = secondAsset 
  else {
    return
}

activityMonitor.startAnimating()

// 1 - Create AVMutableComposition object. This object will hold your AVMutableCompositionTrack instances.
let mixComposition = AVMutableComposition()

// 2 - Create two video tracks
guard 
  let firstTrack = mixComposition.addMutableTrack(withMediaType: AVMediaType.video, 
                                                  preferredTrackID: Int32(kCMPersistentTrackID_Invalid)) 
  else {
    return
}
do {
  try firstTrack.insertTimeRange(CMTimeRangeMake(kCMTimeZero, firstAsset.duration), 
                                 of: firstAsset.tracks(withMediaType: AVMediaType.video)[0], 
                                 at: kCMTimeZero)
} catch {
  print("Failed to load first track")
  return
}

guard 
  let secondTrack = mixComposition.addMutableTrack(withMediaType: AVMediaType.video, 
                                                   preferredTrackID: Int32(kCMPersistentTrackID_Invalid))
  else {
    return
}
do {
  try secondTrack.insertTimeRange(CMTimeRangeMake(kCMTimeZero, secondAsset.duration), 
                                  of: secondAsset.tracks(withMediaType: AVMediaType.video)[0], 
                                  at: firstAsset.duration)
} catch {
  print("Failed to load second track")
  return
}

// 3 - Audio track
if let loadedAudioAsset = audioAsset {
  let audioTrack = mixComposition.addMutableTrack(withMediaType: AVMediaType.audio, preferredTrackID: 0)
  do {
    try audioTrack?.insertTimeRange(CMTimeRangeMake(kCMTimeZero, 
                                                    CMTimeAdd(firstAsset.duration, 
                                                              secondAsset.duration)),
                                    of: loadedAudioAsset.tracks(withMediaType: AVMediaType.audio)[0] ,
                                    at: kCMTimeZero)
  } catch {
    print("Failed to load Audio track")
  }
}

// 4 - Get path
guard let documentDirectory = FileManager.default.urls(for: .documentDirectory, 
                                                       in: .userDomainMask).first else {
  return
}
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .long
dateFormatter.timeStyle = .short
let date = dateFormatter.string(from: Date())
let url = documentDirectory.appendingPathComponent("mergeVideo-\(date).mov")

// 5 - Create Exporter
guard let exporter = AVAssetExportSession(asset: mixComposition, 
                                          presetName: AVAssetExportPresetHighestQuality) else {
  return
}
exporter.outputURL = url
exporter.outputFileType = AVFileType.mov
exporter.shouldOptimizeForNetworkUse = true

// 6 - Perform the Export
exporter.exportAsynchronously() {
  DispatchQueue.main.async {
    self.exportDidFinish(exporter)
  }
}
```
Và rồi bulid và run project sau đó chọn 2 video và 1 bài hát
Tuy nhiên đến đây sẽ có vấn đề về orientation của video sẽ xoay ngang
![](https://images.viblo.asia/e4a3de76-84ef-4673-830f-e5fe4b13e937.png)
# Video Orientation
AVAsset có thuộc tính preferenceTransform chứa thông tin định hướng truyền thông và nó áp dụng điều này cho tệp phương tiện bất cứ khi nào bạn xem nó bằng ứng dụng Ảnh hoặc QuickTime. Trong đoạn mã trên, bạn chưa áp dụng biến đổi cho đối tượng AVAsset của mình, do đó vấn đề định hướng.
Bạn có thể sửa điều này một cách dễ dàng bằng cách áp dụng các biến đổi cần thiết cho các đối tượng AVAsset của bạn. Nhưng vì hai tệp video của bạn có thể có các hướng khác nhau, bạn sẽ cần phải sử dụng hai phiên bản AVMutableCompositionTrack riêng biệt thay vì một phiên bản như ban đầu bạn đã làm.
Thêm đoạn mã sau vào VideoHelper:
```
static func orientationFromTransform(_ transform: CGAffineTransform) 
  -> (orientation: UIImageOrientation, isPortrait: Bool) {
  var assetOrientation = UIImageOrientation.up
  var isPortrait = false
  if transform.a == 0 && transform.b == 1.0 && transform.c == -1.0 && transform.d == 0 {
    assetOrientation = .right
    isPortrait = true
  } else if transform.a == 0 && transform.b == -1.0 && transform.c == 1.0 && transform.d == 0 {
    assetOrientation = .left
    isPortrait = true
  } else if transform.a == 1.0 && transform.b == 0 && transform.c == 0 && transform.d == 1.0 {
    assetOrientation = .up
  } else if transform.a == -1.0 && transform.b == 0 && transform.c == 0 && transform.d == -1.0 {
    assetOrientation = .down
  }
  return (assetOrientation, isPortrait)
}
```
Tiếp theo, thêm một phương thức trợ giúp khác vào lớp:
```
static func videoCompositionInstruction(_ track: AVCompositionTrack, asset: AVAsset) 
  -> AVMutableVideoCompositionLayerInstruction {
  let instruction = AVMutableVideoCompositionLayerInstruction(assetTrack: track)
  let assetTrack = asset.tracks(withMediaType: .video)[0]
  
  let transform = assetTrack.preferredTransform
  let assetInfo = orientationFromTransform(transform)
  
  var scaleToFitRatio = UIScreen.main.bounds.width / assetTrack.naturalSize.width
  if assetInfo.isPortrait {
    scaleToFitRatio = UIScreen.main.bounds.width / assetTrack.naturalSize.height
    let scaleFactor = CGAffineTransform(scaleX: scaleToFitRatio, y: scaleToFitRatio)
    instruction.setTransform(assetTrack.preferredTransform.concatenating(scaleFactor), at: kCMTimeZero)
  } else {
    let scaleFactor = CGAffineTransform(scaleX: scaleToFitRatio, y: scaleToFitRatio)
    var concat = assetTrack.preferredTransform.concatenating(scaleFactor)
      .concatenating(CGAffineTransform(translationX: 0, y: UIScreen.main.bounds.width / 2))
    if assetInfo.orientation == .down {
      let fixUpsideDown = CGAffineTransform(rotationAngle: CGFloat(Double.pi))
      let windowBounds = UIScreen.main.bounds
      let yFix = assetTrack.naturalSize.height + windowBounds.height
      let centerFix = CGAffineTransform(translationX: assetTrack.naturalSize.width, y: yFix)
      concat = fixUpsideDown.concatenating(centerFix).concatenating(scaleFactor)
    }
    instruction.setTransform(concat, at: kCMTimeZero)
  }
  
  return instruction
}
```
Tiếp thep bạn sẽ thêm vào method merge (: ) và chèn phần sau giữa các phần
```
// 2.1
let mainInstruction = AVMutableVideoCompositionInstruction()
mainInstruction.timeRange = CMTimeRangeMake(kCMTimeZero, 
                                            CMTimeAdd(firstAsset.duration, secondAsset.duration))

// 2.2
let firstInstruction = VideoHelper.videoCompositionInstruction(firstTrack, asset: firstAsset)
firstInstruction.setOpacity(0.0, at: firstAsset.duration)
let secondInstruction = VideoHelper.videoCompositionInstruction(secondTrack, asset: secondAsset)

// 2.3
mainInstruction.layerInstructions = [firstInstruction, secondInstruction]
let mainComposition = AVMutableVideoComposition()
mainComposition.instructions = [mainInstruction]
mainComposition.frameDuration = CMTimeMake(1, 30)
mainComposition.renderSize = CGSize(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
```
Bây giờ bạn đã có một đối tượng AVMutableVideoComposition được định cấu hình, tất cả những gì bạn cần làm là gán nó cho exporter của bạn. Chèn đoạn mã sau vào cuối phần # 5 (ngay trước khi exportAsynchronously () :
```
exporter.videoComposition = mainComposition
```
Wow !!!
Build và run project. Nếu bạn tạo một video mới bằng cách kết hợp hai video (và tùy chọn một tệp âm thanh), bạn sẽ thấy rằng các vấn đề định hướng biến mất khi bạn phát lại video sau khi đã merged
![](https://images.viblo.asia/72b8fe3f-e3ad-4207-b4c0-6d5f7402242d.png)

### Thank you !