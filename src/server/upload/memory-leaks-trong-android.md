Bài viết này mình sẽ đề cập đến Memory Leaks trong Android, những điểm cần lưu ý khi phát triển ứng dụng Android để tránh Memory Leaks.

# Memory Leaks là gì ?
Trong khi phát triển và sử dụng ứng dụng Android, chắc chắn các bạn đã từng gặp các trường hợp như app bị buộc dừng với một hộp thoại " Application Not Responding", hiện tượng giật lag hay OutOfMemory khi build ứng dụng. 
Nguyên nhân chính là do Memory Leaks.

Memory Leaks là sự rò rỉ dữ liệu do quá trình phát triển ứng dụng không đúng gây ra.

Trong thực thế, mức sử dụng bộ nhớ của ứng dụng sẽ ngày càng tăng, cho đến khi không còn đủ bộ nhớ và ứng dụng sẽ bị treo. Trong nhiều trường hợp, các đối tượng không còn được sử dụng mà chưa giải phóng, bộ dọn rác sẽ không coi đó là rác để hủy bỏ. Vì vậy, lượng bộ nhớ được sử dụng thực tế vẫn bị tăng mà không phục vụ mục đích có ý nghĩa nào.


# Giải pháp
Như mình đã trình bày ở trên, nhiều trường hợp bộ dọn rác không thể hủy bỏ được các đối tượng mà bạn không còn sử dụng vì vẫn còn tham chiếu đến nó. Vì vậy, giải pháp để tránh rò rỉ dữ liệu chúng ta cần tránh giữ tham chiếu đến các đối tượng mà không cần thiết nữa. Hay nói cách khác, chúng ta sẽ cần giải phóng nếu không cần dùng đến chúng nữa.

# Tránh memory leaks trong Android
Phần này mình sẽ trình bày một số trường hợp cần lưu ý khi phát triển ứng dụng Android để tránh bị rò rỉ dữ liệu.
1. Không giữ tham chiếu đến các đối tượng giao diện trong background

   Không bao giữ tham chiếu đến các đối tượng giao diện cụ thể trong các tác vụ nền để tránh rò rỉ dữ liệu.
   
5. Không sử dụng static context và static context

    Không sử dụng các context và view ở dạng static như sau, vì chúng sẽ không bị hủy:
    
        private static Context mContext;
    
        private static TextView mTextView;

7. Hủy bỏ đăng kí các hàm lắng nghe

    Khi đăng kí lắng nghe các sự kiện, ví dụ cho Activity, chúng ta cần hủy đăng kí nó khi Activity bị hủy hoặc khi nó vào các trạng thái phù hợp khác trong vòng đời.
    
        public class LeaksActivity extends Activity implements LocationListener {

        private LocationManager locationManager;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leaks);
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,
                TimeUnit.MINUTES.toMillis(5), 100, this);
        }

        @Override
        protected void onDestroy() {
        locationManager.removeUpdates(this);
        super.onDestroy();
        }
        }
        
     Ví dụ trên đăng kí nhận vị trí người dùng mỗi 5s với Locationmanager trong hàm onCreate(). Khi Activity bị hủy, ở tỏng hàm onDestroy() ta cũng hủy đăng kí sự kiện lắng nghe vị trí.
 
9. Sử dụng inner class

    Trong trường hợp cần sử dụng inner class thì ta nên khai báo static cho class đó. 

        public class AsyncActivity extends Activity {

        TextView textView;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_async);
        textView = (TextView) findViewById(R.id.textView);

        new BackgroundTask().execute();
        }

        static class BackgroundTask extends AsyncTask<Void, Void, String> {

        @Override
        protected String doInBackground(Void... params) {
            // Do background work. Code omitted.
            return "some string";
        }

        @Override
        protected void onPostExecute(String result) {
            textView.setText(result);
        }
        }
        }

      Điều này có ý nghĩa như thế nào. Chúng ta sẽ phân tích đoạn code trên trong trường hợp  inner class BackgroundTask không phải static. Tất nhiên về mặt logic, chương trình trên vẫn chạy bình thường. Tuy nhiên vấn đề ở đây là class inner sẽ tạo ra các tham chiếu ngầm đến class chứa nó. Như ví dụ trên, mặc dù BackgroundTask chạy trên 1 worker thread khác nhưng nó lại vân giữ tham chiếu ngầm tới activity AsyncActivity trong khi chạy. Trong khi BackgroundTask lại thiếu chính sách hủy bỏ activity, vì vậy activity sẽ tồn tại trong bộ nhớ cùng tất cả cá tài nguyên đã được gắn với nó cho đến khi task background này chạy xong. Điều này sẽ gây ra sử dụng nhiều bộ nhớ hơn cần thiết.
      
      Vậy khi để inner class là static, chúng ta sẽ tránh được việc tạo tham chiếu ngàm đến class chứa nó, từ đó tránh rò rỉ dữ liệu không cần thiết.
      
 # Kết luận
Bài viết này mình đã trình bày về một số cách tránh memory leaks trong quá trình phát triển ứng dụng Android. Hy vọng qua đây các bạn có thể biết thêm được những kiến thức bổ ích cũng như phản hồi đóng góp ý kiến giúp mình nhé ^.^. Cảm ơn các bạn đã theo dõi !