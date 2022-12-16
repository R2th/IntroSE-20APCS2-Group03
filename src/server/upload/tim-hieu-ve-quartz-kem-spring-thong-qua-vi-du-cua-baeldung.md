Quartz nói đơn giản là một thư viện giúp ta lên lịch để thực thi một công việc nào đó ở trong một khoảng thời gian nào đó. Ví dụ đến giờ thì xóa sạch DB....
# 1. Job
Một task/một job/một công việc cần được thực thi. Theo miêu tả chính thức của doc :
> * The interface to be implemented by classes which represent a 'job' to be performed.

![](https://images.viblo.asia/c891badd-e3be-45b8-868b-13f1705c0c09.png)

Như ta đã thấy, trong class này ta chỉ phải Implement một interface do Quartz cung cấp là Job, và phải implement một phương thức duy nhất là execute(JobExecutionContext context). Trong đó param **JobExecutionContext** sẽ dùng để cung cấp tất cả những thông tin liên quan đến Job hiện tại. Ví dụ :thời gian thực thi, lịch chạy, kết quả, thông tin Job Detail,....vv

Đồng thời ta thấy ở đây, Job được register thành một bean, và gọi service bên trong hàm execute của chính nó.

# 2. JobDetail
Mặc dù interface Job được sử dụng để khai báo phương thức thực tiễn dùng để thực hiện một task, tuy nhiên class này không được stored/lưu trữ như là một instance sau đó để Quartz quản lý, mà thay vào đó, Quartz sẽ xử lý dựa trên class JobDetail. Ta hiểu đơn giản hơn đây là một thành phần hoàn chỉnh, bao quát hơn của một Job.

> While the job is the workhorse, Quartz does not store an actual instance of the job class. Instead, we can define an instance of the Job using the JobDetail class. The job’s class must be provided to the JobDetail so that it knows the type of the job to be executed.
```
@Bean
    public JobDetail jobDetail() {

        return newJob().ofType(SampleJob.class).storeDurably().withIdentity(JobKey.jobKey("Qrtz_Job_Detail")).withDescription("Invoke Sample Job service...").build();
    }
```

# 3. Trigger
Interface của Quartz, giúp ta khai báo, định nghĩa cách một JobDetail được thực thi. Ở đây ta thấy bean jobDetail đc gọi, và thực thi mỗi 10s, số lần lặp vĩnh viễn.
```
@Bean
    public Trigger trigger(JobDetail job) {

        int frequencyInSec = 10;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        return newTrigger().forJob(job).withIdentity(TriggerKey.triggerKey("Qrtz_Trigger")).withDescription("Sample trigger").withSchedule(simpleSchedule().withIntervalInSeconds(frequencyInSec).repeatForever()).build();
    }
```

Hàm *.withIdentity(TriggerKey.triggerKey("QrtzTrigger"))* được đặt để phân biệt giữa nhiều trigger với nhau, trong trường hợp một lúc có nhiều trigger. Mặc định nếu ta không set thì sẽ đc auto generate.

Có 2 loại là : simpler trigger và cron trigger. Simple trigger chỉ cho phép khai báo thời gian bắt đầu, nghỉ(sleep), và số lần lặp để chạy job. Cron trigger thì advance hơn, cho phép ta đặt lịch chi tiết thời gian chạy cho Job như ngày nào, giờ nào, sắp xếp,...vv

# 4. Scheduler
Lịch biểu, main interface của Quartz. Sau khi được đăng ký với Trigger và JobDetail liên quan, nó phải chịu trách nhiệm quản lý thực thi Job đó một khi được "active"(khi thời gian biểu của nó đến). Mặc định giữa JobDetail và Trigger không liên quan đến nhau, giữa 2 bên phải chịu sự móc nối giữa Scheduler

```
Scheduler scheduler = new StdSchedulerFactory().getScheduler();
      scheduler.start();
      scheduler.scheduleJob(job, trigger);
```

Sau đó, run class Main của module Spring Quart, ta sẽ được một số thông tin log trong service bên trong Job được gọi.
Main :
```
@ComponentScan
@EnableScheduling
public class SpringQuartzApp {

    public static void main(String[] args) {
        new SpringApplicationBuilder(SpringQuartzApp.class).bannerMode(Mode.OFF).run(args);
    }
}

```

Nguồn : https://www.baeldung.com/spring-quartz-schedule