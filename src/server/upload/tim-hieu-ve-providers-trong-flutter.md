![](https://images.viblo.asia/326e0ae6-e9ef-4306-8433-88b0efba75de.jpg)
Hôm nay, tôi sẽ chia sẻ với mọi người một chút về Provider. Một trong những công cụ để quản lý state trong Flutter. Mong được mọi người trao đổi và đóng góp ý kiến.
Trong bài này chủ yếu nói về các phần sau :

* Provider
* ChangeNotifierProvider
* ValueListenableProvider
* StreamProvider
* FutureProvider
* MultiProvider
* ProxyProvider
* ChangeNotifierProxyProvider

Mục đích của bài viết này là giúp bạn hiểu từng loại Provider. Tôi sẽ đưa ra một ví dụ nhỏ nhất về cách sử dụng từng cái. Sau đó, khi bạn hiểu sự khác biệt, bạn có thể tự quyết định xem bạn có muốn sử dụng loại Provider nào để quản lý trạng thái ứng dụng trong dự án của mình.

Tôi sẽ sử dụng giao diện như sau trong hầu hết bài bài viết này.
 ![](https://images.viblo.asia/ac3fca72-bf66-48f8-b2e0-69077df5feb2.png)

### Giao diện ứng dụng

Giao diện ứng dụng sẽ bao gồm các thành phần như sau:
  - Button  “Do something” là button làm thay đổi một event nào đó.
  - Button  “Show something”  là một text hiển thị một text khi có sự thay đổi state, event từ sự kiện nhấn vào button " Do something".

Dưới đây là code phần giao diện.
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('My App')),
        body: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            Container(
              padding: const EdgeInsets.all(20),
              color: Colors.green[200],
              child: RaisedButton(
                child: Text('Do something'),
                onPressed: () {},
              ),
            ),

            Container(
              padding: const EdgeInsets.all(35),
              color: Colors.blue[200],
              child: Text('Show something'),
            ),

          ],
        ),
      ),
    );
  }
}
```

Để có thể sử dụng các package của provider bạn cần thêm phần sau vào trong thư mục ```pubspec.yaml``` của project :

```dart
dependencies:
  provider: ^5.0.0
```

### Provider

**Provider** là loại package cơ bản nhất trong số các loại package của Provider. Bạn có thể sử dụng nó để cung cấp một giá trị (thường là một data model) cho bất kỳ vị trí nào trong widget tree. Tuy nhiên, nó sẽ không giúp bạn cập nhật widget tree khi mà giá trị đó thay đổi. Bạn có thể hình dung như việc nó chỉ set dữ liệu vào mà UI nó không có sự thay đổi gì, không nhận biết được sự thay đổi. Cùng xem ví dụ sau.

Class data model : 
```dart
class MyModel { 
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

Để có thể cung cấp data model đó cho widget tree bạn cần bọc phần trên cùng của widget tree bằng một `Provider`. Với tham số truyền vào là data model vừa tạo. Trong widget tree để có thể tham chiếu đến data model, cần sử dụng `Consumer` widget để lấy ra data model vừa truyền vào ở trên.

Code sẽ trông như thế này: 

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<MyModel>( //                                <--- Provider
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        // We have access to the model.
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}

class MyModel { //                                               <--- MyModel
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

Kết quả khi chạy app: 
* Giao diện người dùng sẽ hiển thị  "Hello" với data từ trong model.
* Nhấn button “Do something” sẽ làm thay đổi data trong data model. Tuy nhiên, ngay cả khi dữ liệu của model đã thay đổi, giao diện người dùng không được cập nhật lại vì `Provider` widget không lắng nghe những thay đổi về giá trị mà nó cung cấp.

### ChangeNotifierProvider

Không giống như **Provider**, **ChangeNotifierProvider** lắng nghe các thay đổi trong data model. Khi có thay đổi, nó sẽ xây dựng lại bất kỳ widget nào trong `Consumer`.

Trong hàm build thay đổi  Provider thành ChangeNotifierProvider. Lớp mô hình cần sử dụng `extend ChangeNotifier` (hoặc `with ChangeNotifier`). Điều này cung cấp cho bạn quyền truy cập vào `notifyListeners()` và bất kỳ lúc nào bạn gọi `notifyListeners()` thì ChangeNotifierProvider sẽ được thông báo và tất cả các widget bên trong `Consumers` sẽ được rebuild  lại.

Tham khảo đoạn code sau: 
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<MyModel>( //      <--- ChangeNotifierProvider
      create: (context) => MyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                  padding: const EdgeInsets.all(20),
                  color: Colors.green[200],
                  child: Consumer<MyModel>( //                  <--- Consumer
                    builder: (context, myModel, child) {
                      return RaisedButton(
                        child: Text('Do something'),
                        onPressed: (){
                          myModel.doSomething();
                        },
                      );
                    },
                  )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}

class MyModel with ChangeNotifier { //                          <--- MyModel
  String someValue = 'Hello';

  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
    notifyListeners();
  }
}
```

Kết quả khi chạy app: 
- Khi nhấn vào  “Do something” button, text sẽ thay đổi từ “Hello” sang  “Goodbye”.

![](https://images.viblo.asia/79d9104c-d707-48d3-878f-ff763bbf2c6d.gif)

Notes: 

- Trong hầu hết các ứng dụng, Class Model của bạn sẽ nằm trong package riêng của nó và bạn sẽ cần phải import `flutter/foundation.dart` để sử dụng `ChangeNotifier`. Điều đó có nghĩa là Model có sự phụ thuộc vào `framework`.
- `Consumer` widget sẽ xây dựng lại bất kỳ widget nào bên trong nó và bất cứ khi nào `notifyListeners()` được gọi. Tuy nhiên, button "Do something" không cần thiết phải cập nhật, vì vậy thay vì sử dụng Consumer, bạn có thể sử dụng `Provider.of` và set listener bằng false. Bằng cách đó, button "Do something" sẽ không được tạo lại khi có thay đổi. Đây là một ví dụ :

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final myModel = Provider.of<MyModel>(context, listen: false);
    return RaisedButton(
      child: Text('Do something'),
      onPressed: () {
        myModel.doSomething();
      },
    );
  }
}
```

### FutureProvider

**FutureProvider** về cơ bản chỉ là một wrapper với bên trong là FutureBuilder. Bạn cung cấp cho nó một số dữ liệu ban đầu để hiển thị trong giao diện người dùng và cũng có thể cung cấp cho nó một hoạt động bất đồng bộ Future của giá trị mà bạn muốn cung cấp. FutureProvider lắng nghe khi Future hoàn thành và sau đó thông báo cho `Consumers` để xây dựng lại các widget của nó.

Trong bài viết này, tôi đã sử dụng một Model để cung cấp một số dữ liệu ban đầu cho giao diện người dùng. Tôi cũng đã thêm một chức năng để trả về một Model với data mới sau 3 giây. Cùng tham khảo đoạn code sau:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureProvider<MyModel>( //                      <--- FutureProvider
      initialData: MyModel(someValue: 'default value'),
      create: (context) => someAsyncFunctionToGetMyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
    
  }
}

Future<MyModel> someAsyncFunctionToGetMyModel() async { //  <--- async function
  await Future.delayed(Duration(seconds: 3));
  return MyModel(someValue: 'new data');
}

class MyModel { //                                               <--- MyModel
  MyModel({this.someValue});
  String someValue = 'Hello';
  Future<void> doSomething() async {
    await Future.delayed(Duration(seconds: 2));
    someValue = 'Goodbye';
    print(someValue);
  }
}
```

Kết quả khi chạy app: 

Giống như **Provider**, **FutureProvider** không lắng nghe bất kỳ thay đổi trong Model của mình. Khi thực hiện button “Do something” để thay đổi dữ liệu trong model sau 2 giây. Không có ảnh hưởng đến giao diện người dùng.
![](https://images.viblo.asia/b9a139bd-3417-4127-be66-10bcd22e6ba8.gif)

Notes:
- **FutureProvider** yêu cầu **Consumer** xây dựng lại giao diện sau khi **Future <Model>** hoàn thành.
- Lưu ý rằng việc nhấn nút “Do something” không cập nhật giao diện người dùng, ngay cả sau khi **Future <Model>** hoàn thành. Nếu bạn muốn loại chức năng đó, thì chỉ cần sử dụng **ChangeNotifierProvider**.
- Bạn có thể sử dụng **FutureProvider** để đọc dữ liệu từ một file hoặc network. Nhưng bạn cũng có thể làm điều đó với FutureBuilder. Theo ý kiến của tôi, **FutureProvider** không hữu ích hơn so với **FutureBuilder**. Nếu tôi cần một Provider thì có lẽ tôi sẽ sử dụng **ChangeNotifierProvider** và nếu tôi không cần **Provider** thì tôi sẽ sử dụng FutureBuilder. Tuy nhiên, tôi đó là ý kiến của tôi và có thể tôi chưa gặp nhiều trường hợp phức tạp hơn.

### StreamProvider
    
**StreamProvider** về cơ bản là một wrapper với bên trong là một StreamBuilder. Bạn cung cấp một `Stream` và sau đó **Consumer** được xây dựng lại khi có sự kiện trong steam. Thiết lập rất giống với **FutureProvider** ở trên.   

Bạn nên nhớ các giá trị được phát ra từ luồng là bất biến. Tức là **StreamProvider** không lắng nghe những thay đổi trong Model. Nó chỉ lắng nghe các sự kiện mới trong `Steam`. Tham khảo code sau :
  
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamProvider<MyModel>( //                       <--- StreamProvider
      initialData: MyModel(someValue: 'default value'),
      create: (context) => getStreamOfMyModel(),
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Container(
                padding: const EdgeInsets.all(20),
                color: Colors.green[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return RaisedButton(
                      child: Text('Do something'),
                      onPressed: (){
                        myModel.doSomething();
                      },
                    );
                  },
                )
              ),

              Container(
                padding: const EdgeInsets.all(35),
                color: Colors.blue[200],
                child: Consumer<MyModel>( //                    <--- Consumer
                  builder: (context, myModel, child) {
                    return Text(myModel.someValue);
                  },
                ),
              ),

            ],
          ),
        ),
      ),
    );
    
  }
}

Stream<MyModel> getStreamOfMyModel() { //                        <--- Stream
  return Stream<MyModel>.periodic(Duration(seconds: 1),
          (x) => MyModel(someValue: '$x'))
      .take(10);
}

class MyModel { //                                               <--- MyModel
  MyModel({this.someValue});
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
  }
}
``` 
Kết quả khi chạy app:
                                                                      
 ![](https://images.viblo.asia/f65f4dff-b314-4dcb-ae89-3db1f37a6b5b.gif)
                                                                      
Khi thực hiện button “Do something” để thay đổi dữ liệu trong model giao diện người dùng không được cập nhật. Giá trị hiển thị trên màn hình là giá chị được phát qua **Stream<MyModel>**.
                                                                      
Notes:

- StreamProvider yêu cầu `Consumer` xây dựng lại giao diện sau khi có sự kiện mới được phát ra.
- Lưu ý rằng việc nhấn nút “Do something” sẽ không cập nhật giao diện người dùng. Nếu bạn muốn loại chức năng đó, thì chỉ cần sử dụng `ChangeNotifierProvider`. Trên thực tế, bạn có thể có một luồng trong đối tượng mô hình của mình và chỉ cần gọi `notifyListeners()`. Bạn hoàn toàn không cần StreamProvider trong trường hợp đó.
- Bạn có thể sử dụng StreamProvider để triển khai mẫu BLoC.

### ValueListenableProvider
    
Nó giống như **ChangeNotifierProvider**. . . nhưng phức tạp hơn. . . và không có bất kỳ giá trị gia tăng rõ ràng nào.
Nếu bạn có một `ValueNotifier` như thế này,
  
```dart
 class MyModel {
  ValueNotifier<String> someValue = ValueNotifier('Hello');
  void doSomething() {
    someValue.value = 'Goodbye';
  }
}
```
Sau đó bạn có thể nghe bất kỳ thay đổi trong nó với **ValueListenableProvider**. Tuy nhiên, nếu bạn muốn gọi một phương thức trên Model từ giao diện người dùng, thì bạn cũng cần cung cấp  một model. Do đó, bạn có thể thấy `Provider` cung cấp `MyModel` cho `Consumer`. Cái mà sẽ đưa `ValueNotifier` trong  `MyModel` cho `ValueListenableProvider`. 
    
 ```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<MyModel>(//                              <--- Provider
      create: (context) => MyModel(),
      child: Consumer<MyModel>( //                           <--- MyModel Consumer
          builder: (context, myModel, child) {
            return ValueListenableProvider<String>.value( // <--- ValueListenableProvider
              value: myModel.someValue,
              child: MaterialApp(
                home: Scaffold(
                  appBar: AppBar(title: Text('My App')),
                  body: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[

                      Container(
                          padding: const EdgeInsets.all(20),
                          color: Colors.green[200],
                          child: Consumer<MyModel>( //       <--- Consumer
                            builder: (context, myModel, child) {
                              return RaisedButton(
                                child: Text('Do something'),
                                onPressed: (){
                                  myModel.doSomething();
                                },
                              );
                            },
                          )
                      ),

                      Container(
                        padding: const EdgeInsets.all(35),
                        color: Colors.blue[200],
                        child: Consumer<String>(//           <--- String Consumer
                          builder: (context, myValue, child) {
                            return Text(myValue);
                          },
                        ),
                      ),

                    ],
                  ),
                ),
              ),
            );
          }),
    );
  }
}

class MyModel { //                                             <--- MyModel
  ValueNotifier<String> someValue = ValueNotifier('Hello'); // <--- ValueNotifier
  void doSomething() {
    someValue.value = 'Goodbye';
    print(someValue.value);
  }
}
```                                   
Kết quả chạy app:
                                                                    
- Nhấn nút “Do something” khiến “Hello” chuyển thành “Goodbye” là do **ValueListenableProvider** lắng nghe sự thay đổi data ở model.

Notes:
- Provider<MyModel> cung cấp myModel cho cả `ValueListenableProvider` và “Do something” button.
- ` Consumer<String>` của `Text` widget lấy value của nó từ `ValueListenableProvider<String>` 
-  Có lẽ sẽ tốt hơn nếu sử dụng `Provider.of <MyModel> (context, listening: false)` hơn là `Consumer` ở đầu widget tree. Nếu không, chúng đang xây dựng lại toàn bộ cây mỗi lần.
    
### MultiProvider

Cho đến nay các ví dụ của tôi chỉ sử dụng một model object. Nếu bạn cần cung cấp loại model object thứ hai, bạn có thể lồng các provider (tương tự như những gì tôi đã làm trong ví dụ ValueListenableProvider ở trên). Tuy nhiên, có một cách khác gọn gàng hơn là sử dụng MultiProvider.

Tham khảo code sau: 
 
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider( //                                     <--- MultiProvider
      providers: [
        ChangeNotifierProvider<MyModel>(create: (context) => MyModel()),
        ChangeNotifierProvider<AnotherModel>(create: (context) => AnotherModel()),
      ],
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[

                  Container(
                      padding: const EdgeInsets.all(20),
                      color: Colors.green[200],
                      child: Consumer<MyModel>( //            <--- MyModel Consumer
                        builder: (context, myModel, child) {
                          return RaisedButton(
                            child: Text('Do something'),
                            onPressed: (){
                              // We have access to the model.
                              myModel.doSomething();
                            },
                          );
                        },
                      )
                  ),

                  Container(
                    padding: const EdgeInsets.all(35),
                    color: Colors.blue[200],
                    child: Consumer<MyModel>( //              <--- MyModel Consumer
                      builder: (context, myModel, child) {
                        return Text(myModel.someValue);
                      },
                    ),
                  ),

                ],
              ),

             // SizedBox(height: 5),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[

                  Container(
                      padding: const EdgeInsets.all(20),
                      color: Colors.red[200],
                      child: Consumer<AnotherModel>( //      <--- AnotherModel Consumer
                        builder: (context, myModel, child) {
                          return RaisedButton(
                            child: Text('Do something'),
                            onPressed: (){
                              myModel.doSomething();
                            },
                          );
                        },
                      )
                  ),

                  Container(
                    padding: const EdgeInsets.all(35),
                    color: Colors.yellow[200],
                    child: Consumer<AnotherModel>( //        <--- AnotherModel Consumer
                      builder: (context, anotherModel, child) {
                        return Text('${anotherModel.someValue}');
                      },
                    ),
                  ),

                ],
              ),
            ],
          ),
        ),
      ),
    );

  }
}

class MyModel with ChangeNotifier { //                        <--- MyModel
  String someValue = 'Hello';
  void doSomething() {
    someValue = 'Goodbye';
    print(someValue);
    notifyListeners();
  }
}

class AnotherModel with ChangeNotifier { //                   <--- AnotherModel
  int someValue = 0;
  void doSomething() {
    someValue = 5;
    print(someValue);
    notifyListeners();
  }
}
```   
Kết quả chạy app:

![](https://images.viblo.asia/2b12ff2e-b2e3-43f7-b6c3-48c2efd7617c.gif)
  
Notes:
- Nhấn cào button “Do something” thứ nhất, button sẽ thay đổi “Hello” thành “Goodbye”. Nhấn vào button “Do something” thứ hai, button sẽ làm thay đổi “0” đến “5”.
- Theo mình nghĩ cái này không có sự khác biệt nhiều so với single `ChangeNotifierProvider`. Theo cách này thì các `Consumers` khác nhau sẽ nhận các model theo các type được chỉ định. `Consumer<MyModel>` thì lấy MyModel, và `Consumer<AnotherModel>` thì lấy `AnotherModel`.
  
### ProxyProvider
 
Điều gì sẽ xảy ra nếu bạn có hai Model mà bạn muốn cung cấp, nhưng một trong các Model phụ thuộc vào mô hình còn lại? Trong trường hợp đó, bạn có thể sử dụng ProxyProvider. ProxyProvider lấy giá trị từ một provider và cho phép nó được đưa vào provider khác.  

```dart
MultiProvider(
  providers: [
    ChangeNotifierProvider<MyModel>(
      create: (context) => MyModel(),
    ),
    ProxyProvider<MyModel, AnotherModel>(
      update: (context, myModel, anotherModel) => AnotherModel(myModel),
    ),
  ],
```    
ProxyProvider cơ bản có hai loại model trong dấu ngoặc nhọn. Model thứ hai thì phụ thuộc vào model đầu tiên.
    
Code đầy đủ sẽ như sau:
 
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider( //                              <--- MultiProvider
      providers: [
        ChangeNotifierProvider<MyModel>( //               <--- ChangeNotifierProvider
          create: (context) => MyModel(),
        ),
        ProxyProvider<MyModel, AnotherModel>( //          <--- ProxyProvider
          update: (context, myModel, anotherModel) => AnotherModel(myModel),
        ),
      ],
      child: MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('My App')),
          body: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[

                  Container(
                      padding: const EdgeInsets.all(20),
                      color: Colors.green[200],
                      child: Consumer<MyModel>( //          <--- MyModel Consumer
                        builder: (context, myModel, child) {
                          return RaisedButton(
                            child: Text('Do something'),
                            onPressed: (){
                              myModel.doSomething('Goodbye');
                            },
                          );
                        },
                      )
                  ),

                  Container(
                    padding: const EdgeInsets.all(35),
                    color: Colors.blue[200],
                    child: Consumer<MyModel>( //            <--- MyModel Consumer
                      builder: (context, myModel, child) {
                        return Text(myModel.someValue);
                      },
                    ),
                  ),

                ],
              ),

              Container(
                  padding: const EdgeInsets.all(20),
                  color: Colors.red[200],
                  child: Consumer<AnotherModel>( //          <--- AnotherModel Consumer
                    builder: (context, anotherModel, child) {
                      return RaisedButton(
                        child: Text('Do something else'),
                        onPressed: (){
                          anotherModel.doSomethingElse();
                        },
                      );
                    },
                  )
              ),

            ],
          ),
        ),
      ),
    );

  }
}

class MyModel with ChangeNotifier { //                       <--- MyModel
  String someValue = 'Hello';
  void doSomething(String value) {
    someValue = value;
    print(someValue);
    notifyListeners();
  }
}

class AnotherModel { //                                      <--- AnotherModel
  MyModel _myModel;
  AnotherModel(this._myModel);
  void doSomethingElse() {
    _myModel.doSomething('See you later');
    print('doing something else');
  }
}
```
![](https://images.viblo.asia/436bad2a-f92f-4707-a11f-f1f8121d8efa.gif)
                                                                 
Notes:
                                                                  
- Khi bạn nhấn nút “Do something”, `MyModel` sẽ thay đổi Text thành “Goodbye”. `MyModel` thông báo cho thành phần lắng nghe nó (ChangeNotifierProvider) và giao diện người dùng được xây dựng lại với text mới.
- Khi bạn nhấn “Do something else”, `AnotherModel` sẽ lấy `MyModel` (đã được thêm bởi `ProxyProvider`) và thay đổi text thành “See you later”. Vì `MyModel` thông báo cho thành phần lắng nghe của nó về những thay đổi, nên giao diện người dùng lại được cập nhật. - Nếu `AnotherModel` có dữ liệu riêng bị thay đổi, giao diện người dùng sẽ không được cập nhật vì ProxyProvider không lắng nghe các thay đổi. Bạn sẽ cần một `ChangeNotifierProxyProvider` cho việc đó.

**Provider builder and value constructors**

Tôi muốn giải thích thêm một chút trước khi kết luận, tôi muốn giải thích thêm một điều khiến tôi khó hiểu khi tôi đang học cách sử dụng Provider.
Hầu hết (nếu không phải tất cả) Provider có hai loại `constructors`. Hàm tạo cơ bản nhận một `create`  trong đó bạn tạo đối tượng model của mình. Tôi đã làm điều đó trong hầu hết các ví dụ ở trên. 
 
```dart
Provider<MyModel>(
  create: (context) => MyModel(),
  child: ...
)
```
Bạn có thể thấy rằng đối tượng MyModel đã được tạo trong `create`. 
 
Nếu đối tượng của bạn đã được tạo và bạn chỉ muốn cung cấp một tham chiếu đến nó, thì bạn có thể sử dụng  value, like this:
    
```dart
final myModel = MyModel();
...
Provider<MyModel>.value(
    value: myModel, 
    child: ...
)
``` 
Ở đây MyModel đã được tạo trước đó và chỉ được chuyển vào dưới dạng tham chiếu. Bạn sẽ làm điều này nếu bạn đã khởi tạo model của mình trong phương thức `initState()`, và bạn có thể gọi một phương thức đến model để tải data từ network.    
 
### Kết luận

Sau tất cả những điều này, lời khuyên của tôi là bạn nên học cách sử dụng `ChangeNotifierProvider` và `Consumer`. Thỉnh thoảng, bạn có thể sử dụng `Provider widget` nếu bạn không cần cập nhật giao diện người dùng. Logic cho `Futures` và `Steam` đều có thể được đưa vào lớp model của bạn để thông báo cho `ChangeNotifierProvider`. Không cần `FutureProvider` hoặc `StreamProvider`. Thông thường, bạn sẽ không cần `MultiProvider` nếu bạn có một model cho mỗi màn hình. Và nếu có các phụ thuộc vào các model, GetIt sẽ xử lý điều đó. Không cần phải lo lắng về `ProxyProvider`. Bài đăng này cung cấp một số trợ giúp rất cụ thể với những gì tôi đã mô tả ở đây.
    
### Tham khảo
    
- https://github.com/rrousselGit/provider
- https://medium.com/flutter-community/making-sense-all-of-those-flutter-providers-e842e18f45dd