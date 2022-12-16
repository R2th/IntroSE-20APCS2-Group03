## I. Memory leaks trong Android
- Bài viết dưới đây sẽ chỉ cho bạn cách tìm và giải quyết việc bị rò rỉ bộ nhớ trong Android. Vậy Memory leaks là gì?
- Dialog ANR khá là quen thuộc với chúng ta phải không? Chúng xuất hiện khi người dùng trong quá trình trải nghiệm ứng dụng mà ứng dụng bị treo, lags. Và khi debug chúng ta sẽ thấy `OutOfMemoryError` xuất hiện trong Logcat. Đây là dấu hiệu để nhận biết **Memory Leaks**.
- Nguyên nhân là một số **Object** không được hệ thống rọn rác của Android nhận biết, trong trường hợp này thì chúng ta không thể làm gì được

![](https://developer.android.com/topic/performance/images/anr-example-framed.png)

> Help garbage collector, help you. / Giúp hệ thống dọn rác, giúp bạn giải quyết vấn đề trên .

1. Nếu ta giữ **Reference** (Tham chiếu) của **Object** khi không cần thiết hoặc không sử dụng nữa, bộ nhớ sẽ giữ chúng lại và không được giải phóng -> **Dẫn đến Memory Leaks**. 
- Vậy giải phóng **Object** sau khi sử dụng sẽ giúp hệ thống dọn rác kill chúng đi đồng thời giúp bạn tránh được **Memory Leaks**
2. Việc **Memory Leaks** dẫn dễ gặp và thường xuyên xuất hiện nếu chúng ta không cẩn thận trong quá trình xây dựng ứng dụng. Đặc biệt là trên những thiết bị được cung cấp bộ nhớ không được cao. **Memory Leaks** là vấn đề vô cùng lớn mà nhà phát triển ứng dụng nào cũng cần phải để ý tới, tuy nhiên nó không khó để tránh bằng cách luôn giữ một số quy tắc khi xây dựng ứng dụng.
3. **Memory Leaks** được gây ra bởi vô số cách và nó rất dễ để gây ra.
> You can ignore memory leaks but your users can’t. / Bạn có thể tránh memory leaks, nhưng người dùng thì không
- Như bạn đã biết, trong quá trình xây dựng ứng dụng bao gồm cả quá trình kiểm thử. Chúng ta không thể nào bao quát được toàn bộ các hành động xảy ra trong ứng dụng được thực thi bởi người dùng :D Ví dụ như dùng 3 4 ngón tay click, pinch vv.v.. Nên khi ứng dụng đạt được 1 lượng Users nhất định, sẽ có rất nhiều vấn để xảy ra.

## II. Chúng ta không nên làm gì để tránh việc Memory leaks?
#### 1. Không sử dụng static views
- Không được sử dụng static view trong mọi trường hợp vì nó không bao giờ được kill đi. 

#### 2. Sử dụng Context một cách hợp lý
- Hãy cẩn thận khi sử dụng **Context**, sử dụng đúng mục đích và thời điểm là vô cùng quan trọng. Sử dụng **Application Context** nếu có thể và sử dụng **Activity Context** khi thực sự cần thiết.
- [Sử dụng Android Context sao cho đúng?](https://viblo.asia/p/android-context-la-gi-su-dung-sao-cho-dung-gAm5ypYOldb)

#### 3. Đừng bao giờ quên nói lời tạm biệt sau khi sử dụng xong các Listener
- Đừng bao giờ quên unregister các listener của bạn tại các phương thức `onPause/ onStop/ onDestroy`. Bởi nếu không làm vậy, chúng sẽ luôn giữ Activity lại và tiếp tục lắng nghe các listener đó.

```
public class LocationListenerActivity extends Activity implements LocationUpdate{

  @Override
  public void onLocationChange(Location location){
    
  }
  
  @Override
  public void onStart(){
   LocationListener.get().register(this);
  }
  
  @Override
  public void onStop(){
   LocationListener.get().unregister(this);
  }

}
```

#### 4. Tránh sử dụng Inner Class
- Nếu bạn sử dụng **Inner Class** , sử dụng chúng như static bởi vì static class không cần outer class để tham chiếu đến. Sử dụng **Inner Class** sẽ làm outer class luôn được giữ cùng.
- Nếu sử dụng view trong static class, truyền chúng vào constructor và sử dụng như một weak reference.
- Một ví dụ sử dụng đúng dưới đây sử dụng weak reference.

```
public class MainActivity extends AppCompatActivity {

    TextView textView;
    AsyncTask asyncTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = (TextView) findViewById(R.id.textView);

        asyncTask = new MyBackgroundTask(textView).execute();
    }

    @Override
    protected void onDestroy() {
        asyncTask.cancel(true);
        super.onDestroy();
    }

    private static class MyBackgroundTask extends AsyncTask<Void, Void, String> {

        private final WeakReference<TextView> textViewReference;

        public MyBackgroundTask(TextView textView) {
            this.textViewReference = new WeakReference<>(textView);
        }

        @Override
        protected void onCancelled() {
        }

        @Override
        protected String doInBackground(Void... params) {
            return "some text";
        }

        @Override
        protected void onPostExecute(String result) {
            TextView textView = textViewReference.get();
            if (textView != null) {
                textView.setText(result);
            }
        }
    }
}
```

#### 5. Tránh sử dụng Anonymous Class.
- Vô cùng thân thiện và đơn giản hóa code. Tuy nhiên rất dễ gây ra việc **Leak memory**.

#### 6. Tránh sử dụng View trong Collection
- Tránh việc sử dụng View với Collection mà không sử dụng pattern clear memory cụ thể nào

## III. Tổng kết
>Do not blame garbage collector./ Đừng bao giờ đổ lỗi cho hệ thống dọn rác
- Nếu ứng dụng của bạn có bị **Memory Leaks** thi đừng đổ tại cho hệ thống nhé =)). Do code của bạn không tối ưu hoặc dính phải mấy case trên đó.
- Qua bài viết trên các bạn đã hiểu thêm về **Memory Leaks** và cách phòng tránh nó. Vậy hãy áp dụng ngay vào trong project của các bạn nhé ^^
- Bài viết được dịch từ [Detecting and fixing memory leaks in android](https://blog.mindorks.com/detecting-and-fixing-memory-leaks-in-android)
- Chúc các bạn làm việc thật hiệu quả, phòng tránh được **Memory Leaks** trong mọi dự án nha. :D.