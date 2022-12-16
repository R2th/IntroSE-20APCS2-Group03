## Giới thiệu
Đối với các ứng dụng mobile có chức năng hiển thị ảnh trên mạng, việc biết trước kích thước ảnh là hết sức quan trọng, nó sẽ giúp ta tính toán trước được vùng nội dung cần thiết để hiện thị ảnh, và căn chỉnh vị trí và kích thước của các thành phần nội dung khác trước khi ảnh được tải về, điều này sẽ giúp ứng dụng hoạt động với hiệu ứng nhanh và mượt mà hơn.

Việc tính trước kích thước ảnh sẽ được thông qua việc tải về nội dung meta data của file ảnh thay vì tải về  toàn bộ file ảnh trên mạng. 

Trong bài này viết, mình sẽ tập trung phân tích cấu trúc file, meta data của các định dạng file ảnh phổ biến như PNG, JPEG, GIF, và thực thi sử dụng Swift. Mọi người có thể mở rộng bằng cách sử dụng các ngôn ngữ khác như Java, C++.

## Cấu trúc các định dạng file ảnh.
### PNG
Đối với định dạng PNG, một file ảnh PNG được chia thành các block byte.
8 byte đầu (cố định) là phần chữ ký của file PNG
Phần còn lại sẽ là các chunk dữ liệu, mỗi chunk dữ liệu có cấu trúc như sau:
- 4 byte đầu: kích thước của chunk dữ liệu
- 4 byte tiếp theo: loại chunk
- Phần dữ liệu của chunk
- 4 byte tiếp theo: CRC của phần dữ liệu ở trên

Chunk data chứa thông tin kích thước ảnh nằm ngay sau 8 byte đầu (chữ ký) của file file PNG, và có cấu trúc như hình dưới:
![](https://images.viblo.asia/7e7ee867-dd5b-48c9-9cbc-690b33c08921.png)

Theo như cấu trúc trên, ta sẽ chỉ cần tải về 33 byte đầu tiên của file PNG để lấy được kích thước của file ảnh.

## GIF
GIF là một định dạng của ảnh bitmap. Phần đầu của file là chữ ký của file GIF có thể là GIF87a hoặc GIF89a (trong đó 7a, 9a là phiên bản của định dạng GIF), và phần chữ ký này là cố định đối với tất cả các file GIF.
Tiếp sau phần chữ ký GIF là khối Logical Screen Descriptor, khối này sẽ cung cấp thông tin về kích thước, và một số thuộc tính khác của ảnh.
![](https://images.viblo.asia/e98c9411-c06f-4892-8d15-1e9e93f08a20.png)

Như vậy ta chỉ cần load trước 10 byte là có thể lấy được kích thước ảnh của file GIF.

## JPEG
Đối với định dạng JPEG sẽ có 2 loại định dạng khác nhau của JPEG.
- **JPEG File Interchange Format** sẽ có phần chữ ký bắt đầu bằng **FF D8 FF E0**, đây là định dạng 
- **Exchangeable Image File Format** sẽ có phần chữ ký bắt đầu bằng **FF D8 FF E1**

Trong phạm vi bài viết này ta chỉ tập trung phân tích cấu trúc của định dạng **JPEG File Interchange Format**
- Một file JPEG thuộc dạng này sẽ gồm nhiều khối dữ liệu tuần tự, mỗi khối bắt đầu bằng **0xFF**, tiếp sau đó là phần dữ liệu.
- Kích thước của từng frame ảnh được lưu ở khối có tên là **SOF[n]**, và các khối dữ liệu này không được sắp xếp theo thứ tự nhất định, nên ta sẽ phải duyệt tuần tự tất cả các khối để tìm ra các khối sau: FFC0, FFC1, FFC2.
- Các khối dữ liệu này được tổ chức dạng Big endian, nên ta sẽ phải đảo lại thứ tự byte trước khi phân tích.
![](https://images.viblo.asia/b9aa922f-f9e8-4cc6-8df9-604f8c71aceb.png)

## Thực thi sử dụng Swift
Ta sẽ viết một chương trình bằng Swift để lấy kích thước file ảnh dựa trên cấu trúc đã phân tích ở trên.
Chương trình sẽ gồm 3 thành phần chính:
- ImageFetcher: Chuyển các request vào queue bằng cách truyền vào đường link ảnh và hàm call back khi phân tích xong.
- FetcherOperation: Quản lý tác vụ tải dữ liệu thông qua đối tượng **URLSessionTask**
- ImageParser: Phân tích thông tin ảnh gồm định dạng, cấu trúc file ảnh.

### ImageFetcher
Chức năng chính của class:
- Quản lý reuqest Queue
- Quản lý cache và URLSession

```
import UIKit

public class ImageSizeFetcher: NSObject, URLSessionDataDelegate {
	
	/// Callback type alias
	public typealias Callback = ((Error?, ImageSizeFetcherParser?) -> (Void))
	
	/// URL Session used to download data
	private var session: URLSession!
	
	/// Queue of active operations
	private var queue = OperationQueue()
	
	/// Built-in in memory cache
	private var cache = NSCache<NSURL,ImageSizeFetcherParser>()
	
	/// Request timeout
	public var timeout: TimeInterval
	
	/// Initialize a new fetcher with in memory cache.
	///
	/// - Parameters:
	///   - configuration: url session configuration
	///   - timeout: timeout for request, by default is 5 seconds.
	public init(configuration: URLSessionConfiguration = .ephemeral, timeout: TimeInterval = 5) {
		self.timeout = timeout
		super.init()
		self.session = URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
	}
	
	/// Request for image info at given url.
	///
	/// - Parameters:
	///   - url: url of the image you want to analyze.
	///   - force: true to skip cache and force download.
	///   - callback: completion callback called to give out the result.
	public func sizeFor(atURL url: URL, force: Bool = false, _ callback: @escaping Callback) {
		guard force == false, let entry = cache.object(forKey: (url as NSURL)) else {
			// we don't have a cached result or we want to force download
			let request = URLRequest(url: url, cachePolicy: .useProtocolCachePolicy, timeoutInterval: self.timeout)
			let op = ImageSizeFetcherOp(self.session.dataTask(with: request), callback: callback)
			queue.addOperation(op)
			return
		}
		// return result from cache
		callback(nil,entry)
	}
	
	//MARK: - Helper Methods
	
	private func operation(forTask task: URLSessionTask?) -> ImageSizeFetcherOp? {
		return (self.queue.operations as! [ImageSizeFetcherOp]).first(where: { $0.url == task?.currentRequest?.url })
	}
	
	//MARK: - URLSessionDataDelegate
	
	public func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
		operation(forTask: dataTask)?.onReceiveData(data)
	}
	
	public func urlSession(_ session: URLSession, task dataTask: URLSessionTask, didCompleteWithError error: Error?) {
		operation(forTask: dataTask)?.onEndWithError(error)
	}
	
}
```

### ImageFetcherOperation
Kế thức từ class **Operation**, với chức năng chính:
- Đối tượng để quản lý tác vụ tải dữ liệu ảnh
- Tải dữ liệu từ URLSession
- Phân tích cấu trúc thông qua đối tượng ImageParser

```
import UIKit

internal class ImageSizeFetcherOp: Operation {
	
	/// Callback to call at the end of the operation
	let callback: ImageSizeFetcher.Callback?
	
	/// Request data task
	let request: URLSessionDataTask
	
	/// Partial data
	private(set) var receivedData = Data()
	
	/// URL of the operation
	var url: URL? {
		return self.request.currentRequest?.url
	}
	
	/// Initialize a new operation for a given url.
	///
	/// - Parameters:
	///   - request: request to perform.
	///   - callback: callback to call at the end of the operation.
	init(_ request: URLSessionDataTask, callback: ImageSizeFetcher.Callback?) {
		self.request = request
		self.callback = callback
	}
	
	///MARK: - Operation Override Methods
	
	override func start() {
		guard !self.isCancelled else { return }
		self.request.resume()
	}
	
	override func cancel() {
		self.request.cancel()
		super.cancel()
	}
	
	//MARK: - Internal Helper Methods
	
	func onReceiveData(_ data: Data) {
		guard !self.isCancelled else { return }
		self.receivedData.append(data)
		
		// not enough data collected for anything
		guard data.count >= 2 else { return }
		
		// attempt to parse received data, if enough we can stop download
		do {
			if let result = try ImageSizeFetcherParser(sourceURL: self.url!, data) {
				self.callback?(nil,result)
				self.cancel()
			}
			// nothing received, continue accumulating data
		} catch let err { // parse has failed
			self.callback?(err,nil)
			self.cancel()
		}
	}
	
	func onEndWithError(_ error: Error?) {
		// download has failed, return to callback with the description of the error
		self.callback?(ImageParserErrors.network(error),nil)
		self.cancel()
	}
	
}
```

## ImageParser
Lớp đối tượng để phân tích thông tin ảnh, dựa trên cấu trúc đã phân tích ở mục trên.
- ImageParser sẽ đọc chữ ký của file ảnh để lấy định dạng của file
```
/// Attempt to recognize a known signature from collected partial data.
///
/// - Parameter data: partial data from server.
/// - Throws: throw an exception if file is not supported.
internal init(fromData data: Data) throws {
    // Evaluate the format of the image
    var length = UInt16(0)
    (data as NSData).getBytes(&length, range: NSRange(location: 0, length: 2))
    switch CFSwapInt16(length) {
    case 0xFFD8:	self = .jpeg
    case 0x8950:	self = .png
    case 0x4749:	self = .gif
    case 0x424D: 	self = .bmp
    default:		throw ImageParserErrors.unsupportedFormat
    }
}
```

- Dựa vào định dạng ảnh ở bước trên để xác định kích thước dữ liệu tối thiểu cần đọc (trừ ảnh JPEG)
```
/// Attempt to recognize a known signature from collected partial data.
///
/// - Parameter data: partial data from server.
/// - Throws: throw an exception if file is not supported.
internal init(fromData data: Data) throws {
    // Evaluate the format of the image
    var length = UInt16(0)
    (data as NSData).getBytes(&length, range: NSRange(location: 0, length: 2))
    switch CFSwapInt16(length) {
    case 0xFFD8:	self = .jpeg
    case 0x8950:	self = .png
    case 0x4749:	self = .gif
    case 0x424D: 	self = .bmp
    default:		throw ImageParserErrors.unsupportedFormat
    }
}
```

- Phân tích dữ liệu đã tải về để lấy kích thước ảnh
```
/// Parse collected data from a specified file format and attempt to get the size of the image frame.
///
/// - Parameters:
///   - format: format of the data.
///   - data: collected data.
/// - Returns: size of the image, `nil` if cannot be evaluated with collected data.
/// - Throws: throw an exception if parser fail or data is corrupted.
private static func imageSize(format: Format, data: Data) throws -> CGSize? {
    if let minLen = format.minimumSample, data.count <= minLen {
        return nil // not enough data collected to evaluate png size
    }

    switch format {
    case .bmp:
        var length: UInt16 = 0
        (data as NSData).getBytes(&length, range: NSRange(location: 14, length: 4))

        var w: UInt32 = 0; var h: UInt32 = 0;
        (data as NSData).getBytes(&w, range: (length == 12 ? NSMakeRange(18, 4) : NSMakeRange(18, 2)))
        (data as NSData).getBytes(&h, range: (length == 12 ? NSMakeRange(18, 4) : NSMakeRange(18, 2)))

        return CGSize(width: Int(w), height: Int(h))

    case .png:
        var w: UInt32 = 0; var h: UInt32 = 0;
        (data as NSData).getBytes(&w, range: NSRange(location: 16, length: 4))
        (data as NSData).getBytes(&h, range: NSRange(location: 20, length: 4))

        return CGSize(width: Int(CFSwapInt32(w)), height: Int(CFSwapInt32(h)))

    case .gif:
        var w: UInt16 = 0; var h: UInt16 = 0
        (data as NSData).getBytes(&w, range: NSRange(location: 6, length: 2))
        (data as NSData).getBytes(&h, range: NSRange(location: 8, length: 2))

        return CGSize(width: Int(w), height: Int(h))

    case .jpeg:
        var i: Int = 0
        // check for valid JPEG image
        // http://www.fastgraph.com/help/jpeg_header_format.html
        guard data[i] == 0xFF && data[i+1] == 0xD8 && data[i+2] == 0xFF && data[i+3] == 0xE0 else {
            throw ImageParserErrors.unsupportedFormat // Not a valid SOI header
        }
        i += 4

        // Check for valid JPEG header (null terminated JFIF)
        guard data[i+2].char == "J" &&
            data[i+3].char == "F" &&
            data[i+4].char == "I" &&
            data[i+5].char == "F" &&
            data[i+6] == 0x00 else {
                throw ImageParserErrors.unsupportedFormat // Not a valid JFIF string
        }

        // Retrieve the block length of the first block since the
        // first block will not contain the size of file
        var block_length: UInt16 = UInt16(data[i]) * 256 + UInt16(data[i+1])
        repeat {
            i += Int(block_length) //I ncrease the file index to get to the next block
            if i >= data.count { // Check to protect against segmentation faults
                return nil
            }
            if data[i] != 0xFF { //Check that we are truly at the start of another block
                return nil
            }
            if data[i+1] >= 0xC0 && data[i+1] <= 0xC3 { // if marker type is SOF0, SOF1, SOF2
                // "Start of frame" marker which contains the file size
                var w: UInt16 = 0; var h: UInt16 = 0;
                (data as NSData).getBytes(&h, range: NSMakeRange(i + 5, 2))
                (data as NSData).getBytes(&w, range: NSMakeRange(i + 7, 2))

                let size = CGSize(width: Int(CFSwapInt16(w)), height: Int(CFSwapInt16(h)) );
                return size
            } else {
                // Skip the block marker
                i+=2;
                block_length = UInt16(data[i]) * 256 + UInt16(data[i+1]);   // Go to the next block
            }
        } while (i < data.count)
        return nil
    }
}
```
## Kết luận
Thông qua các bước đơn giản trình bày ở trên, ta có thể lấy kích thước file ảnh, và tối ưu hơn trong việc hiển thị ảnh mạng.
Ta hoàn toàn có thể áp dụng phương pháp này cho các ngôn ngữ lập trình khác.

## Chương trình demo và nguồn tham khảo
- Chương trình demo có thể tải tại:https://github.com/oLeThiVanAnh/R9_2018
- Nguồn tham khảo: https://medium.com/ios-os-x-development/prefetching-images-size-without-downloading-them-entirely-in-swift-5c2f8a6f82e9