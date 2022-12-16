# I. Giới thiệu

ARKit được Apple ra mắt lần đầu trong WWDC 2017, và chính thức chạy trên iOS 11. Lúc đó, để hiển thị model 3D chạy cùng ARKit, chúng ta phải sử dụng SceneKit. Dùng ARKit cùng SceneKit cũng không gặp nhiều khó khăn hay phức tạp, tuy nhiên ít nhiều chúng ta vẫn gặp phải một số vấn đề: phải tìm hiểu về SceneKit, sẽ tương đối mất thời gian; và tuy là không phức tạp so với các SDK về AR khác, nhưng vẫn phải code khá nhiều.

Đến WWDC 2019, RealityKit đã được giới thiệu cùng iOS 13. Framework này được sử dụng cùng ARKit, là sự thay thế hoàn hảo cho SceneKit, với một số ưu điểm như sau:
+ Thêm vào SwiftUI View rất đơn giản, chúng ta thậm chí không phải làm gì, tạo project là placeholder code đã có sẵn hết rồi
+ Sử dụng Reality Composer, đây là "editor" cực kỳ hữu ích và đơn giản để chúng ta xây dựng môi trường ảo cho AR App

Có thể nói RealityKit chiều lập trình viên rất nhiều, đến mức những người không biết code hoàn toàn cũng có thể tạo ứng dụng AR cho mình. Dưới đây chúng ta sẽ cùng tìm hiểu về RealityKit

# II. Nội dung

## 1. Tạo AR Reality project

Các bạn mở Xcode, tạo project mới: File -> New -> Project:

Trong phần "Choose a template for your new project:", các bạn chọn "Augmented Reality App" như hình sau:

![](https://images.viblo.asia/11060107-363a-45f9-80e5-5c42b7fd60b0.png)

Tiếp đó, trong "Choose options for your new project:", các bạn chọn như hình sau, nhớ để ý "Content Technology" là "RealityKit"

![](https://images.viblo.asia/8c76b6f5-531c-4a26-8eab-0b1aafe5c85d.png)

Ok, vậy là chúng ta đã tạo xong App AR. Các bạn có tin không? bây giờ chúng ta có thể chạy App để trải nghiệm AR được rồi. Lưu ý, để chạy AR App, chúng ta cần sử dụng device thật, hãy kết nối với iPhone, run App, soi camera vào một mặt phẳng, chúng ta sẽ được kết quả như hình sau:

![](https://images.viblo.asia/6f353284-35b8-4a58-912b-e268ae2b8a4c.jpeg)

Vậy là ứng dụng của chúng ta đang có chức năng:
- Soi vào mặt phẳng nằm ngang
- Khi detect được mặt phẳng, hiển thị 1 hình lập phương trên mặt phẳng đó

## 2. Tìm hiểu code ban đầu

Mở file ContentView.swift ra, chúng ta có code sau:

```Swift
import SwiftUI
import RealityKit

struct ContentView : View {
	// 1
    var body: some View {
        return ARViewContainer().edgesIgnoringSafeArea(.all)
    }
}

struct ARViewContainer: UIViewRepresentable {
    // 2
    func makeUIView(context: Context) -> ARView {
        // 4
        let arView = ARView(frame: .zero)
        
        // Load the "Box" scene from the "Experience" Reality File
        let boxAnchor = try! Experience.loadBox()
        
        // Add the box anchor to the scene
        arView.scene.anchors.append(boxAnchor)
        // 5
        return arView
        
    }
    // 3
    func updateUIView(_ uiView: ARView, context: Context) {}
    
}
```

Hãy để ý đoạn code trên:
* 1: Chúng ta sử dụng SwiftUI view, nhưng AR content của chúng ta là subView của UIView, nên phải wrap trong UIViewRepresentable
* 2, 3: các function makeUIView(context:) -> ARView và updateUIView(_ uiView:, context:) là các function phải implement của UIViewRepresentable protocol. Nếu các bạn đã quen với SwiftUI thì các function này đã là các function quen thuộc rồi.
* 4, 5: khởi tạo instance của class ARView. Đây là class của RealityKit Framework, với super class là UIView.
* Code ở comment trên, chúng ta có enum Experience, function loadBox(). 2 thứ này đều là code được tạo tự động của file Experience.rcproject. file này được tạo khi chúng ta tạo project, chúng ta sẽ tìm hiểu về các thứ này bên dưới. Đại khái dòng code này load box từ Experience.rcproject.
* Code ở comment dưới, các bạn cứ hiểu giống như chúng ta add  subView của box vào trong screen vậy. 

Ok, code đơn giản là như vậy, dưới đây chúng ta sẽ tiếp tục tìm hiểu cách thêm nhiều thứ hay ho nữa vào App

## 3. Reality Composer

Đầu tiên, hãy thử mở file Experience.rcproject, chúng ta được như hình sau:

![](https://images.viblo.asia/f84f01df-9fb2-47c1-99f5-5dd257034e6a.png)

Xcode không hỗ trợ làm việc với file .rcproject, nên chúng ta chỉ có thể preview nội dung. Để làm việc với file này, chúng ta cần sử dụng tool 'Reality Composer'. Để ý phía trên bên phải, các bạn sẽ thấy có nút "Open in Reality Composer". Hãy click vào đó, chúng ta sẽ mở file trong Reality Composer như hình sau:

![](https://images.viblo.asia/a3379f51-8aad-4d24-9713-69457681ef88.png)

Từ Xcode các bạn cũng có thể mở Reality Composer bằng cách: Xcode -> Open Developer Tool -> Reality Composer.

Thoạt nhìn thì Reality Composer có vẻ cũng giống với các phần mềm thiết kế model 3D khác, nhưng thực ra chức năng của nó không phải để thiết kế, mà nó giống với màn editor của Unity hơn. Chúng ta sẽ sắp xếp các model 3D, tạo các behavior cho chúng, và các việc chúng ta làm sẽ được phản ánh trong App AR.

Tool Reality Composer có rất nhiều nút, nhiều chức năng, chúng ta sẽ không thể đi hết được trong bài viết này. Tôi sẽ chỉ thử một vài cái cơ bản, các bạn có thể tự mình nghịch nó để khám phá các chức năng nhé.

### a. Thêm model 3D

Hiện tại chúng ta mới chỉ có 1 model 3D, là box hình lập phương. Để thêm model, các bạn bấm vào nút Add ở bên trên. Khi bấm vào, 1 danh sách các model 3D sẽ được hiển thị ra như ảnh sau:

![](https://images.viblo.asia/f50ec818-2845-4035-9062-5c1d0dc30f32.png)

Ngoài các object có sẵn, các bạn cũng có thể sử dụng chức năng import để thêm các model 3D của mình. Các định dạng file hỗ trợ các bạn tìm hiểu thêm ở [đây nhé](https://developer.apple.com/documentation/realitykit/creating_3d_content_with_reality_composer)

Các bạn có thể thêm các model tuỳ thích, mình đã thêm 1 hình cầu và 1 ngôi sao như hình dưới:

![](https://images.viblo.asia/e40452a6-9429-46db-8757-2dbc36d65027.png)

Để ý phần property của model, các bạn có thể điều chỉnh các thuộc tính của object như vị trí, chất liệu,...

Save file lại, quay trở lại Xcode và chạy App, chúng ta được kết quả như hình sau:

![](https://images.viblo.asia/3581fe8c-87cb-4576-a817-5ae14572efea.jpeg)

Tuyệt vời chưa nào? không cần phải thêm dòng code nào cả, chỉ chỉnh sửa file Experience.rcproject và thế là chúng ta có các model như mong muốn rồi.

### b. Thêm behavior

Bên trên chúng ta đã có các model, nhưng chúng hoàn toàn là các model tĩnh, không có "hành vi" nào cả. Bây giờ chúng ta sẽ thêm behavior cho model để chúng có thể hoạt động theo chúng ta mong muốn. 

Reality Composer cung cấp khá nhiều behavior, như tap & flip, tap & play sound,... và quan trọng nhất là custom behavior để chúng ta thoả sức thêm behavior cho object.

![](https://images.viblo.asia/c8fb6c0d-f0da-44dc-9568-9f2246cff8d3.png)

Đầu tiên, tôi muốn khi tap vào ngôi sao, nó sẽ lật, thì làm như sau:
* Thêm behavior Tap & Flip
* Chọn Affected Objects ở cả 2 cột Tap và Emphasize là hình ngôi sao
* Các bạn có thể bấm vào nút play bên cạnh để test thử behavior sẽ chạy như thế nào trong thực tế

![](https://images.viblo.asia/f0ff0454-8ee8-4c38-9ba7-bcf17065d410.png)

Tiếp theo, tôi muốn khi bắt đầu thì hình cầu sẽ không được hiển thị ra, thì làm như sau:
* Thêm behavior Start Hidden
* Chọn Affected Objects ở cột Hide là object hình cầu của mình
* Bấm nút play để kiểm tra kết quả: khi play thì quả cầu không xuất hiện

![](https://images.viblo.asia/0fb8a923-429f-4931-82c5-8f8ab27a943e.png)

### c. Sequence behavior
Behavior có thể thêm theo dạng sequence, tức là chúng ta có thể thêm lần lượt các hành động cho Object. Giả sử, khi bắt đầu thì hình cầu bị ẩn, nhưng sẽ từ từ xuất hiện trong vòng 1 giây. Các bạn có thể add thêm action vào behavior đã có bằng cách:
* Bấm nút "+" trên Action Sequence của behavior
* Trong list action, chọn action Show
* Nhớ chọn Affected Objects là hình cầu
* Để ý duration của các behavior, căn thời gian làm sao cho đúng. Ví dụ tôi đang để duration của Hide là 0, tức là ngay khi bắt đầu thì quả cầu lập tức biến mất, và duration của Show là 1, tức là khi bắt đầu thì quả cầu sẽ xuất hiện từ từ trong vòng 1 giây
* Bấm vào nút play trong hàng Action Sequence để chạy thử cả sequence

![](https://images.viblo.asia/56d22e59-01cd-42b4-8bea-af6e7e482c7b.png)

Bây giờ, build run App, chúng ta sẽ được kết quả:
* hình cầu ban đầu bị ẩn, hiển thị dần ra sau 1s
* hình ngôi sao có thể tap vào, mỗi khi tap thì ngôi sao bị nảy lên và lật ngược lại

# III. Kết luận

Trên đây, tôi đã giới thiệu về RealityKit và Reality Composer, các bạn cũng có thể thấy, đây là công cụ tuyệt vời để xây dựng ứng dụng về AR, giúp chúng ta dễ dàng xây dựng ứng dụng AR mình muốn.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)