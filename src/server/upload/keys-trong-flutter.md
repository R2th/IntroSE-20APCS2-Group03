1. KHi nào thì tôi nên sử dụng Key
Để hiểu về key mình có ví dụ sau. Cho 2 stateless Titles, mỗi Titles có một màu được được tạo random. Trong Row và StatefulWidget sẽ gọi Positionedkey để lưu vị trí của title. Tôi thực hiện ấn nút FloatingActionButton sẽ thực hiện swap vị trí của chúng trong list.

Code : 
```
class PositionedKey extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => PositionedKeyState();
}

class PositionedKeyState extends State<PositionedKey> {
  List<Widget> tiles;

  @override
  void initState() {
    super.initState();
    tiles = [
      StatelessColorful(),
      StatelessColorful(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(child: Center(child: Row(mainAxisAlignment: MainAxisAlignment.center, children: tiles))),
        floatingActionButton: FloatingActionButton(child: Icon(Icons.sentiment_very_satisfied), onPressed: swapTiles));
  }

  void swapTiles() {
    setState(() {
      tiles.insert(1, tiles.removeAt(0));
    });
  }
}

class StatelessColorful extends StatelessWidget {
  final Color color = UniqueColorGenerator.getColor();

  StatelessColorful({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        color: color,
        child: Padding(
          padding: EdgeInsets.all(70.0),
        )
    );
  }
}

class UniqueColorGenerator {
  static Random random = new Random();

  static Color getColor() {
    return Color.fromARGB(255, random.nextInt(255), random.nextInt(255), random.nextInt(255));
  }
}

```

Kết quả : 
![](https://images.viblo.asia/7c595d72-02ac-42ff-8176-ea2f495aced5.gif)

Bây giờ mình sẽ thay class StatelessColorful thành kiểu statefull như sau : 
```
class StatelessColorful extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => StatelessColorfulWidget();
}

class StatelessColorfulWidget extends State<StatelessColorful> {
  final Color color = UniqueColorGenerator.getColor();
  @override
  Widget build(BuildContext context) {
    return Container(
        color: color,
        child: Padding(
          padding: EdgeInsets.all(70.0),
        )
    );
  }

}
```

Kết quả : Khi tap nút để thực hiện swap thì 2 màu sẽ ko đổi. 

Bây giờ mình sẽ truyền key vào class forStatefulColorfulPass như sau : 
```
@override
  void initState() {
    super.initState();
    tiles = [
      StatelessColorful(key: UniqueKey()),
      StatelessColorful(key: UniqueKey()),
    ];
  }
```

Thêm hàm constructor : 
```
class StatelessColorful extends StatefulWidget {
  StatelessColorful({Key key}) : super(key: key);
}
```

Kết quả : màu đã được đổi .


Vì sao lại như vậy ? Các bạn hãy nhìn vào sơ đồ dưới đây để mình giải thích: 
![](https://images.viblo.asia/fac704ce-79a3-4224-a13f-de987a75091d.jpeg)

Sơ đồ trên có 2 cột bao gồm : Widget Tree và Element Tree, trong lập trình thì các bạn cứ hiểu widget tree là một Class (một bản thiết kế) còn element Tree nó là một instance được tạo từ class.


Nếu lúc đầu không sử dụng UniqueKey thì 2 title có kiểu StatelessColorful sẽ không tráo đổi do Stateful red và Stateful blue đều  swap Widget StatelessColorful nhưng các thuộc tính của một element red và element blue đều không thay đổi ( đều không thay đổi tham chiếu) dẫn đến các element này ko thực hiện swap. Do vậy chúng ta cần sử dụng key  dùng  định danh các element trong tree  để thay đổi các tham chiếu.

## 2. Đặt Key ở đâu 

**Ordinarily, it should be set in the high-level widget of the current widget tree. (Thông thường , nên đặt key ở widget có level cao ở cây widget hiện tại)**

## 3. Loại key nào được sử dụng 
KeyThe purpose is to specify an interesting character for every widget and what to useKeyIt depends on the specific use scenario.
(Key được dùng để định danh widget. Việc sử dụng Key phải tuỳ vào trường hợp cụ thể)

**Value Key:** trong ứng dụng Todo List . Mỗi công việc là hằng số và đặc biệt .Trong trường hợp này nên dùng Value key và value là text.

**Object Key** : Giả sử mỗi một widget con chứa một tập hợp dữ liệu phức tạp , ví dụ một ứng dụng sổ địa chỉ cho thông tin người dùng . Bất kỳ trường  thông tin  nào chẳng hạn như tên , ngày sinh có thể giống một người khác nhưng mỗi 1 tập dữ liệu lại phải là duy nhất . Trong trường hợp này thì nên dùng key này .

**Unique Key** : Nếu nhiều widget con có cùng type hoặc bạn muốn đảm bảo các widget con không giống các widget khác.Chẳng hạn như ví dụ tôi đã demo ở đầu bài viết, các khối màu đều là kiểu StatelessColorfulWidget chỉ khác nhau ở thuộc tính màu sắc .

**GlobalKeys**: có 2 cách dùng 
1. Cho phép các widget thay đổi thằng cha của nó ở bất kỳ đâu trong ứng dụng mà ko bị mất trạng thái  hoặc chúng có thể được dùng để truy cập một widget khác trong một phần duy nhật của widget tree. 
2.  Trong trường hợp ví dụ bạn check mật khẩu , tuy nhiên bạn chỉ muốn lấy ra data của kiểu cụ thể  bạn có thể dùng  GlobalKey<FromState>

Bài viết đến đây là kết thúc. Hy mọng bài viết đã giúp các bạn hiểu 1 phần nào đó về Key .
    
##     Tài liệu tham khảo 
    https://medium.com/flutter/keys-what-are-they-good-for-13cb51742e7d
    https://medium.com/flutterdevs/keys-in-flutter-104fc01db48f