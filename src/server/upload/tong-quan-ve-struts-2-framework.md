> Đối với các bạn lập trình viên java web. Chắc hẳn đã từng nghe khá nhiều về Apache Struts. vậy Apache Struts là gì, sự khác nhau giữa Struts 1 và Struts 2 là như thế nào? Ứng dụng Struts 2 vào dự án thực tế. Các bạn hãy cùng mình tìm hiểu ngay trong bài viết này.

# Apache Struts là gì?
Apache Struts là một framwork mã nguồn mở cho việc phát triển các ứng dụng web bằng J2EE. Nó sử dụng và mở rộng Java Servlet API để giúp cho các lập trình viên áp dụng kiến trúc MVC (Model-view-controller).

Struts ra đời bởi Craig McClanahan và được Apache hỗ trợ từ tháng 5, 2000. Đến tháng 6/2001, Struts 1.0 được công bố. Phiên bản hiện tại là Struts 2.5.20 được công bố 14/01/2019. Struts 2 là sự kết hợp của Webwork Framework và Struts 1.
Struts Framework hỗ trợ 02 thành phần chính đó là View và Controller, thành phần Model không được hỗ trợ nhiều bởi vì Struts Framework hướng tới lấy hay kết nối thành phần xử lý từ middleware application server.

### Các thành phần của Struts Framework
* Basic: hỗ trợ các thành phần cơ bản để xây dựng ứng dụng web trên nền tảng MVC2
* Tag Libraries: hỗ trợ một số tag library để xây dựng ứng dụng nhưng Struts có khả năng không cần dùng tag library này mà dùng trực tiếp luôn HTML control
* Tiles Plugins: hỗ trợ việc xây dựng ứng dụng theo dạng Master Page để áp dụng trên toàn trang web
* Validator Plugins: hỗ trợ validation trên phía server thông qua việc cấu hình thông tin các form và control nhập liệu trên xml.
### Cơ chế hoạt động của Struts Framework.
![](https://images.viblo.asia/36eebdd6-1079-4c5e-ae7f-c3a1707cf7bb.jpg)
* Khi user gửi yêu cầu truy xuất ứng dụng web, request được chuyển đến ActionServlet, đây là Servlet được tạo sẵn trong Framework để làm chức năng như Controller
* Action Server trích xuất thành phần request nhận được để so sánh với nội dung được mapping trong tập tin cấu hình struts-config.xml để tìm ra các thành phần tương ứng cấn xử lý
* Nếu không tìm thấy sẽ báo lỗi 404 hay lỗi tương ứng. Ngược lại, nếu tìm thấy sẽ xác định action và View tương ứng của phần xử lý. View ở đây bao gồm form đón giá trị nhập và kết xuất để trả về người dùng
* Giá trị tương ứng của form nhập được lưu trữ vào Form Bean, thực tế là một Java Object  (Action Form) có chứa các thuộc tính – state và các phương thức truy cập get, set. Tại đây, nếu có áp dụng validation thì dữ liệu được checking, checking thành công thì mới được lưu trữ vào form bean và kích hoạt chuyển dữ liệu của FormBean đến Action tương ứng để xử lý
* Action khi đón nhận FormBean sẽ gọi thành phần xử lý tương ứng tư Java Bean hay Java Object tương ứng hay kết nối lấy dữ liệu từ DB về nếu có để xử lý
* Sau khi xử lý hoàn tất, Action sẽ phải trả kết quả trở về Action Servlet đồng thời mapping trong struts-config.xml để xác định view kết xuất cho người dùng dựa trên kết quả xử lý trên struts-config.
* Khi xác định xong, dữ liệu từ kết quả xử lý Action và Form Bean sẽ được đổ vào trang JSP kêt xuất tương ứng và kết quả thành công chuyển về Action Servlet
* Action Servlet response kết quả về client – hoàn tất quá trình xử lý.

# Tổng quan về Struts 2 Framework.
Struts2 là framework được sử dụng để tạo ứng dụng web dựa trên mẫu thiết kế MVC. Struts2 không chỉ là phiên bản tiếp theo của Struts1, mà nó là bản nâng cấp hoàn chỉnh của kiến trúc Struts, đơn giản hóa hơn mô hình Struts 1 Framework như là rút gọn tập tin cấu hình hay sử dụng annotation thay thế cho tập tin cấu hình.

#### Một số đặc tính cải tiến của Strut2 Framework
* JavaBeans được sử dụng thay thế Action form và có phương thức chỉ định để kích hoạt thực thi (mặc định là phương thức execute không có tham số truyền và kiểu trả về là kiểu String) nhằm tăng khả năng tái sử dụng của các object trong các ứng dụng và các framework khác. Đặc biệt, chúng dễ dàng thuật tiện cho testing từng thành phần chức năng và thành phần
* Sử dụng cả annotation và tập tin cấu hình XML rút gọn
* Sử dụng ngôn ngữ mới Object Graphic Notation Language (OGNL) thay thế cho EL của JSP
* Sử dụng bộ taglib duy nhất thay cho 4-5 bộ taglib trong Struts 1 Framework và JSTL 1.1 trong JSP.
* Các POJO form và POJO action: Struts2 đã loại bỏ các Form Action mà là một phần không thể tách rời của Struts framework. Với Struts2, bạn có thể sử dụng bất kỳ POJO nào để nhận dữ liệu từ form. Tương tự như vậy, với Struts2 bạn có thể xem bất kỳ POJO nào làm lớp Action.
* Hỗ trợ thẻ: Struts2 đã cải tiến các thẻ form và các thẻ mới nhằm giúp các nhà phát triển viết mã ít hơn.
* Hỗ trợ AJAX: Struts2 đã công nhận sự tiếp quản của các công nghệ Web2.0 và đã tích hợp hỗ trợ AJAX vào sản phẩm bằng cách tạo các thẻ AJAX có chức năng rất giống với các thẻ Struts2 tiêu chuẩn.
* Tích hợp dễ dàng: Việc tích hợp Struts2 với các framework khác như Spring, Tiles và SiteMesh giờ đây đã trở nên dễ dàng hơn.
* Hỗ trợ Template: Hỗ trợ tạo ra các view bằng việc sử dụng các tamplate.
* Hỗ trợ Plugin: Các hành vi của core Struts2 có thể được cải tiến bằng cách sử dụng các plugin. Hiện nay có khá nhiều plugin có sẵn cho Struts2.
* Profiling: Struts2 cung cấp tích hợp profiling để gỡ lỗi ứng dụng. Ngoài ra, Struts cũng cung cấp gỡ lỗi được tích hợp với sự trợ giúp của công cụ gỡ lỗi được xây dựng bên trong.
* Dễ dàng sửa đổi các thẻ Tag markups trong Struts2 có thể được tinh chỉnh bằng cách sử dụng các mẫu Freemarker. Điều này không yêu cầu kiến ​​thức JSP hoặc java. Bạn có kiến thức cơ bản về HTML, XML và CSS đủ để sửa đổi các thẻ.
* Cấu hình ít hơn: Struts2 giúp bạn cấu hình ít hơn với sự trợ giúp của việc sử dụng các giá trị mặc định cho các cài đặt khác nhau. Bạn không cần phải cấu hình một cái gì đó trừ khi bạn muốn thiết lập khác các thiết lập mặc định được thiết lập bởi Struts2.
* Các công nghệ View: Struts2 có một sự hỗ trợ tuyệt vời cho nhiều lựa chọn view (JSP, Freemarker, Velocity và XSLT)

 Các bạn hãy xem hình dưới đây để hiểu rõ hơn về sự khác biệt giữa Struts 1 va Struts 2.
 
![](https://images.viblo.asia/5e3f592f-64fb-485e-be7e-ee14743b9dc4.png)

### Cơ chế hoạt động của Struts 2 Framework.
Cơ chế hoạt động tương tự như mô hình MVC của Struts1 Framework nhưng điểm khác biệt nó là pull-framework nghĩa là dữ liệu được lấy trực tiếp từ action để đưa đến view.
1. Controller: FilterDispatcher là servlet Filter có nhiệm vụ đón nhận request và dựa trên cấu hình (có thể là xml hay annotation) để xác định action cụ thể để đón nhận request cho xử lý
1. Model: Action là một java class đảm bảo đặc tính của một object trong mô hình hướng đối tượng và thỏa tính chất của JavaBean
1. View: Result là một kết xuất hay một dạng xác định action hay trang chuyển về và trình bày trên Web Browser.
![](https://images.viblo.asia/58e699d8-4cfb-4316-81b1-31a3206ed9aa.png)

Dựa trên digram ở trên, có thể giải thích vòng đời của một request của người dùng trong Struts2 như sau:
* Người dùng gửi request tới máy chủ để yêu cầu một số tài nguyên (ví dụ các trang).
* FilterDispatcher xem xét yêu cầu và sau đó xác định action thích hợp.
* Chức năng interceptor đã cấu hình được áp dụng như xác nhận hợp lệ, upload file, vv
* Action đã chọn được thực thi để thực hiện thao tác được yêu cầu.
* Một lần nữa, interceptor đã cấu hình được áp dụng để thực hiện bất kỳ post-processing nếu cần thiết.
* Cuối cùng kết quả được chuẩn bị bởi view và trả kết quả cho người dùng.
# Ứng dụng hello world với Struts 2.
Sau đây mình sẽ hướng dẫn các bạn tạo ứng dụng hello world với Struts 2 trên IDE Intellij.
* Tạo project maven với cấu trúc như sau:
![](https://images.viblo.asia/3e940ec1-0df4-403c-a33c-2af12822aa20.png)
* nội dung file pom.xml
```
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sun.struts.example</groupId>
    <artifactId>struts-example</artifactId>
    <packaging>war</packaging>
    <version>0.0.1-SNAPSHOT</version>
    <name>Simple Struts CRUD</name>
    <description>Simple in-memory CRUD Struts 2 example application</description>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <struts2.version>2.3.16.1</struts2.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.apache.struts</groupId>
            <artifactId>struts2-core</artifactId>
            <version>${struts2.version}</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.4</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <finalName>struts-crud</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.mortbay.jetty</groupId>
                <artifactId>jetty-maven-plugin</artifactId>
                <version>8.1.7.v20120910</version>
                <configuration>
                    <stopKey>CTRL+C</stopKey>
                    <stopPort>8999</stopPort>
                    <scanIntervalSeconds>10</scanIntervalSeconds>
                    <scanTargets>
                        <scanTarget>src/main/webapp/WEB-INF/web.xml</scanTarget>
                    </scanTargets>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
* Nội dung file web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_ID" version="2.4" xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
    <display-name>Struts Simple CRUD</display-name>
    <filter>
        <filter-name>struts2</filter-name>
        <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>struts2</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```
* Tạo file Employee.java
```
package com.sun.struts.example.model;

import java.io.Serializable;

public class Employee implements Serializable {

    private Integer employeeId;

	private Integer age;

	private String firstName;

	private String lastName;


	public Employee() {
	}

	public Employee(Integer employeeId, String firstName, String lastName, Integer age) {
		this.employeeId = employeeId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}

	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
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

}
```
* Tạo file EmployeeDao.java
```
package com.sun.struts.example.dao;

import com.sun.struts.example.model.Employee;

import java.util.List;

public interface EmployeeDao {

    public List getAllEmployees();

    public Employee getEmployee(Integer id);

    public void update(Employee emp);

    public void insert(Employee emp);

    public void delete(Integer id);

}
```
* Tạo file InMemoryEmployeeDao.java
```
package com.sun.struts.example.dao;

import com.sun.struts.example.model.Employee;

import java.util.ArrayList;
import java.util.List;

public class InMemoryEmployeeDao implements EmployeeDao {

    private static ArrayList<Employee> employees;

    static {
        employees = new ArrayList<Employee>();
        employees.add(new Employee(1, "Quang", "Hòa", 26));
        employees.add(new Employee(2, "Quang", "Thuận", 18));
    }

    @Override
    public List getAllEmployees() {
        return employees;
    }

    @Override
    public Employee getEmployee(Integer id) {
        Employee emp = null;
        for (Employee employee : employees) {
            emp = employee;
            if (emp.getEmployeeId().equals(id)) {
                break;
            }
        }
        return emp;
    }

    @Override
    public void update(Employee emp) {
        Integer id = emp.getEmployeeId();
        for (int i = 0; i < employees.size(); i++) {
            Employee tempEmp = employees.get(i);
            if (tempEmp.getEmployeeId().equals(id)) {
                employees.set(i, emp);
                break;
            }
        }
    }

    @Override
    public void insert(Employee emp) {
        int lastId = 0;
        for (Employee temp : employees) {
            if (temp.getEmployeeId() > lastId) {
                lastId = temp.getEmployeeId();
            }
        }
        emp.setEmployeeId(lastId + 1);
        employees.add(emp);
    }

    @Override
    public void delete(Integer id) {
        for (int i = 0; i < employees.size(); i++) {
            Employee tempEmp = employees.get(i);
            if (tempEmp.getEmployeeId().equals(id)) {
                employees.remove(i);
                break;
            }
        }
    }
}
```
* Tạo file EmployeeService.java
```
package com.sun.struts.example.service;

import com.sun.struts.example.model.Employee;

import java.util.List;

public interface EmployeeService {

    public List getAllEmployees();

    public void updateEmployee(Employee emp);

    public void deleteEmployee(Integer id);

    public Employee getEmployee(Integer id);

    public void insertEmployee(Employee emp);
}
```
* Tạo file DefaultEmployeeService.java
```
package com.sun.struts.example.service;

import com.sun.struts.example.model.Employee;
import com.sun.struts.example.dao.EmployeeDao;
import com.sun.struts.example.dao.InMemoryEmployeeDao;

import java.util.List;

public class DefaultEmployeeService implements EmployeeService {

    private EmployeeDao dao;

    public DefaultEmployeeService() {
        this.dao = new InMemoryEmployeeDao();
    }

    @Override
    public List getAllEmployees() {
        return dao.getAllEmployees();
    }

    @Override
    public void updateEmployee(Employee emp) {
        dao.update(emp);
    }

    @Override
    public void deleteEmployee(Integer id) {
        dao.delete(id);
    }

    @Override
    public Employee getEmployee(Integer id) {
        return dao.getEmployee(id);
    }

    @Override
    public void insertEmployee(Employee emp) {
        dao.insert(emp);
    }
}
```
* Tạo file EmployeeAction.java
```
package com.sun.struts.example.action;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;
import com.sun.struts.example.model.Employee;
import com.sun.struts.example.service.DefaultEmployeeService;
import com.sun.struts.example.service.EmployeeService;

import java.util.List;

public class EmployeeAction extends ActionSupport implements Preparable {
    private EmployeeService empService = new DefaultEmployeeService();
    
    private Employee employee;
    private List employees;

    @Override
    public void prepare() throws Exception {
        if (employee != null && employee.getEmployeeId() != null) {
            employee = empService.getEmployee(employee.getEmployeeId());
        }
    }

    public String save() {
        if (employee.getEmployeeId() == null) {
            empService.insertEmployee(employee);
        } else {
            empService.updateEmployee(employee);
        }
        return SUCCESS;
    }

    public String delete() {
        empService.deleteEmployee(employee.getEmployeeId());
        return SUCCESS;
    }

    public String list() {
        employees = empService.getAllEmployees();
        return SUCCESS;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List getEmployees() {
        return employees;
    }
}
```
* Tạo file validate form EmployeeAction-validation.xml
```
<!DOCTYPE validators PUBLIC "-//Apache Struts//XWork Validator 1.0.3//EN"
		"http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
<validators>
  <field name="employee.firstName">
     <field-validator type="requiredstring">
          <message key="errors.required.firstname"/>
      </field-validator>
  </field>
  <field name="employee.lastName">
     <field-validator type="requiredstring">
          <message key="errors.required.lastname"/>
      </field-validator>
  </field>
  <field name="employee.age">
     <field-validator type="required" short-circuit="true">
          <message key="errors.required.age"/>
      </field-validator>
      <field-validator type="int">
      		<param name="min">18</param>
      		<param name="max">65</param>
          	<message key="errors.required.age.limit"/>
      </field-validator>
  </field>
</validators>
```
* Tạo file guest.properties lưu label, error message.
```
#labels
application.title=Employee Application
label.employees=Employees
label.employee.edit=Edit
label.employee.delete=Delete
label.employee.add=Add Employee
label.firstName=First Name
label.lastName=Last Name
label.age=Age

#button labels
button.label.submit=Submit
button.label.cancel=Cancel

##-- errors
errors.required.firstname=Name is required.
errors.required.lastname=Last name is required.
errors.required.age=Please provide an age.
errors.required.age.limit=Please provide an age between ${min} and ${max}.
```
* Tạo file struts.properties lưu config cho framwork.
```
struts.custom.i18n.resources=guest
struts.mapper.action.prefix.enabled=true
```
* Tạo file struts.xml 
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
<struts>
    <constant name="struts.devMode" value="true"/>

    <package name="default" namespace="/" extends="struts-default">
        <interceptors>
            <interceptor-stack name="appDefault">
                <interceptor-ref name="paramsPrepareParamsStack">
                    <param name="exception.logEnabled">true</param>
                    <param name="exception.logLevel">ERROR</param>
                    <param name="params.excludeParams">dojo\..*,^struts\..*,^session\..*,^request\..*,^application\..*,^servlet(Request|Response)\..*,parameters\...*,submit</param>
                </interceptor-ref>
            </interceptor-stack>
        </interceptors>
		
        <default-interceptor-ref name="appDefault" />        
        
        <default-action-ref name="index"/>
		
        <action name="index" class="com.sun.struts.example.action.EmployeeAction" method="list">
            <result name="success">/WEB-INF/jsp/employees.jsp</result>
            <interceptor-ref name="basicStack"/>
        </action>
        <action name="*Employee" class="com.sun.struts.example.action.EmployeeAction" method="{1}">
            <result name="success" type="redirectAction">index</result>
            <result name="input">/WEB-INF/jsp/employeeForm.jsp</result>
        </action>
    </package>
</struts>
```
* Tạo file main.css
```
html, body  {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    color: black;
    background-color: white;
    font-family: Verdana, Arial, sans-serif;
    font-size:12px;
    width: 300px;
}
.titleDiv {

    background-color: #EFFBEF;
    font-weight:bold;
    font-size:18px;
    text-align:left;
    padding-left:10px;
    padding-top:10px;
    padding-bottom:10px;
    border:2px solid #8F99EF;
}
h1 { font-weight:bold; color: brown; font-size:15px; text-align:left;}

td { font-size:12px; padding-right:10px; }
th { text-align:left; font-weight:bold; font-size:13px; padding-right:10px; }
.tdLabel { font-weight: bold; white-space:nowrap; vertical-align:top;}

A { color:#4A825A; text-decoration:none;}
A:link { text-decoration:none;}
A:visited { text-decoration:none;}
A:hover { text-decoration:none; color: red;}

.borderAll {
    width: 300px;
    border: 2px solid #8F99EF;
}

.butStnd {
    font-family:arial,sans-serif;
    font-size:11px;
    width:105px;
    background-color:#DCDFFA ;color:#4A825A;font-weight:bold;
}

.error {
    color: red;
    font-weight: bold;
}
.errorSection {
    padding-left:18px;
    padding-top:2px;
    padding-bottom:10px;
    padding-right:5px;
}

.even { background-color: #EFFBEF; }
.odd { background-color: white; }

.nowrap { white-space:nowrap; }
```
* Tạo file employees.jsp
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <link href="<s:url value='/css/main.css'/>" rel="stylesheet" type="text/css"/>
    <title><s:text name="label.employees"/></title>
</head>
<body>
<div class="titleDiv"><s:text name="application.title"/></div>
<h1><s:text name="label.employees"/></h1>
<s:url id="url" action="inputEmployee" />
<a href="<s:property value="#url"/>"><s:text name="label.employee.add"/></a>
<br/><br/>
<table class="borderAll">
    <tr>
        <th><s:text name="label.firstName"/></th>
        <th><s:text name="label.lastName"/></th>
        <th><s:text name="label.age"/></th>
        <th>&nbsp;</th>
    </tr>
    <s:iterator value="employees" status="status">
        <tr class="<s:if test="#status.even">even</s:if><s:else>odd</s:else>">
            <td class="nowrap"><s:property value="firstName"/></td>
            <td class="nowrap"><s:property value="lastName"/></td>
            <td class="nowrap"><s:property value="age"/></td>
            <td class="nowrap">
                <s:url action="inputEmployee" id="url">
                    <s:param name="employee.employeeId" value="employeeId"/>
                </s:url>
                <a href="<s:property value="#url"/>"><s:text name="label.employee.edit"/></a>
                &nbsp;&nbsp;&nbsp;
                <s:url action="deleteEmployee" id="url">
                    <s:param name="employee.employeeId" value="employeeId"/>
                </s:url>
                <a href="<s:property value="#url"/>"><s:text name="label.employee.delete"/></a>
            </td>
        </tr>
    </s:iterator>
    </table>
</body>
</html>
```
* Tạo file employeeForm.jsp
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<s:if test="employee==null || employee.employeeId == null">
	<s:set name="title" value="%{'Add new employee'}"/>
</s:if>
<s:else>
	<s:set name="title" value="%{'Update employee'}"/>
</s:else>

<html>
<head>
    <link href="<s:url value='/css/main.css'/>" rel="stylesheet" type="text/css"/>
    <style>td { white-space:nowrap; }</style>
    <title><s:property value="#title"/></title>
</head>
<body>
<div class="titleDiv"><s:text name="application.title"/></div>
<h1><s:property value="#title"/></h1>
<s:actionerror />
<s:actionmessage />
<s:form action="saveEmployee" method="post" cssStyle="width: 300px">
    <s:textfield name="employee.firstName" value="%{employee.firstName}" label="%{getText('label.firstName')}" size="40"/>
    <s:textfield name="employee.lastName" value="%{employee.lastName}" label="%{getText('label.lastName')}" size="40"/>
    <s:textfield name="employee.age" value="%{employee.age}" label="%{getText('label.age')}" size="20"/>
    <s:hidden name="employee.employeeId" value="%{employee.employeeId}"/>
    <s:submit value="%{getText('button.label.submit')}"/>
    <s:submit value="%{getText('button.label.cancel')}" action="index"/>
</s:form>
</body>
</html>
```
* Tải tomcat server [tại đây](https://tomcat.apache.org/download-80.cgi#8.5.39).
* Cấu hình tomcat local.
![](https://images.viblo.asia/a13ce63e-b021-4ec5-9147-29adfbca1263.png)
* Run ứng dụng với tomcat, mở trình duyệt và nhập http://localhost:8080/struts_example_war. Kết quả sẽ như hình.
![](https://images.viblo.asia/b1e82760-fd75-4d8b-81d5-10d5559c6e11.png)

Bài viết có sử dụng tài liệu tham khảo từ các nguồn sau :
https://www.tutorialspoint.com/struts_2/struts_overview.htm

http://www.kieutrongkhanh.net/2016/08/tong-quan-ve-struts-2-framework-mot_18.html