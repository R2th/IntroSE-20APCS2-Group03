Web service nó là một khái niệm rộng hơn so với khái niệm web thông thường, nó cung cấp các thông tin thô, và khó hiểu với đa số người dùng, chính vì vậy nó được sử dụng bởi các ứng dụng. Các ứng dụng này sẽ chế biến các dữ liệu thô trước khi trả về cho người dùng cuối cùng. Hiện nay web service đang khá nổi bật với các ưu điểm:
* Web service cung cấp nền tảng rộng lớn chạy được trên các hệ điều hành khác nhau
* Năng cao khả năng tái sử dụng
* Tạo mối quan hệ tương tác lẫn nhau, dễ dàng cho việc phát triển các ứng dụng phân tán.
* Thúc đẩy mạnh mẽ vào hệ thống tích hợp và giảm được sự phức tạp của hệ thống, giảm giá thành phần tương tác tốt với hệ thống doanh nghiệp.
* Sử dụng các giao thức và chuẩn mở, giao thức và định dạng dữ liệu dựa trên văn bản giúp các lập trình viên dễ dàng hiểu được.

![](https://images.viblo.asia/2df442db-7422-4c49-9ff0-e78976af542c.png)

Bên cạnh đấy việc viết Unit Test cho nó cũng rất cần thiết,  JUnit, Mockito and Spring Test (MockMVC) là một phương pháp kiểm thử phần mềm để kiểm tra các đơn vị mã nguồn riêng lẻ. Mỗi UT có thể chứa dữ liệu giả định khác nhau để xác thực kịch bản khác nhau. Mockito là một khung mô phỏng tuyệt vời mà chúng tôi sẽ sử dụng để cung cấp dữ liệu cho các bài kiểm tra JUnit. JUnit là khung kiểm tra đơn vị phổ biến nhất.

## 1. Maven Dependencies
Thực hiện config dependencies cho project của bạn.
```
      <dependency>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-all</artifactId>
            <version>1.3</version>
            <scope>test</scope>
        </dependency>
```
**org.hamcrest: hamcrest:**  sử dụng hamcrest để tiếp nhận các phản hồi. Chúng ta có thể sử dụng nhiều Matchers so khớp để xác thực nếu phản hồi là những gì mong đợi.

```
 <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
            <scope>test</scope>
        </dependency>
```
**org.springframework:spring-test:** chứa MockMvc và các lớp kiểm tra khác mà chúng ta có thể sử dụng để thực hiện và xác nhận các yêu cầu trên một điểm cuối cụ thể.

```
       <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-core</artifactId>
            <version>1.10.19</version>
            <exclusions>
                <exclusion>
                    <groupId>org.hamcrest</groupId>
                    <artifactId>hamcrest-core</artifactId>
                </exclusion>
            </exclusions>
            <scope>test</scope>
        </dependency>
```
**org.mockito:mockito-core:** mocking framework để thực hiện mocking daiện

```
<dependency>
            <groupId>com.jayway.jsonpath</groupId>
            <artifactId>json-path-assert</artifactId>
            <version>2.2.0</version>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.hamcrest</groupId>
                    <artifactId>hamcrest-core</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-api</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```
**com.jayway.jsonpath:** json-path-assert Sử dụng jsonPath () chúng ta có thể truy cập các xác nhận cơ thể phản hồi, để kiểm tra một tập hợp con cụ thể của cơ thể. Chúng ta có thể sử dụng hamcrest Matchers để khẳng định giá trị tìm thấy tại đường dẫn JSON.

## 2. Configuring Mockito và MockMvc
Với annotating @Mock chú thích việc giải lập data tầng service CandidateService, chúng tôi có thể trả về dữ liệu giả định khi chúng tôi gọi một phương thức từ dịch vụ này. Sử dụng chú thích @InjectMocks, chúng ta có thể tiêm dịch vụ giả định bên trong CandidateController của mình. Trước mỗi bài kiểm tra, chúng tôi phải khởi tạo các giả định này bằng cách sử dụng MockitoAnnotations # initMocks (cái này).

MockMvc được khởi tạo bằng phương thức MockMvcBuilders # standaloneetup (...). Build (). Tùy chọn chúng ta có thể thêm các bộ lọc, bộ chặn hoặc vv bằng cách sử dụng các phương thức .addFilter () hoặc .addInterceptor ().

```
public class CandidateControllerUnitTest {

    private MockMvc mockMvc;

    @Mock
    private CandidateService candidateService;

    @InjectMocks
    private CandidateController candidateController;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(candidateController)
                .addFilters(new CORSFilter())
                .build();
    }

```

* MockMvc là điểm vào chính cho hỗ trợ kiểm tra Spring MVC phía máy chủ. Thực hiện một yêu cầu và trả về một loại cho phép xâu chuỗi các hành động tiếp theo, chẳng hạn như khẳng định kỳ vọng, về kết quả.
* @Mock tạo một mock. Điều này cũng có thể đạt được bằng cách sử dụng method org.mockito.mock (..).
* @InjectMocks injects mock or spy fields vào các đối tượng được kiểm tra tự động.
* MockitoAnnotations.initMocks(this) khởi tạo các trường được chú thích bằng chú thích Mockito.
* MockMvcBuilders.standaloneSetup(..).build() xây dựng một cá thể MockMvc bằng cách đăng ký một hoặc nhiều phiên bản @Controller và cấu hình cơ sở hạ tầng Spring MVC theo lập trình.

Lưu ý: Khi thực hiện addFilters cần config CORS để thực hiện tương tác giữa client và server.
```
public class CORSFilter extends OncePerRequestFilter {

    private final Logger LOG = LoggerFactory.getLogger(CORSFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        LOG.info("Adding CORS Headers ........................");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Max-Age", "3600");
        chain.doFilter(req, res);
    }
}
```

* Trong trường hợp thông thường, Access-Control-Allow-Origin sẽ có giá trị giống như Origin, một số trường hợp giá trị của Access-Control-Allow-Origin sẽ nhìn giống giống như Regex hay chỉ đơn giản là *, tuy nhiên thì cách dùng * thường được coi là không an toàn, ngoại trừ trường hợp API của bạn được public hoàn toàn và ai cũng có thể truy cập được.
* Access-Control-Allow-Methods: mô tả những method nào client có thể gửi đi.
* Access-Control-Max-Age: mô tả thời gian hợp lệ của preflight request, nếu quá hạn, browser sẽ tự tạo một preflight request mới.

## 3. GET Unit Test
```
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final Logger LOG = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> getAll() {
        List<Candidate> candidates = candidateService.getAll();

        if (candidates == null || candidates.isEmpty()){
            LOG.info("no candidates found");
            return new ResponseEntity<List<Candidate>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }
```

Controller CandidateController thực hiện get all candidate, thực hiện viết test cho method GET:
```
 @Test
    public void test_get_all_success() throws Exception {
        List<Candidate> candidates = Arrays.asList(
                new Candidate(1, "HieuPV"),
                new Candidate(2, "HieuTM"),
                new Candidate(3, "TamCT"));

        when(candidateService.getAll()).thenReturn(candidates);

        mockMvc.perform(get("/candidates"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].username", is("HieuPV")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].username", is("HieuTM")))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].username", is("TamCT")));

        verify(candidateService, times(1)).getAll();
        verifyNoMoreInteractions(candidateService);
    }
```
* Verify HTTP status code là 200 (OK).
* Verify content-type của response là application/json và  bộ ký tự của nó là UTF-8.
* Verify các thuộc tính id và tên người dùng bằng với dữ liệu thử nghiệm giả.
* Verify phương thức findById () của UserService được gọi chính xác một lần.
* Verify sau phản hồi, không có thêm tương tác nào được thực hiện cho candidateService (verify(candidateService, times(1)).getAll())
* Verify nếu bất kỳ giả định nhất định có bất kỳ tương tác chưa được xác minh (verifyNoMoreInteractions(candidateService)).

## 4. GET Unit Test với PathVariable: get by id
```
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final Logger LOG = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;
    
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<Candidate> get(@PathVariable("id") int id){
        Candidate candidate = candidateService.findById(id);
        if (candidate == null){
            return new ResponseEntity<Candidate>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
    }
```

Controller CandidateController thực hiện get by id candidate, thực hiện viết test cho method GET:
```
 @Test
    public void test_get_by_id_success() throws Exception {
        Candidate candidate = new Candidate(1, "HieuPV");

        when(candidateService.findById(1)).thenReturn(candidate);

        mockMvc.perform(get("/candidates/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.username", is("HieuPV")));

        verify(candidateService, times(1)).findById(1);
        verifyNoMoreInteractions(candidateService);
    }
```

* **mockMvc.perform(get("/candidates/{id}", 1))** thiết lập giả lập cho path candidates/1.

```
    when(candidateService.findById(1)).thenReturn(null);
    mockMvc.perform(get("/candidates/{id}", 1)).andExpect(status().isNotFound());
```
Check NotFound khi không có data.

## 5. POST Unit Test
```
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final Logger LOG = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> create(@RequestBody Candidate candidate, UriComponentsBuilder ucBuilder){
        if (candidateService.exists(candidate)){
            LOG.info("a candidate with name " + candidate.getUsername() + " already exists");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        candidateService.create(candidate);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/candidates/{id}").buildAndExpand(candidate.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
```

Controller CandidateController thực hiện tạo mới candidate, thực hiện viết test cho method POST:
```
  @Test
    public void test_create_candidate_success() throws Exception {
        Candidate candidate = new Candidate("TamNT");

        when(candidateService.exists(candidate)).thenReturn(false);
        doNothing().when(candidateService).create(candidate);

        mockMvc.perform(
                post("/candidates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(candidate)))
                .andExpect(status().isCreated())
                .andExpect(header().string("location", containsString("http://localhost/candidates/")));

        verify(candidateService, times(1)).exists(candidate);
        verifyNoMoreInteractions(candidateService);
    }
```

* Verify mã trạng thái HTTP là 201 (CREATED).
* Verify location header được đặt với đường dẫn đến tài nguyên đã tạo.
* Verify các phương thức exists() và create() của CandidateService được gọi chính xác một lần.
* Verify sau phản hồi, không có thêm tương tác nào được thực hiện cho CandidateService

## 6. PUT Unit Test
```
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final Logger LOG = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;
    
   @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateCandidate(@PathVariable int id, @RequestBody Candidate candidate){
        Candidate candidateSytem = candidateService.findById(id);

        if (candidateSytem == null){
            return new ResponseEntity<Candidate>(HttpStatus.NOT_FOUND);
        }

        candidateSytem.setId(candidate.getId());
        candidateSytem.setUsername(candidate.getUsername());

        candidateService.update(candidateSytem);
        return new ResponseEntity<Candidate>(candidateSytem, HttpStatus.OK);
    }
```

Controller CandidateController thực hiện update candidate, thực hiện viết test cho method PUT:
```
@Test
public void test_update_candidate_success() throws Exception {
    Candidate candidate = new Candidate(1, "HieuPV");
    when(candidateService.findById(candidate.getId())).thenReturn(candidate);
    doNothing().when(candidateService).update(candidate);
    mockMvc.perform(
            put("/candidates/{id}", candidate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(asJsonString(candidate)))
            .andExpect(status().isOk());
    verify(candidateService, times(1)).findById(candidate.getId());
    verify(candidateService, times(1)).update(candidate);
    verifyNoMoreInteractions(candidateService);
}
```

* Verify mã trạng thái HTTP là 200 (CREATED).
* Verify các phương thức findById() và update() của candidateService được gọi chính xác một lần.
* Verify sau phản hồi, không có thêm tương tác nào được thực hiện cho CandidateService

## 7. DELETE Unit Test
```
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final Logger LOG = LoggerFactory.getLogger(CandidateController.class);

    @Autowired
    private CandidateService candidateService;
    
   @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("id") int id){
        Candidate candidate = candidateService.findById(id);

        if (candidate == null){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        candidateService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
```

Controller CandidateController thực hiện delete candidate, thực hiện viết test cho method DELETE:
```
@Test
public void test_delete_user_success() throws Exception {
    Candidate candidate = new Candidate(4, "TamNT");
    when(candidateService.findById(candidate.getId())).thenReturn(candidate);
    doNothing().when(candidateService).delete(candidate.getId());
    mockMvc.perform(
            delete("/candidates/{id}", candidate.getId()))
            .andExpect(status().isOk());
    verify(candidateService, times(1)).findById(candidate.getId());
    verify(candidateService, times(1)).delete(candidate.getId());
    verifyNoMoreInteractions(candidateService);
}
```

* Verify mã trạng thái HTTP là 200 (CREATED).
* Verify các phương thức findById() và delete() của candidateService được gọi chính xác một lần.
* Verify sau phản hồi, không có thêm tương tác nào được thực hiện cho CandidateService

Link tham khảo: https://memorynotfound.com/unit-test-spring-mvc-rest-service-junit-mockito/