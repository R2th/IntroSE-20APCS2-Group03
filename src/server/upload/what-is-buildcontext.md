1 bài viết ngắn.<br>
BuildContext là gì , tại sao lại cần có. Nếu bạn chỉ hiểu mang máng  thì bài này sẽ giúp bạn hiểu rõ.
Theo tài liệu: 
> A handle to the location of a widget in the widget tree.
> ....
> BuildContext objects are actually Element objects. The BuildContext interface is used to discourage direct manipulation of Element objects.
> 
Dịch: Để xác định vị trí của wiget trong widget tree. BuildContext thực chất là Element object. Dùng nó để tránh phải thao tác trực tiếp tới Element object. ( Trong Flutter chúng ta chỉ làm việc trực tiếp với Widget tree chứ không trực tiếp với Element tree và Render object tree).

Trước tiên thử print xem nó ra cái gì. Trong project default dc tạo, vào hàm build của MyApp() , print thử .
```
class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    print(context);
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(

        primarySwatch: Colors.blue,

        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```
Kết quả: 
> flutter: MyApp(dirty)
> 
Sao lại ra "MyApp"? Do MyApp kế thừa từ StetelessWidget nên thử vào Declaration . Đây là đoạn mã
```
abstract class StatelessWidget extends Widget {
  const StatelessWidget({ Key key }) : super(key: key);

  @override
  StatelessElement createElement() => StatelessElement(this);

  @protected
  Widget build(BuildContext context);
}

```

trong StatelessWidget , hàm createElement() tạo ra StatelessElement , truyền vào this tức là truyền vào chính nó (StatelessWidget - trong trường hợp này là Mypp ). Check declaration của StatelessElement đây là mã: 
```
class StatelessElement extends ComponentElement {
  /// Creates an element that uses the given widget as its configuration.
  StatelessElement(StatelessWidget widget) : super(widget);

  @override
  StatelessWidget get widget => super.widget as StatelessWidget;

  @override
  Widget build() => widget.build(this);

  @override
  void update(StatelessWidget newWidget) {
    super.update(newWidget);
    assert(widget == newWidget);
    _dirty = true;
    rebuild();
  }
}

``` 

ở hàm build() , nó chạy hàm build của chính widget tạo ra nó , trong trường hợp này là MyApp  => widget.build(this) chính là Myapp.build(this). this ở đây là StatelessElement cũng chính là MyAppElement . 
Đến đây thì bạn đã hiểu vì sao nó lại print ra là "MyApp(dirty)". Đây là Element object của widget MyApp.

Kết luận:  BuildContext chính là Element(Widget) cha

1 số lỗi hay gặp như  khi bạn dùng BuildContext trong showDialog , dùng data từ Dialog để hiển thị ở 1 chỗ khác không có cùng nhánh BuildContext,  hoặc Scaffold.of(context).showSnackBar  mà context được truyền ở đây lại là context từ widget cha không chứa Scafffold sẽ dẫn đến lỗi.