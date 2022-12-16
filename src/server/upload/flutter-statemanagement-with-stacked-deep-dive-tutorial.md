***Note***: Tuyển tập bài viết được dịch từ trang **[filledstacks.com](https://www.filledstacks.com/)** về chủ đề ứng dụng **Stacked State Management** vào một ứng dụng Flutter.

{@embed: https://www.youtube.com/watch?v=hEy_36LPcgQ}

Bài hướng dẫn này sẽ tập trung vào việc giới thiệu các tình huống được đề cập bởi cộng đồng thành viên cũng như các tình huống thông thường trong quá trình phát triển một ứng dụng mobile sử dụng kiến trúc này. Đầu tiên chúng ta sẽ liệt kê sau đó chúng ta có thể biết chỗ nào để xem cho tình huống quan trọng nhất đối với bạn. Toàn bộ mã nguồn bạn có thể tìm thấy ở [đây](https://github.com/DanhDue/stacked_state_mamagement).

### 1. Partial View Rebuilds.
### 2. Rebuilding a ViewModel A when ViewModel B triggered a change.
### 3. Getting Data From a Future and Showing it.
### 4. Listening to Streams and Showing Data.

## Partial View Rebuilds.
Vấn đề được thảo luận nhiều nhất mà chúng tôi nhận được về kiến trúc này đó là "toàn bộ view sẽ được tạo lại cho mỗi thay đổi". Mặc dù điều này là tính năng mặc định của Flutter khi sử dụng **setState**, mở cấp view, Tôi đoán rằng nó một số người nghĩ về khi từ kiến trúc được đề cập. ĐIều này không thực sự là một trường hợp đối với Stacked, Nó chỉ là tôi thích triển khai những điều này như thế noà nhằm giữ cho mã nguồn của mình trông sạch hơn. Tôi không quan tâm tới việc rebuild bởi vì Flutter rất được tối ưu và tôi đã không chạy tới bất cứ vấn đề thay thế 60fps. Do đó hãy chuyển tới các bước nhằm không rebuild toàn bộ UI.

Bạn sẽ bắt đầu bằng các tạo **ViewModelBuilder** sử dụng **nonReactive** constructor ở cấp độ view. Như cái tên đã gợi ý, điều nay sẽ không phản ứng lại với lời gọi **notifyListeners** và builder chỉ được gọi một lần và không bao giờ được gọi lại sau đó. Tạo một folder mới trong views gọi là **partial_builds** bên tỏng tạo một file gọi là **partial_builds_view.dart** và **partial_builds_viewmodel.dart**

```
// partial_builds_view.dart
class PartialBuildsView extends StatelessWidget {
  const PartialBuildsView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<PartialBuildsViewModel>.nonReactive(
      builder: (context, model, child) => Scaffold(
        body: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

          ],
        ),
      ),
      viewModelBuilder: () => PartialBuildsViewModel(),
    );
  }
}

// partial_builds_viewmodel.dart
import 'package:stacked/stacked.dart';

class PartialBuildsViewModel extends BaseViewModel {}
```

Ví dụ này là khá rườm rà nhằm trình bày làm thế nào bạn có thể sử dụng kĩ thuật, bạn không phải sử dụng cái này cho mọi widget. Nhưng tôi sẽ không trình bày cho bạn làm thế nào để thực hiện rebuilds từng phần và không rebuild cho các widgets khác. Tiếp theo chúng ta sẽ tạo các widgets cái sẽ phản ứng lại với sự thay đổi của ViewModel.

## ViewModelWidgets cho con kế thừa ViewModel
Sau đó chúng ta sẽ tạo một vài private widgets trong file view cái được sử dụng cho ViewModel nhưng không được tạo lại UI khi nó thông báo về những thay đổi của mình cho những đối tượng lắng nghe chúng. Chúng ta sẽ build một mẫu cái sẽ lấy một số text và sẽ in ra, cùng với chiều dài của nó. Tôi biết, nó không được đặc biệt cho lắm, nhưng nó là ý tưởng ngang qua. Chúng ta sẽ tạo ra một phần của form cái sẽ đặt trong một Text và cập nhật vào ViewModel. Khi nó trở thành các forms, chúng ta bắt đầu sử dụng Flutter Hooks để giảm thiểu tất cả các bản mẫu code xung quanh việc sử dụng các statefull widgets,...

```
class _StringForm extends HookViewModelWidget<PartialBuildsViewModel> {
  _StringForm({Key key}) : super(key: key, reactive: false);

  @override
  Widget buildViewModelWidget(
    BuildContext context,
    PartialBuildsViewModel model,
  ) {
    var text = useTextEditingController();
    return TextField(
      controller: text,
      onChanged: model.updateString,
    );
  }
}
```

Để sử dụng **HookViewModelWidget** bạn phải thêm **stacked_hooks** vào pubspec

```
flutter_hooks:
stacked_hooks: ^0.1.1+3
```

Như vậy, điều xảy ra ở đây là chúng ta đang sử dụng phiên bản Hooks của **ViewModelWidget** và thiết lập thuộc tính reactive thành false. Điều này nói với Widget rằng khi **notifyListeners** được gọi cho ViewModel liên kết với view này, **buildViewModelWidget** sẽ không được gọi lại. Rồi chúng ta có **buildViewModelWidget** cái sẽ build UI cho mình. UI đơn giản, chúng ta tạo một text editing controller và trả về một text field. Chúng ta cũng gọi **model.updateString** từ **onChanged function callback**  của TextField. Rồi chúng ta có thể cập nhật ViewModel.

```
import 'package:stacked/stacked.dart';

class PartialBuildsViewModel extends BaseViewModel {
  String _title;
  String get title => _title;

  void updateString(String value) {
    _title = value;
    notifyListeners();
  }
}
```

Thiết lập **PartialBuildsView** như là home view trong file main và bỏ comment **initialRout**. Cái này chỉ cho quá trình kiểm thử.

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      // initialRoute: Routes.startupViewRoute,
      home: PartialBuildsView(),
      onGenerateRoute: Router().onGenerateRoute,
      navigatorKey: locator<NavigationService>().navigatorKey,
    );
  }
}
```

Khi bạn chạy mã nguồn, chúng ta sẽ có một TextField ở giữa của View. Đánh chữ lên nó sẽ không thay đổi gì cả. Hãy tạo một widget cái sẽ phản hồi các loại giá trị. Dưới widget nhập string tạo một stateless widget mới là **_TitleAndValue**.

```
class _TitleAndValue extends ViewModelWidget<PartialBuildsViewModel> {
  _TitleAndValue({Key key}) : super(key: key, reactive: true);

  @override
  Widget build(BuildContext context, PartialBuildsViewModel model) {
    return Column(
      children: <Widget>[
        Text(
          model.title ?? '',
          style: TextStyle(fontSize: 40),
        ),
      ],
    );
  }
}
```

Widget này sẽ kế thừa cùng **ViewModel** nhằm lấy truy cập tới nó thông qua build function nhưng thời điểm này reactive value được thiết lập là true. Điều này nghĩa là mỗi khi **notifyListeners** được gọi **_TitileAndValue** widget sẽ được tạo lại. Đó chỉ là widget cái được tạo lại khi các giá trị được thay đổi. nếu bạn thêm các đoạn log vào phương thức builder của view, **_StringForm** build được ghi đè và phương thức build của **_TitleAndValue** sẽ được log ra giống như bên dưới.

```
I/flutter ( 9830): _PartialBuildsView built
I/flutter ( 9830): _StringForm built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
I/flutter ( 9830): _TitleAndValue built
```

Khi form này bắt đầu, ba thứ được build. Rồi khi bạn nhập text, chỉ một cái được đánh dấu là reactive được build nhằm thể hiện giá trị được cập nhật. Bạn có thể trộn lẫn và kết hợp **.reactive constructor**  và **.nonReactive constructor** nhằm lấy được kết quả mong muốn cuối cùng. Tôi tách forms của mình thành các widgets và xoá bỏ các hoạt động phản hồi tách các widgets là thông điệp cho quá trình xác nhận đầu vào(validation) cái là reactive và phản hồi với các thay đổi của ViewModel khi cần thiết.

## Rebuilding a ViewModel A when Viewmodel B triggered a change
Điều này là tình huống phổ biến nhất cái xuất phát từ các nhà phát triển đã áp dụng kiến trúc từ những video đầu tiên cũng như từ provider_architecture package của tôi. Trường hợp khi bạn muốn rebuild hai widgets trên màn hình cái có các ViewModels khác nhau. Stacked được tạo ban đầu nhằm chỉ cải thiện phần này của state management một cách cụ thể. Hãy thực hiện tất cả các thiết lập đầu tiên nhằm trình bày vấn đề. Quá trình thiết lập tốn nhiều thời gian hơn giải pháp, nhưng bạn cần một hướng dẫn "từ đầu" do đó chúng tôi sẽ viết tất cả những thứ chúng ta cần.

### Problem setup
Trên thư mục views tạo một folder mới gọi là **reactive_example** bên trong tạo một file mới gọi là **reactive_example_view.dart**. Cái này sẽ tạo một widget thông thường mà không gắn với ViewModel.

```
import 'package:flutter/material.dart';

class ReactiveExampleView extends StatelessWidget {
  const ReactiveExampleView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          children: <Widget>[
            SingleIncreaseCounter(),
            SizedBox(width: 50),
            DoubleIncreaseCounter(),
          ],
        ),
      ),
    );
  }
}
```

Nó sẽ sử dụng hai widgets cái sẽ có ViewModel ở bên trong nó. Chúng sẽ đồng thời đọc các thuộc tính giống nhau từ một service và hiển thị chúng.
**IMPLEMENTATION NOTE**: Khi dữ liệu được chia sẻ giữa các ViewModels đẩy vào nó một service cái có thể được injected/retrieved trong tất cả các ViewModels cần nó. Giống như một **NavigationService** hoặc **DialogService**. Trên thư mục UI chúng ta sẽ tạo một folder mới gọi là **smart_widgets**. Smart widgets là các widgets cía có ViewModel được gắn cho chính nó. Hầu hết bạn sẽ tạo các dumb widgets(widgets ngu độn =))) chỗ mà bạn có thể tái sử dụng UI mà không kèm logics trong nhiều vị trí khác nhau. Để chứng minh ví dụ, tôi cần hai active ViewModels trên màn hình. Ứng dụng giữa ác views sẽ là giống nhau một các chính xác. Trong **smart_widgets** folder tạo một folder mới gọi là **single_increase_counter**, bên trong tạo một file gọi là **single_increase_counter.dart** và **single_increase_counter_viewmodel.dart**.

```
//single_increase_counter.dart
class SingleIncreaseCounter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<SingleIncreaseCounterViewModel>.reactive(
      builder: (context, model, child) => GestureDetector(
        onTap: model.updateCounter,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
          alignment: Alignment.center,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text(
                'Tap to increment the Counter',
                textAlign: TextAlign.center,
              ),
              Text(model.counter.toString())
            ],
          ),
        ),
      ),
      viewModelBuilder: () => SingleIncreaseCounterViewModel(),
    );
  }
}
```

Và ViewModel sẽ như này

```
// single_increase_counter_viewmodel.dart
class SingleIncreaseCounterViewModel extends BaseViewModel {
  final _counterService = locator<CounterService>();
  int get counter => _counterService.counter;

  void updateCounter() {
    _counterService.incrementCounter();
    notifyListeners();
  }
}
```

Rồi chúng ta sẽ lặp lại quá trình cho **DoubleIncreaseCounter**. Copy folder trên smart widgets gọi là **single_increase_counter** và đổi tất cả tên từ single thành double. Nó sẽ trông giống ntn khi chúng ta hoàn thành.

<div align="center"><img src="https://images.viblo.asia/ceb665b6-2158-47c0-b365-eff3f4ada501.png" /></div><br />

Rồi bạn có thể cập nhật bên trong cho nó như thế này:

```
// double_increase_counter.dart
class DoubleIncreaseCounter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<DoubleIncreaseCounterViewModel>.reactive(
      builder: (context, model, child) => GestureDetector(
        onTap: model.updateCounter,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.yellow,
          alignment: Alignment.center,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text(
                'Tap to double the Counter',
                textAlign: TextAlign.center,
              ),
              Text(model.counter.toString())
            ],
          ),
        ),
      ),
      viewModelBuilder: () => DoubleIncreaseCounterViewModel(),
    );
  }
}
```

Và đối với **ViewModel** chúng ta sẽ thay đổi chức năng chúng ta gọi trong Service nhằm gọi **doubleCounter**.

```
// double_increase_counter_viewmodel.dart
class DoubleIncreaseCounterViewModel extends BaseViewModel {
  final _counterService = locator<CounterService>();
  int get counter => _counterService.counter;

  void updateCounter() {
    _counterService.doubleCounter();
    notifyListeners();
  }
}
```

Sau đó chúng ta phải tạo counter service cùng với các functions cho nó. Trong thư mục services tạo một service mới gọi là **CounterService**. Chạy câu lệnh nhằm sinh ra locator injection bên dưới hoặc thêm nó vào locator của bạn giống như: locator.registerLazySingleton(() => CounterService()).

```
flutter pub run build_runner build --delete-conflicting-outputs
```

```
@lazySingleton
class CounterService {
  int _counter = 0;
  int get counter => _counter;

  void incrementCounter() {
    _counter++;
  }

  void doubleCounter() {
    _counter *= 2;
  }
}
```

### Solution to Problem
Cuối cùng bây giờ tôi có thể trình bạy vấn đề cho bạn rằng stacked làm cho nó trở nên dễ dàng hơn. Nếu bạn run code bây giờ với **ReactiveExampleView** như là home layout bạn sẽ thấy nếu bạn nhấn vào blue counter giá trị sẽ tăng lên nhưng counter ở bên phải không thay đổi, mặc dù chúng đang sử dụng cùng một giá trị từ service. Chúng ta cần tất cả các ViewModels sử dụng service đơn giản này nhằm cập nhật mỗi khi giá trị thay đổi. Đây là nơi các tính năng reactive được đặt. Nó được lặp lại lần đầu theo đúng nghĩa đen của nó do đó bất cứ phản hồi hoặc trợ giúp nhằm tạo cho nó hoàn thiện hơn trong tương lai sẽ được đánh giá cao. Đây là các bước nhằm tạo cho giá trị trong service có thể phản hồi.
#### 1. Trộn lại trong ReactiveServiceMixin.
#### 2. Gói giá trị để xử dụng trong một RxValue.
#### 3. gọi **listenToReactiveValues** và truyền tất cả các giá trị react vào.

RxValue đến từ một package cái tôi có thể merge vào stacked cho tính năng reactive và gọi nó ở một đâu đó. Nó là một package cái không được bảo trì ở thời điểm hiện tại nhưng tính năng hiện tại là đủ để thể hiện cái chúng ta cần thực hiện. Trong pubspec thêm vào observable-ish package:

```
observable_ish:
```

Sau đó chúng ta có thể cập nhật **CounterService** để nó trở thành reactive. Tôi đã thêm vào comment numbers cho các thay đổi bạn phải tạo. Bạn cũng có thể sử dụng .value nơi bạn muốn value thay cho việc gọi trực tiếp _counter.

```
@lazySingleton
class CounterService with ReactiveServiceMixin { // 1
  // 2
  RxValue<int> _counter = RxValue<int>(initial: 0);

  CounterService() {
    //3
    listenToReactiveValues([_counter]);
  }

  int get counter => _counter.value;

  void incrementCounter() {
    _counter.value++;
  }

  void doubleCounter() {
    _counter.value *= 2;
  }
}
```

Vấn đề tiếp theo cần đảm bảo ViewModel phản ứng lại với các thay đổi trong service này. Để thêm cái này chúng ta sử dụng **ReactiveViewModel**. Thay **SingleIncreaseCounterViewModel** và **DoubleIncreaseCounterViewModel** nhằm kế thừa **ReactiveViewModel** thay cho **BaseViewModel**. Điều này đòi hỏi bạn cần ghi đè **reactiveService** getter. Trong danh sách chúng ta cung cấp **_counterService**.

```
class SingleIncreaseCounterViewModel extends ReactiveViewModel { // extend from ReactiveViewModel
  @override
  List<ReactiveServiceMixin> get reactiveServices => [_counterService]; // add counter service as reactive service
  ...
}
```

Làm điều tương tự một cách chính xác đối với **DoubleIncreaseCounterViewModel** và chạy mã nguồn. Bạn sẽ thấy giờ đây khi bạn tap vào một cái nhằm tăng giá trị lên thì các widgets khác sẽ rebuild một các tương tự. Giờ đây, một lần nữa, tương tự như với reactive constructor của ViewModel bạn không phải tạo đồng thời tạo các reactive ViewModels, chỉ cho cái bạn cần phản ứng lại với các thay đổi trong services. Một số ViewModel không phải làm như vậy chúng ta có thể giữ nguyên **BaseViewModels**. Điều này là cơ bản và là tính năng hữu ích cần có trong ứng dụng. Tôi đã rất hào hứng về khi nó được sử dụng trong quá trình phát triển. Hãy chuyển tới một số mã nguồn mẫu của tính năng được loại bỏ.

## Getting Data From a Future
Nếu bạn có một ViewModel cái phụ thuộc hoàn toàn vào một Future đang được chạy, lấy dữ liệu và trả chúng về cho bạn thì FutureViewModel là một sự hoàn hảo dành cho điều đó. ViewModel sẽ tự động chạy một future, thiết lập ViewModel thành đang hoạt động và rồi đẩy dữ liệu trả về vào một thuộc tính data của model cho bạn sử dụng. Nó sẽ được rebuilt khi future bắt đầu cũng như sau khi nó được hoàn thành. Trong thư mục views, tạo một folder mới gọi là **future_example**

```
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: Center(
                child: model.isBusy
                    ? CircularProgressIndicator()
                    : Text(model.data),
            ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

Và với ViewModel chúng ta có như bên dưới. Có một function gọi là **futureToRun** cái đòi hỏi phải được ghi đè và nó phải trả về loại mà được truyền vào trong **FutureViewModel**. Trong trường hợp này một string cái chúng ta sẽ nhận được sau 3 giây trì hoãn. Giá trị trả về sẽ được đặt trong một thuộc tính data. Như bạn thấy trong UI bên trên, chúng ta hiển thị một progress indicator trong khi **.isBusy** là true, cái sẽ tự động được thiết lập thành false khi mà future được hoàn thành. Hoặc khi một lỗi xảy ra. Do đó hãy thảo luận thêm về việc xử lý lỗi trong ViewModel của chúng ta.

```
class FutureExampleViewModel extends FutureViewModel<String> {
  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    return 'This is fetched from everywhere';
  }

  @override
  Future<String> futureToRun() => getDataFromServer();
}
```

Bạn có thể thay đổi ViewModel thành như này

```
class FutureExampleViewModel extends FutureViewModel<String> {
  Future<String> getDataFromServer() async {
    await Future.delayed(const Duration(seconds: 3));
    throw Exception('This is an error');
  }

  @override
  void onError(error) {
    // error thrown above will be sent here
    // We can show a dialog, set the error message to show on the UI
    // the UI will be rebuilt after this is called so you can set properties.
  }

  @override
  Future<String> futureToRun() => getDataFromServer();
}
```

Khi lỗi được ném ra thì thuộc tính **hasError** sẽ được thiết lập thành true do đó bạn có thể hiển thị một UI khác. Hãy xem làm thế nào điều đó được thể hiện trong mã nguồn.

```
class FutureExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<FutureExampleViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: model.hasError
            ? Container(
                color: Colors.red,
                alignment: Alignment.center,
                child: Text(
                  'An error has occered while running the future',
                  style: TextStyle(color: Colors.white),
                ),
              )
            : Center(
                child: model.isBusy
                    ? CircularProgressIndicator()
                    : Text(model.data),
              ),
      ),
      viewModelBuilder: () => FutureExampleViewModel(),
    );
  }
}
```

Điều này sẽ hoán đổi UI sang trạng thái lỗi một cách hoàn toàn. nhưng có một vài cách thức khác tế nhị hơn để hiển thị cho người dùng khi một lỗi xảy ra. Hãy di chuyển tới cái mà mọi người yêu thích đó là **Streams**.

## Listening to and reacting to Streams.
Tương tự như Future bên trên, chúng ta cũng sẽ có **StreamViewModel** cái cho phép bạn thực hiện những điều tương tự như thay thế vào đó là một Stream. Trong thư mục views, tạo một thư mục mới gọi là **stream_example**, bên trong tạo một file gọi là **stream_example_view.dart** và **stream_example_viewmodel.dart**.

```
// stream_example_view.dart
class StreamExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<StreamExampleViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: Center(
          child: Text(model.title),
        ),
      ),
      viewModelBuilder: () => StreamExampleViewModel(),
    );
  }
}
```

Và ViewModel

```
class StreamExampleViewModel extends StreamViewModel<int> {
  String get title => 'This is the time since epoch in seconds \n $data';

  @override
  Stream<int> get stream => epochUpdatesNumbers();

  Stream<int> epochUpdatesNumbers() async* {
    while (true) {
      await Future.delayed(const Duration(seconds: 2));
      yield DateTime.now().millisecondsSinceEpoch;
    }
  }
}
```

Điều này sẽ tự động rebuild ViewModel mỗi khi một giá trị mới được emmit(bắn ra) từ **epochUpdatesNumbers** stream. Cũng có một phương thức **onError** có thể ghi đè theo một thuộc tính **hasError** cái sẽ giúp bạn xác định nếu một lỗi xảy ra. Streams sẽ tự động huỷ mỗi khi ViewModel bị dừng lại. Quá trình huỷ(dispose) này bị dàng buộc với vòng đời của các widgets.

Một gói các tính năng mở rộng là sẽ có đối với Stream cái xuất phát từ ý tưởng về sự thay đổi của Stream. Đối với thể hiện của một số thứ như firebase bạn tạo một truy vấn bằng một stream rồi cập nhật truy vấn đó thì sẽ cần tới ViewModel để cập nhật nguồn của stream đó. Cách thức tương tự chúng ta có một **notifyListeners** nhằm rebuild UI chúng ta có **notifySourceChanged** nhằm nói cho ViewModel về việc nguồn(source) của stream đã được cập nhật đó. Cái này sẽ tự động được huỷ bỏ cho stream hiện tại, lắng như một stream mới và rồi thiết lập dữ liệu cho các giá trị mới giống như những gì chúng ta đã đi qua. Chúng ta có thể hiển thị nhanh chóng làm thế nào để thực hiện điều đó nếu chúng ta nhân đôi stream function và tạo cho nó emit data nhanh hơn, rồi chúng ta có thể hoán đổi giữa hai cái.

```
class StreamExampleViewModel extends StreamViewModel<int> {
  String get title => 'This is the time since epoch in seconds \n $data';

  bool _otherSource = false;

  @override
  Stream<int> get stream => _otherSource ? epochUpdates() : epochFasterUpdates();

  void swapSources() {
    _otherSource = !_otherSource;
    notifySourceChanged();
  }

  Stream<int> epochUpdates() async* {
    while (true) {
      await Future.delayed(const Duration(seconds: 2));
      yield DateTime.now().millisecondsSinceEpoch;
    }
  }

  Stream<int> epochFasterUpdates() async* {
    while (true) {
      await Future.delayed(const Duration(milliseconds: 500));
      yield DateTime.now().millisecondsSinceEpoch;
    }
  }
}
```

Trong View, chúng ta có thể thêm vào một số UI nhằm gọi tính năng này.

```
class StreamExampleView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<StreamExampleViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: Center(
          child: Text(model.title),
        ),
        floatingActionButton: MaterialButton(
          child: Text('Change Stream Srouces'),
          onPressed: model.swapSources,
        ),
      ),
      viewModelBuilder: () => StreamExampleViewModel(),
    );
  }
}
```

Nếu bạn nhấn vào text button ở phía dưới bên phải, bạn sẽ thấy số được cập nhật nhanh hơn và rồi trở lại sau 2 giây. ViewModel này tạo rất nhiều quá trình triển khai stream theo cách thức rõ ràng hơn, và theo cá nhân tôi chúng ta có thể tái cấu trúc 3 sản phẩm mã nguồn cơ bản(code bases) nhằm sử dụng Stacked và sử dụng chúng nhằm xoá bỏ một số mã nguồn không cần thiết trong đó. Để giữ cho nội dung bài viết được đơn giản chúng ta sẽ dừng lại ở đây.

## Source
https://www.filledstacks.com/post/flutter-state-management-with-stacked/

## Reference

**[github repo](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))