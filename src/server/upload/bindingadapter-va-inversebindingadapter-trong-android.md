Nếu ai đã dùng **DataBinding** của Android thì không thể bỏ qua các tính năng của **BindingAdapter** và **InverseBindingAdapter** đem lại. Bài viết này mình sẽ tập trung 2 chức năng này.
# 1. Khái Niệm
**BindingAdapter** và **InverseBindingAdapter** là cách thức để custom **thuộc tính mới** cho **View**, đại diện cho tính năng mạnh mẽ **Two-Way Binding** của **Android**.

![](https://images.viblo.asia/98957caf-9b7f-4042-847e-dd9d666942b6.png)

- **BindingAdapter** đại điện cho đầu vào - **SET**
- **InverseBindingAdapter** đại diện cho đầu ra - **GET**.

# 2. Tại Sao Nên Dùng
Nếu bạn đã từng custom 1 thuộc tính mới cho View **trước kia** thì chắc hẳn bạn hiểu rằng custom như vậy phải qua ra nhiều bước:
- Tạo 1 Custom View Class mới.
- Khai tên thuộc tính mới trong file res/values/attrs.xml
- ....

![](https://images.viblo.asia/cc79f60b-4a7c-4e2f-85b0-63f9628acc36.png)

Nhưng đối với **DataBinding** chúng ta chỉ cần 2 functions:
- 1 function cho **BindingAdapter** 
- 1 function cho **InverseBindingAdapter** (có thể dùng hoặc không)

Vậy là chúng ta có thuộc tính mới đã có 1 thuộc tính mới.

![](https://images.viblo.asia/b6838cde-12eb-4429-bb82-c505fe2ce752.jpg)
# 3. Làm Thế Nào Để Sử Dụng
Để sử dụng được thì khá đơn giản, bạn chỉ cần thêm những đoạn **config** sau vào **build.gradle(Moule: app)**:
```
android {
    ...
    dataBinding {
        enabled = true
    }
}

kapt {
    generateStubs = true
}

dependencies {
    ...
    kapt 'com.android.databinding:compiler:2.3.1'
}
```

>Lưu ý: Đây config cho app sử dụng **Kotlin**, nếu bạn làm bằng **Java** thì chỉ cần thêm đoạn **dataBinding {enabled = true}**  thôi.
# 4. Ví Dụ
Ở đây mình sử dụng mô hình MVVM pattern để làm ví dụ này:

File XML:
```
<?xml version="1.0" encoding="utf-8"?>
<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:bind="http://schemas.android.com/apk/res-auto"
    >

    <data>

        <variable
            name="viewModel"
            type="com.example.bindingsample.MainViewModel"
            />

    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >

        <EditText
            android:layout_marginTop="@dimen/dp_100"
            android:layout_width="match_parent"
            android:layout_height="@dimen/dp_52"
            android:text="@={viewModel.number}"
            bind:textChange="@={viewModel.number}"
            />

    </LinearLayout>
</layout>
```

File View:
```
class MainActivity : AppCompatActivity(), MainContract.View {
    private var mViewModel: MainContract.ViewModel? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        mViewModel = MainViewModel()
        val binding: ActivityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.viewModel = mViewModel as MainViewModel
    }
}
```

File ViewModel:
```
class MainViewModel : BaseObservable(), MainContract.ViewModel {

    @get:Bindable
    var number: String = "1000"
        set(value) {
            field = value
            notifyPropertyChanged(BR.number)
        }
}
```

File Binding:
```
object BindingUtils {

    @JvmStatic
    @InverseBindingAdapter(attribute = "textChange", event = "textAttrChanged")
    fun getTextChange(view: EditText): String {
        val text = view.text.toString().replace("\\D+".toRegex(), "")
        if (TextUtils.isEmpty(text))  {
            return "0"
        }
        val number = Double.parseDouble(text)
        return String.format("%,.0f", number)
    }

    @JvmStatic
    @BindingAdapter(value = *arrayOf("textChange", "textAttrChanged"), requireAll = false)
    fun setTextChange(view: EditText, text: String, textAttrChanged: InverseBindingListener) {
        view.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                //TODO nothing
            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                textAttrChanged.onChange()
                view.setSelection(view.text.length)
            }

            override fun afterTextChanged(editable: Editable) {
                //TODO nothing
            }
        })
    }
}
```

Kết Quả:

![](https://images.viblo.asia/7ada69ad-1a2a-4450-a33f-77ce0b479e85.gif)
# 5. Phần Kết
Vậy là mình đã giới thiệu và làm ví dụ hướng dẫn cho 2 tính năng **BindingAdapter** và **InverseBindingAdapter** của **DataBinding** kết thúc tại đây.

**Cảm ơn bạn đã dành thời gian để đọc bài viết này.**