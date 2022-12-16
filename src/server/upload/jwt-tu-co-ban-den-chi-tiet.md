Chào mọi người!
Có lẽ nhiều bạn không xa lạ gì với JWT (JSON Web Token), những cũng sẽ có nhiều bạn mới nghe qua cụm từ này. Cũng không ít bạn tuy đã sử dụng nhưng không hiểu nhiều về nó lắm.

Bài viết của mình ngày hôm nay với mục đích chia sẻ những kiến thức mà mình lượm nhặt được, gom chúng lại để tổng hợp cho các bạn. Vậy nên sẽ có nhiều chỗ rất cơ bản mà các bạn đã đọc ở đâu đó rồi. 

Nếu bài viết có gì chưa phải, khó hiểu, mong các bạn đóng góp bằng commnent phía dưới. Rất mong bài viết sẽ giúp ích cho các bạn bắt đầu làm quen hay muốn customize lại. 

Bài viết của mình sẽ bao gồm các phần sau

0. **Mở đầu**
1. **JWT - JSON Web Token là gì? ?**
2. **Cấu trúc của một JWT**
3. **Luồng xử lý của 1 hệ thống sử dụng bảo mật JWT**
4. **JWT vs Session**
5. **Trả lời câu hỏi về JWT**

# 0. Mở đầu
**Token-based** **authentication** là phương thức xác thực bằng chuỗi má hóa. Một hệ thống sử dụng **Token-based** authentication cho phép người dùng nhập user/password (hoặc tương tự) để nhận về 1 chuỗi mã token. Mã này được sử dụng để "xác minh" quyền truy cập vào tài nguyên mà không cần phải cung cấp lại username/password nữa. 
Đọc thêm [tại đây](https://www.w3.org/2001/sw/Europe/events/foaf-galway/papers/fp/token_based_authentication/)
> The general concept behind a token-based authentication system is simple. Allow users to enter their username and password in order to obtain a token which allows them to fetch a specific resource - without using their username and password. Once their token has been obtained, the user can offer the token - which offers access to a specific resource for a time period - to the remote site.

Trong bày này, chúng ta sẽ tìm hiểu về Phương pháp sử dụng Token-based authentication bằng JWT 

Về **cookied-base authentication**, bạn kéo xuống đọc phần  **4. JWT vs Session** giúp mình nhé 
# 1. JWT - JSON Web Token là gì? 
Các bạn có thể hiểu đơn giản thì nó 1 chuỗi mã hóa mà gốc gác ban đầu của nó là 1 chuỗi JSON. Tức là ban đầu, chuỗi thông tin ấy là 1 chuỗi dạng JSON (easy readable) , sau đó bằng phương pháp mã hóa nào đó, nó trở thành 1 chuỗi ký tự lộn xộn ( có thể hiểu là như vậy ) mà mà mắt thường mình nhìn chả hiểu nó có những thông tin gì :D 

Đấy là ý hiểu đơn giản của mình thôi. Tuy nhiên các bạn có thể tham khảo định nghĩa dưới đây: 

> JSON Web Token (JWT) là 1 tiêu chuẩn mở (RFC 7519) định nghĩa cách thức truyền tin an toàn giữa các thành viên bằng 1 đối tượng JSON. Thông tin này có thể được xác thực và đánh dấu tin cậy nhờ vào "chữ ký" của nó. Phần chữ ký của JWT sẽ được mã hóa lại bằng HMAC hoặc RSA. (Nguồn: techmaster.vn)
> 

Như vậy, Bảo mật JWT là phuơng pháp xác thực quyền truy cập (**Authentication**) bằng JSON Web Token.

# 2. Cấu trúc của một JWT
Dưới đây là 1 JSON Web Token
``` 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJuaHMzMTA4IiwiZXhwIjoxNTU4MDYzODM3fQ.
449KVmOFWcpOUjnYGm-f1QWhY8N-DerKDfTK0JQm1Nc
```

Trông rối rắm thế kia thì có cấu trúc quái gì nhỉ? Thế nhưng không, JWT có cấu trúc của nó đấy các bạn nhé. 

JWT trên bao gồm 3 phần: 

* **Header** (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9)
* **Payload**  (eyJzdWIiOiJuaHMzMTA4IiwiZXhwIjoxNTU4MDYzODM3fQ)
* **Signature** (449KVmOFWcpOUjnYGm-f1QWhY8N-DerKDfTK0JQm1Nc)

được phân cách nhau bởi dấu "." (chấm).

Trông thì có vẻ phức tạp, nhưng cấu trúc của nó theo format như sau
```xml
<base64-encoded header>.<base64-encoded payload>.<HMACSHA256(base64-encoded signature)>    
```

![](https://images.viblo.asia/8f216a92-af6d-417a-806a-3cab6bc2a491.jpeg)

Ta sẽ đi tìm hiểu đôi chút về các thành phần trong JWT

## 2.1 Header
Header bao gồm hai phần chính: 
- *typ* - Loại token (mặc định là JWT - Thông tin này cho biết đây là một Token JWT) 
- *alg* - Thuật toán đã dùng để mã hóa (HMAC SHA256 - HS256 hoặc RSA). 
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Đoạn JSON trên sau khi được mã hóa base64url sẽ trở thành như sau
```java
String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
System.out.println(Base64.getUrlEncoder().encodeToString(header.getBytes()));
```
Output: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

## 2.2. Payload
Phần thứ 2 của token đó là Payload, nơi chứa các nội dung của thông tin (claim). Thông tin truyền đi có thể là mô tả của 1 thực thể (ví dụ như người dùng) hoặc cũng có thể là các thông tin bổ sung thêm cho phần Header. Nhìn chung, chúng được chia làm 3 loại: **reserved**, **public** và **private**.
Xem tại https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1
1. **Reserved**: là những thông tin đã được quy định ở trong [IANA JSON Web Token Claims registry](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1).  Những thông tin này không có cái nào là bắt buộc cả. Tuy nhiên tùy vào từng ưng dụng bạn implement mà hãy ràng buộc yêu cầu bắt buộc đối với những thông tin cần thiết 
    * **iss** (issuer): tổ chức phát hành token (không bắt buộc)
    * **sub** (subject): chủ đề của token  (không bắt buộc)
    * **aud** (audience): đối tượng sử dụng token  (không bắt buộc)
    * **exp** (expired time): thời điểm token sẽ hết hạn (không bắt buộc)
    * **nbf** (not before time): token sẽ chưa hợp lệ trước thời điểm này
    * **iat** (issued at): thời điểm token được phát hành, tính theo UNIX time
    * **jti**: JWT ID

2. **Public**: Khóa có thể define tùy theo ý muốn của người sử dụng JWT. Tuy nhiên để tránh trùng lặp, khó nên được quy định ở trong IANA JSON Web Token Registry hoặc là 1 URI có chứa không gian tên không bị trùng lặp.
Ví dụ: 
```JSON
"https://www.techmaster.vn/jwt_claims/is_admin": true
```

3. **Private**: Phần thông tin thêm dùng để truyền qua giữa các máy thành viên.
Ví dụ
```
{
  "sub": "1234567890",
  "name": "paduvi",
  "admin": true
}
```

-----
**Ta có ví dụ cho phần Payload như sau**
```go
{
  "sub": "nhs3108",
  "exp": 1558065429
}
```

Đoạn JSON trên sau khi được mã hóa base64url sẽ trở thành như sau
```java
String payload = "{"sub":"nhs3108","exp":1558063837}";
System.out.println(Base64.getUrlEncoder().encodeToString(payload.getBytes()));
```
Output: `eyJzdWIiOiJuaHMzMTA4IiwiZXhwIjoxNTU4MDYzODM3fQ`

## 2.3 Signature
Phần chữ ký được tạo bằng cách kết hợp 2 phần Header + Payload, rồi mã hóa nó lại bằng 1 giải thuật encode nào đó, càng phức tạp thì càng tốt, ví dụ như HMAC SHA-256

Ta có thể xem lại công thức mà mình vừa nhắc ở đầu bài viết
```xml
<base64-encoded header>.<base64-encoded payload>.<HMACSHA256(base64-encoded signature)>    
```

Với signature là phần kết hợp giữa *header* và *payload*
Ở 2 phần trên, ta đã có
```java
String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
String encodedHeader = Base64.getUrlEncoder().encodeToString(header.getBytes());

String payload = "{"sub":"nhs3108","exp":1558063837}";
String encodedPayload = Base64.getUrlEncoder().encodeToString(payload.getBytes());

String signature = encodedHeader + "." + encodedPayload;

String encodedSignature = HMACSHA256.encode(signature, scretKey);

System.out.println(encodedSignature);
```

Output `449KVmOFWcpOUjnYGm-f1QWhY8N-DerKDfTK0JQm1Nc`

Tổng lại 3 phần, ta có chuỗi JWT như sau

`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuaHMzMTA4IiwiZXhwIjoxNTU4MDYzODM3fQ.449KVmOFWcpOUjnYGm-f1QWhY8N-DerKDfTK0JQm1Nc
`

# 3. Luồng xử lý của 1 hệ thống sử dụng bảo mật JWT

Ở phần này, mình sẽ mô tả cách xử lý của một hệ thống sử dụng bảo mật với JWT. Các bạn có thể bớt chút thời gian ghé đọc bài viết [Securing Spring Boot with JWT](https://viblo.asia/p/securing-spring-boot-with-jwt-bJzKm14rK9N). Tuy có hơi sơ sài nhưng mình sẽ giải thích thêm ở đây. 
## 3.1. Sơ lược về luồng xử lý 

Chúng ta sẽ dùng sở đồ sau để hình dung

![](https://images.viblo.asia/0cb529a7-8db9-424e-a994-e3ef28b16380.png)

**Nhìn vào sơ đồ, ta có thể thấy luồng đi như sau**

1. User thực hiện login bằng cách gửi id/password hay sử dụng các tài khoản mạng xã hội lên phía Authentication Server (Server xác thực)
2. Authentication Server tiếp nhận các dữ liệu mà User gửi lên để phục vụ cho việc xác thực người dùng. Trong trường hợp thành công, Authentication Server sẽ tạo một JWT và trả về cho người dùng thông qua response.
3. Người dùng nhận được JWT do Authentication Server vừa mới trả về làm "chìa khóa" để thực hiện các "lệnh" tiếp theo đối với Application Server.
4. Application Server trước khi thực hiện yêu cầu được gọi từ phía User, sẽ verify JWT gửi lên. Nếu OK, tiếp tục thực hiện yêu cầu được gọi.

-----
Mình sẽ minh họa cho các bạn dễ hiểu hơn bằng một ví dụ thực tế hơn trong cuộc sống nhé.

Bạn là một học sinh của 1 trường THPT A. Hôm nay bạn đến sớm hơn mọi hôm và muốn vào được lớp thì cửa lớp phải được mở. Nhưng trường bạn khác với những trường khác là cửa của các lớp luôn khóa khi hết giờ và bảo vệ thì chẳng có nhiệm vụ phải đi mở cửa từng lớp. Thay vào đó, mỗi lớp sẽ phải cử ra người để đi lấy chìa khóa tại phòng bảo vệ để mở cửa cho lớp mình. Như thế, bạn có thể hình dung

* Bạn là User trong sơ đồ ở trên
* Phòng Bảo Vệ là Authentication Server
* Lớp bạn là Application Server
* Chìa khóa là JWT. 

Đầu tiên, bạn phải cầm thẻ học sinh tới phòng bảo vệ, để bác bảo vệ xác định bạn có đúng là học sinh của trường ko, học lớp nào và giao chìa khóa (Tuơng ứng với việc user gửi thông tin về username/password để Authenticaion Server xác thực và trả về cho người dùng 1 mã JWT). Bạn nhận được chìa khóa, lấy chìa khóa để mở cửa trước khi có thể vào bên trong lớp (Tuơng ứng với việc người dùng sử dụng JWT kèm theo để Application Verify trước khi thực hiện các lệnh mà User yêu cầu)

Bạn cũng có thể ghé đọc bài viết [JSON Web Tokens (JWT) vs Sessions](https://viblo.asia/p/json-web-tokens-jwt-vs-sessions-4dbZN0Mg5YM) để đọc 1 ví dụ khác rất hay của tác giả nhé
## 3.2 Hệ thống Verify chuỗi JWT thế nào?
Câu hỏi đặt ra ở đây là hệ thống Verify JWT thế nào:

- Chuỗi JWT có cấu trúc **H.P.S** được **Client** gửi lên. **Server** sẽ làm tương tự như sau
    * Set S1 = S
    * Set S2 = **HMAC**(*SHA256*(**H.P**) vỡi secret key của hệ thống) (Giả sử hệ thống sử dụng encryption algorithms SHA256)
    * So sánh S1 == S2 ?
- Nếu S1 và S2 khớp nhau, tức là chữ ký hợp lệ, hệ thống mới tiếp decode payload và tục kiểm tra các data trong payload. Ví dụ trường exp (expiration date)

## 3.3. Luồng xử lý trong Securing Spring Boot with JWT

Mình Code Java là chính nên mình xin phép dùng framework của Java để làm ví dụ. Các bạn có thể xem qua để làm tư liệu khi tìm hiểm các Framework mà mình đang làm.

Như những gì mình từng chia sẻ trong bài viết [Securing Spring Boot with JWT](https://viblo.asia/p/securing-spring-boot-with-jwt-bJzKm14rK9N), xin được tóm tắt lại như sau
- Đầu tiên, client thực hiện gửi request có chứa username/password lên phía server, xin cấp JWT
- Hệ thống thực hiện kiểm tra username/password. Trong trường hợp hợp lệ, hệ thống thực hiện genarate mã JWT để trả về cho client thông qua response
- Client lưu lại JWT làm chìa khóa cho các request tiếp theo. Với mỗi request truy cập đó, phía server thực hiện kiểm tra JWT có hợp lệ hay không (Đọc **3.2 Hệ thống Verify chuỗi JWT thế nào?**) . Nếu hợp lệ sẽ thực hiện request.

Hãy thử ngó lại file code sau
```java
package com.nhs3108.services;

import static java.util.Collections.emptyList;

public class TokenAuthenticationService {
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    static final String SECRET = "ThisIsASecret";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";

    public static void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
    }

    public static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            Claims claims =  Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();

            String username = claims.getSubject();
             Date expDate = claims.getExpiration();

             // TODO check thời gian hết hạn các kiểu nữa nhé. Ở đây mình viết tạm thế này thôi

            return user != null ?
                    new UsernamePasswordAuthenticationToken(username, null, emptyList()) :
                    null;
        }
        return null;
    }
}
```
Ở đây
- Mã bí mật Secret Key = "ThisIsASecret". Sử dụng thêm SecretKey để tăng tính bảo mật cho thuật toán mã hóa signature (Mình sẽ nói thêm ở phần sau)
- Thuật toán mã hóa: Ở đây mình đang dùng HS256. Nghĩa là HMAC sử dụng SHA-256. Bạn có thể CTRL + Click để xem trong `SignatureAlgorithm`. Ví dụ
```java
public enum SignatureAlgorithm {
    NONE("none", "No digital signature or MAC performed", "None", (String)null, false),
    HS256("HS256", "HMAC using SHA-256", "HMAC", "HmacSHA256", true),
    HS384("HS384", "HMAC using SHA-384", "HMAC", "HmacSHA384", true),
    HS512("HS512", "HMAC using SHA-512", "HMAC", "HmacSHA512", true),
    RS256("RS256", "RSASSA-PKCS-v1_5 using SHA-256", "RSA", "SHA256withRSA", true),
    RS384("RS384", "RSASSA-PKCS-v1_5 using SHA-384", "RSA", "SHA384withRSA", true),
    RS512("RS512", "RSASSA-PKCS-v1_5 using SHA-512", "RSA", "SHA512withRSA", true),
    ES256("ES256", "ECDSA using P-256 and SHA-256", "Elliptic Curve", "SHA256withECDSA", false),
    ES384("ES384", "ECDSA using P-384 and SHA-384", "Elliptic Curve", "SHA384withECDSA", false),
    ES512("ES512", "ECDSA using P-512 and SHA-512", "Elliptic Curve", "SHA512withECDSA", false),
    PS256("PS256", "RSASSA-PSS using SHA-256 and MGF1 with SHA-256", "RSA", "SHA256withRSAandMGF1", false),
    PS384("PS384", "RSASSA-PSS using SHA-384 and MGF1 with SHA-384", "RSA", "SHA384withRSAandMGF1", false),
    PS512("PS512", "RSASSA-PSS using SHA-512 and MGF1 with SHA-512", "RSA", "SHA512withRSAandMGF1", false);

    // Vào file này để xem chi tiết hơn
}
```
Giờ chúng ta đi phân tích phần: Phần **Cấp mã JWT** và phần **dùng JWT để xin quyền truy cập**.
### 3.2.1 Cấp mã JWT
```java
    public static void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
    }
```

Đoạn code trên mình mới chỉ set 2 thuộc tính là `sub` (tương ứng với `setSubject(String)`)  và `exp` (tuơng ứng setExpiration(Date). Bạn cũng có thể set nhiều thuộc tính hơn. Ví dụ
```java
            String JWT = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .setAudience("JWT audience")
                .setIssuedAt(issuedDate)
                .setIssuer("Issuer")
                .setHeaderParam("key1", "value1")
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
```

Bạn có thể set được các paramter trong header, hay các thuộc tính `Reserved` Claims mà mình nhắc tới ở phần trên.

Bạn cũng có thể nghiên cứu để custom nhét thêm thông tin vào claims nhé :D Có thể mình sẽ viết 1 bài riêng để hướng dẫn.

Như các bạn thấy, sau khi build được mã JWT, ta nhét mã JWT vào header của response trả về. Client sẽ lấy nó để làm chìa khóa truy cập resource ở các request sau.

### 3.2.2 Check mã JWT
Xem
```java
public class JWTAuthenticationFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        Authentication authentication = TokenAuthenticationService.getAuthentication((HttpServletRequest) servletRequest);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
```

```java
    public static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            Claims claims =  Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();

            String username = claims.getSubject();
             Date expDate = claims.getExpiration();

             // TODO check thời gian hết hạn các kiểu nữa nhé. Ở đây mình viết tạm thế này thôi

            return user != null ?
                    new UsernamePasswordAuthenticationToken(username, null, emptyList()) :
                    null;
        }
        return null;
    }
```

JWTAuthenticationFilter này hứng request và xác thực bằng việc parsing JWT và kiểm tra các thuộc tính. Ở đây là `username` và `expDate`. Trong hệ thống thực tế, bạn còn phải kiểm tra xem mã này đã hết hạn chưa, các kiểu tùy yêu cầu .v.v.

# 4.  JWT vs Session và khi nào nên chọn JWT?
**Với JWT, hệ thống sẽ:**

* **NO SESSIONS !**

    Với JWT, bạn không cần phải keep session data trên server để xác thực user. Luồng đi sẽ kiểu như thế này:
    - Người dùng gọi authentication service, thường là gửi username/password
    - Authentication service phản hồi cho người dùng mã JWT, cái này sẽ định nghĩa xem user là ai
    - Người dùng yêu cầu truy cập một dịch vụ được bảo mật bằng việc gửi token lên
    - Lớp bảo mật sẽ check chữ ký trên token và nếu đó là quyền truy cập hợp lệ thì được tiếp tục truy cập
* **No sessions storage**

    Ko sử dụng session đòng nghĩa với việc ko cần storage lưu sessions. Nghe qua thì có vẻ ko có gì ấn tượng nhưng việc này thực sự đáng để so sanh một khi ứng dụng của bạn scale ngang. VÍ dụ , nếu bạn chạy một application trên nhiều server, thì việc sử dụng sessions sẽ là một gánh năng. Bạn hoặc sẽ phải cần một server để lưu session hoặc phải share chung disk space trên các con server đó or phải sử dụng sticky session trên load balancer. Không một việc làm nào vừa kể trên là cần thiết nếu bạn không sử dụng sessions để authen.

* **Không cần xử lý các session rác**

    Thông thường, các sessions sẽ có thời hạn hết hạn và cần phải được xử lý kiểu xoá đi các sesssions "rác". JWT hoàn toàn có thể sở hữu chính expiry date của chính nó kèm với dữ liễu user. (Xem phần claims). Cho nên khi tầng Security check authen của JWT, nó có thể check expiry time của token và đơn giản là từ chối truy cập (Mình có đề cập bên trên)

* **Truly RESTful services**

    Chỉ khi ko sử dụng sessions thì bạn mới có thể tạo nên 1 service thuần RESTful, bởi vì một service thuần RESTful được định nghĩa là phải stateless. Với dung lượng nhỏ, JWT có thể được gửi lên với mọi request cũng giống như session cookie. Nhưng ko giống với session cookie, nó ko cần phải trỏ đến bất kì dữ liệu nào được lưu trữ trên server, bản thân JWT đã có dữ liệu.

## 4.1 JWT vs Session
Truớc khi xuất hiện token-based authentication, chúng ta đã có cookied-based authentication, server-based authentication. Như đã biết, HTTP Protocol là stateless, nghĩa là nếu chúng ta xác thực user bằng username/password, thì ở reuquest tiếp theo, hệ thống không biết chúng ta là ai cả. Chúng ta cần phải xác thực 1 lần nữa. Vì thế cần đảm bảo rằng sau khi người dùng đã đăng nhật, trạng thái xác thực vẫn được verified trong mỗi request tiếp sau. 
![](https://images.viblo.asia/719248dd-ae5a-424f-a13a-422fd7351abf.png)

Thông tin đăng nhập của người dùng được gửi dưới dạng POST request lên server. Server xác thực người dùng. Nếu thông tin đăng nhập hợp lệ, hệ thống sẽ phản hồi lại kèm theo 1 cookie, giá trị cookie này sẽ được lưu ở trình duyệt người dùng bao gồm SESSION ID (ví dụ ở Java Frameowork có tên là JSESSSIONID) để định danh 1 người dùng. Session của user sẽ được lưu lại trên server thông qua file hoặc database.  Khi user request tới server, request sẽ kèm theo SESSION ID trong header, SESSIONID này sẽ được authentication server đem ra để so sánh tìm session để kiểm tra trạng thái xác thực (và nhiều thông tin khác nữa). 

![](https://images.viblo.asia/76df664a-fb6c-4cd7-ad93-5e510f7dc574.png)

### 4.1.1 Scalability - Tính mở rộng 
Khi ứng dụng của bạn phát triển và cơ sở người dùng của bạn tăng lên, bạn sẽ phải bắt đầu mở rộng theo chiều ngang hoặc chiều dọc. Session data được lưu trữ trong bộ nhớ trên máy chủ thông qua các tệp hoặc trong cơ sở dữ liệu. Trong kịch bản mở rộng theo chiều ngang, bạn phải bắt đầu Sao chép máy chủ, bạn phải đưa ra một hệ thống lưu trữ phiên trung tâm riêng biệt mà tất cả các máy chủ ứng dụng của bạn có quyền truy cập (Ví dụ lưu trữ session lên 1 server Redis chung). Nếu không, bạn sẽ không thể mở rộng quy mô ứng dụng của mình vì nhược điểm session-store. Một cách để giải quyết thách thức này là sử dụng khái niệm về sticky-session (Với Sticky Session, tất cả các re quét của bạn sẽ được đưa tới cùng một con server vật lý - Bạn có thể google thêm về kĩ thuật này). Các loại cách giải quyết này không thực sự chơi tốt với các ứng dụng lớn hiện đại và phải phát sinh chi phí.

Sử dụng JWT, trong trường hợp này là liền mạch, không cần lưu trữ thông tin người dùng trong session vì xác thực dựa trên token-based là stateless. Ứng dụng của chúng ta có thể mở rộng dễ dàng vì chúng tôi có thể sử dụng token để truy cập tài nguyên từ các máy chủ khác nhau mà không phải lo lắng nếu người dùng thực sự đăng nhập vào một máy chủ cụ thể. Bạn cũng tiết kiệm chi phí vì bạn không cần Máy chủ chuyên dụng để lưu trữ các session của bạn. Tại sao? Bởi vì không có session nào!

**Lưu ý**: Nếu bạn đang xây dựng các ứng dụng nhỏ hoàn toàn không cần phải mở rộng để chạy trên nhiều máy chủ và không cần API RESTful, session chắc chắn sẽ hoạt động tốt cho bạn. Và nếu bạn có thể sử dụng máy chủ chuyên dụng để chạy 1 server/tool như Redis cho việc lưu trữ session, thì session cũng có thể hoạt động hoàn hảo 

### 4.1.2. Security: 
Signing JWTs đã nhằm mục đích ngăn chặn sự giả mạo ở phía máy khách, nhưng chúng cũng có thể được mã hóa để đảm bảo rằng token  rằng mã thông báo mang rất an toàn. Hiện nay JWT chủ yếu được lưu trữ trực tiếp trong bộ lưu trữ web  (local/session storage) hoặc ở cookies. Nói chung, giống như việc sử dụng Cookied-based authentication, việc bạn để mất token (JWT hay SessionID) vào tay người khác cũng đồng nghĩa với việc trao quyền truy cập cho họ. Giống như việc bạn mang chìa khóa nhà mình đi đánh mới cho người khác. Việc của bạn lúc này là phải thay ngay cái ổ khóa mới mà thôi, nghĩa là làm cho cái khóa đang mở được cửa nhà bạn trở nên vô nghĩa. Với JWT, điều này có thể được hạn chế bằng việc rút ngắn thời gian valid (giảm expiration date) để tăng cường độ thay đổi JWT của bạn (giống như việc bạn thay đổi ổ khóa)

Chú ý rằng: Để ngăn chặn việc bị đánh cắp token, sử dụng HTTPS/SSL để đảm bảo rằng Cookies và JWTs luôn được encrypted trong quá trình trao đổi client-sever. (Ví dụ như ngăn ai đó dùng Wireshark  theo đổi request đọc request của bạn)

### 4.1.3 RESTful API Services

### 4.1.4 Performance

Việc phân tích này là cực kì cần thiết. Khi tạo một request từ client tới server, nếu một lượng lớn thông tin đc mã hóa trong JWT, nó sẽ tạo ra một luợng lưu trữ đáng kể trong mỗi HTTP request. Tuy nhiên, với session, thì chỉ có lượng vô cùng nhỏ bởi SESSION ID thực tế chỉ là một chuỗi mã hóa unique để định danh mà ko mang theo thông tin gì khác. Chúng ta sẽ xem ví dụ sau đây:

Một JWT chứ 5 thông tin như sau
```json
{
  "sub": "1234567890",
  "name": "Prosper Otemuyiwa",
  "admin": true,
  "role": "manager",
  "company": "Auth0"
}
```
Khi được mã hóa, dung lượng của JWT này sẽ gấp nhiều lần 1 SESSION_ID (chỉ dùng để định danh), do đó việc tạo ra JWT sẽ nặng hơn đáng kể ở mỗi request. Với session, những thông tin này sẽ có server tìm kiếm dựa vào SESSION ID mà mình gửi lên.

JWT lưu giữ thông tin dưới client (bản thân JWT là một chuỗi chứa thông tin, sau đó dc mã hóa để server side giải mã đọc thông tin). **Điều này giúp mỗi request gửi lên không phải truy vấn quá nhiều và liên tục vào cơ sở dữ liệu** (Như các bạn thấy trong mục **3.2 Hệ thống Verify chuỗi JWT thế nào?** , hệ thống sẽ chỉ cần kiểm tra chữ ký Signature và 1 số thông tin trong claims là đủ). Hãy tưởng tự 1 web page angular với hàng loạt các component thực hiện hàng loạt request tới server. Mỗi request đều cần xác thực để cấp quyền truy cập tài nguyên thì sẽ có bấy nhiêu lần phải truy vấn DB. Với số lượng người dùng lớn đồng thời thì thực sự là có vấn đề đó đúng ko các bạn). Tuy nhiên hãy cẩn trọng đừng đặt quá nhiều claims trong JWT để tránh request quá lớn. (Payload càng nhiều thông tin thì chuỗi JWT càng dài)

.....

# 5. Trả lời câu hỏi về JWT
Các bạn có câu hỏi gì, vui lòng comment phía bên dưới, mình sẽ trả lời ngay trong bài viết này tại phần **5. Trả lời câu hỏi về JWT**

#### Câu số 1: Khi thực hiện verify chuỗi JWT, hệ thống có thực hiện truy vấn DB k?
**Trả lời**: Như ví dụ trên của mình, hệ thống thực hiện verify bằng cách đem so sánh Signature mà client gửi lên (trong bộ **H.P.S)** với Signature chính xác (Là kết quả của HMAC SHA256 chuỗi **H.P**, (có thể là thuật toán khác tùy hệ thống của bạn). Nếu khớp, hệ thống thực hiện kiểm tra thời hạn của JWT bằng trường exp trong payload lấy được sau khi decode. 
Bạn cũng có thể thêm nhiều trường vào trong payload, và sử dụnng trường đó, so sánh với các giá trị liên quan trong DB. Tuy nhiên, nếu làm như thế, thì mình đang thấy bạn đang phá nguyên tắc sử dụng của JWT rồi. Bởi mỗi request gửi lên đều phải thực hiện việc xác thực thông qua truy vấn DB thì sẽ làm giảm performance

#### Câu số 2: Chuỗi JWT gồm 3 phần H.P.S . Vậy tôi lấy được 1 mã đã hết hạn của 1 ai đó, decode lại, sau đó sửa giá trị của exp rồi encode để được chuỗi JWT mới, sau đó thực hiện xác thực thì tôi lại sử dụng bình thường rồi.

**Trả lời**: Phần **Header** và Phần **Payload** thay đổi dẫn tới phần **Signature** cũng sẽ thay đổi. Vấn đề là bạn không có mã bí mật để thực hiện encrypt lấy Signature theo **Header** và **Payload**  mới. Không có Sinagture hợp lệ thì bạn không thể nào truy cập được.

....
Chờ đợi các câu hỏi từ các bạn 

# 6. Tổng kết 

Cảm ơn đã quan tâm theo dõi. Vui lòng đóng góp, commen phía dưới

Bài viết có sự tham khảo tới các bài viết sau:

https://techmaster.vn/posts/33959/khai-niem-ve-json-web-token
https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies