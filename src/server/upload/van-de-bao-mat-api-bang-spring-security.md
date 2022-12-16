# Lời mở đầu
Nhắc đến API thì chắc anh em ai cũng biết nguyên lý hoạt động của nó là khi client request tới server thì sẽ được sever gửi kết quả về. Nhưng làm sao server để biết được "ai" là người đã gửi request lên?

Ví dụ cụ thể: Admin chỉ quyền xem tất cả danh sách user của hệ thống, còn những tài khoản user thường khác sẽ không được phép. Hay là chỉ admin mới có quyền đăng, sửa, duyệt bài viết,...

Vậy làm sao để server phân biệt được đâu là tài khoản admin, đâu là tài khoản user. Bài viết này mình sẽ giải quyết vấn đề trên chon một số anh em chưa nắm rõ về vấn đề bảo mật API sử dụng JWT (JSON Web Token).

# Bắt đầu
#### Sơ lược về luồng đi:
Khi login vào hệ thống sẽ yêu cầu username và password. Thì server sẽ check tài khoản. Nếu đúng sẽ trả về 1 chuỗi `Authorization String` gửi kèm trên `Response Header`. Và mỗi lần gửi request lên thì gửi kèm chuỗi `Authorization String` đó trên `Request Header`. Thông qua đó server có thể check được xem tài khoản nào đang gửi request lên.
#### Thiết kế database:
1 Bảng Accounts: Id, username, password.

1 Bảng Roles: Id, name.

1 Bảng Account_Role: Id, Id_account, Id_role

Như vậy ta sẽ xây dựng được database để có thể check được xem Account có những Role nào. (Với hệ thống nhiều role, 1 account có thể có nhiều role). Nếu chỉ muốn accout chỉ có duy nhất 1 role thì ta có thể thiết kế chỉ cần 2 bảng Accounts với Roles là đủ. Không cần bảng trung gian.

#### Cấu hình
- Khai báo các thư viện sử dụng:
1. `<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-security</artifactId></dependency>`
2. `<dependency><groupId>org.springframework.security.oauth</groupId><artifactId>spring-security-oauth2</artifactId><version>2.1.3.RELEASE</version></dependency>`
 
 3. `<dependency><groupId>io.jsonwebtoken</groupId><artifactId>jjwt</artifactId><version>0.7.0</version></dependency>`
*  Khai báo trong file `application.properties`

```
app.jwtSecret= JWTSuperSecretKey
app.jwtExpirationInMs = 864000000
```
864000000 là thời gian (tính bằng giây) có hiệu lực của `Authorization String`

- Tạo thư mục security nằm trong thư mục `src/java/main`, thư mục này sẽ chứa tất cả các file cấu hình security cho app.
1. Tạo file `JwtTokenProvider` để cung cấp và xử lí token:
```
public class JwtTokenProvider {
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
	
	@Value("${app.jwtSecret}")  #JWTSuperSecretKey
	private String jwtSecret;
	
	@Value("${app.jwtExpirationInMs}") #864000000
	private int jwtExpirationInMs;
	
    #Tạo ra token từ chuỗi authentication
	public String generateToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
		
        # mã hóa token 
		return Jwts.builder()
				.setSubject(Long.toString(userPrincipal.getId()))
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
    #Lấy id_user từ token đã được mã hóa
	public int getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(jwtSecret)
				.parseClaimsJws(token)
				.getBody();
		return (int) Long.parseLong(claims.getSubject());
	}

    #check token
	public boolean validateToken(String authToken) throws SignatureException {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
		return false;
	}
}
```
2.  Tạo file `UserPrincipal` để lấy các thông tin tài khoản login
```
public class UserPrincipal implements UserDetails {

	private int id;
	@JsonIgnore
	private String username;
	@JsonIgnore
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(int id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.authorities = authorities;
	}
	
	public static UserPrincipal create(Account account) {
		Set<Role> roles = account.getRole();
		List<GrantedAuthority> authorities = roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
		
		return new UserPrincipal(account.getId(), account.getUsername(), account.getPassword(), authorities);
	}
 }
```
3. Tạo file `CustomUserDetailService` để custom lại các cách load thông tin user.
```
@Service
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	AccountRepository accountRepo;
	
	@Override
	@Transactional
    # Get user by username
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountRepo.findByUsername(username)
				.orElseThrow (() ->
						new UsernameNotFoundException("Not found account with username: " + username));
		
		return UserPrincipal.create(account);
	}
	
	@Transactional
    # Get user by id
	public UserDetails loadUserById(int id) {
		Account account = accountRepo.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("User not found with id " + id));
		return UserPrincipal.create(account);
	}

}
```
4. Tạo file `JwtAuthenticationEntryPoint` để xử lí thông tin từ request và gửi về response, chỗ này sẽ gửi về một lỗi khi mà request tới đường dẫn yêu cầu xác thực (cần chuỗi JWT) nhưng không có kèm chuỗi JWT
```
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
			throws IOException, ServletException {
		logger.error("Responding with unautheorized error. Message - {}",e.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
	}
}

```
5. Tạo file `SecurityConfig` để config các bảo mật về mật khẩu, phạm vi truy cập.
```
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		securedEnabled = true,
		jsr250Enabled = true,
		prePostEnabled = true
		)

public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	CustomUserDetailService customUserDetailService;
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}
	
	@Override
	public void configure (AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
			.userDetailsService(customUserDetailService)
			.passwordEncoder(passwordEncoder());
	}
	
	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception{
		return super.authenticationManagerBean();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure (HttpSecurity http) throws Exception{
		http
			.cors()
				.and()
			.csrf()
				.disable()
			.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler) #Ném ngoại lệ
				.and()
			.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
			.authorizeRequests()
				.antMatchers()
                    .permitAll()
                 .antMatchers("/api/login-admin") #Đường dẫn /api/login-admin sẽ được truy cập bình thường mà ko cần check
                 	.permitAll()
                 .anyRequest()
                 	.authenticated(); #Mọi đường dẫn còn lại yêu cầu gửi Authentication String trên header để check.
	}
}
```
Như vậy là đã config xong.
Bây giờ ta sẽ tạo 1 controller login để test.
```
@RestController
@RequestMapping("api")
public class LoginController {
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	//Login admin
	@PostMapping("login-admin")
	public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginRequest loginRequest){
		#Tạo chuỗi authentication từ username và password (object LoginRequest - file này chỉ là 1 class bình thường, chứa 2 trường username và password)
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
				);
        #Set chuỗi authentication đó cho UserPrincipal
		SecurityContextHolder.getContext().setAuthentication(authentication);
		Account accountLogin = accountService.getAccountByUsername(loginRequest.getUsername());
		Set<Role> roles = accountLogin.getRole();
		boolean isAdmin = false;
		for (Role role : roles) {
			if (role.getName().equals("ADMIN")) {
				isAdmin = true;
			}
		}
		if (authentication != null && isAdmin) {
			String jwt = tokenProvider.generateToken(authentication);
			return ResponseEntity.ok(new JwtAuthenticationResponse(jwt)); #Trả về chuỗi jwt(authentication string)
		}
		return ResponseEntity.ok(new MessageResponse("fail"));		
	}
```
Kết quả khi chạy thử bằng postman:
![](https://images.viblo.asia/597d05fa-9217-489c-a16d-34a6878d09cb.jpg)
Như vậy, mỗi lần gửi request tới các đường dẫn yêu cầu có accessToken( Tức jwt) thì ta chỉ cần gửi kèm theo chuỗi accessToken đó trên Header thì hệ thống sẽ lấy được thông tin user request thông qua hàm `getUserIdFromJWT` ở file `JwtTokenProvider`. Qua đó ta có thể check được các quyền của người dùng dễ dàng.
# Tổng kết
Qua bài viết này hi vọng giúp một phần anh em hiểu được luồng đi, cách thức hoạt động và thiết lập được cách bảo mật API dễ dàng hơn. Chi tiết anh em có thể tham khảo theo [Security a REST API](https://www.baeldung.com/securing-a-restful-web-service-with-spring-security)