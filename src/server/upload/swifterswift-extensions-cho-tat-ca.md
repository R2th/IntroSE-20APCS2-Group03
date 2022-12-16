**I. Giới thiệu**

Extensions cho phép chúng ta thêm những phương thức (method) mới vào một class có sẵn, mà không cần tạo một lớp kế thừa. Swift Extensions giống như Categories trong Objective-C, nhưng ngắn gọn hơn và mạnh mẽ hơn. Vậy khi nào thì cần dùng Extensions?
1. Tình huống cơ bản và thông dụng nhất là khi ta muốn thêm phương thức (Instance Methods & Type Methods) vào một class có sẵn.
2. Cung cấp thêm một số cách để khởi tạo đối tượng (Initializer).
3. Đáp ứng thêm một hoặc nhiều giao thức (Adapt Protocol).
4. Thêm các thuộc tính tính toán (Computed properties).
5. Mở rộng giao thức (Protocol)

Trong đó trường hợp 1 và 4 là 2 trường hợp mà chúng ta đã sử dụng khá nhiều. Tác dụng của Extensions không ai có thể phủ nhận được, hơn thế nữa ở mỗi dự án chúng ta luôn dành một sự quan tâm đặc biệt cho Extensions và bằng chứng là luôn có một folder riêng để quản lý nó. 
Qua nhiều năm làm việc tôi đã có một folder Extensions với số lượng file khá lớn, cho đủ các đối tượng khác nhau. NSLayoutContraints, UILabel, UIButton, UIColor, UIView ......
Vì tất cả các methods, properties đều rất hữu ích và có thể sử dụng nhiều lần nên tôi đã mang folder từ project sang project khác để nhằm bổ sung các methods cần thiết.
Nhưng chưa có gì là đủ, đúng với cái tên Extentions :D (mở rộng). Nó cứ rộng mãi, rộng mãi mà chưa đến hồi kết. Mỗi lần thêm một project mới là tôi lại vào folder đó để thêm methods, properties và thêm đối tượng. 
Có khoảnh khắc 5 phút trong cuộc đời, tôi đã nghĩ rằng bao giờ là đủ cho folder đó để tôi có thể share nó lên github hoặc bất kỳ đâu đó để các đồng nghiệp có thể sử dụng. Nhưng tính cầu toàn của tôi chưa cho tôi làm việc đó. Bởi vì như tôi đã chia sẻ: Tôi thấy chưa bao giờ là đủ cả ! 
Bất ngờ phát hiện được SwifterSwift trên github. Tôi vào xem và đã cũng đã có chút ghen tỵ mỏng nhẹ. Ghen tỵ vì nó giống với ý tưởng của tôi, nó đập tan dự định của tôi bấy lâu nay. 
Ghen tỵ tiếp theo là SwitfterSwift là tổng hợp Extensions khá đầy đủ. Nó bao gồm 62 files tương ứng với 62 đối tượng khác nhau.

 ![](https://images.viblo.asia/22144b29-b1dd-40c7-a90a-0df7aa28e293.png)

![](https://images.viblo.asia/7088ec5c-65cb-4f10-995c-9888604db94b.png)

Bên trong các files tôi đã check và sử dụng. Có khá nhiều methods giống tôi nhưng có khá nhiều methods và properties tôi chưa có. Khi dùng SwifterSwift tôi cảm thấy cái folder kia của tôi sao nó lại vô giá trị đến thế :D. Ai cũng có chung ý tưởng và ấp ủ như mình, hay đá qua SwifterSwift để trải nghiệm nhé. Chắc hẳn các bạn cũng có cảm giác giống như tôi lúc này :)). 
Điều đặc biệt hơn nữa là khi tôi install SwifterSwift thì thấy ngoài các files Extensions như trên tôi đã chia sẻ, thì trong đó còn các folders như AppKit, CoreGraphics, CoreLocation, ... Nhưng chưa có files gì ở versions này. Chắc hẳn tác giả đang có ý định phát triển thêm trong tương lai và hứa hẹn tính hữu ích cho các dev IOS. 

![](https://images.viblo.asia/da2a8f91-4ee0-45a7-81a4-3d09615a6552.png)

**II. Cài đặt**

Để install và sử dụng SwifterSwift rất đơn giản thôi. Như bao framework khác thì: 
-  Nếu các bạn dùng CocoaPod chỉ cần thêm   pod 'SwifterSwift' vào Podfile rồi install là được. 
- Carthage :   Thêm  github "SwifterSwift/SwifterSwift" vào Cartfile 
- Swift Package Manager:  Các bạn add 
> import PackageDescription
> 
> let package = Package(
>     name: "YOUR_PROJECT_NAME",
>     targets: [],
>     dependencies: [
>         .package(url: "https://github.com/SwifterSwift/SwifterSwift.git", from: "4.0.0")
>     ]
> )

vào Package.swift. 

- Còn manual thì đơn giản chỉ cần download từ link github : https://github.com/SwifterSwift/SwifterSwift sau đó các bạn kéo vào project và sử dụng. 

**III. Kết luận**

- Tuy có một nhược điểm rằng : Vì có quá nhiều đối tượng cũng như methods hay properties nên việc chúng ta không thể biết hết được đã có các methods hay properties mình muốn thêm chưa để sử dụng. 
- Nhưng chỉ cần chịu khó check và đọc hiểu thì việc ghi nhớ là điều hết sức đơn giản. Tôi tin chắc khi check các methods trong SwifterSwift bạn sẽ không khỏi bất ngờ bởi vì có rất nhiều methods chúng ta cứ viết đi viết lại thành một func trong một class mà quên rằng chúng ta có thể tối giản nó bằng cách đưa chúng vào Extensions. 
- Chúc các bạn có trải nghiệm tốt khi sử dụng SwifterSwift. 
Đây là link github của SwifterSwift: https://github.com/SwifterSwift/SwifterSwift