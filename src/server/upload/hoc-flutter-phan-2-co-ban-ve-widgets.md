# Giới thiệu :
Chào các bạn! Ở bài viết trước, chúng ta đã được tìm hiểu về cách set-up môi trường và đã viết được ứng dụng đầu tiên Hello World với Flutter. Hôm nay, chúng ta sẽ tiếp tục học Flutter bằng cách build một ứng dụng nhỏ và phân tích các dòng code để hiểu một cách thực tế các kiến thức. Các bạn chưa đọc phần 1 thì có thể đọc nó [ở đây](https://viblo.asia/p/hoc-flutter-phan-1-tao-ung-dung-dau-tien-hello-world-RnB5pMADKPG) trước khi đến với phần 2 này nhé. Bắt đầu thôi! 
# Nội dung: 
## Cơ sở lý thuyết. 
Trước khi bắt tay vào code chúng ta cần tìm hiểu vài thứ đã nhé.
### Sơ lược về Widget
* Chúng ta đã biết rằng trong Flutter, tất cả những gì chúng ta được nhìn thấy trên UI là Widget. Một Material app được bắt đầu với một widget, một button cũng là widget, text hiển thị cũng là widget. Ngay cả những event khi chúng ta tap, long-click, scroll,... cũng được biểu thị dưới dạng widget. 
* Không giống code native như ở Android hoặc IOS, Flutter có một cơ chế build, update UI hoàn toàn khác biệt. Và cơ chế đó như sau : 

![](https://images.viblo.asia/c5151a49-1db3-4fac-82b6-7662cdd296b1.png)

* Nhìn qua có vẻ hơi khó hiểu phải không, cơ chế gì kỳ vậy ? Thật ra thì nó rất dễ thôi, nó chỉ là một công thức biểu diễn cách Flutter render ra UI. Theo như công thức thì **UI** hiển thị ra màn hình sẽ phụ thuộc vào **state**, **state** có bất kỳ thay đổi gì thì **UI** sẽ thay đổi theo. Và đại diện cho phần **UI** ở đây sẽ là các *Widget*,  **state** sẽ là trạng thái Widget đó bao gồm cả dữ liệu nó đang chứa. 
* Widget thì được chia ra làm 2 loại. Đó là *StatelessWidget* và *StatefulWidget*.  OK, có bạn sẽ hỏi "vậy bây giờ tôi có Widget Text đó, làm sao để biết Widget này thuộc loại nào?". Đơn giản thôi nhìn xem nó kể thừa từ thằng nào là biết ấy mà `class Text extends StatelessWidget`. Đùa thôi chứ trả lời như vậy thì cục quá :joy::joy::joy: . Ý mình trả lời như vậy chỉ muốn nói mọi Widget chỉ nằm trong 2 loại này thôi. Còn bản chất sự khác nhau của 2 loại này mình xin được giải thích như sau.
###     StatelessWidget  : 
   StatelessWidget là widget không có state. Nó không chấp nhận sự thay đổi hiển thị bên trong nó. Mà chỉ nhận sự thay đổi từ bên ngoài (từ widget cha đã tạo ra nó) thì nó mới **thụ động** thay đổi theo. Có nghĩa là StatelessWidget chỉ đơn thuần nhận dữ liệu và hiển thị 1 cách thụ động. Tuy nhiên, chúng ta cần lưu ý một điểm là  StatelessWidget chỉ là không thể tự nó thay đổi dữ liệu **và** render lại dữ liệu đó lên UI thôi. Còn nếu chỉ thay đổi dữ liệu được truyền vào nhưng **không** update lên UI thì nó vẫn làm được. Cùng đến với demo nhỏ dưới đây để hiểu hơn về *StatelessWidget*.

   Chúng ta sẽ demo *StatelessWidget* ngay với code sample của google luôn cho quen thuộc nhé =)) . Với code mặc định google đã sử dụng *StatefulWidget* cho màn hình này, bây giờ mình xin sửa một chút là biến *StatefulWidget* thành *StatelessWidget* để chúng ta hiểu hơn chỗ này nhé (chú ý những chỗ mình comment thôi cho dễ hiểu)
    
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page', counter: 8), // ====== truyền vào counter = 8 ==========
    );
  }
}

class MyHomePage extends StatelessWidget { // ======== thay đổi thành StatelessWidget ========
  MyHomePage({Key key, this.title, this.counter}) : super(key: key);

  final String title;
  int counter; // ====== khai báo biến counter =========

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "You have pushed ' the button this many times:",
            ),
            Text(
              '$counter', // ============== nơi hiển thị UI của counter =============
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () { 
          counter = counter + 1;  // ======= thay đổi counter (+1 sau mỗi lần click) =========
          print("Number: $counter"); // ===== log counter ra để  theo dõi =======
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

![](https://images.viblo.asia/6c4e9bd2-1390-4aaf-be34-0db177f80da6.gif)

Đây là kết quả log chúng ta có được 
![](https://images.viblo.asia/26dad0b8-2b65-454e-9b1e-5c0d1a553fe9.png)

Các bạn thấy không, biến counter có thay đổi khi chúng ta click, nhưng giá trị hiển thị thì không thay đổi. *StatelessWidget* nó chỉ có thể hiển thị những gì nó nhận vào (ở đây là title và counter = 8), Còn việc thay đổi những giá trị đó -> ok nhưng điều này thật sự vô nghĩa bởi vì có thay đổi thì cũng chẳng thể update UI. Và cố thay đổi data trong StatelessWidget thật sự vô nghĩa trong hầu hết các trường hợp, chính Google cũng có warning khi chúng ta làm điều này. Để tạo được một StateWidget chúng ta đơn giản chỉ cần extends từ class StateWidget và override lại method *build(BuildContext context)* . 


### StatefulWidget:
* Trái ngược với *StatelessWidget*. *StatefulWidget* là widget có state. Và nó có thể chủ động thay đổi cũng như render khi có bất gì cần update. Với *StatefulWidget* chúng ta chỉ cần chú ý tới method **setState()** . Method này có tác dụng rebuild lại Widget khi chúng ta cần nó update điều gì đó. Như ở ví dụ gốc của google mình demo ở trên, có thể dễ dàng thấy mỗi khi click và họ sẽ gọi method setState để update sự thay đổi của biến *counter* lên UI như sau:

```dart
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
```

Đoạn code demo này có sẵn khi chúng ta tạo mới một project flutter nên mình xin không viết lại ở đây cho dài dòng. Và kết quả như chúng ta đã thấy là UI sẽ được update ngay khi click vào icon (+).

Để tạo ra một *StatefulWidget*, chúng ta cần kết thừa *StatefulWidget* . Thay vì override method build() như ở *StatelessWidget* chúng ta sẽ override method *createState()* . Method này yêu cần trả về một *State* (khác với 1 widget như method *build()* ) nên chúng ta cần phải định nghĩa ra một class State cho Widget này. Ở class State tiếp tục override method *build()*, method *build()* ở đây thì giống với ở *StatelessWidget*  trả về Widget nào chúng ta cần hiện thị là xong. Có vẻ hơi loạn :( Nhìn code dưới đây sẽ rõ hơn nha :

```dart
class MyHomePage extends StatefulWidget { 
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: SafeArea(
          child: Text('Example'),
        ),
      ),
    );
  }
}

```

Và ở  *StatelessWidget* chúng ta không có method *setState()*, đó là lý do vì sao gọi nó là Stateless :D . Ok, có một câu hỏi sẽ được đặt ra là vậy tại sao phải sinh ra *StatelessWidget* làm gì khi chúng ta có thể làm mọi thứ với *StatefulWidget* ?  Có những lý do mà mình có thể liệt kê ra như sau : 
* Để tạo *StatefulWidget* thì rất 'dài dòng', cái này chúng ta có thể tự thấy ở trên.
* Cũng là dài dòng, lần này là vì việc update được UI trong *StatefulWidget* bằng cách gọi *setState()* nên có thể nhét code logic vào trong code UI ở đây, gây khó hiểu cho người đọc và cục xúc với người maitainance :joy: .
* Vấn đề về performance. Ở những màn hình với UI đơn giản thì chúng ta khó có thể nhận ra nhưng với những UI phức tạp, có nhiều widget lồng nhau thì việc rebuild lại đống widget sẽ gây ảnh hưởng rất tiêu cực đến performance mỗi khi cần update data. 

=> Hạn chế tối đa việc sử dụng *StatefulWidget*.
Một câu hỏi nữa dược đặt ra là "OK, vậy bây giờ không dùng *StatefulWidget* thì làm sao để tui có thể update UI? " -> Đấy là lý do của việc ra đời các pattern, InheritWidget,... Chúng ta sẽ học về những cái này sau nên tạm thời dùng *StatefulWidget* đã nhé :D .


## Ứng dụng thứ 2 - tạo một ListView đơn giản.
Nói lý thuyết nãy giờ chắc mọi người khá là chán nản rồi. Bây giờ là lúc thực hành thôi, bắt tay vào code vào tạo ra những gì có thể "nhìn thấy được" :D .
* Đầu tiên là hình dung ra UI mình cần build trước cái đã :joy: .Đây là của mình:

![](https://images.viblo.asia/fb75d8ee-0522-4f62-a088-af00e8b3091a.png)



Trong demo này mình sẽ tạo một danh sách các linh kiện máy tính như hình trên  (chả là do mình có sở thích về mấy vụ này =)) ), thông qua ứng dụng chúng ta sẽ biết về những view component tạo nên ứng dụng này. Toàn bộ dữ liệu trên là dữ liệu fake thôi nhé ^^. 

Đầu tiên là định nghĩa ra những component cơ bản của app:

```dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: Strings.appName,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: Strings.appName),
    );
  }
}
```

* Nếu bạn đã đọc qua phần 1 thì khá là quen thuộc với code này rồi, nên mình xin không giải thích lại. Duy nhất chỉ có widget *ThemeData* là chưa xuất hiện thôi.  *ThemeData* đúng như cái tên là nó định nghĩa ra những gì chủ đạo của một app (màu sắc, size, của các component như appbar, text, button, ...) và phần *body* chính là phần giao diện chính của app thì mình tạo ra một Widget mới luôn cho clear. 

```dart
class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final _sampleData = _getSampleData();
  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: _buildList());
  }
  ...
}
```

Ở đây mình chỉ sử dụng *StatelessWidget* là đủ vì app này chỉ cần hiển thị dữ liệu có sẵn thôi, chẳng cần thay đổi data hay update UI gì cả. Một model class Accessory để chứa dữ liệu cần hiển thị. Mảng các dữ liệu của model  là *sampleData*.  Đoạn này khá quen thuộc rồi phải không, quan trọng là method *_buildList()* dưới đây:

```dart
  Widget _buildList() {
    return ListView.builder(itemBuilder: (context, index) {
      if (index > _sampleData.length - 1) return null;
      return GestureDetector(
        child: _buildItemRow(_sampleData[index]),
        onTap: () {
          Scaffold.of(context).showSnackBar(
            SnackBar(
              content: Text('Clicked at ${_sampleData[index].name}'),
            ),
          );
        },
      );
    });
  }
```
* Method *_buildList()* chúng ta sẽ trả về một *ListView.builder*, component này cho phép chúng ta tạo ra một list danh sách các ItemView, thuộc tính itemBuilder sẽ mang một call back cho phép chúng ta lấy ra context của ListView này và vị trí index của item trong *ListView*.
 Với index này mà chúng ta có thể build ra các ItemView theo đúng dữ liệu tại mỗi phần tử trong * sampleData*  ở  *buildItemRow()* .
*  Vì index của ListView trong thuộc tính *itemBuilder* sẽ được bắn ra vô hạn (chúng ta scroll tới đâu thì index của listview sẽ được bắn ra tới đó) trong khi đó list data *_sampleData* thì hữu hạn thôi, nếu index vượt qua số lượng phần tử có trong list data thì sẽ chẳng còn data mà hiển thị nữa và lúc đó sẽ bị lỗi nên mình đã đặt if check ở đây "nếu index lớn hơn số phần tử có trong mảng thì sẽ trả về null" đồng nghĩa sẽ chẳng còn ItemView được build ra nữa.
*  Nếu để ý kỹ một chút, các bạn sẽ thấy mình có sử dụng *GestureDetector* để wrap các itemBuilder, widget này cho phép chúng ta handle các event từ người dùng như tap, long-click, double-tap, drag,... với những param tương ứng. Ở đây thì mình chỉ đơn giản là show 1 snack bar `Scaffold.of(context).showSnackBar(...)` tên linh kiện khi user click vào một item bất kỳ.

Và cuối cùng, chúng ta có các item được build ra với data accessory tương ứng được truyền vào như sau:

```dart
Widget _buildItemRow(Accessory accessory) {
    return Card(
        child: Container(
            padding: const EdgeInsets.all(10.0),
            child: Row(
              children: <Widget>[
                Stack(
                  children: <Widget>[
                    Container(
                        padding: EdgeInsets.only(right: 15.0, top: 15.0),
                        child: Image.network(accessory.imageUrl,
                            width: 120, height: 120),
                     ),
                    Positioned.fill(
                      child: Align(
                        alignment: Alignment.topRight,
                        child: Visibility(
                          visible: accessory.isBestSellers,
                          replacement: SizedBox.shrink(),
                          child: Text(
                            Strings.bestSellers,
                            style: TextStyle(
                                fontStyle: FontStyle.italic,
                                color: Colors.white,
                                backgroundColor: Colors.red,
                                fontSize: 14,
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
                Flexible(
                  child: Column(
                    children: <Widget>[
                      Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            accessory.name,
                            softWrap: false,
                            style: TextStyle(fontSize: 17, color: Colors.black),
                            maxLines: 3,
                            overflow: TextOverflow.ellipsis,
                          ),
                      ),
                      Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "${Strings.originalPrice} ${accessory.price.toString()}đ",
                            style: TextStyle(
                                fontSize: 18,
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                ),
                          ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 10),
                        child: Align(
                            alignment: Alignment.bottomLeft,
                            child: Text(
                              "${Strings.discount} -${accessory.discountAmount.toString()}đ",
                              style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.red,
                                  fontStyle: FontStyle.italic,
                              ),
                            ),
                          ),
                      ),
                      Align(
                          alignment: Alignment.bottomLeft,
                          child: Text(
                            "${Strings.currentPrice} ${accessory.currentPrice.toString()}đ",
                            style: TextStyle(
                                fontSize: 17,
                                color: Colors.red,
                                fontWeight: FontWeight.bold,
                            ),
                          ),
                       )
                    ],
                  ),
                ),
              ],
            ),
         ),
      );
  }
```

Phân tích Widget :
* **Card**: Widget này tạo ra hiệu ứng nổi lên, và đổ bóng ở các cạnh viền. Thộc tính đặc trưng của widget này là **elevation** nhận giá trị double truyền vào, giá trị truyền vào càng lớn hiệu ứng nổi lên và đổi bóng càng cao.
* **Container**: Đây là widget hầu như có mặt trong tất cả các app lớn nhỏ. Nó cung cấp cho chúng ta rất nhiều thuộc tính rất thông dụng, từ việc thêm màu background(color), hình dạng, margin, padding, kích thước (width, height) cho đến việc sắp xếp, định vị, trang trí cho widget mà nó bao bọc. Nó còn rất linh hoạt trong việc kết hợp với các widget khác để tạo ra những UI độc đáo. Thật sự thì mình có thể viết 1 bài riêng về Widget này :relaxed: .
* **Row**, **Column**, **Stack** : Nói ngắn gọn thôi, 2 widget này chứa 1 tập các widget con với thuộc tính *children: [...]* , các widget con sẽ được sắp xếp trên một dòng theo chiều từ trái -> phải với widget **Row** , chiều từ trên xuống với widget **Column**, và sắp xếp đè lên nhau từng lớp như một [ngăn xếp](https://sapidlabs.com/assets/images/positioned-widget-flutter/stack_positioned_app.png) theo thứ tự truyền vào của các phần tử. Đây cũng là những widget gần như có mặt trong tất cả các app :D .
* **Positioned**, **Align**,... : Cái tên nói lên tất cả, đây là những widget giúp chúng ta căn chỉnh vị trí hiển thị của widget con chứa trong nói, các vị trị trí ở đây có thể trên-trái (topLeft), trên-giữa(topCenter), dưới-phải (bottomRight)... trong constant *Alignment*. Hoặc có thể ở bất cứ đâu theo tọa độ ta truyền vào *Alignment(x,y)*
* ...v..v..

Trên đây là một vài các widget được sử dụng khá thông dụng trong thực tế, còn nếu để nói cho hết tất cả các widget tồn tại chắc phải đến tết Congo :joy: . Một UI khi nhìn có thẻ trông giống nhau nhưng để viết nên UI đó thì có thể có nhiều cách viết cũng như sự phối hợp giữa các widget thuộc tính khác nhau. Thông qua quá trình code thực tế chúng ta sẽ đúc kết được nhiều kinh nghiệm để tạo ra những UI theo mong muốn. Fighting!
# Kết luận
* Như vậy là qua bài viết chúng ta đã tìm hiểu được cơ bản một vài các widget. Mình biết như vậy vẫn chưa đủ như thời lượng của bài viết có hạn nên không thể viết dài thêm. Hi vọng qua bài viết này các bạn có thể có được một cái nhìn tổng quan về những thứ cấu tạo ra UI của Flutter  cũng như có thể tạo ra được những UI đơn giản theo ý muốn của mình. 
* Trong các bài viết tiếp theo chúng ta sẽ tìm hiểu về Route - cách điều hướng đến các màn hình, vòng đời của Widget trong Flutter.
* Nếu bài viết giúp ích được cho bạn, đừng chần chừ mà để một upvote :satisfied: để mình có động lực hơn. Còn có điều gì chưa ổn hoặc cần thảo luận, hãy để nó dưới phần comment. Mỗi sự góp ý của bạn sẽ là mỗi kim chỉ nang để mình có thể viết ra những bài viết chất lượng hơn trong tương lai.
* Cảm ơn bạn đã đọc đến đây! Chào thân ái và hẹn gặp lại :wave: