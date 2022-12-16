![](https://images.viblo.asia/09c705c8-f807-4ab5-a6e6-eccdbd5c3243.png)

# Tại sao cần lập trình bất đồng bộ?

Lập trình bất đồng bộ cho phép chương trình thực hiện công việc trong khi chờ việc khác hoàn thành. Một số ví dụ điển hình như:

- Lấy dữ liệu từ server
- Ghi vào database
- đọc nội dung từ file

Để thực hiện lập trình bất đồng bộ trong Dart/ Flutter thì chúng ta có thể sử dụng `Future` và các từ khóa `async` và `await`.


# Future là gì?

Future là kết quả của hoạt động bất đồng bộ và có 2 trạng thái là **chưa hoàn thánh** và **hoàn thành**:

- Chưa hoàn thành: khi chúng ta gọi một hoạt động bất đồng bộ, no sẽ trả về một Future chưa hoàn thành, đây trạng thái của future trước khi trả về kết quả.

- Hoàn thành: khi hoạt động bất đồng bộ thực hiện xong thì future sẽ ở trạng thái hoàn thành, future có thể hoàn thành với một giá trị hoặc là một lỗi.

Future hoàn thành với một giá trị thì nó có thể là `Future<T>` với giá trị có kiểu T, `Future<String>` với giá trị kiểu String hoặc là một giá trị void với `Future<void>`.
    
Future hoàn thành với một lỗi khi mà hoạt động bất dồng bộ bị thất bại vì một lí do nào đó.
    
# Sử dụng Future, async, await
    
```dart
Future doEmptyFuture() {}
Future<bool> doSomething() {}
Future<Movie> getMovie()
```

Bạn có thể sử dụng từ khóa `async` trước thân hàm để đánh dấu nó là bất đồng bộ.

Để lấy dữ liệu từ Future chúng ta có thể dùng `await`, tuy nhiên `await` phải  đặt trong `async`. 
    
Toàn bộ code trong hàm `async` sẽ chạy đồng bộ ngay lập tức đến khi gặp `await` và chờ kết quả của `future` sau `await`.
    
```dart
    MaterialButton(
        onPressed: () async {
            var movie = await getMovie();
        }
    )
```

Đôi khi bạn không muốn biến function thành một future hay là điền `async`, thì chúng ta có thể sử dụng một cách khác đó là hàm `.then()`
    
```dart
    doSomething().then((value) {
        // run completed code here
    });
```

# Xử lý lỗi
    
Khi bạn dùng hàm `.then()` thì bạn có thể thêm `onError` để xử lý lỗi
    
```dart
    doSomething().then((value) {
        // run completed code here
    }, onError (error) {
        // handle error
    });
```

Nếu bạn muốn bắt cụ thể lỗi thì bạn có thể dùng hàm `.catchError()`

```dart
    doSomething().then((value) {
        // run completed code here
    })
    .catchError( (error) {
        // handle error
    });
```

Để trả về lỗi thì bạn có thể return `Future.error` hoặc bạn chỉ cần throw một exception.

```dart
  Future<bool> myTypedFuture() async {
    await Future.delayed(Duration(seconds: 1));
    throw Exception('Error from Exception');
  }
```

Bạn cũng có thể kết hợp `await` và `.catchError`

```dart
  Future runMyFuture() async {
    var value = await myTypedFuture()
    .catchError((error) {
      print(error);
    });
  }
```

# Quản lý nhiều future cùng lúc

Ví dụ bạn có màn hình cần tải nhiều dữ liệu trước khi làm tiếp một công việc. Bạn sẽ cần phải chờ tất cả future đó hoàn thành. Future có một hàm `.wait()` nhận vào list future và trả về một future duy nhất khi tất cả future trong list hoàn thành. Tương tự với `zip()` trong rxjava.

`Future.wait()` trả về kiểu `Future<List<T>>` là một future có type value là list các giá trị T của các future mà nó nhận vào.

```dart
// ui to call futures
FlatButton(
  child: Text('Run Future'),
  onPressed: () async {
    await runMultipleFutures();
  },
)
// Future to run
Future<bool> myTypedFuture(int id, int duration) async {
  await Future.delayed(Duration(seconds: duration));
  print('Delay complete for Future $id');
  return true;
}
// Running multiple futures
Future runMultipleFutures() async {
  // Create list of multiple futures
  var futures = List<Future>();
  for(int i = 0; i < 10; i++) {
    futures.add(myTypedFuture(i, Random(i).nextInt(10)));
  }
  // Waif for all futures to complete
  await Future.wait(futures);
  // We're done with all futures execution
  print('All the futures has completed');
}
```
Và dưới đây là output
```dart
I/flutter (12116): Delay complete for Future 7
I/flutter (12116): Delay complete for Future 3
I/flutter (12116): Delay complete for Future 9
I/flutter (12116): Delay complete for Future 4
I/flutter (12116): Delay complete for Future 2
I/flutter (12116): Delay complete for Future 1
I/flutter (12116): Delay complete for Future 8
I/flutter (12116): Delay complete for Future 0
I/flutter (12116): Delay complete for Future 6
I/flutter (12116): Delay complete for Future 5
I/flutter (12116): All the futures has completed
```

# Timeouts

Đôi khi hoạt động bất đồng bộ quá lâu và bạn không biết đến bao giờ nó mới dừng thì bạn sẽ muốn thêm thời giạn tối đa cho hoạt động đó thì bạn có thể sử dụng hàm `.timeout()`

```dart
  Future<bool> myTypedFuture(int id, int duration) async {
    await Future.delayed(Duration(seconds: duration));
    print('Delay complete for Future $id');
    return true;
  }
  
  Future runTimeout() async {
    await myTypedFuture(0, 10)
        .timeout(Duration(seconds: 2), onTimeout: (){
          print('0 timed out');
          return false;
        });
  }
```

# whenComplete

Future còn một hàm khác đó là `.whenComplete()`, bạn có thể dùng hàm này để thực hiện code khi mà future hoàn thành.

---

Bài tuần này đến đây là hết, hẹn gặp lại các bạn trong các bài tiếp theo. :grinning:

# Tham khảo

https://dart.dev/codelabs/async-await

https://medium.com/flutter-community/a-guide-to-using-futures-in-flutter-for-beginners-ebeddfbfb967