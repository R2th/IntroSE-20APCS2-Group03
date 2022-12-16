# 1. Tổng quan

Ngày nay, các components của FE và BE thường tách biệt hoàn toàn trên một ứng dụng web. Thông thường, chúng ta sẽ để API như một BE components để cho FE components hoặc các bên thứ 3 có thể tương tác. 

Trong trường hợp như thế, chúng ta sẽ cần phải có các thông số kỹ thuật phù hợp cho các API, đồng thoi tài liệu API phải đầy đủ, dễ đọc và dễ theo dõi. Hơn nữa, tài liệu phải mô tả đựoc hết tất cả những thay đổi mới nhất của API. Thực hiện việc này một cách thủ công sẽ vô cùng tẻ nhạt vì vậy việc tự động quá quy trình là điều rất cần thiết.

Trong bài viết này, chúng ta sẽ xem xét đến Swagger 2 và sử dụng Springfox để triển khai đặc tả của Swagger 2.

# 2. Project

Phần tạo REST service sẽ không được đề cập đến trong bài viết này. Nếu bạn đã có một project thích hợp thì hãy sử dụng nó. Còn không thì project trong các link sau sẽ là sự lựa chọn tốt để bắt đầu:
- [REST API với Spring 4 và Java config](https://www.baeldung.com/building-a-restful-web-service-with-spring-and-java-based-configuration)
- [RESTful web service](https://spring.io/guides/gs/rest-service/)

# 3. Thêm depndency Maven

Như đã đề cập ở trên, chúng ta sẽ sử dụng Springfox để triển khai Swagger. Phiên bản mới nhất có thê rtimf thấy ở [đây](https://search.maven.org/classic/#search%7Cga%7C1%7C%22Springfox%20Swagger2%22)

Để thêm nó vào Maven project của chúng ta. ta cần thêm depndency vào file pom.xml:

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>3.0.0</version>
</dependency>
```

## 3.1. Spring boot depndency

Đối với project loại Spring Boot ta chỉ cần thêm duy nhất depndency springfox-boot-starter là đủ:

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

Chúng ta có thể thêm các starter khác nếu cần.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.0</version>
</dependency>
```

# 4. Tích hợp Swagger 2 vào project

## 4.1. Configuration Java

Phần configuration của Swagger chủ yếu nằm ở xung quanh Docket bean:

```
@Configuration
public class SpringFoxConfig {                                    
    @Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)  
          .select()                                  
          .apis(RequestHandlerSelectors.any())              
          .paths(PathSelectors.any())                          
          .build();                                           
    }
}
```

Sau khi xác định Docket bean. Hàm select() của nó sẽ trả về một instance của ApiSelectorBuilder thứ sẽ cung cấp cách để kiểm soát các endpoint mà Swagger tương tác.

Chúng ta có thể cài đặt để chọn RequestHandlers với sự giúp đỡ từ RequestHandlerSelectors và PathSelectors. Sử dụng any() cho cả 2 sẽ tạo documentation cho toàn bộ API  khả dụng thông qua Swagger.

## 4.2. Configuration khi không có Spring Boot

Trong các project Spring đơn giản, ta cần kích hoạt Swagger 2 một các rõ ràng hơn. Để làm thế, ta phải dùng @EnableSwagger2WebMvc trong class configuration của chúng ta

```
@Configuration
@EnableSwagger2WebMvc
public class SpringFoxConfig {                                    
}
```

Ngoài ra, khi không có Spring Boot, ta sẽ không có những phần auto-configuration cho các trình sử lý resource. Swagger UI thêm vào một bộ resources mà chúng ta phải configure như một phần của class mở rộng WebMvcConfigurerAdapter và được chú thích với @EnableWebMvc:

```
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("swagger-ui.html")
      .addResourceLocations("classpath:/META-INF/resources/");

    registry.addResourceHandler("/webjars/**")
      .addResourceLocations("classpath:/META-INF/resources/webjars/");
}
```

## 4.3. Xác minh

Để xác minh xem Springfox có hoạt động hay không, ta cần truy cập vào URL sau:
http://localhost:8080/spring-security-rest/api/v2/api-docs

Kết quả sẽ là một JSON response với một số lượng lớn các cặp key-value, thứ mà không hề dễ dàng để đọc hiểu. May thay chúng ta có Swagger UI để sử lý vấn đề này.

# 5. Swagger UI

Swagger UI là một giải pháp giúp sự tuơng tác của user với tài liệu của Swagger-generated API một cách dễ dàng hơn.

## 5.1. Kích hoạt Springfox's Swagger UI

Để sử dụng Swagger UI, ta cần thêm phần dependency Maven:

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
```

Bây giờ ta có thể test bằng cách truy cập URL sau:
http://localhost:8080/your-app-root/swagger-ui/

Trong trường hợp của chúng ta, URL chính xác sẽ là:
http://localhost:8080/spring-security-rest/api/swagger-ui/

Kết quả nhận được sẽ tuơng tự như sau:

![image.png](https://images.viblo.asia/aefb632b-9f0e-49ef-8024-d4fb67a9c875.png)

## 5.2. Khám phá Swagger Documentation

Bên trong response của Swagger là một danh sách các controller đựoc định nghĩa trong ứng dụng của chúng ta. Click vào bất kỳ controller nào sẽ liệt kê ra cho chúng ta HTTP method khả dụng của nó (DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT)

Nhấn mở rộng mỗi method sẽ cung cấp thêm những thông tin hữu dụng khác như là status của response, content-type, danh sách param. Ngoài ra còn có thể sử dụng thử các method này bằng UI của Swagger.

Khả năng đồng bộ hóa của Swagger với base code của chúng ta là rất quan trọng. Để chứng minh điều này, chúng ta có thể thêm một controller mới vào ứng dụng của mình: 

```
@RestController
public class CustomController {

    @RequestMapping(value = "/custom", method = RequestMethod.POST)
    public String custom() {
        return "custom";
    }
}
```

Bây giờ khi refresh Swagger documentation, ta sẽ thấy custom-controller nằm chễm trệ trong danh sách controller. Như ta đã biết, sẽ chỉ có mỗi method POST hiển thị trong response của Swagger.

# 6. Spring data REST

Springfox cung cấp khả năng hỗ trợ cho [Spring Data REST](https://www.baeldung.com/spring-data-rest-intro) thông qua thử viện [springfox-data-rest](https://search.maven.org/search?q=g:io.springfox%20a:springfox-data-rest).

Spring Boot sẽ lo việc auto-configuration nếu nó phát hiện ra spring-boot-starter-data-rest trên classpath.

Bây giờ hãy tạo một entity User:

```
@Entity
public class User {
    @Id
    private Long id;
    private String firstName;
    private int age;
    private String email;

    // getters and setters
}
```

Sau đó, ta sẽ tạo UserRespository để thêm CRUD vào User entity:

```
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
```

Cuối cùng, ta import class [SpringDataRestConfiguration](https://springfox.github.io/springfox/javadoc/current/springfox/documentation/spring/data/rest/configuration/SpringDataRestConfiguration.html) vào SpringFoxConfig class:

```
@EnableSwagger2WebMvc
@Import(SpringDataRestConfiguration.class)
public class SpringFoxConfig {
    //...
}
```

Lưu ý: Tta sử dụng @EnableSwagger2WebMvc để kích hoạt Swagger vì nó đã thay thế cho @EnableSwagger2 trong version 3 của thư viện.

Hãy khởi động lại ứng dụng để tạo ra thông số mới cho Spring REST API:

![image.png](https://images.viblo.asia/fefc4b24-67cf-42e5-abc7-8c393f704c8a.png)

Ta có thể thấy Springfox đã tạo ra thông số của User entity với các HTTP methods như GET, POST, PUT, PATCH và DELETE.


# 7. Bean Validation

Springfox cũng hỗ trợ [bean validation](https://www.baeldung.com/javax-validation) thông qua thư viện [springfox-bean-validators ](https://search.maven.org/search?q=g:io.springfox%20a:springfox-bean-validators).

Đầu tiên ta thêm depndency Maven vào file pom.xml:

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-bean-validators</artifactId>
    <version>2.9.2</version>
</dependency>
```

Một lần nữa, nếu t a sử dụng Spring Boot, chúng ta sẽ không cần cung cấp dependency rõ ràng.

Tiếp theo, thêm một vào validation như @NotNull và @Min vào User entity:

```
@Entity
public class User {
    //...
    
    @NotNull(message = "First Name cannot be null")
    private String firstName;
    
    @Min(value = 15, message = "Age should not be less than 15")
    @Max(value = 65, message = "Age should not be greater than 65")
    private int age;
}
```

Cuối cùng, ta import class [BeanValidatorPluginsConfiguration](https://springfox.github.io/springfox/javadoc/current/springfox/bean/validators/configuration/BeanValidatorPluginsConfiguration.html) vào SpringFoxConfig class:

```
@EnableSwagger2
@Import(BeanValidatorPluginsConfiguration.class)
public class SpringFoxConfig {
    //...
}
```

Hãy xem sự thay đổi trên trang thông tin API:
![image.png](https://images.viblo.asia/7403a945-8edd-4370-9d20-ad0f7aab62c9.png)

Tại đây, ta có thể quan sát rằng User model có required với trường firstName, đồng thời phần min max cũng được định nghĩa rõ ràng.

# 8. Plugin

Để thêm các tính năng cụ thể vào, chúng ta có thể tạo một plugin Springfox. Một plugin có thể cung cấp nhiều tính năng khác nhau, từ việc làm phong phú thêm các model và props đến danh sách API tùy chỉnh và mặc định. 

Springfox hỗ trợ tạo plugin thông qua module [spi](https://github.com/springfox/springfox/tree/master/springfox-spi/src/main/java/springfox/documentation/spi). Spi module cung cấp một vài giao diện như [ModelBuilderPlugin](https://springfox.github.io/springfox/javadoc/current/springfox/documentation/spi/schema/ModelBuilderPlugin.html), [ModelPropertyBuilderPlugin](https://springfox.github.io/springfox/javadoc/current/springfox/documentation/spi/schema/ModelPropertyBuilderPlugin.html) và [ApiListingBuilderPlugin](https://springfox.github.io/springfox/javadoc/current/springfox/documentation/spi/service/ApiListingBuilderPlugin.html) hoạt động như một hook mở rộng để triển khai các custom plugin.

Để chứng minh các khả năng, hãy tạo một plugin để làm phong phú thêm thuộc tính email của User model. Chúng ta sẽ sử dụng giao diện ModelPropertyBuilderPlugin và đặt các giá trị của pattern và example.

Đầu tiên, hãy tạo class EmailAnnotationPlugin và ghi đè method support để cho phép bất kỳ [loại tài liệu](https://springfox.github.io/springfox/javadoc/current/springfox/documentation/spi/DocumentationType.html) nào, chẳng hạn như Swagger 1.2 và Swagger 2: 

```
@Component
@Order(Validators.BEAN_VALIDATOR_PLUGIN_ORDER)
public class EmailAnnotationPlugin implements ModelPropertyBuilderPlugin {
    @Override
    public boolean supports(DocumentationType delimiter) {
        return true;
    }
}
```

Sau đó ta ghi đè method apply của ModelPropertyBuilderPlugin để đặt values của builder properties:

```
@Override
public void apply(ModelPropertyContext context) {
    Optional<Email> email = annotationFromBean(context, Email.class);
     if (email.isPresent()) {
        context.getSpecificationBuilder().facetBuilder(StringElementFacetBuilder.class)
          .pattern(email.get().regexp());
        context.getSpecificationBuilder().example("email@email.com");
    }
}
```

Vì vậy, các đặc tả API sẽ hiển thị pattern và giá trị examble của thuộc tính được chú thích bằng @Email.

Tiếp theo, chúng ta sẽ thêm chú thích @Email vào User entity: 

```
@Entity
public class User {
    //...

    @Email(regexp=".*@.*\\..*", message = "Email should be valid")
    private String email;
}
```

Cuối cùng, ta kích hoạt EmailAnnotationPlugin bên trong class SpringFoxConfig bằng cách đăng ký như một bean:

```
@Import({BeanValidatorPluginsConfiguration.class})
public class SpringFoxConfig {
    //...

    @Bean
    public EmailAnnotationPlugin emailPlugin() {
        return new EmailAnnotationPlugin();
    }
}
```

Cùng ngó qua thành quả của chúng ta chút nhé:
![image.png](https://images.viblo.asia/411bf6d4-9406-4c71-a3e1-228627e0f155.png)

Ta có thể thấy giá trị của pattern tuơng tự như regex từ email của User entity.

Tương tự, giá trị của example (email@email.com) giống như ta đã định nghĩa ở hàm apply của EmailAnnotationPlugin

# 9. Configuration nâng cao

Docker bean của ứng dụng có thể đựoc cài đặt để cung cấp cho ta nhiều quyền kiểm soát đối với quá trình tạo API doc hơn.

## 9.1. Lọc API cho Swagger's response

Không phải lúc nào bạn cũng mong muốn để lộ doc của toàn bộ API. Chúng ta có thể hạn chế response của Swagger bằng cách truyền các tham số cho các phương thức apis() và path() của class Docket.

Như đã thấy ở trên, RequestHandlerSelectors cho phép sử dụng bất kỳ hoặc không có vị từ nào nhưng cũng có thể được sử dụng để lọc API theo base package, class annotation và mothod annotation.

PathSelectors cung cấp tính năng lọc bổ sung với các vị từ, giúp quét các đường dẫn yêu cầu của ứng dụng. Chúng ta có thể sử dụng any(), none(), regex() hoặc ant().

Trong ví dụ dưới đây, chúng ta sẽ hướng dẫn Swagger để chỉ hiển thị bao gồm các controller từ một package cụ thể, với các đường dẫn cụ thể, sử dụng vị từ ant (): 

```
@Bean
public Docket api() {                
    return new Docket(DocumentationType.SWAGGER_2)          
      .select()                                       
      .apis(RequestHandlerSelectors.basePackage("com.baeldung.web.controller"))
      .paths(PathSelectors.ant("/foos/*"))                     
      .build();
}
```

## 9.2. Tùy chỉnh thông tin

Swagger cung cung cấp một số giá trị mặc định trong response thư mà ta có thể tùy chỉnh như là "API documentation", “Created by Contact Email” và “Apache 2.0”.

Để thay đổi những giá trị này, ta sẽ dùng method apiInfo - ApiInfo class chứa thông tin tùy chỉnh về API::

```
@Bean
public Docket api() {                
    return new Docket(DocumentationType.SWAGGER_2)          
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.example.controller"))
      .paths(PathSelectors.ant("/foos/*"))
      .build()
      .apiInfo(apiInfo());
}

private ApiInfo apiInfo() {
    return new ApiInfo(
      "My REST API", 
      "Some custom description of API.", 
      "API TOS", 
      "Terms of service", 
      new Contact("John Doe", "www.example.com", "myeaddress@company.com"), 
      "License of API", "API license URL", Collections.emptyList());
}
```

## 9.3. Tùy chỉnh method Response message

Swagger cho phép ghi đè global các message response của các method HTTP thông qua phương thức globalResponses() của Docket.

Đầu tiên, chúng ta cần hướng dẫn Swagger không sử dụng các message mặc định. Giả sử chúng ta muốn ghi đè các message response 500 và 403 cho tất cả các phương thức GET.

Để làm điều này, một số code phải được thêm vào khối khởi tạo của Docket (code gốc bị loại trừ để rõ ràng hơn): 

```
.useDefaultResponseMessages(false)
.globalResponses(HttpMethod.GET, newArrayList(
    new ResponseBuilder().code("500")
        .description("500 message").build(),
    new ResponseBuilder().code("403")
        .description("Forbidden!!!!!").build()
));
```
![image.png](https://images.viblo.asia/cd58689b-6192-4010-a5fc-c2561b55ffd0.png)


# 10. Swagger UI với OAuth-Secured API

Swagger UI cung cấp một số tính năng rất hữu ích mà chúng ta đã đề cập kỹ từ đầu bài tới giờ. Nhưng chúng ta thực sự không thể sử dụng hầu hết những thứ này nếu API của chúng ta được bảo mật và không thể truy cập được.

Hãy xem cách mà chúng ta có thể cho phép Swagger truy cập API được bảo mật bằng OAuth bằng cách sử dụngAuthorization Code trong ví dụ này.

Chúng ta sẽ định cấu hình Swagger để truy cập API bảo mật củamình bằng cách sử dụng SecurityScheme và SecurityContext: 

```
@Bean
public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).select()
        .apis(RequestHandlerSelectors.any())
        .paths(PathSelectors.any())
        .build()
        .securitySchemes(Arrays.asList(securityScheme()))
        .securityContexts(Arrays.asList(securityContext()));
}
```

## 10.1. Cài đặt bảo mật

Ta sẽ định nghĩa một bean SecurityConfiguration trong Swagger configuration và cài một số tùy chỉnh mặc định như sau:

```
@Bean
public SecurityConfiguration security() {
    return SecurityConfigurationBuilder.builder()
        .clientId(CLIENT_ID)
        .clientSecret(CLIENT_SECRET)
        .scopeSeparator(" ")
        .useBasicAuthenticationWithAccessCodeGrant(true)
        .build();
}
```

## 10.2. SecurityScheme

Sau đó ta sẽ định nghĩa SecurityScheme, nó sẽ dùng để diễn tả cách mà API được bảo mật (Basic Authentication, OAuth2, …)

Trong trường hợp của chúng ta, ta sẽ định nghĩa OAuth sẽ đựoc dùng để bảo mật cho [Resource Server](https://www.baeldung.com/rest-api-spring-oauth2-angular) của chúng ta:

```
private SecurityScheme securityScheme() {
    GrantType grantType = new AuthorizationCodeGrantBuilder()
        .tokenEndpoint(new TokenEndpoint(AUTH_SERVER + "/token", "oauthtoken"))
        .tokenRequestEndpoint(
          new TokenRequestEndpoint(AUTH_SERVER + "/authorize", CLIENT_ID, CLIENT_SECRET))
        .build();

    SecurityScheme oauth = new OAuthBuilder().name("spring_oauth")
        .grantTypes(Arrays.asList(grantType))
        .scopes(Arrays.asList(scopes()))
        .build();
    return oauth;
}
```

Lưu ý rằng ta dùng  Authorization Code grant type, trong khi đó ta cần cung cấp token endpoint và URL authorization của OAuth2 Authorization Server.

Và đây sẽ là scope mà ta cần định nghĩa:

```
private AuthorizationScope[] scopes() {
    AuthorizationScope[] scopes = { 
      new AuthorizationScope("read", "for read operations"), 
      new AuthorizationScope("write", "for write operations"), 
      new AuthorizationScope("foo", "Access foo API") };
    return scopes;
}
```

Các scope này đồng bộ hóa với các scope mà chúng ta đã xác định trong ứng dụng của mình, cho API /foos.


## 10.3. SecurityContext

Cuối cùng, ta cần định nghĩa SecurityContext cho API:

```
private SecurityContext securityContext() {
    return SecurityContext.builder()
      .securityReferences(
        Arrays.asList(new SecurityReference("spring_oauth", scopes())))
      .forPaths(PathSelectors.regex("/foos.*"))
      .build();
}
```

Lưu ý tên mà chúng ta sử dụng ở đây - spring_oauth - đồng bộ hóa với tên mà chúng ta đã sử dụng trước đây trong SecurityScheme.


## 10.4. Test

Bây giờ sau tất cả những gì đã setup, hãy xem qua thành quả của chúng ta. Tại Swagger UI hãy thử truy cập Foo API. Ta có thể truy cập Swagger UI local tại:
http://localhost:8082/spring-security-oauth-resource/swagger-ui.html

Như chúng ta có thể thấy, nút Authorize mới đã hiện ra:
![image.png](https://images.viblo.asia/d4a23b6b-cbe9-45b2-9572-ce9eea78e8fc.png)

Khi ta nhấn vào nút này, ta có thể thấy pop-up Authorize hiện ra để truy cập vào API được bảo mật:
![image.png](https://images.viblo.asia/b8b9a6c2-cc8e-4ff0-800e-2c701308f8da.png)

Lưu ý rằng:
- Ta có thể thấy CLIENT_ID và CLIENT_SECRET như ta đã cài đặt trước đó.
- Hiện ta có thể lựa chọn scope mà ta cần.

Đây là cách mà API được bảo mật hiển thị:
![image.png](https://images.viblo.asia/083de3b2-33af-4f30-8e8d-5f022e399085.png)

Và giờ, cuối cùng thì chúng ta đã có thể chạm vào API của mình.

Tất nhiên, chúng ta cần phải cẩn thận với cách chúng ta hiển thị Swagger UI bên ngoài, khi cấu hình bảo mật này đang hoạt động.


# 11. Tổng kết

Trong bài viết này, chúng ta thiết lập Swagger 2 để tạo tài liệu cho Spring REST API. Chúng ta cũng đã khám phá các cách để trực quan hóa và tùy chỉnh đầu ra của Swagger. Và cuối cùng, chúng ta đã xem xét cấu hình OAuth một cách đơn giản cho Swagger.

Việc triển khai đầy đủ của hướng dẫn này có thể được tìm thấy trong [project này](https://github.com/eugenp/tutorials/tree/master/spring-security-modules/spring-security-web-rest). Để xem thiết lập trong dự án Boot, hãy xem [module này](https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-mvc).

Đối với phần OAuth, code có sẵn trong repository [spring-security-oauth](https://github.com/Baeldung/spring-security-oauth/tree/master/oauth-legacy).

Cảm ơn các bạn đã theo dõi bài viết này. Mọi góp ý hãy để lại comment bên dưới nhé.

Source: https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api