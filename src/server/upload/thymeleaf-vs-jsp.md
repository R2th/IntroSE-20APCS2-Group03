Ở bài viết này, tôi sẽ viết một ứng dụng Spring MVC ,  sử dụng JSP và thymeleaf.
### Yêu cầu chung
Khách của tôi sẽ đăng ký thành viên với 2 thông tin như sau:
* Địa chỉ email
* Loại đăng ký

Ứng dụng của tôi sẽ có 2 @Controller, nó sẽ có code giống nhau tuy nhiên nó sẽ chuyển về 2 view khác nhau:
* Đăng ký bằng trang được viết bằng JSP (subscribejsp view).
* Đăng ký bằng trang được viết bằng thymeleaf (subscribeth view).

Tôi sẽ có các class sau:
* Form đăng ký sẽ có 2 trường: String email và String type
* Type có gía trị EMAILS và DAILY_DIGEST
### JSP
![](https://images.viblo.asia/1f0ef66c-dd87-49f1-8ec5-f9b495876581.png)
Đây là code JSP page sử dụng thư viện JSTL (core) và Spring (tags và form):
SubscribeJsp.jsp
```
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
 
<html>
 
  <head>
    <title>Spring MVC view layer: Thymeleaf vs. JSP</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" media="all" href="<s:url value='/css/thvsjsp.css' />"/>
  </head>
 
  <body>
 
    <h2>This is a JSP</h2>
 
    <s:url var="formUrl" value="/subscribejsp" />
    <sf:form modelAttribute="subscription" action="subscribeMe">
 
      <fieldset>
 
        <div>
          <label for="email">Email: </label>
          <sf:input path="email" />
        </div>
        <div>
          <label>Type: </label>
          <ul>
              <li>
                <sf:radiobutton path="type" value="Email" />
                <label for="subscriptionType1">
                  All emails
                </label>
              </li>
              <li>
                <sf:radiobutton path="type" value="Digest" />
                <label for="subscriptionType2">
                  All Digests
                </label>
              </li>
          </ul>
        </div>
 
        <div class="submit">
          <button type="submit" name="save">SUBSCRIBE ME</button>
        </div>
 
      </fieldset>
 
    </sf:form>
 
  </body>
 
</html>
```

### Thymeleaf
![](https://images.viblo.asia/7c3db40d-55db-4866-ba25-217c7df66522.png)
Code thymeleaf:
SubscribeTh.html

```
<!DOCTYPE html>
 
<html xmlns:th="http://www.thymeleaf.org">
 
  <head>
    <title>Spring MVC view layer: Thymeleaf vs. JSP</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" media="all"
      href="../../css/thvsjsp.css" th:href="@{/css/thvsjsp.css}"/>
  </head>
 
  <body>
 
    <h2>This is a Thymeleaf template</h2>
 
    <form action="#" th:object="${subscription}" th:action="@{/subscribeth}">
 
      <fieldset>
 
        <div>
          <label for="email">Email: </label>
          <input type="text" th:field="*{email}" />
        </div>
        <div>
          <label>Type: </label>
          <ul>
            <li>
              <input type="radio" th:field="*{type}" th:value="email" />
              <label>All emails</label>
            </li>
            <li>
              <input type="radio" th:field="*{type}" th:value="digest" />
              <label>All Digest</label>
            </li>
            <li th:remove="all"><input type="radio" /> <label>Second Type</label></li>
          </ul>
        </div>
 
        <div class="submit">
          <button type="submit" name="save">Subscribe me!</button>
        </div>
 
      </fieldset>
 
    </form>
 
  </body>
 
</html>
```
### Ưu và nhược điểm của JSP
Ưu điểm:
* Cho phép chúng ta thiết kế giao diện web dễ dàng hơn.
* Jsp có thể cho phép chúng ta tạo nên những trang web động.
* Có thể viết một nơi và chạy bất cứ nơi nào.

Nhược điểm
* Nhìn chung thì việc thiết kế giao diện bằng JSP vẫn còn nhiều khó khăn.
* Tiêu tốn dung lượng lưu trữ phía server gấp đôi
* Lần đầu tiên truy cập vào trang JSP sẽ mất nhiều thời gian chờ

### Ưu và nhược điểm của Thymeleaf
Ưu điểm:
* ThymeLeaf là một dự án nguồn mở lành mạnh: các tính năng mới được phát hành mỗi tháng, tài liệu tốt...
* Đây là công cụ template lý tưởng
* Expression Language được sử dụng nhiều hơn JSP Expression Language.
* Không giống như các tệp JSP, Thymeleaf hoạt động tốt đối với các email Rich HTML (xem http://www.thymeleaf.org/springmail.html).

Nhược điểm:
* Thymeleaf không có hỗ trợ thư viện thẻ JSP
* Thymeleaf chưa có thẻ tương đương với các thẻ custom.

Link tham khảo: https://www.dineshonjava.com/thymeleaf-vs-jsp-spring-mvc-view-layer/#.WEkLzLKLTig