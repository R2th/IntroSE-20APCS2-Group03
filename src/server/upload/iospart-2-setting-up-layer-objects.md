Layer object là trái tim của tất cả những thứ mà bạn muốn làm việc với Core Animation, các layer quản lý nội dung trực quan content của app, cung cấp các tuỳ chọn để thay đổi hình dạng và hình thức trực quan của content đó. Mặc dù các app iOS việc hỗ trợ layer được bật tự động, với OS X thì phải kích hoạt nó , sau đó tìm cách config và thao tác với các hiệu ứng mong muốn.

## Bật hỗ trợ Core Animation

Như đã nói ở trên thì iOS app, Core Animation luôn được bật và tất cả các view đều được hỗ trợ bởi 1 layer. Còn với OS X thì cách để enable Core Animation support được thực hiện theo các bước sau.
- Liên kết với framework QuartzCore. (Các ứng dụng iOS phải liên kết với framework này chỉ khi chúng sử dụng giao diện Core Animation một cách chi tiết nhất)
- Bật layer hỗ trợ một hoặc nhiều object NSView bằng cách sau:
    - Trong file nib, sử dụng View Effects inspector để enable layer support cho view đó. Inspector hiển thị các checkbox cho chọn view và các subview. Nên bật layer support trong content view của window bất cứ khi nào có thể.
    - Với code tay một View, gọi tới phương thức setWantsLayer: và truyền param YES để chỉ ra view sử dụng layer support

Kích hoạt hỗ trợ layer bằng các cách ở bên trên. Với View được support layer, hệ thống chịu trách nhiệm tạo object layer bên dưới và giữ cho layer đó được update. Trong OS X, cũng có thể tạo view lưu trữ layer, theo đó app thực sự tạo và quản lý object layer bên dưới. (Không thể tạo View lưu trữ layer trong iOS.) 

## Thay đổi liên kết của layer với view

Các view được hỗ trợ layer tạo một instance của CALayer class theo mặc định, và trong hầu hết các trường hợp, bạn có thể không cần một loại layer object khác. Tuy nhiên Core Animation  cung cấp các layer khác nhau, mỗi layer có chức năng riêng và sử dụng như thế nào cho hữu ích thì phụ thuộc vào dev. Chọn một layer khác cho phép cải thiện performance hoặc hỗ trợ một loại content cụ thể theo cách đơn giản nhất.

### Thay đổi layer class được sử dụng bởi UIView

Có thể thay đổi loại layer được sử dụng bởi iOS view bằng cách override phương thức layerClass của view đó và return về giá trị của một class object khác. Hầu hết các iOS view tạo đối tượng CALayer và sử dụng layer đó làm kho lưu trữ dự phòng cho content của nó. Ví dụ cho việc ta muốn thay đổi layer class trong các tình huống sau:

- View draw content sử dụng Metal hoặc OpenGL ES, trong trường hợp này ta sử dụng một CAMetalLayer hoặc CAEAGLLayer object
- Có một layer class chuyên cung cấp hiệu suất tốt hơn
- Muốn tận dụng một số layer class đặc biệt trong Core Animation

Thay đổi layer class của một view rất đơn giản. Override layerClass, trước khi hiển thị, view gọi layerClass method và sử dụng 1 layer trả về để tạo một layer object mới cho chính nó, sau khi được tạo thì layer class của view không thể thay đổi

```ObjectiveC
+ (Class) layerClass {
   return [CAMetalLayer class];
}
```

### Thay đổi  layer class được sử dụng bởi NSView

Có thể thay đổi layer class mặc định được sử dụng bởi một  NSView class bằng cách override  phương thức makeBackingLayer. Khi thực hiện phương thức này, hãy tạo và trả về layer class mà bạn muốn AppKit sử dụng để quay lại View tùy chỉnh của bạn. Có thể ghi đè phương thức này trong các tình huống mà muốn sử dụng custom layer, chẳng hạn như scrolling hoặc tiled layer.

####  Hosting layer cho phép thay đổi layer object trong OS X

Một view lưu trữ layer là một đối tượng NSView mà bạn tự tạo và quản lý layer object bên dưới. Bạn có thể sử dụng lưu trữ layer trong các tình huống mà bạn muốn kiểm soát loại layer object được liên kết với view. Ví dụ: bạn có thể tạo view lưu trữ layer để bạn có thể chỉ định một layer class khác với CALayer class mặc định. Cũng có thể sử dụng nó trong các tình huống mà bạn muốn sử dụng một view để quản lý phân cấp các layer độc lập.

Khi gọi phương thức setLayer: của view của bạn và cung cấp một layer object, AppKit sẽ thực hiện một cách tiếp cận thực tiễn cho layer đó. Thông thường, AppKit cập nhật một layer object, nhưng trong tình huống lưu trữ layer, nó không dành cho hầu hết các thuộc tính.

Để tạo một view lưu trữ layer, hãy tạo layer object của bạn và liên kết nó với view trước khi hiển thị trên màn hình, như trong Liệt kê 2-2. Ngoài việc thiết lập layer object, vẫn phải gọi phương thức setWantsLayer: để cho view biết rằng nó nên sử dụng các layer.

```ObjectiveC
// Create myView...
 
[myView setWantsLayer:YES];
CATiledLayer* hostedLayer = [CATiledLayer layer];
[myView setLayer:hostedLayer];
 
// Add myView to a view hierarchy.
```

Nếu tự lưu trữ layer, ta phải đặt thuộc tính `contentsScale` và cung cấp content có độ phân giải cao vào những thời điểm thích hợp

#### Các layer khác nhau cung cấp các hành vi chuyên biệt

Core Animation định nghĩa nhiều layer class tiêu chuẩn, mỗi layer class được thiết kế cho một trường hợp sử dụng cụ thể. CALayer  class là class gốc cho tất cả các objec layer. Nó định nghĩa hành vi mà tất cả các layer object phải hỗ trợ và là loại mặc định được sử dụng bởi các view được hỗ trợ layer. Tuy nhiên,  cũng có thể chỉ định một trong các layer class trong bảng sau.

| Class | Cách sử dụng | 
| -------- | -------- |
| [CAEmitterLayer](https://developer.apple.com/documentation/quartzcore/caemitterlayer)   | Được sử dụng để thực hiện một hệ thống particle emitter dựa trên Core Animation. Layer object emitter kiểm soát việc tạo ra các partical và nguồn gốc của chúng |
| [CAGradientLayer](https://developer.apple.com/documentation/quartzcore/cagradientlayer)   | Được sử dụng để vẽ một dải màu lấp đầy hình dạng của layer (trong giới hạn của bất kỳ góc của hình tròn nào). |
| [CAMetalLayer](https://developer.apple.com/documentation/quartzcore/cametallayer)   | Được sử dụng để thiết lập và trả lại kết cấu có thể draw để hiển thị layer content bằng Metal|
| [CAEAGLLayer](https://developer.apple.com/documentation/quartzcore/caeagllayer)/[CAOpenGLLayer](https://developer.apple.com/documentation/quartzcore/caopengllayer)   | Được sử dụng để thiết lập backing store và bối cảnh để hiển thị layer content bằng OpenGL ES (iOS) hoặc OpenGL (OS X).|
| [CAReplicatorLayer](https://developer.apple.com/documentation/quartzcore/careplicatorlayer)  | Được sử dụng khi bạn muốn tạo bản sao của một hoặc nhiều sub layer tự động. Trình sao chép tạo các bản sao cho bạn và sử dụng các thuộc tính bạn chỉ định để thay đổi giao diện hoặc thuộc tính của các bản sao.|
| [CAScrollLayer](https://developer.apple.com/documentation/quartzcore/cascrolllayer)  | Được sử dụng để quản lý một khu vực lớn có thể scroll bao gồm nhiều sub layer.|
| [CAShapeLayer](https://developer.apple.com/documentation/quartzcore/cashapelayer)  | Được sử dụng để vẽ một Bezier hình khối. Các shape layer là lợi thế để vẽ các shape dựa trên path bởi vì chúng luôn dẫn đến một đường dẫn sắc nét, trái ngược với đường dẫn bạn vẽ vào một cửa baking store layer, trông sẽ không đẹp khi được chia tỷ lệ. Tuy nhiên, kết quả rõ nét liên quan đến việc hiển thị hình dạng trên main thread và lưu trữ kết quả.|
| [CATextLayer](https://developer.apple.com/documentation/quartzcore/catextlayer)  | Được sử dụng để hiển thị một plain text  hoặc attributed string.|
| [CATiledLayer](https://developer.apple.com/documentation/quartzcore/catiledlayer)  | Được sử dụng để quản lý một hình ảnh lớn có thể được chia thành các ô nhỏ hơn và được hiển thị riêng lẻ với sự hỗ trợ để phóng to và thu nhỏ nội dung.|
| [CATransformLayer](https://developer.apple.com/documentation/quartzcore/catransformlayer)  | Được sử dụng để hiển thị một hệ thống phân cấp layer 3D thực sự, thay vì phân cấp layer phẳng được thực hiện bởi các layer class khác|
| [QCCompositionLayer](https://developer.apple.com/documentation/quartz/qccompositionlayer)  | Được sử dụng để renter một Quartz composition. (Chỉ dành cho hệ điều hành X)|

## Cung cấp một Layer’s Contents

Các layer là các đối tượng dữ liệu quản lý content được cung cấp bởi app. Layer content bao gồm một bitmap chứa dữ liệu trực quan bạn muốn hiển thị. Bạn có thể cung cấp nội dung cho bitmap đó theo một trong ba cách:
- Gán một image object trực tiếp cho thuộc tính `contents` của object layer. (Kỹ thuật này là tốt nhất cho layer content không bao giờ hoặc hiếm khi thay đổi.)
- Gán một delegate object cho layer và để cho delegate draw content của layer(Kỹ thuật này là tốt nhất cho layer content có thể thay đổi theo định kỳ và có thể được cung cấp bởi một đối tượng bên ngoài, chẳng hạn như chế độ xem)
- Xác định một sublayer và override một trong các phương thức draw của chúng để tự cung cấp layer content (Phù hợp nếu phải tạo custom layer hoặc thay đổi hành vi draw cơ bản của layer)

Việc duy nhất cần lo lắng là cung cấp  content cho một layer là khi bạn tự tạo layer object. Nếu app không chứa gì ngoài view được hỗ trợ layer,thì không phải lo lắng về việc sử dụng bất kỳ kỹ thuật nào trước đây để cung cấp layer content. Các view được hỗ trợ layer tự động cung cấp content cho các layer được liên kết của chúng theo cách hiệu quả nhất có thể.

### Sử dụng  images cho layer content

Vì một layer chỉ là một container chứa để quản lý hình ảnh bitmap, bạn có thể gán hình ảnh trực tiếp cho thuộc tính `contents` của layer. Việc chỉ định một hình ảnh cho layer rất dễ dàng và cho phép bạn chỉ định hình ảnh chính xác mà bạn muốn hiển thị trên màn hình. Layer sử dụng trực tiếp đối tượng hình ảnh bạn cung cấp và không tạo bản sao của hình ảnh đó. Hành vi này có thể tiết kiệm bộ nhớ trong trường hợp app sử dụng cùng một hình ảnh ở nhiều nơi.

Hình ảnh gán cho một layer phải là loại `CGImageRef`. (Trong OS X v10.6 trở lên, bạn cũng có thể gán đối tượng NSImage.) Khi gán hình ảnh, hãy nhớ cung cấp hình ảnh có độ phân giải phù hợp với độ phân giải của device gốc. Đối với các thiết bị có màn hình Retina, điều này cũng có thể yêu cầu bạn điều chỉnh thuộc tính nội dung của hình ảnh.


### Sử dụng delegate để cung cấp cho layer content

Nếu layer content thay đổi linh hoạt,  có thể sử dụng một delegate để cung cấp và cập nhật content đó khi cần. Tại thời điểm hiển thị,  layer gọi các phương thức của delegate để cung cấp nội dung cần thiết:
- Nếu delegate thực hiện phương thức `displayLayer:` thì việc triển khai đó tạo ra một bitmap và gán nó cho thuộc tính `contents` của layer.
- Nếu delegate  triển khai phương thức `drawLayer: inContext:`, Core Animation tạo một bitmap, tạo một bối cảnh đồ họa để vẽ vào bitmap đó, sau đó gọi phương thức delegate để điền vào bitmap. Tất cả phương pháp delegate  phải làm là vẽ vào bối cảnh đồ họa được cung cấp.

Delegate object phải triển khai phương thức `displayLayer:` hoặc `drawLayer: inContext :`. Nếu delegate thực hiện cả phương thức `displayLayer: `và `drawLayer: inContext:` thì layer chỉ gọi phương thức `displayLayer :`

Ghi đè phương thức `displayLayer:` thích hợp nhất cho các tình huống khi app thích tải hoặc tạo ảnh bitmap mà nó muốn hiển thị. Đoạn code dưới đây cho thấy một triển khai  của phương thức `displayLayer:`  của delegate. Trong ví dụ này, delegate sử dụng một đối tượng trợ giúp để tải và hiển thị hình ảnh mà nó cần. Phương thức ủy nhiệm chọn hình ảnh nào sẽ hiển thị dựa trên trạng thái bên trong của chính nó, trong ví dụ này là một thuộc tính tùy chỉnh được gọi là `displayYesImage`.

```ObjectiveC
- (void)displayLayer:(CALayer *)theLayer {
    // Check the value of some state property
    if (self.displayYesImage) {
        // Display the Yes image
        theLayer.contents = [someHelperObject loadStateYesImage];
    }
    else {
        // Display the No image
        theLayer.contents = [someHelperObject loadStateNoImage];
    }
}
```

Nếu không có hình ảnh được chuẩn bị trước hoặc đối tượng trợ giúp để tạo ảnh bitmap cho bạn, delegate có thể vẽ nội dung một cách linh hoạt bằng phương thức `drawLayer: inContext :`. Đoạn code dưới đây cho thấy một triển khai mẫu của phương thức `drawLayer: inContext :`. Trong ví dụ này, delegate vẽ một đường cong đơn giản bằng cách sử dụng chiều rộng cố định và render màu hiện tại.

```ObjectiveC
- (void)drawLayer:(CALayer *)theLayer inContext:(CGContextRef)theContext {
    CGMutablePathRef thePath = CGPathCreateMutable();
 
    CGPathMoveToPoint(thePath,NULL,15.0f,15.f);
    CGPathAddCurveToPoint(thePath,
                          NULL,
                          15.f,250.0f,
                          295.0f,250.0f,
                          295.0f,15.0f);
 
    CGContextBeginPath(theContext);
    CGContextAddPath(theContext, thePath);
 
    CGContextSetLineWidth(theContext, 5);
    CGContextStrokePath(theContext);
 
    // Release the path
    CFRelease(thePath);
}
```

Đối với các view được hỗ trợ layer với custom content, bạn nên tiếp tục ghi đè các phương thức  của view để thực hiện bản vẽ của mình. Một khung nhìn được hỗ trợ layer tự động biến nó thành delegate của layer của nó và thực hiện các phương thức delegate cần thiết và  không nên thay đổi cấu hình đó. Thay vào đó,  nên thực hiện phương thức ` drawRect:` của view  để vẽ content.


Refs: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/SettingUpLayerObjects/SettingUpLayerObjects.html#//apple_ref/doc/uid/TP40004514-CH13-SW12