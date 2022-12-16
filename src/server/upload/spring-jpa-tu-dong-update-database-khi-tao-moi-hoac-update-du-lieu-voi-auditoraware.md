# Mở đầu
Đôi khi code chúng ta gặp phải một số trường hợp, database có các trường như created_by, created_at, updated_by, updated_at để lưu lại các trạng thái khi quản trị viên hoặc người dùng tạo mới hoặc thay đổi thông tin một bản ghi trong database. Riêng đối với 2 trường created_by và updated_by cần phải biết được User nào đang đăng nhập hiện tại mới có thể update được 2 trường này. Thật may mắn là Spring data JPA cùng với Spring Security đã giúp chúng ta làm được điều này một cách hoàn toàn tự động.
# Ví dụ demo
Giả sử ta có 2 bảng users và posts như sau:
![](https://images.viblo.asia/0e04fbe4-f636-422b-8577-31a160db3252.png)
chúng ta có 2 bảng, một user có thể tạo nhiều bài post và user cũng có thể chỉnh sửa bài post
## Tạo các entity
### 1. Entity User
```
@Data
@Entity
@Table(name = "users", catalog = "demo")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "gender")
    private Boolean gender;
    @Column(name = "email")
    private String email;
}
```
### 2. Entity Post
```
@Data
@Entity
@Table(name = "posts", catalog = "demo")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
```
## Config Spring và Auditing
### 1. Config Spring Security
Tạo class config - SecurityConfig:
```
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new LoginFilter("/api/login", this.authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("SELECT username,password,enabled FROM users WHERE username=?")
                .authoritiesByUsernameQuery("SELECT username,role FROM users WHERE username=?")
                .passwordEncoder(new BCryptPasswordEncoder());
    }
}
```
Tại đây, mình dùng JWT để tạo api đăng nhập (sẽ đề cập ở bài viết sau). Đại khái nếu đăng nhập thành công thì nó sẽ trả về 1 token để biết được user nào đang được authenticate.
### 2. Config Auditing
#### 2.1. Implement lại interface AuditorAware
Tại đây, chúng ta có thể định nghĩa đối tượng nào được tự động update, khi có dữ liệu thay đổi. Ở đây, ví dụ là đối tượng User đã được authenticate:
```
public class AuditorAwareImpl implements AuditorAware<User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return Optional.ofNullable(userRepository.findByUsername(username));
    }
}
```
Có một chú ý nhỏ, tại hàm findByUsername, ta phải thêm `@Transactional(propagation = Propagation.REQUIRES_NEW)`. Nếu không, chương trình của chúng ta sẽ bị lặp vô hạn dẫn đến StackOverFlow :D
Và config @EnableJpaAuditing:
```
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class PersistentConfig {
    @Bean
    public AuditorAware<User> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
```
#### 2.2. Thêm các annotations trong Entity:
```
@Data
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "posts", catalog = "demo")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "created_by")
    @CreatedBy
    private User createdBy;

    @CreatedDate
    @Column(name = "created_at")
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    @LastModifiedBy
    private User updatedBy;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Timestamp updatedAt;
}
```
#### 2.3. Tạo controller
```
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(produces = "application/json")
    public ResponseEntity createOrEdit(@RequestBody Post post) {
        try {
            return ResponseEntity.ok(postService.save(post));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }
}
```
### 3. Kết quả:
Dưới đây là kết quả test trên postman:
![](https://images.viblo.asia/890d55b7-8161-445f-8312-3926822f618b.png)
# Kết luận:
Trên đây là một ví dụ đơn giản cũng như là một cách để chúng ta có thể dễ dàng quản lí việc update dữ liệu với một số trường đặc biệt liên quan đến lịch sử chỉnh sửa. Đối với cách này, chúng ta chỉ lưu lại được lịch sử chỉnh sửa cuối cùng. Trong trường hợp cần tracking toàn bộ quá trình chỉnh sửa thì có vẻ không ổn lắm. Nếu mọi người có đóng góp gì hãy comment bài viết này nhé!