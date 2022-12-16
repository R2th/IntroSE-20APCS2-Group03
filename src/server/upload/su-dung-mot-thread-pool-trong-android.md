ThreadPool là 1 hàng đợi single FIFO task với 1 nhóm các worker threads. Nhà sản xuất (như UI thread) gửi task đến hàng đợi task. Bất cứ khi nào worker threads trong ThreadPool trở nên available, chúng xóa các task từ phía trước hàng đợi và bắt đầu chạy chúng.

So Sánh với việc bắt đầu một số ngẫu nhiên các chuỗi worker threads riêng lẻ, sử dụng một ThreadPool ngăn cản việc kill và tạo lại các threads mỗi khi một worker thread là cần thiết. Nó cũng cung cấp cho bạn kiểm soát tốt về số lượng các threads và trong vòng đời của nó. Ví dụ  ThreadPoolExeculor cho phép bạn xác định có bao nhiêu core threads, max threads trong pool có thể tạo và giữ thời gian sống cho các threads nhàn rỗi

Android hỗ trợ Executor framework của java, cung cấp các classes sau để sử dụng một ThreadPool:

* Executor: 1 interface có 1 method thực hiện. Nó được thiết kế để ngăn chặn việc gửi task từ running.
* Callable: 1 interface giống runnable nhưng cho phép 1 kết quả được trả về
* Future: Giống promise trong JavaScript. Nó đại diện cho kết quả cho một task không đồng bộ
* ExecutorService: 1 interface kế thừa từ interface Executor. Nó được sử dụng để quản lý threads trong ThreadPool
* ThreadPoolExecutor: 1 class implement ExecutorService cho phép kiểm soát tốt trên ThreadPool (ví dụ, kích thước core pool, max pool, thời gian hoạt động...)
* ScheduledThreadPoolExecutor: 1 class kế thừa ThreadPoolExecutor. Nó có thể lên lịch các task sau 1 thời gian delay or định kỳ
* Executors: 1 classs cung cấp các method factory và util cho các lớp nói trên
* ExecutorCompletionService: 1 class sắp xếp task được gửi sẽ được đặt trên hàng đợi để truy cập kết quả

### Basic Thread Pool
Cách đơn giản nhất để tạo 1 ThreadPool là sử dụng một trong các method từ factory của class Executors.

```
static final int DEFAULT_THREAD_POOL_SIZE = 4;

ExecutorService executorService = Executors.newFixedThreadPool(DEFAULT_THREAD_POOL_SIZE);

ExecutorService executorService = Executors.newCachedThreadPool();

ExecutorService executorService = Executors.newSingleThreadExecutor();
```

* newFixedThreadPool tạo 1 ThreadPool với 1 số lượng cố định threads trong pool được chỉ định với dev. Dev có thể gọi setCorePoolSize(int) sau đó để thay đổi kích thước ThreadPool
* newCachedThreadPool tạo 1 thread mới khi có 1 task trong hàng đợi. Khi không có task trong hàng đợi với 60 giây, những threads nhàn dỗi sẽ bị chấm dứt.
* newSingleThreadExecutor tạo 1 ThreadPool với chỉ 1 thread.
Để thêm 1 task vào ThreadPool, gọi 1 trong những method dưới đây:
```
executorService.execute(new Runnable(){
  @Override
  public void run(){
    callBlockingFunction();
  }
});

Future future = executorService.submit(new Callable(){
  @Override
  public Object call() throws Exception {
    callBlockingFunction();
    return null;
  }
});
```
Method thứ 2 trả về 1 đối tượng future. Nó có thể được sử dụng để lấy kết quả từ callable bằng cách gọi hàm future.get() hoặc hủy task bằng cách gọi future.cancel(boolean mayInterruptIfRunning).

### Advanced Thread Pool
Nếu bạn muốn có quyền kiểm soát tốt hơn đối với ThreadPool, ThreadPoolExecutor có thể là lựa chọn tốt cho bạn. Trong ví dự sau, đầu tiên tôi tìm bộ xử lý có sẵn của điện thoại. ThreadPool được cấu hình để có kích thước chính là NUMBER_OF_CORES, kích thước core tối đa là NUMBER_OF_CORE x 2, thời gian chờ của threads nhàn rỗi là 1 giây, hàng đợi task như là 1 đối tượng LinkedBlockingQueue và một thread factory tùy chỉnh.
```
int NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors();
int KEEP_ALIVE_TIME = 1;
TimeUnit KEEP_ALIVE_TIME_UNIT = TimeUnit.SECONDS;

BlockingQueue<Runnable> taskQueue = new LinkedBlockingQueue<Runnable>();

ExecutorService executorService = new ThreadPoolExecutor(NUMBER_OF_CORES, 
                                                          NUMBER_OF_CORES*2, 
                                                          KEEP_ALIVE_TIME, 
                                                          KEEP_ALIVE_TIME_UNIT, 
                                                          taskQueue, 
                                                          new BackgroundThreadFactory());
                                                          
private static class BackgroundThreadFactory implements ThreadFactory {
  private static int sTag = 1;

  @Override
  public Thread newThread(Runnable runnable) {
      Thread thread = new Thread(runnable);
      thread.setName("CustomThread" + sTag);
      thread.setPriority(Process.THREAD_PRIORITY_BACKGROUND);

      // A exception handler is created to log the exception from threads
      thread.setUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
          @Override
          public void uncaughtException(Thread thread, Throwable ex) {
              Log.e(Util.LOG_TAG, thread.getName() + " encountered an error: " + ex.getMessage());
          }
      });
      return thread;
  }
}
```
### Cancel Tasks
Để dừng 1 task trong hàng đợi từ execution, chúng ta chỉ cần clear hàng đợi task. Để cho phép những threads đang chạy được dừng lại, lưu tất cả các đối tượng future trong một list và hủy trên mỗi đối tượng không được thực hiện.

```
// Add a callable to the queue, which will be executed by the next available thread in the pool
public void addCallable(Callable callable){
    Future future = mExecutorService.submit(callable);
    mRunningTaskList.add(future);
}

/* Remove all tasks in the queue and stop all running threads
 * Notify UI thread about the cancellation
 */
public void cancelAllTasks() {
    synchronized (this) {
        mTaskQueue.clear();
        for (Future task : mRunningTaskList) {
            if (!task.isDone()) {
                task.cancel(true);
            }
        }
        mRunningTaskList.clear();
    }
    sendMessageToUiThread(Util.createMessage(Util.MESSAGE_ID, "All tasks in the thread pool are cancelled"));
}
```

### Handle Activity Lifecycle
Một thứ mà ThreadPool framework không xử lý là vòng đời hoạt động của Android. Nếu bạn muốn threads của mình tồn tại trong vòng đời của Activity và kết nối lại với Activity sau khi nó đc tạo lại (ví dụ như orientation thay đổi), nó cần được tạo và duy trì bên ngoài activity.
Trong ví dụ của tôi, tôi đã tạo một lớp singleton có tên là CustomThreadPoolManager. Nó cũng giữ một tham chiếu yếu tới Activity. Tham chiếu này sau đó được sử dụng để giao tiếp với UI Thread.
```
public class CustomThreadPoolManager {

    private static CustomThreadPoolManager sInstance = null;
    private static int NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors();
    private static final int KEEP_ALIVE_TIME = 1;
    private static final TimeUnit KEEP_ALIVE_TIME_UNIT;

    private final ExecutorService mExecutorService;
    private final BlockingQueue<Runnable> mTaskQueue;
    private List<Future> mRunningTaskList;

    private WeakReference<UiThreadCallback> uiThreadCallbackWeakReference;

    // The class is used as a singleton
    static {
        KEEP_ALIVE_TIME_UNIT = TimeUnit.SECONDS;
        sInstance = new CustomThreadPoolManager();
    }

    // Made constructor private to avoid the class being initiated from outside
    private CustomThreadPoolManager() {
        // initialize a queue for the thread pool. New tasks will be added to this queue
        mTaskQueue = new LinkedBlockingQueue<Runnable>();
        mRunningTaskList = new ArrayList<>();
        mExecutorService = new ThreadPoolExecutor(NUMBER_OF_CORES, 
                                                NUMBER_OF_CORES*2, 
                                                KEEP_ALIVE_TIME, 
                                                KEEP_ALIVE_TIME_UNIT, 
                                                mTaskQueue, 
                                                new BackgroundThreadFactory());
    }

    public static CustomThreadPoolManager getsInstance() {
        return sInstance;
    }

    ...

    // Keep a weak reference to the UI thread, so we can send messages to the UI thread
    public void setUiThreadCallback(UiThreadCallback uiThreadCallback) {
        this.uiThreadCallbackWeakReference = new WeakReference<UiThreadCallback>(uiThreadCallback);
    }

    ...

}
```
Trong Activity, lấy instance singleton bằng cách gọi static method getInstance. Set activity cho CustomThreadPoolManager.
Vì CustomThreadPoolManager giữ tham chiếu tới Activity dưới dạng yếu, bạn không cần phải lo lắng về việc leak activity.
```
public class MainActivity extends AppCompatActivity implements UiThreadCallback {
    private CustomThreadPoolManager mCustomThreadPoolManager;
    ...
     @Override
    protected void onStart() {
        super.onStart();
        // get the thread pool manager instance
        mCustomThreadPoolManager = CustomThreadPoolManager.getsInstance();
        // CustomThreadPoolManager stores activity as a weak reference. No need to unregister.
        mCustomThreadPoolManager.setUiThreadCallback(this);
    }
    // onClick handler for Send 4 Tasks button
    public void send4tasksToThreadPool(View view) {
        for(int i = 0; i < 4; i++) {
            CustomCallable callable = new CustomCallable();
            callable.setCustomThreadPoolManager(mCustomThreadPoolManager);
            mCustomThreadPoolManager.addCallable(callable);
        }
    }
    ...
}
```
### Giao tiếp với UI Thread
Khi mỗi task kết thúc, bạn có thể cần phải gửi lại một số dữ liệu cho UI Thread. Một cách an toàn để thực hiện việc này là gửi 1 message tới Handler của UI Thread. Đầu tiên, tạo 1 class extend Handler và xác định UI Thread sẽ làm gì khi nhận đc 1 message.
```
UiHandler mUiHandler;
...

@Override
protected void onStart() {
    super.onStart();

    // Initialize the handler for UI thread to handle message from worker threads
    mUiHandler = new UiHandler(Looper.getMainLooper(), mDisplayTextView);
    ...
}
...
// Send message from worker thread to the UI thread
@Override
public void publishToUiThread(Message message) {
    // add the message from worker thread to UI thread's message queue
    if(mUiHandler != null){
        mUiHandler.sendMessage(message);
    }
}
...
// UI handler class, declared as static so it doesn't have implicit
// reference to activity context. This helps to avoid memory leak.
private static class UiHandler extends Handler {
    private WeakReference<TextView> mWeakRefDisplay;

    public UiHandler(Looper looper, TextView display) {
        super(looper);
        this.mWeakRefDisplay = new WeakReference<TextView>(display);
    }

    // This method will run on UI thread
    @Override
    public void handleMessage(Message msg) {
        super.handleMessage(msg);
        switch (msg.what){
            // Our communication protocol for passing a string to the UI thread
            case Util.MESSAGE_ID:
                Bundle bundle = msg.getData();
                String messsageText = bundle.getString(Util.MESSAGE_BODY, Util.EMPTY_MESSAGE);
                if(mWeakRefDisplay != null && mWeakRefDisplay.get() != null)
                    mWeakRefDisplay.get().append(Util.getReadableTime() + " " + messsageText + "\n");
                break;
            default:
                break;
        }
    }
}
```
Trong CustomThreadPoolManager, hãy sử dụng tham chiếu của Activity để gửi message tới UI Thread.
```
public void sendMessageToUiThread(Message message){
    if(uiThreadCallbackWeakReference != null && uiThreadCallbackWeakReference.get() != null) {
        uiThreadCallbackWeakReference.get().publishToUiThread(message);
    }
}
```
Trong CustomCallable, vì nó có tham chiếu đến CustomTheadPoolManager, nó có thể gửi tin nhắn bằng cách gọi method sendMessageToUiThread của CustomTheadPoolManger.
```
@Override
public Object call() throws Exception {
    try {
        // check if thread is interrupted before lengthy operation
        if (Thread.interrupted()) throw new InterruptedException();
    
        // In real world project, you might do some blocking IO operation
        // In this example, I just let the thread sleep for 3 second
        Thread.sleep(3000);
    
        // After work is finished, send a message to CustomThreadPoolManager
        Message message = Util.createMessage(Util.MESSAGE_ID, "Thread " +
                String.valueOf(Thread.currentThread().getId()) + " " +
                String.valueOf(Thread.currentThread().getName()) + " completed");
    
        if(mCustomThreadPoolManagerWeakReference != null
                && mCustomThreadPoolManagerWeakReference.get() != null) {
    
            mCustomThreadPoolManagerWeakReference.get().sendMessageToUiThread(message);
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return null;
}
```
### Source Code
Source code đầy đủ cho ví dụ được sử dụng trong này đăng có sẵn trên [Github](https://github.com/frank-tan/AndroidMultithreadingBlogs)


Nguồn: https://medium.com/@frank.tan/using-a-thread-pool-in-android-e3c88f59d07f