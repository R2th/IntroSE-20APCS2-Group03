#  Giới thiệu
Đối với lập trình viên mobile thì việc làm việc với deepkink hay applink là một điều không thể tránh khỏi. Hôm nay mình sẽ giới thiệu đến các bạn một plugin tuyệt vời để implement App/Deep Links (Android) Universal Links/ Custom URL schemes (iOS). khi lập trình với Flutter mà mình đã sử dụng rất nhiều. Đó chính là plugin [uni_links](https://pub.dev/packages/uni_links)
# Tiến hành
Việc đầu tiên phải làm là add uni_links vào pubspec dự án của bạn nhé
```
dependencies:
  uni_links: ^0.4.0
```
Để sử dụng được deeplink(ở đây mình gọi chung cho tất cả cấu hình cho dễ hiểu) thì cần phải config riêng cho từng platform ios và android
### Android
Uni links support cả hai kiểu "App Links" và "Deep Links"
* App Links:  chỉ work được với https chema và yêu cầu phải có một host đã được chỉ định cho ứng dụng của bạn
* Deep Links:  đối với deep link thì bạn có thể sử dụng bất kỳ custom schema nào mà bạn muốn mà không phải yêu cầu specified host nào. Điều này có thể gây nên sự confict với các app khác vì vậy bạn phải chắc chắn rằng custom schema của mình là duy nhất. (EX HST0000001://host.com)

Để config applink và deeplink cho android bạn vào file `android/app/src/main/AndroidManifest.xml:` và add các intent sau 

```
<manifest ...>
  <!-- ... other tags -->
  <application ...>
    <activity ...>
      <!-- ... other tags -->

      <!-- Deep Links -->
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with YOUR_SCHEME://YOUR_HOST -->
        <data
          android:scheme="[YOUR_SCHEME]"
          android:host="[YOUR_HOST]" />
      </intent-filter>

      <!-- App Links -->
      <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with https://YOUR_HOST -->
        <data
          android:scheme="https"
          android:host="[YOUR_HOST]" />
      </intent-filter>
    </activity>
  </application>
</manifest>
```

Thuộc tính `android:host ` là option tuỳ chọn đối với Deep link và bắt buộc đối với app link

Để tăng thêm tính đặc trưng, bạn có thể thêm thuộc tính `android: pathPrefix:` vào

```
<!-- Accepts URIs that begin with YOUR_SCHEME://YOUR_HOST/NAME/NAME... -->
<!-- Accepts URIs that begin with       https://YOUR_HOST/NAME/NAME... -->
<!-- note that the leading "/" is required for pathPrefix -->
<data
  android:scheme="[YOUR_SCHEME_OR_HTTPS]"
  android:host="[YOUR_HOST]"
  android:pathPrefix="/[NAME][/NAME...]" />
```

### IOS
Tương tự như android, uni links cũng support 2 type khác trên ios là "Universal Links" và "Custom URL schemes".
* Universal Links cũng chỉ work với 'https' schema và yêu cầ một specified host, các quyền và tệp được lưu trữ apple-app-site-association
* Custom URL schemes : cũng tương tự như deep link của android, bạn có thể sử dụng bất kỳ custom schema nào mà bạn muốn

Đối với Universal Links bạn cần add hoặc tạo quyền truy cập domain com.apple.developer.associated-domains  thông qua Xcode hoặc edit file ios/Runner/Runner.entitlements
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- ... other keys -->
  <key>com.apple.developer.associated-domains</key>
  <array>
    <string>applinks:[YOUR_HOST]</string>
  </array>
  <!-- ... other keys -->
</dict>
</plist>
```

Đối với Custom URL schemas bạn cần đặc tả schema của mình trong file ios/Runner/Info.plist
```
<?xml ...>
<!-- ... other tags -->
<plist>
<dict>
  <!-- ... other tags -->
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLName</key>
      <string>[ANY_URL_NAME]</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>[YOUR_SCHEME]</string>
      </array>
    </dict>
  </array>
  <!-- ... other tags -->
</dict>
</plist>
```
### Sử dụng trong Flutter
Việc config cho từng platform đã xong, bây giờ bạn chỉ việc implement trong flutter để app có thể bắt được link nhé

Có hai trường hợp app bạn sẽ nhận được link: App chưa khởi chạy và app đang chạy trong nền. 

`Initial Link (String)`  => Trả về link khi ứng dụng được start nếu có
```
import 'dart:async';
import 'dart:io';

import 'package:uni_links/uni_links.dart';
import 'package:flutter/services.dart' show PlatformException;

// ...

  Future<Null> initUniLinks() async {
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      String initialLink = await getInitialLink();
      // Parse the link and warn the user, if it is not correct,
      // but keep in mind it could be `null`.
    } on PlatformException {
      // Handle exception by warning the user their action did not succeed
      // return?
    }
  }

// ...
```

`Initial Link (Uri) ` => Tương tự như getInitialLink nhưng link được convert qua Uri type
```
 // Uri parsing may fail, so we use a try/catch FormatException.
    try {
      Uri initialUri = await getInitialUri();
      // Use the uri and warn the user, if it is not correct,
      // but keep in mind it could be `null`.
    } on FormatException {
      // Handle exception by warning the user their action did not succeed
      // return?
    }
    // ... other exception handling like PlatformException
```

`On change event (String) #` =>  Lắng nghe sự thay đổi của Link, thông thường sẽ sử dụng cách này
```
import 'dart:async';
import 'dart:io';

import 'package:uni_links/uni_links.dart';

// ...

  StreamSubscription _sub;

  Future<Null> initUniLinks() async {
    // ... check initialLink

    // Attach a listener to the stream
    _sub = getLinksStream().listen((String link) {
      // Parse the link and warn the user, if it is not correct
    }, onError: (err) {
      // Handle exception by warning the user their action did not succeed
    });

    // NOTE: Don't forget to call _sub.cancel() in dispose()
  }

// ...
```
`On change event (Uri)`  => Tương tự như `On change event (String)
```
import 'dart:async';
import 'dart:io';

import 'package:uni_links/uni_links.dart';

// ...

  StreamSubscription _sub;

  Future<Null> initUniLinks() async {
    // ... check initialUri

    // Attach a listener to the stream
    _sub = getUriLinksStream().listen((Uri uri) {
      // Use the uri and warn the user, if it is not correct
    }, onError: (err) {
      // Handle exception by warning the user their action did not succeed
    });

    // NOTE: Don't forget to call _sub.cancel() in dispose()
  }

// ...
```

Dưới đây là ví dụ đầy đủ về cách implement, cực kỳ đơn giản thôi, mời các bạn xem qua nhé
 
```
import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:uni_links/uni_links.dart';

void main() => runApp(MaterialApp(home: MyApp()));

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

enum UniLinksType { string, uri }

class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  String? _initialLink;
  Uri? _initialUri;
  String? _latestLink = 'Unknown';
  Uri? _latestUri;

  StreamSubscription? _sub;

  late final TabController _tabController;
  UniLinksType _type = UniLinksType.string;

  final List<String>? _cmds = getCmds();
  final TextStyle _cmdStyle = const TextStyle(
      fontFamily: 'Courier', fontSize: 12.0, fontWeight: FontWeight.w700);

  @override
  void initState() {
    super.initState();
    _tabController = TabController(vsync: this, length: 2)
      ..addListener(_handleTabChange);
    initPlatformState();
  }

  @override
  void dispose() {
    _sub?.cancel();
    _tabController.dispose();
    super.dispose();
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    if (_type == UniLinksType.string) {
      await initPlatformStateForStringUniLinks();
    } else {
      await initPlatformStateForUriUniLinks();
    }
  }

  /// An implementation using a [String] link
  Future<void> initPlatformStateForStringUniLinks() async {
    // Attach a listener to the links stream
    if (!kIsWeb)
      _sub = linkStream.listen((String? link) {
        if (!mounted) return;
        setState(() {
          _latestLink = link ?? 'Unknown';
          _latestUri = null;
          try {
            if (link != null) _latestUri = Uri.parse(link);
          } on FormatException {}
        });
      }, onError: (Object err) {
        if (!mounted) return;
        setState(() {
          _latestLink = 'Failed to get latest link: $err.';
          _latestUri = null;
        });
      });

    // Attach a second listener to the stream
    if (!kIsWeb)
      linkStream.listen((String? link) {
        print('got link: $link');
      }, onError: (Object err) {
        print('got err: $err');
      });

    // Get the latest link
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      _initialLink = await getInitialLink();
      print('initial link: $_initialLink');
      if (_initialLink != null) _initialUri = Uri.parse(_initialLink!);
    } on PlatformException {
      _initialLink = 'Failed to get initial link.';
      _initialUri = null;
    } on FormatException {
      _initialLink = 'Failed to parse the initial link as Uri.';
      _initialUri = null;
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _latestLink = _initialLink;
      _latestUri = _initialUri;
    });
  }

  /// An implementation using the [Uri] convenience helpers
  Future<void> initPlatformStateForUriUniLinks() async {
    // Attach a listener to the Uri links stream
    if (!kIsWeb)
      _sub = uriLinkStream.listen((Uri? uri) {
        if (!mounted) return;
        setState(() {
          _latestUri = uri;
          _latestLink = uri?.toString() ?? 'Unknown';
        });
      }, onError: (Object err) {
        if (!mounted) return;
        setState(() {
          _latestUri = null;
          _latestLink = 'Failed to get latest link: $err.';
        });
      });

    // Attach a second listener to the stream
    if (!kIsWeb)
      uriLinkStream.listen((Uri? uri) {
        print('got uri: ${uri?.path} ${uri?.queryParametersAll}');
      }, onError: (Object err) {
        print('got err: $err');
      });

    // Get the latest Uri
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      _initialUri = await getInitialUri();
      print('initial uri: ${_initialUri?.path}'
          ' ${_initialUri?.queryParametersAll}');
      _initialLink = _initialUri?.toString();
    } on PlatformException {
      _initialUri = null;
      _initialLink = 'Failed to get initial uri.';
    } on FormatException {
      _initialUri = null;
      _initialLink = 'Bad parse the initial link as Uri.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _latestUri = _initialUri;
      _latestLink = _initialLink;
    });
  }

  @override
  Widget build(BuildContext context) {
    final queryParams = _latestUri?.queryParametersAll.entries.toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Plugin example app'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'STRING LINK'),
            Tab(text: 'URI'),
          ],
        ),
      ),
      body: ListView(
        shrinkWrap: true,
        padding: const EdgeInsets.all(8.0),
        children: [
          ListTile(
            title: const Text('Initial Link'),
            subtitle: Text('$_initialLink'),
          ),
          if (!kIsWeb)
            ListTile(
              title: const Text('Link'),
              subtitle: Text('$_latestLink'),
            ),
          ListTile(
            title: const Text('Uri Path'),
            subtitle: Text('${_latestUri?.path}'),
          ),
          ExpansionTile(
            initiallyExpanded: true,
            title: const Text('Query params'),
            children: queryParams == null
                ? const [
                    ListTile(
                      dense: true,
                      title: const Text('null'),
                    ),
                  ]
                : [
                    for (final item in queryParams)
                      ListTile(
                        title: Text(item.key),
                        trailing: Text(
                          item.value.join(', '),
                        ),
                      ),
                  ],
          ),
          _cmdsCard(_cmds),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.error, color: Colors.red),
            title: const Text(
              'Force quit this example app',
              style: TextStyle(color: Colors.red),
            ),
          ),
          _cmdsCard(_cmds),
          const Divider(),
          if (!kIsWeb)
            ListTile(
              leading: const Icon(Icons.error, color: Colors.red),
              title: const Text(
                'Force quit this example app',
                style: TextStyle(color: Colors.red),
              ),
              onTap: () {
                if (kIsWeb) return;
                // WARNING: DO NOT USE this in production !!!
                //          Your app will (most probably) be rejected !!!
                if (Platform.isIOS) {
                  exit(0);
                } else {
                  SystemNavigator.pop();
                }
              },
            ),
        ],
      ),
    );
  }

  Widget _cmdsCard(List<String>? commands) {
    Widget platformCmds;

    if (commands == null) {
      platformCmds = const Center(child: Text('Unsupported platform'));
    } else {
      platformCmds = Column(
        children: [
          const [
            Text('To populate above fields open a terminal shell and run:\n'),
          ],
          intersperse(
              commands.map<Widget>((cmd) => InkWell(
                    onTap: () => _printAndCopy(cmd),
                    child: Text('\n$cmd\n', style: _cmdStyle),
                  )),
              const Text('or')),
          [
            Text(
              '(tap on any of the above commands to print it to'
              ' the console/logger and copy to the device clipboard.)',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.caption,
            ),
          ]
        ].expand((el) => el).toList(),
      );
    }

    return Card(
      margin: const EdgeInsets.only(top: 20.0),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: platformCmds,
      ),
    );
  }

  void _handleTabChange() {
    if (_tabController.indexIsChanging) {
      setState(() {
        _type = UniLinksType.values[_tabController.index];
      });
      initPlatformState();
    }
  }

  Future<void> _printAndCopy(String cmd) async {
    print(cmd);

    await Clipboard.setData(ClipboardData(text: cmd));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Copied to Clipboard')),
    );
  }
}

List<String>? getCmds() {
  late final String cmd;
  var cmdSuffix = '';

  if (kIsWeb) {
    cmd = 'Append something like the path in';
    cmdSuffix = ' to the Web app\'s URL';
  } else if (Platform.isIOS) {
    cmd = '/usr/bin/xcrun simctl openurl booted';
  } else if (Platform.isAndroid) {
    cmd = '\$ANDROID_HOME/platform-tools/adb shell \'am start'
        ' -a android.intent.action.VIEW'
        ' -c android.intent.category.BROWSABLE -d';
    cmdSuffix = "'";
  } else {
    return null;
  }

  // https://orchid-forgery.glitch.me/mobile/redirect/
  return [
    '$cmd "unilinks://host/path/subpath"$cmdSuffix',
    '$cmd "unilinks://example.com/path/portion/?uid=123&token=abc"$cmdSuffix',
    '$cmd "unilinks://example.com/?arr%5b%5d=123&arr%5b%5d=abc'
        '&addr=1%20Nowhere%20Rd&addr=Rand%20City%F0%9F%98%82"$cmdSuffix',
  ];
}

List<Widget> intersperse(Iterable<Widget> list, Widget item) {
  final initialValue = <Widget>[];
  return list.fold(initialValue, (all, el) {
    if (all.isNotEmpty) all.add(item);
    all.add(el);
    return all;
  });
}
```

Cảm ơn các bạn đã theo dõi
Nguồn: https://pub.dev/packages/uni_links