ViewModelComponent là một thành phần trong hệ thống phân cấp thành phần của Hilt tuân theo vòng đời của ViewModel và cho phép các loại scope đối với nó.
Trước khi ViewModelComponent được thêm vào Hilt, các lớp ViewModel đã được ActivityRetainedComponent tạo và đưa vào. Do đó, các phần phụ thuộc của ViewModels chỉ có thể sử dụng các loại hoặc loại không được mở rộng trong scope SingletonComponent hoặc ActivityRetainedComponent có phiên bản được chia sẻ bởi tất cả các ViewModels.
Ở trên có vẻ không phải là vấn đề nếu mỗi màn hình ứng dụng của bạn là một Hoạt động, vì việc xác định scope một loại cho ActivityRetainedComponent có nghĩa là mỗi lớp ViewModel sẽ nhận được một phiên bản khác nhau của loại đó. Tuy nhiên, có một hoạt động trên mỗi màn hình không phải là trường hợp cho hầu hết các ứng dụng.
Hơn nữa, kiểu SavedStateHandle không có sẵn làm ràng buộc mặc định trong ActivityRetainedComponent.
Bây giờ, ViewModels được tạo và đưa vào bởi ViewModelComponent tuân theo vòng đời của ViewModel. Mỗi phiên bản ViewModel có một phiên bản ViewModelComponent khác nhau và để phân chia một loại cho nó, hãy sử dụng chú thích @ViewModelScoped. 

![](https://miro.medium.com/max/700/0*pHaHd50ZCJaC0e4T)

ViewModelComponent mở rộng từ ActivityRetainedComponent. Do đó, các loại trong phạm vi ViewModelComponent có thể phụ thuộc vào các loại trong phạm vi ActivityRetainedComponent và SingletonComponent. Ngoài ra, ViewModelComponent chứa một liên kết mặc định của SavedStateHandle được liên kết với ViewModel của nó.

# Scoping to the ViewModelComponent
Sử dụng @ViewModelScoped mang lại cho bạn tính linh hoạt và chi tiết hơn những gì có thể với các thành phần khác. ViewModels vẫn tồn tại các thay đổi cấu hình và vòng đời của nó có thể được kiểm soát bởi một activity, fragment hoặc thậm chí là navigation graph!
Tuy nhiên, scope cho ActivityComponent và FragmentComponent rất hữu ích vì các thành phần này không tồn tại các thay đổi cấu hình có thể cần thiết trong một số trường hợp. Ngoài ra, FragmentComponent mở rộng ActivityComponent, hành vi mà bạn không thể có với nhiều ViewModelComponent.
Vì thế:
* Để làm cho tất cả các ViewModels chia sẻ cùng một phiên bản của một loại, hãy chú thích nó bằng @ActivityRetainedScoped.
* Để xác định scope type cho ViewModel, làm cho nó tồn tại qua các thay đổi cấu hình và / hoặc được điều khiển bởi navigation graph, chú thích nó bằng @ViewModelScoped.
* Để xác định scope type cho Activity và không làm cho nó tồn tại sau các thay đổi cấu hình, hãy chú thích bằng @ActivityScoped hoặc @FragmentScoped nếu bạn muốn hành vi đó nhưng scope đến một fragment. 

# Sử dụng @ViewModelScoped
Chú thích này cho phép bạn xác định scope một kiểu cho một phiên bản của ViewModel. Phiên bản tương tự sẽ được đưa vào tất cả các phụ thuộc mà ViewModel và các phụ thuộc của nó có.
Trong ví dụ sau, LoginViewModel và RegisterViewModel sử dụng loại @ViewModelScoped UserInputAuthData chứa trạng thái có thể thay đổi.

```
@ViewModelScoped // Scopes type to the ViewModel
class UserInputAuthData(
  private val handle: SavedStateHandle // Default binding in ViewModelComponent
) { /* Cached data and logic here */ }

class RegistrationViewModel(
  private val userInputAuthData: UserInputAuthData,
  private val validateUsernameUseCase: ValidateUsernameUseCase,
  private val validatePasswordUseCase: ValidatePasswordUseCase
) : ViewModel() { /* ... */ }

class LoginViewModel(
  private val userInputAuthData: UserInputAuthData,
  private val validateUsernameUseCase: ValidateUsernameUseCase,
  private val validatePasswordUseCase: ValidatePasswordUseCase
) : ViewModel() { /* ... */ }

class ValidateUsernameUseCase(
  private val userInputAuthData: UserInputAuthData,
  private val repository: UserRepository
) { /* ... */ }

class ValidatePasswordUseCase(
  private val userInputAuthData: UserInputAuthData,
  private val repository: UserRepository
) { /* ... */ }
```

Vì UserInputAuthData được đặt trong phạm vi ViewModel, nên RegisterViewModel và LoginViewModel sẽ nhận được một phiên bản khác của UserInputAuthData. Tuy nhiên, các phụ thuộc UseCase chưa được mở rộng của mỗi ViewModel sử dụng cùng một phiên bản mà ViewModel của nó sử dụng.

Adding bindings to the ViewModelComponent
Bạn có thể bindings vào ViewModelComponent như với bất kỳ thành phần nào khác. Nếu trong đoạn mã trên, ValidateUsernameUseCase là một interface, bạn có thể cho Hilt biết cách triển khai để sử dụng như sau:

```
@Module
@InstallIn(ViewModelComponent::class)
object UserAuthModule {

  @Provides
  fun provideValidateUsernameUseCase(
    userInputAuthData: UserInputAuthData, // scoped to ViewModelComponent
    repository: UserRepository
  ): ValidateUsernameUseCase {
    return ValidateUsernameUseCaseImpl(userInputAuthData, repository)
  }
}
```

ViewModelComponent tuân theo vòng đời của ViewModel và cho phép các loại scope đối với nó. Vì vòng đời của ViewModel có thể được kiểm soát bởi activity, fragment hoặc thậm chí là navigation graph, bạn sẽ có được sự linh hoạt và chi tiết hơn về số lượng địa điểm mà bạn có thể mở rộng phạm vi.
Để xác định phạm vi một loại cho một ViewModel, hãy chú thích nó bằng @ViewModelScoped. Để làm cho tất cả các ViewModels chia sẻ cùng một phiên bản của một loại, hãy chú thích nó bằng @ActivityRetainedScoped.

Nguồn : https://medium.com/androiddevelopers/using-hilts-viewmodelcomponent-53b46515c4f4