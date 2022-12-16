## Bạn sẽ xây dựng ứng dụng như thế nào trong part 1?

Ứng dụng của bạn sẽ là một ứng dụng đơn giản, tạo ra các tên đề xuất cho một công ty start up. User có thể select và unselect tên, lưu lại cái tên họ thích nhất. App sẽ tạo các tên một cách từ từ. Khi user scroll, sẽ có nhiều tên hơn được tạo ra, không giới hạn.

![](https://images.viblo.asia/93836341-c211-4612-85e5-2a3b990cf7c7.gif)

## Step 1: Tạo Flutter app

Tạo một ứng dụng Flutter cơ bản dựa trên template có sẵn, đặt tên là **startup_namer** thay vì *myapp*

1.  Thay đổi code trong **lib/main.dart**.

Xóa tất cả code trong **lib/main.dart**, thay bằng đoạn code sau. Hiển thị "Hello World" ở giữa màn hình.

```dart
// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

2.  Chạy ứng dụng. Bạn có thể thấy cả Android và iOS như sau, tùy thuộc vào device bạn sử dụng.

<div align="center">
    
![](https://images.viblo.asia/3b975b6a-3d86-4e47-9afc-ad186905860e.png)
![](https://images.viblo.asia/988deca9-f4aa-4680-bcf9-950ca5f68254.png)
    
</div>

### Quan sát

* Ví dụ này tạo ra một ứng dụng Material. [Material](https://material.io/guidelines) là ngôn ngữ thiết kế trực quan đạt tiêu chuẩn trên thiết bị di động và web. Flutter cung cấp một bộ Material phong phú.
* Phương thức **main()** sử dụng ký hiệu mũi tên (=>). Sử dụng ký hiệu mũi tên cho các hàm hoặc phương thức một dòng.
* Ứng dụng extend **StatlessWidget** làm cho ứng dụng trở thành một widget. Trong Flutter, hầu hết mọi thứ là một widget, bao gồm căn chỉnh, phần đệm và bố cục.
* Scaffold widget, từ Material library, cung cấp một thanh ứng dụng mặc định, tiêu đề và thuộc tính body giữ cây widget cho màn hình chính. Các widget con có thể khá phức tạp.
* Công việc chính của widget là cung cấp một phương thức **build()** mô tả cách hiển thị widget theo các tiện ích khác, cấp thấp hơn.
* Phần body của ví dụ này bao gồm một **Center** widget chứa widget con **Text**. Widget Center căn chỉnh widget con vào giữa màn hình.

## Step 2: Sử dụng external package

Trong bước này, bạn sẽ bắt đầu sử dụng open package có tên [english_words](https://pub.dev/packages/english_words), chứa một vài ngàn từ tiếng Anh được sử dụng nhiều nhất cùng với một số chức năng tiện ích.

Bạn có thể tìm thấy gói **english_words**, cũng như nhiều gói nguồn mở khác, trên [pub.dev](https://pub.dev/).

1. Tệp pubspec quản lý các assets và dependencies cho ứng dụng Flutter. Trong **pubspec.yaml**, thêm **english_words** (3.1.0 trở lên) vào danh sách dependencies:

```dart
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^0.1.2
  english_words: ^3.1.0   # add this line
```

2. Trong khi xem pubspec trong editor view của Android Studio, hãy nhấp vào **Packages get**. Việc này sẽ kéo package vào project của bạn. Bạn sẽ thấy những điều sau đây trong bảng điều khiển:

```java
 flutter pub get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```

Thực hiện **Packages get** cũng tự động tạo tệp pubspec.lock với danh sách tất cả các package được pull vào project và phiên bản của chúng.

3. Trong **lib/main.dart**, import package:

```java
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
```

Khi bạn nhập, Android Studio cung cấp cho bạn các đề xuất cho các thư viện để nhập. Sau đó, nó kết xuất chuỗi nhập màu xám, cho bạn biết rằng thư viện đã nhập không được sử dụng (cho đến bây giờ).

4. Sử dụng English words  để tạo văn bản thay vì sử dụng "Hello World":

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random(); // Add this line.
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          //child: Text('Hello World'),   // Replace this text...
          child: Text(wordPair.asPascalCase),  // With this text.
        ),
      ),
    );
  }
}
```

5. Nếu ứng dụng đang chạy, hãy [hot reload](https://flutter.dev/docs/get-started/test-drive) để cập nhật ứng dụng đang chạy. Mỗi lần bạn nhấp vào hot reload hoặc save the project, bạn sẽ thấy một cặp từ khác nhau, được chọn ngẫu nhiên, trong ứng dụng đang chạy. Điều này là do việc ghép từ được tạo bên trong phương thức xây dựng, được chạy mỗi khi MaterialApp yêu cầu kết xuất hoặc khi chuyển đổi Nền tảng trong Flutter Inspector.

<div align="center">
    
![](https://images.viblo.asia/7a6f1471-1ed5-41b3-97a1-6cda39c87045.png)
![](https://images.viblo.asia/b5ff79f1-2a6b-48b7-a6a6-fcf92dfc3097.png)
    
</div>

## Step 3: Add Stateful widget

Stateless widgets à bất biến, có nghĩa là các thuộc tính của chúng không thể thay đổi, tất cả các giá trị là cuối cùng.

Stateful widgets có trạng thái duy trì trạng thái có thể thay đổi trong suốt vòng đời của widget. Việc triển khai một widget Stateful yêu cầu ít nhất hai lớp: 1) một lớp StatefulWidget tạo ra một thể hiện của 2) một lớp State. Bản thân lớp StatefulWidget là bất biến, nhưng lớp State vẫn tồn tại trong suốt vòng đời của widget.

Trong bước này, bạn sẽ thêm một stateful widget, **RandomWords**, tạo lớp **State** của nó, **RandomWordsState**. Sau đó, bạn sẽ sử dụng **RandomWords** như là con bên trong **MyApp** stateless widget hiện có.

1. Tạo một state class. tối thiểu. Thêm phần sau vào dưới cùng của **main.dart**:

```java
class RandomWordsState extends State<RandomWords> {
  // TODO Add build() method
}
```

Lưu ý khai báo **State<RandomWords>**. Điều này chỉ ra rằng chúng ta sử dụng chung [State](https://api.flutter.dev/flutter/widgets/State-class.html) class cho **RandomWords**. Hầu hết các logic của ứng dụng và states được đặt tại đây, nó duy trì trạng thái cho widget RandomWords. Lớp này lưu các cặp từ được tạo, phát triển vô hạn khi người dùng cuộn và các cặp từ yêu thích (trong phần 2), khi người dùng thêm hoặc xóa chúng khỏi danh sách bằng cách bật biểu tượng trái tim.

RandomWordsState phụ thuộc vào lớp RandomWords. Bạn sẽ thêm điều đó tiếp theo.
    
2. Thêm stateful RandomWords widget vào main.dart. RandomWords widget không làm gì khác ngoài việc tạo lớp State của nó:
    
```dart
class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => RandomWordsState();
}
```
   
Sau khi thêm lớp state, IDE sẽ báo rằng lớp đó thiếu phương thức build. Tiếp theo, bạn sẽ thêm một phương thức build cơ bản để tạo các cặp từ bằng cách di chuyển code tạo từ từ MyApp sang RandomWordsState.
    
3. Thêm phương thức **build** vào RandomWordsState, như được hiển thị bên dưới:
    
```dart
class RandomWordsState extends State<RandomWords> {
  @override                                  // Add from this line ... 
  Widget build(BuildContext context) {
    final WordPair wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }                                          // ... to this line.
}
```
  
4. Xóa code tạo từ khỏi MyApp bằng cách thực hiện các thay đổi bên dưới:
    
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final WordPair wordPair = WordPair.random();  // Delete this line.

    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          //child: Text(wordPair.asPascalCase), // Change this line to... 
          child: RandomWords(),                 // ... this line.
        ),
      ),
    );
  }
}
```
    
5. Hot reload app. App sẽ hoạt động như trước, hiển thị một từ ghép mỗi khi bạn hot reload hoặc save project.
    
## Step 4: Tạo ListView scroll vô hạn
    
Trong bước này, bạn sẽ mở rộng RandomWordsState để tạo và hiển thị danh sách các từ ghép. Khi người dùng cuộn, danh sách (được hiển thị trong widget ListView) sẽ tăng lên vô hạn. Hàm khởi tạo factory builder của ListView cho phép bạn xây dựng chế độ xem lazy list, theo yêu cầu.
    
1. Thêm list **_suggestions** vào lớp RandomWordsState để lưu các từ ghép được đề xuất. Ngoài ra, thêm một biến **_biggerFont** để làm cho kích thước phông chữ lớn hơn.
    
```dart
class RandomWordsState extends State<RandomWords> {
  // Add the next two lines.
  final List<WordPair> _suggestions = <WordPair>[];
  final TextStyle _biggerFont = const TextStyle(fontSize: 18); 
  ...
}
```
    
Tiếp theo, bạn sẽ thêm hàm **_buildSuggestions()** vào lớp RandomWordsState. Phương thức này sẽ xây dựng ListView hiển thị ghép nối từ được đề xuất.
    
Lớp ListView cung cấp một thuộc tính builder, **itemBuilder**, đó là hàm factory builder và hàm callback được chỉ định là một hàm ẩn danh. Hai tham số được truyền cho hàm là BuildContext và iterator row, i. Vòng lặp bắt đầu từ 0 và tăng mỗi lần hàm được gọi là một lần cho mỗi lần ghép từ được đề xuất. Mô hình này cho phép danh sách gợi ý phát triển vô hạn khi người dùng cuộn.
    
2. Thêm toàn bộ hàm **_buildSuggestions**, được hiển thị bên dưới, vào lớp RandomWordsState:
    
```dart
Widget _buildSuggestions() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemBuilder: (BuildContext _context, int i) {
        if (i.isOdd) {
          return Divider();
        }

        final int index = i ~/ 2;
    
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      }
    );
  }
```
    
Hàm **_buildSuggestions** gọi **_buildRow** một lần cho mỗi cặp từ. Hàm này hiển thị mỗi cặp mới trong ListTile.
    
3. Thêm hàm **_buildRow** vào RandomWordsState:
    
```dart
Widget _buildRow(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }
```
    
4. Cập nhật phương thức **build** cho RandomWordsState để sử dụng **_buildSuggestions()**, thay vì gọi trực tiếp thư viện tạo từ. ([Scaffold](https://docs.flutter.io/flutter/material/Scaffold-class.html) thực hiện Material Design visual layout cơ bản.)
    
```dart
  @override
  Widget build(BuildContext context) {
    //final wordPair = WordPair.random(); // Delete these... 
    //return Text(wordPair.asPascalCase); // ... two lines.

    return Scaffold (                   // Add from here... 
      appBar: AppBar(
        title: Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );                                      // ... to here.
  }
```
    
5. Update phương thức **build** của MyApp, thay đổi title và đặt home là RandomWords widget:
    
 ```dart
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      home: RandomWords(),
    );
  }
 ```
    
 6. Restart app. Kết quả như sau:
 
 <div align="center">
    
 ![](https://images.viblo.asia/dfb1a6e7-94db-41da-8031-20b6636a8f2a.png)
 ![](https://images.viblo.asia/ec5283db-cec6-4dbe-89cd-f84b9a6f240f.png)
  
</div>
    
 Thế là đã xong part 1 của app này. Phần 2 chúng ta sẽ thêm một chút như sau:
    
1.  Thêm tương tác.
2. Thêm khả năng điều hướng đến một màn hình mới.
3. Thay đổi màu sắc theme.
    
 Demo:
    
 <div align="center">
    
 ![](https://images.viblo.asia/de5a8792-0ed7-471e-95b4-0d33c68593af.gif)
  
</div>
 
Cảm ơn các bạn đã đọc bài của mình :D