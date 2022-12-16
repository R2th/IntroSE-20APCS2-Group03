Xin chào tất cả mọi người hôm nay mình muốn chia sẻ với mọi người lộ trình tự học Spring Framework từ cơ bản đến nâng cao. Chắc chắn lộ trình cũng chỉ là tương đối một khung sườn cho các bạn mới tiếp cận thôi nhé mọi người cứ góp ý thoải mái chắc chắn sẽ đống góp để bộ khung này trở nên hoàn thiện và trọn vẹn hơn cho các bạn sau này tìm kiếm và dễ định hướng hơn.

<strong>1. <strong>IOC và DI</strong></strong>, <strong>Bean, Scope, Factory trong Spring</strong><br><strong>2. Spring AOP, Spring Core</strong><br><strong>3. Cấu hình tự động của ứng dụng Spring Boot</strong><br><strong>4. Các anotation căn bản</strong><br>- @SpringBootApplication<br>- @Component<br>- @Controller, @RestController, @ResponseBody<br>- @Service<br>- @Repository- @ComponentScan- @Configuration<br>- @Bean, @Conditional, @Lazy, @Primary, @Qualifier, @DependsOn<br>- @Autowired<br>- @Value<br>- @Transactional, @Query, @Modifying<br>- @RequestParam, @RequestBody, @PathVariable, @RequestHeader<br>- @RequestMapping, @PostMapping, @GetMapping, @PutMapping, @DeleteMapping<br>- Các annotation dùng để kiểm tra dữ liệu @Valid, @NotNull, @Nullable, @Length,...<br><strong>5. Cấu hình biến môi trường, các thuộc tính trong ứng dụng Spring</strong><br>- application.properties<br>- application.yml<br><strong>6. Cấu hình profiles cho ứng dụng Spring Boot</strong><br>- Dev, Test, Prod<br><strong>7. Mô hình lớp trong Spring Boot</strong><br>- Lớp Controller<br>- Lớp Service (Business Logic)<br>- Lớp Repository (Persistence)<br><strong>8. Xây dựng Interface và mô hình đa kế thừa Service</strong><br><strong>9. Giao tiếp với cơ sở dữ liệu SQL</strong><br>- Hibernate<br>- JPA<br>- Hiểu về mapping entity với table trong cơ sở dữ liệu<br><strong>10. Giao tiếp với cơ sở dữ liệu NoSQL</strong><br>- Sử dụng Template<br>- Custom Document<br><strong>11. Các xử lý nâng cao trong giao tiếp cơ sở dữ liệu</strong><br>- Criteria và Query Builder<br>- Phân trang<br>- Sort nhiều điều kiện<br>- Specification<br>- Native query và sử dụng template
<br><strong>12. Xử lý lỗi trong ứng dụng và cách trả lỗi về Client</strong><br>- Exception Handler<br>- Trả về lỗi theo HttpStatus<br>- Trả về lỗi theo Custom Status<br><strong>13. Cấu hình nhiều DataSource</strong><br><strong>14. Xử lý sự kiện và bất đồng bộ</strong><br>- EventListener<br>- Async<br><strong>15. Chạy lịch schedule và khái niệm executor pool trong Spring</strong><br><strong>16. Microservices trong Spring</strong><br><strong>17. Tìm hiểu Maven trong single Service và Microservices</strong><br><strong>18. Giao tiếp giữa các service qua HTTP</strong><br><strong>19. Giao tiếp giữa các service qua Eureka</strong><br>- Server Eureka<br>- Server Discovery<br>- Spring Actuator cho việc audit hệ thống và các service con bên trong<br><strong>20. Tìm hiểu hệ thống Message Queue</strong><br><strong>21. Giao tiếp giữa các service thông qua Message Queue</strong><br><strong>22. Tìm hiểu về SSE, WebSocket, polling</strong><br><strong>23. Tìm hiểu Kafka</strong><br>- Sau khi có khái niệm về SSE và Kafka chúng ta có thể dựng hệ thống push notification không cần sử dụng đến các bên thứ 3 hỗ trợ như Firebase, Parse Server<br><strong>24. Tìm hiểu SocketIO</strong><br><strong>25. Tìm hiểu về WebFlux</strong><br><strong>26. Tìm hiểu về RxJava</strong><br><strong>27. Tìm hiểu nâng cao về cơ chế bất đồng bộ và API bất đồng bộ</strong><br><strong>28. Tìm hiểu Filter, Filterchain, CORS, Request, Response, Session, CSRF</strong><br><strong>29. Học về Spring Security</strong><br><strong>30. Hệ thống xác thực căn bản</strong><br><strong>31. Hệ thống xác thực nâng cao Spring OAuth2 (Token Store + JWT + Third Party)</strong><br><strong>32. Khái niệm API Gateway</strong><br><strong>33. Chi tiết API Gateway hỗ trợ sẵn của Spring Boot</strong><br><strong>34. Tìm hiểu Open Source Kong API Gateway</strong><br><strong>35. Cấu hình ghi log trong Spring Boot</strong><br>- Ghi log vào file<br>- Ghi log vào database<br>- Tự cấu hình log cho hệ thống, ghi vào service log<br><strong>36. Thao tác với báo cáo <strong>JasperReport</strong> trong Spring Boot</strong><br><strong>37. Thao tác với File, Multipart trong Spring Boot</strong><br><strong>38. Các anotation nâng cao</strong><br>- @PostConstruct, @PreDestroy<br>- @PropertySource<br>- @CrossOrigin<br>- @ExceptionHandler<br>- @InitBinder- @ControllerAdvice<br>- @EnableDiscoveryClient, @EnableEurekaServer, @EnableConfigServer<br>- @Cacheable<br>- @Async<br>- @BeforeTransaction, @AfterTransaction<br>- @MockBean, @JsonTest, @TestPropertySource<br><strong>39. Tự custom anotation</strong> <strong>trong ứng dụng</strong><br>- Kết hợp với AOP để xây dựng bộ khung quản lý luồng chạy ứng dụng Spring Boot như trước khi vào Controller kiểm tra RequestBody, sau khi return value xử lý log,...<br><strong>40. Cache dữ liệu với Memory, Redis</strong><br><strong>41. Xây dựng Dockerfile cho ứng dụng Spring Boot</strong><br><strong>42. Xây dựng docker-compose cho ứng dụng Spring Boot</strong><br><strong>43. Deploy microservices trên Docker</strong><br><strong>44. CI-CD với Jenkins cho ứng dụng Spring Boot</strong><br><strong>45. Cấu hình Nginx cho việc gọi API tới Spring Boot</strong><br><strong>46. Cấu hình Nginx cho việc gọi tới Microservices</strong><br><strong>47. Cấu hình security cho Nginx</strong><br><strong>48. Tự động hóa ứng dụng</strong><br>- Tạo schedule động với việc tạo 1 bean Autowired động và hệ thống quản lý job từ cơ sở dữ liệu<br>- Khởi động ứng dụng Spring Boot dynamic không cần phải stop và restart gói build war hoặc jar<br>- ... (đa phần sẽ là kinh nghiệm đúc kết từ quá trình làm việc)<br><strong>49. Swagger cho ứng dụng</strong><br>- Spring OpenAPI<br>- Springfox Swagger<br><strong>50. Testing cho ứng dụng</strong><br><strong>51. Load balancer cho ứng dụng</strong><br><strong>52. Design Pattern cho ứng dụng</strong><br><strong>53. Code Clean cho ứng dụng</strong>

<p class="has-text-align-justify">Cảm ơn mọi người đã theo dõi góc nhỏ xíu này của mình nơi mình muốn chia sẻ chút kiến thức mình tự học, được học ở trường, học ở công ty cho tất cả mọi người có đam mê trên con đường trở thành một kỹ sư phần mềm nhé ^^ </p>

Note link bài viết trên blog của mình: [https://gociter.wordpress.com/2020/09/14/lo-trinh-hoc-spring-framework-tu-co-ban-den-nang-cao/](https://gociter.wordpress.com/2020/09/14/lo-trinh-hoc-spring-framework-tu-co-ban-den-nang-cao/)