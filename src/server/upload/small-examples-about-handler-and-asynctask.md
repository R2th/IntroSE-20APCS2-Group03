## 1.Mở đầu.
Xin chào các bạn, ở bài viết này mình sẽ demo một vài ví dụ về Handler và AsyncTask. Như ở [bài viết](https://viblo.asia/p/thread-handler-va-asynctask-trong-android-3P0lPyp85ox) trước đó thì chúng là các đối tượng thường dùng để xử lý công việc ở Worker Thread (hay Background Thread) và sau đó trả kế quả về để Main Thread (hay UI Thread) cập nhật giao diện. Mong bài viết sẽ giúp một số bạn mới biết có một cách hình dung rõ hơn về hai đối tượng này.
## 2.Handler Example.
Chúng ta sẽ thử một ứng dụng nhỏ, khi ta ấn vào Start thì số  từ 0 cứ sau 1s sẽ tăng lên 1 đơn vị cho đến khi đến 10, sau đó nó sẽ hiện thị chữ "Done". Công việc cứ sau 1s tăng lên 1 đơn vị thì được background xử lý, và nó sẽ gửi từng giá trị (từ 0 đến 10) cũng như kết quả cuối cùng ("Done") về Main Thread.
![](https://images.viblo.asia/207e0c14-ca9a-4b02-bf91-3a626b3ea5b8.png)

### 2.1 Source code.

Đầu tiên ta xây dựng file layout xml, ở đây mình dùng ConstrainLayout cho "hoành tráng" xí :)

```java
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#FFEE58"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/text_number"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        android:textColor="#00E676"
        android:textSize="100sp"
        app:layout_constraintBottom_toBottomOf="@+id/button_count"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_count"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start"
        android:textAllCaps="false"
        android:textSize="28sp"
        android:textColor="#FF3D00"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/text_number" />

</android.support.constraint.ConstraintLayout>

```
Ở bên MainActivity mình sẽ xử lý như sau:
```java
public class MainActivity extends AppCompatActivity
        implements View.OnClickListener {
    private Handler mHandler;
    private static final int MSG_UPDATE_NUMBER = 100;
    private static final int MSG_UPDATE_NUMBER_DONE = 101;

    private TextView mTextNumber;
    private boolean mIsCounting;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        listenerHandler();
    }

    private void initViews() {
        mTextNumber = findViewById(R.id.text_number);
        findViewById(R.id.button_count).setOnClickListener(this);
    }

    private void countNumbers() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i <= 10; i++) {
                    Message message = new Message();
                    message.what = MSG_UPDATE_NUMBER;
                    message.arg1 = i;
                    mHandler.sendMessage(message);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                mHandler.sendEmptyMessage(MSG_UPDATE_NUMBER_DONE);
            }
        }).start();
    }

    private void listenerHandler() {
        mHandler = new Handler(Looper.getMainLooper()) {
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case MSG_UPDATE_NUMBER:
                        mIsCounting = true;
                        mTextNumber.setText(String.valueOf(msg.arg1));
                        break;
                    case MSG_UPDATE_NUMBER_DONE:
                        mTextNumber.setText("Done!");
                        mIsCounting = false;
                        break;
                    default:
                        break;
                }
            }
        };
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_count:
                if (!mIsCounting) {
                    countNumbers();
                }
                break;
            default:
                break;
        }
    }
}
```
### 2.2 Explain

Ở phương thức listenerHandler() sẽ khởi tạo ra một đối tượng Handler từ Main Thread và nó sẽ lắng nghe các kết quả trả về từ Worker Thread, cụ thể hơn là các message. Một Handler được tạo ra thì nó cần một Looper. Ở trên thì mình truyền Looper.getMainLooper() là lấy ra Looper của Main Thread. Bạn cũng có thể dùng Looper.myLooper() để lấy ra Looper của Thread hiện tại.

Khi bạn ấn vào button Start thì phương thức *countNumbers()* sẽ được gọi. Công việc trong phương thức này sẽ thực hiện trên Worker Thread. Ta thực hiện vòng for đếm từ 0 đến 10. Với mỗi giá trị i ta tạo ra một đối tương Message. Ta cần gửi giá trị i về Main Thread nên ta có thể gán i cho **arg1** hoặc **arg2**. **arg1** và **arg2** là các thuộc tính lưu giá trị kiểu int của message, là số nguyên nên dùng chúng sẽ tiện hơn *message.setData(Bundle data)*. Ngoài ra bạn có thể dùng **message.obj** để truyền một Object. Vậy còn **what** là gì, đó là một mã thông báo cho phép nơi nhận xác định thông điệp này là gì. Như bạn cũng đã thấy ta sẽ kết quả trả về ở *listenerHandler()* dựa vào **message.what**

Bên trên mình đã có một ví dụ về **sendMessage(Message)** của Handler. Handler còn nhiều phương thức sendMessage nữa ví dụ như: 
1. **sendEmptyMessage(int)**
2. **sendMessageAtTime(Message, long)**
3. **sendMessageDelayed(Message, long)**

Ngoài ra còn các phương thức post như:
1. **post(Runnable)**
2. **postAtTime(Runnable, long)**
3. **postDelayed(Runnable, Object, long)**

Các bạn có thể tìm hiểu thêm nhé!
### 2.3 Question
Mình sẽ đưa ra một vài câu hỏi cho các bạn tự trả lời để củng cố thêm kiến thức:
1. Handler có phải nhất thiết lúc nào cũng sinh ra ở Main Thread (UI Thread) hay không?
2. Các phương thức sendMessage và post thì khác gì nhau?

Các bạn có thể tự tìm câu trả lời nhé.
## 3.AsyncTask Example
Chúng ta sẽ demo một ứng dụng. Khi click vào Start thì ProgressBar sẽ chạy. Thực ra giá trị để ProgressBar lấy để update là từ Background Thread. Cũng như Handler thì AsyncTask dùng để thực hiện những tác vụ ngắn, thực hiện công việc ở Background và trả kết quả về Main Thread.
![](https://images.viblo.asia/66f99320-a96a-4e16-8261-2cce60fe6427.png)
### 3.1 Source code.
Ở file xml mình có một ProgressBar và một Button như sau.
```java
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ProgressBar
        android:id="@+id/progress_bar"
        style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"
        android:layout_width="0dp"
        android:layout_height="12dp"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:background="#000000"
        app:layout_constraintBottom_toTopOf="@+id/button_start"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_start"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start"
        android:textAllCaps="false"
        android:textColor="#F4511E"
        android:textSize="28sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progress_bar" />

</android.support.constraint.ConstraintLayout>

```
Ở MainActivity ta sẽ có một inner class là ProgressAsyncTask kế thừa từ AsyncTask có nhiệm vụ tính toán ở background sau đó trả kết quả về Mai Thread:

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private ProgressBar mProgressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mProgressBar = findViewById(R.id.progress_bar);
        findViewById(R.id.button_start).setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_start:
                new ProgressAsyncTask().execute();
                break;
            default:
                break;
        }
    }

    private class ProgressAsyncTask extends AsyncTask<Void, Integer, String> {
        @Override
        protected String doInBackground(Void... voids) {
            for (int i = 0; i <= 100; i++) {
                publishProgress(i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return "DONE";
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            mProgressBar.setProgress(values[0]);
        }

        @Override
        protected void onPostExecute(String result) {
            Toast.makeText(MainActivity.this, result, Toast.LENGTH_SHORT).show();
        }
    }
}

```

### 3.2 Explain
**doInBackground()** làm việc ở background. Ở đây ta dùng vòng lặp for từ 0 đến 100. Cứ sau 1s ta lại tăng giá trị lên một đơn vị, cứ từng giá trị ta lại gửi ra cho Main Thread bằng phương thức **publishProgress(i)**. Ở trong onProgressUpdate(Integer... values) ta có thể update UI của ProgressBar bằng câu lệnh mProgressBar.setProgress(values[0]). Tức giá trị truyền vào **publishProgress** là đầu vào của **onProgressUpdate**, ở đây là Interger. Bạn có thể đưa vào một lúc nhiều giá trị.

Khi tiến trình kết thúc thì ta trả về một String "DONE" cho **doInBackground()**. Đây cũng là đầu vào của **onPostExecute()**, ta có thể đưa ra kết quả cuối cùng ở đây trên UI Thread.

Tất cả các phương thức **onPreExecute()**, **doInBackground()** và **onProgressUpdate()** và **onPostExecute()** tham số truyền vào không những là một giá trị mà bạn có thể truyền nhiều giá trí một lúc.

Ở demo này mình không có tham số truyền vào ở onPreExecute(). Nhưng trong một số bài toán thực tế thì thường có. Ví dụ khi download hay load dữ liệu trên Internet thì cần một URL chẳng hạn.
### 3.3 Question.
Đây là một số câu hỏi khá thú vị, mọi người có thể tìm hiểu xem:
1. Khi ta khởi chạy một AsyncTask ở Main Thread, quá trình xử lý công việc ở thì diễn ra ở doInBackground. Khi công việc ở doInBackground() (ở worker Thread) vẫn đang diễn ra nhưng ta lại muốn nó kết thúc luôn thì ta phải làm thế nào? Hay là để **Cancel** một AsyncTask thì ta nên làm thế nào cho đúng??
2. Nếu có một AsyncTask là ExampleAsyncTask và cùng một lúc ta tạo ra 2 thể hiện và thực hiện 2 công việc thì quá trình thực thi sẽ diễn ra thế nào. 2 công việc diễn ra đồng thời hay là công việc 1 xong thì công việc hay mới tiếp tục. Hay là có đáp án thứ 3 ^^
```java
            new ExampleAsyncTask().exectue(firstParam);
            new ExampleAsyncTask().exectue(secondParam);
``` 

3. Ta có thể Khởi tạo là excute một AsyncTask ở trong một thread không phải là Main Thread (UI Thread) hay không?

## 4.Tổng kết.
Handler và AsyncTask là các đối tượng hết sức quan trọng trong Android, nhưng các bạn mới làm quen ban đầu sẽ khó nắm bắt được bản chất cũng như cách sử dụng của chúng.

Qua bài viết này mình đã trình bày 2 ví dụ đơn giản về sử dụng Handler và AsyncTask. Cũng mong là giúp được một số bạn mới tìm hiểu về hai đối tượng này chút ít. Nếu phần lý thuyết còn gì vướng mắc các bạn có thể xem lại [bài viết trước đó](https://viblo.asia/p/thread-handler-va-asynctask-trong-android-3P0lPyp85ox) của mình. Xin cám ơn rất nhiều!