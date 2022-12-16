# 1. Tạo ứng dụng Spring Boot với IntelliJ
Mình sẽ chọn IDE IntelliJ hướng dẫn các bạn tạo project Spring Boot nhé. Mình cũng khuyến khích các bạn sử dụng IntelliJ vì nó tích hợp rất nhiều plugin hay ho. Tuy nhiên vì vấn đề bản quyền nên nhiều công ty trong tin tuyển dụng thường ghi yêu cầu là thành thạo Eclipse :D
Các bạn tham khảo các screenshoot sau nhé
![](https://images.viblo.asia/dd32d7e6-f233-4627-8ae7-b6effd5acc7d.png)
![](https://images.viblo.asia/eac1d41a-d0c2-4abb-bf05-efc32456d859.png)
![](https://images.viblo.asia/3270caff-5a2a-4556-aae0-ea678b8c0116.png)
Ok. Vậy là xong.


# 2. Kích hoạt Scheduling trong Spring Boot
Bạn có thể kích hoạt chức năng lên lịch trình một cách đơn giản bằng việt thêm annotation @EnableScheduling vào trong main application class hay trong 1 lớp class nào đó mà bạn đătj annotation @Configuration
Mình chọn cách thứ 1. Do đó, mình sẽ add anotation đó vào ngay trong DemoApplication.java

```java
package springbootdemo.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling


public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}

```

# 3. Lên lịch trình


Việc lên lịch trình cho các công việc trong Spring Boot cực kì đơn giản. Bạn chỉ cần thên annotation @Scheduled cho method và cung cấp 1 vài parameter được sử dụng để quyết định thời gian mà task sẽ chạy. Ta sẽ cùng xem qua xem annotation này đựoc định nghĩa như thế nào nhé

```java
/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.scheduling.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * An annotation that marks a method to be scheduled. Exactly one of
 * the {@link #cron()}, {@link #fixedDelay()}, or {@link #fixedRate()}
 * attributes must be specified.
 *
 * <p>The annotated method must expect no arguments. It will typically have
 * a {@code void} return type; if not, the returned value will be ignored
 * when called through the scheduler.
 *
 * <p>Processing of {@code @Scheduled} annotations is performed by
 * registering a {@link ScheduledAnnotationBeanPostProcessor}. This can be
 * done manually or, more conveniently, through the {@code <task:annotation-driven/>}
 * element or @{@link EnableScheduling} annotation.
 *
 * <p>This annotation may be used as a <em>meta-annotation</em> to create custom
 * <em>composed annotations</em> with attribute overrides.
 *
 * @author Mark Fisher
 * @author Dave Syer
 * @author Chris Beams
 * @since 3.0
 * @see EnableScheduling
 * @see ScheduledAnnotationBeanPostProcessor
 * @see Schedules
 */
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repeatable(Schedules.class)
public @interface Scheduled {

	/**
	 * A cron-like expression, extending the usual UN*X definition to include
	 * triggers on the second as well as minute, hour, day of month, month
	 * and day of week.  e.g. {@code "0 * * * * MON-FRI"} means once per minute on
	 * weekdays (at the top of the minute - the 0th second).
	 * @return an expression that can be parsed to a cron schedule
	 * @see org.springframework.scheduling.support.CronSequenceGenerator
	 */
	String cron() default "";

	/**
	 * A time zone for which the cron expression will be resolved. By default, this
	 * attribute is the empty String (i.e. the server's local time zone will be used).
	 * @return a zone id accepted by {@link java.util.TimeZone#getTimeZone(String)},
	 * or an empty String to indicate the server's default time zone
	 * @since 4.0
	 * @see org.springframework.scheduling.support.CronTrigger#CronTrigger(String, java.util.TimeZone)
	 * @see java.util.TimeZone
	 */
	String zone() default "";

	/**
	 * Execute the annotated method with a fixed period in milliseconds between the
	 * end of the last invocation and the start of the next.
	 * @return the delay in milliseconds
	 */
	long fixedDelay() default -1;

	/**
	 * Execute the annotated method with a fixed period in milliseconds between the
	 * end of the last invocation and the start of the next.
	 * @return the delay in milliseconds as a String value, e.g. a placeholder
	 * or a {@link java.time.Duration#parse java.time.Duration} compliant value
	 * @since 3.2.2
	 */
	String fixedDelayString() default "";

	/**
	 * Execute the annotated method with a fixed period in milliseconds between
	 * invocations.
	 * @return the period in milliseconds
	 */
	long fixedRate() default -1;

	/**
	 * Execute the annotated method with a fixed period in milliseconds between
	 * invocations.
	 * @return the period in milliseconds as a String value, e.g. a placeholder
	 * or a {@link java.time.Duration#parse java.time.Duration} compliant value
	 * @since 3.2.2
	 */
	String fixedRateString() default "";

	/**
	 * Number of milliseconds to delay before the first execution of a
	 * {@link #fixedRate()} or {@link #fixedDelay()} task.
	 * @return the initial delay in milliseconds
	 * @since 3.2
	 */
	long initialDelay() default -1;

	/**
	 * Number of milliseconds to delay before the first execution of a
	 * {@link #fixedRate()} or {@link #fixedDelay()} task.
	 * @return the initial delay in milliseconds as a String value, e.g. a placeholder
	 * or a {@link java.time.Duration#parse java.time.Duration} compliant value
	 * @since 3.2.2
	 */
	String initialDelayString() default "";

}

```

Như vậy, ta có thể thế, có Sprign Scheduling cho ta cài đặt 4 kiểu thuộc tính như sau
1. Khoảng cách thời gian giữa các lần chạy method (`fixedRate`)
2. Khoảng cách thời gian giữa các lần chạy hoàn thành method (`fixedDelay`)
4. Thời gian delay cho lần đầu tiên chạy method (`initialDelay`)
5. Cron chạy method (`cron`)


Trước tiên, ta hãy tạo 1 class là container để chứa đựng các công việc cần lên lịch trình. Tạo 1 class có tên là `ScheduledTasks` như mình nhé 
```
package springbootdemo.demo.scheduledtasks;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

    public void scheduleTaskWithFixedRate() {
    }

    public void scheduleTaskWithFixedDelay() {
    }

    public void scheduleTaskWithInitialDelay() {
    }

    public void scheduleTaskWithCronExpression() {
    }
}

```



## 3.1. Chạy lặp (Sử dụng fixedRate)
Thử hình dung ra, hệ thống của bạn có 1 yêu cầu, đó là sau khi deploy, cứ mỗi ngày cần phải gửi báo cáo về số lượng người mua hàng tới email của nhà bán hàng. Như vậy, ta có thể sử dụng schedule với `fixedRate` là `84600` (Trong đoạn code dưới đây, mình để là 2000ms để ta có thể nhìn dễ hơn nhé)
```
    @Scheduled(fixedRate = 2000)
    public void scheduleTaskWithFixedRate() {
        // call send email method here
        LOGGER.info("Send email to producers to inform quantity sold items");
    }
```
    
Bạn chạy application và nhìn vào log.
![](https://images.viblo.asia/d53957c5-7fea-48d4-ac3d-13a0bf7fa07c.png)

Nhìn vào log, bạn có thể thấy cứ 2s thì message `Send email to producers to inform quantity sold items` hiện ra 1 lần và ngay sau khi web app được deploy thành công

## 3.2. Chạy lặp (Sử dụng fixedDelay)
Cùng với bài toán ở phía trên, nhưng thay đổi 1 chút. Đó là thay vì mỗi giờ bạn gửi email, thì giờ bạn muốn thay đổi là, khi tác vụ gửi email đó hoàn thành, 1 tiếng sau đó, lại thực hiện lại tác vụ gửi email. Cứ như thế... 
Nó khác gì với yêu cầu thứ phía trên?
Khác là ở chỗ
* Ở 3.1, nếu bạn deploy app thành công lúc 12h, thì tác vụ gửi mail sẽ được gọi đầu tiên lúc 12h trưa, sau đó 1h, 2h, 3h .v.v. là những mốc thời gian mà tác vụ gửi mail đc thực hiện
* Ở 3.2, khác 1 chút, vẫn là 12h deploy thành công, 12h thực hiện tác vụ gửi mail đầu tiên. Nhưng nếu việc gửi mail mất 5p, thì 1 tiếng sau đó (tức là 1h5p) thì tác vụ gửi mail mới dc gọi lần thứ 2, lần này gửi mail lại mất 10p (tức là 1h15p ms hoàn thành) thì phải chờ tới 2h15p mới được gọi lại

Ta cùng thử ở code sau nhé 
```java
    @Scheduled(fixedDelay = 10000)
    public void scheduleTaskWithFixedDelay() {
        // Call send email method here
        // Pretend it takes 1000ms
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LOGGER.info("Send email to producers to inform quantity sold items");
    }
```
Kết quả log nhận được     
```sh
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.0.0.RELEASE)

2018-04-10 09:15:16.061  INFO 22208 --- [           main] springbootdemo.demo.DemoApplication      : Starting DemoApplication on nhs3108-ms-7817 with PID 22208 (/home/nhs3108/Codes/SpringBootDemo/target/classes started by nhs3108 in /home/nhs3108/Codes/SpringBootDemo)
2018-04-10 09:15:16.064  INFO 22208 --- [           main] springbootdemo.demo.DemoApplication      : No active profile set, falling back to default profiles: default
2018-04-10 09:15:16.105  INFO 22208 --- [           main] s.c.a.AnnotationConfigApplicationContext : Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@4d14b6c2: startup date [Tue Apr 10 09:15:16 ICT 2018]; root of context hierarchy
2018-04-10 09:15:16.618  INFO 22208 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
2018-04-10 09:15:16.628  INFO 22208 --- [           main] s.a.ScheduledAnnotationBeanPostProcessor : No TaskScheduler/ScheduledExecutorService bean found for scheduled processing
2018-04-10 09:15:16.635  INFO 22208 --- [           main] springbootdemo.demo.DemoApplication      : Started DemoApplication in 0.875 seconds (JVM running for 1.401)
2018-04-10 09:15:17.633  INFO 22208 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:15:28.633  INFO 22208 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:15:39.634  INFO 22208 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:15:50.635  INFO 22208 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:16:01.636  INFO 22208 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
```

Bạn thấy rằng, ta đang để `fixedDelay = 10000`, nhưng khoảng cách giữa các lần log là khoảng 11s. Lý do việc thực thi hàm này hết 1s và phải chờ 10s sau nó mới lại dc gọi lại. Nếu như phần 3.1, các lần log cách nhau chính xác tới từng miliseconds, thì 3.2 lại khác. Bởi phần trên nó k cần care tới việc method này chạy hết bao lâu và xong hay chưa

## 3.3. Chạy lặp với khoảng thời gian fixedRate sau khi đi deploy initialDelay (Sử dụng kết hợp fixedRate và initialDelay)


Gần giống như 3.1, Ở đây chỉ khác là, nếu như 3.1 bạn chạy tác vụ gửi mail ngay khi deploy xong, thì `initialDelay` cho phép bạn thực hiện việc này sau 1 khoảng thời gian là initialDelay(miliseconds)
```java
    @Scheduled(fixedRate = 2000, initialDelay = 10000)
    public void scheduleTaskWithInitialDelay() {
        LOGGER.info("Send email to producers to inform quantity sold items");
    }
```

```sh
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.0.0.RELEASE)

2018-04-10 09:23:06.296  INFO 22556 --- [           main] springbootdemo.demo.DemoApplication      : Starting DemoApplication on nhs3108-ms-7817 with PID 22556 (/home/nhs3108/Codes/SpringBootDemo/target/classes started by nhs3108 in /home/nhs3108/Codes/SpringBootDemo)
2018-04-10 09:23:06.298  INFO 22556 --- [           main] springbootdemo.demo.DemoApplication      : No active profile set, falling back to default profiles: default
2018-04-10 09:23:06.331  INFO 22556 --- [           main] s.c.a.AnnotationConfigApplicationContext : Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@2145433b: startup date [Tue Apr 10 09:23:06 ICT 2018]; root of context hierarchy
2018-04-10 09:23:06.797  INFO 22556 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
2018-04-10 09:23:06.806  INFO 22556 --- [           main] s.a.ScheduledAnnotationBeanPostProcessor : No TaskScheduler/ScheduledExecutorService bean found for scheduled processing
2018-04-10 09:23:06.811  INFO 22556 --- [           main] springbootdemo.demo.DemoApplication      : Started DemoApplication in 0.732 seconds (JVM running for 1.197)
2018-04-10 09:23:16.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:23:18.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:23:20.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:23:22.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:23:24.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
2018-04-10 09:23:26.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
```

Bạn để ý
```s
2018-04-10 09:23:06.811  INFO 22556 --- [           main] springbootdemo.demo.DemoApplication      : Started DemoApplication in 0.732 seconds (JVM running for 1.197)
2018-04-10 09:23:16.809  INFO 22556 --- [pool-1-thread-1] s.demo.scheduledtasks.ScheduledTasks     : Send email to producers to inform quantity sold items
```

## 3.4. Hẹn giờ với cron (Sử dụng cron)

Cũng vẫn yêu cầu gửi mail, nhưng bạn muốn gửi vào 12h thứ 6 hàng tuần, hoặc 23h59 ngày cuối tháng .v.v.v. Những thứ bên trên kia là ko đủ. Vậy bạn hãy nghĩ tới cron. Mình ví dụ, log ra màn hình vào giây 15 của mỗi phút. Ta làm như sau
```
@Scheduled(cron = "15 * * * * ?")
public void scheduleTaskWithCronExpression() {
    LOGGER.info("Send email to producers to inform quantity sold items");
}
```

Bạn có thể thay đổi cron expression để phù hợp với yêu cầu của hệ thống.
Bạn có thể tham khảo trên https://www.freeformatter.com/cron-expression-generator-quartz.html, 1 công cụ generate cron expression cũng như explain cron expression rất hay.


Cảm ơn các bạn đã theo dõi!