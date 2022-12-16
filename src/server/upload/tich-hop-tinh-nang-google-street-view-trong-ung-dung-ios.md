# Giới thiệu
Google Street View - là công nghệ cho phép sử dụng giao diện panorama để hiện thị các tòa nhà, và đường phố, là một trong những tính năng dựng sẵn của Google Map.

Google Street View có thể áp dụng cho nhiều loại ứng dụng khác nhau có thể kể ra như:
- Các ứng dụng du lịch
-  Ứng dụng Sport and Fitness - Google Street View cho phép hiển thị trực quan thành phố theo lộ trình của người dùng
-  Ứng dụng Bán hàng trực tuyến và giao hàng.

Trong bài viết này ta sẽ cùng nhau từng bước tích hợp chức năng này vào ứng dụng iOS.
- Cài đặt thư viện Google Maps
- Làm việc với Google Street View
- Cài đặt vị trí máy quay để hiện thị đối tượng mong muốn
- Chạy thử ứng dụng Google Street View

# Khởi tạo dự án
Bài viết sẽ tạo một ứng dụng Swift đơn giản
![](https://images.viblo.asia/18f48b12-9ceb-4f22-8dad-527730d26975.PNG)

Cài đặt thư viện Google Maps cho dự án. Ta có thể cài đặt thông qua Pod bằng cấu hình dưới đây
```
target 'GoogleStreetViewSample' do
  use_frameworks!
  pod 'GoogleMaps'
end
```

# Khai báo Google API Key
Để lấy API Key cho Google Map, ta cần truy cập vào địa chỉ  https://console.developers.google.com
Sau đó tạo mới dự án như hình dưới đây:
![](https://images.viblo.asia/fe3904e8-3999-4346-bc9a-1375bc65251f.PNG)

Dự án mới tạo sẽ hiển thị trong trang dashboard, chọn nút "Enable API" để tích hợp các tính năng của Google API
![](https://images.viblo.asia/f4f7cbd6-032d-41b7-8516-a5f0d5a79ef6.PNG)

Lựa chọn "Google Máp SDK for iOS" để tích hợp chức năng Google Map.
![](https://images.viblo.asia/da2b1692-0b9a-44ba-a357-89f487d4ef35.PNG)

Sau đó ấn nút "Enable" để kích hoạt chức năng Google Map cho dự án.
![](https://images.viblo.asia/e6f8be2b-2ecb-4628-b929-96dfda8948c8.PNG)

Trên trang chủ của Google Console, vào tab Credentials,  chọn mục “Create Credentials”, sau đó chọn “API key” để tạo API Key cho dự án
![](https://images.viblo.asia/42fdd3e4-aef9-414a-8848-74217bf3a196.png)

Vào mục** API Key Settings**, chọn nút **Edit**
![](https://images.viblo.asia/13fe9baf-0064-4bd6-8475-e193854563b0.png)https://images.viblo.asia/13fe9baf-0064-4bd6-8475-e193854563b0.png

Ta cần giới hạn phạm vi sử dụng API Key cho ứng dụng iOS demo này bằng cách điền Bundle ID của dự án như hình dưới đấy:
![](https://images.viblo.asia/d26af0c3-866e-4b75-9720-0db18c66fd6a.PNG)https://images.viblo.asia/d26af0c3-866e-4b75-9720-0db18c66fd6a.PNG


# Cấu hình Google Street View

Trong file AppDelegate.swift, thêm các dòng code sau để khởi tạo Google Maps SDK, và cấu hình Google API Key

```
import GoogleMaps
....
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    
    GMSServices.provideAPIKey("<your API key>")
    return true
}
```

Ta có thể thêm Google Street View vào View Controller thông qua giao diện Interface Builder bằng, kéo thả UIView vào View Controller, sau đó đổi custom class thành **GMSPanoramaView** như hình dưới đây:
![](https://images.viblo.asia/d7d19e58-5368-4e9b-ae95-181b4734e0e3.png)

Tạo một IBOutlet cho Google Street View để tiện cho việc sử dụng trong code
![](https://images.viblo.asia/28858238-df83-478e-93ff-28dcb445ef00.png)

Để khởi tạo tọa độ định vị trên Google Street View, ta sử dụng đoạn code sau:
```
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    googleStreetView.moveNearCoordinate(CLLocationCoordinate2D(latitude: 37.3317134, longitude: -122.0307466))
}
```

Kết quả ta sẽ có giao diện như sau:
![](https://images.viblo.asia/b8963454-5d06-4c66-ab27-31858c7e9728.png)

Để điều chỉnh hướng và góc nhín của camera, ta sử dụng đoạn code sau:
```
override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 2) {
        self.panoramaView.animate(to: GMSPanoramaCamera(heading: 90, pitch: 0, zoom: 1), animationDuration: 2)
    }
}
```
**GMSPanoramaCamera** sử dụng để điều chỉnh góc nhìn của **GMSPanoramaView**. Nó cho phép điều chỉnh 3 thông số sau:
- heading - Góc quay của camera (có giá trị từ 0 đến 360)
- pitch - Góc nhìn của camera (có giá trị từ - 90 đến 90)
- zoom - có giá trị từ 1 đến 5

Hình dưới đây để mô tả rõ hơn ý nghĩa của giá trị heading đối với Google Street View
![](https://images.viblo.asia/e369280c-185b-425d-a0ac-dd23de34069d.png)


Còn hình dưới đây sẽ giải thích rõ hơn ý nghĩa của thông số Pitch
![](https://images.viblo.asia/a14f6134-1fc0-4c75-8dc1-f9f2ded9843b.png)

# Xử lý sự kiện trên Google Street View
Google Street View cho phép nhận và xử lý khi phát sinh các sự kiện như panorama thay đổi, phát sinh sự kiện người dùng hoặc có phát sinh lỗi khi hiển thị.
Các sự kiện phát sinh được Xử lý qua protocol **GMSPanoramaViewDelegate**
```
extension ViewController: GMSPanoramaViewDelegate {
    func panoramaView(_ view: GMSPanoramaView, error: Error, onMoveNearCoordinate coordinate: CLLocationCoordinate2D) {
        print(error.localizedDescription)
    }
}
```

# Nguồn tham khảo và chương trình Demo
- Nguồn tham khảo: https://www.appcoda.com/google-street-view-ios/
- Mã nguồn chương trình: https://github.com/oLeThiVanAnh/R2-2019