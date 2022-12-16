# Giới thiệu
Việc sử dụng video trong các ứng dụng mobile là hết sức phổ biến ngày nay.
Lưu trữ cache nội dung video là một phương án hữu ích, bên cạnh việc mang lại trải nghiệm tốt cho người dùng, nó còn tối ưu việc sử dụng lưu lượng mạng khi ứng dụng tải đi tải lại cùng một nội dung video.
Trong bài viết này, ta sẽ giới thiệu một số kỹ thuật để cache nội dung video sử dụng thư viện AVFoundation

# Sử dụng AVAssetExportSession
**AVAssetExportSession** cho phép ta download và lưu trữ video trên ổ đĩa.
Từng bước thực hiện sẽ như đoạn code dưới đây:
```
private func exportVideo(forAsset asset: AVURLAsset) {
        if !asset.isExportable { return }
        //1
        let composition = AVMutableComposition()

        //2
        if let compositionVideoTrack = composition.addMutableTrack(withMediaType: AVMediaType.video, preferredTrackID: CMPersistentTrackID(kCMPersistentTrackID_Invalid)),
           let sourceVideoTrack = asset.tracks(withMediaType: .video).first {
            do {
                try compositionVideoTrack.insertTimeRange(CMTimeRangeMake(start: CMTime.zero, duration: asset.duration), of: sourceVideoTrack, at: CMTime.zero)
            } catch {
                print("Failed to compose video file")
                return
            }
        }
        //3
        if let compositionAudioTrack = composition.addMutableTrack(withMediaType: AVMediaType.audio, preferredTrackID: CMPersistentTrackID(kCMPersistentTrackID_Invalid)),
           let sourceAudioTrack = asset.tracks(withMediaType: .audio).first {
            do {
                try compositionAudioTrack.insertTimeRange(CMTimeRangeMake(start: CMTime.zero, duration: asset.duration), of: sourceAudioTrack, at: CMTime.zero)
            } catch {
                print("Failed to compose audio file")
                return
            }
        }
        
        //4
        guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetMediumQuality) else {
            print("Failed to create export session")
            return
        }
        
        //5
        let fileName = asset.url.lastPathComponent
        let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).last!
        let dirPath = documentsDirectory.appendingPathComponent("Video")
        let outputURL = dirPath.appendingPathComponent(fileName)
        print("File path: \(outputURL)")
        
        exporter.outputURL = outputURL
        exporter.outputFileType = AVFileType.mp4
        
        //6
        exporter.exportAsynchronously {
```
- Bước 1: Tạo đối tượng **AVMutableComposition** để lưu trữ audio và video
- Bước 2: Lưu trữ nội dung video
- Bước 3: Lưu trữ nội dung audio
- Bước 4: Tạo đối tượng **AVAssetExportSession** với thông tin và chất lượng lưu trữ
- Bước 5: Khởi tạo đường dẫn và thư mục lưu trữ
- Bước 6: Gọi hàm **exportAsynchronously** để hoàn tất việc lưu nội dung.

Phương pháp này hết sức đơn giản và hiệu quả đối với video nhỏ, và không nên áp dụng cho việc tải và chơi các video dung lượng lớn.

# Sử dụng AVAssetResourceLoadingRequests
Ta nên sử dụng kỹ thuật này đối với việc tải và chạy các video có dung lượng lớn.
```
import Foundation
import AVFoundation

class VideoResourceLoaderDelegate: NSObject, AVAssetResourceLoaderDelegate, URLSessionDataDelegate, URLSessionTaskDelegate {

    typealias Completion = (URL?) -> Void
    private static let SchemeSuffix = "-varun"
    
    // MARK: - Properties
    // MARK: Public
    
    var completion: Completion?
  
    //1
    lazy var streamingAssetURL: URL? = {
        guard var components = URLComponents(url: self.url, resolvingAgainstBaseURL: false) else {
            return nil
        }
        components.scheme = (components.scheme ?? "") + VideoResourceLoaderDelegate.SchemeSuffix
        guard let retURL = components.url else {
            return nil
        }
        return retURL
    }()
    
    // MARK: Private
    
    private let url: URL
    private var infoResponse: URLResponse?
    private var urlSession: URLSession?
    private lazy var mediaData = Data()
    private var loadingRequests = [AVAssetResourceLoadingRequest]()
      
    //2
    init(withURL url: URL) {
        self.url = url
        super.init()
    }
     
    //3
    func invalidate() {
        self.loadingRequests.forEach { $0.finishLoading() }
        self.invalidateURLSession()
    }
    
    // MARK: - AVAssetResourceLoaderDelegate
    //4
    func resourceLoader(_ resourceLoader: AVAssetResourceLoader, shouldWaitForLoadingOfRequestedResource loadingRequest: AVAssetResourceLoadingRequest) -> Bool {
        if self.urlSession == nil {
            let session = self.createURLSession()
            self.urlSession = session
            let task = session.dataTask(with: self.url)
            task.resume()
        }
        self.loadingRequests.append(loadingRequest)
        return true
    }
    
    func resourceLoader(_ resourceLoader: AVAssetResourceLoader, didCancel loadingRequest: AVAssetResourceLoadingRequest) {
        if let index = self.loadingRequests.firstIndex(of: loadingRequest) {
            self.loadingRequests.remove(at: index)
        }
    }
    
    // MARK: - URLSessionTaskDelegate
    
  //4
    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        if let error = error {
            print("Failed to download media file with error: \(error)")
            taskCompleted(for: nil)
        } else {
            saveMediaDataToLocalFile()
        }
    }
    
    // MARK: - URLSessionDataDelegate
    
    //5
    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive response: URLResponse, completionHandler: @escaping (URLSession.ResponseDisposition) -> Void) {
        self.infoResponse = response
        self.processRequests()
        // allow to continue loading
        completionHandler(.allow)
    }
    
    //6
    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        self.mediaData.append(data)
        self.processRequests()
    }
     
    //7
    private func createURLSession() -> URLSession {
        let config = URLSessionConfiguration.default
        let operationQueue = OperationQueue()
        operationQueue.maxConcurrentOperationCount = 1
        return URLSession(configuration: config, delegate: self, delegateQueue: operationQueue)
    }
    
    //8
    private func invalidateURLSession() {
        self.urlSession?.invalidateAndCancel()
        self.urlSession = nil
    }
    
    //9
    private func isInfo(request: AVAssetResourceLoadingRequest) -> Bool {
        return request.contentInformationRequest != nil
    }

    //10
    private func fillInfoRequest(request: inout AVAssetResourceLoadingRequest, response: URLResponse) {
        request.contentInformationRequest?.isByteRangeAccessSupported = true
        request.contentInformationRequest?.contentType = response.mimeType
        request.contentInformationRequest?.contentLength = response.expectedContentLength
    }
    
    //11
    private func processRequests() {
        var finishedRequests = Set<AVAssetResourceLoadingRequest>()
        self.loadingRequests.forEach {
            var request = $0
            if self.isInfo(request: request), let response = self.infoResponse {
                self.fillInfoRequest(request: &request, response: response)
            }
            if let dataRequest = request.dataRequest, self.checkAndRespond(forRequest: dataRequest) {
                finishedRequests.insert(request)
                request.finishLoading()
            }
        }
        
        self.loadingRequests = self.loadingRequests.filter { !finishedRequests.contains($0) }
    }
    
    //12
    private func checkAndRespond(forRequest dataRequest: AVAssetResourceLoadingDataRequest) -> Bool {
        let downloadedData = self.mediaData
        let downloadedDataLength = Int64(downloadedData.count)
        
        let requestRequestedOffset = dataRequest.requestedOffset
        let requestRequestedLength = Int64(dataRequest.requestedLength)
        let requestCurrentOffset = dataRequest.currentOffset
        
        if downloadedDataLength < requestCurrentOffset {
            return false
        }
        
        let downloadedUnreadDataLength = downloadedDataLength - requestCurrentOffset
        let requestUnreadDataLength = requestRequestedOffset + requestRequestedLength - requestCurrentOffset
        let respondDataLength = min(requestUnreadDataLength, downloadedUnreadDataLength)

        dataRequest.respond(with: downloadedData.subdata(in: Range(NSMakeRange(Int(requestCurrentOffset), Int(respondDataLength)))!))
        
        let requestEndOffset = requestRequestedOffset + requestRequestedLength
        
        return requestCurrentOffset >= requestEndOffset
    }
    
    //13
    private func taskCompleted(for url: URL?) {
        if let fileUrl = url {
            self.completion?(fileUrl)
        } else {
            self.completion?(nil)
        }
```
Ý nghĩa của từng đoạn code như sau:
- Đoạn 1: Truyền thông tin URL của video cần tải, và xử lý khi **AVAssetResourceLoaderDelagate** được gọi
- Đoạn 2: Khởi tạo các delegate của đối tượng **AVUrlAsset**
- Đoạn 3: Kiểm tra và xử lý các request lỗi, hoặc các tác vụ **URLSession** không hoàn thành.
- Đoạn 4: Thực thi các delegate khi request được gửi thông qua **URLSession**
- Đoạn 5: Thực thi các delegate của **URLSession**
- Đoạn 6: Lưu trữ các dữ liệu video được nhận được tạm thời trong bộ nhớ
- Đoạn 7: Hàm chức năng để tạo **URLSession**
- Đoạn 8: Hàm xử lý khi dừng một **URLSession**
- Đoạn 9: Hàm xử lý khi nhận được thông tin **AVAssetResourceLoadingRequest** 
- Đoạn 10: Nhập thông tin cần thiết để gửi yêu cầu tới server
- Đoạn 11: Xử lý các delegate của **AVAssetResourceLoadingRequests **
- Đoạn 12: Xử lý các dữ liệu tải về và offset của nó
- Đoạn 13: Xử lý khi một task vụ URLSession hoàn thành.
- Đoạn 14: Lưu trữ dữ liệu tải về trên ổ cứng.

Và để gọi các hàm xử lý trên, ta sẽ sử dụng đoạn code dưới đây
```
private func downloadVideoFromUrl(completion: @escaping (_ isDone: Bool) -> Void) {
        self.loaderDelegate = VideoResourceLoaderDelegate(withURL: videoUrl)
        if let loaderDelegate = self.loaderDelegate, let assetUrl = loaderDelegate.streamingAssetURL {
            let videoAsset = AVURLAsset(url: assetUrl)
            // Not creating seperate queue here, global queue would work
            videoAsset.resourceLoader.setDelegate(loaderDelegate, queue: DispatchQueue.global())
            loaderDelegate.completion = { localFileURL in
                if let localFileURL = localFileURL {
                    print("Video file saved to: \(localFileURL)")    
                } else {
                    print("Failed to download video file")    
                }
                completion(true)
            }
            let playerItem = AVPlayerItem(asset: videoAsset)
            // This AVPlayer object is to tirgger AVAssetResourceLoaderDelegate. We are not using this player object anywhere else
            let player = AVPlayer(playerItem: playerItem)
            player.isMuted = true
        } else {
            completion(true)
        }
    }
```

# Nguồn tham khảo
- https://medium.com/flawless-app-stories/video-download-disk-cache-in-ios-swift-49c87910faa2