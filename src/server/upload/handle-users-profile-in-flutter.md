***Note***: Tuyển tập bài viết được dịch từ trang **[filledstacks.com](https://www.filledstacks.com/)** về chủ đề ứng dụng **Stacked State Management** vào một ứng dụng Flutter.

Trong phần này của BoxOut chúng ta sẽ thiết lập Firebase Backend nhằm quản lý người dùng của mình cũng như thiết lập ứng dụng của mình nhằm xử lý những vấn đề liên quan tới user.

## Backend
Đối với phần backend chúng ta biết rằng cần sử dụng một **Users** collection. Collection này sẽ lưu giữ thông tin người dùng. Do chúng ta đang thao tác với NoSQL mà chúng ta không biết hết toàn bộ kiến trúc phía trước. Chúng ta có thể phát triển nó và thêm vào nếu về sau cần.

## Client Code
### Setting Up Our Models.
Trong phần **customer** chúng ta sẽ bằng đầu bằng cách tạo **UserModel** sử dụng Freezed và json_serializable. Chúng ta sẽ thêm các gói cần thiết vào cùng một lúc:

```
dependencies:
	...
	# data models
  freezed_annotation: ^0.14.1
  json_annotation: ^4.0.1

dev_dependencies:
	...
	# data models
  freezed: ^0.14.1+2
	json_serializable: ^4.1.0
```

Rồi trong thư mục **lib** chúng ta sẽ tạo một folder mới gọi là **models** và bên trong nó tạo một file mới gọi là **application_models.dart**.

```
import 'package:freezed_annotation/freezed_annotation.dart';

part 'application_models.freezed.dart';
part 'application_models.g.dart';

@freezed
class User with _$User {
  factory User({
    required String id,
    String? email,
  }) = _User;

factory User.fromJson(Map<String, dynamic> json) => 
_$UserFromJson(json);
}
```

Để tạo model đó chúng ta có thể thiết lập **[stacked_snippets](https://gist.github.com/FilledStacks/b57b77da10fdcb2d4d95a28de4a4ced4)** và gõ **frzjs** rồi nhấn tab. Cái này sẽ sinh ra mọi thứ cho bạn và cho phép bạn thay đổi tên model một cách dễ dàng. Đó là những gì cho model của mình. trước khi chúng ta bắt đầu sử dụng chúng hãy cập nhật file **app.dart** của mình nhằm sử dụng tính năng **StackedLogger**. Thêm một dòng **StackedLogger** vào annotation của mình.

```
@StackedApp(
  ...
  logger: StackedLogger(),
)
```

Khi điều này được hoàn thành bạn có thể chạy:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

### Using out models
Bây giờ chúng ta đã có model cần thiết hãy đi tới phần mã nguồn lấy về thông tin user từ backend.  Vấn đề đầu tiên chúng ta cần thực hiện là tạo một user document cho người dùng người đã đăng nhập. Có hai cách để thực hiện điều này:
1. Chúng ta tạo người dùng sử dụng một reactive function trên firebase.
2. Chúng ta tạo người dùng ở phía ngoài và tạo một document mới trên firebase.

Trong ngữ cảnh này, tôi thích lựa chọn số 2 bởi vì chúng ta sẽ cần toàn bộ model cục bộ. Do đó chúng ta sẽ tạo model của mình và rồi tạo một document mới trong **user collection** từ bên ngoài. Tiếp theo chúng ta phải tìm ra nơi chúng ta sẽ tạo user và logic đằng sau quá trình tạo user đó là gì. Hãy đi qua từng trường hợp:
* Khi chúng ta tạo một tài khoản mới, chúng ta cần tạo một người dùn mới sử dụng **userID** cái được trả về từ Firebase.
* Khi chúng ta đăng nhập, chúng ta sẽ kiểm tra trước, nếu có một user document với ID đó:
    * Nếu không có document với ID đó chúng ta sẽ tạo một cái mới.
    * Nếu có một document chúng ta cần đồng bộ thông tin đó.

Bởi vì cả hai trường hợp bên trên có cùng một kết quả đầu ra(Một document sẽ tồn tại và được tải về) chúng ta có thể viết logic cùng theo cách thức đó. Chúng ta biết rằng sau bất cứ quá trình xác thực(đăng nhập hoặc đăng kí) chúng ta phải lấy thông tin người dùng. Do đó chúng ta sẽ thêm vào luồng **AuthenticationViewModel** của mnhf. Chúng ta sẽ đóng gói tất cả tính năng vào **UserService**, nhưng trước đó chúng ta có thể tạo một **UserService** nhằm quản lý tất cả cho mình, chúng ta cần một cách thức để giao tiếp với Firestore Database.

### Creating the FirestoreApi
Tạo một folder mới **lib/api** và trong folder đó tạo một file mới gọi là **firestore_api.dart**. Dựa trên luồng chúng ta đã mô tả ở bên trên chúng ta sẽ tạo 2 functions liên quan tới user là:
* **createUser**: Tạo một user document mới trong database.
* **getUser**: Lấy về thông tin user từ **usersCollection** nếu một document theo user id đã tồn tại.

Đó là những chức năng cơ bản cái chúng ta sẽ xem xét trong UserService. Chúng ta có thể tạo một lớp gọi là **FirestoreApi** và chúng ta sẽ có logger và một **CollectionReference** tới users collection.

```
/// Contains the functionality to interact with the Firestore database
class FirestoreApi {
  final log = getLogger('FirestoreApi');
  final CollectionReference usersCollection =
      FirebaseFirestore.instance.collection("users");

}
```

Thêm vào firestore package vào pubspec.yaml của bạn.

```
cloud_firestore: ^1.0.6
```

Sau đó chúng ta có thể viết mã nguồn cho mỗi functions. Trước khi thực hiện chúng ta cần tạo một exception class cái chúng ta sẽ sử dụng cho **FirestoreApiExceptions** một cách cụ thể. Tạo một folder mới **lib/exceptions** và tỏng thư mục đó tạo một file mới gọi là **firestore_api_exception.dart**.

```
class FirestoreApiException implements Exception {
  final String message;
  final String? devDetails;
  final String? prettyDetails;

  FirestoreApiException({
    required this.message,
    this.devDetails,
    this.prettyDetails,
  });

  @override
  String toString() {
    return 'FirestoreApiException: $message ${devDetails != null ? '- $devDetails' : ''}';
  }
}
```

Lớp này trả ra một message(thông điệp thông thường), **devDetails** cái sẽ được sử dụng để gửi bất cứ thông tin chi tiết nào thành tại sao nó xảy ra và **prettyDetails** cái là một thông điệp vừa đủ để hiển thị cho người dùn nếu nó xảy ra. Bây giờ, chúng ta có thể triển khai function đầu tiên trong **FirestoreApi**.

### Create User
```
/// Creates a new user document in the [usersCollection]
  Future<void> createUser({required User user}) async {
    log.i('user:$user');

    try {
      final userDocument = usersCollection.doc(user.id);
      await userDocument.set(user.toJson());
      log.v('UserCreated at ${userDocument.path} ...');
    } catch (error) {
      throw FirestoreApiException(
        message: 'Failed to create new user',
        devDetails: '$error',
      );
    }
  }
```

Khá đơn giản như bạn thấy, chúng ta thoát đăng nhập người dùng rồi tạo một **DocumentReference** sử dụng id của họ(Từ firebase) như là document name. Một khi chúng ta có nó, chúng ta gọi thiết lập document và truyền trong user map. Nếu bất cứ điều gì lỗi xảy ra chúng ta bắt lỗi rồi throw **FirestoreApiException** của mình. Chúng ta sẽ cung cấp một message và rồi stack trace **devDetails**. Sẽ có nhiều chi tiết hơn khi chúng ta bắt đầu có thêm trải nghiệm về các exceptions khác.

### Get User
```
/// Returns a [User] from the [usersCollection] if the document exists
Future<User?> getUser({
  required String userId,
}) async {
  log.i('userId:$userId');

  if (userId.isNotEmpty) {
    final userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) {
      log.v('We have no user with id :$userId in our database');
      return null;
    }

    final userData = userDoc.data();
    log.v('User found.\nData:\n$userData');

    return User.fromJson(userData!);
  } else {
    throw FirestoreApiException(
        message:
            'Your userId passed in is empty. Please pass in a valid user id from your firestore database');
  }
}
```

Với function này chúng ta đơn giản lấy trực tiếp **userDoc** sử dụng **userId** được truyền lên. Nếu nó không tồn tại thì chúng ta throw ra một ngoại lệ, ngược lại chúng ta kết nối user đó với UserModel và rồi trả về dữ liệu. Đó là tất cả những gì chúng ta cần để bắt đầu xây dựng **UserService** của mình.

## Setting up a User Service
Lớp này được xác định nhằm xử lý bất cứ điều gì liên quan tới người dùng. Lớp này sẽ theo doi **currentUser**, nó sẽ đồng bộ user từ api nếu nó vẫn chưa được thiết lập và sẽ xác định nhằm tạo hay đồng bộ dữ liệu người dùng khi chúng ta vượt qua luồng xác thực. Tạo một file mới gọi là **user_service.dart** trong thư mục **lib/services**.

```
/// Provides all the functionality relating to the user logged in
class UserService {
  final log = getLogger('UserService');

  final _firestoreApi = locator<FirestoreApi>();
	final _firebaseAuthenticationService =
	      locator<FirebaseAuthenticationService>();
}
```

Chúng ta sẽ thêm vào cả firebase service và thiết lập cho logger, rồi bạn có thể thêm vào hai thuộc tính chúng ta sẽ sử dụng.

```
User? _currentUser;

/// Returns the [User] account for the user currently logged in
User get currentUser => _currentUser!;
```

Các thuộc tính này là cái chúng ta sẽ sử dụng nhằm kiểm tra cái chúng ta cần để đưa ra quyết định về sau. Sau đó, chúng ta sẽ thêm vào một function đểlaays tài khoản của user và thiết lập nó cho **_currentUser**.

### Syncing the User Account
```
Future<void> syncUserAccount() async {
  final firebaseUserId =
      _firebaseAuthenticationService.firebaseAuth.currentUser!.uid;

  log.v('Sync user $firebaseUserId');

  final userAccount = await _firestoreApi.getUser(userId: firebaseUserId);

  if (userAccount != null) {
    log.v('User account exists. Save as _currentUser');
    _currentUser = userAccount;
  }
}
```

Chúng ta lấy uid từ người dùng đã đăng nhập hiện tại, rồi chúng ta lấy tài khoản từ database nếu như nó tồn tại chúng ta sẽ lưu nó trong bộ nhớ để sử dụng trong các phiên sử dụng app lần sau.

### Sync or Create User Account
Function này sẽ thực hiện việc đồng bộ dữ liệu người dùng. Nếu không có gì nó sẽ tạo một tài khoản và rồi lưu nó vào **_currentUser** sau khi tạo nó.

```
/// Syncs the user account if we have one, if we don't we create it
Future<void> syncOrCreateUserAccount({required User user}) async {
  log.i('user:$user');

  await syncUserAccount();

  if (_currentUser == null) {
    log.v('We have no user account. Create a new user ...');
    await _firestoreApi.createUser(user: user);
    _currentUser = user;
    log.v('_currentUser has been saved');
  }
}
```

Nếu người dùng vẫn null sau quá trình thực thi việc đồng bộ thì chúng ta có thể đảm bảo rằng không có thông tin người dùng cho tài khoản đó và chúng ta phải tạo một cái.

## Handle User Account during Authentication Flow
Bây giờ chúng ta có tất cả công cụ cần thiết để xây dựng luồng xác thực của mình. Chúng ta có thể thêm nó vào trong **AuthenticationViewModel** của mình. Chúng ta sẽ cập nhật **_handleAuthenticationResponse** nhằm trả về một **Future\<void\>** rồi trước khi chúng ta di chuyển tới màn thành công chúng ta nên gọi **syncOrCreateUserAccount**. Với cách thức này chúng ta biết 100% rằng chúng ta sẽ có một user account khi chúng ta di chuyển tới view này. Chúng ta sẽ bắt đầu đơn giản bằng cách thêm vào logger cho **ViewModel** và lấy **userService** từ **locator**.

```
abstract class AuthenticationViewModel extends FormViewModel {
	final log = getLogger('AuthenticationViewModel');
  final userService = locator<UserService>();

  ...
}
```

Rồi chúng ta sẽ cập nhật phương thức **saveData** để thoát đăng nhập các giá trị của biểu mẫu ánh xạ cũng như throw một exception nếu future lỗi với một exception. Bởi vì nó sẽ không nuốt ngoại lệ đó và gọi **onError** trong ViewModel chúng ta phải tự bắt ngoại lệ này và thiết lập thông điệp xác thực.

```
Future saveData() async {
  log.i('values:$formValueMap');

  try {
    final result = await runBusyFuture(
      runAuthentication(),
      throwException: true,
    );

    await _handleAuthenticationResponse(result);
  } on FirestoreApiException catch (e) {
    log.e(e.toString());
    setValidationMessage(e.toString());
  }
}
```

Như bạn thấy bên trên phương thức **_handleAuthenticationResponse** bây giờ là một future do đó chúng ta có thể cập nhật nó.

```
/// Checks if the result has an error. If it doesn't we navigate to the success view
  /// else we show the friendly validation message.
  Future<void> _handleAuthenticationResponse(
      FirebaseAuthenticationResult authResult) async {
    log.v('authResult.hasError:${authResult.hasError}');

    if (!authResult.hasError && authResult.user != null) {
      final user = authResult.user!;
      
      await userService.syncOrCreateUserAccount(
        user: User(
          id: user.uid,
          email: user.email,
        ),
      );
      // navigate to success route
      navigationService.replaceWith(successRoute);
    } else {
      if (!authResult.hasError && authResult.user == null) {
        log.wtf(
            'We have no error but the user is null. This should not be happening');
      }

      log.w('Authentication Failed; ${authResult.errorMessage}');

      setValidationMessage(authResult.errorMessage);
      notifyListeners();
    }
  }
```

Chúng ta đã thêm một số logs cái có thể có ích nếu có bất cứ bugs nào ở phía firebase. Chúng ta nên đảm bảo rằng khi một kết quả đăng nhập không có lỗi hay user là không null, nhưng bạn không bao giờ biết cái gì có thể xảy ra. Như vậy trong trường hợp đó chúng ta cần tới một log wtf vô cùng quan trọng cái sẽ nói cho chúng ta biết điều tồi tệ gì xảy ra. Ngoài ra chúng ta cũng cần log cảnh báo để chỉ ra rằng quá trình xác thực bị lỗi. Không có bất cứ lỗi nào bởi vì người dùng có thể thử lại và nhận lại ở nơi chúng ta cần chúng, nhưng chúng ta se cần biết vấn đề gì xảy ra trong quá trình login do đó chúng ta có thể cải thiện chúng. Vấn đề cuối cùng đó là đảm bảo mọi nơi chúng ta sử dụng **_handleAuthenticationResponse** chúng ta sẽ thêm **await** đằng trước nó.

```
Future<void> useGoogleAuthentication() async {
  final result = await firebaseAuthenticationService.signInWithGoogle();
  await _handleAuthenticationResponse(result);
}

Future<void> useAppleAuthentication() async {
  final result = await firebaseAuthenticationService.signInWithApple(
    appleClientId: '',
    appleRedirectUri:
        'https://boxtout-production.firebaseapp.com/__/auth/handler',
  );
  await _handleAuthenticationResponse(result);
}
```

## Register New Services
Chúng ta đã tạo hai lớp services mới trong hướng dẫn này do đó chúng ta phải đăng kí chúng với **StackedLocator** và chạy lại **build_runner**. Cập nhật file **app.dart** cảu bạn như thế này:

```
@StackedApp(
  routes: [
    MaterialRoute(page: StartUpView),
    CupertinoRoute(page: AddressSelectionView),
    CupertinoRoute(page: CreateAccountView),
    CupertinoRoute(page: LoginView, initial: true),
  ],
  dependencies: [
    LazySingleton(classType: NavigationService),
    LazySingleton(classType: UserService),
    LazySingleton(classType: FirestoreApi),
    Singleton(classType: FirebaseAuthenticationService),
  ],
  logger: StackedLogger(),
)
class AppSetup {
  /** Serves no purpose besides having an annotation attached to it */
}
```

Rồi chạy:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Và đó là tất cả những gì để hoàn thành quá trình cập nhật luồng Authentication của chúng ta. Nhằm đóng gói quá trình triển khai chúng ta cần.

## Enable the firestore API before running anything
Vào Firebase project console của chúng ta và tạo firestore DB.

## Result
### Creating a new Account
Khi tạo một tài khoản mới mã nguồn sẽ tạo tài khoản đó, rồi đồng bộ, chúng ta thấy rằng không có user nào rồi tạo một tài khoản. Logs trông như bên dưới(Nếu bạn đã thêm đúng cấp độ vào logging).

```
I/flutter (28380): 💡  AuthenticationViewModel | saveData  - values:{fullName: BoxtOut Account, email: account@boxtout.com, password: password123}
I/flutter (28380):  AuthenticationViewModel | _handleAuthenticationResponse  - authResult.hasError:false
I/flutter (28380): 💡  UserService | syncOrCreateUserAccount  - user:User(id: 6WKwecwhL2gHr8fUTCikJaL9nRw2, email: account@boxtout.com, defaultAddress: null)
I/flutter (28380):  UserService | syncUserAccount  - Sync user 6WKwecwhL2gHr8fUTCikJaL9nRw2
I/flutter (28380): 💡  FirestoreApi | getUser  - userId:6WKwecwhL2gHr8fUTCikJaL9nRw2
I/flutter (28380):  FirestoreApi | getUser  - We have no user with id :6WKwecwhL2gHr8fUTCikJaL9nRw2 in our database
I/flutter (28380):  UserService | syncOrCreateUserAccount  - We have no user account. Create a new user ...
I/flutter (28380): 💡  FirestoreApi | createUser  - user:User(id: 6WKwecwhL2gHr8fUTCikJaL9nRw2, email: account@boxtout.com, defaultAddress: null)
I/flutter (28380):  FirestoreApi | createUser  - UserCreated at users/6WKwecwhL2gHr8fUTCikJaL9nRw2 ...
I/flutter (28380):  UserService | syncOrCreateUserAccount  - _currentUser has been saved
```

Như chúng ta biết, thực tế chúng ta có tài khoản người dùng sau đó. Bạn có thể kiểm tra trong database.

### Logging in with Existing Account
Khi đăng nhập với thông tin chi tiết ở bên trên, chúng ta thấy logs như bên dưới:

```
I/flutter (28510): 💡  AuthenticationViewModel | saveData  - values:{email: account@boxtout.com, password: password123}
I/flutter (28510):  AuthenticationViewModel | _handleAuthenticationResponse  - authResult.hasError:false
I/flutter (28510): 💡  UserService | syncOrCreateUserAccount  - user:User(id: 6WKwecwhL2gHr8fUTCikJaL9nRw2, email: account@boxtout.com, defaultAddress: null)
I/flutter (28510):  UserService | syncUserAccount  - Sync user 6WKwecwhL2gHr8fUTCikJaL9nRw2
I/flutter (28510): 💡  FirestoreApi | getUser  - userId:6WKwecwhL2gHr8fUTCikJaL9nRw2
I/flutter (28510):  FirestoreApi | getUser  - User found.
I/flutter (28510): Data:
I/flutter (28510): {id: 6WKwecwhL2gHr8fUTCikJaL9nRw2, email: account@boxtout.com, defaultAddress: null}
I/flutter (28510):  UserService | syncUserAccount  - User account exists. Save as _currentUser
```

Chúng ta thực hiện đăng nhập trong khi **saveData** và rồi đồng bộ tài khoản. Chúng ta thấy rằng tài khoản đã tồn tại, lấy dữ liệu và rồi lưu user đó vào bộ nhớ với biến **_currentUser**. Với các kết quả bên trên, chúng ta có thể khẳng định rằng với mọi luồng xác thực chúng ta đã thiết lập dữ liệu vào **_currentUser** tương ứng với cái chúng ta đã lưu vào firestore database.

## Source
https://www.filledstacks.com/post/handle-users-profile-in-flutter/

## Reference

**[Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))