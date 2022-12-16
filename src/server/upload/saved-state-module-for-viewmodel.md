Như đã được đề cập trong [Saving UI States](https://developer.android.com/topic/libraries/architecture/saving-states#use_onsaveinstancestate_as_backup_to_handle_system-initiated_process_death) thì đối tượng **ViewModel** có thể xử lý được configuration changes vì vậy bạn không cần phải lo lắng về việc làm thế nào để xử lý các trạng thái khi mà xoay màn hình hoặc một việc gì đó tương tự. Tuy nhiên nếu bạn muốn xử lý việc tái khởi tạo hệ thống, bạn có thể sử dụng ***onSaveInstanceState()*** để backup.

Các trạng thái của UI sẽ được lưu trữ trong đối tượng **ViewModel** chứ không phải là các activites, vì vậy khi sử dụng ***onSaveInstanceState()*** thì nó sẽ yêu cầu implement một số boilerplate mà [saved state module](https://developer.android.com/jetpack/androidx/releases/savedstate) có thể xử lý cho bạn. 

Khi sử dụng module này, đối tượng **ViewModel** sẽ nhận một  **[SavedStateHandle](https://developer.android.com/reference/androidx/lifecycle/SavedStateHandle)** thông qua hàm constructor của nó.  Đối tượng này là một kiểu key-value, cho phép bạn ghi và truy xuất các đối tượng dựa vào trạng thái đã lưu. Các giá trị này vẫn tồn tại khi mà process bị hệ thống loại bỏ và nó vẫn available thông qua cùng một đối tượng.

Lưu ý rằng State cần phải nhẹ và không phức tạp, nếu bạn cần sử dụng data phức tạp thì hãy dùng đến [local persistence](https://developer.android.com/topic/libraries/architecture/saving-states#local).
# 1. Setup
Bắt đầu từ  [Fragment 1.2.0 ](https://developer.android.com/jetpack/androidx/releases/fragment#1.2.0)  hoặc  [Activity 1.1.0 ](https://developer.android.com/jetpack/androidx/releases/activity#1.1.0) bạn có thể sử dụng SavedStateHandle như một constructor argument cho ViewModel.

```java
class SavedStateViewModel(private val state: SavedStateHandle) : ViewModel() { ... }
```

Bạn cũng có thể truy xuất instance của ViewModel mà không cần thêm bất cứ config nào. **ViewModel** mặc định cũng cung cấp **SavedStateHandle** 

```java
class MainFragment : Fragment() {
    val vm: SavedStateViewModel by viewModels()

    ...
}
```

Khi cung cấp một instance của **ViewModelProvider.Factory**, bạn cũng có thể sử dụng **SavedStateHandle** bằng cách extend **AbstractSavedStateViewModelFactory**. 

# 2. Working with SavedStateHandle
Class **SavedStateHandle**  là một kiểu key-value, nó cho phép bạn viết và truy xuất data thông qua hàm ***get()*** và ***set()*** .Ngoài ra, bạn cũng có thể truy xuất được các giá trị từ **SavedStateHandle** và quan sát data đó thông qua ***getLiveData()*** trả về một đối tượng **LiveData**. Khi giá trị của key được update, **LiveData** nhận giá trị mới. Thông thường thi khi có sự tương tác của người dùng, data sẽ thay đổi, ví dụ như là mình cần filter một list data từ trong DB. Cũng có thể biến đổi những data này dựa trên **[transform LiveData](https://developer.android.com/topic/libraries/architecture/livedata#transform_livedata)**. 

```java
class SavedStateViewModel(private val savedStateHandle: SavedStateHandle) : ViewModel() {
    val filteredData: LiveData<List<String>> =
        savedStateHandle.getLiveData<String>("query").switchMap { query ->
        repository.getFilteredData(query)
    }

    fun setQuery(query: String) {
        savedStateHandle["query"] = query
    }
}
```

Bằng cách sử dụng **SavedStateHandle**, các giá trị sẽ được retain từ process death mà không cần phải lưu trữ các activity hay fragment một cách thủ công. 

**SavedStateHandle** cũng có một số phương thức để bạn có thể tương tác với key-value:
+ ***contains(String key)*** - Check xem nó có chưa cái key mình cần tìm hay không.
+ ***remove(String key)*** - Removes giá trị mà có cái key là như này.
+ ***keys()*** - Returns tất cả các keys mà được lưu trữ bởi SavedStateHandle.

# 3. Supported types
**SavedStateHandle** lưu trữ và truy xuất data thông qua ***Bundle*** .

### Directly supported types
Thông thường, bạn có thể sử dụng phương thức ***get()*** và ***set()*** cho các kiểu dữ liệu của **SavedStateHandle** thông qua **Bundle** như dưới đây: 

| Type/Class support | Array support | 
| -------- | -------- |
| double     | double[]     | 
| int     | int[]     | 
| long     | long[]     | 
| String     | String[]     | 
| byte     | byte[]     | 
| char     | char[]     | 
| CharSequence     | CharSequence[]     | 
| float     | float[]     | 
| Parcelable     | Parcelable[]     | 
| Serializable     | Serializable[]     | 
| short     | short[]     | 
| SparseArray     |      | 
| Binder     |      | 
| Bundle     |      | 
| ArrayList     |      | 
| Size (only in API 21+)     |      | 
| SizeF (only in API 21+)     |      | 

Nếu như kiểu của data class mà bạn cần lưu trữ không năm trong danh sách trên thì bạn hãy xem xét sử dụng **@Parcelize** Kotlin annotation hoặc implementing **Parcelable** .

### Saving non-parcelable classes

Nếu như class không implement **Parcelable** or **Serializable** hoặc không thể sửa đổi để có thể implement một trong các interface đó thì bạn không thể lưu trữ class đó vào **SavedStateHandle** .

Bắt đầu với [Lifecycle 2.3.0-alpha03](https://developer.android.com/jetpack/androidx/releases/lifecycle#2.3.0-alpha03) **SavedStateHandle** cho phép bạn lưu trữ bất kỳ đối tượng nào bằng cách sử dụng logic để lưu và get data dựa bào Bundle bằng cách sử dụng phương thức ***[setSavedStateProvider()](https://developer.android.com/reference/androidx/lifecycle/SavedStateHandle#setSavedStateProvider(java.lang.String,%20androidx.savedstate.SavedStateRegistry.SavedStateProvider))*** . ***SavedStateRegistry.SavedStateProvider*** là một interface cung cấp phương thức ***saveState()***  ,nó trả về một **Bundle** chứa cái state mà bạn muốn lưu. Khi mà **SavedStateHandle** đã sẵn sàng lưu trữ trạng thái của nó, nó sẽ gọi ***saveState()*** để trích xuất Bundle từ SavedStateProvider, sau đó lưu Bundle dưới dạng key. 

Hãy xem xét một ví dụ về một ứng dụng yêu cầu hình ảnh từ ứng dụng máy ảnh thông qua Intent **ACTION_IMAGE_CAPTURE**, máy ảnh sẽ lưu trữ hình ảnh đó vào một file tạm. **TempFileViewModel** sẽ chứa logic để tạo tệp tạm thời đó: 

```java
class TempFileViewModel : ViewModel() {
    private var tempFile: File? = null

    fun createOrGetTempFile(): File {
        return tempFile ?: File.createTempFile("temp", null).also {
            tempFile = it
        }
    }
}
```


Để đảm bảo tệp tạm thời không bị mất nếu process của activity bị hủy và sau đó  lại được khôi phục, **TempFileViewModel** có thể sử dụng **SavedStateHandle** để lưu dữ liệu của nó. Để cho phép **TempFileViewModel** lưu dữ liệu của nó, implement **SavedStateProvider** và đặt nó như là provider **SavedStateHandle** của **ViewModel**:

```java
private fun File.saveTempFile() = bundleOf("path", absolutePath)

class TempFileViewModel(savedStateHandle: SavedStateHandle) : ViewModel() {
    private var tempFile: File? = null
    init {
        savedStateHandle.setSavedStateProvider("temp_file") { // saveState()
            if (tempFile != null) {
                tempFile.saveTempFile()
            } else {
                Bundle()
            }
        }
    }

    fun createOrGetTempFile(): File {
        return tempFile ?: File.createTempFile("temp", null).also {
            tempFile = it
        }
    }
}
```

Để khôi phục File data khi người dùng quay lại, hãy truy xuất *tempfile* Bundle từ **SavedStateHandle**. Đây là cùng một Bundle được cung cấp bởi ***saveTempFile ()*** có chứa đường dẫn tuyệt đối. Sau đó, đường dẫn tuyệt đối có thể được sử dụng để khởi tạo một File mới.

```java
private fun File.saveTempFile() = bundleOf("path", absolutePath)

private fun Bundle.restoreTempFile() = if (containsKey("path")) {
    File(getString("path"))
} else {
    null
}

class TempFileViewModel(savedStateHandle: SavedStateHandle) : ViewModel() {
    private var tempFile: File? = null
    init {
        val tempFileBundle = savedStateHandle.get<Bundle>("temp_file")
        if (tempFileBundle != null) {
            tempFile = tempFileBundle.restoreTempFile()
        }
        savedStateHandle.setSavedStateProvider("temp_file") { // saveState()
            if (tempFile != null) {
                tempFile.saveTempFile()
            } else {
                Bundle()
            }
        }
    }

    fun createOrGetTempFile(): File {
      return tempFile ?: File.createTempFile("temp", null).also {
          tempFile = it
      }
    }
}
```


# 4. Additional resources

Để biết thêm thông tin về Saved State module for ViewModel, hãy xem thêm các bài viết sau: 

### Codelabs
[Android lifecycle-aware components codelab](https://codelabs.developers.google.com/codelabs/android-lifecycles/#6) .

# Tham khảo: 
Developer:  [Saved State module for ViewModel   ](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate)