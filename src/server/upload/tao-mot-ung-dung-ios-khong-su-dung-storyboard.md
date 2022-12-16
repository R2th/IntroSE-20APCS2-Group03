Như chúng ta đã biết, IDE XCode mặc định tạo một Project sử dụng Storyboard. Việc bỏ storyboard ra khỏi Project là tương đối khó khăn đối với người mới làm quen với iOS, 
Trong bài viết này, ta sẽ từng bước để tạo một ứng dụng iOS mà không sử dụng storyboard.

Khi tạo tạo một Project mới, XCode sẽ tạo ra một Project có kiến trúc như sau:
![](https://images.viblo.asia/dc0db1d5-899f-4cce-9ec0-d1ce15b70cf6.png)

Và mặc định Project này sẽ sử dụng Storyboard để khởi tạo ứng dụng. Việc sử dụng Storyboard cũng đem lại nhiều ưu điểm như giúp chúng ta dễ dàng quản lý các màn hình, các đối tượng giao diện trên các màn hình, nắm bắt được kịch bản chuyển màn hình thông qua giao diện tương tác của XCode.

Ví dụ như hình dưới đây:
![](https://images.viblo.asia/f57b9dbf-8f92-49f3-bbc4-d8836dfd28df.png)

Thông qua Storyboard ta dễ dàng xây dựng một ứng dụng gồm 3 màn hình và nắm được trình tự chuyển màn hình của nó.

Nhưng bên cạnh đó Storyboard sẽ không phù hợp cho một số tình huống sau:

# Khi nào không nên sử dụng Storyboard
- Khi làm việc theo nhóm và sử dụng công cụ quản lý source code (version control) như SVN, GIT
- Khi giao diện có thiết kê phức tạp
- Khi muốn dễ dàng quản lý các ràng buộc trên giao diện
- Khi muốn tái sử dụng các View Controller và tổ chức các thư mục trong dự án.

Khi không sử dụng Storyboard, ứng dụng iOS của chúng ta sẽ sử dụng XIB và tạo giao diện bằng code.

Giờ ta sẽ từng bước tạo và chỉnh sửa để Project iOS không sử dụng Storyboard:

# Bước 1: Tạo một Project iOS mới.
Trong ví dụ này ta sẽ tạo một ứng dụng Single View Application, sử dụng ngôn ngữ Swift

# Bước 2: Xóa file Storyboard
Trong cửa sổ Project Navigator, kích chuột phải vào file Storyboard và chọn delete để xóa file Storyboard ra khỏi Project.

![](https://images.viblo.asia/26658128-0d7d-4d0a-ae2e-4c160929dfa0.png)

# Bước 3: Xóa giao diện chính trong Development Info

Sau khi xóa file Storyboard, thì ứng dụng của bạn sẽ vẫn sẽ tìm file storyboard khi khởi chạy. Ta cần phải thực hiện thêm một bước nữa để Project không tìm file Storyboard nữa bằng cách:
- Trong cửa sổ Project Navigator, kích chọn thư mục gốc của dự án
- Lựa chọn mục Genneral > Deployment Info, xóa nội dung trong trường Main Interface để dự án không load file Storyboard nữa.

![](https://images.viblo.asia/ca164e5f-41ff-48c2-9305-f77b2f2e8bd1.png)

# Bước 4: Thay thế Story Board
Sau những bước trên, ứng dụng của chúng ta sẽ chỉ hiển thị màn hình đen. Chúng ta sẽ cần phải khởi tạo Window và giao diện hiển thị trên nó.

Phần khởi tạo này chúng ta sẽ đặt trong **AppDelegate** 

Trước hết ta sẽ khởi tạo Window cho màn hình chính như đoạn code dưới đây:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)   
    return true
}
```

Tiếp đến ta sẽ khởi tạo ViewController mà ta mong muốn hiển thị đầu tiên trong ứng dụng. Đoạn code dưới đây sẽ khởi tạo một ViewController đơn giản, có nền màu đỏ

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)
    let homeViewController = UIViewController()
    homeViewController.view.backgroundColor = UIColor.red
    return true
}
```

Sau đó ta sẽ đặt root view controller của Window chính là ViewController đã tạo được ở trên.
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)
    let homeViewController = UIViewController()
    homeViewController.view.backgroundColor = UIColor.red
    window!.rootViewController = homeViewController
    window!.makeKeyAndVisible()
    return true
}
```

Giờ ứng dụng của ta đã có thể hiển thị mà không cần Story Board nữa.

# Mã nguồn và tham khảo
- Mã nguồn: https://github.com/oLeThiVanAnh/R12_2018
- Nguồn tham khảo: https://medium.com/ios-os-x-development/ios-start-an-app-without-storyboard-5f57e3251a25