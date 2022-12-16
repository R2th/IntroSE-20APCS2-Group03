Từ phiên bản 10.3 của iOS, Apple đã ra mắt một tính năng khá ngầu cho phép lập trình viên có thể lập trình để thay đổi app icon. Tuy nó không được linh hoạt như ứng dụng Clock của Apple, ta vẫn có thể tận hưởng được hiệu ứng lạ mắt của nó.

### Lý thuyết

Dựa vào tài liệu API của Apple, ta cần chú ý đến những phương thức sau:

```
var supportsAlternateIcons: Bool { get }
var alternateIconName: String? { get }
func setAlternateIconName(String?, completionHandler: ((Error?) -> Void)? = nil)
```

Trong đó:
- supportsAlternateIcons là một thuộc tính readonly, nó sẽ quyết định việc app có thể thay đổi app icon hay không. Để gán giá trị true cho nó, ta cần thiết lập alternative icons trong file info.plist.
- alternateIconName cũng là một thuộc tính readonly, nó là tên của app icon hiện tại đang được hiển thị. Lưu ý rằng nó có giá trị nil khi app đang hiển thị icon chính của app.
- setAlternateIconName là function dùng để cài đặt icon để hiển thị. Nếu ta gán nil cho nó, app sẽ hiển thị icon chính.

### Demo

Tạo mới project tên là FunFaces, sau đó tạo ra 3 icon và đặt tên là "boy.png", "girl.png", "baby.png", lưu ý là không đặt icon ở trong Assets folder, mà đặt chúng ở ngay bên trong project như hình bên dưới:

![](https://images.viblo.asia/45c97985-eb45-4626-a4fe-b2ff58029b94.png)

Tiếp theo, ta sẽ thiết lập một số thông tin trong file Info.plist:
- Thêm thuộc tính Icon files (iOS 5) trong Information Property List
- Add CFBundleAlternateIcons như một dictionary, thư mục này dùng để lưu trữ những icon
- Tạo ba dictionary tương ứng với ba icon, và trong từng dictionary này, ta sẽ thêm hai thuộc tính UIPrerenderedIcon và CFBundleIconFiles, hai thuộc tính này cần được cấu hình như sau:

![](https://images.viblo.asia/b4e5bbdc-628d-4487-b25b-ee31faa55976.png)

Để thay đổi app icon, app sẽ nhận chỉ thị từ phía người dùng, vì vậy trong demo này, ta sẽ tạo ra ba button tương ứng với ba icon. Khi người dùng kích vào nút nào thì icon tương ứng sẽ được chọn để làm app icon.

```
// change app icon to "boy"
@IBAction func boyButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "boy")
}

// change app icon to "baby"
@IBAction func babyButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "baby")
}

// change app icon to "girl"
@IBAction func girlButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "girl")
}

func changeIcon(to iconName: String) {
  guard UIApplication.shared.supportsAlternateIcons else {
    return
  }

  UIApplication.shared.setAlternateIconName(iconName, completionHandler: { (error) in
    if let error = error {
      print("App icon failed, error: \(error.localizedDescription)")
    } else {
      print("App icon changed successfully")
    }
  })
}
```

Đầu tiên, ta sẽ kiểm tra xem ứng dụng có hỗ trợ alternating app icon hay không, sau đó nếu có, thì sẽ thay đổi app icon với icon được chọn.

Bây giờ hãy chạy app và cùng xem kết quả nhé.

{@embed: https://www.youtube.com/watch?v=Vshs9uTXwPw&feature=youtu.be}

Ngoài ra, việc cho phép người dùng reset lại icon chính của app là điều cần thiết, vì vậy, ta có thể tạo thêm một nút "Reset", khi nhấn vào nút này, ta sẽ gọi đến function setAlternateIconName và gán nil cho nó.