![](https://images.viblo.asia/be803303-3669-47bd-acfc-92325c765ba5.jpeg)

Việc nhận biết dòng máy mà khách hàng đang sử dụng được coi là một cách để phân tích hiệu năng hoạt động của ứng dụng và phân khúc khách hàng. Tuy nhiên, Apple không hề cung cấp một API chính thống để lấy chính xác thông tin này.

Bài viết này sẽ cung cấp một mẹo nhỏ để ta có thể phân biệt loại thiết bị khách hàng đang sử dụng gì iPhone X, iPhone 8, iPad hay Apple TV.

UIDevice là class chứa thông tin về thiết bị đang sử dụng.
Ta có thể dựa vào thuộc tính **model** của class này để lấy thông tin về dòng máy đang sử dụng. Thuộc tính này được lưu trữ dưới dạng **string** ví dụ như "iPhone", "iPod Touch".

Ngoài ra class này còn có thuộc tính **name** để định danh thiết bị. Nhưng ta không thể sử dụng thuôc tính này do 2 lý do sau:
- Giá trị này sẽ có giá trị ngẫu nhiên như “My iPhone XX”, hoặc “XX’s iPad” nếu để cấu hình mặc định của nhà sản xuất.
- Giá trị này có thể thay đổi thông qua việc cấu hình trong “Settings” -> “General” -> “About” -> “Name” của thiết bị

Để lấy thông tin chi tiết hơn, phân biệt thiết bị này là iPhone XR hay iPhone XS, ta cần phải dựa vào mã định danh của thiết bị. Ví dụ: "iPhone7,3", “AppleTV5,3”.

Ta có thể sử dụng đoạn code dưới đây để lấy thông tin này:

```
func machineName() -> String {
  var systemInfo = utsname()
  uname(&systemInfo)
  let machineMirror = Mirror(reflecting: systemInfo.machine)
  return machineMirror.children.reduce("") { identifier, element in
    guard let value = element.value as? Int8, value != 0 else { return identifier }
    return identifier + String(UnicodeScalar(UInt8(value)))
  }
}
```

Đoạn code trên sẽ trả về mã thiết bị dưới dạng **string**. Nhưng mã thiết bị này sẽ khó nhớ và phổ thông nên đoạn code dưới đây sẽ chuyển từ mã thiết bị sang tên thiết bị tương ứng:

```
import SystemConfiguration
import UIKit

public extension UIDevice {
  static let modelName: String = {
    var systemInfo = utsname()
    uname(&systemInfo)
    let machineMirror = Mirror(reflecting: systemInfo.machine)
    let identifier = machineMirror.children.reduce("") { identifier, element in
      guard let value = element.value as? Int8, value != 0 else { return identifier }
      return identifier + String(UnicodeScalar(UInt8(value)))
    }
    
    func mapToDevice(identifier: String) -> String {
      #if os(iOS)
      switch identifier {
      case "iPod5,1":                                 return "iPod Touch 5"
      case "iPod7,1":                                 return "iPod Touch 6"
      case "iPhone3,1", "iPhone3,2", "iPhone3,3":     return "iPhone 4"
      case "iPhone4,1":                               return "iPhone 4s"
      case "iPhone5,1", "iPhone5,2":                  return "iPhone 5"
      case "iPhone5,3", "iPhone5,4":                  return "iPhone 5c"
      case "iPhone6,1", "iPhone6,2":                  return "iPhone 5s"
      case "iPhone7,2":                               return "iPhone 6"
      case "iPhone7,1":                               return "iPhone 6 Plus"
      case "iPhone8,1":                               return "iPhone 6s"
      case "iPhone8,2":                               return "iPhone 6s Plus"
      case "iPhone9,1", "iPhone9,3":                  return "iPhone 7"
      case "iPhone9,2", "iPhone9,4":                  return "iPhone 7 Plus"
      case "iPhone8,4":                               return "iPhone SE"
      case "iPhone10,1", "iPhone10,4":                return "iPhone 8"
      case "iPhone10,2", "iPhone10,5":                return "iPhone 8 Plus"
      case "iPhone10,3", "iPhone10,6":                return "iPhone X"
      case "iPhone11,2":                              return "iPhone XS"
      case "iPhone11,4", "iPhone11,6":                return "iPhone XS Max"
      case "iPhone11,8":                              return "iPhone XR"
      case "iPad2,1", "iPad2,2", "iPad2,3", "iPad2,4":return "iPad 2"
      case "iPad3,1", "iPad3,2", "iPad3,3":           return "iPad 3"
      case "iPad3,4", "iPad3,5", "iPad3,6":           return "iPad 4"
      case "iPad4,1", "iPad4,2", "iPad4,3":           return "iPad Air"
      case "iPad5,3", "iPad5,4":                      return "iPad Air 2"
      case "iPad6,11", "iPad6,12":                    return "iPad 5"
      case "iPad7,5", "iPad7,6":                      return "iPad 6"
      case "iPad2,5", "iPad2,6", "iPad2,7":           return "iPad Mini"
      case "iPad4,4", "iPad4,5", "iPad4,6":           return "iPad Mini 2"
      case "iPad4,7", "iPad4,8", "iPad4,9":           return "iPad Mini 3"
      case "iPad5,1", "iPad5,2":                      return "iPad Mini 4"
      case "iPad6,3", "iPad6,4":                      return "iPad Pro (9.7-inch)"
      case "iPad6,7", "iPad6,8":                      return "iPad Pro (12.9-inch)"
      case "iPad7,1", "iPad7,2":                      return "iPad Pro (12.9-inch) (2nd generation)"
      case "iPad7,3", "iPad7,4":                      return "iPad Pro (10.5-inch)"
      case "iPad8,1", "iPad8,2", "iPad8,3", "iPad8,4":return "iPad Pro (11-inch)"
      case "iPad8,5", "iPad8,6", "iPad8,7", "iPad8,8":return "iPad Pro (12.9-inch) (3rd generation)"
      case "AppleTV5,3":                              return "Apple TV"
      case "AppleTV6,2":                              return "Apple TV 4K"
      case "AudioAccessory1,1":                       return "HomePod"
      case "i386", "x86_64":                          return "Simulator \(mapToDevice(identifier: ProcessInfo().environment["SIMULATOR_MODEL_IDENTIFIER"] ?? "iOS"))"
      default:                                        return identifier
      }
      #elseif os(tvOS)
      switch identifier {
      case "AppleTV5,3": return "Apple TV 4"
      case "AppleTV6,2": return "Apple TV 4K"
      case "i386", "x86_64": return "Simulator \(mapToDevice(identifier: ProcessInfo().environment["SIMULATOR_MODEL_IDENTIFIER"] ?? "tvOS"))"
      default: return identifier
      }
      #endif
    }
    
    return mapToDevice(identifier: identifier)
  }()
}
```

Thông tin mã thiết bị ta có thể tra tại địa chỉ sau: https://www.theiphonewiki.com/wiki/Models

Giờ ta có thể dễ dàng lấy thông tin của thiết bị thông qua cách gọi hàm sau:
`let modelName = UIDevice.modelName`

Cách làm trên sẽ có một rủi ro do việc lấy thông tin thiết bị hoàn toàn thực hiện trên thiết bị của người dùng, nhưng thông tin mã thiết bị có thể thay đổi theo thời gian. Nên ta có thể đẩy phần tra cứu thông tin thiết bị lên một Web API để dễ dàng cập nhật trong tương lai.

**Nguồn tham khảo:**
- https://medium.com/ios-os-x-development/get-model-info-of-ios-devices-18bc8f32c254
- https://stackoverflow.com/questions/26028918/how-to-determine-the-current-iphone-device-model
- https://stackoverflow.com/questions/26028918/how-to-determine-the-current-iphone-device-model