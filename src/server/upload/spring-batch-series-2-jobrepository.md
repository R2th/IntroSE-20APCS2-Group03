### Tại bài báo này mình sẽ thực hiện tạo một JobRepository.

## JobRepository là gì ?

### 1. Khái niệm.

- CRUD trong SQL:
  | Operation  | &nbsp;&nbsp;SQL |
  |:-----------|---------|
  |Create      |INSERT   |
  |Read        |SELECT   | 
  |Update      |UPDATE   | 
  |Delete      |DELETE   | 

- JobRepository
  > Repository responsible for persistence of batch meta-data entities.
  
  Nhiệm vụ thực hiện lưu trữ và đưa thông tin đôi tượng (object) vào đúng bản cài đặt của Spring Batch.

  | Table | Object 
  |------------------|--------------------------|
  |BATCH_JOB_INSTANCE|JobInstance
  |BATCH_JOB_EXECUTION|JobExecution
  |BATCH_JOB_EXECUTION_PARAMS|JobParameters
  |BATCH_STEP_EXECUTION|StepExecution
  |BATCH_JOB_EXECUTION_CONTEXT|ExecutionContext
  |BATCH_STEP_EXECUTION_CONTEXT|ExecutionContext

### 2. Tạo một project demo.

Truy cập vào [spring initializr](https://start.spring.io/) để tạo một project

- Add các thư viện cần thiết vào project:

  ![Tables](https://images.viblo.asia/07e1b667-16c3-477d-9ba7-47a0b3cf787b.PNG)

- Click chọn:

  ![Tables](https://images.viblo.asia/4f1cfc69-5a69-41ed-82e1-37715d9d2bf4.PNG)

### 3.  Cài dặt resource.

- Tại file application.properties thực hiện config khởi tạo tables.

  ```properties
  spring.batch.initialize-schema=always
  ```

- Tạo một class config connect database MySQL

  ```java
  @Configuration
  public class DataSourceConfiguration {

      @Bean
      public DataSource dataSource() {
          return DataSourceBuilder
                      .create()
                      .username("root")
                      .password("root")
                      .url("jdbc:mysql://localhost:3306/testdb")
                      .build();
      }
  }
  ```
- Tạo config cho jobRepository

  ```java
  @Configuration
  @EnableBatchProcessing
  @Import({DataSourceConfiguration.class})
  public class BatchConfig implements BatchConfigurer {

      @Autowired
      private DataSource dataSource;

      @Bean
      public JobRepository jobRepository() throws Exception {
          return getJobRepository();
      }

      @Bean
      public PlatformTransactionManager platformTransactionManager() throws Exception {
          return getTransactionManager();
      }

      @Override
      public JobRepository getJobRepository() throws Exception {
          return createJobRepository();
      }

      protected JobRepository createJobRepository() throws Exception {
          JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
          factory.setDataSource(dataSource);
          factory.setTransactionManager(getTransactionManager());
          factory.afterPropertiesSet();
          return factory.getObject();
      }

      @Override
      public PlatformTransactionManager getTransactionManager() throws Exception {
          return new DataSourceTransactionManager(this.dataSource);
      }

      ....
  }
  ```

- **Thực hiện run** lần dầu ta được một nhóm tables hệ thống của Spring Batch

     ![Tables](https://images.viblo.asia/cf600f41-0568-40b7-8322-1ac786f715cd.PNG)
 

### 4. Class Controller

- Tiếp theo tạo một class controller gửi một request url để thực hiện tạo một JobExecution

  ```java
  @Controller
  public class RequestRepositoryExample {

      @Autowired
      private JobRepository jobRepository;

      @Autowired
      private DefaultBatchConfigurer defaultBatchConfigurer;

      @RequestMapping(value = "/jobRepository", method = RequestMethod.GET)
      @ResponseBody
      public String execute() throws Exception {
          // Creating params
          JobParametersBuilder jobParametersBuilder = new JobParametersBuilder();
          jobParametersBuilder.addString("firstParamter", "1");

          // Register
          defaultBatchConfigurer.getJobRepository()
                                .createJobExecution("jobName", jobParametersBuilder.toJobParameters());

          return "<h1>Batch Success</h1>";
      }
  }
  ```
### 5. Kiểm tra

- Thực hiện gửi một request "/jobRepository"

  ![Tables](https://images.viblo.asia/2a449a90-5417-4e38-8e48-01f1fa72e8a3.PNG)

- Kiểm tra Job với tên **"jobName"** đã được đăng ký được chưa.

  ![Tables](https://images.viblo.asia/d7166553-c652-4691-adc9-e65f2ea52533.PNG)

- Đã đang ký params ở của job thành công chưa.

  ![Tables](https://images.viblo.asia/9f37b84a-8383-4236-8d80-f03ea67b67c5.PNG)


Vậy là đã thực hiện đăng ký thành thành công một Job thông qua class jobRepository.

Có gì không đúng mong mọi người góp ý.