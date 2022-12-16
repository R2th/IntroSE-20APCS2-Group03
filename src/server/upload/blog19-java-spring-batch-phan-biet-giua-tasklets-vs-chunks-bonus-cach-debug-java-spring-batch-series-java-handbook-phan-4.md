![image.png](https://images.viblo.asia/0acd9acb-7a18-47ae-b5fc-8278f4a00386.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉. 
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.
  

Lần này mình sẽ giới thiệu về **JAVA Spring Batch**. Bạn nào làm **JAVA** thì chắc ko xa lạ gì về cái này. Trong quá trình tìm hiểu về **JAVA Spring Batch** mình thấy một trong những **vấn đề** cũng đáng quan tâm đó là: Phân biệt giữa **Tasklets** vs **Chunks**. Và hôm nay mình sẽ nói về nó. (Bonus là mình cũng sẽ chỉ các bạn cách để Debug Java Spring Batch)


GÉT GÔ 😊

**1\. Giới thiệu**
------------------

**[Spring Batch](https://projects.spring.io/spring-batch/) cung cấp hai cách khác nhau để thực hiện một job: sử dụng tasklet và chunks** .

Trong bài viết này, chúng ta sẽ tìm hiểu cách định cấu hình và triển khai cả hai hàm bằng một ví dụ thực tế đơn giản.

**2\. Dependencies**
--------------------

Hãy bắt đầu bằng **cách thêm các Dependencies cần thiết**:

```xml
<dependency>
    <groupId>org.springframework.batch</groupId>
    <artifactId>spring-batch-core</artifactId>
    <version>4.3.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.batch</groupId>
    <artifactId>spring-batch-test</artifactId>
    <version>4.3.0</version>
    <scope>test</scope>
</dependency>
```

Để có được phiên bản mới nhất của [spring-batch-core](https://search.maven.org/classic/#search%7Cgav%7C1%7Cg%3A%22org.springframework.batch%22%20AND%20a%3A%22spring-batch-core%22) và [spring-batch-test](https://search.maven.org/classic/#search%7Cgav%7C1%7Cg%3A%22org.springframework.batch%22%20AND%20a%3A%22spring-batch-test%22) , vui lòng tham khảo Maven Central.

**3\. Case mà chúng ta sẽ xử lý**
---------------------------------

Xét một tệp CSV có nội dung sau:

```
Mae Hodges,10/22/1972
Gary Potter,02/22/1953
Betty Wise,02/17/1968
Wayne Rose,04/06/1977
Adam Caldwell,09/27/1995
Lucille Phillips,05/14/1992
```

Vị **trí đầu tiên của mỗi dòng thể hiện tên của một người và vị trí thứ hai  ngày tháng năm sinh của người đó** .

Trường hợp sử dụng của chúng ta là **tạo một tệp CSV khác chứa tên và tuổi của mỗi người** :

```
Mae Hodges,45
Gary Potter,64
Betty Wise,49
Wayne Rose,40
Adam Caldwell,22
Lucille Phillips,25
```

Bây giờ nhiệm vụ của chúng ta đã rõ ràng, hãy tiếp tục và xây dựng một giải pháp bằng cách sử dụng cả hai cách tiếp cận. Chúng ta sẽ bắt đầu với các **tasklet**.

**4\. Tasklets**[](#tasklets)
-----------------------------

### **4.1. Giới thiệu và thiết kế**[](#tasklets-design)

**Tasklet** có nghĩa là thực hiện một nhiệm vụ duy nhất trong một bước. **Job** của chúng ta sẽ bao gồm một số bước thực hiện lần lượt. **Mỗi bước chỉ nên thực hiện một nhiệm vụ nhất định** .

**Job** của chúng ta sẽ bao gồm ba bước:

1.  Đọc các dòng từ tệp **CSV** đầu vào.
2.  Tính tuổi cho mỗi người trong tệp **CSV** đầu vào.
3.  Ghi tên và tuổi của từng người vào tệp **CSV** đầu ra mới.

Bây giờ thì mọi thứ đã sẵn sàng, hãy tạo các class **step**.

_**LinesReader**_ sẽ phụ trách việc đọc dữ liệu từ tệp đầu vào:

```java
public class LinesReader implements Tasklet {
    // ...
}
```

_LinesProcessor_ sẽ tính tuổi cho mọi người trong tệp:

```java
public class LinesProcessor implements Tasklet {
    // ...
}
```

Cuối cùng, _LinesWriter_ sẽ có trách nhiệm ghi tên và tuổi vào tệp đầu ra:

```java
public class LinesWriter implements Tasklet {
    // ...
}
```

Tại thời điểm này, **tất cả các bước của chúng ta đều** **implement Tasklet interface**. Điều đó sẽ buộc chúng ta phải triển khai hàm _**execute**_ của nó:

```java
@Override
public RepeatStatus execute(StepContribution stepContribution, 
  ChunkContext chunkContext) throws Exception {
    // ...
}
```

Hàm này là nơi chúng ta sẽ thêm logic cho mỗi bước. Trước khi bắt đầu với code đó, hãy cấu hình **job** của chúng ta.

### **4.2. Cấu hình**[](#tasklets-configuration)

Chúng ta cần **thêm một số config vào contexts của Spring** **App**. Sau khi thêm khai báo **bean** tiêu chuẩn cho các lớp đã tạo trong phần trước, chúng ta đã sẵn sàng tạo định nghĩa **job** của mình:

```java
@Configuration
@EnableBatchProcessing
public class TaskletsConfig {

    @Autowired 
    private JobBuilderFactory jobs;

    @Autowired 
    private StepBuilderFactory steps;

    @Bean
    protected Step readLines() {
        return steps
          .get("readLines")
          .tasklet(linesReader())
          .build();
    }

    @Bean
    protected Step processLines() {
        return steps
          .get("processLines")
          .tasklet(linesProcessor())
          .build();
    }

    @Bean
    protected Step writeLines() {
        return steps
          .get("writeLines")
          .tasklet(linesWriter())
          .build();
    }

    @Bean
    public Job job() {
        return jobs
          .get("taskletsJob")
          .start(readLines())
          .next(processLines())
          .next(writeLines())
          .build();
    }

    // ...

}
```

Điều này có nghĩa là _“**taskletsJob**”_ của chúng ta sẽ bao gồm ba bước. Cái đầu tiên ( _**readLines**_ ) sẽ thực thi **tasklet** được định nghĩa trong bean _**linesReader**_ và chuyển sang bước tiếp theo: _**processLines**. **ProcessLines**_ sẽ thực hiện **tasklet** được định nghĩa trong bean _**linesProcessor**_ và chuyển đến bước cuối cùng: _**writeLines**_ .

Quy trình thực hiện **job** của chúng ta đã được xác định và đã sẵn sàng thêm một số logic!

### **4.3. Model và Utils**[](#models-and-utils)

Vì chúng ta sẽ thao tác trên các dòng trong tệp **CSV**, chúng ta sẽ tạo một _Class Line:_

```java
public class Line implements Serializable {

    private String name;
    private LocalDate dob;
    private Long age;

    // standard constructor, getters, setters and toString implementation

}
```

Xin lưu ý rằng _Line_ implement _Serializable._ Đó là vì _Line_ sẽ hoạt động như một DTO để truyền dữ liệu giữa các bước. Khi dùng Spring Batch, **các đối tượng được chuyển giữa các bước phải có thể tuần tự hóa**.

Mặt khác, chúng ta có thể bắt đầu suy nghĩ về việc dùng một thư viện nào đó để đọc và viết các dòng.

Vì vậy, chúng ta sẽ sử dụng **OpenCSV**:

```xml
<dependency>
    <groupId>com.opencsv</groupId>
    <artifactId>opencsv</artifactId>
    <version>4.1</version>
</dependency>
```

Tìm phiên bản [OpenCSV](https://search.maven.org/classic/#search%7Cgav%7C1%7Cg%3A%22com.opencsv%22%20AND%20a%3A%22opencsv%22) mới nhất trong Maven Central.

Khi **OpenCSV** được thêm vào, **chúng ta cũng sẽ tạo một lớp _FileUtils_** . Nó sẽ cung cấp các hàm để đọc và ghi các dòng **CSV**:

```java
public class FileUtils {

    public Line readLine() throws Exception {
        if (CSVReader == null) 
          initReader();
        String[] line = CSVReader.readNext();
        if (line == null) 
          return null;
        return new Line(
          line[0], 
          LocalDate.parse(
            line[1], 
            DateTimeFormatter.ofPattern("MM/dd/yyyy")));
    }

    public void writeLine(Line line) throws Exception {
        if (CSVWriter == null) 
          initWriter();
        String[] lineStr = new String[2];
        lineStr[0] = line.getName();
        lineStr[1] = line
          .getAge()
          .toString();
        CSVWriter.writeNext(lineStr);
    }

    // ...
}
```

Lưu ý rằng _**readLine**_ hoạt động như một trình bao bọc trên hàm **readNext** của _**OpenCSV**_ và trả về một đối tượng _**Line**_ .

Theo cách tương tự, _**writeLine**_ kết thúc **_writeNext_** của _**OpenCSV**_ khi nhận một đối tượng _**Line**_ . 

Triển khai đầy đủ lớp này thì sẽ trông như thế này:

```java
public class FileUtils {

    private final Logger logger = LoggerFactory.getLogger(FileUtils.class);

    private String fileName;
    private CSVReader CSVReader;
    private CSVWriter CSVWriter;
    private FileReader fileReader;
    private FileWriter fileWriter;
    private File file;

    public FileUtils(String fileName) {
        this.fileName = fileName;
    }

    public Line readLine() {
        try {
            if (CSVReader == null) initReader();
            String[] line = CSVReader.readNext();
            if (line == null) return null;
            return new Line(line[0], LocalDate.parse(line[1], DateTimeFormatter.ofPattern("MM/dd/yyyy")));
        } catch (Exception e) {
            logger.error("Error while reading line in file: " + this.fileName);
            return null;
        }
    }

    public void writeLine(Line line) {
        try {
            if (CSVWriter == null) initWriter();
            String[] lineStr = new String[2];
            lineStr[0] = line.getName();
            lineStr[1] = line
              .getAge()
              .toString();
            CSVWriter.writeNext(lineStr);
        } catch (Exception e) {
            logger.error("Error while writing line in file: " + this.fileName);
        }
    }

    private void initReader() throws Exception {
        ClassLoader classLoader = this
          .getClass()
          .getClassLoader();
        if (file == null) file = new File(classLoader
          .getResource(fileName)
          .getFile());
        if (fileReader == null) fileReader = new FileReader(file);
        if (CSVReader == null) CSVReader = new CSVReader(fileReader);
    }

    private void initWriter() throws Exception {
        if (file == null) {
            file = new File(fileName);
            file.createNewFile();
        }
        if (fileWriter == null) fileWriter = new FileWriter(file, true);
        if (CSVWriter == null) CSVWriter = new CSVWriter(fileWriter);
    }

    public void closeWriter() {
        try {
            CSVWriter.close();
            fileWriter.close();
        } catch (IOException e) {
            logger.error("Error while closing writer.");
        }
    }

    public void closeReader() {
        try {
            CSVReader.close();
            fileReader.close();
        } catch (IOException e) {
            logger.error("Error while closing reader.");
        }
    }

}
```

Tại thời điểm này, tất cả đã sẵn sàng để bắt đầu với việc triển khai từng bước.

### **4.4. _LinesReader_**[](#tasklets-lineReader)

Hãy tiếp tục và hoàn thành lớp _LinesReader_ của chúng ta :

```java
public class LinesReader implements Tasklet, StepExecutionListener {

    private final Logger logger = LoggerFactory
      .getLogger(LinesReader.class);

    private List<Line> lines;
    private FileUtils fu;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        lines = new ArrayList<>();
        fu = new FileUtils(
          "taskletsvschunks/input/tasklets-vs-chunks.csv");
        logger.debug("Lines Reader initialized.");
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, 
      ChunkContext chunkContext) throws Exception {
        Line line = fu.readLine();
        while (line != null) {
            lines.add(line);
            logger.debug("Read line: " + line.toString());
            line = fu.readLine();
        }
        return RepeatStatus.FINISHED;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        fu.closeReader();
        stepExecution
          .getJobExecution()
          .getExecutionContext()
          .put("lines", this.lines);
        logger.debug("Lines Reader ended.");
        return ExitStatus.COMPLETED;
    }
}
```

_Hàm thực thi của LinesReader_ tạo ra một instance _FileUtils_ trên đường dẫn tệp đầu vào. Sau đó, **thêm các dòng vào danh sách cho đến khi không còn dòng nào để đọc** .

Lớp của chúng ta **cũng implement _StepExecutionListener_** cung cấp hai hàm bổ sung: _**beforeStep**_ và _**afterStep**_. Chúng ta sẽ sử dụng các hàm đó để khởi tạo và đóng mọi thứ trước và sau khi chạy _execute._

Nếu chúng ta xem code _**afterStep**_, sẽ nhận thấy dòng mà nơi danh sách kết quả được đặt trong **contexts** của **job** để làm cho nó có sẵn ở bước tiếp theo: (Dùng để chấm chấm chấm liên tục ấy 😂)

```java
stepExecution
  .getJobExecution()
  .getExecutionContext()
  .put("lines", this.lines);
```

Tại thời điểm này, bước đầu tiên của chúng ta đã hoàn thành cơ bản các việc cần làm: tải các dòng trong CSV vào một _Danh sách_ trong bộ nhớ. Hãy chuyển sang bước thứ hai và xử lý chúng.

### **4.5. _LinesProcessor_**[](#tasklets-linesProcessor)

**_LinesProcessor_ cũng sẽ implement _StepExecutionListener_ và tất nhiên là cả _Tasklet_.** Điều đó có nghĩa là nó cũng sẽ implement _các hàm **beforeStep**_ , _**execute**_ và _**afterStep**_ :

```java
public class LinesProcessor implements Tasklet, StepExecutionListener {

    private Logger logger = LoggerFactory.getLogger(
      LinesProcessor.class);

    private List<Line> lines;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        ExecutionContext executionContext = stepExecution
          .getJobExecution()
          .getExecutionContext();
        this.lines = (List<Line>) executionContext.get("lines");
        logger.debug("Lines Processor initialized.");
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, 
      ChunkContext chunkContext) throws Exception {
        for (Line line : lines) {
            long age = ChronoUnit.YEARS.between(
              line.getDob(), 
              LocalDate.now());
            logger.debug("Calculated age " + age + " for line " + line.toString());
            line.setAge(age);
        }
        return RepeatStatus.FINISHED;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        logger.debug("Lines Processor ended.");
        return ExitStatus.COMPLETED;
    }
}
```

Thật dễ dàng để hiểu **việc này đã giúp chúng ta tải danh sách _các dòng_ từ contexts của job và tính tuổi của mỗi người** .

Không cần đặt danh sách kết quả khác trong **contexts** vì các sửa đổi xảy ra trên cùng một đối tượng đến từ bước trước.

Và chúng ta đã sẵn sàng cho bước cuối cùng của mình.

### **4.6. _LinesWriter_**[](#tasklets-linesWriter)

**_Nhiệm vụ của LinesWriter_ là duyệt qua danh sách _dòng_ và ghi tên và tuổi vào tệp đầu ra** :

```java
public class LinesWriter implements Tasklet, StepExecutionListener {

    private final Logger logger = LoggerFactory
      .getLogger(LinesWriter.class);

    private List<Line> lines;
    private FileUtils fu;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        ExecutionContext executionContext = stepExecution
          .getJobExecution()
          .getExecutionContext();
        this.lines = (List<Line>) executionContext.get("lines");
        fu = new FileUtils("output.csv");
        logger.debug("Lines Writer initialized.");
    }

    @Override
    public RepeatStatus execute(StepContribution stepContribution, 
      ChunkContext chunkContext) throws Exception {
        for (Line line : lines) {
            fu.writeLine(line);
            logger.debug("Wrote line " + line.toString());
        }
        return RepeatStatus.FINISHED;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        fu.closeWriter();
        logger.debug("Lines Writer ended.");
        return ExitStatus.COMPLETED;
    }
}
```

Chúng ta đã hoàn thành việc triển khai **job** của mình! Hãy tạo đoạn **test** để chạy nó và xem kết quả.

### **4.7. Chạy job**[](#tasklets-running)

Để **execute** job, chúng ta sẽ tạo một đoạn test: (Cài này cũng giải thích cho một số bạn hay hỏi mình là làm cách nào để Debug Batch)

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TaskletsConfig.class)
public class TaskletsTest {

    @Autowired 
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Test
    public void givenTaskletsJob_whenJobEnds_thenStatusCompleted()
      throws Exception {
 
        JobExecution jobExecution = jobLauncherTestUtils.launchJob();
        assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus());
    }
}
```

_Chú thích: **ContextConfiguration**_ đang trỏ đến lớp cấu hình **contexts Spring**, có định nghĩa **job** của chúng ta.

Chúng ta sẽ cần thêm một vài Bean để bổ sung trước khi chạy Test:

```java
@Bean
public JobLauncherTestUtils jobLauncherTestUtils() {
    return new JobLauncherTestUtils();
}

@Bean
public JobRepository jobRepository() throws Exception {
    JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
    factory.setDataSource(dataSource());
    factory.setTransactionManager(transactionManager());
    return factory.getObject();
}

@Bean
public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("org.sqlite.JDBC");
    dataSource.setUrl("jdbc:sqlite:repository.sqlite");
    return dataSource;
}

@Bean
public PlatformTransactionManager transactionManager() {
    return new ResourcelessTransactionManager();
}

@Bean
public JobLauncher jobLauncher() throws Exception {
    SimpleJobLauncher jobLauncher = new SimpleJobLauncher();
    jobLauncher.setJobRepository(jobRepository());
    return jobLauncher;
}
```

Mọi thứ đã sẵn sàng! Hãy thử run Test nào!

Sau khi job kết thúc, _**output.csv**_ có nội dung dự kiến ​​và các **console** hiển thị luồng đã thực thi:

```java
[main] DEBUG o.b.t.tasklets.LinesReader - Lines Reader initialized.
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Mae Hodges,10/22/1972]
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Gary Potter,02/22/1953]
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Betty Wise,02/17/1968]
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Wayne Rose,04/06/1977]
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Adam Caldwell,09/27/1995]
[main] DEBUG o.b.t.tasklets.LinesReader - Read line: [Lucille Phillips,05/14/1992]
[main] DEBUG o.b.t.tasklets.LinesReader - Lines Reader ended.
[main] DEBUG o.b.t.tasklets.LinesProcessor - Lines Processor initialized.
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 45 for line [Mae Hodges,10/22/1972]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 64 for line [Gary Potter,02/22/1953]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 49 for line [Betty Wise,02/17/1968]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 40 for line [Wayne Rose,04/06/1977]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 22 for line [Adam Caldwell,09/27/1995]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Calculated age 25 for line [Lucille Phillips,05/14/1992]
[main] DEBUG o.b.t.tasklets.LinesProcessor - Lines Processor ended.
[main] DEBUG o.b.t.tasklets.LinesWriter - Lines Writer initialized.
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Mae Hodges,10/22/1972,45]
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Gary Potter,02/22/1953,64]
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Betty Wise,02/17/1968,49]
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Wayne Rose,04/06/1977,40]
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Adam Caldwell,09/27/1995,22]
[main] DEBUG o.b.t.tasklets.LinesWriter - Wrote line [Lucille Phillips,05/14/1992,25]
[main] DEBUG o.b.t.tasklets.LinesWriter - Lines Writer ended.
```

Ok xong việc với **Tasklets**. Bây giờ chúng ta có thể chuyển sang cách tiếp cận khác đó là **Chunks**.

**5** **. Chunks**[](#chunks)
-----------------------------

### **5.1. Giới thiệu và thiết kế**[](#chunks-design)

Dịch thô từ Chunks là các bạn đã biết, chunks là **thực hiện các hành động trên từng phần của dữ liệu** . Nghĩa là, thay vì đọc, xử lý và ghi tất cả các dòng cùng một lúc, nó sẽ đọc, xử lý và ghi một lượng record cố định (**chunk**) tại một thời điểm xác định.

Sau đó, nó sẽ lặp lại chu kỳ cho đến khi không còn dữ liệu nào trong tệp.

Do đó, luồng của **Chunks** sẽ hơi khác một chút:

Chúng ta cũng cần tạo **ba class Bean cho cách tiếp cận theo định hướng Chunks (_phân đoạn_)**:

```java
public class LineReader {
    // ...
}

public class LineProcessor {
   // ...
}

public class LinesWriter {
   // ...
}
```

Trước khi chuyển sang phần triển khai, hãy cấu hình job trước đã nhé.

### **5.2. Cấu hình**[](#chunks-configuration)

Định nghĩa **job của chunks** cũng sẽ khác:

```java
@Configuration
@EnableBatchProcessing
public class ChunksConfig {

    @Autowired 
    private JobBuilderFactory jobs;

    @Autowired 
    private StepBuilderFactory steps;

    @Bean
    public ItemReader<Line> itemReader() {
        return new LineReader();
    }

    @Bean
    public ItemProcessor<Line, Line> itemProcessor() {
        return new LineProcessor();
    }

    @Bean
    public ItemWriter<Line> itemWriter() {
        return new LinesWriter();
    }

    @Bean
    protected Step processLines(ItemReader<Line> reader,
      ItemProcessor<Line, Line> processor, ItemWriter<Line> writer) {
        return steps.get("processLines").<Line, Line> chunk(2)
          .reader(reader)
          .processor(processor)
          .writer(writer)
          .build();
    }

    @Bean
    public Job job() {
        return jobs
          .get("chunksJob")
          .start(processLines(itemReader(), itemProcessor(), itemWriter()))
          .build();
    }

}
```

Trong trường hợp này, chỉ có một bước thực hiện duy nhất một đó là một **tasklet**.

Tuy nhiên, **tasklet** đó **xác định một trình đọc, một trình ghi và một bộ xử lý sẽ hoạt động trên các phần dữ liệu**.

Lưu ý rằng **khoảng thời gian cam kết cho biết rằng lượng dữ liệu sẽ được xử lý trong Chunks**. Job của chúng ta sẽ đọc, xử lý và viết hai dòng cùng một lúc.

Bây giờ chúng ta đã sẵn sàng để thêm logic vào

### **5.3. _LineReader_**[](#chunks-lineReader)

_LineReader_ sẽ phụ trách việc đọc một **record** và trả về một instance _**Line**_ với nội dung của nó.

Để trở thành **Reader** thì lớp của chúng ta phải **implement interface** _ItemReader_ :

```java
public class LineReader implements ItemReader<Line> {
    @Override
    public Line read() throws Exception {
        Line line = fu.readLine();
        if (line != null) 
          logger.debug("Read line: " + line.toString());
        return line;
    }
}
```

Code rất đơn giản, nó chỉ đọc một dòng và trả về. Chúng ta cũng sẽ triển khai _StepExecutionListener_ cho phiên bản cuối cùng của lớp này:

```java
public class LineReader implements 
  ItemReader<Line>, StepExecutionListener {

    private final Logger logger = LoggerFactory
      .getLogger(LineReader.class);
 
    private FileUtils fu;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        fu = new FileUtils("taskletsvschunks/input/tasklets-vs-chunks.csv");
        logger.debug("Line Reader initialized.");
    }

    @Override
    public Line read() throws Exception {
        Line line = fu.readLine();
        if (line != null) logger.debug("Read line: " + line.toString());
        return line;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        fu.closeReader();
        logger.debug("Line Reader ended.");
        return ExitStatus.COMPLETED;
    }
}
```

Cần lưu ý rằng _**beforeStep**_ và _**afterStep** lần lượt_ thực thi trước và sau toàn bộ các bước (**step**).

### **5.4. _LineProcessor_**[](#chunks-lineProcessor)

_LineProcessor_ tuân theo logic tương tự như _LineReader_ .

Tuy nhiên, trong trường hợp này, chúng ta sẽ **implement** _ItemProcessor_ và hàm _process__()_ :

```java
public class LineProcessor implements ItemProcessor<Line, Line> {

    private Logger logger = LoggerFactory.getLogger(LineProcessor.class);

    @Override
    public Line process(Line line) throws Exception {
        long age = ChronoUnit.YEARS
          .between(line.getDob(), LocalDate.now());
        logger.debug("Calculated age " + age + " for line " + line.toString());
        line.setAge(age);
        return line;
    }
}
```

**Hàm _process()_ nhận một dòng đầu vào, xử lý nó và trả về một dòng đầu ra**. Một lần nữa, chúng ta cũng sẽ implement  StepExecutionListener:

```java
public class LineProcessor implements 
  ItemProcessor<Line, Line>, StepExecutionListener {

    private Logger logger = LoggerFactory.getLogger(LineProcessor.class);

    @Override
    public void beforeStep(StepExecution stepExecution) {
        logger.debug("Line Processor initialized.");
    }
    
    @Override
    public Line process(Line line) throws Exception {
        long age = ChronoUnit.YEARS
          .between(line.getDob(), LocalDate.now());
        logger.debug(
          "Calculated age " + age + " for line " + line.toString());
        line.setAge(age);
        return line;
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        logger.debug("Line Processor ended.");
        return ExitStatus.COMPLETED;
    }
}
```

### **5.5. _LinesWriter_**[](#chunks-linesWriter)

Không giống như trình đọc và trình xử lý, **_LinesWriter_ sẽ viết toàn bộ các dòng** nó nhận được_:_

```java
public class LinesWriter implements 
  ItemWriter<Line>, StepExecutionListener {

    private final Logger logger = LoggerFactory
      .getLogger(LinesWriter.class);
 
    private FileUtils fu;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        fu = new FileUtils("output.csv");
        logger.debug("Line Writer initialized.");
    }

    @Override
    public void write(List<? extends Line> lines) throws Exception {
        for (Line line : lines) {
            fu.writeLine(line);
            logger.debug("Wrote line " + line.toString());
        }
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        fu.closeWriter();
        logger.debug("Line Writer ended.");
        return ExitStatus.COMPLETED;
    }
}
```

Nhìn vào _Code LinesWriter_ bạn sẽ thấy điều đó. Và một lần nữa, chúng ta đã sẵn sàng để **test job** của mình.

### **5.6. Run Job**[](#chunks-running)

Chúng ta sẽ tạo một đoạn test mới, giống như đoạn test mà phần trước chúng ta đã tạo cho cách tiếp cận theo hướng **tasklets**:

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ChunksConfig.class)
public class ChunksTest {

    @Autowired
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Test
    public void givenChunksJob_whenJobEnds_thenStatusCompleted() 
      throws Exception {
 
        JobExecution jobExecution = jobLauncherTestUtils.launchJob();
 
        assertEquals(ExitStatus.COMPLETED, jobExecution.getExitStatus()); 
    }
}
```

Sau khi cấu hình _ChunksConfig_ như đã giải thích ở trên cho _TaskletsConfig_, chúng ta đã sẵn sàng để chạy test!

Sau khi hoàn thành job, chúng ta có thể thấy rằng _output.csv lại_ chứa kết quả như mong đợi và **console** mô tả luồng đã :

```cmd
[main] DEBUG o.b.t.chunks.LineReader - Line Reader initialized.
[main] DEBUG o.b.t.chunks.LinesWriter - Line Writer initialized.
[main] DEBUG o.b.t.chunks.LineProcessor - Line Processor initialized.
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Mae Hodges,10/22/1972]
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Gary Potter,02/22/1953]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 45 for line [Mae Hodges,10/22/1972]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 64 for line [Gary Potter,02/22/1953]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Mae Hodges,10/22/1972,45]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Gary Potter,02/22/1953,64]
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Betty Wise,02/17/1968]
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Wayne Rose,04/06/1977]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 49 for line [Betty Wise,02/17/1968]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 40 for line [Wayne Rose,04/06/1977]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Betty Wise,02/17/1968,49]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Wayne Rose,04/06/1977,40]
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Adam Caldwell,09/27/1995]
[main] DEBUG o.b.t.chunks.LineReader - Read line: [Lucille Phillips,05/14/1992]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 22 for line [Adam Caldwell,09/27/1995]
[main] DEBUG o.b.t.chunks.LineProcessor - Calculated age 25 for line [Lucille Phillips,05/14/1992]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Adam Caldwell,09/27/1995,22]
[main] DEBUG o.b.t.chunks.LinesWriter - Wrote line [Lucille Phillips,05/14/1992,25]
[main] DEBUG o.b.t.chunks.LineProcessor - Line Processor ended.
[main] DEBUG o.b.t.chunks.LinesWriter - Line Writer ended.
[main] DEBUG o.b.t.chunks.LineReader - Line Reader ended.
```

**Chúng ta có cùng một kết quả với 2 cách tiếp cận khác nhau Tasklets và Chunks**. Chúng ta cũng đã **ghi log** thể hiện rõ ràng cách thực hiện **job** theo cách tiếp cận này.

**6\. Kết luận**[](#conclusion)
-------------------------------

Các **ngữ cảnh** khác nhau sẽ cho thấy sự cần thiết của cách tiếp cận này hay cách tiếp cận khác là phù hợp hơn. **Trong khi Tasklet thì tự nhiên hơn đối với các tình huống 'hết nhiệm vụ này đến nhiệm vụ khác', thì Chunks cung cấp một giải pháp đơn giản để đối phó với các lần đọc được phân trang hoặc các tình huống mà chúng ta không muốn giữ một lượng lớn dữ liệu trong bộ nhớ.**

[_Source tham khảo_](https://github.com/eugenp/tutorials/tree/master/spring-batch)

Spring bottom

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog19-java-spring-batch-phan-biet-giua.html