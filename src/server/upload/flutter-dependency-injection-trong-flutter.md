[Soure](https://www.filledstacks.com/post/flutter-dependency-injection-a-beginners-guide/)

Trong hướng dẫn này, Quokka sẽ giới thiệu về ba hình thức **D**ependency **I**njection trong Flutter:
`InheritedWidgets`, `get_it` và `provider`. Trước khi làm điều đó, ta sẽ định nghĩa **DI** là gì? 

# Định nghĩa

*DI là cách thực hiện các đoạn code để cung cấp các Object của bạn cho các Object khác mà chúng phụ thuộc vào.* 

Hãy xem xét một ví dụ về sự phụ thuộc (dependency) là gì:

```
class LoginService {
  Api api;
}
```

Ở trên bạn có thể thấy rằng `LoginService` phụ thuộc vào `Api` Object. Cách thông thường để có được một phụ thuộc trong một class là thông qua `constructor`:

```
class LoginService {
  Api api;

  // Inject the api through the constructor
  LoginService(this.api)
}
```

Ý tưởng tương tự ở đây có thể được áp dụng cho một Widget trong Flutter. Hãy xem ví dụ này dưới dạng một widget:

```
class HomeView extends StatelessWidget {

  // Home View has a dependency on the AppInfo
  AppInfo appInfo;

  HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
    );
  }
}
```

Một cách dễ dàng để cung cấp sự phụ thuộc này là bằng cách chuyển nó qua `Constructor`.

```
AppInfo appInfo;

HomeView({Key key, this.appInfo}) : super(key: key);
```

**Nhưng vấn đề ở đây là chúng ta chỉ có thể DI bằng cách dùng Constructor.**

# Vấn đề

Truyền **dependencies** thông qua *constructor* là lựa chọn tốt cho việc truy cập dữ liệu xuống một tầng, thậm chí là hai tầng. Nhưng điều gì xảy ra nếu Quokka đang xử lý code ở tầng thứ 4 từ trên xuống và Quokka cần truy cập dữ liệu từ tầng đầu tiên? Hãy tưởng tượng dưới đây là tất cả các widget trong các tệp riêng biệt với logic riêng của chúng:

```
HomeView
      |__MyCustomList
          |__PostItem
              |__PostMenu
                   |__PostActions
                        |__LikeButton
```

Nếu muốn chuyển `AppInfo` cho `LikeButton` widget để hiển thị số lượt like, Quokka sẽ phải tạo thêm Constructor và truy xuất biến chứa data cần sử dụng, rồi chuyển nó xuống Constructor của widget tiếp theo. 

Bây giờ sẽ ra sao nếu Quokka bọc `LikeButton` bởi một parent widget khác. Quokka sẽ phải xóa tất cả các code không cần thiết và sau đó thêm nó vào widget parent vừa tạo. Hzz. Thật rắc rối !

Thay vì chọn con đường khó khăn, Quokka sẽ sử dụng kỹ thuật **Dependency Injection**. Quokka sẽ đảm bảo rằng nếu dữ liệu được yêu cầu, ở bất kỳ đâu trong cây widget, bởi bất kỳ tiện ích nào, ta đều có thể truy xuất dữ liệu một cách dễ dàng. Quokka sẽ bắt đầu với phương thức được Flutter "xây dựng" có tên là `InheritedWidget`.

# Inherited Widget

Nói một cách đơn giản, **Inherited Widget** cho phép bạn cấp quyền truy cập dữ liệu cho tất cả các thuộc tính và mọi widget trong cây con của nó thông qua `BuildContext`. Nó có mặt rất nhiều trong base của Flutter, được sử dụng cho `Theme`, `MediaQueries` và một số thứ khác mà ứng dụng cung cấp. Dưới đây là ví dụ về một `InheritedWidget` trống:

```
import 'package:flutter/material.dart';

class InheritedInjection extends InheritedWidget {
  final Widget child;

  InheritedInjection({Key key, this.child}) : super(key: key, child: child);

  static InheritedInjection of(BuildContext context) {
    return (context.inheritFromWidgetOfExactType(InheritedInjection)as InheritedInjection);
  }

  @override
  bool updateShouldNotify( InheritedInjection oldWidget) {
    return true;
  }
}
```

Quokka sẽ thêm `AppInfo` làm thuộc tính trong Widget. Quokka sẽ giữ một final *instance* và return *instance* đó thông qua một getter.

```
final AppInfo _appInfo = AppInfo();
final Widget child;

InheritedInjection({Key key, this.child}) : super(key: key, child: child);

AppInfo get appInfo => _appInfo
```

## Cách sử dụng

Cách các `inherited widgets` được sử dụng là bọc tree widget bạn muốn trong `inherited widget`. Quokka muốn widget này được cung cấp cho toàn bộ ứng dụng của mình, vì vậy Quokka sẽ bọc `MaterialApp` widget trong `InheritedInjection` widget:

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InheritedInjection(
      child: MaterialApp(
          title: 'Flutter Demo',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: HomeView()),
    );
  }
}
```

Cách Quokka truy cập `InheritedInjection` widget trong code của mình là sử dụng lệnh gọi `.of` và truyền vào tham số `context`. Bây giờ Quokka có thể cập nhật `HomeView` của mình và có thể xóa `AppInfo` được truyền qua `constructor` như này:

```
class HomeView extends StatelessWidget {
  HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var appInfo = InheritedInjection.of(context).appInfo;
    return Scaffold(
      body: Center(
        child: Text(appInfo.welcomeMessage),
      ),
    );
  }
}
```

Bây giờ, bất cứ nơi nào trong ứng dụng muốn sử dụng AppInfo Object, tất cả những gì Quokka sẽ làm là:

`var appInfo = InheritedInjection.of(context).appInfo;`

Vậy là không cần truyền bất cứ gì qua 5 constructor chỉ để truy cập dữ liệu cần thiết !

## Ưu điểm:
- Đây là cách mà mọi thứ trong Flutter được xây dựng.
- Định hướng luồng dữ liệu.

## Nhược điểm:
- Boilerplate được code theo instance. Có nghĩa là khi bạn muốn có một phiên bản mới mỗi khi bạn yêu cầu, bạn phải thiết lập nó. Tương tự như singleton.
- Hầu như không thể tiêm vào các đối tượng không có `context`, điều đó khá khó và lộn xộn.
- Dài dòng

# Get_it

Ta đến với hình thức thứ 2 là `Get_It` package. `Get_it` là một **service locator** đơn giản. Thông thường, bạn đăng ký *types* của bạn dựa trên `interface` và cấp triển khai `implementation` cho nó. Bằng cách này, bạn được lợi từ việc phát triển dựa trên `interface`, điều này cũng giúp `unit testing` dễ dàng hơn vì bạn có thể cấp các `implementations` testing cụ thể. 

Về việc ứng dụng `Get_It`, Quokka sẽ có một bài riêng về nó. Hôm nay, ta sẽ chỉ đề cập đến `dependency injection`.

Thêm get_it vào pubspec:
`get_it: ^1.0.3`

Sau đó, Quokka sẽ tiến hành setup `service locator`. Quokka sẽ tạo một tệp trong `root`, cạnh file `main.dart` đặt tên là `locator.dart`. Bên trong nó, Quokka sẽ khai báo một instance `GetIt` toàn cục mà mình có thể truy cập ở bất cứ nơi nào. Quokka cũng sẽ tạo một function là `setupLocator`, nơi mà Quokka sẽ đăng ký tất cả các type mà mình muốn truy cập.

```
import 'package:get_it/get_it.dart';

GetIt locator = GetIt();

void setupLocator() {
}
```

Các type phải được đăng ký trước khi ứng dụng bắt đầu. Vì vậy, trong `main.dart` chúng ta sẽ gọi `setupLocator` trước khi ứng dụng được khởi động:

```
import 'service_locator.dart';

void main() {
  setupLocator();
  runApp(MyApp());
}
```

Bây giờ Quokka có thể đăng ký `AppInfo`. Khi sử dụng `get_it`, các *class type* có thể được đăng ký theo hai cách:

- **Factory**: Khi bạn yêu cầu một instance của type từ *service provider*, bạn sẽ nhận được một **instance mới mỗi lần gọi** . Nó phù hợp cho việc đăng ký `ViewModels` cần chạy cùng logic để bắt đầu hoặc phải tạo mới khi view được mở.

- **Singleton**: Singletons có thể được đăng ký theo 2 cách. Cung cấp một `implementation` khi đăng ký hoặc cung cấp một `lamda` sẽ được gọi lần đầu tiên khi instance của bạn được yêu cầu (LazySingleton). Locator giữ một instance duy nhất của types đã đăng ký và sẽ **luôn trả về cho bạn phiên bản đó**.

Quokka sẽ đăng ký `AppInfo` dưới dạng chỉ có một phiên bản của nó trong khi ứng dụng đang chạy (Factory)

```
void setupLocator() {
  locator.registerFactory(() => AppInfo());
}
```

Bây giờ Quokka có thể loại bỏ `InheritedInjection` widget khỏi `MyApp`:
```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(),
    );
  }
}
```

Trong `HomeView` nơi ta muốn truy cập, Quokka có thể lấy `AppInfo` từ `locator`.

```
 @override
  Widget build(BuildContext context) {
    // Request the AppInfo from the locator
    var appInfo = locator<AppInfo>();
    return Scaffold(
      body: Center(
        child: Text(appInfo.welcomeMessage),
      ),
    );
  }
```

## Ưu điểm:
- Có thể yêu cầu types bất cứ ở đâu bằng cách sử dụng `global locator`
- `Instance` sẽ được tracking tự động bằng cách đăng ký các loại như `Factories` hoặc `Singleton`
- Có thể đăng ký các type dựa trên interface và abstract từ các implementation cụ thể
- Code thiết lập nhỏ gọn với ít boilerplate

## Nhược điểm:
- Xử lý không phải là ưu tiên hàng đầu trong framework này
- Hướng dẫn của package còn đơn giản có thể làm code được viết không đẹp
- Việc sử dụng Global object khởi đầu của luồng dữ liệu đa chiều trái ngược với những gì Flutter khuyến cáo

Phương pháp cuối cùng là sử dụng gói **Provider**.

# Provider

Provider về cơ bản là một `InheritedWidget`. Nó có các provider types chuyên dụng như `StreamProvider`, `ChangeNotifierProvider`, `ListenableProvider` có thể được sử dụng để xây dựng toàn bộ ứng dụng của bạn. Hôm nay Quokka chỉ đề cập đến làm thế nào nó có thể được sử dụng để dependency injection vào các widget thôi nhé.

Đầu tiên chúng ta phải thêm nó vào pubspec:
`provider: ^2.0.1`

Sau đó, tương tự như `InheritedWidget`, giá trị được cung cấp của Provider chỉ khả dụng trong subtree của nó. Để có được giá trị ở mọi nơi, Quokka sẽ bọc toàn bộ ứng dụng trong một provider.

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider(
      builder: (context) => AppInfo(),
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(),
      ),
    );
  }
}
```

Bây giờ trong `HomeView` khi muốn truy cập giá trị từ provider, tất cả những gì Quokka phải làm là: 

```
@override
  Widget build(BuildContext context) {
    var appInfo = Provider.of<AppInfo>(context);
    return Scaffold(
      body: Center(
        child: Text(appInfo.welcomeMessage),
      ),
    );
  }
```

## Ưu điểm:
- Tuyệt vời cho quản lý State
- Định hướng luồng dữ liệu
- *Special Providers* loại bỏ các boilerplate dư thừa
- Sử dụng Consumers cho providers làm code linh hoạt và clean.
- Cung cấp cách để tự động dispose tất cả các provider objects

## Nhược điểm:

- Việc tiêm vào các đối tượng không có `BuildContext` đòi hỏi nhiều `ProxyProvider`

# Những gì được học?
- Trong bài viết này, Quokka đã định nghĩa cơ bản về khái niệm Dependences Injection.
- Bạn đã được tiếp cận đến 3 hình thức DI phổ biến trong Flutter.
- Mỗi hình thức có ưu và nhược điểm riêng, bạn nên phân tích kỹ trước khi áp dụng vào dự án của mình.

Cảm ơn bạn đã theo dõi <3