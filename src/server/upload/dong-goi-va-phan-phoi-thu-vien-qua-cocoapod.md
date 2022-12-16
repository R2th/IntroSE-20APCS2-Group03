## Mở đầu :

Kế thừa là một trong những tính chất quan trọng của lập trình hướng đối tượng, nhờ có kế thừa mà chúng ta có thể tái sử dụng được những code có sẵn, tiết kiệm thời gian phát triển. Trong lập trình IOS, có hàng ngàn thư viện được viết sẵn và publish thông qua dependencies manager như cocoapod, carthage,... ngoài nhu cầu sử dụng các thư viện của người khác thì khi bạn code nhiều cũng phát sinh nhu cầu tạo những thứ mà bạn thường xuyên sử dụng trong các project, vì thế bài viết này mình sẽ nói về cách tạo một thư viện và phân phối chúng thông qua cocoapod.


## 1. Tạo new project và push to github.

Mình sẽ tạo một thư viện bao gồm các extension mà mình hay dùng đặt tên là SwiftExtension. Sau khi tạo xong, mình tạo một folder Extensions và file UIView+Extension.swift

```
import UIKit

public extension UIView {
    
    //1
    @IBInspectable var cornerRadius: CGFloat {
        get {
            return layer.cornerRadius
        }
        set(value) {
            layer.cornerRadius = value
        }
    }
    
    //2
    func viewFromNibForClass() -> UIView {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: String(describing: type(of: self)), bundle: bundle)
        guard let view = nib.instantiate(withOwner: self, options: nil)[0] as? UIView else {
            return UIView()
        }
        return view
    }
}
```

Như vậy mình đã tạo ra một extension của UIView gồm 2 func
(1) để có thể set cornerRadius cho UIView trên Storyboard hay Xib.
(2) là để khởi tạo 1 custom view.

Okay, sau khi hoàn thành cây thư mục của project của mình sẽ trông như này :


![](https://images.viblo.asia/5e04623b-7d5e-439c-99ed-87a87b633495.png)

Giờ thì công việc của chúng ta là push code lên git thôi. Sau khi push chúng ta mở github ra, các bạn sẽ thấy trong project vừa khởi tạo lúc này có trạng thái 0 releases. 

![](https://images.viblo.asia/322e488d-ce0c-490a-bfeb-8469ced4f9c6.png)

Việc của chúng ta bây giờ là tạo 1 bản release, bằng cách click và release -> create a new release và điền các thông tin như này : 


![](https://images.viblo.asia/a2ad00b9-669b-480b-8665-793baab437a6.png)


Cuối cùng nhấp **Publish release** để finish, well giờ chúng ta đã có 1 bản release để sẵn sàng phân phối qua cocoapod.

## 2. Phân phối thư viện qua cocoapod.

Để có thể đẩy bản release lên cocoapod, đầu tiên chúng ta phải tạo file .podspec, đây là file chứa các thông tin về thư viện của chúng ta, dựa vào file này cocoapod sẽ có thể hiểu và xác thực thông tin trước khi cho phép thư viện của chúng ta được public trên hệ thống.

Chúng ta làm theo các bước sau :

### Bước 1 : Cd tới thư mục gốc của project và gõ lệnh để tạo file .podspec

```
pod spec create SwiftExtensionPlus
```

Lệnh trên sẽ giúp chúng ta tạo ra môt file SwiftExtensionPlus.podspec

Tại sao mình lại đặt tên là  **SwiftExtensionPlus**, có một điểm lưu ý rằng tên file này cũng chính là tên pod khi bạn khai báo để có thể install, vì thế nó phải là duy nhất. Điều đó có nghĩa là nếu bạn cố tình viết một cái tên đã tồn tại trên hệ thống thì bạn sẽ dừng cuộc chơi ở đây. Do đó **SwiftExtension** là cái tên đã tồn tại nên mình đành phải sử dụng một cái tên khác là **SwiftExtensionPlus**.


### Bước 2 : Edit file .podspec

Bây giờ các bạn cần chỉnh sửa file .podspec của mình cho chính xác. 

```
Pod::Spec.new do |s|
# pod name (1)
s.name = 'SwiftExtensionPlus'
# pod version. (2)
s.version = '0.1.0'
s.summary = 'Swift Extension'
s.description = <<-DESC
This is extension Library for IOS
DESC
# home page . (3)
s.homepage = 'https://github.com/tuanhust2010/SwiftExtension'
s.license = { type: 'MIT', file: 'LICENSE' }
s.authors = { 'Tuan nguyen' => 'tuanhust2010@gmail.com' }


s.ios.deployment_target = '10.0'

s.swift_version = '4.2'
# source git (4)
s.source = { git: 'https://github.com/tuanhust2010/SwiftExtension.git', tag: s.version.to_s }
# source file (5)
s.source_files = 'SwiftExtension/Extensions/*.swift'

end
```

Okay nhìn phía trên các thông tin khai báo cũng khá là rõ ràng, chỉ có một số điểm mình cần lưu ý thôi :

- Một là pod name, như mình nói trước đó, nó là trùng với tên file .podspec và sau này trong khai báo install nó sẽ có dạng là **pod 'SwiftExtensionPlus'**
- Thứ 2 là version đó chính là version mà các bạn setup lúc release thư viện github.
- Tiếp đến đó là home page(3) và source git(4), home page là url lúc mà các bạn mở project, còn source git là git url mà các bạn clone code về đó.
- Cuối cùng,  source file đây là đường dẫn những gì mà bạn muốn người khác install sẽ down về, ở đây mình chỉ muốn pod tải về các file .swift trong thư mục extensions, những thứ còn lại không có giá trị gì cả.

Bước 3. Validate file .podspec

Bước này chúng ta cần xác định xem file .podspec đã đúng format và các thông tin chúng ta khai báo có hợp lệ hay không.

```
pod lib lint SwiftExtensionPlus.podspec
```

Chúng ta sẽ check log nếu có lỗi thì chỉ cần edit file .podspec và chạy lại lệnh trên cho tới khi nào bạn nhìn thấy như dưới đây là thành công.
![](https://images.viblo.asia/9240b045-b652-4265-aeb0-06e861bf72f2.png)

Bước 4. Phân phối thư viện lên cocoapod

Chúng ta cần một tài khoản để có thể publish thư viện lên cocoapod, để đăng ký một account chúng ta cần chạy lệnh sau :

```
pod trunk register your_email@gmail.com 'your_name'
```

Sau đó, bạn sẽ thấy một thông báo yêu cầu vào mail để xác thực email, lưu ý, viêc xác thực này bạn phải dùng trình duyệt trên cùng máy tính đang gõ lệnh này.


Kết thúc bằng lệnh sau :

```
pod trunk push SwiftExtensionPlus.podspec --allow-warnings
```

![](https://images.viblo.asia/31a2e92b-3b7d-4ffb-8bb9-b3a6acd95905.png)


## Kết 

Như vậy qua bài này mình đã hướng dẫn các bạn cách tạo một thư viện và phân phối chúng lên cocoapod.

Hi vọng bài viết hữu ích ~