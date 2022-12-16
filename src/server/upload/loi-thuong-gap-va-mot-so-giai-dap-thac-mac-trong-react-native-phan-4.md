# 1. Sử dụng cơ chế report crash và use case log failed

Bạn nên quan tâm đến cơ chế report crash ví dụ như `Crashlytic`. Bên cạnh đó, thật là tuyệt vời để log mọi use case failed. Bạn có thể sử dụng dịch vụ như Amplitude mà bạn làm chủ backend và kiểm soát mọi thứ.

Người dùng của bạn có thường xuyên nhập tên thay vì email trong màn hình login? Hoặc họ có thể report lỗi login trong ứng dụng của bạn nhưng không biết phải làm sao? Mọi thứ đều có thể xảy ra. Log tốt sẽ không những giúp bạn tiết kiệm thời gian mà còn biết được user thường hay mắc lỗi gì và sử dụng thông tin đó để cải thiện ứng dụng của bạn.

# 2. Quan tâm về tương thích với các phiên bản trước

Thi thoảng 1 số tính năng bị removed, hoặc 1 vài sự thay đổi được giới thiệu như là thay đổi dữ liệu JSON trả về trên 1 API nào đó. Luôn luôn chú ý rằng người dùng có thể sẽ không update app của bạn tới phiên bản mới nhất, và do đó những phiên bản cũ có thể sẽ bị crashed theo 1 cách nào đó. Từ đó để tìm ra các phương án xử lý ví dụ như force update…

# 3. Sửa đổi nội dung của 1 state array/map sẽ không re-render.
Nếu bạn có 1 biến state là 1 hashmap, sửa đổi nội dung của nó sẽ không thay đổi chính nó, nên là render() sẽ không được gọi. Để tránh điều này, bạn cần tạo 1 bản copy của biến đó, ví dụ sử dụng hàm` _.cloneDeep()` trong thư viện `lodash`.

# 4. Sử dụng cấu trúc async/await
Nếu bạn là 1 React Native developer, bạn có thể đã từng sử dụng async/await. Nó trông gọn gàng và giúp bạn tránh khỏi callback hell.

Tuy nhiên, hãy lưu ý rằng cấu trúc này làm cho code bất đồng bộ chạy đồng bộ, nên trước khi sử dụng nó, hãy tự hỏi rằng: Bạn thực sự cần gì? Có vài thứ bạn cần thực hiện song song? Nếu có, hãy nghĩ lại cách tiếp cận. Nếu bạn có call 1 số API mà không phụ thuộc vào các API khác, thứ tốt nhất bạn có thể làm là tạo 1 promise cho mỗi API, đặt tất cả trong 1 array và chạy Promise.all().

Kết quả sẽ nhận được ngay khi tất cả các promises bên trong hoàn thành. Cách này sẽ nhanh hơn so với việc chạy từng request.

# 5. YellowBox
bạn có thể sử dụng  `YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated',])` để ignore những cảnh báo này nếu chưa muốn fix ngay lập tức. 

# 6. Cách hiển thị ảnh tối ưu.
### Đối với IOS

* Mở Xcode, tìm `Images.xcassets`, kéo các tài sản tĩnh vào đó.
* Đảm bảo rằng nó được bao gồm trong building phase:  Build Phases -> Copy Bundle Resources.
* Sử dụng nó như thế này: 

> <Image source={{uri: 'goodImage'}} />


Không cần extension và bạn có thể cần thêm chiều rộng và chiều cao để thực sự hiển thị nó.


### Đối với Android

* Mở studio Android 
* Kéo hình ảnh của bạn vào thư mục này: `android/app/src/main/res/drawable`  
*  Tên tệp phải bắt đầu bằng chữ cái 
*  Sau đó sử dụng nó như iOS

# 7. Clean project
> rm -rf ios/build

Hoặc dùng 
* [CTRL] + [SHIFT] + [CMD] + [K] - clean project

# 8. Một số Scripts
```
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "cd android && ./gradlew test && cd .. && jest",
    "android": "node node_modules/react-native/local-cli/cli.js run-android",
    "bundle-android": "node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.map --assets-dest android/app/src/main/res/",
    "ios": "node node_modules/react-native/local-cli/cli.js run-ios --simulator=\"iPhone 4s\"",
    "ios-release": "node node_modules/react-native/local-cli/cli.js run-ios --simulator=\"iPhone 4s\" --configuration Release",
    "apk": "cd android && ./gradlew assembleRelease && cd ..",
    "android-release": "cd android && ./gradlew installRelease && cd ..",
    "clean-npm": "rm -rf $TMPDIR/react-* && watchman watch-del-all && rm -rf node_modules/ && npm cache clean && npm i",
    "clean-android": "cd android && ./gradlew clean && cd ..",
    "clean-ios": "rm -rf ios/build/ModuleCache/* ios/build/Build/*",
    "clean": "npm run clean-npm && npm run clean-android && npm run clean-ios",
  },
```

# 9. Dùng FlexBox 
Flexbox có thể được sử dụng với React Native và nó giúp các nhà phát triển dễ dàng hơn nhiều trong việc duy trì bố cục giữa React và React Native.

Tuy nhiên, trong desktop, giá trị mặc định cho `flex-direction` là một` row`, trong khi trong React Native, giá trị mặc định là một `column`. 

Do đó để duy trì bố cục thống nhất, chúng ta cần chỉ định giá trị của `flex-direction`. 

Nếu bạn chưa quen với Flexbox hoặc chỉ lười biếng như tôi, Facebook có một công cụ tương tác có tên [Yoga](https://yogalayout.com/), tạo bố cục phức tạp và trực tiếp phát hành mã cho React Native.

# 10. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .