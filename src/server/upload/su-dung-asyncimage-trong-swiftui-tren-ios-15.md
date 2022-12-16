# I. Giới thiệu

Trong hội nghị cho các nhà phát triển WWDC 2021, Apple đã giới thiệu rất nhiều feature mới cho SwiftUI để giúp chúng ta code dễ dàng hơn. Trong số những feature đó, AsyncImage chắc chắn là một trong những feature hữu ích nhất. Sử dụng AsyncImage, việc download và hiển thị ảnh từ server sẽ cực kỳ đơn giản, chúng ta không phải sử dụng các thư viện ngoài, hoặc viết thêm nhiều đoạn code logic để tự mình xử lý các công việc bên trên nữa. Tất cả giờ đây được xử lý bởi AsyncImage, 1 built-in lib của SwiftUI.

Sau đây, chúng ta sẽ cùng nhau tìm hiểu cách sử dụng AsyncImage.

# II. Nội dung

## 1. Chuẩn bị

Tại thời điểm tôi viết bài này, iOS 15 và Xcode 13 đều chưa được ra mắt chính thức. Để tiếp tục bài viết này, các bạn cần có Xcode 13 beta được cài đặt trong máy. Các bạn có thể download Xcode 13 beta [tại đây](https://developer.apple.com/xcode/resources/)

Sau khi tải và cài đặt xong Xcode 13, các bạn tạo project mới với tên AsyncImage và Interface là SwiftUI. Sau khi tạo project, chúng ta sẽ có 2 file .swift: 
* AsyncImageApp.swift
* ContentView.swift

Lạ phải không? Không còn file `SceneDelegate.swift` và `AppDelegate.swift` nữa. Từ trước tới giờ chúng ta đã quá quen với việc xử lý các life circle action của App trong AppDelegate (enter background, foreground), bây giờ chỉ còn lại `AsyncImageApp.swift`, đây lại là 1 struct với cách code na ná như View của SwiftUI. Nhưng thôi,  bài viết này chúng ta đang tìm hiểu về AsyncImage, nên life circle sử dụng `AsyncImageApp.swift` chúng ta sẽ cùng nhau tìm hiểu trong bài khác nhé. Bây giờ các bạn chỉ cần tập chung vào file `ContentView.swift`.

## 2. Cách dùng AsyncImage

### a. Cách dùng cơ bản

AsyncImage là thư viện built-in của SwiftUI, nên cách dùng cơ bản cũng hết sức đơn giản. Để download và hiển thị ảnh, chúng ta viết code như sau:
```Swift
struct ContentView: View {
    let url = "https://cdn.24h.com.vn/upload/3-2021/images/2021-07-20/do-My-Linh-he-lo-so-tien-thi-hoa-hau-su-that-ve-viec-chi-tien-ty-thi-nhan-sac-169075924_10208368290480985_7135968650358886011_n-1626750413-433-width1364height2048.jpg"
    
    var body: some View {
        AsyncImage(url: URL(string: url))
    }
}
```
Bên trên, tôi lấy bừa 1 link ảnh em hoa hậu ở trên mạng. Nếu lúc các bạn thử link trên mà link die mất rồi thì thay bằng 1 link ảnh khác vào nhé. Kết quả chúng ta nhận được như hình sau:

![](https://images.viblo.asia/e34cabd4-2480-4996-9a29-384bf419c308.png)

Hình trên, chúng ta thấy ảnh có vẻ to, không hiển thị được hết ảnh. để hiển thị ảnh tốt hơn, các bạn sửa code như sau:
```Swift
	var body: some View {
        AsyncImage(url: URL(string: url), scale: 2)
    }
```
Kết quả được như hình sau:

![](https://images.viblo.asia/8f8cb729-5e91-4cbb-9b4d-1767131982f5.png)

Scale được định nghĩa trong thư viện như sau:
```
scale: The scale to use for the image. The default is `1`. Set a different value when loading images designed for higher resolution displays. For example, set a value of `2` for an image that you would name with the `@2x` suffix if stored in a file on disk.
```
Tức là với các device sử dụng ảnh @2x, @3x, chúng ta có thể sử dụng scale là 2 để Image hiển thị vừa đẹp trên màn hình. Các bạn có thể set scale nhỏ xuống để ảnh lớn lên, ví dụ để 0.5 chẳng hạn, ảnh sẽ to gấp 2 kích thước của scale là 1.

### b. Customize size, place holder

Nếu các bạn nghĩ thêm modifier frame(width:height:alignment:) cho SyncImage là có thể thay đổi frame của ảnh thì các bạn đã nhầm. Giả sử các bạn làm như sau:
```Swift
	var body: some View {
        AsyncImage(url: URL(string: url), scale: 2.0)
            .frame(width: 300, height: 500)
    }
```

Kết quả là kích thước của ảnh không thay đổi gì cả. Đơn giản là bởi vì chúng ta thay đổi frame của AsyncImage View, còn View của Image thì chưa đổi. Mà như chúng ta đã biết, để đổi Image thì cần set modifier .resizable cho Image.

Để thay đổi kích thước của ảnh, chúng ta cần làm như sau:
```Swift
	var body: some View {
        AsyncImage(url: URL(string: url)) { image in
			// 1
            image
                .resizable()
                .scaledToFill()
        } placeholder: {
			// 2
            Color.red.opacity(0.5)
        }
        .frame(width: 300, height: 500)	// 3
        .cornerRadius(10)
    }
```
Bên trên, chúng ta đã lần lượt làm các việc:
* 1. thêm các thuộc tính resizable, scaledToFill để ảnh có thể thay đổi kích thước, và fill image vừa khung, không bị méo ảnh.
* 2. Thêm placeholder cho ảnh trong quá trình chờ download. 
* 3. thêm modifer cho AsyncImage. khi Image đã được set resizable, thì AsyncImage có thể thêm các modifier (frame, cornerRadius) để thay đổi tuỳ ý.

Kết quả, chúng ta có được như hình sau:

![](https://images.viblo.asia/6b95f352-b421-439d-89ae-ae2a42a69d6e.png)

Bên trên, placeholder tôi đang để là Color, các bạn hoàn toàn có thể thay thế bằng ProgressView() để thêm loading animation cho quá trình download ảnh.

### c. Quản lý AsyncImage phase

Bên trên, với placeholder và image, các bạn có thể hiển thị quá trình loạding và hiển thị image khi download thành công. Bây giờ giả sử chúng ta cần hiển thị 1 ảnh mặc định trong trường hợp download lỗi thì sao? đó là lúc chúng ta cần biết đến các phase của AsyncImage. Cụ thể, chúng ta có enum `AsyncImagePhase` với các case sau:
* empty: image chưa được load, chúng ta có thể dùng trạng thái để build placeholder.
* success(Image): image được download thành công.
* failure(Error): image download thất bại. đây là chỗ chúng ta sẽ hiển thị ảnh lỗi với specs giả định bên trên. 

Chúng ta sẽ code như sau:
```Swift
	var body: some View {
        AsyncImage(url: URL(string: url)) { phase in
            switch phase {
			// 1
            case .empty:
                ProgressView()
            // 2
            case .success(let image):
                image
                    .resizable()
                    .scaledToFill()
            // 3
            case .failure(_):
                Image(systemName: "xmark")
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color.red)
            // 4
            @unknown default:
                Image(systemName: "xmark")
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color.red)
            }
        }
        .frame(width: 300, height: 500)
        .cornerRadius(10)
    }
```
Trong đoạn code bên trên:
* 1. Thêm ProgressView cho phase .empty. Tương đương với placeholder ở trên.
* 2. Xử lý cho phase .success: thêm modifier cho ảnh để có thể thay đổi kích thước ảnh.
* 3. xử lý cho phase .failure: thêm ảnh "xmark" để biểu thị download lỗi.
* 4. thêm case default: thêm ảnh "xmark" để biểu thị download lỗi.

Kết quả hiển thị không có gì khác bên trên vì chúng ta vẫn download thành công. Thử sửa url thành "abc.com" để ảnh download lỗi như sau:

```Swift
	var body: some View {
        AsyncImage(url: URL(string: "abc.com")) { phase in
		…
	}
```

Kết quả, chúng ta sẽ nhận được như hình sau:

![](https://images.viblo.asia/659b82e1-6500-45e4-819d-df71de3ee1ee.png)

### d. thêm animation hiển thị kết quả
Trong trường hợp, chúng ta cần thêm animation sau quá trình download, chúng ta có thể tạo AsyncImage với Transaction như sau:

```Swift
	var body: some View {
		// 1
        AsyncImage(url: URL(string: "abc.com"), transaction: Transaction(animation: .easeOut(duration: 2))) { phase in
            switch phase {
            case .empty:
                ProgressView()
                
            case .success(let image):
                image
                    .resizable()
                    .scaledToFill()
                    .transition(.slide) // 2
                
            case .failure(_):
                Image(systemName: "xmark")
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color.red)
                    .transition(.opacity) // 3
                
            @unknown default:
                Image(systemName: "xmark")
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color.red)
            }
        }
        .frame(width: 300, height: 500)
        .cornerRadius(10)
    }
```
Bên trên chúng ta làm các việc sau:
* 1. tạo AsyncImage với transaction parameter. Ở đây chúng ta tạo animation easeOut với duration 2s.
* 2. thêm animation cho phase success. Với animation này, ảnh sẽ bay ra khi download thành công.
* 3. thêm animation cho phase failure. Với animation này, ảnh download lỗi sẽ hiển thị mờ rồi tỏ dần khi download lỗi.

Các bạn hãy build app để nhìn animation nhé :D

# III. Kết luận

Trên đây tôi đã giới thiệu về AsyncImage và các cách để customize nó. Đây là một built-in struct nên việc sử dụng không hề khó khăn một chút nào, kể cả việc quản lý các phase, quản lý animation cũng cực kỳ đơn giản. Có lẽ nhược điểm lớn nhất của nó là chỉ có thể sử dụng trên iOS 15.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, chúc các bạn một ngày làm việc vui vẻ :)