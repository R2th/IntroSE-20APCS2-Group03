# Thế nào là kỹ thuật tấn công Csrf
Nói tóm gọn, đây là kỹ thuật thông qua việc người dùng đồng thời tương tác với nhiều website, một trang web xấu nào đấy sẽ lợi dụng việc bạn đang trong 1 session mà chưa đăng xuất để send một request ẩn với mục đích xấu. Ví dụ sau đây sẽ giúp bạn dễ hình dung...

Một ngân hàng nọ có một form để chuyển tiền từ tài khoản đang đăng nhập tới một tài khoản ngân hàng khác :
> POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

> amount=100.00&routingNumber=1234&account=9876
 
Trên website có ý đồ xấu, sẽ tồn tại một form ẩn có nội dung đại khái như sau :
```
<form action="https://bank.example.com/transfer" method="post">
<input type="hidden"
	name="amount"
	value="100.00"/>
<input type="hidden"
	name="routingNumber"
	value="evilsRoutingNumber"/>
<input type="hidden"
	name="account"
	value="evilsAccountNumber"/>
<input type="submit"
	value="Win Money!"/>
</form>
```

Khi người dùng bấm vào một button bất kỳ(vô ý hay chủ ý), hoặc đơn giản thông qua một event js nào đấy, lệnh submit này sẽ vô tình được kích hoạt. Và do đó, 100$ cứ thế theo gió vô tình biến mất khỏi tài khoản...

# Cách xử lý
Một cách để giải quyết vấn đề trên, đó là sử dụng một loại token để xác thực. Khi một request được submit, server phải kiểm tra token này, không đúng => fail

Bằng cách tránh việc lồng random token vào HTTP GET, ta có thể ngăn việc token bị lộ ra ngoài. Request đại khái sẽ thay đổi như sau :
```
POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876&_csrf=<secure-random>
```

# Config với spring
Điều đầu tiên là bạn phải sử dụng giao thức HTTP, và như đã đề cập ở trên, ta phải hạn chế sử dụng HTTP GET vì nó có thể làm leak thông tin. Ở Spring Security 4.0, có thể được disable thông qua XML :
```
<http>
	<!-- ... -->
	<csrf disabled="true"/>
</http>
```
hoặc thông qua class configuration :
```
@EnableWebSecurity
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable();
	}
}
```

Gán các biến param của Csrf trong form(Spring Security đã cung cấp một class sẵn, bạn chỉ cần apply thôi). Và thường thì 1 form sẽ có cấu trúc như này :
```
<c:url var="logoutUrl" value="/logout"/>
<form action="${logoutUrl}"
	method="post">
<input type="submit"
	value="Log out" />
<input type="hidden"
	name="${_csrf.parameterName}"
	value="${_csrf.token}"/>
</form>
```
```
package org.springframework.security.web.csrf;

import java.io.Serializable;

/**
 * Provides the information about an expected CSRF token.
 *
 * @see DefaultCsrfToken
 *
 * @author Rob Winch
 * @since 3.2
 *
 */
public interface CsrfToken extends Serializable {
```

Một cách khác là khi ta đã sử dụng annotation @EnableWebSecurity và xài tag <form:form> do Spring MVC cung cấp(hoặc các tag do Thymleaf cung cấp, các thẻ input trong form sẽ được auto render nên sẽ hạn chế được việc tấn công Csrf) => `CsrfToken` sẽ tự động được lồng vào form

# Về Ajax và JSON Requests
Không thể submit Csrf token thông qua HTTP parameter với việc sử dụng JSON, do đó bạn có thể submit token bên trong HTTP header : 
```
<html>
<head>
	<meta name="_csrf" content="${_csrf.token}"/>
	<!-- default header name is X-CSRF-TOKEN -->
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
	<!-- ... -->
</head>
<!-- ... -->
```

Và khi submit request bên JS, ta xử lý như sau :
```
$(function () {
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
	xhr.setRequestHeader(header, token);
});
});
```

## Set Csrf token dưới Cookie
Sẽ có trường hợp ta muốn set token dưới cookie. Mặc định `CookieCsrfTokenRepository` sẽ set một cookie với name `XSRF-TOKEN` và get nó lên từ header có name X-XSRF-TOKEN hoặc parameter có name `_csrf`.

Trường hợp config bằng XML :
```
<http>
	<!-- ... -->
	<csrf token-repository-ref="tokenRepository"/>
</http>
<b:bean id="tokenRepository"
	class="org.springframework.security.web.csrf.CookieCsrfTokenRepository"
	p:cookieHttpOnly="false"/>
```
Hoặc config configuration bean :
```
@EnableWebSecurity
public class WebSecurityConfig extends
		WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf()
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	}
}
```
# Một số vấn đề liên quan
## Timeouts
Csrf token sẽ được lưu trữ trong HttpSession, vậy nên nếu session hiện tại của bạn đã expired thì dĩ nhiên token đó khi submit lên sẽ được tính là invalid. Đồng thời, nếu sử dụng default filter `AccessDeniedHandler` thì đối với invalid token/request gửi đến thì browser sẽ nhận về trang 403.


Việc set token dưới cookie không được commend bởi vì các website có ý đồ xấu sẽ có thể lấy được dữ liệu từ cookie.


Về lý thuyết, ta đã hiểu được định nghĩa, cách thức hoạt động, cách config cơ bản về vấn đề Csrf. Nhưng vì vấn đề document chỉ hướng cho ta đến bề nổi, đơn giản nhất về Csrf, đến đây mình vẫn chưa xác định được cách bên Server side sẽ valid được Csrf token như thế nào. Hoặc Spring Boot sẽ đảm nhiệm luôn valid từng request, generate random token luôn để tối giản luôn việc config dùm developer.


Lần tới, mình sẽ cố gắng làm một ví dụ thực tế, show kết quả, và tìm hiểu kỹ hơn về các vấn đề khi login, logout, xử lý js và cách server side hoạt động thế nào...ở bài sau. Thanks.

Nguồn : https://docs.spring.io/spring-security/site/docs/current/reference/html/csrf.html