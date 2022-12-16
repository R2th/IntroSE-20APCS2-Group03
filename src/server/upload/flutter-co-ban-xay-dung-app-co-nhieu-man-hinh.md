![image.png](https://images.viblo.asia/41fdaac8-b910-4e3c-b72a-9268ef9e53b6.png)

Trong bài viết này chúng ta sẽ tìm hiểu cách xây dựng ứng dụng với nhiều màn hình trong **Flutter** bằng cách sử dụng **Navigation**, truyền dữ liệu giữa các màn hình với thông qua các **ruotes**.

Cho đến bài viết này trong seri Flutter cơ bản này, chúng ta chủ yếu xoay quanh các single-page/screen app. Nếu bạn háo hức chờ đợi để xây dựng các ứng dụng nhiều màn hình, bài viết này sẽ là nơi chúng ta làm điều đó! Chúng ta sẽ xem thử cách để chúng ta có thể thêm nhiều màn hình vào ứng dụng của mình và điều hướng giữa chúng.

Ngoài ra, chúng ta sẽ thấy cách để chúng ta có thể truyền dữ liệu giữa các widget. Chúng ta hãy đi vào chi tiết chủ đề này nhé!

> Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/flutter-co-ban-xay-dung-app-co-nhieu-man-hinh/

## Hướng dẫn thông qua App Demo

Dưới đây là tổng quan về một ứng dụng mẫu mà chúng ta sẽ xây dựng:

![image.png](https://images.viblo.asia/eede69e1-2aac-4d85-9123-66ec034ba961.png)

Như bạn có thể thấy, chúng ta có hai màn hình trong ứng dụng này. Ngoài ra, chúng ta truyền dữ liệu từ màn hình này sang màn hình khác. Vì vậy, hãy xem làm thế nào mà chúng mình có thể xây dựng nó nhé!

### The First Screen (màn hình thứ nhất)

Dưới đây là snapshot code của màn hình thứ nhất mà chúng ta sử dụng trong ứng dụng này. Đây hoàn toàn là một widget riêng biệt mà chúng ta viết trong **first_screen.dart** riêng biệt và import nó vào tệp **main.dart** sau đó. Chúng mình ta điều này để giảm lượng code cũng như để bảo trì dễ dàng hơn và tối ưu hóa hiệu suất.

```
import 'package:flutter/material.dart';

import './second_screen.dart';

class FirstScreen extends StatelessWidget {
  static const routeName = '/first-screen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 20, width: double.infinity,),
          Text('This is the First Screen'),
          SizedBox(height: 20),
          RaisedButton(
            onPressed: () {
              Navigator.of(context).pushNamed(SecondScreen.routeName);
            },
            child: Text('GO TO SECOND SCREEN'),
          ),
        ],
      ),
    );
  }
}
```

Chúng ta có thể thấy rằng `FirstScreen` là một `stateless widget`. Đây là một widget khá thích hợp, trong đó tất cả những gì chúng ta có là một `Scaffold` chứa `appBar` và phần body. Phần body chứa `Column widget` lần lượt chứa `SizedBox`, `Text` và `RaisedButton`. Khi nhấn nút, một named route (route có tên định danh) sẽ chuyển màn hình thứ hai lên trên màn hình thứ nhất. Mình sẽ nói thêm chi tiết về điều này sau.

Để làm cho **Flutter** nhận biết được màn hình mà chúng ta muốn điều hướng đến, chúng ta cần chỉ đặt tên của để trỏ đến màn hình đó. Do đó, chúng ta cần import **second_screen.dart** ở nơi khai báo sử dụng màn hình này.

> Lưu ý: Mỗi màn hình (mỗi `scaffold widget` được coi như một màn hình riêng biệt) mà chúng ta cần điều hướng đến phải có tên định danh duy nhất của riêng nó. Ở đây, chúng ta đã định nghĩa `routeName` là một static const trong cả hai màn hình.

### The second screen (Màn hình thứ hai)

Màn hình thứ hai khai báo trong second_screen.dart riêng biệt bao gồm code như sau:

```
import 'package:flutter/material.dart';

import './first_screen.dart';

class SecondScreen extends StatelessWidget {
  static const routeName = '/second-screen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Screen'),
        centerTitle: true,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 20, width: double.infinity,),
          Text('This is the second screen!'),
          SizedBox(height: 20),
          RaisedButton(
            onPressed: () {
              Navigator.of(context).pushNamed(FirstScreen.routeName);
            },
            child: Text('BACK TO FIRST SCREEN'),
          ),
          FlatButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text('BACK USING POP METHOD'),
          ),
        ],
      ),
    );
  }
}
```

Widget này cơ bản có cấu trúc code giống như màn hình thứ nhất, chỉ là thêm một nút phụ nữa. Ở đây, chúng ta nhập import **first_screen.dart** để có thể sử dụng hằng số `routeName` để điều hướng đến nó. Nút thứ hai là `FlatButton` được sử dụng để điều hướng đến màn hình thứ nhất bằng phương thức `pop()`. Phương thức `pop()` chỉ đơn giản là bỏ đi widget/màn hình trên cùng khỏi stack. Chúng ta sẽ thảo luận chi tiết hơn về vấn đề này.

### File main.dart

Chúng ta vẫn chưa hoàn tất việc thiết lập điều hướng! Chúng ta cũng cần đăng ký tất cả các lộ trình (route) của tất cả các màn hình mà chúng ta có trong `MaterialApp widget` nằm trong tệp **main.dart**.

```
import 'package:flutter/material.dart';

//screens
import './first_screen.dart';
import './second_screen.dart';

void main() => runApp(MyApp());


class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navigation Demo App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: FirstScreen(),
      routes: {
        FirstScreen.routeName: (ctx) =>FirstScreen(),
        SecondScreen.routeName: (ctx) => SecondScreen(),
      },
    );
  }
}
```

Có thể thấy rằng chúng ta đã import cả widget **first_screen.dart** và **second_screen.dart** trong tệp main.dart. Đối với trang gốc mặc định: chúng ta đang sử dụng `FirstScreen()` làm `initial` widget/screen khi ứng dụng khởi chạy.

Bạn cũng sẽ nhận thấy rằng chúng ta đã đề cập đến routes, nó cũng là route cấp cao nhất của ứng dụng. Đây là tất cả code chúng ta cần để sử dung route trong ứng dụng này. Nếu bạn có nhiều màn hình, tất cả các màn hình cần được đăng ký tại đây.

### Tại sao lại cần khai báo routes như trên?

Cách hoạt động của `Navigator` trong **Flutter** giống như khi một lộ trình (route) được đặt tên được push qua mỗi lần nhấn vào nút hoặc một số sự kiện khác (có thể là sự thay đổi trong app state) thì **Flutter** sẽ tra cứu tên lộ trình trong bản đồ này.

Nếu có tên hợp lệ thì phương thức `builder(){...}` được liên kết, tức là `WidgetBuilder` được sử dụng để tạo `MaterialPageRoute` thực hiện các diễn hoat và chuyển tiếp sang màn hình hoặc lộ trình mới.

### Một số điểm cần nhớ khi sử dụng Navigator:

* Nếu ứng dụng chỉ có một màn hình, thì chúng ta có thể chỉ định nó bằng cách sử dụng một màn hình `Home` để thay thế.
* Nếu màn hình Home được chỉ định như trong trường hợp này của ứng dụng chúng ta, thì có nghĩa là routes bắt đầu ở `Navigator.defaultRouteName` với đường dẫn /, và sẽ xảy ra lỗi khi ta cung cấp thêm một route path như thế nữa.
* Nếu một route đươc dùng mà không được khai báo trong bảng này (hoặc theo Home page), thì lệnh `onGenerateRoute callback` được gọi để render trang thay thế.
* `Navigator` chỉ được build nếu các ruote được cung cấp (thông qua Home page, `onGenerateRoute` hoặc `onUnknownRoute`).

### Một số phương thức nhứ `Navigator.of (context)` và cách chúng hoạt động?

Bây giờ bạn sẽ nhận thấy rằng `Navigator` cung cấp một số phương thức tuyệt vời trực tiếp từ `Flutter Factory`. Chúng ta hãy xem sơ qua một số trong đó. Để biết thêm chi tiết về `Navigator`, hãy tham khảo [tài liệu chính thức](https://api.flutter.dev/flutter/widgets/Navigator-class.html).

### ❖ `push()` method

Để chuyển đổi / điều hướng đến một route mới, phương thức này có thể được sử dụng. Phương thức này thêm một route vào route stack do `Navigator` quản lý. Có thể bạn sẽ thắc mắc xác định được route nào? Hoặc có cần phải khai báo ruote trong `MaterialApp` không?

Bạn có thể tạo riêng cho mình hoặc sử dụng `MaterialPageRoute`, điều này rất hữu ích vì nó chuyển sang route mới bằng cách sử dụng animation riêng cho từng nền tảng. Ví dụ:

```
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);
```

Như vậy tại đây ruote được xây dựng linh hoạt khi di chuyển bằng `Navigator`. Điều này khá hữu ích khi điều hướng trong các trường hợp như: từ danh sách sản phẩm đến chi tiết của một sản phẩm cụ thể, v.v.

> Phương thức này push widget mới lên trên widget cũ, tức là xếp chồng lên trên widget cũ. Flutter cũng cung cấp một nút ← tự động ở trên cùng, nút này khi được nhấn sẽ loại bỏ widget khỏi đầu ngăn xếp và hiển thị widget ngay bên dưới.

### ❖ `pushNamed()` method

Nếu bạn có widget của route được đặt tên và đã khai báo trong bảng route ngoài App rồi thì phương pháp này có thể được sử dụng. Điều này yêu cầu Flutter xây dựng widget đã được xác định và khởi chạy màn hình. Đây là những gì chúng ta đã sử dụng trong ứng dụng demo trên.

```
Navigator.of(context).pushNamed(SecondScreen.routeName);
```

### ❖ `pushReplacement()` method

Nó hoạt động giống như phương thức `push()` ngoại trừ sự khác biệt là route tiếp theo tạo widget sẽ không push chồng lên mà nó thay thế screen/widget hiện tại đang được hiển thị.

Nó không cung cấp `←` như trong trường hợp của phương thức `push()` và vì widget/screen trước đó đã được thay thế. Nếu ta dùng phương thức `pop()`, bản chất giống như ta back về màn hình trước đó của màn hình đã bị thay thế.

```
Navigator.pushReplacement(context, MaterialPageRoute(builder: (BuildContext context) => SecondScreen()));
```

### ❖ `pushReplacementNamed()` method

Như tên của nó, phương pháp này cũng thay thế screen/widget đang hiển thị bằng widget mới. Chỉ khác rằng nó được đặt tên vì vậy chúng ta cần khai báo route name trong bảng route ở cấp độ App.

```
Navigator.of(context).pushReplacementNamed(SecondScreen.routeName);
```

### ❖ `pushNamedAndRemoveUntil()` method

Trong trường hợp bạn đang xây dựng một ứng dụng mạng xã hội như **Facebook** hoặc **Instagram**, bạn sẽ muốn sử dụng phương pháp này trong một số trường hợp. Ví dụ: người dùng xác thực (đăng ký/đăng nhập) vào ứng dụng của bạn, xem qua thông tin người dùng (profile), scroll đọc tin tức và cuối cùng là đăng xuất khỏi ứng dụng.

Trong trường hợp này, bạn không thể chỉ push `HomeScreen` hoặc bất kỳ màn hình nào mà bạn muốn hiển thị khi đăng xuất. Trong trường hợp đó, bạn muốn xóa tất cả các ruote đang có trong stack để người dùng không thể đi đến các lộ trình trước đó được nữa. Phương pháp này sẽ giúp clear stack màn hình của bạn!

```
Navigator.of(context).pushNamedAndRemoveUntil('/auth-screen', (Route<dynamic> route) => false);
```

### ❖ `pushAndRemoveUntil()` method

Nó hoạt động tương tự như phương thức `pushNamedAndRemoveUntil()` ở trên nhưng sự khác biệt là thay vì push một ruote được đặt tên, phương thức này sử dụng `MaterialPageRoute` builder.

### ❖ `pop()` method

Như tên của nó, phương pháp này loại bỏ màn hình ở lớp trên cùng của stack. Khi chỉ sử dụng phương thức `push()` hoặc `pushNamed()` để push một màn hình mới, Flutter sẽ tự động đưa ra một nút `←` trên màn hình đó.

```
Navigator.of(context).pop();
```

Phương pháp này cũng có thể được sử dụng để đóng các widget khác được phủ lên trên các widget khác như: **modal bottom sheet, dialog,** v.v.

Đây là tất cả các phương pháp **Navigator** chính mà bạn sẽ gặp phải và sử dụng trong khi xây dựng ứng dụng của mình và tùy thuộc vào nhu cầu và chức năng mà bạn xây dựng.

## Tại sao sử dụng static const cho route name?

Bạn có thể chỉ cần sử dụng ruote name bằng cách khai báo tên trực tiếp trong bảng route ngoài App và sau đó sử dụng chúng trong navigator theo giá trị của chúng. Nhưng khi bạn cần cập nhật route name, bạn cần thay đổi chúng ở tất cả những nơi bạn đã sử dụng.

Ngoài ra, nếu có lỗi đánh máy trong khi sử dụng chúng trong Navigator, điều này sẽ tạo ra các lỗi không mong muốn và khó theo dõi 😡😩😤😖. Do đó, chúng ta sử dụng một hằng số tĩnh mà chúng ta sẽ sử dụng cho một biến duy nhất.

Giờ đây, giá trị route name thực tế nằm bên trong widget và chúng ta có thể thay đổi nó bất cứ khi nào được yêu cầu mà không gặp rắc rối khi phải thay đổi ở nhiều nơi. Đây là cách tiếp cận đơn giản hơn trong việc gán và sử dụng route name.

## Truyền dữ liệu qua các ruote với parameter

Nếu bạn cần chuyển dữ liệu từ screen/widget này sang screen/widget khác bằng các route, bạn có thể làm được điều đó! Hãy tham khảo ví dụ này trong đó chúng ta có một danh sách các recipe và khi nhấp vào recipes, chúng ta sẽ điều hướng đến một màn hình khác hiển thị recipe details của recipe cụ thể.

Trong màn hình recipe details, chúng ta ít nhất cần biết `ID (recipe_id)` của recipe nào đã được nhấp để chúng ta có thể tìm nạp nó từ backend/server. Vì vậy, để đưa recipe_id từ màn hình recipe list, chúng ta sẽ viết:

```
Navigator.of(context).pushNamed(RecipeDetailScreen.routeName, arguments: recipe_id);
```

Tới đây bạn có thể thấy rằng chúng ta đang dùng recipeId làm đối số cho route. Bây giờ trong màn hình thứ hai, tức là khi chúng ta cần tới recipe_id này, chúng ta có thể trích xuất dữ liệu từ các parameters của route như thế này,

```
final recipeId = ModalRoute.of(context).settings.arguments as String;
```

Và cuối cùng, chúng ta có dữ liệu của màn hình trước đó vào màn hình hiện tại. Đây là một ví dụ khá cơ bản để hiểu về luồng dữ liệu.

## Kết

Đó là tất cả những điều cơ bản về Navigation mà bạn cần biết trước khi tìm hiểu sâu hơn. Chúng ta sẽ thấy nhiều ví dụ hơn trong các bài viết sắp tới. Hy vọng bạn thích bài viết này!

Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-basics-adding-multiple-screens).