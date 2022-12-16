# 1.Giới thiệu
Bài trước chúng ta đã tìm hiểu về SpringBoot-gradle-redis tham khảo : https://viblo.asia/p/springboot-gradle-redis-gDVK28pAlLj
cùng với seri springBoot-gradle, bài này tôi sẽ giới thiệu về springBoot with quartz...

# 2.Project Structure
#### - project struture của chúng ta sẽ có cấu trúc thư mục như sau:
![](https://images.viblo.asia/69a26f6b-af43-4d7e-a8c7-a9f63fae06e0.png)

#### - Gradle build file to Resolve JAR Dependency
Trong file build.gradle config các dependencies:
```
buildscript {
    repositories {
        mavenLocal()
        jcenter()
        mavenCentral()
    }
}


apply plugin: 'java'

plugins { id "io.spring.dependency-management" version "1.0.4.RELEASE" }

jar {
    baseName = 'spring-redis'
    version = '0.0.1-SNAPSHOT'
}

dependencies {
    compile("org.springframework.boot:spring-boot-starter-data-redis")
    compile group: 'org.glassfish.jersey.media', name: 'jersey-media-json-jackson', version: '2.25.1'
    compile 'org.springframework.data:spring-data-commons:1.9.1.RELEASE'
    compile 'org.springframework.boot:spring-boot-starter-security:1.2.0.RELEASE'
    compile group: 'org.quartz-scheduler', name: 'quartz', version: '2.2.3'
}
```

#### - Configuration BatchApplication:
Trong class BatchApplication:
```
@SpringBootApplication
public class BatchApplication {
    public static void main(String[] args) {
        SpringApplication.run(BatchApplication.class, args);
    }
}
```

#### - Configuration QuartzConfig
```

@Configuration
@Import(CaculatePoints.class)
public class QuartzConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(QuartzConfig.class);

    @Value("${org.quartz.scheduler.instanceName}")
    private String instanceName;

    @Value("${org.quartz.scheduler.instanceId}")
    private String instanceId;

    @Value("${org.quartz.threadPool.threadCount}")
    private String threadCount;

    @Autowired
    @Qualifier("cronCaculatePointsTriggerBean")
    private CronTriggerFactoryBean cronCaculatePointsTrigger;

    @Bean
    public org.quartz.spi.JobFactory jobFactory(ApplicationContext applicationContext) {
        QuartzJobFactory JobFactory = new QuartzJobFactory();
        JobFactory.setApplicationContext(applicationContext);
        return JobFactory;
    }

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean(ApplicationContext applicationContext) {
        SchedulerFactoryBean factory = new SchedulerFactoryBean();

        factory.setOverwriteExistingJobs(true);
        factory.setJobFactory(jobFactory(applicationContext));

        Properties quartzProperties = new Properties();
        quartzProperties.setProperty("org.quartz.scheduler.instanceName", instanceName);
        quartzProperties.setProperty("org.quartz.scheduler.instanceId", instanceId);
        quartzProperties.setProperty("org.quartz.threadPool.threadCount", threadCount);

        factory.setQuartzProperties(quartzProperties);
        factory.setTriggers(cronCaculatePointsTrigger.getObject());
        LOGGER.info("starting jobs...");

        return factory;
    }
}
```

Trong QuartzConfig.class này chúng ta sẽ trigger một cronJob với Job là cronCaculatePointsTrigger.

#### - Configuration QuartzJobFactory

```
public class QuartzJobFactory extends SpringBeanJobFactory implements ApplicationContextAware {

    private static final Logger LOGGER = LoggerFactory.getLogger(QuartzJobFactory.class);

    private transient AutowireCapableBeanFactory beanFactory;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        beanFactory = applicationContext.getAutowireCapableBeanFactory();
    }

    @Override
    protected Object createJobInstance(TriggerFiredBundle bundle) throws Exception {
        final Object job = super.createJobInstance(bundle);
        LOGGER.info("create job instance");
        beanFactory.autowireBean(job);
        return job;
    }
}
```
#### - createService "CaculatePointsService"
```
@Service
public class CaculatePointsService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CaculatePointsService.class);

	public void caculatePoints() {
		LOGGER.info("TODO SOMETHINGS");
	}
}
```

Service này chỉ đơn giản là log ra console với "TODO SOMETHINGS"!

 #### - createJob "CaculatePointsJob"
```
public class CaculatePointsJob implements Job {

    @Autowired
    private CaculatePointsService cronService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        cronService.caculatePoints();
    }

}
```
 - #### - Configuration shedule 
```
@Configuration
public class CaculatePoints {

    @Value("${job.startDelay}")
    private Long startDelay;

    @Value("${job.repeatInterval}")
    private Long repeatInterval;

    @Value("${job.description}")
    private String description;

    @Value("${job.key}")
    private String key;


    @Bean(name = "caculatePointsTriggerBean")
    public SimpleTriggerFactoryBean caculatePointsTriggerBean() {
        SimpleTriggerFactoryBean factoryBean = new SimpleTriggerFactoryBean();
        factoryBean.setJobDetail(caculateJobDetails().getObject());
        factoryBean.setStartDelay(startDelay);
        factoryBean.setRepeatInterval(repeatInterval);
        factoryBean.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);
        factoryBean.setMisfireInstruction(SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT);
        return factoryBean;
    }

    @Bean(name = "cronCaculatePointsTriggerBean")
    public CronTriggerFactoryBean cronCaculatePointsTriggerBean() {
        CronTriggerFactoryBean stFactory = new CronTriggerFactoryBean();
        stFactory.setJobDetail(caculateJobDetails().getObject());
        stFactory.setStartDelay(startDelay);
        stFactory.setCronExpression("* * * ? * *");
        return stFactory;
    }

    @Bean(name = "caculateJobDetails")
    public JobDetailFactoryBean caculateJobDetails() {
        JobDetailFactoryBean jobDetailFactoryBean = new JobDetailFactoryBean();
        jobDetailFactoryBean.setJobClass(CaculatePointsJob.class);
        jobDetailFactoryBean.setDescription(description);
        jobDetailFactoryBean.setDurability(true);
        jobDetailFactoryBean.setName(key);

        return jobDetailFactoryBean;
    }

}
```

Trong file schedule này tôi tạo ra một cronJob là cronCaculatePointsTriggerBean, CronTriggerFactoryBean này sẽ gọi đến một JobDetailFactoryBean và start với mỗi giây thông qua expression: * * * ? * *,.

và các thông số như 
```
 @Value("${job.startDelay}")
    private Long startDelay;

    @Value("${job.repeatInterval}")
    private Long repeatInterval;

    @Value("${job.description}")
    private String description;

    @Value("${job.key}")
    private String key;
```

sẽ được fix trong file application.yml như sau:
```
org:
  quartz:
    scheduler:
      instanceName: caculatePoints
      instanceId: AUTO
    threadPool:
      threadCount: 5
job:
  startDelay: 0
  repeatInterval: 60000
  description: caculatePoints batch
  key: StatisticsJob
```

#### - Chạy main class hoặc build project
- sau khi config xong vào folder dự án và mở terminal lên và gõ lệnh: gradle clean build. lệnh này sẽ giúp compile, package thành file .jar
- chạy file jar như sau: gõ lệnh java -jar "tên file jar"
- ví dụ: java -jar spring-quartz-0.0.1-SNAPSHOT.jar