Tiếp theo phần trước

## Bước 3: Thêm một Stateful Widget
Stateless widget là bất biến, có nghĩa là thuộc tính của nó không thể thay đổi - tất cả các giá trị là final.

Các Stateful Widget duy trì trạng thái có thể thay đổi trong suốt thời gian tồn tại của widget. Implement một widget stateful đòi hỏi ít nhất hai lớp: (1) một lớp StatefulWidget tạo ra một thể hiện của (2) một lớp State. Lớp StatefulWidget, chính nó, không thay đổi, nhưng lớp State vẫn tồn tại trong suốt thời gian tồn tại của widget.

Trong bước này, bạn sẽ thêm một widget stateful, RandomWords , tạo ra lớp State , RandomWordsState . Sau đó, bạn sẽ sử dụng RandomWords như một child bên trong Stateless widget MyApp hiện có.

1. Tạo một lớp trạng thái tối thiểu. Thêm phần sau vào cuối main.dart :

```
class RandomWordsState extends State<RandomWords> {
  // TODO Add build method
}
```
  
Lưu ý trạng thái khai báo State<RandomWords> . Điều này cho thấy rằng chúng ta đang sử dụng lớp State chung chung chuyên dùng với RandomWords . Hầu hết logic và trạng thái của ứng dụng nằm ở đây — nó duy trì trạng thái cho widget RandomWords . Lớp này lưu các cặp từ được tạo ra, phát triển vô hạn khi người dùng cuộn và các cặp từ yêu thích (trong phần 2 ), khi người dùng thêm hoặc xóa chúng khỏi danh sách bằng cách chuyển đổi biểu tượng trái tim.

RandomWordsState tùy thuộc vào lớp RandomWords . Bạn sẽ thêm phần tiếp theo.

2. Thêm widget RandomWords stateful vào main.dart . Tiện ích RandomWords không có gì khác ngoài việc tạo lớp Trạng thái của nó:

```
class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => new RandomWordsState();
}
```
 
Sau khi thêm lớp trạng thái, IDE báo rằng lớp thiếu phương thức build. Tiếp theo, bạn sẽ thêm phương thức build cơ bản để tạo cặp từ bằng cách di chuyển mã tạo từ ở MyApp vào RandomWordsState .

3. Thêm phương thức build() vào RandomWordsState :

```
class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }
}
```
 
4. Loại bỏ mã tạo từ trong MyApp :

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();  // Xóa dòng này

    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          //child: Text(wordPair.asPascalCase), // Thay đoạn Text() bằng...
          child: RandomWords(), // ... RandomWords()
        ),
      ),
    );
  }
}
```
 
5. Khởi động lại ứng dụng. Ứng dụng sẽ hoạt động như trước, hiển thị ghép nối từ mỗi lần bạn tải lại hoặc lưu ứng dụng.

> Mẹo: Nếu bạn thấy cảnh báo sau khi Hot reload, hãy xem xét khởi động lại ứng dụng:
> 
> Reloading…
> Some program elements were changed during reload but did not run when the view was reassembled; you may need to restart the app (by pressing “R”) for the changes to have an effect.
> 
> Nó có thể là cảnh báo giả, nhưng việc khởi động lại đảm bảo rằng các thay đổi của bạn được phản ánh trong giao diện người dùng của ứng dụng.

### Gặp vấn đề?
Nếu ứng dụng của bạn không hoạt động chính xác, bạn có thể sử dụng mã tại liên kết sau để trở lại đúng hướng.

[lib/main.dart](https://raw.githubusercontent.com/chalin/flutter-codelabs/master/startup_namer/3_end_of_add_stateful_widget/lib/main.dart)

## Bước 4: Tạo một ListView cuộn vô tận
Trong bước này, bạn sẽ mở rộng RandomWordsState để tạo và hiển thị danh sách các cặp từ. Khi người dùng cuộn, danh sách được hiển thị trong widget ListView, kéo dài vô hạn. Hàm constructor của ListView cho phép bạn xây dựng nhanh một list view, theo yêu cầu.

1. Thêm một danh sách RandomWordsState *_suggestions* trong lớp RandomWordsState để lưu các cặp từ gợi ý. Ngoài ra, thêm một biến lớn hơn để làm cho kích thước phông chữ lớn hơn.

> Mẹo: Tiền tố một số nhận dạng có dấu gạch dưới thực thi [enforces privacy](https://www.dartlang.org/guides/language/language-tour) bằng ngôn ngữ Dart.

```
class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];

  final _biggerFont = const TextStyle(fontSize: 18.0);
  ...
}
```
 
Tiếp theo, bạn sẽ thêm hàm *_buildSuggestions()* vào lớp RandomwordsState . Phương thức này xây dựng ListView hiển thị cặp ghép nối được gợi ý.

Lớp ListView cung cấp một thuộc tính builder, itemBuilder , đó là một trình factory builder và callback được chỉ định như một hàm ẩn danh. Hai tham số được truyền cho hàm - BuildContext và row iterator, i . Iterator bắt đầu tại 0 và tăng mỗi lần hàm được gọi, một lần cho mỗi cặp ghép nối được đề xuất. Mô hình này cho phép danh sách được đề xuất phát triển vô hạn khi người dùng cuộn.

2. Thêm toàn bộ *_buildSuggestions()* , được hiển thị bên dưới, vào lớp RandomWordsState (xóa các comment, nếu bạn thích).

```
class RandomWordsState extends State<RandomWords> {
  ...
  Widget _buildSuggestions() {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      // The itemBuilder callback is called once per suggested word pairing,
      // and places each suggestion into a ListTile row.
      // For even rows, the function adds a ListTile row for the word pairing.
      // For odd rows, the function adds a Divider widget to visually
      // separate the entries. Note that the divider may be difficult
      // to see on smaller devices.
      itemBuilder: (context, i) {
        // Add a one-pixel-high divider widget before each row in theListView.
        if (i.isOdd) return Divider();

        // The syntax "i ~/ 2" divides i by 2 and returns an integer result.
        // For example: 1, 2, 3, 4, 5 becomes 0, 1, 1, 2, 2.
        // This calculates the actual number of word pairings in the ListView,
        // minus the divider widgets.
        final index = i ~/ 2;
        // If you've reached the end of the available word pairings...
        if (index >= _suggestions.length) {
          // ...then generate 10 more and add them to the suggestions list.
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      }
    );
  }
}
```
 
Hàm *_buildSuggestions()* gọi *_buildRow()* một lần cho mỗi cặp từ. Hàm này hiển thị mỗi cặp mới trong một ListTile, cho phép bạn làm cho các row hấp dẫn hơn trong bước tiếp theo.

3. Thêm hàm *_buildRow()* vào RandomWordsState:

```
class RandomWordsState extends State<RandomWords> {
  ...

  Widget _buildRow(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  }
}
```

4. Cập nhật phương thức build cho RandomWordsState để sử dụng *_buildSuggestions()* , thay vì gọi trực tiếp thư viện tạo từ. (Widget Scaffold triển khai bố cục trực quan Material Design cơ bản).

```
class RandomWordsState extends State<RandomWords> {
  ...
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random(); // Delete these two lines.
    return Text(wordPair.asPascalCase);
    return Scaffold (
      appBar: AppBar(
        title: Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );
  }
  ...
}
```

5. Cập nhật phương thức xây dựng cho MyApp, thay đổi tiêu đề và thay đổi home thành widget RandomWords.

Thay thế phương thức gốc bằng phương pháp xây dựng bên dưới:

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      home: RandomWords(),
    );
  }
}
```

6. Khởi động lại ứng dụng. Bạn sẽ thấy một danh sách các cặp từ bất kể bạn cuộn bao xa.
![](https://images.viblo.asia/3b1f3e93-9a86-4d76-ba7d-c7ccc84e7af6.png)
![](https://images.viblo.asia/45f68643-4725-427a-8b56-e26f5cb2d6f7.png)
Android (bên trái) và iOS (bên phải)

### Gặp vấn đề?
Nếu ứng dụng của bạn không hoạt động chính xác, bạn có thể sử dụng mã tại liên kết sau để trở lại đúng hướng.

[lib/main.dart](https://raw.githubusercontent.com/chalin/flutter-codelabs/master/startup_namer/4_end_of_infinite_list/lib/main.dart)

## Tiếp theo?
Vậy là chúng ta đã hoàn thành một app cơ bản bằng Flutter. Những thứ ta học được bao gồm
* Tạo một ứng dụng Flutter từ đầu
* Viết code Dart
* Sử dụng 3rd party lib
* Dùng Hot reload
* Xây dựng một stateful widget
* Tạo một infinite scroll list

Bạn có thể tiếp tục phần 2 của app này dựa vào code trên codelab của Google tại [đây](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt2)
Những gì bạn sẽ làm ở phần 2:
* Implement tương tác người dùng bằng cách thêm vào list item một icon, khi click vào icon sẽ save/remove item vào favorite list.
* Điều hướng sang màn hình mới gồm list những item đã favorite
* Sửa theme color cho app

Nguồn https://flutter.io/get-started/codelab/#step-3-add-a-stateful-widget