Xin chào các bạn trong bài viết này, mình sẽ hướng dẫn các bạn tìm hiểu và cách triển khai Mô hình kiến trúc MVVM trong Ứng dụng Android, không khó khăn lắm đâu cùng theo dõi nha 😊

**1>Định Nghĩa**

MVVM là viết tắt của Model, View, ViewModel

 - Model: Là nơi giữ dữ liệu của ứng dụng, được lấy từ nhiều nguồn khác nhau. Nó không thể nói chuyện trực tiếp với View.

 - View: Nó đại diện cho giao diện người dùng của ứng dụng không có bất kỳ Logic ứng dụng nào. Nó quan sát ViewModel.

 - ViewModel: Nó có trách nhiệm chuẩn bị và quản lý dữ liệu, cho một UI component (có thể là Activity hoặc Fragment). Nó cung cấp cách để dễ dàng giao tiếp giữa activity và fragment hoặc giữa các fragment với nhau.

![](https://images.viblo.asia/570d54b3-6105-4d3f-ad0a-5537ba5d04ac.png)

Sự khác biệt với MVP

- ViewModel thay thế cho Presenter ở lớp giữa
- Presenter giữ tham chiếu đến View, ViewModel không giữa tham chiếu đến View
- Presenter update View bằng cách sử dụng interface, ViewModel sử dụng livedata
- Trong MVP mối quan hệ View-Presenter 1-1
- Trong MVVM mối quan hệ View-ViewModel 1-n
- ViewModel độc lập và không biết View đang lắng nghe nó

**2>Triển Khai**

Đây là cấu trúc dự án
![image.png](https://images.viblo.asia/33030ba9-b843-4301-a2b0-fc272e14b1be.png)


**Adding the Data Binding Library**

```
implementation 'com.amitshekhar.android:rx2-android-networking:1.0.2'
implementation 'io.reactivex.rxjava2:rxjava:2.2.18'
implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
```

   Thư viện đầu tiên cung cấp cho chúng ta cách xử lý network nhanh chóng, nó có thể xử lý mọi thứ từ api như xử lý response, up/down file,...chúng ta đơn giản chỉ cần tạo request và handle reponse.
   
   Chúng ta sử dụng thử hiện rxjava để thực hiện đa luồng trong ứng dụng android
   
**Model**

```
import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id")
    val id: Int = 0,
    @SerializedName("name")
    val name: String = "",
    @SerializedName("email")
    val email: String = "",
    @SerializedName("avatar")
    val avatar: String = ""
)
```

Class User.kt là lớp giữ dữ liệu user 

**ViewModel**

```

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.demomvvm.data.model.User
import com.example.demomvvm.data.repository.MainRepository
import com.mindorks.framework.mvvm.utils.Resource
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class MainViewModel(private val mainRepository: MainRepository) : ViewModel() {

    private val users = MutableLiveData<Resource<List<User>>>()
    private val compositeDisposable = CompositeDisposable()

    init {
        fetchUsers()
    }

    private fun fetchUsers() {
        users.postValue(Resource.loading(null))
        compositeDisposable.add(
            mainRepository.getUsers()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({ userList ->
                    users.postValue(Resource.success(userList))
                }, { throwable ->
                    users.postValue(Resource.error("Something Went Wrong", null))
                })
        )
    }

    override fun onCleared() {
        super.onCleared()
        compositeDisposable.dispose()
    }

    fun getUsers(): LiveData<Resource<List<User>>> {
        return users
    }
}

```

**MainViewModel.kt** là nơi lưu trữ dữ liệu user đã được fetch về từ api 

Thiết lập giao tiếp giữa View và ViewModel. Tại ViewModel chúng ta tạo một biến livedata **users** để View có thể observe mỗi khi biến data có giá trị hoặc lúc nó thay đổi. Phần mở rộng của biến users có chứa từ khóa **Resource** để đảm bảo rằng biến này có thể có các trạng thái khác nhau. Trong demo trên thì nó có 3 trạng thái lúc đang loading, fetch data sucess và fetch data faild. 

**compositeDisposable** để chúng ta có thể hủy kết nối của subserver vs subsevable khi đã không còn sử dụng. Bạn cứ tưởng tượng khi bạn đang ở activity A ( Tại activityA đang tạo một chuỗi RxJava 2 và subscribe đối với nó) mà bạn start activityB mà không disapose với nó thì nó có thể bị rò rỉ bộ nhớ

**fetchUsers()** là function để lấy yêu cầu lấy dữ liệu từ api và lắng nghe giá trị trả về trong subscribe

**onCleared()** dùng để dọn dẹp, loại bỏ tất cả các subscription để tránh rò rỉ bộ nhớ.

**getUser()** dùng để tham chiếu và lấy dữ liệu từ livedata users.


```
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.demomvvm.data.api.ApiHelper
import com.example.demomvvm.data.repository.MainRepository
import com.example.demomvvm.viewmodel.MainViewModel

class ViewModelFactory(private val apiHelper: ApiHelper) : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            return MainViewModel(MainRepository(apiHelper)) as T
        }
        throw IllegalArgumentException("Unknown class name")
    }
}

```

Do chúng ta cần sử dụng một ViewModel với contructor có tham số nên chúng ta phải tạo một class mới kế thừa từ **ViewModelProvider.Factory** để dùng để khởi tạo ViewModel. Lí do là vì khi sử dụng **ViewModelProvider** nó sẽ tạo một **ViewModelProvider.Factory** mặc định, khi sử dụng **ViewModelFrovider.Factory** này nó sẽ gọi **primary contructor** cho việc tạo instance dẫn đến trong quá trình biên dịch nó sẽ lỗi compile.

**View** 

```

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.demomvvm.R
import com.example.demomvvm.data.api.ApiHelper
import com.example.demomvvm.data.api.ApiServiceImpl
import com.example.demomvvm.data.model.User
import com.example.demomvvm.base.ViewModelFactory
import com.example.demomvvm.adapter.MainAdapter
import com.example.demomvvm.viewmodel.MainViewModel
import com.mindorks.framework.mvvm.utils.Status
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var mainViewModel: MainViewModel
    private lateinit var adapter: MainAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupUI()
        setupViewModel()
        setupObserver()
    }

    private fun setupUI() {
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = MainAdapter(arrayListOf())
        recyclerView.addItemDecoration(
            DividerItemDecoration(
                recyclerView.context,
                (recyclerView.layoutManager as LinearLayoutManager).orientation
            )
        )
        recyclerView.adapter = adapter
    }

    private fun setupObserver() {
        mainViewModel.getUsers().observe(this, Observer {
            when (it.status) {
                Status.SUCCESS -> {
                    progressBar.visibility = View.GONE
                    it.data?.let { users -> renderList(users) }
                    recyclerView.visibility = View.VISIBLE
                }
                Status.LOADING -> {
                    progressBar.visibility = View.VISIBLE
                    recyclerView.visibility = View.GONE
                }
                Status.ERROR -> {
                    //Handle Error
                    progressBar.visibility = View.GONE
                    Toast.makeText(this, it.message, Toast.LENGTH_LONG).show()
                }
            }
        })
    }

    private fun renderList(users: List<User>) {
        adapter.addData(users)
        adapter.notifyDataSetChanged()
    }

    private fun setupViewModel() {
        mainViewModel = ViewModelProviders.of(
            this,
            ViewModelFactory(ApiHelper(ApiServiceImpl()))
        ).get(MainViewModel::class.java)
    }
}

```

**MainActivity.kt** là lớp để xử lý hiển thị lên người dùng

**mainViewModel** là biến khởi tạo của MainViewModel, cho phép tham chiếu đến các funtion, livedata từ viewmodel đế activity . **ViewModelProvider** được dùng để lấy istance của ViewModel trong **ViewModelStrore**. Nó trả về instance của ViewModel nếu nó đã tồn tại nếu không thì nó sẽ tạo ra một cái mới.

Function setupObserber dùng để lắng nghe livedata **users** và thực hiện xử lý UI theo case đối với từng giá trị mà livedata nhận được 

**Layout**

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".view.MainActivity">

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
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
**activity_main.xml** là xml của MainActivity

Cuối cùng, thêm Quyền truy cập Internet vào project. Thêm dòng này vào AndroidManifest.xml:

```
<uses-permission android:name="android.permission.INTERNET"/>
```


Kết quả khi triển khai ứng dụng :

{@embed: https://www.youtube.com/watch?v=PW03ctntO9A}

Trên đây là bài giới thiệu tổng quan về mô hình MVVM và cách triển khai mô hình vào ứng dụng. Ở bài sau mình sẽ chỉ các bạn cách xây dựng ứng dụng xem thời tiết áp dụng corountines và flow những kỹ thuật hay trong lập trình multi thread android để áp dụng vào demo. Các bạn cùng đón xem nhé 😊

Nguồn tham khảo:
https://www.journaldev.com/20292/android-mvvm-design-pattern

Code github: 
https://github.com/nambmt97s/DemoMVVM