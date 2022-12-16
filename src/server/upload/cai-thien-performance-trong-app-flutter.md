Flutter đã có cơ chế tối ưu cho Performance  vẽ giao diện cho app , nhưng nếu chúng ta để ý thêm thì có thể tránh những việc rebuild không cần thiết. Bài viết dựa trên kinh nghiệm thực tế và tìm hiểu  của mình , nếu có gì sai sót / bổ sung thì hãy cmt bên dưới giúp mình!
   
  Trước tiên về mặt giao diện , đa số các app hoạt động trong môi trường 60fps(1 số game yêu cầu 120fps thì cần máy cấu hình cao hơn). Với 60fps thì mắt có thể cảm nhận giao diện được hiển thị lên khá là ok. Với 60fps, tức là vẽ được 60frame / 1 s => 1 frame cần cỡ 0.0167s để được vẽ. Nếu mất nhiều thời gian hơn thì cảm giác ứng dụng chạy chậm , 1 trong những nguyên nhân dẫn tới điều  này là rebuild nhiều widget hoặc chạy  những task nặng.  Dưới đây là các cách mình hay dùng để hạn chế điều này. 
 
###  1. Dùng const. Chỗ nào dùng được thì dùng 
 Giống như việc cache , const constructor hạn chế việc rebuild , trên thực tế đa số widget không bị rebuild ngoại trừ widget dc wrap từ InhertWidget. Lấy vị dụ từ app mẫu được tạo khi chúng ta create 1 project mới: 
```
  ...
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), 
    );
  }
}
```
Khi ấn floatingActionButton sẽ chạy hàm setState, nó rẽ rebuild lại toàn bộ state là MyHomePage, từ Scaffold, AppBar, title AppBar, Center, Column, Text child in column, FloatingActionButton.  Nhưng để ý     Text( 'You have pushed the button this many times:'  ), là 1 widget không đổi, xác định được trước khi compiler , nếu chuyển thành
```
children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
```
 thì dù rebuild lại state thì widget Text trên sẽ không bị rebuild. Bạn có thể check trong tab Flutter Performance.  Để có thể const Constructor thì class cần thoả mãn điều kiện sau: <br>
 +  các filed là final 
 + constructor trong class là const 
 + các param được truyền vào là const. (title trong appBar là Text(widget.title) không thoả mãn điều kiện này nên không thể dùng const được).

Đa số các widget trong Flutter đều được constructor là const , nếu không được constructor là const ví dụ như Container thì có thể chuyển thành Sizedbox, Align, Padding (khi không cần dùng những đặc tính chỉ có ở Container).

Do Flutter có cơ chế vễ giao diện đã rất tối ưu , như ví dụ trên không dùng const sẽ khiến rebuild lại Widet, nhưng việc tạo widget là task nhẹ, dù có rebuild cũng không ảnh hưởng lắm , thực tế mặt sau của widget tree là Element tree, việc rebuild element tree mới là task nặng, nhưng trong trường hợp trên thì dùng const hay không dùng const cũng không khiến Element tree rebuild lại do nó check các object child  là các widget không đổi nên không rebuild. Dẫu vậy dùng const vẫn tối ưu hơn, trong document cũng nói đến điều này: 

https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html#performance-considerations
> Use const widgets where possible. (This is equivalent to caching a widget and re-using it.)

### 2. Đẩy state xuống càng sâu càng tốt
Ví dụ  project default , khi hàm _increment() được gọi nó sẽ chạy hàm setState() rebuil d lại toàn bộ _MyHomePageState.  Thực tế những phần cần thao tác và thay đổi chỉ là Column và floatingActionButton, nên nếu tách 2 phần này thành 1 statefulWidget mới và chuyển MyHomePage thành statelessWidget thì sẽ không bị rebuild Scaffold, AppBar, Center .Do floattingActionButton chỉ thuộc Scaffold nên có thể chuyển thành FlatButton/ RaisedButton .

hoặc đơn giản hơn là dùng StreamBuilder. 
```
class _MyHomePageState extends State<MyHomePage> {
  final StreamController<int> _streamController = StreamController();
  int _counter = 0;

  void _incrementCounter() {
    _counter++;
    _streamController.add(_counter);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            StreamBuilder<int>(
                stream: _streamController.stream,
                initialData: 0,
                builder: (context, snapshot) {
                  return Text(
                    '${snapshot.data}',
                    style: Theme.of(context).textTheme.headline4,
                  );
                }),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}

```

Wrap Text cần thay đổi vào StreamBuilder. hàm _icrement thay vì gọi setState chuyển thành add value vào streamController. Với việc thay đổi này thì mỗi khi press vào button thì chỉ rebuild lại StreamBuilder và Text in StreamBuilder.<br>
Trong 1 WidgetTree , nếu 1 phần là mutable(thực ra Widget là immutable, Element mới là mutable  ) thì hãy tạo 1 subtree từ phần đó , để tránh việc rebuild thì rebuil toàn bộ state cha , khi setState nó chỉ rebuild state của subtree đó.

### 3. Hạn chế thay đổi kết cấu của Widget tree.

```
A : return isIgnor
       ?IgnorePointer(
          ignoring: true, 
          child: GestureDetector(
          onTap: (){
                  ...
                 }
            child: Container(),
          ),
        )
      :GestureDetector(
           onTap: (){
              ...
             }
           child: Container(),
              ),
             );
             
  B: return IgnorePointer(
          ignoring: _ignoring,
           child: GestureDetector(
          onTap: (){
                  ...
                 }
            child: Container(),
          ),
  );           
```

or 
```
return isTransparent
  ? Opacity(opacity: 0, child: Text('Hello'))
  : Text('Hello')

return Opacity(
  opacity: isTransparent ? 0 : 1,
  child: Text('Hello'),
)
```

Cả 2 ví dụ trên đều có logic xử lý và hiển thị giống nhau, nhưng B sẽ tốt hơn A.  Cả 2 sẽ đều rebuild Widget Tree , nhưng B sẽ không bị rebuild Element tree, còn A sẽ bị rebuild Element Tree , điều đó dẫn đến RenderObject tree cũng sẽ bị rebuild lại. Widget thì chỉ lưu state chứ không quản lí state mà chỉ có Element quản lý state, do đó rebuild lại Element tree sẽ nặng hơn nhiều so với widget tree (thực chất element là trung gian kết nối giữa Widget và RenderObject ).

### 4. Tránh lạm dụng BuildContext, nếu phải lắng nghe sự thay đổi thì hãy giới hạn ở context nhỏ nhất có thể. 
    
    Đây là 1 vấn đề từng khiến mình bất ngờ  khi chỉ 1 thay đổi nhỏ khiến toàn bộ Page rebuild lại. 
 Hiện tại chúng ta hay dùng Provider + ChangeNotifier / Bloc pattern để quản lý state (Ngoài ra thì còn có Redux, Mobx) . Hiện tại thì mình thích  dùng Provider + StateNotifier  (+ freezed).
 
 Provider  kế thừa từ InhertWidget. Ưu điểm của InhertWidget là có thể truy cập,   tới InhertWidet gần nhất, và chỉ khi cần thiết báo cho những  Widget  nhất định đã chỉ định lắng nghe để rebuild  khi có sự thay đổi. Đặc điểm thứ 2 khiến mình bất ngờ khi cả state  với các task nặng  của Page được rebuild lại. Cấu trúc như sau: 
```
       ChangeNotifierProvider<Profile> {
                 create: (context) => Profile()
                 child: UpdateProfile(
                               .... 
                       ),
                }
                
 class UpdateProfile extends StatefulWidget {
                        ...
                        }
 class _UpdateProfileState extends State<UpdateProfile> {                       ...
   @override
  Widget build(BuildContext context) {
 
    return Scaffold(
            body: Column(
                    children:<Widget> [
                            WidgetA(),
                            WidgetB(child: Text('${Provider.of<Profile>(context).name}')),
                    ], 
                            WidgetC(),
                            .....
                            WidgetX(
                                        child: Column(
                                        child: Text(),
                                        ),
                                    child: Button(
                                    onPressed: () {
                                        Provider.of<Profile>(context. listen: false).addName(name);
                                    }
                                    ),
                            ),
            ),
    );
 

}
        
```

Khi name được thay đổi thì theo dự kiến chỉ WidgetB  với child là Text lắng nghe name từ Profile được thay đổi, nhưng cả WidgetA, B , C , ... đều bị rebuild. Khá bất ngờ , nhưng khi nhìn  lại thì vấn đề là sử dụng context ở Text('${Provider.of<Profile>(context).name}')  là context của hàm build ,tức là nó chính là _UpdateProfileState.Khi lắng nghe từ context này đồng nghĩ với việc khi instance của Profile được truyền từ trên xuống có sự thay đổi thì cả context này sẽ rebuild lại tức là rebuild lại toàn bộ _UpdateProfileState. Để fix điều này chỉ cần wrap Text(${Provider.of<Profile>(context).name}') vào Widget Consumer từ package provider là được. hoặc wrap vào Widget Builder cũng dc. Cả 2 Widget này cấp context của chính nó cho context được lắng nghe trong Text, nên sẽ không bị rebuild các Widget khác.
    
    
 Kết: Trên  là các cách chủ yếu  mà mình hay dùng để hạn chế việc rebuild.