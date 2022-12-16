MVI- architecture pattern khá hot trong thời gian gần đây. Được dự đoán sẽ là hot trend trong năm 2018. Hôm nay chúng ta sẽ đến với một ví dụ đơn giản với màn hình login sử dụng pattern này kết hợp với databinding.

1. Mô tả với một ViewState

Trong MVI, chúng ta diễn tả các ViewState với một data class:

```java
data class LoginViewState(
        val email: String = "",
        val password: String = "",
        val submitButtonEnabled: Boolean = false,
        val loading: Boolean = false,
        val showError: Boolean = false,
        val errorMessage: String = "")
```

Giống như ở MVP, chúng ta sẽ có 1 interface cho màn hình login:
```java
interface LoginContract {
    interface View : MvpView {
        fun emailChangeIntent(): Observable<String>
        fun passwordChangeIntent(): Observable<String>
        fun submitIntent(): Observable<Pair<String, String>>
        fun render(viewState: LoginViewState)
    }

    abstract class Presenter : MviBasePresenter<View, LoginViewState>()

    interface Interactor {
        fun login(email: String, password: String): Observable<LoginPartialChanges>
    }
```

2. Partical view change

Khi làm việc với MVI, chúng ta sẽ có 1 câu hỏi: user hay backend sẽ ảnh hưởng đến view state. Câu hỏi này sẽ luôn theo bạn trong suốt dự án.

Hơn nữa, khi tạo một màn hình với databinding, bạn sẽ cần giữ các model của view state như một primitive class.

PartialViewChange  là một seal class đại diện cho các phần thay đổi của view state. 

```java
sealed class LoginPartialChanges {
    abstract fun reduce(previousState: LoginViewState): LoginViewState

    data class EmailChange(private val newValue: String) : LoginPartialChanges() {
        override fun reduce(previousState: LoginViewState): LoginViewState {
            return previousState.copy(
                    email = newValue,
                    submitButtonEnabled = newValue.isNotEmpty() && previousState.password.isNotEmpty())
        }
    }

    data class PasswordChange(private val newValue: String) : LoginPartialChanges() {
        override fun reduce(previousState: LoginViewState): LoginViewState {
            return previousState.copy(
                    password = newValue,
                    submitButtonEnabled = newValue.isNotEmpty() && previousState.email.isNotEmpty())
        }
    }

    object Success : LoginPartialChanges() {
        override fun reduce(previousState: LoginViewState): LoginViewState {
            return previousState.copy(loading = false, showError = false)
        }
    }

    object Loading : LoginPartialChanges() {
        override fun reduce(previousState: LoginViewState): LoginViewState {
            return previousState.copy(loading = true)
        }
    }

    data class Error(val message: String) : LoginPartialChanges() {
        override fun reduce(previousState: LoginViewState): LoginViewState {
            return previousState.copy(showError = true, errorMessage = message, loading = false)
        }
```

Ở presenter sẽ bind các intent từ view- nó subscribe để thay đổi text và button click.

```java
class LoginPresenter(private val interactor: LoginContract.Interactor) : LoginContract.Presenter() {
    override fun bindIntents() {

        val emailEditIntent = intent { it.emailChangeIntent() }
                .map { LoginPartialChanges.EmailChange(it) }

        val passwordEditIntent = intent { it.passwordChangeIntent() }
                .map { LoginPartialChanges.PasswordChange(it) }

        val submitIntent = intent { it.submitIntent() }
                .flatMap { interactor.login(it.first, it.second) }
                .observeOn(AndroidSchedulers.mainThread())

        val allIntentsObservable: Observable<LoginPartialChanges> = mergeArray(
                emailEditIntent,
                passwordEditIntent,
                submitIntent)

        subscribeViewState(allIntentsObservable.scan(LoginViewState(), this::viewStateReducer), LoginContract.View::render)
    }

    private fun viewStateReducer(previousState: LoginViewState, partialChanges: LoginPartialChanges) = partialChanges.reduce(previousState)
}
```

Submit intent được map với bussiness logic, nơi thực hiện các request API. Ở cuối phương thức, ta đang sử dụng scan operator trên observable đã merge.

Sau đó, chúng ta đã nhận được các thay đổi (với phương thức LoginPartialState ) cho view state mới.

3. Cuối cùng- View

Sau khi các logic đã được chuẩn bị. Giờ là đến lượt View:

```java
class LoginActivity : AppCompatActivity(), LoginContract.View {

    val binding: LoginActivityBinding by lazy {
        DataBindingUtil.setContentView<LoginActivityBinding>(this, R.layout.login_activity)
    }

    val presenter: LoginContract.Presenter by lazy {
        LoginPresenter(LoginInteractor())
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        presenter.attachView(this)
    }

    override fun emailChangeIntent(): Observable<String> = RxTextView.textChanges(binding.loginEmail)
            .skipInitialValue()
            .map { it.toString() }

    override fun passwordChangeIntent(): Observable<String> = RxTextView.textChanges(binding.loginPassword)
            .skipInitialValue()
            .map { it.toString() }

    override fun submitIntent(): Observable<Pair<String, String>> =
            RxView.clicks(binding.loginSubmit).map { binding.viewState?.let { it.email to it.password } }

    override fun render(viewState: LoginViewState) {
        binding.viewState = viewState
        binding.executePendingBindings()
    }

    override fun onDestroy() {
        presenter.destroy()
        super.onDestroy()
    }
}
```

Trong layout file, chúng ta có 2 trường input, 1 submit button, loading view và 1 nơi chứa các mesage lỗi. Hãy put tag <data> và set các thuộc tính:
    
```java
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>

        <import type="android.view.View" />

        <variable
            name="viewState"
            type="me.rozkmin.mvibinding.LoginViewState" />
    </data>

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_horizontal"
            android:orientation="vertical">

            <android.support.v7.widget.AppCompatEditText
                android:id="@+id/login_email"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:hint="@string/email" />

            <android.support.v7.widget.AppCompatEditText
                android:id="@+id/login_password"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:hint="@string/password"
                android:inputType="textPassword" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_gravity="center_horizontal"
                android:text="@{viewState.errorMessage}"
                android:visibility="@{viewState.showError ? View.VISIBLE : View.GONE}" />

            <Button
                android:id="@+id/login_submit"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:enabled="@{viewState.submitButtonEnabled}"
                android:text="@string/login_submit" />

        </LinearLayout>

        <ProgressBar
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:visibility="@{viewState.loading ? View.VISIBLE : View.GONE}" />
    </FrameLayout>

</layout>
```

Nguồn: https://proandroiddev.com/model-view-intent-data-binding-39c7a6a6512f