Xin chào các bạn. Chắc ai đang đọc bài viết này cũng đã ít nhất 1 lần nghe qua về React Native rồi đúng không ạ :D Bản thân mình cũng là 1 người như vậy, nhưng ngày trước thì hiểu biết về framework này chỉ dừng lại ở cái tên và chạy thử 1 số project mẫu chứ chưa đi sâu vào tìm hiểu. Tuy React Native không còn là cái gì đó quá mới mẻ và cũng đang chịu sự cạnh tranh quyết liệt của Flutter - 1 framework tương tự đến từ Google. Bởi vì tôi đã sử dụng qua cả 2, xin đưa 1 số điểm khác biệt như sau:

- Ứng dụng sử dụng React Native được viết bằng Javascript, còn với Flutter thì là Dart. Tôi sẽ không thảo luận về việc ngôn ngữ nào là tốt hơn, tuy nhiên Javascript là 1 ngôn ngữ cực kì phổ biến trong thế giới web và nếu bạn đã có background về ngôn ngữ này thì thật tuyệt, bạn có thể nhảy vào làm luôn, còn nếu bạn chưa biết? Học React Native xong chúng ta có thể đá sang các lĩnh vực khác của web luôn, rất tiện :D Còn Dart thì tuy là 1 ngôn ngữ khá hay, ai có background về Java thì học khá dễ, và theo như Google quảng cáo là ngôn ngữ để "thay thế Javascript", tuy nhiên ngoài Flutter thì tôi nghĩ có rất ít những lĩnh vực khác chúng ta có thể ứng dụng nó, và dùng để làm web thì hệ sinh thái cũng không thể nào bằng được Javascript.
- Sau khi dùng thử qua SDK của cả 2 (tất nhiên chỉ ở mức cưỡi ngựa xem hoa), **theo tôi** thì React Native **dễ sử dụng hơn** và có learning curve **thấp hơn nhiều** so với Flutter. Nếu dự án cần làm nhanh thì tôi nghĩ React Native sẽ tốt hơn với những dev chưa làm bao giờ.
- Hệ sinh thái của React Native rất lớn, gồm nhiều plugin, module và thư viện đi theo. Flutter cũng có, tuy nhiên nó mới hơn nên không thể bằng được trong thời gian ngắn.
-  Flutter vẫn đang trong giai đoạn Beta.

Tất nhiên nói vậy nhưng Flutter cũng rất hay, ở những điểm sau:
- Dart được biên dịch thành native code trên cả Android và iOS => performance sẽ rất tốt.
- Flutter sử dụng một bộ rendering engine **của chính nó**. Điều này có nghĩa là mọi pixel trên màn hình mà bạn thấy của 1 ứng dụng Flutter đều được tự nó vẽ ra, chứ không sử dụng các thành phần native của từng platform. Ví dụ như cái Toolbar mà bạn thấy không phải là native view đâu, Flutter tự vẽ nó ra đó.
- Tại thời điểm hiện tại thì Flutter xử lý scrolling và animation tốt hơn nhiều, nó cũng đi kèm với nhiều package hữu ích cho riêng từng platform.

Đúng là kẻ tám lạng, người nửa cân đúng không ạ. Tuy nhiên do nhiều lí do cá nhân và công việc nên mục tiêu của series này sẽ là tìm hiểu về React Native, và có thể trong tương lai tôi sẽ có 1 series khác về Flutter khi mà nó đã release chăng :D

# Setup môi trường
Có 2 cách để setup 1 project React Native là `create-react-native-app` và `react-native-cli`. Trong series này chúng ta sẽ chỉ sử dụng `react-native-cli`, bởi vì `create-react-native-app` chỉ dùng cho app viết hoàn toàn bằng Javascript thôi, và nếu bạn muốn có native module thì phải làm thêm một số bước khác để chuyển lại thành `react-native-cli`, vậy thì chúng ta dùng nó luôn cho nhanh. 

Ở đây tôi sẽ hướng dẫn setup trên macOS, còn bạn nào dùng Windows thì hãy vào [trang docs của React Native](https://facebook.github.io/react-native/docs/getting-started.html) để xem, click vào tab **Building Projects with Native Code** sau đó chọn **Development OS** là Windows và **Target OS** là Android thì mới có hướng dẫn nhé, vì bạn không thể build app cho iOS trên Windows được.

Lí do mà tôi muốn tự hướng dẫn các bạn cách setup là tôi muốn giải thích tại sao chúng ta lại cần những dependency này và chúng được dùng vào mục đích gì, thay vì chỉ có hướng dẫn cài đặt như ở trên trang chủ. Dưới đây là những thứ chúng ta sẽ cần phải cài:

**1. Xcode/JDK & Android Studio & Android SDK mới nhất**

Chúng ta dùng nó để package code và thư viện React Native vào thành 1 app, cũng như để cài app trên máy ảo. 

Cài đặt: [Xcode](https://developer.apple.com/xcode/) | [Android Studio](https://developer.android.com/studio/index.html) & [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

**2. Homebrew**

Package manager của macOS, chúng ta sẽ dùng nó để cài `node` và `watchman`.

Cài đặt:  https://brew.sh/ 

**3. Node (v6+) / NPM**

Node dùng để chạy Javascript ngoài browser, còn NPM là package manager của Javascript. Chúng ta sẽ dùng NPM để cài đặt nhiều dependency trong quá trình làm ứng dụng React Native.

Cài đặt: Sau khi đã cài Homebrew, chạy lệnh sau:

```
brew install node
```

Chúng ta chỉ cần cài node là đã có npm đi kèm rồi :D

**4. Watchman**

Theo dõi thay đổi của file trong ổ cứng. Nó được dùng bởi React Native để tự động theo dõi thay đổi của file và update ứng dụng mà chúng ta đang làm.

Cài đặt:

```
brew install watchman
```

**5. React Native CLI**

Command line interface của React Native, dùng để khởi tạo 1 project mới hoặc để chạy project trên iOS hoặc Android.

Cài đặt: Sau khi đã cài node, chạy lệnh sau:

```
npm install -g react-native-cli
```

Đó là tất cả những gì cơ bản nhất mà chúng ta cần để bắt đầu develop một ứng dụng React Native.

# Khởi tạo và chạy app
Để khởi tạo 1 app React Native rất đơn giản, bạn chỉ cần bật terminal lên và chạy lệnh sau:

```
react-native init sample
```

Trong đó sample là tên của ứng dụng mà bạn muốn đặt, tôi thì đặt thế làm ví dụ cho nhanh :D Sau đó chờ 1 chút để React Native tự khởi tạo thư mục chứa những file cần thiết cho project của bạn. Sau khi chạy xong thì chúng ta sẽ có 1 thư mục như sau:

![](https://images.viblo.asia/69acb8a9-9e2c-44fc-a910-081c6d3d3dab.png)

Trong đó thì 1 số file/folder quan trọng mà chúng ta cần chú ý là:

* `index.js` : file này là entry point để khởi động ứng dụng của chúng ta.
* `App.js`: từ entry point trên sẽ gọi đến file này, đây là file App chứa giao diện mặc định mà React Native tạo cho chúng ta.
* `android`: Chứa source code của Android.
* `ios`: Chứa source code của iOS.

Để chạy app thì đầu tiên chúng ta di chuyển vào thư mục project vừa tạo:

```
cd sample
```

* Android: Đầu tiên bạn phải cắm device thật vào máy, hoặc chạy 1 máy ảo trước mới có thể chạy được App. Nếu bạn chưa có máy ảo nào thì vào Android Studio tạo 1 cái nhé, và đừng quên đổi tên cho nó luôn. Ví dụ tôi đổi tên máy ảo thành "may ao", thì lần sau chúng ta ko cần phải bật Android Studio lên thì mới chạy được máy ảo nữa mà có thể chạy từ terminal luôn như sau:

```
/Users/your_name/Library/Android/sdk/tools/emulator -avd may_ao //thay your_name bằng tên thư mục home của bạn
```

Sau khi đã chạy được máy ảo, chúng ta dùng lệnh sau:

```
react-native run-android
```

Sau đó chờ nó build xong là nó tự chạy app luôn.

* iOS: Bạn chỉ cần chạy luôn lệnh sau là được:

```
react-native run-ios
```

Sau khi chạy xong app thì chúng ta sẽ được giao diện như sau:

![](https://images.viblo.asia/bb7362d8-459c-4e45-8773-199771b89c31.png)

Bài viết này đến đây là hết. Trong bài sau của series, chúng ta sẽ cùng tìm hiểu kỹ hơn về các thành phần cũng như cấu trúc của 1 ứng dụng React Native. Cảm ơn các bạn đã theo dõi :)