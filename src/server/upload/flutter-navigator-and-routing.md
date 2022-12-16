# Giới thiệu
Các ứng dụng di động thường được hiển thị dưới dạng Full-screen thường được gọi là "screens" hoặc "pages". Trong Flutter, chúng được gọi là các routes và được quản lý bởi Navigator widget.  Navigator giữ stack các route và cung cấp các method để quản lý stack đó như: Navigator.push và Navigator.pop

Hôm nay mình sẽ giới thiệu với các bạn, các cách cơ bản để điều hướng giữa các màn hình trong Flutter

![](https://images.viblo.asia/15e4b117-1546-4c3d-8864-d8882b65308a.png)


# Tìm hiểu các khái niệm
1. **Route**: Route là một abstraction của một màn hình ("screen", "page")  của ứng dụng. Navigator là một widget chịu trách nhệm quản lý các route đó
2. **Navigator**: Nhiệm vụ của Navigator là tạo một Widget để lưu trữ, duy trì một stack-based lịch sử các child widget. Navigator có thể push hoặc pop một route để giúp người dùng duy chuyển giữa các màn hình khác nhau
3. **Material Page Route**: Là một modal route cung cấp cái hiệu ứng chuyển trang tương thích với từng nền tảng khác nhau (android & ios) 



Để hiểu hơn về các khái niệm và cách triển khai bạn có thể xem video dưới đây

{@embed: https://www.youtube.com/embed/JP54-SQ66UI}

# Simple Routing

Đây là cách cơ bản nhất  để điều hướng giữa các màn hình trong Flutter, đó là dùng method **Navigator.push** để đến màn hình mới và **Navigator.pop** để back lại màn hình trước đó 

Method Navigator.push nhận vào 2 tham số (BuildContext, Route<T>)  . Ở đây chúng ta sẽ sử dụng MaterialPageRoute để thay thế hiệu ứng chuyển cảnh với hiệu ứng của từng nền tảng (platform-adaptive transition)
    
```
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: HomePage(),
  ));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Route route = MaterialPageRoute(builder: (context) => SecondHome());
            Navigator.push(context, route);
          },
          child: Text('Second Home'),
        ),
      ),
    );
  }
}

class SecondHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Hoem'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go Back'),
        ),
      ),
    );
  }
}
```
    
#     Named Routing
    
Một cách khách đó là sử dụng Navigator.pushNamed để navigate tới màn hình mới và Navigator.pop để back về màn hình trước .
    
Navigator.pushNamed nhận vào tối thiểu 2 tham số (BuildContext, String,{Object}) và một tùy chọn Argument. String ở đây chính là tên chúng ta định nghĩa cho từng route

 Trong trường hợp này, chúng ta sẽ không sử dụng MaterialPageRoute, điều đó khiến cho hiệu ứng chuyển cảnh không được áp dụng với từng nền tảng
    
```
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: <String, WidgetBuilder>{
      '/': (context) => HomePage(),
      '/second': (context) => SecondHome(),
    },
  ));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/second');
          },
          child: Text('Second Home'),
        ),
      ),
    );
  }
}

class SecondHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Home'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go Back'),
        ),
      ),
    );
  }
}
```
    
Nếu bạn muốn hiển thị Page NotFound khi một route name không hợp lệ được push thì config onUnknownRoute
    
```
MaterialApp(
  home: SecondHome(),
  routes: <String, WidgetBuilder>{
    '/home': (context) => HomePage(),
    '/second': (context) => SecondHome(),
  },
  onUnknownRoute: (RouteSettings setting) {
    # To can ask the RouterSettings for unknown router name.
    String unknownRoute = setting.name ;
    return new MaterialPageRoute(
                builder: (context) => NotFoundPage()
    );
  }
),
```
    
#     onGenerateRoute
    
    
 MaterialPageRoute không được sử dụng trong Named Route nên việc modify transition animation là không thể. Trong trường hợp này chúng ta sẽ sử dụng onGenerateRoute
 
 ```
MaterialApp(
  home: SecondPage(),
  onGenerateRoute: (RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (context)=> HomePage());
        break;
      case '/second':
        return MaterialPageRoute(builder: (context)=> SecondPage());
        break;
    }
  },
),
 ```
Cách sử dụng như sau
    
 ```
    import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: HomePage(),
      onGenerateRoute: (RouteSettings settings) {
        switch (settings.name) {
          case '/':
            return SlideRightRoute(widget:HomePage());
            break;
          case '/second':
            return SlideRightRoute(widget:SecondHome());
            break;
        }
      },
    ),
  );
}
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/second');
          },
          child: Text('Second Home'),
        ),
      ),
    );
  }
}
class SecondHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Home'),
      ),
      body: new Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go Back'),
        ),
      ),
    );
  }
}

class SlideRightRoute extends PageRouteBuilder {
  final Widget widget;
  AppSlideRightRoute({this.widget})
      : super(
    pageBuilder: (BuildContext context, Animation<double> animation,
        Animation<double> secondaryAnimation) {
      return widget;
    },
    transitionsBuilder: (BuildContext context,
        Animation<double> animation,
        Animation<double> secondaryAnimation,
        Widget child) {
      return new SlideTransition(
        position: new Tween<Offset>(
          begin: const Offset(1.0, 0.0),
          end: Offset.zero,
        ).animate(animation),
        child: child,
      );
    },
  );
}
  ```
    
Nguồn tham khảo: https://blog.usejournal.com/flutter-advance-routing-and-navigator-df0f86f0974f