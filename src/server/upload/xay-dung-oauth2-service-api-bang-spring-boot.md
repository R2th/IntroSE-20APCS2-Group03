# OAuth2 là gì?
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Khi đọc bài viết này, chắc hẳn nhiều bạn cũng đã biết hoặc từng sử dụng OAuth2 rồi. Ví dụ như, trang web bạn đang code, có chức năng đăng nhập qua Facebook, Google, Twiter,... chẳng hạn. Vâng, đó là bạn đã sử dụng OAuth2 để chứng thực, đăng nhập và lấy tài nguyên của một service bên thứ 3, hoàn toàn nằm ngoài hệ thống web mà ta đang phát triển.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OAuth2 hay Open Authentication thực ra nó là một *phương thức chứng thực*, xây dựng ra để các ứng dụng có thể chia sẻ tài nguyên cho nhau mà không cần chia sẻ thông tin tài khoản (*username* và *password*). OAuth2 đảm nhận 2 việc **Authentication** (Xác thực người dùng) và **Authorization** (Ủy quyền truy cập vào tài nguyên)

## Khái niệm cơ bản
![](https://images.viblo.asia/c1d1f627-3e40-43f5-b0f8-7c4c73f4d5e1.png)
<div align="center">
    <em>Hình 1. Sơ đồ hoạt động cơ bản của phương thức OAuth2</em>
</div>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nhìn vào hình ảnh trên, ta có thể thấy giao thức OAuth2 được thực hiện qua 2 bên là **Service API** - cung cấp dịch vụ xác thực và ủy quyền sử dụng tài nguyên và **Application** - ứng dụng bên thứ 3 muốn lấy tài nguyên của Resource Owner. Ngoài ra, còn có một số khái niệm quan trọng như:
* **Resource Owner**: Là những người muốn ủy quyền cho phép **Application** truy cập vào tài khoản của mình. **Application** có thể lấy thông tin nhưng sẽ bị giới hạn bởi scope được cấp phép.
* **Authorization Server**: Có nhiệm vụ kiểm tra và xác thực thông tin đăng nhập của user, sau đó cung cấp một chuỗi gọi là **Access Token** để Client có thể xác thực về sau.
* **Resource Server**: Là nơi lưu trữ tài nguyên của User và bảo mật tài nguyên cho User.

### Luồng hoạt động
1. **Application** gửi yêu cầu ủy quyền truy cập vào **Resource Server**.
2. Nếu **User** ủy quyền cho phép **Application** truy cập vào tài nguyên, thì sẽ nhận được một *"giẩy ủy quyền"* từ **User**.
3. **Application** gửi thông tin đăng nhập kèm theo *"giẩy ủy quyền"* tới **Authorization Server**.
4. Nếu thông tin gửi đi từ **Application** là hợp lệ, **Authorization Server** sẽ trả về một đoạn chuỗi gọi là `access_token`.
5. **Application** muốn truy cập tài nguyên của **Resource Server** thì phải gửi yêu cầu kèm theo đó là chuỗi `access_token` vừa nhận được.
6. Nếu `access_token` hợp lệ, **Resource Server** sẽ trả về tài nguyên mà **Application** đang yêu cầu.

### Authorization Grant
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để lấy được `access_token` thì phải qua bước ủy quyền và xác thực. Loại ủy quyền (Authorization Grant) phụ thuộc vào phương thức mà **Application** sử dụng ủy quyền. Đối với OAuth2, định nghĩa có 4 loại ủy quyền sau:
* **Authorization Code**: Thường sử dụng trong các server-side application.
* **Resource Owner Password Credentials**: Sử dụng với các ứng dụng được tin cậy
* **Client Credentials**: Sử dụng truy cập với các ứng dụng thông qua API
* **Implicit**: Sử dụng trong các Mobile App hoặc Web App
# Xây dựng OAuth2 Service API
### Khởi tạo ứng dụng Spring Boot
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Một số dependencies quan trọng trong file `pom.xml`:
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-oauth2</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-security</artifactId>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```
### Config Resource Server
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tại đây, cần cung cấp một `resource_id` cho ứng dụng, nếu không ứng dụng sẽ hiểu dùng resource_id của Spring Boot.
```java
private static final String RESOURCE_ID = "inventory";

@Override
public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
    resources.resourceId(RESOURCE_ID);
}
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Config security cho resource:
```java
@Override
public void configure(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .antMatcher("/**")
        .authorizeRequests()
        .antMatchers("/oauth/revoke_token").permitAll()
        .antMatchers("/oauth/authorize").permitAll()
        .anyRequest().authenticated()
        .and().formLogin()
        .loginPage("/login")
        .successHandler(authenticationSuccessHandler)
        .permitAll()
        .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler())
        .and().httpBasic();
}
```

### Config Authorization Server
Tạo các bean config cho việc kiểm tra và lưu trữ trong quá trình xác thực người dùng:
```java
@Autowired
private DataSource dataSource;

@Bean("jdbcClientDetailsService")
public JdbcClientDetailsService clientDetailsService() {
    return new JdbcClientDetailsService(dataSource);
}

@Bean("tokenStore")
public TokenStore jdbcTokenStore() {
    return new JdbcTokenStore(dataSource);
}

@Bean
public ApprovalStore approvalStore() {
    return new JdbcApprovalStore(dataSource);
}

@Bean
public AuthorizationCodeServices authorizationCodeServices() {
    return new JdbcAuthorizationCodeServices(dataSource);
}
```
### Kết quả
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nhập input URL: http://localhost:8081/oauth/authorize?client_id=mobile&response_type=code&redirect_uri=http://localhost:8082/oauth/callback&scope=WRITE

![](https://images.viblo.asia/6aae5c33-423d-4887-8263-94636c7fa27b.gif)
<div align="center">
    <em>Hình 2. Hình ảnh demo OAuth2 theo loại ủy quyền Authorization Code</em>
</div>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Để lấy thông tin User của Resource Server, ta cần cung cấp thêm request param `access_token`. Ví dụ ta gọi API sau:
http://localhost:8081/users/profile?access_token=be95725b-22b9-4bb9-a4ea-1a9a05c216d5, ta thu được response:
```json
{
    "id": 1,
    "username": "krish",
    "email": "k@krishantha.com",
    "enabled": true,
    "accountNonExpired": true,
    "credentialsNonExpired": true,
    "accountNonLocked": true
}
```
# Kết luận
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trên đây là bài viết về cách dựng một OAuth2 Service API bằng Spring Boot. Hi vọng bài viết này sẽ giúp các bạn hiểu hơn về OAuth2 cũng như là cách để tự xây dựng một OAuth2 Service API cho riêng mình. Thank all!

**Source code demo**:
* OAuth2 Server: https://github.com/NguyenNgocVanFHN/demo-oauth2
* OAuth2 Client: https://github.com/NguyenNgocVanFHN/oauth2-client