OutOfMemoryError (OOM) là thứ mà mọi Android Developer đều gặp phải. OutOfMemoryError xuất hiện trong Android do leak memory. Vì vậy, để loại bỏ OutOfMemoryError, bạn cần khắc phục leak memory khỏi ứng dụng Android của mình.
## Memory leak

Khi bạn chạy một số ứng dụng trên thiết bị Android, thì hệ thống Android sẽ cung cấp một số không gian bộ nhớ để ứng dụng của bạn hoạt độngvà tất cả việc tạo biến, tạo hàm, tạo hoạt động, v.v. chỉ diễn ra trong bộ nhớ đó.

Ví dụ: nếu Hệ thống Android phân bổ 100 MB cho ứng dụng của bạn, thì ứng dụng của bạn có thể sử dụng tối đa 100 MB tại một thời điểm cụ thể. Theo thời gian, nếu không gian bộ nhớ được cấp cho ứng dụng bị giảm đi hoặc còn lại rất ít dung lượng, thì Garbage Collector (GC) sẽ giải phóng bộ nhớ đang được giữ bởi các biến và hoạt động không được sử dụng. Bằng cách này, ứng dụng sẽ lại có được một số dung lượng.

Nhưng đôi khi, bạn giữ các tham chiếu của các đối tượng không được yêu cầu nữa, thì trong tình huống này, GC không thể giải phóng không gian chưa sử dụng và không còn dung lượng cho ứng dụng cho nó hoạt động hơn nữa.

## GC hoạt động như thế nào?

GC là quá trình các chương trình Android thực hiện quản lý bộ nhớ tự động bằng cách sử dụng một số thuật toán GC, ví dụ như Mark and Sweep.

Bất cứ khi nào một ứng dụng Android khởi động, nó sẽ tạo ra một cây bộ nhớ coi đối tượng bắt đầu là gốc của cây. Root tạo ra một số đối tượng khác có thể có tham chiếu của nó trực tiếp hoặc gián tiếp và một số đối tượng khác được khởi tạo từ các đối tượng này dẫn đến một chuỗi tham chiếu và do đó tạo thành cây bộ nhớ.

Trình thu gom rác bắt đầu từ GC root và đi qua từng và mọi tham chiếu đối tượng được liên kết trực tiếp hoặc gián tiếp với gốc và đánh dấu nó là hiện đang được sử dụng.

Bây giờ, chỉ cần nghĩ đến tình huống trong đó một số đối tượng không sử dụng cần xóa khỏi bộ nhớ đang được GC đánh dấu là hoạt động chỉ vì ai đó có tham chiếu về nó. Như vậy, nó sẽ không đủ điều kiện để thu gom rác dẫn đến Memory leak

## Một số nguyên nhân gây ra memory leak

### 1. Unregistered Listeners

Có nhiều trường hợp khi chúng ta register 1 listener vào Activity hoặc Fragment nhưng lại unregister nó. Các listener này giữ tham chiếu  đến nó và ngăn nó được giải phóng bởi GC ngay cả khi nó không được sử dụng.

```
public class RegisterListenerActivity extends AppCompatActivity  {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onStart() {
        super.onStart();
        registerLocationUpdates();
    }

    @Override
    protected void onStop() {
        super.onStop();
        unRegisterLocationUpdates();
    }

    private void registerLocationUpdates(){
       // register for location updates here
    }
    private void unRegisterLocationUpdates(){
        // unregister here
    }
}
```

### 2. Unregistered Local Broadcast receivers

Đôi khi chúng ta cần đăng ký một  LocalBroadcastReceivers trong một activity

Tuy nhiên, nếu chúng ta không hủy đăng ký, nó sẽ giữ tham chiếu đến Actviity. Ngay cả khi activity không còn cần thiết, tham chiếu sẽ ngăn nó được GC thu dọn

```
public class LocalBroadcastReceiverActivity extends Activity {

    private BroadcastReceiver localBroadcastReceiver;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    private void registerBroadCastReceiver() {
        localBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                //Write your code here.
            }
        };
        registerReceiver(localBroadcastReceiver, new IntentFilter("android.net.conn.CONNECTIVITY_CHANGE"));
    }
    @Override
    protected void onStart() {
        super.onStart();
        registerBroadCastReceiver();
    }

    @Override
    protected void onStop() {
        super.onStop();
        /*
         * Broadcast receiver holds the implicit reference of Activity.Therefore even if activity is destroy,
         *  garbage collector will not be able to remove its instance.
         * */
        if(localBroadcastReceiver != null) {
            unregisterReceiver(localBroadcastReceiver);
        }
    }
}
```

### 3. Inner Class Reference

Inner Class rất phổ biến được sử dụng bởi nhiều developer để thực hiện các tác vụ khác nhau, tuy nhiên, lớp Non-static Inner Class vô tình giữ tham chiếu ngầm của lớp cha nên có thể dẫn đến memory leak

Giải pháp:
- Sử dụng static inner class

```
public class InnerAsyncTaskReferenceActivity extends AppCompatActivity {

    /*
     * Following mistakes should be avoided in this scenario.
     * Mistake  1. Try to avoid referencing a class inside an activity because normal inner class holds implicit reference of parent class.
     * If at we need to do it,make it private static class which does not hold any implicit reference.
     * Mistake  2. Never use a direct reference of a view, reference of Activity itself or context from activity inside an Asynctask.
     * Mistake 3. Specially in case of AsycTask Inner class : We should always cancel the asyncTask inside onDestroy of  Activity because the asyncTask will still be running even if the activity
     * is destroyed preventing activity to be garbage collected.
     *
     * */
    private TextView textView;
    private BackgroundOperation backgroundOperation;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.inner_async_task_activity);

        /*
         * Initiate & execute AsyncTask here!
         * */
        backgroundOperation = new BackgroundOperation(textView);
        backgroundOperation.execute();
    }


    private class BackgroundOperation extends AsyncTask<Void, Void, String> {

        //private View view;
        private WeakReference<TextView> viewWeakReference;
        BackgroundOperation(TextView textView){
            //this.view = view; // Problem 2
            // Instead use WeakReference
            this.viewWeakReference = new WeakReference<>(textView);
        }
        @Override
        protected String doInBackground(Void... voids) {

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "The task is completed!";
        }

        @Override
        protected void onPostExecute(String value) {
            super.onPostExecute(value);
            //textView.setText(s);
            TextView view = viewWeakReference.get();
            if(view != null) {
                view.setText(value);
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        /*
         * Always cancel AsyncTask when activity is destroyed.
         */
        if(backgroundOperation!= null) {
            backgroundOperation.cancel(true);
        }
    }
}
```
### 4. Các tình huống khác:

- Static view, context, activity
- Truyền tham chiếu Activity hoặc Context cho một lớp Singleton.
- Sử dụng Bitmap mà không recycle. Điều này có thể dẫn đến OutOfMemoryError. Vui lòng tìm cách xử lý thích hợp [tại đây](https://developer.android.com/topic/performance/graphics/manage-memory).

## TÀI LIỆU THAM KHẢO

https://medium.com/@amritlalsahu5/all-about-memory-leaks-in-android-7c0e5c8d679c