### Memory leak trong Android là gì?
Là một người dùng, khi sử dụng các ứng dụng Android, chắc hẳn mọi người đã gặp không ít trường hợp máy bị chậm, hoặc hộp thoại ARN (Application Not Responding) hiện ra.
Đối với một developer thì thấy được lỗi OutOfMemoryError khi xây dựng các ứng dụng Android càng không phải hiếm. Tất cả những ví dụ đều là biểu hiện của Memory leak.

Một số đối tượng khi không được sử dụng nữa mà lại không được garbage collector của java phát hiện và xử lý. Nó sẽ chiếm dụng mất một phần bộ nhớ heap. Khi bạn cố gắng tạo một object mà lúc này bộ nhớ heap không đủ không gian để phân bổ cho đối tượng đó thì JVM sẽ ném ngay ra lỗi OutOfMemoryError. OutOfMemoryError có thể xảy bất cứ thời điểm nào khi chạy ứng dụng. Trong những tính huống này, bạn chẳng thể làm gì được. Giữ lại tham chiếu của các đối tượng không còn cần thiết nữa là thực sự là ý tưởng tồi. Giải phóng các tham chiếu đến đối tượng khi không cần sử dụng nữa sẽ hữu ích cho garbage collector dọn dẹp đối tượng đó. Chính điều đó sẽ giúp bạn giải quyết được vấn đề về Memory leak.

Memory lead có thể rất dễ dàng xảy ra nếu developer không cẩn thận khi xây dựng ứng dụng, vì các thiết bị Android được cung cấp rất ít bộ nhớ. Memory lead là vấn đề lớn nhất đối với bất kỳ ứng dụng Android nào. Mặc dù là vấn đề lớn nhất, nhưng không phải là không xử lý được, nếu chúng ta chau chuốt hơn trong từng class, từng dòng code ở giai đoạn phát triển ứng dụng.

Memory lead có thể được gây ra bởi nhiều cách khác nhau trong Android, có thể từ những điều rất nhỏ như bên dưới đây.

### Lý do xảy ra Memory lead
Lý do khởi nguồn nhất cho Memory lead là lỗi của chúng ta trong khi xây dựng ứng dụng. Chúng ta thường hay mắc mỗi số lỗi nhỏ nhưng lại rất dễ mắc phải mà nhiều người không để ý. Ở đây tôi sẽ chỉ ví dụ những thói quen có thể coi là "lỗi" dẫn tới Memory lead mà thôi.

**Giữ lại tham chiều của một đối tượng UI dưới background**
Không bao giờ giữ tham chiếu của đối tượng UI trong tác vụ nền, vì nó dẫn đến Memory lead.

**Sử dụng static views**
Không bao giờ sử dụng static views vì chúng luôn luôn tồn tại, "static views never get killed".

**Sử dụng static context**
Không bao giờ được sử dụng context như một đối tượng static.
```
public class MainActivity extends AppCompatActivity {
  
  private static Button button; //NEVER USE LIKE THIS
  private static Context context; //NEVER USE LIKE THIS TOO
  
}
```

Bạn hãy thực sự cẩn thận trong khi sử dụng context, quyết định context nào phù hợp ở những chỗ là quan trọng nhất. Sử dụng application context nếu có thể và chỉ sử dụng activity context nếu được yêu cầu mà thôi.

**Không bao giờ quên tạm biệt với những listeners sau khi đã sử dụng xong**
Đừng quên unregister những listeners của bạn trong phương thức onPause / onStop / onDestroy. Nếu không unregister, nó luôn giữ cho activity tồn tại và các listeners tiếp tục lắng nghe sự kiện.

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

**Sử dụng inner class**
Nếu bạn đang sử dụng một inner class, hãy sử dụng class này dưới dạng static. Sử dụng inner class mà không phải static thì khi class inner đó chưa bị xóa hết tham chiếu thì class cha của nó sẽ vẫn còn tồn tại nên tốt hơn là tránh.
Và nếu bạn đang sử dụng các views  trong static class, hãy chuyển nó vào hàm tạo và sử dụng nó giống như một tham chiếu yếu.

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

**Sử dụng anonymous class**
Điều này rất giống với các inner class không phải static. Tuy rằng nó rất hữu ích nhưng vẫn tránh sử dụng một anonymous class.

**Dùng các views trong collection**
Tránh việc put các views vào trong một collection. WeakHashMap giờ là một mảng các giá trị. Từ khi WeakHashMap giống như một tham chiều cứng thì tốt hơn là nên tránh sử dụng nó.

Nếu Memory lead xảy ra do những lý do cụ thể ở trên, garbage collector không thể xử lý những trường hợp này, thì đây là những sai lầm của chính bạn, cố gắng không phạm phải những điều này. Tuy nhiên, dùng là người có kinh nghiệm tới đâu cũng không phải là không mắc sai lầm. Nếu chẳng may ứng dụng của bạn bị memory lead thì tìm kiếm lỗi lầm ở đâu để sửa chữa. Hoặc đơn giản là bạn muốn đảm bảo ứng dụng của mình có thể sẽ không mắc phải memory lead thì làm sao để đảm bảo được điều đó? May mắn thay là đã có LeakCanary để giúp chúng ta xử lý những vấn đề này.  Nếu bạn chưa biết tới nó thì ngay bây giờ nên tìm hiểu và áp dụng nó vào ngay ứng dụng của mình.