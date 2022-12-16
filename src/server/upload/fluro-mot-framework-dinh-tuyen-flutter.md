Trong quá trình phát triển ứng dụng Flutter, ngoài định tuyến chính thức do Flutter cung cấp, bạn cũng có thể sử dụng một số framework định tuyến của bên thứ ba để triển khai quản lý và điều hướng trang, chẳng hạn như Fluro và Frouter. Fluro là một framework định tuyến Flutter tuyệt vời. Việc sử dụng Fluro phức tạp hơn so với framework định tuyến mặc định, nhưng nó rất phù hợp với các dự án lớn và vừa. Bởi vì nó có ưu điểm là phân cấp, tổ chức rõ ràng, mở rộng thuận tiện và dễ dàng quản lý định tuyến tổng thể. Trước khi sử dụng Fluro, bạn cần thêm phần dependency Fluro vào tệp pubspec.yaml, như hình dưới đây.

```
dependencies:
 fluro: "^2.0.0"
```

Nếu bạn không thể thêm các dependencies Fluro bằng phương pháp trên, bạn cũng có thể thêm các dependencies Fluro bằng cách sử dụng git, như được hiển thị bên dưới.

```
dependencies:
 fluro:
   git: git://github.com/theyakka/fluro.git
```

Sau khi thêm thành công các dependencies thư viện Fluro, bạn có thể sử dụng Fluro để quản lý định tuyến ứng dụng và phát triển điều hướng. Để thuận tiện cho việc quản lý thống nhất các tuyến đường, trước tiên bạn cần tạo một tệp bản đồ tuyến đường mới để quản lý từng tuyến đường. Như hình dưới đây, là mã mẫu của tệp cấu hình định tuyến route_handles.dart.

```

import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:flutter_demo/page_a.dart';
import 'package:flutter_demo/page_b.dart';
import 'package:flutter_demo/page_empty.dart';
 
 //Empty page
var emptyHandler = new Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      return PageEmpty();
    });
 
 //A page
var aHandler = new Handler(
    handlerFunc: (BuildContext context, Map<String, List<Object>> params) {
      return PageA();
    });
 
 //Page B
var bHandler = new Handler(
    handlerFunc: (BuildContext context, Map<String, List<Object>> params) {
      return PageB();
    });
```

Sau khi hoàn thành cấu hình định tuyến cơ bản, chúng tôi cũng cần một tệp cấu hình định tuyến tổng thể tĩnh, tệp này thuận tiện cho chúng tôi sử dụng trong trang định tuyến. Như được hiển thị bên dưới, là mã mẫu của tệp cấu hình định tuyến tổng thể route.dart.

```
import 'package:fluro/fluro.dart';
import 'package:flutter_demo/route_handles.dart';
 
class Routes {
     static String page_a = "/"; //Need attention
  static String page_b = "/b";
 
  static void configureRoutes(Router router) {
    router.define(page_a, handler: aHandler);
    router.define(page_b, handler: bHandler);
         router.notFoundHandler =emptyHandler; //Empty page
  }
}
```

Trong cấu hình tổng thể của định tuyến, cũng cần xử lý đường dẫn không tồn tại, tức là sử dụng trang trống hoặc trang mặc định để thay thế. Đồng thời, cần lưu ý rằng trang chủ của ứng dụng phải được cấu hình bằng "/".

Để dễ sử dụng, Router cũng cần phải static để có thể gọi trực tiếp trên bất kỳ trang nào. Như hình dưới đây, là mã mẫu của tệp application.dart.

```
import 'package:fluro/fluro.dart';
 
class Application{
  static Router router;
}
```

Sau khi hoàn thành các thao tác trên, bạn có thể nhập tệp cấu hình định tuyến và tệp tĩnh trong tệp main.dart, như hình dưới đây.

```
import 'package:fluro/fluro.dart';
import 'package:flutter_demo/routes.dart';
 
import 'application.dart';
 
void main() {
  Router router = Router();
  Routes.configureRoutes(router);
  Application.router = router;
 
  runApp(MyApp());
}
 
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Demo App',
      onGenerateRoute: Application.router.generator,
    );
  }
}
```

Nếu bạn muốn chuyển đến một trang, chỉ cần sử dụng phương thức Application.router.navigateTo(), như được hiển thị bên dưới.

```
Application.router.navigateTo(context,"/b"); //b is to configure routing
```

Chạy mã mẫu ở trên, hiệu ứng được hiển thị trong hình bên dưới.

![](https://images.viblo.asia/8d0af345-d730-46e7-9172-fdad681f21fd.png)

Có thể thấy rằng mặc dù sử dụng cồng kềnh hơn Flutter’s Navigator nhưng Fluro lại rất phù hợp với các dự án quy mô vừa và lớn. Kiến trúc phân lớp của nó cũng rất thuận tiện cho việc nâng cấp và bảo trì công trình sau này. Bạn có thể đưa ra lựa chọn hợp lý tùy theo tình hình thực tế.

Link: https://github.com/lukepighetti/fluro