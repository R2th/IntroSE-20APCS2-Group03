Xây dựng một ứng dụng Android rất dễ nhưng làm cho thực sự chất lượng, tiêu tốn ít tài nguyên thì không dễ như vậy. Khi mới bắt đầu bước những bước chân đầu tiên trong sự nghiệp lập trình, hầu như chúng ta chỉ quan tâm đến việc làm sao xây dựng được những tính năng của ứng dụng, cái mà hiện hữu ra trước mắt mọi người mà ít khi quan tâm đến những gì mà mọi người không nhìn thấy như việc tối ưu hóa ứng dụng hay như ở bài viết này là việc xử lý những vấn đề của memory leak. Nếu điều này diễn ra trong thời gian dài sẽ làm giảm chất lượng của những ứng dụng của bạn, khiến nó có thể giật lag thậm chí dừng hẳn ứng dụng. Vì vậy quan tâm đến hiệu suất của ứng dụng là một điều thực sự rất quan trọng.

Ở bài viết này, chúng ta sẽ cùng nhau tìm hiểu về memory leak. Nó là gì, tại sao lại gây ra nó? Nó có tác hại như thế nào? Những trường hợp nào thường gây ra nó trong Android?

# I. Tại sao Java không ngăn ngừa memory leak?
 Trong Android, bạn hiếm khi viết code bằng C hay C++, những ngôn ngữ mà bạn phải tự mình phân bổ bộ nhớ và xử lý những vấn đề liên quan đến chúng. Java mới là ngôn ngữ chính của Android và may thay, Java biết cách để làm bộ nhớ sạch sẽ hơn nhờ garbage collector. Đây là một trình dọn dẹp bộ nhớ trong Java. Nó sẽ thu dọn những đối tượng không còn được sử dụng nữa để giải phóng tài nguyên cho ứng dụng. Mâu thuẫn nhỉ, tại sao trong Java đã có garbage collector giúp chúng ta dọn dẹp các đối tượng rồi mà lại phải quan tâm đến vấn đề memory leak, garbage collector mắc lỗi sao?

Không, chắc chắn không, garbage collector rất tốt và không có lỗi, lỗi là ở chúng ta, những lầm trình viên đôi khi vô tình ngăn cản garbage collector làm nhiệm vụ của nó là giải phóng bộ nhớ khi cần thiết.
# II. Sơ qua về hoạt động của garbage collector
Trước kh tìm hiểu sâu hơn về memory leak, bạn cần biết một chút về cách mà garbage collecor làm việc. Khái niệm về garbage collector khá đơn giản nhưng những gì thực sự xảy ra lại phức tạp hơn nhiều

![](https://images.viblo.asia/635b8d76-bc12-4a2e-aaba-ec5d7d3a7ac4.JPG)

Mỗi ứng dụng Android có một điểm bắt đầu, từ đây các đối tượng được khởi tạo và các phương thức được gọi. Một vài object được tạo, sau đó các object khác cũng được tạo ra từ nó và giữ tham chiếu tới nó, v.v...

Vì vậy, mỗi chuỗi tham chiếu được hình thành và tạo thành một memory tree. Khi garbage hoạt động, nó đi từ gốc memory tree và nó sẽ kiểm tra các đối tượng có còn liên tham chiếu nào tới nó không. Những đối tượng không còn được tham chiếu tới chính là rác.

# III. Memory Leak là gì? Tại sao cần quan tâm đến nó?
Nói một cách đơn giản thì memory leak xảy ra khi bạn giữ một tham chiếu đến một đối tượng sau khi đối tượng đó đã hoàn thành hết nhiệm vụ của nó. Theo tôi, khái niệm đơn giản chỉ có vậy

Mỗi object có một thời gian sống của chính nó, sau đó nó cần phải rời khỏi bộ nhớ. Nhưng nếu một đối tượng khác đang giữ tham chiếu của đối tượng này bằng một cách trực tiếp hay gián tiếp sẽ làm cho garbage collector không thể thu thập được nó, đó chính là nguyên nhân gây ra memory leak.

Tin vui là bạn không cần phải quan tâm quá nhiều đến một số memory leak xảy ra trong ứng dụng của bạn. Không phải tất cả những memory leak đều gây ảnh hưởng nghiêm trọng tới ứng dụng của bạn.

Một vài memory leak thực sự nhỏ ( leak một bài kilobyte của bộ nhớ), và có một vài thứ trong chính Android framework và bạn không cần phải fix chúng. Những điều này nói chung ảnh hưởng rất ít đến hiệu suất của bạn và có thể bỏ qua được.

Nhưng cũng có một vài cái khác làm cho ứng dụng của bạn lag, thậm chí crash. Đây là những gì bạn thật sự phải quan tâm.
# IV. Điều gì xảy ra trong một memory leak
Khi ứng dụng của bạn được sử dụng và bộ nhớ heap của bạn ngày càng tăng lên, một garbage collector nhỏ sẽ được kích hoạt và cố gắng làm sạch những đối tượng đã không còn được sử dụng. Bây giờ, các garbage collector chạy đồng thời và chúng không làm chậm ứng dụng của bạn một cách đáng kể. Những hãy nhớ rằng, càng ít garbage collector thì hiệu suất ứng dụng càng tốt.

Nếu ứng dụng của bạn có một vài memory leak nghiêm trọng, các garbage collector nhỏ sẽ không thể thu hồi bộ nhớ, và bộ nhớ heap tiếp tục tăng bắt buộc phải kích hoạt các GC lớn hơn. Các garbage collector lớn hơn này được gọi là "stop-the-world", nó tạm dừng toàn bộ main thread của ứng dụng trong vòng 50ms đến 100ms. Tại thời điểm này ứng dụng của bạn trễ và hầu như không sử dụng được.

Nếu vấn đề không được giải quyết, sau đó bộ nhớ heap của ứng dụng tiếp tục tăng liên tục cho đến thời điểm nó không còn bộ nhớ để phân bố trong ứng dụng và một OutOfMemoryError sẽ xảy ra và tất nhiên, ứng dụng của bạn sẽ bị crash.

Khi bạn biết những tác động xấu của memory leak gây ra cho ứng dụng của bạn, bạn sẽ hiểu vì sao chúng ta cần quan tâm đến nó.
# V. Một số trường hợp gây memory leak phổ biến và cách khắc phục chúng
Theo tôi tham khảo nhiều nguồn tài liệu, có vài trường hợp phổ biến gây ra memory leak.
## Unregister listener
Có nhiều trường hợp bạn đăng ký một listener trong Activity hoặc Fragment nhưng quên unregister nó. Điều này dễ gây ra một memory leak lớn. Bạn sẽ cần phải hủy đăng ký các listener tương ứng.

Giả sử bạn cần location update trong ứng dụng của bạn. Tất cả những gì bạn cần làm là lấy LocationManager và đăng ký một listener cho location update.

```java
private void registerLocationUpdates(){
mManager = (LocationManager) getSystemService(LOCATION_SERVICE);
mManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
            TimeUnit.MINUTES.toMillis(1),
            100,
            this);
}
```
Bạn có thể thực thi listener ngay trong Activity và như vậy LocationManager giữ một tham chiếu đến nó. Bây giờ khi Activity bị hủy bỏ, Android framework sẽ gọi phương thức onDestroy() trên nó nhưng garbage collector không thể xóa thể hiện của Activity bởi vì LocationManager vẫn đang giữ tham chiếu tới nó.

Cách giải quyết rất đơn giản, đó là trong phương thức onDestroy() bạn sẽ cần hủy đăng ký nó. Đây là điều mà hầu hết chúng ta quên hoặc không biết đến nó.
```java
@Override
public void onDestroy() {
    super.onDestroy();
    if (mManager != null) {
        mManager.removeUpdates(this);
    }
}
```

## Inner class
Inner class được sử dụng rất nhiều trong Java vì nó đơn giản. Nhưng nếu sử dụng nó không đúng cách sẽ có thể dẫn tới một memory leak nguy hiểm.
```java
public class BadActivity extends Activity {

    private TextView mMessageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_bad_activity);
        mMessageView = (TextView) findViewById(R.id.messageView);

        new LongRunningTask().execute();
    }

    private class LongRunningTask extends AsyncTask<Void, Void, String> {

        @Override
        protected String doInBackground(Void... params) {
            return "Am finally done!";
        }

        @Override
        protected void onPostExecute(String result) {
            mMessageView.setText(result);
        }
    }
}
```
Đây là một Activity rất đơn giản. Nó bắt đầu một tác vụ dài trong background. Sau khi thực hiện xong nó được hiển thị lên TextView. Nếu nhìn thoáng qua, thậm chí chạy chúng lên, ứng dụng sẽ chạy bình thường và không hề có vấn đề gì xảy ra cả. 

Mọi chuyện không đơn giản như thế. Vấn đề ở đây là một non-static inner class giữ một tham chiếu không tường minh của outer class chứa nó. Bây giờ nếu chúng ta xoay thiết bị hoặc thời gian thực hiện tác vụ lâu hơn thời gian tồn tại của activity thì garbage collector sẽ không thể loại bỏ activity ra khỏi bộ nhớ. Một lỗi rất đơn giản nhưng lại có thể gây ra một memory leak nguy hiểm.

Cách giải quyết vấn đề ở đây rất đơn giản
```java
public class GoodActivity extends Activity {

    private AsyncTask mLongRunningTask;
    private TextView mMessageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_good_activity);
        mMessageView = (TextView) findViewById(R.id.messageView);

        mLongRunningTask = new LongRunningTask(mMessageView).execute();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mLongRunningTask.cancel(true);
    }

    private static class LongRunningTask extends AsyncTask<Void, Void, String> {

        private final WeakReference<TextView> messageViewReference;

        public LongRunningTask(TextView messageView) {
            this.messageViewReference = new WeakReference<>(messageView);
        }

        @Override
        protected String doInBackground(Void... params) {
            String message = null;
            if (!isCancelled()) {
                message = "I am finally done!";
            }
            return message;
        }

        @Override
        protected void onPostExecute(String result) {
            TextView view = messageViewReference.get();
            if (view != null) {
                view.setText(result);
            }
        }
    }
}
```
Như các bạn thấy, tôi đã thay đổi non-static inner class thành static inner class, nó sẽ không giữ bất cứ một tham chiếu nào đến outer class chứa nó. Nhưng vấn đề tiếp tục xảy ra đó là chúng ta không thể truy cập vào các biến không static ở outer class và cách giải quyết ở đây là chúng ta sẽ truyền các biến cần thiết cho static inner class thông qua constructor của nó.
## Bitmaps
Mọi hình ảnh bạn nhìn thấy trong ứng dụng không gì khác ngoài những đối tượng object, nó chứa toàn bộ dữ liệu của hình ảnh.

Các đối tượng bitmap thường khá nặng và nếu không xử lý đúng cách nó có thể dẫn tới rò rỉ bộ nhớ đang kể và làm hỏng ứng dụng của bạn do OutOfMemoryError. Bitmap memory liên quan đến image resource mà bạn sử dụng trong ứng dụng tự động quản lý bởi framework, nhưng nếu bạn xử lý bitmap theo cách thủ công, hãy chắc chắn recycle() chúng sau khi sử dụng.

Bạn nên load những bitmap lớn bằng cách scale chúng xuống, sử dụng bộ nhớ đệm bitmap và gộp chúng lại bất cứ khi nào có thể để giảm thiểu bộ nhớ sử dụng.

## Context
Một trong những nguyên nhân phổ biến của memory leak là làm dụng các thể hiện Context. Context đơn giản là một abstract class. Có nhiều class (như Activity, Application, Context,...) kế thừa từ context để cung cấp những chức năng của riêng nó.

Nhưng có sự khác biệt giữa các Context. Điều quan trọng là phải hiểu sự khác nhau giữa các activity Context và aplication Context và cái nào nên được sử dụng trong trường hợp nào.

Sử dụng activity Context sai vị trí có thể giữ tham chiếu tới toàn bộ activity và gây ra memory leak.
# VI. Đã đến lúc bạn sửa ứng dụng của bạn rồi
Đến đây bạn đã biết garbage collector trong Java hoạt động như thế nào, memory leak là gì và cách chúng có thể tác động tiêu cực đến ứng dụng của bạn. Tôi cũng đã giới thiệu cho bạn một số trường hợp phổ biến gây ra memory leak. Còn chần chờ gì nữa, hãy bắt đầu vào code của bạn và tìm những memory leak để fix chúng nào.

Hi vọng qua bài viết này các bạn có thể xây dựng một ứng dụng tốt hơn, hiệu quả cao hơn. Phát hiện và sửa những memory leak không chỉ làm cho ứng dụng của bạn có trải nghiệm tốt hơn mà còn biến bạn thành một developer tốt hơn

Cảm ơn các bạn đã theo dõi bài viết này. :v:

# VII. Nguồn tham khảo
https://techbeacon.com/what-you-need-know-about-android-app-memory-leaks