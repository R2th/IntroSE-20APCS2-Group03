![](https://images.viblo.asia/f816a5e9-e581-404b-a83a-170a64a41faa.png)
# Giới thiệu
Các mẫu kiến trúc Android đang phát triển từng ngày. Khi chúng ta phát triển ứng dụng, chúng ta bắt đầu sẽ những thách thức và vấn đề mới. Các mô hình mới sẽ được khám phá ra khi chúng ta tiếp tục giải quyết những thách thức tương tự. Là Dev Android, chúng ta đã biết các mô hình MVC, MVP và MVVM là các mẫu được sử dụng phổ biến nhất. Tất cả chúng đều sử dụng phương pháp lập trình mệnh lệnh. Với cách tiếp cận này, mặc dù hầu hết các khó khăn của chúng ta sẽ được giải quyết, chúng ta vẫn phải đối mặt với một số vấn đề liên quan đến an toàn luồng, duy trì trạng thái của ứng dụng. Với phần này, chúng ta hãy xem mô hình kiến trúc MVI là gì, cách nó giải quyết những thách thức này và cách bắt đầu với MVI.

Trong blog này, chúng ta sẽ tìm hiểu về

Kiến trúc MVI là gì?
MVI hoạt động như thế nào?
Ưu điểm và nhược điểm của MVI
Tạo một dự án với kiến trúc MVI

Nguồn: https://blog.mindorks.com/mvi-architecture-android-tutorial-for-beginners-step-by-step-guide

# Kiến trúc MVI là gì?
**MVI** là viết tắt của **Model-View-Intent**. Mô hình này đã được giới thiệu gần đây trong Android. Nó hoạt động dựa trên nguyên tắc của dòng chảy một chiều và hình trụ lấy cảm hứng từ Cycle.js framework.

Hãy xem vai trò của từng thành phần của MVI là gì.

* **Model**: Không giống như các pattern khác, Trong MVI thì **Model** đại diện cho trạng thái của giao diện người dùng. ví dụ: giao diện người dùng có thể có các trạng thái khác nhau như *Đang tải dữ liệu*, *Đã tải*, Thay đổi giao diện người dùng với Hành động của người dùng, Lỗi, Trạng thái vị trí màn hình hiện tại của người dùng. Mỗi trạng thái được lưu trữ tương tự như đối tượng trong mô hình.
* **View**: View trong MVI là Giao diện của chúng ta có thể được triển khai trong Activities và fragments. Nó có nghĩa là có một container có thể chấp nhận các trạng thái mô hình khác nhau và hiển thị nó dưới dạng giao diện người dùng. Họ sử dụng observable intents (Lưu ý: Điều này không đại diện cho các Intents truyền thống của Android) để phản hồi các hành động của người dùng.
* **Intent**: Mặc dù đây không phải là Intent như Android đã định nghĩa từ trước. Kết quả của các hành động của người dùng được chuyển dưới dạng giá trị đầu vào cho Intents. Đổi lại, chúng ta có thể nói rằng chúng ta sẽ gửi các model làm đầu vào cho Intent có thể tải nó thông qua View.

# MVI hoạt động như thế nào?
Người dùng thực hiện một hành động sẽ là Intent → Intent là trạng thái là đầu vào cho model → Model lưu trữ trạng thái và gửi trạng thái được yêu cầu đến View → View Tải trạng thái từ Model → Hiển thị cho người dùng. Nếu chúng ta quan sát, dữ liệu sẽ luôn chảy từ người dùng và kết thúc với người dùng thông qua mục đích. Nó không thể là theo cách khác, Do đó nó được gọi là kiến trúc *Một chiều*. Nếu người dùng thực hiện thêm một hành động thì cùng một chu kỳ được lặp lại, do đó nó là Chu kỳ.

![](https://images.viblo.asia/d47f7657-f65c-41f0-90b1-a45694087672.png)

# Ưu điểm và nhược điểm của MVI
## Ưu điểm của MVI

* Duy trì trạng thái không còn là một thách thức với kiến trúc này, vì nó chủ yếu tập trung vào các trạng thái.
* Vì nó là một chiều, nên có thể dễ dàng theo dõi và dự đoán Luồng dữ liệu.
* Nó đảm bảo an toàn luồng vì các đối tượng trạng thái là bất biến.
* Dễ dàng debug, Như chúng ta biết trạng thái của đối tượng khi xảy ra lỗi.
* Nó được tách rời nhiều hơn khi mỗi thành phần hoàn thành trách nhiệm của riêng mình.
* Việc kiểm tra ứng dụng cũng sẽ dễ dàng hơn vì chúng tôi có thể lập bản đồ logic nghiệp vụ cho từng trạng thái.

## Nhược điểm của MVI

* Nó dẫn đến rất nhiều mã soạn sẵn vì chúng ta phải duy trì trạng thái cho mỗi hành động của người dùng.
* Như chúng ta biết, nó phải tạo rất nhiều đối tượng cho tất cả các trạng thái. Điều này làm cho việc quản lý bộ nhớ ứng dụng quá tốn kém.
* Việc xử lý trạng thái cảnh báo có thể gặp khó khăn trong khi chúng ta xử lý các thay đổi cấu hình. Ví dụ: nếu không có internet, chúng tôi sẽ hiển thị thanh ăn nhẹ, Khi thay đổi cấu hình, nó hiển thị lại thanh nhanh như trạng thái của mục đích. Về khả năng sử dụng, điều này phải được xử lý.
Với nền này, hãy tạo một ứng dụng nhỏ với MVI

# Tạo một dự án với kiến trúc MVI
Hãy bắt đầu bằng cách thiết lập dự án Android.
```kotlin
// Added Dependencies
implementation "androidx.recyclerview:recyclerview:1.1.0"
implementation 'android.arch.lifecycle:extensions:1.1.1'
implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0'
implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.2.0'
implementation 'com.github.bumptech.glide:glide:4.11.0'

//retrofit
implementation 'com.squareup.retrofit2:retrofit:2.8.1'
implementation "com.squareup.retrofit2:converter-moshi:2.6.2"

//Coroutine
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.6"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.6"
```
## Project Structure

Đối với dự án, Chúng ta sẽ theo từng bước của dự án sử dụng MVI. package của chúng ta trong dự án sẽ như dưới đây.
![](https://images.viblo.asia/808accc9-6d9f-43cc-b540-b3f2ed331a0a.png)
## Thiết lập các lớp dữ liệu
Bây giờ, trong phần này, chúng ta sẽ thiết lập lớp dữ liệu.
Trong package dữ liệu, chúng ta sẽ có các gói api, model và repository. Chúng ta sẽ tạo các gói này và hãy tập trung vào việc thêm các lớp vào từng gói một.

Hãy thêm các lớp hỗ trợ API.

Chúng ta cần một model mà response sẽ được chuyển đổi. Tạo lớp dữ liệu User.kt như hình bên dưới.
```kotlin
package com.mindorks.framework.mvi.data.model

import com.squareup.moshi.Json

data class User(
    @Json(name = "id")
    val id: Int = 0,
    @Json(name = "name")
    val name: String = "",
    @Json(name = "email")
    val email: String = "",
    @Json(name = "avatar")
    val avatar: String = ""
)
```
Tạo ApiHelper.kt interface
```kotlin
package com.mindorks.framework.mvi.data.api

import com.mindorks.framework.mvi.data.model.User

interface ApiHelper {

    suspend fun getUsers(): List<User>

}
```
>Note: We have used suspend keyword to support Coroutines so that we can call it from a Coroutine or another suspend function.

Tạo một lớp ApiService.kt nơi chúng tôi sẽ chỉ định các phương thức HTTP để giao tiếp với API.
```kotlin
package com.mindorks.framework.mvi.data.api

import com.mindorks.framework.mvi.data.model.User
import retrofit2.http.GET

interface ApiService {

   @GET("users")
   suspend fun getUsers(): List<User>
}
```
Bây giờ hãy thêm trình tạo trang bị thêm để tạo URL điểm cuối và sử dụng các dịch vụ REST.
```kotlin
package com.mindorks.framework.mvi.data.api

import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

object RetrofitBuilder {

    private const val BASE_URL = "https://5e510330f2c0d300147c034c.mockapi.io/"

    private fun getRetrofit() = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(MoshiConverterFactory.create())
        .build()
        
    val apiService: ApiService = getRetrofit().create(ApiService::class.java)
}
```
Chúng ta cần triển khai interface để lấy về List<Users>, tạo ApiHelperImpl.kt
```kotlin
package com.mindorks.framework.mvi.data.api

import com.mindorks.framework.mvi.data.model.User

class ApiHelperImpl(private val apiService: ApiService) : ApiHelper {
    override suspend fun getUsers(): List<User> {
        return apiService.getUsers()
    }
}
```
Bây giờ chúng ta đã sẵn sàng giao tiếp với các Service còn lại trong lớp dữ liệu của chúng ta.

Chúng ta sẽ cần một repository để request dữ liệu. Trong trường hợp của chúng ta, chúng ta đang gọi phương thức getUsers từ hoạt động thông qua ViewModel để lấy danh sách người dùng. Tạo MainRepository.kt

```kotlin
package com.mindorks.framework.mvi.data.repository

import com.mindorks.framework.mvi.data.api.ApiHelper

class MainRepository(private val apiHelper: ApiHelper) {

    suspend fun getUsers() = apiHelper.getUsers()
}
```
Vậy là lớp dữ liệu của chúng ta đã sẵn sàng. Đến với phần giao diện người dùng, chúng ta cần một adapter cho recyclerview, Mục đích để lưu trữ hành động của người dùng, hoạt động chính của chúng ta trong chế độ xem, MainViewModel trong viewModel, Trạng thái xem nơi chúng ta đã xác định các trạng thái khác nhau mà chúng ta cần tải dữ liệu vào chế độ xem.
    
tạo MainAdapter trong adapter package
```kotlin
package com.mindorks.framework.mvi.ui.main.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.mindorks.framework.mvi.R
import com.mindorks.framework.mvi.data.model.User
import kotlinx.android.synthetic.main.item_layout.view.*

class MainAdapter(
    private val users: ArrayList<User>
) : RecyclerView.Adapter<MainAdapter.DataViewHolder>() {

    class DataViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(user: User) {
            itemView.textViewUserName.text = user.name
            itemView.textViewUserEmail.text = user.email
            Glide.with(itemView.imageViewAvatar.context)
                .load(user.avatar)
                .into(itemView.imageViewAvatar)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        DataViewHolder(
            LayoutInflater.from(parent.context).inflate(
                R.layout.item_layout, parent,
                false
            )
        )

    override fun getItemCount(): Int = users.size

    override fun onBindViewHolder(holder: DataViewHolder, position: Int) =
        holder.bind(users[position])

    fun addData(list: List<User>) {
        users.addAll(list)
    }

}
```
Tạo MainIntent.kt trong intent package

```kotlin
package com.mindorks.framework.mvi.ui.main.intent

sealed class MainIntent {

    object FetchUser : MainIntent()

}
```
Bây giờ thêm MainState.kt dưới package viewstate. Đây là phần quan trọng nhất của MVI. Trong lớp này, chúng tôi đang xác định các trạng thái Chờ, đang tải, người dùng, lỗi. Mỗi trạng thái có thể được tải vào chế độ xem theo ý định của người dùng.
```kotlin
package com.mindorks.framework.mvi.ui.main.viewstate

import com.mindorks.framework.mvi.data.model.User

sealed class MainState {

    object Idle : MainState()
    object Loading : MainState()
    data class Users(val user: List<User>) : MainState()
    data class Error(val error: String?) : MainState()

}
```
tạo ViewModel class - MainViewModel

```kotlin
package com.mindorks.framework.mvi.ui.main.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mindorks.framework.mvi.data.repository.MainRepository
import com.mindorks.framework.mvi.ui.main.intent.MainIntent
import com.mindorks.framework.mvi.ui.main.viewstate.MainState
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.consumeAsFlow
import kotlinx.coroutines.launch

@ExperimentalCoroutinesApi
class MainViewModel(
    private val repository: MainRepository
) : ViewModel() {

    val userIntent = Channel<MainIntent>(Channel.UNLIMITED)
    private val _state = MutableStateFlow<MainState>(MainState.Idle)
    val state: StateFlow<MainState>
        get() = _state

    init {
        handleIntent()
    }

    private fun handleIntent() {
        viewModelScope.launch {
            userIntent.consumeAsFlow().collect {
                when (it) {
                    is MainIntent.FetchUser -> fetchUser()
                }
            }
        }
    }

    private fun fetchUser() {
        viewModelScope.launch {
            _state.value = MainState.Loading
            _state.value = try {
                MainState.Users(repository.getUsers())
            } catch (e: Exception) {
                MainState.Error(e.localizedMessage)
            }
        }
    }
}
```
Ở đây trong ViewModel, chúng ta observing **userIntent** để thực hiện hành động trên nó.

Và dựa trên phản hồi từ lớp dữ liệu, chúng ta thay đổi trạng thái bên trong phương thức fetchUser. Và trạng thái đó đang được observed trong MainActivity.

Chúng ta thiết lập ViewModelFactory theo util package.

Chúng ta đang khởi tạo viewModel trong lớp này và chúng tôi sẽ trả về phiên bản của ViewModel.
```kotlin
package com.mindorks.framework.mvi.util

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.mindorks.framework.mvi.data.api.ApiHelper
import com.mindorks.framework.mvi.data.repository.MainRepository
import com.mindorks.framework.mvi.ui.main.viewmodel.MainViewModel

class ViewModelFactory(private val apiHelper: ApiHelper) : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            return MainViewModel(MainRepository(apiHelper)) as T
        }
        throw IllegalArgumentException("Unknown class name")
    }

}
```
Bây giờ, hãy setup XML layout.

update activity_main.xml:
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.main.view.MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:visibility="gone" />

    <ProgressBar
        android:id="@+id/progressBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:visibility="gone"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/buttonFetchUser"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/fetch_user"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
 Thêm item_layout.xml:
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="60dp">

    <ImageView
        android:id="@+id/imageViewAvatar"
        android:layout_width="60dp"
        android:layout_height="0dp"
        android:padding="4dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/textViewUserName"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="4dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/imageViewAvatar"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="MindOrks" />

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/textViewUserEmail"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="@+id/textViewUserName"
        app:layout_constraintTop_toBottomOf="@+id/textViewUserName"
        tools:text="MindOrks" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
Và string trong strings.xml.

```kotlin
<string name="fetch_user">Fetch User</string>
```
Với lớp MainAcitvity.kt. Chúng ta sẽ thêm dưới view package. Đây là activity hướng tới người dùng và lấy đầu vào từ người dùng, dựa trên MVI này kiểm tra các trạng thái được đề cập trong viewModel và tải trạng thái cụ thể trong chế độ xem.

Hãy xem cách MainActivity xử lý yêu cầu dữ liệu, xử lý trạng thái
```kotlin
package com.mindorks.framework.mvi.ui.main.view

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProviders
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.mindorks.framework.mvi.R
import com.mindorks.framework.mvi.data.api.ApiHelperImpl
import com.mindorks.framework.mvi.data.api.RetrofitBuilder
import com.mindorks.framework.mvi.data.model.User
import com.mindorks.framework.mvi.util.ViewModelFactory
import com.mindorks.framework.mvi.ui.main.adapter.MainAdapter
import com.mindorks.framework.mvi.ui.main.intent.MainIntent
import com.mindorks.framework.mvi.ui.main.viewmodel.MainViewModel
import com.mindorks.framework.mvi.ui.main.viewstate.MainState
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

@ExperimentalCoroutinesApi
class MainActivity : AppCompatActivity() {

    private lateinit var mainViewModel: MainViewModel
    private var adapter = MainAdapter(arrayListOf())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupUI()
        setupViewModel()
        observeViewModel()
        setupClicks()
    }

    private fun setupClicks() {
        buttonFetchUser.setOnClickListener {
            lifecycleScope.launch {
                mainViewModel.userIntent.send(MainIntent.FetchUser)
            }
        }
    }


    private fun setupUI() {
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.run {
            addItemDecoration(
                DividerItemDecoration(
                    recyclerView.context,
                    (recyclerView.layoutManager as LinearLayoutManager).orientation
                )
            )
        }
        recyclerView.adapter = adapter
    }


    private fun setupViewModel() {
        mainViewModel = ViewModelProviders.of(
            this,
            ViewModelFactory(
                ApiHelperImpl(
                    RetrofitBuilder.apiService
                )
            )
        ).get(MainViewModel::class.java)
    }

    private fun observeViewModel() {
        lifecycleScope.launch {
            mainViewModel.state.collect {
                when (it) {
                    is MainState.Idle -> {

                    }
                    is MainState.Loading -> {
                        buttonFetchUser.visibility = View.GONE
                        progressBar.visibility = View.VISIBLE
                    }

                    is MainState.Users -> {
                        progressBar.visibility = View.GONE
                        buttonFetchUser.visibility = View.GONE
                        renderList(it.user)
                    }
                    is MainState.Error -> {
                        progressBar.visibility = View.GONE
                        buttonFetchUser.visibility = View.VISIBLE
                        Toast.makeText(this@MainActivity, it.error, Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }

    private fun renderList(users: List<User>) {
        recyclerView.visibility = View.VISIBLE
        users.let { listOfUsers -> listOfUsers.let { adapter.addData(it) } }
        adapter.notifyDataSetChanged()
    }
}
```
Ở đây, chúng ta đang gửi ý định tìm nạp dữ liệu khi nhấp vào nút (Hành động của người dùng).

Ngoài ra, chúng ta observing Trạng thái ViewModel để biết các thay đổi trạng thái. Và, sử dụng điều kiện "when", chúng tôi đang so sánh trạng thái ý định phản hồi và tải các trạng thái tương ứng.

Cuối cùng, thêm Quyền truy cập Internet vào dự án của bạn. Thêm phần sau vào AndroidManifest.xml:
```kotlin
<uses-permission android:name="android.permission.INTERNET"/>
```
# Kết luận
Vì chúng ta đã thực hiện một số bước đơn giản hóa trong dự án này cho cấp độ Beginners, vì vậy, chúng ta có thể cải thiện dự án này để lên cấp độ Nâng cao, một số điều chúng ta có thể cải thiện như sau:

Triển khai Dependency Inject Framework - Dagger trong dự án.
Tạo ApiService Singleton và sử dụng lại cùng một phiên bản cho tất cả các tính năng.
Tạo các lớp cơ sở như BaseActivity.
Xử lý tất cả các lỗi API tại một nơi theo cách tốt hơn.
Tạo Giao diện cho các lớp bất cứ khi nào cần thiết.
Tận dụng các tiện ích mở rộng KTX - Kotlin của Android.
Viết Unit-Test
và như thế.
    
Mình hi vọng, các bạn đã hiểu hơn về MVI. và hãy sử dụng các mô hình phù hợp với dự án của bạn nhé :D
    
Have fun!