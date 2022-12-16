Nguồn: https://www.raywenderlich.com/8246240-image-depth-maps-tutorial-for-ios-getting-started
Part 1: https://viblo.asia/p/huong-dan-xu-ly-image-depth-maps-tutorial-cho-ios-part-1-V3m5WvDxlO7
Tiếp theo phần trước

# Creating a Mask/Tạo Mask
Mở **DepthImageFilters.swift** và tìm `createMask(for:withFocus:)`. Thêm đoạn code sau vào phần đầu của hàm:
```
let s1 = MaskParams.slope
let s2 = -MaskParams.slope
let filterWidth =  2 / MaskParams.slope + MaskParams.width
let b1 = -s1 * (focus - filterWidth / 2)
let b2 = -s2 * (focus + filterWidth / 2)
```
Những hằng số này sẽ định nghĩa cách bạn chuyển đổi depth data thành một image mask.

Cách nghĩ về depth data map thì như dưới đây:
![](https://images.viblo.asia/58985145-7883-4ed8-a241-5d85a91a1979.png)
Giá trị pixel của depth map image của bạn sẽ bằng với chênh lệch disparity thông thường. Nhớ rằng, một giá trị pixel của 1.0 là màu trắng, và giá trị một chênh lệch disparity của 1.0 thì gần với camera nhất. Trong mặt khác của scale, một giá trị pixel của 0.0 là màu đen, và giá trị một chênh lệch disparity của 0.0 thì xa camera nhất.

Để tạo một mặt nạ mask từ depth data, bạn sẽ thay đổi hàm này thành một thứ thú vị hơn nhiều. Về cơ bản nó sẽ chọn ra một độ sâu nhất định. Để giả lập điều đó, xem xét phiên bản tương tự của giá trị pixel sang chênh lệch disparity:
![](https://images.viblo.asia/005bceb1-a906-4fd4-a45b-91808e8b30d0.png)
Nó đang thể hiện một đầu mối của chênh lệch 0.75 disparity, với một điểm cao ở 0.1 và dốc xuống 4.0 ở phía còn lại. `createMask(for:withFocus:)`sẽ sử dụng một chút toán học để tạo ra hàm này.

Nó có nghĩa là pixel trắng nhất (giá trị 1.0) sẽ là điểm đó với chênh lệch disparity là 0.75 ± 0.05 (tiêu điểm ± chiều rộng / 2). Điểm pixcelsau đó sẽ nhanh chóng mờ thành màu đen cho giá trị chênh lệch bên trên và dưới khoảng này. Dốc càng lớn thì nó càng nhanh chóng mờ thành màu đen.

Bản sẽ đặt mặt nạ mask thành hai phần - phần bên trái  và bên phải. Bạn sau đó sẽ phối hợp chúng.

# Setting up the Left Side of the Mask/Cài đặt phần bên trái của Mask
Sau đoạn hằng số bạn thêm ở trên, thêm đoạn dưới đây:
```
let depthImage = image.depthData.ciImage!
let mask0 = depthImage
  .applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: s1, y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: s1, z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: s1, w: 0),
    "inputBiasVector": CIVector(x: b1, y: b1, z: b1, w: 0)])
  .applyingFilter("CIColorClamp")
```
Đoạn trên sẽ lọc cùng lúc tất cả các pixel bằng độ dốc `s1`. Vì mask là màu xám, bạn sẽ cần phải chắc chắn rằng tất cả các kênh màu đều có giá trị tương tự. Sau khi sử dụng `CIColorClamp`để kẹp các giá trị giữa 0.0 và 1.0, bộ filter này sẽ áp dụng hàm dưới đây:
![](https://images.viblo.asia/d0d92da0-3dc1-4162-85a4-e16aa8d5f7cd.png)
Giá trị `s1`lớn hơn thì độ dốc của đường lại càng dốc. Hằng số `b1`sẽ di chuyển dòng bên trái hoặc phải.

# Setting up the Right Side of the Mask/Cài đặt phần bên phải của Mask
Để làm phần còn lại của mask, thêm đoạn sau:
```
let mask1 = depthImage
  .applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: s2, y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: s2, z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: s2, w: 0),
    "inputBiasVector": CIVector(x: b2, y: b2, z: b2, w: 0)])
  .applyingFilter("CIColorClamp")
```
Kể từ khi `s2` âm, filter sẽ áp dụng hàm sau:
![](https://images.viblo.asia/11b4665c-c22e-463b-9cb8-01bc6fee3ec1.png)

# Combining the Two Masks/Kết hợp 2 Mask
Giờ để hai mask cùng nhau. Thêm đoạn code sau:
```
let combinedMask = mask0.applyingFilter("CIDarkenBlendMode", parameters: [
  "inputBackgroundImage": mask1
])
let mask = combinedMask.applyingFilter("CIBicubicScaleTransform", parameters: [
  "inputScale": image.depthDataScale
])
```
Bạn kết hợp mask bằng cách sử dụng filter `CIDarkenBlendMode`, cái sẽ chọn cái thấp hơn của hai giá trị input của mask.

Sau đó bạn scale mask đẻ khớp kích thước của image, vì data map sẽ có độ phân giải thấp hơn.

Cuối cùng,  thay thế dòng return bằng:
```
return mask
```
Build và run. Chọn phần Mask và thử với thanh slider.

Bạn sẽ thấy như bên dưới:
![](https://images.viblo.asia/5b664627-4362-4bc6-ad7e-e0badd69cfae.gif)
Khi bạn di chuyển thanh slide từ trái sang phải, mask sẽ nhặt ra cách pixel từ xa đến gần. Vậy khi thanh slide ở ngoài cùng bên trái, những pixel màu trắng sẽ là những pixel ở xa. Và khi thanh slide ở ngoài cùng bên phải, những pixel trắng sẽ là những cái ở gần nhất.

# Your First Depth-Inspired Filter/Bộ lọc Depth-Inspired đầu tiên của bạn
Tiếp theo, bạn sẽ tạo filter bắt chước một đốm sáng. Đốm sáng ấy sẽ chiếu sáng một đối tượng ở độ sâu depth được chọn và đổi thành màu đen.

Bởi vì bạn đã từng làm việc rất chăm chỉ với việc đọc depth data và tạo mask, nên bây giờ sẽ rất đơn giản.

Trở lại với **DepthImageFilters.swift** và thêm đoạn code dưới đây vào cuối của class DepthImageFilters:
```
func createSpotlightImage(
  for image: SampleImage,
  withFocus focus: CGFloat
) -> UIImage? {
  // 1
  let mask = createMask(for: image, withFocus: focus)

  // 2
  let output = image.filterImage.applyingFilter("CIBlendWithMask", parameters: [
    "inputMaskImage": mask
  ])

  // 3
  guard let cgImage = context.createCGImage(output, from: output.extent) else {
    return nil
  }

  // 4
  return UIImage(cgImage: cgImage)
}
```
Đây là những gì bạn đã làm:

1. Thấy depth mask mà bạn đã triển khai bên trong `createMask(for:withFilter:)`.
2. Sử dụng `CIBlendWithMask`và đưa vào mask bạn đã tạo ở những dòng trước. Bộ filter bản chất là sẽ đặt giá trị alpha của pixel thành giá trị tương ứng vủa mask pixel. Vì thế khi giá trị mask pixel là 1.0, thì pixel của image sẽ hoàn toàn mờ đục và khi giá trị mask pixel là 0.0 thì pixel của image sẽ hoàn toàn trong suốt. Kể từ khi `UIView` phía sau `UIImageView` có một màu đen, màu đen sẽ màu thứ bạn sẽ thấy phía sau bức ảnh.
3. Bạn tạo một `CGImage` sử dụng `CIContext`.
4. Bạn sau đó sẽ tạo một `UIImage` và trả về nó.

Để nhìn thấy bộ filter này hoạt động, bạn trước hết cần nói với `DepthImageViewController`để gọi method này khi phù hợp.

Mở **DepthImageViewController.swift** và đi đến hàm `createImage(for:mode:filter:)`.
Tìm kiếm swithc case mà có `.filtered` và `.spotlight` và thay thế đoạn return thành dưới đây:
```
return depthFilters.createSpotlightImage(for: image, withFocus: focus)
```
Build và run. Chọn phần Filtered và chắc chắn là bạn chọn Spotloight ở trên. Hãy thử nghiệm với thanh slider. Bạn sẽ thấy như sau:
![](https://images.viblo.asia/048c8cf8-63f6-41f7-94bc-14fbbd5966d1.gif)
Chúc mừng! Bạn đã viết xong filter depth-inspired đầu tiên của mình.

Nhưng bạn mới chỉ khởi động thôi. Bạn muốn viết thêm nhiều các khác nữa đúng không?

# Color Highlight Filter
Trở lại với **DepthImageFilters.swift** và thêm method mới:
```
func createColorHighlight(
  for image: SampleImage,
  withFocus focus: CGFloat
) -> UIImage? {
  let mask = createMask(for: image, withFocus: focus)
  let grayscale = image.filterImage.applyingFilter("CIPhotoEffectMono")
  let output = image.filterImage.applyingFilter("CIBlendWithMask", parameters: [
    "inputBackgroundImage" : grayscale,
    "inputMaskImage": mask
  ])

  guard let cgImage = context.createCGImage(output, from: output.extent) else {
    return nil
  }

  return UIImage(cgImage: cgImage)
}
```
Bạn sẽ thấy quen. Nó gần giống với `createSpotlightImage(for:withFocus:)`mà bạn vừa viết. Cái khác ở lần này, bạn sẽ đặt màu nền của ảnh là màu xám của ảnh gốc.

Bộ filter này sẽ hiển thị tất cả các màu ở tiêu điểm dựa trên vị trí của thanh slider, và chuyển thành màu xám.

Mở **DepthImageViewController.swift** và trong đoạn switch tương tự, thay thế đoạn code cho ` (.filtered, .color)` thành dưới đây:
```
return depthFilters.createColorHighlight(for: image, withFocus: focus)
```
Nó sẽ gọi hàm filter mới của bạn và hiển thị kết quả.

Build và run để thấy điều đặc biệt:
![](https://images.viblo.asia/beeee13c-ea5e-4402-a293-ff39c04487e5.gif)
Bạn có ghét việc khi bạn chụp bực ảnh và sau đó nhận ra camera focus vào sai đối tượng? Sẽ ra sao nếu bạn có thể thay đổi focus sau đó?

Nó chính là thứ mà bộ filter depth-inspired bạn sẽ viết tiếp theo đây làm!

# Change the Focal Length/Thay đổi độ dài tiêu điểm
Ở dưới `createColorHighlight(for:withFocus:)`trong **DepthImageFilters.swift**, thêm hàm:
```
func createFocalBlur(
  for image: SampleImage,
  withFocus focus: CGFloat
) -> UIImage? {
  // 1
  let mask = createMask(for: image, withFocus: focus)

  // 2
  let invertedMask = mask.applyingFilter("CIColorInvert")

  // 3
  let output = image.filterImage.applyingFilter(
    "CIMaskedVariableBlur", 
    parameters: [
      "inputMask" : invertedMask,
      "inputRadius": 15.0
    ])

  // 4
  guard let cgImage = context.createCGImage(output, from: output.extent) else {
    return nil
  }

  // 5
  return UIImage(cgImage: cgImage)
}
```
Bộ lọc filter này sẽ khác với hai phần trước một chút.

1. Đầu tiên, bạn sẽ lấy mask mà bạn đã khởi tạo trước đó.
2. Bạn sau đó sẽ sử dụng `CIColorInvert`để đảo ngược mask.
3. Sau đó bạn áp dụng `CIMaskedVariableBlur`, một bộ lọc mới của iOS 11.Nó sẽ làm mờ bằng cách sử dụng một bán kính bằng với `inputRadius` bởi giá trị mask pixel. Khi giá trị mask pixel là 1.0, độ mờ sẽ ở giá trị lớn nhất, đó là vì sao bạn cần đảo ngược mask trước.
4. Lại một lần nữa, bạn tại một `CGImage` sử dụng `CIContext`
5. Bạn sử dụng `CGImage`đó để tạo một `UIImage` và trả về nó.
Trước khi bạn có thể chạy, bạn một lần nữa cần update khối switch ở **DepthImageViewController.swift**. Để sử dụng method mới của bạn, đổi code bên trong `(.focused, .blur)` thành:
```
return depthFilters.createFocalBlur(for: image, withFocus: focus)
```
Build và run.
![](https://images.viblo.asia/211a4681-4803-4f3b-b808-dc6137237f2e.gif)
Quá đẹp!