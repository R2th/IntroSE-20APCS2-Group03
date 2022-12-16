# Giới thiệu
Đối với những người mới tiếp cận với flutter việc tiềm kiếm cho mình một structure, pattern để theo là cực kỳ quan trọng. Ngày hôm nay mình sẽ giới thiệu đến các bạn một Plugin toàn năng giúp cho việc code Flutter của bạn sẽ hiệu quả và năng suất hơn rất nhiều. Đó chính là Get một trong những Plugin hot nhất trong cộng đồng Flutter cũng như trên Pub.dev hiện tại. Và vì sao nó lại hot đến như vậy, nó làm được những gì, chúng ta sẽ cùng tìm hiểu nhé

Lưu ý: để bắt đầu sử dụng Plugin này bạn cũng nên học cơ cản Flutter trước để hiểu các component trong Futter hoạt động như thế nào. Một lần nữa công cụ chỉ giúp chúng ta dễ dàng hơn trong công việc nhưng để giải quyết được những vấn đề phức tạp và chuyên sâu hơn thì việc hiểu về Flutter là bắt buộc

Vậy Get làm được những gì:
![](https://images.viblo.asia/a69fdcc5-aef8-4375-b3ba-1daa12ec2af9.png)

* State Manager : Quản lý state trong Flutter
* Navigation Manager: Quản lý việc điều hướng
* Dependencies Manager: Cung cấp giải pháp dependencies injection tuyệt vời
* Utils function: Các hàm tiện ích cực kỳ hữu ích trong lập trinhg Flutter

Vì nội dung của Get khá dài nên mình sẽ chia thành nhiều phần: Hôm nay chúng ta sẽ tìm hiểu về cách quản lý state của Get trước nhé

Đầu tiền để sử dụng get các bạn add dependencies vào file pubspec.yaml trước nhé
```
dependencies:
  flutter:
    sdk: flutter
  get: ^3.4.6
```

# Get - State Manager
###  Ưu điểm
Đầu tiên mình sẽ nêu các vấn đề gặp phải với các kiểu quản lý state phổ biến hiện tại
* BLoC pattern cũng là một cách quản lý state hiệu quả và an toàn. Tuy nhiên code khá rối rắm và tốn nhiều thời gian để implement, trong một số trường hợp thì khó handle. Khó tiếp cận với những người mới
* MobX cũng là một thư viện tuyệt vời, dễ sử dụng hơn BLoC tuy nhiên lại quá phụ thuộc vào code generation. Có thể gây khó hiểu với người sử dụng và làm phình scope của dự án
* Provider là một kiểu quản lý state cơ bản và hiệu quả đối với nhiều người. Khi mới bắt đầu mọi người nên sử dụng thuần thục Provider. Tuy nhiên Provider sử dụng InheritedWidget và nó chỉ có thể sử dụng trong widget tree nên nhiều trường hợp sẽ không thể handle được

Tiếp theo là những ưu điểm của Get - State manager
*  Chỉ update những widget cần thiết
*  Sử dụng ít bộ nhớ hơn so với các kiểu quản lý state khác
*  Quên đi StatefulWidget. Với Get các bạn không phải suy nghĩ sử dụng StatefulWidget hay StateLessWidget nữa. Bây giờ bạn chỉ việc một component duy nhất là GetWidget
* Việc tổ chức cấu trúc project sẽ cực kỳ clear, phần code logic được tách hẳn hoàn toàn so với UI (mình sẽ demo structure dự án ở bài cuối của seri)
* Update widgets without spending ram for that
* Tối ưu hoá bộ nhớ, bạn sẽ không phải lo lắng việc Out Memory nữa , Get sẽ tự động thu dọn những component không cần thiết

###  Nguyên lý hoạt động

Về nguyên lý hoạt động của Get. Những bạn nào đã quen làm việc với Rx chắc sẽ hiểu được nguyên lý hoạt động của nó một cách dễ dàng

Về cơ bản Get hoạt động cũng giống như Rx, cũng có các Observable và các component để lắng nghe thay đổi của Observable

**Để  khai báo một Observable với Get cũng hết sức đơn giản, có ba cách như sau**
```
The first is using Rx{Type}.

    var count = RxString();
    
The second is to use Rx and type it with Rx<Type>

    var count = Rx<String>();
    
The third, more practical and easier approach, is just to add an .obs to your variable.

    var count = 0.obs;
    Rx<int> count = 0.obs;
```

**Tiếp theo mình sẽ  giới thiệu về GetxController**

Mỗi một màn hình sẽ có một Controller extends từ GetxController. Controller này sẽ khai báo các Observable và xử lý toàn bộ logic của màn hình đó.
Ex
```
class Controller extends GetxController {
  var count = 0.obs;
  void increment() {
    counter.value++;
  }
}

```
**Để lắng nghe các Observable  ở trong View thì có thể sử dụng một trong các cách sau**

**1. GetX Component**
```
GetX<Controller>(
  builder: (value) {
    print("count  rebuild");
    return Text('${controller.count.value}');
  },
),
```
Khi value của observable count thay đổi Widget sử dụng nó sẽ tự động được update mà không hề ảnh hướng đến các widget khác trong tree widget

**2. GetBuilder**
Đây là cách simple để sử dụng Get State Manager.

Trong controller

```
// Create controller class and extends GetxController
class Controller extends GetxController {
  int counter = 0;
  void increment() {
    counter++;
    update(); // use update() to update counter variable on UI when increment be called
  }
}
```

Trong View
```
GetBuilder<Controller>(
  init: Controller(), // INIT IT ONLY THE FIRST TIME
  builder: (controller) => Text(
    '${controller.counter}',
  ),
)
```
Đối với GetBuilder chúng ta không cần khai báo kiểu Observable cho các field mà sử dụng trực tiếp kiểu cần dùng. Tuy nhiên cần phải gọi hàm update() có sẵn trong GetXController để update đến các Widget

Nếu bạn đã navigate đến màn hình khác nhưng vẫn cần sử dụng data của màn hình cũ thì chỉ cần đơn giản gọi controller của màn hình đó ra sử dụng. Đây là một điểm tuyệt vời của Get 

**Class a => Class B (has controller X) => Class C (has controller X)**

```
class PageA extends GetWidget<ControllerA> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FlatButton(
          onPress() =>   Navigator.push(context, MaterialPageRoute(builder: (BuildContext context) => ClassB()));
        ),
      ),
}

class PageB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: GetBuilder<ControllerA>(
          builder: (s) => Text('${s.counter}'),
        ),
      ),
}

// Hoặc sử dụng Get.find() 

class PageC extends StatelessWidget {
ControllerA _controllerA = Get.find();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child:  => Text('${_controllerA.counter}'),
      ),
}
```

**3.Obx()**
Cách cuối cùng là sử dụng Obx() componet. Đây sẽ là cách chủ đạo chúng ta nên sử dụng trong thực tế. Vì những ưu điểm nhất định của nó (cái này các bạn chịu khó đọc link đính kèm phía dưới nhé, vì khá dài dòng)
```
// controller 

class HomeController extends GetxController {
  var count = 0.obs;
  void increment() {
    counter.value++;
  }
}

class HomePage extends GetWidget<HomeController> {

  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
             Obx(() => Text(_controller.count.value.toString()),
             FooterWidget(),
        ]     
    );
  }
}


class FooterWidget extends GetWidget {
  DetailController _controller = Get.find();

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Obx(() => Text(_controller.count.value.toString())
        );
  }
}

```

Với Getx - Obx các widget con sẽ dễ dàng sử dụng Controller của widget cha. Việc update data sẽ được tự động mỗi khi observable được thay đổi value. Cực kỳ dễ dàng phải không nào

**Binding**

Còn một thành phần khác cực kỳ quan trọng của Get nữa đó là Binding. 

Tương tự như Controller mỗi màn hình cũng sẽ có một Binding đây là nơi cung cấp các dependencies(repository, usecase,....) cho màn hình đó kể cả controller cũng được provide ở đây. Phần này liên quan nhiều đến dependencies manager nên mình sẽ giải thích ở phần sau. Mình sẽ chỉ cách sử dụng Binding cho cách bạn như sau
Ex:
```
class DetailBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DetailController>(() => DetailController());
  }
}
```
Binding sẽ được attach khi config route ở App. À quên nữa để sử dụng được tất cả tính năng của Get các bạn phải sử dụng **GetMaterialApp**
Ex

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      enableLog: true,
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialBinding: DependenciesBinding(),
      initialRoute: '/search',
      getPages: [
        GetPage(
            name: '/search',
            page: () => SearchPage(),
            binding: SearchBinding()),
        GetPage(
            name: '/detail', page: () => DetailPage(), binding: DetailBinding())
      ],
    );
  }
}
```

Vậy để quản lý state với Get mỗi một màn hình trong Flutter sẽ gồm 3 component : **Controller** class(Extends từ GetXController), **Binding** class (Extend từ Binding) và **Widget** class(Extends từ GetWidget) 

Để tìm hiểu thêm về State Manager với Get các bạn vào link sau nhé: https://github.com/jonataslaw/getx/blob/master/docs/en_US/state_management.md#conditions-to-rebuild

Cảm ơn các bạn đã theo dõi, chúc các bạn thành công và hẹn gặp lại ở phần tiếp the