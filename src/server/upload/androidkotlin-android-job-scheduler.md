# Giới thiệu
Nếu bạn có một công việc được  lặp đi lặp lại trong ứng dụng Android của mình : ví dụ như request một  API sau 1 ngày hoăc hiện notificcation mỗi 6h hằng ngày thì chúng ta sẽ làm ntn ??

chúng ta  cần phải xem xét rằng các hoạt động và dịch vụ có thể bị hệ thống Android giải phóng để giải phóng tài nguyên. Vì vậy, bạn không thể dựa vào lịch Java chuẩn như lớp TimerTasks.

Để lên lịch cho các tác vụ như thế , Android cung cấp đã giởi thiệu API  JobScheduler. Nó cho phép bạn xác định các điều kiện để chạy công việc
Job schedule là  một phần của nền tảng Android và duy trì công việc nền của tất cả các ứng dụng được cài đặt trên thiết bị tại một nơi cho phép sử dụng tối ưu tài nguyên thiết bị
Job schedule có thể được sử dụng để chạy các tác vụ chạy ngắn và dài như tải xuống dữ liệu, dọn dẹp bộ nhớ cache, xử lý dữ liệu, v.v.

Bây giờ mình sẽ giới thiệu với các bạn làm thế nào để tạo một Job Scheduler, và cách thức hoạt động của nó

# JobService 
JobScheduler  đã được android giới thiệu ở bản release của Android 5.0 Lollipop (API 21) và được áp dụng từ android 5.0 trở lên nó được tạo ra *để lên lịch* thực hiện các Task vụ của bạn

Ví dụ như :
*  Các task cần được thực hiện khi device được kết nối với nguồn điện
*  Các task cần kết nối internet 
*  Các task chạy thường xuyên (1lan/ngay...)
...........

# Code 
Loanh quanh lí thuyết có vẻ nhiều và lan man rồi chúng ta đi vào code để hiểu rõ hơn về các thành phần của *JobService* 

Đầu tiên các lưu ý đó là 

JobService mới phải được đăng ký trong tệp kê khai Android với quyền BIND_JOB_SERVICE.

```
<service
            android:name=".TestJobService"
            android:label="Word service"
            android:permission="android.permission.BIND_JOB_SERVICE" >

</service>
```





```
package com.vogella.android.localservice;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Intent;

/**
 * JobService to be scheduled by the JobScheduler.
 * start another service
 */
public class TestJobService extends JobService {
    private static final String TAG = "SyncService";

    @Override
    public boolean onStartJob(JobParameters params) {
        Intent service = new Intent(getApplicationContext(), LocalWordService.class);
        getApplicationContext().startService(service);
        Util.scheduleJob(getApplicationContext()); // reschedule the job
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters params) {
        return true;
    }

}
```



Như các bạn đã thấy code ở trên .

Để  sử dụng  chúng ta cần extends JobService và Override 2 phương thức **onStartJob** và **onStopJob** và một phương thức không  implement **jobFinished**()

 **onStartJob()** là nơi đặt logic công việc cần làm, *return false* nếu tiến trình có thể chạy trên main thread, *return true* nếu cần chia ra làm nhiều tiến trình khác nhau.
 Khi hoàn thành task  chúng ta cần gọi  jobFinished (JobParameters params, boolean needsReschedule) để xác nhận job đã hoàn thành và xác định thêm có hay không reschedule job hay không (true : có reschedule , false : không)
 
**onStopJob()**  được gọi bởi hệ thống nếu task đang thực hiện bị hủy trước khi task vụ kết thúc : Điều này thường xảy ra khi điều kiện công việc của bạn không còn được đáp ứng (như mất internet nếu task bạn thực hiện cần internet ...)

**jobFinished() **:

không phải là phương pháp bạn ghi đè và hệ thống sẽ không gọi nó. Đó là bởi vì bạn cần phải là người gọi phương thức này khi dịch vụ hoặc chủ đề của bạn đã hoàn thành công việcNếu phương thức onStartJob () của bạn khởi tạo một luồng khác và sau đó trả về true, bạn sẽ cần phải gọi phương thức này từ luồng đó khi công việc hoàn tất. Đây là cách hệ thống biết rằng nó có thể giải phóng wakelock của bạn một cách an toàn.
Vậy nếu chúng ta  bạn quên gọi jobFinished () thì sao ? Chúng ta sẽ bị hệ thống báo tiêu thụ pin 
jobFinished () yêu cầu hai tham số: công việc hiện tại, để nó biết wakelock nào có thể được giải phóng, và boolean cho biết bạn có muốn lên lịch lại công việc hay không.

# Kết
JobScheduler là một công cụ hưu ích và tuyệt vời  để chúng ta  thực hiện các task ở  background .  Trong bản cập nhật Android Nougat (API 24) đã giới thiệu một số tối ưu hóa background, trong đó JobScheduler là giải pháp thực hành tốt nhất 
Vì vậy hi vọng sau bài viết này các bạn sẽ hiểu hơn về JobScheduler và sử dụng nó một cách linh hoạt 
Thanks For Reading !
# Reference
1. http://www.vogella.com/tutorials/AndroidTaskScheduling/article.html
2. https://medium.com/google-developers/scheduling-jobs-like-a-pro-with-jobscheduler-286ef8510129