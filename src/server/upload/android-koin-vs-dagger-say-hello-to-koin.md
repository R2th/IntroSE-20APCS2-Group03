# I. Giới thiệu
Sau nhiều lần cố gắng học Dagger, cuối cùng tôi cũng tìm thấy Koin. Koin tiết kiệm thời gian và dễ dàng sử dụng. Bài viết này giải thích Koin là gì, so sánh với Dagger và cách sử dụng nó.

# II. Koin là gì?
"Koin is a simple powerful Dependency injection framework for Kotlin" . Là framework được viết bằng kotlin thuần tuý, sử dụng để giải pháp bằng function nên không code tự sinh, không ánh xạ.

# III. So sánh với Dagger
Để so sánh giữa 2 kiểu triển khai, ta sẽ tập trung vào dự án được triển khai bằng dagger và bây giờ là koin. Dự án sử dụng MVVM, retrofit và LiveData. Project có 1 activity, 4 fragments, 5 viewModels, repository và webservice interface. Vì vậy có thể nói đây là 1 dự án nhỏ chỉ để thiết kế cơ sở cho các ứng dụng tương lai.

Đầu tiên hãy nhìn package DI  của Dagger và Koin

![](https://images.viblo.asia/d4b97558-a008-4498-8185-4d0cd44b64bf.png)

Như bạn có thể thấy, dagger cần khá nhiều class. Ví dụ ViewModel cần 3 file

**Line of code**
Để có được những con số này, tôi đã sử dụng thống kê. Tôi đã sử dụng nó hai lần trước và sau khi biên dịch dự án với cả Dagger và Koin. 

![](https://images.viblo.asia/97967e29-c0b2-4dcb-8f9b-68bac60dccb7.png)

Có thể thấy số lượng dòng code generated ra nhiều hơn koin

**Build time**
sau khi clean project và build lại. Tôi được kết quả:

```
Koin:
BUILD SUCCESSFUL in 17s
88 actionable tasks: 83 executed, 5 up-to-date
```

```
Dagger:
BUILD SUCCESSFUL in 18s
88 actionable tasks: 83 executed, 5 up-to-date
```

Kết quả này cho thấy nếu dự án lớn hơn nữa thì sự chênh lệch sẽ lớn hơn nữa

# IV. Cài đặt

- Thêm dòng sau vào gradle:

```
implementation "org.koin:koin-android-viewmodel:$koin_version"
```

- Học dagger rất khó, vì vậy để tiếp cận với dagger mất khá nhiều thời gian cho người mới bắt đầu, nhưng với koin thì mọi việc dễ dàng hơn rất nhiều

Sau khi thêm dependency Koin, chúng ta có thể triển khai mô-đun đầu tiên của mình, giống như Dagger, chúng ta có thể triển khai mọi mô-đun trong một tệp riêng biệt, nhưng vì để đơn giản, tôi quyết định triển khai tất cả các mô-đun trong một tệp. Bạn có thể tách nó sau.

Đầu tiên, cần biết mộit số lưu ý về koin syntax:

- get() : giải quyết 1 instance trong module koin, chỉ cần sử dụng get() cho instance được yêu cầu. get() thường được sử dụng trong hàm tạo, để inject constructor value
- factory : định nghĩa rằng sẽ cung cấp cho bạn 1 instance mới mỗi khi bạn yêu cầu
- single: cung cấp 1 singleton được định nghĩa
- name = : được sử dụng định nghĩa tên. Điều này là bắt buộc khi bạn muốn có nhiều phiên bản của cùng 1 class với các loại khác nhau

```

import com.farshid.data.remote.network.AuthApi
import com.farshid.data.remote.network.GeneralApi
import com.farshid.data.remote.network.MasseurHubWebApi
import com.farshid.data.repository.authRepo.AuthRepo
import com.farshid.view.authentication.enteremail.EnterEmailViewModel
import com.farshid.view.authentication.entermobilenumber.EnterMobileNumberViewModel
import com.farshid.view.authentication.enterverificationcode.EnterVerificationCodeViewModel
import com.farshid.view.authentication.nameandbirthday.NameAndBirthdayViewModel
import com.farshid.view.authentication.selectgender.SelectGenderViewModel
import com.farshid.view.authentication.startpage.StartPageViewModel
import com.farshid.view.authentication.uploadimages.UploadImagesViewModel
import org.koin.android.viewmodel.ext.koin.viewModel
import org.koin.dsl.module.module
import retrofit2.Retrofit


private val retrofit: Retrofit = createNetworkClient()

private val generalApi: GeneralApi = retrofit.create(GeneralApi::class.java)
private val authApi: AuthApi = retrofit.create(AuthApi::class.java)

val viewModelModule = module {
    viewModel { LoginFragmentViewModel(get()) }
    viewModel { StartPageViewModel() }    
}

val repositoryModule = module {
    single { AuthRepo(authApi = get()) }
}

val networkModule = module {
    single { generalApi }
    single { authApi }    
}

val databaseModule = module {

}

val sharedPrefModule = module {

}
```

Thay vì tạo nhiều file có nhiều chú thích, nhiều thành phần, ta tạo 1 file đơn giản và dễ đọc

- createdNetworkClient là một hàm để tạo một instance Retrofit. thiết lập baseUrl, thêm ConverterFactory và Interceptor được thực hiện ở đó.

```
private val generalApi: GeneralApi =  retrofit.create(GeneralApi::class.java)
private val authApi: AuthApi = retrofit.create(AuthApi::class.java)
```
AuthApi và GeneralApi là 2 retrofit endpoints interface

```
val viewModelModule = module {
    viewModel { LoginFragmentViewModel(get()) }
    viewModel { StartPageViewModel() }    
}
```

ta khai báo viewmodel dươis dạng viewmodel trong 1 module. Koin sẽ cung cấp 1 viewmodel cho vòng đời ViewModelFactory và giúp liên kêý nó với các thành phần hiện tại. Như bạn có thể thấy chúng ta có phương thức get() vào hàm tạo của LoginFragmentViewModel nó giải quyết instance cho LoginFragmentViewModel

**Sau tất cả chúng ta nói DI để genarate code, vậy nó làm như thế nào?**
Trong Application class, trong phương thức onCreate viêt thêm mothod

```
startKoin(this, listOf(repositoryModule, networkModule, viewModelModule))
```

ở đây chúng ta chỉ cần gọi phương thức startKoin, thêm context và danh sách các module mà ta muốn khởi tạo với koin

Sử dụng ViewModel trong View(activity,fragment)

```
private val startPageViewModel: StartPageViewModel by viewModel()
```

Giờ chúng ta có thể sử dụng viewmodel trong view
# Tổng kết
Koin đơn giản và dễ sử dụng hơn dagger

ref: https://medium.com/@farshidabazari/android-koin-with-mvvm-and-retrofit-e040e4e15f9d