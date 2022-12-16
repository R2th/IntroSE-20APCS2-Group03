Bài viết là kinh nghiệm mình đúc rút ra được sau khi dự án mình từng làm bị dính phốt với gửi mail trong môi trường phát triển (dev). Mình tin chắc không ít các bạn đang xem bài viết này đã, đang và sẽ gặp phải. Và nếu các bạn chưa tìm ra được solution thì hãy đọc kỹ những gì mình chia sẻ dưới đây nhé.
# 1. Đặt vấn đề, giới thiệu

Thông thường, dự án chúng ta sẽ có 1 vài profile (config) tương ứng với từng môi trường. Ví dụ như production, stagging, test, dev. Thông thường 
- `production` là môi trường thực tế, nơi ứng dụng mà chúng ta phát triển được publish cho khách hàng mục tiêu
- `stagging` thường là môi trường dành cho khách hàng thực hiện test để đảm bảo ok trước khi lên production
- `test` dành cho QA cũng như Developer test
- `dev` là môi trường trên máy của lập trình viên.

**Vấn đề 1**. Giả sử ứng dụng của bạn có chức năng đăng ký user, chức năng này có thực hiện gửi email tới địa chỉ email mà user nhập vào lúc đăng ký, trong email có mã xác thực. Vậy khi test, ta sẽ phải quan tâm tới những điều sau

- Địa chỉ email nhập vào phải là địa chỉ email thật. (nghĩa là nếu không có bạn sẽ phải đi tạo n tài khoản email)
- Mở từng email để đọc được nội dung mới có thể lấy mã xác thực để hoàn tất đăng ký

Quá phiền đúng ko? Vấn đề này chắc chắn không ít các bạn QA đã phải trải qua và nó thực sự là ác mộng :D Quá tốn thời gian và công sức đúng k nào?

**Vấn đề 2**. Giả sử 1 ngày đẹp trời, trên production có bug. Bạn là người được assign để fix cái lỗi ý. Khốn nạn là ở chỗ bạn chạy trên cả stagging, test hay dev đều thể tái hiện. Và đương nhiên, nếu không phải là 1 lỗi dễ phát hiện và dễ resolve, thì việc giả lập môi trường thật  (prod) là điều cần thiết. Lúc này, bạn kéo database production về và chạy lên. 
Bug ấy có nôi dụng rằng ứng dụng của chúng ta chạy trên production gửi email thông báo sai format mà khác hàng yêu cầu.
Lúc này, ta tạo thông báo và...test thử phần gửi mail.
...

"Cái mẹ gì thế này!!???: - Bạn tá hóa thốt lên khi phát hiện ra ứng dụng của bạn đang gửi thông báo tới 5000 email của 5000 người dùng trong hệ thống. Và bạn nghĩ tới viện cảnh về những ngày tháng thất nghiệp đen tối........

Tất nhiên, có thể bạn không bất cẩn đến như thế. bạn sẽ viết 1 query để thay đổi toàn bộ email của user thành dạng kiểu
```
nhsxxxx@gmail.com"
```
với x chạy từ 0001 đến 5000 chẳng hạn.

Cách này có vẻ hay, nhưng không tiện. 


2 vấn đề trên khiến mình đặt ra câu hỏi, liệu có cách nào, app nào, tool nào có thể

* Bắt được email mình gửi đi. Có khả năng hiển thị chúng trên GUI hoặc đặt tại 1 thư mục nào đó dù email đó có địa chỉ không phải là địa chỉ thực tế.
* Và dù nó là một địa chỉ email ảo hay thật, thì cũng chặn việc gửi đến email thật. Hay dễ hình dung hơn, cái máy tính chạy ứng dụng là ngôi nhà của toàn bộ email address đó, và việc mang miếng bánh cho đứa bé nào thì cũng chỉ ở trong nhà thôi :D ko mang cho nhà hàng xóm 

Nếu bạn từng config ứng dụng của mình cho việc gửi mail, bạn có nhớ bạn từng phải config smtp server host, port cũng như vài thông số khác không?
Mình ví dụ trong Spring Framework của mình có đoạn config này
```
    <bean id="mailSender" class="org.springframework.mail.javamail.JavaMailSenderImpl">
        <property name="host" value="${config.email.server.host}"/>
        <property name="port" value="${config.email.server.port}"/>
        <property name="username" value="${config.email.server.username}"/>
        <property name="password" value="${config.email.server.password}"/>
        <property name="javaMailProperties">
            <props>
                <prop key="mail.smtp.host">smtp.gmail.com</prop>
                <prop key="mail.smtp.socketFactory.port">465</prop>
                <prop key="mail.smtp.socketFactory.class">javax.net.ssl.SSLSocketFactory</prop>
                <prop key="mail.smtp.auth">true</prop>
                <prop key="mail.smtp.port">465</prop>
            </props>
        </property>
    </bean>
```
    
Vậy, thử hình dung, nếu ta thay cấu hình stmp server thay vì của gmail, ta dùng của riêng chúng ta thì sao nhỉ? Mail server đó có **khả năng bắt, điều hướng email, chặn gửi email** .v.v.v. Nhưng đen là bạn chẳng biết gì về việc cài đặt, cấu hình để xây dựng 1 mail server cả. Vậy thì hãy nghĩ tới các từ từ khóa "Fake SMTP", "Catch mail", "mail catcher" .v.v.v 

Tư tưởng là thế, giờ bạn google xem có không nhé?

Một vài suggestion mà mình gợi ý cho các bạn, cũng là những kết quả mà mình đã tìm ra và thử nghiệm 
- FakeSMTP được xây dựng bằng Java, có cả GUI cho bạn. Họ đóng gói luôn file jar cho bạn chỉ việc run thôi. http://nilhcem.com/FakeSMTP/
- MailCatcher https://mailcatcher.me/. MailCatcher chạy 1 siêu đơn giản
> MailCatcher runs a super simple SMTP server which catches any message sent to it to display in a web interface. Run mailcatcher, set your favourite app to deliver to smtp://127.0.0.1:1025 instead of your default SMTP server, then check out http://127.0.0.1:1080 to see the mail that's arrived so far.
> 

- MailHog https://github.com/mailhog/MailHog

# 2. Hướng dẫn, ví dụ
Giờ ta chiến luôn nhé.
Ở đây, mình sử dụng FakeSTMP thôi. Tool này được đóng gói và sử dụng ngay được. Đơn giản vô cùng.

Mình có 1 đoạn mã gửi email như sau

```java

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Main {

    public static void main(String[] args) {
        String to = "hongson318@gmail.com";
        String from = "nhs3108@gmail.com";
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.port", "465");
        properties.setProperty("mail.smtp.socketFactory.port", "465");
        properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.setProperty("mail.smtp.auth", "true");
        Authenticator authenticator = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("nhs3108@gmail.com", "enter_password");
            }
        };

        Session session = Session.getDefaultInstance(properties, authenticator);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Tiêu đề");
            message.setContent("Nội dung email", "text/html");
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}
```


    
Việc của đoạn mã này là gửi email từ tài khoản `nhs3108@gmail.com` tới `hongson318@gmail.com`

![](https://images.viblo.asia/7800a483-7b0a-4707-9759-1b9ceb88642e.png)
Và kết quả đây. Gửi mail thành công.

Giờ, thực hiện chạy FakeSMTP.jar và sửa 1 vài chỗ trong setting properties ở đoạn mã trên 
```
java -jar fakeSMTP-2.0.jar
```

![](https://images.viblo.asia/bec194a1-b089-4044-81ce-a8b59b450f8a.png)

Chọn cổng và start. Mình chọn 8081. Bạn cũng có thể chọn thư mục lưu trữ mail

![](https://images.viblo.asia/0becbde0-8535-41dd-98e3-240cbde8e943.png)

Sau đó, sửa 1 thay thế đoạn
```
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", "smtp.gmail.com");
        properties.setProperty("mail.smtp.port", "465");
        properties.setProperty("mail.smtp.socketFactory.port", "465");
        properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.setProperty("mail.smtp.auth", "true");
```
bằng 
```
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", "localhost");
        properties.setProperty("mail.smtp.port", "8081");
        properties.setProperty("mail.smtp.socketFactory.port", "");
        properties.setProperty("mail.smtp.socketFactory.class", "");
        properties.setProperty("mail.smtp.auth", "false");
```
Bạn cũng có thể remove 3 dòng
```

        properties.setProperty("mail.smtp.socketFactory.port", "");
        properties.setProperty("mail.smtp.socketFactory.class", "");
        properties.setProperty("mail.smtp.auth", "false");
```
để nó nhân giá trị mặc định.
Giờ thì chạy thử lại đoạn gửi mail
Theo dõi GUI FakeSMTP và kết quả mình nhận được như sau
![](https://images.viblo.asia/c4b9e376-eadc-417f-8b6c-d522d06680b0.png)

![](https://images.viblo.asia/7208fd45-aafd-45af-acef-a290297290e6.png)
        
        
Giờ thì kiểm tra trong gmail mail `hongson318@gmail.com` xem có mail mới không. Và mình xác nhận là không có mail mới. OK. ngon rồi phải ko nào!

Giờ thì bằng kinh nghiệm của bạn đối với Sping Framework, đặt những config trên vào properties của từng profile mvn/gradle để tiện cho việc cấu hình cho nhiều môi trường thôi. Đối với môi trường phát triển (dev, test) bạn config host port mà FakeSTMP, MailHog, MailCatcher  sử dụng để thực hiện việc bắt và hiện thị đọc mail. Còn production, dĩ nhiên là không cần rồi. Như vậy, chỉ cần bạn chạy đúng môi trường, bạn sẽ không bao giờ lo mấy cái phốt gửi mail kia nữa cả :D. Nhớ là, đừng có chạy `mvn clean compile exec:java package -P prod` là được :D  

Ở ví dụ trên mình sử dụng FakeSMTP, bạn cũng có thể sử dụng MailCatcher, MailHog mà mình có nhắc tới ở trên, hay tìm bất cứ 1 loại nào tuơng tự. Tư tưởng chủ đạo của chúng là  "FakeSMTP để thực hiện việc catch và gửi mail, hiện thị lên GUI".
Ví dụ trên mình dùng Java. Đối với bất cứu App của ngôn ngữ/framework nào thực hiện gửi mail qua smtp, bạn cũng có thể sử dụng những công cụ mà mình đã nhắc ở trên. Việc của bạn chỉ là chạy chúng và config app của mail với host và port mà chúng lắng nghe mà thôi 

Mình chắc chắn rằng bài viết này sẽ hữu ích với rất nhiều người. Chúc các bạn thành công nhé.

**CHÚ Ý**
Đoạn này mình miss.

Bạn có thể chạy FakeSMTP với các param: 
```
java -jar fakeSMTP.jar -o output_directory_name -p port
```
để cấu hình nơi lưu trữ email và port chạy nhé