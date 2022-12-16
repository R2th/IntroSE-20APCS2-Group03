![image.png](https://images.viblo.asia/2a4b55df-5762-4f0e-baa8-e930ff01233d.png)

Trong bài viết này, chúng ta sẽ tìm hiểu kỹ hơn một số **Widget** được cung cấp bởi package **Flutter Material**. Chúng ta cũng sẽ học cách có thể tạo các Widget tùy chỉnh của riêng mình và cách chúng hoạt động. Cùng với đó, chúng ta sẽ ứng dụng chúng vào một app thú vị. Bắt đầu thôi nào!!

> Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/flutter-co-ban-cach-phan-chia-widget/

## Giới thiệu app demo

![image.png](https://images.viblo.asia/cf9089a6-1d45-4e9a-8c01-537d6a771a8d.png)

Đây chỉ giản là app có một màn hình và chỉ bao gồm các Stateless Widget. Còn gì tuyệt hơn việc tạo app cho chính bạn để bạn để có thể giới thiệu các app của bạn trong tương lai đúng không nào.

Ngoài ra, hãy lưu ý rằng khi nhấn vào nút Website, Call Me hoặc Email Me, nó sẽ lập tức mở ra Browser mặc định, Phone app hoặc Email app. Ngon lành! Chúng ta hãy xem bằng cách nào mà chúng ta có thể xây dựng được app thế này.

## Hướng dẫn làm app Portfolio

### Khởi tạo dự án

Tạo một ứng dụng Flutter mới bằng cách sử dụng lệnh `flutter create <your_app_name>` hoặc để biết thêm chi tiết, hãy tham khảo bài viết dưới đây:

https://200lab.io/blog/flutter-co-ban-xay-dung-ung-dung-dau-tien/

Khi app đã được tạo, hãy xóa tất cả nội dung trong **main.dart** để bắt đầu lại từ đầu.

Chúng ta cần một package (hoặc thư viện) có thể gọi vào các app khác của native. Package này được gọi là `url_launcher`. Để cài đặt package này, hãy mở file `pubspec.yaml` và trong phần **dependencies** hãy thêm `url_launcher: ^ 5.7.10` như sau:

```
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.0
  url_launcher: ^5.7.10
```

Đây là cấu trúc của file YAML do đó nó cần khai báo đúng cách khoảng trắng/thụt đầu dòng. Vì vậy, hãy đảm bảo rằng bạn làm chính xác như trên. Chi tiết về package ban có thể xem [tại đây](https://pub.dev/packages/url_launcher).

### Tạo bố cục cơ bản

Với package được cài đặt, chúng ta có thể tiếp tục với việc tạo bố cục cơ bản của app. Trong file `main.dart`, hãy import file `material.dart` từ **material package**. Sau đó khai báo hàm main và tạo một **Stateless Widget** mới có tên **MyApp**. File main.dart của bạn sẽ trông như thế này:

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portfolio App',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Text('We are building this awesome app!Yay!!!!'),
    );
  }
}
```

Đây là phần bố cục, layout cơ bản của ứng dụng của chúng ta và khi chạy ứng dụng, bạn sẽ thấy màn hình màu đen với dòng chữ màu đỏ. Bây giờ, chúng ta cần bổ sung các style vào cho chúng.

### Scaffold

**Scaffold Widget** được cung cấp bởi **material package** cung cấp một số thông tin nhất định. Trong đó có `appBar`, `body`, `drawer`, v.v. Ví dụ để xử dụng thanh nav bar, chúng ta dùng AppBar widget truyền vào cho nó:

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portfolio App',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Portfolio'),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Column(),
        ),
      ),
    );
  }
}
```

Tới đây, bạn đã có thể thấy một app bar và phần nội dung trắng trơn (empty body). Các `SingleChildScrollView` và `Column` widget cũng được cung cấp bởi material package. `SingleChildScrollView` giúp cho child của nó có thể scroll được và `Column` là một widget để layout các child của nó được căn chỉnh từ trên xuống dưới theo mặc định.

## Finish app

Code được xây dựng đầy đủ của chúng ta trông như thế này:

```
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  _launchNativeApps(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Portfolio App',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        backgroundColor: Color.fromRGBO(227, 234, 237, 1),
        appBar: AppBar(
          title: Text(
            'Portfolio',
          ),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children:[
              SizedBox(height: 30),
              CircleAvatar(
                radius: 100,
                backgroundColor: Theme.of(context).primaryColor,
                child: CircleAvatar(
                  radius: 95,
                  backgroundColor: Colors.white70,
                  backgroundImage:
                      NetworkImage('https://i.ibb.co/n3RzK2L/shashank.jpg'),
                ),
              ),
              SizedBox(height: 20),
              Text(
                'Shashank Biplav',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Divider(),
              ),
              Text(
                'SOFTWARE ENGINEER & TECH BLOGGER',
                style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
                child: Divider(),
              ),
              Padding(
                padding: const EdgeInsets.all(30.0),
                child: Text(
                  'Hello, I am Shashank Biplav a Full-Stack developer based in India specializing in building apps for Mobile and the Web.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 18),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                child: RaisedButton(
                  onPressed: () {
                    _launchNativeApps(
                        'https://shashankbiplav.com');
                  },
                  child: Container(
                    height: 40,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.person_outline_rounded,
                          size: 30,
                          color: Colors.blue[800],
                        ),
                        Text(
                          'Website',
                          style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 15,
                              color: Colors.grey[700]),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                child: RaisedButton(
                  onPressed: () {
                    _launchNativeApps('tel:+917004026852');
                  },
                  child: Container(
                    height: 40,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.wifi_calling_rounded,
                          size: 30,
                          color: Colors.greenAccent[700],
                        ),
                        SizedBox(width: 20),
                        Text(
                          '+91- 700-402-6852',
                          style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 20,
                              color: Colors.grey[700]),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                child: RaisedButton(
                  onPressed: () {
                    _launchNativeApps(
                        'mailto:biplavshashank7@gmail.com?subject=I would like to build an app with you!&body=Hi there,\n I have an awesome app idea,\n\n');
                  },
                  child: Container(
                    height: 40,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.email_rounded,
                          size: 30,
                          color: Colors.red[800],
                        ),
                        Text(
                          'biplavshashank7@gmail.com',
                          style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 15,
                              color: Colors.grey[700]),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
```

WOW! File này khá là lớn. Chúng ta sẽ phải chia nó thành các file nhỏ hơn, tức là các Widget sau này nhưng tạm thời bây giờ chúng ta hãy hiểu điều gì đang xảy ra ở đây. Tất cả các Widget được sử dụng ở trên vẫn đều được cung cấp bởi material package.

### SizedBox Widget

Widget này bình thường sẽ không nhìn thấy trên giao diện trừ khi có một widget hiển thị nào đó được truyền vào. Ở đây chúng ta chỉ cung cấp cho nó chiều cao (height). Vì vậy, nó hoạt động như một widget cung cấp không gian theo chiều dọc. Chúng ta sử dụng chúng để thêm khoảng cách giữa các widget.

### CircleAvatar Widget

Widget này tạo thành một vòng tròn với kích thước do chúng ta xác định. Nó cần các tham số như radius, backgroundColor, backgroundImage, child, v.v. Ở đây chúng ta đang sử dụng hai CircleAvatar widget. Một cái giữ hình ảnh hồ sơ và có bán kính nhỏ hơn hình ảnh gốc của nó. Widget có bán kính lớn hơn một chút để nó trải rộng ra và tạo hiệu ứng đường viền tròn có màu xanh lam.

### Text Widget

Text Widget được sử dụng để hiển thị một số text với style riêng của chúng ta. Chúng ta dùng widget này để hiển thị tất cả các văn bản của chúng ta với các kích thước phông chữ, trọng lượng (weight) phông chữ và màu sắc khác nhau.

### RaisedButton Widget

Như tên của nó, các widget `RaisedButton` cung cấp cho chúng ta một button được build sẵn. Nó xuất hiện trên màn hình bằng với một shadow (đổ bóng). Chúng ta có thể cung cấp một child widget cho nó. Trong trường hợp này, ta đang cung cấp cho nó một `Container` có `Row` là child của nó. Row cũng chứa hai widget lồng nhau là `Icon` widget và `Text` widget.

Chúng ta cũng có thể gán bất kỳ chức năng nào mà chúng ta muốn `RaisedButton` thực thi bằng cách sử dụng thuộc tính `onPressed`. Trong trường hợp này, ta sử dụng hàm `_launchNativeApps(...)`. Chức năng này thực hiện mỗi khi nút được nhấn.

### Function _launchNativeApps()

Trong hàm này, chúng ta sử dụng một hàm có tên `canLaunch(...)` được cung cấp bởi `url_launcher package` mà chúng ta đã cài đặt trước đó. Đây là một chức năng bất đồng bộ để kiểm tra xem liệu url được cung cấp có thể chạy được trong ứng dụng tương thích khác hay không. Nếu một ứng dụng như vậy đang có trong thiết bị thì ứng dụng đó được khởi động với các giá trị được xác định trước của chúng ta trong url và nếu không có thì nó sẽ gây ra lỗi.

### Chia app thành các widget nhỏ hơn

Hiện tại, đây là một single page app nhưng hãy tưởng tượng nếu chúng ta bao gồm `routing`, `multiple screens`, `navigation drawer/ bottom nav bar`, v.v. Nó sẽ rất lớn và việc viết tất cả những thứ đó trong một file duy nhất sẽ là điều kinh khủng. Ngoài ra, việc maintain và debug code cũng sẽ là một cơn ác mộng!

Để khắc phục vấn đề này, chúng ta có thể chia ứng dụng thành các widget riêng biệt. Trong đoạn code trên, chúng ta có thể thấy rõ ràng rằng 3 nút có code gần như giống nhau và điều duy nhất khác biệt là url của chúng. Vì vậy, những gì chúng ta có thể làm là tạo một widget riêng cho nút và sử dụng chúng ba lần thay vì viết cùng một đoạn code ba lần.

Vì vậy, chúng ta sẽ tạo một file mới trong thư mục lib có tên là `custom_button.dart`. Trong file này, chúng ta sẽ import `material.dart` như thường lệ và tạo một `StatelessWidget` mới để chuyển tất cả code liên quan đến `Button` vào trong file này. Nó sẽ trông giống thế này:

```
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class CustomButton extends StatelessWidget {
  final String uri;
  final IconData icon;
  final String buttonText;
  CustomButton({this.uri, this.icon, this.buttonText});

  _launchNativeApps(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30),
      child: RaisedButton(
        onPressed: () {
          _launchNativeApps(uri);
        },
        child: Container(
          height: 40,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(
                icon,
                size: 30,
                color: Colors.blue[800],
              ),
              Text(
                buttonText,
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                    color: Colors.grey[700]),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

Ở đây, chúng ta đã chuyển function `_launchNativeApps (..) {...}` qua từ file `main.dart`. Ngoài ra, chúng ta khởi tạo widget này với tất cả các tham số như `uri`, `icon` và `buttonText` đến widget này để hiển thị các nội dung khác nhau.

Bạn sẽ nhận thấy rằng mình đã sử dụng `{..}` trong hàm khởi tạo `CustomButton({this.uri, this.icon, this.buttonText});`. Đây là cú pháp hàm dựng rút gọn mà dart cung cấp cho chúng ta. `{..}` làm cho điều này dễ dàng hơn khi widget phải chuyển các giá trị các biến tương ứng của chúng. Ví dụ: nếu chúng ta sử dụng `CustomButton` widget của mình ở bất kỳ đâu thì nó như thế này:

```
CustomButton(
         uri: 'https://shashankbiplav.com',
         icon: Icons.person_outline_outlined,
         buttonText: 'Website',
),
```

> Với điều này, lợi thế là hàm dựng sẽ rõ ràng hơn và ta không phải nhớ thứ tự của các biến cần truyền vào nữa.

Chúng ta cũng có thể tạo một Widget riêng cho ảnh đại diện và chúng ta sẽ đặt tên file là `profile_image.dart` trong thư mục lib. Chúng ta sẽ di chuyển tất cả code liên quan đến hình ảnh của chúng ta ở đây vào `StatelessWidget` mới này. Nó sẽ trông giống thế này:

```
import 'package:flutter/material.dart';

class ProfileImage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: 100,
      backgroundColor: Theme.of(context).primaryColor,
      child: CircleAvatar(
        radius: 95,
        backgroundColor: Colors.white70,
        backgroundImage: NetworkImage('https://i.ibb.co/n3RzK2L/shashank.jpg'),
      ),
    );
  }
}
```

Giờ đây, file main.dart của chúng ta đã gọn gàng hơn, dễ bảo trì và debug hơn nhiều. Ngoài ra, chúng ta đã nâng cao đáng kể khả năng đọc và khả năng tái sử dụng code:

```
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import './custom_button.dart';
import './profile_image.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Portfolio App',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Scaffold(
        backgroundColor: Color.fromRGBO(227, 234, 237, 1),
        appBar: AppBar(
          title: Text(
            'Portfolio',
          ),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(height: 30),
              ProfileImage(),
              SizedBox(height: 20),
              Text(
                'Shashank Biplav',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Divider(),
              ),
              Text(
                'SOFTWARE ENGINEER & TECH BLOGGER',
                style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
                child: Divider(),
              ),
              Padding(
                padding: const EdgeInsets.all(30.0),
                child: Text(
                  'Hello, I am Shashank Biplav a Full-Stack developer based in India specializing in building apps for Mobile and the Web.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 18),
                ),
              ),
              CustomButton(
                uri: 'https://shashankbiplav.com',
                icon: Icons.person_outline_outlined,
                buttonText: 'Website',
              ),
              SizedBox(height: 20),
              CustomButton(
                uri: 'tel:+917004026852',
                icon: Icons.wifi_calling_rounded,
                buttonText: '+91- 700-402-6852',
              ),
              SizedBox(height: 20),

              CustomButton(
                uri:'mailto:biplavshashank7@gmail.com?subject=I would like to build an app with you!&body=Hi there,\n I have an awesome app idea,\n\n',
                icon: Icons.email_rounded,
                buttonText: 'biplavshashank7@gmail.com',
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
```

## Kết

Giờ đây, bạn chỉ cần thay thế tất cả các url trong code thành của bạn và bạn sẽ có một Portfolio App tuyệt vời. Tôi hy vọng bạn sẽ thích bài viết này.

Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-basics-splitting-widgets).