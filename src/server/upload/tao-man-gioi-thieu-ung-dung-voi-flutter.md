Hầu hết các ứng dụng hiện nay đều có một màn hình giới thiệu, nó chỉ được mở lên khi ứng dụng được khởi chạy lần đầu tiên. Điều này được sử dụng để cung cấp cho người dùng ý tưởng về nội dung của ứng dụng, cách sử dụng ứng dụng hoặc chỉ để chào hỏi người dùng.
Làm điều này là một nhiệm vụ không khó đối với các nhà phát triển trung cấp nhưng đối với các newbies, nó có vẻ là một nhiệm vụ khó khăn để có được kết quả mong muốn.
Đừng lo lắng, tôi đã thực hiện việc lướt web thay cho bạn và cuối cùng, bạn sẽ có màn hình giới thiệu một lần của riêng mình cho ứng dụng của bạn !!
Bài viết này giả định rằng bạn đã cài đặt Flagship và đã quen thuộc với các tuyến push. Vì vậy, không cần giới thiệu thêm, chúng ta hãy bắt đầu !!
# 1. Lý thuyết

Trước khi đi sâu vào mã, tôi muốn cho mọi người biết chúng tôi sẽ làm gì.
Bất cứ khi nào người dùng cài đặt ứng dụng lần đầu tiên, chúng tôi sẽ  thị màn hình giới thiệu về ứng dụng (sử dụng cách này là một phương pháp hay vì bạn có thể hiển thị trình tải thay vì màn hình trắng trong khi bạn đang tìm nạp dữ liệu hoặc thực hiện một số bước ban đầu để thiết lập ứng dụng) sẽ lưu trữ một boolean 'đã thấy' trong bộ nhớ cục bộ của thiết bị và đặt giá trị của nó thành true sau khi thực hiện việc này, nó sẽ quyết định có hiển thị màn giới thiệu hay không.
Giờ đây, bất cứ khi nào người dùng mở ứng dụng, chúng tôi sẽ kiểm tra giá trị của từ ‘saw’ và đúng như vậy, chúng tôi sẽ không đẩy đến màn hình giới thiệu !!! (Khi người dùng xóa bộ nhớ của ứng dụng, màn hình giới thiệu sẽ được đẩy vào thời điểm khởi động vì thuộc tính "saw" sẽ bị xóa)
Để truy cập bộ nhớ cục bộ của thiết bị, chúng tôi sẽ sử dụng shared_preferences, đây là cách tiêu chuẩn hóa để truy cập bộ nhớ của thiết bị bằng cách sử dụng flaming.
Đơn giản phải không? Ohk, chúng ta hãy chuyển sang mã !!

# 2 Coding
Đây là tiện ích MaterialApp của chúng tôi, ở đây chúng tôi đã định nghĩa InitialRoute là SplashScreen.id (được định nghĩa là một biến tĩnh trong SplashScreen.dart), đây là màn hình đầu tiên sẽ được  thị khi ứng dụng tải và nó sẽ quyết định sẽ đi tới màn hình nào tiếp theo và tìm nạp dữ liệu và kiểm tra ủy quyền !!
```
Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.light().copyWith(
          primaryColor: Colors.amberAccent, buttonColor: Colors.black),
      initialRoute: SplashScreen.id,
      routes: {
        IntroScreen.id: (context) => IntroScreen(),
        SplashScreen.id: (context) => SplashScreen(),
        WelcomeScreen.id: (context) => WelcomeScreen(),
        ChatScreen.id: (context) => ChatScreen(),
        LoginScreen.id: (context) => LoginScreen(),
        RegistrationScreen.id: (context) => RegistrationScreen()
      },
    );
  }
```
Trong tiện ích SplashScreen, chúng ta có hai phương thức checkFirstScreen và _handleStartScreen. Cái sau được gọi trong initState, sau đó gọi hàm cũ sau khi kiểm tra xem bool có tồn tại hay không.

```
class SplashScreen extends StatefulWidget {
  static const String id = "/splashScreen";
  @override
  _Splash createState() => _Splash();
}

class _Splash extends State<SplashScreen> {
  Future checkFirstSeen() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool _seen = (prefs.getBool('seen') ?? false);

    if (_seen) {
      _handleStartScreen();
    } else {
      await prefs.setBool('seen', true);
      Navigator.pushNamed(context, IntroScreen.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    checkFirstSeen();
  }

  Future<void> _handleStartScreen() async {
    Auth _auth = Auth();

    if (await _auth.isLoggedIn()) {
      Navigator.popAndPushNamed(context, ChatScreen.id);
    } else {
      Navigator.popAndPushNamed(context, WelcomeScreen.id);
    }
  }
}
```

Trong khi initState đang thực hiện nhiệm vụ kiểm tra trạng thái xác thực và quyết định có hiển thị IntroScreen hay không, chúng tôi hiển thị CircularProgressIndicator thay vì màn hình trắng, điều này giúp cải thiện trải nghiệm người dùng.

Như vậy ban đã có màn intro của riêng mình rồi !!!