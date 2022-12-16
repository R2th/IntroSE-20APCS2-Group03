Chào các bạn, trong bài viết này chúng ta sẽ cùng tìm hiểu một số Packages trong Flutter giúp UI trở nên bắt mắt và thân thiện với người dùng hơn. 

Với mỗi package được giới thiệu sẽ có code sample đi kèm, demo thực hiện, cùng đường dẫn trực tiếp đến trang chủ để các bạn có thể tìm hiểu, nào cùng bắt đầu thôi.
### 1. styled_widget 
styled_widget được xây dựng như một công cụ để nâng cao trải nghiệm phát triển Flutter và có thể tích hợp liền mạch với codebase của bạn.

Code Sample :
```
Icon(OMIcons.home, color: Colors.white)
  .padding(all: 10)
  .decorated(color: Color(0xff7AC1E7), shape: BoxShape.circle)
  .padding(all: 15)
  .decorated(color: Color(0xffE8F2F7), shape: BoxShape.circle)
  .padding(all: 20)
  .card(
    elevation: 10,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
  )
  .alignment(Alignment.center)
  .backgroundColor(Color(0xffEBECF1));
```
Showcase :
![](https://images.viblo.asia/41077857-b8d8-4490-8c86-54638a2cc6e5.gif)

![](https://images.viblo.asia/9ca9f15b-8569-4313-af02-05590d50edf9.gif)

![](https://images.viblo.asia/60305060-842d-485c-bf49-f93f0a3650e9.gif)

URL: https://pub.dev/packages/styled_widget 
### 2. flui
Đây là một UI framework mạnh mẽ cho Google Flutter với rất nhiều component để các bạn sử dụng.

Code Sample :
```
FLAppBarTitle(
    title: 'AppBar',
    subtitle: '(subtitle)',
    layout: FLAppBarTitleLayout.vertical,
    showLoading: true
)
``` 
Showcase :
![](https://images.viblo.asia/3a0e5883-e4f9-4e4d-bea4-f90b17e1c029.png)

URL: https://pub.dev/packages/flui

### 3. flutter_screenutil
Đây là một plugin cho phép điều chỉnh kích thước màn hình và phông chữ. Hãy để giao diện người dùng của bạn hiển thị một bố cục hợp lý trên các kích thước màn hình khác nhau!

Code Sample :
```
ScreenUtilInit(
      designSize: Size(360, 690),
      builder: () => MaterialApp(
        ...
        theme: ThemeData(
                          primarySwatch: Colors.blue,
                          textTheme: TextTheme(
                            button: TextStyle(fontSize: 45.sp)
                          ),
                        ),
      ),
    )
```

Showcase :

![](https://images.viblo.asia/41a7bca4-4ebc-4aca-b233-97b25754e57f.png)

URL: https://pub.dev/packages/flutter_screenutil 
### 4. responsive_framework
Tiếp tục với một package tuyệt vời là Responsive Framework đáp ứng tự động điều chỉnh giao diện người dùng của bạn với các kích thước màn hình khác nhau.

Tạo giao diện người dùng của bạn một lần và hiển thị pixel hoàn hảo trên thiết bị di động, máy tính bảng và máy tính để bàn!

Code Sample :
```
MaterialApp(
      builder: (context, widget) => ResponsiveWrapper.builder(
          child,
          maxWidth: 1200,
          minWidth: 480,
          defaultScale: true,
          breakpoints: [
            ResponsiveBreakpoint.resize(480, name: MOBILE),
            ResponsiveBreakpoint.autoScale(800, name: TABLET),
            ResponsiveBreakpoint.resize(1000, name: DESKTOP),
          ],
          background: Container(color: Color(0xFFF5F5F5))),
      initialRoute: "/",
    )
```

Showcase :
![](https://images.viblo.asia/b9e8adeb-e363-402d-8412-c1a7a8ef9145.PNG)
![](https://images.viblo.asia/c168564b-de30-4ca4-b487-cd3983bc3ec6.PNG)

URL: https://pub.dev/packages/responsive_framework
### 5. flutter_neumorphic
Cuối cùng sẽ là bộ UI Neumorphic hoàn chỉnh, sẵn sàng sử dụng cho Flutter

Code Sample :

```
Neumorphic(
  style: NeumorphicStyle(
    shape: NeumorphicShape.concave,
    boxShape: NeumorphicBoxShape.roundRect(BorderRadius.circular(12)), 
    depth: 8,
    lightSource: LightSource.topLeft,
    color: Colors.grey
  ),
  child: ...
)
```

Showcase :

![](https://images.viblo.asia/ab967c7e-450f-40d3-ac71-09e2b279cd6c.gif)

URL: https://pub.dev/packages/flutter_neumorphic
### 6. conclusion
Trên đây là một số packages hỗ trợ phát triển UI Flutter hiệu quả và mạnh mẽ, giúp chúng ta xây dựng các ứng dụng bắt mắt và thân thiện với người dùng, hy vọng các bạn có thể chọn được package phù hợp cho riêng mình.

Ngoài các packages hỗ trợ phát triển UI đã được giới thiệu trong bài viết, các bạn cũng có thể tìm hiểu thêm Top các packages mạnh mẽ khác giúp phát triển Flutter tuyệt vời hơn, được cộng đồng yêu thích ở bài viết [này](https://viblo.asia/p/top-10-trending-flutter-packages-in-2021-maGK76WM5j2)

Cảm ơn các bạn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết tiếp theo.

Bài viết có tham khảo: [nguồn](https://medium0.com/@mirsaiddev/use-these-dart-flutter-packages-for-more-beautiful-uis-f3a7787d7ac9?source=email-f45629ee1623-1630957797798-digest.reader-86fb29d7cc6a-f3a7787d7ac9----2-71------------------975cb8a8_f51b_4020_9736_b5fe65589e1f-27-50846b47_38f7_4830_a7d1_0584790d4ae4)