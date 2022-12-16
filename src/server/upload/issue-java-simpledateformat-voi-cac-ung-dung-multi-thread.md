Gần đây mình có đọc một bài viết về issue của **SimpleDateFormat** trong ứng dụng Multiple thread của java.

Đầu tiên SimpleDateFormat là thư viện sử dụng format( pattern dạng chuỗi) và parse dates trong Java

Bạn có thể tạo một instance của classs **SimpleDateFormat** với một pattern như `yyyy-MM-dd HH:mm:ss` và sử dụng instence đấy để format và parse date từ một String.

Một trong các điều quan trọng nhất cần lưu ý về **SimpleDateFormat** là class này không sử dụng thread safe và nó có thể gây ra một số vấn đề khi sử dụng trong môi trường multi-thread 

Và sau đây tôi xin trình đi thẳng vào vấn đề:
## Ví dụ SimpleDateFormat trong môi trường đa luồng
Để bạn hiểu về issue tôi sẽ tạo **SimpleDateFormat** trong môi trường multi-threaded mà không có bất kỳ phép đồng bộ nào.

Dưới đây là một ví dụ rất cơ bản. Tôi sẽ chuyển một string thành date từ theo một pattern định nghĩa trước nhưng tôi sẽ làm nó trong môi trường đa luồng.
```
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SimpleDateFormatThreadUnsafetyExample {

    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

    public static void main(String[] args) {
        String dateStr = "2018-06-22T10:00:00";

        ExecutorService executorService = Executors.newFixedThreadPool(10);
        Runnable task = new Runnable() {
            @Override
            public void run() {
                parseDate(dateStr);
            }
        };

        for(int i = 0; i < 100; i++) {
            executorService.submit(task);
        }

        executorService.shutdown();
    }

    private static void parseDate(String dateStr) {
        try {
            Date date = simpleDateFormat.parse(dateStr);
            System.out.println("Successfully Parsed Date " + date);
        } catch (ParseException e) {
            System.out.println("ParseError " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
Giải thích qua thì: 
 ` ExecutorService executorService = Executors.newFixedThreadPool(10);`
 Dòng code này có nghĩa một pool thì sẽ có 10 thread chaỵ đồng thời.
 
 Và nếu bạn chạy chương trình sẽ có thông báo tương tự như sau:
 
 Output:
```
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
Successfully Parsed Date Thu Jun 22 10:00:00 IST 2220
java.lang.NumberFormatException: multiple points
        at java.base/jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:1890)
        at java.base/jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
        at java.base/java.lang.Double.parseDouble(Double.java:543)
        at java.base/java.text.DigitList.getDouble(DigitList.java:169)
        at java.base/java.text.DecimalFormat.parse(DecimalFormat.java:2098)
        at java.base/java.text.SimpleDateFormat.subParse(SimpleDateFormat.java:1915)
        at java.base/java.text.SimpleDateFormat.parse(SimpleDateFormat.java:1529)
        at java.base/java.text.DateFormat.parse(DateFormat.java:386)
        at SimpleDateFormatThreadUnsafetyExample.parseDate(SimpleDateFormatThreadUnsafetyExample.java:32)
        at SimpleDateFormatThreadUnsafetyExample.access$000(SimpleDateFormatThreadUnsafetyExample.java:8)
        at SimpleDateFormatThreadUnsafetyExample$1.run(SimpleDateFormatThreadUnsafetyExample.java:19)
        at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:514)
        at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
        at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
        at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
        at java.base/java.lang.Thread.run(Thread.java:844)
java.lang.NumberFormatException: For input string: ""
        at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
        at java.base/java.lang.Long.parseLong(Long.java:702)
        at java.base/java.lang.Long.parseLong(Long.java:817)
        at java.base/java.text.DigitList.getLong(DigitList.java:195)
        at java.base/java.text.DecimalFormat.parse(DecimalFormat.java:2093)
        at java.base/java.text.SimpleDateFormat.subParse(SimpleDateFormat.java:2222)
        at java.base/java.text.SimpleDateFormat.parse(SimpleDateFormat.java:1529)
        at java.base/java.text.DateFormat.parse(DateFormat.java:386)
        at SimpleDateFormatThreadUnsafetyExample.parseDate(SimpleDateFormatThreadUnsafetyExample.java:32)
        at SimpleDateFormatThreadUnsafetyExample.access$000(SimpleDateFormatThreadUnsafetyExample.java:8)
        at SimpleDateFormatThreadUnsafetyExample$1.run(SimpleDateFormatThreadUnsafetyExample.java:19)
        at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:514)
        at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
        at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
        at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
        at java.base/java.lang.Thread.run(Thread.java:844)
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
Successfully Parsed Date Fri Jun 22 10:00:00 IST 2018
```
Để giải quyết việc này cách đơn giản nhất là thêm  từ khóa`synchronized` vào hàm `pasreDate()` nhằm đảm bảo việc chỉ có 1 thread có thể sử dụng phương thức `parseDate()` trong một pool.

Nói cách đơn giản nhất thì trong  thời điểm bất kỳ chỉ có 1 thread được sử dụng phương thức parseDate() các thread muốn sử dụng phương thức này phải chờ đến khi thread đó thực hiện hoàn tất.
```
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SimpleDateFormatThreadUnsafetyExample {

    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

    public static void main(String[] args) {
        String dateStr = "2018-06-22T10:00:00";

        ExecutorService executorService = Executors.newFixedThreadPool(10);
        Runnable task = new Runnable() {
            @Override
            public void run() {
                parseDate(dateStr);
            }
        };

        for(int i = 0; i < 100; i++) {
            executorService.submit(task);
        }

        executorService.shutdown();
    }

    private synchronized static void parseDate(String dateStr) {
        try {
            Date date = simpleDateFormat.parse(dateStr);
            System.out.println("Successfully Parsed Date " + date);
        } catch (ParseException e) {
            System.out.println("ParseError " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
## Lời khuyên: Không nên sử dụng SimpleFormatDate.
Kể từ java 8 trở đi có rất nhiều thư viện tăng cường cho việc sử lý date mà lại sử dụng thread-safe như `DateTimeFormatter`

Bạn cũng nên chánh việc sử dụng các class như Date và Calendar và thử sử dụng Java 8 Class DateTime như:
```
OffsetDateTime, ZonedDateTime, LocalDateTime, LocalDate, LocalTime
```
Cung cấp rất nhiều chức năng hiệu quả hơn so với Date và Calendar.

Rất cảm ơn bạn đã theo dõi bài viết.
Nguồn tham khảo [Link](https://www.callicoder.com/java-simpledateformat-thread-safety-issues/)