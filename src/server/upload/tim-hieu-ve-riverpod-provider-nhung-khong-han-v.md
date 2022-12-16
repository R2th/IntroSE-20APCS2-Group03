Trong Flutter có rất nhiều các quản lý state: Provider, Bloc, GetX, Redux,... khó mà nói cái nào tốt hơn cái nào. Tuy nhiên nếu bạn đã làm quen với Provider thì không ngại để tìm hiểu thêm về Riverpod. Một bản nâng cấp của Provider. Nếu bạn để ý thì cái tên "Riverpod" là các chữ cái của "Provider" được sắp xếp lại :grinning:. 

**Provider không hoàn hảo nó có một số vấn đề sau**

Thứ nhất, Provider phụ thuộc vào Flutter vì bạn đang sử dụng các widget của Flutter để cung cấp các đối tượng trong widget tree.

Thứ hai, Provider chỉ dựa vào "type" để giải quyết đối tượng được yêu cầu.  Nếu bạn cung cấp hai đối tượng cùng "type", bạn chỉ có thể nhận được object gần địa điểm gọi hơn.
```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider(
      create: (context) => 'A String far away.',
      child: Provider(
        create: (context) => 'A String that is close.',
        builder: (context, child) {
          // Displays 'A String that is close.'
          // There's no way to obtain 'A String far away.'
          return Text(Provider.of<String>(context));
        },
      ),
    );
  }
}
```
Cuối cùng, nếu bạn cố gắng truy cập vào một "type" không được cung cấp, bạn sẽ chỉ gặp lỗi khi chạy.  Điều này không phải là lý tưởng vì chúng ta phải luôn cố gắng bắt càng nhiều lỗi càng tốt tại thời điểm compile-time.

Riverpod thì giải quyết được những vẫn đề đó:

- **Compile safe** : Không còn *ProviderNotFoundException* hoặc quên xử lý các trạng thái loading.  Sử dụng Riverpod, nếu code đã được biên dịch, nó sẽ hoạt động.  
- **Provider, without its limitations**: Riverpod có hỗ trợ multiple provider có cùng type;  kết hợp các providers không đồng bộ;  thêm providers từ mọi nơi, ...
- **Không phụ thuộc vào Flutter**: 
Create/share/tests providers, with no dependency on Flutter. This includes being able to listen to providers without aBuildContext. không phụ thuộc vào Flutter.  Điều này bao gồm việc có thể listen providers mà không cần một BuildContext.

## Cơ bản về Riverpod

Đầu tiên ta cần add thêm package riverpod làm phụ thuộc vào dự án Flutter của bạn. Trong bài này, ta sẽ sử dụng [flutter_riverpod](https://pub.dev/packages/flutter_riverpod/install), đây là cách nếu bạn muốn chỉ sử dụng Flutter.

```yaml
dependencies:
  flutter_riverpod: ^0.12.4
```

Riverpod's Providers không được đặt trong widget tree. Thay vào đó, chúng là các biến toàn cục nằm ở bất kỳ file nào mà bạn muốn.
```dart
final greetingProvider = Provider((ref) => 'Hello Riverpod!');
```
Provider đơn giản nhất này có thể cung cấp một giá trị read-only.  Có nhiều loại Providers khác nữa để làm việc với Futures, Streams, ChangeNotifier, StateNotifier,...

Tham số ref có kiểu ProviderReference.  Bạn sẽ thấy ở phần sau, nó chủ yếu được sử dụng để giải quyết sự phụ thuộc giữa các Provider.

Mặc dù Provider object có thể truy cập toàn cục, nhưng điều này không có nghĩa là **provided object** (trong trường hợp này là chuỗi "Hello Riverpod!")  là global.  Giống như với một hàm toàn cục, bạn có thể gọi nó từ bất cứ đâu nhưng giá trị trả về cũng có thể trở thành phạm vi cục bộ.  Hãy xem xét đoạn code sau:
```dart
String globalFunction() {
  return 'some value';
}

class MyClass {
  void _classMethod() {
    final valueLocalToThisMethod = globalFunction();
  }
}
```
### Where are the widgets!?
Mặc dù có một tin tuyệt vời là các Providers của Riverpod không phụ thuộc vào Flutter, nhưng chúng ta vẫn cần sử dụng giá trị được cung cấp bởi một Provider object từ widget tree - suy cho cùng thì đây vẫn là Flutter.

Gói Riverpod chỉ đi kèm với một InheritedWidget duy nhất cần được đặt phía trên toàn bộ widget trê được gọi là ProviderScope.  Nó chịu trách nhiệm giữ một thứ gọi là ProviderContainer, thứ này có trách nhiệm lưu trữ trạng thái của các đối tượng Provider riêng lẻ.

```dart
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}
```
### Watching a provider
Làm cách nào để chúng ta lấy được string từ greetingProvider để có thể hiển thị trong Text?  Thực tế có hai cách để làm điều đó. 

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Riverpod Tutorial',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Riverpod Tutorial'),
        ),
        body: Center(
          child: Text('greeting goes here'),
        ),
      ),
    );
  }
}
```
**Cách đầu tiên** là thay đổi superclass tiện  thành ConsumerWidget đến từ gói flutter_riverpod.  Điều này thêm một chức năng ScopedReader vào build method.  Widget sẽ được rebuild nếu có bất kỳ sự thay đổi nào xảy ra.

```dart
class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // Gets the string from the provider and causes
    // the widget to rebuild when the value changes.
    final greeting = watch(greetingProvider);

    return MaterialApp(
      title: 'Riverpod Tutorial',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Riverpod Tutorial'),
        ),
        body: Center(
          child: Text(greeting),
        ),
      ),
    );
  }
}
```
**Cách khác** để nhận được giá trị từ provider là dùng **Consumer** , cách này sẽ hữu ích nếu bạn muốn nhanh chóng tối ưu hóa việc xây dựng lại tiện ích con của mình, không muốn các widget khác cũng phải rebuild lại theo.  Trong trường hợp này ta chỉ cần xây dựng lại Text widget bản bị ảnh hưởng trên toàn bộ cây tiện ích. 
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Riverpod Tutorial',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Riverpod Tutorial'),
        ),
        body: Center(
          child: Consumer(
            builder: (context, watch, child) {
              final greeting = watch(greetingProvider);
              return Text(greeting);
            },
          ),
        ),
      ),
    );
  }
}
```
### Reading a provider

Đôi khi, không thể gọi "watch" vì bạn không ở trong phương thức build.  Hoặc bạn chỉ muốn lấy giá trị từ provider ra chứ không muốn widget sẽ rebuild. Ví dụ: bạn có thể muốn thực hiện một hành động khi một nút được nhấn.  Đó là khi bạn có thể gọi context.read(). Dưới đây là một loại provider khác - ChangeNotifierProvider:
```dart
class IncrementNotifier extends ChangeNotifier {
  int _value = 0;
  int get value => _value;

  void increment() {
    _value += 1;
    notifyListeners();
  }
}

final incrementProvider = ChangeNotifierProvider((ref) => IncrementNotifier());
```
Ta sẽ lấy ví dụ với Counter App.  Text widget sẽ theo "watch" provider và tự động được rebuilt nếu xảy ra thay đổi và FloatingActionButton sẽ chỉ đọc provider để gọi phương thức increment () trên đó.
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Riverpod Tutorial',
      home: Scaffold(
        body: Center(
          child: Consumer(
            builder: (context, watch, child) {
              final incrementNotifier = watch(incrementProvider);
              return Text(incrementNotifier.value.toString());
            },
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            context.read(incrementProvider).increment();
          },
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```
## Những điều không thể làm với Provider 'original'
Riverpod's providers objects không dựa vào types để tìm kiếm các provider => có nhiều provider cùng type mà không gặp vấn đề gì
```dart
final firstStringProvider = Provider((ref) => 'First');
final secondStringProvider = Provider((ref) => 'Second');

// Somewhere inside a ConsumerWidget
final first = watch(firstStringProvider);
final second = watch(secondStringProvider);
```

### Dependency giữa các providers
Bất kỳ ứng dụng nào trong thực tế đều có sự phụ thuộc giữa các lớp.  Ví dụ: bạn có thể có ChangeNotifier phụ thuộc vào Repository,mà nó lại phụ thuộc vào HttpClient.  Xử lý các phụ thuộc như vậy với Riverpod rất đơn giản và dễ đọc.

Với ví dụ đơn giản sau, chỉ có một FutureProvider phụ thuộc trực tiếp vào một FakeHttpClient.  Việc getting một provider khác bên trong function của provider được thực hiện bằng cách gọi **read** trên tham số ProviderReference  - ref luôn được chuyển vào. Nếu bạn phụ thuộc vào provider có giá trị có thể thay đổi, bạn cũng có thể gọi **watch**.
> FutureProvider :  gần giống như Provider nhưng nó sẽ trả về 1 Future.
```dart
class FakeHttpClient {
  Future<String> get(String url) async {
    await Future.delayed(const Duration(seconds: 1));
    return 'Response from $url';
  }
}

final fakeHttpClientProvider = Provider((ref) => FakeHttpClient());
final responseProvider = FutureProvider<String>((ref) async {
  final httpClient = ref.read(fakeHttpClientProvider);
  return httpClient.get('https://resocoder.com');
});
```
Sử dụng các giá trị từ FutureProvider từ UI là hoàn toàn thú vị.  Đã qua rồi thời của những FutureBuilders vụng về!  Riverpod giúp việc xây dựng các widgets dựa trên Future là dễ dàng.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Riverpod Tutorial',
      home: Scaffold(
        body: Center(
          child: Consumer(
            builder: (context, watch, child) {
              final responseAsyncValue = watch(responseProvider);
              return responseAsyncValue.map(
                data: (_) => Text(_.value),
                loading: (_) => CircularProgressIndicator(),
                error: (_) => Text(
                  _.error.toString(),
                  style: TextStyle(color: Colors.red),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
```
### Passing arguments to providers
Nếu bạn muốn chuyển một URL do người dùng xác định đến responseProvider? Hãy dùng family, thay đổi responseProvider thành như sau ...
```dart
final responseProvider =
    FutureProvider.family<String, String>((ref, url) async {
  final httpClient = ref.read(fakeHttpClientProvider);
  return httpClient.get(url);
});
```

```dart
final responseAsyncValue = watch(responseProvider('https://resocoder.com'));
```

### Automatically disposing of state

Bộ nhớ đệm cho provider's state là rất tuyệt nhưng đôi khi bạn muốn hủy trạng thái của một provider khi nó không còn được sử dụng nữa vì nhiều lý do như:

+ Khi sử dụng Firebase, bạn muốn đóng connect để tránh các phí phát sinh
+ Để thiết lập lại trạng thái khi người dùng rời khỏi màn hình và vào lại.

.....
```dart
final responseProvider =
    FutureProvider.autoDispose.family<String, String>((ref, url) async {
  final httpClient = ref.read(fakeHttpClientProvider);
  return httpClient.get(url);
});
```
autoDispose sẽ loại bỏ provider's state ngay khi provider không được sử dụng.  Trong ví dụ trên, điều này xảy ra ta thay đổi đối số được truyền vào provider family.  Tuy nhiên, autoDispose hữu ích ngay cả khi bạn không sử dụng family modifier.  Trong trường hợp đó, việc xóa bỏ được bắt đầu khi ConsumerWidget một provider bị disposed.

## Tổng kết
Bài viết này đã giới thiệu cơ bản về Riverpod. Nếu ban muốn ngụp lặn sâu hơn thì có thể tìm hiểu thêm ở [đây](https://riverpod.dev/)

Nguồn tham khảo:

[Riverpod.dev](https://riverpod.dev/)

[Riverpod Tutorial](https://resocoder.com/2020/11/27/flutter-riverpod-tutorial-the-better-provider/)