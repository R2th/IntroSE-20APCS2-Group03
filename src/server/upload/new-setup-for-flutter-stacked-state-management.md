***Note***: Tuyển tập bài viết được dịch từ trang **[filledstacks.com](https://www.filledstacks.com/)** về chủ đề ứng dụng **Stacked State Management** vào một ứng dụng Flutter.
# <div align="center"><b>New Setup for Flutter Stacked State Management</b></div><br />

{@embed: https://www.youtube.com/watch?v=1WW8xHhZvyA} <br />

Hãy cùng thiết lập cho một Stacked Application mới! Để cùng thực hiện bạn có thể vừa run ***flutter create*** để tạo một ứng dụng flutter mới, hoặc bạn có thể clone **[boxtout repo](https://github.com/FilledStacks/boxtout)** và sử dụng ***clients/customer*** cái được chung tôi đang sử dụng.

Chúng ta bắt đầu bằng các xoá bỏ tất cả các comments cũng như **HomePage** bên trong file **main.dart**. Rồi bạn có thể mở file **pubspec.yaml** nơi chung ta sẽ thêm vào các stacked packages.

```
dependencies: ...
stacked: ^1.9.1
stacked_services: ^0.7.1
```

Và nếu bạn muốn thiết lập các chức năng mới của Stacked chúng ta cũng sẽ phải thêm vào các packages bên dưới cho **dev_dependencies**:
```
dev_dependencies:
	...
	stacked_generator: ^0.1.2
	build_runner:
```

Stacked là package được sử dụng để triển khai giải pháp quản lý state thông thường của chúng tôi với các tính năng mới được thêm vào nhằm sinh ra các phần cần thiết khác của hệ thống nhằm tiện lợi cho quá trình phát triển một sản phẩm phần mềm.

Có 3 thứ quan trọng cần thiết cho một sản phẩm phần mềm cái có thể dễ dàng bảo trì, ít nhất cho quá trình phát triển của chúng tôi đó là:

## **1. State management.**
Stacked cung cấp cho chúng ta cùng với một hệ thống MVVM cơ bản nơi chúng ta có thể có một View và một ViewModel. Views hiển thị UI cho users dựng trên các state của ViewModels. ViewModels duy trì tất cả các trạng thái và tương tác với các services.
## **2. Navigation abstraction.**
Điều này là bắt buộc do đó chúng ta có thể xem quá trình điều hướng như là một service. Trong hầu hết các trường hợp các mô hình thực sự của quá trình điều hướng là một phần của business logics, ý tưởng về quá trình chuyển đổi theo địa chỉ view được lựa chọn khi bạn nhận ra uesr không có địa chỉ liên kết với account. Quyết định này nên được tạo trong business logic/viewmodel nơi chúng ta phải truy cập vào user model và tất cả thông tin của nó được làm mới từ một api request. Điều này giúp làm cho quá trình chuyển đổi không bị phụ thuộc vào các file UI, nó nên được tổ chức cùng với business logics. Như vậy chúng ta cần tới navigation abstraction(trừu tượng hoá quá trình điều hướng) này.
## **3. Dependency Inversion.**
Chúng ta muốn các phần phục thuộc của mình như các tính năng trừu tượng hoặc các thư viện của bên thứ ba. Điều này tạo cho code của chúng ta ít bị buộc phải tái cấu trúc(forced refactors) khi một gói của chúng ta được xác định là cần được cập nhật api. Nó cũng mang đến cho chúng ta một hướng đi khó nhằm tuân thủ theo nguyên tắc Single Responsibility.

Stacked V1.9.0 được giới thiệu cùng với **stacked_generator** với khả năng nhằm dễ dàng sinh ra mã nguồn cái được đề cập ở bên trên. Với những điều đã nói hãy xem xét làm thế nào để bắt đầu với một stacked application trong một ứng dụng flutter mới.

## State Management
Stacked cung cấp cho bạn một vài widgets cơ bản nhằm triển khai kiến trúc View-ViewModel. Hãy xem xét làm thế nào để thực hiện điều đó. Trong thư mục **lib** tạo một folder mới gọi là **ui**, và trong đó tạo một folder mới là **startup**. Bên trong folder được tạo mới đó tạo một file mới là **startup_view.dart** và **startup_viewmodel.dart**.

```
class StartUpViewModel extends BaseViewModel {
  String title = '';

  void doSomething() {
		title += 'updated ';
		// this will call the builder defined in the view file and rebuild the ui using
    // the update version of the model.
		notifyListeners();
  }
}
```

```
class StartUpView extends StatelessWidget {
  const StartUpView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<StartUpViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        floatingActionButton: FloatingActionButton(
          onPressed: model.doSomething,
        ),
        body: Center(
          child: Text(model.title),
        ),
      ),
      viewModelBuilder: () => StartUpViewModel(),
    );
  }
}
```

Hướng dẫn này không bao gồm một hướng dẫn sâu, hoàn thiện vầ stacked state management. Cái có thể được xem trong [***Stacked State Management Deep Dive tutorial***](https://www.filledstacks.com/post/flutter-state-management-with-stacked/). Hãy chuyển sang tính năng sinh ra mã nguồn cho bước 2, và 3 bên trên.

## Stacked Application Setup
Stacked hiện tại cung cấp cho bạn tính năng sinh ra các chức năng điều hướng cũng như việc đăng kí các dependencies. Điều này làm cho quá trình thiết lập trở nên nhanh hơn để có thể bắt đầu quá trình phát triển của bạn cùng với các packages của stacked.

## Navigation
Trước khi cập nhật phiên bản v1.9.0 trong gói stacked và giới thiệu gói **stacked_generator** chúng ta đang sử dụng gói **auto_route** nhằm sinh ra mã nguồn điều hướng của chúng ta. Giờ đây chúng ta phải chuyển các tính năng đó vào gói stacked bởi vì **auto_rout** v1 sẽ không tương tính với quá trình điều hướng của stacked. Nhằm sử dụng cái này chúng ta phải định nghĩa một **StackedApp**. Tạo một folder mới **lib/app** và bên trong nó tạo một file mới gọi là **app.dart**.

```
@StackedApp()
class AppSetup {
  /** Serves no purpose besides having an annotation attached to it */
}
```

Ở đây chúng ta tạo một lớp cái không phục vụ cho mục đích nào khác là thêm vào một annotation cho nó. Annotation **StackedApp** đặt ở đây cho tất cả các tính năng mới. Nhằm thiết lập quá trình điều hướng(Navigation) bạn có thể truyền vào bên trong một danh sách các **routes**. Danh sách này có thể chứa **MaterialRoute**, **CupertinoRoute** hoặc một **CustomRoute**. Tất cả chúng đòi hỏi một giá trị cho page cái là một **Type**(loại) view. Copy và paste thư mục **startup** và thay đổi mọi thứ bên trong nó thành **SecondView** và **SecondViewModel**. Đây là cái chúng ta sẽ sử dụng cho việc thiết lập bộ phận điều hướng. Rồi truyền hai routes này vào **StackedApp**.

```
@StackedApp(
  routes: [
    MaterialRoute(page: StartUpView, initial: true),
    CupertinoRoute(page: SecondView),
  ],
)
class AppSetup {
  /** Serves no purpose besides having an annotation attached to it */
}
```

Khi bạn chạy **flutter pub run build_runner build --delete-conflicting-outputs** nó sẽ sinh ra một file mới trong folder **lib/app** gọi là **app.router.dart**. File này chứa tất cả mã nguồn yêu cầu cho bộ định tuyến của chúng ta. Bạn có thể mở **main.dart** và chúng ta sẽ update **MaterialApp** nhằm đưa vào Navigator key từ **StackedServices** và chúng ta cũng sẽ thiết lập chức năng **onGenerateRoute** của mình.

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      navigatorKey: StackedService.navigatorKey,
      onGenerateRoute: StackedRouter().onGenerateRoute,
    );
  }
}
```

Đảm bảo rằng router được thêm vào và chúng được thiết lập hoàn thiện. Điều này cho phép bạn thực hiện quá trình điều hướng sử dụng **NavigationService** nếu nó đã được đăng kí như là một dependency trên locator của bạn. Cụ thể hơn sẽ được đề cập vào phần tiếp theo. Hãy xem nhanh quá trình truyền tham số trong quá trình điều hướng view.

## Navigation Arguments.
Quá trình tuần tự hoá tham số được tự động sinh ra trong quá trình sinh ra các router. Tạo một file trong thư mục ui gọi là **detail_view.dart**.

```
class DetailsView extends StatelessWidget {
  final String name;

  const DetailsView({Key key, this.name}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(name),
    );
  }
}
```

Rồi bạn có thể thêm vào route cho **StackedApp** của bạn.

```
@StackedApp(
  routes: [
    MaterialRoute(page: StartUpView, initial: true),
    CupertinoRoute(page: SecondView),
    CupertinoRoute(page: DetailsView),
  ],
)
class AppSetup {
  /** Serves no purpose besides having an annotation attached to it */
}
```

Khi chạy câu lệnh **build** trong gói **build_runner** view này sẽ được sinh ra một lớp gọi là **DetailsViewArguments**.

```
class DetailsViewArguments {
  final Key key;
  final String name;
  DetailsViewArguments({this.key, this.name});
}
```

Khi bạn điều hướng sang **DetailView** sử dụng NavigationService thì bạn cần truyền vào **DetailViewArguments** như là một tham số của bạn.

```
_navigationService.navigateTo(
  Routes.detailsView,
  arguments: DetailsViewArguments(name: 'FilledStacks'),
);
```

Các tham số này có thể được truyền vào bất cứ khi nào quá trình điều hướng được gọi cái được đặt trong route name. Chúng sẽ được sinh ra cho bất cứ view cái có các tham số trong nó và cho tất cả các loại, bao gồm cả các lớp custom được tạo ra trong mã nguồn của bạn.

***Note***: Khi các tham số của view của bạn thay đổi, bạn phản chạy lại câu lệnh sinh ra mã nguồn.
Điều này giảm thiểu chi phí cho quá trình bảo trì mã nguồn xoay quanh các tham số được truyền vào các view trong quá trình điều hướng.

## Dependency Registration
Một phần chính khác trong mã nguồn mẫu đó là cần phải thiết lập **get_it** và sử dụng nó cho chính nó. Điều này vẫn là một cách thức rất có giá trị nhưng với các thay đổi mới, chúng tôi muốn giới thiệu một cách thức nhanh hơn nhằm thiết lập tất cả các cái đó và xoá bỏ những mã nguồn mẫu không cần thiết. Điều này cũng được sử dụng hoàn toàn trong với **StackedApp** annotation. Các lớp này được đặt trong một list các thuộc tính của **DependencyRegistration** gọi là **dependencies**.

```
@StackedApp(
...
dependencies: [
    LazySingleton(classType: NavigationService),
  ],
)
```

Có 4 loại dependencies cái có thể được đăng kí như là một phần phụ thuộc(dependency):
### Factory:
Khi dependency này được yêu cầu từ **get_it** nó sẽ trả về một thể hiện mới của lớp dựa vào **classType**.
### Singleton:
Cái này sẽ được tạo và đăng kí như là một thể hiện duy nhất của lớp. Khi **classType** đó được yêu cầu nó sẽ luôn trả về thể hiện đã được tạo.
### LazySingleton:
Cái này chỉ được tạo khi nó được yêu cầu, và mọi yêu cầu sau đó sẽ được trả về một thể hiện tương tự với cái được khởi tạo lần đầu tiên.
### Presolve:
Cái này là loại được khởi tạo một thể hiện mới khi được yêu cầu hoặc được xử lý trước khi có thể đăng kí nó. Bạn phải cung cấp **presolveUsing** và nó phải là một static function cái trả về một Future của **classType** được định nghĩa.

Một khi bạn đã định nghĩa các dependencies của mình thì bạn có thể chạy:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Cái này sẽ tạo một file mới gọi là **app.locator.dart** cái chứa một phương thức **setupLocator**. Function đó nên được gọi trước phương thức **runApp** gọi trong **main.dart** giống như bên dưới

```
void main() {
  setupLocator();
  runApp(MyApp());
}
```

Nếu bạn có bất cứ dependencies nào được đăng kí cái cần được presolved thì bạn phải thay đổi phương thức **main** của mình thành một Future và await lời gọi **setupLocator**.

```
Future main() async {
  await setupLocator();
  runApp(MyApp());
}
```

Sau đó bạn có thể bắt đầu sử dụng locator hoặc server location của mình. Mở file **startup_viewmodel.dart** và chúng ta sẽ thêm một navigation vào để test mọi thứ.

```
class StartUpViewModel extends BaseViewModel {
  final _nagivationService = locator<NavigationService>();

  String title = '';

  void doSomething() {
    _nagivationService.navigateTo(Routes.secondView);
  }
}
```

Giờ đây, khi bạn chạy app và tap vào floating action button nó sẽ điều hướng bạn tới **SecondView** sử dụng Cupertino transition từ thư viện thiết kế của iOS. Và là như vậy đó. nếu bạn có vấn đề trong quá trình chạy trên phiên bản Android của app từ boxtout hãy đặt câu hỏi ở [đây](https://stackoverflow.com/questions/56639529/duplicate-class-com-google-common-util-concurrent-listenablefuture-found-in-modu/60492942#60492942). Nếu bạn cần một số snippets hỗ trợ cho stacked hãy xem ở [đây](https://gist.github.com/FilledStacks/b57b77da10fdcb2d4d95a28de4a4ced4).

## Source
https://www.filledstacks.com/post/new-setup-for-flutter-stacked-state-management/

**[Github repository](https://github.com/FilledStacks/flutter-tutorials)**.

## Reference

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))