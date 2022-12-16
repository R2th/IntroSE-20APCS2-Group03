### 1. Giới thiệu:
[**Reflectly**](https://reflectly.app/) là một ứng dụng thành công không chỉ về mặt số lượng người dùng ứng dụng mà còn được xuất hiện trên trang chủ của Flutter như một sản phẩm Showcase chất lượng của framework này. Reflectly thu hút người dùng ứng dụng bằng việc tạo ra những trải nghiệm đơn giản, dễ dùng, những màn hình với chất lượng UI-UX cực tốt. Ngay màn hình đầu tiên Reflectly đã tạo cho người dùng một ấn tượng tuyệt vời khi mở ứng dụng:

![](https://images.viblo.asia/028475ba-fe9d-4f75-a8b1-4e9f7c033453.png)


Thôi dài dòng quá rồi mình vào luôn phần chính là code thôi. Không những 1 cách làm mà mình sẽ hướng dẫn các bạn hẳn 2 cách khác nhau luôn. 

### 2. Dàn layout:
**Bước 1**: Thêm các package cần thiết vào file ***pubpesc.yaml***

![](https://images.viblo.asia/91bc2aae-b594-4165-bca3-a62b95487de2.png)

**Bước 2**:  Khởi tạo file ***intro_page.dart***, paste code bên dưới và chạy thử
```
import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter/material.dart';

class IntroPage extends StatefulWidget {
  @override
  _IntroPageState createState() => _IntroPageState();
}

class _IntroPageState extends State<IntroPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFF8185E2),
        body: SafeArea(
          child: SingleChildScrollView(
            child: Center(
              child: Column(
                children: <Widget>[
                  AvatarGlow(
                    endRadius: 90,
                    duration: Duration(seconds: 2),
                    glowColor: Colors.white24,
                    repeat: true,
                    repeatPauseDuration: Duration(seconds: 2),
                    startDelay: Duration(seconds: 1),
                    child: Material(
                        elevation: 8.0,
                        shape: CircleBorder(),
                        child: CircleAvatar(
                          backgroundColor: Colors.grey[100],
                          child: FlutterLogo(
                            size: 50.0,
                          ),
                          radius: 50.0,
                        )),
                  ),
                  Text(
                    "Hi There",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 35.0,
                        color: Colors.white),
                  ),
                  Text(
                    "I'm Reflectly",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 35.0,
                        color: Colors.white),
                  ),
                  SizedBox(
                    height: 30.0,
                  ),
                  Text(
                    "Your New Personal",
                    style: TextStyle(fontSize: 20.0, color: Colors.white),
                  ),
                  Text(
                    "Journaling  companion",
                    style: TextStyle(fontSize: 20.0, color: Colors.white),
                  ),
                  SizedBox(
                    height: 100.0,
                  ),
                  GestureDetector(
                    child: Container(
                      height: 60,
                      width: 270,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100.0),
                        color: Colors.white,
                      ),
                      child: Center(
                        child: Text(
                          'Hi Reflectly',
                          style: TextStyle(
                            fontSize: 20.0,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF8185E2),
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 50.0,
                  ),
                  Text(
                    "I Already have An Account".toUpperCase(),
                    style: TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        ));
  }
}
```

![](https://images.viblo.asia/678caacc-9635-4001-aca8-aba24fcf70da.png)

### 3. Cách 1: Sử dụng AnimationController của Flutter
Đầu tiên, mình khởi tạo thêm 1 file tên là ***delay_animation.dart*** như hình dưới:

![](https://images.viblo.asia/343ee290-b125-46ae-a773-3f72a51d6fb3.png)

Trước khi vào code chính, mình xin giới thiệu sơ qua một chút về Animation trong Flutter. 

 Hầu hết các Animation trong Flutter được set up và quản lý bởi 3 phần:
 
**1. AnimationController**: Đây là class để "quản lý" các Animation trong Flutter. Nó tạo ra giá trị mới cho các khung hình được hiển thị, track các State của Animation cũng như thực hiện các lệnh play(forward), reverse hoặc stop Animation.

**2. Animation / Tween**: Nó define giá trị bắt đầu và kết thúc thông qua 1 đường cong. Ngoài ra, nó còn có trách nhiệm thông báo cho Controller mỗi khi giá trị nó đang nắm giữ thay đổi.

**3. Ticker**: Đây là class lắng nghe frameCallback và gọi 1 hàm "tick" đến bộ điều khiển nó(Trong trường hợp này là Controller) .

Sử dụng cả 3 phần trên để bạn tạo ra 1 Animation đơn giản cho ứng dụng của bạn. Giờ chúng ta sẽ đi đến quá trình khởi tạo Animation cho ứng dụng này.

![](https://images.viblo.asia/ee27ffcb-1e40-4e78-b341-ff5e1dfd0916.png)

Đầu tiên mình khởi tạo 1 AnimationController trong hàm initState() để cung cấp "this" như 1 Ticker Provider. Chính vì điều đó nên bạn phải extend State Widget của bạn với class TickerProviderStateMixin để đánh dấu lại như mục 3 ở trên đã giới thiệu. Sau đó, mình cung cấp cho Animation một hình dạng Curve do mình quy định và Controller để quản lý.

Ngoài ra, mình cần override lại function dispose() để dispose Controller đi khi không cần sử dụng nữa.
![](https://images.viblo.asia/982cc05a-5fe8-43cd-83a5-6444b8e92c7b.png)

Nếu bạn để ý lại tấm hình từ đầu bài, các Widget trong màn hình Intro của Reflectly xuất hiện ẩn hiện với thời gian liên tiếp nhau, cho nên mình sẽ khởi tạo cho class DelayAnimation bao gồm các thành phần sau: ![](https://images.viblo.asia/5d9678e8-20eb-4bc7-93c7-00f544da9366.png)

Và hàm build tương ứng của nó sẽ như sau: 
![](https://images.viblo.asia/3eca2efb-fdc2-42eb-92f1-c75fb4c62164.png)

Tiếp theo, mình quay về lại file  ***intro_page.dart*** lúc nãy để code tiếp.
Đầu tiên, mình set up lại code cho màn hình này như sau:

![](https://images.viblo.asia/4f183c4a-d2af-43b7-8ca1-5f18440f7cb8.png)

Phía dưới func build(), bạn chỉ cần wrap các Widget bạn muốn ẩn hiện lại như sau:
![](https://images.viblo.asia/62868f02-e288-4bbe-9701-1098633aee75.png)

Trong đó:
* delay: khoảng thời gian mà bạn muốn Widget này xuất hiện trên màn hình.
* shoudFaded: sau khi hiện bạn có muốn ẩn đi hay không.
* child: Widget bạn truyền vào.

Sau khi đã wrap xong thì ta bắt đầu chạy thử....kết quả là có mỗi logo xuất hiện và các thành phần kia không hiện luôn phải không, vì mình thiếu xử lý cho nó xuất hiện trên màn hình mà :v 

Mình quay về lại file  ***delay_animation.dart*** lúc nãy để thêm đoạn code sau trong func initState().

![](https://images.viblo.asia/e316a125-7b57-48f4-acd3-e2f6034398ec.png)

Mình giải thích một chút về đoạn code trên. Đầu tiên mình đặt Timer một khoảng thời gian để Widget dừng lại đôi chút rồi mới xuất hiện, khi Widget xuất hiện trên màn hình, mình kiểm tra tiếp xem có cần ẩn cái Widget đó đi hay không.

Chạy lại chương trình và bạn đã hoàn thành được đúng điều mình muốn. Các bạn có thể tham khảo code của mình trên github ở cuối bài viết nhé!

### 4. Cách 2: Sử dụng Motion Widget:
Link pub: https://pub.dev/packages/motion_widget#-installing-tab-

Nếu bạn thấy cách ở trên dài dòng và phức tạp, không sao cả thư viện này đã giúp bạn đỡ nhức đầu và tiết kiệm thời gian của bạn. 

Motion đơn giản chỉ có 2 phần tử chính: **Motion** and **MotionElement**

**1. Motion:** 

Được sử dụng cho Row và Column là chính, và list children của nó tuỳ ý các Widget truyền vào, không bị bắt buộc phải là **MotionElement**
```
Motion<T>(
    children:<Widget>[
        MotionElement(
            child: Text("Hi")
        ),
        Text("How are you?")
    ]
)
```

Ngoài ra, nó cũng có 1 số tham số để quản lý Animation bao gồm:
- durationMs: tổng thời gian diễn ra Animation, kiểu int, milliseconds.
- shouldRepeat: nếu ta muốn lặp lại, set giá trị là true.
- isAutomatic: Mặc định là Motion sẽ tự bắt đầu Animation luôn, chúng ta có thể kiểm soát nó thông qua biến flag này.
- exitConfigurations: được sử dụng khi ta muốn kết thúc Animation.


**2. Motion Element:**
Bao gồm các thuộc tính sau:
* mode: Define dạng của Animation. Trong giới hạn widget này chỉ hỗ trợ TRANSLATE, FADE and TRANSLATE_FADE(translate + fade).
* orientation: Định nghĩa hướng xuất hiện của Motion(LEFT, RIGHT, UP, DOWN).
* interval: Giá trị nằm trong đoạn [0,1]. Ta có thể kiểm soát thời gian xuất hiện của Widget này thông qua tính toán với tổng thời gian xuất hiện Animation ở trên (durationMs).

Còn khi áp dụng vào màn hình mình đang làm thì sao, rất đơn giản chỉ vài dòng thôi không rắc rối như cách 1. Mình tạo thêm 1 file ***intro_page_with_motion.dart***

![](https://images.viblo.asia/5a8d65c4-161f-47f8-9a48-d12f0142964e.png)

Ở đây, mình cho tổng thời gian xuất hiện hết các phần tử là 4s(~4000ms). Từ đó suy ra Widget đầu tiên sẽ xuất hiện sau 1s, Widget sẽ xuất hiện sau 2.5s, dễ dàng tính toán thời gian đúng không nào.

Tóm lại, việc code Animation với Flutter vô cùng dễ dàng nếu bạn hiểu được cơ chế hoạt động cơ bản của chúng. Ngoài ra, việc cộng đồng Flutter ngày càng phát triển và lớn mạnh sẽ khiến việc code của bạn dễ dàng hơn khi sử dụng các pub.

Thực tế mình đã áp dụng màn hình này vào project bên mình, bạn có thể tham khảo ứng dụng DOF Hunt có sẵn trên 2 store ^^
![](https://images.viblo.asia/eabccd4d-8aa3-4c4b-83e1-3ccacbad5438.gif)


Link github: https://github.com/Barry0501/Reflectly-Intro-Flutter

Nếu bạn muốn xem được những bài viết chất lượng, hay thảo luận những kiến thức, chia sẻ hiểu biết của bạn đến mọi người, hãy tham gia group của bọn mình trên [Facebook](https://www.facebook.com/groups/2753546238005745/) nhé: ^^