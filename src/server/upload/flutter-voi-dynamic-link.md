![feature1.png](https://images.viblo.asia/66cc9704-fddf-4851-9859-f6e9ec016506.png)

# Giới thiệu sơ lược:
`Dynamic link` là các URL thông minh cho phép ta đưa người dùng đến bất kỳ vị trí nào trong ứng dụng iOS hoặc Android của mình thông qua một đường link. Sau khi đã qua quá trình cài đặt ứng dụng.
Với `Dynamic link`, ta có thể chuyển đổi liền mạch người dùng từ trang web trên điện thoại di động của mình sang nội dung tương đương trong ứng dụng của mình. 

# Cách hoạt động:
Khi người dùng mở một `Dynamic link` của bạn, nếu ứng dụng  chưa được cài đặt, người dùng sẽ được đưa đến CHPlay hoặc App Store để cài đặt ứng dụng của bạn (trừ khi bạn chỉ định khác) và ứng dụng của bạn sẽ mở ra. Sau đó, bạn có thể truy xuất liên kết đã được chuyển đến ứng dụng của mình và xử lý liên kết sâu sao cho phù hợp với ứng dụng của bạn.

# Tạo một Dynamic link thông qua FireBase Console:
Vào một dự án mà bạn đã tạo trên Firebase tiến hành chọn mục Dynamic Link ở thanh menu bên trái.
![](https://images.viblo.asia/28003f79-398b-41c3-af3a-a1d5ed9e41b4.png)

Tiếp màn hình sẽ hiển thị như sau:
![](https://images.viblo.asia/f34eeafd-69c2-4544-8995-68f8a38dc2b7.png)

Bạn sẽ nhập một Domain của mình vào.
![](https://images.viblo.asia/4e2b61e4-1c8e-445d-a80a-dedd69d3102e.png)

Chọn `New Dynamic Link` để tiến hành tạo và configt một Dynamic Link của riêng bạn:

![](https://images.viblo.asia/1bd72c89-2691-4110-9e56-df059d23c64d.png)

Ở mục này sẽ là phần link rút gọn của trang mà bạn mong muốn:

![](https://images.viblo.asia/ac54f773-41a3-4eb2-99d6-fed8d15fed55.png)

Mục này sẽ chỉ rõ là bạn muốn đường link của bạn sẽ có những gì, ở đây mình thêm một title cho nó.
![](https://images.viblo.asia/8c380550-cfce-4970-8ad4-0a6135360a87.png)

Ở 2 mục tiếp theo sẽ là việc xử lý đường link với iOS và Android.

*  Một là sẽ link sẽ xử lý giống như deeplink.

![](https://images.viblo.asia/68a54c14-f81d-4eb5-8442-c004e09c8bc0.png)


* Hai là sẽ mở link thông qua một app khác.


![](https://images.viblo.asia/5e5ded51-c520-4c64-8a4d-45cc56c29ef6.png)

Và nếu app chưa được cài đặt thì cả hai config trên sẽ tự động nhảy đến CHPlay (Android) hoặc App Store (iOS)

Sau khi hoàn tất ta được một Dynamic Link như bên dưới:

![](https://images.viblo.asia/f9724b70-58e5-4a79-9148-74b1b4cfcd7a.png)


# Tạo app Flutter Dynamic link
##   1. Cấu hình pubspec.yaml

```
version: 1.0.0+1

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^1.3.0
  firebase_dynamic_links: ^2.0.6

```

Và cũng như bao dự án liên quan đến Firebase thì đều cần phải cấu hình và thêm file `google-service.json` với Android và `GoogleService-Info.plist` cho iOS.

##   2. Xử lý khi app được gọi từ Dynamic link.
Đầu tiên sẽ khởi tạo Widget và tạo kết nối đến Firebase cho app
```Dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}
```

Khởi tạo Dynamic Link.

```Dart
  void initDynamicLinks() async {
    final PendingDynamicLinkData data =
    await FirebaseDynamicLinks.instance.getInitialLink();
    final Uri deepLink = data?.link;

    if (deepLink != null) {
      handleDynamicLink(deepLink);
    }
    FirebaseDynamicLinks.instance.onLink(
        onSuccess: (PendingDynamicLinkData dynamicLink) async {
          final Uri deepLink = dynamicLink?.link;

          if (deepLink != null) {
          // Hàm này để xử lý khi có Dynamic link gọi tới.
            handleDynamicLink(deepLink);
          }
        }, onError: (OnLinkErrorException e) async {
        //Hàm này sẽ xuất ra lỗi nếu link có vấn đề.
      print(e.message);
    });
  }
```

Hàm `handleDynamicLink()`,  `Dynamic Link` của mình sẽ có dạng `https://mydynamics.page.link/post/56`
```Dart
// Ở đây nếu link có chứa "post" thì sẽ cho nhảy đến màn hình Post và truyền param thứ 2 của link là 56 qua màn hình Post.
 void handleDynamicLink(Uri url) {
    List<String> separatedString = [];
    separatedString.addAll(url.path.split('/'));
    if (separatedString[1] == "post") {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => PostScreen(separatedString[2])));
    }
  }
```

Và kết quả khi nhấn vào link sẽ hiển thị như sau:

![](https://images.viblo.asia/921b0857-96c4-4994-9bd7-800ff65f2622.png)

# Tự tạo một Dynamic Link thay vì dùng Firebase Console:
Bạn có thể dùng hàm bên dưới để tạo một `Dynamick Link` bất cứ khi nào ở trong app.

```Dart
  static Future<String> buildDynamicLink() async {
    String url = "https://mydynamics.page.link";
    final DynamicLinkParameters parameters = DynamicLinkParameters(
      uriPrefix: url,
      link: Uri.parse('$url/post/56'),
      androidParameters: AndroidParameters(
         //Ở đây là tên package đã config trên Firebase.
        packageName: "com.example.dynamiclinks",
        minimumVersion: 0,
      ),
      iosParameters: IosParameters(
          //Ở đây là bundleId đã config trên Firebase.
        bundleId: "com.example.dynamiclinks",
        minimumVersion: '0',
      ),
      socialMetaTagParameters: SocialMetaTagParameters(
          description: "",
          imageUrl:
          Uri.parse("https://flutter.dev/images/flutter-logo-sharing.png"),
          title: ""),
    );
    final ShortDynamicLink dynamicUrl = await parameters.buildShortLink();
    return dynamicUrl.shortUrl.toString();
  }
}
```

Kết quả sẽ hiển thị như bên dưới:

![](https://images.viblo.asia/6036503a-c93e-4165-ac91-678036197772.png)


Bài viết đến đây là hết, cảm ơn các bạn đã đọc bài viết của mình :kissing_heart::kissing_heart::kissing_heart:


# Tham khảo
1. > https://firebase.google.com/docs/dynamic-links

2. > https://www.youtube.com/watch?v=IB4qATkJIJY