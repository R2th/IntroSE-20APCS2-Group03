## Giới thiệu

Với các bạn nào chưa biết thì việc viết và chạy test sẽ đảm bảo cho việc code của chúng ta vẫn chạy đúng cho dù trong tương lai chúng ta có thêm feature hoặc sửa đổi tính năng sẵn có của nó. 

Unit test (kiểm thử đơn vị) là kiểu test khá hữu dụng nếu chúng ta muốn xác định xem một chức năng, phương thức hoặc lớp có chạy đúng hay không. Trong Flutter thì package `test` cung cấp cho chúng ta một core framework để viết unit test và `flutter_test` để cung cấp cho chúng ta các tiện ích để kiểm thử Widget.

Trong khuôn khổ bài viết này mình xin chỉ trình bày về unit test .

## Vanilla unit test 

Trong phần này thì mình sẽ chỉ trình bày các bước setup và sử dụng thư viện unit test thuần của Dart  là `test`.

### Thêm dependency

Nếu các bạn đang chỉ đơn thuần dùng ngôn ngữ Dart thì các bạn cũng có thể sử dụng thư viện `test`  này. Việc sử dụng thư viện này không bó buộc vào framwork mà các bạn đang sử dụng. 

Chúng ta hãy mở file `pubspec.yaml` và thêm dependency vào, version mới nhất các bạn có thể check ở [đây](https://pub.dev/packages/test)

```yaml
dev_dependencies:
  test: <latest_version>
```

### Tạo file test

Trong ví dụ này chúng ta sẽ tạo 2 file là `counter.dart` và `counter_test.dart`.

File `counter.dart` sẽ chứa class mà chúng ta sẽ test và sẽ nằm trong thư mục `lib`. File `counter_test.dart` sẽ được dùng để chứa các bài test và sẽ được đặt trong thư mục `test`.

Thông thường thì các file test nên được đặt trong thư mục `test` . Thư mục này sẽ được đặt ở root của package.

Sau khi hoàn thành xong việc tạo các file trên thì cấu trúc thư mục của chúng ta sẽ dư lày:

```yaml
counter_app/
  lib/
    counter.dart
  test/
    counter_test.dart
```

### Tạo class để test

Điều tiếp theo chúng ta cần là "unit" để test. Ở đây "unit" có thể là một chức năng, phương thức hoặc class. Trong ví dụ này thì chúng ta sẽ tạo class `Counter` trong file `lib/counter.dart`. Nó sẽ có chức năng tăng giảm trường `value` bắt đầu từ 0:

```dart
class Counter {
  int value = 0;

  void increment() => value++;

  void decrement() => value--;
}
```

### Viết test cho class

Giờ thì chúng ta sẽ bắt đầu viết unit test đầu tiên trong file `counter_test.dart`. Các unit test sẽ được định nghĩa bằng cách sử dụng top-level function là `test` và chúng ta có thể check xem các kết quả có đúng hay không bằng cách dùng top-level function khác là `expect`. Cả hai function này đều thuộc package `test`.

````dart
import 'package:test/test.dart';
import 'package:counter_app/counter.dart';

void main() {
  test('Counter value should be incremented', () {
    final counter = Counter();

    counter.increment();

    expect(counter.value, 1);
  });
}
````



### Kết hợp nhiều unit test thành nhóm

Nếu chúng ta có nhiều unit test liên quan đến nhau thì chúng ta có thể dùng function `group` để nhóm các test case này lại với nhau:

```dart
import 'package:test/test.dart';
import 'package:counter_app/counter.dart';

void main() {
  group('Counter', () {
    test('value should start at 0', () {
      expect(Counter().value, 0);
    });

    test('value should be incremented', () {
      final counter = Counter();

      counter.increment();

      expect(counter.value, 1);
    });

    test('value should be decremented', () {
      final counter = Counter();

      counter.decrement();

      expect(counter.value, -1);
    });
  });
}
```

### Chạy test

Để chạy được test thì trên IntelliJ hoặc VSCode của mọi người phải cài sẵn Flutter plugin (chắc mọi người cài hết rồi :p).  Sau đây là các bước để chạy test:

- Với người dùng IntelliJ

  1. Mở file counter_test.dart.
  2. Vào mục `Run` trên thanh menu.
  3. Click vào mục `Run 'tests in counter_test.dart`.

- Với người dùng VSCode

  1. Mở file `counter_test.dart`.
  2. Vào mục `Debug` trên thanh menu.
  3. Click chọn mục `Start Debugging`.

- Với người thích xài terminal
  Từ root của project thì các bạn hãy chạy câu lệnh sau:

  ```terminal
  flutter test test/counter_test.dart
  ```

  ​

## Mock dependecies với Mockito

Trong một số trường hợp thì unit mà chúng ta cần test có thể sẽ phải lệ thuộc vào các class khác (gọi là dependecies), ví dụ như chúng ta sẽ phải phụ thuộc vào một class có chức năng fetch dữ liệu từ db hoặc web service chẳng hạn. Điều này khá là bất tiện do:

- Việc gọi request đến db hoặc webservice sẽ làm chậm đi tốc độ thực thi của test.
- Một unit test đã pass có thể sẽ bị fail trong trường hợp web service hoặc db trả về các kết quả ngoài mong đợi. Lúc này thì test case bị fail bởi tác động bên ngoài, cụ thể là do server hoặc db.
- Rất khó để có thể test hết các case success và fail sử dụng web service và database.


Chính vì vậy nên thay vì dựa dẫm vào web service hoặc database thì chúng ta nên "làm giả" (mock) các dependencies này. Mock cho phép chúng ta giả lập một web service hoặc database và trả về một kết quả tương ứng với một tình huống cụ thể nào đó.

Nói một cách đơn giản thì chúng ta có thể mock một dependency bằng cách tạo ra một implementation khác của class mà chúng ta muốn mock. Chúng ta có thể tạo ra các implementation khác này bằng cách sử dụng thư viện [Mockito](https://pub.dev/packages/mockito).

Sau đây mình xin trình bày các bước thêm và sử dụng Mockito.

### Thêm dependency `mockito`

Để có thể sử dụng `mockito` thì đầu tiên chúng ta sẽ phải thêm nó vào file `pubspec.yaml` cùng với `flutter_test` ở mục `dev_dependencies`.

Ngoài ra trong phần này chúng ta sẽ sử dụng thư viện `http` . Đây là toàn bộ các dependency chúng ta sẽ sử dụng:

```yaml
dependencies:
  http: <newest_version>
dev_dependencies:
  test: <newest_version>
  mockito: <newest_version>
```

### Tạo function để test

Trong ví dụ này chúng ta sẽ viết unit test cho hàm `fetchPost`  trong [đây](https://flutter.dev/docs/cookbook/networking/fetch-data/). Để có thể test chức năng này thì chúng ta sẽ phải tạo ra 2 sự thay đổi:

1. Cung cấp một instance của `http.Client` cho function. ĐIều này cho phép chúng ta có thể cung cấp một `http.Client` phù hợp cho tình huống cụ thể. Với Flutter và các project server-side thì chúng ta có thể cung cấp `http.IOClient`. Với các app Browser thì chúng ta có thể cung cấp `http.BrowserClient`. Còn với việc test thì chúng ta có thể cung cấp một mock.
2. Sử dụng `client` đẫ tạo ở trên để fetch dữ liệu từ Internet thay vì sử dụng phương thức `http.get` do việc mock `http.get` hơi khoai.

Hàm `fetchPost` của chúng ta lúc này sẽ trông như sau:

```dart
Future<Post> fetchPost(http.Client client) async {
  final response =
      await client.get('https://jsonplaceholder.typicode.com/posts/1');

  if (response.statusCode == 200) {
    // Nếu request lên server thành công thì sẽ parse JSON
    return Post.fromJson(json.decode(response.body));
  } else {
    // Ngược lại sẽ throw Exception
    throw Exception('Failed to load post');
  }
}
```

### Tạo một file test với mock

Tiếp theo thì chúng ta sẽ tạo ra một file test cùng với class `MockClient`. Các bạn hãy tạo một file tên là `fetch_post_test.dart` ở trong root của thư mục `test`.

Class `MockClient` sẽ implement class `http.Client`. Điều này sẽ cho phép chúng ta có thể truyền `MockClient` cho hàm `fetchPost` và cho phép chúng ta trả về các response http khác nhau trong mỗi unit test.

```dart
// Tạo ra một MockClient sử dụng class Mock được cung cấp bởi thư viện Mockito.
// Tạo ra một instance của class này ở mỗi unit test
class MockClient extends Mock implements http.Client {}

main() {
  // Unit test sẽ được viết trong này.
}
```

### Viết unit test cho mỗi lệnh rẽ nhánh

Nhìn vào hàm `fetchPost` chúng ta có thể thấy nó sẽ làm một trong 2 điều sau:

1. Trả về một Post nếu câu lệnh http thành công.
2. Ném ra một `Exception` nếu câu lệnh http fail.

Mong muốn của chúng ta sẽ là có thể test được cả 2 case này. Chúng ta có thể sử dụng class `MockClient` để trả về response "Ok" cho case thành công và lỗi trong case còn lại.

Để có thể làm được điều này thì chúng ta sẽ sử dụng hàm `when` được cung cấp bởi `Mockito`:

```dart
class MockClient extends Mock implements http.Client {}

main() {
  group('fetchPost', () {
    test('returns a Post if the http call completes successfully', () async {
      final client = MockClient();
      //Sử dụng Mockito để trả về một response thành công.
      when(client.get('https://jsonplaceholder.typicode.com/posts/1'))
          .thenAnswer((_) async => http.Response('{"title": "Test"}', 200));

      expect(await fetchPost(client), isInstanceOf<Post>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockClient();

      // Sử dụng Mockito để trả về error
      when(client.get('https://jsonplaceholder.typicode.com/posts/1'))
          .thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchPost(client), throwsException);
    });
  });
}
```

### Chạy test

Giờ khi đã có hàm `fetchPost` và các unit test của nó thì chúng ta có thể chạy các unit test được rồi.

```terminal
 dart test/fetch_post_test.dart
```

## Tổng kết

Hi vọng qua bài viết này các bạn đã nắm được cơ bản cách viết unit test trong Flutter. Hẹn gặp lại các bạn trong các bạn trong các bài viết sau.

Happy coding~



*Nguồn:* 
*https://flutter.dev/docs/cookbook/testing/unit/mocking*
*https://flutter.dev/docs/cookbook/testing/unit/introduction*