# Giới thiệu chung

Theo [tài liệu chính thức](https://pub.dev/packages/riverpod), [Riverpod](https://pub.dev/packages/riverpod) là bản được viết lại hoàn chỉnh của package `Provider` để thực hiện các cải tiến về xử lý sự kiện-trạng thái trong **Flutter** một cách dễ dàng và đầy đủ hơn.

**Riverpod** cho phép bạn quản lý trạng thái (`state`) của ứng dụng theo cách biên dịch an toàn (`compiler-safe`), đồng thời chia sẻ nhiều ưu điểm hơn của `Provider`. Nó cũng mang lại nhiều lợi ích bổ sung, làm cho nó trở thành một giải pháp tuyệt vời để quản lý `state` trong **Flutter**.

# Tại sao cần sử dụng Riverpod cho việc quản lý state của Flutter?

Để hiểu tại sao chúng ta cần **Riverpod**, ta nên xem xét một số vấn đề cố hữu của `Provider`.

Theo thiết kế, `Provider` là một cải tiến so với `InheritedWidget` và do đó, nó phụ thuộc vào `widget-tree`. Điều này dẫn đến một số hạn chế sau: 

## Hạn chế #1: Việc kết hợp các Provider rất dài dòng

Khi một provider có sự phụ thuộc vào một provider khác, ta phải triển khai code kiểu như sau:

```php
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final sharedPreferences = await SharedPreferences.getInstance();
  runApp(MultiProvider(
    providers: [
      Provider<SharedPreferences>(create: (_) => sharedPreferences),
      ChangeNotifierProxyProvider<SharedPreferences, OnboardingViewModel>(
        create: (_) => OnboardingViewModel(sharedPreferences),
        update: (context, sharedPreferences, _) =>
            OnboardingViewModel(sharedPreferences),
      ),
    ],
    child: Consumer<OnboardingViewModel>(
      builder: (_, viewModel) => OnboardingPage(viewModel),
    ),
  ));
}
```

Trong ví dụ trên, ta có một `OnboardingPage` nhận đối số là `OnboardingViewModel`. Nhưng vì bản thân `OnboardingViewModel` lại phụ thuộc vào `SharedPreferences` nên ta cần `MultiProvider` và `ProxyProvider` để kết nối chúng lại và có thể hoạt động với nhau. 

Sẽ tốn nhiều effort để ta triển khai những thứ tưởng chừng như đơn giản này. Nên tốt hơn nếu tất cả các `provider` đểu có thể được định danh ở bên ngoài `widget-tree`.

## Hạn chế #2: Việc get các Provider bởi type và bắt các runtime exceptions

Trong bất kì class widget nào, ta đều có thể truy cập đến các `provider` bởi type với cú pháp như sau:

```php
Provider.of<AnyType>(context)
```

Nhưng nếu không cẩn thận, ta có thể sẽ kết thúc với một `ProviderNotFoundException` trong thời gian chạy:

![](https://images.viblo.asia/e6e3d5ad-fa9a-412a-b89b-36484c041121.png)

Điều này có thể trở thành vấn đề đối với các ứng dụng lớn, và sẽ tốt hơn nếu quyền truy cập vào provider có thể được giải quyết tại thời điểm biên dịch.

Ngoài ra, nếu có hai hoặc nhiều `provider` có cùng type, ta chỉ có thể truy cập đến `provider` gần nhất với widget.

**Riverpod hoàn toàn độc lập với widget-tree và nó không mắc phải bất kỳ hạn chế nào trong 2 hạn chế đã nêu ở trên.**

Vì vậy, chúng ta hãy xem làm thế nào để sử dụng nó nhé!

# Cài đặt Riverpod

Bước đầu tiên là ta cần thêm phiên bản mới nhất của `flutter_riverpod` như một `dependency` vào trong file `pubspec.yaml`:

```php
dependencies:
  flutter:
    sdk: flutter
  riverpod: ^0.14.0+1
```

**Lưu ý:** Nếu ứng dụng đã sử dụng `flutter_hooks`, ta có tể cài đặt package `hooks_riverpod` để thay thế. Nó sẽ bao gồm 1 số tính năng bổ sung giúp tích hợp **Hooks** với **Riverpod** dễ dàng hơn.

## ProviderScope

Khi **Riverpod** đã được cài đặt, ta có thể bao widget gốc bởi một `ProviderScope`:

```php
void main() {
  runApp(ProviderScope(
    child: MyApp(),
  ));
}
```

`ProviderScope` là một widget có chứa state của tất cả các `provider` mà ta đã tạo.

## Tạo một Provider

Hãy xem ta có thể sửa đổi sample Counter App để sử dụng **Riverpod** như nào nhé.

Trong `main.dart`, ta thay thế widget mặc định `MyHomePage` như sau:

```php
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Some text here',
          style: Theme.of(context).textTheme.headline4,
        ),
      ),
    );
  }
}
```

Và ngay bên trên, ta có thể thêm biến global `valueProvider`:

```php
final valueProvider = Provider<int>((ref) {
  return 36;
});
```

Nhưng làm thế nào ta có thể đọc được giá trị của `provider` từ bên trong widget?

## Consumer

Ta bao widget `Text` với một `Consumer`:

```php
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Consumer(
          builder: (_, ScopedReader watch, __) {
            final value = watch(valueProvider);
            return Text(
              'Value: $value',
              style: Theme.of(context).textTheme.headline4,
            );
          },
        ),
      ),
    );
  }
}
```

Tham số `builder` của `Consumer` cho chúng ta một `ScopedReader` và ta có thể sử dụng để theo dõi (`watch`) giá trị của `provider`.

**Riverpod consumer sử dụng watch() để truy cập đến các provider theo tham chiếu, không phải theo type. Điều này có nghĩa là chúng ta có thể có nhiều provider cùng type như chúng ta muốn.**

Đoạn code trên có thể hoạt động, tuy nhiên việc add thêm một `Consumer` và một `Text` widget thì nghe vẻ hơi dài dòng.

Để khiến chúng dễ dàng hơn, **Riverpod** cung cấp cho ta `ConsumerWidget`.

## ConsumerWidget

Sửa lại example như sau: 

```php
// 1. Widget class now extends [ConsumerWidget]
class MyHomePage extends ConsumerWidget {
  @override
  // 2. build() method has an extra [ScopedReader] argument
  Widget build(BuildContext context, ScopedReader watch) {
    final value = watch(valueProvider);
    return Scaffold(
      body: Center(
        child: Text(
          'Value: $value',
          style: Theme.of(context).textTheme.headline4,
        ),
      ),
    );
  }
}
```

Với sub-class của `ConsumerWidget`, hàm build của ta có thêm argument là `ScopedReader`, và ta có thể dùng để theo dõi `provider`. Ngắn gọn hơn phải không nào?

## StateProvider

Ta đã biết cách để đọc giá trị của `provider` từ bên trong của một widget. Nhưng bản thân `Provider` không thể tự thay đổi giá trị của chúng. Vì vậy ta cần tạo một `StateProvider`:

```php
final counterStateProvider = StateProvider<int>((ref) {
  return 0;
});
```

Class `MyHomePage` giờ sẽ trông như thế này:

```php
class MyHomePage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // 1. watch the new counterStateProvider
    final counter = watch(counterStateProvider);
    return Scaffold(
      body: Center(
        child: Text(
          // 2. this time we read counter.state
          'Value: ${counter.state}',
          style: Theme.of(context).textTheme.headline4,
        ),
      ),
    );
  }
}
```

Để kiểm tra lại cách thức code của chúng ta hoạt động như thế nào, ta sẽ add thêm một `FloatingActionButton` vào trong `Scaffold`:

```php
floatingActionButton: FloatingActionButton(
  // access the provider via context.read(), then increment its state.
  onPressed: () => context.read(counterStateProvider).state++,
  child: Icon(Icons.add),
),
```

Khi khởi chạy app, ta có thể bấm vào FAB và quan sát bộ đếm được update vào widget `Text`.

**Lưu ý:** *Bên trong callback của FAB, ta truy cập đến bộ đếm bằng `context.read()` chứ không phải `watch()` vì `read()` là một phương thức mở rộng của `BuildContext` và ta nên sử dụng nó khi truy cập vào `provider` từ một hàm callback.*

## ProviderListener

Đôi khi ta muốn push một route, hiển thị một dialog hoặc `SnachBar` mỗi khi state của `Provider` thay đổi. Việc này có thể được giải quyết khi thêm `ProviderListener` bên trong hàm `build()`. Như dưới đây tôi sẽ hiển thị `SnackBar` khi state của bộ đếm thay đổi:

```php
Widget build(BuildContext context, ScopedReader watch) {
  final counter = watch(counterStateProvider);
  // 1. Add parent ProviderListener`
  return ProviderListener<StateController<int>>(
    // 2. Specify which provider we want to listen to
    provider: counterStateProvider,
    // 3. Run some imperative code in the onChange callback
    onChange: (context, counterState) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Value is ${counterState.state}')),
      );
    },
    child: Scaffold(...)
  );
}
```

**Lư ý:** *`ProviderListener` sẽ tương đương với `BlocListener` của package `flutter_bloc`.*

## StateNotifierProvider

`StateNotifierProvider` là một giải pháp tốt cho việc lưu trữ một số trạng thái cùng với logic nghiệp vụ bên ngoài các lớp widget.

Đây là ví dụ ta có thể tạo hàm đếm giờ tương tự như đồng hộ khi sử dụng `StateNotifier` và class `Timer`: 

```php
import 'dart:async';

class Clock extends StateNotifier<DateTime> {
  // 1. initialize with current time
  Clock() : super(DateTime.now()) {
    // 2. create a timer that fires every second
    _timer = Timer.periodic(Duration(seconds: 1), (_) {
      // 3. update the state with the current time
      state = DateTime.now();
    });
  }

  late final Timer _timer;

  // 4. cancel the timer when finished
  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
```

Sau đó ta có thể tạo một provider mới như sau: 

```php
final clockProvider = StateNotifierProvider<Clock, DateTime>((ref) {
  return Clock();
});
```

Thêm `intl` vào `pubspec.yaml` để hiển thị giờ theo format:

```php
import 'package:intl/intl.dart';

class MyHomePage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // this line is used to watch the provider's *state*
    // to get an instance of the clock itself, call `watch(clockProvider.notifier)`
    final currentTime = watch(clockProvider);
    // format the time as `hh:mm:ss`
    final timeFormatted = DateFormat.Hms().format(currentTime);
    return Scaffold(
      body: Center(
        child: Text(
          timeFormatted,
          style: Theme.of(context).textTheme.headline4,
        ),
      ),
    );
  }
}
```

Khởi chạy app, ta sẽ thấy thời gian hiện tại được update mỗi giây tương tự như đồng hồ.

Ví dụ về đồng hồ này là một trường hợp sử dụng tối thiểu của `StateNotifier`. Nói chung, bạn nên luôn nghĩ về `StateNotifier` là nơi diễn ra logic nghiệp vụ của bạn:

![](https://images.viblo.asia/dcf946fa-181b-46c6-bebd-35633a41c44e.png)

Khi bạn thiết lập mọi thứ theo cách này, các widget của bạn có thể:

* Xem trạng thái của model và rebuild lại widget khi nó thay đổi.
* Gọi các phương thức trong các class model của bạn (sử dụng `context.read <Model>`), từ đó có thể cập nhật trạng thái và (tùy chọn) tương tác với các dịch vụ bên ngoài.


Ok, đây là cách `StateNotifierProvider` hoạt động.

Ngoài ra, **Riverpod** cũng có một `ChangeNotifierProvider`. hoạt động theo cách rất giống nhau. Bạn có thể khai báo một lớp `Model` với `ChangeNotifier` như một mixin.

Nhưng `ChangeNotifier` có nhiều nhược điểm khác nhau, vì vậy tôi khuyên bạn nên sử dụng `StateNotifier` và `StateNotifierProvider` thay thế.

**Tạm thời stop tại đây nhé. Bài viết sau ta sẽ đi timef hiểu thêm về các kiểu Provider hay sử dụng. Cảm ơn các bạn đã theo dõi bài viết này.**