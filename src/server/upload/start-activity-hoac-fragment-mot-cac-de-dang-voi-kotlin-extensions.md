![](https://images.viblo.asia/7f5262ae-54ee-4e8e-960c-e4414d09b5ba.jpg)
Ở ngôn ngữ Kotlin bạn sẽ có rất nhiều điều để khám phá đấy. Ở bài viết này mình sẽ giới thiệu đến các bạn một cách sử dụng Kotlin extension mehtod. Cụ thể hơn là startActivity (Lauching Activitites)
### Khởi chạy Activity theo cách truyền thống
Khởi chạy các activity trong ứng dụng Android là một nhiệm vụ phổ biến và các nhà phát triển khác nhau sử dụng các phương pháp khác nhau. Đa số chúng ta thường sử dụng các cách truyền thống để tạo các  `Intent` bundle và chuyển chúng trong các phương thức `startActivity ()` cùng với các `Intents`.

Nào, bày giờ hãy cùng nhìn vào cách truyền thống điển hình kinh điển mà chúng ta thường hay dùng nào :
```

        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)

```

Và trường hợp ta có truyền data đi kèm thì sẽ thế này :
```

        val intent = Intent(this, HomeActivity::class.java)
        intent.putExtra("DataNumber", 10 )
        intent.putExtra("DataString", "Hello HiHi")
        startActivity(intent)
        
```


### Khởi chạy Acvitity - Đơn giản, dễ dàng, tái sử dụng
Mình sẽ tạo ra một số phương thức mở rộng của Kotlin (Kotlin extension methods) bằng cách sử dụng từ khóa `reified`, chúng ta có thể làm cho chúng đơn giản và thú vị hơn rất nhiều.

```
inline fun <reified T : Any> Activity.lauchActivity(
    requestCode: Int = -1,
    options: Bundle? = null,
    noinline init: Intent.() -> Unit = {}
) {
    val intent = newIntent<T>(this)
    intent.init()
    startActivityForResult(intent, requestCode, options)
}

inline fun <reified T : Any> Context.lauchActivity(
    options: Bundle? = null,
    noinline init: Intent.() -> Unit = {}
) {
    val intent = newIntent<T>(this)
    intent.init()
    startActivity(intent, options)
}

inline fun <reified T : Any> newIntent(context: Context): Intent = Intent(context, T::class.java)

```

Hoặc không sử dụng từ khóa `reified`

```
fun AppCompatActivity.lauchActivity(@NonNull intent: Intent,
        flags: Int? = null) {
    flags.notNull {
        intent.flags = it
    }
    startActivity(intent)
}

fun AppCompatActivity.lauchActivity(@NonNull intent: Intent,
        requestCode: Int, flags: Int? = null) {
    flags.notNull {
        intent.flags = it
    }
    startActivityForResult(intent, requestCode)
}

```

Và chúng ta sẽ sử dụng các method trên như thế này nè .
```
lauchActivity<HomeActivity> {  }
```

Hoặc theo cách có gửi theo data như thế này
```
 lauchActivity<HomeActivity> { 
            putExtra("DataNumber", 10)
            putExtra("DataString", "Hello HiHi")
        }
```

Hoặc thêm nữa :
```
        lauchActivity<HomeActivity>()
        
        lauchActivity<HomeActivity> {
            putExtra("DataBoolean", false)
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        }

        lauchActivity<HomeActivity>(requestCode = 99) {
            putExtra("DATA", "")
        }
```

Và kết bài là một số mẫu extension thông dụng bạn có thể sử dụng cho dự án của bạn.

Dành cho Fragment :
```
fun Fragment.replaceFragment(@IdRes containerId: Int, fragment: Fragment,
        addToBackStack: Boolean = false, tag: String = fragment::class.java.simpleName) {
    fragmentManager?.transact {
        if (addToBackStack) {
            addToBackStack(tag)
        }
        replace(containerId, fragment, tag)
    }
}

fun Fragment.addFragment(fragment: Fragment, addToBackStack: Boolean = false,
        tag: String = fragment::class.java.simpleName) {
    fragmentManager?.transact {
        if (addToBackStack) {
            addToBackStack(tag)
        }
        add(fragment, tag)
    }
}

fun Fragment.goBackFragment(): Boolean {
    fragmentManager.notNull {
        val isShowPreviousPage = it.backStackEntryCount > 0
        if (isShowPreviousPage) {
            it.popBackStackImmediate()
        }
        return isShowPreviousPage
    }
    return false
}

/**
 * Runs a FragmentTransaction, then calls commitAllowingStateLoss().
 */
inline fun FragmentManager.transact(action: FragmentTransaction.() -> Unit) {
    beginTransaction().apply {
        action()
    }.commitAllowingStateLoss()
}
```

hoặc cho View chẵn hạn
```
fun View.show() {
    visibility = View.VISIBLE
}

fun View.hide() {
    visibility = View.INVISIBLE
}

fun View.gone() {
    visibility = View.GONE
}

fun View.isVisible(): Boolean {
    return visibility == View.VISIBLE
}
```

Hoặc dùng cho Rx thì sao
```
/**
 * Use SchedulerProvider configuration for Observable
 */
fun Completable.withScheduler(scheduler: BaseSchedulerProvider): Completable =
        this.observeOn(scheduler.ui()).subscribeOn(scheduler.io())

/**
 * Use SchedulerProvider configuration for Single
 */
fun <T> Single<T>.withScheduler(scheduler: BaseSchedulerProvider): Single<T> =
        this.observeOn(scheduler.ui()).subscribeOn(scheduler.io())

/**
 * Use SchedulerProvider configuration for Observable
 */
fun <T> Observable<T>.withScheduler(scheduler: BaseSchedulerProvider): Observable<T> =
        this.observeOn(scheduler.ui()).subscribeOn(scheduler.io())
```

Trên đây là một số mẫu Extension mình thường hay dùng . Mong rằng bài viết này sẽ có ích cho các bạn. Cảm ơn các bạn đã dành thời gian để đọc nó.
Nguồn tham khảo : https://android.jlelse.eu/launching-activities-in-easier-way-using-kotlin-extensions-121a8175220c