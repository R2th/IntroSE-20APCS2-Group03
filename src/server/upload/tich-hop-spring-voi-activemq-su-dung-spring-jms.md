Đây là bài viết đầu tiên trong series [**Chuyện tình Spring và JMS**](https://viblo.asia/s/chuyen-tinh-spring-va-jms-3vKjRggNK2R) (Nghe như Lan và Điệp ấy nhỉ). Hãy khẽ đặt tay lên chỗ mềm mại nhất, mắt mở to hướng thẳng về phía ấy và thầm đọc nhé!

À quên. Xem giúp mình bài này trước nhé: [JMS và ActiveMQ](https://viblo.asia/p/jms-and-activemq-YAQrMJzjM40E) (Không nghe mất quyền lợi ráng mà chịu)
## JMS và Spring JMS là cái quái gì?
Vâng, bài viết trên kia đã giới thiệu JMS là gì, kiến trúc của một ứng dụng JMS ra sao, bao gồm các thành phần nào và kể cả ActiveMQ là cái quái gì nữa.

Mình xin được sơ lược lại thế này:

* **JMS** là một API nằm sẵn trong bộ JDK hỗ trợ giao tiếp bằng tin nhắn giữa các máy tính với nhau trong một mạng.
* Còn **Spring JMS** chẳng qua là một integration framework được viết ra nhằm đơn giản hóa việc sử dụng JMS API (Nghe bộ JMS API sử dụng hơi lằng nhằng trong Java thuần)
## ActiveMQ là bà con với JMS chăng?
Sự thật thì **ActiveMQ** luôn dính với **JMS**, chẳng biết phải họ hàng gì không nhưng không có JMS thì ActiveMQ có lẽ cũng không có trên đời này.

Bởi lẽ, JMS có chứa một API, ActiveMQ là một phần mềm (JMS provider) sử dụng API đó để làm thành một hệ thống gửi nhận tin nhắn, cung cấp các tính năng quản lý, kiểm soát.

Ngoài ActiveMQ, một số provider mà bạn có thể tìm hiểu thêm như: JBoss (Wildfly), GlassFish, RabbitMQ (tương tự ActiveMQ),...
## Chuẩn bị tích hợp Spring với ActiveMQ
Trong phần này, mình sẽ viết một Spring app đơn giản để gửi nhận tin thông qua ActiveMQ. Hãy theo sát mình nhé, không thì lạc nhau đấy.
### Tạo maven project
Để thuận tiện và nhanh chóng trong quá trình chuẩn bị thư viện, mình sẽ sử dụng Maven bạn nhé. Kết hợp sử dụng trên Intelij Idea thì còn gì bằng.

Để tích hợp JMS với Spring, chúng ta cần 2 dependency chính là **spring-jms** và **activemq-all**.

**pom.xml**
```
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ngockhuong</groupId>
    <artifactId>springjms-activemq-example</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>Spring JMS ActiveMQ Example</name>
    <url>https://ngockhuong.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.7</maven.compiler.source>
        <maven.compiler.target>1.7</maven.compiler.target>
        <spring-framework.version>4.3.18.RELEASE</spring-framework.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jms</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.6.2</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.activemq</groupId>
            <artifactId>activemq-all</artifactId>
            <version>5.15.5</version>
        </dependency>
    </dependencies>

    <build>
        <finalName>springjms-activemq-example</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <server>mytomcat7</server>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

Mình đang sử dụng spring framework version 4.3.18.RELEASE, ActiveMQ mới nhất lúc viết bài này là 5.15.5, tomcat7-maven-plugin để build và run project.

### Dựng các class Initializer và Configuration
> ApplicationInitializer.java
```
package com.ngockhuong.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class ApplicationInitializer implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(JmsConfig.class);
        ctx.setServletContext(servletContext);

        ServletRegistration.Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));
        servlet.setLoadOnStartup(1);
        servlet.addMapping("/");
    }
}
```

> JmsConfig.java
```
package com.ngockhuong.config;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;

@Configuration
@EnableJms
@ComponentScan(basePackages = "com.ngockhuong")
public class JmsConfig {
    private static final String BROKER_URL = "tcp://localhost:61616";
    private static final String BROKER_USERNAME = "admin";
    private static final String BROKER_PASSWORD = "admin";

    @Bean
    public ActiveMQConnectionFactory connectionFactory() {
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory();
        connectionFactory.setBrokerURL(BROKER_URL);
        connectionFactory.setUserName(BROKER_USERNAME);
        connectionFactory.setPassword(BROKER_PASSWORD);

        return connectionFactory;
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        JmsTemplate template = new JmsTemplate();
        template.setConnectionFactory(connectionFactory());

        return template;
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory() {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrency("1-1");
        // true: using jms topic, false: using jms queue
        factory.setPubSubDomain(false);

        return factory;
    }
}
```
Một số điểm lưu ý trong class này:

* ***@EnableJms***: cho phép phát hiện các annotation @JmsListener trong source code mà chúng ta sẽ sử dụng để gửi và nhận tin.
* ***ActiveMQConnectionFactory***: Dùng để tạo các connection.
* ***JmsTemplate***: Là một helper class giúp đơn giản hóa việc gửi và nhận tin nhắn thông qua JMS.
* ***DefaultJmsListenerContainerFactory***: Tạo bộ lắng nghe trong gửi nhận tin.
* Mặc định, để kết nối đến ActiveMQ, chúng ta sẽ sử dụng url **tcp://localhost:61616**, admin url: http://localhost:8161/admin/ với username và password: ***admin*** và ***admin***
* ***factory.setPubSubDomain(boolean***): Truyền vào ***false*** nếu muốn sử dụng queue để gửi nhận tin, ***true*** nếu là topic.

### Gửi và nhận tin
> Listener.java
```
package com.ngockhuong.jms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;

@Component
public class Listener {

    @Autowired
    private Producer producer;

    @JmsListener(destination = "inbound.queue")
    public void receiveMessage(Message jsonMessage) throws JMSException {
        String messageData = null;
        System.out.println("Nhận tin nhắn: " + jsonMessage);
        if(jsonMessage instanceof TextMessage) {
            TextMessage textMessage = (TextMessage)jsonMessage;
            messageData = textMessage.getText();
        }

        producer.sendMessage("outbound.queue", messageData);
    }
}
```
* Bạn phải thêm annotation @JmsListener để chỉ rõ đây sẽ là phương thức lắng nghe và nhận tin nhắn từ queue.
* destination = "inbound.queue": Định nghĩa tên queue mà bộ lắng nghe sẽ nhận tin nhắn từ đó.

> Producer.java
```
package com.ngockhuong.jms;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import java.util.Map;

@Component
public class Producer {

    @Autowired
    private JmsTemplate jmsTemplate;

    public void sendMessage(String queueName, final String message) {
        Map map = new Gson().fromJson(message, Map.class);
        final String textMessage = "Chào nhé " + map.get("name");
        System.out.println("Gửi tin nhắn " + textMessage + " đến queue - " + queueName);
        jmsTemplate.send(queueName, new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(message);
            }
        });
    }
}
```
Đó là 2 class chịu trách nhiệm gửi và nhận tin trong JMS. Có một cách ngắn gọn hơn mà bạn có thể sử dụng:

Dùng phương thức này để nhận tin nhắn từ "inbound.queue" và gửi tin đến queue "outbound.queue".
```
    @JmsListener(destination = "inbound.queue")
    @SendTo("outbound.queue")
    public String receiveMessageFromTopic(final Message jsonMessage) throws JMSException {
        String messageData = null;
        System.out.println("Nhận tin nhắn: " + jsonMessage);
        String response = null;
        if(jsonMessage instanceof TextMessage) {
            TextMessage textMessage = (TextMessage)jsonMessage;
            messageData = textMessage.getText();
            Map map = new Gson().fromJson(messageData, Map.class);
            response  = "Hello " + map.get("name");
        }
        return response;
    }
```
Vâng, chỉ cần một phương thức ấy thôi là đủ (Sử dụng annotation @SendTo để gửi tin nhắn đến một queue nào đó)

**Lưu ý:** Việc gửi và nhận tin nhắn sử dụng **topic** hoàn toàn giống với **queue** (Ý là sử dụng đoạn code trên). Nhưng nhớ cấu hình ở phần ***setPubSubDomain*** như đã nói trước đó nhé.

### Download và chạy server ActiveMQ
Chỉ dừng ở phần code thì chưa thể gửi và nhận tin đâu nhé. Không tin thử chạy lệnh "***mvn tomcat7:run***" thì biết liền à :D

Tin nhắn sẽ được client gửi lên và lưu trữ tại ActiveMQ server, sau sẽ gửi đến cho một client khác đang lắng nghe. Thế nên bạn khẩn trương tải và chạy ActiveMQ xem sao nhé.

**Download ActiveMQ**

Vào đây bạn nhé: http://activemq.apache.org/download.html

Hiện tại mình đang dùng phiên bản mới nhất lúc bấy giờ *ActiveMQ 5.15.5 Release*

**Chạy ActiveMQ**

* Giải nén ActiveMQ đã tải về ra một thư mục. Ví dụ "apache-activemq-5.15.5"
* Chạy file **acivemq.bat** trong thư mục "apache-activemq-5.15.5\bin\win64" hoặc "apache-activemq-5.15.5\bin\win32" tùy theo windows của bạn. Nếu sử dụng Mac, Linux thì download phiên bản phù hợp rồi chạy tương tự nhé.
* Mở Microsoft word và truy cập http://localhost:8161/admin/, đăng nhập với username và password là admin, admin.
![](https://images.viblo.asia/b6929a98-594b-4ee6-b75f-dc00b842a93e.png)
Bạn thử lượn qua vài vòng để xem các chức năng mà ActiveMQ hỗ trợ nhé :)))
## Chạy thử nào
Giờ thì xem thử gạo đã thành cơm chưa nhé!

Mới đầu truy cập vào ActiveMQ dashboard, ở 2 menu Queues (http://localhost:8161/admin/queues.jsp), Topics (http://localhost:8161/admin/topics.jsp) chưa có một queue hay topic nào với tên inbound.queue, outbound.queue hay inbound.topic, outbound.topic hiện lên.

Làm theo các bước sau chúng sẽ hiện nguyên hình:
1. Deploy ứng dụng trên tomcat: chạy lệnh "mvn tomcat7:run" (Ứng dụng sẽ kết nối đến server và tạo queue với tên inbound.queue, refresh lại trang để xem nhé)
![](https://images.viblo.asia/3ab7c3a3-1c89-454e-a055-2bc6403ec9e0.png)
2. Bây giờ ứng dụng đã lắng nghe queue này rồi, chúng ta sẽ thử gửi một tin nhắn đến queue ấy nhé. (Click link "Send To" và gửi tin nhắn với nội dung: {"name":"Chuối nhà em chín chưa"})
![](https://images.viblo.asia/3b7ad8ef-0dc8-4dd8-a38b-14fa4735bd23.png)
3. Sau khi tin nhắn gửi đi từ dashboard, tin nhắn sẽ được nhận về tại Listener.java. Đồng thời, sẽ tạo ra một queue nữa có tên là outbound.queue và gửi đi một tin nhắn đến đó. (Refresh trang để xem có queue nào được tạo ra thêm không nhé)
![](https://images.viblo.asia/72d05841-cea7-4f5f-9a05-7400004093c7.png)
## Chấm hết
Vậy là sau một hồi hô gió gọi mưa, chúng ta đã tích hợp Spring với ActiveMQ sử dụng Spring JMS thành công rồi nhé. Hẹn gặp lại các bạn ở Chuyện tình tiếp theo của Spring và JMS.
![](https://images.viblo.asia/bd139b47-9f6f-4c79-b17f-9ce6cb4cb8df.gif)

(Source code mình push tạm lên đây nhé: [AbcXyz](https://github.com/lamngockhuong/springjms-activemq-example))