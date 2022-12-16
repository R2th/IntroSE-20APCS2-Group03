Xin chào mọi người ngày hôm nay mình sẽ hướng dẫn mọi người cách để có thể tạo ra các mã QR Code trong SwiftUI sẽ như thế nào nhé. 
Video dưới sẽ là demo về ứng dụng ta sẽ làm trong ví dụ lần này.
{@embed: https://www.youtube.com/watch?v=lbSb40_GooU}
# Tạo UI cho ứng dụng
![](https://images.viblo.asia/ce7db6df-c0f3-46af-ad81-c53bc842b54d.png)
Ta có thể thấy thì UI cho ứng dụng này rất đơn giản ta chỉ có hai thành phần chính đó chính là Image và TextField.
Hai thằng này đảm nhiệm các công việc như sau: 
- TextField: Nhận Văn bản (Chuỗi) mà bạn muốn tạo làm mã QR.
- Image: Hiển thị Hình ảnh của mã QR đã tạo cho User thấy. 

```swift
                VStack {
                    HStack {
                        Spacer()
                        Image(uiImage: imageQR)
                            .resizable()
                            .scaledToFill()
                            .frame(width: geometry.size.height * 0.4,
                                   height: geometry.size.height * 0.4)
                            .shadow(radius: 10)
                            .border(Color.black, width: 4)
                        Spacer()
                    }
                    .padding(.bottom, Constants.spacingTopView)

                    TextField(Constants.detailQRPlaceHolder, text: $contentTextView)
                                            .padding(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/, /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
                                            .background(Color.white)
                                            .padding(.horizontal, 16)
                                            .background(
                                                RoundedRectangle(cornerRadius: 25)
                                                    .fill(Color.white)
                                                    .shadow(color: Color.black, radius: 2, x: 0, y: 2)
                                            )
                                            .padding(.all, 8)

                    Spacer()
                }
                .padding(.top, Constants.spacingTopView)
```
# Tạo Action cho demo 
Thì ở trong demo lần này mình sẽ sử dụng Combine với mô hình MVVM để có thể thiết lập cho ứng dụng.
## View
Nên ở thằng view ta sẽ cần phải tạo ra hai thằng đó chính là: 
```swift
    @SubjectBinding private var contentTextView = ""
    @State private var imageQR = UIImage()
```
Cái đầu tiên là một trigger mỗi khi user nhập một ký tự nào đó trên cái TextField thì nó sẽ bắn một cái sự kiện là nội dung hiện tại của TextView cho các subscribers đăng ký nhận thông báo từ nó.

Còn thằng imageQR là một @State thì khi ta thay đổi giá trị thì nó cũng sẽ thay đổi các UI có dùng đến giá trị này trong View.

Sau khi ta đã có các dữ liệu input cần thiết thì ta sẽ gửi các input đó qua bên ViewModel để sử lý. Nó sẽ xử lý theo dạng như sau 

- Nhận Văn bản (Chuỗi) mà bạn muốn tạo làm mã QR

- Chuyển văn bản thành dữ liệu

- Tạo đối tượng CIFilter (Bộ lọc hình ảnh lõi)

- Thêm dữ liệu vào bộ lọc

- Tạo đối tượng CIImage từ đối tượng CIFilter

- Chuyển đổi CIImage thành đối tượng UIImage

- Hiển thị Hình ảnh với Dữ liệu nhận được từ đối tượng UIImage
```swift
init(viewModel: ContentViewModel) {
        self.viewModel = viewModel
        let input = ContentViewModel.Input(contentQRText: _contentTextView.anyPublisher())
        self.output = viewModel.bind(input)
    }
```
## ViewModel
Để tạo được mã QRCode trong SwiftUI này thì ta sẽ sử dụng đến một thằng thư viện có sẵn trong Swift đó chính là: CoreImage.CIFilterBuiltins
Chúng ta cần hai thuộc tính để lưu trữ ngữ cảnh Core Image đang hoạt động và một phiên bản của bộ lọc tạo mã QR của Core Image
```swift
    let context = CIContext()
    let filter = CIFilter.qrCodeGenerator()
```
Ở đây qrCodeGenerator là bộ lọc chúng ta sẽ sử dụng để tạo Mã QR. Apple cũng cung cấp cho chúng tôi một số tùy chọn bộ lọc như ở đây.
[ document apple](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/uid/TP40004346)
```swift
func generateQRCode(from string: String) -> UIImage {
        let data = Data(string.utf8)
        filter.setValue(data, forKey: "inputMessage")

        if let outputImage = filter.outputImage {
            if let cgimg = context.createCGImage(outputImage, from: outputImage.extent) {
                return UIImage(cgImage: cgimg)
            }
        }

        return UIImage(systemName: "xmark.circle") ?? UIImage()
    }
```
Ở đây ta đang đính kèm biến dữ liệu vào biến bộ lọc với khóa “inputMessage”. Dữ liệu được thêm bằng khóa inputMessage sẽ là mã QR.
[document apple](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIQRCodeGenerator)

```swift
struct Input {
        let contentQRText: AnyPublisher<String, Never>
    }

    struct Output {
        let qrData: AnyPublisher<UIImage, Never>
    }

    func bind(_ input: Input) -> Output {
        let qrData = input.contentQRText
            .map { generateQRCode(from: $0) }
            .eraseToAnyPublisher()

        return Output(qrData: qrData)
    }
```

Sau đó ở hàm bind nơi nhận input và trả về output cho bên view. Thì ta sẽ gọi cái hàm ở trên ra nó sẽ nhận dữ liệu text input từ bên view sau đó trả về cho ta một cái UIImage.
Ta sẽ lấy cái image trả về và hiển thị lại lên image trên view của ta. 

Đến đây thì demo của ta đã xong rồi chúc các bạn thành công.:grinning::grinning:

Tham khảo mã nguồn demo tại đây: https://github.com/thanduchuy/SwiftUI-GeneratorQRCode

Bài viết tham khảo từ: https://www.hackingwithswift.com/books/ios-swiftui/generating-and-scaling-up-a-qr-code