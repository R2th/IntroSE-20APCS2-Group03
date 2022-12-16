Ở bài viết này mình sẽ trình bày về cách xây dựng chức năng Forgot password.
Technical:
* **Spring boot**
* **LomBok**
* **JPA**
* **Mailsender**
* Let's start now .
## 1 Entities.
Đầu tiên chúng ta luôn cần có đó thực thể User chứa thông tin về email và password.
```
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;
    @Column(name = "email")
    @Email(message = "*Please provide a valid Email")
    @NotEmpty(message = "*Please provide an email")
    private String email;
    @Column(name = "password")
    @Length(min = 5, message = "*Your password must have at least 5 characters")
    @NotEmpty(message = "*Please provide your password")
    private String password;
    @Column(name = "name")
    @NotEmpty(message = "*Please provide your name")
    private String name;
    @Column(name = "last_name")
    @NotEmpty(message = "*Please provide your last name")
    private String lastName;
    @Column(name = "active")
    private Integer active;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

}
```
Để đầy đủ nên chúng ta thêm thực thể **Role**:
```
package com.gpch.login.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer id;
    @Column(name = "role")
    private String role;

}
```
Giờ đến chức năng của chúng ta t sẽ tạo thực thể PasswordResetToken với mục đích lưu lại mã xác thực và thời gian còn hiệu lục của mã xác thực tài khoản muốn reset.
bảng này sẽ mapping 1-1 với bảng user.
```
package com.gpch.login.model;

import javax.persistence.*;
import java.util.Date;
@Entity
public class PasswordResetToken {
    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
```
File **pom.xml**
```
 <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-jwt</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
    </dependencies>
```
Config **application.properties**
```
# ==============================================================
# = Data Source
# ==============================================================
spring.datasource.url =jdbc:mysql://localhost:3306/yourDb
spring.datasource.username =yourUserName
spring.datasource.password =yourPassưord

# ==============================================================
# = Keep the connection alive if idle for a long time (needed in production)
# ==============================================================
spring.datasource.testWhileIdle = true
spring.datasource.validationQuery = SELECT 1
#server.port = 8080
# ==============================================================
# = Show or not log for each sql query
# ==============================================================
spring.jpa.show-sql = true

# ==============================================================
# = Hibernate ddl auto (create, create-drop, update)
# ==============================================================
spring.jpa.hibernate.ddl-auto =update

# ==============================================================
# = The SQL dialect makes Hibernate generate better SQL for the chosen database
# ==============================================================
spring.jpa.properties.hibernate.dialect =org.hibernate.dialect.MySQL5Dialect

# ==============================================================
# = Initialize the database using data.sql script
# ==============================================================
spring.datasource.initialization-mode=always
spring.mail.host=smtp.gmail.com
spring.mail.username=yourEmail@gmail.com
spring.mail.password=anhday96
spring.mail.port=465
spring.mail.protocol=smtps
spring.mail.properties.mail.transport.protocol=smtps
spring.mail.properties.mail.smtps.auth=true
spring.mail.properties.mail.smtps.starttls.enable=true
spring.mail.properties.mail.smtps.timeout=8000
# ===============================================================
# Configure HTTPS
# Run Cmd  keytool -genkey -alias selfsigned_localhost_sslserver -keyalg RSA -keysize 2048 -validity 700 -keypass changeit -storepass changeit -keystore ssl-server.jks
#================================================================
server.port=8443
server.ssl.key-alias=selfsigned_localhost_sslserver
server.ssl.key-password=changeit
server.ssl.key-store=classpath:ssl-server.jks
server.ssl.key-store-provider=SUN
server.ssl.key-store-type=JKS
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.lettuce.pool.max-active=8
spring.redis.jedis.pool.max-idle=8
```
## Repository
Tạo classs **PasswordResetTokenRepository**
```
import com.gpch.login.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByToken(String token);
}

```
Mỗi khi user click resetPassword chúng ta sẽ sinh ra một mã token để xác thực.
Với chức năng findbyTokenKhi user nhập token xác thực  chúng ta xẽ kiểm tra token đó có chính xác không. và trả về User cần reset Password nếu token chính xác.

## Service
Tạo một Interface **ISecurityUserService**  
```
public interface ISecurityUserService {
    String validatePasswordResetToken(long id, String token);

}
```
Nghiệp vụ giải quyết ở đây là xác thực user_id và mã token có chính xác không.
Impl **ISecurityUserServiceImpl**
```
import com.gpch.login.model.PasswordResetToken;
import com.gpch.login.model.User;
import com.gpch.login.repository.PasswordResetTokenRepository;
import com.gpch.login.service.ISecurityUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Calendar;
@Service
public class ISecurityUserServiceImpl implements ISecurityUserService {
    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;
    @Override
    public String validatePasswordResetToken(long id, String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);
        if ((passToken == null) || (passToken.getUser().getId() != id)) {
            return "invalidToken";
        }

        final Calendar cal = Calendar.getInstance();
        if ((passToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return "expired";
        }
/// VALID USER LOGIN LUON =))
        final User user = passToken.getUser();
        final Authentication auth = new UsernamePasswordAuthenticationToken(user, null, Arrays.asList(new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return null;
    }
}
```
ở đây do project mình đã nhúng spring security nên có đoạn Authentication.
Nếu token và user name chính xác ta sẽ cho user đó đc login luôn =))
các bạn có thể impl theo cách khác nhé tùy theo dự án của bạn =))