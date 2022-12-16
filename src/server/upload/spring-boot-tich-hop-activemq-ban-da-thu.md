Tiếp tục với series [Chuyện tình Spring và JMS](https://viblo.asia/s/chuyen-tinh-spring-va-jms-3vKjRggNK2R), chúng ta sẽ tìm hiểu cách **tích hợp Spring Boot với ActiveMQ**.

Spring Boot là một dự án nổi bật trong hệ sinh thái Spring framework. Với Spring Boot, chúng ta có thể tạo các ứng dụng Spring một cách nhanh chóng và đơn giản hơn bao giờ hết.

Còn ActiveMQ? Bạn cần phải đọc trước bài **[Tích hợp Spring với ActiveMQ sử dụng Spring JMS](https://viblo.asia/p/tich-hop-spring-voi-activemq-su-dung-spring-jms-3P0lPmq85ox)** trong cùng series này để biết nhé. Ngoài ra còn một số khái niệm khác như JMS, Topic, Queue,... tất cả đã được định nghĩa ở đó cả rồi.

# Giới thiệu
Spring Boot sẽ tự động cấu hình **ConnectionFactory** khi phát hiện sự có mặt của **ActiveMQ** trong java classpath. Nó cũng có thể sử dụng embedded broker nếu không tìm thấy tùy chỉnh nào cho ActiveMQ trong application.properties. Chúng ta sẽ cùng làm rõ nhé!
# Chuẩn bị Maven dependency
***spring-boot-starter-activemq***: Cung cấp tất cả các dependency cần thiết để tích hợp ActiveMQ với Spring Boot.

***activemq-broker***: Embedded ActiveMQ cho Spring Boot

***spring-boot-maven-plugin***: Giúp tạo file thực thi .jar từ tất cả các file jar khác trong classpath.

> **pom.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ngockhuong</groupId>
    <artifactId>springboot-activemq-example</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>springboot-activemq-example</name>
    <description>Demo project for Spring Boot integrate with ActiveMQ</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-activemq</artifactId>
        </dependency>

        <dependency>
            <groupId>org.apache.activemq</groupId>
            <artifactId>activemq-broker</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```
# Cấu hình ActiveMQ trong Spring Boot
Bên dưới là phần cấu hình cho ActiveMQ trong **application.properties**. Ở đây chúng ta cần có broker url cùng với username và password để có thể kết nối đến ActiveMQ.
> **application.properties**
```
spring.activemq.broker-url=tcp://localhost:61616
spring.activemq.user=admin
spring.activemq.password=admin
```
(Bạn có còn nhớ những thông số này sẽ được cấu hình ở đâu khi tích hợp Spring với ActiveMQ không? :D)

# Cấu hình Spring JMS Bean
Cùng xem lại phần dựng class cấu hình trong [bài viết trước](https://viblo.asia/p/tich-hop-spring-voi-activemq-su-dung-spring-jms-3P0lPmq85ox#_dung-cac-class-initializer-va-configuration-4). Class JmsConfig rất quan trọng, không có nó thì đừng hòng kết nối được đến ActiveMQ
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
        factory.setConcurrency("3-10");
        // true: using jms topic, false: using jms queue
        factory.setPubSubDomain(false);

        return factory;
    }
}
```
Trong Spring Boot, thay vì cấu hình trong file **application.properties**, bạn có thể sử dụng **JmsConfig** và cấu hình tại đây. Tuy nhiên, bạn thích sử dụng application.properties hay JmsConfig dây mơ rễ má kia để cấu hình cho các kết nối. Đây là một điểm nổi bật không thể không nhắc đến trong Spring Boot, JmsTemplate và containerFactory đã được cung cấp ngầm, bạn sẽ không cần phải viết lại như kia. (Nhưng nếu muốn thì bạn có thể viết, không ai cấm bạn cả :D )

# JMS Listener
> **Listener.java**
```
package com.ngockhuong.app;

import com.google.gson.Gson;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;
import java.util.Map;

@Component
public class Listener {
    @JmsListener(destination = "inbound.queue")
    @SendTo("outbound.queue")
    public String receiveMessage(final Message jsonMessage) throws JMSException {
        String messageData = null;
        System.out.println("Tin nhắn nhận được: " + jsonMessage);
        String response = null;
        if(jsonMessage instanceof TextMessage) {
            TextMessage textMessage = (TextMessage)jsonMessage;
            messageData = textMessage.getText();
            Map map = new Gson().fromJson(messageData, Map.class);
            response  = "Chào " + map.get("name");
        }
        return response;
    }
}
```
**@JmsListener**: Annotation chỉ định các cấu hình cho bộ lắng nghe tin nhắn của JMS. Chủ yếu là để cấu hình địa chỉ nhận tin nhắn (destination). Trong trường hợp này, destination là "**inbound.queue**"

**@SendTo**: Annotation chỉ định địa chỉ mà JMS cần gửi tin nhắn đến, ở phương thức được cấu hình với SendTo, tin nhắn sẽ được gửi đi thông qua việc trả về giá trị của phương thức đó.
# JMS Producer
Bạn không cần phải tạo thêm class nào nữa cho Producer, bởi class trên vừa đảm nhận nhiệm vụ của 1 Listener, vừa là của Producer.

Nếu bạn không thích sử dụng chung Listener và Producer ở một nơi như vậy, bạn có thể sử dụng cách khác, tách riêng Listener và Producer như đã hướng dẫn [ở đây](https://viblo.asia/p/tich-hop-spring-voi-activemq-su-dung-spring-jms-3P0lPmq85ox#_gui-va-nhan-tin-5).
# Làm việc với JMS Topic
Mặc định, Spring Boot hỗ trợ kết nối và gửi nhận tin nhắn thông qua Queue. Để có thể sử dụng Topic để gửi nhận tin, bạn cần thêm cấu hình ***spring.jms.pub-sub-domain=true*** ở **application.properties** (Nếu bạn đang sử dụng **JmsConfig** class, cần truyền vào tham số ***true*** ở phương thức **setPubSubDomain** nhé)
# Spring Bean Configuration
@SpringBootApplication tương đương với việc sử dụng @Configuration, @EnableAutoConfiguration và @ComponentScan với các thuộc tính mặc định
> **SpringbootActivemqExampleApplication.java**
```
package com.ngockhuong.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class SpringbootActivemqExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootActivemqExampleApplication.class, args);
    }
}
```
*Chú ý thêm annotation @EnableJms nữa bạn nhé
# Cài đặt Apache ActiveMQ và chạy thử ứng dụng
Việc download, cài đặt và chạy thử ActiveMQ cũng như ứng dụng đơn giản mà chúng ta vừa viết hoàn toàn tương tự như cách mà mình hướng dẫn trong bài viết trước. (Thêm lại ở bài này thì hơi thừa nên bạn thông cảm [quay lại đây](https://viblo.asia/p/tich-hop-spring-voi-activemq-su-dung-spring-jms-3P0lPmq85ox#_download-va-chay-server-activemq-6) để xem lại nhé)

À chỉ khác một chút thế này, thay vì chạy lệnh "mvn tomcat7:run" để run ứng dụng thì bạn chỉ cần chạy ngay class SpringbootActivemqExampleApplication thôi nhé :D

# Hoàn tất
Như vậy qua bài này, bạn có nhận xét gì khi tích hợp Spring Boot với ActiveMQ thay vì Spring. Đơn giản hơn phải không nào. Hi vọng một ít kiến thức nhỏ nhoi ở trên sẽ giúp bạn nhiều hơn trong quá trình học tập cũng như công việc.

Thân ái và chào quyết thắng!
![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

Suýt quên: [Demo](https://github.com/lamngockhuong/springboot-activemq-example)