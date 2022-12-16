# Mở đầu:
Trong phát triển ứng dụng, Font chữ đóng vai trò quan trọng trong việc thiết kế giao diện. Việc lựa chọn font chữ phù hợp với giao diện UI sẽ giúp cho ứng dụng của chúng ta bắt mắt hơn và tiện lợi hơn trong việc sử dụng.
# Vấn đề:
Trong trường hợp dự án của bạn được giao cho khách hàng kiểm tra lần cuối trước khi được submit app lên Appstore. Cuối cùng app của bạn được khách hàng ok tuy nhiên chỉ cần chỉnh sửa nho nhỏ về font chữ hoặc size chữ cho to lên 1 size và bạn được giao task chỉnh sửa font chữ. Như thông thường bạn sẽ phải tìm từng UILabel hoặc UITextField trên từng StoryBoard trong dự án. Mọi việc sẽ rất dễ dàng nếu số màn hình ít nhưng tưởng tượng có đến hàng chục màn hình thì việc tìm sửa từng label là rất khó khăn. Để giải quyết task này một cách nhanh chóng chúng ta cần một biện pháp quản lý việc thay đổi font hoặc size chữ.

# Phương pháp:
* Bước 1: 
    - Mang các font chữ bạn cần vào trong dự án. Kéo thả các font chữ vào trong resource của dự án.

![](https://images.viblo.asia/0292e843-f642-4b35-a5b7-818eda0a38ba.png)
* Bước 2:
    *  Đăng ký các font chữ của bạn vào trong file Info.plist  dưới key là Fonts provided by application (UIAppFonts).

![](https://images.viblo.asia/f51c6053-c249-48aa-b9be-b0c63e38ca84.png)

* Bước 3:
    * Đảm bảo các font chữ bạn add vào project, bạn hãy kiểm tra font chữ đã được đăng ký hay chưa với function Utility.logAllAvailableFonts() .(Tất cả các font chữ có trong project sẽ được print ra ở debug console).

```

class Utility {
	
   /// Logs all available fonts from iOS SDK and installed custom font
   class func logAllAvailableFonts() {
      for family in UIFont.familyNames {
	  print("\(family)")
	  for name in UIFont.fontNames(forFamilyName: family) {
	      print("   \(name)")
	  }
       }
   }
}
// Roboto
//    Roboto-Thin
//    Roboto-Italic
//    Roboto-BlackItalic
//    Roboto-Light
//    Roboto-BoldItalic
//    Roboto-Black
//    Roboto-LightItalic
//    Roboto-ThinItalic
//    Roboto-Bold
//    Roboto-Regular
//    Roboto-Medium
//    Roboto-MediumItalic
```

# Cách sử dụng:
* Thông thường chúng ta đăng ký font chữ cũng như size chữ bằng cách khởi tạo sau  UIFont(name:size:).Chúng ta cần tránh hard code như vậy để dễ dàng trong việc thay đổi font chữ hay size chữ . Ta sẽ sử dụng 2 enum để làm việc này, một dùng để quán lý font chữ, một dùng để quản lý size chữ.
```
enum FontName: String {
    case RobotoBlack            = "Roboto-Black"
    case RobotoBlackItalic      = "Roboto-BlackItalic"
    case RobotoBold             = "Roboto-Bold"
    case RobotoBoldItalic       = "Roboto-BoldItalic"
    case RobotoItalic           = "Roboto-Italic"
    case RobotoLight            = "Roboto_Light"
    case RobotoLightItalic      = "Roboto-LightItalic"
    case RobotoMedium           = "Roboto-Medium"
    case RobotoMediumItalic     = "Roboto-MediumItalic"
    case RobotoRegular          = "Roboto-Regular"
    case RobotoThin             = "Roboto-Thin"
    case RobotoThinItalic       = "Roboto-ThinItalic"
}
enum StandardSize: Double {
    case h1 = 20.0
    case h2 = 18.0
    case h3 = 16.0
    case h4 = 14.0
    case h5 = 12.0
    case h6 = 10.0
}
```

* Enum FontName dùng để xử lý tất cả font ta đã thêm vào project. Enum StandardSize dùng để xử lý size chữ trong project.

* Một số trường hợp ta sẽ cần dùng system font hoặc các size chữ lớn hơn hoặc nhỏ hơn nên ta sẽ thêm 2 Enum để xử lý việc đó.
```
enum FontType {
    case installed(FontName)
    case custom(String)
    case system
    case systemBold
    case systemItatic
    case systemWeighted(weight: Double)
    case monoSpacedDigit(size: Double, weight: Double)
}
enum FontSize {
    case standard(StandardSize)
    case custom(Double)
    var value: Double {
        switch self {
        case .standard(let size):
            return size.rawValue
        case .custom(let customSize):
            return customSize
        }
    }
}
```
* Với enum FontType sẽ giúp ta dễ dàng tùy chọn sử dụng font mặc định hoặc font được thêm vào từ bên ngoài. Tương tự, Enum FontSize giúp ta tùy chọn được các phong chữ đã cài đặt sẵn ở Enum StandardSize hoặc dùng font chữ tùy chọn. 

* Bây giờ chúng ta sẽ đóng gói các enum phía trên lại trong struct Font. Việc này giúp ta dễ dàng tạo ra font chữ và size chữ dễ dàng.
```
struct Font {
    enum FontType {
        case installed(FontName)
        // ...
    }
    enum FontSize {
        case standard(StandardSize)
        // ...
    }
    enum FontName: String {
        case RobotoBlack            = "Roboto-Black"
        // ...
    }
    enum StandardSize: Double {
        case h1 = 20.0
        // ...
    }  
    // 1
    var type: FontType
    var size: FontSize
    // 2
    init(_ type: FontType, size: FontSize) {
        self.type = type
        self.size = size
    }
}
```
* Ta vẫn chưa thêm bất kỳ cơ chế nào để khởi tạo UIFont. Điều đó sẽ được thực hiện thông qua extension dưới đây.

```

extension Font {    
    var instance: UIFont {        
        var instanceFont: UIFont!
        switch type {
        case .custom(let fontName):
            guard let font =  UIFont(name: fontName, size: CGFloat(size.value)) else {
                fatalError("\(fontName) font is not installed, make sure it is added in Info.plist and logged with Utility.logAllAvailableFonts()")
            }
            instanceFont = font
        case .installed(let fontName):
            guard let font =  UIFont(name: fontName.rawValue, size: CGFloat(size.value)) else {
                fatalError("\(fontName.rawValue) font is not installed, make sure it is added in Info.plist and logged with Utility.logAllAvailableFonts()")
            }
            instanceFont = font
        case .system:
            instanceFont = UIFont.systemFont(ofSize: CGFloat(size.value))
        case .systemBold:
            instanceFont = UIFont.boldSystemFont(ofSize: CGFloat(size.value))
        case .systemItatic:
            instanceFont = UIFont.italicSystemFont(ofSize: CGFloat(size.value))
        case .systemWeighted(let weight):
            instanceFont = UIFont.systemFont(ofSize: CGFloat(size.value),
                                             weight: CGFloat(weight))
        case .monoSpacedDigit(let size, let weight):
            instanceFont = UIFont.monospacedDigitSystemFont(ofSize: CGFloat(size),
                                                            weight: CGFloat(weight))
        }
        return instanceFont
    }
}
```
# Sử dụng:
1. khởi tạo UIFont theo cách thông thường:

```

let system12          = UIFont.systemFont(ofSize: 12.0) // Hard coded literals -> 1
let robotoThin20      = UIFont(name: "Roboto-Thin", size: 20.0) // Hard coded literals -> 2
let robotoBlack14     = UIFont(name: "Roboto-Black", size: 14.0) // Hard coded literals -> 2
let helveticaLight13  = UIFont(name: "Helvetica-Light", size: 13.0) // Hard coded literals -> 2
```
2. Và đây là cách khởi tạo với syntax theo kiến trúc ta đã thực hiện phía trên, nhìn sẽ trực quan hơn và sẽ giúp ta dễ dàng hơn trong việc maintainance.

```

let system12            = Font(.system, size: .standard(.h5)).instance
let robotoThin20        = Font(.installed(.RobotoThin), size: .standard(.h1)).instance
let robotoBlack14       = Font(.installed(.RobotoBlack), size: .standard(.h4)).instance
let helveticaLight13    = Font(.custom("Helvetica-Light"), size: .custom(13.0)).instance
```
* Bạn có thể tìm thấy source code mẫu phía trên trong link này:
    https://gist.github.com/sauvikatinnofied/3aad89cbaf1ea908e9b6c7f0e5829c49
* References: https://medium.com/@sauvik_dolui/handling-fonts-in-ios-development-a-simpler-way-32d360cdc1b6