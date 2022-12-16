## Kiến trúc trong Flutter

Hiện tại thì Flutter đang cung cấp cho chúng ta một bộ framework react-style khá giống React, một thư viện widget đồ sộ nhưng tìm mỏi mắt chắc chẳng ai tìm thấy cái guide official nào về architecture như bên Android.

Thực sự thì không có một cái architecture nào có thể đáp ứng được hết tất cả những mong muốn mà chúng ta vẽ ra. Nhưng trong thực tế thì phần lớn các ứng dụng di động được viết hiện nay đều có những chức năng cơ bản sau:

1. Trao đổi dữ liệu với network
2. Map, transform và chuẩn bị data để hiển thị cho user
3. Truy vấn cơ sở dữ liệu

Sau đây mình xin trình bày cách xây dựng một sample app sẽ xử lý các vấn đề tương tự như ở trên bằng cách sử dụng các kiến trúc thông dụng hiện nay.

Nói qua về app demo thì nó sẽ có một button "Load user data" ngay ở giữa màn hình . Khi người dùng ấn button thì dữ liệu sẽ bắt đầu được load bất đồng bộ và button sẽ được thay thế bằng một biểu tượng loading. Sau khi dữ liệu được load thì chúng ta sẽ thay cái biểu tượng loading đó bằng dữ liệu.

![](https://images.viblo.asia/caa64d47-be66-455a-988b-6238d6a9d3ce.gif)

Hãy cùng bắt đầu nhé ;)

## Data

Để cho ví dụ đơn giản thì mình sẽ tạo một class `Repository` có chứa method `getUser()` để giả lập việc lấy dữ liệu bất đồng bộ từ network và trả về object `Future<User>` với dữ liệu được fix cứng.

Nếu các bạn vẫn đang cảm thấy khá lạ lẫm với lập trình bất đồng bộ trong Dart thì các bạn có thể tìm hiểu thêm thông qua bài tutorial [này](https://www.dartlang.org/tutorials/language/futures) hoặc doc [này](https://api.dartlang.org/stable/2.1.0/dart-async/Future-class.html) nhé.

```dart
class Repository {
  Future<User> getUser() async {
    await Future.delayed(Duration(seconds: 2));
    return User(name: 'John', surname: 'Smith');
  }
}
```

```dart
class User {
  User({
    @required this.name,
    @required this.surname,
  });

  final String name;
  final String surname;
}
```



## Kiến trúc "thô"

Đầu tiên hãy cùng xây dựng ứng dụng trên bằng cách "tự nhiên" nhất có thể nhé. Chúng ta sẽ gọi màn đó là màn hình `VanillaScreen` nhé:

```dart
class VanillaScreen extends StatefulWidget {
  VanillaScreen(this._repository);
  final Repository _repository;

  @override
  State<StatefulWidget> createState() => _VanillaScreenState();
}

class _VanillaScreenState extends State<VanillaScreen> {
  bool _isLoading = false;
  User _user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vanilla'),
      ),
      body: SafeArea(
        child: _isLoading ? _buildLoading() : _buildBody(),
      ),
    );
  }

  Widget _buildBody() {
    if (_user != null) {
      return _buildContent();
    } else {
      return _buildInit();
    }
  }

  Widget _buildInit() {
    return Center(
      child: RaisedButton(
        child: const Text('Load user data'),
        onPressed: () {
          setState(() {
            _isLoading = true;
          });
          widget._repository.getUser().then((user) {
            setState(() {
              _user = user;
              _isLoading = false;
            });
          });
        },
      ),
    );
  }

  Widget _buildContent() {
    return Center(
      child: Text('Hello ${_user.name} ${_user.surname}'),
    );
  }

  Widget _buildLoading() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}
```

Do state của widget có thể thay đổi nhiều lần trong suốt vòng đời của nó nên chúng ta sẽ để nó extends `StatefulWidget`. Việt implement stateful widget còn yêu cầu chúng ta phải có class `State`. Trường bool `isLoading` và User `_user` trong class `_VanillaScreenState` sẽ đại diện cho state của widget. Cả 2 trường đó đều sẽ được khởi tạo trước  khi phương thức `build(BuildContext context)` được gọi

Khi mà object widget state được tạo thì phương thức `build(BuildContext context)` sẽ được gọi để build UI. Tất cả các logic quyết định việc UI được build như nào để thể hiện state hiện tại của widget thì cũng sẽ được thực hiện ngay trong đoạn code khai báo UI:

```dart
body: SafeArea(
  child: _isLoading ? _buildLoading() : _buildBody(),
)
```

Nhằm mục đích hiển thị biểu tượng loading khi người dùng click vào "Load user details" chúng ta sẽ làm như sau:

```dart
setState(() {
  _isLoading = true;
});
```

Chú ý: Việc gọi hàm `setState()` sẽ báo hiệu cho framework biết rằng state bên trong của object đó đã thay đổi và do việc đó có thể dẫn đến thay đổi UI nên framework sẽ quyết định lập lịch để build lại cái State object đó.

Điều đó có nghĩa là sau khi gọi phương thức `setState()` thì phương thức `build(BuildCOntext context)` sẽ được gọi lại bởi framework một lần lữa và điều này dẫn đến việc **cả cây widget sẽ được build lại**. Cụ thể là khi `_ísLoading` được set thành `true` thì `_buildLoading()` sẽ được gọi thay vì `_buildBody()` và biểu tượng loading sẽ được hiển thị. Điều tương tự cũng sẽ xảy ra khi khi chúng ta xử lý callback từ `getUser()` và gọi `setState()` để reassign lại giá trị cho trường `isLoading` và `_users`:

```dart
widget._repository.getUser().then((user) {
  setState(() {
    _user = user;
    _isLoading = false;
  });
});
```

### Ưu điểm

1. Dễ học và dễ hiểu

2. Không yêu cầu thư viện của bên thứ ba


### Nhược điểm

1. Cả cây widget sẽ bị rebuild mỗi khi state của widget thay đổi.
2. Nó đang phá vỡ quy tắc single responsibility. Bởi widget không chỉ chịu trách nhiệm việc dựng UI và còn chịu trách nhiệm trong việc load data, business logic và quản lý state.
3. Quyết định trong việc với mỗi state nên được thể hiện dưới dạng UI như thế nào đang được thực hiện ngay trong code khai báo UI. Nếu state của chúng ta càng phức tạp thì việc đọc code sẽ càng phức tạp.


## Scoped Model

Scoped Model là gói thư viện của bên thứ ba không có trong framework của Flutter. Đây là đặc tả chung cho thư viện này:

```text\
Nó là một tập các tiện ích cho phép chúng ta dễ dàng truyền data Model từ widget cha xuống cho các hậu duệ của nó. Ngoài ra thì nó cũng sẽ rebuild các widget con mà sử dụng model trong trường hợp mà model được cập nhật. Thư viện này được trích xuất trực tiếp từ codebase của Fuchsia.
```

Bây giờ chúng ta sẽ cùng nhau xây dựng lại màn hình vừa rồi nhưng sử dụng Scoped Model nhé. Đầu tiên thì chúng ta sẽ cần install thư viện Scoped Model bằng cách thêm scoped_model vào `pubspec.yaml` ở phần dependencies:

```yaml
scoped_model: ^1.0.1
```

Chúng ta hãy cùng nhau xem widget `UserModelScreen` và so sánh nó với ví dụ trước đó nhé. Trong  `UserModelScreen` nếu chúng ta muốn làm cho model  khả dụng trong tất cả các widget con thì sẽ chúng ta sẽ phải wrap nó với một generic ScopedModel và  truyền vào đó một widget và một model.

```dart
class UserModelScreen extends StatefulWidget {
  UserModelScreen(this._repository);
  final Repository _repository;

  @override
  State<StatefulWidget> createState() => _UserModelScreenState();
}

class _UserModelScreenState extends State<UserModelScreen> {
  UserModel _userModel;

  @override
  void initState() {
    _userModel = UserModel(widget._repository);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModel(
      model: _userModel,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Scoped model'),
        ),
        body: SafeArea(
          child: ScopedModelDescendant<UserModel>(
            builder: (context, child, model) {
              if (model.isLoading) {
                return _buildLoading();
              } else {
                if (model.user != null) {
                  return _buildContent(model);
                } else {
                  return _buildInit(model);
                }
              }
            },
          ),
        ),
      ),
    );
  }

  Widget _buildInit(UserModel userModel) {
    return Center(
      child: RaisedButton(
        child: const Text('Load user data'),
        onPressed: () {
          userModel.loadUserData();
        },
      ),
    );
  }

  Widget _buildContent(UserModel userModel) {
    return Center(
      child: Text('Hello ${userModel.user.name} ${userModel.user.surname}'),
    );
  }

  Widget _buildLoading() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}
```

Trong ví dụ trước thì cả cây widget đã bị rebuild khi mà state của widget thay đổi. Câu hỏi đặt ra điều này có cần thiết không? Ví dụ như là `AppBar` không có gì thay đổi thì tốt nhất là không nên bị rebuild. Lý tưởng nhất thì chúng ta chỉ nên rebuild lại những widget mà cần update. Scoped Model sẽ giúp chúng ta làm được điều này.

Widget `ScopedModelDescendant<UserModel>`  được sử dụng để tìm `UserModel` trong cây widget. Nó sẽ được tự động rebuild bất cứ khi nào `UserModel` thông báo rằng có thay đổi xảy ra.

Có một cải thiện đáng kể nữa là `UserModelScreen` sẽ không phải chịu trách nhiệm về việc quản lý state và business logic.

Hãy cùng nhìn qua code của `UserModel` nhé:

```dart
class UserModel extends Model {
  UserModel(this._repository);
  final Repository _repository;

  bool _isLoading = false;
  User _user;

  User get user => _user;
  bool get isLoading => _isLoading;

  void loadUserData() {
    _isLoading = true;
    notifyListeners();
    _repository.getUser().then((user) {
      _user = user;
      _isLoading = false;
      notifyListeners();
    });
  }

  static UserModel of(BuildContext context) =>
      ScopedModel.of<UserModel>(context);
}
```

Bây giờ thì `UserModel` sẽ nắm giữ và quản lý các state. Để có thể thông báo cho listeners rằng có thay đổi diễn ra thì phương thức `notifyListeners()` cần được gọi.

### Ưu điểm

1. Business logic, việc quản lý state và code UI được phân ra riêng rẽ

2. Dễ học


### Nhược điểm

1. Yêu cầu thư viện bên thứ ba
2. Trong trường hợp model ngày càng trở nên phức tạp thì sẽ rất khó để có thể theo dõi khi nào thì nên gọi `notifyListeners()`


## BLoC

BLoC (Business Logic Components) là một pattern được khuyến nghị bởi Google. Nó tận dụng khả năng của `Stream` nhằm mục đích quản lý và propagate sự kiện state change.

**Với các Android developer:** Các bạn có thể hình dung `BLoC` object giống như `ViewModel` và `StreamController` giống như `LiveData`. Điều này sẽ làm cho đoạn code sau trở nên rất dễ hiểu bởi các bạn đã quá quen với mấy concept đó rồi:

```dart
class UserBloc {
  UserBloc(this._repository);

  final Repository _repository;

  final _userStreamController = StreamController<UserState>();

  Stream<UserState> get user => _userStreamController.stream;

  void loadUserData() {
    _userStreamController.sink.add(UserState._userLoading());
    _repository.getUser().then((user) {
      _userStreamController.sink.add(UserState._userData(user));
    });
  }

  void dispose() {
    _userStreamController.close();
  }
}

class UserState {
  UserState();
  factory UserState._userData(User user) = UserDataState;
  factory UserState._userLoading() = UserLoadingState;
}

class UserInitState extends UserState {}

class UserLoadingState extends UserState {}

class UserDataState extends UserState {
  UserDataState(this.user);
  final User user;
}
```

Chúng ta sẽ không cần phải có bất cứ lời gọi hàm nào để thông báo sự thay đổi đến các subscribers nữa mỗi khi state thay đổi.

Ở đây thì mình đã tạo ra 3 class để tượng trưng cho các state mà màn hình này có thể có:

- `UserInitState` là state khi mà user mở một màn hình với cái nút ở giữa màn.

- `UserLoadingState` là state mà biểu tượng loading sẽ được hiển thị khi mà dữ liệu đang được load.

- `UserDataState` là state khi mà dữ liệu đã được tải và hiển thị trên màn hình.


VIệc propagate sự thay đổi của state bằng cách này có thể cho phép chúng ta  có thể loại bỏ hết logic code ở phần khai báo UI. Trong ví dụ với Scoped Model thì chúng ta vẫn đang phải kiểm tra giá trị của `_isLoading`  để quyết định xem nên render widget nào. Còn trong trường hợp với BLoC thì chúng ta đang propagate state của màn hình và trách nhiệm duy nhất của widget `UserBlockScreen` là render UI cho state:

```dart
class UserBlocScreen extends StatefulWidget {
  UserBlocScreen(this._repository);
  final Repository _repository;

  @override
  State<StatefulWidget> createState() => _UserBlocScreenState();
}

class _UserBlocScreenState extends State<UserBlocScreen> {
  UserBloc _userBloc;

  @override
  void initState() {
    _userBloc = UserBloc(widget._repository);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bloc'),
      ),
      body: SafeArea(
        child: StreamBuilder<UserState>(
          stream: _userBloc.user,
          initialData: UserInitState(),
          builder: (context, snapshot) {
            if (snapshot.data is UserInitState) {
              return _buildInit();
            }
            if (snapshot.data is UserDataState) {
              UserDataState state = snapshot.data;
              return _buildContent(state.user);
            }
            if (snapshot.data is UserLoadingState) {
              return _buildLoading();
            }
          },
        ),
      ),
    );
  }

  Widget _buildInit() {
    return Center(
      child: RaisedButton(
        child: const Text('Load user data'),
        onPressed: () {
          _userBloc.loadUserData();
        },
      ),
    );
  }

  Widget _buildContent(User user) {
    return Center(
      child: Text('Hello ${user.name} ${user.surname}'),
    );
  }

  Widget _buildLoading() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }

  @override
  void dispose() {
    _userBloc.dispose();
    super.dispose();
  }
}
```

Code của `UserBlocScreen` thậm chí còn dễ hiểu hơn cả Scoped Model =)). Để lắng nghe các sự kiện state change thì chúng ta sẽ dùng [StreamBuilder](https://docs.flutter.io/flutter/widgets/StreamBuilder-class.html). `StreamBuilder` là một `StatefulWidget` có khả năng tự rebuild lại chính nó dựa trên snapshot gần nhất từ sự tương tác với [Stream](https://docs.flutter.io/flutter/dart-async/Stream-class.html).

### Pros

1. Không yêu cầu thư viện bên thứ ba.

2. Business logic, quản lý state và UI logic được phân ra riêng rẽ.

3. Sử dụng cơ chế reactive. Chúng ta không phải gọi thủ công các phương thức thông báo có sự thay đổi xảy ra như `notifyListeners()` như trong Scoped Model.


### Cons

Phải có hiểu biết về streams hoặc rxdart,

## Kết

Hi vọng qua những điều mình vừa viết các bạn đã có cái nhìn rõ hơn về các architect hiện hành trên Flutter. Hẹn gặp lại các bạn ở các bài viết sau.

Happy coding~

*Nguồn: https://habr.com/en/post/438524/*