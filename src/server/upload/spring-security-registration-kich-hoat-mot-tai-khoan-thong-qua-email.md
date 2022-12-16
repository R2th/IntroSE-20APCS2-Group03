## 1. Tổng quan
Spring Security Registratio là cơ chế xác nhận đăng ký buộc người dùng phải trả lời email “ Xác nhận đăng ký ” được gửi sau khi đăng ký thành công để xác minh địa chỉ email của mình và kích hoạt tài khoản của họ. Người dùng thực hiện việc này bằng cách nhấp vào một liên kết kích hoạt duy nhất được gửi đến họ qua email.

Theo logic này, người dùng mới đăng ký sẽ không thể đăng nhập vào hệ thống cho đến khi quá trình này hoàn tất.

## 2. Mã thông báo xác thực
### 2.1. Các VerificationToken Entity
VerificationToken Entity phải đáp ứng các tiêu chí sau:

1. Nó phải liên kết với User (thông qua mối quan hệ một chiều)
2. Nó sẽ được tạo ngay sau khi đăng ký
3. Nó sẽ hết hạn trong vòng 24 giờ sau khi tạo
4. Có giá trị duy nhất, được tạo ngẫu nhiên
Yêu cầu 2 và 3 là một phần của logic đăng ký. Hai phần còn lại được triển khai trong một entity VerificationToken đơn giản giống như entity trong Ví dụ 2.1:

Ví dụ 2.1.

```
@Entity
public class VerificationToken {
    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String token;
  
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
    
    private Date expiryDate;
   
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
    
    // standard constructors, getters and setters
}
```
Lưu ý nullable = false trên Người dùng để đảm bảo tính toàn vẹn và nhất quán của dữ liệu trong liên kết Người dùng < -> VerificationToken .

### 2.2. Add the enabled Field to User
Ban đầu, khi người dùng được đăng ký, trường enabled sẽ được đặt thành false . Trong quá trình xác minh tài khoản - nếu thành công - nó sẽ thành true .

Hãy để tôi bắt đầu bằng cách thêm trường enabled vào entity User của tôi :

```
public class User {
    ...
    @Column(name = "enabled")
    private boolean enabled;
    
    public User() {
        super();
        this.enabled=false;
    }
    ...
}
```
Lưu ý rằng tôi cũng đặt giá trị mặc định của trường này thành false .

## 3. During Account Registration
Hãy thêm hai phần logic nghiệp vụ bổ sung vào trường hợp sử dụng đăng ký người dùng:

- Tạo VerificationToken cho user và duy trì nó
- Gửi tin nhắn email để xác nhận tài khoản - bao gồm một liên kết xác nhận với giá trị của VerificationToken
### 3.1. Sử dụng event spring để tạo mã thông báo và gửi email xác minh
Hai phần logic bổ sung này không nên được thực hiện trực tiếp bởi controller vì chúng là các tác vụ back-end “collateral”.

Controller sẽ publish một Spring ApplicationEvent để kích hoạt việc thực thi các tác vụ này. Điều này đơn giản như việc tiêm ApplicationEventPublisher và sau đó sử dụng nó để publish hoàn tất đăng ký.

Ví dụ 3.1. cho thấy logic đơn giản này:

```
@Autowired
ApplicationEventPublisher eventPublisher

@PostMapping("/user/registration")
public ModelAndView registerUserAccount(
  @ModelAttribute("user") @Valid UserDto userDto, 
  HttpServletRequest request, Errors errors) { 
    
    try {
        User registered = userService.registerNewUserAccount(userDto);
        
        String appUrl = request.getContextPath();
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, 
          request.getLocale(), appUrl));
    } catch (UserAlreadyExistException uaeEx) {
        ModelAndView mav = new ModelAndView("registration", "user", userDto);
        mav.addObject("message", "An account for that username/email already exists.");
        return mav;
    } catch (RuntimeException ex) {
        return new ModelAndView("emailError", "user", userDto);
    }

    return new ModelAndView("successRegister", "user", userDto);
}
```
Một điều cần lưu ý bổ sung là khối try catch xung quanh việc publish sự kiện. Đoạn mã này sẽ hiển thị trang lỗi bất cứ khi nào có một ngoại lệ trong logic được thực thi sau khi publish event, trong trường hợp này là việc gửi email.

### 3.2. The Event and the Listener
Bây giờ chúng ta hãy xem việc triển khai thực tế OnRegistrationCompleteEvent mới này mà controller của tôi đang gửi đi, cũng như listener sẽ xử lý nó:

Ví dụ 3.2.1. - OnRegistrationCompleteEvent

```
public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private Locale locale;
    private User user;

    public OnRegistrationCompleteEvent(
      User user, Locale locale, String appUrl) {
        super(user);
        
        this.user = user;
        this.locale = locale;
        this.appUrl = appUrl;
    }
    
    // standard getters and setters
}
```
Ví dụ 3.2.2. - Các RegistrationListener Xử lý các OnRegistrationCompleteEvent

```
@Component
public class RegistrationListener implements 
  ApplicationListener<OnRegistrationCompleteEvent> {
 
    @Autowired
    private IUserService service;
 
    @Autowired
    private MessageSource messages;
 
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        service.createVerificationToken(user, token);
        
        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl 
          = event.getAppUrl() + "/regitrationConfirm.html?token=" + token;
        String message = messages.getMessage("message.regSucc", null, event.getLocale());
        
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\r\n" + "http://localhost:8080" + confirmationUrl);
        mailSender.send(email);
    }
}
```
Ở đây, confirmRegistration phương pháp sẽ nhận được OnRegistrationCompleteEvent , trích xuất tất cả các thông tin cần thiết từ nó, tạo verification, duy trì nó, và sau đó gửi nó như một tham số trong liên kết "Confirm Registration"

Như đã đề cập ở trên, mọi javax.mail.AuthenticationFailedException do JavaMailSender ném ra sẽ được xử lý bởi controller.

### 3.3. Processing the Verification Token Parameter
Khi người dùng nhận được liên kết "Confirm Registration ", khi họ nhấp vào liên kết đó controller sẽ lấy giá trị token trong request GET và sẽ sử dụng nó để kích hoạt Người dùng.

Hãy xem quá trình này trong Ví dụ 3.3.1:

Ví dụ 3.3.1. - RegistrationController Processing the Registration Confirmation

```
@Autowired
private IUserService service;

@GetMapping("/regitrationConfirm")
public String confirmRegistration
  (WebRequest request, Model model, @RequestParam("token") String token) {
 
    Locale locale = request.getLocale();
    
    VerificationToken verificationToken = service.getVerificationToken(token);
    if (verificationToken == null) {
        String message = messages.getMessage("auth.message.invalidToken", null, locale);
        model.addAttribute("message", message);
        return "redirect:/badUser.html?lang=" + locale.getLanguage();
    }
    
    User user = verificationToken.getUser();
    Calendar cal = Calendar.getInstance();
    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
        String messageValue = messages.getMessage("auth.message.expired", null, locale)
        model.addAttribute("message", messageValue);
        return "redirect:/badUser.html?lang=" + locale.getLanguage();
    } 
    
    user.setEnabled(true); 
    service.saveRegisteredUser(user); 
    return "redirect:/login.html?lang=" + request.getLocale().getLanguage(); 
}
```
Người dùng sẽ được chuyển hướng đến một trang lỗi với thông báo tương ứng nếu:
 - VerificationToken không tồn tại
 - VerificationToken đã hết hạn
Xem Ví dụ 3.3.2. để xem trang lỗi.

Ví dụ 3.3.2. - BadUser.html
```
<html>
<body>
    <h1 th:text="${param.message[0]}>Error Message</h1>
    <a th:href="@{/registration.html}" 
      th:text="#{label.form.loginSignUp}">signup</a>
</body>
</html>
```
Nếu không tìm thấy lỗi, người dùng đã được kích hoạt.

Có hai cách để cải thiện việc xử lý các tình huống kiểm tra và hết hạn VerificationToken :
  - Chúng ta có thể sử dụng Cron job để kiểm tra việc hết hạn mã token trong background.
  - Chúng ta có thể cho người dùng cơ hội nhận mã token mới sau khi mã này đã hết hạn.
## 4. Adding Account Activation Checking to the Login Process
Chúng ta cần kiểm tra xem người dùng đã được enabled:

Hãy xem điều này trong Ví dụ 4.1. method loadUserByUsername của MyUserDetailsService .

Ví dụ 4.1.
```
@Autowired
UserRepository userRepository;

public UserDetails loadUserByUsername(String email) 
  throws UsernameNotFoundException {
 
    boolean enabled = true;
    boolean accountNonExpired = true;
    boolean credentialsNonExpired = true;
    boolean accountNonLocked = true;
    try {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(
              "No user found with username: " + email);
        }
        
        return new org.springframework.security.core.userdetails.User(
          user.getEmail(), 
          user.getPassword().toLowerCase(), 
          user.isEnabled(), 
          accountNonExpired, 
          credentialsNonExpired, 
          accountNonLocked, 
          getAuthorities(user.getRole()));
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
```
Như chúng ta có thể thấy, bây giờ MyUserDetailsService không sử dụng flag enabled của user - và vì vậy nó sẽ chỉ cho phép người dùng đã xác thực.

Bây giờ, chúng ta sẽ thêm một AuthenticationFailureHandler để tùy chỉnh các thông báo ngoại lệ đến từ MyUserDetailsService.

Ví dụ 4.2. - CustomAuthenticationFailureHandler :

```
@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Autowired
    private MessageSource messages;

    @Autowired
    private LocaleResolver localeResolver;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, 
      HttpServletResponse response, AuthenticationException exception)
      throws IOException, ServletException {
        setDefaultFailureUrl("/login.html?error=true");

        super.onAuthenticationFailure(request, response, exception);

        Locale locale = localeResolver.resolveLocale(request);

        String errorMessage = messages.getMessage("message.badCredentials", null, locale);

        if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            errorMessage = messages.getMessage("auth.message.disabled", null, locale);
        } else if (exception.getMessage().equalsIgnoreCase("User account has expired")) {
            errorMessage = messages.getMessage("auth.message.expired", null, locale);
        }

        request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, errorMessage);
    }
}
```
Chúng ta sẽ cần sửa đổi login.html để hiển thị các thông báo lỗi.

Ví dụ 4.3. - Hiển thị thông báo lỗi tại login.html :

```
<div th:if="${param.error != null}" 
  th:text="${session[SPRING_SECURITY_LAST_EXCEPTION]}">error</div>
```
## 5. Adapting the Persistence Layer
Bây giờ chúng ta hãy cung cấp cách triển khai thực tế của một số hoạt động này liên quan đến mã xác minh token tương ứng với người dùng.

Nó sẽ bao gồm:

- Một VerificationTokenRepository mới
- Method mới trong IUserInterface và việc triển khai nó cho các hoạt động CRUD mới cần thiết
Ví dụ 5.1 - 5.3. hiển thị các giao diện mới và triển khai nó:

Ví dụ 5.1. - VerificationTokenRepository

```
public interface VerificationTokenRepository 
  extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);
}
```
Ví dụ 5.2. - Giao diện IUserService

```
public interface IUserService {
    
    User registerNewUserAccount(UserDto userDto) 
      throws UserAlreadyExistException;

    User getUser(String verificationToken);

    void saveRegisteredUser(User user);

    void createVerificationToken(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);
}
```
Ví dụ 5.3. The UserService

```
@Service
@Transactional
public class UserService implements IUserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Override
    public User registerNewUserAccount(UserDto userDto) 
      throws UserAlreadyExistException {
        
        if (emailExist(userDto.getEmail())) {
            throw new UserAlreadyExistException(
              "There is an account with that email adress: " 
              + userDto.getEmail());
        }
        
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setRole(new Role(Integer.valueOf(1), user));
        return repository.save(user);
    }

    private boolean emailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    @Override
    public User getUser(String verificationToken) {
        User user = tokenRepository.findByToken(verificationToken).getUser();
        return user;
    }
    
    @Override
    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken);
    }
    
    @Override
    public void saveRegisteredUser(User user) {
        repository.save(user);
    }
    
    @Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }
}
```
## 6. Kết luận
Trong bài viết này, tôi đã giới thiệu quy trình đăng ký bao gồm bước kích hoạt tài khoản dựa trên email .

Logic cơ bản ở đây là kích hoạt tài khoản yêu cầu gửi mã xác minh cho người dùng qua email để họ có thể gửi lại cho controller để xác minh danh tính của họ.

Nguồn: https://www.baeldung.com/registration-verify-user-by-email