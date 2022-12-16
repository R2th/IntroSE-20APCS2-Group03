# Hiển thị log của request và response trong Spring Boot

<br>
<br>
<br>

### I. Giới thiệu

<br>

Đối với bạn làm backend thì việc viết API đã không còn là gì xa lạ nữa. Nhưng khi gặp vấn đề thì việc kiểm tra log đã là việc bắt buộc và không thể thiếu. Với API thì việc xem log request và response cũng là một biện pháp mạnh giúp develop điều tra ra nguyên nhân bug. Vậy ở bài này, mình sẽ hướng dẫn các bạn config project sao cho show được các log dễ nhìn, dễ làm nhất.

<br>

### II. Cài đặt và ví dụ demo

<br>

Bạn khởi tạo dự án spring boot + implement một vài đầu API đơn giản để làm ví dụ trực quan nhé

<br>

![](https://images.viblo.asia/e5f06fbc-8976-4f64-b627-f7f1abf890c2.png)

<br>

**1. Configure Spring Boot Application**

Đây là cách cơ bản nhất để hiển thị log request và response

Bạn thêm các class sau để tiến hành demo nhé:

<br>

![](https://images.viblo.asia/a955515e-2c94-4382-bcb9-958843308b1b.png)

<br>

Cấu trúc project:

***Class RequestLoggingFilterConfig:***

```
package com.example.demologging.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLoggingFilterConfig {

   @Bean
   public CommonsRequestLoggingFilter logFilter() {
       CommonsRequestLoggingFilter filter
               = new CommonsRequestLoggingFilter();
       filter.setIncludeQueryString(true);
       filter.setIncludePayload(true);
       filter.setMaxPayloadLength(10000);
       filter.setIncludeHeaders(false);
       filter.setAfterMessagePrefix("REQUEST DATA : ");
       return filter;
   }
}
```


***Class UserController:***

```
package com.example.demologging.controller;

import com.example.demologging.model.UserDto;
import com.example.demologging.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
   @Autowired
   private UserService userService;

   @GetMapping
   public List<UserDto> getListUser(){
       return userService.getListUser();
   }

}
```

***Class UserDto:***

```
package com.example.demologging.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
   private String name;
   private String address;
   private int age;
}
```


***Class UserService:***

```
package com.example.demologging.service;

import com.example.demologging.model.UserDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
   public List<UserDto> getListUser(){
       List<UserDto> userDtoList = new ArrayList<>();

       UserDto userDto1 = new UserDto("Nguyen Van A","Ha Noi",18);
       UserDto userDto2 = new UserDto("Nguyen Van B","Ha Noi",19);
       UserDto userDto3 = new UserDto("Nguyen Van C","Ha Noi",20);
       UserDto userDto4 = new UserDto("Nguyen Van D","Ha Noi",18);
       UserDto userDto5 = new UserDto("Nguyen Van E","Ha Noi",19);

       userDtoList.add(userDto1);
       userDtoList.add(userDto2);
       userDtoList.add(userDto3);
       userDtoList.add(userDto4);
       userDtoList.add(userDto5);
       return userDtoList;
   }
}
```


***Class DemoLoggingApplication:***

```
package com.example.demologging;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoLoggingApplication {

   public static void main(String[] args) {
       SpringApplication.run(DemoLoggingApplication.class, args);
   }

}
```


***File application.properties:***

`logging.level.org.springframework.web.filter.CommonsRequestLoggingFilter=DEBUG`


***File logback.xml:***

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
   <property name="LOGS" value="./logs"/>
   <property name="SERVICE" value="example-service"/>

   <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
       <layout class="ch.qos.logback.classic.PatternLayout">
           <Pattern>
               %black(%d{ISO8601}) %highlight(%-5level) [%blue(%t)] %yellow(%C{2}:%L): %msg%n%throwable
           </Pattern>
       </layout>
   </appender>

   <appender name="rollingFile" class="ch.qos.logback.core.rolling.RollingFileAppender">
       <file>${LOGS}/${SERVICE}-logger.log</file>
       <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
           <Pattern>%d %p %C{2}:%L [%t] %m%n</Pattern>
       </encoder>

       <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
           <!-- rollover daily and when the file reaches 1 GigaBytes -->
           <fileNamePattern>${LOGS}/archived/${SERVICE}-logger-%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
           <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
               <maxFileSize>1GB</maxFileSize>
           </timeBasedFileNamingAndTriggeringPolicy>
       </rollingPolicy>
   </appender>

   <root level="DEBUG">
       <appender-ref ref="rollingFile"/>
       <appender-ref ref="console"/>
   </root>

   <logger name="org.springframework.web.filter.CommonsRequestLoggingFilter">
       <level value="DEBUG" />
   </logger>

</configuration>
```


Bạn sử dụng postman để kiểm tra API và việc show log:

<br>

![](https://images.viblo.asia/200a670b-0abe-4b88-ae5f-2895a99b2141.png)

<br>


Quan sát console log trong IDE ta sẽ thấy log được show ra với đầy đủ request và response:

<br>

![](https://images.viblo.asia/4c4e8ce6-7581-48db-a770-6a075fddd69d.png)

<br>

Nhưng các bạn nhận thấy các request và response chưa được "đẹp" và chi tiết cho lắm. Vậy mình sẽ sang phần 2 tiến hành tạo log đầy đủ và thuận mắt hơn nhé.

<br>

**2. Customize show Log với Controller Advice**

<br>

Các bạn thêm các class như sau:

***Class CustomURLFilter: ***

```
package com.example.demologging.config;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;
import java.util.UUID;

@Slf4j
public class CustomURLFilter implements Filter {

   private static final String REQUEST_ID = "request_id";

   @Override
   public void init(FilterConfig filterConfig) throws ServletException {

   }

   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

       String requestId = UUID.randomUUID().toString();
       servletRequest.setAttribute(REQUEST_ID, requestId);
       logRequest((HttpServletRequest) servletRequest, requestId);
       filterChain.doFilter(servletRequest, servletResponse);
   }

   @Override
   public void destroy() {

   }

   private void logRequest(HttpServletRequest request, String requestId) {
       if (request != null) {
           StringBuilder data = new StringBuilder();
           data.append("\nLOGGING REQUEST-----------------------------------\n")
                   .append("[REQUEST-ID]: ").append(requestId).append("\n")
                   .append("[PATH]: ").append(request.getRequestURI()).append("\n")
                   .append("[QUERIES]: ").append(request.getQueryString()).append("\n")
                   .append("[HEADERS]: ").append("\n");

           Enumeration headerNames = request.getHeaderNames();
           while (headerNames.hasMoreElements()) {
               String key = (String) headerNames.nextElement();
               String value = request.getHeader(key);
               data.append("---").append(key).append(" : ").append(value).append("\n");
           }
           data.append("LOGGING REQUEST-----------------------------------\n");

           log.info(data.toString());
       }
   }
}
```

***Class RequestLoggingFilterConfig:***

```
package com.example.demologging.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLoggingFilterConfig {

   @Bean
   public CommonsRequestLoggingFilter logFilter() {
       CommonsRequestLoggingFilter filter
               = new CommonsRequestLoggingFilter();
       filter.setIncludeQueryString(true);
       filter.setIncludePayload(true);
       filter.setMaxPayloadLength(10000);
       filter.setIncludeHeaders(false);
       filter.setAfterMessagePrefix("REQUEST DATA : ");
       return filter;
   }

   @Bean
   public FilterRegistrationBean < CustomURLFilter > filterRegistrationBean() {
       FilterRegistrationBean < CustomURLFilter > registrationBean = new FilterRegistrationBean();
       CustomURLFilter customURLFilter = new CustomURLFilter();

       registrationBean.setFilter(customURLFilter);
       registrationBean.setOrder(2); //set precedence
       return registrationBean;
   }
}
```


***Class CustomRequestBodyAdviceAdapter:***

```
package com.example.demologging.controller;

import com.example.demologging.service.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;

@ControllerAdvice
public class CustomRequestBodyAdviceAdapter extends RequestBodyAdviceAdapter {

   @Autowired
   LoggingService loggingService;

   @Autowired
   HttpServletRequest httpServletRequest;

   @Override
   public boolean supports(MethodParameter methodParameter, Type type,
                           Class<? extends HttpMessageConverter<?>> aClass) {
       return true;
   }

   @Override
   public Object afterBodyRead(Object body, HttpInputMessage inputMessage,
                               MethodParameter parameter, Type targetType,
                               Class<? extends HttpMessageConverter<?>> converterType) {
       loggingService.logRequest(httpServletRequest, body);

       return super.afterBodyRead(body, inputMessage, parameter, targetType, converterType);
   }
}
```


***Class CustomResponseBodyAdviceAdapter:***

```
package com.example.demologging.controller;

import com.example.demologging.service.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class CustomResponseBodyAdviceAdapter implements ResponseBodyAdvice<Object> {

   @Autowired
   LoggingService loggingService;

   @Override
   public boolean supports(MethodParameter methodParameter,
                           Class<? extends HttpMessageConverter<?>> aClass) {
       return true;
   }

   @Override
   public Object beforeBodyWrite(Object o,
                                 MethodParameter methodParameter,
                                 MediaType mediaType,
                                 Class<? extends HttpMessageConverter<?>> aClass,
                                 ServerHttpRequest serverHttpRequest,
                                 ServerHttpResponse serverHttpResponse) {

       if (serverHttpRequest instanceof ServletServerHttpRequest &&
               serverHttpResponse instanceof ServletServerHttpResponse) {
           loggingService.logResponse(
                   ((ServletServerHttpRequest) serverHttpRequest).getServletRequest(),
                   ((ServletServerHttpResponse) serverHttpResponse).getServletResponse(), o);
       }

       return o;
   }
}
```


***Class LoggingService:***

```
package com.example.demologging.service;

import com.example.demologging.utils.GsonParserUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@Slf4j
public class LoggingService {
   private static final String REQUEST_ID = "request_id";

   public void logRequest(HttpServletRequest httpServletRequest, Object body) {
       if (httpServletRequest.getRequestURI().contains("medias")) {
           return;
       }
       Object requestId = httpServletRequest.getAttribute(REQUEST_ID);
       StringBuilder data = new StringBuilder();
       data.append("\nLOGGING REQUEST BODY-----------------------------------\n")
               .append("[REQUEST-ID]: ").append(requestId).append("\n")
               .append("[BODY REQUEST]: ").append("\n\n")
               .append(GsonParserUtils.parseObjectToString(body))
               .append("\n\n")
               .append("LOGGING REQUEST BODY-----------------------------------\n");

       log.info(data.toString());
   }

   public void logResponse(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object body) {
       if (httpServletRequest.getRequestURI().contains("medias")) {
           return;
       }
       Object requestId = httpServletRequest.getAttribute(REQUEST_ID);
       StringBuilder data = new StringBuilder();
       data.append("\nLOGGING RESPONSE-----------------------------------\n")
               .append("[REQUEST-ID]: ").append(requestId).append("\n")
               .append("[BODY RESPONSE]: ").append("\n\n")
               .append(GsonParserUtils.parseObjectToString(body))
               .append("\n\n")
               .append("LOGGING RESPONSE-----------------------------------\n");

       log.info(data.toString());
   }
}
```


***Class GsonParserUtils***

```
package com.example.demologging.utils;


import com.google.gson.Gson;

public class GsonParserUtils {
   public static String parseObjectToString(Object object) {
       return new Gson().toJson(object);
   }

   public static <T> T parseStringToObject(String json, Class<T> classObject) {
       try {
           return new Gson().fromJson(json, classObject);
       } catch (Exception e) {
           return null;
       }
   }
}
```


Kết quả sau khi bạn chạy thử đây:

<br>

![](https://images.viblo.asia/edd70733-5ee8-4048-95b6-8b6636fcfbb0.png)

<br>

Kết quả hiển thị log cực kỳ dễ nhìn và thuận tiện cho việc các bạn điều tra log

### Bài hướng dẫn của mình đến đây là kết thúc. Cám ơn mọi người đã theo dõi.