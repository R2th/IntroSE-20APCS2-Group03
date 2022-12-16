Thử tưởng tượng hiện team hoặc công ty bạn đã và đang phát triển 1 sản phẩm về Mobile app bằng Native thuần. Điều đó có nghĩa là bạn đang phải phải duy trì 2 team phát triển đồng thời là Android và iOS. Tuy vậy, app của bạn lại gần như không tương tác với native nhiều, gần như chỉ là 1 app CRUD bình thường. Gần đây bạn nghe nhiều đến cross-platform, nào là tiết kiệm chi phí, nguồn lực, phát triển nhanh, nhưng app native hiện tại của bạn đã quá lớn, việc đập đi xây lại đôi khi là 1 vấn đề không thực tế, ảnh hưởng đến các business đang chạy. Tuy nhiên, để tính đường dài, bạn vẫn quyết định tách team ra 2 nhóm. Một nhóm R&D xây dựng lại app từ đầu và bằng cross-platform, một nhóm tiếp tục phát triển các feature. Bạn chợt nghĩ, với các feature, module mới nếu bạn vẫn tiếp tục code mới bằng native, rồi sau team core code lại cũng sẽ mất công convert lại thành cross-patform, lại tốn thêm nguồn lực test và thời gian. Liệu có cách nào để phát triển mới các module bằng cross-platform xong tích hợp luôn vào app native sẵn có của bạn, và có thể tương tác mượt mà lại với native của bạn.

Câu trả lời là **CÓ**!!. !

Hiện tại 2 nền tảng phổ biến của cross-platform là React-Native (RN) và Flutter đểu hỗ trợ tốt việc đó

Tản mạn chút về React Native và Flutter, hiện tại đã có quá nhiều bài viết so sánh, mình sẽ ko nhắc lại, mình chỉ góp ý thêm vài con số tham khảo 
![](https://images.viblo.asia/b4e2d04c-ba8f-43ca-9499-63062cfdf8c8.png)

Theo thống kê của Google đối vs Flutter và RN thì Flutter đã dần vượt lên RN về mức độ sự quan tâm và tìm kiếm.
![](https://images.viblo.asia/7ee43c9f-fec6-4c56-a1fc-98f62c6a55f4.png)

Hiện tại trên thế giới thì sự quan tâm về Flutter đang dần lấn át RN. Ở Việt Nam tỷ lệ RN vẫn đang chiếm khá cao và gấp đôi so với Flutter, tuy vậy tỷ lệ này đang dần thay đổi theo từng tháng

![](https://images.viblo.asia/57b47b76-829d-4d34-8ec8-a4399bc8daa3.png)

(Nguồn: https://trends.google.com/trends/explore?date=today%2012-m,today%2012-m&geo=,&q=flutter,react%20native)

Hiện tại trong bài viết này, mình sẽ giới thiệu về cách tích hợp 1 module Flutter vào project Android và iOS sẵn có


## I. Khi nào dùng Module Flutter
* Muốn triển khai các tính năng bằng Flutter
* Có sẵn ứng dụng Android hoặc iOS trước đó
* Viết lại toàn bộ ứng dụng là không thực tế
* Viết 1 lần tích hợp luôn cho Android và iOS
* Tạo thư viện cho 2 nền tảng
* Tạo SDK cho ứng dụng thứ 3

# 
## II. Tích hợp Module Flutter

Flutter Module có thể đc tạo bằng cmd hoặc Android Studio
```
cd some/path/
flutter create -t module --org com.example my_flutter
```

### 1. Android
Flutter có thể được nhúng vào từng phần ứng dụng Android hiện tại của bạn, dưới dạng một subproject Gradle hoặc như 1 thư viên ARRS

> Flutter yêu cầu Java8
> 
> Yêu cầu Android Studio 3.6+
> 
> Từ flutter 1.17, Flutter module chỉ hỗ trợ androidX trở lên

![](https://images.viblo.asia/7ed5d238-5c80-49e5-a0ec-8268f7fa7ad6.gif)

Đối với build AOT. Flutter hiện tại chỉ hỗ trợ compliler `x86_64`, `armeabi-v7a` và `arm64-v8a.`
Cân nhắc sử dụng `abiFilters` Android Gradle Plugin API để giới hạn các kiến trúc được hỗ trợ trong APK của bạn. Làm điều này sẽ tránh được lỗi thời gian chạy libflutter.so bị thiếu, ví dụ:
```
android {
  //...
  defaultConfig {
    ndk {
      // Filter for architectures supported by Flutter.
      abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64'
    }
  }
}

```
Flutter vẫn có phiên bản `x86` và `x86_64`, khi debug JIT vẫn hoạt động bình thường

Flutter Module có thể được tích hợp vào bằng 2 cách: Create New hoặc import Module Flutter từ Android Studio
![](https://images.viblo.asia/05c79f79-cbdb-4c78-b2b1-864a04518ca7.png)

![](https://images.viblo.asia/402761ce-6476-4e4d-bf4e-0a69fcf8e34b.png)

Build AAR bằng Android Studio
![](https://images.viblo.asia/cbbfee86-b746-4512-a431-1252262d66b8.png)
hoặc:
```
cd some/path/my_flutter
flutter build aar

```


### 2. iOS
Flutter có thể được tăng thêm vào ứng dụng iOS hiện tại của bạn dưới dạng các frameworks
> Flutter hỗ trợ iOS 8.0 trở lên.

![](https://images.viblo.asia/cc3b1a60-0f5e-4aa4-a0be-ac317400fb5b.gif)
Flutter được tích hợp vào iOS bằng 3 cách:
A. Embed with CocoaPods and the Flutter SDK
```
some/path/
├── my_flutter/
│   └── .ios/
│       └── Flutter/
│         └── podhelper.rb
└── MyApp/
    └── Podfile

```

1. Thêm các dòng sau vào Podfile:
```
flutter_application_path = '../my_flutter'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
```
2. Call `install_all_flutter_pods(flutter_application_path).`
```
target 'MyApp' do
  install_all_flutter_pods(flutter_application_path)
end
```
3. Run `pod install`.

B. Embed frameworks in Xcode

Generate framework: 
```
flutter build ios-framework --output=some/path/MyApp/Flutter/
```

Link on the frameworks
![](https://images.viblo.asia/94204899-6bb3-434d-9b12-921b8cf91cb5.png)

Embed the frameworks
![](https://images.viblo.asia/290e1041-2aad-4e6e-b17f-4c092f642410.png)

C. Embed application and plugin frameworks in Xcode and Flutter framework with CocoaPods
```
flutter build ios-framework --cocoapods --output=some/path/MyApp/Flutter/
```
```
some/path/MyApp/
└── Flutter/
    ├── Debug/
    │   ├── Flutter.podspec
    │   ├── App.framework
    │   ├── FlutterPluginRegistrant.framework
    │   └── example_plugin.framework (each plugin with iOS platform code is a separate framework)
    ├── Profile/
    │   ├── Flutter.podspec
    │   ├── App.framework
    │   ├── FlutterPluginRegistrant.framework
    │   └── example_plugin.framework
    └── Release/
        ├── Flutter.podspec
        ├── App.framework
        ├── FlutterPluginRegistrant.framework
        └── example_plugin.framework
```
```
pod 'Flutter', :podspec => 'some/path/MyApp/Flutter/[build mode]/Flutter.podspec'
```

## III. Một số thành phần trong Module Flutter
### Flutter Activity

Flutter cung cấp FlutterActivity để hiển thị Flutter trong ứng dụng Android. Để sử dụng, bạn cần khai báo trong `AndroidManifest.xml`
```
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />

```

Launch FlutterActivity:
```
myButton.setOnClickListener {
  startActivity(
    FlutterActivity.createDefaultIntent(this)
  )
}

```

```
myButton.setOnClickListener {
  startActivity(
    FlutterActivity
      .withNewEngine()
      .initialRoute("/my_route")
      .build(this)
  )
}
```

### FlutterFragment
Flutter cung cấp FlutterFragment để các nhà phát triển có thể trình bày trải nghiệm Flutter ở bất kỳ nơi nào họ có thể sử dụng Fragment thông thường.
```
FragmentManager fragmentManager = getSupportFragmentManager();
        flutterFragment = (FlutterFragment) fragmentManager
            .findFragmentByTag(TAG_FLUTTER_FRAGMENT);
            
        if (flutterFragment == null) {
            flutterFragment = FlutterFragment.createDefault();

            fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
        }
```

![](https://images.viblo.asia/f6dc958f-66af-4e3b-9cdf-8e2b7846fcf9.png)


### FlutterView
Flutter có thể được thêm vào ứng dụng của Android dưới dạng 1 View 
```
  <io.flutter.embedding.android.FlutterView
        android:id="@+id/flutterView"
        android:layout_width="match_parent"
        android:layout_height="0dip"
        android:layout_weight="1" />
```

![](https://images.viblo.asia/d252a9d5-17f5-40c9-b1da-85aa42476bce.png)

### FlutterViewController
Flutter cũng cung cấp FlutterViewController để hiển thị Flutter trên iOS, Bạn có thể launch FlutterViewController hoặc add vào View để hiển thị trong ViewController của bạn
```
@IBAction func openFlutterController(_ sender: UIButton) {
        let flutterVC = FlutterViewController(engine: flutterEngineHalfScreen, nibName: nil, bundle: nil)
        self.navigationController?.pushViewController(flutterVC, animated: true)
    }
```

```
func addFlutterView(){
        flutterEngineHalfScreen = (UIApplication.shared.delegate as! AppDelegate).flutterEngineHalfScreen
        flutterViewController = FlutterViewController(engine: flutterEngineHalfScreen, nibName: nil, bundle: nil)
        addChild(flutterViewController)
        flutterViewController.view.translatesAutoresizingMaskIntoConstraints = false
        flutterView.addSubview(flutterViewController.view)
        let constraints = [
            flutterViewController.view.topAnchor.constraint(equalTo: flutterView.topAnchor),
            flutterViewController.view.leadingAnchor.constraint(equalTo: flutterView.leadingAnchor),
            flutterViewController.view.bottomAnchor.constraint(equalTo: flutterView.bottomAnchor),
            flutterViewController.view.trailingAnchor.constraint(equalTo: flutterView.trailingAnchor)
        ]
        
        NSLayoutConstraint.activate(constraints)
        
        flutterViewController.didMove(toParent: self)
        flutterViewController.view.layoutIfNeeded()
        
    }
```
## III. Demo
Hiện tại mình có viết 1 demo tích hợp Module Covid vào app Native sẵn có

![](https://images.viblo.asia/45a63702-714b-4c9f-9c63-4dadeaa2831e.png)
Bạn có thể xem thêm tại: https://github.com/oNguyenDucManh/-ManhND_Demo_Covid


## IV. Tham khảo
Mọi người có thể đọc thêm chi tiết tại: https://flutter.dev/docs/development/add-to-app

Về đánh giá performance mọi người có thể xem chi tiết tại: https://flutter.dev/docs/development/add-to-app/performance

Còn muốn tích hợp RN vào exist app, mọi người có thể xem tại: https://reactnative.dev/docs/integration-with-existing-apps