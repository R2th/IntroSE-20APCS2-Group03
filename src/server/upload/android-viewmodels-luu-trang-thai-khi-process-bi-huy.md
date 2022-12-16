Một quan niệm sai lầm của một số nhà phát triển Android là mục đích sử dụng ViewModels để lưu trạng thái bền vững - nó thực sự đúng một phần - chúng giúp lưu lại trạng thái khi thay đổi cấu hình (ví dụ: xoay màn hình thiết bị) nhưng không hoạt động khi process bị hủy. Vì vậy, nếu Android hủy ứng dụng của bạn (chẳng hạn vì bộ nhớ thấp), thì trạng thái ứng dụng của bạn sẽ bị mất.

Vì vậy, tùy thuộc vào việc bạn có muốn duy trì trạng thái của mình khi process bị hủy hay không - bạn có thể sử dụng `onSaveInstanceState` trong các Fragment/Activity hoặc `SavingStateHandle` trong các ViewModel của bạn.

### Thêm lifecycle-viewmodel-savedstate vào dependency
```
dependencies {
  
  def lifecycle_version = "2.2.0" // currently the latest version
  // Saved state module for ViewModel
  implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"
}
```

### Thêm SavedStateHandle property vào ViewModel của bạn
```
class MainViewModel(val state: SavedStateHandle) : ViewModel() {
    ...
}
```

### Khởi tạo ViewModel sử dụng SavedStateViewModelFactory
```
class MainFragment : Fragment() {

   private val viewModel: MainViewModel by viewModels {
      SavedStateViewModelFactory(application, activity)
   }
...
```

### Lưu và khôi phục trạng thái
Class `SavedStateHandle` có các method get/set giá trị:
* `get(String key)`
* `contains(String key)`
* `remove(String key)`
* `set(String key, T value)`
* `keys()`

Bạn có thể lưu/phục hồi các giá trị nguyên thủy, bundles hoặc parcelables.

Cách lưu dễ dàng như sau:
```
// In your viewmodel
fun saveName(name: String) {
    state.set("Name", name)
}
// In your fragment
viewModel.saveName("Ahmed Rizwan")
```

Và phục hồi như sau:
```
// In your viewmodel
fun getName(): String? {
    state.get<String>("Name")
}
// In your fragment 
val name = viewModel.getName()
```

### Khôi phục trạng thái dưới dạng LiveData
Nếu bạn muốn khôi phục dữ liệu của mình dưới dạng LiveData, thì cũng có một getter cho điều đó.
```
// In your viewmodel 
val nameLiveData = state.getLiveData<String>("Name")
// In your activity/fragment
viewModel.nameLiveData.observe(this) { name ->
  ...
}
```

Như vậy là chúng ta đã có thể handle tất cả các trạng thái của bạn.

ref: https://android.jlelse.eu/android-viewmodels-saving-state-across-process-death-a3f447bf839a