# Giới thiệu
Ở phần trước mình giới thiệu về GetConnect, và hướng dẫn cách sử dụng GetConnect để handle các api request. Ở phần này mình sẽ giới thiệu  component mới trong Getx là GetService

Để có thể hiểu nội dung của bài viết này bắt buộc các bạn phả đọc thêm về GetX ở các bài dưới đây:

- [-Get - Make Flutter easy (Part 1)](https://viblo.asia/p/get-make-flutter-easy-part-1-eW65G1wJZDO)
 
- [Get - Make Flutter easy (Part 2)](https://viblo.asia/p/get-make-flutter-easy-part-2-4P856np15Y3)

- [GetX - Flutter - Multiple language support with GetX (Part 3)](https://viblo.asia/p/getx-flutter-multiple-language-support-with-getx-part-3-GrLZDDqBZk0)

- [GetX - Flutter - Using GetConnect to handle API request (Part 4)](https://viblo.asia/p/flutter-getx-using-getconnect-to-handle-api-request-part-4-ORNZqdgrK0n)

# GetService
Về cơ bản GetService cũng hoạt động tương tự như GetController (Controller chịu trách nhiệm handle logic cũng như chứa các Observe field phục vụ cho việc update UI). 

```
Future<void> main() async {
  await initServices(); /// AWAIT SERVICES INITIALIZATION.
  runApp(SomeApp());
}

/// Is a smart move to make your Services intiialize before you run the Flutter app.
/// as you can control the execution flow (maybe you need to load some Theme configuration,
/// apiKey, language defined by the User... so load SettingService before running ApiService.
/// so GetMaterialApp() doesnt have to rebuild, and takes the values directly.
void initServices() async {
  print('starting services ...');
  /// Here is where you put get_storage, hive, shared_pref initialization.
  /// or moor connection, or whatever that's async.
  await Get.putAsync(() => DbService().init());
  await Get.putAsync(SettingsService()).init();
  print('All services started...');
}

class DbService extends GetxService {
  Future<DbService> init() async {
    print('$runtimeType delays 2 sec');
    await 2.delay();
    print('$runtimeType ready!');
    return this;
  }
}

class SettingsService extends GetxService {
  void init() async {
    print('$runtimeType delays 1 sec');
    await 1.delay();
    print('$runtimeType ready!');
  }
}
```

GetService cũng có lifecycle tươn tự như GetController (`onInit(), onReady(), onClose()`)  tuy nhiên sẽ không có  các 'logic'  riêng biệt cho từng màn hình. Nó đơn giản chỉ là thông báo cho GetX Dependency Injection system biết rằng service này không thể bị xoá khỏi bộ nhớ một cách thông thường. 

Cách duy nhất để xoá một GetService khỏi memory là gọi function `Get.reset()`

Vì những đặt tính như trên mà GetService rất thích hợp để khởi tạo các service sẽ được dùng trong xuyên xuốt vòng đời app : ApiService, StorageService, AuthenService....

Ở bài học hôm nay mình sẻ sử dụng GetService trong việc handle Authen và lắng nghe kết nối mạng trong app

### 1. Handle Authen
```
class AuthService extends GetxService {
  StorageProvider _storageProvider = Get.find();
  TokenModel tokenModel;

  @override
  void onInit() {
    super.onInit();
    tokenModel = _storageProvider.getToken();

    _storageProvider.addTokenListener((TokenModel token) {
      if (token == null) {
        Get.offAllNamed(AppRoute.routeLoginScreen());
      }
      tokenModel = token;
    });
  }

  bool hasLogin() => tokenModel != null;
}


```
 Ở đây mình tạo ra một class `AuthService` extends từ `GetxService` class này sẽ chịu trách nhiệm keep token references của user hiện tại. Và sẽ tự động redirect đến màn hình Login (`Get.offAllNamed(AppRoute.routeLoginScreen());`) nếu quá trình refreshToken bị thất bại (`TokenModel` bị xoá khỏi `Storage` : ở đây mình sử dụng `GetStorage` thay cho `SharedPreferences` mọi người có thể tìm hiểu thêm về component này nhé)
 
 Việc refreshToken sẽ được thực hiện như bên dưới, ở đây mình tiếp tục sử dụng GetXConnect để thao tác với api
 
```
class BengKeiApiProvider extends BaseProvider {
  @override
  void onInit() {
    httpClient.baseUrl = "http://bengkelrobot.net:8002";
    httpClient.timeout = Duration(seconds: 15);
    httpClient.maxAuthRetries = 3;

    httpClient.addAuthenticator((request) async {
      var newToken;
      try {
        newToken = await Get.find<UserRepositoryImpl>().refreshToken();
      } catch (_) {
        newToken = Get.find<AuthService>().tokenModel;
      }
      request.headers['Authorization'] = 'Bearer ${newToken.accessToken}';
      return request;
    });

    httpClient.addRequestModifier((request) async {
      var authService = Get.find<AuthService>();
      if (authService.tokenModel != null) {
        request.headers['Authorization'] =
            'Bearer ${authService.tokenModel.accessToken}';
      } else {
        request.headers['Authorization'] = 'Basic ' +
            base64Encode(
                utf8.encode('bengkel-robot-client:bengkel-robot-secret'));
      }
      return request;
    });
      }
      
    Future<TokenModel> refreshToken(RefreshTokenRequest request) {
            return postDeserialize<TokenModel>(
              '/oauth/token',
              FormData(
                JsonMapper.toMap(request),
              ),
            );
  }
  }
```
 Để hiểu hơn về `GetConnect` các bạn đọc thêm về bài trước của mình nhé. (Ở đây mình có sử dụng `JsonMapper` được provide từ plugin `dart_json_mapper` để thuận tiện cho việc conver json to modal và ngược lại)
 
Đừng bên inject AuthenService class vào AppBinding nhé (Đọc thêm ở bài Dependencies with GetX)
```
class AppBinding extends Bindings {

  @override
  void dependencies() {
    injectService();
  }

  void injectService() {
    Get.put(AuthService());
    Get.put(ConnectivityService());
  }
}

class MyApp extends StatelessWidget {
  const MyApp({
    this.appConfig,
  });

  final AppConfig appConfig;

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        locale: LocalizationService.locale,
        fallbackLocale: LocalizationService.fallbackLocale,
        translations: LocalizationService(),
        initialRoute: AppRoute.routeHomeScreen(),
        initialBinding: AppBinding(appConfig: appConfig),
        getPages: AppRoute.generateGetPages(),
    );
}

```

### 2. Hanlde Connectitvity
Để các bạn hiểu rõ hơn mình sẽ tạo thêm một Service nữa tạm gọi là `ConnectitvityService`
```
class ConnectivityService extends GetxService {
  bool isShowingDialog = false;

  @override
  void onInit() async {
    super.onInit();
    var result = await Connectivity().checkConnectivity();
    if (result == ConnectivityResult.none) {
      isShowingDialog = true;
      showDialog();
    }

    Connectivity().onConnectivityChanged.listen((event) {
      if (event == ConnectivityResult.none) {
        isShowingDialog = true;
        showDialog();
      } else {
        if (isShowingDialog) {
          Get.back();
          isShowingDialog = false;
        }
      }
    });
  }

  void showDialog() {
    Get.dialog(
      CupertinoAlertDialog(
        title: Text(
            'Please turn on network connection to continue using this app'),
      ),
      barrierDismissible: false,
    );
  }
}

```

Service này chịu trách nhiệm lắng nghe sự thay đổi của network connection: nếu trong trường hợp không có kết nối internet nó sẽ show một Dialog bất người dùng phải turn on network connection, service này sẽ rất cần thiết cho các app yêu cầu phải có kết nối mạng liên tục ở mọi màn hình

Trên đây là hai case sử dụng cơ bản của GetService, ngoài ra còn rất nhiều cách sử dụng khác nữa. Đọc thêm bài này bạn đã sẵn sàng để sử dụng GetX chưa. Một Plugin tuyệt vời cho dev Flutter phải không nào, Cảm ơn các bạn. Ở bài tiếp theo mình sẽ đi sâu vào giải thích cách hoạt động của refresh token trong GetX và hướng dẫn các bạn tạo một demo hoàn chỉnh nhé. Cảm ơn mọi người đã theo dõi