![](https://images.viblo.asia/0de14389-9a67-47ee-92fc-306f02c52936.png)
Draggable và DragTarget trong Flutter cho phép chúng ta kéo thả một Widget trên màn hình. Trước tiên chúng ta cùng xem cơ bản về Draggable và DragTarget.
## Draggable 
Một Draggable có thể giúp widget di chuyển trên màn hình, hãy nhìn ví dụ về quân mã dưới đây:
![](https://images.viblo.asia/ff26ff44-012a-4219-953d-d7fdeb7edc79.gif)
Code để thực hiện chức năng trên rất đơn giản:
```
Draggable(
  child: WhiteKnight(
    size: 90.0,
  ),
  feedback: WhiteKnight(
    size: 90.0,
  ),
  childWhenDragging: Container(),
),
```
Có ba phần chính của một Draggable widget:
1. Child: tham số child là một widget sẽ được hiển thị khi Draggable đứng im.
2. Feedback: tham số feedback là một widget sẽ được hiển thị khi widget bị kéo đi.
3. Child When Dragging: tham số childWhenDragging nhận một widget để hiển thị ở vị trí ban đầu của child khi widget đang bị kéo đi.
Ở ví dụ bên trên, chúng ta có child là quân mã, khi quân mã bị kéo đi thì hiển thị Container rỗng thay thế. Hãy thử thay đổi một chút xem Draggable hoạt động thế nào.
Đầu tiên thay đổi tham số feedback. Ở ví dụ bên dưới, chúng ta thay đổi tham số feedback thành quân tượng trắng. Bây giờ, khi widget không bị kéo đi, một quân mã trắng được hiển thị, tuy nhiên khi bắt đầu kéo widget đi thì quân tượng sẽ hiển thị.
```
Draggable(
  child: WhiteKnight(
    size: 90.0,
  ),
  feedback: WhiteBishop(
    size: 90.0,
  ),
  childWhenDragging: Container(),
),
```
Kết quả của đoạn code bên trên:
![](https://images.viblo.asia/fe917204-0db7-46d2-acd9-671e674c1a66.gif)
Bây giờ thử thay đổi tham số thứ ba, childWhenDragging. Tham số này nhận một widget để hiển thị ở vị trí ban đầu của child trong khi widget đang bị kéo đi.
```
Draggable(
  child: WhiteKnight(
    size: 90.0,
  ),
  feedback: WhiteBishop(
    size: 90.0,
  ),
  childWhenDragging: WhiteRook(
    size: 90.0,
  ),
),
```
Và chúng ta sẽ được:
![](https://images.viblo.asia/cbc7ab81-f061-4a90-8ede-e957b771af58.gif)
### Hạn chế sự di chuyển của Draggable
Thay đổi tham số axis sẽ giúp chúng ta hạn chế được sự di chuyển của Draggable chỉ trong một chiều.
Axis.horizontal khiến widget feedback chỉ có thể di chuyển được trên trục ngang.
```
Draggable(
  axis: Axis.horizontal,
  child: WhiteKnight(
    size: 90.0,
  ),
  feedback: WhiteBishop(
    size: 90.0,
  ),
  childWhenDragging: Container(),
),
```
![](https://images.viblo.asia/daff89df-296f-4411-9c7b-94bc6249d203.gif)
Cũng tương tự chúng ta có Axis.vertical để widget feedback chỉ di chuyển được theo chiều dọc.
### Thêm data vào Draggable
Data có thể được gán vào một Draggable. Điều này sẽ hữu ích khi chúng ta sử dụng Draggable và DragTarget.
Hãy xem lại ví dụ trên, nếu chúng ta có nhiều quân cờ, mỗi quân cần có một data đặc trưng liên kết với nó. Các quân cờ sẽ cần các thuộc tính như màu sắc (đen, trắng) và kiểu (ví dụ mã, xe, tượng...)
Dưới đây là ví dụ về cách data có thể được gán vào Draggable để sử dụng cùng với DragTarget.
Ví dụ này sẽ được đề cập sâu hơn trong các phần sau của bài viết.
```
Draggable(
  child: WhiteKnight(
    size: 90.0,
  ),
  feedback: WhiteKnight(
    size: 90.0,
  ),
  childWhenDragging: Container(),
  data: [
    "White",
    "Knight"
  ],
),
```
### Callbacks
Draggable widget cung cấp các callback cho hành động trong widget. Các loại callback bao gồm: 
- onDragStarted: được gọi khi bắt đầu kéo lên widget.
- onDragCompleted: được gọi khi một Draggable được kéo lên một DragTarget và được chấp nhận.
- onDragCancelled: được gọi khi khi một Draggable không đến được DragTarget hoặc bị từ chối.
## DragTarget
Trong khi một Draggable cho phép widget có thể được kéo, thì một DragTarget cung cấp một đích đến cho Draggable.
Ví dụ như trong cờ vua, một quân cờ có thể kéo được khi một ô vuông trên bàn cờ là một đích kéo đến. 
![](https://images.viblo.asia/c49187d3-7802-4606-8429-31f99653faa5.gif)
Ở đây, quân mã đã được chấp nhận bởi DragTarget.
Đoạn code cho ví dụ trên như sau:
```
bool accepted = false;
DragTarget(builder: (context, List<String> candidateData, rejectedData) {
  return accepted ? WhiteKnight(size: 90.0,) : Container();
}, onWillAccept: (data) {
  return true;
}, onAccept: (data) {
   accepted = true;
},),
```
Note: data được đề cập trong phần tới đây của bài viết tương tự với tham số data của Draggable.
Thử xem các tham số của Draggable chi tiết hơn chút nhé.
### Builder
Builder sẽ tạo ra widget thực sự bên trong DragTarget. Hàm này được gọi mỗi lần một Draggable được đưa lên trên DragTarget hoặc được thả vào nó.<br><br>
Hàm này có ba tham số: context, candidateData và rejectedData.<br><br>
Tham số candidateData là data của Draggable được kéo lên trên DragTarget, chuẩn bị cho sự chấp nhận của DragTarget.<br><br>
Tham số rejectedData là data của Draggable được kéo lên trên DragTarget và không được chấp nhận.
Lưu ý rằng cả hai đều là data của Draggable mới được đưa lên DragTarget thôi chứ chưa thả xuống. 
### onWillAccept
onWillAccept là một hàm cung cấp data của Draggable để chúng ta quyết định có chấp nhận hay từ chối nó.
Đây cũng là lúc chúng ta sử dụng data đã được gán vào Draggable từ trước đó. Ví dụ ta có một Draggable:
```
Draggable(
  data: "Knight",
  // ...
),
```
sau đó chúng ta có thể xử lý như sau:
```
DragTarget(
  // ...
  onWillAccept: (data) {
    if(data == "Knight") {
      return true;
    } else {
      return false;
    }
  },
),
```
Logic kiểm tra bên trên sẽ chỉ chấp nhận Draggable có data là "Knight". Hàm này sẽ được gọi đến khi Draggable được đưa vào lần đầu tiên trong DragTarget.
### onAccept
Nếu Draggable được thả xuống DragTarget và onWillAccept trả về true thì onAccept sẽ được gọi đến.
onAccept đồng thời cho chúng ta data của Draggable và thường được sử dụng để lưu Draggable được thả lên DragTarget.
### onLeave
Hàm này được gọi đến khi một Draggable bị đưa ra khỏi DragTarget và không được thả vào lại.
## Demo
Dưới đây là một app demo đơn giản, người dùng sẽ được cho một số và được yêu cầu xếp nó chẵn hoặc lẻ. Tùy thuộc vào lựa chọn đó mà chúng ta hiển thị thông báo là lựa chọn đúng hay sai.
![](https://images.viblo.asia/0be92e57-a816-4ece-8246-5c85fd430041.gif)
#### Source code
```
import 'package:flutter/material.dart';
import 'package:chess_vectors_flutter/chess_vectors_flutter.dart';

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {

  GlobalKey<ScaffoldState> scaffoldKey = new GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Draggable(
              data: 5,
              child: Container(
                width: 100.0,
                height: 100.0,
                child: Center(
                  child: Text(
                    "5",
                    style: TextStyle(color: Colors.white, fontSize: 22.0),
                  ),
                ),
                color: Colors.pink,
              ),
              feedback: Container(
                width: 100.0,
                height: 100.0,
                child: Center(
                  child: Text(
                    "5",
                    style: TextStyle(color: Colors.white, fontSize: 22.0),
                  ),
                ),
                color: Colors.pink,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  width: 100.0,
                  height: 100.0,
                  color: Colors.green,
                  child: DragTarget(
                    builder:
                        (context, List<int> candidateData, rejectedData) {
                      print(candidateData);
                      return Center(child: Text("Even", style: TextStyle(color: Colors.white, fontSize: 22.0),));
                    },
                    onWillAccept: (data) {
                      return true;
                    },
                    onAccept: (data) {
                      if(data % 2 == 0) {
                        scaffoldKey.currentState.showSnackBar(SnackBar(content: Text("Correct!")));
                      } else {
                        scaffoldKey.currentState.showSnackBar(SnackBar(content: Text("Wrong!")));
                      }
                    },
                  ),
                ),
                Container(
                  width: 100.0,
                  height: 100.0,
                  color: Colors.deepPurple,
                  child: DragTarget(
                    builder:
                        (context, List<int> candidateData, rejectedData) {
                      return Center(child: Text("Odd", style: TextStyle(color: Colors.white, fontSize: 22.0),));
                    },
                    onWillAccept: (data) {
                      return true;
                    },
                    onAccept: (data) {
                      if(data % 2 != 0) {
                        scaffoldKey.currentState.showSnackBar(SnackBar(content: Text("Correct!")));
                      } else {
                        scaffoldKey.currentState.showSnackBar(SnackBar(content: Text("Wrong!")));
                      }
                    },
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
```

*Bài viết đến đây là kết thúc, hy vọng bạn đọc thấy hữu ích và đừng quên để lại comment nếu có bất kỳ góp ý nào nhé! Happy coding :D*

#### Nguồn tham khảo: [A Deep Dive Into Draggable and DragTarget in Flutter](https://medium.com/flutter-community/a-deep-dive-into-draggable-and-dragtarget-in-flutter-487919f6f1e4)