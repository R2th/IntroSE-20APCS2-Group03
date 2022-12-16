![](https://images.viblo.asia/8110174b-d437-4eff-a47f-e416a2dda4c2.png)

Sau một thời gian sử dụng thymeleaf cho các dự án mình nhận thấy việc lựa chọn các view phù hợp với các dự án là hoàn toàn cần thiết và quan trọng. Một trong những view hay sử trong java như jsp, jsf, thymeleaf. Một trong số đó thymeleaf được spring framework khuyến cáo nên sử dụng kết hợp với ứng dụng khi sử dụng spring-boot.

## 1. Thymeleaf là gì?
Thymeleaf là một Java XML/XHTML/HTML5 Template Engine nó có thể làm việc với cả hai môi trường Web và môi trường không phải Web. Nó phù hợp hơn khi được sử dụng để phục vụ XHTML/HTML5 trên tầng View (View Layer) của ứng dụng Web dựa trên kiến trúc MVC. Nó có thể xử lý bất kỳ một file XML nào, thậm trí trên các môi trường offline (Không trực tuyến). Nó hỗ trợ đầy đủ để tương tác với Spring Framework.

Thymeleaf có thể sử dụng để thay thế cho JSP trên tầng View (View Layer) của ứng dụng Web MVC. Thymeleaf là phần mềm mã nguồn mở, được cấp phép theo giấy phép Apache 2.0.

## 2. Ưu điểm khi sử dụng Thymeleaf
Đầu tiên, trên trang chủ của spring framework người ta khuyến cáo nên sử dụng thymeleaf cùng với sping và tất nhiên đã khuyến cáo thì có những ưu điểm như mình vừa nói ở trên. Với Thymeleaf, nó đã viết sẵn một documentation Thymeleaf từ a- z giúp các bạn có thể học nó.

### Thân thiện và gần gủi với các develop

Vì nó có thể sử dụng HTML làm view, với html thì bất kỳ các lập trình viên nào cũng biết, và tất nhiên ta chỉ  sử dụng các file  file HTML làm view, thymeleaf sẽ tham gia vào file HTML dưới dạng các thuộc tính của các thẻ HTML . Ta không cần phải thêm bất cứ loại thẻ non-HTML nào cả. (Ví dụ như jsp thì muốn sử dụng các thẻ chuẩn của jsp như JSTL thì cần có taglib, với thymeleaf thì không cần sử dụng bất kỳ loại thẻ nào khác html nên được gọi là NON-HTML)

Lưu ý: muốn sử dụng được các thuộc tính và để thymeleaf hiểu thì cần sử dụng các dialect.

###  Không cần phải restart lại  web.

Thông thường với các view chúng ta sử dụng với Java như jsp, jsf  muốn nhìn thấy được sự thay đổi của giao diện ta phải F5 lại trang web. Tuy nhiên với  thymeleaf ta không cần F5 (tải lại) lại trang cũng có thể xem các thay đổi trên giao diện, mặc định với thymeleaf nó không thể xử lý được vấn đề này.

### Sử dụng Thymeleaf với Spring
Người dùng Maven có thể thêm phụ thuộc sau vào tệp pom.xml
```
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

Khai báo Thymeleaf trong view
```
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<title>Getting Started: Serving Web Content</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
```

RegistryForm
```
package sample.form;

import java.util.Date;
import java.util.List;

import sample.models.Level;

public class RegistryForm {
	
	private String employeeCode;
	
	private String employeeName;
	
	private String firstName;
	
	private String lastName;
	
	private String joinDate;
	
	private String levelSelect;
	
	private List<Level> level;

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}

	public String getLevelSelect() {
		return levelSelect;
	}

	public void setLevelSelect(String levelSelect) {
		this.levelSelect = levelSelect;
	}

	public List<Level> getLevel() {
		return level;
	}

	public void setLevel(List<Level> level) {
		this.level = level;
	}
	
}
```

```
@RequestMapping(value = "/registry",method = RequestMethod.GET)
	public String registry(Model model) {		
		RegistryForm registryForm = new RegistryForm();
		registryForm.setLevel(levelDao.selectAllLevel());
		model.addAttribute("registryForm",registryForm );
		return "registry";
	}
```

```
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<title>Getting Started: Serving Web Content</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
	<table style="width: 100%">
		<tr>
			<td style="text-align: center;">LOGO</td>
			<td style="text-align: center;"><h1>EDIT/REGISTER EMPLOYEED</h1></td>
		</tr>
	</table>
	<form th:action="@{/registryHandle} " th:object="${registryForm}" method="post">
		<table align="center" >
			<tr>
				<td>Employee Code</td>
				<td><input type="text" th:field="*{employeeCode}" /></td>
			</tr>
			<tr>
				<td>Employee name</td>
				<td><input type="text" th:field="*{employeeName}" /></td>
			</tr>
			<tr>
				<td>Employee First Name</td>
				<td><input type="text" th:field="*{firstName}" /></td>
			</tr>
			<tr>
				<td>Employee Last Name</td>
				<td><input type="text" th:field="*{lastName}" /></td>
			</tr>
			<tr>
				<td>Join Date</td>
				<td><input type="date" th:field="*{joinDate}" /></td>
			</tr>
			<tr>
				<td>Level</td>
				<td><select th:field="*{levelSelect}" >
						<option th:each="i:*{level}" th:value="${i.skillLevel}"
							th:text="${i.levelName}"></option>
				</select></td>
			</tr>

			<tr>
				<td><button type="submit">Submit</button></td>
				<td><button type="reset">Reset</button></td>
			</tr>
		</table>
	</form>
	<!-- <ul th:each="level : ${levels}">
		<li th:text="${level}">1</li>
	</ul> -->
</body>
</html>
```
Từ ví dụ trên các bạn còn băng khoăn về các thuộc tính của thymeleaf:
Chúng ta tìm hiểu về một trong những phần quan trọng nhất của Thymeleaf Standard Dialect: cú pháp biểu thức tiêu chuẩn của Thymeleaf.

Chúng ta đã thấy hai loại giá trị thuộc tính hợp lệ được thể hiện trong cú pháp này: 
```
<form th:action="@{/registryHandle} " th:object="${registryForm}" method="post">
<td><input type="text" th:field="*{employeeCode}" /></td>
```

Nhưng có nhiều loại biểu thức hơn, và nhiều chi tiết thú vị hơn để tìm hiểu về những loại chúng ta đã biết. Trước tiên, hãy để Lôi xem một bản tóm tắt nhanh về các tính năng Biểu thức Chuẩn:
Simple expressions:
* Biểu thức biến: $ {...}
* Lựa chọn biểu thức biến: * {...}
* Biểu thức tin nhắn: # {...}
* Biểu thức URL liên kết: @ {...}
* Biểu thức phân đoạn: ~ {...}

Literals
* Text literals: 'one text', 'Another one!',…
* Number literals: 0, 34, 3.0, 12.3,…
* Boolean literals: true, false
* Null literal: null
* Literal tokens: one, sometext, main,…

Thao tác với văn bản:
* Nối chuỗi: +
* Thay thế bằng chữ: | Tên là $ {name} |

Các phép tính toán học:
* Toán tử nhị phân: +, -, *, /,%
* Dấu trừ (toán tử đơn nguyên): -

Hoạt động Boolean:
* Toán tử nhị phân: and, or
* Phủ định Boolean (toán tử đơn nguyên):!, not
So sánh và bình đẳng:
* Bộ so sánh:>, <,> =, <= (gt, lt, ge, le)
* Toán tử đẳng thức: == ,! = (eq, ne)
Toán tử có điều kiện:
* Nếu-thì: (if)? (then)
* If-then-other: (if)? (then): (other)
* Default: (value) ?: (defaultvalue)