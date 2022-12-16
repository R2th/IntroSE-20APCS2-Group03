Đúng như cái tên, AsyncTask cho phép ta thực thi 1 task dưới background thread giúp giảm tải cho UI Thread.

Được sử dụng khá nhiều trong các vấn đề liên quan đến bất đồng bộ, nhưng bạn có biết cơ chế thực thi của AsyncTask hay không ? Liệu AsyncTask được thực thi song song hay tuần tự ?

Hãy cùng nhìn qua phương thức Execute() :
~~~java
public final AsyncTask<Params, Progress, Result> execute (Params... params)
~~~
Phương thức này sẽ thực thi task với các tham số được chỉ định và trả về một AsyncTask do đó ta có thể giữ tham chiếu đến nó.

**Note :**

Phụ thuộc vào các phiên bản Platform mà khi thực thi Task được chỉ định trên hàng đợi với Single Thread hay ThreadPool.

Khi mới được giới thiệu, Asynctask được thực thi nối tiếp trên một luồng nền đơn.

Bắt đầu từ API 4 (Build.VERSION_CODES.DONUT) nó được thay đổi thành 1 nhóm các luồng cho phép nhiều Task chạy song song.

Để tránh một số lỗi ứng dụng do thực thi song song, bắt đầu từ API 11 (Build.VERSION_CODES.HONEYCOMB) các task lại quay lại việc thực thi trên một luồng đơn.

Nếu thực sự muốn các Task được chạy song song, bạn có thể sử dụng phương thức và truyền vào một  THREAD_POOL_EXECUTOR.

Hãy cùng nhìn qua phương thức này nhé :
~~~java
public final AsyncTask<Params, Progress, Result> executeOnExecutor (Executor exec, Params... params)
~~~

Phương thức này thường được sử dụng với một [THREAD_POOL_EXECUTOR](https://developer.android.com/reference/android/os/AsyncTask#THREAD_POOL_EXECUTOR) cho phép nhiều task chạy song song trên một nhóm luồng được quản lý bởi AsyncTask.




Để rõ hơn hãy nhìn bảng bên dưới :

| API Level | execute() | executeOnExecutor() |
| -------- | -------- | -------- |
| 1 - 3     | Sequential     | Not available     |
| 4 - 10     | Concurrent     | Not available     |
| 11+     | Sequential     | Sequential/Concurrent     |

  
Giờ mình sẽ lấy một ví dụ để mình họa việc thực thi nhiều Task song song :
* Giao diện chương trình gồm có 5 progressBar.
* 3 progressBar đầu được cập nhật bởi 3 asyncTask bằng cách gọi execute()
* 2 progressBar sau được cập nhật bởi 2 asyncTask bằng cách gọi executeOnExecutor() 

{@youtube: https://www.youtube.com/watch?v=HNcE6MLnuIw}

~~~kotlin
class LoadingTask(progress: ProgressBar) : AsyncTask<Void, Int, Void>() {

    val mProgress: ProgressBar = progress

    override fun doInBackground(vararg voids: Void): Void? {
        for (i in 0..100) {
            publishProgress(i)
            SystemClock.sleep(100)
        }
        return null
    }

    override fun onProgressUpdate(vararg values: Int?) {
        mProgress.progress = values[0]!!
    }

}
~~~

~~~kotlin
class MainActivity : AppCompatActivity() {

    lateinit var mAsyncFirst: LoadingTask
    lateinit var mAsyncSecond: LoadingTask
    lateinit var mAsyncThird: LoadingTask
    lateinit var mAsyncFourth: LoadingTask
    lateinit var mAsyncFifth: LoadingTask

    lateinit var mProgress1: ProgressBar
    lateinit var mProgress2: ProgressBar
    lateinit var mProgress3: ProgressBar
    lateinit var mProgress4: ProgressBar
    lateinit var mProgress5: ProgressBar

    lateinit var mBtnStart: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mBtnStart = findViewById(R.id.button_start)

        mProgress1 = findViewById(R.id.progress_first)
        mProgress2 = findViewById(R.id.progress_second)
        mProgress3 = findViewById(R.id.progress_third)
        mProgress4 = findViewById(R.id.progress_fouth)
        mProgress5 = findViewById(R.id.progress_fifth)

        mAsyncFirst = LoadingTask(mProgress1)
        mAsyncSecond = LoadingTask(mProgress2)
        mAsyncThird = LoadingTask(mProgress3)
        mAsyncFourth = LoadingTask(mProgress4)
        mAsyncFifth = LoadingTask(mProgress5)

        mBtnStart.setOnClickListener {

            mAsyncFirst.execute()
            mAsyncSecond.execute()
            mAsyncThird.execute()

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                mAsyncFourth.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR)
                mAsyncFifth.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR)
            } else {
                mAsyncFourth.execute()
                mAsyncFifth.execute()
            }
        }
    }
}

~~~

**QUESTION**
1. Có thể khởi tạo 1 AsyncTask trong một thread không phải là Main Thread (UI Thread) hay không ?
    - Không, theo [Android Developer Docs](https://developer.android.com/reference/android/os/AsyncTask) :
        - "The task instance must be created on the UI thread."
        - "execute(Params...) must be invoked on the UI thread."

2. Nếu tạo 1 Thread mới rồi khởi tạo 1 instance AsyncTask thi onProgressUpdate sẽ chạy trên thread nào ?
    - Main Thread

3. Làm thế nào để cancel 1 AsyncTask ?
    - Khi AsyncTask đang được chạy mà bạn gọi mTask.cancel(true) thì hệ thống chỉ set **cancel flag = true** chứ không cancel AsyncTask => bạn phải check **isCancel()** trong doInBackground() thường xuyên.
    -  Nếu isCancel() được check -> thì **onCancel()** sẽ được gọi, điều này đồng nghĩa với việc **onPostExecuted()** không được gọi nữa.
~~~java
mTask.cancel(true) 
~~~
~~~java
protected Long doInBackground(URL... urls) {

         for (int i = 0; i < count; i++) {
          // you need to break your loop on particular condition here

             if(isCancelled())
                  break;             
         }
         return totalSize;
     }
~~~

**Tham khảo :** 


[android-er.blogspot](https://android-er.blogspot.com/2014/04/run-multi-asynctask-as-same-time.html)

https://developer.android.com/reference/android/os/AsyncTask