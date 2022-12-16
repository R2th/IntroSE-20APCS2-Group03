![](https://images.viblo.asia/5cbccc66-1acd-43a7-ab26-c3fc95a58c35.png)

Gần đây tôi có cơ hội được tham gia xây dựng ứng dụng Flutter có bao gồm chức năng login. Trong bài viết này, tôi xin chia sẻ cách setup để có thể sign in Google trên ứung dụng Flutter:

Trước khi vài bài viết, bạn có thể tham khảo hướng dẫn setup tại doc của Flutter tại [link này](https://pub.dev/packages/google_sign_in).

## Đăng kí ứng dụng trên Firebase
Chắc hẳn bạn đã nghe nói tới khá nhiều về thuật ngữ Firebase. Firebase là một nền tảng để phát triển ứng dụng di động và trang web, bao gồm các API đơn giản và mạnh mẽ mà không cần backend hay server. Chức năng chính là giúp người dùng lập trình ứng dụng bằng cách đơn giản hóa các thao tác với cơ sở dữ liệu. Bạn cần đăng kí ứng dụng trên firebase để có thể sử dụng dịch vụ Google Sign in.

Trước tiên bạn hãy vào [Firebase console](https://console.firebase.google.com/). Đăng nhập tài khoản email sử dụng để develop ứng dụng. Trong trường hợp bạn chưa đăng kí ứng dụng, hãy chọn vào mục Add project:
![](https://images.viblo.asia/4d6d4f17-670c-4310-9e27-f5ba03fc4f27.png)

Bạn hãy tiếp tục nhập tên project và làm theo hướng dẫn. Tích hợp google analytics nếu bạn muốn:
![](https://images.viblo.asia/6220d31f-0f2d-4cc9-8a0c-99c87fedd74d.png)

Nhấn Create project và chờ firebase làm việc:
![](https://images.viblo.asia/f2d8d84b-1be3-4ca8-9efe-beba347dd017.png)
![](https://images.viblo.asia/dadbf98a-2753-4ff0-af52-887117eaa25a.png)

Và thế là chúng ta đã hoàn thành việc đăng kí ứng dụng trên Firebase. Tiếp theo ta sẽ tiến hành setup cho 2 nền tảng Androd và iOS:

Chúng ta cần phải setup OAuth cho project. Truy cập [google API console](https://console.developers.google.com/) và đăng nhập tài khoản develop. Tiếp đó vào tab `OAuth consent screen` ở khu vực bên trái màn hình. Ở đây google cho ta hai lựa chọn là internal và external, tương ứng với dùng trong workspace và ngoài workspace. Nếu bạn không đang thuộc google workspace nào thì không thể lựuac chọn internal:
![](https://images.viblo.asia/09812549-1d34-472a-99b4-f424e6cab9bd.png)

Sau khi lựa chọn và nhấn Create. Google sẽ yêu cầu bạn cung cấp một số thông tin, chỉ cần điền một vài thông tin cần thiết và nhấn `Save And Continue` ở cuối page.
![](https://images.viblo.asia/232b3b21-4675-4409-a86a-63704d9dd94d.png)

## Setup cho Native
### Android
Trên firebase console, trong trường hợp bạn chưa tạo ứng dụng Android cho project, hãy nhấn vào biểu tượng androd để tạo mới app:
![](https://images.viblo.asia/8af05fe0-b9bf-4a0a-bb51-359e2bff73e7.png)

Tiếp theo hãy làm theo hướng dẫn của firebase, thêm BundleID (yêu cầu) và App nickname (không yêu cầu). Recommend sử dụng cùng một bundleID cho cả hai nền tảng:
![](https://images.viblo.asia/18a393b2-a6c7-4ee6-b42c-ac6648298ccc.png)

Sau đó, firebase sẽ generate cho bạn một file `google-services.json`. Hãy download và đưa nó vào thư mục androd/app của ứng dụng dưới local nhé:
![](https://images.viblo.asia/7204b5d5-c2cf-4a00-b2da-f26a14e1c4c8.png)

Chúng ta sẽ bỏ qua bước `Add Firebase SDK`, bởi Flutter sẽ giúp chúng ta import SDK khi build về sau.
Đến bước 4 và chọn Continue to console. Và thế là chúng ta đã setup xong cho Android.

### iOS
Tương như với Android, chúng ta cũng sẽ tạo ứng dụng iOS mới nếu project chưa có, nhập bundleID theo hướng dẫn. 
Tiếp theo ta sẽ cần download `GoogleService-Info.plist` file và đưa vào thư mục ios/Runner của app dưới local:
![](https://images.viblo.asia/3aac4989-d622-4205-b84e-3937ae92af5c.png)

Khi thêm file vào thư mục thì bạn hãy sử dụng Xcode, chuột phải vào `Runner` để `Add Files to "Runner"`, vậy thì Xcode mới nhận file.

Chúng ta sẽ bỏ qua bước 3 và 4 bởi Flutter sẽ giúp ta setup trong project sau này.
Đến bước 5 và chọn Continue to console.
![](https://images.viblo.asia/03d75ca1-585f-4e61-95ad-fbcc3b6532d6.png)

Ngoài ra chúng ta còn cần phải setup biến môi trường trong file `Info.plist`:
Bản mở `Info.plist` bằng trình biên dịch và thêm vào đoạn code sau:
```
<!-- Put me in the [my_project]/ios/Runner/Info.plist file -->
<!-- Google Sign-in Section -->
<key>CFBundleURLTypes</key>
<array>
	<dict>
		<key>CFBundleTypeRole</key>
		<string>Editor</string>
		<key>CFBundleURLSchemes</key>
		<array>
			<!-- TODO Replace this value: -->
			<!-- Copied from GoogleService-Info.plist key REVERSED_CLIENT_ID -->
			<string>com.googleusercontent.apps.861823949799-vc35cprkp249096uujjn0vvnmcvjppkn</string>
		</array>
	</dict>
</array>
<!-- End of the Google Sign-in Section -->
```
Save và chạy run trên Xcode để lưu config.

Vậy là chúng ta đã setup xong cho iOS.

Ngoài ra cũng lưu ý rắng: Từ 30 tháng 6, 2020, app sử dụng login sẽ phải có thêm mục đăng nhập với tài khoản Apple nếu muôn up lên Apple App Store. Hãy tham khảo thêm tại [đây](https://developer.apple.com/sign-in-with-apple/get-started) và [sign_in_with_google](https://pub.dev/packages/sign_in_with_apple) nhé.

##  Ứng dụng

Sau khi đã hoàn thành setup riêng cho mỗi nền tảng, chúng ta sẽ import google package vào app flutter:

Hãy vào file `pubspec.yaml` trong project flutter và thêm vào dòng sau:

```
import 'package:google_sign_in/google_sign_in.dart';
```

Ngoài ra hãy thêm googleSignIn scopes vào file mà bạn implement phần Sign in UI (ví dụ main.dart):
```
GoogleSignIn _googleSignIn = GoogleSignIn(
  scopes: [
    'email',
    'https://www.googleapis.com/auth/contacts.readonly',
  ],
);
```

Tham khảo thêm tất cả scopes tại [đây](https://developers.google.com/identity/protocols/googlescopes).

Bây giờ thì ta đã có thể sử dụng hàm của `GoogleSignIn` để tiến hành đăng nhập và đăng xuất:

```
Future<void> _handleSignIn() async {
  try {
    await _googleSignIn.signIn();
  } catch (error) {
    print(error);
  }
}
```

```
Future<void> _handleSignOut() => _googleSignIn.disconnect();
```

Mọi người có thể tham khảo thêm ví dụ sau đây: [link_example](https://github.com/flutter/plugins/blob/master/packages/google_sign_in/google_sign_in/example/lib/main.dart), API chi tiết: [google_sign_in](https://github.com/flutter/plugins/blob/master/packages/google_sign_in/google_sign_in/lib/google_sign_in.dart).

Vậy là chúng ta đã hoàn thành toàn bộ việc setup Sign in google với Flutter.
Hi vọng bài viết sẽ giúp mọi người xây dựng được những ứng dụng tuyết vời. Cám ơn đã đón đọc.

Refs:

https://pub.dev/packages/google_sign_in

https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0

https://console.developers.google.com/

https://console.firebase.google.com/

https://medium.com/flutterdevs/google-sign-in-with-flutter-8960580dec96

https://medium.com/flutter-community/flutter-implementing-google-sign-in-71888bca24ed

https://blog.codemagic.io/firebase-authentication-google-sign-in-using-flutter/