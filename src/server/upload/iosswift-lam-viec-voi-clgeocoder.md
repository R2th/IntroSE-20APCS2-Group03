CLGeocoder class là 1 phần của framework Core Location và nó xuất hiện từ iOS 5 và macOS 10.8. Ban đầu, chức năng của lớp CLGeocoder bị giới hạn trong việc đảo ngược địa chỉ mã hóa địa lý thành tọa độ.  Tuy nhiên, kể từ iOS 8 và macOS 10.10, bạn cũng có thể tìm nạp tọa độ của các địa chỉ.  Trong hướng dẫn này, bạn tìm hiểu cách thực hiện cả bằng cách sử dụng Xcode 9 và Swift 4.

## Project Setup

Khởi chạy Xcode và tạo một ứng dụng mới dựa trên mẫu **Tabbed Application**.

![](https://images.viblo.asia/df76589e-c402-4a3d-9c96-1712a5e71d64.png)

Đặt tên cho dự án Geocoding, đặt Ngôn ngữ thành Swift và Thiết bị thành iPhone.

![](https://images.viblo.asia/193c34ef-39ba-409d-94c1-ad1cc5c581af.png)


Trước khi bắt đầu làm việc với lớp **CLGeocoder**, chúng ta cần thay đổi một vài thứ.  Xcode đã tạo ra hai lớp con **UIViewController** cho chúng tôi, **FirstViewController** và **SecondViewController**.  Đổi tên **FirstViewController** thành **ForwardGeocodingViewController** và **SecondViewController** thành **ReverseGeocodingViewController** .  Điều này cũng có nghĩa là bạn cần cập nhật tên tệp của các lớp này và tên lớp trong **Main.storyboard**.

## Lấy tọa độ địa lý với Swift

Chúng tôi bắt đầu với việc lấy tọa độ địa lý chuyển tiếp một địa chỉ.  Điều này có nghĩa là chúng tôi yêu cầu người dùng nhập địa chỉ mà ứng dụng tìm nạp tọa độ.
### Tạo giao diện người dùng

Mở ForwardGeocodingViewController.swift và tạo sáu outlets như hình dưới đây.  Các trường văn bản được sử dụng để nhập quốc gia, thành phố và đường phố của vị trí.  Ứng dụng sử dụng các giá trị này để chuyển tiếp mã địa lý tọa độ của vị trí.

```
import UIKit

class ForwardGeocodingViewController: UIViewController {

    // MARK: - Properties

    @IBOutlet var countryTextField: UITextField!
    @IBOutlet var streetTextField: UITextField!
    @IBOutlet var cityTextField: UITextField!

    @IBOutlet var geocodeButton: UIButton!
    @IBOutlet var activityIndicatorView: UIActivityIndicatorView!

    @IBOutlet var locationLabel: UILabel!

    // MARK: - View Life Cycle

    override func viewDidLoad() {
        super.viewDidLoad()
    }

}
```

Chúng ta cũng tạo một hành động, được gọi khi người dùng nhấn nút.  Hành động này xác nhận đầu vào và bắt đầu hoạt động mã hóa địa lý.  Chúng tôi để trống thực hiện bây giờ.
```
// MARK: - Actions

@IBAction func geocode(_ sender: UIButton) {

}
```

Như bạn thấy, giao diện người dùng khá cơ bản.  Đảm bảo rằng bạn kết nối các ổ cắm với các thành phần giao diện người dùng tương ứng và đừng quên kết nối sự kiện chạm vào nút bên trong bằng *geocode(_: )*
![](https://images.viblo.asia/a05508a0-d46f-4bf5-b028-f79c09bbfada.png)

### Xác thực đầu vào

Chúng ta chỉ muốn bắt đầu một hoạt động mã hóa địa lý nếu đầu vào của người dùng hợp lệ.  Mở ForwardGeocodingViewController.swift và cập nhật *geocode(_: )* như sau.

```
@IBAction func geocode(_ sender: UIButton) {
    guard let country = countryTextField.text else { return }
    guard let street = streetTextField.text else { return }
    guard let city = cityTextField.text else { return }

    print("\(country), \(city), \(street)")
}
```

### Chuyển mã địa lý
API của lớp CLGeocoder ngắn và dễ sử dụng.  Chúng tôi có ba tùy chọn để chuyển tiếp mã địa lý địa chỉ người dùng đã nhập trong các trường văn bản.

* geocodeAddressString(_:completionHandler:)
* geocodeAddressString(_:in:completionHandler:)
* geocodeAddressDictionary(_:completionHandler:)
Phương thức geocodeAddressString (_: completionHandler : ) là dễ sử dụng nhất, nhưng nó cũng dễ bị lỗi nhất.  Tại sao vậy?  Chúng tôi trao cho lớp CLGeocoder một địa chỉ dưới dạng một chuỗi.  Nó tùy thuộc vào khung vị trí cốt lõi và dịch vụ web mà nó giao tiếp, để tìm ra chuỗi thành phần địa chỉ nào trong chuỗi.

Một lựa chọn tốt hơn là sử dụng phương thức geocodeAddressString (_: in: completionHandler : ).  Ngoài chuỗi địa chỉ, phương thức chấp nhận một thể hiện CLRegion để thu hẹp hơn nữa vị trí mà người dùng quan tâm. Điều này rất hữu ích vì nó tránh được sự không khớp do các vị trí được đặt tên tương tự.

Tùy chọn thứ ba là sử dụng phương thức geocodeAddressDictionary (_: completionHandler : ).  Phương pháp này cho phép chúng tôi chỉ định một từ điển địa chỉ như được xác định bởi khung Địa chỉ, cung cấp cho khung Vị trí lõi thông tin chính xác hơn về vị trí chúng tôi quan tâm.

Trong bài viết này, chúng tôi sử dụng phương thức geocodeAddressString (_: completionHandler : ).  Hãy xem việc triển khai cập nhật của phương pháp geocode(_ : ) bên dưới.

```
@IBAction func geocode(_ sender: UIButton) {
    guard let country = countryTextField.text else { return }
    guard let street = streetTextField.text else { return }
    guard let city = cityTextField.text else { return }

    // Create Address String
    let address = "\(country), \(city), \(street)"

    // Geocode Address String
    geocoder.geocodeAddressString(address) { (placemarks, error) in
        // Process Response
        self.processResponse(withPlacemarks: placemarks, error: error)
    }

    // Update View
    geocodeButton.isHidden = true
    activityIndicatorView.startAnimating()
}
```

Chúng tôi tạo một chuỗi địa chỉ từ đầu vào của người dùng và gọi geocodeAddressString (_: completionHandler : ) trên một ví dụ CLGeocoder.  Trình xử lý hoàn thành, tham số thứ hai của geocodeAddressString (_: completionHandler : ), chấp nhận hai tham số, một mảng tùy chọn của các phiên bản CLPlacemark và một đối tượng Error.  Trong trình xử lý hoàn thành, chúng tôi gọi một phương thức của trình trợ giúp, processResponse(withPlacemarks: error : ).

Sau khi bắt đầu hoạt động mã hóa địa lý, chúng tôi ẩn nút và hiển thị cho người dùng chế độ xem chỉ báo hoạt động.  Điều này cho người dùng thấy tiến trình của hoạt động mã hóa địa lý.

khai báo một thuộc tính lazy, trình mã hóa địa lý, loại CLGeocoder.

```
lazy var geocoder = CLGeocoder()
```

Mặc dù việc triển khai processResponse(withPlacemarks: error : ) không khó, bạn có thể thấy rằng chúng tôi cần thực hiện một số kiểm tra trước khi chúng tôi có thể truy cập vào tọa độ của vị trí chúng tôi quan tâm. Tại sao vậy?

```
private func processResponse(withPlacemarks placemarks: [CLPlacemark]?, error: Error?) {
    // Update View
    geocodeButton.isHidden = false
    activityIndicatorView.stopAnimating()

    if let error = error {
        print("Unable to Forward Geocode Address (\(error))")
        locationLabel.text = "Unable to Find Location for Address"

    } else {
        var location: CLLocation?

        if let placemarks = placemarks, placemarks.count > 0 {
            location = placemarks.first?.location
        }

        if let location = location {
            let coordinate = location.coordinate
            locationLabel.text = "\(coordinate.latitude), \(coordinate.longitude)"
        } else {
            locationLabel.text = "No Matching Location Found"
        }
    }
}
```

 Nếu người dùng nhập địa chỉ không có thật hoặc mắc lỗi đánh máy, Core Location framework  có thể không thể tìm thấy vị trí cho địa chỉ.
 
 Chạy ứng dụng và quan sát kết quả đạt được.
 ![](https://images.viblo.asia/4a423181-f216-4acd-9cab-3452197f6654.png)
## Tổng kết
Bài viết được dịch lại từ https://cocoacasts.com/forward-geocoding-with-clgeocoder
Hy vọng những kiến thức trong bài viết sẽ đem lại những điều bổ ích cho bạn. Xin chào và hẹn gặp lại các bạn trong bài viết tới.