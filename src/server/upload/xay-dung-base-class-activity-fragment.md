Viết base class luôn luôn là 1 ý tưởng tốt nhất dành cho các dự án lớn. 
Vậy tại sao chúng ta lại cần phải viết base cho Activity, Fragment hay bất cứ thành phần nào trong quá trình phát triển ứng dụng. Đơn giản nhất các bạn có thể thấy nó sẽ tránh được việc 1 đoạn code được lặp đi lặp lại, code gọn gàng, sạch sẽ và tương minh hơn.
Trong bài viết này, mình sẽ hướng dẫn các bạn viết base class cho** Activity, Fragment** làm sao để đạt hiệu quả và tối ưu nhất, áp dụng các tính chất đặc trưng của Lập Trình Hướng Đối Tượng. 
## 1. Xây dựng BaseActivity
Base class (hay còn gọi là lớp cơ bản) thì chắc hẳn các bạn sẽ đều hiểu đó là một lớp cha, cho phép các lớp con kế thừa, và thừa hưởng những gì mà lớp cha cho phép. 
Chúng ta sẽ tạo 1 base class Activity, để sau đó các Activity khác nếu có trong ứng dụng của bạn sẽ kế thừa từ base class này.
Áp dụng tính chất trừu tượng, mình sẽ tạo 1 class BaseActivity với các phương thức như sau: 

```kotlin
abstract class BaseActivity : AppCompatActivity() {

    abstract fun getLayoutID(): Int
    abstract fun onCreateActivity(savedInstanceState: Bundle?)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(getLayoutID())
        onCreateActivity(savedInstanceState)
    }

}
```

Lưu ý: ***BaseActivity*** là 1 lớp trừu tượng, *getLayoutID()* và *onCreateActivity()* sẽ là 2 phương thức trừu tượng, 2 phương thức này sẽ được triển khai ở các lớp con (lớp dẫn xuất) kế thừa từ BaseActivity. 
Vậy là chúng ta đã tạo xong 1 lớp base cơ bản cho Activity, chưa dừng lại, nếu chỉ mỗi như thế này thì sẽ k đáng nói :D.
Mình sẽ có 1 bài toán cụ thể, và sẽ thêm mắm thêm muối cho lớp BaseActivity này nhé. 

Ví dụ:
Triển khai 1 ứng dụng có nhiều màn hình, và mỗi màn hình đều cần phải:
- Hiển thị / Loại bỏ ProgressDialog
- Kiểm tra trạng thái kết nối internet


<br>Vậy các bạn sẽ triển khai code như thế nào, chắc chắn sẽ có bạn sẽ check những requirement trên ở từng Activity. 
Đó cũng cách, tuy nhiên các bạn sẽ rất vất vả để copy code từ class này sang class khác, và khi người khác đọc code của bạn sẽ thấy nó thật dài dài và dài :D.
<br><br>Ở đây mình sẽ làm theo cách viết toàn bộ code xử lý những requirement trên vào lớp ***BaseActivity***, và những màn hình còn lại sẽ chỉ việc kế thừa lớp ***BaseActivity***, này và tái sử dụng những phương thức, thuộc tính cần thiết.
<br>Code như sau:
```kotlin
abstract class BaseActivity : AppCompatActivity() {

    var mProgressDialog: ProgressDialog? = null
    var isNetworkState: Boolean = false

    abstract fun getLayoutID(): Int
    abstract fun onCreateActivity()

    //Listener lắng nghe sự thay đổi trạng thái connect internet
    private var onNetworkConnectedListener: OnNetworkConnectedListener? = null
    fun setOnNetworkConnectedListener(onNetworkConnectedListener: OnNetworkConnectedListener) {
        this.onNetworkConnectedListener = onNetworkConnectedListener
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        isNetworkState = isNetworkConnected()
        registerBroadcastReciver()
        setContentView(getLayoutID())
        onCreateActivity()
    }

    override fun onPause() {
        super.onPause()
        mProgressDialog = null
    }


    fun showProgressLoadding() {
        if (mProgressDialog != null && mProgressDialog!!.isShowing) {
            mProgressDialog!!.dismiss()
            mProgressDialog = null
        }
        mProgressDialog = ProgressDialog(this)
        mProgressDialog!!.setIndeterminate(true)
        mProgressDialog!!.setMessage(resources.getString(R.string.loadding))
        mProgressDialog!!.setProgressStyle(ProgressDialog.STYLE_SPINNER)
        mProgressDialog!!.show()
    }

    fun updateMessageProgressDialog(message: String) {
        if (mProgressDialog != null && mProgressDialog!!.isShowing()) {
            mProgressDialog!!.setMessage(message)
        }
    }

    fun dismisProgressLoading() {
        if (mProgressDialog != null && mProgressDialog!!.isShowing()) {
            mProgressDialog!!.dismiss()
        }
    }

    //Đăng ký broadcast lắng nghe sự kiện thay đổi network
    private fun registerBroadcastReciver() {
        val filter = IntentFilter()
        filter.addAction(Const.ACTION_NETWORK_CHANGE)
        registerReceiver(receiver, filter)
    }

    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val action = intent.action
            if (action != null) {
                when (action) {
                    Const.ACTION_NETWORK_CHANGE -> {
                        isNetworkState = isNetworkConnected()
                        if (isNetworkState) {
                            onNetworkConnectedListener?.let {
                                it.onNetworkConnected()
                            }
                        } else {
                            onNetworkConnectedListener?.let {
                                it.onNetworkDisconnect()
                            }
                        }
                    }
                }
            }
        }
    }

    //Kiểm tra trạng thái internet
    fun isNetworkConnected(): Boolean {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNetInfor = connectivityManager.getActiveNetworkInfo()
        isNetworkState = activeNetInfor != null && activeNetInfor.isConnected
        return isNetworkState
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(receiver)
    }
}
```

Với lớp Baseactivity này, những Activity khác chỉ việc kế thừa và sử dụng lại nhưng gì đã có ở lớp BaseActivity. 
<br>
Ví dụ:
```kotlin
class SecondActivity : BaseActivity() {

    override fun getLayoutID(): Int {
        return R.layout.activity_main
    }

    override fun onCreateActivity() {

        //hien thi dialog loadding
        showProgressLoadding()

        //Kiem tra trang thai mang
        Log.d("", "Network state: $isNetworkState")
    }  
}
```

## 2. Xây dựng BaseFragment
Tương tự như cách xây dựng Activity, phần này mình sẽ đi luôn vào triển khai code như sau:<br><br>

Đầu tiên, mình sẽ xây dựng Extension (giống như với swift, objective-C, Extension đã được phát triển dành cho Android khi triển khai bằng ngôn ngữ Kotlin), 1 số phương thức dành cho Activity như sau:
```kotlin
fun AppCompatActivity.showToast(context: Context, message: String) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
}

fun AppCompatActivity.showSnackBar(message: String){
    Snackbar.make(findViewById(android.R.id.content), message, Snackbar.LENGTH_LONG).show()
}
```

Sau đó, lớp ***BaseFragment*** sẽ được triển khai như sau:

```kotlin
abstract class BaseFragment : Fragment() {


    abstract fun getLayoutID(): Int
    abstract fun onViewReady(view: View)


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(getLayoutID(), container, false)
        onViewReady(view)
        return view
    }

    fun showToast(context: Context, message: String) {
        if (activity is BaseActivity) {
            (activity as BaseActivity).showToast(context, message)
        }
    }

    fun showSnackBar(message: String) {
        if (activity is BaseActivity) {
            (activity as BaseActivity).showSnackBar(message)
        }
    }

    fun isNetworkConnected(): Boolean {
        if (activity is BaseActivity) {
            return (activity as BaseActivity).isNetworkState
        }
        return false
    }

}
```

Và ví dụ 1 fragment khác sẽ kế thừa BaseFragment này như sau:
```kotlin
class SecondFragment : BaseFragment() {


    override fun getLayoutID(): Int {
        return R.layout.fragment_second
    }

    override fun onViewReady(view: View) {
        //Init view at here
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        showSnackBar("Hello Fragment")
        
        //get state network
        val isNetwork = isNetworkConnected()
    }
}
```

Với cách triển khai này, các bạn có thể thấy phương thức *showSnackBar()* được định nghĩa ở extension của lớp AppCompatActivity, tuy nhiên ở fragment các bạn vẫn có thể gọi được 1 cách dễ dàng thông qua lớp BaseActivity, và BaseFragment. 

## 3. Tổng kết
Trên đây là 1 số tip nhỏ, mình đã hướng dẫn các bạn cách triển khai lớp base class dành cho Activity, Fragment, các bạn hoàn toàn có thể áp dụng tương tự cho bất cứ đối tượng, thành phần nào trong quá trình phát triển ứng dụng, để xây dựng code gọn gàng, sạch sẽ và tường minh, dễ hiểu. :D
<br>
Cám ơn các bạn đã dành thời gian theo dõi. Thanks you!