# Lời mở đầu
Gần đây, Flutter nổi lên và được Google PR như một xu thế của lập trình di động vậy. Với bản tính say mê gái, á nhầm mê lập trình như mình thì không thể không khám phá cô em này được. Sau một thời gian tìm hiểu và làm việc với ẻm, thì thú thật là em nó phê lắm các cụ ạ. Đồ ngon thì phải có bạn hiền, sau một giây suy nghĩ, một tia sáng lóe lên như mặt trời chân lý chói qua tim rằng mình phải viết một series chia sẻ về Flutter. Series này đã ra đời như thế đó :D
# 1. Chuẩn bị hành trang cưa cẩm nàng
Có 2 con đường để code Flutter. Một là sử dụng Web Editor: https://dartpad.dev/flutter . Con đường này tuy nhanh gọn, không cần cài đặt gì cả, vào là chiến luôn nhưng món mỳ ăn liền đó không được ngon như sài IDE. Vì IDE compiler nó tốt hơn, mượt hơn, nó còn hỗ trợ các tool như Hot Reload, Debug,... và bạn cũng có thể cài đặt thêm nhiều plugin vào IDE để hỗ trợ việc code nhanh hơn rất nhiều. Có rất nhiều IDE support code flutter như VS Code, Android Studio,... Ở đây mình sử dụng Android Studio để code. Bạn có thể tham khảo bài viết này 

Về phần cài đặt thì có rất nhiều bài viết chia sẻ hướng dẫn cài đặt. Nếu bạn cũng chọn Android Studio thì tham khảo cách cài đặt IDE, Plugin và Fluter SDK từ bài viết này: [Set-up môi trường lập trình Flutter](https://viblo.asia/p/hoc-flutter-phan-1-tao-ung-dung-dau-tien-hello-world-RnB5pMADKPG#_1-set-up-moi-truong-2). Sẽ chẳng có lý do gì để phải viết lại phần này khi đã có 1 bài chia sẻ cực kỳ chi tiết từ một bạn đồng nghiệp của mình. Đã xin phép tác giả :D

# 2. Đôi nét về nàng Flutter
1. Flutter là một framework giúp chúng tạo 1 ứng dụng chạy trên nhiều platform như Web, android, ios và tương lai còn có cả desktop như Window, MacOS và Linux nữa (đang phát triển).
2. Sử dụng ngôn ngữ lập trình Dart
3. Được giới thiệu năm 2018
4. Được phát triển và hỗ trợ bởi Google
5. Là Fast Development vì code 1 mà được cả đống: web app, android app, ios app,... thì chả nhanh
6. Performance tốt hơn các tiền bối đã ra mắt sớm hơn như: Xamarin (2011 by Microsoft), React Native (2015 by Facebook),... 
# 3. Thân hình quyến rũ của nàng
Ngay sau khi tạo project đầu tiên, các bạn sẽ thấy cấu trúc của một project Flutter như sau:

![](https://images.viblo.asia/be201ce9-96f0-49fd-8606-25699986da7d.PNG)

Có gì hot trong ảnh trên:
1. Folder quan trọng nhất là folder `lib`, trong đó Flutter có tạo sẵn cho chúng ta 1 file source code là `main.dart`. Đây cũng chính là nơi chúng ta tạo các file `.dart` và viết code.
2. Hai folder là `android` và `ios`. Đây là thư mục source của từng platform android và ios. Đa số là bạn không cần dùng đến, tuy nhiên cũng sẽ có những tính năng mà flutter không support được mà buộc bạn phải vào đây viết `native code`, android thì sử dụng Java hoặc Kotlin còn ios sử dụng Objective-C hoặc Swift. Ơ thế là phải học code native nữa à. Tất nhiên nhưng đừng lo lắng quá vì hầu hết đã được Flutter support rồi, Flutter không support được thì cũng có cộng đồng ngoài kia viết cả đống thư viện support nên hầu như rất ít khi phải vào đây code.
3. Folder `test` là nơi viết Unit Test cho dự án
4. file `pubspec.yaml` đây là nơi khai báo tên dự án, mô tả dự án, các thư viện sử dụng trong dự án, các asset như icon, ảnh hoặc font được sử dụng trong dự án
5. Hai file `.gitignore` và `README.md` thì quá quen thuộc với những bạn sài `git, github` rồi. Nó ko liên quan gì đến source dự án nên ko cần quan tâm cũng được.
6. Hai file `.metadata` và `.packages` là những file config. Bạn sẽ không cần đến chúng nhưng Flutter cần chúng.
7. Còn file `analysis_options.yaml` được mình đánh dấu hỏi đó thì có thể lúc bạn tạo dự án sẽ không thấy đâu. Đây là file ko bắt buộc phải có trong dự án nhưng đây là file giúp cái code của mình được tốt hơn, tránh code thối bằng các rule do chính ta tự định nghĩa trong file này. Ví dụ file này do mình sưu tầm rule của người khác định nghĩa ra không phải mình định nghĩa. Mình có comment (sử dụng ký tự #) vào một số rule cho các bạn dễ hình dung :D. Mình dùng từ cấm nó ko đúng lắm vì nếu bạn vi phạm nó chỉ warning thôi chứ không lỗi, chương trình vẫn chạy bình thường. Vì file mình sưu tầm khá nhiều rule nên mình xin phép trích 1 đoạn nhỏ thôi, mình sẽ để bản full trong phần comment. 
```markdown:dart
analyzer:
  strong-mode:
    # mặc định là true, mình set rule này là false tức là ko cho phép ép kiểu ngầm định, phải tường minh
    implicit-casts: false 

    # mặc định là true, mình set false, tức là ko cho phép sử dụng kiểu dynamic ngầm định
    # vì Dart nó cho phép bạn khai báo param mà ko cần kiểu, Dart sẽ tự hiểu param này có kiểu dynamic
    # Tuy nhiên, điều này làm cho việc đọc code hơi khó chịu nên mình đặt rule ngăn cấm
    implicit-dynamic: false
  errors:
    close_sinks: ignore

linter:
  rules:
    - annotate_overrides # phải sử dụng annotation overrides
    - avoid_empty_else # tránh sử dụng else mà bên trong không có code
    - avoid_function_literals_in_foreach_calls # kiểu cấm sử dụng lamdba trong forEach
``` 
Nếu bạn muốn sử dụng `analysis-options.yaml` thì từ folder dự án tạo 1 file mới đặt tên là `analysis-options.yaml` và copy list rule trên là sử dụng được. Cảm thấy rule nào không cần thiết thì xóa hoặc comment lại. Trong bài viết của mình, mình sẽ không sử dụng rule nên sẽ không sử dụng file này, vì mới học mà đừng gắt với bản thân quá :D
# 4. Tiến đến làm quen nàng
Sau khi nhìn body quyến rũ của nàng, ta đi vào chi tiết bên trong file `main.dart`. Ối giời ơi cả 1 rừng code, đọc không hiểu gì cả. Đúng là người ta nói khó hiểu như .. à mà thôi do mình chưa đủ kiến thức để hiểu nàng thôi. Cứ học thêm vài bài nữa sẽ thấy nàng cũng dễ hiểu lắm :D

Đùa chút thôi chứ bên trong source toàn là comment không à. Chúng ta mới bắt đầu thì nàng phải comment vào cho chúng ta đọc code dễ hiểu chứ. Còn khi bạn đã có nhiều kinh nghiệm trong chuyện ấy rồi, bạn muốn xóa comment đi cho đỡ chướng mất thì có 1 tip xóa nhanh là: Trong android studio, ở file source `main.dart`, bấm tổ hợp phím `Ctrl + R`, 1 toolbox hiện ra như hình dưới, tiếp đến gõ `//.*` vào ô số 1 dòng trên, dòng dưới để trống. Tiếp theo chọn vào checkbox `regex` và click vào button `Replace all`. Cuối cùng bấm tổ hợp phím `Ctrl + Alt + L` để format lại source code.

![](https://images.viblo.asia/f37ebbb3-1e99-4aa3-bec1-0169bac56c67.png)

Ok, bây giờ thì `Ctrl + A` và Delele tất cả đống code đó đi, ta sẽ chinh phục nàng từ đầu. Đơn giản chỉ với 4 bước với vài dòng code thôi:

```markdown:dart
// Bước 1: import thư viện material vào, thư viện này sẽ cung cấp widget để code
import 'package:flutter/material.dart';

// Bước 2: khai báo hàm main, đây là nơi mà code sẽ thực thi đầu tiên
void main() {
  // Bước 3: gọi hàm runApp truyền vào 1 object MaterialApp
  // MaterialApp chính là widget root, tổ tiên của 1 cây widget sau này
  runApp(MaterialApp(
      // Bước 4: Trong constructor của MaterialApp có 1 property là `home` 
      // ta sử dụng property `home` này để code nội dung trong app
      // ở đây mình truyền vào widget Text truyền vào 1 String
      home: Text('Hi bạn, cho mình làm quen nhé!')
  ));
}
```

Trước khi đến phần giải thích code. Các bạn thấy gì lạ không?. Thông thường, các framework khác thường tách phần UI và phần logic ra riêng. Có khi phải sử dụng đến 2 ngôn ngữ để code. Ví dụ như khi code android thông thường thì ta sẽ sử dụng XML để code UI và Java hoặc Kotlin để code logic. Flutter chơi kiểu khác, nó code UI và logic gộp chung lại và sử dụng đúng 1 ngôn ngữ duy nhất là Dart. Theo mình, có thể đây vừa là điểm mạnh, vừa là điểm yếu. Mạnh ở chỗ chúng ta chỉ học đúng 1 ngôn ngữ mà code được nhiều platform. Yếu ở chỗ sau này code phình lên thì nó sẽ lồng nhau trong cùng 1 file nhìn rất là bưa. Đừng lo, điểm yếu này có thể khắc phục được bằng các giải pháp, các pattern sẽ được mình giới thiệu ở những bài tiếp theo :D. *Note nhẹ: Click follow để nhận thông báo khi có bài viết mới nhé =))*

Bây giờ, mình sẽ giải thích 4 bước trên. Thật ra comment trong code cũng giải thích phần nào rồi. Viết thêm ra cho nó dông dài thêm thôi :v

**Bước 1**: Thư viện `flutter/material.dart` cung cấp các widget theo chuẩn [material design](https://material.io/design) của Google. Ngoài ra còn có 1 thư viện khác là `flutter/cupertino.dart`, nó cung cấp widget theo style iOS. Và trong hầu hết ví dụ của mình sẽ sử dụng thư viện `flutter/material.dart` nha.

**Bước 2**: khai báo hàm `main`, đây là nơi mà code sẽ thực thi đầu tiên

**Bước 3**: gọi hàm `runApp` truyền vào 1 object `MaterialApp`. Hàm này sẽ giúp chúng ta khởi động app

**Bước 4**: Giải thích một xíu cho những bạn chưa biết Dart. Ở bước 4 này, trong constructor của `MaterialApp` có rất nhiều parameter và tất cả param đó đều là optional parameter tức là truyền vào cũng được, không truyền vào cũng được. Ở đây mình chỉ truyền vào duy nhất 1 param là `home`. Ngoài ra nó còn cả đống param khác như trong document: https://api.flutter.dev/flutter/material/MaterialApp/MaterialApp.html. Tuy nhiên các bạn không phải sợ vì mỗi widget chúng ta chỉ cần học hiểu một vài property là có thể code Flutter ngon lành rồi :D
```cpp:dart
MaterialApp(
{Key key,
GlobalKey<NavigatorState> navigatorKey,
Widget home,      // <=== mình sử dụng param này đây
Map<String, WidgetBuilder> routes: const {},
String initialRoute,
RouteFactory onGenerateRoute,
InitialRouteListFactory onGenerateInitialRoutes,
RouteFactory onUnknownRoute,
List<NavigatorObserver> navigatorObservers: const [],
TransitionBuilder builder,
String title: '',
GenerateAppTitle onGenerateTitle,
Color color,
ThemeData theme,
ThemeData darkTheme,
ThemeMode themeMode: ThemeMode.system,
Locale locale,
Iterable<LocalizationsDelegate> localizationsDelegates,
LocaleListResolutionCallback localeListResolutionCallback,
LocaleResolutionCallback localeResolutionCallback,
Iterable<Locale> supportedLocales: const [Locale('en', 'US')],
bool debugShowMaterialGrid: false,
bool showPerformanceOverlay: false,
bool checkerboardRasterCacheImages: false,
bool checkerboardOffscreenLayers: false,
bool showSemanticsDebugger: false,
bool debugShowCheckedModeBanner: true,
Map<LogicalKeySet, Intent> shortcuts,
Map<Type, Action<Intent>> actions}
)
```

Trong đoạn code trên, có 1 thuật ngữ mình hay nhắc đi nhắc lại là `Widget`. `Widget` là cái gì vại?. Đó là thứ mà các bạn sẽ cần phải học rất nhiều để chinh phục được nàng Flutter. Bởi vì:
> Trong mắt nàng mọi thứ đều là `Widget`.
# 5. Thân thể nàng là một Widget Tree
Chắc hẵn ai ở đây cũng từng biết hoặc nghe đến đến bộ môn xếp hình LEGO nhỉ. Bạn tin được là con khổng long khổng lồ này được ghép từ những khối rất nhỏ gọi là LEGO brick ko?. Các khối LEGO brick nhỏ này có đủ hình dạng, vuông có, tròn có, bông hoa có thì mới có thể ghép được con khổng long to như thế.

![](https://images.viblo.asia/21553444-8148-43a1-9724-8ba858a5d836.jpg) *(ảnh sưu tầm)*

Bạn hãy hình dung, các khối nhỏ LEGO brick kia chính là các `Widget`, còn con khổng long thành phẩm kia chính là thành phẩm `App Flutter` của bạn. Ta muốn xây dựng một App Flutter thì phải bắt đầu từ những viên gạch nhỏ đó là những widget. Widget đơn giản chỉ là những Dart class. Nó có thể là đại diện cho 1 cái `Text` hiển thị trên màn hình, 1 cái `Icon`, 1 cái `Button` hay 1 cái `TextField`, ...

Well, lý thuyết chỉ là màu xám nếu không có thực hành. Giờ thử run project trong phần `làm quen nàng` mình đã tạo xem. Cái mình nhận được là thế này.

![](https://images.viblo.asia/b0264066-146b-4720-95dd-7b8f1d919abc.PNG)

Trông quá tởm, nàng sẽ từ chối ngay. Vì sao tởm như vậy, mình đã sử dụng thư viện material để code theo chuẩn material design rồi cơ mà. Đó là vì mình không sử dụng widget có tên là `Scaffold` (dịch ra là cái khung, là đại diện cho cả cái khung màn hình ấy). Material sẽ không hoạt động nếu không có `Scaffold`. Như vậy sau `MaterialApp`, thì widget kế tiếp nên là 1 `Scaffold` rồi mới đến widget `Text`. 

Để chèn nhanh 1 Widget bất kỳ bao bọc (wrap) widget `Text` lại ta đưa trỏ chuột vào vị trí widget `Text` và bấm tổ hợp phím `Alt + Enter` một dialog sẽ hiện ra thế này:

![](https://images.viblo.asia/267cfc8d-7f86-480c-af3c-cc726f8bcdad.png)

Ta dùng phím `lên xuống` để chọn option: `Wrap with widget...` rồi nhấn `enter`. Gõ chữ `Scaffold` vào, rồi nhấn phím `Tab` thay thuộc tính  `child` bằng `body` vì trong constructor của `Scaffold` không có property là `child`

```rust:dart
runApp(MaterialApp(
    home: Scaffold(
        body: Text('Hi bạn, cho mình làm quen nhé!')
    ),
  ));
```

Giờ chạy lại xem kết quả:

![](https://images.viblo.asia/da8bd292-c5f8-451a-9eeb-e9a4832fe471.PNG)

Vẫn tởm như thường =)). Vì `Scaffold` là nguyên cái khung màn hình nó ôm luôn cái status bar bên trên nên tất nhiên cái text sẽ được hiển thị ở vị trí đó. Bây giờ ta muốn cái text đó phải được hiển thị trong vùng hiển thị cho phép (gọi là vùng an toàn đi) thì sử dụng widget `SafeArea` wrap widget `Scaffold` lại và run lại project.

```rust:dart
runApp(MaterialApp(
    home: SafeArea(
      child: Scaffold(
          body: Text('Hi bạn, cho mình làm quen nhé!')
      ),
    ),
  ));
```

![](https://images.viblo.asia/970e717a-3ede-4824-811e-229a8bc5acc8.PNG)

Trông mới chỉ được thôi chứ chưa đẹp nhỉ, giờ ta muốn cái text kia ở vị trí ngay giữa màn hình cơ. Vậy bạn hãy sử dụng widget `Center` để wrap widget `Text` lại.

```rust:dart
runApp(MaterialApp(
    home: SafeArea(
      child: Scaffold(
          body: Center(
              child: Text('Hi bạn, cho mình làm quen nhé!')
          )
      ),
    ),
  ));
```

App cần có thêm 1 cái App Bar vào nữa nhỉ. Để thêm 1 App Bar ta sử dụng thuộc tính `appBar` của widget `Scaffold` và set background màu hường cho nó luôn nhé :v 

```markdown:dart
runApp(MaterialApp(
    home: SafeArea(
      child: Scaffold(
          appBar: AppBar(
              backgroundColor: Colors.pink, // set màu background cho app bar 
              title: Text('Cua nàng Flutter') // title của app bar
          ),
          body: Center(
              child: Text('Hi bạn, cho mình làm quen nhé!')
          )
      ),
    ),
  ));
```

![](https://images.viblo.asia/9d61fe53-1f5b-48a5-8514-9c112c81e1c9.PNG)

Tèn tén ten, một ví dụ đơn giản thôi mà bạn thấy code nó lồng nhau ghê chưa =)). 

Các bạn thấy ko, ngay cả title của app bar, chúng ta cần truyền text vào cũng phải là widget `Text`. Nếu chỉ truyền String như này `title: 'Cua nàng Flutter'` là sai nhé. Trong flutter, ngay cả việc căn item giữa layout, align nó ở bên trái hoặc bên phải layout hoặc padding đều sử dụng Widget. Như vậy mới nói là:
> Flutter: Everything Is Widgets

Và từ những widget rất nhỏ như `Text`, chúng ta đã xây lên cái Flutter App siêu to khổng lồ rồi đó =))

Sau tất cả, cuối cùng chúng ta có 1 cái widget tree như thế này. Widget Tree đơn giản là 1 cấu trúc cây (tree), là một tập hợp các node, trong đó mỗi node chính là một Widget. Các node kết nối với nhau theo quan hệ node cha - node con. MaterialApp là root Widget, là node ông tổ ha. Còn mỗi widget nếu không phải là node lá thì nó đều có sub widgets hay còn gọi là sub tree của widget đó.

![](https://images.viblo.asia/4daab899-cfd1-4e74-af89-8716f0c42c30.png)

Như vậy, để có thể chinh phục cô nàng Flutter, chúng ta cần trang bị cho mình thật nhiều Widget kèm theo đó là những property quan trọng của từng Widget như `child, color,....` rồi cho nó lồng nhau như vậy là có thể tạo ra UI như mong muốn thôi. Những nội dung này sẽ được mình chia sẻ trong những phần tiếp theo.
# 6. Giới thiệu một vài widget
Có đến hơn trăm cái Widget có sẵn trong Flutter được google chia theo nhóm như link sau: https://flutter.dev/docs/development/ui/widgets

Tuy nhiên, để dễ học hơn thì mình phân chia ra thành 5 nhóm chủ đạo như sau:

1. Nhóm **Value Widgets**. Nó dùng để hiển thị 1 dữ liệu gì đấy, dữ liệu có thể từ local, internet hoặc dữ liệu do user nhập vào. Một vài widget tiêu biểu như: `Text`, `TextField`, `Icon`, `Image`, `FlatButton`,...
2. Nhóm **Layout Widgets**. Nó dùng để bố trí và căn chỉnh các **Value Widget** trên trong 1 layout. Ví dụ: `Row` (bố trí các widget theo hàng ngang), `Column` (bố trí các widget theo hàng dọc), `Align`, `Center` (căn chỉnh layout), ...
3. Nhóm **Animation Widgets**. Nó giúp tạo ra Animation cho app của bạn thêm đẹp. VD: `FadeInImage`, `Hero`, `SlideTransition`, AnimatedContainer, ...
4. Nhóm **Navigation Widgets**, những widget giúp điều hướng trong app như: `BottomNavigationBar`, `TabBar`, `AlertDialog`,...
5. Nhóm **Interaction Widgets**. Nhóm này giúp chúng ta tạo ra những sự tương tác với View như: `Dismissible`, `Draggable`, `GestureDetector`, ...

Vì trong khuôn khổ bài viết có giới hạn nên mình sẽ giới thiệu từng widget ở một bài khác. Nếu giới thiệu hết vào bài này thì bài này nó dài như Truyện Kiều của Nguyễn Du. Ở đây mình chỉ giới thiệu tổng quan thôi, nếu bạn tò mò có thể khám phá chúng trong loạt video [Widget of the week](https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=1&ab_channel=Flutter) của Google. Mỗi video chỉ khoảng 1 phút nên chỉ mất khoảng 1 tiếng rưỡi là xem hết playlist đó :v 

Bây giờ mình chỉ giới thiệu 1 vài widget sẽ xuất hiện trong bài tiếp theo như `Row`, `Column`, `Text` và `FlatButon`
```cpp:dart
runApp(MaterialApp(
      home: SafeArea(
          child: Scaffold(
    appBar: AppBar(
      backgroundColor: Colors.pink,
      title: Text('Cua nàng Flutter'),
    ),
    body: Column( // bố trí widget theo chiều dọc
      children: [ // sử dụng children truyền vào 1 mảng widget
        Text('Hi bạn, cho mình làm quen nhé!'),
        Row( // bố trí 3 button theo chiều ngang
          children: [ // sử dụng children truyền vào 1 mảng 3 phần tử widget FlatButton
            FlatButton(
              child: Text('red'),
              color: Colors.red,
              onPressed: () {}, // tạm thời khi click vào button sẽ chưa có tác dụng gì
            ),
            FlatButton(
              child: Text('yellow'),
              color: Colors.yellow,
              onPressed: () {},
            ),
            FlatButton(
              child: Text('green'),
              color: Colors.green,
              onPressed: () {},
            )
          ],
        )
      ],
    ),
  ))));
```

Khi run, chúng ta sẽ có giao diện như thế này.

![](https://images.viblo.asia/2c786d8a-5b90-47e5-bbbc-d96fddd5e01c.PNG)

1. `Row` thuộc nhóm LayoutWidgets: nó có thuộc tính `children` truyền vào 1 mảng Widget và nó sẽ sắp xếp mảng Widget theo chiều ngang, mặc định là từ trái sang phải. Như ảnh trên ta thấy 3 button được sắp xếp từ trái qua phải trên cùng 1 hàng ngang.
2. `Column`, tương tự như `Row`, nhưng sắp xếp mảng Widget theo một hàng dọc
3. `Text` truyền vào 1 String, nó hiển thị cái Text trên màn hình
4. `FlatButton` là 1 button. Có 2 thuộc tính quan trọng là `child` truyền vào 1 Widget, ở đây mình truyền vào 1 widget `Text`. Và thuộc tính `onPressed` truyền vào một hàm `void Function()`, khi click vào button nó sẽ thực thi hàm này.

Trước mắt mình chỉ có thể giới thiệu nhiêu đó Widget thôi, để phục vụ cho bài tiếp theo. Mình sẽ có 1 bài dành riêng để giới thiệu những Widget.
# 7. Tháo gỡ cấu trúc lồng
Có 2 cách để bạn có thể tháo gỡ cấu trúc lồng kinh dị kia, 1 là tách Widget ra 1 method riêng, 2 là tách ra class riêng. Để tách ra được cũng có 2 lựa chọn: Một là tự code tách ra, hai là dùng tool của IDE tách cực kỳ nhanh. Ở đây mình hướng dẫn dùng tool kèm với code sau khi tách thành công.

## 7.1. Extract Method
Các bạn di chuyển trỏ chuột vào widget cần extract ra method riêng, click chuột phải, chọn Refactor -> Extract Method rồi đặt tên cho method đó. Ở đây mình đặt tên là `buildColumn`

![](https://images.viblo.asia/c1664970-435f-4c6b-9ebd-61c63c4a62f9.png)

Tuy là file sẽ dài hơn nhưng code đỡ lồng hơn nên dễ đọc hơn.

```cpp:dart
void main() {
  runApp(MaterialApp(
      home: SafeArea(
          child: Scaffold(
    appBar: AppBar(
      backgroundColor: Colors.pink,
      title: Text('Cua nàng Flutter'),
    ),
    body: buildColumn(),
  ))));
}

// extract ra hàm buildColumn ở đây
Column buildColumn() {
  return Column(
    // bố trí widget theo chiều dọc
    children: [
      // sử dụng children truyền vào 1 mảng widget
      Text('Hi bạn, cho mình làm quen nhé!'),
      Row(
        // bố trí 3 button theo chiều ngang
        children: [
          // sử dụng children truyền vào 1 mảng 3 phần tử widget FlatButton
          FlatButton(
            child: Text('red'),
            color: Colors.red,
            onPressed:
                () {}, // tạm thời khi click vào button sẽ chưa có tác dụng gì
          ),
          FlatButton(
            child: Text('yellow'),
            color: Colors.yellow,
            onPressed: () {},
          ),
          FlatButton(
            child: Text('green'),
            color: Colors.green,
            onPressed: () {},
          )
        ],
      )
    ],
  );
}
```
## 7.2. Extract ra class Widget riêng
Tương tự extract method, chúng ta cũng di chuyển trỏ chuột vào widget cần extract ra class Widget riêng, click chuột phải, chọn Refactor -> **Extract Flutter Widget** rồi đặt tên cho class Widget đó. Ở đây mình đặt tên là `ColumnWidget`

```rust:dart
void main() {
  runApp(MaterialApp(
      home: SafeArea(
          child: Scaffold(
    appBar: AppBar(
      backgroundColor: Colors.pink,
      title: Text('Cua nàng Flutter'),
    ),
    body: ColumnWidget(),
  ))));
}

// extract ra class ColumnWidget ở đây
class ColumnWidget extends StatelessWidget {
  const ColumnWidget({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      // bố trí widget theo chiều dọc
      children: [
        // sử dụng children truyền vào 1 mảng widget
        Text('Hi bạn, cho mình làm quen nhé!'),
        Row(
          // bố trí 3 button theo chiều ngang
          children: [
            // sử dụng children truyền vào 1 mảng 3 phần tử widget FlatButton
            FlatButton(
              child: Text('red'),
              color: Colors.red,
              onPressed: () {}, // tạm thời khi click vào button sẽ chưa có tác dụng gì
            ),
            FlatButton(
              child: Text('yellow'),
              color: Colors.yellow,
              onPressed: () {},
            ),
            FlatButton(
              child: Text('green'),
              color: Colors.green,
              onPressed: () {},
            )
          ],
        )
      ],
    );
  }
}
```
# Kết thúc mở
Đoạn code cuối cùng trong phần 7 mở ra biết bao nhiêu thứ lạ lẫm. `Key` là gì, `BuildContext` là gì, hàm `build` kia là gì, `StatelessWidget` là gì?. Nếu bạn tò mò click vào xem bên trong các widget class như `AppBar` hay `Text` thậm chí là `MaterialApp` bạn cũng sẽ thấy chúng kế thừa 1 trong 2 lớp là `StatefulWidget` và `StatelessWidget`. Trong Flutter, Widget được chia thành 2 loại chính là `StatefulWidget` và `StatelessWidget`. StatelessWidget dịch ra là Widget mà không có State, StatefulWidget là Widget có State. Vậy `StatefulWidget`, `StatelessWidget` và `State` là gì và quan trọng hơn là khi nào thì cần sử dụng cái nào. Câu trả lời sẽ có trong phần tiếp theo.

*Lại note nhẹ: Click follow để nhận thông báo khi có bài viết mới nhé =))*

Đọc tiếp phần 2: [StatefulWidget vs StatelessWidget. Khi nào thì cần sử dụng cái nào?](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n)

Đọc tiếp phần 3: [Lột trần cô nàng Flutter, BuildContext là gì](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw)

Đọc tiếp phần 4: [Lột trần Lột trần InheritedWidget](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-4-lot-tran-inheritedwidget-3P0lPDbmlox)

Nguồn tham khảo: Beginning App Development with Flutter: Create Cross-Platform Mobile Apps của tác giả Rap Payne