Flutter thực chất đã cung cấp sẵn cho chúng ta một giải pháp của DI đó là `InheritedWidget`.  Tuy nhiên, `InheritedWidget` có một hạn chế là phải nhúng nó trực tiếp vào UI, vì vậy nếu như chúng ta khai báo nhiều dependency thì việc nesting là không thể tránh khỏi. Và lại, khi muốn lấy một instance, bạn phải bắt buộc cần có `context`, thứ mà không phải ở đâu cũng có mà chỉ có trong các widget.

Từ những vấn đề đó, `get_it` ra đời như một giải pháp thay thế tốt hơn, dễ sử dụng hơn và tách biệt phần khai báo dependency với UI.

> Lưu ý: Hướng dẫn này dành cho version 4.0.4 (mới nhất tính đến thời điểm viết bài) nhằm giúp các bạn tìm hiểu hơn về `get_it`, từ đó có thể áp dụng tương tự đối với các phiên bản sau này. Hãy vào [document của get_it](https://pub.dev/packages/get_it) để tìm hiểu nâng cao và xem có gì thay đổi nhé 

## Cài đặt

Như các library khác, bạn cần thêm nó vào file `pubspec.yaml` trong project của bạn, sau đó chạy `flutter packages get` để cài đặt.

```yaml:pubspec.yaml
dependencies:
  ...
  get_it: ^4.0.4
```

Sau đó trong project chúng ta sẽ tạo ra một file mới, mình đặt tên là `injection.dart`. Trong file này hãy tạo một hàm để lát sau chúng ta sẽ đăng kí các dependency trong đó. Nội dung file tương tự như sau:

```dart:injection.dart
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

void configureDependencies() async {
    // TODO: đăng kí các dependency trong này
}
```

Và cuối cùng mở file `main.dart`,  gọi hàm mà chúng ta vừa tạo trước khi render UI:

```dart:main.dart
import 'injection.dart';

void main() async {
  await configureDependencies();

  runApp(MyApp()));
}
```

## Tạo các instances
`get_it` cung cấp cho chúng ta gần như đầy đủ các pattern để tạo ra instance:

#### Factory
*Factory* được hiểu như một nhà máy sản xuất object. Mỗi khi bạn gọi đến để lấy object thì sẽ có một instance mới được tạo ra và trả về cho bạn.Cú pháp như sau:

```dart
// Dùng khi instance có thể khởi tạo được ngay
getIt.registerFactory<HomeBloc>(() => HomeBloc());

// Dùng khi instance bắt buộc phải tạo dưới dạng bất đồng bộ (asynchronous)
// hàm createAsync của HomeBloc trả về một Future<HomeBloc>
getIt.registerFactoryAsync<HomeBloc>(() => HomeBloc.createAsync());
```

Chúng ta dùng *Factory* khi luôn muốn nhận về một instance mới mỗi khi sử dụng mà không liên quan gì đến instance trước để tránh trường hợp dùng lại các data cũ đã init từ instance trước hoặc pointer cũ (điều này thể hiện rất rõ nếu như bạn đã từng sử dụng redux, phải luôn trả về một object mới để có thể render lại được).

*Factory* không nên dùng nếu như object của bạn có chứa các logic code quá phức tạp dẫn đến việc làm chậm quá trình khởi tạo và lãng phí tài nguyên do luôn phải tạo lại mới mỗi khi cần đến.

#### Singleton
*Singleton* trái ngược với *factory*, chỉ tạo ra một instance duy nhất kể từ khi app khởi động, sau đó nếu bất kì chỗ nào có dùng dến thì sẽ chỉ trả về instance đã tạo trước đó. Do đó xuyêt suốt app, bạn sẽ chỉ sử dụng một instance của object đó mà thôi.

```dart
// Dùng khi instance có thể khởi tạo được ngay
getIt.registerSingleton<CounterRepository>(CounterRepository());

// Dùng khi instance bắt buộc phải tạo dưới dạng bất đồng bộ (asynchronous)
// hàm createAsync của CounterRepository trả về một Future<CounterRepository>
getIt.registerSingletonAsync<CounterRepository>(() => CounterRepository.createAsync());
```

Trái ngược với *factory*, nên dùng *singleton* khi bạn chỉ muốn khởi tạo object một lần và dùng ở nhiều chỗ, tránh lãng phí tài nguyên. Không nên dùng nếu như nó phụ thuộc quá nhiều về mặt giá trị và pointer, dễ gây lỗi app về mặt logic nếu không xử lí cẩn thận.

#### Lazy-singleton
*Lazy-singleton* thì giống như *singleton*, chỉ khác là nó sẽ được khởi tạo vào **lần gọi lấy instance đầu tiên**, chứ không phải khi app khởi động. Sử dụng nó nếu như việc tạo instance này mất thời gian, bạn không muốn app dừng ở màn hình splash quá lâu để chờ khởi tạo instance, dẫn đến việc UX của app không tốt.

Ngoài ra nếu bạn nghĩ object này ở một trường hợp nào đó có thể sẽ không sử dụng thì cũng có thể dùng cách này để tránh lãng phí tài nguyên.

> Ví dụ như khi mất mạng, user sẽ không cần gọi api, dẫn đến không cần instance network. Chỉ khi user có mạng, api được gọi lần đầu tiên thì instance được khởi tạo và sử dụng bình thường

```dart
getIt.registerLazySingleton<CounterRepository>(() => CounterRepository());
```

## Sử dụng

Rất đơn giản, bạn chỉ cần dùng `getIt.get<T>()` với trường hợp instance cần lấy là synchronous, `getIt.getAsync<T>()` với trường hợp là asynchronous

## Giải quyết dependency
Có những trường hợp object A cần cung cấp object B mới có thể hoạt động (A depends on B), vậy thì chúng ta sẽ phải làm như nào?

#### Factory/singleton A phụ thuộc vào factory/singleton B
```dart:models.dart
class A {
    final B b;
    
    const A(this.b);
}

class B {

}
```

```dart:injection.dart
// đăng kí B trước tiên
getIt.registerSingleton<B>(B());

getIt.registerFactory<A>(() {
    // lấy object B bên trên...
    final b = getIt.get<B>();
    
    // ...truyền vào constructor của A
    return A(b);
});
```

#### Factory/singleton A phụ thuộc vào asynchronous factory/singleton B
Lúc này phải chuyển hàm khởi tạo A thành asynchronous chứ không còn dùng được synchronous nữa, cụ thể là phải dùng:
- `registerFactoryAsync` thay vì `registerFactory`
- `registerSingletonAsync` thay vì `registerSingleton`

```dart:models.dart
class A {
    final B b;
    
    const A(this.b);
}

class B {
    static Future<B> createAsync() {
        // ... khởi tạo B
    }
}
```

```dart:injection.dart
// đăng kí B trước tiên
getIt.registerSingletonAsync<B>(() => B.createAsync());

getIt.registerFactoryAsync<A>(() async {
    // chờ và lấy object B bên trên...
    final b = await getIt.getAsync<B>();
    
    // ...truyền vào constructor của A
    return A(b);
});
```

#### Asynchronous factory/singleton A phụ thuộc vào factory/singleton B
Phần này cũng khá giống với `Factory/singleton A phụ thuộc vào factory/singleton B`
```dart:models.dart
class A {
    final B b;
    
    const A(this.b);
    
    static Future<A> createAsync(B b) {
        // ... khởi tạo A
    }
}

class B {

}
```

```dart:injection.dart
// đăng kí B trước tiên
getIt.registerSingleton<B>(B())

getIt.registerFactoryAsync<A>(() async {
    // lấy object B bên trên...
    final b = getIt.get<B>();
    
    // ...truyền vào hàm khởi tạo của A
    return await A.createAsync(b);
});
```

#### Asynchronous factory/singleton A phụ thuộc vào asynchronous factory/singleton B
Phần này cũng khá giống với `Factory/singleton A phụ thuộc vào asynchronous factory/singleton B`
```dart:models.dart
class A {
    final B b;
    
    const A(this.b);
    
    static Future<A> createAsync(B b) {
        // ... khởi tạo A
    }
}

class B {
    static Future<B> createAsync() {
        // ... khởi tạo B
    }
}
```

```dart:injection.dart
// đăng kí B trước tiên
getIt.registerSingletonAsync<B>(() => B.createAsync())

getIt.registerFactoryAsync<A>(() async {
    // lấy object B bên trên...
    final b = await getIt.getAsync<B>();

    // ...truyền vào hàm khởi tạo của A
    return await A.createAsync(b);
});
```

## Truyền params vào factory
Với một số trường hợp, bạn muốn truyền tham số vào constructor khi khởi tạo object, ví dụ như `User(age: 12, name: 'Kevin')`, `get_it` cũng cho phép bạn truyền param với số lượng tối đa là 2 params.

```dart:user.dart
class User {
    final int age;
    final String name;
    
    const User({this.age, this.name});
}
```

```dart:injection.dart
// Khởi tạo
getIt.registerFactoryParam<User, int, String>((age, name) => User(age: age, name: name));
```

```dart:home_screen.dart
// Sử dụng
getIt.get<User>(param1: 5, param2: 'Kevin');
```

Nếu bạn muốn truyền nhiều  hơn 2 params, có thể tạo một class đại diện cho các params và truyền vào như một param bình thường:
```dart:user.dart
class UserParams {
    final int age;
    final String name;
    final String address;
    
    const UserParams({this.age, this.name, this.address});
}

class User {
    final int age;
    final String name;
    final String address;
  
    const User({this.age, this.name, this.address});
  
    User.withParams(UserParams params) : this(age: params.age, name: params.name, address: params.address);
}
```

```dart:injection.dart
// Khởi tạo
getIt.registerFactoryParam<User, UserParams>((params) => User.withParams(params));
```

```dart:home_screen.dart
// Sử dụng
getIt.get<User>(param1: UserParams(age: 5, name: 'Kevin', address: 'Hanoi'));
```

## Tự động đăng kí dependency với `injectable`
Mình đã từng code Java Spring và thấy cơ chế inject dependency của nó khá hay, chỉ cần thêm annotation trên đầu class cần inject và nó sẽ tự động tìm và inject luôn cho mình chứ không phải declare ra như bên trên. 

Thật may là với `build_runner` và `injectable`, chúng ta có thể hoàn toàn tự động được công việc nhàm chán này.

#### Cài đặt
Đầu tiên chúng ta cần thêm vào `pubspec.yaml`, chạy `flutter packages get` để cài đặt.
```yaml:pubspec.yaml
dependencies:
    ...
    injectable: ^1.0.4

dev_dependencies:
    ...
    injectable_generator: ^1.0.4
    build_runner: ^1.10.2
```

Bây giờ hãy mở file `injection.dart`, sửa lại thành như sau:

```dart:injection.dart
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import 'injection.config.dart';

final getIt = GetIt.instance;

@InjectableInit()
Future<void> configureDependencies() async => await $initGetIt(getIt);
```

Bạn sẽ thấy báo lỗi ở `import 'injection.config.dart';` và `$initGetIt`. Đừng lo, hãy mở terminal lên, cd đến project và chạy lệnh sau:

`flutter packages pub run build_runner build`

Sau khi terminal chạy hoàn tất, bạn sẽ thấy có một file mới tên `injection.g.dart` tạo bởi `injectable`, nằm cùng vị trí với `injection.dart` và lỗi bên trên cũng đã hết. Vậy là chúng ta đã setup xong.

#### Sử dụng
Giờ thì thay vì chúng ta viết mọi thứ ở trong `configureDependencies()`, hãy tạm quên nó đi và chuyển qua object bạn cần khởi tạo.

Giả sử mình có 2 class A và B, mình muốn thêm nó vào DI dưới dạng factory, A phụ thuộc vào B thì mình chỉ cần import và thêm annotation `@injectable` phía trên 2 class đó:
```dart:models.dart
import 'package:injectable/injectable.dart';

@injectable
class A {
    final B b;
    
    const A(this.b);
}

@injectable
class B {

}
```

Bạn chạy lại lệnh `flutter packages pub run build_runner build` và mở file `injection.config.dart` lên xem, nếu nó trông tương tự như này tức là chúng ta đã thành công rồi đó :D

```dart:injection.config.dart
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import 'models.dart';

/// adds generated dependencies
/// to the provided [GetIt] instance

GetIt $initGetIt(
  GetIt get, {
  String environment,
  EnvironmentFilter environmentFilter,
}) {
  final gh = GetItHelper(get, environment, environmentFilter);
  gh.factory<B>(() => B());
  gh.factory<A>(() => A(get<B>()));
  return get;
}
```

Trong quá trình code, chúng ta có thể thay lệnh `flutter packages pub run build_runner build` bằng `flutter packages pub run build_runner watch`, và chỉ việc save lại file là `injectable` sẽ tự build lại file cho bạn luôn.

Tất nhiên ngoài factory ra, chúng ta cũng có thể dùng singleton và lazy-singleton bằng các annotation `@singleton` và `@lazySingleton`.

Với asynchronous factory bạn có thể dùng `@injectable` trên class và `@factoryMethod` trên hàm khởi tạo như sau:

```dart
import 'package:injectable/injectable.dart';

@injectable
class A {
    @factoryMethod
    static Future<A> createAsync() {
        ...
    }
}
```

`injectable` còn giúp chúng ta tách các dependency theo các môi trường khác nhau để sử dụng, dễ dàng viết unit test, mock data,... Ví dụ như bạn có thể tạo riêng `DevRepository` với dev url, config riêng so với `StgRepository` hay `ProdRepository` để tránh việc dev nhầm môi trường, hay `TestRepository` gồm các sample data để tiện cho việc mock, unit test.

Vì bài này khá dài rồi nên tính năng này và các tính năng nâng cao khác bạn hãy tham khảo document của `injectable` để tìm hiểu thêm nhé, rất hay đó :D

## Kết luận
Với các dự án trung bình và lớn thì Dependency Injection là một thứ không thể thiếu để bảo đảm tính dễ dàng maintain và scalable của dự án. Có rất nhiều cách áp dụng DI, `get_it` và `injectable` theo cá nhân mình thấy là một trong những công cụ hỗ trợ DI tốt nhất cho Flutter/Dart tính tới thời điểm hiện tại. 

Còn bạn thì sao? Bạn đang sử dụng công cụ nào? Hãy chia sẻ cho mọi người cùng biết để mở rộng kiến thức hơn nhé :D