***Note***: Tuyển tập bài viết được dịch từ trang **[filledstacks.com](https://www.filledstacks.com/)** về chủ đề ứng dụng **Stacked State Management** vào một ứng dụng Flutter.

Một trong những vấn đề quan trọng trong quá trình phát triển ứng dụng di động đó là khả năng điều hướng người dùng dựa trên phiên sử dụng trước đó. Điều này giúp duy trì mức độ tương tác cao và đảm bảo người dùng của bạn bắt đầu tại một vị trí phù hợp. Hôm nay chúng ta sẽ viết một số đoạn code cái tuân theo một số quy tắc:

1. Khi người dùng không có bất cứ session nào trên ổ đĩa(Chưa có session nào được lưu lại), chúng ta sẽ đi tới màn LoginView.
2. Khi người dùng có một session trên ổ đĩa(đã được lưu trữ):
    * Chúng ta sẽ thử đồng bộ thông tin người dùng: Nếu người dùng không có địa chỉ mặc định, chúng ta sẽ đưa họ tới phần chọn địa chỉ.
    * Nếu họ đã làm điều đó rồi chúng ta đưa họ tới màn hình trang chủ(Home/Main view).

Đó là tất cả những gì chúng ta sẽ thực hiện trong hôm nay, nhưng chúng ta sẽ thực hiện đó theo cách thức để lấy được nhiều lợi ích nhất. Không chỉ đối với chất lượng mã nguồn mà còn cả đối với vấn đề hiệu năng. Chúng ta sẽ viết chúng theo phương pháp TDD. Chúng ta không thực hành chính xác TDD nhưng nó sẽ giúp chúng ta triển khai một số tính năng đáng sợ cái chúng ta phải nắm được. Nó không chỉnh cung cấp các phản hồi ngay lập tực mà còn cung cấp sự an toàn thực sự trong quá trình phát triển nhằm đáp ứng tốt nhu cầu tái cấu trúc(refactor) nếu bạn có một ý tưởng tốt hơn trong tâm trí.

## Setting up for Unit Tests.
Nếu bạn mở Customer Application bạn sẽ thấy rằng chúng ta không thiết lập cho quá trình kiểm thử. Chúng ta sẽ bắt đầu bằng cách thêm thư viện giả lập(mocking libaries) cái chúng ta sẽ sử dụng gọi là mockito. Bạn có thể thêm gói này vào **pubspec.yaml** trên đoạn **dev_dependencies**

```
dev_dependencies:
	...
	# Testing
	mockito:
```

Sau khi thêm cái này chúng ta có thể bắt đầu thiết lập quá trình kiểm thử cho mình. Trong thư mục test, tạo một folder mới gọi là **helpers**. Bên trong thư mục đó tạo một file mới gọi là **test_helpers.dart**. Dựa trên mã nguồn cơ bản chúng ta đã biết chúng ta sẽ viết tests cho **StartupViewModel** và **service** cái sẽ được sử dụng dựa trên các trường hợp trước đó là **UserService** và **NavigationService**. Nếu bạn cần một sự giải thích đầu đủ về unit testing có thể xem thêm **How to Mock**. Hiện tại chúng ta sẽ không đi sâu vào vấn đề đó.

### Setting up Testing Mocks.
Trong file **test_helpers.dart** bạn có thể thêm vào **GenerateMocks** annotation và thêm vào **MockSpec** cho **UserService** và **NavigationService**.

```
@GenerateMocks([], customMocks: [
  // If we don't supply returnNullOnMissingStub then we'll get an exception when
  // a non-stubbed method is called.
  MockSpec<UserService>(returnNullOnMissingStub: true),
  MockSpec<NavigationService>(returnNullOnMissingStub: true),
])
```

Sau khi thêm cái này bạn có thể chạy:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Nếu bạn không có câu lệnh đó thì hãy thêm vào **build_runner** cho **dev_dependencies** của mình. Cái này sẽ sinh ra các phần giả lập(mocks) cho chúng ta trong một file gọi là **test_helps.mocks.dart**. Bước tiếp theo là tạo các phương thức trợ giúp nhằm tạo các giả lập(mocks) và đăng kí nó với **locator** của chúng ta. Chúng ta sẽ tạo một phương thức helper đầu tiên nhằm xoá một quá trình đăng kí từ một **locator** nếu nó đã tồn tại. Điều này nhằm đảm bảo chúng ta không có bất cứ việc lặp lại quá trình đăng kí nào khác cho một service trong locator.

```
void _removeRegistrationIfExists<T extends Object>() {
  if (locator.isRegistered<T>()) {
    locator.unregister<T>();
  }
}
```

Tôi đã thêm vào một số đoạn snippets mới vào **Stacked Snippets** cái sẽ trợ giúp chúng ta một xíu trong quá trình thiết lập. Đầu tiên, chúng ta sẽ sử dụng **testr** cái là phương thức chúng ta sẽ sử dụng để đăng kí mock của mình với **locator** nhằm sử dụng trong các unit tests. Chúng ta sẽ tạo mocks cho **UserService** và **NavigationService**.

```
UserService getAndRegisterUserService() {
  _removeRegistrationIfExists<UserService>();
  final service = MockUserService();
  locator.registerSingleton<UserService>(service);
  return service;
}

NavigationService getAndRegisterNavigationService() {
  _removeRegistrationIfExists<NavigationService>();
  final service = MockNavigationService();
  locator.registerSingleton<NavigationService>(service);
  return service;
}
```

Khi chúng ta có chúng, chúng ta cần tạo các phương thức trợ giúp cái chúng ta sẽ sử dụng để đăng kí cho tất cả các services hoặc huỷ đăng kí tất cả các services. Đây là những phương thức chúng ta sử dụng trong nhóm kiểm thử chính nhằm đảm bảo rằng chúng ta không phải đăng kí service bằng tay cái chúng ta không cần sử dụng trong acvite unit test(Kiểm thử kích hoạt).

```
void registerServices() {
  getAndRegisterUserService();
  getAndRegisterNavigationService();
}

void unregisterService() {
  locator.unregister<UserService>();
  locator.unregister<NavigationService>();
}
```

Với chúng, chúng ta đã sẵn sàng viết một unit test cho mình.

### Writing a Unit Test.
Chúng ta sẽ bắt đầu với bước đầu tiên trong business logic chúng ta đã đề cập bên trên. Khi một user không có một session(phiên sử dụng) trên ổ đĩa, chúng ta sẽ di chuyển tới màn hình login. Trong thư mục test tạo một folder mới gọi là **viewmodel_tests** và bên trong tạo một file mới gọi là **startup_viewmodel_test.dart**. Sau đó chúng ta sẽ sử dụng một snippets xịn xò khác. Snippets này sẽ tạo thiết lập unit test chính và gọi các phương thức trợ giúp register và unregisterServices. Bạn sẽ gõ: **testmr** và bạn sẽ nhận được như bên dưới:

```
import 'package:flutter_test/flutter_test.dart';

void main() {
 group('StartupViewmodelTest -', (){
  setUp(() => registerServices());
  tearDown(() => unregisterService());
 });
}
```

trong phương thức **tearDown** bạn có thể gõ **testg** và tạo **runStartupLogic** test phù hợp.

```
...
tearDown(() => unregisterService());

group('runStartupLogic -', () {
 test('', () {

 });
});
```

Kiểm thử đầu tư chúng ta cần là đảm bảo chúng ta đang kiểm tra nếu một người dùng đã đăng nhập và sử dụng thuộc tính **hasLoggedInUser** của **userService**. Mọi test tiếp theo sẽ được viết trong **runStartupLogic** phù hợp với hướng dẫn này. Như vậy chúng ta sẽ có một test case như thế này:

```
test(
    'When called should check if we have a logged in user on UserService',
    () async {
  final userService = getAndRegisterUserService();
  var model = StartUpViewModel();
  await model.runStartupLogic();
  verify(userService.hasLoggedInUser);
});
```

Nhưng nếu bạn chú ý rằng nó vẫn chưa tồn tại, trong TDD nghiệm ngặt điều đó chỉ ra rằng đó cũng là một kiểm thử lỗi. Như vậyc húng ta sẽ thêm vào một thuộc tính mới. Mở **UserService** và thêm vào:

```
/// Returns true if this device has a user that is logged into the BoxtOut backend
bool get hasLoggedInUser => _firebaseAuthenticationService.hasUser;
```

Sau khi thêm thuộc tính này vào chúng ta cần sinh lại các giả lập của mình bằng **build_runner** bằng cách gõ lại câu lệnh.
> Khi bạn run cái này nó sẽ lỗi, bởi vì chúng ta vẫn chưa thực hiện bất cứ điều gì. Để thực thi test dễ dàng hơn gõ: **ctrl_shift+p** và gõ: **Dart: Run All Tests** và nhấn enter. Để tăng tốc điều này, gõ **Dart: Run All Tests** và click vào biểu tượng ở ngoài cùng bên phải. Rồi bạn có thể gắn một phím cho nó. Đối với tôi đó là **ctrl+k, ctrl+r** để chạy tests. Bây giờ chúng ta phải gặp lỗi, rồi sau đó sẽ làm cho nó qua.

Mở **StartUpViewModel** và chúng ta sẽ làm cho nó vượt qua các kiểm thử.

```
class StartUpViewModel extends BaseViewModel {
  final log = getLogger('StartUpViewModel');

	final _userService = locator<UserService>();
	
	Future<void> runStartupLogic() async {
		if (_userService.hasLoggedInUser) {
			// Do logged in stuff
		} else {
			// Do logged out stuff
  }
}
```

Chúng ta đơn giản chỉ lấy **userService** từ **locator** và rồi kiểm tra nếu **hasLoggedInUser** là true hay false.

Bây giừo nếu bạn nhấn **ctrl+k,r** thì bạn sẽ thấy nó vẫn bị lỗi. Lý do cho điều đó là vì thuộc tính trả về null cho việc giả lập. Do đó hãy khai thác thuộc tính đó và sử dụng nó như vậy chúng ta có thể thiết lập nó bất cứ lúc nào chúng ta cần cho các unit test của mình. Mở file **test_helps.dart** và cập nhật phương thức giả lập **UserService**.

```
UserService getAndRegisterUserService({
  bool hasLoggedInUser = false,
}) {
  _removeRegistrationIfExists<UserService>();
  final service = MockUserService();

  when(service.hasLoggedInUser).thenReturn(hasLoggedInUser);

  locator.registerSingleton<UserService>(service);
  return service;
}
```

Ở đây chúng ta đơn giản cho phép bạn truyền giá trị **hadLoggedInUser** và khi một kiểm thử gọi **.hasLoggedInUser** chung ta trả về giá trị đó. Nếu bạn chạy các tests của mình bây giờ nó sẽ pass. Kiểm thử tiếp theo, vẫn liên quan tới trường hợp trên đó là kiểm tra nếu **hasLoggedInUser** là false, thì chúng ta di chuyển tới màn hình **LoginView**.

```
test('When we have no logged in user, should navigate to the LoginView',
    () async {
  final navigationService = getAndRegisterNavigationService();
  getAndRegisterUserService(hasLoggedInUser: false);
  var model = StartUpViewModel();
  await model.runStartupLogic();
  verify(navigationService.replaceWith(Routes.loginView));
});
```

Chạy kiểm thử nhằm kiểm tra hành vi có tồn tại hay không. Đây là một bài thực hành tốt bởi vì tôi đã khám phá ra điều đó khi làm việc trong một dự án với mã nguồn lớn, thỉnh thoảng hành vi bạn muốn triển khai tồn tại trong các ngữ cảnh không ngờ tới. Do đó, nó là tốt nhằm kiểm tra xem test đó là lỗi hay pass trước khi viết bất cứ mã nguồn nào khác. Điều này cũng đảm bảo rằng mã nguồn bạn viết thực sự giải quyết được vấn đề. Hãy thêm vào mã nguồn như này:

```
class StartUpViewModel extends BaseViewModel {

...
final _navigationService = locator<NavigationService>();

Future<void> runStartupLogic() async {
	if (_userService.hasLoggedInUser) {
		// Do logged in stuff
	} else {
		log.v('No user on disk, navigate to the login view');
		_navigationService.replaceWith(Routes.loginView);
  }
}
```

Chúng ta import **NavigationService** và trong góc nhìn của view chúng ta gọi **replaceWith** trên navigation service và truyền vào **loginView**. Nếu bạn thực thi tests bây giờ bạn sẽ thấy tất cả các tests đều pass. Tại thời điểm này, tôi muốn tái cấu trúc một chút nhằm đảm bảo giảm thiểu các dòng code gây bất tiện.

### Unit Test Maintenance.
Vấn đều đầu tiên tôi muốn làm, đặc biệt trong quá trình kiểm thử ViewModel là tạo một phương thức trợ giúp cái thực hiện việc khởi tạo ViewModel. Với cách thức này nếu constructor này thay đổi thì bạn không phải cập nhật lại các unit tests của mình bằng tay, và có thể chỉ cập nhật ở một vị trí. Như vậy chúng ta sẽ tạo một phương thức mới gọi là **_getModel** cái khởi tạo và trả về view model cho chúng ta.

```
StartUpViewModel _getModel() => StartUpViewModel();
```

Rồi bạn có thể thay thế quá trình khởi tạo bằng tay trong các test cases bằng **_getViewModel()**.

## Startup Logic Implementation
Để gói cái này này bạn có thể hoàn thành 3 phần cuối của business logic. Chúng ta sẽ viết một test cái kiểm tra rằng nếu chúng ta có **loggedInUser** chúng ta gọi **syncUserAccount** trên user service.

```
test(
    'When hasLoggedInUser is true, should call syncUserAccount on the userService',
    () async {
  final userService = getAndRegisterUserService(hasLoggedInUser: true);
  var model = _getModel();
  await model.runStartupLogic();
  verify(userService.syncUserAccount());
});
```

Chạy cái này sẽ fail, nhưng khi thêm vào đoạn code dưới đây nó sẽ pass:

```
Future<void> runStartupLogic() async {
	if (_userService.hasLoggedInUser) {
		log.v('We have a user session on disk. Sync the user profile ... ');
    await _userService.syncUserAccount();

	} else {
		log.v('No user on disk, navigate to the login view');
		_navigationService.replaceWith(Routes.loginView);
  }
}
```

Sau đó chúng ta cần lấy **currentUser** từ UserService, cái sẽ chỉ được thực hiện nếu chúng ta có một **loggedInUser**.

```
test('When hasLoggedInUser is true, should get currentUser from userService',
    () async {
  final userService = getAndRegisterUserService(hasLoggedInUser: true);
  var model = _getModel();
  await model.runStartupLogic();
  verify(userService.currentUser);
});
```

Nếu bạn thực thi test case này nó sẽ fail. Trong phương thức **runStartupLogic** chúng ta có thể lấy về **currentUser** bằng cách sử dụng những dòng dưới đây:

```
...
log.v('We have a user session on disk. Sync the user profile ... ');
await _userService.syncUserAccount();

final currentUser = _userService.currentUser;
log.v('User sync complete. User Profile: $currentUser');
```

Ngày cả nếu bạn chạy test này bây giờ nó vẫn sẽ fail. Bạn cần làm gì để thiết lập mock(giả lập) nhằm trả về một giá trị cho **currentUser**.

```
UserService getAndRegisterUserService({
  bool hasLoggedInUser = false,
  User? currentUser,
}) {
  _removeRegistrationIfExists<UserService>();
  final service = MockUserService();

  when(service.hasLoggedInUser).thenReturn(hasLoggedInUser);
  when(service.currentUser).thenReturn(currentUser ??
      User(
        id: 'default_user',
        email: 'no@email.com',
      ));

  locator.registerSingleton<UserService>(service);
  return service;
}
```

Hiện tại, test này sẽ pass. Bước cuối cùng nhằm xác định nơi chúng ta sẽ di chuyể tới dựa trên địa chỉ thiết lập có sẵn của user.

```
test(
    'When currentUser does not have an address, navigate to the AddressSelectionView',
    () async {
  final navigationService = getAndRegisterNavigationService();
  getAndRegisterUserService(hasLoggedInUser: true);
  var model = _getModel();
  await model.runStartupLogic();
  verify(navigationService.navigateTo(Routes.addressSelectionView));
});
```

Trong Startup ViewModel bạn có thể thêm vào:

```
if (currentUser.hasAddress) {
  log.v('We\'re ready to go! User has all the details to use the app');
  // navigate to the home view
} else {
  log.v('User still needs to select an address for delivery.');
  _navigationService.navigateTo(Routes.addressSelectionView);
}
```

Chúng ta phải thêm vào **defaultAddress** cho User Model trong **application_models.dart** cũng như giá trị mới **hasAddress**.

```
@freezed
class User with _$User {
  User._();

  factory User({
    required String id,
    String? email,
    String? defaultAddress,
  }) = _User;

  bool get hasAddress => defaultAddress?.isNotEmpty ?? false;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

Sinh lại mã nguồn, chạy unit tests và nó sẽ pass hết. Chúng ta không phải thiết lập homeView trong app đo dó chúng ta sẽ rời khỏi đây ngay bây giờ. Tôi đã đưa bạn đi qua toàn bộ tiến trình, cung cấp một số snippets mới, và một cách thức kiểm thử logic mà không cần phải chạy app cũng như hướng dẫn về một số loại TDD nếu bạn muốn.

## Source
https://www.filledstacks.com/post/practical-guide-to-unit-testing-in-flutter/

## Reference

**[Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))