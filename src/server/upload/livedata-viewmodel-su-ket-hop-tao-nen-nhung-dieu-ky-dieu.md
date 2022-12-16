User Experience (UX) có lẽ là một trong những phần quan trọng nhất của mỗi sản phẩm hay ứng dụng được tạo ra. Đối với enduser, họ không hề quan tâm khi bạn sử dụng tài liệu tốt nhất để xây dựng sản phẩm của mình hoặc các thuật toán tốt nhất để tạo phần mềm của bạn hoặc nếu bạn làm điều đó hiệu quả nhất có thể, nếu sản phẩm của bạn không mang lại trải nghiệm tốt cho người dùng họ sẽ không sử dụng nó, đơn giản chỉ vậy thôi.
User experience bao gồm rất nhiều yếu tố, chẳng hạn như: giao diện người dùng, mô hình điều hướng, màu sắc, phông chữ, độ chính xác của dữ liệu ,... vv. Trong khuôn khổ bài viết này, chúng ta sẽ tập trung vào phần độ chính xác của dữ liệu và Google Architectural Components đã giúp giỡ chúng ta như thế nào để tạo ra một ứng dụng luôn tự động đồng bộ hóa dữ liệu lên giao diện ngay khi nó có sự thay đổi.
## LiveData
 *LiveData is an observable data holder class.*

LiveData là một lớp lưu trữ dữ liệu có thể lắng nghe và quan sát được.
Theo như định nghĩa của Google, LiveData là một class mà chỉ chưa duy nhất một property, nó cho phép chúng ta save/hold bất cứ object nào vào trong property đó. Nhưng thực ra nó có thể làm được nhiều hơn thế. LiveData là một observable class, điều này có nghĩa là nó được triển khai theo **observable design pattern**. Hiểu đơn giản là nó cho phép chúng ta đăng ký lắng nghe sự thay đổi của các object bên trong nó, khi có sự thay đổi, bên đăng ký sẽ lắng nghe được. Nhưng vẫn còn thêm một tính năng làm cho LiveData là một lựa chọn tuyệt vời để include vào trong project. LiveData là một lớp lifecycle-aware, có nghĩa là nó nhận thức được trạng thái vòng đời của observer đã đăng ký với nó.
Những lý do chúng ta nên sử dụng LiveData có thể tóm tắt lại như sau:
* **Data/UI synchronization:**  Bởi vì LiveData tuân theo observable pattern, nó sẽ notify cho UI bất cứ khi nào có thay đổi, điều này đảm bảo cho sự đồng bộ hóa dữ liệu hoàn hảo giữa hai lớp mà không cần bất kỳ xác minh thay đổi dữ liệu thủ công nào.
* **No more life-cycle related crashes:** Khi LiveData là lifecycle aware component, nó sẽ đảm bảo loại bỏ mọi lifecycleObserver khi trạng thái là ** destroyed**  tránh được memory leaks do những tham chiếu không còn được sử dụng hay không còn tồn tại. Ngoài ra, LiveData sẽ chỉ gửi thông báo về thay đổi dữ liệu chỉ cho những observers đang ở trạng thái hoạt động như onResume.
* **No more manual data update:** Observable pattern cho phép tránh được những công việc thủ công để cập nhật và đồng bộ data lên UI. Khi configuration change xảy ra hoặc khi nó trở lại từ trạng thái không hoạt động sang trạng thái hoạt động, nó sẽ nhận được dữ liệu mới nhất ngay sau khi nó trở lại, điều này xảy ra trong onCreate khi ViewModelProviders được gọi, chúng ta sẽ tìm hiểu kỹ hơn ở bên dưới.
## ViewModel
ViewModel là một helper class, là một phần của Android Architecture Components, nó cho phép chúng ta lưu trữ, quản lý và chuẩn bị dữ liệu liên quan đến giao diện người dùng một cách có ý thức trong vòng đời. Lợi ích chính của ViewModel là nó chỉ được khởi tạo vào lần đầu và một lần duy nhất, nếu Activity, Fragment hoặc bất cứ LifecycleOwner khác bị destroyed hoặc khởi tạo lại bởi hệ thống, lần tiếp theo sau khi khởi động nó sẽ nhận được cùng một ViewModel đã tạo trước đó. Nó hoạt động giống như mộtLoader (AsyncTaskLoader và CursorLoader)
![image.png](https://images.viblo.asia/0ffe37fe-c846-4f3e-b83b-640f30058e8e.png)
ViewModel lifecycle
Như chúng ta có thể thấy trong hình ảnh phía trên, ViewModel vẫn tiếp tục sống khi Activity bị destroyed hoặc reconstructed nguyên nhân có thể là do configuration change. Khi mà activity finished, ViewModel sẽ gọi phương thức onCleared() để xóa sạch tất cả các tài nguyên còn lại và tránh memory leaks.
Chúng ta cần lưu ý những điều sau:
* Một class ViewModel không nên có bất cứ reference nào đến LifecycleOwner, ví dụ như Activity hay Fragment hoặc context, điều này làm cho việc chúng ta viết Unit Test dễ dàng hơn.
* ViewModel object có thể bao gồm LifecycleObservers, ví dụ như LiveData object, nhưng một ViewModel sẽ không bao giờ observer những thay đổi liên quan đến lifecycle-aware observables, điều này cần được thực hiện bởi LifecycleOwner.
* Nếu ViewModel cần Application context, nó cần phải được extend từ AndroidViewModel và nhận Application ở trong constructor.
## Example
=>Hãy cùng bắt tay vào code để hiểu rõ hơn. <br>
Đầu tiên chúng ta cần thêm một số thư viện vào file gradle, như hình sau: <br>
**App.gradle**
```
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

apply plugin: 'kotlin-kapt'

android {
    //.. Omitted since it is not relevant for the example
}

dependencies {
    //... some dependencies were omitted due to they are not relevant for the example

    def lifecycle_version = "1.1.1"

    // ViewModel and LiveData
    implementation "android.arch.lifecycle:extensions:$lifecycle_version"

    compile 'com.google.code.gson:gson:2.2.4'
    implementation 'io.reactivex.rxjava2:rxandroid:2.0.2'
    implementation 'io.reactivex.rxjava2:rxjava:2.1.17'
}
```
Như chúng ta đã đề cập ở trên, ViewModel object có thể chứa LifecycleObservers, ví dụ như LiveData object, nào hãy cùng xem chúng tương tác với nhau như thế nào nhé. <br>
**MainViewModel.kt**
```
class MainViewModel(private var repository: Repository) : ViewModel() {
    var genders: MutableLiveData<List<Gender>>? = MutableLiveData()

    init {
        repository.insertTestGenders()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe{genders?.value = it}
    }

    class ViewModelFactory(private var repository: Repository): ViewModelProvider.Factory {

        override fun <T : ViewModel?> create(modelClass: Class<T>): T {
            return MainViewModel(repository) as T
        }

    }
}
```

Có một vài thứ vần lưu ý ở đây:
* Class ViewModel của chúng ta cần được extend từ ViewModel.
* ViewModel chỉ nhận một parameter ở constructor, đó chính là repository dùng để xử lý dữ liệu. Class này không nằm trong phạm vi của bài viết nhưng mọi người cũng có thể tham khảo ở trong ví dụ này.
* Lớp ViewModel còn có thêm một property khác, ngoài repository, đó chính là một MutableLiveData object, nó chứa danh sách Genders. Điều này có nghĩa chúng ta có thể subscribe property này để nhận biết được sự thay đổi bên trong nó và notify, chúng ta sẽ xem chi tiết ở bên dưới. Một LiveData object có thể chứa bất kỳ loại object nào, ở trong trường hợp này nó được khai báo là Mutable nghĩa là chúng ta muốn thay đổi nội dung bên trong chúng.
* Cuối cùng, chúng ta có một ViewModelFactory nó implement ViewModelProvider.Factory interface, điều  này cần thiết nếu bạn muốn truyền bất cứ parameter nào vào trong ViewModel, nếu không đoạn code đó sẽ bị bỏ sót.
Bây giờ hãy cùng xem cách sử dụng ViewModel. <br>

**MainActivity.kt**
```
class MainActivity : AppCompatActivity() {

    private var db: AppDatabase? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        db = AppDatabase.getAppDataBase(context = this)

        val model = ViewModelProviders
                .of(this, MainViewModel.ViewModelFactory(Repository(db)))
                .get(MainViewModel::class.java)

        model.genders?.observe(this, Observer {
            var finalString = ""
            it?.map { finalString+= it.name+" - " }
            tv_message.text = finalString
        })
    }
}
```

Đoạn code trên có nghĩa là gì?
* Chúng ta đang lấy một instance của database.
* Sau đó, chúng ta khởi tạo instance của ViewModel bằng cách sử dụng ViewModelProvider, provider này sẽ kiểm tra nếu đã có sẵn instance của ViewModel ở trong cùng class này đã được khởi tạo rồi thì nó sẽ chỉ trả về instance đó, với tất cả dữ liệu đã được cập nhật. Nếu ViewModel đó chưa tồn tại, provider sẽ khởi tạo cho chúng ta. Điều này đảm bảo rằng mỗi lần **configuration change** hay bất cứ event nào tương tự xảy ra, chúng ta sẽ không mất trạng thái hiện tại của dữ liệu, đồng nghĩa là chúng ta không tạo mới ViewModel instance sau mỗi lần như vậy.
* Cuối cùng, chúng ta đăng ký để observe và phản hồi ngay lập tức khi có bất cứ thay đổi nào xảy ra trong list gender được lưu trong ViewModel.

Nếu bạn không cần truyền bất cứ param nào ViewModel, bạn có thể lược bỏ việc implementation ViewModelProvider.Factory interface, như chúng ta đã đề cập từ trước và việc gọi để get instance của ViewModel có thể viết một cách đơn giản như bên dưới.
```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
                     
        val model = ViewModelProviders.of(this).get(MyViewModel::class.java)

        model.genders?.observe(this, Observer {
            var finalString = ""
            it?.map { finalString+= it.name+" - " }
            tv_message.text = finalString
        })
    }
}
```
Và thế là hoàn thành :). Chúng ta đã tìm hiểu cách để xây dựng một Reactive MVVM architecture bằng cách sử dụng Android Architectural components.

-----
Thanks for reading! <br>
Tham khảo: https://medium.com/mindorks/livedata-viewmodel-making-your-own-magic-73facb06fbb