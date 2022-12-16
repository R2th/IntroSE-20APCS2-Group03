# 1. Tổng quan
Bài viết này thảo luận về một phần quan trọng của quá trình đăng ký - mã hóa mật khẩu (về cơ bản nghĩa là không lưu trữ mật khẩu ở dạng dữ liệu rõ ràng).

Có một vài cơ chế mã hóa được Spring Security hỗ trợ - và đối với bài viết này, chúng ta sẽ sử dụng **BCrypt**, vì đây thường là giải pháp tốt nhất hiện có.

Hầu hết các cơ chế khác, chẳng hạn như **MD5PasswordEncoder** và **ShaPasswordEncoder** sử dụng các thuật toán yếu hơn và hiện không được ưa dùng nữa. 

# 2. Định nghĩa Encoder cho mật khẩu
Chúng ta sẽ bắt đầu bằng cách định nghĩa 1 hàm BCryptPasswordEncoder đơn giản:

```
@Bean
public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
}
```
Với các cách cũ hơn - chẳng hạn như **SHAPasswordEncoder** - sẽ yêu cầu ứng dụng khách chuyển vào một giá trị muối khi mã hóa mật khẩu.

Còn với BCrypt, nó sẽ tạo ra một **salt** ngẫu nhiên. Đây là điều quan trọng cần nhớ và hiểu vì nó có nghĩa là mỗi lần gọi sẽ có một kết quả khác nhau, và vì vậy chúng ta chỉ cần mã hóa mật khẩu một lần.

Để làm cho việc tạo **salt** ngẫu nhiên này hoạt động, BCrypt sẽ lưu trữ **salt** bên trong hàm băm. Ví dụ: 

```
$2a$10$ZLhnHxdpHETcxmtEStgpI./Ri1mksgJ9iDP36FmfMdYyVg9g0b2dq
```

Ở đây có 3 trường đựoc phân cách với nhau bởi ký tự $:

1.  Phần "2a"' đại diện cho phiên bản thuật toán của BCrypt
2.  Phần "10" đại diện cho độ mạnh của thuật toán
3.  Phần "ZLhnHxdpHETcxmtEStgpI" là phần **salt** đựoc tạo ngẫu nhiên. Về cơ bản 22 ký tự đầu là **salt**, phần còn lại của trưòng cuối là phiên bản băm của text.

Ngoài ra, hãy lưu ý rằng thuật toán BCrypt tạo ra một chuỗi có độ dài 60, vì vậy chúng ta cần đảm bảo rằng mật khẩu sẽ được lưu trữ trong một cột có thể chứa nó. Một lỗi phổ biến là tạo một cột có độ dài khác và sau đó nhận được lỗi Tên người dùng hoặc Mật khẩu không hợp lệ tại thời điểm xác thực tài khoản. 

# 3. Mã hóa mật khẩu khi đăng ký

Bây giờ chúng ta sẽ sử dụng **PasswordEncoder** bên trong **UserService** để tạo giá trị băm của password trong quá trình người dùng đăng ký tài khoản:

```
@Autowired
private PasswordEncoder passwordEncoder;

@Override
public User registerNewUserAccount(UserDto accountDto) throws EmailExistsException {
    if (emailExist(accountDto.getEmail())) {
        throw new EmailExistsException(
          "There is an account with that email adress:" + accountDto.getEmail());
    }
    User user = new User();
    user.setFirstName(accountDto.getFirstName());
    user.setLastName(accountDto.getLastName());
    
    user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
    
    user.setEmail(accountDto.getEmail());
    user.setRole(new Role(Integer.valueOf(1), user));
    return repository.save(user);
}
```

# 4. Mã hóa mật khẩu khi xác thực

Bây giờ hãy bắt đầu xử lý nửa còn lại của quá trình này và mã hóa mật khẩu mật khẩu khi người dùng tiến hành xác thực.

Đầu tiên chúng ta cần đưa phần mã hóa mật khẩu mà chúng ta đã xác định trước đó vào provider:

```
@Autowired
private UserDetailsService userDetailsService;

@Bean
public DaoAuthenticationProvider authProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(encoder());
    return authProvider;
}
```

Cấu hình cho phần này rất đơn giản:
* Chúng ta triển khai service user details
* Chúng ta đang xác định một provider tham chiếu đến service detail
* Chúng ta cũng cần bật bộ mã hóa mật khẩu

Và cuối cùng, chúng ta cần tham chiếu đến nhà provider này trong cấu hình XML bảo mật của mình: 

```
<authentication-manager>
    <authentication-provider ref="authProvider" />
</authentication-manager>
```

Còn đối với những bạn sử dụng Java thì sẽ cònig như sau:

```
@Configuration
@ComponentScan(basePackages = { "com.baeldung.security" })
@EnableWebSecurity
public class SecSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider());
    }
    
    ...
}
```

# 5. Kết luận

Bài hướng dẫn nhanh về đăng ký này hi vọng sẽ giúp các bạn triển khai được việc mã hóa mật khẩu thông qua BCrypt, tuy rất đơn giản nhưng cũng không kém phần mạnh mẽ. Nếu bạn có góp ý gì về bài viết, hãy comment bên dưới để thảo luận nhé.

Source: https://www.baeldung.com/spring-security-registration-password-encoding-bcrypt