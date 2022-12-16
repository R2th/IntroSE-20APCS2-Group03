Trong hướng dẫn này, bạn sẽ học được cách sử dụng API đồ họa 3D của Apple để vẽ một tam giác trên screen.
--------------------------------------------------------------------------------------------
Trong iOS 8, Apple đã phát hành API riêng đồ họa 3D cho GPU-accelerated: Metal.

Metal tương tự như OpenGL ES ở chỗ nó có một low-level API để tương tác với phần cứng đồ họa 3D.

Sự khác biệt là Metal không đa nền tảng. Thay vào đó, nó được thiết kế cho phần cứng của Apple, cung cấp tốc độ được cải thiện và hiệu năng tốt hơn so với sử dụng OpenGL ES.

Trong tutorial này, bạn sẽ có được trải nghiệm thực hành bằng cách sử dụng API Metal để tạo một ứng dụng cơ bản: vẽ một hình tam giác  :)). Khi làm như vậy, bạn sẽ học được một số class quan trọng nhất trong Metal, chẳng hạn như device, command queue ...

Tutorial này được thiết kế để bất kỳ ai cũng có thể đọc qua nó, bất kể nền tảng đồ họa 3D của bạn - tuy nhiên, mọi thứ sẽ diễn ra khá nhanh. Nếu bạn có một số kinh nghiệm lập trình 3D hoặc OpenGL trước đó, bạn sẽ thấy mọi thứ dễ dàng hơn nhiều, vì nhiều khái niệm tương tự áp dụng cho Metal.

Lưu ý: Ứng dụng Metal không chạy trên  iOS simulator; họ yêu cầu một thiết bị có chip Apple A7 trở lên. Để hoàn thành hướng dẫn này, bạn sẽ cần một thiết bị A7 hoặc mới hơn.

## Metal vs. SpriteKit, SceneKit or Unity

Trước khi bạn bắt đầu, nó sẽ rất hữu ích để hiểu cách Metal so sánh với các frameworks cấp  cao hơn như SpriteKit, SceneKit hoặc Unity.

Metal là một low level đồ hoạ API 3D, tương tự OpenGL ES, nhưng với chi phí tính toán thấp hơn có nghĩa là hiệu suất tốt hơn. Nó chỉ là một layer rất mỏng phía trên GPU, điều đó có nghĩa là khi thực hiện bất kỳ việc gì, vd như hiển thị một sprite hoặc mô hình 3D lên màn hình, nó cũng phải yêu cầu bạn phải viết tất cả mã để thực hiện điều này. Sự đánh đổi là bạn có toàn quyền và quyền kiểm soát.

Ngược lại, các frameworks  cấp cao hơn như SpriteKit, SceneKit và Unity được xây dựng dựa trên các API đồ họa 3D cấp thấp như Metal hoặc OpenGL ES. Họ cung cấp phần lớn code soạn sẵn mà bạn thường cần viết trong trò chơi, chẳng hạn như hiển thị mô hình sprite hoặc 3D lên màn hình.
![](https://images.viblo.asia/f8fdbb79-5aa2-488a-addc-19a9283d2abb.png)

Nếu tất cả những gì bạn đang cố gắng làm là tạo ra một game, thì có lẽ bạn sẽ sử dụng một game framework cấp cao hơn như SpriteKit, SceneKit hoặc Unity. Nếu điều này nghe có vẻ giống như mong muốn của bạn, chúng tôi có rất nhiều hướng dẫn để giúp bạn bắt đầu với [Apple Game Frameworks](https://www.raywenderlich.com/library?domain_ids%5B%5D=1&category_ids%5B%5D=161&sort_order=released_at)  hoặc [Unity](https://www.raywenderlich.com/unity).

Tuy nhiên, vẫn còn hai lý do thực sự tốt để học Metal: :]]

**Tận dụng phần cứng hết khả năng**: Vì Metal ở mức thấp như vậy, nó cho phép bạn tận tối đa phần cứng đến giới hạn của nó và có toàn quyền kiểm soát cách mà game của bạn hoạt động.

**Nó có một trải nghiệm học tập tuyệt vời**: Học Metal sẽ dạy cho bạn rất nhiều về đồ họa 3D, viết game engine của riêng bạn và hiểu  được cách các game framework cấp cao hơn hoạt động.

Nếu một trong những điều này nghe có vẻ làm bạn thích thú, hãy tiếp tục đọc!

## Metal vs. OpenGL ES
![](https://images.viblo.asia/cea6dc33-c02f-4276-b5d9-bfa06443e111.jpg)

OpenGL ES được thiết kế đa nền tảng. Điều đó có nghĩa là bạn có thể viết C ++ OpenGL ES và gần như với một số sửa đổi nhỏ, bạn có thể chạy nó trên các nền tảng khác, vd như Android.

Apple nhận ra rằng, mặc dù sự hỗ trợ đa nền tảng của OpenGL ES là tốt, nhưng nó lại thiếu một cái gì đó cơ bản cho cách Apple thiết kế các sản phẩm của mình: sự tích hợp của Apple về hệ điều hành, phần cứng và phần mềm.


Kết quả là Metal, có thể cung cấp tối đa X10 lần draw call cho ứng dụng của bạn so với OpenGL ES. Điều này có thể dẫn đến một số hiệu ứng đáng kinh ngạc - bạn có thể xem Zen Garden trong bài phát biểu của WWDC 2014 là một ví dụ.

Bây giờ tới lúc để tìm hiểu và xem một số code Metal!

## Getting Started

Xcode của iOS game đi  có thể kèm với tùy chọn Metal, nhưng bạn sẽ không chọn nó ở đây. Bạn sẽ kết hợp một Metal app gần như từ đầu để bạn có thể hiểu từng bước của quy trình.

Tải xuống các file mà bạn cần cho hướng dẫn này bằng nút **Download Material**s ở cuối tutorial này. Khi bạn đã có các file, hãy mở **HelloMetal.xcodeproj** trong thư mục **HelloMetal_starter**. Bạn sẽ thấy một dự án trống, chỉ với một ViewController duy nhất.

Có 7 bước cần thiết để thiết lập Metal để bạn có thể bắt đầu kết xuất. Bạn cần tạo:
 1. MTLDevice
 2. CaMetalLayer
 3. Vertex Buffer
 4. Vertex Shader
 5. Fragment Shader
 6. Render Pipeline
 7. Command Queue

Bây giờ chúng ta sẽ đi lần lượt qua chúng.

### 1) Creating an MTLDevice
Trước tiên, bạn cần phải lấy một tham chiếu tới một *MTLDevice*.

Hãy nghĩ về *MTLDevice* như kết nối trực tiếp của bạn với GPU. Bạn sẽ tạo tất cả các Metal object khác mà bạn cần (chẳng hạn như command queue, buffers và texture) bằng cách dùng *MTLDevice* này.

Để thực hiện việc này, hãy mở **ViewControll.swift** và thêm phần nhập này vào đầu file:

```
import Metal
```

Thao tác này cho phép bạn import thư viện Metal framework để bạn có thể sử dụng các lớp Metal như *MTLDevice* trong file này.

Tiếp theo, thêm thuộc tính device vào *ViewController* và khởi tạo chúng:

```
var device: MTLDevice!

override func viewDidLoad() {
  super.viewDidLoad()
    
  device = MTLCreateSystemDefaultDevice()
}
```

*MTLCreateSystemDefaultDevice* sẽ trả về một tham chiếu tới *MTLDevice* mặc định.

### 2) Creating a CAMetalLayer### 
Trong iOS, mọi thứ bạn nhìn thấy trên màn hình đều được hỗ trợ bởi CALayer. Có các lớp con của CALayers dành cho các hiệu ứng khác nhau, chẳng hạn như các gradient layers, shape layers, replicator layers nhiều hơn nữa.

Nếu bạn muốn vẽ một cái gì đó trên màn hình với Metal, bạn cần sử dụng một subclass đặc biệt của CALayer có tên là CAMetalLayer. Bạn sẽ thêm một class vào viewController.

Đầu tiên, thêm thuộc tính mới này vào lớp:
```
var metalLayer: CAMetalLayer!
```

Lưu ý: Nếu bạn gặp lỗi trình biên dịch tại thời điểm này, hãy đảm bảo rằng bạn đã thiết lập tới thiết bị iOS tương thích với Metal. Như đã đề cập trước đó, Metal không được hỗ trợ trên iOS Simulator tại thời điểm này.

Điều này sẽ lưu trữ một tham chiếu tới layer mới.
Tiếp theo, thêm code này vào cuối *viewDidLoad* ():
```
metalLayer = CAMetalLayer()          // 1
metalLayer.device = device           // 2
metalLayer.pixelFormat = .bgra8Unorm // 3
metalLayer.framebufferOnly = true    // 4
metalLayer.frame = view.layer.frame  // 5
view.layer.addSublayer(metalLayer)   // 6
```

Giải thích các dòng code trên:

1. Tạo một *CAMetalLayer* mới.
2. Bạn phải chỉ định *MTLDevice* mà layer nên sử dụng.
3. Đặt định dạng pixel thành *bgra8Unorm*, đây là một cách thú vị để nói ra 8 byte cho Blue, Green, Red và Alpha, theo thứ tự đó - với các giá trị được chuẩn hóa trong khoảng từ 0 đến 1. Đây là một trong hai định dạng có thể sử dụng cho một *CAMetalLayer*, thông thường bạn sẽ để nguyên trạng này.
4. Apple khuyến khích bạn đặt *framebufferOnly* thành *true* vì lý do hiệu suất trừ khi bạn cần lấy mẫu từ các texture được tạo cho layer này hoặc nếu bạn cần bật hạt nhân tính toán (compute kernels) trên kết cấu. Hầu hết thời gian, bạn không cần phải làm điều này.
5. Bạn đặt frame của layer để khớp với frame của khung nhìn.
6. Cuối cùng, bạn thêm layer như là 1 sublayer vào layer của view.

### 3) Creating a Vertex Buffer

Mọi thứ trong Metal đều là hình tam giác. Trong ứng dụng này, bạn sẽ chỉ đơn giản là vẽ một hình tam giác, nhưng ngay cả các hình dạng 3D phức tạp cũng có thể được tạo thành bởi một chuỗi các hình tam giác.

Trong Metal, hệ tọa độ mặc định là hệ tọa độ chuẩn hóa, có nghĩa là bởi mặc định, bạn đang nhìn vào khối lập phương 2x2x1 có tâm tại (0, 0, 0,5).

Nếu bạn coi mặt phẳng Z = 0, thì (-1, -1, 0) là phía dưới bên trái, (0, 0, 0) là tâm và (1, 1, 0) là phía trên bên phải. Trong hướng dẫn này, bạn muốn vẽ một hình tam giác với ba điểm sau:
![](https://images.viblo.asia/e86706c9-e4e1-4a44-8a54-0dda608f69c9.jpg)
Bạn phải tạo một bộ đệm cho việc này. Thêm thuộc tính hằng sau vào class của bạn:
```
let vertexData: [Float] = [
   0.0,  1.0, 0.0,
  -1.0, -1.0, 0.0,
   1.0, -1.0, 0.0
]
```

Điều này tạo ra một array float trên CPU. Bạn cần gửi dữ liệu này đến GPU bằng cách gửi nó sang một thứ gọi là *MTLBuffer*.

Thêm một property  mới cho việc này:
```
var vertexBuffer: MTLBuffer!
```

Thêm code này vào cuối *viewDidLoad*():
```
let dataSize = vertexData.count * MemoryLayout.size(ofValue: vertexData[0]) // 1
vertexBuffer = device.makeBuffer(bytes: vertexData, length: dataSize, options: []) // 2
```

Giải thích code:
1. Bạn cần lấy size của vertexData theo byte. Bạn thực hiện điều này bằng cách nhân size của phần tử đầu tiên với số phần tử trong array.
2. Bạn gọi makeBuffer(bytes:length:options:) trên MTLDevice để tạo bộ đệm mới trên GPU, truyền dữ liệu từ CPU. 

### 4) Creating a Vertex Shader

Các vertex mà bạn đã tạo trong phần trước sẽ trở thành input cho một chương trình nhỏ mà bạn viết sẽ được gọi là  **vertex shader**.

Một vertex shader chỉ đơn giản là một chương trình nhỏ chạy trên GPU, được viết bằng ngôn ngữ giống như C ++ gọi là [Metal Shading Language](https://developer.apple.com/library/prerelease/ios/documentation/Metal/Reference/MetalShadingLanguageGuide/Introduction/Introduction.html).

Một vertex shader được gọi một lần trên mỗi đỉnh (vertex) và công việc của nó là lấy thông tin đỉnh đó, vd như position - và có thể có kèm các thông tin khác như color,  texture coordinate - vị trí nó trả về có khả năng bị thay đổi và có thể có dữ liệu khác.

Để giữ cho mọi thứ đơn giản trong vd,  vertex shader của bạn sẽ return cùng vị trí với vị trí được truyền vào.
![](https://images.viblo.asia/dd0be563-e1b3-49de-aec8-3698a906cffe.jpg)

Cách dễ nhất để hiểu các vertex shades là tự mình làm nó. Chuyển đến **File ▸ New ▸ File, choose iOS ▸ Source ▸ Metal File**, click **Next**. Nhập **Shaders.metal** cho filename và nhấp vào **Create**.

Lưu ý: Trong Metal, bạn có thể bao gồm nhiều shader trong một file Metal. Bạn cũng có thể chia các shader của mình thành nhiều file Metal nếu muốn, vì Metal sẽ tải các shader từ bất kỳ file Metal nào có trong dự án của bạn.

Thêm code sau vào cuối **Shaders.metal**:

```
vertex float4 basic_vertex(                           // 1
  const device packed_float3* vertex_array [[ buffer(0) ]], // 2
  unsigned int vid [[ vertex_id ]]) {                 // 3
  return float4(vertex_array[vid], 1.0);              // 4
}
```

Giải thích code trên: 

1. Tất cả các vertex shader phải bắt đầu với *vertex* từ khóa. Hàm phải trả về (ít nhất) position cuối cùng của đỉnh. Bạn làm điều này ở đây bằng cách chỉ ra *float4* (một vectơ float). Sau đó, bạn đưa ra tên của vertex shader; bạn sẽ tìm kiếm shader sau khi sử dụng tên này.
2. Tham số đầu tiên là một con trỏ tới một mảng của *packfloat3* (một vectơ đóng gói gồm 3 float) - tức là, vị trí của mỗi đỉnh.Sử dụng cú pháp [[...]] để khai báo các thuộc tính mà bạn có thể sử dụng để chỉ định thông tin bổ sung như vị trí tài nguyên, đầu vào shader và biến tích hợp. Tại đây, bạn đánh dấu tham số này bằng [[ buffer(0) ]] để chỉ ra rằng bộ đệm dữ liệu đầu tiên mà bạn gửi tới vertex share từ Metal code của bạn sẽ điền tham số này.
3.Vertex shader cũng lấy một tham số đặc biệt với thuộc tính *vertexid*, có nghĩa là Metal sẽ điền vào nó bằng index của vertex cụ thể này bên trong  vertex array.
4. Tại đây, bạn tìm kiếm position bên trong array vexter dựa trên vertex id và return position đó. Bạn cũng chuyển đổi vectơ thành *float4*, trong đó giá trị cuối cùng là 1.0 - câu chuyện dài ngắn, điều này là bắt buộc đối với toán học 3D.

![](https://images.viblo.asia/10cc4c26-9c4d-4014-b17f-bdcce7619154.png)
Lời dịch giả dành cho bạn nào không hiểu được 1 position chỉ có 3 toạ độ x,y,z nhưng lại return về 4 vị trí (x,y,z,1). Trong hệ toạ bình thường (hệ trực chuẩn mà ta học ở lớp 7) thì đường thẳng song song sẽ ko gặp nhau (kiến thức lớp 7 ), cơ mà trong các mô hình 3d mà chúng ta thấy trên màn hình thì 2 đường thẳng lại "gặp nhau", để dễ hiểu các bạn tưởng tượng mình đứng trước 1 con đường, có phải khi tiến phía chân trời thì 2 mép đường có cảm giác là nó gặp nhau ko.  Chính vì vậy người ta phải sử dụng một hệ toạ độ khác để có thể biểu diễn không gian 3d lên trên màn hình máy tính, đó là hệ toạ độ đồng nhất (homogeneous coordinates). Mỗi 1 điểm trong hệ toạ độ này sẽ có dạng (x,y,z,1) nếu các bạn quan tâm có thể kiếm tài liệu để tìm hiểu thêm về hệ toạ độ này. Trong hệ toạ độ này thì 2 đường thẳng song song có thể "gặp nhau" :))

### 5) Creating a Fragment Shader

Sau khi vertex shader hoàn thành, Metal gọi một shader khác cho mỗi fragment  trên màn hình: the fragment shader.

Fragment shader được lấy các input của nó bằng cách nội suy các gía trị output đầu ra từ vertex shader. Ví dụ, hãy xét xem trung điểm của hai đỉnh của tam giác:

Giá trị đầu vào cho đoạn này sẽ là hỗn hợp 50/50 của giá trị đầu ra của hai đỉnh dưới cùng.

Công việc của một fragment shader là trả lại color cuối cùng cho mỗi fragment. Để giữ cho mọi thứ đơn giản, bạn sẽ return về giá trị màu trắng.

Thêm code  sau vào dưới cùng của** Shaders.metal**:

```
fragment half4 basic_fragment() { // 1
  return half4(1.0);              // 2
}
```

Giải thích từng dòng code:

1. Tất cả các fragment shaders phải bắt đầu với đoạn từ khóa. Hàm phải trả về color cuối cùng của fragment. Bạn làm như vậy ở đây bằng cách chỉ ra Half4 (4 thành phần màu RGBA). Lưu ý rằng Half4 có hiệu quả bộ nhớ tốt hơn float4 vì bạn đang ghi vào bộ nhớ GPU ít hơn.
2. Tại đây, bạn trả lại (1, 1, 1, 1) cho màu, đó là màu trắng.

### 6) Creating a Render Pipeline

Bây giờ bạn đã tạo ra một  vertex shader và fragment shader, bạn cần kết hợp chúng - cùng với một số dữ liệu cấu hình khác - vào một đối tượng đặc biệt gọi là **render pipeline**.

Một trong những điều thú vị về Metal là các shader được biên dịch trước và cấu hình render pipeline được biên dịch sau khi bạn thiết lập nó lần đầu tiên. Điều này làm cho mọi thứ cực kỳ hiệu quả.

Đầu tiên, thêm một thuộc tính mới vào **ViewController.swift**:
```
var pipelineState: MTLRenderPipelineState!
```

Điều này sẽ theo dõi render pipeline được biên dịch mà bạn sắp tạo.

Tiếp theo, thêm đoạn mã sau vào cuối *viewDidLoad* ():
```
// 1
let defaultLibrary = device.makeDefaultLibrary()!
let fragmentProgram = defaultLibrary.makeFunction(name: "basic_fragment")
let vertexProgram = defaultLibrary.makeFunction(name: "basic_vertex")
    
// 2
let pipelineStateDescriptor = MTLRenderPipelineDescriptor()
pipelineStateDescriptor.vertexFunction = vertexProgram
pipelineStateDescriptor.fragmentFunction = fragmentProgram
pipelineStateDescriptor.colorAttachments[0].pixelFormat = .bgra8Unorm
    
// 3
pipelineState = try! device.makeRenderPipelineState(descriptor: pipelineStateDescriptor)
```

Giải thích từng phần:

1. Bạn có thể truy cập bất kỳ trình shader nào được biên dịch sẵn nào trong dự án của bạn thông qua đối tượng *MTLLibrary* mà bạn nhận được bằng cách gọi *device.makeDefaultL Library ()!*. Sau đó, bạn có thể dùng từng shader theo tên của nó.

2. Bạn thiết lập cấu hình render pipeline của bạn ở đây. Nó chứa các shader mà bạn muốn sử dụng, cũng như định dạng pixel cho tệp đính kèm màu - tức là, bộ đệm đầu ra mà bạn có thể hiển thị, chính là *CAMetalLayer* .

3. Cuối cùng, bạn biên dịch cấu hình pipeline thành pipeline state để sử dụng ở đây.

### 7) Creating a Command Queue

Bước thiết lập một lần cuối cùng mà bạn cần làm là tạo *MTLCommandQueue*.

Hãy nghĩ về điều này như một danh sách các lệnh mà bạn yêu cầu GPU thực hiện, mỗi lần một lệnh.

Để tạo một hàng đợi lệnh, chỉ cần thêm một thuộc tính mới:
```
var commandQueue: MTLCommandQueue!
```
Thêm đoạn code sau vào cuối *viewDidLoad*():
```
commandQueue = device.makeCommandQueue()
```
Chúc mừng - bạn đã thiết lập xong.

## Rendering the Triangle

Bây giờ, đã đến lúc chuyển sang code thực thi từng frame - để hiển thị hình tam giác!

Điều này được thực hiện trong 5 bước:
1. Create a Display Link
2. Create a Render Pass Descriptor
3. Create a Command Buffer
4. Create a Render Command Encoder
5. Commit your Command Buffer

Lưu ý: Về lý thuyết, ứng dụng này không thực sự cần phải hiện thị mọi thứ một lần trên mỗi khung hình, bởi vì tam giác không di chuyển sau khi nó được vẽ ra. Tuy nhiên, hầu hết các ứng dụng đều có các phần chuyển động, vì vậy bạn sẽ làm mọi thứ theo cách này để tìm hiểu quy trình. Điều này cũng cung cấp một điểm khởi đầu tốt cho các hướng dẫn trong tương lai.

### 1) Creating a Display Link

Bạn cần một cách để vẽ lại màn hình mỗi khi màn hình thiết bị refresh.

*CADisplayLink* là một bộ đếm thời gian được đồng bộ hóa với tốc độ làm mới màn hình. Công cụ hoàn hảo cho công việc! Để sử dụng nó, thêm một thuộc tính mới vào class:

```
var timer: CADisplayLink!
```
Khởi tạo nó ở cuối *viewDidLoad* () như sau:
```
timer = CADisplayLink(target: self, selector: #selector(gameloop))
timer.add(to: RunLoop.main, forMode: .default)
```
Điều này thiết lập code của bạn để gọi một phương thức có tên *gameloop* () mỗi khi refresh màn hình.

Cuối cùng, thêm các phương thức này vào class:
```
func render() {
  // TODO
}

@objc func gameloop() {
  autoreleasepool {
    self.render()
  }
}
```

Ở đây, *gameloop* () chỉ đơn giản gọi *render* () mỗi khung hình, mà ngay bây giờ.

### 2) Creating a Render Pass Descriptor

Bước tiếp theo là tạo *MTLRenderPassDescriptor*, một đối tượng cấu hình texture nào được hiển thị, clean color và một ít cấu hình khác.

Thêm các dòng này bên trong *render* (), tại bên dưới // TODO:

```
guard let drawable = metalLayer?.nextDrawable() else { return }
let renderPassDescriptor = MTLRenderPassDescriptor()
renderPassDescriptor.colorAttachments[0].texture = drawable.texture
renderPassDescriptor.colorAttachments[0].loadAction = .clear
renderPassDescriptor.colorAttachments[0].clearColor = MTLClearColor(
  red: 0.0, 
  green: 104.0/255.0, 
  blue: 55.0/255.0, 
  alpha: 1.0)
```

Đầu tiên, bạn gọi *nextDrawable* () trên lớp Metal bạn đã tạo trước đó, nó trả về texture mà bạn cần vẽ để một cái gì đó trên màn hình.

Tiếp theo, bạn cấu hình renderPassDescriptor để sử dụng texture đó. Bạn thiết lập loadAction thành clear, điều này có nghĩa là bạn sẽ thiết lập texture thành clear color trước khi vẽ, và bạn đặt clear color là green color.

### 3) Creating a Command Buffer

Bước tiếp theo là tạo một Command Buffer. Hãy nghĩ về điều này như danh sách các lệnh render mà bạn muốn thực hiện cho frame này. Điều thú vị là không có gì thực sự xảy ra cho đến khi bạn thực hiện commit command buffer, điều này cho bạn quyền kiểm soát chi tiết khi mọi thứ xảy ra.

Tạo một bộ đệm lệnh là đơn giản. Chỉ cần thêm dòng này vào cuối *render* ():

```
let commandBuffer = commandQueue.makeCommandBuffer()!
```
Một bộ commandBuffer chứa một hoặc nhiều lệnh render. Bạn sẽ tạo một trong những thứ tiếp theo.

### 4) Creating a Render Command Encoder

Để tạo render command, bạn sử dụng một đối tượng trợ giúp được gọi là render command encoder. Để thử điều này, hãy thêm các dòng này vào cuối *render* ():
```
let renderEncoder = commandBuffer
  .makeRenderCommandEncoder(descriptor: renderPassDescriptor)!
renderEncoder.setRenderPipelineState(pipelineState)
renderEncoder.setVertexBuffer(vertexBuffer, offset: 0, index: 0)
renderEncoder
  .drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3, instanceCount: 1)
renderEncoder.endEncoding()
```

Tại đây, bạn tạo một command encoder và chỉ định bộ đệm pipeline và vertex buffer  mà bạn đã tạo trước đó.

Phần quan trọng nhất là lệnh gọi *drawPrimitives(type:vertexStart:vertexCount:instanceCount:)*. Tại đây, bạn đã nói với GPU để vẽ một tập hợp các hình tam giác, dựa trên vertex buffer.
Để giữ cho mọi thứ đơn giản, bạn chỉ vẽ một tam giác. Các đối số phương thức nói cho Metal biết rằng mỗi tam giác bao gồm ba đỉnh, bắt đầu từ index 0 bên trong vertex buffer.

Khi bạn thực hiện xong, bạn chỉ cần gọi endEncoding ().

### 5) Committing Your Command Buffer

Bước cuối cùng là commit command buffer. Thêm các dòng này vào cuối render ():
```
commandBuffer.present(drawable)
commandBuffer.commit()
```

Dòng đầu tiên là  để đảm bảo rằng GPU present texture mới ngay khi bản vẽ đã hoàn thành. Sau đó, bạn commit  và gửi các task đến GPU.

Phù! Đó là một loạt các đoạn code, nhưng cuối cùng, bạn đã hoàn thành! Build và Run ứng dụng , đắm mình trong vinh quang với hình vẽ tam giác của bạn: :]]

![](https://images.viblo.asia/6cb0b502-2c40-465f-86a4-3a5beaf46ebb.png)

 [link bài gốc](https://www.raywenderlich.com/7475-metal-tutorial-getting-started)


[Download Material](https://koenig-media.raywenderlich.com/uploads/2018/10/HelloMetal_materials.zip)