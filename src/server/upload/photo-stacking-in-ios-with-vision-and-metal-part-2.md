Dịch từ https://www.raywenderlich.com/3733151-photo-stacking-in-ios-with-vision-and-metal

Part 1: https://viblo.asia/p/photo-stacking-in-ios-with-vision-and-metal-part-1-GrLZDWVeKk0

# How Photo Stacking works

Có 1 vài cách khác nhau để hợp nhất hoặc xếp chồng ảnh với nhau. Cách dễ nhất là chỉ cần lấy trung bình các pixel cho mỗi vị trí trên ảnh với nhau.

Ví dụ, nếu bạn có 20 ảnh để xếp chồng, bạn nên lấy trung bình các điểm ảnh ở toạ độ (13, 37) của tất cả 20 ảnh để lấy 1 giá trị pixel phù hợp cho ảnh đã xếp chồng ở (13, 37)

![](https://images.viblo.asia/49110843-cb26-42dc-acbe-fdf3469939f5.png)

Nếu bạn làm điều tương tự cho mỗi pixel, bạn sẽ lấy được 1 bức ảnh trung hoà của tất cả 20 ảnh. Bạn càng có nhiều ảnh thì giá trị trung bình của background pixel sẽ càng gần với giá trị trung bình chuẩn. Nếu có thứ gì đó di chuyển trước camera, nó sẽ chỉ xuất hiện tại một điểm trong một vài bức ảnh, nên nó sẽ không ảnh hưởng nhiều đến kết quả trung bình cuối cùng. Đó là lý do vì sao đối tượng di chuyển bị ẩn đi.

Đó là cách bạn sẽ triển khai logic stacking.

# Stacking Images

Giờ chúng ta sẽ đến với phần thú vị nhất của tutorial này! Bạn sẽ kết hợp tất cả những ảnh đã chụp thành một bức ảnh tuyệt vời. Bạn sẽ tạo ra Core Image kernel của riêng bạn sử dụng Metal Shading Language (MSL).

Kernel mà bạn tạo ra sẽ tính toán giá trị trung bình của pixel cho hai bức ảnh. Khi bạn tính trung bình của nhiều ảnh với nhau, những đối tượng di chuyển sẽ biến mất. Giá trị background pixel sẽ xuất hiện nhiều và chiếm phần lớn trong giá trị trung bình của pixel sau khi tính toán.

# Creating a Core Image Kernel

Bạn sẽ bắt đầu với một kernel thực tế, được viết trong MSL. MSL khá là giống với C++.

Thêm một file Metal File vào project và đặt tên nó là **AverageStacking.metal**. Để lại đoạn code mẫu và thêm các dòng code dưới đây vào cuối file:


```
#include <CoreImage/CoreImage.h>

extern "C" { namespace coreimage {
  // 1
  float4 avgStacking(sample_t currentStack, sample_t newImage, float stackCount) {
    // 2
    float4 avg = ((currentStack * stackCount) + newImage) / (stackCount + 1.0);
    // 3
    avg = float4(avg.rgb, 1);
    // 4
    return avg;
  }
}}
```

Với đoạn code trên, bạn sẽ:

1. Định nghĩa một fuction mới với tên *avgStacking*, fuction này sẽ trả về một mảng của 4 giá trị float, đại diện cho pixel của màu đỏ (red), màu xanh lá (green), màu xanh biển (blue) và alpha channel. Fuction này sẽ được áp dụng cho hai ảnh một lúc, nên bạn cần theo dõi giá trị trung bình hiện tại của tất cả những bức ảnh đã được xử lý. Biến *currentStack* biểu hiện cho giá trị trung bình này, *stackCount* là số để xác định bao nhiêu bức ảnh đã được sử dụng để tính toán *currentStack*.
2. Tính toán giá trị trung bình của hai bức ảnh. Vì *currentStack* có thể bao gồm thông tin của nhiều bức ảnh, bạn cần chia cho *stackCount* để có giá trị chuẩn.
3. Thêm một giá trị alpha vào giá trị trung bình để làm nó hoàn toàn hiển thị (không bị mờ).
4. Trả về giá trị pixel trung bình.
(Note: Function này sẽ chỉ được gọi một lần cho mỗi cặp pixel cần tính giữa hai ảnh. Kiểu dữ liệu *samplet* là sample pixel từ một ảnh)

OK, giờ bạn đã có kernel function, bạn cần tạo một **CIFilter** để sử dụng nó! Thêm một file Swift File mới vào project, đặt tên là **AverageStackingFilter.swift**. Xoá phần import và thêm đoạn code sau:

```
import CoreImage

class AverageStackingFilter: CIFilter {
  let kernel: CIBlendKernel
  var inputCurrentStack: CIImage?
  var inputNewImage: CIImage?
  var inputStackCount = 1.0
}
```

Ở đây bạn định nghĩa class CIFilter mới và một vài thuộc tính cần thiết. Bạn có để ý thấy ba thuộc tính input tương ứng với các parameter trong kernel function không. Là trùng hợp?

Tại thời điểm này có thể Xcode sẽ báo class này thiếu hàm khởi tạo. Vậy nên fix vấn đề này thôi. Thêm đoạn code sau vào class:

```
override init() {
  // 1
  guard let url = Bundle.main.url(forResource: "default", 
                                  withExtension: "metallib") else {
    fatalError("Check your build settings.")
  }
  do {
    // 2
    let data = try Data(contentsOf: url)
    // 3
    kernel = try CIBlendKernel(
      functionName: "avgStacking", 
      fromMetalLibraryData: data)
  } catch {
    print(error.localizedDescription)
    fatalError("Make sure the function names match")
  }
  // 4
  super.init()
}
```

Với đoạn khởi tạo này, bạn sẽ:
1. Lấy URL để complied và link file Metal.
2. Đọc nội dung file
3. Thử tạo **CIBlendKernel** từ hàm *avgStacking* trong file Metal và xử lý nếu nó thất bại.
4. Gọi super init.
Đợi một lát… bạn đã compile và link file Metal khi nào nhỉ? Không may là bạn vẫn chưa làm điều đó. Nhưng tin tốt là Xcode có thể làm điều đó giúp bạn.

# Compiling Your Kernel

Để compilte và link file Metal của bạn, bạn cần thêm hai flag vào Build Setting.

Search từ khoá **Other Metal Compiler Flags** thêm **-fcikernel** vào nó:

![](https://images.viblo.asia/e1f5658c-a0a1-4b80-a986-5d0fc6f0b932.png)

Tiếp theo, click vào button + và chọn **Add User-Defined Setting**:

![](https://images.viblo.asia/9f7d4ec6-6ce2-4cdd-a2f0-6d34656cb995.png)

Gọi cài đặt **MTLLINKER_FLAGS** và set nó thành **-cikernel**:

![](https://images.viblo.asia/f4f52f3f-dae1-4d30-b3cd-589bcf46acbf.png)

Bây giờ, lần tiếp theo khi bạn build project, Xcode sẽ compile file Metal của bạn và link chúng tự động.

Mặc dù vậy, trước khi bạn có thể làm điều đó, bạn vẫn cần làm thêm một chút việc với filter Core Image của bạn.

Trở lại với **AverageStackingFilter.swift**, thêm đoạn code sau:

```
func outputImage() -> CIImage? {
  guard 
    let inputCurrentStack = inputCurrentStack,
    let inputNewImage = inputNewImage
    else {
      return nil
  }
  return kernel.apply(
    extent: inputCurrentStack.extent,
    arguments: [inputCurrentStack, inputNewImage, inputStackCount])
}
```

Hàm này rất quan trọng. Cụ thể, nó sẽ được áp dụng vào kernel function của bạn cho ảnh input và ảnh output! Đây là một filter rất vô dụng, nếu nó không làm điều đó.

Kỳ nhỉ, sao Xcode vẫn chưa complaining! Ổn thôi. Thêm đoạn code dưới đây:

```
required init?(coder aDecoder: NSCoder) {
  fatalError("init(coder:) has not been implemented")
}
```

Bạn không cần khởi tạo Core Image filter này từ một unarchiver nên chỉ cầm implement đủ để Xcode có thể chạy thôi.

# Using Your Filter

Mở **ImageProcessor.swift** và thêm đoạn code sau vào *ImageProcessor*:

```
func combineFrames() {
  // 1
  var finalImage = alignedFrameBuffer.removeFirst()
  // 2
  let filter = AverageStackingFilter()
  //3 
  for (i, image) in alignedFrameBuffer.enumerated() {
    // 4
    filter.inputCurrentStack = finalImage
    filter.inputNewImage = image
    filter.inputStackCount = Double(i + 1)
    // 5
    finalImage = filter.outputImage()!
  }
  // 6
  cleanup(image: finalImage)
}
```

Ở đây bạn sẽ:
1. Khởi tạo ảnh final với ảnh đầu tiên trong aligned framer buffer và xoá nó đi khi xử lý
2. Khởi tạo custom Core Image filter
3. Lặp qua mỗi ảnh còn lại trong aligned framer buffer
4. Cài đặt filter parameter. Chú ý rằng ảnh final được set như là stack ảnh hiện tại. Bạn cần lưu ý không swap ảnh input. Hiện tại stack count được set là index của mảng cộng thêm 1. Bởi vì bạn đã xoá ảnh đầu tiên khỏi aligned framer buffer ở phần đầu của method này
5. Ghi đè ảnh cuối với ảnh filter mới được output
6. Gọi *cleanup(image:)* với ảnh final sau khi tất cả ảnh đã được kết hợp

Bạn có thể để ý rằng *cleanup()* không có parameter nào. Fix điều đó bằng việc thay thế *cleanup()* với đoạn dưới đây:

```
func cleanup(image: CIImage) {
  frameBuffer = []
  alignedFrameBuffer = []
  isProcessingFrames = false
  if let completion = completion {
    DispatchQueue.main.async {
      completion(image)
    }
  }
  completion = nil
}
```

Thay đổi duy nhấy là biến mới được thêm và đoạn if gọi đến completion handler trên main thread. Còn lại vẫn giữ nguyên.

Ở cuối hàm *processFrames(completion:)* thay thế lệnh gọi *cleanup()* với:

`combineFrames()`

Với cách này, phần xử lý ảnh của bạn sẽ kết hợp tất cả nhũng frame đã chụp sau khi căn chính chúng và đưa vào ảnh final để hoàn thành fuction.
Giờ build, chạy app và cho bất kỳ thứ gì di chuyển trước camera sẽ biến mất.
![](https://images.viblo.asia/d9a1a4d4-0051-4ceb-9230-b143ca3d5b46.gif)