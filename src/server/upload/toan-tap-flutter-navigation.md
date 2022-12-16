# Tổng quan

Flutter cung cấp widget Navigator để quản lý và thao tác với stack khi thực hiện điều hướng các màn hình.

![](https://images.viblo.asia/fd7ecd11-7fe2-4f05-a7e9-f34f44a04acb.jpeg)

Trong quá trình phát triển app mobile chúng ta sẽ có một số case điều hướng cơ bản cần phải xử lý như hình bên trên, hãy xem flutter hỗ trợ giải quyết các case điều hướng đó như thế nào nhé

## Note nhỏ

Navigator cung cấp 2 loại function là

```csharp:dart
Navigator.pushNamed(context, string)

Navigator.of(context).pushNamed(string)
```

hai cách gọi bên trên là tương đương và nếu bạn đọc source thì `Navigator.pushNamed(context, string)` là hàm static gọi đến `Navigator.pushNamed(context, string)`

# 1. push, pop

Hai hàm cơ bản nhất và hay sử dụng nhất khi thực hiện các thao tác navigation

## push

Thực hiện push widget vào stack của navigator, mỗi lần gọi hàm là một lần push widget vào stack

Gồm có 2 loại là:
- `push(context, route)`
- `pushNamed(context, string)`

### push(context, route) aka direct navigation

```javascript:dart
Navigator.push(
    context, MaterialPageRoute(builder: (context) => Screen1()));

// or

Navigator.push(
    context, MaterialPageRoute(builder: (context) {
    // do something
        return Screen1();
    }));
```

Cách này cho bạn kiểm soát tốt hơn việc khở tạo màn hình mới, giúp bạn có thể thực hiện thêm thao tác tiền xử lý, hoặc truyền param cho màn mới, ...

### pushNamed(context, string) with static navigation

```javascript:dart
class Routes {
  static final String screen1 = "/screen1";
  static final String screen2 = "/screen2";
}

MaterialApp(
    routes: {
        Routes.screen1: (context) => Screen1(),
        Routes.screen2: (context) => Screen2(),
    }
)

Navigator.pushNamed(context, Routes.screen1);
```

Bên trên là định nghĩa hết các name trong 1 class Routes, ngoài ra bạn có thể định nghĩa name trong cục bộ widget

```java:dart
class Screen1 extends StatelessWidget {
  static final String screen1 = "/screen1";
}
```

Cách này giúp bạn định nghĩa route ngắn gọn, nhưng bị giới hạn khi routeNamed sẽ trả về constructor cố định

### pushNamed(context, string) with dynamic navigation

Cách bên trên giới hạn chúng  ta ở việc linh động và ko thể custom construcotr của navigation thì sử dụng `onGenerateRoute` sẽ khắc phục các nhược điểm đó

```javascript:dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Screen1(),
      ),
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case Routes.screen2:
            return MaterialPageRoute(builder: (_) => Screen2());
            break;

          case Routes.screen3:
            return MaterialPageRoute(builder: (_) =>
                Screen3(
                    settings.arguments
                ));
            break;

          default:
            return MaterialPageRoute(builder: (_) => Screen1());
        }
      },
    );
  }
}
```

Các bạn có thể khai báo `initialRoute: name` thay vì khai báo `home: widget` trong `MaterialApp`

```go:dart
    return MaterialApp(
      initialRoute: Routes.screen1,
      onGenerateRoute: (settings) {
          ...
      },
```

## pop(context)

Thực hiện pop widget ở trên cùng của stack navigator, mỗi lần gọi là một lần pop cho đến khi stack hết widget.

```javascript:dart
Navigator.pop(context);
```

# 2. Truyền data từ A push B

Từ màn A, mở màn B và bạn muốn truyền thêm một vài thông tin thì có 2 cách để thực hiện:
- Truyền qua constructor của B
- Truyền qua argumments

## Truyền qua constructor

Để thực hiện cách này thì ở class A bạn sẽ cần phải dùng `push(context, route)`.

Ở bên class B thì chỉ cần gọi var là có giá tị

```markdown:dart
classs B {
    final String title;

    B({@require this.title});
}

class A {
    toB() {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => B('from A to B')));
    }
}
```

## Truyền qua arguments

Các hàm push có hỗ trợ optional param arguments đều hỗ trợ việc truyền data.

Các bạn có thể dùng `push(context, route, arguments)` hoặc `pushNamed(context, string, arguments)` để thực hiên truyền từ A. 

Tại B để nhận thì cần lấy ra từ arrguments.

```javascript:dart
class A {
    pushNamed(context, "/B", arguments: "from A to B");
}

class B {
    String args = ModalRoute.of(context).settings.arguments
}
```

**Lưu ý**: do arguments là một kiểu object nên khi muốn truyền nhiều loại data khác nhau thì cần phải tạo object wrap hết những type bạn cần truyền.

# 3. return data từ B về A

Để truyền dữ liệu từ B về A thì dùng `pop(context, result)` với param result là dữ liệu bạn muốn trả về.

Tại A, hàm push trả về future nên việc await hàm push sẽ nhận được dữ liệu từ B

```javascript:dart
class B {
    Navigator.pop(context, result);
}

class A {
    final result = await Navigator.push(B)
}
```

# 4. Các hàm push khác

Navigator còn có một số hàm push khác để cho những case cần custom flow navigation như sau:

- `pushAndRemoveUntuil / pushNamedAndRemoveUntil`
- `pushReplacement / pushReplacementNamed`
- `popAndPushNamed`

ở bên trên mình đã giải thích về `push/ pushNamed` nên dưới đây mình chỉ nói về ý nghĩa của các hàm này chứ không nói đến cách thức khác nhau nữa.

## pushAndRemoveUntil / pushNamedAndRemoveUntil (context, route/string, bool)

Thực hiện thêm widget vào stack và pop các widget trong stack cũ cho đến khi `bool == true`

Về mặt UI sẽ nhìn thấy enter animation của push widget mới vào.

```javascript:dart
Navigator.pushAndRemoveUntil(
    context,
    MaterialPageRoute(builder: (BuildContext context) => Screen1()),
    ModalRoute.withName('/first'),
);
```

Nếu bạn muốn pop hết các widget sẵn có trong stack thì có thể return false ở param bool

Use case: 
- Sau khi thực hiện các bước purchase, push màn status và pop hết các màn purchase
- Sau khi thực hiện các thao tác và nhấn logout, pop hết các màn và push login

## pushReplacement / pushReplacementNamed

Thực hiện push widget vào stack và pop widget hiện tại của stack

Về mặt UI sẽ nhìn thấy **enter animation** của push widget mới vào.

Use case:
- Từ màn splash mở màn Home
- Từ màn Login, login thành công mở màn Home

## popAndPushNamed

Thực hiện pop widget hiện tại của stack và push widget mới vào. Về ý nghĩa thì giống `pushReplacement`

Tuy nhiên về mặt UI  sẽ nhìn thấy **exit animation** của widget hiện tại bị pop

Use case:
- Khi thực hiện xem item list, mở filter, chọn và apply filter thì pop màn filter và push màn item list

# 5. Các hàm pop khác

Navigator còn có một số hàm pop khác để cho những case cần custom flow navigation như sau:

- popUntil
- canPop
- maybePop

Chúng ta cùng đi vào từng loại nhé

## popUntil(bool)

Hàm này dễ hiểu rồi, pop widget trong stack cho đến khi `bool == true`

## canPop

return false nếu đây là widget đầu tiên trong navigator stack, hay stack size = 1. Nếu stack size > 1 thì return true.

## maybePop = if(canPop) pop

Nếu stack size lớn hơn 1 thì mới thực hiện pop còn không thì thôi

# 6. Các hàm khác
Các hàm sau của Navigator đều cần param route ( route = MaterialPagedRoute(builder: )). Nên để thực hiện thì bạn cần có refer đến route tương ứng mà muốn gọi hàm. 

Hiện tại chưa thể get stack của navigator nên việc này sẽ hơi rắc rối một chút.

- `replaceRoute (context, oldRoute, newRoute)`
- `replaceRouteBelow (context, anchorRoute, newRoute)`
- `removeRoute (context, route)`
- `removeRouteBelow (context, anchorRoute)`

## replaceRoute (context, oldRoute, newRoute)

replace oldROute trong stack bằng newRoute

## replaceRouteBelow (context, anchorRoute, newRoute)

replace route ngay dưới anchorRoute trong stack bằng newRoute

## removeRoute (context, route)

remove route trong stack

## removeRouteBelow (context, anchorRoute)

remove route ngay dưới anchorRoute trong stack

# 7. ModalRoute

ModalRoute có nhiều hàm tiện ích các bạn có thể dọc thêm và sử dụng, ở đây mình sẽ chỉ giới thiệu một số ví dụ

## get arguments

Như bên đã giới thiệu thì khi truyền arguments từ A sang B thì để get arguments ở B chúng ta cần dùng ModalRoute

```javascript:dart
final String args = ModalRoute.of(context).settings.arguments;
```

## get name

Để get name của route hiện tại chúng ta sử dụng `ModalRoute`

```javascript:dart
final name = ModalRoute.of(context).settings.name;
```

## so sánh route name

```sql:dart
bool = ModalRoute.withName(string);
```

# 8. handle back button

Back button mặc định sẽ pop mà không phải lúc nào bạn cũng muốn như vậy nên việc custom lại hành vi khi click back button là rất thường gặp và trong Flutter chúng ta sẽ làm như sau

```rust:dart
@override
Widget build(BuildContext context) {
  return WillPopScope(
    onWillPop: _onBackPressed, // function here
    child: Scaffold(
      body: Center(
        child: Text("Home"),
      ),
    ),
  );
}
```

# Kết

Bài này mình đã giới thiệu tới các bạn về widget Navigator trong Flutter để xử lý các tác vụ navigation. Tùy theo yêu cầu cụ thể khi phát triển mà bạn sẽ chọn cho mình phương án phù hợp nhất.