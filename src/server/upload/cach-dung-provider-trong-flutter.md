Trong quá trình phát triển app native thì vấn đề quản lý state là vấn đề chung cần được giải quyết. Cách dùng Provider là một trong các cách phổ biến. Ngoài ra các bạn có thể tham khảo cách quản lý state [ở đây ](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options)

Trong bài hướng dẫn này, tôi sẽ hướng dẫn bạn apply provider trong app. Demo app bao gồm 3 màn hình :
1. Home
1. About
1. Settings

Từ màn setting screen, bạn có thể đổi font chữ, các màn home , abount screen sẽ bị đổi font. Đầu tiên, bạn hãy cài [thư viện ](https://pub.dev/packages/provider)

![](https://images.viblo.asia/e3de908c-9757-40c3-8adc-327413f6f4cb.gif)

1. Khái niệm Global State 
Nếu bạn đã sử dụng  widget statefull , bạn sẽ về state và cách dùng state trong fullter như thế nào . Nhưng chúng tôi muốn dùng global state  để có thể dùng ở các màn hình hoặc có thể truy cập data. Bạn có thể nhìn sơ đồ trực quan sau  : 

![](https://images.viblo.asia/7f35cc97-5d4d-4a48-910a-86d6ec65f385.png)

1. My App là main widget là nơi chúng ta có bind **App State **
2. Tất cả màn hình đều là con của widget MyApp.
3. Nhưng chúng ta có global state thì chúng ta có thể truy cập ở bất cứ nơi nào 1 cách dễ dàng .

## 2. Tạo App
Tôi sẽ dùng Android Studio để tạo app với tên "states_providers". Bạn sẽ tạo 5 file trong thư mục **lib**: 
1. model/ui.dart
2. about.dart
3. drawer_menu.dart
4. home.dart
5. settings.dart

![](https://images.viblo.asia/4600bbb1-e808-4318-9183-c37b1f9cfa08.png)

Sau đó bạn sẽ cài trong file **pubspec.yaml**: 

flutter_lorem: ^1.1.0 
provider: ^4.3.2+2

Chúng ta cần flutter_lorem để thực hiện random text. 

## 3.  Important concept
Để dùng được global state bằng Provider , chúng ta cần hiểu 3 class sau : 
1. ChangeNotifier
2. ChangeNotifierProvider
3. Consumer

**ChangeNotifier**: Nó có nhiệm vụ thông báo cho người nghe. 

**ChangeNotifierProvider**: Nó sẽ lắng nghe khi **ChangeNotifier**.**notifyListeners** được gọi và thông báo tới các hàm build liên quan . 

**Consumer**: đơn giản nó chỉ là một Widget do thư viện cung cấp . Chúng ta dùng widget này  để lấy ra object thay vì phải gọi **Provider.of**. Bạn tham khảo về class này ở đây nhé : https://pub.dev/documentation/provider/latest/provider/Consumer-class.html  .
## 4. Tạo Model : 
Mở file model/ui.dart và viết đoạn code sau : 
```
import 'package:flutter/material.dart';

class UI with ChangeNotifier {
  double _fontSize = 0.5;

  set fontSize(newValue) {
    _fontSize = newValue;
    notifyListeners();
  }

  double get fontSize => _fontSize * 30;

  double get sliderFontSize => _fontSize;
}
```

Ở đây tôi tạo class UI implement class **ChangeNotifier**, tạo biến private font_size và một số method có thể truy cập hoặc thay đổi value. 

![](https://images.viblo.asia/e3a81457-aea6-43a6-817a-e3e47f5a54d8.png)

Trong hàm  **set fontSize(newValue)**,  bạn sẽ thấy có hàm **notifyListeners()** ở cuối . Nếu value fontSize thay đổi , nó thông báo cho người nghe của nó . Nếu bạn ko viết hàm này thì sẽ không có điều gì xảy ra , nó rất là quan trọng.
Một điều khác là slider value có phạm vị giá trị từ 0.0 -> 1.0 Nhưng tôi muốn điều chỉnh font với kích thước có thể đọc được . Tôi sẽ *30 giá trị của value nó lên : 

`double get fontSize => _fontSize * 30;`

4. Thay đổi  Main.dart

Mở file main.dart , xoá tất cả các đoạn code thay bằng đoạn code sau : 
```
import 'package:flutter/material.dart';
import 'package:states_provider/home.dart';
import 'package:states_provider/about.dart';
import 'package:states_provider/settings.dart';
import 'package:provider/provider.dart';
import 'package:states_provider/model/ui.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UI()),
      ],
      child: MaterialApp(
        initialRoute: '/',
        routes: {
          '/': (context) => Home(),
          '/about': (context) => About(),
          '/settings': (context) => Settings(),
        },
      ),
    );
  }
}
```

Trong MyApp, chúng ta tạo widget **MultiProvider** , trong list **providers** chúng ta truyền `ChangeNotifierProvider(create: (_) => UI())`. UI là model class  và dùng ChangeNotifierProvider để tạo instance của class UI. Trong phần child của widget MultiProvider tôi sẽ tạo widget MaterialApp để config routing. Trong app nếu bạn muốn có nhiều provider thì bạn  thêm `ChangeNotifierProvider(create: (_) => YOUR_DATA_MODEL())` vào trong list **providers**.

## 5. Tạo drawer menu
Trong menu sẽ có 3 item : Home, About, Settings
![](https://images.viblo.asia/f98cc680-c9ad-4024-93f0-6d1019d98aac.png)

Mở file drawer_menu.dart và thêm đoạn code sau : 
```
import 'package:flutter/material.dart';

const kTitle = 'Provider';

class DrawerMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            child: Center(
              child: Text(
                kTitle,
                style: TextStyle(
                  fontSize: Theme.of(context).textTheme.title.fontSize,
                  color: Colors.white,
                ),
              ),
            ),
            decoration: BoxDecoration(
              color: Colors.teal,
            ),
          ),
          getListTile('Home', onTap: () {
            Navigator.pushReplacementNamed(context, '/');
          }),
          getLine(),
          getListTile('About', onTap: () {
            Navigator.pushReplacementNamed(context, '/about');
          }),
          getLine(),
          getListTile('Settings', onTap: () {
            Navigator.pushReplacementNamed(context, '/settings');
          }),
        ],
      ),
    );
  }

  Widget getLine() {
    return SizedBox(
      height: 0.5,
      child: Container(
        color: Colors.grey,
      ),
    );
  }

  Widget getListTile(title, {Function onTap}) {
    return ListTile(
      title: Text(title),
      onTap: onTap,
    );
  }
```

## 6. Tạo màn Home 
Bây giờ , mình sẽ tạo màn home screen và dùng để show random text : 
![](https://images.viblo.asia/086a6c4c-fa12-48c0-89bb-ddd1bab22e1c.png)

Mở file home.dart và thêm đoạn code sau : 
```
import 'package:flutter/material.dart';
import 'package:states_provider/drawer_menu.dart';
import 'package:flutter_lorem/flutter_lorem.dart';
import 'package:provider/provider.dart';
import 'package:states_provider/model/ui.dart';

const kAppTitle = 'State Management by Provider';
const kStateType = 'Provider';

class Home extends StatelessWidget {
  String text = lorem(paragraphs: 3, words: 50);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(kAppTitle),
        backgroundColor: Colors.teal,
      ),
      drawer: DrawerMenu(),
      body: Container(
        margin: EdgeInsets.all(10),
        child: Consumer<UI>(    (1)
          builder: (context, ui, child) {   (2)
            return RichText(
              text: TextSpan(
                text: text,
                style: TextStyle(fontSize: ui.fontSize, color: Colors.black),
              ),
            );
          },
        ),
      ),
    );
  }
}
```
Đoạn code trên rất dễ hiểu . Cần lưu ý rằng nhớ sử dụng
(1) **Consumer<UI>** , đoạn này dùng để giúp ta lấy ra được model của class UI.
(2) Ở đoạn code này chúng ta truyền 1 function với 3 tham số :  **context**, **ui**, and **child**. Trong đó **ui** là một instance của class UI và đã được binded main widget **MyApp**. 
    
  Bây giờ trong builder function , tôi sẽ đặt widget : 
  ```
  TextSpan(
                text: text,
                style: TextStyle(fontSize: ui.fontSize, color: Colors.black),
  )
```
    
   để hiển thị kết quả front chữ  . 
    
    
##     7. Màn hình About 
    
 Tương tự như màn hình Home , bạn mở file about.dart và thêm đoạn code sau : 
    
 ```
 import 'package:flutter/material.dart';
import 'package:flutter_lorem/flutter_lorem.dart';
import 'package:states_provider/drawer_menu.dart';
import 'package:provider/provider.dart';
import 'package:states_provider/model/ui.dart';

class About extends StatelessWidget {
  String text = lorem(paragraphs: 3, words: 50);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About'),
        backgroundColor: Colors.teal,
      ),
      drawer: DrawerMenu(),
      body: Container(
        margin: EdgeInsets.all(10.0),
        child: Consumer<UI>(
          builder: (context, ui, child) {
            return RichText(
              text: TextSpan(
                text: text,
                style:
                    TextStyle(fontSize: ui.fontSize, color: Colors.lightBlue),
              ),
            );
          },
        ),
      ),
    );
  }
}
   ```
    
##     8. Màn Setting 
  Đây là màn hình mà người dùng sẽ thay đổi front chữ : 
    ![](https://images.viblo.asia/aae6a64c-89a9-4ce5-ab81-00d8653237a6.png)

Mở file setting.dart và thêm đoạn code sau : 
    
   ```
    import 'package:flutter/material.dart';
import 'package:states_provider/drawer_menu.dart';
import 'package:provider/provider.dart';
import 'package:states_provider/model/ui.dart';

class Settings extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.teal,
        title: Text('Settings'),
      ),
      drawer: DrawerMenu(),
      body: Consumer<UI>(builder: (context, ui, child) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(left: 20, top: 20),
              child: Text(
                'Font Size: ${ui.fontSize.toInt()}',
                style: TextStyle(
                    fontSize: Theme.of(context).textTheme.headline5.fontSize),
              ),
            ),
            Slider(
                min: 0.5,
                value: ui.sliderFontSize,
                onChanged: (newValue) {
                  ui.fontSize = newValue;
                }),
          ],
        );
      }),
    );
  }
}
   ```
    
   Màn này khác với màn home là màn này vừa có thể truy cập vừa có thể update data front size bằng đoạn code : `ui.fontSize = newValue.`. Khi mở các màn hình home, about front chữ sẽ được cập nhật .
   Đây là ví dụ đơn giản để các bạn hiểu cách dùng global state bằng thư viện provider. Bài viết của mình đến đây là kết thúc. 
    
##     Tài liệu tham khảo 
    https://medium.com/level-up-programming/how-to-use-provider-in-flutter-f4998acb4702