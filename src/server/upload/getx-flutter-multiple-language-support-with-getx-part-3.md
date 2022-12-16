# Giới thiệu
Xin chào các bạn, nếu là một lập trình viên Flutter, chắc hẳn các bạn đã nghe về GetX, một plugin tuyệt vời và đang ngày một lớn mạnh, mình đã có chia sẻ về GetX ở hai bài trước, các bạn đọc ở link phía dưới nhé. Trải qua nhiều bản update GetX đã bổ sung thêm nhiều function tuyệt vời, giúp việc code flutter trở nên đơn giản hơn bao giờ hết. Ngày hôm nay mình sẽ hướng dẫn cách implement multiple language trong flutter bằng GetX chỉ qua vài bước đơn giản, với GetX bây giờ bạn không phải dùng bất kỳ plugin nào khác để implement function này nữa.

Đọc thêm về GetX:

- [-Get - Make Flutter easy (Part 1)](https://viblo.asia/p/get-make-flutter-easy-part-1-eW65G1wJZDO)
 
- [Get - Make Flutter easy (Part 2)](https://viblo.asia/p/get-make-flutter-easy-part-2-4P856np15Y3)

# Tiến hành
Thêm GetX vào pubspec trước nhé, mạnh dạn dùng version mới nhất có thể thôi
```
dependencies:
  flutter:
    sdk: flutter
  get: ^3.24.0
```

- Đầu tiên là tạo các file Strings resource cho từng ngôn ngữ

File **st_en_us.dart** cho ngôn ngữ english
```
  const Map<String, String> en = {
  'hello': 'Hello',
  'multipleLanguage' : 'Multiple language'
};
```

File **st_vi_vn.dart** cho ngôn ngữ Tiếng Việt
```
  const Map<String, String> en = {
  'hello': 'Xin chào',
  'multipleLanguage' : 'Đa ngôn ngữ'
};
```

Tiếp theo là class **LocalizationService**: Class này extends từ class Translations của GetX,  chiệu trách nhiệm config các ngôn ngữ support của app, cũng như có function changeLocate nếu bạn muốn tự thay đổi ngôn ngữ ứng dụng mà không cần phụ thuộc vào ngôn ngữ hệ thống

```
class LocalizationService extends Translations {

// locale sẽ được get mỗi khi mới mở app (phụ thuộc vào locale hệ thống hoặc bạn có thể cache lại locale mà người dùng đã setting và set nó ở đây)
  static final locale = _getLocaleFromLanguage();

// fallbackLocale là locale default nếu locale được set không nằm trong những Locale support
  static final fallbackLocale = Locale('en', 'US');

// language code của những locale được support
  static final langCodes = [
    'en',
    'vi',
  ];

// các Locale được support
  static final locales = [
    Locale('en', 'US'),
    Locale('vi', 'VN'),
  ];


// cái này là Map các language được support đi kèm với mã code của lang đó: cái này dùng để đổ data vào Dropdownbutton và set language mà không cần quan tâm tới language của hệ thống
  static final langs = LinkedHashMap.from({
    'en': 'English',
    'vi': 'Tiếng Việt',
  });

// function change language nếu bạn không muốn phụ thuộc vào ngôn ngữ hệ thống
  static void changeLocale(String langCode) {
    final locale = _getLocaleFromLanguage(langCode: langCode);
    Get.updateLocale(locale);
  }

  @override
  Map<String, Map<String, String>> get keys => {
        'en_US': en,
        'vi_VN': vi,
      };

  static Locale _getLocaleFromLanguage({String langCode}) {
    var lang = langCode ?? Get.deviceLocale.languageCode;
    for (int i = 0; i < langCodes.length; i++) {
      if (lang == langCodes[i]) return locales[i];
    }
    return Get.locale;
  }
}

```
Cấu trúc package như sau

![](https://images.viblo.asia/67688144-48dd-4d16-938b-e76f44ff6fa3.png)

### Sử dụng
Đầu tiên là config App, Như thường lệ, để sử dụng được hết các function của GetX các bạn phải sử dụng GetMaterialApp thay cho MaterialApp
```
class MyApp extends StatelessWidget {

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
      initialBinding: AppBinding(),
      getPages: AppRoute.generateGetPages(),
    );
  }
}
```

Vai trò của từng component trong LocalizationService mình đã giải thích rõ trong class LocalizationService phía trên

Sử dụng trong HomeScreen
```
class _HomeScreenState extends State<HomeScreen> {
  String _selectedLang = LocalizationService.locale.languageCode;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('hello'.tr),
      ),
      body: Container(
        child: Center(
          child: DropdownButton<String>(
            icon: Icon(Icons.arrow_drop_down),
            value: _selectedLang,
            items: _buildDropdownMenuItems(),
            onChanged: (String value) {
              setState(() => _selectedLang = value);
              LocalizationService.changeLocale(value);
            },
          ),
        ),
      ),
    );
  }

  List<DropdownMenuItem<String>> _buildDropdownMenuItems() {
    var list = List<DropdownMenuItem<String>>();
    LocalizationService.langs.forEach((key, value) {
      list.add(DropdownMenuItem<String>(
        value: key,
        child: Text(key),
      ));
    });
    return list;
  }
}
```

Ở đây để một string tự động dịch theo ngôn ngữ đã được setup thì các bạn chỉ việc thêm vào exstension funcstion 'tr' của GetX **Text('hello'.tr),** với hello là key của String mà các bạn khai báo trong các strings resource.

Ở trên mình đã thêm một DropDownButton cho phép thay đổi ngôn ngữ ứng dụng mà không phụ thuộc vào ngôn ngữ hệ thống: chỉ việc gọi hàm LocalizationService.changeLocale(String langCode) thì ngay lập tức các string sẽ được update theo đúng ngôn ngữ mới

Demo một tí nhé
![](https://images.viblo.asia/03ad4590-4d6d-43d0-918c-5003f9d5c8f7.png)![](https://images.viblo.asia/93c5b8c2-7849-41e4-8929-f4804b12bdd1.png)

Cảm ơn các bạn đã theo dõi :D