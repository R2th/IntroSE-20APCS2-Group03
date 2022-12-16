Làm hay không bằng hay làm,  hôm nay mình sẽ hướng dẫn các bạn làm một ứng dụng làm trắc nghiệm đơn giản bằng Flutter. 
Với ứng dụng này, mọi người sẽ hiểu thêm về UI, state trong Flutter.

Bắt đầu nào!

## Khởi tạo ứng dụng
Vối ứng dụng Flutter chúng ta có thể khởi tạo đơn giản bằng lệnh 
```
 flutter create app_name
```
Tất nhiên bạn phải đã phải setup đầy đủ môi trường từ trước. Xem thêm [tại đây](https://flutter.dev/docs/get-started/install)

## Phát thảo ý tưởng 

![](https://images.viblo.asia/5f98b057-ea24-4ae5-8a64-e519704c6d93.png)

Chúng ta sẽ làm chức năng chính cần thiết đầu tiên, layout dựa vào wireframe ở trên.

## Tạo đối tượng
Chúng ta tạo class Question với các trường thông tin cần sử dụng trong đó:
* question là câu hỏi
* options là danh sách đáp án
* answer là đáp án đúng 
* feedback là lời giải
```dart
class Question {
  int id;
  String question;
  List<String> options;
  int answer;
  String feedback;

  Question(
      {required this.id,
      required this.question,
      required this.options,
      required this.answer,
      required this.feedback});
}
```
Đồng thời mình sẽ tạo data câu hỏi 
```dart
final List<Question> questionsData = [
  Question(
      id: 1,
      question:
          "The three pillars of empiricism are: The three pillars of empiricism are: The three pillars of empiricism are: The three pillars of empiricism are:",
      options: [
        'Planning, Inspection, Adaptation.',
        'Transparency, Eliminating Waste, Kaizen.',
        'Inspection, Transparency, Adaptation.',
        'Planning, Demonstration, Retrospective.',
        'Respect For People, Kaizen, Eliminating Waste.'
      ],
      answer: 1,
      feedback:
          "Scrum is founded on empirical process control theory, or empiricism. Empiricism asserts that knowledge comes from experience and making decisions based on what is known.\nThree pillars uphold every implementation of empirical process control: transparency, inspection, and adaptation."),
  Question(
      id: 2,
      question: "Who has the final say on the order of the Product Backlog?",
      options: [
        'The Scrum Master.',
        'The Product Owner.',
        'The Stakeholders.',
        'The Developers.',
        'The CEO.'
      ],
      answer: 1,
      feedback:
          "The Product Owner is the sole person responsible for ordering the Product Backlog."),
  Question(
      id: 3,
      question: "What is the recommended size for a Scrum Team?",
      options: [
        "Minimum of 7.",
        "9.",
        "Typically 10 or fewer people.",
        "7 plus or minus 2."
      ],
      answer: 2,
      feedback:
          "A Scrum Team is small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people. Generally smaller teams communicate better and are more productive")
];
```

## Màn Home
Ở main.dart các bạn chỉnh sửa app điều hướng home là `HomeScreen`
```dart
class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Quizzy',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: HomeScreen(),
    );
  }
}
```

Mình tạo một `StatefulWidget` là `HomeScreen`. Chứa một Button để start bắt đầu làm trắc nghiệm. 
```dart
class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton.icon(
          onPressed: () {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => QuizScreen()));
          },
          label: Text('Start'),
          icon: Icon(Icons.arrow_forward),
        ),
      ),
    );
  }
}
```
![](https://images.viblo.asia/0d8ad432-cf3d-4431-b98c-e2f00f1cf084.png)

## Màn làm trắc nghiệm

Như ý tưởng mình sẽ tạo một appbar
```dart
appBar: AppBar(
        title: Text("QUIZ", style: TextStyles.titleHome),
        elevation: 0,
      ),
```

Mình tạo một biến `_currentIndex` để lưu lại vị trí câu hỏi hiện tại trong list câu hỏi.
```dart
  int _currentIndex = 0;
```

Mình lấy ra câu hỏi trong danh sách câu hỏi bằng cách 
```dart
    final question = questionsData[_currentIndex];
```

Phần UI câu hỏi mình sẽ tạo một `Row`
```dart
Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.deepPurple,
                  child: Text("${_currentIndex + 1}"),
                ),
                SizedBox(width: 16.0),
                Expanded(
                  child: Text(question.question),
                )
              ],
            ),
```

Với danh sách câu trả lời, mình sẽ tạo một `Card`
```dart
Card(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ...question.options.map(
                    (option) => RadioListTile(
                      title: Text(option),
                      value: option,
                      groupValue: _answers[_currentIndex],
                      onChanged: (value) {
                        setState(() {
                          _answers[_currentIndex] = option;
                        });
                      },
                    ),
                  )
                ],
              ),
            ),
```

Để lưu lại kết quả lựa chọn mfinh tạo một biến `_answers`
```dart
  final Map<int, dynamic> _answers = {};
```

Nút chuyển câu hỏi:
```dart
Expanded(
              child: Container(
                alignment: Alignment.bottomCenter,
                child: ElevatedButton.icon(
                  onPressed: _handleNext,
                  label: Text('Next'),
                  icon: Icon(Icons.arrow_forward),
                ),
              ),
            )
```

Mình xử lý logic khi bấn nút chuyển câu hỏi như sau:
- Người dùng không chọn câu trả lời nào => Hiện dialog nhắc nhở.
- Còn câu hỏi trong list câu hỏi => Hiện thị câu hỏi kế tiếp
- Đã hết câu hỏi => Hiện thị trang kết quả

```dart
void _handleNext() {
    if (_answers[_currentIndex] == null) {
      _showAlertDialog();
      return;
    }
    if (_currentIndex < (questionsData.length - 1)) {
      setState(() {
        _currentIndex++;
      });
    } else {
      Navigator.of(context).pushReplacement(MaterialPageRoute(
        builder: (context) => QuizResultScreen(),
      ));
    }
  }
```

Khi mình set state cập nhật `_currentIndex`, câu hỏi sẽ được update lại.

Dùng [showDialog](https://api.flutter.dev/flutter/material/AlertDialog-class.html) để hiện dialog 
```dart
  void _showAlertDialog() {
    showDialog<String>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('Warning'),
        content: const Text('You must attempt all questions to continue'),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(context, 'OK'),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
```
Và kết quả như sau 
![](https://images.viblo.asia/92a5b374-6b20-4129-a90e-b4b3ca343760.png)

Ở phần sau chúng ta sẽ làm thêm màn hình kiểm tra kết quả. 

Các bạn đón theo dõi nhé.

Link project: https://github.com/ngthanhphuc/Quizzy