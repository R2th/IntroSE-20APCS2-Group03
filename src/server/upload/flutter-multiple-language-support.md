# Giới thiệu
Việc hỗ trợ multiple language trong lập trình mobile có lẽ là một trong những điều bắt buộc với hầu hết các ứng dụng. Để mở rộng thị trường cũng như lượng user thì tối thiểu chúng ta cũng phải support english language bên cạnh language chính của app (phụ thuộc vào quốc gia mục tiêu). 

Đối với Flutter việc triển khai multiple language cũng hết sức đơn giản với sự hỗ trợ của các Plugin. Ở đây mình sẽ sử dụng Plugin Flutter Intl. Plugin này thì có mặt trên cả hai IDE là Android Studio và Visual Studio các bạn có thể vào Marketplace dể tải về nhé. 

Link ở đây : https://plugins.jetbrains.com/plugin/13666-flutter-intl

![](https://images.viblo.asia/85de8305-ece9-426d-8fdc-0ee9610a950d.png)

# Tiến hành
Ở đây mình sẽ hướng dẫn trên android studio vì mình hiện tại đang dùng nó

1. Đầu tiên là cài Plugin phía trên nhé
2. Sau khi cài xong thì các bạn tạo một Flutter project như thông thường


![](https://images.viblo.asia/6b6b54e3-763d-4f40-bc58-ecd769d56e99.png)

3. Sau khi tạo project xong. Trên thanh công cụ android studio bạn chọn **Tools -> Flutter Intl -> Initialize for the Project**  để plugin tiến hành generate ra các file cần thiết nhé

![](https://images.viblo.asia/2e9b8861-c51c-4d83-9a97-85e92aa4bba8.png)

4. Lúc này chạy xong sẽ xuất hiện hai folder mới trong folder **lib**, Là **l10n** và **generated**. Bạn không nên sửa đổi bất kỳ file nào trong thư mục **generated** nhé. Trong thư mục **l10n** sẽ có file **intl_en.arb**  đây chính là file chứa string cho ngôn ngữ en  nhé. mặc định khi run xong ngôn ngữ en sẽ được genrated tự động
5. Để add thêm một language mới các bạn tiếp tục chọn **Tools -> Flutter Intl -> Add locale** rồi nhập tên viết tắt của language đó rồi bấm add. Lúc này trong thư mục **l10n** sẽ tạo thêm một file mới tên là  **intl_vi.arb** . Ở đây mình add thêm ngôn ngữ Việt Nam nên sẽ có đuôi vi ở phía sau chính là ký tự viết tắt của tiếng Việt
6. Setup App widget để có thể support multipe language

```
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      localizationsDelegates: [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```
7. Bước tiếp theo là add String resrouce vào file arb trương ứng của mỗi ngôn ngữ
**intl_en.arb**
```
{
  "hello": "Hello everybody"
}
```
**intl_vi.arb**
```
{
  "hello": "Xin chào tất cả các b"
}
```
8. Lúc này các file trong thư mục generated sẽ được update tự động để thêm các string resoure mới. Về cớ chế hoạt động của các file này mình sẽ không đi sâu trong bài post này và hẹn ở một bài post sau.
9. Sử dụng. Mình sẽ set tille cho trang HomePage 

    Có hai cách sử dụng

*     S.of(context).hello
*     S.current.pageHomeConfirm
```
 @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(S.of(context).hello),
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
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
```
10. Cùng run thử app xem sao nhé

**English**

![](https://images.viblo.asia/0205247f-6e7a-4742-a1bf-16c6bdc1e94f.png)


**Tiếng Việt**

![](https://images.viblo.asia/cd1abe64-30da-41d6-b67b-a2c63ce8d217.png)
## Chúc các bạn thành công