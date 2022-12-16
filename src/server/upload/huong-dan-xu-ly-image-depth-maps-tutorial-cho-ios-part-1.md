Nguồn: https://www.raywenderlich.com/8246240-image-depth-maps-tutorial-for-ios-getting-started

Hãy thành thật. Chúng ta, loài người, thậm chí sẽ tạo ra những robot có thể chiếm cả thế giới, đúng không? Một thứ sẽ cực kỳ quan trọng với tương lai robot master của chúng ta đó là sự hiểu biết sâu rộng. Không có nó, chúng ta làm sao có thể phân biệt được thực sự đó là một con người bị cầm tù, hay chỉ là tấm bìa được cắt ra của con người? Một cách để nhận biết điều đó là sử dụng depth maps.

Trước khi robot có thể sử dụng depth maps, tuy nhiên, chúng ta sẽ phải lập trình để hiểu chúng. Đó là nơi bạn sẽ đến! Trong bài hướng dẫn này, bạn sẽ hoc về các API mà Apple cung cấp cho image depth maps. Thông qua bài hướng dẫn này, bạn sẽ:

* Học cách làm thế nào iPhone tạo ra các thông tin depth.
* Đọc dữ liệu depth từ image.
* Kết hợp dữ liệu depth này với filter để tạo các hiệu ứng khéo léo.

Vậy còn đợi gì nữa? 

# Getting Started/Bắt đầu
Download project đã được chuẩn bị trước ở link nguồn.

Trước khi bạn bắt đầu, bạn sẽ cần chạy trên Xcode 11 hoặc mới hơn. Khuyến khích chạy trực tiếp trên thiết bị thật. Để làm được vậy bạn sẽ cần iPhone chạy iOS 13 hoặc mới hơn.

Khi mọi thứ đã xong, bạn có thể khám phá các tài liệu cần cho bài hướng dẫn này. Một tập hợp các ảnh bao gồm thông tin depth để sử dụng trong bài hướng dẫn.

Nếu bạn muốn, và có một iPhone có 2 camera đổ lên, bạn có thể tự chụp ảnh để sử dụng trong bài hướng dẫn này. Cần sử dụng iPhone từ iOS 11 trở lên, và nhớ sử dụng tính năng chụp chân dung (Portrait) trong app Camera.

Build và chạy thử, bạn sẽ thấy như sau:

![](https://images.viblo.asia/320cce3a-6fa5-4111-b268-91b062641efb.png)

Tap vào một loại ảnh khác để đi đến cái tiếp theo, nếu bạn add ảnh của riêng bạn, hãy chắc chắn nó có định dạng .jpg.

Trong bài hướng dẫn này, bạn sẽ làm các chức năng cho các mụ Depth, Mask và Filterred, cái mà bạn có thể nhìn thấy ở phần dưới của màn hình. Hãy tap thoải mái vào chúng, hiện tại các mục này chưa có chức năng. 

# Reading Depth Data/Đọc depth data
Class quan trọng nhất, trong iOS SDK, cho depth data là is `AVDepthData`.

Các định dạng ảnh khác nhau sẽ lưu depth data khác nhau một chút. Với ảnh ở định dạng HEIC, nó lưu trữ như metadata, nhưng với JPG sẽ lưu trữ như một bức ảnh thứ hai bên trong JPG.

Bạn sẽ sử dụng `AVDepthData` để export các data phụ trợ này từ image, đó là bước đầu tiên bạn sẽ làm trong bài hướng dẫn này. Mở **SampleImage.swift** và thêm method sau vào dưới cùng của SampleImage:
```
static func depthDataMap(forItemAt url: URL) -> CVPixelBuffer? {
  // 1
  guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else {
    return nil
  }

  // 2
  let cfAuxDataInfo = CGImageSourceCopyAuxiliaryDataInfoAtIndex(
    source,
    0,
    kCGImageAuxiliaryDataTypeDisparity
  )
  guard let auxDataInfo = cfAuxDataInfo as? [AnyHashable : Any] else {
    return nil
  }

  // 3
  let cfProperties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil)
  guard 
    let properties = cfProperties as? [CFString: Any],
    let orientationValue = properties[kCGImagePropertyOrientation] as? UInt32,
    let orientation = CGImagePropertyOrientation(rawValue: orientationValue)
    else {
      return nil
  }

  // 4
  guard var depthData = try? AVDepthData(
    fromDictionaryRepresentation: auxDataInfo
  ) else {
    return nil
  }

  // 5
  if depthData.depthDataType != kCVPixelFormatType_DisparityFloat32 {
    depthData = depthData.converting(
      toDepthDataType: kCVPixelFormatType_DisparityFloat32
    )
  }

  // 7
  return depthData.applyingExifOrientation(orientation).depthDataMap
}
```
Khá là nhiều code đúng không, đây là những gì đoạn code trên sẽ làm:

1. Đầu tiên, bạn tạo một `CGImageSource`, cái đại diện cho file input.
2. Từ image nguồn ở index 0, bạn copy disparity data (data khác biệt) từ data phụ trợ của nó. Bạn sẽ học thêm về ý nghĩa của nó sau, nhưng bạn có thể nghĩ nó như là depth data từ bây giờ. Index là 0 bởi vì nó chỉ có 1 image trong image source hiện tại.
3. Hướng của image được lưu trữ như là một metadata riêng biệt, để căn chỉnh chính xác depth data, bạn hãy xuất thông tin hướng ảnh sử dụng `CGImageSourceCopyPropertiesAtIndex(_:_:_:)`. Giờ bạn có thể sử dụng nó về sau.
4. Bạn tạo một `AVDepthData` từ data phụ trợ mà bạn đã đọc.
5. Bạn chắc chắn rằng depth data ở định dạng bạn cần  — 32-bit floating point disparity information — và chuyển đổi nếu nó không cần.
6. Cuối cùng bạn apply đúng hướng và trả về depth data map.

Bạn đã lấy thành công depth data, giờ là lúc đem nó ra sử dụng!

# Implementing the Depth Data/Triển khai depth data
Giờ trước khi bạn chạy, bạn cần cập nhật `depthData(forItemAt:)`. Thay thế nó bằng đoạn sau:
```
// 1
guard let depthDataMap = depthDataMap(forItemAt: url) else { return nil }

// 2
depthDataMap.normalize()

// 3
let ciImage = CIImage(cvPixelBuffer: depthDataMap)
return UIImage(ciImage: ciImage)
```
Với đoạn code này:

1. Sử dụng `depthDataMap(forItemAt:)` mới, bạn đọc depth data vào `CVPixelBuffer`.
2. Sau đó bạn sẽ normalize (bình thường hoá) dữ liệu depth data sử dụng một hàm mở rộng được cung cấp cho `CVPixelBuffer`. Điều này sẽ chắc chắn tất các các pixel đều ở giữa 0.0 và 1.0, với 0.0 là điểm xa nhất và 1.0 là điểm gần nhất.
3. Sau đó bạn sẽ chuyển đổi depth data vào `CIImage` và sau đó là `UIImage` rồi return nó.
Build và chạy, tap vào mục Depth ở dưới cùng.

![](https://images.viblo.asia/12c01952-c3f1-472f-b8b3-c01cd818210f.png)　![](https://images.viblo.asia/2a79f979-9a76-4987-bf71-823068c623e4.png)

Tuyệt vời! Đây bản chất chính là đại diện của depth data. Pixel càng trắng thì càng gần, pixel càng tối thì càng xa. Việc chuẩn hoá mà bạn đã làm đảm bảo điều này. Những thứ khác thì sẽ ở đâu đó trong khoảng màu xám

# How Does the iPhone Do This?/iPhone đã làm vậy bằng cách nào?
Nói ngắn gọn, thì camera kép của iPhone đang bắt chiếc tầm nhìn lập thể.

Hãy thử nó. giữ ngón tay trỏ sát trước mũi và hướng lên trên. Nhắm mắt trái lại. Không di chuyển tay hay đầu, đồng thời mở mắt trái và nhắm mắt phải.

Giờ nhanh chóng chuyển lại, nhắm mắt đang mở và mở mắt đang nhắm. Hãy để ý đến vị trí tương đối của ngón tay với các thành phần ở nền. Bạn sẽ thấy ngón tay bạn dường như có một bước nhảy lớn từ trái sang phải khi so sánh với các đối tượng ở xa.

![](https://images.viblo.asia/9f211265-ef03-456c-8777-3dddc3f46dc6.png)

Một vật thể càng gần mắt bạn, sự thay đổi vị trí tương đối của nó so với nền càng lớn. Điều này nghe có vẻ quen thuộc phải không? Nó có hiệu ứng thị sai!

Camera kép của iPhone, giống như đôi mắt của nó vậy, nhìn vào hai hình ảnh được chụp ở độ lệch nhẹ so với nhau. Nó tương ứng với các tính năng trong hai hình ảnh và tính toán số lượng pixel chúng đã di chuyển. Sự thay đổi về pixel này được gọi là **Disparity** (chênh lệch).
![](https://images.viblo.asia/100b687b-80ab-4554-a023-91fb3af43d59.png)

# Depth vs Disparity
Cho đến nay, bạn phần lớn đã sử dụng thuật ngữ depth data, nhưng trong code bạn lại yêu cầu dữ liệu kCGImageAuxiliaryDataTypeDisparity. Gì vậy nhỉ?

Độ sâu Depth và chênh lệch Disparity về cơ bản là tỷ lệ nghịch.

![](https://images.viblo.asia/e79bcd47-2368-4c88-87f0-9b588686f2f7.png)

Một vật thể càng ở xa thì độ sâu của vật thể càng lớn. Sự chênh lệch là khoảng cách giữa các đối tượng tương đương trong hai hình ảnh. Theo công thức trên, khi khoảng cách này gần bằng 0, độ sâu tiến đến vô tận.

Nếu bạn có thử với dự án khởi động, bạn có thể nhận thấy một thanh trượt ở dưới cùng của màn hình có thể nhìn thấy khi chọn mục Mask và Filter.

Bạn sẽ sử dụng thanh trượt này, cùng với dữ liệu độ sâu, để tạo mặt nạ mask cho hình ảnh ở độ sâu nhất định. Sau đó, bạn sẽ sử dụng mặt nạ này để lọc ảnh gốc và tạo một số hiệu ứng gọn gàng!

**Hãy đón xem phần 2 nhé!**