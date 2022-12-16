Trong iOS, framework Foundation cung cấp cơ chế low-level cho việc lưu trữ các Preference data. Có 2 cách để thay đổi các Preference data này:
1. Thay đổi ngay bên trong app
2. Sử dụng Settings bundle để quản lý các preferences từ ứng dụng Setting

Theo Apple docs:
Một apps có thể hiển thị các cài đặt cả trong app lẫn trong ứng dụng Setting của điện thoại. Tuỳ theo cách bạn muốn người dùng tương tác với các cài đặt như thế nào. 

Bảng dưới đây chứa danh sách các Control Type bạn có thể sử dụng trong `settings.bundle`

![](https://images.viblo.asia/93d6505d-c5bd-4830-a848-545af680af6c.png)

Mỗi ứng dụng có gói Cài đặt đều có ít nhất một trang tùy chọn, được gọi là trang chính. Nếu ứng dụng của bạn chỉ có một số tùy chọn, trang chính có thể là trang duy nhất bạn cần. Tuy nhiên, nếu số lượng tùy chọn quá lớn để phù hợp với trang chính, bạn có thể tạo các trang con liên kết với trang chính hoặc các trang con khác. Không có giới hạn cụ thể về số lượng trang con mà bạn có thể tạo, nhưng bạn nên cố gắng giữ cho tùy chọn của mình đơn giản và dễ điều hướng nhất có thể.

Một Settings bundle có tên `Settings.bundle` và nằm trong thư mục cấp cao nhất của app bundle. Bundle này chứa một hoặc nhiều tệp trang Cài đặt mô tả các trang tùy chọn riêng lẻ. Nó cũng có thể bao gồm các tệp hỗ trợ khác cần thiết để hiển thị tùy chọn của bạn, chẳng hạn như hình ảnh hoặc chuỗi được bản địa hóa.

> You can localize the Info.plist file and show the settings in your desired language.Please read more in the official docs.

# Thêm một Settings Bundle
Để thêm một settings bundle vào Xcode project:

1. Chọn File > New > New File.
2. Chọn Resource trong mục iOS, và chọn Settings Bundle template.
3. Đặt tên cho Settings.bundle

![](https://images.viblo.asia/6f1bcafd-4687-4dc7-a5e9-f10f25a5875c.png)

Ngoài việc thêm Settings bundle mới vào dự án của bạn, Xcode tự động thêm bundle đó vào Copy Bundle Resources build phase  của app target. Do đó, tất cả những gì bạn phải làm là sửa đổi các tệp property list của Settings bundle và thêm bất kỳ tài nguyên cần thiết nào.

Settings bundle mới có cấu trúc như sau:
![](https://images.viblo.asia/62f7cf81-2801-4c67-a1f1-ba653725f18a.png)

Click vào file Root.plist. Bạn sẽ thấy 1 danh sách property như sau:
![](https://images.viblo.asia/c1096b2f-f052-401a-a803-3e19bc2f1f9b.png)

Preference items là một array chứa các dictionary controls. Đi tới Hình 1 để biết tất cả các Control mà chúng ta có thể thêm vào trong settings app bundle. Đối với ứng dụng demo này, tôi chỉ cần một nhóm, một tiêu đề để hiển thị số phiên bản ứng dụng, một tiêu đề để hiển thị số bản dựng và một công tắc bật tắt để đặt lại ứng dụng. Vì vậy, hãy xóa tất cả các mục trong array preference items và thêm các mục được đề cập ở trên. 

Vì vậy, đối với ứng dụng của chúng ta, tệp Root.plist sẽ trông như thế này:
![](https://images.viblo.asia/85f77244-543d-43ce-b7dc-2ef865a9a607.png)

Identifier là Userdefaults key mà bạn có thể sử dụng bên trong code để thực hiện các thay đổi thích hợp. Đừng quên thêm các giá trị mặc định cho Title. Nếu không, nó sẽ không xuất hiện trong cài đặt.

> Mẹo: Nếu bạn lo lắng về thứ tự của các điều khiển trong plist, Nhấp chuột phải vào tệp plist và mở dưới dạng mã nguồn. Có thể dễ dàng chỉnh sửa xml thay vì plist trực tiếp.

UI cài đặt sẽ trông như thế này cho file plist ở trên:
![](https://images.viblo.asia/a79f95ec-5b8d-4bc0-a057-c85c5b5c812c.png)

Bây giờ, hãy tạo một class có tên là SettingsBundleHelper.swift để xử lý các thay đổi cài đặt...

```
//
//  SettingsBundleHelper.swift
//
//  Created by Abhilash on 28/03/17.
//
import Foundation
class SettingsBundleHelper {
    struct SettingsBundleKeys {
        static let Reset = "RESET_APP_KEY"
        static let BuildVersionKey = "build_preference"
        static let AppVersionKey = "version_preference"
    }
    class func checkAndExecuteSettings() {
        if UserDefaults.standard.bool(forKey: SettingsBundleKeys.Reset) {
            UserDefaults.standard.set(false, forKey: SettingsBundleKeys.Reset)
            let appDomain: String? = Bundle.main.bundleIdentifier
            UserDefaults.standard.removePersistentDomain(forName: appDomain!)
            // reset userDefaults..
            // CoreDataDataModel().deleteAllData()
            // delete all other user data here..
        }
    }
    
    class func setVersionAndBuildNumber() {
        let version: String = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as! String
        UserDefaults.standard.set(version, forKey: "version_preference")
        let build: String = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as! String
        UserDefaults.standard.set(build, forKey: "build_preference")
    }
}
```
Tôi đã thêm code để đặt lại dữ liệu và đặt số phiên bản trong AppDelegate như sau:
```
func applicationDidBecomeActive(_ application: UIApplication) {
    SettingsBundleHelper.checkAndExecuteSettings()
    SettingsBundleHelper.setVersionAndBuildNumber()
}
```
# Cập nhật Defaults với Observers
Phương pháp trên có một hạn chế là chúng ta phải call code mỗi khi ứng dụng khởi chạy. Ngoài ra, bạn có thể đặt một observer cho UserDefaults bằng cách sử dụng UserDefaults.didChangeNotification.
```
//
//  ViewController.swift
//  SettingsTest
//
//  Created by Abhilash on 29/03/17.
//  Copyright © 2017 Abhilash. All rights reserved.
//
import UIKit

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        registerSettingsBundle()
        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.defaultsChanged), name: UserDefaults.didChangeNotification, object: nil)
        defaultsChanged()
    }
    func registerSettingsBundle(){
        let appDefaults = [String:AnyObject]()
        UserDefaults.standard.register(defaults: appDefaults)
    }
    func defaultsChanged(){
        if UserDefaults.standard.bool(forKey: "RedThemeKey") {
            self.view.backgroundColor = UIColor.red
        
        }
        else {
            self.view.backgroundColor = UIColor.green
        }
    }
    
    deinit { //Not needed for iOS9 and above. ARC deals with the observer in higher versions.
        NotificationCenter.default.removeObserver(self)
    }
}
```

Nhưng nếu bạn đang sử dụng nhiều UserDefaults, thì bạn nên thêm kiểm tra điều kiện thích hợp và thực hiện đoạn code trên. Ngoài ra trong các phiên bản iOS trước iOS 9, có thể xảy ra sự cố bộ nhớ khi bạn liên tục nhận được nhiều thông báo như thế này. Trước iOS9, chúng ta cần xóa observer để quản lý bộ nhớ tốt.
```
deinit { 
    //Not needed for iOS9 and above. ARC deals with the observer in higher versions.
    NotificationCenter.default.removeObserver(self)
}
```
> Lưu ý: Đây là hướng dẫn cơ bản về settings.bundle. Có một số tùy chọn nâng cao hơn như trang cài đặt con, thêm thanh trượt, v.v. rất dễ thực hiện mà tôi chưa đề cập ở đây.
> 
![](https://images.viblo.asia/6ca43a49-a99f-410b-9e54-7aec708244d6.png)
> Lưu ý: Nếu cài đặt không hiển thị cho bạn, hãy thử sử dụng Giao diện người dùng chuyển đổi ứng dụng (nhấn đúp vào nút Trang chủ) để tắt Ứng dụng cài đặt và khởi chạy lại ứng dụng.


[Full Project Github link(code is in swift 3).](https://github.com/abhimuralidharan/SettingsBundleTest)
\
Nguồn tham khảo: [Adding settings to your iOS app](https://medium.com/@abhimuralidharan/adding-settings-to-your-ios-app-cecef8c5497)