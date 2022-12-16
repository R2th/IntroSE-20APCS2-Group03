# 1. Tổng quan
Trongbài viết này, chúng ta sẽ thảo luận về cách triển khai Spring Security OAuth2 để sử dụng JSON web Token.

Chúng ta sẽ tiếp tục xây dựng dựa trên bài viết [Spring REST API + OAuth2 + Angular](https://www.baeldung.com/rest-api-spring-oauth2-angular) trong loạt bài về OAuth.

Dưới đây là một sô bài viết về OAuth mà bạn có thể tham khảo:
* [Logout trong ứng dụng sử dụng bảo mật AOuth](https://www.baeldung.com/logout-spring-security-oauth)
* [OAuth2 Remember Me với Refresh Token](https://www.baeldung.com/spring-security-oauth2-remember-me) 
* [OAuth2 cho một Spring REST API](https://www.baeldung.com/spring-security-oauth2-refresh-token-angular)

#  2. OAuth2 Authorization Server
Trước đây, Spring Security OAuth cung cấp khả năng thiết lập Authorization Server như một Spring Application. Sau đó, chúng ta phải cài đặt cấu hình để nó sử dụng JwtTokenStore để chúng ta có thể sử dụng JWT tokens.

Tuy nhiên, OAuth đã bị từ chối bởi Spring và bây giờ chúng ta sẽ sử dụng Keycloak làm Authorization Server của mình.

Vì vậy, lần này, chúng ta sẽ thiết lập Authorization Server của mình dưới dạng [Keycloak server được nhúng trong ứng dụng Spring Boot](https://www.baeldung.com/keycloak-embedded-in-spring-boot-app). Nó phát hành JWT tokens theo mặc định, vì vậy chúng ta hoàn toàn không cần cài đặt hay thay đổi cấu hình nữa.
#  3. Resource Server
Bây giờ, chúng ta hãy xem cách cấu hình Resource Server để sử dụng JWT.

Chúng ta sẽ thực hiện việc này trong file application.yml:
```
server: 
  port: 8081
  servlet: 
    context-path: /resource-server

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8083/auth/realms/baeldung
          jwk-set-uri: http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/certs
```

JWT chứa tất cả thông tin trong Tokens. Vì vậy, Resource Server cần xác minh Token để đảm bảo dữ liệu không bị sửa đổi. Thuộc tính jwk-set-uri chứa public key mà máy chủ có thể sử dụng cho mục đích này.

Thuộc tính issuer-uri trỏ đến Authorization Server URI, URI này cũng có thể được sử dụng để xác minh xác nhận quyền sở hữu Iss, như một biện pháp bảo mật bổ sung.

Ngoài ra, nếu thuộc tính jwk-set-uri không được thiết lập. Resource Server sẽ cố gắng sử dụng issuer-ui để xác định vị trí của key này, từ [Authorization Server metadata endpoint.](https://tools.ietf.org/html/rfc8414#section-3).

Quan trọng hơn, việc thêm thuộc tính cho issuer-uri sẽ quyết định việc chúng ta phải chạy Authorization Server trước khi có thể khởi động Resource Server application.

Bây giờ hãy xem làm cách nào chúng ta có thể cấu hình JWT bằng cách sử dụng Java:
```
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()
              .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/user/info", "/api/foos/**")
                  .hasAuthority("SCOPE_read")
                .antMatchers(HttpMethod.POST, "/api/foos")
                  .hasAuthority("SCOPE_write")
                .anyRequest()
                  .authenticated()
            .and()
              .oauth2ResourceServer()
                .jwt();
    }
}
```

Ở đây, chúng ta đang ghi đè cấu hình Http Security mặc định. Vì vậy, chúng ta cần chỉ định rõ ràng rằng chúng ta muốn nó hoạt động như một Resource Server và rằng chúng tôi sẽ sử dụng Access Tokens có định dạng JWT bằng cách sử dụng các phương thức oauth2ResourceServer() và jwt() tương ứng.

Cấu hình JWT ở trên là những gì phiên bản Spring Boot mặc định đang cung cấp cho chúng ta. Điều này cũng có thể được tùy chỉnh như chúng ta sẽ thấy trong phần sau của bài viết.
#  4. Tùy chỉnh Claims bên trong Token
Bây giờ chúng ta hãy thiết lập một số cơ sở hạ tầng để có thể thêm một vài tùy chỉnh Claims trong Access Token do Authorization Server trả về. Các Claims tiêu chuẩn được cung cấp bởi framework đều có thể sử dụng rất tốt, nhưng hầu hết thời gian, chúng ta sẽ cần một số thông tin bổ sung trong token  để sử dụng ở phía Client.

Hãy lấy ví dụ về một claim tùy chỉnh, organization, sẽ chứa tên tổ chức của người dùng nhất định.

## 4.1 Cấu hình Authorization Server
Đối với điều này, chúng tacần thêm một vài cấu hình vào file đị nghĩa realm, baeldung-domains.json:
* Thêm organization vào người dùng john@test.com

```
"attributes" : {
  "organization" : "baeldung"
},
```

* Thêm protocolMapper được gọi là organization vào tùy chỉnh của jwtClient 

```
"protocolMappers": [{
  "id": "06e5fc8f-3553-4c75-aef4-5a4d7bb6c0d1",
  "name": "organization",
  "protocol": "openid-connect",
  "protocolMapper": "oidc-usermodel-attribute-mapper",
  "consentRequired": false,
  "config": {
    "userinfo.token.claim": "true",
    "user.attribute": "organization",
    "id.token.claim": "true",
    "access.token.claim": "true",
    "claim.name": "organization",
    "jsonType.label": "String"
  }
}],
```

Đối với thiết lập Keycloak, bạn cũng có thể thực hiện việc này bằng việc sử dụng Admin console.

Ngoài ra, điều quan trọng cần nhớ là cấu hình JSON ở trên dành riêng cho Keycloak và có thể khác với các máy chủ OAuth khác.

Khi cấu hình mới này được thiết lập và chạy, chúng ta sẽ nhận được thêm một thuộc tính organization = baeldung, trong token payload cho john@test.com:
```
{
  jti: "989ce5b7-50b9-4cc6-bc71-8f04a639461e"
  exp: 1585242462
  nbf: 0
  iat: 1585242162
  iss: "http://localhost:8083/auth/realms/baeldung"
  sub: "a5461470-33eb-4b2d-82d4-b0484e96ad7f"
  typ: "Bearer"
  azp: "jwtClient"
  auth_time: 1585242162
  session_state: "384ca5cc-8342-429a-879c-c15329820006"
  acr: "1"
  scope: "profile write read"
  organization: "baeldung"
  preferred_username: "john@test.com"
}
```

## 4.2 Sử dụng Access Token trong Angular Client
Tiếp theo, chúng ta sẽ sử dụng thông tin của Token trong ứng dụng Angular Client. Chúng ta sẽ sử dụng thư viện angle2-jwt để làm việc đó.

Chúng ta cũng sẽ sử dụng organization claim trong AppService của mình và thêm một hàm getOrganization như sau:
```
getOrganization(){
  var token = Cookie.get("access_token");
  var payload = this.jwtHelper.decodeToken(token);
  this.organization = payload.organization; 
  return this.organization;
}
```

Hàm này sử dụng JwtHelperService từ thư viện angle2-jwt để giải mã Access Token và nhận claim tùy chỉnh của chúng ta. Bây giờ tất cả những gì chúng ta cần làm là hiển thị nó trong AppComponent của mình:

```
@Component({
  selector: 'app-root',
  template: `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">Spring Security Oauth - Authorization Code</a>
    </div>
  </div>
  <div class="navbar-brand">
    <p>{{organization}}</p>
  </div>
</nav>
<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  public organization = "";
  constructor(private service: AppService) { }  
   
  ngOnInit() {  
    this.organization = this.service.getOrganization();
  }  
}
```

#  5. Truy cập Extra Claims trong Resource Server
Nhưng, làm thế nào để chúng ta có thể truy cập thông tin đó ở phía Resource Server?

## 5.1. Truy cập Authentication Server Claims
Điều đó thực sự rất đơn giản: chúng ta chỉ cần giải nén nó từ **org.springframework.security.oauth2.jwt.Jwt‘s AuthenticationPrincipal**, như chúng ta sẽ làm đối với bất kỳ thuộc tính nào khác trong UserInfoController:
```
@GetMapping("/user/info")
public Map<String, Object> getUserInfo(@AuthenticationPrincipal Jwt principal) {
    Map<String, String> map = new Hashtable<String, String>();
    map.put("user_name", principal.getClaimAsString("preferred_username"));
    map.put("organization", principal.getClaimAsString("organization"));
    return Collections.unmodifiableMap(map);
}
```

## 5.2. Cài đặt Add/Remove/Rename Claims
Bây giờ, điều gì sẽ xảy ra nếu chúng ta muốn thêm nhiều claim hơn ở phía Resource Server? Hoặc loại bỏ, đổi tên một số claim có sẵn?

Giả sử chúng ta muốn sửa đổi organization claim đến từ Authentication Server để nhận giá trị bằng chữ hoa. Ngoài ra, nếu claim không có trên phía người dùng, chúng ta cần đặt giá trị của nó là unknown.

Để đạt được điều này, trước tiên, chúng ta sẽ phải thêm một class thứ sẽ triển khai giao diện Converter và sử dụng MappedJwtClaimSetConverter để thay đổi các claim:

```
public class OrganizationSubClaimAdapter implements 
  Converter<Map<String, Object>, Map<String, Object>> {
    
    private final MappedJwtClaimSetConverter delegate = 
      MappedJwtClaimSetConverter.withDefaults(Collections.emptyMap());

    public Map<String, Object> convert(Map<String, Object> claims) {
        Map<String, Object> convertedClaims = this.delegate.convert(claims);
        String organization = convertedClaims.get("organization") != null ? 
          (String) convertedClaims.get("organization") : "unknown";
        
        convertedClaims.put("organization", organization.toUpperCase());

        return convertedClaims;
    }
}
```

Sau đó, trong class SecurityConfig, chúng ta cần thêm instance JwtDecoder của riêng mình để ghi đè phiên bản được cung cấp bởi Spring Boot và đặt OrganizationSubClaimAdapter của chúng ta làm trình chuyển đổi claims:

```
@Bean
public JwtDecoder customDecoder(OAuth2ResourceServerProperties properties) {
    NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(
      properties.getJwt().getJwkSetUri()).build();
    
    jwtDecoder.setClaimSetConverter(new OrganizationSubClaimAdapter());
    return jwtDecoder;
}
```

Bây giờ khi chúng ta gọi API /user/info cho người dùng mike@other.com, chúng ta sẽ nhận được organization là UNKNOWN.

Lưu ý rằng việc ghi đè JwtDecoder mặc định được cấu hình bởi Spring Boot nên được thực hiện cẩn thận để đảm bảo tất cả các cấu hình cần thiết vẫn chuẩn xác.

#  6. Tải Keys từ Java Keystore
Trong cấu hình trước đây, chúng ta đã sử dụng public key mặc định của Authorization Server để xác minh tính toàn vẹn của token.

Chúng ta cũng có thể sử dụng keypair và chứng chỉ được lưu trữ trong Java Keystore file để thực hiện quá trình ký.

## 6.1 Tạo file JKS Java KeyStore
Đầu tiên, hãy tạo các keys - và cụ thể hơn là tệp .jks - bằng cách sử dụng công cụ dòng lệnh keytool:
```
keytool -genkeypair -alias mytest 
                    -keyalg RSA 
                    -keypass mypass 
                    -keystore mytest.jks 
                    -storepass mypass
```

Lệnh sẽ tạo một file có tên mytest.jks chứa các keys của chúng ta - cả public và private key, đồng thời đảm bảo keypass và storepass giống nhau.

## 6.2 Export Public Key
Tiếp theo, chúng ta cần Export Public Key của mình từ JKS đã tạo, chúng ta có thể sử dụng lệnh sau để làm như vậy:

```
keytool -list -rfc --keystore mytest.jks | openssl x509 -inform pem -pubkey
```

Response trả về sẽ trông từa tựa như sau:

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgIK2Wt4x2EtDl41C7vfp
OsMquZMyOyteO2RsVeMLF/hXIeYvicKr0SQzVkodHEBCMiGXQDz5prijTq3RHPy2
/5WJBCYq7yHgTLvspMy6sivXN7NdYE7I5pXo/KHk4nz+Fa6P3L8+L90E/3qwf6j3
DKWnAgJFRY8AbSYXt1d5ELiIG1/gEqzC0fZmNhhfrBtxwWXrlpUDT0Kfvf0QVmPR
xxCLXT+tEe1seWGEqeOLL5vXRLqmzZcBe1RZ9kQQm43+a9Qn5icSRnDfTAesQ3Cr
lAWJKl2kcWU1HwJqw+dZRSZ1X4kEXNMyzPdPBbGmU6MHdhpywI7SKZT7mX4BDnUK
eQIDAQAB
-----END PUBLIC KEY-----
-----BEGIN CERTIFICATE-----
MIIDCzCCAfOgAwIBAgIEGtZIUzANBgkqhkiG9w0BAQsFADA2MQswCQYDVQQGEwJ1
czELMAkGA1UECBMCY2ExCzAJBgNVBAcTAmxhMQ0wCwYDVQQDEwR0ZXN0MB4XDTE2
MDMxNTA4MTAzMFoXDTE2MDYxMzA4MTAzMFowNjELMAkGA1UEBhMCdXMxCzAJBgNV
BAgTAmNhMQswCQYDVQQHEwJsYTENMAsGA1UEAxMEdGVzdDCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBAICCtlreMdhLQ5eNQu736TrDKrmTMjsrXjtkbFXj
Cxf4VyHmL4nCq9EkM1ZKHRxAQjIhl0A8+aa4o06t0Rz8tv+ViQQmKu8h4Ey77KTM
urIr1zezXWBOyOaV6Pyh5OJ8/hWuj9y/Pi/dBP96sH+o9wylpwICRUWPAG0mF7dX
eRC4iBtf4BKswtH2ZjYYX6wbccFl65aVA09Cn739EFZj0ccQi10/rRHtbHlhhKnj
iy+b10S6ps2XAXtUWfZEEJuN/mvUJ+YnEkZw30wHrENwq5QFiSpdpHFlNR8CasPn
WUUmdV+JBFzTMsz3TwWxplOjB3YacsCO0imU+5l+AQ51CnkCAwEAAaMhMB8wHQYD
VR0OBBYEFOGefUBGquEX9Ujak34PyRskHk+WMA0GCSqGSIb3DQEBCwUAA4IBAQB3
1eLfNeq45yO1cXNl0C1IQLknP2WXg89AHEbKkUOA1ZKTOizNYJIHW5MYJU/zScu0
yBobhTDe5hDTsATMa9sN5CPOaLJwzpWV/ZC6WyhAWTfljzZC6d2rL3QYrSIRxmsp
/J1Vq9WkesQdShnEGy7GgRgJn4A8CKecHSzqyzXulQ7Zah6GoEUD+vjb+BheP4aN
hiYY1OuXD+HsdKeQqS+7eM5U7WW6dz2Q8mtFJ5qAxjY75T0pPrHwZMlJUhUZ+Q2V
FfweJEaoNB9w9McPe1cAiE+oeejZ0jq0el3/dJsx3rlVqZN+lMhRJJeVHFyeb3XF
lLFCUGhA7hxn2xf3x1JW
-----END CERTIFICATE-----
```

## 6.3 Tùy chỉnh Maven

Tiếp theo, chúng ta không muốn tệp JKS được chọn bởi quá trình lọc maven - vì vậy chúng ta sẽ đảm bảo loại trừ nó trong pom.xml:
```
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
            <excludes>
                <exclude>*.jks</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```

Nếu chúng ta đang sử dụng Spring Boot, chúng ta cần đảm bảo rằng tệp JKS của chúng ta được thêm vào classpath của ứng dụng thông qua Plugin Spring Boot Maven - addResources:
```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <addResources>true</addResources>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 6.4 Authorization Server

Bây giờ, chúng ta sẽ cấu hình Keycloak để sử dụng Keypair từ mytest.jks, bằng cách thêm nó vào phần KeyProvider của tệp JSON định nghĩa realm  như sau:
```
{
  "id": "59412b8d-aad8-4ab8-84ec-e546900fc124",
  "name": "java-keystore",
  "providerId": "java-keystore",
  "subComponents": {},
  "config": {
    "keystorePassword": [ "mypass" ],
    "keyAlias": [ "mytest" ],
    "keyPassword": [ "mypass" ],
    "active": [ "true" ],
    "keystore": [
            "src/main/resources/mytest.jks"
          ],
    "priority": [ "101" ],
    "enabled": [ "true" ],
    "algorithm": [ "RS256" ]
  }
},
```

Ở đây, chúng ta đã đặt mức độ ưu tiên là 101, lớn hơn bất kỳ Keypair nào khác cho Authorization Server và đặt active thành true. Điều này được thực hiện để đảm bảo rằng Authorization Server sẽ chọn Keypair cụ thể này từ thuộc tính jwk-set-uri mà chúng ta đã chỉ định trước đó.

Một lần nữa, cấu hình này dành riêng cho Keycloak và có thể khác đối với các triển khai Máy chủ OAuth khác.
#  7. Tổng kết
Trong bài viết này, chúng ta tập trung vào việc thiết lập dự án Spring Security OAuth2 của chúng ta để sử dụng JSON Token web.

Bạn có thể tìm thấy toàn bộ hướng dẫn này trên [GitHub](https://github.com/Baeldung/spring-security-oauth/tree/master/oauth-jwt). 

Cảm ơn các bạn đã dành thời gian cho bài viết này.

Nguồn: https://www.baeldung.com/spring-security-oauth-jwt?fbclid=IwAR2wvjudsdpO9NpCqEo4tmXD3G_Frnd93UvRzdk-zZuS-P_H5nVM_3T5yJc#auth-server